//#region src/plugins/doctor-session-route-state-owner-types.d.ts
type DoctorSessionRouteStateOwner = {
  id: string;
  label: string;
  providerIds?: readonly string[];
  runtimeIds?: readonly string[];
  cliSessionKeys?: readonly string[];
  authProfilePrefixes?: readonly string[];
};
//#endregion
//#region extensions/anthropic/doctor-contract-api.d.ts
/** Anthropic currently has no legacy config migrations. */
declare const legacyConfigRules: never[];
/** Session-route ownership metadata for Anthropic API and Claude CLI sessions. */
declare const sessionRouteStateOwners: DoctorSessionRouteStateOwner[];
//#endregion
export { legacyConfigRules, sessionRouteStateOwners };