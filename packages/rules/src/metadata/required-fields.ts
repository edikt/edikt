import { defineRule } from "../define-rule";

export const requiredFields = defineRule({
  id: "required-fields",
  description: "Frontmatter must include required fields (name, description)",
  category: "metadata",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
