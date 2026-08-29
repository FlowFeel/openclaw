import { a as ProviderRequestTransport, i as ProviderRequestCapability } from "../../provider-request-config-C1sg_mEt.js";
//#region extensions/google/google-api-client-header.d.ts
declare function resolveGoogleApiClientHeaders(params?: {
  api?: string;
  baseUrl?: string;
  capability?: ProviderRequestCapability;
  transport?: ProviderRequestTransport;
}): Record<string, string>;
//#endregion
export { resolveGoogleApiClientHeaders };