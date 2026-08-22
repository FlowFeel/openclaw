import { B as TelegramGroupConfig, C as $ZodTypeInternals, D as $strip, E as $strict, F as TelegramActionConfig, G as IMessageAccountConfig, H as TelegramPreviewStreamingConfig, I as TelegramCapabilitiesConfig, J as IMessageSendTransport, K as IMessageActionConfig, L as TelegramCustomCommand, N as AutoTopicLabelConfig, O as Extend, P as TelegramAccountConfig, R as TelegramDirectConfig, S as $ZodType, T as $loose, U as TelegramThreadBindingsConfig, V as TelegramNetworkConfig, X as CommonChannelMessagingConfig, Y as ChannelReadReceiptConfig, _ as ZodUnknown, a as ZodDefault, at as GroupToolPolicyBySenderConfig, b as output, c as ZodLiteral, d as ZodObject, dt as ProviderCommandsConfig, f as ZodOptional, g as ZodUnion, h as ZodType, i as ZodBoolean, m as ZodString, o as ZodDiscriminatedUnion, ot as GroupToolPolicyConfig, p as ZodRecord, q as IMessageReactionNotificationMode, r as ZodArray, s as ZodEnum, u as ZodNumber, v as $RefinementCtx, x as $ZodShape, y as input, z as TelegramExecApprovalConfig } from "../types.openclaw-B-6RRL7F.js";
import { n as ChannelConfigSchema, r as ChannelConfigUiHint } from "../types.config-C8M7Vrm6.js";
import { a as GroupPolicySchema, f as requireAllowlistAllowFrom, i as DmPolicySchema, n as ContextVisibilityModeSchema, o as MarkdownConfigSchema, p as requireOpenAllowFrom, r as DmConfigSchema, s as ReplyRuntimeConfigSchemaShape, t as BlockStreamingCoalesceSchema } from "../zod-schema.core-mNHdT6J1.js";

