const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./board-view-C5pGwRMr.js","./rolldown-runtime-DaJ6WEGw.js","./control-ui-foundation-OE0aAIzW.js","./control-ui-foundation-Dgui328h.js","./lit-runtime-D5xZwgO1.js","./control-ui-foundation-DkfOBVsU.js","./control-ui-core-ChU36mQ7.js","./control-ui-core-CmlLmVZa.js","./control-ui-core-M4uhXYSJ.js","./control-ui-core-pXkCFtVv.js","./control-ui-shared-C-1hBCcB.js","./gateway-runtime-DWs8EJ0W.js","./control-ui-core-CMupHFtS.css","./observer-digest-DN2cDq_M.js","./provider-9ZW0QAeC.js","./web-awesome-tabs-Ct-trtla.js","./mcp-app-security-D4vcdZ_Y.js","./board-view-8aHzRCuq.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{S as t,b as n,x as r,y as i}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as a,Wc as o}from"./control-ui-core-ChU36mQ7.js";import{K as s,Q as c,W as l,Y as u,it as d,nt as f}from"./lit-runtime-D5xZwgO1.js";import{g as p,h as m}from"./control-ui-core-CmlLmVZa.js";import{o as h,t as g}from"./control-ui-core-M4uhXYSJ.js";import{vt as _,yt as v}from"./control-ui-core-pXkCFtVv.js";import{n as y,o as b,r as x,s as S,t as C}from"./provider-9ZW0QAeC.js";function w(){return m(`openclaw-board-view`,()=>r(()=>import(`./board-view-C5pGwRMr.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]),import.meta.url))}var T;e((()=>{l(),c(),p(),v(),g(),S(),a(),n(),t(),T=class extends o{constructor(...e){super(...e),this.sessionKey=``,this.client=null,this.connected=!1,this.canMutate=!1,this.canGrant=!1,this.provider=null,this.expanded=!1,this.activeTabId=``,this.lease=null,this.unsubscribeSnapshot=null,this.expansionInitialized=!1}updated(){w().catch(()=>void 0),this.synchronizeProvider()}disconnectedCallback(){this.releaseProvider(),super.disconnectedCallback()}synchronizeProvider(){let e=this.sessionKey.trim(),t=this.client;if(!e||!t){this.releaseProvider();return}let n=x(e);if(this.lease?.client===t&&this.lease.sessionKey===n){this.lease.update(t,this.connected,{canPinWidgets:!1,canPinMcpApps:!1,canMutate:this.canMutate,canGrant:this.canGrant});return}this.releaseProvider(),this.expansionInitialized=!1,this.activeTabId=``;let r=C(n,t,this.connected,!1,!1,this.canMutate,this.canGrant);this.lease={...r,client:t,sessionKey:n},this.provider=r.provider,this.unsubscribeSnapshot=r.provider.snapshot$.subscribe(()=>{this.reconcileSnapshot(r.provider),this.requestUpdate()}),this.reconcileSnapshot(r.provider),this.requestUpdate()}releaseProvider(){this.unsubscribeSnapshot?.(),this.unsubscribeSnapshot=null,this.lease?.release(),this.lease=null,this.provider=null}reconcileSnapshot(e){let t=e.snapshot$.value,n=t.tabs[0]?.tabId??``;t.tabs.some(e=>e.tabId===this.activeTabId)||(this.activeTabId=n),!this.expansionInitialized&&b(e)&&(this.expansionInitialized=!0,this.expanded=y(t))}render(){let e=this.provider,t=e?.snapshot$.value,n=!!(t&&y(t)),r=e?{applyOps:t=>e.applyOps(t),grant:(t,n)=>e.grant(t,n),selectTab:e=>{this.activeTabId=e},frameLoadFailed:t=>e.refreshWidgetFrame(t),widgetAppView:(t,n)=>e.widgetAppView(t,n),refreshWidgetAppView:(t,n)=>e.refreshWidgetAppView(t,n)}:null,i=t;return u`
      <section class="workboard-detail__section workboard-card-dashboard">
        <button
          type="button"
          class="workboard-card-dashboard__toggle"
          aria-expanded=${this.expanded?`true`:`false`}
          @click=${()=>{this.expansionInitialized=!0,this.expanded=!this.expanded}}
        >
          <span class="workboard-card-dashboard__title">
            ${_.kanban}<span>${h(`workboard.dashboardTitle`)}</span>
          </span>
          <span class="workboard-card-dashboard__chevron" aria-hidden="true"
            >${_.arrowDown}</span
          >
        </button>
        <div class="workboard-card-dashboard__body" ?hidden=${!this.expanded}>
          ${n&&e&&i&&r?u`
                <openclaw-board-view
                  .snapshot=${i}
                  .activeTabId=${this.activeTabId}
                  .widgetFrameUrl=${(t,n)=>e.widgetFrameUrl(t,n)}
                  .callbacks=${r}
                  .sessions=${[]}
                  .canMutate=${this.canMutate}
                  .canGrant=${this.canGrant}
                  .ticketRefreshEnabled=${this.expanded}
                ></openclaw-board-view>
              `:u`<p class="workboard-card-dashboard__empty">${h(`workboard.dashboardEmpty`)}</p>`}
        </div>
        ${!this.expanded&&this.expansionInitialized&&!n?u`<p class="workboard-card-dashboard__collapsed-empty">
              ${h(`workboard.dashboardEmpty`)}
            </p>`:s}
      </section>
    `}},i([d({attribute:!1})],T.prototype,`sessionKey`,void 0),i([d({attribute:!1})],T.prototype,`client`,void 0),i([d({attribute:!1})],T.prototype,`connected`,void 0),i([d({attribute:!1})],T.prototype,`canMutate`,void 0),i([d({attribute:!1})],T.prototype,`canGrant`,void 0),i([f()],T.prototype,`provider`,void 0),i([f()],T.prototype,`expanded`,void 0),i([f()],T.prototype,`activeTabId`,void 0),customElements.get(`openclaw-workboard-card-dashboard`)||customElements.define(`openclaw-workboard-card-dashboard`,T)}))();
//# sourceMappingURL=workboard-card-dashboard-S6st8YJi.js.map