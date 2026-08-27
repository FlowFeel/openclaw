import { s as OpenClawPluginApi } from "../../plugin-entry-CS8C3z51.js";
import { Embeddings } from "./embeddings.js";
import { a as MemoryQueryFilter, n as MemoryDB } from "../../lancedb-store-DVv3snpG.js";

//#region extensions/memory-lancedb/memory-cli.d.ts
declare function parseMemoryCliFilter(rawValue: unknown): MemoryQueryFilter | undefined;
declare function registerMemoryCli(api: OpenClawPluginApi, db: MemoryDB, embeddings: Embeddings, resolveCliAgentId: (rawAgentId: unknown) => string, recallMaxChars: number | undefined): void;
//#endregion
export { parseMemoryCliFilter, registerMemoryCli };