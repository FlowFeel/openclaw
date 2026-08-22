import { ct as PromptMode, it as MemoryCitationsMode, r as OpenClawConfig } from "./types.openclaw-DqdTE9e3.js";
import { N as ChatType } from "./types.base-BYV-OxM1.js";
import { H as SandboxDockerSettings } from "./types.slack-DInXzgyw.js";
import { o as ImageContent } from "./types-CXYZYSOP.js";
import { n as PluginManifestRegistry } from "./manifest-registry-CVXQFOT4.js";
import { o as ChannelAgentTool } from "./types.core-VzIpsUlT.js";
import { i as AgentToolResult, n as AgentMessage, r as AgentTool } from "./index-B4PKL_IC.js";
import { f as MessagePresentation } from "./payload-D0D49c9Y.js";
import { p as SessionToolOverrides, v as SourceReplyDeliveryMode } from "./types-CJ2AFyfH.js";
import { A as PromptImageOrderEntry, E as InputProvenance, O as PluginHookChannelContext } from "./templating-BhJuWyZk.js";
import { T as AuthProfileCredential } from "./types-DUpcSR87.js";
import { n as MediaFact } from "./media-facts-D4qFhaJ1.js";
import { n as AnyAgentTool } from "./common-DuX6Q50t.js";
import { A as TranscriptRewriteResult, As as SandboxBackendHandle, C as ContextEngineHostCapability, Cs as mergeAgentRunAttemptTerminal, Ct as ProviderRuntimePluginHandle, D as ContextEngineRuntimeContext, Ds as ScheduledToolPolicyContext, E as ContextEnginePromptCacheInfo, Es as setAgentRunAttemptTerminalFailure, Fn as AgentToolResultMiddlewareEvent, Ms as SandboxFsBridge, Nn as AgentToolResultMiddleware, O as ContextEngineRuntimeSettings, On as CodexAppServerExtensionContext, Os as TrustedSubagentCompletionHandoff, Pi as AgentHarnessSettledTurnFinalizationResult, Pn as AgentToolResultMiddlewareContext, Ps as SessionMcpRuntime, R as EmbeddedRunTrigger, S as ContextEngine, Ts as projectAgentRunAttemptTerminal, Zo as BootstrapContextRunKind, as as BuildAgentRuntimePlanParams, b as AssembleResult, d as requestDeferredPluginToolApproval, fs as MessagingToolSend, h as BeforeToolCallFailureDisposition, is as AgentRuntimePlan, jn as CodexAppServerToolResultEvent, js as SandboxBackendId, k as ContextEngineSessionTarget, kn as CodexAppServerExtensionFactory, ls as NormalizedUsage, n as EmbeddedRunAttemptResult, na as ProviderRuntimeModel, os as ResolvedProviderAuth, t as EmbeddedRunAttemptParams$1, v as HookContext, w as ContextEngineOperation, wi as AgentHarnessAttemptResult, ws as normalizeAgentRunAttemptTerminal, x as CompactResult, zn as OpenClawAgentToolResult } from "./types-CWvW31qx.js";
import { O as RuntimePluginToolGrant } from "./types-C716i8hP.js";
import { a as SkillUsagePath, n as SkillEligibilityContext, r as SkillSnapshot } from "./types-Bef8ClZo2.js";
import { D as PluginHookToolRequesterContext, a as PluginHookAgentContext, f as PluginHookLlmInputEvent, l as PluginHookContextWindowSource, o as PluginHookAgentEndEvent, p as PluginHookLlmOutputEvent, s as PluginHookBeforeAgentFinalizeEvent, t as getGlobalHookRunner } from "./hook-runner-global-B0HTZ6t_.js";
import { t as DiagnosticTraceContext } from "./diagnostic-trace-context-c5mRZYEt.js";
import { c as FailoverReason } from "./types-DmCy-ZCV.js";
import { n as OperatorScope } from "./types.plugin-CaaEEgNZ.js";
import { t as SubsystemLogger } from "./subsystem-RmDRaRJV.js";
import { r as QuestionWaitAnswerResult, y as NodePluginToolDescriptor } from "./index-Cxqmod1M.js";
import { t as ExecPolicyOverrides } from "./exec-defaults-DKQxetkg.js";
import { f as EmbeddedAgentQueueMessageOptions } from "./preemptive-compaction-CZipTEGi.js";
import { TSchema } from "typebox";
import { RuntimeToolInputSchemaJson, RuntimeToolInputSchemaProjection, projectRuntimeToolInputSchema } from "@openclaw/ai/internal/openai";

//#region src/agents/sandbox/types.docker.d.ts
type RequiredDockerConfigKeys = "image" | "containerPrefix" | "workdir" | "readOnlyRoot" | "tmpfs" | "network" | "capDrop";
type SandboxDockerConfig = Omit<SandboxDockerSettings, RequiredDockerConfigKeys> & Required<Pick<SandboxDockerSettings, RequiredDockerConfigKeys>>;
//#endregion
//#region src/agents/sandbox/types.d.ts
type SandboxToolPolicy = {
  allow?: string[];
  deny?: string[];
};
type SandboxWorkspaceAccess = "none" | "ro" | "rw";
type SandboxBrowserContext = {
  bridgeUrl: string;
  noVncUrl?: string;
  containerName: string;
};
type SandboxContext = {
  enabled: boolean;
  backendId: SandboxBackendId;
  sessionKey: string;
  workspaceDir: string;
  agentWorkspaceDir: string;
  skillsWorkspaceDir?: string;
  skillsEligibility?: SkillEligibilityContext;
  skillUsagePaths?: SkillUsagePath[];
  workspaceAccess: SandboxWorkspaceAccess;
  runtimeId: string;
  runtimeLabel: string;
  containerName: string;
  containerWorkdir: string;
  docker: SandboxDockerConfig;
  tools: SandboxToolPolicy;
  browserAllowHostControl: boolean;
  browser?: SandboxBrowserContext;
  fsBridge?: SandboxFsBridge;
  backend?: SandboxBackendHandle;
};
//#endregion
//#region src/agents/requester-tool-policy.d.ts
type RequesterToolPolicySource = "current-request" | "persisted-child" | "completion-handoff";
//#endregion
//#region src/agents/sandbox-tool-policy.d.ts
/** Provenance marker for wildcard allowlists created from `alsoAllow`. */
declare const IMPLICIT_ALLOW_ALL_FROM_ALSO_ALLOW: unique symbol;
//#endregion
//#region src/agents/tool-policy.d.ts
/** Tool allow/deny policy shape accepted by agent and sandbox config. */
type ToolPolicyLike = {
  allow?: string[];
  deny?: string[];
  [IMPLICIT_ALLOW_ALL_FROM_ALSO_ALLOW]?: true;
};
//#endregion
//#region src/agents/conversation-capability-profile.d.ts
type ConversationCapabilityScope = "direct" | "shared" | "unknown";
type ConversationCapabilityProfileParams = {
  config?: OpenClawConfig;
  sessionKey?: string; /** Live conversation key when a sandbox/policy key is used for tool filtering. */
  runSessionKey?: string; /** Session key used for subagent capability inheritance when it differs from sessionKey. */
  sandboxSessionKey?: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
  agentDir?: string;
  agentAccountId?: string | null;
  messageProvider?: string | null;
  messageChannel?: string | null;
  chatType?: string;
  messageTo?: string | null;
  messageThreadId?: string | number | null;
  currentChannelId?: string | null;
  currentMessagingTarget?: string | null;
  currentThreadTs?: string | null;
  currentMessageId?: string | number | null;
  groupId?: string | null;
  groupChannel?: string | null;
  groupSpace?: string | null;
  memberRoleIds?: readonly string[];
  spawnedBy?: string | null;
  senderId?: string | null;
  senderName?: string | null;
  senderUsername?: string | null;
  senderE164?: string | null;
  senderIsOwner?: boolean;
  modelProvider?: string;
  modelId?: string;
  modelApi?: string;
  modelContextWindowTokens?: number;
  modelHasVision?: boolean;
  workspaceDir?: string;
  cwd?: string;
  spawnWorkspaceDir?: string;
  isCanonicalWorkspace?: boolean;
  promptMode?: PromptMode;
  skillsSnapshot?: SkillSnapshot;
  sandboxToolPolicy?: SandboxToolPolicy;
  runtimeToolAllowlist?: string[]; /** Persist the runtime allowlist as real parent authority on spawned children. */
  inheritRuntimeToolAllowlist?: boolean;
  runtimePluginToolGrant?: RuntimePluginToolGrant;
  inputProvenance?: InputProvenance; /** Consumed in-process completion capability; public callers cannot set this fact. */
  trustedInternalHandoff?: TrustedSubagentCompletionHandoff; /** Trusted server-stamped authority for an explicitly capped scheduled run. */
  scheduledToolPolicy?: ScheduledToolPolicyContext;
};
type ResolvedConversationCapabilityProfile = {
  agentId?: string;
  serviceIdentity: {
    agentId?: string;
    agentDir?: string;
    accountId?: string | null;
    runId?: string;
    sessionId?: string;
  };
  model: {
    provider?: string;
    id?: string;
    api?: string;
    contextWindowTokens?: number;
    hasVision?: boolean;
  };
  conversation: {
    scope: ConversationCapabilityScope;
    chatType?: ChatType;
    sessionKey?: string;
    policySessionKey?: string;
    runSessionKey?: string;
    sessionId?: string;
    messageProvider?: string | null;
    messageChannel?: string | null;
    messageTo?: string | null;
    messageThreadId?: string | number | null;
    currentChannelId?: string | null;
    currentMessagingTarget?: string | null;
    currentThreadTs?: string | null;
    currentMessageId?: string | number | null;
    groupId?: string | null;
    groupChannel?: string | null;
    groupSpace?: string | null;
    memberRoleIds?: readonly string[];
    spawnedBy?: string | null;
  };
  sender: {
    id?: string | null;
    name?: string | null;
    username?: string | null;
    e164?: string | null;
    isOwner?: boolean;
  };
  workspace: {
    workspaceDir?: string;
    cwd?: string;
    spawnWorkspaceDir?: string;
    workspaceRoot: string;
    runtimeRoot: string;
    spawnWorkspaceRoot?: string;
    instructionRoot?: string;
    isCanonicalWorkspace?: boolean;
  };
  instructions: {
    agentDir?: string;
    workspaceDir?: string;
    promptMode?: PromptMode;
    isCanonicalWorkspace?: boolean;
  };
  skills: {
    snapshot?: SkillSnapshot;
  };
  policy: {
    agentId?: string;
    sessionKey?: string;
    subagentSessionKey?: string;
    trustedGroup: {
      groupId: string | null | undefined;
      dropped: boolean;
    };
    profile?: string;
    providerProfile?: string;
    profilePolicy?: ToolPolicyLike;
    providerProfilePolicy?: ToolPolicyLike;
    profileAlsoAllow?: string[];
    providerProfileAlsoAllow?: string[];
    globalPolicy?: SandboxToolPolicy;
    globalProviderPolicy?: SandboxToolPolicy;
    agentPolicy?: SandboxToolPolicy;
    agentProviderPolicy?: SandboxToolPolicy;
    groupPolicy?: SandboxToolPolicy;
    senderPolicy?: SandboxToolPolicy;
    sandboxPolicy?: SandboxToolPolicy;
    subagentPolicy?: SandboxToolPolicy;
    inheritedToolPolicy?: SandboxToolPolicy;
    delegated: boolean;
    requesterPolicySource: RequesterToolPolicySource;
    runtimeToolPolicyForInheritance?: ToolPolicyLike;
    inheritancePolicies: Array<ToolPolicyLike | undefined>;
    explicitToolAllowlist: string[]; /** Explicit config/runtime grants only; excludes built-in profile expansion. */
    explicitToolOverrideAllowlist: string[];
    explicitToolDenylist: string[];
    runtimePluginToolGrant?: RuntimePluginToolGrant;
  };
};
//#endregion
//#region src/agents/agent-bundle-mcp-harness.d.ts
type RequesterScopedHarnessMcpTools = {
  /** Executable tools for this turn (live binding or not-connected stubs). */tools: AnyAgentTool[];
  /**
   * Session-stable advertised tool surface for dynamic-tool fingerprints.
   * Identical for every sender once the session has observed a scoped catalog.
   */
  advertisedTools: AnyAgentTool[];
  dispose: () => Promise<void>;
};
type MaterializeRequesterScopedMcpToolsForHarnessRunParams = {
  sessionId: string;
  sessionKey?: string;
  workspaceDir: string;
  agentDir?: string;
  cfg?: OpenClawConfig;
  manifestRegistry?: Pick<PluginManifestRegistry, "plugins">;
  requesterSenderId?: string | null;
  agentAccountId?: string | null;
  messageChannel?: string | null;
  reservedToolNames?: Iterable<string>;
  toolsAllow?: string[]; /** When set, applies the same final effective tool policy as the embedded runner. */
  conversationCapabilityProfile?: ResolvedConversationCapabilityProfile; /** Builds a capability profile when conversationCapabilityProfile is omitted. */
  policyContext?: Omit<ConversationCapabilityProfileParams, "runtimeToolAllowlist">;
  warn?: (message: string) => void;
};
/**
 * Materialize requester-scoped MCP tools for a harness run (e.g. Codex dynamic tools).
 * Updates the session advertised-catalog cache when a requester resolves a catalog.
 * Before any requester resolves in the session, returns undefined (nothing to advertise).
 */
