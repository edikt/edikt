import { defineRule } from "../define-rule";

export const skillHasExamples = defineRule({
  id: "skill-has-examples",
  description: "Skills should include usage examples",
  category: "skills",
  defaultSeverity: "info",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
