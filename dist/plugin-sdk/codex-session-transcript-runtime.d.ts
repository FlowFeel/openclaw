import { c as AgentMessage } from "../types-BzdPB1fv.js";
import { a as TranscriptMessageAppendOptions, o as TranscriptMessageAppendResult, s as TranscriptUpdatePayload } from "../session-accessor.types-B8FvHp7G.js";
import { i as SessionTranscriptMemoryHitKey, o as SessionTranscriptReadParams } from "../session-transcript-memory-hit-C-PP84rJ.js";

//#region src/plugin-sdk/session-transcript-lock-runtime.d.ts
type InternalSessionTranscriptTarget = {
  agentId: string;
  memoryKey: SessionTranscriptMemoryHitKey;
  sessionId: string;
  sessionKey: string;
  targetKind: "runtime-session";
};
type InternalSessionTranscriptWriteLockParams = SessionTranscriptReadParams & {
  config?: TranscriptMessageAppendOptions<unknown>["config"];
};
type InternalSessionTranscriptWriteLockContext = {
  appendMessage: <TMessage>(options: Omit<TranscriptMessageAppendOptions<TMessage>, "config">) => Promise<TranscriptMessageAppendResult<TMessage> | undefined>;
  publishUpdate: (update?: TranscriptUpdatePayload) => Promise<void>;
  readEvents: () => Promise<unknown[]>;
  target: InternalSessionTranscriptTarget;
};
//#endregion
//#region src/plugin-sdk/codex-session-transcript-runtime.d.ts
type CodexSessionTranscriptMirrorWriteLockContext = InternalSessionTranscriptWriteLockContext & {
  appendMessageWithMessageSequence: <TMessage>(options: Omit<TranscriptMessageAppendOptions<TMessage>, "config">) => Promise<{
    messageSeq?: number;
    result: TranscriptMessageAppendResult<TMessage> | undefined;
  }>;
  readMessageFacts: (params: {
    idempotencyKeys: readonly string[];
  }) => Promise<{
    existingIdempotencyKeys: Set<string>;
    messagesByIdempotencyKey: Map<string, AgentMessage>;
  }>;
};
/** Runs the bundled Codex mirror under the transcript writer lock. */
declare function withCodexSessionTranscriptMirrorWriteLock<T>(params: InternalSessionTranscriptWriteLockParams, run: (context: CodexSessionTranscriptMirrorWriteLockContext) => Promise<T> | T): Promise<T>;
//#endregion
export { CodexSessionTranscriptMirrorWriteLockContext, withCodexSessionTranscriptMirrorWriteLock };