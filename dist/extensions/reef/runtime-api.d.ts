import { V as PluginRuntime } from "../../types-BNrl3zyK.js";
import { i as ReefFriendManager, r as ReviewApprovalStore, t as ReefMessageFlow } from "../../flow-BO-71FgF.js";

//#region extensions/reef/src/runtime.d.ts
type ActiveReef = {
  flow: ReefMessageFlow;
  friends: ReefFriendManager;
  reviews: ReviewApprovalStore;
} | undefined;
declare const setReefRuntime: (next: PluginRuntime) => void, getOptionalReefRuntime: () => PluginRuntime | null, getReefRuntime: () => PluginRuntime;
declare function setActiveReef(value: ActiveReef): void;
declare const getActiveReef: () => {
  flow: ReefMessageFlow;
  friends: ReefFriendManager;
  reviews: ReviewApprovalStore;
};
//#endregion
export { getActiveReef, getReefRuntime, setActiveReef, setReefRuntime };