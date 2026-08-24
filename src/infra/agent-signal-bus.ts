/**
 * Agent Signal Bus — In-memory non-blocking circular ring buffer for agent operational telemetry.
 *
 * Enables agents to report non-blocking diagnostic notices, knowledge gaps, and warnings without
 * halting turns or performing blocking synchronous disk I/O.
 *
 * @dft
 * - Axiom P2.2 (non-blocking-signals): pure in-memory ring buffer with fixed capacity N=100.
 */

import { randomUUID } from "node:crypto";
import { createCompactExecutionSignature } from "./shannon-weaver/tool-arity-projector.js";

export type AgentSignalLevel = "info" | "warn" | "error";

export type AgentSignal = {
  readonly id: string;
  readonly level: AgentSignalLevel;
  readonly topic: string;
  readonly message: string;
  readonly payload?: unknown;
  readonly sessionId?: string;
  readonly turnIndex?: number;
  readonly timestamp: number;
};

export type EmitSignalInput = {
  readonly level: AgentSignalLevel;
  readonly topic: string;
  readonly message: string;
  readonly payload?: unknown;
  readonly sessionId?: string;
  readonly turnIndex?: number;
  readonly timestamp?: number;
};

export class AgentSignalBus {
  private readonly capacity: number;
  private readonly buffer: AgentSignal[];
  private cursor: number = 0;
  private totalEmitted: number = 0;

  constructor(capacity: number = 100) {
    this.capacity = Math.max(1, capacity);
    this.buffer = [];
  }

  /**
   * Emits a signal into the circular ring buffer. Never throws.
   */
  emit(input: EmitSignalInput): AgentSignal {
    const signal: AgentSignal = {
      id: randomUUID(),
      level: input.level,
      topic: input.topic,
      message: input.message,
      payload: input.payload,
      sessionId: input.sessionId,
      turnIndex: input.turnIndex,
      timestamp: input.timestamp ?? Date.now(),
    };

    if (this.buffer.length < this.capacity) {
      this.buffer.push(signal);
    } else {
      this.buffer[this.cursor] = signal;
      this.cursor = (this.cursor + 1) % this.capacity;
    }

    this.totalEmitted++;
    return signal;
  }

  /**
   * Emits a compact tool execution signature to the signal bus without schema bloat.
   */
  emitToolExecution(
    toolName: string,
    args: Record<string, unknown>,
    policyHash: string,
    context: { sessionId?: string; turnIndex?: number; timestamp?: number } = {},
  ): AgentSignal {
    const compactSig = createCompactExecutionSignature(
      toolName,
      args,
      policyHash,
      context.timestamp ?? Date.now(),
    );
    return this.emit({
      level: "info",
      topic: "tool.execution",
      message: `Tool ${toolName} (arity ${compactSig.arity}) executed`,
      payload: compactSig,
      sessionId: context.sessionId,
      turnIndex: context.turnIndex,
      timestamp: compactSig.timestamp,
    });
  }

  /**
   * Retrieves recorded signals, newest first.
   */
  getSignals(options: { topic?: string; level?: AgentSignalLevel; limit?: number } = {}): AgentSignal[] {
    let list: AgentSignal[] = [];
    const len = this.buffer.length;
    if (len > 0) {
      const start = len < this.capacity ? len - 1 : (this.cursor - 1 + this.capacity) % this.capacity;
      for (let i = 0; i < len; i++) {
        const idx = (start - i + this.capacity) % this.capacity;
        list.push(this.buffer[idx]);
      }
    }

    if (options.topic) {
      list = list.filter((s) => s.topic === options.topic);
    }
    if (options.level) {
      list = list.filter((s) => s.level === options.level);
    }
    if (options.limit && options.limit > 0) {
      list = list.slice(0, options.limit);
    }

    return list;
  }

  /**
   * Returns telemetry stats.
   */
  getStats(): { count: number; totalEmitted: number; capacity: number } {
    return {
      count: this.buffer.length,
      totalEmitted: this.totalEmitted,
      capacity: this.capacity,
    };
  }

  /**
   * Clears the ring buffer.
   */
  clear(): void {
    this.buffer.length = 0;
    this.cursor = 0;
    this.totalEmitted = 0;
  }
}

export const defaultAgentSignalBus = new AgentSignalBus(100);
