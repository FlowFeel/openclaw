import { _ as ZodUnion, b as $catchall, c as ZodNull, d as ZodOptional, f as ZodRecord, i as ZodDiscriminatedUnion, l as ZodNumber, n as ZodBoolean, o as ZodEnum, p as ZodString, s as ZodLiteral, t as ZodArray, u as ZodObject, v as ZodUnknown, x as $strict } from "./schemas-Cd6yayeo.js";
import { IncomingMessage } from "node:http";
import { Command } from "commander";
//#region src/utils/sleep.d.ts
/** Promise-based sleep that clamps timer inputs through the shared timeout resolver. */
declare function sleep(ms: number): Promise<void>;
//#endregion
//#region src/config/zod-schema.core.d.ts
declare const TtsProviderSchema: ZodString;
declare const TtsModeSchema: ZodEnum<{
  final: "final";
  all: "all";
}>;
declare const TtsAutoSchema: ZodEnum<{
  off: "off";
  always: "always";
  inbound: "inbound";
  tagged: "tagged";
}>;
declare const TtsConfigSchema: ZodOptional<ZodObject<{
  auto: ZodOptional<ZodEnum<{
    off: "off";
    always: "always";
    inbound: "inbound";
    tagged: "tagged";
  }>>;
  enabled: ZodOptional<ZodBoolean>;
  mode: ZodOptional<ZodEnum<{
    final: "final";
    all: "all";
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
//#endregion
export { sleep as a, TtsProviderSchema as i, TtsConfigSchema as n, TtsModeSchema as r, TtsAutoSchema as t };