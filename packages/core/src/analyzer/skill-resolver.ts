import type { SkillReference } from "@edikt/types";
import type { FileSystem } from "../ports/file-system";

export interface ResolveOptions {
  rootDir: string;
  skillsDirectory?: string;
}

/**
 * Resolve skill references against the filesystem.
 * Updates the `exists` field of each reference.
 */
export async function resolveSkillReferences(
  references: SkillReference[],
  fs: FileSystem,
  options: ResolveOptions
): Promise<SkillReference[]> {
  return Promise.all(
    references.map(async (ref) => ({
      ...ref,
      exists: await fs.exists(`${options.rootDir}/${ref.path}`),
    }))
  );
}

/**
 * Discover all skill.md files in the skills directory.
 */
export async function discoverSkills(
  fs: FileSystem,
  options: ResolveOptions
): Promise<string[]> {
  const dir = options.skillsDirectory ?? ".agents/skills";
  return fs.glob(`${dir}/**/skill.md`, { cwd: options.rootDir });
}
