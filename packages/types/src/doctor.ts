/** Result of a single health check */
export interface HealthCheckResult {
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
  suggestion?: string;
}

/** A health check definition */
export interface HealthCheck {
  id: string;
  name: string;
  description: string;
  category: "structure" | "skills" | "sync" | "git" | "compatibility";
  run(rootDir: string): Promise<HealthCheckResult>;
}

/** Overall health report */
export interface HealthReport {
  score: number;
  maxScore: number;
  checks: HealthCheckResult[];
  summary: string;
}
