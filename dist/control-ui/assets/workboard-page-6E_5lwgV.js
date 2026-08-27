const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./workboard-card-dashboard-CrbbWXEi.js","./rolldown-runtime-DaJ6WEGw.js","./control-ui-foundation-OE0aAIzW.js","./control-ui-foundation-Dgui328h.js","./lit-runtime-D5xZwgO1.js","./control-ui-foundation-DkfOBVsU.js","./control-ui-core-BUddgKjW.js","./control-ui-core-Ct5CBwjl.js","./control-ui-core-s0pW0mau.js","./control-ui-core-vLOElyFQ.js","./control-ui-shared-CvVnFE5v.js","./gateway-runtime-DWs8EJ0W.js","./control-ui-core-CMupHFtS.css","./provider-CWR1ckQE.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{S as t,b as n,x as r,y as i}from"./control-ui-foundation-OE0aAIzW.js";import{$t as a,Bc as o,Bo as s,Bt as c,Dt as l,Jn as u,Kc as d,Kn as f,Ro as p,Tr as m,Un as h,Ut as g,Vc as _,Wc as v,Yt as y,br as b,cr as x,da as ee,dn as te,en as S,qn as C,rn as ne,rr as re,sa as ie,sn as w,tn as T,ua as ae,ur as oe,vr as se,xr as ce,yr as le,zt as ue}from"./control-ui-core-BUddgKjW.js";import{K as E,Q as de,W as D,Y as O,it as fe}from"./lit-runtime-D5xZwgO1.js";import{i as pe,r as me}from"./control-ui-foundation-Dgui328h.js";import{Tt as he,Wt as ge,_ as _e,dn as ve,g as ye,h as be,jt as xe,rn as Se,un as Ce,v as we,wt as Te}from"./control-ui-core-Ct5CBwjl.js";import{wn as Ee}from"./control-ui-foundation-DkfOBVsU.js";import{o as k,t as A}from"./control-ui-core-s0pW0mau.js";import{U as De,W as Oe,gt as ke,pt as Ae,vt as j,yt as M}from"./control-ui-core-vLOElyFQ.js";import{n as N,t as je}from"./workboard-board-glyph-C-TmZtaA.js";import{d as Me,i as Ne,l as Pe,n as Fe,o as Ie,r as Le,s as Re,t as ze}from"./mutations-DG36mphg.js";import{t as Be}from"./agent-select-registration-BVCfxMHW.js";import{t as Ve}from"./web-awesome-select-Bcc_SPSC.js";import{n as He,t as Ue}from"./agent-scope-control-BJxpZ36W.js";import{c as We,g as Ge,h as Ke,i as qe,m as Je,o as Ye,r as Xe,s as Ze,t as P,u as Qe,v as $e,y as et}from"./workboard-ezOuwOS5.js";function tt(e,t){return e?.name??e?.identity?.name??e?.id??t}function nt(e,t){return e.agentId?.trim()||t?.defaultId||``}function rt(e,t){let n=nt(e,t);return n?t?.agents.find(e=>e.id===n):void 0}function it(e,t){let n=e.agentId?.trim()||k(`workboard.defaultAgent`);return tt(rt(e,t),n)}function at(e,t,n){if(n===`all`)return!0;let r=e.agentId?.trim();return n==="default"?!r:r===n}function ot(e,t,n){if(!n)return!0;let r=e.agentId?.trim();return r===n||!r&&t?.defaultId===n}function F(e){return typeof e==`string`?e.trim():``}function st(e){let t=new Set,n=F(e?.defaultId),r=[];for(let i of e?.agents??[]){let e=F(i.id);!e||t.has(e)||(t.add(e),r.push({id:e,label:tt(i,e),isDefault:!!(n&&e===n)}))}return r}function ct(e){return e.find(e=>e.isDefault)?.label??k(`workboard.defaultAgent`)}function lt(e,t){let n=st(e),r=new Set(n.map(e=>e.id)),i=[...new Set(t.map(e=>F(e.agentId)).filter(e=>e&&!r.has(e)))].toSorted((e,t)=>e.localeCompare(t)),a=[{id:`all`,label:k(`workboard.allAgents`)},{id:`default`,label:k(`workboard.agentFilterUnassigned`,{agent:ct(n)}),description:k(`workboard.agentFilterUnassignedHelp`)}];for(let e of n)a.push({id:e.id,label:e.isDefault?k(`workboard.agentFilterConfiguredDefault`,{agent:e.label}):e.label,...e.isDefault?{description:k(`workboard.agentFilterConfiguredDefaultHelp`)}:{}});for(let e of i)a.push({id:e,label:k(`workboard.agentCurrentUnconfigured`,{agent:e})});return a}function ut(e,t){let n=st(e?{...e,agents:s(e.agents)}:null),r=F(t),i=e?.agents.some(e=>e.id===r&&e.kind===`system`),a=!r||n.some(e=>e.id===r)||i;return[{id:``,label:k(`workboard.agentFilterUnassigned`,{agent:ct(n)})},...n.map(e=>({id:e.id,label:e.isDefault?k(`workboard.agentFilterConfiguredDefault`,{agent:e.label}):e.label})),...a?[]:[{id:r,label:k(`workboard.agentCurrentUnconfigured`,{agent:r})}]]}function dt(e,t){return e.some(e=>e.id===t)?t:`all`}var I=e((()=>{A(),p()})),ft=e((()=>{}));function pt(e){return e?f(e,{month:`short`,day:`numeric`},``):``}function mt(e){return new Intl.DateTimeFormat(void 0,{hour:`numeric`,minute:`2-digit`}).format(new Date(e))}function L(e){return e?C(e,{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`},``):``}function ht(e){return e?u(Math.max(0,Date.now()-e),{spaced:!0})??`0ms`:``}function R(e){return e.canWrite!==!1&&y(l(e.host))}function gt(e){return e.kind===`moved`&&e.toStatus?k(`workboard.eventMovedTo`,{status:B(e.toStatus)}):k(Dt[e.kind])}function _t(e,t){if(t.priority!==`all`&&e.priority!==t.priority)return!1;let n=t.query.trim().toLowerCase();return!n||[e.title,e.notes,e.agentId,e.sessionKey,e.execution?.engine,e.execution?.mode,e.execution?.model,e.execution?.sessionKey,e.metadata?.templateId,e.metadata?.automation?.tenant,e.metadata?.automation?.idempotencyKey,e.metadata?.automation?.workspace?.kind,e.metadata?.automation?.workspace?.path,e.metadata?.automation?.workspace?.branch,...e.metadata?.automation?.skills??[],...e.metadata?.automation?.createdCardIds??[],...(e.metadata?.comments??[]).map(e=>e.body),...(e.metadata?.links??[]).flatMap(e=>[e.title,e.url,e.targetCardId]),...(e.metadata?.proof??[]).flatMap(e=>[e.label,e.command,e.url,e.note]),...(e.metadata?.artifacts??[]).flatMap(e=>[e.label,e.url,e.path,e.mimeType]),...(e.metadata?.attachments??[]).flatMap(e=>[e.fileName,e.mimeType,e.note]),...(e.metadata?.workerLogs??[]).map(e=>e.message),e.metadata?.workerProtocol?.state,e.metadata?.workerProtocol?.detail,e.metadata?.claim?.ownerId,...(e.metadata?.diagnostics??[]).flatMap(e=>[e.kind,e.severity,e.title,e.detail]),...(e.metadata?.notifications??[]).map(e=>e.message),...e.labels].filter(e=>typeof e==`string`).some(e=>e.toLowerCase().includes(n))}function vt(e){if(e.archived||e.kind===`global`)return!1;let t=[e.key,e.label,e.displayName].filter(e=>typeof e==`string`).join(`:`).toLowerCase();return!/(^|:)heartbeat(:|$)/.test(t)}function yt(e,t,n){if(!n)return null;let r=rt(t,e.agentsList),i=r?.agentRuntime?.id?.trim();if(!i)return null;let a=i.toLowerCase();return a===`openclaw`||a===`pi`?null:k(`workboard.engineDisabledRuntime`,{agent:tt(r,t.agentId??k(`workboard.defaultAgent`)),runtime:i})}function bt(e){let[t,n,r]=Ot[e.state];return{label:k(t),detail:k(n),tone:r}}function z(e){return e.status===`queued`||e.status===`running`?e.progressSummary??e.title??e.taskId:e.terminalSummary??e.error??e.progressSummary??e.title??e.taskId}function xt(e,t){switch(e.status){case`queued`:case`running`:return t.state===`running`;case`completed`:return t.state===`succeeded`;case`failed`:case`cancelled`:case`timed_out`:return t.state===`failed`}throw Error(`Unknown workboard task status.`)}function St(e,t,n){return!!(e.taskId&&!t&&!n.has(e.taskId))}function Ct(e,t,n){return kt(t)||e.status===`running`&&St(e,t,n)}function wt(e){let t=e.sessionKey??e.execution?.sessionKey,n=e.runId??e.execution?.runId;return e.status===`running`&&!!(t&&n)}function Tt(e,t,n){let r=e.tasksByCardId.get(n.id),i=Pe(n,t),a=kt(r)||St(n,r,e.missingTaskIds),o=n.sessionKey??n.execution?.sessionKey;return!a&&!wt(n)&&(!o||!i)}function Et(e){return e.blockedParents.length===0?null:k(`workboard.dependenciesBlockedTitle`,{parents:e.blockedParents.map(e=>{if(e.missing)return k(`workboard.dependencyMissing`,{parent:e.title});let t=e.status?B(e.status):k(`workboard.unknownStatus`);return`${e.title} (${t})`}).join(`, `)})}var Dt,Ot,B,V,kt,H=e((()=>{A(),re(),P(),I(),Dt={created:`workboard.eventCreated`,edited:`workboard.eventEdited`,moved:`workboard.eventMoved`,linked:`workboard.eventLinked`,specified:`workboard.eventSpecified`,decomposed:`workboard.eventDecomposed`,claimed:`workboard.eventClaimed`,heartbeat:`workboard.eventHeartbeat`,execution_updated:`workboard.eventExecutionUpdated`,attempt_started:`workboard.eventAttemptStarted`,attempt_updated:`workboard.eventAttemptUpdated`,comment_added:`workboard.eventCommentAdded`,link_added:`workboard.eventLinkAdded`,proof_added:`workboard.eventProofAdded`,artifact_added:`workboard.eventArtifactAdded`,attachment_added:`workboard.eventAttachmentAdded`,diagnostic:`workboard.eventDiagnostic`,notification:`workboard.eventNotification`,dispatch:`workboard.eventDispatch`,orchestration:`workboard.eventOrchestration`,protocol_violation:`workboard.eventProtocolViolation`,archived:`workboard.eventArchived`,unarchived:`workboard.eventUnarchived`,stale:`workboard.eventStale`},Ot={running:[`workboard.lifecycleRunning`,`workboard.lifecycleRunningDetail`,`live`],succeeded:[`workboard.lifecycleDone`,`workboard.lifecycleDoneDetail`,`done`],failed:[`workboard.lifecycleNeedsReview`,`workboard.lifecycleNeedsReviewDetail`,`blocked`],stale:[`workboard.lifecycleStale`,`workboard.lifecycleStaleDetail`,`blocked`],idle:[`workboard.lifecycleLinked`,`workboard.lifecycleIdleDetail`,`idle`],missing:[`workboard.lifecycleMissing`,`workboard.lifecycleMissingDetail`,`blocked`],unlinked:[`workboard.lifecycleUnlinked`,`workboard.lifecycleUnlinkedDetail`,`idle`]},B=e=>k(`workboard.status.${e}`),V=e=>e.charAt(0).toUpperCase()+e.slice(1),kt=e=>e?.status===`queued`||e?.status===`running`}));function U(e){let t=e.options.find(t=>t.value===e.value),n=O`
    <wa-select
      class="workboard-select ${e.className??``}"
      label=${e.label}
      value=${e.value}
      ?disabled=${e.disabled}
      @change=${t=>{let n=t.currentTarget.value;n!==void 0&&e.options.some(e=>e.value===n&&!e.disabled)&&(e.onChange(n),e.requestUpdate?.())}}
    >
      ${t?.boardId?O`<span slot="start"
            >${N({id:t.boardId,name:t.label,icon:t.icon,color:t.color})}</span
          >`:E}
      ${e.options.map(t=>O`
          <wa-option
            class="workboard-select__option"
            value=${t.value}
            .label=${t.label}
            ?selected=${t.value===e.value}
            ?disabled=${t.disabled}
          >
            ${t.boardId?O`<span slot="start"
                  >${N({id:t.boardId,name:t.label,icon:t.icon,color:t.color})}</span
                >`:E}
            <span class="workboard-select__copy">
              <span class="workboard-select__label">${t.label}</span>
              ${t.description?O`<span class="workboard-select__description">${t.description}</span>`:E}
            </span>
          </wa-option>
        `)}
    </wa-select>
  `;return e.showLabel===!1?n:O`
    <div class="workboard-field">
      <span>${e.label}</span>
      ${n}
    </div>
  `}var At=e((()=>{D(),je(),Ve()}));function jt(e,t,n,r){if(n.classList.contains(`workboard-draft__title`))e.draftTitle=n.value;else if(n.classList.contains(`workboard-draft__notes`))e.draftNotes=n.value;else if(n.classList.contains(`workboard-draft__labels`))e.draftLabels=n.value;else if(n.classList.contains(`workboard-comments__input`))e.draftCommentBody=n.value;else return;let i=t.querySelector(`.workboard-draft__submit`);i&&(i.disabled=r||!e.draftTitle.trim());let a=t.querySelector(`.workboard-comments__submit`);a&&(a.disabled=r||!e.draftCommentBody.trim())}function W(e,t,n,r){return{id:e,draftKey:t,labels:n,priority:r}}function Mt(e,t){w(e);let n=t.scopeAgentId?.trim(),r=t.agentsList?.defaultId?.trim()??t.defaultAgentId?.trim(),i=n?n===r?``:n:e.agentFilter===`all`||e.agentFilter==="default"?``:e.agentFilter;i&&(t.agentsList?ut(t.agentsList,``).some(e=>e.id===i):n)&&(e.draftAgentId=i),e.draftOpen=!0}function Nt(e,t){e.draftOpen=!0,e.editingCardId=t.id,e.draftTitle=t.title,e.draftNotes=t.notes??``,e.draftStatus=t.status,e.draftPriority=t.priority,e.draftLabels=t.labels.join(`, `),e.draftAgentId=t.agentId??``,e.draftSessionKey=te(t)??``,e.draftTemplateId=t.metadata?.templateId??``,e.draftCommentBody=``}function Pt(e,t){let n=K.find(e=>e.id===t);n&&(e.draftTemplateId=n.id,e.draftTitle=k(`workboard.templateDraft.${n.draftKey}Title`),e.draftNotes=k(`workboard.templateDraft.${n.draftKey}Notes`),e.draftLabels=n.labels,e.draftPriority=n.priority)}function Ft(e){let t=l(e.host),n=ut(e.agentsList,t.draftAgentId),r=e.sessions.filter(vt),i=t.statuses.map(e=>({value:e,label:B(e)})),a=Ee.map(e=>({value:e,label:V(e)})),o=n.map(t=>({value:t.id,label:t.label,agent:t.id?e.agentsList?.agents.find(e=>e.id===t.id)??{id:t.id}:void 0,icon:t.id?void 0:j.bot})),s=[{value:``,label:k(`workboard.noLinkedSession`)},...r.map(e=>({value:e.key,label:e.displayName??e.label??e.key}))];if(t.draftSessionKey&&!s.some(e=>e.value===t.draftSessionKey)&&s.push({value:t.draftSessionKey,label:t.draftSessionKey}),!t.draftOpen)return E;let c=!!t.editingCardId,u=(t.editingCardId?t.cards.find(e=>e.id===t.editingCardId)??null:null)?.metadata?.comments??[],d=c&&t.busyCardIds.has(t.editingCardId??``),f=!R(e)||t.loading||t.dispatching||d,p=t.draftSaving,m=()=>p?!1:(w(t),!0);return O`
    <openclaw-modal-dialog
      label=${k(c?`workboard.editCard`:`workboard.newCard`)}
      description=${k(c?`workboard.editCardHelp`:`workboard.newCardHelp`)}
      style="--openclaw-modal-width: min(1120px, calc(100vw - 56px)); --openclaw-modal-max-height: calc(100dvh - 56px);"
      @modal-cancel=${t=>{if(!m()){t.preventDefault();return}e.onRequestUpdate?.()}}
    >
      <form
        id=${G}
        class="workboard-draft"
        aria-busy=${f?`true`:`false`}
        @input=${e=>{let n=e.target;(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement)&&jt(t,e.currentTarget,n,f)}}
        @submit=${t=>{t.preventDefault(),!f&&Re({host:e.host,client:e.client,requestUpdate:e.onRequestUpdate})}}
      >
        <div class="workboard-modal__header">
          <div>
            <h2 id=${It}>
              ${k(c?`workboard.editCard`:`workboard.newCard`)}
            </h2>
            <p id=${Lt}>
              ${k(c?`workboard.editCardHelp`:`workboard.newCardHelp`)}
            </p>
          </div>
          <openclaw-tooltip .content=${k(`common.cancel`)}>
            <button
              class="btn btn--icon workboard-card__icon"
              type="button"
              aria-label=${k(`common.cancel`)}
              ?disabled=${p}
              @click=${()=>{m()&&e.onRequestUpdate?.()}}
            >
              ${j.x}
            </button>
          </openclaw-tooltip>
        </div>
        <div class="workboard-draft__body">
          ${c?E:O`
                <div class="workboard-template-strip" aria-label=${k(`workboard.templatesLabel`)}>
                  ${K.map(n=>O`
                      <button
                        class="btn btn--xs ${t.draftTemplateId===n.id?`workboard-template-strip__button--active`:``}"
                        type="button"
                        ?disabled=${f}
                        @click=${()=>{Pt(t,n.id),e.onRequestUpdate?.()}}
                      >
                        ${k(`workboard.template.${n.id}`)}
                      </button>
                    `)}
                </div>
              `}
          <div class="workboard-draft__main">
            <label class="workboard-field">
              <span>${k(`workboard.fieldTitle`)}</span>
              <input
                class="input workboard-draft__title"
                autofocus
                placeholder=${k(`workboard.titlePlaceholder`)}
                ?disabled=${f}
                .value=${t.draftTitle}
              />
            </label>
            <label class="workboard-field">
              <span>${k(`workboard.fieldNotes`)}</span>
              <textarea
                class="input workboard-draft__notes"
                placeholder=${k(`workboard.notesPlaceholder`)}
                ?disabled=${f}
                .value=${t.draftNotes}
              ></textarea>
            </label>
          </div>
          <div class="workboard-draft__meta">
            ${U({value:t.draftStatus,options:i,label:k(`workboard.fieldStatus`),onChange:e=>{t.draftStatus=e},requestUpdate:e.onRequestUpdate,disabled:f})}
            ${U({value:t.draftPriority,options:a,label:k(`workboard.fieldPriority`),onChange:e=>{t.draftPriority=e},requestUpdate:e.onRequestUpdate,disabled:f})}
            <div class="workboard-field">
              <span>${k(`workboard.fieldAgent`)}</span>
              <openclaw-agent-select
                class="workboard-agent-select"
                .options=${o}
                .value=${t.draftAgentId}
                .accessibleLabel=${k(`workboard.fieldAgent`)}
                .disabled=${f}
                .onSelect=${n=>{t.draftAgentId=n,e.onRequestUpdate?.()}}
              ></openclaw-agent-select>
            </div>
            ${U({value:t.draftSessionKey,options:s,label:k(`workboard.fieldSession`),onChange:e=>{t.draftSessionKey=e},requestUpdate:e.onRequestUpdate,disabled:f})}
            <label class="workboard-field workboard-field--wide">
              <span>${k(`workboard.fieldLabels`)}</span>
              <input
                class="input workboard-draft__labels"
                placeholder=${k(`workboard.labelsPlaceholder`)}
                ?disabled=${f}
                .value=${t.draftLabels}
              />
            </label>
          </div>
          ${c?O`
                <section
                  class="workboard-field workboard-field--wide"
                  aria-labelledby="workboard-card-comments-title"
                >
                  <span id="workboard-card-comments-title">
                    ${k(`workboard.badgeComments`,{count:String(u.length)})}
                  </span>
                  ${u.length?O`
                        <ol>
                          ${u.map(e=>O`<li>${e.body}</li>`)}
                        </ol>
                      `:E}
                  <textarea
                    class="input workboard-comments__input"
                    aria-labelledby="workboard-card-comments-title"
                    maxlength="2000"
                    ?disabled=${f}
                    .value=${t.draftCommentBody}
                  ></textarea>
                  <div class="workboard-modal__actions">
                    <button
                      class="btn workboard-comments__submit"
                      type="button"
                      ?disabled=${f||!t.draftCommentBody.trim()}
                      @click=${()=>{ze({host:e.host,client:e.client,requestUpdate:e.onRequestUpdate})}}
                    >
                      ${j.plus} ${k(`common.create`)}
                    </button>
                  </div>
                </section>
              `:E}
        </div>
        <div class="workboard-modal__actions">
          <button
            class="btn primary workboard-draft__submit"
            ?disabled=${f||!t.draftTitle.trim()}
          >
            ${k(c?`common.save`:`common.create`)}
          </button>
          <button
            class="btn"
            type="button"
            ?disabled=${p}
            @click=${()=>{m()&&e.onRequestUpdate?.()}}
          >
            ${k(`common.cancel`)}
          </button>
        </div>
      </form>
    </openclaw-modal-dialog>
  `}var It,Lt,G,K,Rt=e((()=>{D(),M(),A(),S(),P(),I(),H(),At(),It=`workboard-card-modal-title`,Lt=`workboard-card-modal-description`,G=`workboard-card-modal`,K=[W(`bugfix`,`bugfix`,`fix, test`,`high`),W(`docs`,`docs`,`docs`,`normal`),W(`release`,`release`,`release`,`urgent`),W(`pr_review`,`prReview`,`review`,`normal`),W(`plugin`,`plugin`,`plugin`,`normal`)]}));function zt(e,t,n){let r=l(e.host);!T(t)||n===t.status||r.busyCardIds.has(t.id)||r.dispatching||!e.connected||!e.client||Ie({host:e.host,client:e.client,cardId:t.id,status:n,position:ne(r.cards,t,n),requestUpdate:e.onRequestUpdate})}function Bt(e,t,n,r={}){let i=l(e.host),a=i.statuses.includes(t.status)?i.statuses:[t.status,...i.statuses];return!T(t)||a.length<2?E:O`
    <label
      class="workboard-card__move ${r.wide?`workboard-card__move--wide`:``}"
      title=${k(`workboard.fieldStatus`)}
    >
      <span class="workboard-card__move-icon" aria-hidden="true">${j.cornerDownRight}</span>
      <select
        class="workboard-card__move-select"
        aria-keyshortcuts="ArrowLeft ArrowRight"
        aria-label=${`${k(`workboard.fieldStatus`)}: ${t.title}`}
        .value=${t.status}
        ?disabled=${n||!e.connected||!e.client}
        @change=${n=>{zt(e,t,n.currentTarget.value)}}
        @keydown=${n=>{if(n.key!==`ArrowLeft`&&n.key!==`ArrowRight`)return;if(i.busyCardIds.has(t.id)||i.dispatching||!e.connected||!e.client){n.preventDefault();return}let r=n.key===`ArrowRight`?1:-1,o=a[a.indexOf(t.status)+r];o&&(n.preventDefault(),zt(e,t,o))}}
      >
        ${a.map(e=>O`<option value=${e} ?selected=${e===t.status}>
            ${B(e)}
          </option>`)}
      </select>
    </label>
  `}function q(e){return O`
    <span class="workboard-card__action-slot">
      ${e===E?O`<span class="workboard-card__action-placeholder" aria-hidden="true"></span>`:e}
    </span>
  `}function Vt(e,t){let n=l(e.host),r=n.tasksByCardId.get(t.id),i=Pe(t,e.sessions),a=n.busyCardIds.has(t.id)||n.dispatching,o=Ct(t,r,n.missingTaskIds),s=R(e);return{state:n,task:r,busy:a,activeTask:o,live:o||wt(t)||i?.hasActiveRun===!0||i?.hasActiveRun!==!1&&i?.status===`running`,linkedSessionKey:t.sessionKey??t.execution?.sessionKey,writable:s,showStartControls:s&&Tt(n,e.sessions,t),archived:!!t.metadata?.archivedAt}}function J(e){let t=O`
    <button
      class=${e.iconOnly?`btn btn--icon workboard-card__icon ${e.className??``}`:`btn ${e.className??``}`}
      type="button"
      aria-label=${e.label}
      aria-haspopup=${e.ariaHaspopup??E}
      ?disabled=${e.disabled}
      @click=${e.onClick}
    >
      ${e.icon}${e.iconOnly?E:O`<span>${e.label}</span>`}
    </button>
  `;return e.iconOnly?O`<openclaw-tooltip .content=${e.label}>${t}</openclaw-tooltip>`:t}function Ht(e,t,n={}){let r=l(e.host);return J({label:k(`workboard.editCard`),icon:j.edit,iconOnly:n.iconOnly,ariaHaspopup:`dialog`,disabled:r.dispatching,onClick:()=>{Nt(r,t),e.onRequestUpdate?.()}})}function Ut(e,t,n,r,i={}){return J({label:k(r?`workboard.unarchiveCard`:`workboard.archiveCard`),icon:r?j.archiveRestore:j.archive,iconOnly:i.iconOnly,disabled:n,onClick:()=>{Fe({host:e.host,client:e.client,cardId:t.id,archived:!r,requestUpdate:e.onRequestUpdate})}})}function Wt(e,t,n={}){return t?J({label:k(`workboard.openSession`),icon:j.messageSquare,iconOnly:n.iconOnly,onClick:()=>e.onOpenSession(t)}):E}function Gt(e,t,n,r={}){return J({label:k(`workboard.stopSession`),icon:j.stop,iconOnly:r.iconOnly,disabled:n||!e.connected,onClick:()=>{qe({host:e.host,client:e.client,card:t,requestUpdate:e.onRequestUpdate})}})}function Kt(e,t,n,r={}){return J({label:k(`workboard.deleteCard`),icon:j.trash,iconOnly:r.iconOnly,className:`workboard-card__delete`,disabled:n,onClick:()=>{Le({host:e.host,client:e.client,cardId:t.id,requestUpdate:e.onRequestUpdate})}})}function qt(e){return O`
    <span class="workboard-engine-mark workboard-engine-mark--${e}" aria-hidden="true">
      ${e===`codex`?`OpenAI`:`Claude`}
    </span>
  `}function Y(e,t,n,r,i={}){let a=l(e.host),o=a.busyCardIds.has(t.id)||a.dispatching,s=yt(e,t,n),c=k(n===`codex`?`workboard.engineOpenAI`:`workboard.engineClaude`),u=o||!e.connected||!!s||!!t.metadata?.archivedAt,d=s||(n?k(r===`autonomous`?`workboard.runEngine`:`workboard.openEngine`,{engine:c}):k(`workboard.runDefaultAgent`)),f=O`
    <button
      class="btn btn--xs workboard-card__start workboard-card__start--${r} ${i.iconOnly?`workboard-card__start--icon`:``} ${n?``:`workboard-card__start--default`}"
      type="button"
      aria-label=${d}
      ?disabled=${u}
      @click=${async()=>{let i=await Xe({host:e.host,client:e.client,card:t,...n?{engine:n}:{},mode:r,requestUpdate:e.onRequestUpdate});i&&e.onOpenSession(i)}}
    >
      ${n?O`${qt(n)}${i.iconOnly?E:O`<span
                >${k(r===`autonomous`?`workboard.run`:`workboard.open`)}</span
              >`}`:O`${r===`autonomous`?j.play:j.penLine}${i.iconOnly?E:O`<span>${k(`workboard.start`)}</span>`}`}
    </button>
  `;return i.iconOnly?O`<openclaw-tooltip .content=${d}>${f}</openclaw-tooltip>`:f}function Jt(e,t){let n=e.canModelOverride!==!1;return O`
    <div class="workboard-card__execution-controls">
      ${Y(e,t,null,`autonomous`)}
      ${n?O`${Y(e,t,`codex`,`autonomous`)}
          ${Y(e,t,`claude`,`autonomous`)}`:E}
      ${Y(e,t,`codex`,`manual`)}
      ${Y(e,t,`claude`,`manual`)}
    </div>
  `}var Yt=e((()=>{D(),M(),A(),S(),P(),Rt(),H()}));function Xt(){return be(`openclaw-workboard-card-dashboard`,()=>r(()=>import(`./workboard-card-dashboard-CrbbWXEi.js`),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]),import.meta.url))}function Zt(e,t){e.detailCardId=t.id,e.detailCommentBody=``}function Qt(e){e.detailCardId=null,e.detailCommentBody=``}function $t(e){if(!e.detailCardId||e.draftOpen)return null;let t=e.cards.find(t=>t.id===e.detailCardId)??null;return!t||t.metadata?.archivedAt&&!e.showArchived?null:t}function en(e){return e.parents.length===0?E:O`
    <section class="workboard-detail__section">
      <h3>${k(`workboard.dependencies`)}</h3>
      <ul class="workboard-detail__list workboard-detail__dependencies">
        ${e.parents.map(e=>O`
            <li class=${e.done?`is-done`:`is-blocked`}>
              ${e.done?O`<span class="workboard-detail__dependency-spacer"></span>`:j.alertTriangle}
              <span>${e.title}</span>
              <span>
                ${e.missing?k(`workboard.dependencyStatusMissing`):e.status?B(e.status):k(`workboard.unknownStatus`)}
              </span>
            </li>
          `)}
      </ul>
    </section>
  `}function X(e,t){if(typeof t!=`string`&&typeof t!=`number`)return E;let n=String(t).trim();return n?O`
    <div class="workboard-detail__row">
      <span>${e}</span>
      <strong>${n}</strong>
    </div>
  `:E}function tn(e,t){let n=t.map(e=>e.trim()).filter(Boolean).slice(-6);return n.length===0?E:O`
    <section class="workboard-detail__section">
      <h3>${e}</h3>
      <ol class="workboard-detail__list">
        ${n.map(e=>O`<li>${e}</li>`)}
      </ol>
    </section>
  `}function nn(...e){return e.filter(Boolean).join(` - `)}function Z(e,...t){return e.map(e=>nn(...t.map(t=>e[t])))}function rn(e){let t=l(e.host),n=$t(t);if(!n)return E;let{task:r,busy:i,activeTask:o,live:s,linkedSessionKey:c,writable:u,showStartControls:d,archived:f}=Vt(e,n);c&&Xt().catch(()=>void 0);let p=Me(n,e.sessions,r),m=bt(p),h=r?xt(r,p):!1,g=n.metadata?.comments??[],_=n.metadata?.attempts??[],v=n.metadata?.links??[],y=n.metadata?.proof??[],b=n.metadata?.artifacts??[],x=n.metadata?.attachments??[],ee=n.metadata?.diagnostics??[],te=n.metadata?.workerLogs??[],S=n.metadata?.workerProtocol,C=n.metadata?.automation,ne=(n.events??[]).slice(-6).toReversed(),re=a(n,t.cards),ie=[[k(`workboard.fieldLabels`),n.labels],[k(`workboard.badgeAttempts`,{count:String(_.length)}),Z(_,`status`,`model`,`sessionKey`,`error`)],[k(`workboard.badgeLinks`,{count:String(v.length)}),Z(v,`type`,`title`,`targetCardId`,`url`)],[k(`workboard.detailProof`),Z(y,`status`,`label`,`command`,`url`,`note`)],[k(`workboard.badgeArtifacts`,{count:String(b.length)}),Z(b,`label`,`url`,`path`,`mimeType`)],[k(`workboard.badgeAttachments`,{count:String(x.length)}),Z(x,`fileName`,`mimeType`,`note`)],[k(`workboard.detailDiagnostics`),ee.map(e=>`${e.severity}: ${e.title}`)],[k(`workboard.detailWorkerLogs`),te.map(e=>`${e.level}: ${e.message}`)],[k(`workboard.detailWorkerProtocol`),S?[S.state,S.detail??``,S.updatedAt?k(`workboard.detailUpdatedValue`,{time:L(S.updatedAt)}):``]:[]],[k(`workboard.detailAutomation`),C?[C.tenant?k(`workboard.detailAutomationTenant`,{tenant:C.tenant}):``,C.boardId?k(`workboard.detailAutomationBoard`,{board:C.boardId}):``,C.skills?.length?k(`workboard.detailAutomationSkills`,{skills:C.skills.join(`, `)}):``,C.workspace?k(`workboard.detailAutomationWorkspace`,{workspace:[C.workspace.kind,C.workspace.path,C.workspace.branch].filter(Boolean).join(` `)}):``,C.dispatchCount?k(`workboard.badgeDispatches`,{count:String(C.dispatchCount)}):``,C.lastDispatchAt?k(`workboard.detailUpdatedValue`,{time:L(C.lastDispatchAt)}):``,C.summary?k(`workboard.detailAutomationSummary`,{summary:C.summary}):``]:[]],[k(`workboard.eventsLabel`),ne.map(e=>`${gt(e)} ${L(e.at)}`)]];return O`
    <openclaw-modal-dialog
      class="drawer"
      label=${n.title}
      description=${r&&h?z(r):p.session?.displayName??m.detail}
      style="--openclaw-modal-width: min(460px, 100vw); --openclaw-modal-max-height: 100dvh;"
      @modal-cancel=${()=>{Qt(t),e.onRequestUpdate?.()}}
    >
      <aside id=${Q} class="workboard-detail-drawer">
        <div class="workboard-detail">
          <header class="workboard-detail__header">
            <div>
              <span class="workboard-card__priority">${V(n.priority)}</span>
              <h2 id=${an}>
                <span class="workboard-sr-only">${k(`workboard.detailTitle`)}: </span>${n.title}
              </h2>
            </div>
            <openclaw-tooltip .content=${k(`common.cancel`)}>
              <button
                class="btn btn--icon workboard-card__icon"
                type="button"
                aria-label=${k(`common.cancel`)}
                @click=${()=>{Qt(t),e.onRequestUpdate?.()}}
              >
                ${j.x}
              </button>
            </openclaw-tooltip>
          </header>

          <section class="workboard-detail__section">
            <div class="workboard-card__lifecycle">
              <span class="workboard-lifecycle workboard-lifecycle--${m.tone}">
                ${m.label}
              </span>
              <span id=${on} class="workboard-card__lifecycle-detail">
                ${r&&h?z(r):p.session?.displayName??m.detail}
              </span>
            </div>
            <div class="workboard-detail__grid">
              ${X(k(`workboard.fieldStatus`),B(n.status))}
              ${X(k(`workboard.fieldAgent`),n.agentId??k(`workboard.defaultAgent`))}
              ${X(k(`workboard.detailTask`),r?.taskId??n.taskId)}
              ${X(k(`workboard.fieldSession`),c)}
              ${X(k(`workboard.detailRun`),n.runId??n.execution?.runId)}
              ${X(k(`workboard.detailUpdated`),L(n.updatedAt))}
            </div>
          </section>

          ${n.notes?O`
                <section class="workboard-detail__section">
                  <h3>${k(`workboard.fieldNotes`)}</h3>
                  <p>${n.notes}</p>
                </section>
              `:E}
          ${c?O`
                <openclaw-workboard-card-dashboard
                  .sessionKey=${c}
                  .client=${e.client}
                  .connected=${e.connected}
                  .canMutate=${e.canWrite!==!1}
                  .canGrant=${e.canGrant===!0}
                ></openclaw-workboard-card-dashboard>
              `:E}
          ${en(re)}
          ${ie.map(([e,t])=>tn(e,t))}

          <section class="workboard-detail__section">
            <h3>${k(`workboard.detailOperatorNotes`)}</h3>
            ${g.length?O`
                  <ol class="workboard-detail__list">
                    ${g.slice(-6).map(e=>O`<li>${e.body}</li>`)}
                  </ol>
                `:O`<p>${k(`workboard.detailNoNotes`)}</p>`}
            ${u?O`
                  <textarea
                    class="input workboard-detail__note"
                    maxlength="2000"
                    placeholder=${k(`workboard.detailNotePlaceholder`)}
                    .value=${t.detailCommentBody}
                    @input=${n=>{t.detailCommentBody=n.currentTarget.value,e.onRequestUpdate?.()}}
                  ></textarea>
                  <button
                    class="btn"
                    type="button"
                    ?disabled=${i||!t.detailCommentBody.trim()}
                    @click=${()=>ze({host:e.host,client:e.client,cardId:n.id,body:t.detailCommentBody,requestUpdate:e.onRequestUpdate})}
                  >
                    ${j.plus} ${k(`workboard.detailAddNote`)}
                  </button>
                `:E}
          </section>

          <div class="workboard-detail__actions">
            ${u&&!f?Ht(e,n):E}
            ${u?Ut(e,n,i,f):E}
            ${u&&!f?Bt(e,n,i,{wide:!0}):E}
            ${u&&(c?s:o)?Gt(e,n,i):E}
            ${Wt(e,c)}
            ${u?Kt(e,n,i):E}
            ${d?Jt(e,n):E}
          </div>
        </div>
      </aside>
    </openclaw-modal-dialog>
  `}var Q,an,on,sn=e((()=>{D(),ye(),M(),A(),P(),Yt(),H(),t(),Q=`workboard-card-detail-drawer`,an=`workboard-card-detail-title`,on=`workboard-card-detail-description`}));function cn(e){let t=(e.events??[]).toReversed().slice(0,4);return t.length===0?E:O`
    <ol class="workboard-events" aria-label=${k(`workboard.eventsLabel`)}>
      ${t.map(e=>O`
          <li>
            <span>${gt(e)}</span>
            <time>${pt(e.at)}</time>
          </li>
        `)}
    </ol>
  `}function ln(e,t){return O`<span>${k(e,{count:String(t)})}</span>`}function un(e,t){let n=e.metadata,r=[],i=n?.diagnostics?.toSorted((e,t)=>t.lastSeenAt-e.lastSeenAt)[0],a=e.status===`blocked`?n?.notifications?.at(-1)?.message??n?.workerProtocol?.detail??i?.detail:void 0;if(n?.templateId&&r.push(O`<span>${k(`workboard.template.${n.templateId}`)}</span>`),(t??e.taskId)&&r.push(O`<span>${k(`workboard.badgeTaskLinked`)}</span>`),n?.attempts?.length&&r.push(ln(`workboard.badgeAttempts`,n.attempts.length)),n?.failureCount&&r.push(O`
      <span class="workboard-card__badge--warning">
        ${j.alertTriangle}${k(`workboard.badgeFailures`,{count:String(n.failureCount)})}
      </span>
    `),n?.comments?.length&&r.push(ln(`workboard.badgeComments`,n.comments.length)),n?.proof?.length&&r.push(ln(`workboard.badgeProof`,n.proof.length)),n?.claim){r.push(O`<span>${k(`workboard.badgeClaimed`,{owner:n.claim.ownerId})}</span>`);let e=ht(n.claim.lastHeartbeatAt);e&&r.push(O`<span>${k(`workboard.badgeHeartbeat`,{age:e})}</span>`)}return i&&r.push(O`<span class="workboard-card__badge--warning" title=${i.detail}>
        ${j.alertTriangle}${h(i.title.trim(),64)}
      </span>`),a&&r.push(O`<span class="workboard-card__badge--warning" title=${a}>
        ${j.alertTriangle}${h(a.trim(),64)}
      </span>`),n?.stale&&r.push(O`<span class="workboard-card__badge--warning"
        >${j.alertTriangle}${k(`workboard.badgeStale`)}</span
      >`),r.length?O` <div class="workboard-card__badges">${r}</div> `:E}function dn(e){return e.target instanceof Element&&!!e.target.closest(`button, a, input, select, textarea`)}function fn(e,t){let n=it(t,e.agentsList);return O`<span class="workboard-agent-chip" title=${t.agentId?k(`workboard.agentLinked`,{agent:n}):k(`workboard.agentDefaultLinked`,{agent:n})}>${n}</span>`}function pn(e){if(e.parents.length===0)return E;let t=e.blockedParents.length;return O`
    <div class="workboard-dependencies" title=${Et(e)??k(`workboard.dependenciesReadyTitle`,{count:String(e.parents.length)})}>
      ${t>0?O`
            <span class="workboard-dependency workboard-dependency--blocked">
              ${j.alertTriangle}${k(`workboard.dependenciesBlocked`,{count:String(t)})}
            </span>
          `:O`
            <span class="workboard-dependency workboard-dependency--ready">
              ${k(`workboard.dependenciesReady`,{count:String(e.parents.length)})}
            </span>
          `}
    </div>
  `}function mn(e,t,n){let r=Me(e,t.sessions,n),i=bt(r),a=r.state===`stale`,o=n?xt(n,r):!1,s=n&&o?k(`workboard.taskStatus.${n.status}`):null;return O`
    <div class="workboard-card__lifecycle">
      <span class="workboard-lifecycle workboard-lifecycle--${i.tone}">
        ${s??(a||!e.execution?i.label:`${e.execution.engine?`${e.execution.engine} `:``}${e.execution.mode}`)}
      </span>
      <span class="workboard-card__lifecycle-detail">
        ${n&&o?z(n):a?i.detail:r.session?.displayName??r.session?.label??i.detail}
      </span>
    </div>
  `}function hn(e,t){let{state:n,task:r,busy:i,activeTask:o,live:s,linkedSessionKey:c,writable:l,showStartControls:u,archived:d}=Vt(e,t),f=n.syncingCardIds.has(t.id),p=n.activeHealthHighlight?et(t,n.activeHealthHighlight,e.sessions,r):!1,m=a(t,n.cards),h=u?Y(e,t,null,`autonomous`,{iconOnly:!0}):E,g=l&&!d?Ht(e,t,{iconOnly:!0}):E,_=l?Ut(e,t,i,d,{iconOnly:!0}):E,v=O`
    <openclaw-tooltip .content=${k(`workboard.viewDetails`)}>
      <button
        class="btn btn--icon workboard-card__icon"
        aria-label=${k(`workboard.viewDetails`)}
        aria-haspopup="dialog"
        aria-expanded=${n.detailCardId===t.id?`true`:`false`}
        aria-controls=${Q}
        @click=${()=>{Zt(n,t),e.onRequestUpdate?.()}}
      >
        ${j.panelRightOpen}
      </button>
    </openclaw-tooltip>
  `,y=Wt(e,c,{iconOnly:!0}),b=l&&(c?s:o)?Gt(e,t,i,{iconOnly:!0}):E,x=l&&!d?Bt(e,t,i):E,ee=l?Kt(e,t,i,{iconOnly:!0}):E;return O`
    <article
      class="workboard-card priority-${t.priority} ${i?`workboard-card--busy`:``} ${d?`workboard-card--archived`:``}
      ${n.draggedCardId===t.id?`workboard-card--dragging`:``} ${p?`workboard-card--health-highlight workboard-card--health-highlight-${n.activeHealthHighlight}`:``} workboard-card--openable"
      role="button"
      tabindex="0"
      title=${k(`workboard.viewDetails`)}
      aria-haspopup="dialog"
      aria-expanded=${n.detailCardId===t.id?`true`:`false`}
      aria-controls=${Q}
      draggable=${l&&!d&&!n.dispatching?`true`:`false`}
      @click=${r=>{dn(r)||(Zt(n,t),e.onRequestUpdate?.())}}
      @keydown=${r=>{dn(r)||r.key!==`Enter`&&r.key!==` `||(Zt(n,t),e.onRequestUpdate?.(),r.preventDefault())}}
      @dragstart=${r=>{if(!l||d||n.dispatching){r.preventDefault();return}n.draggedCardId=t.id,r.dataTransfer?.setData(`text/plain`,t.id),r.dataTransfer?.setDragImage(r.currentTarget,16,16),e.onRequestUpdate?.()}}
      @dragend=${()=>{n.draggedCardId=null,e.onRequestUpdate?.()}}
    >
      <div class="workboard-card__top">
        <div
          class="workboard-card__updated"
          title=${k(`workboard.detailUpdatedValue`,{time:L(t.updatedAt)})}
          aria-label=${k(`workboard.detailUpdatedValue`,{time:L(t.updatedAt)})}
        >
          <span class="workboard-card__updated-icon" aria-hidden="true">${j.clock}</span>
          <span>${L(t.updatedAt)}</span>
        </div>
        <div class="workboard-card__quick-actions">
          ${q(h)} ${q(g)}
          ${q(_)}
        </div>
      </div>
      <div class="workboard-card__chips">
        <span class="workboard-card__priority">${V(t.priority)}</span>
        ${fn(e,t)}
        ${d?O`<span class="workboard-card__archived">${k(`workboard.archived`)}</span>`:E}
        ${s?O`<span class="workboard-live">${k(`workboard.live`)}</span>`:E}
        ${f?O`<span class="workboard-live">${k(`common.saving`)}</span>`:E}
      </div>
      <h3>${t.title}</h3>
      ${t.notes?O`<p>${t.notes}</p>`:E} ${mn(t,e,r)}
      ${pn(m)}
      ${t.labels.length?O`<div class="workboard-labels">
            ${t.labels.map(e=>O`<span>${e}</span>`)}
          </div>`:E}
      ${un(t,r)}
      <div class="workboard-card__meta">
        <span>${c??k(`workboard.noLinkedSession`)}</span>
      </div>
      ${cn(t)}
      <div class="workboard-card__actions">
        ${q(v)}
        <div class="workboard-card__actions-primary">
          ${q(y)} ${q(b)}
          ${q(x)}
        </div>
        ${q(ee)}
      </div>
    </article>
  `}function gn(e,t,n){let r=l(e.host),i=R(e);return O`
    <section
      class="workboard-column workboard-column--${t} ${r.draggedCardId?`workboard-column--drop`:``}"
      @dragover=${e=>{i&&r.draggedCardId&&e.preventDefault()}}
      @drop=${n=>{if(n.preventDefault(),!i)return;let a=n.dataTransfer?.getData(`text/plain`)||r.draggedCardId,o=r.cards.find(e=>e.id===a);!o||!T(o)||Ie({host:e.host,client:e.client,cardId:o.id,status:t,position:ne(r.cards,o,t),requestUpdate:e.onRequestUpdate})}}
    >
      <div class="workboard-column__header">
        <h2>${B(t)}</h2>
        <span>${n.length}</span>
      </div>
      <div class="workboard-column__cards">
        ${n.length?n.map(t=>hn(e,t)):O`<div class="workboard-empty">${k(`workboard.emptyColumn`)}</div>`}
      </div>
    </section>
  `}var _n=e((()=>{D(),M(),A(),re(),S(),P(),I(),Yt(),sn(),H()}));function vn(e){let t=e.lastDispatchSummary;return t?O`
    <div class="callout">
      ${k(Object.values(t).reduce((e,t)=>e+t,0)===0?`workboard.dispatchSummaryEmpty`:`workboard.dispatchSummary`,{started:String(t.started),failures:String(t.failures),promoted:String(t.promoted),blocked:String(t.blocked),reclaimed:String(t.reclaimed),orchestrated:String(t.orchestrated)})}
    </div>
  `:E}function yn(e,t,n){let r=[[`running`,k(`workboard.healthRunning`),t.running],[`blocked`,k(`workboard.healthBlocked`),t.blocked],[`stale`,k(`workboard.healthStale`),t.stale],[`readyUnassigned`,k(`workboard.healthReadyUnassigned`),t.readyUnassigned],[`missingProof`,k(`workboard.healthMissingProof`),t.missingProof],[`failedAttempts`,k(`workboard.healthFailedAttempts`),t.failedAttempts]];return O`
    <div class="workboard-health" aria-label=${k(`workboard.healthLabel`)}>
      ${r.map(([t,r,i])=>O`
          <button
            class="workboard-health__item workboard-health__item--${t} ${e.activeHealthHighlight===t?`workboard-health__item--active`:``} ${i===0?`workboard-health__item--empty`:``}"
            type="button"
            aria-pressed=${e.activeHealthHighlight===t}
            aria-label=${`${i} ${r}`}
            @click=${()=>{e.activeHealthHighlight=e.activeHealthHighlight===t?null:t,n?.()}}
          >
            <strong>${i}</strong>${r}
          </button>
        `)}
    </div>
  `}function bn(e){return e.lastRefreshAt?O`<span
      class="workboard-refresh-status ${e.lastRefreshError?`workboard-refresh-status--error`:``}"
      title=${e.lastRefreshError?k(`workboard.refreshError`):``}
    >
      ${k(`workboard.lastRefreshed`,{time:mt(e.lastRefreshAt)})}
    </span>`:e.lastRefreshError?O`<span class="workboard-refresh-status workboard-refresh-status--error">
        ${k(`workboard.refreshError`)}
      </span>`:E}function xn(e){let t=l(e.host);if(e.pluginEnabled===null)return e.pluginEnablementError?O`
        <section class="workboard">
          <div class="callout danger" role="alert">${e.pluginEnablementError}</div>
          ${e.onReloadConfig?O`<button class="btn" type="button" @click=${e.onReloadConfig}>
                ${k(`lazyView.retry`)}
              </button>`:E}
        </section>
      `:Oe();if(!e.pluginEnabled)return O`
      <section class="workboard">
        <div class="callout">
          ${k(`workboard.disabledHelpStart`)}
          <code>${k(`workboard.enableConfigKey`)}</code>${k(`workboard.disabledHelpEnd`)}
        </div>
      </section>
    `;let n=lt(e.agentsList,t.cards);t.agentFilter=dt(n,t.agentFilter);let r=se(t.boards,t.cards),i=t.boardFilter,a=n=>n.filter(e=>t.showArchived||!e.metadata?.archivedAt).filter(e=>b(e,i)).filter(t=>ot(t,e.agentsList,e.scopeAgentId)).filter(n=>at(n,e.agentsList,t.agentFilter)).filter(e=>_t(e,{query:t.query,priority:t.priorityFilter})),o=n=>a(Ge({cards:t.cards,preset:n,tasksByCardId:t.tasksByCardId,sessions:e.sessions,defaultAgentId:e.agentsList?.defaultId})),s=o(t.viewPreset),c=$e({cards:s,tasksByCardId:t.tasksByCardId,sessions:e.sessions}),u=t.error??t.lifecycleTaskRefreshError,d=R(e),f=new Map;for(let e of t.statuses)f.set(e,[]);for(let e of s)f.get(e.status)?.push(e);let p=t.hideEmptyColumns||t.viewPreset!==`all`?t.statuses.filter(e=>(f.get(e)?.length??0)>0):t.statuses,m=t.viewPreset!==`all`||t.query.trim()!==``||t.priorityFilter!==`all`||t.agentFilter!==`all`||i!==`__all__`||!t.showArchived&&t.cards.some(e=>e.metadata?.archivedAt),h=Sn.map(e=>{let t=o(e.value).length;return{value:e.value,label:k(e.labelKey),description:e.value===`all`?void 0:k(`workboard.viewPresetCount`,{count:String(t)}),disabled:e.value!==`all`&&t===0}}),_=[{value:`all`,label:k(`workboard.allPriorities`)},...Ee.map(e=>({value:e,label:V(e)}))],v=n.map(t=>({value:t.id,label:t.label,description:t.description,agent:t.id===`all`||t.id==="default"?void 0:e.agentsList?.agents.find(e=>e.id===t.id)??{id:t.id},icon:t.id===`all`?j.users:t.id==="default"?j.bot:void 0})),y=t.draftOpen||!!$t(t);return O`
    <section class="workboard">
      <div class="workboard-main" ?inert=${y} aria-hidden=${y?`true`:E}>
        <div class="workboard-toolbar">
          <div class="workboard-toolbar__filters">
            <input
              class="input"
              type="search"
              title=${k(`workboard.searchPlaceholder`)}
              placeholder=${k(`workboard.searchPlaceholder`)}
              .value=${t.query}
              @input=${n=>{t.query=n.currentTarget.value,e.onRequestUpdate?.()}}
            />
            ${U({value:t.viewPreset,options:h,label:k(`workboard.viewPreset`),onChange:e=>{t.viewPreset=e},requestUpdate:e.onRequestUpdate,className:`workboard-select--toolbar`,showLabel:!1})}
            ${U({value:t.priorityFilter,options:_,label:k(`workboard.allPriorities`),onChange:e=>{t.priorityFilter=e},requestUpdate:e.onRequestUpdate,className:`workboard-select--toolbar`,showLabel:!1})}
            ${r.length>=3?U({value:i,options:r,label:k(`workboard.boardFilter`),onChange:n=>{t.boardFilter=n,e.onBoardFilterChange?.(n)},requestUpdate:e.onRequestUpdate,className:`workboard-select--toolbar workboard-select--toolbar-board`,showLabel:!1}):E}
            ${e.showAgentFilter===!1?E:O`
                  <openclaw-agent-select
                    class="workboard-agent-select workboard-agent-select--toolbar"
                    .options=${v}
                    .value=${t.agentFilter}
                    .accessibleLabel=${k(`workboard.agentFilter`)}
                    .onSelect=${r=>{let i=n.find(e=>e.id===r);i&&(t.agentFilter=i.id,e.onRequestUpdate?.())}}
                  ></openclaw-agent-select>
                `}
            <button
              class="btn workboard-archive-toggle ${t.showArchived?`active`:``}"
              type="button"
              aria-pressed=${t.showArchived}
              @click=${()=>{t.showArchived=!t.showArchived,e.onRequestUpdate?.()}}
            >
              ${t.showArchived?j.eye:j.eyeOff}
              ${t.showArchived?k(`workboard.hideArchivedShort`):k(`workboard.showArchivedShort`)}
            </button>
            <div class="workboard-layout-controls">
              <div class="workboard-layout-toggle" role="group" aria-label=${k(`workboard.layout`)}>
                ${Cn.map(([n,r,i])=>O`
                    <openclaw-tooltip .content=${k(r)}>
                      <button
                        class="btn btn--icon ${t.layout===n?`active`:``}"
                        type="button"
                        aria-label=${k(r)}
                        aria-pressed=${t.layout===n}
                        @click=${()=>{t.layout=n,e.onRequestUpdate?.()}}
                      >
                        ${i}
                      </button>
                    </openclaw-tooltip>
                  `)}
              </div>
              ${bn(t)}
            </div>
            <label class="workboard-toggle">
              <input
                type="checkbox"
                name="workboard-hide-empty-columns"
                .checked=${t.hideEmptyColumns}
                @change=${n=>{t.hideEmptyColumns=n.currentTarget.checked,e.onRequestUpdate?.()}}
              />
              <span>${k(`workboard.hideEmptyColumns`)}</span>
            </label>
          </div>
          <div class="workboard-toolbar__actions">
            <button
              class="btn"
              type="button"
              ?disabled=${t.loading||t.dispatching||g(t)}
              @click=${()=>Ke({host:e.host,client:e.client,requestUpdate:e.onRequestUpdate,source:`manual`,refreshDiagnostics:e.canWrite!==!1})}
            >
              ${t.loading?k(`common.refreshing`):k(`common.refresh`)}
            </button>
            ${d?O`
                  <button
                    class="btn"
                    type="button"
                    ?disabled=${t.dispatching||g(t)}
                    @click=${()=>Ne({host:e.host,client:e.client,requestUpdate:e.onRequestUpdate})}
                  >
                    ${j.zap} ${k(`workboard.dispatch`)}
                  </button>
                `:E}
            ${d?O`
                  <button
                    class="btn primary"
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded=${t.draftOpen?`true`:`false`}
                    aria-controls=${G}
                    ?disabled=${t.dispatching}
                    @click=${()=>{Mt(t,e),e.onRequestUpdate?.()}}
                  >
                    ${j.plus} ${k(`workboard.newCard`)}
                  </button>
                `:E}
          </div>
        </div>
        ${yn(t,c,e.onRequestUpdate)}
        ${u?O`<div class="callout danger">${u}</div>`:E}
        ${vn(t)}
        ${s.length===0&&m||p.length===0?O`
              <div class="workboard-empty-state" role="status">
                <strong>${k(`workboard.emptyFilteredTitle`)}</strong>
                <span>${k(`workboard.emptyFilteredHint`)}</span>
              </div>
            `:O`
              <div
                class="workboard-board workboard-board--${t.layout} ${p.length===1?`workboard-board--single-column`:``}"
              >
                ${p.map(t=>gn(e,t,f.get(t)??[]))}
              </div>
            `}
      </div>
      ${Ft(e)} ${rn(e)}
    </section>
  `}var Sn,Cn,wn=e((()=>{D(),Be(),M(),De(),Ae(),ke(),A(),ft(),P(),I(),le(),sn(),Rt(),_n(),H(),At(),Sn=[{value:`all`,labelKey:`workboard.viewAll`},{value:`default_agent`,labelKey:`workboard.viewDefaultAgent`},{value:`ready`,labelKey:`workboard.viewReady`},{value:`running`,labelKey:`workboard.viewRunning`},{value:`blocked`,labelKey:`workboard.viewBlocked`},{value:`review`,labelKey:`workboard.viewReview`},{value:`stale`,labelKey:`workboard.viewStale`},{value:`missing_proof`,labelKey:`workboard.viewMissingProof`},{value:`recently_done`,labelKey:`workboard.viewRecentlyDone`}],Cn=[[`compact`,`workboard.layoutCompact`,j.layoutCompact],[`comfortable`,`workboard.layoutComfortable`,j.layoutComfortable]]})),$;e((()=>{me(),D(),de(),xe(),Se(),we(),Te(),Ue(),je(),x(),ie(),ce(),S(),P(),d(),_(),I(),le(),wn(),n(),$=class extends v{constructor(...e){super(...e),this.requestPageUpdate=()=>this.context?.workboard.notify(),this.canonicalizedLocation=``,this.redirectedMissingBoardId=``,this.subscriptions=new o(this).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>{let t=()=>this.syncWorkboardAgentScope();return t(),e.subscribe(t)}).effect(()=>this.context?.runtimeConfig,e=>{let t=()=>{this.requestUpdate(),this.ensureInitialData()};return t(),e.subscribe(t)}).watch(()=>this.context?.sessions,(e,t)=>e.subscribe(t)).effect(()=>this.context?.workboard,e=>{this.syncWorkboardAgentScope();let t=e.subscribe(()=>{this.syncWorkboardBoardRoute(),this.requestUpdate()});return()=>{t(),c(e),ue(e)}}).effect(()=>this.context?.gateway,e=>{let t=t=>{this.context?.gateway===e&&(t.phase===`connected`&&t.client?this.ensureInitialData():this.context?.workboard&&(c(this.context.workboard),ue(this.context.workboard)),this.requestUpdate())};return t(e.snapshot),e.subscribe(t)}).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{let n=this.context?.workboard;n&&this.context?.gateway===e&&e.snapshot.phase===`connected`&&t.event===`plugin.workboard.changed`&&We(n,t.payload)})),this.handleVisibilityChange=()=>{document.visibilityState===`visible`&&this.context?.workboard&&Qe(this.context.workboard)}}connectedCallback(){super.connectedCallback(),this.ensureInitialData(),this.syncWorkboardBoardFilter(),this.syncCanonicalLocation(),this.syncWorkboardBoardRoute(),this.syncWorkboardRuntime(),document.addEventListener(`visibilitychange`,this.handleVisibilityChange)}updated(e){e.has(`routeData`)&&(this.syncWorkboardBoardFilter(),this.syncCanonicalLocation(),this.syncWorkboardBoardRoute()),this.syncWorkboardRuntime(),this.context?.workboard&&Qe(this.context.workboard)}disconnectedCallback(){document.removeEventListener(`visibilitychange`,this.handleVisibilityChange),this.subscriptions.clear(),super.disconnectedCallback()}ensureInitialData(){let e=this.context,t=e?.gateway.snapshot;!e||t?.phase!==`connected`||!t.client||(!e.runtimeConfig.state.configSnapshot&&!e.runtimeConfig.state.configLoading&&e.runtimeConfig.ensureLoaded(),!e.agents.state.agentsList&&!e.agents.state.agentsLoading&&e.agents.ensureList(),!e.sessions.state.result&&!e.sessions.state.loading&&e.sessions.refresh())}pluginEnabled(){let e=this.context?.runtimeConfig.state.configSnapshot;return e?oe(e):null}syncWorkboardRuntime(){let e=this.context,t=e?.gateway.snapshot,n=this.pluginEnabled();if(!e||t?.phase!==`connected`||!t.client||n!==!0){e&&(c(e.workboard),ue(e.workboard));return}let r=e.workboard.state,i=he(t),a=Ze({host:e.workboard,client:t.client,requestUpdate:this.requestPageUpdate});Je({host:e.workboard,client:t.client,requestUpdate:this.requestPageUpdate,force:a,refreshDiagnostics:i.canWrite}),r.dispatching||Ye({host:e.workboard,client:t.client,sessions:e.sessions.state.result?.sessions??[],canWrite:i.canWrite,requestUpdate:this.requestPageUpdate})}reloadConfig(){let e=this.context;e&&e.runtimeConfig.refresh({discardPendingChanges:!0})}syncWorkboardAgentScope(){let e=this.context;if(!e)return;let t=e.agentSelection.state.scopeId;if(this.observedAgentScopeId!==t){this.observedAgentScopeId=t;let n=e.workboard.state,r=e.agents.state.agentsList,i=e=>{let i=n.cards.find(t=>t.id===e);return!!(i&&ot(i,r,t))};n.agentFilter=`all`,n.detailCardId&&!i(n.detailCardId)&&(n.detailCardId=null,n.detailCommentBody=``),n.editingCardId&&!i(n.editingCardId)&&w(n),e.workboard.notify()}}syncWorkboardBoardFilter(){let e=this.context,t=this.routeData?.boardFilter;if(!e||!t||e.workboard.state.boardFilter===t)return;let n=e.workboard.state,r=e=>{let r=n.cards.find(t=>t.id===e);return!!(r&&b(r,t))};n.detailCardId&&!r(n.detailCardId)&&(n.detailCardId=null,n.detailCommentBody=``),n.editingCardId&&!r(n.editingCardId)&&w(n),n.boardFilter=t,e.workboard.notify()}syncCanonicalLocation(){let e=this.routeData?.canonicalLocation,t=this.context;if(!e){this.canonicalizedLocation=``;return}if(!t)return;let n=`${e.pathname}${e.search}${e.hash}`;this.canonicalizedLocation!==n&&(this.canonicalizedLocation=n,t.replace(`workboard`,e))}setWorkboardBoardFilter(e){let t=this.context;t&&t.replace(`workboard`,{pathname:e===`__all__`?Ce(`workboard`,t.basePath):ve(e,t.basePath),search:this.routeData?.search??``})}syncWorkboardBoardRoute(){let e=this.context,t=this.routeData?.boardFilter;if(!e||!t||t===`__all__`||!e.workboard.boardsReady){this.redirectedMissingBoardId=``;return}if(e.workboard.state.boards.some(e=>e.id===t)){this.redirectedMissingBoardId=``;return}this.redirectedMissingBoardId!==t&&(this.redirectedMissingBoardId=t,e.replace(`workboard`,{pathname:Ce(`workboard`,e.basePath),search:this.routeData?.search??``}))}selectedBoard(){let e=this.context,t=this.routeData?.boardFilter;if(!e||!t||t===`__all__`)return null;let n=e.workboard.state.boards.find(e=>e.id===t);return n||e.workboard.boardsReady?n??null:{id:t,total:0,active:0,archived:0,byStatus:{}}}render(){let e=this.context;if(!e)return E;let t=e.gateway.snapshot,n=e.runtimeConfig.state,r=he(t),i=this.pluginEnabled(),a=this.selectedBoard();return O`
      <section class="content-header content-header--page">
        <div>
          <div class="page-title workboard-page-title">
            ${a?N(a,`workboard-board-glyph--header`):E}
            <span
              >${a?m(a):ge(`workboard`)}</span
            >
          </div>
          ${a?O`<div class="page-subtitle">${ge(`workboard`)}</div>`:E}
        </div>
        ${He({agents:e.agents.state.agentsList?.agents??[],selection:e.agentSelection})}
      </section>
      ${xn({host:e.workboard,client:t.client,connected:t.phase===`connected`,canWrite:r.canWrite,canGrant:r.canGrantApprovals,canModelOverride:r.canAdmin,pluginEnabled:i,pluginEnablementError:!n.configSnapshot&&!n.configLoading?n.lastError:null,agentsList:e.agents.state.agentsList,defaultAgentId:t.assistantAgentId,sessions:e.sessions.state.result?.sessions??[],scopeAgentId:e.agentSelection.state.scopeId,showAgentFilter:e.agentSelection.state.scopeId===null,onOpenSession:t=>{let n=ae(e,t);e.navigate(n,{...ee({context:e,face:n,sessionKey:t,preferenceDerivedFace:!0}).options,hash:``})},onReloadConfig:()=>this.reloadConfig(),onBoardFilterChange:e=>this.setWorkboardBoardFilter(e),onRequestUpdate:this.requestPageUpdate})}
    `}},i([pe({context:_e,subscribe:!0})],$.prototype,`context`,void 0),i([fe({attribute:!1})],$.prototype,`routeData`,void 0),customElements.get(`openclaw-workboard-page`)||customElements.define(`openclaw-workboard-page`,$)}))();
//# sourceMappingURL=workboard-page-6E_5lwgV.js.map