import { Gn as SessionDiscussionInfo, Kn as SessionDiscussionProvider, qn as SessionDiscussionState } from "../types-CR0scl6B.js";

//#region src/plugins/session-discussion-registry.d.ts
declare function registerSessionDiscussionProvider(provider: SessionDiscussionProvider): void;
//#endregion
export { type SessionDiscussionInfo, type SessionDiscussionProvider, type SessionDiscussionState, registerSessionDiscussionProvider };