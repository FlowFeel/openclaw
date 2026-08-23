import { V as PluginRuntime } from "../../types-CAQ6JuHx.js";
import { i as ReefFriendManager, r as ReviewApprovalStore, t as ReefMessageFlow } from "../../flow-DudOKd8Z.js";

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