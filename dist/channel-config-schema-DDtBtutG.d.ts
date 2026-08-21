import { B as ZodLiteral, C as ZodEnum, Lh as $strict, Q as ZodOptional, Y as ZodNumber, Z as ZodObject, bt as ZodUnion, c as ZodBoolean, it as ZodRecord, mt as ZodType, oh as $ZodTypeInternals, r as ZodArray, st as ZodString, v as ZodDefault } from "./schemas-Cx92lENn.js";
import { i as ZodRawShape } from "./compat-2AtJe-lv.js";
//#region src/config/zod-schema.channels-config.d.ts
declare const ChannelBotLoopProtectionSchema: ZodObject<{
  enabled: ZodOptional<ZodBoolean>;
  maxEventsPerWindow: ZodOptional<ZodNumber>;
  windowSeconds: ZodOptional<ZodNumber>;
  cooldownSeconds: ZodOptional<ZodNumber>;
}, $strict>;
//#endregion
//#region src/config/zod-schema.channel-messaging-common.d.ts
declare const UnifiedStreamingModeSchema: ZodEnum<{
  block: "block";
  off: "off";
  progress: "progress";
  partial: "partial";
}>;
declare const ChannelStreamingPreviewSchema: ZodObject<{
  chunk: ZodOptional<ZodObject<{
    minChars: ZodOptional<ZodNumber>;
    maxChars: ZodOptional<ZodNumber>;
    breakPreference: ZodOptional<ZodUnion<readonly [ZodLiteral<"paragraph">, ZodLiteral<"newline">, ZodLiteral<"sentence">]>>;
  }, $strict>>;
  toolProgress: ZodOptional<ZodBoolean>;
  commandText: ZodOptional<ZodEnum<{
    raw: "raw";
    status: "status";
  }>>;
}, $strict>;
declare const ChannelStreamingProgressSchema: ZodObject<{
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
    raw: "raw";
    status: "status";
  }>>;
  commentary: ZodOptional<ZodBoolean>;
  narration: ZodOptional<ZodBoolean>;
}, $strict>;
declare const ChannelPreviewStreamingConfigSchema: ZodObject<{
  mode: ZodOptional<ZodEnum<{
    block: "block";
    off: "off";
    progress: "progress";
    partial: "partial";
  }>>;
  chunkMode: ZodOptional<ZodEnum<{
    length: "length";
    newline: "newline";
  }>>;
  preview: ZodOptional<ZodObject<{
    chunk: ZodOptional<ZodObject<{
      minChars: ZodOptional<ZodNumber>;
      maxChars: ZodOptional<ZodNumber>;
      breakPreference: ZodOptional<ZodUnion<readonly [ZodLiteral<"paragraph">, ZodLiteral<"newline">, ZodLiteral<"sentence">]>>;
    }, $strict>>;
    toolProgress: ZodOptional<ZodBoolean>;
    commandText: ZodOptional<ZodEnum<{
      raw: "raw";
      status: "status";
    }>>;
  }, $strict>>;
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
      raw: "raw";
      status: "status";
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
}, $strict>;
declare const CommonCapabilitiesSchema: ZodOptional<ZodArray<ZodString>>;
declare const CommonIdListSchema: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
declare const CommonDefaultToSchema: ZodOptional<ZodString>;
declare const CommonMentionPatternsSchema: ZodOptional<ZodObject<{
  mode: ZodOptional<ZodUnion<readonly [ZodLiteral<"allow">, ZodLiteral<"deny">]>>;
  allowIn: ZodOptional<ZodArray<ZodString>>;
  denyIn: ZodOptional<ZodArray<ZodString>>;
}, $strict>>;
declare const CommonStreamingSchema: ZodOptional<ZodObject<{
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
declare const CommonMediaMaxMbSchema: ZodOptional<ZodNumber>;
declare const CommonReplyToModeSchema: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
type CommonChannelAccountShapeOptions<TCapabilities extends ZodType = typeof CommonCapabilitiesSchema, TAllowFrom extends ZodType<Array<string | number> | undefined> = typeof CommonIdListSchema, TDefaultTo extends ZodType<string | number | undefined> = typeof CommonDefaultToSchema, TGroupAllowFrom extends ZodType<Array<string | number> | undefined> = typeof CommonIdListSchema, TMentionPatterns extends ZodType = typeof CommonMentionPatternsSchema, TStreaming extends ZodType = typeof CommonStreamingSchema, TMediaMaxMb extends ZodType = typeof CommonMediaMaxMbSchema, TReplyToMode extends ZodType = typeof CommonReplyToModeSchema> = {
  useDefaults?: boolean;
  dmPolicyDefault?: boolean;
  groupPolicyDefault?: boolean;
  omit?: readonly CommonChannelAccountField[];
  capabilities?: TCapabilities;
  allowFrom?: TAllowFrom;
  defaultTo?: TDefaultTo;
  groupAllowFrom?: TGroupAllowFrom;
  mentionPatterns?: TMentionPatterns;
  streaming?: TStreaming;
  mediaMaxMb?: TMediaMaxMb;
  replyToMode?: TReplyToMode;
};
declare function createCommonChannelAccountShape<TCapabilities extends ZodType = typeof CommonCapabilitiesSchema, TAllowFrom extends ZodType<Array<string | number> | undefined> = typeof CommonIdListSchema, TDefaultTo extends ZodType<string | number | undefined> = typeof CommonDefaultToSchema, TGroupAllowFrom extends ZodType<Array<string | number> | undefined> = typeof CommonIdListSchema, TMentionPatterns extends ZodType = typeof CommonMentionPatternsSchema, TStreaming extends ZodType = typeof CommonStreamingSchema, TMediaMaxMb extends ZodType = typeof CommonMediaMaxMbSchema, TReplyToMode extends ZodType = typeof CommonReplyToModeSchema>(options: CommonChannelAccountShapeOptions<TCapabilities, TAllowFrom, TDefaultTo, TGroupAllowFrom, TMentionPatterns, TStreaming, TMediaMaxMb, TReplyToMode>): {
  name: ZodOptional<ZodString>;
  capabilities: TCapabilities;
  markdown: ZodOptional<ZodObject<{
    tables: ZodOptional<ZodEnum<{
      code: "code";
      block: "block";
      off: "off";
      bullets: "bullets";
    }>>;
  }, $strict>>;
  configWrites: ZodOptional<ZodBoolean>;
  enabled: ZodOptional<ZodBoolean>;
  dmPolicy: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
    pairing: "pairing";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
    pairing: "pairing";
  }>>>;
  allowFrom: TAllowFrom;
  defaultTo: TDefaultTo;
  groupAllowFrom: TGroupAllowFrom;
  groupPolicy: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>>>;
  mentionPatterns: TMentionPatterns;
  contextVisibility: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    all: "all";
    allowlist_quote: "allowlist_quote";
  }>>;
  historyLimit: ZodOptional<ZodNumber>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
  dms: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    historyLimit: ZodOptional<ZodNumber>;
  }, $strict>>>>;
  textChunkLimit: ZodOptional<ZodNumber>;
  streaming: TStreaming;
  heartbeatVisibility: ZodOptional<ZodObject<{
    showOk: ZodOptional<ZodBoolean>;
    showAlerts: ZodOptional<ZodBoolean>;
    useIndicator: ZodOptional<ZodBoolean>;
  }, $strict>>;
  healthMonitor: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
  }, $strict>>;
  responsePrefix: ZodOptional<ZodString>;
  mediaMaxMb: TMediaMaxMb;
  replyToMode: TReplyToMode;
};
type CommonChannelAccountShape = ReturnType<typeof createCommonChannelAccountShape>;
type CommonChannelAccountField = keyof CommonChannelAccountShape;
/** Build shared channel account leaves while preserving channel-specific omissions and schemas. */
declare function buildCommonChannelAccountShape<TCapabilities extends ZodType = typeof CommonCapabilitiesSchema, TAllowFrom extends ZodType<Array<string | number> | undefined> = typeof CommonIdListSchema, TDefaultTo extends ZodType<string | number | undefined> = typeof CommonDefaultToSchema, TGroupAllowFrom extends ZodType<Array<string | number> | undefined> = typeof CommonIdListSchema, TMentionPatterns extends ZodType = typeof CommonMentionPatternsSchema, TStreaming extends ZodType = typeof CommonStreamingSchema, TMediaMaxMb extends ZodType = typeof CommonMediaMaxMbSchema, TReplyToMode extends ZodType = typeof CommonReplyToModeSchema, const TOmit extends readonly CommonChannelAccountField[] = []>(options?: Omit<CommonChannelAccountShapeOptions<TCapabilities, TAllowFrom, TDefaultTo, TGroupAllowFrom, TMentionPatterns, TStreaming, TMediaMaxMb, TReplyToMode>, "omit"> & {
  omit?: TOmit;
}): Omit<{
  name: ZodOptional<ZodString>;
  capabilities: TCapabilities;
  markdown: ZodOptional<ZodObject<{
    tables: ZodOptional<ZodEnum<{
      code: "code";
      block: "block";
      off: "off";
      bullets: "bullets";
    }>>;
  }, $strict>>;
  configWrites: ZodOptional<ZodBoolean>;
  enabled: ZodOptional<ZodBoolean>;
  dmPolicy: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
    pairing: "pairing";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
    pairing: "pairing";
  }>>>;
  allowFrom: TAllowFrom;
  defaultTo: TDefaultTo;
  groupAllowFrom: TGroupAllowFrom;
  groupPolicy: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
  }>>>;
  mentionPatterns: TMentionPatterns;
  contextVisibility: ZodOptional<ZodEnum<{
    allowlist: "allowlist";
    all: "all";
    allowlist_quote: "allowlist_quote";
  }>>;
  historyLimit: ZodOptional<ZodNumber>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
  dms: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    historyLimit: ZodOptional<ZodNumber>;
  }, $strict>>>>;
  textChunkLimit: ZodOptional<ZodNumber>;
  streaming: TStreaming;
  heartbeatVisibility: ZodOptional<ZodObject<{
    showOk: ZodOptional<ZodBoolean>;
    showAlerts: ZodOptional<ZodBoolean>;
    useIndicator: ZodOptional<ZodBoolean>;
  }, $strict>>;
  healthMonitor: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
  }, $strict>>;
  responsePrefix: ZodOptional<ZodString>;
  mediaMaxMb: TMediaMaxMb;
  replyToMode: TReplyToMode;
}, TOmit[number]>;
declare const ChannelDangerouslyAllowNameMatchingSchema: ZodOptional<ZodBoolean>;
declare const ChannelSendReadReceiptsSchema: ZodOptional<ZodBoolean>;
/** Build the shared allowBots leaf without widening boolean-only channels. */
declare function buildChannelAllowBotsSchema(options?: {
  allowMentions?: boolean;
}): ZodOptional<ZodBoolean> | ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"mentions">]>>;
/** Build native exec-approval routing with channel-specific approver ids and extras. */
declare function buildChannelExecApprovalsSchema<T extends ZodRawShape = Record<never, never>>(approverSchema: ZodType, extraShape?: T): ZodOptional<ZodObject<{
  enabled: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
  approvers: ZodOptional<ZodArray<ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>>>;
  agentFilter: ZodOptional<ZodArray<ZodString>>;
  sessionFilter: ZodOptional<ZodArray<ZodString>>;
  target: ZodOptional<ZodEnum<{
    dm: "dm";
    channel: "channel";
    both: "both";
  }>>;
} & T extends infer T_1 ? { -readonly [P in keyof T_1]: T_1[P] } : never, $strict>>;
type ChannelReactionShapeOptions = {
  notificationModes?: readonly [string, string, ...string[]];
  reactionLevels?: readonly [string, string, ...string[]];
  reactionAllowlist?: boolean;
  ackReaction?: ZodType;
};
/** Build the repeated reaction leaves while retaining each channel's exact enum. */
declare function buildChannelReactionShape(options: ChannelReactionShapeOptions): {
  ackReaction?: ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> | undefined;
  reactionLevel?: ZodOptional<ZodEnum<{
    [x: string]: string;
  }>> | undefined;
  reactionAllowlist?: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>> | undefined;
  reactionNotifications?: ZodOptional<ZodEnum<{
    [x: string]: string;
  }>> | undefined;
};
//#endregion
//#region src/config/zod-schema.implicit-mentions.d.ts
declare const ChannelImplicitMentionsSchema: ZodObject<{
  replyToBot: ZodOptional<ZodBoolean>;
  quotedBot: ZodOptional<ZodBoolean>;
  threadParticipation: ZodOptional<ZodBoolean>;
}, $strict>;
//#endregion
export { ChannelStreamingPreviewSchema as a, buildChannelAllowBotsSchema as c, buildCommonChannelAccountShape as d, ChannelBotLoopProtectionSchema as f, ChannelSendReadReceiptsSchema as i, buildChannelExecApprovalsSchema as l, ChannelDangerouslyAllowNameMatchingSchema as n, ChannelStreamingProgressSchema as o, ChannelPreviewStreamingConfigSchema as r, UnifiedStreamingModeSchema as s, ChannelImplicitMentionsSchema as t, buildChannelReactionShape as u };