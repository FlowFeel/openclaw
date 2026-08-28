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
    expect(content[0].arguments?.command).toBe(
      "find /home/node/.openclaw/workspace -name '*.ts' v" + "…",
    );
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
    expect((result[0].content as string).endsWith("…")).toBe(true);
    expect((result[0].content as string).length).toBe(31); // 30 chars + ellipsis
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
