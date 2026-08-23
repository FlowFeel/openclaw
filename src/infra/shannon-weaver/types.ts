/**
 * Shannon-Weaver Abstract Arity & Data-Map Types.
 *
 * Implements pure Hickey-style configuration maps and immutable data contracts
 * with total parameterization across all system arities.
 *
 * @dft
 * - Pure data structures (A1 / A2): 100% serializable plain records.
 */

/**
 * Fully Parameterized Configuration Map for Shannon-Weaver Operations.
 */
export type ShannonWeaverParameters = {
  readonly workspaceRoot: string;

  /** Open, dynamic mapping of abstract document roles to arbitrary file paths */
  readonly roleMapping?: Readonly<Record<string, string>>;

  /** Dynamic section budgets for AST sandwich navigation (k_entry, k_exit) */
  readonly sandwichBudgets?: {
    readonly entryBudget: number;        // Dynamic k_entry (default: 40)
    readonly exitBudget: number;         // Dynamic k_exit (default: 40)
    readonly minSplitThreshold?: number; // Minimum document size to warrant splitting (default: 2 * budget)
  };

  /** Dynamic Bayesian staleness epoch thresholds (in days) */
  readonly stalenessThresholds?: {
    readonly freshThresholdDays: number; // Default: 7
    readonly agingThresholdDays: number; // Default: 30
  };

  /** Dynamic Epistemic Basis Codebook */
  readonly basisCodebook?: Readonly<Record<string, string>>;
};

/**
 * Extracted Frontmatter Block.
 */
export type ExtractedFrontmatter = {
  readonly frontmatter: Readonly<Record<string, unknown>>;
  readonly frontmatterRaw: string;
  readonly body: string;
  readonly hasFrontmatter: boolean;
};

/**
 * Deterministically Partitioned Document Zones.
 */
export type ParameterizedDocumentZones = {
  readonly frontmatter: Readonly<Record<string, unknown>>;
  readonly entryText: string;
  readonly bodyText: string;
  readonly exitText: string;
  readonly totalLines: number;
  readonly entryLines: number;
  readonly exitLines: number;
  readonly entryBudget: number;
  readonly exitBudget: number;
  readonly isAligned: boolean;
};

/**
 * Isolated Code Fence Token.
 */
export type CodeFenceBlock = {
  readonly language: string;
  readonly code: string;
  readonly lineCount: number;
};

/**
 * Bayesian Staleness Classification Result.
 */
export type StalenessClassification = "fresh" | "aging" | "stale";

export type StalenessSignalResult = {
  readonly classification: StalenessClassification;
  readonly ageDays: number;
  readonly confidence: "high" | "moderate" | "seed_only";
  readonly actionableAdvice: string;
  readonly freshThresholdDays: number;
  readonly agingThresholdDays: number;
};
