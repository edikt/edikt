import type { AgentTool } from "@edikt/types";

export interface SyncAdapter {
  tool: AgentTool;
  outputFileName: string;
  transform(content: string): string;
  write(outputPath: string, content: string): Promise<void>;
}
