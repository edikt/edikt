import type { RuleConfig } from "./rules";

/** Format options for edikt fmt */
export interface FormatOptions {
  indentSize?: number;
  insertFinalNewline?: boolean;
  trimTrailingWhitespace?: boolean;
  maxLineLength?: number;
  headingStyle?: "atx" | "setext";
  listStyle?: "dash" | "asterisk" | "plus";
  emphasisStyle?: "underscore" | "asterisk";
  tableAlignment?: boolean;
}

/** Target for syncing agent configuration */
export interface SyncTarget {
  tool: string;
  outputPath: string;
  sections?: string[];
  transform?: string;
}

/** Main Edikt configuration */
export interface EdiktConfig {
  /** Glob patterns for files to include */
  include?: string[];
  /** Glob patterns for files to exclude */
  exclude?: string[];
  /** Rule configurations */
  rules?: Record<string, RuleConfig>;
  /** Extends a shared config */
  extends?: string | string[];
  /** Format options */
  format?: FormatOptions;
  /** Sync targets */
  sync?: SyncTarget[];
  /** Plugins to load */
  plugins?: string[];
}
