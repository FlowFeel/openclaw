/**
 * Pure Context Filter Policy Module — Filters workspace context files for prompt assembly.
 * Enables ultra-slim system prompts ("dynamic_only" / "slim_persona"), beating Pi's baseline (< 480 tokens).
 * Zero inline regular expressions.
 */

import {
  contextFileBasename as getContextFileBasename,
  isStaticPersonaBasename,
} from "./context-file-basenames.js";
import type { EmbeddedContextFile } from "./embedded-agent-helpers.js";

export { isStaticPersonaBasename };

export type ContextFilterMode = "all" | "slim_persona" | "dynamic_only";

export type ContextFilterOptions = {
  mode?: ContextFilterMode;
  excludeBasenames?: string[];
  includeBasenames?: string[];
  /** Opt-in: assemble the context section via the canonical compiler. */
  canonicalCompile?: { cPrompt: number };
};

export function filterContextFilesForPrompt(
  files: EmbeddedContextFile[] = [],
  options: ContextFilterOptions = {},
): EmbeddedContextFile[] {
  const mode = options.mode ?? "all";
  const customExclude = new Set(
    (options.excludeBasenames ?? []).map((b) => b.toLowerCase().trim()),
  );
  const customInclude = new Set(
    (options.includeBasenames ?? []).map((b) => b.toLowerCase().trim()),
  );

  if (mode === "all" && customExclude.size === 0 && customInclude.size === 0) {
    return files;
  }

  const result: EmbeddedContextFile[] = [];

  for (const file of files) {
    const basename = getContextFileBasename(file.path);

    if (customInclude.size > 0 && !customInclude.has(basename)) {
      continue;
    }
    if (customExclude.has(basename)) {
      continue;
    }

    if (mode === "dynamic_only") {
      if (isStaticPersonaBasename(basename)) {
        continue;
      }
      result.push(file);
    } else if (mode === "slim_persona") {
      if (basename === "soul.md") {
        result.push({
          path: file.path,
          content: "SOUL.md: Follow agent persona and tone.",
        });
      } else if (basename === "agents.md") {
        result.push({
          path: file.path,
          content: "AGENTS.md: Core operational guidelines.",
        });
      } else if (isStaticPersonaBasename(basename)) {
        continue;
      } else {
        result.push(file);
      }
    } else {
      result.push(file);
    }
  }

  return result;
}
