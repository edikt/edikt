import type { AgentFileAST, Location } from "./ast";
import type { Fix, Suggestion } from "./lint";

/** Severity level for a rule */
export type Severity = "error" | "warn" | "info" | "off";

/** Configuration for a single rule */
export type RuleConfig = Severity | [Severity, Record<string, unknown>];

/** Context provided to a rule's check function */
export interface RuleContext {
  ast: AgentFileAST;
  filePath: string;
  options: Record<string, unknown>;
  report(descriptor: {
    message: string;
    location: Location;
    fix?: Fix;
    suggestions?: Suggestion[];
  }): void;
}

/** A pattern for matching content within agent files */
export interface Pattern {
  id: string;
  regex: RegExp;
  description: string;
}

/** Result of a pattern match */
export interface PatternMatch {
  patternId: string;
  location: Location;
  match: string;
  captures: string[];
}

/** Definition of a lint rule */
export interface Rule {
  id: string;
  description: string;
  category: "structure" | "content" | "skills" | "metadata" | "style" | "best-practice";
  defaultSeverity: Severity;
  fixable: boolean;
  mode: "ast" | "raw" | "both";
  schema?: Record<string, unknown>;
  check(context: RuleContext): void | Promise<void>;
}
