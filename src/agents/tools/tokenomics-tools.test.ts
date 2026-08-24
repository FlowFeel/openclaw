import { describe, it, expect, beforeEach } from "vitest";
import {
  tokenomics_snr,
  noise_inspect,
  budget_breakdown,
  retransmit_request,
  resetTokenomicsEngine,
} from "./tokenomics-tools.js";
import { projectCertifiedToolArity } from "../../infra/shannon-weaver/tool-arity-projector.js";

describe("Degree 1: Tokenomics Certified Tool Arity & Schema Contracts", () => {
  beforeEach(() => {
    resetTokenomicsEngine();
  });

  it("certifies tokenomics_snr as Atomic (k <= 2)", () => {
    const rawSchema = {
      type: "object",
      properties: {
        turns: { type: "array" },
        options: {
          type: "object",
          properties: {
            threshold: { type: "number" },
            detailed: { type: "boolean" },
          },
        },
      },
      required: ["turns"],
    };

    const projection = projectCertifiedToolArity({ name: "tokenomics_snr", parameters: rawSchema });
    expect(projection.arity).toBeLessThanOrEqual(2);
    expect(projection.tier).toBe("atomic");
  });

  it("certifies noise_inspect as Atomic (k <= 2)", () => {
    const rawSchema = {
      type: "object",
      properties: {
        turns: { type: "array" },
        options: {
          type: "object",
          properties: {
            topN: { type: "number" },
            category: { type: "string" },
          },
        },
      },
      required: ["turns"],
    };

    const projection = projectCertifiedToolArity({ name: "noise_inspect", parameters: rawSchema });
    expect(projection.arity).toBeLessThanOrEqual(2);
    expect(projection.tier).toBe("atomic");
  });

  it("certifies budget_breakdown as Atomic (k = 1)", () => {
    const rawSchema = {
      type: "object",
      properties: {
        items: { type: "array" },
      },
      required: ["items"],
    };

    const projection = projectCertifiedToolArity({ name: "budget_breakdown", parameters: rawSchema });
    expect(projection.arity).toBe(1);
    expect(projection.tier).toBe("atomic");
  });

  it("certifies retransmit_request as Atomic (k = 2)", () => {
    const rawSchema = {
      type: "object",
      properties: {
        archiveText: { type: "string" },
        options: {
          type: "object",
          properties: {
            query: { type: "string" },
            maxTokens: { type: "number" },
          },
          required: ["query"],
        },
      },
      required: ["archiveText", "options"],
    };

    const projection = projectCertifiedToolArity({ name: "retransmit_request", parameters: rawSchema });
    expect(projection.arity).toBeLessThanOrEqual(2);
    expect(projection.tier).toBe("atomic");
  });

  it("executes tokenomics_snr tool call with expected schema output", () => {
    const res = tokenomics_snr([
      { role: "user", content: "Architecture decision." },
      { role: "assistant", content: "Use SQLite coordinate map." },
    ]);

    expect(res.snrPercent).toBeGreaterThanOrEqual(70);
    expect(res.tier).toBe("nominal");
    expect(res.isAdequate).toBe(true);
    expect(res.recommendation).toContain("adequate");
  });

  it("executes noise_inspect tool call filtering by category", () => {
    const res = noise_inspect([
      { role: "assistant", content: "heartbeat", tokens: 50 },
      { role: "assistant", content: "got it", tokens: 10 },
    ], { category: "heartbeat" });

    expect(res.count).toBe(1);
    expect(res.topSources[0].category).toBe("heartbeat");
  });

  it("executes budget_breakdown tool call with 100% coverage", () => {
    const res = budget_breakdown([
      { category: "system_prompts", tokens: 500 },
      { category: "conversation_history", tokens: 1500 },
    ]);

    expect(res.totalTokens).toBe(2000);
    expect(res.coveragePercent).toBe(100);
    expect(res.categories.length).toBe(2);
  });

  it("executes retransmit_request tool call recovering missing signal", () => {
    const archive = "Topic: Market analysis.\n\nDetail: CSCO RSI is at 32 indicating oversold condition.\n\nEnd.";
    const res = retransmit_request(archive, { query: "CSCO RSI" });

    expect(res.found).toBe(true);
    expect(res.segment).toContain("CSCO RSI is at 32");
  });
});
