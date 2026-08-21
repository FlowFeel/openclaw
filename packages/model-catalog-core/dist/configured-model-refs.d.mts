//#region packages/model-catalog-core/src/configured-model-refs.d.ts
/** One configured model reference plus its config path. */
type ConfiguredModelRef = {
  path: string;
  value: string;
};
/** Agent config keys that can contain direct model references. */
declare const AGENT_MODEL_CONFIG_KEYS: readonly ["model", "utilityModel", "imageModel", "voiceModel", "pdfModel"];
/** List raw refs from one string or primary/fallback model selector. */
declare function listModelRefsFromConfigValue(value: unknown): string[];
/** Collect configured model references from agents, channels, hooks, and message config. */
declare function collectConfiguredModelRefs(config: unknown, options?: {
  includeChannelModelOverrides?: boolean;
}): ConfiguredModelRef[];
/** Collect only configured model reference values. */
declare function collectConfiguredModelRefValues(config: unknown, options?: {
  includeChannelModelOverrides?: boolean;
}): string[];
//#endregion
export { AGENT_MODEL_CONFIG_KEYS, ConfiguredModelRef, collectConfiguredModelRefValues, collectConfiguredModelRefs, listModelRefsFromConfigValue };