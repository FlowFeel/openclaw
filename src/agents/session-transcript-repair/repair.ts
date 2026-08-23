import type { AgentMessage } from "@openclaw/agent-core";
import {
  buildToolUseFrames,
  isSyntheticMissingToolResult,
  makeMissingToolResult,
  normalizeToolResultName,
  shouldDropErroredAssistantResults,
  type ToolUseRepairReport,
  type ToolUseResultPairingOptions,
  type ToolCallOccurrence,
  type ToolResultRecord,
} from "./utils.js";

export function repairToolUseResultPairing(
  messages: AgentMessage[],
  options?: ToolUseResultPairingOptions,
): ToolUseRepairReport {
  const added: Array<Extract<AgentMessage, { role: "toolResult" }>> = [];
  let droppedDuplicateCount = 0;
  let droppedOrphanCount = 0;
  const frames = buildToolUseFrames(messages, () => {
    droppedDuplicateCount += 1;
  });

  const unresolvedById = new Map<string, ToolCallOccurrence[]>();
  for (const frame of frames) {
    for (const occurrence of frame.occurrences) {
      if (!occurrence.result || isSyntheticMissingToolResult(occurrence.result)) {
        const unresolved = unresolvedById.get(occurrence.id);
        if (unresolved) {
          unresolved.push(occurrence);
        } else {
          unresolvedById.set(occurrence.id, [occurrence]);
        }
      }
    }

    for (const record of frame.unclaimedResults) {
      if (!record.id) {
        droppedOrphanCount += 1;
        continue;
      }
      const candidates = (unresolvedById.get(record.id) ?? []).filter(
        (candidate) =>
          !candidate.result ||
          (isSyntheticMissingToolResult(candidate.result) &&
            !isSyntheticMissingToolResult(record.result)),
      );
      if (candidates.length !== 1) {
        droppedOrphanCount += 1;
        continue;
      }

      const [candidate] = candidates;
      if (!candidate) {
        droppedOrphanCount += 1;
        continue;
      }
      if (candidate.result) {
        droppedDuplicateCount += 1;
      }
      candidate.result = normalizeToolResultName(record.result, candidate.name);
    }
  }

  const out: AgentMessage[] = [];
  let cursor = 0;
  const pushUnframedRange = (endIndex: number) => {
    for (; cursor < endIndex; cursor += 1) {
      const message = messages[cursor];
      if (!message || typeof message !== "object") {
        continue;
      }
      if (message.role === "toolResult") {
        droppedOrphanCount += 1;
        continue;
      }
      out.push(message);
    }
  };

  for (const frame of frames) {
    pushUnframedRange(frame.startIndex);
    cursor = frame.endIndex;

    if (!(frame.failed && shouldDropErroredAssistantResults(options))) {
      out.push(frame.assistant);
      for (const occurrence of frame.occurrences) {
        if (occurrence.result) {
          out.push(occurrence.result);
          continue;
        }
        if (frame.failed) {
          continue;
        }
        const missing = makeMissingToolResult({
          toolCallId: occurrence.id,
          toolName: occurrence.name,
          text: options?.missingToolResultText,
        });
        occurrence.result = missing;
        added.push(missing);
        out.push(missing);
      }
    }
    out.push(...frame.remainder);
  }
  pushUnframedRange(messages.length);

  const changed =
    out.length !== messages.length || out.some((message, index) => message !== messages[index]);
  return {
    messages: changed ? out : messages,
    added,
    droppedDuplicateCount,
    droppedOrphanCount,
    moved: changed,
  };
}

/**
 * Scans the tail of the message log and returns synthetic cancellation toolResult
 * messages for any un-paired tool calls (e.g. from an aborted run).
 */
export function repairOrphanToolCalls(
  messages: readonly AgentMessage[],
  options?: ToolUseResultPairingOptions,
): Array<Extract<AgentMessage, { role: "toolResult" }>> {
  const report = repairToolUseResultPairing([...messages], options);
  return report.added;
}
