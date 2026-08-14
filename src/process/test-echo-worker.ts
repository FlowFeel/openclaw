/**
 * Minimal echo worker for testing TopicAffineWorkerPool.
 * Receives { seq, input } messages, echoes input back as { seq, status, value }.
 *
 * Input options:
 * - echo:   the value to echo back (default "ok")
 * - delay:  ms to wait before responding (for timeout/concurrency tests)
 * - fail:   if set, responds with { status: "failed", error: fail }
 * - crash:  if set, calls process.exit(1) immediately (for crash-recovery tests)
 */
import { parentPort } from "node:worker_threads";

if (parentPort) {
  const port = parentPort;
  port.on(
    "message",
    (msg: {
      seq: number;
      input: { echo?: unknown; delay?: number; fail?: string; crash?: boolean };
    }) => {
      // Crash immediately — simulates a worker process dying mid-request.
      // The pool's 'exit' handler should reject all pending requests.
      if (msg.input.crash) {
        process.exit(1);
      }
      if (msg.input.delay) {
        setTimeout(() => {
          if (msg.input.fail) {
            port.postMessage({ seq: msg.seq, status: "failed", error: msg.input.fail });
          } else {
            port.postMessage({ seq: msg.seq, status: "ok", value: msg.input.echo ?? "ok" });
          }
        }, msg.input.delay);
        return;
      }
      if (msg.input.fail) {
        port.postMessage({ seq: msg.seq, status: "failed", error: msg.input.fail });
        return;
      }
      port.postMessage({ seq: msg.seq, status: "ok", value: msg.input.echo ?? "ok" });
    },
  );
}
