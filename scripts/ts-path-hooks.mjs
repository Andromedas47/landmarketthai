// Test-only module resolution hook (zero npm dependencies).
// Maps the project's "@/*" tsconfig path alias to ./src/* and appends a
// TypeScript/JS extension so Node's built-in test runner can load source files.
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import { resolve as resolvePath, extname, join } from "node:path";

const srcDir = resolvePath(import.meta.dirname, "..", "src");
const EXTS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"];

function withExtension(filePath) {
  if (extname(filePath)) return filePath;
  for (const ext of EXTS) {
    if (existsSync(filePath + ext)) return filePath + ext;
  }
  return filePath;
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const target = withExtension(join(srcDir, specifier.slice(2)));
    return { url: pathToFileURL(target).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
