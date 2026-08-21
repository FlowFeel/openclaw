import { r as GroupKeyResolution } from "./types-CJ2AFyfH.js";
import { s as MsgContext } from "./templating-BhJuWyZk.js";
import { l as InboundLastRouteUpdate } from "./pairing-messages-B0hswANx.js";

//#region src/channels/session.d.ts
declare function recordInboundSession(params: {
  storePath: string;
  sessionKey: string;
  ctx: MsgContext;
  groupResolution?: GroupKeyResolution | null;
  createIfMissing?: boolean;
  updateLastRoute?: InboundLastRouteUpdate;
  onRecordError: (err: unknown) => void;
  trackSessionMetaTask?: (task: Promise<unknown>) => void;
}): Promise<void>;
//#endregion
export { recordInboundSession as t };