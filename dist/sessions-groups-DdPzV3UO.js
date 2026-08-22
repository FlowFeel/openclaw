import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { Sr as validateSessionsGroupsRenameParams, _r as validateSessionsGroupsDeleteParams, vr as validateSessionsGroupsListParams, xr as validateSessionsGroupsPutParams } from "./src-BSn6va4B.js";
import { a as errorShape } from "./error-codes-P4fBo0lR.js";
import { t as assertValidParams } from "./validation-DyQ6nhKI.js";
import { t as SessionMutationAuthorizationChangedError } from "./session-sharing-CSGmZX63.js";
import { t as emitSessionsChanged } from "./session-change-event-DYHaHm0r.js";
import { a as putSessionGroups, i as listSidebarSectionOrder, o as renameSessionGroup, r as listSessionGroups, t as deleteSessionGroup } from "./session-groups-Crg2lhOJ.js";
//#region src/gateway/server-methods/sessions-groups.ts
const sessionGroupHandlers = {
	"sessions.groups.list": async ({ params, respond }) => {
		if (!assertValidParams(params, validateSessionsGroupsListParams, "sessions.groups.list", respond)) return;
		respond(true, {
			groups: listSessionGroups(),
			sectionOrder: listSidebarSectionOrder()
		}, void 0);
	},
	"sessions.groups.put": async ({ params, respond, context }) => {
		if (!assertValidParams(params, validateSessionsGroupsPutParams, "sessions.groups.put", respond)) return;
		respond(true, {
			ok: true,
			groups: putSessionGroups(params.names, params.sectionOrder),
			sectionOrder: listSidebarSectionOrder()
		}, void 0);
		emitSessionsChanged(context, { reason: "groups" });
	},
	"sessions.groups.rename": async ({ params, respond, context, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsGroupsRenameParams, "sessions.groups.rename", respond)) return;
		try {
			respond(true, {
				ok: true,
				...await renameSessionGroup({
					cfg: context.getRuntimeConfig(),
					name: params.name,
					to: params.to,
					assertCurrent: sessionMutationAuthorization?.assertCurrent,
					assertTargetCurrent: sessionMutationAuthorization?.assertTargetCurrent
				})
			}, void 0);
			emitSessionsChanged(context, { reason: "groups" });
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) throw error;
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
		}
	},
	"sessions.groups.delete": async ({ params, respond, context, sessionMutationAuthorization }) => {
		if (!assertValidParams(params, validateSessionsGroupsDeleteParams, "sessions.groups.delete", respond)) return;
		try {
			respond(true, {
				ok: true,
				...await deleteSessionGroup({
					cfg: context.getRuntimeConfig(),
					name: params.name,
					assertCurrent: sessionMutationAuthorization?.assertCurrent,
					assertTargetCurrent: sessionMutationAuthorization?.assertTargetCurrent
				})
			}, void 0);
			emitSessionsChanged(context, { reason: "groups" });
		} catch (error) {
			if (error instanceof SessionMutationAuthorizationChangedError) throw error;
			respond(false, void 0, errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error)));
		}
	}
};
//#endregion
export { sessionGroupHandlers };
