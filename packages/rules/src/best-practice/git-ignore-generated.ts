import { defineRule } from "../define-rule";

export const gitIgnoreGenerated = defineRule({
  id: "git-ignore-generated",
  description: "Generated sync files should be in .gitignore",
  category: "best-practice",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
