import { ui as MemoryReadResult } from "./types-CrfqAVvH.js";
import { a as OpenClawConfig } from "./config-utils-Bicq1PDp.js";

//#region packages/memory-host-sdk/src/host/read-file.d.ts
/** Read a validated memory markdown file from workspace or configured extra paths. */
declare function readMemoryFile(params: {
  workspaceDir: string;
  extraPaths?: string[];
  relPath: string;
  from?: number;
  lines?: number;
  defaultLines?: number;
  maxChars?: number;
}): Promise<MemoryReadResult>;
/** Resolve agent memory config and read one memory file for that agent. */
declare function readAgentMemoryFile(params: {
  cfg: OpenClawConfig;
  agentId: string;
  relPath: string;
  from?: number;
  lines?: number;
}): Promise<MemoryReadResult>;
//#endregion
export { readMemoryFile as n, readAgentMemoryFile as t };