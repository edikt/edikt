import type { FileType } from "@edikt/types";
import { basename } from "node:path";

/**
 * Determine the file type from a file path.
 */
export function getFileType(filePath?: string): FileType {
  if (!filePath) return "unknown";

  const name = basename(filePath).toLowerCase();

  if (name === "agents.md") return "agents.md";
  if (name === "claude.md" || name === ".claude") return "claude.md";
  if (name === ".cursorrules" || name === "cursorrules") return "cursorrules";
  if (name === ".copilot-instructions.md" || name === "copilot-instructions.md")
    return "copilot-instructions";
  if (name === "skill.md" || filePath.includes(".agents/skills/"))
    return "skill";

  return "unknown";
}

/**
 * Normalize a file path to use forward slashes and remove trailing slashes.
 */
export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/").replace(/\/+$/, "");
}
