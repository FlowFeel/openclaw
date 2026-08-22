import { n as OpenClawConfig } from "../../types.openclaw-hJEKisz6.js";
import { r as AuthProfileStore } from "../../types-BxLxgLBC.js";
import { i as ProviderRequestCapability } from "../../provider-request-config-BRGKWpTG.js";
import { t as resolveProviderHttpRequestConfig } from "../../provider-http-QeNnsbS8.js";

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