//#region node_modules/zod/v4/classic/compat.d.cts
/** Included for Zod 3 compatibility */
type ZodRawShape = $ZodShape;
//#endregion
//#region src/channels/plugins/config-schema.d.ts
type ExtendableZodObject = ZodType & {
  extend: (shape: Record<string, ZodType>) => ZodType;
};
/** Optional allowlist array used by channel config schema builders. */
declare const AllowFromListSchema: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
/** Canonical per-group/room channel policy shape. */
declare const ChannelGroupEntrySchema: ZodObject<{
  requireMention: ZodOptional<ZodBoolean>;
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
}, $strict>;
type ChannelGroupEntryField = keyof typeof ChannelGroupEntrySchema.shape;
/** Extend the canonical group/room policy shape with channel-owned fields. */
declare function buildGroupEntrySchema<T extends ZodRawShape = Record<never, never>, const TOmit extends readonly ChannelGroupEntryField[] = []>(extraShape?: T, options?: {
  omit?: TOmit;
}): ZodObject<Omit<{
  requireMention: ZodOptional<ZodBoolean>;
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
}, TOmit[number]> & T extends infer T_1 ? { -readonly [P in keyof T_1]: T_1[P] } : never, $strict>;
/** Build the common nested DM config block used by channel account schemas. */
declare function buildNestedDmConfigSchema(extraShape?: ZodRawShape): ZodOptional<ZodObject<{
  enabled: ZodOptional<ZodBoolean>;
  policy: ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
    pairing: "pairing";
  }>>;
  allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
}, $strip>>;
/** Add `accounts` catchall and `defaultAccount` fields to a channel account schema. */
declare function buildCatchallMultiAccountChannelSchema<T extends ExtendableZodObject>(accountSchema: T): T;
type MultiAccountSchemaBaseOptions<TAccount extends ZodType, TOptional extends boolean> = {
  accountSchema?: TAccount;
  accountsMode?: "record" | "catchall";
  optionalAccount?: TOptional;
};
type MultiAccountRefinement<T extends ZodObject> = (value: output<T>, ctx: $RefinementCtx) => void | Promise<void>;
type MultiAccountSchemaOptions<T extends ZodObject, TAccount extends ZodType, TOptional extends boolean> = (MultiAccountSchemaBaseOptions<TAccount, TOptional> & {
  refine?: undefined;
}) | (MultiAccountSchemaBaseOptions<T, TOptional> & {
  refine: MultiAccountRefinement<T>;
});
type OptionalAccountValue<T, TOptional extends boolean> = TOptional extends true ? T | undefined : T;
type MultiAccountEnvelopeShape<TAccount extends ZodType, TOptional extends boolean> = {
  accounts: ZodOptional<ZodType<Record<string, OptionalAccountValue<output<TAccount>, TOptional>>, Record<string, OptionalAccountValue<input<TAccount>, TOptional>>>>;
  defaultAccount: ZodOptional<ZodString>;
};
type MultiAccountChannelSchema<T extends ZodObject, TAccount extends ZodType, TOptional extends boolean> = ZodObject<Extend<T["shape"], MultiAccountEnvelopeShape<TAccount, TOptional>>>;
/** Add the standard accounts/defaultAccount envelope and optional shared account/root refinement. */
declare function buildMultiAccountChannelSchema<T extends ZodObject, TAccount extends ZodType = T, TOptional extends boolean = false>(baseSchema: T, options?: MultiAccountSchemaOptions<T, TAccount, TOptional>): MultiAccountChannelSchema<T, TAccount, TOptional>;
type BuildChannelConfigSchemaOptions = {
  uiHints?: Record<string, ChannelConfigUiHint>; /** Select input mode when transforms must expose accepted config values to editors. */
  jsonSchemaMode?: "input" | "output";
};
/** Build a channel config schema from Zod, exporting JSON Schema when available. */
declare function buildChannelConfigSchema(schema: ZodType, options?: BuildChannelConfigSchemaOptions): ChannelConfigSchema;
//#endregion
//#region src/config/zod-schema.agent-runtime.d.ts
declare const ToolPolicySchema: ZodOptional<ZodObject<{
  allow: ZodOptional<ZodArray<ZodString>>;
  alsoAllow: ZodOptional<ZodArray<ZodString>>;
  deny: ZodOptional<ZodArray<ZodString>>;
}, $strict>>;
//#endregion
//#region src/config/zod-schema.providers-googlechat.d.ts
declare const GoogleChatConfigSchema: ZodObject<{
  allowBots: ZodOptional<ZodBoolean> | ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"mentions">]>>;
  botLoopProtection: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    maxEventsPerWindow: ZodOptional<ZodNumber>;
    windowSeconds: ZodOptional<ZodNumber>;
    cooldownSeconds: ZodOptional<ZodNumber>;
  }, $strict>>;
  dangerouslyAllowNameMatching: ZodOptional<ZodBoolean>;
  requireMention: ZodOptional<ZodBoolean>;
  groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    requireMention: ZodOptional<ZodBoolean>;
    botLoopProtection: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      maxEventsPerWindow: ZodOptional<ZodNumber>;
      windowSeconds: ZodOptional<ZodNumber>;
      cooldownSeconds: ZodOptional<ZodNumber>;
    }, $strict>>;
    users: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    systemPrompt: ZodOptional<ZodString>;
  }, $strict>>>>;
  serviceAccount: ZodOptional<ZodUnion<readonly [ZodString, ZodRecord<ZodString, ZodUnknown>, ZodDiscriminatedUnion<[ZodObject<{
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
  serviceAccountFile: ZodOptional<ZodString>;
  audienceType: ZodOptional<ZodEnum<{
    "app-url": "app-url";
    "project-number": "project-number";
  }>>;
  audience: ZodOptional<ZodString>;
  appPrincipal: ZodOptional<ZodString>;
  webhookPath: ZodOptional<ZodString>;
  webhookUrl: ZodOptional<ZodString>;
  botUser: ZodOptional<ZodString>;
  dm: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
  }, $strict>>;
  typingIndicator: ZodOptional<ZodEnum<{
    message: "message";
    none: "none";
    reaction: "reaction";
  }>>;
  replyToMode: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
  name: ZodOptional<ZodString>;
  capabilities: ZodOptional<ZodArray<ZodString>>;
  markdown: ZodOptional<ZodObject<{
    tables: ZodOptional<ZodEnum<{
      block: "block";
      off: "off";
      code: "code";
      bullets: "bullets";
    }>>;
  }, $strict>>;
  configWrites: ZodOptional<ZodBoolean>;
  enabled: ZodOptional<ZodBoolean>;
  allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  defaultTo: ZodOptional<ZodString>;
  groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  groupPolicy: ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
  }>>>;
  contextVisibility: ZodOptional<ZodEnum<{
    all: "all";
    allowlist: "allowlist";
    allowlist_quote: "allowlist_quote";
  }>>;
  historyLimit: ZodOptional<ZodNumber>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
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
  heartbeatVisibility: ZodOptional<ZodObject<{
    showOk: ZodOptional<ZodBoolean>;
    showAlerts: ZodOptional<ZodBoolean>;
    useIndicator: ZodOptional<ZodBoolean>;
  }, $strict>>;
  healthMonitor: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
  }, $strict>>;
  responsePrefix: ZodOptional<ZodString>;
  mediaMaxMb: ZodOptional<ZodNumber>;
  dmPolicy: ZodDefault<ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
    pairing: "pairing";
  }>>>;
  accounts: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    allowBots: ZodOptional<ZodBoolean> | ZodOptional<ZodUnion<readonly [ZodBoolean, ZodLiteral<"mentions">]>>;
    botLoopProtection: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      maxEventsPerWindow: ZodOptional<ZodNumber>;
      windowSeconds: ZodOptional<ZodNumber>;
      cooldownSeconds: ZodOptional<ZodNumber>;
    }, $strict>>;
    dangerouslyAllowNameMatching: ZodOptional<ZodBoolean>;
    requireMention: ZodOptional<ZodBoolean>;
    groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
      requireMention: ZodOptional<ZodBoolean>;
      botLoopProtection: ZodOptional<ZodObject<{
        enabled: ZodOptional<ZodBoolean>;
        maxEventsPerWindow: ZodOptional<ZodNumber>;
        windowSeconds: ZodOptional<ZodNumber>;
        cooldownSeconds: ZodOptional<ZodNumber>;
      }, $strict>>;
      users: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
      systemPrompt: ZodOptional<ZodString>;
    }, $strict>>>>;
    serviceAccount: ZodOptional<ZodUnion<readonly [ZodString, ZodRecord<ZodString, ZodUnknown>, ZodDiscriminatedUnion<[ZodObject<{
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
    serviceAccountFile: ZodOptional<ZodString>;
    audienceType: ZodOptional<ZodEnum<{
      "app-url": "app-url";
      "project-number": "project-number";
    }>>;
    audience: ZodOptional<ZodString>;
    appPrincipal: ZodOptional<ZodString>;
    webhookPath: ZodOptional<ZodString>;
    webhookUrl: ZodOptional<ZodString>;
    botUser: ZodOptional<ZodString>;
    dm: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
    }, $strict>>;
    typingIndicator: ZodOptional<ZodEnum<{
      message: "message";
      none: "none";
      reaction: "reaction";
    }>>;
    replyToMode: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
    name: ZodOptional<ZodString>;
    capabilities: ZodOptional<ZodArray<ZodString>>;
    markdown: ZodOptional<ZodObject<{
      tables: ZodOptional<ZodEnum<{
        block: "block";
        off: "off";
        code: "code";
        bullets: "bullets";
      }>>;
    }, $strict>>;
    configWrites: ZodOptional<ZodBoolean>;
    enabled: ZodOptional<ZodBoolean>;
    dmPolicy: ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
      pairing: "pairing";
    }>> | ZodDefault<ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
      pairing: "pairing";
    }>>>;
    allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    defaultTo: ZodOptional<ZodString>;
    groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    groupPolicy: ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
    }>> | ZodDefault<ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
    }>>>;
    contextVisibility: ZodOptional<ZodEnum<{
      all: "all";
      allowlist: "allowlist";
      allowlist_quote: "allowlist_quote";
    }>>;
    historyLimit: ZodOptional<ZodNumber>;
    dmHistoryLimit: ZodOptional<ZodNumber>;
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
    heartbeatVisibility: ZodOptional<ZodObject<{
      showOk: ZodOptional<ZodBoolean>;
      showAlerts: ZodOptional<ZodBoolean>;
      useIndicator: ZodOptional<ZodBoolean>;
    }, $strict>>;
    healthMonitor: ZodOptional<ZodObject<{
      enabled: ZodOptional<ZodBoolean>;
    }, $strict>>;
    responsePrefix: ZodOptional<ZodString>;
    mediaMaxMb: ZodOptional<ZodNumber>;
  }, $strict>>>>;
  defaultAccount: ZodOptional<ZodString>;
}, $strict>;
//#endregion
//#region src/config/zod-schema.providers-whatsapp.d.ts
declare const WhatsAppConfigSchema: ZodObject<{
  accounts: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    name: ZodOptional<ZodString>;
    authDir: ZodOptional<ZodString>;
    mediaMaxMb: ZodOptional<ZodNumber>;
    pluginHooks: ZodOptional<ZodObject<{
      messageReceived: ZodOptional<ZodBoolean>;
    }, $strict>>;
    ackReaction?: ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> | undefined;
    reactionLevel?: ZodOptional<ZodEnum<{
      [x: string]: string;
    }>> | undefined;
    reactionAllowlist?: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>> | undefined;
    reactionNotifications?: ZodOptional<ZodEnum<{
      [x: string]: string;
    }>> | undefined;
    sendReadReceipts: ZodOptional<ZodBoolean>;
    selfChatMode: ZodOptional<ZodBoolean>;
    groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      [x: string]: $ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>;
      tools: ZodOptional<ZodObject<{
        allow: ZodOptional<ZodArray<ZodString>>;
        alsoAllow: ZodOptional<ZodArray<ZodString>>;
        deny: ZodOptional<ZodArray<ZodString>>;
      }, $strict>>;
      requireMention: ZodOptional<ZodBoolean>;
      toolsBySender: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
        allow: ZodOptional<ZodArray<ZodString>>;
        alsoAllow: ZodOptional<ZodArray<ZodString>>;
        deny: ZodOptional<ZodArray<ZodString>>;
      }, $strict>>>>;
      systemPrompt: ZodOptional<ZodString>;
    }, $strict>>>>;
    direct: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      systemPrompt: ZodOptional<ZodString>;
    }, $strict>>>>;
    mentionPatterns: ZodOptional<ZodObject<{
      mode: ZodOptional<ZodUnion<readonly [ZodLiteral<"allow">, ZodLiteral<"deny">]>>;
      allowIn: ZodOptional<ZodArray<ZodString>>;
      denyIn: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>;
    replyToMode: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
    capabilities: ZodOptional<ZodArray<ZodString>>;
    markdown: ZodOptional<ZodObject<{
      tables: ZodOptional<ZodEnum<{
        block: "block";
        off: "off";
        code: "code";
        bullets: "bullets";
      }>>;
    }, $strict>>;
    configWrites: ZodOptional<ZodBoolean>;
    enabled: ZodOptional<ZodBoolean>;
    dmPolicy: ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
      pairing: "pairing";
    }>> | ZodDefault<ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
      pairing: "pairing";
    }>>>;
    allowFrom: ZodOptional<ZodArray<ZodString>>;
    defaultTo: ZodOptional<ZodString>;
    groupAllowFrom: ZodOptional<ZodArray<ZodString>>;
    groupPolicy: ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
    }>> | ZodDefault<ZodOptional<ZodEnum<{
      open: "open";
      allowlist: "allowlist";
      disabled: "disabled";
    }>>>;
    contextVisibility: ZodOptional<ZodEnum<{
      all: "all";
      allowlist: "allowlist";
      allowlist_quote: "allowlist_quote";
    }>>;
    historyLimit: ZodOptional<ZodNumber>;
    dmHistoryLimit: ZodOptional<ZodNumber>;
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
  mediaMaxMb: ZodDefault<ZodOptional<ZodNumber>>;
  actions: ZodOptional<ZodObject<{
    reactions: ZodOptional<ZodBoolean>;
    sendMessage: ZodOptional<ZodBoolean>;
    polls: ZodOptional<ZodBoolean>;
    calls: ZodOptional<ZodBoolean>;
  }, $strict>>;
  pluginHooks: ZodOptional<ZodObject<{
    messageReceived: ZodOptional<ZodBoolean>;
  }, $strict>>;
  ackReaction?: ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>> | undefined;
  reactionLevel?: ZodOptional<ZodEnum<{
    [x: string]: string;
  }>> | undefined;
  reactionAllowlist?: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>> | undefined;
  reactionNotifications?: ZodOptional<ZodEnum<{
    [x: string]: string;
  }>> | undefined;
  sendReadReceipts: ZodOptional<ZodBoolean>;
  selfChatMode: ZodOptional<ZodBoolean>;
  groups: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    [x: string]: $ZodType<unknown, unknown, $ZodTypeInternals<unknown, unknown>>;
    tools: ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>;
    requireMention: ZodOptional<ZodBoolean>;
    toolsBySender: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
      allow: ZodOptional<ZodArray<ZodString>>;
      alsoAllow: ZodOptional<ZodArray<ZodString>>;
      deny: ZodOptional<ZodArray<ZodString>>;
    }, $strict>>>>;
    systemPrompt: ZodOptional<ZodString>;
  }, $strict>>>>;
  direct: ZodOptional<ZodRecord<ZodString, ZodOptional<ZodObject<{
    systemPrompt: ZodOptional<ZodString>;
  }, $strict>>>>;
  mentionPatterns: ZodOptional<ZodObject<{
    mode: ZodOptional<ZodUnion<readonly [ZodLiteral<"allow">, ZodLiteral<"deny">]>>;
    allowIn: ZodOptional<ZodArray<ZodString>>;
    denyIn: ZodOptional<ZodArray<ZodString>>;
  }, $strict>>;
  replyToMode: ZodOptional<ZodUnion<readonly [ZodLiteral<"off">, ZodLiteral<"first">, ZodLiteral<"all">, ZodLiteral<"batched">]>>;
  capabilities: ZodOptional<ZodArray<ZodString>>;
  markdown: ZodOptional<ZodObject<{
    tables: ZodOptional<ZodEnum<{
      block: "block";
      off: "off";
      code: "code";
      bullets: "bullets";
    }>>;
  }, $strict>>;
  configWrites: ZodOptional<ZodBoolean>;
  enabled: ZodOptional<ZodBoolean>;
  dmPolicy: ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
    pairing: "pairing";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
    pairing: "pairing";
  }>>>;
  allowFrom: ZodOptional<ZodArray<ZodString>>;
  defaultTo: ZodOptional<ZodString>;
  groupAllowFrom: ZodOptional<ZodArray<ZodString>>;
  groupPolicy: ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
  }>> | ZodDefault<ZodOptional<ZodEnum<{
    open: "open";
    allowlist: "allowlist";
    disabled: "disabled";
  }>>>;
  contextVisibility: ZodOptional<ZodEnum<{
    all: "all";
    allowlist: "allowlist";
    allowlist_quote: "allowlist_quote";
  }>>;
  historyLimit: ZodOptional<ZodNumber>;
  dmHistoryLimit: ZodOptional<ZodNumber>;
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
  heartbeatVisibility: ZodOptional<ZodObject<{
    showOk: ZodOptional<ZodBoolean>;
    showAlerts: ZodOptional<ZodBoolean>;
    useIndicator: ZodOptional<ZodBoolean>;
  }, $strict>>;
  healthMonitor: ZodOptional<ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
  }, $strict>>;
  responsePrefix: ZodOptional<ZodString>;
}, $strict>;
//#endregion
//#region src/plugin-sdk/bundled-channel-config-schema.d.ts
/**
 * @deprecated Compatibility for external channel packages published through 2026.7.1.
 * Their package manifests remain the validation owner. Remove after the minimum supported
 * Slack, Discord, Signal, and Teams packages use plugin-owned config schemas.
 */
