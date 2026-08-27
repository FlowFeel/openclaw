import { describe, expect, it } from "vitest";
import {
  buildDeathRecord,
  captureProcessMemorySnapshot,
} from "../../death-record-formatter.js";

describe("Tier 1 Unit: Gateway Death Record Formatter", () => {
  it("captures process memory snapshot with heap percentage", () => {
    const snap = captureProcessMemorySnapshot();
    expect(snap.rssMb).toBeGreaterThan(0);
    expect(snap.heapUsedMb).toBeGreaterThan(0);
    expect(snap.heapTotalMb).toBeGreaterThan(0);
    expect(snap.heapPct).toBeGreaterThanOrEqual(0);
    expect(snap.heapPct).toBeLessThanOrEqual(100);
  });

  it("builds structured death record with last tool commands", () => {
    const start = Date.now() - 60000;
    const record = buildDeathRecord({
      exitCode: 1,
      signal: "SIGTERM",
      reason: "SIGTERM received",
      startTimeMs: start,
      lastToolCommands: [
        { tool: "exec", paramsSummary: "ffmpeg -i input.mp4", ts: 100, sessionKey: "s1", turn: 1 },
      ],
    });

    expect(record.exitCode).toBe(1);
    expect(record.signal).toBe("SIGTERM");
    expect(record.uptimeSeconds).toBeGreaterThanOrEqual(59);
    expect(record.lastToolCommands.length).toBe(1);
    expect(record.lastToolCommands[0]?.paramsSummary).toBe("ffmpeg -i input.mp4");
  });
});
