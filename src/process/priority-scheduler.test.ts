import { describe, expect, it } from "vitest";
import type { QueueEntry } from "./command-queue.state.js";
import {
  calculateEffectivePriority,
  compareQueueEntries,
  DEFAULT_STARVATION_CEILING_MS,
  MAX_PRIORITY_RANK,
  pickNextQueueEntry,
  resolveBasePriorityRank,
  sortQueueByEffectivePriority,
} from "./priority-scheduler.js";

function createMockEntry(overrides: Partial<QueueEntry> = {}): QueueEntry {
  return {
    task: async () => {},
    resolve: () => {},
    reject: () => {},
    enqueuedAt: 1000,
    sequence: 1,
    priority: 1,
    warnAfterMs: 2000,
    queuedAheadAtEnqueue: 0,
    activeAheadAtEnqueue: 0,
    ...overrides,
  };
}

describe("priority-scheduler", () => {
  describe("resolveBasePriorityRank", () => {
    it("maps named priority tiers to appropriate ranks", () => {
      expect(resolveBasePriorityRank("steering")).toBe(3);
      expect(resolveBasePriorityRank("foreground")).toBe(2);
      expect(resolveBasePriorityRank("normal")).toBe(1);
      expect(resolveBasePriorityRank("background")).toBe(0);
      expect(resolveBasePriorityRank(undefined)).toBe(1);
    });

    it("clamps and floors numeric priorities into [0, 3]", () => {
      expect(resolveBasePriorityRank(3)).toBe(3);
      expect(resolveBasePriorityRank(2.9)).toBe(2);
      expect(resolveBasePriorityRank(5)).toBe(3);
      expect(resolveBasePriorityRank(-2)).toBe(0);
      expect(resolveBasePriorityRank(NaN)).toBe(1);
    });
  });

  describe("calculateEffectivePriority", () => {
    it("returns base priority when wait time is 0", () => {
      const entry = createMockEntry({ priority: 0, enqueuedAt: 1000 });
      expect(calculateEffectivePriority(entry, 1000)).toBe(0);
    });

    it("promotes priority after exceeding starvationCeilingMs", () => {
      const entry = createMockEntry({ priority: 0, enqueuedAt: 1000 });
      // 14.9s wait -> 0 promotions
      expect(calculateEffectivePriority(entry, 1000 + 14_999)).toBe(0);
      // 15s wait -> +1 promotion -> rank 1
      expect(calculateEffectivePriority(entry, 1000 + 15_000)).toBe(1);
      // 30s wait -> +2 promotions -> rank 2
      expect(calculateEffectivePriority(entry, 1000 + 30_000)).toBe(2);
      // 45s wait -> +3 promotions -> rank 3 (max)
      expect(calculateEffectivePriority(entry, 1000 + 45_000)).toBe(3);
      // 100s wait -> clamped at MAX_PRIORITY_RANK (3)
      expect(calculateEffectivePriority(entry, 1000 + 100_000)).toBe(MAX_PRIORITY_RANK);
    });

    it("honors custom per-entry starvationCeilingMs", () => {
      const entry = createMockEntry({
        priority: 1,
        enqueuedAt: 1000,
        starvationCeilingMs: 5000,
      });
      // 5s wait -> +1 promotion -> rank 2
      expect(calculateEffectivePriority(entry, 1000 + 5000)).toBe(2);
      // 10s wait -> +2 promotions -> rank 3 (max)
      expect(calculateEffectivePriority(entry, 1000 + 10_000)).toBe(3);
    });
  });

  describe("compareQueueEntries", () => {
    it("orders higher base priority before lower base priority at t=0", () => {
      const now = 1000;
      const steering = createMockEntry({ priority: 3, sequence: 1, enqueuedAt: now });
      const foreground = createMockEntry({ priority: 2, sequence: 2, enqueuedAt: now });
      const normal = createMockEntry({ priority: 1, sequence: 3, enqueuedAt: now });
      const background = createMockEntry({ priority: 0, sequence: 4, enqueuedAt: now });

      expect(compareQueueEntries(steering, foreground, now)).toBeLessThan(0);
      expect(compareQueueEntries(foreground, normal, now)).toBeLessThan(0);
      expect(compareQueueEntries(normal, background, now)).toBeLessThan(0);
      expect(compareQueueEntries(background, normal, now)).toBeGreaterThan(0);
    });

    it("preserves strict FIFO for identical effective priority", () => {
      const now = 1000;
      const first = createMockEntry({ priority: 2, sequence: 10, enqueuedAt: now });
      const second = createMockEntry({ priority: 2, sequence: 11, enqueuedAt: now });

      expect(compareQueueEntries(first, second, now)).toBeLessThan(0);
      expect(compareQueueEntries(second, first, now)).toBeGreaterThan(0);
    });

    it("promotes starved background task over newly enqueued normal task", () => {
      const now = 20_000;
      // Background task enqueued at t=0 (waited 20s >= 15s ceiling -> promoted to rank 1)
      const starvedBackground = createMockEntry({
        priority: 0,
        sequence: 1,
        enqueuedAt: 0,
      });
      // Fresh normal task enqueued at t=19_000 (waited 1s -> effective rank 1, but higher sequence)
      const freshNormal = createMockEntry({
        priority: 1,
        sequence: 2,
        enqueuedAt: 19_000,
      });

      // Both are effective rank 1, but starvedBackground has lower sequence -> executes first!
      expect(compareQueueEntries(starvedBackground, freshNormal, now)).toBeLessThan(0);
    });
  });

  describe("pickNextQueueEntry", () => {
    it("removes and returns the highest effective priority entry", () => {
      const now = 1000;
      const bg = createMockEntry({ priority: 0, sequence: 1, enqueuedAt: now });
      const fg = createMockEntry({ priority: 2, sequence: 2, enqueuedAt: now });
      const norm = createMockEntry({ priority: 1, sequence: 3, enqueuedAt: now });

      const queue = [bg, fg, norm];
      const picked = pickNextQueueEntry(queue, now);

      expect(picked).toBe(fg);
      expect(queue).toEqual([bg, norm]);
    });

    it("returns undefined for empty queue", () => {
      expect(pickNextQueueEntry([], 1000)).toBeUndefined();
    });
  });

  describe("sortQueueByEffectivePriority", () => {
    it("sorts array in place according to dynamic effective priority", () => {
      const now = 35_000;
      // bg1 waited 35s -> 0 + 2 = rank 2 (sequence 1)
      const bg1 = createMockEntry({ priority: 0, sequence: 1, enqueuedAt: 0 });
      // freshFg enqueued at 30s -> rank 2 (sequence 2)
      const freshFg = createMockEntry({ priority: 2, sequence: 2, enqueuedAt: 30_000 });
      // freshNorm enqueued at 34s -> rank 1 (sequence 3)
      const freshNorm = createMockEntry({ priority: 1, sequence: 3, enqueuedAt: 34_000 });

      const queue = [freshNorm, freshFg, bg1];
      sortQueueByEffectivePriority(queue, now);

      // Expected order: bg1 (rank 2, seq 1), freshFg (rank 2, seq 2), freshNorm (rank 1, seq 3)
      expect(queue).toEqual([bg1, freshFg, freshNorm]);
    });
  });
});
