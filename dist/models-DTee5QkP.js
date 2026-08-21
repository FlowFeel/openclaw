import { Gt as validateModelsListParams } from "./src-BSn6va4B.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as buildModelsListResult } from "./models-list-result-DbQLbdca.js";
//#region src/gateway/server-methods/models.ts
const modelsHandlers = { "models.list": async ({ params, respond, context }) => {
	if (!assertValidParams(params, validateModelsListParams, "models.list", respond)) return;
	respond(true, await buildModelsListResult({
		context,
		params
	}), void 0);
} };
//#endregion
export { modelsHandlers };
