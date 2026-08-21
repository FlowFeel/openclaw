import { a as ZodDefault, c as ZodLiteral, d as ZodOptional, f as ZodRecord, g as ZodUnknown, h as ZodUnion, i as ZodBoolean, l as ZodNumber, o as ZodDiscriminatedUnion, p as ZodString, r as ZodArray, s as ZodEnum, u as ZodObject, v as $strict } from "./types.openclaw-B2WvMv3k.js";
import { L as PluginRuntime } from "./types-odeWQ5Sn.js";
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
  name: ZodOptional<ZodString>;
  capabilities: ZodOptional<ZodArray<ZodString>>;
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
  enabled: ZodOptional<ZodBoolean>;
  allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  defaultTo: ZodOptional<ZodString>;
  groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
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
  dmPolicy: ZodDefault<ZodOptional<ZodEnum<{
    pairing: "pairing";
    allowlist: "allowlist";
    open: "open";
    disabled: "disabled";
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
    name: ZodOptional<ZodString>;
    capabilities: ZodOptional<ZodArray<ZodString>>;
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
    enabled: ZodOptional<ZodBoolean>;
    allowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
    defaultTo: ZodOptional<ZodString>;
    groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
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
//#region src/infra/outbound/target-errors.d.ts
/**
 * Builds an Error for missing outbound target failures.
 */
declare function missingTargetError(provider: string, hint?: string): Error;
//#endregion
//#region src/plugin-sdk/tool-send.d.ts
/** Extract the canonical send target fields from tool arguments when the action matches. */
declare function extractToolSend(/** Raw model tool arguments supplied to a channel action. */

args: Record<string, unknown>, /** Action name that should be treated as a send action. */

expectedAction?: string): {
  /** Canonical destination id used by core send routing. */to: string; /** Optional channel account/profile id when the action includes one. */
  accountId?: string; /** Optional thread/topic id, normalized to string for channel send adapters. */
  threadId?: string; /** True when the send explicitly opts out of ambient thread inheritance. */
  threadSuppressed?: boolean;
} | null;
//#endregion
//#region extensions/googlechat/src/runtime.d.ts
declare const setGoogleChatRuntime: (next: PluginRuntime) => void, getGoogleChatRuntime: () => PluginRuntime;
//#endregion
export { GoogleChatConfigSchema as i, extractToolSend as n, missingTargetError as r, setGoogleChatRuntime as t };