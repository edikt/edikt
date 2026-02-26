/** Supported AI agent tools */
export type AgentTool = "claude" | "cursor" | "copilot" | "codex" | "gemini" | "custom";

/** Report of a sync operation */
export interface SyncReport {
  /** The source file that was synced from */
  sourceFile: string;
  /** The targets that were synced to */
  targets: SyncTargetResult[];
  /** Total number of sections synced */
  sectionsProcessed: number;
  /** Duration in milliseconds */
  duration: number;
}

/** Result for a single sync target */
export interface SyncTargetResult {
  tool: AgentTool;
  outputPath: string;
  status: "created" | "updated" | "unchanged" | "error";
  error?: string;
}
