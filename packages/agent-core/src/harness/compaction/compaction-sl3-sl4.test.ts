import { describe, expect, it, vi } from "vitest";
import { createAssistantMessageEventStream } from "../../llm.js";
import type { Model, StreamFn } from "../../llm.js";
import type { AgentMessage } from "../../types.js";
import { compact, generateSummary } from "./compaction.js";
import { createFileOps } from "./utils.js";

const model: Model = {
  id: "test-model",
  name: "Test Model",
  provider: "test-provider",
  api: "test-api",
  baseUrl: "https://example.test",
  reasoning: false,
  input: ["text"],
  cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  contextWindow: 100_000,
  maxTokens: 200_000,
};

function createSummaryStreamFn(summaryText: string): StreamFn {
  return vi.fn<StreamFn>(() => {
    const stream = createAssistantMessageEventStream();
    const summaryMessage = {
      role: "assistant" as const,
      content: [{ type: "text" as const, text: summaryText }],
      api: "test-api" as const,
      provider: "test-provider" as const,
      model: "test-model",
      usage: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: 0,
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
      },
      stopReason: "stop" as const,
      timestamp: 1,
    };
    stream.push({ type: "done", reason: "stop", message: summaryMessage });
    stream.end();
    return stream;
  });
}

function makeMessages(count: number): AgentMessage[] {
  const messages: AgentMessage[] = [];
  for (let i = 0; i < count; i++) {
    messages.push({ role: "user", content: `Message ${i} with content`.repeat(50), timestamp: i });
  }
  return messages;
}

describe("SL-4: generateSummary budget-aware maxTokens", () => {
  it("sizes maxTokens from reserveTokens when no budget provided", async () => {
    const streamFn = createSummaryStreamFn("summary");
    await generateSummary(
      [{ role: "user", content: "hello", timestamp: 1 }],
      model,
      10_000, // reserveTokens
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "off",
      streamFn,
    );
    // Without budget: maxTokens = 0.8 * reserveTokens = 8000
    expect(streamFn).toHaveBeenCalledOnce();
    const call = vi.mocked(streamFn).mock.calls[0]!;
    const options = call[2];
    expect(options?.maxTokens).toBeLessThanOrEqual(8000);
  });

  it("sizes maxTokens from budget when contextTokenBudget provided", async () => {
    const streamFn = createSummaryStreamFn("summary");
    await generateSummary(
      [{ role: "user", content: "hello", timestamp: 1 }],
      model,
      10_000, // reserveTokens
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "off",
      streamFn,
      undefined,
      100_000, // contextTokenBudget
      20_000, // keepRecentTokens
    );
    // With budget: budgetForSummary = 100000 - 20000 - 10000 = 70000
    // summaryCap = 0.25 * 100000 = 25000
    // maxTokens = 0.8 * min(70000, 25000) = 0.8 * 25000 = 20000
    expect(streamFn).toHaveBeenCalledOnce();
    const call = vi.mocked(streamFn).mock.calls[0]!;
    const options = call[2];
    expect(options?.maxTokens).toBe(20_000);
  });

  it("caps summary at 25% of context window", async () => {
    const streamFn = createSummaryStreamFn("summary");
    await generateSummary(
      [{ role: "user", content: "hello", timestamp: 1 }],
      model,
      16_384, // reserveTokens
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      "off",
      streamFn,
      undefined,
      262_144, // contextTokenBudget (242K)
      8_192, // keepRecentTokens
    );
    // budgetForSummary = 262144 - 8192 - 16384 = 237568
    // summaryCap = 0.25 * 262144 = 65536
    // maxTokens = 0.8 * min(237568, 65536) = 0.8 * 65536 = 52428
    expect(streamFn).toHaveBeenCalledOnce();
    const call = vi.mocked(streamFn).mock.calls[0]!;
    const options = call[2];
    expect(options?.maxTokens).toBe(52_428);
  });
});

