//#region packages/agent-core/src/harness/env/kill-tree.d.ts
type KillProcessTreeOptions = {
  graceMs?: number;
  detached?: boolean;
  force?: boolean;
};
/**
 * Best-effort process-tree termination with graceful shutdown.
 * - Windows: use taskkill /T to include descendants. Sends SIGTERM-equivalent
 *   first (without /F), then force-kills if taskkill refuses or the process
 *   survives the grace period.
 * - Unix: send SIGTERM to process group first, wait grace period, then SIGKILL.
 *
 * Group kill (`process.kill(-pid, ...)`) is only used when the PID is verified
 * as its own process group leader, unless `detached: true` is explicitly passed.
 * This prevents accidentally signaling the gateway's process group when the
 * child shares its parent's group.
 *
 * - `detached: false`: skip group kill unconditionally.
 * - `detached: true`: use group kill unconditionally (trust caller).
 * - `detached` omitted: use group kill only when PID is the group leader.
 */
declare function killProcessTree(pid: number, opts?: KillProcessTreeOptions): void;
declare function signalProcessTree(pid: number, signal: "SIGTERM" | "SIGKILL", opts?: {
  detached?: boolean;
  onComplete?: () => void;
}): void;
//#endregion
export { KillProcessTreeOptions, killProcessTree, signalProcessTree };