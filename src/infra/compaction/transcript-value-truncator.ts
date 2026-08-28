/**
 * Store-Boundary Transcript Value Truncator.
 * Applies φ(v, k) lazy prefix projection across transcript tool call arguments & results.
 *
 * @dft
 * - A1 (pure-io-separation): Pure transformation with zero side effects.
 * - A2 (determinism): Invariant keyspace, deterministic value projection.
 * - A4 (goldilocks): < 90 LOC.
 */

import {
  DEFAULT_PREFIX_BUDGET_BYTES,
  lazyPrefixTruncate,
} from "./lazy-prefix-truncation.js";

export interface ToolCallItem {
  type: string;
  id: string;
  name: string;
  arguments?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface TranscriptMessage {
  role?: string;
  type?: string;
  id?: string;
  name?: string;
  toolCallId?: string;
  content?: unknown;
  arguments?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Pure store-boundary transformer:
 * Projects transcript messages into a truncated representation where valuespace
 * payload strings beyond `limitBytes` are truncated, preserving structural keyspace.
 */
export function truncateTranscriptToolValues<T extends TranscriptMessage>(
  messages: readonly T[],
  limitBytes: number = DEFAULT_PREFIX_BUDGET_BYTES,
): T[] {
  return messages.map((msg) => {
    const updated: Record<string, unknown> = { ...msg };

    // 1. Truncate arguments on tool call invocation turns
    if (msg.arguments && typeof msg.arguments === "object") {
      updated.arguments = lazyPrefixTruncate(msg.arguments, limitBytes);
    }

    // 2. Truncate tool content/result streams
    if (msg.role === "tool" || msg.type === "tool_result") {
      if (typeof msg.content === "string") {
        updated.content = lazyPrefixTruncate(msg.content, limitBytes);
      } else if (msg.content && typeof msg.content === "object") {
        updated.content = lazyPrefixTruncate(msg.content, limitBytes);
      }
    }

    // 3. Handle array content (assistant content blocks with toolCalls)
    if (Array.isArray(msg.content)) {
      updated.content = msg.content.map((block) => {
        if (block && typeof block === "object" && (block as ToolCallItem).type === "toolCall") {
          const toolCallBlock = block as ToolCallItem;
          return {
            ...toolCallBlock,
            arguments: toolCallBlock.arguments
              ? lazyPrefixTruncate(toolCallBlock.arguments, limitBytes)
              : toolCallBlock.arguments,
          };
        }
        return block;
      });
    }

    return updated as T;
  });
}
