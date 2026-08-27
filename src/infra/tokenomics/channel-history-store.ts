/**
 * @dft:axiom A2
 * Pure Channel History Store (Append-Only Journal)
 */

import {
  type ChannelHistoryEntry,
  type TokenomicsClock,
} from "./types.js";

export class ChannelHistoryStore {
  private entries: ChannelHistoryEntry[];
  private clock: TokenomicsClock;
  private maxEntries: number;

  constructor(
    initialEntries: ChannelHistoryEntry[] = [],
    clock: TokenomicsClock = { now: () => Date.now() },
    maxEntries: number = 100
  ) {
    this.entries = [...initialEntries];
    this.clock = clock;
    this.maxEntries = maxEntries;
  }

  public record(
    event: Omit<ChannelHistoryEntry, "timestamp"> & { timestamp?: number }
  ): ChannelHistoryEntry {
    const entry: ChannelHistoryEntry = {
      ...event,
      timestamp: event.timestamp ?? this.clock.now(),
    };

    this.entries.push(Object.freeze(entry));

    if (this.entries.length > this.maxEntries) {
      this.entries.shift();
    }

    return entry;
  }

  public getHistory(): readonly ChannelHistoryEntry[] {
    return [...this.entries];
  }

  public renderMarkdown(): string {
    if (this.entries.length === 0) {
      return "_No compaction or bandwidth events recorded._";
    }

    const lines: string[] = [
      "| Event | Before | After | SNR | Yield | Note |",
      "| :--- | :--- | :--- | :--- | :--- | :--- |",
    ];

    for (const e of this.entries) {
      const snr = `${e.snrBefore}% → ${e.snrAfter}%`;
      const yieldStr = `${e.yieldPercent}%`;
      const note = e.note ?? "-";
      lines.push(
        `| ${e.event} | ${e.tokensBefore} | ${e.tokensAfter} | ${snr} | ${yieldStr} | ${note} |`
      );
    }

    return lines.join("\n");
  }
}
