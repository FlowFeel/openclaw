import { r as closeOpenClawStateDatabase } from "../openclaw-state-db-BU55lNCH.js";
import { n as pruneExpiredAuditEvents, r as recordAuditEvent } from "../audit-event-store-DQ98lzmf.js";
import { parentPort, workerData } from "node:worker_threads";
//#region src/audit/audit-event-writer.worker.ts
/** Worker-thread entrypoint for serialized audit writes and retention maintenance. */
const AUDIT_MAINTENANCE_INTERVAL_MS = 60 * 6e4;
const stateDir = workerData && typeof workerData === "object" && typeof workerData.stateDir === "string" ? workerData.stateDir : void 0;
if (!parentPort || !stateDir) throw new Error("audit event writer requires a parent port and state directory");
const port = parentPort;
const database = { env: { OPENCLAW_STATE_DIR: stateDir } };
function reportMaintenance() {
	try {
		pruneExpiredAuditEvents({ database });
	} catch (error) {
		port.postMessage({
			type: "maintenance-error",
			error: String(error)
		});
	}
}
reportMaintenance();
const maintenanceTimer = setInterval(reportMaintenance, AUDIT_MAINTENANCE_INTERVAL_MS);
port.postMessage({ type: "ready" });
port.on("message", (message) => {
	if (message.type === "record") {
		try {
			recordAuditEvent(message.input, database);
			port.postMessage({ type: "recorded" });
		} catch (error) {
			port.postMessage({
				type: "record-error",
				error: String(error)
			});
		}
		return;
	}
	clearInterval(maintenanceTimer);
	reportMaintenance();
	try {
		closeOpenClawStateDatabase();
	} catch (error) {
		port.postMessage({
			type: "maintenance-error",
			error: String(error)
		});
	}
	port.postMessage({ type: "stopped" });
	port.close();
});
//#endregion
export {};
