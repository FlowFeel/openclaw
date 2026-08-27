import { r as MigrationItem } from "../../plugin-entry-V3twzgF5.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-BbflXLyB.js";

//#region extensions/migrate-hermes/skills.d.ts
declare function buildSkillItems(params: {
  source: HermesSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildSkillItems };