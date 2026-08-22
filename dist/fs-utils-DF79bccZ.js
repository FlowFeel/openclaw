import { n as configureFsSafeNative } from "./errors-CIm_ZhaM.js";
//#region packages/memory-host-sdk/src/host/fs-utils.ts
if (!Object.keys(process.env).some((key) => /^(?:OPENCLAW_)?FS_SAFE_(?:NATIVE|PYTHON)_MODE$/u.test(process.platform === "win32" ? key.toUpperCase() : key))) configureFsSafeNative({ mode: "off" });
/** True for missing-file errors emitted by Node or fs-safe. */
function isFileMissingError(err) {
	return Boolean(err && typeof err === "object" && "code" in err && (err.code === "ENOENT" || err.code === "ENOTDIR" || err.code === "not-found"));
}
//#endregion
export { isFileMissingError as t };
