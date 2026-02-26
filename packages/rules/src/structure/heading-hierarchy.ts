import { defineRule } from "../define-rule";

export const headingHierarchy = defineRule({
  id: "heading-hierarchy",
  description: "Headings must follow a proper hierarchy without skipping levels",
  category: "structure",
  defaultSeverity: "warn",
  fixable: false,
  mode: "ast",
  check: (_context) => {
    // TODO: Implement
  },
});
