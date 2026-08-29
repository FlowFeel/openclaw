import { at as ChannelDirectoryEntry } from "../../setup-wizard-types-BLKR4ulg.js";
import { t as DirectoryConfigParams } from "../../directory-runtime-CbEe2l4-.js";

//#region extensions/buzz/src/directory-config.d.ts
declare function listBuzzDirectoryPeersFromConfig(_params: DirectoryConfigParams): Promise<ChannelDirectoryEntry[]>;
declare function listBuzzDirectoryGroupsFromConfig(params: DirectoryConfigParams): Promise<ChannelDirectoryEntry[]>;
//#endregion
//#region extensions/buzz/directory-contract-api.d.ts
declare const buzzDirectoryContractPlugin: {
  id: string;
  directory: {
    listPeers: typeof listBuzzDirectoryPeersFromConfig;
    listGroups: typeof listBuzzDirectoryGroupsFromConfig;
  };
};
//#endregion
export { buzzDirectoryContractPlugin, listBuzzDirectoryGroupsFromConfig, listBuzzDirectoryPeersFromConfig };