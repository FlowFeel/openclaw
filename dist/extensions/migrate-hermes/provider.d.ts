import { a as MigrationProviderContext, o as MigrationProviderPlugin } from "../../plugin-entry-i32wLQY9.js";

//#region extensions/migrate-hermes/provider.d.ts
declare function buildHermesMigrationProvider(params?: {
  runtime?: MigrationProviderContext["runtime"];
}): MigrationProviderPlugin;
//#endregion
export { buildHermesMigrationProvider };