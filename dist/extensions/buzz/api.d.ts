import { z as PluginRuntime } from "../../types-CHzJhI3f.js";
import { i as resolveDefaultBuzzAccountId, n as listBuzzAccountIds, r as resolveBuzzAccount, t as ResolvedBuzzAccount } from "../../types-D7UrCHxC2.js";
import { t as buzzPlugin } from "../../channel-kp8rXsK7.js";
//#region extensions/buzz/src/runtime.d.ts
declare const setBuzzRuntime: (next: PluginRuntime) => void, getBuzzRuntime: () => PluginRuntime;
//#endregion
export { type ResolvedBuzzAccount, buzzPlugin, getBuzzRuntime, listBuzzAccountIds, resolveBuzzAccount, resolveDefaultBuzzAccountId, setBuzzRuntime };