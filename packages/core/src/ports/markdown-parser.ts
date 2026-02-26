import type { AgentFileAST } from "@edikt/types";

export type ParseOptions = {
  filePath?: string;
  rootDir?: string;
};

export type MarkdownParser = {
  parse: (content: string, opts?: ParseOptions) => AgentFileAST;
};
