import { r as MigrationItem } from "../../plugin-entry-i32wLQY9.js";
import { HermesProviderConfig } from "./config-provider-contract.js";

//#region extensions/migrate-hermes/config-providers.d.ts
type HermesProviderSecretBinding = {
  envVar: string;
  provider: string;
};
declare function collectHermesProviders(config: Record<string, unknown>, env?: Record<string, string>, includeSecrets?: boolean): HermesProviderConfig[];
declare function collectHermesProviderSecretBindings(config: Record<string, unknown>, env?: Record<string, string>): HermesProviderSecretBinding[];
declare function addSelectedModelToProvider(providers: HermesProviderConfig[], modelRef: string | undefined): void;
declare function providerManualItems(config: Record<string, unknown>, env: Record<string, string>, includeSecrets: boolean): MigrationItem[];
//#endregion
export { addSelectedModelToProvider, collectHermesProviderSecretBindings, collectHermesProviders, providerManualItems };