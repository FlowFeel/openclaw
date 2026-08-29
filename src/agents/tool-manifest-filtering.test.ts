import { describe, expect, it } from "vitest";
import { toToolDefinitions } from "./agent-tool-definition-adapter.js";
import type { AgentTool } from "./runtime/index.js";

describe("Tool Manifest Filtering (CAP-77081-03)", () => {
  const dummyTools: AgentTool[] = [
    {
      name: "exec",
      description: "Execute terminal commands",
      parameters: { type: "object", properties: { command: { type: "string" } } },
      execute: async () => ({ content: [{ type: "text", text: "executed" }] }),
    },
    {
      name: "read",
      description: "Read file content",
      parameters: { type: "object", properties: { path: { type: "string" } } },
      execute: async () => ({ content: [{ type: "text", text: "file content" }] }),
    },
    {
      name: "write",
      description: "Write file content",
      parameters: { type: "object", properties: { path: { type: "string" } } },
      execute: async () => ({ content: [{ type: "text", text: "wrote" }] }),
    },
    {
      name: "google_meet",
      description: "Google Meet integration",
      parameters: { type: "object", properties: {} },
      execute: async () => ({ content: [{ type: "text", text: "meet" }] }),
    },
  ];

  it("returns all tools when filterTools option is omitted or empty", () => {
    const defs = toToolDefinitions(dummyTools);
    expect(defs.length).toBe(4);
    expect(defs.map((d) => d.name)).toEqual(["exec", "read", "write", "google_meet"]);
  });

  it("filters system prompt tool definitions to only matching filterTools entries", () => {
    const defs = toToolDefinitions(dummyTools, undefined, {
      filterTools: ["exec", "read"],
    });
    expect(defs.length).toBe(2);
    expect(defs.map((d) => d.name)).toEqual(["exec", "read"]);
  });

  it("retains full execution capability for un-filtered tools in runtime execution", async () => {
    const defs = toToolDefinitions(dummyTools);
    const googleMeetTool = defs.find((d) => d.name === "google_meet");
    expect(googleMeetTool).toBeDefined();
    const result = await googleMeetTool?.execute("call_123", {});
    expect(result?.content[0].text).toBe("meet");
  });
});
