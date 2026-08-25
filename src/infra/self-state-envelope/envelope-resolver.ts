/**
 * Pure Dynamic Self-State Envelope Resolver.
 * Computes ephemeral frames (F1, F3, F4) and marries them with durable F2 compaction logs.
 *
 * @dft
 * - A1 / A2: Zero I/O, deterministic functional calculation.
 */

import { calculateSNR } from "../tokenomics/snr-calculator.js";
import type { TurnMessage } from "../tokenomics/types.js";
import type {
  CompactionEventRecord,
  EnvelopeResolverConfig,
  Frame1Headroom,
  Frame2CompactionLog,
  Frame3Route,
  Frame4Memory,
  SelfStateEnvelope,
} from "./types.js";

const DEFAULT_MODEL_LIMIT = 128000;

function estimateTurnTokens(turns: readonly TurnMessage[]): number {
  let totalChars = 0;
  for (const t of turns) {
    totalChars += t.content ? t.content.length : 0;
  }
  return Math.max(1, Math.ceil(totalChars / 4));
}

/**
 * Purely resolves the complete Self-State Envelope for the current turn.
 */
export function resolveSelfStateEnvelope(
  turns: readonly TurnMessage[],
  config?: EnvelopeResolverConfig,
  durableF2Events: readonly CompactionEventRecord[] = [],
): SelfStateEnvelope {
  const modelLimit = config?.modelLimitTokens ?? DEFAULT_MODEL_LIMIT;
  const usedTokens = estimateTurnTokens(turns);
  const remainingTokens = Math.max(0, modelLimit - usedTokens);
  const capacityPercentage = Math.min(100, Math.round((usedTokens / modelLimit) * 100));

  const snrReport = calculateSNR(turns as TurnMessage[]);

  const F1: Frame1Headroom = {
    usedTokens,
    limitTokens: modelLimit,
    remainingTokens,
    capacityPercentage,
    snrPercentage: snrReport.snrPercent,
  };

  const F2: Frame2CompactionLog = {
    totalCompactionEvents: durableF2Events.length,
    events: Object.freeze([...durableF2Events]),
    lastEvent: durableF2Events.length > 0 ? durableF2Events[durableF2Events.length - 1] : undefined,
  };

  const activeRoute = config?.activeRoute ?? "fits";
  const F3: Frame3Route = {
    activeRoute,
    requestedRoute: config?.requestedRoute,
    reason: capacityPercentage > 80 ? "Capacity > 80%; compaction recommended" : "Operating nominal",
  };

  const F4: Frame4Memory = {
    hotTurnsCount: turns.length,
    warmDreamsBytes: config?.warmDreamsBytes ?? 0,
    coldArchiveReferences: Object.freeze(config?.coldArchiveReferences ?? []),
  };

  const platform = {
    version: config?.platformVersion ?? "v2026.2.26",
    capabilities: Object.freeze(
      config?.capabilities ?? [
        "sequential_queue",
        "path_normalizer",
        "topic_governance",
        "self_state_envelope",
      ],
    ),
  };

  return {
    F1,
    F2,
    F3,
    F4,
    platform,
  };
}
