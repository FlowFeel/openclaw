import { a as MigrationProviderContext, o as MigrationProviderPlugin } from "../../plugin-entry-CS8C3z51.js";

//#region extensions/migrate-hermes/provider.d.ts
declare function buildHermesMigrationProvider(params?: {
  runtime?: MigrationProviderContext["runtime"];
}): MigrationProviderPlugin;
//#endregion
export { buildHermesMigrationProvider };