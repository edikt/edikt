import type { Location } from "./ast";

/** A suggested fix that can be automatically applied */
export interface Fix {
  range: Location;
  text: string;
}

/** A suggestion for improving the file (not auto-fixable) */
export interface Suggestion {
  description: string;
  fix?: Fix;
}

/** A single lint message (error, warning, or info) */
export interface LintMessage {
  ruleId: string;
  severity: "error" | "warn" | "info";
  message: string;
  location: Location;
  fix?: Fix;
  suggestions?: Suggestion[];
}

/** Result of linting a single file */
export interface LintResult {
  filePath: string;
  messages: LintMessage[];
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  source?: string;
}
