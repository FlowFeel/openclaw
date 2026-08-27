import { ct as PromptMode, r as OpenClawConfig, rt as TtsProvider } from "../types.openclaw-BwKjboya.js";
import { t as FastMode } from "../string-coerce-DJnd-JG-.js";
import { r as AssistantMessage } from "../types-CXYZYSOP.js";
import { n as RuntimeEnv } from "../runtime-DRcp7-j9.js";
import { n as PluginMetadataSnapshot } from "../plugin-metadata-snapshot.types-WHShSYVq.js";
import { C as ChannelOutboundTargetMode } from "../types.core-D0Io7PdJ.js";
import { v as SourceReplyDeliveryMode } from "../types-B2L6CuzI.js";
import { A as PromptImageOrderEntry, E as InputProvenance, O as PluginHookChannelContext, _ as UserTurnInput, v as UserTurnTranscriptRecorder } from "../templating-DvDDlopJ.js";
import { D as AuthProfileStore, E as AuthProfileFailureReason, O as OAuthCredential, T as AuthProfileCredential } from "../types-GEWvtd2r.js";
import { n as MediaFact } from "../media-facts-D4qFhaJ1.js";
import { c as readNonNegativeIntegerParam, f as readStringArrayParam, m as readStringParam, u as readPositiveIntegerParam } from "../common-DuX6Q50t.js";
import { t as jsonResult } from "../tool-results-C9lWlRXo.js";
import { $ as ensureAuthProfileStore, $o as ClientToolDefinition, Ds as ScheduledToolPolicyContext, J as resolveProfileUnusableUntilForDisplay, L as DEFAULT_PROVIDER, M as ResolvedTtsConfig, Os as TrustedSubagentCompletionHandoff, P as TtsConfigResolutionContext, Q as clearRuntimeAuthProfileStoreSnapshots, Qo as AgentStreamParams, U as resolveApiKeyForProvider, X as clearExpiredCooldowns, Y as resolveProfilesUnavailableReason, Z as isProfileInCooldown, Zo as BootstrapContextRunKind, _s as ExecApprovalContinuationPromptRange, _t as resolveAuthProfileOrder, at as replaceRuntimeAuthProfileStoreSnapshots, cs as EmbeddedAgentRunMeta, fs as MessagingToolSend, gt as resolveAuthProfileEligibility, ht as resolveApiKeyForProfile, it as loadAuthProfileStoreWithoutExternalProfiles, ks as AgentInternalEvent, mt as refreshOAuthCredentialForRuntime, ns as EmbeddedBlockChunker, nt as loadAuthProfileStoreForRuntime, ot as resolvePersistedAuthProfileOwnerAgentDir, pt as listProfilesForProvider, q as markAuthProfileBlockedUntil, rt as loadAuthProfileStoreForSecretsRuntime, st as saveAuthProfileStore, tt as findPersistedAuthProfileCredential, vt as ProviderAuthAliasLookupParams, yt as resolveProviderIdForAuth, z as ExecElevatedDefaults, zo as CliSessionBindingFacts } from "../types-CtE8kx2y.js";
import { O as RuntimePluginToolGrant, v as CliDeps } from "../types-Daqn4msP.js";
import { n as findModelInCatalog, t as modelSupportsVision } from "../model-catalog-BFibw3V_.js";
import { a as listAgentIds, c as resolveAgentDir, d as resolveDefaultAgentId, i as setAgentEffectiveModelPrimary, l as resolveAgentWorkspaceDir, o as resolveAgentConfig, r as resolveSessionAgentIds, t as resolveAgentEffectiveModelPrimary, u as resolveDefaultAgentDir } from "../agent-scope-CsoE8OJv.js";
import { d as resolveAgentIdentity, m as resolveIdentityNamePrefix, p as resolveHumanDelayConfig, u as resolveAckReaction } from "../ack-reactions-CspbdwJx.js";
import { c as projectOutboundPayloadPlanForJson } from "../deliver-BsjpmhWE.js";
import { n as ModelCatalogSnapshot, t as ModelCatalogEntry } from "../model-catalog.types-Xxg-MSqT.js";
import { a as findNormalizedProviderValue, c as resolveThinkingDefaultWithRuntimeCatalog, i as resolveModelRefFromString, l as resolveDefaultModelForAgent, n as buildConfiguredModelCatalog, o as parseModelRef, r as buildModelAliasIndex, s as resolveThinkingDefault, t as resolveAllowedModelRef } from "../model-selection-CxC5FXwt.js";
import { t as CODEX_APP_SERVER_AUTH_MARKER } from "../model-auth-markers-Bu63eVv3.js";
import { i as SerializedDurableMessagePayloadOutcome } from "../runtime-B4CkJjnr.js";
//#region src/agents/auth-profiles/path-resolve.d.ts
/** Resolve the user-facing auth profile database path. */
declare function resolveAuthStorePathForDisplay(agentDir?: string): string;
//#endregion
//#region src/agents/prepared-model-catalog.d.ts
type LoadPreparedModelCatalogParams = {
  agentId?: string;
  agentDir?: string;
  config?: OpenClawConfig;
  readOnly?: boolean;
  workspaceDir?: string;
  env?: NodeJS.ProcessEnv;
  providerDiscoveryProviderIds?: readonly string[];
  allowGatewaySubagentBinding?: boolean;
};
/** Returns the configured catalog for the current generation without starting discovery. */
declare function getPreparedModelCatalogSnapshot(params?: LoadPreparedModelCatalogParams): ModelCatalogSnapshot | undefined;
declare function loadPreparedModelCatalog(params?: LoadPreparedModelCatalogParams): Promise<ModelCatalogEntry[]>;
//#endregion
//#region src/agents/identity-avatar.d.ts
type AgentAvatarResolution = {
  kind: "none";
  reason: string;
  source?: string;
} | {
  kind: "local";
  filePath: string;
  source: string;
} | {
  kind: "remote";
  url: string;
  source: string;
} | {
  kind: "data";
  url: string;
  source: string;
};
/** Resolve the effective avatar for an agent, including config and IDENTITY.md. */
declare function resolveAgentAvatar(cfg: OpenClawConfig, agentId: string, opts?: {
  includeUiOverride?: boolean;
}): AgentAvatarResolution;
//#endregion
//#region src/agents/embedded-agent-utils.d.ts
/** Extract sanitized assistant text across all text content blocks. */
declare function extractAssistantText(msg: AssistantMessage): string;
/** Format reasoning text for markdown-friendly channel surfaces. */
declare function formatReasoningMessage(text: string): string;
//#endregion
//#region src/agents/spawned-context.d.ts
type SpawnedRunMetadata = {
  spawnedBy?: string | null;
  groupId?: string | null;
  groupChannel?: string | null;
  groupSpace?: string | null;
  workspaceDir?: string | null;
};
//#endregion
//#region src/agents/main-session-recovery-types.d.ts
type MainSessionRecoveryOwnerClaim = {
  cycleId: string;
  lifecycleGeneration: string;
  claimId: string;
  sessionId: string;
  sessionKey: string;
  runId?: string;
};
//#endregion
//#region src/agents/main-session-recovery-store.d.ts
type MainSessionRecoveryStoreTarget = {
  sessionKey: string;
  storePath: string;
};
type MainSessionRecoveryOwnerLease = MainSessionRecoveryOwnerClaim & MainSessionRecoveryStoreTarget;
//#endregion
//#region src/agents/command/types.d.ts
/** Image content block for Claude API multimodal messages. */
type ImageContent = {
  type: "image";
  data: string;
  mimeType: string;
};
/** ACP turn source markers accepted by trusted command callsites. */
type AcpTurnSource = "manual_spawn";
/** Channel/account/thread context carried into an agent run. */
type AgentRunContext = {
  messageChannel?: string;
  accountId?: string;
  groupId?: string | null;
  groupChannel?: string | null;
  groupSpace?: string | null;
  currentChannelId?: string; /** Transport-native chat/conversation ID for plugin hook identity context. */
  chatId?: string; /** Channel-specific sender/chat metadata for plugin hook identity context. */
  channelContext?: PluginHookChannelContext;
  currentThreadTs?: string;
  currentInboundAudio?: boolean;
  senderId?: string | null;
  replyToMode?: "off" | "first" | "all" | "batched";
  hasRepliedRef?: {
    value: boolean;
  };
};
/** Full trusted option surface for running an agent command. */
type AgentCommandOpts = {
  message: string; /** User-visible transcript body; defaults to message and excludes runtime-only context. */
  transcriptMessage?: string; /** Durable media metadata for the user-visible transcript turn. */
  transcriptMedia?: UserTurnInput["media"]; /** Optional image attachments for multimodal messages. */
  images?: ImageContent[]; /** Original inline/offloaded attachment order for inbound images. */
  imageOrder?: PromptImageOrderEntry[]; /** Ordered facts represented by attachment text in this prompt. */
  media?: MediaFact[]; /** Optional client-provided tools (OpenResponses hosted tools). */
  clientTools?: ClientToolDefinition[]; /** Agent id override (must exist in config). */
  agentId?: string; /** Per-run provider override. */
  provider?: string; /** Per-run model override. */
  model?: string; /** Explicit ordered fallback chain for this run. Undefined uses normal selection policy. */
  modelFallbacksOverride?: string[];
  to?: string;
  sessionId?: string;
  sessionKey?: string;
  thinking?: string;
  thinkingOnce?: string;
  verbose?: string;
  json?: boolean;
  timeout?: string;
  deliver?: boolean; /** Override delivery target (separate from session routing). */
  replyTo?: string; /** Override delivery channel (separate from session routing). */
  replyChannel?: string; /** Override delivery account id (separate from session routing). */
  replyAccountId?: string; /** Override delivery thread/topic id (separate from session routing). */
  threadId?: string | number; /** Message channel context. */
  messageChannel?: string; /** Tool-policy/output surface context. Defaults to messageChannel. */
  messageProvider?: string; /** Delivery channel. */
  channel?: string; /** Account ID for multi-account channel routing. */
  accountId?: string; /** Context for embedded run routing (channel/account/thread). */
  runContext?: AgentRunContext; /** Device-scoped operator session allowed to review approvals initiated by this run. */
  approvalReviewerDeviceId?: string; /** Internal trusted exec approval follow-up elevated defaults. */
  bashElevated?: ExecElevatedDefaults; /** Trusted span whose final cap is resolved with the selected model. */
  execApprovalContinuationPromptRange?: ExecApprovalContinuationPromptRange; /** Corresponding span in the undecorated transcript message. */
  execApprovalContinuationTranscriptPromptRange?: ExecApprovalContinuationPromptRange; /** Trusted sender identity bit for command/channel-action auth; defaults true for local CLI calls. */
  senderIsOwner?: boolean; /** Whether this caller is authorized to use provider/model per-run overrides. */
  allowModelOverride?: boolean; /** Optional runtime tool allow-list; when set, only these tools are exposed for this run. */
  toolsAllow?: string[]; /** Trusted owner-scoped plugin tool grant; normal policy and deny rules still apply. */
  runtimePluginToolGrant?: RuntimePluginToolGrant; /** Consumed in-process subagent-completion capability; never accepted from public RPC params. */
  trustedInternalHandoff?: TrustedSubagentCompletionHandoff; /** Internal marker identifying a server-managed default cap. */
  toolsAllowIsDefault?: boolean; /** Trusted server-stamped authority for an explicitly capped scheduled run. */
  scheduledToolPolicy?: ScheduledToolPolicyContext; /** Preserve the originating run's message-tool policy across internal continuation turns. */
  requireExplicitMessageTarget?: boolean;
  cliSessionBindingFacts?: CliSessionBindingFacts; /** Group/spawn metadata for subagent policy inheritance and routing context. */
  groupId?: SpawnedRunMetadata["groupId"];
  groupChannel?: SpawnedRunMetadata["groupChannel"];
  groupSpace?: SpawnedRunMetadata["groupSpace"];
  spawnedBy?: SpawnedRunMetadata["spawnedBy"];
  deliveryTargetMode?: ChannelOutboundTargetMode;
  bestEffortDeliver?: boolean;
  abortSignal?: AbortSignal;
  lane?: string;
  runId?: string; /** Immutable gateway lifecycle ownership captured when this run was admitted. */
  lifecycleGeneration?: string; /** Called once when the selected runtime actually admits the prompt for execution. */
  onExecutionStarted?: () => void;
  extraSystemPrompt?: string; /** Bootstrap workspace context injection mode for this run. */
  bootstrapContextMode?: "full" | "lightweight"; /** Run kind hint for bootstrap context behavior. */
  bootstrapContextRunKind?: BootstrapContextRunKind;
  internalEvents?: AgentInternalEvent[];
  inputProvenance?: InputProvenance; /** Internal runs can execute against a session without updating visible status/model/usage. */
  sessionEffects?: "visible" | "internal"; /** Internal handoffs can write transcript turns without changing user-facing model/usage state. */
  preserveUserFacingSessionModelState?: boolean; /** Visible source replies must be sent through the message tool when set. */
  sourceReplyDeliveryMode?: SourceReplyDeliveryMode; /** Internal runs can omit the channel message tool entirely. */
  disableMessageTool?: boolean; /** Collector children fail closed instead of emitting operator approval requests. */
  swarmCollector?: boolean; /** Synthetic structured_output input schema for collector children. */
  swarmOutputSchema?: Record<string, unknown>; /** Restrict this reconstructed run to restart-safe tools. */
  forceRestartSafeTools?: boolean;
  forceCodeModeTools?: boolean; /** Host-owned exact media set for a scoped automatic recovery delivery. */
  internalDeliveryMediaUrls?: string[];
  internalDeliverySuppressText?: boolean; /** Gateway ingress that already persisted visible activity can skip the duplicate pre-run touch. */
  skipInitialSessionTouch?: boolean; /** Per-call stream param overrides (best-effort). */
  streamParams?: AgentStreamParams; /** Resolved per-run fast mode from channel/directive handling. */
  fastMode?: FastMode; /** Resolved per-run auto cutoff seconds for fast mode. */
  fastModeAutoOnSeconds?: number; /** Explicit workspace directory override (for subagents to inherit parent workspace). */
  workspaceDir?: SpawnedRunMetadata["workspaceDir"]; /** Explicit task working directory for this run. Bootstrap still uses workspaceDir. */
  cwd?: string; /** Force bundled MCP teardown when a one-shot local run completes. */
  cleanupBundleMcpOnRunEnd?: boolean; /** Force long-lived CLI live session teardown when a one-shot local run completes. */
  cleanupCliLiveSessionOnRunEnd?: boolean; /** Mark explicit one-shot local CLI runs so plugin tools can release resources promptly. */
  oneShotCliRun?: boolean; /** Gateway-owned runs can late-bind plugin subagent and node runtime helpers. */
  allowGatewaySubagentBinding?: boolean; /** Opaque foreground fence transferred by Gateway after atomic session admission. */
  mainRestartRecoveryOwnerLease?: MainSessionRecoveryOwnerLease; /** Gateway already consumed this automatic recovery run's durable reservation. */
  mainRestartRecoveryAdmitted?: boolean; /** Called when the actual run model is selected, including fallback retries. */
  onActiveModelSelected?: (ctx: {
    provider: string;
    model: string;
  }) => void | Promise<void>; /** Called when every candidate in the run's model fallback chain failed. */
  onModelFallbackExhausted?: () => void; /** Called before delivery projection when the raw run contains an error payload. */
  onResultErrorPayload?: (message?: string) => void; /** Called when compaction rotates the active run onto a successor session. */
  onSessionIdChanged?: (sessionId: string) => void; /** Internal one-shot model probe mode: no tools, no workspace/chat prompt policy. */
  modelRun?: boolean; /** Internal prompt-mode override for trusted local/gateway callsites. */
  promptMode?: PromptMode; /** Internal ACP-ready session turn source. Manual spawn turns bypass only the dispatch gate. */
  acpTurnSource?: AcpTurnSource; /** Internal handoffs can feed the model without writing the synthetic prompt to transcript. */
  suppressPromptPersistence?: boolean; /** Gateway/channel ingress can provide a canonical user-turn persistence owner. */
  userTurnTranscriptRecorder?: UserTurnTranscriptRecorder;
};
/** Restricted option surface for external ingress callsites. */
type AgentCommandIngressOpts = Omit<AgentCommandOpts, "senderIsOwner" | "allowModelOverride"> & {
  /** Trusted sender identity bit for command/channel-action auth; defaults false for ingress. */senderIsOwner?: boolean; /** Ingress callsites must always pass explicit model-override authorization state. */
  allowModelOverride: boolean;
};
//#endregion
//#region src/agents/agent-command.d.ts
/** Runs an agent turn from an inbound channel/gateway ingress context. */
declare function agentCommandFromIngress(opts: AgentCommandIngressOpts, runtime?: RuntimeEnv, deps?: CliDeps): Promise<{
  payloads: ReturnType<typeof projectOutboundPayloadPlanForJson>;
  meta: EmbeddedAgentRunMeta;
  didSendViaMessagingTool?: boolean;
  messagingToolSentTexts?: string[];
  messagingToolSentMediaUrls?: string[];
  messagingToolSentTargets?: MessagingToolSend[];
  deliverySucceeded?: boolean;
  deliveryStatus?: {
    requested: true;
    attempted: boolean;
    status: "sent" | "suppressed" | "partial_failed" | "failed";
    succeeded: true | false | "partial";
    error?: true;
    errorMessage?: string;
    reason?: string;
    resultCount?: number;
    sentBeforeError?: true;
    payloadOutcomes?: SerializedDurableMessagePayloadOutcome[];
  };
}>;
//#endregion
//#region src/tts/tts-settings.d.ts
declare function resolveTtsConfig(cfgInput: OpenClawConfig, contextOrAgentId?: string | TtsConfigResolutionContext): ResolvedTtsConfig;
declare function resolveTtsPrefsPath(config: ResolvedTtsConfig): string;
//#endregion
//#region src/tts/runtime-api.d.ts
declare function getTtsProvider(config: ResolvedTtsConfig, prefsPath: string): TtsProvider;
//#endregion
//#region src/plugin-sdk/agent-runtime.d.ts
type LoadModelCatalogCompatibilityParams = LoadPreparedModelCatalogParams & {
  /** @deprecated Lifecycle publication owns refreshes; retained for source compatibility. */useCache?: boolean; /** @deprecated Use getPreparedModelCatalogSnapshot for new nonblocking readers. */
  cacheOnly?: boolean; /** @deprecated Plugin metadata belongs to the published lifecycle generation. */
  metadataSnapshot?: PluginMetadataSnapshot;
};
/** @deprecated Use loadPreparedModelCatalog or getPreparedModelCatalogSnapshot. */
declare function loadModelCatalog(params?: LoadModelCatalogCompatibilityParams): Promise<ModelCatalogEntry[]>;
//#endregion
export { type AgentAvatarResolution, type AuthProfileCredential, type AuthProfileFailureReason, type AuthProfileStore, CODEX_APP_SERVER_AUTH_MARKER, DEFAULT_PROVIDER, EmbeddedBlockChunker, type ModelCatalogEntry, type OAuthCredential, type ProviderAuthAliasLookupParams, type ResolvedTtsConfig, agentCommandFromIngress, buildConfiguredModelCatalog, buildModelAliasIndex, clearExpiredCooldowns, clearRuntimeAuthProfileStoreSnapshots, ensureAuthProfileStore, extractAssistantText, findModelInCatalog, findNormalizedProviderValue, findPersistedAuthProfileCredential, formatReasoningMessage, getPreparedModelCatalogSnapshot, getTtsProvider, isProfileInCooldown, jsonResult, listAgentIds, listProfilesForProvider, loadAuthProfileStoreForRuntime, loadAuthProfileStoreForSecretsRuntime, loadAuthProfileStoreWithoutExternalProfiles, loadModelCatalog, loadPreparedModelCatalog, markAuthProfileBlockedUntil, modelSupportsVision, parseModelRef, readNonNegativeIntegerParam, readPositiveIntegerParam, readStringArrayParam, readStringParam, refreshOAuthCredentialForRuntime, replaceRuntimeAuthProfileStoreSnapshots, resolveAckReaction, resolveAgentAvatar, resolveAgentConfig, resolveAgentDir, resolveAgentEffectiveModelPrimary, resolveAgentIdentity, resolveAgentWorkspaceDir, resolveAllowedModelRef, resolveApiKeyForProfile, resolveApiKeyForProvider, resolveAuthProfileEligibility, resolveAuthProfileOrder, resolveAuthStorePathForDisplay, resolveDefaultAgentDir, resolveDefaultAgentId, resolveDefaultModelForAgent, resolveHumanDelayConfig, resolveIdentityNamePrefix, resolveModelRefFromString, resolvePersistedAuthProfileOwnerAgentDir, resolveProfileUnusableUntilForDisplay, resolveProfilesUnavailableReason, resolveProviderIdForAuth, resolveSessionAgentIds, resolveThinkingDefault, resolveThinkingDefaultWithRuntimeCatalog, resolveTtsConfig, resolveTtsPrefsPath, saveAuthProfileStore, setAgentEffectiveModelPrimary };