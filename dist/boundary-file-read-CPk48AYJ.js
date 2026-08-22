import { t as FsSafeError } from "./errors-CIm_ZhaM.js";
import "./fs-safe-defaults-BsoUVa5C.js";
import { n as readFileDescriptorBoundedSync$1, t as readFileDescriptorBounded$1 } from "./bounded-read-Cox0d2jX.js";
import { n as matchRootFileOpenFailure } from "./root-file-dEMp_-h5.js";
//#region src/infra/boundary-file-read.ts
const MISSING_PATH_ERROR_CODES = /* @__PURE__ */ new Set(["ENOENT", "ENOTDIR"]);
function readFailureErrorCode(error) {
	const code = error && typeof error === "object" ? error.code : void 0;
	return typeof code === "string" && code ? code : void 0;
}
/**
* Describes a root-scoped open failure without collapsing every cause into a
* containment violation. Only `validation` means the path failed the boundary or
* alias check; a missing artifact or an unreadable descriptor is an ordinary
* operational state, and reporting those as escapes sends operators hunting a
* security incident that never happened.
*/
function describeRootFileOpenFailure(params) {
	const unreadable = (code) => `${params.subject} could not be read${code ? ` (${code})` : ""}: ${params.filePath}`;
	return matchRootFileOpenFailure(params.failure, {
		path: (failure) => {
			const code = readFailureErrorCode(failure.error);
			return code && !MISSING_PATH_ERROR_CODES.has(code) ? unreadable(code) : `${params.subject} not found: ${params.filePath}`;
		},
		validation: () => `${params.subject} escapes ${params.boundaryLabel} or fails alias checks: ${params.filePath}`,
		fallback: (failure) => unreadable(readFailureErrorCode(failure.error))
	});
}
function preserveOpenClawOverflowError(error, maxBytes) {
	if (error instanceof FsSafeError && error.code === "too-large") throw new RangeError(`File exceeds ${maxBytes} bytes`, { cause: error });
	throw error;
}
/** Read a pinned descriptor without changing OpenClaw's user-facing overflow error. */
async function readFileDescriptorBounded(fd, maxBytes) {
	try {
		return await readFileDescriptorBounded$1(fd, maxBytes);
	} catch (error) {
		return preserveOpenClawOverflowError(error, maxBytes);
	}
}
/** Synchronous variant for callers that own a pinned descriptor. */
function readFileDescriptorBoundedSync(fd, maxBytes) {
	try {
		return readFileDescriptorBoundedSync$1(fd, maxBytes);
	} catch (error) {
		return preserveOpenClawOverflowError(error, maxBytes);
	}
}
//#endregion
export { readFileDescriptorBounded as n, readFileDescriptorBoundedSync as r, describeRootFileOpenFailure as t };
