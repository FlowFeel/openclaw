import { H as TelegramAccountConfig$1, _ as $ZodTypeInternals, a as ZodDefault, c as ZodLiteral, d as ZodOptional, f as ZodRecord, h as ZodUnion, i as ZodBoolean, l as ZodNumber, m as ZodType, mt as GroupPolicy, n as OpenClawConfig, o as ZodDiscriminatedUnion, p as ZodString, r as ZodArray, s as ZodEnum, u as ZodObject, v as $strict } from "./types.openclaw-B2WvMv3k.js";
import { Y as ChannelAccountSnapshot, at as ChannelMeta, bt as ExecApprovalRequest, on as ReplyPayload, rt as ChannelMessageActionAdapter } from "./setup-wizard-types-C896ZHgy.js";
import { n as ChatChannelId } from "./channel-id.types-D6R9ANrx.js";
import { n as MonitorTelegramOpts } from "./runtime-BhwxGnVU.js";
//#region src/routing/account-id.d.ts
declare const DEFAULT_ACCOUNT_ID = "default";
declare function normalizeAccountId(value: string | undefined | null): string;
//#endregion
//#region packages/acp-core/src/runtime/errors.d.ts
declare const ACP_ERROR_CODES: readonly ["ACP_BACKEND_MISSING", "ACP_BACKEND_UNAVAILABLE", "ACP_BACKEND_UNSUPPORTED_CONTROL", "ACP_DISPATCH_DISABLED", "ACP_INVALID_RUNTIME_OPTION", "ACP_SESSION_INIT_FAILED", "ACP_TURN_FAILED"];
type AcpRuntimeErrorCode = (typeof ACP_ERROR_CODES)[number];
/** Error type used at ACP runtime boundaries so callers can preserve structured failure codes. */
declare class AcpRuntimeError extends Error {
  readonly code: AcpRuntimeErrorCode;
  /**
   * Backend-specific structured failure code (e.g. acpx "SESSION_RESUME_REQUIRED"),
   * preserved so recovery decisions key on the failure kind rather than parsing
   * the human-readable message.
   */
  readonly detailCode?: string;
  readonly cause?: unknown;
  constructor(code: AcpRuntimeErrorCode, message: string, options?: {
    cause?: unknown;
    detailCode?: string;
  });
}
//#endregion
//#region src/channels/plugins/pairing-message.d.ts
/**
 * Default approval message sent after channel pairing succeeds.
 */
declare const PAIRING_APPROVED_MESSAGE = "\u2705 OpenClaw access approved. Send a message to start chatting.";
//#endregion
//#region src/channels/account-snapshot-fields.d.ts
/**
 * Infers whether any known credential status makes an account configured.
 *
 * Status commands need this metadata for "configured but unavailable" accounts without reading
 * raw credentials from runtime-only helpers.
 */
