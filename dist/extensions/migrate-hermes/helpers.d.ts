import { et as normalizeOptionalString } from "../../types.openclaw-CXX8ljmy.js";
import { r as MigrationItem } from "../../plugin-entry-i32wLQY9.js";

//#region packages/normalization-core/src/record-coerce.d.ts
/** Type guard for non-array object records at browser-safe boundaries. */
declare function isRecord$1(value: unknown): value is Record<string, unknown>;
//#endregion
//#region extensions/migrate-hermes/helpers.d.ts
declare function resolveHomePath(input: string): string;
declare function exists(filePath: string): Promise<boolean>;
declare function isDirectory(dirPath: string): Promise<boolean>;
declare function sanitizeName(name: string): string;
declare function readText(filePath: string | undefined): Promise<string | undefined>;
declare function parseEnv(content: string | undefined): Record<string, string>;
declare function parseHermesConfig(content: string | undefined): Record<string, unknown>;
declare const isRecord: typeof isRecord$1;
declare function childRecord(root: Record<string, unknown> | undefined, key: string): Record<string, unknown>;
declare const readString: typeof normalizeOptionalString;
declare function readStringArray(value: unknown): string[];
declare function appendItem(item: MigrationItem): Promise<MigrationItem>;
//#endregion
export { appendItem, childRecord, exists, isDirectory, isRecord, parseEnv, parseHermesConfig, readString, readStringArray, readText, resolveHomePath, sanitizeName };