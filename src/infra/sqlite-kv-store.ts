/**
 * Generic SQLite Key-Value Store backed by OpenClaw's primary state database (`openclaw-state.sqlite`).
 * Replaces legacy monolithic JSON file disk stores with atomic SQLite persistence.
 */

import fs from "node:fs";
import { tryReadJsonSync } from "./json-files.js";
import {
  openOpenClawStateDatabase,
  runOpenClawStateWriteTransaction,
} from "../state/openclaw-state-db.js";

export class SqliteKvStore<T = unknown> {
  private readonly tableName: string;
  private readonly env?: NodeJS.ProcessEnv;

  constructor(tableName: string, options: { env?: NodeJS.ProcessEnv } = {}) {
    this.tableName = tableName.replace(/[^a-zA-Z0-9_]/g, "_");
    this.env = options.env;
    this.ensureTable();
  }

  private ensureTable(): void {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    db.exec(`
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);
  }

  get(key: string): T | undefined {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    const stmt = db.prepare(`SELECT value FROM ${this.tableName} WHERE key = ?`);
    const row = stmt.get(key) as { value: string } | undefined;
    if (!row) {
      return undefined;
    }
    try {
      return JSON.parse(row.value) as T;
    } catch {
      return undefined;
    }
  }

  set(key: string, value: T): void {
    const serialized = JSON.stringify(value);
    const now = Date.now();
    runOpenClawStateWriteTransaction(
      ({ db }) => {
        const stmt = db.prepare(`
          INSERT INTO ${this.tableName} (key, value, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(key) DO UPDATE SET
            value = excluded.value,
            updated_at = excluded.updated_at
        `);
        stmt.run(key, serialized, now);
      },
      this.env ? { env: this.env } : {},
    );
  }

  delete(key: string): boolean {
    return runOpenClawStateWriteTransaction(
      ({ db }) => {
        const stmt = db.prepare(`DELETE FROM ${this.tableName} WHERE key = ?`);
        const result = stmt.run(key);
        return Number(result.changes) > 0;
      },
      this.env ? { env: this.env } : {},
    );
  }

  listKeys(prefix = ""): string[] {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    if (prefix) {
      const stmt = db.prepare(
        `SELECT key FROM ${this.tableName} WHERE key LIKE ? ORDER BY key ASC`,
      );
      const rows = stmt.all(`${prefix}%`) as Array<{ key: string }>;
      return rows.map((r) => r.key);
    }
    const stmt = db.prepare(`SELECT key FROM ${this.tableName} ORDER BY key ASC`);
    const rows = stmt.all() as Array<{ key: string }>;
    return rows.map((r) => r.key);
  }

  entries(prefix = ""): Array<{ key: string; value: T; updatedAt: number }> {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    let rows: Array<{ key: string; value: string; updated_at: number }>;
    if (prefix) {
      const stmt = db.prepare(
        `SELECT key, value, updated_at FROM ${this.tableName} WHERE key LIKE ? ORDER BY key ASC`,
      );
      rows = stmt.all(`${prefix}%`) as Array<{ key: string; value: string; updated_at: number }>;
    } else {
      const stmt = db.prepare(
        `SELECT key, value, updated_at FROM ${this.tableName} ORDER BY key ASC`,
      );
      rows = stmt.all() as Array<{ key: string; value: string; updated_at: number }>;
    }

    const results: Array<{ key: string; value: T; updatedAt: number }> = [];
    for (const row of rows) {
      try {
        const parsed = JSON.parse(row.value) as T;
        results.push({ key: row.key, value: parsed, updatedAt: row.updated_at });
      } catch {
        // Skip corrupted entries
      }
    }
    return results;
  }

  clear(): void {
    runOpenClawStateWriteTransaction(
      ({ db }) => {
        db.exec(`DELETE FROM ${this.tableName}`);
      },
      this.env ? { env: this.env } : {},
    );
  }

  /**
   * Reads a legacy JSON store file (map or array), inserts entries into SQLite KV store,
   * and renames the legacy file to `${jsonPath}.migrated`.
   */
  migrateLegacyJsonFile(jsonPath: string): boolean {
    if (!fs.existsSync(jsonPath)) {
      return false;
    }

    try {
      const data = tryReadJsonSync<Record<string, T> | T[]>(jsonPath);
      if (data && typeof data === "object") {
        if (Array.isArray(data)) {
          data.forEach((item, index) => {
            const itemKey = (item as any)?.id || (item as any)?.key || String(index);
            this.set(String(itemKey), item);
          });
        } else {
          for (const [key, val] of Object.entries(data)) {
            this.set(key, val as T);
          }
        }
      }
      fs.renameSync(jsonPath, `${jsonPath}.migrated`);
      return true;
    } catch {
      return false;
    }
  }
}