declare function materializeRequesterScopedMcpToolsForHarnessRun$1(params: MaterializeRequesterScopedMcpToolsForHarnessRunParams): Promise<RequesterScopedHarnessMcpTools | undefined>;
//#endregion
//#region src/plugins/bundle-mcp.d.ts
type BundleMcpDiagnostic = {
  pluginId: string;
  message: string;
};
//#endregion
//#region src/agents/codex-mcp-config.types.d.ts
/** Codex app-server `mcp_servers` config map. */
type CodexMcpServersConfig = Record<string, Record<string, unknown>>;
/** Loaded Codex thread-config patch plus diagnostics and cache metadata. */
type CodexBundleMcpThreadConfig = {
  configPatch?: {
    mcp_servers: CodexMcpServersConfig;
  };
  diagnostics: BundleMcpDiagnostic[];
  evaluated: boolean;
  fingerprint?: string;
};
/** Inputs used to load a Codex bundle-MCP thread config patch. */
type LoadCodexBundleMcpThreadConfigParams = {
  workspaceDir: string;
  cfg?: OpenClawConfig;
  toolsEnabled?: boolean;
  disableTools?: boolean;
  toolsAllow?: string[];
  toolOverrides?: Pick<SessionToolOverrides, "mcpServers" | "mcpToolsDeny">;
};
//#endregion
//#region src/version.d.ts
declare const VERSION: string;
//#endregion
//#region src/agents/agent-tools.before-tool-call.state.d.ts
/** Consume and remove hook-adjusted params for a completed tool call. */
declare function consumeAdjustedParamsForToolCall(toolCallId: string, runId?: string): unknown;
/** Consume whether policy prevented the target tool from starting. */
declare function consumePreExecutionBlockedToolCall(toolCallId: string, runId?: string): boolean;
//#endregion
//#region src/agents/embedded-agent-message-tool-source-reply.d.ts
/** Return true only when a messaging tool result proves a real visible delivery. */
declare function isDeliveredMessagingToolResult(params: {
  toolName?: string;
  args?: unknown;
  result?: unknown;
  hookResult?: unknown;
  isError?: boolean;
}): boolean;
/**
 * Only delivered message actions on the confirmed current route qualify.
 * Explicit routes require an authoritative current-source marker from the action runner.
 */
declare function isDeliveredMessageToolOnlySourceReplyResult(params: {
  sourceReplyDeliveryMode?: SourceReplyDeliveryMode;
  toolName: string;
  args?: unknown;
  result?: unknown;
  hookResult?: unknown;
  isError?: boolean;
  allowExplicitSourceRoute?: boolean;
}): boolean;
//#endregion
//#region src/agents/harness/errors.d.ts
/** A harness lost ownership of the session generation before the attempt could start. */
declare class AgentHarnessSessionSupersededError extends Error {
  constructor(message: string, options?: ErrorOptions);
}
/** A model-independent harness preflight failed before an attempt could start. */
declare class AgentHarnessPreflightError extends Error {
  /** Opts fallback into skipping only candidates owned by the selected harness. */
  readonly scope?: "harness";
  constructor(message: string, options?: ErrorOptions & {
    scope?: "harness";
  });
}
//#endregion
//#region src/agents/harness/settled-turn-finalization-result.d.ts
/**
 * Projects a harness-owned full attempt engine into the narrow finalization
 * contract, rejecting canonical failure or capability evidence first.
 */
declare function projectSettledTurnFinalizationAttemptResult(result: AgentHarnessAttemptResult): AgentHarnessSettledTurnFinalizationResult;
//#endregion
//#region src/agents/harness/transcript-visibility.d.ts
/**
 * Keep internal memory-maintenance turns in the audit/model transcript without
 * projecting them into user-facing chat history.
 */
