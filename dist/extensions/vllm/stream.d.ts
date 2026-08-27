import { Kt as StreamFn } from "../../setup-wizard-types-CPFgdzIT.js";
import { h as ProviderWrapStreamFnContext } from "../../plugin-entry-Bcv4dwhw.js";
import { t as VllmQwenThinkingFormat } from "../../thinking-policy-DZpPw2yf.js";

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