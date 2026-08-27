import { Kt as StreamFn } from "../../setup-wizard-types-BkzT-fEX.js";
import { h as ProviderWrapStreamFnContext } from "../../plugin-entry-CC26Si1X.js";
import { t as VllmQwenThinkingFormat } from "../../thinking-policy-Ccm0spUE.js";

//#region extensions/vllm/stream.d.ts
type VllmThinkingLevel = ProviderWrapStreamFnContext["thinkingLevel"];
declare function createVllmQwenThinkingWrapper(params: {
  baseStreamFn: StreamFn | undefined;
  format: VllmQwenThinkingFormat;
  thinkingLevel: VllmThinkingLevel;
}): StreamFn;
declare function wrapVllmProviderStream(ctx: ProviderWrapStreamFnContext): StreamFn | undefined;
//#endregion
export { createVllmQwenThinkingWrapper, wrapVllmProviderStream };