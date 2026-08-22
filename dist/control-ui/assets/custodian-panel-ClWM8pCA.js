import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as r,Wc as i}from"./control-ui-core-CrKLOOVi.js";import{K as a,Q as o,W as s,Y as c,it as l}from"./lit-runtime-D5xZwgO1.js";import{o as u,t as d}from"./control-ui-core-DkYXaYTI.js";import{G as f,vt as p,w as m,x as h,yt as g}from"./control-ui-core-CTll8UdE.js";import{r as _,t as v}from"./dock-layout-controller-BoyqOhTW.js";import{n as y,t as b}from"./dock-panel-layout-BeKwwc_p.js";import{i as x,r as S,t as C}from"./custodian-surface-BU7ZYEKd.js";var w=e((()=>{})),T,E;e((()=>{s(),o(),d(),f(),r(),x(),_(),y(),g(),m(),C(),w(),t(),T=b({storageKey:`openclaw.custodian.panel.v1`,minHeight:240,minWidth:320,defaultDock:`right`,supportedDocks:[`bottom`,`right`],defaultHeight:420,defaultWidth:440}),E=class extends i{constructor(...e){super(...e),this.available=!1,this.suppressed=!1,this.minimizeRequestId=0,this.store=S,this.dockLayout=new v(this,{layout:T,reservationPrefix:`custodian`,isAvailable:()=>this.available}),this.onToggleRequest=e=>this.handleToggleRequest(e),this.handledMinimizeRequestId=0,this.subscribedStore=null,this.storeCleanup=null}connectedCallback(){super.connectedCallback(),this.subscribeToStore(),window.addEventListener(h,this.onToggleRequest),this.dockLayout.setSuppressed(this.suppressed)}disconnectedCallback(){window.removeEventListener(h,this.onToggleRequest),this.storeCleanup?.(),this.storeCleanup=null,this.subscribedStore=null,super.disconnectedCallback()}willUpdate(e){e.has(`store`)&&this.subscribeToStore(),e.has(`suppressed`)&&this.dockLayout.setSuppressed(this.suppressed),this.minimizeRequestId>0&&this.minimizeRequestId!==this.handledMinimizeRequestId&&(this.available&&(this.handledMinimizeRequestId=this.minimizeRequestId),this.available&&this.store.hasRealUserTurn()&&this.dockLayout.setOpen(!0)),e.has(`available`)&&(!this.available&&this.dockLayout.open?this.dockLayout.hideWithoutPersisting():this.available&&this.dockLayout.restoreOpenState()),this.dockLayout.syncReservation()}subscribeToStore(){!this.isConnected||this.subscribedStore===this.store||(this.storeCleanup?.(),this.subscribedStore=this.store,this.storeCleanup=this.store.subscribe(()=>this.requestUpdate()))}toggle(){!this.available||this.suppressed||(this.dockLayout.open?this.dockLayout.setOpen(!1):this.dockLayout.setOpen(!0))}handleToggleRequest(e){let t=e instanceof CustomEvent&&typeof e.detail==`object`&&e.detail!==null?e.detail:null;if((t?.dock===`right`||t?.dock===`bottom`)&&this.dockLayout.setDock(t.dock,!1),t?.open===!1){this.dockLayout.setOpen(!1);return}if(t?.open===!0){if(!this.available||this.suppressed)return;this.dockLayout.setOpen(!0);return}this.toggle()}setDock(e){this.dockLayout.setDock(e)}get custodianPanelOpen(){return this.dockLayout.open}render(){if(!this.available||!this.dockLayout.open)return a;let e=this.dockLayout.dock;return c`
      <section class="cp cp--${e}" style=${e===`bottom`?`height:${this.dockLayout.height}px`:`width:${this.dockLayout.width}px`} aria-label=${u(`custodian.panel.title`)}>
        ${this.dockLayout.renderResizer(`cp`,u(`custodian.panel.resize`))}
        <header class="cp-header">
          <div class="cp-title">
            <openclaw-mascot
              .mood=${this.store.sending?`thinking`:`idle`}
              .size=${26}
            ></openclaw-mascot>
            <strong>${u(`custodian.panel.title`)}</strong>
          </div>
          <div class="cp-actions">
            <button
              class="cp-icon"
              type="button"
              aria-label=${u(e===`bottom`?`custodian.panel.dockRight`:`custodian.panel.dockBottom`)}
              @click=${()=>this.setDock(e===`bottom`?`right`:`bottom`)}
            >
              ${e===`bottom`?p.panelRightOpen:p.panelBottomOpen}
            </button>
            <button
              class="cp-icon"
              type="button"
              aria-label=${u(`custodian.panel.close`)}
              @click=${()=>this.dockLayout.setOpen(!1)}
            >
              ${p.x}
            </button>
          </div>
        </header>
        <openclaw-custodian-surface
          .store=${this.store}
          .onboarding=${this.store.activeVariant===`onboarding`}
          .newAgentIntent=${this.store.activeVariant===`new-agent`}
          compact
        ></openclaw-custodian-surface>
      </section>
    `}},n([l({type:Boolean})],E.prototype,`available`,void 0),n([l({type:Boolean})],E.prototype,`suppressed`,void 0),n([l({type:Number})],E.prototype,`minimizeRequestId`,void 0),n([l({attribute:!1})],E.prototype,`store`,void 0),customElements.get(`openclaw-custodian-panel`)||customElements.define(`openclaw-custodian-panel`,E)}))();export{E as OpenClawCustodianPanel};
//# sourceMappingURL=custodian-panel-ClWM8pCA.js.map