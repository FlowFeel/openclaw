/**
 * Lock-free in-memory bounded ring buffer flight recorder for tool executions.
 * Implements the queryable `tool_log` affordance without re-running subshells or grepping logfiles.
 */

export interface ToolLogEntry {
  readonly id: string;
  readonly timestamp: number;
  readonly tool: string;
  readonly command?: string;
  readonly exitCode?: number;
  readonly output: string;
  readonly durationMs: number;
  readonly sessionId: string;
}

export interface ToolLogQuery {
  readonly pattern?: string;
  readonly tool?: string;
  readonly sessionId?: string;
  readonly limit?: number;
  readonly failuresOnly?: boolean;
}

export class BoundedToolFlightRecorder {
  private readonly capacity: number;
  private readonly buffer: ToolLogEntry[] = [];

  constructor(capacity = 50) {
    this.capacity = Math.max(10, capacity);
  }

  public record(entry: ToolLogEntry): void {
    if (this.buffer.length >= this.capacity) {
      this.buffer.shift(); // Evict oldest entry (O(1) amortized for small fixed bounded ring)
    }
    this.buffer.push(Object.freeze({ ...entry }));
  }

  public query(query: ToolLogQuery = {}): readonly ToolLogEntry[] {
    const limit = query.limit ?? 10;
    const regex = query.pattern ? new RegExp(query.pattern, "i") : null;

    const filtered = this.buffer.filter((entry) => {
      if (query.sessionId && entry.sessionId !== query.sessionId) return false;
      if (query.tool && entry.tool !== query.tool) return false;
      if (query.failuresOnly && (entry.exitCode === 0 || entry.exitCode === undefined)) return false;
      if (regex) {
        const matchesOut = regex.test(entry.output);
        const matchesCmd = entry.command ? regex.test(entry.command) : false;
        if (!matchesOut && !matchesCmd) return false;
      }
      return true;
    });

    // Return newest entries first up to limit
    return filtered.slice(-limit).reverse();
  }

  public size(): number {
    return this.buffer.length;
  }

  public clear(): void {
    this.buffer.length = 0;
  }
}
