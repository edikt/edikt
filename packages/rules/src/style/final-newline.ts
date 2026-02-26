import { defineRule } from "../define-rule";

export const finalNewline = defineRule({
  id: "final-newline",
  description: "File must end with a final newline",
  category: "style",
  defaultSeverity: "warn",
  fixable: true,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
