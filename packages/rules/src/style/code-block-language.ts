import { defineRule } from "../define-rule";

export const codeBlockLanguage = defineRule({
  id: "code-block-language",
  description: "Fenced code blocks should specify a language",
  category: "style",
  defaultSeverity: "info",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
