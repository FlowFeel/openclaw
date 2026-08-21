import { r as MigrationItem } from "../../plugin-entry-CHoiSyUn.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-BWNwgCj_.js";

//#region extensions/migrate-hermes/skills.d.ts
declare function buildSkillItems(params: {
  source: HermesSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildSkillItems };