import { defineRule } from "../define-rule";

export const orphanSkill = defineRule({
  id: "orphan-skill",
  description: "Skill files must be referenced from AGENTS.md",
  category: "skills",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
