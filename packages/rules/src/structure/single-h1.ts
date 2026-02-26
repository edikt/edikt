import { defineRule } from "../define-rule";

export const singleH1 = defineRule({
  id: "single-h1",
  description: "File must have exactly one H1 heading",
  category: "structure",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
