import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Cc as r,Ec as i,Kc as a,Ro as o,Wc as s,qo as c,wc as l}from"./control-ui-core-CrKLOOVi.js";import{K as u,Q as d,W as f,Y as p,_ as m,b as h,it as g}from"./lit-runtime-D5xZwgO1.js";import{d as _,u as v}from"./control-ui-foundation-Dgui328h.js";import{o as y,t as b}from"./control-ui-core-DkYXaYTI.js";import{ot as x,st as S,vt as C,yt as w}from"./control-ui-core-CTll8UdE.js";function T(e,t=null,n){let a=n===void 0&&e.agent?i(e.agent,t):n??null;if(a)return p`<img class="agent-select__avatar" src=${a} alt="" loading="lazy" />`;if(e.icon)return p`<span class="agent-select__avatar agent-select__avatar--icon" aria-hidden="true"
      >${e.icon}</span
    >`;let o=e.agent?c(e.agent,t):null,s=r(e.label)||`?`;return p`
    <span
      class="agent-select__avatar agent-select__avatar--text"
      data-avatar=${o??s}
      aria-hidden="true"
    ></span>
  `}function E(e){return p`
    <span class="agent-select__option-copy">
      <span class="agent-select__option-label">${e.label}</span>
      ${e.description?p`<span class="agent-select__option-description">${e.description}</span>`:u}
    </span>
  `}var D,O,k=e((()=>{_(),v(),f(),d(),m(),b(),o(),l(),a(),w(),x(),t(),D=3e4,O=class extends s{constructor(...e){super(...e),this.options=[],this.value=``,this.placeholder=``,this.accessibleLabel=``,this.identityById={},this.authToken=null,this.disabled=!1,this.onSelect=()=>{},this.onCreateAgent=null,this.avatarBlobUrlByRoute=new Map,this.avatarFetchByRoute=new Map,this.handleSelect=e=>{if(this.disabled){e.preventDefault();return}let t=e.detail.item;if(t.hasAttribute(`data-create-agent`)){this.onCreateAgent?.();return}let n=t.value??t.getAttribute(`value`);if(n!=null){if(n===this.value){e.preventDefault(),t.checked=!0;let n=e.currentTarget;n.querySelector(`[slot="trigger"]`)?.focus({preventScroll:!0}),n.open=!1;return}this.onSelect(n)}},this.handleAfterShow=e=>{let t=e.currentTarget,n=Array.from(t.querySelectorAll(`wa-dropdown-item[data-agent-option]:not([disabled])`)),r=n.find(e=>e.hasAttribute(`data-selected`))??n[0];if(r){for(let e of n)e.active=e===r;r.focus({preventScroll:!0}),r.scrollIntoView?.({block:`nearest`})}}}disconnectedCallback(){this.resetAvatarState(),super.disconnectedCallback()}willUpdate(e){if(e.has(`authToken`)&&this.resetAvatarState(),e.has(`disabled`)&&this.disabled){let e=this.querySelector(`wa-dropdown`);e&&(e.open=!1)}}resetAvatarState(){for(let e of this.avatarFetchByRoute.values())e.controller.abort();for(let e of this.avatarBlobUrlByRoute.values())e&&URL.revokeObjectURL(e);this.avatarBlobUrlByRoute.clear(),this.avatarFetchByRoute.clear()}ensureLocalAvatar(e,t){if(this.avatarFetchByRoute.has(e))return;let n={authToken:t,controller:new AbortController};this.avatarFetchByRoute.set(e,n),this.fetchLocalAvatarBlobUrl(e,n).then(r=>{if(this.avatarFetchByRoute.get(e)!==n){r&&URL.revokeObjectURL(r);return}if(!this.isConnected||this.authToken!==t){this.avatarFetchByRoute.delete(e),r&&URL.revokeObjectURL(r);return}this.avatarBlobUrlByRoute.set(e,r),this.avatarFetchByRoute.delete(e),r&&this.requestUpdate()})}async fetchLocalAvatarBlobUrl(e,t){let n=setTimeout(()=>t.controller.abort(new DOMException(`agent avatar fetch timed out`,`TimeoutError`)),D);try{let n=await fetch(e,{headers:{Authorization:`Bearer ${t.authToken}`},signal:t.controller.signal});return n.ok?URL.createObjectURL(await n.blob()):``}catch{return``}finally{clearTimeout(n)}}renderAvatar(e){let t=e.agent?.id,n=t?this.identityById[t]??null:null,r=e.agent?i(e.agent,n):null;return T(e,n,r?this.resolveRenderableAvatarUrl(r):null)}resolveRenderableAvatarUrl(e){if(!this.authToken||!e.startsWith(`/`))return e;let t=this.avatarBlobUrlByRoute.get(e);return t===void 0?(this.ensureLocalAvatar(e,this.authToken),null):t||null}render(){let e=this.options.find(e=>e.value===this.value),t=!e&&this.value?{value:this.value,label:this.value,agent:{id:this.value}}:null,n=e??t,r=this.disabled||this.options.length===0&&!this.onCreateAgent,i=n?.label??(this.placeholder||y(`agents.noAgents`)),a=e?.badge,o=a?`${i}, ${a}`:i;return p`
      <wa-dropdown
        class="agent-select"
        placement="bottom-start"
        aria-label=${this.accessibleLabel||i}
        @wa-select=${this.handleSelect}
        @wa-after-show=${this.handleAfterShow}
      >
        <button
          slot="trigger"
          type="button"
          class="agent-select__trigger"
          aria-label=${this.accessibleLabel?`${this.accessibleLabel}: ${o}`:o}
          ?disabled=${r}
        >
          ${n?this.renderAvatar(n):u}
          <span class="agent-select__label">${i}</span>
          ${a?p`<span class="agent-select__badge">${a}</span>`:u}
          <span class="agent-select__chevron" aria-hidden="true">${C.chevronDown}</span>
        </button>
        ${this.options.map(e=>{let t=e.value===this.value;return p`
            <wa-dropdown-item
              class="agent-select__option"
              data-agent-option
              ?data-selected=${t}
              aria-label=${[e.label,e.description,e.badge].filter(Boolean).join(`, `)}
              .value=${e.value}
              type="checkbox"
              .checked=${t}
              ?disabled=${this.disabled||e.disabled}
              ${h(e=>S(e,t))}
            >
              <span slot="icon">${this.renderAvatar(e)}</span>
              ${E(e)}
              ${e.badge?p`<span slot="details" class="agent-select__badge">${e.badge}</span>`:u}
            </wa-dropdown-item>
          `})}
        ${this.onCreateAgent?p`
              ${this.options.length>0?p`<div class="agent-select__separator" role="separator"></div>`:u}
              <wa-dropdown-item
                class="agent-select__option"
                data-create-agent
                ?disabled=${this.disabled}
              >
                <span slot="icon" class="agent-select__footer-icon" aria-hidden="true"
                  >${C.users}</span
                >
                <span class="agent-select__option-label">${y(`custodian.newAgent`)}</span>
              </wa-dropdown-item>
            `:u}
      </wa-dropdown>
    `}},n([g({attribute:!1})],O.prototype,`options`,void 0),n([g({attribute:!1})],O.prototype,`value`,void 0),n([g({attribute:!1})],O.prototype,`placeholder`,void 0),n([g({attribute:!1})],O.prototype,`accessibleLabel`,void 0),n([g({attribute:!1})],O.prototype,`identityById`,void 0),n([g({attribute:!1})],O.prototype,`authToken`,void 0),n([g({attribute:!1})],O.prototype,`disabled`,void 0),n([g({attribute:!1})],O.prototype,`onSelect`,void 0),n([g({attribute:!1})],O.prototype,`onCreateAgent`,void 0)}));export{E as i,k as n,T as r,O as t};
//# sourceMappingURL=agent-select-Dn-QCxWz.js.map