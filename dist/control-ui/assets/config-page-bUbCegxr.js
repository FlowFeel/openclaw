import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Ar as r,Bc as i,Bo as a,Fs as o,Ho as s,Kc as c,Ms as l,No as u,Ns as d,Ps as f,Qn as ee,Ro as p,So as te,Vc as m,Wc as h,_ as g,as as ne,bo as re,c as _,d as ie,dc as ae,f as oe,fi as se,g as ce,gi as le,go as v,h as y,hi as ue,ho as b,is as de,kr as x,l as fe,m as S,o as C,p as pe,rr as me,rs as he,s as ge,u as _e,uc as ve,ui as ye,v as be,xo as xe}from"./control-ui-core-BUddgKjW.js";import{K as w,Q as T,W as E,Y as D,g as Se,it as O,m as Ce,nt as k}from"./lit-runtime-D5xZwgO1.js";import{f as we,g as Te,i as Ee,m as De,p as Oe,r as ke}from"./control-ui-foundation-Dgui328h.js";import{A as Ae,D as je,E as A,F as Me,G as Ne,J as Pe,K as Fe,L as Ie,M as Le,P as Re,R as ze,T as Be,Tt as Ve,Wt as He,_ as Ue,b as We,bt as Ge,c as Ke,cn as qe,j as Je,jt as Ye,l as Xe,q as Ze,rn as Qe,s as $e,un as et,v as tt,wt as nt,y as rt}from"./control-ui-core-Ct5CBwjl.js";import{At as it,Ct as at,Dt as j,Et as ot,Kt as st,c as ct,l as lt,wt as ut}from"./control-ui-foundation-DkfOBVsU.js";import{i as dt,l as ft,o as M,s as pt,t as N}from"./control-ui-core-s0pW0mau.js";import{gt as mt,vt as P,yt as F}from"./control-ui-core-vLOElyFQ.js";import{a as ht,d as gt,f as _t,l as vt,s as yt,u as bt}from"./control-ui-shared-CvVnFE5v.js";import{i as xt,n as St}from"./gateway-runtime-DWs8EJ0W.js";import{b as Ct,l as wt,n as Tt,o as Et}from"./app-sidebar-session-types-B4KufWuZ.js";import{n as Dt,t as Ot}from"./poll-controller-BnQs2EZr.js";import{n as kt}from"./lobster-pet-contract-CqwEEIA1.js";import{i as At,r as jt}from"./markdown-code-blocks-DmxT8zzH.js";import{_ as Mt,c as Nt,d as Pt,f as Ft,g as It,h as Lt,i as Rt,m as zt,o as Bt,p as Vt,r as Ht,s as Ut,t as Wt,u as Gt}from"./lobster-pet-lwRIKe3g.js";import{n as Kt,t as qt}from"./settings-workspace-BbyrBOFl.js";import{c as I,d as L,f as R,h as z,i as Jt,m as B,n as V,o as Yt,r as H,t as U,u as W}from"./settings-ui-Bko7fBdZ.js";import{t as Xt}from"./agent-select-registration-BVCfxMHW.js";import{n as Zt,t as Qt}from"./hub-tabs-DByyIl3h.js";import{i as $t,n as en,r as tn,t as nn}from"./memory-panel-A6vVN4Nc.js";import{a as rn,n as an,t as on}from"./config-form-DiXcxI3d.js";import{d as sn,f as cn,g as ln,m as un,n as dn,r as fn,u as pn}from"./realtime-talk-C_dN5xqN.js";import{a as mn,c as hn,i as gn,l as _n,n as vn,o as yn,r as bn,s as xn,t as Sn,u as Cn}from"./mcp-servers-JqF563sZ.js";import{n as wn,r as Tn}from"./models-D3RQvKVl.js";import{n as En,r as Dn,t as On}from"./system-info-CMy3Adef.js";import{t as kn}from"./web-awesome-select-Bcc_SPSC.js";var An=e((()=>{})),jn,Mn,Nn=e((()=>{jn={url:``,busy:!1,message:null,expanded:!1,focusToken:0},Mn=class{constructor(e){this.publish=e,this.requestRevision=0,this.activationIntent={revision:0,theme:null},this.gatewayScope=``,this.serverSelectionRevision=0,this.state=jn}get snapshot(){return this.state}connect(e,t){this.gatewayScope=e,this.serverSelectionRevision=this.selectionForScope(e,t)?.revision??0}synchronizeScope(e,t){this.gatewayScope&&e!==this.gatewayScope&&this.retireImport(),this.connect(e,t)}adoptSettings(e,t,n){let r=this.selectionForScope(this.gatewayScope,n),i=this.serverSelectionRevision!==(r?.revision??0);return this.serverSelectionRevision=r?.revision??0,t.customTheme?.importedAt===e.customTheme?.importedAt?(i&&this.recordActivation(r?.theme??null),t.theme!==e.theme&&this.recordActivation(t.theme),t):(this.retireImport(),t)}recordActivation(e){this.activationIntent={revision:this.activationIntent.revision+1,theme:e}}open(){this.update({expanded:!0,focusToken:this.state.focusToken+1})}setUrl(e){e!==this.state.url&&this.retireImport(),this.update({url:e,...this.state.message?.kind===`error`?{message:null}:{}})}retireForConfigMutation(e){this.state.busy&&(this.retireImport(),this.update({message:{kind:`error`,text:e}}))}async import(e){let t=this.blockedReason(e.config);if(t){this.update({expanded:!0,message:{kind:`error`,text:e.messages.blocked(t)}});return}let n=this.beginImport(),r=this.state.url;this.update({expanded:!0,busy:!0,message:null});try{let t=await e.load(r);if(!this.ownsImport(n))return;e.apply(t,!e.hasCustomTheme&&this.mayActivate(n)),this.update({url:``,message:{kind:`success`,text:e.messages.imported(t.label)}})}catch(e){if(!this.ownsImport(n))return;this.update({message:{kind:`error`,text:e instanceof Error?e.message:String(e)}})}finally{this.ownsImport(n)&&this.update({busy:!1})}}clear(e){this.retireImport(),e.apply(),this.update({expanded:!0,message:{kind:`success`,text:e.message}})}retireImport(){this.requestRevision+=1,this.state.busy&&this.update({busy:!1})}beginImport(){return this.requestRevision+=1,{requestRevision:this.requestRevision,activationRevision:this.activationIntent.revision}}ownsImport(e){return e.requestRevision===this.requestRevision}mayActivate(e){return e.activationRevision===this.activationIntent.revision||this.activationIntent.theme===`custom`}blockedReason(e){return e.connected&&(e.configLoading||!e.configSnapshot)?`loading`:e.configFormDirty||e.configSaving||e.configApplying||e.configAutoSaveStatus===`saving`?`unsaved`:null}update(e){this.state={...this.state,...e},this.publish(this.state)}selectionForScope(e,t){return t?.scope===e?t:null}}}));function Pn(e){return/^[A-Za-z0-9._:/-]+$/.test(e)?e:`'${e.replaceAll(`'`,`'\\''`)}'`}function Fn(e){switch(e){case`verify-off`:return M(`mcpPage.tlsVerifyOff`);case`mtls`:return M(`mcpPage.mtls`);default:return null}}var G,In=e((()=>{ke(),E(),T(),tt(),nt(),N(),de(),mn(),c(),m(),F(),_n(),U(),t(),G=class extends h{constructor(...e){super(...e),this.pluginsHref=``,this.docsUrl=`https://docs.openclaw.ai/tools/mcp`,this.rows=null,this.busy=!1,this.message=null,this.formOpen=!1,this.subscriptions=new i(this).effect(()=>this.context?.runtimeConfig,e=>(this.syncRows(),e.ensureLoaded().then(()=>this.syncRows()).catch(e=>{this.message={kind:`error`,text:e instanceof Error?e.message:String(e)}}),e.subscribe(()=>this.syncRows()))).effect(()=>this.context?.gateway,e=>e.subscribe(()=>this.requestUpdate()))}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}syncRows(){let e=this.context?.runtimeConfig.state.configSnapshot;this.rows=hn(ne(e))}mutationBlockedReason(){let e=this.context?.gateway;return e?.snapshot.phase===`connected`?Ge(e.snapshot.hello?.auth??null)?null:M(`mcpServers.adminRequired`):M(`mcpServers.connectRequired`)}canMutate(){return this.context!==void 0&&this.mutationBlockedReason()===null}async mutate(e){if(!this.context||!this.canMutate()||this.busy)return!1;this.busy=!0,this.message=null;let t=await xn(this.context.runtimeConfig,e);return this.busy=!1,t.ok?(this.syncRows(),this.message={kind:`success`,text:e.successText},!0):(this.message={kind:`error`,text:t.error},!1)}async addServer(e){let t=e.name.trim();if(!Sn.test(t)){this.message={kind:`error`,text:M(`mcpServers.nameInvalid`)};return}let n=yn(e.target,e.transport);if(!n){this.message={kind:`error`,text:M(`mcpServers.targetInvalid`)};return}await this.mutate({buildPatch:e=>vn(e,t,n),note:`mcp settings: add server ${t}`,successText:M(`mcpServers.addedSuccess`,{name:t})})&&(this.formOpen=!1)}async toggleServer(e,t){await this.mutate({buildPatch:n=>gn(n,e,t),note:`mcp settings: ${t?`enable`:`disable`} server ${e}`,successText:M(t?`mcpServers.enabledSuccess`:`mcpServers.disabledSuccess`,{name:e})})}async removeServer(e){await this.mutate({buildPatch:t=>bn(t,e),note:`mcp settings: remove server ${e}`,successText:M(`mcpServers.removedSuccess`,{name:e})})}renderRow(e){let t=`openclaw mcp ${e.auth===`oauth`?`login`:`probe`} ${Pn(e.name)}`,n=[e.transport,e.auth,e.toolFilter?M(`mcpPage.toolFilter`):null,e.parallel?M(`mcpPage.parallel`):null,Fn(e.tls)].filter(e=>!!e),r=this.mutationBlockedReason(),i=this.busy||!this.canMutate();return D`
      <div class="settings-row mcp-server-row" data-mcp-name=${e.name}>
        <div class="settings-row__text">
          <span class="settings-row__title">${e.name}</span>
          <span class="settings-row__desc mcp-server-row__launch">
            ${e.target||M(`mcpServers.missingTransport`)}
          </span>
          <span class="settings-row__desc">${n.join(` · `)}</span>
        </div>
        <div class="settings-row__control">
          ${R({kind:e.enabled?`ok`:`muted`,label:e.enabled?M(`common.enabled`):M(`common.disabled`)})}
          <code>${t}</code>
          <button
            type="button"
            class="btn btn--sm"
            title=${r??``}
            ?disabled=${i}
            @click=${()=>void this.toggleServer(e.name,!e.enabled)}
          >
            ${this.busy?M(`mcpServers.working`):e.enabled?M(`mcpServers.disable`):M(`mcpServers.enable`)}
          </button>
          <button
            type="button"
            class="btn btn--sm btn--icon mcp-server-remove"
            aria-label=${M(`mcpServers.removeNamed`,{name:e.name})}
            title=${r??M(`mcpServers.removeNamed`,{name:e.name})}
            ?disabled=${i}
            @click=${()=>void this.removeServer(e.name)}
          >
            ${P.trash}
          </button>
        </div>
      </div>
    `}render(){let e=this.mutationBlockedReason(),t=this.rows,n=t?t.length===0?Jt(D`
            ${M(`mcpPage.noServers`)} ${V(this.docsUrl,M(`mcpPage.setUpFirstServer`))}
          `):t.map(e=>this.renderRow(e)):D`<div class="mcp-server-loading" role="status">${M(`common.loading`)}</div>`;return D`
      <div class="mcp-server-list">
        ${W({title:M(`mcpPage.configuredServers`),description:D`
              ${M(`mcpPage.runtimeHint`)}
              <a href=${this.pluginsHref}>${M(`mcpPage.connectorsLink`)}</a>
            `,actions:D`
              <button
                type="button"
                class="btn btn--sm"
                title=${e??``}
                ?disabled=${this.busy||!this.canMutate()}
                @click=${()=>{this.formOpen=!this.formOpen,this.formOpen&&(this.message=null)}}
              >
                <span aria-hidden="true">${P.plus}</span>
                ${M(`mcpServers.add`)}
              </button>
            `},D`
            ${this.formOpen?Cn({busy:this.busy,disabled:!this.canMutate(),blockedReason:e,onSubmit:e=>void this.addServer(e),onCancel:()=>{this.formOpen=!1}}):w}
            ${this.message?D`<div
                  class="mcp-server-message mcp-server-message--${this.message.kind}"
                  role=${this.message.kind===`error`?`alert`:`status`}
                >
                  ${this.message.text}
                </div>`:w}
            ${n}
          `)}
      </div>
    `}},n([Ee({context:Ue,subscribe:!0})],G.prototype,`context`,void 0),n([O()],G.prototype,`pluginsHref`,void 0),n([O()],G.prototype,`docsUrl`,void 0),n([k()],G.prototype,`rows`,void 0),n([k()],G.prototype,`busy`,void 0),n([k()],G.prototype,`message`,void 0),n([k()],G.prototype,`formOpen`,void 0),customElements.get(`openclaw-mcp-servers-card`)||customElements.define(`openclaw-mcp-servers-card`,G)}));function Ln(e){let t=hn(e.configObject)??[],n=t.filter(e=>e.enabled).length,r=t.filter(e=>e.auth===`oauth`).length,i=t.filter(e=>e.toolFilter).length;return D`
    <section class="mcp-page">
      <div class="settings-page">
        <p class="settings-page__intro">
          ${M(`mcpPage.intro`)} ${V(Rn,M(`common.learnMore`))}
        </p>
        <section class="settings-section mcp-page__summary">
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${M(`mcpPage.servers`)}</h2>
          </div>
          <div class="settings-group">
            ${I({title:M(`mcpPage.servers`),control:z(t.length)})}
            ${I({title:M(`common.enabled`),control:z(n)})}
            ${I({title:M(`mcpPage.oauth`),control:z(r)})}
            ${I({title:M(`mcpPage.filtered`),control:z(i)})}
          </div>
        </section>

        <section class="settings-section">
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${M(`mcpPage.operatorCommands`)}</h2>
          </div>
          <p class="settings-section__desc">${M(`mcpPage.operatorCommandsHint`)}</p>
          <div class="settings-group">
            <div class="settings-row settings-row--stacked">
              <div class="mcp-command-card__grid">
                <code>openclaw mcp status --verbose</code>
                <code>openclaw mcp doctor --probe</code>
                <code>openclaw mcp login &lt;name&gt;</code>
                <code>openclaw mcp reload</code>
              </div>
            </div>
          </div>
        </section>

        <openclaw-mcp-servers-card
          .pluginsHref=${e.pluginsHref}
          .docsUrl=${Rn}
        ></openclaw-mcp-servers-card>
      </div>

      ${e.editor}
    </section>
  `}var Rn,zn=e((()=>{E(),In(),U(),N(),mn(),Rn=`https://docs.openclaw.ai/tools/mcp`})),Bn,Vn=e((()=>{E(),T(),c(),nn(),t(),Bn=class extends h{constructor(...e){super(...e),this.agentId=null}render(){return D`
      ${this.agentId?D`<openclaw-agent-memory-panel .agentId=${this.agentId}></openclaw-agent-memory-panel>`:w}
    `}},n([O()],Bn.prototype,`agentId`,void 0),customElements.get(`openclaw-memory-dreaming`)||customElements.define(`openclaw-memory-dreaming`,Bn)})),Hn=e((()=>{}));function Un(e,t){return`${t}:${e.path}:${e.startLine}:${e.endLine}`}function Wn(e){let t=e.path.replaceAll(`\\`,`/`),n=!t.startsWith(`/`)&&!t.startsWith(`sessions/`)&&!/^[a-zA-Z]:\//.test(t)&&t.split(`/`).every(e=>e&&e!==`.`&&e!==`..`),r=t===`MEMORY.md`||t.startsWith(`memory/`);return e.source===`memory`&&n&&r}function Gn(e,t){let n=e.split(/\r?\n/),r=Math.max(0,t.startLine-1),i=Math.min(n.length,t.endLine),a=n.slice(0,r),o=n.slice(r,i),s=n.slice(i);return D`<pre class="memory-memories__file" tabindex="0"><span
      >${a.join(`
`)}${a.length?`
`:``}</span
    ><mark data-memory-match="true">${o.join(`
`)}</mark
    ><span>${s.length?`\n${s.join(`
`)}`:``}</span></pre>`}var K,Kn=e((()=>{at(),E(),T(),N(),ve(),c(),Hn(),t(),K=class extends h{constructor(...e){super(...e),this.client=null,this.connected=!1,this.methodAdvertised=!0,this.agentId=null,this.query=``,this.searchState={kind:`idle`},this.openResultKey=null,this.details=new Map,this.searchRequest=null,this.detailRequests=new Map}updated(e){(e.has(`agentId`)||e.has(`client`)||e.has(`connected`)||e.has(`methodAdvertised`))&&this.resetSearch()}resetSearch(){this.searchRequest=null,this.detailRequests.clear(),this.query=``,this.searchState={kind:`idle`},this.openResultKey=null,this.details=new Map}async search(e){let t=e.trim(),n=this.connected?this.client:null,r=this.agentId;if(!t||!n||!r||!this.methodAdvertised)return;let i={client:n,agentId:r,query:t};this.searchRequest=i,this.query=t,this.searchState={kind:`loading`,query:t},this.openResultKey=null,this.details=new Map,this.detailRequests.clear();try{let e=await n.request(`memory.search`,{query:t,agentId:r});if(this.searchRequest!==i||this.agentId!==r||this.client!==n)return;this.searchState={kind:`ready`,query:t,...e}}catch(e){if(this.searchRequest!==i||this.agentId!==r||this.client!==n)return;this.searchState={kind:`error`,query:t,message:st(e,{redact:ae})}}}toggleResult(e,t){let n=Un(e,t);if(this.openResultKey===n){this.openResultKey=null;return}this.openResultKey=n,this.details.has(n)||this.loadDetail(n,e)}async loadDetail(e,t){let n=this.connected?this.client:null,r=this.agentId;if(!n||!r)return;let i={client:n,agentId:r,path:t.path};this.detailRequests.set(e,i),this.details=new Map(this.details).set(e,{kind:`loading`});try{let a=await n.request(`agents.workspace.get`,{agentId:r,path:t.path});if(this.detailRequests.get(e)!==i||this.agentId!==r)return;let o=a.file.encoding===`utf8`?{kind:`ready`,content:a.file.content}:{kind:`error`,message:M(`memoryPage.memories.fileUnsupported`)};this.details=new Map(this.details).set(e,o)}catch(t){if(this.detailRequests.get(e)!==i||this.agentId!==r)return;this.details=new Map(this.details).set(e,{kind:`error`,message:st(t,{redact:ae})})}finally{this.detailRequests.get(e)===i&&this.detailRequests.delete(e)}}renderDetail(e,t,n){if(this.openResultKey!==e)return w;let r=this.details.get(e);return D`<div id=${t} class="memory-memories__detail">
      ${!r||r.kind===`loading`?D`<p role="status">${M(`memoryPage.memories.fileLoading`)}</p>`:r.kind===`error`?D`<p class="memory-memories__detail-error" role="alert">
              ${M(`memoryPage.memories.fileError`,{message:r.message})}
            </p>`:Gn(r.content,n)}
    </div>`}renderResults(e){let t=e.searchMode===`hybrid`?M(`memoryPage.memories.hybridSearch`):M(`memoryPage.memories.keywordSearch`);return D`
      <div class="memory-memories__results-heading">
        <span>${M(`memoryPage.memories.results`,{count:String(e.results.length)})}</span>
        <span class="memory-memories__mode">${t}</span>
      </div>
      ${e.results.length===0?D`<p class="memory-memories__state">
            ${M(`memoryPage.memories.empty`,{query:e.query})}
          </p>`:D`<div class="settings-group memory-memories__results">
            ${e.results.map((e,t)=>{let n=Un(e,t),r=this.openResultKey===n,i=Wn(e),a=`memory-detail-${t}`,o=D`
                <span class="settings-row__text">
                  <span class="settings-row__title">${e.snippet}</span>
                  <span class="settings-row__desc memory-memories__path"
                    >${e.path} ·
                    ${M(`memoryPage.memories.lineRange`,{start:String(e.startLine),end:String(e.endLine)})}</span
                  >
                </span>
                <span class="settings-row__control memory-memories__meta">
                  <span class="memory-memories__source"
                    >${M(e.source===`sessions`?`memoryPage.memories.sourceSessions`:`memoryPage.memories.sourceMemory`)}</span
                  >
                  <span
                    >${M(`memoryPage.memories.score`,{score:e.score.toFixed(2)})}</span
                  >
                </span>
              `;return D`<article class="memory-memories__result">
                ${i?D`<button
                      type="button"
                      class="settings-row settings-row--nav"
                      aria-expanded=${String(r)}
                      aria-controls=${a}
                      @click=${()=>this.toggleResult(e,t)}
                    >
                      ${o}
                    </button>`:D`<div class="settings-row">${o}</div>`}
                ${i?this.renderDetail(n,a,e):w}
              </article>`})}
          </div>`}
    `}renderSearchState(){switch(this.searchState.kind){case`loading`:return D`<p class="memory-memories__state" role="status">
          ${M(`memoryPage.memories.searching`)}
        </p>`;case`error`:{let e=this.searchState;return D`<div class="memory-memories__state" role="alert">
          <p>${M(`memoryPage.memories.error`,{message:e.message})}</p>
          <button class="btn btn--sm" @click=${()=>void this.search(e.query)}>
            ${M(`memoryPage.memories.retry`)}
          </button>
        </div>`}case`ready`:return this.renderResults(this.searchState);default:return D`<p class="memory-memories__state">${M(`memoryPage.memories.idle`)}</p>`}}render(){return D`<div class="settings-page memory-memories">
      ${this.methodAdvertised?D`<form
              class="memory-memories__search"
              role="search"
              @submit=${e=>{e.preventDefault(),this.search(this.query)}}
            >
              <label class="settings-control__sr-label" for="memory-search-input"
                >${M(`memoryPage.memories.searchLabel`)}</label
              >
              <input
                id="memory-search-input"
                type="search"
                class="settings-input"
                .value=${this.query}
                placeholder=${M(`memoryPage.memories.searchPlaceholder`)}
                @input=${e=>{this.query=e.currentTarget.value}}
              />
              <button
                class="btn btn--sm primary"
                type="submit"
                ?disabled=${!this.connected||!this.agentId||!this.query.trim()||this.searchState.kind===`loading`}
              >
                ${M(`memoryPage.memories.searchButton`)}
              </button>
            </form>
            ${this.renderSearchState()}`:D`<p class="memory-memories__unavailable">
            ${M(`memoryPage.memories.gatewayUpdateRequired`)}
          </p>`}
    </div>`}},n([O({attribute:!1})],K.prototype,`client`,void 0),n([O({type:Boolean})],K.prototype,`connected`,void 0),n([O({type:Boolean})],K.prototype,`methodAdvertised`,void 0),n([O()],K.prototype,`agentId`,void 0),n([k()],K.prototype,`query`,void 0),n([k()],K.prototype,`searchState`,void 0),n([k()],K.prototype,`openResultKey`,void 0),n([k()],K.prototype,`details`,void 0),customElements.get(`openclaw-memory-memories`)||customElements.define(`openclaw-memory-memories`,K)}));function qn(e,t=!1){return t?!1:(e.removeFormValue([`plugins`,`slots`,`memory`]),!0)}function Jn(e,t=!1){return t?!1:(e.removeFormValue([`memory`,`backend`]),!0)}function Yn(e,t){return[`plugins`,`entries`,e,`config`,`dreaming`,...t]}function Xn(e){let t=j(j(e?.agents)?.defaults)?.userTimezone;return typeof t==`string`&&t.trim()?t.trim():null}var Zn=e((()=>{it()}));function Qn(e,t){let n=e;for(let[e,r]of t.entries()){if(!n)return;let i=n[r];if(e===t.length-1)return i;n=j(i)}}function $n(e,t){let n=e;for(let[e,r]of t.entries()){if(!n||!Object.hasOwn(n,r))return!1;if(e===t.length-1)return!0;n=j(n[r])}return!1}function er(e){return ur.find(t=>t===e)??dr}function tr(e){let t=Qn(e,[`execution`,`defaults`,`model`]);return typeof t==`string`&&t.trim()?t.trim():M(`memoryPage.dreaming.model.default`)}function nr(e,t){let n=Number(e);return!Number.isFinite(n)||n<t.min||t.integer&&!Number.isInteger(n)||t.max!==void 0&&n>t.max?null:n}function rr(e,t){let n=Qn(e.dreaming,t.path),r=$n(e.dreaming,t.path),i=t.kind===`toggle`?t.fallback?M(`common.enabled`):M(`common.disabled`):t.kind===`number`?String(t.defaultValue):t.path[0]===`timezone`?e.timezoneDefault??M(`memoryPage.dreaming.timezone.default`):t.path[0]===`model`?tr(e.dreaming):t.defaultValue?t.defaultValue:t.defaultLabelKey?M(t.defaultLabelKey):``,a=H({value:i,overridden:r,disabled:e.disabled,onReset:()=>e.onPatch(t.path,void 0)});if(t.kind===`toggle`)return B({title:M(t.labelKey),description:D`${M(t.helpKey)} ${a.description}`,checked:typeof n==`boolean`?n:t.fallback,disabled:e.disabled,actions:a.action,onChange:n=>e.onPatch(t.path,n)});let o=t.kind===`number`?typeof n==`number`?String(n):``:typeof n==`string`?n:``,s=t.kind===`number`?t.bounds:null;return I({title:M(t.labelKey),description:D`${M(t.helpKey)} ${a.description}`,control:D`
      ${a.action}
      <input
        class="settings-input"
        type=${t.kind===`number`?`number`:`text`}
        min=${s?String(s.min):w}
        max=${s?.max===void 0?w:String(s.max)}
        step=${s?s.integer?`1`:`any`:w}
        spellcheck="false"
        aria-label=${M(t.labelKey)}
        ?disabled=${e.disabled}
        .value=${o}
        placeholder=${i}
        @change=${n=>{let r=n.currentTarget,i=r.value.trim();if(!i){e.onPatch(t.path,void 0);return}if(s){let n=nr(i,s);if(n===null){r.value=o;return}e.onPatch(t.path,n);return}e.onPatch(t.path,i)}}
      />
    `})}function ir(e){let t=er(Qn(e.dreaming,[`storage`,`mode`])),n=H({value:M(`memoryPage.dreaming.storage.modes.separate`),overridden:$n(e.dreaming,[`storage`,`mode`]),disabled:e.disabled,onReset:()=>e.onPatch([`storage`,`mode`],void 0)});return D`
    ${W({title:M(`memoryPage.dreaming.schedule.title`),description:M(`memoryPage.dreaming.schedule.description`)},cr.map(t=>rr(e,t)))}
    ${W({title:M(`memoryPage.dreaming.storage.title`),description:M(`memoryPage.dreaming.storage.description`)},D`
        ${I({title:M(`memoryPage.dreaming.storage.modeLabel`),description:D`
            ${M(`memoryPage.dreaming.storage.modeHelp`)} ${n.description}
          `,stacked:!0,control:D`
            ${n.action}
            ${L({value:t,options:ur.map(e=>({value:e,label:M(`memoryPage.dreaming.storage.modes.${e}`)})),ariaLabel:M(`memoryPage.dreaming.storage.modeLabel`),disabled:e.disabled,onChange:t=>e.onPatch([`storage`,`mode`],t)})}
          `})}
        ${rr(e,{kind:`toggle`,path:[`storage`,`separateReports`],labelKey:`memoryPage.dreaming.storage.separateReportsLabel`,helpKey:`memoryPage.dreaming.storage.separateReportsHelp`,fallback:!1})}
      `)}
    ${lr.map(t=>W({title:M(t.titleKey),description:M(t.descriptionKey)},t.fields.map(t=>rr(e,t))))}
  `}function ar(e){return W({title:M(`memoryPage.dreaming.unsupported.title`)},I({title:M(`memoryPage.dreaming.unsupported.rowTitle`),description:M(`memoryPage.dreaming.unsupported.description`,{plugin:e})}))}var q,or,sr,cr,lr,ur,dr,fr=e((()=>{it(),E(),U(),N(),q={integer:!0,min:0},or={integer:!0,min:1},sr={integer:!1,min:0,max:1},cr=[{kind:`text`,path:[`frequency`],labelKey:`memoryPage.dreaming.frequency.label`,helpKey:`memoryPage.dreaming.frequency.help`,placeholderKey:`memoryPage.dreaming.frequency.placeholder`,defaultValue:`0 3 * * *`},{kind:`text`,path:[`timezone`],labelKey:`memoryPage.dreaming.timezone.label`,helpKey:`memoryPage.dreaming.timezone.help`,placeholderKey:`memoryPage.dreaming.timezone.placeholder`},{kind:`text`,path:[`model`],labelKey:`memoryPage.dreaming.model.label`,helpKey:`memoryPage.dreaming.model.help`,placeholderKey:`memoryPage.dreaming.model.placeholder`,defaultLabelKey:`memoryPage.dreaming.model.default`},{kind:`toggle`,path:[`verboseLogging`],labelKey:`memoryPage.dreaming.verboseLogging.label`,helpKey:`memoryPage.dreaming.verboseLogging.help`,fallback:!1}],lr=[{titleKey:`memoryPage.dreaming.phases.light.title`,descriptionKey:`memoryPage.dreaming.phases.light.description`,fields:[{kind:`toggle`,path:[`phases`,`light`,`enabled`],labelKey:`memoryPage.dreaming.phaseFields.enabled`,helpKey:`memoryPage.dreaming.phaseFields.enabledHelp`,fallback:!0},{kind:`number`,path:[`phases`,`light`,`lookbackDays`],labelKey:`memoryPage.dreaming.phaseFields.lookbackDays`,helpKey:`memoryPage.dreaming.phaseFields.lookbackDaysHelp`,bounds:q,defaultValue:2},{kind:`number`,path:[`phases`,`light`,`limit`],labelKey:`memoryPage.dreaming.phaseFields.limit`,helpKey:`memoryPage.dreaming.phaseFields.limitHelp`,bounds:q,defaultValue:100},{kind:`number`,path:[`phases`,`light`,`dedupeSimilarity`],labelKey:`memoryPage.dreaming.phaseFields.dedupeSimilarity`,helpKey:`memoryPage.dreaming.phaseFields.dedupeSimilarityHelp`,bounds:sr,defaultValue:.9}]},{titleKey:`memoryPage.dreaming.phases.deep.title`,descriptionKey:`memoryPage.dreaming.phases.deep.description`,fields:[{kind:`toggle`,path:[`phases`,`deep`,`enabled`],labelKey:`memoryPage.dreaming.phaseFields.enabled`,helpKey:`memoryPage.dreaming.phaseFields.enabledHelp`,fallback:!0},{kind:`number`,path:[`phases`,`deep`,`limit`],labelKey:`memoryPage.dreaming.phaseFields.limit`,helpKey:`memoryPage.dreaming.phaseFields.limitHelp`,bounds:q,defaultValue:10},{kind:`number`,path:[`phases`,`deep`,`minScore`],labelKey:`memoryPage.dreaming.phaseFields.minScore`,helpKey:`memoryPage.dreaming.phaseFields.minScoreHelp`,bounds:sr,defaultValue:.75},{kind:`number`,path:[`phases`,`deep`,`minRecallCount`],labelKey:`memoryPage.dreaming.phaseFields.minRecallCount`,helpKey:`memoryPage.dreaming.phaseFields.minRecallCountHelp`,bounds:q,defaultValue:3},{kind:`number`,path:[`phases`,`deep`,`minUniqueQueries`],labelKey:`memoryPage.dreaming.phaseFields.minUniqueQueries`,helpKey:`memoryPage.dreaming.phaseFields.minUniqueQueriesHelp`,bounds:q,defaultValue:3},{kind:`number`,path:[`phases`,`deep`,`recencyHalfLifeDays`],labelKey:`memoryPage.dreaming.phaseFields.recencyHalfLifeDays`,helpKey:`memoryPage.dreaming.phaseFields.recencyHalfLifeDaysHelp`,bounds:q,defaultValue:14},{kind:`number`,path:[`phases`,`deep`,`maxAgeDays`],labelKey:`memoryPage.dreaming.phaseFields.maxAgeDays`,helpKey:`memoryPage.dreaming.phaseFields.maxAgeDaysHelp`,bounds:or,defaultValue:30},{kind:`number`,path:[`phases`,`deep`,`maxPromotedSnippetTokens`],labelKey:`memoryPage.dreaming.phaseFields.maxPromotedSnippetTokens`,helpKey:`memoryPage.dreaming.phaseFields.maxPromotedSnippetTokensHelp`,bounds:or,defaultValue:160}]},{titleKey:`memoryPage.dreaming.phases.rem.title`,descriptionKey:`memoryPage.dreaming.phases.rem.description`,fields:[{kind:`toggle`,path:[`phases`,`rem`,`enabled`],labelKey:`memoryPage.dreaming.phaseFields.enabled`,helpKey:`memoryPage.dreaming.phaseFields.enabledHelp`,fallback:!0},{kind:`number`,path:[`phases`,`rem`,`lookbackDays`],labelKey:`memoryPage.dreaming.phaseFields.lookbackDays`,helpKey:`memoryPage.dreaming.phaseFields.lookbackDaysHelp`,bounds:q,defaultValue:7},{kind:`number`,path:[`phases`,`rem`,`limit`],labelKey:`memoryPage.dreaming.phaseFields.limit`,helpKey:`memoryPage.dreaming.phaseFields.limitHelp`,bounds:q,defaultValue:10},{kind:`number`,path:[`phases`,`rem`,`minPatternStrength`],labelKey:`memoryPage.dreaming.phaseFields.minPatternStrength`,helpKey:`memoryPage.dreaming.phaseFields.minPatternStrengthHelp`,bounds:sr,defaultValue:.75}]}],ur=[`inline`,`separate`,`both`],dr=`separate`})),pr=e((()=>{}));function mr(e){return!e.embedding.ok&&e.embedding.checked!==!1}function hr(e){return e.provider===`none`?M(`memoryPage.overview.hero.keywordSearch`):M(`memoryPage.overview.hero.hybridSearch`)}function gr(e){let t=y(e.engineSelection),n=e.engineSelection.kind===`off`||e.engineDisabled,r=e.status.kind===`ready`?e.status.payload:null,i=e.status.kind===`error`||r!==null&&mr(r),a=Rt(kt(e.agentId??`memory`)),o=n?M(`memoryPage.overview.hero.hibernating`):e.status.kind===`loading`||e.status.kind===`idle`?M(`memoryPage.overview.hero.waking`):M(i?`memoryPage.overview.hero.needsAttention`:`memoryPage.overview.hero.awake`),s=n?M(e.engineDisabled?`memoryPage.overview.hero.disabledDescription`:`memoryPage.overview.hero.offDescription`):e.status.kind===`error`?e.status.message:r?mr(r)?r.embedding.error??M(`memoryPage.overview.health.unavailable`):M(`memoryPage.overview.hero.activeDescription`,{engine:t??M(`common.unknown`),mode:hr(r)}):M(`memoryPage.overview.hero.loadingDescription`),c=n?{sleeping:!0}:i?{grumpy:!0,standalone:!0}:r?{reading:!0,standalone:!0}:{standalone:!0};return D`
    <section class="memory-overview__hero ${n?`memory-overview__hero--sleeping`:``}">
      <div class="memory-overview__lobster" style=${Bt(a)}>
        ${Ut(a,c)}
      </div>
      <div class="memory-overview__hero-copy">
        <h2>${o}</h2>
        <p class=${i?`memory-overview__hero-error`:``}>${s}</p>
        <div class="memory-overview__hero-actions">
          ${n?D`<button class="btn btn--sm" @click=${()=>e.onNavigate(`settings`)}>
                ${M(`memoryPage.overview.hero.openSettings`)}
              </button>`:D`<button class="btn btn--sm" @click=${e.onRefresh}>
                ${e.status.kind===`error`?M(`memoryPage.overview.hero.retry`):M(`memoryPage.overview.hero.refresh`)}
              </button>`}
        </div>
      </div>
    </section>
  `}function _r(e,t,n){return[e.cron||M(`common.na`),t,n&&e.nextRunAtMs?M(`memoryPage.overview.schedule.nextRun`,{time:ee(e.nextRunAtMs)}):null,e.lastRunAtMs?M(`memoryPage.overview.schedule.lastRun`,{time:ee(e.lastRunAtMs)}):null].filter(e=>!!e).join(` · `)}function vr(e){let t=[[`light`,e.phases.light],[`rem`,e.phases.rem],[`deep`,e.phases.deep]];return W({title:M(`memoryPage.overview.schedule.title`)},D`
      ${t.map(([t,n])=>I({title:M(`memoryPage.dreaming.phases.${t}.title`),description:D`
            ${M(`memoryPage.overview.schedule.${t}Description`)}<br />
            ${_r(n,e.timezone,e.enabled&&n.enabled&&n.managedCronPresent)}
          `,control:R({kind:e.enabled&&n.enabled&&n.managedCronPresent?`ok`:`muted`,label:!e.enabled||!n.enabled?M(`common.disabled`):n.managedCronPresent?M(`common.enabled`):M(`memoryPage.overview.schedule.notScheduled`)})}))}
      ${I({title:M(`memoryPage.overview.schedule.learnMore`),control:D`<a
          class="memory-page__link"
          href="https://docs.openclaw.ai/concepts/dreaming"
          target="_blank"
          rel="noreferrer noopener"
          >${M(`memoryPage.overview.schedule.openDocs`)}</a
        >`})}
    `)}function yr(e){let t=[[`promotedToday`,e.promotedToday],[`promotedTotal`,e.promotedTotal],[`shortTermCount`,e.shortTermCount],[`phaseHitCount`,e.phaseSignalCount],[`lightPhaseHitCount`,e.lightPhaseHitCount],[`remPhaseHitCount`,e.remPhaseHitCount]];return W({title:M(`memoryPage.overview.activity.title`)},t.map(([e,t])=>I({title:M(`memoryPage.overview.activity.${e}`),control:z(t)})))}function br(e,t){let n=e.embedding.checked===!1,r=e.embedding.ok?`ok`:n?`muted`:`danger`,i=t.probingEmbeddings?M(`memoryPage.overview.health.checking`):e.embedding.ok?M(`memoryPage.overview.health.healthy`):M(n?`memoryPage.overview.health.notChecked`:`memoryPage.overview.health.unavailable`);return W({title:M(`memoryPage.overview.health.title`)},D`
      ${I({title:M(`memoryPage.overview.health.provider`),control:z(e.provider??M(`common.unknown`),{mono:!0})})}
      ${I({title:M(`memoryPage.overview.health.embeddings`),description:e.embedding.ok?w:n?M(`memoryPage.overview.health.notCheckedDescription`):e.embedding.error,control:D`
          ${R({kind:r,label:i})}
          ${n?D`<button
                type="button"
                class="btn btn--sm"
                ?disabled=${t.probingEmbeddings}
                @click=${t.onProbeEmbeddings}
              >
                ${t.probingEmbeddings?M(`memoryPage.overview.health.testing`):M(`memoryPage.overview.health.test`)}
              </button>`:w}
        `})}
      ${e.embeddingRuntime?I({title:M(`memoryPage.overview.health.runtime`),description:e.embeddingRuntime.loadError,control:z([e.embeddingRuntime.engine,e.embeddingRuntime.backend,e.embeddingRuntime.deviceNames?.join(`, `)].filter(Boolean).join(` · `))}):w}
    `)}function xr(e){return e.status.kind===`ready`?D`
    ${e.status.payload.dreaming?vr(e.status.payload.dreaming):w}
    ${e.status.payload.dreaming?yr(e.status.payload.dreaming):w}
    ${br(e.status.payload,e)}
  `:w}function Sr(e){return W({title:M(`memoryPage.overview.shortcuts.title`)},D`
      ${Yt({title:M(`memoryPage.overview.shortcuts.memories`),onClick:()=>e.onNavigate(`memories`)})}
      ${Yt({title:M(`memoryPage.overview.shortcuts.diary`),onClick:()=>e.onNavigate(`dreams`)})}
      ${Yt({title:M(`memoryPage.overview.shortcuts.settings`),onClick:()=>e.onNavigate(`settings`)})}
    `)}function Cr(e){let t=e.engineSelection.kind!==`off`&&!e.engineDisabled;return D`
    <div class="settings-page memory-overview">
      ${gr(e)} ${t?xr(e):w} ${Sr(e)}
    </div>
  `}var wr=e((()=>{E(),Wt(),U(),N(),me(),pr(),fe()}));function Tr(e,t){if(e.kind!==`ready`)return[];let n=e.plugins.filter(e=>e.installed&&e.kind?.includes(`memory`)===!0).map(e=>({id:e.id,label:e.id===C?M(`memoryPage.engine.openClawMemory`):e.name,available:!0})).toSorted((e,t)=>{let n=e.id===C;return n===(t.id===C)?e.label.localeCompare(t.label):n?-1:1}),r=y(t);if(r&&!n.some(e=>e.id===r)){let e={id:r,label:r===C?M(`memoryPage.engine.openClawMemory`):r,available:!1};r===C?n.unshift(e):n.push(e)}return n}function Er(e,t){return e.kind===`ready`?!t?.installed||t.state===`not-installed`||t.state===`error`?`unknown`:t.enabled?`enabled`:`disabled`:e.kind===`loading`?`loading`:`unknown`}function Dr(e,t){return e.kind===`ready`&&t?e.plugins.find(e=>e.id===t):void 0}function Or(e,t){return Lr.map(n=>{let r=Dr(e,n.id);return{id:n.id,label:M(n.labelKey),description:r?.description??n.id,state:Er(e,r),busy:t.busy.has(n.id),error:t.errors.get(n.id)??null,notice:[t.notices.get(n.id)?.message,t.refreshWarnings.get(n.id)].filter(Boolean).join(` `)||null}})}function kr(e){switch(e.kind){case`auto`:return`memoryPage.engine.autoHint`;case`off`:return`memoryPage.engine.offHint`;default:return`memoryPage.engine.explicitHint`}}function Ar(e){let t=y(e.engineSelection),n=H({value:e.engineOptions.find(e=>e.id===C)?.label??M(`memoryPage.engine.openClawMemory`),overridden:e.engineSelection.kind!==`auto`,disabled:e.engineBusy,onReset:e.onEngineReset});if(e.engineOptions.length===0)return W({title:M(`memoryPage.engine.title`),description:M(`memoryPage.engine.description`)},I({title:M(`memoryPage.engine.rowTitle`),description:D`
          ${M(`memoryPage.engine.catalogUnavailable`)} ${M(kr(e.engineSelection))}
          ${n.description}
        `,control:D`
          ${n.action}
          ${z(t??M(`memoryPage.engine.off`),{mono:!0})}
        `}));let r=[...e.engineOptions.map(e=>({value:e.id,label:e.available?e.label:`${e.label} (${M(`memoryPage.engine.unavailable`)})`})),{value:Br,label:M(`memoryPage.engine.off`)}];return W({title:M(`memoryPage.engine.title`),description:M(`memoryPage.engine.description`)},D`
      ${I({title:M(`memoryPage.engine.rowTitle`),description:D`${M(kr(e.engineSelection))} ${n.description}`,stacked:!0,control:D`
          ${n.action}
          ${L({value:t??Br,options:r,disabled:e.engineBusy,ariaLabel:M(`memoryPage.engine.rowTitle`),onChange:t=>e.onEngineChange(t||null)})}
        `})}
      ${jr(e,t)}
      ${e.engineOutcome===null?w:I({title:M(e.engineOutcome.kind===`error`?`memoryPage.engine.changeFailed`:`pluginsPage.needsAttention`),description:e.engineOutcome.message,control:R({kind:e.engineOutcome.kind===`error`?`danger`:`warn`,label:M(e.engineOutcome.kind===`error`?`common.failed`:`pluginsPage.needsAttention`)})})}
    `)}function jr(e,t){return t===null||e.engineState!==`disabled`?w:I({title:M(`memoryPage.engine.disabledTitle`),description:M(`memoryPage.engine.disabledHint`),control:D`
      <button
        class="btn btn--sm"
        ?disabled=${e.engineBusy}
        @click=${()=>e.onEngineChange(t)}
      >
        ${M(`memoryPage.engine.enable`)}
      </button>
    `})}function Mr(e){if(e.backendSelection===null)return w;let t=e.backendSelection.kind===`invalid`,n=e.backendSelection.backend,r=H({value:M(`memoryPage.backend.builtin`),overridden:e.backendSelection.kind!=="default",disabled:e.backendBusy,onReset:e.onBackendReset}),i=e.backendSelection.kind===`invalid`?Vr:e.backendSelection.backend,a=[];return t&&a.push({value:Vr,label:M(`memoryPage.backend.invalid`)}),a.push({value:`builtin`,label:M(`memoryPage.backend.builtin`)},{value:`qmd`,label:M(`memoryPage.backend.qmd`)}),D`<div id=${ge}>
    ${W({title:M(`memoryPage.backend.title`),description:M(`memoryPage.backend.description`)},I({title:M(`memoryPage.backend.rowTitle`),description:D`
          ${M(t?`memoryPage.backend.invalidHint`:n===`qmd`?`memoryPage.backend.qmdHint`:`memoryPage.backend.builtinHint`)}
          ${r.description}
        `,stacked:!0,control:D`
          ${r.action}
          ${L({value:i,options:a,disabled:e.backendBusy,ariaLabel:M(`memoryPage.backend.rowTitle`),onChange:t=>{t!==Vr&&e.onBackendChange(t)}})}
        `}))}
  </div>`}function Nr(e){switch(e){case`enabled`:return R({kind:`ok`,label:M(`common.enabled`)});case`disabled`:return R({kind:`muted`,label:M(`common.disabled`)});case`loading`:return R({kind:`muted`,label:M(`common.loading`)});default:return R({kind:`muted`,label:M(`memoryPage.addons.stateUnknown`)})}}function Pr(e){return W({title:M(`memoryPage.addons.title`),description:M(`memoryPage.addons.description`)},D`
      ${e.addons.map(t=>D`
          ${e.canToggleAddons&&(t.state===`enabled`||t.state===`disabled`)?B({title:t.label,ariaLabel:M(`memoryPage.addons.toggleAriaLabel`,{plugin:t.label}),description:t.description,checked:t.state===`enabled`,disabled:t.busy,onChange:n=>e.onAddonChange(t.id,n)}):I({title:t.label,description:t.description,control:Nr(t.state)})}
          ${t.error===null?w:I({title:M(`memoryPage.addons.changeFailed`,{plugin:t.label}),description:t.error,control:R({kind:`danger`,label:M(`common.failed`)})})}
          ${t.notice===null?w:I({title:M(`pluginsPage.needsAttention`),description:t.notice,control:R({kind:`warn`,label:M(`pluginsPage.needsAttention`)})})}
        `)}
      ${I({title:M(`memoryPage.addons.manage`),control:D`<a class="memory-page__link" href=${e.pluginsHref}
          >${M(`memoryPage.addons.manageLink`)}</a
        >`})}
    `)}function Fr(e){return D`
    <div class="settings-page">
      ${Ar(e)} ${Mr(e)} ${Pr(e)}
      <p class="settings-page__intro">${M(`memoryPage.search.intro`)}</p>
    </div>
    ${e.editor}
    <div class="settings-page">
      ${e.dreamingSettings}
      ${W({title:M(`memoryPage.import.title`),description:M(`memoryPage.import.description`)},I({title:M(`tabs.memoryImport`),description:M(`subtitles.memoryImport`),control:D`<a class="memory-page__link" href=${e.memoryImportHref}
            >${M(`memoryPage.import.link`)}</a
          >`}))}
    </div>
  `}function Ir(e){return D`
    <section class="memory-page">
      <section class="content-header content-header--page hub-page-header">
        <div class="hub-page-header__title">
          <div class="page-title">${M(`tabs.memory`)}</div>
          <div class="page-subtitle">
            ${M(`memoryPage.intro`)} ${V(zr,M(`common.learnMore`))}
          </div>
        </div>
        <div class="hub-page-header__tabs">
          ${Zt({id:`memory`,active:e.activeTab,tabs:[{value:`overview`,label:M(`memoryPage.tabs.overview`)},{value:`memories`,label:M(`memoryPage.tabs.memories`)},{value:`dreams`,label:M(`memoryPage.tabs.dreams`)},{value:`settings`,label:M(`memoryPage.tabs.settings`)}],ariaLabel:M(`memoryPage.tablistLabel`),panelId:Rr,onSelect:t=>e.onTabChange(t)})}
        </div>
        <div class="hub-page-header__actions">
          ${e.activeTab===`settings`?w:D`
                <div class="agent-scope-control">
                  <span class="agent-scope-control__label"
                    >${M(`memoryPage.dreaming.agentScope.rowTitle`)}</span
                  >
                  <openclaw-agent-select
                    .options=${e.agents}
                    .value=${e.agentId??``}
                    .accessibleLabel=${M(`memoryPage.dreaming.agentScope.rowTitle`)}
                    .onSelect=${t=>e.onAgentChange(t||null)}
                  ></openclaw-agent-select>
                </div>
              `}
        </div>
      </section>
      <div id=${Rr} class="memory-page__panel" role="tabpanel">
        ${e.activeTab===`overview`?e.overview:e.activeTab===`memories`?e.memories:e.activeTab===`dreams`?e.dreams:Fr(e)}
      </div>
    </section>
  `}var Lr,Rr,zr,Br,Vr,Hr=e((()=>{E(),Xt(),Qt(),U(),N(),fe(),Lr=[{id:`active-memory`,labelKey:`memoryPage.addons.activeMemory.title`},{id:`memory-wiki`,labelKey:`memoryPage.addons.memoryWiki.title`}],Rr=`memory-settings-panel`,zr=`https://docs.openclaw.ai/concepts/memory`,Br=``,Vr=`__invalid__`}));function Ur(e){return D`
    <openclaw-memory-settings
      .configObject=${e.configObject}
      .mutationDisabled=${e.mutationDisabled}
      .pluginsHref=${e.pluginsHref}
      .memoryImportHref=${e.memoryImportHref}
      .routeData=${e.routeData}
      .buildEditor=${e.buildEditor}
    ></openclaw-memory-settings>
  `}var Wr,Gr,Kr,J,qr=e((()=>{ke(),at(),it(),E(),T(),Qe(),tt(),nt(),U(),N(),p(),ve(),de(),St(),ye(),c(),m(),en(),Vn(),Kn(),Zn(),fr(),wr(),fe(),Hr(),t(),Wr=`none`,Gr=[`plugins`,`slots`,`memory`],Kr=`https://docs.openclaw.ai/concepts/dreaming`,J=class extends h{constructor(...e){super(...e),this.configObject={},this.mutationDisabled=!1,this.pluginsHref=``,this.memoryImportHref=``,this.routeData=null,this.buildEditor=()=>D``,this.catalog={kind:`unavailable`},this.engineBusy=!1,this.engineOutcome=null,this.addonBusy=new Set,this.addonErrors=new Map,this.addonNotices=new Map,this.addonRefreshWarnings=new Map,this.selectedAgentId=null,this.overviewStatus={kind:`idle`},this.probingEmbeddings=!1,this.support=`unknown`,this.connection=null,this.catalogRequest=0,this.overviewRequest=null,this.supportPluginId=null,this.supportProbe=null,this.addonNoticeOperations=new Map,this.normalizedLocation=``,this.subscriptions=new i(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.syncGateway(e.snapshot.client,e.snapshot.phase===`connected`)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t),e=>this.syncSupport(e)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),e=>{!e.state.agentsList&&!e.state.agentsLoading&&e.ensureList().catch(()=>void 0),this.loadOverviewStatus()})}disconnectedCallback(){this.subscriptions.clear(),this.connection=null,this.overviewRequest=null,this.probingEmbeddings=!1,this.catalog={kind:`unavailable`},this.supportPluginId=null,this.supportProbe=null,this.addonNoticeOperations.clear(),super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),this.syncCanonicalLocation()}updated(e){if(e.has(`routeData`)&&(this.activeTab(e.get(`routeData`)??null)!==this.activeTab()&&(this.overviewRequest=null,this.probingEmbeddings=!1,this.loadOverviewStatus()),this.syncCanonicalLocation()),e.has(`configObject`)){let t=e.get(`configObject`),n=t?y(S(t)):null,r=y(S(this.configObject));t&&n!==r&&(this.overviewRequest=null,this.probingEmbeddings=!1,this.loadOverviewStatus())}}activeTab(e=this.routeData){return ie(e??{},this.context?.basePath??``)??`overview`}syncCanonicalLocation(){let e=this.context,t=this.routeData;if(!e||!t)return;let n=_(t,e.basePath);if(!n){this.normalizedLocation=``;return}let r=`${t.pathname}${t.search}${t.hash}`;this.normalizedLocation!==r&&(this.normalizedLocation=r,e.replace(`memory`,n))}syncGateway(e,t){if(this.connection?.client===e&&this.connection.connected===t)return;let n={client:e,connected:t};if(this.connection=n,this.engineBusy=!1,this.engineOutcome=null,this.addonBusy=new Set,this.addonRefreshWarnings=new Map,this.overviewRequest=null,this.probingEmbeddings=!1,!e||!t){this.catalog={kind:`unavailable`},this.activeTab()===`overview`&&(this.overviewStatus={kind:`error`,message:M(`memoryPage.overview.hero.gatewayOffline`)});return}this.catalog={kind:`loading`},this.loadCatalog(e,n),this.reconcileAddonNotices(e,n),this.loadOverviewStatus()}async readProcessInstanceId(e){if(!xt(this.context.gateway.snapshot,`system.info`))return null;try{return(await e.request(`system.info`,{})).processInstanceId??null}catch{return null}}async reconcileAddonNotices(e,t){if(this.addonNotices.size===0)return;let n=await this.readProcessInstanceId(e);if(!n||!this.isConnected||this.connection!==t)return;let r=new Map;for(let[e,t]of this.addonNotices)t.processInstanceId===null?r.set(e,{...t,processInstanceId:n}):t.processInstanceId===n&&r.set(e,t);(r.size!==this.addonNotices.size||[...r].some(([e,t])=>this.addonNotices.get(e)!==t))&&(this.addonNotices=r)}async loadCatalog(e,t){let n=++this.catalogRequest;try{let r=await se(e);this.applyCatalog(t,n,{kind:`ready`,plugins:r.plugins,mutationAllowed:r.mutationAllowed})}catch{this.applyCatalog(t,n,{kind:`unavailable`})}}applyCatalog(e,t,n){!this.isConnected||this.connection!==e||this.catalogRequest!==t||(this.catalog=n)}resolveAgentId(){let e=this.context.agents.state.agentsList,t=a(e?.agents??[]);return this.selectedAgentId&&t.some(e=>e.id===this.selectedAgentId)?this.selectedAgentId:e?.defaultId??t[0]?.id??null}agentOptions(){return a(this.context.agents.state.agentsList?.agents??[]).map(e=>({value:e.id,label:s(e),agent:e}))}selectAgent(e){this.selectedAgentId!==e&&(this.selectedAgentId=e,this.overviewRequest=null,this.probingEmbeddings=!1,this.loadOverviewStatus())}async loadOverviewStatus(e={}){if(this.activeTab()!==`overview`)return;if(S(this.configObject).kind===`off`){this.overviewRequest=null,this.overviewStatus={kind:`idle`},this.probingEmbeddings=!1;return}let t=this.connection,n=t?.connected?t.client:null,r=this.resolveAgentId();if(!t||!n){this.overviewStatus={kind:`error`,message:M(`memoryPage.overview.hero.gatewayOffline`)},this.probingEmbeddings=!1;return}if(!r||!e.force&&this.overviewRequest?.connection===t&&this.overviewRequest.agentId===r)return;let i=e.probeEmbeddings===!0,a={connection:t,agentId:r,probeEmbeddings:i};this.overviewRequest=a,this.probingEmbeddings=i,i||(this.overviewStatus={kind:`loading`});try{let e=await n.request(`doctor.memory.status`,{agentId:r,...i?{probe:!0}:{}});if(!this.isConnected||this.overviewRequest!==a)return;this.overviewStatus={kind:`ready`,payload:e}}catch(e){if(!this.isConnected||this.overviewRequest!==a)return;this.overviewStatus={kind:`error`,message:st(e,{redact:ae})}}finally{this.overviewRequest===a&&(this.probingEmbeddings=!1)}}engineState(e){let t=y(e);return t===null?`unknown`:Er(this.catalog,Dr(this.catalog,t))}applyPluginRefreshOutcome(e,t,n){if(this.connection!==e)return;if(!t){this.addonRefreshWarnings=new Map,this.engineOutcome?.kind===`warning`&&(this.engineOutcome=null);return}let r=M(`pluginsPage.configRefreshFailed`,{error:t});n?this.addonRefreshWarnings=new Map(this.addonRefreshWarnings).set(n,r):this.engineOutcome={kind:`warning`,message:r}}async changeAddon(e,t){if(this.addonBusy.has(e)||this.mutationDisabled||this.catalog.kind!==`ready`||!this.catalog.mutationAllowed||!Ve(this.context.gateway.snapshot).canAdmin)return;let n=Dr(this.catalog,e),r=Er(this.catalog,n),i=this.connection,a=i?.connected?i.client:null;if(!i||!a||r!==`enabled`&&r!==`disabled`)return;let o={};this.addonNoticeOperations.set(e,o),this.addonBusy=new Set(this.addonBusy).add(e);let s=new Map(this.addonErrors);s.delete(e),this.addonErrors=s;let c=new Map(this.addonRefreshWarnings);c.delete(e),this.addonRefreshWarnings=c;try{let n=await ue(this.context.runtimeConfig,a,async n=>{let r=this.readProcessInstanceId(n);return{result:await le(n,e,t),processInstanceId:r}}),{result:r,processInstanceId:s}=n.value,c=t?`pluginsPage.enabledRestart`:`pluginsPage.disabledRestart`,l=`warnings`in r?r.warnings??[]:[],u=[r.restartRequired?M(c,{name:r.plugin.name}):null,...l].filter(Boolean).join(` `);if(this.addonNoticeOperations.get(e)===o){this.applyPluginRefreshOutcome(i,n.refreshError,e);let t=u?await s:null;if(this.addonNoticeOperations.get(e)===o){let n=new Map(this.addonNotices);if(u?n.set(e,{message:u,processInstanceId:t}):n.delete(e),this.addonNotices=n,u){let e=this.connection;e?.connected&&e.client&&this.reconcileAddonNotices(e.client,e)}}}let d=this.connection;d?.connected&&d.client&&await this.loadCatalog(d.client,d)}catch(t){this.connection===i&&(this.addonErrors=new Map(this.addonErrors).set(e,st(t,{redact:ae})))}finally{if(this.addonNoticeOperations.get(e)===o&&this.addonNoticeOperations.delete(e),this.connection===i){let t=new Set(this.addonBusy);t.delete(e),this.addonBusy=t}}}async changeEngine(e,t){if(this.engineBusy||this.mutationDisabled||this.catalog.kind===`ready`&&!this.catalog.mutationAllowed||e===y(t)&&(e===null||this.engineState(t)===`enabled`))return;if(this.engineOutcome=null,!e){this.context.runtimeConfig.patchForm(Gr,Wr);return}let n=this.connection,r=n?.connected?n.client:null;if(!(!n||!r)){this.engineBusy=!0;try{let t=await ue(this.context.runtimeConfig,r,t=>le(t,e,!0));this.applyPluginRefreshOutcome(n,t.refreshError);let i=this.connection;i?.connected&&i.client&&await this.loadCatalog(i.client,i)}catch(e){this.connection===n&&(this.engineOutcome={kind:`error`,message:st(e,{redact:ae})})}finally{this.connection===n&&(this.engineBusy=!1)}}}configObjectFromController(){return he(this.context.runtimeConfig.state)}dreamingPluginId(){return tn(this.configObjectFromController()).pluginId}dreamingConfig(){return j(j(j(j(j(this.configObjectFromController()?.plugins)?.entries)?.[this.dreamingPluginId()])?.config)?.dreaming)}syncSupport(e){let t=tn(he(e.state)).pluginId;t!==this.supportPluginId&&(this.supportPluginId=t,this.support=`unknown`);let n=e.state.connected;if(this.supportProbe&&(this.supportProbe.pluginId!==t||!n)&&(this.supportProbe=null),this.support!==`unknown`||this.supportProbe||!n)return;let r={pluginId:t};this.supportProbe=r,$t(e,t).then(e=>{this.supportProbe===r&&(this.supportProbe=null,this.isConnected&&(this.support=e))})}patchDreaming(e,t){if(this.mutationDisabled)return;let n=Yn(this.dreamingPluginId(),e);if(t===void 0){this.context.runtimeConfig.removeFormValue(n);return}this.context.runtimeConfig.patchForm(n,t)}renderDreamingControls(){let e=this.dreamingPluginId();return D`
      <p class="settings-page__intro">
        ${M(`memoryPage.dreaming.intro`,{plugin:e})}
        ${V(Kr,M(`common.learnMore`))}
      </p>
      ${this.support===`unsupported`?ar(e):ir({dreaming:this.dreamingConfig(),timezoneDefault:Xn(this.configObjectFromController()),disabled:this.mutationDisabled,onPatch:(e,t)=>this.patchDreaming(e,t)})}
    `}navigateTab(e){this.context.navigate(`memory`,{pathname:qe(e,this.context.basePath)})}render(){let e=this.context.runtimeConfig,t=S(this.configObject),n=this.mutationDisabled||this.catalog.kind===`ready`&&!this.catalog.mutationAllowed,r=pe(this.configObject),i=this.activeTab(),a=this.resolveAgentId();return Ir({activeTab:i,onTabChange:e=>this.navigateTab(e),engineOptions:Tr(this.catalog,t),engineSelection:t,engineState:this.engineState(t),engineBusy:this.engineBusy||n,engineOutcome:this.engineOutcome,onEngineChange:e=>void this.changeEngine(e,t),onEngineReset:()=>{qn(e,this.engineBusy||n)&&(this.engineOutcome=null)},backendSelection:r,backendBusy:this.mutationDisabled,onBackendChange:t=>{this.mutationDisabled||e.patchForm([`memory`,`backend`],t)},onBackendReset:()=>Jn(e,this.mutationDisabled),addons:Or(this.catalog,{busy:this.addonBusy,errors:this.addonErrors,notices:this.addonNotices,refreshWarnings:this.addonRefreshWarnings}),canToggleAddons:this.catalog.kind===`ready`&&this.catalog.mutationAllowed&&!this.mutationDisabled&&Ve(this.context.gateway.snapshot).canAdmin,onAddonChange:(e,t)=>void this.changeAddon(e,t),pluginsHref:this.pluginsHref,memoryImportHref:this.memoryImportHref,agentId:a,agents:this.agentOptions(),onAgentChange:e=>this.selectAgent(e),overview:Cr({agentId:a,engineSelection:t,engineDisabled:this.engineState(t)===`disabled`,status:this.overviewStatus,probingEmbeddings:this.probingEmbeddings,onRefresh:()=>void this.loadOverviewStatus({force:!0}),onProbeEmbeddings:()=>void this.loadOverviewStatus({force:!0,probeEmbeddings:!0}),onNavigate:e=>this.navigateTab(e)}),memories:D`
        <openclaw-memory-memories
          .client=${this.context.gateway.snapshot.client}
          .connected=${this.context.gateway.snapshot.phase===`connected`}
          .methodAdvertised=${xt(this.context.gateway.snapshot,`memory.search`)===!0}
          .agentId=${a}
        ></openclaw-memory-memories>
      `,dreams:D` <openclaw-memory-dreaming .agentId=${a}></openclaw-memory-dreaming> `,editor:i===`settings`?this.buildEditor(_e(`settings`,r?.backend??null)):D``,dreamingSettings:i===`settings`?this.renderDreamingControls():D``})}},n([Ee({context:Ue,subscribe:!0})],J.prototype,`context`,void 0),n([O({attribute:!1})],J.prototype,`configObject`,void 0),n([O({type:Boolean})],J.prototype,`mutationDisabled`,void 0),n([O()],J.prototype,`pluginsHref`,void 0),n([O()],J.prototype,`memoryImportHref`,void 0),n([O({attribute:!1})],J.prototype,`routeData`,void 0),n([O({attribute:!1})],J.prototype,`buildEditor`,void 0),n([k()],J.prototype,`catalog`,void 0),n([k()],J.prototype,`engineBusy`,void 0),n([k()],J.prototype,`engineOutcome`,void 0),n([k()],J.prototype,`addonBusy`,void 0),n([k()],J.prototype,`addonErrors`,void 0),n([k()],J.prototype,`addonNotices`,void 0),n([k()],J.prototype,`addonRefreshWarnings`,void 0),n([k()],J.prototype,`selectedAgentId`,void 0),n([k()],J.prototype,`overviewStatus`,void 0),n([k()],J.prototype,`probingEmbeddings`,void 0),n([k()],J.prototype,`support`,void 0),customElements.get(`openclaw-memory-settings`)||customElements.define(`openclaw-memory-settings`,J)}));function Jr(e){let{gatewayAuth:t,execPolicy:n,deviceAuth:r,browserEnabled:i,browserEnabledOverridden:a,toolProfile:o,toolProfileOverridden:s}=e.security,c=o.trim()||`full`,l=H({value:M(`common.enabled`),overridden:a,disabled:e.configBusy,onReset:()=>e.onBrowserEnabledReset?.()}),d=H({value:M(`agents.toolCatalog.profiles.full`),overridden:s,disabled:e.configBusy,onReset:()=>e.onToolProfileReset?.()}),f=u.map(e=>({value:e.id,label:M(e.labelKey)}));return f.some(e=>e.value===c)||f.push({value:c,label:c}),W({title:M(`quickSettings.security.title`)},[I({title:M(`quickSettings.security.gatewayAuth`),control:R({kind:t===`none`?`warn`:t===`unknown`?`muted`:`ok`,label:t})}),I({title:M(`quickSettings.security.execPolicy`),control:z(n)}),B({title:M(`quickSettings.security.browserEnabled`),description:l.description,checked:i,disabled:e.configBusy,actions:l.action,onChange:t=>e.onBrowserEnabledToggle?.(t)}),I({title:M(`quickSettings.security.toolProfile`),description:d.description,stacked:!0,control:D`
        ${d.action}
        ${L({value:c,options:f,disabled:e.configBusy,onChange:t=>e.onToolProfileChange?.(t)})}
      `}),I({title:M(`quickSettings.security.deviceAuth`),control:R({kind:r?`ok`:`warn`,label:M(r?`common.enabled`:`common.disabled`)})}),I({title:M(`nodes.pairing.title`),control:D`
        <button
          class="btn"
          title=${e.canPairDevice?``:M(`nodes.pairing.adminRequired`)}
          ?disabled=${!e.canPairDevice}
          @click=${e.onPairMobile}
        >
          ${P.smartphone} ${M(`nodes.pairing.button`)}
        </button>
      `})])}function Yr(e){return D`
    <section class="security-page">
      <div class="settings-page">
        <p class="settings-page__intro">
          ${M(`quickSettings.security.intro`)}
          ${V(Xr,M(`common.learnMore`))}
        </p>
        ${Jr(e)}
      </div>
      ${e.editor}
    </section>
  `}var Xr,Zr=e((()=>{E(),F(),U(),N(),p(),Xr=`https://docs.openclaw.ai/gateway/security`}));function Qr(e){return{gateway:{controlUi:{sessionObserver:e?null:!1}}}}function $r(e){return{agents:{defaults:{utilityModel:e.kind===`auto`?null:e.kind===`disabled`?``:e.model}}}}function ei(e){return!e||e.status===`unavailable`?M(`configView.sessionObserver.modelUnavailable`):e.status===`disabled`?M(`configView.sessionObserver.modelDisabled`):M(e.status===`auto`?`configView.sessionObserver.modelAuto`:`configView.sessionObserver.modelConfigured`,{model:e.model})}function ti(e){let t=new Set;return e.filter(e=>e.available!==!1).map(e=>({value:e.id.startsWith(`${e.provider}/`)?e.id:`${e.provider}/${e.id}`,label:e.name||e.id})).filter(e=>t.has(e.value)?!1:(t.add(e.value),!0)).toSorted((e,t)=>e.label.localeCompare(t.label))}function ni(e){let t=e.utilityModel===void 0?ri:e.utilityModel,n=ti(e.models),r=n.some(e=>e.value===t);return D`
    <div class="settings-group">
      ${B({title:M(`configView.sessionObserver.toggle`),description:M(`configView.sessionObserver.toggleHint`),checked:e.enabled,disabled:e.disabled,onChange:e.onEnabledChange})}
      ${I({title:M(`configView.sessionObserver.resolvedModel`),description:ei(e.resolvedUtilityModel)})}
      ${I({title:M(`configView.sessionObserver.modelPicker`),description:e.modelsUnavailable?M(`configView.sessionObserver.modelCatalogUnavailable`):M(`configView.sessionObserver.modelPickerHint`),control:D`
          <select
            class="settings-select"
            aria-label=${M(`configView.sessionObserver.modelPicker`)}
            .value=${t}
            ?disabled=${e.disabled}
            @change=${t=>{let n=t.currentTarget.value;e.onUtilityModelChange(n===ri?{kind:`auto`}:n===``?{kind:`disabled`}:{kind:`model`,model:n})}}
          >
            <option value=${ri}>${M(`configView.sessionObserver.auto`)}</option>
            <option value="">${M(`configView.sessionObserver.disabled`)}</option>
            ${t!==ri&&t!==``&&!r?D`<option value=${t} ?disabled=${e.modelsUnavailable}>
                  ${t}
                </option>`:w}
            ${n.map(t=>D`<option value=${t.value} ?disabled=${e.modelsUnavailable}>
                ${t.label}
              </option>`)}
          </select>
        `})}
    </div>
  `}var ri,ii=e((()=>{E(),U(),N(),ri=`__openclaw_observer_auto__`}));function ai(e){return e&&typeof e==`object`&&!Array.isArray(e)?e:void 0}function Y(e){return typeof e==`string`&&e.trim()||null}function oi(e){let t=ai(ai(e.talk)?.realtime),n=ai(t?.providers)??{},r={};for(let[e,t]of Object.entries(n)){let n=ai(t);n&&(r[e]={model:Y(n.model),speakerVoice:Y(n.speakerVoice)??Y(n.voice)})}return{provider:Y(t?.provider),model:Y(t?.model),speakerVoice:Y(t?.speakerVoice)??Y(t?.speakerVoiceId),transport:Y(t?.transport),providerEntries:r}}function si(e){return e!==null&&e.toLowerCase().startsWith(`gpt-live`)}var ci=e((()=>{}));function li(e,t){if(t)return e.find(e=>e.id===t||e.aliases.includes(t))}function ui(e,t){if(e.kind===`ready`)return t.provider?li(e.providers,t.provider):li(e.providers,e.activeProvider)}function di(e,t){let n=[e.provider,t?.id,...t?.aliases??[]],r=[];for(let t of n)t&&t in e.providerEntries&&!r.includes(t)&&r.push(t);return r}function fi(e,t){let n=e.model,r=e.speakerVoice;for(let i of di(e,t)){let t=e.providerEntries[i];n??=t?.model??null,r??=t?.speakerVoice??null}return{model:n,speakerVoice:r}}function pi(e){return I({title:e.title,description:e.description,control:D`
      <select
        class="settings-select"
        aria-label=${e.title}
        ?disabled=${e.disabled}
        .value=${e.value}
        @change=${t=>e.onChange(t.currentTarget.value)}
      >
        ${e.options.map(t=>D`
            <option value=${t.value} ?selected=${e.value===t.value}>
              ${t.label}
            </option>
          `)}
      </select>
    `})}function mi(e){let t=e.catalog;return t.kind===`loading`?I({title:M(`talkPage.status.title`),control:R({kind:`muted`,label:M(`common.loading`)})}):t.kind===`unavailable`?I({title:M(`talkPage.status.title`),description:M(`talkPage.status.unavailableHint`),control:R({kind:`muted`,label:M(`talkPage.status.unavailable`)})}):I({title:M(`talkPage.status.title`),description:t.activeProvider?M(`talkPage.status.activeProvider`,{provider:t.activeProvider}):M(`talkPage.status.noProvider`),control:t.ready?R({kind:`ok`,label:M(`talkPage.status.ready`)}):R({kind:`warn`,label:M(`talkPage.status.notReady`)})})}function hi(e){if(e.catalog.kind!==`ready`||e.catalog.providers.length===0)return I({title:M(`talkPage.provider.title`),description:M(`talkPage.provider.description`),control:z(e.selection.provider??M(`talkPage.provider.auto`),{mono:!0})});let t=li(e.catalog.providers,e.selection.provider),n=e.selection.provider&&!t?e.selection.provider:null;return I({title:M(`talkPage.provider.title`),description:M(`talkPage.provider.description`),stacked:!0,control:L({value:t?.id??n??X,options:[...e.catalog.providers.map(e=>({value:e.id,label:e.label})),...n?[{value:n,label:n}]:[],{value:X,label:M(`talkPage.provider.auto`)}],disabled:e.configBusy,ariaLabel:M(`talkPage.provider.title`),onChange:t=>e.onProviderChange(t||null)})})}function gi(e){let t=ui(e.catalog,e.selection),{model:n}=fi(e.selection,t);if(!t)return I({title:M(`talkPage.model.title`),description:M(`talkPage.model.description`),control:z(n??M(`talkPage.model.default`),{mono:!0})});let r=t.models.length?t.models:t.defaultModel?[t.defaultModel]:[],i=[{value:X,label:t.defaultModel?M(`talkPage.model.defaultNamed`,{model:t.defaultModel}):M(`talkPage.model.default`)},...r.map(e=>({value:e,label:e})),...n&&!r.includes(n)?[{value:n,label:n}]:[]];return pi({title:M(`talkPage.model.title`),description:M(`talkPage.model.description`),value:n??X,options:i,disabled:e.configBusy,onChange:t=>e.onModelChange(t||null)})}function _i(e){let t=ui(e.catalog,e.selection),{speakerVoice:n}=fi(e.selection,t);if(!t||t.voices.length===0)return I({title:M(`talkPage.voice.title`),description:M(`talkPage.voice.description`),control:z(n??M(`talkPage.voice.default`),{mono:!0})});let r=[{value:X,label:M(`talkPage.voice.default`)},...t.voices.map(e=>({value:e,label:e})),...n&&!t.voices.includes(n)?[{value:n,label:n}]:[]];return pi({title:M(`talkPage.voice.title`),description:M(`talkPage.voice.description`),value:n??X,options:r,disabled:e.configBusy,onChange:t=>e.onVoiceChange(t||null)})}function vi(e){let t=ui(e.catalog,e.selection),{model:n}=fi(e.selection,t);return t?.id!==`openai`||!si(n)?w:I({title:M(`talkPage.gptLive.title`),description:M(`talkPage.gptLive.hint`),control:t.configured?R({kind:`ok`,label:M(`talkPage.gptLive.ready`)}):R({kind:`warn`,label:M(`talkPage.status.notReady`)})})}function yi(e){return D`
    <section class="talk-page">
      <div class="settings-page">
        <p class="settings-page__intro">
          ${M(`talkPage.intro`)} ${V(bi,M(`common.learnMore`))}
        </p>
        ${W({title:M(`talkPage.voiceSection.title`),description:M(`talkPage.voiceSection.description`)},D`
            ${mi(e)} ${hi(e)} ${gi(e)}
            ${_i(e)} ${vi(e)}
          `)}
      </div>
      ${e.editor}
    </section>
  `}var X,bi,xi=e((()=>{E(),U(),N(),ci(),X=``,bi=`https://docs.openclaw.ai/nodes/talk`}));function Si(e){return{id:e.id,label:e.label,configured:e.configured,aliases:e.aliases??[],models:e.models??[],voices:e.voices??[],transports:e.transports??[],defaultModel:e.defaultModel??null}}function Ci(e){return D`
    <openclaw-talk-settings
      .configObject=${e.configObject}
      .mutationDisabled=${e.mutationDisabled}
      .buildEditor=${e.buildEditor}
    ></openclaw-talk-settings>
  `}var wi,Z,Ti=e((()=>{ke(),E(),T(),tt(),c(),m(),ci(),xi(),t(),wi=new Set([`webrtc`,`provider-websocket`]),Z=class extends h{constructor(...e){super(...e),this.configObject={},this.mutationDisabled=!1,this.buildEditor=()=>D``,this.catalog={kind:`unavailable`},this.connection=null,this.catalogRequestId=0,this.subscriptions=new i(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.syncCatalog(e.snapshot.client,e.snapshot.phase===`connected`)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t),e=>this.refreshCatalogOnConfigChange(e.state)),this.refreshOnFocus=()=>{let e=this.connection;e?.client&&e.connected&&this.loadCatalog(e.client,e)}}connectedCallback(){super.connectedCallback(),window.addEventListener(`focus`,this.refreshOnFocus)}disconnectedCallback(){window.removeEventListener(`focus`,this.refreshOnFocus),this.subscriptions.clear(),this.connection=null,this.catalog={kind:`unavailable`},super.disconnectedCallback()}syncCatalog(e,t){if(this.connection?.client===e&&this.connection.connected===t)return;let n={client:e,connected:t};if(this.connection=n,!e||!t){this.catalog={kind:`unavailable`};return}this.catalog={kind:`loading`},this.loadCatalog(e,n)}async loadCatalog(e,t){let n=++this.catalogRequestId;try{let r=await e.request(`talk.catalog`,{});this.applyCatalog(t,n,{kind:`ready`,ready:r.realtime.ready===!0,activeProvider:r.realtime.activeProvider??null,providers:r.realtime.providers.map(Si)})}catch{this.applyCatalog(t,n,{kind:`unavailable`})}}applyCatalog(e,t,n){!this.isConnected||this.connection!==e||this.catalogRequestId!==t||(this.catalog=n)}refreshCatalogOnConfigChange(e){let t=e.configSnapshot?.hash??null;if(this.lastCatalogConfigHash===void 0){this.lastCatalogConfigHash=t;return}if(t===null||t===this.lastCatalogConfigHash)return;this.lastCatalogConfigHash=t;let n=this.connection;n?.client&&n.connected&&this.loadCatalog(n.client,n)}changeModel(e){if(this.mutationDisabled)return;let t=this.context.runtimeConfig;if(e!==null){t.patchForm([`talk`,`realtime`,`model`],e);let n=this.liveSelection().transport;si(e)&&n&&n!==`webrtc`&&t.removeFormValue([`talk`,`realtime`,`transport`]);return}t.removeFormValue([`talk`,`realtime`,`model`]);for(let e of this.selectedProviderConfigKeys())t.removeFormValue([`talk`,`realtime`,`providers`,e,`model`])}changeVoice(e){if(this.mutationDisabled)return;let t=this.context.runtimeConfig;if(e!==null){t.patchForm([`talk`,`realtime`,`speakerVoice`],e);return}t.removeFormValue([`talk`,`realtime`,`speakerVoice`]),t.removeFormValue([`talk`,`realtime`,`speakerVoiceId`]);for(let e of this.selectedProviderConfigKeys())t.removeFormValue([`talk`,`realtime`,`providers`,e,`speakerVoice`]),t.removeFormValue([`talk`,`realtime`,`providers`,e,`voice`])}selectedProviderConfigKeys(){let e=this.liveSelection();return di(e,ui(this.catalog,e))}liveSelection(){let e=this.context.runtimeConfig.state.configForm;return oi(e&&typeof e==`object`?e:this.configObject)}changeProvider(e){if(this.mutationDisabled)return;let t=this.context.runtimeConfig;for(let e of[`model`,`speakerVoice`,`speakerVoiceId`])t.removeFormValue([`talk`,`realtime`,e]);if(e===null){t.removeFormValue([`talk`,`realtime`,`provider`]);return}t.removeFormValue([`talk`,`realtime`,`transport`]),t.patchForm([`talk`,`realtime`,`provider`],e);let n=this.catalog.kind===`ready`?this.catalog.providers.find(t=>t.id===e):void 0;n!==void 0&&n.transports.length>0&&!n.transports.some(e=>wi.has(e))&&t.patchForm([`talk`,`realtime`,`transport`],`gateway-relay`)}render(){let e=this.context.runtimeConfig.state;return yi({selection:oi(this.configObject),catalog:this.catalog,configBusy:this.mutationDisabled||e.configLoading||e.configSaving||e.configApplying,onProviderChange:e=>this.changeProvider(e),onModelChange:e=>this.changeModel(e),onVoiceChange:e=>this.changeVoice(e),editor:this.buildEditor()})}},n([Ee({context:Ue,subscribe:!0})],Z.prototype,`context`,void 0),n([O({attribute:!1})],Z.prototype,`configObject`,void 0),n([O({type:Boolean})],Z.prototype,`mutationDisabled`,void 0),n([O({attribute:!1})],Z.prototype,`buildEditor`,void 0),n([k()],Z.prototype,`catalog`,void 0),customElements.get(`openclaw-talk-settings`)||customElements.define(`openclaw-talk-settings`,Z)}));function Ei(e){return D`${e} ${V(ki,M(`common.learnMore`))}`}function Di(e){switch(e){case`granted`:return{kind:`ok`,label:M(`configView.notifications.granted`)};case`denied`:return{kind:`danger`,label:M(`configView.notifications.denied`)};case`notDetermined`:return{kind:`accent`,label:M(`configView.notifications.notRequested`)};default:return{kind:`muted`,label:M(`configView.notifications.checking`)}}}function Oi(e){let t=e.nativeNotifications;if(t){let n=Di(t.permission),r=t.permission===`notDetermined`?D`
            <button
              class="btn primary"
              @click=${()=>e.onNativeNotificationsRequestPermission?.()}
            >
              ${M(`configView.notifications.enable`)}
            </button>
          `:t.permission===`denied`?D`
              <button class="btn" @click=${()=>e.onNativeNotificationsRequestPermission?.()}>
                ${M(`configView.notifications.openSystemSettings`)}
              </button>
            `:t.permission===`granted`?D`
                <button class="btn primary" @click=${()=>e.onNativeNotificationsSendTest?.()}>
                  ${P.send} ${M(`configView.notifications.sendTest`)}
                </button>
              `:w;return D`
      <div class="settings-page">
        <section class="settings-section" id=${v.notifications}>
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${M(`configView.notifications.nativeTitle`)}</h2>
            <div class="settings-section__actions">${R(n)}</div>
          </div>
          <p class="settings-section__desc">
            ${Ei(M(`configView.notifications.nativeHint`))}
          </p>
          <div class="settings-group">
            ${I({title:M(`configView.notifications.permission`),control:z(n.label)})}
            ${r===w?w:D`
                  <div class="settings-row">
                    <div class="settings-row__control">${r}</div>
                  </div>
                `}
            ${t.permission===`denied`?I({title:M(`configView.notifications.blocked`),description:M(`configView.notifications.nativeBlockedHint`),control:R({kind:`danger`,label:M(`configView.notifications.denied`)})}):w}
          </div>
        </section>
      </div>
    `}let n=e.webPush;if(!n)return D`
      <div class="settings-page">
        <section class="settings-section" id=${v.notifications}>
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${M(`configView.notifications.title`)}</h2>
            <div class="settings-section__actions">
              ${R({kind:`muted`,label:M(`configView.notifications.unavailable`)})}
            </div>
          </div>
          <p class="settings-section__desc">
            ${Ei(M(`configView.notifications.unavailableHint`))}
          </p>
          <div class="settings-group">
            <div class="settings-row">
              <div class="settings-row__text">
                <span class="settings-row__desc">
                  ${M(`configView.notifications.unavailableHint`)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;let r=n.permission===`granted`?M(`configView.notifications.granted`):n.permission===`denied`?M(`configView.notifications.denied`):n.permission==="default"?M(`configView.notifications.notRequested`):M(`configView.notifications.unsupported`),i=n.subscribed?M(`configView.notifications.subscribed`):M(`configView.notifications.notSubscribed`),a=n.supported?n.permission===`denied`?M(`configView.notifications.blocked`):n.subscribed?M(`configView.notifications.subscribed`):M(`configView.notifications.ready`):M(`configView.notifications.unsupported`),o=n.supported?n.permission===`denied`?`danger`:n.subscribed?`ok`:`accent`:`muted`,s=n.supported&&n.permission!==`denied`?n.subscribed?D`
            <button
              class="btn"
              ?disabled=${n.loading||!e.connected}
              @click=${()=>e.onWebPushUnsubscribe?.()}
            >
              ${P.x} ${M(`configView.notifications.unsubscribe`)}
            </button>
            <button
              class="btn primary"
              ?disabled=${n.loading||!e.connected}
              @click=${()=>e.onWebPushTest?.()}
            >
              ${P.send} ${M(`configView.notifications.sendTest`)}
            </button>
          `:D`
            <button
              class="btn primary"
              ?disabled=${n.loading||!e.connected}
              @click=${()=>e.onWebPushSubscribe?.()}
            >
              ${n.loading?P.loader:w}
              ${n.loading?M(`configView.notifications.subscribing`):M(`configView.notifications.enable`)}
            </button>
          `:w;return D`
    <div class="settings-page">
      <section class="settings-section" id=${v.notifications}>
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${M(`configView.notifications.title`)}</h2>
          <div class="settings-section__actions">
            ${R({kind:o,label:a})}
          </div>
        </div>
        <p class="settings-section__desc">
          ${Ei(M(`configView.notifications.hint`))}
        </p>
        <div class="settings-group">
          ${I({title:M(`configView.notifications.browserSupport`),control:z(n.supported?M(`configView.notifications.available`):M(`configView.notifications.notSupported`))})}
          ${I({title:M(`configView.notifications.permission`),control:z(r)})}
          ${I({title:M(`configView.notifications.status`),control:R({kind:n.subscribed?`ok`:`muted`,label:i})})}
          ${s===w?w:D`
                <div class="settings-row">
                  <div class="settings-row__control">${s}</div>
                </div>
              `}
          ${n.permission===`denied`?I({title:M(`configView.notifications.blocked`),description:M(`configView.notifications.blockedHint`),control:R({kind:`danger`,label:M(`configView.notifications.denied`)})}):w}
          ${n.error?D`
                <div class="settings-row">
                  <div class="settings-row__text">
                    <span class="cfg-field__error">${n.error}</span>
                  </div>
                </div>
              `:w}
        </div>
      </section>
    </div>
  `}var ki,Ai=e((()=>{E(),F(),U(),N(),re(),ki=`https://docs.openclaw.ai/web/notifications`}));function ji(e){return M(`languages.${e.replace(/-([a-zA-Z])/g,(e,t)=>t.toUpperCase())}`)}function Mi(e,t,n){let r=e??`system`,i=`${M(`common.system`)} (${ji(t)})`;return D`
    <wa-select
      class="settings-select"
      .value=${r}
      @change=${e=>{let t=e.currentTarget.value;n(t===`system`?void 0:t)}}
    >
      <span slot="label" class="settings-control__sr-label">${M(`quickSettings.language`)}</span>
      <wa-option value="system" .label=${i} .selected=${r===`system`}>
        ${i}
      </wa-option>
      ${pt.map(e=>{let t=ji(e);return D`
          <wa-option value=${e} .label=${t} .selected=${e===r}>
            ${t}
          </wa-option>
        `})}
    </wa-select>
  `}var Ni=e((()=>{E(),kn(),N()}));function Pi(e){return I({title:e.title,description:e.description,control:D`
      ${e.actions??w}
      <select
        class="settings-select"
        ?data-settings-send-shortcut=${e.setting===`send-shortcut`}
        ?data-settings-follow-up-mode=${e.setting===`follow-up-mode`}
        ?data-settings-catalog-open-target=${e.setting===`catalog-open-target`}
        aria-label=${e.title}
        .value=${e.value}
        @change=${t=>e.onChange(t.currentTarget.value)}
      >
        ${e.options.map(t=>D`
            <option value=${t.value} ?selected=${e.value===t.value}>
              ${t.label}
            </option>
          `)}
      </select>
    `})}var Fi=e((()=>{E(),U()}));function Ii(e){return M(e===`device-local`?`quickSettings.personal.browserOnly`:e===`pending`?`configView.syncPendingHint`:`configView.syncedHint`)}function Li(e){let t=H({value:e.localeResetValue?ji(e.localeResetValue):M(`common.system`),overridden:e.localeOverridden,onReset:e.resetLocale}),n=Ii(e.localeProvenance);return D`
    <section id=${b.language} class="settings-section">
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${M(`quickSettings.language`)}</h2>
      </div>
      <div class="settings-group">
        ${I({title:M(`quickSettings.language`),description:D`${t.description} ${n}`,control:D`
            ${t.action}
            ${Mi(e.localeOverride,e.systemLocale,e.onLocaleChange)}
          `})}
      </div>
    </section>
  `}function Ri(e){let t=e.state;if(!t||!e.onSelect)return w;let n=t.selectedDeviceId.trim(),r=t.devices.some(e=>e.deviceId===n),i=[{label:e.systemDefaultLabel,value:``},...t.devices.map(e=>({label:e.label,value:e.deviceId})),...n&&!r?[{label:e.fallbackLabel(t.devices.length+1),value:n}]:[]],a=`${M(`common.refresh`)}: ${e.title}`,o=!1,s=()=>{o||!t.permissionRequired||(o=!0,e.onRefresh?.())},c=e=>{e.button===0&&s()},l=e=>{[`Enter`,` `,`ArrowDown`,`ArrowUp`,`F4`].includes(e.key)&&s()},u=t.error?D`<span role="alert">${t.error}</span>`:!t.loading&&t.devices.length===0?e.emptyLabel:void 0;return I({title:e.title,description:D`${u?D`${u}<br />`:w}${M(`quickSettings.personal.browserOnly`)}`,control:D`
      <select
        class="settings-select settings-select--media-device"
        data-settings-microphone=${e.dataAttribute===`microphone`?``:w}
        data-settings-camera=${e.dataAttribute===`camera`?``:w}
        aria-label=${e.title}
        .value=${n}
        @pointerdown=${c}
        @keydown=${l}
        @change=${t=>e.onSelect?.(t.currentTarget.value)}
      >
        ${i.map(e=>D`
            <option value=${e.value} ?selected=${e.value===n}>
              ${e.label}
            </option>
          `)}
      </select>
      <button
        type="button"
        class="btn btn--sm btn--icon"
        aria-label=${a}
        ?disabled=${t.loading}
        @click=${()=>e.onRefresh?.()}
      >
        ${t.loading?P.loader:P.refresh}
      </button>
    `})}function zi(e){return Ri({state:e.microphone,title:M(`chat.composer.microphoneInput`),systemDefaultLabel:M(`chat.composer.systemDefaultMicrophone`),emptyLabel:M(`chat.composer.noMicrophones`),fallbackLabel:e=>M(`chat.composer.microphoneFallback`,{number:String(e)}),dataAttribute:`microphone`,onRefresh:e.onMicrophoneRefresh,onSelect:e.onMicrophoneSelect})}function Bi(e){return Ri({state:e.camera,title:M(`chat.composer.cameraInput`),systemDefaultLabel:M(`chat.composer.systemDefaultCamera`),emptyLabel:M(`chat.composer.noCameras`),fallbackLabel:e=>M(`chat.composer.cameraFallback`,{number:String(e)}),dataAttribute:`camera`,onRefresh:e.onCameraRefresh,onSelect:e.onCameraSelect})}function Vi(e,t){let n=e.chatFollowUpMode??`server`,r=e.serverQueueMode??M(`chat.followUpModeLoading`),i=e.chatFollowUpMode?M(`chat.followUpModeOverriding`,{mode:r}):M(`chat.followUpModeUsingServer`,{mode:r}),a=H({value:A.chatMessageMaxWidth,overridden:e.chatMessageMaxWidth!==void 0,onReset:()=>e.setChatMessageMaxWidth(void 0)}),o=H({value:e.chatSendShortcutResetValue===`modifier-enter`?M(`chat.sendShortcutModifierEnter`):M(`chat.sendShortcutEnter`),overridden:e.chatSendShortcutOverridden,onReset:e.resetChatSendShortcut}),s=Ii(e.chatSendShortcutProvenance),c=Ii(e.chatFollowUpModeProvenance),l=H({value:M(`chat.catalogOpenTargetViewer`),overridden:e.catalogOpenTarget!==A.catalogOpenTarget,onReset:()=>e.setCatalogOpenTarget(A.catalogOpenTarget)}),u=H({value:M(`common.enabled`),overridden:(e.composerHoldToRecord??A.composerHoldToRecord)!==A.composerHoldToRecord,onReset:()=>e.setComposerHoldToRecord?.(A.composerHoldToRecord)});return D`
    <section id=${b.chat} class="settings-section">
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${M(`configView.chatPrefs.title`)}</h2>
      </div>
      <div class="settings-group">
        ${I({title:M(`configView.chatPrefs.messageWidth`),description:D`${M(`configView.chatPrefs.messageWidthHint`)}<br />
            ${a.description} ${M(`quickSettings.personal.browserOnly`)}`,control:D` ${a.action} ${t} `})}
        ${Pi({title:M(`chat.sendShortcut`),value:e.chatSendShortcut,setting:`send-shortcut`,description:D`${o.description} ${s}`,actions:o.action,options:[{value:`enter`,label:M(`chat.sendShortcutEnter`)},{value:`modifier-enter`,label:M(`chat.sendShortcutModifierEnter`)}],onChange:t=>e.setChatSendShortcut(Me(t))})}
        ${I({title:M(`chat.followUpMode`),description:D`${i} ${c}`,control:D`
            <select
              class="settings-select"
              data-settings-follow-up-mode
              aria-label=${M(`chat.followUpMode`)}
              .value=${n}
              @change=${t=>{let n=t.currentTarget.value;e.setChatFollowUpMode(n===`server`?void 0:Le(n))}}
            >
              <option value="server" ?selected=${n===`server`}>
                ${M(`chat.followUpModeServer`,{mode:r})}
              </option>
              <option value="steer" ?selected=${n===`steer`}>
                ${M(`chat.followUpModeSteer`)}
              </option>
              <option value="queue" ?selected=${n===`queue`}>
                ${M(`chat.followUpModeQueue`)}
              </option>
            </select>
            ${e.chatFollowUpModeOverridden?D`<button
                  type="button"
                  class="btn btn--sm"
                  @click=${e.resetChatFollowUpMode}
                >
                  ${M(`chat.followUpModeReset`)}
                </button>`:w}
          `})}
        ${Pi({title:M(`chat.catalogOpenTarget`),value:e.catalogOpenTarget,setting:`catalog-open-target`,description:D`${l.description}
          ${M(`quickSettings.personal.browserOnly`)}`,actions:l.action,options:[{value:`viewer`,label:M(`chat.catalogOpenTargetViewer`)},{value:`terminal`,label:M(`chat.catalogOpenTargetTerminal`)}],onChange:t=>e.setCatalogOpenTarget(Je(t))})}
        ${zi(e)} ${Bi(e)}
        ${e.setComposerHoldToRecord?B({title:M(`chat.composer.holdToRecordSetting`),description:D`${M(`chat.composer.holdToRecordSettingDescription`)}<br />
                ${u.description} ${M(`quickSettings.personal.browserOnly`)}`,checked:e.composerHoldToRecord??A.composerHoldToRecord,onChange:e.setComposerHoldToRecord,actions:u.action}):w}
      </div>
    </section>
  `}function Hi(e){if(!e.setLobsterPetVisits||!e.setLobsterPetSounds)return w;let t=e.lobsterPetVisits??A.lobsterPetVisits,n=e.lobsterPetSounds??A.lobsterPetSounds,r=H({value:M(`common.enabled`),overridden:t!==A.lobsterPetVisits,onReset:()=>e.setLobsterPetVisits?.(A.lobsterPetVisits)}),i=H({value:M(`common.disabled`),overridden:n!==A.lobsterPetSounds,onReset:()=>e.setLobsterPetSounds?.(A.lobsterPetSounds)}),a=Lt(),o=Nt.filter(e=>a.has(e.id)).length;return D`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${M(`quickSettings.appearance.lobsterdex`)}</h2>
      </div>
      <div class="settings-group">
        ${B({title:M(`quickSettings.appearance.lobsterVisits`),description:t?D`${M(`quickSettings.appearance.lobsterVisitsOn`)}<br />
                ${r.description} ${M(`quickSettings.personal.browserOnly`)}`:D`${M(`quickSettings.appearance.lobsterVisitsOff`)}<br />
                ${r.description} ${M(`quickSettings.personal.browserOnly`)}`,checked:t,onChange:t=>e.setLobsterPetVisits?.(t),actions:r.action})}
        ${B({title:M(`quickSettings.appearance.lobsterSounds`),description:n?D`${M(`quickSettings.appearance.lobsterSoundsOn`)}<br />
                ${i.description} ${M(`quickSettings.personal.browserOnly`)}`:D`${M(`quickSettings.appearance.lobsterSoundsOff`)}<br />
                ${i.description} ${M(`quickSettings.personal.browserOnly`)}`,checked:n,onChange:t=>e.setLobsterPetSounds?.(t),actions:i.action,onAct:e=>{e&&zt()}})}
        ${I({title:M(`quickSettings.appearance.lobsterdex`),description:M(`quickSettings.appearance.lobsterdexSeen`,{seen:String(o),total:String(Nt.length)}),stacked:!0,control:D`
            <div class="lobsterdex__gallery">
              <div class="lobsterdex">
                ${Nt.map(e=>{let t=Ht(e),n=a.get(e.id),r=n!==void 0,i=n?.shinySeenAt!=null,o=r?n.name??Ft(e.id):`?`,s=i?`${o} ✦`:o,c=Gt[e.id],l=r?c.flavor:c.hint,u=r&&n.firstSeenAt!==null?M(`quickSettings.appearance.lobsterdexFirstVisited`,{name:o,date:new Date(n.firstSeenAt).toLocaleDateString()}):null,d=[s,l,u].filter(e=>e!==null).join(`
`);return D`
                    <openclaw-tooltip>
                      <span
                        class="lobsterdex__mini lobster-pet--palette-${e.id} ${r?``:`lobsterdex__mini--unseen`}"
                        style=${Bt(t)}
                        tabindex="0"
                        aria-label=${d}
                      >
                        ${Ut(t,{standalone:!0})}
                        ${i?D`<span class="lobsterdex__mini-star" aria-hidden="true">✦</span>`:w}
                      </span>
                      <span slot="content" class="lobsterdex__tooltip">
                        <strong>${s}</strong>
                        <span>${l}</span>
                        ${u?D`<span>${u}</span>`:w}
                      </span>
                    </openclaw-tooltip>
                  `})}
              </div>
              ${e.lobsterdexHref?D`<a
                    class="btn btn--sm lobsterdex__open"
                    href=${e.lobsterdexHref}
                    @click=${t=>{t.button===0&&!t.metaKey&&!t.ctrlKey&&!t.shiftKey&&!t.altKey&&(t.preventDefault(),e.onOpenLobsterdex?.())}}
                    >${M(`quickSettings.appearance.lobsterdexOpen`)}</a
                  >`:w}
            </div>
          `})}
      </div>
    </section>
  `}function Ui(e){let t=[...e.hiddenSessionCatalogIds].toSorted(),n=H({value:M(`common.enabled`),overridden:e.sidebarLiveActivity!==A.sidebarLiveActivity,onReset:()=>e.setSidebarLiveActivity(A.sidebarLiveActivity)});return D`
    <section id=${b.sidebar} class="settings-section">
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${M(`configView.sidebarPrefs.title`)}</h2>
      </div>
      <p class="settings-section__desc">${M(`configView.sidebarPrefs.hint`)}</p>
      <div class="settings-group">
        ${B({title:M(`configView.sidebarPrefs.liveActivity`),description:D`${M(`configView.sidebarPrefs.liveActivityHint`)}<br />
            ${n.description} ${M(`quickSettings.personal.browserOnly`)}`,checked:e.sidebarLiveActivity,onChange:e.setSidebarLiveActivity,actions:n.action})}
      </div>
      ${t.length>0?D`
            <div class="settings-section__header settings-section__header--subsection">
              <h3 class="settings-section__heading">${M(`chat.sidebar.hiddenSessionSections`)}</h3>
            </div>
            <div class="settings-group">
              ${t.map(t=>I({title:t,description:M(`quickSettings.personal.browserOnly`),control:D`<button
                    type="button"
                    class="btn btn--sm"
                    @click=${()=>e.setSessionCatalogHidden(t,!1)}
                  >
                    ${M(`chat.sidebar.showSessionSection`)}
                  </button>`}))}
            </div>
          `:w}
      <div class="settings-section__header settings-section__header--subsection">
        <h3 class="settings-section__heading">${M(`configView.sessionObserver.title`)}</h3>
      </div>
      <p class="settings-section__desc">${M(`configView.sessionObserver.hint`)}</p>
      ${ni({enabled:e.sessionObserverEnabled!==!1,utilityModel:e.sessionObserverUtilityModel,resolvedUtilityModel:e.sessionObserverResolvedModel,models:e.sessionObserverModels??[],modelsUnavailable:e.sessionObserverModelsUnavailable===!0,disabled:e.sessionObserverDisabled===!0,onEnabledChange:t=>e.setSessionObserverEnabled?.(t),onUtilityModelChange:t=>e.setSessionObserverUtilityModel?.(t)})}
    </section>
  `}var Wi=e((()=>{E(),je(),F(),It(),Vt(),Pt(),Wt(),mt(),U(),N(),Ni(),ii(),Fi(),re()}));function Gi(e,t){return e===`custom`&&t!==`custom`?D`<span class="settings-theme-card__icon" aria-hidden="true"
      >${P.download}</span
    >`:D`
    <span class="settings-theme-card__palette" aria-hidden="true">
      <span class="settings-theme-card__chip settings-theme-card__chip--accent"></span>
      <span class="settings-theme-card__chip settings-theme-card__chip--accent-2"></span>
      <span class="settings-theme-card__chip settings-theme-card__chip--bg"></span>
    </span>
  `}function Ki(e){return e.hasCustomTheme&&e.customThemeLabel?e.customThemeLabel:M(`configView.appearance.importedTheme`)}function qi(){(typeof requestAnimationFrame==`function`?requestAnimationFrame:e=>window.setTimeout(()=>e(0),0))(()=>{let e=globalThis.document?.querySelector(`[data-custom-theme-import-input]`);e&&(typeof e.scrollIntoView==`function`&&e.scrollIntoView({block:`center`,behavior:`smooth`}),e.focus(),e.select())})}function Ji(e,t){let n=e.viewState,r=e.hasCustomTheme||e.customThemeImportExpanded===!0;r&&e.customThemeImportFocusToken!=null&&e.customThemeImportFocusToken!==n.lastCustomThemeImportFocusToken&&(n.lastCustomThemeImportFocusToken=e.customThemeImportFocusToken,qi());let i=Ki(e),a=[...Zi.map(e=>({id:e.id,label:M(e.labelKey),description:M(e.descriptionKey)})),{id:`custom`,label:e.hasCustomTheme?i:M(`configView.appearance.import`),description:e.hasCustomTheme?M(`configView.appearance.importedFrom`,{name:i}):M(`configView.appearance.importHint`)}],o=H({value:a.find(t=>t.id===e.themeResetValue)?.label??M(`configView.themes.claw.label`),overridden:e.themeOverridden,onReset:e.resetTheme}),s=H({value:e.themeModeResetValue===`light`?M(`common.light`):e.themeModeResetValue===`dark`?M(`common.dark`):M(`common.system`),overridden:e.themeModeOverridden,onReset:e.resetThemeMode}),c=Ii(e.themeProvenance),l=Ii(e.themeModeProvenance),u=H({value:`${A.textScale}%`,overridden:e.textScaleOverridden,onReset:e.resetTextScale});return D`
    <div class="settings-page">
      <p class="settings-page__intro">
        ${M(`configView.appearance.intro`)}
        ${V(Yi,M(`common.learnMore`))}
      </p>
      ${Li(e)}
      <section id=${b.theme} class="settings-section">
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${M(`configView.appearance.theme`)}</h2>
          <div class="settings-section__actions">${o.action}</div>
        </div>
        <p class="settings-section__desc">
          ${M(`configView.appearance.chooseTheme`)} ${o.description}
          ${c}
        </p>
        <div class="settings-group">
          <div class="settings-row settings-row--stacked">
            <div class="settings-theme-grid">
              ${a.map(t=>D`
                  <button
                    class="settings-theme-card settings-theme-card--${t.id} ${t.id===e.theme?`settings-theme-card--active`:``}"
                    aria-pressed=${String(t.id===e.theme)}
                    title=${t.description}
                    @click=${n=>{if(t.id===`custom`&&!e.hasCustomTheme){e.onOpenCustomThemeImport?.();return}if(t.id!==e.theme){let r={element:n.currentTarget??void 0};e.setTheme(t.id,r)}}}
                  >
                    ${Gi(t.id,e.theme)}
                    <span class="settings-theme-card__label">${t.label}</span>
                    ${t.id===e.theme?D`<span class="settings-theme-card__check" aria-hidden="true"
                          >${P.check}</span
                        >`:w}
                  </button>
                `)}
            </div>
          </div>
          ${I({title:M(`common.colorMode`),description:D`${s.description} ${l}`,stacked:!0,control:D`
              ${s.action}
              ${L({value:e.themeMode,options:[{value:`system`,label:M(`common.system`)},{value:`light`,label:M(`common.light`)},{value:`dark`,label:M(`common.dark`)}],ariaLabel:M(`common.colorMode`),onChange:(t,n)=>e.setThemeMode(t,{element:n})})}
            `})}
          <div class="settings-row settings-row--stacked">
            ${r?D`
                  <div class="settings-theme-import">
                    <div class="settings-theme-import__copy">
                      <div class="settings-theme-import__title">
                        ${M(`configView.appearance.importFromTweakcn`)}
                      </div>
                      <p class="settings-theme-import__hint">
                        ${M(`configView.appearance.tweakcnInstructions`)}
                      </p>
                    </div>
                    <a
                      class="settings-theme-import__external"
                      href="https://tweakcn.com/editor/theme"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      ${M(`configView.appearance.browseTweakcn`)} ${P.externalLink}
                    </a>
                    <label class="settings-theme-import__field">
                      <span class="settings-theme-import__label"
                        >${M(`configView.appearance.themeLink`)}</span
                      >
                      ${t.customThemeImport}
                    </label>
                    <div class="settings-theme-import__actions">
                      <button
                        class="btn btn--sm primary"
                        ?disabled=${e.customThemeImportBusy||e.customThemeImportUrl.trim().length===0}
                        @click=${e.onImportCustomTheme}
                      >
                        ${e.customThemeImportBusy?M(`common.importing`):e.hasCustomTheme?M(`configView.appearance.replace`,{name:i}):M(`configView.appearance.importTheme`)}
                      </button>
                      ${e.hasCustomTheme?D`<button
                            class="btn btn--sm danger"
                            @click=${e.onClearCustomTheme}
                          >
                            ${M(`configView.appearance.clear`,{name:i})}
                          </button>`:w}
                    </div>
                    ${e.hasCustomTheme?D`<div class="settings-theme-import__meta">
                          <span class="settings-theme-import__meta-label"
                            >${M(`configView.appearance.loaded`)}</span
                          >
                          <span class="settings-theme-import__meta-value"
                            >${i} · ${e.customThemeSourceUrl??`tweakcn`}</span
                          >
                        </div>`:w}
                    ${e.customThemeImportMessage?D`<div
                          class="settings-theme-import__message settings-theme-import__message--${e.customThemeImportMessage.kind}"
                        >
                          ${e.customThemeImportMessage.text}
                        </div>`:w}
                  </div>
                `:D`<p class="settings-theme-import__inline-hint">
                  ${M(`configView.appearance.inlineHintBefore`)}
                  <strong>${M(`configView.appearance.import`)}</strong>
                  ${M(`configView.appearance.inlineHintAfter`)}
                </p>`}
          </div>
        </div>
      </section>

      <section id=${b.textSize} class="settings-section">
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${M(`configView.appearance.textSize`)}</h2>
          <div class="settings-section__actions">${u.action}</div>
        </div>
        <p class="settings-section__desc">
          ${u.description} ${M(`quickSettings.personal.browserOnly`)}
        </p>
        <div class="settings-group">
          <div class="settings-row settings-row--stacked">
            <div class="settings-text-scale">
              <div class="settings-text-scale__options">
                ${Be.map(t=>D`
                    <button
                      type="button"
                      class="settings-text-scale__btn ${t===e.textScale?`active`:``}"
                      aria-pressed=${String(t===e.textScale)}
                      @click=${()=>e.setTextScale(t)}
                    >
                      <span class="settings-text-scale__sample">${M(Xi[t])}</span>
                      <span class="settings-text-scale__label">${t}%</span>
                    </button>
                  `)}
              </div>
            </div>
          </div>
        </div>
      </section>

      ${Ui(e)} ${Hi(e)}
      ${Vi(e,t.chatMessageWidth)}

      <section id=${b.connection} class="settings-section">
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${M(`configView.connection.title`)}</h2>
        </div>
        <div class="settings-group">
          ${I({title:M(`configView.connection.gateway`),control:z(e.gatewayUrl||`-`,{mono:!0})})}
          ${I({title:M(`configView.connection.status`),control:R({kind:e.connected?`ok`:`muted`,label:e.connected?M(`common.connected`):M(`common.offline`)})})}
          ${e.assistantName?I({title:M(`configView.connection.assistant`),control:z(e.assistantName)}):w}
        </div>
      </section>
    </div>
  `}var Yi,Xi,Zi,Qi=e((()=>{E(),je(),F(),U(),N(),re(),Wi(),Yi=`https://docs.openclaw.ai/web/control-ui`,Xi={90:`configView.textSizes.small`,100:`configView.textSizes.default`,110:`configView.textSizes.large`,125:`configView.textSizes.xl`,140:`configView.textSizes.xxl`},Zi=[{id:`claw`,labelKey:`configView.themes.claw.label`,descriptionKey:`configView.themes.claw.description`},{id:`knot`,labelKey:`configView.themes.knot.label`,descriptionKey:`configView.themes.knot.description`},{id:`dash`,labelKey:`configView.themes.dash.label`,descriptionKey:`configView.themes.dash.description`}]}));function $i(e){return e.length>0?e.join(`.`):M(`configView.root`)}function ea(e,t){if(!e||!t)return[];let n=[],r=0;function i(e,t,r){n.length<la&&n.push({path:e,from:t,to:r})}function a(e,t,n){if(e.length!==t.length||e.length>ua)return!0;for(let r=0;r<e.length;r+=1)if(s(e[r],t[r],n+1))return!0;return!1}function o(e,t,n){let r=Object.keys(e),i=Object.keys(t);if(r.length!==i.length)return!0;for(let i of r)if(!Object.hasOwn(t,i)||s(e[i],t[i],n+1))return!0;return!1}function s(e,t,n){return r+=1,r>ca||n>sa?!0:e===t?!1:typeof e==typeof t?typeof e!=`object`||!e||t===null?e!==t:Array.isArray(e)||Array.isArray(t)?Array.isArray(e)&&Array.isArray(t)?a(e,t,n+1):!0:o(e,t,n+1):!0}function c(e,t,o,s){if(r+=1,r>ca||s>sa||n.length>=la||e===t)return;if(typeof e!=typeof t){i(o,e,t);return}if(typeof e!=`object`||!e||t===null){e!==t&&i(o,e,t);return}if(Array.isArray(e)||Array.isArray(t)){(Array.isArray(e)&&Array.isArray(t)&&a(e,t,s+1)||!Array.isArray(e)||!Array.isArray(t))&&i(o,e,t);return}let l=e,u=t,d=new Set([...Object.keys(l),...Object.keys(u)]);for(let e of d)c(l[e],u[e],[...o,e],s+1)}return c(e,t,[],0),n}function ta(e,t,n){if(e.rawDiffCache?.original===t&&e.rawDiffCache.current===n)return e.rawDiffCache.diff;if(t.length>da||n.length>da)return e.rawDiffCache={original:t,current:n,diff:[]},e.rawDiffCache.diff;try{let r=f(t),i=f(n);if(!r||!i||typeof r!=`object`||typeof i!=`object`||Array.isArray(r)||Array.isArray(i))return e.rawDiffCache={original:t,current:n,diff:[]},[];let a=ea(r,i);return e.rawDiffCache={original:t,current:n,diff:a},a}catch{return d()&&(e.rawDiffCache={original:t,current:n,diff:[]}),[]}}function na(e,t=40){if(Array.isArray(e))return M(e.length===1?`configView.itemCount`:`configView.itemCountPlural`,{count:String(e.length)});let n;try{n=JSON.stringify(e)??String(e)}catch{n=String(e)}return n.length<=t?n:ot(n,t-3)+`...`}function ra(e,t){let n=e.split(`.`);return n.length===t.length&&n.every((e,n)=>e===`*`||e===t[n])}function ia(e,t){return Object.entries(t).some(([t,n])=>!!n.sensitive&&ra(t,e))}function aa(e,t){for(let n=1;n<=e.length;n+=1){let r=e.slice(0,n),i=$i(r);if((yt(r,t)?.sensitive??!1)||ia(r,t)||lt(i))return!0}return!1}function oa(e,t,n,r){let i=ht(t,e,n)>0;return!r&&t!=null&&(aa(e,n)||i)?gt():na(t)}var sa,ca,la,ua,da,fa=e((()=>{ut(),ct(),vt(),N(),l(),sa=64,ca=2e4,la=1e3,ua=2e3,da=2e5}));function pa(e){return ma[e]??P.file}var ma,ha,ga,_a=e((()=>{F(),ma={all:P.layoutGrid,env:P.settings,update:P.download,agents:P.bot,auth:P.lock,channels:P.messageSquare,messages:P.mail,commands:P.terminal,hooks:P.link,skills:P.star,tools:P.wrench,gateway:P.globe,wizard:P.wandSparkles,meta:P.penLine,logging:P.fileText,browser:P.chrome,ui:P.panelsTopLeft,models:P.box,bindings:P.server,broadcast:P.radio,tts:P.music,session:P.users,cron:P.clock,discovery:P.search,talk:P.mic,plugins:P.asterisk,diagnostics:P.activity,cli:P.terminal,secrets:P.key,acp:P.users,mcp:P.server,__appearance__:P.sun,__notifications__:P.bell},ha=[{id:`core`,sections:[`env`,`auth`,`update`,`meta`,`logging`,`diagnostics`,`cli`,`secrets`]},{id:`ai`,sections:[`agents`,`models`,`skills`,`tools`,`memory`,`session`]},{id:`communication`,sections:[`channels`,`messages`,`broadcast`,`__notifications__`,`talk`,`tts`]},{id:`security`,sections:[`security`,`approvals`]},{id:`automation`,sections:[`commands`,`hooks`,`bindings`,`cron`,`plugins`]},{id:`infrastructure`,sections:[`gateway`,`browser`,`nodeHost`,`discovery`,`acp`,`mcp`]},{id:`appearance`,sections:[`__appearance__`,`ui`,`wizard`]}],ga=new Set(ha.flatMap(e=>e.sections))}));function va(e,t){if(!e||_t(e)!==`object`||!e.properties)return e;let n=t.include,r=t.exclude,i={};for(let t of Object.keys(e.properties)){if(n&&n.size>0&&!n.has(t)||r&&r.size>0&&r.has(t))continue;let a=e.properties[t];a&&(i[t]=a)}return{...e,properties:i}}function ya(e){return!e||typeof e!=`object`||Array.isArray(e)?null:e}function ba(e){return e?.length?e.join(``):``}function xa(e,t,n,r,i,a){let o=ba(n),s=ba(r),c=e.schemaAnalysisCache;if(c&&c.schema===t&&c.includeKey===o&&c.excludeKey===s)return c.analysis;let l=an(va(t,{include:i,exclude:a}));return e.schemaAnalysisCache={schema:t,includeKey:o,excludeKey:s,analysis:l},l}function Sa(e,t){if(!e||t===`<root>`)return!1;let n=t.split(`.`),r=(e,t)=>{if(t===n.length)return e!==void 0;if(typeof e!=`object`||!e)return!1;let i=n[t];return i===`*`?Object.values(e).some(e=>r(e,t+1)):!i||!Object.hasOwn(e,i)?!1:r(e[i],t+1)};return r(e,0)}function Ca(e){let t=`__OPENCLAW_CONFIG_PATHS__`,[n,r=``]=M(e.length===1?`configView.formUnsafeCount`:`configView.formUnsafeCountPlural`,{count:String(e.length),paths:t}).split(t);return D`
    <span class="config-content-callout__text">
      ${n}${e.slice(0,3).map((e,t)=>D`${t>0?`, `:``}<code>${e}</code>`)}${r}${e.length>3?D` ${M(`configView.formUnsafeMore`,{count:String(e.length-3)})}`:w}
    </span>
  `}var wa=e((()=>{E(),vt(),on(),N()}));function Ta(){return{rawRevealed:!1,rawDiffOpen:!1,envRevealed:!1,validityDismissed:!1,revealedSensitivePaths:new Set,lastCustomThemeImportFocusToken:null,lastConfigContextKey:null,lastFormModeForScroll:null}}function Ea(e){e.rawRevealed=!1,e.rawDiffOpen=!1,e.envRevealed=!1,e.validityDismissed=!1,e.revealedSensitivePaths.clear(),e.lastCustomThemeImportFocusToken=null,e.rawDiffCache=void 0}function Da(e){let t=e.includeSections?.join(``)??``,n=e.excludeSections?.join(``)??``;return[e.configPath??``,e.gatewayUrl,e.navRootLabel??``,t,n].join(``)}function Oa(e,t){let n=bt(t);return n?e.revealedSensitivePaths.has(n):!1}function ka(e,t){let n=bt(t);n&&(e.revealedSensitivePaths.has(n)?e.revealedSensitivePaths.delete(n):e.revealedSensitivePaths.add(n))}var Aa=e((()=>{vt()}));function ja(e){return Ji(e,{chatMessageWidth:D`
      <input
        class="settings-input"
        data-settings-chat-message-width
        type="text"
        spellcheck="false"
        placeholder="48rem"
        .value=${e.chatMessageMaxWidth??``}
        @change=${t=>{let n=t.currentTarget,r=Re(n.value);if(n.value.trim()&&!r){n.setCustomValidity(M(`configView.chatPrefs.messageWidthInvalid`)),n.reportValidity();return}n.setCustomValidity(``),n.value=r??``,e.setChatMessageMaxWidth(r)}}
      />
    `,customThemeImport:D`
      <input
        class="settings-theme-import__input"
        data-custom-theme-import-input
        type="text"
        spellcheck="false"
        placeholder="https://tweakcn.com/editor/theme?theme=... or amethyst-haze"
        .value=${e.customThemeImportUrl}
        @input=${t=>e.onCustomThemeImportUrlChange(t.currentTarget.value)}
      />
    `})}function Ma(e){let t=e.viewState,n=e.showModeToggle??!1,r=e.showRootTab??!0,i=e.valid==null?`unknown`:e.valid?`valid`:`invalid`,a=e.includeVirtualSections??!0,s=e.includeSections?.length?new Set(e.includeSections):null,c=e.excludeSections?.length?new Set(e.excludeSections):null,l=xa(t,ya(e.schema),e.includeSections,e.excludeSections,s,c),u=l.unsupportedPaths.filter(t=>t!==`<root>`&&(!e.activeSection||t===e.activeSection||t.startsWith(`${e.activeSection}.`))&&Sa(e.formValue,t)),f=u.length>0,ee=e.forceShowAdvanced===!0||e.showAdvancedSettings,p=e.rawAvailable??!0,te=!!e.rawDraftPending&&p,m=n&&p?e.formMode:`form`,h=te?`raw`:m,g=e.onViewStateChange,ne=e=>{queueMicrotask(()=>{let t=[(e instanceof Element?e:null)?.closest(`.config-lead`)?.parentElement?.querySelector(`.config-content`)??globalThis.document?.querySelector(`.config-content`),globalThis.document?.querySelector(`.shell--settings .content`)];for(let e of t)e&&(typeof e.scrollTo==`function`?e.scrollTo({top:0,left:0,behavior:`auto`}):(e.scrollTop=0,e.scrollLeft=0))})};t.lastFormModeForScroll!==null&&t.lastFormModeForScroll!==h&&ne(null),t.lastFormModeForScroll=h;let re=Da(e);t.lastConfigContextKey!==re&&(Ea(t),t.lastConfigContextKey=re);let _=t.envRevealed,ie=l.schema?.properties??{},ae=new Set([`__appearance__`,`__notifications__`]),oe=e=>a&&ae.has(e)&&(e===`__appearance__`||s?.has(e)===!0),se=e=>M(`configView.sections.${e===`__appearance__`?`theme`:e===`__notifications__`?`notifications`:e}`),ce=ha.map(e=>({id:e.id,label:M(`configView.categories.${e.id}`),sections:e.sections.filter(e=>(oe(e)||e in ie)&&(!s||s.has(e))&&(!c||!c.has(e))).map(e=>({key:e,label:se(e)}))})).filter(e=>e.sections.length>0),le=Object.keys(ie).filter(e=>!ga.has(e)).map(e=>({key:e,label:e.charAt(0).toUpperCase()+e.slice(1)})),v=le.length>0?{id:`other`,label:M(`configView.categories.other`),sections:le}:null,y=[...r?[{key:null,label:e.navRootLabel??M(`nav.settings`)}]:[],...[...ce,...v?[v]:[]].flatMap(e=>e.sections.map(e=>({key:e.key,label:e.label})))],ue=e.settingsLayout??`tabs`,b=[...ce,...v?[v]:[]];function de(){return D`
      <div class="config-accordion-nav">
        ${b.map(t=>D`
            <div class="config-accordion-group">
              <button
                class="config-accordion-group__header ${e.activeSection!=null&&t.sections.some(t=>t.key===e.activeSection)?`config-accordion-group__header--active`:``}"
                @click=${n=>{let r=t.sections[0]?.key??null,i=t.sections.some(t=>t.key===e.activeSection);e.onSectionChange(i?null:r),ne(n.currentTarget)}}
              >
                <span class="config-accordion-group__icon">
                  ${pa(t.sections[0]?.key??`default`)}
                </span>
                <span>${t.label}</span>
                <svg
                  class="config-accordion-group__chevron ${t.sections.some(t=>t.key===e.activeSection)?`config-accordion-group__chevron--open`:``}"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="14"
                  height="14"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              ${t.sections.some(t=>t.key===e.activeSection)?D`<div class="config-accordion-group__items">
                    ${t.sections.map(t=>D`<button
                        class="config-accordion-group__item ${e.activeSection===t.key?`config-accordion-group__item--active`:``}"
                        @click=${n=>{e.onSectionChange(t.key),ne(n.currentTarget)}}
                      >
                        <span class="config-accordion-group__item-icon">
                          ${pa(t.key)}
                        </span>
                        ${t.label}
                      </button>`)}
                  </div>`:w}
            </div>
          `)}
      </div>
    `}let x=h===`raw`&&e.raw!==e.originalRaw;(!x||h!==`raw`)&&t.rawDiffOpen&&(t.rawDiffOpen=!1),(!x||h!==`raw`||!t.rawDiffOpen)&&(t.rawDiffCache=void 0);let fe=h===`raw`&&x&&t.rawDiffOpen?ta(t,e.originalRaw,e.raw):[];h===`raw`&&x&&t.rawDiffOpen&&!d()&&o().then(()=>g()).catch(()=>void 0);let S=e.loading||e.saving||e.applying||e.updating,C=e.connected&&!S&&x,pe=a&&h===`form`&&e.activeSection===null&&!!s?.has(`__appearance__`),me=x&&h===`raw`?D`<details
          class="config-diff"
          ?open=${t.rawDiffOpen}
          @toggle=${e=>{let n=e.target;t.rawDiffOpen!==n.open&&(t.rawDiffOpen=n.open,n.open||(t.rawDiffCache=void 0),g())}}
        >
          <summary class="config-diff__summary">
            <span>${M(`configView.viewPendingChangesRaw`)}</span>
            <svg
              class="config-diff__chevron"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </summary>
          <div class="config-diff__content">
            ${fe.length>0?fe.map(n=>D`<div class="config-diff__item">
                    <div class="config-diff__path">${$i(n.path)}</div>
                    <div class="config-diff__values">
                      <span class="config-diff__from"
                        >${oa(n.path,n.from,e.uiHints,t.rawRevealed)}</span
                      >
                      <span class="config-diff__arrow">→</span>
                      <span class="config-diff__to"
                        >${oa(n.path,n.to,e.uiHints,t.rawRevealed)}</span
                      >
                    </div>
                  </div>`):D`<div class="config-diff__item">${M(`configView.rawDiffUnavailable`)}</div>`}
          </div>
        </details>`:w,he=ue!==`accordion`&&y.length>1,ge=he?L({value:e.activeSection??`root`,options:y.map(e=>({value:e.key??`root`,label:e.label})),ariaLabel:M(`common.settingsSections`),onChange:(t,n)=>{e.onSectionChange(t===`root`?null:t),ne(n)}}):w,_e=n||he,ve=i===`invalid`&&!t.validityDismissed,ye=_e||ue===`accordion`||ve,be=D`<div class="config-lead">
    ${_e?D`<div class="config-toolbar">
          ${n?D`<div class="config-mode-toggle">
                <button
                  class="config-mode-toggle__btn ${h===`form`?`active`:``}"
                  ?disabled=${e.schemaLoading||!e.schema||te}
                  title=${te?M(`configView.rawDraftPendingFormTitle`):f?M(`configView.formUnsafeTitle`):``}
                  @click=${()=>e.onFormModeChange(`form`)}
                >
                  ${M(`configView.form`)}
                </button>
                <button
                  class="config-mode-toggle__btn ${h===`raw`?`active`:``}"
                  ?disabled=${!p}
                  title=${M(p?`configView.rawTitle`:`configView.rawUnavailableTitle`)}
                  @click=${()=>e.onFormModeChange(`raw`)}
                >
                  ${M(`configView.raw`)}
                </button>
              </div>`:w}
          ${ge}
        </div>`:w}
    ${ue===`accordion`?de():w}
    ${ve?D`<div class="config-validity-warning">
          <svg
            class="config-validity-warning__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="16"
            height="16"
          >
            <path
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            ></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span class="config-validity-warning__text">${M(`configView.invalidConfig`)}</span>
          <button
            class="btn btn--sm"
            @click=${()=>{t.validityDismissed=!0,g()}}
          >
            ${M(`configView.dismissWarning`)}
          </button>
        </div>`:w}
  </div>`;return D`
    ${ye?be:w}
    <div
      id="config-section-panel"
      class="config-content"
      role="region"
      aria-label=${M(`common.settingsSections`)}
    >
      ${e.activeSection===`__appearance__`?a?ja(e):w:e.activeSection===`__notifications__`?a?Oi(e):w:h===`form`?D`
                ${f&&n&&p?D`<div class="config-content-callout">
                      <div class="callout info">
                        ${Ca(u)}
                        <button
                          type="button"
                          class="btn btn--sm"
                          @click=${()=>e.onFormModeChange(`raw`)}
                        >
                          ${M(`configView.openRawEditor`)}
                        </button>
                      </div>
                    </div>`:w}
                ${pe?ja(e):w}
                ${e.schemaLoading?D`<div class="config-loading">
                      <div class="config-loading__spinner"></div>
                      <span>${M(`configView.loadingSchema`)}</span>
                    </div>`:rn({schema:l.schema,uiHints:e.uiHints,value:e.formValue,embedded:e.embeddedEditor===!0,rawAvailable:p,disabled:S||!e.formValue,unsupportedPaths:l.unsupportedPaths,onPatch:e.onFormPatch,onRemove:e.onFormRemove,activeSection:e.activeSection,activeSubsection:null,showAdvanced:ee,forceAdvancedSection:e.forceAdvancedSection,onShowAdvanced:()=>e.setShowAdvancedSettings(!0),onHideAdvanced:e.forceShowAdvanced?void 0:()=>e.setShowAdvancedSettings(!1),sectionActions:e.activeSection===`env`?D`<button
                              class="btn btn--sm ${_?`active`:``}"
                              aria-pressed=${_?`true`:`false`}
                              title=${M(_?`configView.hideEnvValues`:`configView.revealEnvValues`)}
                              @click=${()=>{t.envRevealed=!t.envRevealed,g()}}
                            >
                              ${_?P.eyeOff:P.eye}
                              ${M(`configView.peek`)}
                            </button>`:void 0,revealSensitive:e.activeSection===`env`&&_,isSensitivePathRevealed:e=>Oa(t,e),onToggleSensitivePath:e=>{ka(t,e),g()}})}
              `:(()=>{let n=ht(e.formValue,[],e.uiHints),r=n>0&&!t.rawRevealed;return D`<div class="settings-page">
                  ${me}
                  <!-- Raw editor: one group surface owning file-level operations. -->
                  <div class="settings-group">
                    <div class="settings-row settings-row--stacked">
                      <div class="config-raw-actions">
                        ${e.onOpenFile?D`<button class="btn btn--sm" @click=${e.onOpenFile}>
                              ${P.fileText} ${M(`configView.open`)}
                            </button>`:w}
                        <button
                          class="btn btn--sm"
                          ?disabled=${S||!x}
                          @click=${e.onRawDiscard}
                        >
                          ${M(`configView.rawDiscard`)}
                        </button>
                        <button
                          class="btn btn--sm primary"
                          ?disabled=${!C}
                          aria-busy=${e.saving?`true`:`false`}
                          @click=${e.onSave}
                        >
                          ${e.saving?D`<span class="config-action-spinner" aria-hidden="true"
                                  >${P.loader}</span
                                >${M(`common.saving`)}`:M(`common.save`)}
                        </button>
                      </div>
                      <div class="field config-raw-field">
                        <span style="display:flex;align-items:center;gap:8px;">
                          ${M(`configView.rawConfig`)}
                          ${n>0?D`<span class="settings-count"
                                  >${M(n===1?`configView.secretCount`:`configView.secretCountPlural`,{count:String(n)})}
                                  ${M(r?`configView.redacted`:`configView.visible`)}</span
                                >
                                <openclaw-tooltip
                                  .content=${M(r?`configView.revealSensitive`:`configView.hideSensitive`)}
                                >
                                  <button
                                    class="btn btn--icon config-raw-toggle ${r?``:`active`}"
                                    aria-label=${M(`configView.toggleRawRedaction`)}
                                    aria-pressed=${!r}
                                    @click=${()=>{t.rawRevealed=!t.rawRevealed,g()}}
                                  >
                                    ${r?P.eyeOff:P.eye}
                                  </button>
                                </openclaw-tooltip>`:w}
                        </span>
                        ${r?D`<div class="callout info" style="margin-top: 12px">
                              ${M(n===1?`configView.sensitiveHidden`:`configView.sensitiveHiddenPlural`,{count:String(n)})}
                            </div>`:D`<textarea
                              placeholder=${M(`configView.rawConfig`)}
                              .value=${e.raw}
                              ?disabled=${S}
                              @input=${t=>{e.onRawChange(t.target.value)}}
                            ></textarea>`}
                      </div>
                    </div>
                  </div>
                </div>`})()}
      ${e.issues.length>0?D`<div class="config-content-callout">
            <div class="callout danger">
              <pre class="code-block">
${Se(jt(JSON.stringify(e.issues,null,2)))}</pre>
            </div>
          </div>`:w}
    </div>
  `}var Na=e((()=>{Mt(),E(),Ce(),je(),vt(),on(),mt(),F(),At(),U(),N(),l(),Ai(),Qi(),fa(),_a(),wa(),Aa(),o().catch(()=>void 0)}));function Q(e){switch(e){case`communications`:return{activeSection:`messages`,activeSubsection:null};case`appearance`:return{activeSection:`__appearance__`,activeSubsection:null};case`notifications`:return{activeSection:`__notifications__`,activeSubsection:null};case`security`:return{activeSection:`security`,activeSubsection:null};case`automation`:return{activeSection:`commands`,activeSubsection:null};case`mcp`:return{activeSection:`mcp`,activeSubsection:null};case`memory`:return{activeSection:`memory`,activeSubsection:null};case`talk`:return{activeSection:`talk`,activeSubsection:null};case`infrastructure`:return{activeSection:`gateway`,activeSubsection:null};case`ai-agents`:return{activeSection:`agents`,activeSubsection:null};case`advanced`:return{activeSection:null,activeSubsection:null}}throw Error(`Unknown config page`)}function Pa(e,t,n){let r=g(e)??null;return e===`advanced`&&t&&ce.has(t)?{activeSection:null,activeSubsection:null}:r&&(!t||!r.includes(t))?Q(e):{activeSection:t,activeSubsection:n}}function Fa(e,t){let n=new URLSearchParams(t).get(`section`);return n?Pa(e,n,null):Q(e)}function Ia(e){return He(e)}function La(e){let t=j(e?.configForm)??j(e);if(!t)return{gatewayAuth:`unknown`,execPolicy:`unknown`,deviceAuth:!1,browserEnabled:!0,browserEnabledOverridden:!1,toolProfile:`full`,toolProfileOverridden:!1};let n=j(t.gateway),r=j(n?.auth),i=j(t.tools),a=j(i?.exec)??{},o=j(t.browser),s=j(n?.controlUi),c=`unknown`;r&&(c=(typeof r.mode==`string`?r.mode.trim():``)||(r.password?`password`:r.token?`token`:r.trustedProxy?`trusted-proxy`:`none`));let l=i?.profile,u=a.security;return{gatewayAuth:c,execPolicy:typeof u==`string`&&u.trim()?u.trim():`allowlist`,deviceAuth:s?.dangerouslyDisableDeviceAuth!==!0,browserEnabled:o?.enabled!==!1,browserEnabledOverridden:o!==null&&Object.hasOwn(o,`enabled`),toolProfile:typeof l==`string`&&l.trim()?l.trim():`full`,toolProfileOverridden:i!==null&&Object.hasOwn(i,`profile`)}}function Ra(e){typeof document>`u`||document.documentElement.style.setProperty(`--control-ui-text-scale`,(Ie(e)/100).toFixed(2))}var za,Ba,$;e((()=>{An(),ke(),we(),it(),E(),T(),Ye(),Qe(),tt(),Pe(),nt(),$e(),je(),rt(),Ne(),Et(),qt(),N(),un(),x(),c(),Dt(),m(),wn(),cn(),dn(),On(),be(),Nn(),zn(),qr(),fe(),te(),Zr(),ii(),Ti(),Na(),t(),za={"communications:__notifications__":{routeId:`notifications`,keepSection:!1},"communications:channels":{routeId:`channels`,keepSection:!1},"communications:broadcast":{routeId:`advanced`,keepSection:!0},"communications:talk":{routeId:`talk`,keepSection:!0},"automation:approvals":{routeId:`security`,keepSection:!0},"ai-agents:memory":{routeId:`memory`,keepSection:!0},"ai-agents:models":{routeId:`model-providers`,keepSection:!1}},Ba=1e4,$=class extends h{constructor(...e){super(...e),this.pageId=`advanced`,this.routeData=null,this.settings=Ae(),this.hiddenSessionCatalogIds=wt(),this.systemInfo=null,this.systemInfoUnavailable=!1,this.sessionObserverModels=[],this.sessionObserverModelsUnavailable=!1,this.microphoneDevices=[],this.microphonePermissionRequired=!0,this.microphoneLoading=!1,this.microphoneError=null,this.microphoneLoaded=!1,this.microphoneRefreshRequestsPermission=!1,this.microphonePermissionRefreshPending=!1,this.cameraDevices=[],this.cameraPermissionRequired=!0,this.cameraLoading=!1,this.cameraError=null,this.cameraLoaded=!1,this.cameraRefreshRequestsPermission=!1,this.cameraPermissionRefreshPending=!1,this.cameraSelectionRequest=0,this.formModes={communications:`form`,appearance:`form`,notifications:`form`,security:`form`,automation:`form`,mcp:`form`,memory:`form`,talk:`form`,infrastructure:`form`,"ai-agents":`form`,advanced:`form`},this.selections={communications:Q(`communications`),appearance:Q(`appearance`),notifications:Q(`notifications`),security:Q(`security`),automation:Q(`automation`),mcp:Q(`mcp`),memory:Q(`memory`),talk:Q(`talk`),infrastructure:Q(`infrastructure`),"ai-agents":Q(`ai-agents`),advanced:Q(`advanced`)},this.customThemeImport=jn,this.customThemeImportOwner=new Mn(e=>{this.customThemeImport=e}),this.configViewState=Ta(),this.runtimeConfigSource=null,this.systemInfoGatewaySource=null,this.systemInfoClient=null,this.sessionObserverModelsClient=null,this.sessionObserverModelLoads=new WeakMap,this.systemInfoPolling=new Ot(this,Ba,()=>{this.systemInfoTask.status!==Te.PENDING&&this.systemInfoTask.run()},!1),this.systemInfoTask=new Oe(this,{autoRun:!1,args:()=>[this.systemInfoGatewaySource,this.systemInfoRequestClient()],task:([e,t],{signal:n})=>e&&t?t.request(`system.info`,{},{signal:n}):De,onComplete:e=>{this.systemInfo=e;let t=this.systemInfoRequestClient();t&&this.ensureSessionObserverModels(t)},onError:e=>{(r(e)||En(e))&&(this.systemInfo=null,this.systemInfoUnavailable=!0,this.systemInfoPolling.stop())}}),this.pendingRouteTargetId=null,this.subscriptions=new i(this).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t),e=>this.synchronizeRuntimeConfig(e)).watch(()=>this.context?.overlays,(e,t)=>e.subscribe(t)).watch(()=>this.context?.config,(e,t)=>e.subscribe(t)).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.synchronizeSystemInfoGateway(e)).watch(()=>this.context?.nativeNotifications??void 0,(e,t)=>e.subscribe(t)).watch(()=>this.context?.webPush,(e,t)=>e.subscribe(t)).watch(()=>this.context?.theme,(e,t)=>e.subscribe(t),()=>{this.settings=this.customThemeImportOwner.adoptSettings(this.settings,Ae(),this.context.theme.serverSelection)}),this.hiddenSessionCatalogsChanged=()=>{this.hiddenSessionCatalogIds=wt()}}connectedCallback(){super.connectedCallback(),this.hiddenSessionCatalogsChanged(),window.addEventListener(Tt,this.hiddenSessionCatalogsChanged),this.customThemeImportOwner.connect(this.context.gateway.connection.gatewayUrl,this.context.theme.serverSelection),this.settings=Ae(),this.syncRouteData()}disconnectedCallback(){window.removeEventListener(Tt,this.hiddenSessionCatalogsChanged),this.customThemeImportOwner.retireImport(),this.systemInfoPolling.stop(),this.invalidateSystemInfoRequest(),this.runtimeConfigSource=null,this.resetConfigViewState(),this.systemInfoGatewaySource=null,this.systemInfoClient=null,this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){e.get(`pageId`)===`appearance`&&this.pageId!==`appearance`&&this.customThemeImportOwner.retireImport(),(e.has(`pageId`)||e.has(`routeData`))&&this.syncRouteData()}updated(e){e.has(`pageId`)&&e.get(`pageId`)!==void 0&&this.invalidateSystemInfoRequest(),this.syncSystemInfoPolling(),this.scrollToPendingRouteTarget(),this.pageId===`appearance`&&!this.microphoneLoaded&&(this.microphoneLoaded=!0,this.refreshMicrophones(!1)),this.pageId===`appearance`&&!this.cameraLoaded&&(this.cameraLoaded=!0,this.refreshCameras(!1))}async refreshMicrophones(e){if(this.microphoneLoading){e&&!this.microphoneRefreshRequestsPermission&&(this.microphonePermissionRefreshPending=!0);return}this.microphoneLoading=!0,this.microphoneRefreshRequestsPermission=e,this.microphoneError=null;try{let t=await sn(e);this.microphoneDevices=t.devices,this.microphonePermissionRequired=t.permissionRequired,this.microphoneError=t.warning}catch(e){this.microphoneError=e instanceof Error?e.message:String(e)}finally{this.microphoneLoading=!1,this.microphoneRefreshRequestsPermission=!1}this.microphonePermissionRefreshPending&&(this.microphonePermissionRefreshPending=!1,await this.refreshMicrophones(!0))}async refreshCameras(e){if(this.cameraLoading){e&&!this.cameraRefreshRequestsPermission&&(this.cameraPermissionRefreshPending=!0);return}this.cameraLoading=!0,this.cameraRefreshRequestsPermission=e,this.cameraError=null;try{let t=await pn(e);this.cameraDevices=t.devices,this.cameraPermissionRequired=t.permissionRequired,this.cameraError=t.warning}catch(e){this.cameraError=e instanceof Error?e.message:String(e)}finally{this.cameraLoading=!1,this.cameraRefreshRequestsPermission=!1}this.cameraPermissionRefreshPending&&(this.cameraPermissionRefreshPending=!1,await this.refreshCameras(!0))}syncRouteData(){let e=this.routeData?this.routeData.section:new URLSearchParams(globalThis.location?.search??``).get(`section`);if(e){let t=za[`${this.pageId}:${e}`];if(t){this.context?.navigate(t.routeId,{search:t.keepSection?`?section=${encodeURIComponent(e)}`:``,hash:globalThis.location?.hash??``});return}}let t=this.routeData?Pa(this.pageId,this.routeData.section,null):Fa(this.pageId,globalThis.location?.search??``);this.selections={...this.selections,[this.pageId]:t};let n=this.routeData?.targetBlockId??xe(globalThis.location?.hash??``);this.pendingRouteTargetId=n}scrollToPendingRouteTarget(){let e=this.pendingRouteTargetId;if(!e)return;let t=[...this.renderRoot.querySelectorAll(`[id]`)].find(t=>t.id===e);t&&(t.scrollIntoView?.({behavior:`smooth`,block:`start`}),this.pendingRouteTargetId=null)}isSystemInfoVisible(){return this.pageId===`appearance`}synchronizeRuntimeConfig(e){e!==this.runtimeConfigSource&&(this.runtimeConfigSource&&this.customThemeImportOwner.retireImport(),this.runtimeConfigSource=e,this.resetConfigViewState());let t=e.state;if(!t.configSnapshot&&!t.configLoading){e.ensureLoaded().then(()=>this.runtimeConfigSource===e?e.ensureSchemaLoaded():void 0).catch(()=>void 0);return}!t.configSchema&&!t.configSchemaLoading&&e.ensureSchemaLoaded().catch(()=>void 0)}synchronizeSystemInfoGateway(e){this.customThemeImportOwner.synchronizeScope(e.connection.gatewayUrl,this.context.theme.serverSelection),e!==this.systemInfoGatewaySource&&(this.systemInfoPolling.stop(),this.invalidateSystemInfoRequest(),this.systemInfoGatewaySource=e,this.resetConfigViewState(),this.systemInfoClient=null,this.systemInfo=null,this.systemInfoUnavailable=!1,this.sessionObserverModelsClient=null,this.sessionObserverModels=[],this.sessionObserverModelsUnavailable=!1),this.handleSystemInfoGatewaySnapshot(e.snapshot)}resetConfigViewState(){this.configViewState=Ta()}handleSystemInfoGatewaySnapshot(e){let t=e.client!==this.systemInfoClient,n=Dn(e.hello);this.systemInfoClient=e.client,t?(this.invalidateSystemInfoRequest(),this.systemInfo=null,this.systemInfoUnavailable=!1,this.sessionObserverModelsClient=null,this.sessionObserverModels=[],this.sessionObserverModelsUnavailable=!1):e.phase!==`connected`&&(this.invalidateSystemInfoRequest(),this.systemInfo=null),e.phase===`connected`&&e.hello&&(this.systemInfoUnavailable=!n,n||(this.invalidateSystemInfoRequest(),this.systemInfo=null)),this.syncSystemInfoPolling(t)}syncSystemInfoPolling(e=!1){let t=this.context.gateway.snapshot;if(!(this.isConnected&&this.isSystemInfoVisible()&&!this.systemInfoUnavailable&&t.phase===`connected`&&Dn(t.hello)&&t.client!=null)){this.systemInfoPolling.stop();return}(this.systemInfoPolling.start()||e)&&this.systemInfoTask.run()}invalidateSystemInfoRequest(){this.systemInfoTask.run([null,null])}systemInfoRequestClient(){let e=this.systemInfoGatewaySource,t=e?.snapshot;return!e||!t||!this.isConnected||!this.isSystemInfoVisible()||this.context.gateway!==e||t.phase!==`connected`||!Dn(t.hello)||this.systemInfoUnavailable?null:t.client}ensureSessionObserverModels(e){if(this.sessionObserverModelsClient===e)return Promise.resolve();let t=this.sessionObserverModelLoads.get(e);if(t)return t;let n=this.systemInfoGatewaySource,r=Tn(e).then(t=>{this.isConnected&&this.systemInfoGatewaySource===n&&this.context.gateway.snapshot.client===e&&(this.sessionObserverModels=t,this.sessionObserverModelsClient=e,this.sessionObserverModelsUnavailable=!1)}).catch(()=>{this.isConnected&&this.systemInfoGatewaySource===n&&this.context.gateway.snapshot.client===e&&(this.sessionObserverModels=[],this.sessionObserverModelsClient=null,this.sessionObserverModelsUnavailable=!0)}).finally(()=>{this.sessionObserverModelLoads.get(e)===r&&this.sessionObserverModelLoads.delete(e)});return this.sessionObserverModelLoads.set(e,r),r}setFormMode(e){this.formModes={...this.formModes,[this.pageId]:e}}setActiveSection(e){this.selections={...this.selections,[this.pageId]:{activeSection:e,activeSubsection:null}}}setActiveSubsection(e){this.selections={...this.selections,[this.pageId]:{...this.selections[this.pageId],activeSubsection:e}}}applySettings(e){this.settings=ze({theme:e.theme,themeMode:e.themeMode,customTheme:e.customTheme,textScale:e.textScale,sidebarLiveActivity:e.sidebarLiveActivity,chatMessageMaxWidth:e.chatMessageMaxWidth,showAdvancedSettings:e.showAdvancedSettings,chatSendShortcut:e.chatSendShortcut,chatFollowUpMode:e.chatFollowUpMode,catalogOpenTarget:e.catalogOpenTarget,realtimeTalkInputDeviceId:e.realtimeTalkInputDeviceId,realtimeTalkVideoDeviceId:e.realtimeTalkVideoDeviceId,composerHoldToRecord:e.composerHoldToRecord,lobsterPetVisits:e.lobsterPetVisits,lobsterPetSounds:e.lobsterPetSounds}),Ra(this.settings.textScale),this.context.theme.refresh()}setLocale(e){if(e===void 0){this.resetLocale();return}this.settings=ze({locale:e}),dt.setLocale(e)}currentLocalePref(){return Xe(this.context.runtimeConfig.state.configSnapshot?.config,`locale`,this.context.gateway.connection.gatewayUrl,this.settings)}currentThemePref(){return Xe(this.context.runtimeConfig.state.configSnapshot?.config,`theme`,this.context.gateway.connection.gatewayUrl,this.settings)}currentThemeModePref(){return Xe(this.context.runtimeConfig.state.configSnapshot?.config,`themeMode`,this.context.gateway.connection.gatewayUrl,this.settings)}currentChatSendShortcutPref(){return Xe(this.context.runtimeConfig.state.configSnapshot?.config,`chatSendShortcut`,this.context.gateway.connection.gatewayUrl,this.settings)}currentChatFollowUpModePref(){return Xe(this.context.runtimeConfig.state.configSnapshot?.config,`chatFollowUpMode`,this.context.gateway.connection.gatewayUrl,this.settings)}resetLocale(){this.settings=Ke(`locale`,this.currentLocalePref()),ft(this.settings.locale)?dt.setLocale(this.settings.locale):dt.useSystemLocale()}resetSyncedAppearancePref(e){switch(e){case`theme`:this.customThemeImportOwner.recordActivation(null),this.settings=Ke(`theme`,this.currentThemePref());break;case`themeMode`:this.settings=Ke(`themeMode`,this.currentThemeModePref());break;case`chatSendShortcut`:this.settings=Ke(`chatSendShortcut`,this.currentChatSendShortcutPref());break;case`chatFollowUpMode`:this.settings=Ke(`chatFollowUpMode`,this.currentChatFollowUpModePref());break}this.context.theme.refresh()}setTheme(e,t){this.customThemeImportOwner.recordActivation(e);let n=Fe(this.settings.theme,this.settings.themeMode),r={...this.settings,theme:e};We({currentTheme:n,nextTheme:Fe(r.theme,r.themeMode),context:t,applyTheme:()=>this.applySettings(r)})}setThemeMode(e,t){let n=Fe(this.settings.theme,this.settings.themeMode),r={...this.settings,themeMode:e};We({currentTheme:n,nextTheme:Fe(r.theme,r.themeMode),context:t,applyTheme:()=>this.applySettings(r)})}setSetting(e,t){this.applySettings({...this.settings,[e]:t})}selectMicrophone(e){this.applySettings({...this.settings,realtimeTalkInputDeviceId:e.trim()||void 0})}async selectCamera(e){let t=++this.cameraSelectionRequest,n=e.trim()||void 0;this.cameraError=null;try{if(await fn(n),t!==this.cameraSelectionRequest)return;this.applySettings({...this.settings,realtimeTalkVideoDeviceId:n})}catch(e){t===this.cameraSelectionRequest&&(this.cameraError=e instanceof Error?e.message:String(e))}}async importCustomTheme(){await this.customThemeImportOwner.import({config:this.context.runtimeConfig.state,hasCustomTheme:!!this.settings.customTheme,load:Ze,apply:(e,t)=>this.applySettings({...this.settings,customTheme:e,theme:t?`custom`:this.settings.theme}),messages:{blocked:e=>M(e===`loading`?`common.loading`:`common.unsavedChanges`),imported:e=>M(`configPage.themeImported`,{name:e})}})}clearCustomTheme(){this.customThemeImportOwner.clear({apply:()=>this.applySettings({...this.settings,theme:this.settings.theme===`custom`?`claw`:this.settings.theme,customTheme:void 0}),message:M(`configPage.themeRemoved`)})}includeSections(){return g(this.pageId)}isUpdateBusy(){let e=this.context.overlays.snapshot;return e.updateRunning||e.updateReconciliationPending}isCuratedConfigMutationDisabled(){let e=this.context.runtimeConfig.state;return!e.connected||e.configLoading||e.configSaving||e.configApplying||this.isUpdateBusy()||!Ge(this.context.gateway.snapshot.hello?.auth??null)}renderAdvancedConfig(e){let t=this.context.runtimeConfig,n=t.state,r=this.includeSections(),i=this.pageId===`advanced`?[...ce]:void 0,a=Pa(this.pageId,this.selections[this.pageId].activeSection,this.selections[this.pageId].activeSubsection),o=this.pageId===`mcp`?`mcp`:a.activeSection,s=this.pageId===`mcp`?null:a.activeSubsection,c=j(j(e.gateway)?.controlUi),l=j(j(e.agents)?.defaults),u=this.currentThemePref(),d=this.currentThemeModePref(),f=this.currentLocalePref(),ee=this.currentChatSendShortcutPref(),p=this.currentChatFollowUpModePref(),te=!n.connected||n.configSaving||n.configApplying||this.isUpdateBusy()||!Ge(this.context.gateway.snapshot.hello?.auth??null),m={raw:n.configRaw,originalRaw:n.configRawOriginal,valid:n.configValid,issues:n.configIssues,loading:n.configLoading,saving:n.configSaving,applying:n.configApplying,updating:this.isUpdateBusy(),connected:n.connected,schema:n.configSchema,schemaLoading:n.configSchemaLoading,uiHints:n.configUiHints,formMode:this.formModes[this.pageId],rawDraftPending:n.configFormMode===`raw`&&n.configFormDirty,viewState:this.configViewState,rawAvailable:!!(n.configSnapshot?.config||n.configForm||n.configRaw),showModeToggle:this.pageId===`advanced`,formValue:n.configForm,originalValue:n.configFormOriginal,activeSection:o,activeSubsection:s,onRawChange:e=>{this.customThemeImportOwner.retireForConfigMutation(M(`common.unsavedChanges`)),t.setRaw(e)},onFormModeChange:e=>this.setFormMode(e),onViewStateChange:()=>this.requestUpdate(),onFormPatch:(e,n)=>{this.customThemeImportOwner.retireForConfigMutation(M(`common.unsavedChanges`)),t.patchForm(e,n)},onFormRemove:e=>{this.customThemeImportOwner.retireForConfigMutation(M(`common.unsavedChanges`)),t.removeFormValue(e)},onSectionChange:e=>this.setActiveSection(e),onSubsectionChange:e=>this.setActiveSubsection(e),onSave:()=>void t.save(),onRawDiscard:()=>void t.discardDraft(),onOpenFile:()=>void t.openFile(),version:this.context.config.current.serverVersion??this.context.gateway.snapshot.hello?.server?.version??``,theme:this.settings.theme,themeOverridden:u.overridden,themeProvenance:u.provenance,themeResetValue:u.resetValue??A.theme,themeMode:this.settings.themeMode,themeModeOverridden:d.overridden,themeModeProvenance:d.provenance,themeModeResetValue:d.resetValue??A.themeMode,systemLocale:dt.getSystemLocale(),localeOverride:ft(f.value)?f.value:void 0,localeOverridden:f.overridden,localeProvenance:f.provenance,localeResetValue:ft(f.resetValue)?f.resetValue:void 0,onLocaleChange:e=>this.setLocale(e),resetLocale:()=>this.resetLocale(),setTheme:(e,t)=>this.setTheme(e,t),resetTheme:()=>this.resetSyncedAppearancePref(`theme`),setThemeMode:(e,t)=>this.setThemeMode(e,t),resetThemeMode:()=>this.resetSyncedAppearancePref(`themeMode`),hasCustomTheme:!!this.settings.customTheme,customThemeLabel:this.settings.customTheme?.label??null,customThemeSourceUrl:this.settings.customTheme?.sourceUrl??null,customThemeImportUrl:this.customThemeImport.url,customThemeImportBusy:this.customThemeImport.busy,customThemeImportMessage:this.customThemeImport.message,customThemeImportExpanded:this.customThemeImport.expanded,customThemeImportFocusToken:this.customThemeImport.focusToken,onCustomThemeImportUrlChange:e=>this.customThemeImportOwner.setUrl(e),onImportCustomTheme:()=>void this.importCustomTheme(),onClearCustomTheme:()=>this.clearCustomTheme(),onOpenCustomThemeImport:()=>this.customThemeImportOwner.open(),textScale:this.settings.textScale??A.textScale,textScaleOverridden:this.settings.textScale!==void 0,setTextScale:e=>this.setSetting(`textScale`,Ie(e)),resetTextScale:()=>this.setSetting(`textScale`,void 0),sidebarLiveActivity:this.settings.sidebarLiveActivity??A.sidebarLiveActivity,setSidebarLiveActivity:e=>this.setSetting(`sidebarLiveActivity`,e),hiddenSessionCatalogIds:this.hiddenSessionCatalogIds,setSessionCatalogHidden:(e,t)=>{let n=new Set(this.hiddenSessionCatalogIds);t?n.add(e):n.delete(e),Ct(n)},chatMessageMaxWidth:this.settings.chatMessageMaxWidth,setChatMessageMaxWidth:e=>this.setSetting(`chatMessageMaxWidth`,e),showAdvancedSettings:this.settings.showAdvancedSettings===!0,setShowAdvancedSettings:e=>this.setSetting(`showAdvancedSettings`,e),forceShowAdvanced:this.pageId===`advanced`,forceAdvancedSection:this.routeData?.advanced?this.routeData.section:null,sessionObserverEnabled:c?.sessionObserver!==!1,sessionObserverUtilityModel:typeof l?.utilityModel==`string`?l.utilityModel:void 0,sessionObserverResolvedModel:this.systemInfo?.defaultAgentUtilityModel,sessionObserverModels:this.sessionObserverModels,sessionObserverModelsUnavailable:this.sessionObserverModelsUnavailable,sessionObserverDisabled:te,setSessionObserverEnabled:e=>{t.patch({raw:Qr(e),note:M(`configView.sessionObserver.toggleNote`)})},setSessionObserverUtilityModel:e=>{t.patch({raw:$r(e),note:M(`configView.sessionObserver.modelNote`)}).then(e=>{e&&this.systemInfoTask.run()})},lobsterPetVisits:this.settings.lobsterPetVisits??A.lobsterPetVisits,setLobsterPetVisits:e=>this.applySettings({...this.settings,lobsterPetVisits:e}),lobsterPetSounds:this.settings.lobsterPetSounds??A.lobsterPetSounds,setLobsterPetSounds:e=>this.applySettings({...this.settings,lobsterPetSounds:e}),lobsterdexHref:et(`lobsterdex`,this.context.basePath),onOpenLobsterdex:()=>this.context.navigate(`lobsterdex`),chatSendShortcut:Me(this.settings.chatSendShortcut),chatSendShortcutOverridden:ee.overridden,chatSendShortcutProvenance:ee.provenance,chatSendShortcutResetValue:ee.resetValue??A.chatSendShortcut,setChatSendShortcut:e=>this.setSetting(`chatSendShortcut`,e),resetChatSendShortcut:()=>this.resetSyncedAppearancePref(`chatSendShortcut`),chatFollowUpMode:this.settings.chatFollowUpMode,chatFollowUpModeOverridden:p.overridden,chatFollowUpModeProvenance:p.provenance,serverQueueMode:n.configSnapshot?ln(n.configSnapshot.runtimeConfig,{configNeedsApply:n.configNeedsApply}):void 0,setChatFollowUpMode:e=>this.setSetting(`chatFollowUpMode`,e),resetChatFollowUpMode:()=>this.resetSyncedAppearancePref(`chatFollowUpMode`),catalogOpenTarget:Je(this.settings.catalogOpenTarget),setCatalogOpenTarget:e=>this.setSetting(`catalogOpenTarget`,e),microphone:{devices:this.microphoneDevices,permissionRequired:this.microphonePermissionRequired,selectedDeviceId:this.settings.realtimeTalkInputDeviceId??``,loading:this.microphoneLoading,error:this.microphoneError},composerHoldToRecord:this.settings.composerHoldToRecord!==!1,setComposerHoldToRecord:e=>this.setSetting(`composerHoldToRecord`,e),onMicrophoneRefresh:()=>void this.refreshMicrophones(!0),onMicrophoneSelect:e=>this.selectMicrophone(e),camera:{devices:this.cameraDevices,permissionRequired:this.cameraPermissionRequired,selectedDeviceId:this.settings.realtimeTalkVideoDeviceId??``,loading:this.cameraLoading,error:this.cameraError},onCameraRefresh:()=>void this.refreshCameras(!0),onCameraSelect:e=>void this.selectCamera(e),gatewayUrl:this.context.gateway.connection.gatewayUrl,assistantName:this.context.config.current.assistantIdentity.name,configPath:n.configSnapshot?.path??null,navRootLabel:this.pageId===`advanced`?void 0:Ia(this.pageId),showRootTab:!r?.length,includeSections:r?[...r]:void 0,excludeSections:i,includeVirtualSections:this.pageId===`appearance`||this.pageId===`notifications`,settingsLayout:this.pageId===`advanced`?`accordion`:void 0,nativeNotifications:this.context.nativeNotifications?.snapshot,onNativeNotificationsRequestPermission:()=>this.context.nativeNotifications?.requestPermission(),onNativeNotificationsSendTest:()=>this.context.nativeNotifications?.sendTest(),webPush:this.context.webPush.snapshot,onWebPushSubscribe:()=>void this.context.webPush.enable(),onWebPushUnsubscribe:()=>void this.context.webPush.disable(),onWebPushTest:()=>void this.context.webPush.sendTest()};if(this.pageId===`mcp`)return Ln({configObject:e,pluginsHref:et(`plugins`,this.context.basePath),editor:Ma({...m,activeSection:`mcp`,activeSubsection:null,showModeToggle:!1,embeddedEditor:!0,navRootLabel:`MCP`})});if(this.pageId===`memory`)return Ur({configObject:e,mutationDisabled:this.isCuratedConfigMutationDisabled(),pluginsHref:et(`plugins`,this.context.basePath),memoryImportHref:et(`memory-import`,this.context.basePath),routeData:this.routeData,buildEditor:e=>Ma({...m,schema:oe(m.schema,e),activeSection:`memory`,activeSubsection:null,showModeToggle:!1,embeddedEditor:!0,navRootLabel:M(`tabs.memory`)})});if(this.pageId===`talk`)return Ci({configObject:e,mutationDisabled:this.isCuratedConfigMutationDisabled(),buildEditor:()=>Ma({...m,activeSection:`talk`,activeSubsection:null,showModeToggle:!1,embeddedEditor:!0,navRootLabel:M(`tabs.talk`)})});if(this.pageId===`security`){let n=t.state,r=this.isCuratedConfigMutationDisabled();return Yr({security:La(e),configBusy:r,canPairDevice:n.connected&&Ge(this.context.gateway.snapshot.hello?.auth??null),onPairMobile:()=>void this.context.overlays.openDevicePairSetup(),onBrowserEnabledToggle:e=>{if(e){t.removeFormValue([`browser`,`enabled`]);return}t.patchForm([`browser`,`enabled`],!1)},onBrowserEnabledReset:()=>t.removeFormValue([`browser`,`enabled`]),onToolProfileChange:e=>{if(e===`full`){t.removeFormValue([`tools`,`profile`]);return}t.patchForm([`tools`,`profile`],e)},onToolProfileReset:()=>t.removeFormValue([`tools`,`profile`]),editor:Ma({...m,embeddedEditor:!0})})}return Ma(m)}render(){let e=this.context.runtimeConfig.state,t=j(e.configForm??e.configSnapshot?.config)??{},n=this.renderAdvancedConfig(t);return D`
      ${this.pageId===`memory`?w:D`
            <section class="content-header">
              <div>
                <div class="page-title">${Ia(this.pageId)}</div>
              </div>
            </section>
          `}
      ${Kt(n)}
    `}},n([Ee({context:Ue,subscribe:!0})],$.prototype,`context`,void 0),n([O({attribute:`page-id`})],$.prototype,`pageId`,void 0),n([O({attribute:!1})],$.prototype,`routeData`,void 0),n([k()],$.prototype,`settings`,void 0),n([k()],$.prototype,`hiddenSessionCatalogIds`,void 0),n([k()],$.prototype,`systemInfo`,void 0),n([k()],$.prototype,`systemInfoUnavailable`,void 0),n([k()],$.prototype,`sessionObserverModels`,void 0),n([k()],$.prototype,`sessionObserverModelsUnavailable`,void 0),n([k()],$.prototype,`microphoneDevices`,void 0),n([k()],$.prototype,`microphonePermissionRequired`,void 0),n([k()],$.prototype,`microphoneLoading`,void 0),n([k()],$.prototype,`microphoneError`,void 0),n([k()],$.prototype,`cameraDevices`,void 0),n([k()],$.prototype,`cameraPermissionRequired`,void 0),n([k()],$.prototype,`cameraLoading`,void 0),n([k()],$.prototype,`cameraError`,void 0),n([k()],$.prototype,`formModes`,void 0),n([k()],$.prototype,`selections`,void 0),n([k()],$.prototype,`customThemeImport`,void 0),customElements.get(`openclaw-config-page`)||customElements.define(`openclaw-config-page`,$)}))();
//# sourceMappingURL=config-page-bUbCegxr.js.map