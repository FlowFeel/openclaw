import { n as OpenClawConfig } from "../../types.openclaw-C0MxgyRv.js";
import { ut as ChannelLegacyStateMigrationPlan } from "../../setup-wizard-types-D5xd-hmi.js";
//#region extensions/telegram/src/state-migrations.d.ts
declare function detectTelegramLegacyStateMigrations(params: {
  cfg: OpenClawConfig;
  env: NodeJS.ProcessEnv;
  stateDir?: string;
}): Promise<ChannelLegacyStateMigrationPlan[]>;
//#endregion
export { detectTelegramLegacyStateMigrations };