declare function resolveConfiguredFromCredentialStatuses(account: unknown): boolean | undefined;
/** Projects credential source/status metadata while omitting raw credential values. */
declare function projectCredentialSnapshotFields(account: unknown): Pick<Partial<ChannelAccountSnapshot>, "tokenSource" | "botTokenSource" | "appTokenSource" | "signingSecretSource" | "tokenStatus" | "botTokenStatus" | "appTokenStatus" | "signingSecretStatus" | "userTokenStatus">;
//#endregion
//#region src/plugin-sdk/status-helpers.d.ts
type RuntimeLifecycleSnapshot = {
  linked?: boolean | null;
  running?: boolean | null;
  connected?: boolean | null;
  restartPending?: boolean | null;
  reconnectAttempts?: number | null;
  lastConnectedAt?: number | null;
  lastDisconnect?: string | {
    at: number;
    status?: number;
    error?: string;
    loggedOut?: boolean;
  } | null;
  lastEventAt?: number | null;
  lastTransportActivityAt?: number | null;
  healthState?: string | null;
  lifecycle?: ChannelAccountSnapshot["lifecycle"] | null;
  ingressUnavailable?: true | null;
  terminalDisconnect?: boolean | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  lastInboundAt?: number | null;
  lastOutboundAt?: number | null;
  busy?: boolean | null;
  activeRuns?: number | null;
  lastRunActivityAt?: number | null;
  activeRunStartedAt?: number | null;
};
type StatusSnapshotExtra = Record<string, unknown>;
/** Build the standard per-account status payload from config metadata plus runtime state. */
declare function buildBaseAccountStatusSnapshot<TExtra extends StatusSnapshotExtra>(params: {
  account: {
    accountId: string;
    name?: string;
    enabled?: boolean;
    configured?: boolean;
  };
  runtime?: RuntimeLifecycleSnapshot | null;
  probe?: unknown;
}, extra?: TExtra): {
  lastInboundAt: number | null;
  lastOutboundAt: number | null;
  activeRunStartedAt?: number | undefined;
  lastRunActivityAt?: number | undefined;
  activeRuns?: number | undefined;
  busy?: boolean | undefined;
  terminalDisconnect?: true | undefined;
  ingressUnavailable?: true | undefined;
  lifecycle?: "ready" | "starting" | "stopped" | "recovering" | "blocked" | undefined;
  healthState?: string | undefined;
  lastTransportActivityAt?: number | undefined;
  lastEventAt?: number | undefined;
  lastDisconnect?: string | {
    at: number;
    status?: number;
    error?: string;
    loggedOut?: boolean;
  } | undefined;
  lastConnectedAt?: number | undefined;
  reconnectAttempts?: number | undefined;
  restartPending?: boolean | undefined;
  connected?: boolean | undefined;
  linked?: boolean | undefined;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
  probe: unknown;
  accountId: string;
  name: string | undefined;
  enabled: boolean | undefined;
  configured: boolean | undefined;
} & TExtra;
/** Build token-based channel status summaries with optional mode reporting. */
declare function buildTokenChannelStatusSummary(snapshot: {
  configured?: boolean | null;
  tokenSource?: string | null;
  running?: boolean | null;
  mode?: string | null;
  lastStartAt?: number | null;
  lastStopAt?: number | null;
  lastError?: string | null;
  probe?: unknown;
  lastProbeAt?: number | null;
}, opts?: {
  includeMode?: boolean;
}): {
  tokenSource: string;
  probe: unknown;
  lastProbeAt: number | null;
  configured: boolean;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
} | {
  mode: string | null;
  tokenSource: string;
  probe: unknown;
  lastProbeAt: number | null;
  configured: boolean;
  running: boolean;
  lastStartAt: number | null;
  lastStopAt: number | null;
  lastError: string | null;
};
//#endregion
//#region src/infra/net/proxy-fetch.d.ts
/**
 * Create a fetch function that routes requests through the given HTTP proxy.
 * Uses undici's ProxyAgent under the hood.
 */
declare function makeProxyFetch(proxyUrl: string): typeof fetch;
//#endregion
//#region src/channels/chat-meta-shared.d.ts
/**
 * Metadata shown for built-in chat channels in setup, status, and selection UIs.
 */
type ChatChannelMeta = ChannelMeta;
//#endregion
//#region src/channels/chat-meta.d.ts
/**
 * Returns metadata for one built-in chat channel id.
 * Shipped plugin-SDK contract: callers pass bundled ids, so absence is an invariant
 * violation; drift-tolerant core paths use findChatChannelMeta instead.
 */
