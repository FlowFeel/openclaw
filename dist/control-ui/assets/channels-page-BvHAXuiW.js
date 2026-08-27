import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Kc as i,Qn as a,Vc as o,Wc as s,Yn as c,_n as l,bn as u,fn as d,gn as f,hn as p,jr as m,kr as h,rr as g,vn as ee}from"./control-ui-core-ChU36mQ7.js";import{K as _,Q as v,W as y,Y as b,nt as x}from"./lit-runtime-D5xZwgO1.js";import{i as te,r as ne}from"./control-ui-foundation-Dgui328h.js";import{A as re,D as ie,R as ae,St as S,Ut as oe,Wt as se,Y as ce,Z as le,_ as ue,bt as de,jt as fe,v as pe,wt as me}from"./control-ui-core-CmlLmVZa.js";import{At as he,Dt as C,Mt as w}from"./control-ui-foundation-DkfOBVsU.js";import{i as ge,o as T,t as E}from"./control-ui-core-M4uhXYSJ.js";import{G as _e,N as ve,P as ye,pt as D,vt as O,yt as be}from"./control-ui-core-pXkCFtVv.js";import{f as xe}from"./control-ui-shared-C-1hBCcB.js";import{n as Se,t as Ce}from"./poll-controller-BnQs2EZr.js";import{n as we,t as Te}from"./wizard-step-controls-BmIpwaqr.js";import{n as Ee,t as De}from"./settings-workspace-BbyrBOFl.js";import{_ as Oe,f as k,i as A,n as ke,s as Ae,t as j,u as M,v as je}from"./settings-ui-Bq4yxauk.js";import{n as Me,t as Ne}from"./gateway-page-controller-CmSjSlgL.js";import{a as Pe,c as Fe,i as Ie,s as Le}from"./presentation-DWpRz_GZ.js";import{c as Re,l as ze,n as Be,o as Ve,t as He,u as Ue}from"./config-form-GabCm1us.js";async function N(e,t){let n=new AbortController,r=setTimeout(()=>n.abort(new DOMException(`Nostr profile request timed out after 30 seconds`,`TimeoutError`)),F);try{let r=await fetch(e,{...t,signal:n.signal}),i=null;try{i=await r.json()}catch(e){if(n.signal.aborted)throw n.signal.reason??e}return{data:i,response:r}}finally{clearTimeout(r)}}function We(e){if(!Array.isArray(e))return{};let t={};for(let n of e){if(typeof n!=`string`)continue;let[e,...r]=n.split(`:`);if(!e||r.length===0)continue;let i=e.trim(),a=r.join(`:`).trim();i&&a&&(t[i]=a)}return t}function P(e,t=``){return`/api/channels/nostr/${encodeURIComponent(e)}/profile${t}`}async function Ge(e){return await N(P(e.accountId),{method:`PUT`,headers:{"Content-Type":`application/json`,...e.headers},body:JSON.stringify(e.values)})}async function Ke(e){return await N(P(e.accountId,`/import`),{method:`POST`,headers:{"Content-Type":`application/json`,...e.headers},body:JSON.stringify({autoMerge:!0})})}var F,qe=e((()=>{F=3e4}));function Je(e){let{values:t,original:n}=e;return t.name!==n.name||t.displayName!==n.displayName||t.about!==n.about||t.picture!==n.picture||t.banner!==n.banner||t.website!==n.website||t.nip05!==n.nip05||t.lud16!==n.lud16}function Ye(e){let{state:t,callbacks:n,accountId:r}=e,i=Je(t),a=(e,r,i={})=>{let{type:a=`text`,placeholder:o,maxLength:s,help:c}=i,l=t.values[e]??``,u=t.fieldErrors[e],d=`nostr-profile-${e}`,f=a===`textarea`?b`
            <textarea
              id="${d}"
              class="settings-input"
              .value=${l}
              placeholder=${o??``}
              maxlength=${s??2e3}
              rows="3"
              @input=${t=>{let r=t.target;n.onFieldChange(e,r.value)}}
              ?disabled=${t.saving}
            ></textarea>
          `:b`
            <input
              id="${d}"
              class="settings-input"
              type=${a}
              .value=${l}
              placeholder=${o??``}
              maxlength=${s??256}
              @input=${t=>{let r=t.target;n.onFieldChange(e,r.value)}}
              ?disabled=${t.saving}
            />
          `;return b`
      <div class="settings-row settings-row--stacked">
        <div class="settings-row__text">
          <label class="settings-row__title" for="${d}">${r}</label>
          ${c?b`<span class="settings-row__desc">${c}</span>`:_}
          ${u?b`<span class="settings-row__desc" style="color: var(--danger);">${u}</span>`:_}
        </div>
        <div class="settings-row__control">${f}</div>
      </div>
    `};return b`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title">${T(`channels.nostr.editProfile`)}</span>
        <span class="settings-row__desc">${T(`channels.nostr.account`)}: ${r}</span>
      </div>
    </div>

    ${t.error?b`
          <div class="settings-row">
            <div class="settings-row__text">
              <span class="settings-row__title"
                >${k({kind:`danger`,label:T(`channels.lastError`)})}</span
              >
              <span class="settings-row__desc">${t.error}</span>
            </div>
          </div>
        `:_}
    ${t.success?b`
          <div class="settings-row">
            <div class="settings-row__text">
              <span class="settings-row__desc">${t.success}</span>
            </div>
          </div>
        `:_}
    ${(()=>{let e=t.values.picture;return e?b`
      <div class="settings-row">
        <div class="settings-row__text">
          <span class="settings-row__title">${T(`channels.nostr.profilePicturePreview`)}</span>
        </div>
        <div class="settings-row__control">
          <img
            src=${e}
            alt=${T(`channels.nostr.profilePicturePreview`)}
            style="max-width: 80px; max-height: 80px; border-radius: 50%; object-fit: cover;"
            @error=${e=>{let t=e.target;t.style.display=`none`}}
            @load=${e=>{let t=e.target;t.style.display=`block`}}
          />
        </div>
      </div>
    `:_})()}
    ${a(`name`,T(`channels.nostr.username`),{placeholder:T(`channels.nostr.placeholders.username`),maxLength:256,help:T(`channels.nostr.usernameHelp`)})}
    ${a(`displayName`,T(`channels.nostr.displayName`),{placeholder:T(`channels.nostr.placeholders.displayName`),maxLength:256,help:T(`channels.nostr.displayNameHelp`)})}
    ${a(`about`,T(`channels.nostr.bio`),{type:`textarea`,placeholder:T(`channels.nostr.bioPlaceholder`),maxLength:2e3,help:T(`channels.nostr.bioHelp`)})}
    ${a(`picture`,T(`channels.nostr.avatarUrl`),{type:`url`,placeholder:T(`channels.nostr.placeholders.avatarUrl`),help:T(`channels.nostr.avatarHelp`)})}
    ${t.showAdvanced?b`
          <div class="settings-row">
            <div class="settings-row__text">
              <span class="settings-row__title">${T(`channels.nostr.advanced`)}</span>
            </div>
          </div>

          ${a(`banner`,T(`channels.nostr.bannerUrl`),{type:`url`,placeholder:T(`channels.nostr.placeholders.bannerUrl`),help:T(`channels.nostr.bannerHelp`)})}
          ${a(`website`,T(`channels.nostr.website`),{type:`url`,placeholder:T(`channels.nostr.placeholders.website`),help:T(`channels.nostr.websiteHelp`)})}
          ${a(`nip05`,T(`channels.nostr.nip05Identifier`),{placeholder:T(`channels.nostr.placeholders.nip05`),help:T(`channels.nostr.nip05Help`)})}
          ${a(`lud16`,T(`channels.nostr.lightningAddress`),{placeholder:T(`channels.nostr.placeholders.lightningAddress`),help:T(`channels.nostr.lightningHelp`)})}
        `:_}

    <div class="settings-row">
      <div class="settings-row__text">
        ${i?b`<span class="settings-row__desc">${T(`common.unsavedChanges`)}</span>`:_}
      </div>
      <div class="settings-row__control">
        <button
          class="btn primary"
          @click=${n.onSave}
          ?disabled=${t.saving||!i}
        >
          ${t.saving?T(`common.saving`):T(`common.saveAndPublish`)}
        </button>

        <button
          class="btn"
          @click=${n.onImport}
          ?disabled=${t.importing||t.saving}
        >
          ${t.importing?T(`common.importing`):T(`common.importFromRelays`)}
        </button>

        <button class="btn" @click=${n.onToggleAdvanced}>
          ${t.showAdvanced?T(`common.hideAdvanced`):T(`common.showAdvanced`)}
        </button>

        <button class="btn" @click=${n.onCancel} ?disabled=${t.saving}>
          ${T(`common.cancel`)}
        </button>
      </div>
    </div>
  `}function Xe(e){let t={name:e?.name??``,displayName:e?.displayName??``,about:e?.about??``,picture:e?.picture??``,banner:e?.banner??``,website:e?.website??``,nip05:e?.nip05??``,lud16:e?.lud16??``};return{values:t,original:{...t},saving:!1,importing:!1,error:null,success:null,fieldErrors:{},showAdvanced:!!(e?.banner||e?.website||e?.nip05||e?.lud16)}}var I=e((()=>{y(),j(),E()})),Ze=e((()=>{}));function Qe(e){switch(e){case`telegram`:return{setupLinks:[{label:`@BotFather`,url:`https://t.me/BotFather`},{label:`web.telegram.org`,url:`https://web.telegram.org`}]};case`discord`:return{setupLinks:[{label:`Developer Portal`,url:`https://discord.com/developers/applications`}]};case`slack`:return{setupLinks:[{label:`api.slack.com/apps`,url:`https://api.slack.com/apps`}]};case`signal`:return{setupLinks:[{label:`signal-cli`,url:`https://github.com/AsamK/signal-cli`}]};default:return{}}}function L(e){return`https://docs.openclaw.ai/channels/${encodeURIComponent(e)}`}function R(e,t,n){let r=Pe(e);if(r)return b`<span class="channels-${n}">
      <img src=${r} alt="" loading="lazy" decoding="async" />
    </span>`;let[i,a]=Le(e),o=Fe(t);return b`<span
    class="channels-${n} channels-${n}--fallback"
    style=${`--channels-art-a:${i};--channels-art-b:${a}`}
    aria-hidden="true"
  >
    <span>${o}</span>
  </span>`}var z=e((()=>{y(),Ie()}));function $e(e,t){let n=e;for(let e of t){if(!n)return null;let t=xe(n);if(t===`object`){let t=n.properties??{};if(typeof e==`string`&&t[e]){n=t[e];continue}let r=n.additionalProperties;if(typeof e==`string`&&r&&typeof r==`object`){n=r;continue}return null}if(t===`array`){if(typeof e!=`number`)return null;n=(Array.isArray(n.items)?n.items[0]:n.items)??null;continue}return null}return n}function et(e,t){return ee(e,t)??{}}function tt(e){let t=V.flatMap(t=>t in e?[[t,e[t]]]:[]);return t.length===0?null:b`
    <div>
      ${t.map(([e,t])=>b`
          <div class="settings-row__desc">${e}: ${p(t)}</div>
        `)}
    </div>
  `}function nt(e){let t=Be(e.schema),n=t.schema;if(!n)return b`<div class="settings-row__desc">${T(`channels.config.schemaUnavailable`)}</div>`;let r=$e(n,[`channels`,e.channelId]);if(!r)return b`
      <div class="settings-row__desc">${T(`channels.config.channelSchemaUnavailable`)}</div>
    `;let i=et(e.configValue??{},e.channelId),a=[`channels`,e.channelId],o=new Set(t.unsupportedPaths);return b`
    <div class="config-form">
      ${Ve({schema:r,path:a,hints:e.uiHints,revealAdvanced:e.showAdvanced,onShowAdvanced:()=>e.onShowAdvanced(!0),onHideAdvanced:()=>e.onShowAdvanced(!1),renderTier:t=>Re({schema:t,value:i,path:a,hints:e.uiHints,unsupported:o,disabled:e.disabled,showLabel:!1,onPatch:e.onPatch})})}
    </div>
    ${tt(i)}
  `}function B(e){let{channelId:t,props:n}=e,r=n.configSaving||n.configSchemaLoading;return b`
    <div class="settings-row settings-row--stacked">
      ${n.configSchemaLoading?b`<div class="settings-row__desc">${T(`channels.config.loadingSchema`)}</div>`:nt({channelId:t,configValue:n.configForm,schema:n.configSchema,uiHints:n.configUiHints,disabled:r,showAdvanced:n.showAdvancedSettings,onShowAdvanced:n.onShowAdvancedSettings,onPatch:n.onConfigPatch})}
      <div class="settings-row__control">
        <button
          class="btn primary"
          ?disabled=${r||!n.configFormDirty}
          @click=${()=>n.onConfigSave()}
        >
          ${n.configSaving?T(`common.saving`):T(`common.save`)}
        </button>
        <button class="btn" ?disabled=${r} @click=${()=>n.onConfigReload()}>
          ${T(`common.reload`)}
        </button>
      </div>
    </div>
  `}var V,H=e((()=>{y(),He(),E(),f(),V=[`groupPolicy`,`streamMode`,`dmPolicy`]}));function rt(e,t){let n=t.snapshot?.channels;return n&&Object.hasOwn(n,e)?C(n[e])??void 0:void 0}function it(e,t){let n=l(t.snapshot?.channelAccounts,e),r=t.snapshot?.channelDefaultAccountId,i=r&&Object.hasOwn(r,e)?r[e]:void 0;return(i?n.find(e=>e.accountId===i):void 0)??n[0]??null}function U(e,t){let n=rt(e,t),r=it(e,t);return{configured:typeof n?.configured==`boolean`?n.configured:typeof r?.configured==`boolean`?r.configured:null,running:typeof n?.running==`boolean`?n.running:null,connected:typeof n?.connected==`boolean`?n.connected:null,defaultAccount:r,status:n}}function at(e,t){return d(t.snapshot,e)}function ot(e,t){return U(e,t).configured}function W(e){return T(e==null?`common.na`:e?`common.yes`:`common.no`)}function G(e){return e===!0?`ok`:`muted`}function K(e){return b`
    <dl class="settings-kv">
      ${e.map(e=>b`
          <dt>${e.label}</dt>
          <dd>
            ${e.kind===void 0?e.value:k({kind:e.kind,label:e.value})}
          </dd>
        `)}
    </dl>
  `}function q(e){return b`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title"
          >${k({kind:`danger`,label:T(`channels.lastError`)})}</span
        >
        <span class="settings-row__desc">${e}</span>
      </div>
    </div>
  `}function st(e){let t=[e.status??``,e.error??``].filter(Boolean).join(` `);return b`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title"
          >${k({kind:e.ok?`ok`:`danger`,label:e.ok?T(`common.probeOk`):T(`common.probeFailed`)})}</span
        >
        ${t?b`<span class="settings-row__desc">${t}</span>`:_}
      </div>
    </div>
  `}function J(e){return b`
    <div class="settings-row settings-row--actions">
      <div class="settings-row__control">${e}</div>
    </div>
  `}function ct(e){let t=[e.accountId,...e.facts??[]].join(` · `);return b`
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__title">${e.title}</span>
        <span class="settings-row__desc">${t}</span>
        ${e.lastError?b`<span class="settings-row__desc">${e.lastError}</span>`:_}
      </div>
      <div class="settings-row__control">
        ${k(e.status)}
        <span class="settings-row__value"
          >${e.lastInboundAt?a(e.lastInboundAt):T(`common.na`)}</span
        >
      </div>
    </div>
  `}function lt(e){return M({title:e.title,description:e.subtitle,...e.accountCount===void 0?{}:{count:e.accountCount}},b`
      ${K(e.statusRows)}
      ${e.lastError?q(e.lastError):_}
      ${e.secondaryCallout??_} ${e.configSection}
      ${e.extraContent??_}
      ${e.footer?J(e.footer):_}
    `)}function ut(e,t){let n=l(t,e).length;return n>=2?n:void 0}var Y=e((()=>{he(),y(),j(),E(),f(),g()}));function dt(e){return e?e.length<=20?e:`${e.slice(0,8)}...${e.slice(-8)}`:T(`common.na`)}function ft(e){let{props:t,nostr:n,nostrAccounts:r,accountCount:i,profileFormState:o,profileFormCallbacks:s,onEditProfile:c}=e,l=r[0],u=n?.configured??l?.configured??!1,d=n?.running??l?.running??!1,f=n?.publicKey??l?.publicKey,p=n?.lastStartAt??l?.lastStartAt??null,m=n?.lastError??l?.lastError??null,h=r.length>1,g=o!=null,ee=e=>{let t=e.publicKey,n=e.profile;return ct({title:n?.displayName??n?.name??e.name??e.accountId,accountId:e.accountId,facts:[`${T(`common.configured`)}: ${e.configured?T(`common.yes`):T(`common.no`)}`,`${T(`common.publicKey`)}: ${dt(t)}`],status:{kind:G(e.running),label:e.running?T(`common.running`):T(`common.no`)},lastInboundAt:e.lastInboundAt,lastError:e.lastError})},v=()=>{if(g&&s)return Ye({state:o,callbacks:s,accountId:r[0]?.accountId??`default`});let{name:e,displayName:t,about:i,picture:a,nip05:d}=l?.profile??n?.profile??{},f=e||t||i||a||d;return b`
      <div class="settings-row">
        <div class="settings-row__text">
          <span class="settings-row__title">${T(`channels.nostr.profile`)}</span>
          ${f?_:b`<span class="settings-row__desc"
                >${T(`channels.nostr.noProfile`)} ${T(`channels.nostr.noProfileHint`)}</span
              >`}
        </div>
        ${u?b`
              <div class="settings-row__control">
                <button class="btn btn--sm" @click=${c}>
                  ${T(`channels.nostr.editProfile`)}
                </button>
              </div>
            `:_}
      </div>
      ${f?b`
            <dl class="settings-kv">
              ${a?b`
                    <dt>${T(`channels.nostr.profilePicture`)}</dt>
                    <dd>
                      <img
                        style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover;"
                        src=${a}
                        alt=${T(`channels.nostr.profilePicture`)}
                        @error=${e=>{e.target.style.display=`none`}}
                      />
                    </dd>
                  `:_}
              ${e?b`<dt>${T(`channels.nostr.name`)}</dt>
                    <dd>${e}</dd>`:_}
              ${t?b`<dt>${T(`channels.nostr.displayName`)}</dt>
                    <dd>${t}</dd>`:_}
              ${i?b`<dt>${T(`channels.nostr.about`)}</dt>
                    <dd>${i}</dd>`:_}
              ${d?b`<dt>NIP-05</dt>
                    <dd>${d}</dd>`:_}
            </dl>
          `:_}
    `};return M({title:T(`channels.nostr.title`),description:T(`channels.nostr.subtitle`),...i===void 0?{}:{count:i}},b`
      ${h?r.map(e=>ee(e)):K([{label:T(`common.configured`),value:T(u?`common.yes`:`common.no`),kind:G(u)},{label:T(`common.running`),value:T(d?`common.yes`:`common.no`),kind:G(d)},{label:T(`common.publicKey`),value:b`<code title="${f??``}"
                >${dt(f)}</code
              >`},{label:T(`common.lastStart`),value:p?a(p):T(`common.na`)}])}
      ${m?q(m):_}
      ${v()} ${B({channelId:`nostr`,props:t})}
      ${J(b`<button class="btn" @click=${()=>t.onRefresh(!1)}>
          ${T(`common.refresh`)}
        </button>`)}
    `)}var pt=e((()=>{y(),j(),E(),g(),H(),I(),Y()}));function mt(e){return e.accountLabel||e.accountId}function X(e){return e.accountLabel||e.accountId}function ht(e){let t=Date.parse(e);return Number.isFinite(t)?a(t):e}function gt(e){return(e.currentTarget instanceof HTMLSelectElement?e.currentTarget.value:``)||null}function _t(e){let t=e.pairingSnapshot?.accounts??[];return e.pairingChannelFilter?t.filter(t=>t.channel===e.pairingChannelFilter):t}function vt(e){return(e.pairingSnapshot?.requests??[]).filter(t=>!(e.pairingChannelFilter&&t.channel!==e.pairingChannelFilter||e.pairingAccountFilter&&t.accountId!==e.pairingAccountFilter))}function yt(e){let t=e.pairingSnapshot?.accounts??[],n=Array.from(new Map(t.map(e=>[e.channel,e.channelLabel])).entries()).toSorted((e,t)=>e[1].localeCompare(t[1])),r=_t(e);return b`
    <div class="channels-pairing-filters">
      <label>
        <span>${T(`channels.pairing.channelFilter`)}</span>
        <select
          class="settings-select"
          .value=${e.pairingChannelFilter??``}
          @change=${t=>e.onPairingFilterChange(gt(t),null)}
        >
          <option value="">${T(`channels.pairing.allChannels`)}</option>
          ${n.map(([e,t])=>b`<option value=${e}>${t}</option>`)}
        </select>
      </label>
      <label>
        <span>${T(`channels.pairing.accountFilter`)}</span>
        <select
          class="settings-select"
          .value=${e.pairingAccountFilter??``}
          ?disabled=${!e.pairingChannelFilter}
          @change=${t=>e.onPairingFilterChange(e.pairingChannelFilter,gt(t))}
        >
          <option value="">${T(`channels.pairing.allAccounts`)}</option>
          ${r.map(e=>b`<option value=${e.accountId}>${mt(e)}</option>`)}
        </select>
      </label>
    </div>
  `}function bt(e,t){let n=!!t.pairingBusyRequestId,r=t.pairingBusyRequestId===e.requestId,i=Object.entries(e.metadata??{});return b`
    <div class="settings-row settings-row--stacked channels-pairing-request">
      <div class="channels-pairing-request__main">
        <div class="settings-row__text">
          <span class="settings-row__title">${e.senderId}</span>
          <span class="settings-row__desc">
            ${e.senderLabel} · ${e.channelLabel} · ${X(e)}
            (${e.accountId})
          </span>
          <span class="settings-row__desc">
            ${T(`channels.pairing.requested`,{ago:ht(e.createdAt)})} ·
            ${T(`channels.pairing.expires`,{ago:ht(e.expiresAt)})}
          </span>
        </div>
        <div class="settings-row__control channels-pairing-request__actions">
          <button
            type="button"
            class="btn btn--sm primary"
            ?disabled=${n||!t.canManagePairing}
            aria-label=${T(`channels.pairing.approveAria`,{sender:e.senderId,channel:e.channelLabel,account:X(e)})}
            @click=${()=>t.onPairingApprove(e)}
          >
            ${T(r?`common.loading`:`channels.pairing.approve`)}
          </button>
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${n||!t.canManagePairing}
            aria-label=${T(`channels.pairing.dismissAria`,{sender:e.senderId,channel:e.channelLabel,account:X(e)})}
            @click=${()=>t.onPairingDismiss(e)}
          >
            ${T(`channels.pairing.dismiss`)}
          </button>
        </div>
      </div>
      ${i.length>0?b`
            <details class="channels-pairing-request__details">
              <summary>${T(`channels.pairing.senderDetails`)}</summary>
              <dl class="settings-kv">
                ${i.map(([e,t])=>b`<dt>${e}</dt>
                      <dd>${t}</dd>`)}
              </dl>
            </details>
          `:_}
    </div>
  `}function xt(e){let t=e.canManagePairing?e.pairingSnapshot:null,n=t?.accounts??[],r=e.canManagePairing?vt(e):[],i=!!(e.pairingChannelFilter||e.pairingAccountFilter),o=t?.requests.length??0;return b`
    <div id="channels-pairing-requests">
      ${M({title:T(`channels.pairing.title`),description:T(`channels.pairing.subtitle`),...o>0?{count:o}:{},actions:b`
            <span class="settings-row__value">
              ${e.canManagePairing&&e.pairingLastSuccessAt?T(`channels.hub.updatedAgo`,{ago:a(e.pairingLastSuccessAt)}):T(`common.na`)}
            </span>
            <button
              type="button"
              class="btn btn--sm"
              ?disabled=${e.pairingLoading||!e.canManagePairing}
              @click=${e.onPairingRefresh}
            >
              ${T(`common.refresh`)}
            </button>
          `},e.canManagePairing?b`
              ${e.pairingError?b`
                    <div class="settings-row channels-pairing-feedback" role="alert">
                      ${k({kind:`danger`,label:e.pairingError})}
                    </div>
                  `:_}
              ${e.pairingNotice?b`
                    <div class="settings-row channels-pairing-feedback" role="status">
                      ${k({kind:`ok`,label:e.pairingNotice})}
                    </div>
                  `:_}
              ${t?yt(e):_}
              ${e.pairingLoading&&!t?b`<div class="settings-row">${T(`common.loading`)}</div>`:n.length===0?A(T(`channels.pairing.noAccounts`)):r.length===0?A(T(i?`channels.pairing.noFilteredRequests`:`channels.pairing.noRequests`)):r.map(t=>bt(t,e))}
              ${t?b`
                    <div class="channels-pairing-help">
                      ${T(`channels.pairing.limits`,{count:String(t.limits.pendingPerAccount),minutes:String(Math.round(t.limits.ttlMs/6e4))})}
                    </div>
                  `:_}
            `:b`
              <div class="settings-row channels-pairing-feedback">
                ${k({kind:`warn`,label:T(`channels.pairing.missingPermission`)})}
              </div>
            `)}
    </div>
  `}function St(e,t){if(!t.canManagePairing)return _;let n=(t.pairingSnapshot?.accounts??[]).filter(t=>t.channel===e);if(n.length===0)return _;let r=t.pairingSnapshot?.requests??[];return M({title:T(`channels.pairing.detailTitle`),description:T(`channels.pairing.detailSubtitle`)},n.map(e=>{let n=r.filter(t=>t.channel===e.channel&&t.accountId===e.accountId).length;return b`
        <div class="settings-row">
          <div class="settings-row__text">
            <span class="settings-row__title">${mt(e)}</span>
            <span class="settings-row__desc">${e.accountId}</span>
          </div>
          <div class="settings-row__control">
            ${k({kind:n>0?`warn`:`muted`,label:n>0?T(`channels.pairing.pendingCount`,{count:String(n)}):T(`channels.pairing.noPending`)})}
            <button
              type="button"
              class="btn btn--sm"
              @click=${()=>t.onPairingReviewAccount(e.channel,e.accountId)}
            >
              ${T(`channels.pairing.review`)}
            </button>
          </div>
        </div>
      `}))}function Ct(e){let t=e.pairingPrompt;if(!t||!e.canManagePairing)return _;let n=t.request,r=e.pairingBusyRequestId===n.requestId,i=t.kind===`approve`,a=e.pairingSnapshot?.commandOwnerConfigured===!1,o=T(i?`channels.pairing.approveDialogTitle`:`channels.pairing.dismissDialogTitle`);return b`
    <openclaw-modal-dialog label=${o} @modal-cancel=${e.onPairingPromptCancel}>
      <div class="channels-pairing-dialog">
        <div class="settings-row__title">${o}</div>
        <div class="settings-row__desc">
          ${n.senderId} · ${n.channelLabel} · ${X(n)}
          (${n.accountId})
        </div>
        <div class="callout ${i?`info`:`warn`}">
          ${T(i?`channels.pairing.approveExplanation`:`channels.pairing.dismissExplanation`)}
        </div>
        ${e.pairingError?b`<div class="callout danger" role="alert">${e.pairingError}</div>`:_}
        ${i&&n.notifySupported?b`
              <label class="channels-pairing-dialog__option">
                <input
                  type="checkbox"
                  .checked=${t.notify}
                  @change=${t=>e.onPairingPromptChange({notify:t.currentTarget instanceof HTMLInputElement&&t.currentTarget.checked})}
                />
                <span>${T(`channels.pairing.notifyRequester`)}</span>
              </label>
            `:_}
        ${i&&a&&e.canAdmin?b`
              <label class="channels-pairing-dialog__option">
                <input
                  type="checkbox"
                  .checked=${t.bootstrapCommandOwner}
                  @change=${t=>e.onPairingPromptChange({bootstrapCommandOwner:t.currentTarget instanceof HTMLInputElement&&t.currentTarget.checked})}
                />
                <span>${T(`channels.pairing.makeCommandOwner`)}</span>
              </label>
              <div class="settings-row__desc">${T(`channels.pairing.commandOwnerHelp`)}</div>
            `:_}
        ${i&&a&&!e.canAdmin?b`<div class="callout warn">${T(`channels.pairing.commandOwnerNeedsAdmin`)}</div>`:_}
        <div class="channels-pairing-dialog__actions">
          <button
            type="button"
            class=${i?`btn primary`:`btn danger`}
            ?disabled=${r}
            @click=${e.onPairingPromptConfirm}
          >
            ${T(i?`channels.pairing.approve`:`channels.pairing.dismiss`)}
          </button>
          <button type="button" class="btn" ?disabled=${r} @click=${e.onPairingPromptCancel}>
            ${T(`common.cancel`)}
          </button>
        </div>
      </div>
    </openclaw-modal-dialog>
  `}var wt=e((()=>{y(),D(),j(),E(),g()}));function Tt(e){let{props:t,whatsapp:n,accountCount:r}=e,i=ot(`whatsapp`,t),o=n?.linked===!0,s=t.whatsappQrDataUrl!=null,l=n?.self?.e164,u=l?ze(l,ge.getLocale())??l:void 0;return lt({title:T(`channels.whatsapp.title`),subtitle:T(`channels.whatsapp.subtitle`),accountCount:r,statusRows:[{label:T(`common.configured`),value:W(i),kind:G(i)},{label:T(`common.linked`),value:n?.linked?T(`common.yes`):T(`common.no`),kind:G(n?.linked)},...u?[{label:T(`channels.whatsapp.phoneNumber`),value:u}]:[],{label:T(`common.running`),value:n?.running?T(`common.yes`):T(`common.no`),kind:G(n?.running)},{label:T(`common.connected`),value:n?.connected?T(`common.yes`):T(`common.no`),kind:G(n?.connected)},{label:T(`common.lastConnect`),value:n?.lastConnectedAt?a(n.lastConnectedAt):T(`common.na`)},{label:T(`common.lastMessage`),value:n?.lastMessageAt?a(n.lastMessageAt):T(`common.na`)},{label:T(`common.authAge`),value:n?.authAgeMs==null?T(`common.na`):c(n.authAgeMs)}],lastError:n?.lastError,extraContent:b`
      ${t.whatsappMessage?b`
            <div class="settings-row">
              <div class="settings-row__text">
                <span class="settings-row__desc">${t.whatsappMessage}</span>
              </div>
            </div>
          `:_}
      ${t.whatsappQrDataUrl?b`
            <div class="settings-row settings-row--stacked">
              <div class="qr-wrap">
                <img src=${t.whatsappQrDataUrl} alt=${T(`channels.setup.whatsappQrAlt`)} />
              </div>
            </div>
          `:_}
    `,configSection:B({channelId:`whatsapp`,props:t}),footer:b`
      ${o?b`<button
            class="btn"
            ?disabled=${t.whatsappBusy}
            @click=${()=>t.onWhatsAppStart(!0)}
          >
            ${T(`common.relink`)}
          </button>`:b`<button
            class="btn primary"
            ?disabled=${t.whatsappBusy}
            @click=${()=>t.onWhatsAppStart(!1)}
          >
            ${t.whatsappBusy?T(`common.working`):T(`common.showQr`)}
          </button>`}
      ${s?b`<button
            class="btn"
            ?disabled=${t.whatsappBusy}
            @click=${()=>t.onWhatsAppWait()}
          >
            ${T(`common.waitForScan`)}
          </button>`:_}
      <button
        class="btn danger"
        ?disabled=${t.whatsappBusy}
        @click=${()=>t.onWhatsAppLogout()}
      >
        ${T(`common.logout`)}
      </button>
      <button class="btn" @click=${()=>t.onRefresh(!0)}>${T(`common.refresh`)}</button>
    `})}var Et=e((()=>{Ue(),y(),E(),g(),H(),Y()}));function Dt(e){return Object.hasOwn(Z,e)}function Ot(e,t,n,r){let i=Dt(e)?e:null,o=i?Z[i]:null,s=i?n[i]:void 0,c=U(e,t),u=c.configured,d=l(n.channelAccounts,e),f=i===`telegram`?d.length>1:!i&&d.length>0,p=i===`googlechat`?[{label:T(`common.credential`),value:n.googlechat?.credentialSource??T(`common.na`)},{label:T(`common.audience`),value:n.googlechat?.audienceType?`${n.googlechat.audienceType}${n.googlechat.audience?` · ${n.googlechat.audience}`:``}`:T(`common.na`)}]:i===`signal`?[{label:T(`common.baseUrl`),value:n.signal?.baseUrl??T(`common.na`)}]:i===`telegram`?[{label:T(`common.mode`),value:n.telegram?.mode??T(`common.na`)}]:[],m=[{label:T(`common.configured`),value:W(u),kind:G(u)},{label:T(`common.running`),value:i?i===`googlechat`&&!s?T(`common.na`):W(s?.running??!1):W(c.running),kind:G(i?s?.running:c.running)},...i?[...p,...[`lastStartAt`,`lastProbeAt`].map(e=>({label:T(e===`lastStartAt`?`common.lastStart`:`common.lastProbe`),value:s?.[e]?a(s[e]):T(`common.na`)}))]:[{label:T(`common.connected`),value:W(c.connected),kind:G(c.connected)}]],h=w(C(i?s:c.status),`lastError`);return M({title:o?T(`channels.${o}.title`):w(t.snapshot?.channelLabels,e)??e,description:T(o?`channels.${o}.subtitle`:`channels.generic.subtitle`),...r===void 0?{}:{count:r}},b`
      ${f?d.map(e=>{let t=i===`telegram`?w(C(C(e.probe)?.bot),`username`):void 0;return ct({title:t?`@${t}`:e.name||e.accountId,accountId:e.accountId,...i===`telegram`?{facts:[`${T(`common.configured`)}: ${e.configured?T(`common.yes`):T(`common.no`)}`]}:{},status:{kind:G(i===`telegram`?e.running:e.running??e.configured),label:e.running?T(`common.running`):!i&&e.configured?T(`common.configured`):T(`common.no`)},lastInboundAt:e.lastInboundAt,lastError:e.lastError})}):K(m)}
      ${h?q(h):_}
      ${i&&s?.probe?st(s.probe):_}
      ${B({channelId:e,props:t})}
      ${i?J(b`<button class="btn" @click=${()=>t.onRefresh(!0)}>
            ${T(`common.probe`)}
          </button>`):_}
    `)}function kt(e,t,n){let r=ut(e,n.channelAccounts);switch(e){case`whatsapp`:return Tt({props:t,whatsapp:n.whatsapp,accountCount:r});case`nostr`:{let e=l(n.channelAccounts,`nostr`),i=e[0],a=i?.accountId??`default`,o=i?.profile??null,s=t.nostrProfileAccountId===a?t.nostrProfileFormState:null,c=s?{onFieldChange:t.onNostrProfileFieldChange,onSave:t.onNostrProfileSave,onImport:t.onNostrProfileImport,onCancel:t.onNostrProfileCancel,onToggleAdvanced:t.onNostrProfileToggleAdvanced}:null;return ft({props:t,nostr:n.nostr,nostrAccounts:e,accountCount:r,profileFormState:s,profileFormCallbacks:c,onEditProfile:()=>t.onNostrProfileEdit(a,o)})}default:return Ot(e,t,n,r)}}function At(e){let t=kt(e.channelId,e.props,e.data);return b`
    <openclaw-modal-dialog label=${e.label} @modal-cancel=${()=>e.onClose()}>
      <div class="channels-detail">
        <div class="channels-detail__header">
          ${R(e.channelId,e.label,`cover`)}
          <div class="channels-detail__header-actions">
            <a
              class="btn btn--sm"
              href=${L(e.channelId)}
              target="_blank"
              rel="noreferrer"
            >
              ${T(`common.docs`)}
            </a>
            <button type="button" class="btn btn--sm" @click=${()=>e.onSetup()}>
              ${T(`channels.hub.runSetup`)}
            </button>
            <button
              type="button"
              class="btn channels-detail__close"
              aria-label=${T(`common.close`)}
              @click=${()=>e.onClose()}
            >
              ✕
            </button>
          </div>
        </div>
        <div class="channels-detail__body">
          ${e.props.setupBlockedByDirtyConfig&&e.props.configFormDirty?b`<div class="callout warn">${T(`channels.hub.saveBeforeSetup`)}</div>`:_}
          ${St(e.channelId,e.props)} ${t}
        </div>
      </div>
    </openclaw-modal-dialog>
  `}var Z,jt=e((()=>{he(),y(),j(),E(),D(),f(),g(),z(),H(),pt(),wt(),Y(),Et(),Z={discord:`discord`,googlechat:`googleChat`,imessage:`imessage`,signal:`signal`,slack:`slack`,telegram:`telegram`}}));function Mt(e){return e.wizard.phase===`step`&&e.wizard.busy}function Nt(e,t){let n=e.message?.trim()??``;if(e.executor===`gateway`)return b`
      ${e.title?b`<div class="channels-wizard__message">${e.title}</div>`:_}
      <div class="channels-wizard__spinner" role="status" aria-live="polite">
        ${n||T(`channels.setup.working`)}
      </div>
      <div class="channels-wizard__footer">
        <button type="button" class="btn" @click=${()=>t.onClose()}>
          ${T(`common.cancel`)}
        </button>
      </div>
    `;let r=n.includes(`{`)||n.includes(`  `),i=T(`channels.setup.copyText`);return b`
    ${e.title?b`<div class="channels-wizard__message">${e.title}</div>`:_}
    ${n?b`<div
          class="channels-wizard__note ${r?`channels-wizard__note--code`:``}"
        >
          ${n}
        </div>`:_}
    ${n?b`
          <div class="channels-wizard__links">
            <button type="button" class="btn btn--sm" @click=${e=>void ve(e,n,i)}>
              <span data-copy-label>${i}</span>
            </button>
          </div>
        `:_}
    <div class="channels-wizard__footer">
      <button
        type="button"
        class="btn primary"
        ?disabled=${Mt(t)}
        @click=${()=>t.onAnswer(null)}
      >
        ${T(`channels.setup.continue`)}
      </button>
    </div>
  `}function Pt(e,t){return e.type===`note`||e.type===`progress`||e.type===`action`?Nt(e,t):we({step:e,value:e.type===`multiselect`?t.multiselectValues:e.type===`text`?t.textValue:e.initialValue,busy:Mt(t),inputId:`channel-wizard-text-input`,presentation:`channels`,answerLabel:T(`channels.setup.continue`),sensitiveRevealed:t.secretVisible,onValueChange:e.type===`text`?e=>t.onTextInput(typeof e==`string`?e:``):t.onToggleMultiselect,onAnswer:t.onAnswer,onToggleSensitiveVisibility:t.onToggleSecretVisibility})}function Ft(e){let t=e.whatsappConnected===!0;return b`
    <div class="channels-wizard__message">
      ${T(t?`channels.setup.whatsappLinked`:`channels.setup.whatsappScanTitle`)}
    </div>
    ${e.whatsappMessage?b`<div class="channels-wizard__note">${e.whatsappMessage}</div>`:_}
    ${t?_:b`
          <div class="channels-wizard__qr">
            ${e.whatsappQrDataUrl?b`<img
                  src=${e.whatsappQrDataUrl}
                  alt=${T(`channels.setup.whatsappQrAlt`)}
                />`:b`<div class="channels-wizard__spinner">
                  ${e.whatsappBusy?T(`channels.setup.whatsappQrLoading`):T(`channels.setup.whatsappQrHint`)}
                </div>`}
          </div>
          <div class="channels-wizard__note">${T(`channels.setup.whatsappScanHelp`)}</div>
        `}
    <div class="channels-wizard__footer">
      ${t?b`
            <button type="button" class="btn primary" @click=${()=>e.onClose()}>
              ${T(`channels.setup.finish`)}
            </button>
          `:b`
            <button
              type="button"
              class="btn"
              ?disabled=${e.whatsappBusy}
              @click=${()=>e.onWhatsAppStart(!0)}
            >
              ${e.whatsappQrDataUrl?T(`channels.setup.regenerateQr`):T(`common.showQr`)}
            </button>
            ${e.whatsappQrDataUrl?b`
                  <button
                    type="button"
                    class="btn primary"
                    ?disabled=${e.whatsappBusy}
                    @click=${()=>e.onWhatsAppWait()}
                  >
                    ${T(`common.waitForScan`)}
                  </button>
                `:_}
            <button type="button" class="btn" @click=${()=>e.onClose()}>
              ${T(`channels.setup.linkLater`)}
            </button>
          `}
    </div>
  `}function It(e,t){if(e.includes(`whatsapp`))return Ft(t);let n=e.length>0;return b`
    <div class="channels-wizard__message">
      ${T(n?`channels.setup.doneTitle`:`channels.setup.doneNoChangesTitle`)}
    </div>
    <div class="channels-wizard__note">
      ${T(n?`channels.setup.doneBody`:`channels.setup.doneNoChangesBody`)}
    </div>
    <div class="channels-wizard__footer">
      <button type="button" class="btn primary" @click=${()=>t.onClose()}>
        ${T(n?`channels.setup.finish`:`common.close`)}
      </button>
    </div>
  `}function Lt(e,t){let n=[...e?Qe(e).setupLinks??[]:[]];return t?.externalUrl&&n.unshift({label:T(`channels.setup.openLink`),url:t.externalUrl}),e&&n.push({label:T(`channels.setup.docs`),url:L(e)}),n.length===0?_:b`
    <div class="channels-wizard__links">
      ${n.map(e=>b`
          <a class="btn btn--sm" href=${e.url} target="_blank" rel="noreferrer noopener">
            ${e.label} ↗
          </a>
        `)}
    </div>
  `}function Rt(e){let t=e.wizard;if(t.phase===`idle`)return _;let n=t.channel,r=n?e.channelLabel(n):T(`channels.setup.genericTitle`),i=t.phase===`step`?t.step:null,a;return t.phase===`starting`?a=b`<div class="channels-wizard__spinner">${T(`channels.setup.starting`)}</div>`:t.phase===`error`?a=b`
      <div class="channels-wizard__error">${t.message}</div>
      <div class="channels-wizard__footer">
        <button type="button" class="btn" @click=${()=>e.onClose()}>
          ${T(`common.close`)}
        </button>
      </div>
    `:t.phase===`done`?a=It(t.channels,e):i&&(a=b`
      ${t.phase===`step`&&t.validationError?b`<div class="channels-wizard__error">${t.validationError}</div>`:_}
      ${Pt(i,e)}
      ${t.phase===`step`&&t.busy&&i.executor!==`gateway`?b`<div class="channels-wizard__spinner">${T(`channels.setup.working`)}</div>`:_}
    `),b`
    <openclaw-modal-dialog
      label=${T(`channels.setup.dialogLabel`,{channel:r})}
      @modal-cancel=${()=>e.onClose()}
    >
      <div class="channels-wizard">
        <div class="channels-wizard__header">
          ${n?R(n,r,`tile`):_}
          <div class="channels-wizard__heading">
            <h2>${T(`channels.setup.title`,{channel:r})}</h2>
            <div class="muted">${T(`channels.setup.subtitle`)}</div>
          </div>
        </div>
        <div class="channels-wizard__body">${Lt(n,i)} ${a}</div>
      </div>
    </openclaw-modal-dialog>
  `}var zt=e((()=>{je(),Oe(),y(),ye(),Te(),E(),D(),z()}));function Bt(e){let t=Ht(e.snapshot),n=t.filter(t=>at(t,e)),r=t.filter(t=>!at(t,e)),i=!!(e.loading&&e.snapshot&&e.lastSuccessAt),o=e.snapshot?.warnings?.filter(e=>e.trim())??[],s=Vt(e),c=e.selectedChannel;return b`
    ${Ae(b`
      ${i?b`<div class="callout info">${T(`channels.refreshingStaleSnapshot`)}</div>`:_}
      ${e.snapshot?.partial?b`
            <div class="callout warn">
              ${T(`channels.hub.partialSnapshot`)}
              ${o.length>0?o.slice(0,3).join(`; `):``}
            </div>
          `:_}
      ${e.lastError?b`<div class="callout danger">${e.lastError}</div>`:_}
      ${e.setupBlockedByDirtyConfig&&e.configFormDirty?b`<div class="callout warn">${T(`channels.hub.saveBeforeSetup`)}</div>`:_}
      ${xt(e)}
      ${M({title:T(`channels.hub.connectedTitle`),...n.length>0?{count:n.length}:{},actions:b`
            <span class="settings-row__value">
              ${e.lastSuccessAt?T(`channels.hub.updatedAgo`,{ago:a(e.lastSuccessAt)}):T(`common.na`)}
            </span>
            <button
              type="button"
              class="btn btn--sm"
              ?disabled=${e.loading}
              @click=${()=>e.onRefresh(!0)}
            >
              ${T(`common.refresh`)}
            </button>
          `},n.length===0?b`
              <div class="channels-empty">
                <!-- No configured transports is a true empty state, so Clawd rests here. -->
                <openclaw-mascot mood="sleepy" .size=${80}></openclaw-mascot>
                ${A(T(`channels.hub.noneConnected`))}
              </div>
            `:n.map(t=>qt(t,e)))}
      ${M({title:T(`channels.hub.addTitle`),description:T(`channels.hub.addSubtitle`)},b`
          ${r.map(t=>Jt(t,e))} ${Yt(e)}
        `)}
    `)}
    ${c?At({channelId:c,label:Q(e.snapshot,c),props:e,data:s,onClose:()=>e.onCloseDetail(),onSetup:()=>e.onStartSetup(c)}):_}
    ${Rt({wizard:e.wizard,channelLabel:t=>Q(e.snapshot,t),multiselectValues:e.wizardMultiselect,onToggleMultiselect:e.onWizardToggleMultiselect,textValue:e.wizardTextValue,secretVisible:e.wizardSecretVisible,onTextInput:e.onWizardTextInput,onToggleSecretVisibility:e.onWizardToggleSecretVisibility,onAnswer:e.onWizardAnswer,onClose:e.onWizardClose,whatsappQrDataUrl:e.whatsappQrDataUrl,whatsappMessage:e.whatsappMessage,whatsappConnected:e.whatsappConnected,whatsappBusy:e.whatsappBusy,onWhatsAppStart:e.onWhatsAppStart,onWhatsAppWait:e.onWhatsAppWait})}
    ${Ct(e)}
  `}function Vt(e){let t=e.snapshot?.channels;return{whatsapp:t?.whatsapp??void 0,telegram:t?.telegram??void 0,discord:t?.discord??null,googlechat:t?.googlechat??null,slack:t?.slack??null,signal:t?.signal??null,imessage:t?.imessage??null,nostr:t?.nostr??null,channelAccounts:e.snapshot?.channelAccounts??null}}function Ht(e){return e?.channelMeta?.length?e.channelMeta.map(e=>e.id):e?.channelOrder?.length?e.channelOrder:[`whatsapp`,`telegram`,`discord`,`googlechat`,`slack`,`signal`,`imessage`,`nostr`]}function Q(e,t){let n=e?.channelLabels;return e?.channelMeta?.find(e=>e.id===t)?.label??(n&&Object.hasOwn(n,t)?n[t]:void 0)??t}function Ut(e,t){let n=e?.channelDetailLabels,r=e?.channelMeta?.find(e=>e.id===t)?.detailLabel??(n&&Object.hasOwn(n,t)?n[t]:null);return r&&r!==Q(e,t)?r:null}function Wt(e,t){let n=U(e,t);return(typeof n.status?.lastError==`string`&&n.status.lastError.trim()?n.status.lastError:l(t.snapshot?.channelAccounts,e).find(e=>e.lastError)?.lastError)?`attention`:n.running===!0||n.connected===!0?`running`:`configured`}function Gt(e){switch(e){case`running`:return k({kind:`ok`,label:T(`channels.hub.stateRunning`)});case`configured`:return k({kind:`muted`,label:T(`channels.hub.stateConfigured`)});case`attention`:return k({kind:`danger`,label:T(`channels.hub.stateAttention`)});default:return e}}function Kt(e,t){let n=l(t.snapshot?.channelAccounts,e).reduce((e,t)=>Math.max(e,t.lastInboundAt??0),0);return n?T(`channels.hub.lastMessageAgo`,{ago:a(n)}):null}function qt(e,t){let n=Q(t.snapshot,e),r=Kt(e,t)??Ut(t.snapshot,e)??T(`channels.hub.openDetails`);return b`
    <button
      type="button"
      class="settings-row settings-row--nav channels-item"
      @click=${()=>t.onShowDetail(e)}
    >
      ${R(e,n,`tile`)}
      <div class="settings-row__text">
        <span class="settings-row__title">${n}</span>
        <span class="settings-row__desc">${r}</span>
      </div>
      <div class="settings-row__control">
        ${Gt(Wt(e,t))}
        <span class="settings-row__chevron">${O.chevronRight}</span>
      </div>
    </button>
  `}function Jt(e,t){let n=Q(t.snapshot,e),r=Ut(t.snapshot,e)??T(`channels.hub.guidedSetup`);return b`
    <div class="settings-row channels-item">
      <button
        type="button"
        class="channels-item__detail"
        title=${T(`channels.hub.openDetails`)}
        @click=${()=>t.onShowDetail(e)}
      >
        ${R(e,n,`tile`)}
        <span class="settings-row__text">
          <span class="settings-row__title">${n}</span>
          <span class="settings-row__desc">${r}</span>
        </span>
      </button>
      <div class="settings-row__control">
        <button type="button" class="btn btn--sm" @click=${()=>t.onStartSetup(e)}>
          ${T(`channels.hub.setUp`)}
        </button>
      </div>
    </div>
  `}function Yt(e){return b`
    <button
      type="button"
      class="settings-row settings-row--nav channels-item"
      @click=${()=>e.onStartSetup(null)}
    >
      <span
        class="channels-tile channels-tile--fallback"
        style="--channels-art-a:#64748b;--channels-art-b:#1e293b"
        aria-hidden="true"
      >
        <span>+</span>
      </span>
      <div class="settings-row__text">
        <span class="settings-row__title">${T(`channels.hub.browseAllTitle`)}</span>
        <span class="settings-row__desc">${T(`channels.hub.browseAllSubtitle`)}</span>
      </div>
      <div class="settings-row__control">
        <span class="settings-row__chevron">${O.chevronRight}</span>
      </div>
    </button>
  `}var Xt=e((()=>{y(),Ze(),be(),_e(),j(),E(),f(),g(),z(),jt(),wt(),Y(),zt()}));async function Zt(e,t,n,r){let i,a=!1,o=e.request(t,n).then(e=>(a&&r?.(e),e));try{return await Promise.race([o,new Promise((e,n)=>{i=setTimeout(()=>{a=!0,n(Error(`wizard request timed out: ${t}`))},$t)})])}finally{clearTimeout(i)}}function Qt(e,t){!t.sessionId||t.done||e.request(`wizard.cancel`,{sessionId:t.sessionId}).catch(()=>{})}var $t,en,tn=e((()=>{h(),$t=12e4,en=class{constructor(e,t,n,r){this.getClient=e,this.onChange=t,this.isKnownChannel=n,this.sessionExpiredMessage=r,this.currentState={phase:`idle`},this.sessionId=null,this.channel=null,this.stepIndex=0,this.generation=0,this.abortController=null}get state(){return this.currentState}async start(e){let t=this.getClient();if(!t)return;let n=++this.generation;this.abortController?.abort(),this.abortController=new AbortController,this.sessionId=null,this.channel=e,this.stepIndex=0,this.setState({phase:`starting`,channel:e});try{let r=await Zt(t,`wizard.start`,{flow:`channels`,...e?{channel:e}:{}},e=>Qt(t,e));if(this.generation!==n){Qt(t,r);return}this.sessionId=r.sessionId??null,this.applyResult(r)}catch(t){if(this.generation!==n)return;this.setState({phase:`error`,channel:e,message:String(t)})}}async answer(e){let t=this.currentState;if(!this.getClient()||!this.sessionId||t.phase!==`step`||t.busy)return;let n=this.generation;t.step.type===`select`&&typeof e==`string`&&this.isKnownChannel(e)&&(this.channel??=e),this.setState({...t,busy:!0,validationError:null}),await this.advance(n,{stepId:t.step.id,value:e})}async advance(e,t){let n=this.getClient(),r=this.sessionId;if(!n||!r||this.generation!==e)return;let i=this.abortController?.signal;if(!(!t&&!i))try{let a={sessionId:r,...t?{answer:t}:{}},o=t?await Zt(n,`wizard.next`,a):await n.request(`wizard.next`,a,{timeoutMs:null,...i?{signal:i}:{}});if(this.generation!==e)return;this.applyResult(o)}catch(t){if(this.generation!==e)return;if(m(t)){this.sessionId=null,this.abortController?.abort(),this.abortController=null,this.setState({phase:`error`,channel:this.channel,message:this.sessionExpiredMessage()});return}this.setState({phase:`error`,channel:this.channel,message:String(t)})}}async cancel(){let e=this.getClient(),t=this.sessionId;if(this.generation+=1,this.sessionId=null,this.abortController?.abort(),this.abortController=null,this.channel=null,this.setState({phase:`idle`}),e&&t)try{await e.request(`wizard.cancel`,{sessionId:t})}catch{}}applyResult(e){if(!e.done&&e.step){this.stepIndex+=1;let t=e.step.executor===`gateway`;this.setState({phase:`step`,channel:this.channel,step:e.step,stepIndex:this.stepIndex,busy:t,validationError:e.error??null}),t&&this.advance(this.generation);return}if(e.status===`done`){this.sessionId=null,this.abortController=null;let t=e.channels??[];this.setState({phase:`done`,channel:this.channel??t[0]??null,channels:t,accounts:e.accounts??[]});return}if(e.status===`cancelled`){this.sessionId=null,this.abortController=null,this.channel=null,this.setState({phase:`idle`});return}this.sessionId=null,this.abortController=null,this.setState({phase:`error`,channel:this.channel,message:e.error??`Wizard failed.`})}setState(e){this.currentState=e,this.onChange()}}})),nn,rn=e((()=>{E(),tn(),nn=class{constructor(e){this.deps=e,this.multiselect=[],this.textValue=``,this.secretVisible=!1,this.blockedByDirtyConfig=!1,this.multiselectStepId=null,this.textStepId=null,this.lastPhase=`idle`,this.controller=new en(()=>e.getContext()?.gateway.snapshot.client??null,()=>this.handleControllerChange(),t=>e.getContext()?.channels.state.channelsSnapshot?.channelMeta?.some(e=>e.id===t)??!1,()=>T(`channels.setup.sessionExpired`))}get state(){return this.controller.state}startSetup(e){if(this.deps.getContext()?.runtimeConfig.state.configFormDirty){this.blockedByDirtyConfig=!0,this.deps.requestUpdate();return}this.blockedByDirtyConfig=!1,this.whatsappAccountId=void 0,this.deps.clearSelection(),this.controller.start(e)}close(){let e=this.controller.state.phase!==`idle`;this.controller.cancel(),e&&this.deps.getContext()?.channels.refresh(!0)}cancelOnDisconnect(){this.controller.cancel()}answer(e){this.controller.answer(e)}toggleMultiselect(e){this.multiselect=this.multiselect.includes(e)?this.multiselect.filter(t=>t!==e):[...this.multiselect,e],this.deps.requestUpdate()}setTextValue(e){this.textValue=e}toggleSecretVisibility(){this.secretVisible=!this.secretVisible,this.deps.requestUpdate()}handleControllerChange(){let e=this.controller.state,t=e.phase===`step`?e.step.id:null;t!==this.multiselectStepId&&(this.multiselectStepId=t,this.multiselect=e.phase===`step`&&Array.isArray(e.step.initialValue)?[...e.step.initialValue]:[]),t!==this.textStepId&&(this.textStepId=t,this.textValue=e.phase===`step`&&e.step.type===`text`&&typeof e.step.initialValue==`string`?e.step.initialValue:``,this.secretVisible=!1),e.phase===`done`&&this.lastPhase!==`done`&&this.handleCompleted(e.accounts),this.lastPhase=e.phase,this.deps.requestUpdate()}async handleCompleted(e){let t=this.deps.getContext();if(!t)return;await t.runtimeConfig.refresh({discardPendingChanges:!0}),await t.channels.refresh(!0);let n=e.find(e=>e.channel===`whatsapp`);n&&(this.whatsappAccountId=n.accountId,await t.channels.startWhatsApp(!1,n.accountId))}}}));function an(e,t){return e instanceof DOMException&&e.name===`TimeoutError`?T(`channels.nostr.notices.timeout`):T(`channels.nostr.notices.operationFailed`,{prefix:t,error:String(e)})}var on,sn,$;e((()=>{ne(),y(),v(),fe(),pe(),ce(),me(),ie(),j(),De(),E(),f(),Me(),i(),Se(),o(),qe(),I(),Xt(),rn(),t(),on=3e4,sn=`https://docs.openclaw.ai/channels`,$=class extends s{constructor(...e){super(...e),this.nostrProfileFormState=null,this.nostrProfileAccountId=null,this.selectedChannel=null,this.pairingChannelFilter=null,this.pairingAccountFilter=null,this.pairingPrompt=null,this.pairingNotice=null,this.showAdvancedSettings=!1,this.wizardHost=new nn({getContext:()=>this.context,requestUpdate:()=>this.requestUpdate(),clearSelection:()=>{this.selectedChannel=null}}),this.schemaLoadStarted=!1,this.gatewayPairingAuthSignature=null,this.gateway=new Ne(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.clearNostrForm(),onSnapshot:e=>this.handleGatewaySnapshot(e)}),this.pairingPolling=new Ce(this,on,()=>{let e=this.context?.gateway.snapshot;e?.phase===`connected`&&S(e.hello?.auth??null)&&this.context.channels.refreshPairing()},!1),this.subscriptions=new r(this).effect(()=>this.context?.channels,e=>{let t=this.channelsSource!==void 0&&this.channelsSource!==e;this.channelsSource=e,t&&this.invalidateNostrForm();let n=()=>{this.channelsSource===e&&(this.reconcilePairingFilter(e.state.pairingSnapshot),this.requestUpdate())};return n(),e.subscribe(n)}).effect(()=>this.context?.runtimeConfig,e=>{this.schemaLoadStarted=!1;let t=()=>{this.context.runtimeConfig===e&&(this.requestUpdate(),this.ensureInitialData())};t();let n=e.subscribe(t);return()=>{n(),this.schemaLoadStarted=!1}}).watch(()=>this.context?.theme,(e,t)=>e.subscribe(t),()=>{this.showAdvancedSettings=re().showAdvancedSettings===!0})}handleGatewaySnapshot(e){let t=e.snapshot,n=S(t.hello?.auth??null),r=u(t),i=!e.initial&&this.gatewayPairingAuthSignature!==r;(e.identityChanged||t.phase!==`connected`)&&this.clearNostrForm(),(e.identityChanged||i||t.phase!==`connected`||!n)&&(this.pairingPrompt=null,this.pairingChannelFilter=null,this.pairingAccountFilter=null,this.pairingNotice=null),this.gatewayPairingAuthSignature=r,this.syncPairingPolling(t),t.phase===`connected`&&t.client?(e.initial||this.ensureInitialData(),!e.initial&&(e.identityChanged||e.connectionChanged||i)&&n&&this.context.channels.refreshPairing()):this.schemaLoadStarted=!1}syncPairingPolling(e){if(e.phase===`connected`&&e.client&&S(e.hello?.auth??null)){this.pairingPolling.start();return}this.pairingPolling.stop()}ensureInitialData(){let e=this.context,t=e.gateway.snapshot,n=t.client;if(t.phase!==`connected`||!n)return;let r=e.channels.state,i=e.runtimeConfig.state;!r.channelsSnapshot&&!r.channelsLoading&&e.channels.refresh(!1),S(t.hello?.auth??null)&&!r.pairingSnapshot&&!r.pairingLoading&&e.channels.refreshPairing(),!i.configSnapshot&&!i.configLoading&&e.runtimeConfig.ensureLoaded(),!i.configSchema&&!i.configSchemaLoading&&!this.schemaLoadStarted&&(this.schemaLoadStarted=!0,e.runtimeConfig.ensureSchemaLoaded())}disconnectedCallback(){this.wizardHost.cancelOnDisconnect(),this.selectedChannel=null,this.channelsSource=void 0,this.gatewayPairingAuthSignature=null,this.pairingPrompt=null,this.pairingChannelFilter=null,this.pairingAccountFilter=null,this.pairingNotice=null,this.pairingPolling.stop(),this.invalidateNostrForm(),this.subscriptions.clear(),this.schemaLoadStarted=!1,super.disconnectedCallback()}setShowAdvancedSettings(e){ae({showAdvancedSettings:e}),this.context.theme.refresh()}async saveChannelConfig(){let e=this.context;if(!e)return;let t=await e.runtimeConfig.save(),n=e.runtimeConfig.state.lastError;if(!t){await e.runtimeConfig.refresh(),n&&!e.runtimeConfig.state.lastError&&(e.runtimeConfig.state.lastError=n),this.requestUpdate();return}await e.channels.refresh(!0)}async reloadChannelConfig(){let e=this.context;e&&(await e.runtimeConfig.refresh({discardPendingChanges:!0}),await e.channels.refresh(!0))}resolveNostrAccountId(){let e=this.context?.channels.state.channelsSnapshot?.channelAccounts?.nostr??[];return this.nostrProfileAccountId??e[0]?.accountId??`default`}buildGatewayHttpHeaders(e){let t=le({hello:e.snapshot.hello,settings:{token:e.connection.token},password:e.connection.password});return t?{Authorization:t}:{}}clearNostrForm(){this.nostrProfileFormState=null,this.nostrProfileAccountId=null}invalidateNostrForm(){this.gateway.invalidate(),this.clearNostrForm()}beginNostrOperation(){let e=this.gateway.gateway,t=this.context.channels,n=this.gateway.capture();return!e||!n||this.channelsSource!==t||this.context.gateway!==e||(this.gateway.invalidate(),n=this.gateway.capture(),!n)?null:{scope:n,gateway:e,channels:t,formAccountId:this.nostrProfileAccountId,accountId:this.resolveNostrAccountId(),headers:this.buildGatewayHttpHeaders(e)}}currentNostrForm(e){let t=this.nostrProfileFormState;return!t||!this.gateway.isCurrent(e.scope)||this.nostrProfileAccountId!==e.formAccountId||this.context.gateway!==e.gateway||this.context.channels!==e.channels||e.gateway.snapshot.client!==e.scope.client?null:t}editNostrProfile(e,t){this.gateway.invalidate(),this.nostrProfileAccountId=e,this.nostrProfileFormState=Xe(t??void 0)}cancelNostrProfile(){this.invalidateNostrForm()}changeNostrProfileField(e,t){let n=this.nostrProfileFormState;n&&(this.nostrProfileFormState={...n,values:{...n.values,[e]:t},fieldErrors:{...n.fieldErrors,[e]:``}})}toggleNostrProfileAdvanced(){let e=this.nostrProfileFormState;e&&(this.nostrProfileFormState={...e,showAdvanced:!e.showAdvanced})}async saveNostrProfile(){let e=this.nostrProfileFormState;if(!e||e.saving||e.importing)return;let t=this.beginNostrOperation();if(!t)return;let n={...e,saving:!0,error:null,success:null,fieldErrors:{}};this.nostrProfileFormState=n;try{let{data:n,response:r}=await Ge({accountId:t.accountId,headers:t.headers,values:e.values}),i=this.currentNostrForm(t);if(!i)return;if(!r.ok||n?.ok===!1||!n){this.nostrProfileFormState={...i,saving:!1,error:n?.error??T(`channels.nostr.notices.updateFailedStatus`,{status:String(r.status)}),success:null,fieldErrors:We(n?.details)};return}if(!n.persisted){this.nostrProfileFormState={...i,saving:!1,error:T(`channels.nostr.notices.publishFailed`),success:null};return}this.nostrProfileFormState={...i,saving:!1,error:null,success:T(`channels.nostr.notices.published`),fieldErrors:{},original:{...e.values}},await t.channels.refresh(!0)}catch(e){let n=this.currentNostrForm(t);if(!n)return;this.nostrProfileFormState={...n,saving:!1,error:an(e,T(`channels.nostr.notices.updateFailed`)),success:null}}}async importNostrProfile(){let e=this.nostrProfileFormState;if(!e||e.importing||e.saving)return;let t=this.beginNostrOperation();if(t){this.nostrProfileFormState={...e,importing:!0,error:null,success:null};try{let{data:e,response:n}=await Ke({accountId:t.accountId,headers:t.headers}),r=this.currentNostrForm(t);if(!r)return;if(!n.ok||e?.ok===!1||!e){this.nostrProfileFormState={...r,importing:!1,error:e?.error??T(`channels.nostr.notices.importFailedStatus`,{status:String(n.status)}),success:null};return}let i=e.merged??e.imported??null,a=i?{...r.values,...i}:r.values;this.nostrProfileFormState={...r,importing:!1,values:a,error:null,success:e.saved?T(`channels.nostr.notices.importedFromRelays`):T(`channels.nostr.notices.imported`),showAdvanced:!!(a.banner||a.website||a.nip05||a.lud16)},e.saved&&await t.channels.refresh(!0)}catch(e){let n=this.currentNostrForm(t);if(!n)return;this.nostrProfileFormState={...n,importing:!1,error:an(e,T(`channels.nostr.notices.importFailed`)),success:null}}}}reconcilePairingFilter(e){if(!e||!this.pairingChannelFilter)return;let t=e.accounts.filter(e=>e.channel===this.pairingChannelFilter);if(t.length===0){this.pairingChannelFilter=null,this.pairingAccountFilter=null;return}this.pairingAccountFilter&&!t.some(e=>e.accountId===this.pairingAccountFilter)&&(this.pairingAccountFilter=null)}setPairingFilter(e,t){this.pairingChannelFilter=e,this.pairingAccountFilter=e?t:null}reviewPairingAccount(e,t){this.selectedChannel=null,this.setPairingFilter(e,t),this.updateComplete.then(()=>{this.renderRoot.querySelector(`#channels-pairing-requests`)?.scrollIntoView({behavior:`smooth`,block:`start`})})}openPairingPrompt(e,t){this.context.channels.state.pairingBusyRequestId||(this.pairingNotice=null,this.pairingPrompt={kind:e,request:t,notify:!1,bootstrapCommandOwner:!1})}patchPairingPrompt(e){this.pairingPrompt&&={...this.pairingPrompt,...e}}async confirmPairingPrompt(){let e=this.pairingPrompt;if(!e)return;if(e.kind===`dismiss`){await this.context.channels.dismissPairing({channel:e.request.channel,accountId:e.request.accountId,requestId:e.request.requestId})&&this.pairingPrompt===e&&(this.pairingPrompt=null,this.pairingNotice=T(`channels.pairing.dismissedNotice`));return}let t=await this.context.channels.approvePairing({channel:e.request.channel,accountId:e.request.accountId,requestId:e.request.requestId,notify:e.notify,bootstrapCommandOwner:e.bootstrapCommandOwner});!t||this.pairingPrompt!==e||(this.pairingPrompt=null,t.notification===`failed`&&t.commandOwnerBootstrap===`unavailable`?this.pairingNotice=T(`channels.pairing.approvedFollowupsFailedNotice`):t.commandOwnerBootstrap===`unavailable`?this.pairingNotice=T(`channels.pairing.approvedOwnerFailedNotice`):t.notification===`failed`?this.pairingNotice=T(`channels.pairing.approvedNotificationFailedNotice`):t.commandOwnerBootstrap===`configured`?this.pairingNotice=T(`channels.pairing.approvedOwnerNotice`):this.pairingNotice=T(`channels.pairing.approvedNotice`))}render(){let e=this.context,t=e.channels.state,n=e.runtimeConfig.state,r=e.gateway.snapshot.hello?.auth??null,i=S(r),a=de(r);return b`
      <section class="content-header">
        <div>
          <div class="page-title">${se(`channels`)}</div>
          <div class="page-subtitle">
            ${oe(`channels`)}
            ${ke(sn,T(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${Ee(Bt({connected:t.connected,loading:t.channelsLoading,snapshot:t.channelsSnapshot,lastError:t.channelsError,lastSuccessAt:t.channelsLastSuccess,pairingLoading:t.pairingLoading,pairingSnapshot:t.pairingSnapshot,pairingError:t.pairingError,pairingLastSuccessAt:t.pairingLastSuccess,pairingBusyRequestId:t.pairingBusyRequestId,pairingChannelFilter:this.pairingChannelFilter,pairingAccountFilter:this.pairingAccountFilter,pairingPrompt:this.pairingPrompt,pairingNotice:this.pairingNotice,canManagePairing:i,canAdmin:a,whatsappMessage:t.whatsappLoginMessage,whatsappQrDataUrl:t.whatsappLoginQrDataUrl,whatsappConnected:t.whatsappLoginConnected,whatsappBusy:t.whatsappBusy,configSchema:n.configSchema,configSchemaLoading:n.configSchemaLoading,configForm:n.configForm,configUiHints:n.configUiHints,configSaving:n.configSaving,configFormDirty:n.configFormDirty,showAdvancedSettings:this.showAdvancedSettings,nostrProfileFormState:this.nostrProfileFormState,nostrProfileAccountId:this.nostrProfileAccountId,selectedChannel:this.selectedChannel,wizard:this.wizardHost.state,wizardMultiselect:this.wizardHost.multiselect,wizardTextValue:this.wizardHost.textValue,wizardSecretVisible:this.wizardHost.secretVisible,setupBlockedByDirtyConfig:this.wizardHost.blockedByDirtyConfig,onShowDetail:e=>{this.selectedChannel=e},onCloseDetail:()=>{this.selectedChannel=null},onStartSetup:e=>this.wizardHost.startSetup(e),onWizardAnswer:e=>this.wizardHost.answer(e),onWizardToggleMultiselect:e=>this.wizardHost.toggleMultiselect(e),onWizardTextInput:e=>this.wizardHost.setTextValue(e),onWizardToggleSecretVisibility:()=>this.wizardHost.toggleSecretVisibility(),onWizardClose:()=>this.wizardHost.close(),onRefresh:t=>void e.channels.refresh(t),onPairingRefresh:()=>void e.channels.refreshPairing(),onPairingFilterChange:(e,t)=>this.setPairingFilter(e,t),onPairingReviewAccount:(e,t)=>this.reviewPairingAccount(e,t),onPairingApprove:e=>this.openPairingPrompt(`approve`,e),onPairingDismiss:e=>this.openPairingPrompt(`dismiss`,e),onPairingPromptChange:e=>this.patchPairingPrompt(e),onPairingPromptCancel:()=>{this.pairingPrompt=null},onPairingPromptConfirm:()=>void this.confirmPairingPrompt(),onWhatsAppStart:t=>void e.channels.startWhatsApp(t,this.wizardHost.whatsappAccountId),onWhatsAppWait:()=>void e.channels.waitWhatsApp(this.wizardHost.whatsappAccountId),onWhatsAppLogout:()=>void e.channels.logoutWhatsApp(this.wizardHost.whatsappAccountId),onShowAdvancedSettings:e=>this.setShowAdvancedSettings(e),onConfigPatch:(t,n)=>e.runtimeConfig.patchForm(t,n),onConfigSave:()=>void this.saveChannelConfig(),onConfigReload:()=>void this.reloadChannelConfig(),onNostrProfileEdit:(e,t)=>this.editNostrProfile(e,t),onNostrProfileCancel:()=>this.cancelNostrProfile(),onNostrProfileFieldChange:(e,t)=>this.changeNostrProfileField(e,t),onNostrProfileSave:()=>void this.saveNostrProfile(),onNostrProfileImport:()=>void this.importNostrProfile(),onNostrProfileToggleAdvanced:()=>this.toggleNostrProfileAdvanced()}))}
    `}},n([te({context:ue,subscribe:!0})],$.prototype,`context`,void 0),n([x()],$.prototype,`nostrProfileFormState`,void 0),n([x()],$.prototype,`nostrProfileAccountId`,void 0),n([x()],$.prototype,`selectedChannel`,void 0),n([x()],$.prototype,`pairingChannelFilter`,void 0),n([x()],$.prototype,`pairingAccountFilter`,void 0),n([x()],$.prototype,`pairingPrompt`,void 0),n([x()],$.prototype,`pairingNotice`,void 0),n([x()],$.prototype,`showAdvancedSettings`,void 0),customElements.get(`openclaw-channels-page`)||customElements.define(`openclaw-channels-page`,$)}))();
//# sourceMappingURL=channels-page-BvHAXuiW.js.map