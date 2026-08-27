import { t as ChannelPlugin } from "../../types.public-C90co_3J.js";
import { r as OpenClawPluginApi, t as BundledChannelEntryContract } from "../../channel-entry-contract-BfwEggpZ.js";

//#region extensions/matrix/index.d.ts
declare function registerMatrixFullRuntime(api: OpenClawPluginApi): void;
declare const _default: BundledChannelEntryContract<ChannelPlugin>;
//#endregion
export { _default as default, registerMatrixFullRuntime };