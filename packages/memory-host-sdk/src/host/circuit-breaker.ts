/**
 * Pure In-Memory Tri-State Circuit Breaker for Embedding Providers.
 * Goldilocks decomposition unit (< 110 LOC).
 * 
 * @dft:axiom A2 (Bounded State Machines)
 */

import { EmbeddingProviderUnreachableError } from "./embedding-error-classifier.js";

export type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

export type CircuitBreakerOptions = {
  failureThreshold?: number;
  cooldownPeriodMs?: number;
  name?: string;
};

export class EmbeddingCircuitBreaker {
  private state: CircuitBreakerState = "CLOSED";
  private failureCount = 0;
  private lastFailureTimestamp = 0;
  private readonly failureThreshold: number;
  private readonly cooldownPeriodMs: number;
  public readonly name: string;

  constructor(options?: CircuitBreakerOptions) {
    this.failureThreshold = options?.failureThreshold ?? 3;
    this.cooldownPeriodMs = options?.cooldownPeriodMs ?? 15 * 60 * 1000; // 15 minutes
    this.name = options?.name ?? "default-embedding-breaker";
  }

  public getState(): CircuitBreakerState {
    if (this.state === "OPEN") {
      const now = Date.now();
      if (now - this.lastFailureTimestamp >= this.cooldownPeriodMs) {
        this.state = "HALF_OPEN";
      }
    }
    return this.state;
  }

  public canExecute(): boolean {
    return this.getState() !== "OPEN";
  }

  public recordSuccess(): void {
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  public recordFailure(isTerminal = false): void {
    this.lastFailureTimestamp = Date.now();
    this.failureCount++;

    if (isTerminal || this.failureCount >= this.failureThreshold) {
      this.state = "OPEN";
    }
  }

  public reset(): void {
    this.state = "CLOSED";
    this.failureCount = 0;
    this.lastFailureTimestamp = 0;
  }

  public getFailureCount(): number {
    return this.failureCount;
  }

  public async executeGuarded<T>(operation: () => Promise<T>): Promise<T> {
    if (!this.canExecute()) {
      throw new EmbeddingProviderUnreachableError(
        `Circuit breaker [${this.name}] is OPEN (cooldown active until ${new Date(this.lastFailureTimestamp + this.cooldownPeriodMs).toISOString()})`,
        "CIRCUIT_OPEN",
      );
    }

    try {
      const result = await operation();
      this.recordSuccess();
      return result;
    } catch (error) {
      const isTerminal = (error as { isTerminal?: boolean })?.isTerminal ?? false;
      this.recordFailure(isTerminal);
      throw error;
    }
  }
}
