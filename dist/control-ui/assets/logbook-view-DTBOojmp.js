import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Jn as t,er as n,rr as r}from"./control-ui-core-UWR2ANgr.js";import{K as i,W as a,Y as o,g as s,m as c}from"./lit-runtime-D5xZwgO1.js";import{o as l,t as u}from"./control-ui-core-BCL4Sy8S.js";import{vt as d,yt as f}from"./control-ui-core-DS6N4FyQ.js";import{n as p,t as m}from"./markdown-BueqwDbh.js";import{askLogbook as h,configureLogbookPolling as g,getLogbookState as _,loadLogbook as v,loadLogbookFramePreview as y,loadLogbookStandup as b,localDayKey as x,runLogbookAnalysisNow as S,setLogbookCapturePaused as C,shiftDay as w,t as T}from"./logbook-controller-D8dPiIy0.js";var E=e((()=>{}));function D(e,t){return n(e,{hour:`2-digit`,minute:`2-digit`,timeZone:t},``)}function O(e){let t=0;for(let n=0;n<e.length;n+=1)t=t*31+e.charCodeAt(n)|0;return Math.abs(t)%360}function k(e){let t=e.captureEnabled&&!e.capturePaused&&!e.lastCaptureError,n=e.capturePaused?l(`logbook.status.paused`):e.captureEnabled?l(`logbook.status.capturing`,{seconds:String(e.captureIntervalSeconds)}):l(`logbook.status.disabled`);return o`
    <div class="logbook__chips">
      <span class="logbook__chip ${t?`logbook__chip--ok`:`logbook__chip--warn`}">
        <span class="logbook__chip-dot"></span>
        ${n}
      </span>
      ${e.nodeName||e.nodeId?o`<span class="logbook__chip" title=${l(`logbook.status.nodeHelp`)}>
            ${d.monitor} ${e.nodeName??e.nodeId}
          </span>`:i}
      ${e.pendingFrames>0?o`<span class="logbook__chip" title=${l(`logbook.status.pendingHelp`)}>
            ${l(`logbook.status.pending`,{count:String(e.pendingFrames)})}
          </span>`:i}
      ${e.analysisRunning?o`<span class="logbook__chip logbook__chip--busy"
            >${l(`logbook.status.analyzing`)}</span
          >`:i}
      ${e.lastCaptureError?o`<span class="logbook__chip logbook__chip--error" title=${e.lastCaptureError}>
            ${l(`logbook.status.captureError`)}
          </span>`:i}
      ${e.lastBatch?.status===`error`?o`<span
            class="logbook__chip logbook__chip--error"
            title=${e.lastBatch.error??``}
          >
            ${l(`logbook.status.batchError`)}
          </span>`:i}
      ${e.visionModelSource===`missing`?o`<span
            class="logbook__chip logbook__chip--warn"
            title=${l(`logbook.status.modelMissingHelp`)}
          >
            ${l(`logbook.status.modelMissing`)}
          </span>`:i}
    </div>
  `}function A(e,n,r,a){let s=e.expandedCardIds.has(r.id),c=O(r.category),u=r.keyframeId!==void 0&&!e.framePreviewFailed.has(r.keyframeId)?r.keyframeId:void 0,d=u===void 0?void 0:e.framePreviews.get(u);return s&&u!==void 0&&!d&&y(e,n,u),o`
    <article
      class="logbook-card ${s?`logbook-card--expanded`:``}"
      style="--logbook-hue: ${c}"
    >
      <button
        class="logbook-card__header"
        type="button"
        @click=${()=>{let t=new Set(e.expandedCardIds);s?t.delete(r.id):t.add(r.id),e.expandedCardIds=t,e.requestUpdate?.()}}
      >
        <span class="logbook-card__time">
          ${D(r.startMs,a)}<span class="logbook-card__time-sep">–</span
          >${D(r.endMs,a)}
        </span>
        <span class="logbook-card__stripe" aria-hidden="true"></span>
        <span class="logbook-card__heading">
          <span class="logbook-card__title">${r.title}</span>
          <span class="logbook-card__summary">${r.summary}</span>
        </span>
        <span class="logbook-card__meta">
          <span class="logbook-card__category">${r.category}</span>
          ${r.appPrimary?o`<span class="logbook-card__app">${r.appPrimary}</span>`:i}
          <span class="logbook-card__duration"
            >${t(r.endMs-r.startMs,{spaced:!0})??`0s`}</span
          >
        </span>
      </button>
      ${s?o`
            <div class="logbook-card__body">
              ${d?o`<img
                    class="logbook-card__keyframe"
                    src=${d}
                    alt=${l(`logbook.card.keyframeAlt`)}
                  />`:u===void 0?i:o`<div class="logbook-card__keyframe logbook-card__keyframe--loading">
                      ${l(`common.loading`)}
                    </div>`}
              ${r.detail?o`<p class="logbook-card__detail">${r.detail}</p>`:i}
              ${r.distractions.length>0?o`
                    <div class="logbook-card__distractions">
                      <span class="logbook-card__distractions-label">
                        ${l(`logbook.card.distractions`)}
                      </span>
                      ${r.distractions.map(e=>o`
                          <span class="logbook-card__distraction">
                            ${D(e.startMs,a)} · ${e.title}
                          </span>
                        `)}
                    </div>
                  `:i}
            </div>
          `:i}
    </article>
  `}function j(e){let n=e.timeline?.stats;if(!n||n.trackedMs<=0)return i;let r=Math.max(0,n.trackedMs-n.distractionMs),a=Math.round(r/n.trackedMs*100),s=n.categories[0]?.ms??1;return o`
    <section class="card logbook-side__card">
      <div class="card-title">${l(`logbook.stats.title`)}</div>
      <div class="logbook-stats__focus">
        <div class="logbook-stats__focus-bar">
          <div class="logbook-stats__focus-fill" style="width: ${a}%"></div>
        </div>
        <div class="logbook-stats__focus-legend">
          <span>${l(`logbook.stats.focus`,{pct:String(a)})}</span>
          <span
            >${l(`logbook.stats.tracked`,{duration:t(n.trackedMs,{spaced:!0})??`0s`})}</span
          >
        </div>
      </div>
      <div class="logbook-stats__categories">
        ${n.categories.slice(0,6).map(e=>o`
            <div
              class="logbook-stats__category"
              style="--logbook-hue: ${O(e.category)}"
            >
              <span class="logbook-stats__category-name">${e.category}</span>
              <span class="logbook-stats__category-bar">
                <span
                  class="logbook-stats__category-fill"
                  style="width: ${Math.max(6,Math.round(e.ms/s*100))}%"
                ></span>
              </span>
              <span class="logbook-stats__category-time"
                >${t(e.ms,{spaced:!0})??`0s`}</span
              >
            </div>
          `)}
      </div>
      ${n.apps.length>0?o`
            <div class="logbook-stats__apps">
              ${n.apps.slice(0,5).map(e=>o`<span class="logbook-stats__app">${e.domain}</span>`)}
            </div>
          `:i}
    </section>
  `}function M(e,t){return o`
    <section class="card logbook-side__card">
      <div class="logbook-side__card-header">
        <div class="card-title">${l(`logbook.standup.title`)}</div>
        <button
          class="btn btn--small"
          type="button"
          ?disabled=${e.standupLoading}
          @click=${()=>void b(e,t,e.standup!==null)}
        >
          ${e.standupLoading?l(`common.loading`):e.standup?l(`logbook.standup.refresh`):l(`logbook.standup.generate`)}
        </button>
      </div>
      ${e.standup?o`<div class="logbook-standup__body markdown-body">
            ${s(p(e.standup.text))}
          </div>`:o`<div class="card-sub">${l(`logbook.standup.empty`)}</div>`}
    </section>
  `}function N(e,t){return o`
    <section class="card logbook-side__card">
      <div class="card-title">${l(`logbook.ask.title`)}</div>
      <form
        class="logbook-ask__form"
        @submit=${n=>{n.preventDefault(),h(e,t)}}
      >
        <input
          class="logbook-ask__input"
          type="text"
          .value=${e.askQuestion}
          placeholder=${l(`logbook.ask.placeholder`)}
          @input=${t=>{e.askQuestion=t.target.value}}
        />
        <button class="btn btn--small" type="submit" ?disabled=${e.askLoading}>
          ${e.askLoading?l(`common.loading`):l(`logbook.ask.submit`)}
        </button>
      </form>
      ${e.askAnswer?o`<p class="logbook-ask__answer">${e.askAnswer}</p>`:i}
    </section>
  `}function P(e){let t=_(e.host);t.requestUpdate=e.onRequestUpdate??null;let n=e.connected;g(t,n?e.client:null,n),n&&!t.timeline&&!t.loading&&!t.error&&v(t,e.client);let r=t.status?.today??x(),a=t.day===r,s=t.status,c=t.timeline?.cards??[];return o`
    <section class="logbook">
      <header class="logbook__header">
        <div class="logbook__daynav">
          <button
            class="btn btn--small"
            type="button"
            aria-label=${l(`logbook.nav.previousDay`)}
            @click=${()=>void v(t,e.client,{day:w(t.day,-1)})}
          >
            ‹
          </button>
          <span class="logbook__day">${t.day}</span>
          <button
            class="btn btn--small"
            type="button"
            aria-label=${l(`logbook.nav.nextDay`)}
            ?disabled=${a}
            @click=${()=>void v(t,e.client,{day:w(t.day,1)})}
          >
            ›
          </button>
          ${a?i:o`<button
                class="btn btn--small"
                type="button"
                @click=${()=>void v(t,e.client,{today:!0})}
              >
                ${l(`logbook.nav.today`)}
              </button>`}
        </div>
        ${t.status?k(t.status):i}
        <div class="logbook__actions">
          ${t.status?o`<button
                class="btn btn--small"
                type="button"
                ?disabled=${t.actionPending||!t.status.captureEnabled}
                @click=${()=>void C(t,e.client,!t.status?.capturePaused)}
              >
                ${t.status.capturePaused?l(`logbook.actions.resume`):l(`logbook.actions.pause`)}
              </button>`:i}
          <button
            class="btn btn--small"
            type="button"
            ?disabled=${t.actionPending}
            @click=${()=>void S(t,e.client)}
          >
            ${l(`logbook.actions.analyzeNow`)}
          </button>
          <button
            class="btn btn--small"
            type="button"
            ?disabled=${t.loading}
            @click=${()=>void v(t,e.client)}
          >
            ${d.refresh}
          </button>
        </div>
      </header>
      ${t.error?o`<div class="callout danger" role="alert">${t.error}</div>`:i}
      <div class="logbook__layout">
        <div class="logbook__timeline">
          ${t.loading&&c.length===0?o`<div class="card-sub">${l(`common.loading`)}</div>`:i}
          ${!t.loading&&c.length===0&&!t.error?o`
                <div class="logbook__empty">
                  <div class="logbook__empty-title">${l(`logbook.empty.title`)}</div>
                  <div class="logbook__empty-sub">${l(`logbook.empty.subtitle`)}</div>
                </div>
              `:i}
          ${s?c.map(n=>A(t,e.client,n,s.timeZone)):i}
        </div>
        <aside class="logbook__side">
          ${j(t)} ${M(t,e.client)}
          ${N(t,e.client)}
        </aside>
      </div>
    </section>
  `}e((()=>{a(),c(),f(),m(),u(),r(),E(),T()}))();export{P as renderLogbook};
//# sourceMappingURL=logbook-view-DTBOojmp.js.map