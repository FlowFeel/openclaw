import { vt as StreamFn } from "../../types.public-DrgteDAF.js";
import { T as ProviderWrapStreamFnContext } from "../../plugin-entry-CHoiSyUn.js";

//#region extensions/github-copilot/stream.d.ts
declare function wrapCopilotAnthropicStream(baseStreamFn: StreamFn | undefined): StreamFn | undefined;
declare function wrapCopilotProviderStream(ctx: ProviderWrapStreamFnContext): StreamFn | undefined;
//#endregion
export { wrapCopilotAnthropicStream, wrapCopilotProviderStream };