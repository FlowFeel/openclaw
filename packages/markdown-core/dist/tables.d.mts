import { t as MarkdownTableMode } from "./types-C6mGxBC3.mjs";

//#region packages/markdown-core/src/tables.d.ts
/** Converts markdown tables into the configured plaintext/code rendering mode. */
declare function convertMarkdownTables(markdown: string, mode: MarkdownTableMode): string;
//#endregion
export { convertMarkdownTables };