import { i as OAuthCredential } from "../../types-C6UPaT8B.js";
import { s as ProviderAuthMethod } from "../../plugin-entry-COORsTlt.js";
//#region extensions/xai/xai-oauth.d.ts
type XaiOAuthFetchOptions = {
  fetchImpl?: typeof fetch;
  now?: () => number;
  signal?: AbortSignal;
};
declare function refreshXaiOAuthCredential(credential: OAuthCredential, options?: XaiOAuthFetchOptions): Promise<OAuthCredential>;
declare function createXaiOAuthAuthMethod(): ProviderAuthMethod;
declare function createXaiDeviceCodeAuthMethod(): ProviderAuthMethod;
//#endregion
export { createXaiDeviceCodeAuthMethod, createXaiOAuthAuthMethod, refreshXaiOAuthCredential };