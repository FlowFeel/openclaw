import { MediaUnderstandingCapability, MediaUnderstandingProvider } from "./types.mjs";

//#region packages/media-understanding-common/src/provider-supports.d.ts
/** Return true when a provider exposes the method for a media capability. */
declare function providerSupportsCapability(provider: MediaUnderstandingProvider | undefined, capability: MediaUnderstandingCapability): boolean;
//#endregion
export { providerSupportsCapability };