import { A as StreamingMode, c as ChannelStreamingCommandTextMode, d as ChannelStreamingProgressConfig, i as BlockStreamingCoalesceConfig, j as TextChunkMode, l as ChannelStreamingConfig, r as BlockStreamingChunkConfig } from "./types.base-BYV-OxM1.js";

//#region src/channels/streaming.d.ts
type StreamingCompatEntry = {
  streaming?: unknown;
};
declare const DEFAULT_PROGRESS_DRAFT_LABELS: readonly ["Working"];
declare const DEFAULT_PROGRESS_DRAFT_INITIAL_DELAY_MS = 1500;
declare function isChannelProgressDraftWorkToolName(name: string | null | undefined): boolean;
declare function isPotentialTruncatedFinal(finalText: string): boolean;
declare function selectLongerFinalText(params: {
  finalText: string;
  candidateTexts: readonly (string | undefined)[];
}): string | undefined;
declare function resolveTranscriptBackedChannelFinalText(params: {
  finalText: string;
  resolveCandidateText: () => Promise<string | undefined>;
}): Promise<string>;
type ChannelProgressLineOptions = {
  /** Whether generated tool details should use Markdown formatting. */markdown?: boolean; /** Detail shape for tool arguments shown in progress drafts. */
  detailMode?: "explain" | "raw"; /** Whether command progress should show raw command text or status-only copy. */
  commandText?: ChannelStreamingCommandTextMode;
};
type ChannelProgressDraftRenderMode = "text" | "rich";
type AgentPlanStepStatus = "pending" | "in_progress" | "completed";
type AgentPlanStep = {
  step: string;
  status: AgentPlanStepStatus;
};
type AgentPlanStepInput = AgentPlanStep | string;
/**
 * TODO(remove): normalizes the pre-2026.7.2 string plan-step wire shape to
 * pending typed steps. Bundled producers all emit typed steps, and
 * @openclaw/codex is force-updated with core, so this only covers a plugin
 * pinned against an update. Delete once that cannot happen.
 */
