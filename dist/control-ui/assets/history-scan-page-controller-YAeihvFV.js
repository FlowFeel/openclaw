import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{dc as t,uc as n}from"./control-ui-core-UWR2ANgr.js";import{K as r,W as i,Y as a}from"./lit-runtime-D5xZwgO1.js";import{Ct as o,Kt as s}from"./control-ui-foundation-DkfOBVsU.js";import{o as c,t as l}from"./control-ui-core-BCL4Sy8S.js";import{loadSkillWorkshopProposals as u,resolveSkillWorkshopAgentId as d,t as f}from"./proposals-YjJqqe8i.js";async function p(e){let n=e.gateway.snapshot.client,r=v.get(e.state);if(r){e.force&&(r.pending=e),await r.promise;return}if(!n||e.gateway.snapshot.phase!==`connected`||e.state.running||e.state.loaded&&!e.force)return;e.state.loading=!0;let i={pending:null,promise:Promise.resolve()};i.promise=Promise.resolve().then(async()=>{try{let n=e;for(;n;){let e=n,r=i.pending;i.pending=null;let a=e.gateway.snapshot.client;if(a&&e.gateway.snapshot.phase===`connected`&&!e.state.running){e.state.error=null;try{e.state.result=await a.request(`skills.proposals.historyStatus`,{agentId:e.agentId}),e.state.loaded=!0}catch(n){e.state.error=s(n,{redact:t}),e.state.loaded=!0}}let o=i.pending;i.pending=null,n=o??r}}finally{e.state.loading=!1,v.delete(e.state)}}),v.set(e.state,i),await i.promise}async function m(e){let n=e.gateway.snapshot.client;if(!n||e.gateway.snapshot.phase!==`connected`||e.state.running||e.state.loading||!e.state.result&&(await p({...e,force:!0}),!e.state.result||(n=e.gateway.snapshot.client,!n||e.gateway.snapshot.phase!==`connected`)))return!1;let r=e.state.result.hasScanned?e.state.result.hasMore?`older`:`newer`:`older`;e.state.running=!0,e.state.error=null;try{return e.state.result=await n.request(`skills.proposals.historyScan`,{agentId:e.agentId,direction:r}),e.state.loaded=!0,!0}catch(r){let i=s(r,{redact:t});try{e.state.result=await n.request(`skills.proposals.historyStatus`,{agentId:e.agentId}),e.state.loaded=!0}catch{}return e.state.error=i,!1}finally{e.state.running=!1}}function h(e){if(!e.oldestReviewedAt||!e.newestReviewedAt)return null;let t=new Date(e.oldestReviewedAt),n=new Date(e.newestReviewedAt);if(!Number.isFinite(t.getTime())||!Number.isFinite(n.getTime()))return null;let r=new Intl.DateTimeFormat(void 0,{month:`short`,day:`numeric`}),i=n.toDateString()===new Date().toDateString();return`${r.format(t)}–${i?c(`skillWorkshop.history.today`):r.format(n)}`}function g(e){return e.running?c(`skillWorkshop.history.scanning`):e.result?.hasScanned?e.result.hasMore?c(`skillWorkshop.history.scanEarlier`):c(`skillWorkshop.history.scanNew`):c(`skillWorkshop.history.findIdeas`)}function _(e){let t=e.state.result,n=t?h(t):null;return a`
    <section class="sw-history ${t?.hasScanned?`is-compact`:``}">
      <div class="sw-history__signal" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="sw-history__copy">
        <div class="sw-history__eyebrow">${c(`skillWorkshop.history.eyebrow`)}</div>
        <h2>${c(`skillWorkshop.history.title`)}</h2>
        <p>${c(`skillWorkshop.history.body`)}</p>
        ${t?.hasScanned?a`
              <div class="sw-history__stats" role="status">
                <span
                  >${c(`skillWorkshop.history.reviewed`,{count:String(t.reviewedSessions)})}</span
                >
                ${n?a`<span>${n}</span>`:r}
                <span
                  >${c(`skillWorkshop.history.found`,{count:String(t.ideasFound)})}</span
                >
              </div>
              ${t.lastScanReviewed===0?a`<div class="sw-history__empty-window">
                    ${c(`skillWorkshop.history.noSessions`)}
                  </div>`:r}
            `:r}
        ${e.state.error?a`<div class="sw-history__error" role="alert">${e.state.error}</div>`:r}
      </div>
      <div class="sw-history__action">
        <button
          class="sw-btn sw-btn--primary"
          ?disabled=${e.state.running||e.state.loading}
          @click=${e.onScan}
        >
          ${e.state.loading?c(`skillWorkshop.history.loading`):g(e.state)}
        </button>
        <span>${c(`skillWorkshop.history.pendingOnly`)}</span>
      </div>
    </section>
  `}var v,y=e((()=>{o(),i(),l(),n(),v=new WeakMap}));function b(e){let t=d(e.context);return Promise.all([u(e.state,e.context,{force:e.force}),p({agentId:t,gateway:e.context.gateway,state:e.state.skillWorkshopHistoryScan,force:e.force})]).then(()=>void 0)}async function x(e){let t=d(e.context),n=e.state.skillWorkshopHistoryScan;await m({agentId:t,gateway:e.context.gateway,state:n});let r=e.current();if(!r||d(r.context)!==t)return;let i=[u(r.state,r.context,{force:!0})];r.state.skillWorkshopHistoryScan!==n&&i.push(p({agentId:t,gateway:r.context.gateway,state:r.state.skillWorkshopHistoryScan,force:!0})),await Promise.all(i)}var S=e((()=>{y(),f()}));S();export{b as loadSkillWorkshopPageData,y as n,_ as r,x as runSkillWorkshopPageHistoryScan,S as t};
//# sourceMappingURL=history-scan-page-controller-YAeihvFV.js.map