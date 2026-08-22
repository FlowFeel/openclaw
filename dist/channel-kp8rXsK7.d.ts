import { t as ChannelPlugin } from "./types.public-BVT2cLE1.js";
import { t as ResolvedBuzzAccount } from "./types-D7UrCHxC2.js";

//#region extensions/buzz/src/channel.d.ts
type BuzzProbeResult = {
  ok: true;
  publicKey: string;
  roomCount: number;
  rooms: Array<{
    id: string;
    name: string;
  }>;
};
declare const buzzPlugin: ChannelPlugin<ResolvedBuzzAccount, BuzzProbeResult, unknown>;
//#endregion
export { buzzPlugin as t };