declare function projectAgentHarnessTranscriptMessageForDisplay<T extends AgentMessage>(params: {
  hidden: boolean;
  message: T;
}): T;
//#endregion
//#region src/agents/execution-auth-binding.d.ts
/** Fingerprint a profile after materializing its selected SecretRef value. */
declare function fingerprintResolvedAuthProfileCredential(params: {
  profileId: string;
  credential: AuthProfileCredential;
  resolvedAuth: ResolvedProviderAuth | null | undefined;
}): string | undefined;
//#endregion
//#region src/agents/harness/user-input-bridge.d.ts
type AgentHarnessUserInputOption = {
  label: string;
  description?: string;
};
type AgentHarnessUserInputQuestion = {
  id: string;
  header: string;
  question: string;
  multiSelect?: boolean;
  isOther?: boolean;
  isSecret?: boolean;
  options?: readonly AgentHarnessUserInputOption[] | null;
};
type AgentHarnessUserInputAnswers = {
  answers: Record<string, {
    answers: string[];
  }>;
};
type AgentHarnessUserInputPromptOptions = {
  intro?: string;
  formatText?: (text: string) => string;
  secretWarning?: string;
  otherLabel?: string;
  presentation?: MessagePresentation;
};
type PromptDeliveryParams = Pick<EmbeddedRunAttemptParams$1, "onBlockReply" | "onPartialReply">;
declare function emptyAgentHarnessUserInputAnswers(): AgentHarnessUserInputAnswers;
declare function formatAgentHarnessUserInputPrompt(questions: readonly AgentHarnessUserInputQuestion[], options?: AgentHarnessUserInputPromptOptions): string;
declare function deliverAgentHarnessUserInputPrompt(params: PromptDeliveryParams, questions: readonly AgentHarnessUserInputQuestion[], options?: AgentHarnessUserInputPromptOptions): Promise<void>;
declare function buildAgentHarnessUserInputAnswers(questions: readonly AgentHarnessUserInputQuestion[], inputText: string): AgentHarnessUserInputAnswers;
declare function normalizeAgentHarnessUserInputAnswer(answer: string, question: AgentHarnessUserInputQuestion): string | undefined;
//#endregion
//#region src/agents/harness/gateway-question.d.ts
type AgentHarnessQuestionGatewayCall = (method: string, opts: {
  timeoutMs?: number;
}, params?: unknown, extra?: {
  signal?: AbortSignal;
}) => Promise<unknown>;
/** Claims the next queued plain-text message for the session's gateway question. */
declare function claimPendingAgentQuestionAnswer(params: {
  sessionKey?: string;
  text: string;
  persist?: () => Promise<void>;
}): Promise<boolean>;
/** Cancels a question before the same inbound message takes another route. */
declare function cancelPendingAgentQuestionForSession(params: {
  sessionKey?: string;
  resolvedBy: string;
}): Promise<boolean>;
type RunAgentHarnessGatewayQuestionParams = {
  questions: readonly AgentHarnessUserInputQuestion[];
  sessionKey: string;
  agentId?: string;
  runId?: string;
  timeoutMs: number;
  gatewayCall: AgentHarnessQuestionGatewayCall;
  delivery: Pick<EmbeddedRunAttemptParams$1, "onBlockReply" | "onPartialReply">;
  promptOptions?: AgentHarnessUserInputPromptOptions;
  signal?: AbortSignal;
  questionId?: string;
};
/** Registers, presents, and waits for one harness-owned gateway question record. */
declare function runAgentHarnessGatewayQuestion(params: RunAgentHarnessGatewayQuestionParams): Promise<QuestionWaitAnswerResult>;
//#endregion
//#region src/agents/harness/native-hook-relay-types.d.ts
type NativeHookRelayApprovalContext = Pick<HookContext, "approvalReviewerDeviceId" | "trigger" | "turnSourceAccountId" | "turnSourceChannel" | "turnSourceThreadId" | "turnSourceTo">;
type JsonValue = null | boolean | number | string | JsonValue[] | {
  [key: string]: JsonValue;
};
declare const NATIVE_HOOK_RELAY_EVENTS: readonly ["pre_tool_use", "post_tool_use", "permission_request", "before_agent_finalize"];
declare const NATIVE_HOOK_RELAY_PROVIDERS: readonly ["codex"];
type NativeHookRelayEvent = (typeof NATIVE_HOOK_RELAY_EVENTS)[number];
type NativeHookRelayProvider = (typeof NATIVE_HOOK_RELAY_PROVIDERS)[number];
type NativeHookRelayInvocation = {
  provider: NativeHookRelayProvider;
  relayId: string;
  event: NativeHookRelayEvent;
  nativeEventName?: string;
  agentId?: string;
  sessionId: string;
  sessionKey?: string;
  runId: string;
  cwd?: string;
  model?: string;
  turnId?: string;
  transcriptPath?: string;
  permissionMode?: string;
  stopHookActive?: boolean;
  lastAssistantMessage?: string;
  toolName?: string;
  toolUseId?: string;
  rawPayload: JsonValue;
  receivedAt: string;
};
type NativeHookRelayProcessResponse = {
  stdout: string;
  stderr: string;
  exitCode: number;
  failureDisposition?: Exclude<BeforeToolCallFailureDisposition, "blocked">;
};
type NativeHookRelayRegistration = {
  relayId: string;
  provider: NativeHookRelayProvider;
  generationMismatchGraceExpiresAtMs?: number;
  generationMismatchGraceAcceptedGeneration?: string;
  agentId?: string;
  sessionId: string;
  sessionKey?: string;
  config?: OpenClawConfig;
  runId: string;
  channelId?: string;
  requester?: PluginHookToolRequesterContext;
  approvalContext?: NativeHookRelayApprovalContext;
  allowedEvents: readonly NativeHookRelayEvent[];
  expiresAtMs: number;
  signal?: AbortSignal;
  onPreToolUseFailure?: (failure: {
    toolName: string;
    toolCallId: string;
    disposition: Exclude<BeforeToolCallFailureDisposition, "blocked">;
    durationMs: number;
  }) => void | Promise<void>;
};
type NativeHookRelayRegistrationHandle = NativeHookRelayRegistration & {
  generation?: string;
  shouldRelayEvent: (event: NativeHookRelayEvent) => boolean;
  toolMatcherForEvent: (event: NativeHookRelayEvent) => readonly string[] | undefined;
  commandForEvent: (event: NativeHookRelayEvent, options?: NativeHookRelayCommandForEventOptions) => string;
  renew: (ttlMs?: number) => void;
  unregister: () => void;
};
type RegisterNativeHookRelayParams = {
  provider: NativeHookRelayProvider;
  relayId?: string;
  generation?: string;
  generationMismatchGraceMs?: number;
  agentId?: string;
  sessionId: string;
  sessionKey?: string;
  config?: OpenClawConfig;
  runId: string;
  channelId?: string;
  requester?: PluginHookToolRequesterContext;
  approvalContext?: NativeHookRelayApprovalContext;
  allowedEvents?: readonly NativeHookRelayEvent[]; /** Whether this relay should run OpenClaw loop detection from native PreToolUse hooks. */
  preToolUseLoopDetection?: boolean;
  ttlMs?: number;
  command?: NativeHookRelayCommandOptions;
  signal?: AbortSignal;
  onPreToolUseFailure?: NativeHookRelayRegistration["onPreToolUseFailure"];
};
type NativeHookRelayCommandOptions = {
  executable?: string;
  nice?: number | false;
  nodeExecutable?: string;
  timeoutMs?: number;
};
type NativeHookRelayCommandForEventOptions = {
  timeoutMs?: number;
};
type InvokeNativeHookRelayParams = {
  provider: unknown;
  relayId: unknown;
  generation?: unknown;
  event: unknown;
  rawPayload: unknown;
  requireGeneration?: boolean;
};
type NativeHookRelayPermissionDecision = "allow" | "deny";
type NativeHookRelayPermissionApprovalResult = NativeHookRelayPermissionDecision | "allow-always" | "defer";
type ActiveNativeHookRelayRegistrationHandle = NativeHookRelayRegistrationHandle & {
  generation: string;
};
type NativeHookRelayPermissionApprovalRequest = {
  provider: NativeHookRelayProvider;
  agentId?: string;
  sessionId: string;
  sessionKey?: string;
  runId: string;
  toolName: string;
  toolCallId?: string;
  cwd?: string;
  model?: string;
  toolInput: Record<string, JsonValue>;
  signal?: AbortSignal;
};
type NativeHookRelayPermissionApprovalRequester = (request: NativeHookRelayPermissionApprovalRequest) => Promise<NativeHookRelayPermissionApprovalResult>;
type NativeHookRelayDeferredApprovalOutcome = {
  handled: true;
  outcome: "approved-once";
} | {
  handled: true;
  outcome: "denied";
  reason: string;
  failureDisposition?: Exclude<BeforeToolCallFailureDisposition, "blocked">;
};
//#endregion
//#region src/agents/harness/native-hook-relay-permissions.d.ts
type NativeHookRelayDeferredToolApprovalRequester = typeof requestDeferredPluginToolApproval;
declare function resolveNativeHookRelayDeferredToolApproval(params: {
  relayId: string;
  toolUseId?: string;
  signal?: AbortSignal;
}): Promise<NativeHookRelayDeferredApprovalOutcome | undefined>;
declare function permissionRequestToolInputKeyFingerprintForTests(toolInput: Record<string, unknown>): string;
//#endregion
//#region src/agents/harness/native-hook-relay-command.d.ts
declare function buildNativeHookRelayCommand(params: {
  provider: NativeHookRelayProvider;
  relayId: string;
  generation?: string;
  event: NativeHookRelayEvent;
  preToolUseUnavailable?: "noop";
  timeoutMs?: number;
  executable?: string;
  nice?: number | false;
  nodeExecutable?: string;
}): string;
//#endregion
//#region src/agents/harness/native-hook-relay.d.ts
declare function registerNativeHookRelay(params: RegisterNativeHookRelayParams): ActiveNativeHookRelayRegistrationHandle;
declare function invokeNativeHookRelay(params: InvokeNativeHookRelayParams): Promise<NativeHookRelayProcessResponse>;
declare function hasNativeHookRelayInvocation(params: {
  relayId: string;
  event: NativeHookRelayEvent;
  toolUseId?: string;
}): boolean;
declare const testing: {
  readonly clearNativeHookRelaysForTests: () => void;
  readonly getNativeHookRelayInvocationsForTests: () => NativeHookRelayInvocation[];
  readonly getNativeHookRelayRegistrationForTests: (relayId: string) => NativeHookRelayRegistration | undefined;
  readonly getNativeHookRelayBridgeDirForTests: () => string;
  readonly getNativeHookRelayBridgeRegistryPathForTests: (relayId: string) => string;
  readonly getNativeHookRelayBridgeRecordForTests: (relayId: string) => Record<string, unknown> | undefined;
  readonly isNativeHookRelayBridgeLookupRetryableForTests: (error: unknown, elapsedMs?: number) => boolean;
  readonly formatPermissionApprovalDescriptionForTests: (request: NativeHookRelayPermissionApprovalRequest) => string;
  readonly permissionRequestContentFingerprintForTests: (request: NativeHookRelayPermissionApprovalRequest) => string;
  readonly permissionRequestToolInputKeyFingerprintForTests: typeof permissionRequestToolInputKeyFingerprintForTests;
  readonly setNativeHookRelayPermissionApprovalRequesterForTests: (requester: NativeHookRelayPermissionApprovalRequester) => void;
  readonly setNativeHookRelayDeferredToolApprovalRequesterForTests: (requester: NativeHookRelayDeferredToolApprovalRequester) => void;
};
//#endregion
//#region src/plugins/hook-agent-context.d.ts
/** Builds channel/provider fields for plugin agent hook context. */
declare function buildAgentHookContextChannelFields(params: {
  sessionKey?: string | null;
  messageChannel?: string | null;
  messageProvider?: string | null;
  currentChannelId?: string | null;
  messageTo?: string | null;
  senderId?: string | null;
  agentAccountId?: string | null;
}): Pick<PluginHookAgentContext, "accountId" | "channel" | "channelId" | "chatId" | "messageProvider" | "senderId">;
//#endregion
//#region src/agents/run-cleanup-timeout.d.ts
type AgentCleanupLogger = {
  warn: (message: string) => void;
};
/** Run one cleanup step with timeout logging and late-rejection handling. */
declare function runAgentCleanupStep(params: {
  runId: string;
  sessionId: string;
  step: string;
  cleanup: () => Promise<void>;
  getTimeoutDetails?: () => string | undefined;
  log: AgentCleanupLogger;
  env?: NodeJS.ProcessEnv;
  timeoutMs?: number;
}): Promise<void>;
//#endregion
//#region src/agents/run-termination.d.ts
/**
 * Shared agent run termination constants.
 *
 * Runtime and stream consumers use these stable literals to recognize user or
 * controller aborts without matching free-form error text.
 */
