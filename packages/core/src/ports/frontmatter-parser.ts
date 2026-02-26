export type FrontmatterResult = {
  frontmatter: Record<string, unknown> | null;
  content: string;
  errors: FrontmatterError[];
};

export type FrontmatterError = {
  message: string;
  line?: number;
};

export type FrontmatterParser = {
  parse: (raw: string) => FrontmatterResult;
};
