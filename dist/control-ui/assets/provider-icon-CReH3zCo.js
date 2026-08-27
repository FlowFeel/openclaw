import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Ac as t,kc as n}from"./control-ui-core-ChU36mQ7.js";import{W as r,Y as i}from"./lit-runtime-D5xZwgO1.js";import{Kt as a,qt as o}from"./control-ui-core-CmlLmVZa.js";function s(e){return e.split(/[-_]+/u).filter(Boolean).map(e=>`${e.charAt(0).toUpperCase()}${e.slice(1)}`).join(` `)}function c(e){return _[e]??s(e)}function l(e){let t=e.indexOf(`/`);return(t>0?e.slice(0,t).trim().toLowerCase():``)||null}function u(e){let t=e.trim().toLowerCase(),n=g[t]??t;return h.has(n)?n:null}function d(e){return u(e)!==null}function f(e){return a(`provider-icons/ProviderIcon-${e}.svg`)}function p(e,n){return i`
    <span
      class="provider-brand-icon provider-brand-icon--fallback${n?.className?` ${n.className}`:``}"
      aria-hidden="true"
    >
      ${t(e.trim().toUpperCase(),1)||`?`}
    </span>
  `}function m(e,t){let n=t?.className?` ${t.className}`:``,r=u(e);return r?i`
    <span
      class="provider-brand-icon${n}"
      data-provider-icon=${r}
      style=${`--provider-icon-url: url("${f(r)}")`}
      aria-hidden="true"
    ></span>
  `:p(e,t)}var h,g,_,v=e((()=>{r(),o(),n(),h=new Set(`abacus.alibaba.amp.antigravity.augment.bedrock.chutes.claude.clawrouter.codebuff.codex.commandcode.copilot.crof.crossmodel.cursor.deepgram.deepseek.devin.doubao.elevenlabs.factory.gemini.grok.groq.jetbrains.kilo.kimi.kiro.litellm.llamacpp.llmproxy.lmstudio.manus.mimo.minimax.mistral.ollama.opencode.opencodego.openrouter.perplexity.poe.qoder.sakana.stepfun.synthetic.t3chat.venice.vertexai.warp.windsurf.zai.zed`.split(`.`)),g={anthropic:`claude`,"amazon-bedrock":`bedrock`,"aws-bedrock":`bedrock`,"claude-cli":`claude`,google:`gemini`,"google-gemini-cli":`gemini`,"github-copilot":`copilot`,"llama-cpp":`llamacpp`,openai:`codex`,moonshot:`kimi`,"opencode-go":`opencodego`,"opencode-zen":`opencode`,qwen:`alibaba`,xai:`grok`,"vertex-ai":`vertexai`,"z-ai":`zai`},_={anthropic:`Anthropic`,google:`Google`,"github-copilot":`GitHub`,"llama-cpp":`llama.cpp`,lmstudio:`LM Studio`,openai:`OpenAI`,moonshot:`Moonshot AI`,opencode:`OpenCode`,openrouter:`OpenRouter`,qwen:`Qwen Cloud`,zai:`Z.AI`}}));export{l as a,c as i,d as n,m as o,v as r,p as s,s as t};
//# sourceMappingURL=provider-icon-CReH3zCo.js.map