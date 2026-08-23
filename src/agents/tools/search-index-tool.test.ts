import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createSearchIndexTool } from "./search-index-tool.js";
import type { SearchIndexInspectionResult } from "../../infra/search-index-inspector.js";

describe("search_index_inspect agent tool", () => {
  let tempDir: string;
  let dbPath: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "openclaw-search-tool-test-"));
    dbPath = path.join(tempDir, "search.db");
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("has the expected tool descriptor", () => {
    const tool = createSearchIndexTool();
    expect(tool.name).toBe("search_index_inspect");
    expect(tool.label).toBe("Search Index Inspector");
    expect(tool.description).toContain("Inspect the freshness, document count, namespace distribution");
  });

  it("executes inspection over target SQLite database", async () => {
    const db = new DatabaseSync(dbPath);
    db.exec(`
      CREATE TABLE documents (uri TEXT PRIMARY KEY, title TEXT, ns TEXT, centrality REAL, updated_at INTEGER);
      INSERT INTO documents VALUES ('doc_1', 'Test Doc', 'memory', 1.0, ${Date.now()});
    `);
    db.close();

    const tool = createSearchIndexTool({ defaultDatabasePath: dbPath });
    const execution = await tool.execute("call_1", {});

    const result = execution.details as SearchIndexInspectionResult;
    expect(result.status).toBe("healthy");
    if (result.status === "healthy") {
      expect(result.totalDocuments).toBe(1);
      expect(result.namespaces[0]?.name).toBe("memory");
    }
  });
});
