/**
 * Agent-facing Search Index Introspection Tool.
 *
 * Allows agents to inspect the health, total documents, namespace coverage, and staleness
 * of the semantic knowledge base index (search.db).
 */

import fs from "node:fs";
import path from "node:path";
import { Type } from "typebox";
import {
  inspectSearchDatabase,
  type SearchIndexInspectionResult,
} from "../../infra/search-index-inspector.js";
import { type AnyAgentTool, jsonResult } from "./common.js";

export const SearchIndexToolSchema = Type.Object(
  {
    database_path: Type.Optional(
      Type.String({
        description:
          "Optional custom path to the search.db SQLite database. Defaults to configured environment or workspace meta/search.db.",
      }),
    ),
  },
  { additionalProperties: false },
);

export type CreateSearchIndexToolOptions = {
  defaultDatabasePath?: string;
  workspaceDir?: string;
  nowMs?: () => number;
  stalenessThresholdHours?: number;
};

export function createSearchIndexTool(options: CreateSearchIndexToolOptions = {}): AnyAgentTool {
  const resolveTargetDbPath = (explicitPath?: string): string => {
    if (explicitPath && explicitPath.trim().length > 0) {
      return explicitPath.trim();
    }
    if (options.defaultDatabasePath && options.defaultDatabasePath.trim().length > 0) {
      return options.defaultDatabasePath.trim();
    }
    if (process.env.SEARCH_DB_PATH && process.env.SEARCH_DB_PATH.trim().length > 0) {
      return process.env.SEARCH_DB_PATH.trim();
    }
    if (options.workspaceDir) {
      return path.join(options.workspaceDir, "meta", "search.db");
    }
    const standardContainerWorkspace = "/home/node/.openclaw/workspace/meta/search.db";
    if (fs.existsSync(standardContainerWorkspace)) {
      return standardContainerWorkspace;
    }
    const relativeWorkspace = path.join(process.cwd(), "workspace", "meta", "search.db");
    if (fs.existsSync(relativeWorkspace)) {
      return relativeWorkspace;
    }
    return path.join(process.cwd(), "meta", "search.db");
  };

  return {
    name: "search_index_inspect",
    label: "Search Index Inspector",
    description:
      "Inspect the freshness, document count, namespace distribution, and health of the semantic search index (search.db). Returns status ('healthy' | 'stale' | 'missing' | 'error'), total documents, and namespace metrics.",
    parameters: SearchIndexToolSchema,
    execute: async (
      _toolCallId: string,
      params: unknown,
    ): Promise<ReturnType<typeof jsonResult<SearchIndexInspectionResult>>> => {
      const p = (params && typeof params === "object" ? params : {}) as { database_path?: string };
      const targetPath = resolveTargetDbPath(p.database_path);

      const inspection = inspectSearchDatabase(targetPath, {
        nowMs: options.nowMs ? options.nowMs() : Date.now(),
        stalenessThresholdHours: options.stalenessThresholdHours,
      });

      return jsonResult(inspection);
    },
  };
}
