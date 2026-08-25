/**
 * Pure Keyed FIFO Sequential Queue.
 * Serializes concurrent async actions per coordinate key without global blocking.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic FIFO ordering.
 * - A4: Reversible state mutation (keys deleted immediately upon drain).
 */

export class SequentialKeyedQueue {
  private readonly queues = new Map<string, Promise<unknown>>();
  private activeCount = 0;
  private collisionAvoidedCount = 0;

  /**
   * Runs an async function exclusively behind any prior pending operations for key.
   */
  async runExclusive<T>(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = this.queues.get(key);
    if (existing) {
      this.collisionAvoidedCount++;
    }

    const previous = existing ?? Promise.resolve();
    let release: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });

    const tail = previous.then(
      () => gate,
      () => gate,
    );

    this.queues.set(key, tail);
    this.activeCount++;

    try {
      await previous;
      return await fn();
    } finally {
      release!();
      this.activeCount--;
      if (this.queues.get(key) === tail) {
        this.queues.delete(key);
      }
    }
  }

  get queueCount(): number {
    return this.queues.size;
  }

  get activeDispatches(): number {
    return this.activeCount;
  }

  get collisionsAvoided(): number {
    return this.collisionAvoidedCount;
  }

  clear(): void {
    this.queues.clear();
    this.activeCount = 0;
    this.collisionAvoidedCount = 0;
  }
}
