import { a as RootDefaults, c as ReadResult, i as Root$1, l as FileIdentityStat, n as HardlinkPolicy, s as SymlinkPolicy, t as resolvePreferredOpenClawTmpDir } from "../tmp-openclaw-dir-D37WZ-md.js";
import { Stats } from "node:fs";

//#region node_modules/@openclaw/fs-safe/dist/absolute-path.d.ts
declare function canonicalPathFromExistingAncestor(filePath: string): Promise<string>;
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/local-roots.d.ts
type LocalRootsReadResult = ReadResult & {
  root: string;
};
type LocalRootsInputOptions = {
  filePath: string;
  roots: readonly string[];
  label?: string;
};
type ReadLocalFileFromRootsOptions = LocalRootsInputOptions & {
  hardlinks?: HardlinkPolicy;
  maxBytes?: number;
  nonBlockingRead?: boolean;
  symlinks?: SymlinkPolicy;
};
declare function readLocalFileFromRoots(options: ReadLocalFileFromRootsOptions): Promise<LocalRootsReadResult | null>;
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/local-file-access.d.ts
declare function safeFileURLToPath(fileUrl: string): string;
declare function basenameFromMediaSource(source?: string): string | undefined;
//#endregion
//#region src/infra/fs-safe.d.ts
type Root = Omit<Root$1, "walk">;
declare function root(rootDir: string, defaults?: RootDefaults): Promise<Root>;
/** @deprecated Use root(rootDir).read(relativePath, options). */
declare function readFileWithinRoot(params: {
  rootDir: string;
  relativePath: string;
  rejectHardlinks?: boolean;
  nonBlockingRead?: boolean;
  allowSymlinkTargetWithinRoot?: boolean;
  maxBytes?: number;
}): Promise<ReadResult>;
/** @deprecated Use root(rootDir).write(relativePath, data, options). */
declare function writeFileWithinRoot(params: {
  rootDir: string;
  relativePath: string;
  data: string | Buffer;
  encoding?: BufferEncoding;
  mkdir?: boolean;
}): Promise<void>;
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/directory-durability.d.ts
type DirectorySyncOutcome = {
  status: "synced";
} | {
  status: "unsupported";
  code?: string;
};
type DirectoryReceipt = {
  path: string;
  realPath: string;
  identity: Stats;
};
type DurableDirectoryReceipt = DirectoryReceipt & {
  parentSync: DirectorySyncOutcome | {
    status: "not-needed";
  };
};
type EnsureDurableDirectoryOptions = {
  directoryPath: string;
  label?: string;
  mode?: number;
  expectedExistingIdentity?: FileIdentityStat;
  create?: (directoryPath: string) => Promise<void>;
};
declare function syncDirectory(directory: string | DirectoryReceipt, options?: {
  label?: string;
}): Promise<DirectorySyncOutcome>;
declare function ensureDurableDirectory(options: EnsureDurableDirectoryOptions): Promise<DurableDirectoryReceipt>;
//#endregion
//#region src/infra/fs-safe-remove.d.ts
declare function removePathWithinRoot(params: {
  rootDir: string;
  relativePath: string;
  recursive?: boolean;
  force?: boolean;
}): Promise<void>;
//#endregion
export { type DirectorySyncOutcome, basenameFromMediaSource, canonicalPathFromExistingAncestor, ensureDurableDirectory, readFileWithinRoot, readLocalFileFromRoots, removePathWithinRoot, resolvePreferredOpenClawTmpDir, root, safeFileURLToPath, syncDirectory, writeFileWithinRoot };