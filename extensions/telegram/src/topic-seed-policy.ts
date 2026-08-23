/**
 * Topic Seed Policy — pure module resolving standards documents and formatting seed messages for new Telegram topics.
 */

export type ResolveTopicSeedParams = {
  enabled?: boolean;
  topicName: string;
  topicId: number | string;
  documentPath?: string;
  pinMessage?: boolean;
  workspaceDir?: string;
  fileReader: (filePath: string) => string | null;
  now?: () => Date;
};

export type TopicSeedResult = {
  shouldSeed: boolean;
  content: string | null;
  pinMessage: boolean;
  documentPath?: string;
};

export function resolveTopicSeedParams(params: ResolveTopicSeedParams): TopicSeedResult {
  const enabled = params.enabled ?? true;
  if (!enabled || !params.topicName) {
    return { shouldSeed: false, content: null, pinMessage: false };
  }

  const documentPath = params.documentPath || "meta/standards/agent-hygiene.md";
  const rawContent = params.fileReader(documentPath);
  if (!rawContent) {
    return { shouldSeed: false, content: null, pinMessage: false, documentPath };
  }

  const currentDate = (params.now ? params.now() : new Date()).toISOString().split("T")[0] ?? "";
  const formattedContent = rawContent
    .replaceAll("{{TOPIC_NAME}}", params.topicName)
    .replaceAll("{{TOPIC_ID}}", String(params.topicId))
    .replaceAll("{{DATE}}", currentDate);

  return {
    shouldSeed: true,
    content: formattedContent,
    pinMessage: params.pinMessage ?? true,
    documentPath,
  };
}
