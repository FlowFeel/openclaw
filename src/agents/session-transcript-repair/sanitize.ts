import type { AgentMessage } from "@openclaw/agent-core";
import {
  normalizeLowercaseStringOrEmpty,
  normalizeOptionalString,
} from "@openclaw/normalization-core/string-coerce";
import { isThinkingLikeBlock } from "../thinking-block.js";
import {
  extractToolCallsFromAssistant,
  extractToolResultId,
  extractToolResultIds,
} from "../tool-call-id.js";
import { isAllowedToolCallName, normalizeAllowedToolNames } from "../tool-call-shared.js";
import {
  isRawToolCallBlock,
  hasToolCallInput,
  hasToolCallId,
  hasPartialJson,
  isFinalizedOpenAIResponsesToolCall,
  sanitizeToolCallBlock,
  countRawToolCallBlocks,
  isReplaySafeThinkingAssistantTurn,
  hasSessionsSpawnAttachmentToolCall,
  normalizeLegacyToolResultId,
  assistantHasToolCalls,
  type ToolCallInputRepairOptions,
  type ToolCallInputRepairReport,
  type ToolUseResultPairingOptions,
  type RawToolCallBlock,
  RAW_TOOL_CALL_BLOCK_TYPES,
} from "./utils.js";
import { repairToolUseResultPairing } from "./repair.js";

function collectFollowingToolResults(
  messages: AgentMessage[],
  index: number,
): { ids: Set<string>; displaced: boolean } {
  const ids = new Set<string>();
  const assistant = messages[index];
  const currentToolCalls =
    assistant && typeof assistant === "object" && assistant.role === "assistant"
      ? extractToolCallsFromAssistant(assistant)
      : [];
  let sawNonToolResult = false;
  let displaced = false;
  for (let nextIndex = index + 1; nextIndex < messages.length; nextIndex += 1) {
    const message = messages[nextIndex];
    if (!message || typeof message !== "object") {
      sawNonToolResult = true;
      continue;
    }
    if (message.role === "assistant" && assistantHasToolCalls(message)) {
      break;
    }
    if (message.role === "toolResult") {
      const normalizedLegacyResult = normalizeLegacyToolResultId(message, currentToolCalls);
      const resultIds = extractToolResultIds(normalizedLegacyResult);
      for (const id of resultIds) {
        ids.add(id);
      }
      displaced ||= resultIds.length > 0 && sawNonToolResult;
      continue;
    }
    sawNonToolResult = true;
  }
  return { ids, displaced };
}

