// Context
export { createContext } from "./context";
export type { EdiktContext } from "./context";

// Feature flags
export { resolveFeatureFlags } from "./flags";

// Parser orchestration
export { parse, parseFile } from "./parser";

// Analyzer
export { analyzeFile } from "./analyzer/file-analyzer";
export {
  resolveSkillReferences,
  discoverSkills,
} from "./analyzer/skill-resolver";

// Port types (for consumers who need to create custom adapters)
export type { FileSystem } from "./ports/file-system";
export type { MarkdownParser, ParseOptions } from "./ports/markdown-parser";
export type {
  FrontmatterParser,
  FrontmatterResult,
} from "./ports/frontmatter-parser";
export type {
  PatternEngine,
  PatternMatch,
  PatternDef,
} from "./ports/pattern-engine";
export type { Shell, ShellResult } from "./ports/shell";
export type { Reporter } from "./ports/reporter";

// Adapter factories (for explicit construction)
export { createBunFileSystem } from "./adapters/fs/bun-fs";
export { createMemoryFileSystem } from "./adapters/fs/memory-fs";
export { createParser } from "./adapters/parser/create-parser";
export { createBunYAMLFrontmatterParser } from "./adapters/frontmatter/bun-yaml-frontmatter";
export { createBunShell } from "./adapters/shell/bun-shell";

// Utils
export { getFileType, normalizePath } from "./utils/paths";

// Re-export types
export type {
  AgentFileAST,
  FileMetadata,
  Section,
  SkillFrontmatter,
  AutoInvokeTable,
  AutoInvokeRow,
  SkillReference,
  FileType,
  LintResult,
  LintMessage,
} from "@edikt/types";
