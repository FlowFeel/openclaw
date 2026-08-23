import { f as OpenClawPluginSecurityAuditContext } from "../../plugin-entry-D2U6D_c3.js";
import { h as runBrowserProxyCommand, r as handleBrowserGatewayRequest, t as createBrowserPluginService, x as createBrowserTool } from "../../plugin-service-CRrN09R5.js";

//#region extensions/browser/src/browser-proxy-upload.d.ts
/** Restores cleanup timers for staged uploads left by a previous node process. */
declare function ensureBrowserProxyUploadCleanup(options?: {
  uploadDir?: string;
  retentionMs?: number;
  nowMs?: number;
  maxRetainedBytes?: number;
  maxRetainedDirectories?: number;
}): Promise<void>;
//#endregion
//#region extensions/browser/src/security-audit.d.ts
/** Collects Browser plugin security audit findings for the current config/env. */
declare function collectBrowserSecurityAuditFindings(ctx: OpenClawPluginSecurityAuditContext): {
  checkId: string;
  severity: "warn" | "critical";
  title: string;
  detail: string;
  remediation?: string;
}[];
//#endregion
export { collectBrowserSecurityAuditFindings, createBrowserPluginService, createBrowserTool, ensureBrowserProxyUploadCleanup, handleBrowserGatewayRequest, runBrowserProxyCommand };