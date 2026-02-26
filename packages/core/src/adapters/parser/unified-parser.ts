import type { MarkdownParser, ParseOptions } from "../../ports/markdown-parser";
import type { AgentFileAST } from "@edikt/types";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import type { MdastRoot } from "../../parser/section-builder";
import {
  buildSections,
  buildHierarchy,
} from "../../parser/section-builder";
import {
  extractSkillReferences,
  extractScopedReferences,
} from "../../parser/skill-extractor";
import { tryExtractAutoInvokeTable } from "../../parser/table-parser";
import { getFileType } from "../../utils/paths";
import type { Section } from "@edikt/types";

function anySectionMatches(
  sections: Section[],
  predicate: (s: Section) => boolean
): boolean {
  for (const s of sections) {
    if (predicate(s)) return true;
    if (anySectionMatches(s.children, predicate)) return true;
  }
  return false;
}

export function createUnifiedParser(): MarkdownParser {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ["yaml"]);

  return {
    parse(content: string, opts?: ParseOptions): AgentFileAST {
      const mdast = processor.parse(content) as unknown as MdastRoot;
      const sections = buildHierarchy(buildSections(mdast, content));
      const autoInvokeTable = tryExtractAutoInvokeTable(sections);
      const skillReferences = extractSkillReferences(sections, content);
      const scopedFileReferences = extractScopedReferences(sections, content);
      const fileType = getFileType(opts?.filePath);

      return {
        type: "agent-file",
        fileType,
        metadata: {
          filePath: opts?.filePath ?? "<unknown>",
          lineCount: content.split("\n").length,
          wordCount: content.split(/\s+/).filter(Boolean).length,
          characterCount: content.length,
          hasProjectOverview: anySectionMatches(sections, (s) =>
            s.heading?.toLowerCase().includes("project overview")
          ),
          hasStructureSection: anySectionMatches(sections, (s) =>
            s.heading?.toLowerCase().includes("structure")
          ),
          hasGuidelinesSection: anySectionMatches(sections, (s) =>
            s.heading?.toLowerCase().includes("guideline") ||
            s.heading?.toLowerCase().includes("convention")
          ),
          hasSkillsSection: anySectionMatches(sections, (s) =>
            s.heading?.toLowerCase().includes("skills")
          ),
          hasAutoInvokeSection: autoInvokeTable !== undefined,
          hasScopedReferences: scopedFileReferences.length > 0,
        },
        sections,
        frontmatter: undefined, // Set by orchestrator after frontmatter parsing
        autoInvokeTable: autoInvokeTable ?? undefined,
        skillReferences,
        scopedFileReferences,
      };
    },
  };
}
