/**
 * Atomic Storage for Gateway Death Records.
 * Goldilocks decomposition unit (< 95 LOC).
 * 
 * @dft:axiom A3 (Observability & Controllability)
 */

import fs from "node:fs";
import path from "node:path";
import type { GatewayDeathRecord } from "./death-record-types.js";

const DEFAULT_DEATH_RECORD_PATH =
  process.env.OPENCLAW_DEATH_RECORD_PATH ?? "/tmp/openclaw/death-record.json";

export class GatewayDeathRecordStorage {
  private filePath: string;

  constructor(filePath: string = DEFAULT_DEATH_RECORD_PATH) {
    this.filePath = filePath;
  }

  public write(record: GatewayDeathRecord): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const tempPath = `${this.filePath}.tmp.${process.pid}`;
      const payload = JSON.stringify(record, null, 2);
      fs.writeFileSync(tempPath, payload, "utf8");
      fs.renameSync(tempPath, this.filePath);
    } catch {
      // Non-blocking exit write guarantee
    }
  }

  public readPrevious(): GatewayDeathRecord | null {
    if (!fs.existsSync(this.filePath)) {
      return null;
    }

    try {
      const raw = fs.readFileSync(this.filePath, "utf8");
      return JSON.parse(raw) as GatewayDeathRecord;
    } catch {
      return null;
    }
  }

  public clear(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        fs.unlinkSync(this.filePath);
      }
    } catch {
      // Ignore cleanup error
    }
  }
}

export const globalDeathRecordStorage = new GatewayDeathRecordStorage();
