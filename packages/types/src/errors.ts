/** Error codes for Edikt errors */
export enum ErrorCode {
  // Parse errors
  PARSE_ERROR = "PARSE_ERROR",
  INVALID_FRONTMATTER = "INVALID_FRONTMATTER",
  INVALID_MARKDOWN = "INVALID_MARKDOWN",

  // Config errors
  CONFIG_NOT_FOUND = "CONFIG_NOT_FOUND",
  CONFIG_INVALID = "CONFIG_INVALID",
  CONFIG_SCHEMA_ERROR = "CONFIG_SCHEMA_ERROR",

  // Rule errors
  RULE_NOT_FOUND = "RULE_NOT_FOUND",
  RULE_ERROR = "RULE_ERROR",

  // File errors
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  FILE_READ_ERROR = "FILE_READ_ERROR",
  FILE_WRITE_ERROR = "FILE_WRITE_ERROR",

  // Sync errors
  SYNC_ERROR = "SYNC_ERROR",
  ADAPTER_NOT_FOUND = "ADAPTER_NOT_FOUND",

  // General errors
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

/** Custom error class for Edikt */
export class EdiktError extends Error {
  public readonly code: ErrorCode;
  public readonly filePath?: string;

  constructor(message: string, code: ErrorCode, filePath?: string) {
    super(message);
    this.name = "EdiktError";
    this.code = code;
    this.filePath = filePath;
  }
}
