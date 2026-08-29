import { z as PluginRuntime } from "../../types-DhsBnKIv.js";
import { i as resolveDefaultBuzzAccountId, n as listBuzzAccountIds, r as resolveBuzzAccount, t as ResolvedBuzzAccount } from "../../types-DOqXFKt92.js";
import { t as buzzPlugin } from "../../channel-OaKq7cFz.js";
//#region extensions/buzz/src/runtime.d.ts
declare const setBuzzRuntime: (next: PluginRuntime) => void, getBuzzRuntime: () => PluginRuntime;
//#endregion
export { type ResolvedBuzzAccount, buzzPlugin, getBuzzRuntime, listBuzzAccountIds, resolveBuzzAccount, resolveDefaultBuzzAccountId, setBuzzRuntime };