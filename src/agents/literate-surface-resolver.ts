/**
 * Literate Markdown Surface & MD-RAG Resolver.
 *
 * @dft:axiom L1 (Deterministic Transclusion)
 * @dft:axiom L2 (Cyclic Loop Immunity, depth <= 3)
 * @dft:axiom L3 (Sandbox Path Containment)
 * @dft:axiom L4 (Bounded Literate Surface Budget <= 64 KB)
 */

import fs from "node:fs/promises";
import path from "node:path";
import {
  extractFrontmatterBlock,
  parseFrontmatterBlock,
} from "../../packages/markdown-core/src/frontmatter.js";
import { pathExists } from "../infra/fs-safe.js";
import { isPathInside } from "../infra/path-guards.js";
import { MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES } from "./workspace-bootstrap-read.js";

export interface ResolveLiterateSurfaceOptions {
  workspaceDir: string;
  currentFilePath: string;
  visited?: Set<string>;
  depth?: number;
  maxBytes?: number;
}

const MAX_RESOLVE_DEPTH = 3;

/**
 * Resolves frontmatter redirects and literate markdown transclusions within a workspace.
 */
export async function resolveLiterateMarkdownSurface(
  content: string,
  options: ResolveLiterateSurfaceOptions,
): Promise<string> {
  const depth = options.depth ?? 0;
  if (depth >= MAX_RESOLVE_DEPTH) {
    return content;
  }

  const workspaceDir = path.resolve(options.workspaceDir);
  const normalizedCurrent = path.resolve(options.currentFilePath);
  const visited = options.visited ?? new Set<string>();
  visited.add(normalizedCurrent);

  const maxBytes = options.maxBytes ?? MAX_WORKSPACE_BOOTSTRAP_FILE_BYTES;

  // 1. Extract frontmatter & body
  const extracted = extractFrontmatterBlock(content);
  const frontmatter = parseFrontmatterBlock(content);
  const body = extracted ? extracted.body : content;
  const redirectTarget = frontmatter?.redirect?.trim();

  // If no redirect frontmatter, check for literate pointer stubs (e.g. "→ soul/identity.md")
  const target = redirectTarget || extractLiteratePointerTarget(body);
  if (!target) {
    return content;
  }

  // 2. Sandbox validation
  const cleanTarget = target.replace(/\/+$/, "");
  const targetPath = path.resolve(workspaceDir, cleanTarget);
  if (!isPathInside(workspaceDir, targetPath)) {
    // Failsafe: outside workspace directory boundary
    return content;
  }

  if (visited.has(targetPath)) {
    // Cyclic transclusion detected
    return content;
  }

  const exists = await pathExists(targetPath);
  if (!exists) {
    return content;
  }

  visited.add(targetPath);

  try {
    const stat = await fs.stat(targetPath);
    let transcludedBody = "";

    if (stat.isDirectory()) {
      // Directory aggregation: discover all *.md files sorted alphabetically
      const entries = await fs.readdir(targetPath, { withFileTypes: true });
      const mdFiles = entries
        .filter((e) => e.isFile() && (e.name.endsWith(".md") || e.name.endsWith(".markdown")))
        .map((e) => e.name)
        .sort((a, b) => a.localeCompare(b));

      const sections: string[] = [];
      for (const mdFile of mdFiles) {
        const filePath = path.join(targetPath, mdFile);
        if (visited.has(filePath)) continue;

        try {
          const raw = await fs.readFile(filePath, "utf8");
          const subFm = parseFrontmatterBlock(raw);
          const subExtracted = extractFrontmatterBlock(raw);
          const subBody = subExtracted ? subExtracted.body : raw;
          const title = subFm?.title || mdFile.replace(/\.md$/i, "");
          sections.push(
            `### Surface: ${title} (${path.relative(workspaceDir, filePath)})\n\n${subBody.trim()}`,
          );
        } catch {
          // ignore unreadable file
        }
      }
      transcludedBody = sections.join("\n\n---\n\n");
    } else if (stat.isFile()) {
      // Single file transclusion
      const raw = await fs.readFile(targetPath, "utf8");
      // Recursively resolve further redirects
      const resolved = await resolveLiterateMarkdownSurface(raw, {
        workspaceDir,
        currentFilePath: targetPath,
        visited: new Set(visited),
        depth: depth + 1,
        maxBytes,
      });
      const resolvedExtracted = extractFrontmatterBlock(resolved);
      transcludedBody = (resolvedExtracted ? resolvedExtracted.body : resolved).trim();
    }

    if (!transcludedBody) {
      return content;
    }

    // Build synthesized literate surface
    const frontmatterHeader = extracted
      ? `---\n${extracted.block.trim()}\n---`
      : formatFrontmatterHeader(frontmatter);
    const cleanedBody = cleanPointerStubs(body, target);

    let synthesized = "";
    if (frontmatterHeader) {
      synthesized += `${frontmatterHeader}\n\n`;
    }
    if (cleanedBody.trim()) {
      synthesized += `${cleanedBody.trim()}\n\n`;
    }
    synthesized += transcludedBody;

    if (synthesized.length > maxBytes) {
      synthesized = synthesized.slice(0, maxBytes) + "\n\n[...truncated to budget...]";
    }

    return synthesized.trim();
  } catch {
    return content;
  }
}

/**
 * Extracts literate pointer target like "→ soul/identity.md" or "-> soul/" from markdown stubs.
 */
function extractLiteratePointerTarget(body: string): string | null {
  const match = body.match(/(?:→|->)\s*`?([a-zA-Z0-9_\-./]+)`?/);
  if (match?.[1]) {
    const candidate = match[1].trim();
    if (candidate.endsWith(".md") || candidate.endsWith("/") || !candidate.includes(".")) {
      return candidate;
    }
  }
  return null;
}

/**
 * Removes pointer stubs from the body when transcluding.
 */
function cleanPointerStubs(body: string, target: string): string {
  const lines = body.split("\n");
  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return true;
    if (trimmed.startsWith("→") || trimmed.startsWith("->")) {
      return !trimmed.includes(target);
    }
    return true;
  });
  return filtered.join("\n");
}

function formatFrontmatterHeader(frontmatter: Record<string, string>): string {
  if (!frontmatter || Object.keys(frontmatter).length === 0) {
    return "";
  }
  const lines = ["---"];
  for (const [key, value] of Object.entries(frontmatter)) {
    lines.push(`${key}: ${value}`);
  }
  lines.push("---");
  return lines.join("\n");
}