/** Stop reason emitted when an agent run is aborted. */
declare const AGENT_RUN_ABORTED_STOP_REASON: "aborted";
/** Error text used for aborted agent runs. */
declare const AGENT_RUN_RESTART_ABORT_STOP_REASON: "restart";
declare function resolveAgentRunAbortLifecycleFields(signal: AbortSignal | undefined): {
  aborted?: true;
  stopReason?: typeof AGENT_RUN_ABORTED_STOP_REASON | typeof AGENT_RUN_RESTART_ABORT_STOP_REASON | "timeout";
};
//#endregion
//#region src/agents/agent-tools.ring-zero-context.d.ts
/**
 * Read a host-owned tool fact for the current run. This does not activate or
 * grant a tool; only the host can bind executable authority to the run scope.
 */
declare function isHostScopedAgentToolActive(toolName: string): boolean;
//#endregion
//#region src/agents/embedded-agent-runner/logger.d.ts
/**
 * Shared logger for embedded-agent runner internals.
 */
declare const log: SubsystemLogger;
//#endregion
//#region src/agents/runtime-plan/build.d.ts
/** Build the complete runtime plan for an embedded agent attempt. */
declare function buildAgentRuntimePlan(params: BuildAgentRuntimePlanParams): AgentRuntimePlan;
//#endregion
//#region src/agents/model-fallback-attempt.d.ts
type ModelFallbackResultClassification = {
  message: string;
  reason?: FailoverReason;
  status?: number;
  code?: string;
  rawError?: string;
  preserveResultOnExhaustion?: boolean;
  preserveResultPriority?: number;
} | {
  error: unknown;
} | null | undefined;
//#endregion
//#region src/agents/embedded-agent-runner/result-fallback-classifier.d.ts
/** Returns a fallback classification when an embedded run failed without user-visible output. */
declare function classifyEmbeddedAgentRunResultForModelFallback(params: {
  provider: string;
  model: string;
  result: unknown;
  hasDirectlySentBlockReply?: boolean;
  hasBlockReplyPipelineOutput?: boolean;
}): ModelFallbackResultClassification;
//#endregion
//#region src/agents/tools/gateway.d.ts
/** Optional gateway connection overrides accepted by agent tools. */
type GatewayCallOptions = {
  gatewayUrl?: string;
  gatewayToken?: string;
  timeoutMs?: number;
};
/**
 * Calls a gateway method as the agent-tool backend client with least-privilege scopes.
 */
declare function callGatewayTool<T = Record<string, unknown>>(method: string, opts: GatewayCallOptions, params?: unknown, extra?: {
  expectFinal?: boolean;
  scopes?: OperatorScope[];
  requireAgentRuntimeIdentity?: boolean;
  signal?: AbortSignal;
}): Promise<T>;
//#endregion
//#region src/shared/node-list-types.d.ts
/** Node record returned by gateway node-list endpoints. */
type NodeListNode = {
  nodeId: string;
  displayName?: string;
  platform?: string;
  version?: string;
  coreVersion?: string;
  uiVersion?: string;
  clientId?: string;
  clientMode?: string; /** This node host runs from the Gateway's own canonical node-host installation. */
  gatewayLocal?: boolean;
  remoteIp?: string;
  deviceFamily?: string;
  modelIdentifier?: string;
  pathEnv?: string;
  caps?: string[];
  commands?: string[];
  nodePluginTools?: NodePluginToolDescriptor[];
  permissions?: Record<string, boolean>;
  approvalState?: "approved" | "pending-approval" | "pending-reapproval" | "unapproved";
  pendingRequestId?: string;
  pendingDeclaredCaps?: string[];
  pendingDeclaredCommands?: string[];
  pendingDeclaredPermissions?: Record<string, boolean>;
  paired?: boolean;
  connected?: boolean;
  connectedAtMs?: number;
  lastActiveAtMs?: number;
  presenceUpdatedAtMs?: number;
  active?: boolean;
  lastSeenAtMs?: number;
  lastSeenReason?: string;
  approvedAtMs?: number;
};
//#endregion
//#region src/agents/tools/nodes-utils.d.ts
type DefaultNodeFallback = "none" | "first";
type DefaultNodeSelectionOptions = {
  capability?: string;
  fallback?: DefaultNodeFallback;
  preferLocalMac?: boolean;
};
/** Selects the implicit node target when a tool call omits an explicit node query. */
declare function selectDefaultNodeFromList(nodes: NodeListNode[], options?: DefaultNodeSelectionOptions): NodeListNode | null;
/** Lists Gateway nodes, falling back to paired-node records for older Gateway versions. */
declare function listNodes(opts: GatewayCallOptions, signal?: AbortSignal): Promise<NodeListNode[]>;
/** Resolves a node id from an already-loaded node list using shared node matching rules. */
declare function resolveNodeIdFromList(nodes: NodeListNode[], query?: string, allowDefault?: boolean, options?: {
  allowCompactDisplayName?: boolean;
}): string;
//#endregion
//#region src/auto-reply/tool-meta.d.ts
type ToolAggregateOptions = {
  markdown?: boolean;
};
/**
 * Formats one grouped tool-progress label and returns the detail segment it was
 * composed from. Callers that need both must not re-parse the label: recovering
 * the detail by stripping the rendered prefix silently yields nothing whenever
 * the prefix shape changes.
 */
/** Formats one grouped tool-progress label from a tool name and metadata entries. */
declare function formatToolAggregate(toolName?: string, metas?: string[], options?: ToolAggregateOptions): string;
//#endregion
//#region src/agents/embedded-agent-messaging.d.ts
/** Return true for core or channel-plugin messaging tool names. */
declare function isMessagingTool(toolName: string): boolean;
/** Return true when the specific tool invocation is an outbound send. */
declare function isMessagingToolSendAction(toolName: string, args: Record<string, unknown>): boolean;
//#endregion
//#region src/agents/tool-result-error.d.ts
declare function isToolResultError(result: unknown): boolean;
type ToolResultFailureKind = "blocked" | "cancelled" | "failed" | "timed_out";
/** Classify a thrown tool error without inferring cancellation from message text. */
declare function resolveToolExecutionErrorKind(error: unknown): "failed" | "timed_out";
/** Format a redacted tool error without allowing hostile getters to escape observability. */
declare function formatToolExecutionErrorMessage(error: unknown, fallback: string): string;
/** Classify a resolved structured tool result through the shared terminal contract. */
declare function resolveToolResultFailureKind(result: unknown): ToolResultFailureKind | undefined;
//#endregion
//#region src/agents/embedded-agent-subscribe.tools.d.ts
declare function sanitizeToolResult(result: unknown): unknown;
declare function filterToolResultMediaUrls(toolName: string | undefined, mediaUrls: string[], result?: unknown, trustedLocalMediaToolNames?: ReadonlySet<string>): string[];
/**
 * Extract media file paths from a tool result.
 *
 * Strategy (first match wins):
 * 1. Read structured `details.media` attachments from tool details.
 * 2. Fall back to `details.path` when image content exists (legacy imageResult).
 *
 * Returns an empty array when no media is found (e.g. embedded `read` tool
 * returns base64 image data but no file path; those need a different delivery
 * path like saving to a temp file).
 */
type ToolResultMediaArtifact = {
  mediaUrls: string[];
  audioAsVoice?: boolean;
  trustedLocalMedia?: boolean;
};
declare function extractToolResultMediaArtifact(result: unknown): ToolResultMediaArtifact | undefined;
declare function extractToolErrorMessage(result: unknown): string | undefined;
declare function extractMessagingToolSend(toolName: string, args: Record<string, unknown>, options?: {
  config?: OpenClawConfig;
  currentChannelId?: string;
  currentMessagingTarget?: string;
  currentThreadId?: string;
  currentMessageId?: string | number;
  replyToMode?: "off" | "first" | "all" | "batched";
  hasRepliedRef?: {
    value: boolean;
  };
}): MessagingToolSend | undefined;
/** Reconciles pending send evidence with the provider's successful action result. */
declare function extractMessagingToolSendResult(pending: MessagingToolSend, result: unknown): MessagingToolSend;
//#endregion
//#region src/agents/model-tool-support.d.ts
/** Returns whether a catalog model should be offered tool calls. */
declare function supportsModelTools(model: {
  compat?: unknown;
}): boolean;
//#endregion
//#region src/agents/tool-replay-safety.d.ts
/**
 * Tool names are not ownership boundaries. Callers must reject plugin/channel
 * instances before using this audited core-tool allowlist.
 */
