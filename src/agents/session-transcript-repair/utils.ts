import type { AgentMessage } from "@openclaw/agent-core";
import {
  hasNonEmptyString as hasNonEmptyStringField,
  normalizeLowercaseStringOrEmpty,
  normalizeOptionalString,
  readStringValue,
} from "@openclaw/normalization-core/string-coerce";
import { isThinkingLikeBlock } from "../thinking-block.js";
import {
  extractToolCallsFromAssistant,
  extractToolResultId,
  extractToolResultIds,
} from "../tool-call-id.js";
import { isAllowedToolCallName } from "../tool-call-shared.js";

export type RawToolCallBlock = {
  type?: unknown;
  id?: unknown;
  call_id?: unknown;
  toolCallId?: unknown;
  toolUseId?: unknown;
  tool_call_id?: unknown;
  tool_use_id?: unknown;
  name?: unknown;
  input?: unknown;
  arguments?: unknown;
  partialJson?: unknown;
};

export const RAW_TOOL_CALL_BLOCK_TYPES = new Set([
  "toolCall",
  "toolUse",
  "functionCall",
  "tool_call",
  "tool_use",
  "function_call",
]);

export function isRawToolCallBlock(block: unknown): block is RawToolCallBlock {
  if (!block || typeof block !== "object") {
    return false;
  }
  const type = (block as { type?: unknown }).type;
  return typeof type === "string" && RAW_TOOL_CALL_BLOCK_TYPES.has(type);
}

export function hasToolCallInput(block: RawToolCallBlock): boolean {
  const hasInput = "input" in block ? block.input !== undefined && block.input !== null : false;
  const hasArguments =
    "arguments" in block ? block.arguments !== undefined && block.arguments !== null : false;
  return hasInput || hasArguments;
}

export function hasToolCallId(block: RawToolCallBlock): boolean {
  return (
    hasNonEmptyStringField(block.id) ||
    hasNonEmptyStringField(block.call_id) ||
    hasNonEmptyStringField(block.toolCallId) ||
    hasNonEmptyStringField(block.toolUseId) ||
    hasNonEmptyStringField(block.tool_call_id) ||
    hasNonEmptyStringField(block.tool_use_id)
  );
}

export function hasPartialJson(
  block: RawToolCallBlock,
): block is RawToolCallBlock & { partialJson: string } {
  return typeof block.partialJson === "string";
}

