import { i as OpenClawConfig } from "../types.openclaw-DvmDDNUn.js";
import { a as MsgContext } from "../templating-4qliXN7P.js";

//#region src/link-understanding/apply.d.ts
type ApplyLinkUnderstandingResult = {
  outputs: string[];
  urls: string[];
};
/** Runs link understanding and folds successful outputs into the inbound context. */
declare function applyLinkUnderstanding(params: {
  ctx: MsgContext;
  cfg: OpenClawConfig;
}): Promise<ApplyLinkUnderstandingResult>;
//#endregion
export { applyLinkUnderstanding };