declare function isAgentToolReplaySafe(tool: {
  name?: string;
}, options?: {
  declaredReplaySafe?: (tool: {
    name?: string;
  }) => boolean | undefined;
}): boolean;
//#endregion
//#region src/agents/channel-tool-metadata.d.ts
type ChannelAgentToolMeta = {
  channelId: string;
};
/** Read channel metadata attached to a channel-owned agent tool. */
declare function getChannelAgentToolMeta(tool: ChannelAgentTool): ChannelAgentToolMeta | undefined;
//#endregion
//#region src/agents/skill-workshop-prompt.d.ts
/**
 * System-prompt contribution for routing durable skill edits through the
 * Skill Workshop tool instead of direct filesystem writes.
 */
declare const SKILL_WORKSHOP_TOOL_NAME = "skill_workshop";
/** Build the system-prompt section for Skill Workshop routing rules. */
declare function buildSkillWorkshopPromptSection(): string[];
//#endregion
//#region src/agents/embedded-agent-runner/run/attempt.prompt-helpers.d.ts
declare function resolveAttemptFsWorkspaceOnly(params: {
  config?: OpenClawConfig;
  sessionAgentId: string;
}): boolean;
type AfterTurnRuntimeContextAttempt = Pick<EmbeddedRunAttemptParams$1, "sessionTarget" | "sessionKey" | "sandboxSessionKey" | "messageChannel" | "messageProvider" | "agentAccountId" | "currentChannelId" | "currentThreadTs" | "currentMessageId" | "config" | "skillsSnapshot" | "senderId" | "provider" | "modelId" | "agentHarnessId" | "modelSelectionLocked" | "thinkLevel" | "reasoningLevel" | "bashElevated" | "extraSystemPrompt" | "ownerNumbers" | "authProfileId" | "authProfileIdSource" | "runtimePlan"> & {
  sessionId?: EmbeddedRunAttemptParams$1["sessionId"];
};
/** Build runtime context passed into context-engine afterTurn hooks. */
declare function buildAfterTurnRuntimeContext(params: {
  attempt: AfterTurnRuntimeContextAttempt;
  workspaceDir: string;
  cwd?: string;
  agentDir: string;
  activeAgentId?: string;
  contextEnginePluginId?: string;
  tokenBudget?: number;
  currentTokenCount?: number;
  promptCache?: ContextEnginePromptCacheInfo;
}): ContextEngineRuntimeContext;
declare function buildAfterTurnRuntimeContextFromUsage(params: Omit<Parameters<typeof buildAfterTurnRuntimeContext>[0], "currentTokenCount"> & {
  lastCallUsage?: NormalizedUsage;
}): ContextEngineRuntimeContext;
//#endregion
//#region src/agents/embedded-agent-runner/run/attempt.thread-helpers.d.ts
/**
 * Returns the workspace path that must be mounted for sandboxed spawn attempts.
 * Read-only sandbox modes need the resolved workspace explicitly; full rw
 * access uses the normal workspace wiring.
 */
declare function resolveAttemptSpawnWorkspaceDir(params: {
  sandbox?: {
    enabled?: boolean;
    workspaceAccess?: string;
  } | null;
  resolvedWorkspace: string;
}): string | undefined;
//#endregion
//#region src/agents/embedded-agent-runner/run/attempt.tool-run-context.d.ts
/**
 * Builds the stable tool-run context forwarded into an embedded-attempt execution.
 */
declare function buildEmbeddedAttemptToolRunContext(params: {
  trigger?: EmbeddedRunTrigger;
  jobId?: string;
  memoryFlushWritePath?: string;
  toolsAllow?: string[];
  trace?: DiagnosticTraceContext;
}): {
  trigger?: EmbeddedRunTrigger;
  jobId?: string;
  memoryFlushWritePath?: string;
  runtimeToolAllowlist?: string[];
  trace?: DiagnosticTraceContext;
};
//#endregion
//#region src/agents/core-tool-factory-descriptors.d.ts
type OpenClawCodingToolConstructionPlan = {
  includeBaseCodingTools: boolean;
  includeShellTools: boolean;
  includeChannelTools: boolean;
  includeOpenClawTools: boolean;
  includePluginTools: boolean;
};
//#endregion
//#region src/agents/embedded-agent-runner/run/attempt-tool-construction-plan.d.ts
/**
 * Applies a runtime allowlist to a concrete tool list after expanding tool and
 * plugin groups. Undefined allowlists keep all tools; an explicit empty list
 * intentionally disables all runtime tools.
 */
declare function applyEmbeddedAttemptToolsAllow<T extends {
  name: string;
}>(tools: T[], toolsAllow?: string[], options?: {
  toolMeta?: (tool: T) => {
    pluginId: string;
  } | undefined;
}): T[];
/**
 * Decides which tool families need to be constructed for an embedded attempt.
 * This keeps allowlisted plugin/channel tools available without forcing every
 * local core tool factory to run for narrow plugin-only configurations.
 */
declare function resolveEmbeddedAttemptToolConstructionPlan(params: {
  disableTools?: boolean;
  isRawModelRun?: boolean;
  toolsEnabled?: boolean;
  toolsAllow?: string[];
  forceMessageTool?: boolean;
}): {
  constructTools: boolean;
  includeCoreTools: boolean;
  runtimeToolAllowlist?: string[];
  codingToolConstructionPlan: OpenClawCodingToolConstructionPlan;
};
//#endregion
//#region src/plugins/tools.d.ts
/** MCP bridge metadata attached to plugin tools surfaced through agent tool lists. */
type PluginToolMcpMeta = {
  serverName: string;
  safeServerName: string;
  toolName: string;
  operation: "tool" | "resources_list" | "resources_read" | "prompts_list" | "prompts_get";
  deniedBySession?: true;
  node?: {
    id: string;
    displayName?: string;
  };
};
/** Runtime metadata used to trace an agent tool back to its owning plugin registration. */
type PluginToolMeta = {
  pluginId: string;
  optional: boolean;
  replaySafe?: boolean;
  trustedLocalMedia?: boolean;
  mcp?: PluginToolMcpMeta;
};
/** Attaches plugin ownership metadata to a concrete agent tool instance. */
/** Reads plugin ownership metadata for a concrete agent tool instance. */
declare function getPluginToolMeta(tool: AnyAgentTool): PluginToolMeta | undefined;
//#endregion
//#region src/agents/harness/registry.d.ts
/** Calls each registered harness dispose hook during registry shutdown or reload. */
declare function disposeRegisteredAgentHarnesses(): Promise<void>;
//#endregion
//#region src/agents/tool-schema-projection.d.ts
/** Diagnostic for one incompatible runtime tool schema. */
type RuntimeToolSchemaDiagnostic = {
  readonly toolName: string;
  readonly toolIndex: number;
  readonly violations: readonly string[];
};
/** Runtime tool list split into compatible tools and schema diagnostics. */
type RuntimeToolSchemaInspection<TTool extends Pick<AnyAgentTool, "name" | "parameters">> = {
  readonly tools: readonly TTool[];
  readonly diagnostics: readonly RuntimeToolSchemaDiagnostic[];
};
/** Inspects runtime tool schemas and returns diagnostics without filtering tools. */
declare function inspectRuntimeToolInputSchemas(tools: readonly Pick<AnyAgentTool, "name" | "parameters">[]): RuntimeToolSchemaDiagnostic[];
/** Filters tools to those that providers can normalize before dispatch. */
declare function filterProviderNormalizableTools<TTool extends Pick<AnyAgentTool, "name" | "parameters">>(tools: readonly TTool[]): RuntimeToolSchemaInspection<TTool>;
//#endregion
//#region src/agents/runtime-plan/tools.d.ts
type AgentRuntimeToolPolicyParams<TSchemaType extends TSchema = TSchema, TResult = unknown> = {
  runtimePlan?: AgentRuntimePlan;
  tools: AgentTool<TSchemaType, TResult>[];
  provider: string;
  config?: OpenClawConfig;
  workspaceDir?: string;
  env?: NodeJS.ProcessEnv;
  modelId?: string;
  modelApi?: string | null;
  model?: ProviderRuntimeModel;
  runtimeHandle?: ProviderRuntimePluginHandle;
  allowProviderRuntimePluginLoad?: boolean;
  /**
   * Invoked on every normalization, including with an empty list, so
   * consumers can observe the all-clear and retire stale quarantine state.
   */
  onPreNormalizationSchemaDiagnostics?: (diagnostics: readonly RuntimeToolSchemaDiagnostic[], tools: readonly AgentTool<TSchemaType, TResult>[]) => void;
};
/** Normalizes tool schemas through a runtime plan or provider fallback policy. */
declare function normalizeAgentRuntimeTools<TSchemaType extends TSchema = TSchema, TResult = unknown>(params: AgentRuntimeToolPolicyParams<TSchemaType, TResult>): AgentTool<TSchemaType, TResult>[];
/** Emits runtime-plan or provider fallback diagnostics for normalized tools. */
declare function logAgentRuntimeToolDiagnostics(params: AgentRuntimeToolPolicyParams): void;
//#endregion
//#region src/agents/embedded-agent-runner/tool-schema-runtime.d.ts
type ProviderToolSchemaParams<TSchemaType extends TSchema = TSchema, TResult = unknown> = {
  tools: AgentTool<TSchemaType, TResult>[];
  provider: string;
  config?: OpenClawConfig;
  workspaceDir?: string;
  env?: NodeJS.ProcessEnv;
  modelId?: string;
  modelApi?: string | null;
  model?: ProviderRuntimeModel;
  runtimeHandle?: ProviderRuntimePluginHandle;
  allowRuntimePluginLoad?: boolean;
};
/**
 * Runs provider-owned tool-schema normalization without encoding provider
 * families in the embedded runner.
 */
declare function normalizeProviderToolSchemas<TSchemaType extends TSchema = TSchema, TResult = unknown>(params: ProviderToolSchemaParams<TSchemaType, TResult>): AgentTool<TSchemaType, TResult>[];
//#endregion
//#region src/agents/agent-bundle-mcp-names.d.ts
/**
 * Assign safe server names from the full declared set in declaration order,
 * independent of which servers resolve for a requester. Declaration order
 * preserves legacy collision-suffix ownership for existing static configs;
 * sorting here would silently swap safe names between colliding servers.
 */
