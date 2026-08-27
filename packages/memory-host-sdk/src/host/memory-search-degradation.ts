/**
 * Ambient Memory Search Graceful Degradation Coordinator.
 * Goldilocks decomposition unit (< 120 LOC).
 * 
 * @dft:axiom A4 (Fault-Tolerant Dynamic Fallback)
 */

export type DegradationStatus = {
  isDegraded: boolean;
  reason?: string;
  fallbackMode: "fts_bm25" | "none";
  trippedAt?: number;
};

function normalizeKey(agentId?: string): string {
  if (!agentId || !agentId.trim()) return "default";
  const norm = agentId.trim().toLowerCase();
  return norm === "main" ? "default" : norm;
}

export class MemorySearchDegradationManager {
  private degradedMap = new Map<string, DegradationStatus>();

  public getStatus(agentId?: string): DegradationStatus {
    const key = normalizeKey(agentId);
    return this.degradedMap.get(key) ?? (agentId ? this.degradedMap.get(agentId) : undefined) ?? {
      isDegraded: false,
      fallbackMode: "none",
    };
  }

  public markDegraded(params: {
    agentId: string;
    reason: string;
    fallbackMode?: "fts_bm25" | "none";
  }): void {
    const key = normalizeKey(params.agentId);
    const status: DegradationStatus = {
      isDegraded: true,
      reason: params.reason,
      fallbackMode: params.fallbackMode ?? "fts_bm25",
      trippedAt: Date.now(),
    };
    this.degradedMap.set(key, status);
    if (key !== params.agentId) {
      this.degradedMap.set(params.agentId, status);
    }
  }

  public restoreHealthy(agentId?: string): void {
    const key = normalizeKey(agentId);
    this.degradedMap.delete(key);
    if (agentId) {
      this.degradedMap.delete(agentId);
    }
  }

  public applyRuntimeDegradation<T extends { store: { vector: { enabled: boolean } }; query: { hybrid: { enabled: boolean } }; sync: { watch: boolean; intervalMinutes: number; embeddingBatchTimeoutSeconds?: number } }>(
    config: T,
    agentId?: string,
  ): T {
    const status = this.getStatus(agentId);
    if (!status.isDegraded) {
      return config;
    }

    return {
      ...config,
      store: {
        ...config.store,
        vector: {
          ...config.store.vector,
          enabled: false,
        },
      },
      query: {
        ...config.query,
        hybrid: {
          ...config.query.hybrid,
          enabled: false,
        },
      },
      sync: {
        ...config.sync,
        watch: false,
        intervalMinutes: 0,
        embeddingBatchTimeoutSeconds: undefined,
      },
    };
  }
}

export const globalMemoryDegradationManager = new MemorySearchDegradationManager();
