import { defineRule } from "../define-rule";

export const skillScopeValid = defineRule({
  id: "skill-scope-valid",
  description: "Skill scope must be one of: root, directory, file",
  category: "skills",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
