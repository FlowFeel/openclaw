/**
 * Certified Agent Self-State Envelope Tools.
 *
 * @dft:axiom A5 (Certified Tool Arity k <= 2)
 * Pure, lightweight query surface over self-state envelope and bounded retransmission.
 */

import {
  queryEnvelopePath,
  resolveSelfStateEnvelope,
  type CompactionEventRecord,
  type RoutingMode,
  type SelfStateEnvelope,
} from "../../infra/self-state-envelope/index.js";
import type { TurnMessage } from "../../infra/tokenomics/types.js";

const MAX_RETRANSMIT_BUDGET_TOKENS = 2000;

// Active in-memory session envelope state
let activeTurns: TurnMessage[] = [
  { role: "system", content: "You are the resident channel agent." },
];
let activeF2Events: CompactionEventRecord[] = [];
let requestedForwardRoute: RoutingMode | undefined = undefined;

// Mock pre-compaction archive storage
const archiveStore = new Map<string | number, string>();

export function setActiveEnvelopeContext(
  turns: TurnMessage[],
  f2Events: CompactionEventRecord[] = [],
  archiveEntries: [string | number, string][] = [],
): void {
  activeTurns = [...turns];
  activeF2Events = [...f2Events];
  archiveStore.clear();
  for (const [k, v] of archiveEntries) {
    archiveStore.set(k, v);
  }
}

export function getCurrentEnvelope(): SelfStateEnvelope {
  return resolveSelfStateEnvelope(
    activeTurns,
    {
      requestedRoute: requestedForwardRoute,
    },
    activeF2Events,
  );
}

/**
 * Certified Atomic Tool (k = 1)
 * Queries a specific frame or field on demand (e.g., "F1.headroom", "F2.lastEvent", "F3.route").
 * Returns terse primitives or minimal records (< 40 tokens).
 */
export function peek(
  path?: string,
): { path: string; result: unknown } {
  const queryPath = path ?? "F1";
  const envelope = getCurrentEnvelope();
  const result = queryEnvelopePath(envelope, queryPath);
  return {
    path: queryPath,
    result,
  };
}

/**
 * Certified Atomic Tool (k = 2)
 * Surgically pulls a missing pre-compaction turn from the cold archive without history replay.
 * Hard-capped budget bound: <= 2,000 tokens.
 */
export function retransmit(
  turnId: string | number,
  options?: { maxTokens?: number },
): {
  ok: boolean;
  turnId: string | number;
  content?: string;
  tokens?: number;
  error?: string;
} {
  const maxTokens = Math.min(
    options?.maxTokens ?? MAX_RETRANSMIT_BUDGET_TOKENS,
    MAX_RETRANSMIT_BUDGET_TOKENS,
  );

  const rawContent = archiveStore.get(turnId);
  if (!rawContent) {
    return {
      ok: false,
      turnId,
      error: `Turn "${turnId}" not found in pre-compaction archive`,
    };
  }

  const estimatedTokens = Math.max(1, Math.ceil(rawContent.length / 4));
  if (estimatedTokens > maxTokens) {
    const truncatedChars = maxTokens * 4;
    const truncatedContent = rawContent.slice(0, truncatedChars) + "\n...[TRUNCATED AT RETRANSMIT BUDGET LIMIT]";
    return {
      ok: true,
      turnId,
      content: truncatedContent,
      tokens: maxTokens,
    };
  }

  return {
    ok: true,
    turnId,
    content: rawContent,
    tokens: estimatedTokens,
  };
}

/**
 * Certified Atomic Tool (k = 2)
 * Sends forward routing intent for the next turn cycle (bandwidth negotiation).
 */
export function bandwidth_negotiate(
  route: RoutingMode,
  reason?: string,
): { ok: true; requestedRoute: RoutingMode; reason?: string } {
  requestedForwardRoute = route;
  return {
    ok: true,
    requestedRoute: route,
    reason,
  };
}

import { Type } from "typebox";
import { type AnyAgentTool, jsonResult } from "./common.js";

/**
 * OpenClaw Agent Tool Factory for Self-State Envelope & Peek interface.
 */
export function createEnvelopeTools(): AnyAgentTool[] {
  return [
    {
      name: "peek",
      label: "Envelope Peek",
      description: "Query a specific frame or field from the agent self-state envelope on demand (e.g. 'F1.headroom', 'F2.lastEvent', 'F3.route', 'F4.offloaded', 'platform.version'). Returns minimal structured JSON (< 40 tokens).",
      parameters: Type.Object(
        {
          path: Type.Optional(
            Type.String({ description: "Dotted path expression (e.g. 'F1.headroom', 'F2', 'F3.activeRoute'). Defaults to 'F1'." }),
          ),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { path?: string }) => {
        return jsonResult(peek(params.path));
      },
    },
    {
      name: "retransmit",
      label: "Retransmit Dropped Turn",
      description: "Surgically retrieve a missing pre-compaction turn from the cold session archive without history replay. Bounded to <= 2,000 tokens.",
      parameters: Type.Object(
        {
          turnId: Type.Union([Type.String(), Type.Number()], { description: "ID of the dropped turn to retrieve." }),
          maxTokens: Type.Optional(Type.Number({ description: "Safety token limit (max 2000)." })),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { turnId: string | number; maxTokens?: number }) => {
        return jsonResult(retransmit(params.turnId, { maxTokens: params.maxTokens }));
      },
    },
    {
      name: "bandwidth_negotiate",
      label: "Bandwidth Negotiate",
      description: "Request forward routing mode for subsequent turns (e.g. 'fits', 'truncate_tool_results', 'compact_only', 'stream_lean').",
      parameters: Type.Object(
        {
          route: Type.Union([
            Type.Literal("fits"),
            Type.Literal("truncate_tool_results"),
            Type.Literal("compact_only"),
            Type.Literal("stream_lean"),
          ], { description: "Desired forward routing mode." }),
          reason: Type.Optional(Type.String({ description: "Operational rationale." })),
        },
        { additionalProperties: false },
      ),
      execute: async (_toolCallId: string, params: { route: RoutingMode; reason?: string }) => {
        return jsonResult(bandwidth_negotiate(params.route, params.reason));
      },
    },
  ];
}

