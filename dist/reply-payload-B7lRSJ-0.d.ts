import { p as ReplyPayload$1 } from "./types-zW07lbxl.js";
//#region src/plugin-sdk/reply-payload.d.ts
/** Plugin-facing reply payload without core-only trusted local media internals. */
type ReplyPayload = Omit<ReplyPayload$1, "trustedLocalMedia">;
//#endregion
export { ReplyPayload as t };