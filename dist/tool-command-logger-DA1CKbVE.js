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
		...typeof entry.heapPct === "number" ? { heap: Math.round(entry.heapPct) } : {}
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
const DEFAULT_CONFIG = {
	logFilePath: process.env.OPENCLAW_TOOL_FLIGHT_LOG ?? "/tmp/openclaw/tool-call-commands.jsonl",
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
	record(entry) {
		if (!this.config.enabled) return;
		try {
			const line = formatFlightLogLine(entry) + "\n";
			const dir = path.dirname(this.config.logFilePath);
			if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
			this.checkAndRotate(line.length);
			fs.appendFileSync(this.config.logFilePath, line, "utf8");
		} catch {}
	}
	readRecent(limit = 20) {
		if (!fs.existsSync(this.config.logFilePath)) return [];
		try {
			return fs.readFileSync(this.config.logFilePath, "utf8").trim().split("\n").filter(Boolean).slice(-limit).map((line) => {
				const raw = JSON.parse(line);
				return {
					tool: raw.tool,
					paramsSummary: raw.params,
					ts: raw.ts,
					sessionKey: raw.session,
					turn: raw.turn,
					callId: raw.id,
					heapPct: raw.heap
				};
			});
		} catch {
			return [];
		}
	}
	checkAndRotate(incomingBytes) {
		try {
			if (!fs.existsSync(this.config.logFilePath)) return;
			if (fs.statSync(this.config.logFilePath).size + incomingBytes > this.config.maxFileSizeBytes) {
				const rotated = `${this.config.logFilePath}.1`;
				if (fs.existsSync(rotated)) fs.unlinkSync(rotated);
				fs.renameSync(this.config.logFilePath, rotated);
			}
		} catch {}
	}
};
const globalToolCommandLogger = new ToolCommandLogger();
//#endregion
export { condenseToolParameters as n, globalToolCommandLogger as t };
