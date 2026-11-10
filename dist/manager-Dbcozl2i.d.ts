import { n as OpenClawConfig } from "./types.openclaw-szgVaeve.js";
import { S as SessionAcpMeta, o as SessionEntry } from "./channel-id.types-Zp5RM-xR.js";

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