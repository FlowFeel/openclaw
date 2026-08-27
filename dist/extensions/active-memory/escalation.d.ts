import { f as ActiveMemoryMode } from "../../types-C-rq0q5B.js";

//#region extensions/active-memory/escalation.d.ts
declare function hasRecallIntent(message: string): boolean;
declare function shouldEscalateRecall(params: {
  mode: ActiveMemoryMode;
  message: string;
  hasStrongLaneOneHit: boolean;
}): boolean;
//#endregion
export { hasRecallIntent, shouldEscalateRecall };