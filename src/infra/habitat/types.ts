/**
 * @file types.ts
 * @description Parameterized Hickey-style data contracts for single-pass habitat resolution
 * and arrival probe discovery.
 */

export interface HabitatFileRecord {
  /** Abstract role or canonical category */
  readonly role: string;
  /** Relative or canonical path */
  readonly path: string;
  /** True if the file exists on the filesystem */
  readonly exists: boolean;
  /** File size in bytes if present */
  readonly sizeBytes?: number;
  /** Extracted frontmatter title or summary if available */
  readonly summary?: string;
  /** Extracted frontmatter tags/metadata */
  readonly metadata?: Record<string, unknown>;
}

export interface HabitatTopologyResult {
  /** Timestamp when the topology was resolved (Unix ms) */
  readonly timestampMs: number;
  /** Absolute workspace root evaluated */
  readonly workspaceRoot: string;
  /** List of files discovered and verified */
  readonly filesPresent: readonly HabitatFileRecord[];
  /** List of canonical files checked but absent */
  readonly filesMissing: readonly HabitatFileRecord[];
  /** Effective role-to-path dictionary */
  readonly roleMap: Record<string, string>;
  /** Total files checked */
  readonly totalChecked: number;
  /** Summary markdown formatted for immediate agent orientation */
  readonly markdownSummary: string;
}

export interface HabitatProbeOptions {
  /** Root directory to probe (defaults to process.cwd() or agent workspace) */
  readonly workspaceRoot?: string;
  /** Optional custom role mappings to override or extend canonical defaults */
  readonly customRoles?: Record<string, string>;
  /** Detail level for the generated markdown summary */
  readonly detailLevel?: "compact" | "full";
  /** Optional virtual filesystem reader for pure in-memory unit testing */
  readonly fileReader?: {
    existsSync: (path: string) => boolean;
    statSync?: (path: string) => { size: number };
    readFileSync: (path: string, encoding: "utf-8") => string;
  };
}
