/**
 * Execution Boundary: Elastic V8 Worker Pool Manager.
 * 
 * Axiom:
 * Manages persistent worker isolates according to the active TopologyProfile.
 * Hands over detached ArrayBuffers over postMessage(..., [buffer]),
 * buffers tasks via MicroBatcher, and seamlessly recovers from isolate crashes.
 */

import os from "node:os";
import { Worker } from "node:worker_threads";
import { MicroBatcher, type QueuedTask } from "./micro-batcher.js";
import { resolveTopologyProfile } from "./pool-sizing.js";
import { packEnvelope, unpackEnvelope } from "./transfer-envelope.js";
import {
  type TopologyProfile,
  type TransferableEnvelope,
  V8ComputeOpCode,
} from "./types.js";

export interface WorkerSlot {
  readonly id: number;
  worker: Worker;
  activeTasks: number;
  isDead: boolean;
}

export class V8ComputePool {
  public readonly profile: TopologyProfile;
  private readonly workerSlots: WorkerSlot[] = [];
  private readonly pendingPromises = new Map<number, {
    resolve: (res: TransferableEnvelope) => void;
    reject: (err: Error) => void;
  }>();
  private readonly microBatcher: MicroBatcher;
  private nextHandleId = 1;
  private isDisposed = false;

  constructor(
    options?: {
      cpus?: number;
      availableMemoryMb?: number;
      workerScriptPath?: string;
      customProfile?: TopologyProfile;
    },
  ) {
    const cpus = options?.cpus ?? os.cpus().length;
    const memoryMb = options?.availableMemoryMb ?? Math.floor(os.totalmem() / (1024 * 1024));

    this.profile = options?.customProfile ?? resolveTopologyProfile(cpus, memoryMb);

    const scriptPath = options?.workerScriptPath ?? new URL("./compute-worker.ts", import.meta.url).pathname;

    // Initialize persistent worker isolates
    for (let i = 0; i < this.profile.workerCount; i++) {
      const slot = this.spawnWorkerSlot(i, scriptPath);
      this.workerSlots.push(slot);
    }

    // Initialize micro-batcher
    this.microBatcher = new MicroBatcher(
      this.profile.batchWindowMs,
      (batch) => this.flushBatch(batch),
    );
  }

  private spawnWorkerSlot(id: number, scriptPath: string): WorkerSlot {
    const isTs = scriptPath.endsWith(".ts");
    const worker = new Worker(scriptPath, {
      resourceLimits: {
        maxOldGenerationSizeMb: this.profile.maxIsolateMemoryMb,
      },
      execArgv: isTs ? ["--import", "tsx"] : undefined,
    });

    const slot: WorkerSlot = {
      id,
      worker,
      activeTasks: 0,
      isDead: false,
    };

    worker.on("message", (rawBuffer: ArrayBuffer) => {
      slot.activeTasks = Math.max(0, slot.activeTasks - 1);
      try {
        const envelope = unpackEnvelope(rawBuffer);
        const pending = this.pendingPromises.get(envelope.handleId);
        if (pending) {
          this.pendingPromises.delete(envelope.handleId);
          pending.resolve(envelope);
        }
      } catch (err: unknown) {
        // Unpack error
      }
    });

    worker.on("error", (err: Error) => {
      this.handleWorkerDeath(slot, err, scriptPath);
    });

    worker.on("exit", (code: number) => {
      if (!this.isDisposed && !slot.isDead) {
        this.handleWorkerDeath(slot, new Error(`Worker exited with code ${code}`), scriptPath);
      }
    });

    return slot;
  }

  private handleWorkerDeath(slot: WorkerSlot, error: Error, scriptPath: string): void {
    if (slot.isDead) return;
    slot.isDead = true;

    // Reject all pending tasks that might have been tied to this worker
    for (const [handleId, pending] of this.pendingPromises.entries()) {
      this.pendingPromises.delete(handleId);
      pending.reject(new Error(`Worker isolate terminated: ${error.message}`));
    }

    // Transparently recreate isolate if pool not disposed
    if (!this.isDisposed) {
      try {
        const newSlot = this.spawnWorkerSlot(slot.id, scriptPath);
        this.workerSlots[slot.id] = newSlot;
      } catch (err) {
        // Respawn failure
      }
    }
  }

  private getLeastLoadedSlot(): WorkerSlot | null {
    let chosen: WorkerSlot | null = null;
    let minActive = Infinity;

    for (const slot of this.workerSlots) {
      if (!slot.isDead && slot.activeTasks < minActive) {
        minActive = slot.activeTasks;
        chosen = slot;
      }
    }

    return chosen;
  }

  private flushBatch(batch: readonly QueuedTask[]): void {
    if (this.isDisposed || batch.length === 0) return;

    for (const task of batch) {
      const slot = this.getLeastLoadedSlot();
      if (!slot) {
        task.reject(new Error("No active worker isolate available in pool"));
        continue;
      }

      slot.activeTasks++;
      this.pendingPromises.set(task.envelope.handleId, {
        resolve: task.resolve,
        reject: task.reject,
      });

      const packed = packEnvelope(
        task.envelope.op,
        task.envelope.handleId,
        task.envelope.payload,
      );

      // Ownership handover (Lane A Zero-Copy)
      slot.worker.postMessage(packed, [packed]);
    }
  }

  /**
   * Dispatches an analytical computation request to the elastic worker pool.
   */
  public execute(
    op: V8ComputeOpCode,
    payload: Uint8Array,
  ): Promise<TransferableEnvelope> {
    if (this.isDisposed) {
      return Promise.reject(new Error("V8ComputePool has been disposed"));
    }

    const handleId = this.nextHandleId++;
    const envelope: TransferableEnvelope = {
      op,
      handleId,
      payload,
    };

    return new Promise<TransferableEnvelope>((resolve, reject) => {
      this.microBatcher.submit(envelope, resolve, reject);
    });
  }

  public async dispose(): Promise<void> {
    this.isDisposed = true;
    this.microBatcher.dispose(new Error("V8ComputePool disposed"));

    for (const pending of this.pendingPromises.values()) {
      pending.reject(new Error("V8ComputePool disposed"));
    }
    this.pendingPromises.clear();

    await Promise.all(
      this.workerSlots.map((slot) => {
        slot.isDead = true;
        return slot.worker.terminate();
      }),
    );
  }
}
