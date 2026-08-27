import { n as ChannelPlugin } from "../../types.public-CsbJ5efK.js";
import { t as ResolvedRaftAccount } from "../../accounts-1EWGbFDJ.js";

//#region extensions/raft/src/channel.d.ts
type RaftProbe = {
  cliFound: boolean;
};
declare const raftPlugin: ChannelPlugin<ResolvedRaftAccount, RaftProbe>;
//#endregion
export { raftPlugin };