declare const SlackConfigSchema: ZodObject<{}, $loose>;
/** @deprecated See SlackConfigSchema. */
declare const DiscordConfigSchema: ZodObject<{}, $loose>;
/** @deprecated See SlackConfigSchema. */
declare const SignalConfigSchema: ZodObject<{}, $loose>;
/** @deprecated See SlackConfigSchema. */
declare const MSTeamsConfigSchema: ZodObject<{}, $loose>;
type ConfigSchemaShape<TOutput extends object> = { -readonly [K in keyof TOutput]-?: Pick<TOutput, K> extends Required<Pick<TOutput, K>> ? ZodType<TOutput[K]> : ZodOptional<ZodType<Exclude<TOutput[K], undefined>>> };
type BundledObjectConfigSchema<TOutput extends object> = ZodObject<ConfigSchemaShape<TOutput>>;
declare const IMessageConfigSchema: BundledObjectConfigSchema<{
  accounts?: Record<string, IMessageAccountConfig>;
  defaultAccount?: string;
} & Omit<CommonChannelMessagingConfig, "mentionPatterns" | "replyToMode"> & ChannelReadReceiptConfig & {
  reactionNotifications?: IMessageReactionNotificationMode | undefined;
  reactionLevel?: undefined;
  ackReaction?: undefined;
} & Record<never, never> & {
  cliPath?: string;
  dbPath?: string;
  remoteHost?: string;
  actions?: IMessageActionConfig;
  service?: "imessage" | "sms" | "auto";
  sendTransport?: IMessageSendTransport;
  region?: string;
  includeAttachments?: boolean;
  attachmentRoots?: string[];
  remoteAttachmentRoots?: string[];
  probeTimeoutMs?: number;
  groups?: Record<string, {
    requireMention?: boolean;
    tools?: GroupToolPolicyConfig;
    toolsBySender?: GroupToolPolicyBySenderConfig;
    systemPrompt?: string;
  }>;
  catchup?: {
    enabled?: boolean;
    maxAgeMinutes?: number;
    perRunLimit?: number;
    firstRunLookbackMinutes?: number;
    maxFailureRetries?: number;
  };
}>;
declare const TelegramConfigSchema: BundledObjectConfigSchema<{
  accounts?: Record<string, TelegramAccountConfig>;
  defaultAccount?: string;
} & CommonChannelMessagingConfig<TelegramCapabilitiesConfig, string | number, string | number, TelegramPreviewStreamingConfig> & {
  reactionNotifications?: "off" | "own" | "all" | undefined;
  reactionLevel?: "off" | "ack" | "minimal" | "extensive" | undefined;
  ackReaction?: string | undefined;
} & Record<never, never> & {
  execApprovals?: TelegramExecApprovalConfig;
  commands?: ProviderCommandsConfig;
  customCommands?: TelegramCustomCommand[];
  botToken?: string;
  tokenFile?: string;
  groups?: Record<string, TelegramGroupConfig>;
  direct?: Record<string, TelegramDirectConfig>;
  richMessages?: boolean;
  network?: TelegramNetworkConfig;
  proxy?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  webhookPath?: string;
  webhookHost?: string;
  webhookPort?: number;
  webhookCertPath?: string;
  actions?: TelegramActionConfig;
  threadBindings?: TelegramThreadBindingsConfig;
  linkPreview?: boolean;
  silentErrorReplies?: boolean;
  errorPolicy?: "always" | "once" | "silent";
  apiRoot?: string;
  trustedLocalFileRoots?: string[];
  autoTopicLabel?: AutoTopicLabelConfig;
}>;
//#endregion
export { AllowFromListSchema, BlockStreamingCoalesceSchema, ChannelGroupEntrySchema, ContextVisibilityModeSchema, DiscordConfigSchema, DmConfigSchema, DmPolicySchema, GoogleChatConfigSchema, GroupPolicySchema, IMessageConfigSchema, MSTeamsConfigSchema, MarkdownConfigSchema, ReplyRuntimeConfigSchemaShape, SignalConfigSchema, SlackConfigSchema, TelegramConfigSchema, ToolPolicySchema, WhatsAppConfigSchema, buildCatchallMultiAccountChannelSchema, buildChannelConfigSchema, buildGroupEntrySchema, buildMultiAccountChannelSchema, buildNestedDmConfigSchema, requireAllowlistAllowFrom, requireOpenAllowFrom };