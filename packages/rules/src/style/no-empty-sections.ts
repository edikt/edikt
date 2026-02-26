import { defineRule } from "../define-rule";

export const noEmptySections = defineRule({
  id: "no-empty-sections",
  description: "Sections must not be empty",
  category: "style",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
