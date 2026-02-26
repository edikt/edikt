import { defineRule } from "../define-rule";

export const requireStructureSection = defineRule({
  id: "require-structure-section",
  description: "Agent file must include a project structure section",
  category: "structure",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
