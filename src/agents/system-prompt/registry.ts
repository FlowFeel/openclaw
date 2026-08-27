/**
 * Pure Prompt Section Primitive Registry & Metadata Catalog.
 * Goldilocks decomposition unit (< 90 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 * @dft:axiom A3 (Zero-Hardcoding Invariant)
 */

import type { PromptSectionDescriptor } from "./types.js";

const SECTION_CATALOG: PromptSectionDescriptor[] = [
  // ── Core Mechanics Sections ──────────────────────────────────────
  { id: "tools", cacheStable: true, isMechanic: true, description: "Tool definitions and execution schemas" },
  { id: "skills", cacheStable: true, isMechanic: true, description: "Active skills manifest" },
  { id: "sandbox", cacheStable: true, isMechanic: true, description: "Container workdir and execution sandbox" },
  { id: "project-context-stable", cacheStable: true, isMechanic: true, description: "Stable workspace files (AGENTS.md, SOUL.md)" },
  { id: "cache-boundary", cacheStable: true, isMechanic: true, description: "Provider prompt cache alignment boundary" },
  { id: "temporal", cacheStable: false, isMechanic: true, description: "Current date/time, timezone, and session status" },
  { id: "runtime", cacheStable: false, isMechanic: true, description: "Runtime host, model, OS, channel, node info" },
  { id: "project-context-dynamic", cacheStable: false, isMechanic: true, description: "Dynamic workspace files" },

  // ── Zero-Cost Reservable Primitives (Empty set by default) ───────
  { id: "identity", cacheStable: true, isMechanic: false, description: "Agent persona and role identity" },
  { id: "subagent-orchestration", cacheStable: true, isMechanic: false, description: "Proactive subagent orchestration rules" },
  { id: "subagent-delegation", cacheStable: true, isMechanic: false, description: "Subagent delegation preferences" },
  { id: "interaction-style", cacheStable: true, isMechanic: false, description: "Interaction and conversational style" },
  { id: "tool-call-style", cacheStable: true, isMechanic: false, description: "Tool calling narration and approval style" },
  { id: "execution-bias", cacheStable: true, isMechanic: false, description: "Bias towards direct execution vs narration" },
  { id: "promised-work", cacheStable: true, isMechanic: false, description: "Follow-up and promised work tracking" },
  { id: "safety", cacheStable: true, isMechanic: false, description: "Safety guardrails and operational constraints" },
  { id: "openclaw-control", cacheStable: true, isMechanic: false, description: "Gateway and openclaw meta-tool instructions" },
  { id: "skill-workshop", cacheStable: true, isMechanic: false, description: "Skill authoring instructions" },
  { id: "memory", cacheStable: true, isMechanic: false, description: "Memory recall and citation rules" },
  { id: "model-aliases", cacheStable: true, isMechanic: false, description: "Dynamic model switching aliases" },
  { id: "workspace", cacheStable: true, isMechanic: false, description: "Workspace directory guidance" },
  { id: "docs", cacheStable: true, isMechanic: false, description: "Documentation access instructions" },
  { id: "bootstrap", cacheStable: true, isMechanic: false, description: "Agent bootstrap instructions" },
  { id: "workspace-files-header", cacheStable: true, isMechanic: false, description: "Workspace files header label" },
  { id: "assistant-output-directives", cacheStable: true, isMechanic: false, description: "Output formatting directives" },
  { id: "silent-replies", cacheStable: true, isMechanic: false, description: "Silent reply handling rules" },
  { id: "exec-approval", cacheStable: false, isMechanic: false, description: "Execution approval button guidance" },
  { id: "user-identity", cacheStable: false, isMechanic: false, description: "User and authorized senders metadata" },
  { id: "webchat-canvas", cacheStable: false, isMechanic: false, description: "Webchat canvas companion instructions" },
  { id: "control-ui-session", cacheStable: false, isMechanic: false, description: "Control UI companion instructions" },
  { id: "messaging", cacheStable: false, isMechanic: false, description: "Channel-specific messaging rules" },
  { id: "collapsible-details", cacheStable: false, isMechanic: false, description: "Collapsible block formatting" },
  { id: "voice", cacheStable: false, isMechanic: false, description: "Speech and voice formatting" },
  { id: "conversation-context", cacheStable: false, isMechanic: false, description: "Subagent / conversational context" },
  { id: "reactions", cacheStable: false, isMechanic: false, description: "Emoji reactions guidance" },
  { id: "watched-sessions", cacheStable: false, isMechanic: false, description: "Watched sessions markers" },
  { id: "heartbeats", cacheStable: false, isMechanic: false, description: "Heartbeat acknowledgments" },
];

export function getAvailablePromptSections(): PromptSectionDescriptor[] {
  return [...SECTION_CATALOG];
}

export function isMechanicSection(id: string): boolean {
  const descriptor = SECTION_CATALOG.find((s) => s.id === id);
  return descriptor?.isMechanic ?? false;
}

export function isCacheStableSection(id: string): boolean {
  const descriptor = SECTION_CATALOG.find((s) => s.id === id);
  return descriptor?.cacheStable ?? true;
}
