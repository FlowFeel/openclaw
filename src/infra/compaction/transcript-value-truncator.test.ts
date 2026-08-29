// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  truncateTranscriptToolValues,
  type TranscriptMessage,
} from "./transcript-value-truncator.js";

describe("truncateTranscriptToolValues", () => {
  it("preserves keyspace, roles, ids, and names while truncating argument payload values", () => {
    const messages: TranscriptMessage[] = [
      {
        role: "assistant",
        content: [
          {
            type: "toolCall",
            id: "call_123",
            name: "exec",
            arguments: {
              command: "find /home/node/.openclaw/workspace -name '*.ts' " + "v".repeat(200),
            },
          },
        ],
      },
    ];

    const result = truncateTranscriptToolValues(messages, 50);
    expect(result[0].role).toBe("assistant");
    const content = result[0].content as Array<{ arguments?: { command?: string } }>;
    const cmd = content[0].arguments?.command ?? "";
    expect(cmd.startsWith("find /home/node/.openclaw/workspace -name '*.ts' v")).toBe(true);
    expect(cmd.endsWith("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")).toBe(true);
    expect(cmd).toContain("... [truncated ");
  });

  it("truncates tool result message content strings", () => {
    const messages: TranscriptMessage[] = [
      {
        role: "tool",
        toolCallId: "call_123",
        name: "exec",
        content: "Output header: success\n" + "line data\n".repeat(50),
      },
    ];

    const result = truncateTranscriptToolValues(messages, 30);
    expect(result[0].role).toBe("tool");
    expect(result[0].toolCallId).toBe("call_123");
    expect(result[0].name).toBe("exec");
    const resContent = result[0].content as string;
    expect(resContent.startsWith("Output header: success\nline da")).toBe(true);
    expect(resContent).toContain("... [truncated ");
  });

  it("leaves messages without tool call payloads untouched", () => {
    const messages: TranscriptMessage[] = [
      { role: "user", content: "Hello model" },
      { role: "assistant", content: "Hello human" },
    ];

    const result = truncateTranscriptToolValues(messages, 20);
    expect(result).toEqual(messages);
  });
});
