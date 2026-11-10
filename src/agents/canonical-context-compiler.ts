/**
 * Canonical Context Compiler — budgeted prompt assembly over the prism-ast
 * augmentation engine. Canonical persona surfaces (soul/agents/identity/
 * tools/bootstrap) are retained whole under budget pressure; dynamic session
 * content is admitted greedily into the residual, with drops counted
 * (enhancement dominance). Returns null when no verdict fits the budget —
 * callers fall back to the legacy context filter path. Zero inline regular
 * expressions.
 */

import { ingestMarkdown } from "@phosphene/prism-ast/md/parsers/ingest-markdown.js";
import { compileAgentContext } from "@phosphene/prism-ast/prompt/agent/pi-adapter.js";
import { createAgentService } from "@phosphene/prism-ast/prompt/harness/service.js";
import { contextFileBasename, isStaticPersonaBasename } from "./context-file-basenames.js";
import type { EmbeddedContextFile } from "./embedded-agent-helpers.js";

export type CanonicalCompileOptions = {
  cPrompt: number;
};

export type CanonicalCompileResult = {
  lines: string[];
  tokens: number;
  droppedTurns: number;
  /** Attribution: token account per retained source, keyed by source name. */
  perSource: readonly { name: string; tokens: number }[];
};

export function splitContextFiles(files: EmbeddedContextFile[]): {
  canonical: EmbeddedContextFile[];
  dynamic: EmbeddedContextFile[];
} {
  const canonical: EmbeddedContextFile[] = [];
  const dynamic: EmbeddedContextFile[] = [];
  for (const file of files) {
    if (isStaticPersonaBasename(contextFileBasename(file.path))) {
      canonical.push(file);
    } else {
      dynamic.push(file);
    }
  }
  return { canonical, dynamic };
}

export function compileCanonicalContextSection(params: {
  contextFiles: EmbeddedContextFile[];
  cPrompt: number;
}): CanonicalCompileResult | null {
  const { canonical, dynamic } = splitContextFiles(params.contextFiles);
  const request = {
    canonical: canonical.map((file) => ({
      name: file.path,
      tree: ingestMarkdown(file.content),
    })),
    turns: dynamic.map((file) => ingestMarkdown(file.content)),
  };

  let verdict;
  try {
    verdict = compileAgentContext(
      request,
      params.cPrompt,
      createAgentService({ render: "markdown" }),
    );
  } catch {
    return null;
  }

  if (!verdict.ok) {
    return null;
  }
  return {
    lines: verdict.payload.split("\n"),
    tokens: verdict.tokens,
    droppedTurns: verdict.droppedTurns,
    perSource: verdict.perSource,
  };
}
