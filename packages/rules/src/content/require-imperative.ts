import { defineRule } from "../define-rule";

export const requireImperative = defineRule({
  id: "require-imperative",
  description: "Instructions should use imperative mood (ALWAYS, NEVER, DO, etc.)",
  category: "content",
  defaultSeverity: "info",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
