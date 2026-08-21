import { r as isPidAlive, t as getFileLockProcessStartTime } from "./pid-alive-ClLrY9h9.js";
import { r as isOpenClawProcessArgv } from "./gateway-process-argv-Chy6ALqh.js";
import { a as readWindowsProcessStartTimeSync } from "./windows-port-pids-DA0cG5BM.js";
import { r as readGatewayProcessArgsSync } from "./gateway-processes-Rib2chcH.js";
import fs from "node:fs/promises";
//#region src/infra/session-lock-file-inspection.ts
const REPORT_ONLY_REASONS = /* @__PURE__ */ new Set(["too-old", "hold-exceeded"]);
function validNumber(value) {
	return typeof value === "number" && Number.isInteger(value) && value >= 0;
}
function readSessionLockProcessStartTime(pid) {
	return process.platform === "win32" ? readWindowsProcessStartTimeSync(pid, 1e3) : getFileLockProcessStartTime(pid);
}
function parseSessionLockFilePayload(raw) {
	try {
		const value = JSON.parse(raw);
		return {
			...validNumber(value.pid) && value.pid > 0 ? { pid: value.pid } : {},
			...typeof value.createdAt === "string" ? { createdAt: value.createdAt } : {},
			...validNumber(value.starttime) ? { starttime: value.starttime } : {},
			...validNumber(value.maxHoldMs) && value.maxHoldMs > 0 ? { maxHoldMs: value.maxHoldMs } : {}
		};
	} catch {
		return null;
	}
}
function inspectSessionLockFile(params) {
	const { payload } = params;
	const pid = validNumber(payload?.pid) && payload.pid > 0 ? payload.pid : null;
	const pidAlive = pid !== null && isPidAlive(pid);
	const createdAt = typeof payload?.createdAt === "string" ? payload.createdAt : null;
	const createdAtMs = createdAt ? Date.parse(createdAt) : NaN;
	const ageMs = Number.isFinite(createdAtMs) ? Math.max(0, params.nowMs - createdAtMs) : null;
	const storedStarttime = validNumber(payload?.starttime) ? payload.starttime : null;
	const currentStarttime = pidAlive && pid !== null && storedStarttime !== null ? readSessionLockProcessStartTime(pid) : null;
	const recycled = storedStarttime !== null && currentStarttime !== null && currentStarttime !== storedStarttime;
	const staleReasons = [];
	if (pid === null) staleReasons.push("missing-pid");
	else if (!pidAlive) staleReasons.push("dead-pid");
	else if (recycled) staleReasons.push("recycled-pid");
	if (ageMs === null) staleReasons.push("invalid-createdAt");
	else if (ageMs > params.staleMs) staleReasons.push("too-old");
	if (params.respectMaxHold && payload?.maxHoldMs && ageMs !== null && ageMs > payload.maxHoldMs) staleReasons.push("hold-exceeded");
	if (pid === process.pid && !params.heldByThisProcess && !recycled && (storedStarttime !== null ? currentStarttime === storedStarttime : params.reclaimLockWithoutStarttime === true)) staleReasons.push("orphan-self-pid");
	else if (pidAlive && pid !== null && !recycled && !params.heldByThisProcess) try {
		const args = (params.readOwnerProcessArgs ?? readGatewayProcessArgsSync)(pid);
		if (args?.some((arg) => arg.trim()) && !isOpenClawProcessArgv(args)) staleReasons.push("non-openclaw-owner");
	} catch {}
	return {
		pid,
		pidAlive,
		createdAt,
		ageMs,
		stale: staleReasons.length > 0,
		staleReasons
	};
}
async function inspectSessionLockFileContention(params) {
	const inspection = inspectSessionLockFile(params);
	const malformedOnly = inspection.staleReasons.every((reason) => reason === "missing-pid" || reason === "invalid-createdAt");
	let report = inspection.stale && !params.heldByThisProcess;
	if (report && malformedOnly) try {
		report = params.nowMs - (await fs.stat(params.lockPath)).mtimeMs > Math.min(params.staleMs, params.orphanGraceMs);
	} catch (error) {
		report = error.code !== "ENOENT";
	}
	return {
		inspection,
		report,
		removable: report && !inspection.staleReasons.every((reason) => REPORT_ONLY_REASONS.has(reason))
	};
}
//#endregion
export { parseSessionLockFilePayload as n, readSessionLockProcessStartTime as r, inspectSessionLockFileContention as t };
