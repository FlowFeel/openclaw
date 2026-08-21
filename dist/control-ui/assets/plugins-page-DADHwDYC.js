import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,In as i,Kc as a,Ln as o,Rn as s,Vc as c,Wc as ee,_i as te,as as ne,ci as re,dc as l,di as ie,gi as ae,hi as oe,is as se,li as ce,mi as le,oi as ue,pi as de,si as fe,uc as pe,ui as u}from"./control-ui-core-UWR2ANgr.js";import{K as d,Q as me,W as f,Y as p,a as he,d as ge,it as _e,nt as m,o as h,p as ve}from"./lit-runtime-D5xZwgO1.js";import{f as ye,g,i as be,m as _,p as v,r as xe}from"./control-ui-foundation-Dgui328h.js";import{Rt as Se,Ut as Ce,Wt as we,X as Te,Y as Ee,_ as De,bt as Oe,jt as ke,ln as Ae,rn as je,un as Me,v as Ne,wt as Pe}from"./control-ui-core-DDTXn_ud.js";import{Ct as Fe,Kt as y}from"./control-ui-foundation-DkfOBVsU.js";import{o as b,t as x}from"./control-ui-core-BCL4Sy8S.js";import{G as Ie,pt as Le,vt as S,yt as Re}from"./control-ui-core-DS6N4FyQ.js";import{n as ze,t as Be}from"./settings-workspace-BbyrBOFl.js";import{d as Ve,f as C,i as w,n as He,s as Ue,t as T,u as E}from"./settings-ui-Ci_wwIOc.js";import{n as We,t as Ge}from"./gateway-page-controller-jbE-wF7H.js";import{n as Ke,t as qe}from"./hub-tabs-DByyIl3h.js";import{a as D,c as Je,i as Ye,n as Xe,o as O,r as k,s as Ze,t as Qe}from"./presentation-BFOHOIy5.js";import{a as $e,c as et,i as tt,l as nt,n as A,o as rt,r as it,s as at,t as ot,u as st}from"./mcp-servers-DAQApepI.js";import{n as ct,r as lt}from"./icon-loader-DwYnShv4.js";import{i as ut,n as dt,r as ft,t as pt}from"./plugins-C9ZVX_ih.js";function mt(e){switch(e){case`all`:return b(`pluginsPage.filterAll`);case`enabled`:return b(`pluginsPage.enabled`);case`disabled`:return b(`pluginsPage.disabled`);case`issues`:return b(`pluginsPage.filterIssues`);default:return e}}function ht(e){switch(e){case`work`:return b(`pluginsPage.connectorGroupWork`);case`dev`:return b(`pluginsPage.connectorGroupDev`);case`home`:return b(`pluginsPage.connectorGroupHome`);case`life`:return b(`pluginsPage.connectorGroupLife`);default:return e}}function j(e){return`plugin:${e}`}function gt(e){return`clawhub:${e}`}function M(e){return`connector:${e}`}function N(e){return e.trim().toLocaleLowerCase()}function P(e,t){let n=N(t);return!n||[e.name,e.id,e.packageName,e.description,e.origin,e.category,...e.kind??[]].some(e=>e?.toLocaleLowerCase().includes(n))}function _t(e,t){let n=N(t);return!n||[e.id,e.name,b(e.descriptionKey)].some(e=>e.toLocaleLowerCase().includes(n))}function F(e){return e.toSorted((e,t)=>{let n=Number(!!t.featured)-Number(!!e.featured);if(n!==0)return n;if(e.featured&&t.featured){let n=e.featuredAt,r=t.featuredAt;if(n!==void 0||r!==void 0){if(n===void 0)return 1;if(r===void 0)return-1;if(n!==r)return r-n}}return(e.order??2**53-1)-(t.order??2**53-1)||e.name.localeCompare(t.name)})}function vt(e,t=``,n=`all`){return F(e.filter(e=>{if(!e.installed||!P(e,t))return!1;switch(n){case`enabled`:return e.enabled&&e.state!==`error`;case`disabled`:return!e.enabled&&e.state!==`error`;case`issues`:return e.state===`error`;default:return!0}}))}function yt(e){let t=new Map;for(let n of e){let e=n.category??`other`,r=t.get(e)??[];r.push(n),t.set(e,r)}let n=e=>{let t=k.indexOf(e);return t===-1?k.length:t};return[...t.entries()].map(([e,t])=>({category:e,label:O(e),plugins:t})).toSorted((e,t)=>n(e.category)-n(t.category))}function bt(e,t=``){let n=F(e.filter(e=>e.featured&&P(e,t))),r=new Set(n.map(e=>e.id));return{featured:n,official:F(e.filter(e=>!r.has(e.id)&&e.origin===`official`&&!e.installed&&P(e,t))),connectors:Xe.filter(e=>_t(e,t))}}function I(e,t,n,r,i=`plugins-tile`){let a=D(e);if(a)return p`<span class=${i}>
      <img src=${a} alt="" loading="lazy" decoding="async" />
    </span>`;if(n)return p`<span class=${i}>
      <img
        class="plugins-icon"
        src=${n}
        alt=""
        loading="lazy"
        decoding="async"
        @error=${r}
      />
    </span>`;let[o,s]=Ze(e),c=Je(t);return p`<span
    class=${`${i} ${i}--fallback`}
    style=${`--plugins-art-a:${o};--plugins-art-b:${s}`}
    aria-hidden="true"
  >
    ${c?p`<span>${c}</span>`:S.puzzle}
  </span>`}function xt(e){switch(e.state){case`enabled`:return b(`pluginsPage.enabled`);case`disabled`:return b(`pluginsPage.disabled`);case`error`:return b(`pluginsPage.needsAttention`);case`not-installed`:return b(`pluginsPage.available`);default:return e.state}}function L(e){return C({kind:e.state===`enabled`?`ok`:e.state===`error`?`danger`:`muted`,label:xt(e)})}function R(e){return e.state===`error`?L(e):d}function z(e){switch(e){case`bundled`:return b(`pluginsPage.included`);case`global`:return b(`pluginsPage.global`);case`workspace`:return b(`pluginsPage.workspace`);case`config`:return b(`pluginsPage.config`);case`official`:return b(`pluginsPage.official`);default:return e}}function B(e){let t=e.filter(e=>e!==d&&e!==``);return t.length===0?d:p`<span class="settings-row__desc plugins-meta">
    ${t.map((e,t)=>p`${t>0?p`<span aria-hidden="true"> · </span>`:d}${e}`)}
  </span>`}function V(e,t,n,r){if(!t)return d;let i=t.kind===`error`?`alert`:`status`;return p`
    <div class="plugins-row-message plugins-row-message--${t.kind}" role=${i}>
      <span>${t.text}</span>
      ${t.acknowledge?p`
            <button
              type="button"
              class="btn btn--sm"
              title=${r.mutationBlockedReason??``}
              ?disabled=${n||!r.canMutate}
              @click=${()=>r.onInstall(e,{source:`clawhub`,packageName:t.acknowledge?.packageName??``,...t.acknowledge?.version?{version:t.acknowledge.version}:{},acknowledgeClawHubRisk:!0})}
            >
              ${b(n?`pluginsPage.installing`:`pluginsPage.acknowledgeRisk`)}
            </button>
          `:d}
    </div>
  `}function H(e){return!!e.target?.closest(`button, a, input, label, form, [role='menu']`)}function U(e,t,n){let r=!n.enabled;return p`
    <button
      type="button"
      class="btn btn--sm"
      title=${e.mutationBlockedReason??``}
      ?disabled=${!e.canMutate||t}
      @click=${e=>{e.stopPropagation(),n.onToggle(r)}}
    >
      ${b(t?`pluginsPage.working`:r?`pluginsPage.enableAction`:`pluginsPage.disableAction`)}
    </button>
  `}function W(e,t,n,r){return p`
    <button
      type="button"
      class="btn btn--sm btn--icon plugins-remove"
      aria-label=${b(`pluginsPage.removeNamed`,{name:n})}
      title=${e.mutationBlockedReason??b(`pluginsPage.removeNamed`,{name:n})}
      ?disabled=${!e.canMutate||t}
      @click=${e=>{e.stopPropagation(),r()}}
    >
      ${S.trash}
    </button>
  `}function G(e,t,n,r,i){return p`
    <button
      type="button"
      class="btn btn--sm plugins-install"
      title=${e.mutationBlockedReason??``}
      aria-label=${b(`pluginsPage.installNamed`,{name:r})}
      ?disabled=${!e.canMutate||t}
      @click=${t=>{t.stopPropagation(),e.onInstall(n,i)}}
    >
      ${b(t?`pluginsPage.installing`:`pluginsPage.install`)}
    </button>
  `}function K(e,t,n,r){return p`
    <span
      class="plugins-remove-confirm"
      role="alertdialog"
      aria-label=${b(`pluginsPage.removeNamed`,{name:e.name})}
    >
      <span>${b(`pluginsPage.removeConfirm`)}</span>
      <button
        type="button"
        class="btn btn--sm danger"
        ?disabled=${n||!t.canMutate}
        @click=${n=>{n.stopPropagation(),t.onUninstall(e.id,r)}}
      >
        ${b(n?`pluginsPage.removing`:`pluginsPage.remove`)}
      </button>
      <button
        type="button"
        class="btn btn--sm"
        ?disabled=${n}
        @click=${e=>{e.stopPropagation(),t.onCancelUninstall(r)}}
      >
        ${b(`pluginsPage.cancel`)}
      </button>
    </span>
  `}function q(e,t,n,r){if(t.pendingRemoval[r])return K(e,t,n,r);if(!e.installed){let i=e.install;return i?G(t,n,r,e.name,i):p`<span class="plugins-action-note">${b(`pluginsPage.unavailable`)}</span>`}return p`
    ${U(t,n,{enabled:e.enabled,onToggle:n=>t.onSetEnabled(e.id,n,r)})}
    ${e.removable?W(t,n,e.name,()=>t.onRequestUninstall(r)):d}
  `}function St(e){let t=(e.result?.plugins??[]).filter(e=>e.installed),n=t.filter(e=>e.state===`error`).length,r=t.filter(e=>e.enabled&&e.state!==`error`).length,i={all:t.length,enabled:r,disabled:t.length-r-n,issues:n};return Ve({value:e.installedFilter,ariaLabel:b(`pluginsPage.filterLabel`),options:Lt.map(e=>({value:e,label:p`${mt(e)} <span class="settings-count">${i[e]}</span>`})),onChange:t=>e.onFilterChange(t)})}function J(e){return p`
    <h3 class="settings-row__title">
      ${e.onShowDetails?p`
            <button
              type="button"
              class="plugins-item__detail-button"
              aria-label=${e.name}
              @click=${t=>{t.stopPropagation(),e.onShowDetails?.()}}
            >
              ${e.content}
            </button>
          `:e.content}
    </h3>
  `}function Y(e,t,n=!1){let r=j(e.id),i=t.busy[r]??!1;return p`
    <article
      class="settings-row plugins-item plugins-item--clickable"
      data-plugin-id=${e.id}
      data-plugin-source=${e.origin??`unknown`}
      data-plugin-status=${e.state}
      aria-busy=${i?`true`:`false`}
      @click=${n=>{H(n)||t.onShowDetails(e.id)}}
    >
      ${I(e.id,e.name,t.iconUrls[e.id],()=>t.onIconError(e.id))}
      <div class="settings-row__text">
        ${J({name:e.name,content:p`
            ${e.name}
            ${e.version?p`<span class="plugins-version">v${e.version}</span>`:d}
          `,onShowDetails:()=>t.onShowDetails(e.id)})}
        <span class="settings-row__desc">
          ${e.description||b(`pluginsPage.optionalCapability`)}
        </span>
        ${B([e.origin?z(e.origin):d,n&&e.packageName?p`<span class="plugins-meta__mono">${e.packageName}</span>`:d])}
      </div>
      <div class="settings-row__control">
        ${e.installed?R(e):d}
        ${q(e,t,i,r)}
      </div>
      ${e.error?p`<div class="plugins-row-message plugins-row-message--error" role="alert">
            ${e.error}
          </div>`:d}
      ${V(r,t.messages[r],i,t)}
    </article>
  `}function Ct(e){let t=N(e.query),n=e.mcpServers?.filter(e=>!t||e.name.toLocaleLowerCase().includes(t)||e.target.toLocaleLowerCase().includes(t));if(t&&n&&n.length===0)return d;let r=n?n.length===0?w(b(`pluginsPage.mcpEmpty`)):h(n,e=>e.name,t=>wt(t,e)):p`<div class="plugins-search-state" role="status">${b(`pluginsPage.loading`)}</div>`;return E({title:b(`pluginsPage.mcpServersGroup`),...n?{count:n.length}:{},description:b(`pluginsPage.mcpHint`),actions:p`
        <a class="plugins-group__link" href=${e.mcpSettingsHref}
          >${b(`pluginsPage.mcpSettingsLink`)}</a
        >
        <button
          type="button"
          class="btn btn--sm"
          title=${e.mutationBlockedReason??``}
          ?disabled=${!e.canMutate||e.mcpBusy}
          @click=${()=>e.onMcpFormToggle(!e.mcpFormOpen)}
        >
          <span aria-hidden="true">${S.plus}</span>
          ${b(`mcpServers.add`)}
        </button>
      `},p`
      ${e.mcpFormOpen?st({busy:e.mcpBusy,disabled:!e.canMutate,blockedReason:e.mutationBlockedReason,onSubmit:e.onMcpAdd,onCancel:()=>e.onMcpFormToggle(!1)}):d}
      ${e.mcpMessage?p`<div
            class="plugins-row-message plugins-row-message--${e.mcpMessage.kind} plugins-group-message"
            role=${e.mcpMessage.kind===`error`?`alert`:`status`}
          >
            <span>${e.mcpMessage.text}</span>
          </div>`:d}
      ${r}
    `)}function wt(e,t){return p`
    <article class="settings-row plugins-item" data-mcp-name=${e.name}>
      ${I(e.name,e.name)}
      <div class="settings-row__text">
        <h3 class="settings-row__title">${e.name}</h3>
        <span class="settings-row__desc plugins-meta__mono">
          ${e.target||b(`mcpServers.missingTransport`)}
        </span>
        ${B([b(`pluginsPage.mcp`),e.transport,e.auth===`oauth`?b(`pluginsPage.oauth`):d])}
      </div>
      <div class="settings-row__control">
        ${U(t,t.mcpBusy,{enabled:e.enabled,onToggle:n=>t.onMcpToggle(e.name,n)})}
        ${W(t,t.mcpBusy,e.name,()=>t.onMcpRemove(e.name))}
      </div>
    </article>
  `}function Tt(e){let t=yt(vt(e.result?.plugins??[],e.query,e.installedFilter)),n=!!(e.query||e.installedFilter!==`all`);return p`
    ${t.length===0?Z(b(n?`pluginsPage.noInstalledMatchTitle`:`pluginsPage.noInstalledTitle`),b(n?`pluginsPage.noMatchBody`:`pluginsPage.noInstalledBody`),n?`curious`:`sleepy`):t.map(t=>E({title:t.label,count:t.plugins.length},h(t.plugins,e=>e.id,t=>Y(t,e,!0))))}
    ${Ct(e)}
  `}function Et(e,t){let n=M(e.id),r=t.busy[n]??!1,i=e.action.kind===`mcp`,a=i&&!!t.mcpServers?.some(t=>e.action.kind===`mcp`&&t.name===e.action.mcp.serverName);return p`
    <article
      class="settings-row plugins-item"
      data-connector-id=${e.id}
      aria-busy=${r?`true`:`false`}
    >
      ${I(e.id,e.name)}
      <div class="settings-row__text">
        <h3 class="settings-row__title">${e.name}</h3>
        <span class="settings-row__desc">${b(e.descriptionKey)}</span>
        ${B(i?[b(`pluginsPage.mcp`),b(`pluginsPage.connectorMcpNote`)]:[b(`pluginsPage.connectorClawHubNote`)])}
      </div>
      <div class="settings-row__control">
        ${i?a?C({kind:`ok`,label:b(`pluginsPage.connectorAdded`)}):p`
                <button
                  type="button"
                  class="btn btn--sm"
                  title=${t.mutationBlockedReason??``}
                  ?disabled=${!t.canMutate||r}
                  @click=${()=>t.onAddConnector(e)}
                >
                  ${b(r?`mcpServers.adding`:`pluginsPage.connectorAdd`)}
                </button>
              `:p`
              <button
                type="button"
                class="btn btn--sm"
                @click=${()=>e.action.kind===`clawhub`&&t.onSearchClawHub(e.action.query)}
              >
                <span aria-hidden="true">${S.search}</span>
                ${b(`pluginsPage.connectorSearch`)}
              </button>
            `}
      </div>
      ${V(n,t.messages[n],r,t)}
    </article>
  `}function Dt(e,t){return t.length===0?d:E({title:e,count:t.length},t)}function Ot(e,t){return t.find(t=>t.installed&&(t.id===e.package.runtimeId||t.packageName===e.package.name||t.install?.source===`clawhub`&&t.install.packageName===e.package.name))}function kt(e){return e===`source-linked`?b(`pluginsPage.verifiedSource`):e}function At(e,t){let n=e.package,r=Ot(e,t.result?.plugins??[]),i=gt(n.name),a=t.busy[i]??!1,o=n.runtimeId??n.name;return p`
    <article
      class="settings-row plugins-item ${r?`plugins-item--clickable`:``}"
      data-package-name=${n.name}
      data-plugin-source="clawhub"
      data-plugin-status=${r?.state??`not-installed`}
      aria-busy=${a?`true`:`false`}
      @click=${e=>{r&&!H(e)&&t.onShowDetails(r.id)}}
    >
      ${I(o,n.displayName)}
      <div class="settings-row__text">
        ${J({name:n.displayName,content:p`
            ${n.displayName}
            ${n.latestVersion?p`<span class="plugins-version">v${n.latestVersion}</span>`:d}
          `,onShowDetails:r?()=>t.onShowDetails(r.id):void 0})}
        <span class="settings-row__desc">${n.summary||n.name}</span>
        ${B([n.isOfficial?b(`pluginsPage.official`):d,n.verificationTier?kt(n.verificationTier):d,typeof n.downloads==`number`?p`<span class="plugins-downloads">
                <span aria-hidden="true">${S.download}</span>
                ${Rt.format(n.downloads)}
              </span>`:d,n.family===`bundle-plugin`?b(`pluginsPage.bundlePlugin`):b(`pluginsPage.codePlugin`)])}
      </div>
      <div class="settings-row__control">
        ${r?p`${R(r)}${q(r,t,a,i)}`:G(t,a,i,n.displayName,{source:`clawhub`,packageName:n.name})}
      </div>
      ${V(i,t.messages[i],a,t)}
    </article>
  `}function jt(e){let t=e.query.trim();if(t.length<2)return d;let n;return n=e.searchLoading||!e.searchResults&&!e.searchError?p`<div class="plugins-search-state" role="status">
      ${b(`pluginsPage.searching`)}
    </div>`:e.searchError?p`<div class="plugins-search-state plugins-search-state--error" role="alert">
      ${e.searchError}
    </div>`:e.searchResults&&e.searchResults.length===0?p`${w(b(`pluginsPage.noClawHubResultsBody`,{query:t}))}`:p`
      ${h(e.searchResults??[],e=>e.package.name,t=>At(t,e))}
    `,E({title:b(`pluginsPage.fromClawHub`),...e.searchResults?{count:e.searchResults.length}:{},actions:p`
        <a
          class="plugins-group__link"
          href=${ce}
          target=${i}
          rel=${o()}
        >
          ${b(`pluginsPage.browseClawHub`)}
          <span class="plugins-group__link-icon" aria-hidden="true">${S.externalLink}</span>
        </a>
      `},n)}function Mt(e){let t=bt(e.result?.plugins??[],e.query),n=t.featured.map(t=>Y(t,e)),r=t.official.map(t=>Y(t,e)),i=jt(e);return!n.length&&!r.length&&!t.connectors.length?p`
      ${i===d?Z(b(`pluginsPage.noDiscoverMatchTitle`),b(`pluginsPage.noMatchBody`),`curious`):d}
      ${i}
    `:p`
    ${Dt(b(`pluginsPage.featuredGroup`),n)}
    ${Dt(b(`pluginsPage.officialGroup`),r)}
    ${Nt(t.connectors,e)} ${i}
  `}function Nt(e,t){if(e.length===0)return d;let n=Qe.map(t=>({group:t,entries:e.filter(e=>e.group===t)})).filter(e=>e.entries.length>0);return E({title:b(`pluginsPage.connectorsGroup`),count:e.length,description:b(`pluginsPage.connectorsHint`)},n.map(e=>p`
        <h3 class="plugins-subheader" data-connector-group=${e.group}>
          ${ht(e.group)}
        </h3>
        ${e.entries.map(e=>Et(e,t))}
      `))}function X(e,t){return p`
    <div class="plugins-detail__meta-row">
      <span class="plugins-detail__meta-label">${e}</span>
      <span class="plugins-detail__meta-value">${t}</span>
    </div>
  `}function Pt(e){let t=e.detailPluginId?e.result?.plugins.find(t=>t.id===e.detailPluginId):void 0;if(!t)return d;let n=j(t.id),r=e.busy[n]??!1;return p`
    <openclaw-modal-dialog
      label=${t.name}
      style="--openclaw-modal-width: min(580px, calc(100vw - 32px));"
      @modal-cancel=${()=>e.onShowDetails(null)}
    >
      <section class="plugins-detail" data-detail-plugin-id=${t.id}>
        <button
          type="button"
          class="btn btn--sm btn--icon plugins-detail__close"
          aria-label=${b(`pluginsPage.detailClose`)}
          @click=${()=>e.onShowDetails(null)}
        >
          ${S.x}
        </button>
        ${I(t.id,t.name,e.iconUrls[t.id],()=>e.onIconError(t.id),`plugins-cover`)}
        <div class="plugins-detail__body">
          <div class="plugins-detail__title">
            <h2>${t.name}</h2>
            ${t.version?p`<span class="plugins-version">v${t.version}</span>`:d}
            ${L(t)}
          </div>
          <p class="plugins-detail__description">
            ${t.description||b(`pluginsPage.optionalCapability`)}
          </p>
          <div class="plugins-detail__actions">
            ${e.pendingRemoval[n]?K(t,e,r,n):p`
                  ${t.installed?p`
                        <button
                          type="button"
                          class="btn ${t.enabled?``:`primary`}"
                          title=${e.mutationBlockedReason??``}
                          ?disabled=${!e.canMutate||r}
                          @click=${()=>e.onSetEnabled(t.id,!t.enabled,n)}
                        >
                          ${r?b(`pluginsPage.working`):t.enabled?b(`pluginsPage.disableAction`):b(`pluginsPage.enableAction`)}
                        </button>
                      `:t.install?G(e,r,n,t.name,t.install):d}
                  ${t.removable?p`
                        <button
                          type="button"
                          class="btn plugins-detail__remove"
                          title=${e.mutationBlockedReason??``}
                          ?disabled=${!e.canMutate||r}
                          @click=${()=>e.onRequestUninstall(n)}
                        >
                          <span aria-hidden="true">${S.trash}</span>
                          ${b(`pluginsPage.remove`)}
                        </button>
                      `:d}
                `}
          </div>
          ${t.error?p`<div class="plugins-row-message plugins-row-message--error" role="alert">
                ${t.error}
              </div>`:d}
          ${V(n,e.messages[n],r,e)}
          <div class="plugins-detail__meta">
            ${t.origin?X(b(`pluginsPage.detailOrigin`),z(t.origin)):d}
            ${t.category?X(b(`pluginsPage.detailCategory`),O(t.category)):d}
            ${t.packageName?X(b(`pluginsPage.detailPackage`),p`<code>${t.packageName}</code>`):d}
            ${X(b(`pluginsPage.detailPluginId`),p`<code>${t.id}</code>`)}
          </div>
        </div>
      </section>
    </openclaw-modal-dialog>
  `}function Z(e,t,n){return p`
    <div class="plugins-empty">
      <!-- Sleepy marks truly empty inventory; curious marks a filter/search miss. -->
      ${n?p`<openclaw-mascot
            class="plugins-empty__mascot"
            .mood=${n}
            .size=${84}
          ></openclaw-mascot>`:p`<span class="plugins-empty__icon" aria-hidden="true">${S.puzzle}</span>`}
      <h2>${e}</h2>
      <p>${t}</p>
    </div>
  `}function Ft(e){switch(e.activeTab){case`installed`:return Tt(e);case`discover`:return Mt(e);default:return e.activeTab}}function It(e){let t=!!e.result,n=e.loading&&!t?`loading`:e.error&&!t?`error`:!e.connected&&!t?`offline`:`content`;return Ue(p`
      <div class="plugins-toolbar">
        <input
          id="plugins-global-search"
          class="settings-input plugins-toolbar__search"
          name="plugins-search"
          type="search"
          autocomplete="off"
          aria-label=${b(`pluginsPage.searchLabel`)}
          .value=${ve(e.query)}
          placeholder=${b(`pluginsPage.searchPlaceholder`)}
          @input=${t=>e.onQueryChange(t.currentTarget.value)}
        />
        ${e.activeTab===`installed`&&n===`content`?St(e):d}
        <button
          type="button"
          class="btn btn--sm btn--icon plugins-refresh"
          aria-label=${b(`pluginsPage.refresh`)}
          title=${b(`pluginsPage.refresh`)}
          ?disabled=${e.loading||!e.connected}
          @click=${e.onRefresh}
        >
          <span aria-hidden="true">${S.refresh}</span>
        </button>
      </div>

      ${e.mutationBlockedReason?p`<div class="plugins-readonly" role="note">
            <span aria-hidden="true">${S.alertTriangle}</span>
            <span>${e.mutationBlockedReason}</span>
          </div>`:d}
      ${e.error?p`<div class="plugins-page-error" role="alert">
            <span>${e.error}</span>
            <button type="button" class="btn btn--sm" @click=${e.onRefresh}>
              ${b(`pluginsPage.tryAgain`)}
            </button>
          </div>`:d}
      ${e.pageNotice?p`<div
            class="plugins-row-message plugins-row-message--${e.pageNotice.kind} plugins-page-notice"
            role=${e.pageNotice.kind===`error`?`alert`:`status`}
          >
            <span>${e.pageNotice.text}</span>
          </div>`:d}

      <wa-tab-panel
        id="plugins-hub-panel"
        class="plugins-panel"
        name=${e.activeTab}
        active
        aria-labelledby=${`plugins-tab-${e.activeTab}`}
      >
        ${n===`loading`?p`<div class="plugins-search-state" role="status">${b(`pluginsPage.loading`)}</div>`:n===`error`?d:n===`offline`?Z(b(`pluginsPage.offlineTitle`),b(`pluginsPage.offlineBody`)):Ft(e)}
      </wa-tab-panel>
      ${Pt(e)}
    `,{wide:!0})}var Lt,Rt,zt=e((()=>{f(),ge(),he(),Re(),nt(),Le(),Ie(),T(),x(),s(),pt(),u(),Ye(),Lt=[`all`,`enabled`,`disabled`,`issues`],Rt=new Intl.NumberFormat(void 0,{notation:`compact`,maximumFractionDigits:1})}));function Bt(e,t){return{kind:`success`,text:[e,t?b(`pluginsPage.configRefreshFailed`,{error:t}):null].filter(Boolean).join(`
`)}}function Vt(e,t){if(!e)return e;let n=e.plugins.findIndex(e=>e.id===t.id),r=[...e.plugins];return n>=0?r[n]=t:r.push(t),{...e,plugins:r}}function Ht(e,t){let n=t.restartRequired?`pluginsPage.${e}Restart`:`pluginsPage.${e}Success`,r=`warnings`in t?t.warnings??[]:[];return[b(n,{name:t.plugin.name}),...r].filter(Boolean).join(`
`)}var Q,$;e((()=>{xe(),ye(),Fe(),f(),me(),ke(),je(),Ne(),Ee(),Pe(),qe(),T(),Be(),x(),pe(),se(),$e(),u(),We(),a(),c(),lt(),ft(),Ye(),fe(),zt(),t(),Q=`https://docs.openclaw.ai/plugins/manage-plugins`,$=class extends ee{constructor(...e){super(...e),this.result=null,this.error=null,this.activeTab=`installed`,this.query=``,this.installedFilter=`all`,this.debouncedSearchQuery=``,this.busy={},this.messages={},this.pendingRemoval={},this.detailPluginId=null,this.iconUrls={},this.pageNotice=null,this.mcpServers=null,this.mcpMessage=null,this.mcpBusy=!1,this.mcpFormOpen=!1,this.routeDataConsumed=!1,this.normalizedLocation=``,this.searchTimer=null,this.mutationToken=0,this.mutationTokens=new Map,this.iconMisses=new Set,this.iconRequests=new Map,this.iconAuthCandidates=[],this.gateway=new Ge(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.result=null,this.error=null,this.messages={},this.pendingRemoval={},this.detailPluginId=null,this.pageNotice=null,this.mcpMessage=null},invalidateRequests:e=>this.invalidateRequests(e.snapshot.phase!==`connected`||!e.snapshot.client),onSnapshot:e=>this.handleGatewaySnapshot(e)}),this.catalogTask=new v(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null],task:([e],{signal:t})=>e?e.request(`plugins.list`,{},{signal:t}):_,onComplete:e=>{this.replaceResult(e)},onError:e=>{this.error=y(e,{redact:l})}}),this.configTask=new v(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.context?.runtimeConfig??null],task:async([e,t])=>!e||!t?_:(await t.refresh(),t.state.lastError),onComplete:()=>{this.syncMcpServers()},onError:()=>{this.syncMcpServers()}}),this.searchTask=new v(this,{args:()=>[this.gateway.connected&&this.activeTab===`discover`?this.gateway.client:null,this.debouncedSearchQuery],task:async([e,t],{signal:n})=>!e||t.length<2?_:(await e.request(`plugins.search`,{query:t,limit:20},{signal:n})).results}),this.subscriptions=new r(this).effect(()=>this.context?.runtimeConfig,e=>(this.syncMcpServers(),e.subscribe(()=>this.syncMcpServers()))),this.handleDocumentKeydown=e=>{e.key===`Escape`&&this.detailPluginId&&(this.detailPluginId=null,e.stopPropagation())}}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.syncCanonicalLocation())}connectedCallback(){super.connectedCallback(),document.addEventListener(`keydown`,this.handleDocumentKeydown,!0),this.syncCanonicalLocation()}disconnectedCallback(){document.removeEventListener(`keydown`,this.handleDocumentKeydown,!0),this.subscriptions.clear(),this.clearSearchTimer(),this.resetPluginIcons(),super.disconnectedCallback()}handleGatewaySnapshot(e){let t=e.snapshot,n=Te({hello:t.hello,settings:{token:this.context.gateway.connection.token},password:this.context.gateway.connection.password}),r=n.length!==this.iconAuthCandidates.length||n.some((e,t)=>e!==this.iconAuthCandidates[t]);this.iconAuthCandidates=n;let i=!e.initial&&(e.identityChanged||e.connectionChanged||r)&&t.phase===`connected`&&this.routeDataConsumed;!e.initial&&r&&!e.identityChanged&&!e.connectionChanged&&(this.gateway.invalidate(),this.invalidateRequests(t.phase!==`connected`||!t.client)),!e.initial&&(e.identityChanged||e.connectionChanged||r)&&(this.resetPluginIcons(),this.busy={},this.mcpBusy=!1,this.debouncedSearchQuery=``),i?this.refreshPage():this.ensureInitialData(),t.phase===`connected`&&this.context?.runtimeConfig.ensureLoaded().then(()=>this.syncMcpServers()),!e.initial&&(e.identityChanged||e.connectionChanged||r)&&t.phase===`connected`&&this.activeTab===`discover`&&this.scheduleSearch()}applyRouteData(){let e=this.routeData;if(this.routeDataConsumed=!0,!e){this.ensureInitialData();return}let t=re(e.location,this.context.basePath);if(t!==this.activeTab&&this.changeTab(t),!this.gateway.isRouteDataCurrent(e)){this.ensureInitialData();return}this.replaceResult(e.result),this.error=e.error,this.ensureInitialData()}syncCanonicalLocation(){let e=this.context,t=this.routeData?.location;if(!e||!t)return;let n=ue(t,e.basePath);if(!n){this.normalizedLocation=``;return}let r=`${t.pathname}${t.search}${t.hash}`;this.normalizedLocation!==r&&(this.normalizedLocation=r,e.replace(`plugins`,n))}invalidateRequests(e=!0){this.clearSearchTimer(),this.debouncedSearchQuery=``,e&&this.catalogTask.run([null]),this.configTask.run([null,this.context.runtimeConfig]),this.searchTask.run([null,``]),this.mutationTokens.clear()}replaceResult(e,t=!1){t?this.reconcilePluginIcons(e):this.resetPluginIcons(),this.result=e,this.syncPluginIcons()}reconcilePluginIcons(e){let t=new Set((e?.plugins??[]).filter(e=>e.hasIcon&&!D(e.id)).map(e=>e.id)),n={...this.iconUrls},r=!1;for(let[e,i]of Object.entries(n))t.has(e)||(URL.revokeObjectURL(i),delete n[e],r=!0);r&&(this.iconUrls=n);for(let[e,n]of this.iconRequests)t.has(e)||(clearTimeout(n.timeout),n.controller.abort(),this.iconRequests.delete(e));for(let e of this.iconMisses)t.has(e)||this.iconMisses.delete(e)}resetPluginIcons(){for(let e of this.iconRequests.values())clearTimeout(e.timeout),e.controller.abort();for(let e of Object.values(this.iconUrls))URL.revokeObjectURL(e);this.iconRequests.clear(),this.iconMisses.clear(),this.iconUrls={}}syncPluginIcons(){for(let e of this.result?.plugins??[])!e.hasIcon||D(e.id)||this.iconUrls[e.id]||this.iconMisses.has(e.id)||this.iconRequests.has(e.id)||this.fetchPluginIcon(e.id)}fetchPluginIcon(e){let t=new AbortController,n=setTimeout(()=>t.abort(new DOMException(`plugin icon fetch timed out`,`TimeoutError`)),1e4),r={controller:t,timeout:n};this.iconRequests.set(e,r),ct({pluginId:e,basePath:this.context.basePath,gatewayUrl:this.context.gateway.connection.gatewayUrl,auth:{hello:this.context.gateway.snapshot.hello,settings:{token:this.context.gateway.connection.token},password:this.context.gateway.connection.password},signal:t.signal}).then(t=>{if(this.iconRequests.get(e)!==r||!this.isConnected){t&&URL.revokeObjectURL(t);return}t?this.iconUrls={...this.iconUrls,[e]:t}:this.iconMisses.add(e)}).catch(()=>{this.iconRequests.get(e)===r&&this.iconMisses.add(e)}).finally(()=>{clearTimeout(n),this.iconRequests.get(e)===r&&this.iconRequests.delete(e)})}handlePluginIconError(e){this.invalidatePluginIcon(e),this.iconMisses.add(e)}invalidatePluginIcon(e){let t=this.iconRequests.get(e);t&&(clearTimeout(t.timeout),t.controller.abort(),this.iconRequests.delete(e));let n=this.iconUrls[e];n&&URL.revokeObjectURL(n);let r={...this.iconUrls};delete r[e],this.iconUrls=r,this.iconMisses.delete(e)}clearSearchTimer(){this.searchTimer&&=(clearTimeout(this.searchTimer),null)}get loading(){return this.gateway.connected&&this.catalogTask.status===g.PENDING}get searchResults(){return this.searchTask.status===g.COMPLETE&&this.debouncedSearchQuery===this.query.trim()?this.searchTask.value??null:null}get searchLoading(){return this.activeTab===`discover`&&this.debouncedSearchQuery.length>=2&&this.searchTask.status===g.PENDING}get searchError(){return this.searchTask.status===g.ERROR&&this.debouncedSearchQuery===this.query.trim()?y(this.searchTask.error,{redact:l}):null}get configRefreshError(){let e=this.configTask.status===g.ERROR?y(this.configTask.error,{redact:l}):this.configTask.status===g.COMPLETE?this.configTask.value:null;return e?b(`pluginsPage.configRefreshFailed`,{error:e}):null}ensureInitialData(){!this.gateway.connected||!this.gateway.client||this.loading||this.result||this.error||this.routeData&&!this.routeDataConsumed||this.refreshCatalog()}async refreshCatalog(){let e=this.gateway.client;!e||!this.gateway.connected||(this.error=null,await this.catalogTask.run([e]))}async refreshRuntimeConfig(){let e=this.gateway.client;if(!e||!this.gateway.connected)return;let t=this.context.runtimeConfig;await this.configTask.run([e,t])}async refreshPage(){await Promise.all([this.refreshCatalog(),this.refreshRuntimeConfig()])}syncMcpServers(){let e=this.context?.runtimeConfig.state.configSnapshot;this.mcpServers=et(ne(e))}selectHubTab(e){if(e===`installed`||e===`discover`){this.changeTab(e),this.context.navigate(`plugins`,{pathname:Ae(e,this.context.basePath)});return}this.context.navigate(e===`skills`?`skills`:`skill-workshop`)}changeTab(e){this.activeTab=e,this.clearSearchTimer(),this.debouncedSearchQuery=``,this.searchTask.run([null,``]),e===`discover`&&this.scheduleSearch()}changeQuery(e){this.query=e,this.clearSearchTimer(),this.debouncedSearchQuery=``,this.searchTask.run([null,``]),this.activeTab===`discover`&&this.scheduleSearch()}openClawHubSearch(e){this.query=e,this.changeTab(`discover`)}scheduleSearch(){let e=this.query.trim();e.length<2||!this.gateway.connected||!this.gateway.client||(this.searchTimer=setTimeout(()=>{this.searchTimer=null,this.searchClawHub(e)},300))}async searchClawHub(e){let t=this.gateway.client;!t||!this.gateway.connected||e.length<2||(this.debouncedSearchQuery=e,await this.searchTask.run([t,e]))}mutationBlockedReason(){return this.gateway.connected?Oe(this.context.gateway.snapshot.hello?.auth??null)?this.result&&!this.result.mutationAllowed?b(`pluginsPage.changesDisabled`):null:b(`pluginsPage.adminRequired`):b(`pluginsPage.connectToChange`)}canMutate(){return!!this.result?.mutationAllowed&&this.mutationBlockedReason()===null}setBusy(e,t){let n={...this.busy};t?n[e]=!0:delete n[e],this.busy=n}setMessage(e,t){let n={...this.messages};t?n[e]=t:delete n[e],this.messages=n}setPendingRemoval(e,t){let n={...this.pendingRemoval};t?n[e]=!0:delete n[e],this.pendingRemoval=n}applyMutationResult(e){this.invalidatePluginIcon(e.plugin.id),this.replaceResult(Vt(this.result,e.plugin),!0)}pinEnabledPluginRoute(e){let t=this.context.navigation;if(e!==`workboard`||!t)return;let n=Se({type:`route`,route:`workboard`}),r=t.snapshot.sidebarEntries;r.includes(n)||t.update({sidebarEntries:[...r,n]})}async refreshCatalogAfterMutation(e){this.error=null,await this.catalogTask.run([e])}pageError(){let e=[this.error,this.configRefreshError].filter(e=>!!e);return e.length>0?e.join(` `):null}async runPluginMutation(e,t,n,r=t=>{this.setMessage(e,{kind:`error`,text:y(t,{redact:l})})}){let i=this.gateway.capture();if(!i||!this.canMutate()||this.busy[e])return;let a=++this.mutationToken;this.mutationTokens.set(e,a);let o=()=>this.gateway.isCurrent(i)&&this.mutationTokens.get(e)===a;this.setBusy(e,!0),this.setMessage(e,null);try{let e=await oe(this.context.runtimeConfig,i.client,t);if(!o())return;await n(e.value,e.refreshError,i.client,o)}catch(e){o()&&r(e)}finally{this.mutationTokens.get(e)===a&&(this.mutationTokens.delete(e),this.setBusy(e,!1))}}async install(e,t){await this.runPluginMutation(e,e=>ie(e,t),async(t,n,r)=>{this.applyMutationResult(t),this.setMessage(e,Bt(Ht(`installed`,t),n)),await this.refreshCatalogAfterMutation(r)},n=>{let r=le(n),i=t.source===`clawhub`?t.packageName:null;if(i&&de(n)){this.setMessage(e,{kind:`error`,text:r?.warning??b(`pluginsPage.defaultRiskWarning`),acknowledge:{packageName:i,...r?.version?{version:r.version}:{}}});return}this.setMessage(e,{kind:`error`,text:y(n,{redact:l})})})}async updateEnabled(e,t,n=j(e)){await this.runPluginMutation(n,n=>ae(n,e,t),async(r,i,a,o)=>{this.applyMutationResult(r),this.setMessage(n,Bt(Ht(t?`enabled`:`disabled`,r),i)),t&&this.pinEnabledPluginRoute(e),await this.refreshCatalogAfterMutation(a),o()&&!r.restartRequired&&this.context.gateway.connect()})}async uninstall(e,t){await this.runPluginMutation(t,t=>te(t,e),async(e,n,r)=>{this.setPendingRemoval(t,!1),this.pageNotice={kind:`success`,text:[b(`pluginsPage.removedRestart`,{name:e.pluginId}),...e.warnings??[],n?b(`pluginsPage.configRefreshFailed`,{error:n}):null].filter(Boolean).join(`
`)},await this.refreshCatalogAfterMutation(r)})}async mutateMcpServers(e){if(!this.canMutate()||this.mcpBusy)return!1;let t=this.context.runtimeConfig;this.mcpBusy=!0,e.busyKey&&(this.setBusy(e.busyKey,!0),this.setMessage(e.busyKey,null)),this.mcpMessage=null;let n=t=>(e.busyKey?this.setMessage(e.busyKey,{kind:`error`,text:t}):this.mcpMessage={kind:`error`,text:t},!1);try{let r=await at(t,{buildPatch:e.buildPatch,note:e.note});return r.ok?(this.syncMcpServers(),this.mcpMessage={kind:`success`,text:e.successText},!0):n(r.error)}catch(e){return n(y(e,{redact:l}))}finally{this.mcpBusy=!1,e.busyKey&&this.setBusy(e.busyKey,!1)}}async addMcpServer(e){let t=e.name.trim();if(!ot.test(t)){this.mcpMessage={kind:`error`,text:b(`mcpServers.nameInvalid`)};return}let n=rt(e.target,e.transport);if(!n){this.mcpMessage={kind:`error`,text:b(`mcpServers.targetInvalid`)};return}await this.mutateMcpServers({buildPatch:e=>A(e,t,n),note:`plugins: add MCP server ${t}`,successText:b(`mcpServers.addedSuccess`,{name:t})})&&(this.mcpFormOpen=!1)}async toggleMcpServer(e,t){await this.mutateMcpServers({buildPatch:n=>tt(n,e,t),note:`plugins: ${t?`enable`:`disable`} MCP server ${e}`,successText:b(t?`mcpServers.enabledSuccess`:`mcpServers.disabledSuccess`,{name:e})})}async removeMcpServer(e){await this.mutateMcpServers({buildPatch:t=>it(t,e),note:`plugins: remove MCP server ${e}`,successText:b(`mcpServers.removedSuccess`,{name:e})})}async addConnector(e){if(e.action.kind!==`mcp`)return;let t=e.action.mcp,n=M(e.id),r=t.followUp===`oauth`?b(`pluginsPage.connectorAddedOauth`,{name:e.name,command:`openclaw mcp login ${t.serverName}`}):t.followUp===`endpoint`?b(`pluginsPage.connectorAddedEndpoint`,{name:e.name}):b(`pluginsPage.connectorAddedReady`,{name:e.name});await this.mutateMcpServers({buildPatch:e=>A(e,t.serverName,structuredClone(t.config)),note:`plugins: add MCP connector ${t.serverName}`,successText:r,busyKey:n})&&(this.setMessage(n,{kind:`success`,text:r}),this.mcpMessage=null)}render(){let e=this.mutationBlockedReason();return p`
      <section class="content-header content-header--page plugins-content-header">
        <div>
          <h1 class="page-title">${we(`plugins`)}</h1>
          <div class="page-subtitle">
            ${Ce(`plugins`)}
            ${He(Q,b(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${ze(p`
        <div class="plugins-hub-tabs-row">
          ${Ke({id:`plugins`,active:this.activeTab,tabs:ut(this.result?.plugins.filter(e=>e.installed).length??0),ariaLabel:b(`pluginsPage.hubTablistLabel`),panelId:dt,className:`plugins-tabs`,onSelect:e=>this.selectHubTab(e)})}
        </div>
        ${It({connected:this.gateway.connected,loading:this.loading,result:this.result,error:this.pageError(),activeTab:this.activeTab,query:this.query,installedFilter:this.installedFilter,searchResults:this.searchResults,searchLoading:this.searchLoading,searchError:this.searchError,busy:this.busy,messages:this.messages,pendingRemoval:this.pendingRemoval,detailPluginId:this.detailPluginId,iconUrls:this.iconUrls,canMutate:this.canMutate(),mutationBlockedReason:e,pageNotice:this.pageNotice,mcpSettingsHref:Me(`mcp`,this.context?.basePath??``),mcpServers:this.mcpServers,mcpMessage:this.mcpMessage,mcpBusy:this.mcpBusy,mcpFormOpen:this.mcpFormOpen,onQueryChange:e=>this.changeQuery(e),onFilterChange:e=>{this.installedFilter=e},onRefresh:()=>void this.refreshPage(),onIconError:e=>this.handlePluginIconError(e),onShowDetails:e=>{this.detailPluginId=e},onSetEnabled:(e,t,n)=>void this.updateEnabled(e,t,n),onInstall:(e,t)=>void this.install(e,t),onRequestUninstall:e=>this.setPendingRemoval(e,!0),onCancelUninstall:e=>this.setPendingRemoval(e,!1),onUninstall:(e,t)=>void this.uninstall(e,t),onAddConnector:e=>void this.addConnector(e),onSearchClawHub:e=>this.openClawHubSearch(e),onMcpToggle:(e,t)=>void this.toggleMcpServer(e,t),onMcpRemove:e=>void this.removeMcpServer(e),onMcpFormToggle:e=>{this.mcpFormOpen=e,e&&(this.mcpMessage=null)},onMcpAdd:e=>void this.addMcpServer(e)})}
      `)}
    `}},n([be({context:De,subscribe:!0})],$.prototype,`context`,void 0),n([_e({attribute:!1})],$.prototype,`routeData`,void 0),n([m()],$.prototype,`result`,void 0),n([m()],$.prototype,`error`,void 0),n([m()],$.prototype,`activeTab`,void 0),n([m()],$.prototype,`query`,void 0),n([m()],$.prototype,`installedFilter`,void 0),n([m()],$.prototype,`debouncedSearchQuery`,void 0),n([m()],$.prototype,`busy`,void 0),n([m()],$.prototype,`messages`,void 0),n([m()],$.prototype,`pendingRemoval`,void 0),n([m()],$.prototype,`detailPluginId`,void 0),n([m()],$.prototype,`iconUrls`,void 0),n([m()],$.prototype,`pageNotice`,void 0),n([m()],$.prototype,`mcpServers`,void 0),n([m()],$.prototype,`mcpMessage`,void 0),n([m()],$.prototype,`mcpBusy`,void 0),n([m()],$.prototype,`mcpFormOpen`,void 0),customElements.get(`openclaw-plugins-page`)||customElements.define(`openclaw-plugins-page`,$)}))();
//# sourceMappingURL=plugins-page-DADHwDYC.js.map