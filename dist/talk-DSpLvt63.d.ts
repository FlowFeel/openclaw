import { A as ResolvedTalkConfig, j as TalkConfig } from "./types.openclaw-B-6RRL7F.js";

//#region src/config/talk.d.ts
/**
 * Resolve the single active Talk speech provider and its provider-owned config.
 * Ambiguous multi-provider config stays unresolved until `talk.provider` names one.
 */
declare function resolveActiveTalkProviderConfig(talk: TalkConfig | undefined): ResolvedTalkConfig | undefined;
//#endregion
export { resolveActiveTalkProviderConfig as t };