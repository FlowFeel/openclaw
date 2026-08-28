// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ToolCommandLogger } from "../tool-command-log/tool-command-logger.js";
import { lazyPrefixTruncate } from "./lazy-prefix-truncation.js";
import {
  truncateTranscriptToolValues,
  type TranscriptMessage,
} from "./transcript-value-truncator.js";

/**
 * Feature: Tool Call Transcript Value Truncation & Redundant Channel Preservation
 *
 * As an Agent Platform Context Optimization Subsystem
 * I want to apply store-boundary lazy prefix projection φ(v, k) to historical tool call values
 * So that the context window footprint is reduced by >= 70% while preserving structural keyspace K
 * and writing 100% full payloads to the flight recorder cold storage channel.
 */
describe("BDD Contract: Tool Call Transcript Value Truncation (Epic 23)", () => {
  it("Contract F1: Structural keyspace K carries 0 entropy diff and remains 100% intact", () => {
    const rawCall: TranscriptMessage = {
      role: "assistant",
      type: "tool_use",
      id: "call_spec_001",
      name: "exec",
      arguments: {
        command: "find /home/node/.openclaw/workspace -type f -name '*.ts' -exec grep -H 'export' {} +",
        dir: "/home/node/.openclaw/workspace",
      },
    };

    const truncated = truncateTranscriptToolValues([rawCall], 40)[0];

    // Assert structural keyspace is invariant
    expect(Object.keys(truncated)).toEqual(Object.keys(rawCall));
    expect(truncated.role).toBe(rawCall.role);
    expect(truncated.type).toBe(rawCall.type);
    expect(truncated.id).toBe(rawCall.id);
    expect(truncated.name).toBe(rawCall.name);
    expect(Object.keys(truncated.arguments!)).toEqual(Object.keys(rawCall.arguments!));
  });

  it("Contract F2: Truncated value strings maintain prefix budget k and drop trailing chaff", () => {
    const longCommand = "find /home/node/.openclaw/workspace -type f -name '*.ts' " + "chaff_".repeat(30);
    const projected = lazyPrefixTruncate(longCommand, 60);

    expect(projected.startsWith("find /home/node/.openclaw/workspace -type f -name '*.ts'")).toBe(true);
    expect(projected.endsWith("…")).toBe(true);
    expect(projected.length).toBe(61); // 60 chars + 1 ellipsis
  });

  it("Contract F3: Full command payloads survive in ToolCommandLogger flight recorder", () => {
    const tmpDir = path.join("/tmp", "test-flight-log-" + Date.now());
    const logFilePath = path.join(tmpDir, "tool-call-commands.jsonl");

    const logger = new ToolCommandLogger({ logFilePath, enabled: true });

    const fullCommand = "find /home/node/.openclaw/workspace -type f -name '*.ts' -exec grep -H 'export' {} +";
    logger.record({
      tool: "exec",
      paramsSummary: fullCommand,
      ts: Date.now(),
      sessionKey: "session-epic23",
      turn: 1,
      callId: "call_spec_001",
    });

    // Transcript receives φ(v, 60) projection
    const transcriptValue = lazyPrefixTruncate(fullCommand, 60);
    expect(transcriptValue).toContain("…");
    expect(transcriptValue.length).toBeLessThan(fullCommand.length);

    // Flight log retains 100% full payload
    const recent = logger.readRecent(1);
    expect(recent.length).toBe(1);
    expect(recent[0].paramsSummary).toBe(fullCommand);

    // Clean up temp log
    if (fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it("Contract F4: Information density savings on historical tool result streams exceed >= 70%", () => {
    const largeResultPayload = "STDOUT: " + "a".repeat(1000) + "\nSTDERR: " + "b".repeat(500);
    const rawResultMsg: TranscriptMessage = {
      role: "tool",
      toolCallId: "call_spec_001",
      name: "exec",
      content: largeResultPayload,
    };

    const truncated = truncateTranscriptToolValues([rawResultMsg], 120)[0];
    const originalLen = (rawResultMsg.content as string).length;
    const truncatedLen = (truncated.content as string).length;

    const reductionPercent = ((originalLen - truncatedLen) / originalLen) * 100;
    expect(reductionPercent).toBeGreaterThanOrEqual(70);
  });
});
