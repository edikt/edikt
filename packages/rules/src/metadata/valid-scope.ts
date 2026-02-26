import { defineRule } from "../define-rule";

export const validScope = defineRule({
  id: "valid-scope",
  description: "Frontmatter scope must be one of: root, directory, file",
  category: "metadata",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
