import { o as isRecord } from "../record-coerce-BCQdFoCN.js";
import { c as pushAssignment, i as collectSecretInputAssignment, l as pushInactiveSurfaceWarning, n as SecretDefaults, o as hasOwnProperty, s as isEnabledFlag, t as ResolverContext, u as pushWarning } from "../runtime-shared-kPU_BpX1.js";
import { n as SecretTargetRegistryEntry } from "../target-registry-types-B2S7Q-Ng.js";
import { a as collectConditionalChannelFieldAssignments, d as hasConfiguredSecretInputValue, f as isBaseFieldActiveForChannelSurface, l as getChannelRecord, m as resolveChannelAccountSurface, n as ChannelAccountPredicate, o as collectNestedChannelFieldAssignments, p as normalizeSecretStringValue, r as ChannelAccountSurface, s as collectSimpleChannelFieldAssignments, t as ChannelAccountEntry, u as getChannelSurface } from "../channel-secret-basic-runtime-DyVo_aE_.js";

//#region src/secrets/channel-secret-tts-runtime.d.ts
/** Collects nested TTS provider SecretRefs from channel root and account-specific blocks. */
declare function collectNestedChannelTtsAssignments(params: {
  /** Channel config key used in runtime warning/assignment paths. */channelKey: string; /** Nested channel config field that owns the `tts` block, such as `outbound`. */
  nestedKey: string;
  channel: Record<string, unknown>;
  surface: ChannelAccountSurface;
  defaults: SecretDefaults | undefined;
  context: ResolverContext; /** Whether the top-level nested `tts` block can affect runtime behavior. */
  topLevelActive: boolean;
  topInactiveReason: string; /** Per-account activity predicate for account-specific nested `tts` blocks. */
  accountActive: ChannelAccountPredicate;
  accountInactiveReason: string | ((entry: {
    accountId: string;
    account: Record<string, unknown>;
    enabled: boolean;
  }) => string);
}): void;
//#endregion
export { type ChannelAccountEntry, type ChannelAccountPredicate, type ChannelAccountSurface, type ResolverContext, type SecretDefaults, type SecretTargetRegistryEntry, collectConditionalChannelFieldAssignments, collectNestedChannelFieldAssignments, collectNestedChannelTtsAssignments, collectSecretInputAssignment, collectSimpleChannelFieldAssignments, getChannelRecord, getChannelSurface, hasConfiguredSecretInputValue, hasOwnProperty, isBaseFieldActiveForChannelSurface, isEnabledFlag, isRecord, normalizeSecretStringValue, pushAssignment, pushInactiveSurfaceWarning, pushWarning, resolveChannelAccountSurface };