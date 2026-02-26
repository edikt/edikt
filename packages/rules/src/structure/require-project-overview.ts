import { defineRule } from "../define-rule";

export const requireProjectOverview = defineRule({
  id: "require-project-overview",
  description: "Agent file must include a project overview section",
  category: "structure",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