describe("SL-3: compact convergence check", () => {
  it("does not run second pass when no contextTokenBudget provided", async () => {
    const streamFn = createSummaryStreamFn("short summary");
    const messages = makeMessages(10);

    await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 5_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      // No contextTokenBudget — convergence check should not run
    );

    // Only one call (first pass, no second pass)
    expect(streamFn).toHaveBeenCalledTimes(1);
  });

  it("runs second pass when first pass summary + keepRecent exceeds 85% of budget", async () => {
    // Create a large summary that would exceed budget
    const largeSummary = "x".repeat(200_000); // ~50K tokens
    const streamFn = createSummaryStreamFn(largeSummary);
    const messages = makeMessages(10);

    await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 50_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000, // contextTokenBudget — 85% threshold = 85K
      // summary ~50K + keepRecent 50K = 100K > 85K → second pass
    );

    // First pass + second pass = 2 calls
    expect(streamFn).toHaveBeenCalledTimes(2);
  });

  it("does not run second pass when summary + keepRecent fits within 85% of budget", async () => {
    const smallSummary = "short summary"; // ~4 tokens
    const streamFn = createSummaryStreamFn(smallSummary);
    const messages = makeMessages(10);

    await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 5_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000, // contextTokenBudget — 85% threshold = 85K
      // summary ~4 + keepRecent 5000 = 5004 << 85K → no second pass
    );

    expect(streamFn).toHaveBeenCalledTimes(1);
  });

  it("second pass uses halved keepRecentTokens", async () => {
    const largeSummary = "x".repeat(200_000);
    const streamFn = createSummaryStreamFn(largeSummary);
    const messages = makeMessages(10);

    await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 50_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000, // contextTokenBudget
    );

    // Second pass should use halved keepRecent: 50000 / 2 = 25000
    expect(streamFn).toHaveBeenCalledTimes(2);
    const secondCall = vi.mocked(streamFn).mock.calls[1]!;
    const options = secondCall[2];
    // With halved keepRecent (25000) and budget 100000:
    // budgetForSummary = 100000 - 25000 - 10000 = 65000
    // summaryCap = 0.25 * 100000 = 25000
    // maxTokens = 0.8 * min(65000, 25000) = 0.8 * 25000 = 20000
    expect(options?.maxTokens).toBe(20_000);
  });

  it("does not run second pass for split turns", async () => {
    const largeSummary = "x".repeat(200_000);
    const streamFn = createSummaryStreamFn(largeSummary);
    const messages = makeMessages(10);

    await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [{ role: "user", content: "prefix", timestamp: 2 }],
        isSplitTurn: true,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 50_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000, // contextTokenBudget — would trigger second pass if not split
    );

    // Split turn: history summary + turn prefix summary = 2 calls, but no
    // convergence second pass (convergence is skipped for split turns)
    expect(streamFn).toHaveBeenCalledTimes(2);
  });
});

describe("R4: compaction convergence metadata", () => {
  it("returns convergence metadata when contextTokenBudget is provided", async () => {
    const streamFn = createSummaryStreamFn("short summary");
    const messages = makeMessages(10);

    const result = await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 5_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.convergence).toBeDefined();
    expect(result.value.convergence?.passes).toBe(1);
    expect(result.value.convergence?.converged).toBe(true);
    expect(result.value.convergence?.keepRecentTokens).toBe(5_000);
    expect(result.value.convergence?.contextTokenBudget).toBe(100_000);
    expect(result.value.convergence?.summaryTokens).toBeGreaterThan(0);
  });

  it("returns undefined convergence when no contextTokenBudget", async () => {
    const streamFn = createSummaryStreamFn("short summary");
    const messages = makeMessages(10);

    const result = await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 5_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      // No contextTokenBudget
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.convergence).toBeUndefined();
  });

  it("returns passes=2 and converged after second pass succeeds", async () => {
    // First pass: large summary that exceeds budget, triggering second pass.
    // Second pass: smaller summary that fits budget.
    let callCount = 0;
    const streamFn = vi.fn<StreamFn>(() => {
      callCount++;
      const stream = createAssistantMessageEventStream();
      const text = callCount === 1 ? "x".repeat(200_000) : "small";
      const summaryMessage = {
        role: "assistant" as const,
        content: [{ type: "text" as const, text }],
        api: "test-api" as const,
        provider: "test-provider" as const,
        model: "test-model",
        usage: {
          input: 0,
          output: 0,
          cacheRead: 0,
          cacheWrite: 0,
          totalTokens: 0,
          cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
        },
        stopReason: "stop" as const,
        timestamp: 1,
      };
      stream.push({ type: "done", reason: "stop", message: summaryMessage });
      stream.end();
      return stream;
    });
    const messages = makeMessages(10);

    const result = await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 50_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.convergence?.passes).toBe(2);
    expect(result.value.convergence?.converged).toBe(true);
    expect(result.value.convergence?.keepRecentTokens).toBe(25_000); // halved
  });

  it("returns converged=false when second pass still exceeds budget", async () => {
    // Both passes return large summaries that exceed budget even with halved keepRecent.
    // summaryTokens = ceil(300000 / 4) = 75000; 75000 + 25000 = 100000 > 85000 threshold.
    const largeSummary = "x".repeat(300_000);
    const streamFn = createSummaryStreamFn(largeSummary);
    const messages = makeMessages(10);

    const result = await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [],
        isSplitTurn: false,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 50_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.convergence?.passes).toBe(2);
    expect(result.value.convergence?.converged).toBe(false);
  });

  it("returns undefined convergence for split turns", async () => {
    const streamFn = createSummaryStreamFn("summary");
    const messages = makeMessages(10);

    const result = await compact(
      {
        firstKeptEntryId: "kept-entry",
        messagesToSummarize: messages,
        turnPrefixMessages: [{ role: "user", content: "prefix", timestamp: 2 }],
        isSplitTurn: true,
        tokensBefore: 100,
        fileOps: createFileOps(),
        settings: { enabled: true, reserveTokens: 10_000, keepRecentTokens: 5_000 },
      },
      model,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      streamFn,
      undefined,
      100_000,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.convergence).toBeUndefined();
  });
});
