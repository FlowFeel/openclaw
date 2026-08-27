/**
 * Re-export facade for PromptMode and PromptSection types.
 * Goldilocks decomposition unit (< 25 LOC).
 */

export type {
  PromptMode,
  SilentReplyPromptMode,
  SectionOverrideValue,
  PromptSection,
  PromptSectionDescriptor,
  SectionOverridesMap,
} from "./system-prompt/types.js";
