import { t as ChannelPlugin } from "./types.public-60lQ44UL.js";
import { t as ResolvedBuzzAccount } from "./types-DOqXFKt92.js";

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