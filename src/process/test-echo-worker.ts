/**
 * Minimal echo worker for testing TopicAffineWorkerPool.
 * Receives { seq, input } messages, echoes input back as { seq, status, value }.
 */
import { parentPort } from "node:worker_threads";

if (parentPort) {
  parentPort.on(
    "message",
    (msg: { seq: number; input: { echo?: unknown; delay?: number; fail?: string } }) => {
      if (msg.input.delay) {
        setTimeout(() => {
          if (msg.input.fail) {
            parentPort!.postMessage({ seq: msg.seq, status: "failed", error: msg.input.fail });
          } else {
            parentPort!.postMessage({ seq: msg.seq, status: "ok", value: msg.input.echo ?? "ok" });
          }
        }, msg.input.delay);
        return;
      }
      if (msg.input.fail) {
        parentPort.postMessage({ seq: msg.seq, status: "failed", error: msg.input.fail });
        return;
      }
      parentPort.postMessage({ seq: msg.seq, status: "ok", value: msg.input.echo ?? "ok" });
    },
  );
}
