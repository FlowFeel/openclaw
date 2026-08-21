import { i as ProviderPlugin } from "../../types-odeWQ5Sn.js";
import { n as OpenClawPluginApi } from "../../plugin-entry-D6tZQojt.js";
//#region extensions/anthropic/register.runtime.d.ts
/** Build the full Anthropic provider descriptor used by runtime registration. */
declare function buildAnthropicProvider(): ProviderPlugin;
/** Register Anthropic provider, Claude CLI backend, and media understanding provider. */
declare function registerAnthropicPlugin(api: OpenClawPluginApi): void;
//#endregion
export { buildAnthropicProvider, registerAnthropicPlugin };