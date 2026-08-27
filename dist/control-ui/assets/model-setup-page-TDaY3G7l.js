import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Bi as i,Fi as a,Ii as o,Kc as s,Li as c,Mi as l,Ni as u,Pi as d,Ri as ee,Vc as te,Vi as ne,Wc as re,ji as ie,jr as ae,kr as f,zi as p}from"./control-ui-core-BUddgKjW.js";import{K as m,Q as h,W as g,Y as _,_ as v,b as y,it as oe,nt as b}from"./lit-runtime-D5xZwgO1.js";import{f as se,i as ce,m as x,p as S,r as le}from"./control-ui-foundation-Dgui328h.js";import{Ut as ue,Wt as de,_ as fe,bt as C,jt as pe,v as me,wt as he}from"./control-ui-core-Ct5CBwjl.js";import{o as w,t as T}from"./control-ui-core-s0pW0mau.js";import{ot as ge,pt as E,st as D,vt as O,yt as k}from"./control-ui-core-vLOElyFQ.js";import{i as A,n as j}from"./gateway-runtime-DWs8EJ0W.js";import{a as M,i as N,n as P,o as F,r as I,s as L}from"./provider-icon-C8NbtTKP.js";import{n as _e,t as ve}from"./wizard-step-controls-4ghtGNhI.js";import{n as ye,t as be}from"./settings-workspace-BbyrBOFl.js";import{n as xe,t as Se}from"./settings-ui-Bko7fBdZ.js";import{r as Ce,t as we}from"./icon-loader-Do53ecm6.js";function R(e){return`provider-auto:${encodeURIComponent(e)}`}function Te(e){let t=[{id:`ollama`,brandId:`ollama`,label:w(`modelSetup.prepare.ollamaLabel`),hint:w(`modelSetup.prepare.ollamaHint`)},{id:`llama-cpp`,brandId:`llama-cpp`,label:w(`modelSetup.prepare.llamaCppLabel`)}];return(e.prepareOptions??t).filter(t=>!e.candidates.some(e=>e.credentials!==!1&&(e.kind===R(t.id)||e.modelRef.startsWith(`${t.brandId??t.id}/`))))}function Ee(e,t){return e.candidates.find(e=>e.kind===R(t)&&e.credentials!==!1)}var z=e((()=>{T()})),De=e((()=>{}));function B(e){let t={auth:w(`modelSetup.failure.auth`),rate_limit:w(`modelSetup.failure.rateLimit`),billing:w(`modelSetup.failure.billing`),timeout:w(`modelSetup.failure.timeout`),format:w(`modelSetup.failure.format`),unavailable:w(`modelSetup.failure.unavailable`),unknown:w(`modelSetup.failure.unknown`)};return t[e]??t.unknown}function Oe(e){let t={auth:w(`modelSetup.failureGuidance.auth`),rate_limit:w(`modelSetup.failureGuidance.rateLimit`),billing:w(`modelSetup.failureGuidance.billing`),timeout:w(`modelSetup.failureGuidance.unavailable`),format:w(`modelSetup.failureGuidance.format`),unavailable:w(`modelSetup.failureGuidance.unavailable`),unknown:w(`modelSetup.failureGuidance.unknown`)};return t[e]??t.unknown}function V(e,t){return _`
    <div class="model-setup__failure" role="alert">
      <span class="model-setup__failure-icon" aria-hidden="true">${O.alertTriangle}</span>
      <span><strong>${B(e)}.</strong> ${t} ${Oe(e)}</span>
    </div>
  `}function ke(e){let t=e.indexOf(`/`);return t<0?e:e.slice(t+1)}function Ae(e,t){return e.candidates.find(e=>e.modelRef===t)}function je(e,t){let n=ke(t),r=e?.detail.trim();return!r||e?.kind===`existing-model`?n:r.toLowerCase().includes(n.toLowerCase())?r:`${n} · ${r}`}function Me(e){switch(e.phase){case`checking`:return w(`modelSetup.verify.checkingButton`);case`failed`:return w(`modelSetup.verify.retry`);case`ok`:return w(`modelSetup.verify.checkAgain`);default:return w(`modelSetup.verify.button`)}}function Ne(e){let t=e.result.configuredModel,n=e.verify.phase===`ok`?e.verify.modelRef:t,r=M(n),i=n===t?Ae(e.result,t):void 0,a=r?N(r):n,o=je(i,n);return _`
    <section class="settings-section model-setup__current" data-verify-phase=${e.verify.phase}>
      <div class="settings-section__header">
        <h2>${w(`modelSetup.verify.title`)}</h2>
      </div>
      <div class="model-setup__row">
        <div class="model-setup__provider-copy">
          ${r?F(r,{className:`model-setup__icon`}):m}
          <div class="model-setup__current-copy">
            <strong>${a}</strong>
            <div class="muted">${o}</div>
            ${e.verify.phase===`checking`?_`<div class="model-setup__testing" role="status">
                  ${w(`modelSetup.verify.checking`,{modelRef:t})}
                </div>`:e.verify.phase===`ok`?_`<div class="model-setup__verified" role="status">
                    ${e.verify.latencyMs===void 0?w(`modelSetup.verify.ready`):w(`modelSetup.verify.readyIn`,{latencyMs:String(e.verify.latencyMs)})}
                  </div>`:e.verify.phase===`failed`?e.verify.status===`unavailable`||e.verify.status===`timeout`?_`<div class="model-setup__failure" role="alert">
                        <span class="model-setup__failure-icon" aria-hidden="true">
                          ${O.alertTriangle}
                        </span>
                        <span>
                          ${w(`modelSetup.verify.providerUnavailable`,{provider:a})}
                        </span>
                      </div>`:V(e.verify.status,e.verify.error):m}
          </div>
        </div>
        ${e.canVerify?_`<button
              type="button"
              class="btn"
              ?disabled=${e.actionsDisabled}
              @click=${e.onVerify}
            >
              ${Me(e.verify)}
            </button>`:m}
      </div>
    </section>
  `}var Pe=e((()=>{g(),k(),I(),T()}));function Fe(e){let t=e.currentTarget,n=Array.from(t.querySelectorAll(`wa-dropdown-item[data-manual-provider]:not([disabled])`)),r=n.find(e=>e.hasAttribute(`data-selected`))??n[0];if(r){for(let e of n)e.active=e===r;r.focus({preventScroll:!0}),r.scrollIntoView?.({block:`nearest`})}}function Ie(e){let t=e.currentTarget;if(t.open){if(e.key===`Tab`){e.preventDefault(),e.stopPropagation();let n=e.shiftKey?t.querySelector(`[slot="trigger"]`):t.closest(`.model-setup__manual`)?.querySelector(`input[type="password"]`);t.addEventListener(`wa-after-hide`,()=>n?.focus({preventScroll:!0}),{once:!0}),t.open=!1;return}e.key===`Escape`&&(e.preventDefault(),t.addEventListener(`wa-after-hide`,()=>t.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),{once:!0}))}}function Le(e,t,n){let r=e.detail.item,i=e.currentTarget,a=r.value??r.getAttribute(`value`);if(a){if(a!==t){i.addEventListener(`wa-after-hide`,()=>i.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),{once:!0}),n(a);return}e.preventDefault(),r.checked=!0,i.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),i.open=!1}}var Re=e((()=>{}));function ze(e,t,n,r){let i=M(e.modelRef),a=i&&P(i)?i:null;return _`
    <openclaw-modal-dialog
      label=${w(`modelSetup.success.title`)}
      description=${w(`modelSetup.success.body`,{modelRef:e.modelRef})}
      @modal-cancel=${n}
    >
      <section class="model-setup-success" role="status">
        <div
          class=${`model-setup-success__icon${a?` model-setup-success__icon--provider`:``}`}
          aria-hidden="true"
        >
          ${a?_`
                ${F(a,{className:`model-setup-success__provider-icon`})}
                <span class="model-setup-success__status-badge">${O.check}</span>
              `:O.shieldCheck}
        </div>
        <div class="model-setup-success__copy">
          <h2>${w(`modelSetup.success.title`)}</h2>
          <p>${w(`modelSetup.success.body`,{modelRef:e.modelRef})}</p>
        </div>
        ${e.warning?_`<div class="model-setup-success__warning">${e.warning}</div>`:m}
        <div class="model-setup-success__summary">
          <span>${w(`modelSetup.success.activeModel`)}</span>
          <strong>${e.modelRef}</strong>
          ${e.latencyMs===void 0?m:_`<span>
                ${w(`modelSetup.success.latency`,{latencyMs:String(e.latencyMs)})}
              </span>`}
        </div>
        <footer class="model-setup-success__actions">
          <button type="button" class="btn" @click=${n}>
            ${w(`modelSetup.success.stayHere`)}
          </button>
          <button type="button" class="btn primary" autofocus @click=${t}>
            ${O.messageSquare}
            ${w(r?`modelSetup.success.continueSetup`:`modelSetup.success.openChat`)}
          </button>
        </footer>
      </section>
    </openclaw-modal-dialog>
  `}var Be=e((()=>{g(),k(),E(),I(),T()}));function Ve(e){if(e.state.phase===`idle`)return m;let t=e.state.phase===`starting`||e.state.phase===`step`||e.state.phase===`done`;return _`
    <openclaw-modal-dialog
      label=${w(e.mode===`prepare`?`modelSetup.wizard.prepareDialogLabel`:`modelSetup.wizard.dialogLabel`)}
      @modal-cancel=${t?e.onCancel:e.onClose}
    >
      <div class="model-setup-wizard">
        <div class="model-setup-wizard__header">
          <h2>
            ${e.state.phase===`step`&&e.state.step.title?e.state.step.title:w(e.mode===`prepare`?`modelSetup.wizard.prepareTitle`:`modelSetup.wizard.title`)}
          </h2>
        </div>
        <div class="model-setup-wizard__body">
          ${e.state.phase===`starting`?_`<div role="status">
                ${w(e.mode===`prepare`?`modelSetup.wizard.prepareStarting`:`modelSetup.wizard.starting`)}
              </div>`:e.state.phase===`done`?_`<div role="status">${w(`modelSetup.wizard.checking`)}</div>`:e.state.phase===`error`||e.state.phase===`cancelled`?_`<div class="callout danger" role="alert">${e.state.message}</div>`:_`
                    ${e.state.validationError?_`<div class="callout danger" role="alert">
                          ${e.state.validationError}
                        </div>`:m}
                    ${_e({step:e.state.step,value:e.value,busy:e.state.busy,inputId:H,confirmAffirmativeLabel:e.mode===`prepare`&&e.state.step.type===`confirm`?w(`modelSetup.wizard.continue`):void 0,onValueChange:e.onValueChange,onAnswer:e.onAnswer})}
                    ${e.state.busy?_`<div role="status">${w(`modelSetup.wizard.working`)}</div>`:m}
                  `}
        </div>
        ${e.mode===`prepare`&&e.state.phase===`step`&&e.state.step.type===`confirm`?m:_`
              <div class="model-setup-wizard__footer">
                <button
                  type="button"
                  class="btn"
                  @click=${t?e.onCancel:e.onClose}
                >
                  ${w(t?`common.cancel`:`common.close`)}
                </button>
              </div>
            `}
      </div>
    </openclaw-modal-dialog>
  `}var H,He=e((()=>{g(),ve(),T(),E(),H=`model-setup-wizard-text-input`}));function U(e){return e.brandId&&P(e.brandId)?e.brandId:null}function W(e,t,n=``){let r=U(t);if(r)return F(r,{className:`model-setup__icon ${n}`.trim()});let i=t.icon?e.iconUrls[t.icon]:void 0;return!t.icon||!i?L(t.label,{className:`model-setup__icon ${n}`.trim()}):_`<img
    class=${`model-setup__icon ${n}`.trim()}
    src=${i}
    alt=${t.label}
    width="24"
    height="24"
    @error=${()=>e.onIconError(t.icon)}
  />`}function Ue(e){return e.recommended?w(`modelSetup.candidates.recommended`):e.credentials===!0?w(`modelSetup.candidates.credentialsReady`):e.credentials===!1?w(`modelSetup.candidates.signInNeeded`):w(`modelSetup.candidates.detected`)}function We(e,t){let n=t.configuredModel?t.candidates.filter(e=>e.kind!==`existing-model`&&e.modelRef!==t.configuredModel):t.candidates;return n.length===0?m:_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${w(`modelSetup.candidates.title`)}</h2>
      </div>
      <div class="model-setup__rows">
        ${n.map(t=>{let n=e.activation.phase===`testing`&&e.activation.targetId===a(t.kind,t.modelRef),r=e.activation.phase===`failure`&&e.activation.targetId===a(t.kind,t.modelRef)?e.activation:null;return _`
            <div class="model-setup__row" data-candidate-kind=${t.kind}>
              <div class="model-setup__row-main">
                <div class="model-setup__row-title">
                  ${W(e,t)}
                  <strong>${t.label}</strong>
                  <span class="model-setup__chip">${Ue(t)}</span>
                </div>
                <div class="muted">${t.modelRef} · ${t.detail}</div>
                ${n?_`<div class="model-setup__testing" role="status">
                      ${w(`modelSetup.candidates.testing`,{modelRef:t.modelRef})}
                    </div>`:m}
                ${r?V(r.status,r.error):m}
              </div>
              <div class="model-setup__row-actions">
                <button
                  type="button"
                  class=${`btn ${r?``:`primary`}`}
                  ?disabled=${e.actionsDisabled}
                  @click=${()=>e.onActivateCandidate(t)}
                >
                  <span>
                    ${w(n?`modelSetup.candidates.testingButton`:r?`modelSetup.candidates.retry`:`modelSetup.candidates.testAndUse`)}
                  </span>
                </button>
              </div>
            </div>
          `})}
      </div>
    </section>
  `}function Ge(e,t){let n=t.recommendedInstalls??[];return t.candidates.length>0||(t.authOptions?.length??0)>0||n.length===0?m:_`
    <section class="settings-section model-setup__empty">
      <div class="settings-section__header">
        <h2>${w(`modelSetup.empty.title`)}</h2>
      </div>
      <p class="muted">${w(`modelSetup.empty.intro`)}</p>
      <div class="model-setup__recommendations">
        ${n.map(t=>_`
            <div class="model-setup__recommendation" data-recommended-install=${t.id}>
              ${W(e,t,`model-setup__icon--recommendation`)}
              <div class="model-setup__row-main">
                <strong>${t.label}</strong>
                <div class="muted">${t.hint}</div>
                <a href=${t.website} target="_blank" rel="noopener">${t.website}</a>
              </div>
            </div>
          `)}
      </div>
    </section>
  `}function Ke(e,t){return t.unavailableCandidates?.length?_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${w(`modelSetup.unavailable.title`)}</h2>
      </div>
      <div class="model-setup__rows">
        ${t.unavailableCandidates.map(n=>{let r=(t.authOptions??[]).find(e=>e.id===n.authOptionId),i=t.manualProviders.find(e=>e.id===n.manualProviderId);return _`
            <div
              class="model-setup__row model-setup__row--info"
              data-unavailable-candidate=${n.id}
            >
              <div class="model-setup__provider-copy">
                ${W(e,n)}
                <div>
                  <div><strong>${n.label}</strong> — ${n.detail}</div>
                  <div class="muted">${n.reason}</div>
                </div>
              </div>
              <div class="model-setup__row-actions">
                ${r?_`<button
                      type="button"
                      class="btn primary"
                      ?disabled=${e.actionsDisabled}
                      @click=${()=>e.onStartAuth(r)}
                    >
                      ${w(`modelSetup.unavailable.signIn`,{provider:r.groupLabel??r.label})}
                    </button>`:m}
                ${i?_`<button
                      type="button"
                      class="btn"
                      ?disabled=${e.actionsDisabled}
                      @click=${()=>e.onUseManualProvider(i.id)}
                    >
                      ${w(`modelSetup.unavailable.useApiKey`)}
                    </button>`:m}
                <button
                  type="button"
                  class="btn"
                  ?disabled=${e.actionsDisabled}
                  @click=${e.onDetect}
                >
                  ${w(`modelSetup.checkAgain`)}
                </button>
              </div>
            </div>
          `})}
      </div>
    </section>
  `:m}function G(e,t){return _`
    <div class="model-setup__row" data-auth-choice=${t.id}>
      <div class="model-setup__provider-copy">
        ${W(e,t)}
        <div>
          <strong>${t.label}</strong>
          ${t.groupLabel?_`<div class="muted">${t.groupLabel}</div>`:m}
          ${t.hint?_`<div class="muted">${t.hint}</div>`:m}
        </div>
      </div>
      <button
        type="button"
        class="btn"
        ?disabled=${e.actionsDisabled}
        @click=${()=>e.onStartAuth(t)}
      >
        ${t.kind===`device-code`?w(`modelSetup.signIn.pair`):w(`modelSetup.signIn.signIn`)}
      </button>
    </div>
  `}function qe(e,t){let n=(t.authOptions??[]).toSorted((e,t)=>Number(t.featured)-Number(e.featured));if(n.length===0)return m;let r=n.filter(e=>e.featured),i=n.filter(e=>!e.featured);return _`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${w(`modelSetup.signIn.title`)}</h2>
      </div>
      <div class="model-setup__rows">${r.map(t=>G(e,t))}</div>
      ${i.length?_`<details
            class="model-setup__more"
            .open=${e.moreSignInOpen}
            @toggle=${t=>e.onMoreSignInToggle(t.currentTarget.open)}
          >
            <summary>${w(`modelSetup.signIn.more`)}</summary>
            <div class="model-setup__rows">
              ${i.map(t=>G(e,t))}
            </div>
          </details>`:m}
    </section>
  `}function Je(e,t){if(!e.canPrepare)return m;let n=Te(t);return n.length===0?m:_`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${w(`modelSetup.prepare.title`)}</h2>
      </div>
      <p class="muted">${w(`modelSetup.prepare.intro`)}</p>
      <div class="model-setup__rows">
        ${n.map(t=>_`
            <div class="model-setup__row" data-prepare-choice=${t.id}>
              <div class="model-setup__provider-copy">
                ${W(e,t)}
                <div>
                  <strong>${t.label}</strong>
                  ${t.hint?_`<div class="muted">${t.hint}</div>`:m}
                </div>
              </div>
              <button
                type="button"
                class="btn"
                ?disabled=${e.actionsDisabled}
                @click=${()=>e.onStartPrepare(t)}
              >
                ${t.actionLabel??w(`modelSetup.prepare.ollamaButton`)}
              </button>
            </div>
          `)}
      </div>
    </section>
  `}function K(e){return e.groupLabel?.trim()||e.label}function q(e){let t=e.label.trim();return t===K(e)?void 0:t}function Ye(e,t,n){let r=n?q(n):void 0,i=n?[K(n),r].filter(Boolean).join(`, `):w(`modelSetup.manual.selectProvider`);return _`
    <wa-dropdown
      class="model-setup-provider-select"
      placement="bottom-start"
      aria-label=${w(`modelSetup.manual.provider`)}
      @wa-select=${t=>Le(t,e.manualProviderId,e.onManualProviderChange)}
      @wa-after-show=${Fe}
      @keydown=${Ie}
    >
      <button
        slot="trigger"
        type="button"
        class="model-setup-provider-select__trigger"
        aria-label=${`${w(`modelSetup.manual.provider`)}: ${i}`}
        ?disabled=${e.actionsDisabled||t.manualProviders.length===0}
      >
        ${n?W(e,n,`model-setup__icon--picker`):_`<span class="model-setup-provider-select__placeholder-icon" aria-hidden="true">
              ${O.key}
            </span>`}
        <span class="model-setup-provider-select__copy">
          <strong>
            ${n?K(n):w(`modelSetup.manual.selectProvider`)}
          </strong>
          ${n?r?_`<span>${r}</span>`:m:_`<span>${w(`modelSetup.manual.selectProviderHint`)}</span>`}
        </span>
        <span class="model-setup-provider-select__chevron" aria-hidden="true">
          ${O.chevronDown}
        </span>
      </button>
      ${t.manualProviders.map(t=>{let n=t.id===e.manualProviderId,r=q(t),i=[K(t),r,t.hint].filter(Boolean).join(`, `);return _`
          <wa-dropdown-item
            class="model-setup-provider-select__option"
            data-manual-provider=${t.id}
            ?data-selected=${n}
            aria-label=${i}
            .value=${t.id}
            type="checkbox"
            .checked=${n}
            ?disabled=${e.actionsDisabled}
            ${y(e=>D(e,n))}
          >
            <span slot="icon">
              ${W(e,t,`model-setup__icon--picker`)}
            </span>
            <span class="model-setup-provider-select__copy">
              <strong>${K(t)}</strong>
              ${r?_`<span>${r}</span>`:m}
              ${t.hint?_`<small>${t.hint}</small>`:m}
            </span>
          </wa-dropdown-item>
        `})}
    </wa-dropdown>
  `}function J(e,t){let n=t.manualProviders.find(t=>t.id===e.manualProviderId),r=`manual:${e.manualProviderId}`,i=e.activation.phase===`testing`&&e.activation.targetId===r,a=e.activation.phase===`failure`&&e.activation.targetId===r?e.activation:null;return _`
    <section class="settings-section">
      <div class="settings-section__header">
        <h2>${w(`modelSetup.manual.title`)}</h2>
      </div>
      <div class="model-setup__manual">
        <div class="field">
          <span>${w(`modelSetup.manual.provider`)}</span>
          ${Ye(e,t,n)}
        </div>
        <label class="field">
          <span>
            ${n?w(`modelSetup.manual.accessValueFor`,{provider:K(n)}):w(`modelSetup.manual.accessValue`)}
          </span>
          <input
            class="input"
            type="password"
            autocomplete="off"
            .value=${e.manualApiKey}
            ?disabled=${e.actionsDisabled}
            placeholder=${w(`modelSetup.manual.accessValuePlaceholder`)}
            @input=${t=>e.onManualApiKeyChange(t.currentTarget.value)}
          />
        </label>
        <div class="model-setup__manual-help">
          ${O.shieldCheck}
          <span>${w(`modelSetup.manual.verifyHint`)}</span>
        </div>
        ${e.manualError?_`<div class="callout danger" role="alert">${e.manualError}</div>`:m}
        ${i?_`<div class="model-setup__testing" role="status">
              ${w(`modelSetup.candidates.testing`,{modelRef:n?.label??r})}
            </div>`:m}
        ${a?_`<div class="callout danger" role="alert">
              <strong>${B(a.status)}</strong> ${a.error}
            </div>`:m}
        <button
          type="button"
          class="btn primary"
          ?disabled=${e.actionsDisabled||!e.manualProviderId}
          @click=${e.onManualConnect}
        >
          ${w(i?`modelSetup.candidates.testingButton`:`modelSetup.manual.connectAndVerify`)}
        </button>
      </div>
    </section>
  `}function Xe(e,t){let n=t.configuredModel?Ne({result:t,verify:e.verify,canVerify:e.canVerify,actionsDisabled:e.actionsDisabled,onVerify:e.onVerify}):m;return e.canAdmin?e.gatewayTooOld?_`${n}
      <div class="callout warning" role="note">${w(`modelSetup.access.gatewayTooOld`)}</div>`:_`
    ${n} ${Ge(e,t)} ${We(e,t)}
    ${Ke(e,t)} ${Je(e,t)}
    ${qe(e,t)} ${J(e,t)}
  `:_`${n}
      <div class="callout warning" role="note">${w(`modelSetup.access.adminRequired`)}</div>`}function Ze(e){let t;return e.page.phase===`ready`?t=Xe(e,e.page.result):e.canAdmin?e.gatewayTooOld?t=_`<div class="callout warning" role="note">
      ${w(`modelSetup.access.gatewayTooOld`)}
    </div>`:e.page.phase===`loading`?t=_`<div class="model-setup__loading" role="status">${w(`modelSetup.loading`)}</div>`:e.page.phase===`detect-error`&&(t=_`
      <div class="callout danger" role="alert">${e.page.message}</div>
      <button type="button" class="btn" @click=${e.onDetect}>${w(`modelSetup.retry`)}</button>
    `):t=_`<div class="callout warning" role="note">
      ${w(`modelSetup.access.adminRequired`)}
    </div>`,_`
    <div class="model-setup">
      <div class="model-setup__intro">
        <div>
          <h1>${w(`modelSetup.heading`)}</h1>
          <p>${w(`modelSetup.intro`)}</p>
        </div>
        ${e.page.phase===`ready`&&!e.page.result.configuredModel&&e.activation.phase!==`success`&&e.canAdmin&&!e.gatewayTooOld?_`<button
              type="button"
              class="btn"
              ?disabled=${e.actionsDisabled}
              @click=${e.onDetect}
            >
              ${w(`modelSetup.checkAgain`)}
            </button>`:m}
      </div>
      ${t}
    </div>
    ${Ve({mode:e.wizardMode,state:e.wizard,value:e.wizardValue,onValueChange:e.onWizardValueChange,onAnswer:e.onWizardAnswer,onCancel:e.onWizardCancel,onClose:e.onWizardClose})}
    ${e.activation.phase===`success`?ze(e.activation,e.onOpenChat,e.onSuccessClose,e.firstRun):m}
  `}var Qe=e((()=>{g(),v(),k(),I(),ge(),T(),De(),Pe(),z(),Re(),c(),Be(),He()})),Y,$e=e((()=>{f(),c(),Y=class{constructor(e){this.options=e,this.currentState={phase:`idle`},this.sessionId=null,this.abortController=null,this.generation=0,this.startMethod=`openclaw.setup.auth.start`}get state(){return this.currentState}async start(e,t=`openclaw.setup.auth.start`){let n=this.options.getClient();if(!n||this.currentState.phase!==`idle`)return;let r=++this.generation,i=crypto.randomUUID(),a=new AbortController;this.sessionId=i,this.abortController=a,this.startMethod=t,this.setState({phase:`starting`,authChoice:e});try{let o=await n.request(t,{sessionId:i,authChoice:e},{timeoutMs:d,signal:a.signal});if(r!==this.generation)return;if(o.done){this.applyResult(e,o);return}await this.requestNext(e,void 0,r)}catch(e){this.handleError(e,r)}}async answer(e,t=!0){let n=this.currentState;if(n.phase!==`step`||n.busy||!this.sessionId)return;let r=this.generation;this.setState({...n,busy:!0,validationError:null});let i=t?{stepId:n.step.id,value:e}:{stepId:n.step.id};try{await this.requestNext(n.authChoice,i,r)}catch(e){this.handleError(e,r)}}async cancel(){let e=this.options.getClient(),t=this.sessionId;if(this.generation+=1,this.sessionId=null,this.abortController?.abort(),this.abortController=null,this.setState({phase:`idle`}),!(!e||!t))try{await e.request(`wizard.cancel`,{sessionId:t},{timeoutMs:d})}catch{}}close(){this.generation+=1,this.sessionId=null,this.abortController?.abort(),this.abortController=null,this.setState({phase:`idle`})}fail(e){this.sessionId=null,this.abortController=null,this.setState({phase:`error`,message:e})}async requestNext(e,t,n){let r=this.options.getClient(),i=this.sessionId,a=this.abortController?.signal;if(!r||!i||!a)return;let o=await r.request(`wizard.next`,{sessionId:i,...t?{answer:t}:{}},{timeoutMs:null,signal:a});n===this.generation&&this.applyResult(e,o)}applyResult(e,t){let n=ne(e,t,t.status===`cancelled`?this.options.cancelledMessage():this.options.requestFailedMessage());if(this.setState(n),n.phase===`done`){this.sessionId=null,this.abortController=null,this.options.onDone(this.startMethod,n.preparedModelRef);return}if(n.phase===`step`&&n.step.executor===`gateway`){let t=this.generation;this.requestNext(e,void 0,t).catch(e=>{this.handleError(e,t)})}}handleError(e,t){if(t!==this.generation)return;let n=this.options.getClient(),r=this.sessionId;this.sessionId=null,this.abortController?.abort(),this.abortController=null;let i=ae(e);!i&&n&&r&&n.request(`wizard.cancel`,{sessionId:r},{timeoutMs:d}).catch(()=>{});let a=i?this.options.sessionExpiredMessage():e instanceof Error&&e.message.trim()?e.message:this.options.requestFailedMessage();this.setState({phase:`error`,message:a})}setState(e){this.currentState=e,this.options.onChange(e)}}}));function X(e){return e instanceof Error&&e.message.trim()?e.message:typeof e==`string`&&e.trim()?e:w(`modelSetup.errors.requestFailed`)}async function Z(e,t){try{return{client:e,value:await t()}}catch(t){return{client:e,error:t}}}var Q,$;e((()=>{le(),se(),g(),h(),pe(),me(),he(),Se(),be(),T(),j(),s(),te(),Ce(),z(),l(),c(),Qe(),$e(),t(),Q=`https://docs.openclaw.ai/concepts/model-providers`,$=class extends re{constructor(...e){super(...e),this.pageState={phase:`loading`},this.activationState={phase:`idle`},this.verifyState={phase:`idle`},this.wizardState={phase:`idle`},this.wizardMode=`auth`,this.manualProviderId=``,this.manualApiKey=``,this.manualError=null,this.moreSignInOpen=!1,this.iconUrls={},this.observedConnection=null,this.pendingPrepareOption=null,this.iconMisses=new Set,this.iconRequests=new Map,this.subscriptions=new r(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t),e=>this.synchronizeGateway(e.snapshot)),this.wizard=new Y({getClient:()=>this.context?.gateway.snapshot.client??null,onChange:e=>{let t=this.wizardState.phase===`step`?this.wizardState.step.id:null;this.wizardState=e,e.phase===`step`&&e.step.id!==t&&(this.wizardValue=ee(e.step))},onDone:(e,t)=>void this.handleWizardDone(e,t),requestFailedMessage:()=>w(`modelSetup.errors.requestFailed`),cancelledMessage:()=>w(`modelSetup.wizard.cancelled`),sessionExpiredMessage:()=>w(`modelSetup.wizard.sessionExpired`)}),this.detectTask=new S(this,{autoRun:!1,args:()=>{let e=this.context?.gateway.snapshot.client??null;return[this.canUseSetup(e)?e:null,null]},task:async([e,t],{signal:n})=>e&&t?{...await Z(e,()=>ie(e,n)),token:t}:x,onComplete:e=>{if(this.context.gateway.snapshot.client===e.client){if(`error`in e){this.pageState={phase:`detect-error`,message:X(e.error)};return}this.pageState={phase:`ready`,result:e.value},this.syncManualProvider(this.pageState)}}}),this.activationTask=new S(this,{autoRun:!1,args:()=>[null,null],task:([e,t],{signal:n})=>!e||!t?x:Z(e,async()=>{let r=await this.context.runtimeConfig.runExternalMutation(r=>{if(r!==e)throw Error(`Connection changed before model activation started.`);return r.request(`openclaw.setup.activate`,t,{timeoutMs:o(t.kind),signal:n})});if(!r.ok)throw Error(r.error);return{result:r.value,refreshError:r.refresh.ok?null:r.refresh.error}}),onComplete:e=>{let t=this.activationState;if(t.phase!==`testing`||this.context.gateway.snapshot.client!==e.client)return;if(`error`in e){this.activationState={phase:`failure`,targetId:t.targetId,status:`unknown`,error:X(e.error)};return}let n=p({result:e.value.result,targetId:t.targetId,fallbackError:w(`modelSetup.errors.activationFailed`)});this.activationState=n.phase===`success`&&e.value.refreshError?{...n,warning:e.value.refreshError}:n,this.activationState.phase===`success`&&(this.manualApiKey=``)}}),this.verifyTask=new S(this,{autoRun:!1,args:()=>[null],task:([e],{signal:t})=>e?Z(e,()=>u(e,t)):x,onComplete:e=>{this.context.gateway.snapshot.client===e.client&&(this.verifyState=`error`in e?{phase:`failed`,status:`unknown`,error:X(e.error)}:i(e.value))}})}disconnectedCallback(){this.detectTask.run([null,null]),this.activationTask.run([null,null]),this.verifyTask.run([null]),this.resetIcons(),this.wizard.cancel(),this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){let t=this.context.gateway.snapshot;if(e.has(`routeData`)&&this.routeData){let{connection:e}=this.routeData;t.phase===`connected`&&t.client===e.client&&t.hello===e.hello&&(this.pageState=this.routeData.state,this.observedConnection={...e,connected:!0},this.syncManualProvider(this.pageState))}}updated(){this.synchronizeGateway(this.context.gateway.snapshot),this.reconcileIcons()}synchronizeGateway(e){let t={client:e.client,hello:e.hello,connected:e.phase===`connected`};if(!this.observedConnection){this.observedConnection=t,t.connected&&this.routeData&&(this.routeData.connection.client!==t.client||this.routeData.connection.hello!==t.hello)&&this.detect();return}t.client===this.observedConnection.client&&t.hello===this.observedConnection.hello&&t.connected===this.observedConnection.connected||(this.observedConnection=t,this.detectTask.run([null,null]),this.activationState={phase:`idle`},this.activationTask.run([null,null]),this.verifyState={phase:`idle`},this.verifyTask.run([null]),this.resetIcons(),this.pendingPrepareOption=null,this.wizard.cancel(),this.pageState={phase:`loading`},!(!t.connected||!t.client)&&this.canUseSetup(t.client)&&this.detect())}canUseSetup(e){let t=this.context.gateway.snapshot;return!!(e&&t.phase===`connected`&&C(t.hello?.auth??null)&&A(t,`openclaw.setup.detect`)===!0)}syncManualProvider(e){e.phase===`ready`&&(e.result.manualProviders.some(e=>e.id===this.manualProviderId)||(this.manualProviderId=e.result.manualProviders[0]?.id??``))}currentIconUrls(){if(this.pageState.phase!==`ready`)return new Set;let e=this.pageState.result;return new Set([...e.candidates,...e.unavailableCandidates??[],...e.manualProviders,...e.authOptions??[],...e.prepareOptions??[],...e.recommendedInstalls??[]].flatMap(e=>e.icon&&!U(e)?[e.icon]:[]))}reconcileIcons(){let e=this.currentIconUrls(),t={...this.iconUrls},n=!1;for(let[r,i]of Object.entries(t))e.has(r)||(URL.revokeObjectURL(i),delete t[r],n=!0);n&&(this.iconUrls=t);for(let[t,n]of this.iconRequests)e.has(t)||(clearTimeout(n.timeout),n.controller.abort(),this.iconRequests.delete(t));for(let t of this.iconMisses)e.has(t)||this.iconMisses.delete(t);for(let t of e)!this.iconUrls[t]&&!this.iconMisses.has(t)&&!this.iconRequests.has(t)&&this.fetchIcon(t)}fetchIcon(e){let t=new AbortController,n=setTimeout(()=>t.abort(new DOMException(`catalog icon fetch timed out`,`TimeoutError`)),1e4),r={controller:t,timeout:n};this.iconRequests.set(e,r),we({iconUrl:e,basePath:this.context.basePath,gatewayUrl:this.context.gateway.connection.gatewayUrl,auth:{hello:this.context.gateway.snapshot.hello,settings:{token:this.context.gateway.connection.token},password:this.context.gateway.connection.password},signal:t.signal}).then(t=>{if(this.iconRequests.get(e)!==r||this.context.gateway.snapshot.phase!==`connected`||!this.currentIconUrls().has(e)){t&&URL.revokeObjectURL(t);return}t?this.iconUrls={...this.iconUrls,[e]:t}:this.iconMisses.add(e)}).catch(()=>{this.iconRequests.get(e)===r&&this.iconMisses.add(e)}).finally(()=>{clearTimeout(n),this.iconRequests.get(e)===r&&this.iconRequests.delete(e)})}invalidateIcon(e){let t=this.iconRequests.get(e);t&&(clearTimeout(t.timeout),t.controller.abort(),this.iconRequests.delete(e));let n=this.iconUrls[e];n&&URL.revokeObjectURL(n);let r={...this.iconUrls};delete r[e],this.iconUrls=r,this.iconMisses.add(e)}resetIcons(){for(let e of this.iconRequests.values())clearTimeout(e.timeout),e.controller.abort();for(let e of Object.values(this.iconUrls))URL.revokeObjectURL(e);this.iconRequests.clear(),this.iconMisses.clear(),this.iconUrls={}}async detect(){let e=this.context.gateway.snapshot.client;if(!this.canUseSetup(e))return null;this.resetVerify(),this.pageState={phase:`loading`};let t={};await this.detectTask.run([e,t]);let n=this.detectTask.value;return n?.token===t&&`value`in n?n.value:null}canVerify(e){let t=this.context.gateway.snapshot;return this.canUseSetup(e)&&A(t,`openclaw.setup.verify`)===!0}resetVerify(){this.verifyState={phase:`idle`},this.verifyTask.run([null])}async verifyConnection(){let e=this.context.gateway.snapshot.client;!this.canVerify(e)||this.actionsDisabled()||(this.verifyState={phase:`checking`},await this.verifyTask.run([e]))}async activate(e,t,n){let r=this.context.gateway.snapshot.client;!this.canUseSetup(r)||this.actionsDisabled()||(this.manualError=null,this.activationState={phase:`testing`,targetId:t,modelRef:n},await this.activationTask.run([r,e]))}activateCandidate(e){this.activate({kind:e.kind,modelRef:e.modelRef},a(e.kind,e.modelRef),e.modelRef)}connectManual(){let e=this.manualApiKey.trim();if(!this.manualProviderId||!e){this.manualError=w(`modelSetup.manual.required`);return}this.activate({kind:`api-key`,authChoice:this.manualProviderId,apiKey:e},`manual:${this.manualProviderId}`,this.manualProviderId)}selectManualProvider(e){e!==this.manualProviderId&&(this.manualApiKey=``),this.manualProviderId=e,this.manualError=null}async useManualProvider(e){this.selectManualProvider(e),await this.updateComplete;let t=this.renderRoot.querySelector(`.model-setup__manual input[type="password"]`);t?.scrollIntoView?.({block:`center`,behavior:`smooth`}),t?.focus()}async handleWizardDone(e,t){let n=e===`openclaw.setup.prepare.start`?this.pendingPrepareOption:null;if(this.pendingPrepareOption=null,n&&t){let e=R(n.id);this.wizard.close(),this.activate({kind:e,modelRef:t},a(e,t),t);return}let r=await this.detect();if(!r){this.wizard.fail(w(`modelSetup.errors.requestFailed`));return}if(e===`openclaw.setup.auth.start`&&!r.setupComplete){this.wizard.fail(w(`modelSetup.wizard.notComplete`));return}if(e===`openclaw.setup.auth.start`&&(this.activationState={phase:`success`,modelRef:r.configuredModel??w(`modelSetup.success.configuredModel`)}),n){this.pageState={phase:`ready`,result:{...r,configuredModel:void 0,setupComplete:!1}};let e=Ee(r,n.id);if(!e){this.wizard.fail(w(`modelSetup.prepare.providerNotReady`,{provider:n.label}));return}this.wizard.close(),this.activateCandidate(e);return}this.wizard.close()}cancelWizard(){this.pendingPrepareOption=null,this.wizard.cancel()}closeWizard(){this.pendingPrepareOption=null,this.wizard.close()}actionsDisabled(){return this.activationState.phase===`testing`||this.verifyState.phase===`checking`||this.wizardState.phase!==`idle`&&this.wizardState.phase!==`error`&&this.wizardState.phase!==`cancelled`}render(){let e=this.context.gateway.snapshot,t=C(e.hello?.auth??null),n=e.phase===`connected`&&A(e,`openclaw.setup.detect`)!==!0,r=t&&!n&&A(e,`openclaw.setup.verify`)===!0,i=Ze({page:this.pageState,activation:this.activationState,verify:this.verifyState,wizard:this.wizardState,wizardMode:this.wizardMode,wizardValue:this.wizardValue,canAdmin:t,canVerify:r,canPrepare:t&&!n&&A(e,`openclaw.setup.prepare.start`)===!0,gatewayTooOld:n,actionsDisabled:this.actionsDisabled(),manualProviderId:this.manualProviderId,manualApiKey:this.manualApiKey,manualError:this.manualError,moreSignInOpen:this.moreSignInOpen,firstRun:this.routeData?.firstRun===!0,iconUrls:this.iconUrls,onDetect:()=>void this.detect(),onVerify:()=>void this.verifyConnection(),onActivateCandidate:e=>this.activateCandidate(e),onStartAuth:e=>{this.pendingPrepareOption=null,this.wizardMode=`auth`,this.wizard.start(e.id)},onStartPrepare:e=>{this.pendingPrepareOption=e,this.wizardMode=`prepare`,this.wizard.start(e.id,`openclaw.setup.prepare.start`)},onManualProviderChange:e=>this.selectManualProvider(e),onUseManualProvider:e=>void this.useManualProvider(e),onManualApiKeyChange:e=>{this.manualApiKey=e,this.manualError=null},onManualConnect:()=>this.connectManual(),onMoreSignInToggle:e=>this.moreSignInOpen=e,onIconError:e=>this.invalidateIcon(e),onOpenChat:()=>{if(this.routeData?.firstRun){this.context.navigate(`custodian`,{search:`?onboarding=1`});return}this.context.navigate(`chat`)},onSuccessClose:()=>{this.activationState={phase:`idle`},this.detect()},onWizardValueChange:e=>this.wizardValue=e,onWizardAnswer:(e,t)=>void this.wizard.answer(e,t),onWizardCancel:()=>this.cancelWizard(),onWizardClose:()=>this.closeWizard()});return _`
      <section class="content-header">
        <div>
          <div class="page-title">${de(`model-setup`)}</div>
          <div class="page-subtitle">
            ${ue(`model-setup`)}
            ${xe(Q,w(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${ye(i)}
    `}},n([ce({context:fe,subscribe:!0})],$.prototype,`context`,void 0),n([oe({attribute:!1})],$.prototype,`routeData`,void 0),n([b()],$.prototype,`pageState`,void 0),n([b()],$.prototype,`activationState`,void 0),n([b()],$.prototype,`verifyState`,void 0),n([b()],$.prototype,`wizardState`,void 0),n([b()],$.prototype,`wizardMode`,void 0),n([b()],$.prototype,`wizardValue`,void 0),n([b()],$.prototype,`manualProviderId`,void 0),n([b()],$.prototype,`manualApiKey`,void 0),n([b()],$.prototype,`manualError`,void 0),n([b()],$.prototype,`moreSignInOpen`,void 0),n([b()],$.prototype,`iconUrls`,void 0),customElements.get(`openclaw-model-setup-page`)||customElements.define(`openclaw-model-setup-page`,$)}))();
//# sourceMappingURL=model-setup-page-TDaY3G7l.js.map