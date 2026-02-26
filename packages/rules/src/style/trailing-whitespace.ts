import { defineRule } from "../define-rule";

export const trailingWhitespace = defineRule({
  id: "trailing-whitespace",
  description: "Lines must not have trailing whitespace",
  category: "style",
  defaultSeverity: "warn",
  fixable: true,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
