import { defineRule } from "../define-rule";

export const lineBudget = defineRule({
  id: "line-budget",
  description: "File must not exceed configured line limit",
  category: "structure",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
