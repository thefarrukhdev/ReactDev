import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

function escapeCode(code: string) {
  return code.replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function toPascalCase(str: string) {
  return str.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}

function toCamelCase(str: string) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

export async function POST(request: Request) {
  try {
    const { id, name, code, isClient = true } = await request.json();

    if (!id || !name || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const componentName = toPascalCase(id); // e.g., magic-button -> MagicButton
    const varPrefix = toCamelCase(id);      // e.g., magic-button -> magicButton
    const targetDir = path.join(process.cwd(), "src/components/ui", id);

    // 1. Create directory
    await fs.mkdir(targetDir, { recursive: true });

    // 2. Write Main Component
    const componentCode = isClient && !code.includes('"use client"') 
      ? `"use client";\n\n${code}` 
      : code;
    await fs.writeFile(path.join(targetDir, `${componentName}.tsx`), componentCode);

    // 3. Write Demo
    const demoCode = `import React from "react";\nimport ${componentName} from "./${componentName}";\n\nexport const ${componentName}Demo = () => {\n  return (\n    <div className="flex items-center justify-center p-12 w-full h-full min-h-[300px]">\n      <${componentName} />\n    </div>\n  );\n};\n`;
    await fs.writeFile(path.join(targetDir, `${componentName}Demo.tsx`), demoCode);

    // 4. Write Code String
    const codeTs = `export const ${varPrefix}Code = \`${escapeCode(code)}\`;\n`;
    await fs.writeFile(path.join(targetDir, `${id}-code.ts`), codeTs);

    // 5. Write Usage
    const usageTs = `export const ${varPrefix}Usage = \`import ${componentName} from "@/components/ui/${id}/${componentName}";\n\nexport default function App() {\n  return (\n    <${componentName} />\n  );\n}\`;\n`;
    await fs.writeFile(path.join(targetDir, `usage.ts`), usageTs);

    // 6. Write Install
    const installTs = `export const ${varPrefix}Install = \`// Copy the component code into your project\`;\n`;
    await fs.writeFile(path.join(targetDir, `install.ts`), installTs);

    // 7. Write Meta
    const metaCode = `import React from "react";\nimport { ${componentName}Demo } from "./${componentName}Demo";\nimport { ${varPrefix}Code } from "./${id}-code";\nimport { ${varPrefix}Usage } from "./usage";\nimport { ${varPrefix}Install } from "./install";\n\nexport const meta = {\n  id: "${id}",\n  name: "${name}",\n  element: <${componentName}Demo />,\n  code: ${varPrefix}Code,\n  usage: ${varPrefix}Usage,\n  install: ${varPrefix}Install,\n};\n`;
    await fs.writeFile(path.join(targetDir, `meta.tsx`), metaCode);

    // 8. Update Registry
    const registryPath = path.join(process.cwd(), "src/lib/constants/components.ts");
    let registry = await fs.readFile(registryPath, "utf-8");

    const importStatement = `import { meta as ${componentName}Meta } from "@/components/ui/${id}/meta";`;
    if (!registry.includes(importStatement)) {
      // Insert after the last import
      const lastImportIndex = registry.lastIndexOf("import ");
      const endOfLastImport = registry.indexOf("\n", lastImportIndex);
      registry = registry.slice(0, endOfLastImport + 1) + importStatement + "\n" + registry.slice(endOfLastImport + 1);

      // Insert into array
      const arrayMatch = "export const componentsList: ComponentItem[] = [";
      registry = registry.replace(
        arrayMatch,
        `${arrayMatch}\n  ${componentName}Meta,`
      );
      await fs.writeFile(registryPath, registry);
    }

    return NextResponse.json({ success: true, message: "Component created successfully!" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
