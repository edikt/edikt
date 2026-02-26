import type { EdiktConfig, LintResult } from "@edikt/types";

// Stub — implementation pending
export class Edikt {
  private config: EdiktConfig | undefined;

  constructor(config?: EdiktConfig) {
    this.config = config;
  }

  async lint(_files?: string[]): Promise<LintResult[]> {
    throw new Error("Not implemented");
  }

  async format(_files?: string[]): Promise<void> {
    throw new Error("Not implemented");
  }

  async sync(): Promise<void> {
    throw new Error("Not implemented");
  }
}
