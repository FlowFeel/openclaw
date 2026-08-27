import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{As as r,Bc as i,Hc as a,Jn as o,Kc as s,Vc as c,Wc as l,ar as u,er as d,fs as f,nr as p,pa as ee,rr as m,za as te}from"./control-ui-core-ChU36mQ7.js";import{K as h,Q as ne,W as g,Y as _,nt as v}from"./lit-runtime-D5xZwgO1.js";import{i as y,r as b}from"./control-ui-foundation-Dgui328h.js";import{A as x,D as S,Wt as re,_ as ie,jt as ae,v as oe}from"./control-ui-core-CmlLmVZa.js";import{Zt as se,en as C}from"./control-ui-foundation-DkfOBVsU.js";import{o as w,t as ce}from"./control-ui-core-M4uhXYSJ.js";import{vt as le,yt as ue}from"./control-ui-core-pXkCFtVv.js";import{n as de,t as fe}from"./settings-workspace-BbyrBOFl.js";import{c as T,f as E,p as D,t as O}from"./settings-ui-Bq4yxauk.js";import{n as k,t as A}from"./stream-auto-follow-controller-DZ9E9o4h.js";function j(e){return typeof e==`string`&&e.trim()||null}function M(e){return e&&typeof e==`object`?e:null}function N(e,t=Date.now()){let n=M(e),r=j(n?.runId),i=M(n?.data),a=n?.stream===`tool`,o=n?.stream===`item`&&j(i?.kind)===`answer_candidate`;if(!n||!a&&!o||!r||!i)return null;let s=j(n.sessionKey),c=j(n.agentId);return{stream:a?`tool`:`item`,runId:r,ts:typeof n.ts==`number`?n.ts:t,receivedAt:t,...s?{sessionKey:s}:{},...c?{agentId:c}:{},data:i}}function P(e){if(typeof e==`string`)return e;if(typeof e==`number`||typeof e==`boolean`)return String(e);let t=M(e);if(!t)return null;if(typeof t.text==`string`)return t.text;let n=t.content;if(!Array.isArray(n))return null;let r=n.map(e=>{let t=M(e);return t?.type===`text`&&typeof t.text==`string`?t.text:null}).filter(e=>!!e);return r.length>0?r.join(`
`):null}function F(e){let t=P(e);if(t!==null)return t;if(e==null)return null;try{return JSON.stringify(e,null,2)}catch{return p(e)}}function I(e){return W.reduce((e,[t,n])=>e.replace(t,n),e)}function L(e){let t=F(e);if(!t)return{truncated:!1};let n=u(I(t),H);return{text:n.text,truncated:n.truncated}}function R(e){if(e==null)return 0;if(Array.isArray(e))return e.length;let t=M(e);return t?Object.keys(t).length:1}function z(e){return e?.isError===!0||e?.is_error===!0}function B(e){if(j(e.phase)!==`result`)return`running`;let t=M(e.result);if(z(e)||z(t))return`error`;let n=j(e.status)??j(t?.status);if(n&&/error|fail|failed|failure/i.test(n))return`error`;let r=Number(t?.exitCode??e.exitCode);return Number.isFinite(r)&&r!==0?`error`:`done`}function V(e){return U[e]}function pe(e,t,n){let r=`${n} argument${n===1?``:`s`} hidden`;return`${e} ${V(t)}; ${r}`}function me(e,t){let n=t.data??{};if(t.stream===`item`)return ge(e,t);let r=j(n.toolCallId);if(!r)return e;let i=j(n.name)??`tool`,a=`${t.runId}:${r}`,o=t.receivedAt,s=typeof t.ts==`number`?t.ts:o,c=B(n),l=L(n.phase===`update`?n.partialResult:n.phase===`result`?n.result:null),u=e.find(e=>e.id===a),d=n.args===void 0?u?.hiddenArgumentCount??0:R(n.args),f=l.text??u?.outputPreview,p={id:a,toolCallId:r,runId:t.runId,...t.sessionKey?{sessionKey:t.sessionKey}:{},toolName:i,entryKind:`tool`,status:c,startedAt:u?.startedAt??s,updatedAt:o,durationMs:Math.max(0,o-(u?.startedAt??s)),outputTruncated:l.truncated||u?.outputTruncated===!0,summary:pe(i,c,d),hiddenArgumentCount:d,...f?{outputPreview:f}:{}};return(u?e.map(e=>e.id===a?p:e):[...e,p]).slice(-100)}function he(e){return e===`candidate`||e===`superseded`||e===`selected`?e:null}function ge(e,t){let n=j(t.data.itemId),r=he(t.data.status);if(!n||!r)return e;let i=`${t.runId}:answer_candidate:${n}`,a=e.find(e=>e.id===i),o=t.receivedAt,s=a?.startedAt??t.ts,c=L(t.data.progressText),l={id:i,toolCallId:n,itemId:n,runId:t.runId,...t.sessionKey?{sessionKey:t.sessionKey}:{},toolName:`answer_candidate`,entryKind:`answer_candidate`,candidateStatus:r,status:r===`candidate`?`running`:`done`,startedAt:s,updatedAt:o,durationMs:Math.max(0,o-s),outputTruncated:c.truncated||a?.outputTruncated===!0,summary:`answer_candidate.${r}`,hiddenArgumentCount:0,...c.text?{outputPreview:c.text}:{}};return(a?e.map(e=>e.id===i?l:e):[...e,l]).slice(-100)}var H,U,W,_e=e((()=>{m(),H=2e3,U={running:`running`,done:`completed`,error:`failed`},W=[[/\b(Authorization|Cookie|Set-Cookie)\s*:\s*[^\n\r]+/gi,`$1: [redacted]`],[/\b(Bearer\s+)[A-Za-z0-9._~+/=-]{12,}/gi,`$1[redacted]`],[/\b(api[_.-]?key|token|secret|password|passwd|authorization)\b(["'])(\s*:\s*)"(?:\\.|[^"\\\r\n])*"/gi,`$1$2$3"[redacted]"`],[/\b(api[_.-]?key|token|secret|password|passwd|authorization)\b(["'])(\s*:\s*)'(?:\\.|[^'\\\r\n])*'/gi,`$1$2$3'[redacted]'`],[/\b(api[_.-]?key|token|secret|password|passwd|authorization)\b(\s*[:=]\s*)["']?[^"',\s}]+/gi,`$1$2[redacted]`],[/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,`[redacted private key]`],[/(^|[\s"'`=])(?:\/Users\/|\/home\/|\/var\/folders\/|[A-Za-z]:\\)[^\s"'`,;]+/g,`$1[redacted path]`]]})),ve=e((()=>{}));function ye(e){return d(e,{hour:`numeric`,minute:`2-digit`,second:`2-digit`},``)}function be(e){return!Number.isFinite(e)||e<0?w(`common.na`):o(e,{spaced:!0})??`0ms`}function G(e){return w(`activity.status.${e}`)}function K(e){return e===1?w(`activity.argumentHiddenOne`):w(`activity.argumentsHidden`,{count:String(e)})}function q(e){return e.entryKind===`answer_candidate`?w(`activity.answerCandidate.${e.candidateStatus??`candidate`}`):w(`activity.entrySummary`,{argumentSummary:K(e.hiddenArgumentCount),status:G(e.status),tool:e.toolName})}function J(e){return e.entryKind===`answer_candidate`?w(`activity.answerCandidate.title`):e.toolName}function xe(e,t){return!t||C([e.toolName,J(e),e.candidateStatus,e.status,e.summary,q(e),e.outputPreview,e.runId,e.toolCallId,e.sessionKey].filter(Boolean).join(` `)).includes(t)}function Se(e){return se(e.map(e=>e.toolName))}function Ce(e){let t=C(e.filterText);return e.entries.filter(n=>!e.statusFilters[n.status]||e.toolFilter&&n.toolName!==e.toolFilter?!1:xe(n,t))}function we(e,t){return _`
    <label class="activity-status-filter">
      <input
        type="checkbox"
        .checked=${e.statusFilters[t]}
        @change=${n=>e.onStatusToggle(t,n.target.checked)}
      />
      <span>${G(t)}</span>
    </label>
  `}function Y(e){return Z[e]}function Te(e,t){let n=e.expandedIds.has(t.id);return _`
    <details
      class="activity-entry activity-entry--${t.status}"
      role="listitem"
      .open=${n}
      @toggle=${n=>e.onEntryToggle(t.id,n.currentTarget.open)}
    >
      <summary class="activity-entry__summary">
        <span class="activity-entry__chevron" aria-hidden="true">${le.chevronRight}</span>
        <span class="activity-entry__main">
          <span class="activity-entry__title">
            ${E({kind:Y(t.status),label:G(t.status)})}
            <span class="activity-entry__tool mono">${J(t)}</span>
          </span>
          <span class="activity-entry__text">${q(t)}</span>
        </span>
        <span class="activity-entry__meta">
          <span>${ye(t.updatedAt)}</span>
          <span>${be(t.durationMs)}</span>
        </span>
      </summary>
      <div class="activity-entry__body">
        <div class="activity-entry__facts">
          ${t.entryKind===`answer_candidate`?_`<span class="mono"
                >${w(`activity.answerCandidate.itemId`)}: ${t.itemId}</span
              >`:_`
                <span>${K(t.hiddenArgumentCount)}</span>
                <span class="mono">${w(`activity.toolCallId`)}: ${t.toolCallId}</span>
              `}
          <span class="mono">${w(`activity.runId`)}: ${t.runId}</span>
          ${t.sessionKey?_`<span class="mono">${w(`activity.session`)}: ${t.sessionKey}</span>`:h}
        </div>
        ${t.outputPreview?_`
              <pre class="activity-entry__preview">${t.outputPreview}</pre>
              ${t.outputTruncated?_`<div class="activity-entry__note">${w(`activity.outputTruncated`)}</div>`:h}
            `:_`<div class="activity-entry__note">${w(`activity.noOutputPreview`)}</div>`}
      </div>
    </details>
  `}function Ee(e){let t=Se(e.entries),n=Ce(e),r=e.filterText.trim()||e.toolFilter||X.some(t=>!e.statusFilters[t]);return _`
    <section class="activity-page" aria-label=${w(`activity.title`)}>
      <div class="settings-section__header">
        <h2 class="settings-section__heading">${w(`activity.title`)}</h2>
        <div class="settings-section__actions">
          <span class="activity-count" aria-live="polite">
            ${w(`activity.visibleCount`,{visible:String(n.length),total:String(e.entries.length)})}
          </span>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${n.length===0}
            @click=${e.onExpandAll}
          >
            ${w(`activity.expandAll`)}
          </button>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${e.expandedIds.size===0}
            @click=${e.onCollapseAll}
          >
            ${w(`activity.collapseAll`)}
          </button>
          <button
            type="button"
            class="btn btn--sm danger"
            ?disabled=${e.entries.length===0}
            @click=${e.onClear}
          >
            ${w(`activity.clear`)}
          </button>
        </div>
      </div>
      <div class="settings-group activity-group">
        ${T({title:w(`activity.search`),control:_`
            <input
              class="settings-input"
              type="search"
              aria-label=${w(`activity.search`)}
              .value=${e.filterText}
              placeholder=${w(`activity.searchPlaceholder`)}
              @input=${t=>e.onFilterTextChange(t.target.value)}
            />
          `})}
        ${T({title:w(`activity.toolFilter`),control:_`
            <select
              class="settings-select"
              aria-label=${w(`activity.toolFilter`)}
              .value=${e.toolFilter}
              @change=${t=>e.onToolFilterChange(t.target.value)}
            >
              <option value="">${w(`activity.allTools`)}</option>
              ${t.map(e=>_`<option value=${e}>${e}</option>`)}
            </select>
          `})}
        ${T({title:w(`activity.statusFilters`),control:_`
            <span
              role="group"
              aria-label=${w(`activity.statusFilters`)}
              class="activity-status-filters"
            >
              ${X.map(t=>we(e,t))}
            </span>
          `})}
        ${T({title:w(`activity.autoFollow`),control:D({checked:e.autoFollow,ariaLabel:w(`activity.autoFollow`),onChange:t=>e.onToggleAutoFollow(t)})})}
        <div
          class="activity-stream"
          role="list"
          aria-label=${w(`activity.streamLabel`)}
          @scroll=${e.onScroll}
        >
          ${n.length===0?_`
                <div class="activity-empty">
                  ${e.entries.length===0||!r?w(`activity.empty`):w(`activity.emptyFiltered`)}
                </div>
              `:n.map(t=>Te(e,t))}
        </div>
      </div>
    </section>
  `}var X,Z,De=e((()=>{g(),ue(),O(),ce(),m(),a(),ve(),X=[`running`,`done`,`error`],Z={running:`warn`,done:`ok`,error:`danger`}})),Q,$;e((()=>{b(),g(),ne(),ae(),oe(),S(),fe(),ee(),f(),s(),k(),c(),_e(),De(),t(),$=class extends l{constructor(...e){super(...e),this.entries=[],this.filterText=``,this.statusFilters={running:!0,done:!0,error:!0},this.toolFilter=``,this.expandedIds=new Set,this.autoFollow=!0,this.sessionKey=``,this.streamFollow=new A(this,{selector:`.activity-stream`,isEnabled:()=>this.autoFollow}),this.subscriptions=new i(this).effect(()=>this.context?.gateway,e=>{this.applyGatewaySnapshot(e,e.snapshot,!0);let t=e.subscribeEvents(t=>{this.applyGatewayEvent(e,t,Date.now())}),n=e.subscribe(t=>this.applyGatewaySnapshot(e,t,!1));return()=>{n(),t()}})}updated(e){this.autoFollow&&this.streamFollow.atBottom&&(e.has(`entries`)||e.has(`autoFollow`))&&this.streamFollow.schedule(e.has(`autoFollow`))}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}applyGatewaySnapshot(e,t,n){let r=this.sessionKey;this.sessionKey=te(x().sessionKey,t.hello),(n||this.sessionKey!==r)&&this.rebuildEntries(e,t)}rebuildEntries(e,t){let n=[],r=e.eventLog,i=Q?r.indexOf(Q):-1,a=i<0?r:r.slice(0,i);for(let e of a.toReversed())n=this.reduceGatewayEvent(n,t,e.event,e.payload,e.ts);(n.length>0||this.entries.length>0)&&(this.entries=n),this.expandedIds.size>0&&(this.expandedIds=new Set),this.streamFollow.atBottom=!0}applyGatewayEvent(e,t,n){if(this.context.gateway!==e)return;let r=this.reduceGatewayEvent(this.entries,e.snapshot,t.event,t.payload,n);r!==this.entries&&(this.entries=r)}reduceGatewayEvent(e,t,n,i,a){if(n!==`agent`&&n!==`session.tool`)return e;let o=N(i,a);return!o||!r({sessionKey:this.sessionKey,assistantAgentId:t.assistantAgentId,hello:t.hello},o.sessionKey,o.agentId)?e:me(e,o)}clearEntries(){Q=this.context.gateway.eventLog[0],this.entries=[],this.expandedIds=new Set,this.streamFollow.atBottom=!0}render(){let e=Ee({entries:this.entries,filterText:this.filterText,statusFilters:this.statusFilters,toolFilter:this.toolFilter,expandedIds:this.expandedIds,autoFollow:this.autoFollow,onFilterTextChange:e=>this.filterText=e,onToolFilterChange:e=>this.toolFilter=e,onStatusToggle:(e,t)=>{this.statusFilters={...this.statusFilters,[e]:t}},onToggleAutoFollow:e=>{this.autoFollow=e,e&&this.streamFollow.schedule(!0)},onClear:()=>this.clearEntries(),onExpandAll:()=>{this.expandedIds=new Set(this.entries.map(e=>e.id))},onCollapseAll:()=>{this.expandedIds=new Set},onEntryToggle:(e,t)=>{let n=new Set(this.expandedIds);t?n.add(e):n.delete(e),this.expandedIds=n},onScroll:e=>this.streamFollow.handleScroll(e)});return _`
      <section class="content-header">
        <div>
          <div class="page-title">${re(`activity`)}</div>
        </div>
      </section>
      ${de(e,{fillHeight:!0})}
    `}},n([y({context:ie,subscribe:!0})],$.prototype,`context`,void 0),n([v()],$.prototype,`entries`,void 0),n([v()],$.prototype,`filterText`,void 0),n([v()],$.prototype,`statusFilters`,void 0),n([v()],$.prototype,`toolFilter`,void 0),n([v()],$.prototype,`expandedIds`,void 0),n([v()],$.prototype,`autoFollow`,void 0),customElements.get(`openclaw-activity-page`)||customElements.define(`openclaw-activity-page`,$)}))();
//# sourceMappingURL=activity-page-CB5O193b.js.map