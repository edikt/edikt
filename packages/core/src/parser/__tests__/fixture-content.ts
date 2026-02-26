/** Fixture: A valid AGENTS.md with all major features */
export const VALID_AGENTS_MD = `---
name: test-project
scope: root
---
# Project Overview

This is a test project for validating the Edikt parser.

## Project Structure

The project follows a monorepo layout with packages.

- \`packages/core\` — Core engine
- \`packages/cli\` — CLI interface

## Guidelines and Conventions

- Use TypeScript for all source files
- Follow the Bun-first approach

### Code Style

Use biome for formatting.

## Skills

Available skills for this project:

- [Code Review](.agents/skills/code-review/skill.md)
- [Testing](.agents/skills/testing/skill.md)

## Auto-Invoke

| Skill | Trigger | Scope |
|-------|---------|-------|
| lint | *.ts | root |
| test | *.test.ts | directory |

## Scoped References

See frontend/AGENTS.md for frontend-specific guidelines.
See backend/AGENTS.md for backend-specific guidelines.
`;

/** Fixture: Minimal markdown without frontmatter */
export const MINIMAL_MD = `# Hello World

This is a simple markdown file.
`;

/** Fixture: Markdown with only frontmatter */
export const FRONTMATTER_ONLY = `---
name: my-skill
description: A test skill
trigger: manual
scope: file
version: "1.0"
---
# My Skill

This skill does things.
`;

/** Fixture: Markdown with nested headings */
export const NESTED_HEADINGS = `# Top Level

Top content.

## Second Level A

Content A.

### Third Level

Deep content.

## Second Level B

Content B.
`;

/** Fixture: Markdown with a table but no auto-invoke markers */
export const TABLE_NO_AUTOINVOKE = `# Data

| Name | Value |
|------|-------|
| foo  | bar   |
| baz  | qux   |
`;

/** Fixture: Markdown with malformed frontmatter */
export const MALFORMED_FRONTMATTER = `---
: invalid yaml [
---
# Content After Bad Frontmatter

Some content here.
`;

/** Fixture: Empty markdown */
export const EMPTY_MD = ``;

/** Fixture: Markdown with no headings */
export const NO_HEADINGS = `Just some plain text without any headings.

Another paragraph.
`;

/** Fixture: Skill file */
export const SKILL_FILE = `---
name: code-review
description: Automated code review skill
trigger: on-push
scope: root
tools:
  - grep
  - ast-parser
---
# Code Review Skill

This skill performs automated code reviews.

## Configuration

Set up your review rules in \`.edikt/rules/\`.
`;

/** Fixture: AGENTS.md with scoped references */
export const SCOPED_REFS = `# Project

## Frontend

See frontend/AGENTS.md for details.

## Backend

Reference backend/AGENTS.md for API docs.
Also see shared/CLAUDE.md for shared config.
`;

/** Fixture: Content before first heading */
export const CONTENT_BEFORE_HEADING = `Some preamble content before any heading.

# First Heading

Content under the first heading.
`;
