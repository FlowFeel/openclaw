import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Bo as i,Br as a,Gr as o,Hc as s,Ho as c,Hr as l,Ir as u,Jr as d,Kc as f,Kr as ee,Lr as te,Ro as p,Rr as m,Un as h,Vc as ne,Vr as re,Wc as ie,Wr as g,Xr as ae,Yr as oe,Zr as _,qr as se,rr as ce,zr as v}from"./control-ui-core-CrKLOOVi.js";import{K as y,Q as le,W as b,Y as x,a as ue,g as de,it as fe,m as pe,nt as S,o as me}from"./lit-runtime-D5xZwgO1.js";import{f as he,g as C,i as w,m as T,p as E,r as D}from"./control-ui-foundation-Dgui328h.js";import{Wt as O,_ as k,jt as A,ln as j,rn as M,v as N}from"./control-ui-core-CVcZBevq.js";import{en as P}from"./control-ui-foundation-DkfOBVsU.js";import{o as F,t as I}from"./control-ui-core-DkYXaYTI.js";import{pt as L,vt as R,yt as ge}from"./control-ui-core-CTll8UdE.js";import{i as _e,t as ve}from"./open-external-url-DvqodFBp.js";import{n as ye,t as be}from"./markdown-CTmZm9Ts.js";import{n as xe,t as Se}from"./settings-workspace-BbyrBOFl.js";import{d as Ce,f as z,h as we,i as B,p as V,s as Te,t as Ee,u as De}from"./settings-ui-D9oWnjak.js";import{n as Oe,t as ke}from"./gateway-page-controller-CyDiycE1.js";import{t as Ae}from"./agent-select-registration-tLb1rh76.js";import{n as H,t as U}from"./hub-tabs-DByyIl3h.js";import{a as je,c as Me,i as W,n as Ne,o as Pe,r as Fe,s as Ie,t as Le}from"./skills-shared-rvIJRVmL.js";import{i as Re,n as G,r as ze,t as Be}from"./plugins-Cv9cMFFw.js";function K(e){return e?_e(e,window.location.href):null}function Ve(e,t){switch(t){case`all`:return!0;case`ready`:return!e.disabled&&W(e);case`needs-setup`:return!e.disabled&&!W(e);case`disabled`:return e.disabled}throw Error(`Unsupported skills status filter`)}function He(e){return e.disabled?`muted`:W(e)?`ok`:`warn`}function Ue(e){return e.disabled?z({kind:`muted`,label:F(`skillsPage.tabs.disabled`)}):W(e)?z({kind:`ok`,label:F(`skillsPage.tabs.ready`)}):z({kind:`warn`,label:F(`skillsPage.tabs.needsSetup`)})}function q(e,t){let n=e.clawhub;return!n||n.status!==`linked`||!n.valid?null:t[u({registry:n.registry,slug:n.slug,version:n.installedVersion})]??null}function J(e){if(!e)return F(`skillsPage.verdict.unavailable`);let t=e.securityStatus?.trim()||null;return e.ok&&e.decision===`pass`?t===`clean`||!t?F(`skillsPage.verdict.clean`):t:F(t===`pending`||t===`not-run`?`skillsPage.verdict.pending`:t===`malicious`?`skillsPage.verdict.blocked`:t===`suspicious`?`skillsPage.verdict.review`:`skillsPage.verdict.unavailable`)}function We(e){if(!e)return`chip-warn`;if(e.ok&&e.decision===`pass`)return`chip-ok`;let t=e.securityStatus?.trim()||null;return t===`pending`||t===`not-run`?`chip`:`chip-warn`}function Ge(e){if(!e)return`warn`;if(e.ok&&e.decision===`pass`)return`ok`;let t=e.securityStatus?.trim()||null;return t===`pending`||t===`not-run`?`muted`:`warn`}function Y(e){return e.loading||e.operation!==null}function Ke(e,t){return e.operation?.kind===`skill`&&e.operation.skillKey===t}function X(e,t){return e.operation?.kind===`clawhub`&&e.operation.slug===t}function qe(e){let t=e.report?.skills??[],n={all:t.length,ready:0,"needs-setup":0,disabled:0};for(let e of t)e.disabled?n.disabled++:W(e)?n.ready++:n[`needs-setup`]++;let r=e.statusFilter===`all`?t:t.filter(t=>Ve(t,e.statusFilter)),i=P(e.filter),a=i?r.filter(e=>P([e.name,e.description,e.source].join(` `)).includes(i)):r,o=Pe(a),s=e.detailKey?t.find(t=>t.skillKey===e.detailKey)??null:null;return x`
    ${Te(x`
        ${Ye(e,n,a.length)}
        ${e.error?x`<div class="callout danger" role="alert">${e.error}</div>`:y}
        ${Xe(e)}
        ${a.length===0?B(!e.connected&&!e.report?F(`skillsPage.disconnected`):F(`skillsPage.empty`)):o.map(t=>Je(t,e))}
      `,{wide:!0})}
    ${s?$e(s,e):y}
    ${e.clawhubDetailSlug?Z(e):y}
  `}function Je(e,t){return x`
    <details class="settings-section skills-group" open>
      <summary class="settings-section__header skills-group__summary">
        <h2 class="settings-section__heading">
          ${e.label} <span class="settings-count">${e.skills.length}</span>
        </h2>
        <span class="skills-group__chevron" aria-hidden="true">${R.chevronDown}</span>
      </summary>
      <div class="settings-group">
        ${me(e.skills,e=>e.skillKey,e=>Qe(e,t))}
      </div>
    </details>
  `}function Ye(e,t,n){let r=i(e.agentsList?.agents??[]),a=r.some(t=>t.id===e.selectedAgentId)?e.selectedAgentId??``:r.some(t=>t.id===e.agentsList?.defaultId)?e.agentsList?.defaultId??``:r[0]?.id??``;return x`
    <div class="plugins-toolbar plugins-toolbar--fields">
      ${Ce({value:e.statusFilter,ariaLabel:F(`skillsPage.title`),options:Q.map(e=>({value:e.id,label:x`${F(e.labelKey)}
            <span class="settings-count">${t[e.id]}</span>`})),onChange:t=>e.onStatusFilterChange(t)})}
      ${r.length>0?x`
            <div class="plugins-field skills-toolbar__agent">
              <span>${F(`usage.filters.agent`)}</span>
              <openclaw-agent-select
                class="agent-select--settings"
                name="skills-agent"
                .options=${r.map(t=>{let n=c(t);return{value:t.id,label:t.id===e.agentsList?.defaultId?F(`skillsPage.defaultAgent`,{name:n}):n,agent:t}})}
                .value=${a}
                .accessibleLabel=${F(`usage.filters.agent`)}
                .disabled=${Y(e)||!e.connected||r.length<2}
                .onSelect=${e.onAgentChange}
              ></openclaw-agent-select>
            </div>
          `:y}
      <label class="plugins-field skills-toolbar__search">
        <span>${F(`common.search`)}</span>
        <input
          class="settings-input"
          .value=${e.filter}
          @input=${t=>e.onFilterChange(t.target.value)}
          placeholder=${F(`skillsPage.filterPlaceholder`)}
          autocomplete="off"
          name="skills-filter"
        />
      </label>
      <span class="plugins-toolbar__hint">
        ${F(`skillsPage.shown`,{count:String(n)})}
      </span>
      <button
        type="button"
        class="btn"
        ?disabled=${Y(e)||!e.connected}
        @click=${e.onRefresh}
      >
        ${e.loading?F(`common.loading`):F(`common.refresh`)}
      </button>
    </div>
  `}function Xe(e){return De({title:F(`skillsPage.clawHub`),description:F(`skillsPage.clawHubSubtitle`)},x`
      <div class="settings-row">
        <input
          class="settings-input plugins-row-input"
          .value=${e.clawhubQuery}
          @input=${t=>e.onClawHubQueryChange(t.target.value)}
          placeholder=${F(`skillsPage.searchClawHub`)}
          autocomplete="off"
          name="clawhub-search"
        />
        ${e.clawhubSearchLoading?x`<span class="plugins-toolbar__hint">${F(`skillsPage.searching`)}</span>`:y}
      </div>
      ${e.clawhubSearchError?x`<div class="callout danger plugins-group-message">${e.clawhubSearchError}</div>`:y}
      ${e.clawhubInstallMessage?x`<div
            class="callout ${e.clawhubInstallMessage.kind===`error`?`danger`:`success`} plugins-group-message"
          >
            <div
              style="max-width: 100%; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word;"
            >
              ${e.clawhubInstallMessage.text}
            </div>
            ${e.clawhubInstallMessage.acknowledgeSlug?x`<button
                  type="button"
                  class="btn btn--sm"
                  style="margin-top: 10px; white-space: normal;"
                  ?disabled=${Y(e)}
                  @click=${()=>e.onClawHubInstall(e.clawhubInstallMessage?.acknowledgeSlug??``,!0,e.clawhubInstallMessage?.acknowledgeVersion)}
                >
                  ${e.clawhubInstallMessage.acknowledgeLabel??F(`skillsPage.acknowledgeRisk`)}
                </button>`:y}
          </div>`:y}
      ${Ze(e)}
    `)}function Ze(e){let t=e.clawhubResults;return t?t.length===0?B(F(`skillsPage.noClawHubResults`)):x`
    ${t.map(t=>{let n=K(t.icon??void 0);return x`
        <div class="settings-row plugins-item plugins-item--clickable">
          <button
            type="button"
            class="settings-row__text plugins-item__detail-button clawhub-skill-result__button"
            aria-label=${F(`skillsPage.openDetails`,{name:t.displayName})}
            @click=${()=>e.onClawHubDetailOpen(t.slug)}
          >
            ${n?x`<img class="clawhub-skill-icon" src=${n} alt="" loading="lazy" />`:y}
            <span class="clawhub-skill-result__copy">
              <span class="settings-row__title">${t.displayName}</span>
              <span class="settings-row__desc">
                ${t.summary?h(t.summary,120):t.slug}
              </span>
            </span>
          </button>
          <div class="settings-row__control">
            ${t.version?we(`v${t.version}`):y}
            <button
              class="btn btn--sm"
              ?disabled=${Y(e)}
              @click=${()=>e.onClawHubInstall(t.slug)}
            >
              ${X(e,t.slug)?F(`skillsPage.installing`):F(`skillsPage.install`)}
            </button>
          </div>
        </div>
      `})}
  `:y}function Z(e){let t=e.clawhubDetail,n=K(t?.skill?.icon??void 0),r=n?null:K(t?.owner?.image??void 0),i=n??r;return x`
    <openclaw-modal-dialog
      label=${t?.skill?.displayName??e.clawhubDetailSlug??F(`skillsPage.notFound`)}
      style="--openclaw-modal-width: min(1040px, calc(100vw - 32px));"
      @modal-cancel=${e.onClawHubDetailClose}
    >
      <div class="md-preview-dialog__panel">
        <div class="md-preview-dialog__header">
          <div class="clawhub-skill-detail__identity">
            ${i?x`<img
                  class="clawhub-skill-icon clawhub-skill-icon--detail ${r?`clawhub-skill-icon--profile`:``}"
                  src=${i}
                  alt=""
                />`:y}
            <div class="md-preview-dialog__title">
              ${t?.skill?.displayName??e.clawhubDetailSlug}
            </div>
          </div>
          <button class="btn btn--sm" @click=${e.onClawHubDetailClose}>
            ${F(`skillsPage.close`)}
          </button>
        </div>
        <div class="md-preview-dialog__body" style="display: grid; gap: 16px;">
          ${e.clawhubDetailLoading?x`<div class="muted">${F(`common.loading`)}</div>`:e.clawhubDetailError?x`<div class="callout danger">${e.clawhubDetailError}</div>`:t?.skill?x`
                    <div style="font-size: 14px; line-height: 1.5;">
                      ${t.skill.summary??``}
                    </div>
                    ${t.owner?.displayName?x`<div class="muted" style="font-size: 13px;">
                          ${F(`skillsPage.by`)}
                          ${t.owner.displayName}${t.owner.handle?x` (@${t.owner.handle})`:y}
                        </div>`:y}
                    ${t.latestVersion?x`<div class="muted" style="font-size: 13px;">
                          ${F(`skillsPage.latest`,{version:t.latestVersion.version})}
                        </div>`:y}
                    ${t.latestVersion?.changelog?x`<div
                          style="font-size: 13px; border-top: 1px solid var(--border); padding-top: 12px; white-space: pre-wrap;"
                        >
                          ${t.latestVersion.changelog}
                        </div>`:y}
                    ${t.metadata?.os?x`<div class="muted" style="font-size: 12px;">
                          ${F(`skillsPage.platforms`,{platforms:t.metadata.os.join(`, `)})}
                        </div>`:y}
                    <button
                      class="btn primary"
                      ?disabled=${Y(e)}
                      @click=${()=>{e.clawhubDetailSlug&&e.onClawHubInstall(e.clawhubDetailSlug)}}
                    >
                      ${X(e,e.clawhubDetailSlug??``)?F(`skillsPage.installing`):F(`skillsPage.installNamed`,{name:t.skill.displayName})}
                    </button>
                  `:x`<div class="muted">${F(`skillsPage.notFound`)}</div>`}
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function Qe(e,t){let n=Y(t),r=q(e,t.clawhubVerdicts);return x`
    <div class="settings-row plugins-item plugins-item--clickable">
      <button
        type="button"
        class="settings-row__text plugins-item__detail-button"
        aria-label=${F(`skillsPage.openDetails`,{name:e.name})}
        @click=${()=>t.onDetailOpen(e.skillKey)}
      >
        <span class="settings-row__title">
          ${e.emoji?x`<span>${e.emoji}</span> `:y}${e.name}
        </span>
        <span class="settings-row__desc">${h(e.description,140)}</span>
      </button>
      <div class="settings-row__control">
        ${Ue(e)}
        ${e.clawhub?.status===`linked`?z({kind:Ge(r),label:J(r)}):e.clawhub?.status===`invalid`?z({kind:`warn`,label:F(`skillsPage.invalidLink`)}):y}
        ${V({checked:!e.disabled,disabled:n,ariaLabel:F(`skillsPage.enabledNamed`,{name:e.name}),onChange:()=>t.onToggle(e.skillKey,e.disabled)})}
      </div>
    </div>
  `}function $e(e,t){let n=Y(t),r=Ke(t,e.skillKey),i=t.edits[e.skillKey]??``,a=t.messages[e.skillKey]??null,o=new Set([...e.missing.bins,...e.missing.anyBins]),s=e.install.find(e=>e.bins.some(e=>o.has(e))),c=!!(e.bundled&&e.source!==`openclaw-bundled`),l=Le(e),u=Ne(e),d=q(e,t.clawhubVerdicts),f=t.detailTab===`card`&&e.skillCard?.present?`card`:`overview`;return x`
    <openclaw-modal-dialog
      label=${e.name}
      style="--openclaw-modal-width: min(1040px, calc(100vw - 32px));"
      @modal-cancel=${t.onDetailClose}
    >
      <div class="md-preview-dialog__panel">
        <div class="md-preview-dialog__header">
          <div
            class="md-preview-dialog__title"
            style="display: flex; align-items: center; gap: 8px;"
          >
            <span class="statusDot ${He(e)}"></span>
            ${e.emoji?x`<span style="font-size: 18px;">${e.emoji}</span>`:y}
            <span>${e.name}</span>
          </div>
          <button class="btn btn--sm" @click=${t.onDetailClose}>
            ${F(`skillsPage.close`)}
          </button>
        </div>
        <div class="md-preview-dialog__body" style="display: grid; gap: 16px;">
          <div>
            <div style="font-size: 14px; line-height: 1.5; color: var(--text);">
              ${e.description}
            </div>
            ${je({skill:e,showBundledBadge:c})}
          </div>

          ${e.clawhub||e.skillCard?.present?x`
                ${H({id:`skill-detail`,active:f,tabs:[{value:`overview`,label:F(`skillsPage.overview`)},...e.skillCard?.present?[{value:`card`,label:F(`skillsPage.skillCard`)}]:[]],ariaLabel:e.name,panelId:`skill-detail-panel`,variant:`sub`,onSelect:t.onDetailTabChange})}
              `:y}
          <div
            id="skill-detail-panel"
            role=${e.clawhub||e.skillCard?.present?`tabpanel`:y}
            aria-labelledby=${e.clawhub||e.skillCard?.present?`skill-detail-tab-${f}`:y}
          >
            ${f===`overview`?et(e,t,d):tt(e,t)}
          </div>
          ${l.length>0?x`
                <div
                  class="callout"
                  style="border-color: var(--warn-subtle); background: var(--warn-subtle); color: var(--warn);"
                >
                  <div style="font-weight: 600; margin-bottom: 4px;">
                    ${F(`skillsPage.missingRequirements`)}
                  </div>
                  <div>${l.join(`, `)}</div>
                </div>
              `:y}
          ${u.length>0?x`
                <div class="muted" style="font-size: 13px;">
                  ${F(`skillsPage.reason`,{reasons:u.join(`, `)})}
                </div>
              `:y}

          <div style="display: flex; align-items: center; gap: 12px;">
            ${V({checked:!e.disabled,disabled:n,ariaLabel:e.name,onChange:()=>t.onToggle(e.skillKey,e.disabled)})}
            <span style="font-size: 13px; font-weight: 500;">
              ${e.disabled?F(`skillsPage.disabled`):F(`skillsPage.enabled`)}
            </span>
            ${s?x`<button
                  class="btn"
                  ?disabled=${n}
                  @click=${()=>s&&t.onInstall(e.skillKey,e.name,s.id)}
                >
                  ${r?F(`skillsPage.installing`):s?.label}
                </button>`:y}
          </div>

          ${a?x`<div class="callout ${a.kind===`error`?`danger`:`success`}">
                ${a.message}
              </div>`:y}
          ${e.primaryEnv?x`
                <div style="display: grid; gap: 8px;">
                  <div class="field">
                    <span
                      >${F(`skillsPage.apiKey`)}
                      <span class="muted" style="font-weight: normal; font-size: 0.88em;"
                        >(${e.primaryEnv})</span
                      ></span
                    >
                    <input
                      type="password"
                      required
                      ?disabled=${n}
                      .value=${i}
                      @input=${n=>t.onEdit(e.skillKey,n.target.value)}
                    />
                  </div>
                  ${(()=>{let t=K(e.homepage);return t?x`<div class="muted" style="font-size: 13px;">
                          ${F(`skillsPage.getKey`)}
                          <a href="${t}" target="_blank" rel="noopener noreferrer"
                            >${e.homepage}</a
                          >
                        </div>`:y})()}
                  <button
                    class="btn primary"
                    ?disabled=${n||!i.trim()}
                    @click=${()=>t.onSaveKey(e.skillKey)}
                  >
                    ${F(`skillsPage.saveKey`)}
                  </button>
                </div>
              `:y}

          <div
            style="border-top: 1px solid var(--border); padding-top: 12px; display: grid; gap: 6px; font-size: 12px; color: var(--muted);"
          >
            <div>
              <span style="font-weight: 600;">${F(`skillsPage.source`)}</span> ${e.source}
            </div>
            <div style="font-family: var(--mono); word-break: break-all;">${e.filePath}</div>
            ${(()=>{let t=K(e.homepage);return t?x`<div>
                    <a href="${t}" target="_blank" rel="noopener noreferrer"
                      >${e.homepage}</a
                    >
                  </div>`:y})()}
          </div>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function et(e,t,n){let r=e.clawhub;if(!r)return y;if(r.status===`invalid`)return x`<div class="callout danger">
      <div style="font-weight: 600; margin-bottom: 4px;">${F(`skillsPage.invalidLink`)}</div>
      <div>${r.reason}</div>
    </div>`;let i=K(n?.securityAuditUrl??void 0),a=n?.reasons?.length?n.reasons.join(`, `):null;return x`
    <div
      class="callout"
      style="display: grid; gap: 8px; border-color: var(--border); background: var(--panel-strong);"
    >
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <span class="chip ${We(n)}">${J(n)}</span>
        <span class="muted" style="font-size: 12px;">${r.slug}@${r.installedVersion}</span>
        ${t.clawhubVerdictsLoading?x`<span class="muted">${F(`skillsPage.refreshing`)}</span>`:y}
      </div>
      ${t.clawhubVerdictsError?x`<div class="muted" style="font-size: 13px;">${t.clawhubVerdictsError}</div>`:a?x`<div class="muted" style="font-size: 13px;">${a}</div>`:y}
      ${i?x`<div style="font-size: 13px;">
            <a href="${i}" target="_blank" rel="noopener noreferrer"
              >${F(`skillsPage.fullSecurityReport`)}</a
            >
          </div>`:y}
    </div>
  `}function tt(e,t){if(!e.skillCard?.present)return y;let n=t.skillCardContents[e.skillKey];if(n===void 0){let n=t.skillCardErrors[e.skillKey];return n?x`<div class="callout danger">${n}</div>`:x`<div class="muted" style="font-size: 13px;">
      ${t.skillCardLoadingKey===e.skillKey?F(`skillsPage.loadingSkillCard`):F(`skillsPage.skillCardNotLoaded`)}
    </div>`}return x`
    <article class="sidebar-markdown" style="max-width: 100%; overflow-wrap: anywhere;">
      ${de(ye(n))}
    </article>
  `}var Q,nt=e((()=>{b(),ue(),pe(),Ae(),U(),ge(),be(),L(),Ee(),I(),p(),ce(),ve(),Ie(),Be(),Me(),Fe(),m(),s(),Q=[{id:`all`,labelKey:`skillsPage.tabs.all`},{id:`ready`,labelKey:`skillsPage.tabs.ready`},{id:`needs-setup`,labelKey:`skillsPage.tabs.needsSetup`},{id:`disabled`,labelKey:`skillsPage.tabs.disabled`}]})),$;e((()=>{D(),he(),b(),le(),A(),M(),N(),U(),Se(),I(),m(),Oe(),f(),ne(),ze(),nt(),t(),$=class extends ie{constructor(...e){super(...e),this.skillsAgentId=null,this.skillsAgentRevision=0,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillOperation=null,this.skillsFilter=``,this.skillsStatusFilter=`all`,this.skillEdits={},this.skillMessages={},this.skillsDetailKey=null,this.skillsDetailTab=`overview`,this.clawhubSearchQuery=``,this.clawhubDetail=null,this.clawhubDetailSlug=null,this.clawhubDetailLoading=!1,this.clawhubDetailError=null,this.clawhubInstallMessage=null,this.clawhubVerdicts={},this.clawhubVerdictsLoading=!1,this.clawhubVerdictsError=null,this.skillCardContents={},this.skillCardContentKeys={},this.skillCardLoadingKey=null,this.skillCardErrors={},this.clawhubSearchTimer=null,this.routeDataInitialized=!1,this.routeDataEnabled=!0,this.debouncedClawHubSearchQuery=``,this.gateway=new ke(this,{getGateway:()=>this.context?.gateway,invalidateRequests:()=>this.resetLoadedSkillState(),ensureInitialData:()=>this.ensureInitialData()}),this.clawhubSearchTask=new E(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.debouncedClawHubSearchQuery],task:([e,t],{signal:n})=>e&&t?d(e,t,n):T}),this.subscriptions=new r(this).effect(()=>this.context?.agents,e=>{let t=e.subscribe(()=>{this.reconcileAgentState(),this.requestUpdate()});return this.reconcileAgentState(),this.ensureInitialData(),t})}get runtimeConfig(){return this.context.runtimeConfig}get client(){return this.gateway.client}get connected(){return this.gateway.connected}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.ensureInitialData())}disconnectedCallback(){this.subscriptions.clear(),this.clawhubSearchTimer&&=(clearTimeout(this.clawhubSearchTimer),null),super.disconnectedCallback()}reconcileAgentState(){let e=this.context.agents.state;if(e.agentsList){let t=this.skillsAgentId;o(this,e.agentsList),t!==this.skillsAgentId&&(this.skillsDetailKey=null,this.skillsDetailTab=`overview`)}}resetLoadedSkillState(){this.clawhubSearchTask.run([null,``]),this.clawhubSearchTimer&&=(clearTimeout(this.clawhubSearchTimer),null),this.routeDataInitialized&&(this.routeDataEnabled=!1),this.skillsAgentId=null,this.skillsAgentRevision++,this.skillsLoading=!1,this.skillsReport=null,this.skillsError=null,this.skillOperation=null,this.skillEdits={},this.skillMessages={},this.skillsDetailKey=null,this.skillsDetailTab=`overview`,this.debouncedClawHubSearchQuery=``,this.clawhubDetail=null,this.clawhubDetailSlug=null,this.clawhubDetailLoading=!1,this.clawhubDetailError=null,this.clawhubInstallMessage=null,this.clawhubVerdicts={},this.clawhubVerdictsLoading=!1,this.clawhubVerdictsError=null,this.skillCardContents={},this.skillCardContentKeys={},this.skillCardLoadingKey=null,this.skillCardErrors={}}applyRouteData(){let e=this.routeData;if(e){if(this.routeDataInitialized=!0,this.routeDataEnabled=!0,!this.gateway.isRouteDataCurrent(e)||e.agents!==this.context.agents){this.routeDataEnabled=!1;return}this.skillsAgentId&&e.selectedAgentId&&e.selectedAgentId!==this.skillsAgentId||(this.skillsAgentId=e.selectedAgentId??this.skillsAgentId,this.skillsLoading=!1,this.skillsReport=e.report,this.skillsError=e.error)}}ensureInitialData(){if(!this.gateway.connected||!this.gateway.client||this.routeDataEnabled&&(this.routeData?.agentsList||this.routeData?.report||this.routeData?.error))return;let e=this.context.agents.state;!e.agentsList&&!e.agentsLoading&&this.loadAgents(),!this.skillsReport&&!this.skillsLoading&&g(this),this.clawhubSearchQuery.trim()&&this.clawhubSearchTask.status!==C.PENDING&&this.clawhubSearchResults===null&&this.clawhubSearchError===null&&this.runClawHubSearch(this.clawhubSearchQuery)}async loadAgents(){if(!this.gateway.client||!this.gateway.connected)return;let e=this.context.agents;e.state.agentsList||await e.ensureList(),this.context.agents===e&&this.reconcileAgentState()}async refreshPage(){await ee(this,()=>this.loadAgents())}changeAgent(e){if(this.skillOperation||this.skillsLoading)return;let t=this.skillsAgentId;oe(this,e),t!==this.skillsAgentId&&(this.skillsDetailKey=null,this.skillsDetailTab=`overview`),g(this,{clearMessages:!0})}changeClawHubQuery(e){this.clawhubSearchQuery=e,this.clawhubInstallMessage=null,this.debouncedClawHubSearchQuery=``,this.clawhubSearchTask.run([null,``]),this.clawhubSearchTimer&&clearTimeout(this.clawhubSearchTimer),this.clawhubSearchTimer=setTimeout(()=>this.runClawHubSearch(e),300)}runClawHubSearch(e){let t=e.trim();if(this.debouncedClawHubSearchQuery=t,!t||!this.gateway.connected||!this.gateway.client){this.clawhubSearchTask.run([null,``]);return}this.clawhubSearchTask.run([this.gateway.client,t])}get clawhubSearchResults(){return this.clawhubSearchTask.status===C.COMPLETE&&this.debouncedClawHubSearchQuery===this.clawhubSearchQuery.trim()?this.clawhubSearchTask.value??null:null}get clawhubSearchLoading(){return this.debouncedClawHubSearchQuery.length>0&&this.clawhubSearchTask.status===C.PENDING}get clawhubSearchError(){if(this.clawhubSearchTask.status!==C.ERROR||this.debouncedClawHubSearchQuery!==this.clawhubSearchQuery.trim())return null;let e=this.clawhubSearchTask.error;return e instanceof Error?e.message:String(e)}changeDetailTab(e){this.skillsDetailTab=e,e===`card`&&this.skillsDetailKey&&l(this,this.skillsDetailKey)}selectHubTab(e){if(e!==`skills`){if(e===`workshop`){this.context.navigate(`skill-workshop`);return}this.context.navigate(`plugins`,{pathname:j(e,this.context.basePath)})}}render(){let e=this.context.agents.state,t=this.skillsError??e.agentsError;return x`
      <section class="content-header content-header--page plugins-content-header">
        <div>
          <h1 class="page-title">${O(`skills`)}</h1>
        </div>
      </section>
      ${xe(x`
        <div class="plugins-hub-tabs-row">
          ${H({id:`plugins`,active:`skills`,tabs:Re(),ariaLabel:F(`pluginsPage.hubTablistLabel`),panelId:G,className:`plugins-tabs`,onSelect:e=>this.selectHubTab(e)})}
        </div>
        <wa-tab-panel
          id=${G}
          name="skills"
          active
          aria-labelledby="plugins-tab-skills"
        >
          ${qe({connected:this.gateway.connected,loading:this.skillsLoading||e.agentsLoading,report:this.skillsReport,agentsList:e.agentsList,selectedAgentId:this.skillsAgentId??e.agentsList?.defaultId??null,error:t,filter:this.skillsFilter,statusFilter:this.skillsStatusFilter,edits:this.skillEdits,messages:this.skillMessages,operation:this.skillOperation,detailKey:this.skillsDetailKey,detailTab:this.skillsDetailTab,clawhubVerdicts:this.clawhubVerdicts,clawhubVerdictsLoading:this.clawhubVerdictsLoading,clawhubVerdictsError:this.clawhubVerdictsError,skillCardContents:this.skillCardContents,skillCardLoadingKey:this.skillCardLoadingKey,skillCardErrors:this.skillCardErrors,clawhubQuery:this.clawhubSearchQuery,clawhubResults:this.clawhubSearchResults,clawhubSearchLoading:this.clawhubSearchLoading,clawhubSearchError:this.clawhubSearchError,clawhubDetail:this.clawhubDetail,clawhubDetailSlug:this.clawhubDetailSlug,clawhubDetailLoading:this.clawhubDetailLoading,clawhubDetailError:this.clawhubDetailError,clawhubInstallMessage:this.clawhubInstallMessage,onAgentChange:e=>this.changeAgent(e),onFilterChange:e=>this.skillsFilter=e,onStatusFilterChange:e=>this.skillsStatusFilter=e,onRefresh:()=>void this.refreshPage(),onToggle:(e,t)=>void _(this,e,t),onEdit:(e,t)=>ae(this,e,t),onSaveKey:e=>void se(this,e),onInstall:(e,t,n)=>void a(this,e,t,n),onDetailOpen:e=>{this.skillsDetailKey=e,this.skillsDetailTab=`overview`},onDetailClose:()=>this.skillsDetailKey=null,onDetailTabChange:e=>this.changeDetailTab(e),onClawHubQueryChange:e=>this.changeClawHubQuery(e),onClawHubDetailOpen:e=>void re(this,e),onClawHubDetailClose:()=>te(this),onClawHubInstall:(e,t,n)=>void v(this,e,t,n)})}
        </wa-tab-panel>
      `)}
    `}},n([w({context:k,subscribe:!0})],$.prototype,`context`,void 0),n([fe({attribute:!1})],$.prototype,`routeData`,void 0),n([S()],$.prototype,`skillsAgentId`,void 0),n([S()],$.prototype,`skillsAgentRevision`,void 0),n([S()],$.prototype,`skillsLoading`,void 0),n([S()],$.prototype,`skillsReport`,void 0),n([S()],$.prototype,`skillsError`,void 0),n([S()],$.prototype,`skillOperation`,void 0),n([S()],$.prototype,`skillsFilter`,void 0),n([S()],$.prototype,`skillsStatusFilter`,void 0),n([S()],$.prototype,`skillEdits`,void 0),n([S()],$.prototype,`skillMessages`,void 0),n([S()],$.prototype,`skillsDetailKey`,void 0),n([S()],$.prototype,`skillsDetailTab`,void 0),n([S()],$.prototype,`clawhubSearchQuery`,void 0),n([S()],$.prototype,`clawhubDetail`,void 0),n([S()],$.prototype,`clawhubDetailSlug`,void 0),n([S()],$.prototype,`clawhubDetailLoading`,void 0),n([S()],$.prototype,`clawhubDetailError`,void 0),n([S()],$.prototype,`clawhubInstallMessage`,void 0),n([S()],$.prototype,`clawhubVerdicts`,void 0),n([S()],$.prototype,`clawhubVerdictsLoading`,void 0),n([S()],$.prototype,`clawhubVerdictsError`,void 0),n([S()],$.prototype,`skillCardContents`,void 0),n([S()],$.prototype,`skillCardContentKeys`,void 0),n([S()],$.prototype,`skillCardLoadingKey`,void 0),n([S()],$.prototype,`skillCardErrors`,void 0),customElements.get(`openclaw-skills-page`)||customElements.define(`openclaw-skills-page`,$)}))();
//# sourceMappingURL=skills-page-L8jvsauu.js.map