import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{$n as r,Jn as i,Kc as a,Wc as o,bt as s,er as c,rr as l,vt as u,yt as d}from"./control-ui-core-ChU36mQ7.js";import{K as f,Q as p,W as m,Y as h,_ as g,b as _,g as v,it as y,m as b,nt as x}from"./lit-runtime-D5xZwgO1.js";import{o as S,t as C}from"./control-ui-core-M4uhXYSJ.js";import{gt as w,vt as T,yt as E}from"./control-ui-core-pXkCFtVv.js";import{n as D,t as O}from"./markdown-DZAOIZ4K.js";import{Nn as k,Pn as A}from"./chat-message-3TtCJ6iu.js";function j(e){return e.digest?e.running?e.activeRunId&&e.digest.runId===e.activeRunId?e.digest:null:e.digest:null}function M(e,t){return(e.health===`done`||e.health===`failed`)&&(t??0)<e.updatedAt}function N(e){return S(`chat.rail.health.${e}`)}function P(e){return S(`chat.pullRequests.${e===`draft`?`draft`:e}`)}function F(e){let t=e.checks;return t?t.state===`passing`?S(`chat.rail.checksPassing`,{count:String(t.passed)}):t.state===`failing`?S(`chat.rail.checksFailing`,{count:String(t.failed)}):S(`chat.rail.checksPending`,{count:String(t.running)}):null}function I(e){let t=e.status===`completed`?`✓`:e.status===`in_progress`?`→`:`·`;return h`
    <li class="chat-session-rail__plan-item" data-status=${e.status}>
      <span class="chat-session-rail__plan-icon" aria-hidden="true">${t}</span>
      <span>${e.step}</span>
    </li>
  `}function L(e){return e.exchanges.length>0||e.pendingQuestion!==null||e.failedQuestion!==null||e.draft.length>0}var R,z;e((()=>{m(),p(),g(),b(),E(),O(),w(),C(),l(),A(),a(),u(),t(),R=class{constructor(e=d()){this.displayPreference=e,this.autoExpandedRunIds=new Set,this.autoExpandedRunId=null,this.transientExpanded=!1,this.manualOpen=!1}resetTransientState(){this.transientExpanded=!1,this.autoExpandedRunId=null,this.manualOpen=!1}tryAutoOpen(){return this.displayPreference===`off`?!1:(this.transientExpanded=!0,!0)}mode(e){let t=j(e),n=t!==null&&(e.running||M(t,e.lastReadAt))||e.hasCompanionActivity||this.manualOpen;if(this.displayPreference===`off`||!n)return this.autoExpandedRunId=null,`restore-icon`;let r=e.activeRunId??t?.runId??null;return(t?.health===`stuck`||t?.health===`waiting-on-user`)&&r&&!this.autoExpandedRunIds.has(r)&&(this.autoExpandedRunIds.add(r),this.autoExpandedRunId=r),this.displayPreference===`card`||this.transientExpanded||r!==null&&this.autoExpandedRunId===r?`expanded`:`pill`}expand(){this.displayPreference=`card`,this.transientExpanded=!1,this.autoExpandedRunId=null,s(`card`)}collapse(){this.displayPreference=`pill`,this.transientExpanded=!1,this.autoExpandedRunId=null,s(`pill`)}hide(){this.displayPreference=`off`,this.resetTransientState(),s(`off`)}show(){this.displayPreference=`pill`,this.transientExpanded=!1,this.autoExpandedRunId=null,this.manualOpen=!0,s(`pill`)}},z=class extends o{constructor(...e){super(...e),this.sessionKey=``,this.digest=null,this.running=!1,this.activeRunId=null,this.planStatus=null,this.pullRequests=[],this.companion={exchanges:[],pendingQuestion:null,failedQuestion:null,hint:null,draft:``},this.connected=!1,this.openRequest=0,this.consumedOpenRequest=0,this.now=Date.now(),this.railState=new R,this.clock=null,this.renderedMode=`hidden`,this.reportedMode=null,this.terminalAgeReference=Date.now()}disconnectedCallback(){this.stopClock(),super.disconnectedCallback()}willUpdate(e){e.has(`sessionKey`)&&(this.terminalAgeReference=Date.now(),this.railState.resetTransientState()),e.has(`digest`)&&this.digest&&(this.digest.health===`done`||this.digest.health===`failed`)&&(this.terminalAgeReference=Date.now()),e.has(`openRequest`)&&this.openRequest>this.consumedOpenRequest&&(this.onOpenRequestConsumed?.(this.openRequest),this.railState.tryAutoOpen()&&this.onVisibilityChange?.(!0))}updated(){this.running&&this.startedAt!=null&&j(this.input())?this.scheduleClock():this.stopClock(),this.reportedMode!==this.renderedMode&&(this.reportedMode=this.renderedMode,this.onModeChange?.(this.renderedMode))}input(){return{running:this.running,activeRunId:this.activeRunId,digest:this.digest,lastReadAt:this.lastReadAt,hasCompanionActivity:L(this.companion)||this.openRequest>0}}scheduleClock(){this.clock===null&&(this.clock=globalThis.setTimeout(()=>{this.clock=null,this.now=Date.now()},1e3))}stopClock(){this.clock!==null&&(globalThis.clearTimeout(this.clock),this.clock=null)}collapse(){this.railState.collapse(),this.requestUpdate()}expand(){this.railState.expand(),this.requestUpdate()}hide(){this.railState.hide(),this.onVisibilityChange?.(!1),this.requestUpdate()}show(){this.railState.show(),this.onVisibilityChange?.(!0),this.requestUpdate()}submit(){let e=this.companion.draft.trim();!e||!this.connected||this.companion.pendingQuestion||!this.onSubmit||this.onSubmit(e)}renderStatus(e){let t=e.health===`done`||e.health===`failed`;return h`
      <span
        class="chat-session-rail__status ${e.health===`stuck`||e.health===`waiting-on-user`?`chat-session-rail__status--critical`:``}"
        data-health=${e.health}
      >
        ${t?h`<span class="chat-session-rail__status-icon" aria-hidden="true"
              >${e.health===`done`?T.check:T.x}</span
            >`:h`<span class="chat-session-rail__status-dot" aria-hidden="true"></span>`}
        <span>${N(e.health)}</span>
      </span>
    `}renderPullRequests(){let e=this.pullRequests.slice(0,2);return e.length===0?f:h`
      <div class="chat-session-rail__prs" aria-label=${S(`chat.rail.pullRequests`)}>
        ${e.map(e=>{let t=F(e);return h`
            <a
              class="chat-session-rail__pr"
              href=${e.url}
              target="_blank"
              rel="noopener noreferrer"
              title=${e.title}
            >
              <span>#${e.number}</span>
              <span>${P(e.state)}</span>
              ${t?h`<span class="chat-session-rail__pr-checks">${t}</span>`:f}
            </a>
          `})}
      </div>
    `}renderDigestDetails(e){if(!e)return f;let t=e.planProgress,n=this.planStatus?.steps.slice(-3)??[];return h`
      ${e.assessment?h`<p class="chat-session-rail__assessment">${e.assessment}</p>`:f}
      ${t||n.length>0?h`
            <div class="chat-session-rail__plan">
              <div class="chat-session-rail__plan-heading">
                <span>${S(`chat.rail.plan`)}</span>
                ${t?h`<span
                      >${S(`chat.rail.progress`,{completed:String(t.completed),total:String(t.total)})}</span
                    >`:f}
              </div>
              ${n.length>0?h`<ul class="chat-session-rail__plan-list">
                    ${n.map(I)}
                  </ul>`:f}
            </div>
          `:f}
      ${this.renderPullRequests()}
    `}renderExchange(e,t,n){return h`
      <article class="chat-session-rail__exchange">
        <div class="chat-session-rail__question" dir=${k(e)}>
          ${e}
        </div>
        <div class="chat-session-rail__answer" dir=${k(t)}>
          ${v(D(t))}
        </div>
        <time class="chat-session-rail__timestamp" datetime=${new Date(n).toISOString()}>
          ${S(`chat.rail.asOf`,{time:c(n,{hour:`numeric`,minute:`2-digit`},``)})}
        </time>
      </article>
    `}renderThread(){let e=`${this.companion.exchanges.length}:${this.companion.pendingQuestion??``}:${this.companion.failedQuestion??``}`;return h`
      <div class="chat-session-rail__thread" aria-live="polite" ${_(t=>{!(t instanceof HTMLElement)||t.dataset.railScrollKey===e||(t.dataset.railScrollKey=e,t.scrollTop=t.scrollHeight)})}>
        ${this.companion.exchanges.length===0&&!this.companion.pendingQuestion?h`<p class="chat-session-rail__empty">${S(`chat.rail.empty`)}</p>`:f}
        ${this.companion.exchanges.map(e=>this.renderExchange(e.question,e.answer,e.ts))}
        ${this.companion.failedQuestion&&this.companion.hint?h`
              <article class="chat-session-rail__exchange chat-session-rail__exchange--error">
                <div class="chat-session-rail__question">${this.companion.failedQuestion}</div>
                <div class="chat-session-rail__hint">
                  ${S(this.companion.hint===`busy`?`chat.rail.askBusy`:`chat.rail.askUnavailable`)}
                </div>
              </article>
            `:f}
        ${this.companion.pendingQuestion?h`
              <article class="chat-session-rail__exchange chat-session-rail__exchange--pending">
                <div class="chat-session-rail__question">${this.companion.pendingQuestion}</div>
                <div class="chat-session-rail__hint">${S(`chat.rail.askPending`)}</div>
              </article>
            `:f}
      </div>
    `}render(){let e=this.input(),t=this.railState.mode(e);if(this.renderedMode=t,t===`hidden`)return f;if(t===`restore-icon`)return h`
        <button
          class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail chat-session-rail--restore"
          type="button"
          aria-label=${S(`chat.rail.show`)}
          title=${S(`chat.rail.show`)}
          @click=${()=>this.show()}
        >
          ${T.activity}
        </button>
      `;let n=j(e);if(t===`pill`)return h`
        <div class="chat-session-rail chat-session-rail--pill" aria-live="polite">
          ${n?this.renderStatus(n):f}
          <button
            class="chat-session-rail__expand"
            type="button"
            aria-label=${S(`chat.rail.expand`)}
            @click=${()=>this.expand()}
          >
            <span class="chat-session-rail__headline"
              >${n?.headline??S(`chat.rail.title`)}</span
            >
          </button>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__hide"
            type="button"
            aria-label=${S(`chat.rail.hide`)}
            @click=${()=>this.hide()}
          >
            ${T.x}
          </button>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__toggle"
            type="button"
            aria-label=${S(`chat.rail.expand`)}
            @click=${()=>this.expand()}
          >
            ${T.chevronDown}
          </button>
        </div>
      `;let a=this.running&&this.startedAt!=null?i(Math.max(0,this.now-this.startedAt)):null,o=n&&(n.health===`done`||n.health===`failed`)?S(`chat.rail.finished`,{time:r(Math.max(0,this.terminalAgeReference-n.updatedAt))}):null;return h`
      <section
        class="chat-session-rail chat-session-rail--expanded"
        role="region"
        aria-live="polite"
        aria-label=${S(`chat.rail.title`)}
        tabindex="-1"
        @keydown=${e=>{e.key===`Escape`&&(e.preventDefault(),e.stopPropagation(),this.collapse())}}
      >
        <header class="chat-session-rail__header">
          <div class="chat-session-rail__header-copy">
            <div class="chat-session-rail__status-row">
              ${n?this.renderStatus(n):h`<strong>${S(`chat.rail.title`)}</strong>`}
              ${a?h`<span class="chat-session-rail__timing">${a}</span>`:o?h`<span class="chat-session-rail__timing">${o}</span>`:f}
            </div>
            ${n?h`<strong class="chat-session-rail__headline">${n.headline}</strong>`:h`<span class="chat-session-rail__subtitle">${S(`chat.rail.subtitle`)}</span>`}
          </div>
          <div class="chat-session-rail__actions">
            <openclaw-tooltip .content=${S(`chat.rail.clear`)}>
              <button
                class="btn btn--ghost btn--icon chat-icon-btn"
                type="button"
                aria-label=${S(`chat.rail.clear`)}
                ?disabled=${!this.connected||this.companion.pendingQuestion!==null}
                @click=${()=>this.onClear?.()}
              >
                ${T.trash}
              </button>
            </openclaw-tooltip>
            <button
              class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__hide"
              type="button"
              aria-label=${S(`chat.rail.hide`)}
              @click=${()=>this.hide()}
            >
              ${T.x}
            </button>
            <button
              class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__toggle"
              type="button"
              aria-label=${S(`chat.rail.collapse`)}
              @click=${()=>this.collapse()}
            >
              ${T.chevronUp}
            </button>
          </div>
        </header>
        <div class="chat-session-rail__digest">${this.renderDigestDetails(n)}</div>
        ${this.renderThread()}
        <form
          class="chat-session-rail__composer"
          @submit=${e=>{e.preventDefault(),this.submit()}}
        >
          <label class="chat-session-rail__prompt">
            <span class="sr-only">${S(`chat.rail.askLabel`)}</span>
            <input
              class="chat-session-rail__input"
              type="text"
              maxlength="400"
              autocomplete="off"
              .value=${this.companion.draft}
              placeholder=${this.companion.pendingQuestion?S(`chat.rail.askPending`):S(`chat.rail.askPlaceholder`)}
              ?disabled=${!this.connected||this.companion.pendingQuestion!==null}
              @input=${e=>{this.onDraftChange?.(e.currentTarget.value)}}
            />
          </label>
          <button
            class="btn btn--ghost btn--icon chat-icon-btn chat-session-rail__submit"
            type="submit"
            aria-label=${S(`chat.rail.askSubmit`)}
            ?disabled=${!this.connected||this.companion.pendingQuestion!==null||!this.companion.draft.trim()}
          >
            ${T.cornerDownLeft}
          </button>
        </form>
      </section>
    `}},n([y({attribute:!1})],z.prototype,`sessionKey`,void 0),n([y({attribute:!1})],z.prototype,`digest`,void 0),n([y({attribute:!1})],z.prototype,`running`,void 0),n([y({attribute:!1})],z.prototype,`activeRunId`,void 0),n([y({attribute:!1})],z.prototype,`startedAt`,void 0),n([y({attribute:!1})],z.prototype,`lastReadAt`,void 0),n([y({attribute:!1})],z.prototype,`planStatus`,void 0),n([y({attribute:!1})],z.prototype,`pullRequests`,void 0),n([y({attribute:!1})],z.prototype,`companion`,void 0),n([y({attribute:!1})],z.prototype,`connected`,void 0),n([y({attribute:!1})],z.prototype,`openRequest`,void 0),n([y({attribute:!1})],z.prototype,`consumedOpenRequest`,void 0),n([y({attribute:!1})],z.prototype,`onOpenRequestConsumed`,void 0),n([y({attribute:!1})],z.prototype,`onSubmit`,void 0),n([y({attribute:!1})],z.prototype,`onDraftChange`,void 0),n([y({attribute:!1})],z.prototype,`onClear`,void 0),n([y({attribute:!1})],z.prototype,`onModeChange`,void 0),n([y({attribute:!1})],z.prototype,`onVisibilityChange`,void 0),n([x()],z.prototype,`now`,void 0),customElements.get(`openclaw-chat-session-rail`)||customElements.define(`openclaw-chat-session-rail`,z)}))();
//# sourceMappingURL=chat-session-rail-CXRVYH6N.js.map