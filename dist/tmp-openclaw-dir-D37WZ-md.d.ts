import { Stats } from "node:fs";
import { FileHandle } from "node:fs/promises";
import { Readable } from "node:stream";

//#region node_modules/@openclaw/fs-safe/dist/containment.d.ts
type ContainmentGuarantee = "kernel-atomic" | "best-effort";
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/deny-mutations.d.ts
type DenyMutationPolicy = {
  paths?: readonly string[];
  prefixes?: readonly string[];
};
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/file-identity.d.ts
type FileIdentityStat = {
  dev: number | bigint;
  ino: number | bigint;
};
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/pinned-write.d.ts
type RenameIdentityPolicy = "strict" | "verify-content-with-lock";
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/read-opened-file.d.ts
type ReadResult = {
  buffer: Buffer;
  containment: ContainmentGuarantee;
  realPath: string;
  stat: Stats;
};
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/types.d.ts
type PathStat = {
  dev: number;
  gid: number;
  ino: number;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  mode: number;
  mtimeMs: number;
  nlink: number;
  size: number;
  uid: number;
};
type DirEntry = PathStat & {
  name: string;
};
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/root-walk.d.ts
type RootWalkSymlinkPolicy = "skip" | "follow-within-root";
type RootWalkLimitBehavior = "truncate" | "throw";
type RootWalkDirectoryErrorBehavior = "throw" | "skip-and-report";
type RootWalkEntryFilterResult = "include" | "skip" | "skip-subtree";
type RootWalkDataEntryKind = "file" | "directory" | "other";
type RootWalkDataEntry = {
  relativePath: string;
  kind: RootWalkDataEntryKind;
  size: number;
};
type RootWalkEntry = RootWalkDataEntry | {
  relativePath: string;
  kind: "truncated";
  size: 0;
} | {
  relativePath: string;
  kind: "directory-error";
  size: 0;
  error: unknown;
};
type RootWalkEntryFilter = (entry: RootWalkDataEntry) => RootWalkEntryFilterResult;
type RootWalkOptions = {
  maxDepth?: number;
  maxEntries?: number;
  symlinkPolicy: RootWalkSymlinkPolicy;
  signal?: AbortSignal;
  limitBehavior?: RootWalkLimitBehavior;
  entryFilter?: RootWalkEntryFilter;
  onDirectoryError?: RootWalkDirectoryErrorBehavior;
};
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/root-impl.d.ts
type OpenResult = {
  handle: FileHandle;
  containment: ContainmentGuarantee;
  realPath: string;
  stat: Stats;
  [Symbol.asyncDispose](): Promise<void>;
};
type SymlinkPolicy = "reject" | "follow-within-root";
type HardlinkPolicy = "reject" | "allow";
type WritableOpenMode = "replace" | "append" | "update";
type RootDefaults = {
  hardlinks?: HardlinkPolicy;
  maxBytes?: number;
  mkdir?: boolean;
  mode?: number;
  denyMutations?: DenyMutationPolicy;
  nonBlockingRead?: boolean;
  renameIdentity?: RenameIdentityPolicy;
  symlinks?: SymlinkPolicy;
};
type RootReadOptions = Pick<RootDefaults, "hardlinks" | "maxBytes" | "nonBlockingRead" | "symlinks">;
type RootOpenOptions = Omit<RootReadOptions, "maxBytes">;
type RootWriteOptions = Pick<RootDefaults, "denyMutations" | "mkdir" | "mode" | "renameIdentity"> & {
  encoding?: BufferEncoding;
  overwrite?: boolean;
};
type RootOpenWritableOptions = Pick<RootDefaults, "denyMutations" | "mkdir" | "mode"> & {
  writeMode?: WritableOpenMode;
};
type RootCopyOptions = Pick<RootDefaults, "denyMutations" | "maxBytes" | "mkdir" | "mode"> & {
  sourceHardlinks?: HardlinkPolicy;
};
type RootWriteJsonOptions = RootWriteOptions & {
  replacer?: Parameters<typeof JSON.stringify>[1];
  space?: Parameters<typeof JSON.stringify>[2];
  trailingNewline?: boolean;
};
type RootCreateOptions = Omit<RootWriteOptions, "overwrite">;
type RootCreateJsonOptions = Omit<RootWriteJsonOptions, "overwrite">;
type RootAppendOptions = RootWriteOptions & {
  prependNewlineIfNeeded?: boolean;
};
type RootMoveOptions = Pick<RootDefaults, "denyMutations"> & {
  overwrite?: boolean;
};
type RootRemoveOptions = Pick<RootDefaults, "denyMutations">;
type RootMkdirOptions = Pick<RootDefaults, "denyMutations">;
interface Root {
  readonly rootDir: string;
  readonly rootReal: string;
  readonly rootWithSep: string;
  readonly defaults: RootDefaults;
  resolve(relativePath: string): Promise<string>;
  open(relativePath: string, options?: RootOpenOptions): Promise<OpenResult>;
  read(relativePath: string, options?: RootReadOptions): Promise<ReadResult>;
  readBytes(relativePath: string, options?: RootReadOptions): Promise<Buffer>;
  readText(relativePath: string, options?: RootReadOptions & {
    encoding?: BufferEncoding;
  }): Promise<string>;
  readJson<T = unknown>(relativePath: string, options?: RootReadOptions & {
    encoding?: BufferEncoding;
  }): Promise<T>;
  readAbsolute(filePath: string, options?: RootReadOptions): Promise<ReadResult>;
  reader(options?: RootReadOptions): (filePath: string) => Promise<Buffer>;
  openWritable(relativePath: string, options?: RootOpenWritableOptions): Promise<WritableOpenResult>;
  append(relativePath: string, data: string | Buffer, options?: RootAppendOptions): Promise<void>;
  remove(relativePath: string, options?: RootRemoveOptions): Promise<void>;
  mkdir(relativePath: string, options?: RootMkdirOptions): Promise<void>;
  ensureRoot(options?: RootMkdirOptions): Promise<void>;
  write(relativePath: string, data: string | Buffer, options?: RootWriteOptions): Promise<void>;
  create(relativePath: string, data: string | Buffer, options?: RootCreateOptions): Promise<void>;
  writeJson(relativePath: string, data: unknown, options?: RootWriteJsonOptions): Promise<void>;
  createJson(relativePath: string, data: unknown, options?: RootCreateJsonOptions): Promise<void>;
  copyIn(relativePath: string, sourcePath: string, options?: RootCopyOptions): Promise<void>;
  exists(relativePath: string): Promise<boolean>;
  stat(relativePath: string): Promise<PathStat>;
  list(relativePath: string, options?: {
    withFileTypes?: false;
  }): Promise<string[]>;
  list(relativePath: string, options: {
    withFileTypes: true;
  }): Promise<DirEntry[]>;
  move(fromRelative: string, toRelative: string, options?: RootMoveOptions): Promise<void>;
  walk(relativePath: string, options: RootWalkOptions): AsyncIterableIterator<RootWalkEntry>;
}
type WritableOpenResult = {
  handle: FileHandle;
  containment: ContainmentGuarantee;
  createdForWrite: boolean;
  realPath: string;
  stat: Stats;
  [Symbol.asyncDispose](): Promise<void>;
};
//#endregion
//#region src/infra/tmp-openclaw-dir.d.ts
type SecureDirStat = {
  isDirectory(): boolean;
  isSymbolicLink(): boolean;
  mode?: number;
  uid?: number;
};
/** Injectable filesystem/platform hooks for resolving the preferred temp root in tests. */
type ResolvePreferredOpenClawTmpDirOptions = {
  accessSync?: (path: string, mode?: number) => void;
  chmodSync?: (path: string, mode: number) => void;
  getuid?: () => number | undefined;
  lstatSync?: (path: string) => SecureDirStat;
  mkdirSync?: (path: string, opts: {
    recursive: boolean;
    mode?: number;
  }) => void;
  platform?: NodeJS.Platform;
  tmpdir?: () => string;
  warn?: (message: string) => void;
};
/** Resolves a safe OpenClaw temp root, falling back to user-scoped os.tmpdir paths when needed. */
declare function resolvePreferredOpenClawTmpDir(options?: ResolvePreferredOpenClawTmpDirOptions): string;
//#endregion
export { RootDefaults as a, ReadResult as c, Root as i, FileIdentityStat as l, HardlinkPolicy as n, RootReadOptions as o, OpenResult as r, SymlinkPolicy as s, resolvePreferredOpenClawTmpDir as t };