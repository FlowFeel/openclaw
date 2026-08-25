/**
 * Telegram Session Guard.
 * Coordinates per-session FIFO turn serialization and transparent admission retry.
 *
 * @dft
 * - A1 / A2: Pure in-memory orchestration, deterministic execution order.
 * - A6: Check-Result telemetry format.
 */

import {
  SequentialKeyedQueue,
  evaluateAdmissionRetry,
  ConcurrencyTelemetryTracker,
  type QueueExecutionResult,
} from "../../../src/infra/concurrency/index.js";

export interface TelegramSessionGuardOptions {
  readonly maxRetries?: number;
  readonly initialBackoffMs?: number;
}

export class TelegramSessionGuard {
  private readonly queue: SequentialKeyedQueue;
  private readonly telemetry: ConcurrencyTelemetryTracker;
  private readonly options: TelegramSessionGuardOptions;

  constructor(options: TelegramSessionGuardOptions = {}) {
    this.queue = new SequentialKeyedQueue();
    this.telemetry = new ConcurrencyTelemetryTracker();
    this.options = options;
  }

  async executeGuardedTurn<T>(params: {
    sessionKey: string;
    executeTurn: () => Promise<T>;
    onRetry?: (attempt: number, error: unknown, backoffMs: number) => void;
  }): Promise<QueueExecutionResult<T>> {
    const queueStartTime = Date.now();
    const isQueued = this.queue.queueCount > 0;

    return await this.queue.runExclusive(params.sessionKey, async () => {
      const execStartTime = Date.now();
      const queuedDurationMs = execStartTime - queueStartTime;
      let attempt = 0;

      while (true) {
        try {
          const value = await params.executeTurn();
          const executionDurationMs = Date.now() - execStartTime;

          return this.telemetry.recordExecution({
            value,
            status: attempt > 0 ? "retried" : "executed",
            queuedDurationMs,
            executionDurationMs,
            attempts: attempt + 1,
            collisionAvoided: isQueued,
          });
        } catch (error) {
          const decision = evaluateAdmissionRetry(error, attempt, this.options);
          if (!decision.shouldRetry) {
            throw error;
          }

          params.onRetry?.(decision.attempt, error, decision.backoffMs);
          if (decision.backoffMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, decision.backoffMs));
          }
          attempt = decision.attempt;
        }
      }
    });
  }

  getMetrics() {
    return this.telemetry.getMetrics(this.queue.queueCount);
  }

  get queueMetrics() {
    return {
      activeQueues: this.queue.queueCount,
      activeDispatches: this.queue.activeDispatches,
      collisionsAvoided: this.queue.collisionsAvoided,
    };
  }
}

export const globalTelegramSessionGuard = new TelegramSessionGuard();
