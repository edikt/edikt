export type PatternDef = {
  regex: string;
  flags: string;
  ruleId: string;
  message: string;
};

export type PatternMatch = {
  file: string;
  line: number;
  column: number;
  text: string;
  patternIndex: number;
  ruleId: string;
};

export type PatternEngine = {
  search: (files: string[], patterns: PatternDef[]) => Promise<PatternMatch[]>;
};
