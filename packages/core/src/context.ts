import type { EdiktConfig } from "@edikt/types";
import type { FileSystem } from "./ports/file-system";
import type { MarkdownParser } from "./ports/markdown-parser";
import type { FrontmatterParser } from "./ports/frontmatter-parser";
import type { PatternEngine } from "./ports/pattern-engine";
import type { Shell } from "./ports/shell";
import { createBunFileSystem } from "./adapters/fs/bun-fs";
import { createParser } from "./adapters/parser/create-parser";
import { createBunYAMLFrontmatterParser } from "./adapters/frontmatter/bun-yaml-frontmatter";
import { createPatternEngine } from "./adapters/search/create-pattern-engine";
import { createBunShell } from "./adapters/shell/bun-shell";
import { resolveFeatureFlags } from "./flags";

export type EdiktContext = {
  readonly fs: FileSystem;
  readonly parser: MarkdownParser;
  readonly frontmatter: FrontmatterParser;
  readonly patternEngine: PatternEngine;
  readonly shell: Shell;
  readonly config: EdiktConfig;
  readonly cwd: string;
};

export async function createContext(
  overrides?: Partial<EdiktContext>
): Promise<EdiktContext> {
  const flags = resolveFeatureFlags();
  return {
    fs: overrides?.fs ?? createBunFileSystem(),
    parser: overrides?.parser ?? createParser(flags.parser),
    frontmatter: overrides?.frontmatter ?? createBunYAMLFrontmatterParser(),
    patternEngine: overrides?.patternEngine ?? (await createPatternEngine()),
    shell: overrides?.shell ?? createBunShell(),
    config: overrides?.config ?? { rules: {} },
    cwd: overrides?.cwd ?? process.cwd(),
  };
}
