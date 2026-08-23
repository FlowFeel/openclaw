import { s as StreamFn } from "../../index-4iyL9Wnl.js";
import { d as ProviderWrapStreamFnContext } from "../../plugin-entry-Ba15Paz9.js";

//#region extensions/xai/stream.d.ts
declare function wrapXaiProviderStream(ctx: ProviderWrapStreamFnContext, runtime?: {
  clientVersion?: string;
}): StreamFn | undefined;
//#endregion
export { wrapXaiProviderStream };