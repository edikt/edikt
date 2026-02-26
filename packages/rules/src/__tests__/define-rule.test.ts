import { describe, expect, it } from "bun:test";
import { defineRule } from "../define-rule";

describe("defineRule", () => {
  it("should return the rule as-is", () => {
    const rule = defineRule({
      id: "test-rule",
      description: "A test rule",
      category: "structure",
      defaultSeverity: "warn",
      fixable: false,
      mode: "ast",
      check: () => {},
    });
    expect(rule.id).toBe("test-rule");
  });
});
