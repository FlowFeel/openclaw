/**
 * SQLite Working State Store — Persists and loads agent working context checkpoints.
 *
 * Backed by `session_working_state` table in `openclaw-state.sqlite`.
 *
 * @dft
 * - A4 (independent-test-isolation): supports env overrides for isolated in-memory testing.
 * - Axiom P0.4 (working-context-persistence): atomic upsert and retrieval.
 */

import { SqliteKvStore } from "../../infra/sqlite-kv-store.js";
import {
  normalizeWorkingStateInput,
} from "./working-state-synthesizer.js";
import type {
  SessionWorkingState,
  WorkingStateCheckpointInput,
} from "./working-state-types.js";

export class WorkingStateStore {
  private readonly kvStore: SqliteKvStore<SessionWorkingState>;

  constructor(options: { env?: NodeJS.ProcessEnv } = {}) {
    this.kvStore = new SqliteKvStore<SessionWorkingState>("session_working_state", options);
  }

  saveWorkingState(input: WorkingStateCheckpointInput, nowMs?: number): SessionWorkingState {
    const normalized = normalizeWorkingStateInput(input, nowMs);
    this.kvStore.set(normalized.sessionId, normalized);
    return normalized;
  }

  getWorkingState(sessionId: string): SessionWorkingState | undefined {
    return this.kvStore.get(sessionId);
  }

  deleteWorkingState(sessionId: string): boolean {
    return this.kvStore.delete(sessionId);
  }

  listWorkingStates(): Record<string, SessionWorkingState> {
    return this.kvStore.getAll();
  }
}

let defaultWorkingStateStore: WorkingStateStore | undefined;

export function getGlobalWorkingStateStore(): WorkingStateStore {
  if (!defaultWorkingStateStore) {
    defaultWorkingStateStore = new WorkingStateStore();
  }
  return defaultWorkingStateStore;
}