declare function assignSafeServerNames(serverNames: Iterable<string>): Map<string, string>;
//#endregion
//#region src/agents/sandbox/context.d.ts
declare function resolveSandboxContext(params: {
  config?: OpenClawConfig;
  agentId?: string;
  execOverrides?: ExecPolicyOverrides;
  requireCurrentConfig?: boolean;
  sessionKey?: string;
  workspaceDir?: string;
}): Promise<SandboxContext | null>;
//#endregion
//#region src/agents/sandbox/fs-paths.d.ts
declare function resolveWritableSandboxBindHostRoots(binds: readonly string[] | undefined): string[];
declare function hasSandboxBindContainerPathAliases(binds: readonly string[] | undefined): boolean;
declare function hasSandboxBindReadonlyHostShadows(binds: readonly string[] | undefined): boolean;
//#endregion
//#region src/agents/session-write-lock.d.ts
type SessionWriteLockAcquireTimeoutConfig = OpenClawConfig;
declare function resolveSessionWriteLockAcquireTimeoutMs(_config?: SessionWriteLockAcquireTimeoutConfig, env?: NodeJS.ProcessEnv): number;
declare function resolveSessionWriteLockOptions(config?: SessionWriteLockAcquireTimeoutConfig, params?: {
  env?: NodeJS.ProcessEnv;
  maxHoldMsFallback?: number;
}): {
  timeoutMs: number;
  staleMs: number;
  maxHoldMs: number;
};
//#endregion
//#region src/plugin-sdk/session-write-lock-runtime.d.ts
type LockParams = {
  sessionFile: string;
  timeoutMs?: number;
  staleMs?: number;
  maxHoldMs?: number;
  signal?: AbortSignal;
} & ({
  targetKind: "session-key";
  allowReentrant?: boolean;
  reentrantOwner?: never;
} | {
  targetKind?: "file";
  reentrantOwner?: string;
  allowReentrant?: never;
});
/** Acquires the shipped file-artifact lock or the canonical SQLite session lease. */
declare function acquireSessionWriteLock(params: LockParams): Promise<{
  assertOwned?: () => void;
  release: () => Promise<void>;
}>;
//#endregion
//#region src/agents/harness/hook-context.d.ts
/**
 * Input facts used to build the agent portion of plugin hook events.
 *
 * Only stable run/session/model facts are forwarded to plugin hooks; config remains a local
 * construction input so hooks do not accidentally depend on mutable raw configuration.
 */
type AgentHarnessHookContext = {
  runId?: string;
  trace?: DiagnosticTraceContext;
  jobId?: string;
  agentId?: string;
  sessionKey?: string;
  sessionId?: string;
  workspaceDir?: string;
  modelProviderId?: string;
  modelId?: string;
  messageProvider?: string;
  trigger?: string;
  channelId?: string;
  contextTokenBudget?: number;
  contextWindowSource?: PluginHookContextWindowSource;
  contextWindowReferenceTokens?: number;
  config?: OpenClawConfig;
  senderId?: string;
  chatId?: string;
  channel?: string;
  channelContext?: PluginHookChannelContext;
};
//#endregion
//#region src/agents/harness/prompt-compaction-hook-helpers.d.ts
/** Prompt/developer-instruction pair after harness prompt-build hooks run. */
type AgentHarnessPromptBuildResult = {
  prompt: string;
  developerInstructions: string; /** Optional per-turn tool restriction requested by before_prompt_build hooks. */
  toolsAllow?: string[]; /** Span within prompt containing the original prompt input. */
  promptInputRange?: {
    start: number;
    end: number;
  };
};
/** Runs before-prompt hooks and returns the adjusted prompt fields. */
declare function resolveAgentHarnessBeforePromptBuildResult(params: {
  prompt: string;
  developerInstructions: string;
  messages: unknown[];
  ctx: AgentHarnessHookContext;
  bootstrapContextRunKind?: BootstrapContextRunKind;
}): Promise<AgentHarnessPromptBuildResult>;
/** Runs best-effort before-compaction hooks for a harness session. */
declare function runAgentHarnessBeforeCompactionHook(params: {
  sessionFile: string;
  messages?: AgentMessage[];
  ctx: AgentHarnessHookContext;
}): Promise<void>;
/** Runs best-effort after-compaction hooks for a harness session. */
declare function runAgentHarnessAfterCompactionHook(params: {
  sessionFile: string;
  messages?: AgentMessage[];
  ctx: AgentHarnessHookContext;
  compactedCount: number;
}): Promise<void>;
//#endregion
//#region src/agents/harness/codex-app-server-extensions.d.ts
/** Creates a runner that applies registered Codex app-server tool-result extensions. */
declare function createCodexAppServerToolResultExtensionRunner(ctx: CodexAppServerExtensionContext, factories?: CodexAppServerExtensionFactory[]): {
  applyToolResultExtensions(event: CodexAppServerToolResultEvent): Promise<AgentToolResult<unknown>>;
};
//#endregion
//#region src/agents/harness/tool-result-middleware.d.ts
declare function createAgentToolResultMiddlewareRunner(ctx: AgentToolResultMiddlewareContext, handlers?: AgentToolResultMiddleware[]): {
  applyToolResultMiddleware(event: AgentToolResultMiddlewareEvent): Promise<OpenClawAgentToolResult>;
};
//#endregion
//#region src/context-engine/host-compat.d.ts
type ContextEngineHostSupport = {
  id: string;
  label: string;
  capabilities: readonly ContextEngineHostCapability[];
};
declare const CODEX_APP_SERVER_CONTEXT_ENGINE_HOST: {
  readonly id: "codex-app-server";
  readonly label: "Codex app-server harness";
  readonly capabilities: readonly ["bootstrap", "assemble-before-prompt", "after-turn", "maintain", "compact", "runtime-llm-complete", "thread-bootstrap-projection"];
};
/** Assert that a context engine can safely run under the supplied host. */
declare function assertContextEngineHostSupport(params: {
  contextEngine: ContextEngine;
  operation: ContextEngineOperation;
  host: ContextEngineHostSupport;
}): void;
//#endregion
//#region src/agents/harness/context-engine-lifecycle.d.ts
type HarnessContextEngine = ContextEngine;
/**
 * Run optional bootstrap + bootstrap maintenance for a harness-owned context engine.
 */
declare function bootstrapHarnessContextEngine(params: {
  hadSessionFile: boolean;
  contextEngine?: HarnessContextEngine;
  sessionId: string;
  sessionKey?: string;
  sessionTarget?: ContextEngineSessionTarget;
  sessionFile: string;
  sessionManager?: unknown;
  runtimeContext?: ContextEngineRuntimeContext;
  runtimeSettings?: ContextEngineRuntimeSettings;
  contextEngineHostSupport?: ContextEngineHostSupport;
  harnessId?: string | null;
  runtimeId?: string | null;
  providerId?: string | null;
  requestedModelId?: string | null;
  modelId?: string | null;
  maxOutputTokens?: number | null;
  fallbackReason?: string | null;
  degradedReason?: string | null;
  runMaintenance?: typeof runHarnessContextEngineMaintenance;
  config?: SessionWriteLockAcquireTimeoutConfig;
  warn: (message: string) => void;
}): Promise<void>;
/**
 * Assemble model context through the active harness-owned context engine.
 */
declare function assembleHarnessContextEngine(params: {
  contextEngine?: HarnessContextEngine;
  sessionId: string;
  sessionKey?: string;
  messages: AgentMessage[];
  tokenBudget?: number;
  availableTools?: Set<string>;
  citationsMode?: MemoryCitationsMode;
  sandboxed?: boolean;
  modelId: string;
  prompt?: string;
  runtimeSettings?: ContextEngineRuntimeSettings;
  contextEngineHostSupport?: ContextEngineHostSupport;
  harnessId?: string | null;
  runtimeId?: string | null;
  providerId?: string | null;
  requestedModelId?: string | null;
  modelFamily?: string | null;
  maxOutputTokens?: number | null;
  fallbackReason?: string | null;
  degradedReason?: string | null;
}): Promise<AssembleResult | undefined>;
/**
 * Finalize a completed harness turn via afterTurn or ingest fallbacks.
 */
declare function finalizeHarnessContextEngineTurn(params: {
  contextEngine?: HarnessContextEngine;
  promptError: boolean;
  aborted: boolean;
  yieldAborted: boolean;
  sessionIdUsed: string;
  sessionKey?: string;
  sessionTarget?: ContextEngineSessionTarget;
  sessionFile: string;
  messagesSnapshot: AgentMessage[];
  prePromptMessageCount: number;
  tokenBudget?: number;
  runtimeContext?: ContextEngineRuntimeContext;
  runtimeSettings?: ContextEngineRuntimeSettings;
  contextEngineHostSupport?: ContextEngineHostSupport;
  harnessId?: string | null;
  runtimeId?: string | null;
  providerId?: string | null;
  requestedModelId?: string | null;
  modelId?: string | null;
  maxOutputTokens?: number | null;
  fallbackReason?: string | null;
  degradedReason?: string | null;
  runMaintenance?: typeof runHarnessContextEngineMaintenance;
  sessionManager?: unknown;
  config?: SessionWriteLockAcquireTimeoutConfig;
  warn: (message: string) => void; /** True when this turn belongs to a heartbeat run. */
  isHeartbeat?: boolean;
}): Promise<{
  postTurnFinalizationSucceeded: boolean;
}>;
/**
 * Build runtime context passed into harness context-engine hooks.
 */
