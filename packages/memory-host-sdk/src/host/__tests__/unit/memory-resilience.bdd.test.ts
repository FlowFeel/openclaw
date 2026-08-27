import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  globalMemoryDegradationManager,
  resolveMemorySearchConfig,
} from "../../../../../../src/agents/memory-search.js";
import type { OpenClawConfig } from "../../../../../../src/config/types.openclaw.js";
import {
  clearMemoryEmbeddingProviders,
  registerMemoryEmbeddingProvider,
} from "../../../../../../src/plugins/memory-embedding-providers.js";

describe("Tier 2 BDD Behavioral Contracts: Memory Search Resilience", () => {
  beforeEach(() => {
    registerMemoryEmbeddingProvider({
      id: "openai",
      defaultModel: "text-embedding-3-small",
      transport: "remote",
      create: async () => ({ provider: null }),
    });
    registerMemoryEmbeddingProvider({
      id: "openai-compatible",
      defaultModel: "nomic-embed-text",
      transport: "remote",
      create: async () => ({ provider: null }),
    });
  });

  afterEach(() => {
    clearMemoryEmbeddingProviders();
    globalMemoryDegradationManager.restoreHealthy("main");
  });

  it("Contract B1: Degrades gracefully to BM25 FTS mode when marked degraded without retry-spinning", () => {
    const cfg: OpenClawConfig = {
      plugins: { enabled: false },
      memory: {
        search: {
          enabled: true,
          provider: "openai-compatible",
          model: "nomic-embed-text",
          remote: {
            baseUrl: "http://127.0.0.1:11434/v1",
          },
        },
      },
    };

    // Simulate startup failure marking agent "main" degraded
    globalMemoryDegradationManager.markDegraded({
      agentId: "main",
      reason: "connect ECONNREFUSED 127.0.0.1:11434",
      fallbackMode: "fts_bm25",
    });

    const resolved = resolveMemorySearchConfig(cfg, "main");
    expect(resolved).toBeDefined();
    if (!resolved) return;

    // Vector store and hybrid must be disabled dynamically
    expect(resolved.store.vector.enabled).toBe(false);
    expect(resolved.query.hybrid.enabled).toBe(false);
    // Background watch and interval timers must be zeroed
    expect(resolved.sync.watch).toBe(false);
    expect(resolved.sync.intervalMinutes).toBe(0);
  });

  it("Contract B2: Honors failOnMissingProvider setting", () => {
    const cfgFailFast: OpenClawConfig = {
      plugins: { enabled: false },
      memory: {
        search: {
          enabled: true,
          failOnMissingProvider: true,
          provider: "openai-compatible",
          model: "nomic-embed-text",
        } as any,
      },
    };

    const resolved = resolveMemorySearchConfig(cfgFailFast, "main");
    expect(resolved?.failOnMissingProvider).toBe(true);
  });
});
