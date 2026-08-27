import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ToolCommandLogger } from "../../tool-command-logger.js";
import type { ToolCallCommandEntry } from "../../tool-command-types.js";

describe("Tier 1 Unit: Tool Command Logger", () => {
  let tmpDir: string;
  let logFile: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "flight-log-test-"));
    logFile = path.join(tmpDir, "tool-commands.jsonl");
  });

  afterEach(() => {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}
  });

  it("appends tool call command entries to file and reads them back", () => {
    const logger = new ToolCommandLogger({ logFilePath: logFile });

    const entry1: ToolCallCommandEntry = {
      tool: "exec",
      paramsSummary: "docker ps -a",
      ts: 1000,
      sessionKey: "s1",
      turn: 1,
    };
    const entry2: ToolCallCommandEntry = {
      tool: "read",
      paramsSummary: "path: /tmp/test",
      ts: 2000,
      sessionKey: "s1",
      turn: 2,
    };

    logger.record(entry1);
    logger.record(entry2);

    const recent = logger.readRecent(10);
    expect(recent.length).toBe(2);
    expect(recent[0]?.tool).toBe("exec");
    expect(recent[1]?.tool).toBe("read");
  });

  it("rotates log file when size threshold is reached", () => {
    const logger = new ToolCommandLogger({
      logFilePath: logFile,
      maxFileSizeBytes: 150, // Small threshold to trigger rotation
    });

    for (let i = 0; i < 5; i++) {
      logger.record({
        tool: "exec",
        paramsSummary: `command number ${i} with long argument payload`,
        ts: Date.now(),
        sessionKey: "s1",
        turn: i,
      });
    }

    expect(fs.existsSync(logFile)).toBe(true);
    expect(fs.existsSync(`${logFile}.1`)).toBe(true);
  });
});
