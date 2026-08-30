/**
 * Pure sliding-window entropy and novelty velocity sensor.
 * Detects stalled exploratory loops (consecutive errors, duplicate outputs, or zero-novelty reads).
 */

export type NoveltyVelocityGrade = "high" | "moderate" | "declining" | "stalled";

export interface ToolExecutionSample {
  readonly tool: string;
  readonly target?: string;
  readonly isError: boolean;
  readonly outputSignature: string; // Hash or normalized short snippet
}

export interface EntropyVelocityState {
  readonly maxSamples: number;
  readonly samples: readonly ToolExecutionSample[];
  readonly velocityGrade: NoveltyVelocityGrade;
}

export function createInitialEntropySensor(windowSize = 5): EntropyVelocityState {
  return Object.freeze({
    maxSamples: Math.max(3, windowSize),
    samples: [],
    velocityGrade: "high",
  });
}

/**
 * Computes deterministic novelty velocity grade based on the sliding window history.
 */
export function calculateNoveltyGrade(
  samples: readonly ToolExecutionSample[],
): NoveltyVelocityGrade {
  if (samples.length < 2) return "high";

  // Check for consecutive failures (3+ consecutive errors = stalled)
  const recentErrors = samples.slice(-3).filter((s) => s.isError).length;
  if (samples.length >= 3 && recentErrors === 3) {
    return "stalled";
  }

  // Check for duplicate consecutive operations
  const last = samples[samples.length - 1];
  const secondLast = samples[samples.length - 2];
  if (last.tool === secondLast.tool && last.target && last.target === secondLast.target) {
    return "declining";
  }

  // Check for output signature repetition in the window
  const uniqueSignatures = new Set(samples.map((s) => s.outputSignature));
  if (samples.length >= 4 && uniqueSignatures.size <= 2) {
    return "stalled";
  }

  if (samples.length >= 4 && uniqueSignatures.size <= 3) {
    return "declining";
  }

  return "high";
}

/**
 * Purely appends a sample to the bounded sliding window and updates the velocity grade.
 */
export function recordToolSample(
  state: EntropyVelocityState,
  sample: ToolExecutionSample,
): EntropyVelocityState {
  const updatedSamples = [...state.samples, Object.freeze(sample)].slice(-state.maxSamples);
  const nextGrade = calculateNoveltyGrade(updatedSamples);

  return Object.freeze({
    maxSamples: state.maxSamples,
    samples: updatedSamples,
    velocityGrade: nextGrade,
  });
}
