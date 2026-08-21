import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Bo as i,Hc as a,Jn as o,Kc as s,On as c,Qn as l,Ro as ee,Sn as te,Vc as u,Wc as ne,Yn as re,Zn as d,ca as ie,da as ae,is as oe,rr as se,rs as ce,sa as le,tr as f}from"./control-ui-core-UWR2ANgr.js";import{I as ue,K as p,Q as de,R as m,W as h,Y as g,a as fe,g as _,m as v,nt as y,o as pe}from"./lit-runtime-D5xZwgO1.js";import{i as me,r as he}from"./control-ui-foundation-Dgui328h.js";import{Tt as ge,Wt as _e,_ as ve,jt as ye,v as be,wt as xe}from"./control-ui-core-DDTXn_ud.js";import{Qt as Se,Yt as Ce,Zt as we}from"./control-ui-foundation-DkfOBVsU.js";import{i as Te,o as b,t as x}from"./control-ui-core-BCL4Sy8S.js";import{_t as S,gt as Ee,ot as De,vt as Oe,yt as C}from"./control-ui-core-DS6N4FyQ.js";import{n as ke,r as Ae,t as je}from"./cron-status-CX5IwEkV.js";import{D as Me,E as Ne,S as Pe,T as Fe,_ as Ie,a as Le,b as Re,c as w,d as ze,f as Be,g as Ve,h as He,i as Ue,l as We,m as Ge,n as Ke,o as qe,p as Je,r as Ye,s as Xe,t as Ze,u as T,v as E,w as Qe,x as D,y as $e}from"./cron-BdI6yxAs.js";import{n as et,t as tt}from"./markdown-BueqwDbh.js";import{i as nt,n as rt}from"./markdown-code-blocks-CQhs_B8G.js";import{t as it}from"./text-CjvvY051.js";import{n as at,t as ot}from"./settings-workspace-BbyrBOFl.js";import{c as st,d as ct,m as lt,p as ut,s as dt,t as ft,u as O}from"./settings-ui-Ci_wwIOc.js";import{n as pt,t as mt}from"./gateway-page-controller-jbE-wF7H.js";import{n as ht,t as gt}from"./hub-tabs-DByyIl3h.js";import{n as _t,t as vt}from"./cron-jobs-pagination-Xo5NF5Bo.js";import{a as yt,n as bt,s as xt}from"./presenter-DVS-xjvm.js";import{t as St}from"./web-awesome-popover-Cte1MlzI.js";import{n as Ct,t as wt}from"./agent-scope-control-CmuDi6BC.js";function Tt(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch{return``}}function Et(){try{return Intl.supportedValuesOf?.(`timeZone`)??[]}catch{return[]}}function Dt(e){let t=new Set;return e.map(e=>e.trim()).filter(e=>!e||t.has(e)?!1:(t.add(e),!0))}function Ot(e,t=Tt(),n=Et()){return Dt([t,`UTC`,...e.map(e=>e.schedule.kind===`cron`&&typeof e.schedule.tz==`string`?e.schedule.tz:``),...we(n.map(e=>e.trim()).filter(Boolean))])}var kt=e((()=>{a()}));function k(e){return we(e.map(e=>e.trim()).filter(Boolean))}function At(e){let t=ce(e.runtimeConfig),n=e.cron.cronForm.deliveryChannel.trim()||`last`,r=new Set((e.agentsList?.agents??[]).filter(e=>e.kind===`system`).map(e=>e.id.trim())),a=k([...i(e.agentsList?.agents??[]).map(e=>e.id.trim()),...e.cron.cronJobs.map(e=>typeof e.agentId==`string`&&!r.has(e.agentId.trim())?e.agentId.trim():``)]),o=k([...e.modelSuggestions,...He(t),...e.cron.cronJobs.map(e=>{let t=Ue(e);return t?.kind===`agentTurn`&&typeof t.model==`string`?t.model.trim():``})]),s=e.cron.cronJobs.map(e=>typeof e.delivery?.to==`string`?e.delivery.to.trim():``).filter(Boolean),c=(n===`last`?Object.values(e.channels.channelsSnapshot?.channelAccounts??{}).flat():e.channels.channelsSnapshot?.channelAccounts?.[n]??[]).flatMap(e=>[e.accountId,e.name]).filter(e=>typeof e==`string`).map(e=>e.trim()).filter(Boolean),l=k([...s,...c]);return{agentSuggestions:a,modelSuggestions:o,timezoneSuggestions:Ot(e.cron.cronJobs),accountTargets:c,deliveryToSuggestions:e.cron.cronForm.deliveryMode===`webhook`?l.filter(e=>/^https?:\/\//i.test(e)):l}}var jt,Mt=e((()=>{ee(),oe(),Xe(),a(),kt(),jt=[`off`,`minimal`,`low`,`medium`,`high`]})),Nt=e((()=>{}));function A(e){let t=e.tabs;return t?ht({id:t.id,active:e.value,tabs:e.options.map(e=>({value:e.value,label:e.label,testId:e.testId})),ariaLabel:e.ariaLabel??``,panelId:t.panelId,className:`cron-tabs`,variant:t.variant,onSelect:e.onChange}):ct({value:e.value,options:e.options,ariaLabel:e.ariaLabel,onChange:t=>e.onChange(t)})}var Pt=e((()=>{gt(),ft()}));function Ft(e){let t=e.agentScoped?e.scopedTotal??b(`common.na`):e.status?.jobs??Math.max(e.jobsTotal,e.jobs.length),n=e.status?.enabled===!1?null:e.agentScoped?e.scopedNextWakeAtMs:e.status?.nextWakeAtMs??null,r=e.failingCount;return g`
    <div class="cron-stats">
      <div class="cron-stat">
        <span class="cron-stat__label">${b(`cron.stats.tasks`)}</span>
        <span class="cron-stat__value">${t}</span>
      </div>
      <button
        type="button"
        class="cron-stat cron-stat--action"
        data-test-id="cron-stat-failing"
        title=${b(`cron.list.activityTab`)}
        @click=${()=>{e.onListTabChange(`activity`),e.onRunsFiltersChange({cronRunsStatuses:[`error`]})}}
      >
        <span class="cron-stat__label">${b(`cron.stats.failing`)}</span>
        <span
          class="cron-stat__value ${typeof r==`number`&&r>0?`cron-stat__value--danger`:``}"
        >
          ${r??b(`common.na`)}
        </span>
        <span class="cron-stat__go" aria-hidden="true">${S(`chevronRight`)}</span>
      </button>
      <div class="cron-stat">
        <span class="cron-stat__label">${b(`cron.stats.nextWake`)}</span>
        <span class="cron-stat__value cron-stat__value--time">
          ${yt(n)}
        </span>
      </div>
    </div>
  `}var It=e((()=>{h(),C(),x(),xt()}));function j(e,t,n,r){return{id:e,emoji:t,nameKey:`cron.suggestions.ideas.${e}.name`,taglineKey:`cron.suggestions.ideas.${e}.tagline`,promptKey:`cron.suggestions.ideas.${e}.prompt`,scheduleKey:n,schedule:r}}function Lt(e){return{name:b(e.nameKey),payloadText:b(e.promptKey),payloadKind:`agentTurn`,sessionTarget:`isolated`,deliveryMode:`announce`,wakeMode:`now`,deleteAfterRun:!1,enabled:!0,...e.schedule}}var M,N,P,F,I,Rt=e((()=>{x(),M={scheduleKind:`cron`,cronExpr:`0 9 * * 1-5`},N={scheduleKind:`cron`,cronExpr:`0 8 * * *`},P={scheduleKind:`cron`,cronExpr:`0 9 * * 1`},F={scheduleKind:`every`,everyAmount:`1`,everyUnit:`hours`},I=[j(`repoPulse`,`🐙`,`cron.suggestions.schedules.weekdayMornings`,M),j(`standupGhostwriter`,`👻`,`cron.suggestions.schedules.weekdayMornings`,M),j(`hackerNewsScout`,`🔭`,`cron.suggestions.schedules.everyMorning`,N),j(`dependencyRadar`,`🛰️`,`cron.suggestions.schedules.weekly`,P),j(`watchdog`,`🦉`,`cron.suggestions.schedules.hourly`,F),j(`polyglotMinute`,`🗣️`,`cron.suggestions.schedules.everyMorning`,N)]}));function zt(){return[{value:`ok`,label:b(`cron.runs.runStatusOk`)},{value:`error`,label:b(`cron.runs.runStatusError`)},{value:`skipped`,label:b(`cron.runs.runStatusSkipped`)}]}function Bt(){return[{value:`delivered`,label:b(`cron.runs.deliveryDelivered`)},{value:`not-delivered`,label:b(`cron.runs.deliveryNotDelivered`)},{value:`unknown`,label:b(`cron.runs.deliveryUnknown`)},{value:`not-requested`,label:b(`cron.runs.deliveryNotRequested`)}]}function L(e,t,n){let r=new Set(e);return n?r.add(t):r.delete(t),Array.from(r)}function Vt(e,t){return e.length===0?t:e.length<=2?e.join(`, `):`${e[0]} +${e.length-1}`}function Ht(e){let t=e.options.filter(t=>e.selected.includes(t.value)).map(e=>e.label),n=t.length>2?`${e.summary} (${new Intl.ListFormat(Te.getLocale(),{style:`long`,type:`conjunction`}).format(t)})`:e.summary;return g`
    <div class="cron-filter-dropdown" data-filter=${e.id}>
      <wa-dropdown
        class="cron-filter-dropdown__details"
        placement="bottom-start"
        @wa-select=${t=>{let n=t.detail.item.value;if(n===`${B}clear`){e.onClear();return}if(n?.startsWith(z)){t.preventDefault();let r=n.slice(7);e.onToggle(r,!e.selected.includes(r))}}}
      >
        <button
          slot="trigger"
          type="button"
          class="btn btn--sm cron-filter-dropdown__trigger ${e.selected.length>0?`active`:``}"
          title=${e.title}
          aria-label=${`${e.title} ${n}`}
        >
          <span>${e.summary}</span>
          ${S(`chevronDown`)}
        </button>
        ${e.options.map(t=>g`
            <wa-dropdown-item
              class="cron-filter-dropdown__option"
              type="checkbox"
              value=${`${z}${t.value}`}
              .checked=${e.selected.includes(t.value)}
            >
              ${t.label}
            </wa-dropdown-item>
          `)}
        <div class="session-menu__separator" role="separator"></div>
        <wa-dropdown-item value=${`${B}clear`}>
          ${b(`cron.runs.clear`)}
        </wa-dropdown-item>
      </wa-dropdown>
    </div>
  `}function Ut(e){let t=e.runs.toSorted((t,n)=>e.runsSortDir===`asc`?t.ts-n.ts:n.ts-t.ts),n=e.runsQuery.trim().length>0||e.runsStatuses.length>0||e.runsDeliveryStatuses.length>0,r=zt(),i=Bt(),a=r.filter(t=>e.runsStatuses.includes(t.value)).map(e=>e.label),o=i.filter(t=>e.runsDeliveryStatuses.includes(t.value)).map(e=>e.label),s=Vt(a,b(`cron.runs.allStatuses`)),c=Vt(o,b(`cron.runs.allDelivery`));return g`
    <div class="cron-runs">
      <div class="cron-run-filters">
        <div class="cron-search-box cron-run-filter-search">
          <span class="cron-search-box__icon" aria-hidden="true">${S(`search`)}</span>
          <input
            type="search"
            class="settings-input"
            .value=${e.runsQuery}
            aria-label=${b(`cron.runs.searchRuns`)}
            placeholder=${b(`cron.runs.searchPlaceholder`)}
            @input=${t=>e.onRunsFiltersChange({cronRunsQuery:t.target.value})}
          />
        </div>
        ${Ht({id:`status`,title:b(`cron.runs.status`),summary:s,options:r,selected:e.runsStatuses,onToggle:(t,n)=>{let r=L(e.runsStatuses,t,n);e.onRunsFiltersChange({cronRunsStatuses:r})},onClear:()=>{e.onRunsFiltersChange({cronRunsStatuses:[]})}})}
        ${Ht({id:`delivery`,title:b(`cron.runs.delivery`),summary:c,options:i,selected:e.runsDeliveryStatuses,onToggle:(t,n)=>{let r=L(e.runsDeliveryStatuses,t,n);e.onRunsFiltersChange({cronRunsDeliveryStatuses:r})},onClear:()=>{e.onRunsFiltersChange({cronRunsDeliveryStatuses:[]})}})}
        <select
          class="cron-run-sort"
          aria-label=${b(`cron.jobs.sort`)}
          title=${b(`cron.jobs.sort`)}
          .value=${e.runsSortDir}
          @change=${t=>e.onRunsFiltersChange({cronRunsSortDir:t.target.value})}
        >
          <option value="desc">${b(`cron.runs.newestFirst`)}</option>
          <option value="asc">${b(`cron.runs.oldestFirst`)}</option>
        </select>
      </div>
      ${t.length===0?n?g`<div class="muted cron-runs__empty">${b(`cron.runs.noMatching`)}</div>`:g`
              <div class="cron-empty-state">
                <div class="cron-empty-state__title">${b(`cron.runs.emptyTitle`)}</div>
                <div class="cron-empty-state__copy">${b(`cron.runs.emptyHint`)}</div>
              </div>
            `:g`
            <div class="cron-runs__list">
              ${t.map(t=>Kt(t,e.agentId,e.basePath,e.onNavigateToChat))}
            </div>
          `}
      ${e.runsHasMore?g`
            <button
              class="btn btn--sm cron-load-more"
              ?disabled=${e.runsLoadingMore}
              @click=${e.onLoadMoreRuns}
            >
              ${e.runsLoadingMore?b(`cron.list.loading`):b(`cron.runs.loadMore`)}
            </button>
          `:p}
    </div>
  `}function Wt(e,t=Date.now()){let n=l(e);return b(e>t?`cron.runEntry.next`:`cron.runEntry.due`,{rel:n})}function R(e){switch(e){case`ok`:return b(`cron.runs.runStatusOk`);case`error`:return b(`cron.runs.runStatusError`);case`skipped`:return b(`cron.runs.runStatusSkipped`);default:return b(`cron.runs.runStatusUnknown`)}}function Gt(e){switch(e){case`delivered`:return b(`cron.runs.deliveryDelivered`);case`not-delivered`:return b(`cron.runs.deliveryNotDelivered`);case`not-requested`:return b(`cron.runs.deliveryNotRequested`);default:return b(`cron.runs.deliveryUnknown`)}}function Kt(e,t,n,r){let i=typeof e.sessionKey==`string`&&e.sessionKey.trim().length>0?ae({face:`chat`,sessionKey:e.sessionKey,fallbackAgentId:t,basePath:n}).href:null,a=R(e.status??`unknown`),s=Gt(e.deliveryStatus??`not-requested`),c=e.usage,l=c&&typeof c.total_tokens==`number`?`${f(c.total_tokens)} ${b(`usage.metrics.tokens`)}`:c&&typeof c.input_tokens==`number`&&typeof c.output_tokens==`number`?`${f(c.input_tokens)} in / ${f(c.output_tokens)} out`:null,ee=e.summary||e.error||b(`cron.runEntry.noSummary`),te=!!e.error&&!!e.summary,u=[s,e.model,e.provider,l].filter(Boolean);return g`
    <div class="cron-run-entry">
      <div class="cron-run-entry__header">
        <div class="cron-run-entry__main">
          <div class="cron-run-entry__title">
            ${e.jobName??e.jobId}
            <span class="muted"> · ${a}</span>
          </div>
          <div class="cron-run-entry__facts muted">${u.join(` · `)}</div>
        </div>
        <div class="cron-run-entry__meta">
          <div>${d(e.ts)}</div>
          ${typeof e.runAtMs==`number`?g`<div class="muted">${b(`cron.runEntry.runAt`)} ${d(e.runAtMs)}</div>`:p}
          <div class="muted">
            ${typeof e.durationMs==`number`&&Number.isFinite(e.durationMs)?o(e.durationMs,{spaced:!0})??re(e.durationMs,b(`common.na`)):b(`common.na`)}
          </div>
          ${typeof e.nextRunAtMs==`number`?g`<div class="muted">${Wt(e.nextRunAtMs)}</div>`:p}
          ${i?g`<div>
                <a
                  class="session-link"
                  href=${i}
                  @click=${t=>{t.defaultPrevented||t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||r&&e.sessionKey&&(t.preventDefault(),r(e.sessionKey))}}
                  >${b(`cron.runEntry.openRunChat`)}</a
                >
              </div>`:p}
          ${te?g`<div class="muted">${e.error}</div>`:p}
          ${e.deliveryError?g`<div class="muted">${e.deliveryError}</div>`:p}
        </div>
      </div>
      <div class="cron-run-entry__body chat-text">
        ${_(et(ee))}
      </div>
    </div>
  `}var z,B,qt=e((()=>{h(),v(),C(),De(),tt(),x(),se(),le(),z=`option:`,B=`command:`}));function Jt(e){let t=e.form.deliveryChannel?.trim();return Se([`last`,...e.channels.filter(Boolean),...t?[t]:[]])}function Yt(e,t){return t===`last`?t:e.channelMeta?.find(e=>e.id===t)?.label||(e.channelLabels?.[t]??t)}function V(e,t){let n=Se(Ce(t));return n.length===0?p:g`<datalist id=${e}>
        ${n.map(e=>g`<option value=${e}></option> `)}
      </datalist>`}function H(e){return`cron-error-${e}`}function U(e){return`cron-${e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}`}function Xt(e,t,n){return e===`payloadText`&&t.payloadKind===`systemEvent`?b(`cron.form.mainTimelineMessage`):b(e===`deliveryTo`&&n===`webhook`?`cron.form.webhookUrl`:Q[e])}function Zt(e,t,n){return Object.keys(Q).flatMap(r=>{let i=e[r];return i?[{key:r,label:Xt(r,t,n),message:i,inputId:U(r)}]:[]})}function Qt(e){let t=document.getElementById(e);t instanceof HTMLElement&&(typeof t.scrollIntoView==`function`&&t.scrollIntoView({block:`center`,behavior:`smooth`}),t.focus())}function $t(e,t){return e?g`<div id=${m(t)} class="cron-help cron-error">${b(e)}</div>`:p}function en(e){return g`
    ${e}
    <span class="cron-required-marker" aria-hidden="true">*</span>
    <span class="cron-required-sr">${b(`cron.form.requiredSr`)}</span>
  `}function W(e){let t=e.wide?`cron-control cron-control--wide`:`cron-control`,n=e.error?g`<div class=${t}>
        ${e.control}${$t(e.error,e.errorId)}
      </div>`:g`<div class=${t}>${e.control}</div>`;return g`
    <div class=${e.stacked?`settings-row settings-row--stacked`:`settings-row`}>
      <label class="settings-row__text" for=${m(e.controlId||void 0)}>
        <span class="settings-row__title">
          ${e.required?en(e.label):e.label}
        </span>
        ${e.help?g`<span class="settings-row__desc">${e.help}</span>`:p}
      </label>
      <div class="settings-row__control">${n}</div>
    </div>
  `}function G(e,t,n){let r=n.errorKey?e.fieldErrors[n.errorKey]:void 0,i=r&&n.errorKey&&n.describeError!==!1?H(n.errorKey):void 0;return g`
    <input
      id=${U(t)}
      class=${n.mono?`settings-input mono`:`settings-input`}
      type=${m(n.type)}
      aria-required=${m(n.required?`true`:void 0)}
      .value=${e.form[t]}
      list=${m(n.list)}
      ?disabled=${n.disabled??!1}
      aria-invalid=${m(n.errorKey?r?`true`:`false`:void 0)}
      aria-describedby=${m(i)}
      placeholder=${m(n.placeholder)}
      @input=${n=>e.onFormChange({[t]:n.currentTarget.value})}
    />
  `}function K(e,t,n){let r=n.errorKey;return W({label:n.label,controlId:U(t),required:n.required,help:n.help,error:r?e.fieldErrors[r]:void 0,errorId:r?H(r):void 0,control:G(e,t,n)})}function q(e,t,n){return g`
    <select
      id=${m(n.standalone?void 0:U(t))}
      class="settings-select"
      .value=${n.value??e.form[t]}
      aria-label=${m(n.standalone?n.label:void 0)}
      ?disabled=${n.disabled??!1}
      @change=${n=>e.onFormChange({[t]:n.currentTarget.value})}
    >
      ${n.options.map(({value:e,label:t})=>g`<option value=${e}>${t}</option>`)}
    </select>
  `}function J(e,t,n){return W({label:n.label,controlId:U(t),help:n.help,control:q(e,t,n)})}function Y(e,t,n){return lt({title:n.label,description:n.help,checked:e.form[t],onChange:n=>e.onFormChange({[t]:n})})}function tn(e){let t=e.editingJobId?`job`:e.createOpen?`create`:`overview`;return g`
    ${t===`overview`?rn(e):pn(e,t)}
    ${V(`cron-agent-suggestions`,e.agentSuggestions)}
    ${V(`cron-model-suggestions`,e.modelSuggestions)}
    ${V(`cron-thinking-suggestions`,e.thinkingSuggestions)}
    ${V(`cron-tz-suggestions`,e.timezoneSuggestions)}
    ${V(`cron-delivery-to-suggestions`,e.deliveryToSuggestions)}
    ${V(`cron-delivery-account-suggestions`,e.accountSuggestions)}
  `}function nn(e){return e.canManage?p:g`<div class="callout warning" role="note">${b(`cron.adminRequired`)}</div>`}function rn(e){let t=e.jobsScheduleKindFilter!==`all`||e.jobsLastStatusFilter!==`all`||e.jobsSortBy!==`nextRunAtMs`||e.jobsSortDir!==`asc`,n=t||e.jobsQuery.trim().length>0||e.jobsEnabledFilter!==`all`;return g`
    <section class="cron-page" data-panel-mode="overview">
      ${dt([O({},Ft(e)),nn(e),e.status&&!e.status.enabled?g`
          <div class="cron-error-banner" data-test-id="cron-scheduler-banner">
            <strong>${b(`cron.list.schedulerOff`)}</strong> ${b(`cron.runNotStarted.stopped`)}
          </div>
        `:p,e.error?g`<div class="cron-error-banner">${e.error}</div>`:p,on(e,t),g`
      <div
        id="cron-list-panel"
        class="cron-tab-panel"
        role="tabpanel"
        aria-labelledby=${`cron-list-tab-${e.listTab}`}
      >
        ${e.listTab===`activity`?O({},g`<div class="cron-activity">${Ut(e)}</div>`):[O({},cn(e,n)),n||!e.canManage?p:fn(e)]}
      </div>
    `],{wide:!0})}
    </section>
  `}function an(e){return A({value:e.listTab,options:[{value:`tasks`,label:b(`cron.list.tasksTab`),testId:`cron-list-tab-tasks`},{value:`activity`,label:b(`cron.list.activityTab`),testId:`cron-list-tab-activity`}],ariaLabel:b(`cron.list.viewLabel`),tabs:{id:`cron-list`,panelId:`cron-list-panel`},onChange:e.onListTabChange})}function on(e,t){return g`
    <div class="cron-toolbar">
      ${an(e)}
      ${e.listTab===`tasks`?g`
            ${A({value:e.jobsEnabledFilter,options:Tn.map(e=>({value:e.value,label:b(e.labelKey),testId:`cron-tab-${e.value}`})),ariaLabel:b(`cron.tabs.filterLabel`),onChange:t=>void e.onJobsFiltersChange({cronJobsEnabledFilter:t})})}
            <div class="cron-search-box">
              <span class="cron-search-box__icon" aria-hidden="true">${S(`search`)}</span>
              <input
                type="search"
                class="settings-input"
                .value=${e.jobsQuery}
                aria-label=${b(`cron.list.searchPlaceholder`)}
                placeholder=${b(`cron.list.searchPlaceholder`)}
                @input=${t=>e.onJobsFiltersChange({cronJobsQuery:t.target.value})}
              />
            </div>
            ${sn(e,t)}
          `:p}
      <div class="cron-toolbar__end">
        <button
          type="button"
          class="btn btn--sm btn--ghost cron-refresh ${e.loading?`cron-refresh--loading`:``}"
          ?disabled=${e.loading}
          title=${e.loading?b(`cron.list.refreshing`):b(`cron.list.refresh`)}
          aria-label=${b(`cron.list.refresh`)}
          @click=${e.onRefresh}
        >
          ${S(`refresh`)}
        </button>
        ${e.canManage?g`
              <button
                type="button"
                class="btn primary btn--sm cron-new-task"
                data-test-id="cron-new-task"
                @click=${()=>e.onOpenCreate()}
              >
                ${S(`plus`)} ${b(`cron.list.newTask`)}
              </button>
            `:p}
      </div>
    </div>
  `}function X(e,t,n){return g`
    <label class="field">
      <span>${n.label}</span>
      <select
        class="settings-select"
        data-test-id=${m(n.testId)}
        .value=${n.value}
        @change=${n=>e.onJobsFiltersChange({[t]:n.currentTarget.value})}
      >
        ${n.options.map(({value:e,label:t})=>g`<option value=${e}>${t}</option>`)}
      </select>
    </label>
  `}function sn(e,t){return g`
    <button
      id="cron-jobs-filter-trigger"
      type="button"
      class="btn btn--sm cron-filter-popover__trigger ${t?`active`:``}"
      title=${b(`cron.list.filters`)}
      aria-label=${b(`cron.list.filters`)}
      aria-haspopup="dialog"
      aria-expanded="false"
    >
      ${S(`listFilter`)}
    </button>
    <wa-popover
      class="cron-filter-popover"
      for="cron-jobs-filter-trigger"
      placement="bottom-end"
      without-arrow
      @wa-show=${e=>{e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,`true`)}}
      @wa-hide=${e=>{e.currentTarget.previousElementSibling?.setAttribute(`aria-expanded`,`false`)}}
    >
      <div class="cron-filter-popover__panel">
        ${X(e,`cronJobsScheduleKindFilter`,{label:b(`cron.jobs.schedule`),value:e.jobsScheduleKindFilter,testId:`cron-jobs-schedule-filter`,options:[{value:`all`,label:b(`cron.jobs.all`)},{value:`at`,label:b(`cron.form.at`)},{value:`every`,label:b(`cron.form.every`)},{value:`cron`,label:b(`cron.form.cronOption`)}]})}
        ${X(e,`cronJobsLastStatusFilter`,{label:b(`cron.jobs.lastRun`),value:e.jobsLastStatusFilter,testId:`cron-jobs-last-status-filter`,options:[{value:`all`,label:b(`cron.jobs.all`)},{value:`ok`,label:b(`cron.runs.runStatusOk`)},{value:`error`,label:b(`cron.runs.runStatusError`)},{value:`skipped`,label:b(`cron.runs.runStatusSkipped`)},{value:`unknown`,label:b(`cron.runs.runStatusUnknown`)}]})}
        ${X(e,`cronJobsSortBy`,{label:b(`cron.jobs.sort`),value:e.jobsSortBy,options:[{value:`nextRunAtMs`,label:b(`cron.jobs.nextRun`)},{value:`updatedAtMs`,label:b(`cron.jobs.recentlyUpdated`)},{value:`name`,label:b(`cron.jobs.name`)}]})}
        ${X(e,`cronJobsSortDir`,{label:b(`cron.jobs.direction`),value:e.jobsSortDir,options:[{value:`asc`,label:b(`cron.jobs.ascending`)},{value:`desc`,label:b(`cron.jobs.descending`)}]})}
        <button
          class="btn btn--sm"
          data-test-id="cron-jobs-filters-reset"
          ?disabled=${!t}
          @click=${e.onJobsFiltersReset}
        >
          ${b(`cron.jobs.reset`)}
        </button>
      </div>
    </wa-popover>
  `}function cn(e,t){return g`
    <div class="cron-table">
      <div class="cron-table__head" role="row">
        <span>${b(`cron.jobs.name`)}</span>
        <span>${b(`cron.jobs.schedule`)}</span>
        <span>${b(`cron.jobs.nextRun`)}</span>
        <span>${b(`cron.jobs.lastRun`)}</span>
        <span aria-hidden="true"></span>
      </div>
      ${e.jobs.length===0?g`
            <div class="cron-empty-state">
              <div class="cron-empty-state__title">
                ${b(t?`cron.list.noMatching`:`cron.list.emptyTitle`)}
              </div>
              ${t?p:g`<div class="cron-empty-state__copy">${b(`cron.list.emptyHint`)}</div>`}
            </div>
          `:pe(e.jobs,e=>e.id,t=>ln(t,e))}
      ${_t({jobsShown:e.jobs.length,jobsTotal:e.jobsTotal,hasMore:e.jobsHasMore,loading:e.loading,loadingMore:e.jobsLoadingMore,onLoadMore:e.onLoadMoreJobs})}
    </div>
  `}function ln(e,t){let n=e.description?.trim(),r=e.state?.nextRunAtMs,i=typeof r==`number`&&Number.isFinite(r),a=ke(e)?`cron-table__dot--error`:e.enabled?`cron-table__dot--active`:``;return g`
    <div
      class="cron-table__row ${e.enabled?``:`cron-table__row--paused`}"
      role="button"
      tabindex="0"
      data-test-id=${`cron-row-${e.id}`}
      @click=${()=>t.onSelectJob(e)}
      @keydown=${n=>{(n.key===`Enter`||n.key===` `)&&(n.preventDefault(),t.onSelectJob(e))}}
    >
      <span class="cron-table__name">
        <span class="cron-table__dot ${a}" aria-hidden="true"></span>
        <span class="cron-table__name-text">${e.name}</span>
        ${n?g`
              <span
                class="cron-table__description"
                data-test-id=${`cron-row-description-${e.id}`}
                title=${`${b(`cron.form.description`)}: ${n}`}
                >· ${n}</span
              >
            `:p}
        ${e.enabled?p:g`<span class="muted cron-table__paused-note">${b(`cron.list.paused`)}</span>`}
      </span>
      <span class="cron-table__cell">${bt(e)}</span>
      <span class="cron-table__cell">
        ${i?l(r):b(`common.na`)}
      </span>
      <span class="cron-table__cell cron-table__last">${un(e)}</span>
      <span
        class="cron-table__actions"
        @click=${e=>e.stopPropagation()}
        @keydown=${e=>e.stopPropagation()}
      >
        ${t.canManage?g`
              <button
                type="button"
                class="btn btn--sm btn--ghost cron-row-run"
                data-test-id=${`cron-row-run-${e.id}`}
                title=${b(`cron.actions.runNow`)}
                aria-label=${b(`cron.actions.runNow`)}
                ?disabled=${t.busy}
                @click=${()=>t.onRun(e,`force`)}
              >
                ${S(`play`)}
              </button>
              ${hn(t,e,{compact:!0,testId:`cron-row-toggle-${e.id}`})}
              ${dn(t,e)}
            `:p}
      </span>
    </div>
  `}function un(e){let t=Ae(e),n=e.state?.lastRunAtMs,r=typeof n==`number`&&Number.isFinite(n)?l(n):null;if(t===`unknown`||!r)return g`<span class="muted">${b(`common.na`)}</span>`;let i=t===`ok`?g`<span class="cron-last-glyph cron-last-glyph--ok">${S(`check`)}</span>`:t===`error`?g`<span class="cron-last-glyph cron-last-glyph--error">${S(`x`)}</span>`:g`<span class="cron-last-glyph">${S(`cornerDownRight`)}</span>`,a=R(t);return g`
    <span class="cron-table__last-run" role="img" aria-label=${a} title=${a}>
      ${i}
      <span class="cron-table__last-time">${r}</span>
    </span>
  `}function dn(e,t){return e.canManage?g`
    <wa-dropdown
      class="cron-job-menu"
      placement="bottom-end"
      @wa-select=${n=>{if(e.canManage)switch(n.detail.item.value){case`run-if-due`:e.onRun(t,`due`);break;case`clone`:e.onClone(t);break;case`remove`:e.onRemove(t);break;case void 0:break}}}
    >
      <button
        slot="trigger"
        type="button"
        class="btn btn--sm btn--ghost cron-job-menu__trigger"
        aria-label=${b(`cron.actions.more`)}
        title=${b(`cron.actions.more`)}
      >
        ${S(`moreHorizontal`)}
      </button>
      ${Z(e,`run-if-due`,b(`cron.actions.runIfDue`))}
      ${Z(e,`clone`,b(`cron.actions.clone`))}
      ${Z(e,`remove`,b(`cron.actions.remove`),{danger:!0})}
    </wa-dropdown>
  `:p}function fn(e){return O({title:b(`cron.suggestions.title`)},I.map(t=>g`
        <button
          type="button"
          class="settings-row settings-row--nav cron-suggestion"
          data-suggestion=${t.id}
          @click=${()=>e.onOpenCreate(Lt(t))}
        >
          <div class="settings-row__text">
            <span class="settings-row__title">
              <span aria-hidden="true">${t.emoji}</span> ${b(t.nameKey)}
            </span>
            <span class="settings-row__desc">${b(t.taglineKey)}</span>
          </div>
          <div class="settings-row__control">
            <span class="settings-row__value">${b(t.scheduleKey)}</span>
            <span class="settings-row__chevron">${Oe.chevronRight}</span>
          </div>
        </button>
      `))}function pn(e,t){let n=t===`job`?e.jobs.find(t=>t.id===e.editingJobId):void 0,r=t===`job`&&!!n,i=t===`job`&&e.detailTab===`history`;return g`
    <section class="cron-page cron-page--detail" data-panel-mode=${t}>
      ${dt([g`
      <div class="cron-back-row">
        <button
          type="button"
          class="cron-back"
          data-test-id="cron-back"
          ?disabled=${e.busy}
          @click=${e.onClosePanel}
        >
          ${S(`arrowLeft`)} ${b(`cron.detail.back`)}
        </button>
      </div>
    `,mn(e,t,n),nn(e),r?gn(e):p,e.error?g`<div class="cron-error-banner">${e.error}</div>`:p,g`
      <div
        id="cron-detail-panel"
        class="cron-tab-panel"
        role=${r?`tabpanel`:p}
        aria-labelledby=${r?`cron-detail-tab-${e.detailTab}`:p}
      >
        ${i?O({title:b(`cron.detail.historyTitle`)},g`<div class="cron-history">${Ut(e)}</div>`):_n(e,t)}
      </div>
    `],{wide:!0})}
    </section>
  `}function mn(e,t,n){let r=t===`job`?n?.name??e.form.name:b(`cron.detail.newTitle`),i=t===`job`?n?.description?.trim():void 0,a=n?.state?.nextRunAtMs,o=typeof a==`number`&&Number.isFinite(a)?` · ${b(`cron.jobState.next`)} ${l(a)}`:``,s=t===`job`&&n?`${bt(n)}${o}`:b(`cron.detail.newSubtitle`);return g`
    <div class="cron-detail-header">
      <div class="cron-detail-header__copy">
        <div class="cron-detail-title">${r}</div>
        ${i?g`<div class="cron-detail-description" data-test-id="cron-detail-description">
              <span class="cron-detail-description__label">${b(`cron.form.description`)}:</span>
              ${i}
            </div>`:p}
        <div class="cron-detail-meta">
          ${t===`job`&&n&&e.canManage?hn(e,n):p}
          <span class="cron-detail-sub">${s}</span>
        </div>
      </div>
      <div class="cron-detail-actions">
        ${t===`job`&&n&&e.canManage?g`
              <button
                type="button"
                class="btn btn--sm"
                data-test-id="cron-run-now"
                ?disabled=${e.busy}
                @click=${()=>e.onRun(n,`force`)}
              >
                ${S(`play`)} ${b(`cron.actions.runNow`)}
              </button>
              ${dn(e,n)}
            `:p}
      </div>
    </div>
  `}function hn(e,t,n){let r=t.enabled?b(`cron.detail.active`):b(`cron.detail.paused`),i=t.enabled?b(`cron.actions.pause`):b(`cron.actions.resume`);return g`
    <span
      class="cron-enabled-toggle"
      data-test-id=${n?.testId??`cron-toggle-enabled`}
      title=${n?.compact?i:p}
    >
      ${ut({checked:t.enabled,disabled:e.busy||!e.canManage,ariaLabel:n?.compact?i:r,onChange:n=>{e.canManage&&e.onToggle(t,n)}})}
      ${n?.compact?p:g`<span class="cron-detail-sub">${r}</span>`}
    </span>
  `}function gn(e){return A({value:e.detailTab,options:[{value:`settings`,label:b(`cron.detail.settingsTab`),testId:`cron-detail-tab-settings`},{value:`history`,label:b(`cron.detail.historyTitle`),testId:`cron-detail-tab-history`}],ariaLabel:b(`cron.detail.tabsLabel`),tabs:{id:`cron-detail`,panelId:`cron-detail-panel`,variant:`sub`},onChange:e.onDetailTabChange})}function _n(e,t){let n=e.form.payloadLocked,r=!n&&e.form.payloadKind===`agentTurn`,i=e.form.sessionTarget!==`main`&&(e.form.payloadKind===`agentTurn`||n),a=e.form.deliveryMode===`announce`&&!i?`none`:e.form.deliveryMode,o=Zt(e.fieldErrors,e.form,a),s=e.canManage&&!e.busy&&o.length>0,c=s&&!e.canSubmit?o.length===1?b(`cron.form.fixFields`,{count:String(o.length)}):b(`cron.form.fixFieldsPlural`,{count:String(o.length)}):``;return g`
    <fieldset
      class="cron-editor"
      ?disabled=${e.busy||!e.canManage}
      aria-busy=${String(e.busy)}
    >
      ${vn(e,{payloadLocked:n,isAgentTurn:r})} ${yn(e)}
      ${xn(e)}
      ${Sn(e,{supportsAnnounce:i,selectedDeliveryMode:a})}
      ${Cn(e,{mode:t,isAgentTurn:r,selectedDeliveryMode:a})}
      ${s?g`
            <div class="cron-form-status" role="status" aria-live="polite">
              <div class="cron-form-status__title">${b(`cron.form.cantAddYet`)}</div>
              <div class="cron-help">${b(`cron.form.fillRequired`)}</div>
              <ul class="cron-form-status__list">
                ${o.map(e=>g`
                    <li>
                      <button
                        type="button"
                        class="cron-form-status__link"
                        @click=${()=>Qt(e.inputId)}
                      >
                        ${e.label}: ${b(e.message)}
                      </button>
                    </li>
                  `)}
              </ul>
            </div>
          `:p}
      ${e.canManage?g`
            <div class="cron-editor-actions">
              <button
                class="btn primary"
                data-test-id="cron-submit"
                ?disabled=${e.busy||!e.canSubmit}
                @click=${e.onSubmit}
              >
                ${e.busy?b(`cron.form.saving`):b(t===`job`?`cron.form.saveChanges`:`cron.form.createTask`)}
              </button>
              ${t===`create`?g`
                    <button
                      class="btn"
                      data-test-id="cron-submit-run"
                      ?disabled=${e.busy||!e.canSubmit}
                      @click=${e.onSubmitRunNow}
                    >
                      ${b(`cron.form.createAndRun`)}
                    </button>
                  `:p}
              <button class="btn" ?disabled=${e.busy} @click=${e.onClosePanel}>
                ${b(`cron.form.cancel`)}
              </button>
              ${c?g`<div class="cron-submit-reason" aria-live="polite">
                    ${c}
                  </div>`:p}
            </div>
          `:p}
    </fieldset>
  `}function Z(e,t,n,r){return g`
    <wa-dropdown-item
      class=${r?.danger?`cron-job-menu__item danger`:`cron-job-menu__item`}
      value=${t}
      variant=${r?.danger?`danger`:`default`}
      ?disabled=${e.busy||!e.canManage}
    >
      ${n}
    </wa-dropdown-item>
  `}function vn(e,t){let n=e.form.payloadKind===`script`?b(`cron.form.script`):b(`cron.form.command`),r=t.payloadLocked?n:e.form.payloadKind===`systemEvent`?b(`cron.form.mainTimelineMessage`):b(`cron.form.assistantTaskPrompt`),i=t.payloadLocked?b(`cron.form.readOnlyPayloadHelp`):e.form.payloadKind===`systemEvent`?b(`cron.form.systemEventHelp`):b(`cron.form.agentTurnHelp`),a=t.payloadLocked?En[e.form.payloadKind]:``,o=W({label:r,controlId:a?``:`cron-payload-text`,required:!0,help:i,stacked:!0,wide:!0,error:e.fieldErrors.payloadText,errorId:H(`payloadText`),control:a?g`
          <pre
            id="cron-payload-text"
            class="code-block cron-payload-code"
            data-test-id="cron-payload-code"
            tabindex="0"
            aria-label=${r}
          ><code class="hljs">${_(rt(e.form.payloadText,a))}</code></pre>
        `:g`
          <textarea
            id="cron-payload-text"
            class="settings-input"
            rows="6"
            .value=${e.form.payloadText}
            ?readonly=${t.payloadLocked}
            aria-required="true"
            placeholder=${b(`cron.form.promptPlaceholder`)}
            aria-invalid=${e.fieldErrors.payloadText?`true`:`false`}
            aria-describedby=${m(e.fieldErrors.payloadText?H(`payloadText`):void 0)}
            @input=${t=>e.onFormChange({payloadText:t.target.value})}
          ></textarea>
        `}),s=b(`cron.form.action`);return O({},g`${o}${t.payloadLocked?W({label:s,controlId:U(`payloadKind`),control:g`
          <input
            id=${U(`payloadKind`)}
            class="settings-input"
            .value=${n}
            readonly
          />
        `}):J(e,`payloadKind`,{label:s,options:[{value:`systemEvent`,label:b(`cron.form.systemEvent`)},{value:`agentTurn`,label:b(`cron.form.agentTurn`)}]})}${t.isAgentTurn?g`
        ${K(e,`payloadModel`,{label:b(`cron.form.model`),help:b(`cron.form.modelHelp`),errorKey:`payloadModel`,describeError:!1,list:`cron-model-suggestions`,placeholder:b(`cron.form.modelPlaceholder`)})}
        ${K(e,`payloadThinking`,{label:b(`cron.form.thinking`),help:b(`cron.form.thinkingHelp`),errorKey:`payloadThinking`,describeError:!1,list:`cron-thinking-suggestions`,placeholder:b(`cron.form.thinkingPlaceholder`)})}
      `:p}`)}function yn(e){let t=e.form.sessionTarget,n=t===`main`||t===`isolated`;return O({title:b(`cron.detail.generalSection`)},g`
      ${K(e,`name`,{label:b(`cron.form.fieldName`),required:!0,errorKey:`name`,placeholder:b(`cron.form.namePlaceholder`)})}
      ${K(e,`agentId`,{label:b(`cron.form.agentId`),help:b(`cron.form.agentHelp`),list:`cron-agent-suggestions`,disabled:e.form.clearAgent,placeholder:b(`cron.form.agentPlaceholder`)})}
      ${J(e,`sessionTarget`,{label:b(`cron.form.runsIn`),help:b(`cron.form.sessionHelp`),options:[{value:`main`,label:b(`cron.form.mainSession`)},{value:`isolated`,label:b(`cron.form.isolatedSession`)},...n?[]:[{value:t,label:t}]]})}
    `)}function bn(e){if(e.scheduleKind===`every`){let t=e.everyAmount.trim();return Me(t,e.everyUnit)===void 0?null:Number(t)===1?b(e.everyUnit===`seconds`?`cron.form.summaryEverySecondOne`:e.everyUnit===`minutes`?`cron.form.summaryEveryMinuteOne`:e.everyUnit===`hours`?`cron.form.summaryEveryHourOne`:`cron.form.summaryEveryDayOne`):b(e.everyUnit===`seconds`?`cron.form.summaryEverySeconds`:e.everyUnit===`minutes`?`cron.form.summaryEveryMinutes`:e.everyUnit===`hours`?`cron.form.summaryEveryHours`:`cron.form.summaryEveryDays`,{amount:t})}if(e.scheduleKind===`at`){let t=Date.parse(e.scheduleAt);return Number.isFinite(t)?b(`cron.form.summaryOnce`,{at:d(t)}):null}if(e.scheduleKind===`cron`){let t=e.cronExpr.trim();if(!t)return null;let n=e.cronTz.trim();return n?b(`cron.form.summaryCronTz`,{expr:t,tz:n}):b(`cron.form.summaryCron`,{expr:t})}return e.scheduleKind===`on-exit`?b(`cron.form.repeatOnExit`):e.scheduleKind===`stream`?b(`cron.form.repeatStream`):null}function xn(e){let t=e.form,n=t.scheduleKind===`on-exit`,r=t.scheduleKind===`stream`,i=n?{value:`on-exit`,label:b(`cron.form.repeatOnExit`)}:r?{value:`stream`,label:b(`cron.form.repeatStream`)}:null,a=[...i?[{...i,testId:`cron-schedule-kind-${i.value}`}]:[],{value:`every`,label:b(`cron.form.repeatInterval`),testId:`cron-schedule-kind-every`},{value:`at`,label:b(`cron.form.repeatOnce`),testId:`cron-schedule-kind-at`},{value:`cron`,label:b(`cron.form.cronOption`),testId:`cron-schedule-kind-cron`}],o=bn(t);return O({title:b(`cron.detail.scheduleSection`)},g`
      ${st({title:b(`cron.form.repeat`),description:n?b(`cron.form.onExitHelp`):void 0,stacked:!0,control:A({value:t.scheduleKind,options:a,ariaLabel:b(`cron.form.repeat`),onChange:n=>e.onFormChange({scheduleKind:n,...n===`at`&&(t.scheduleKind===`every`||t.scheduleKind===`cron`)?{deleteAfterRun:!0}:n===`every`||n===`cron`?{deleteAfterRun:!1}:{}})})})}
      ${t.scheduleKind===`at`?K(e,`scheduleAt`,{label:b(`cron.form.runAt`),required:!0,errorKey:`scheduleAt`,type:`datetime-local`}):p}
      ${t.scheduleKind===`every`?W({label:b(`cron.form.every`),controlId:`cron-every-amount`,required:!0,error:e.fieldErrors.everyAmount,errorId:H(`everyAmount`),control:g`
              <div class="cron-inline-controls">
                ${G(e,`everyAmount`,{label:b(`cron.form.every`),required:!0,errorKey:`everyAmount`,placeholder:b(`cron.form.everyAmountPlaceholder`)})}
                ${q(e,`everyUnit`,{label:b(`cron.form.unit`),standalone:!0,options:[{value:`seconds`,label:b(`cron.form.seconds`)},{value:`minutes`,label:b(`cron.form.minutes`)},{value:`hours`,label:b(`cron.form.hours`)},{value:`days`,label:b(`cron.form.days`)}]})}
              </div>
            `}):p}
      ${t.scheduleKind===`cron`?g`
            ${K(e,`cronExpr`,{label:b(`cron.form.expression`),required:!0,errorKey:`cronExpr`,mono:!0,placeholder:b(`cron.form.expressionPlaceholder`)})}
            ${K(e,`cronTz`,{label:b(`cron.form.timezoneOptional`),help:b(`cron.form.timezoneHelp`),list:`cron-tz-suggestions`,placeholder:b(`cron.form.timezonePlaceholder`)})}
          `:p}
      ${o?g` <div class="cron-schedule-summary">${S(`clock`)}<span>${o}</span></div> `:p}
    `)}function Sn(e,t){let n=Jt(e);return O({title:b(`cron.detail.deliverySection`)},g`
      ${J(e,`deliveryMode`,{label:b(`cron.form.deliveryModeLabel`),help:b(`cron.form.deliveryHelp`),value:t.selectedDeliveryMode,options:[...t.supportsAnnounce?[{value:`announce`,label:b(`cron.form.announceDefault`)}]:[],{value:`webhook`,label:b(`cron.form.webhookPost`)},{value:`none`,label:b(`cron.form.noneInternal`)}]})}
      ${t.selectedDeliveryMode===`announce`?g`
            ${J(e,`deliveryChannel`,{label:b(`cron.form.channel`),help:b(`cron.form.channelHelp`),value:e.form.deliveryChannel||`last`,options:n.map(t=>({value:t,label:Yt(e,t)}))})}
            ${K(e,`deliveryTo`,{label:b(`cron.form.to`),help:b(`cron.form.toHelp`),list:`cron-delivery-to-suggestions`,placeholder:b(`cron.form.toPlaceholder`)})}
          `:p}
      ${t.selectedDeliveryMode===`webhook`?K(e,`deliveryTo`,{label:b(`cron.form.webhookUrl`),required:!0,help:b(`cron.form.webhookHelp`),errorKey:`deliveryTo`,list:`cron-delivery-to-suggestions`,placeholder:b(`cron.form.webhookPlaceholder`)}):p}
    `)}function Cn(e,t){let n=e.form.scheduleKind===`cron`,r=Jt(e);return g`
    <section class="settings-section">
      <details class="cron-advanced">
        <summary class="settings-section__heading cron-advanced__summary">
          ${b(`cron.form.advanced`)}
        </summary>
        <p class="settings-section__desc">${b(`cron.form.advancedHelp`)}</p>
        <div class="settings-group">
          ${K(e,`description`,{label:b(`cron.form.description`),placeholder:b(`cron.form.descriptionPlaceholder`)})}
          ${t.mode===`create`?Y(e,`enabled`,{label:b(`cron.form.startEnabled`)}):p}
          ${J(e,`wakeMode`,{label:b(`cron.form.wakeMode`),help:b(`cron.form.wakeModeHelp`),options:[{value:`now`,label:b(`cron.form.now`)},{value:`next-heartbeat`,label:b(`cron.form.nextHeartbeat`)}]})}
          ${t.isAgentTurn?K(e,`timeoutSeconds`,{label:b(`cron.form.timeoutSeconds`),help:b(`cron.form.timeoutHelp`),errorKey:`timeoutSeconds`,placeholder:b(`cron.form.timeoutPlaceholder`)}):p}
          ${e.form.scheduleKind===`at`||e.form.scheduleKind===`on-exit`?Y(e,`deleteAfterRun`,{label:b(`cron.form.deleteAfterRun`),help:b(`cron.form.deleteAfterRunHelp`)}):p}
          ${Y(e,`clearAgent`,{label:b(`cron.form.clearAgentOverride`),help:b(`cron.form.clearAgentHelp`)})}
          ${W({label:b(`cron.form.sessionKey`),controlId:`cron-session-key`,help:b(`cron.form.sessionKeyHelp`),control:g`
              <input
                id="cron-session-key"
                class="settings-input"
                .value=${e.form.sessionKey}
                placeholder="agent:main:main"
                @input=${t=>e.onFormChange({sessionKey:t.target.value})}
              />
            `})}
          ${n?g`
                ${Y(e,`scheduleExact`,{label:b(`cron.form.exactTiming`),help:b(`cron.form.exactTimingHelp`)})}
                ${W({label:b(`cron.form.staggerWindow`),controlId:`cron-stagger-amount`,error:e.fieldErrors.staggerAmount,errorId:H(`staggerAmount`),control:g`
                    <div class="cron-inline-controls">
                      ${G(e,`staggerAmount`,{label:b(`cron.form.staggerWindow`),disabled:e.form.scheduleExact,errorKey:`staggerAmount`,placeholder:b(`cron.form.staggerPlaceholder`)})}
                      ${q(e,`staggerUnit`,{label:b(`cron.form.staggerUnit`),standalone:!0,disabled:e.form.scheduleExact,options:[{value:`seconds`,label:b(`cron.form.seconds`)},{value:`minutes`,label:b(`cron.form.minutes`)}]})}
                    </div>
                  `})}
              `:p}
          ${t.isAgentTurn?g`
                ${W({label:b(`cron.form.accountId`),controlId:`cron-delivery-account-id`,help:b(`cron.form.accountIdHelp`),control:g`
                    <input
                      id="cron-delivery-account-id"
                      class="settings-input"
                      .value=${e.form.deliveryAccountId}
                      list="cron-delivery-account-suggestions"
                      ?disabled=${t.selectedDeliveryMode!==`announce`}
                      placeholder="default"
                      @input=${t=>e.onFormChange({deliveryAccountId:t.target.value})}
                    />
                  `})}
                ${Y(e,`payloadLightContext`,{label:b(`cron.form.lightContext`),help:b(`cron.form.lightContextHelp`)})}
                ${wn(e,r)}
              `:p}
          ${t.selectedDeliveryMode===`none`?p:Y(e,`deliveryBestEffort`,{label:b(`cron.form.bestEffortDelivery`),help:b(`cron.form.bestEffortHelp`)})}
        </div>
      </details>
    </section>
  `}function wn(e,t){return g`
    ${J(e,`failureAlertMode`,{label:b(`cron.form.failureAlerts`),help:b(`cron.form.failureAlertsHelp`),options:[{value:`inherit`,label:b(`cron.form.failureAlertInherit`)},{value:`disabled`,label:b(`cron.form.failureAlertDisabled`)},{value:`custom`,label:b(`cron.form.failureAlertCustom`)}]})}
    ${e.form.failureAlertMode===`custom`?g`
          ${K(e,`failureAlertAfter`,{label:b(`cron.form.failureAlertAfter`),help:b(`cron.form.failureAlertAfterHelp`),errorKey:`failureAlertAfter`,placeholder:`2`})}
          ${K(e,`failureAlertCooldownSeconds`,{label:b(`cron.form.failureAlertCooldown`),help:b(`cron.form.failureAlertCooldownHelp`),errorKey:`failureAlertCooldownSeconds`,placeholder:`3600`})}
          ${J(e,`failureAlertChannel`,{label:b(`cron.form.failureAlertChannel`),value:e.form.failureAlertChannel||`last`,options:t.map(t=>({value:t,label:Yt(e,t)}))})}
          ${K(e,`failureAlertTo`,{label:b(`cron.form.failureAlertTo`),help:b(`cron.form.failureAlertToHelp`),list:`cron-delivery-to-suggestions`,placeholder:b(`cron.form.failureAlertToPlaceholder`)})}
          ${J(e,`failureAlertDeliveryMode`,{label:b(`cron.form.failureAlertMode`),value:e.form.failureAlertDeliveryMode||`announce`,options:[{value:`announce`,label:b(`cron.form.failureAlertAnnounce`)},{value:`webhook`,label:b(`cron.form.failureAlertWebhook`)}]})}
          ${K(e,`failureAlertAccountId`,{label:b(`cron.form.failureAlertAccountId`),placeholder:b(`cron.form.failureAlertAccountPlaceholder`)})}
        `:p}
  `}var Q,Tn,En,Dn=e((()=>{h(),ue(),fe(),v(),it(),Nt(),vt(),C(),nt(),ft(),Ee(),De(),St(),x(),je(),Ne(),se(),xt(),a(),Pt(),It(),Rt(),qt(),Q={name:`cron.form.fieldName`,scheduleAt:`cron.form.runAt`,everyAmount:`cron.form.every`,cronExpr:`cron.form.expression`,staggerAmount:`cron.form.staggerWindow`,payloadText:`cron.form.assistantTaskPrompt`,payloadModel:`cron.form.model`,payloadThinking:`cron.form.thinking`,timeoutSeconds:`cron.form.timeoutSeconds`,deliveryTo:`cron.form.to`,failureAlertAfter:`cron.form.failureAlertAfter`,failureAlertCooldownSeconds:`cron.form.failureAlertCooldown`},Tn=[{value:`all`,labelKey:`cron.tabs.all`},{value:`enabled`,labelKey:`cron.tabs.active`},{value:`disabled`,labelKey:`cron.tabs.paused`}],En={script:`javascript`,command:`bash`,heartbeat:``,systemEvent:``,agentTurn:``}})),$;e((()=>{he(),h(),de(),ye(),be(),xe(),wt(),ot(),te(),Xe(),le(),pt(),s(),u(),Mt(),Dn(),t(),$=class extends ne{constructor(...e){super(...e),this.cron=Ye(),this.agentsList=null,this.cronModelSuggestions=[],this.listTab=`tasks`,this.detailTab=`settings`,this.modelSuggestionsState=null,this.gateway=new mt(this,{getGateway:()=>this.context?.gateway,invalidateRequests:e=>this.resetGatewayState(e.snapshot),onSnapshot:e=>{e.initial&&this.resetGatewayState(e.snapshot)},ensureInitialData:()=>this.ensureInitialData()}),this.observeAgentScope=c(e=>{this.resetGatewayState(this.context.gateway.snapshot),this.cron.cronAgentId=e,this.listTab=`tasks`,this.detailTab=`settings`,this.ensureInitialData(),this.requestUpdate()}),this.subscriptions=new r(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),()=>this.syncAgentsState()).watch(()=>this.context?.channels,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{this.gateway.gateway===e&&this.context.gateway===e&&this.gateway.connected&&this.gateway.client&&t.event===`cron`&&this.refreshCron({tableFilters:!0})})),this.lastPanelKey=null}get canManageCron(){return ge(this.context.gateway.snapshot).canAdmin}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}resetGatewayState(e){let t=e?.phase===`connected`;this.cron=Ye({client:e?.client??null,connected:t}),this.cron.cronAgentId=this.context.agentSelection.state.scopeId,this.agentsList=t?this.context.agents.state.agentsList:null,this.cronModelSuggestions=[],this.modelSuggestionsState=null}syncAgentsState(){this.agentsList=this.context.agents.state.agentsList}ensureInitialData(){if(!(!this.cron.connected||!this.cron.client)&&(!this.agentsList&&!this.context.agents.state.agentsLoading&&this.context.agents.ensureList(),!this.cron.cronStatus&&!this.cron.cronLoading?this.refreshCron({tableFilters:!0}):!this.cron.cronRuns.length&&!this.cron.cronRunsLoadingMore&&this.loadRuns(this.cron.cronRunsScope===`all`?null:this.cron.cronRunsJobId),this.modelSuggestionsState!==this.cron)){let e=this.cron;this.modelSuggestionsState=e,this.loadModelSuggestions(e)}}requestCronUpdate(e=this.cron){this.cron===e&&this.requestUpdate()}updated(){let e=`${this.cron.cronEditingJobId?`job`:this.cron.cronCreateOpen?`create`:`overview`}:${this.cron.cronEditingJobId??``}`;if(e!==this.lastPanelKey){this.lastPanelKey=e,this.detailTab=`settings`;let t=this.closest(`.content`);t instanceof HTMLElement&&typeof t.scrollTo==`function`&&t.scrollTo({top:0})}}async refreshCron(e){let t=this.cron;if(!t.connected||!t.client)return;let n=t.cronRunsScope===`job`?t.cronRunsJobId:null;this.loadRuns(n),this.context.channels.refresh(!1),await Promise.all([this.runCronTask(e=>ze(e)),this.runCronTask(e=>Qe(e)),this.runCronTask(e=>Fe(e)),this.runCronTask(t=>w(t,{tableFilters:e.tableFilters}))])}loadRuns(e){return this.runCronTask(t=>T(t,e))}async loadModelSuggestions(e){let t={client:e.client,connected:e.connected,cronModelSuggestions:this.cronModelSuggestions};await We(t),this.isConnected&&this.cron===e&&this.modelSuggestionsState===e&&e.connected&&t.client===e.client&&(this.cronModelSuggestions=t.cronModelSuggestions)}async runCronTask(e){let t=this.cron;try{let n=e(t);return this.requestCronUpdate(t),await n}finally{this.requestCronUpdate(t)}}runCronAdminTask(e){this.canManageCron&&this.runCronTask(e)}patchForm(e){this.canManageCron&&(this.cron.cronForm=Je({...this.cron.cronForm,...e}),this.cron.cronFieldErrors=Pe(this.cron.cronForm),this.requestCronUpdate())}selectJob(e){this.cron.cronCreateOpen=!1,E(this.cron,e),this.requestCronUpdate(),this.runCronTask(async t=>{D(t,{cronRunsScope:`job`}),t.cronRunsJobId=e.id,await T(t,e.id)})}openCreate(e){if(this.canManageCron){if(Ke(this.cron),this.cron.cronCreateOpen=!0,e){this.patchForm(e);return}this.requestCronUpdate()}}cloneJob(e){this.canManageCron&&(Ie(this.cron,e),this.cron.cronCreateOpen=!0,this.requestCronUpdate())}closePanel(){Ke(this.cron),this.cron.cronCreateOpen=!1,this.requestCronUpdate(),this.runCronTask(async e=>{D(e,{cronRunsScope:`all`}),e.cronRunsJobId=null,await T(e,null)})}submitForm(e={}){this.runCronAdminTask(async t=>{let n=t.cronEditingJobId,r=await Ze(t);if(r.saved){if(n){let e=t.cronJobs.find(e=>e.id===n);e&&E(t,e);return}e.runNow&&r.jobId&&await Ve(t,r.jobId,`force`),t.cronCreateOpen=!1,t.cronRunsScope===`job`&&(D(t,{cronRunsScope:`all`}),t.cronRunsJobId=null,await T(t,null))}})}render(){let e=this.context.channels.state,t=ie(this.context),n=At({channels:e,runtimeConfig:this.context.runtimeConfig.state,cron:this.cron,agentsList:this.agentsList,modelSuggestions:this.cronModelSuggestions}),r=this.canManageCron;return g`
      <section class="content-header">
        <div>
          <div class="page-title">${_e(`cron`)}</div>
        </div>
        ${Ct({agents:this.agentsList?.agents??[],selection:this.context.agentSelection})}
      </section>
      ${at(tn({basePath:this.context.basePath,agentId:t,loading:this.cron.cronLoading,canManage:r,status:this.cron.cronStatus,failingCount:this.cron.cronFailingCount,agentScoped:this.cron.cronAgentId!==null,scopedTotal:this.cron.cronScopedTotal,scopedNextWakeAtMs:this.cron.cronScopedNextWakeAtMs,jobs:Le(this.cron),jobsLoadingMore:this.cron.cronJobsLoadingMore,jobsTotal:this.cron.cronJobsTotal,jobsHasMore:this.cron.cronJobsHasMore,jobsQuery:this.cron.cronJobsQuery,jobsEnabledFilter:this.cron.cronJobsEnabledFilter,jobsScheduleKindFilter:this.cron.cronJobsScheduleKindFilter,jobsLastStatusFilter:this.cron.cronJobsLastStatusFilter,jobsSortBy:this.cron.cronJobsSortBy,jobsSortDir:this.cron.cronJobsSortDir,editingJobId:this.cron.cronEditingJobId,createOpen:this.cron.cronCreateOpen,listTab:this.listTab,detailTab:this.detailTab,error:this.cron.cronError,busy:this.cron.cronBusy,form:this.cron.cronForm,channels:e.channelsSnapshot?.channelMeta?.length?e.channelsSnapshot.channelMeta.map(e=>e.id):e.channelsSnapshot?.channelOrder??[],channelLabels:e.channelsSnapshot?.channelLabels??{},channelMeta:e.channelsSnapshot?.channelMeta??[],runs:this.cron.cronRuns,runsTotal:this.cron.cronRunsTotal,runsHasMore:this.cron.cronRunsHasMore,runsLoadingMore:this.cron.cronRunsLoadingMore,runsStatuses:this.cron.cronRunsStatuses,runsDeliveryStatuses:this.cron.cronRunsDeliveryStatuses,runsQuery:this.cron.cronRunsQuery,runsSortDir:this.cron.cronRunsSortDir,fieldErrors:this.cron.cronFieldErrors,canSubmit:!qe(this.cron.cronFieldErrors),agentSuggestions:n.agentSuggestions,modelSuggestions:n.modelSuggestions,thinkingSuggestions:jt,timezoneSuggestions:n.timezoneSuggestions,deliveryToSuggestions:n.deliveryToSuggestions,accountSuggestions:n.accountTargets,onListTabChange:e=>{this.listTab=e},onDetailTabChange:e=>{this.detailTab=e},onFormChange:e=>this.patchForm(e),onRefresh:()=>void this.refreshCron({tableFilters:!0}),onSubmit:()=>this.submitForm(),onSubmitRunNow:()=>this.submitForm({runNow:!0}),onSelectJob:e=>this.selectJob(e),onOpenCreate:e=>this.openCreate(e),onClosePanel:()=>this.closePanel(),onClone:e=>this.cloneJob(e),onToggle:(e,t)=>this.runCronAdminTask(async n=>{await $e(n,e,t)&&n.cronEditingJobId===e.id&&(n.cronForm={...n.cronForm,enabled:t})}),onRun:(e,t)=>this.runCronAdminTask(n=>Ve(n,e.id,t??`force`)),onRemove:e=>this.runCronAdminTask(async t=>{await Ge(t,e),t.cronRunsScope===`job`&&t.cronRunsJobId===null&&(D(t,{cronRunsScope:`all`}),await T(t,null))}),onLoadMoreJobs:()=>void this.runCronTask(e=>w(e,{append:!0,tableFilters:!0})),onJobsFiltersChange:e=>void this.runCronTask(async t=>{Re(t,e),await w(t,{append:!1,tableFilters:!0})}),onJobsFiltersReset:()=>void this.runCronTask(async e=>{Re(e,{cronJobsScheduleKindFilter:`all`,cronJobsLastStatusFilter:`all`,cronJobsSortBy:`nextRunAtMs`,cronJobsSortDir:`asc`}),await w(e,{append:!1,tableFilters:!0})}),onLoadMoreRuns:()=>void this.runCronTask(e=>Be(e)),onRunsFiltersChange:e=>void this.runCronTask(async t=>{D(t,e),await T(t,t.cronRunsScope===`all`?null:t.cronRunsJobId)}),onNavigateToChat:e=>this.context.navigate(`chat`,ae({context:this.context,face:`chat`,sessionKey:e}).options)}))}
    `}},n([me({context:ve,subscribe:!0})],$.prototype,`context`,void 0),n([y()],$.prototype,`cron`,void 0),n([y()],$.prototype,`agentsList`,void 0),n([y()],$.prototype,`cronModelSuggestions`,void 0),n([y()],$.prototype,`listTab`,void 0),n([y()],$.prototype,`detailTab`,void 0),customElements.get(`openclaw-cron-page`)||customElements.define(`openclaw-cron-page`,$)}))();
//# sourceMappingURL=cron-page-DA2BD8VL.js.map