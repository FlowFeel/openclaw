import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  evaluateSearchIndexFreshness,
  inspectSearchDatabase,
} from "./search-index-inspector.js";

describe("evaluateSearchIndexFreshness (Pure DFT Verifier)", () => {
  it("classifies an index under 24h as healthy", () => {
    const now = 1700000000000;
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;
    const result = evaluateSearchIndexFreshness(twoHoursAgo, now, 24);

    expect(result.status).toBe("healthy");
    expect(result.isStale).toBe(false);
    expect(result.ageHours).toBe(2.0);
    expect(result.warning).toBeUndefined();
  });

  it("classifies an index older than 24h as stale with warning", () => {
    const now = 1700000000000;
    const fortyEightHoursAgo = now - 48 * 60 * 60 * 1000;
    const result = evaluateSearchIndexFreshness(fortyEightHoursAgo, now, 24);

    expect(result.status).toBe("stale");
    expect(result.isStale).toBe(true);
    expect(result.ageHours).toBe(48.0);
    expect(result.warning).toContain("Search index is 48.0h old (> 24.0h threshold)");
  });
});

describe("inspectSearchDatabase (Subsystem SQLite Tests)", () => {
  let tempDir: string;
  let dbPath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-search-inspect-test-"));
    dbPath = path.join(tempDir, "search.db");
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("returns missing status when database file does not exist", () => {
    const nonExistentPath = path.join(tempDir, "does_not_exist.db");
    const result = inspectSearchDatabase(nonExistentPath);

    expect(result.status).toBe("missing");
    if (result.status === "missing") {
      expect(result.message).toContain("search.db not found");
      expect(result.databasePath).toBe(nonExistentPath);
    }
  });

  it("inspects a populated SQLite database and aggregates namespaces", () => {
    const db = new DatabaseSync(dbPath);
    const now = Date.now();
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;

    db.exec(`
      CREATE TABLE documents (
        uri TEXT PRIMARY KEY,
        title TEXT,
        ns TEXT,
        centrality REAL,
        updated_at INTEGER
      );
      CREATE TABLE sections (
        uri TEXT,
        heading TEXT,
        excerpt TEXT,
        position INTEGER
      );
    `);

    const insertDoc = db.prepare("INSERT INTO documents VALUES (?, ?, ?, ?, ?)");
    insertDoc.run("doc1", "Memory Doc", "memory", 1.0, twoHoursAgo);
    insertDoc.run("doc2", "Projections Doc", "projections", 0.8, twoHoursAgo);
    insertDoc.run("doc3", "Work Doc", "work", 0.5, twoHoursAgo);
    insertDoc.run("doc4", "Ops Doc", "ops", 0.2, twoHoursAgo);

    const insertSec = db.prepare("INSERT INTO sections VALUES (?, ?, ?, ?)");
    insertSec.run("doc1", "Header", "Excerpt", 1);
    insertSec.run("doc2", "Header", "Excerpt", 1);

    db.close();

    const result = inspectSearchDatabase(dbPath, { nowMs: now });
    expect(result.status).toBe("healthy");
    if (result.status === "healthy") {
      expect(result.totalDocuments).toBe(4);
      expect(result.totalSections).toBe(2);
      expect(result.namespaces.length).toBe(4);
      expect(result.namespaces.map((n) => n.name)).toContain("memory");
      expect(result.namespaces.map((n) => n.name)).toContain("projections");
      expect(result.sqliteSizeBytes).toBeGreaterThan(0);
      expect(result.ageHours).toBeLessThan(3);
    }
  });
});
