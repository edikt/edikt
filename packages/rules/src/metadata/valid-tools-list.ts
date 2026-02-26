import { defineRule } from "../define-rule";

export const validToolsList = defineRule({
  id: "valid-tools-list",
  description: "Frontmatter tools must be an array of valid tool names",
  category: "metadata",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
