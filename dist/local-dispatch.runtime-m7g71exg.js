import { n as createBrowserControlContext } from "./plugin-enabled-CFmH0OGz.js";
import { t as createBrowserRouteDispatcher } from "./dispatcher-BOz9-Z4P.js";
import { t as startBrowserControlServiceFromConfig } from "./control-service-cehGrYUf.js";
//#region extensions/browser/src/browser/local-dispatch.runtime.ts
/**
* Local browser control dispatch bridge.
*
* Starts the browser control service when needed and dispatches requests
* through the in-process route dispatcher for local Browser tool calls.
*/
/** Dispatch one browser-control request through the local in-process router. */
async function dispatchBrowserControlRequest(req) {
	if (!await startBrowserControlServiceFromConfig()) throw new Error("browser control disabled");
	return await createBrowserRouteDispatcher(createBrowserControlContext()).dispatch(req);
}
//#endregion
export { dispatchBrowserControlRequest };
