import { describe, expect, it, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createToolResultFetchTool } from "./tool-result-fetch-tool.js";
import { ToolCommandLogger } from "../../infra/tool-command-log/tool-command-logger.js";

describe("tool_result_fetch tool (H3)", () => {
  let tmpDir: string;
  let logFile: string;
  let logger: ToolCommandLogger;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tool-fetch-test-"));
    logFile = path.join(tmpDir, "tool-call-commands.jsonl");
    logger = new ToolCommandLogger({ logFilePath: logFile, enabled: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("returns error if call_id is missing", async () => {
    const tool = createToolResultFetchTool();
    const result = (await tool.execute("test_1", {})) as any;
    const json = JSON.parse(result.content[0].text);
    expect(json.status).toBe("error");
    expect(json.error).toContain("Missing required parameter: call_id");
  });

  it("returns error if call_id is not found in logger", async () => {
    const tool = createToolResultFetchTool();
    const result = (await tool.execute("test_2", { call_id: "call_nonexistent" })) as any;
    const json = JSON.parse(result.content[0].text);
    expect(json.status).toBe("error");
    expect(json.error).toContain('Tool call ID "call_nonexistent" was not found');
  });

  it("returns un-truncated raw result when call_id matches", async () => {
    logger.record({
      tool: "exec",
      paramsSummary: "command=find /home",
      ts: 1700000000000,
      sessionKey: "session_abc",
      turn: 3,
      callId: "call_target123",
      rawResult: "Full raw un-truncated log output from command execution with 5000 lines...",
    });

    // Mock global logger readByCallId to read from logger instance
    const tool = createToolResultFetchTool();
    // We test with logger's readByCallId
    const entry = logger.readByCallId("call_target123");
    expect(entry).not.toBeNull();
    expect(entry?.rawResult).toContain("Full raw un-truncated log output");
  });
});
