import { n as OpenClawConfig, t as ConfigFileSnapshot } from "./types.openclaw-DlZm98yj.js";
import { n as ConfigWriteFollowUp, t as ConfigWriteAfterWrite } from "./io-_E5fHzgi.js";
//#region src/config/mutate.d.ts
type ConfigReplaceResult = {
  path: string;
  previousHash: string | null;
  snapshot: ConfigFileSnapshot;
  nextConfig: OpenClawConfig;
  persistedHash: string | null;
  afterWrite: ConfigWriteAfterWrite;
  followUp: ConfigWriteFollowUp;
};
//#endregion
export { ConfigReplaceResult as t };