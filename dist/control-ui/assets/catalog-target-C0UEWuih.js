import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{_s as t,fs as n}from"./control-ui-core-BUddgKjW.js";import{K as r,W as i,Y as a}from"./lit-runtime-D5xZwgO1.js";import{o,t as s}from"./control-ui-core-s0pW0mau.js";import{vt as c,yt as l}from"./control-ui-core-vLOElyFQ.js";function u(e){return JSON.stringify([e?.requestedAgentId??``,e?.catalogId??``])}function d(e){return!!e?.catalogId}function f(e){return!!(e?.catalogId&&e.model&&e.catalogLabel)}function p(e,n,r){let i=e?.agentId?.trim();if(!i)return t(r);let a=t(i);return n.some(e=>t(e.id)===a)?a:t(r)}function m(e,t){return!d(e)||f(e)&&!!t}async function h(e,t,n){try{let r=(await e.request(`sessions.catalog.list`,{...n?{agentId:n}:{},catalogId:t,limitPerHost:1})).catalogs.find(e=>e.id===t),i=r?.capabilities.createSession?.model.trim();return r&&i?{model:i,catalogLabel:r.label}:void 0}catch{return}}function g(e){if(!d(e))return r;let t=f(e),n=e?.catalogLabel||e?.catalogId||``;return a`<span
    class="new-session-page__trigger new-session-page__runtime"
    title=${t?e?.model:o(`newSession.catalogUnavailable`)}
  >
    <span class="new-session-page__target-icon" aria-hidden="true">${c.terminal}</span>
    <span>${n}</span>
  </span>`}function _(e){let t=d(e.data)&&!f(e.data);return a`
    <div class="new-session-page__triggers">
      ${g(e.data)} ${d(e.data)?r:e.agentSelect}
      ${e.placeSelect}
      ${t?a`<span class="new-session-page__catalog-unavailable">
            ${o(`newSession.catalogUnavailable`)}
            <button
              class="btn btn--sm"
              type="button"
              ?disabled=${e.retrying}
              @click=${e.onRetry}
            >
              ${e.retrying?o(`common.loading`):o(`lazyView.retry`)}
            </button>
          </span>`:r}
    </div>
  `}var v=e((()=>{i(),l(),s(),n()}));v();export{m as allowsSelectedAgent,f as isResolvedTarget,d as isTarget,_ as renderBar,p as resolveAgentId,h as resolveCreateTarget,u as routeKey,v as t};
//# sourceMappingURL=catalog-target-C0UEWuih.js.map