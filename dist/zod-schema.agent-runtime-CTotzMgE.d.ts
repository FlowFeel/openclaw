import { B as ZodLiteral, C as ZodEnum, Lh as $strict, Lr as $RefinementCtx, Ph as $catchall, Q as ZodOptional, Y as ZodNumber, Z as ZodObject, bt as ZodUnion, c as ZodBoolean, it as ZodRecord, q as ZodNull, r as ZodArray, st as ZodString, xt as ZodUnknown, y as ZodDiscriminatedUnion } from "./schemas-Cx92lENn.js";

//#region src/config/zod-schema.core.d.ts
declare const MentionPatternsPolicySchema: ZodObject<{
  mode: ZodOptional<ZodUnion<readonly [ZodLiteral<"allow">, ZodLiteral<"deny">]>>;
  allowIn: ZodOptional<ZodArray<ZodString>>;
  denyIn: ZodOptional<ZodArray<ZodString>>;
}, $strict>;
declare const DmConfigSchema: ZodObject<{
  historyLimit: ZodOptional<ZodNumber>;
}, $strict>;
declare const ReplyToModeSchema: ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>;
declare const GroupPolicySchema: ZodEnum<{
  allowlist: "allowlist";
  open: "open";
  disabled: "disabled";
}>;
declare const DmPolicySchema: ZodEnum<{
  allowlist: "allowlist";
  open: "open";
  disabled: "disabled";
  pairing: "pairing";
}>;
declare const ContextVisibilityModeSchema: ZodEnum<{
  all: "all";
  allowlist: "allowlist";
  allowlist_quote: "allowlist_quote";
}>;
declare const BlockStreamingCoalesceSchema: ZodObject<{
  minChars: ZodOptional<ZodNumber>;
  maxChars: ZodOptional<ZodNumber>;
  idleMs: ZodOptional<ZodNumber>;
}, $strict>;
declare const TextChunkModeSchema: ZodEnum<{
  length: "length";
  newline: "newline";
}>;
declare const ChannelStreamingBlockSchema: ZodObject<{
  enabled: ZodOptional<ZodBoolean>;
  coalesce: ZodOptional<ZodObject<{
    minChars: ZodOptional<ZodNumber>;
    maxChars: ZodOptional<ZodNumber>;
    idleMs: ZodOptional<ZodNumber>;
  }, $strict>>;
}, $strict>;
/** Delivery-only nested streaming config for channels without preview modes. */
declare const ChannelDeliveryStreamingConfigSchema: ZodObject<{
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
}, $strict>;
declare const ReplyRuntimeConfigSchemaShape: {
  historyLimit: ZodOptional<ZodNumber>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
  contextVisibility: ZodOptional<ZodEnum<{
    all: "all";
    allowlist: "allowlist";
    allowlist_quote: "allowlist_quote";
  }>>;
  dms: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    historyLimit: ZodOptional<ZodNumber>;
  }, $strict>>>>;
  textChunkLimit: ZodOptional<ZodNumber>;
  streaming: ZodOptional<ZodObject<{
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
  responsePrefix: ZodOptional<ZodString>;
  mediaMaxMb: ZodOptional<ZodNumber>;
};
declare const BlockStreamingChunkSchema: ZodObject<{
  minChars: ZodOptional<ZodNumber>;
  maxChars: ZodOptional<ZodNumber>;
  breakPreference: ZodOptional<ZodUnion<readonly [ZodLiteral<"paragraph">, ZodLiteral<"newline">, ZodLiteral<"sentence">]>>;
}, $strict>;
declare const MarkdownConfigSchema: ZodOptional<ZodObject<{
  tables: ZodOptional<ZodEnum<{
    code: "code";
    block: "block";
    off: "off";
    bullets: "bullets";
  }>>;
}, $strict>>;
declare const TtsConfigSchema: ZodOptional<ZodObject<{
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
  personas: ZodOptional<ZodRecord<ZodString, ZodObject<{
    label: ZodOptional<ZodString>;
    description: ZodOptional<ZodString>;
    provider: ZodOptional<ZodString>;
    fallbackPolicy: ZodOptional<ZodUnion<readonly [ZodLiteral<"preserve-persona">, ZodLiteral<"provider-defaults">, ZodLiteral<"fail">]>>;
    providers: ZodOptional<ZodRecord<ZodString, ZodObject<{
      apiKey: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
    }, $catchall<ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean, ZodNull, ZodArray<ZodUnknown>, ZodRecord<ZodString, ZodUnknown>]>>>>>;
  }, $strict>>>;
  summaryModel: ZodOptional<ZodString>;
  modelOverrides: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    allowText: ZodOptional<ZodBoolean>;
    allowProvider: ZodOptional<ZodBoolean>;
    allowVoice: ZodOptional<ZodBoolean>;
    allowModelId: ZodOptional<ZodBoolean>;
    allowVoiceSettings: ZodOptional<ZodBoolean>;
    allowNormalization: ZodOptional<ZodBoolean>;
    allowSeed: ZodOptional<ZodBoolean>;
  }, $strict>>;
  providers: ZodOptional<ZodRecord<ZodString, ZodObject<{
    apiKey: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
  }, $catchall<ZodUnion<readonly [ZodString, ZodNumber, ZodBoolean, ZodNull, ZodArray<ZodUnknown>, ZodRecord<ZodString, ZodUnknown>]>>>>>;
  maxTextLength: ZodOptional<ZodNumber>;
  timeoutMs: ZodOptional<ZodNumber>;
}, $strict>>;
declare const requireOpenAllowFrom: (params: {
  policy?: string;
  allowFrom?: Array<string | number>;
  ctx: $RefinementCtx;
  path: Array<string | number>;
  message: string;
}) => void;
/**
 * Validate that dmPolicy="allowlist" has a non-empty allowFrom array.
 * Without this, all DMs are silently dropped because the allowlist is empty
 * and no senders can match.
 */
declare const requireAllowlistAllowFrom: (params: {
  policy?: string;
  allowFrom?: Array<string | number>;
  ctx: $RefinementCtx;
  path: Array<string | number>;
  message: string;
}) => void;
declare const MSTeamsReplyStyleSchema: ZodEnum<{
  thread: "thread";
  "top-level": "top-level";
}>;
declare const ExecutableTokenSchema: ZodString;
declare const ProviderCommandsSchema: ZodOptional<ZodObject<{
  native: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
  nativeSkills: ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"auto">]>>;
}, $strict>>;
//#endregion
//#region src/config/zod-schema.agent-runtime.d.ts
declare const ToolPolicySchema: ZodOptional<ZodObject<{
  allow: ZodOptional<ZodArray<ZodString>>;
  alsoAllow: ZodOptional<ZodArray<ZodString>>;
  deny: ZodOptional<ZodArray<ZodString>>;
}, $strict>>;
//#endregion
export { TextChunkModeSchema as _, ChannelStreamingBlockSchema as a, requireOpenAllowFrom as b, DmPolicySchema as c, MSTeamsReplyStyleSchema as d, MarkdownConfigSchema as f, ReplyToModeSchema as g, ReplyRuntimeConfigSchemaShape as h, ChannelDeliveryStreamingConfigSchema as i, ExecutableTokenSchema as l, ProviderCommandsSchema as m, BlockStreamingChunkSchema as n, ContextVisibilityModeSchema as o, MentionPatternsPolicySchema as p, BlockStreamingCoalesceSchema as r, DmConfigSchema as s, ToolPolicySchema as t, GroupPolicySchema as u, TtsConfigSchema as v, requireAllowlistAllowFrom as y };