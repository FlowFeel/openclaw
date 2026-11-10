import { Q as BaseProbeResult } from "./setup-wizard-types-BLKR4ulg.js";
import { t as ChannelPlugin } from "./types.public-60lQ44UL.js";
import { t as ResolvedMatrixAccount } from "./accounts-pAuHLsdH.js";
//#region extensions/matrix/src/matrix/probe.d.ts
type MatrixProbe = BaseProbeResult & {
  status?: number | null;
  elapsedMs: number;
  userId?: string | null;
};
//#endregion
//#region extensions/matrix/src/channel.d.ts
declare const matrixPlugin: ChannelPlugin<ResolvedMatrixAccount, MatrixProbe>;
//#endregion
export { matrixPlugin as t };