export function repairToolCallInputs(
  messages: AgentMessage[],
  options?: ToolCallInputRepairOptions,
): ToolCallInputRepairReport {
  let droppedToolCalls = 0;
  let droppedAssistantMessages = 0;
  let changed = false;
  const out: AgentMessage[] = [];
  const allowedToolNames = normalizeAllowedToolNames(options?.allowedToolNames);
  const allowProviderOwnedThinkingReplay = options?.allowProviderOwnedThinkingReplay === true;
  const preservedThinkingToolCallIds = new Set<string>();
  const priorToolCallIds = new Set<string>();

  for (const [index, msg] of messages.entries()) {
    if (!msg || typeof msg !== "object") {
      changed = true;
      continue;
    }

    if (msg.role !== "assistant" || !Array.isArray(msg.content)) {
      out.push(msg);
      continue;
    }

    if (
      allowProviderOwnedThinkingReplay &&
      msg.content.some((block) => isThinkingLikeBlock(block)) &&
      countRawToolCallBlocks(msg.content) > 0
    ) {
      const replaySafeToolCalls = extractToolCallsFromAssistant(msg);
      const followingToolResults = collectFollowingToolResults(messages, index);
      if (
        isReplaySafeThinkingAssistantTurn(msg.content, allowedToolNames) &&
        replaySafeToolCalls.every(
          (toolCall) =>
            !preservedThinkingToolCallIds.has(toolCall.id) &&
            (!hasSessionsSpawnAttachmentToolCall(msg.content) ||
              followingToolResults.ids.has(toolCall.id)) &&
            (!followingToolResults.displaced || !priorToolCallIds.has(toolCall.id)),
        )
      ) {
        for (const toolCall of replaySafeToolCalls) {
          preservedThinkingToolCallIds.add(toolCall.id);
          priorToolCallIds.add(toolCall.id);
        }
        changed ||= followingToolResults.displaced;
        out.push(msg);
      } else {
        droppedToolCalls += countRawToolCallBlocks(msg.content);
        droppedAssistantMessages += 1;
        changed = true;
      }
      continue;
    }

    const nextContent: typeof msg.content = [];
    let droppedInMessage = 0;
    let messageChanged = false;

    for (const block of msg.content) {
      if (isRawToolCallBlock(block)) {
        if (
          !hasToolCallInput(block) ||
          !hasToolCallId(block) ||
          !isAllowedToolCallName((block as RawToolCallBlock).name, allowedToolNames)
        ) {
          droppedToolCalls += 1;
          droppedInMessage += 1;
          changed = true;
          messageChanged = true;
          continue;
        }
      }
      let workBlock = block;
      if (isRawToolCallBlock(block) && hasPartialJson(block)) {
        if (!isFinalizedOpenAIResponsesToolCall(msg, block)) {
          droppedToolCalls += 1;
          droppedInMessage += 1;
          changed = true;
          messageChanged = true;
          continue;
        }

        const stripped = { ...block };
        delete (stripped as RawToolCallBlock & { partialJson?: unknown }).partialJson;
        workBlock = stripped;
        changed = true;
        messageChanged = true;
      }
      if (isRawToolCallBlock(workBlock)) {
        if (RAW_TOOL_CALL_BLOCK_TYPES.has((workBlock as { type?: string }).type ?? "")) {
          const blockName =
            typeof (workBlock as { name?: unknown }).name === "string"
              ? (workBlock as { name: string }).name.trim()
              : undefined;
          if (normalizeLowercaseStringOrEmpty(blockName) === "sessions_spawn") {
            const sanitized = sanitizeToolCallBlock(workBlock);
            if (sanitized !== workBlock) {
              changed = true;
              messageChanged = true;
            }
            nextContent.push(sanitized as typeof block);
          } else if (typeof (workBlock as { name?: unknown }).name === "string") {
            const rawName = (workBlock as { name: string }).name;
            const trimmedName = rawName.trim();
            if (rawName !== trimmedName && trimmedName) {
              const renamed = { ...(workBlock as object), name: trimmedName } as typeof block;
              nextContent.push(renamed);
              changed = true;
              messageChanged = true;
            } else {
              nextContent.push(workBlock);
            }
          } else {
            nextContent.push(workBlock);
          }
          continue;
        }
      }
      nextContent.push(workBlock);
    }

    if (droppedInMessage > 0) {
      if (nextContent.length === 0) {
        droppedAssistantMessages += 1;
        changed = true;
        continue;
      }
      const nextMessage = { ...msg, content: nextContent };
      for (const toolCall of extractToolCallsFromAssistant(nextMessage)) {
        priorToolCallIds.add(toolCall.id);
      }
      out.push(nextMessage);
      continue;
    }

    if (messageChanged) {
      const nextMessage = { ...msg, content: nextContent };
      for (const toolCall of extractToolCallsFromAssistant(nextMessage)) {
        priorToolCallIds.add(toolCall.id);
      }
      out.push(nextMessage);
      continue;
    }

    for (const toolCall of extractToolCallsFromAssistant(msg)) {
      priorToolCallIds.add(toolCall.id);
    }
    out.push(msg);
  }

  return {
    messages: changed ? out : messages,
    droppedToolCalls,
    droppedAssistantMessages,
  };
}

export function sanitizeToolCallInputs(
  messages: AgentMessage[],
  options?: ToolCallInputRepairOptions,
): AgentMessage[] {
  return repairToolCallInputs(messages, options).messages;
}

export function sanitizeToolUseResultPairing(
  messages: AgentMessage[],
  options?: ToolUseResultPairingOptions,
): AgentMessage[] {
  return repairToolUseResultPairing(messages, options).messages;
}
