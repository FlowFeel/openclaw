import { i as ProviderPlugin } from "../../types-BykvrQHR.js";
import { n as OpenClawPluginApi } from "../../plugin-entry-DoQDAyTc.js";
//#region extensions/anthropic/register.runtime.d.ts
/** Build the full Anthropic provider descriptor used by runtime registration. */
declare function buildAnthropicProvider(): ProviderPlugin;
/** Register Anthropic provider, Claude CLI backend, and media understanding provider. */
declare function registerAnthropicPlugin(api: OpenClawPluginApi): void;
//#endregion
export { buildAnthropicProvider, registerAnthropicPlugin };