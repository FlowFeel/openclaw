import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Bo as i,Ho as a,Kc as o,Ro as s,Vc as c,Wc as l}from"./control-ui-core-ChU36mQ7.js";import{K as u,Q as ee,W as d,Y as f,nt as p}from"./lit-runtime-D5xZwgO1.js";import{f as te,g as m,i as h,m as g,p as _,r as v}from"./control-ui-foundation-Dgui328h.js";import{Ut as y,Wt as b,_ as ne,jt as x,v as S}from"./control-ui-core-CmlLmVZa.js";import{o as C,t as w}from"./control-ui-core-M4uhXYSJ.js";import{pt as re,vt as T,yt as ie}from"./control-ui-core-pXkCFtVv.js";import{i as ae,n as E}from"./gateway-runtime-DWs8EJ0W.js";import{o as D,r as O}from"./provider-icon-CReH3zCo.js";import{n as k,t as A}from"./settings-workspace-BbyrBOFl.js";import{c as j,f as M,h as N,i as P,m as F,n as I,s as L,t as R,u as z}from"./settings-ui-Bq4yxauk.js";import{t as B}from"./agent-select-registration-FrLOwyPP.js";var V=e((()=>{}));function H(e,t){let n=e.details?.[t];return typeof n==`string`&&n.trim()?n:void 0}function U(e){let t=new Map;for(let n of e){let e=H(n,`collectionId`)??n.id,r=H(n,`collectionLabel`)??H(n,`sourceLabel`)??C(`memoryImport.unknownCollection`),i=t.get(e)??{id:e,label:r,items:[]};i.items.push(n),t.set(e,i)}return[...t.values()].toSorted((e,t)=>e.label.localeCompare(t.label))}function W(e){return e.providerId===`claude`?C(`memoryImport.claudeCode`):e.label}function G(e){return e.providerId===`codex`?C(`memoryImport.codexDescription`):e.providerId===`claude`?C(`memoryImport.claudeDescription`):C(`memoryImport.providerFallback`)}function K(e){return C(e===1?`memoryImport.fileCountOne`:`memoryImport.fileCount`,{count:String(e)})}function q(e){return C(e===1?`memoryImport.backfill.processedDayCountOne`:`memoryImport.backfill.processedDayCount`,{count:String(e)})}function J(e){let t=H(e,`relativePath`);if(t)return t;let n=e.target??e.source??e.id;return n.split(/[\\/]/u).at(-1)??n}function oe(e,t,n,r,i){let a=t.items.filter(e=>e.status===`planned`).map(e=>e.id),o=a.length>0&&a.every(e=>n.has(e)),s=t.items.filter(e=>e.status===`conflict`).length;return f`
    <div class="settings-row settings-row--stacked memory-import__collection">
      <div class="memory-import__collection-header">
        <label class="memory-import__collection-choice">
          <input
            type="checkbox"
            .checked=${o}
            ?disabled=${a.length===0||i}
            @change=${t=>r(e.providerId,a,t.currentTarget.checked)}
          />
          <span>
            <strong>${t.label}</strong>
            <small>${K(t.items.length)}</small>
          </span>
        </label>
        ${s>0?M({kind:`warn`,label:C(`memoryImport.alreadyImported`,{count:String(s)})}):u}
      </div>
      <details ?open=${t.items.length<=4}>
        <summary>${C(`memoryImport.reviewFiles`)}</summary>
        <ul class="memory-import__files">
          ${t.items.map(e=>f`
              <li>
                <span class="memory-import__file-icon" aria-hidden="true">${T.fileText}</span>
                <code title=${e.source??J(e)}>${J(e)}</code>
                <span class="memory-import__file-status memory-import__file-status--${e.status}">
                  ${e.status===`planned`?C(`memoryImport.ready`):e.status===`conflict`?C(`memoryImport.existing`):e.status}
                </span>
              </li>
            `)}
        </ul>
      </details>
    </div>
  `}function se(e){if(!e)return u;let t=e.summary.errors>0||e.summary.conflicts>0,n=e.items.filter(e=>e.status===`error`||e.status===`conflict`||H(e,`recoveryRecordPath`)!==void 0);return f`
    <div
      class="settings-row settings-row--stacked memory-import__result ${t?`memory-import__result--incomplete`:``}"
      role=${t?`alert`:`status`}
    >
      <span aria-hidden="true">${t?T.alertTriangle:T.check}</span>
      <div>
        <strong>
          ${C(t?`memoryImport.importIncomplete`:`memoryImport.importComplete`)}
        </strong>
        <span>
          ${t?C(`memoryImport.importedWithIssues`,{conflicts:String(e.summary.conflicts),errors:String(e.summary.errors),migrated:String(e.summary.migrated)}):C(`memoryImport.importedCount`,{count:String(e.summary.migrated)})}
        </span>
        ${e.reportDir?f`<span class="memory-import__result-path">
              ${C(`memoryImport.reportSaved`)}:
              <code title=${e.reportDir}>${e.reportDir}</code>
            </span>`:u}
        ${n.length>0?f`<ul class="memory-import__result-issues">
              ${n.map(e=>{let t=[{label:C(`memoryImport.recoveryFile`),path:H(e,`recoveryPath`)},{label:C(`memoryImport.recoveryJournal`),path:H(e,`recoveryRecordPath`)},{label:C(`memoryImport.itemBackup`),path:H(e,`backupPath`)}].filter(e=>!!e.path);return f`<li>
                  <strong>${J(e)}</strong>
                  <span>${e.reason??e.message??e.status}</span>
                  ${t.map(e=>f`<span class="memory-import__result-artifact">
                      <span>${e.label}</span>
                      <code title=${e.path}>${e.path}</code>
                    </span>`)}
                </li>`})}
            </ul>`:u}
      </div>
    </div>
  `}function ce(e,t){let n=new Set(e.selectedByProvider[t.providerId]??[]),r=U(t.items),i=e.applyingProviderId===t.providerId,a=e.backfillBusy===`apply`||e.backfillBusy===`rollback`||e.backfillRollbackPending,o=t.error?f`<div class="callout danger" role="alert">${t.error}</div>`:t.found?f`
          ${t.source?j({title:C(`memoryImport.source`),control:N(t.source,{mono:!0})}):u}
          ${t.target?j({title:C(`memoryImport.destination`),control:N(`${t.target}/memory/imports/`,{mono:!0})}):u}
          ${r.map(r=>oe(t,r,n,e.onToggleCollection,e.loading||e.applyingProviderId!==null||e.error!==null||a))}
          ${j({title:n.size>0?C(`memoryImport.selectedCount`,{count:String(n.size)}):C(`memoryImport.selectAtLeastOne`),control:f`
              <button
                class="btn primary"
                data-test-id="memory-import-provider-button"
                ?disabled=${n.size===0||e.applyingProviderId!==null||a||e.loading||e.error!==null}
                @click=${()=>e.onRequestImport(t.providerId)}
              >
                ${C(i?`common.importing`:`memoryImport.importSelected`)}
              </button>
            `})}
        `:P(t.message??C(`memoryImport.noMemoryFound`));return f`
    <div data-provider-id=${t.providerId}>
      ${z({title:f`<span class="memory-import__provider-title">
            ${D(t.providerId,{className:`memory-import__provider-icon`})}
            ${W(t)}
          </span>`,description:G(t),actions:M({kind:t.found?`ok`:`muted`,label:t.found?K(t.items.length):C(`memoryImport.notFound`)})},f`${o}${se(e.lastResults[t.providerId])}`)}
    </div>
  `}function le(e){let t=e.plan?.providers.find(t=>t.providerId===e.pendingProviderId);if(!t)return u;let n=e.selectedByProvider[t.providerId]?.length??0,r=C(`memoryImport.confirmTitle`,{provider:W(t)}),i=C(`memoryImport.confirmDescription`,{count:String(n)});return f`
    <openclaw-modal-dialog
      label=${r}
      description=${i}
      @modal-cancel=${()=>{e.applyingProviderId===null&&e.onCancelImport()}}
    >
      <div class="exec-approval-card memory-import__confirm">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">${r}</div>
            <div class="exec-approval-sub">${i}</div>
          </div>
        </div>
        <div class="callout ${e.replaceExisting?`warn`:``}">
          ${e.replaceExisting?C(`memoryImport.confirmReplace`):C(`memoryImport.confirmBackup`)}
        </div>
        <div class="exec-approval-actions">
          <button
            class="btn primary"
            data-test-id="memory-import-confirm"
            ?disabled=${e.applyingProviderId!==null}
            @click=${e.onConfirmImport}
          >
            ${C(`memoryImport.confirmImport`)}
          </button>
          <button
            class="btn"
            ?disabled=${e.applyingProviderId!==null}
            @click=${e.onCancelImport}
          >
            ${C(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}function ue(e){let t=e.loading||e.applyingProviderId!==null||e.backfillBusy!==null;return z({title:C(`memoryImport.title`),description:C(`memoryImport.subtitle`),actions:f`
        <button class="btn btn--sm" ?disabled=${t} @click=${e.onRefresh}>
          ${e.loading?C(`common.refreshing`):C(`common.refresh`)}
        </button>
      `},f`
      ${j({title:C(`memoryImport.agent`),control:f`
          <openclaw-agent-select
            class="agent-select--settings"
            name="memory-import-agent"
            .options=${e.agents.map(e=>({value:e.id,label:a(e),agent:e}))}
            .value=${e.selectedAgentId??``}
            .accessibleLabel=${C(`memoryImport.agent`)}
            .disabled=${t}
            .onSelect=${e.onSelectAgent}
          ></openclaw-agent-select>
        `})}
      ${F({title:C(`memoryImport.replaceExisting`),description:C(`memoryImport.replaceHint`),checked:e.replaceExisting,disabled:t,onChange:t=>e.onReplaceExisting(t)})}
    `)}function Y(e){return e.backfillRollbackPending?f`
    <openclaw-modal-dialog
      label=${C(`memoryImport.backfill.rollbackConfirmTitle`)}
      description=${C(`memoryImport.backfill.rollbackConfirmDescription`)}
      @modal-cancel=${e.onBackfillRollbackCancel}
    >
      <div class="exec-approval-card memory-import__confirm">
        <div class="exec-approval-header">
          <div>
            <div class="exec-approval-title">
              ${C(`memoryImport.backfill.rollbackConfirmTitle`)}
            </div>
            <div class="exec-approval-sub">
              ${C(`memoryImport.backfill.rollbackConfirmDescription`)}
            </div>
          </div>
        </div>
        <div class="callout warn">${C(`memoryImport.backfill.rollbackWarning`)}</div>
        <div class="exec-approval-actions">
          <button
            class="btn danger"
            data-test-id="memory-backfill-rollback-confirm"
            ?disabled=${e.backfillBusy!==null||e.applyingProviderId!==null}
            @click=${e.onBackfillRollbackConfirm}
          >
            ${C(`memoryImport.backfill.rollback`)}
          </button>
          <button
            class="btn"
            ?disabled=${e.backfillBusy!==null||e.applyingProviderId!==null}
            @click=${e.onBackfillRollbackCancel}
          >
            ${C(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `:u}function de(e){let t=e.backfillBusy!==null||e.applyingProviderId!==null,n=e.backfillPreview;return f`
    <div data-test-id="memory-session-backfill">
      ${z({title:C(`memoryImport.backfill.title`),description:C(`memoryImport.backfill.subtitle`)},f`
          ${e.backfillAvailable?f`
                ${j({title:C(`memoryImport.backfill.dateRange`),description:C(`memoryImport.backfill.dateRangeHint`),control:f`<div class="memory-import__backfill-dates">
                    <label>
                      <span>${C(`memoryImport.backfill.from`)}</span>
                      <input
                        class="input"
                        type="date"
                        .value=${e.backfillFrom}
                        ?disabled=${t}
                        @input=${t=>e.onBackfillFromChange(t.currentTarget.value)}
                      />
                    </label>
                    <label>
                      <span>${C(`memoryImport.backfill.to`)}</span>
                      <input
                        class="input"
                        type="date"
                        .value=${e.backfillTo}
                        ?disabled=${t}
                        @input=${t=>e.onBackfillToChange(t.currentTarget.value)}
                      />
                    </label>
                  </div>`})}
                ${j({title:C(`memoryImport.backfill.actions`),control:f`<div class="memory-import__backfill-actions">
                    <button
                      class="btn"
                      data-test-id="memory-backfill-preview"
                      ?disabled=${t}
                      @click=${e.onBackfillPreview}
                    >
                      ${e.backfillBusy===`preview`?C(`memoryImport.backfill.previewing`):C(`memoryImport.backfill.preview`)}
                    </button>
                    <button
                      class="btn primary"
                      data-test-id="memory-backfill-apply"
                      ?disabled=${t}
                      @click=${e.onBackfillApply}
                    >
                      ${e.backfillBusy===`apply`?C(`memoryImport.backfill.applying`):C(`memoryImport.backfill.apply`)}
                    </button>
                    <button
                      class="btn danger"
                      data-test-id="memory-backfill-rollback"
                      ?disabled=${t}
                      @click=${e.onBackfillRollbackRequest}
                    >
                      ${C(`memoryImport.backfill.rollback`)}
                    </button>
                  </div>`})}
                ${e.backfillError?f`<div class="callout danger" role="alert">${e.backfillError}</div>`:u}
                ${n?f`<div
                      class="settings-row settings-row--stacked memory-import__backfill-preview"
                    >
                      <strong>
                        ${C(`memoryImport.backfill.previewSummary`,{candidates:String(n.candidates),days:String(n.days)})}
                      </strong>
                      ${n.perDay.length>0?f`<ul>
                            ${n.perDay.map(e=>f`<li>
                                <div>
                                  <strong>${e.day}</strong>
                                  <span>
                                    ${C(`memoryImport.backfill.candidateCount`,{count:String(e.candidateCount)})}
                                  </span>
                                </div>
                                ${e.sample.length>0?f`<ul>
                                      ${e.sample.map(e=>f`<li>${e}</li>`)}
                                    </ul>`:u}
                              </li>`)}
                          </ul>`:f`<span>${C(`memoryImport.backfill.noCandidates`)}</span>`}
                      ${n.truncated?f`<div class="callout warn">
                            ${C(`memoryImport.backfill.previewTruncated`)}
                          </div>`:u}
                    </div>`:u}
                ${e.backfillProgress?f`<div
                      class="settings-row settings-row--stacked memory-import__backfill-progress"
                      role="status"
                    >
                      <strong>
                        ${e.backfillProgress.complete?C(`memoryImport.backfill.complete`,{count:String(e.backfillProgress.staged)}):C(`memoryImport.backfill.progress`,{days:String(e.backfillProgress.days),staged:String(e.backfillProgress.staged)})}
                      </strong>
                      <span>
                        ${C(`memoryImport.backfill.processedCandidates`,{count:String(e.backfillProgress.candidates)})}
                        · ${q(e.backfillProgress.days)}
                      </span>
                    </div>`:u}
                ${e.backfillRollbackResult?f`<div class="settings-row settings-row--stacked" role="status">
                      <strong>${C(`memoryImport.backfill.rollbackComplete`)}</strong>
                      <span>
                        ${C(`memoryImport.backfill.rollbackCounts`,{diary:String(e.backfillRollbackResult.removedDiaryEntries),staged:String(e.backfillRollbackResult.removedStagedEntries)})}
                      </span>
                    </div>`:u}
              `:P(C(`memoryImport.backfill.unavailable`))}
        `)}
      ${Y(e)}
    </div>
  `}function fe(e){return e.connected?f`
    <div class="memory-import" data-test-id="memory-import-page">
      ${L(f`
        ${ue(e)} ${de(e)}
        ${e.error?f`<div class="callout danger" role="alert">${e.error}</div>`:u}
        ${e.applyError?f`<div class="callout danger" role="alert">${e.applyError}</div>`:u}
        ${e.loading&&!e.plan?f`<div class="settings-group memory-import__loading" aria-busy="true">
              <div class="memory-import__skeleton"></div>
              <div class="memory-import__skeleton"></div>
            </div>`:(e.plan?.providers??[]).map(t=>ce(e,t))}
        ${le(e)}
      `)}
    </div>
  `:L(P(C(`memoryImport.disconnected`)))}var pe=e((()=>{d(),B(),re(),ie(),O(),R(),w(),s(),V()}));function X(e){return e instanceof Error&&e.message.trim()?e.message:typeof e==`string`?e:`request failed`}function me(){return typeof globalThis.crypto.randomUUID==`function`?globalThis.crypto.randomUUID():[...globalThis.crypto.getRandomValues(new Uint32Array(4))].map(e=>e.toString(16).padStart(8,`0`)).join(``)}var Z,Q,$;e((()=>{v(),te(),d(),ee(),x(),S(),R(),A(),w(),s(),E(),o(),c(),pe(),t(),Z=14,Q=`https://docs.openclaw.ai/install/migrating`,$=class extends l{constructor(...e){super(...e),this.replaceExisting=!1,this.selectedByProvider={},this.applyingProviderId=null,this.pendingImport=null,this.applyError=null,this.lastResults={},this.backfillFrom=``,this.backfillTo=``,this.backfillBusy=null,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillRollbackPending=!1,this.applyEpoch=0,this.backfillEpoch=0,this.lastPlanValue=null,this.subscriptions=new r(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agentSelection,(e,t)=>e.subscribe(t)),this.planTask=new _(this,{args:()=>{let e=this.context?.gateway.snapshot;return[this.isConnected&&e?.phase===`connected`?e.client??null:null,this.currentAgentId(),this.replaceExisting]},task:async([e,t,n],{signal:r})=>!e||!t?g:{client:e,agentId:t,overwrite:n,plan:await e.request(`migrations.memory.plan`,{agentId:t,overwrite:n},{signal:r})},onComplete:e=>{let t=this.lastPlanValue;t&&(t.client!==e.client||t.agentId!==e.agentId||t.overwrite!==e.overwrite)&&(this.resetMutationState({preserveAttemptedImport:t.client!==e.client}),(t.client!==e.client||t.agentId!==e.agentId)&&this.resetBackfillState()),this.lastPlanValue=e;let{plan:n}=e;this.selectedByProvider=Object.fromEntries(n.providers.map(e=>[e.providerId,e.items.filter(e=>e.status===`planned`).map(e=>e.id)]))}})}disconnectedCallback(){this.planTask.run([null,null,this.replaceExisting]),this.applyEpoch+=1,this.backfillEpoch+=1,this.subscriptions.clear(),super.disconnectedCallback()}updated(){let e=this.context.gateway.snapshot;this.context.agents.state.agentsList||this.context.agents.ensureList(),this.pendingImport&&(e.phase!==`connected`||e.client!==(this.planTask.value??this.lastPlanValue)?.client||this.currentAgentId()!==this.pendingImport.agentId)&&this.resetMutationState({preserveAttemptedImport:!0}),e.phase!==`connected`&&(this.backfillBusy!==null||this.backfillRollbackPending)&&this.resetBackfillState()}currentAgentId(){let e=this.context.agents.state.agentsList;if(!e)return null;let t=i(e.agents),n=this.context.agentSelection.state.selectedId;return n&&t.some(e=>e.id===n)?n:t.some(t=>t.id===e.defaultId)?e.defaultId:t[0]?.id??null}get plan(){let e=this.planTask.value??this.lastPlanValue,t=this.context.gateway.snapshot,n=this.currentAgentId();return e&&t.phase===`connected`&&e.client===t.client&&e.agentId===n&&e.overwrite===this.replaceExisting?e.plan:null}get loading(){return this.planTask.status===m.PENDING}get error(){return this.planTask.status===m.ERROR?X(this.planTask.error):null}resetMutationState(e={}){let t=e.preserveAttemptedImport&&this.pendingImport?.attempted?this.pendingImport:null;this.applyEpoch+=1,this.selectedByProvider={},this.applyingProviderId=null,this.pendingImport=t,this.applyError=null,this.lastResults={}}refresh(){return this.planTask.run()}selectAgent(e){this.context.agentSelection.set(e),this.resetMutationState(),this.resetBackfillState()}setReplaceExisting(e){this.replaceExisting=e,this.resetMutationState()}toggleCollection(e,t,n){let r=new Set(this.selectedByProvider[e]??[]);for(let e of t)n?r.add(e):r.delete(e);this.selectedByProvider={...this.selectedByProvider,[e]:[...r]}}requestImport(e){let t=this.currentAgentId(),n=this.plan?.providers.find(t=>t.providerId===e)?.planFingerprint,r=this.selectedByProvider[e]??[];this.loading||this.error!==null||this.applyingProviderId!==null||this.backfillBusy===`apply`||this.backfillBusy===`rollback`||this.backfillRollbackPending||!t||this.plan?.agentId!==t||!n||r.length===0||(this.applyError=null,this.pendingImport={providerId:e,agentId:t,planFingerprint:n,itemIds:[...r],overwrite:this.replaceExisting,idempotencyKey:me(),attempted:!1})}async confirmImport(){if(this.applyingProviderId!==null||this.backfillBusy===`apply`||this.backfillBusy===`rollback`||this.backfillRollbackPending)return;let e=this.pendingImport,t=this.context.gateway.snapshot;if(!e||!t.client||this.currentAgentId()!==e.agentId||this.plan?.agentId!==e.agentId)return;let n={...e,attempted:!0},r=t.client;this.pendingImport=n;let i=++this.applyEpoch;this.applyingProviderId=n.providerId,this.applyError=null;try{let e=await r.request(`migrations.memory.apply`,{idempotencyKey:n.idempotencyKey,agentId:n.agentId,providerId:n.providerId,planFingerprint:n.planFingerprint,itemIds:n.itemIds,overwrite:n.overwrite});if(i!==this.applyEpoch||this.context.gateway.snapshot.phase!==`connected`||this.context.gateway.snapshot.client!==r||this.currentAgentId()!==n.agentId)return;this.lastResults={...this.lastResults,[n.providerId]:e},this.pendingImport=null,await this.refresh()}catch(e){i===this.applyEpoch&&(this.applyError=X(e))}finally{i===this.applyEpoch&&(this.applyingProviderId=null)}}resetBackfillState(){this.backfillEpoch+=1,this.backfillFrom=``,this.backfillTo=``,this.backfillBusy=null,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillRollbackPending=!1}backfillRequest(e){return{agentId:e,...this.backfillFrom?{from:this.backfillFrom}:{},...this.backfillTo?{to:this.backfillTo}:{},limitDays:Z}}isCurrentBackfillRequest(e,t,n){return e===this.backfillEpoch&&this.context.gateway.snapshot.phase===`connected`&&this.context.gateway.snapshot.client===t&&this.currentAgentId()===n}async previewBackfill(){let e=this.context.gateway.snapshot.client,t=this.currentAgentId();if(!e||!t||this.backfillBusy!==null||this.applyingProviderId!==null)return;let n=++this.backfillEpoch;this.backfillBusy=`preview`,this.backfillError=null,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null;try{let r=await e.request(`memory.sessionBackfill.preview`,this.backfillRequest(t));this.isCurrentBackfillRequest(n,e,t)&&(this.backfillPreview=r)}catch(r){this.isCurrentBackfillRequest(n,e,t)&&(this.backfillError=X(r))}finally{this.isCurrentBackfillRequest(n,e,t)&&(this.backfillBusy=null)}}async applyBackfill(){let e=this.context.gateway.snapshot.client,t=this.currentAgentId();if(!e||!t||this.backfillBusy!==null||this.applyingProviderId!==null)return;let n=++this.backfillEpoch;this.backfillBusy=`apply`,this.backfillError=null,this.backfillPreview=null,this.backfillRollbackResult=null,this.backfillProgress={days:0,candidates:0,staged:0,complete:!1};let r=this.backfillProgress,i=new Set;try{for(;;){let a=await e.request(`memory.sessionBackfill.apply`,this.backfillRequest(t));if(!this.isCurrentBackfillRequest(n,e,t))return;if(a.candidates>0&&a.cursor?.advanced!==!0)throw Error(`Session backfill stopped because the server cursor did not advance.`);if(a.candidates===0&&a.cursor?.exhausted!==!0)throw Error(`Session backfill stopped because the server cursor was not exhausted.`);for(let e of a.perDay)i.add(e.day);if(r={days:i.size,candidates:r.candidates+a.candidates,staged:r.staged+a.staged,complete:a.candidates===0},this.backfillProgress=r,a.candidates===0)break}}catch(r){this.isCurrentBackfillRequest(n,e,t)&&(this.backfillError=X(r))}finally{this.isCurrentBackfillRequest(n,e,t)&&(this.backfillBusy=null)}}async confirmBackfillRollback(){let e=this.context.gateway.snapshot.client,t=this.currentAgentId();if(!e||!t||this.backfillBusy!==null||this.applyingProviderId!==null||!this.backfillRollbackPending)return;let n=++this.backfillEpoch;this.backfillBusy=`rollback`,this.backfillError=null;try{let r=await e.request(`memory.sessionBackfill.rollback`,{agentId:t});this.isCurrentBackfillRequest(n,e,t)&&(this.backfillRollbackResult=r,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackPending=!1)}catch(r){this.isCurrentBackfillRequest(n,e,t)&&(this.backfillError=X(r))}finally{this.isCurrentBackfillRequest(n,e,t)&&(this.backfillBusy=null)}}render(){let e=this.context.gateway.snapshot,t=this.context.agents.state.agentsList,n=this.currentAgentId(),r=fe({connected:e.phase===`connected`,agents:i(t?.agents??[]),selectedAgentId:n,plan:this.plan,loading:this.loading,error:this.error,applyError:this.applyError,replaceExisting:this.replaceExisting,selectedByProvider:this.selectedByProvider,applyingProviderId:this.applyingProviderId,pendingProviderId:this.pendingImport?.agentId===n?this.pendingImport.providerId:null,lastResults:this.lastResults,backfillAvailable:ae(e,`memory.sessionBackfill.preview`)!==!1,backfillFrom:this.backfillFrom,backfillTo:this.backfillTo,backfillBusy:this.backfillBusy,backfillError:this.backfillError,backfillPreview:this.backfillPreview,backfillProgress:this.backfillProgress,backfillRollbackResult:this.backfillRollbackResult,backfillRollbackPending:this.backfillRollbackPending,onSelectAgent:e=>this.selectAgent(e),onReplaceExisting:e=>this.setReplaceExisting(e),onRefresh:()=>void this.refresh(),onToggleCollection:(e,t,n)=>this.toggleCollection(e,t,n),onRequestImport:e=>this.requestImport(e),onConfirmImport:()=>void this.confirmImport(),onCancelImport:()=>{this.applyingProviderId===null&&(this.pendingImport=null,this.applyError=null)},onBackfillFromChange:e=>{this.backfillFrom=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillError=null},onBackfillToChange:e=>{this.backfillTo=e,this.backfillPreview=null,this.backfillProgress=null,this.backfillRollbackResult=null,this.backfillError=null},onBackfillPreview:()=>void this.previewBackfill(),onBackfillApply:()=>void this.applyBackfill(),onBackfillRollbackRequest:()=>{this.backfillBusy===null&&(this.backfillRollbackPending=!0,this.backfillError=null)},onBackfillRollbackConfirm:()=>void this.confirmBackfillRollback(),onBackfillRollbackCancel:()=>{this.backfillBusy===null&&(this.backfillRollbackPending=!1)}});return f`
      <section class="content-header">
        <div>
          <div class="page-title">${b(`memory-import`)}</div>
          <div class="page-subtitle">
            ${y(`memory-import`)}
            ${I(Q,C(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${k(r)}
    `}},n([h({context:ne,subscribe:!0})],$.prototype,`context`,void 0),n([p()],$.prototype,`replaceExisting`,void 0),n([p()],$.prototype,`selectedByProvider`,void 0),n([p()],$.prototype,`applyingProviderId`,void 0),n([p()],$.prototype,`pendingImport`,void 0),n([p()],$.prototype,`applyError`,void 0),n([p()],$.prototype,`lastResults`,void 0),n([p()],$.prototype,`backfillFrom`,void 0),n([p()],$.prototype,`backfillTo`,void 0),n([p()],$.prototype,`backfillBusy`,void 0),n([p()],$.prototype,`backfillError`,void 0),n([p()],$.prototype,`backfillPreview`,void 0),n([p()],$.prototype,`backfillProgress`,void 0),n([p()],$.prototype,`backfillRollbackResult`,void 0),n([p()],$.prototype,`backfillRollbackPending`,void 0),customElements.get(`openclaw-memory-import-page`)||customElements.define(`openclaw-memory-import-page`,$)}))();
//# sourceMappingURL=memory-import-page-DiUNim9S.js.map