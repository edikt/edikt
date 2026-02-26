/** A detected programming language in the codebase */
export interface DetectedLanguage {
  name: string;
  percentage: number;
  files: number;
}

/** A detected framework in the codebase */
export interface DetectedFramework {
  name: string;
  version?: string;
  configFile?: string;
}

/** A suggested skill based on codebase analysis */
export interface SuggestedSkill {
  name: string;
  templateId: string;
  reason: string;
}

/** Result of analyzing a codebase for init */
export interface CodebaseAnalysis {
  languages: DetectedLanguage[];
  frameworks: DetectedFramework[];
  hasGit: boolean;
  packageManager?: "npm" | "yarn" | "pnpm" | "bun";
  monorepo: boolean;
  existingAgentFiles: string[];
  suggestedSkills: SuggestedSkill[];
}
