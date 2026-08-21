import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Hc as i,Kc as a,La as o,Qn as s,Uc as c,Vc as l,eo as u,pa as d,ro as f,rr as p}from"./control-ui-core-UWR2ANgr.js";import{K as m,Q as h,W as g,Y as _,_ as v,b as y,it as b,nt as x}from"./lit-runtime-D5xZwgO1.js";import{i as ee,r as te}from"./control-ui-foundation-Dgui328h.js";import{_ as S,v as C}from"./control-ui-core-DDTXn_ud.js";import{en as w,nn as T}from"./control-ui-foundation-DkfOBVsU.js";import{o as E,t as D}from"./control-ui-core-BCL4Sy8S.js";import{A as O,k,pt as A,vt as j,yt as M}from"./control-ui-core-DS6N4FyQ.js";function N(){return[{id:`nav-new-session`,label:E(`newSession.title`),icon:`plus`,category:`navigation`,action:`nav:new-session`},{id:`nav-sessions`,label:E(`palette.items.sessions`),icon:`fileText`,category:`navigation`,action:`nav:sessions`},{id:`nav-cron`,label:E(`palette.items.scheduled`),icon:`scrollText`,category:`navigation`,action:`nav:cron`},{id:`nav-skills`,label:E(`palette.items.skills`),icon:`zap`,category:`navigation`,action:`nav:skills`},{id:`nav-plugins`,label:E(`palette.items.plugins`),icon:`puzzle`,category:`navigation`,action:`nav:plugins`},{id:`nav-apps`,label:E(`palette.items.apps`),icon:`layoutGrid`,category:`navigation`,action:`nav:apps`},{id:`nav-config`,label:E(`palette.items.settings`),icon:`settings`,category:`navigation`,action:`nav:config`},{id:`nav-agents`,label:E(`palette.items.agents`),icon:`folder`,category:`navigation`,action:`nav:agents`},{id:`slash:verbose`,label:`/verbose`,icon:`terminal`,category:`search`,action:`/verbose full`,description:E(`palette.descriptions.verboseMode`)}]}function P(){return N()}function F(e,t=!0,n=[]){let r=P().filter(e=>t||e.category!==`search`);if(!e)return r;let i=w(e),a=r.filter(e=>w(e.label).includes(i)||w(e.description).includes(i));return[...n,...a]}function I(e){let t=new Map;for(let n of e){let e=t.get(n.category)??[];e.push(n),t.set(n.category,e)}return[...t.entries()]}function L(e,t){e.action.startsWith(`nav:`)?t.onNavigate(e.action.slice(4)):e.action.startsWith(G)?t.onSelectSession?.(e.action.slice(8)):t.onSlashCommand?.(e.action),t.onToggle()}function R(e){e.onToggle()}function z(){requestAnimationFrame(()=>{document.querySelector(`.cmd-palette__item--active`)?.scrollIntoView({block:`nearest`})})}function B(e,t){let n=F(t.query,!!t.onSlashCommand,t.sessionItems);if(!(n.length===0&&(e.key===`ArrowDown`||e.key===`ArrowUp`||e.key===`Enter`)))switch(e.key){case`ArrowDown`:e.preventDefault(),t.onActiveIndexChange((t.activeIndex+1)%n.length),z();break;case`ArrowUp`:e.preventDefault(),t.onActiveIndexChange((t.activeIndex-1+n.length)%n.length),z();break;case`Enter`:e.preventDefault();{let e=n[t.activeIndex];e&&L(e,t)}break;case`Escape`:e.preventDefault(),e.stopPropagation(),R(t);break}}function V(e){switch(e){case`search`:return E(`palette.categories.search`);case`navigation`:return E(`palette.categories.navigation`);case`skills`:return E(`palette.categories.skills`);case`chats`:return E(`sessionsView.title`);default:return e}}function H(e){return`cmd-palette-option-${e.id.replace(/[^a-zA-Z0-9_-]/g,`-`)}`}function U(e){e instanceof HTMLInputElement&&requestAnimationFrame(()=>{e.isConnected&&e.focus()})}function W(e){if(!e.open)return m;let t=F(e.query,!!e.onSlashCommand,e.sessionItems),n=I(t),r=t[e.activeIndex],i=r?H(r):m,a=E(`palette.placeholder`);return _`
    <openclaw-modal-dialog
      class="cmd-palette-overlay palette"
      label=${a}
      style="--openclaw-modal-width: min(640px, calc(100vw - 32px));"
      @modal-cancel=${()=>R(e)}
    >
      <div
        class="cmd-palette"
        @click=${e=>e.stopPropagation()}
        @keydown=${t=>B(t,e)}
      >
        <label id=${X} class="cmd-palette__label" for=${Z}
          >${a}</label
        >
        <input
          ${y(e.onInputRef)}
          autofocus
          id=${Z}
          class="cmd-palette__input"
          role="combobox"
          aria-autocomplete="list"
          aria-controls=${Q}
          aria-activedescendant=${i}
          aria-expanded="true"
          placeholder=${a}
          .value=${e.query}
          @input=${t=>{e.onQueryChange(t.target.value),e.onActiveIndexChange(0)}}
        />
        <div id=${Q} class="cmd-palette__results" role="listbox">
          ${n.length===0?_`<div class="cmd-palette__empty">
                <span class="nav-item__icon" style="opacity:0.3;width:20px;height:20px"
                  >${j.search}</span
                >
                <span>${E(`palette.noResults`)}</span>
              </div>`:n.map(([n,r])=>_`
                  <div class="cmd-palette__group-label">${V(n)}</div>
                  ${r.map(n=>{let r=t.indexOf(n),i=r===e.activeIndex;return _`
                      <div
                        id=${H(n)}
                        class="cmd-palette__item ${i?`cmd-palette__item--active`:``}"
                        role="option"
                        aria-selected=${i?`true`:`false`}
                        @click=${t=>{t.stopPropagation(),L(n,e)}}
                        @mouseenter=${()=>e.onActiveIndexChange(r)}
                      >
                        <span class="nav-item__icon">${j[n.icon]}</span>
                        <span>${n.label}</span>
                        ${n.description?_`<span class="cmd-palette__item-desc muted"
                              >${n.description}</span
                            >`:m}
                      </div>
                    `})}
                `)}
        </div>
        <div class="cmd-palette__footer">
          <span><kbd>↑↓</kbd> ${E(`palette.footer.navigate`)}</span>
          <span><kbd>↵</kbd> ${E(`palette.footer.select`)}</span>
          <span><kbd>esc</kbd> ${E(`palette.footer.close`)}</span>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}var G,K,q,J,Y,X,Z,Q,$;e((()=>{te(),g(),h(),v(),C(),D(),p(),u(),d(),i(),a(),l(),k(),M(),A(),t(),G=`session:`,K=250,q=10,J=4,Y=50,X=`cmd-palette-label`,Z=`cmd-palette-input`,Q=`cmd-palette-listbox`,$=class extends c{constructor(){super(),this.open=!1,this.query=``,this.activeIndex=0,this.sessionItems=[],this.subscriptions=new r(this),this.sessionSearchTimer=null,this.sessionSearchId=0,this.togglePalette=()=>{if(this.open){this.open=!1,this.clearSessionSearch();return}this.openPalette()},this.handleInputRef=e=>{this.open&&U(e)},this.handleGlobalKeydown=e=>{if(!e.defaultPrevented&&e.key===`Escape`&&this.open){e.preventDefault(),this.togglePalette();return}O(e)&&(e.preventDefault(),this.togglePalette())},this.subscriptions.watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.synchronizeGateway(e))}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleGlobalKeydown)}disconnectedCallback(){document.removeEventListener(`keydown`,this.handleGlobalKeydown),this.open=!1,this.query=``,this.activeIndex=0,this.clearSessionSearch(),this.sessionSearchSource=void 0,super.disconnectedCallback()}openPalette(){this.open=!0,this.query=``,this.activeIndex=0,this.clearSessionSearch()}get isOpen(){return this.open}synchronizeGateway(e){let t=e.snapshot,n=this.sessionSearchSource,r=n?.gateway!==e,i=n?.client!==t.client,a=n?.connected===!1&&t.phase===`connected`;this.sessionSearchSource={gateway:e,client:t.client,connected:t.phase===`connected`},(r||i||t.phase!==`connected`)&&this.clearSessionSearch(),t.phase===`connected`&&(r||i||a)&&this.scheduleSessionSearch(this.query)}clearSessionSearch(){this.sessionSearchTimer!==null&&(globalThis.clearTimeout(this.sessionSearchTimer),this.sessionSearchTimer=null),this.sessionSearchId+=1,this.sessionItems=[]}scheduleSessionSearch(e){this.sessionSearchTimer!==null&&(globalThis.clearTimeout(this.sessionSearchTimer),this.sessionSearchTimer=null),this.sessionSearchId+=1,this.sessionItems=[];let t=T(e);!this.open||!t||!this.onSelectSession||(this.sessionSearchTimer=globalThis.setTimeout(()=>{this.sessionSearchTimer=null,this.searchSessions(t)},K))}async searchSessions(e){let t=this.context,n=t?.sessions,r=t?.gateway,i=r?.snapshot.client;if(!n||r?.snapshot.phase!==`connected`||!i)return;let a=++this.sessionSearchId,c=[],l=new Set,u=new Set([0]),d=0,p;try{for(;c.length<q&&d<J;){let t=await n.list({search:e,limit:Y,...p===void 0?{}:{offset:p},includeGlobal:!1,includeUnknown:!1});if(d+=1,a!==this.sessionSearchId||!this.open||this.context?.sessions!==n||this.context?.gateway!==r||r.snapshot.client!==i||r.snapshot.phase!==`connected`||!t)return;let s=o(t,{agentId:``,defaultAgentId:``,filterByAgent:!1});for(let e of s)l.has(e.key)||(l.add(e.key),c.push(e));if(c.length>=q||!t.hasMore)break;let f=typeof t.nextOffset==`number`&&Number.isFinite(t.nextOffset)?Math.max(0,Math.floor(t.nextOffset)):t.sessions.length>0?(p??0)+t.sessions.length:null;if(f===null||u.has(f))break;u.add(f),p=f}this.sessionItems=c.slice(0,q).map(e=>({id:`session-${e.key}`,label:f(e.key,e),icon:`messageSquare`,category:`chats`,action:`${G}${e.key}`,description:s(e.updatedAt,{fallback:``})})),this.activeIndex=0}catch{}}render(){return W({open:this.open,query:this.query,activeIndex:this.activeIndex,sessionItems:this.sessionItems,onToggle:this.togglePalette,onQueryChange:e=>{this.query=e,this.activeIndex=0,this.scheduleSessionSearch(e)},onActiveIndexChange:e=>{this.activeIndex=e},onNavigate:e=>this.onNavigate?.(e),onSelectSession:this.onSelectSession,onSlashCommand:this.onSlashCommand,onInputRef:this.handleInputRef})}},n([b({attribute:!1})],$.prototype,`onNavigate`,void 0),n([b({attribute:!1})],$.prototype,`onSelectSession`,void 0),n([b({attribute:!1})],$.prototype,`onSlashCommand`,void 0),n([ee({context:S,subscribe:!0})],$.prototype,`context`,void 0),n([x()],$.prototype,`open`,void 0),n([x()],$.prototype,`query`,void 0),n([x()],$.prototype,`activeIndex`,void 0),n([x()],$.prototype,`sessionItems`,void 0),customElements.get(`openclaw-command-palette`)||customElements.define(`openclaw-command-palette`,$)}))();export{$ as CommandPalette};
//# sourceMappingURL=command-palette-DZVGH-3U.js.map