import { z as PluginRuntime } from "../../types-i_xbZp0W.js";
import { i as resolveDefaultBuzzAccountId, n as listBuzzAccountIds, r as resolveBuzzAccount, t as ResolvedBuzzAccount } from "../../types-B7G3Lucq2.js";
import { t as buzzPlugin } from "../../channel-Dy7zNWAT.js";
//#region extensions/buzz/src/runtime.d.ts
declare const setBuzzRuntime: (next: PluginRuntime) => void, getBuzzRuntime: () => PluginRuntime;
//#endregion
export { type ResolvedBuzzAccount, buzzPlugin, getBuzzRuntime, listBuzzAccountIds, resolveBuzzAccount, resolveDefaultBuzzAccountId, setBuzzRuntime };