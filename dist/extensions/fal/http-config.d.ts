import { n as OpenClawConfig } from "../../types.openclaw-DPyC_juj.js";
import { r as AuthProfileStore } from "../../types-BfAo28jU.js";
import { i as ProviderRequestCapability } from "../../provider-request-config-C1sg_mEt.js";
import { t as resolveProviderHttpRequestConfig } from "../../provider-http-BmatlU28.js";

//#region extensions/fal/http-config.d.ts
type FalAuthenticatedRequest = {
  cfg?: OpenClawConfig;
  agentDir?: string;
  authStore?: AuthProfileStore;
};
declare function resolveFalHttpRequestConfig(params: {
  req: FalAuthenticatedRequest;
  baseUrl?: string;
  capability: ProviderRequestCapability;
}): Promise<ReturnType<typeof resolveProviderHttpRequestConfig>>;
//#endregion
export { resolveFalHttpRequestConfig };