import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Gn as i,Ho as a,Kc as o,Ro as s,Vc as c,Wc as l,_s as u,bo as d,er as f,fs as p,rr as m,tr as h,vo as ee}from"./control-ui-core-BUddgKjW.js";import{K as g,Q as _,W as v,Y as y,it as te,nt as b}from"./lit-runtime-D5xZwgO1.js";import{f as ne,g as re,i as ie,m as ae,p as oe,r as se}from"./control-ui-foundation-Dgui328h.js";import{Wt as ce,_ as le,bt as ue,jt as de,v as fe,wt as pe}from"./control-ui-core-Ct5CBwjl.js";import{$t as me,At as x,Dt as S,Ft as he,en as ge}from"./control-ui-foundation-DkfOBVsU.js";import{o as C,t as w}from"./control-ui-core-s0pW0mau.js";import{i as _e,n as ve}from"./gateway-runtime-DWs8EJ0W.js";import{i as T,o as ye,r as E}from"./provider-icon-C8NbtTKP.js";import{n as be,t as xe}from"./settings-workspace-BbyrBOFl.js";import{a as D,c as O,d as k,f as A,h as Se,i as j,n as Ce,r as we,s as M,t as N,u as P}from"./settings-ui-Bko7fBdZ.js";import{h as Te,i as Ee,m as De,r as Oe}from"./thinking-BNPymYSy.js";import{n as ke,r as Ae}from"./fast-mode-BTyJtA9f.js";import{n as je,t as Me}from"./agent-scope-control-BJxpZ36W.js";import{EMPTY_MODEL_PROVIDERS_DATA as Ne,loadModelProvidersData as Pe,t as Fe}from"./load-B8RaI12y.js";import{n as Ie,r as Le,t as Re}from"./usage-DjIKdj36.js";function F(e){return e instanceof Error&&e.message.trim()?e.message:typeof e==`string`&&e.trim()?e:C(`modelProviders.requestFailed`)}async function ze(e,t){let{agentEpoch:n,runtimeConfig:r}=e;e.setBusy(!0),e.setMessage(null);try{if(await r.ensureLoaded(),!e.isCurrentClient())return{ok:!1};let i=await r.patch({raw:t.raw,note:t.note,...t.replacePaths?{replacePaths:t.replacePaths}:{}});if(!e.isCurrentClient())return{ok:!1};if(!i)return e.isCurrentAgent()&&e.setMessage({kind:`error`,text:r.state.lastError??C(`modelProviders.configUnavailable`)}),{ok:!1};let a=null;try{await r.refresh(),a=r.state.lastError,!a&&e.isCurrentClient()&&await e.refreshProviders()}catch(e){a=F(e)}return e.isCurrentClient()?(e.isCurrentAgent()&&e.setMessage({kind:`success`,text:t.success,...a?{warning:a}:{}}),{ok:!0,agentEpoch:n,warning:a}):{ok:!1}}catch(t){return e.isCurrentClient()&&e.isCurrentAgent()&&e.setMessage({kind:`error`,text:F(t)}),{ok:!1}}finally{e.isCurrentClient()&&e.isCurrentAgent()&&e.setBusy(!1)}}var Be=e((()=>{w()}));function I(e){return ge(e)}var L=e((()=>{me()})),Ve=e((()=>{he()}));function He(e,t){if(!e)return;let n=I(e);if(n===`openai`&&(t?.credentialType===`oauth`||t?.credentialType===`token`))return`openai`;if(n!==`openai`)return n===`claude-cli`?`anthropic`:n===`minimax-portal`||n===`minimax-cn`||n===`minimax-portal-cn`?`minimax`:n||void 0}var Ue=e((()=>{L(),Ve()}));function R(e){let t=e.trim().toLowerCase();return He(t)??t}function We(e){switch(e.status){case`ok`:case`expiring`:case`expired`:case`missing`:return e.status;default:return`api-key`}}function Ge(e,t){if(!e)return t;let n=U.indexOf(t.kind)<U.indexOf(e.kind)?t:e;return{kind:n.kind,profileCount:e.profileCount+t.profileCount,...n.expiryLabel?{expiryLabel:n.expiryLabel}:{}}}function z(e,t){return e.find(e=>t.some(t=>e.ids.has(t)))}function B(e,t,n){let r=z(e,[t]);if(r)return r;let i={ids:new Set([t]),card:{id:t,displayName:n,profiles:[],credentialProviderIds:[],logoutTargets:[],hasConfigApiKey:!1,modelCount:0,availableModelCount:0},hasAuthRow:!1,hasUsageSnapshot:!1};return e.push(i),i}function V(e,t){let n=I(t);n&&!e.some(e=>I(e)===n)&&e.push(t)}function Ke(e,t,n){if(n.length===0)return;let r=I(t),i=e.find(e=>I(e.provider)===r);if(!i){e.push({provider:t,profileIds:[...new Set(n)]});return}i.profileIds=[...new Set([...i.profileIds,...n])]}function qe(e){let t=[],n=new Map;for(let t of e.catalogModels??[]){let e=R(t.provider);!e||t.apiKeySupported===void 0||n.set(e,n.get(e)===!0||t.apiKeySupported)}for(let n of e.configProviderIds??[]){let e=R(n);e&&(B(t,e,T(e)).card.configKey??=n)}for(let n of e.configApiKeyProviderIds??[]){let e=R(n);if(e){let r=B(t,e,T(e)).card;r.configKey=n,r.hasConfigApiKey=!0,V(r.credentialProviderIds,n)}}for(let[n,r]of Object.entries(e.configProviderAuthModes??{})){let e=R(n);e&&(B(t,e,T(e)).card.configAuthMode=r)}for(let n of e.models??[]){let e=R(n.provider);if(!e)continue;let r=B(t,e,T(e));r.card.modelCount+=1,n.available===!0&&(r.card.availableModelCount+=1)}for(let n of e.authStatus?.providers??[]){let e=R(n.provider);if(!e)continue;let r=n.usage?R(n.usage.providerId):e,i=[...new Set([e,r])],a=z(t,i)??B(t,r,T(r));for(let e of i)a.ids.add(e);a.card.displayName=n.displayName||a.card.displayName,a.card.auth=Ge(a.hasAuthRow?a.card.auth:void 0,{kind:We(n),profileCount:n.profiles.length,...n.expiry?.label?{expiryLabel:n.expiry.label}:{}}),a.card.profiles.push(...n.profiles),(n.apiKey||n.profiles.length>0)&&V(a.card.credentialProviderIds,n.provider),Ke(a.card.logoutTargets,n.provider,n.profiles.filter(e=>e.logoutSupported===!0).map(e=>e.profileId)),a.card.apiKey??=n.apiKey,a.hasAuthRow=!0;let o=n.usage;o&&!a.card.usage&&(a.card.usage={provider:o.providerId,displayName:n.displayName,windows:o.windows,...o.summary?{summary:o.summary}:{},...o.plan?{plan:o.plan}:{},...o.billing?.length?{billing:o.billing}:{}})}for(let n of e.providerUsage?.providers??[]){let e=R(n.provider);if(!e)continue;let r=z(t,[e])??B(t,e,n.displayName||T(e));r.ids.add(e),r.card.usage=n,r.hasUsageSnapshot=!0}for(let n of e.costByProvider??[]){let e=R(n.provider??``);if(!e)continue;let r=z(t,[e])??B(t,e,T(e)),i={totalCost:n.totals.totalCost,totalTokens:n.totals.totalTokens,sessionCount:n.count},a=r.card.localCost;r.card.localCost=a?{totalCost:a.totalCost+i.totalCost,totalTokens:a.totalTokens+i.totalTokens,sessionCount:a.sessionCount+i.sessionCount}:i}return t.filter(t=>t.hasAuthRow||(e.configProviderIds??[]).some(e=>R(e)===t.card.id)||t.hasUsageSnapshot||!!t.card.usage||t.card.modelCount>0||(t.card.localCost?.totalTokens??0)>0).map(e=>{let t=n.get(e.card.id);return Object.assign({},e.card,t===void 0?{}:{apiKeySupported:t})}).toSorted((e,t)=>e.displayName.localeCompare(t.displayName))}function H(e){return e.selectionRef===void 0?e.id.startsWith(`${e.provider}/`)?e.id:`${e.provider}/${e.id}`:e.selectionRef}function Je(e,t){let n=new Set([t.primary,...t.fallbacks,t.utilityModel].filter(e=>typeof e==`string`&&e.length>0)),r=(e??[]).filter(e=>e.available!==!1||n.has(H(e))),i=new Set(r.map(H));for(let t of n){if(i.has(t))continue;let n=t.indexOf(`/`);if(n<=0||n===t.length-1){let n=t.trim().toLowerCase(),i=(e??[]).find(e=>e.alias?.trim().toLowerCase()===n||e.id.trim()===t.trim());r.push({...i??{provider:``,id:t,name:t,available:!1},selectionRef:t});continue}r.push({provider:t.slice(0,n),id:t.slice(n+1),name:t,available:!1})}return r}function Ye(e){let t=S(S(e?.models)?.providers),n=S(S(e?.agents)?.defaults),r=n?.model,i=S(r),a=typeof r==`string`?r:typeof i?.primary==`string`?i.primary:``,o=Array.isArray(i?.fallbacks)?i.fallbacks.filter(e=>typeof e==`string`):[];return{providerIds:Object.keys(t??{}),apiKeyProviderIds:Object.entries(t??{}).filter(([,e])=>{let t=S(e);return t?Object.hasOwn(t,`apiKey`)&&t.apiKey!=null:!1}).map(([e])=>e),providerAuthModes:Object.fromEntries(Object.entries(t??{}).flatMap(([e,t])=>{let n=S(t)?.auth;return typeof n==`string`?[[e,n]]:[]})),defaults:{primary:a,fallbacks:o,utilityModel:typeof n?.utilityModel==`string`?n.utilityModel:null}}}function Xe(e,t){let n=new Set(Array.from(t,R)),r=new Map;for(let t of e??[]){let e=R(t.provider);t.apiKeySupported===!0&&e&&!n.has(e)&&!r.has(e)&&r.set(e,{id:e,displayName:T(e)})}return[...r.values()].toSorted((e,t)=>e.displayName.localeCompare(t.displayName))}var U,W=e((()=>{L(),x(),Ue(),E(),U=[`expired`,`missing`,`expiring`,`ok`,`api-key`]}));function Ze(e){let t=e?.thinkingDefault,n=e?.fastModeDefault;return{thinkingLevel:typeof t==`string`?t:void 0,thinkingOverridden:e!==null&&Object.hasOwn(e,`thinkingDefault`),fastMode:n===`auto`||typeof n==`boolean`?n:void 0,fastModeOverridden:e!==null&&Object.hasOwn(e,`fastModeDefault`)}}var Qe=e((()=>{}));function G(e,t){return{models:{providers:{[e]:{apiKey:t}}}}}function $e(e,t,n){return{agents:{defaults:{model:t.length>0?{primary:e,fallbacks:[...t]}:e,utilityModel:n}}}}var K,et=e((()=>{K=[`agents.defaults.model.fallbacks`]})),tt=e((()=>{}));function nt(e){let t=new Map,n=new Set;for(let r of e){let e=H(r);if(n.has(e))continue;n.add(e);let i=r.provider||`saved-selection`,a=t.get(i)??{provider:i,label:r.provider?T(r.provider):C(`modelProviders.defaults.savedSelection`),models:[]};a.models.push({ref:e,label:r.name||e}),t.set(i,a)}let r=[...t.values()];for(let e of r)e.models=e.models.toSorted((e,t)=>e.label.localeCompare(t.label));return r.toSorted((e,t)=>e.label.localeCompare(t.label))}function q(e,t=``){return nt(e).map(e=>y`
      <optgroup label=${e.label}>
        ${e.models.map(e=>y`<option value=${e.ref} ?selected=${e.ref===t}>
              ${e.label}
            </option>`)}
      </optgroup>
    `)}function rt(e){let t=!e.canMutate||e.models.length===0,n=!!e.busy.defaults,r=e.mutationBlockedReason??``,i=y`
    <div class="settings-row settings-row--stacked model-providers__defaults">
      ${e.models.length===0?y`<div class="callout warning">${C(`modelProviders.defaults.noModels`)}</div>`:g}
      <div class="model-providers__default-grid">
        <label class="field">
          <span>${C(`modelProviders.defaults.primary`)}</span>
          <select
            class="settings-select"
            .value=${e.selection.primary}
            ?disabled=${t||n}
            title=${r}
            @change=${t=>e.onPrimaryChange(t.target.value)}
          >
            <option value="" ?disabled=${!!e.selection.primary}>
              ${C(`modelProviders.defaults.selectModel`)}
            </option>
            ${q(e.models,e.selection.primary)}
          </select>
        </label>
        <label class="field">
          <span>${C(`modelProviders.defaults.utility`)}</span>
          <select
            class="settings-select"
            .value=${e.selection.utilityModel??J}
            ?disabled=${t||n}
            title=${r}
            @change=${t=>{let n=t.target.value;e.onUtilityChange(n===J?null:n)}}
          >
            <option value=${J}>
              ${C(`modelProviders.defaults.automatic`)}
            </option>
            <option value="">${C(`modelProviders.defaults.disabled`)}</option>
            ${q(e.models,e.selection.utilityModel??``)}
          </select>
        </label>
      </div>
      <div class="model-providers__fallbacks">
        <div class="model-providers__fallback-heading">
          <span>${C(`modelProviders.defaults.fallbacks`)}</span>
          ${n?y`<span class="muted">${C(`modelProviders.saving`)}</span>`:g}
        </div>
        ${e.selection.fallbacks.length===0?y`<div class="card-sub">${C(`modelProviders.defaults.noFallbacks`)}</div>`:e.selection.fallbacks.map((i,a)=>y`
                <div class="model-providers__fallback-row">
                  <code>${i}</code>
                  <button
                    class="btn btn--sm"
                    ?disabled=${t||n}
                    title=${r}
                    @click=${()=>e.onFallbackRemove(a)}
                  >
                    ${C(`common.remove`)}
                  </button>
                </div>
              `)}
        <label class="field model-providers__fallback-add">
          <span>${C(`modelProviders.defaults.addFallback`)}</span>
          <select
            class="settings-select"
            .value=${``}
            ?disabled=${t||n||!e.selection.primary}
            title=${r}
            @change=${t=>{let n=t.target;n.value&&=(e.onFallbackAdd(n.value),``)}}
          >
            <option value="">${C(`modelProviders.defaults.selectFallback`)}</option>
            ${q(e.models.filter(t=>{let n=H(t);return n!==e.selection.primary&&!e.selection.fallbacks.includes(n)}))}
          </select>
        </label>
      </div>
      ${e.message?y`<div
            class="callout ${e.message.kind}"
            role=${e.message.kind===`error`?`alert`:`status`}
          >
            ${e.message.text}
          </div>`:g}
      ${e.message?.warning?y`<div class="callout warning" role="status">${e.message.warning}</div>`:g}
    </div>
  `;return P({title:C(`modelProviders.defaults.title`),description:C(`modelProviders.defaults.subtitle`),actions:y`
        <div class="model-providers__form-actions">
          ${e.dirty?y`<span class="muted">${C(`modelProviders.defaults.unsaved`)}</span>`:g}
          <button class="btn btn--sm" ?disabled=${n||!e.dirty} @click=${e.onReset}>
            ${C(`common.cancel`)}
          </button>
          <button
            class="btn primary btn--sm"
            ?disabled=${t||n||!e.dirty||!e.selection.primary}
            title=${r}
            @click=${e.onSave}
          >
            ${C(n?`modelProviders.saving`:`common.save`)}
          </button>
        </div>
      `},i)}var J,it=e((()=>{v(),E(),N(),w(),W(),J=`__openclaw_automatic_utility__`}));function at(e){return e===`auto`?`auto`:e===`on`}function Y(e){return!e.canMutate||e.configBusy}function ot(e){return e?y`
    <div class="callout ${e.kind}" role=${e.kind===`error`?`alert`:`status`}>
      ${e.text}
    </div>
    ${e.warning?y`<div class="callout warning" role="status">${e.warning}</div>`:g}
  `:g}function st(e){let t=e.thinkingLevel&&!Q.has(e.thinkingLevel)?[...Z,e.thinkingLevel]:Z,n=we({value:C(`quickSettings.model.modelPolicy`),overridden:e.thinkingOverridden,disabled:e.configBusy,onReset:e.onThinkingReset}),r=we({value:C(`quickSettings.model.modelPolicy`),overridden:e.fastModeOverridden,disabled:e.configBusy,onReset:e.onFastModeReset}),i=e.fastMode===void 0?``:ke(e.fastMode);return y`
    <div id=${ee.behavior}>
      ${P({title:C(`quickSettings.model.title`)},[O({title:C(`quickSettings.model.thinking`),description:n.description,control:y`
            ${k({value:e.thinkingLevel??``,options:[{value:``,label:C(`quickSettings.model.default`)},...t.map(e=>({value:e,label:Q.has(e)?C(`quickSettings.model.thinkingLevels.${e}`):Oe(e)}))],disabled:e.configBusy,onChange:(t,n)=>t===``?e.onThinkingReset():e.onThinkingChange(t,n)})}
            ${n.action}
          `}),O({title:C(`quickSettings.model.fastMode`),description:r.description,control:y`
            ${k({value:i,options:[{value:``,label:C(`quickSettings.model.default`)},{value:`auto`,label:C(`quickSettings.model.fastModes.auto`)},{value:`on`,label:C(`quickSettings.model.fastModes.fast`)},{value:`off`,label:C(`quickSettings.model.fastModes.standard`)}],disabled:e.configBusy,onChange:t=>{t===``?e.onFastModeReset():t!==i&&e.onFastModeChange(at(t))}})}
            ${r.action}
          `})])}
    </div>
  `}function ct(e){let t=e.auth;if(!t)return g;let n=C(St[t.kind]);return y`
    <span title=${(t.expiryLabel?C(`modelProviders.expiresIn`,{time:t.expiryLabel}):void 0)??n}>
      ${A({kind:Ct[t.kind],label:n})}
    </span>
  `}function lt(e){return e.hasConfigApiKey||!!e.apiKey||e.profiles.length>0}function X(e){return e.auth?.kind===`ok`}function ut(e){return e.auth?.kind===`expired`||e.auth?.kind===`missing`||e.auth?.kind===`expiring`||!lt(e)?ct(e):e.availableModelCount>0&&(X(e)||!e.auth)?A({kind:`ok`,label:C(`modelProviders.status.ready`)}):X(e)?A({kind:`muted`,label:C(`modelProviders.status.ok`)}):ct(e)}function dt(e){return e.modelCount===0?null:e.availableModelCount<e.modelCount?C(`modelProviders.modelsAvailable`,{available:String(e.availableModelCount),count:String(e.modelCount)}):e.modelCount===1?C(`modelProviders.modelOne`):C(`modelProviders.models`,{count:String(e.modelCount)})}function ft(e){if(e>=1e9){let t=e/1e9;return t<10?`${t.toFixed(1)}B`:`${Math.round(t)}B`}return h(e)}function pt(e,t){let n=e.localCost;return!n||n.totalTokens===0&&n.totalCost===0?g:y`
    <div class="model-providers__local-cost">
      <div class="provider-usage-billing-row">
        <span>${C(`modelProviders.localCost`,{days:String(t)})}</span>
        <strong>${i(n.totalCost)}</strong>
      </div>
      <div class="model-providers__local-cost-detail">
        ${C(`modelProviders.localCostDetail`,{tokens:ft(n.totalTokens),sessions:String(n.sessionCount)})}
      </div>
    </div>
  `}function mt(e,t){let n=e.profiles.filter(e=>e.type===`oauth`).length,r=e.profiles.filter(e=>e.type===`token`).length,i=e.profiles.filter(e=>e.type===`api_key`).length,a=[];return n>0&&a.push(C(`modelProviders.credentials.oauth`,{count:String(n)})),r>0&&a.push(C(`modelProviders.credentials.tokenProfiles`,{count:String(r)})),e.apiKey?.source===`config`||!e.apiKey&&e.hasConfigApiKey?a.push(C(`modelProviders.credentials.configKey`)):e.apiKey?.source===`env`?a.push(e.apiKey.envVar?C(`modelProviders.credentials.envKeyNamed`,{name:e.apiKey.envVar}):C(`modelProviders.credentials.envKey`)):i>0&&a.push(C(`modelProviders.credentials.profileKey`,{count:String(i)})),y`
    <div class="model-providers__credentials">
      <span>${C(`modelProviders.credentials.label`,{agent:t})}</span>
      <strong
        >${a.length>0?a.join(` · `):C(`modelProviders.credentials.none`)}</strong
      >
    </div>
  `}function ht(e){return e?y`
    <div
      class="model-providers__probe model-providers__probe--${e.status===`ok`?`success`:`error`}"
      role="status"
    >
      <div class="model-providers__probe-summary">
        <strong>${C(`modelProviders.probe.status.${e.status}`)}</strong>
        ${e.latencyMs===void 0?g:y`<span
              >${C(`modelProviders.probe.latency`,{ms:String(e.latencyMs)})}</span
            >`}
      </div>
      ${e.error?y`<div>${e.error}</div>`:g}
      ${e.results.map(e=>y`
          <div class="model-providers__probe-target">
            <span>${e.label}</span>
            <span>
              ${C(`modelProviders.probe.status.${e.status}`)}${e.latencyMs===void 0?``:` · ${C(`modelProviders.probe.latency`,{ms:String(e.latencyMs)})}`}
            </span>
            ${e.error?y`<small>${e.error}</small>`:g}
          </div>
        `)}
    </div>
  `:g}function gt(e,t){if(t.keyEditorProvider!==e.id)return g;let n=!!t.busy[`key:${e.id}`],r=e.apiKeySupported===!1||!!(e.configAuthMode&&e.configAuthMode!==`api-key`),i=Y(t);return y`
    <div class="model-providers__inline-form">
      <label class="field">
        <span>${C(`modelProviders.apiKey.label`)}</span>
        <input
          type="password"
          autocomplete="off"
          placeholder=${e.apiKey?.source===`config`?C(`modelProviders.apiKey.replacePlaceholder`):C(`modelProviders.apiKey.placeholder`)}
          .value=${t.keyDraft}
          ?disabled=${n||i||r}
          @input=${e=>t.onKeyDraftChange(e.target.value)}
        />
      </label>
      <div class="model-providers__form-actions">
        <button
          class="btn primary btn--sm"
          ?disabled=${n||i||r||!t.keyDraft.trim()}
          @click=${()=>t.onSaveKey(e.id,e.configKey??e.id)}
        >
          ${C(n?`modelProviders.saving`:`common.save`)}
        </button>
        <button class="btn btn--sm" ?disabled=${n} @click=${()=>t.onCloseKeyEditor()}>
          ${C(`common.cancel`)}
        </button>
      </div>
    </div>
  `}function _t(e,t){let n=e.credentialProviderIds.length?e.credentialProviderIds:[e.id],r=e.hasConfigApiKey||!!e.apiKey||e.profiles.length>0,i=e.logoutTargets.length>0,a=!!t.busy[`probe:${e.id}`],o=!!t.busy[`key:${e.id}`],s=!!t.busy[`logout:${e.id}`],c=t.mutationBlockedReason??``,l=!!(e.configAuthMode&&e.configAuthMode!==`api-key`),u=e.apiKeySupported===!1,d=Y(t),f=l?C(`modelProviders.apiKey.authModeBlocked`,{mode:e.configAuthMode??``}):c;return y`
    <div class="model-providers__card-actions">
      ${r?y`
            <button
              class="btn btn--sm"
              ?disabled=${a||!t.canMutate||!t.probeAvailable}
              title=${t.probeAvailable?c:C(`modelProviders.probe.unavailable`)}
              @click=${()=>t.onProbe(e.id,n)}
            >
              ${C(a?`modelProviders.probe.testing`:`modelProviders.probe.test`)}
            </button>
          `:g}
      ${u?g:y`
            <button
              class="btn btn--sm"
              ?disabled=${o||d||l}
              title=${f}
              @click=${()=>t.onOpenKeyEditor(e.id)}
            >
              ${e.hasConfigApiKey?C(`modelProviders.apiKey.replace`):C(`modelProviders.apiKey.set`)}
            </button>
          `}
      ${e.hasConfigApiKey?y`
            <button
              class="btn btn--sm danger"
              ?disabled=${o||d||l}
              title=${f}
              @click=${()=>t.onRemoveKey(e.id,e.configKey??e.id)}
            >
              ${C(`modelProviders.apiKey.remove`)}
            </button>
          `:g}
      ${i?y`
            <button
              class="btn btn--sm"
              ?disabled=${s||d}
              title=${c}
              @click=${()=>t.onRequestLogout(e.id)}
            >
              ${C(`modelProviders.logout.action`)}
            </button>
          `:g}
    </div>
    ${t.pendingLogoutProvider===e.id?y`
          <div class="model-providers__confirm" role="alert">
            <span>${C(`modelProviders.logout.confirm`,{provider:e.displayName})}</span>
            <div class="model-providers__form-actions">
              <button
                class="btn danger btn--sm"
                ?disabled=${s||d}
                @click=${()=>t.onLogout(e.id,e.logoutTargets)}
              >
                ${C(s?`modelProviders.logout.loggingOut`:`modelProviders.logout.action`)}
              </button>
              <button class="btn btn--sm" ?disabled=${s} @click=${t.onCancelLogout}>
                ${C(`common.cancel`)}
              </button>
            </div>
          </div>
        `:g}
  `}function vt(e,t){let n=dt(e),r=t.messages[`key:${e.id}`]??t.messages[e.id];return y`
    <div
      class="settings-row settings-row--stacked model-providers__row"
      data-provider-id=${e.id}
    >
      <div class="model-providers__head">
        <div class="model-providers__identity">
          ${ye(e.id,{className:`model-providers__icon`})}
          <div class="settings-row__text">
            <span class="settings-row__title">${e.displayName}</span>
            <span class="settings-row__desc"
              >${e.id}${n?y` · ${n}`:g}</span
            >
          </div>
        </div>
        <div class="settings-row__control">
          ${e.usage?.plan?Se(e.usage.plan):g}
          ${ut(e)}
        </div>
      </div>
      ${mt(e,t.credentialAgentLabel)}
      <div class="model-providers__global-metrics">
        <div class="model-providers__global-metrics-title">${C(`modelProviders.globalUsage`)}</div>
        ${e.usage?Le(e.usage):y`<div class="model-providers__no-stats">${C(`modelProviders.noStats`)}</div>`}
        ${pt(e,t.costDays)}
      </div>
      ${_t(e,t)} ${gt(e,t)}
      ${ht(t.probeResults[e.id])} ${ot(r)}
    </div>
  `}function yt(e){let t=!!e.busy.add,n=Y(e)||t,r=y`
    ${e.unconfiguredProviders.length===0?j(C(`modelProviders.add.none`)):g}
    ${e.addProviderOpen?y`
          <div class="settings-row settings-row--stacked">
            <div class="model-providers__add-form">
              <label class="field">
                <span>${C(`modelProviders.add.provider`)}</span>
                <select
                  class="settings-select"
                  .value=${e.addProviderId}
                  ?disabled=${n}
                  @change=${t=>e.onAddProviderIdChange(t.target.value)}
                >
                  <option value="">${C(`modelProviders.add.selectProvider`)}</option>
                  ${e.unconfiguredProviders.map(e=>y`<option value=${e.id}>${e.displayName}</option>`)}
                </select>
              </label>
              <label class="field">
                <span>${C(`modelProviders.apiKey.label`)}</span>
                <input
                  type="password"
                  autocomplete="off"
                  placeholder=${C(`modelProviders.apiKey.placeholder`)}
                  .value=${e.addProviderKey}
                  ?disabled=${n}
                  @input=${t=>e.onAddProviderKeyChange(t.target.value)}
                />
              </label>
              <button
                class="btn primary"
                ?disabled=${n||!e.addProviderId||!e.addProviderKey.trim()}
                @click=${e.onAddProvider}
              >
                ${e.busy.add?C(`modelProviders.saving`):C(`modelProviders.add.save`)}
              </button>
            </div>
            ${ot(e.messages.add)}
          </div>
        `:g}
  `;return P({title:C(`modelProviders.add.title`),description:C(`modelProviders.add.subtitle`),actions:y`
        <button
          class="btn btn--sm"
          ?disabled=${t||!e.addProviderOpen&&(Y(e)||e.unconfiguredProviders.length===0)}
          title=${e.mutationBlockedReason??``}
          @click=${e.onAddProviderToggle}
        >
          ${e.addProviderOpen?C(`common.cancel`):C(`modelProviders.add.action`)}
        </button>
      `},r)}function bt(e){let t=e.cards.some(X);return y`
    <div class="model-providers__setup" data-model-readiness="model-required">
      ${P({title:C(`modelProviders.readiness.title`)},O({title:C(`modelProviders.readiness.heading`),description:C(t?`modelProviders.readiness.signedInNoModels`:`modelProviders.readiness.notConfigured`),control:y`
            ${A({kind:`warn`,label:C(t?`modelProviders.readiness.noModels`:`modelProviders.readiness.modelRequired`)})}
            <button class="btn primary" @click=${e.onOpenModelSetup}>
              ${C(t?`modelProviders.readiness.chooseProvider`:`modelSetup.heading`)}
            </button>
          `}))}
    </div>
  `}function xt(e){if(!e.connected)return M(D(j(C(`modelProviders.disconnected`))));if(e.loading)return M(y`
      ${st(e)}
      <div aria-busy="true">${D(j(C(`common.loading`)))}</div>
    `);let t=y`
    ${e.error?y`
          <div class="settings-row">
            <div class="settings-row__text">
              <span class="settings-row__desc provider-usage-error">${e.error}</span>
            </div>
          </div>
        `:g}
    ${e.cards.length===0?j(y`<strong>${C(`modelProviders.emptyTitle`)}</strong><br />${C(`modelProviders.emptySubtitle`)}`):e.cards.map(t=>vt(t,e))}
  `;return M(y`
    ${e.configuredModels.some(e=>e.available!==!1)?rt({models:e.configuredModels,selection:e.defaultModels,dirty:e.defaultModelsDirty,canMutate:!Y(e),mutationBlockedReason:e.mutationBlockedReason,busy:e.busy,message:e.messages.defaults,onPrimaryChange:e.onPrimaryChange,onFallbackAdd:e.onFallbackAdd,onFallbackRemove:e.onFallbackRemove,onUtilityChange:e.onUtilityChange,onSave:e.onDefaultModelsSave,onReset:e.onDefaultModelsReset}):bt(e)}
    ${st(e)}
    ${P({title:C(`modelProviders.title`),description:e.updatedAt?C(`modelProviders.updated`,{time:f(e.updatedAt)}):C(`modelProviders.subtitle`),count:e.cards.length,actions:y`
          <button
            class="btn btn--sm"
            ?disabled=${e.refreshing}
            @click=${()=>e.onRefresh()}
          >
            ${e.refreshing?C(`modelProviders.refreshing`):C(`common.refresh`)}
          </button>
        `},t)}
    ${yt(e)}
    ${e.mutationBlockedReason?y`<div class="callout warning">${e.mutationBlockedReason}</div>`:g}
  `)}var Z,Q,St,Ct,wt=e((()=>{v(),Te(),Ae(),E(),Ie(),N(),w(),Ee(),m(),d(),tt(),Re(),it(),Z=De.filter(e=>e!==`minimal`),Q=new Set(Z),St={ok:`modelProviders.status.ok`,expiring:`modelProviders.status.expiring`,expired:`modelProviders.status.expired`,missing:`modelProviders.status.missing`,"api-key":`modelProviders.status.apiKey`},Ct={ok:`ok`,expiring:`warn`,expired:`danger`,missing:`danger`,"api-key":`muted`}}));function Tt(e){return/method (?:not found|not supported)|unknown method/iu.test(F(e))}function Et(e,t){if(t.length===1)return t[0];let n=t.some(e=>e.status===`ok`)?`ok`:Ot.find(e=>t.some(t=>t.status===e))??`unknown`,r=t.find(e=>e.status===n)?.error;return{provider:e,status:n,...r?{error:r}:{},results:t.flatMap(e=>e.results.map(t=>({...t,label:`${e.provider}: ${t.label}`})))}}var Dt,Ot,$;e((()=>{se(),ne(),x(),v(),_(),de(),fe(),pe(),Me(),N(),xe(),w(),s(),ve(),p(),o(),c(),Be(),W(),Fe(),Qe(),et(),wt(),t(),Dt=`https://docs.openclaw.ai/concepts/model-providers`,Ot=[`auth`,`billing`,`rate_limit`,`timeout`,`format`,`no_model`,`unknown`],$=class extends l{constructor(...e){super(...e),this.data=null,this.busy={},this.messages={},this.probeResults={},this.probeUnsupported=!1,this.keyEditorProvider=null,this.keyDraft=``,this.pendingLogoutProvider=null,this.addProviderOpen=!1,this.addProviderId=``,this.addProviderKey=``,this.defaultsDraft=null,this.selectedAgentId=`main`,this.dataClient=null,this.observedClient=null,this.clientEpoch=0,this.agentEpoch=0,this.probeEpochs=new Map,this.refreshTask=new oe(this,{autoRun:!1,args:()=>[this.context?.gateway.snapshot.phase===`connected`?this.context.gateway.snapshot.client??null:null,this.selectedAgentId,!1],task:([e,t,n],{signal:r})=>e?Pe(e,{agentId:t,...n?{refresh:!0}:{},signal:r}).then(t=>({client:e,data:t})):ae,onComplete:({client:e,data:t})=>{this.data=t,this.dataClient=e}}),this.subscriptions=new r(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t),e=>{!e.state.configSnapshot&&!e.state.configLoading&&e.ensureLoaded().catch(()=>void 0)}).watch(()=>this.context?.overlays,(e,t)=>e.subscribe(t)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t),()=>this.syncSelectedAgent()).effect(()=>this.context?.agentSelection,e=>e.subscribe(()=>this.syncSelectedAgent()))}disconnectedCallback(){this.refreshTask.run([null,this.selectedAgentId,!1]),this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){if(e.has(`routeData`)&&this.routeData){let e=this.resolveSelectedAgentId();this.setSelectedAgent(e),this.routeData.agentId===e?(this.data=this.routeData.data,this.dataClient=this.routeData.client):(this.data=null,this.dataClient=null)}}updated(){let e=this.context.gateway.snapshot;e.client!==this.observedClient&&this.resetClientState(e.client),!this.context.agents.state.agentsList&&!this.context.agents.state.agentsLoading&&this.context.agents.ensureList(),!(e.phase!==`connected`||!e.client||this.refreshTask.status===re.PENDING)&&(this.data===null||this.data.updatedAt===null||e.client!==this.dataClient)&&this.refresh({force:!1})}resetClientState(e){this.observedClient=e,this.clientEpoch+=1,this.refreshTask.run([null,this.selectedAgentId,!1]),this.busy={},this.messages={},this.probeResults={},this.probeEpochs=new Map,this.probeUnsupported=!1,this.keyEditorProvider=null,this.keyDraft=``,this.pendingLogoutProvider=null,this.addProviderOpen=!1,this.addProviderId=``,this.addProviderKey=``,this.defaultsDraft=null,e!==this.dataClient&&(this.data=null)}isCurrentClient(e,t){return this.clientEpoch===t&&this.observedClient===e&&this.context.gateway.snapshot.client===e}resolveSelectedAgentId(){let e=this.context.agents.state.agentsList,t=this.context.agentSelection.state.scopeId,n=t?u(t):null,r=new Set(e?.agents.map(e=>u(e.id))??[]);return n&&r.has(n)?n:u(e?.defaultId??e?.agents[0]?.id??`main`)}setSelectedAgent(e){return e===this.selectedAgentId?!1:(this.selectedAgentId=e,this.agentEpoch+=1,this.busy={},this.pendingLogoutProvider=null,this.messages={},this.probeResults={},!0)}syncSelectedAgent(){let e=this.resolveSelectedAgentId();this.setSelectedAgent(e)&&(this.refreshTask.run([null,e,!1]),this.data=null,this.requestUpdate())}refresh(e){let t=this.context.gateway.snapshot.client;return t?this.refreshTask.run([t,this.selectedAgentId,e.force]):Promise.resolve()}mutationBlockedReason(){let e=this.context.gateway.snapshot;return e.phase===`connected`?ue(e.hello?.auth??null)?!e.client||!this.data?.config?C(`modelProviders.configUnavailable`):null:C(`modelProviders.readOnly.adminRequired`):C(`modelProviders.readOnly.disconnected`)}canMutate(){return this.mutationBlockedReason()===null&&!this.configBusy()}configBusy(){let e=this.context.runtimeConfig.state,t=this.context.overlays.snapshot;return e.configLoading||e.configSaving||e.configApplying||t.updateRunning||t.updateReconciliationPending}setBusy(e,t){let n={...this.busy};t?n[e]=!0:delete n[e],this.busy=n}setMessage(e,t){let n={...this.messages};t?n[e]=t:delete n[e],this.messages=n}clearProbe(e){this.probeEpochs.set(e,(this.probeEpochs.get(e)??0)+1),this.setBusy(`probe:${e}`,!1);let t={...this.probeResults};delete t[e],this.probeResults=t}async patchConfig(e){if(!this.canMutate()||this.busy[e.key])return{ok:!1};let t=this.context.gateway.snapshot.client;if(!t)return{ok:!1};let n=this.clientEpoch,r=this.agentEpoch;return ze({runtimeConfig:this.context.runtimeConfig,agentEpoch:r,isCurrentClient:()=>this.isCurrentClient(t,n),isCurrentAgent:()=>this.agentEpoch===r,refreshProviders:()=>this.refresh({force:!0}),setBusy:t=>this.setBusy(e.key,t),setMessage:t=>this.setMessage(e.key,t)},e)}openKeyEditor(e){this.keyEditorProvider=e,this.keyDraft=``,this.setMessage(e,null)}closeKeyEditor(){this.keyEditorProvider=null,this.keyDraft=``}async saveKey(e,t){let n=this.keyDraft.trim();if(!n)return;this.clearProbe(e),this.setMessage(e,null),this.setMessage(`key:${e}`,null);let r=await this.patchConfig({key:`key:${e}`,raw:G(t,n),note:C(`modelProviders.notes.saveKey`,{provider:e}),success:C(`modelProviders.apiKey.saved`)});r.ok&&this.agentEpoch===r.agentEpoch&&(this.setMessage(`key:${e}`,null),this.keyEditorProvider===e&&this.keyDraft.trim()===n&&this.closeKeyEditor(),this.setMessage(e,{kind:`success`,text:C(`modelProviders.apiKey.saved`),...r.warning?{warning:r.warning}:{}}))}async removeKey(e,t){this.clearProbe(e),this.setMessage(e,null),this.setMessage(`key:${e}`,null);let n=await this.patchConfig({key:`key:${e}`,raw:G(t,null),note:C(`modelProviders.notes.removeKey`,{provider:e}),success:C(`modelProviders.apiKey.removed`)});n.ok&&this.agentEpoch===n.agentEpoch&&(this.setMessage(`key:${e}`,null),this.keyEditorProvider===e&&this.closeKeyEditor(),this.setMessage(e,{kind:`success`,text:C(`modelProviders.apiKey.removed`),...n.warning?{warning:n.warning}:{}}))}async probe(e,t){let n=this.context.gateway.snapshot.client,r=`probe:${e}`;if(!n||!this.canMutate()||this.busy[r]||this.probeUnsupported)return;let i=this.clientEpoch,a=this.selectedAgentId,o=(this.probeEpochs.get(e)??0)+1;this.probeEpochs.set(e,o),this.setBusy(r,!0),this.setMessage(e,null);try{let r=[];for(let e of t)r.push(await n.request(`models.probe`,{provider:e,agentId:a}));this.isCurrentClient(n,i)&&this.selectedAgentId===a&&this.probeEpochs.get(e)===o&&(this.probeResults={...this.probeResults,[e]:Et(e,r)})}catch(t){if(!this.isCurrentClient(n,i)||this.selectedAgentId!==a||this.probeEpochs.get(e)!==o)return;Tt(t)?(this.probeUnsupported=!0,this.setMessage(e,{kind:`error`,text:C(`modelProviders.probe.unavailable`)})):this.setMessage(e,{kind:`error`,text:F(t)})}finally{this.isCurrentClient(n,i)&&this.probeEpochs.get(e)===o&&this.setBusy(r,!1)}}async logout(e,t){let n=this.context.gateway.snapshot.client,r=`logout:${e}`;if(!n||!this.canMutate()||this.busy[r])return;let i=this.clientEpoch,a=this.selectedAgentId,o=this.agentEpoch;this.clearProbe(e),this.setBusy(r,!0),this.setMessage(e,null);try{let r;for(let e of t){if(!this.isCurrentClient(n,i)||this.agentEpoch!==o)return;try{await n.request(`models.authLogout`,{...e,agentId:a})}catch(e){r??=e}}if(!this.isCurrentClient(n,i)||this.agentEpoch!==o||(await this.refresh({force:!0}),!this.isCurrentClient(n,i)||this.agentEpoch!==o))return;if(r){this.setMessage(e,{kind:`error`,text:F(r)});return}this.pendingLogoutProvider=null,this.setMessage(e,{kind:`success`,text:C(`modelProviders.logout.done`)})}catch(t){this.isCurrentClient(n,i)&&this.agentEpoch===o&&this.setMessage(e,{kind:`error`,text:F(t)})}finally{this.isCurrentClient(n,i)&&this.agentEpoch===o&&this.setBusy(r,!1)}}async addProvider(){let e=this.addProviderId,t=this.addProviderKey.trim();if(!e||!t)return;let n=await this.patchConfig({key:`add`,raw:G(e,t),note:C(`modelProviders.notes.addProvider`,{provider:e}),success:C(`modelProviders.add.saved`,{provider:e})});n.ok&&this.agentEpoch===n.agentEpoch&&(this.addProviderId===e&&this.addProviderKey.trim()===t&&(this.addProviderOpen=!!n.warning,n.warning||(this.addProviderId=``),this.addProviderKey=``),this.setMessage(e,{kind:`success`,text:C(`modelProviders.add.saved`,{provider:e}),...n.warning?{warning:n.warning}:{}}))}async saveDefaultModels(){let e=this.defaultsDraft;if(!e?.primary)return;let t=await this.patchConfig({key:`defaults`,raw:$e(e.primary,e.fallbacks,e.utilityModel),note:C(`modelProviders.notes.defaultModel`),success:C(`modelProviders.defaults.saved`),replacePaths:K});t.ok&&!t.warning&&this.agentEpoch===t.agentEpoch&&this.defaultsDraft===e&&(this.defaultsDraft=null)}render(){let e=this.context.gateway.snapshot,t=this.context.agents.state.agentsList?.agents??[],n=t.find(e=>u(e.id)===this.selectedAgentId),r=n?a(n):this.selectedAgentId,i=this.data??Ne,o=Ye(i.config),s=this.defaultsDraft??o.defaults,c=this.context.runtimeConfig,l=c.state,d=Ze(S(S((S(l.configForm??l.configSnapshot?.config)??S(i.config)??{}).agents)?.defaults)),f=this.configBusy(),p=qe({...i,configProviderIds:o.providerIds,configApiKeyProviderIds:o.apiKeyProviderIds,configProviderAuthModes:o.providerAuthModes}),m=new Set([...o.providerIds,...i.authStatus?.providers.filter(e=>!!e.apiKey||e.profiles.length>0).map(e=>e.provider)??[]]),h=_e(e,`models.probe`),ee=this.mutationBlockedReason(),g=Je(i.models,s),_=xt({connected:e.phase===`connected`,loading:e.phase===`connected`&&this.data===null,refreshing:this.refreshTask.status===re.PENDING,error:i.error,updatedAt:i.updatedAt,costDays:30,credentialAgentLabel:r,cards:p,configuredModels:g,defaultModels:s,defaultModelsDirty:this.defaultsDraft!==null,...d,configBusy:f,unconfiguredProviders:Xe(i.catalogModels,m),canMutate:this.canMutate(),mutationBlockedReason:ee,probeAvailable:!this.probeUnsupported&&h!==!1,busy:this.busy,messages:this.messages,probeResults:this.probeResults,keyEditorProvider:this.keyEditorProvider,keyDraft:this.keyDraft,pendingLogoutProvider:this.pendingLogoutProvider,addProviderOpen:this.addProviderOpen,addProviderId:this.addProviderId,addProviderKey:this.addProviderKey,onRefresh:()=>void this.refresh({force:!0}),onOpenKeyEditor:e=>this.openKeyEditor(e),onCloseKeyEditor:()=>this.closeKeyEditor(),onKeyDraftChange:e=>this.keyDraft=e,onSaveKey:(e,t)=>void this.saveKey(e,t),onRemoveKey:(e,t)=>void this.removeKey(e,t),onProbe:(e,t)=>void this.probe(e,t),onRequestLogout:e=>this.pendingLogoutProvider=e,onCancelLogout:()=>this.pendingLogoutProvider=null,onLogout:(e,t)=>void this.logout(e,t),onAddProviderToggle:()=>{this.addProviderOpen=!this.addProviderOpen,this.addProviderKey=``,this.setMessage(`add`,null)},onAddProviderIdChange:e=>this.addProviderId=e,onAddProviderKeyChange:e=>this.addProviderKey=e,onAddProvider:()=>void this.addProvider(),onPrimaryChange:e=>{this.defaultsDraft={...s,primary:e,fallbacks:s.fallbacks.filter(t=>t!==e)},this.setMessage(`defaults`,null)},onFallbackAdd:e=>{this.defaultsDraft={...s,fallbacks:[...s.fallbacks,e]},this.setMessage(`defaults`,null)},onFallbackRemove:e=>{this.defaultsDraft={...s,fallbacks:s.fallbacks.filter((t,n)=>n!==e)},this.setMessage(`defaults`,null)},onUtilityChange:e=>{this.defaultsDraft={...s,utilityModel:e},this.setMessage(`defaults`,null)},onDefaultModelsSave:()=>void this.saveDefaultModels(),onDefaultModelsReset:()=>{this.defaultsDraft=null,this.setMessage(`defaults`,null)},onThinkingChange:e=>c.patchForm([`agents`,`defaults`,`thinkingDefault`],e),onThinkingReset:()=>c.removeFormValue([`agents`,`defaults`,`thinkingDefault`]),onFastModeChange:e=>c.patchForm([`agents`,`defaults`,`fastModeDefault`],e),onFastModeReset:()=>c.removeFormValue([`agents`,`defaults`,`fastModeDefault`]),onOpenModelSetup:()=>this.context.navigate(`model-setup`)});return y`
      <section class="content-header">
        <div>
          <div class="page-title">${ce(`model-providers`)}</div>
          <div class="page-subtitle">
            ${C(`modelProviders.subtitle`)}
            ${Ce(Dt,C(`common.learnMore`))}
          </div>
        </div>
        <div class="page-header-actions">
          ${je({agents:t,selection:this.context.agentSelection,allowAll:!1,selectedId:this.selectedAgentId})}
          <button class="btn" @click=${()=>this.context.navigate(`model-setup`)}>
            ${C(`tabs.modelSetup`)}
          </button>
        </div>
      </section>
      ${be(_)}
    `}},n([ie({context:le,subscribe:!0})],$.prototype,`context`,void 0),n([te({attribute:!1})],$.prototype,`routeData`,void 0),n([b()],$.prototype,`data`,void 0),n([b()],$.prototype,`busy`,void 0),n([b()],$.prototype,`messages`,void 0),n([b()],$.prototype,`probeResults`,void 0),n([b()],$.prototype,`probeUnsupported`,void 0),n([b()],$.prototype,`keyEditorProvider`,void 0),n([b()],$.prototype,`keyDraft`,void 0),n([b()],$.prototype,`pendingLogoutProvider`,void 0),n([b()],$.prototype,`addProviderOpen`,void 0),n([b()],$.prototype,`addProviderId`,void 0),n([b()],$.prototype,`addProviderKey`,void 0),n([b()],$.prototype,`defaultsDraft`,void 0),n([b()],$.prototype,`selectedAgentId`,void 0),customElements.get(`openclaw-model-providers-page`)||customElements.define(`openclaw-model-providers-page`,$)}))();
//# sourceMappingURL=model-providers-page-C00WUQGK.js.map