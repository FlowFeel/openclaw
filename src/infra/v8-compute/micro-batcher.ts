/**
 * Pure Decision Core: Topology-Aware Micro-Batch Accumulator.
 * 
 * Axiom:
 * Buffers analytical task envelopes across a dynamic window (1-5ms)
 * to amortize isolate boundary crossing overhead and keep V8 JIT monomorphic.
 */

import { type TransferableEnvelope } from "./types.js";

export interface QueuedTask {
  readonly envelope: TransferableEnvelope;
  readonly resolve: (result: TransferableEnvelope) => void;
  readonly reject: (error: Error) => void;
  readonly queuedAtMs: number;
}

export type BatchFlushCallback = (batch: readonly QueuedTask[]) => void;

export class MicroBatcher {
  private queue: QueuedTask[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private isDisposed = false;

  constructor(
    public readonly batchWindowMs: number,
    private readonly onFlush: BatchFlushCallback,
    public readonly maxBatchSize: number = 64,
  ) {}

  public submit(
    envelope: TransferableEnvelope,
    resolve: (result: TransferableEnvelope) => void,
    reject: (error: Error) => void,
    nowMs: number = Date.now(),
  ): void {
    if (this.isDisposed) {
      reject(new Error("MicroBatcher has been disposed"));
      return;
    }

    this.queue.push({
      envelope,
      resolve,
      reject,
      queuedAtMs: nowMs,
    });

    if (this.queue.length >= this.maxBatchSize) {
      this.flush();
      return;
    }

    if (this.timer === null) {
      this.timer = setTimeout(() => {
        this.timer = null;
        this.flush();
      }, this.batchWindowMs);
    }
  }

  public flush(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.queue.length === 0) {
      return;
    }

    const batch = this.queue;
    this.queue = [];
    this.onFlush(batch);
  }

  public get pendingCount(): number {
    return this.queue.length;
  }

  public dispose(drainError?: Error): void {
    this.isDisposed = true;
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (drainError && this.queue.length > 0) {
      for (const item of this.queue) {
        item.reject(drainError);
      }
    }
    this.queue = [];
  }
}
