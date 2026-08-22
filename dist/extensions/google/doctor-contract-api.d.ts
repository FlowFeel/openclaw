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
//#region extensions/google/doctor-contract-api.d.ts
declare const sessionRouteStateOwners: DoctorSessionRouteStateOwner[];
//#endregion
export { sessionRouteStateOwners };