import type { MarkdownParser } from "../../ports/markdown-parser";
import { createUnifiedParser } from "./unified-parser";
import { createBunMarkdownParser } from "./bun-markdown-parser";

export function createParser(engine?: "unified" | "bun"): MarkdownParser {
  switch (engine) {
    case "bun":
      return createBunMarkdownParser();
    case "unified":
    default:
      return createUnifiedParser();
  }
}
