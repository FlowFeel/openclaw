import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GatewayDeathRecordStorage } from "../../death-record-storage.js";
import type { GatewayDeathRecord } from "../../death-record-types.js";

describe("Tier 1 Unit: Gateway Death Record Storage", () => {
  let tmpDir: string;
  let recordFile: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "death-record-test-"));
    recordFile = path.join(tmpDir, "death-record.json");
  });

  afterEach(() => {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  });

  it("writes atomically and reads previous death record", () => {
    const storage = new GatewayDeathRecordStorage(recordFile);

    const record: GatewayDeathRecord = {
      timestamp: Date.now(),
      uptimeSeconds: 120,
      exitCode: 137,
      signal: "SIGKILL",
      reason: "OOM killer",
      memory: { rssMb: 512, heapUsedMb: 400, heapTotalMb: 450, heapPct: 88.9 },
      lastToolCommands: [
        { tool: "exec", paramsSummary: "docker build", ts: 100, sessionKey: "s", turn: 3 },
      ],
    };

    storage.write(record);

    const read = storage.readPrevious();
    expect(read).toBeDefined();
    expect(read?.exitCode).toBe(137);
    expect(read?.signal).toBe("SIGKILL");
    expect(read?.reason).toBe("OOM killer");
    expect(read?.memory.heapPct).toBe(88.9);

    storage.clear();
    expect(storage.readPrevious()).toBeNull();
  });
});
