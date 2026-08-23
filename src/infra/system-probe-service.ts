/**
 * Live System Probe Service — Aggregator connecting runtime health telemetry.
 *
 * Collects heap pressure metrics, root volume disk space, and event loop latency,
 * evaluates overall health using pure `evaluateSystemHealthState`, and produces
 * a complete, sanitized `SystemProbeResult` for agent consumption.
 */

import { monitorEventLoopDelay } from "node:perf_hooks";
import { readLiveHeapMetrics } from "../process/heap-pressure-governor.js";
import { tryReadDiskSpace } from "./disk-space.js";
import {
  DEFAULT_PROBE_THRESHOLDS,
  evaluateSystemHealthState,
  type SystemMetricsSnapshot,
  type SystemProbeThresholds,
} from "./system-probe-evaluator.js";
import { sanitizeConfigForProbe } from "./config-sanitizer.js";

let defaultEventLoopMonitor: ReturnType<typeof monitorEventLoopDelay> | undefined;

function getOrCreateEventLoopMonitor(): ReturnType<typeof monitorEventLoopDelay> {
  if (!defaultEventLoopMonitor) {
    defaultEventLoopMonitor = monitorEventLoopDelay({ resolution: 20 });
    defaultEventLoopMonitor.enable();
  }
  return defaultEventLoopMonitor;
}

export type LiveProbeServiceDeps = {
  getHeapMetrics?: () => { usedBytes: number; totalBytes: number; limitBytes: number; utilizationRatio: number };
  getDiskMetrics?: (targetPath: string) => { usedPercent: number; freeBytes: number; totalBytes: number } | null;
  getEventLoopMetrics?: () => { lagMs: number; p95LagMs: number };
  getConfig?: () => unknown;
  thresholds?: SystemProbeThresholds;
  gatewayVersion?: string;
  activeProvider?: string;
  activeModel?: string;
  activeSessions?: number;
};

export type SystemProbeResult =
  | {
      kind: "healthy";
      gatewayVersion: string;
      activeProvider: string;
      activeModel: string;
      activeSessions: number;
      heap: {
        usedBytes: number;
        totalBytes: number;
        limitBytes: number;
        utilizationRatio: number;
      };
      eventLoop: {
        lagMs: number;
        p95LagMs: number;
      };
      disk: {
        usedPercent: number;
        freeBytes: number;
        totalBytes: number;
      };
      config: Record<string, unknown>;
      timestamp: number;
    }
  | {
      kind: "degraded";
      reason: string;
      critical: boolean;
      gatewayVersion: string;
      activeProvider: string;
      activeModel: string;
      activeSessions: number;
      heap: {
        usedBytes: number;
        totalBytes: number;
        limitBytes: number;
        utilizationRatio: number;
      };
      eventLoop: {
        lagMs: number;
        p95LagMs: number;
      };
      disk: {
        usedPercent: number;
        freeBytes: number;
        totalBytes: number;
      };
      config: Record<string, unknown>;
      timestamp: number;
    }
  | {
      kind: "error";
      message: string;
      timestamp: number;
    };

/**
 * Collects live system metrics and evaluates health state.
 */
export async function collectSystemProbeSnapshot(
  deps: LiveProbeServiceDeps = {},
): Promise<SystemProbeResult> {
  try {
    const now = Date.now();

    // 1. Heap metrics from governor or V8
    const heap = deps.getHeapMetrics
      ? deps.getHeapMetrics()
      : (() => {
          try {
            const stats = readLiveHeapMetrics();
            const limitBytes = Math.max(1, stats.heapLimitBytes);
            const usedBytes = Math.max(0, stats.heapUsedBytes);
            const totalBytes = stats.heapTotalBytes ?? limitBytes;
            const utilizationRatio = Math.min(1, usedBytes / limitBytes);
            return {
              usedBytes,
              totalBytes,
              limitBytes,
              utilizationRatio,
            };
          } catch {
            const mem = process.memoryUsage();
            return {
              usedBytes: mem.heapUsed,
              totalBytes: mem.heapTotal,
              limitBytes: mem.heapTotal * 2,
              utilizationRatio: Math.min(1, mem.heapUsed / (mem.heapTotal * 2)),
            };
          }
        })();

    // 2. Disk metrics from root / workspace path
    const disk = deps.getDiskMetrics
      ? (deps.getDiskMetrics("/") ?? { usedPercent: 0, freeBytes: 0, totalBytes: 0 })
      : (() => {
          try {
            const snapshot = tryReadDiskSpace(process.cwd());
            if (!snapshot || snapshot.totalBytes === null || snapshot.totalBytes === 0) {
              return { usedPercent: 0, freeBytes: snapshot?.availableBytes ?? 0, totalBytes: 0 };
            }
            const freeBytes = snapshot.availableBytes;
            const totalBytes = snapshot.totalBytes;
            const usedBytes = Math.max(0, totalBytes - freeBytes);
            const usedPercent = Math.round((usedBytes / totalBytes) * 1000) / 10;
            return { usedPercent, freeBytes, totalBytes };
          } catch {
            return { usedPercent: 0, freeBytes: 0, totalBytes: 0 };
          }
        })();

    // 3. Event loop lag metrics
    const eventLoop = deps.getEventLoopMetrics
      ? deps.getEventLoopMetrics()
      : (() => {
          try {
            const monitor = getOrCreateEventLoopMonitor();
            const meanNs = monitor.mean;
            const p95Ns = monitor.percentile(95);
            return {
              lagMs: Math.round((meanNs / 1_000_000) * 10) / 10,
              p95LagMs: Math.round((p95Ns / 1_000_000) * 10) / 10,
            };
          } catch {
            return { lagMs: 0, p95LagMs: 0 };
          }
        })();

    const gatewayVersion = deps.gatewayVersion ?? process.env.npm_package_version ?? "1.0.0";
    const activeProvider = deps.activeProvider ?? process.env.DEFAULT_LLM_PROVIDER ?? "unknown";
    const activeModel = deps.activeModel ?? process.env.DEFAULT_LLM_MODEL ?? "unknown";
    const activeSessions = deps.activeSessions ?? 1;

    const rawConfig = deps.getConfig ? deps.getConfig() : {};
    const sanitizedConfig = sanitizeConfigForProbe(rawConfig) as Record<string, unknown>;

    const snapshot: SystemMetricsSnapshot = {
      heap,
      eventLoop,
      disk,
      activeSessions,
      gatewayVersion,
      activeProvider,
      activeModel,
    };

    const health = evaluateSystemHealthState(snapshot, deps.thresholds ?? DEFAULT_PROBE_THRESHOLDS);

    if (health.kind === "healthy") {
      return {
        kind: "healthy",
        gatewayVersion,
        activeProvider,
        activeModel,
        activeSessions,
        heap,
        eventLoop,
        disk,
        config: sanitizedConfig,
        timestamp: now,
      };
    }

    return {
      kind: "degraded",
      reason: health.reason,
      critical: health.critical,
      gatewayVersion,
      activeProvider,
      activeModel,
      activeSessions,
      heap,
      eventLoop,
      disk,
      config: sanitizedConfig,
      timestamp: now,
    };
  } catch (error) {
    return {
      kind: "error",
      message: error instanceof Error ? error.message : String(error),
      timestamp: Date.now(),
    };
  }
}
