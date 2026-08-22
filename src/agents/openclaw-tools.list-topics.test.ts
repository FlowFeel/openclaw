// Verifies channelTopics integration in createOpenClawTools.
import { describe, expect, it, vi } from "vitest";
import { createOpenClawTools } from "./openclaw-tools.js";

describe("createOpenClawTools with channelTopics", () => {
  it("omits list_topics tool by default when channelTopics is not provided", () => {
    const tools = createOpenClawTools({
      config: { agents: { entries: { main: { default: true } } } },
    });
    const names = tools.map((t) => t.name);
    expect(names).not.toContain("list_topics");
  });

  it("includes list_topics tool when channelTopics is provided", () => {
    const resolveTopics = vi.fn().mockResolvedValue([
      { threadId: "1", name: "General" },
      { threadId: "2", name: "Support", closed: true },
    ]);

    const tools = createOpenClawTools({
      config: { agents: { entries: { main: { default: true } } } },
      channelTopics: {
        environment: "telegram",
        chatId: "-100123",
        resolveTopics,
      },
    });

    const listTopicsTool = tools.find((t) => t.name === "list_topics");
    expect(listTopicsTool).toBeDefined();
    expect(listTopicsTool?.description).toContain("List the known topics");
  });

  it("executes list_topics tool using provided resolveTopics provider", async () => {
    const resolveTopics = vi.fn().mockResolvedValue([
      { threadId: "100", name: "Deployments" },
      { threadId: "200", name: "Outages", closed: true },
    ]);

    const tools = createOpenClawTools({
      config: { agents: { entries: { main: { default: true } } } },
      channelTopics: {
        environment: "telegram",
        chatId: "-100123",
        resolveTopics,
      },
    });

    const listTopicsTool = tools.find((t) => t.name === "list_topics");
    expect(listTopicsTool).toBeDefined();

    const result = await listTopicsTool!.execute("call_1", { query: "Deploy" });
    expect(resolveTopics).toHaveBeenCalledWith("-100123", undefined);
    const contentText = (result.content as Array<{ type: string; text: string }>)[0].text;
    expect(contentText).toContain("Deployments");
    expect(contentText).not.toContain("Outages");
  });
});
