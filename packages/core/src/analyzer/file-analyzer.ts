import type { AgentFileAST, FileMetadata } from "@edikt/types";

/**
 * Analyze a parsed agent file AST and return its metadata.
 * This is a pure function — no I/O, no ports needed.
 */
export function analyzeFile(ast: AgentFileAST): FileMetadata {
  return ast.metadata;
}
