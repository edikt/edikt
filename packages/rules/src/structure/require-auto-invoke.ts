import { defineRule } from "../define-rule";

export const requireAutoInvoke = defineRule({
  id: "require-auto-invoke",
  description: "AGENTS.md must include an auto-invoke table when skills exist",
  category: "structure",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
