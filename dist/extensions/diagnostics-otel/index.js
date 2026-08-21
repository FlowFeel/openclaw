import { t as definePluginEntry } from "../../plugin-entry-DjIG8BVe.js";
import { t as createDiagnosticsOtelService } from "../../runtime-api-CF8k3urW.js";
//#region extensions/diagnostics-otel/index.ts
var diagnostics_otel_default = definePluginEntry({
	id: "diagnostics-otel",
	name: "Diagnostics OpenTelemetry",
	description: "Export diagnostics events to OpenTelemetry",
	register(api) {
		api.registerService(createDiagnosticsOtelService());
	}
});
//#endregion
export { diagnostics_otel_default as default };
