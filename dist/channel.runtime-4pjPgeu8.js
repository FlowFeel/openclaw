import { j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import { r as formatErrorMessage } from "./errors-D-7D3ZtF.js";
import "./error-runtime-Nqb-RQG4.js";
import "./number-runtime-C6TGSEc_.js";
import { t as runChannelProbe } from "./text-utility-runtime-D52Cj1WO.js";
import { t as collectZalouserSecurityAuditFindings } from "./security-audit-Cx-aSb5t.js";
import { S as waitForZaloQrLogin, a as listZaloGroupMembers, c as logoutZaloProfile, i as listZaloFriendsMatching, n as getZaloUserInfo, s as listZaloGroupsMatching, x as startZaloQrLogin } from "./zalo-js-EWJhwm-P.js";
import { a as sendReactionZalouser, i as sendMessageZalouser } from "./send-B7D-F-aK.js";
//#region extensions/zalouser/src/probe.ts
async function probeZalouser(profile, timeoutMs) {
	return await runChannelProbe(timeoutMs ? resolveTimerTimeoutMs(timeoutMs, 1e3, 1e3) : void 0, async () => {
		const user = await getZaloUserInfo(profile);
		return user ? {
			ok: true,
			user
		} : {
			ok: false,
			error: "Not authenticated"
		};
	}, (error) => ({
		ok: false,
		error: formatErrorMessage(error)
	}));
}
//#endregion
export { collectZalouserSecurityAuditFindings, getZaloUserInfo, listZaloFriendsMatching, listZaloGroupMembers, listZaloGroupsMatching, logoutZaloProfile, probeZalouser, sendMessageZalouser, sendReactionZalouser, startZaloQrLogin, waitForZaloQrLogin };
