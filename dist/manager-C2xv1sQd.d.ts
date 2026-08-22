import { n as OpenClawConfig } from "./types.openclaw-DlZm98yj.js";
import { S as SessionAcpMeta, o as SessionEntry } from "./channel-id.types-CNSVyOiV.js";

//#region src/acp/runtime/session-meta.d.ts
type AcpSessionStoreEntry = {
  cfg: OpenClawConfig;
  agentId?: string;
  storePath: string;
  sessionKey: string;
  storeSessionKey: string;
  entry?: SessionEntry;
  acp?: SessionAcpMeta;
  storeReadFailed?: boolean;
};
//#endregion
export { AcpSessionStoreEntry as t };