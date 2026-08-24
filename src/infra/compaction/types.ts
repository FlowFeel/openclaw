/**
 * Adaptive Literate Compaction — Axioms, Types & Predicate Calculus Contracts.
 *
 * @dft
 * - A1 (pure-io-separation): Pure types, constants, and predicate verifiers. Zero I/O.
 * - A2 (determinism): Pure functions without side-effects or ambient clocks.
 * - A4 (dft-docs): Literate definitions aligned with Shannon-Weaver tokenomics.
 * - A6 (check-result): Explicit validation results.
 */

// ── Invariant Rule Constants ──────────────────────────────────────────

/** Rule LC1: Adaptive Auto-Trigger when token or byte budget is exceeded. */
export const RULE_LC1_ADAPTIVE_AUTO_TRIGGER = "LC1:adaptive-auto-trigger" as const;

/** Rule LC2: Living Tail Preservation — keep last N turns verbatim. */
export const RULE_LC2_LIVING_TAIL_PRESERVATION = "LC2:living-tail-preservation" as const;

/** Rule LC3: Epistemic Pre-Tail Weighting — compress pre-tail to ~15% target. */
export const RULE_LC3_EPISTEMIC_PRE_TAIL_WEIGHT = "LC3:epistemic-pre-tail-weight" as const;

/** Rule LC4: First-Class Literate Artifact — structured markdown representation. */
export const RULE_LC4_LITERATE_ARTIFACT = "LC4:literate-artifact" as const;

/** Rule LC5: Dual-Metric Telemetry — tokens & disk MB reduction tracking. */
export const RULE_LC5_DUAL_METRIC_TELEMETRY = "LC5:dual-metric-telemetry" as const;

/** Rule LC6: Environment-Calibrated Context Meter — visual progression bar. */
export const RULE_LC6_CALIBRATED_METER = "LC6:calibrated-meter" as const;

/** Rule LC7: Rollout Changelog Injection — landing release notes on startup. */
export const RULE_LC7_ROLLOUT_CHANGELOG = "LC7:rollout-changelog" as const;

export const LITERATE_COMPACTION_RULES = [
  RULE_LC1_ADAPTIVE_AUTO_TRIGGER,
  RULE_LC2_LIVING_TAIL_PRESERVATION,
  RULE_LC3_EPISTEMIC_PRE_TAIL_WEIGHT,
  RULE_LC4_LITERATE_ARTIFACT,
  RULE_LC5_DUAL_METRIC_TELEMETRY,
  RULE_LC6_CALIBRATED_METER,
  RULE_LC7_ROLLOUT_CHANGELOG,
] as const;

// ── Domain Types & Data Contracts ─────────────────────────────────────

/** Environmental constraints and model context configuration vector. */
export interface EnvironmentContextVector {
  /** Total model context window in tokens (e.g. 32768, 128000, 200000, 1048576). */
  readonly modelContextWindow: number;
  /** Reserved token ceiling for completion and response overhead. */
  readonly reserveTokens: number;
  /** Optional maximum sustainable on-disk session size in bytes (e.g. 10MB SQLite limit). */
  readonly hostDiskLimitBytes?: number;
  /** Optional trigger ratio (default: 0.75 or situation-specified). */
  readonly triggerRatio?: number;
  /** Optional absolute token trigger override (e.g. 200000). */
  readonly absoluteTokenTrigger?: number;
  /** Living tail turn count to preserve verbatim (default: 2). */
  readonly tailTurnCount?: number;
  /** Pre-tail compression target fraction (default: 0.15). */
  readonly preTailCompressionTarget?: number;
}

/** Resolved compaction threshold policy with dual token and MB boundaries. */
export interface ResolvedCompactionThreshold {
  /** Effective token trigger ceiling. */
  readonly tokenTrigger: number;
  /** Effective max session byte limit. */
  readonly byteLimit: number;
  /** Effective model context window. */
  readonly contextWindow: number;
  /** Reserve tokens subtracted from available budget. */
  readonly reserveTokens: number;
  /** Number of living turns preserved verbatim. */
  readonly tailTurnCount: number;
  /** Target fraction for pre-tail summary weight. */
  readonly preTailTargetRatio: number;
  /** Trigger justification reason. */
  readonly reason: string;
}

/** Dual-metric token and on-disk payload savings record. */
export interface DualMetricFootprint {
  readonly tokensBefore: number;
  readonly tokensAfter: number;
  readonly tokenDeltaPercent: number;
  readonly bytesBefore: number;
  readonly bytesAfter: number;
  readonly byteDeltaPercent: number;
  readonly empiricalDensityBytesPerToken: number;
  readonly formattedSummary: string;
}

/** Context meter status bar projection. */
export interface ContextMeterStatus {
  readonly currentTokens: number;
  readonly thresholdTokens: number;
  readonly currentBytes: number;
  readonly thresholdBytes: number;
  readonly fillRatio: number;
  readonly percentage: number;
  readonly tier: "nominal" | "warning" | "critical" | "overflow";
  readonly visualMeter: string;
  readonly formattedLabel: string;
}

/** Partitioned message history. */
export interface EpistemicPartition<TMessage = unknown> {
  /** Older messages destined for literate summarization. */
  readonly preTailMessages: readonly TMessage[];
  /** Most recent turns preserved 100% verbatim. */
  readonly livingTailMessages: readonly TMessage[];
  /** Total turn count represented in the living tail. */
  readonly tailTurnCount: number;
}

/** Structured fields of a Literate Compaction Markdown Document. */
export interface LiterateCompactionData {
  readonly goal: string;
  readonly constraintsAndPreferences: readonly string[];
  readonly progressDone: readonly string[];
  readonly progressInProgress: readonly string[];
  readonly progressBlocked: readonly string[];
  readonly keyDecisions: readonly { decision: string; rationale: string }[];
  readonly warStories: readonly { failure: string; rootCause: string }[];
  readonly criticalContext: readonly string[];
  readonly nextSteps: readonly string[];
}

// ── Pure Predicate Verifiers (Degree 0) ────────────────────────────────

/**
 * Pure predicate verifying if compaction should trigger based on tokens or storage size.
 */
export function shouldTriggerCompaction(
  threshold: ResolvedCompactionThreshold,
  currentTokens: number,
  currentBytes: number = 0,
): boolean {
  if (!Number.isFinite(currentTokens) || currentTokens < 0) {
    return false;
  }
  const tokenTriggered = currentTokens >= threshold.tokenTrigger;
  const byteTriggered = currentBytes > 0 && currentBytes >= threshold.byteLimit;
  return tokenTriggered || byteTriggered;
}

/**
 * Validates that an empirical density value is realistic (1.0 to 100.0 bytes per token).
 */
export function isValidEmpiricalDensity(density: number): boolean {
  return Number.isFinite(density) && density >= 1.0 && density <= 100.0;
}
