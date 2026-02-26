export type FeatureFlags = {
  parser: "unified" | "bun";
  bunYaml: boolean;
};

export function resolveFeatureFlags(
  env: Record<string, string | undefined> = process.env
): FeatureFlags {
  return {
    parser: (env.EDIKT_PARSER as FeatureFlags["parser"]) ?? "unified",
    bunYaml: env.EDIKT_BUN_YAML !== "false",
  };
}
