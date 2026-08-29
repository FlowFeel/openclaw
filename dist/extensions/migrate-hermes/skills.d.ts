import { r as MigrationItem } from "../../plugin-entry-rqx6-3xm.js";
import { HermesSource } from "./source.js";
import { t as PlannedMigrationTargets } from "../../targets-eTFqDstj.js";

//#region extensions/migrate-hermes/skills.d.ts
declare function buildSkillItems(params: {
  source: HermesSource;
  targets: PlannedMigrationTargets;
  overwrite?: boolean;
}): Promise<MigrationItem[]>;
//#endregion
export { buildSkillItems };