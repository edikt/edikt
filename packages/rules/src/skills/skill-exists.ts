import { defineRule } from "../define-rule";

export const skillExists = defineRule({
  id: "skill-exists",
  description: "Referenced skill files must exist on disk",
  category: "skills",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
