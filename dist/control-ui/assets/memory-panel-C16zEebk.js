import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,n,r,t as i,y as a}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as o,Kc as s,Vc as c,Wc as ee,cr as l,er as te,is as ne,lr as u,rr as re,rs as d}from"./control-ui-core-CrKLOOVi.js";import{K as f,Q as ie,W as p,Y as m,g as ae,it as oe,m as se,nt as h}from"./lit-runtime-D5xZwgO1.js";import{i as ce,r as le}from"./control-ui-foundation-Dgui328h.js";import{_ as ue,v as de}from"./control-ui-core-CVcZBevq.js";import{At as fe,Ct as pe,Dt as g,Wt as me}from"./control-ui-foundation-DkfOBVsU.js";import{o as _,t as v}from"./control-ui-core-DkYXaYTI.js";import{pt as y}from"./control-ui-core-CTll8UdE.js";import{m as he,p as ge}from"./control-ui-shared-DipCL0pR.js";import{i as _e,n as ve}from"./gateway-runtime-DWs8EJ0W.js";import{n as ye}from"./lobster-pet-contract-DDBWGFBQ.js";import{n as be,t as xe}from"./markdown-CTmZm9Ts.js";import{_ as Se,i as Ce,s as we,t as Te}from"./lobster-pet-CEnpZasS.js";import{r as Ee,t as De}from"./settings-ui-D9oWnjak.js";import{n as b,t as Oe}from"./hub-tabs-DByyIl3h.js";import{n as ke,t as Ae}from"./confirm-dialog-D0UQnP5_.js";function x(e={}){return{client:e.client??null,connected:e.connected??!1,hello:e.hello??null,configSnapshot:e.configSnapshot??null,applySessionKey:e.applySessionKey??`main`,selectedAgentId:e.selectedAgentId??null,resourceRequests:{},dreamingStatusLoading:!1,dreamingStatusError:null,dreamingStatus:null,dreamingModeSaving:!1,dreamDiaryLoading:!1,dreamDiaryActionLoading:!1,dreamDiaryActionMessage:null,dreamDiaryActionArchivePath:null,dreamDiaryError:null,dreamDiaryPath:null,dreamDiaryContent:null,wikiImportInsightsLoading:!1,wikiImportInsightsError:null,wikiImportInsights:null,wikiOverviewLoading:!1,wikiOverviewError:null,wikiOverview:null,lastError:null}}function je(e){return u(e.configSnapshot,Ye,{enabledByDefault:!1})}function Me(e,t){let n=_e(e,t);return n===null?je(e):n}function Ne(e,t){switch(e){case`doctor.memory.dedupeDreamDiary`:{let e=typeof t?.dedupedEntries==`number`?t.dedupedEntries:typeof t?.removedEntries==`number`?t.removedEntries:0,n=typeof t?.keptEntries==`number`?t.keptEntries:void 0;return n===void 0?_(e===1?`dreaming.actions.dedupeRemovedOne`:`dreaming.actions.dedupeRemovedMany`,{removed:String(e)}):_(e===1?`dreaming.actions.dedupeRemovedOneAndKept`:`dreaming.actions.dedupeRemovedManyAndKept`,{removed:String(e),kept:String(n)})}case`doctor.memory.repairDreamingArtifacts`:{let e=[],n=S(t?.archiveDir);return t?.archivedSessionCorpus===!0&&e.push(_(`dreaming.actions.repairArchivedThreadCorpus`)),t?.archivedSessionIngestion===!0&&e.push(_(`dreaming.actions.repairArchivedIngestionState`)),t?.archivedDreamsDiary===!0&&e.push(_(`dreaming.actions.repairArchivedDreamDiary`)),e.length===0?_(`dreaming.actions.repairNoChanges`):n?_(`dreaming.actions.repairCompleteWithArchive`,{actions:e.join(`, `),archiveDir:n}):_(`dreaming.actions.repairComplete`,{actions:e.join(`, `)})}case`doctor.memory.backfillDreamDiary`:return _(`dreaming.actions.backfillComplete`,{count:String(typeof t?.written==`number`?t.written:0)});case`doctor.memory.resetDreamDiary`:return _(`dreaming.actions.resetDiaryComplete`,{count:String(typeof t?.removedEntries==`number`?t.removedEntries:0)});case`doctor.memory.resetGroundedShortTerm`:return _(`dreaming.actions.clearReplayedComplete`,{count:String(typeof t?.removedShortTermEntries==`number`?t.removedShortTermEntries:0)})}return _(`dreaming.actions.complete`)}function S(e){if(typeof e!=`string`)return;let t=e.trim();return t.length>0?t:void 0}function C(e){return S(e.selectedAgentId)??null}function w(e){return e?{agentId:e}:{}}function Pe(e){return w(C(e))}function T(e){let t=r(`memory`,g(g(e?.plugins)?.slots)?.memory),n=t.kind===`off`?i(`memory`):t.pluginId,a=g(g(g(g(g(e?.plugins)?.entries)?.[n])?.config)?.dreaming),o=typeof a?.enabled==`boolean`;return{pluginId:n,enabled:t.kind!==`off`&&a?.enabled!==!1,overridden:o,engineOff:t.kind===`off`}}async function E(e,t,n=A[t]){let r=e.client;if(!r||!e.connected)return;let i=C(e),a=`${t}Loading`,o=`${t}Error`,s=`${t}AgentId`;if(e[s]!==i&&n.clear(e),(t===`wikiImportInsights`||t===`wikiOverview`)&&!Me(e,n.method)){delete e.resourceRequests[t],e[a]=!1,e[o]=null,n.clear(e);return}if(e.resourceRequests[t]?.agentId===i&&e[a])return;let c={agentId:i};e.resourceRequests[t]=c,e[a]=!0,e[o]=null;try{let a=await r.request(n.method,w(i));if(e.resourceRequests[t]!==c||C(e)!==i)return;n.apply(e,a),e[s]=i}catch(n){e.resourceRequests[t]===c&&C(e)===i&&(e[o]=String(n))}finally{e.resourceRequests[t]===c&&(delete e.resourceRequests[t],e[a]=!1)}}async function D(e){await E(e,`dreamingStatus`)}async function O(e){await E(e,`dreamDiary`)}async function Fe(e){await E(e,`wikiImportInsights`)}async function Ie(e){await E(e,`wikiOverview`)}async function k(e,t,n){if(!e.client||!e.connected||e.dreamDiaryActionLoading)return!1;e.dreamDiaryActionLoading=!0,e.dreamingStatusError=null,e.dreamDiaryError=null,e.dreamDiaryActionMessage=null,e.dreamDiaryActionArchivePath=null;try{let r=await e.client.request(t,Pe(e));return n?.reloadDiary!==!1&&await O(e),await D(e),e.dreamDiaryActionArchivePath=t===`doctor.memory.repairDreamingArtifacts`?S(r?.archiveDir)??null:null,e.dreamDiaryActionMessage={kind:`success`,text:Ne(t,r)},!0}catch(t){let n=String(t);return e.dreamingStatusError=n,e.lastError=n,e.dreamDiaryActionArchivePath=null,e.dreamDiaryActionMessage={kind:`error`,text:n},!1}finally{e.dreamDiaryActionLoading=!1}}async function Le(e){return k(e,`doctor.memory.backfillDreamDiary`)}async function Re(e){return k(e,`doctor.memory.resetDreamDiary`)}async function ze(e){return k(e,`doctor.memory.resetGroundedShortTerm`,{reloadDiary:!1})}async function Be(e){return k(e,`doctor.memory.repairDreamingArtifacts`,{reloadDiary:!1})}async function Ve(e){let t=e.dreamDiaryActionArchivePath;return t?await ge(t)?(e.dreamDiaryActionMessage={kind:`success`,text:_(`dreaming.actions.archivePathCopied`)},!0):(e.dreamDiaryActionMessage={kind:`error`,text:_(`dreaming.actions.archivePathCopyFailed`)},!1):!1}async function He(e){return k(e,`doctor.memory.dedupeDreamDiary`)}async function Ue(e,t,n){if(e.dreamingModeSaving)return!1;e.dreamingModeSaving=!0,e.dreamingStatusError=null;try{let r=await t.patch({raw:n,note:`Dreaming settings updated from the Dreaming tab.`});return r||(e.dreamingStatusError=t.state.lastError??e.lastError??_(`dreaming.actions.updateFailed`)),r}finally{e.dreamingModeSaving=!1}}function We(e){let t=g(e),n=Array.isArray(t?.children)?t.children:[];for(let e of n)if(S(g(e)?.key)===`dreaming`)return!0;return!1}function Ge(e){return g(g(e)?.schema)?.additionalProperties===!1}async function Ke(e,t){if(!e.state.client||!e.state.connected)return`unknown`;try{let n=await e.lookupSchemaPath(`plugins.entries.${t}.config`);return We(n)?`supported`:Ge(n)?`unsupported`:`supported`}catch{return`unknown`}}async function qe(e,t,n){if(await Ke(t,n)!==`unsupported`)return!0;let r=_(`dreaming.actions.unsupportedPlugin`,{pluginId:n});return e.dreamingStatusError=r,e.lastError=r,!1}async function Je(e,t,n){if(e.dreamingModeSaving)return!1;if(!t.state.configSnapshot?.hash)return e.dreamingStatusError=_(`dreaming.actions.configHashMissing`),!1;let{pluginId:r}=T(g(t.state.configSnapshot?.config)??null);if(!await qe(e,t,r))return!1;let i=await Ue(e,t,{plugins:{entries:{[r]:{config:{dreaming:{enabled:n}}}}}});return i&&e.dreamingStatus&&(e.dreamingStatus={...e.dreamingStatus,enabled:n}),i}var Ye,A,j=e((()=>{fe(),n(),v(),he(),ve(),l(),Ye=`memory-wiki`,A={dreamingStatus:{method:`doctor.memory.status`,clear:e=>{e.dreamingStatus=null},apply:(e,t)=>{e.dreamingStatus=t.dreaming??null}},dreamDiary:{method:`doctor.memory.dreamDiary`,clear:e=>{e.dreamDiaryPath=null,e.dreamDiaryContent=null},apply:(e,t)=>{e.dreamDiaryPath=t.path,e.dreamDiaryContent=t.found?t.content??``:null}},wikiImportInsights:{method:`wiki.importInsights`,clear:e=>{e.wikiImportInsights=null},apply:(e,t)=>{e.wikiImportInsights=t}},wikiOverview:{method:`wiki.overview`,clear:e=>{e.wikiOverview=null},apply:(e,t)=>{e.wikiOverview=t}}}}));function Xe(e){if(!e.open)return f;let t=e.enabling?_(`dreaming.toggleConfirmation.enableTitle`):_(`dreaming.toggleConfirmation.disableTitle`),n=_(`dreaming.toggleConfirmation.subtitle`),r=e.enabling?_(`dreaming.toggleConfirmation.enableDetail`):_(`dreaming.toggleConfirmation.disableDetail`),i=e.enabling?_(`dreaming.toggleConfirmation.enableConfirm`):_(`dreaming.toggleConfirmation.disableConfirm`);return m`
    <openclaw-modal-dialog label=${t} description=${n} @modal-cancel=${()=>{e.loading||e.onCancel()}}>
      <div class="exec-approval-card">
        <div class="exec-approval-header">
          <div>
            <div id=${`dreaming-toggle-confirmation-title`} class="exec-approval-title">${t}</div>
            <div id=${`dreaming-toggle-confirmation-description`} class="exec-approval-sub">${n}</div>
          </div>
        </div>
        <div class="callout ${e.enabling?`info`:`warn`}" style="margin-top: 12px;">
          ${r}
        </div>
        ${e.hasError?m`<div class="exec-approval-error">${_(`dreaming.toggleConfirmation.failed`)}</div>`:f}
        <div class="exec-approval-actions">
          <button
            class="btn ${e.enabling?`primary`:`danger`}"
            ?disabled=${e.loading}
            @click=${e.onConfirm}
          >
            ${e.loading?_(`dreaming.toggleConfirmation.saving`):i}
          </button>
          <button class="btn" ?disabled=${e.loading} @click=${e.onCancel}>
            ${_(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}var Ze=e((()=>{p(),v(),y()})),Qe=e((()=>{}));function $e(e){let t=e,n=Et.exec(e),r=Dt.exec(e);n&&r&&r.index>n.index&&(t=e.slice(n.index+n[0].length,r.index));let i=[],a=t.split(/\n---\n/).filter(e=>e.trim().length>0);for(let e of a){let t=e.trim().split(`
`),n=``,r=[];for(let e of t){let t=e.trim();if(!n&&t.startsWith(`*`)&&t.endsWith(`*`)&&t.length>2){n=t.slice(1,-1);continue}t.startsWith(`#`)||t.startsWith(`<!--`)||t.length>0&&r.push(t)}r.length>0&&i.push({date:n,body:r.join(`
`)})}return i}function et(e){let t=Date.parse(e);return Number.isFinite(t)?t:null}function tt(e){let t=et(e);if(t===null)return e;let n=new Date(t);return`${n.getMonth()+1}/${n.getDate()}`}function nt(){return{dreamIndex:Math.floor(Math.random()*X.length),dreamLastSwap:0,activeSubTab:`scene`,activeDiarySubTab:`dreams`,advancedWaitingSort:`recent`,expandedInsightCards:new Set,expandedWikiCards:new Set,diaryPage:0,wikiPreviewRequestId:0,wikiPreviewOpen:!1,wikiPreviewLoading:!1,wikiPreviewTitle:``,wikiPreviewPath:``,wikiPreviewUpdatedAt:null,wikiPreviewContent:``,wikiPreviewTotalLines:null,wikiPreviewTruncated:!1,wikiPreviewError:null}}function rt(e,t,n){e.diaryPage=Math.max(0,Math.min(t,Math.max(0,n-1)))}function it(e){let t=Date.now();return t-e.dreamLastSwap>Q&&(e.dreamLastSwap=t,e.dreamIndex=(e.dreamIndex+1)%X.length),_(X[e.dreamIndex]??X[0])}function at(e){let t=Ce(ye(e));return m`
    <div class="dreams__lobster" style=${`--lob-shell:${t.palette.shell};--lob-claw:${t.palette.claw}`}>${we(t,{sleeping:!0})}</div>
  `}function ot(e){let t=e.viewState,n=!e.active,r=e.dreamingOf??it(t);return m`
    <div class="dreams-page">
      <!-- ── Sub-tab bar ── -->
      <div class="dreams__topbar">
        ${b({id:`dreams`,active:t.activeSubTab,tabs:[{value:`scene`,label:_(`dreaming.tabs.scene`)},{value:`diary`,label:_(`dreaming.tabs.diary`)},{value:`advanced`,label:_(`dreaming.tabs.advanced`)}],ariaLabel:_(`memoryPage.tabs.dreams`),panelId:`dreams-panel`,variant:`sub`,onSelect:n=>{t.activeSubTab=n,e.onViewStateChange()}})}
      </div>

      <div
        id="dreams-panel"
        class="dreams__panel"
        role="tabpanel"
        aria-labelledby=${`dreams-tab-${t.activeSubTab}`}
      >
        ${t.activeSubTab===`scene`?lt(e,n,r):t.activeSubTab===`diary`?Tt(e):yt(e)}
      </div>
    </div>
  `}function st(e){return e.split(`
`).map(e=>e.trim()).filter(e=>e.length>0&&e!==`What Happened`&&e!==`Reflections`&&e!==`Candidates`&&e!==`Possible Lasting Updates`).map(e=>e.replace(/\s*\[memory\/[^\]]+\]/g,``)).map(e=>e.replace(/^(?:\d+\.\s+|-\s+(?:\[[^\]]+\]\s+)?(?:[a-z_]+:\s+)?)/i,``).replace(/^(?:likely_durable|likely_situational|unclear):\s+/i,``).trim()).filter(e=>e.length>0)}function ct(e){return e?new Date(e).toLocaleTimeString([],{hour:`numeric`,minute:`2-digit`}):`—`}function lt(e,t,n){return m`
    <section class="dreams ${t?`dreams--idle`:``}">
      ${Ot.map(e=>m`
          <div
            class="dreams__star"
            style="
              top: ${e.top}%;
              left: ${e.left}%;
              width: ${e.size}px;
              height: ${e.size}px;
              background: ${e.hue===`accent`?`var(--accent-muted)`:`var(--text)`};
              animation-delay: ${e.delay}s;
            "
          ></div>
        `)}

      <div class="dreams__moon"></div>

      ${e.active?m`
            <div class="dreams__bubble">
              <span class="dreams__bubble-text">${n}</span>
            </div>
            <div
              class="dreams__bubble-dot"
              style="top: calc(50% - 160px); left: calc(50% - 120px); width: 12px; height: 12px; animation-delay: 0.2s;"
            ></div>
            <div
              class="dreams__bubble-dot"
              style="top: calc(50% - 120px); left: calc(50% - 90px); width: 8px; height: 8px; animation-delay: 0.4s;"
            ></div>
          `:f}

      <div class="dreams__glow"></div>
      ${at(e.selectedAgentId)}
      <span class="dreams__z">z</span>
      <span class="dreams__z">z</span>
      <span class="dreams__z">Z</span>

      <div class="dreams__status">
        <span class="dreams__status-label"
          >${e.active?_(`dreaming.status.active`):_(`dreaming.status.idle`)}</span
        >
        <div class="dreams__status-detail">
          <div class="dreams__status-dot"></div>
          <span>
            ${e.promotedCount} ${_(`dreaming.status.promotedSuffix`)}
            ${e.nextCycle?m`· ${_(`dreaming.status.nextSweepPrefix`)} ${e.nextCycle}`:f}
            ${e.timezone?m`· ${e.timezone}`:f}
          </span>
        </div>
      </div>

      <!-- Sleep phases -->
      <div class="dreams__phases">
        ${Object.keys(Z).map(t=>{let n=e.phases?.[t],r=n!==void 0,i=n?.enabled===!0,a=ct(n?.nextRunAtMs),o=_(Z[t]),s=r?i?a:_(`dreaming.phase.off`):`—`;return m`
              <div class="dreams__phase ${r&&!i?`dreams__phase--off`:``}">
                <div class="dreams__phase-dot ${i?`dreams__phase-dot--on`:``}"></div>
                <span class="dreams__phase-name">${o}</span>
                <span class="dreams__phase-next">${s}</span>
              </div>
            `})}
      </div>

      ${e.statusError?m`<div class="dreams__controls-error">${e.statusError}</div>`:f}
    </section>
  `}function ut(e,t,n){return t===n?`${e}:${t}`:`${e}:${t}-${n}`}function M(e){let t=Date.parse(e);return Number.isFinite(t)?new Date(t).toLocaleString([],{month:`short`,day:`numeric`,hour:`numeric`,minute:`2-digit`}):e}function N(e){return e.replace(/\\/g,`/`).split(`/`).findLast(Boolean)??e}function dt(e){return _(`dreaming.wiki.pageTypes.${e}`)}function P(e){return _(e===1?`dreaming.wiki.counts.pageOne`:`dreaming.wiki.counts.pages`,{count:String(e)})}function F(e){return _(e===1?`dreaming.wiki.counts.claimRowOne`:`dreaming.wiki.counts.claimRows`,{count:String(e)})}function I(e){return _(e===1?`dreaming.wiki.counts.openQuestionOne`:`dreaming.wiki.counts.openQuestions`,{count:String(e)})}function L(e){return _(e===1?`dreaming.wiki.counts.contradictionOne`:`dreaming.wiki.counts.contradictions`,{count:String(e)})}function ft(e){let t=kt.map(([t,n])=>{let r=e[t];return r>0?_(`dreaming.wiki.pageGroupSummary`,{label:_(`dreaming.wiki.pageGroups.${n}`),count:P(r)}):null}).filter(e=>e!==null);return t.length>0?t.join(`; `):_(`dreaming.wiki.noPagesYet`)}function pt(e){let t=[_(`dreaming.wiki.sectionPageSummary`,{label:e.label,count:P(e.itemCount)})];if(e.claimCount>0&&t.push(F(e.claimCount)),e.questionCount>0){let n=e.items.filter(e=>e.questionCount>0).length,r=I(e.questionCount);t.push(n>0?_(`dreaming.wiki.questionCountOnPages`,{questionCount:r,pageCount:P(n)}):r)}return e.contradictionCount>0&&t.push(L(e.contradictionCount)),t.join(` · `)}function mt(e){return _(e.digestStatus===`withheld`?`dreaming.wiki.risk.needsReview`:`dreaming.wiki.risk.${e.riskLevel}`)}function R(e,t,n){e.has(t)?e.delete(t):e.add(t),n()}async function z(e,t){let n=t.viewState,r=++n.wikiPreviewRequestId;n.wikiPreviewOpen=!0,n.wikiPreviewLoading=!0,n.wikiPreviewTitle=N(e),n.wikiPreviewPath=e,n.wikiPreviewUpdatedAt=null,n.wikiPreviewContent=``,n.wikiPreviewTotalLines=null,n.wikiPreviewTruncated=!1,n.wikiPreviewError=null,t.onViewStateChange();try{let i=await t.onOpenWikiPage(e);if(n.wikiPreviewRequestId!==r||!n.wikiPreviewOpen)return;if(!i){n.wikiPreviewError=_(`dreaming.wiki.pageNotFound`,{lookup:e});return}n.wikiPreviewTitle=i.title,n.wikiPreviewPath=i.path,n.wikiPreviewUpdatedAt=i.updatedAt??null,n.wikiPreviewContent=i.content,n.wikiPreviewTotalLines=typeof i.totalLines==`number`?i.totalLines:null,n.wikiPreviewTruncated=i.truncated===!0}catch(e){n.wikiPreviewRequestId===r&&n.wikiPreviewOpen&&(n.wikiPreviewError=String(e))}finally{n.wikiPreviewRequestId===r&&n.wikiPreviewOpen&&(n.wikiPreviewLoading=!1,t.onViewStateChange())}}function B(e){e.wikiPreviewRequestId+=1,e.wikiPreviewOpen=!1,e.wikiPreviewLoading=!1,e.wikiPreviewTitle=``,e.wikiPreviewPath=``,e.wikiPreviewUpdatedAt=null,e.wikiPreviewContent=``,e.wikiPreviewTotalLines=null,e.wikiPreviewTruncated=!1,e.wikiPreviewError=null}function V(e){B(e.viewState),e.onViewStateChange()}function ht(e){let t=e.viewState;return t.wikiPreviewOpen?m`
    <openclaw-modal-dialog
      .label=${t.wikiPreviewTitle||_(`dreaming.wiki.previewFallbackTitle`)}
      style="--openclaw-modal-width: 1120px"
      @modal-cancel=${()=>V(e)}
    >
      <div class="dreams-diary__preview-panel">
        <div class="dreams-diary__preview-header">
          <div>
            <div class="dreams-diary__preview-title">
              ${t.wikiPreviewTitle||_(`dreaming.wiki.previewFallbackTitle`)}
            </div>
            <div class="dreams-diary__preview-meta">
              ${t.wikiPreviewPath}
              ${t.wikiPreviewUpdatedAt?` · ${t.wikiPreviewUpdatedAt}`:``}
            </div>
          </div>
          <button
            type="button"
            class="btn btn--subtle btn--sm"
            @click=${()=>V(e)}
          >
            ${_(`dreaming.wiki.close`)}
          </button>
        </div>
        <div class="dreams-diary__preview-body">
          ${t.wikiPreviewLoading?m`<div class="dreams-diary__empty-text">${_(`dreaming.wiki.loadingPage`)}</div>`:t.wikiPreviewError?m`<div class="dreams-diary__error">${t.wikiPreviewError}</div>`:m`
                  ${t.wikiPreviewTruncated?m`
                        <div class="dreams-diary__preview-hint">
                          ${t.wikiPreviewTotalLines===null?_(`dreaming.wiki.previewTruncated`):_(`dreaming.wiki.previewTruncatedWithTotal`,{count:String(t.wikiPreviewTotalLines)})}
                        </div>
                      `:f}
                  <pre class="dreams-diary__preview-pre">${t.wikiPreviewContent}</pre>
                `}
        </div>
      </div>
    </openclaw-modal-dialog>
  `:f}function gt(e){switch(e){case`dreams`:return m` <p class="dreams-diary__explainer">${_(`dreaming.wiki.dreamsExplainer`)}</p> `;case`insights`:return m` <p class="dreams-diary__explainer">${_(`dreaming.wiki.insightsExplainer`)}</p> `;case`wiki`:return m` <p class="dreams-diary__explainer">${_(`dreaming.wiki.wikiExplainer`)}</p> `}return f}function H(e){if(!e)return-1/0;let t=Date.parse(e);return Number.isFinite(t)?t:-1/0}function U(e,t){let n=H(e.lastRecalledAt),r=H(t.lastRecalledAt);return r===n?t.totalSignalCount===e.totalSignalCount?e.path.localeCompare(t.path):t.totalSignalCount-e.totalSignalCount:r-n}function _t(e,t){return t.totalSignalCount===e.totalSignalCount?t.phaseHitCount===e.phaseHitCount?U(e,t):t.phaseHitCount-e.phaseHitCount:t.totalSignalCount-e.totalSignalCount}function vt(e,t){return t===`signals`?e.toSorted(_t):e.toSorted(U)}function W(e){let t=e.groundedCount>0,n=e.recallCount>0||e.dailyCount>0;return _(t&&n?`dreaming.advanced.originMixed`:t?`dreaming.advanced.originDailyLog`:`dreaming.advanced.originLive`)}function G(e){return m`
    <section class="dreams-advanced__section">
      <div class="dreams-advanced__section-header">
        <div class="dreams-advanced__section-copy">
          <span class="dreams-advanced__section-title">${_(e.titleKey)}</span>
          <p class="dreams-advanced__section-description">${_(e.descriptionKey)}</p>
        </div>
        <div class="dreams-advanced__section-toolbar">
          ${e.controls??f}
          <span class="dreams-advanced__section-count">${e.entries.length}</span>
        </div>
      </div>
      ${e.entries.length===0?m`<div class="dreams-advanced__empty">${_(e.emptyKey)}</div>`:m`
            <div class="dreams-advanced__list">
              ${e.entries.map(t=>m`
                  <article class="dreams-advanced__item" data-entry-key=${t.key}>
                    ${e.badge?(()=>{let n=e.badge?.(t);return n?m`<span class="dreams-advanced__badge">${n}</span>`:f})():f}
                    <div class="dreams-advanced__snippet">${t.snippet}</div>
                    <div class="dreams-advanced__source">
                      ${ut(t.path,t.startLine,t.endLine)}
                    </div>
                    <div class="dreams-advanced__meta">
                      ${e.meta(t).filter(e=>e.length>0).join(` · `)}
                    </div>
                  </article>
                `)}
            </div>
          `}
    </section>
  `}function yt(e){let t=e.viewState,n=e.shortTermEntries.filter(e=>e.groundedCount>0),r=vt(e.shortTermEntries,t.advancedWaitingSort),i=_(`dreaming.advanced.description`),a=[`${n.length} ${_(`dreaming.advanced.summaryFromDailyLog`)}`,`${e.shortTermCount} ${_(`dreaming.advanced.summaryWaiting`)}`,`${e.promotedCount} ${_(`dreaming.advanced.summaryPromotedToday`)}`].join(` · `);return m`
    <section class="dreams-advanced">
      <div class="dreams-advanced__header">
        <div class="dreams-advanced__intro">
          <span class="dreams-advanced__eyebrow">${_(`dreaming.advanced.eyebrow`)}</span>
          <h2 class="dreams-advanced__title">${_(`dreaming.advanced.title`)}</h2>
          ${i?m`<p class="dreams-advanced__description">${i}</p>`:f}
          <div class="dreams-advanced__summary">${a}</div>
        </div>
        <div class="dreams-advanced__actions">
          ${[{label:_(`dreaming.scene.dedupeDiary`),onClick:e.onDedupeDreamDiary},{label:_(`dreaming.scene.repairCache`),onClick:e.onRepairDreamingArtifacts},{label:_(e.dreamDiaryActionLoading?`dreaming.scene.working`:`dreaming.scene.backfill`),onClick:e.onBackfillDiary},{label:_(`dreaming.scene.reset`),onClick:e.onResetDiary},{label:_(`dreaming.scene.clearGrounded`),onClick:e.onResetGroundedShortTerm}].map(({label:t,onClick:n})=>m`
              <button
                class="btn btn--subtle btn--sm"
                ?disabled=${e.modeSaving||e.dreamDiaryActionLoading}
                @click=${()=>n()}
              >
                ${t}
              </button>
            `)}
        </div>
      </div>
      ${e.dreamDiaryActionMessage?m`
            <div
              class="callout ${e.dreamDiaryActionMessage.kind===`success`?`success`:`danger`}"
              role="status"
            >
              <div class="row wrap items-center gap-2">
                <span>${e.dreamDiaryActionMessage.text}</span>
                ${e.dreamDiaryActionArchivePath?m`
                      <button
                        class="btn btn--subtle btn--sm"
                        ?disabled=${e.dreamDiaryActionLoading}
                        @click=${()=>e.onCopyDreamingArchivePath()}
                      >
                        ${_(`dreaming.wiki.copyArchivePath`)}
                      </button>
                    `:f}
              </div>
            </div>
          `:f}

      <div class="dreams-advanced__sections">
        ${G({titleKey:`dreaming.advanced.stagedTitle`,descriptionKey:`dreaming.advanced.stagedDescription`,emptyKey:`dreaming.advanced.emptyGrounded`,entries:n,controls:m`
            <button
              class="btn btn--subtle btn--sm"
              ?disabled=${e.modeSaving||e.dreamDiaryActionLoading}
              @click=${()=>e.onResetGroundedShortTerm()}
            >
              ${_(`dreaming.scene.clearGrounded`)}
            </button>
          `,badge:()=>_(`dreaming.advanced.originDailyLog`),meta:e=>[e.groundedCount>0?`${e.groundedCount} ${_(`dreaming.stats.grounded`).toLowerCase()}`:``,e.recallCount>0?`${e.recallCount} recall`:``,e.dailyCount>0?`${e.dailyCount} daily`:``]})}
        ${G({titleKey:`dreaming.advanced.shortTermTitle`,descriptionKey:`dreaming.advanced.shortTermDescription`,emptyKey:`dreaming.advanced.emptyShortTerm`,entries:r,controls:m`
            <div class="dreams-advanced__sort">
              <button
                class="dreams-advanced__sort-btn ${t.advancedWaitingSort===`recent`?`dreams-advanced__sort-btn--active`:``}"
                @click=${()=>{t.advancedWaitingSort=`recent`,e.onViewStateChange()}}
              >
                ${_(`dreaming.advanced.sortRecent`)}
              </button>
              <button
                class="dreams-advanced__sort-btn ${t.advancedWaitingSort===`signals`?`dreams-advanced__sort-btn--active`:``}"
                @click=${()=>{t.advancedWaitingSort=`signals`,e.onViewStateChange()}}
              >
                ${_(`dreaming.advanced.sortSignals`)}
              </button>
            </div>
          `,badge:e=>W(e),meta:e=>[`${e.totalSignalCount} ${_(`dreaming.stats.signals`).toLowerCase()}`,e.recallCount>0?`${e.recallCount} recall`:``,e.dailyCount>0?`${e.dailyCount} daily`:``,e.groundedCount>0?`${e.groundedCount} ${_(`dreaming.stats.grounded`).toLowerCase()}`:``,e.phaseHitCount>0?`${e.phaseHitCount} phase hit`:``]})}
        ${G({titleKey:`dreaming.advanced.promotedTitle`,descriptionKey:`dreaming.advanced.promotedDescription`,emptyKey:`dreaming.advanced.emptyPromoted`,entries:e.promotedEntries,badge:e=>W(e),meta:e=>[e.promotedAt?`${_(`dreaming.advanced.updatedPrefix`)} ${M(e.promotedAt)}`:``,e.groundedCount>0?`${e.groundedCount} ${_(`dreaming.stats.grounded`).toLowerCase()}`:``,e.totalSignalCount>0?`${e.totalSignalCount} ${_(`dreaming.stats.signals`).toLowerCase()}`:``]})}
      </div>

      ${e.statusError?m`<div class="dreams__controls-error">${e.statusError}</div>`:f}
    </section>
  `}function K(e,t){return t.length>0?m`
        <div class="dreams-diary__insight-list">
          <strong>${_(e)}</strong>
          ${t.map(e=>m`<p class="dreams-diary__insight-line">• ${e}</p>`)}
        </div>
      `:f}function q(e,t){return t?m`
        <p class="dreams-diary__insight-line">
          <strong>${_(e)}</strong>
          ${t}
        </p>
      `:f}function bt(e,t){if(e.kind===`import`){let n=e.item;return m`
      <p class="dreams-diary__insight-line">${n.summary}</p>
      ${K(`dreaming.wiki.candidateSignals`,n.candidateSignals)}
      ${K(`dreaming.wiki.corrections`,n.correctionSignals)}
      ${t?m`
            <div class="dreams-diary__insight-list">
              <strong>${_(`dreaming.wiki.importDetails`)}</strong>
              ${q(`dreaming.wiki.startedWith`,n.firstUserLine)}
              ${q(`dreaming.wiki.endedOn`,n.lastUserLine===n.firstUserLine?void 0:n.lastUserLine)}
              ${q(`dreaming.wiki.messages`,`${_(`dreaming.wiki.counts.userMessages`,{count:String(n.userMessageCount)})} · ${_(`dreaming.wiki.counts.assistantMessages`,{count:String(n.assistantMessageCount)})}`)}
              ${q(`dreaming.wiki.riskReasons`,n.riskReasons.join(`, `))}
              ${q(`dreaming.wiki.labels`,n.labels.join(`, `))}
            </div>
          `:f}
      ${n.preferenceSignals.length>0?m`
            <div class="dreams-diary__insight-signals">
              ${n.preferenceSignals.map(e=>m`<span class="dreams-diary__insight-signal">${e}</span>`)}
            </div>
          `:f}
    `}let n=e.item;return m`
    ${n.snippet?m`<p class="dreams-diary__insight-line">${n.snippet}</p>`:f}
    ${K(`dreaming.wiki.claims`,n.claims)}
    ${K(`dreaming.wiki.openQuestions`,n.questions)}
    ${K(`dreaming.wiki.contradictions`,n.contradictions)}
    ${t?m`
          <div class="dreams-diary__insight-list">
            <strong>${_(`dreaming.wiki.pageDetails`)}</strong>
            ${q(`dreaming.wiki.wikiPage`,n.pagePath)}
            ${q(`dreaming.wiki.id`,n.id)}
          </div>
        `:f}
  `}function J(e,t){let n=e.viewState,r=t.item,i=t.kind===`import`?n.expandedInsightCards:n.expandedWikiCards,a=i.has(r.pagePath),o=t.kind===`import`?t.item.riskLevel:`wiki`,s=t.kind===`import`?mt(t.item):dt(t.item.kind),c=t.kind===`import`?t.item.activeBranchMessages>0?` · ${_(`dreaming.wiki.counts.messages`,{count:String(t.item.activeBranchMessages)})}`:``:` · ${r.pagePath}`;return m`
    <article
      class="dreams-diary__insight-card dreams-diary__insight-card--clickable"
      data-import-page=${t.kind===`import`?r.pagePath:f}
      data-wiki-page=${t.kind===`wiki`?r.pagePath:f}
      @click=${()=>{if(t.kind===`wiki`&&t.item.kind===`report`){z(r.pagePath,e);return}R(i,r.pagePath,e.onViewStateChange)}}
    >
      <div class="dreams-diary__insight-topline">
        <div class="dreams-diary__insight-title">${r.title}</div>
        <span class="dreams-diary__insight-badge dreams-diary__insight-badge--${o}">
          ${s}
        </span>
      </div>
      <div class="dreams-diary__insight-meta">
        ${r.updatedAt?M(r.updatedAt):N(r.pagePath)}${c}
      </div>
      ${bt(t,a)}
      <div class="dreams-diary__insight-actions">
        <button
          class="btn btn--subtle btn--sm"
          @click=${t=>{t.stopPropagation(),R(i,r.pagePath,e.onViewStateChange)}}
        >
          ${_(a?`dreaming.wiki.hideDetails`:`dreaming.wiki.details`)}
        </button>
        <button
          class="btn btn--subtle btn--sm"
          @click=${t=>{t.stopPropagation(),z(r.pagePath,e)}}
        >
          ${_(t.kind===`import`?`dreaming.wiki.openSourcePage`:`dreaming.wiki.openWikiPage`)}
        </button>
      </div>
    </article>
  `}function Y(e,t,n){let r=e.viewState;return m`
    <div class="dreams-diary__daychips">
      ${t.map((i,a)=>m`
          <button
            class="dreams-diary__day-chip ${a===n?`dreams-diary__day-chip--active`:``}"
            @click=${()=>{rt(r,a,t.length),e.onViewStateChange()}}
          >
            ${i}
          </button>
        `)}
    </div>
  `}function xt(e,t){let{clusters:n}=t;if(n.length===0)return m`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-text">
          ${_(t.loading?t.loadingKey:t.emptyKey)}
        </div>
        ${t.loading?f:m`<div class="dreams-diary__empty-hint">${_(t.emptyHintKey)}</div>`}
      </div>
    `;let r=e.viewState,i=Math.max(0,Math.min(r.diaryPage,n.length-1)),a=me(n[i],t.kind===`imports`?`selected imported insight cluster`:`selected memory overview cluster`);return{navigation:Y(e,n.map(e=>e.label),i),content:m`
      <article class="dreams-diary__entry" key="${t.kind}-${a.key}">
        <div class="dreams-diary__accent"></div>
        <div class="dreams-diary__date">${t.date(a)}</div>
        <div class="dreams-diary__prose">${t.prose(a)}</div>
        <div class="dreams-diary__insights">${a.items.map(t.renderItem)}</div>
      </article>
    `}}function St(e){return xt(e,{kind:`imports`,clusters:e.wikiImportInsights?.clusters??[],loading:e.wikiImportInsightsLoading,loadingKey:`dreaming.wiki.loadingInsights`,emptyKey:`dreaming.wiki.noInsights`,emptyHintKey:`dreaming.wiki.noInsightsHint`,date:e=>{let t=[_(`dreaming.wiki.counts.chats`,{count:String(e.itemCount)}),...e.highRiskCount>0?[_(`dreaming.wiki.counts.sensitive`,{count:String(e.highRiskCount)})]:[],...e.preferenceSignalCount>0?[_(`dreaming.wiki.counts.signals`,{count:String(e.preferenceSignalCount)})]:[]];return`${e.label} · ${t.join(` · `)}`},prose:e=>m`<p class="dreams-diary__para">${[_(`dreaming.wiki.importedClusterSummary`,{label:e.label.toLowerCase()}),...e.withheldCount>0?[_(e.withheldCount===1?`dreaming.wiki.withheldDigestOne`:`dreaming.wiki.withheldDigests`,{count:String(e.withheldCount)})]:[]].join(` `)}</p>`,renderItem:t=>J(e,{kind:`import`,item:t})})}function Ct(e){let t=e.wikiOverview;return xt(e,{kind:`wiki`,clusters:t?.clusters??[],loading:e.wikiOverviewLoading,loadingKey:`dreaming.wiki.loadingWiki`,emptyKey:`dreaming.wiki.emptyWiki`,emptyHintKey:`dreaming.wiki.emptyWikiHint`,date:()=>{let e=[P(t?.totalPages??0),...(t?.totalClaims??0)>0?[F(t.totalClaims)]:[],...(t?.totalQuestions??0)>0?[I(t.totalQuestions)]:[],...(t?.totalContradictions??0)>0?[L(t.totalContradictions)]:[]];return`${_(`dreaming.wiki.vault`)} · ${e.join(` · `)}`},prose:e=>m`
      <p class="dreams-diary__para">
        ${_(`dreaming.wiki.fullVaultBreakdown`,{breakdown:t?ft(t.pageCounts):_(`dreaming.wiki.noPagesYet`)})}
      </p>
      <p class="dreams-diary__para">
        ${_(`dreaming.wiki.selectedSection`,{summary:pt(e)})}
        ${e.updatedAt?` ${_(`dreaming.wiki.latestUpdate`,{date:M(e.updatedAt)})}`:``}
      </p>
    `,renderItem:t=>J(e,{kind:`wiki`,item:t})})}function wt(e){let t=e.viewState;if(typeof e.dreamDiaryContent!=`string`)return m`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-moon">
          <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
            <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="0.5" opacity="0.2" />
            <path d="M20 8a10 10 0 0 1 0 16 10 10 0 1 0 0-16z" fill="currentColor" opacity="0.08" />
          </svg>
        </div>
        <div class="dreams-diary__empty-text">${_(`dreaming.diary.noDreamsYet`)}</div>
        <div class="dreams-diary__empty-hint">${_(`dreaming.diary.noDreamsHint`)}</div>
      </div>
    `;let n=$e(e.dreamDiaryContent);if(n.length===0)return m`
      <div class="dreams-diary__empty">
        <div class="dreams-diary__empty-text">${_(`dreaming.diary.waitingTitle`)}</div>
        <div class="dreams-diary__empty-hint">${_(`dreaming.diary.waitingHint`)}</div>
      </div>
    `;let r=n.toReversed(),i=Math.max(0,Math.min(t.diaryPage,r.length-1)),a=me(r[i],`selected dreaming diary entry`);return{navigation:Y(e,r.map(e=>tt(e.date)),i),content:m`
      <article class="dreams-diary__entry" key="${i}">
        <div class="dreams-diary__accent"></div>
        ${a.date?m`<time class="dreams-diary__date">${a.date}</time>`:f}
        <div class="dreams-diary__prose">
          ${st(a.body).map((e,t)=>m`<p class="dreams-diary__para" style="animation-delay: ${.3+t*.15}s;">
                ${ae(be(e))}
              </p>`)}
        </div>
      </article>
    `}}function Tt(e){let t=e.viewState,n=t.activeDiarySubTab,r=(n===`insights`||n===`wiki`)&&!e.memoryWikiEnabled,i=n===`dreams`?e.dreamDiaryError:n===`insights`?e.wikiImportInsightsError:e.wikiOverviewError;if(i&&!r)return m`
      <section class="dreams-diary">
        <div class="dreams-diary__error">${i}</div>
      </section>
    `;let a=n===`dreams`?wt(e):n===`insights`?St(e):Ct(e),o=`navigation`in a?a.navigation:f,s=`content`in a?a.content:a;return m`
    <section class="dreams-diary">
      <div class="dreams-diary__chrome">
        <div class="dreams-diary__header">
          <span class="dreams-diary__title">${_(`dreaming.diary.title`)}</span>
          ${b({id:`dream-diary`,active:n,tabs:[{value:`dreams`,label:_(`dreaming.wiki.dreamsTab`)},{value:`insights`,label:_(`dreaming.wiki.insightsTab`)},{value:`wiki`,label:_(`dreaming.wiki.wikiTab`)}],ariaLabel:_(`dreaming.diary.title`),panelId:`dream-diary-panel`,variant:`sub`,onSelect:n=>{B(t),t.activeDiarySubTab=n,t.diaryPage=0,e.onViewStateChange()}})}
          <button
            class="btn btn--subtle btn--sm"
            ?disabled=${r?!1:e.modeSaving||(n===`dreams`?e.dreamDiaryLoading:n===`insights`?e.wikiImportInsightsLoading:e.wikiOverviewLoading)}
            @click=${()=>{t.diaryPage=0,r?e.onOpenConfig():n===`dreams`?e.onRefreshDiary():n===`insights`?e.onRefreshImports():e.onRefreshWikiOverview()}}
          >
            ${r?_(`dreaming.wiki.howToEnable`):n===`dreams`?e.dreamDiaryLoading?_(`dreaming.diary.reloading`):_(`dreaming.diary.reload`):n===`insights`?e.wikiImportInsightsLoading?`Reloading…`:`Reload`:e.wikiOverviewLoading?`Reloading…`:`Reload`}
          </button>
        </div>
        ${gt(n)}
        ${r?f:o}
      </div>

      <div
        id="dream-diary-panel"
        role="tabpanel"
        aria-labelledby=${`dream-diary-tab-${n}`}
      >
        ${r?m`
              <div class="dreams-diary__empty">
                <div class="dreams-diary__empty-text">${_(`dreaming.wiki.unavailable`)}</div>
                <div class="dreams-diary__empty-hint">
                  ${_(`dreaming.wiki.unavailablePluginPrefix`)}
                  <code>memory-wiki</code> ${_(`dreaming.wiki.unavailablePluginSuffix`)}
                </div>
                <div class="dreams-diary__empty-hint">
                  ${_(`dreaming.wiki.enablePrefix`)}
                  <code>plugins.entries.memory-wiki.enabled = true</code>${_(`dreaming.wiki.enableSuffix`)}
                </div>
                <div class="dreams-diary__empty-actions">
                  <button class="btn btn--subtle btn--sm" @click=${()=>e.onOpenConfig()}>
                    ${_(`dreaming.wiki.openConfig`)}
                  </button>
                </div>
              </div>
            `:s}
      </div>
      ${ht(e)}
    </section>
  `}var Et,Dt,X,Z,Q,Ot,kt,At=e((()=>{Se(),pe(),p(),se(),Oe(),Te(),y(),xe(),v(),Qe(),Et=/<!--\s*openclaw:dreaming:diary:start\s*-->/,Dt=/<!--\s*openclaw:dreaming:diary:end\s*-->/,X=[`dreaming.phrases.consolidatingMemories`,`dreaming.phrases.tidyingKnowledgeGraph`,`dreaming.phrases.replayingConversations`,`dreaming.phrases.weavingShortTerm`,`dreaming.phrases.defragmentingMemoryLane`,`dreaming.phrases.filingLooseThoughts`,`dreaming.phrases.connectingDots`,`dreaming.phrases.compostingContext`,`dreaming.phrases.alphabetizingSubconscious`,`dreaming.phrases.promotingHunches`,`dreaming.phrases.forgettingNoise`,`dreaming.phrases.dreamingEmbeddings`,`dreaming.phrases.reorganizingAttic`,`dreaming.phrases.indexingDay`,`dreaming.phrases.nurturingInsights`,`dreaming.phrases.simmeringIdeas`,`dreaming.phrases.whisperingVectorStore`],Z={light:`dreaming.phase.light`,deep:`dreaming.phase.deep`,rem:`dreaming.phase.rem`},Q=6e3,Ot=[{top:8,left:15,size:3,delay:0,hue:`neutral`},{top:12,left:72,size:2,delay:1.4,hue:`neutral`},{top:22,left:35,size:3,delay:.6,hue:`accent`},{top:18,left:88,size:2,delay:2.1,hue:`neutral`},{top:35,left:8,size:2,delay:.9,hue:`neutral`},{top:45,left:92,size:2,delay:1.7,hue:`neutral`},{top:55,left:25,size:3,delay:2.5,hue:`accent`},{top:65,left:78,size:2,delay:.3,hue:`neutral`},{top:75,left:45,size:2,delay:1.1,hue:`neutral`},{top:82,left:60,size:3,delay:1.8,hue:`accent`},{top:30,left:55,size:2,delay:.4,hue:`neutral`},{top:88,left:18,size:2,delay:2.3,hue:`neutral`}],kt=[[`source`,`sources`],[`synthesis`,`syntheses`],[`report`,`reports`],[`entity`,`entities`],[`concept`,`concepts`]]}));function jt(e){return te(e,{hour:`numeric`,minute:`2-digit`},``)||null}function Mt(e){let t=Object.values(e?.phases??{}).filter(e=>e.enabled&&typeof e.nextRunAtMs==`number`).map(e=>e.nextRunAtMs).toSorted((e,t)=>e-t)[0];return t===void 0?null:jt(t)}function Nt(e,t){let n=e&&typeof e==`object`?e:null,r=typeof n?.title==`string`&&n.title.trim()?n.title.trim():t,i=typeof n?.path==`string`&&n.path.trim()?n.path.trim():t,a=typeof n?.content==`string`&&n.content.length>0?n.content:_(`dreaming.wiki.noContent`),o=typeof n?.updatedAt==`string`&&n.updatedAt.trim()?n.updatedAt.trim():void 0,s=typeof n?.totalLines==`number`&&Number.isFinite(n.totalLines)?Math.max(0,Math.floor(n.totalLines)):void 0;return{title:r,path:i,content:a,...s===void 0?{}:{totalLines:s},...n?.truncated===!0?{truncated:!0}:{},...o?{updatedAt:o}:{}}}var $,Pt=e((()=>{le(),p(),ie(),de(),Ae(),De(),v(),ne(),re(),l(),s(),c(),j(),Ze(),At(),t(),$=class extends ee{constructor(...e){super(...e),this.agentId=``,this.dreaming=x(),this.toggleConfirmOpen=!1,this.toggleConfirmLoading=!1,this.pendingEnabled=null,this.viewState=nt(),this.gatewaySource=null,this.gatewayBindingEpoch=0,this.gatewayEpoch=0,this.hasBoundGatewaySource=!1,this.subscriptions=new o(this).effect(()=>this.context?.gateway,e=>{let t=this.hasBoundGatewaySource;this.hasBoundGatewaySource=!0,this.gatewaySource=e;let n=++this.gatewayBindingEpoch;this.gatewayEpoch+=1;let r=e.subscribe(t=>{this.isGatewayBindingCurrent(e,n)&&this.applyGatewaySnapshot(t)});return this.applyGatewaySnapshot(e.snapshot,t?`replacement`:`initial`),r}).effect(()=>this.context?.runtimeConfig,e=>(this.syncConfigSnapshot(),e.subscribe(()=>{this.syncConfigSnapshot(),this.requestUpdate()})))}willUpdate(e){e.has(`agentId`)&&this.applyAgentId()}disconnectedCallback(){this.subscriptions.clear(),this.gatewayBindingEpoch+=1,this.gatewayEpoch+=1,this.gatewaySource=null,this.resetTransientState(),this.dreaming=x(),super.disconnectedCallback()}isGatewayBindingCurrent(e,t){return this.isConnected&&this.gatewaySource===e&&this.gatewayBindingEpoch===t&&this.context.gateway===e}captureTaskScope(){let e=this.gatewaySource;return e?{gateway:e,epoch:this.gatewayEpoch,state:this.dreaming}:null}isTaskScopeCurrent(e){return this.isConnected&&this.gatewaySource===e.gateway&&this.gatewayEpoch===e.epoch&&this.context.gateway===e.gateway&&this.dreaming===e.state}resetTransientState(){B(this.viewState),this.toggleConfirmOpen=!1,this.toggleConfirmLoading=!1,this.pendingEnabled=null}createGatewayState(e=this.context.gateway.snapshot){return x({client:e.client,connected:e.phase===`connected`,hello:e.hello,configSnapshot:this.context.runtimeConfig.state.configSnapshot,applySessionKey:e.sessionKey,selectedAgentId:this.agentId.trim()||null})}applyGatewaySnapshot(e,t){let n=this.dreaming.client!==e.client,r=this.dreaming.connected!==(e.phase===`connected`),i=e.phase===`connected`&&!this.dreaming.connected,a=t===`replacement`||n||r;r&&(this.gatewayEpoch+=1),a?(this.dreaming=this.createGatewayState(e),t!==`initial`&&this.resetTransientState()):(this.dreaming.connected=e.phase===`connected`,this.dreaming.hello=e.hello,this.dreaming.applySessionKey=e.sessionKey),e.phase===`connected`&&(a||i)&&this.loadAll(),this.requestUpdate()}applyAgentId(){let e=this.agentId.trim();!e||this.dreaming.selectedAgentId===e||(this.gatewayEpoch+=1,this.resetTransientState(),this.dreaming=this.createGatewayState(),this.dreaming.connected&&this.loadAll())}syncConfigSnapshot(){this.dreaming.configSnapshot=this.context.runtimeConfig.state.configSnapshot}async runDreamingTask(e,t=this.captureTaskScope()){if(!t||!this.isTaskScopeCurrent(t))return;let n=e(t.state);this.requestUpdate();try{let e=await n;return this.isTaskScopeCurrent(t)?e:void 0}finally{this.isTaskScopeCurrent(t)&&this.requestUpdate()}}async confirmDreamingTask(e,t){let n=this.captureTaskScope();!n||!await ke(t)||!this.isTaskScopeCurrent(n)||await this.runDreamingTask(e,n)}async loadAll(e=!1){let t=this.captureTaskScope();if(!t||!t.state.client||!t.state.connected)return;let n=this.context.runtimeConfig;e?await n.refresh():await n.ensureLoaded(),!(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)&&(this.syncConfigSnapshot(),await Promise.all([this.runDreamingTask(D,t),this.runDreamingTask(O,t),this.runDreamingTask(Fe,t),this.runDreamingTask(Ie,t)]))}setEnabled(e,t){this.dreaming.dreamingModeSaving||this.toggleConfirmLoading||this.toggleConfirmOpen||t===e||(this.pendingEnabled=e,this.toggleConfirmOpen=!0,this.dreaming.dreamingStatusError=null)}cancelToggle(){this.toggleConfirmLoading||(this.toggleConfirmOpen=!1,this.pendingEnabled=null,this.dreaming.dreamingStatusError=null)}async confirmToggle(){let e=this.pendingEnabled;if(e==null||this.toggleConfirmLoading)return;this.toggleConfirmLoading=!0,this.dreaming.dreamingStatusError=null;let t=this.captureTaskScope(),n=this.context.runtimeConfig;if(!t){this.toggleConfirmLoading=!1;return}try{let r=await this.runDreamingTask(t=>Je(t,n,e),t);if(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)return;if(!r){this.dreaming.dreamingStatusError??=_(`dreaming.toggleConfirmation.failed`);return}if(await n.refresh(),!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n||(this.syncConfigSnapshot(),await this.runDreamingTask(D,t),!this.isTaskScopeCurrent(t)))return;this.toggleConfirmOpen=!1,this.pendingEnabled=null}finally{this.isTaskScopeCurrent(t)&&(this.toggleConfirmLoading=!1)}}async removeEnabledOverride(e,t){let{pluginId:n}=T(d(t.state));this.dreaming.dreamingModeSaving=!0;try{return await t.patch({raw:{plugins:{entries:{[n]:{config:{dreaming:{enabled:null}}}}}},note:`Dreaming settings reset to the plugin default.`})}catch(n){return this.isTaskScopeCurrent(e)&&this.context.runtimeConfig===t&&(this.dreaming.dreamingStatusError=n instanceof Error?n.message:_(`dreaming.actions.updateFailed`)),!1}finally{this.isTaskScopeCurrent(e)&&(this.dreaming.dreamingModeSaving=!1)}}async resetEnabledOverride(e){if(!e.overridden||this.dreaming.dreamingModeSaving||this.toggleConfirmOpen)return;this.dreaming.dreamingStatusError=null;let t=this.captureTaskScope(),n=this.context.runtimeConfig;if(!t)return;let r=await this.removeEnabledOverride(t,n);if(!(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)){if(!r){this.dreaming.dreamingStatusError??=_(`dreaming.actions.updateFailed`);return}await n.refresh(),!(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)&&(this.syncConfigSnapshot(),await this.runDreamingTask(D,t))}}async openWikiPage(e){let t=this.captureTaskScope(),n=t?.state.client;if(!t||!n||!t.state.connected)return null;let r=t.state.selectedAgentId?.trim()||null,i=await n.request(`wiki.get`,{lookup:e,fromLine:1,lineCount:5e3,...r?{agentId:r}:{}});return!this.isTaskScopeCurrent(t)||(t.state.selectedAgentId?.trim()||null)!==r?null:Nt(i,e)}async refreshWikiData(e){let t=this.captureTaskScope();if(!t)return;let n=this.context.runtimeConfig;await n.refresh(),!(!this.isTaskScopeCurrent(t)||this.context.runtimeConfig!==n)&&(this.syncConfigSnapshot(),await this.runDreamingTask(e,t))}render(){let e=this.dreaming,t=this.context.runtimeConfig.state,n=T(d(t)),r=n.engineOff?null:e.dreamingStatus,i=r?.enabled??n.enabled,a=e.dreamingStatusLoading||e.dreamingModeSaving,o=Ee({value:_(`common.enabled`),overridden:n.overridden,disabled:a,onReset:()=>void this.resetEnabledOverride(n)}),s=e.dreamingStatusLoading||e.dreamDiaryLoading,c=e.selectedAgentId??this.agentId;return m`
      <section class="content-header content-header--page agent-memory-panel__header">
        <div class="page-meta">
          <div class="dreaming-header-controls">
            <button
              class="btn btn--subtle btn--sm"
              ?disabled=${a||e.dreamDiaryLoading}
              @click=${()=>void this.loadAll(!0)}
            >
              ${_(s?`dreaming.header.refreshing`:`dreaming.header.refresh`)}
            </button>
            <span class="muted">
              ${n.engineOff?_(`dreaming.header.engineOff`):o.description}
            </span>
            ${o.action}
            <button
              class="dreams__phase-toggle ${i?`dreams__phase-toggle--on`:``}"
              ?disabled=${a||n.engineOff}
              @click=${()=>this.setEnabled(!i,i)}
            >
              <span class="dreams__phase-toggle-dot"></span>
              <span class="dreams__phase-toggle-label">
                ${_(i?`dreaming.header.on`:`dreaming.header.off`)}
              </span>
            </button>
          </div>
        </div>
      </section>
      ${ot({viewState:this.viewState,active:i,selectedAgentId:c,shortTermCount:r?.shortTermCount??0,promotedCount:r?.promotedToday??0,phases:r?.phases??void 0,shortTermEntries:r?.shortTermEntries??[],promotedEntries:r?.promotedEntries??[],dreamingOf:null,nextCycle:Mt(r),timezone:r?.timezone??null,statusError:e.dreamingStatusError,modeSaving:e.dreamingModeSaving,dreamDiaryLoading:e.dreamDiaryLoading,dreamDiaryActionLoading:e.dreamDiaryActionLoading,dreamDiaryActionMessage:e.dreamDiaryActionMessage,dreamDiaryActionArchivePath:e.dreamDiaryActionArchivePath,dreamDiaryError:e.dreamDiaryError,dreamDiaryContent:e.dreamDiaryContent,memoryWikiEnabled:u(t.configSnapshot,`memory-wiki`,{enabledByDefault:!1}),wikiImportInsightsLoading:e.wikiImportInsightsLoading,wikiImportInsightsError:e.wikiImportInsightsError,wikiImportInsights:e.wikiImportInsights,wikiOverviewLoading:e.wikiOverviewLoading,wikiOverviewError:e.wikiOverviewError,wikiOverview:e.wikiOverview,onRefreshDiary:()=>void this.runDreamingTask(O),onRefreshImports:()=>void this.refreshWikiData(Fe),onRefreshWikiOverview:()=>void this.refreshWikiData(Ie),onOpenConfig:()=>void this.context.runtimeConfig.openFile(),onOpenWikiPage:e=>this.openWikiPage(e),onBackfillDiary:()=>void this.runDreamingTask(Le),onCopyDreamingArchivePath:()=>void this.runDreamingTask(Ve),onDedupeDreamDiary:()=>void this.confirmDreamingTask(He,{title:_(`dreaming.scene.dedupeDiary`),message:_(`dreaming.actions.confirmDedupeDescription`),confirmLabel:_(`dreaming.scene.dedupeDiary`),danger:!0}),onResetDiary:()=>void this.runDreamingTask(Re),onResetGroundedShortTerm:()=>void this.runDreamingTask(ze),onRepairDreamingArtifacts:()=>void this.confirmDreamingTask(Be,{title:_(`dreaming.scene.repairCache`),message:_(`dreaming.actions.confirmRepairDescription`),confirmLabel:_(`dreaming.scene.repairCache`)}),onViewStateChange:()=>this.requestUpdate()})}
      ${Xe({open:this.toggleConfirmOpen,enabling:this.pendingEnabled===!0,loading:this.toggleConfirmLoading,onConfirm:()=>void this.confirmToggle(),onCancel:()=>this.cancelToggle(),hasError:!!e.dreamingStatusError})}
    `}},a([ce({context:ue,subscribe:!0})],$.prototype,`context`,void 0),a([oe({attribute:!1})],$.prototype,`agentId`,void 0),a([h()],$.prototype,`dreaming`,void 0),a([h()],$.prototype,`toggleConfirmOpen`,void 0),a([h()],$.prototype,`toggleConfirmLoading`,void 0),a([h()],$.prototype,`pendingEnabled`,void 0),customElements.get(`openclaw-agent-memory-panel`)||customElements.define(`openclaw-agent-memory-panel`,$)}));export{Ke as i,j as n,T as r,Pt as t};
//# sourceMappingURL=memory-panel-C16zEebk.js.map