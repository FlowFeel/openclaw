import { j as resolveTimerTimeoutMs } from "./number-coercion-Crk_c9KW.js";
import { r as formatErrorMessage } from "./errors-Cg_yT1Sv.js";
import "./error-runtime-Dbl9_3mW.js";
import "./number-runtime-C6TGSEc_.js";
import { t as runChannelProbe } from "./text-utility-runtime-Dwuhfjgs.js";
import { t as collectZalouserSecurityAuditFindings } from "./security-audit-CEji5yaI.js";
import { S as waitForZaloQrLogin, a as listZaloGroupMembers, c as logoutZaloProfile, i as listZaloFriendsMatching, n as getZaloUserInfo, s as listZaloGroupsMatching, x as startZaloQrLogin } from "./zalo-js-rsUt6GRO.js";
import { a as sendReactionZalouser, i as sendMessageZalouser } from "./send-COw8mj6z.js";
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