export function isCompleteJsonObject(value: string): boolean {
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed !== null && typeof parsed === "object" && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

export function isFinalizedOpenAIResponsesToolCall(
  message: AgentMessage,
  block: RawToolCallBlock,
): boolean {
  if (
    message.role !== "assistant" ||
    !("stopReason" in message) ||
    message.stopReason !== "toolUse" ||
    !hasPartialJson(block) ||
    typeof block.id !== "string" ||
    "input" in block ||
    !block.arguments ||
    typeof block.arguments !== "object" ||
    Array.isArray(block.arguments) ||
    (!isCompleteJsonObject(block.partialJson) &&
      (block.partialJson.trim() !== "" || Object.keys(block.arguments).length > 0))
  ) {
    return false;
  }

  const separator = block.id.indexOf("|");
  return separator > 0 && separator < block.id.length - 1;
}

export function sanitizeToolCallBlock(block: RawToolCallBlock): RawToolCallBlock {
  const rawName = readStringValue(block.name);
  const trimmedName = rawName?.trim();
  const hasTrimmedName = typeof trimmedName === "string" && trimmedName.length > 0;
  const normalizedName = hasTrimmedName ? trimmedName : undefined;
  const nameChanged = hasTrimmedName && rawName !== trimmedName;

  if (!nameChanged) {
    return block;
  }
  const next = { ...(block as Record<string, unknown>) };
  if (nameChanged && normalizedName) {
    next.name = normalizedName;
  }
  return next as RawToolCallBlock;
}

export function countRawToolCallBlocks(content: unknown[]): number {
  let count = 0;
  for (const block of content) {
    if (isRawToolCallBlock(block)) {
      count += 1;
    }
  }
  return count;
}

export function isReplaySafeThinkingAssistantTurn(
  content: unknown[],
  allowedToolNames: Set<string> | null,
): boolean {
  let sawToolCall = false;
  const seenToolCallIds = new Set<string>();
  for (const block of content) {
    if (!isRawToolCallBlock(block)) {
      continue;
    }
    sawToolCall = true;
    const toolCallId = typeof block.id === "string" ? block.id.trim() : "";
    if (
      !hasToolCallInput(block) ||
      hasPartialJson(block) ||
      !toolCallId ||
      seenToolCallIds.has(toolCallId) ||
      !isAllowedToolCallName(block.name, allowedToolNames)
    ) {
      return false;
    }
    seenToolCallIds.add(toolCallId);
    if (sanitizeToolCallBlock(block) !== block) {
      return false;
    }
  }
  return sawToolCall;
}

export function hasSessionsSpawnAttachmentToolCall(content: unknown[]): boolean {
  for (const block of content) {
    if (!isRawToolCallBlock(block) || block.name !== "sessions_spawn") {
      continue;
    }
    const input = block.input;
    if (!input || typeof input !== "object") {
      continue;
    }
    const attachments = (input as { attachments?: unknown }).attachments;
    if (Array.isArray(attachments) && attachments.length > 0) {
      return true;
    }
  }
  return false;
}

export const DEFAULT_MISSING_TOOL_RESULT_TEXT =
  "[openclaw] missing tool result in session history; inserted synthetic error result for transcript repair.";
export const SYNTHETIC_MISSING_TOOL_RESULT_DETAIL_KEY = "openclawSyntheticMissingToolResult";

export function makeMissingToolResult(params: {
  toolCallId: string;
  toolName?: string;
  text?: string;
}): Extract<AgentMessage, { role: "toolResult" }> {
  return {
    role: "toolResult",
    toolCallId: params.toolCallId,
    toolName: params.toolName ?? "unknown",
    content: [
      {
        type: "text",
        text: params.text ?? DEFAULT_MISSING_TOOL_RESULT_TEXT,
      },
    ],
    details: { [SYNTHETIC_MISSING_TOOL_RESULT_DETAIL_KEY]: true },
    isError: true,
    timestamp: Date.now(),
  } as Extract<AgentMessage, { role: "toolResult" }>;
}

export function isSyntheticMissingToolResult(msg: Extract<AgentMessage, { role: "toolResult" }>): boolean {
  if (!(msg as { isError?: unknown }).isError) {
    return false;
  }
  const details = (msg as { details?: unknown }).details;
  if (
    details &&
    typeof details === "object" &&
    (details as Record<string, unknown>)[SYNTHETIC_MISSING_TOOL_RESULT_DETAIL_KEY] === true
  ) {
    return true;
  }
  const content = (msg as { content?: unknown }).content;
  if (!Array.isArray(content)) {
    return false;
  }
  return content.some(
    (block: unknown) =>
      typeof block === "object" &&
      block !== null &&
      (block as { type?: string }).type === "text" &&
      (block as { text?: string }).text === DEFAULT_MISSING_TOOL_RESULT_TEXT,
  );
}

export function normalizeToolResultName(
  message: Extract<AgentMessage, { role: "toolResult" }>,
  fallbackName?: string,
): Extract<AgentMessage, { role: "toolResult" }> {
  const rawToolName = (message as { toolName?: unknown }).toolName;
  const normalizedToolName = normalizeOptionalString(rawToolName);
  if (normalizedToolName) {
    if (rawToolName === normalizedToolName) {
      return message;
    }
    return { ...message, toolName: normalizedToolName };
  }

  const normalizedFallback = normalizeOptionalString(fallbackName);
  if (normalizedFallback) {
    return { ...message, toolName: normalizedFallback };
  }

  if (typeof rawToolName === "string") {
    return { ...message, toolName: "unknown" };
  }
  return message;
}

export function normalizeLegacyToolResultId(
  message: Extract<AgentMessage, { role: "toolResult" }>,
  toolCalls: Array<{ id: string; name?: string }>,
): Extract<AgentMessage, { role: "toolResult" }> {
  if (extractToolResultId(message) || toolCalls.length !== 1) {
    return message;
  }
  const [toolCall] = toolCalls;
  if (!toolCall) {
    return message;
  }
  const toolResultName = normalizeOptionalString((message as { toolName?: unknown }).toolName);
  const toolCallName = normalizeOptionalString(toolCall.name);
  if (toolResultName && toolCallName && toolResultName !== toolCallName) {
    return message;
  }
  return { ...message, toolCallId: toolCall.id, isError: true };
}

export type ToolCallInputRepairReport = {
  messages: AgentMessage[];
  droppedToolCalls: number;
  droppedAssistantMessages: number;
};

export type ToolCallInputRepairOptions = {
  allowedToolNames?: Iterable<string>;
  allowProviderOwnedThinkingReplay?: boolean;
};

export type ErroredAssistantResultPolicy = "preserve" | "drop";

export type ToolUseResultPairingOptions = {
  erroredAssistantResultPolicy?: ErroredAssistantResultPolicy;
  missingToolResultText?: string;
};

export type ToolUseRepairReport = {
  messages: AgentMessage[];
  added: Array<Extract<AgentMessage, { role: "toolResult" }>>;
  droppedDuplicateCount: number;
  droppedOrphanCount: number;
  moved: boolean;
};

export function shouldDropErroredAssistantResults(options?: ToolUseResultPairingOptions): boolean {
  return options?.erroredAssistantResultPolicy === "drop";
}

export function assistantHasToolCalls(message: AgentMessage): boolean {
  if (!message || typeof message !== "object" || message.role !== "assistant") {
    return false;
  }
  return extractToolCallsFromAssistant(message).length > 0;
}

export type ToolResultMessage = Extract<AgentMessage, { role: "toolResult" }>;

export type ToolResultRecord = {
  result: ToolResultMessage;
  id?: string;
};

export type ToolCallOccurrence = {
  id: string;
  name?: string;
  result?: ToolResultMessage;
};

export type SameIdOccurrenceGroup = {
  occurrences: ToolCallOccurrence[];
  nextUnfilledIndex: number;
  syntheticOccurrences: ToolCallOccurrence[];
  nextSyntheticIndex: number;
};

export type ToolUseFrame = {
  startIndex: number;
  endIndex: number;
  assistant: Extract<AgentMessage, { role: "assistant" }>;
  remainder: AgentMessage[];
  unclaimedResults: ToolResultRecord[];
  occurrences: ToolCallOccurrence[];
  failed: boolean;
};

export function buildToolUseFrames(messages: AgentMessage[], onDuplicate: () => void): ToolUseFrame[] {
  const frameStartIndexes: number[] = [];
  for (const [index, message] of messages.entries()) {
    if (message && typeof message === "object" && assistantHasToolCalls(message)) {
      frameStartIndexes.push(index);
    }
  }

  return frameStartIndexes.map((startIndex, frameIndex) => {
    const assistant = messages[startIndex] as Extract<AgentMessage, { role: "assistant" }>;
    const toolCalls = extractToolCallsFromAssistant(assistant);
    const occurrences: ToolCallOccurrence[] = [];
    const occurrencesById = new Map<string, SameIdOccurrenceGroup>();
    for (const toolCall of toolCalls) {
      const occurrence: ToolCallOccurrence = { id: toolCall.id, name: toolCall.name };
      occurrences.push(occurrence);
      const sameIdGroup = occurrencesById.get(toolCall.id);
      if (sameIdGroup) {
        sameIdGroup.occurrences.push(occurrence);
      } else {
        occurrencesById.set(toolCall.id, {
          occurrences: [occurrence],
          nextUnfilledIndex: 0,
          syntheticOccurrences: [],
          nextSyntheticIndex: 0,
        });
      }
    }

    const endIndex = frameStartIndexes[frameIndex + 1] ?? messages.length;
    const remainder: AgentMessage[] = [];
    const unclaimedResults: ToolResultRecord[] = [];

    for (let index = startIndex + 1; index < endIndex; index += 1) {
      const message = messages[index];
      if (!message || typeof message !== "object") {
        continue;
      }
      if (message.role !== "toolResult") {
        remainder.push(message);
        continue;
      }

      const legacyNormalized = normalizeLegacyToolResultId(message, toolCalls);
      const id = extractToolResultId(legacyNormalized);
      const sameIdGroup = id ? occurrencesById.get(id) : undefined;
      if (!id || !sameIdGroup) {
        unclaimedResults.push({ result: legacyNormalized, id: id ?? undefined });
        continue;
      }

      const unfilledOccurrence = sameIdGroup.occurrences[sameIdGroup.nextUnfilledIndex];
      if (unfilledOccurrence) {
        unfilledOccurrence.result = normalizeToolResultName(
          legacyNormalized,
          unfilledOccurrence.name,
        );
        sameIdGroup.nextUnfilledIndex += 1;
        if (isSyntheticMissingToolResult(unfilledOccurrence.result)) {
          sameIdGroup.syntheticOccurrences.push(unfilledOccurrence);
        }
        continue;
      }

      onDuplicate();
      if (!isSyntheticMissingToolResult(legacyNormalized)) {
        const replaceableOccurrence =
          sameIdGroup.syntheticOccurrences[sameIdGroup.nextSyntheticIndex];
        if (replaceableOccurrence) {
          sameIdGroup.nextSyntheticIndex += 1;
          replaceableOccurrence.result = normalizeToolResultName(
            legacyNormalized,
            replaceableOccurrence.name,
          );
        }
      }
    }

    const stopReason = (assistant as { stopReason?: string }).stopReason;
    const failed = stopReason === "error" || stopReason === "aborted";

    return {
      startIndex,
      endIndex,
      assistant,
      remainder,
      unclaimedResults,
      occurrences,
      failed,
    };
  });
}


export function stripToolResultDetails(messages: AgentMessage[]): AgentMessage[] {
  let touched = false;
  const out: AgentMessage[] = [];
  for (const msg of messages) {
    if (!msg || typeof msg !== "object" || (msg as { role?: unknown }).role !== "toolResult") {
      out.push(msg);
      continue;
    }
    if (!("details" in msg)) {
      out.push(msg);
      continue;
    }
    const sanitized = { ...(msg as object) } as { details?: unknown };
    delete sanitized.details;
    touched = true;
    out.push(sanitized as unknown as AgentMessage);
  }
  return touched ? out : messages;
}
