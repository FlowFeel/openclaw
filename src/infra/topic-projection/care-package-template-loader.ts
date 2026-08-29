/**
 * Care Package Template Workspace Loader Boundary.
 *
 * @dft
 * - Axiom A2: Isolated filesystem I/O boundary. Reads template file or falls back to pure generator.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { buildTopicCarePackage } from "./care-package-builder.js";
import {
  interpolateCarePackageTemplate,
  type CarePackageVariables,
} from "./care-package-template-engine.js";

/**
 * Loads and renders the Care Package template for a topic.
 */
export async function renderCarePackageTemplate(
  variables: CarePackageVariables,
  options?: {
    readonly workspaceRoot?: string;
    readonly templatePath?: string;
  },
): Promise<string> {
  const workspaceRoot = options?.workspaceRoot ?? process.cwd();
  const relPath = options?.templatePath ?? "meta/care-package.md";
  const fullPath = path.isAbsolute(relPath) ? relPath : path.join(workspaceRoot, relPath);

  try {
    const rawContent = await fs.readFile(fullPath, "utf-8");
    if (rawContent && rawContent.trim().length > 0) {
      return interpolateCarePackageTemplate(rawContent, variables);
    }
  } catch {
    // If template file is absent or unreadable, fall back to pure DFT generator
  }

  const purePkg = buildTopicCarePackage({
    name: variables.topic_title,
    archetype: "feature_delivery",
    mission: `Orientation drop for ${variables.topic_title}`,
    chatId: variables.group,
  });

  return purePkg.telegramCardMarkdown;
}
