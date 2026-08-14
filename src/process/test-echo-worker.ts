/**
 * Minimal echo worker for testing TopicAffineWorkerPool.
 * Receives { seq, input } messages, echoes input back as { seq, status, value }.
 */
import { parentPort } from "node:worker_threads";

if (parentPort) {
  const port = parentPort;
  port.on(
    "message",
    (msg: { seq: number; input: { echo?: unknown; delay?: number; fail?: string } }) => {
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
