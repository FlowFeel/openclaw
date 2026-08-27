import { n as OpenClawConfig } from "../../types.openclaw-rejpcq0R.js";
import { s as StreamFn } from "../../agent-core-4iyL9Wnl.js";
//#region extensions/openai/native-web-search.d.ts
declare function createOpenAINativeWebSearchWrapper(baseStreamFn: StreamFn | undefined, params: {
  config?: OpenClawConfig;
  agentId?: string;
  nativeWebSearchAllowedByToolPolicy?: boolean;
}): StreamFn;
//#endregion
export { createOpenAINativeWebSearchWrapper };