import fs from "node:fs";
import path from "node:path";
import {
  extractFrontmatterBlock,
  parseFrontmatterBlock,
} from "../../packages/markdown-core/src/frontmatter.js";
import { isPathInside } from "../infra/path-guards.js";

/**
 * Maximum transclusion recursion depth to prevent infinite alias loops (Axiom L2).
 */
const MAX_TRANSCLUSION_DEPTH = 3;

/**
 * Maximum byte size allowed for aggregated literate bootstrap content (Axiom L4).
 */
const MAX_LITERATE_SURFACE_BYTES = 64 * 1024; // 64 KB

export interface ResolveLiterateSurfaceParams {
  readonly workspaceDir: string;
  readonly filePath: string;
  readonly rawContent: string;
  readonly depth?: number;
  readonly visitedPaths?: Set<string>;
}

export interface ResolveLiterateSurfaceResult {
  readonly content: string;
  readonly transcludedPaths: readonly string[];
  readonly redirected: boolean;
}

/**
 * Resolves literate markdown surfaces by expanding frontmatter `redirect:` stubs
 * or pointer stubs into rich, transcluded context.
 *
 * Supports both single file targets (e.g. `soul/identity.md`) and directory-level
 * aggregation targets (e.g. `soul/` aggregating all `soul/*.md` files).
 *
 * Enforces:
 * - Axiom L1: Deterministic Transclusion
 * - Axiom L2: Cyclic Loop Immunity (depth <= 3, visited path set)
 * - Axiom L3: Sandbox Path Containment (isPathInside)
 * - Axiom L4: Bounded Context Budget (<= 64 KB)
 *
 * @dft
 */
export function resolveLiterateMarkdownSurface(
  params: ResolveLiterateSurfaceParams,
): ResolveLiterateSurfaceResult {
  const { workspaceDir, filePath, rawContent } = params;
  const depth = params.depth ?? 0;
  const visitedPaths = params.visitedPaths ?? new Set<string>();

  if (!rawContent || depth > MAX_TRANSCLUSION_DEPTH) {
    return { content: rawContent, transcludedPaths: [], redirected: false };
  }

  const normalizedCurrentPath = path.resolve(filePath);
  visitedPaths.add(normalizedCurrentPath);

  // 1. Extract YAML Frontmatter
  const fmBlock = extractFrontmatterBlock(rawContent);
  let redirectTarget: string | undefined;

  if (fmBlock) {
    const parsedFm = parseFrontmatterBlock(fmBlock.block);
    if (typeof parsedFm.redirect === "string" && parsedFm.redirect.trim()) {
      redirectTarget = parsedFm.redirect.trim();
    }
  }

  // 2. Check for literate pointer stub in body (e.g., "→ soul/identity.md" or "-> soul/")
  if (!redirectTarget) {
    const bodyText = fmBlock ? fmBlock.body : rawContent;
    const stubMatch = bodyText.match(/^\s*(?:→|->)\s*([^\s\n\r]+)/m);
    if (stubMatch && stubMatch[1]) {
      redirectTarget = stubMatch[1].trim();
    }
  }

  if (!redirectTarget) {
    return { content: rawContent, transcludedPaths: [], redirected: false };
  }

  // Clean and resolve target path inside workspace
  const cleanTarget = redirectTarget.replace(/\/+$/, "");
  const targetFullPath = path.resolve(workspaceDir, cleanTarget);

  // Axiom L3: Sandbox Containment Guard
  if (!isPathInside(workspaceDir, targetFullPath)) {
    return { content: rawContent, transcludedPaths: [], redirected: false };
  }

  if (visitedPaths.has(targetFullPath)) {
    return { content: rawContent, transcludedPaths: [], redirected: false };
  }

  if (!fs.existsSync(targetFullPath)) {
    return { content: rawContent, transcludedPaths: [], redirected: false };
  }

  const stat = fs.statSync(targetFullPath);
  const transcludedPaths: string[] = [];

  // Case A: Single Markdown File Target
  if (stat.isFile()) {
    transcludedPaths.push(targetFullPath);
    try {
      const fileBytes = fs.readFileSync(targetFullPath, "utf-8");
      const subResult = resolveLiterateMarkdownSurface({
        workspaceDir,
        filePath: targetFullPath,
        rawContent: fileBytes,
        depth: depth + 1,
        visitedPaths: new Set(visitedPaths),
      });

      transcludedPaths.push(...subResult.transcludedPaths);

      // Preserve original frontmatter block if present, replace body with transcluded body
      const subFm = extractFrontmatterBlock(subResult.content);
      const transcludedBody = subFm ? subFm.body.trim() : subResult.content.trim();

      const finalContent = fmBlock
        ? `${fmBlock.block.trim()}\n\n${transcludedBody}`
        : transcludedBody;

      return {
        content: finalContent.slice(0, MAX_LITERATE_SURFACE_BYTES),
        transcludedPaths,
        redirected: true,
      };
    } catch {
      return { content: rawContent, transcludedPaths: [], redirected: false };
    }
  }

  // Case B: Directory Target (Aggregate all markdown files)
  if (stat.isDirectory()) {
    try {
      const entries = fs.readdirSync(targetFullPath, { withFileTypes: true });
      const mdFiles = entries
        .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".md"))
        .map((e) => path.join(targetFullPath, e.name))
        .sort((a, b) => a.localeCompare(b));

      if (mdFiles.length === 0) {
        return { content: rawContent, transcludedPaths: [], redirected: false };
      }

      const sections: string[] = [];

      for (const mdFile of mdFiles) {
        if (visitedPaths.has(mdFile)) continue;
        transcludedPaths.push(mdFile);

        try {
          const content = fs.readFileSync(mdFile, "utf-8");
          const subResult = resolveLiterateMarkdownSurface({
            workspaceDir,
            filePath: mdFile,
            rawContent: content,
            depth: depth + 1,
            visitedPaths: new Set(visitedPaths),
          });

          transcludedPaths.push(...subResult.transcludedPaths);

          const subFm = extractFrontmatterBlock(subResult.content);
          const body = (subFm ? subFm.body : subResult.content).trim();
          const relPath = path.relative(workspaceDir, mdFile);
          const title = path.basename(mdFile, ".md").replace(/[-_]/g, " ").toUpperCase();

          sections.push(`### Surface: ${title} (${relPath})\n\n${body}`);
        } catch {
          // Skip unreadable files gracefully
        }
      }

      if (sections.length === 0) {
        return { content: rawContent, transcludedPaths: [], redirected: false };
      }

      const aggregatedBody = sections.join("\n\n---\n\n");
      const finalContent = fmBlock
        ? `${fmBlock.block.trim()}\n\n${aggregatedBody}`
        : aggregatedBody;

      return {
        content: finalContent.slice(0, MAX_LITERATE_SURFACE_BYTES),
        transcludedPaths,
        redirected: true,
      };
    } catch {
      return { content: rawContent, transcludedPaths: [], redirected: false };
    }
  }

  return { content: rawContent, transcludedPaths: [], redirected: false };
}
