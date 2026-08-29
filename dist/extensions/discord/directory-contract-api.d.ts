import { at as ChannelDirectoryEntry } from "../../setup-wizard-types-BLKR4ulg.js";
import { t as DirectoryConfigParams } from "../../directory-runtime-CbEe2l4-.js";
import { n as listDiscordDirectoryPeersFromConfig, t as listDiscordDirectoryGroupsFromConfig } from "../../directory-config-DWlo3Jbw.js";

//#region extensions/discord/directory-contract-api.d.ts
declare const discordDirectoryContractPlugin: {
  id: string;
  directory: {
    listPeers: (configParams: DirectoryConfigParams) => Promise<ChannelDirectoryEntry[]>;
    listGroups: (configParams: DirectoryConfigParams) => Promise<ChannelDirectoryEntry[]>;
  };
};
//#endregion
export { discordDirectoryContractPlugin, listDiscordDirectoryGroupsFromConfig, listDiscordDirectoryPeersFromConfig };