declare function normalizeAgentPlanSteps(value: unknown): AgentPlanStep[] | undefined;
type ChannelProgressDraftLineInput = {
  event: "tool";
  itemId?: string;
  toolCallId?: string;
  name?: string;
  phase?: string;
  args?: Record<string, unknown>;
} | {
  event: "item";
  itemId?: string;
  toolCallId?: string;
  itemKind?: string;
  title?: string;
  name?: string;
  phase?: string;
  status?: string;
  summary?: string;
  progressText?: string;
  meta?: string;
} | {
  event: "plan";
  phase?: string;
  title?: string;
  explanation?: string;
  steps?: readonly AgentPlanStepInput[];
} | {
  event: "approval";
  phase?: string;
  title?: string;
  command?: string;
  reason?: string;
  message?: string;
} | {
  event: "command-output";
  itemId?: string;
  toolCallId?: string;
  phase?: string;
  title?: string;
  name?: string;
  status?: string;
  exitCode?: number | null;
} | {
  event: "patch";
  itemId?: string;
  toolCallId?: string;
  phase?: string;
  title?: string;
  name?: string;
  added?: string[];
  modified?: string[];
  deleted?: string[];
  summary?: string;
};
type ChannelProgressDraftLineKind = ChannelProgressDraftLineInput["event"];
type ChannelProgressDraftLine = {
  /** Stable line id used to update an existing progress line in place. */id?: string; /** Progress event family that produced this line. */
  kind: ChannelProgressDraftLineKind; /** Rendered line text before final draft truncation/prefix formatting. */
  text: string; /** Human-readable label for UI renderers. */
  label: string; /** Optional leading icon for rich or plain progress renderers. */
  icon?: string; /** Compact detail text separated from label/icon. */
  detail?: string; /** Optional lifecycle status, such as completed or exit code. */
  status?: string; /** Normalized tool name when the line represents tool work. */
  toolName?: string; /** Whether final formatting should add a bullet/line prefix. */
  prefix?: boolean;
};
/** Tools whose detail is raw command text; commandText policy applies to these. */
declare function isCommandToolName(name: string | undefined): boolean;
declare function formatChannelProgressDraftLine(/** Structured progress event to render as one draft line. */

input: ChannelProgressDraftLineInput, /** Formatting options for tool details and command text. */

options?: ChannelProgressLineOptions): string | undefined;
declare function resolveChannelProgressDraftLineOptions(/** Channel streaming config source for command-text defaults. */

entry: StreamingCompatEntry | null | undefined, /** Caller-supplied line formatting overrides. */

options?: ChannelProgressLineOptions): ChannelProgressLineOptions;
declare function buildChannelProgressDraftLineForEntry(/** Channel streaming config source for command-text defaults. */

entry: StreamingCompatEntry | null | undefined, /** Structured progress event to render as one draft line. */

input: ChannelProgressDraftLineInput, /** Formatting options for tool details and command text. */

options?: ChannelProgressLineOptions): ChannelProgressDraftLine | undefined;
declare function formatChannelProgressDraftLineForEntry(/** Channel streaming config source for command-text defaults. */

entry: StreamingCompatEntry | null | undefined, /** Structured progress event to render as one draft line. */

input: ChannelProgressDraftLineInput, /** Formatting options for tool details and command text. */

options?: ChannelProgressLineOptions): string | undefined;
declare function buildChannelProgressDraftLine(/** Structured progress event to normalize into draft-line metadata. */

input: ChannelProgressDraftLineInput, /** Formatting options for tool details and command text. */

options?: ChannelProgressLineOptions): ChannelProgressDraftLine | undefined;
declare function createChannelProgressDraftGate(params: {
  /** Callback that starts the channel progress draft. */onStart: () => void | Promise<void>; /** Delay after the first work event before a draft starts. */
  initialDelayMs?: number; /** Reports timer-fired startup failures, which have no awaiting caller. */
  onStartError?: (error: unknown) => void; /** Timer implementation, injectable for tests. */
  setTimeoutFn?: typeof setTimeout; /** Timer clearer, injectable for tests. */
  clearTimeoutFn?: typeof clearTimeout;
}): {
  readonly hasStarted: boolean;
  readonly workEvents: number;
  noteWork(): Promise<boolean>;
  startNow(): Promise<void>;
  cancel(): void;
  reset(): void;
};
declare function getChannelStreamingConfigObject(entry: StreamingCompatEntry | null | undefined): ChannelStreamingConfig | undefined;
declare function resolveChannelStreamingChunkMode(entry: StreamingCompatEntry | null | undefined): TextChunkMode | undefined;
declare function resolveChannelStreamingBlockEnabled(entry: StreamingCompatEntry | null | undefined): boolean | undefined;
declare function resolveChannelStreamingBlockCoalesce(entry: StreamingCompatEntry | null | undefined): BlockStreamingCoalesceConfig | undefined;
declare function resolveChannelStreamingPreviewChunk(entry: StreamingCompatEntry | null | undefined): BlockStreamingChunkConfig | undefined;
declare function resolveChannelStreamingPreviewToolProgress(entry: StreamingCompatEntry | null | undefined, defaultValue?: boolean,
/**
 * The channel's resolved stream mode. Only the caller knows it: channels pick
 * their own default when `streaming.mode` is unset (Discord and Telegram use
 * "progress", Slack and others "partial"), and this helper has no channel
 * identity to guess with. Omitting it reads the configured mode and treats
 * unset as "partial".
 */

mode?: StreamingMode): boolean;
declare function resolveChannelStreamingProgressCommentary(entry: StreamingCompatEntry | null | undefined, defaultValue?: boolean,
/**
 * The channel's resolved stream mode, for the same reason
 * resolveChannelStreamingPreviewToolProgress takes one: only the caller knows
 * which default applies when `streaming.mode` is unset. Guessing "partial"
 * here made `progress.commentary: true` a silent no-op on the progress-draft
 * channels, whose own default is "progress".
 */

mode?: StreamingMode): boolean;
declare function resolveChannelStreamingProgressNarration(entry: StreamingCompatEntry | null | undefined, defaultValue?: boolean): boolean;
declare function resolveChannelStreamingPreviewCommandText(entry: StreamingCompatEntry | null | undefined, defaultValue?: ChannelStreamingCommandTextMode): ChannelStreamingCommandTextMode;
declare function resolveChannelStreamingSuppressDefaultToolProgressMessages(entry: StreamingCompatEntry | null | undefined, options?: {
  draftStreamActive?: boolean;
  previewToolProgressEnabled?: boolean;
  previewStreamingEnabled?: boolean;
}): boolean;
declare function resolveChannelStreamingNativeTransport(entry: StreamingCompatEntry | null | undefined): boolean | undefined;
declare function resolveChannelPreviewStreamMode(entry: StreamingCompatEntry | null | undefined, defaultMode: StreamingMode): StreamingMode;
declare function resolveChannelProgressDraftConfig(entry: StreamingCompatEntry | null | undefined): ChannelStreamingProgressConfig;
declare function resolveChannelProgressDraftLabel(params: {
  entry?: StreamingCompatEntry | null;
  seed?: string;
  random?: () => number;
}): string | undefined;
declare function resolveChannelProgressDraftMaxLines(entry: StreamingCompatEntry | null | undefined, defaultValue?: number): number;
declare function resolveChannelProgressDraftMaxLineChars(entry: StreamingCompatEntry | null | undefined, defaultValue?: number): number;
declare function resolveChannelProgressDraftRender(entry: StreamingCompatEntry | null | undefined, defaultValue?: ChannelProgressDraftRenderMode): ChannelProgressDraftRenderMode;
declare function formatPlanChecklistLines(steps: readonly AgentPlanStep[], options: {
  maxLines: number;
  maxLineChars: number;
}): string[];
declare function normalizeChannelProgressDraftLineIdentity(/** Progress line whose duplicate/update identity should be normalized. */

line: string | ChannelProgressDraftLine | undefined): string;
declare function mergeChannelProgressDraftLine<TLine extends string | ChannelProgressDraftLine>(/** Existing progress draft lines in display order. */

lines: TLine[], /** New or updated progress line. */

line: TLine, /** Merge limits for rolling progress drafts. */

params: {
  maxLines: number;
}): TLine[];
declare function formatChannelProgressDraftText(params: {
  /** Channel streaming config source for progress label and bounds. */entry?: StreamingCompatEntry | null; /** Ordered progress lines to render. */
  lines: Array<string | ChannelProgressDraftLine>; /** Stable seed used when choosing automatic progress labels. */
  seed?: string; /** Random source used when choosing automatic progress labels. */
  random?: () => number; /** Optional formatter applied after line compaction. */
  formatLine?: (line: string) => string; /** Prefix used for plain progress lines that lack their own icon. */
  bullet?: string; /** Short narration paragraph; when present it replaces the tool lines. */
  narration?: string; /** Latest full plan snapshot, rendered independently from rolling tool lines. */
  plan?: readonly AgentPlanStep[];
}): string;
//#endregion
export { resolveChannelProgressDraftMaxLineChars as A, resolveChannelStreamingProgressCommentary as B, mergeChannelProgressDraftLine as C, resolveChannelProgressDraftConfig as D, resolveChannelPreviewStreamMode as E, resolveChannelStreamingChunkMode as F, resolveChannelStreamingSuppressDefaultToolProgressMessages as H, resolveChannelStreamingNativeTransport as I, resolveChannelStreamingPreviewChunk as L, resolveChannelProgressDraftRender as M, resolveChannelStreamingBlockCoalesce as N, resolveChannelProgressDraftLabel as O, resolveChannelStreamingBlockEnabled as P, resolveChannelStreamingPreviewCommandText as R, isPotentialTruncatedFinal as S, normalizeChannelProgressDraftLineIdentity as T, resolveTranscriptBackedChannelFinalText as U, resolveChannelStreamingProgressNarration as V, selectLongerFinalText as W, formatChannelProgressDraftText as _, ChannelProgressDraftLineInput as a, isChannelProgressDraftWorkToolName as b, ChannelProgressLineOptions as c, StreamingCompatEntry as d, buildChannelProgressDraftLine as f, formatChannelProgressDraftLineForEntry as g, formatChannelProgressDraftLine as h, ChannelProgressDraftLine as i, resolveChannelProgressDraftMaxLines as j, resolveChannelProgressDraftLineOptions as k, DEFAULT_PROGRESS_DRAFT_INITIAL_DELAY_MS as l, createChannelProgressDraftGate as m, AgentPlanStepInput as n, ChannelProgressDraftLineKind as o, buildChannelProgressDraftLineForEntry as p, AgentPlanStepStatus as r, ChannelProgressDraftRenderMode as s, AgentPlanStep as t, DEFAULT_PROGRESS_DRAFT_LABELS as u, formatPlanChecklistLines as v, normalizeAgentPlanSteps as w, isCommandToolName as x, getChannelStreamingConfigObject as y, resolveChannelStreamingPreviewToolProgress as z };