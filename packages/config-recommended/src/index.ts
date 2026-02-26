import type { EdiktConfig } from "@edikt/types";

const recommended: EdiktConfig = {
  rules: {
    // Structure
    "line-budget": "warn",
    "require-project-overview": "error",
    "require-structure-section": "warn",
    "heading-hierarchy": "warn",
    "single-h1": "error",

    // Content
    "no-vague-rules": "warn",
    "require-testing": "warn",
    "require-commands": "warn",
    "no-todo-instructions": "warn",

    // Skills
    "skill-exists": "error",
    "skill-metadata": "error",
    "skill-scope-valid": "error",

    // Metadata
    "valid-frontmatter": "error",
    "required-fields": "error",

    // Style
    "trailing-whitespace": "warn",
    "final-newline": "warn",
    "no-empty-sections": "warn",
  },
};

export default recommended;
