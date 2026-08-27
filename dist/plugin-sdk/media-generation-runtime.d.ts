import { n as OpenClawConfig } from "../types.openclaw-B4JlK2kd.js";
import { t as MediaKind } from "../constants-CbtCb9df.js";
import { r as resolveClosestSize } from "../runtime-shared-B2sffNvU.js";

//#region src/media/configured-max-bytes.d.ts
type GeneratedMediaKind = Extract<MediaKind, "audio" | "image" | "video">;
/** Resolves the global generated-media byte cap from the user-facing MB config value. */
/** Returns the configured media cap, falling back to the media-core per-kind default. */
declare function resolveGeneratedMediaMaxBytes(cfg: OpenClawConfig | undefined, kind: GeneratedMediaKind): number;
//#endregion
export { resolveClosestSize, resolveGeneratedMediaMaxBytes };