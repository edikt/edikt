import { defineRule } from "../define-rule";

export const validVersion = defineRule({
  id: "valid-version",
  description: "Frontmatter version must follow semver format",
  category: "metadata",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
