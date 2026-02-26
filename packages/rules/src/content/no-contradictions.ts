import { defineRule } from "../define-rule";

export const noContradictions = defineRule({
  id: "no-contradictions",
  description: "Instructions must not contradict each other",
  category: "content",
  defaultSeverity: "error",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