declare function getChatChannelMeta(id: ChatChannelId): ChatChannelMeta;
//#endregion
//#region extensions/telegram/src/config-schema.d.ts
declare const TelegramConfigSchema: ZodObject<{
  linkPreview: ZodOptional<ZodBoolean>;
  silentErrorReplies: ZodOptional<ZodBoolean>;
  errorPolicy: ZodOptional<ZodEnum<{
    silent: "silent";
    always: "always";
    once: "once";
  }>>;
  apiRoot: ZodOptional<ZodString>;
  trustedLocalFileRoots: ZodOptional<ZodArray<ZodString>>;
  autoTopicLabel: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    prompt: ZodOptional<ZodString>;
  }, $strict>]>>;
  ackReaction?: ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> | undefined;
  reactionLevel?: ZodOptional<ZodEnum<{
    [x: string]: string;
  }>> | undefined;
  reactionAllowlist?: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>> | undefined;
  reactionNotifications?: ZodOptional<ZodEnum<{
    [x: string]: string;
  }>> | undefined;
  execApprovals: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
    approvers: ZodOptional<ZodArray<ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>>>;
    agentFilter: ZodOptional<ZodArray<ZodString>>;
    sessionFilter: ZodOptional<ZodArray<ZodString>>;
    target: ZodOptional<ZodEnum<{
      channel: "channel";
      dm: "dm";
      both: "both";
    }>>;
  }, $strict>>;
  commands: ZodOptional<ZodObject<{
    native: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
    nativeSkills: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
  }, $strict>>;
  customCommands: ZodOptional<ZodArray<ZodObject<{
    command: ZodString;
    description: ZodString;
  }, $strict>>>;
  botToken: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
    source: ZodLiteral<"env">;
    provider: ZodString;
    id: ZodString;
  }, $strict>, ZodObject<{
    source: ZodLiteral<"file">;
    provider: ZodString;
    id: ZodString;
  }, $strict>, ZodObject<{
    source: ZodLiteral<"exec">;
    provider: ZodString;
    id: ZodString;
  }, $strict>], "source">]>>;
  tokenFile: ZodOptional<ZodString>;
  groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    requireMention: ZodOptional<ZodBoolean>;
    systemPrompt: ZodOptional<ZodString>;
    skills: ZodOptional<ZodArray<ZodString>>;
    tools: ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>;
    toolsBySender: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>>>;
    ingest: ZodOptional<ZodBoolean>;
    disableAudioPreflight: ZodOptional<ZodBoolean>;
    groupPolicy: ZodOptional<ZodEnum<{
      allowlist: "allowlist";
      open: "open";
      disabled: "disabled";
    }>>;
    topics: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      requireMention: ZodOptional<ZodBoolean>;
      ingest: ZodOptional<ZodBoolean>;
      disableAudioPreflight: ZodOptional<ZodBoolean>;
      groupPolicy: ZodOptional<ZodEnum<{
        allowlist: "allowlist";
        open: "open";
        disabled: "disabled";
      }>>;
      skills: ZodOptional<ZodArray<ZodString>>;
      enabled: ZodOptional<ZodBoolean>;
      allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
      systemPrompt: ZodOptional<ZodString>;
      agentId: ZodOptional<ZodString>;
      errorPolicy: ZodOptional<ZodEnum<{
        silent: "silent";
        always: "always";
        once: "once";
      }>>;
    }, $strict>>>>;
    errorPolicy: ZodOptional<ZodEnum<{
      silent: "silent";
      always: "always";
      once: "once";
    }>>;
  }, $strict>>>>;
  direct: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    dmPolicy: ZodOptional<ZodEnum<{
      pairing: "pairing";
      allowlist: "allowlist";
      open: "open";
      disabled: "disabled";
    }>>;
    tools: ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>;
    toolsBySender: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>>>;
    skills: ZodOptional<ZodArray<ZodString>>;
    enabled: ZodOptional<ZodBoolean>;
    allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    systemPrompt: ZodOptional<ZodString>;
    topics: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      requireMention: ZodOptional<ZodBoolean>;
      ingest: ZodOptional<ZodBoolean>;
      disableAudioPreflight: ZodOptional<ZodBoolean>;
      groupPolicy: ZodOptional<ZodEnum<{
        allowlist: "allowlist";
        open: "open";
        disabled: "disabled";
      }>>;
      skills: ZodOptional<ZodArray<ZodString>>;
      enabled: ZodOptional<ZodBoolean>;
      allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
      systemPrompt: ZodOptional<ZodString>;
      agentId: ZodOptional<ZodString>;
      errorPolicy: ZodOptional<ZodEnum<{
        silent: "silent";
        always: "always";
        once: "once";
      }>>;
    }, $strict>>>>;
    errorPolicy: ZodOptional<ZodEnum<{
      silent: "silent";
      always: "always";
      once: "once";
    }>>;
    requireTopic: ZodOptional<ZodBoolean>;
    autoTopicLabel: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      prompt: ZodOptional<ZodString>;
    }, $strict>]>>;
  }, $strict>>>>;
  richMessages: ZodOptional<ZodBoolean>;
  network: ZodOptional<ZodObject<{
    autoSelectFamily: ZodOptional<ZodBoolean>;
    dnsResultOrder: ZodOptional<ZodEnum<{
      ipv4first: "ipv4first";
      verbatim: "verbatim";
    }>>;
    dangerouslyAllowPrivateNetwork: ZodOptional<ZodBoolean>;
  }, $strict>>;
  proxy: ZodOptional<ZodString>;
  webhookUrl: ZodOptional<ZodString>;
  webhookSecret: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
    source: ZodLiteral<"env">;
    provider: ZodString;
    id: ZodString;
  }, $strict>, ZodObject<{
    source: ZodLiteral<"file">;
    provider: ZodString;
    id: ZodString;
  }, $strict>, ZodObject<{
    source: ZodLiteral<"exec">;
    provider: ZodString;
    id: ZodString;
  }, $strict>], "source">]>>;
  webhookPath: ZodOptional<ZodString>;
  webhookHost: ZodOptional<ZodString>;
  webhookPort: ZodOptional<ZodNumber>;
  webhookCertPath: ZodOptional<ZodString>;
  actions: ZodOptional<ZodObject<{
    reactions: ZodOptional<ZodBoolean>;
    sendMessage: ZodOptional<ZodBoolean>;
    poll: ZodOptional<ZodBoolean>;
    deleteMessage: ZodOptional<ZodBoolean>;
    editMessage: ZodOptional<ZodBoolean>;
    sticker: ZodOptional<ZodBoolean>;
    createForumTopic: ZodOptional<ZodBoolean>;
    editForumTopic: ZodOptional<ZodBoolean>;
  }, $strict>>;
  threadBindings: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    idleHours: ZodOptional<ZodNumber>;
    maxAgeHours: ZodOptional<ZodNumber>;
    spawnSessions: ZodOptional<ZodBoolean>;
    defaultSpawnContext: ZodOptional<ZodEnum<{
      fork: "fork";
      isolated: "isolated";
    }>>;
  }, $strict>>;
  name: ZodOptional<ZodString>;
  capabilities: ZodOptional<ZodUnion<readonly [ZodArray<ZodString>, ZodObject<{
    inlineButtons: ZodOptional<ZodEnum<{
      off: "off";
      group: "group";
      all: "all";
      allowlist: "allowlist";
      dm: "dm";
    }>>;
  }, $strict>]>>;
  streaming: ZodOptional<ZodObject<{
    mode: ZodOptional<ZodEnum<{
      off: "off";
      progress: "progress";
      block: "block";
      partial: "partial";
    }>>;
    chunkMode: ZodOptional<ZodEnum<{
      length: "length";
      newline: "newline";
    }>>;
    progress: ZodOptional<ZodObject<{
      label: ZodOptional<ZodUnion<readonly [ZodString, ZodLiteral<false>]>>;
      labels: ZodOptional<ZodArray<ZodString>>;
      maxLines: ZodOptional<ZodNumber>;
      maxLineChars: ZodOptional<ZodNumber>;
      render: ZodOptional<ZodEnum<{
        text: "text";
        rich: "rich";
      }>>;
      toolProgress: ZodOptional<ZodBoolean>;
      commandText: ZodOptional<ZodEnum<{
        status: "status";
        raw: "raw";
      }>>;
      commentary: ZodOptional<ZodBoolean>;
      narration: ZodOptional<ZodBoolean>;
    }, $strict>>;
    block: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      coalesce: ZodOptional<ZodObject<{
        minChars: ZodOptional<ZodNumber>;
        maxChars: ZodOptional<ZodNumber>;
        idleMs: ZodOptional<ZodNumber>;
      }, $strict>>;
    }, $strict>>;
    preview: ZodOptional<ZodObject<{
      chunk: ZodOptional<ZodObject<{
        minChars: ZodOptional<ZodNumber>;
        maxChars: ZodOptional<ZodNumber>;
        breakPreference: ZodOptional<ZodUnion<readonly [ZodLiteral<"paragraph">, ZodLiteral<"newline">, ZodLiteral<"sentence">]>>;
      }, $strict>>;
      toolProgress: ZodOptional<ZodBoolean>;
      commandText: ZodOptional<ZodEnum<{
        status: "status";
        raw: "raw";
      }>>;
    }, $strict>>;
  }, $strict>>;
  enabled: ZodOptional<ZodBoolean>;
  allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  defaultTo: ZodOptional<ZodUnion<readonly [ZodString, ZodNumber]>>;
  groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  mentionPatterns: ZodOptional<ZodObject<{
    mode: ZodOptional<ZodUnion<readonly [ZodLiteral<"allow">, ZodLiteral<"deny">]>>;
    allowIn: ZodOptional<ZodArray<ZodString>>;
    denyIn: ZodOptional<ZodArray<ZodString>>;
  }, $strict>>;
  mediaMaxMb: ZodOptional<ZodNumber>;
  replyToMode: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
  historyLimit: ZodOptional<ZodNumber>;
  markdown: ZodOptional<ZodObject<{
    tables: ZodOptional<ZodEnum<{
      off: "off";
      block: "block";
      bullets: "bullets";
      code: "code";
    }>>;
  }, $strict>>;
  configWrites: ZodOptional<ZodBoolean>;
  dmPolicy: ZodOptional<ZodEnum<{
    pairing: "pairing";
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    pairing: "pairing";
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>>>;
  groupPolicy: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>>>;
  contextVisibility: ZodOptional<ZodEnum<{
    all: "all";
    allowlist: "allowlist";
    allowlist_quote: "allowlist_quote";
  }>>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
  dms: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    historyLimit: ZodOptional<ZodNumber>;
  }, $strict>>>>;
  textChunkLimit: ZodOptional<ZodNumber>;
  heartbeatVisibility: ZodOptional<ZodObject<{
    showOk: ZodOptional<ZodBoolean>;
    showAlerts: ZodOptional<ZodBoolean>;
    useIndicator: ZodOptional<ZodBoolean>;
  }, $strict>>;
  healthMonitor: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
  }, $strict>>;
  responsePrefix: ZodOptional<ZodString>;
  accounts: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    linkPreview: ZodOptional<ZodBoolean>;
    silentErrorReplies: ZodOptional<ZodBoolean>;
    errorPolicy: ZodOptional<ZodEnum<{
      silent: "silent";
      always: "always";
      once: "once";
    }>>;
    apiRoot: ZodOptional<ZodString>;
    trustedLocalFileRoots: ZodOptional<ZodArray<ZodString>>;
    autoTopicLabel: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      prompt: ZodOptional<ZodString>;
    }, $strict>]>>;
    ackReaction?: ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> | undefined;
    reactionLevel?: ZodOptional<ZodEnum<{
      [x: string]: string;
    }>> | undefined;
    reactionAllowlist?: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>> | undefined;
    reactionNotifications?: ZodOptional<ZodEnum<{
      [x: string]: string;
    }>> | undefined;
    execApprovals: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
      approvers: ZodOptional<ZodArray<ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>>>;
      agentFilter: ZodOptional<ZodArray<ZodString>>;
      sessionFilter: ZodOptional<ZodArray<ZodString>>;
      target: ZodOptional<ZodEnum<{
        channel: "channel";
        dm: "dm";
        both: "both";
      }>>;
    }, $strict>>;
    commands: ZodOptional<ZodObject<{
      native: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
      nativeSkills: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
    }, $strict>>;
    customCommands: ZodOptional<ZodArray<ZodObject<{
      command: ZodString;
      description: ZodString;
    }, $strict>>>;
    botToken: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
      source: ZodLiteral<"env">;
      provider: ZodString;
      id: ZodString;
    }, $strict>, ZodObject<{
      source: ZodLiteral<"file">;
      provider: ZodString;
      id: ZodString;
    }, $strict>, ZodObject<{
      source: ZodLiteral<"exec">;
      provider: ZodString;
      id: ZodString;
    }, $strict>], "source">]>>;
    tokenFile: ZodOptional<ZodString>;
    groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
      requireMention: ZodOptional<ZodBoolean>;
      systemPrompt: ZodOptional<ZodString>;
      skills: ZodOptional<ZodArray<ZodString>>;
      tools: ZodOptional<ZodObject<{
        allow: ZodOptional<ZodArray<ZodString>>;
        alsoAllow: ZodOptional<ZodArray<ZodString>>;
        deny: ZodOptional<ZodArray<ZodString>>;
      }, $strict>>;
      toolsBySender: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
        allow: ZodOptional<ZodArray<ZodString>>;
        alsoAllow: ZodOptional<ZodArray<ZodString>>;
        deny: ZodOptional<ZodArray<ZodString>>;
      }, $strict>>>>;
      ingest: ZodOptional<ZodBoolean>;
      disableAudioPreflight: ZodOptional<ZodBoolean>;
      groupPolicy: ZodOptional<ZodEnum<{
        allowlist: "allowlist";
        open: "open";
        disabled: "disabled";
      }>>;
      topics: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
        requireMention: ZodOptional<ZodBoolean>;
        ingest: ZodOptional<ZodBoolean>;
        disableAudioPreflight: ZodOptional<ZodBoolean>;
        groupPolicy: ZodOptional<ZodEnum<{
          allowlist: "allowlist";
          open: "open";
          disabled: "disabled";
        }>>;
        skills: ZodOptional<ZodArray<ZodString>>;
        enabled: ZodOptional<ZodBoolean>;
        allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
        systemPrompt: ZodOptional<ZodString>;
        agentId: ZodOptional<ZodString>;
        errorPolicy: ZodOptional<ZodEnum<{
          silent: "silent";
          always: "always";
          once: "once";
        }>>;
      }, $strict>>>>;
      errorPolicy: ZodOptional<ZodEnum<{
        silent: "silent";
        always: "always";
        once: "once";
      }>>;
    }, $strict>>>>;
    direct: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      dmPolicy: ZodOptional<ZodEnum<{
        pairing: "pairing";
        allowlist: "allowlist";
        open: "open";
        disabled: "disabled";
      }>>;
      tools: ZodOptional<ZodObject<{
        allow: ZodOptional<ZodArray<ZodString>>;
        alsoAllow: ZodOptional<ZodArray<ZodString>>;
        deny: ZodOptional<ZodArray<ZodString>>;
      }, $strict>>;
      toolsBySender: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
        allow: ZodOptional<ZodArray<ZodString>>;
        alsoAllow: ZodOptional<ZodArray<ZodString>>;
        deny: ZodOptional<ZodArray<ZodString>>;
      }, $strict>>>>;
      skills: ZodOptional<ZodArray<ZodString>>;
      enabled: ZodOptional<ZodBoolean>;
      allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
      systemPrompt: ZodOptional<ZodString>;
      topics: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
        requireMention: ZodOptional<ZodBoolean>;
        ingest: ZodOptional<ZodBoolean>;
        disableAudioPreflight: ZodOptional<ZodBoolean>;
        groupPolicy: ZodOptional<ZodEnum<{
          allowlist: "allowlist";
          open: "open";
          disabled: "disabled";
        }>>;
        skills: ZodOptional<ZodArray<ZodString>>;
        enabled: ZodOptional<ZodBoolean>;
        allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
        systemPrompt: ZodOptional<ZodString>;
        agentId: ZodOptional<ZodString>;
        errorPolicy: ZodOptional<ZodEnum<{
          silent: "silent";
          always: "always";
          once: "once";
        }>>;
      }, $strict>>>>;
      errorPolicy: ZodOptional<ZodEnum<{
        silent: "silent";
        always: "always";
        once: "once";
      }>>;
      requireTopic: ZodOptional<ZodBoolean>;
      autoTopicLabel: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodObject<{
        enabled: ZodOptional<ZodBoolean>;
        prompt: ZodOptional<ZodString>;
      }, $strict>]>>;
    }, $strict>>>>;
    richMessages: ZodOptional<ZodBoolean>;
    network: ZodOptional<ZodObject<{
      autoSelectFamily: ZodOptional<ZodBoolean>;
      dnsResultOrder: ZodOptional<ZodEnum<{
        ipv4first: "ipv4first";
        verbatim: "verbatim";
      }>>;
      dangerouslyAllowPrivateNetwork: ZodOptional<ZodBoolean>;
    }, $strict>>;
    proxy: ZodOptional<ZodString>;
    webhookUrl: ZodOptional<ZodString>;
    webhookSecret: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
      source: ZodLiteral<"env">;
      provider: ZodString;
      id: ZodString;
    }, $strict>, ZodObject<{
      source: ZodLiteral<"file">;
      provider: ZodString;
      id: ZodString;
    }, $strict>, ZodObject<{
      source: ZodLiteral<"exec">;
      provider: ZodString;
      id: ZodString;
    }, $strict>], "source">]>>;
    webhookPath: ZodOptional<ZodString>;
    webhookHost: ZodOptional<ZodString>;
    webhookPort: ZodOptional<ZodNumber>;
    webhookCertPath: ZodOptional<ZodString>;
    actions: ZodOptional<ZodObject<{
      reactions: ZodOptional<ZodBoolean>;
      sendMessage: ZodOptional<ZodBoolean>;
      poll: ZodOptional<ZodBoolean>;
      deleteMessage: ZodOptional<ZodBoolean>;
      editMessage: ZodOptional<ZodBoolean>;
      sticker: ZodOptional<ZodBoolean>;
      createForumTopic: ZodOptional<ZodBoolean>;
      editForumTopic: ZodOptional<ZodBoolean>;
    }, $strict>>;
    threadBindings: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      idleHours: ZodOptional<ZodNumber>;
      maxAgeHours: ZodOptional<ZodNumber>;
      spawnSessions: ZodOptional<ZodBoolean>;
      defaultSpawnContext: ZodOptional<ZodEnum<{
        fork: "fork";
        isolated: "isolated";
      }>>;
    }, $strict>>;
    name: ZodOptional<ZodString>;
    capabilities: ZodOptional<ZodUnion<readonly [ZodArray<ZodString>, ZodObject<{
      inlineButtons: ZodOptional<ZodEnum<{
        off: "off";
        group: "group";
        all: "all";
        allowlist: "allowlist";
        dm: "dm";
      }>>;
    }, $strict>]>>;
    streaming: ZodOptional<ZodObject<{
      mode: ZodOptional<ZodEnum<{
        off: "off";
        progress: "progress";
        block: "block";
        partial: "partial";
      }>>;
      chunkMode: ZodOptional<ZodEnum<{
        length: "length";
        newline: "newline";
      }>>;
      progress: ZodOptional<ZodObject<{
        label: ZodOptional<ZodUnion<readonly [ZodString, ZodLiteral<false>]>>;
        labels: ZodOptional<ZodArray<ZodString>>;
        maxLines: ZodOptional<ZodNumber>;
        maxLineChars: ZodOptional<ZodNumber>;
        render: ZodOptional<ZodEnum<{
          text: "text";
          rich: "rich";
        }>>;
        toolProgress: ZodOptional<ZodBoolean>;
        commandText: ZodOptional<ZodEnum<{
          status: "status";
          raw: "raw";
        }>>;
        commentary: ZodOptional<ZodBoolean>;
        narration: ZodOptional<ZodBoolean>;
      }, $strict>>;
      block: ZodOptional<ZodObject<{
        enabled: ZodOptional<ZodBoolean>;
        coalesce: ZodOptional<ZodObject<{
          minChars: ZodOptional<ZodNumber>;
          maxChars: ZodOptional<ZodNumber>;
          idleMs: ZodOptional<ZodNumber>;
        }, $strict>>;
      }, $strict>>;
      preview: ZodOptional<ZodObject<{
        chunk: ZodOptional<ZodObject<{
          minChars: ZodOptional<ZodNumber>;
          maxChars: ZodOptional<ZodNumber>;
          breakPreference: ZodOptional<ZodUnion<readonly [ZodLiteral<"paragraph">, ZodLiteral<"newline">, ZodLiteral<"sentence">]>>;
        }, $strict>>;
        toolProgress: ZodOptional<ZodBoolean>;
        commandText: ZodOptional<ZodEnum<{
          status: "status";
          raw: "raw";
        }>>;
      }, $strict>>;
    }, $strict>>;
    enabled: ZodOptional<ZodBoolean>;
    allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    defaultTo: ZodOptional<ZodUnion<readonly [ZodString, ZodNumber]>>;
    groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    mentionPatterns: ZodOptional<ZodObject<{
      mode: ZodOptional<ZodUnion<readonly [ZodLiteral<"allow">, ZodLiteral<"deny">]>>;
      allowIn: ZodOptional<ZodArray<ZodString>>;
      denyIn: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>;
    mediaMaxMb: ZodOptional<ZodNumber>;
    replyToMode: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
    historyLimit: ZodOptional<ZodNumber>;
    markdown: ZodOptional<ZodObject<{
      tables: ZodOptional<ZodEnum<{
        off: "off";
        block: "block";
        bullets: "bullets";
        code: "code";
      }>>;
    }, $strict>>;
    configWrites: ZodOptional<ZodBoolean>;
    dmPolicy: ZodOptional<ZodEnum<{
      pairing: "pairing";
      allowlist: "allowlist";
      open: "open";
      disabled: "disabled";
    }>> | ZodDefault<ZodOptional<ZodEnum<{
      pairing: "pairing";
      allowlist: "allowlist";
      open: "open";
      disabled: "disabled";
    }>>>;
    groupPolicy: ZodOptional<ZodEnum<{
      allowlist: "allowlist";
      open: "open";
      disabled: "disabled";
    }>> | ZodDefault<ZodOptional<ZodEnum<{
      allowlist: "allowlist";
      open: "open";
      disabled: "disabled";
    }>>>;
    contextVisibility: ZodOptional<ZodEnum<{
      all: "all";
      allowlist: "allowlist";
      allowlist_quote: "allowlist_quote";
    }>>;
    dmHistoryLimit: ZodOptional<ZodNumber>;
    dms: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      historyLimit: ZodOptional<ZodNumber>;
    }, $strict>>>>;
    textChunkLimit: ZodOptional<ZodNumber>;
    heartbeatVisibility: ZodOptional<ZodObject<{
      showOk: ZodOptional<ZodBoolean>;
      showAlerts: ZodOptional<ZodBoolean>;
      useIndicator: ZodOptional<ZodBoolean>;
    }, $strict>>;
    healthMonitor: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
    }, $strict>>;
    responsePrefix: ZodOptional<ZodString>;
  }, $strict>>>>;
  defaultAccount: ZodOptional<ZodString>;
}, $strict>;
//#endregion
//#region extensions/telegram/src/group-access.d.ts
declare const resolveTelegramRuntimeGroupPolicy: (params: {
  providerConfigPresent: boolean;
  groupPolicy?: TelegramAccountConfig$1["groupPolicy"];
  defaultGroupPolicy?: TelegramAccountConfig$1["groupPolicy"];
}) => {
  groupPolicy: GroupPolicy;
  providerMissingFallbackApplied: boolean;
};
//#endregion
//#region extensions/telegram/src/exec-approval-forwarding.d.ts
declare function shouldSuppressTelegramExecApprovalForwardingFallback(params: {
  cfg: OpenClawConfig;
  target: {
    channel: string;
    accountId?: string | null;
  };
  request: ExecApprovalRequest;
}): boolean;
declare function buildTelegramExecApprovalPendingPayload(params: {
  request: ExecApprovalRequest;
  nowMs: number;
}): ReplyPayload;
//#endregion
//#region extensions/telegram/src/channel-actions.d.ts
declare const telegramMessageActions: ChannelMessageActionAdapter;
//#endregion
//#region extensions/telegram/src/monitor.d.ts
declare function monitorTelegramProvider(opts?: MonitorTelegramOpts): Promise<void>;
//#endregion
//#region extensions/telegram/src/poll-visibility.d.ts
declare function resolveTelegramPollVisibility(params: {
  pollAnonymous?: boolean;
  pollPublic?: boolean;
}): boolean | undefined;
//#endregion
//#region extensions/telegram/runtime-api.d.ts
type TelegramAccountConfig = NonNullable<NonNullable<OpenClawConfig["channels"]>["telegram"]>;
type TelegramActionConfig = NonNullable<TelegramAccountConfig["actions"]>;
type TelegramNetworkConfig = NonNullable<TelegramAccountConfig["network"]>;
//#endregion
export { PAIRING_APPROVED_MESSAGE as _, monitorTelegramProvider as a, DEFAULT_ACCOUNT_ID as b, shouldSuppressTelegramExecApprovalForwardingFallback as c, getChatChannelMeta as d, makeProxyFetch as f, resolveConfiguredFromCredentialStatuses as g, projectCredentialSnapshotFields as h, resolveTelegramPollVisibility as i, resolveTelegramRuntimeGroupPolicy as l, buildTokenChannelStatusSummary as m, TelegramActionConfig as n, telegramMessageActions as o, buildBaseAccountStatusSnapshot as p, TelegramNetworkConfig as r, buildTelegramExecApprovalPendingPayload as s, TelegramAccountConfig as t, TelegramConfigSchema as u, AcpRuntimeError as v, normalizeAccountId as x, AcpRuntimeErrorCode as y };