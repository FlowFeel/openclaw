import { at as ChannelDirectoryEntry } from "../../setup-wizard-types-Bj4z83z4.js";
import { t as DirectoryConfigParams } from "../../directory-runtime-CWAGxD3v.js";
import { n as listDiscordDirectoryPeersFromConfig, t as listDiscordDirectoryGroupsFromConfig } from "../../directory-config-Cp4Vsps5.js";

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