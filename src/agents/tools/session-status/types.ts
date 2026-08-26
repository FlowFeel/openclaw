/**
 * Types & TypeBox Schemas for session_status tool.
 * Goldilocks decomposition unit (< 100 LOC).
 */

import { Type } from "typebox";

export const SessionStatusStateEventPayloadSchema = Type.Object(
  {
    outcome: Type.Optional(
      Type.Union([Type.Literal("error"), Type.Literal("timeout"), Type.Literal("cancelled")]),
    ),
    channel: Type.Optional(Type.String()),
    turns: Type.Optional(Type.Integer({ minimum: 1 })),
  },
  { additionalProperties: false },
);

export const SessionStatusStateEventSchema = Type.Object(
  {
    sequence: Type.Integer(),
    kind: Type.String(),
    actorType: Type.Union([Type.Literal("human"), Type.Literal("agent"), Type.Literal("system")]),
    occurredAt: Type.Number(),
    summary: Type.String(),
    actorId: Type.Optional(Type.String()),
    runId: Type.Optional(Type.String()),
    payload: Type.Optional(SessionStatusStateEventPayloadSchema),
  },
  { additionalProperties: false },
);

export const SessionStatusOutputSchema = Type.Object(
  {
    ok: Type.Literal(true),
    sessionKey: Type.String(),
    changedModel: Type.Boolean(),
    stateVersion: Type.Integer(),
    statusText: Type.String(),
    stateChanges: Type.Optional(
      Type.Object(
        {
          events: Type.Array(SessionStatusStateEventSchema),
          truncated: Type.Boolean(),
          earliestAvailableSequence: Type.Integer(),
          historyGap: Type.Boolean(),
        },
        { additionalProperties: false },
      ),
    ),
    model: Type.Optional(Type.String()),
    modelProvider: Type.Optional(Type.String()),
    modelOverride: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export const SessionStatusParamsSchema = Type.Object(
  {
    sessionKey: Type.Optional(
      Type.String({
        description:
          "Target session key or session id. Defaults to current session if omitted. Set to 'current' explicitly to status the calling session.",
      }),
    ),
    model: Type.Optional(
      Type.String({
        description:
          "Optional model override for the target session (e.g., 'anthropic/claude-3-7-sonnet', 'openai/gpt-4.5-preview', 'default', or 'reset').",
      }),
    ),
    changesSince: Type.Optional(
      Type.Integer({
        minimum: 0,
        description:
          "Return session state transition events after this sequence number. Set to 0 to fetch initial baseline.",
      }),
    ),
  },
  { additionalProperties: false },
);
