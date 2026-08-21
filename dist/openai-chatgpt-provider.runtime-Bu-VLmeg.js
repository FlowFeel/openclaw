import { r as ensureGlobalUndiciEnvProxyDispatcher } from "./undici-global-dispatcher-B0fHhkhz.js";
import "./runtime-env-DEukRWMB.js";
import { n as refreshOpenAICodexToken$1 } from "./openai-chatgpt-oauth-flow.runtime.js";
import { t as createOpenAICodexProviderRuntime } from "./openai-chatgpt-provider-runtime.factory-CNhQ2b-7.js";
//#region extensions/openai/openai-chatgpt-provider.runtime.ts
const runtime = createOpenAICodexProviderRuntime({
	ensureGlobalUndiciEnvProxyDispatcher,
	refreshOpenAICodexToken: refreshOpenAICodexToken$1
});
async function refreshOpenAICodexToken(...args) {
	return await runtime.refreshOpenAICodexToken(...args);
}
//#endregion
export { refreshOpenAICodexToken as t };
