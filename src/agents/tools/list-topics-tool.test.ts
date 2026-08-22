// list_topics built-in tool tests.
import { describe, expect, it, vi } from "vitest";
import { createListTopicsTool, ListTopicsEntry } from "./list-topics-tool.js";

const topics: ListTopicsEntry[] = [
  { threadId: "10", name: "Alpha" },
  { threadId: "42", name: "Deployments", closed: true },
  { threadId: "99", name: "Middle" },
  { threadId: "7", name: "zebra" },
];

function makeTool(resolveTopics = vi.fn(async () => topics)) {
  const tool = createListTopicsTool({
    environment: "telegram",
    chatId: "-100123",
    scope: "session-store-path",
    resolveTopics,
  });
  return { tool, resolveTopics };
}

async function executeJson(tool: ReturnType<typeof makeTool>["tool"], params: unknown) {
  const result = await tool.execute("call-1", params as never);
  return JSON.parse(result.content[0].text) as {
    chat_id: string;
    environment: string;
    topics: { thread_id: string; name: string; closed?: boolean }[];
  };
}

describe("createListTopicsTool", () => {
  it("declares the list_topics name and label", () => {
    const { tool } = makeTool();
    expect(tool.name).toBe("list_topics");
    expect(tool.label).toBe("Topics");
  });

  it("lists all topics sorted by name when no filters are supplied", async () => {
    const { tool, resolveTopics } = makeTool();
    const out = await executeJson(tool, {});
    expect(resolveTopics).toHaveBeenCalledWith("-100123", "session-store-path");
    expect(out.chat_id).toBe("-100123");
    expect(out.environment).toBe("telegram");
    expect(out.topics.map((t) => t.name)).toEqual(["Alpha", "Deployments", "Middle", "zebra"]);
  });

  it("filters by case-insensitive name substring query", async () => {
    const { tool } = makeTool();
    const out = await executeJson(tool, { query: "DEPLOY" });
    expect(out.topics).toEqual([{ thread_id: "42", name: "Deployments", closed: true }]);
  });

  it("excludes closed topics when include_closed is false", async () => {
    const { tool } = makeTool();
    const out = await executeJson(tool, { include_closed: false });
    expect(out.topics.map((t) => t.name)).not.toContain("Deployments");
    expect(out.topics.map((t) => t.name)).toContain("Alpha");
  });

  it("propagates closed status in results when include_closed is true", async () => {
    const { tool } = makeTool();
    const out = await executeJson(tool, {});
    const deployments = out.topics.find((t) => t.name === "Deployments");
    expect(deployments?.closed).toBe(true);
    const alpha = out.topics.find((t) => t.name === "Alpha");
    expect(alpha?.closed).toBeUndefined();
  });

  it("passes the chat id and scope to the provider even with query filtering", async () => {
    const { tool, resolveTopics } = makeTool();
    await executeJson(tool, { query: "Alpha" });
    expect(resolveTopics).toHaveBeenCalledWith("-100123", "session-store-path");
  });

  it("returns an empty topic list when the provider resolves none", async () => {
    const { tool } = makeTool(vi.fn(async () => []));
    const out = await executeJson(tool, {});
    expect(out.topics).toEqual([]);
  });
});