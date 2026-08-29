import { a as MigrationProviderContext, o as MigrationProviderPlugin } from "../../plugin-entry-rqx6-3xm.js";

//#region extensions/migrate-hermes/provider.d.ts
declare function buildHermesMigrationProvider(params?: {
  runtime?: MigrationProviderContext["runtime"];
}): MigrationProviderPlugin;
//#endregion
export { buildHermesMigrationProvider };