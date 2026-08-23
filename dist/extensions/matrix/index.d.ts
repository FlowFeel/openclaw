import { t as ChannelPlugin } from "../../types.public-BVT2cLE1.js";
import { r as OpenClawPluginApi, t as BundledChannelEntryContract } from "../../channel-entry-contract-BknYF3Hu.js";

//#region extensions/matrix/index.d.ts
declare function registerMatrixFullRuntime(api: OpenClawPluginApi): void;
declare const _default: BundledChannelEntryContract<ChannelPlugin>;
//#endregion
export { _default as default, registerMatrixFullRuntime };