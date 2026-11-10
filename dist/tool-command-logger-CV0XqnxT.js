import fs from "node:fs";
import path from "node:path";
//#region src/infra/tool-command-log/tool-command-formatter.ts
const MAX_SUMMARY_CHARS = 100;
function condenseToolParameters(toolName, rawParams) {
	if (!rawParams || typeof rawParams !== "object") return String(rawParams ?? "").slice(0, MAX_SUMMARY_CHARS);
	const record = rawParams;
	switch (toolName.toLowerCase()) {
		case "exec":
		case "bash":
		case "terminal": return String(record.command ?? record.cmd ?? record.script ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_SUMMARY_CHARS);
		case "web_search":
		case "search": return `query: ${String(record.query ?? record.q ?? "").trim()}`.slice(0, MAX_SUMMARY_CHARS);
		case "sessions_spawn":
		case "subagent": {
			const task = String(record.task ?? record.prompt ?? "").trim();
			return `task:${record.agentId ? ` [${record.agentId}]` : ""} ${task}`.replace(/\s+/g, " ").slice(0, MAX_SUMMARY_CHARS);
		}
		case "read":
		case "write":
		case "view_file":
		case "edit_file": return `path: ${String(record.path ?? record.file ?? record.targetFile ?? record.absolutePath ?? "").trim()}`.slice(0, MAX_SUMMARY_CHARS);
		default: {
			const parts = [];
			for (const [key, val] of Object.entries(record)) if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
				parts.push(`${key}=${val}`);
				if (parts.length >= 2) break;
			}
			return parts.join(", ").slice(0, MAX_SUMMARY_CHARS);
		}
	}
}
function formatFlightLogLine(entry) {
	const cleanSummary = entry.paramsSummary.replace(/[\r\n\t]+/g, " ").trim();
	const payload = {
		tool: entry.tool,
		params: cleanSummary,
		ts: entry.ts,
		session: entry.sessionKey,
		turn: entry.turn,
		...entry.callId ? { id: entry.callId } : {},
		...typeof entry.heapPct === "number" ? { heap: Math.round(entry.heapPct) } : {},
		...entry.rawResult !== void 0 ? { result: entry.rawResult } : {}
	};
	return JSON.stringify(payload);
}
//#endregion
//#region src/infra/tool-command-log/tool-command-logger.ts
/**
* File-Backed Append Logger for Gateway Tool Flight Recorder.
* Goldilocks decomposition unit (< 115 LOC).
* 
* @dft:axiom A3 (Observability & Controllability)
*/
function resolveDefaultLogPath() {
	if (process.env.OPENCLAW_TOOL_FLIGHT_LOG) return process.env.OPENCLAW_TOOL_FLIGHT_LOG;
	const persistentDir = "/home/node/.openclaw/workspace/logs";
	try {
		if (fs.existsSync(persistentDir) || fs.mkdirSync(persistentDir, { recursive: true })) return path.join(persistentDir, "tool-call-commands.jsonl");
	} catch {}
	return "/tmp/openclaw/tool-call-commands.jsonl";
}
function ensureLegacySymlink(targetPath) {
	const legacyPath = "/tmp/openclaw/tool-call-commands.jsonl";
	if (targetPath === legacyPath) return;
	try {
		const legacyDir = path.dirname(legacyPath);
		if (!fs.existsSync(legacyDir)) fs.mkdirSync(legacyDir, { recursive: true });
		const stat = fs.existsSync(legacyPath) ? fs.lstatSync(legacyPath) : null;
		if (stat) {
			if (stat.isSymbolicLink()) try {
				if (fs.readlinkSync(legacyPath) === targetPath) return;
			} catch {}
			fs.unlinkSync(legacyPath);
		}
		fs.symlinkSync(targetPath, legacyPath);
	} catch {}
}
const DEFAULT_CONFIG = {
	logFilePath: resolveDefaultLogPath(),
	maxFileSizeBytes: 10 * 1024 * 1024,
	enabled: true
};
var ToolCommandLogger = class {
	constructor(config) {
		this.config = {
			...DEFAULT_CONFIG,
			...config
		};
	}
	getLogFilePath() {
		return process.env.OPENCLAW_TOOL_FLIGHT_LOG ?? this.config.logFilePath;
	}
	record(entry) {
		if (!this.config.enabled) return;
		try {
			const logPath = this.getLogFilePath();
			const line = formatFlightLogLine(entry) + "\n";
			const dir = path.dirname(logPath);
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			ensureLegacySymlink(logPath);
			this.checkAndRotate(line.length);
			fs.appendFileSync(logPath, line, "utf8");
		} catch {}
	}
	readRecent(limit = 20) {
		const logPath = this.getLogFilePath();
		if (!fs.existsSync(logPath)) return [];
		try {
			return fs.readFileSync(logPath, "utf8").trim().split("\n").filter(Boolean).slice(-limit).map((line) => {
				const raw = JSON.parse(line);
				return {
					tool: raw.tool,
					paramsSummary: raw.params,
					ts: raw.ts,
					sessionKey: raw.session,
					turn: raw.turn,
					callId: raw.id,
					heapPct: raw.heap,
					rawResult: raw.result
				};
			});
		} catch {
			return [];
		}
	}
	readByCallId(callId) {
		const logPath = this.getLogFilePath();
		const candidates = [logPath, `${logPath}.1`];
		for (const filePath of candidates) {
			if (!fs.existsSync(filePath)) continue;
			try {
				const lines = fs.readFileSync(filePath, "utf8").trim().split("\n").filter(Boolean);
				for (let i = lines.length - 1; i >= 0; i--) {
					const raw = JSON.parse(lines[i]);
					if (raw.id === callId) return {
						tool: raw.tool,
						paramsSummary: raw.params,
						ts: raw.ts,
						sessionKey: raw.session,
						turn: raw.turn,
						callId: raw.id,
						heapPct: raw.heap,
						rawResult: raw.result
					};
				}
			} catch {}
		}
		return null;
	}
	checkAndRotate(incomingBytes) {
		try {
			const logPath = this.getLogFilePath();
			if (!fs.existsSync(logPath)) return;
			if (fs.statSync(logPath).size + incomingBytes > this.config.maxFileSizeBytes) {
				const rotated = `${logPath}.1`;
				if (fs.existsSync(rotated)) fs.unlinkSync(rotated);
				fs.renameSync(logPath, rotated);
			}
		} catch {}
	}
};
const globalToolCommandLogger = new ToolCommandLogger();
//#endregion
export { condenseToolParameters as n, globalToolCommandLogger as t };
