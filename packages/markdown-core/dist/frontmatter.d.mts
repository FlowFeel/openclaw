//#region packages/markdown-core/src/frontmatter.d.ts
type ParsedFrontmatter = Record<string, string>;
type ParsedFrontmatterBlockResult = {
  frontmatter: ParsedFrontmatter;
  issues: FrontmatterParseIssue[];
};
type FrontmatterParseIssue = {
  code: string;
  message: string;
};
type ExtractedFrontmatterBlock = {
  block: string;
  body: string;
};
/** Splits a complete leading YAML frontmatter block from its Markdown body. */
declare function extractFrontmatterBlock(content: string): ExtractedFrontmatterBlock | undefined;
/** Removes a leading YAML frontmatter block and returns the remaining Markdown body. */
declare function stripFrontmatterBlock(content: string): string;
/** Parses leading YAML frontmatter into string values used by skill and metadata loaders. */
declare function parseFrontmatterBlock(content: string): ParsedFrontmatter;
/** Parses frontmatter once while retaining recoverable YAML parser issues for owning loaders. */
declare function parseFrontmatterBlockResult(content: string): ParsedFrontmatterBlockResult;
//#endregion
export { ExtractedFrontmatterBlock, FrontmatterParseIssue, ParsedFrontmatterBlockResult, extractFrontmatterBlock, parseFrontmatterBlock, parseFrontmatterBlockResult, stripFrontmatterBlock };