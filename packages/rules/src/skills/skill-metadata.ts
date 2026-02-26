import { defineRule } from "../define-rule";

export const skillMetadata = defineRule({
  id: "skill-metadata",
  description: "Skill files must have valid frontmatter metadata",
  category: "skills",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
