import { defineRule } from "../define-rule";

export const validFrontmatter = defineRule({
  id: "valid-frontmatter",
  description: "Frontmatter YAML must be valid and parseable",
  category: "metadata",
  defaultSeverity: "error",
  fixable: false,
  mode: "raw",
  check: (_context) => {
    // TODO: Implement
  },
});
