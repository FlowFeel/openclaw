import { t as sameFileIdentity } from "./file-identity-C0fBiekR.js";
import fs from "node:fs";
//#region node_modules/@openclaw/fs-safe/dist/temp-cleanup.js
const tempCleanupEntries = /* @__PURE__ */ new Map();
let cleanupRegistered = false;
function pathStillMatchesReceipt(entry) {
	if (!entry.identity) return false;
	try {
		return sameFileIdentity(fs.lstatSync(entry.path), entry.identity);
	} catch (error) {
		return error.code === "ENOENT";
	}
}
function cleanupRegisteredTempPathsSync() {
	for (const entry of tempCleanupEntries.values()) try {
		if (pathStillMatchesReceipt(entry)) fs.rmSync(entry.path, {
			force: true,
			recursive: entry.recursive
		});
	} catch {}
	tempCleanupEntries.clear();
}
function registerTempPathForExit(tempPath, options) {
	if (!cleanupRegistered) {
		cleanupRegistered = true;
		process.once("exit", cleanupRegisteredTempPathsSync);
	}
	const entry = {
		path: tempPath,
		recursive: options?.recursive === true,
		identity: options?.identity
	};
	if (!entry.identity) try {
		entry.identity = fs.lstatSync(tempPath);
	} catch {}
	tempCleanupEntries.set(tempPath, entry);
	const unregister = (() => {
		tempCleanupEntries.delete(tempPath);
	});
	unregister.setIdentity = (identity) => {
		entry.identity = identity;
	};
	return unregister;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/write-queue.js
const writeQueues = /* @__PURE__ */ new Map();
async function serializePathWrite(key, run) {
	const previous = writeQueues.get(key) ?? Promise.resolve();
	const task = (async () => {
		await previous.catch(() => void 0);
		return await run();
	})();
	const done = task.then(() => void 0, () => void 0);
	writeQueues.set(key, done);
	try {
		return await task;
	} finally {
		if (writeQueues.get(key) === done) writeQueues.delete(key);
	}
}
//#endregion
export { registerTempPathForExit as n, serializePathWrite as t };
