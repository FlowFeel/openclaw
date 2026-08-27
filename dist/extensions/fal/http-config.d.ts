import { n as OpenClawConfig } from "../../types.openclaw-Becy5MdM.js";
import { r as AuthProfileStore } from "../../types-CpvSFyhi.js";
import { i as ProviderRequestCapability } from "../../provider-request-config-Cy3f8Inl.js";
import { t as resolveProviderHttpRequestConfig } from "../../provider-http-3c8z216u.js";

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