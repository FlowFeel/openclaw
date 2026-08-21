import { d as isSecretRef, f as normalizeResolvedSecretInputString, i as SecretInputStringResolutionMode, l as coerceSecretRef, m as resolveSecretInputString, n as SecretInput, p as normalizeSecretInputString, r as SecretInputStringResolution, u as hasConfiguredSecretInput } from "../types.secrets-DQTWzAOQ.js";
import { B as ZodLiteral, Lh as $strict, Q as ZodOptional, Z as ZodObject, bt as ZodUnion, mt as ZodType, r as ZodArray, st as ZodString, y as ZodDiscriminatedUnion } from "../schemas-Cx92lENn.js";
import { n as normalizeSecretInput, r as isValidSecretRef } from "../normalize-secret-input-B4Sw0WJG.js";

//#region src/plugin-sdk/secret-input-schema.d.ts
/**
 * Returns the shared secret-input schema for plaintext values and env/file/exec refs.
 * Reusing this singleton preserves sensitive-path registration for config redaction.
 */
declare function buildSecretInputSchema(): ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
}, $strict>], "source">]>;
/** Register a plugin-owned config schema leaf for redaction in host config projections. */
declare function registerSensitiveConfigSchema<TSchema extends ZodType>(schema: TSchema): TSchema;
//#endregion
//#region src/plugin-sdk/secret-input.d.ts
/**
 * Builds an optional secret-input schema for config fields that may be omitted.
 * The inner schema stays shared so sensitive-path redaction still recognizes it.
 */
declare function buildOptionalSecretInputSchema(): ZodOptional<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
/**
 * Builds an array schema for provider/channel config that accepts multiple secret inputs.
 * Each element uses the shared schema so plaintext and ref validation stay identical.
 */
declare function buildSecretInputArraySchema(): ZodArray<ZodUnion<readonly [ZodString, ZodDiscriminatedUnion<[ZodObject<{
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
//#endregion
export { type SecretInput, type SecretInputStringResolution, type SecretInputStringResolutionMode, buildOptionalSecretInputSchema, buildSecretInputArraySchema, buildSecretInputSchema, coerceSecretRef, hasConfiguredSecretInput, isSecretRef, isValidSecretRef, normalizeResolvedSecretInputString, normalizeSecretInput, normalizeSecretInputString, registerSensitiveConfigSchema, resolveSecretInputString };