import { describe, test, expect } from "bun:test";
import { resolveFeatureFlags } from "../flags";

describe("resolveFeatureFlags", () => {
  test("defaults to unified parser", () => {
    const flags = resolveFeatureFlags({});
    expect(flags.parser).toBe("unified");
  });

  test("respects EDIKT_PARSER=bun", () => {
    const flags = resolveFeatureFlags({ EDIKT_PARSER: "bun" });
    expect(flags.parser).toBe("bun");
  });

  test("respects EDIKT_PARSER=unified", () => {
    const flags = resolveFeatureFlags({ EDIKT_PARSER: "unified" });
    expect(flags.parser).toBe("unified");
  });

  test("defaults bunYaml to true", () => {
    const flags = resolveFeatureFlags({});
    expect(flags.bunYaml).toBe(true);
  });

  test("disables bunYaml when EDIKT_BUN_YAML=false", () => {
    const flags = resolveFeatureFlags({ EDIKT_BUN_YAML: "false" });
    expect(flags.bunYaml).toBe(false);
  });

  test("keeps bunYaml true for any other value", () => {
    const flags = resolveFeatureFlags({ EDIKT_BUN_YAML: "true" });
    expect(flags.bunYaml).toBe(true);
  });
});
