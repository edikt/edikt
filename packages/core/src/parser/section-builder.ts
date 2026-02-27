import type { Section, Location } from "@edikt/types";
import { toString } from "mdast-util-to-string";

/** Minimal mdast node types — avoids requiring @types/mdast */
type MdastPosition = {
  start: { line: number; column: number; offset?: number };
  end: { line: number; column: number; offset?: number };
};

type MdastNode = {
  type: string;
  position?: MdastPosition;
  depth?: number;
  children?: readonly MdastNode[];
};

export type MdastRoot = {
  type: "root";
  children: readonly MdastNode[];
};

type FlatSection = {
  heading: string;
  depth: number;
  content: string;
  location: Location;
};

function positionToLocation(
  start: { line: number; column: number; offset?: number },
  end: { line: number; column: number; offset?: number }
): Location {
  return {
    start: { line: start.line, column: start.column, offset: start.offset },
    end: { line: end.line, column: end.column, offset: end.offset },
  };
}

/**
 * Extract flat list of sections from mdast tree.
 * Each heading starts a new section. Content between headings
 * is accumulated into the section's content field.
 */
export function buildSections(tree: MdastRoot, rawContent: string): FlatSection[] {
  const lines = rawContent.split("\n");
  const sections: FlatSection[] = [];
  let currentSection: FlatSection | null = null;

  for (const node of tree.children) {
    if (node.type === "heading") {
      // Finish current section
      if (currentSection) {
        sections.push(currentSection);
      }

      const headingText = toString(node);
      const start = node.position?.start ?? { line: 1, column: 1 };
      const end = node.position?.end ?? { line: 1, column: 1 };

      currentSection = {
        heading: headingText,
        depth: node.depth ?? 1,
        content: "",
        location: positionToLocation(start, end),
      };
    } else if (node.type === "yaml") {
      // Skip YAML frontmatter nodes — handled separately
      continue;
    } else {
      if (currentSection && node.position) {
        // Accumulate content lines from the raw content
        const startLine = node.position.start.line;
        const endLine = node.position.end.line;
        const chunk = lines.slice(startLine - 1, endLine).join("\n");

        if (currentSection.content) {
          currentSection.content += `\n\n${chunk}`;
        } else {
          currentSection.content = chunk;
        }

        // Extend the section location to cover this node
        currentSection.location.end = {
          line: node.position.end.line,
          column: node.position.end.column,
          offset: node.position.end.offset,
        };
      } else if (!currentSection && node.position) {
        // Content before first heading: create an implicit root section
        const startLine = node.position.start.line;
        const endLine = node.position.end.line;
        const chunk = lines.slice(startLine - 1, endLine).join("\n");

        currentSection = {
          heading: "",
          depth: 0,
          content: chunk,
          location: positionToLocation(node.position.start, node.position.end),
        };
      }
    }
  }

  // Push the last section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Convert flat section list into a tree based on heading depth.
 * H2 nests under preceding H1, H3 under preceding H2, etc.
 */
export function buildHierarchy(flat: FlatSection[]): Section[] {
  const root: Section[] = [];
  const stack: Section[] = [];

  for (const item of flat) {
    const section: Section = {
      heading: item.heading,
      depth: item.depth,
      content: item.content,
      location: item.location,
      children: [],
    };

    // Find the correct parent by popping sections of equal or greater depth
    while (stack.length > 0 && stack[stack.length - 1].depth >= section.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(section);
    } else {
      stack[stack.length - 1].children.push(section);
    }

    stack.push(section);
  }

  return root;
}
