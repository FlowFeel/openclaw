import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import "./operator-scopes-Dw7Gu2cA.js";
import { t as ErrorCodes } from "./gateway-error-details-mJ5vWsi5.js";
import { $i as validateUsersLinkEmailParams, ia as validateUsersSetAvatarParams, na as validateUsersSelfParams, oa as validateUsersSetDisplayNameParams, ta as validateUsersListParams } from "./src-BSn6va4B.js";
import { a as errorShape, s as formatValidationErrors } from "./error-codes-P4fBo0lR.js";
import { a as getUserProfileListItem, c as resolveUserProfileId, l as setAvatar, n as ensureProfileForEmail, o as linkEmail, s as listProfiles, t as UserProfileNotFoundError, u as setDisplayName } from "./user-profiles-DoQoc9os.js";
//#region src/gateway/server-methods/users.ts
function decodeBase64(value) {
	const trimmed = value.trim();
	if (!trimmed || trimmed.length % 4 !== 0 || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(trimmed)) return;
	return Buffer.from(trimmed, "base64");
}
function invalidParams(name, errors) {
	return errorShape(ErrorCodes.INVALID_REQUEST, `invalid ${name} params: ${formatValidationErrors(errors)}`);
}
function profileError(error) {
	if (error instanceof UserProfileNotFoundError) return errorShape(ErrorCodes.INVALID_REQUEST, error.message);
	return errorShape(ErrorCodes.UNAVAILABLE, formatErrorMessage(error));
}
function canMutateProfile(client, profileId) {
	if (client?.connect.scopes?.includes("operator.admin")) return true;
	const authenticatedUserId = client?.authenticatedUserId;
	return authenticatedUserId ? ensureProfileForEmail(authenticatedUserId).id === resolveUserProfileId(profileId) : false;
}
function requireProfileMutationAccess(client, profileId, respond) {
	if (canMutateProfile(client, profileId)) return true;
	respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, "profile edits require the owning user or operator.admin"));
	return false;
}
const usersHandlers = {
	"users.list": ({ params, respond }) => {
		if (!validateUsersListParams(params)) {
			respond(false, void 0, invalidParams("users.list", validateUsersListParams.errors));
			return;
		}
		respond(true, { profiles: listProfiles() });
	},
	"users.self": ({ client, params, respond }) => {
		if (!validateUsersSelfParams(params)) {
			respond(false, void 0, invalidParams("users.self", validateUsersSelfParams.errors));
			return;
		}
		if (!client?.authenticatedUserId) {
			respond(false, void 0, errorShape(ErrorCodes.FORBIDDEN, "users.self requires an authenticated user"));
			return;
		}
		try {
			respond(true, { profile: getUserProfileListItem(ensureProfileForEmail(client.authenticatedUserId).id) });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.linkEmail": ({ params, respond }) => {
		if (!validateUsersLinkEmailParams(params)) {
			respond(false, void 0, invalidParams("users.linkEmail", validateUsersLinkEmailParams.errors));
			return;
		}
		const email = params.email.trim();
		if (!email) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "email must not be empty"));
			return;
		}
		try {
			respond(true, { profile: linkEmail(email, params.targetProfileId) });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.setDisplayName": ({ client, params, respond }) => {
		if (!validateUsersSetDisplayNameParams(params)) {
			respond(false, void 0, invalidParams("users.setDisplayName", validateUsersSetDisplayNameParams.errors));
			return;
		}
		try {
			if (!requireProfileMutationAccess(client, params.profileId, respond)) return;
			respond(true, { profile: setDisplayName(params.profileId, params.displayName) });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	},
	"users.setAvatar": ({ client, params, respond }) => {
		if (!validateUsersSetAvatarParams(params)) {
			respond(false, void 0, invalidParams("users.setAvatar", validateUsersSetAvatarParams.errors));
			return;
		}
		const bytes = decodeBase64(params.avatarBase64);
		if (!bytes) {
			respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, "avatarBase64 must be base64"));
			return;
		}
		try {
			if (!requireProfileMutationAccess(client, params.profileId, respond)) return;
			const result = setAvatar(params.profileId, bytes, params.mime);
			if (!result.ok) {
				respond(false, void 0, errorShape(ErrorCodes.INVALID_REQUEST, result.error.code));
				return;
			}
			respond(true, { profile: result.value });
		} catch (error) {
			respond(false, void 0, profileError(error));
		}
	}
};
//#endregion
export { usersHandlers };
