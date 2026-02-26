import type { EdiktConfig } from "@edikt/types";

const strict: EdiktConfig = {
  extends: "@edikt/config-recommended",
  rules: {
    // Upgrade warnings to errors
    "line-budget": "error",
    "require-structure-section": "error",
    "require-auto-invoke": "error",
    "heading-hierarchy": "error",

    // Content
    "no-vague-rules": "error",
    "require-imperative": "warn",
    "no-contradictions": "error",
    "require-testing": "error",
    "require-commands": "error",
    "no-todo-instructions": "error",

    // Skills
    "skill-has-examples": "warn",
    "orphan-skill": "error",
    "skill-name-convention": "error",

    // Metadata
    "valid-scope": "error",
    "valid-version": "error",
    "valid-tools-list": "error",

    // Style
    "consistent-headings": "error",
    "trailing-whitespace": "error",
    "final-newline": "error",
    "no-empty-sections": "error",
    "table-alignment": "warn",
    "code-block-language": "warn",

    // Best practice
    "prefer-symlinks": "warn",
    "no-absolute-paths": "error",
    "git-ignore-generated": "error",
    "meta-skills-exist": "error",
    "scoped-file-referenced": "warn",
  },
};

export default strict;
