/**
 * @dft:axiom A1, A2
 * Pure Noise Source Identifier & Classifier
 */

import { TurnMessage, NoiseSource, NoiseCategory } from "./types.js";
import { estimateTokens } from "./snr-calculator.js";

const RETRACTION_PATTERN = /let me clarify|actually,|i was wrong|correction:/i;
const SOCIAL_PADDING_PATTERN = /^(got it|makes sense|thanks|thank you|ok|understood)[\.!\s]*$/i;
const HEARTBEAT_PATTERN = /^heartbeat|\/status@faustyrollbot/i;

export function classifyTurnNoiseCategory(
  msg: TurnMessage,
  seenToolOutputs: Set<string>
): NoiseCategory | null {
  const text = msg.content.trim();
  if (!text) return "chaff";

  if (HEARTBEAT_PATTERN.test(text)) return "heartbeat";
  if (RETRACTION_PATTERN.test(text)) return "self_correction_retraction";
  if (SOCIAL_PADDING_PATTERN.test(text)) return "social_padding";

  if (msg.role === "tool") {
    if (seenToolOutputs.has(text)) {
      return "duplicate_tool_output";
    }
    seenToolOutputs.add(text);
  }

  return null;
}

export function identifyNoiseSources(turns: TurnMessage[], topN: number = 3): NoiseSource[] {
  const bucketMap = new Map<NoiseCategory, { tokens: number; count: number }>();
  let totalContextTokens = 0;
  const seenToolOutputs = new Set<string>();

  for (const turn of turns) {
    const tokens = turn.tokens ?? estimateTokens(turn.content);
    totalContextTokens += tokens;

    const cat = classifyTurnNoiseCategory(turn, seenToolOutputs);
    if (cat) {
      const existing = bucketMap.get(cat) ?? { tokens: 0, count: 0 };
      existing.tokens += tokens;
      existing.count += 1;
      bucketMap.set(cat, existing);
    }
  }

  const safeTotal = Math.max(1, totalContextTokens);
  const sources: NoiseSource[] = [];

  for (const [category, { tokens, count }] of bucketMap.entries()) {
    const percentageOfContext = Math.round((tokens / safeTotal) * 100);
    let description = `${category}: ${tokens} tokens (${count} occurrences)`;

    if (category === "heartbeat") description = `Heartbeat telemetry & poll pings: ${tokens} tokens`;
    if (category === "duplicate_tool_output") description = `Duplicate tool output logs: ${tokens} tokens`;
    if (category === "self_correction_retraction") description = `Agent self-correction retractions: ${tokens} tokens`;
    if (category === "social_padding") description = `Social pleasantries & padding: ${tokens} tokens`;

    sources.push({
      category,
      tokens,
      percentageOfContext,
      description,
    });
  }

  // Sort descending by token consumption and take top N
  sources.sort((a, b) => b.tokens - a.tokens);
  return sources.slice(0, Math.max(1, topN));
}