declare function buildHarnessContextEngineRuntimeContext(params: Parameters<typeof buildAfterTurnRuntimeContext>[0]): ContextEngineRuntimeContext;
/**
 * Build runtime context passed into harness context-engine hooks from usage data.
 */
declare function buildHarnessContextEngineRuntimeContextFromUsage(params: Parameters<typeof buildAfterTurnRuntimeContextFromUsage>[0]): ContextEngineRuntimeContext;
/**
 * Run optional transcript maintenance for a harness-owned context engine.
 */
declare function runHarnessContextEngineMaintenance(params: {
  contextEngine?: HarnessContextEngine;
  sessionId: string;
  sessionKey?: string;
  sessionTarget?: ContextEngineSessionTarget;
  sessionFile: string;
  reason: "bootstrap" | "compaction" | "turn";
  sessionManager?: unknown;
  runtimeContext?: ContextEngineRuntimeContext;
  runtimeSettings?: ContextEngineRuntimeSettings;
  contextEngineHostSupport?: ContextEngineHostSupport;
  harnessId?: string | null;
  runtimeId?: string | null;
  providerId?: string | null;
  requestedModelId?: string | null;
  modelId?: string | null;
  tokenBudget?: number | null;
  maxOutputTokens?: number | null;
  fallbackReason?: string | null;
  degradedReason?: string | null;
  executionMode?: "foreground" | "background";
  onDeferredMaintenance?: (promise: Promise<void>) => void;
  config?: SessionWriteLockAcquireTimeoutConfig;
}): Promise<TranscriptRewriteResult | undefined>;
/**
 * Return true when a non-legacy context engine should affect plugin harness behavior.
 */
declare function isActiveHarnessContextEngine(contextEngine: ContextEngine | undefined): contextEngine is ContextEngine;
//#endregion
//#region src/agents/embedded-agent-runner/compaction-safety-timeout.d.ts
declare function resolveCompactionTimeoutMs(cfg?: OpenClawConfig): number;
declare function compactWithSafetyTimeout<T>(compact: (abortSignal?: AbortSignal) => Promise<T>, timeoutMs?: number, opts?: {
  abortSignal?: AbortSignal;
  onCancel?: () => void;
}): Promise<T>;
/** Parameters for a single {@link ContextEngine.compact} invocation. */
type ContextEngineCompactParams = Parameters<ContextEngine["compact"]>[0];
/**
 * Invoke a plugin-owned {@link ContextEngine.compact} bounded by the same
 * finite safety timeout that protects native runtime compaction.
 *
 * Plugin context engines that advertise `ownsCompaction` previously had their
 * `compact()` awaited with no timeout, no watchdog, and no abort signal — a
 * slow or hung plugin compaction would hang the agent turn indefinitely. This
 * wrapper closes that gap:
 *  - the call is bounded by `timeoutMs` (host-resolved, default
 *    {@link EMBEDDED_COMPACTION_TIMEOUT_MS}); on timeout it rejects with a
 *    "Compaction timed out" error so the caller's existing failure handling
 *    runs instead of hanging;
 *  - the timeout signal and caller `abortSignal` are both raced against the
 *    call (so a non-cooperating engine is still bounded) and threaded into the
 *    `compact()` params (so cooperating engines can cancel their own in-flight
 *    work).
 *
 * Callers keep their existing try/catch — a timeout or abort surfaces as a
 * thrown error, never a silent hang.
 */
declare function compactContextEngineWithSafetyTimeout(contextEngine: Pick<ContextEngine, "compact">, params: ContextEngineCompactParams, timeoutMs?: number, abortSignal?: AbortSignal): Promise<CompactResult>;
//#endregion
//#region src/context-engine/registry.d.ts
/**
 * Return the trusted plugin id that registered a resolved context engine.
 */
declare function resolveContextEngineOwnerPluginId(engine: ContextEngine | undefined | null): string | undefined;
//#endregion
//#region src/agents/harness/hook-helpers.d.ts
/** Runs best-effort after-tool-call hooks for a completed tool invocation. */
declare function runAgentHarnessAfterToolCallHook(params: {
  toolName: string;
  toolCallId: string;
  runId?: string;
  agentId?: string;
  sessionId?: string;
  sessionKey?: string;
  channelId?: string;
  startArgs: Record<string, unknown>;
  result?: unknown;
  error?: string;
  startedAt?: number;
}): Promise<void>;
/** Runs before-message-write hooks and returns the possibly rewritten message. */
declare function runAgentHarnessBeforeMessageWriteHook(params: {
  message: AgentMessage;
  agentId?: string;
  sessionKey?: string;
}): AgentMessage | null;
//#endregion
//#region src/agents/harness/lifecycle-hook-helpers.d.ts
type AgentHarnessHookRunner = ReturnType<typeof getGlobalHookRunner>;
/** Returns the current global hook runner for harness lifecycle hooks. */
declare function getAgentHarnessHookRunner(): AgentHarnessHookRunner;
/** Dispatches best-effort LLM input hooks for a harness attempt. */
declare function runAgentHarnessLlmInputHook(params: {
  event: PluginHookLlmInputEvent;
  ctx: AgentHarnessHookContext;
  hookRunner?: AgentHarnessHookRunner;
}): void;
/** Dispatches best-effort LLM output hooks for a harness attempt. */
declare function runAgentHarnessLlmOutputHook(params: {
  event: PluginHookLlmOutputEvent;
  ctx: AgentHarnessHookContext;
  hookRunner?: AgentHarnessHookRunner;
}): void;
/** Starts agent_end hooks with unref timeout behavior. */
declare function runAgentHarnessAgentEndHook(params: {
  event: PluginHookAgentEndEvent;
  ctx: AgentHarnessHookContext;
  hookRunner?: AgentHarnessHookRunner;
}): void;
/** Runs agent_end hooks and waits for completion. */
declare function awaitAgentHarnessAgentEndHook(params: {
  event: PluginHookAgentEndEvent;
  ctx: AgentHarnessHookContext;
  hookRunner?: AgentHarnessHookRunner;
}): Promise<void>;
/** Normalized before-finalize hook decision consumed by harness loops. */
type AgentHarnessBeforeAgentFinalizeOutcome = {
  action: "continue";
} | {
  action: "revise";
  reason: string;
} | {
  action: "finalize";
  reason?: string;
};
/** Runs before-finalize hooks and normalizes finalize/revise/continue decisions. */
declare function runAgentHarnessBeforeAgentFinalizeHook(params: {
  event: PluginHookBeforeAgentFinalizeEvent;
  ctx: AgentHarnessHookContext;
  hookRunner?: AgentHarnessHookRunner;
}): Promise<AgentHarnessBeforeAgentFinalizeOutcome>;
//#endregion
//#region src/agents/harness/agent-end-side-effects.d.ts
type BaseAgentEndSideEffectsParams = Parameters<typeof runAgentHarnessAgentEndHook>[0];
type AgentEndSideEffectsParams = Omit<BaseAgentEndSideEffectsParams, "ctx"> & {
  ctx: BaseAgentEndSideEffectsParams["ctx"] & {
    authProfileId?: string;
    modelIterations?: number;
    skillWorkshopAvailable?: boolean;
    compacted?: boolean;
    messageChannel?: string | null;
    chatType?: ChatType;
    agentAccountId?: string | null;
    groupId?: string | null;
    groupChannel?: string | null;
    groupSpace?: string | null;
    memberRoleIds?: readonly string[];
    spawnedBy?: string | null;
    senderName?: string | null;
    senderUsername?: string | null;
    senderE164?: string | null;
    senderIsOwner?: boolean;
  };
};
/** Starts agent-end side effects without waiting for completion. */
declare function runAgentEndSideEffects(params: AgentEndSideEffectsParams): void;
/** Runs agent-end side effects and waits for plugin/core completion. */
declare function awaitAgentEndSideEffects(params: AgentEndSideEffectsParams): Promise<void>;
//#endregion
//#region src/plugin-sdk/agent-harness-runtime.d.ts
/** Default truncation limit for user-facing tool progress output. */
declare const TOOL_PROGRESS_OUTPUT_MAX_CHARS = 8000;
/**
 * Renders the Watched Sessions prompt block for plugin-owned harness prompts.
 * Harness runtimes that assemble their own instruction layers (e.g. Codex)
 * must surface the same watched-session facts as the embedded prompt, or the
 * model keeps refusing cross-session questions on those runtimes (openclaw#114797).
 */
declare function buildWatchedSessionsHarnessContext(params: {
  config?: OpenClawConfig;
  sessionKey?: string;
  sandboxed?: boolean;
  toolNames: Iterable<string>;
  capabilityToolNames?: Iterable<string>;
}): string | undefined;
declare const agentHarnessAttemptTerminal: {
  merge: typeof mergeAgentRunAttemptTerminal;
  normalize: typeof normalizeAgentRunAttemptTerminal;
  project: typeof projectAgentRunAttemptTerminal;
  setFailure: typeof setAgentRunAttemptTerminalFailure;
};
type EmbeddedRunAttemptParams = Omit<EmbeddedRunAttemptParams$1, "trajectoryRecorder">;
/**
 * @deprecated Active-run queueing is an internal runtime concern. This legacy
 * boolean API only reports immediate queue eligibility and cannot observe async
 * runtime rejection; runtime-owned delivery paths should use acceptance-aware
 * steering instead of public SDK queueing.
 */
