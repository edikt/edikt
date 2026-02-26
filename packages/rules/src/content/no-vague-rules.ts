import { defineRule } from "../define-rule";

export const noVagueRules = defineRule({
  id: "no-vague-rules",
  description: "Rules must be specific and actionable, not vague",
  category: "content",
  defaultSeverity: "warn",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
