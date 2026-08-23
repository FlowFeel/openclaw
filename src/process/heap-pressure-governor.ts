// Two-tier heap pressure governor for container memory protection.
// Soft threshold (>=75%): Proactive cache eviction (e.g. prompt caches, tokenizers, tool result buffers)
// Hard threshold (>=88%): Emergency task shedding and synchronous V8 GC invocation.
import v8 from "node:v8";
import { diagnosticLogger as diag } from "../logging/diagnostic-runtime.js";
import { resolveGlobalSingleton } from "../shared/global-singleton.js";

export type HeapPressureTier = "nominal" | "soft_warning" | "hard_emergency";

export type HeapGovernorOptions = {
  softThresholdRatio?: number;
  hardThresholdRatio?: number;
  hysteresisRatio?: number;
  cooldownMs?: number;
};

export type HeapMemoryMetrics = {
  heapUsedBytes: number;
  heapLimitBytes: number;
  heapTotalBytes?: number;
};

export type HeapEvaluationResult = {
  tier: HeapPressureTier;
  usedRatio: number;
  heapUsedBytes: number;
  heapLimitBytes: number;
};

export const DEFAULT_SOFT_THRESHOLD_RATIO = 0.75;
export const DEFAULT_HARD_THRESHOLD_RATIO = 0.88;
export const DEFAULT_HYSTERESIS_RATIO = 0.7;
export const DEFAULT_COOLDOWN_MS = 5_000;

/**
 * Pure evaluation of memory metrics against governor thresholds.
 */
export function evaluateHeapMetrics(
  metrics: HeapMemoryMetrics,
  options?: HeapGovernorOptions,
): HeapEvaluationResult {
  const softRatio = options?.softThresholdRatio ?? DEFAULT_SOFT_THRESHOLD_RATIO;
  const hardRatio = options?.hardThresholdRatio ?? DEFAULT_HARD_THRESHOLD_RATIO;

  const limit = Math.max(1, metrics.heapLimitBytes);
  const used = Math.max(0, metrics.heapUsedBytes);
  const usedRatio = used / limit;

  let tier: HeapPressureTier = "nominal";
  if (usedRatio >= hardRatio) {
    tier = "hard_emergency";
  } else if (usedRatio >= softRatio) {
    tier = "soft_warning";
  }

  return {
    tier,
    usedRatio,
    heapUsedBytes: used,
    heapLimitBytes: limit,
  };
}

/**
 * Reads live V8 heap statistics from process/v8 module.
 */
export function readLiveHeapMetrics(): HeapMemoryMetrics {
  const heapStats = v8.getHeapStatistics?.();
  const memUsage = process.memoryUsage();

  const heapLimitBytes = heapStats?.heap_size_limit ?? memUsage.heapTotal * 1.5;
  const heapUsedBytes = memUsage.heapUsed;
  const heapTotalBytes = memUsage.heapTotal;

  return {
    heapUsedBytes,
    heapLimitBytes,
    heapTotalBytes,
  };
}

export type HeapPressureHandler = (
  result: HeapEvaluationResult,
) => void | Promise<void>;

export class HeapPressureGovernor {
  private readonly options: Required<HeapGovernorOptions>;
  private readonly softHandlers = new Set<HeapPressureHandler>();
  private readonly hardHandlers = new Set<HeapPressureHandler>();
  private currentTier: HeapPressureTier = "nominal";
  private lastSoftTriggerMs = 0;
  private lastHardTriggerMs = 0;
  private pollingTimer?: ReturnType<typeof setInterval>;

  constructor(options?: HeapGovernorOptions) {
    this.options = {
      softThresholdRatio: options?.softThresholdRatio ?? DEFAULT_SOFT_THRESHOLD_RATIO,
      hardThresholdRatio: options?.hardThresholdRatio ?? DEFAULT_HARD_THRESHOLD_RATIO,
      hysteresisRatio: options?.hysteresisRatio ?? DEFAULT_HYSTERESIS_RATIO,
      cooldownMs: options?.cooldownMs ?? DEFAULT_COOLDOWN_MS,
    };
  }

  public getCurrentTier(): HeapPressureTier {
    return this.currentTier;
  }

  public onSoftPressure(handler: HeapPressureHandler): () => void {
    this.softHandlers.add(handler);
    return () => this.softHandlers.delete(handler);
  }

  public onHardEmergency(handler: HeapPressureHandler): () => void {
    this.hardHandlers.add(handler);
    return () => this.hardHandlers.delete(handler);
  }

