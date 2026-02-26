import { defineRule } from "../define-rule";

export const skillNameConvention = defineRule({
  id: "skill-name-convention",
  description: "Skill file names must follow kebab-case convention",
  category: "skills",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
