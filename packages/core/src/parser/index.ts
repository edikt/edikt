import type { AgentFileAST, SkillFrontmatter } from "@edikt/types";
import type { MarkdownParser, ParseOptions } from "../ports/markdown-parser";
import type { FrontmatterParser } from "../ports/frontmatter-parser";
import type { FileSystem } from "../ports/file-system";

/**
 * Validate and coerce a frontmatter record into SkillFrontmatter.
 * Returns undefined if the record doesn't have the minimum required fields.
 */
function validateSkillFrontmatter(
  raw: Record<string, unknown>
): SkillFrontmatter | undefined {
  const name = raw.name;
  if (typeof name !== "string" || name.length === 0) {
    return undefined;
  }

  return {
    name,
    description:
      typeof raw.description === "string" ? raw.description : undefined,
    trigger: typeof raw.trigger === "string" ? raw.trigger : undefined,
    scope:
      raw.scope === "root" || raw.scope === "directory" || raw.scope === "file"
        ? raw.scope
        : undefined,
    version: typeof raw.version === "string" ? raw.version : undefined,
    author: typeof raw.author === "string" ? raw.author : undefined,
    tools: Array.isArray(raw.tools)
      ? raw.tools.filter((t): t is string => typeof t === "string")
      : undefined,
    ...raw,
  };
}

/**
 * Parse markdown content into an AgentFileAST.
 * Takes parser and frontmatter as explicit arguments (no global state).
 */
export function parse(
  content: string,
  opts: ParseOptions & {
    parser: MarkdownParser;
    frontmatter: FrontmatterParser;
  }
): AgentFileAST {
  // 1. Extract frontmatter
  const fm = opts.frontmatter.parse(content);

  // 2. Parse the markdown content (without frontmatter)
  const ast = opts.parser.parse(fm.content, opts);

  // 3. Attach frontmatter to AST
  if (fm.frontmatter) {
    ast.frontmatter = validateSkillFrontmatter(fm.frontmatter);
  }

  // 4. Recalculate metadata with original content (including frontmatter lines)
  ast.metadata.lineCount = content.split("\n").length;
  ast.metadata.characterCount = content.length;
  ast.metadata.wordCount = content.split(/\s+/).filter(Boolean).length;

  return ast;
}

/**
 * Convenience: read file from filesystem, then parse.
 */
export async function parseFile(
  filePath: string,
  deps: {
    fs: FileSystem;
    parser: MarkdownParser;
    frontmatter: FrontmatterParser;
  }
): Promise<AgentFileAST> {
  const content = await deps.fs.readFile(filePath);
  return parse(content, { ...deps, filePath });
}