declare function queueAgentHarnessMessage(sessionId: string, text: string, options?: EmbeddedAgentQueueMessageOptions): boolean;
/** Detect prompt image references and load them through the same limits used by embedded runs. */
declare function detectAndLoadAgentHarnessPromptImages(params: {
  prompt: string;
  workspaceDir: string;
  model: {
    input?: string[];
  };
  existingImages?: ImageContent[];
  imageOrder?: PromptImageOrderEntry[];
  media?: MediaFact[];
  config?: OpenClawConfig;
  workspaceOnly?: boolean;
  localRoots?: readonly string[];
  sandbox?: {
    root: string;
    bridge: SandboxFsBridge;
  };
}): Promise<{
  images: ImageContent[];
  detectedRefs: Array<{
    raw: string;
    resolved: string;
    type: "path" | "media-uri";
  }>;
  loadedCount: number;
  skippedCount: number;
}>;
/** Load Codex bundle MCP thread config without forcing the heavy config module into SDK imports. */
declare function loadCodexBundleMcpThreadConfig(params: LoadCodexBundleMcpThreadConfigParams): Promise<CodexBundleMcpThreadConfig>;
/**
 * Materialize an MCP App view for a tool executed by a harness-native MCP client.
 * The harness supplies a runtime adapter so the view keeps using that exact connection.
 */
declare function prepareHarnessNativeMcpAppPreview(params: {
  runtime: SessionMcpRuntime;
  serverName: string;
  toolName: string;
  uiResourceUri: string;
  toolCallId: string;
  toolInput: unknown;
  toolResult: import("@modelcontextprotocol/sdk/types.js").CallToolResult;
  allowedAppToolNames: ReadonlySet<string>;
  resultMetaState?: "unavailable";
}): Promise<{
  mcpAppPreview: unknown;
} | undefined>;
/**
 * Materialize requester-scoped MCP tools for a harness run (dynamic tools, not
 * harness-native MCP config). Lazy-loaded so harness plugins avoid the MCP manager graph.
 */
declare function materializeRequesterScopedMcpToolsForHarnessRun(params: Parameters<typeof materializeRequesterScopedMcpToolsForHarnessRun$1>[0]): Promise<Awaited<ReturnType<typeof materializeRequesterScopedMcpToolsForHarnessRun$1>>>;
/**
 * Derive the same compact user-facing tool detail that embedded OpenClaw uses for progress logs.
 */
type ToolProgressDetailMode = "explain" | "raw";
/** Infer compact display metadata for one tool invocation from its name and arguments. */
declare function inferToolMetaFromArgs(toolName: string, args: unknown, options?: {
  detailMode?: ToolProgressDetailMode;
}): string | undefined;
/**
 * Prepare verbose tool output for user-facing progress messages.
 */
declare function formatToolProgressOutput(output: string, options?: {
  maxChars?: number;
}): string | undefined;
/** Inputs used to classify a finished harness turn with little or no visible assistant output. */
type AgentHarnessTerminalOutcomeInput = {
  assistantTexts: readonly string[];
  reasoningText?: string | null;
  planText?: string | null;
  promptError?: unknown;
  turnCompleted: boolean;
};
/** Terminal fallback classification emitted by agent harness adapters. */
type AgentHarnessTerminalOutcomeClassification = NonNullable<EmbeddedRunAttemptResult["agentHarnessResultClassification"]>;
/**
 * Classify terminal harness turns that completed without assistant output that
 * should advance fallback. Deliberate silent replies such as NO_REPLY count as
 * intentional output, while whitespace-only text remains fallback-eligible.
 * This is intentionally SDK-level so plugin harness adapters such as Codex
 * preserve the same OpenClaw-owned fallback signals as the built-in OpenClaw path
 * without re-implementing terminal-result policy.
 */
declare function classifyAgentHarnessTerminalOutcome(params: AgentHarnessTerminalOutcomeInput): AgentHarnessTerminalOutcomeClassification | undefined;
//#endregion
export { normalizeProviderToolSchemas as $, resolveNativeHookRelayDeferredToolApproval as $t, assembleHarnessContextEngine as A, SandboxContext as An, isToolResultError as At, createCodexAppServerToolResultExtensionRunner as B, callGatewayTool as Bt, runAgentHarnessLlmOutputHook as C, isDeliveredMessagingToolResult as Cn, extractMessagingToolSendResult as Ct, compactContextEngineWithSafetyTimeout as D, CodexBundleMcpThreadConfig as Dn, sanitizeToolResult as Dt, resolveContextEngineOwnerPluginId as E, VERSION as En, filterToolResultMediaUrls as Et, isActiveHarnessContextEngine as F, formatToolAggregate as Ft, SessionWriteLockAcquireTimeoutConfig as G, resolveAgentRunAbortLifecycleFields as Gt, runAgentHarnessAfterCompactionHook as H, buildAgentRuntimePlan as Ht, runHarnessContextEngineMaintenance as I, listNodes as It, hasSandboxBindContainerPathAliases as J, hasNativeHookRelayInvocation as Jt, resolveSessionWriteLockAcquireTimeoutMs as K, runAgentCleanupStep as Kt, CODEX_APP_SERVER_CONTEXT_ENGINE_HOST as L, resolveNodeIdFromList as Lt, buildHarnessContextEngineRuntimeContext as M, SandboxWorkspaceAccess as Mn, resolveToolResultFailureKind as Mt, buildHarnessContextEngineRuntimeContextFromUsage as N, isMessagingTool as Nt, compactWithSafetyTimeout as O, LoadCodexBundleMcpThreadConfigParams as On, ToolResultFailureKind as Ot, finalizeHarnessContextEngineTurn as P, isMessagingToolSendAction as Pt, assignSafeServerNames as Q, buildNativeHookRelayCommand as Qt, assertContextEngineHostSupport as R, selectDefaultNodeFromList as Rt, runAgentHarnessLlmInputHook as S, isDeliveredMessageToolOnlySourceReplyResult as Sn, extractMessagingToolSend as St, runAgentHarnessBeforeMessageWriteHook as T, consumePreExecutionBlockedToolCall as Tn, extractToolResultMediaArtifact as Tt, runAgentHarnessBeforeCompactionHook as U, log as Ut, resolveAgentHarnessBeforePromptBuildResult as V, classifyEmbeddedAgentRunResultForModelFallback as Vt, acquireSessionWriteLock as W, isHostScopedAgentToolActive as Wt, resolveWritableSandboxBindHostRoots as X, registerNativeHookRelay as Xt, hasSandboxBindReadonlyHostShadows as Y, invokeNativeHookRelay as Yt, resolveSandboxContext as Z, testing as Zt, runAgentEndSideEffects as _, fingerprintResolvedAuthProfileCredential as _n, SKILL_WORKSHOP_TOOL_NAME as _t, ToolProgressDetailMode as a, cancelPendingAgentQuestionForSession as an, filterProviderNormalizableTools as at, runAgentHarnessAgentEndHook as b, AgentHarnessPreflightError as bn, isAgentToolReplaySafe as bt, classifyAgentHarnessTerminalOutcome as c, AgentHarnessUserInputAnswers as cn, disposeRegisteredAgentHarnesses as ct, inferToolMetaFromArgs as d, AgentHarnessUserInputQuestion as dn, applyEmbeddedAttemptToolsAllow as dt, NativeHookRelayEvent as en, logAgentRuntimeToolDiagnostics as et, loadCodexBundleMcpThreadConfig as f, buildAgentHarnessUserInputAnswers as fn, resolveEmbeddedAttemptToolConstructionPlan as ft, awaitAgentEndSideEffects as g, normalizeAgentHarnessUserInputAnswer as gn, resolveAttemptFsWorkspaceOnly as gt, queueAgentHarnessMessage as h, formatAgentHarnessUserInputPrompt as hn, resolveAttemptSpawnWorkspaceDir as ht, TOOL_PROGRESS_OUTPUT_MAX_CHARS as i, AgentHarnessQuestionGatewayCall as in, RuntimeToolSchemaDiagnostic as it, bootstrapHarnessContextEngine as j, SandboxToolPolicy as jn, resolveToolExecutionErrorKind as jt, resolveCompactionTimeoutMs as k, ResolvedConversationCapabilityProfile as kn, formatToolExecutionErrorMessage as kt, detectAndLoadAgentHarnessPromptImages as l, AgentHarnessUserInputOption as ln, PluginToolMcpMeta as lt, prepareHarnessNativeMcpAppPreview as m, emptyAgentHarnessUserInputAnswers as mn, buildEmbeddedAttemptToolRunContext as mt, AgentHarnessTerminalOutcomeInput as n, NativeHookRelayProvider as nn, RuntimeToolInputSchemaJson as nt, agentHarnessAttemptTerminal as o, claimPendingAgentQuestionAnswer as on, inspectRuntimeToolInputSchemas as ot, materializeRequesterScopedMcpToolsForHarnessRun as p, deliverAgentHarnessUserInputPrompt as pn, OpenClawCodingToolConstructionPlan as pt, resolveSessionWriteLockOptions as q, buildAgentHookContextChannelFields as qt, EmbeddedRunAttemptParams as r, NativeHookRelayRegistrationHandle as rn, RuntimeToolInputSchemaProjection as rt, buildWatchedSessionsHarnessContext as s, runAgentHarnessGatewayQuestion as sn, projectRuntimeToolInputSchema as st, AgentHarnessTerminalOutcomeClassification as t, NativeHookRelayProcessResponse as tn, normalizeAgentRuntimeTools as tt, formatToolProgressOutput as u, AgentHarnessUserInputPromptOptions as un, getPluginToolMeta as ut, awaitAgentHarnessAgentEndHook as v, projectAgentHarnessTranscriptMessageForDisplay as vn, buildSkillWorkshopPromptSection as vt, runAgentHarnessAfterToolCallHook as w, consumeAdjustedParamsForToolCall as wn, extractToolErrorMessage as wt, runAgentHarnessBeforeAgentFinalizeHook as x, AgentHarnessSessionSupersededError as xn, supportsModelTools as xt, getAgentHarnessHookRunner as y, projectSettledTurnFinalizationAttemptResult as yn, getChannelAgentToolMeta as yt, createAgentToolResultMiddlewareRunner as z, NodeListNode as zt };