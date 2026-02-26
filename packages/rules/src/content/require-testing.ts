import { defineRule } from "../define-rule";

export const requireTesting = defineRule({
  id: "require-testing",
  description: "Agent file should include testing instructions",
  category: "content",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
