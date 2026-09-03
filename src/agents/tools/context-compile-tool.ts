/**
 * `context_compile` Tool — Budgeted self-assembly of the agent's own context.
 * The agent submits canonical surfaces and turns with a token ceiling; the
 * prism-ast engine returns a dominance-gated payload: canonical material
 * retained whole, turns admitted greedily into the residual, drops counted.
 * Zero JSON transcript bloat: the result carries the compiled payload and
 * per-source attribution, nothing else.
 */

import { ingestMarkdown } from "@phosphene/prism-ast/md/parsers/ingest-markdown.js";
import { compileAgentContext } from "@phosphene/prism-ast/prompt/agent/pi-adapter.js";
import { createAgentService } from "@phosphene/prism-ast/prompt/harness/service.js";
import { Type } from "typebox";
import { type AnyAgentTool, jsonResult } from "./common.js";

export const ContextCompileToolSchema = Type.Object(
  {
    canonical: Type.Array(
      Type.Object({
        name: Type.String({
          description: "Source name, e.g. 'SOUL.md' or 'topic/architecture.md'.",
        }),
        content: Type.String({ description: "Markdown content of the canonical surface." }),
      }),
      { description: "Canonical surfaces: retained whole under budget pressure." },
    ),
    turns: Type.Array(Type.String({ description: "Markdown content of one model turn." }), {
      description: "Turn content: admitted greedily into the residual budget.",
    }),
    cPrompt: Type.Integer({ minimum: 1, description: "Token ceiling for the compiled payload." }),
  },
  { additionalProperties: false },
);

export type ContextCompileParams = {
  canonical: { name: string; content: string }[];
  turns: string[];
  cPrompt: number;
};

export type ContextCompileResult =
  | {
      ok: true;
      payload: string;
      tokens: number;
      droppedTurns: number;
      perSource: { name: string; tokens: number }[];
    }
  | { ok: false; tokens: number; capacity: number; droppedTurns: 0 };

export function executeContextCompile(params: ContextCompileParams): ContextCompileResult {
  const request = {
    canonical: params.canonical.map((source) => ({
      name: source.name,
      tree: ingestMarkdown(source.content),
    })),
    turns: params.turns.map((content) => ingestMarkdown(content)),
  };
  const verdict = compileAgentContext(
    request,
    params.cPrompt,
    createAgentService({ render: "markdown" }),
  );
  if (!verdict.ok) {
    return { ok: false, tokens: verdict.tokens, capacity: verdict.capacity, droppedTurns: 0 };
  }
  return {
    ok: true,
    payload: verdict.payload,
    tokens: verdict.tokens,
    droppedTurns: verdict.droppedTurns,
    perSource: verdict.perSource,
  };
}

export function createContextCompileTool(): AnyAgentTool {
  return {
    name: "context_compile",
    label: "Compile Context",
    description:
      "Compile canonical surfaces and turns into one budgeted markdown payload. Canonical material is retained whole under budget pressure; turns compete for the residual and drops are reported. Use when assembling task context from multiple documents under a token ceiling.",
    parameters: ContextCompileToolSchema,
    execute: async (_toolCallId: string, params: unknown) => {
      const p = (params ?? {}) as Partial<ContextCompileParams>;
      const canonical = Array.isArray(p.canonical) ? p.canonical : [];
      const turns = Array.isArray(p.turns) ? p.turns : [];
      const cPrompt =
        typeof p.cPrompt === "number" && Number.isInteger(p.cPrompt) && p.cPrompt > 0
          ? p.cPrompt
          : 1;
      const result = executeContextCompile({ canonical, turns, cPrompt });
      return jsonResult<ContextCompileResult>(result);
    },
  };
}
