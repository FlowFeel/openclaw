/**
 * Epistemic Basis Tier Token Codec — Huffman Compression Shorthands.
 *
 * Provides pure token expansion and compression for 4-word epistemic basis tier tokens
 * over an extensible, open codebook dictionary.
 *
 * @dft
 * - Pure function (A1): No I/O, deterministic dictionary mappings.
 */

/**
 * Standard Default Epistemic Codebook.
 */
export const DEFAULT_EPISTEMIC_CODEBOOK: Readonly<Record<string, string>> = Object.freeze({
  "*[corpus-level — default skew possible]*": "Corpus-level statistical observation with potential default distribution skew.",
  "*[verified-in-memory]*": "State verified in active runtime memory or test isolate.",
  "*[empirical-trace]*": "Empirically observed in verified execution logs or production traces.",
  "*[deductive-axiom]*": "Mathematically proven invariant or structural axiom.",
});

/**
 * Expands an epistemic basis shortcode into its full qualification text.
 */
export function expandBasisCode(
  code: string,
  customCodebook?: Readonly<Record<string, string>>,
): string {
  const codebook = {
    ...DEFAULT_EPISTEMIC_CODEBOOK,
    ...(customCodebook ?? {}),
  };

  return codebook[code] ?? code;
}

/**
 * Evaluates estimated token savings for using basis shortcodes vs full qualification.
 */
export function calculateBasisTokenSavings(code: string): {
  readonly shortTokens: number;
  readonly expandedTokens: number;
  readonly tokensSaved: number;
} {
  const expanded = expandBasisCode(code);
  // Approximation: 1 token ≈ 4 characters
  const shortTokens = Math.ceil(code.length / 4);
  const expandedTokens = Math.ceil(expanded.length / 4);
  const tokensSaved = Math.max(0, expandedTokens - shortTokens);

  return {
    shortTokens,
    expandedTokens,
    tokensSaved,
  };
}
