import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Cs as i,Da as a,Fa as o,Hc as s,Jn as c,Kc as l,Ko as u,Ma as d,Na as f,Oa as p,On as m,Qn as h,Ro as g,Sn as _,Vc as v,Wa as y,Wc as b,Yc as x,Zn as S,bs as C,ca as w,cr as T,cs as E,da as D,en as ee,eo as te,fs as O,la as ne,ls as re,pa as ie,qc as ae,rr as oe,sa as se,tn as ce,to as le,tr as k,ua as ue,ur as de,us as fe,ya as A,ys as j}from"./control-ui-core-BUddgKjW.js";import{K as M,Q as pe,W as me,Y as N,it as he,nt as P}from"./lit-runtime-D5xZwgO1.js";import{f as ge,g as _e,i as ve,m as ye,p as be,r as xe}from"./control-ui-foundation-Dgui328h.js";import{$ as Se,Ct as Ce,Ut as we,Wt as Te,_ as Ee,et as De,jt as Oe,v as ke,wt as Ae}from"./control-ui-core-Ct5CBwjl.js";import{Ft as je,Lt as Me,en as F,nn as I}from"./control-ui-foundation-DkfOBVsU.js";import{o as L,t as Ne}from"./control-ui-core-s0pW0mau.js";import{_ as Pe,gt as Fe,v as Ie,vt as R,yt as Le}from"./control-ui-core-vLOElyFQ.js";import{i as z,n as Re}from"./gateway-runtime-DWs8EJ0W.js";import{d as B,f as ze,i as Be,l as Ve,n as He,r as Ue,t as We,u as Ge}from"./session-pull-requests-DGoO0bxT.js";import{i as Ke,n as qe,t as Je}from"./session-menu-work-LfaFDQ6T.js";import{i as Ye,n as Xe,s as Ze,t as Qe}from"./grouping-B5MNSQWF.js";import{n as $e,t as et}from"./paged-session-rows-C8hiLoFL.js";import{n as tt,t as nt}from"./open-external-url-NvatsHxk.js";import{n as rt,t as it}from"./toast-psGOnOwO.js";import{n as at,t as ot}from"./settings-workspace-BbyrBOFl.js";import{d as st,f as V,n as ct,s as lt,t as ut,u as H}from"./settings-ui-Bko7fBdZ.js";import{n as U,t as dt}from"./confirm-dialog-B87dCyWg.js";import{o as ft,s as pt}from"./presenter-B7ykwXYh.js";import{d as mt,i as ht,o as W,r as gt,t as _t,u as vt}from"./thinking-BNPymYSy.js";import{i as yt,s as bt,t as xt}from"./session-goal-BCKLIdYx.js";import{n as St,t as Ct}from"./agent-scope-control-BJxpZ36W.js";import{n as wt,t as Tt}from"./sessions-hub-header-D92D-FEs.js";import{d as Et,t as Dt}from"./workboard-ezOuwOS5.js";function Ot(e){return[...new Set((e?.sessions??[]).map(e=>j(e.key)?.agentId).filter(e=>!!e))]}function kt(e,t){return Object.fromEntries(Ot(e).map(e=>[e,t(e)]).filter(e=>!!e[1]))}async function At(e){let t=await et({initialResult:e.result,list:t=>e.listSessions({...e.listOptions,limit:200,offset:t}),missingResultError:`Unable to load all sessions for transcript search.`,stalledPaginationError:`Session pagination did not advance during transcript search.`}),n=new Map;for(let r of t??[]){let t=e.resolveAgentId(r.key);if(!t)continue;let i=n.get(t)??[];i.push(r.key),n.set(t,i)}let r=[];for(let[t,i]of n)for(let n=0;n<i.length;n+=200)r.push(e.client.request(`sessions.search`,{agentId:t,sessionKeys:i.slice(n,n+200),query:e.query,limit:25}));let i=await Promise.all(r),a=i.flatMap(e=>e.results).toSorted((e,t)=>t.score-e.score||t.timestamp-e.timestamp).slice(0,25);return{results:a,indexing:i.some(e=>e.indexing===!0),truncated:i.some(e=>e.truncated===!0)||i.reduce((e,t)=>e+t.results.length,0)>a.length}}var jt=e((()=>{$e(),O()}));function Mt(e,t){let n=(e?.sessions??[]).map(e=>e.category?.trim()).filter(e=>!!e);return[...new Set([...t,...n.toSorted((e,t)=>e.localeCompare(t))])]}async function Nt(e){if(!(!e.sessions||e.knownCategories.includes(e.name)))try{await e.sessions.groupsPut([...e.sessions.state.groups??[],e.name])}catch(t){e.isCurrent()&&e.onError(String(t))}}var Pt=e((()=>{}));function Ft(){return Ze(ae()?.getItem(K))}function It(e){try{ae()?.setItem(K,e)}catch{}}function G(e){return Me(e)}var K,Lt=e((()=>{je(),Ye(),x(),K=`openclaw:sessions:group-by`})),Rt=e((()=>{}));function q(e,t){return Object.hasOwn(e,t)?e[t]??null:null}function zt(e,t){let n=mt(e,t),r=_t(e.thinkingDefault??(n?t?.thinkingDefault:void 0)),i=e.thinkingLevels?.length?e.thinkingLevels:n&&t?.thinkingLevels?.length?t.thinkingLevels:(e.thinkingOptions?.length?e.thinkingOptions:n&&t?.thinkingOptions?.length?t.thinkingOptions:yn).map(e=>({id:W(e),label:e}));return[{value:``,label:r},...i.map(e=>({value:W(e.id),label:gt(e.id,e.label)}))]}function Bt(e,t){return!t||e.includes(t)?[...e]:[...e,t]}function J(e,t){return!t||e.some(e=>e.value===t)?[...e]:[...e,{value:t,label:gt(t)}]}function Vt(e,t=!1){return e.map(e=>({value:e,label:L(e===``?`sessionsView.inherit`:t&&e===`off`?`sessionsView.offExplicit`:`sessionsView.${e}`)}))}function Ht(e){return L(wn[e]??`sessionsView.statusUnknown`)}function Ut(e){let t=f(e),n=e.hasActiveRun===!1&&(!e.status||e.status===`running`),r=t?L(`sessionsView.statusLive`):n?L(`sessionsView.statusIdle`):e.status?Ht(e.status):L(`sessionsView.statusUnknown`),i=t||e.status===`done`?`ok`:n||!e.status?`muted`:`danger`;return N`
    <openclaw-tooltip .content=${`${L(`sessionsView.status`)}: ${r}`}>
      ${V({kind:i,label:r})}
    </openclaw-tooltip>
  `}function Y(e){return le(e.key)?`cron`:e.kind}function Wt(e){let t=Y(e);return N`
    <span class="session-avatar session-avatar--${t}" aria-hidden="true">
      ${Tn[t]??R.circle}
      ${f(e)?N`<span class="session-avatar__status"></span>`:M}
    </span>
  `}function Gt(e){return typeof e.totalTokens==`number`&&Number.isFinite(e.totalTokens)}function Kt(e){let t=e.totalTokens;if(typeof t!=`number`||!Number.isFinite(t))return N`<span class="muted">${L(`common.na`)}</span>`;let n=e.totalTokensFresh!==!1,r=`${n?``:`~`}${k(t)}`,i=typeof e.contextTokens==`number`&&e.contextTokens>0?e.contextTokens:null;if(!i)return N`<span class="session-tokens__value">${r}</span>`;let a=Math.min(100,Math.round(t/i*100)),o=n?a>=Dn?`danger`:a>=En?`warn`:`ok`:`stale`,s=L(n?`sessionsView.contextUsage`:`sessionsView.contextUsageApprox`,{percent:String(a),used:t.toLocaleString(),context:i.toLocaleString()});return N`
    <openclaw-tooltip .content=${s}>
      <div class="session-tokens">
        <span class="session-tokens__value">${r} / ${k(i)}</span>
        <span
          class="session-context-meter session-context-meter--${o}"
          role="img"
          aria-label=${s}
        >
          <span class="session-context-meter__fill" style=${`width: ${a}%`}></span>
        </span>
      </div>
    </openclaw-tooltip>
  `}function qt(e,t,n){let r=e.filter(e=>e.unread===!0&&e.archived!==!0).length,i=e.filter(e=>e.archived===!0).length,a=e.filter(Gt),o=a.reduce((e,t)=>e+(t.totalTokens??0),0),s=a.length<e.length||a.some(e=>e.totalTokensFresh===!1),c=a.length===0?L(`common.na`):`${s?`~`:``}${k(o)}`,l=[[`sessions`,R.messageSquare,L(`sessionsView.title`),String(e.length),!1],[`live`,R.zap,L(`sessionsView.statusLive`),String(t),t>0],[`unread`,R.eye,L(`sessionsView.unread`),String(r),r>0],[`tokens`,R.barChart,L(`sessionsView.tokens`),c,!1]];return n!==`active`&&l.push([`archived`,R.archive,L(`sessionsView.archived`),String(i),!1]),N`
    <div class="sessions-overview">
      ${l.map(([e,t,n,r,i])=>N`
          <div class=${[`sessions-overview__tile`,`sessions-overview__tile--${e}`,i?`sessions-overview__tile--active`:``].filter(Boolean).join(` `)}>
            <span class="sessions-overview__icon" aria-hidden="true">${t}</span>
            <span class="sessions-overview__meta">
              <span class="sessions-overview__value">${r}</span>
              <span class="sessions-overview__label">${n}</span>
            </span>
          </div>
        `)}
    </div>
  `}function Jt(e,t){let n=t.find(t=>t.key===e.sessionKey);return I(n?.label)??I(n?.displayName)??e.sessionKey}function Yt(e,t){let n=e.transcriptSearchQuery.trim().length>0,r=e.transcriptSearch,i=r.status===`results`?r.results:[],a=r.status===`loading`;return N`
    <section
      class="sessions-transcript-search"
      aria-label=${L(`sessionsView.transcriptSearchTitle`)}
    >
      <form
        class="sessions-transcript-search__form"
        role="search"
        aria-label=${L(`sessionsView.transcriptSearchTitle`)}
        @submit=${t=>{t.preventDefault(),e.transcriptSearchAvailable&&n&&!a&&e.onTranscriptSearch()}}
      >
        <div class="data-table-search sessions-transcript-search__input">
          <input
            type="search"
            maxlength="4096"
            aria-label=${L(`sessionsView.transcriptSearchInputLabel`)}
            placeholder=${L(`sessionsView.transcriptSearchPlaceholder`)}
            .value=${e.transcriptSearchQuery}
            ?disabled=${!e.transcriptSearchAvailable}
            @input=${t=>e.onTranscriptSearchChange(t.target.value)}
          />
        </div>
        <button
          class="btn primary"
          type="submit"
          ?disabled=${!e.transcriptSearchAvailable||!n||a}
        >
          ${L(a?`sessionsView.transcriptSearchSearching`:`sessionsView.transcriptSearchAction`)}
        </button>
        ${n?N`
              <button class="btn" type="button" @click=${e.onClearTranscriptSearch}>
                ${L(`sessionsView.transcriptSearchClear`)}
              </button>
            `:M}
      </form>
      ${e.transcriptSearchAvailable?M:N`
            <div class="muted" role="status">${L(`sessionsView.transcriptSearchUnavailable`)}</div>
          `}
      <div
        class="sessions-transcript-search__status"
        aria-live="polite"
        aria-busy=${a?`true`:`false`}
      >
        ${a?N`<span class="muted">${L(`sessionsView.transcriptSearchSearching`)}</span>`:M}
        ${r.status===`error`?N`
              <div
                class="sessions-transcript-search__notice sessions-transcript-search__notice--danger"
              >
                <span>${L(`sessionsView.transcriptSearchError`)}: ${r.message}</span>
                <button class="btn btn--sm" type="button" @click=${e.onTranscriptSearch}>
                  ${L(`sessionsView.transcriptSearchRetry`)}
                </button>
              </div>
            `:M}
        ${r.status===`results`&&r.indexing?N`
              <div class="sessions-transcript-search__notice">
                <span>${L(`sessionsView.transcriptSearchIndexing`)}</span>
                <button
                  class="btn btn--sm"
                  type="button"
                  ?disabled=${a}
                  @click=${e.onTranscriptSearch}
                >
                  ${L(`sessionsView.transcriptSearchRetry`)}
                </button>
              </div>
            `:M}
        ${r.status===`results`&&i.length===0&&!r.indexing?N`
              <div class="sessions-transcript-search__empty" role="status">
                ${L(`sessionsView.transcriptSearchEmpty`)}
              </div>
            `:M}
        ${i.length>0?N`
              <div class="sessions-transcript-search__results">
                <div class="sessions-transcript-search__summary">
                  <strong
                    >${L(`sessionsView.transcriptSearchMatches`,{count:String(i.length)})}</strong
                  >
                  ${r.status===`results`&&r.truncated?N`<span class="muted"
                        >${L(`sessionsView.transcriptSearchTruncated`)}</span
                      >`:M}
                </div>
                <div class="sessions-transcript-search__list">
                  ${i.map(n=>{let r=n.timestamp>0?h(n.timestamp):L(`common.na`),i=n.timestamp>0?S(n.timestamp):r;return N`
                      <button
                        class="sessions-transcript-search__result"
                        type="button"
                        @click=${()=>e.onNavigateToChat?.(n.sessionKey)}
                      >
                        <span class="sessions-transcript-search__result-header">
                          <strong>${Jt(n,t)}</strong>
                          <span class="muted" title=${i}>
                            ${L(`sessionsView.${n.role}`)} · ${r}
                          </span>
                        </span>
                        <span class="sessions-transcript-search__snippet">${n.snippet}</span>
                        <span class="sessions-transcript-search__key">${n.sessionKey}</span>
                      </button>
                    `})}
                </div>
              </div>
            `:M}
      </div>
    </section>
  `}function Xt(e){return Array.from({length:On},(t,n)=>N`
      <tr class="session-skeleton-row" aria-hidden="true">
        ${Array.from({length:e},(e,t)=>t===0?N`<td class="data-table-checkbox-col"></td>`:N`<td>
                <span
                  class="session-skeleton ${t===1?`session-skeleton--key`:``}"
                  style=${`animation-delay: ${n*120}ms`}
                ></span>
              </td>`)}
      </tr>
    `)}function Zt(e,t,n){let r=F(t);return r?e.filter(e=>{if([e.key,e.label,e.category,e.kind,e.displayName,u(e.agentRuntime),e.status,e.goal?`${e.goal.objective} ${e.goal.status} ${yt(e.goal)} ${e.goal.lastStatusNote??``}`:``,f(e)?`live running`:e.hasActiveRun===!1?`idle`:``].some(e=>F(e).includes(r)))return!0;let t=C(e.key);return(t?F(q(n,t.agentId)?.name):``).includes(r)}):e}function Qt(e,t,n){let r=n===`asc`?1:-1;return[...e].toSorted((e,n)=>{let i=(n.pinnedAt??0)-(e.pinnedAt??0);return i===0?(t===`key`||t===`kind`?(e[t]??``).localeCompare(n[t]??``):t===`updated`?(e.updatedAt??0)-(n.updatedAt??0):(e.totalTokens??e.inputTokens??e.outputTokens??0)-(n.totalTokens??n.inputTokens??n.outputTokens??0))*r:i})}function $t(e,t,n){let r=t*n;return e.slice(r,r+n)}function en(e){return F(e.searchQuery).length>0||G(e.activeMinutes)!==void 0||!e.includeGlobal}function tn(e){let t=kn[e];return t?L(t):e}function nn(e){return L(e===1?`sessionsView.checkpoint`:`sessionsView.checkpoints`,{count:String(e)})}function rn(e){return typeof e.tokensBefore==`number`&&typeof e.tokensAfter==`number`&&Number.isFinite(e.tokensBefore)&&Number.isFinite(e.tokensAfter)?L(`sessionsView.tokenRange`,{before:e.tokensBefore.toLocaleString(),after:e.tokensAfter.toLocaleString()}):typeof e.tokensBefore==`number`&&Number.isFinite(e.tokensBefore)?L(`sessionsView.tokensBefore`,{count:e.tokensBefore.toLocaleString()}):L(`sessionsView.tokenDeltaUnavailable`)}function an(e){return typeof e!=`number`||!Number.isFinite(e)||e<0?null:c(e,{spaced:!0})??`0ms`}function on(e){if(!e)return M;let t=e.status===`active`?`accent`:e.status===`complete`?`ok`:e.status===`blocked`||e.status===`budget_limited`||e.status===`usage_limited`?`warn`:`muted`,n=xt(e);return N`
    <openclaw-tooltip .content=${n}>
      <span tabindex="0" aria-label=${n}>
        ${V({kind:t,label:yt(e)})}
      </span>
    </openclaw-tooltip>
  `}function sn(e){let{row:t,updated:n,checkpointCount:r}=e,i=[{label:L(`sessionsView.key`),value:t.key},{label:L(`sessionsView.kind`),value:t.kind},{label:L(`sessionsView.updated`),value:n},{label:L(`sessionsView.tokens`),value:ft(t)},{label:L(`sessionsView.compaction`),value:nn(r)}],a=(e,t)=>{let n=I(t);n&&i.push({label:e,value:n})};a(L(`sessionsView.group`),t.category),a(L(`sessionsView.status`),t.status),t.goal&&i.push({label:L(`sessionsView.goal`),value:xt(t.goal)}),a(L(`sessionsView.goalNote`),t.goal?.lastStatusNote),a(L(`sessionsView.model`),t.model),a(L(`sessionsView.provider`),t.modelProvider),a(L(`sessionsView.runtime`),u(t.agentRuntime)),a(L(`sessionsView.runDuration`),an(t.runtimeMs)),a(L(`sessionsView.surface`),t.surface),a(L(`sessionsView.subject`),t.subject),a(L(`sessionsView.room`),t.room),a(L(`sessionsView.space`),t.space),a(L(`sessionsView.sessionId`),t.sessionId);for(let[e,n]of[[L(`sessionsView.activeRun`),t.hasActiveRun],[L(`sessionsView.archived`),t.archived],[L(`sessionsView.pinned`),t.pinned]])typeof n==`boolean`&&i.push({label:e,value:L(n?`common.yes`:`common.no`)});return i}function X(e){return e.groupBy===`category`?8:7}function cn(e){return L(jn[e]??jn.none)}function ln(e,t){if(t.groupBy===`date`)return L({today:`sessionsView.dateToday`,yesterday:`sessionsView.dateYesterday`,week:`sessionsView.dateThisWeek`,older:`sessionsView.dateOlder`}[e]??`sessionsView.dateNoActivity`);if(e===``)return L(`sessionsView.ungrouped`);if(t.groupBy===`agent`){let n=q(t.agentIdentityById,e),r=I(n?.name);if(r){let e=I(n?.emoji);return e?`${e} ${r}`:r}}return e}function Z(e,t){e.currentTarget?.classList.toggle(`session-drop-target--active`,t)}function un(e,t){if(e.groupBy!==`category`||e.groupWriteDisabledReason)return{dragover:M,dragleave:M,drop:M};let n=e=>e.dataTransfer?.types.includes(B)===!0;return{dragover:e=>{n(e)&&(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),Z(e,!0))},dragleave:e=>Z(e,!1),drop:r=>{if(!n(r))return;r.preventDefault(),Z(r,!1);let i=r.dataTransfer?.getData(B);i&&e.onAssignCategory(i,t)}}}function dn(e,t){let n=ln(e.id,t),r=e.rows.length===1?L(`sessionsView.groupRowCountOne`,{count:`1`}):L(`sessionsView.groupRowCount`,{count:String(e.rows.length)}),i=un(t,e.id===``?null:e.id);return N`
    <tr
      class="session-group-row"
      @dragover=${i.dragover}
      @dragleave=${i.dragleave}
      @drop=${i.drop}
    >
      <td colspan=${X(t)}>
        <div class="session-group-row__header">
          <span class="session-group-row__icon" aria-hidden="true">${R.folder}</span>
          <span class="session-group-row__label">${n}</span>
          <span class="session-group-row__count">${r}</span>
        </div>
      </td>
    </tr>
  `}function fn(e,t){let n=I(e.category)??``,r=[...t.knownCategories];return n&&!r.includes(n)&&r.push(n),N`
    <td>
      <select
        ?disabled=${t.loading||!!t.groupWriteDisabledReason}
        title=${t.groupWriteDisabledReason??M}
        aria-label=${L(`sessionsView.moveToGroup`)}
        class="session-group-select"
        @change=${r=>{if(t.groupWriteDisabledReason)return;let i=r.target;if(i.value===An){i.value=n,t.onRequestNewCategory(e.key);return}t.onAssignCategory(e.key,i.value||null)}}
      >
        <option value="" ?selected=${!n}>${L(`sessionsView.ungrouped`)}</option>
        ${r.map(e=>N`<option value=${e} ?selected=${n===e}>${e}</option>`)}
        <option value=${An}>${L(`sessionsView.newGroup`)}</option>
      </select>
    </td>
  `}function pn(e){return e instanceof Element&&!!e.closest(`a, button, input, label, select, textarea`)}function mn(e){let t=[`session-filter-check`,`session-filter-toggle`,e.extraClass??``,e.checked?`session-filter-check--active`:``].filter(Boolean).join(` `);return N`
    <openclaw-tooltip .content=${e.title}>
      <label class=${t}>
        <input
          name=${e.name}
          class="session-filter-check__input"
          type="checkbox"
          .checked=${e.checked}
          @change=${t=>e.onChange(t.target.checked)}
        />
        <span class="session-filter-check__mark" aria-hidden="true">${R.check}</span>
        <span class="session-filter-check__label">${e.label}</span>
      </label>
    </openclaw-tooltip>
  `}function Q(e){return N`
    <label class="session-override-field">
      <span class="session-override-field__label">${e.label}</span>
      <select
        class="settings-select"
        ?disabled=${e.disabled}
        title=${e.disabledReason??M}
        @change=${t=>e.onChange(t.target.value)}
      >
        ${e.options.map(t=>N`<option value=${t.value} ?selected=${e.current===t.value}>
              ${t.label}
            </option>`)}
      </select>
    </label>
  `}function hn(e){let t=e.result?.sessions??[],n=Zt(t,e.searchQuery,e.agentIdentityById),r=Qt(n,e.sortColumn,e.sortDir),i=r.length,a=Math.max(1,Math.ceil(i/e.pageSize)),o=Math.min(e.page,a-1),s=e.groupBy!==`none`,c=s?Xe({rows:r,mode:e.groupBy,knownCategories:e.knownCategories}):null,l=s?r:$t(r,o,e.pageSize),u=t.length===0?en(e):n.length===0,d=t.filter(e=>f(e)).length,p=t.filter(e=>e.archived===!0).length,m=e.statusFilter===`archived`?L(`sessionsView.noArchivedSessions`):e.statusFilter===`active`?L(`sessionsView.noActiveSessions`):L(`sessionsView.noSessions`),h=(t,n,r=``)=>{let i=e.sortColumn===t,a=i&&e.sortDir===`asc`?`desc`:`asc`;return N`
      <th
        class=${r}
        data-sortable
        data-sort-dir=${i?e.sortDir:``}
        aria-sort=${i?e.sortDir===`asc`?`ascending`:`descending`:M}
        @click=${()=>e.onSortChange(t,i?a:`desc`)}
      >
        <button class="data-table-sort-button" type="button">
          ${n}
          <span class="data-table-sort-icon" aria-hidden="true">${R.arrowUpDown}</span>
        </button>
      </th>
    `},g=N`
    ${L(`sessionsView.title`)}
    ${e.result?N`
          <openclaw-tooltip .content=${L(`sessionsView.store`,{path:e.result.path})}>
            <span class="settings-count">${t.length}</span>
          </openclaw-tooltip>
        `:M}
  `,_=N`
    ${e.statusFilter===`archived`?N`
          <button
            class="btn danger"
            ?disabled=${e.loading||p===0||!!e.deleteArchivedDisabledReason}
            title=${e.deleteArchivedDisabledReason??M}
            @click=${e.onDeleteAllArchived}
          >
            ${R.trash} ${L(`sessionsView.deleteAllArchived`)}
          </button>
        `:M}
    <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
      ${e.loading?L(`common.loading`):L(`common.refresh`)}
    </button>
  `;return lt([e.error?N`<div class="sessions-error" role="alert">${e.error}</div>`:M,e.result?H({},qt(t,d,e.statusFilter)):M,H({title:L(`sessionsView.transcriptSearchTitle`),description:L(`sessionsView.transcriptSearchDescription`)},Yt(e,t)),H({title:g,description:L(`sessionsView.subtitle`),actions:_},gn(e,{paginated:l,groups:c,groupingActive:s,emptyBecauseFiltered:u,emptyMessage:m,totalRows:i,totalPages:a,page:o,sortHeader:h}))],{wide:!0})}function gn(e,t){let{paginated:n,groups:r,groupingActive:i,emptyBecauseFiltered:a,emptyMessage:o,totalRows:s,totalPages:c,page:l}=t,u=t.sortHeader,d=a?L(`sessionsView.noSessionsMatchFilters`):o,f=[[`activeMinutes`,`minutes`,L(`sessionsView.active`),L(`sessionsView.activeTooltip`,{count:e.activeMinutes.trim()}),L(`sessionsView.minutesPlaceholder`),e.statusFilter!==`active`],[`limit`,`limit`,L(`sessionsView.limit`),L(`sessionsView.limitTooltip`),M,!1]],p=[[`includeGlobal`,L(`sessionsView.global`),L(`sessionsView.globalTooltip`)],[`includeUnknown`,L(`sessionsView.unknown`),L(`sessionsView.unknownTooltip`)]],{activeMinutes:m,limit:h,includeGlobal:g,includeUnknown:_}=e,v=(t,n)=>e.onFiltersChange({activeMinutes:m,limit:h,includeGlobal:g,includeUnknown:_,[t]:n});return N`
    <div
      class="sessions-toolbar sessions-filter-bar"
      aria-label=${L(`sessionsView.filterControls`)}
    >
      <div class="data-table-search sessions-toolbar__search">
        ${R.search}
        <input
          type="text"
          placeholder=${L(`sessionsView.searchPlaceholder`)}
          .value=${e.searchQuery}
          @input=${t=>e.onSearchChange(t.target.value)}
        />
      </div>
      <div class="session-filter-primary-row">
        ${f.map(([t,n,r,i,a,o])=>N`
            <openclaw-tooltip .content=${i}>
              <label class="session-filter-field">
                <span class="session-filter-label">${r}</span>
                <input
                  class="session-filter-input session-filter-input--${n}"
                  placeholder=${a}
                  .value=${e[t]}
                  ?disabled=${o}
                  @input=${e=>v(t,e.target.value)}
                />
              </label>
            </openclaw-tooltip>
          `)}
      </div>
      <div
        class="session-filter-toggle-group"
        role="group"
        aria-label=${L(`sessionsView.sourceFilters`)}
      >
        ${p.map(([t,n,r])=>mn({name:t,checked:e[t],label:n,title:r,onChange:e=>v(t,e)}))}
        ${st({value:e.statusFilter,ariaLabel:L(`sessionsView.sessionState`),className:`sessions-view-segment`,options:[{value:`active`,label:L(`common.active`)},{value:`archived`,label:L(`sessionsView.archived`),title:L(`sessionsView.archivedOnlyTooltip`)},{value:`all`,label:L(`sessionsView.all`)}],onChange:t=>e.onStatusFilterChange(t)})}
      </div>
      <span class="sessions-toolbar__divider" aria-hidden="true"></span>
      <label class="session-groupby">
        <span class="session-groupby__label">${L(`sessionsView.groupBy`)}</span>
        <select
          class="session-groupby__select"
          @change=${t=>e.onGroupByChange(t.target.value)}
        >
          ${Qe.map(t=>N`<option value=${t} ?selected=${e.groupBy===t}>
                ${cn(t)}
              </option>`)}
        </select>
      </label>
      ${e.groupBy===`category`?N`
            <button
              class="btn btn--sm"
              ?disabled=${!!e.groupWriteDisabledReason}
              title=${e.groupWriteDisabledReason??M}
              @click=${()=>e.onRequestNewCategory()}
            >
              ${R.plus} ${L(`sessionsView.newGroup`)}
            </button>
          `:M}
    </div>

    ${e.selectedKeys.size>0?N`
          <div class="data-table-bulk-bar">
            <span>${L(`sessionsView.selected`,{count:String(e.selectedKeys.size)})}</span>
            <button class="btn btn--sm" @click=${e.onDeselectAll}>
              ${L(`common.unselect`)}
            </button>
            <button
              class="btn btn--sm danger"
              ?disabled=${e.loading||!!e.deleteSelectedDisabledReason}
              title=${e.deleteSelectedDisabledReason??M}
              @click=${e.onDeleteSelected}
            >
              ${R.trash} ${L(`sessionsView.deleteSelected`)}
            </button>
          </div>
        `:M}

    <div class="data-table-container">
      <table class="data-table sessions-table">
        <thead>
          <tr>
            <th class="data-table-checkbox-col">
              ${n.length>0?N`<input
                    type="checkbox"
                    .checked=${n.length>0&&n.every(t=>e.selectedKeys.has(t.key))}
                    .indeterminate=${n.some(t=>e.selectedKeys.has(t.key))&&!n.every(t=>e.selectedKeys.has(t.key))}
                    @change=${()=>{n.every(t=>e.selectedKeys.has(t.key))?e.onDeselectPage(n.map(e=>e.key)):e.onSelectPage(n.map(e=>e.key))}}
                    aria-label=${L(`sessionsView.selectAllOnPage`)}
                  />`:M}
            </th>
            ${u(`key`,L(`sessionsView.key`),`data-table-key-col`)}
            ${e.groupBy===`category`?N`<th>${L(`sessionsView.group`)}</th>`:M}
            ${u(`kind`,L(`sessionsView.kind`))}
            <th class="session-status-col">${L(`sessionsView.status`)}</th>
            ${u(`updated`,L(`sessionsView.updated`))}
            ${u(`tokens`,L(`sessionsView.tokens`))}
            <th class="session-actions-col">
              <span class="sessions-sr-only">${L(`sessionsView.actions`)}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          ${e.loading&&!e.result?Xt(X(e)):n.length===0?N`
                  <tr>
                    <td colspan=${X(e)} class="data-table-empty-cell">
                      <div class="data-table-empty-state" role="status" aria-live="polite">
                        <div class="data-table-empty-state__message">
                          ${a?R.search:R.messageSquare}
                          <span>${d}</span>
                        </div>
                        ${a?N`
                              <button class="btn btn--sm" @click=${e.onClearFilters}>
                                ${L(`sessionsView.showAll`)}
                              </button>
                            `:M}
                      </div>
                    </td>
                  </tr>
                `:r?r.flatMap(t=>{let n=t.rows.flatMap(t=>_n(t,e));return n.unshift(dn(t,e)),n}):n.flatMap(t=>_n(t,e))}
        </tbody>
      </table>
    </div>

    ${s>0&&!i?N`
          <div class="data-table-pagination">
            <div class="data-table-pagination__info">
              ${L(`sessionsView.pagination`,{start:String(l*e.pageSize+1),end:String(Math.min((l+1)*e.pageSize,s)),total:String(s)})}
            </div>
            <div class="data-table-pagination__controls">
              <select
                class="data-table-pagination__size"
                aria-label=${L(`sessionsView.pageSize`)}
                .value=${String(e.pageSize)}
                @change=${t=>e.onPageSizeChange(Number(t.target.value))}
              >
                ${Cn.map(t=>N`<option value=${t} ?selected=${t===e.pageSize}>
                      ${L(`sessionsView.rowsPerPage`,{count:String(t)})}
                    </option>`)}
              </select>
              <button ?disabled=${l<=0} @click=${()=>e.onPageChange(l-1)}>
                ${L(`common.previous`)}
              </button>
              <button
                ?disabled=${l>=c-1}
                @click=${()=>e.onPageChange(l+1)}
              >
                ${L(`common.next`)}
              </button>
            </div>
          </div>
        `:M}
  `}function _n(e,t){let n=e.updatedAt?h(e.updatedAt):L(`common.na`),r=e.latestCompactionCheckpoint,i=e.compactionCheckpointCount??0,a=Math.max(i,+!!r),o=i>0||!!r,s=t.expandedSessionKey===e.key,c=`session-details-${encodeURIComponent(e.key)}`,l=I(e.displayName)??null,u=I(e.label)??``,d=!!(l&&l!==e.key&&l!==u),f=C(e.key),p=f?q(t.agentIdentityById,f.agentId):null,m=I(p?.emoji)??``,g=I(p?.name)??``,_=g&&f?`${m?`${m} `:``}${g} (${f.channel})`:null,v=_??e.key,y=e.kind!==`global`,b=y?D({face:ne(e),sessionKey:e.key,fallbackAgentId:t.agentId,basePath:t.basePath,row:e,mainKey:t.mainKey,preferenceDerivedFace:!0}).href:null,x=`session-kind session-kind--${Y(e)}`,S=[`session-data-row`,`session-data-row--expandable`,t.statusFilter===`all`&&e.archived===!0?`session-data-row--archived`:``,s?`session-data-row--expanded`:``,t.sessionMenu?.key===e.key?`session-data-row--menu-open`:``].filter(Boolean).join(` `),w=L(s?`sessionsView.hideSessionDetails`:`sessionsView.showSessionDetails`,{count:v}),T=t.groupBy===`category`,E=un(t,I(e.category)??null);return[N`<tr
      class=${S}
      tabindex="0"
      aria-expanded=${String(s)}
      aria-controls=${c}
      draggable=${T?`true`:M}
      aria-description=${T?L(`sessionsView.dragSessionHint`):M}
      @dragstart=${T?t=>{t.dataTransfer?.setData(B,e.key),t.dataTransfer&&(t.dataTransfer.effectAllowed=`move`)}:M}
      @dragover=${E.dragover}
      @dragleave=${E.dragleave}
      @drop=${E.drop}
      @contextmenu=${n=>{n.preventDefault(),t.onOpenSessionMenu(e,{x:n.clientX,y:n.clientY},null)}}
      @click=${n=>{pn(n.target)||t.onToggleDetails(e.key)}}
      @keydown=${n=>{pn(n.target)||(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),t.onToggleDetails(e.key))}}
    >
      <td class="data-table-checkbox-col">
        <input
          type="checkbox"
          .checked=${t.selectedKeys.has(e.key)}
          @change=${()=>t.onToggleSelect(e.key)}
          aria-label=${`${L(`sessionsView.selectSession`)}: ${e.key}`}
        />
      </td>
      <td class="data-table-key-col">
        <openclaw-tooltip .content=${v}>
          <div class=${_?`session-key-cell`:`mono session-key-cell`}>
            ${Wt(e)}
            <div class="session-key-cell__text">
              <span class="session-key-cell__primary">
                ${e.unread===!0?N`<span
                      class="session-unread-dot"
                      role="img"
                      aria-label=${L(`sessionsView.unread`)}
                    ></span>`:M}
                ${y?N`<a
                      href=${b}
                      class="session-link"
                      @click=${n=>{n.defaultPrevented||n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||t.onNavigateToChat&&(n.preventDefault(),t.onNavigateToChat(e.key))}}
                      >${_??e.key}</a
                    >`:N`<span>${_??e.key}</span>`}
                ${u?N`<span class="session-label-chip" title=${u}
                      >${u}</span
                    >`:M}
              </span>
              ${d?N`<span class="muted session-key-display-name">${l}</span>`:M}
            </div>
          </div>
        </openclaw-tooltip>
      </td>
      ${T?fn(e,t):M}
      <td>
        <span class=${x}>${Y(e)}</span>
      </td>
      <td class="session-status-col">
        <div class="session-status-stack">
          ${Ut(e)} ${on(e.goal)}
          ${t.statusFilter===`all`&&e.archived===!0?V({kind:`muted`,label:L(`sessionsView.archived`)}):M}
        </div>
      </td>
      <td>${n}</td>
      <td class="session-token-cell">${Kt(e)}</td>
      <td class="session-actions-cell">
        <div class="session-actions">
          <button
            class="session-details-toggle"
            type="button"
            aria-expanded=${String(s)}
            aria-controls=${c}
            aria-label=${w}
            @click=${n=>{n.stopPropagation(),t.onToggleDetails(e.key)}}
          >
            ${a>0?N`<span class="settings-count session-compaction-count"
                  >${a}</span
                >`:M}
            ${R.chevronDown}
          </button>
          <button
            class="icon-btn"
            type="button"
            title=${L(`chat.sidebar.openSessionMenu`)}
            aria-label=${L(`chat.sidebar.openSessionMenu`)}
            aria-haspopup="menu"
            aria-expanded=${String(t.sessionMenu?.key===e.key)}
            @click=${n=>{n.stopPropagation();let r=n.currentTarget,i=r.getBoundingClientRect();t.onOpenSessionMenu(e,{x:i.right,y:i.bottom+4},r)}}
          >
            ${R.moreHorizontal}
          </button>
        </div>
      </td>
    </tr>`,...s?[vn({row:e,props:t,detailsId:c,friendlyKeyLabel:_,displayName:l,showDisplayName:d,kindClass:x,updated:n,visibleCheckpointCount:a,hasCheckpoints:o})]:[]]}function vn(e){let{row:t,props:n,detailsId:r,friendlyKeyLabel:i,displayName:a,showDisplayName:o,kindClass:s,updated:c,visibleCheckpointCount:l,hasCheckpoints:u}=e,d=t.thinkingLevel??``,f=d?W(d):``,p=J(zt(t,n.result?.defaults),f),m=t.fastMode===`auto`?`auto`:t.fastMode===!0?`on`:t.fastMode===!1?`off`:``,g=J(Vt(xn),m),_=t.verboseLevel??``,v=J(Vt(bn,!0),_),y=t.reasoningLevel??``,b=Bt(Sn,y),x=n.checkpointItemsByKey[t.key]??[],S=n.checkpointErrorByKey[t.key],C=nn(l),w=sn({row:t,updated:c,checkpointCount:l});return N`<tr id=${r} class="session-details-row">
    <td colspan=${X(n)}>
      <div class="session-details-panel">
        <div class="session-details-panel__hero">
          <div>
            <div class="session-details-panel__eyebrow">${L(`sessionsView.sessionDetails`)}</div>
            <div class="session-details-panel__title">${i??t.key}</div>
            ${o?N`<div class="muted session-details-panel__subtitle">${a}</div>`:M}
          </div>
          <div class="session-details-panel__badges">
            ${Ut(t)} ${on(t.goal)}
            <span class=${s}>${Y(t)}</span>
          </div>
        </div>

        <div class="session-details-section">
          <div class="session-details-panel__eyebrow">${L(`sessionsView.overrides`)}</div>
          <div class="session-overrides-grid">
            <label class="session-override-field">
              <span class="session-override-field__label">${L(`sessionsView.label`)}</span>
              <input
                class="settings-input"
                .value=${t.label??``}
                ?disabled=${n.loading||!!n.patchWriteDisabledReason}
                title=${n.patchWriteDisabledReason??M}
                placeholder=${L(`sessionsView.optionalPlaceholder`)}
                @change=${e=>{let r=I(e.target.value)??null;n.onPatch(t.key,{label:r})}}
              />
            </label>
            ${Q({label:L(`sessionsView.thinking`),disabled:n.loading||!!n.patchAdminDisabledReason,disabledReason:n.patchAdminDisabledReason,options:p,current:f,onChange:e=>n.onPatch(t.key,{thinkingLevel:e||null})})}
            ${Q({label:L(`sessionsView.fast`),disabled:n.loading||!!n.patchAdminDisabledReason,disabledReason:n.patchAdminDisabledReason,options:g,current:m,onChange:e=>n.onPatch(t.key,{fastMode:e===``?null:e===`auto`?`auto`:e===`on`})})}
            ${Q({label:L(`sessionsView.verbose`),disabled:n.loading||!!n.patchAdminDisabledReason,disabledReason:n.patchAdminDisabledReason,options:v,current:_,onChange:e=>n.onPatch(t.key,{verboseLevel:e||null})})}
            ${Q({label:L(`sessionsView.reasoning`),disabled:n.loading||!!n.patchAdminDisabledReason,disabledReason:n.patchAdminDisabledReason,options:b.map(e=>({value:e,label:e||L(`sessionsView.inherit`)})),current:y,onChange:e=>n.onPatch(t.key,{reasoningLevel:e||null})})}
          </div>
        </div>

        <div class="session-details-grid">
          ${w.map(e=>N`
              <div class="session-detail-stat">
                <div class="session-detail-stat__label">${e.label}</div>
                <openclaw-tooltip .content=${e.value}>
                  <div class="session-detail-stat__value">${e.value}</div>
                </openclaw-tooltip>
              </div>
            `)}
        </div>

        <div class="session-details-section">
          <div class="session-details-section__header">
            <div>
              <div class="session-details-panel__eyebrow">
                ${L(`sessionsView.compactionHistory`)}
              </div>
              <div class="session-details-section__title">${C}</div>
            </div>
          </div>
          ${n.checkpointLoadingKey===t.key?N`<div class="muted session-details-empty">
                ${L(`sessionsView.loadingCheckpoints`)}
              </div>`:S?N`<div class="callout danger" role="alert">${S}</div>`:!u||x.length===0?N`<div class="muted session-details-empty">
                    ${L(`sessionsView.noCheckpoints`)}
                  </div>`:N`
                    <div class="session-checkpoint-list">
                      ${x.map(e=>N`
                          <div class="session-checkpoint-card">
                            <div class="session-checkpoint-card__header">
                              <strong>
                                ${tn(e.reason)} ·
                                ${h(e.createdAt)}
                              </strong>
                              <span class="muted session-checkpoint-card__delta">
                                ${rn(e)}
                              </span>
                            </div>
                            ${e.summary?N`<div class="session-checkpoint-card__summary">
                                  ${e.summary}
                                </div>`:N`<div class="muted">${L(`sessionsView.noSummary`)}</div>`}
                            <div class="session-checkpoint-card__actions">
                              <button
                                class="btn btn--sm"
                                ?disabled=${n.checkpointBusyKey===e.checkpointId||!!n.checkpointBranchDisabledReason}
                                title=${n.checkpointBranchDisabledReason??M}
                                @click=${()=>n.onBranchFromCheckpoint(t.key,e.checkpointId)}
                              >
                                ${L(`sessionsView.branchFromCheckpoint`)}
                              </button>
                              <button
                                class="btn btn--sm"
                                ?disabled=${n.checkpointBusyKey===e.checkpointId||!!n.checkpointRestoreDisabledReason}
                                title=${n.checkpointRestoreDisabledReason??M}
                                @click=${()=>n.onRestoreCheckpoint(t.key,e.checkpointId)}
                              >
                                ${L(`sessionsView.restoreCheckpoint`)}
                              </button>
                            </div>
                          </div>
                        `)}
                    </div>
                  `}
        </div>
      </div>
    </td>
  </tr>`}var yn,bn,xn,Sn,Cn,wn,Tn,En,Dn,On,kn,An,jn,Mn=e((()=>{me(),Rt(),Le(),ut(),Fe(),Ne(),g(),ht(),oe(),pt(),te(),bt(),vt(),d(),ze(),Ye(),se(),O(),s(),Lt(),yn=[`off`,`minimal`,`low`,`medium`,`high`],bn=[``,`off`,`on`,`full`],xn=[``,`auto`,`on`,`off`],Sn=[``,`off`,`on`,`stream`],Cn=[10,25,50,100],wn={running:`sessionsView.statusRunning`,done:`sessionsView.statusDone`,failed:`sessionsView.statusFailed`,killed:`sessionsView.statusKilled`,timeout:`sessionsView.statusTimeout`},Tn={cron:R.clock,direct:R.messageSquare,group:R.users,global:R.globe,unknown:R.circle},En=65,Dn=85,On=4,kn={manual:`sessionsView.manual`,"auto-threshold":`sessionsView.autoThreshold`,"overflow-retry":`sessionsView.overflowRetry`,"timeout-retry":`sessionsView.timeoutRetry`},An=`__new-group__`,jn={none:`sessionsView.groupByNone`,category:`sessionsView.groupByCategory`,channel:`sessionsView.groupByChannel`,kind:`sessionsView.groupByKind`,agent:`sessionsView.groupByAgent`,date:`sessionsView.groupByDate`}})),Nn,$;e((()=>{xe(),ge(),me(),pe(),Oe(),Se(),ke(),Ae(),Ct(),dt(),qe(),Ke(),Pe(),Tt(),ut(),ot(),Ne(),_(),Ve(),Re(),nt(),T(),a(),He(),ie(),$e(),se(),O(),s(),it(),ee(),Dt(),l(),v(),jt(),Pt(),Lt(),Mn(),t(),Nn=`https://docs.openclaw.ai/concepts/session`,$=class extends b{constructor(...e){super(...e),this.result=null,this.loading=!1,this.error=null,this.activeMinutes=``,this.limit=String(A.limit),this.includeGlobal=!0,this.includeUnknown=!1,this.statusFilter=`active`,this.searchQuery=``,this.transcriptSearchQuery=``,this.submittedTranscriptSearchQuery=``,this.transcriptSearch={status:`idle`},this.sortColumn=`updated`,this.sortDir=`desc`,this.groupBy=Ft(),this.page=0,this.pageSize=25,this.selectedKeys=new Set,this.sessionMenu=null,this.sessionMenuWork=null,this.expandedSessionKey=null,this.deepLinkSessionKey=null,this.checkpointItemsByKey={},this.checkpointTaskKey=null,this.checkpointBusyKey=null,this.checkpointErrorByKey={},this.sessionRequestId=0,this.pageEpoch=0,this.routeDataInitialized=!1,this.routeDataEnabled=!0,this.ignorePendingSharedRefresh=!1,this.sessionMutationPending=!1,this.sessionReloadQueued=!1,this.sharedSessionsResult=null,this.sharedSessionsLoading=!1,this.gatewayClient=null,this.gatewayConnected=!1,this.sessionMenuTrigger=null,this.sessionMenuWorkVersion=0,this.hasBoundGatewaySource=!1,this.hasBoundSessionsSource=!1,this.observeAgentScope=m(()=>{this.resetTranscriptSearchState(this.transcriptSearchQuery),this.routeDataInitialized&&!this.deepLinkSessionKey&&(this.page=0,this.selectedKeys=new Set,this.loadSessions()),this.requestUpdate()}),this.subscriptions=new r(this).effect(()=>this.context?.sessions,e=>{let t=this.hasBoundSessionsSource&&!Object.is(this.sessionsSource,e);this.hasBoundSessionsSource=!0,this.sessionsSource=e,t&&(this.invalidatePageWork(),this.resetProviderState()),this.sharedSessionsResult=e.state.result,this.sharedSessionsLoading=e.state.loading;let n=e.subscribe(t=>{if(!Object.is(this.context?.sessions,e))return;let n=t.result!==this.sharedSessionsResult,r=this.sharedSessionsLoading&&!t.loading;if(this.sharedSessionsResult=t.result,this.sharedSessionsLoading=t.loading,!(t.loading||!this.routeDataInitialized||this.sessionMutationPending)){if(this.ignorePendingSharedRefresh&&r){this.ignorePendingSharedRefresh=!1;return}n&&this.scheduleSessionReload()}});return t&&this.routeDataInitialized&&this.scheduleSessionReload(),n}).watch(()=>this.context?.agentIdentity,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).effect(()=>this.context?.gateway,e=>{let t=this.hasBoundGatewaySource;this.hasBoundGatewaySource=!0;let n=e.subscribe(t=>{Object.is(this.context?.gateway,e)&&this.applyGatewaySnapshot(t)});return this.applyGatewaySnapshot(e.snapshot,t),n}).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).watch(()=>this.context?.workboard,(e,t)=>e.subscribe(t)),this.transcriptSearchTask=new be(this,{args:()=>this.transcriptSearchArgs(),task:async([e,t,n,r,i])=>{if(!e||!t||!n||!i)return null;let a=await At({client:e,query:t,result:this.result,listSessions:n.sessions.list,listOptions:this.sessionListOptions(),resolveAgentId:e=>j(e)?.agentId??this.sessionAgentId(e,n)});return{results:a.results,indexing:a.indexing===!0,truncated:a.truncated===!0}},onComplete:e=>{this.transcriptSearch=e?{status:`results`,...e}:{status:`idle`}},onError:e=>{this.transcriptSearch={status:`error`,message:String(e)}}}),this.checkpointTask=new be(this,{autoRun:!1,args:()=>[null,``],task:async([e,t])=>!e||!t?ye:{sessionKey:t,checkpoints:await e.sessions.listCheckpoints(t,{agentId:this.sessionAgentId(t,e.context)})},onComplete:({sessionKey:e,checkpoints:t})=>{this.checkpointItemsByKey={...this.checkpointItemsByKey,[e]:t}},onError:e=>{let t=this.checkpointTaskKey;t&&(this.checkpointErrorByKey={...this.checkpointErrorByKey,[t]:String(e)})}})}transcriptSearchArgs(){let e=this.context,t=e?.gateway.snapshot;return[t?.phase===`connected`?t.client??null:null,this.submittedTranscriptSearchQuery,e??null,e?.agentSelection.state.scopeId??null,t?z(t,`sessions.search`)===!0:!1]}willUpdate(e){(e.has(`routeData`)||e.has(`context`))&&this.applyRouteData()}disconnectedCallback(){this.subscriptions.clear(),this.invalidatePageWork(),this.gatewayClient=null,this.gatewayConnected=!1,super.disconnectedCallback()}applyGatewaySnapshot(e,t=!1){let n=t||e.client!==this.gatewayClient,r=e.phase===`connected`!==this.gatewayConnected,i=e.phase===`connected`&&!this.gatewayConnected;if(this.gatewayClient=e.client,this.gatewayConnected=e.phase===`connected`,(n||r)&&(this.invalidatePageWork(),this.ignorePendingSharedRefresh=!1),n&&this.resetProviderState(),e.phase!==`connected`||!e.client){this.requestUpdate();return}this.routeDataInitialized&&(n||i)&&(this.ignorePendingSharedRefresh=!0,this.loadSessions()),this.requestUpdate()}invalidatePageWork(){this.pageEpoch+=1,this.sessionRequestId+=1,this.submittedTranscriptSearchQuery=``,this.transcriptSearch={status:`idle`},this.transcriptSearchTask.run(this.transcriptSearchArgs()),this.resetCheckpointTask(),this.sessionReloadQueued=!1,this.loading=!1,this.checkpointBusyKey=null,this.sessionMutationPending=!1,this.closeSessionMenu()}resetProviderState(){this.result=null,this.error=null,this.loading=!1,this.resetTranscriptSearchState(``),this.selectedKeys=new Set,this.expandedSessionKey=null,this.deepLinkSessionKey=null,this.checkpointItemsByKey={},this.checkpointTaskKey=null,this.checkpointBusyKey=null,this.checkpointErrorByKey={}}captureRequestScope(){let e=this.context;if(!this.isConnected||!e)return null;let t=e.gateway,n=t.snapshot.client;return t.snapshot.phase!==`connected`||!n?null:{epoch:this.pageEpoch,context:e,gateway:t,sessions:e.sessions,workboard:e.workboard,client:n}}isRequestScopeCurrent(e){let t=this.context,n=t?.gateway;return this.isConnected&&this.pageEpoch===e.epoch&&t===e.context&&n===e.gateway&&t.sessions===e.sessions&&t.workboard===e.workboard&&n.snapshot.phase===`connected`&&n.snapshot.client===e.client}mutationDisabledReason(e){let t=p(this.context?.gateway.snapshot,e);return t.allowed?void 0:t.reason}requireMutationAccess(e,t){let n=p(e.gateway.snapshot,t);return n.allowed?!0:(this.error=n.reason,!1)}selectedDeleteDisabledReason(){let e=new Map(this.result?.sessions.map(e=>[e.key,e])??[]);for(let t of this.selectedKeys){let n=e.get(t),r=this.mutationDisabledReason({method:`sessions.delete`,params:{key:t,...n?.archived===!0?{archivedOnly:!0}:{}}});if(r)return r}}sessionMenuActionDisabledReasons(e){let t=this.mutationDisabledReason({method:`sessions.patch`,params:{key:e.key,label:null}}),n=this.mutationDisabledReason({method:`sessions.groups.put`,requiredScope:`operator.write`}),r=this.mutationDisabledReason({method:`sessions.create`,params:{parentSessionKey:e.key,fork:!0}}),i=this.mutationDisabledReason({method:`sessions.reclaim`,requiredScope:`operator.admin`}),a=this.mutationDisabledReason({method:`sessions.delete`,params:{key:e.key,...e.archived===!0?{archivedOnly:!0}:{}}});return{...t?{"toggle-pin":t,"set-icon":t,"toggle-unread":t,rename:t,"move-to-group":t,"toggle-archived":t}:{},...n||t?{"new-group":n??t}:{},...r?{fork:r}:{},...i?{"stop-cloud-worker":i}:{},...a?{delete:a}:{}}}applyRouteData(){let e=this.routeData,t=this.context;if(!e||!t||(e!==this.appliedRouteData&&(this.appliedRouteData=e,this.routeDataEnabled=!0),this.routeDataInitialized=!0,!this.routeDataEnabled))return;this.statusFilter=e.statusFilter,e.expandedSessionKey?(this.activeMinutes=``,this.limit=String(A.limit),this.includeGlobal=!0,this.includeUnknown=!0,this.searchQuery=``,this.page=0,this.selectedKeys=new Set):(this.activeMinutes=``,this.limit=String(A.limit),this.includeGlobal=!0,this.includeUnknown=!1),this.expandedSessionKey=e.expandedSessionKey,this.deepLinkSessionKey=e.expandedSessionKey;let n=t.gateway,r=n.snapshot;if(this.gatewayClient=r.client,this.gatewayConnected=r.phase===`connected`,e.gateway!==n||e.gatewaySnapshot!==r){this.routeDataEnabled=!1,this.loadSessions(),e.expandedSessionKey&&this.loadCheckpoint(e.expandedSessionKey);return}this.result=e.result?o(e.result,{archivedFilter:e.statusFilter}):null,this.error=e.error,this.loading=!1;let i=t.sessions.state;this.ignorePendingSharedRefresh=i.loading,this.ensureAgentIdentities(this.result),e.expandedSessionKey&&this.loadCheckpoint(e.expandedSessionKey)}scheduleSessionReload(){if(this.sessionReloadQueued)return;this.sessionReloadQueued=!0;let e=this.pageEpoch;queueMicrotask(()=>{if(e!==this.pageEpoch)return;this.sessionReloadQueued=!1;let t=this.context,n=t?.gateway.snapshot;this.isConnected&&t&&n?.phase===`connected`&&n.client&&!t.sessions.state.loading&&this.loadSessions()})}sessionAgentId(e,t=this.context){if(!t)return;let{agentId:n}=y({assistantAgentId:t.agentSelection.state.selectedId,hello:t.gateway.snapshot.hello},e);return n}sessionPathAgentId(e,t){return this.sessionAgentId(e,t)??w(t)}sessionListOptions(){let e=this.deepLinkSessionKey,t=this.context?.agentSelection.state.scopeId??void 0;return{activeMinutes:e||this.statusFilter!==`active`?void 0:G(this.activeMinutes),limit:e?A.limit:G(this.limit),search:e??void 0,includeGlobal:e?!0:this.includeGlobal,includeUnknown:e?!0:this.includeUnknown,archivedFilter:this.statusFilter,...e?{agentId:this.sessionAgentId(e)}:t?{agentId:t}:{}}}async loadSessions(){let e=this.captureRequestScope();if(!e)return;let t=++this.sessionRequestId,n=this.result;this.routeDataEnabled=!1,this.loading=!0,this.error=null;try{let r=await e.sessions.list(this.sessionListOptions());if(t!==this.sessionRequestId||!this.isRequestScopeCurrent(e))return;this.result=r?o(r,{archivedFilter:this.statusFilter}):null,this.ensureAgentIdentities(this.result);let i=this.reconcileCheckpointCache(n,this.result);i&&this.loadCheckpoint(i)}catch(n){t===this.sessionRequestId&&this.isRequestScopeCurrent(e)&&(this.error=String(n))}finally{t===this.sessionRequestId&&this.isRequestScopeCurrent(e)&&(this.loading=!1)}}resetTranscriptSearchState(e){this.transcriptSearchQuery=e,this.submittedTranscriptSearchQuery=``,this.transcriptSearch={status:`idle`},this.transcriptSearchTask.run(this.transcriptSearchArgs())}updateTranscriptSearchQuery(e){e!==this.transcriptSearchQuery&&this.resetTranscriptSearchState(e)}clearTranscriptSearch(){this.resetTranscriptSearchState(``)}async runTranscriptSearch(){let e=this.transcriptSearchQuery.trim();if(!e){this.clearTranscriptSearch();return}let t=this.captureRequestScope();!t||z(t.gateway.snapshot,`sessions.search`)!==!0||(this.transcriptSearchQuery=e,this.submittedTranscriptSearchQuery=e,this.transcriptSearch={status:`loading`},await this.transcriptSearchTask.run(this.transcriptSearchArgs()))}ensureAgentIdentities(e){let t=this.context;if(!t||!e)return;let n=Ot(e).filter(e=>!t.agentIdentity.get(e));n.length!==0&&t.agentIdentity.ensure(n)}reconcileCheckpointCache(e,t){let n=new Map((t?.sessions??[]).map(e=>[e.key,e])),r=new Map((e?.sessions??[]).map(e=>[e.key,e])),i={...this.checkpointItemsByKey},a={...this.checkpointErrorByKey},o=null;for(let e of Object.keys(i)){let t=n.get(e),s=r.get(e);(!t||!s||s.compactionCheckpointCount!==t.compactionCheckpointCount||s.latestCompactionCheckpoint?.checkpointId!==t.latestCompactionCheckpoint?.checkpointId)&&(delete i[e],delete a[e],this.expandedSessionKey===e&&(o=e))}return this.checkpointItemsByKey=i,this.checkpointErrorByKey=a,o}updateFilters(e){this.activeMinutes=e.activeMinutes,this.limit=e.limit,this.includeGlobal=e.includeGlobal,this.includeUnknown=e.includeUnknown,this.page=0,this.selectedKeys=new Set,this.deepLinkSessionKey=null,this.loadSessions()}updateStatusFilter(e){let t=this.context;e===this.statusFilter||!t||(this.statusFilter=e,this.page=0,this.selectedKeys=new Set,this.deepLinkSessionKey=null,this.loading=!0,this.error=null,t.navigate(`sessions`,e===`active`?void 0:{search:`?status=${e}`}))}async deleteSelected(){let e=[...this.selectedKeys];if(e.length===0||this.loading||this.sessionMutationPending)return;let t=this.captureRequestScope();if(!t||!await U({message:L(e.length===1?`sessionsView.deleteSelectedConfirmOne`:`sessionsView.deleteSelectedConfirm`,{count:String(e.length)}),confirmLabel:L(`common.delete`),danger:!0})||!this.isRequestScopeCurrent(t))return;let n=new Map(this.result?.sessions.map(e=>[e.key,e])??[]);await this.deleteSessions(e.map(e=>n.get(e)??{key:e}))}async deleteSessions(e,t={}){if(e.length===0||this.loading||this.sessionMutationPending)return;let n=this.captureRequestScope();if(!n)return;let r=e.map(e=>({key:e.key,agentId:this.sessionAgentId(e.key,n.context),...t,...e.archived===!0?{archivedOnly:!0}:{}}));for(let e of r)if(!this.requireMutationAccess(n,{method:`sessions.delete`,params:e}))return;this.sessionMutationPending=!0;try{let e=await n.sessions.deleteMany(r);if(!this.isRequestScopeCurrent(n))return;if(e.preservedWorktrees.length>0&&window.alert(L(`sessionsView.deletePreservedWorktrees`,{count:String(e.preservedWorktrees.length),branches:e.preservedWorktrees.map(e=>e.branch).join(`, `)})),e.deleted.length>0){let t=new Set(e.deleted),r=new Set(this.selectedKeys);for(let t of e.deleted)r.delete(t);if(this.selectedKeys=r,this.result){let e=this.result.sessions.filter(e=>!t.has(e.key));this.result={...this.result,count:Math.max(0,this.result.count-(this.result.sessions.length-e.length)),sessions:e}}this.expandedSessionKey&&t.has(this.expandedSessionKey)&&(this.expandedSessionKey=null),this.deepLinkSessionKey&&t.has(this.deepLinkSessionKey)&&(this.deepLinkSessionKey=null);let a=e.deleted.find(e=>E(e,n.gateway.snapshot.sessionKey));if(a){let e=j(a)?.agentId??n.context.agentSelection.state.selectedId??`main`;De({selection:n.context.agentSelection,gateway:n.gateway,agentId:e,sessionKey:re({agentId:e,mainKey:i({agentsList:n.context.agents.state.agentsList,hello:n.gateway.snapshot.hello})})})}}e.errors.length>0&&(this.error=e.errors.join(`; `))}catch(e){this.isRequestScopeCurrent(n)&&(this.error=String(e))}finally{this.isRequestScopeCurrent(n)&&(this.sessionMutationPending=!1)}}async deleteAllArchived(){let e=this.captureRequestScope();if(!e||this.loading||this.sessionMutationPending)return;let t;try{let{search:n,agentId:r,...i}=this.sessionListOptions(),a=e.context.agentSelection.state.scopeId?.trim(),o={...i,...a?{agentId:a}:{}},s=await et({list:t=>e.sessions.list({...o,limit:1e3,offset:t}),isCurrent:()=>this.isRequestScopeCurrent(e),missingResultError:e.sessions.state.error??`archived session enumeration returned no result`,stalledPaginationError:`archived session enumeration did not advance`,incompletePaginationError:`archived session enumeration was incomplete`});if(!s)return;t=s}catch(t){this.isRequestScopeCurrent(e)&&(this.error=String(t));return}let n=t.filter(e=>e.archived===!0);n.length!==0&&(!await U({message:L(`sessionsView.deleteAllArchivedConfirm`,{count:String(n.length)}),confirmLabel:L(`common.delete`),danger:!0})||!this.isRequestScopeCurrent(e)||await this.deleteSessions(n,{deleteTranscript:!0}))}async deleteSessionFromMenu(e){let t=I(e.label)??e.key,n=this.captureRequestScope();!n||!await U({message:L(`sessionsView.deleteSessionConfirm`,{session:t}),confirmLabel:L(`common.delete`),danger:!0})||!this.isRequestScopeCurrent(n)||await this.deleteSessions([e])}async stopCloudWorker(e){let t=I(e.label)??e.key;if(!Ie(e.placement)||e.hasActiveRun===!0)return;let n=this.captureRequestScope();if(!n||!await U({message:L(`sessionsView.stopCloudWorkerConfirm`,{session:t}),confirmLabel:L(`sessionsView.stopCloudWorkerConfirmAction`),danger:!0})||!this.isRequestScopeCurrent(n)||!this.requireMutationAccess(n,{method:`sessions.reclaim`,requiredScope:`operator.admin`}))return;let r=j(e.key)?.agentId;this.sessionMutationPending=!0;try{await n.client.request(`sessions.reclaim`,{key:e.key,...r?{agentId:r}:{}},{timeoutMs:10*6e4}),this.isRequestScopeCurrent(n)&&await this.loadSessions()}catch(e){this.isRequestScopeCurrent(n)&&(this.error=String(e))}finally{this.isRequestScopeCurrent(n)&&(this.sessionMutationPending=!1)}}knownCategories(){return Mt(this.result,this.context?.sessions.state.groups??[])}setGroupBy(e){this.groupBy=e,It(e)}async rememberCustomGroup(e){let t=this.captureRequestScope();t&&!this.requireMutationAccess(t,{method:`sessions.groups.put`,requiredScope:`operator.write`})||await Nt({name:e,knownCategories:this.knownCategories(),sessions:t?.sessions,isCurrent:()=>!!(t&&this.isRequestScopeCurrent(t)),onError:e=>{this.error=e}})}assignCategory(e,t){let n=this.result?.sessions.find(t=>t.key===e);n&&(n.category?.trim()||null)!==t&&(t&&this.rememberCustomGroup(t),this.patchSession(e,{category:t}))}requestNewCategory(e){let t=window.prompt(L(`sessionsView.newGroupPrompt`))?.trim();t&&(this.rememberCustomGroup(t),e&&this.patchSession(e,{category:t}))}renameSession(e){let t=window.prompt(L(`sessionsView.renameSessionPrompt`),I(e.label)??``);t!==null&&this.patchSession(e.key,{label:I(t)??null})}async patchSession(e,t,n=this.captureRequestScope()){if(!n)return`stale`;let r=this.sessionAgentId(e,n.context);if(!this.requireMutationAccess(n,{method:`sessions.patch`,params:{key:e,...t,...r?{agentId:r}:{}}}))return`failed`;try{let i=await n.sessions.patch(e,t,{agentId:r});if(!this.isRequestScopeCurrent(n))return`stale`;if(!i)return this.error=n.sessions.state.error,`failed`;let a=new Set(this.selectedKeys);return a.delete(e),this.selectedKeys=a,`completed`}catch(e){return this.isRequestScopeCurrent(n)?(this.error=String(e),`failed`):`stale`}}async archiveSessionWithUndo(e){let t=this.captureRequestScope();t&&(await this.patchSession(e.key,{archived:!0},t)!==`completed`||!this.isRequestScopeCurrent(t)||rt({message:L(`sessionsView.sessionArchived`),actionLabel:L(`common.undo`),onAction:()=>{(async()=>{this.isRequestScopeCurrent(t)&&await this.patchSession(e.key,{archived:!1,...e.pinned===!0?{pinned:!0}:{}},t)})()}}))}async forkSession(e){let t=this.captureRequestScope();if(!t)return;let n=this.sessionAgentId(e,t.context),r={parentSessionKey:e,fork:!0,...n?{agentId:n}:{}};if(this.requireMutationAccess(t,{method:`sessions.create`,params:r}))try{let e=await t.sessions.create(r);if(!this.isRequestScopeCurrent(t))return;e?t.context.navigate(`chat`,{...D({context:t.context,face:`chat`,sessionKey:e,agentId:n??this.sessionPathAgentId(e,t.context)}).options,hash:``}):t.sessions.state.error&&(this.error=t.sessions.state.error)}catch(e){this.isRequestScopeCurrent(t)&&(this.error=String(e))}}async toggleSessionDetails(e){if(!this.context)return;if(this.deepLinkSessionKey=null,this.expandedSessionKey===e){this.resetCheckpointTask(),this.expandedSessionKey=null;return}this.expandedSessionKey=e;let t=this.result?.sessions.find(t=>t.key===e);if(!((t?.compactionCheckpointCount??0)>0||t?.latestCompactionCheckpoint)){this.checkpointItemsByKey[e]||(this.checkpointItemsByKey={...this.checkpointItemsByKey,[e]:[]});return}this.checkpointItemsByKey[e]||await this.loadCheckpoint(e)}async loadCheckpoint(e){let t=this.captureRequestScope();t&&(this.checkpointTaskKey=e,this.checkpointErrorByKey={...this.checkpointErrorByKey,[e]:``},await this.checkpointTask.run([t,e]))}resetCheckpointTask(){this.checkpointTaskKey=null,this.checkpointTask.run([null,``])}get checkpointLoadingKey(){return this.checkpointTask.status===_e.PENDING?this.checkpointTaskKey:null}async branchCheckpoint(e,t){let n=this.captureRequestScope();if(!(!n||!await U({message:L(`sessionsView.branchCheckpointConfirm`),confirmLabel:L(`common.create`)})||!this.isRequestScopeCurrent(n))&&this.requireMutationAccess(n,{method:`sessions.compaction.branch`,requiredScope:`operator.write`})){this.checkpointBusyKey=t;try{let r=await n.sessions.branchCheckpoint(e,t,{agentId:this.sessionAgentId(e,n.context)});this.isRequestScopeCurrent(n)&&n.context.navigate(`chat`,{...D({context:n.context,face:`chat`,sessionKey:r.key,agentId:this.sessionPathAgentId(r.key,n.context)}).options,hash:``})}catch(e){this.isRequestScopeCurrent(n)&&(this.error=String(e))}finally{this.isRequestScopeCurrent(n)&&this.checkpointBusyKey===t&&(this.checkpointBusyKey=null)}}}async restoreCheckpoint(e,t){let n=this.captureRequestScope();if(!(!n||!await U({message:L(`sessionsView.restoreCheckpointConfirm`),confirmLabel:L(`common.restore`),danger:!0})||!this.isRequestScopeCurrent(n))&&this.requireMutationAccess(n,{method:`sessions.compaction.restore`,requiredScope:`operator.admin`})){this.checkpointBusyKey=t;try{await n.sessions.restoreCheckpoint(e,t,{agentId:this.sessionAgentId(e,n.context)})}catch(e){this.isRequestScopeCurrent(n)&&(this.error=String(e))}finally{this.isRequestScopeCurrent(n)&&this.checkpointBusyKey===t&&(this.checkpointBusyKey=null)}}}openSessionMenu(e,t,n){if(this.sessionMenu?.key===e.key&&n){this.closeSessionMenu();return}this.sessionMenu={key:e.key,...t},this.sessionMenuTrigger=n,this.loadSessionMenuWork(e)}closeSessionMenu(){this.context&&Be(this.context.gateway).unwatch(this),this.sessionMenu=null,this.sessionMenuTrigger=null,this.sessionMenuWorkVersion+=1,this.sessionMenuWork=null}loadSessionMenuWork(e){let t=++this.sessionMenuWorkVersion;if(!e.worktree){this.sessionMenuWork=null;return}this.sessionMenuWork={loading:!0,pullRequestUrl:null,worktreePath:null};let n=this.captureRequestScope();if(!n){this.sessionMenuWork={loading:!1,pullRequestUrl:null,worktreePath:null};return}let r=Be(n.context.gateway),i=Ue(e.key,this.sessionAgentId(e.key,n.context));Je({client:n.client,pullRequestsAvailable:z(n.context.gateway.snapshot,We)===!0,sessionKey:e.key,agentId:this.sessionAgentId(e.key,n.context),loadPullRequests:()=>r.load(this,i),worktreeId:e.worktree.id}).then(e=>{t===this.sessionMenuWorkVersion&&(this.sessionMenuWork={loading:!1,...e})})}renderSessionMenu(){let e=this.sessionMenu,t=this.context,n=e?this.result?.sessions.find(t=>t.key===e.key):null;if(!e||!t||!n)return M;let r=t.gateway.snapshot,a=de(t.runtimeConfig.state.configSnapshot)&&Ce(r.hello?.auth??null),o=t.workboard.state,s=new Set(o.cards.filter(ce).flatMap(e=>[e.sessionKey,e.execution?.sessionKey]).filter(e=>typeof e==`string`&&e.length>0)),c=fe(n,i({agentsList:t.agents.state.agentsList,hello:r.hello}));return N`
      <openclaw-session-menu
        .session=${{label:I(n.label)??n.key,icon:n.icon,pinned:n.pinned===!0,unread:n.unread===!0,archived:n.archived===!0,category:I(n.category)??null}}
        .anchor=${e}
        .trigger=${this.sessionMenuTrigger}
        .disabled=${this.loading}
        .actionDisabledReasons=${this.sessionMenuActionDisabledReasons(n)}
        .forkDisabled=${n.modelSelectionLocked===!0}
        .archiveAllowed=${c}
        .cloudWorkerStopAllowed=${Ie(n.placement)&&n.hasActiveRun!==!0&&z(r,`sessions.reclaim`)===!0}
        .groups=${this.knownCategories()}
        .canOpenChat=${n.kind!==`global`}
        .work=${this.sessionMenuWork}
        .workboard=${a&&n.kind!==`global`?{captured:s.has(n.key),busy:o.capturingSessionKeys.has(n.key)}:null}
        .onClose=${()=>this.closeSessionMenu()}
        .onAction=${e=>{switch(e.kind){case`open-chat`:t.navigate(`chat`,{...D({context:t,face:`chat`,sessionKey:n.key,agentId:this.sessionPathAgentId(n.key,t)}).options,hash:``});break;case`open-pr`:tt(e.url);break;case`open-in`:Ge(e.editor,e.path);break;case`toggle-pin`:this.patchSession(n.key,{pinned:n.pinned!==!0});break;case`set-icon`:this.patchSession(n.key,{icon:e.icon});break;case`toggle-unread`:this.patchSession(n.key,{unread:n.unread!==!0});break;case`rename`:this.renameSession(n);break;case`fork`:this.forkSession(n.key);break;case`workboard`:this.addToWorkboard(n);break;case`move-to-group`:this.assignCategory(n.key,e.category);break;case`new-group`:this.requestNewCategory(n.key);break;case`toggle-archived`:n.archived===!0?this.patchSession(n.key,{archived:!1}):this.archiveSessionWithUndo(n);break;case`stop-cloud-worker`:this.stopCloudWorker(n);break;case`delete`:this.deleteSessionFromMenu(n);break}}}
      ></openclaw-session-menu>
    `}render(){let e=this.context;return e?N`
      ${wt({active:`sessions`,title:Te(`sessions`),subtitle:N`${we(`sessions`)}
        ${ct(Nn,L(`common.learnMore`))}`,actions:St({agents:e.agents.state.agentsList?.agents??[],selection:e.agentSelection}),onSelect:t=>{t!==`sessions`&&e.navigate(t)}})}
      ${at(hn({loading:this.loading,result:this.result,error:this.error,activeMinutes:this.activeMinutes,limit:this.limit,includeGlobal:this.includeGlobal,includeUnknown:this.includeUnknown,statusFilter:this.statusFilter,basePath:e.basePath,agentId:w(e),mainKey:i({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello}),searchQuery:this.searchQuery,transcriptSearchAvailable:z(e.gateway.snapshot,`sessions.search`)===!0,transcriptSearchQuery:this.transcriptSearchQuery,transcriptSearch:this.transcriptSearchTask.status===_e.PENDING?{status:`loading`}:this.transcriptSearch,agentIdentityById:kt(this.result,t=>e.agentIdentity.get(t)??void 0),sortColumn:this.sortColumn,sortDir:this.sortDir,groupBy:this.groupBy,knownCategories:this.knownCategories(),page:this.page,pageSize:this.pageSize,selectedKeys:this.selectedKeys,sessionMenu:this.sessionMenu,expandedSessionKey:this.expandedSessionKey,checkpointItemsByKey:this.checkpointItemsByKey,checkpointLoadingKey:this.checkpointLoadingKey,checkpointBusyKey:this.checkpointBusyKey,checkpointErrorByKey:this.checkpointErrorByKey,patchWriteDisabledReason:this.mutationDisabledReason({method:`sessions.patch`,params:{key:``,label:null}}),patchAdminDisabledReason:this.mutationDisabledReason({method:`sessions.patch`,params:{key:``,thinkingLevel:null}}),groupWriteDisabledReason:this.mutationDisabledReason({method:`sessions.groups.put`,requiredScope:`operator.write`}),deleteArchivedDisabledReason:this.mutationDisabledReason({method:`sessions.delete`,params:{key:``,archivedOnly:!0,deleteTranscript:!0}}),checkpointBranchDisabledReason:this.mutationDisabledReason({method:`sessions.compaction.branch`,requiredScope:`operator.write`}),checkpointRestoreDisabledReason:this.mutationDisabledReason({method:`sessions.compaction.restore`,requiredScope:`operator.admin`}),deleteSelectedDisabledReason:this.selectedDeleteDisabledReason(),onFiltersChange:e=>this.updateFilters(e),onClearFilters:()=>{this.activeMinutes=``,this.limit=String(A.limit),this.includeGlobal=!0,this.includeUnknown=!1,this.searchQuery=``,this.page=0,this.selectedKeys=new Set,this.deepLinkSessionKey=null,this.loadSessions()},onSearchChange:e=>{this.searchQuery=e,this.page=0,this.selectedKeys=new Set},onTranscriptSearchChange:e=>this.updateTranscriptSearchQuery(e),onTranscriptSearch:()=>void this.runTranscriptSearch(),onClearTranscriptSearch:()=>this.clearTranscriptSearch(),onSortChange:(e,t)=>{this.sortColumn=e,this.sortDir=t,this.page=0},onGroupByChange:e=>this.setGroupBy(e),onAssignCategory:(e,t)=>this.assignCategory(e,t),onRequestNewCategory:e=>this.requestNewCategory(e),onPageChange:e=>{this.page=e},onPageSizeChange:e=>{this.pageSize=e,this.page=0},onRefresh:()=>void this.loadSessions(),onStatusFilterChange:e=>this.updateStatusFilter(e),onDeleteAllArchived:()=>void this.deleteAllArchived(),onPatch:(e,t)=>void this.patchSession(e,t),onToggleSelect:e=>{let t=new Set(this.selectedKeys);t.has(e)?t.delete(e):t.add(e),this.selectedKeys=t},onSelectPage:e=>{this.selectedKeys=new Set([...this.selectedKeys,...e])},onDeselectPage:e=>{let t=new Set(this.selectedKeys);for(let n of e)t.delete(n);this.selectedKeys=t},onDeselectAll:()=>{this.selectedKeys=new Set},onDeleteSelected:()=>void this.deleteSelected(),onNavigateToChat:t=>{let n=ue(e,t);e.navigate(n,{...D({context:e,face:n,sessionKey:t,agentId:this.sessionPathAgentId(t,e),preferenceDerivedFace:!0}).options,hash:``})},onOpenSessionMenu:(e,t,n)=>this.openSessionMenu(e,t,n),onToggleDetails:e=>void this.toggleSessionDetails(e),onBranchFromCheckpoint:(e,t)=>void this.branchCheckpoint(e,t),onRestoreCheckpoint:(e,t)=>void this.restoreCheckpoint(e,t)}),{id:`sessions-hub-panel`})}
      ${this.renderSessionMenu()}
    `:N``}async addToWorkboard(e){let t=this.captureRequestScope();if(t)try{await Et({host:t.workboard,client:t.client,session:e,requestUpdate:()=>{this.isRequestScopeCurrent(t)&&t.workboard.notify()}}),this.isRequestScopeCurrent(t)&&t.context.navigate(`workboard`)}catch(e){this.isRequestScopeCurrent(t)&&(this.error=String(e))}}},n([ve({context:Ee,subscribe:!0})],$.prototype,`context`,void 0),n([he({attribute:!1})],$.prototype,`routeData`,void 0),n([P()],$.prototype,`result`,void 0),n([P()],$.prototype,`loading`,void 0),n([P()],$.prototype,`error`,void 0),n([P()],$.prototype,`activeMinutes`,void 0),n([P()],$.prototype,`limit`,void 0),n([P()],$.prototype,`includeGlobal`,void 0),n([P()],$.prototype,`includeUnknown`,void 0),n([P()],$.prototype,`statusFilter`,void 0),n([P()],$.prototype,`searchQuery`,void 0),n([P()],$.prototype,`transcriptSearchQuery`,void 0),n([P()],$.prototype,`submittedTranscriptSearchQuery`,void 0),n([P()],$.prototype,`transcriptSearch`,void 0),n([P()],$.prototype,`sortColumn`,void 0),n([P()],$.prototype,`sortDir`,void 0),n([P()],$.prototype,`groupBy`,void 0),n([P()],$.prototype,`page`,void 0),n([P()],$.prototype,`pageSize`,void 0),n([P()],$.prototype,`selectedKeys`,void 0),n([P()],$.prototype,`sessionMenu`,void 0),n([P()],$.prototype,`sessionMenuWork`,void 0),n([P()],$.prototype,`expandedSessionKey`,void 0),n([P()],$.prototype,`checkpointItemsByKey`,void 0),n([P()],$.prototype,`checkpointTaskKey`,void 0),n([P()],$.prototype,`checkpointBusyKey`,void 0),n([P()],$.prototype,`checkpointErrorByKey`,void 0),customElements.get(`openclaw-sessions-page`)||customElements.define(`openclaw-sessions-page`,$)}))();
//# sourceMappingURL=sessions-page-Dk2E-XAc.js.map