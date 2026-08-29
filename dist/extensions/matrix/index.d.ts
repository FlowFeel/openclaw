import { t as ChannelPlugin } from "../../types.public-60lQ44UL.js";
import { r as OpenClawPluginApi, t as BundledChannelEntryContract } from "../../channel-entry-contract-DfOOnpu6.js";

//#region extensions/matrix/index.d.ts
declare function registerMatrixFullRuntime(api: OpenClawPluginApi): void;
declare const _default: BundledChannelEntryContract<ChannelPlugin>;
//#endregion
export { _default as default, registerMatrixFullRuntime };