/**
 * Literate Compactor — Visual Metering, Turn Slicing & Epistemic Artifact Generation.
 *
 * @dft
 * - A1 (pure-io-separation): Pure transformation and formatting functions.
 * - A2 (determinism): Pure string/array manipulation.
 * - A4 (dft-docs): Structured documentation.
 * - A6 (check-result): Typed status structs.
 */

import { formatBytes, formatTokens } from "./adaptive-threshold.js";
import type {
  ContextMeterStatus,
  EpistemicPartition,
  LiterateCompactionData,
} from "./types.js";

/** Generates an ASCII gauge meter string of given width (default 10 blocks). */
export function generateAsciiBar(ratio: number, width: number = 10): string {
  const clamped = Math.max(0, Math.min(1.0, ratio));
  const filled = Math.round(clamped * width);
  const empty = width - filled;
  return "[" + "█".repeat(filled) + "░".repeat(empty) + "]";
}

/**
 * Calculates context meter progression and tier status.
 */
export function calculateContextMeter(
  currentTokens: number,
  thresholdTokens: number,
  currentBytes: number = 0,
  thresholdBytes: number = 0,
): ContextMeterStatus {
  const safeCurrentTokens = Math.max(0, currentTokens);
  const safeThresholdTokens = Math.max(1, thresholdTokens);
  const safeCurrentBytes = Math.max(0, currentBytes);
  const safeThresholdBytes = Math.max(1, thresholdBytes || safeThresholdTokens * 12.5);

  const tokenRatio = safeCurrentTokens / safeThresholdTokens;
  const byteRatio = safeCurrentBytes / safeThresholdBytes;
  const fillRatio = Math.max(tokenRatio, byteRatio);
  const percentage = Math.min(100, Math.round(fillRatio * 100));

  let tier: ContextMeterStatus["tier"];
  if (fillRatio >= 1.0) {
    tier = "overflow";
  } else if (fillRatio >= 0.85) {
    tier = "critical";
  } else if (fillRatio >= 0.65) {
    tier = "warning";
  } else {
    tier = "nominal";
  }

  const visualMeter = generateAsciiBar(fillRatio, 10);
  const tokenPart = `${formatTokens(safeCurrentTokens)}/${formatTokens(safeThresholdTokens)} tokens`;
  const bytePart =
    safeCurrentBytes > 0
      ? ` | ${formatBytes(safeCurrentBytes)}/${formatBytes(safeThresholdBytes)}`
      : "";
  const formattedLabel = `${visualMeter} ${percentage}% (${tokenPart}${bytePart})`;

  return {
    currentTokens: safeCurrentTokens,
    thresholdTokens: safeThresholdTokens,
    currentBytes: safeCurrentBytes,
    thresholdBytes: safeThresholdBytes,
    fillRatio,
    percentage,
    tier,
    visualMeter,
    formattedLabel,
  };
}

/** Helper interface identifying message role and structure for turn boundary detection. */
export interface GenericMessage {
  readonly role?: string;
  readonly type?: string;
  readonly [key: string]: unknown;
}

/**
 * Partitions a message history into summarizable pre-tail history and verbatim living tail.
 * Identifies turn boundaries by scanning user messages in reverse.
 */
export function partitionEpistemicTurns<T extends GenericMessage>(
  messages: readonly T[],
  tailTurnCount: number = 2,
): EpistemicPartition<T> {
  if (messages.length === 0) {
    return {
      preTailMessages: [],
      livingTailMessages: [],
      tailTurnCount: 0,
    };
  }

  let userTurnsSeen = 0;
  let cutIndex = messages.length;

  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const isUser = msg?.role === "user" || msg?.type === "user";
    if (isUser) {
      userTurnsSeen++;
      if (userTurnsSeen === tailTurnCount) {
        cutIndex = i;
        break;
      }
    }
  }

  // If we haven't reached the requested turn count, keep everything in the living tail
  if (userTurnsSeen < tailTurnCount) {
    return {
      preTailMessages: [],
      livingTailMessages: [...messages],
      tailTurnCount: userTurnsSeen,
    };
  }

  return {
    preTailMessages: messages.slice(0, cutIndex),
    livingTailMessages: messages.slice(cutIndex),
    tailTurnCount,
  };
}

/**
 * Formats a first-class Literate Compaction Markdown Document.
 */
export function formatLiterateCompactionArtifact(data: LiterateCompactionData): string {
  const sections: string[] = [];

  sections.push("## Goal");
  sections.push(data.goal.trim() || "(none)");
  sections.push("");

  sections.push("## Constraints & Preferences");
  if (data.constraintsAndPreferences.length > 0) {
    sections.push(data.constraintsAndPreferences.map((c) => `- ${c}`).join("\n"));
  } else {
    sections.push("- (none)");
  }
  sections.push("");

  sections.push("## Progress");
  sections.push("### Done");
  if (data.progressDone.length > 0) {
    sections.push(data.progressDone.map((d) => `- [x] ${d}`).join("\n"));
  } else {
    sections.push("- [x] (none)");
  }
  sections.push("");

  sections.push("### In Progress");
  if (data.progressInProgress.length > 0) {
    sections.push(data.progressInProgress.map((p) => `- [ ] ${p}`).join("\n"));
  } else {
    sections.push("- [ ] (none)");
  }
  sections.push("");

  sections.push("### Blocked");
  if (data.progressBlocked.length > 0) {
    sections.push(data.progressBlocked.map((b) => `- ${b}`).join("\n"));
  } else {
    sections.push("- (none)");
  }
  sections.push("");

  sections.push("## Key Decisions");
  if (data.keyDecisions.length > 0) {
    sections.push(
      data.keyDecisions.map((kd) => `- **${kd.decision}**: ${kd.rationale}`).join("\n"),
    );
  } else {
    sections.push("- (none)");
  }
  sections.push("");

  sections.push("## War Stories");
  if (data.warStories.length > 0) {
    sections.push(
      data.warStories.map((ws) => `- **${ws.failure}**: ${ws.rootCause}`).join("\n"),
    );
  } else {
    sections.push("- (none)");
  }
  sections.push("");

  sections.push("## Critical Context");
  if (data.criticalContext.length > 0) {
    sections.push(data.criticalContext.map((cc) => `- ${cc}`).join("\n"));
  } else {
    sections.push("- (none)");
  }
  sections.push("");

  sections.push("## Next Steps");
  if (data.nextSteps.length > 0) {
    sections.push(data.nextSteps.map((ns, idx) => `${idx + 1}. ${ns}`).join("\n"));
  } else {
    sections.push("1. (none)");
  }

  return sections.join("\n");
}
