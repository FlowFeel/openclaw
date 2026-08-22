import { a as MigrationProviderContext, o as MigrationProviderPlugin } from "../../plugin-entry-tcwokeHw.js";

//#region extensions/migrate-claude/provider.d.ts
declare function buildClaudeMigrationProvider(params?: {
  runtime?: MigrationProviderContext["runtime"];
}): MigrationProviderPlugin;
//#endregion
export { buildClaudeMigrationProvider };