  /**
   * Processes an evaluation result with hysteresis and cooldown guards.
   */
  public recordEvaluation(
    result: HeapEvaluationResult,
    nowMs: number = Date.now(),
  ): {
    triggeredSoft: boolean;
    triggeredHard: boolean;
    transition: string | null;
  } {
    let triggeredSoft = false;
    let triggeredHard = false;
    let transition: string | null = null;

    if (result.tier === "hard_emergency") {
      const timeSinceLastHard = nowMs - this.lastHardTriggerMs;
      if (this.currentTier !== "hard_emergency" || timeSinceLastHard >= this.options.cooldownMs) {
        triggeredHard = true;
        this.lastHardTriggerMs = nowMs;
        if (this.currentTier !== "hard_emergency") {
          transition = `${this.currentTier} -> hard_emergency`;
          this.currentTier = "hard_emergency";
        }
      }
    } else if (result.tier === "soft_warning") {
      const timeSinceLastSoft = nowMs - this.lastSoftTriggerMs;
      if (this.currentTier === "nominal" || timeSinceLastSoft >= this.options.cooldownMs) {
        triggeredSoft = true;
        this.lastSoftTriggerMs = nowMs;
        if (this.currentTier !== "soft_warning") {
          transition = `${this.currentTier} -> soft_warning`;
          this.currentTier = "soft_warning";
        }
      }
    } else {
      // Nominal - check if we dropped below hysteresis threshold
      if (
        this.currentTier !== "nominal" &&
        result.usedRatio < this.options.hysteresisRatio
      ) {
        transition = `${this.currentTier} -> nominal`;
        this.currentTier = "nominal";
      }
    }

    return { triggeredSoft, triggeredHard, transition };
  }

  /**
   * Evaluates memory pressure, dispatches handlers if thresholds exceeded, and attempts GC on hard emergency.
   */
  public async checkPressure(
    metricsProvider: () => HeapMemoryMetrics = readLiveHeapMetrics,
    nowMs: number = Date.now(),
  ): Promise<HeapEvaluationResult> {
    const metrics = metricsProvider();
    const result = evaluateHeapMetrics(metrics, this.options);
    const outcome = this.recordEvaluation(result, nowMs);

    if (outcome.transition) {
      diag.warn(
        `heap governor state transition: ${outcome.transition} (used=${(result.usedRatio * 100).toFixed(1)}% ` +
          `usedBytes=${(result.heapUsedBytes / (1024 * 1024)).toFixed(1)}MB limitBytes=${(result.heapLimitBytes / (1024 * 1024)).toFixed(1)}MB)`,
      );
    }

    if (outcome.triggeredHard) {
      diag.warn(
        `heap governor HARD EMERGENCY triggered: invoking ${this.hardHandlers.size} handler(s) and requesting GC`,
      );
      for (const handler of Array.from(this.hardHandlers)) {
        try {
          await handler(result);
        } catch (err) {
          diag.error(`heap governor hard emergency handler error: ${String(err)}`);
        }
      }
      // Attempt manual GC if exposed by Node runtime (--expose-gc)
      if (typeof globalThis.gc === "function") {
        try {
          globalThis.gc();
        } catch {
          // ignore GC invocation failure
        }
      }
    } else if (outcome.triggeredSoft) {
      diag.info(
        `heap governor SOFT WARNING triggered: invoking ${this.softHandlers.size} cache eviction handler(s)`,
      );
      for (const handler of Array.from(this.softHandlers)) {
        try {
          await handler(result);
        } catch (err) {
          diag.error(`heap governor soft warning handler error: ${String(err)}`);
        }
      }
    }

    return result;
  }

  public startPolling(intervalMs: number = 10_000): void {
    if (this.pollingTimer) {
      return;
    }
    this.pollingTimer = setInterval(() => {
      void this.checkPressure().catch((err) => {
        diag.error(`heap governor polling error: ${String(err)}`);
      });
    }, intervalMs);
    this.pollingTimer.unref?.();
  }

  public stopPolling(): void {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = undefined;
    }
  }
}

const HEAP_PRESSURE_GOVERNOR_KEY = Symbol.for("openclaw.heapPressureGovernor");

export function getGlobalHeapPressureGovernor(): HeapPressureGovernor {
  return resolveGlobalSingleton(HEAP_PRESSURE_GOVERNOR_KEY, () => new HeapPressureGovernor());
}
