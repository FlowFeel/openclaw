/**
 * BDD Scenario Suite: Search Index Introspection & Staleness Verification
 *
 * Implements literate Given / When / Then steps corresponding to:
 * kitchen/suites/oc-mods/features/search_index_introspection.feature
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createSearchIndexTool } from "./search-index-tool.js";
import type { SearchIndexInspectionResult } from "../../infra/search-index-inspector.js";

describe("Feature: Search Index Introspection & Staleness Verification (BDD)", () => {
  let tempDir: string;
  let dbPath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-search-bdd-test-"));
    dbPath = path.join(tempDir, "search.db");
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("Scenario: Agent queries healthy and populated search index", async () => {
    // Given a valid search.db database containing 142 documents across 4 namespaces
    const now = Date.now();
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;
    const db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE documents (uri TEXT PRIMARY KEY, title TEXT, ns TEXT, centrality REAL, updated_at INTEGER);
      CREATE TABLE sections (uri TEXT, heading TEXT, excerpt TEXT, position INTEGER);
    `);

    const insertDoc = db.prepare("INSERT INTO documents VALUES (?, ?, ?, ?, ?)");
    for (let i = 0; i < 45; i++) insertDoc.run(`mem_${i}`, `Memory Doc ${i}`, "memory", 1.0, twoHoursAgo);
    for (let i = 0; i < 38; i++) insertDoc.run(`proj_${i}`, `Proj Doc ${i}`, "projections", 0.9, twoHoursAgo);
    for (let i = 0; i < 35; i++) insertDoc.run(`work_${i}`, `Work Doc ${i}`, "work", 0.8, twoHoursAgo);
    for (let i = 0; i < 24; i++) insertDoc.run(`ops_${i}`, `Ops Doc ${i}`, "ops", 0.7, twoHoursAgo);
    db.close();

    // And the search index was updated 2 hours ago (within 24h freshness window)
    const tool = createSearchIndexTool({
      defaultDatabasePath: dbPath,
      nowMs: () => now,
      stalenessThresholdHours: 24,
    });

    // When the agent invokes the "search_index_inspect" tool
    const execution = await tool.execute("call_search_nominal", {});
    const result = execution.details as SearchIndexInspectionResult;

    // Then the search index status is "healthy"
    expect(result.status).toBe("healthy");
    if (result.status === "healthy") {
      // And the total documents count is 142
      expect(result.totalDocuments).toBe(142);

      // And the response lists namespace metrics:
      const memNs = result.namespaces.find((n) => n.name === "memory");
      expect(memNs?.documentCount).toBe(45);
      expect(memNs?.isStale).toBe(false);

      const projNs = result.namespaces.find((n) => n.name === "projections");
      expect(projNs?.documentCount).toBe(38);
      expect(projNs?.isStale).toBe(false);

      const workNs = result.namespaces.find((n) => n.name === "work");
      expect(workNs?.documentCount).toBe(35);
      expect(workNs?.isStale).toBe(false);

      const opsNs = result.namespaces.find((n) => n.name === "ops");
      expect(opsNs?.documentCount).toBe(24);
      expect(opsNs?.isStale).toBe(false);

      // And the response includes valid SQLite file size and last indexed timestamp
      expect(result.sqliteSizeBytes).toBeGreaterThan(0);
      expect(result.lastIndexedAt).toBe(twoHoursAgo);
    }
  });

  it("Scenario: Agent detects stale search index exceeding 24 hours", async () => {
    // Given a search.db database whose last indexing timestamp is 48 hours ago
    const now = Date.now();
    const fortyEightHoursAgo = now - 48 * 60 * 60 * 1000;
    const db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE documents (uri TEXT PRIMARY KEY, title TEXT, ns TEXT, centrality REAL, updated_at INTEGER);
      INSERT INTO documents VALUES ('doc_stale', 'Old Doc', 'memory', 1.0, ${fortyEightHoursAgo});
    `);
    db.close();

    const tool = createSearchIndexTool({
      defaultDatabasePath: dbPath,
      nowMs: () => now,
      stalenessThresholdHours: 24,
    });

    // When the agent invokes the "search_index_inspect" tool
    const execution = await tool.execute("call_search_stale", {});
    const result = execution.details as SearchIndexInspectionResult;

    // Then the search index status is "stale"
    expect(result.status).toBe("stale");
    if (result.status === "stale") {
      // And the warning message indicates "Search index is 48.0h old (> 24.0h threshold)"
      expect(result.warning).toContain("Search index is 48.0h old (> 24.0h threshold)");
      // And the isStale flag is true for all namespaces
      expect(result.namespaces[0]?.isStale).toBe(true);
    }
  });

  it("Scenario: Agent inspects runtime when search.db is unpopulated or missing", async () => {
    // Given no search.db file exists at the configured search database path
    const nonExistentDb = path.join(tempDir, "missing_search.db");
    const tool = createSearchIndexTool({ defaultDatabasePath: nonExistentDb });

    // When the agent invokes the "search_index_inspect" tool
    const execution = await tool.execute("call_search_missing", {});
    const result = execution.details as SearchIndexInspectionResult;

    // Then the search index status is "missing"
    expect(result.status).toBe("missing");
    if (result.status === "missing") {
      // And the response indicates the missing file path with remediation hint
      expect(result.message).toContain("search.db not found");
      expect(result.message).toContain("missing_search.db");
    }
  });
});
