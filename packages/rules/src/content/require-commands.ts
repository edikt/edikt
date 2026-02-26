import { defineRule } from "../define-rule";

export const requireCommands = defineRule({
  id: "require-commands",
  description: "Agent file should include runnable commands (build, test, lint)",
  category: "content",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
