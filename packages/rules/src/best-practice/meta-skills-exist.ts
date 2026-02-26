import { defineRule } from "../define-rule";

export const metaSkillsExist = defineRule({
  id: "meta-skills-exist",
  description: "Meta-skills referenced in config must exist",
  category: "best-practice",
  defaultSeverity: "error",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
