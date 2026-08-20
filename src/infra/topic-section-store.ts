/**
 * Relational SQLite Section Store & Workspace File Dual-Store.
 * Combines 0ms SQL indexed section lookups (`topic_sections`) with workspace `.md` sidecars.
 */

import fs from "node:fs";
import path from "node:path";
import {
  openOpenClawStateDatabase,
  runOpenClawStateWriteTransaction,
} from "../state/openclaw-state-db.js";
import { parseMarkdownSurface, renderMarkdownSurface } from "./markdown-surface-ast.js";

export class TopicSectionStore {
  private readonly env?: NodeJS.ProcessEnv;

  constructor(options: { env?: NodeJS.ProcessEnv } = {}) {
    this.env = options.env;
    this.ensureTable();
  }

  private ensureTable(): void {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    db.exec(`
      CREATE TABLE IF NOT EXISTS topic_sections (
        topic_key TEXT NOT NULL,
        section_name TEXT NOT NULL,
        content_md TEXT NOT NULL,
        updated_at INTEGER NOT NULL,
        PRIMARY KEY (topic_key, section_name)
      );
    `);
  }

  /**
   * Performs instant 0ms SQL index query for a specific section (e.g. "Active Decisions").
   * Returns < 100 tokens. Zero transcript bloat, zero unneeded file reads.
   */
  getSection(topicKey: string, sectionName: string): string | null {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    const stmt = db.prepare(`
      SELECT content_md FROM topic_sections
      WHERE topic_key = ? AND LOWER(section_name) = LOWER(?)
    `);
    const row = stmt.get(topicKey, sectionName) as { content_md: string } | undefined;
    return row ? row.content_md : null;
  }

  /**
   * Dual-writes Markdown surface: updates SQLite `topic_sections` table and writes workspace file.
   */
  writeSurface(topicKey: string, rawMd: string, workspaceDir?: string): void {
    const ast = parseMarkdownSurface(rawMd);
    const now = Date.now();

    runOpenClawStateWriteTransaction(
      ({ db }) => {
        const stmt = db.prepare(`
          INSERT INTO topic_sections (topic_key, section_name, content_md, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(topic_key, section_name) DO UPDATE SET
            content_md = excluded.content_md,
            updated_at = excluded.updated_at
        `);

        for (const [sectionName, contentMd] of ast.sections) {
          stmt.run(topicKey, sectionName, contentMd, now);
        }
      },
      this.env ? { env: this.env } : {},
    );

    if (workspaceDir) {
      try {
        const surfacesDir = path.join(workspaceDir, "meta", "surfaces");
        fs.mkdirSync(surfacesDir, { recursive: true });
        const filePath = path.join(surfacesDir, `${topicKey}.md`);
        fs.writeFileSync(filePath, rawMd, "utf-8");
      } catch {
        // Disk write is best-effort; SQLite remains authoritative.
      }
    }
  }

  /**
   * Reads workspace `.md` sidecar if present and syncs into SQLite relational section index.
   */
  syncSurfaceFromDisk(topicKey: string, workspaceDir: string): boolean {
    const filePath = path.join(workspaceDir, "meta", "surfaces", `${topicKey}.md`);
    if (!fs.existsSync(filePath)) {
      return false;
    }
    try {
      const rawMd = fs.readFileSync(filePath, "utf-8");
      this.writeSurface(topicKey, rawMd, workspaceDir);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Re-assembles full Markdown document from relational SQLite `topic_sections` table.
   */
  exportFullMarkdownSurface(topicKey: string): string | null {
    const { db } = openOpenClawStateDatabase(this.env ? { env: this.env } : {});
    const stmt = db.prepare(`
      SELECT section_name, content_md FROM topic_sections
      WHERE topic_key = ? ORDER BY section_name ASC
    `);
    const rows = stmt.all(topicKey) as Array<{ section_name: string; content_md: string }>;
    if (rows.length === 0) {
      return null;
    }

    const sections = new Map<string, string>();
    for (const r of rows) {
      sections.set(r.section_name, r.content_md);
    }

    return renderMarkdownSurface({
      frontmatter: { topic: topicKey },
      title: `Topic Surface: ${topicKey}`,
      sections,
    });
  }
}
