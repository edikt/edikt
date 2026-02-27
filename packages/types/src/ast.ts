/** Supported agent configuration file types */
export type FileType =
  | "agents.md"
  | "claude.md"
  | "cursorrules"
  | "copilot-instructions"
  | "skill"
  | "unknown";

/** Position within a file (1-based) */
export interface Position {
  line: number;
  column: number;
  offset?: number;
}

/** Location range within a file */
export interface Location {
  start: Position;
  end: Position;
}

/** Frontmatter metadata for skill files */
export interface SkillFrontmatter {
  name: string;
  description?: string;
  trigger?: string;
  scope?: "root" | "directory" | "file";
  version?: string;
  author?: string;
  tools?: string[];
  [key: string]: unknown;
}

/** A single row in an auto-invoke table */
export interface AutoInvokeRow {
  skill: string;
  trigger: string;
  scope?: string;
}

/** Auto-invoke table parsed from AGENTS.md */
export interface AutoInvokeTable {
  rows: AutoInvokeRow[];
  location: Location;
}

/** A reference to a skill file from within an agent config */
export interface SkillReference {
  name: string;
  path: string;
  location: Location;
  exists?: boolean;
}

/** A section within an agent configuration file */
export interface Section {
  heading: string;
  depth: number;
  content: string;
  location: Location;
  children: Section[];
}

/** Metadata about an agent configuration file */
export interface FileMetadata {
  filePath: string;
  lineCount: number;
  wordCount: number;
  characterCount: number;
  hasProjectOverview: boolean;
  hasStructureSection: boolean;
  hasGuidelinesSection: boolean;
  hasSkillsSection: boolean;
  hasAutoInvokeSection: boolean;
  hasScopedReferences: boolean;
}

/** Parsed AST representation of an agent configuration file */
export interface AgentFileAST {
  type: "agent-file";
  fileType: FileType;
  metadata: FileMetadata;
  sections: Section[];
  frontmatter?: SkillFrontmatter;
  autoInvokeTable?: AutoInvokeTable;
  skillReferences: SkillReference[];
  scopedFileReferences: string[];
}
