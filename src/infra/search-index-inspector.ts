/**
 * Search Index Inspector — Subsystem for introspecting `search.db` metadata.
 *
 * Evaluates index document counts, namespace breakdowns, SQLite file size, and staleness
 * without acquiring write locks or altering index state.
 *
 * @dft
 * - A1 (pure-io-separation): `evaluateSearchIndexFreshness` is a pure function.
 * - Axiom P1.1 (read-only-access): SQLite connection opened with read-only flag.
 * - Axiom P1.2 (deterministic-freshness): monotonic staleness check against 24h threshold.
 */

import fs from "node:fs";
import { DatabaseSync } from "node:sqlite";

export const DEFAULT_SEARCH_STALENESS_THRESHOLD_HOURS = 24.0;

export type SearchNamespaceMetrics = {
  readonly name: string;
  readonly documentCount: number;
  readonly lastIndexedAt: number;
  readonly isStale: boolean;
};

export type SearchFreshnessEvaluation = {
  readonly status: "healthy" | "stale";
  readonly ageHours: number;
  readonly isStale: boolean;
  readonly warning?: string;
};

export type SearchIndexInspectionResult =
  | {
      readonly status: "healthy" | "stale";
      readonly databasePath: string;
      readonly totalDocuments: number;
      readonly totalSections: number;
      readonly namespaces: readonly SearchNamespaceMetrics[];
      readonly sqliteSizeBytes: number;
      readonly lastIndexedAt: number;
      readonly ageHours: number;
      readonly warning?: string;
    }
  | {
      readonly status: "missing" | "error";
      readonly databasePath: string;
      readonly message: string;
    };

/**
 * Pure freshness evaluator mapping timestamps to health state.
 */
export function evaluateSearchIndexFreshness(
  lastIndexedAtMs: number,
  nowMs: number = Date.now(),
  thresholdHours: number = DEFAULT_SEARCH_STALENESS_THRESHOLD_HOURS,
): SearchFreshnessEvaluation {
  const ageMs = Math.max(0, nowMs - lastIndexedAtMs);
  const ageHours = Math.round((ageMs / (1000 * 60 * 60)) * 10) / 10;
  const isStale = ageHours > thresholdHours;

  if (isStale) {
    return {
      status: "stale",
      ageHours,
      isStale: true,
      warning: `Search index is ${ageHours.toFixed(1)}h old (> ${thresholdHours.toFixed(1)}h threshold)`,
    };
  }

  return {
    status: "healthy",
    ageHours,
    isStale: false,
  };
}

/**
 * Inspects a SQLite search database in read-only mode and returns metadata.
 */
export function inspectSearchDatabase(
  databasePath: string,
  options: {
    nowMs?: number;
    stalenessThresholdHours?: number;
  } = {},
): SearchIndexInspectionResult {
  const nowMs = options.nowMs ?? Date.now();
  const threshold = options.stalenessThresholdHours ?? DEFAULT_SEARCH_STALENESS_THRESHOLD_HOURS;

  if (!fs.existsSync(databasePath)) {
    return {
      status: "missing",
      databasePath,
      message: `search.db not found at ${databasePath}. Knowledge base search will return empty results until index is built.`,
    };
  }

  try {
    const stat = fs.statSync(databasePath);
    const sqliteSizeBytes = stat.size;
    const fileMtimeMs = stat.mtimeMs;

    const db = new DatabaseSync(databasePath, { readOnly: true });

    try {
      // 1. Total documents count
      let totalDocuments = 0;
      try {
        const docCountStmt = db.prepare("SELECT COUNT(*) as count FROM documents");
        const docRow = docCountStmt.get() as { count: number } | undefined;
        totalDocuments = docRow?.count ?? 0;
      } catch {
        // Table might not exist in uninitialized db
      }

      // 2. Total sections count
      let totalSections = 0;
      try {
        const secCountStmt = db.prepare("SELECT COUNT(*) as count FROM sections");
        const secRow = secCountStmt.get() as { count: number } | undefined;
        totalSections = secRow?.count ?? 0;
      } catch {
        // Optional table
      }

      // 3. Namespace aggregation
      const namespaces: SearchNamespaceMetrics[] = [];
      try {
        const nsStmt = db.prepare(`
          SELECT 
            COALESCE(ns, 'default') as name,
            COUNT(*) as documentCount,
            MAX(COALESCE(updated_at, ?)) as lastIndexedAt
          FROM documents
          GROUP BY ns
          ORDER BY documentCount DESC
        `);
        const rows = nsStmt.all(Math.floor(fileMtimeMs)) as Array<{
          name: string;
          documentCount: number;
          lastIndexedAt: number;
        }>;

        for (const row of rows) {
          const evalResult = evaluateSearchIndexFreshness(row.lastIndexedAt, nowMs, threshold);
          namespaces.push({
            name: row.name,
            documentCount: row.documentCount,
            lastIndexedAt: row.lastIndexedAt,
            isStale: evalResult.isStale,
          });
        }
      } catch {
        // If documents table missing
      }

      const latestIndexedAt =
        namespaces.length > 0
          ? Math.max(...namespaces.map((ns) => ns.lastIndexedAt))
          : Math.floor(fileMtimeMs);

      const overallFreshness = evaluateSearchIndexFreshness(latestIndexedAt, nowMs, threshold);

      return {
        status: overallFreshness.status,
        databasePath,
        totalDocuments,
        totalSections,
        namespaces,
        sqliteSizeBytes,
        lastIndexedAt: latestIndexedAt,
        ageHours: overallFreshness.ageHours,
        warning: overallFreshness.warning,
      };
    } finally {
      db.close();
    }
  } catch (err) {
    return {
      status: "error",
      databasePath,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
