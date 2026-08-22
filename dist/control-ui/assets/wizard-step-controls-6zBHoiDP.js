import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{K as t,W as n,Y as r}from"./lit-runtime-D5xZwgO1.js";import{o as i,t as a}from"./control-ui-core-DkYXaYTI.js";import{N as o,P as s,gt as c,vt as l,yt as u}from"./control-ui-core-CTll8UdE.js";function d(e){return`*`.repeat(Array.from(m.segment(e)).length)}function f(e){let t=e.closest(`[data-sensitive-input]`)?.querySelector(`[data-sensitive-mask-text]`);t&&(t.textContent=d(e.value),t.style.transform=`translateX(${-e.scrollLeft}px)`)}function p(e){let n=e.revealed?e.hideLabel:e.revealLabel,i=e.className?`oc-sensitive-input ${e.className}`:`oc-sensitive-input`,a=t=>{let n=t.currentTarget;f(n),e.onInput(n.value)},o=e=>{f(e.currentTarget)};return r`
    <span
      class=${i}
      data-sensitive-input
      data-sensitive-mask-ready="true"
      data-revealed=${String(e.revealed)}
    >
      <span
        class="oc-sensitive-mask"
        aria-hidden="true"
        data-sensitive-mask
        ?hidden=${e.revealed}
      >
        <span
          data-sensitive-mask-text
          .textContent=${e.revealed?``:d(e.value)}
        ></span>
      </span>
      <input
        id=${e.id}
        class=${e.inputClassName??t}
        name=${e.name??t}
        type=${e.revealed?`text`:`password`}
        autocomplete="off"
        spellcheck="false"
        placeholder=${e.placeholder??``}
        .value=${e.value}
        ?disabled=${e.disabled}
        data-sensitive-value
        @input=${a}
        @change=${o}
        @focus=${o}
        @scroll=${o}
      />
      <openclaw-tooltip .content=${n}>
        <button
          type="button"
          class="oc-sensitive-toggle"
          aria-label=${n}
          aria-controls=${e.id}
          aria-pressed=${String(e.revealed)}
          data-sensitive-icon=${e.revealed?`eye-off`:`eye`}
          ?disabled=${e.disabled}
          @click=${e.onToggle}
        >
          ${e.revealed?l.eyeOff:l.eye}
        </button>
      </openclaw-tooltip>
    </span>
  `}var m,h=e((()=>{n(),u(),c(),m=new Intl.Segmenter(void 0,{granularity:`grapheme`})})),g=e((()=>{}));function _(e,t){return`${e.presentation===`channels`?`channels-wizard`:`wizard-step`}__${t}`}function v(e){return e.step.message?r`<div class=${_(e,`message`)}>${e.step.message}</div>`:t}function y(e,n,i){return n===`channels`?r`
      <span class="channels-wizard__option-label">
        ${i===void 0?t:i?`☑ `:`☐ `}${e.label}
      </span>
      ${e.hint?r`<span class="channels-wizard__option-hint">${e.hint}</span>`:t}
    `:r`
    <span>
      <strong>${e.label}</strong>
      ${e.hint?r`<small>${e.hint}</small>`:t}
    </span>
  `}function b(e){let n=e.deviceCode;if(!n)return t;let a=i(`modelSetup.wizard.copy`);return r`
    <div class="wizard-step__device-code">
      ${n.message?r`<div class="muted">${n.message}</div>`:t}
      <code>${n.code}</code>
      <button
        type="button"
        class="btn btn--sm"
        @click=${e=>void o(e,n.code,a)}
      >
        <span data-copy-label>${a}</span>
      </button>
      ${n.expiresInMinutes?r`<div class="muted">
            ${i(`modelSetup.wizard.expires`,{count:String(n.expiresInMinutes)})}
          </div>`:t}
    </div>
  `}function x(e,t,n,i=e.busy){let a=r`
    <button
      type=${n?`button`:`submit`}
      class="btn primary"
      ?disabled=${i}
      @click=${n}
    >
      ${e.answerLabel??t}
    </button>
  `;return e.presentation===`channels`?r`<div class="channels-wizard__footer">${a}</div>`:a}function S(e,n,i,a){let o=a.some(e=>Object.is(e,n.value));return e.presentation===`channels`?e.step.type===`select`?r`<wa-radio
          class="channels-wizard__option"
          appearance="button"
          value=${String(i)}
          .checked=${o}
        >
          ${y(n,e.presentation)}
        </wa-radio>`:r`<button
          type="button"
          class="channels-wizard__option"
          aria-pressed=${o?`true`:`false`}
          ?disabled=${e.busy}
          @click=${()=>e.onValueChange(n.value)}
        >
          ${y(n,e.presentation,o)}
        </button>`:r`<label class="wizard-step__option">
    <input
      type=${e.step.type===`select`?`radio`:`checkbox`}
      name=${e.step.type===`select`?`${e.inputId}-option`:t}
      .checked=${o}
      ?disabled=${e.busy}
      @change=${t=>{let r=e.step.type===`select`?n.value:t.currentTarget.checked?[...a,n.value]:a.filter(e=>!Object.is(e,n.value));e.onValueChange(r)}}
    />
    ${y(n)}
  </label>`}function C(e){let n=e.step;return r`
    ${v(e)}
    ${n.externalUrl?r`<a class="btn btn--sm" href=${n.externalUrl} target="_blank" rel="noreferrer">
          ${i(`modelSetup.wizard.openSignIn`)}
        </a>`:t}
    ${b(n)}
    ${x(e,i(`modelSetup.wizard.continue`),()=>e.onAnswer(void 0))}
  `}function w(e){return r`
    <div class="wizard-step__progress" role="status" aria-live="polite">
      <span class="wizard-step__spinner" aria-hidden="true"></span>
      ${v(e)}
    </div>
  `}function T(e){let n=e.step,a=typeof e.value==`string`?e.value:``,o=n.sensitive&&e.onToggleSensitiveVisibility?p({id:e.inputId,name:`wizard-text`,value:a,revealed:e.sensitiveRevealed===!0,revealLabel:i(`configForm.revealValue`),hideLabel:i(`configForm.hideValue`),inputClassName:`input`,placeholder:n.placeholder,disabled:e.busy,onInput:e.onValueChange,onToggle:e.onToggleSensitiveVisibility}):r`<input
          id=${e.inputId}
          class="input"
          name="wizard-text"
          type=${n.sensitive?`password`:`text`}
          autocomplete=${n.sensitive?`off`:`on`}
          placeholder=${n.placeholder??``}
          .value=${a}
          ?disabled=${e.busy}
          @input=${t=>e.presentation!==`channels`&&e.onValueChange(t.currentTarget.value)}
        />`;return r`
    <form
      class="wizard-step__form"
      @submit=${t=>{t.preventDefault();let n=t.currentTarget.elements.namedItem(`wizard-text`);e.onAnswer(e.presentation===`channels`?n?.value??``:a)}}
    >
      ${n.message?r`<div class=${_(e,`message`)}>
            <label for=${e.inputId}>${n.message}</label>
          </div>`:t}
      ${o} ${x(e,i(`modelSetup.wizard.submit`))}
    </form>
  `}function E(e){let n=e.step.options??[],a=e.step.type===`multiselect`,o=a?Array.isArray(e.value)?e.value:[]:[e.value];if(e.presentation===`channels`&&!a){let t=n.findIndex(t=>Object.is(t.value,e.value));return r`
      <wa-radio-group
        class="channels-wizard__options"
        label=${e.step.message??``}
        orientation="vertical"
        .value=${t>=0?String(t):null}
        ?disabled=${e.busy}
        @change=${t=>{let r=t.currentTarget.value,i=n[Number(r)];i&&e.onAnswer(i.value)}}
      >
        ${n.map((t,n)=>S(e,t,n,o))}
      </wa-radio-group>
    `}let s=a?e.presentation===`channels`?[...o]:o:e.value;return r`
    ${v(e)}
    <div class=${_(e,`options`)} role=${a?t:`radiogroup`}>
      ${n.map((t,n)=>S(e,t,n,o))}
    </div>
    ${x(e,i(`modelSetup.wizard.continue`),()=>e.onAnswer(s),e.busy||!a&&e.value===void 0)}
  `}function D(e){return r`
    ${v(e)}
    <div class=${_(e,e.presentation===`channels`?`footer`:`actions`)}>
      ${[!1,!0].map(t=>r`<button
          type="button"
          class=${t?`btn primary`:`btn`}
          ?disabled=${e.busy}
          @click=${()=>e.onAnswer(t)}
        >
          ${t?e.confirmAffirmativeLabel??i(`common.yes`):i(`common.no`)}
        </button>`)}
    </div>
  `}function O(e){switch(e.step.type){case`text`:return T(e);case`select`:case`multiselect`:return E(e);case`confirm`:return D(e);case`progress`:return e.step.executor===`gateway`?w(e):C(e);case`note`:case`action`:return C(e)}return t}var k=e((()=>{n(),a(),s(),h(),g()}));export{O as n,k as t};
//# sourceMappingURL=wizard-step-controls-6zBHoiDP.js.map