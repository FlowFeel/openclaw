import { t as globalToolCommandLogger } from "./tool-command-logger-DA1CKbVE.js";
import fs from "node:fs";
import path from "node:path";
//#region src/infra/gateway-death-record/death-record-formatter.ts
function captureProcessMemorySnapshot() {
	const mem = process.memoryUsage();
	const rssMb = Math.round(mem.rss / (1024 * 1024) * 10) / 10;
	const heapUsedMb = Math.round(mem.heapUsed / (1024 * 1024) * 10) / 10;
	const heapTotalMb = Math.round(mem.heapTotal / (1024 * 1024) * 10) / 10;
	return {
		rssMb,
		heapUsedMb,
		heapTotalMb,
		heapPct: heapTotalMb > 0 ? Math.round(heapUsedMb / heapTotalMb * 1e3) / 10 : 0
	};
}
function buildDeathRecord(params) {
	const now = Date.now();
	return {
		timestamp: now,
		uptimeSeconds: Math.max(0, Math.round((now - params.startTimeMs) / 1e3)),
		exitCode: params.exitCode,
		signal: params.signal,
		reason: params.reason ? String(params.reason).slice(0, 300) : void 0,
		memory: captureProcessMemorySnapshot(),
		lastToolCommands: params.lastToolCommands.slice(-5)
	};
}
//#endregion
//#region src/infra/gateway-death-record/death-record-storage.ts
/**
* Atomic Storage for Gateway Death Records.
* Goldilocks decomposition unit (< 95 LOC).
* 
* @dft:axiom A3 (Observability & Controllability)
*/
const DEFAULT_DEATH_RECORD_PATH = process.env.OPENCLAW_DEATH_RECORD_PATH ?? "/tmp/openclaw/death-record.json";
var GatewayDeathRecordStorage = class {
	constructor(filePath = DEFAULT_DEATH_RECORD_PATH) {
		this.filePath = filePath;
	}
	write(record) {
		try {
			const dir = path.dirname(this.filePath);
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			const tempPath = `${this.filePath}.tmp.${process.pid}`;
			const payload = JSON.stringify(record, null, 2);
			fs.writeFileSync(tempPath, payload, "utf8");
			fs.renameSync(tempPath, this.filePath);
		} catch {}
	}
	readPrevious() {
		if (!fs.existsSync(this.filePath)) return null;
		try {
			const raw = fs.readFileSync(this.filePath, "utf8");
			return JSON.parse(raw);
		} catch {
			return null;
		}
	}
	clear() {
		try {
			if (fs.existsSync(this.filePath)) fs.unlinkSync(this.filePath);
		} catch {}
	}
};
const globalDeathRecordStorage = new GatewayDeathRecordStorage();
//#endregion
//#region src/infra/gateway-death-record/death-record-hook.ts
/**
* Process Lifecycle Exit & Crash Hook Installer.
* Goldilocks decomposition unit (< 90 LOC).
* 
* @dft:axiom A3 (Observability & Controllability)
*/
let isHookInstalled = false;
let processStartTime = Date.now();
function installGatewayDeathRecordHook(startTimeMs = Date.now()) {
	if (isHookInstalled) return;
	isHookInstalled = true;
	processStartTime = startTimeMs;
	const handleTermination = (signal, exitCode, reason) => {
		try {
			const recent = globalToolCommandLogger.readRecent(5);
			const record = buildDeathRecord({
				exitCode,
				signal,
				reason,
				startTimeMs: processStartTime,
				lastToolCommands: recent
			});
			globalDeathRecordStorage.write(record);
		} catch {}
	};
	process.once("exit", (code) => handleTermination(void 0, code, "process.exit"));
	process.once("SIGTERM", () => handleTermination("SIGTERM", 143, "SIGTERM received"));
	process.once("SIGINT", () => handleTermination("SIGINT", 130, "SIGINT received"));
	process.on("uncaughtException", (err) => {
		handleTermination(void 0, 1, `uncaughtException: ${err?.message ?? err}`);
	});
	process.on("unhandledRejection", (reason) => {
		handleTermination(void 0, 1, `unhandledRejection: ${String(reason)}`);
	});
}
//#endregion
export { globalDeathRecordStorage, installGatewayDeathRecordHook };
