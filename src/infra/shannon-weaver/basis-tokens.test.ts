import { describe, expect, it } from "vitest";
import { expandBasisCode, calculateBasisTokenSavings } from "./basis-tokens.js";

describe("Tier 1: basis-tokens (Epistemic Huffman Codebook)", () => {
  it("expands standard 4-word basis codes to full semantic qualifications", () => {
    const expandedCorpus = expandBasisCode("*[corpus-level — default skew possible]*");
    expect(expandedCorpus).toContain("Corpus-level statistical observation");

    const expandedMemory = expandBasisCode("*[verified-in-memory]*");
    expect(expandedMemory).toContain("State verified in active runtime memory");
  });

  it("calculates positive token savings for dense basis codes", () => {
    const metrics = calculateBasisTokenSavings("*[corpus-level — default skew possible]*");
    expect(metrics.tokensSaved).toBeGreaterThan(5);
    expect(metrics.shortTokens).toBeLessThan(metrics.expandedTokens);
  });

  it("supports dynamic custom codebook mappings", () => {
    const customCodebook = {
      "*[quantum-probe]*": "Quantum state verified across entanglement cluster.",
    };

    const expanded = expandBasisCode("*[quantum-probe]*", customCodebook);
    expect(expanded).toBe("Quantum state verified across entanglement cluster.");
  });
});
