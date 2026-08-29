import { describe, expect, it, beforeEach, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { toToolDefinitions } from "../../agents/agent-tool-definition-adapter.js";
import { createToolResultFetchTool } from "../../agents/tools/tool-result-fetch-tool.js";
import { globalToolCommandLogger } from "../tool-command-log/tool-command-logger.js";
import { psiHeadTailTruncate } from "./lazy-prefix-truncation.js";

describe("BDD Contract: Current-Turn Delivery Boundary Projection & 6-Hook Execution Contract", () => {
  let tmpDir: string;
  let logFile: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "current-turn-bdd-"));
    logFile = path.join(tmpDir, "tool-call-commands.jsonl");
    process.env.OPENCLAW_TOOL_FLIGHT_LOG = logFile;
  });

  afterEach(() => {
    delete process.env.OPENCLAW_TOOL_FLIGHT_LOG;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("Hook H1 & H4 & H5: Delivery boundary applies ψ(v, k) with byte-count marker uniformly across tools", async () => {
    const mockTool = {
      name: "exec",
      label: "Exec",
      description: "Run command",
      parameters: {},
      execute: async () => {
        // Generates large tool output payload (>2k bytes)
        return "HEADER: Command starting execution...\n" + "x".repeat(3000) + "\nFOOTER: Command exited with code 0";
      },
    };

    const adapted = toToolDefinitions([mockTool], {
      sessionKey: "session_bdd",
      turn: 1,
      runId: "run_bdd_1",
      toolValueTruncationBytes: 100,
    } as any);

    const result = (await adapted[0].execute("call_exec_123", {})) as any;
    const deliveredText = result.content[0].text;

    // H1: Truncated before returning to current turn
    expect(deliveredText.length).toBeLessThan(3000);
    // H4: Standard truncation marker containing exact omitted carrier byte count
    expect(deliveredText).toContain("\n... [truncated ");
    expect(deliveredText).toContain("bytes] ...\n");
    // Edge preservation
    expect(deliveredText).toContain("HEADER: Command starting execution...");
    expect(deliveredText).toContain("FOOTER: Command exited with code 0");
  });

  it("Hook H2 & H3 & H6: Full raw result saved to persistent flight recorder and recoverable via tool_result_fetch", async () => {
    const fullRawPayload = "CRITICAL_LOG_ENTRY: Unhandled error stack trace at file.ts:42\n" + "Noise data ".repeat(200) + "\nFINAL_STATUS: Process crashed with signal SIGSEGV";

    const mockTool = {
      name: "read",
      label: "Read",
      description: "Read file",
      parameters: {},
      execute: async () => fullRawPayload,
    };

    const adapted = toToolDefinitions([mockTool], {
      sessionKey: "session_bdd_2",
      turn: 2,
      runId: "run_bdd_2",
      toolValueTruncationBytes: 60,
    } as any);

    const callId = "call_read_999";
    const deliveryResult = (await adapted[0].execute(callId, {})) as any;

    // Live turn receives truncated slice
    expect(deliveryResult.content[0].text).toContain("\n... [truncated ");

    // H2: Cold storage flight recorder holds 100% full raw result
    const loggedEntry = globalToolCommandLogger.readByCallId(callId);
    expect(loggedEntry).not.toBeNull();
    expect(loggedEntry?.rawResult).toContain(fullRawPayload);

    // H3: Standalone tool_result_fetch recovers un-truncated raw payload by call_id
    const fetchTool = createToolResultFetchTool();
    const fetchResult = (await fetchTool.execute("call_fetch_1", { call_id: callId })) as any;
    const fetchJson = JSON.parse(fetchResult.content[0].text);

    expect(fetchJson.status).toBe("ok");
    expect(fetchJson.callId).toBe(callId);
    expect(fetchJson.rawResult).toContain(fullRawPayload);
  });
});
