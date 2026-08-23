/**
 * @file habitat-resolver.ts
 * @description Single-pass habitat topology resolution engine. Evaluates workspace files,
 * maps canonical roles, extracts frontmatter summaries, and generates concise orientation markdown.
 */

import fs from "node:fs";
import path from "node:path";
import { DEFAULT_HABITAT_ROLE_MAPPING } from "../shannon-weaver/role-resolver.js";
import { extractFrontmatter } from "../shannon-weaver/deterministic-frontmatter.js";
import type { HabitatFileRecord, HabitatTopologyResult, HabitatProbeOptions } from "./types.js";

/**
 * Resolves the habitat topology for a workspace in a single deterministic pass.
 * Never throws 404 or I/O exceptions; returns structured existence status.
 */
export function resolveHabitatTopology(options: HabitatProbeOptions = {}): HabitatTopologyResult {
  const workspaceRoot = options.workspaceRoot || process.cwd();
  const effectiveRoleMap: Record<string, string> = {
    ...DEFAULT_HABITAT_ROLE_MAPPING,
    ...(options.customRoles || {}),
  };

  const fileReader = options.fileReader || {
    existsSync: (p: string) => fs.existsSync(p),
    statSync: (p: string) => {
      try {
        const stats = fs.statSync(p);
        return { size: stats.size };
      } catch {
        return { size: 0 };
      }
    },
    readFileSync: (p: string, encoding: "utf-8") => fs.readFileSync(p, encoding),
  };

  const filesPresent: HabitatFileRecord[] = [];
  const filesMissing: HabitatFileRecord[] = [];

  for (const [role, relPath] of Object.entries(effectiveRoleMap)) {
    const fullPath = path.isAbsolute(relPath) ? relPath : path.resolve(workspaceRoot, relPath);
    const exists = fileReader.existsSync(fullPath);

    if (exists) {
      let sizeBytes = 0;
      let summary: string | undefined;
      let metadata: Record<string, unknown> | undefined;

      try {
        if (fileReader.statSync) {
          sizeBytes = fileReader.statSync(fullPath).size;
        }
        const rawContent = fileReader.readFileSync(fullPath, "utf-8");
        const fm = extractFrontmatter(rawContent);
        if (fm.hasFrontmatter && fm.frontmatter) {
          metadata = fm.frontmatter as Record<string, unknown>;
          summary = typeof metadata.summary === "string" 
            ? metadata.summary 
            : typeof metadata.title === "string" 
            ? metadata.title 
            : undefined;
        }
        if (!summary) {
          // Extract first non-empty header or first non-empty line as fallback summary
          const lines = (fm.body || rawContent).split("\n").map((l) => l.trim()).filter(Boolean);
          const firstHeader = lines.find((l) => l.startsWith("#"));
          summary = firstHeader ? firstHeader.replace(/^#+\s*/, "") : lines[0]?.slice(0, 80);
        }
      } catch {
        // Safe degrade without crashing
      }


      filesPresent.push({
        role,
        path: relPath,
        exists: true,
        sizeBytes,
        summary,
        metadata,
      });
    } else {
      filesMissing.push({
        role,
        path: relPath,
        exists: false,
      });
    }
  }

  const markdownSummary = formatHabitatMarkdownSummary({
    filesPresent,
    filesMissing,
    workspaceRoot,
    detailLevel: options.detailLevel || "compact",
  });

  return {
    timestampMs: Date.now(),
    workspaceRoot,
    filesPresent,
    filesMissing,
    roleMap: effectiveRoleMap,
    totalChecked: filesPresent.length + filesMissing.length,
    markdownSummary,
  };
}

/**
 * Formats a concise Structured Markdown summary of the habitat topology.
 */
export function formatHabitatMarkdownSummary(params: {
  filesPresent: readonly HabitatFileRecord[];
  filesMissing: readonly HabitatFileRecord[];
  workspaceRoot: string;
  detailLevel: "compact" | "full";
}): string {
  const lines: string[] = [
    `# Habitat Topology (${params.filesPresent.length} present, ${params.filesMissing.length} absent)`,
    `**Workspace Root**: \`${params.workspaceRoot}\``,
    "",
    "## Available Canonical Files",
  ];

  if (params.filesPresent.length === 0) {
    lines.push("_No canonical files detected in root._");
  } else {
    lines.push("| Role | Path | Size | Summary |");
    lines.push("| :--- | :--- | :--- | :--- |");
    for (const file of params.filesPresent) {
      const sizeStr = file.sizeBytes !== undefined ? `${file.sizeBytes} B` : "-";
      const sum = file.summary ? file.summary.replace(/\|/g, "\\|") : "-";
      lines.push(`| \`${file.role}\` | \`${file.path}\` | ${sizeStr} | ${sum} |`);
    }
  }

  if (params.filesMissing.length > 0) {
    lines.push("", "## Absent / Unconfigured Roles");
    const missingPaths = params.filesMissing.map((f) => `\`${f.path}\` (${f.role})`).join(", ");
    lines.push(`_The following canonical targets were checked and confirmed absent_: ${missingPaths}`);
  }

  return lines.join("\n");
}
