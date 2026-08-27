import { describe, expect, it } from "vitest";
import {
  condenseToolParameters,
  formatFlightLogLine,
} from "../../tool-command-formatter.js";
import type { ToolCallCommandEntry } from "../../tool-command-types.js";

describe("Tier 1 Unit: Tool Command Formatter", () => {
  it("condenses exec tool parameters extracting command cleanly", () => {
    const raw = { command: "docker ps -a --format '{{.Names}}'" };
    const summary = condenseToolParameters("exec", raw);
    expect(summary).toBe("docker ps -a --format '{{.Names}}'");
  });

  it("condenses web_search tool parameters extracting query", () => {
    const raw = { query: "oom killer syslog linux" };
    const summary = condenseToolParameters("web_search", raw);
    expect(summary).toBe("query: oom killer syslog linux");
  });

  it("condenses sessions_spawn tool parameters extracting task and agentId", () => {
    const raw = { task: "run diagnostic check", agentId: "worker-1" };
    const summary = condenseToolParameters("sessions_spawn", raw);
    expect(summary).toBe("task: [worker-1] run diagnostic check");
  });

  it("condenses file tool parameters extracting path", () => {
    const raw = { targetFile: "/home/ubuntu/config.yaml", overwrite: true };
    const summary = condenseToolParameters("write", raw);
    expect(summary).toBe("path: /home/ubuntu/config.yaml");
  });

  it("enforces line budget <= 180 bytes for typical entry", () => {
    const entry: ToolCallCommandEntry = {
      tool: "exec",
      paramsSummary: "docker ps -a --filter status=running",
      ts: 1787856600000,
      sessionKey: "main:topic:1717",
      turn: 12,
      callId: "call_abc123",
      heapPct: 42.5,
    };

    const line = formatFlightLogLine(entry);
    const bytes = Buffer.byteLength(line, "utf8");
    expect(bytes).toBeLessThanOrEqual(180);

    const parsed = JSON.parse(line);
    expect(parsed.tool).toBe("exec");
    expect(parsed.params).toBe("docker ps -a --filter status=running");
    expect(parsed.heap).toBe(43);
  });

  it("handles empty or primitive params gracefully", () => {
    expect(condenseToolParameters("unknown", null)).toBe("");
    expect(condenseToolParameters("unknown", "plain text arg")).toBe("plain text arg");
  });
});
