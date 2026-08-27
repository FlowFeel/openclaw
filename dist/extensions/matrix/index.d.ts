import { t as ChannelPlugin } from "../../types.public-BtNAHu6Z.js";
import { r as OpenClawPluginApi, t as BundledChannelEntryContract } from "../../channel-entry-contract-DYLp7rA0.js";

//#region extensions/matrix/index.d.ts
declare function registerMatrixFullRuntime(api: OpenClawPluginApi): void;
declare const _default: BundledChannelEntryContract<ChannelPlugin>;
//#endregion
export { _default as default, registerMatrixFullRuntime };