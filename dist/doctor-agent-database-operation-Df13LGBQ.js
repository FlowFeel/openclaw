import { h as shortenHomePath } from "./utils-Bs67j6-3.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as note } from "./note-uiKX_qfX.js";
//#region src/commands/doctor-agent-database-operation.ts
/** Keep one unusable agent database from aborting sibling Doctor work. */
function runDoctorAgentDatabaseOperation(params) {
	try {
		return {
			ok: true,
			value: params.run()
		};
	} catch (error) {
		note(`- Agent ${params.agentId} database ${shortenHomePath(params.path)}: ${formatErrorMessage(error)}`, "Doctor warnings");
		return { ok: false };
	}
}
//#endregion
export { runDoctorAgentDatabaseOperation as t };
