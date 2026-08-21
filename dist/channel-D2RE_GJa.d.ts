import { $ as ZodObject, Bh as $strip, Ct as ZodUnknown, H as ZodLiteral, St as ZodUnion, T as ZodEnum, Z as ZodNumber, a as ZodArray, b as ZodDefault, ch as $ZodTypeInternals, et as ZodOptional, gt as ZodType, lt as ZodString, mt as ZodTransform, ol as output, ot as ZodRecord, tt as ZodPipe, u as ZodBoolean, x as ZodDiscriminatedUnion, zh as $strict } from "./types.openclaw-_47ZKysp.js";
import { q as BaseProbeResult } from "./setup-wizard-types-B677hB7z.js";
import { n as ChannelPlugin } from "./types.public-CxoCYEcS.js";
//#region extensions/feishu/src/config-schema.d.ts
declare const FeishuConfigSchema: ZodObject<{
  dmPolicy: ZodDefault<ZodOptional<ZodEnum<{
    pairing: "pairing";
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>>>;
  reactionNotifications: ZodDefault<ZodOptional<ZodOptional<ZodEnum<{
    off: "off";
    all: "all";
    own: "own";
  }>>>>;
  groupPolicy: ZodDefault<ZodOptional<ZodUnion<readonly [ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>, ZodPipe<ZodLiteral<"allowall">, ZodTransform<"open", "allowall">>]>>>;
  requireMention: ZodOptional<ZodBoolean>;
  groupSessionScope: ZodOptional<ZodEnum<{
    group: "group";
    group_sender: "group_sender";
    group_topic: "group_topic";
    group_topic_sender: "group_topic_sender";
  }>>;
  topicSessionMode: ZodOptional<ZodEnum<{
    enabled: "enabled";
    disabled: "disabled";
  }>>;
  dynamicAgentCreation: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    workspaceTemplate: ZodOptional<ZodString>;
    agentDirTemplate: ZodOptional<ZodString>;
    maxAgents: ZodOptional<ZodNumber>;
  }, $strict>>;
  typingIndicator: ZodDefault<ZodOptional<ZodBoolean>>;
  resolveSenderNames: ZodDefault<ZodOptional<ZodBoolean>>;
  webhookHost: ZodOptional<ZodString>;
  webhookPort: ZodOptional<ZodNumber>;
  capabilities: ZodOptional<ZodArray<ZodString>>;
  markdown: ZodOptional<ZodObject<{
    mode: ZodOptional<ZodEnum<{
      native: "native";
      escape: "escape";
      strip: "strip";
    }>>;
    tableMode: ZodOptional<ZodEnum<{
      native: "native";
      ascii: "ascii";
      simple: "simple";
    }>>;
  }, $strict>>;
  configWrites: ZodOptional<ZodBoolean>;
  allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  groupSenderAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    enabled: ZodOptional<ZodBoolean>;
    tools: ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>> & ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>;
    skills: ZodOptional<ZodArray<ZodString>>;
    groupSessionScope: ZodOptional<ZodEnum<{
      group: "group";
      group_sender: "group_sender";
      group_topic: "group_topic";
      group_topic_sender: "group_topic_sender";
    }>>;
    topicSessionMode: ZodOptional<ZodEnum<{
      enabled: "enabled";
      disabled: "disabled";
    }>>;
    replyInThread: ZodOptional<ZodEnum<{
      enabled: "enabled";
      disabled: "disabled";
    }>>;
    requireMention: ZodOptional<ZodBoolean>;
    systemPrompt: ZodOptional<ZodString>;
  }, $strict>>>>;
  historyLimit: ZodOptional<ZodNumber>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
  dms: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    systemPrompt: ZodOptional<ZodString>;
  }, $strict>>>>;
  textChunkLimit: ZodOptional<ZodNumber>;
  mediaMaxMb: ZodOptional<ZodNumber>;
  httpTimeoutMs: ZodOptional<ZodNumber>;
  heartbeatVisibility: ZodOptional<ZodObject<{
    visibility: ZodOptional<ZodEnum<{
      visible: "visible";
      hidden: "hidden";
    }>>;
    intervalMs: ZodOptional<ZodNumber>;
  }, $strict>>;
  renderMode: ZodOptional<ZodEnum<{
    auto: "auto";
    raw: "raw";
    card: "card";
  }>>;
  streaming: ZodOptional<ZodObject<{
    mode: ZodOptional<ZodEnum<{
      off: "off";
      partial: "partial";
    }>>;
    chunkMode: ZodOptional<ZodEnum<{
      length: "length";
      newline: "newline";
    }>>;
    block: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      coalesce: ZodOptional<ZodObject<{
        minChars: ZodOptional<ZodNumber>;
        maxChars: ZodOptional<ZodNumber>;
        idleMs: ZodOptional<ZodNumber>;
      }, $strict>>;
    }, $strict>>;
  }, $strict>>;
  tools: ZodOptional<ZodObject<{
    doc: ZodOptional<ZodBoolean>;
    chat: ZodOptional<ZodBoolean>;
    wiki: ZodOptional<ZodBoolean>;
    drive: ZodOptional<ZodBoolean>;
    perm: ZodOptional<ZodBoolean>;
    scopes: ZodOptional<ZodBoolean>;
    bitable: ZodOptional<ZodBoolean>;
  }, $strict>>;
  actions: ZodOptional<ZodObject<{
    reactions: ZodOptional<ZodBoolean>;
  }, $strict>>;
  replyInThread: ZodOptional<ZodEnum<{
    enabled: "enabled";
    disabled: "disabled";
  }>>;
  allowBots: ZodOptional<ZodBoolean>;
  vcAutoJoin: ZodOptional<ZodBoolean>;
  tts: ZodOptional<ZodObject<{
    auto: ZodOptional<ZodEnum<{
      off: "off";
      always: "always";
      inbound: "inbound";
      tagged: "tagged";
    }>>;
    enabled: ZodOptional<ZodBoolean>;
    mode: ZodOptional<ZodEnum<{
      all: "all";
      final: "final";
    }>>;
    provider: ZodOptional<ZodString>;
    persona: ZodOptional<ZodString>;
    personas: ZodOptional<ZodRecord<ZodString, ZodRecord<ZodString, ZodUnknown>>>;
    summaryModel: ZodOptional<ZodString>;
    modelOverrides: ZodOptional<ZodRecord<ZodString, ZodUnknown>>;
    providers: ZodOptional<ZodRecord<ZodString, ZodRecord<ZodString, ZodUnknown>>>;
    prefsPath: ZodOptional<ZodString>;
    maxTextLength: ZodOptional<ZodNumber>;
    timeoutMs: ZodOptional<ZodNumber>;
  }, $strict>>;
  enabled: ZodOptional<ZodBoolean>;
  appId: ZodOptional<ZodString>;
  appSecret: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
  encryptKey: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
  verificationToken: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
  domain: ZodDefault<ZodOptional<ZodUnion<readonly [ZodEnum<{
    feishu: "feishu";
    lark: "lark";
  }>, ZodString]>>>;
  connectionMode: ZodDefault<ZodOptional<ZodEnum<{
    websocket: "websocket";
    webhook: "webhook";
  }>>>;
  webhookPath: ZodDefault<ZodOptional<ZodString>>;
  accounts: ZodOptional<ZodType<Record<string, {
    groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
    topicSessionMode?: "enabled" | "disabled" | undefined;
    webhookHost?: string | undefined;
    webhookPort?: number | undefined;
    capabilities?: string[] | undefined;
    markdown?: {
      mode?: "native" | "escape" | "strip" | undefined;
      tableMode?: "native" | "ascii" | "simple" | undefined;
    } | undefined;
    configWrites?: boolean | undefined;
    dmPolicy?: "pairing" | "allowlist" | "open" | "disabled" | undefined;
    allowFrom?: (string | number)[] | undefined;
    groupPolicy?: "allowlist" | "open" | "disabled" | undefined;
    groupAllowFrom?: (string | number)[] | undefined;
    groupSenderAllowFrom?: (string | number)[] | undefined;
    requireMention?: boolean | undefined;
    groups?: Record<string, {
      allowFrom?: (string | number)[] | undefined;
      enabled?: boolean | undefined;
      tools?: ({
        allow?: string[] | undefined;
        alsoAllow?: string[] | undefined;
        deny?: string[] | undefined;
      } & {
        allow?: string[] | undefined;
        deny?: string[] | undefined;
      }) | undefined;
      skills?: string[] | undefined;
      groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
      topicSessionMode?: "enabled" | "disabled" | undefined;
      replyInThread?: "enabled" | "disabled" | undefined;
      requireMention?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    historyLimit?: number | undefined;
    dmHistoryLimit?: number | undefined;
    dms?: Record<string, {
      enabled?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    textChunkLimit?: number | undefined;
    mediaMaxMb?: number | undefined;
    httpTimeoutMs?: number | undefined;
    heartbeatVisibility?: {
      visibility?: "visible" | "hidden" | undefined;
      intervalMs?: number | undefined;
    } | undefined;
    renderMode?: "auto" | "raw" | "card" | undefined;
    streaming?: {
      mode?: "off" | "partial" | undefined;
      chunkMode?: "length" | "newline" | undefined;
      block?: {
        enabled?: boolean | undefined;
        coalesce?: {
          minChars?: number | undefined;
          maxChars?: number | undefined;
          idleMs?: number | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    tools?: {
      doc?: boolean | undefined;
      chat?: boolean | undefined;
      wiki?: boolean | undefined;
      drive?: boolean | undefined;
      perm?: boolean | undefined;
      scopes?: boolean | undefined;
      bitable?: boolean | undefined;
    } | undefined;
    actions?: {
      reactions?: boolean | undefined;
    } | undefined;
    replyInThread?: "enabled" | "disabled" | undefined;
    reactionNotifications?: "off" | "all" | "own" | undefined;
    typingIndicator?: boolean | undefined;
    resolveSenderNames?: boolean | undefined;
    allowBots?: boolean | undefined;
    vcAutoJoin?: boolean | undefined;
    tts?: {
      auto?: "off" | "always" | "inbound" | "tagged" | undefined;
      enabled?: boolean | undefined;
      mode?: "all" | "final" | undefined;
      provider?: string | undefined;
      persona?: string | undefined;
      personas?: Record<string, Record<string, unknown>> | undefined;
      summaryModel?: string | undefined;
      modelOverrides?: Record<string, unknown> | undefined;
      providers?: Record<string, Record<string, unknown>> | undefined;
      prefsPath?: string | undefined;
      maxTextLength?: number | undefined;
      timeoutMs?: number | undefined;
    } | undefined;
    enabled?: boolean | undefined;
    name?: string | undefined;
    appId?: string | undefined;
    appSecret?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    encryptKey?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    verificationToken?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    domain?: string | undefined;
    connectionMode?: "websocket" | "webhook" | undefined;
    webhookPath?: string | undefined;
  } | undefined>, Record<string, {
    groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
    topicSessionMode?: "enabled" | "disabled" | undefined;
    webhookHost?: string | undefined;
    webhookPort?: number | undefined;
    capabilities?: string[] | undefined;
    markdown?: {
      mode?: "native" | "escape" | "strip" | undefined;
      tableMode?: "native" | "ascii" | "simple" | undefined;
    } | undefined;
    configWrites?: boolean | undefined;
    dmPolicy?: "pairing" | "allowlist" | "open" | "disabled" | undefined;
    allowFrom?: (string | number)[] | undefined;
    groupPolicy?: "allowlist" | "open" | "disabled" | "allowall" | undefined;
    groupAllowFrom?: (string | number)[] | undefined;
    groupSenderAllowFrom?: (string | number)[] | undefined;
    requireMention?: boolean | undefined;
    groups?: Record<string, {
      allowFrom?: (string | number)[] | undefined;
      enabled?: boolean | undefined;
      tools?: ({
        allow?: string[] | undefined;
        alsoAllow?: string[] | undefined;
        deny?: string[] | undefined;
      } & {
        allow?: string[] | undefined;
        deny?: string[] | undefined;
      }) | undefined;
      skills?: string[] | undefined;
      groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
      topicSessionMode?: "enabled" | "disabled" | undefined;
      replyInThread?: "enabled" | "disabled" | undefined;
      requireMention?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    historyLimit?: number | undefined;
    dmHistoryLimit?: number | undefined;
    dms?: Record<string, {
      enabled?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    textChunkLimit?: number | undefined;
    mediaMaxMb?: number | undefined;
    httpTimeoutMs?: number | undefined;
    heartbeatVisibility?: {
      visibility?: "visible" | "hidden" | undefined;
      intervalMs?: number | undefined;
    } | undefined;
    renderMode?: "auto" | "raw" | "card" | undefined;
    streaming?: {
      mode?: "off" | "partial" | undefined;
      chunkMode?: "length" | "newline" | undefined;
      block?: {
        enabled?: boolean | undefined;
        coalesce?: {
          minChars?: number | undefined;
          maxChars?: number | undefined;
          idleMs?: number | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    tools?: {
      doc?: boolean | undefined;
      chat?: boolean | undefined;
      wiki?: boolean | undefined;
      drive?: boolean | undefined;
      perm?: boolean | undefined;
      scopes?: boolean | undefined;
      bitable?: boolean | undefined;
    } | undefined;
    actions?: {
      reactions?: boolean | undefined;
    } | undefined;
    replyInThread?: "enabled" | "disabled" | undefined;
    reactionNotifications?: "off" | "all" | "own" | undefined;
    typingIndicator?: boolean | undefined;
    resolveSenderNames?: boolean | undefined;
    allowBots?: boolean | undefined;
    vcAutoJoin?: boolean | undefined;
    tts?: {
      auto?: "off" | "always" | "inbound" | "tagged" | undefined;
      enabled?: boolean | undefined;
      mode?: "all" | "final" | undefined;
      provider?: string | undefined;
      persona?: string | undefined;
      personas?: Record<string, Record<string, unknown>> | undefined;
      summaryModel?: string | undefined;
      modelOverrides?: Record<string, unknown> | undefined;
      providers?: Record<string, Record<string, unknown>> | undefined;
      prefsPath?: string | undefined;
      maxTextLength?: number | undefined;
      timeoutMs?: number | undefined;
    } | undefined;
    enabled?: boolean | undefined;
    name?: string | undefined;
    appId?: string | undefined;
    appSecret?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    encryptKey?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    verificationToken?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    domain?: string | undefined;
    connectionMode?: "websocket" | "webhook" | undefined;
    webhookPath?: string | undefined;
  } | undefined>, $ZodTypeInternals<Record<string, {
    groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
    topicSessionMode?: "enabled" | "disabled" | undefined;
    webhookHost?: string | undefined;
    webhookPort?: number | undefined;
    capabilities?: string[] | undefined;
    markdown?: {
      mode?: "native" | "escape" | "strip" | undefined;
      tableMode?: "native" | "ascii" | "simple" | undefined;
    } | undefined;
    configWrites?: boolean | undefined;
    dmPolicy?: "pairing" | "allowlist" | "open" | "disabled" | undefined;
    allowFrom?: (string | number)[] | undefined;
    groupPolicy?: "allowlist" | "open" | "disabled" | undefined;
    groupAllowFrom?: (string | number)[] | undefined;
    groupSenderAllowFrom?: (string | number)[] | undefined;
    requireMention?: boolean | undefined;
    groups?: Record<string, {
      allowFrom?: (string | number)[] | undefined;
      enabled?: boolean | undefined;
      tools?: ({
        allow?: string[] | undefined;
        alsoAllow?: string[] | undefined;
        deny?: string[] | undefined;
      } & {
        allow?: string[] | undefined;
        deny?: string[] | undefined;
      }) | undefined;
      skills?: string[] | undefined;
      groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
      topicSessionMode?: "enabled" | "disabled" | undefined;
      replyInThread?: "enabled" | "disabled" | undefined;
      requireMention?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    historyLimit?: number | undefined;
    dmHistoryLimit?: number | undefined;
    dms?: Record<string, {
      enabled?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    textChunkLimit?: number | undefined;
    mediaMaxMb?: number | undefined;
    httpTimeoutMs?: number | undefined;
    heartbeatVisibility?: {
      visibility?: "visible" | "hidden" | undefined;
      intervalMs?: number | undefined;
    } | undefined;
    renderMode?: "auto" | "raw" | "card" | undefined;
    streaming?: {
      mode?: "off" | "partial" | undefined;
      chunkMode?: "length" | "newline" | undefined;
      block?: {
        enabled?: boolean | undefined;
        coalesce?: {
          minChars?: number | undefined;
          maxChars?: number | undefined;
          idleMs?: number | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    tools?: {
      doc?: boolean | undefined;
      chat?: boolean | undefined;
      wiki?: boolean | undefined;
      drive?: boolean | undefined;
      perm?: boolean | undefined;
      scopes?: boolean | undefined;
      bitable?: boolean | undefined;
    } | undefined;
    actions?: {
      reactions?: boolean | undefined;
    } | undefined;
    replyInThread?: "enabled" | "disabled" | undefined;
    reactionNotifications?: "off" | "all" | "own" | undefined;
    typingIndicator?: boolean | undefined;
    resolveSenderNames?: boolean | undefined;
    allowBots?: boolean | undefined;
    vcAutoJoin?: boolean | undefined;
    tts?: {
      auto?: "off" | "always" | "inbound" | "tagged" | undefined;
      enabled?: boolean | undefined;
      mode?: "all" | "final" | undefined;
      provider?: string | undefined;
      persona?: string | undefined;
      personas?: Record<string, Record<string, unknown>> | undefined;
      summaryModel?: string | undefined;
      modelOverrides?: Record<string, unknown> | undefined;
      providers?: Record<string, Record<string, unknown>> | undefined;
      prefsPath?: string | undefined;
      maxTextLength?: number | undefined;
      timeoutMs?: number | undefined;
    } | undefined;
    enabled?: boolean | undefined;
    name?: string | undefined;
    appId?: string | undefined;
    appSecret?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    encryptKey?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    verificationToken?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    domain?: string | undefined;
    connectionMode?: "websocket" | "webhook" | undefined;
    webhookPath?: string | undefined;
  } | undefined>, Record<string, {
    groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
    topicSessionMode?: "enabled" | "disabled" | undefined;
    webhookHost?: string | undefined;
    webhookPort?: number | undefined;
    capabilities?: string[] | undefined;
    markdown?: {
      mode?: "native" | "escape" | "strip" | undefined;
      tableMode?: "native" | "ascii" | "simple" | undefined;
    } | undefined;
    configWrites?: boolean | undefined;
    dmPolicy?: "pairing" | "allowlist" | "open" | "disabled" | undefined;
    allowFrom?: (string | number)[] | undefined;
    groupPolicy?: "allowlist" | "open" | "disabled" | "allowall" | undefined;
    groupAllowFrom?: (string | number)[] | undefined;
    groupSenderAllowFrom?: (string | number)[] | undefined;
    requireMention?: boolean | undefined;
    groups?: Record<string, {
      allowFrom?: (string | number)[] | undefined;
      enabled?: boolean | undefined;
      tools?: ({
        allow?: string[] | undefined;
        alsoAllow?: string[] | undefined;
        deny?: string[] | undefined;
      } & {
        allow?: string[] | undefined;
        deny?: string[] | undefined;
      }) | undefined;
      skills?: string[] | undefined;
      groupSessionScope?: "group" | "group_sender" | "group_topic" | "group_topic_sender" | undefined;
      topicSessionMode?: "enabled" | "disabled" | undefined;
      replyInThread?: "enabled" | "disabled" | undefined;
      requireMention?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    historyLimit?: number | undefined;
    dmHistoryLimit?: number | undefined;
    dms?: Record<string, {
      enabled?: boolean | undefined;
      systemPrompt?: string | undefined;
    } | undefined> | undefined;
    textChunkLimit?: number | undefined;
    mediaMaxMb?: number | undefined;
    httpTimeoutMs?: number | undefined;
    heartbeatVisibility?: {
      visibility?: "visible" | "hidden" | undefined;
      intervalMs?: number | undefined;
    } | undefined;
    renderMode?: "auto" | "raw" | "card" | undefined;
    streaming?: {
      mode?: "off" | "partial" | undefined;
      chunkMode?: "length" | "newline" | undefined;
      block?: {
        enabled?: boolean | undefined;
        coalesce?: {
          minChars?: number | undefined;
          maxChars?: number | undefined;
          idleMs?: number | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    tools?: {
      doc?: boolean | undefined;
      chat?: boolean | undefined;
      wiki?: boolean | undefined;
      drive?: boolean | undefined;
      perm?: boolean | undefined;
      scopes?: boolean | undefined;
      bitable?: boolean | undefined;
    } | undefined;
    actions?: {
      reactions?: boolean | undefined;
    } | undefined;
    replyInThread?: "enabled" | "disabled" | undefined;
    reactionNotifications?: "off" | "all" | "own" | undefined;
    typingIndicator?: boolean | undefined;
    resolveSenderNames?: boolean | undefined;
    allowBots?: boolean | undefined;
    vcAutoJoin?: boolean | undefined;
    tts?: {
      auto?: "off" | "always" | "inbound" | "tagged" | undefined;
      enabled?: boolean | undefined;
      mode?: "all" | "final" | undefined;
      provider?: string | undefined;
      persona?: string | undefined;
      personas?: Record<string, Record<string, unknown>> | undefined;
      summaryModel?: string | undefined;
      modelOverrides?: Record<string, unknown> | undefined;
      providers?: Record<string, Record<string, unknown>> | undefined;
      prefsPath?: string | undefined;
      maxTextLength?: number | undefined;
      timeoutMs?: number | undefined;
    } | undefined;
    enabled?: boolean | undefined;
    name?: string | undefined;
    appId?: string | undefined;
    appSecret?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    encryptKey?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    verificationToken?: string | {
      source: "env";
      provider: string;
      id: string;
    } | {
      source: "file";
      provider: string;
      id: string;
    } | {
      source: "exec";
      provider: string;
      id: string;
    } | undefined;
    domain?: string | undefined;
    connectionMode?: "websocket" | "webhook" | undefined;
    webhookPath?: string | undefined;
  } | undefined>>>>;
  defaultAccount: ZodOptional<ZodString>;
}, $strip>;
//#endregion
//#region extensions/feishu/src/types.d.ts
type FeishuConfig = output<typeof FeishuConfigSchema>;
type FeishuDomain = "feishu" | "lark" | (string & {});
type FeishuDefaultAccountSelectionSource = "explicit-default" | "mapped-default" | "fallback";
type FeishuAccountSelectionSource = "explicit" | FeishuDefaultAccountSelectionSource;
type ResolvedFeishuAccount = {
  accountId: string;
  selectionSource: FeishuAccountSelectionSource;
  enabled: boolean;
  configured: boolean;
  name?: string;
  appId?: string;
  appSecret?: string;
  encryptKey?: string;
  verificationToken?: string;
  domain: FeishuDomain; /** Merged config (top-level defaults + account-specific overrides) */
  config: FeishuConfig;
};
interface FeishuProbeResult extends BaseProbeResult {
  appId?: string;
  botName?: string;
  botOpenId?: string;
}
//#endregion
//#region extensions/feishu/src/channel.d.ts
declare const feishuPlugin: ChannelPlugin<ResolvedFeishuAccount, FeishuProbeResult>;
//#endregion
export { feishuPlugin as t };