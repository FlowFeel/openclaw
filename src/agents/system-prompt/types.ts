/**
 * Pure Data Models & Types for System Prompt Compilation.
 * Goldilocks decomposition unit (< 60 LOC).
 * 
 * @dft:axiom A1 (Pure Decision Core)
 */

export type PromptMode = "full" | "minimal" | "scaffold" | "none" | "bare";
export type SilentReplyPromptMode = "generic" | "none";
export type SectionOverrideValue = string | string[] | null | undefined;

export type PromptSection = {
  id: string;
  lines: string[];
  cacheStable: boolean;
};

export type PromptSectionDescriptor = {
  id: string;
  cacheStable: boolean;
  isMechanic: boolean;
  description: string;
};

export type SectionOverridesMap = Record<string, SectionOverrideValue>;
