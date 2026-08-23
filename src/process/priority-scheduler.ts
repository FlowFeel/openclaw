// Pure priority scheduler and starvation aging for command lanes.
import type { CommandQueueEnqueueOptions } from "./command-queue.types.js";
import type { QueueEntry } from "./command-queue.state.js";

/**
 * Base priority ranks:
 * 3: Steering (Administrative control, emergency interventions, operator aborts)
 * 2: Foreground (Interactive user turns, e.g. real-time Telegram chat)
 * 1: Normal (Standard default workflow tasks)
 * 0: Background (Cron, maintenance, dream diary, compaction)
 */
export const MAX_PRIORITY_RANK = 3;
export const MIN_PRIORITY_RANK = 0;
export const DEFAULT_PRIORITY_RANK = 1;
export const DEFAULT_STARVATION_CEILING_MS = 15_000;

export function resolveBasePriorityRank(
  priority?: CommandQueueEnqueueOptions["priority"] | number,
): number {
  if (typeof priority === "number") {
    if (!Number.isFinite(priority)) {
      return DEFAULT_PRIORITY_RANK;
    }
    return Math.min(MAX_PRIORITY_RANK, Math.max(MIN_PRIORITY_RANK, Math.floor(priority)));
  }

  switch (priority) {
    case "steering":
      return 3;
    case "foreground":
      return 2;
    case "background":
      return 0;
    case "normal":
    default:
      return 1;
  }
}

/**
 * Computes effective priority taking dynamic starvation promotion into account.
 * For every `starvationCeilingMs` spent waiting in the queue, effective priority
 * increases by 1 until it hits `MAX_PRIORITY_RANK`.
 */
export function calculateEffectivePriority(
  entry: Pick<QueueEntry, "priority" | "enqueuedAt" | "starvationCeilingMs">,
  currentTimeMs: number,
  defaultCeilingMs: number = DEFAULT_STARVATION_CEILING_MS,
): number {
  const basePriority =
    typeof entry.priority === "number" && Number.isFinite(entry.priority)
      ? Math.min(MAX_PRIORITY_RANK, Math.max(MIN_PRIORITY_RANK, Math.floor(entry.priority)))
      : DEFAULT_PRIORITY_RANK;

  const ceilingMs = entry.starvationCeilingMs ?? defaultCeilingMs;
  if (!Number.isFinite(ceilingMs) || ceilingMs <= 0) {
    return basePriority;
  }

  const waitMs = Math.max(0, currentTimeMs - entry.enqueuedAt);
  const promotions = Math.floor(waitMs / ceilingMs);
  return Math.min(MAX_PRIORITY_RANK, basePriority + promotions);
}

/**
 * Pure comparator for queue entries.
 * Returns negative if `a` should execute before `b`, positive if `b` before `a`, or 0 if equal.
 */
export function compareQueueEntries(
  a: QueueEntry,
  b: QueueEntry,
  currentTimeMs: number,
  defaultCeilingMs: number = DEFAULT_STARVATION_CEILING_MS,
): number {
  const effA = calculateEffectivePriority(a, currentTimeMs, defaultCeilingMs);
  const effB = calculateEffectivePriority(b, currentTimeMs, defaultCeilingMs);

  if (effA !== effB) {
    // Higher effective priority comes first (e.g. 3 before 2)
    return effB - effA;
  }

  // FIFO within same effective priority: lower sequence number comes first
  if (a.sequence !== b.sequence) {
    return a.sequence - b.sequence;
  }

  return a.enqueuedAt - b.enqueuedAt;
}

/**
 * Extracts and removes the best queue entry according to dynamic effective priority at `currentTimeMs`.
 */
export function pickNextQueueEntry(
  queue: QueueEntry[],
  currentTimeMs: number,
  defaultCeilingMs: number = DEFAULT_STARVATION_CEILING_MS,
): QueueEntry | undefined {
  if (queue.length === 0) {
    return undefined;
  }
  if (queue.length === 1) {
    return queue.shift();
  }

  let bestIndex = 0;
  for (let i = 1; i < queue.length; i++) {
    if (compareQueueEntries(queue[i]!, queue[bestIndex]!, currentTimeMs, defaultCeilingMs) < 0) {
      bestIndex = i;
    }
  }

  return queue.splice(bestIndex, 1)[0];
}

/**
 * In-place sorts a queue array by effective priority at `currentTimeMs`.
 */
export function sortQueueByEffectivePriority(
  queue: QueueEntry[],
  currentTimeMs: number,
  defaultCeilingMs: number = DEFAULT_STARVATION_CEILING_MS,
): void {
  queue.sort((a, b) => compareQueueEntries(a, b, currentTimeMs, defaultCeilingMs));
}
