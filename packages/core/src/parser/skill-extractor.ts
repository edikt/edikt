import type { Section, SkillReference, Location } from "@edikt/types";

// Match markdown links: [text](path)
const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

// Match skill-like paths: .agents/skills/*, skill.md, etc.
const SKILL_PATH_REGEX = /\.agents\/skills\/|skill\.md$/;

// Match scoped AGENTS.md references: path/to/AGENTS.md
const SCOPED_REF_REGEX =
  /(?:^|\s)((?:[\w.-]+\/)+(?:AGENTS\.md|CLAUDE\.md))(?:\s|$|[,;)])/g;

/**
 * Extract skill references from markdown links within sections.
 * Returns references with exists=false (resolver fills that in later).
 */
export function extractSkillReferences(
  sections: Section[],
  rawContent: string
): SkillReference[] {
  const references: SkillReference[] = [];
  const seen = new Set<string>();

  // Walk all sections recursively
  function walkSections(sectionList: Section[]): void {
    for (const section of sectionList) {
      extractFromContent(section.content, section.location);
      walkSections(section.children);
    }
  }

  function extractFromContent(content: string, sectionLocation: Location): void {
    let match: RegExpExecArray | null;
    const regex = new RegExp(LINK_REGEX.source, LINK_REGEX.flags);

    while ((match = regex.exec(content)) !== null) {
      const name = match[1];
      const path = match[2];

      // Only extract references that look like skill paths
      if (SKILL_PATH_REGEX.test(path) && !seen.has(path)) {
        seen.add(path);
        references.push({
          name,
          path,
          location: sectionLocation,
          exists: false,
        });
      }
    }
  }

  walkSections(sections);

  // Also scan raw content for any inline skill references not within sections
  let match: RegExpExecArray | null;
  const rawRegex = new RegExp(LINK_REGEX.source, LINK_REGEX.flags);
  while ((match = rawRegex.exec(rawContent)) !== null) {
    const path = match[2];
    if (SKILL_PATH_REGEX.test(path) && !seen.has(path)) {
      seen.add(path);
      const lineNum = rawContent.substring(0, match.index).split("\n").length;
      references.push({
        name: match[1],
        path,
        location: {
          start: { line: lineNum, column: 1 },
          end: { line: lineNum, column: match[0].length + 1 },
        },
        exists: false,
      });
    }
  }

  return references;
}

/**
 * Extract scoped AGENTS.md / CLAUDE.md references (e.g. "frontend/AGENTS.md").
 */
export function extractScopedReferences(
  sections: Section[],
  rawContent: string
): string[] {
  const refs = new Set<string>();

  // Scan raw content for scoped references
  let match: RegExpExecArray | null;
  const regex = new RegExp(SCOPED_REF_REGEX.source, SCOPED_REF_REGEX.flags);
  while ((match = regex.exec(rawContent)) !== null) {
    refs.add(match[1]);
  }

  // Also scan section content
  function walkSections(sectionList: Section[]): void {
    for (const section of sectionList) {
      const contentRegex = new RegExp(
        SCOPED_REF_REGEX.source,
        SCOPED_REF_REGEX.flags
      );
      let contentMatch: RegExpExecArray | null;
      while ((contentMatch = contentRegex.exec(section.content)) !== null) {
        refs.add(contentMatch[1]);
      }
      walkSections(section.children);
    }
  }
  walkSections(sections);

  return [...refs];
}
