import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { AttributionRingBuffer } from "../../../attribution-telemetry/attribution-ring.js";
import { buildDeathRecord } from "../../gateway-death-record/death-record-formatter.js";
import { GatewayDeathRecordStorage } from "../../gateway-death-record/death-record-storage.js";
import { ToolCommandLogger } from "../tool-command-logger.js";
import { synthesizeIntentBreadcrumb } from "../tool-intent-breadcrumb.js";

describe("Tier 2 BDD Behavioral Contracts: Tool Flight Recorder & Semantic Compaction", () => {
  let tmpDir: string;
  let flightLogPath: string;
  let deathRecordPath: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "flight-bdd-"));
    flightLogPath = path.join(tmpDir, "tool-commands.jsonl");
    deathRecordPath = path.join(tmpDir, "death-record.json");
  });

  afterEach(() => {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  });

  it("Contract F1: Intercepts and records tool calls before execution completes", () => {
    const logger = new ToolCommandLogger({ logFilePath: flightLogPath });

    // Simulate in-flight tool call dispatch
    logger.record({
      tool: "exec",
      paramsSummary: "docker restart compose-openclaw-1",
      ts: 1787856600000,
      sessionKey: "session-alpha",
      turn: 14,
      callId: "call_999",
      heapPct: 45.2,
    });

    // Verify written immediately to file
    expect(fs.existsSync(flightLogPath)).toBe(true);
    const content = fs.readFileSync(flightLogPath, "utf8");
    expect(content).toContain('"tool":"exec"');
    expect(content).toContain('"params":"docker restart compose-openclaw-1"');
    expect(content).toContain('"turn":14');
    expect(content).toContain('"heap":45');
  });

  it("Contract F2: Compaction preserves tool intent breadcrumb when payload is purged", () => {
    const entries = [
      {
        tool: "exec",
        paramsSummary: "git diff --cached",
        ts: 100,
        sessionKey: "s1",
        turn: 3,
      },
      {
        tool: "web_search",
        paramsSummary: "query: CVE-2026-1189 fix",
        ts: 200,
        sessionKey: "s1",
        turn: 3,
      },
    ];

    const breadcrumb = synthesizeIntentBreadcrumb({
      turnIndex: 3,
      entries,
      outcomeSummary: "Found patch in commit 898a96f",
    });

    expect(breadcrumb.markdown).toContain("[COMPACTED TURN 3 — INTENT BREADCRUMB]");
    expect(breadcrumb.markdown).toContain('Action: exec -> "git diff --cached"');
    expect(breadcrumb.markdown).toContain('Action: web_search -> "query: CVE-2026-1189 fix"');
    expect(breadcrumb.markdown).toContain("Outcome: Found patch in commit 898a96f");
  });

  it("Contract F3: Death record captures last N tool calls and memory on fatal termination", () => {
    const storage = new GatewayDeathRecordStorage(deathRecordPath);
    const logger = new ToolCommandLogger({ logFilePath: flightLogPath });

    // Seed 3 tool calls
    for (let i = 1; i <= 3; i++) {
      logger.record({
        tool: "exec",
        paramsSummary: `stress-test --worker=${i}`,
        ts: Date.now() + i,
        sessionKey: "main",
        turn: i,
      });
    }

    const recent = logger.readRecent(5);
    const deathRecord = buildDeathRecord({
      exitCode: 137,
      signal: "SIGKILL",
      reason: "Kernel OOM Killer invoked on cgroup",
      startTimeMs: Date.now() - 120000,
      lastToolCommands: recent,
    });

    storage.write(deathRecord);

    const retrieved = storage.readPrevious();
    expect(retrieved).toBeDefined();
    expect(retrieved?.exitCode).toBe(137);
    expect(retrieved?.signal).toBe("SIGKILL");
    expect(retrieved?.lastToolCommands.length).toBe(3);
    expect(retrieved?.lastToolCommands[2]?.paramsSummary).toBe("stress-test --worker=3");
    expect(retrieved?.memory.heapPct).toBeGreaterThan(0);
  });

  it("Contract F4: Attribution timeSeries includes heapPct trajectory", () => {
    const ring = new AttributionRingBuffer(16);
    const now = Date.now();

    ring.recordTurn({
      sessionKey: "main",
      turnIndex: 1,
      timestamp: now,
      wallClockMs: 50,
      queueDwellMs: 5,
      tokens: { prompt: 100, completion: 20 },
      cacheHit: true,
      compactionFired: false,
    });

    const timeSeries = ring.getConcurrencyTimeSeries({ windowMinutes: 15, nowMs: now });
    expect(timeSeries.length).toBeGreaterThanOrEqual(1);
    expect(timeSeries[0]?.activeSessions).toBe(1);
    expect(timeSeries[0]?.heapPct).toBeDefined();
    expect(typeof timeSeries[0]?.heapPct).toBe("number");
  });
});
