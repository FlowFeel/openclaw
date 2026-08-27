import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import "../../core-CRsjVk-I.js";
import { t as isMemoryMachineOutput } from "../../cli-output-mode-BP4_Pjh9.js";
//#region extensions/memory-lancedb/cli-metadata.ts
var cli_metadata_default = definePluginEntry({
	id: "memory-lancedb",
	name: "Memory LanceDB",
	description: "LanceDB-backed memory provider",
	register(api) {
		api.registerCli(() => {}, { descriptors: [{
			name: "ltm",
			description: "Inspect and query LanceDB-backed memory",
			hasSubcommands: true,
			machineOutput: isMemoryMachineOutput
		}] });
	}
});
//#endregion
export { cli_metadata_default as default };
