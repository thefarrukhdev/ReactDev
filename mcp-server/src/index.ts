import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";

const COMPONENTS_DIR = path.resolve(process.cwd(), "../src/components/ui");

const server = new Server(
  {
    name: "react-components-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_components",
        description: "List available UI components",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_component",
        description: "Get code and metadata for a specific component",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the component",
            },
          },
          required: ["name"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "list_components") {
    try {
      const entries = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
      const components = entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading components directory: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (request.params.name === "get_component") {
    const { name } = request.params.arguments as any;
    const componentDir = path.join(COMPONENTS_DIR, name);

    try {
      const stat = await fs.stat(componentDir);
      if (!stat.isDirectory()) {
        throw new Error("Not a directory");
      }
    } catch {
      return {
        content: [
          {
            type: "text",
            text: `Component '${name}' not found.`,
          },
        ],
        isError: true,
      };
    }

    const result: Record<string, string> = {};
    try {
      const files = await fs.readdir(componentDir);
      for (const file of files) {
        if (
          file.endsWith(".tsx") ||
          file.endsWith(".ts") ||
          file === "usage.ts" ||
          file === "meta.tsx"
        ) {
          const content = await fs.readFile(
            path.join(componentDir, file),
            "utf-8"
          );
          result[file] = content;
        }
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error reading component files: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error("Tool not found");
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("React Components MCP server running on stdio");
}

run().catch(console.error);
