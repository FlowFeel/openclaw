import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Kc as i,Qn as a,Vc as o,Wc as s,gn as c,pn as l,rr as u}from"./control-ui-core-CrKLOOVi.js";import{K as d,Q as f,W as p,Y as m,it as h,nt as g}from"./lit-runtime-D5xZwgO1.js";import{i as _,r as v}from"./control-ui-foundation-Dgui328h.js";import{_ as y,v as b}from"./control-ui-core-CVcZBevq.js";import{o as x,t as S}from"./control-ui-core-DkYXaYTI.js";import{G as C}from"./control-ui-core-CTll8UdE.js";import{i as w,n as T}from"./gateway-runtime-DWs8EJ0W.js";import{i as E,n as D,r as O,t as k}from"./custodian-surface-BU7ZYEKd.js";function A(e){switch(e){case`system-agent`:return x(`custodian.history.sources.systemAgent`);case`doctor`:return x(`custodian.history.sources.doctor`);case`config-rpc`:return x(`custodian.history.sources.settings`);case`external`:return x(`custodian.history.sources.manualEdit`);case`cli`:return x(`custodian.history.sources.cli`);case`plugin-install`:return x(`custodian.history.sources.pluginInstall`);case`unknown`:return x(`custodian.history.sources.unknown`)}return e}function j(e){return m`
    <article class="custodian__change-card ${e.invalid?`is-invalid`:``}">
      <div class="custodian__change-meta">
        <span class="custodian__change-source">${A(e.source)}</span>
        <time datetime=${new Date(e.at).toISOString()}
          >${a(e.at)}</time
        >
      </div>
      <div class="custodian__change-summary">${e.summary}</div>
      ${e.invalid?m`<div class="custodian__change-warning">${x(`custodian.history.invalidEdit`)}</div>`:d}
      ${e.opaqueChange?m`<div class="custodian__change-note">${x(`custodian.history.opaqueChange`)}</div>`:d}
      ${e.changedPaths?.length?m`<details class="custodian__change-paths">
            <summary>
              ${x(`custodian.history.changedPaths`,{count:String(e.changedPaths.length)})}
            </summary>
            <ul>
              ${e.changedPaths.map(e=>m`<li><code>${e}</code></li>`)}
            </ul>
          </details>`:d}
    </article>
  `}function M(e){return m`
    <section class="custodian__history" aria-label=${x(`custodian.history.title`)}>
      <div class="custodian__history-heading">
        <strong>${x(`custodian.history.title`)}</strong>
        <span>${x(`custodian.history.description`)}</span>
      </div>
      ${e.error?m`<div class="custodian__history-error" role="alert">
            <span>${e.error}</span>
            <button class="btn btn--sm" type="button" @click=${()=>e.onLoad(!0)}>
              ${x(`common.retry`)}
            </button>
          </div>`:d}
      <div class="custodian__change-list">
        ${e.entries.map(j)}
        ${e.loading?m`<div class="custodian__history-state" role="status">
              ${x(`custodian.history.loading`)}
            </div>`:e.loaded&&e.entries.length===0&&!e.error?m`<div class="custodian__history-state" role="status">
                ${x(`custodian.history.empty`)}
              </div>`:d}
      </div>
      ${e.nextCursor?m`<button
            class="btn btn--ghost custodian__history-more"
            type="button"
            ?disabled=${e.loadingMore}
            @click=${()=>e.onLoad(!1)}
          >
            ${e.loadingMore?x(`custodian.history.loadingMore`):x(`custodian.history.loadMore`)}
          </button>`:d}
    </section>
  `}var N=e((()=>{p(),S(),u()})),P,F;e((()=>{v(),p(),f(),b(),C(),S(),c(),T(),i(),o(),D(),N(),E(),k(),t(),P=50,F=class extends s{constructor(...e){super(...e),this.onboarding=!1,this.newAgentIntent=!1,this.store=O,this.historyAvailable=!1,this.historyOpen=!1,this.historyEntries=[],this.historyNextCursor=null,this.historyLoading=!1,this.historyLoadingMore=!1,this.historyError=null,this.historyLoaded=!1,this.historyClient=null,this.historyRequestEpoch=0,this.subscribedStore=null,this.storeCleanup=null,this.channelsSource=null,this.channelRefreshRequested=!1,this.subscriptions=new r(this).effect(()=>this.context?.channels,e=>{this.channelsSource=e,this.channelRefreshRequested=!1;let t=e.subscribe(e=>{e.connected||(this.channelRefreshRequested=!1),this.ensureOnboardingChannelStatus(),this.requestUpdate()});return this.ensureOnboardingChannelStatus(),()=>{t(),this.channelsSource===e&&(this.channelsSource=null)}})}connectedCallback(){super.connectedCallback(),this.subscribeToStore()}disconnectedCallback(){this.storeCleanup?.(),this.storeCleanup=null,this.subscribedStore=null,this.subscriptions.clear(),super.disconnectedCallback()}async getUpdateComplete(){let e=await super.getUpdateComplete();return await this.querySelector(`openclaw-custodian-surface`)?.updateComplete,e}willUpdate(e){e.has(`store`)&&this.subscribeToStore(),this.synchronizeHistoryClient(),this.ensureOnboardingChannelStatus()}ensureOnboardingChannelStatus(){let e=this.channelsSource;if(!this.onboarding||!e||this.channelRefreshRequested)return;let t=e.state;!t.connected||t.channelsSnapshot||t.channelsLoading||t.channelsError||(this.channelRefreshRequested=!0,e.refresh(!1))}subscribeToStore(){!this.isConnected||this.subscribedStore===this.store||(this.storeCleanup?.(),this.subscribedStore=this.store,this.storeCleanup=this.store.subscribe(()=>this.requestUpdate()))}synchronizeHistoryClient(){let e=this.context.gateway.snapshot,t=e.phase===`connected`?e.client:null,n=t!==null&&w(e,`openclaw.changes.list`)===!0;(t!==this.historyClient||n!==this.historyAvailable)&&(this.historyClient=t,this.historyAvailable=n,this.historyOpen=!1,this.resetHistory())}resetHistory(){this.historyRequestEpoch+=1,this.historyEntries=[],this.historyNextCursor=null,this.historyLoading=!1,this.historyLoadingMore=!1,this.historyError=null,this.historyLoaded=!1}toggleHistory(){this.historyOpen=!this.historyOpen,this.historyOpen&&!this.historyLoading&&!this.historyLoadingMore&&this.loadHistory(!0)}async loadHistory(e){let t=this.historyClient,n=e?void 0:this.historyNextCursor??void 0;if(!t||!this.historyAvailable||this.historyLoading||this.historyLoadingMore||!e&&!n)return;let r=++this.historyRequestEpoch;e?this.historyLoading=!0:this.historyLoadingMore=!0,this.historyError=null;let i=()=>this.isConnected&&this.historyClient===t&&this.historyRequestEpoch===r&&this.historyAvailable;try{let r=await t.request(`openclaw.changes.list`,{limit:P,...n?{beforeCursor:n}:{}});if(!i())return;this.historyEntries=e?r.entries:[...this.historyEntries,...r.entries],this.historyNextCursor=r.nextCursor??null,this.historyLoaded=!0}catch{i()&&(this.historyError=x(`custodian.history.requestFailed`),this.historyLoaded=!0)}finally{i()&&(this.historyLoading=!1,this.historyLoadingMore=!1)}}render(){let e=this.channelsSource?.state.channelsSnapshot??null,t=this.onboarding&&!this.store.channelOnboardingNudgeClosed&&e!==null&&e.partial!==!0&&!l(e),n=this.historyOpen&&this.historyAvailable?M({entries:this.historyEntries,error:this.historyError,loaded:this.historyLoaded,loading:this.historyLoading,loadingMore:this.historyLoadingMore,nextCursor:this.historyNextCursor,onLoad:e=>void this.loadHistory(e)}):d;return m`
      <section
        class="custodian custodian--page ${this.store.setupRequired?`custodian--setup-required`:``}"
      >
        <header class="custodian__header custodian__column">
          <div class="custodian__identity">
            <div class="custodian__mark" aria-hidden="true">
              <openclaw-mascot
                .mood=${this.store.sending?`thinking`:`idle`}
                .size=${38}
              ></openclaw-mascot>
            </div>
            <div>
              <h1>${x(`custodian.title`)}</h1>
              <p>${x(this.onboarding?`custodian.subtitle`:`custodian.subtitleCaretaker`)}</p>
            </div>
          </div>
          <div class="custodian__header-actions">
            ${this.historyAvailable?m`<button
                  class="btn btn--ghost custodian__history-toggle"
                  type="button"
                  aria-expanded=${this.historyOpen?`true`:`false`}
                  @click=${()=>this.toggleHistory()}
                >
                  ${x(`custodian.history.button`)}
                </button>`:d}
            ${this.onboarding?m`<button
                  class="btn btn--ghost"
                  type="button"
                  @click=${()=>this.store.exitSetup()}
                >
                  ${x(`custodian.exitSetup`)}
                </button>`:d}
          </div>
        </header>

        <openclaw-custodian-surface
          class="custodian__column"
          .store=${this.store}
          .onboarding=${this.onboarding}
          .newAgentIntent=${this.newAgentIntent}
          .showChannelOnboardingNudge=${t}
          .historyContent=${n}
        ></openclaw-custodian-surface>
      </section>
    `}},n([_({context:y,subscribe:!0})],F.prototype,`context`,void 0),n([h({attribute:!1})],F.prototype,`onboarding`,void 0),n([h({attribute:!1})],F.prototype,`newAgentIntent`,void 0),n([h({attribute:!1})],F.prototype,`store`,void 0),n([g()],F.prototype,`historyAvailable`,void 0),n([g()],F.prototype,`historyOpen`,void 0),n([g()],F.prototype,`historyEntries`,void 0),n([g()],F.prototype,`historyNextCursor`,void 0),n([g()],F.prototype,`historyLoading`,void 0),n([g()],F.prototype,`historyLoadingMore`,void 0),n([g()],F.prototype,`historyError`,void 0),customElements.get(`openclaw-custodian-page`)||customElements.define(`openclaw-custodian-page`,F)}))();
//# sourceMappingURL=custodian-page-D__eEmNz.js.map