import { at as ChannelDirectoryEntry } from "./setup-wizard-types-BLKR4ulg.js";
import { t as DirectoryConfigParams } from "./directory-runtime-CbEe2l4-.js";

//#region extensions/discord/src/directory-config.d.ts
declare const listDiscordDirectoryPeersFromConfig: (configParams: DirectoryConfigParams) => Promise<ChannelDirectoryEntry[]>;
declare const listDiscordDirectoryGroupsFromConfig: (configParams: DirectoryConfigParams) => Promise<ChannelDirectoryEntry[]>;
//#endregion
export { listDiscordDirectoryPeersFromConfig as n, listDiscordDirectoryGroupsFromConfig as t };