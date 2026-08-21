import { S as $strict, _ as ZodRecord, b as ZodUnion, c as ZodDiscriminatedUnion, d as ZodLiteral, f as ZodNumber, i as ZodBoolean, l as ZodEnum, m as ZodOptional, n as OpenClawConfig, p as ZodObject, r as ZodArray, s as ZodDefault, u as ZodIntersection, v as ZodString, x as output } from "./types.openclaw-DlZm98yj.js";
//#region extensions/buzz/src/config-schema.d.ts
declare const RawBuzzConfigSchema: ZodObject<{
  name: ZodOptional<ZodString>;
  enabled: ZodOptional<ZodBoolean>;
  configWrites: ZodOptional<ZodBoolean>;
  markdown: ZodOptional<ZodObject<{
    tables: ZodOptional<ZodEnum<{
      block: "block";
      off: "off";
      code: "code";
      bullets: "bullets";
    }>>;
  }, $strict>>;
  relayUrl: ZodOptional<ZodIntersection<ZodString, ZodString>>;
  privateKey: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
  authTag: ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
  groupPolicy: ZodDefault<ZodOptional<ZodEnum<{
    open: "open";
    disabled: "disabled";
    allowlist: "allowlist";
  }>>>;
  groupAllowFrom: ZodOptional<ZodArray<ZodUnion<readonly [ZodString, ZodNumber]>>>;
  groups: ZodOptional<ZodRecord<ZodString, ZodObject<{
    enabled: ZodOptional<ZodBoolean>;
    requireMention: ZodOptional<ZodBoolean>;
  }, $strict>>>;
  defaultTo: ZodOptional<ZodString>;
}, $strict>;
type BuzzConfig = output<typeof RawBuzzConfigSchema>;
//#endregion
//#region extensions/buzz/src/types.d.ts
interface ResolvedBuzzAccount {
  accountId: string;
  name?: string;
  enabled: boolean;
  configured: boolean;
  relayUrl: string;
  privateKey: string;
  authTag: string;
  publicKey: string;
  config: BuzzConfig;
}
declare function listBuzzAccountIds(cfg: OpenClawConfig): string[];
declare function resolveDefaultBuzzAccountId(_cfg: OpenClawConfig): string;
declare function resolveBuzzAccount(params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedBuzzAccount;
//#endregion
export { resolveDefaultBuzzAccountId as i, listBuzzAccountIds as n, resolveBuzzAccount as r, ResolvedBuzzAccount as t };