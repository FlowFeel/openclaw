//#region packages/media-generation-core/src/catalog.d.ts
/** Catalog kind for generated media model entries. */
type MediaGenerationCatalogKind = "image_generation" | "video_generation" | "music_generation";
/** Source for a media generation catalog entry. */
type MediaGenerationCatalogSource = "static" | "live" | "cache" | "configured";
/** Media generation model catalog entry. */
type MediaGenerationCatalogEntry<TCapabilities = unknown> = {
  kind: MediaGenerationCatalogKind;
  provider: string;
  model: string;
  label?: string;
  source: MediaGenerationCatalogSource;
  default?: boolean;
  configured?: boolean;
  capabilities?: TCapabilities;
  modes?: readonly string[];
  authEnvVars?: readonly string[];
  docsPath?: string;
  fetchedAt?: number;
  expiresAt?: number;
  warnings?: readonly string[];
};
/** Static catalog metadata that overrides provider defaults for one model. */
type MediaGenerationCatalogModelEntry<TCapabilities = unknown> = {
  capabilities?: TCapabilities;
  modes?: readonly string[];
};
/** Provider metadata used to synthesize static media generation catalog entries. */
type MediaGenerationCatalogProvider<TCapabilities = unknown> = {
  id: string;
  aliases?: readonly string[];
  label?: string;
  defaultModel?: string;
  models?: readonly string[];
  capabilities: TCapabilities;
  catalogByModel?: Readonly<Record<string, MediaGenerationCatalogModelEntry<TCapabilities>>>;
};
/** Synthesize static catalog entries from provider metadata. */
declare function synthesizeMediaGenerationCatalogEntries<TCapabilities>(params: {
  kind: MediaGenerationCatalogKind;
  provider: MediaGenerationCatalogProvider<TCapabilities>;
  modes?: readonly string[];
}): Array<MediaGenerationCatalogEntry<TCapabilities>>;
/** Return unique model ids exposed by a media generation provider. */
declare function listMediaGenerationProviderModels(provider: {
  defaultModel?: string;
  models?: readonly string[];
}): string[];
//#endregion
export { MediaGenerationCatalogEntry, MediaGenerationCatalogKind, MediaGenerationCatalogModelEntry, MediaGenerationCatalogProvider, MediaGenerationCatalogSource, listMediaGenerationProviderModels, synthesizeMediaGenerationCatalogEntries };