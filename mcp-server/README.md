# React Components MCP Server

This is an MCP server that exposes the React components from the `src/components/ui` directory. It provides tools for AI agents to discover and read UI components in the project.

## Features

- `list_components`: Lists all available components by name (directory names in `../src/components/ui`).
- `get_component`: Gets the code and metadata (`*.tsx`, `usage.ts`, `meta.tsx`) for a specific component.

## Setup

First, build the server:

```bash
cd mcp-server
npm install
npm run build
```

## Configuration

To add this MCP server to your Antigravity or Claude configuration (e.g., `~/.gemini/config/mcp.json` or standard Claude desktop config):

```json
{
  "mcpServers": {
    "react-components": {
      "command": "node",
      "args": [
        "/home/farrukh/Projects/ReactDev/mcp-server/dist/index.js"
      ]
    }
  }
}
```
