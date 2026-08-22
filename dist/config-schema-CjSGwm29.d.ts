import { a as ZodEmail, d as ZodOptional, l as ZodNumber, n as ZodBoolean, o as ZodEnum, p as ZodString, r as ZodDefault, u as ZodObject, v as ZodUnknown, x as $strict, y as output } from "./schemas-Cd6yayeo.js";

//#region extensions/reef/src/config-schema.d.ts
declare const ReefChannelConfigSchema: ZodObject<{
  enabled: ZodDefault<ZodBoolean>;
  configWrites: ZodOptional<ZodBoolean>;
  relayUrl: ZodDefault<ZodString>;
  handle: ZodOptional<ZodString>;
  email: ZodOptional<ZodEmail>;
  guard: ZodOptional<ZodObject<{
    provider: ZodEnum<{
      openai: "openai";
      anthropic: "anthropic";
    }>;
    pinnedModel: ZodString;
    apiKeyEnv: ZodString;
    policyVersion: ZodString;
    timeoutMs: ZodNumber;
  }, $strict>>;
  stateDir: ZodOptional<ZodString>;
  requestPolicy: ZodDefault<ZodEnum<{
    "code-only": "code-only";
    "friends-of-friends": "friends-of-friends";
    open: "open";
  }>>;
  friends: ZodOptional<ZodUnknown>;
}, $strict>;
type ReefChannelConfig = output<typeof ReefChannelConfigSchema>;
//#endregion
export { ReefChannelConfigSchema as n, ReefChannelConfig as t };