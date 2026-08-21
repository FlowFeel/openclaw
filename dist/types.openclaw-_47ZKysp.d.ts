import { t as FastMode } from "./string-coerce-D1ftETdv.js";
import { c as ModelsConfig, d as AgentRuntimePolicyConfig, f as AgentSandboxConfig, g as SecretsConfig, h as SecretRef, l as ConfiguredProviderRequest, m as SecretInput, p as AgentToolModelConfig, u as AgentModelConfig } from "./types.models-BEJn4TTJ.js";

//#region src/shared/silent-reply-policy.d.ts
type SilentReplyPolicy = "allow" | "disallow";
type SilentReplyConversationType = "direct" | "group" | "internal";
type SilentReplyPolicyShape = Partial<Record<Exclude<SilentReplyConversationType, "direct">, SilentReplyPolicy>>;
//#endregion
//#region src/transcripts/config.d.ts
/**
 * Configuration normalization for transcript capture/import.
 *
 * Raw config can contain optional auto-start provider locators; resolution
 * returns bounded defaults and drops malformed entries before runtime startup.
 */
/** Raw auto-start transcript source entry from config. */
type TranscriptsAutoStartConfig = {
  providerId: string;
  sessionId?: string;
  title?: string;
  accountId?: string;
  guildId?: string;
  channelId?: string;
  meetingUrl?: string;
};
/** Normalized auto-start source entry consumed by transcript runtime code. */
/** Raw transcripts config block. */
type TranscriptsConfig = {
  enabled?: boolean;
  autoStart?: TranscriptsAutoStartConfig[];
};
//#endregion
//#region src/config/includes.d.ts
type ConfigIncludeOwnership = {
  path: readonly string[];
  kind: "single" | "multiple";
  hasSiblingOverrides: boolean;
  targetPath?: string;
  targetPaths?: readonly string[];
};
//#endregion
//#region src/config/types.access-groups.d.ts
type DiscordChannelAudienceAccessGroup = {
  /**
   * Discord dynamic audience backed by the users who can currently view a guild
   * channel.
   */
  type: "discord.channelAudience"; /** Guild ID that owns the channel. */
  guildId: string; /** Channel ID whose effective ViewChannel permission defines the audience. */
  channelId: string; /** Audience predicate. Defaults to canViewChannel. */
  membership?: "canViewChannel";
};
type MessageSendersAccessGroup = {
  /**
   * Static sender allowlists that can be referenced by any message channel via
   * accessGroup:<name>.
   */
  type: "message.senders"; /** Sender entries by channel id, plus optional "*" entries shared by all channels. */
  members: Record<string, string[]>;
};
type AccessGroupConfig = DiscordChannelAudienceAccessGroup | MessageSendersAccessGroup;
type AccessGroupsConfig = Record<string, AccessGroupConfig>;
//#endregion
//#region packages/acp-core/src/runtime/types.d.ts
/** Runtime update tags emitted by ACP adapters; unknown backend tags are passed through. */
type AcpSessionUpdateTag = "agent_message_chunk" | "agent_thought_chunk" | "tool_call" | "tool_call_update" | "usage_update" | "available_commands_update" | "current_mode_update" | "config_option_update" | "session_info_update" | "plan" | (string & {});
//#endregion
//#region src/config/types.acp.d.ts
type AcpDispatchConfig = {
  /** Master switch for ACP turn dispatch in the reply pipeline. */enabled?: boolean;
};
type AcpStreamConfig = {
  /** Suppresses repeated ACP status/tool projection lines within a turn. */repeatSuppression?: boolean; /** Live streams chunks or waits for terminal event before delivery. */
  deliveryMode?: "live" | "final_only";
  /**
   * Per-sessionUpdate visibility overrides.
   * Keys not listed here fall back to OpenClaw defaults.
   */
  tagVisibility?: Partial<Record<AcpSessionUpdateTag, boolean>>;
};
type AcpRuntimeConfig = {
  /** Optional operator install/setup command shown by `/acp install` and `/acp doctor`. */installCommand?: string;
};
type AcpConfig = {
  /** Global ACP runtime gate. */enabled?: boolean;
  dispatch?: AcpDispatchConfig; /** Backend id registered by ACP runtime plugin (for example: acpx). */
  backend?: string; /** Fallback backend ids tried when the primary backend fails with UNAVAILABLE. */
  fallbacks?: string[];
  defaultAgent?: string;
  allowedAgents?: string[];
  stream?: AcpStreamConfig;
  runtime?: AcpRuntimeConfig;
};
//#endregion
//#region src/channels/chat-type.d.ts
/**
 * Normalized conversation kind shared by channel routing, sessions, and SDK helpers.
 */
type ChatType = "direct" | "group" | "channel";
//#endregion
//#region src/agents/system-prompt.types.d.ts
type PromptMode = "full" | "minimal" | "scaffold" | "none";
type SilentReplyPromptMode = "generic" | "none";
//#endregion
//#region src/config/types.base.d.ts
/** Typing indicator timing policy shared by channel configs. */
type TypingMode = "never" | "instant" | "thinking" | "message";
/** Session-key ownership model for inbound messages. */
type SessionScope = "per-sender" | "global";
/** DM session-key granularity across peers, channels, and accounts. */
type DmScope = "main" | "per-peer" | "per-channel-peer" | "per-account-channel-peer";
/** Which source messages outbound replies should thread or quote against. */
type ReplyToMode = "off" | "first" | "all" | "batched";
/** Group-chat admission policy for channels with allowlists. */
type GroupPolicy = "open" | "disabled" | "allowlist";
/** Direct-message admission policy for channels with pairing/allowlists. */
type DmPolicy = "pairing" | "allowlist" | "open" | "disabled";
/** How much non-allowlisted context is visible to an agent. */
type ContextVisibilityMode = "all" | "allowlist" | "allowlist_quote";
/** Text splitting strategy for outbound channel delivery. */
type TextChunkMode = "length" | "newline";
/** Preview/progress delivery mode while an agent response is still streaming. */
type StreamingMode = "off" | "partial" | "block" | "progress";
/** How command text is represented in streaming progress previews. */
type ChannelStreamingCommandTextMode = "raw" | "status";
type BlockStreamingCoalesceConfig = {
  /** Minimum buffered characters before coalesced block delivery. */minChars?: number; /** Maximum buffered characters before a block must be flushed. */
  maxChars?: number; /** Idle time in ms before flushing a partial coalesced block. */
  idleMs?: number;
};
type BlockStreamingChunkConfig = {
  /** Minimum preview chunk size before sending another draft update. */minChars?: number; /** Maximum preview chunk size before forcing a draft update. */
  maxChars?: number; /** Preferred natural boundary when splitting preview chunks. */
  breakPreference?: "paragraph" | "newline" | "sentence";
};
type ChannelStreamingProgressConfig = {
  /** Initial progress title. "auto" picks from labels; false hides the title. Default: "auto". */label?: string | false; /** Candidate labels for label="auto". Defaults to OpenClaw's built-in progress labels. */
  labels?: string[]; /** Maximum number of progress lines to keep below the label. Default: 8. */
  maxLines?: number; /** Maximum characters per compact progress line before truncation. Default: 120. */
  maxLineChars?: number; /** Progress draft renderer. "text" is the portable fallback; "rich" lets supported channels use structured UI. */
  render?: "text" | "rich"; /** Include compact tool/task progress in the draft. Default: true. */
  toolProgress?: boolean; /** Command/exec progress detail in the draft. "raw" preserves released behavior; "status" shows only the tool label. Default: "raw". */
  commandText?: ChannelStreamingCommandTextMode; /** Include assistant commentary/preamble text in the progress draft. Default: false. */
  commentary?: boolean;
  /**
   * Replace tool lines with a short utility-model narration of what the agent
   * is doing. Runs when a utility model resolves (explicit `utilityModel` or
   * the primary provider's declared default). Default: true.
   */
  narration?: boolean;
};
type ChannelStreamingPreviewConfig = {
  /** Chunking thresholds for preview-draft updates while streaming. */chunk?: BlockStreamingChunkConfig;
  /**
   * Render live tool/activity updates into the preview draft for channels that
   * edit a single preview message in place.
   * Default: true.
   */
  toolProgress?: boolean; /** Command/exec progress detail in the preview. "raw" preserves released behavior; "status" shows only the tool label. Default: "raw". */
  commandText?: ChannelStreamingCommandTextMode;
};
type ChannelStreamingBlockConfig = {
  /** Enable chunked block-reply delivery for channels that support it. */enabled?: boolean; /** Merge streamed block replies before sending. */
  coalesce?: BlockStreamingCoalesceConfig;
};
type ChannelStreamingConfig = {
  /**
   * Preview streaming mode:
   * - "off": disable preview updates
   * - "partial": update one preview in place
   * - "block": emit larger chunked preview updates
   * - "progress": progress/status preview mode for channels that support it
   */
  mode?: StreamingMode; /** Chunking mode for outbound text delivery. */
  chunkMode?: TextChunkMode;
  /**
   * Channel-specific native transport streaming toggle.
   * Used today by Slack's native stream API.
   */
  nativeTransport?: boolean;
  preview?: ChannelStreamingPreviewConfig;
  progress?: ChannelStreamingProgressConfig;
  block?: ChannelStreamingBlockConfig;
};
type ChannelDeliveryStreamingConfig = Pick<ChannelStreamingConfig, "chunkMode" | "block">;
/** Streaming subset used by channels that render visible preview/progress replies. */
type ChannelPreviewStreamingConfig = Pick<ChannelStreamingConfig, "mode" | "chunkMode" | "preview" | "progress" | "block">;
type MarkdownTableMode = "off" | "bullets" | "code" | "block";
type MarkdownConfig = {
  /** Table rendering mode (off|bullets|code|block). */tables?: MarkdownTableMode;
};
type HumanDelayConfig = {
  /** Delay style for block replies (off|natural|custom). */mode?: "off" | "natural" | "custom"; /** Minimum delay in milliseconds (default: 800). */
  minMs?: number; /** Maximum delay in milliseconds (default: 2500). */
  maxMs?: number;
};
type SessionSendPolicyAction = "allow" | "deny";
type SessionSendPolicyMatch = {
  /** Channel/provider id match. */channel?: string; /** Direct/group/thread classification when the caller has channel metadata. */
  chatType?: ChatType;
  /**
   * Session key prefix match.
   * Note: some consumers match against a normalized key (for example, stripping `agent:<id>:`).
   */
  keyPrefix?: string; /** Optional raw session-key prefix match for consumers that normalize session keys. */
  rawKeyPrefix?: string;
};
type SessionSendPolicyRule = {
  /** Action applied when match criteria select this rule. */action: SessionSendPolicyAction; /** Optional match filter; omitted match behaves as a catch-all rule. */
  match?: SessionSendPolicyMatch;
};
type SessionSendPolicyConfig = {
  /** Fallback action when no send-policy rule matches. */default?: SessionSendPolicyAction; /** Ordered allow/deny rules; first matching rule wins. */
  rules?: SessionSendPolicyRule[];
};
type SessionResetMode = "none" | "daily" | "idle";
type SessionResetConfig = {
  mode?: SessionResetMode; /** Local hour (0-23) for the daily reset boundary. */
  atHour?: number; /** Sliding idle window (minutes). When set with daily mode, whichever expires first wins. */
  idleMinutes?: number;
};
type SessionResetByTypeConfig = {
  direct?: SessionResetConfig;
  group?: SessionResetConfig;
  thread?: SessionResetConfig;
};
type SessionThreadBindingsConfig = {
  /**
   * Master switch for thread-bound session routing features.
   * Channel/provider keys can override this default.
   */
  enabled?: boolean;
  /**
   * Inactivity window for thread-bound sessions (hours).
   * Session auto-unfocuses after this amount of idle time. Set to 0 to disable. Default: 24.
   */
  idleHours?: number;
  /**
   * Optional hard max age for thread-bound sessions (hours).
   * Session auto-unfocuses once this age is reached even if active. Set to 0 to disable. Default: 0.
   */
  maxAgeHours?: number;
  /**
   * Allow channel integrations to create thread-bound work sessions from
   * sessions_spawn or native ACP spawn flows. Channel/account keys can override.
   * Default: true when thread bindings are enabled.
   */
  spawnSessions?: boolean;
  /**
   * Default context mode for native subagents spawned into a bound thread.
   * Default: "fork" so the child starts from the requester transcript.
   */
  defaultSpawnContext?: "isolated" | "fork";
};
type SessionSharingConfig = {
  /** Allow owners/admins to set sessions read-only. Default: true. */readOnly?: boolean; /** Allow owners/admins to select suggest mode. Default: true. */
  suggest?: boolean; /** Allow owners/admins to hide draft sessions from other operators. Default: true. */
  drafts?: boolean;
};
type SessionConfig = {
  scope?: SessionScope; /** DM session scoping (default: "main"). */
  dmScope?: DmScope; /** Map platform-prefixed identities (e.g. "telegram:123") to canonical DM peers. */
  identityLinks?: Record<string, string[]>;
  resetTriggers?: string[];
  reset?: SessionResetConfig;
  resetByType?: SessionResetByTypeConfig; /** Channel-specific reset overrides (e.g. { discord: { mode: "idle", idleMinutes: 10080 } }). */
  resetByChannel?: Record<string, SessionResetConfig>;
  store?: string;
  mainKey?: string;
  sendPolicy?: SessionSendPolicyConfig; /** Shared defaults for thread-bound session routing across channels/providers. */
  threadBindings?: SessionThreadBindingsConfig; /** Collaboration modes owners and administrators may select. */
  sharing?: SessionSharingConfig; /** Automatic session store maintenance (pruning, capping, archive retention, disk budget). */
  maintenance?: SessionMaintenanceConfig;
};
type SessionMaintenanceMode = "enforce" | "warn";
/** Session-store cleanup policy for transcript count, age, archives, and disk budget. */
type SessionMaintenanceConfig = {
  /** Whether to enforce maintenance or warn only. Default: "enforce". */mode?: SessionMaintenanceMode; /** Remove session entries older than this duration (e.g. "30d", "12h"). Default: "30d". */
  pruneAfter?: string | number; /** Maximum number of session entries to keep. Default: 500. */
  maxEntries?: number;
  /**
   * Age-based retention for archived transcripts (`*.reset.<timestamp>` and
   * `*.deleted.<timestamp>`). Default and `false`: keep archives until the
   * disk budget evicts them oldest-first; a duration opts into deletion.
   */
  resetArchiveRetention?: string | number | false;
  /**
   * Per-agent sessions-directory disk budget (e.g. "500mb"). Default: "10gb".
   * When exceeded, warn (mode=warn) or enforce oldest-first cleanup
   * (mode=enforce). Set `false` to disable the budget entirely.
   */
  maxDiskBytes?: number | string | false;
  /**
   * Target size after disk-budget cleanup (high-water mark), e.g. "400mb".
   * Default: 80% of maxDiskBytes.
   */
  highWaterBytes?: number | string;
};
type LoggingConfig = {
  level?: "silent" | "fatal" | "error" | "warn" | "info" | "debug" | "trace";
  file?: string; /** Maximum size of a single log file in bytes before rotation. Default: 100 MB. */
  maxFileBytes?: number;
  consoleLevel?: "silent" | "fatal" | "error" | "warn" | "info" | "debug" | "trace";
  consoleStyle?: "pretty" | "json";
  /** Redact sensitive tokens in log sinks and persisted transcript text. Default: "tools". Safety-boundary UI/tool/diagnostic payloads may still redact when this is "off". */
  /** Regex patterns used to redact sensitive tokens from logs and transcripts. */
  redactPatterns?: string[]; /** Metadata-only agent activity audit ledger settings. */
  audit?: AuditConfig;
};
type DiagnosticsOtelConfig = {
  enabled?: boolean;
  endpoint?: string;
  tracesEndpoint?: string;
  metricsEndpoint?: string;
  logsEndpoint?: string;
  protocol?: "http/protobuf";
  headers?: Record<string, string>;
  serviceName?: string; /** Replacement prefix for OpenClaw-owned metric names. Empty removes the prefix; defaults to "openclaw.". */
  metricNamePrefix?: string;
  traces?: boolean;
  metrics?: boolean;
  logs?: boolean; /** Log export sink: OTLP by default, stdout JSONL, or both. */
  logsExporter?: "otlp" | "stdout" | "both"; /** Trace sample rate (0.0 - 1.0). */
  sampleRate?: number; /** Metric export interval (ms). */
  flushIntervalMs?: number; /** Opt in to raw non-system message/tool content in OTEL span attributes. */
  captureContent?: boolean;
};
type DiagnosticsCacheTraceConfig = {
  /** Write prompt-cache trace artifacts for debugging deterministic cache input. */enabled?: boolean;
};
type AuditConfig = {
  /**
   * Record metadata-only run, tool, and enabled message lifecycle events into
   * the shared state database. Content is never stored. Default: true. This is
   * startup-scoped; disabling stops new event inserts after restart while retained
   * records stay readable until they expire.
   */
  enabled?: boolean;
  /**
   * Record content-free message lifecycle metadata. `direct` records only
   * known direct conversations; `all` also records group, channel, and
   * unknown conversation kinds. Default: `off`.
   */
  messages?: "off" | "direct" | "all";
};
type DiagnosticsConfig = {
  enabled?: boolean; /** Optional ad-hoc diagnostics flags (e.g. "telegram.http"). */
  flags?: string[];
  otel?: DiagnosticsOtelConfig;
  cacheTrace?: DiagnosticsCacheTraceConfig;
};
type AgentElevatedAllowFromConfig = Partial<Record<string, Array<string | number>>>;
type IdentityConfig = {
  name?: string;
  theme?: string;
  emoji?: string; /** Avatar image: workspace-relative path, http(s) URL, or data URI. */
  avatar?: string;
};
//#endregion
//#region src/config/types.agent-defaults.d.ts
/** Workspace bootstrap-file injection policy for agent system prompts. */
type AgentContextInjection = "always" | "continuation-skip" | "never";
/**
 * Optional bootstrap files that setup can skip while still creating required
 * agent files. "HEARTBEAT.md" stays accepted as legacy config input even
 * though workspace setup no longer writes it.
 */
type OptionalBootstrapFileName = "SOUL.md" | "USER.md" | "HEARTBEAT.md" | "IDENTITY.md";
/** Embedded runner behavior contract used by strict-agentic provider flows. */
type EmbeddedAgentExecutionContract = "default" | "strict-agentic";
/** Prompt-only default for how strongly agents should delegate to sub-agents. */
type SubagentDelegationMode = "suggest" | "prefer";
/** Image compression/detail preference used before sending image inputs to models. */
type AgentImageQualityPreference = "auto" | "efficient" | "balanced" | "high";
/** Canonical thinking levels accepted by agent defaults and compaction overrides. */
type AgentThinkingLevel = "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "adaptive" | "max" | "ultra";
type AgentModelEntryConfig = {
  /** Optional display/lookup alias for this provider/model entry. */alias?: string; /** Provider-specific API parameters (e.g., GLM-4.7 thinking mode). */
  params?: Record<string, unknown>; /** Optional agent execution runtime for this specific provider/model entry. */
  agentRuntime?: AgentRuntimePolicyConfig; /** Enable streaming for this model (default: true, false for Ollama to avoid SDK issue #1205). */
  streaming?: boolean;
};
type AgentModelPolicyConfig = {
  /** Model refs allowed for session/run overrides. Empty or omitted allows any model. */allow?: string[];
};
type AgentContextPruningConfig = {
  /** Pruning mode for old tool results in model context. */mode?: "off" | "cache-ttl"; /** TTL to consider cache expired (duration string, default unit: minutes). */
  ttl?: string;
  tools?: {
    /** Tool names eligible for context pruning. */allow?: string[]; /** Tool names excluded from context pruning. */
    deny?: string[];
  };
  hardClear?: {
    /** Replace oversized old tool results with a placeholder at high pressure. */enabled?: boolean; /** Placeholder text inserted when a tool result is hard-cleared. */
    placeholder?: string;
  };
};
type AgentStartupContextConfig = {
  /** Enable runtime-owned startup-context prelude on bare session resets (default: true). */enabled?: boolean; /** Which bare reset commands should receive startup context (default: ["new", "reset"]). */
  applyOn?: Array<"new" | "reset">; /** How many dated memory files to load counting backward from today (default: 2). */
  dailyMemoryDays?: number; /** Max bytes to read from each daily memory file before skipping (default: 16384). */
  maxFileBytes?: number; /** Max characters retained from each daily memory file (default: 1200). */
  maxFileChars?: number; /** Max total characters retained across the startup prelude (default: 2800). */
  maxTotalChars?: number;
};
type AgentContextLimitsConfig = {
  /** Default max chars returned by memory_get before truncation metadata/notice (default: 12000). */memoryGetMaxChars?: number; /** Max chars retained from post-compaction AGENTS.md context injection (default: 1800). */
  postCompactionMaxChars?: number; /** Override the auto-derived max chars per live tool result (default: auto-derived from context window). */
  maxResultChars?: number;
};
type AgentDefaultsConfig = {
  /** @deprecated Doctor-only legacy input. */imageGenerationModel?: AgentToolModelConfig; /** @deprecated Doctor-only legacy input. */
  videoGenerationModel?: AgentToolModelConfig; /** @deprecated Doctor-only legacy input. */
  musicGenerationModel?: AgentToolModelConfig; /** @deprecated Doctor-only legacy input. */
  envelopeTimezone?: string; /** @deprecated Doctor-only legacy input. */
  envelopeTimestamp?: "on" | "off"; /** @deprecated Doctor-only legacy input. */
  envelopeElapsed?: "on" | "off"; /** @deprecated Doctor-only legacy input. */
  timeFormat?: "auto" | "12" | "24"; /** @deprecated Doctor-only legacy input. */
  promptOverlays?: {
    gpt5?: {
      personality?: "friendly" | "on" | "off";
    };
  }; /** Global default provider params applied to all models before per-model and per-agent overrides. */
  params?: Record<string, unknown>; /** Primary model and fallbacks (provider/model). Accepts string or {primary,fallbacks}. */
  model?: AgentModelConfig; /** Optional lower-cost model for short internal tasks such as generated session titles. */
  utilityModel?: string;
  /**
   * @deprecated Legacy raw config accepted only by doctor/migration repair.
   * Normal schema parsing rejects this key; use per-model agentRuntime instead.
   */
  agentRuntime?: AgentRuntimePolicyConfig; /** Optional image-capable model and fallbacks (provider/model). Accepts string or {primary,fallbacks}. */
  imageModel?: AgentToolModelConfig; /** Media-generation model preferences by output modality. */
  mediaModels?: {
    image?: AgentToolModelConfig;
    video?: AgentToolModelConfig;
    music?: AgentToolModelConfig;
  }; /** Optional voice model and fallbacks (provider/model) for TTS/STT/realtime voice providers. */
  voiceModel?: AgentToolModelConfig; /** Optional PDF-capable model and fallbacks (provider/model). Accepts string or {primary,fallbacks}. */
  pdfModel?: AgentToolModelConfig; /** Maximum PDF file size in megabytes (default: 10). */
  pdfMaxMb?: number; /** Maximum number of PDF pages to process (default: 20). */
  pdfMaxPages?: number; /** Model catalog with optional aliases (full provider/model keys). */
  models?: Record<string, AgentModelEntryConfig>; /** Explicit model override policy. Empty or omitted allow permits any model. */
  modelPolicy?: AgentModelPolicyConfig; /** Agent working directory (preferred). Used as the default cwd for agent runs. */
  workspace?: string; /** Optional default allowlist of skills for agents that do not set agents.entries.*.skills. */
  skills?: string[]; /** Silent-reply policy by conversation type. */
  silentReply?: SilentReplyPolicyShape; /** Optional repository root for system prompt runtime line (overrides auto-detect). */
  repoRoot?: string;
  /** Provider-independent prompt overlays applied by model family. */
  /** Skip bootstrap (BOOTSTRAP.md creation, etc.) for pre-configured deployments. */
  skipBootstrap?: boolean;
  /**
   * List of optional bootstrap filenames to skip writing to the workspace root.
   * Applies to: SOUL.md, USER.md, IDENTITY.md ("HEARTBEAT.md" is accepted but a no-op).
   * Required workspace setup such as AGENTS.md still runs.
   * Example: ["SOUL.md", "USER.md", "IDENTITY.md"]
   */
  skipOptionalBootstrapFiles?: OptionalBootstrapFileName[];
  /**
   * Controls when workspace bootstrap files (AGENTS.md, SOUL.md, etc.) are
   * injected into the system prompt:
   * - always: inject on every turn (default)
   * - continuation-skip: skip injection on safe continuation turns once the
   *   transcript already contains a completed assistant turn
   */
  contextInjection?: AgentContextInjection; /** Max chars for injected bootstrap files before truncation (default: 20000). */
  bootstrapMaxChars?: number; /** Max total chars across all injected bootstrap files (default: 150000). */
  bootstrapTotalMaxChars?: number; /** Experimental agent-default flags. Keep off unless you are intentionally testing a preview surface. */
  experimental?: {
    /**
     * Drop heavyweight non-essential default tools for weaker or smaller local
     * model backends. Experimental preview only.
     */
    localModelLean?: boolean;
  };
  /**
   * Agent-visible bootstrap truncation warning mode:
   * - off: do not inject warning text
   * - once: inject once per unique truncation signature
   * - always: inject on every run with truncation (default)
   */
  /**
   * Optional IANA timezone for model-visible timestamps, prompt context, system events,
   * and heartbeat active hours. Defaults to the host timezone.
   */
  userTimezone?: string; /** Runtime-owned first-turn startup context for bare /new and /reset. */
  startupContext?: AgentStartupContextConfig; /** Focused context-budget overrides for high-volume injected/read surfaces. */
  contextLimits?: AgentContextLimitsConfig; /** Optional context window cap (used for runtime estimates + status %). */
  contextTokens?: number; /** Opt-in: prune old tool results from the LLM context to reduce token usage. */
  contextPruning?: AgentContextPruningConfig; /** Compaction tuning and pre-compaction memory flush behavior. */
  compaction?: AgentCompactionConfig; /** Embedded OpenClaw runner hardening and compatibility controls. */
  embeddedAgent?: {
    /**
     * How embedded OpenClaw should trust workspace-local `.openclaw/settings.json`.
     * - sanitize (default): apply project settings except shellPath/shellCommandPrefix
     * - ignore: ignore project settings entirely
     * - trusted: trust project settings as-is
     */
    projectSettingsPolicy?: "trusted" | "sanitize" | "ignore";
    /**
     * Embedded OpenClaw execution contract:
     * - default: keep the standard runner behavior
     * - strict-agentic: enable structured plan tracking and non-visible turn recovery on supported GPT-5 runs
     */
    executionContract?: EmbeddedAgentExecutionContract;
  }; /** Default thinking level when no /think directive is present. */
  thinkingDefault?: AgentThinkingLevel; /** Default fast-mode policy inherited by agent entries that omit it. */
  fastModeDefault?: FastMode; /** Default verbose level when no /verbose directive is present. */
  verboseDefault?: "off" | "on" | "full";
  /**
   * Detail mode for user-visible tool progress in /verbose and editable progress drafts.
   * - explain: compact human summary (default)
   * - raw: include raw command/detail when available
   */
  toolProgressDetail?: "explain" | "raw"; /** Default reasoning level when no /reasoning directive is present. */
  reasoningDefault?: "off" | "on" | "stream"; /** Default elevated level when no /elevated directive is present. */
  elevatedDefault?: "off" | "on" | "ask" | "full"; /** Default block streaming level when no override is present. */
  blockStreamingDefault?: "off" | "on";
  /**
   * Block streaming boundary:
   * - "text_end": end of each assistant text content block (before tool calls)
   * - "message_end": end of the whole assistant message (may include tool blocks)
   */
  blockStreamingBreak?: "text_end" | "message_end"; /** Soft block chunking for streamed replies (min/max chars, prefer paragraph/newline). */
  blockStreamingChunk?: BlockStreamingChunkConfig;
  /**
   * Block reply coalescing (merge streamed chunks before send).
   * idleMs: wait time before flushing when idle.
   */
  blockStreamingCoalesce?: BlockStreamingCoalesceConfig; /** Human-like delay between block replies. */
  humanDelay?: HumanDelayConfig;
  timeoutSeconds?: number; /** Max inbound media size in MB for agent-visible attachments (text note or future image attach). */
  mediaMaxMb?: number;
  /**
   * Max image side length (pixels) when sanitizing base64 image payloads in transcripts/tool results.
   * Default: 1200.
   */
  imageMaxDimensionPx?: number;
  /**
   * Image compression/detail preference for image-tool media loading.
   * Default: auto, which adapts to provider/model limits and image count.
   */
  imageQuality?: AgentImageQualityPreference;
  typingIntervalSeconds?: number; /** Typing indicator start mode (never|instant|thinking|message). */
  typingMode?: TypingMode; /** Periodic background heartbeat runs. */
  heartbeat?: {
    /** Agent that owns ambient heartbeat runs when no per-agent heartbeat is configured. */agentId?: string; /** Heartbeat interval (duration string, default unit: minutes; default: 30m). */
    every?: string; /** Optional active-hours window (local time); heartbeats run only inside this window. */
    activeHours?: {
      /** Start time (24h, HH:MM). Inclusive. */start?: string; /** End time (24h, HH:MM). Exclusive. Use "24:00" for end-of-day. */
      end?: string; /** Timezone for the window ("user", "local", or IANA TZ id). Default: "user". */
      timezone?: string;
    }; /** Heartbeat model override (provider/model). */
    model?: string; /** Session key for heartbeat runs ("main" or explicit session key). */
    session?: string; /** Delivery target ("last", "none", or a channel id). */
    target?: string; /** Direct/DM delivery policy. Default: "allow". */
    directPolicy?: "allow" | "block"; /** Optional delivery override (E.164 for WhatsApp, chat id for Telegram). Supports :topic:NNN suffix for Telegram topics. */
    to?: string; /** Optional account id for multi-account channels. */
    accountId?: string; /** Override the heartbeat prompt body. The default treats scratch as monitor prose and directs recurring work to cron jobs. */
    prompt?: string; /** Run timeout in seconds for heartbeat agent turns. Unset uses global timeout or heartbeat cadence capped at 600 seconds. */
    timeoutSeconds?: number;
    /**
     * If true, run heartbeat turns with lightweight bootstrap context.
     * Lightweight mode skips workspace bootstrap files; monitor scratch is
     * injected by the heartbeat runner either way.
     */
    lightContext?: boolean;
    /**
     * If true, run heartbeat turns in an isolated session with no prior
     * conversation history. Dramatically reduces per-heartbeat token cost by
     * avoiding the full session transcript.
     */
    isolatedSession?: boolean;
  }; /** Owner for ambient OpenClaw system-agent/Custodian inference. */
  systemAgent?: {
    agentId?: string;
  }; /** Max concurrent agent runs across all conversations. Default: min(16, max(1, available CPU parallelism)). */
  maxConcurrent?: number;
  /**
   * Multithreaded runtime isolation mode (Phase 2, multithreaded-runtime-design.md).
   * Controls how turns are dispatched: inline on the main loop, in-process
   * worker pool, or remote SSH workers. Default: "auto" (Scale 0 on 1-CPU,
   * Scale 1 on >1-CPU).
   */
  runtime?: {
    /** Isolation mode: "auto" (default), "disabled", "in-process", "remote". */isolation?: "auto" | "disabled" | "in-process" | "remote"; /** Worker pool size for in-process isolation (default: availableParallelism, capped 1–64). */
    workerCount?: number;
  }; /** Sub-agent defaults (spawned via sessions_spawn). */
  subagents?: {
    /** Prompt-only guidance for how strongly the main agent should delegate work. Default: "suggest". */delegationMode?: SubagentDelegationMode; /** Default allowlist of target agent ids for sessions_spawn. Use "*" to allow any configured target. */
    allowAgents?: string[]; /** Max concurrent sub-agent runs (global lane: "subagent"). Default: 8. */
    maxConcurrent?: number; /** Maximum depth allowed for sessions_spawn chains. Default behavior: 1 (no nested spawns). */
    maxSpawnDepth?: number; /** Maximum active children a single requester session may spawn. Default behavior: 5. */
    maxChildrenPerAgent?: number; /** Auto-archive sub-agent sessions after N minutes (default: 60, set 0 to disable). */
    archiveAfterMinutes?: number; /** Default model selection for spawned sub-agents (string or {primary,fallbacks}). */
    model?: AgentModelConfig; /** Default thinking level for spawned sub-agents (e.g. "off", "low", "medium", "high"). */
    thinking?: string; /** Default run timeout in seconds for spawned sub-agents (0 = no timeout). */
    runTimeoutSeconds?: number; /** Gateway timeout in ms for sub-agent announce delivery calls (default: 120000). */
    announceTimeoutMs?: number; /** Require explicit agentId in sessions_spawn (no default same-as-caller). Default: false. */
    requireAgentId?: boolean;
  }; /** Optional sandbox settings for non-main sessions. */
  sandbox?: AgentSandboxConfig; /** Default prompt rendering mode for agent system prompts. */
  promptMode?: PromptMode;
};
type AgentCompactionMode = "default" | "safeguard";
type AgentCompactionPostIndexSyncMode = "off" | "async" | "await";
type AgentCompactionIdentifierPolicy = "strict" | "off";
type AgentCompactionQualityGuardConfig = {
  /** Enable compaction summary quality audits and regeneration retries. Default: false. */enabled?: boolean; /** Maximum regeneration retries after a failed quality audit. Default: 1 when enabled. */
  maxRetries?: number;
};
type AgentCompactionMidTurnPrecheckConfig = {
  /**
   * Enable structured context pressure checks after tool results are appended
   * and before the next agent model call. Default: false.
   */
  enabled?: boolean;
};
type AgentCompactionConfig = {
  /** Enable embedded proactive auto-compaction. Default: true. */enabled?: boolean; /** Compaction summarization mode. */
  mode?: AgentCompactionMode; /** Override the session thinking level for embedded OpenClaw compaction summaries. */
  thinkingLevel?: AgentThinkingLevel; /** Embedded OpenClaw keepRecentTokens budget used for cut-point selection. */
  keepRecentTokens?: number;
  /**
   * Proactive compaction ratio: fire when context usage reaches this fraction
   * of the context window (default: 0.70). At 0.70 on a 242K window,
   * compaction fires at ~169K instead of the reactive edge (~226K).
   */
  compactAtRatio?: number; /** Preserve this many most-recent user/assistant turns verbatim in compaction summary context. */
  recentTurnsPreserve?: number; /** Identifier-preservation instruction policy for compaction summaries. */
  identifierPolicy?: AgentCompactionIdentifierPolicy; /** Optional quality-audit retries for safeguard compaction summaries. */
  qualityGuard?: AgentCompactionQualityGuardConfig; /** Mid-turn precheck for tool-loop context pressure. Default: disabled. */
  midTurnPrecheck?: AgentCompactionMidTurnPrecheckConfig; /** Post-compaction session memory index sync mode. */
  postIndexSync?: AgentCompactionPostIndexSyncMode; /** Pre-compaction memory flush (agentic turn). Default: enabled. */
  memoryFlush?: AgentCompactionMemoryFlushConfig; /** H2/H3 section names from AGENTS.md to inject after compaction. */
  postCompactionSections?: string[];
  /** Optional provider/model or configured bare alias for compaction summarization.
   * When set, compaction uses this model instead of the agent's primary model.
   * Falls back to the primary model when unset. */
  model?: string; /** Maximum time in seconds for a single compaction operation (default: 180). */
  timeoutSeconds?: number;
  /**
   * Id of a registered compaction provider plugin.
   * When set, the provider's summarize() is called instead of
   * the built-in summarizeInStages(). Falls back to built-in on failure.
   */
  provider?: string;
  /**
   * Byte threshold for normal preflight local compaction (bytes, or a byte-size
   * string like "20mb"). Set to 0 or leave unset to disable. Also caps Codex
   * app-server native rollouts; oversized native threads restart fresh.
   */
  maxActiveTranscriptBytes?: number | string;
  /**
   * Send brief context-maintenance notices to the user: when compaction starts
   * and completes, and when a pre-compaction memory flush is exhausted so the
   * reply continues in a degraded state.
   * Default: false (silent by default).
   */
  notifyUser?: boolean;
};
type AgentCompactionMemoryFlushConfig = {
  /** Enable the pre-compaction memory flush (default: true). */enabled?: boolean; /** Optional provider/model override used only for pre-compaction memory flush turns. */
  model?: string; /** Run the memory flush when context is within this many tokens of the compaction threshold. */
  softThresholdTokens?: number;
  /**
   * Force a memory flush when transcript size reaches this threshold
   * (bytes, or byte-size string like "2mb"). Set to 0 to disable.
   */
  forceFlushTranscriptBytes?: number | string;
};
//#endregion
//#region src/config/types.memory.d.ts
/** Memory backend family selected for retrieval and session memory features. */
type MemoryBackend = "builtin" | "qmd";
/** Citation rendering mode for memory-injected context. */
type MemoryCitationsMode = "auto" | "on" | "off";
/** QMD search command flavor used for retrieval. */
type MemoryQmdSearchMode = "query" | "search" | "vsearch";
/** Top-level memory config block. */
type MemoryConfig = {
  backend?: MemoryBackend;
  citations?: MemoryCitationsMode; /** Shared embedding/search defaults. Per-agent overrides live under agents.entries.*.memory.search. */
  search?: MemorySearchConfig;
  qmd?: MemoryQmdConfig;
};
/** QMD-specific memory backend config. */
type MemoryQmdConfig = {
  command?: string;
  searchMode?: MemoryQmdSearchMode;
  rerank?: boolean;
  searchTool?: string;
  includeDefaultMemory?: boolean;
  paths?: MemoryQmdIndexPath[];
  sessions?: MemoryQmdSessionConfig;
  limits?: MemoryQmdLimitsConfig;
  scope?: SessionSendPolicyConfig;
};
/** Additional QMD index path entry. */
type MemoryQmdIndexPath = {
  path: string;
  name?: string;
  pattern?: string;
};
type MemorySearchConfig = {
  /** Enable vector memory search (default: true). */enabled?: boolean; /** Use relevant context from this agent's other private conversations. */
  rememberAcrossConversations?: boolean; /** Sources to index and search (default: ["memory"]). */
  sources?: Array<"memory" | "sessions">; /** Extra paths to include in memory search (directories or .md files). */
  extraPaths?: string[]; /** Optional QMD-specific extra collections for cross-agent search. */
  qmd?: {
    /** Additional QMD collections appended for this agent's search scope. */extraCollections?: MemoryQmdIndexPath[];
  }; /** Optional multimodal file indexing for selected extra paths. */
  multimodal?: {
    /** Enable image/audio embeddings from extraPaths. */enabled?: boolean; /** Which non-text file types to index. */
    modalities?: Array<"image" | "audio" | "all">; /** Max bytes allowed per multimodal file before it is skipped. */
    maxFileBytes?: number;
  }; /** Experimental session transcript indexing. */
  experimental?: {
    sessionMemory?: boolean;
  }; /** Memory embedding provider adapter id. */
  provider?: string;
  remote?: {
    baseUrl?: string;
    apiKey?: SecretInput;
    headers?: Record<string, string>;
    batch?: {
      /** Enable batch API for embedding indexing (OpenAI/Gemini; default: true). */enabled?: boolean;
    };
  }; /** Fallback memory embedding provider adapter id when embeddings fail. */
  fallback?: string; /** Embedding model id (remote) or alias (local). */
  model?: string; /** Optional provider-specific embedding input_type for query and document requests. */
  inputType?: string; /** Optional provider-specific embedding input_type for query-time memory search. */
  queryInputType?: string; /** Optional provider-specific embedding input_type for document/index embeddings. */
  documentInputType?: string;
  /**
   * Gemini embedding-2 models only: output vector dimensions.
   * Supported values today are 768, 1536, and 3072.
   */
  outputDimensionality?: number; /** Local embedding settings (node-llama-cpp). */
  local?: {
    /** GGUF model path or hf: URI. */modelPath?: string;
  }; /** Index storage configuration. */
  store?: {
    fts?: {
      /** FTS5 tokenizer (default: "unicode61"). Use "trigram" for CJK text support. */tokenizer?: "unicode61" | "trigram";
    };
    vector?: {
      /** Enable the sqlite-vec semantic index (default: true). */enabled?: boolean; /** Optional override path to sqlite-vec extension (.dylib/.so/.dll). */
      extensionPath?: string;
    };
    cache?: {
      /** Enable embedding cache (default: true). */enabled?: boolean; /** Optional max cache entries per provider/model. */
      maxEntries?: number;
    };
  }; /** Query behavior. */
  query?: {
    maxResults?: number;
    minScore?: number;
  }; /** Index cache behavior. */
  cache?: {
    /** Cache chunk embeddings in SQLite (default: true). */enabled?: boolean;
  };
};
/** Session export settings for QMD memory indexing. */
type MemoryQmdSessionConfig = {
  enabled?: boolean;
  exportDir?: string;
  retentionDays?: number;
};
/** Retrieval and injection limits for QMD memory results. */
type MemoryQmdLimitsConfig = {
  maxResults?: number;
  maxSnippetChars?: number;
  maxInjectedChars?: number;
  timeoutMs?: number;
};
//#endregion
//#region src/config/types.queue.d.ts
/** Queue handling mode for inbound channel messages. */
type QueueMode = "steer" | "followup" | "collect" | "interrupt";
type QueueDropPolicy = "old" | "new" | "summarize";
type QueueModeByProvider = {
  whatsapp?: QueueMode;
  telegram?: QueueMode;
  discord?: QueueMode;
  irc?: QueueMode;
  googlechat?: QueueMode;
  slack?: QueueMode;
  mattermost?: QueueMode;
  signal?: QueueMode;
  imessage?: QueueMode;
  msteams?: QueueMode;
  webchat?: QueueMode;
  matrix?: QueueMode;
};
//#endregion
//#region src/config/types.messages.d.ts
type MentionPatternsMode = "allow" | "deny";
type MentionPatternsPolicyConfig = {
  mode?: MentionPatternsMode;
  allowIn?: string[];
  denyIn?: string[];
};
type GroupChatConfig = {
  mentionPatterns?: string[];
  historyLimit?: number;
  /**
   * Controls how unmentioned always-on group chatter is submitted.
   * Default: "user_request".
   */
  unmentionedInbound?: "user_request" | "room_event";
  /**
   * Controls how group/channel inbound events produce model-authored room replies.
   * The message-tool mode requires explicit message sends for normal assistant
   * output; explicitly host-owned runtime output remains deliverable except for
   * ambient room events.
   * Default: "automatic".
   */
  visibleReplies?: "automatic" | "message_tool";
};
type DmConfig = {
  historyLimit?: number;
};
type QueueConfig = {
  mode?: QueueMode;
  byChannel?: QueueModeByProvider; /** Per-channel debounce overrides (ms). */
  debounceMsByChannel?: InboundDebounceByProvider;
  cap?: number;
  drop?: QueueDropPolicy;
};
type InboundDebounceByProvider = Record<string, number>;
type InboundDebounceConfig = {
  debounceMs?: number;
  byChannel?: InboundDebounceByProvider;
};
type BroadcastStrategy = "parallel" | "sequential";
type BroadcastConfig = {
  /** Default processing strategy for broadcast peers. */strategy?: BroadcastStrategy;
  /**
   * Map peer IDs to arrays of agent IDs that should ALL process messages.
   *
   * Note: the index signature includes `undefined` so `strategy?: ...` remains type-safe.
   */
  [peerId: string]: string[] | BroadcastStrategy | undefined;
};
type StatusReactionsConfig = {
  /** Enable lifecycle status reactions (default: false). */enabled?: boolean;
};
type MessagesConfig = {
  /** @deprecated Doctor-only legacy input. */removeAckAfterReply?: boolean;
  /**
   * Controls how source inbound events produce visible replies across direct,
   * group, and channel conversations. Group/channel events still default to
   * `groupChat.visibleReplies` when it is set.
   *
   * Default: "automatic". In group/channel rooms, "message_tool" keeps normal
   * assistant output private unless the model sends visibly through the message
   * tool; explicitly host-owned runtime output remains deliverable.
   */
  visibleReplies?: "automatic" | "message_tool";
  /**
   * Prefix auto-added to all outbound replies.
   *
   * - string: explicit prefix (may include template variables)
   * - special value: `"auto"` derives `[{agents.entries.*.identity.name}]` for the routed agent (when set)
   *
   * Supported template variables (case-insensitive):
   * - `{model}` - short model name (e.g., `claude-opus-4-6`, `gpt-4o`)
   * - `{modelFull}` - full model identifier (e.g., `anthropic/claude-opus-4-6`)
   * - `{provider}` - provider name (e.g., `anthropic`, `openai`)
   * - `{thinkingLevel}` or `{think}` - current thinking level (`high`, `low`, `off`)
   * - `{identity.name}` or `{identityName}` - agent identity name
   *
   * Example: `"[{model} | think:{thinkingLevel}]"` → `"[claude-opus-4-6 | think:high]"`
   *
   * Unresolved variables remain as literal text (e.g., `{model}` if context unavailable).
   *
   * Default: none
   */
  responsePrefix?: string; /** Custom `/usage full` footer template, inline or JSON file path. */
  usageTemplate?: string | Record<string, unknown>;
  /**
   * Default per-reply usage footer mode (`responseUsage`) seeded into any session
   * that has not set its own via `/usage`. Precedence: session value → channel entry
   * → `default` → `off`. Absent ⇒ `off` (unchanged behavior).
   *
   * - string: one default for every channel, e.g. `"full"`.
   * - object: per-channel with a fallback, e.g. `{ "default": "off", "discord": "full" }`.
   */
  responseUsage?: "on" | "off" | "tokens" | "full" | {
    default?: "on" | "off" | "tokens" | "full";
    [channel: string]: "on" | "off" | "tokens" | "full" | undefined;
  };
  groupChat?: GroupChatConfig;
  queue?: QueueConfig; /** Debounce rapid inbound messages per sender (global + per-channel overrides). */
  inbound?: InboundDebounceConfig; /** Emoji reaction used to acknowledge inbound messages (empty disables). */
  ackReaction?: string; /** When to send ack reactions. Default: "group-mentions". */
  ackReactionScope?: "group-mentions" | "group-all" | "direct" | "all" | "off" | "none"; /** Lifecycle status reactions configuration. */
  statusReactions?: StatusReactionsConfig; /** When true, suppress ⚠️ tool-error warnings from being shown to the user. Default: false. */
  suppressToolErrors?: boolean;
};
type NativeCommandsSetting = boolean | "auto";
/**
 * Per-provider allowlist for command authorization.
 * Keys are channel IDs (e.g., "discord", "whatsapp") or "*" for global default.
 * Values are arrays of sender IDs allowed to use commands on that channel.
 */
type CommandAllowFrom = Record<string, Array<string | number>>;
type CommandsConfig = {
  /** @deprecated Doctor-only legacy input. */ownerDisplay?: "raw" | "hash"; /** @deprecated Doctor-only legacy input. */
  ownerDisplaySecret?: string; /** Enable native command registration when supported (default: "auto"). */
  native?: NativeCommandsSetting; /** Enable native skill command registration when supported (default: "auto"). */
  nativeSkills?: NativeCommandsSetting; /** Enable text command parsing (default: true). */
  text?: boolean; /** Allow bash chat command (`!`; `/bash` alias) (default: false). */
  bash?: boolean; /** How long bash waits before backgrounding (default: 2000; 0 backgrounds immediately). */
  bashForegroundMs?: number; /** Allow /config command (default: false). */
  config?: boolean; /** Allow /mcp command for OpenClaw-managed MCP settings (default: false). */
  mcp?: boolean; /** Allow /plugins command for plugin listing and enablement toggles (default: false). */
  plugins?: boolean; /** Allow /debug command (default: false). */
  debug?: boolean; /** Allow restart commands/tools (default: true). */
  restart?: boolean; /** Explicit owner allowlist for owner-scoped commands (channel-native IDs). */
  ownerAllowFrom?: Array<string | number>;
  /** How owner IDs are rendered in system prompts. */
  /**
   * Per-provider allowlist restricting who can use slash commands.
   * If set, overrides the channel's allowFrom for command authorization.
   * Use "*" key for global default, provider-specific keys override the global.
   * Example: { "*": ["user1"], discord: ["user:123"] }
   */
  allowFrom?: CommandAllowFrom;
};
type ProviderCommandsConfig = {
  /** Override native command registration for this provider (bool or "auto"). */native?: NativeCommandsSetting; /** Override native skill command registration for this provider (bool or "auto"). */
  nativeSkills?: NativeCommandsSetting;
};
//#endregion
//#region src/config/types.skills.d.ts
/** Per-skill runtime override keyed by skill name or source-specific skill key. */
type SkillConfig = {
  /** Disable a discovered skill without removing it from disk. */enabled?: boolean; /** Optional secret made available to the skill runtime through skill env handling. */
  apiKey?: SecretInput; /** Plain environment overrides applied when the skill runs. */
  env?: Record<string, string>; /** Skill-specific structured config consumed by the skill runtime. */
  config?: Record<string, unknown>;
};
/** Discovery and watcher settings for skill sources. */
type SkillsLoadConfig = {
  /**
   * Additional skill folders to scan (lowest precedence).
   * Each directory should contain skill subfolders with `SKILL.md`.
   */
  extraDirs?: string[];
  /**
   * Real target directories that skill symlinks may resolve into even when they
   * sit outside the configured source root.
   */
  allowSymlinkTargets?: string[]; /** Watch skill folders for changes and refresh the skills snapshot. */
  watch?: boolean;
};
/** Skill installation preferences and upload policy. */
type SkillsInstallConfig = {
  preferBrew?: boolean;
  nodeManager?: "npm" | "pnpm" | "yarn" | "bun"; /** Allow gateway clients to install zip archives staged through skills.upload.*. */
  allowUploadedArchives?: boolean;
};
/** Limits that bound skill discovery and model-facing prompt expansion. */
type SkillsLimitsConfig = {
  /** Max number of immediate child directories to consider under a skills root before treating it as suspicious. */maxCandidatesPerRoot?: number; /** Max number of skills to load per skills source (bundled/managed/workspace/extra). */
  maxSkillsLoadedPerSource?: number; /** Max number of skills to include in the model-facing skills prompt. */
  maxSkillsInPrompt?: number; /** Max characters for the model-facing skills prompt block (approx). */
  maxSkillsPromptChars?: number; /** Max size (bytes) allowed for a SKILL.md file to be considered. */
  maxSkillFileBytes?: number;
};
type SkillsWorkshopAutonomousMode = "off" | "propose" | "auto";
/** Autonomous and approval settings for generated skill proposals. */
type SkillsWorkshopConfig = {
  /** Autonomous Skill Workshop behavior controlled separately from user-prompted proposals. */autonomous?: {
    /** Capture policy for durable conversation signals and substantial completed work. */mode?: SkillsWorkshopAutonomousMode;
  }; /** Allow Skill Workshop apply to write through trusted skill symlink targets. */
  allowSymlinkTargetWrites?: boolean; /** Whether proposal lifecycle actions need explicit approval. */
  approvalPolicy?: "pending" | "auto"; /** Maximum pending/quarantined proposals retained per workspace. */
  maxPending?: number; /** Maximum generated skill proposal size in bytes. */
  maxSkillBytes?: number;
};
/** Top-level skills config block in openclaw config. */
type SkillsConfig = {
  /** Optional bundled-skill allowlist (only affects bundled skills). */allowBundled?: string[];
  load?: SkillsLoadConfig;
  install?: SkillsInstallConfig;
  limits?: SkillsLimitsConfig;
  workshop?: SkillsWorkshopConfig;
  entries?: Record<string, SkillConfig>;
};
//#endregion
//#region src/infra/exec-safe-bin-policy-profiles.d.ts
type SafeBinProfileFixture = {
  minPositional?: number;
  maxPositional?: number;
  allowedValueFlags?: readonly string[];
  deniedFlags?: readonly string[];
};
//#endregion
//#region src/config/types.ssrf.d.ts
type SsrFPolicyConfig = {
  /** Permit private/internal network targets. Default: false. */dangerouslyAllowPrivateNetwork?: boolean; /** Allow RFC 2544 benchmark-range IPs (198.18.0.0/15). */
  allowRfc2544BenchmarkRange?: boolean; /** Allow IPv6 Unique Local Addresses (fc00::/7). */
  allowIpv6UniqueLocalRange?: boolean; /** Explicitly allowed exact hostnames or IP literals. */
  allowedHostnames?: string[];
};
//#endregion
//#region src/config/types.tools.d.ts
type MediaUnderstandingScopeMatch = {
  /** Channel/provider id to match before running media or link understanding. */channel?: string; /** Direct/group classification from the channel runtime, when available. */
  chatType?: ChatType; /** Attachment or link key prefix used for narrow per-source routing. */
  keyPrefix?: string;
};
type MediaUnderstandingScopeRule = {
  /** Policy applied when match criteria select this scope rule. */action: SessionSendPolicyAction; /** Optional match filter; omitted match behaves as a catch-all rule. */
  match?: MediaUnderstandingScopeMatch;
};
type MediaUnderstandingScopeConfig = {
  /** Fallback action when no scope rule matches. */default?: SessionSendPolicyAction; /** Ordered allow/block rules; first matching rule wins. */
  rules?: MediaUnderstandingScopeRule[];
};
type MediaUnderstandingCapability = "image" | "audio" | "video";
type MediaUnderstandingAttachmentsConfig = {
  /** Select the first matching attachment or process multiple. */mode?: "first" | "all"; /** Max number of attachments to process (default: 1). */
  maxAttachments?: number; /** Attachment ordering preference. */
  prefer?: "first" | "last" | "path" | "url";
};
type MediaProviderRequestConfig = {
  /** Optional provider-specific query params (merged into requests). */providerOptions?: Record<string, Record<string, string | number | boolean>>; /** Optional base URL override for provider requests. */
  baseUrl?: string; /** Optional headers merged into provider requests. */
  headers?: Record<string, string>; /** Optional request transport overrides for provider HTTP calls. */
  request?: ConfiguredProviderRequest;
};
type MediaUnderstandingModelConfig = MediaProviderRequestConfig & {
  /** provider API id (e.g. openai, google). */provider?: string; /** Model id for provider-based understanding. */
  model?: string; /** Optional capability tags for shared model lists. */
  capabilities?: MediaUnderstandingCapability[]; /** Use a CLI command instead of provider API. */
  type?: "provider" | "cli"; /** CLI binary (required when type=cli). */
  command?: string; /** CLI args (template-enabled). */
  args?: string[]; /** Optional prompt override for this model entry. */
  prompt?: string; /** Optional max output characters for this model entry. */
  maxChars?: number; /** Optional max bytes for this model entry. */
  maxBytes?: number; /** Optional timeout override (seconds) for this model entry. */
  timeoutSeconds?: number; /** Optional language hint for audio transcription. */
  language?: string; /** Auth profile id to use for this provider. */
  profile?: string; /** Preferred profile id if multiple are available. */
  preferredProfile?: string;
};
type MediaUnderstandingConfig = MediaProviderRequestConfig & {
  /** Enable media understanding when models are configured. */enabled?: boolean; /** Prefer a matching shared model entry. */
  preferredModel?: string; /** Optional scope gating for understanding. */
  scope?: MediaUnderstandingScopeConfig; /** Default max bytes to send. */
  maxBytes?: number; /** Default max output characters. */
  maxChars?: number; /** Default prompt. */
  prompt?: string; /** Internal request-scoped prompt override injected by CLI/runtime wrappers. */
  _requestPromptOverride?: string; /** Default timeout (seconds). */
  timeoutSeconds?: number; /** Default language hint (audio). */
  language?: string; /** Internal request-scoped language override injected by CLI/runtime wrappers. */
  _requestLanguageOverride?: string; /** Attachment selection policy. */
  attachments?: MediaUnderstandingAttachmentsConfig; /** Ordered model list (fallbacks in order). */
  models?: MediaUnderstandingModelConfig[];
  /**
   * Echo the audio transcript back to the originating chat before agent processing.
   * Lets users verify what was heard. Default: false.
   */
  echoTranscript?: boolean;
  /**
   * Format string for the echoed transcript. Use `{transcript}` as placeholder.
   * Default: '📝 "{transcript}"'
   */
  echoFormat?: string;
};
/** Per-capability defaults and policy. Models live only in tools.media.models. */
type MediaUnderstandingCapabilityConfig = Omit<MediaUnderstandingConfig, "models">;
type LinkModelConfig = {
  /** Use a CLI command for link processing. */type?: "cli"; /** CLI binary (required when type=cli). */
  command: string; /** CLI args (template-enabled). */
  args?: string[]; /** Optional timeout override (seconds) for this model entry. */
  timeoutSeconds?: number;
};
type LinkToolsConfig = {
  /** Enable link understanding when models are configured. */enabled?: boolean; /** Optional scope gating for understanding. */
  scope?: MediaUnderstandingScopeConfig; /** Max number of links to process per message. */
  maxLinks?: number; /** Default timeout (seconds). */
  timeoutSeconds?: number; /** Ordered model list (fallbacks in order). */
  models?: LinkModelConfig[];
};
type MediaToolsConfig = {
  /** Canonical model list for image/audio/video, selected by capability tags. */models?: MediaUnderstandingModelConfig[]; /** Max concurrent media understanding runs. */
  concurrency?: number;
  image?: MediaUnderstandingCapabilityConfig;
  audio?: MediaUnderstandingCapabilityConfig;
  video?: MediaUnderstandingCapabilityConfig;
};
type ToolProfileId = "minimal" | "coding" | "messaging" | "full";
type ToolLoopDetectionConfig = {
  /** Enable tool-loop protection (default: false). */enabled?: boolean;
};
type ToolSearchConfig = boolean | {
  /** Enable compact search/call cataloging for large tool sets. */enabled?: boolean; /** Exposed model surface. "code" exposes tool_search_code; "tools" exposes structured fallback tools; "directory" keeps a bounded directory plus selected schemas visible while deferring the rest behind search/describe/call. */
  mode?: "code" | "tools" | "directory"; /** Timeout in milliseconds for one tool_search_code execution. Runtime clamps to 1s..60s. */
  codeTimeoutMs?: number; /** Default search result count when the model omits a limit. Runtime clamps to maxSearchLimit. */
  searchDefaultLimit?: number; /** Maximum search result count. Runtime clamps to 1..50. */
  maxSearchLimit?: number;
};
type CodeModeConfig = boolean | "auto" | {
  /** Enable generic OpenClaw code mode. Default: "auto", which engages it only for models whose catalog compat flags `codeMode: "preferred"`. */enabled?: boolean | "auto"; /** Guest runtime. Only quickjs-wasi is supported. */
  runtime?: "quickjs-wasi"; /** Model-facing mode. Only "only" is supported: expose exec/wait and hide normal tools. */
  mode?: "only"; /** Accepted source languages. */
  languages?: Array<"javascript" | "typescript">; /** Wall-clock limit in milliseconds for one exec or wait call. */
  timeoutMs?: number; /** QuickJS heap limit in bytes. */
  memoryLimitBytes?: number; /** Maximum serialized output bytes. */
  maxOutputBytes?: number; /** Maximum serialized snapshot bytes. */
  maxSnapshotBytes?: number; /** Maximum concurrent nested tool calls. */
  maxPendingToolCalls?: number; /** Retention for suspended snapshots. */
  snapshotTtlSeconds?: number; /** Default search result count for tools.search. */
  searchDefaultLimit?: number; /** Maximum search result count for tools.search. */
  maxSearchLimit?: number;
};
type SwarmConfig = boolean | {
  /** Enable collector-mode subagents and agents_wait. Default: false. */enabled?: boolean; /** Maximum concurrently running collector children per swarm group. */
  maxConcurrent?: number; /** Maximum live collector children per swarm group. */
  maxChildrenPerGroup?: number; /** Maximum lifetime collector spawns per swarm group. */
  maxTotalPerGroup?: number; /** Maximum agents_wait timeout in seconds. */
  waitTimeoutSecondsMax?: number; /** Default child agent id when sessions_spawn omits agentId. */
  defaultAgentId?: string;
};
type SessionsToolsVisibility = "self" | "tree" | "agent" | "all";
type ToolAllowDenyPolicyConfig = {
  /** Exact tool names allowed in this policy scope. */allow?: string[]; /** Additional allowlist entries merged into the inherited policy. */
  alsoAllow?: string[]; /** Exact tool names denied after allow expansion; deny wins. */
  deny?: string[];
};
type ToolPolicyConfig = ToolAllowDenyPolicyConfig & {
  /** Built-in profile used as the base policy before allow/deny merges. */profile?: ToolProfileId;
};
type GroupToolPolicyConfig = ToolAllowDenyPolicyConfig;
/**
 * Per-sender overrides.
 *
 * Prefer explicit key prefixes:
 * - channel:<channelId>:<senderId>
 * - id:<senderId>
 * - e164:<phone>
 * - username:<handle>
 * - name:<display-name>
 * - * (wildcard)
 *
 * Legacy unprefixed keys are supported for backward compatibility and are matched as senderId only.
 */
type GroupToolPolicyBySenderConfig = Record<string, GroupToolPolicyConfig>;
type ExecToolConfig = {
  /** Exec host routing (default: auto). */host?: "auto" | "sandbox" | "gateway" | "node"; /** Normalized exec policy mode. Prefer this over raw security/ask knobs. */
  mode?: "deny" | "allowlist" | "ask" | "auto" | "full"; /** Legacy exec security mode retained when no canonical mode can preserve policy. */
  security?: "deny" | "allowlist" | "full"; /** Legacy exec ask mode retained when no canonical mode can preserve policy. */
  ask?: "off" | "on-miss" | "always"; /** Default node binding for exec.host=node (node id/name). */
  node?: string; /** Directories to prepend to PATH when running exec (gateway/sandbox). */
  pathPrepend?: string[]; /** Safe stdin-only binaries that can run without allowlist entries. */
  safeBins?: string[];
  /**
   * Require explicit approval for interpreter inline-eval forms (`python -c`, `node -e`, etc.).
   * Prevents silent allowlist reuse and allow-always persistence for those forms.
   */
  strictInlineEval?: boolean; /** Render parser-derived command highlights in exec approval prompts (default: false). */
  commandHighlighting?: boolean; /** Extra explicit directories trusted for safeBins path checks (never derived from PATH). */
  safeBinTrustedDirs?: string[]; /** Optional custom safe-bin profiles for entries in tools.exec.safeBins. */
  safeBinProfiles?: Record<string, SafeBinProfileFixture>; /** Model-backed reviewer used by tools.exec.mode=auto before falling back to human approval. */
  reviewer?: {
    /** Optional reviewer model override (provider/model or agent model config). */model?: AgentModelConfig; /** Reviewer timeout in milliseconds (default: 30000). */
    timeoutMs?: number;
  }; /** Default time (ms) before an exec command auto-backgrounds. */
  backgroundMs?: number; /** Default timeout (seconds) before auto-killing exec commands. */
  timeoutSeconds?: number; /** Emit a running notice (ms) when approval-backed exec runs long (default: 10000, 0 = off). */
  approvalRunningNoticeMs?: number; /** How long to keep finished sessions in memory (ms). */
  cleanupMs?: number; /** Emit a system event and heartbeat when a backgrounded exec exits. */
  notifyOnExit?: boolean;
  /**
   * Also emit success exit notifications when a backgrounded exec has no output.
   * Default false to reduce context noise.
   */
  notifyOnExitEmptySuccess?: boolean; /** apply_patch subtool configuration. */
  applyPatch?: {
    /** Enable apply_patch for OpenAI models (default: true; set false to disable). */enabled?: boolean;
    /**
     * Restrict apply_patch paths to the workspace directory.
     * Default: true (safer; does not affect read/write/edit).
     */
    workspaceOnly?: boolean;
    /**
     * Optional allowlist of model ids that can use apply_patch.
     * Accepts either raw ids (e.g. "gpt-5.4") or full ids (e.g. "openai/gpt-5.4").
     */
    allowModels?: string[];
  };
};
type FsToolsConfig = {
  /**
   * Restrict filesystem tools (read/write/edit/apply_patch) to the agent workspace directory.
   * Default: false (unrestricted, matches legacy behavior).
   */
  workspaceOnly?: boolean;
};
type SessionsSpawnToolsConfig = {
  attachments?: {
    /** Enable inline attachments for sessions_spawn. */enabled?: boolean;
    maxTotalBytes?: number;
    maxFiles?: number;
    maxFileBytes?: number;
    retainOnSessionKeep?: boolean;
  };
};
type AgentToolsConfig = {
  /** Base tool profile applied before allow/deny lists. */profile?: ToolProfileId;
  allow?: string[]; /** Additional allowlist entries merged into allow and/or profile allowlist. */
  alsoAllow?: string[];
  deny?: string[]; /** Optional tool policy overrides keyed by provider id or "provider/model". */
  byProvider?: Record<string, ToolPolicyConfig>; /** Per-sender tool policy overrides keyed by sender identity. */
  toolsBySender?: GroupToolPolicyBySenderConfig; /** Per-agent code mode override; merges over the top-level tools.codeMode config. */
  codeMode?: CodeModeConfig; /** Per-agent swarm override; merges over the top-level tools.swarm config. */
  swarm?: SwarmConfig; /** Per-agent elevated exec gate (can only further restrict global tools.elevated). */
  elevated?: {
    /** Enable or disable elevated mode for this agent (default: true). */enabled?: boolean; /** Approved senders for /elevated (per-provider allowlists). */
    allowFrom?: AgentElevatedAllowFromConfig;
  }; /** Exec tool defaults for this agent. */
  exec?: ExecToolConfig; /** Filesystem tool path guards. */
  fs?: FsToolsConfig; /** Runtime loop detection for repetitive/ stuck tool-call patterns. */
  loopDetection?: ToolLoopDetectionConfig; /** Message tool configuration for this agent. */
  message?: MessageToolsConfig;
  sandbox?: {
    tools?: ToolAllowDenyPolicyConfig;
  };
};
type ToolsConfig = {
  /** Base tool profile applied before allow/deny lists. */profile?: ToolProfileId;
  allow?: string[]; /** Additional allowlist entries merged into allow and/or profile allowlist. */
  alsoAllow?: string[];
  deny?: string[]; /** Optional tool policy overrides keyed by provider id or "provider/model". */
  byProvider?: Record<string, ToolPolicyConfig>; /** Per-sender tool policy overrides keyed by sender identity. */
  toolsBySender?: GroupToolPolicyBySenderConfig;
  web?: {
    search?: {
      /** Enable managed web_search and optional Codex-native web search. */enabled?: boolean; /** Search provider id. */
      provider?: string; /** Default search results count (1-10). */
      maxResults?: number; /** Timeout in seconds for search requests. */
      timeoutSeconds?: number; /** Cache TTL in minutes for search results. */
      cacheTtlMinutes?: number; /** Optional native Codex web search for Codex-capable models. */
      openaiCodex?: {
        /** Enable native Codex web search for eligible models. */enabled?: boolean; /** Prefer cached or explicitly request live access. Unrestricted Codex turns resolve cached to live. */
        mode?: "cached" | "live"; /** Optional allowlist of domains passed to the native Codex tool. */
        allowedDomains?: string[]; /** Optional Codex native search context size hint. */
        contextSize?: "low" | "medium" | "high"; /** Optional approximate user location passed to the native Codex tool. */
        userLocation?: {
          country?: string;
          region?: string;
          city?: string;
          timezone?: string;
        };
      };
    };
    fetch?: {
      /** Enable web fetch tool (default: true). */enabled?: boolean; /** Web fetch fallback provider id. */
      provider?: string; /** Max characters to return from fetched content. */
      maxChars?: number; /** Hard cap for maxChars (tool or config), defaults to 50000. */
      maxCharsCap?: number; /** Max download size before truncation, defaults to 2000000. */
      maxResponseBytes?: number; /** Timeout in seconds for fetch requests. */
      timeoutSeconds?: number; /** Cache TTL in minutes for fetched content. */
      cacheTtlMinutes?: number; /** Maximum number of redirects to follow (default: 3). */
      maxRedirects?: number; /** Override User-Agent header for fetch requests. */
      userAgent?: string;
      /**
       * Extra request headers sent with direct web_fetch requests. Every value is
       * treated as sensitive in exposed config. Entries a request cannot carry are
       * dropped with a warning at request time.
       */
      headers?: Record<string, string>; /** Use Readability to extract main content (default: true). */
      readability?: boolean; /** Route web_fetch through a trusted HTTP(S) env proxy and let the proxy resolve DNS. Enable only when that proxy enforces outbound policy. */
      useTrustedEnvProxy?: boolean; /** SSRF policy configuration for web_fetch. */
      ssrfPolicy?: SsrFPolicyConfig;
    };
  };
  media?: MediaToolsConfig;
  links?: LinkToolsConfig; /** Message tool configuration. */
  message?: MessageToolsConfig;
  agentToAgent?: {
    /** Enable agent-to-agent messaging tools. Default: false. */enabled?: boolean; /** Allowlist of agent ids or patterns (implementation-defined). */
    allow?: string[];
  };
  /**
   * Session tool visibility controls which sessions can be targeted by session tools
   * (sessions_list, sessions_history, sessions_search, sessions_send).
   *
   * Default: "tree" (current session + spawned subagent sessions).
   */
  sessions?: {
    /**
     * - "self": only the current session
     * - "tree": current session + sessions spawned by this session (default)
     * - "agent": any session belonging to the current agent id (can include other users)
     * - "all": any session (cross-agent still requires tools.agentToAgent)
     */
    visibility?: SessionsToolsVisibility;
  }; /** Elevated exec permissions for the host machine. */
  elevated?: {
    /** Enable or disable elevated mode (default: true). */enabled?: boolean; /** Approved senders for /elevated (per-provider allowlists). */
    allowFrom?: AgentElevatedAllowFromConfig;
  }; /** Exec tool defaults. */
  exec?: ExecToolConfig; /** Filesystem tool path guards. */
  fs?: FsToolsConfig; /** Runtime loop detection for repetitive/ stuck tool-call patterns. */
  loopDetection?: ToolLoopDetectionConfig; /** Compact large OpenClaw, MCP, and client tool catalogs behind search/call tools. */
  toolSearch?: ToolSearchConfig; /** Generic code mode: expose exec/wait and hide normal tools behind a QuickJS catalog bridge. */
  codeMode?: CodeModeConfig; /** Collector-mode subagents and wait controls. */
  swarm?: SwarmConfig; /** sessions_spawn tool configuration. */
  sessions_spawn?: SessionsSpawnToolsConfig; /** Sub-agent tool policy defaults (deny wins). */
  subagents?: {
    tools?: ToolAllowDenyPolicyConfig;
  }; /** Sandbox tool policy defaults (deny wins). */
  sandbox?: {
    tools?: ToolAllowDenyPolicyConfig;
  }; /** Structured update_plan checklist tool; enabled by default. Set false to opt out. */
  updatePlan?: boolean;
};
type MessageToolsConfig = {
  crossContext?: {
    /** Allow sends to other channels within the same provider (default: true). */allowWithinProvider?: boolean; /** Allow sends across different providers (default: false). */
    allowAcrossProviders?: boolean; /** Cross-context marker configuration. */
    marker?: {
      /** Enable origin markers for cross-context sends (default: true). */enabled?: boolean; /** Text prefix template, supports {channel}. */
      prefix?: string; /** Text suffix template, supports {channel}. */
      suffix?: string;
    };
  };
  actions?: {
    /** Message action names exposed and accepted by the message tool. */allow?: string[];
  };
  broadcast?: {
    /** Enable broadcast action (default: true). */enabled?: boolean;
  };
};
//#endregion
//#region src/config/types.tts.d.ts
type TtsProvider = string;
type TtsMode = "final" | "all";
type TtsAutoMode = "off" | "always" | "inbound" | "tagged";
type TtsModelOverrideConfig = {
  /** Enable model-provided overrides for TTS. */enabled?: boolean; /** Allow model-provided TTS text blocks. */
  allowText?: boolean; /** Allow model-provided provider override (default: false). */
  allowProvider?: boolean; /** Allow model-provided voice/voiceId override. */
  allowVoice?: boolean; /** Allow model-provided modelId override. */
  allowModelId?: boolean; /** Allow model-provided voice settings override. */
  allowVoiceSettings?: boolean; /** Allow model-provided normalization or language overrides. */
  allowNormalization?: boolean; /** Allow model-provided seed override. */
  allowSeed?: boolean;
};
type TtsProviderConfigMap = Record<string, Record<string, unknown>>;
type TtsPersonaFallbackPolicy = "preserve-persona" | "provider-defaults" | "fail";
type TtsPersonaConfig = {
  label?: string;
  description?: string; /** Preferred provider for this persona. Explicit provider prefs still win. */
  provider?: TtsProvider;
  fallbackPolicy?: TtsPersonaFallbackPolicy; /** Provider-specific persona bindings keyed by speech provider id. */
  providers?: TtsProviderConfigMap;
};
type ResolvedTtsPersona = TtsPersonaConfig & {
  id: string;
};
type TtsConfig = {
  /** Auto-TTS mode (preferred). */auto?: TtsAutoMode; /** @deprecated Use auto. */
  enabled?: boolean; /** Apply TTS to final replies only or to all replies (tool/block/final). */
  mode?: TtsMode; /** Primary TTS provider (fallbacks are automatic). */
  provider?: TtsProvider; /** Active TTS persona id. */
  persona?: string; /** Named TTS personas. */
  personas?: Record<string, TtsPersonaConfig>; /** Optional model override for TTS auto-summary (provider/model or alias). */
  summaryModel?: string; /** Allow the model to override TTS parameters. */
  modelOverrides?: TtsModelOverrideConfig; /** Provider-specific TTS settings keyed by speech provider id. */
  providers?: TtsProviderConfigMap;
  /** Optional path for local TTS user preferences JSON. */
  /** Hard cap for text sent to TTS (chars). */
  maxTextLength?: number; /** API request timeout (ms). */
  timeoutMs?: number;
};
//#endregion
//#region src/config/types.agents.d.ts
type AgentRuntimeAcpConfig = {
  /** ACP harness adapter id (for example codex, claude). */agent?: string; /** Optional ACP backend override for this agent runtime. */
  backend?: string; /** Optional ACP session mode override. */
  mode?: "persistent" | "oneshot"; /** Optional runtime working directory override. */
  cwd?: string;
};
type AgentRuntimeConfig = {
  type: "embedded";
} | {
  type: "acp";
  acp?: AgentRuntimeAcpConfig;
};
type AgentBindingMatch = {
  channel: string;
  /**
   * Channel account to match.
   * - Omitted/empty: matches only the channel default account.
   * - "*": matches every account on the channel.
   * - Any other string: matches that specific account id.
   */
  accountId?: string;
  peer?: {
    kind: ChatType;
    id: string;
  };
  guildId?: string;
  teamId?: string; /** Discord role IDs used for role-based routing. */
  roles?: string[];
};
type AgentRouteBinding = {
  /** Missing type is interpreted as route for backward compatibility. */type?: "route";
  agentId: string;
  comment?: string;
  match: AgentBindingMatch;
  session?: {
    /** Optional session scoping override for conversations matched by this binding. */dmScope?: DmScope;
  };
};
type AgentAcpBinding = {
  type: "acp";
  agentId: string;
  comment?: string;
  match: AgentBindingMatch;
  acp?: {
    mode?: "persistent" | "oneshot";
    label?: string;
    cwd?: string;
    backend?: string;
  };
};
type AgentBinding = AgentRouteBinding | AgentAcpBinding;
type AgentConfig = {
  id: string;
  default?: boolean;
  name?: string; /** Optional human-authored agent description. */
  description?: string;
  workspace?: string;
  agentDir?: string;
  model?: AgentModelConfig; /** Optional per-agent model for short internal tasks such as generated session titles. */
  utilityModel?: string;
  /**
   * @deprecated Legacy raw config accepted only by doctor/migration repair.
   * Normal schema parsing rejects this key; use per-model agentRuntime instead.
   */
  agentRuntime?: AgentModelEntryConfig["agentRuntime"]; /** Per-model metadata overrides for this agent. */
  models?: Record<string, AgentModelEntryConfig>; /** Per-agent model override policy. Replaces the default policy when allow is present. */
  modelPolicy?: AgentModelPolicyConfig; /** @deprecated Legacy per-agent compaction config is kept for raw doctor migration/repair. */
  compaction?: AgentDefaultsConfig["compaction"]; /** Optional per-agent default thinking level (overrides agents.defaults.thinkingDefault). */
  thinkingDefault?: AgentDefaultsConfig["thinkingDefault"]; /** Optional per-agent default verbosity level. */
  verboseDefault?: "off" | "on" | "full"; /** Optional per-agent tool progress detail mode. */
  toolProgressDetail?: AgentDefaultsConfig["toolProgressDetail"]; /** Optional per-agent default reasoning visibility. */
  reasoningDefault?: "on" | "off" | "stream"; /** Optional per-agent default for fast mode. */
  fastModeDefault?: FastMode; /** Optional per-agent bootstrap/context injection mode override. */
  contextInjection?: AgentDefaultsConfig["contextInjection"]; /** Optional per-agent max chars for each injected bootstrap file. */
  bootstrapMaxChars?: AgentDefaultsConfig["bootstrapMaxChars"]; /** Optional per-agent max total chars across injected bootstrap files. */
  bootstrapTotalMaxChars?: AgentDefaultsConfig["bootstrapTotalMaxChars"]; /** Optional per-agent experimental flags. Omitted fields inherit agents.defaults.experimental. */
  experimental?: AgentDefaultsConfig["experimental"]; /** Optional allowlist of skills for this agent; omitting it inherits agents.defaults.skills when set, and an explicit list replaces defaults instead of merging. */
  skills?: string[]; /** Per-agent overrides for the shared top-level memory configuration. */
  memory?: {
    search?: MemorySearchConfig;
  }; /** Human-like delay between block replies for this agent. */
  humanDelay?: HumanDelayConfig; /** Optional per-agent typing start policy. */
  typingMode?: AgentDefaultsConfig["typingMode"];
  /** Optional per-agent TTS overrides, deep-merged over top-level tts. */
  /** Per-agent TTS overrides. prefsPath remains scoped because agents may use distinct preference stores. */
  tts?: TtsConfig & {
    prefsPath?: string;
  }; /** Optional per-agent skills subsystem overrides. */
  skillsLimits?: Pick<SkillsLimitsConfig, "maxSkillsPromptChars">; /** Optional per-agent overrides for selected context/token-heavy limits. */
  contextLimits?: AgentContextLimitsConfig;
  contextTokens?: number; /** Optional per-agent heartbeat overrides. */
  heartbeat?: Omit<NonNullable<AgentDefaultsConfig["heartbeat"]>, "agentId">;
  identity?: IdentityConfig;
  groupChat?: Omit<GroupChatConfig, "visibleReplies">;
  subagents?: {
    /** Prompt-only guidance for how strongly this agent should delegate work. */delegationMode?: SubagentDelegationMode; /** Allow spawning sub-agents under other agent ids. Use "*" to allow any configured target. */
    allowAgents?: string[]; /** Per-agent default model for spawned sub-agents (string or {primary,fallbacks}). */
    model?: AgentModelConfig; /** Per-agent default thinking level for spawned sub-agents. */
    thinking?: string; /** Require explicit agentId in sessions_spawn (no default same-as-caller). */
    requireAgentId?: boolean;
  }; /** Optional per-agent embedded OpenClaw overrides. */
  embeddedAgent?: {
    /** Optional per-agent execution contract override. */executionContract?: EmbeddedAgentExecutionContract;
  }; /** Optional per-agent sandbox overrides. */
  sandbox?: AgentSandboxConfig; /** Optional per-agent stream params (e.g. cacheRetention, temperature). */
  params?: Record<string, unknown>;
  tools?: AgentToolsConfig; /** Optional runtime descriptor for this agent. */
  runtime?: AgentRuntimeConfig;
};
type AgentEntryConfig = Omit<AgentConfig, "id">;
type AgentsConfig = {
  defaults?: AgentDefaultsConfig;
  entries?: Record<string, AgentEntryConfig>; /** Internal non-serialized projection materialized by validation for ID-based runtime code. */
  list?: AgentConfig[];
};
//#endregion
//#region src/config/types.approvals.d.ts
type NativeExecApprovalEnableMode = boolean | "auto";
type ExecApprovalForwardingMode = "session" | "targets" | "both";
type ExecApprovalForwardTarget = {
  /** Channel id (e.g. "discord", "slack", or plugin channel id). */channel: string; /** Destination id (channel id, user id, etc. depending on channel). */
  to: string; /** Optional account id for multi-account channels. */
  accountId?: string; /** Optional thread id to reply inside a thread. */
  threadId?: string | number;
};
type ExecApprovalForwardingConfig = {
  /** Enable forwarding exec approvals to chat channels. Default: false. */enabled?: boolean; /** Delivery mode (session=origin chat, targets=config targets, both=both). Default: session. */
  mode?: ExecApprovalForwardingMode; /** Only forward approvals for these agent IDs. Omit = all agents. */
  agentFilter?: string[]; /** Only forward approvals matching these session key patterns (substring or regex). */
  sessionFilter?: string[]; /** Explicit delivery targets (used when mode includes targets). */
  targets?: ExecApprovalForwardTarget[];
};
type ApprovalsConfig = {
  exec?: ExecApprovalForwardingConfig;
  plugin?: ExecApprovalForwardingConfig;
};
//#endregion
//#region src/config/types.auth.d.ts
type AuthProfileConfig = {
  /** Provider id this auth profile can satisfy. */provider: string;
  /**
   * Auth route selected by this profile id.
   * - api_key: static provider API key
   * - oauth: refreshable OAuth credentials (access+refresh+expires)
   * - token: static bearer-style token (optionally expiring; no refresh)
   * - aws-sdk: AWS SDK default credential chain (no secret in auth-profiles.json)
   */
  mode: "api_key" | "aws-sdk" | "oauth" | "token"; /** Optional account email shown in profile selection/status surfaces. */
  email?: string; /** Optional human-readable label shown in profile selection/status surfaces. */
  displayName?: string;
};
type AuthConfig = {
  /** Named auth profiles keyed by profile id. */profiles?: Record<string, AuthProfileConfig>; /** Preferred profile order per provider id. */
  order?: Record<string, string[]>;
};
//#endregion
//#region src/config/types.browser.d.ts
type BrowserProfileConfig = {
  /** @deprecated Doctor-only legacy input; canonical schema rejects this field. */color?: string; /** CDP port for this profile. Allocated once at creation, persisted permanently. */
  cdpPort?: number; /** CDP/DevTools endpoint URL for this profile (remote CDP or existing-session endpoint attach). */
  cdpUrl?: string; /** Explicit user data directory for existing-session Chrome MCP attachment. */
  userDataDir?: string; /** Override the Chrome MCP command for existing-session profiles. */
  mcpCommand?: string; /** Extra Chrome MCP arguments for existing-session profiles. */
  mcpArgs?: string[];
  /**
   * Profile driver (default: openclaw). "extension" attaches to the user's
   * signed-in browser through the OpenClaw Chrome extension relay.
   */
  driver?: "openclaw" | "clawd" | "existing-session" | "extension"; /** If true, launch this profile in headless mode. Falls back to browser.headless. */
  headless?: boolean; /** Browser executable path for this profile. Falls back to browser.executablePath. */
  executablePath?: string; /** If true, never launch a browser for this profile; only attach. Falls back to browser.attachOnly. */
  attachOnly?: boolean;
};
type BrowserSnapshotDefaults = {
  /** Default snapshot mode (applies when mode is not provided). */mode?: "efficient";
};
type BrowserTabCleanupConfig = {
  /** Enable best-effort cleanup for tracked primary-agent browser tabs. Default: true */enabled?: boolean;
};
type BrowserSsrFPolicyConfig = SsrFPolicyConfig;
type BrowserConfig = {
  /** @deprecated Doctor-only legacy input; canonical schema rejects this field. */color?: string;
  enabled?: boolean; /** Allow importing cookies from the user's real Chrome-family profile into a managed profile (macOS). Default: true. */
  allowSystemProfileImport?: boolean; /** If false, disable browser act:evaluate (arbitrary JS). Default: true */
  evaluateEnabled?: boolean; /** Base URL of the CDP endpoint (for remote browsers). Default: loopback CDP on the derived port. */
  cdpUrl?: string; /** Override the browser executable path (all platforms). */
  executablePath?: string; /** Start Chrome headless (best-effort). Default: false */
  headless?: boolean; /** Pass --no-sandbox to Chrome (Linux containers). Default: false */
  noSandbox?: boolean; /** If true: never launch; only attach to an existing browser. Default: false */
  attachOnly?: boolean; /** Default profile to use when profile param is omitted. Default: "chrome" */
  defaultProfile?: string; /** Named browser profiles with explicit CDP ports or URLs. */
  profiles?: Record<string, BrowserProfileConfig>; /** Default snapshot options (applied by the browser tool/CLI when unset). */
  snapshotDefaults?: BrowserSnapshotDefaults; /** Best-effort cleanup policy for tabs opened by primary-agent browser sessions. */
  tabCleanup?: BrowserTabCleanupConfig; /** SSRF policy for browser navigation/open-tab operations. */
  ssrfPolicy?: BrowserSsrFPolicyConfig;
  /**
   * Additional Chrome launch arguments.
   * Useful for stealth flags, window size overrides, or custom user-agent strings.
   * Example: ["--window-size=1920,1080", "--disable-infobars"]
   */
  extraArgs?: string[];
};
//#endregion
//#region src/config/types.bot-loop-protection.d.ts
type ChannelBotLoopProtectionConfig = {
  /** Enable pair loop protection for channels that support it. */enabled?: boolean; /** Maximum events a sender/receiver pair may exchange within the window. */
  maxEventsPerWindow?: number; /** Sliding window length in seconds. */
  windowSeconds?: number; /** Cooldown seconds applied to a pair after the limit is hit. */
  cooldownSeconds?: number;
};
//#endregion
//#region src/config/types.channel-health.d.ts
type ChannelHeartbeatVisibilityConfig = {
  /** Show HEARTBEAT_OK acknowledgments in chat (default: false). */showOk?: boolean; /** Show heartbeat alerts with actual content (default: true). */
  showAlerts?: boolean; /** Emit indicator events for UI status display (default: true). */
  useIndicator?: boolean;
};
type ChannelHealthMonitorConfig = {
  /**
   * Enable channel-health-monitor restarts for this channel or account.
   * Inherits the global gateway setting when omitted.
   */
  enabled?: boolean;
};
//#endregion
//#region src/config/types.channel-messaging-common.d.ts
type CommonChannelMessagingConfig<TCapabilities = string[], TAllowFromEntry = string | number, TDefaultTo = string, TStreaming = ChannelDeliveryStreamingConfig> = {
  /** Optional display name for this account (used in CLI/UI lists). */name?: string; /** Optional provider capability tags used for agent/runtime guidance. */
  capabilities?: TCapabilities; /** Markdown formatting overrides (tables). */
  markdown?: MarkdownConfig; /** Allow channel-initiated config writes (default: true). */
  configWrites?: boolean; /** If false, do not start this account. Default: true. */
  enabled?: boolean; /** Direct message access policy (default: pairing). */
  dmPolicy?: DmPolicy; /** Optional allowlist for inbound DM senders. */
  allowFrom?: TAllowFromEntry[]; /** Default delivery target for CLI --deliver when no explicit --reply-to is provided. */
  defaultTo?: TDefaultTo; /** Optional allowlist for group/channel senders. */
  groupAllowFrom?: TAllowFromEntry[]; /** Group/channel message handling policy. */
  groupPolicy?: GroupPolicy; /** Scope configured mention patterns to selected conversations. */
  mentionPatterns?: MentionPatternsPolicyConfig;
  /**
   * Supplemental context visibility policy for fetched/group context.
   * - "all": include all quoted/thread/history context
   * - "allowlist": only include context from allowlisted senders
   * - "allowlist_quote": same as allowlist, but keep explicit quote/reply context
   */
  contextVisibility?: ContextVisibilityMode; /** Max group/channel messages to keep as history context (0 disables). */
  historyLimit?: number; /** Max DM turns to keep as history context. */
  dmHistoryLimit?: number; /** Per-DM config overrides keyed by sender ID. */
  dms?: Record<string, DmConfig>; /** Outbound text chunk size (chars). */
  textChunkLimit?: number; /** Delivery streaming config: chunk mode plus block streaming controls. */
  streaming?: TStreaming; /** Heartbeat visibility settings for this channel. */
  heartbeatVisibility?: ChannelHeartbeatVisibilityConfig; /** @deprecated Doctor-only legacy input. */
  heartbeat?: ChannelHeartbeatVisibilityConfig; /** Channel health monitor overrides for this channel/account. */
  healthMonitor?: ChannelHealthMonitorConfig; /** Outbound response prefix override for this channel/account. */
  responsePrefix?: string; /** Max outbound media size in MB. */
  mediaMaxMb?: number; /** Native reply-threading mode for automatic replies. */
  replyToMode?: ReplyToMode;
};
type ChannelExecApprovalTarget = "dm" | "channel" | "both";
type ChannelExecApprovalConfig<TApprover = string | number> = {
  enabled?: NativeExecApprovalEnableMode;
  approvers?: TApprover[];
  agentFilter?: string[];
  sessionFilter?: string[];
  target?: ChannelExecApprovalTarget;
};
type ChannelBotInteractionConfig<TAllowBots = boolean | "mentions"> = {
  allowBots?: TAllowBots;
  botLoopProtection?: ChannelBotLoopProtectionConfig;
  dangerouslyAllowNameMatching?: boolean;
};
type ChannelReadReceiptConfig = {
  sendReadReceipts?: boolean;
};
type ChannelMentionPatternsConfig<TArraySugar extends boolean = false> = TArraySugar extends true ? string[] : MentionPatternsPolicyConfig;
type ChannelReactionConfig<TNotification = never, TLevel = never, TAckReaction = never, TAllowlist extends boolean = false> = {
  reactionNotifications?: TNotification;
  reactionLevel?: TLevel;
  ackReaction?: TAckReaction;
} & (TAllowlist extends true ? {
  reactionAllowlist?: Array<string | number>;
} : Record<never, never>);
//#endregion
//#region src/config/types.discord-presence.d.ts
type DiscordPresenceEventsConfig = {
  /** Enable online-presence system events for this guild. Default: true when configured. */enabled?: boolean; /** Discord channel ID that receives the routed agent wake. */
  channelId: string; /** Optional immutable Discord user ID allowlist. Omit to include all human members. */
  users?: string[];
  /**
   * Suppress presence-derived online events for this many seconds after a new Gateway
   * session while guild presence state is rebuilt. 0 disables. Default: 300.
   */
  reconnectSuppressSeconds?: number; /** Maximum queued online events for this guild per burst window. Default: 8. */
  burstLimit?: number; /** Sliding burst-detection window in seconds. Default: 60. */
  burstWindowSeconds?: number;
};
//#endregion
//#region src/config/types.discord.d.ts
type DiscordChannelStreamingConfig = Omit<ChannelPreviewStreamingConfig, "progress"> & {
  progress?: ChannelStreamingProgressConfig;
};
type DiscordPluralKitConfig = {
  enabled?: boolean;
  token?: string;
};
type DiscordMentionAliasesConfig = Record<string, string>;
type DiscordDmConfig = {
  /** If false, ignore all incoming Discord DMs. Default: true. */enabled?: boolean; /** If true, allow group DMs (default: false). */
  groupEnabled?: boolean; /** Optional allowlist for group DM channels (ids or slugs). */
  groupChannels?: string[];
};
type DiscordGuildChannelConfig = {
  requireMention?: boolean;
  /**
   * If true, drop messages that mention another user/role but not this one (not @everyone/@here).
   * Default: false.
   */
  ignoreOtherMentions?: boolean; /** Optional tool policy overrides for this channel. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** If specified, only load these skills for this channel. Omit = all skills; empty = no skills. */
  skills?: string[]; /** If false, disable the bot for this channel. */
  enabled?: boolean; /** Optional allowlist for channel senders (ids or names). */
  users?: string[]; /** Optional allowlist for channel senders by role ID. */
  roles?: string[]; /** Optional system prompt snippet for this channel. */
  systemPrompt?: string; /** If false, omit thread starter context for this channel (default: true). */
  includeThreadStarter?: boolean; /** If true, automatically create a thread for each new message in this channel. */
  autoThread?: boolean; /** Archive duration (minutes) for auto-created threads. Valid values: 60, 1440, 4320, 10080. */
  autoArchiveDuration?: "60" | "1440" | "4320" | "10080" | 60 | 1440 | 4320 | 10080; /** Naming strategy for auto-created threads. "message" uses message text; "generated" renames with an LLM title. */
  autoThreadName?: "message" | "generated";
};
type DiscordReactionNotificationMode = "off" | "own" | "all" | "allowlist";
type DiscordGuildEntry = {
  slug?: string;
  requireMention?: boolean;
  /**
   * If true, drop messages that mention another user/role but not this one (not @everyone/@here).
   * Default: false.
   */
  ignoreOtherMentions?: boolean; /** Optional tool policy overrides for this guild (used when channel override is missing). */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** Reaction notification mode (off|own|all|allowlist). Default: own. */
  reactionNotifications?: DiscordReactionNotificationMode; /** Optional allowlist for guild senders (ids or names). */
  users?: string[]; /** Optional allowlist for guild senders by role ID. */
  roles?: string[];
  presenceEvents?: DiscordPresenceEventsConfig;
  channels?: Record<string, DiscordGuildChannelConfig>;
};
type DiscordActionConfig = {
  reactions?: boolean;
  stickers?: boolean;
  polls?: boolean;
  permissions?: boolean;
  messages?: boolean;
  threads?: boolean;
  pins?: boolean;
  search?: boolean;
  memberInfo?: boolean;
  roleInfo?: boolean;
  roles?: boolean;
  channelInfo?: boolean;
  voiceStatus?: boolean;
  events?: boolean;
  moderation?: boolean;
  emojiUploads?: boolean;
  stickerUploads?: boolean;
  channels?: boolean; /** Enable bot presence/activity changes (default: false). */
  presence?: boolean;
};
type DiscordIntentsConfig = {
  /**
   * Request the privileged Message Content intent. Disable only for mention-only guild operation;
   * Discord still includes content in DMs and messages that explicitly mention the bot. Default: true.
   */
  messageContent?: boolean; /** Enable Guild Presences privileged intent (requires Portal opt-in). Default: false. */
  presence?: boolean; /** Enable Guild Members privileged intent (requires Portal opt-in). Default: false. */
  guildMembers?: boolean; /** Enable Guild Voice States intent. Defaults to voice.enabled, unless explicitly set. */
  voiceStates?: boolean;
};
type DiscordVoiceAutoJoinConfig = {
  /** Guild ID that owns the voice channel. */guildId: string; /** Voice channel ID to join. */
  channelId: string;
};
type DiscordVoiceAllowedChannelConfig = {
  /** Guild ID that owns the voice channel. */guildId: string; /** Voice channel ID allowed for realtime voice sessions. */
  channelId: string;
};
type DiscordVoiceMode = "stt-tts" | "agent-proxy" | "bidi";
type DiscordVoiceRealtimeConsultPolicy = "auto" | "always";
type DiscordVoiceRealtimeToolPolicy = "safe-read-only" | "owner" | "none";
type DiscordVoiceRealtimeBootstrapContextFile = "IDENTITY.md" | "USER.md" | "SOUL.md";
type DiscordVoiceRealtimeConfig = {
  /** Realtime voice provider id, for example "openai". */provider?: string; /** Provider realtime session model, for example "gpt-realtime-2.1". */
  model?: string; /** Provider realtime output voice name, for example "cedar". */
  speakerVoice?: string; /** Provider realtime output voice id. */
  speakerVoiceId?: string; /** System instructions passed to the realtime provider. */
  instructions?: string; /** Tool policy for bidi realtime consult calls. */
  toolPolicy?: DiscordVoiceRealtimeToolPolicy; /** Whether bidi should force the OpenClaw agent brain for every substantive turn. */
  consultPolicy?: DiscordVoiceRealtimeConsultPolicy; /** OpenAI agent-proxy wake-name policy. Unset adapts to the room: off for one human, on for two or more. True always requires; false never requires. */
  requireWakeName?: boolean; /** Wake names that allow OpenAI agent-proxy realtime Discord voice to respond when the gate is active. Defaults to the routed agent name plus OpenClaw, or the agent id plus OpenClaw. */
  wakeNames?: string[]; /** Agent profile bootstrap files to include in realtime provider instructions. Defaults to IDENTITY.md, USER.md, and SOUL.md; set [] to disable. */
  bootstrapContextFiles?: DiscordVoiceRealtimeBootstrapContextFile[]; /** Allow Discord speaker-start events to interrupt active realtime playback. */
  bargeIn?: boolean; /** Minimum assistant playback duration before a barge-in truncates audio. Default: 250ms; set 0 for immediate interruption. */
  minBargeInAudioEndMs?: number; /** Debounce window before buffered transcripts are sent to the OpenClaw agent. */
  debounceMs?: number; /** Provider-specific realtime voice config keyed by provider id. */
  providers?: Record<string, Record<string, unknown> | undefined>;
};
type DiscordVoiceAgentSessionConfig = {
  /** Which OpenClaw conversation should receive voice turns. Default: "voice". */mode?: "voice" | "target"; /** Discord target used when mode is "target", for example "channel:123". */
  target?: string;
};
type DiscordVoiceConfig = {
  /** Enable Discord voice channel conversations (default: true). */enabled?: boolean; /** Voice conversation mode. Default: agent-proxy. */
  mode?: DiscordVoiceMode; /** Route voice turns through an existing OpenClaw Discord conversation. */
  agentSession?: DiscordVoiceAgentSessionConfig; /** Optional LLM model override for Discord voice channel responses. */
  model?: string; /** Realtime provider settings for agent-proxy or bidi modes. */
  realtime?: DiscordVoiceRealtimeConfig; /** Voice channels to auto-join on startup. */
  autoJoin?: DiscordVoiceAutoJoinConfig[]; /** If false, configured followUsers are ignored without removing the saved user list. */
  followUsersEnabled?: boolean; /** Discord user IDs whose current voice channel the bot should follow. */
  followUsers?: string[]; /** Voice channels the bot is allowed to join or remain in. Unset means any voice channel is allowed. */
  allowedChannels?: DiscordVoiceAllowedChannelConfig[]; /** Enable/disable DAVE end-to-end encryption (default: true; Discord may require this). */
  daveEncryption?: boolean; /** Consecutive decrypt failures before DAVE session reinitialization (default: 24). */
  decryptionFailureTolerance?: number; /** Initial @discordjs/voice Ready wait in milliseconds (default: 30000). */
  connectTimeoutMs?: number; /** Grace period for Discord voice reconnect signalling after a disconnect (default: 15000). */
  reconnectGraceMs?: number; /** Silence grace after Discord reports a speaker ended before finalizing STT capture (default: 2000). */
  captureSilenceGraceMs?: number; /** Optional TTS overrides for Discord voice output. */
  tts?: TtsConfig;
};
type DiscordExecApprovalConfig = ChannelExecApprovalConfig<string> & {
  /** Delete approval DMs after approval, denial, or timeout. Default: false. */cleanupAfterResolve?: boolean;
};
type DiscordAgentComponentsConfig = {
  /** Enable agent-controlled interactive components (buttons, select menus). Default: true. */enabled?: boolean; /** Time in milliseconds before sent Discord component callbacks expire. Default: 1800000. */
  ttlMs?: number;
};
type DiscordThreadBindingsConfig = {
  /** Enable Discord thread binding features. Overrides session.threadBindings.enabled. */enabled?: boolean; /** Inactivity window in hours. Set 0 to disable. Default: 24. */
  idleHours?: number; /** Hard max age in hours. Set 0 to disable. Default: 0. */
  maxAgeHours?: number; /** Allow session spawns to create and bind Discord threads. Default: true. */
  spawnSessions?: boolean; /** Default context mode for native subagents. Default: fork. */
  defaultSpawnContext?: "isolated" | "fork";
};
type DiscordSlashCommandConfig = {
  /** Reply ephemerally (default: true). */ephemeral?: boolean;
};
type DiscordThreadConfig = {
  /** If true, Discord thread sessions inherit the parent channel transcript. Default: false. */inheritParent?: boolean;
};
type DiscordAutoPresenceConfig = {
  /** Enable automatic runtime/quota-based Discord presence updates. Default: false. */enabled?: boolean; /** Poll interval for evaluating runtime availability state (ms). Default: 30000. */
  intervalMs?: number; /** Minimum spacing between actual gateway presence updates (ms). Default: 15000. */
  minUpdateIntervalMs?: number;
  /** Optional custom status text while runtime is healthy; supports plain text. */
  /** Optional custom status text while runtime/quota state is degraded or unknown. */
  /** Optional custom status text while runtime detects quota/token exhaustion. */
  /** @deprecated Doctor-only legacy input. */
  exhaustedText?: string;
};
type DiscordAccountConfig = Omit<CommonChannelMessagingConfig<string[], string, string, DiscordChannelStreamingConfig>, "groupAllowFrom"> & ChannelBotInteractionConfig & ChannelReactionConfig<never, never, string> & {
  /** Override native command registration for Discord (bool or "auto"). */commands?: ProviderCommandsConfig;
  token?: SecretInput; /** Optional Discord application/client ID. Set this when REST application lookup is blocked. */
  applicationId?: string;
  activities?: {
    clientSecret?: string;
    applicationId?: string;
  }; /** HTTP(S) proxy URL for Discord gateway WebSocket connections. */
  proxy?: string;
  /**
   * Deterministic outbound @handle rewrites for known Discord users.
   * Keys are handles without the leading @; values are Discord user IDs.
   */
  mentionAliases?: DiscordMentionAliasesConfig;
  /**
   * Suppress Discord-generated link embeds for outbound messages. Default: true.
   * Explicit `embeds` payloads are still sent normally.
   */
  suppressEmbeds?: boolean;
  /**
   * Soft max line count per Discord message.
   * Discord clients can clip/collapse very tall messages; splitting by lines
   * keeps replies readable in-channel. Default: 17.
   */
  maxLinesPerMessage?: number; /** Per-action tool gating (default: true for all). */
  actions?: DiscordActionConfig; /** Thread session behavior. */
  thread?: DiscordThreadConfig;
  dm?: DiscordDmConfig; /** New per-guild config keyed by guild id or slug. */
  guilds?: Record<string, DiscordGuildEntry>; /** Exec approval forwarding configuration. */
  execApprovals?: DiscordExecApprovalConfig; /** Agent-controlled interactive components (buttons, select menus). */
  agentComponents?: DiscordAgentComponentsConfig;
  /** Discord UI customization (components, modals, etc.). */
  /** Slash command configuration. */
  slashCommand?: DiscordSlashCommandConfig; /** Thread binding lifecycle settings. */
  threadBindings?: DiscordThreadBindingsConfig;
  /** Show subagent count reactions and typing on the source message. Default: false. */
  /** @deprecated Doctor-only legacy input. */
  subagentProgress?: boolean; /** Privileged Gateway Intents (must also be enabled in Discord Developer Portal). */
  intents?: DiscordIntentsConfig; /** Voice channel conversation settings. */
  voice?: DiscordVoiceConfig; /** PluralKit identity resolution for proxied messages. */
  pluralkit?: DiscordPluralKitConfig; /** When to send ack reactions for this Discord account. Overrides messages.ackReactionScope. */
  ackReactionScope?: "group-mentions" | "group-all" | "direct" | "all" | "off" | "none"; /** Bot activity status text (e.g. "Watching X"). */
  activity?: string; /** Bot status (online|dnd|idle|invisible). Defaults to online when presence is configured. */
  status?: "online" | "dnd" | "idle" | "invisible"; /** Automatic runtime/quota presence signaling (status text + status mapping). */
  autoPresence?: DiscordAutoPresenceConfig; /** Activity type (0=Game, 1=Streaming, 2=Listening, 3=Watching, 4=Custom, 5=Competing). Defaults to 4 (Custom) when activity is set. */
  activityType?: 0 | 1 | 2 | 3 | 4 | 5; /** Streaming URL (Twitch/YouTube). Required when activityType=1. */
  activityUrl?: string;
  /**
   * Legacy compatibility block. Discord no longer enforces channel-owned
   * timeouts for queued inbound agent runs.
   */
  inboundWorker?: {
    /**
     * Ignored. Queued Discord agent runs are governed by the session/tool/runtime
     * lifecycle, not by Discord channel config.
     */
    runTimeoutMs?: number;
  };
};
type DiscordConfig = {
  /** Optional per-account Discord configuration (multi-account). */accounts?: Record<string, DiscordAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & DiscordAccountConfig;
//#endregion
//#region src/config/types.googlechat.d.ts
type GoogleChatDmConfig = {
  /** If false, ignore all incoming Google Chat DMs. Default: true. */enabled?: boolean;
};
type GoogleChatGroupConfig = {
  /** If false, disable the bot in this space. */enabled?: boolean; /** Require mentioning the bot to trigger replies. */
  requireMention?: boolean; /** Sliding-window bot-pair loop guard for accepted bot-authored Google Chat messages. */
  botLoopProtection?: ChannelBotLoopProtectionConfig; /** Allowlist of users that can invoke the bot in this space. */
  users?: Array<string | number>; /** Optional system prompt for this space. */
  systemPrompt?: string;
};
type GoogleChatAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns"> & ChannelBotInteractionConfig<boolean> & {
  /** Default mention requirement for space messages (default: true). */requireMention?: boolean; /** Per-space configuration keyed by space id or name. */
  groups?: Record<string, GoogleChatGroupConfig>; /** Service account JSON (inline string, object, or secret reference). */
  serviceAccount?: string | Record<string, unknown> | SecretRef; /** Service account JSON file path. */
  serviceAccountFile?: string; /** Webhook audience type (app-url or project-number). */
  audienceType?: "app-url" | "project-number"; /** Audience value (app URL or project number). */
  audience?: string; /** Exact add-on principal to accept when app-url delivery uses add-on tokens. */
  appPrincipal?: string; /** Google Chat webhook path (default: /googlechat). */
  webhookPath?: string; /** Google Chat webhook URL (used to derive the path). */
  webhookUrl?: string; /** Optional bot user resource name (users/...). */
  botUser?: string; /** If false, ignore all incoming Google Chat DMs. Default: true. */
  dm?: GoogleChatDmConfig;
  /**
   * Typing indicator mode (default: "message").
   * - "none": No indicator
   * - "message": Send "_<name> is typing..._" then edit with response
   * - "reaction": React with 👀 to user message, remove on reply
   *   NOTE: Reaction mode requires user OAuth (not supported with service account auth).
   *   If configured, falls back to message mode with a warning.
   */
  typingIndicator?: "none" | "message" | "reaction";
};
type GoogleChatConfig = {
  /** Optional per-account Google Chat configuration (multi-account). */accounts?: Record<string, GoogleChatAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & GoogleChatAccountConfig;
//#endregion
//#region src/config/types.imessage.d.ts
/** Private-API and helper actions the iMessage runtime may expose to agents. */
type IMessageActionConfig = {
  reactions?: boolean;
  edit?: boolean;
  unsend?: boolean;
  reply?: boolean;
  sendWithEffect?: boolean;
  renameGroup?: boolean;
  setGroupIcon?: boolean;
  addParticipant?: boolean;
  removeParticipant?: boolean;
  leaveGroup?: boolean;
  sendAttachment?: boolean;
  polls?: boolean;
};
/** Inbound tapback notification policy. */
type IMessageReactionNotificationMode = "off" | "own" | "all";
type IMessageSendTransport = "auto" | "bridge" | "applescript";
/** Per-account iMessage runtime/config shape. */
type IMessageAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns" | "replyToMode"> & ChannelReadReceiptConfig & ChannelReactionConfig<IMessageReactionNotificationMode> & {
  /** imsg CLI binary path (default: imsg). */cliPath?: string; /** Optional Messages db path override. */
  dbPath?: string; /** Remote SSH host token for SCP attachment fetches (`host` or `user@host`). */
  remoteHost?: string; /** Enable or disable private API message actions. */
  actions?: IMessageActionConfig; /** Optional default send service (imessage|sms|auto). */
  service?: "imessage" | "sms" | "auto"; /** Preferred imsg RPC send transport. Default: auto. */
  sendTransport?: IMessageSendTransport; /** Optional default region (used when sending SMS). */
  region?: string; /** Include attachments + reactions in watch payloads. */
  includeAttachments?: boolean; /** Allowed local iMessage attachment roots (supports single-segment `*` wildcards). */
  attachmentRoots?: string[]; /** Allowed remote iMessage attachment roots for SCP fetches (supports `*`). */
  remoteAttachmentRoots?: string[]; /** Timeout for probe/RPC operations in milliseconds (default: 10000). */
  probeTimeoutMs?: number;
  /**
   * Merge consecutive same-sender DM rows from `chat.db` into a single agent
   * turn, so Apple's split-send (`<command> <URL>` arriving as two separate
   * rows several seconds apart) lands as one merged message. DM-only — group chats
   * keep instant per-message dispatch. Widens the default inbound debounce
   * window to 7000 ms when enabled without an explicit
   * `messages.inbound.byChannel.imessage` or global
   * `messages.inbound.debounceMs`. Default: `false`.
   */
  groups?: Record<string, {
    requireMention?: boolean;
    tools?: GroupToolPolicyConfig;
    toolsBySender?: GroupToolPolicyBySenderConfig;
    /**
     * Per-group system prompt. Injected into the agent's system prompt on
     * every turn that handles a message in that group. Matches the shape
     * already supported by Discord, Telegram, IRC, Slack, GoogleChat, and
     * other group-capable channels. The wildcard `groups["*"]` entry is
     * also honored.
     */
    systemPrompt?: string;
  }>;
  /**
   * Catchup: replay inbound messages that arrived in `chat.db` while the
   * gateway was offline (crash, restart, mac sleep). Disabled by default.
   * See https://github.com/openclaw/openclaw/issues/78649.
   */
  catchup?: {
    /** Master switch. Default `false`. */enabled?: boolean;
    /**
     * Maximum age of replayable messages in minutes. Messages older than
     * `now - maxAgeMinutes` are skipped even when the cursor is older.
     * Defense against runaway replay (the inverse of #62761). Default
     * `120` (2 h). Clamp `[1, 720]`.
     */
    maxAgeMinutes?: number;
    /**
     * Maximum messages to replay per catchup pass. Default `50`. Clamp
     * `[1, 500]`.
     */
    perRunLimit?: number;
    /**
     * On first run when no cursor exists, look back this many minutes.
     * Default `30`.
     */
    firstRunLookbackMinutes?: number;
    /**
     * Per-message retry ceiling. After this many consecutive failed
     * dispatch attempts against the same message guid, catchup logs a
     * `warn` and force-advances the cursor past the wedged message.
     * Default `10`. Clamp `[1, 1000]`.
     */
    maxFailureRetries?: number;
  };
};
/** Top-level iMessage config, with optional account map layered over default account fields. */
type IMessageConfig = {
  /** Optional per-account iMessage configuration (multi-account). */accounts?: Record<string, IMessageAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & IMessageAccountConfig;
//#endregion
//#region src/config/types.implicit-mentions.d.ts
type ChannelImplicitMentionsConfig = {
  /** Treat replies to the bot's own message as implicit mentions. */replyToBot?: boolean; /** Treat quoted bot messages as implicit mentions. */
  quotedBot?: boolean; /** Treat follow-ups in threads the bot participated in as implicit mentions. */
  threadParticipation?: boolean;
};
//#endregion
//#region src/config/types.irc.d.ts
type IrcAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns" | "replyToMode"> & {
  /** IRC server hostname (example: irc.example.com). */host?: string; /** IRC server port (default: 6697 with TLS, otherwise 6667). */
  port?: number; /** Use TLS for IRC connection (default: true). */
  tls?: boolean; /** IRC nickname to identify this bot. */
  nick?: string; /** IRC USER field username (defaults to nick). */
  username?: string; /** IRC USER field realname (default: OpenClaw). */
  realname?: string; /** Optional IRC server password (sensitive). */
  password?: string; /** Optional file path containing IRC server password. */
  passwordFile?: string; /** Optional NickServ identify/register settings. */
  nickserv?: {
    /** Enable NickServ identify/register after connect (default: enabled when password is set). */enabled?: boolean; /** NickServ service nick (default: NickServ). */
    service?: string; /** NickServ password (sensitive). */
    password?: string; /** Optional file path containing NickServ password. */
    passwordFile?: string; /** If true, send NickServ REGISTER on connect. */
    register?: boolean; /** Email used with NickServ REGISTER. */
    registerEmail?: string;
  }; /** Auto-join channel list at connect (example: ["#openclaw"]). */
  channels?: string[]; /** Outbound text chunk size (chars). Default: 350. */
  textChunkLimit?: number;
  groups?: Record<string, {
    requireMention?: boolean;
    tools?: GroupToolPolicyConfig;
    toolsBySender?: GroupToolPolicyBySenderConfig;
    allowFrom?: Array<string | number>;
    skills?: string[];
    enabled?: boolean;
    systemPrompt?: string;
  }>; /** Optional mention patterns specific to IRC channel messages. */
  mentionPatterns?: ChannelMentionPatternsConfig<true>;
};
type IrcConfig = {
  /** Optional per-account IRC configuration (multi-account). */accounts?: Record<string, IrcAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & IrcAccountConfig;
//#endregion
//#region src/config/types.msteams.d.ts
type MSTeamsWebhookConfig = {
  /** Port for the webhook server. Default: 3978. */port?: number; /** Path for the messages endpoint. Default: /api/messages. */
  path?: string;
};
/** Teams SDK cloud environment. Public cloud is the default. */
type MSTeamsCloudName = "Public" | "USGov" | "USGovDoD" | "China";
/**
 * Bot Framework OAuth SSO configuration for Microsoft Teams.
 *
 * When enabled, the plugin handles the `signin/tokenExchange` and
 * `signin/verifyState` invoke activities that Teams sends after an
 * `oauthCard` is presented to the user. The exchanged user token is
 * persisted via the Bot Framework User Token service so downstream
 * tools can call Microsoft Graph with delegated permissions.
 *
 * Prerequisites (Azure portal):
 * - The bot's Azure AD (Entra) app is configured with an exposed API
 *   scope (for example `access_as_user`) and lists the Teams client
 *   IDs in `knownClientApplications`.
 * - The Bot Framework channel registration has an OAuth Connection
 *   Setting whose name matches `connectionName` below, pointing at
 *   the same Azure AD app.
 */
type MSTeamsSsoConfig = {
  /** If true, handle signin/tokenExchange + signin/verifyState invokes. Default: false. */enabled?: boolean;
  /**
   * Name of the OAuth connection configured on the Bot Framework channel
   * registration (Azure Bot resource). Required when `enabled` is true.
   */
  connectionName?: string;
};
/** Reply style for MS Teams messages. */
type MSTeamsReplyStyle = "thread" | "top-level";
/** Channel-level config for MS Teams. */
type MSTeamsChannelConfig = {
  /** Require @mention to respond. Default: true. */requireMention?: boolean; /** Optional tool policy overrides for this channel. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** Reply style: "thread" replies to the message, "top-level" posts a new message. */
  replyStyle?: MSTeamsReplyStyle;
};
/** Team-level config for MS Teams. */
type MSTeamsTeamConfig = {
  /** Default requireMention for channels in this team. */requireMention?: boolean; /** Default tool policy for channels in this team. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** Default reply style for channels in this team. */
  replyStyle?: MSTeamsReplyStyle; /** Per-channel overrides. Key is conversation ID (e.g., "19:...@thread.tacv2"). */
  channels?: Record<string, MSTeamsChannelConfig>;
};
type MSTeamsConfig = Omit<CommonChannelMessagingConfig<string[], string, string, ChannelPreviewStreamingConfig>, "mentionPatterns" | "name" | "replyToMode"> & Pick<ChannelBotInteractionConfig<boolean>, "dangerouslyAllowNameMatching"> & {
  /** Azure Bot App ID (from Azure Bot registration). */appId?: string; /** Azure Bot App Password / Client Secret. */
  appPassword?: SecretInput; /** Azure AD Tenant ID (for single-tenant bots). */
  tenantId?: string; /** Teams SDK cloud environment. Default: Public. */
  cloud?: MSTeamsCloudName;
  /**
   * Bot Connector service URL used by SDK proactive sends/edits/deletes.
   * Set with `cloud` for USGov/DoD SDK clouds; set alone for GCC.
   */
  serviceUrl?: string;
  /**
   * Authentication type.
   * - `"secret"` (default): uses `appPassword` (client secret).
   * - `"federated"`: uses workload identity / managed identity / certificate.
   */
  authType?: "secret" | "federated"; /** Path to a PEM certificate file for certificate-based auth. Used when `authType` is `"federated"`. */
  certificatePath?: string; /** Certificate thumbprint (hex SHA-1) for certificate-based auth. */
  certificateThumbprint?: string; /** If `true`, use Azure Managed Identity (system- or user-assigned) instead of a certificate. */
  useManagedIdentity?: boolean; /** User-assigned managed-identity client ID. When omitted with `useManagedIdentity: true`, system-assigned identity is used. */
  managedIdentityClientId?: string; /** Webhook server configuration. */
  webhook?: MSTeamsWebhookConfig; /** Send native Teams typing indicator before replies. Default: true for groups/channels; DMs use informative stream status. */
  typingIndicator?: boolean;
  /**
   * Allowed host suffixes for inbound attachment downloads.
   * Use ["*"] to allow any host (not recommended).
   */
  mediaAllowHosts?: Array<string>;
  /**
   * Allowed host suffixes for attaching Authorization headers to inbound media retries.
   * Use specific hosts only; avoid multi-tenant suffixes.
   */
  mediaAuthAllowHosts?: Array<string>;
  /**
   * Query Graph for channel/group media when Bot Framework HTML omits file markers.
   * Requires the documented Graph permissions and adds one message lookup per
   * otherwise unresolved HTML activity. Default: false.
   */
  graphMediaFallback?: boolean; /** Default: require @mention to respond in channels/groups. */
  requireMention?: boolean; /** Default reply style: "thread" replies to the message, "top-level" posts a new message. */
  replyStyle?: MSTeamsReplyStyle; /** Per-team config. Key is team ID (from the /team/ URL path segment). */
  teams?: Record<string, MSTeamsTeamConfig>; /** SharePoint site ID for file uploads in group chats/channels (e.g., "contoso.sharepoint.com,guid1,guid2"). */
  sharePointSiteId?: string; /** Show a welcome Adaptive Card when the bot is added to a 1:1 chat. Default: true. */
  welcomeCard?: boolean; /** Custom prompt starter labels shown on the welcome card. */
  promptStarters?: string[]; /** Show a welcome message when the bot is added to a group chat. Default: false. */
  groupWelcomeCard?: boolean; /** Enable the Teams feedback loop (thumbs up/down) on AI-generated messages. Default: true. */
  feedbackEnabled?: boolean; /** Enable background reflection when a user gives negative feedback. Default: true. */
  feedbackReflection?: boolean; /** Minimum interval (ms) between reflections per session. Default: 300000 (5 min). */
  feedbackReflectionCooldownMs?: number; /** Delegated auth settings for user-scoped Graph API actions (e.g., reactions). */
  delegatedAuth?: {
    /** Enable delegated auth (user sign-in for Graph actions that need user scope). */enabled?: boolean; /** Additional scopes to request during OAuth consent. */
    scopes?: string[];
  }; /** Bot Framework OAuth SSO (signin/tokenExchange + signin/verifyState) settings. */
  sso?: MSTeamsSsoConfig;
};
//#endregion
//#region src/config/types.signal.d.ts
type SignalReactionNotificationMode = "off" | "own" | "all" | "allowlist";
type SignalReactionLevel = "off" | "ack" | "minimal" | "extensive";
type SignalTransportConfig = {
  kind: "managed-native"; /** Optional signal-cli config directory path (passed as --config). */
  configPath?: string; /** Native daemon connection URL when it differs from the managed bind endpoint. */
  url?: string; /** HTTP host for the managed signal-cli daemon (default 127.0.0.1). */
  httpHost?: string; /** HTTP port for the managed signal-cli daemon (default 8080). */
  httpPort?: number; /** signal-cli binary path (default: signal-cli). */
  cliPath?: string; /** Max time to wait for signal-cli daemon startup (ms, cap 120000). */
  startupTimeoutMs?: number;
  receiveMode?: "on-start" | "manual";
  ignoreStories?: boolean;
} | {
  kind: "external-native"; /** Base URL for an externally managed native signal-cli HTTP daemon. */
  url: string;
} | {
  kind: "container"; /** Base URL for bbernhard/signal-cli-rest-api. */
  url: string;
};
type SignalGroupConfig = {
  requireMention?: boolean; /** Emit internal message hooks for mention-skipped group messages. */
  ingest?: boolean;
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig;
};
type SignalAccountConfig = Omit<CommonChannelMessagingConfig, "mentionPatterns"> & ChannelReadReceiptConfig & ChannelReactionConfig<SignalReactionNotificationMode, SignalReactionLevel, never, true> & {
  /** Optional explicit E.164 account for signal-cli. */account?: string; /** Optional account UUID for signal-cli (used for loop protection). */
  accountUuid?: string; /** Concrete transport owned by this account. Defaults to managed native signal-cli. */
  transport?: SignalTransportConfig; /** Skip downloading inbound Signal attachments. */
  ignoreAttachments?: boolean; /** OpenClaw-side target aliases keyed by friendly name. */
  aliases?: Record<string, string>; /** Per-group overrides keyed by Signal group id (or "*"). */
  groups?: Record<string, SignalGroupConfig>; /** Optional per-chat-type native reply quoting overrides. */
  replyToModeByChatType?: Partial<Record<"direct" | "group", ReplyToMode>>; /** Action toggles for message tool capabilities. */
  actions?: {
    /** Enable/disable sending reactions via message tool (default: true). */reactions?: boolean;
  };
};
type SignalConfig = {
  /** Optional per-account Signal configuration (multi-account). */accounts?: Record<string, SignalAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & SignalAccountConfig;
//#endregion
//#region src/config/types.slack.d.ts
type SlackDmConfig = {
  /** If false, ignore all incoming Slack DMs. Default: true. */enabled?: boolean; /** If true, allow group DMs (default: false). */
  groupEnabled?: boolean; /** Optional allowlist for group DM channels (ids or slugs). */
  groupChannels?: Array<string | number>;
};
type SlackChannelConfig = {
  /** If false, disable the bot in this channel. */enabled?: boolean; /** Require mentioning the bot to trigger replies. */
  requireMention?: boolean;
  /**
   * Ignore room messages that mention another user or user group but not this bot.
   * Requires a resolved bot user ID. Default: false.
   */
  ignoreOtherMentions?: boolean; /** Override Slack reply/thread behavior for this channel. */
  replyToMode?: ReplyToMode; /** Optional tool policy overrides for this channel. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** Allow bot-authored messages to trigger replies (default: false). Set to "mentions" to only allow bot messages that @mention this bot. */
  allowBots?: boolean | "mentions"; /** Sliding-window bot-pair loop guard for accepted bot-authored Slack messages. */
  botLoopProtection?: ChannelBotLoopProtectionConfig; /** Allowlist of users that can invoke the bot in this channel. */
  users?: Array<string | number>; /** Optional skill filter for this channel. */
  skills?: string[]; /** Optional system prompt for this channel. */
  systemPrompt?: string; /** Slack presence polling and agent wake mode for this channel. */
  presenceEvents?: SlackPresenceEventsConfig;
};
type SlackPresenceEventsMode = "off" | "auto" | "on";
type SlackPresenceEventsConfig = {
  /** Presence wake mode. Default: off. */mode?: SlackPresenceEventsMode;
};
type SlackReactionNotificationMode = "off" | "own" | "all" | "allowlist";
type SlackStreamingProgressConfig = ChannelStreamingProgressConfig & {
  /** Opt in to Slack-native task cards for progress mode. Default: false. */nativeTaskCards?: boolean;
};
type SlackChannelStreamingConfig = {
  mode?: StreamingMode;
  chunkMode?: TextChunkMode;
  nativeTransport?: boolean;
  preview?: ChannelStreamingPreviewConfig;
  progress?: SlackStreamingProgressConfig;
  block?: ChannelStreamingBlockConfig;
};
type SlackExecApprovalConfig = ChannelExecApprovalConfig;
type SlackCapabilitiesConfig = string[];
type SlackActionConfig = {
  reactions?: boolean;
  messages?: boolean;
  pins?: boolean;
  search?: boolean;
  permissions?: boolean;
  memberInfo?: boolean;
  channelInfo?: boolean;
  emojiList?: boolean;
};
type SlackSlashCommandConfig = {
  /** Enable handling for the configured slash command (default: false). */enabled?: boolean; /** Slash command name (default: "openclaw"). */
  name?: string; /** Session key prefix for slash commands (default: "slack:slash"). */
  sessionPrefix?: string; /** Reply ephemerally (default: true). */
  ephemeral?: boolean;
};
type SlackThreadConfig = {
  /** Scope for thread history context (thread|channel). Default: thread. */historyScope?: "thread" | "channel"; /** If true, thread sessions inherit the parent channel transcript. Default: false. */
  inheritParent?: boolean; /** Maximum number of thread messages to fetch as context when starting a new thread session (default: 20). Set to 0 to disable thread history fetching. */
  initialHistoryLimit?: number;
};
type SlackRelayConfig = {
  /** Full relay websocket URL, including the route path. */url?: string; /** Bearer token used to authenticate the gateway websocket to the Slack relay. */
  authToken?: SecretInput; /** Gateway destination id registered with openclaw-slack-router. */
  gatewayId?: string;
};
type SlackAccountConfig = Omit<CommonChannelMessagingConfig<SlackCapabilitiesConfig, string | number, string, SlackChannelStreamingConfig>, "groupAllowFrom"> & ChannelBotInteractionConfig & ChannelReactionConfig<SlackReactionNotificationMode, never, string, true> & {
  /** @deprecated Doctor-only legacy input. */identity?: "bot" | "user"; /** @deprecated Doctor-only legacy input. */
  socketMode?: {
    clientPingTimeout?: number;
    serverPingTimeout?: number;
    pingPongLoggingEnabled?: boolean;
  }; /** Slack author identity. Default: bot. */
  postAs?: "bot" | "user"; /** Slack connection mode (socket|http|relay). Default: socket. */
  mode?: "socket" | "http" | "relay";
  /**
   * Treat this account as one Slack Enterprise Grid org-wide installation.
   * The declaration is verified against auth.test during monitor startup.
   * DMs must be disabled or use dmPolicy="open" with effective allowFrom containing "*".
   */
  enterpriseOrgInstall?: boolean;
  /** Slack SDK Socket Mode transport options. Ignored in HTTP mode. */
  /** Relay-delivered Slack event source. Used when mode is "relay". */
  relay?: SlackRelayConfig; /** Slack signing secret (required for HTTP mode). */
  signingSecret?: SecretInput; /** Slack Events API webhook path (default: /slack/events). */
  webhookPath?: string; /** Slack-native exec approval delivery + approver authorization. */
  execApprovals?: SlackExecApprovalConfig; /** Override native command registration for Slack (bool or "auto"). */
  commands?: ProviderCommandsConfig;
  botToken?: SecretInput;
  appToken?: SecretInput;
  userToken?: SecretInput; /** If true, restrict user token to read operations only. Default: true. */
  userTokenReadOnly?: boolean; /** Default mention requirement for channel messages (default: true). */
  requireMention?: boolean; /** Implicit mention policy for replies, quotes, and participated threads. */
  implicitMentions?: ChannelImplicitMentionsConfig; /** Pass through Slack chat.postMessage link unfurl control. Default: false. */
  unfurlLinks?: boolean; /** Pass through Slack chat.postMessage media unfurl control. Omitted by default. */
  unfurlMedia?: boolean;
  /**
   * Optional per-chat-type reply threading overrides.
   * Example: { direct: "all", group: "first", channel: "off" }.
   */
  replyToModeByChatType?: Partial<Record<"direct" | "group" | "channel", ReplyToMode>>; /** Thread session behavior. */
  thread?: SlackThreadConfig; /** Poll Slack presence and wake the routed agent on away-to-active transitions. Default: off. */
  presenceEvents?: SlackPresenceEventsConfig;
  actions?: SlackActionConfig;
  slashCommand?: SlackSlashCommandConfig;
  dm?: SlackDmConfig;
  channels?: Record<string, SlackChannelConfig>; /** Reaction emoji added while processing a reply (e.g. "hourglass_flowing_sand"). Removed when done. Useful as a typing indicator fallback when assistant mode is not enabled. */
  typingReaction?: string;
};
type SlackConfig = {
  /** Optional per-account Slack configuration (multi-account). */accounts?: Record<string, SlackAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & SlackAccountConfig;
//#endregion
//#region src/config/types.telegram.d.ts
type TelegramActionConfig = {
  reactions?: boolean;
  sendMessage?: boolean; /** Enable poll creation. Requires sendMessage to also be enabled. */
  poll?: boolean;
  deleteMessage?: boolean;
  editMessage?: boolean; /** Enable sticker actions (send and search). */
  sticker?: boolean; /** Enable forum topic creation. */
  createForumTopic?: boolean; /** Enable forum topic editing (rename / change icon). */
  editForumTopic?: boolean;
};
type TelegramThreadBindingsConfig = SessionThreadBindingsConfig;
type TelegramNetworkConfig = {
  /** Override Node's autoSelectFamily behavior (true = enable, false = disable). */autoSelectFamily?: boolean;
  /**
   * DNS result order for network requests ("ipv4first" | "verbatim").
   * Set to "ipv4first" to prioritize IPv4 addresses and work around IPv6 issues.
   * Default: "ipv4first" on Node 22+ to avoid common fetch failures.
   */
  dnsResultOrder?: "ipv4first" | "verbatim";
  /**
   * Dangerous opt-in for Telegram media downloads in trusted fake-IP or
   * transparent-proxy environments that resolve api.telegram.org to
   * private/internal/special-use addresses.
   */
  dangerouslyAllowPrivateNetwork?: boolean;
};
type TelegramInlineButtonsScope = "off" | "dm" | "group" | "all" | "allowlist";
type TelegramPreviewStreamingConfig = Omit<ChannelPreviewStreamingConfig, "preview"> & {
  preview?: ChannelStreamingPreviewConfig;
};
type TelegramExecApprovalConfig = ChannelExecApprovalConfig;
type TelegramCapabilitiesConfig = string[] | {
  inlineButtons?: TelegramInlineButtonsScope;
};
/** Custom command definition for Telegram bot menu. */
type TelegramCustomCommand = {
  /** Command name (without leading /). */command: string; /** Description shown in Telegram command menu. */
  description: string;
};
type TelegramAccountConfig = CommonChannelMessagingConfig<TelegramCapabilitiesConfig, string | number, string | number, TelegramPreviewStreamingConfig> & ChannelReactionConfig<"off" | "own" | "all", "off" | "ack" | "minimal" | "extensive", string> & {
  /** Telegram-native exec approval delivery + approver authorization. */execApprovals?: TelegramExecApprovalConfig; /** Override native command registration for Telegram (bool or "auto"). */
  commands?: ProviderCommandsConfig; /** Custom commands to register in Telegram's command menu (merged with native). */
  customCommands?: TelegramCustomCommand[];
  botToken?: string; /** Path to a regular file containing the bot token; symlinks are rejected. */
  tokenFile?: string;
  groups?: Record<string, TelegramGroupConfig>; /** Per-DM configuration for Telegram DM topics (key is chat ID). */
  direct?: Record<string, TelegramDirectConfig>;
  /**
   * Use Telegram Bot API 10.1 rich messages for text sends and edits.
   * When false (default), falls back to HTML/plain text formatting via sendMessage.
   * Set to true to enable native tables, details, and rich media via sendRichMessage.
   * Note: Some Telegram clients (Web, Desktop, older mobile) do NOT support
   * sendRichMessage and will show "This message is not supported" errors.
   * Default: false.
   */
  richMessages?: boolean; /** Network transport overrides for Telegram. */
  network?: TelegramNetworkConfig;
  proxy?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  webhookPath?: string; /** Local webhook listener bind host (default: 127.0.0.1). */
  webhookHost?: string; /** Local webhook listener bind port (default: 8787). */
  webhookPort?: number; /** Path to the self-signed certificate (PEM) to upload to Telegram during webhook registration. */
  webhookCertPath?: string; /** Per-action tool gating (default: true for all). */
  actions?: TelegramActionConfig; /** Telegram thread/conversation binding overrides. */
  threadBindings?: TelegramThreadBindingsConfig;
  /**
   * Controls which user reactions trigger notifications:
   * - "off" (default): ignore all reactions
   * - "own": notify when users react to bot messages
   * - "all": notify agent of all reactions
   */
  /**
   * Controls agent's reaction capability:
   * - "off": agent cannot react
   * - "ack" (default): bot sends acknowledgment reactions (👀 while processing)
   * - "minimal": agent can react sparingly (guideline: 1 per 5-10 exchanges)
   * - "extensive": agent can react liberally when appropriate
   */
  /** Controls whether link previews are shown in outbound messages. Default: true. */
  linkPreview?: boolean; /** Send Telegram bot error replies silently (no notification sound). Default: false. */
  silentErrorReplies?: boolean; /** Controls outbound error reporting: always, once per cooldown window, or silent. */
  errorPolicy?: "always" | "once" | "silent";
  /**
   * Per-channel outbound response prefix override.
   *
   * Account values take precedence over the channel-level value.
   * Use `""` to explicitly disable a global prefix for this channel.
   * Use `"auto"` to derive `[{identity.name}]` from the routed agent.
   */
  /**
   * Per-channel ack reaction override.
   * Telegram expects unicode emoji (e.g., "👀") rather than shortcodes.
   */
  /** Custom Telegram Bot API root URL (e.g. "https://my-proxy.example.com" or a local Bot API server), not a /bot<TOKEN> endpoint. */
  apiRoot?: string; /** Trusted local filesystem roots for self-hosted Telegram Bot API absolute file_path values. */
  trustedLocalFileRoots?: string[]; /** Auto-rename DM forum topics on first message using LLM. Default: true. */
  autoTopicLabel?: AutoTopicLabelConfig;
};
type TelegramTopicConfig = {
  requireMention?: boolean; /** Emit internal message hooks for mention-skipped topic messages. */
  ingest?: boolean; /** Per-topic override for group message policy (open|disabled|allowlist). */
  groupPolicy?: GroupPolicy; /** If specified, only load these skills for this topic. Omit = all skills; empty = no skills. */
  skills?: string[]; /** If false, disable the bot for this topic. */
  enabled?: boolean; /** Optional allowlist for topic senders (numeric Telegram user IDs). */
  allowFrom?: Array<string | number>; /** Optional system prompt snippet for this topic. */
  systemPrompt?: string; /** If true, skip automatic voice-note transcription for mention detection in this topic. */
  disableAudioPreflight?: boolean; /** Route this topic to a specific agent (overrides group-level and binding routing). */
  agentId?: string; /** Controls outbound error reporting for this topic. */
  errorPolicy?: "always" | "once" | "silent";
};
type TelegramGroupConfig = {
  requireMention?: boolean; /** Emit internal message hooks for mention-skipped group messages. */
  ingest?: boolean; /** Per-group override for group message policy (open|disabled|allowlist). */
  groupPolicy?: GroupPolicy; /** Optional tool policy overrides for this group. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** If specified, only load these skills for this group (when no topic). Omit = all skills; empty = no skills. */
  skills?: string[]; /** Per-topic configuration (key is message_thread_id as string, or "*" for topic defaults). */
  topics?: Record<string, TelegramTopicConfig>; /** If false, disable the bot for this group (and its topics). */
  enabled?: boolean; /** Optional allowlist for group senders (numeric Telegram user IDs). */
  allowFrom?: Array<string | number>; /** Optional system prompt snippet for this group. */
  systemPrompt?: string; /** If true, skip automatic voice-note transcription for mention detection in this group. */
  disableAudioPreflight?: boolean; /** Controls outbound error reporting for this group. */
  errorPolicy?: "always" | "once" | "silent";
};
/** Config for LLM-based auto-topic labeling. */
type AutoTopicLabelConfig = boolean | {
  enabled?: boolean; /** Custom prompt for LLM-based topic naming. */
  prompt?: string;
};
type TelegramDirectConfig = {
  /** Per-DM override for DM message policy (open|disabled|allowlist). */dmPolicy?: DmPolicy; /** Optional tool policy overrides for this DM. */
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** If specified, only load these skills for this DM (when no topic). Omit = all skills; empty = no skills. */
  skills?: string[]; /** Per-topic configuration for DM topics (key is message_thread_id as string, or "*" for topic defaults). */
  topics?: Record<string, TelegramTopicConfig>; /** If false, disable the bot for this DM (and its topics). */
  enabled?: boolean; /** If true, require messages to be from a topic when topics are enabled. */
  requireTopic?: boolean; /** Optional allowlist for DM senders (numeric Telegram user IDs). */
  allowFrom?: Array<string | number>; /** Optional system prompt snippet for this DM. */
  systemPrompt?: string; /** Controls outbound error reporting for this DM. */
  errorPolicy?: "always" | "once" | "silent"; /** Auto-rename DM forum topics on first message using LLM. Default: true. */
  autoTopicLabel?: AutoTopicLabelConfig;
};
type TelegramConfig = {
  /** Optional per-account Telegram configuration (multi-account). */accounts?: Record<string, TelegramAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string;
} & TelegramAccountConfig;
//#endregion
//#region src/utils/reaction-level.d.ts
/**
 * Shared reaction-level resolver for channel plugins that expose ACK and agent reaction controls.
 * Channel adapters supply defaults/fallbacks; this helper owns the common flag expansion.
 */
/** User-configurable reaction behavior level for channel delivery. */
type ReactionLevel = "off" | "ack" | "minimal" | "extensive";
//#endregion
//#region src/config/types.whatsapp.d.ts
type WhatsAppActionConfig = {
  reactions?: boolean;
  sendMessage?: boolean;
  polls?: boolean; /** Enable the experimental requester-bound voice-call tool. Default: false. */
  calls?: boolean;
};
type WhatsAppReactionLevel = ReactionLevel;
type WhatsAppGroupConfig = {
  requireMention?: boolean;
  tools?: GroupToolPolicyConfig;
  toolsBySender?: GroupToolPolicyBySenderConfig; /** Optional system prompt for this group. */
  systemPrompt?: string;
};
type WhatsAppDirectConfig = {
  /** Optional system prompt for this direct chat. */systemPrompt?: string;
};
type WhatsAppAckReactionConfig = {
  /** Emoji to use for acknowledgment (e.g., "👀"). Empty = disabled. */emoji?: string; /** Send reactions in direct chats. Default: true. */
  direct?: boolean;
  /**
   * Send reactions in group chats:
   * - "always": react to all group messages
   * - "mentions": react only when bot is mentioned
   * - "never": never react in groups
   * Default: "mentions"
   */
  group?: "always" | "mentions" | "never";
};
type WhatsAppSharedConfig = CommonChannelMessagingConfig<string[], string> & ChannelReadReceiptConfig & ChannelReactionConfig<never, WhatsAppReactionLevel, WhatsAppAckReactionConfig> & {
  /** Same-phone setup (bot uses your personal WhatsApp number). */selfChatMode?: boolean;
  groups?: Record<string, WhatsAppGroupConfig>; /** Per-direct-chat prompt overrides keyed by user ID or `*` wildcard. */
  direct?: Record<string, WhatsAppDirectConfig>;
};
type WhatsAppSpecificConfig = {
  /** @deprecated Doctor-only legacy input. */messagePrefix?: string;
};
type WhatsAppConfig = Omit<WhatsAppSharedConfig, "name"> & WhatsAppSpecificConfig & {
  /** Optional per-account WhatsApp configuration (multi-account). */accounts?: Record<string, WhatsAppAccountConfig>; /** Optional default account id when multiple accounts are configured. */
  defaultAccount?: string; /** Per-action tool gating. Calls default to false; existing actions default to true. */
  actions?: WhatsAppActionConfig; /** Plugin hook opt-in configuration for privacy-sensitive inbound events. */
  pluginHooks?: {
    /** Enable message_received hooks to broadcast inbound WhatsApp messages to plugins. */messageReceived?: boolean;
  };
};
type WhatsAppAccountConfig = WhatsAppSpecificConfig & WhatsAppSharedConfig & {
  /** Optional display name for this account (used in CLI/UI lists). */name?: string; /** Override auth directory (Baileys multi-file auth state). */
  authDir?: string; /** Plugin hook opt-in configuration for privacy-sensitive inbound events. */
  pluginHooks?: {
    /** Enable message_received hooks to broadcast inbound WhatsApp messages to plugins. */messageReceived?: boolean;
  };
};
//#endregion
//#region src/config/types.channels.d.ts
type ChannelDefaultsConfig = {
  /** @deprecated Doctor-only legacy input. */heartbeat?: ChannelHeartbeatVisibilityConfig; /** Default group-chat admission policy inherited by channels that support groups. */
  groupPolicy?: GroupPolicy; /** Default history/context visibility inherited by channel configs. */
  contextVisibility?: ContextVisibilityMode; /** Default heartbeat visibility for all channels. */
  heartbeatVisibility?: ChannelHeartbeatVisibilityConfig; /** Default pair loop guard settings for channels that support bot loop protection. */
  botLoopProtection?: ChannelBotLoopProtectionConfig; /** Default implicit-mention policy inherited by supporting channels. */
  implicitMentions?: ChannelImplicitMentionsConfig;
};
/** Provider/channel/target model override map used by channel dispatch. Keys are channel-specific group IDs, thread IDs, channel names, or DM peer identifiers (see docs/gateway/config-channels.md). */
type ChannelModelByChannelConfig = Record<string, Record<string, string>>;
/** JSON-compatible open-world channel section for plugin ids unknown to core. */
type OpenWorldChannelConfig = ReturnType<typeof JSON.parse>;
/**
 * Base type for extension channel config sections.
 * Extensions can use this as a starting point for their channel config.
 */
interface ChannelsConfig {
  /** Shared defaults inherited by channel sections unless they override them. */
  defaults?: ChannelDefaultsConfig;
  /** Map provider -> channel id / DM peer id -> model override. See docs/gateway/config-channels.md for supported key forms. */
  modelByChannel?: ChannelModelByChannelConfig;
  discord?: DiscordConfig;
  googlechat?: GoogleChatConfig;
  imessage?: IMessageConfig;
  irc?: IrcConfig;
  msteams?: MSTeamsConfig;
  signal?: SignalConfig;
  slack?: SlackConfig;
  telegram?: TelegramConfig;
  whatsapp?: WhatsAppConfig;
  /**
   * Channel sections are plugin-owned and keyed by arbitrary channel ids.
   * Open-world config keeps SDK/plugin-owned sections ergonomic for dynamic ids.
   */
  [key: string]: OpenWorldChannelConfig;
}
//#endregion
//#region src/config/types.cloud-workers.d.ts
type CloudWorkerProfileConfig = {
  /** Worker provider id registered by a plugin. */provider: string; /** Worker install method (default: bundle); npm requires a released gateway version. */
  install?: "bundle" | "npm"; /** Provider-owned JSON settings; secret-bearing fields use SecretRef objects. */
  settings?: Record<string, unknown>;
};
type CloudWorkersConfig = {
  /** Named opt-in worker profiles. Omit or leave empty to disable cloud workers. */profiles?: Record<string, CloudWorkerProfileConfig>;
};
//#endregion
//#region src/config/types.cron.d.ts
type CronFailureAlertConfig = {
  enabled?: boolean;
  after?: number;
  cooldownMs?: number;
  includeSkipped?: boolean;
  mode?: "announce" | "webhook";
  accountId?: string;
  channel?: string;
  to?: string;
};
type CronConfig = {
  enabled?: boolean;
  triggers?: {
    enabled?: boolean;
  }; /** Bearer token for cron webhook POST delivery. */
  webhookToken?: SecretInput; /** SSRF policy for all outbound cron webhook deliveries. */
  webhookSsrfPolicy?: SsrFPolicyConfig;
  /**
   * How long to retain completed cron run sessions before automatic pruning.
   * Accepts a duration string (e.g. "24h", "7d", "1h30m") or `false` to disable pruning.
   * Default: "24h".
   */
  sessionRetention?: string | false;
  failureAlert?: CronFailureAlertConfig;
};
//#endregion
//#region src/config/types.gateway.d.ts
/** Gateway bind-address policy for local server startup. */
type GatewayBindMode = "auto" | "lan" | "loopback" | "custom" | "tailnet";
type GatewayTlsConfig = {
  /** Enable TLS for the gateway server. */enabled?: boolean; /** Auto-generate a self-signed cert if cert/key are missing (default: true). */
  autoGenerate?: boolean; /** PEM certificate path for the gateway server. */
  certPath?: string; /** PEM private key path for the gateway server. */
  keyPath?: string; /** Optional PEM CA bundle for TLS clients (mTLS or custom roots). */
  caPath?: string;
};
type WideAreaDiscoveryConfig = {
  /** Optional unicast DNS-SD domain (e.g. "openclaw.internal"). */domain?: string;
};
/** mDNS/Bonjour metadata exposure level for local gateway discovery. */
type MdnsDiscoveryMode = "off" | "minimal" | "full";
type MdnsDiscoveryConfig = {
  /**
   * mDNS/Bonjour discovery broadcast mode (default: minimal).
   * - off: disable mDNS entirely
   * - minimal: omit cliPath/sshPort from TXT records
   * - full: include cliPath/sshPort in TXT records
   */
  mode?: MdnsDiscoveryMode;
};
type DiscoveryConfig = {
  /** Wide-area DNS-SD discovery settings. */wideArea?: WideAreaDiscoveryConfig; /** Local mDNS/Bonjour discovery settings. */
  mdns?: MdnsDiscoveryConfig;
};
type TalkProviderConfig = {
  /** Provider API key (optional; provider-specific env fallback may apply). */apiKey?: SecretInput; /** Provider-owned Talk config fields. */
  [key: string]: unknown;
};
type TalkRealtimeConfig = {
  /** Active realtime voice provider. */provider?: string; /** Provider-specific realtime voice config keyed by provider id. */
  providers?: Record<string, TalkProviderConfig>; /** Provider model override for realtime sessions. */
  model?: string; /** Provider speaker voice name override for realtime sessions. */
  speakerVoice?: string; /** Provider speaker voice id override for realtime sessions. */
  speakerVoiceId?: string; /** Additional system instructions appended to realtime Talk sessions. */
  instructions?: string; /** Realtime execution mode. */
  mode?: "realtime" | "stt-tts" | "transcription"; /** Byte/session transport. */
  transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room"; /** Voice activity detection threshold from 0 (most sensitive) to 1 (least sensitive). */
  vadThreshold?: number; /** Milliseconds of silence before the current user turn is committed. */
  silenceDurationMs?: number; /** Milliseconds of audio retained before detected speech begins. */
  prefixPaddingMs?: number; /** Provider-specific realtime reasoning effort. */
  reasoningEffort?: string; /** Tool/agent strategy for realtime sessions. */
  brain?: "agent-consult" | "direct-tools" | "none"; /** How Gateway relay handles final user transcripts when the provider skips a consult. */
  consultRouting?: "provider-direct" | "force-agent-consult";
};
type TalkConfig = {
  /** Agent that owns Talk sessions created without an agent-scoped session key. */agentId?: string; /** Active Talk TTS provider (for example "acme-speech"). */
  provider?: string; /** Provider-specific Talk config keyed by provider id. */
  providers?: Record<string, TalkProviderConfig>; /** Realtime Talk provider, model, voice, mode, transport, and brain config. */
  realtime?: TalkRealtimeConfig; /** Optional thinking level override for the agent run behind Talk realtime consults. */
  consultThinkingLevel?: "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "adaptive" | "max" | "ultra"; /** Optional fast mode override for the agent run behind Talk realtime consults. */
  consultFastMode?: boolean; /** BCP 47 locale id used for Talk speech recognition on device nodes and the iOS system-voice fallback. */
  speechLocale?: string; /** Stop speaking when user starts talking (default: true). */
  interruptOnSpeech?: boolean; /** Milliseconds of user silence before Talk mode sends the transcript after a pause. */
  silenceTimeoutMs?: number;
};
type GatewayControlUiConfig = {
  /** @deprecated Doctor-only legacy input. */chatMessageMaxWidth?: string;
  /**
   * @deprecated Upgrade-only transport input. Retained so releases that shipped
   * this break-glass flag can migrate an unpaired browser safely.
   */
  dangerouslyDisableDeviceAuth?: boolean; /** If false, the Gateway will not serve the Control UI (default /). */
  enabled?: boolean; /** Optional base path prefix for the Control UI (e.g. "/openclaw"). */
  basePath?: string; /** Optional filesystem root for Control UI assets (defaults to dist/control-ui). */
  root?: string;
  /**
   * Opt-in AI purpose titles for tool calls in Control UI chat (default false).
   * When enabled, chat.toolTitles generates short titles through standard
   * utility-model routing and caches them per agent.
   */
  toolTitles?: boolean; /** Produce utility-model session status digests for subscribed Control UI clients (default true). */
  sessionObserver?: boolean;
  /**
   * Embed sandbox mode for hosted Control UI previews.
   * - strict: no script execution inside embeds
   * - scripts: allow scripts while keeping embeds origin-isolated (default)
   * - trusted: allow scripts and same-origin privileges
   */
  embedSandbox?: "strict" | "scripts" | "trusted";
  /**
   * DANGEROUS: Allow hosted embeds to load absolute external http(s) URLs.
   * Default off; prefer hosted /__openclaw__/canvas or /__openclaw__/a2ui content.
   */
  allowExternalEmbedUrls?: boolean;
  /** Optional max-width for grouped Control UI chat messages (default: min(900px, 68%)). */
  /** Allowed browser origins for Control UI/WebChat websocket connections. */
  allowedOrigins?: string[];
  /**
   * DANGEROUS: Keep Host-header origin fallback behavior.
   * Supported long-term for deployments that intentionally rely on this policy.
   */
  dangerouslyAllowHostHeaderOriginFallback?: boolean;
};
/** Gateway authentication strategy for WebSocket and HTTP clients. */
type GatewayAuthMode = "none" | "token" | "password" | "trusted-proxy";
/**
 * Configuration for trusted reverse proxy authentication.
 * Used when Clawdbot runs behind an identity-aware proxy (Pomerium, Caddy + OAuth, etc.)
 * that handles authentication and passes user identity via headers.
 */
type GatewayTrustedProxyConfig = {
  /**
   * Header name containing the authenticated user identity (required).
   * Common values: "x-forwarded-user", "x-remote-user", "x-pomerium-claim-email"
   */
  userHeader: string;
  /**
   * Additional headers that MUST be present for the request to be trusted.
   * Use this to verify the request actually came through the proxy.
   * Example: ["x-forwarded-proto", "x-forwarded-host"]
   */
  requiredHeaders?: string[];
  /**
   * Optional allowlist of user identities that can access the gateway.
   * If empty or omitted, all authenticated users from the proxy are allowed.
   * Example: ["nick@example.com", "admin@company.org"]
   */
  allowUsers?: string[];
  /**
   * Allow loopback proxy sources (127.0.0.1, ::1) in trusted-proxy mode.
   * Default false; enable only when a same-host reverse proxy is the intended
   * trust boundary and direct Gateway access is otherwise locked down.
   */
  allowLoopback?: boolean;
  /**
   * Automatically approve new browser device identities after trusted-proxy
   * authentication. Disabled by default; existing-device upgrades stay manual.
   */
  deviceAutoApprove?: {
    /** Enable automatic approval for new browser devices. @default false */enabled?: boolean;
    /**
     * Maximum operator scopes granted by automatic approval. Listing
     * operator.admin explicitly lets every proxy-authenticated user request
     * automatic full-admin device grants. Requests without scopes receive the
     * configured maximum. @default operator.read, operator.write,
     * operator.approvals
     */
    scopes?: string[];
  };
};
type GatewayAuthConfig = {
  /** Authentication mode for Gateway connections. Defaults to token when unset. */mode?: GatewayAuthMode; /** Shared token for token mode (plaintext or SecretRef). */
  token?: SecretInput; /** Shared password for password mode (consider env instead). */
  password?: SecretInput; /** Allow Tailscale identity headers when serve mode is enabled. */
  allowTailscale?: boolean; /** Rate-limit configuration for failed authentication attempts. */
  rateLimit?: GatewayAuthRateLimitConfig;
  /**
   * Configuration for trusted-proxy auth mode.
   * Required when mode is "trusted-proxy".
   */
  trustedProxy?: GatewayTrustedProxyConfig;
};
type GatewayAuthRateLimitConfig = {
  /** Maximum failed attempts per IP before blocking.  @default 10 */maxAttempts?: number; /** Sliding window duration in milliseconds.  @default 60000 (1 min) */
  windowMs?: number; /** Lockout duration in milliseconds after the limit is exceeded.  @default 300000 (5 min) */
  lockoutMs?: number; /** Exempt localhost/loopback addresses from auth rate limiting.  @default true */
  exemptLoopback?: boolean;
};
/** Tailscale exposure mode for gateway HTTP/WebSocket surfaces. */
type GatewayTailscaleMode = "off" | "serve" | "funnel";
type GatewayTailscaleConfig = {
  /** Tailscale exposure mode for the Gateway control UI. */mode?: GatewayTailscaleMode; /** Reset serve/funnel configuration on shutdown. */
  resetOnExit?: boolean; /** Optional Tailscale Service name, such as `svc:openclaw`, for Serve mode. */
  serviceName?: string;
  /**
   * When `mode="serve"` and an externally configured Tailscale Funnel route
   * already covers the gateway port, skip re-applying `tailscale serve` on
   * startup. Lets operators manage Funnel exposure outside OpenClaw without
   * losing it across gateway restarts.
   */
  preserveFunnel?: boolean;
};
type GatewayRemoteConfig = {
  /** Remote Gateway WebSocket URL (ws:// or wss://). */url?: string; /** macOS app-only transport (SSH tunnel or direct WS); core validates/preserves but does not read it. */
  transport?: "ssh" | "direct"; /** macOS app-only remote SSH port (default 18789); core validates/preserves but does not read it. */
  remotePort?: number; /** Token for remote auth (when the gateway requires token auth). */
  token?: SecretInput; /** Password for remote auth (when the gateway requires password auth). */
  password?: SecretInput; /** Expected TLS certificate fingerprint (sha256) for remote gateways. */
  tlsFingerprint?: string; /** SSH target for tunneling remote Gateway (user@host). */
  sshTarget?: string; /** SSH identity file path for tunneling remote Gateway. */
  sshIdentity?: string; /** macOS app-only; core validates/preserves but does not read it. Defaults to strict; see docs/platforms/mac/remote.md. */
  sshHostKeyPolicy?: "strict" | "openssh";
};
/**
 * Operator terminal surface served to Control UI and mobile clients.
 *
 * The terminal opens a PTY-backed shell on the gateway host, gated to
 * admin-scope operator sessions. It starts in the target agent's workspace; if
 * that agent is fully sandboxed (`sandbox.mode: "all"`) the terminal is refused
 * rather than handed an unconfined host shell (workspace isolation is
 * fail-closed). Under "non-main" the agent's main session runs on the host, so a
 * host terminal is allowed.
 */
type GatewayTerminalConfig = {
  /** Master switch for the operator terminal. Default: true; set false to opt out. */enabled?: boolean;
  /**
   * Shell executable to launch. When unset the host login shell is used
   * ($SHELL on Unix, %ComSpec% on Windows).
   */
  shell?: string;
  /**
   * How long (seconds) a session survives after its connection drops, staying
   * reattachable via terminal.attach. 0 kills sessions on disconnect
   * immediately. Default: 300.
   */
  detachedSessionTimeoutSeconds?: number;
};
/** Gateway config reload strategy for managed installs. */
type GatewayReloadMode = "off" | "restart" | "hot" | "hybrid";
type GatewayReloadConfig = {
  /** Reload strategy for config changes (default: hybrid). */mode?: GatewayReloadMode;
};
type GatewayHttpChatCompletionsConfig = {
  /**
   * If false, the Gateway will not serve `POST /v1/chat/completions`.
   * Default: false when absent.
   */
  enabled?: boolean; /** Image input controls for `image_url` parts. */
  images?: GatewayHttpChatCompletionsImagesConfig;
};
type GatewayHttpChatCompletionsImagesConfig = {
  /** Allow URL fetches for `image_url` parts. Default: false. */allowUrl?: boolean;
  /**
   * Optional hostname allowlist for URL fetches.
   * Supports exact hosts and `*.example.com` wildcards.
   */
  urlAllowlist?: string[]; /** Allowed MIME types (case-insensitive). */
  allowedMimes?: string[]; /** Max bytes per image. Default: 10MB. */
  maxBytes?: number; /** Max redirects when fetching a URL. Default: 3. */
  maxRedirects?: number; /** Fetch timeout in ms. Default: 10s. */
  timeoutMs?: number;
};
type GatewayHttpResponsesConfig = {
  /**
   * If false, the Gateway will not serve `POST /v1/responses` (OpenResponses API).
   * Default: false when absent.
   */
  enabled?: boolean;
  /**
   * Max number of URL-based `input_file` + `input_image` parts per request.
   * Default: 8.
   */
  maxUrlParts?: number; /** File inputs (input_file). */
  files?: GatewayHttpResponsesFilesConfig; /** Image inputs (input_image). */
  images?: GatewayHttpResponsesImagesConfig;
};
type GatewayHttpResponsesFilesConfig = {
  /** Allow URL fetches for input_file. Default: true. */allowUrl?: boolean;
  /**
   * Optional hostname allowlist for URL fetches.
   * Supports exact hosts and `*.example.com` wildcards.
   */
  urlAllowlist?: string[]; /** Allowed MIME types (case-insensitive). */
  allowedMimes?: string[]; /** Max bytes per file. Default: 5MB. */
  maxBytes?: number; /** Max decoded characters per file. Default: 200k. */
  maxChars?: number; /** Max redirects when fetching a URL. Default: 3. */
  maxRedirects?: number; /** Fetch timeout in ms. Default: 10s. */
  timeoutMs?: number; /** PDF handling (application/pdf). */
  pdf?: GatewayHttpResponsesPdfConfig;
};
type GatewayHttpResponsesPdfConfig = {
  /** Max pages to parse/render. Default: 4. */maxPages?: number; /** Max pixels per rendered page. Default: 4M. */
  maxPixels?: number; /** Minimum extracted text length to skip rasterization. Default: 200 chars. */
  minTextChars?: number;
};
type GatewayHttpResponsesImagesConfig = {
  /** Allow URL fetches for input_image. Default: true. */allowUrl?: boolean;
  /**
   * Optional hostname allowlist for URL fetches.
   * Supports exact hosts and `*.example.com` wildcards.
   */
  urlAllowlist?: string[]; /** Allowed MIME types (case-insensitive). */
  allowedMimes?: string[]; /** Max bytes per image. Default: 10MB. */
  maxBytes?: number; /** Max redirects when fetching a URL. Default: 3. */
  maxRedirects?: number; /** Fetch timeout in ms. Default: 10s. */
  timeoutMs?: number;
};
type GatewayHttpEndpointsConfig = {
  /** OpenAI-compatible chat completions endpoint controls. */chatCompletions?: GatewayHttpChatCompletionsConfig; /** OpenResponses-compatible responses endpoint controls. */
  responses?: GatewayHttpResponsesConfig;
};
type GatewayHttpSecurityHeadersConfig = {
  /**
   * Value for the Strict-Transport-Security response header.
   * Set to false to disable explicitly.
   *
   * Example: "max-age=31536000; includeSubDomains"
   */
  strictTransportSecurity?: string | false;
};
type GatewayHttpConfig = {
  /** Per-endpoint HTTP API controls. */endpoints?: GatewayHttpEndpointsConfig; /** HTTP security header overrides. */
  securityHeaders?: GatewayHttpSecurityHeadersConfig;
};
type GatewayPushApnsRelayConfig = {
  /** Base HTTPS URL for the external iOS APNs relay service. */baseUrl?: string; /** Timeout in milliseconds for relay send requests (default: 10000). */
  timeoutMs?: number;
};
type GatewayPushApnsConfig = {
  /** External APNs relay used by iOS/mobile notification flows. */relay?: GatewayPushApnsRelayConfig;
};
type GatewayPushConfig = {
  /** Apple Push Notification Service settings. */apns?: GatewayPushApnsConfig;
};
type GatewayNodePairingConfig = {
  /**
   * Silently approve trusted local device pairing and access upgrades.
   * Set false to require explicit approval; metadata refreshes remain automatic.
   * Default: true.
   */
  autoApproveLocal?: boolean;
  /**
   * Opt-in CIDR/IP allowlist for auto-approving first-time node-role pairing.
   * Only applies to fresh node pairing requests with no requested scopes.
   * Default: unset/disabled.
   */
  autoApproveCidrs?: string[];
  /**
   * SSH-verified auto-approval for first-time node-role pairing (default: enabled).
   * The gateway connects back to the pairing host over SSH (BatchMode, strict
   * host keys) and approves only when the remote `openclaw node identity`
   * output matches the pending request's device key. Set false to disable SSH
   * verification; this is independent of autoApproveCidrs, so unset that too for
   * manual-only node pairing. The object form tunes the probe:
   * - user: remote user (default: gateway process user)
   * - identity: SSH identity file (default: standard SSH resolution)
   * - timeoutMs: probe timeout (default: 7000)
   * - cidrs: CIDRs/IPs eligible for probing (default: private/CGNAT ranges)
   */
  sshVerify?: boolean | {
    user?: string;
    identity?: string;
    timeoutMs?: number;
    cidrs?: string[];
  };
};
type GatewayNodesConfig = {
  /** @deprecated Doctor-only legacy input. */skills?: {
    enabled?: boolean;
  }; /** @deprecated Doctor-only legacy input. */
  allowCommands?: string[]; /** @deprecated Doctor-only legacy input. */
  denyCommands?: string[]; /** Browser routing policy for node-hosted browser proxies. */
  browser?: {
    /** Routing mode (default: auto). */mode?: "auto" | "manual" | "off"; /** Pin to a specific node id/name (optional). */
    node?: string;
  }; /** Pairing policy for node-role gateway clients. */
  pairing?: GatewayNodePairingConfig; /** Controls whether paired nodes may publish agent-visible plugin tools (default: true). */
  pluginTools?: {
    /** Accept node-published plugin tool descriptors (default: true). */enabled?: boolean;
  }; /** Accept node-published skill descriptors (default: true). */
  allowSkills?: boolean;
  commands?: {
    /** Additional node.invoke commands to allow on the gateway. */allow?: string[]; /** Commands to deny even if they appear in the defaults or node claims. */
    deny?: string[];
  };
};
type GatewayToolsConfig = {
  /** Tools to deny via gateway HTTP /tools/invoke (extends defaults). */deny?: string[]; /** Tools to explicitly allow (removes from default deny list). */
  allow?: string[];
};
type GatewayConfig = {
  /** Single multiplexed port for Gateway WS + HTTP (default: 18789). */port?: number;
  /**
   * Explicit gateway mode. When set to "remote", local gateway start is disabled.
   * When set to "local", the CLI may start the gateway locally.
   */
  mode?: "local" | "remote";
  /**
   * Bind address policy for the Gateway WebSocket + Control UI HTTP server.
   * - auto: Loopback (127.0.0.1) if available, else 0.0.0.0 (fallback to all interfaces)
   * - lan: 0.0.0.0 (all interfaces, no fallback, current BYOH path is IPv4-only)
   * - loopback: 127.0.0.1 (local-only)
   * - tailnet: Tailnet IPv4 plus 127.0.0.1 if available, else loopback only
   * - custom: User-specified IPv4 address (requires customBindHost); specific IPv4s also bind 127.0.0.1
   * IPv6-only BYOH is not natively supported on this path today. Use an IPv4 sidecar or proxy.
   * Default: loopback (127.0.0.1).
   */
  bind?: GatewayBindMode; /** Custom IPv4 address for bind="custom" mode. IPv6-only BYOH requires an IPv4 sidecar or proxy. */
  customBindHost?: string;
  controlUi?: GatewayControlUiConfig;
  terminal?: GatewayTerminalConfig;
  auth?: GatewayAuthConfig;
  tailscale?: GatewayTailscaleConfig;
  remote?: GatewayRemoteConfig;
  reload?: GatewayReloadConfig;
  tls?: GatewayTlsConfig;
  http?: GatewayHttpConfig;
  push?: GatewayPushConfig;
  nodes?: GatewayNodesConfig;
  /**
   * IPs of trusted reverse proxies (e.g. Traefik, nginx). When a connection
   * arrives from one of these IPs, the Gateway trusts `x-forwarded-for`
   * to determine the client IP for local pairing and HTTP checks.
   */
  trustedProxies?: string[];
  /**
   * Allow `x-real-ip` as a fallback only when `x-forwarded-for` is missing.
   * Default: false (safer fail-closed behavior).
   */
  allowRealIpFallback?: boolean; /** Tool access restrictions for HTTP /tools/invoke endpoint. */
  tools?: GatewayToolsConfig;
};
//#endregion
//#region src/config/types.installs.d.ts
/** Base persisted install record shared by plugin and skill install tracking. */
type InstallRecordBase = {
  source: "npm" | "archive" | "path" | "clawhub" | "git";
  spec?: string;
  sourcePath?: string;
  installPath?: string;
  version?: string;
  resolvedName?: string;
  resolvedVersion?: string;
  resolvedSpec?: string;
  integrity?: string;
  shasum?: string;
  resolvedAt?: string;
  installedAt?: string;
  clawhubUrl?: string;
  clawhubPackage?: string;
  clawhubFamily?: "code-plugin" | "bundle-plugin";
  clawhubChannel?: "official" | "community" | "private";
  clawhubTrustDisposition?: "clean" | "review-recommended" | "review-required" | "blocked";
  clawhubTrustScanStatus?: string;
  clawhubTrustModerationState?: string;
  clawhubTrustReasons?: string[];
  clawhubTrustPending?: boolean;
  clawhubTrustStale?: boolean;
  clawhubTrustCheckedAt?: string;
  clawhubTrustAcknowledgedAt?: string;
  artifactKind?: "legacy-zip" | "npm-pack";
  artifactFormat?: "zip" | "tgz";
  npmIntegrity?: string;
  npmShasum?: string;
  npmTarballName?: string;
  clawpackSha256?: string;
  clawpackSpecVersion?: number;
  clawpackManifestSha256?: string;
  clawpackSize?: number;
  gitUrl?: string;
  gitRef?: string;
  gitCommit?: string;
};
//#endregion
//#region src/config/types.hooks.d.ts
type HookMappingMatch = {
  path?: string;
  source?: string;
};
type HookMappingTransform = {
  module: string;
  export?: string;
};
type HookSessionMode = "isolated" | "persistent";
type HookMappingConfig = {
  id?: string;
  match?: HookMappingMatch;
  action?: "wake" | "agent";
  wakeMode?: "now" | "next-heartbeat";
  name?: string; /** Route this hook to a specific agent (unknown ids fall back to the default agent). */
  agentId?: string;
  sessionKey?: string; /** Reuse the resolved session key across runs instead of creating a fresh run session. */
  sessionMode?: HookSessionMode;
  messageTemplate?: string;
  textTemplate?: string;
  deliver?: boolean; /** DANGEROUS: Disable external content safety wrapping for this hook. */
  allowUnsafeExternalContent?: boolean;
  /**
   * "last" or any runtime channel id (including plugin channels).
   * Validation against configured/registered channels happens in gateway hooks runtime.
   */
  channel?: "last" | (string & {});
  to?: string; /** Override model for this hook (provider/model or alias). */
  model?: string;
  thinking?: string;
  timeoutSeconds?: number;
  transform?: HookMappingTransform;
};
type HooksGmailTailscaleMode = "off" | "serve" | "funnel";
type HooksGmailConfig = {
  account?: string;
  label?: string;
  topic?: string;
  subscription?: string;
  pushToken?: string;
  hookUrl?: string;
  includeBody?: boolean;
  maxBytes?: number;
  renewEveryMinutes?: number; /** DANGEROUS: Disable external content safety wrapping for Gmail hooks. */
  allowUnsafeExternalContent?: boolean;
  serve?: {
    bind?: string;
    port?: number;
    path?: string;
  };
  tailscale?: {
    mode?: HooksGmailTailscaleMode;
    path?: string; /** Optional tailscale serve/funnel target (port, host:port, or full URL). */
    target?: string;
  }; /** Optional model override for Gmail hook processing (provider/model or alias). */
  model?: string; /** Optional thinking level override for Gmail hook processing. */
  thinking?: "off" | "minimal" | "low" | "medium" | "high";
};
type HookConfig = {
  enabled?: boolean;
  env?: Record<string, string>;
  [key: string]: unknown;
};
type InternalHooksConfig = {
  /** Enable hooks system */enabled?: boolean; /** Per-hook configuration overrides */
  entries?: Record<string, HookConfig>; /** Load configuration */
  load?: {
    /** Additional hook directories to scan */extraDirs?: string[];
  };
};
type HooksConfig = {
  enabled?: boolean;
  path?: string;
  token?: string;
  /**
   * Default session key used for hook agent runs when no request/mapping session key is used.
   * If omitted, OpenClaw generates `hook:<uuid>` per request.
   */
  defaultSessionKey?: string;
  /**
   * Allow `sessionKey` from external `/hooks/agent` request payloads.
   * Default: false.
   */
  allowRequestSessionKey?: boolean;
  /**
   * Optional allowlist for explicit session keys (request + mapping). Example: ["hook:"].
   * Empty/omitted means no prefix restriction.
   */
  allowedSessionKeyPrefixes?: string[];
  /**
   * Restrict hook execution to these effective agent ids, including
   * default-agent routing when `agentId` is omitted. Omit or include `*` to
   * allow any agent. Set `[]` to deny all agent routing.
   */
  allowedAgentIds?: string[];
  presets?: string[];
  transformsDir?: string;
  mappings?: HookMappingConfig[];
  gmail?: HooksGmailConfig; /** Internal agent event hooks */
  internal?: InternalHooksConfig;
};
//#endregion
//#region src/config/types.mcp.d.ts
type McpCodexToolApprovalMode = "auto" | "prompt" | "approve";
type McpServerCodexConfig = {
  /** OpenClaw agent ids that should receive this server in Codex app-server threads. */agents?: string[]; /** Codex MCP tool approval mode emitted as default_tools_approval_mode. */
  defaultToolsApprovalMode?: McpCodexToolApprovalMode;
};
type McpServerToolFilterConfig = {
  /**
   * Exact MCP tool names or simple "*" globs to expose from this server.
   *
   * When omitted, all server tools remain eligible unless excluded.
   */
  include?: string[]; /** Exact MCP tool names or simple "*" globs to hide from this server. */
  exclude?: string[];
};
type McpServerConfig = {
  /** Set false to keep the saved definition while excluding it from runtime/probe sessions. */enabled?: boolean; /** Stdio transport: command to spawn. */
  command?: string; /** Stdio transport: arguments for the command. */
  args?: string[]; /** Environment variables passed to the server process (stdio only). */
  env?: Record<string, string | number | boolean>; /** Working directory for stdio server. */
  cwd?: string; /** HTTP transport: URL of the remote MCP server (http or https). */
  url?: string; /** Transport type — "stdio" for command-bearing servers, "sse" or "streamable-http" for remote URLs. */
  transport?: "stdio" | "sse" | "streamable-http"; /** HTTP transport: extra HTTP headers sent with every request. */
  headers?: Record<string, string | number | boolean>; /** Optional connection timeout in milliseconds. */
  connectionTimeoutMs?: number; /** Optional per-request timeout in milliseconds. */
  requestTimeoutMs?: number; /** Whether this server can safely handle concurrent tool calls. */
  supportsParallelToolCalls?: boolean; /** HTTP OAuth mode. Tokens are stored in OpenClaw state, not in config. */
  auth?: "oauth"; /** Optional OAuth client metadata overrides for HTTP MCP servers. */
  oauth?: {
    /** Refresh-capable auth profile used to inject the current bearer token. */authProfileId?: string;
    scope?: string;
    redirectUrl?: string;
    clientMetadataUrl?: string;
  }; /** HTTP TLS verification, disabled only for explicitly trusted private endpoints. */
  sslVerify?: boolean; /** HTTP mutual TLS client certificate path. */
  clientCert?: string; /** HTTP mutual TLS client key path. */
  clientKey?: string; /** Optional per-server OpenClaw MCP tool selection. */
  toolFilter?: McpServerToolFilterConfig; /** Codex-specific projection controls for Codex app-server/runtime config. */
  codex?: McpServerCodexConfig;
  [key: string]: unknown;
};
type McpConfig = {
  /** Named MCP server definitions managed by OpenClaw. */servers?: Record<string, McpServerConfig>; /** Opt-in MCP Apps rendering and app-to-server bridge. */
  apps?: {
    enabled?: boolean; /** Dedicated public origin that proxies to the sandbox listener. */
    sandboxOrigin?: string; /** Dedicated listener port. Defaults to the Gateway port plus one. */
    sandboxPort?: number;
  };
};
//#endregion
//#region src/config/types.node-host.d.ts
type NodeHostBrowserProxyConfig = {
  /** Enable the browser proxy on the node host (default: true). */enabled?: boolean; /** Optional allowlist of profile names exposed via the proxy; when set, create/delete profile routes are blocked on the proxy surface. */
  allowProfiles?: string[];
};
type NodeHostConfig = {
  /** Sensitive native agent execution exposed by the headless node host. */agentRuns?: {
    claude?: {
      /** Advertise approval-gated Claude CLI turns when the binary is installed. */enabled?: boolean;
    };
  }; /** Browser proxy settings for node hosts. */
  browserProxy?: NodeHostBrowserProxyConfig; /** MCP servers started and exposed by the headless node host. */
  mcp?: {
    servers?: Record<string, McpServerConfig>;
  }; /** Skills published by the headless node host. */
  skills?: {
    /** Scan and publish ~/.openclaw/skills (default: true). */enabled?: boolean;
  };
};
//#endregion
//#region src/config/types.plugins.d.ts
type PluginEntryConfig = {
  enabled?: boolean;
  hooks?: {
    /** Controls prompt mutation via before_prompt_build. */allowPromptInjection?: boolean;
    /**
     * Controls access to raw conversation content from conversation hooks including
     * before_agent_run, before_model_resolve, before_agent_reply, llm_input, llm_output,
     * before_agent_finalize, and agent_end.
     * Non-bundled plugins must opt in explicitly; bundled plugins stay allowed unless disabled.
     */
    allowConversationAccess?: boolean; /** Default timeout in milliseconds for this plugin's typed hooks. */
    timeoutMs?: number; /** Per typed-hook timeout overrides in milliseconds. */
    timeouts?: Record<string, number>;
  };
  subagent?: {
    /** Explicitly allow this plugin to request per-run provider/model overrides for subagent runs. */allowModelOverride?: boolean;
    /**
     * Allowed override targets as canonical provider/model refs.
     * Use "*" to explicitly allow any model for this plugin.
     */
    allowedModels?: string[];
  };
  llm?: {
    /** Explicitly allow this plugin to request a model override for api.runtime.llm.complete. */allowModelOverride?: boolean;
    /**
     * Allowed override targets as canonical provider/model refs.
     * Use "*" to explicitly allow any model for this plugin.
     */
    allowedModels?: string[];
    /**
     * Allowed models for every completion, including host-resolved defaults and overrides.
     * Use "*" to explicitly allow any model for this plugin.
     */
    allowedCompletionModels?: string[]; /** Allow explicit auth-profile selection for isolated agent-runtime completions. */
    allowAuthProfileOverride?: boolean; /** Explicitly allow this plugin to run completions against a non-default agent id. */
    allowAgentIdOverride?: boolean;
  };
  config?: Record<string, unknown>;
};
type PluginSlotsConfig = {
  /** Select which plugin owns the memory slot ("none" disables memory plugins). */memory?: string; /** Select which plugin owns the context-engine slot. */
  contextEngine?: string;
};
type PluginsLoadConfig = {
  /** Additional plugin/extension paths to load. */paths?: string[];
};
type PluginInstallRecord = Omit<InstallRecordBase, "source"> & {
  source: InstallRecordBase["source"] | "marketplace";
  marketplaceName?: string;
  marketplaceSource?: string;
  marketplacePlugin?: string;
};
type PluginsConfig = {
  /** Enable or disable plugin loading. */enabled?: boolean; /** Optional plugin allowlist (plugin ids). */
  allow?: string[]; /** Optional plugin denylist (plugin ids). */
  deny?: string[];
  load?: PluginsLoadConfig;
  slots?: PluginSlotsConfig;
  entries?: Record<string, PluginEntryConfig>;
  /**
   * Internal transient carrier for plugin install records during command flows.
   * This is intentionally omitted from the config schema and must not be
   * persisted to openclaw.json.
   */
  installs?: Record<string, PluginInstallRecord>;
};
declare namespace json_schema_d_exports {
  export { ArraySchema, BaseSchema, BooleanSchema, IntegerSchema, JSONSchema, NullSchema, NumberSchema, ObjectSchema, Schema, StringSchema, _JSONSchema };
}
type Schema = ObjectSchema | ArraySchema | StringSchema | NumberSchema | IntegerSchema | BooleanSchema | NullSchema;
type _JSONSchema = boolean | JSONSchema;
type JSONSchema = {
  [k: string]: unknown;
  $schema?: "https://json-schema.org/draft/2020-12/schema" | "http://json-schema.org/draft-07/schema#" | "http://json-schema.org/draft-04/schema#";
  $id?: string;
  $anchor?: string;
  $ref?: string;
  $dynamicRef?: string;
  $dynamicAnchor?: string;
  $vocabulary?: Record<string, boolean>;
  $comment?: string;
  $defs?: Record<string, JSONSchema>;
  type?: "object" | "array" | "string" | "number" | "boolean" | "null" | "integer";
  additionalItems?: _JSONSchema;
  unevaluatedItems?: _JSONSchema;
  prefixItems?: _JSONSchema[];
  items?: _JSONSchema | _JSONSchema[];
  contains?: _JSONSchema;
  additionalProperties?: _JSONSchema;
  unevaluatedProperties?: _JSONSchema;
  properties?: Record<string, _JSONSchema>;
  patternProperties?: Record<string, _JSONSchema>;
  dependentSchemas?: Record<string, _JSONSchema>;
  propertyNames?: _JSONSchema;
  if?: _JSONSchema;
  then?: _JSONSchema;
  else?: _JSONSchema;
  allOf?: JSONSchema[];
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  not?: _JSONSchema;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number | boolean;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>;
  enum?: Array<string | number | boolean | null>;
  const?: string | number | boolean | null;
  id?: string;
  title?: string;
  description?: string;
  default?: unknown;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  nullable?: boolean;
  examples?: unknown[];
  format?: string;
  contentMediaType?: string;
  contentEncoding?: string;
  contentSchema?: JSONSchema;
  _prefault?: unknown;
};
type BaseSchema = JSONSchema;
interface ObjectSchema extends JSONSchema {
  type: "object";
}
interface ArraySchema extends JSONSchema {
  type: "array";
}
interface StringSchema extends JSONSchema {
  type: "string";
}
interface NumberSchema extends JSONSchema {
  type: "number";
}
interface IntegerSchema extends JSONSchema {
  type: "integer";
}
interface BooleanSchema extends JSONSchema {
  type: "boolean";
}
interface NullSchema extends JSONSchema {
  type: "null";
}
//#endregion
//#region node_modules/zod/v4/core/standard-schema.d.cts
/** The Standard interface. */
interface StandardTypedV1<Input = unknown, Output = Input> {
  /** The Standard properties. */
  readonly "~standard": StandardTypedV1.Props<Input, Output>;
}
declare namespace StandardTypedV1 {
  /** The Standard properties interface. */
  interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1;
    /** The vendor name of the schema library. */
    readonly vendor: string;
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input;
    /** The output type of the schema. */
    readonly output: Output;
  }
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = NonNullable<Schema["~standard"]["types"]>["input"];
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = NonNullable<Schema["~standard"]["types"]>["output"];
}
/** The Standard Schema interface. */
interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
}
declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  interface Props<Input = unknown, Output = Input> extends StandardTypedV1.Props<Input, Output> {
    /** Validates unknown input values. */
    readonly validate: (value: unknown, options?: StandardSchemaV1.Options | undefined) => Result<Output> | Promise<Result<Output>>;
  }
  /** The result interface of the validate function. */
  type Result<Output> = SuccessResult<Output> | FailureResult;
  /** The result interface if validation succeeds. */
  interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output;
    /** The absence of issues indicates success. */
    readonly issues?: undefined;
  }
  interface Options {
    /** Implicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }
  /** The result interface if validation fails. */
  interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>;
  }
  /** The issue interface of the failure output. */
  interface Issue {
    /** The error message of the issue. */
    readonly message: string;
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }
  /** The path segment interface of the issue. */
  interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> extends StandardTypedV1.Types<Input, Output> {}
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = StandardTypedV1.InferInput<Schema>;
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = StandardTypedV1.InferOutput<Schema>;
}
/** The Standard JSON Schema interface. */
interface StandardJSONSchemaV1<Input = unknown, Output = Input> {
  /** The Standard JSON Schema properties. */
  readonly "~standard": StandardJSONSchemaV1.Props<Input, Output>;
}
declare namespace StandardJSONSchemaV1 {
  /** The Standard JSON Schema properties interface. */
  interface Props<Input = unknown, Output = Input> extends StandardTypedV1.Props<Input, Output> {
    /** Methods for generating the input/output JSON Schema. */
    readonly jsonSchema: Converter;
  }
  /** The Standard JSON Schema converter interface. */
  interface Converter {
    /** Converts the input type to JSON Schema. May throw if conversion is not supported. */
    readonly input: (options: StandardJSONSchemaV1.Options) => Record<string, unknown>;
    /** Converts the output type to JSON Schema. May throw if conversion is not supported. */
    readonly output: (options: StandardJSONSchemaV1.Options) => Record<string, unknown>;
  }
  /** The target version of the generated JSON Schema.
   *
   * It is *strongly recommended* that implementers support `"draft-2020-12"` and `"draft-07"`, as they are both in wide use.
   *
   * The `"openapi-3.0"` target is intended as a standardized specifier for OpenAPI 3.0 which is a superset of JSON Schema `"draft-04"`.
   *
   * All other targets can be implemented on a best-effort basis. Libraries should throw if they don't support a specified target.
   */
  type Target = "draft-2020-12" | "draft-07" | "openapi-3.0" | ({} & string);
  /** The options for the input/output methods. */
  interface Options {
    /** Specifies the target version of the generated JSON Schema. Support for all versions is on a best-effort basis. If a given version is not supported, the library should throw. */
    readonly target: Target;
    /** Implicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> extends StandardTypedV1.Types<Input, Output> {}
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = StandardTypedV1.InferInput<Schema>;
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = StandardTypedV1.InferOutput<Schema>;
}
interface StandardSchemaWithJSONProps<Input = unknown, Output = Input> extends StandardSchemaV1.Props<Input, Output>, StandardJSONSchemaV1.Props<Input, Output> {}
//#endregion
//#region node_modules/zod/v4/core/registries.d.cts
declare const $output: unique symbol;
type $output = typeof $output;
declare const $input: unique symbol;
type $input = typeof $input;
type $replace<Meta, S extends $ZodType> = Meta extends $output ? output<S> : Meta extends $input ? input<S> : Meta extends (infer M)[] ? $replace<M, S>[] : Meta extends ((...args: infer P) => infer R) ? (...args: { [K in keyof P]: $replace<P[K], S> }) => $replace<R, S> : Meta extends object ? { [K in keyof Meta]: $replace<Meta[K], S> } : Meta;
type MetadataType = object | undefined;
declare class $ZodRegistry<Meta extends MetadataType = MetadataType, Schema extends $ZodType = $ZodType> {
  _meta: Meta;
  _schema: Schema;
  _map: WeakMap<Schema, $replace<Meta, Schema>>;
  _idmap: Map<string, Schema>;
  add<S extends Schema>(schema: S, ..._meta: undefined extends Meta ? [$replace<Meta, S>?] : [$replace<Meta, S>]): this;
  clear(): this;
  remove(schema: Schema): this;
  get<S extends Schema>(schema: S): $replace<Meta, S> | undefined;
  has(schema: Schema): boolean;
}
interface JSONSchemaMeta {
  id?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  deprecated?: boolean | undefined;
  [k: string]: unknown;
}
interface GlobalMeta extends JSONSchemaMeta {}
declare function registry<T extends MetadataType = MetadataType, S extends $ZodType = $ZodType>(): $ZodRegistry<T, S>;
declare const globalRegistry: $ZodRegistry<GlobalMeta>;
//#endregion
//#region node_modules/zod/v4/core/to-json-schema.d.cts
type Processor<T extends $ZodType = $ZodType> = (schema: T, ctx: ToJSONSchemaContext, json: BaseSchema, params: ProcessParams) => void;
interface JSONSchemaGeneratorParams {
  processors: Record<string, Processor>;
  /** A registry used to look up metadata for each schema. Any schema with an `id` property will be extracted as a $def.
   *  @default globalRegistry */
  metadata?: $ZodRegistry<Record<string, any>>;
  /** The JSON Schema version to target.
   * - `"draft-2020-12"` — Default. JSON Schema Draft 2020-12
   * - `"draft-07"` — JSON Schema Draft 7
   * - `"draft-04"` — JSON Schema Draft 4
   * - `"openapi-3.0"` — OpenAPI 3.0 Schema Object */
  target?: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string) | undefined;
  /** How to handle unrepresentable types.
   * - `"throw"` — Default. Unrepresentable types throw an error
   * - `"any"` — Unrepresentable types become `{}` */
  unrepresentable?: "throw" | "any";
  /** Arbitrary custom logic that can be used to modify the generated JSON Schema. */
  override?: (ctx: {
    zodSchema: $ZodTypes;
    jsonSchema: BaseSchema;
    path: (string | number)[];
  }) => void;
  /** Whether to extract the `"input"` or `"output"` type. Relevant to transforms, defaults, coerced primitives, etc.
   * - `"output"` — Default. Convert the output schema.
   * - `"input"` — Convert the input schema. */
  io?: "input" | "output";
  cycles?: "ref" | "throw";
  reused?: "ref" | "inline";
  external?: {
    registry: $ZodRegistry<{
      id?: string | undefined;
    }>;
    uri?: ((id: string) => string) | undefined;
    defs: Record<string, BaseSchema>;
  } | undefined;
}
/**
 * Parameters for the toJSONSchema function.
 */
type ToJSONSchemaParams = Omit<JSONSchemaGeneratorParams, "processors" | "external">;
/**
 * Parameters for the toJSONSchema function when passing a registry.
 */
interface RegistryToJSONSchemaParams extends ToJSONSchemaParams {
  uri?: (id: string) => string;
}
interface ProcessParams {
  schemaPath: $ZodType[];
  path: (string | number)[];
}
interface Seen {
  /** JSON Schema result for this Zod schema */
  schema: BaseSchema;
  /** A cached version of the schema that doesn't get overwritten during ref resolution */
  def?: BaseSchema;
  defId?: string | undefined;
  /** Number of times this schema was encountered during traversal */
  count: number;
  /** Cycle path */
  cycle?: (string | number)[] | undefined;
  isParent?: boolean | undefined;
  /** Schema to inherit JSON Schema properties from (set by processor for wrappers) */
  ref?: $ZodType | null;
  /** JSON Schema property path for this schema */
  path?: (string | number)[] | undefined;
}
interface ToJSONSchemaContext {
  processors: Record<string, Processor>;
  metadataRegistry: $ZodRegistry<Record<string, any>>;
  target: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string);
  unrepresentable: "throw" | "any";
  override: (ctx: {
    zodSchema: $ZodType;
    jsonSchema: BaseSchema;
    path: (string | number)[];
  }) => void;
  io: "input" | "output";
  counter: number;
  seen: Map<$ZodType, Seen>;
  cycles: "ref" | "throw";
  reused: "ref" | "inline";
  external?: {
    registry: $ZodRegistry<{
      id?: string | undefined;
    }>;
    uri?: ((id: string) => string) | undefined;
    defs: Record<string, BaseSchema>;
  } | undefined;
}
declare function initializeContext(params: JSONSchemaGeneratorParams): ToJSONSchemaContext;
declare function process<T extends $ZodType>(schema: T, ctx: ToJSONSchemaContext, _params?: ProcessParams): BaseSchema;
declare function extractDefs<T extends $ZodType>(ctx: ToJSONSchemaContext, schema: T): void;
declare function finalize<T extends $ZodType>(ctx: ToJSONSchemaContext, schema: T): ZodStandardJSONSchemaPayload<T>;
type ZodStandardSchemaWithJSON$1<T> = StandardSchemaWithJSONProps<input<T>, output<T>>;
interface ZodStandardJSONSchemaPayload<T> extends BaseSchema {
  "~standard": ZodStandardSchemaWithJSON$1<T>;
}
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
declare const createToJSONSchemaMethod: <T extends $ZodType>(schema: T, processors?: Record<string, Processor>) => (params?: ToJSONSchemaParams) => ZodStandardJSONSchemaPayload<T>;
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
type StandardJSONSchemaMethodParams = Parameters<StandardJSONSchemaV1["~standard"]["jsonSchema"]["input"]>[0];
declare const createStandardJSONSchemaMethod: <T extends $ZodType>(schema: T, io: "input" | "output", processors?: Record<string, Processor>) => (params?: StandardJSONSchemaMethodParams) => BaseSchema;
declare namespace util_d_exports {
  export { AnyFunc, AssertEqual, AssertExtends, AssertNotEqual, BIGINT_FORMAT_RANGES, BuiltIn, Class, CleanKey, Constructor, EmptyObject, EmptyToNever, EnumLike, EnumValue, Exactly, Extend, ExtractIndexSignature, Flatten, FromCleanMap, HasLength, HasSize, HashAlgorithm, HashEncoding, HashFormat, IPVersion, Identity, InexactPartial, IsAny, IsProp, JSONType, JWTAlgorithm, KeyOf, Keys, KeysArray, KeysEnum, Literal, LiteralArray, LoosePartial, MakePartial, MakeReadonly, MakeRequired, Mapped, Mask, MaybeAsync, MimeTypes, NUMBER_FORMAT_RANGES, NoNever, NoNeverKeys, NoUndefined, Normalize, Numeric, Omit$1 as Omit, OmitIndexSignature, OmitKeys, ParsedTypes, Prettify, Primitive, PrimitiveArray, PrimitiveSet, PropValues, SafeParseError, SafeParseResult, SafeParseSuccess, SchemaClass, SomeObject, ToCleanMap, ToEnum, TupleItems, Whatever, Writeable, aborted, allowsEval, assert, assertEqual, assertIs, assertNever, assertNotEqual, assignProp, base64ToUint8Array, base64urlToUint8Array, cached, captureStackTrace, cleanEnum, cleanRegex, clone, cloneDef, createTransparentProxy, defineLazy, esc, escapeRegex, explicitlyAborted, extend, finalizeIssue, floatSafeRemainder, getElementAtPath, getEnumValues, getLengthableOrigin, getParsedType, getSizableOrigin, hexToUint8Array, isObject, isPlainObject, issue, joinValues, jsonStringifyReplacer, merge, mergeDefs, normalizeParams, nullish$1 as nullish, numKeys, objectClone, omit, optionalKeys, parsedType, partial, pick, prefixIssues, primitiveTypes, promiseAllObject, propertyKeyTypes, randomString, required, safeExtend, shallowClone, slugify, stringifyPrimitive, uint8ArrayToBase64, uint8ArrayToBase64url, uint8ArrayToHex, unwrapMessage };
}
type JSONType = string | number | boolean | null | JSONType[] | {
  [key: string]: JSONType;
};
type JWTAlgorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512" | "PS256" | "PS384" | "PS512" | "EdDSA" | (string & {});
type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha384" | "sha512";
type HashEncoding = "hex" | "base64" | "base64url";
type HashFormat = `${HashAlgorithm}_${HashEncoding}`;
type IPVersion = "v4" | "v6";
type MimeTypes = "application/json" | "application/xml" | "application/x-www-form-urlencoded" | "application/javascript" | "application/pdf" | "application/zip" | "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/octet-stream" | "application/graphql" | "text/html" | "text/plain" | "text/css" | "text/javascript" | "text/csv" | "image/png" | "image/jpeg" | "image/gif" | "image/svg+xml" | "image/webp" | "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/webm" | "video/mp4" | "video/webm" | "video/ogg" | "font/woff" | "font/woff2" | "font/ttf" | "font/otf" | "multipart/form-data" | (string & {});
type ParsedTypes = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "file" | "date" | "array" | "map" | "set" | "nan" | "null" | "promise";
type AssertEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends (<V>() => V extends U ? 1 : 2) ? true : false;
type AssertNotEqual<T, U> = (<V>() => V extends T ? 1 : 2) extends (<V>() => V extends U ? 1 : 2) ? false : true;
type AssertExtends<T, U> = T extends U ? T : never;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Omit$1<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type OmitKeys<T, K extends string> = Pick<T, Exclude<keyof T, K>>;
type MakePartial<T, K extends keyof T> = Omit$1<T, K> & InexactPartial<Pick<T, K>>;
type MakeRequired<T, K extends keyof T> = Omit$1<T, K> & Required<Pick<T, K>>;
type Exactly<T, X> = T & Record<Exclude<keyof X, keyof T>, never>;
type NoUndefined<T> = T extends undefined ? never : T;
type Whatever = {} | undefined | null;
type LoosePartial<T extends object> = InexactPartial<T> & {
  [k: string]: unknown;
};
type Mask<Keys extends PropertyKey> = { [K in Keys]?: true };
type Writeable<T> = { -readonly [P in keyof T]: T[P] } & {};
type InexactPartial<T> = { [P in keyof T]?: T[P] | undefined };
type EmptyObject = Record<string, never>;
type BuiltIn = (((...args: any[]) => any) | (new (...args: any[]) => any)) | {
  readonly [Symbol.toStringTag]: string;
} | Date | Error | Generator | Promise<unknown> | RegExp;
type MakeReadonly<T> = T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : T extends Set<infer V> ? ReadonlySet<V> : T extends [infer Head, ...infer Tail] ? readonly [Head, ...Tail] : T extends Array<infer V> ? ReadonlyArray<V> : T extends BuiltIn ? T : Readonly<T>;
type SomeObject = Record<PropertyKey, any>;
type Identity<T> = T;
type Flatten<T> = Identity<{ [k in keyof T]: T[k] }>;
type Mapped<T> = { [k in keyof T]: T[k] };
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type NoNeverKeys<T> = { [k in keyof T]: [T[k]] extends [never] ? never : k }[keyof T];
type NoNever<T> = Identity<{ [k in NoNeverKeys<T>]: k extends keyof T ? T[k] : never }>;
type Extend<A extends SomeObject, B extends SomeObject> = Flatten<keyof A & keyof B extends never ? A & B : { [K in keyof A as K extends keyof B ? never : K]: A[K] } & { [K in keyof B]: B[K] }>;
type TupleItems = ReadonlyArray<SomeType>;
type AnyFunc = (...args: any[]) => any;
type IsProp<T, K extends keyof T> = T[K] extends AnyFunc ? never : K;
type MaybeAsync<T> = T | Promise<T>;
type KeyOf<T> = keyof OmitIndexSignature<T>;
type OmitIndexSignature<T> = { [K in keyof T as string extends K ? never : K extends string ? K : never]: T[K] };
type ExtractIndexSignature<T> = { [K in keyof T as string extends K ? K : K extends string ? never : K]: T[K] };
type Keys<T extends object> = keyof OmitIndexSignature<T>;
type SchemaClass<T extends SomeType> = {
  new (def: T["_zod"]["def"]): T;
};
type EnumValue = string | number;
type EnumLike = Readonly<Record<string, EnumValue>>;
type ToEnum<T extends EnumValue> = Flatten<{ [k in T]: k }>;
type KeysEnum<T extends object> = ToEnum<Exclude<keyof T, symbol>>;
type KeysArray<T extends object> = Flatten<(keyof T & string)[]>;
type Literal = string | number | bigint | boolean | null | undefined;
type LiteralArray = Array<Literal>;
type Primitive = string | number | symbol | bigint | boolean | null | undefined;
type PrimitiveArray = Array<Primitive>;
type HasSize = {
  size: number;
};
type HasLength = {
  length: number;
};
type Numeric = number | bigint | Date;
type SafeParseResult<T> = SafeParseSuccess<T> | SafeParseError<T>;
type SafeParseSuccess<T> = {
  success: true;
  data: T;
  error?: never;
};
type SafeParseError<T> = {
  success: false;
  data?: never;
  error: $ZodError<T>;
};
type PropValues = Record<string, Set<Primitive>>;
type PrimitiveSet = Set<Primitive>;
declare function assertEqual<A, B>(val: AssertEqual<A, B>): AssertEqual<A, B>;
declare function assertNotEqual<A, B>(val: AssertNotEqual<A, B>): AssertNotEqual<A, B>;
declare function assertIs<T>(_arg: T): void;
declare function assertNever(_x: never): never;
declare function assert<T>(_: any): asserts _ is T;
declare function getEnumValues(entries: EnumLike): EnumValue[];
declare function joinValues<T extends Primitive[]>(array: T, separator?: string): string;
declare function jsonStringifyReplacer(_: string, value: any): any;
declare function cached<T>(getter: () => T): {
  value: T;
};
declare function nullish$1(input: any): boolean;
declare function cleanRegex(source: string): string;
declare function floatSafeRemainder(val: number, step: number): number;
declare function defineLazy<T, K extends keyof T>(object: T, key: K, getter: () => T[K]): void;
declare function objectClone(obj: object): any;
declare function assignProp<T extends object, K extends PropertyKey>(target: T, prop: K, value: K extends keyof T ? T[K] : any): void;
declare function mergeDefs(...defs: Record<string, any>[]): any;
declare function cloneDef(schema: $ZodType): any;
declare function getElementAtPath(obj: any, path: (string | number)[] | null | undefined): any;
declare function promiseAllObject<T extends object>(promisesObj: T): Promise<{ [k in keyof T]: Awaited<T[k]> }>;
declare function randomString(length?: number): string;
declare function esc(str: string): string;
declare function slugify(input: string): string;
declare const captureStackTrace: (targetObject: object, constructorOpt?: Function) => void;
declare function isObject(data: any): data is Record<PropertyKey, unknown>;
declare const allowsEval: {
  value: boolean;
};
declare function isPlainObject(o: any): o is Record<PropertyKey, unknown>;
declare function shallowClone(o: any): any;
declare function numKeys(data: any): number;
declare const getParsedType: (data: any) => ParsedTypes;
declare const propertyKeyTypes: Set<string>;
declare const primitiveTypes: Set<string>;
declare function escapeRegex(str: string): string;
declare function clone<T extends $ZodType>(inst: T, def?: T["_zod"]["def"], params?: {
  parent: boolean;
}): T;
type EmptyToNever<T> = keyof T extends never ? never : T;
type Normalize<T> = T extends undefined ? never : T extends Record<any, any> ? Flatten<{ [k in keyof Omit$1<T, "error" | "message">]: T[k] } & ("error" extends keyof T ? {
  error?: Exclude<T["error"], string>;
} : unknown)> : never;
declare function normalizeParams<T>(_params: T): Normalize<T>;
declare function createTransparentProxy<T extends object>(getter: () => T): T;
declare function stringifyPrimitive(value: any): string;
declare function optionalKeys(shape: $ZodShape): string[];
type CleanKey<T extends PropertyKey> = T extends `?${infer K}` ? K : T extends `${infer K}?` ? K : T;
type ToCleanMap<T extends $ZodLooseShape> = { [k in keyof T]: k extends `?${infer K}` ? K : k extends `${infer K}?` ? K : k };
type FromCleanMap<T extends $ZodLooseShape> = { [k in keyof T as k extends `?${infer K}` ? K : k extends `${infer K}?` ? K : k]: k };
declare const NUMBER_FORMAT_RANGES: Record<$ZodNumberFormats, [number, number]>;
declare const BIGINT_FORMAT_RANGES: Record<$ZodBigIntFormats, [bigint, bigint]>;
declare function pick(schema: $ZodObject, mask: Record<string, unknown>): any;
declare function omit(schema: $ZodObject, mask: object): any;
declare function extend(schema: $ZodObject, shape: $ZodShape): any;
declare function safeExtend(schema: $ZodObject, shape: $ZodShape): any;
declare function merge(a: $ZodObject, b: $ZodObject): any;
declare function partial(Class: SchemaClass<$ZodOptional> | null, schema: $ZodObject, mask: object | undefined): any;
declare function required(Class: SchemaClass<$ZodNonOptional>, schema: $ZodObject, mask: object | undefined): any;
type Constructor<T, Def extends any[] = any[]> = new (...args: Def) => T;
declare function aborted(x: ParsePayload, startIndex?: number): boolean;
declare function explicitlyAborted(x: ParsePayload, startIndex?: number): boolean;
declare function prefixIssues(path: PropertyKey, issues: $ZodRawIssue[]): $ZodRawIssue[];
declare function unwrapMessage(message: string | {
  message: string;
} | undefined | null): string | undefined;
declare function finalizeIssue(iss: $ZodRawIssue, ctx: ParseContextInternal | undefined, config: $ZodConfig): $ZodIssue;
declare function getSizableOrigin(input: any): "set" | "map" | "file" | "unknown";
declare function getLengthableOrigin(input: any): "array" | "string" | "unknown";
declare function parsedType(data: unknown): $ZodInvalidTypeExpected;
declare function issue(_iss: string, input: any, inst: any): $ZodRawIssue;
declare function issue(_iss: $ZodRawIssue): $ZodRawIssue;
declare function cleanEnum(obj: Record<string, EnumValue>): EnumValue[];
declare function base64ToUint8Array(base64: string): InstanceType<typeof Uint8Array>;
declare function uint8ArrayToBase64(bytes: Uint8Array): string;
declare function base64urlToUint8Array(base64url: string): InstanceType<typeof Uint8Array>;
declare function uint8ArrayToBase64url(bytes: Uint8Array): string;
declare function hexToUint8Array(hex: string): InstanceType<typeof Uint8Array>;
declare function uint8ArrayToHex(bytes: Uint8Array): string;
declare abstract class Class {
  constructor(..._args: any[]);
}
//#endregion
//#region node_modules/zod/v4/core/versions.d.cts
declare const version: {
  readonly major: 4;
  readonly minor: 4;
  readonly patch: number;
};
//#endregion
//#region node_modules/zod/v4/core/schemas.d.cts
interface ParseContext<T extends $ZodIssueBase = never> {
  /** Customize error messages. */
  readonly error?: $ZodErrorMap<T>;
  /** Include the `input` field in issue objects. Default `false`. */
  readonly reportInput?: boolean;
  /** Skip eval-based fast path. Default `false`. */
  readonly jitless?: boolean;
}
/** @internal */
interface ParseContextInternal<T extends $ZodIssueBase = never> extends ParseContext<T> {
  readonly async?: boolean | undefined;
  readonly direction?: "forward" | "backward";
  readonly skipChecks?: boolean;
}
interface ParsePayload<T = unknown> {
  value: T;
  issues: $ZodRawIssue[];
  /** A way to mark a whole payload as aborted. Used in codecs/pipes. */
  aborted?: boolean;
  /** @internal Marks a value as a fallback that an outer wrapper (e.g.
   * $ZodOptional) may override with its own interpretation when input was
   * undefined. Set by $ZodCatch when catchValue substitutes and by every
   * $ZodTransform invocation. */
  fallback?: boolean | undefined;
}
type CheckFn<T> = (input: ParsePayload<T>) => MaybeAsync<void>;
interface $ZodTypeDef {
  type: "string" | "number" | "int" | "boolean" | "bigint" | "symbol" | "null" | "undefined" | "void" | "never" | "any" | "unknown" | "date" | "object" | "record" | "file" | "array" | "tuple" | "union" | "intersection" | "map" | "set" | "enum" | "literal" | "nullable" | "optional" | "nonoptional" | "success" | "transform" | "default" | "prefault" | "catch" | "nan" | "pipe" | "readonly" | "template_literal" | "promise" | "lazy" | "function" | "custom";
  error?: $ZodErrorMap<never> | undefined;
  checks?: $ZodCheck<never>[];
}
interface _$ZodTypeInternals {
  /** The `@zod/core` version of this schema */
  version: typeof version;
  /** Schema definition. */
  def: $ZodTypeDef;
  /** @internal Randomly generated ID for this schema. */
  /** @internal List of deferred initializers. */
  deferred: AnyFunc[] | undefined;
  /** @internal Parses input and runs all checks (refinements). */
  run(payload: ParsePayload<any>, ctx: ParseContextInternal): MaybeAsync<ParsePayload>;
  /** @internal Parses input, doesn't run checks. */
  parse(payload: ParsePayload<any>, ctx: ParseContextInternal): MaybeAsync<ParsePayload>;
  /** @internal  Stores identifiers for the set of traits implemented by this schema. */
  traits: Set<string>;
  /** @internal Indicates that a schema output type should be considered optional inside objects.
   * @default Required
   */
  /** @internal */
  optin?: "optional" | undefined;
  /** @internal */
  optout?: "optional" | undefined;
  /** @internal The set of literal values that will pass validation. Must be an exhaustive set. Used to determine optionality in z.record().
   *
   * Defined on: enum, const, literal, null, undefined
   * Passthrough: optional, nullable, branded, default, catch, pipe
   * Todo: unions?
   */
  values?: PrimitiveSet | undefined;
  /** Default value bubbled up from  */
  /** @internal A set of literal discriminators used for the fast path in discriminated unions. */
  propValues?: PropValues | undefined;
  /** @internal This flag indicates that a schema validation can be represented with a regular expression. Used to determine allowable schemas in z.templateLiteral(). */
  pattern: RegExp | undefined;
  /** @internal The constructor function of this schema. */
  constr: new (def: any) => $ZodType;
  /** @internal A catchall object for bag metadata related to this schema. Commonly modified by checks using `onattach`. */
  bag: Record<string, unknown>;
  /** @internal The set of issues this schema might throw during type checking. */
  isst: $ZodIssueBase;
  /** @internal Subject to change, not a public API. */
  processJSONSchema?: ((ctx: ToJSONSchemaContext, json: BaseSchema, params: ProcessParams) => void) | undefined;
  /** An optional method used to override `toJSONSchema` logic. */
  toJSONSchema?: () => unknown;
  /** @internal The parent of this schema. Only set during certain clone operations. */
  parent?: $ZodType | undefined;
}
/** @internal */
interface $ZodTypeInternals<out O = unknown, out I = unknown> extends _$ZodTypeInternals {
  /** @internal The inferred output type */
  output: O;
  /** @internal The inferred input type */
  input: I;
}
type $ZodStandardSchema<T> = StandardSchemaV1.Props<input<T>, output<T>>;
type SomeType = {
  _zod: _$ZodTypeInternals;
};
interface $ZodType<O = unknown, I = unknown, Internals extends $ZodTypeInternals<O, I> = $ZodTypeInternals<O, I>> {
  _zod: Internals;
  "~standard": $ZodStandardSchema<this>;
}
interface _$ZodType<T extends $ZodTypeInternals = $ZodTypeInternals> extends $ZodType<T["output"], T["input"], T> {}
declare const $ZodType: $constructor<$ZodType>;
interface $ZodStringDef extends $ZodTypeDef {
  type: "string";
  coerce?: boolean;
  checks?: $ZodCheck<string>[];
}
interface $ZodStringInternals<Input> extends $ZodTypeInternals<string, Input> {
  def: $ZodStringDef;
  /** @deprecated Internal API, use with caution (not deprecated) */
  pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: number;
    maximum: number;
    patterns: Set<RegExp>;
    format: string;
    contentEncoding: string;
  }>;
}
interface $ZodString<Input = unknown> extends _$ZodType<$ZodStringInternals<Input>> {}
declare const $ZodString: $constructor<$ZodString>;
interface $ZodStringFormatDef<Format extends string = string> extends $ZodStringDef, $ZodCheckStringFormatDef<Format> {}
interface $ZodStringFormatInternals<Format extends string = string> extends $ZodStringInternals<string>, $ZodCheckStringFormatInternals {
  def: $ZodStringFormatDef<Format>;
}
interface $ZodStringFormat<Format extends string = string> extends $ZodType {
  _zod: $ZodStringFormatInternals<Format>;
}
declare const $ZodStringFormat: $constructor<$ZodStringFormat>;
interface $ZodGUIDDef extends $ZodStringFormatDef<"guid"> {}
interface $ZodGUIDInternals extends $ZodStringFormatInternals<"guid"> {}
interface $ZodGUID extends $ZodType {
  _zod: $ZodGUIDInternals;
}
declare const $ZodGUID: $constructor<$ZodGUID>;
interface $ZodUUIDDef extends $ZodStringFormatDef<"uuid"> {
  version?: "v1" | "v2" | "v3" | "v4" | "v5" | "v6" | "v7" | "v8";
}
interface $ZodUUIDInternals extends $ZodStringFormatInternals<"uuid"> {
  def: $ZodUUIDDef;
}
interface $ZodUUID extends $ZodType {
  _zod: $ZodUUIDInternals;
}
declare const $ZodUUID: $constructor<$ZodUUID>;
interface $ZodEmailDef extends $ZodStringFormatDef<"email"> {}
interface $ZodEmailInternals extends $ZodStringFormatInternals<"email"> {}
interface $ZodEmail extends $ZodType {
  _zod: $ZodEmailInternals;
}
declare const $ZodEmail: $constructor<$ZodEmail>;
interface $ZodURLDef extends $ZodStringFormatDef<"url"> {
  hostname?: RegExp | undefined;
  protocol?: RegExp | undefined;
  normalize?: boolean | undefined;
}
interface $ZodURLInternals extends $ZodStringFormatInternals<"url"> {
  def: $ZodURLDef;
}
interface $ZodURL extends $ZodType {
  _zod: $ZodURLInternals;
}
declare const $ZodURL: $constructor<$ZodURL>;
interface $ZodEmojiDef extends $ZodStringFormatDef<"emoji"> {}
interface $ZodEmojiInternals extends $ZodStringFormatInternals<"emoji"> {}
interface $ZodEmoji extends $ZodType {
  _zod: $ZodEmojiInternals;
}
declare const $ZodEmoji: $constructor<$ZodEmoji>;
interface $ZodNanoIDDef extends $ZodStringFormatDef<"nanoid"> {}
interface $ZodNanoIDInternals extends $ZodStringFormatInternals<"nanoid"> {}
interface $ZodNanoID extends $ZodType {
  _zod: $ZodNanoIDInternals;
}
declare const $ZodNanoID: $constructor<$ZodNanoID>;
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
interface $ZodCUIDDef extends $ZodStringFormatDef<"cuid"> {}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
interface $ZodCUIDInternals extends $ZodStringFormatInternals<"cuid"> {}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
interface $ZodCUID extends $ZodType {
  _zod: $ZodCUIDInternals;
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link $ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
declare const $ZodCUID: $constructor<$ZodCUID>;
interface $ZodCUID2Def extends $ZodStringFormatDef<"cuid2"> {}
interface $ZodCUID2Internals extends $ZodStringFormatInternals<"cuid2"> {}
interface $ZodCUID2 extends $ZodType {
  _zod: $ZodCUID2Internals;
}
declare const $ZodCUID2: $constructor<$ZodCUID2>;
interface $ZodULIDDef extends $ZodStringFormatDef<"ulid"> {}
interface $ZodULIDInternals extends $ZodStringFormatInternals<"ulid"> {}
interface $ZodULID extends $ZodType {
  _zod: $ZodULIDInternals;
}
declare const $ZodULID: $constructor<$ZodULID>;
interface $ZodXIDDef extends $ZodStringFormatDef<"xid"> {}
interface $ZodXIDInternals extends $ZodStringFormatInternals<"xid"> {}
interface $ZodXID extends $ZodType {
  _zod: $ZodXIDInternals;
}
declare const $ZodXID: $constructor<$ZodXID>;
interface $ZodKSUIDDef extends $ZodStringFormatDef<"ksuid"> {}
interface $ZodKSUIDInternals extends $ZodStringFormatInternals<"ksuid"> {}
interface $ZodKSUID extends $ZodType {
  _zod: $ZodKSUIDInternals;
}
declare const $ZodKSUID: $constructor<$ZodKSUID>;
interface $ZodISODateTimeDef extends $ZodStringFormatDef<"datetime"> {
  precision: number | null;
  offset: boolean;
  local: boolean;
}
interface $ZodISODateTimeInternals extends $ZodStringFormatInternals {
  def: $ZodISODateTimeDef;
}
interface $ZodISODateTime extends $ZodType {
  _zod: $ZodISODateTimeInternals;
}
declare const $ZodISODateTime: $constructor<$ZodISODateTime>;
interface $ZodISODateDef extends $ZodStringFormatDef<"date"> {}
interface $ZodISODateInternals extends $ZodStringFormatInternals<"date"> {}
interface $ZodISODate extends $ZodType {
  _zod: $ZodISODateInternals;
}
declare const $ZodISODate: $constructor<$ZodISODate>;
interface $ZodISOTimeDef extends $ZodStringFormatDef<"time"> {
  precision?: number | null;
}
interface $ZodISOTimeInternals extends $ZodStringFormatInternals<"time"> {
  def: $ZodISOTimeDef;
}
interface $ZodISOTime extends $ZodType {
  _zod: $ZodISOTimeInternals;
}
declare const $ZodISOTime: $constructor<$ZodISOTime>;
interface $ZodISODurationDef extends $ZodStringFormatDef<"duration"> {}
interface $ZodISODurationInternals extends $ZodStringFormatInternals<"duration"> {}
interface $ZodISODuration extends $ZodType {
  _zod: $ZodISODurationInternals;
}
declare const $ZodISODuration: $constructor<$ZodISODuration>;
interface $ZodIPv4Def extends $ZodStringFormatDef<"ipv4"> {
  version?: "v4";
}
interface $ZodIPv4Internals extends $ZodStringFormatInternals<"ipv4"> {
  def: $ZodIPv4Def;
}
interface $ZodIPv4 extends $ZodType {
  _zod: $ZodIPv4Internals;
}
declare const $ZodIPv4: $constructor<$ZodIPv4>;
interface $ZodIPv6Def extends $ZodStringFormatDef<"ipv6"> {
  version?: "v6";
}
interface $ZodIPv6Internals extends $ZodStringFormatInternals<"ipv6"> {
  def: $ZodIPv6Def;
}
interface $ZodIPv6 extends $ZodType {
  _zod: $ZodIPv6Internals;
}
declare const $ZodIPv6: $constructor<$ZodIPv6>;
interface $ZodMACDef extends $ZodStringFormatDef<"mac"> {
  delimiter?: string;
}
interface $ZodMACInternals extends $ZodStringFormatInternals<"mac"> {
  def: $ZodMACDef;
}
interface $ZodMAC extends $ZodType {
  _zod: $ZodMACInternals;
}
declare const $ZodMAC: $constructor<$ZodMAC>;
interface $ZodCIDRv4Def extends $ZodStringFormatDef<"cidrv4"> {
  version?: "v4";
}
interface $ZodCIDRv4Internals extends $ZodStringFormatInternals<"cidrv4"> {
  def: $ZodCIDRv4Def;
}
interface $ZodCIDRv4 extends $ZodType {
  _zod: $ZodCIDRv4Internals;
}
declare const $ZodCIDRv4: $constructor<$ZodCIDRv4>;
interface $ZodCIDRv6Def extends $ZodStringFormatDef<"cidrv6"> {
  version?: "v6";
}
interface $ZodCIDRv6Internals extends $ZodStringFormatInternals<"cidrv6"> {
  def: $ZodCIDRv6Def;
}
interface $ZodCIDRv6 extends $ZodType {
  _zod: $ZodCIDRv6Internals;
}
declare const $ZodCIDRv6: $constructor<$ZodCIDRv6>;
declare function isValidBase64(data: string): boolean;
interface $ZodBase64Def extends $ZodStringFormatDef<"base64"> {}
interface $ZodBase64Internals extends $ZodStringFormatInternals<"base64"> {}
interface $ZodBase64 extends $ZodType {
  _zod: $ZodBase64Internals;
}
declare const $ZodBase64: $constructor<$ZodBase64>;
declare function isValidBase64URL(data: string): boolean;
interface $ZodBase64URLDef extends $ZodStringFormatDef<"base64url"> {}
interface $ZodBase64URLInternals extends $ZodStringFormatInternals<"base64url"> {}
interface $ZodBase64URL extends $ZodType {
  _zod: $ZodBase64URLInternals;
}
declare const $ZodBase64URL: $constructor<$ZodBase64URL>;
interface $ZodE164Def extends $ZodStringFormatDef<"e164"> {}
interface $ZodE164Internals extends $ZodStringFormatInternals<"e164"> {}
interface $ZodE164 extends $ZodType {
  _zod: $ZodE164Internals;
}
declare const $ZodE164: $constructor<$ZodE164>;
declare function isValidJWT(token: string, algorithm?: JWTAlgorithm | null): boolean;
interface $ZodJWTDef extends $ZodStringFormatDef<"jwt"> {
  alg?: JWTAlgorithm | undefined;
}
interface $ZodJWTInternals extends $ZodStringFormatInternals<"jwt"> {
  def: $ZodJWTDef;
}
interface $ZodJWT extends $ZodType {
  _zod: $ZodJWTInternals;
}
declare const $ZodJWT: $constructor<$ZodJWT>;
interface $ZodCustomStringFormatDef<Format extends string = string> extends $ZodStringFormatDef<Format> {
  fn: (val: string) => unknown;
}
interface $ZodCustomStringFormatInternals<Format extends string = string> extends $ZodStringFormatInternals<Format> {
  def: $ZodCustomStringFormatDef<Format>;
}
interface $ZodCustomStringFormat<Format extends string = string> extends $ZodStringFormat<Format> {
  _zod: $ZodCustomStringFormatInternals<Format>;
}
declare const $ZodCustomStringFormat: $constructor<$ZodCustomStringFormat>;
interface $ZodNumberDef extends $ZodTypeDef {
  type: "number";
  coerce?: boolean;
}
interface $ZodNumberInternals<Input = unknown> extends $ZodTypeInternals<number, Input> {
  def: $ZodNumberDef;
  /** @deprecated Internal API, use with caution (not deprecated) */
  pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: number;
    maximum: number;
    exclusiveMinimum: number;
    exclusiveMaximum: number;
    format: string;
    pattern: RegExp;
  }>;
}
interface $ZodNumber<Input = unknown> extends $ZodType {
  _zod: $ZodNumberInternals<Input>;
}
declare const $ZodNumber: $constructor<$ZodNumber>;
interface $ZodNumberFormatDef extends $ZodNumberDef, $ZodCheckNumberFormatDef {}
interface $ZodNumberFormatInternals extends $ZodNumberInternals<number>, $ZodCheckNumberFormatInternals {
  def: $ZodNumberFormatDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodNumberFormat extends $ZodType {
  _zod: $ZodNumberFormatInternals;
}
declare const $ZodNumberFormat: $constructor<$ZodNumberFormat>;
interface $ZodBooleanDef extends $ZodTypeDef {
  type: "boolean";
  coerce?: boolean;
  checks?: $ZodCheck<boolean>[];
}
interface $ZodBooleanInternals<T = unknown> extends $ZodTypeInternals<boolean, T> {
  pattern: RegExp;
  def: $ZodBooleanDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodBoolean<T = unknown> extends $ZodType {
  _zod: $ZodBooleanInternals<T>;
}
declare const $ZodBoolean: $constructor<$ZodBoolean>;
interface $ZodBigIntDef extends $ZodTypeDef {
  type: "bigint";
  coerce?: boolean;
}
interface $ZodBigIntInternals<T = unknown> extends $ZodTypeInternals<bigint, T> {
  pattern: RegExp;
  /** @internal Internal API, use with caution */
  def: $ZodBigIntDef;
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: bigint;
    maximum: bigint;
    format: string;
  }>;
}
interface $ZodBigInt<T = unknown> extends $ZodType {
  _zod: $ZodBigIntInternals<T>;
}
declare const $ZodBigInt: $constructor<$ZodBigInt>;
interface $ZodBigIntFormatDef extends $ZodBigIntDef, $ZodCheckBigIntFormatDef {
  check: "bigint_format";
}
interface $ZodBigIntFormatInternals extends $ZodBigIntInternals<bigint>, $ZodCheckBigIntFormatInternals {
  def: $ZodBigIntFormatDef;
}
interface $ZodBigIntFormat extends $ZodType {
  _zod: $ZodBigIntFormatInternals;
}
declare const $ZodBigIntFormat: $constructor<$ZodBigIntFormat>;
interface $ZodSymbolDef extends $ZodTypeDef {
  type: "symbol";
}
interface $ZodSymbolInternals extends $ZodTypeInternals<symbol, symbol> {
  def: $ZodSymbolDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodSymbol extends $ZodType {
  _zod: $ZodSymbolInternals;
}
declare const $ZodSymbol: $constructor<$ZodSymbol>;
interface $ZodUndefinedDef extends $ZodTypeDef {
  type: "undefined";
}
interface $ZodUndefinedInternals extends $ZodTypeInternals<undefined, undefined> {
  pattern: RegExp;
  def: $ZodUndefinedDef;
  values: PrimitiveSet;
  isst: $ZodIssueInvalidType;
}
interface $ZodUndefined extends $ZodType {
  _zod: $ZodUndefinedInternals;
}
declare const $ZodUndefined: $constructor<$ZodUndefined>;
interface $ZodNullDef extends $ZodTypeDef {
  type: "null";
}
interface $ZodNullInternals extends $ZodTypeInternals<null, null> {
  pattern: RegExp;
  def: $ZodNullDef;
  values: PrimitiveSet;
  isst: $ZodIssueInvalidType;
}
interface $ZodNull extends $ZodType {
  _zod: $ZodNullInternals;
}
declare const $ZodNull: $constructor<$ZodNull>;
interface $ZodAnyDef extends $ZodTypeDef {
  type: "any";
}
interface $ZodAnyInternals extends $ZodTypeInternals<any, any> {
  def: $ZodAnyDef;
  isst: never;
}
interface $ZodAny extends $ZodType {
  _zod: $ZodAnyInternals;
}
declare const $ZodAny: $constructor<$ZodAny>;
interface $ZodUnknownDef extends $ZodTypeDef {
  type: "unknown";
}
interface $ZodUnknownInternals extends $ZodTypeInternals<unknown, unknown> {
  def: $ZodUnknownDef;
  isst: never;
}
interface $ZodUnknown extends $ZodType {
  _zod: $ZodUnknownInternals;
}
declare const $ZodUnknown: $constructor<$ZodUnknown>;
interface $ZodNeverDef extends $ZodTypeDef {
  type: "never";
}
interface $ZodNeverInternals extends $ZodTypeInternals<never, never> {
  def: $ZodNeverDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodNever extends $ZodType {
  _zod: $ZodNeverInternals;
}
declare const $ZodNever: $constructor<$ZodNever>;
interface $ZodVoidDef extends $ZodTypeDef {
  type: "void";
}
interface $ZodVoidInternals extends $ZodTypeInternals<void, void> {
  def: $ZodVoidDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodVoid extends $ZodType {
  _zod: $ZodVoidInternals;
}
declare const $ZodVoid: $constructor<$ZodVoid>;
interface $ZodDateDef extends $ZodTypeDef {
  type: "date";
  coerce?: boolean;
}
interface $ZodDateInternals<T = unknown> extends $ZodTypeInternals<Date, T> {
  def: $ZodDateDef;
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: Date;
    maximum: Date;
    format: string;
  }>;
}
interface $ZodDate<T = unknown> extends $ZodType {
  _zod: $ZodDateInternals<T>;
}
declare const $ZodDate: $constructor<$ZodDate>;
interface $ZodArrayDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "array";
  element: T;
}
interface $ZodArrayInternals<T extends SomeType = $ZodType> extends _$ZodTypeInternals {
  def: $ZodArrayDef<T>;
  isst: $ZodIssueInvalidType;
  output: output<T>[];
  input: input<T>[];
}
interface $ZodArray<T extends SomeType = $ZodType> extends $ZodType<any, any, $ZodArrayInternals<T>> {}
declare const $ZodArray: $constructor<$ZodArray>;
type OptionalOutSchema = {
  _zod: {
    optout: "optional";
  };
};
type OptionalInSchema = {
  _zod: {
    optin: "optional";
  };
};
type $InferObjectOutput<T extends $ZodLooseShape, Extra extends Record<string, unknown>> = string extends keyof T ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, output<T[keyof T]>> : keyof (T & Extra) extends never ? Record<string, never> : Prettify<{ -readonly [k in keyof T as T[k] extends OptionalOutSchema ? never : k]: T[k]["_zod"]["output"] } & { -readonly [k in keyof T as T[k] extends OptionalOutSchema ? k : never]?: T[k]["_zod"]["output"] } & Extra>;
type $InferObjectInput<T extends $ZodLooseShape, Extra extends Record<string, unknown>> = string extends keyof T ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, input<T[keyof T]>> : keyof (T & Extra) extends never ? Record<string, never> : Prettify<{ -readonly [k in keyof T as T[k] extends OptionalInSchema ? never : k]: T[k]["_zod"]["input"] } & { -readonly [k in keyof T as T[k] extends OptionalInSchema ? k : never]?: T[k]["_zod"]["input"] } & Extra>;
type $ZodObjectConfig = {
  out: Record<string, unknown>;
  in: Record<string, unknown>;
};
type $loose = {
  out: Record<string, unknown>;
  in: Record<string, unknown>;
};
type $strict = {
  out: {};
  in: {};
};
type $strip = {
  out: {};
  in: {};
};
type $catchall<T extends SomeType> = {
  out: {
    [k: string]: output<T>;
  };
  in: {
    [k: string]: input<T>;
  };
};
type $ZodShape = Readonly<{
  [k: string]: $ZodType;
}>;
interface $ZodObjectDef<Shape extends $ZodShape = $ZodShape> extends $ZodTypeDef {
  type: "object";
  shape: Shape;
  catchall?: $ZodType | undefined;
}
interface $ZodObjectInternals< /** @ts-ignore Cast variance */out Shape extends $ZodShape = $ZodShape, out Config extends $ZodObjectConfig = $ZodObjectConfig> extends _$ZodTypeInternals {
  def: $ZodObjectDef<Shape>;
  config: Config;
  isst: $ZodIssueInvalidType | $ZodIssueUnrecognizedKeys;
  propValues: PropValues;
  output: $InferObjectOutput<Shape, Config["out"]>;
  input: $InferObjectInput<Shape, Config["in"]>;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
type $ZodLooseShape = Record<string, any>;
interface $ZodObject< /** @ts-ignore Cast variance */out Shape extends Readonly<$ZodShape> = Readonly<$ZodShape>, out Params extends $ZodObjectConfig = $ZodObjectConfig> extends $ZodType<any, any, $ZodObjectInternals<Shape, Params>> {}
declare const $ZodObject: $constructor<$ZodObject>;
declare const $ZodObjectJIT: $constructor<$ZodObject>;
type $InferUnionOutput<T extends SomeType> = T extends any ? output<T> : never;
type $InferUnionInput<T extends SomeType> = T extends any ? input<T> : never;
interface $ZodUnionDef<Options extends readonly SomeType[] = readonly $ZodType[]> extends $ZodTypeDef {
  type: "union";
  options: Options;
  inclusive?: boolean;
}
type IsOptionalIn<T extends SomeType> = T extends OptionalInSchema ? true : false;
type IsOptionalOut<T extends SomeType> = T extends OptionalOutSchema ? true : false;
interface $ZodUnionInternals<T extends readonly SomeType[] = readonly $ZodType[]> extends _$ZodTypeInternals {
  def: $ZodUnionDef<T>;
  isst: $ZodIssueInvalidUnion;
  pattern: T[number]["_zod"]["pattern"];
  values: T[number]["_zod"]["values"];
  output: $InferUnionOutput<T[number]>;
  input: $InferUnionInput<T[number]>;
  optin: IsOptionalIn<T[number]> extends false ? "optional" | undefined : "optional";
  optout: IsOptionalOut<T[number]> extends false ? "optional" | undefined : "optional";
}
interface $ZodUnion<T extends readonly SomeType[] = readonly $ZodType[]> extends $ZodType<any, any, $ZodUnionInternals<T>> {
  _zod: $ZodUnionInternals<T>;
}
declare const $ZodUnion: $constructor<$ZodUnion>;
interface $ZodXorInternals<T extends readonly SomeType[] = readonly $ZodType[]> extends $ZodUnionInternals<T> {}
interface $ZodXor<T extends readonly SomeType[] = readonly $ZodType[]> extends $ZodType<any, any, $ZodXorInternals<T>> {
  _zod: $ZodXorInternals<T>;
}
declare const $ZodXor: $constructor<$ZodXor>;
interface $ZodDiscriminatedUnionDef<Options extends readonly SomeType[] = readonly $ZodType[], Disc extends string = string> extends $ZodUnionDef<Options> {
  discriminator: Disc;
  unionFallback?: boolean;
}
interface $ZodDiscriminatedUnionInternals<Options extends readonly SomeType[] = readonly $ZodType[], Disc extends string = string> extends $ZodUnionInternals<Options> {
  def: $ZodDiscriminatedUnionDef<Options, Disc>;
  propValues: PropValues;
}
interface $ZodDiscriminatedUnion<Options extends readonly SomeType[] = readonly $ZodType[], Disc extends string = string> extends $ZodType {
  _zod: $ZodDiscriminatedUnionInternals<Options, Disc>;
}
declare const $ZodDiscriminatedUnion: $constructor<$ZodDiscriminatedUnion>;
interface $ZodIntersectionDef<Left extends SomeType = $ZodType, Right extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "intersection";
  left: Left;
  right: Right;
}
interface $ZodIntersectionInternals<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends _$ZodTypeInternals {
  def: $ZodIntersectionDef<A, B>;
  isst: never;
  optin: A["_zod"]["optin"] | B["_zod"]["optin"];
  optout: A["_zod"]["optout"] | B["_zod"]["optout"];
  output: output<A> & output<B>;
  input: input<A> & input<B>;
}
interface $ZodIntersection<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodIntersectionInternals<A, B>;
}
declare const $ZodIntersection: $constructor<$ZodIntersection>;
interface $ZodTupleDef<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends $ZodTypeDef {
  type: "tuple";
  items: T;
  rest: Rest;
}
type $InferTupleInputType<T extends TupleItems, Rest extends SomeType | null> = [...TupleInputTypeWithOptionals<T>, ...(Rest extends SomeType ? input<Rest>[] : [])];
type TupleInputTypeNoOptionals<T extends TupleItems> = { [k in keyof T]: input<T[k]> };
type TupleInputTypeWithOptionals<T extends TupleItems> = T extends readonly [...infer Prefix extends SomeType[], infer Tail extends SomeType] ? Tail["_zod"]["optin"] extends "optional" ? [...TupleInputTypeWithOptionals<Prefix>, input<Tail>?] : TupleInputTypeNoOptionals<T> : [];
type $InferTupleOutputType<T extends TupleItems, Rest extends SomeType | null> = [...TupleOutputTypeWithOptionals<T>, ...(Rest extends SomeType ? output<Rest>[] : [])];
type TupleOutputTypeNoOptionals<T extends TupleItems> = { [k in keyof T]: output<T[k]> };
type TupleOutputTypeWithOptionals<T extends TupleItems> = T extends readonly [...infer Prefix extends SomeType[], infer Tail extends SomeType] ? Tail["_zod"]["optout"] extends "optional" ? [...TupleOutputTypeWithOptionals<Prefix>, output<Tail>?] : TupleOutputTypeNoOptionals<T> : [];
interface $ZodTupleInternals<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends _$ZodTypeInternals {
  def: $ZodTupleDef<T, Rest>;
  isst: $ZodIssueInvalidType | $ZodIssueTooBig<unknown[]> | $ZodIssueTooSmall<unknown[]>;
  output: $InferTupleOutputType<T, Rest>;
  input: $InferTupleInputType<T, Rest>;
}
interface $ZodTuple<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends $ZodType {
  _zod: $ZodTupleInternals<T, Rest>;
}
declare const $ZodTuple: $constructor<$ZodTuple>;
type $ZodRecordKey = $ZodType<string | number | symbol, unknown>;
interface $ZodRecordDef<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "record";
  keyType: Key;
  valueType: Value;
  /** @default "strict" - errors on keys not matching keyType. "loose" passes through non-matching keys unchanged. */
  mode?: "strict" | "loose";
}
type $InferZodRecordOutput<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> = Key extends $partial ? Partial<Record<output<Key>, output<Value>>> : Record<output<Key>, output<Value>>;
type $InferZodRecordInput<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> = Key extends $partial ? Partial<Record<input<Key> & PropertyKey, input<Value>>> : Record<input<Key> & PropertyKey, input<Value>>;
interface $ZodRecordInternals<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends $ZodTypeInternals<$InferZodRecordOutput<Key, Value>, $InferZodRecordInput<Key, Value>> {
  def: $ZodRecordDef<Key, Value>;
  isst: $ZodIssueInvalidType | $ZodIssueInvalidKey<Record<PropertyKey, unknown>>;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
type $partial = {
  "~~partial": true;
};
interface $ZodRecord<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodRecordInternals<Key, Value>;
}
declare const $ZodRecord: $constructor<$ZodRecord>;
interface $ZodMapDef<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "map";
  keyType: Key;
  valueType: Value;
}
interface $ZodMapInternals<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends $ZodTypeInternals<Map<output<Key>, output<Value>>, Map<input<Key>, input<Value>>> {
  def: $ZodMapDef<Key, Value>;
  isst: $ZodIssueInvalidType | $ZodIssueInvalidKey | $ZodIssueInvalidElement<unknown>;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
interface $ZodMap<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodMapInternals<Key, Value>;
}
declare const $ZodMap: $constructor<$ZodMap>;
interface $ZodSetDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "set";
  valueType: T;
}
interface $ZodSetInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<Set<output<T>>, Set<input<T>>> {
  def: $ZodSetDef<T>;
  isst: $ZodIssueInvalidType;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
interface $ZodSet<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodSetInternals<T>;
}
declare const $ZodSet: $constructor<$ZodSet>;
type $InferEnumOutput<T extends EnumLike> = T[keyof T] & {};
type $InferEnumInput<T extends EnumLike> = T[keyof T] & {};
interface $ZodEnumDef<T extends EnumLike = EnumLike> extends $ZodTypeDef {
  type: "enum";
  entries: T;
}
interface $ZodEnumInternals< /** @ts-ignore Cast variance */out T extends EnumLike = EnumLike> extends $ZodTypeInternals<$InferEnumOutput<T>, $InferEnumInput<T>> {
  def: $ZodEnumDef<T>;
  /** @deprecated Internal API, use with caution (not deprecated) */
  values: PrimitiveSet;
  /** @deprecated Internal API, use with caution (not deprecated) */
  pattern: RegExp;
  isst: $ZodIssueInvalidValue;
}
interface $ZodEnum<T extends EnumLike = EnumLike> extends $ZodType {
  _zod: $ZodEnumInternals<T>;
}
declare const $ZodEnum: $constructor<$ZodEnum>;
interface $ZodLiteralDef<T extends Literal> extends $ZodTypeDef {
  type: "literal";
  values: T[];
}
interface $ZodLiteralInternals<T extends Literal = Literal> extends $ZodTypeInternals<T, T> {
  def: $ZodLiteralDef<T>;
  values: Set<T>;
  pattern: RegExp;
  isst: $ZodIssueInvalidValue;
}
interface $ZodLiteral<T extends Literal = Literal> extends $ZodType {
  _zod: $ZodLiteralInternals<T>;
}
declare const $ZodLiteral: $constructor<$ZodLiteral>;
type _File = typeof globalThis extends {
  File: infer F extends new (...args: any[]) => any;
} ? InstanceType<F> : {};
/** Do not reference this directly. */
interface File extends _File {
  readonly type: string;
  readonly size: number;
}
interface $ZodFileDef extends $ZodTypeDef {
  type: "file";
}
interface $ZodFileInternals extends $ZodTypeInternals<File, File> {
  def: $ZodFileDef;
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: number;
    maximum: number;
    mime: MimeTypes[];
  }>;
}
interface $ZodFile extends $ZodType {
  _zod: $ZodFileInternals;
}
declare const $ZodFile: $constructor<$ZodFile>;
interface $ZodTransformDef extends $ZodTypeDef {
  type: "transform";
  transform: (input: unknown, payload: ParsePayload<unknown>) => MaybeAsync<unknown>;
}
interface $ZodTransformInternals<O = unknown, I = unknown> extends $ZodTypeInternals<O, I> {
  def: $ZodTransformDef;
  isst: never;
}
interface $ZodTransform<O = unknown, I = unknown> extends $ZodType {
  _zod: $ZodTransformInternals<O, I>;
}
declare const $ZodTransform: $constructor<$ZodTransform>;
interface $ZodOptionalDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "optional";
  innerType: T;
}
interface $ZodOptionalInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T> | undefined, input<T> | undefined> {
  def: $ZodOptionalDef<T>;
  optin: "optional";
  optout: "optional";
  isst: never;
  values: T["_zod"]["values"];
  pattern: T["_zod"]["pattern"];
}
interface $ZodOptional<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodOptionalInternals<T>;
}
declare const $ZodOptional: $constructor<$ZodOptional>;
interface $ZodExactOptionalDef<T extends SomeType = $ZodType> extends $ZodOptionalDef<T> {}
interface $ZodExactOptionalInternals<T extends SomeType = $ZodType> extends $ZodOptionalInternals<T> {
  def: $ZodExactOptionalDef<T>;
  output: output<T>;
  input: input<T>;
}
interface $ZodExactOptional<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodExactOptionalInternals<T>;
}
declare const $ZodExactOptional: $constructor<$ZodExactOptional>;
interface $ZodNullableDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "nullable";
  innerType: T;
}
interface $ZodNullableInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T> | null, input<T> | null> {
  def: $ZodNullableDef<T>;
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
  isst: never;
  values: T["_zod"]["values"];
  pattern: T["_zod"]["pattern"];
}
interface $ZodNullable<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodNullableInternals<T>;
}
declare const $ZodNullable: $constructor<$ZodNullable>;
interface $ZodDefaultDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "default";
  innerType: T;
  /** The default value. May be a getter. */
  defaultValue: NoUndefined<output<T>>;
}
interface $ZodDefaultInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<NoUndefined<output<T>>, input<T> | undefined> {
  def: $ZodDefaultDef<T>;
  optin: "optional";
  optout?: "optional" | undefined;
  isst: never;
  values: T["_zod"]["values"];
}
interface $ZodDefault<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodDefaultInternals<T>;
}
declare const $ZodDefault: $constructor<$ZodDefault>;
interface $ZodPrefaultDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "prefault";
  innerType: T;
  /** The default value. May be a getter. */
  defaultValue: input<T>;
}
interface $ZodPrefaultInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<NoUndefined<output<T>>, input<T> | undefined> {
  def: $ZodPrefaultDef<T>;
  optin: "optional";
  optout?: "optional" | undefined;
  isst: never;
  values: T["_zod"]["values"];
}
interface $ZodPrefault<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodPrefaultInternals<T>;
}
declare const $ZodPrefault: $constructor<$ZodPrefault>;
interface $ZodNonOptionalDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "nonoptional";
  innerType: T;
}
interface $ZodNonOptionalInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<NoUndefined<output<T>>, NoUndefined<input<T>>> {
  def: $ZodNonOptionalDef<T>;
  isst: $ZodIssueInvalidType;
  values: T["_zod"]["values"];
  optin: "optional" | undefined;
  optout: "optional" | undefined;
}
interface $ZodNonOptional<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodNonOptionalInternals<T>;
}
declare const $ZodNonOptional: $constructor<$ZodNonOptional>;
interface $ZodSuccessDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "success";
  innerType: T;
}
interface $ZodSuccessInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<boolean, input<T>> {
  def: $ZodSuccessDef<T>;
  isst: never;
  optin: T["_zod"]["optin"];
  optout: "optional" | undefined;
}
interface $ZodSuccess<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodSuccessInternals<T>;
}
declare const $ZodSuccess: $constructor<$ZodSuccess>;
interface $ZodCatchCtx extends ParsePayload {
  /** @deprecated Use `ctx.issues` */
  error: {
    issues: $ZodIssue[];
  };
  /** @deprecated Use `ctx.value` */
  input: unknown;
}
interface $ZodCatchDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "catch";
  innerType: T;
  catchValue: (ctx: $ZodCatchCtx) => unknown;
}
interface $ZodCatchInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T>, input<T>> {
  def: $ZodCatchDef<T>;
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
  isst: never;
  values: T["_zod"]["values"];
}
interface $ZodCatch<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodCatchInternals<T>;
}
declare const $ZodCatch: $constructor<$ZodCatch>;
interface $ZodNaNDef extends $ZodTypeDef {
  type: "nan";
}
interface $ZodNaNInternals extends $ZodTypeInternals<number, number> {
  def: $ZodNaNDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodNaN extends $ZodType {
  _zod: $ZodNaNInternals;
}
declare const $ZodNaN: $constructor<$ZodNaN>;
interface $ZodPipeDef<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "pipe";
  in: A;
  out: B;
  /** Only defined inside $ZodCodec instances. */
  transform?: (value: output<A>, payload: ParsePayload<output<A>>) => MaybeAsync<input<B>>;
  /** Only defined inside $ZodCodec instances. */
  reverseTransform?: (value: input<B>, payload: ParsePayload<input<B>>) => MaybeAsync<output<A>>;
}
interface $ZodPipeInternals<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodTypeInternals<output<B>, input<A>> {
  def: $ZodPipeDef<A, B>;
  isst: never;
  values: A["_zod"]["values"];
  optin: A["_zod"]["optin"];
  optout: B["_zod"]["optout"];
  propValues: A["_zod"]["propValues"];
}
interface $ZodPipe<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodPipeInternals<A, B>;
}
declare const $ZodPipe: $constructor<$ZodPipe>;
interface $ZodCodecDef<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodPipeDef<A, B> {
  transform: (value: output<A>, payload: ParsePayload<output<A>>) => MaybeAsync<input<B>>;
  reverseTransform: (value: input<B>, payload: ParsePayload<input<B>>) => MaybeAsync<output<A>>;
}
interface $ZodCodecInternals<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodTypeInternals<output<B>, input<A>> {
  def: $ZodCodecDef<A, B>;
  isst: never;
  values: A["_zod"]["values"];
  optin: A["_zod"]["optin"];
  optout: B["_zod"]["optout"];
  propValues: A["_zod"]["propValues"];
}
interface $ZodCodec<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodCodecInternals<A, B>;
}
declare const $ZodCodec: $constructor<$ZodCodec>;
interface $ZodPreprocessDef<B extends SomeType = $ZodType> extends $ZodPipeDef<$ZodTransform, B> {
  in: $ZodTransform;
  out: B;
}
interface $ZodPreprocessInternals<B extends SomeType = $ZodType> extends $ZodPipeInternals<$ZodTransform, B> {
  def: $ZodPreprocessDef<B>;
  optin: B["_zod"]["optin"];
  optout: B["_zod"]["optout"];
}
interface $ZodPreprocess<B extends SomeType = $ZodType> extends $ZodPipe<$ZodTransform, B> {
  _zod: $ZodPreprocessInternals<B>;
}
declare const $ZodPreprocess: $constructor<$ZodPreprocess>;
interface $ZodReadonlyDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "readonly";
  innerType: T;
}
interface $ZodReadonlyInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<MakeReadonly<output<T>>, MakeReadonly<input<T>>> {
  def: $ZodReadonlyDef<T>;
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
  isst: never;
  propValues: T["_zod"]["propValues"];
  values: T["_zod"]["values"];
}
interface $ZodReadonly<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodReadonlyInternals<T>;
}
declare const $ZodReadonly: $constructor<$ZodReadonly>;
interface $ZodTemplateLiteralDef extends $ZodTypeDef {
  type: "template_literal";
  parts: $ZodTemplateLiteralPart[];
  format?: string | undefined;
}
interface $ZodTemplateLiteralInternals<Template extends string = string> extends $ZodTypeInternals<Template, Template> {
  pattern: RegExp;
  def: $ZodTemplateLiteralDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodTemplateLiteral<Template extends string = string> extends $ZodType {
  _zod: $ZodTemplateLiteralInternals<Template>;
}
type LiteralPart = Exclude<Literal, symbol>;
interface SchemaPartInternals extends $ZodTypeInternals<LiteralPart, LiteralPart> {
  pattern: RegExp;
}
interface SchemaPart extends $ZodType {
  _zod: SchemaPartInternals;
}
type $ZodTemplateLiteralPart = LiteralPart | SchemaPart;
type UndefinedToEmptyString<T> = T extends undefined ? "" : T;
type AppendToTemplateLiteral<Template extends string, Suffix extends LiteralPart | $ZodType> = Suffix extends LiteralPart ? `${Template}${UndefinedToEmptyString<Suffix>}` : Suffix extends $ZodType ? `${Template}${output<Suffix> extends infer T extends LiteralPart ? UndefinedToEmptyString<T> : never}` : never;
type ConcatenateTupleOfStrings<T extends string[]> = T extends [infer First extends string, ...infer Rest extends string[]] ? Rest extends string[] ? First extends "" ? ConcatenateTupleOfStrings<Rest> : `${First}${ConcatenateTupleOfStrings<Rest>}` : never : "";
type ConvertPartsToStringTuple<Parts extends $ZodTemplateLiteralPart[]> = { [K in keyof Parts]: Parts[K] extends LiteralPart ? `${UndefinedToEmptyString<Parts[K]>}` : Parts[K] extends $ZodType ? `${output<Parts[K]> extends infer T extends LiteralPart ? UndefinedToEmptyString<T> : never}` : never };
type ToTemplateLiteral<Parts extends $ZodTemplateLiteralPart[]> = ConcatenateTupleOfStrings<ConvertPartsToStringTuple<Parts>>;
type $PartsToTemplateLiteral<Parts extends $ZodTemplateLiteralPart[]> = [] extends Parts ? `` : Parts extends [...infer Rest, infer Last extends $ZodTemplateLiteralPart] ? Rest extends $ZodTemplateLiteralPart[] ? AppendToTemplateLiteral<$PartsToTemplateLiteral<Rest>, Last> : never : never;
declare const $ZodTemplateLiteral: $constructor<$ZodTemplateLiteral>;
type $ZodFunctionArgs = $ZodType<unknown[], unknown[]>;
type $ZodFunctionIn = $ZodFunctionArgs;
type $ZodFunctionOut = $ZodType;
type $InferInnerFunctionType<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : output<Args>) => input<Returns>;
type $InferInnerFunctionTypeAsync<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : output<Args>) => MaybeAsync<input<Returns>>;
type $InferOuterFunctionType<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : input<Args>) => output<Returns>;
type $InferOuterFunctionTypeAsync<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : input<Args>) => Promise<output<Returns>>;
interface $ZodFunctionDef<In extends $ZodFunctionIn = $ZodFunctionIn, Out extends $ZodFunctionOut = $ZodFunctionOut> extends $ZodTypeDef {
  type: "function";
  input: In;
  output: Out;
}
interface $ZodFunctionInternals<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> extends $ZodTypeInternals<$InferOuterFunctionType<Args, Returns>, $InferInnerFunctionType<Args, Returns>> {
  def: $ZodFunctionDef<Args, Returns>;
  isst: $ZodIssueInvalidType;
}
interface $ZodFunction<Args extends $ZodFunctionIn = $ZodFunctionIn, Returns extends $ZodFunctionOut = $ZodFunctionOut> extends $ZodType<any, any, $ZodFunctionInternals<Args, Returns>> {
  /** @deprecated */
  _def: $ZodFunctionDef<Args, Returns>;
  _input: $InferInnerFunctionType<Args, Returns>;
  _output: $InferOuterFunctionType<Args, Returns>;
  implement<F extends $InferInnerFunctionType<Args, Returns>>(func: F): (...args: Parameters<this["_output"]>) => ReturnType<F> extends ReturnType<this["_output"]> ? ReturnType<F> : ReturnType<this["_output"]>;
  implementAsync<F extends $InferInnerFunctionTypeAsync<Args, Returns>>(func: F): F extends $InferOuterFunctionTypeAsync<Args, Returns> ? F : $InferOuterFunctionTypeAsync<Args, Returns>;
  input<const Items extends TupleItems, const Rest extends $ZodFunctionOut = $ZodFunctionOut>(args: Items, rest?: Rest): $ZodFunction<$ZodTuple<Items, Rest>, Returns>;
  input<NewArgs extends $ZodFunctionIn>(args: NewArgs): $ZodFunction<NewArgs, Returns>;
  input(...args: any[]): $ZodFunction<any, Returns>;
  output<NewReturns extends $ZodType>(output: NewReturns): $ZodFunction<Args, NewReturns>;
}
interface $ZodFunctionParams<I extends $ZodFunctionIn, O extends $ZodType> {
  input?: I;
  output?: O;
}
declare const $ZodFunction: $constructor<$ZodFunction>;
interface $ZodPromiseDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "promise";
  innerType: T;
}
interface $ZodPromiseInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<Promise<output<T>>, MaybeAsync<input<T>>> {
  def: $ZodPromiseDef<T>;
  isst: never;
}
interface $ZodPromise<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodPromiseInternals<T>;
}
declare const $ZodPromise: $constructor<$ZodPromise>;
interface $ZodLazyDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "lazy";
  getter: () => T;
}
interface $ZodLazyInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T>, input<T>> {
  def: $ZodLazyDef<T>;
  isst: never;
  /** Auto-cached way to retrieve the inner schema */
  innerType: T;
  pattern: T["_zod"]["pattern"];
  propValues: T["_zod"]["propValues"];
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
}
interface $ZodLazy<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodLazyInternals<T>;
}
declare const $ZodLazy: $constructor<$ZodLazy>;
interface $ZodCustomDef<O = unknown> extends $ZodTypeDef, $ZodCheckDef {
  type: "custom";
  check: "custom";
  path?: PropertyKey[] | undefined;
  error?: $ZodErrorMap | undefined;
  params?: Record<string, any> | undefined;
  fn: (arg: O) => unknown;
}
interface $ZodCustomInternals<O = unknown, I = unknown> extends $ZodTypeInternals<O, I>, $ZodCheckInternals<O> {
  def: $ZodCustomDef;
  issc: $ZodIssue;
  isst: never;
  bag: LoosePartial<{
    Class: typeof Class;
  }>;
}
interface $ZodCustom<O = unknown, I = unknown> extends $ZodType {
  _zod: $ZodCustomInternals<O, I>;
}
declare const $ZodCustom: $constructor<$ZodCustom>;
type $ZodTypes = $ZodString | $ZodNumber | $ZodBigInt | $ZodBoolean | $ZodDate | $ZodSymbol | $ZodUndefined | $ZodNullable | $ZodNull | $ZodAny | $ZodUnknown | $ZodNever | $ZodVoid | $ZodArray | $ZodObject | $ZodUnion | $ZodIntersection | $ZodTuple | $ZodRecord | $ZodMap | $ZodSet | $ZodLiteral | $ZodEnum | $ZodFunction | $ZodPromise | $ZodLazy | $ZodOptional | $ZodDefault | $ZodPrefault | $ZodTemplateLiteral | $ZodCustom | $ZodTransform | $ZodNonOptional | $ZodReadonly | $ZodNaN | $ZodPipe | $ZodSuccess | $ZodCatch | $ZodFile;
type $ZodStringFormatTypes = $ZodGUID | $ZodUUID | $ZodEmail | $ZodURL | $ZodEmoji | $ZodNanoID | $ZodCUID | $ZodCUID2 | $ZodULID | $ZodXID | $ZodKSUID | $ZodISODateTime | $ZodISODate | $ZodISOTime | $ZodISODuration | $ZodIPv4 | $ZodIPv6 | $ZodMAC | $ZodCIDRv4 | $ZodCIDRv6 | $ZodBase64 | $ZodBase64URL | $ZodE164 | $ZodJWT | $ZodCustomStringFormat<"hex"> | $ZodCustomStringFormat<HashFormat> | $ZodCustomStringFormat<"hostname">;
//#endregion
//#region node_modules/zod/v4/core/checks.d.cts
interface $ZodCheckDef {
  check: string;
  error?: $ZodErrorMap<never> | undefined;
  /** If true, no later checks will be executed if this check fails. Default `false`. */
  abort?: boolean | undefined;
  /** If provided, the check runs only when this returns `true`. By default, it is skipped if prior parsing produced aborting issues. */
  when?: ((payload: ParsePayload) => boolean) | undefined;
}
interface $ZodCheckInternals<T> {
  def: $ZodCheckDef;
  /** The set of issues this check might throw. */
  issc?: $ZodIssueBase;
  check(payload: ParsePayload<T>): MaybeAsync<void>;
  onattach: ((schema: $ZodType) => void)[];
}
interface $ZodCheck<in T = never> {
  _zod: $ZodCheckInternals<T>;
}
declare const $ZodCheck: $constructor<$ZodCheck<any>>;
interface $ZodCheckLessThanDef extends $ZodCheckDef {
  check: "less_than";
  value: Numeric;
  inclusive: boolean;
}
interface $ZodCheckLessThanInternals<T extends Numeric = Numeric> extends $ZodCheckInternals<T> {
  def: $ZodCheckLessThanDef;
  issc: $ZodIssueTooBig<T>;
}
interface $ZodCheckLessThan<T extends Numeric = Numeric> extends $ZodCheck<T> {
  _zod: $ZodCheckLessThanInternals<T>;
}
declare const $ZodCheckLessThan: $constructor<$ZodCheckLessThan>;
interface $ZodCheckGreaterThanDef extends $ZodCheckDef {
  check: "greater_than";
  value: Numeric;
  inclusive: boolean;
}
interface $ZodCheckGreaterThanInternals<T extends Numeric = Numeric> extends $ZodCheckInternals<T> {
  def: $ZodCheckGreaterThanDef;
  issc: $ZodIssueTooSmall<T>;
}
interface $ZodCheckGreaterThan<T extends Numeric = Numeric> extends $ZodCheck<T> {
  _zod: $ZodCheckGreaterThanInternals<T>;
}
declare const $ZodCheckGreaterThan: $constructor<$ZodCheckGreaterThan>;
interface $ZodCheckMultipleOfDef<T extends number | bigint = number | bigint> extends $ZodCheckDef {
  check: "multiple_of";
  value: T;
}
interface $ZodCheckMultipleOfInternals<T extends number | bigint = number | bigint> extends $ZodCheckInternals<T> {
  def: $ZodCheckMultipleOfDef<T>;
  issc: $ZodIssueNotMultipleOf;
}
interface $ZodCheckMultipleOf<T extends number | bigint = number | bigint> extends $ZodCheck<T> {
  _zod: $ZodCheckMultipleOfInternals<T>;
}
declare const $ZodCheckMultipleOf: $constructor<$ZodCheckMultipleOf<number | bigint>>;
type $ZodNumberFormats = "int32" | "uint32" | "float32" | "float64" | "safeint";
interface $ZodCheckNumberFormatDef extends $ZodCheckDef {
  check: "number_format";
  format: $ZodNumberFormats;
}
interface $ZodCheckNumberFormatInternals extends $ZodCheckInternals<number> {
  def: $ZodCheckNumberFormatDef;
  issc: $ZodIssueInvalidType | $ZodIssueTooBig<"number"> | $ZodIssueTooSmall<"number">;
}
interface $ZodCheckNumberFormat extends $ZodCheck<number> {
  _zod: $ZodCheckNumberFormatInternals;
}
declare const $ZodCheckNumberFormat: $constructor<$ZodCheckNumberFormat>;
type $ZodBigIntFormats = "int64" | "uint64";
interface $ZodCheckBigIntFormatDef extends $ZodCheckDef {
  check: "bigint_format";
  format: $ZodBigIntFormats | undefined;
}
interface $ZodCheckBigIntFormatInternals extends $ZodCheckInternals<bigint> {
  def: $ZodCheckBigIntFormatDef;
  issc: $ZodIssueTooBig<"bigint"> | $ZodIssueTooSmall<"bigint">;
}
interface $ZodCheckBigIntFormat extends $ZodCheck<bigint> {
  _zod: $ZodCheckBigIntFormatInternals;
}
declare const $ZodCheckBigIntFormat: $constructor<$ZodCheckBigIntFormat>;
interface $ZodCheckMaxSizeDef extends $ZodCheckDef {
  check: "max_size";
  maximum: number;
}
interface $ZodCheckMaxSizeInternals<T extends HasSize = HasSize> extends $ZodCheckInternals<T> {
  def: $ZodCheckMaxSizeDef;
  issc: $ZodIssueTooBig<T>;
}
interface $ZodCheckMaxSize<T extends HasSize = HasSize> extends $ZodCheck<T> {
  _zod: $ZodCheckMaxSizeInternals<T>;
}
declare const $ZodCheckMaxSize: $constructor<$ZodCheckMaxSize>;
interface $ZodCheckMinSizeDef extends $ZodCheckDef {
  check: "min_size";
  minimum: number;
}
interface $ZodCheckMinSizeInternals<T extends HasSize = HasSize> extends $ZodCheckInternals<T> {
  def: $ZodCheckMinSizeDef;
  issc: $ZodIssueTooSmall<T>;
}
interface $ZodCheckMinSize<T extends HasSize = HasSize> extends $ZodCheck<T> {
  _zod: $ZodCheckMinSizeInternals<T>;
}
declare const $ZodCheckMinSize: $constructor<$ZodCheckMinSize>;
interface $ZodCheckSizeEqualsDef extends $ZodCheckDef {
  check: "size_equals";
  size: number;
}
interface $ZodCheckSizeEqualsInternals<T extends HasSize = HasSize> extends $ZodCheckInternals<T> {
  def: $ZodCheckSizeEqualsDef;
  issc: $ZodIssueTooBig<T> | $ZodIssueTooSmall<T>;
}
interface $ZodCheckSizeEquals<T extends HasSize = HasSize> extends $ZodCheck<T> {
  _zod: $ZodCheckSizeEqualsInternals<T>;
}
declare const $ZodCheckSizeEquals: $constructor<$ZodCheckSizeEquals>;
interface $ZodCheckMaxLengthDef extends $ZodCheckDef {
  check: "max_length";
  maximum: number;
}
interface $ZodCheckMaxLengthInternals<T extends HasLength = HasLength> extends $ZodCheckInternals<T> {
  def: $ZodCheckMaxLengthDef;
  issc: $ZodIssueTooBig<T>;
}
interface $ZodCheckMaxLength<T extends HasLength = HasLength> extends $ZodCheck<T> {
  _zod: $ZodCheckMaxLengthInternals<T>;
}
declare const $ZodCheckMaxLength: $constructor<$ZodCheckMaxLength>;
interface $ZodCheckMinLengthDef extends $ZodCheckDef {
  check: "min_length";
  minimum: number;
}
interface $ZodCheckMinLengthInternals<T extends HasLength = HasLength> extends $ZodCheckInternals<T> {
  def: $ZodCheckMinLengthDef;
  issc: $ZodIssueTooSmall<T>;
}
interface $ZodCheckMinLength<T extends HasLength = HasLength> extends $ZodCheck<T> {
  _zod: $ZodCheckMinLengthInternals<T>;
}
declare const $ZodCheckMinLength: $constructor<$ZodCheckMinLength>;
interface $ZodCheckLengthEqualsDef extends $ZodCheckDef {
  check: "length_equals";
  length: number;
}
interface $ZodCheckLengthEqualsInternals<T extends HasLength = HasLength> extends $ZodCheckInternals<T> {
  def: $ZodCheckLengthEqualsDef;
  issc: $ZodIssueTooBig<T> | $ZodIssueTooSmall<T>;
}
interface $ZodCheckLengthEquals<T extends HasLength = HasLength> extends $ZodCheck<T> {
  _zod: $ZodCheckLengthEqualsInternals<T>;
}
declare const $ZodCheckLengthEquals: $constructor<$ZodCheckLengthEquals>;
type $ZodStringFormats = "email" | "url" | "emoji" | "uuid" | "guid" | "nanoid" | "cuid" | "cuid2" | "ulid" | "xid" | "ksuid" | "datetime" | "date" | "time" | "duration" | "ipv4" | "ipv6" | "cidrv4" | "cidrv6" | "base64" | "base64url" | "json_string" | "e164" | "lowercase" | "uppercase" | "regex" | "jwt" | "starts_with" | "ends_with" | "includes";
interface $ZodCheckStringFormatDef<Format extends string = string> extends $ZodCheckDef {
  check: "string_format";
  format: Format;
  pattern?: RegExp | undefined;
}
interface $ZodCheckStringFormatInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckStringFormatDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckStringFormat extends $ZodCheck<string> {
  _zod: $ZodCheckStringFormatInternals;
}
declare const $ZodCheckStringFormat: $constructor<$ZodCheckStringFormat>;
interface $ZodCheckRegexDef extends $ZodCheckStringFormatDef {
  format: "regex";
  pattern: RegExp;
}
interface $ZodCheckRegexInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckRegexDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckRegex extends $ZodCheck<string> {
  _zod: $ZodCheckRegexInternals;
}
declare const $ZodCheckRegex: $constructor<$ZodCheckRegex>;
interface $ZodCheckLowerCaseDef extends $ZodCheckStringFormatDef<"lowercase"> {}
interface $ZodCheckLowerCaseInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckLowerCaseDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckLowerCase extends $ZodCheck<string> {
  _zod: $ZodCheckLowerCaseInternals;
}
declare const $ZodCheckLowerCase: $constructor<$ZodCheckLowerCase>;
interface $ZodCheckUpperCaseDef extends $ZodCheckStringFormatDef<"uppercase"> {}
interface $ZodCheckUpperCaseInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckUpperCaseDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckUpperCase extends $ZodCheck<string> {
  _zod: $ZodCheckUpperCaseInternals;
}
declare const $ZodCheckUpperCase: $constructor<$ZodCheckUpperCase>;
interface $ZodCheckIncludesDef extends $ZodCheckStringFormatDef<"includes"> {
  includes: string;
  position?: number | undefined;
}
interface $ZodCheckIncludesInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckIncludesDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckIncludes extends $ZodCheck<string> {
  _zod: $ZodCheckIncludesInternals;
}
declare const $ZodCheckIncludes: $constructor<$ZodCheckIncludes>;
interface $ZodCheckStartsWithDef extends $ZodCheckStringFormatDef<"starts_with"> {
  prefix: string;
}
interface $ZodCheckStartsWithInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckStartsWithDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckStartsWith extends $ZodCheck<string> {
  _zod: $ZodCheckStartsWithInternals;
}
declare const $ZodCheckStartsWith: $constructor<$ZodCheckStartsWith>;
interface $ZodCheckEndsWithDef extends $ZodCheckStringFormatDef<"ends_with"> {
  suffix: string;
}
interface $ZodCheckEndsWithInternals extends $ZodCheckInternals<string> {
  def: $ZodCheckEndsWithDef;
  issc: $ZodIssueInvalidStringFormat;
}
interface $ZodCheckEndsWith extends $ZodCheckInternals<string> {
  _zod: $ZodCheckEndsWithInternals;
}
declare const $ZodCheckEndsWith: $constructor<$ZodCheckEndsWith>;
interface $ZodCheckPropertyDef extends $ZodCheckDef {
  check: "property";
  property: string;
  schema: $ZodType;
}
interface $ZodCheckPropertyInternals<T extends object = object> extends $ZodCheckInternals<T> {
  def: $ZodCheckPropertyDef;
  issc: $ZodIssue;
}
interface $ZodCheckProperty<T extends object = object> extends $ZodCheck<T> {
  _zod: $ZodCheckPropertyInternals<T>;
}
declare const $ZodCheckProperty: $constructor<$ZodCheckProperty>;
interface $ZodCheckMimeTypeDef extends $ZodCheckDef {
  check: "mime_type";
  mime: MimeTypes[];
}
interface $ZodCheckMimeTypeInternals<T extends File = File> extends $ZodCheckInternals<T> {
  def: $ZodCheckMimeTypeDef;
  issc: $ZodIssueInvalidValue;
}
interface $ZodCheckMimeType<T extends File = File> extends $ZodCheck<T> {
  _zod: $ZodCheckMimeTypeInternals<T>;
}
declare const $ZodCheckMimeType: $constructor<$ZodCheckMimeType>;
interface $ZodCheckOverwriteDef<T = unknown> extends $ZodCheckDef {
  check: "overwrite";
  tx(value: T): T;
}
interface $ZodCheckOverwriteInternals<T = unknown> extends $ZodCheckInternals<T> {
  def: $ZodCheckOverwriteDef<T>;
  issc: never;
}
interface $ZodCheckOverwrite<T = unknown> extends $ZodCheck<T> {
  _zod: $ZodCheckOverwriteInternals<T>;
}
declare const $ZodCheckOverwrite: $constructor<$ZodCheckOverwrite>;
type $ZodChecks = $ZodCheckLessThan | $ZodCheckGreaterThan | $ZodCheckMultipleOf | $ZodCheckNumberFormat | $ZodCheckBigIntFormat | $ZodCheckMaxSize | $ZodCheckMinSize | $ZodCheckSizeEquals | $ZodCheckMaxLength | $ZodCheckMinLength | $ZodCheckLengthEquals | $ZodCheckStringFormat | $ZodCheckProperty | $ZodCheckMimeType | $ZodCheckOverwrite;
type $ZodStringFormatChecks = $ZodCheckRegex | $ZodCheckLowerCase | $ZodCheckUpperCase | $ZodCheckIncludes | $ZodCheckStartsWith | $ZodCheckEndsWith | $ZodStringFormatTypes;
//#endregion
//#region node_modules/zod/v4/core/errors.d.cts
interface $ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}
type $ZodInvalidTypeExpected = "string" | "number" | "int" | "boolean" | "bigint" | "symbol" | "undefined" | "null" | "never" | "void" | "date" | "array" | "object" | "tuple" | "record" | "map" | "set" | "file" | "nonoptional" | "nan" | "function" | (string & {});
interface $ZodIssueInvalidType<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_type";
  readonly expected: $ZodInvalidTypeExpected;
  readonly input?: Input;
}
interface $ZodIssueTooBig<Input = unknown> extends $ZodIssueBase {
  readonly code: "too_big";
  readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
  readonly maximum: number | bigint;
  readonly inclusive?: boolean;
  readonly exact?: boolean;
  readonly input?: Input;
}
interface $ZodIssueTooSmall<Input = unknown> extends $ZodIssueBase {
  readonly code: "too_small";
  readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
  readonly minimum: number | bigint;
  /** True if the allowable range includes the minimum */
  readonly inclusive?: boolean;
  /** True if the allowed value is fixed (e.g.` z.length(5)`), not a range (`z.minLength(5)`) */
  readonly exact?: boolean;
  readonly input?: Input;
}
interface $ZodIssueInvalidStringFormat extends $ZodIssueBase {
  readonly code: "invalid_format";
  readonly format: $ZodStringFormats | (string & {});
  readonly pattern?: string;
  readonly input?: string;
}
interface $ZodIssueNotMultipleOf<Input extends number | bigint = number | bigint> extends $ZodIssueBase {
  readonly code: "not_multiple_of";
  readonly divisor: number;
  readonly input?: Input;
}
interface $ZodIssueUnrecognizedKeys extends $ZodIssueBase {
  readonly code: "unrecognized_keys";
  readonly keys: string[];
  readonly input?: Record<string, unknown>;
}
interface $ZodIssueInvalidUnionNoMatch extends $ZodIssueBase {
  readonly code: "invalid_union";
  readonly errors: $ZodIssue[][];
  readonly input?: unknown;
  readonly discriminator?: string | undefined;
  readonly options?: Primitive[];
  readonly inclusive?: true;
}
interface $ZodIssueInvalidUnionMultipleMatch extends $ZodIssueBase {
  readonly code: "invalid_union";
  readonly errors: [];
  readonly input?: unknown;
  readonly discriminator?: string | undefined;
  readonly inclusive: false;
}
type $ZodIssueInvalidUnion = $ZodIssueInvalidUnionNoMatch | $ZodIssueInvalidUnionMultipleMatch;
interface $ZodIssueInvalidKey<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_key";
  readonly origin: "map" | "record";
  readonly issues: $ZodIssue[];
  readonly input?: Input;
}
interface $ZodIssueInvalidElement<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_element";
  readonly origin: "map" | "set";
  readonly key: unknown;
  readonly issues: $ZodIssue[];
  readonly input?: Input;
}
interface $ZodIssueInvalidValue<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_value";
  readonly values: Primitive[];
  readonly input?: Input;
}
interface $ZodIssueCustom extends $ZodIssueBase {
  readonly code: "custom";
  readonly params?: Record<string, any> | undefined;
  readonly input?: unknown;
}
interface $ZodIssueStringCommonFormats extends $ZodIssueInvalidStringFormat {
  format: Exclude<$ZodStringFormats, "regex" | "jwt" | "starts_with" | "ends_with" | "includes">;
}
interface $ZodIssueStringInvalidRegex extends $ZodIssueInvalidStringFormat {
  format: "regex";
  pattern: string;
}
interface $ZodIssueStringInvalidJWT extends $ZodIssueInvalidStringFormat {
  format: "jwt";
  algorithm?: string;
}
interface $ZodIssueStringStartsWith extends $ZodIssueInvalidStringFormat {
  format: "starts_with";
  prefix: string;
}
interface $ZodIssueStringEndsWith extends $ZodIssueInvalidStringFormat {
  format: "ends_with";
  suffix: string;
}
interface $ZodIssueStringIncludes extends $ZodIssueInvalidStringFormat {
  format: "includes";
  includes: string;
}
type $ZodStringFormatIssues = $ZodIssueStringCommonFormats | $ZodIssueStringInvalidRegex | $ZodIssueStringInvalidJWT | $ZodIssueStringStartsWith | $ZodIssueStringEndsWith | $ZodIssueStringIncludes;
type $ZodIssue = $ZodIssueInvalidType | $ZodIssueTooBig | $ZodIssueTooSmall | $ZodIssueInvalidStringFormat | $ZodIssueNotMultipleOf | $ZodIssueUnrecognizedKeys | $ZodIssueInvalidUnion | $ZodIssueInvalidKey | $ZodIssueInvalidElement | $ZodIssueInvalidValue | $ZodIssueCustom;
type $ZodIssueCode = $ZodIssue["code"];
type $ZodInternalIssue<T extends $ZodIssueBase = $ZodIssue> = T extends any ? RawIssue$1<T> : never;
type RawIssue$1<T extends $ZodIssueBase> = T extends any ? Flatten<MakePartial<T, "message" | "path"> & {
  /** The input data */readonly input: unknown; /** The schema or check that originated this issue. */
  readonly inst?: $ZodType | $ZodCheck; /** If `true`, Zod will continue executing checks/refinements after this issue. */
  readonly continue?: boolean | undefined;
} & Record<string, unknown>> : never;
type $ZodRawIssue<T extends $ZodIssueBase = $ZodIssue> = $ZodInternalIssue<T>;
interface $ZodErrorMap<T extends $ZodIssueBase = $ZodIssue> {
  (issue: $ZodRawIssue<T>): {
    message: string;
  } | string | undefined | null;
}
interface $ZodError<T = unknown> extends Error {
  type: T;
  issues: $ZodIssue[];
  _zod: {
    output: T;
    def: $ZodIssue[];
  };
  stack?: string;
  name: string;
}
declare const $ZodError: $constructor<$ZodError>;
interface $ZodRealError<T = any> extends $ZodError<T> {}
declare const $ZodRealError: $constructor<$ZodRealError>;
type $ZodFlattenedError<T, U = string> = _FlattenedError<T, U>;
type _FlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: { [P in keyof T]?: U[] };
};
declare function flattenError<T>(error: $ZodError<T>): _FlattenedError<T>;
declare function flattenError<T, U>(error: $ZodError<T>, mapper?: (issue: $ZodIssue) => U): _FlattenedError<T, U>;
type _ZodFormattedError<T, U = string> = T extends [any, ...any[]] ? { [K in keyof T]?: $ZodFormattedError<T[K], U> } : T extends any[] ? {
  [k: number]: $ZodFormattedError<T[number], U>;
} : T extends object ? Flatten<{ [K in keyof T]?: $ZodFormattedError<T[K], U> }> : any;
type $ZodFormattedError<T, U = string> = {
  _errors: U[];
} & Flatten<_ZodFormattedError<T, U>>;
declare function formatError<T>(error: $ZodError<T>): $ZodFormattedError<T>;
declare function formatError<T, U>(error: $ZodError<T>, mapper?: (issue: $ZodIssue) => U): $ZodFormattedError<T, U>;
type $ZodErrorTree<T, U = string> = T extends Primitive ? {
  errors: U[];
} : T extends [any, ...any[]] ? {
  errors: U[];
  items?: { [K in keyof T]?: $ZodErrorTree<T[K], U> };
} : T extends any[] ? {
  errors: U[];
  items?: Array<$ZodErrorTree<T[number], U>>;
} : T extends object ? {
  errors: U[];
  properties?: { [K in keyof T]?: $ZodErrorTree<T[K], U> };
} : {
  errors: U[];
};
declare function treeifyError<T>(error: $ZodError<T>): $ZodErrorTree<T>;
declare function treeifyError<T, U>(error: $ZodError<T>, mapper?: (issue: $ZodIssue) => U): $ZodErrorTree<T, U>;
/** Format a ZodError as a human-readable string in the following form.
 *
 * From
 *
 * ```ts
 * ZodError {
 *   issues: [
 *     {
 *       expected: 'string',
 *       code: 'invalid_type',
 *       path: [ 'username' ],
 *       message: 'Invalid input: expected string'
 *     },
 *     {
 *       expected: 'number',
 *       code: 'invalid_type',
 *       path: [ 'favoriteNumbers', 1 ],
 *       message: 'Invalid input: expected number'
 *     }
 *   ];
 * }
 * ```
 *
 * to
 *
 * ```
 * username
 *   ✖ Expected number, received string at "username
 * favoriteNumbers[0]
 *   ✖ Invalid input: expected number
 * ```
 */
declare function toDotPath(_path: readonly (string | number | symbol | StandardSchemaV1.PathSegment)[]): string;
declare function prettifyError(error: StandardSchemaV1.FailureResult): string;
//#endregion
//#region node_modules/zod/v4/core/core.d.cts
type ZodTrait = {
  _zod: {
    def: any;
    [k: string]: any;
  };
};
interface $constructor<T extends ZodTrait, D = T["_zod"]["def"]> {
  new (def: D): T;
  init(inst: T, def: D): asserts inst is T;
}
/** A special constant with type `never` */
declare const NEVER: never;
declare function $constructor<T extends ZodTrait, D = T["_zod"]["def"]>(name: string, initializer: (inst: T, def: D) => void, params?: {
  Parent?: typeof Class;
}): $constructor<T, D>;
declare const $brand: unique symbol;
type $brand<T extends string | number | symbol = string | number | symbol> = {
  [$brand]: { [k in T]: true };
};
type $ZodBranded<T extends SomeType, Brand extends string | number | symbol, Dir extends "in" | "out" | "inout" = "out"> = T & (Dir extends "inout" ? {
  _zod: {
    input: input<T> & $brand<Brand>;
    output: output<T> & $brand<Brand>;
  };
} : Dir extends "in" ? {
  _zod: {
    input: input<T> & $brand<Brand>;
  };
} : {
  _zod: {
    output: output<T> & $brand<Brand>;
  };
});
type $ZodNarrow<T extends SomeType, Out> = T & {
  _zod: {
    output: Out;
  };
};
declare class $ZodAsyncError extends Error {
  constructor();
}
declare class $ZodEncodeError extends Error {
  constructor(name: string);
}
type input<T> = T extends {
  _zod: {
    input: any;
  };
} ? T["_zod"]["input"] : unknown;
type output<T> = T extends {
  _zod: {
    output: any;
  };
} ? T["_zod"]["output"] : unknown;
interface $ZodConfig {
  /** Custom error map. Overrides `config().localeError`. */
  customError?: $ZodErrorMap | undefined;
  /** Localized error map. Lowest priority. */
  localeError?: $ZodErrorMap | undefined;
  /** Disable JIT schema compilation. Useful in environments that disallow `eval`. */
  jitless?: boolean | undefined;
}
declare const globalConfig: $ZodConfig;
declare function config(newConfig?: Partial<$ZodConfig>): $ZodConfig;
//#endregion
//#region node_modules/zod/v4/core/parse.d.cts
type $ZodErrorClass = {
  new (issues: $ZodIssue[]): $ZodError;
};
type $Parse = <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>, _params?: {
  callee?: AnyFunc;
  Err?: $ZodErrorClass;
}) => output<T>;
declare const _parse: (_Err: $ZodErrorClass) => $Parse;
declare const parse$1: $Parse;
type $ParseAsync = <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>, _params?: {
  callee?: AnyFunc;
  Err?: $ZodErrorClass;
}) => Promise<output<T>>;
declare const _parseAsync: (_Err: $ZodErrorClass) => $ParseAsync;
declare const parseAsync$1: $ParseAsync;
type $SafeParse = <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>) => SafeParseResult<output<T>>;
declare const _safeParse: (_Err: $ZodErrorClass) => $SafeParse;
declare const safeParse$1: $SafeParse;
type $SafeParseAsync = <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>) => Promise<SafeParseResult<output<T>>>;
declare const _safeParseAsync: (_Err: $ZodErrorClass) => $SafeParseAsync;
declare const safeParseAsync$1: $SafeParseAsync;
type $Encode = <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => input<T>;
declare const _encode: (_Err: $ZodErrorClass) => $Encode;
declare const encode$1: $Encode;
type $Decode = <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => output<T>;
declare const _decode: (_Err: $ZodErrorClass) => $Decode;
declare const decode$1: $Decode;
type $EncodeAsync = <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<input<T>>;
declare const _encodeAsync: (_Err: $ZodErrorClass) => $EncodeAsync;
declare const encodeAsync$1: $EncodeAsync;
type $DecodeAsync = <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<output<T>>;
declare const _decodeAsync: (_Err: $ZodErrorClass) => $DecodeAsync;
declare const decodeAsync$1: $DecodeAsync;
type $SafeEncode = <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => SafeParseResult<input<T>>;
declare const _safeEncode: (_Err: $ZodErrorClass) => $SafeEncode;
declare const safeEncode$1: $SafeEncode;
type $SafeDecode = <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => SafeParseResult<output<T>>;
declare const _safeDecode: (_Err: $ZodErrorClass) => $SafeDecode;
declare const safeDecode$1: $SafeDecode;
type $SafeEncodeAsync = <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<SafeParseResult<input<T>>>;
declare const _safeEncodeAsync: (_Err: $ZodErrorClass) => $SafeEncodeAsync;
declare const safeEncodeAsync$1: $SafeEncodeAsync;
type $SafeDecodeAsync = <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<SafeParseResult<output<T>>>;
declare const _safeDecodeAsync: (_Err: $ZodErrorClass) => $SafeDecodeAsync;
declare const safeDecodeAsync$1: $SafeDecodeAsync;
//#endregion
//#region node_modules/zod/v4/core/api.d.cts
type Params<T extends $ZodType | $ZodCheck, IssueTypes extends $ZodIssueBase, OmitKeys extends keyof T["_zod"]["def"] = never> = Flatten<Partial<EmptyToNever<Omit<T["_zod"]["def"], OmitKeys> & ([IssueTypes] extends [never] ? {} : {
  error?: string | $ZodErrorMap<IssueTypes> | undefined; /** @deprecated This parameter is deprecated. Use `error` instead. */
  message?: string | undefined;
})>>>;
type TypeParams<T extends $ZodType = $ZodType & {
  _isst: never;
}, AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "checks" | "error"> = never> = Params<T, NonNullable<T["_zod"]["isst"]>, "type" | "checks" | "error" | AlsoOmit>;
type CheckParams<T extends $ZodCheck = $ZodCheck, // & { _issc: never },
AlsoOmit extends Exclude<keyof T["_zod"]["def"], "check" | "error"> = never> = Params<T, NonNullable<T["_zod"]["issc"]>, "check" | "error" | AlsoOmit>;
type StringFormatParams<T extends $ZodStringFormat = $ZodStringFormat, AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "coerce" | "checks" | "error" | "check" | "format"> = never> = Params<T, NonNullable<T["_zod"]["isst"] | T["_zod"]["issc"]>, "type" | "coerce" | "checks" | "error" | "check" | "format" | AlsoOmit>;
type CheckStringFormatParams<T extends $ZodStringFormat = $ZodStringFormat, AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "coerce" | "checks" | "error" | "check" | "format"> = never> = Params<T, NonNullable<T["_zod"]["issc"]>, "type" | "coerce" | "checks" | "error" | "check" | "format" | AlsoOmit>;
type CheckTypeParams<T extends $ZodType & $ZodCheck = $ZodType & $ZodCheck, AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "checks" | "error" | "check"> = never> = Params<T, NonNullable<T["_zod"]["isst"] | T["_zod"]["issc"]>, "type" | "checks" | "error" | "check" | AlsoOmit>;
type $ZodStringParams = TypeParams<$ZodString<string>, "coerce">;
declare function _string<T extends $ZodString>(Class: SchemaClass<T>, params?: string | $ZodStringParams): T;
declare function _coercedString<T extends $ZodString>(Class: SchemaClass<T>, params?: string | $ZodStringParams): T;
type $ZodStringFormatParams = CheckTypeParams<$ZodStringFormat, "format" | "coerce" | "when" | "pattern">;
type $ZodCheckStringFormatParams = CheckParams<$ZodCheckStringFormat, "format">;
type $ZodEmailParams = StringFormatParams<$ZodEmail, "when">;
type $ZodCheckEmailParams = CheckStringFormatParams<$ZodEmail, "when">;
declare function _email<T extends $ZodEmail>(Class: SchemaClass<T>, params?: string | $ZodEmailParams | $ZodCheckEmailParams): T;
type $ZodGUIDParams = StringFormatParams<$ZodGUID, "pattern" | "when">;
type $ZodCheckGUIDParams = CheckStringFormatParams<$ZodGUID, "pattern" | "when">;
declare function _guid<T extends $ZodGUID>(Class: SchemaClass<T>, params?: string | $ZodGUIDParams | $ZodCheckGUIDParams): T;
type $ZodUUIDParams = StringFormatParams<$ZodUUID, "pattern" | "when">;
type $ZodCheckUUIDParams = CheckStringFormatParams<$ZodUUID, "pattern" | "when">;
declare function _uuid<T extends $ZodUUID>(Class: SchemaClass<T>, params?: string | $ZodUUIDParams | $ZodCheckUUIDParams): T;
type $ZodUUIDv4Params = StringFormatParams<$ZodUUID, "pattern" | "when">;
type $ZodCheckUUIDv4Params = CheckStringFormatParams<$ZodUUID, "pattern" | "when">;
declare function _uuidv4<T extends $ZodUUID>(Class: SchemaClass<T>, params?: string | $ZodUUIDv4Params | $ZodCheckUUIDv4Params): T;
type $ZodUUIDv6Params = StringFormatParams<$ZodUUID, "pattern" | "when">;
type $ZodCheckUUIDv6Params = CheckStringFormatParams<$ZodUUID, "pattern" | "when">;
declare function _uuidv6<T extends $ZodUUID>(Class: SchemaClass<T>, params?: string | $ZodUUIDv6Params | $ZodCheckUUIDv6Params): T;
type $ZodUUIDv7Params = StringFormatParams<$ZodUUID, "pattern" | "when">;
type $ZodCheckUUIDv7Params = CheckStringFormatParams<$ZodUUID, "pattern" | "when">;
declare function _uuidv7<T extends $ZodUUID>(Class: SchemaClass<T>, params?: string | $ZodUUIDv7Params | $ZodCheckUUIDv7Params): T;
type $ZodURLParams = StringFormatParams<$ZodURL, "when">;
type $ZodCheckURLParams = CheckStringFormatParams<$ZodURL, "when">;
declare function _url<T extends $ZodURL>(Class: SchemaClass<T>, params?: string | $ZodURLParams | $ZodCheckURLParams): T;
type $ZodEmojiParams = StringFormatParams<$ZodEmoji, "when">;
type $ZodCheckEmojiParams = CheckStringFormatParams<$ZodEmoji, "when">;
declare function _emoji<T extends $ZodEmoji>(Class: SchemaClass<T>, params?: string | $ZodEmojiParams | $ZodCheckEmojiParams): T;
type $ZodNanoIDParams = StringFormatParams<$ZodNanoID, "when">;
type $ZodCheckNanoIDParams = CheckStringFormatParams<$ZodNanoID, "when">;
declare function _nanoid<T extends $ZodNanoID>(Class: SchemaClass<T>, params?: string | $ZodNanoIDParams | $ZodCheckNanoIDParams): T;
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link _cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
type $ZodCUIDParams = StringFormatParams<$ZodCUID, "when">;
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link _cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
type $ZodCheckCUIDParams = CheckStringFormatParams<$ZodCUID, "when">;
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link _cuid2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
declare function _cuid<T extends $ZodCUID>(Class: SchemaClass<T>, params?: string | $ZodCUIDParams | $ZodCheckCUIDParams): T;
type $ZodCUID2Params = StringFormatParams<$ZodCUID2, "when">;
type $ZodCheckCUID2Params = CheckStringFormatParams<$ZodCUID2, "when">;
declare function _cuid2<T extends $ZodCUID2>(Class: SchemaClass<T>, params?: string | $ZodCUID2Params | $ZodCheckCUID2Params): T;
type $ZodULIDParams = StringFormatParams<$ZodULID, "when">;
type $ZodCheckULIDParams = CheckStringFormatParams<$ZodULID, "when">;
declare function _ulid<T extends $ZodULID>(Class: SchemaClass<T>, params?: string | $ZodULIDParams | $ZodCheckULIDParams): T;
type $ZodXIDParams = StringFormatParams<$ZodXID, "when">;
type $ZodCheckXIDParams = CheckStringFormatParams<$ZodXID, "when">;
declare function _xid<T extends $ZodXID>(Class: SchemaClass<T>, params?: string | $ZodXIDParams | $ZodCheckXIDParams): T;
type $ZodKSUIDParams = StringFormatParams<$ZodKSUID, "when">;
type $ZodCheckKSUIDParams = CheckStringFormatParams<$ZodKSUID, "when">;
declare function _ksuid<T extends $ZodKSUID>(Class: SchemaClass<T>, params?: string | $ZodKSUIDParams | $ZodCheckKSUIDParams): T;
type $ZodIPv4Params = StringFormatParams<$ZodIPv4, "pattern" | "when" | "version">;
type $ZodCheckIPv4Params = CheckStringFormatParams<$ZodIPv4, "pattern" | "when" | "version">;
declare function _ipv4<T extends $ZodIPv4>(Class: SchemaClass<T>, params?: string | $ZodIPv4Params | $ZodCheckIPv4Params): T;
type $ZodIPv6Params = StringFormatParams<$ZodIPv6, "pattern" | "when" | "version">;
type $ZodCheckIPv6Params = CheckStringFormatParams<$ZodIPv6, "pattern" | "when" | "version">;
declare function _ipv6<T extends $ZodIPv6>(Class: SchemaClass<T>, params?: string | $ZodIPv6Params | $ZodCheckIPv6Params): T;
type $ZodMACParams = StringFormatParams<$ZodMAC, "pattern" | "when">;
type $ZodCheckMACParams = CheckStringFormatParams<$ZodMAC, "pattern" | "when">;
declare function _mac<T extends $ZodMAC>(Class: SchemaClass<T>, params?: string | $ZodMACParams | $ZodCheckMACParams): T;
type $ZodCIDRv4Params = StringFormatParams<$ZodCIDRv4, "pattern" | "when">;
type $ZodCheckCIDRv4Params = CheckStringFormatParams<$ZodCIDRv4, "pattern" | "when">;
declare function _cidrv4<T extends $ZodCIDRv4>(Class: SchemaClass<T>, params?: string | $ZodCIDRv4Params | $ZodCheckCIDRv4Params): T;
type $ZodCIDRv6Params = StringFormatParams<$ZodCIDRv6, "pattern" | "when">;
type $ZodCheckCIDRv6Params = CheckStringFormatParams<$ZodCIDRv6, "pattern" | "when">;
declare function _cidrv6<T extends $ZodCIDRv6>(Class: SchemaClass<T>, params?: string | $ZodCIDRv6Params | $ZodCheckCIDRv6Params): T;
type $ZodBase64Params = StringFormatParams<$ZodBase64, "pattern" | "when">;
type $ZodCheckBase64Params = CheckStringFormatParams<$ZodBase64, "pattern" | "when">;
declare function _base64<T extends $ZodBase64>(Class: SchemaClass<T>, params?: string | $ZodBase64Params | $ZodCheckBase64Params): T;
type $ZodBase64URLParams = StringFormatParams<$ZodBase64URL, "pattern" | "when">;
type $ZodCheckBase64URLParams = CheckStringFormatParams<$ZodBase64URL, "pattern" | "when">;
declare function _base64url<T extends $ZodBase64URL>(Class: SchemaClass<T>, params?: string | $ZodBase64URLParams | $ZodCheckBase64URLParams): T;
type $ZodE164Params = StringFormatParams<$ZodE164, "when">;
type $ZodCheckE164Params = CheckStringFormatParams<$ZodE164, "when">;
declare function _e164<T extends $ZodE164>(Class: SchemaClass<T>, params?: string | $ZodE164Params | $ZodCheckE164Params): T;
type $ZodJWTParams = StringFormatParams<$ZodJWT, "pattern" | "when">;
type $ZodCheckJWTParams = CheckStringFormatParams<$ZodJWT, "pattern" | "when">;
declare function _jwt<T extends $ZodJWT>(Class: SchemaClass<T>, params?: string | $ZodJWTParams | $ZodCheckJWTParams): T;
declare const TimePrecision: {
  readonly Any: null;
  readonly Minute: -1;
  readonly Second: 0;
  readonly Millisecond: 3;
  readonly Microsecond: 6;
};
type $ZodISODateTimeParams = StringFormatParams<$ZodISODateTime, "pattern" | "when">;
type $ZodCheckISODateTimeParams = CheckStringFormatParams<$ZodISODateTime, "pattern" | "when">;
declare function _isoDateTime<T extends $ZodISODateTime>(Class: SchemaClass<T>, params?: string | $ZodISODateTimeParams | $ZodCheckISODateTimeParams): T;
type $ZodISODateParams = StringFormatParams<$ZodISODate, "pattern" | "when">;
type $ZodCheckISODateParams = CheckStringFormatParams<$ZodISODate, "pattern" | "when">;
declare function _isoDate<T extends $ZodISODate>(Class: SchemaClass<T>, params?: string | $ZodISODateParams | $ZodCheckISODateParams): T;
type $ZodISOTimeParams = StringFormatParams<$ZodISOTime, "pattern" | "when">;
type $ZodCheckISOTimeParams = CheckStringFormatParams<$ZodISOTime, "pattern" | "when">;
declare function _isoTime<T extends $ZodISOTime>(Class: SchemaClass<T>, params?: string | $ZodISOTimeParams | $ZodCheckISOTimeParams): T;
type $ZodISODurationParams = StringFormatParams<$ZodISODuration, "when">;
type $ZodCheckISODurationParams = CheckStringFormatParams<$ZodISODuration, "when">;
declare function _isoDuration<T extends $ZodISODuration>(Class: SchemaClass<T>, params?: string | $ZodISODurationParams | $ZodCheckISODurationParams): T;
type $ZodNumberParams = TypeParams<$ZodNumber<number>, "coerce">;
type $ZodNumberFormatParams = CheckTypeParams<$ZodNumberFormat, "format" | "coerce">;
type $ZodCheckNumberFormatParams = CheckParams<$ZodCheckNumberFormat, "format" | "when">;
declare function _number<T extends $ZodNumber>(Class: SchemaClass<T>, params?: string | $ZodNumberParams): T;
declare function _coercedNumber<T extends $ZodNumber>(Class: SchemaClass<T>, params?: string | $ZodNumberParams): T;
declare function _int<T extends $ZodNumberFormat>(Class: SchemaClass<T>, params?: string | $ZodCheckNumberFormatParams): T;
declare function _float32<T extends $ZodNumberFormat>(Class: SchemaClass<T>, params?: string | $ZodCheckNumberFormatParams): T;
declare function _float64<T extends $ZodNumberFormat>(Class: SchemaClass<T>, params?: string | $ZodCheckNumberFormatParams): T;
declare function _int32<T extends $ZodNumberFormat>(Class: SchemaClass<T>, params?: string | $ZodCheckNumberFormatParams): T;
declare function _uint32<T extends $ZodNumberFormat>(Class: SchemaClass<T>, params?: string | $ZodCheckNumberFormatParams): T;
type $ZodBooleanParams = TypeParams<$ZodBoolean<boolean>, "coerce">;
declare function _boolean<T extends $ZodBoolean>(Class: SchemaClass<T>, params?: string | $ZodBooleanParams): T;
declare function _coercedBoolean<T extends $ZodBoolean>(Class: SchemaClass<T>, params?: string | $ZodBooleanParams): T;
type $ZodBigIntParams = TypeParams<$ZodBigInt<bigint>>;
type $ZodBigIntFormatParams = CheckTypeParams<$ZodBigIntFormat, "format" | "coerce">;
type $ZodCheckBigIntFormatParams = CheckParams<$ZodCheckBigIntFormat, "format" | "when">;
declare function _bigint<T extends $ZodBigInt>(Class: SchemaClass<T>, params?: string | $ZodBigIntParams): T;
declare function _coercedBigint<T extends $ZodBigInt>(Class: SchemaClass<T>, params?: string | $ZodBigIntParams): T;
declare function _int64<T extends $ZodBigIntFormat>(Class: SchemaClass<T>, params?: string | $ZodBigIntFormatParams): T;
declare function _uint64<T extends $ZodBigIntFormat>(Class: SchemaClass<T>, params?: string | $ZodBigIntFormatParams): T;
type $ZodSymbolParams = TypeParams<$ZodSymbol>;
declare function _symbol<T extends $ZodSymbol>(Class: SchemaClass<T>, params?: string | $ZodSymbolParams): T;
type $ZodUndefinedParams = TypeParams<$ZodUndefined>;
declare function _undefined$1<T extends $ZodUndefined>(Class: SchemaClass<T>, params?: string | $ZodUndefinedParams): T;
type $ZodNullParams = TypeParams<$ZodNull>;
declare function _null$1<T extends $ZodNull>(Class: SchemaClass<T>, params?: string | $ZodNullParams): T;
type $ZodAnyParams = TypeParams<$ZodAny>;
declare function _any<T extends $ZodAny>(Class: SchemaClass<T>): T;
type $ZodUnknownParams = TypeParams<$ZodUnknown>;
declare function _unknown<T extends $ZodUnknown>(Class: SchemaClass<T>): T;
type $ZodNeverParams = TypeParams<$ZodNever>;
declare function _never<T extends $ZodNever>(Class: SchemaClass<T>, params?: string | $ZodNeverParams): T;
type $ZodVoidParams = TypeParams<$ZodVoid>;
declare function _void$1<T extends $ZodVoid>(Class: SchemaClass<T>, params?: string | $ZodVoidParams): T;
type $ZodDateParams = TypeParams<$ZodDate, "coerce">;
declare function _date<T extends $ZodDate>(Class: SchemaClass<T>, params?: string | $ZodDateParams): T;
declare function _coercedDate<T extends $ZodDate>(Class: SchemaClass<T>, params?: string | $ZodDateParams): T;
type $ZodNaNParams = TypeParams<$ZodNaN>;
declare function _nan<T extends $ZodNaN>(Class: SchemaClass<T>, params?: string | $ZodNaNParams): T;
type $ZodCheckLessThanParams = CheckParams<$ZodCheckLessThan, "inclusive" | "value" | "when">;
declare function _lt(value: Numeric, params?: string | $ZodCheckLessThanParams): $ZodCheckLessThan<Numeric>;
declare function _lte(value: Numeric, params?: string | $ZodCheckLessThanParams): $ZodCheckLessThan<Numeric>;
type $ZodCheckGreaterThanParams = CheckParams<$ZodCheckGreaterThan, "inclusive" | "value" | "when">;
declare function _gt(value: Numeric, params?: string | $ZodCheckGreaterThanParams): $ZodCheckGreaterThan;
declare function _gte(value: Numeric, params?: string | $ZodCheckGreaterThanParams): $ZodCheckGreaterThan;
declare function _positive(params?: string | $ZodCheckGreaterThanParams): $ZodCheckGreaterThan;
declare function _negative(params?: string | $ZodCheckLessThanParams): $ZodCheckLessThan;
declare function _nonpositive(params?: string | $ZodCheckLessThanParams): $ZodCheckLessThan;
declare function _nonnegative(params?: string | $ZodCheckGreaterThanParams): $ZodCheckGreaterThan;
type $ZodCheckMultipleOfParams = CheckParams<$ZodCheckMultipleOf, "value" | "when">;
declare function _multipleOf(value: number | bigint, params?: string | $ZodCheckMultipleOfParams): $ZodCheckMultipleOf;
type $ZodCheckMaxSizeParams = CheckParams<$ZodCheckMaxSize, "maximum" | "when">;
declare function _maxSize(maximum: number, params?: string | $ZodCheckMaxSizeParams): $ZodCheckMaxSize<HasSize>;
type $ZodCheckMinSizeParams = CheckParams<$ZodCheckMinSize, "minimum" | "when">;
declare function _minSize(minimum: number, params?: string | $ZodCheckMinSizeParams): $ZodCheckMinSize<HasSize>;
type $ZodCheckSizeEqualsParams = CheckParams<$ZodCheckSizeEquals, "size" | "when">;
declare function _size(size: number, params?: string | $ZodCheckSizeEqualsParams): $ZodCheckSizeEquals<HasSize>;
type $ZodCheckMaxLengthParams = CheckParams<$ZodCheckMaxLength, "maximum" | "when">;
declare function _maxLength(maximum: number, params?: string | $ZodCheckMaxLengthParams): $ZodCheckMaxLength<HasLength>;
type $ZodCheckMinLengthParams = CheckParams<$ZodCheckMinLength, "minimum" | "when">;
declare function _minLength(minimum: number, params?: string | $ZodCheckMinLengthParams): $ZodCheckMinLength<HasLength>;
type $ZodCheckLengthEqualsParams = CheckParams<$ZodCheckLengthEquals, "length" | "when">;
declare function _length(length: number, params?: string | $ZodCheckLengthEqualsParams): $ZodCheckLengthEquals<HasLength>;
type $ZodCheckRegexParams = CheckParams<$ZodCheckRegex, "format" | "pattern" | "when">;
declare function _regex(pattern: RegExp, params?: string | $ZodCheckRegexParams): $ZodCheckRegex;
type $ZodCheckLowerCaseParams = CheckParams<$ZodCheckLowerCase, "format" | "when">;
declare function _lowercase(params?: string | $ZodCheckLowerCaseParams): $ZodCheckLowerCase;
type $ZodCheckUpperCaseParams = CheckParams<$ZodCheckUpperCase, "format" | "when">;
declare function _uppercase(params?: string | $ZodCheckUpperCaseParams): $ZodCheckUpperCase;
type $ZodCheckIncludesParams = CheckParams<$ZodCheckIncludes, "includes" | "format" | "when" | "pattern">;
declare function _includes(includes: string, params?: string | $ZodCheckIncludesParams): $ZodCheckIncludes;
type $ZodCheckStartsWithParams = CheckParams<$ZodCheckStartsWith, "prefix" | "format" | "when" | "pattern">;
declare function _startsWith(prefix: string, params?: string | $ZodCheckStartsWithParams): $ZodCheckStartsWith;
type $ZodCheckEndsWithParams = CheckParams<$ZodCheckEndsWith, "suffix" | "format" | "pattern" | "when">;
declare function _endsWith(suffix: string, params?: string | $ZodCheckEndsWithParams): $ZodCheckEndsWith;
type $ZodCheckPropertyParams = CheckParams<$ZodCheckProperty, "property" | "schema" | "when">;
declare function _property<K extends string, T extends $ZodType>(property: K, schema: T, params?: string | $ZodCheckPropertyParams): $ZodCheckProperty<{ [k in K]: output<T> }>;
type $ZodCheckMimeTypeParams = CheckParams<$ZodCheckMimeType, "mime" | "when">;
declare function _mime(types: MimeTypes[], params?: string | $ZodCheckMimeTypeParams): $ZodCheckMimeType;
declare function _overwrite<T>(tx: (input: T) => T): $ZodCheckOverwrite<T>;
declare function _normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {})): $ZodCheckOverwrite<string>;
declare function _trim(): $ZodCheckOverwrite<string>;
declare function _toLowerCase(): $ZodCheckOverwrite<string>;
declare function _toUpperCase(): $ZodCheckOverwrite<string>;
declare function _slugify(): $ZodCheckOverwrite<string>;
type $ZodArrayParams = TypeParams<$ZodArray, "element">;
declare function _array<T extends $ZodType>(Class: SchemaClass<$ZodArray>, element: T, params?: string | $ZodArrayParams): $ZodArray<T>;
type $ZodObjectParams = TypeParams<$ZodObject, "shape" | "catchall">;
type $ZodUnionParams = TypeParams<$ZodUnion, "options">;
declare function _union<const T extends readonly $ZodObject[]>(Class: SchemaClass<$ZodUnion>, options: T, params?: string | $ZodUnionParams): $ZodUnion<T>;
type $ZodXorParams = TypeParams<$ZodXor, "options">;
declare function _xor<const T extends readonly $ZodObject[]>(Class: SchemaClass<$ZodXor>, options: T, params?: string | $ZodXorParams): $ZodXor<T>;
interface $ZodTypeDiscriminableInternals<Disc extends string = string> extends $ZodTypeInternals<unknown, { [K in Disc]?: unknown }> {
  propValues: PropValues;
}
interface $ZodTypeDiscriminable<Disc extends string = string> extends $ZodType {
  _zod: $ZodTypeDiscriminableInternals<Disc>;
}
type $ZodDiscriminatedUnionParams = TypeParams<$ZodDiscriminatedUnion, "options" | "discriminator">;
declare function _discriminatedUnion<Types extends [$ZodTypeDiscriminable<Disc>, ...$ZodTypeDiscriminable<Disc>[]], Disc extends string>(Class: SchemaClass<$ZodDiscriminatedUnion>, discriminator: Disc, options: Types, params?: string | $ZodDiscriminatedUnionParams): $ZodDiscriminatedUnion<Types, Disc>;
type $ZodIntersectionParams = TypeParams<$ZodIntersection, "left" | "right">;
declare function _intersection<T extends $ZodObject, U extends $ZodObject>(Class: SchemaClass<$ZodIntersection>, left: T, right: U): $ZodIntersection<T, U>;
type $ZodTupleParams = TypeParams<$ZodTuple, "items" | "rest">;
declare function _tuple<T extends readonly [$ZodType, ...$ZodType[]]>(Class: SchemaClass<$ZodTuple>, items: T, params?: string | $ZodTupleParams): $ZodTuple<T, null>;
declare function _tuple<T extends readonly [$ZodType, ...$ZodType[]], Rest extends $ZodType>(Class: SchemaClass<$ZodTuple>, items: T, rest: Rest, params?: string | $ZodTupleParams): $ZodTuple<T, Rest>;
type $ZodRecordParams = TypeParams<$ZodRecord, "keyType" | "valueType">;
declare function _record<Key extends $ZodRecordKey, Value extends $ZodObject>(Class: SchemaClass<$ZodRecord>, keyType: Key, valueType: Value, params?: string | $ZodRecordParams): $ZodRecord<Key, Value>;
type $ZodMapParams = TypeParams<$ZodMap, "keyType" | "valueType">;
declare function _map<Key extends $ZodObject, Value extends $ZodObject>(Class: SchemaClass<$ZodMap>, keyType: Key, valueType: Value, params?: string | $ZodMapParams): $ZodMap<Key, Value>;
type $ZodSetParams = TypeParams<$ZodSet, "valueType">;
declare function _set<Value extends $ZodObject>(Class: SchemaClass<$ZodSet>, valueType: Value, params?: string | $ZodSetParams): $ZodSet<Value>;
type $ZodEnumParams = TypeParams<$ZodEnum, "entries">;
declare function _enum$1<const T extends string[]>(Class: SchemaClass<$ZodEnum>, values: T, params?: string | $ZodEnumParams): $ZodEnum<ToEnum<T[number]>>;
declare function _enum$1<T extends EnumLike>(Class: SchemaClass<$ZodEnum>, entries: T, params?: string | $ZodEnumParams): $ZodEnum<T>;
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
declare function _nativeEnum<T extends EnumLike>(Class: SchemaClass<$ZodEnum>, entries: T, params?: string | $ZodEnumParams): $ZodEnum<T>;
type $ZodLiteralParams = TypeParams<$ZodLiteral, "values">;
declare function _literal<const T extends Array<Literal>>(Class: SchemaClass<$ZodLiteral>, value: T, params?: string | $ZodLiteralParams): $ZodLiteral<T[number]>;
declare function _literal<const T extends Literal>(Class: SchemaClass<$ZodLiteral>, value: T, params?: string | $ZodLiteralParams): $ZodLiteral<T>;
type $ZodFileParams = TypeParams<$ZodFile>;
declare function _file(Class: SchemaClass<$ZodFile>, params?: string | $ZodFileParams): $ZodFile;
type $ZodTransformParams = TypeParams<$ZodTransform, "transform">;
declare function _transform<I = unknown, O = I>(Class: SchemaClass<$ZodTransform>, fn: (input: I, ctx?: ParsePayload) => O): $ZodTransform<Awaited<O>, I>;
type $ZodOptionalParams = TypeParams<$ZodOptional, "innerType">;
declare function _optional<T extends $ZodObject>(Class: SchemaClass<$ZodOptional>, innerType: T): $ZodOptional<T>;
type $ZodNullableParams = TypeParams<$ZodNullable, "innerType">;
declare function _nullable<T extends $ZodObject>(Class: SchemaClass<$ZodNullable>, innerType: T): $ZodNullable<T>;
type $ZodDefaultParams = TypeParams<$ZodDefault, "innerType" | "defaultValue">;
declare function _default$1<T extends $ZodObject>(Class: SchemaClass<$ZodDefault>, innerType: T, defaultValue: NoUndefined<output<T>> | (() => NoUndefined<output<T>>)): $ZodDefault<T>;
type $ZodNonOptionalParams = TypeParams<$ZodNonOptional, "innerType">;
declare function _nonoptional<T extends $ZodObject>(Class: SchemaClass<$ZodNonOptional>, innerType: T, params?: string | $ZodNonOptionalParams): $ZodNonOptional<T>;
type $ZodSuccessParams = TypeParams<$ZodSuccess, "innerType">;
declare function _success<T extends $ZodObject>(Class: SchemaClass<$ZodSuccess>, innerType: T): $ZodSuccess<T>;
type $ZodCatchParams = TypeParams<$ZodCatch, "innerType" | "catchValue">;
declare function _catch$1<T extends $ZodObject>(Class: SchemaClass<$ZodCatch>, innerType: T, catchValue: output<T> | ((ctx: $ZodCatchCtx) => output<T>)): $ZodCatch<T>;
type $ZodPipeParams = TypeParams<$ZodPipe, "in" | "out">;
declare function _pipe<const A extends $ZodType, B extends $ZodType<unknown, output<A>> = $ZodType<unknown, output<A>>>(Class: SchemaClass<$ZodPipe>, in_: A, out: B | $ZodType<unknown, output<A>>): $ZodPipe<A, B>;
type $ZodReadonlyParams = TypeParams<$ZodReadonly, "innerType">;
declare function _readonly<T extends $ZodObject>(Class: SchemaClass<$ZodReadonly>, innerType: T): $ZodReadonly<T>;
type $ZodTemplateLiteralParams = TypeParams<$ZodTemplateLiteral, "parts">;
declare function _templateLiteral<const Parts extends $ZodTemplateLiteralPart[]>(Class: SchemaClass<$ZodTemplateLiteral>, parts: Parts, params?: string | $ZodTemplateLiteralParams): $ZodTemplateLiteral<$PartsToTemplateLiteral<Parts>>;
type $ZodLazyParams = TypeParams<$ZodLazy, "getter">;
declare function _lazy<T extends $ZodType>(Class: SchemaClass<$ZodLazy>, getter: () => T): $ZodLazy<T>;
type $ZodPromiseParams = TypeParams<$ZodPromise, "innerType">;
declare function _promise<T extends $ZodObject>(Class: SchemaClass<$ZodPromise>, innerType: T): $ZodPromise<T>;
type $ZodCustomParams = CheckTypeParams<$ZodCustom, "fn">;
declare function _custom<O = unknown, I = O>(Class: SchemaClass<$ZodCustom>, fn: (data: O) => unknown, _params: string | $ZodCustomParams | undefined): $ZodCustom<O, I>;
declare function _refine<O = unknown, I = O>(Class: SchemaClass<$ZodCustom>, fn: (data: O) => unknown, _params: string | $ZodCustomParams | undefined): $ZodCustom<O, I>;
type $ZodSuperRefineIssue<T extends $ZodIssueBase = $ZodIssue> = T extends any ? RawIssue<T> : never;
type RawIssue<T extends $ZodIssueBase> = T extends any ? Flatten<MakePartial<T, "message" | "path"> & {
  /** The schema or check that originated this issue. */readonly inst?: $ZodType | $ZodCheck; /** If `true`, Zod will execute subsequent checks/refinements instead of immediately aborting */
  readonly continue?: boolean | undefined;
} & Record<string, unknown>> : never;
interface $RefinementCtx<T = unknown> extends ParsePayload<T> {
  addIssue(arg: string | $ZodSuperRefineIssue): void;
}
interface $ZodSuperRefineParams {
  /** If provided, the refinement runs only when this returns `true`. By default, it is skipped if prior parsing produced aborting issues. */
  when?: ((payload: ParsePayload) => boolean) | undefined;
}
declare function _superRefine<T>(fn: (arg: T, payload: $RefinementCtx<T>) => void | Promise<void>, params?: $ZodSuperRefineParams): $ZodCheck<T>;
declare function _check<O = unknown>(fn: CheckFn<O>, params?: string | $ZodCustomParams): $ZodCheck<O>;
declare function describe$1<T>(description: string): $ZodCheck<T>;
declare function meta$1<T>(metadata: GlobalMeta): $ZodCheck<T>;
interface $ZodStringBoolParams extends TypeParams {
  truthy?: string[];
  falsy?: string[];
  /**
   * Options: `"sensitive"`, `"insensitive"`
   *
   * @default `"insensitive"`
   */
  case?: "sensitive" | "insensitive" | undefined;
}
declare function _stringbool(Classes: {
  Codec?: typeof $ZodCodec;
  Boolean?: typeof $ZodBoolean;
  String?: typeof $ZodString;
}, _params?: string | $ZodStringBoolParams): $ZodCodec<$ZodString, $ZodBoolean>;
declare function _stringFormat<Format extends string>(Class: typeof $ZodCustomStringFormat, format: Format, fnOrRegex: ((arg: string) => MaybeAsync<unknown>) | RegExp, _params?: string | $ZodStringFormatParams): $ZodCustomStringFormat<Format>;
//#endregion
//#region node_modules/zod/v4/classic/errors.d.cts
/** @deprecated Use `z.core.$ZodIssue` from `@zod/core` instead, especially if you are building a library on top of Zod. */
type ZodIssue = $ZodIssue;
/** An Error-like class used to store Zod validation issues.  */
interface ZodError<T = unknown> extends $ZodError<T> {
  /** @deprecated Use the `z.treeifyError(err)` function instead. */
  format(): $ZodFormattedError<T>;
  format<U>(mapper: (issue: $ZodIssue) => U): $ZodFormattedError<T, U>;
  /** @deprecated Use the `z.treeifyError(err)` function instead. */
  flatten(): $ZodFlattenedError<T>;
  flatten<U>(mapper: (issue: $ZodIssue) => U): $ZodFlattenedError<T, U>;
  /** @deprecated Push directly to `.issues` instead. */
  addIssue(issue: $ZodIssue): void;
  /** @deprecated Push directly to `.issues` instead. */
  addIssues(issues: $ZodIssue[]): void;
  /** @deprecated Check `err.issues.length === 0` instead. */
  isEmpty: boolean;
}
declare const ZodError: $constructor<ZodError>;
declare const ZodRealError: $constructor<ZodError>;
/** @deprecated Use `z.core.$ZodRawIssue` instead. */
type IssueData = $ZodRawIssue;
//#endregion
//#region node_modules/zod/v4/classic/parse.d.cts
type ZodSafeParseResult<T> = ZodSafeParseSuccess<T> | ZodSafeParseError<T>;
type ZodSafeParseSuccess<T> = {
  success: true;
  data: T;
  error?: never;
};
type ZodSafeParseError<T> = {
  success: false;
  data?: never;
  error: ZodError<T>;
};
declare const parse: <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>, _params?: {
  callee?: AnyFunc;
  Err?: $ZodErrorClass;
}) => output<T>;
declare const parseAsync: <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>, _params?: {
  callee?: AnyFunc;
  Err?: $ZodErrorClass;
}) => Promise<output<T>>;
declare const safeParse: <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>) => ZodSafeParseResult<output<T>>;
declare const safeParseAsync: <T extends $ZodType>(schema: T, value: unknown, _ctx?: ParseContext<$ZodIssue>) => Promise<ZodSafeParseResult<output<T>>>;
declare const encode: <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => input<T>;
declare const decode: <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => output<T>;
declare const encodeAsync: <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<input<T>>;
declare const decodeAsync: <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<output<T>>;
declare const safeEncode: <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => ZodSafeParseResult<input<T>>;
declare const safeDecode: <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => ZodSafeParseResult<output<T>>;
declare const safeEncodeAsync: <T extends $ZodType>(schema: T, value: output<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<ZodSafeParseResult<input<T>>>;
declare const safeDecodeAsync: <T extends $ZodType>(schema: T, value: input<T>, _ctx?: ParseContext<$ZodIssue>) => Promise<ZodSafeParseResult<output<T>>>;
//#endregion
//#region node_modules/zod/v4/classic/schemas.d.cts
type ZodStandardSchemaWithJSON<T> = StandardSchemaWithJSONProps<input<T>, output<T>>;
interface ZodType<out Output = unknown, out Input = unknown, out Internals extends $ZodTypeInternals<Output, Input> = $ZodTypeInternals<Output, Input>> extends $ZodType<Output, Input, Internals> {
  def: Internals["def"];
  type: Internals["def"]["type"];
  /** @deprecated Use `.def` instead. */
  _def: Internals["def"];
  /** @deprecated Use `z.output<typeof schema>` instead. */
  _output: Internals["output"];
  /** @deprecated Use `z.input<typeof schema>` instead. */
  _input: Internals["input"];
  "~standard": ZodStandardSchemaWithJSON<this>;
  /** Converts this schema to a JSON Schema representation. */
  toJSONSchema(params?: ToJSONSchemaParams): ZodStandardJSONSchemaPayload<this>;
  check(...checks: (CheckFn<output<this>> | $ZodCheck<output<this>>)[]): this;
  with(...checks: (CheckFn<output<this>> | $ZodCheck<output<this>>)[]): this;
  clone(def?: Internals["def"], params?: {
    parent: boolean;
  }): this;
  register<R extends $ZodRegistry>(registry: R, ...meta: this extends R["_schema"] ? undefined extends R["_meta"] ? [$replace<R["_meta"], this>?] : [$replace<R["_meta"], this>] : ["Incompatible schema"]): this;
  brand<T extends PropertyKey = PropertyKey, Dir extends "in" | "out" | "inout" = "out">(value?: T): PropertyKey extends T ? this : $ZodBranded<this, T, Dir>;
  parse(data: unknown, params?: ParseContext<$ZodIssue>): output<this>;
  safeParse(data: unknown, params?: ParseContext<$ZodIssue>): ZodSafeParseResult<output<this>>;
  parseAsync(data: unknown, params?: ParseContext<$ZodIssue>): Promise<output<this>>;
  safeParseAsync(data: unknown, params?: ParseContext<$ZodIssue>): Promise<ZodSafeParseResult<output<this>>>;
  spa: (data: unknown, params?: ParseContext<$ZodIssue>) => Promise<ZodSafeParseResult<output<this>>>;
  encode(data: output<this>, params?: ParseContext<$ZodIssue>): input<this>;
  decode(data: input<this>, params?: ParseContext<$ZodIssue>): output<this>;
  encodeAsync(data: output<this>, params?: ParseContext<$ZodIssue>): Promise<input<this>>;
  decodeAsync(data: input<this>, params?: ParseContext<$ZodIssue>): Promise<output<this>>;
  safeEncode(data: output<this>, params?: ParseContext<$ZodIssue>): ZodSafeParseResult<input<this>>;
  safeDecode(data: input<this>, params?: ParseContext<$ZodIssue>): ZodSafeParseResult<output<this>>;
  safeEncodeAsync(data: output<this>, params?: ParseContext<$ZodIssue>): Promise<ZodSafeParseResult<input<this>>>;
  safeDecodeAsync(data: input<this>, params?: ParseContext<$ZodIssue>): Promise<ZodSafeParseResult<output<this>>>;
  refine<Ch extends (arg: output<this>) => unknown | Promise<unknown>>(check: Ch, params?: string | $ZodCustomParams): Ch extends ((arg: any) => arg is infer R) ? this & ZodType<R, input<this>> : this;
  superRefine(refinement: (arg: output<this>, ctx: $RefinementCtx<output<this>>) => void | Promise<void>, params?: $ZodSuperRefineParams): this;
  overwrite(fn: (x: output<this>) => output<this>): this;
  optional(): ZodOptional<this>;
  exactOptional(): ZodExactOptional<this>;
  nonoptional(params?: string | $ZodNonOptionalParams): ZodNonOptional<this>;
  nullable(): ZodNullable<this>;
  nullish(): ZodOptional<ZodNullable<this>>;
  default(def: NoUndefined<output<this>>): ZodDefault<this>;
  default(def: () => NoUndefined<output<this>>): ZodDefault<this>;
  prefault(def: () => input<this>): ZodPrefault<this>;
  prefault(def: input<this>): ZodPrefault<this>;
  array(): ZodArray<this>;
  or<T extends SomeType>(option: T): ZodUnion<[this, T]>;
  and<T extends SomeType>(incoming: T): ZodIntersection<this, T>;
  transform<NewOut>(transform: (arg: output<this>, ctx: $RefinementCtx<output<this>>) => NewOut | Promise<NewOut>): ZodPipe<this, ZodTransform<Awaited<NewOut>, output<this>>>;
  catch(def: output<this>): ZodCatch<this>;
  catch(def: (ctx: $ZodCatchCtx) => output<this>): ZodCatch<this>;
  pipe<T extends $ZodType<any, output<this>>>(target: T | $ZodType<any, output<this>>): ZodPipe<this, T>;
  readonly(): ZodReadonly<this>;
  /** Returns a new instance that has been registered in `z.globalRegistry` with the specified description */
  describe(description: string): this;
  description?: string;
  /** Returns the metadata associated with this instance in `z.globalRegistry` */
  meta(): $replace<GlobalMeta, this> | undefined;
  /** Returns a new instance that has been registered in `z.globalRegistry` with the specified metadata */
  meta(data: $replace<GlobalMeta, this>): this;
  /** @deprecated Try safe-parsing `undefined` (this is what `isOptional` does internally):
   *
   * ```ts
   * const schema = z.string().optional();
   * const isOptional = schema.safeParse(undefined).success; // true
   * ```
   */
  isOptional(): boolean;
  /**
   * @deprecated Try safe-parsing `null` (this is what `isNullable` does internally):
   *
   * ```ts
   * const schema = z.string().nullable();
   * const isNullable = schema.safeParse(null).success; // true
   * ```
   */
  isNullable(): boolean;
  apply<T>(fn: (schema: this) => T): T;
}
interface _ZodType<out Internals extends $ZodTypeInternals = $ZodTypeInternals> extends ZodType<any, any, Internals> {}
declare const ZodType: $constructor<ZodType>;
interface _ZodString<T extends $ZodStringInternals<unknown> = $ZodStringInternals<unknown>> extends _ZodType<T> {
  format: string | null;
  minLength: number | null;
  maxLength: number | null;
  regex(regex: RegExp, params?: string | $ZodCheckRegexParams): this;
  includes(value: string, params?: string | $ZodCheckIncludesParams): this;
  startsWith(value: string, params?: string | $ZodCheckStartsWithParams): this;
  endsWith(value: string, params?: string | $ZodCheckEndsWithParams): this;
  min(minLength: number, params?: string | $ZodCheckMinLengthParams): this;
  max(maxLength: number, params?: string | $ZodCheckMaxLengthParams): this;
  length(len: number, params?: string | $ZodCheckLengthEqualsParams): this;
  nonempty(params?: string | $ZodCheckMinLengthParams): this;
  lowercase(params?: string | $ZodCheckLowerCaseParams): this;
  uppercase(params?: string | $ZodCheckUpperCaseParams): this;
  trim(): this;
  normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {})): this;
  toLowerCase(): this;
  toUpperCase(): this;
  slugify(): this;
}
/** @internal */
declare const _ZodString: $constructor<_ZodString>;
interface ZodString extends _ZodString<$ZodStringInternals<string>> {
  /** @deprecated Use `z.email()` instead. */
  email(params?: string | $ZodCheckEmailParams): this;
  /** @deprecated Use `z.url()` instead. */
  url(params?: string | $ZodCheckURLParams): this;
  /** @deprecated Use `z.jwt()` instead. */
  jwt(params?: string | $ZodCheckJWTParams): this;
  /** @deprecated Use `z.emoji()` instead. */
  emoji(params?: string | $ZodCheckEmojiParams): this;
  /** @deprecated Use `z.guid()` instead. */
  guid(params?: string | $ZodCheckGUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuid(params?: string | $ZodCheckUUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuidv4(params?: string | $ZodCheckUUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuidv6(params?: string | $ZodCheckUUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuidv7(params?: string | $ZodCheckUUIDParams): this;
  /** @deprecated Use `z.nanoid()` instead. */
  nanoid(params?: string | $ZodCheckNanoIDParams): this;
  /** @deprecated Use `z.guid()` instead. */
  guid(params?: string | $ZodCheckGUIDParams): this;
  /**
   * @deprecated CUID v1 is deprecated by its authors due to information leakage
   * (timestamps embedded in the id). Use `z.cuid2()` instead.
   * See https://github.com/paralleldrive/cuid.
   */
  cuid(params?: string | $ZodCheckCUIDParams): this;
  /** @deprecated Use `z.cuid2()` instead. */
  cuid2(params?: string | $ZodCheckCUID2Params): this;
  /** @deprecated Use `z.ulid()` instead. */
  ulid(params?: string | $ZodCheckULIDParams): this;
  /** @deprecated Use `z.base64()` instead. */
  base64(params?: string | $ZodCheckBase64Params): this;
  /** @deprecated Use `z.base64url()` instead. */
  base64url(params?: string | $ZodCheckBase64URLParams): this;
  /** @deprecated Use `z.xid()` instead. */
  xid(params?: string | $ZodCheckXIDParams): this;
  /** @deprecated Use `z.ksuid()` instead. */
  ksuid(params?: string | $ZodCheckKSUIDParams): this;
  /** @deprecated Use `z.ipv4()` instead. */
  ipv4(params?: string | $ZodCheckIPv4Params): this;
  /** @deprecated Use `z.ipv6()` instead. */
  ipv6(params?: string | $ZodCheckIPv6Params): this;
  /** @deprecated Use `z.cidrv4()` instead. */
  cidrv4(params?: string | $ZodCheckCIDRv4Params): this;
  /** @deprecated Use `z.cidrv6()` instead. */
  cidrv6(params?: string | $ZodCheckCIDRv6Params): this;
  /** @deprecated Use `z.e164()` instead. */
  e164(params?: string | $ZodCheckE164Params): this;
  /** @deprecated Use `z.iso.datetime()` instead. */
  datetime(params?: string | $ZodCheckISODateTimeParams): this;
  /** @deprecated Use `z.iso.date()` instead. */
  date(params?: string | $ZodCheckISODateParams): this;
  /** @deprecated Use `z.iso.time()` instead. */
  time(params?: string | $ZodCheckISOTimeParams): this;
  /** @deprecated Use `z.iso.duration()` instead. */
  duration(params?: string | $ZodCheckISODurationParams): this;
}
declare const ZodString: $constructor<ZodString>;
declare function string(params?: string | $ZodStringParams): ZodString;
declare function string<T extends string>(params?: string | $ZodStringParams): $ZodType<T, T>;
interface ZodStringFormat<Format extends string = string> extends _ZodString<$ZodStringFormatInternals<Format>> {}
declare const ZodStringFormat: $constructor<ZodStringFormat>;
interface ZodEmail extends ZodStringFormat<"email"> {
  _zod: $ZodEmailInternals;
}
declare const ZodEmail: $constructor<ZodEmail>;
declare function email(params?: string | $ZodEmailParams): ZodEmail;
interface ZodGUID extends ZodStringFormat<"guid"> {
  _zod: $ZodGUIDInternals;
}
declare const ZodGUID: $constructor<ZodGUID>;
declare function guid(params?: string | $ZodGUIDParams): ZodGUID;
interface ZodUUID extends ZodStringFormat<"uuid"> {
  _zod: $ZodUUIDInternals;
}
declare const ZodUUID: $constructor<ZodUUID>;
declare function uuid(params?: string | $ZodUUIDParams): ZodUUID;
declare function uuidv4(params?: string | $ZodUUIDv4Params): ZodUUID;
declare function uuidv6(params?: string | $ZodUUIDv6Params): ZodUUID;
declare function uuidv7(params?: string | $ZodUUIDv7Params): ZodUUID;
interface ZodURL extends ZodStringFormat<"url"> {
  _zod: $ZodURLInternals;
}
declare const ZodURL: $constructor<ZodURL>;
declare function url(params?: string | $ZodURLParams): ZodURL;
declare function httpUrl(params?: string | Omit<$ZodURLParams, "protocol" | "hostname">): ZodURL;
interface ZodEmoji extends ZodStringFormat<"emoji"> {
  _zod: $ZodEmojiInternals;
}
declare const ZodEmoji: $constructor<ZodEmoji>;
declare function emoji(params?: string | $ZodEmojiParams): ZodEmoji;
interface ZodNanoID extends ZodStringFormat<"nanoid"> {
  _zod: $ZodNanoIDInternals;
}
declare const ZodNanoID: $constructor<ZodNanoID>;
declare function nanoid(params?: string | $ZodNanoIDParams): ZodNanoID;
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
interface ZodCUID extends ZodStringFormat<"cuid"> {
  _zod: $ZodCUIDInternals;
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
declare const ZodCUID: $constructor<ZodCUID>;
/**
 * Validates a CUID v1 string.
 *
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
 * See https://github.com/paralleldrive/cuid.
 */
declare function cuid(params?: string | $ZodCUIDParams): ZodCUID;
interface ZodCUID2 extends ZodStringFormat<"cuid2"> {
  _zod: $ZodCUID2Internals;
}
declare const ZodCUID2: $constructor<ZodCUID2>;
declare function cuid2(params?: string | $ZodCUID2Params): ZodCUID2;
interface ZodULID extends ZodStringFormat<"ulid"> {
  _zod: $ZodULIDInternals;
}
declare const ZodULID: $constructor<ZodULID>;
declare function ulid(params?: string | $ZodULIDParams): ZodULID;
interface ZodXID extends ZodStringFormat<"xid"> {
  _zod: $ZodXIDInternals;
}
declare const ZodXID: $constructor<ZodXID>;
declare function xid(params?: string | $ZodXIDParams): ZodXID;
interface ZodKSUID extends ZodStringFormat<"ksuid"> {
  _zod: $ZodKSUIDInternals;
}
declare const ZodKSUID: $constructor<ZodKSUID>;
declare function ksuid(params?: string | $ZodKSUIDParams): ZodKSUID;
interface ZodIPv4 extends ZodStringFormat<"ipv4"> {
  _zod: $ZodIPv4Internals;
}
declare const ZodIPv4: $constructor<ZodIPv4>;
declare function ipv4(params?: string | $ZodIPv4Params): ZodIPv4;
interface ZodMAC extends ZodStringFormat<"mac"> {
  _zod: $ZodMACInternals;
}
declare const ZodMAC: $constructor<ZodMAC>;
declare function mac(params?: string | $ZodMACParams): ZodMAC;
interface ZodIPv6 extends ZodStringFormat<"ipv6"> {
  _zod: $ZodIPv6Internals;
}
declare const ZodIPv6: $constructor<ZodIPv6>;
declare function ipv6(params?: string | $ZodIPv6Params): ZodIPv6;
interface ZodCIDRv4 extends ZodStringFormat<"cidrv4"> {
  _zod: $ZodCIDRv4Internals;
}
declare const ZodCIDRv4: $constructor<ZodCIDRv4>;
declare function cidrv4(params?: string | $ZodCIDRv4Params): ZodCIDRv4;
interface ZodCIDRv6 extends ZodStringFormat<"cidrv6"> {
  _zod: $ZodCIDRv6Internals;
}
declare const ZodCIDRv6: $constructor<ZodCIDRv6>;
declare function cidrv6(params?: string | $ZodCIDRv6Params): ZodCIDRv6;
interface ZodBase64 extends ZodStringFormat<"base64"> {
  _zod: $ZodBase64Internals;
}
declare const ZodBase64: $constructor<ZodBase64>;
declare function base64(params?: string | $ZodBase64Params): ZodBase64;
interface ZodBase64URL extends ZodStringFormat<"base64url"> {
  _zod: $ZodBase64URLInternals;
}
declare const ZodBase64URL: $constructor<ZodBase64URL>;
declare function base64url(params?: string | $ZodBase64URLParams): ZodBase64URL;
interface ZodE164 extends ZodStringFormat<"e164"> {
  _zod: $ZodE164Internals;
}
declare const ZodE164: $constructor<ZodE164>;
declare function e164(params?: string | $ZodE164Params): ZodE164;
interface ZodJWT extends ZodStringFormat<"jwt"> {
  _zod: $ZodJWTInternals;
}
declare const ZodJWT: $constructor<ZodJWT>;
declare function jwt(params?: string | $ZodJWTParams): ZodJWT;
interface ZodCustomStringFormat<Format extends string = string> extends ZodStringFormat<Format>, $ZodCustomStringFormat<Format> {
  _zod: $ZodCustomStringFormatInternals<Format>;
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodCustomStringFormat: $constructor<ZodCustomStringFormat>;
declare function stringFormat<Format extends string>(format: Format, fnOrRegex: ((arg: string) => MaybeAsync<unknown>) | RegExp, _params?: string | $ZodStringFormatParams): ZodCustomStringFormat<Format>;
declare function hostname(_params?: string | $ZodStringFormatParams): ZodCustomStringFormat<"hostname">;
declare function hex(_params?: string | $ZodStringFormatParams): ZodCustomStringFormat<"hex">;
declare function hash<Alg extends HashAlgorithm, Enc extends HashEncoding = "hex">(alg: Alg, params?: {
  enc?: Enc;
} & $ZodStringFormatParams): ZodCustomStringFormat<`${Alg}_${Enc}`>;
interface _ZodNumber<Internals extends $ZodNumberInternals = $ZodNumberInternals> extends _ZodType<Internals> {
  gt(value: number, params?: string | $ZodCheckGreaterThanParams): this;
  /** Identical to .min() */
  gte(value: number, params?: string | $ZodCheckGreaterThanParams): this;
  min(value: number, params?: string | $ZodCheckGreaterThanParams): this;
  lt(value: number, params?: string | $ZodCheckLessThanParams): this;
  /** Identical to .max() */
  lte(value: number, params?: string | $ZodCheckLessThanParams): this;
  max(value: number, params?: string | $ZodCheckLessThanParams): this;
  /** Consider `z.int()` instead. This API is considered *legacy*; it will never be removed but a better alternative exists. */
  int(params?: string | $ZodCheckNumberFormatParams): this;
  /** @deprecated This is now identical to `.int()`. Only numbers in the safe integer range are accepted. */
  safe(params?: string | $ZodCheckNumberFormatParams): this;
  positive(params?: string | $ZodCheckGreaterThanParams): this;
  nonnegative(params?: string | $ZodCheckGreaterThanParams): this;
  negative(params?: string | $ZodCheckLessThanParams): this;
  nonpositive(params?: string | $ZodCheckLessThanParams): this;
  multipleOf(value: number, params?: string | $ZodCheckMultipleOfParams): this;
  /** @deprecated Use `.multipleOf()` instead. */
  step(value: number, params?: string | $ZodCheckMultipleOfParams): this;
  /** @deprecated In v4 and later, z.number() does not allow infinite values by default. This is a no-op. */
  finite(params?: unknown): this;
  minValue: number | null;
  maxValue: number | null;
  /** @deprecated Check the `format` property instead.  */
  isInt: boolean;
  /** @deprecated Number schemas no longer accept infinite values, so this always returns `true`. */
  isFinite: boolean;
  format: string | null;
}
interface ZodNumber extends _ZodNumber<$ZodNumberInternals<number>> {}
declare const ZodNumber: $constructor<ZodNumber>;
declare function number(params?: string | $ZodNumberParams): ZodNumber;
interface ZodNumberFormat extends ZodNumber {
  _zod: $ZodNumberFormatInternals;
}
declare const ZodNumberFormat: $constructor<ZodNumberFormat>;
interface ZodInt extends ZodNumberFormat {}
declare function int(params?: string | $ZodCheckNumberFormatParams): ZodInt;
interface ZodFloat32 extends ZodNumberFormat {}
declare function float32(params?: string | $ZodCheckNumberFormatParams): ZodFloat32;
interface ZodFloat64 extends ZodNumberFormat {}
declare function float64(params?: string | $ZodCheckNumberFormatParams): ZodFloat64;
interface ZodInt32 extends ZodNumberFormat {}
declare function int32(params?: string | $ZodCheckNumberFormatParams): ZodInt32;
interface ZodUInt32 extends ZodNumberFormat {}
declare function uint32(params?: string | $ZodCheckNumberFormatParams): ZodUInt32;
interface _ZodBoolean<T extends $ZodBooleanInternals = $ZodBooleanInternals> extends _ZodType<T> {}
interface ZodBoolean extends _ZodBoolean<$ZodBooleanInternals<boolean>> {}
declare const ZodBoolean: $constructor<ZodBoolean>;
declare function boolean(params?: string | $ZodBooleanParams): ZodBoolean;
interface _ZodBigInt<T extends $ZodBigIntInternals = $ZodBigIntInternals> extends _ZodType<T> {
  gte(value: bigint, params?: string | $ZodCheckGreaterThanParams): this;
  /** Alias of `.gte()` */
  min(value: bigint, params?: string | $ZodCheckGreaterThanParams): this;
  gt(value: bigint, params?: string | $ZodCheckGreaterThanParams): this;
  /** Alias of `.lte()` */
  lte(value: bigint, params?: string | $ZodCheckLessThanParams): this;
  max(value: bigint, params?: string | $ZodCheckLessThanParams): this;
  lt(value: bigint, params?: string | $ZodCheckLessThanParams): this;
  positive(params?: string | $ZodCheckGreaterThanParams): this;
  negative(params?: string | $ZodCheckLessThanParams): this;
  nonpositive(params?: string | $ZodCheckLessThanParams): this;
  nonnegative(params?: string | $ZodCheckGreaterThanParams): this;
  multipleOf(value: bigint, params?: string | $ZodCheckMultipleOfParams): this;
  minValue: bigint | null;
  maxValue: bigint | null;
  format: string | null;
}
interface ZodBigInt extends _ZodBigInt<$ZodBigIntInternals<bigint>> {}
declare const ZodBigInt: $constructor<ZodBigInt>;
declare function bigint(params?: string | $ZodBigIntParams): ZodBigInt;
interface ZodBigIntFormat extends ZodBigInt {
  _zod: $ZodBigIntFormatInternals;
}
declare const ZodBigIntFormat: $constructor<ZodBigIntFormat>;
declare function int64(params?: string | $ZodBigIntFormatParams): ZodBigIntFormat;
declare function uint64(params?: string | $ZodBigIntFormatParams): ZodBigIntFormat;
interface ZodSymbol extends _ZodType<$ZodSymbolInternals> {}
declare const ZodSymbol: $constructor<ZodSymbol>;
declare function symbol(params?: string | $ZodSymbolParams): ZodSymbol;
interface ZodUndefined extends _ZodType<$ZodUndefinedInternals> {}
declare const ZodUndefined: $constructor<ZodUndefined>;
declare function _undefined(params?: string | $ZodUndefinedParams): ZodUndefined;
interface ZodNull extends _ZodType<$ZodNullInternals> {}
declare const ZodNull: $constructor<ZodNull>;
declare function _null(params?: string | $ZodNullParams): ZodNull;
interface ZodAny extends _ZodType<$ZodAnyInternals> {}
declare const ZodAny: $constructor<ZodAny>;
declare function any(): ZodAny;
interface ZodUnknown extends _ZodType<$ZodUnknownInternals> {}
declare const ZodUnknown: $constructor<ZodUnknown>;
declare function unknown(): ZodUnknown;
interface ZodNever extends _ZodType<$ZodNeverInternals> {}
declare const ZodNever: $constructor<ZodNever>;
declare function never(params?: string | $ZodNeverParams): ZodNever;
interface ZodVoid extends _ZodType<$ZodVoidInternals> {}
declare const ZodVoid: $constructor<ZodVoid>;
declare function _void(params?: string | $ZodVoidParams): ZodVoid;
interface _ZodDate<T extends $ZodDateInternals = $ZodDateInternals> extends _ZodType<T> {
  min(value: number | Date, params?: string | $ZodCheckGreaterThanParams): this;
  max(value: number | Date, params?: string | $ZodCheckLessThanParams): this;
  /** @deprecated Not recommended. */
  minDate: Date | null;
  /** @deprecated Not recommended. */
  maxDate: Date | null;
}
interface ZodDate extends _ZodDate<$ZodDateInternals<Date>> {}
declare const ZodDate: $constructor<ZodDate>;
declare function date(params?: string | $ZodDateParams): ZodDate;
interface ZodArray<T extends SomeType = $ZodType> extends _ZodType<$ZodArrayInternals<T>>, $ZodArray<T> {
  element: T;
  min(minLength: number, params?: string | $ZodCheckMinLengthParams): this;
  nonempty(params?: string | $ZodCheckMinLengthParams): this;
  max(maxLength: number, params?: string | $ZodCheckMaxLengthParams): this;
  length(len: number, params?: string | $ZodCheckLengthEqualsParams): this;
  unwrap(): T;
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodArray: $constructor<ZodArray>;
declare function array<T extends SomeType>(element: T, params?: string | $ZodArrayParams): ZodArray<T>;
declare function keyof<T extends ZodObject>(schema: T): ZodEnum<KeysEnum<T["_zod"]["output"]>>;
type SafeExtendShape<Base extends $ZodShape, Ext extends $ZodLooseShape> = { [K in keyof Ext]: K extends keyof Base ? output<Ext[K]> extends output<Base[K]> ? input<Ext[K]> extends input<Base[K]> ? Ext[K] : never : never : Ext[K] };
interface ZodObject< /** @ts-ignore Cast variance */out Shape extends $ZodShape = $ZodLooseShape, out Config extends $ZodObjectConfig = $strip> extends _ZodType<$ZodObjectInternals<Shape, Config>>, $ZodObject<Shape, Config> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  shape: Shape;
  keyof(): ZodEnum<ToEnum<keyof Shape & string>>;
  /** Define a schema to validate all unrecognized keys. This overrides the existing strict/loose behavior. */
  catchall<T extends SomeType>(schema: T): ZodObject<Shape, $catchall<T>>;
  /** @deprecated Use `z.looseObject()` or `.loose()` instead. */
  passthrough(): ZodObject<Shape, $loose>;
  /** Consider `z.looseObject(A.shape)` instead */
  loose(): ZodObject<Shape, $loose>;
  /** Consider `z.strictObject(A.shape)` instead */
  strict(): ZodObject<Shape, $strict>;
  /** This is the default behavior. This method call is likely unnecessary. */
  strip(): ZodObject<Shape, $strip>;
  extend<U extends $ZodLooseShape>(shape: U): ZodObject<Extend<Shape, Writeable<U>>, Config>;
  safeExtend<U extends $ZodLooseShape>(shape: SafeExtendShape<Shape, U> & Partial<Record<keyof Shape, SomeType>>): ZodObject<Extend<Shape, Writeable<U>>, Config>;
  /**
   * @deprecated Use [`A.extend(B.shape)`](https://zod.dev/api?id=extend) instead.
   */
  merge<U extends ZodObject>(other: U): ZodObject<Extend<Shape, U["shape"]>, U["_zod"]["config"]>;
  pick<M extends Mask<keyof Shape>>(mask: M & Record<Exclude<keyof M, keyof Shape>, never>): ZodObject<Flatten<Pick<Shape, Extract<keyof Shape, keyof M>>>, Config>;
  omit<M extends Mask<keyof Shape>>(mask: M & Record<Exclude<keyof M, keyof Shape>, never>): ZodObject<Flatten<Omit<Shape, Extract<keyof Shape, keyof M>>>, Config>;
  partial(): ZodObject<{ -readonly [k in keyof Shape]: ZodOptional<Shape[k]> }, Config>;
  partial<M extends Mask<keyof Shape>>(mask: M & Record<Exclude<keyof M, keyof Shape>, never>): ZodObject<{ -readonly [k in keyof Shape]: k extends keyof M ? ZodOptional<Shape[k]> : Shape[k] }, Config>;
  required(): ZodObject<{ -readonly [k in keyof Shape]: ZodNonOptional<Shape[k]> }, Config>;
  required<M extends Mask<keyof Shape>>(mask: M & Record<Exclude<keyof M, keyof Shape>, never>): ZodObject<{ -readonly [k in keyof Shape]: k extends keyof M ? ZodNonOptional<Shape[k]> : Shape[k] }, Config>;
}
declare const ZodObject: $constructor<ZodObject>;
declare function object<T extends $ZodLooseShape = Partial<Record<never, SomeType>>>(shape?: T, params?: string | $ZodObjectParams): ZodObject<Writeable<T>, $strip>;
declare function strictObject<T extends $ZodLooseShape>(shape: T, params?: string | $ZodObjectParams): ZodObject<Writeable<T>, $strict>;
declare function looseObject<T extends $ZodLooseShape>(shape: T, params?: string | $ZodObjectParams): ZodObject<Writeable<T>, $loose>;
interface ZodUnion<T extends readonly SomeType[] = readonly $ZodType[]> extends _ZodType<$ZodUnionInternals<T>>, $ZodUnion<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  options: T;
}
declare const ZodUnion: $constructor<ZodUnion>;
declare function union<const T extends readonly SomeType[]>(options: T, params?: string | $ZodUnionParams): ZodUnion<T>;
interface ZodXor<T extends readonly SomeType[] = readonly $ZodType[]> extends _ZodType<$ZodXorInternals<T>>, $ZodXor<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  options: T;
}
declare const ZodXor: $constructor<ZodXor>;
/** Creates an exclusive union (XOR) where exactly one option must match.
 * Unlike regular unions that succeed when any option matches, xor fails if
 * zero or more than one option matches the input. */
declare function xor<const T extends readonly SomeType[]>(options: T, params?: string | $ZodXorParams): ZodXor<T>;
interface ZodDiscriminatedUnion<Options extends readonly SomeType[] = readonly $ZodType[], Disc extends string = string> extends ZodUnion<Options>, $ZodDiscriminatedUnion<Options, Disc> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _zod: $ZodDiscriminatedUnionInternals<Options, Disc>;
  def: $ZodDiscriminatedUnionDef<Options, Disc>;
}
declare const ZodDiscriminatedUnion: $constructor<ZodDiscriminatedUnion>;
declare function discriminatedUnion<Types extends readonly [$ZodTypeDiscriminable<Disc>, ...$ZodTypeDiscriminable<Disc>[]], Disc extends string>(discriminator: Disc, options: Types, params?: string | $ZodDiscriminatedUnionParams): ZodDiscriminatedUnion<Types, Disc>;
interface ZodIntersection<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends _ZodType<$ZodIntersectionInternals<A, B>>, $ZodIntersection<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodIntersection: $constructor<ZodIntersection>;
declare function intersection<T extends SomeType, U extends SomeType>(left: T, right: U): ZodIntersection<T, U>;
interface ZodTuple<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends _ZodType<$ZodTupleInternals<T, Rest>>, $ZodTuple<T, Rest> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  rest<Rest extends SomeType = $ZodType>(rest: Rest): ZodTuple<T, Rest>;
}
declare const ZodTuple: $constructor<ZodTuple>;
declare function tuple<T extends readonly [SomeType, ...SomeType[]]>(items: T, params?: string | $ZodTupleParams): ZodTuple<T, null>;
declare function tuple<T extends readonly [SomeType, ...SomeType[]], Rest extends SomeType>(items: T, rest: Rest, params?: string | $ZodTupleParams): ZodTuple<T, Rest>;
declare function tuple(items: [], params?: string | $ZodTupleParams): ZodTuple<[], null>;
interface ZodRecord<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends _ZodType<$ZodRecordInternals<Key, Value>>, $ZodRecord<Key, Value> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  keyType: Key;
  valueType: Value;
}
declare const ZodRecord: $constructor<ZodRecord>;
declare function record<Key extends $ZodRecordKey, Value extends SomeType>(keyType: Key, valueType: Value, params?: string | $ZodRecordParams): ZodRecord<Key, Value>;
declare function partialRecord<Key extends $ZodRecordKey, Value extends SomeType>(keyType: Key, valueType: Value, params?: string | $ZodRecordParams): ZodRecord<Key & $partial, Value>;
declare function looseRecord<Key extends $ZodRecordKey, Value extends SomeType>(keyType: Key, valueType: Value, params?: string | $ZodRecordParams): ZodRecord<Key, Value>;
interface ZodMap<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends _ZodType<$ZodMapInternals<Key, Value>>, $ZodMap<Key, Value> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  keyType: Key;
  valueType: Value;
  min(minSize: number, params?: string | $ZodCheckMinSizeParams): this;
  nonempty(params?: string | $ZodCheckMinSizeParams): this;
  max(maxSize: number, params?: string | $ZodCheckMaxSizeParams): this;
  size(size: number, params?: string | $ZodCheckSizeEqualsParams): this;
}
declare const ZodMap: $constructor<ZodMap>;
declare function map<Key extends SomeType, Value extends SomeType>(keyType: Key, valueType: Value, params?: string | $ZodMapParams): ZodMap<Key, Value>;
interface ZodSet<T extends SomeType = $ZodType> extends _ZodType<$ZodSetInternals<T>>, $ZodSet<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  min(minSize: number, params?: string | $ZodCheckMinSizeParams): this;
  nonempty(params?: string | $ZodCheckMinSizeParams): this;
  max(maxSize: number, params?: string | $ZodCheckMaxSizeParams): this;
  size(size: number, params?: string | $ZodCheckSizeEqualsParams): this;
}
declare const ZodSet: $constructor<ZodSet>;
declare function set<Value extends SomeType>(valueType: Value, params?: string | $ZodSetParams): ZodSet<Value>;
interface ZodEnum< /** @ts-ignore Cast variance */out T extends EnumLike = EnumLike> extends _ZodType<$ZodEnumInternals<T>>, $ZodEnum<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  enum: T;
  options: Array<T[keyof T]>;
  extract<const U extends readonly (keyof T)[]>(values: U, params?: string | $ZodEnumParams): ZodEnum<Flatten<Pick<T, U[number]>>>;
  exclude<const U extends readonly (keyof T)[]>(values: U, params?: string | $ZodEnumParams): ZodEnum<Flatten<Omit<T, U[number]>>>;
}
declare const ZodEnum: $constructor<ZodEnum>;
declare function _enum<const T extends readonly string[]>(values: T, params?: string | $ZodEnumParams): ZodEnum<ToEnum<T[number]>>;
declare function _enum<const T extends EnumLike>(entries: T, params?: string | $ZodEnumParams): ZodEnum<T>;
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
declare function nativeEnum<T extends EnumLike>(entries: T, params?: string | $ZodEnumParams): ZodEnum<T>;
interface ZodLiteral<T extends Literal = Literal> extends _ZodType<$ZodLiteralInternals<T>>, $ZodLiteral<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  values: Set<T>;
  /** @legacy Use `.values` instead. Accessing this property will throw an error if the literal accepts multiple values. */
  value: T;
}
declare const ZodLiteral: $constructor<ZodLiteral>;
declare function literal<const T extends ReadonlyArray<Literal>>(value: T, params?: string | $ZodLiteralParams): ZodLiteral<T[number]>;
declare function literal<const T extends Literal>(value: T, params?: string | $ZodLiteralParams): ZodLiteral<T>;
interface ZodFile extends _ZodType<$ZodFileInternals>, $ZodFile {
  "~standard": ZodStandardSchemaWithJSON<this>;
  min(size: number, params?: string | $ZodCheckMinSizeParams): this;
  max(size: number, params?: string | $ZodCheckMaxSizeParams): this;
  mime(types: MimeTypes | Array<MimeTypes>, params?: string | $ZodCheckMimeTypeParams): this;
}
declare const ZodFile: $constructor<ZodFile>;
declare function file(params?: string | $ZodFileParams): ZodFile;
interface ZodTransform<O = unknown, I = unknown> extends _ZodType<$ZodTransformInternals<O, I>>, $ZodTransform<O, I> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodTransform: $constructor<ZodTransform>;
declare function transform<I = unknown, O = I>(fn: (input: I, ctx: $RefinementCtx) => O): ZodTransform<Awaited<O>, I>;
interface ZodOptional<T extends SomeType = $ZodType> extends _ZodType<$ZodOptionalInternals<T>>, $ZodOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodOptional: $constructor<ZodOptional>;
declare function optional<T extends SomeType>(innerType: T): ZodOptional<T>;
interface ZodExactOptional<T extends SomeType = $ZodType> extends _ZodType<$ZodExactOptionalInternals<T>>, $ZodExactOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodExactOptional: $constructor<ZodExactOptional>;
declare function exactOptional<T extends SomeType>(innerType: T): ZodExactOptional<T>;
interface ZodNullable<T extends SomeType = $ZodType> extends _ZodType<$ZodNullableInternals<T>>, $ZodNullable<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodNullable: $constructor<ZodNullable>;
declare function nullable<T extends SomeType>(innerType: T): ZodNullable<T>;
declare function nullish<T extends SomeType>(innerType: T): ZodOptional<ZodNullable<T>>;
interface ZodDefault<T extends SomeType = $ZodType> extends _ZodType<$ZodDefaultInternals<T>>, $ZodDefault<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
  /** @deprecated Use `.unwrap()` instead. */
  removeDefault(): T;
}
declare const ZodDefault: $constructor<ZodDefault>;
declare function _default<T extends SomeType>(innerType: T, defaultValue: NoUndefined<output<T>> | (() => NoUndefined<output<T>>)): ZodDefault<T>;
interface ZodPrefault<T extends SomeType = $ZodType> extends _ZodType<$ZodPrefaultInternals<T>>, $ZodPrefault<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodPrefault: $constructor<ZodPrefault>;
declare function prefault<T extends SomeType>(innerType: T, defaultValue: input<T> | (() => input<T>)): ZodPrefault<T>;
interface ZodNonOptional<T extends SomeType = $ZodType> extends _ZodType<$ZodNonOptionalInternals<T>>, $ZodNonOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodNonOptional: $constructor<ZodNonOptional>;
declare function nonoptional<T extends SomeType>(innerType: T, params?: string | $ZodNonOptionalParams): ZodNonOptional<T>;
interface ZodSuccess<T extends SomeType = $ZodType> extends _ZodType<$ZodSuccessInternals<T>>, $ZodSuccess<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodSuccess: $constructor<ZodSuccess>;
declare function success<T extends SomeType>(innerType: T): ZodSuccess<T>;
interface ZodCatch<T extends SomeType = $ZodType> extends _ZodType<$ZodCatchInternals<T>>, $ZodCatch<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
  /** @deprecated Use `.unwrap()` instead. */
  removeCatch(): T;
}
declare const ZodCatch: $constructor<ZodCatch>;
declare function _catch<T extends SomeType>(innerType: T, catchValue: output<T> | ((ctx: $ZodCatchCtx) => output<T>)): ZodCatch<T>;
interface ZodNaN extends _ZodType<$ZodNaNInternals>, $ZodNaN {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodNaN: $constructor<ZodNaN>;
declare function nan(params?: string | $ZodNaNParams): ZodNaN;
interface ZodPipe<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends _ZodType<$ZodPipeInternals<A, B>>, $ZodPipe<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  in: A;
  out: B;
}
declare const ZodPipe: $constructor<ZodPipe>;
declare function pipe<const A extends SomeType, B extends $ZodType<unknown, output<A>> = $ZodType<unknown, output<A>>>(in_: A, out: B | $ZodType<unknown, output<A>>): ZodPipe<A, B>;
interface ZodCodec<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends ZodPipe<A, B>, $ZodCodec<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _zod: $ZodCodecInternals<A, B>;
  def: $ZodCodecDef<A, B>;
}
declare const ZodCodec: $constructor<ZodCodec>;
declare function codec<const A extends SomeType, B extends SomeType = $ZodType>(in_: A, out: B, params: {
  decode: (value: output<A>, payload: ParsePayload<output<A>>) => MaybeAsync<input<B>>;
  encode: (value: input<B>, payload: ParsePayload<input<B>>) => MaybeAsync<output<A>>;
}): ZodCodec<A, B>;
declare function invertCodec<A extends SomeType, B extends SomeType>(codec: ZodCodec<A, B>): ZodCodec<B, A>;
interface ZodPreprocess<B extends SomeType = $ZodType> extends ZodPipe<$ZodTransform, B>, $ZodPreprocess<B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _zod: $ZodPreprocessInternals<B>;
  def: $ZodPreprocessDef<B>;
}
declare const ZodPreprocess: $constructor<ZodPreprocess>;
interface ZodReadonly<T extends SomeType = $ZodType> extends _ZodType<$ZodReadonlyInternals<T>>, $ZodReadonly<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodReadonly: $constructor<ZodReadonly>;
declare function readonly<T extends SomeType>(innerType: T): ZodReadonly<T>;
interface ZodTemplateLiteral<Template extends string = string> extends _ZodType<$ZodTemplateLiteralInternals<Template>>, $ZodTemplateLiteral<Template> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodTemplateLiteral: $constructor<ZodTemplateLiteral>;
declare function templateLiteral<const Parts extends $ZodTemplateLiteralPart[]>(parts: Parts, params?: string | $ZodTemplateLiteralParams): ZodTemplateLiteral<$PartsToTemplateLiteral<Parts>>;
interface ZodLazy<T extends SomeType = $ZodType> extends _ZodType<$ZodLazyInternals<T>>, $ZodLazy<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodLazy: $constructor<ZodLazy>;
declare function lazy<T extends SomeType>(getter: () => T): ZodLazy<T>;
interface ZodPromise<T extends SomeType = $ZodType> extends _ZodType<$ZodPromiseInternals<T>>, $ZodPromise<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodPromise: $constructor<ZodPromise>;
declare function promise<T extends SomeType>(innerType: T): ZodPromise<T>;
interface ZodFunction<Args extends $ZodFunctionIn = $ZodFunctionIn, Returns extends $ZodFunctionOut = $ZodFunctionOut> extends _ZodType<$ZodFunctionInternals<Args, Returns>>, $ZodFunction<Args, Returns> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _def: $ZodFunctionDef<Args, Returns>;
  _input: $InferInnerFunctionType<Args, Returns>;
  _output: $InferOuterFunctionType<Args, Returns>;
  input<const Items extends TupleItems, const Rest extends $ZodFunctionOut = $ZodFunctionOut>(args: Items, rest?: Rest): ZodFunction<$ZodTuple<Items, Rest>, Returns>;
  input<NewArgs extends $ZodFunctionIn>(args: NewArgs): ZodFunction<NewArgs, Returns>;
  input(...args: any[]): ZodFunction<any, Returns>;
  output<NewReturns extends $ZodType>(output: NewReturns): ZodFunction<Args, NewReturns>;
}
declare const ZodFunction: $constructor<ZodFunction>;
declare function _function(): ZodFunction;
declare function _function<const In extends ReadonlyArray<$ZodType>>(params: {
  input: In;
}): ZodFunction<ZodTuple<In, null>, $ZodFunctionOut>;
declare function _function<const In extends ReadonlyArray<$ZodType>, const Out extends $ZodFunctionOut = $ZodFunctionOut>(params: {
  input: In;
  output: Out;
}): ZodFunction<ZodTuple<In, null>, Out>;
declare function _function<const In extends $ZodFunctionIn = $ZodFunctionIn>(params: {
  input: In;
}): ZodFunction<In, $ZodFunctionOut>;
declare function _function<const Out extends $ZodFunctionOut = $ZodFunctionOut>(params: {
  output: Out;
}): ZodFunction<$ZodFunctionIn, Out>;
declare function _function<In extends $ZodFunctionIn = $ZodFunctionIn, Out extends $ZodType = $ZodType>(params?: {
  input: In;
  output: Out;
}): ZodFunction<In, Out>;
interface ZodCustom<O = unknown, I = unknown> extends _ZodType<$ZodCustomInternals<O, I>>, $ZodCustom<O, I> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodCustom: $constructor<ZodCustom>;
declare function check<O = unknown>(fn: CheckFn<O>): $ZodCheck<O>;
declare function custom<O>(fn?: (data: unknown) => unknown, _params?: string | $ZodCustomParams | undefined): ZodCustom<O, O>;
declare function refine<T>(fn: (arg: NoInfer<T>) => MaybeAsync<unknown>, _params?: string | $ZodCustomParams): $ZodCheck<T>;
declare function superRefine<T>(fn: (arg: T, payload: $RefinementCtx<T>) => void | Promise<void>, params?: $ZodSuperRefineParams): $ZodCheck<T>;
declare const describe: typeof describe$1;
declare const meta: typeof meta$1;
type ZodInstanceOfParams = Params<ZodCustom, $ZodIssueCustom, "type" | "check" | "checks" | "fn" | "abort" | "error" | "params" | "path">;
declare function _instanceof<T extends typeof Class>(cls: T, params?: ZodInstanceOfParams): ZodCustom<InstanceType<T>, InstanceType<T>>;
declare const stringbool: (_params?: string | $ZodStringBoolParams) => ZodCodec<ZodString, ZodBoolean>;
type _ZodJSONSchema = ZodUnion<[ZodString, ZodNumber, ZodBoolean, ZodNull, ZodArray<ZodJSONSchema>, ZodRecord<ZodString, ZodJSONSchema>]>;
type _ZodJSONSchemaInternals = _ZodJSONSchema["_zod"];
interface ZodJSONSchemaInternals extends _ZodJSONSchemaInternals {
  output: JSONType;
  input: JSONType;
}
interface ZodJSONSchema extends _ZodJSONSchema {
  _zod: ZodJSONSchemaInternals;
}
declare function json(params?: string | $ZodCustomParams): ZodJSONSchema;
declare function preprocess<A, U extends SomeType, B = unknown>(fn: (arg: B, ctx: $RefinementCtx) => A, schema: U): ZodPreprocess<U>;
//#endregion
//#region src/config/zod-schema.proxy.d.ts
declare const ProxyConfigSchema: ZodOptional<ZodObject<{
  enabled: ZodOptional<ZodBoolean>;
  proxyUrl: ZodOptional<ZodURL>;
  tls: ZodOptional<ZodObject<{
    caFile: ZodOptional<ZodString>;
  }, $strict>>;
  loopbackMode: ZodOptional<ZodEnum<{
    block: "block";
    "gateway-only": "gateway-only";
    proxy: "proxy";
  }>>;
}, $strict>>;
type ProxyConfig = output<typeof ProxyConfigSchema>;
//#endregion
//#region src/config/types.openclaw.d.ts
/** One persisted suppression for a known security audit finding. */
type SecurityAuditSuppression = {
  /** Exact security audit check id to suppress. */checkId: string; /** Optional case-insensitive substring required in the finding title. */
  titleIncludes?: string; /** Optional case-insensitive substring required in the finding detail. */
  detailIncludes?: string; /** Operator rationale for accepting this standing finding. */
  reason?: string;
};
type SecurityConfig = {
  /** Security audit policy and accepted standing findings. */audit?: {
    /** Accepted security audit findings to omit from active summary/findings. */suppressions?: SecurityAuditSuppression[];
  };
  installPolicy?: {
    /**
     * Enable operator-owned install policy. When true without an exec command,
     * install/update attempts fail closed for supported targets.
     */
    enabled?: boolean; /** Supported install targets. Omit to cover every supported target. */
    targets?: Array<"skill" | "plugin">;
    /**
     * Trusted local policy command. Transport intentionally mirrors exec
     * SecretRef provider fields: absolute command, no shell, bounded output,
     * explicit env allowlist, and secure path checks.
     */
    exec?: {
      source: "exec";
      command: string;
      args?: string[];
      timeoutMs?: number;
      noOutputTimeoutMs?: number;
      maxOutputBytes?: number;
      env?: Record<string, string>;
      passEnv?: string[];
      trustedDirs?: string[];
    };
  };
};
type SurfaceConfigEntry = {
  /** Surface-specific silent reply policy for channels or UI integrations. */silentReply?: SilentReplyPolicyShape;
};
/** Top-level OpenClaw config as read from user/project config files. */
type OpenClawConfig = {
  /** @deprecated Doctor-only legacy input. */audit?: AuditConfig; /** JSON schema URL used by editors and generated config files. */
  $schema?: string;
  meta?: {
    /** Last OpenClaw version that wrote this config. */lastTouchedVersion?: string; /** One-time doctor migrations already applied to this config. */
    migrations?: {
      modelPolicyAllowlist?: true;
    };
  }; /** Authentication provider/profile configuration. */
  auth?: AuthConfig; /** Named access groups used by channel/provider policy allowlists. */
  accessGroups?: AccessGroupsConfig; /** ACP integration settings. */
  acp?: AcpConfig;
  env?: {
    /** Opt-in: import missing secrets from a login shell environment (exec `$SHELL -l -c 'env -0'`). */shellEnv?: {
      enabled?: boolean; /** Timeout for the login shell exec (ms). Default: 15000. */
      timeoutMs?: number;
    }; /** Inline env vars to apply when not already present in the process env. */
    vars?: Record<string, string>; /** Sugar: allow env vars directly under env (string values only). */
    [key: string]: string | Record<string, string> | {
      enabled?: boolean;
      timeoutMs?: number;
    } | undefined;
  };
  wizard?: {
    /** Guided-onboarding discovery consent: "full" scans silently, "guarded" asks first. */accessMode?: "full" | "guarded"; /** Offer installed-application plugin and skill recommendations during onboarding. */
    appRecommendations?: boolean;
    lastRunAt?: string;
    lastRunVersion?: string;
    lastRunCommit?: string;
    lastRunCommand?: string;
    lastRunMode?: "local" | "remote";
    localModelLeanAutoModel?: string;
    securityAcknowledgedAt?: string;
  }; /** Diagnostics, tracing, and stability debugging settings. */
  diagnostics?: DiagnosticsConfig; /** Log sink, level, rotation, and redaction settings. */
  logging?: LoggingConfig; /** Security audit suppressions and security policy settings. */
  security?: SecurityConfig;
  update?: {
    /** Update channel for git + npm installs ("stable", "extended-stable", "beta", or "dev"). */channel?: "stable" | "extended-stable" | "beta" | "dev"; /** Check for updates on gateway start (npm installs only). */
    checkOnStart?: boolean; /** Core auto-update policy for package installs. */
    auto?: {
      /** Enable background auto-update checks and apply logic. Default: false. */enabled?: boolean;
    };
  }; /** Browser automation and browser plugin integration settings. */
  browser?: BrowserConfig;
  ui?: {
    /** Accent color for OpenClaw UI chrome (hex). */seamColor?: string;
    assistant?: {
      /** Assistant display name for UI surfaces. */name?: string; /** Assistant avatar (emoji, short text, or image URL/data URI). */
      avatar?: string;
    };
    /**
     * Operator display preferences. Canonical config home so agents can
     * change them through the approval gate and clients stay in sync; the
     * Control UI mirrors them into browser storage for instant boot.
     */
    prefs?: {
      /** Control UI theme. */theme?: "claw" | "knot" | "dash" | "custom"; /** Light/dark preference. */
      themeMode?: "light" | "dark" | "system"; /** BCP 47 UI locale, e.g. "en" or "pt-BR". */
      locale?: string; /** Show model thinking output in chat. */
      chatShowThinking?: boolean; /** Show tool call cards in chat. */
      chatShowToolCalls?: boolean; /** Keep model commentary in Control UI transcripts after a run. */
      chatPersistCommentary?: boolean; /** Chat send shortcut: Enter sends, or modifier+Enter sends. */
      chatSendShortcut?: "enter" | "modifier-enter"; /** Follow-up handling while a run is active; unset uses the server queue mode. */
      chatFollowUpMode?: "steer" | "queue"; /** Ordered page and pinned-session entries shown in the Control UI sidebar. */
      sidebarEntries?: string[];
    };
  }; /** Secret providers, defaults, and ref-resolution settings. */
  secrets?: SecretsConfig; /** Skill loading and bundled skill configuration. */
  skills?: SkillsConfig; /** Plugin registry/install/runtime configuration. */
  plugins?: PluginsConfig; /** Per-surface policy keyed by channel/UI/runtime surface id. */
  surfaces?: Record<string, SurfaceConfigEntry>; /** Model providers, model catalog, pricing, and catalog merge policy. */
  models?: ModelsConfig; /** Node-host pairing and remote command node settings. */
  nodeHost?: NodeHostConfig; /** Agent definitions, defaults, bindings, and runtime policy. */
  agents?: AgentsConfig; /** Tool exposure, policy, web/media tools, exec, and code-mode settings. */
  tools?: ToolsConfig; /** Legacy/direct agent bindings used by runtime resolution. */
  bindings?: AgentBinding[]; /** Broadcast command and delivery settings. */
  broadcast?: BroadcastConfig;
  attachments?: {
    /** Optional retention window for persisted inbound media cleanup. */ttlHours?: number;
  }; /** Message formatting, delivery, and action settings. */
  messages?: MessagesConfig; /** Shared text-to-speech defaults. Agent and channel overrides layer over this config. */
  tts?: TtsConfig; /** Chat command settings. */
  commands?: CommandsConfig; /** Human approval workflow settings. */
  approvals?: ApprovalsConfig; /** Session keying, reset, maintenance, send-policy, and thread-binding settings. */
  session?: SessionConfig; /** Channel defaults, built-in channel sections, and plugin-owned channel config. */
  channels?: ChannelsConfig; /** Cron schedule and retention settings. */
  cron?: CronConfig; /** Transcript persistence and export settings. */
  transcripts?: TranscriptsConfig; /** Runtime hook registration and queue behavior. */
  hooks?: HooksConfig; /** Network discovery and service advertisement settings. */
  discovery?: DiscoveryConfig; /** Voice/talk mode configuration. */
  talk?: TalkConfig; /** Gateway server, auth, UI, node-pairing, and dispatch settings. */
  gateway?: GatewayConfig; /** Opt-in cloud-worker provider profiles. */
  cloudWorkers?: CloudWorkersConfig; /** Memory indexing/search configuration. */
  memory?: MemoryConfig; /** MCP client/server and Codex MCP approval configuration. */
  mcp?: McpConfig; /** Network-level SSRF protection via an operator-managed forward proxy. */
  proxy?: ProxyConfig;
};
declare const openClawConfigStateBrand: unique symbol;
type BrandedConfigState<TState extends string> = OpenClawConfig & {
  readonly [openClawConfigStateBrand]?: TState;
};
/** Authored config before include/env resolution and runtime defaults. */
/** Source config after includes/env substitution, before runtime defaults. */
type ResolvedSourceConfig = BrandedConfigState<"resolved-source">;
/** Runtime-materialized config with defaults/normalization applied. */
type RuntimeConfig = BrandedConfigState<"runtime">;
type ConfigValidationIssue = {
  /** Dot-path to the invalid or legacy config value. */path: string; /** Structured validator path used internally for lossless source diagnostics. */
  pathSegments?: Array<string | number>; /** Human-readable validation message. */
  message: string; /** Optional allowed values shown to the operator. */
  allowedValues?: string[]; /** Number of allowed values omitted from the display list. */
  allowedValuesHiddenCount?: number;
};
type LegacyConfigIssue = {
  /** Dot-path to the legacy config value. */path: string; /** Human-readable migration or rejection message. */
  message: string;
};
type ConfigFileSnapshot = {
  /** Config file path that was read. */path: string; /** Lexical and canonical file paths reached while resolving $include directives. */
  includedPaths?: string[]; /** Exact authored ownership for every successfully resolved $include directive. */
  includeProvenance?: readonly ConfigIncludeOwnership[]; /** Temporary roster-only projection retained until write preparation uses generic ownership. */
  agentRosterIncludeOwned?: boolean; /** Whether the config file exists on disk. */
  exists: boolean; /** Raw file contents before parsing; null when missing. */
  raw: string | null; /** Parsed JSON/JSONC/YAML value before schema normalization. */
  parsed: unknown; /** Include/env-resolved source before raw compatibility migrations. */
  sourceConfigBeforeMigrations?: ResolvedSourceConfig;
  /**
   * Config authored on disk after $include resolution and ${ENV} substitution,
   * but BEFORE runtime defaults are applied.
   */
  sourceConfig: ResolvedSourceConfig;
  /**
   * Config after $include resolution and ${ENV} substitution, but BEFORE runtime
   * defaults are applied. Use this for config set/unset operations to avoid
   * leaking runtime defaults into the written config file.
   */
  resolved: ResolvedSourceConfig;
  valid: boolean; /** Runtime-shaped config used by in-process readers. */
  runtimeConfig: RuntimeConfig; /** @deprecated Prefer runtimeConfig. */
  config: RuntimeConfig;
  hash?: string;
  readError?: {
    code: string | null;
  };
  issues: ConfigValidationIssue[];
  warnings: ConfigValidationIssue[];
  legacyIssues: LegacyConfigIssue[];
};
//#endregion
export { ZodObject as $, CheckParams as $a, $ZodNarrow as $c, $ZodCatch as $d, $ZodIPv6Def as $f, ReplyToMode as $g, isValidBase64URL as $h, $ZodFileParams as $i, $ZodCheckGreaterThanInternals as $l, $ZodTemplateLiteralPart as $m, string as $n, _literal as $o, $ZodNumber as $p, $ZodCheckBase64URLParams as $r, _union as $s, custom as $t, $ZodCheckUpperCaseDef as $u, ZodFunction as A, $ZodStringFormatParams as Aa, _parseAsync as Ac, $ZodBase64URLDef as Ad, $ZodEnum as Af, json_schema_d_exports as Ag, $ZodVoidInternals as Ah, $ZodCheckNanoIDParams as Ai, $ZodIssueStringStartsWith as Al, $ZodRecordInternals as Am, mac as An, _endsWith as Ao, $ZodMACDef as Ap, safeDecodeAsync as Ar, _record as As, _ZodNumber as At, $ZodCheckMultipleOfInternals as Au, ZodKSUID as B, $ZodTypeDiscriminableInternals as Ba, encodeAsync$1 as Bc, $ZodBooleanInternals as Bd, $ZodFunctionArgs as Bf, TtsMode as Bg, $strip as Bh, $ZodCheckUUIDv4Params as Bi, toDotPath as Bl, $ZodStringFormatDef as Bm, number as Bn, _int32 as Bo, $ZodNanoIDInternals as Bp, $ZodAnyParams as Br, _success as Bs, _void as Bt, $ZodCheckRegex as Bu, ZodEmail as C, $ZodOptionalParams as Ca, $SafeParseAsync as Cc, $ZodArray as Cd, $ZodE164Internals as Cf, $replace as Cg, $ZodUnionDef as Ch, $ZodCheckMACParams as Ci, $ZodIssueInvalidValue as Cl, $ZodPromiseDef as Cm, jwt as Cn, _custom as Co, $ZodLazyDef as Cp, decode as Cr, _optional as Cs, ZodUnknown as Ct, $ZodCheckMinLengthDef as Cu, ZodFile as D, $ZodRecordParams as Da, _encode as Dc, $ZodBase64Def as Dd, $ZodEmoji as Df, registry as Dg, $ZodUnknownInternals as Dh, $ZodCheckMinLengthParams as Di, $ZodIssueStringIncludes as Dl, $ZodReadonlyInternals as Dm, literal as Dn, _e164 as Do, $ZodLiteralInternals as Dp, parse as Dr, _promise as Ds, _ZodBigInt as Dt, $ZodCheckMinSizeInternals as Du, ZodExactOptional as E, $ZodReadonlyParams as Ea, _decodeAsync as Ec, $ZodBase64 as Ed, $ZodEmailInternals as Ef, globalRegistry as Eg, $ZodUnknownDef as Eh, $ZodCheckMimeTypeParams as Ei, $ZodIssueStringEndsWith as El, $ZodReadonlyDef as Em, lazy as En, _discriminatedUnion as Eo, $ZodLiteralDef as Ep, encodeAsync as Er, _positive as Es, ZodXor as Et, $ZodCheckMinSizeDef as Eu, ZodInt32 as F, $ZodSymbolParams as Fa, _safeParse as Fc, $ZodBigIntFormatDef as Fd, $ZodExactOptionalInternals as Ff, BrowserProfileConfig as Fg, $ZodXorInternals as Fh, $ZodCheckStartsWithParams as Fi, $ZodRealError as Fl, $ZodShape as Fm, nativeEnum as Fn, _gt as Fo, $ZodNaN as Fp, IssueData as Fr, _slugify as Fs, _enum as Ft, $ZodCheckOverwriteDef as Fu, ZodNaN as G, $ZodUUIDv6Params as Ga, safeEncode$1 as Gc, $ZodCIDRv6Def as Gd, $ZodFunctionParams as Gf, MentionPatternsPolicyConfig as Gg, ParseContext as Gh, $ZodCustomParams as Gi, $ZodCheckBigIntFormatDef as Gl, $ZodSuccessDef as Gm, prefault as Gn, _isoDate as Go, $ZodNonOptionalDef as Gp, $ZodBigIntParams as Gr, _toUpperCase as Gs, bigint as Gt, $ZodCheckSizeEqualsInternals as Gu, ZodLiteral as H, $ZodURLParams as Ha, parseAsync$1 as Hc, $ZodCIDRv4Def as Hd, $ZodFunctionIn as Hf, GroupToolPolicyBySenderConfig as Hg, ConcatenateTupleOfStrings as Hh, $ZodCheckUUIDv7Params as Hi, $ZodBigIntFormats as Hl, $ZodStringFormatTypes as Hm, optional as Hn, _intersection as Ho, $ZodNeverDef as Hp, $ZodBase64Params as Hr, _symbol as Hs, array as Ht, $ZodCheckRegexInternals as Hu, ZodIntersection as I, $ZodTemplateLiteralParams as Ia, _safeParseAsync as Ic, $ZodBigIntFormatInternals as Id, $ZodFile as If, AgentBinding as Ig, $catchall as Ih, $ZodCheckStringFormatParams as Ii, $ZodStringFormatIssues as Il, $ZodStandardSchema as Im, never as In, _gte as Io, $ZodNaNDef as Ip, ZodError as Ir, _startsWith as Is, _function as It, $ZodCheckOverwriteInternals as Iu, ZodNonOptional as J, $ZodUnionParams as Ja, safeParseAsync$1 as Jc, $ZodCUID2 as Jd, $ZodGUIDInternals as Jf, DmPolicy as Jg, SomeType as Jh, $ZodDiscriminatedUnionParams as Ji, $ZodCheckEndsWith as Jl, $ZodSymbolDef as Jm, readonly as Jn, _isoTime as Jo, $ZodNullDef as Jp, $ZodCIDRv6Params as Jr, _tuple as Js, cidrv4 as Jt, $ZodCheckStartsWithInternals as Ju, ZodNanoID as K, $ZodUUIDv7Params as Ka, safeEncodeAsync$1 as Kc, $ZodCIDRv6Internals as Kd, $ZodGUID as Kf, MemoryCitationsMode as Kg, ParseContextInternal as Kh, $ZodDateParams as Ki, $ZodCheckBigIntFormatInternals as Kl, $ZodSuccessInternals as Km, preprocess as Kn, _isoDateTime as Ko, $ZodNonOptionalInternals as Kp, $ZodBooleanParams as Kr, _transform as Ks, boolean as Kt, $ZodCheckStartsWith as Ku, ZodJSONSchema as L, $ZodTransformParams as La, decode$1 as Lc, $ZodBigIntInternals as Ld, $ZodFileDef as Lf, ResolvedTtsPersona as Lg, $loose as Lh, $ZodCheckULIDParams as Li, flattenError as Ll, $ZodString as Lm, nonoptional as Ln, _guid as Lo, $ZodNaNInternals as Lp, ZodIssue as Lr, _string as Ls, _instanceof as Lt, $ZodCheckProperty as Lu, ZodIPv4 as M, $ZodSuccessParams as Ma, _safeDecodeAsync as Mc, $ZodBigInt as Md, $ZodEnumInternals as Mf, TalkProviderConfig as Mg, $ZodXIDDef as Mh, $ZodCheckPropertyParams as Mi, $ZodIssueTooSmall as Ml, $ZodSet as Mm, meta as Mn, _file as Mo, $ZodMap as Mp, safeEncodeAsync as Mr, _regex as Ms, _ZodType as Mt, $ZodCheckNumberFormatDef as Mu, ZodIPv6 as N, $ZodSuperRefineIssue as Na, _safeEncode as Nc, $ZodBigIntDef as Nd, $ZodExactOptional as Nf, ChannelImplicitMentionsConfig as Ng, $ZodXIDInternals as Nh, $ZodCheckRegexParams as Ni, $ZodIssueUnrecognizedKeys as Nl, $ZodSetDef as Nm, nan as Nn, _float32 as No, $ZodMapDef as Np, safeParse as Nr, _set as Ns, _catch as Nt, $ZodCheckNumberFormatInternals as Nu, ZodFloat32 as O, $ZodSetParams as Oa, _encodeAsync as Oc, $ZodBase64Internals as Od, $ZodEmojiDef as Of, BaseSchema as Og, $ZodVoid as Oh, $ZodCheckMinSizeParams as Oi, $ZodIssueStringInvalidJWT as Ol, $ZodRecord as Om, looseObject as On, _email as Oo, $ZodLooseShape as Op, parseAsync as Or, _property as Os, _ZodBoolean as Ot, $ZodCheckMultipleOf as Ou, ZodInt as P, $ZodSuperRefineParams as Pa, _safeEncodeAsync as Pc, $ZodBigIntFormat as Pd, $ZodExactOptionalDef as Pf, BrowserConfig as Pg, $ZodXor as Ph, $ZodCheckSizeEqualsParams as Pi, $ZodRawIssue as Pl, $ZodSetInternals as Pm, nanoid as Pn, _float64 as Po, $ZodMapInternals as Pp, safeParseAsync as Pr, _size as Ps, _default as Pt, $ZodCheckOverwrite as Pu, ZodNumberFormat as Q, $ZodXorParams as Qa, $ZodEncodeError as Qc, $ZodCUIDInternals as Qd, $ZodIPv6 as Qf, MarkdownTableMode as Qg, isValidBase64 as Qh, $ZodEnumParams as Qi, $ZodCheckGreaterThanDef as Ql, $ZodTemplateLiteralInternals as Qm, strictObject as Qn, _length as Qo, $ZodNullableInternals as Qp, $ZodCheckBase64Params as Qr, _undefined$1 as Qs, cuid2 as Qt, $ZodCheckUpperCase as Qu, ZodJSONSchemaInternals as R, $ZodTupleParams as Ra, decodeAsync$1 as Rc, $ZodBoolean as Rd, $ZodFileInternals as Rf, TtsAutoMode as Rg, $partial as Rh, $ZodCheckURLParams as Ri, formatError as Rl, $ZodStringDef as Rm, nullable as Rn, _includes as Ro, $ZodNanoID as Rp, ZodRealError as Rr, _stringFormat as Rs, _null as Rt, $ZodCheckPropertyDef as Ru, ZodE164 as S, $ZodObjectParams as Sa, $SafeParse as Sc, $ZodAnyInternals as Sd, $ZodE164Def as Sf, $output as Sg, $ZodUnion as Sh, $ZodCheckLowerCaseParams as Si, $ZodIssueInvalidUnion as Sl, $ZodPromise as Sm, json as Sn, _cuid2 as So, $ZodLazy as Sp, ZodSafeParseSuccess as Sr, _number as Ss, ZodUnion as St, $ZodCheckMinLength as Su, ZodEnum as T, $ZodPromiseParams as Ta, _decode as Tc, $ZodArrayInternals as Td, $ZodEmailDef as Tf, JSONSchemaMeta as Tg, $ZodUnknown as Th, $ZodCheckMaxSizeParams as Ti, $ZodIssueStringCommonFormats as Tl, $ZodReadonly as Tm, ksuid as Tn, _default$1 as To, $ZodLiteral as Tp, encode as Tr, _pipe as Ts, ZodXID as Tt, $ZodCheckMinSize as Tu, ZodMAC as U, $ZodUUIDParams as Ua, safeDecode$1 as Uc, $ZodCIDRv4Internals as Ud, $ZodFunctionInternals as Uf, GroupToolPolicyConfig as Ug, ConvertPartsToStringTuple as Uh, $ZodCheckUpperCaseParams as Ui, $ZodCheck as Ul, $ZodStringInternals as Um, partialRecord as Un, _ipv4 as Uo, $ZodNeverInternals as Up, $ZodBase64URLParams as Ur, _templateLiteral as Us, base64 as Ut, $ZodCheckSizeEquals as Uu, ZodLazy as V, $ZodULIDParams as Va, parse$1 as Vc, $ZodCIDRv4 as Vd, $ZodFunctionDef as Vf, TtsProvider as Vg, CheckFn as Vh, $ZodCheckUUIDv6Params as Vi, treeifyError as Vl, $ZodStringFormatInternals as Vm, object as Vn, _int64 as Vo, $ZodNever as Vp, $ZodArrayParams as Vr, _superRefine as Vs, any as Vt, $ZodCheckRegexDef as Vu, ZodMap as W, $ZodUUIDv4Params as Wa, safeDecodeAsync$1 as Wc, $ZodCIDRv6 as Wd, $ZodFunctionOut as Wf, SafeBinProfileFixture as Wg, File as Wh, $ZodCheckXIDParams as Wi, $ZodCheckBigIntFormat as Wl, $ZodSuccess as Wm, pipe as Wn, _ipv6 as Wo, $ZodNonOptional as Wp, $ZodBigIntFormatParams as Wr, _toLowerCase as Ws, base64url as Wt, $ZodCheckSizeEqualsDef as Wu, ZodNullable as X, $ZodVoidParams as Xa, $ZodBranded as Xc, $ZodCUID2Internals as Xd, $ZodIPv4Def as Xf, HumanDelayConfig as Xg, _$ZodType as Xh, $ZodEmailParams as Xi, $ZodCheckEndsWithInternals as Xl, $ZodTemplateLiteral as Xm, refine as Xn, _ksuid as Xo, $ZodNullable as Xp, $ZodCUIDParams as Xr, _uint64 as Xs, codec as Xt, $ZodCheckStringFormatDef as Xu, ZodNull as Y, $ZodUnknownParams as Ya, $ZodAsyncError as Yc, $ZodCUID2Def as Yd, $ZodIPv4 as Yf, DmScope as Yg, ToTemplateLiteral as Yh, $ZodE164Params as Yi, $ZodCheckEndsWithDef as Yl, $ZodSymbolInternals as Ym, record as Yn, _jwt as Yo, $ZodNullInternals as Yp, $ZodCUID2Params as Yr, _uint32 as Ys, cidrv6 as Yt, $ZodCheckStringFormat as Yu, ZodNumber as Z, $ZodXIDParams as Za, $ZodConfig as Zc, $ZodCUIDDef as Zd, $ZodIPv4Internals as Zf, IdentityConfig as Zg, _$ZodTypeInternals as Zh, $ZodEmojiParams as Zi, $ZodCheckGreaterThan as Zl, $ZodTemplateLiteralDef as Zm, set as Zn, _lazy as Zo, $ZodNullableDef as Zp, $ZodCatchParams as Zr, _ulid as Zs, cuid as Zt, $ZodCheckStringFormatInternals as Zu, ZodCustom as _, $ZodNonOptionalParams as _a, $ParseAsync as _c, $InferZodRecordInput as _d, $ZodDefaultInternals as _f, finalize as _g, $ZodUUIDDef as _h, $ZodCheckIncludesParams as _i, $ZodIssueCustom as _l, $ZodPrefaultDef as _m, int64 as _n, _coercedBoolean as _o, $ZodJWTDef as _p, uuidv7 as _r, _nonoptional as _s, ZodUInt32 as _t, $ZodCheckMaxSizeDef as _u, ZodArray as a, SilentReplyConversationType as a_, $ZodISODurationParams as aa, _uuidv6 as ac, $InferEnumInput as ad, $ZodCodecInternals as af, JSONSchemaGeneratorParams as ag, $ZodTupleInternals as ah, $ZodCheckE164Params as ai, input as al, $ZodObject as am, emoji as an, TypeParams as ao, $ZodISODateTimeDef as ap, templateLiteral as ar, _maxLength as as, ZodReadonly as at, $ZodCheckLengthEqualsDef as au, ZodDefault as b, $ZodNumberFormatParams as ba, $SafeEncode as bc, $ZodAny as bd, $ZodDiscriminatedUnionInternals as bf, $ZodRegistry as bg, $ZodUndefinedDef as bh, $ZodCheckLengthEqualsParams as bi, $ZodIssueInvalidStringFormat as bl, $ZodPreprocessDef as bm, ipv4 as bn, _coercedString as bo, $ZodKSUIDDef as bp, ZodSafeParseError as br, _null$1 as bs, ZodUUID as bt, $ZodCheckMimeTypeDef as bu, ZodBigInt as c, $ZodJWTParams as ca, _xid as cc, $InferInnerFunctionTypeAsync as cd, $ZodCustomInternals as cf, RegistryToJSONSchemaParams as cg, $ZodTypeInternals as ch, $ZodCheckEndsWithParams as ci, $ZodErrorMap as cl, $ZodObjectInternals as cm, float32 as cn, _base64 as co, $ZodISODurationDef as cp, uint32 as cr, _minLength as cs, ZodStandardSchemaWithJSON as ct, $ZodCheckLessThanDef as cu, ZodCIDRv4 as d, $ZodLiteralParams as da, meta$1 as dc, $InferOuterFunctionType as dd, $ZodCustomStringFormatInternals as df, ToJSONSchemaParams as dg, $ZodULIDDef as dh, $ZodCheckIPv4Params as di, $ZodFormattedError as dl, $ZodOptionalDef as dm, hash as dn, _boolean as do, $ZodISOTimeDef as dp, union as dr, _nan as ds, ZodSuccess as dt, $ZodCheckLowerCaseDef as du, SessionMaintenanceMode as e_, $ZodGUIDParams as ea, _unknown as ec, $ZodCheckUpperCaseInternals as ed, $ZodCatchCtx as ef, isValidJWT as eg, $ZodTransform as eh, $ZodCheckBigIntFormatParams as ei, $brand as el, $ZodNumberDef as em, date as en, CheckStringFormatParams as eo, $ZodIPv6Internals as ep, stringFormat as er, _lowercase as es, ZodOptional as et, $ZodCheckIncludes as eu, ZodCIDRv6 as f, $ZodMACParams as fa, $Decode as fc, $InferOuterFunctionTypeAsync as fd, $ZodDate as ff, ZodStandardJSONSchemaPayload as fg, $ZodULIDInternals as fh, $ZodCheckIPv6Params as fi, $ZodInternalIssue as fl, $ZodOptionalInternals as fm, hex as fn, _catch$1 as fo, $ZodISOTimeInternals as fp, unknown as fr, _nanoid as fs, ZodSymbol as ft, $ZodCheckLowerCaseInternals as fu, ZodCodec as g, $ZodNeverParams as ga, $Parse as gc, $InferUnionOutput as gd, $ZodDefaultDef as gf, extractDefs as gg, $ZodUUID as gh, $ZodCheckISOTimeParams as gi, $ZodIssueCode as gl, $ZodPrefault as gm, int32 as gn, _coercedBigint as go, $ZodJWT as gp, uuidv6 as gr, _nonnegative as gs, ZodType as gt, $ZodCheckMaxSize as gu, ZodCatch as h, $ZodNanoIDParams as ha, $EncodeAsync as hc, $InferUnionInput as hd, $ZodDefault as hf, createToJSONSchemaMethod as hg, $ZodURLInternals as hh, $ZodCheckISODurationParams as hi, $ZodIssueBase as hl, $ZodPipeInternals as hm, int as hn, _cidrv6 as ho, $ZodIntersectionInternals as hp, uuidv4 as hr, _never as hs, ZodTuple as ht, $ZodCheckMaxLengthInternals as hu, ZodAny as i, ChatType as i_, $ZodISODateTimeParams as ia, _uuidv4 as ic, $ZodStringFormats as id, $ZodCodecDef as if, util_d_exports as ig, $ZodTupleDef as ih, $ZodCheckCUIDParams as ii, globalConfig as il, $ZodNumberInternals as im, email as in, TimePrecision as io, $ZodISODateTime as ip, symbol as ir, _map as is, ZodPromise as it, $ZodCheckLengthEquals as iu, ZodGUID as j, $ZodStringParams as ja, _safeDecode as jc, $ZodBase64URLInternals as jd, $ZodEnumDef as jf, PluginInstallRecord as jg, $ZodXID as jh, $ZodCheckNumberFormatParams as ji, $ZodIssueTooBig as jl, $ZodRecordKey as jm, map as jn, _enum$1 as jo, $ZodMACInternals as jp, safeEncode as jr, _refine as js, _ZodString as jt, $ZodCheckNumberFormat as ju, ZodFloat64 as k, $ZodStringBoolParams as ka, _parse as kc, $ZodBase64URL as kd, $ZodEmojiInternals as kf, JSONSchema as kg, $ZodVoidDef as kh, $ZodCheckMultipleOfParams as ki, $ZodIssueStringInvalidRegex as kl, $ZodRecordDef as km, looseRecord as kn, _emoji as ko, $ZodMAC as kp, safeDecode as kr, _readonly as ks, _ZodDate as kt, $ZodCheckMultipleOfDef as ku, ZodBigIntFormat as l, $ZodKSUIDParams as la, _xor as lc, $InferObjectInput as ld, $ZodCustomStringFormat as lf, Seen as lg, $ZodTypes as lh, $ZodCheckGUIDParams as li, $ZodErrorTree as ll, $ZodObjectJIT as lm, float64 as ln, _base64url as lo, $ZodISODurationInternals as lp, uint64 as lr, _minSize as ls, ZodString as lt, $ZodCheckLessThanInternals as lu, ZodCUID2 as m, $ZodNaNParams as ma, $Encode as mc, $InferTupleOutputType as md, $ZodDateInternals as mf, createStandardJSONSchemaMethod as mg, $ZodURLDef as mh, $ZodCheckISODateTimeParams as mi, $ZodIssue as ml, $ZodPipeDef as mm, httpUrl as mn, _cidrv4 as mo, $ZodIntersectionDef as mp, uuid as mr, _negative as ms, ZodTransform as mt, $ZodCheckMaxLengthDef as mu, OpenClawConfig as n, PromptMode as n_, $ZodIPv6Params as na, _url as nc, $ZodNumberFormats as nd, $ZodCatchInternals as nf, JSONType as ng, $ZodTransformInternals as nh, $ZodCheckCIDRv6Params as ni, NEVER as nl, $ZodNumberFormatDef as nm, discriminatedUnion as nn, Params as no, $ZodISODateDef as np, success as nr, _lte as ns, ZodPrefault as nt, $ZodCheckIncludesInternals as nu, ZodBase64 as o, $ZodISOTimeParams as oa, _uuidv7 as oc, $InferEnumOutput as od, $ZodCustom as of, ProcessParams as og, $ZodType as oh, $ZodCheckEmailParams as oi, output as ol, $ZodObjectConfig as om, exactOptional as on, _any as oo, $ZodISODateTimeInternals as op, transform as or, _maxSize as os, ZodRecord as ot, $ZodCheckLengthEqualsInternals as ou, ZodCUID as p, $ZodMapParams as pa, $DecodeAsync as pc, $InferTupleInputType as pd, $ZodDateDef as pf, ZodStandardSchemaWithJSON$1 as pg, $ZodURL as ph, $ZodCheckISODateParams as pi, $ZodInvalidTypeExpected as pl, $ZodPipe as pm, hostname as pn, _check as po, $ZodIntersection as pp, url as pr, _nativeEnum as ps, ZodTemplateLiteral as pt, $ZodCheckMaxLength as pu, ZodNever as q, $ZodUndefinedParams as qa, safeParse$1 as qc, $ZodCUID as qd, $ZodGUIDDef as qf, ContextVisibilityMode as qg, ParsePayload as qh, $ZodDefaultParams as qi, $ZodCheckDef as ql, $ZodSymbol as qm, promise as qn, _isoDuration as qo, $ZodNull as qp, $ZodCIDRv4Params as qr, _trim as qs, check as qt, $ZodCheckStartsWithDef as qu, SafeExtendShape as r, SilentReplyPromptMode as r_, $ZodISODateParams as ra, _uuid as rc, $ZodStringFormatChecks as rd, $ZodCodec as rf, clone as rg, $ZodTuple as rh, $ZodCheckCUID2Params as ri, config as rl, $ZodNumberFormatInternals as rm, e164 as rn, StringFormatParams as ro, $ZodISODateInternals as rp, superRefine as rr, _mac as rs, ZodPreprocess as rt, $ZodCheckInternals as ru, ZodBase64URL as s, $ZodIntersectionParams as sa, _void$1 as sc, $InferInnerFunctionType as sd, $ZodCustomDef as sf, Processor as sg, $ZodTypeDef as sh, $ZodCheckEmojiParams as si, $ZodError as sl, $ZodObjectDef as sm, file as sn, _array as so, $ZodISODuration as sp, tuple as sr, _mime as ss, ZodSet as st, $ZodCheckLessThan as su, ConfigFileSnapshot as t, SessionScope as t_, $ZodIPv4Params as ta, _uppercase as tc, $ZodChecks as td, $ZodCatchDef as tf, version as tg, $ZodTransformDef as th, $ZodCheckCIDRv4Params as ti, $constructor as tl, $ZodNumberFormat as tm, describe as tn, CheckTypeParams as to, $ZodISODate as tp, stringbool as tr, _lt as ts, ZodPipe as tt, $ZodCheckIncludesDef as tu, ZodBoolean as u, $ZodLazyParams as ua, describe$1 as uc, $InferObjectOutput as ud, $ZodCustomStringFormatDef as uf, ToJSONSchemaContext as ug, $ZodULID as uh, $ZodCheckGreaterThanParams as ui, $ZodFlattenedError as ul, $ZodOptional as um, guid as un, _bigint as uo, $ZodISOTime as up, ulid as ur, _multipleOf as us, ZodStringFormat as ut, $ZodCheckLowerCase as uu, ZodCustomStringFormat as v, $ZodNullParams as va, $SafeDecode as vc, $InferZodRecordOutput as vd, $ZodDiscriminatedUnion as vf, initializeContext as vg, $ZodUUIDInternals as vh, $ZodCheckJWTParams as vi, $ZodIssueInvalidElement as vl, $ZodPrefaultInternals as vm, intersection as vn, _coercedDate as vo, $ZodJWTInternals as vp, xid as vr, _nonpositive as vs, ZodULID as vt, $ZodCheckMaxSizeInternals as vu, ZodEmoji as w, $ZodPipeParams as wa, $ZodErrorClass as wc, $ZodArrayDef as wd, $ZodEmail as wf, GlobalMeta as wg, $ZodUnionInternals as wh, $ZodCheckMaxLengthParams as wi, $ZodIssueNotMultipleOf as wl, $ZodPromiseInternals as wm, keyof as wn, _date as wo, $ZodLazyInternals as wp, decodeAsync as wr, _overwrite as ws, ZodVoid as wt, $ZodCheckMinLengthInternals as wu, ZodDiscriminatedUnion as x, $ZodNumberParams as xa, $SafeEncodeAsync as xc, $ZodAnyDef as xd, $ZodE164 as xf, $input as xg, $ZodUndefinedInternals as xh, $ZodCheckLessThanParams as xi, $ZodIssueInvalidType as xl, $ZodPreprocessInternals as xm, ipv6 as xn, _cuid as xo, $ZodKSUIDInternals as xp, ZodSafeParseResult as xr, _nullable as xs, ZodUndefined as xt, $ZodCheckMimeTypeInternals as xu, ZodDate as y, $ZodNullableParams as ya, $SafeDecodeAsync as yc, $PartsToTemplateLiteral as yd, $ZodDiscriminatedUnionDef as yf, process as yg, $ZodUndefined as yh, $ZodCheckKSUIDParams as yi, $ZodIssueInvalidKey as yl, $ZodPreprocess as ym, invertCodec as yn, _coercedNumber as yo, $ZodKSUID as yp, xor as yr, _normalize as ys, ZodURL as yt, $ZodCheckMimeType as yu, ZodJWT as z, $ZodTypeDiscriminable as za, encode$1 as zc, $ZodBooleanDef as zd, $ZodFunction as zf, TtsConfig as zg, $strict as zh, $ZodCheckUUIDParams as zi, prettifyError as zl, $ZodStringFormat as zm, nullish as zn, _int as zo, $ZodNanoIDDef as zp, $RefinementCtx as zr, _stringbool as zs, _undefined as zt, $ZodCheckPropertyInternals as zu };