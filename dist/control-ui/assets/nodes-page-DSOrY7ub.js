import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,d as n,l as r,y as i}from"./control-ui-foundation-OE0aAIzW.js";import{$n as a,$s as o,Ar as s,Bc as c,Gs as l,Hc as u,Hs as d,Kc as f,Ks as p,Qn as m,Qs as ee,Rs as te,Un as h,Us as g,Vc as ne,Vs as re,Wc as ie,Xn as _,Xs as ae,Zs as oe,ec as se,is as ce,kr as le,nc as ue,oc as de,qs as v,rc as fe,rr as y,rs as pe,tc as me,zs as he}from"./control-ui-core-BUddgKjW.js";import{K as b,Q as ge,W as x,Y as S,it as _e,nt as C}from"./lit-runtime-D5xZwgO1.js";import{f as ve,i as ye,m as be,p as xe,r as Se}from"./control-ui-foundation-Dgui328h.js";import{Ut as Ce,Wt as we,_ as Te,bt as Ee,jt as De,v as Oe,wt as ke}from"./control-ui-core-Ct5CBwjl.js";import{At as Ae,F as je,Jt as Me,M as w,N as T,Xt as Ne,jt as E,nn as D}from"./control-ui-foundation-DkfOBVsU.js";import{o as O,t as k}from"./control-ui-core-s0pW0mau.js";import{vt as A,yt as j}from"./control-ui-core-vLOElyFQ.js";import{n as Pe,t as Fe}from"./poll-controller-BnQs2EZr.js";import{n as Ie,t as Le}from"./settings-workspace-BbyrBOFl.js";import{c as M,f as N,h as P,i as F,n as Re,p as ze,s as Be,t as I,u as L}from"./settings-ui-Bko7fBdZ.js";import{n as Ve,t as He}from"./gateway-page-controller-D6t8841W.js";import{t as Ue}from"./agent-select-registration-BVCfxMHW.js";import{n as We,t as Ge}from"./confirm-dialog-B87dCyWg.js";import{n as R,t as Ke}from"./platform-label-CpNCbwLC.js";var qe=e((()=>{}));function z(e){let t=E(e?.agents)?e.agents:null,n=E(t?.entries)?t.entries:{},r=[];for(let[e,t]of Object.entries(n)){if(!E(t))continue;let n=D(t.name),i=t.default===!0;r.push({id:e,name:n,isDefault:i,record:t})}return r}function B(e,t){let n=new Set(t),r=[];for(let t of e){if(!(Array.isArray(t.commands)?t.commands:[]).some(e=>n.has(String(e))))continue;let e=D(t.nodeId)??``;if(!e)continue;let i=D(t.displayName)??e;r.push({id:e,label:i===e?e:`${i} · ${e}`})}return r.sort((e,t)=>e.label.localeCompare(t.label)),r}function V(e){let t=e.platform?.trim().toLowerCase()??``,n=e.clientId?.trim().toLowerCase()??``,r=e.clientMode?.trim().toLowerCase()??``;return Ye.test(t)||n===w.WATCHOS_APP?Je:Xe.test(t)?U:Ze.test(t)||Qe.has(n)?A.smartphone:$e.has(n)||r===T.WEBCHAT?A.globe:et.has(r)||tt.has(n)?A.terminal:A.monitor}function H(e){return S`
    <div class="nodes-entry__tile" aria-hidden="true">
      <span class="nodes-entry__tile-icon">${e}</span>
    </div>
  `}var U,Je,Ye,Xe,Ze,Qe,$e,et,tt,W=e((()=>{Ae(),x(),je(),j(),u(),U=S`
  <svg viewBox="0 0 24 24">
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
`,Je=S`
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="6" />
    <polyline points="12 10 12 12 13 13" />
    <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
    <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
  </svg>
`,Ye=/\bwatchos\b/,Xe=/\b(ipados|ipad)\b/,Ze=/\b(ios|android|iphone)\b/,Qe=new Set([w.IOS_APP,w.ANDROID_APP]),$e=new Set([w.CONTROL_UI,w.WEBCHAT_UI,w.WEBCHAT]),et=new Set([T.CLI,T.BACKEND,T.PROBE,T.TEST]),tt=new Set([w.CLI,w.TUI])}));function nt(e){return e===`allowlist`||e===`full`||e===`deny`?e:`deny`}function rt(e){return e===`always`||e===`off`||e===`on-miss`?e:`on-miss`}function it(e){let t=e?.defaults??{};return{security:nt(t.security),ask:rt(t.ask),askFallback:nt(t.askFallback??`deny`),autoAllowSkills:t.autoAllowSkills??!1}}function at(e){return z(e).map(e=>({id:e.id,name:e.name,isDefault:e.isDefault}))}function ot(e,t){let n=at(e),r=Object.keys(t?.agents??{}),i=new Map;n.forEach(e=>i.set(e.id,e)),r.forEach(e=>{i.has(e)||i.set(e,{id:e})});let a=Array.from(i.values());return a.length===0&&a.push({id:`main`,isDefault:!0}),a.sort((e,t)=>{if(e.isDefault&&!t.isDefault)return-1;if(!e.isDefault&&t.isDefault)return 1;let n=e.name?.trim()?e.name:e.id,r=t.name?.trim()?t.name:t.id;return n.localeCompare(r)}),a}function st(e,t){return e===K?K:e&&t.some(t=>t.id===e)?e:K}function ct(e){let t=e.execApprovalsSnapshot,n=g(t)?t:null,r=t&&!g(t)?t:null,i=n?null:e.execApprovalsForm??r?.file??null,a=!!(i||n),o=it(i),s=ot(e.configForm,i),c=gt(e.nodes),l=e.execApprovalsTarget,u=l===`node`&&e.execApprovalsTargetNodeId?e.execApprovalsTargetNodeId:null;l===`node`&&u&&!c.some(e=>e.id===u)&&(u=null);let d=st(e.execApprovalsSelectedAgent,s),f=d===K?null:(i?.agents??{})[d]??null,p=Array.isArray(f?.allowlist)?f.allowlist??[]:[];return{ready:a,disabled:e.execApprovalsSaving||e.execApprovalsLoading,dirty:e.execApprovalsDirty,loading:e.execApprovalsLoading,saving:e.execApprovalsSaving,form:i,nativePolicy:n,defaults:o,selectedScope:d,selectedAgent:f,agents:s,allowlist:p,target:l,targetNodeId:u,targetNodes:c,onSelectScope:e.onExecApprovalsSelectAgent,onSelectTarget:e.onExecApprovalsTargetChange,onPatch:e.onExecApprovalsPatch,onRemove:e.onExecApprovalsRemove,onLoad:e.onLoadExecApprovals,onSave:e.onSaveExecApprovals}}function lt(e){let t=e.ready,n=e.target!==`node`||!!e.targetNodeId,r=S`
    <button
      class="btn"
      ?disabled=${e.disabled||!e.dirty||!n||!!e.nativePolicy}
      @click=${e.onSave}
    >
      ${e.saving?O(`common.saving`):O(`common.save`)}
    </button>
  `,i=S`
    ${dt(e)}
    ${t?e.nativePolicy?ut(e.nativePolicy):S`${ft(e)} ${pt(e)}`:M({title:O(`nodes.execApprovals.loadHint`),control:S`
            <button class="btn" ?disabled=${e.loading||!n} @click=${e.onLoad}>
              ${e.loading?O(`common.loading`):O(`common.loadApprovals`)}
            </button>
          `})}
  `;return S`
    ${L({title:O(`nodes.execApprovals.title`),description:S`
          ${O(`nodes.execApprovals.subtitlePrefix`)}
          <span class="mono">exec host=gateway/node</span>.
        `,actions:r},i)}
    ${t&&!e.nativePolicy&&e.selectedScope!==K?mt(e):b}
  `}function ut(e){let t=e.enabled&&Array.isArray(e.rules)?e.rules:[],n=e.enabled?e.defaultAction:e.message??`unavailable`;return S`
    ${M({title:O(`nodes.execApprovals.hostNativePolicy`),description:O(`nodes.execApprovals.hostNativeHint`),control:P(O(`nodes.execApprovals.native`))})}
    ${M({title:O(`nodes.execApprovals.defaultAction`),description:n,control:P(O(t.length===1?`nodes.execApprovals.rule`:`nodes.execApprovals.rules`,{count:String(t.length)}))})}
    ${t.map(e=>M({title:e.pattern,description:S`
          ${e.action} · ${e.shells?.join(`, `)||O(`nodes.execApprovals.allShells`)} ·
          ${e.enabled===!1?O(`nodes.execApprovals.off`):O(`nodes.execApprovals.on`)}
          ${e.description?S`<br />${h(e.description,120)}`:b}
        `}))}
  `}function dt(e){let t=e.targetNodes.length>0,n=e.targetNodeId??``;return S`
    ${M({title:O(`nodes.execApprovals.target`),description:O(`nodes.execApprovals.targetHint`),control:S`
        <select
          class="settings-select"
          aria-label=${O(`nodes.execApprovals.host`)}
          ?disabled=${e.disabled}
          @change=${t=>{if(t.target.value===`node`){let t=e.targetNodes[0]?.id??null;e.onSelectTarget(`node`,n||t)}else e.onSelectTarget(`gateway`,null)}}
        >
          <option value="gateway" ?selected=${e.target===`gateway`}>
            ${O(`nodes.execApprovals.gateway`)}
          </option>
          <option value="node" ?selected=${e.target===`node`}>
            ${O(`nodes.execApprovals.node`)}
          </option>
        </select>
      `})}
    ${e.target===`node`?M({title:O(`nodes.execApprovals.node`),description:t?void 0:O(`nodes.execApprovals.noNodes`),control:S`
            <select
              class="settings-select"
              aria-label=${O(`nodes.execApprovals.node`)}
              ?disabled=${e.disabled||!t}
              @change=${t=>{let n=t.target.value.trim();e.onSelectTarget(`node`,n||null)}}
            >
              <option value="" ?selected=${n===``}>
                ${O(`nodes.execApprovals.selectNode`)}
              </option>
              ${e.targetNodes.map(e=>S`<option value=${e.id} ?selected=${n===e.id}>
                    ${e.label}
                  </option>`)}
            </select>
          `}):b}
  `}function ft(e){let t=[{value:K,label:O(`nodes.execApprovals.defaults`),icon:A.settings},...e.agents.map(e=>({value:e.id,label:e.name?.trim()?`${e.name} (${e.id})`:e.id,agent:{id:e.id,...e.name?{name:e.name}:{}},badge:e.isDefault?O(`agents.default`):void 0}))];return M({title:O(`nodes.execApprovals.scope`),stacked:!0,control:S`
      <openclaw-agent-select
        class="agent-select--settings"
        .options=${t}
        .value=${e.selectedScope}
        .accessibleLabel=${O(`nodes.execApprovals.scope`)}
        .disabled=${e.disabled}
        .onSelect=${e.onSelectScope}
      ></openclaw-agent-select>
    `})}function G(e,t){return S`
    <select
      class="settings-select"
      aria-label=${t.ariaLabel}
      ?disabled=${e.disabled}
      @change=${n=>{let r=n.target.value;!t.isDefaults&&r===`__default__`?e.onRemove([...t.basePath,t.key]):e.onPatch([...t.basePath,t.key],r)}}
    >
      ${t.isDefaults?b:S`<option value="__default__" ?selected=${t.currentValue===`__default__`}>
            ${O(`nodes.execApprovals.useDefaultValue`,{value:t.defaultValue})}
          </option>`}
      ${t.values.map(e=>S`<option value=${e.value} ?selected=${t.currentValue===e.value}>
            ${O(e.labelKey)}
          </option>`)}
    </select>
  `}function pt(e){let t=e.selectedScope===K,n=e.defaults,r=e.selectedAgent??{},i=t?[`defaults`]:[`agents`,e.selectedScope],a=typeof r.security==`string`?r.security:void 0,o=typeof r.ask==`string`?r.ask:void 0,s=typeof r.askFallback==`string`?r.askFallback:void 0,c=t?n.security:a??`__default__`,l=t?n.ask:o??`__default__`,u=t?n.askFallback:s??`__default__`,d=typeof r.autoAllowSkills==`boolean`?r.autoAllowSkills:void 0,f=d??n.autoAllowSkills,p=d==null;return S`
    ${M({title:O(`nodes.execApprovals.security`),description:t?O(`nodes.execApprovals.defaultSecurity`):O(`nodes.execApprovals.defaultValue`,{value:n.security}),control:G(e,{key:`security`,ariaLabel:O(`nodes.execApprovals.mode`),values:q,currentValue:c,defaultValue:n.security,isDefaults:t,basePath:i})})}
    ${M({title:O(`nodes.execApprovals.ask`),description:t?O(`nodes.execApprovals.defaultPrompt`):O(`nodes.execApprovals.defaultValue`,{value:n.ask}),control:G(e,{key:`ask`,ariaLabel:O(`nodes.execApprovals.mode`),values:_t,currentValue:l,defaultValue:n.ask,isDefaults:t,basePath:i})})}
    ${M({title:O(`nodes.execApprovals.askFallback`),description:t?O(`nodes.execApprovals.promptUnavailable`):O(`nodes.execApprovals.defaultValue`,{value:n.askFallback}),control:G(e,{key:`askFallback`,ariaLabel:O(`nodes.execApprovals.fallback`),values:q,currentValue:u,defaultValue:n.askFallback,isDefaults:t,basePath:i})})}
    ${M({title:O(`nodes.execApprovals.autoAllowSkills`),description:t?O(`nodes.execApprovals.autoAllowSkillsHint`):p?O(`nodes.execApprovals.usingDefault`,{value:n.autoAllowSkills?O(`nodes.execApprovals.on`):O(`nodes.execApprovals.off`)}):O(`nodes.execApprovals.override`,{value:O(f?`nodes.execApprovals.on`:`nodes.execApprovals.off`)}),control:S`
        ${!t&&!p?S`<button
              class="btn btn--sm"
              ?disabled=${e.disabled}
              @click=${()=>e.onRemove([...i,`autoAllowSkills`])}
            >
              ${O(`nodes.execApprovals.useDefault`)}
            </button>`:b}
        ${ze({checked:f,disabled:e.disabled,ariaLabel:O(`nodes.execApprovals.autoAllowSkills`),onChange:t=>e.onPatch([...i,`autoAllowSkills`],t)})}
      `})}
  `}function mt(e){let t=[`agents`,e.selectedScope,`allowlist`],n=e.allowlist;return L({title:O(`nodes.execApprovals.allowlist`),description:O(`nodes.execApprovals.allowlistHint`),actions:S`
        <button
          class="btn btn--sm"
          ?disabled=${e.disabled}
          @click=${()=>{let r=[...n,{pattern:``}];e.onPatch(t,r)}}
        >
          ${O(`nodes.execApprovals.addPattern`)}
        </button>
      `},n.length===0?F(O(`nodes.execApprovals.emptyAllowlist`)):n.map((t,n)=>ht(e,t,n)))}function ht(e,t,n){let r=t.lastUsedAt?m(t.lastUsedAt):O(`common.never`),i=t.lastUsedCommand?h(t.lastUsedCommand,120):null,a=t.lastResolvedPath?h(t.lastResolvedPath,120):null;return M({title:t.pattern?.trim()?t.pattern:O(`nodes.execApprovals.newPattern`),description:S`
      ${O(`nodes.execApprovals.lastUsed`,{time:r})}
      ${i?S`<br /><span class="mono">${i}</span>`:b}
      ${a?S`<br /><span class="mono">${a}</span>`:b}
    `,control:S`
      <input
        class="settings-input"
        type="text"
        aria-label=${O(`nodes.execApprovals.pattern`)}
        .value=${t.pattern??``}
        ?disabled=${e.disabled}
        @input=${t=>{let r=t.target;e.onPatch([`agents`,e.selectedScope,`allowlist`,n,`pattern`],r.value)}}
      />
      <button
        class="btn btn--sm danger"
        ?disabled=${e.disabled}
        @click=${()=>{if(e.allowlist.length<=1){e.onRemove([`agents`,e.selectedScope,`allowlist`]);return}e.onRemove([`agents`,e.selectedScope,`allowlist`,n])}}
      >
        ${O(`nodes.execApprovals.remove`)}
      </button>
    `})}function gt(e){return B(e,[`system.execApprovals.get`,`system.execApprovals.set`])}var K,q,_t,vt=e((()=>{x(),Ue(),j(),I(),k(),y(),d(),W(),K=`__defaults__`,q=[{value:`deny`,labelKey:`nodes.execApprovals.options.deny`},{value:`allowlist`,labelKey:`nodes.execApprovals.options.allowlist`},{value:`full`,labelKey:`nodes.execApprovals.options.full`}],_t=[{value:`off`,labelKey:`nodes.execApprovals.options.off`},{value:`on-miss`,labelKey:`nodes.execApprovals.options.onMiss`},{value:`always`,labelKey:`nodes.execApprovals.options.always`}]}));function J(e){return typeof e==`number`&&Number.isFinite(e)?e:void 0}function Y(e){return Array.isArray(e)?e.map(e=>D(e)).filter(e=>e!==void 0):[]}function yt(e){let t=D(e.nodeId);if(!t)return null;let n=D(e.approvalState);return{nodeId:t,displayName:D(e.displayName),platform:D(e.platform),version:D(e.version),coreVersion:D(e.coreVersion),uiVersion:D(e.uiVersion),modelIdentifier:D(e.modelIdentifier),clientId:D(e.clientId),clientMode:D(e.clientMode),remoteIp:D(e.remoteIp),caps:Y(e.caps),commands:Y(e.commands),approvalState:n&&Mt.has(n)?n:void 0,pendingRequestId:D(e.pendingRequestId),connected:e.connected===!0,paired:e.paired===!0,connectedAtMs:J(e.connectedAtMs),lastSeenAtMs:J(e.lastSeenAtMs),approvedAtMs:J(e.approvedAtMs)}}function bt(e){let t=new Set;for(let n of[...e.roles??[],e.role]){let e=D(n);e&&t.add(e)}return[...t]}function xt(...e){let t;for(let n of e)n!==void 0&&(t===void 0||n>t)&&(t=n);return t}function St(e,t,n,r){let i=t?bt(t):[];n?.paired&&!i.includes(`node`)&&i.push(`node`);let a=D(t?.operatorLabel),o=D(t?.displayName)??D(n?.displayName),s=D(t?.clientId)??n?.clientId;return{id:e,name:a??o??s??e,displayName:o,clientId:s,clientMode:D(t?.clientMode)??n?.clientMode,platform:D(r?.platform)??D(t?.platform)??n?.platform,version:D(r?.version)??n?.version,modelIdentifier:D(r?.modelIdentifier)??n?.modelIdentifier,remoteIp:D(t?.remoteIp)??n?.remoteIp,roles:i,scopes:Y(t?.scopes),connected:n?.connected===!0||t?.connected===!0,autoApproved:t?.approvedVia===`silent`||t?.approvedVia===`trusted-cidr`||t?.approvedVia===`ssh-verified`,lastSeenAtMs:xt(t?.lastSeenAtMs,n?.lastSeenAtMs,n?.connectedAtMs,J(r?.ts)),approvedAtMs:xt(t?.approvedAtMs,n?.approvedAtMs),presence:r,device:t,node:n}}function Ct(e){let t=e.displayName?.trim().toLowerCase();if(t)return`name:${t}`;let n=e.clientId?.trim().toLowerCase(),r=e.clientMode?.trim().toLowerCase();return n||r?`client:${n??``}:${r??``}`:`id:${e.id}`}function wt(e){return e.lastSeenAtMs??e.approvedAtMs??0}function Tt(e,t){if(e.connected!==t.connected)return e.connected?-1:1;let n=wt(t)-wt(e);return n===0?e.id.localeCompare(t.id):n}function Et(e,t){let n=Tt(e.primary,t.primary);return n===0?e.name.localeCompare(t.name):n}function Dt(e){let t=new Map;for(let n of e.nodes){let e=yt(n);e&&t.set(e.nodeId,e)}let n=new Map;for(let t of e.presence??[])for(let e of[t.deviceId,t.instanceId]){let r=D(e)?.toLowerCase();r&&n.set(r,t)}let r=[],i=new Set;for(let a of e.paired){let e=D(a.deviceId);!e||i.has(e)||(i.add(e),r.push(St(e,a,t.get(e),n.get(e.toLowerCase()))))}for(let[e,a]of t)i.has(e)||r.push(St(e,void 0,a,n.get(e.toLowerCase())));let a=new Map;for(let e of r){let t=Ct(e),n=a.get(t);n?n.push(e):a.set(t,[e])}let o=[];for(let[e,t]of a){let n=t.toSorted(Tt),r=n[0];r&&o.push({key:e,name:r.name,primary:r,duplicates:n.slice(1)})}return o.toSorted(Et)}function Ot(e){return e.flatMap(e=>e.duplicates.filter(e=>!e.connected&&(e.autoApproved||e.device!==void 0&&e.device.approvedVia===void 0)))}function kt(e){return e.find(e=>D(e.mode)?.toLowerCase()===`gateway`)}function At(e,t){let n=new Set;for(let e of t)for(let t of[e.primary,...e.duplicates])n.add(t.id.toLowerCase());return e.filter(e=>{if(D(e.mode)?.toLowerCase()===`gateway`||D(e.reason)?.toLowerCase()===`disconnect`)return!1;let t=[e.deviceId,e.instanceId].map(e=>D(e)?.toLowerCase()).filter(e=>e!==void 0);return t.length===0&&!D(e.host)&&!D(e.mode)?!1:!t.some(e=>n.has(e))})}function jt(e){let t=e.roles.includes(`node`),n=e.roles.filter(e=>e!==`node`);return{removeNode:t||e.node?.paired===!0,removeDevice:!!e.device&&(n.length>0||e.roles.length===0)}}var Mt,Nt=e((()=>{u(),Mt=new Set([`approved`,`pending-approval`,`pending-reapproval`,`unapproved`])}));function X(...e){let t=new Set;for(let n of e)for(let e of Ne(n))t.add(e);return[...t].toSorted()}function Pt(e,t){let n=new Set(e);return t.every(e=>n.has(e))}function Ft(e){return{roles:X(e.roles,e.role),scopes:n(e.scopes)}}function It(e){let t=X(e.roles,e.role),r=Array.isArray(e.tokens)?e.tokens:e.tokens?Object.values(e.tokens):void 0;return{roles:r===void 0?t:X(r.filter(e=>!e.revokedAtMs).flatMap(e=>e.role??[])).filter(e=>t.includes(e)),scopes:n(e.scopes)}}function Lt(e,t){let n=Ft(e),r=t?It(t):null;return r?Pt(r.roles,n.roles)?Pt(r.scopes,n.scopes)?{kind:`re-approval`,requested:n,approved:r}:{kind:`scope-upgrade`,requested:n,approved:r}:{kind:`role-upgrade`,requested:n,approved:r}:{kind:`new-pairing`,requested:n,approved:null}}var Rt=e((()=>{Me(),r()}));function zt(e,t,n){let r=new Map(t.map(e=>[D(e.deviceId),e]).filter(e=>!!e[0]));return e.map(e=>Ut(e,n,Bt(r,e)))}function Bt(e,t){let n=D(t.deviceId);if(!n)return;let r=e.get(n);if(!r)return;let i=D(t.publicKey),a=D(r.publicKey);if(!(i&&a&&i!==a))return r}function Vt(e){return e?O(`nodes.inventory.rolesAndScopes`,{roles:_(e.roles),scopes:_(e.scopes)}):O(`nodes.inventory.none`)}function Ht(e){switch(e){case`scope-upgrade`:return O(`nodes.inventory.scopeUpgrade`);case`role-upgrade`:return O(`nodes.inventory.roleUpgrade`);case`re-approval`:return O(`nodes.inventory.reapproval`);case`new-pairing`:return O(`nodes.inventory.newPairing`)}throw Error(`unsupported pending approval kind`)}function Ut(e,t,n){let r=D(e.displayName)||e.deviceId,i=typeof e.ts==`number`?m(e.ts):O(`common.na`),a=Lt(e,n),o=e.isRepair?` · ${O(`nodes.inventory.repair`)}`:``,s=e.remoteIp?` · ${e.remoteIp}`:``;return S`
    <div class="settings-row nodes-entry">
      ${H(A.monitorSmartphone)}
      <div class="settings-row__text">
        <span class="settings-row__title">${r}</span>
        <span class="settings-row__desc">${e.deviceId}${s}</span>
        <span class="settings-row__desc">
          ${O(`nodes.inventory.requestedAt`,{note:Ht(a.kind),time:i})}${o}
        </span>
        <span class="settings-row__desc">
          ${O(`nodes.inventory.requestedAccess`,{access:Vt(a.requested)})}
        </span>
        ${a.approved?S`
              <span class="settings-row__desc">
                ${O(`nodes.inventory.approvedAccess`,{access:Vt(a.approved)})}
              </span>
            `:b}
      </div>
      <div class="settings-row__control">
        <button class="btn btn--sm" @click=${()=>t.onDeviceApprove(e.requestId)}>
          ${O(`nodes.inventory.approve`)}
        </button>
        <button class="btn btn--sm" @click=${()=>t.onDeviceReject(e.requestId)}>
          ${O(`nodes.inventory.reject`)}
        </button>
      </div>
    </div>
  `}var Wt=e((()=>{x(),Rt(),j(),k(),y(),u(),W()}));function Gt(e){let t=jt(e);return{id:e.id,name:e.name,...t}}function Kt(e,t,n){if(n&&e.length===0)return O(`common.loading`);let r=e.filter(e=>e.primary.connected).length,i=[O(`nodes.inventory.summaryConnected`,{connected:String(r),total:String(e.length)})];return t>0&&i.push(O(`nodes.inventory.summaryPending`,{count:String(t)})),i.join(` · `)}function qt(e){let t=e.devicesList??{pending:[],paired:[]},n=Array.isArray(t.pending)?t.pending:[],r=Array.isArray(t.paired)?t.paired:[],i=Dt({paired:r,nodes:e.nodes,presence:e.presence}),a=kt(e.presence),o=At(e.presence,i),s=Ot(i),c=e.loading||e.devicesLoading,l=S`
    ${s.length>0?S`
          <button
            class="btn btn--sm danger"
            @click=${()=>e.onInventoryCleanup(s.map(Gt))}
          >
            ${A.trash} ${O(`nodes.inventory.cleanupStale`,{count:String(s.length)})}
          </button>
        `:b}
    <button
      class="btn"
      title=${e.canPairDevice?``:O(`nodes.pairing.adminRequired`)}
      ?disabled=${!e.canPairDevice}
      @click=${e.onDevicePairSetupOpen}
    >
      ${A.plus} ${O(`nodes.pairing.button`)}
    </button>
  `,u=i.length===0&&!a,d=S`
    ${a?an(a):b}
    ${u?F(O(c?`common.loading`:`nodes.inventory.empty`)):i.map(t=>Jt(t,e))}
  `;return S`
    ${e.devicesError?S`<div class="callout danger">${e.devicesError}</div>`:b}
    ${e.lastError?S`<div class="callout danger">${e.lastError}</div>`:b}
    ${n.length>0?L({title:O(`nodes.inventory.pendingApproval`),count:n.length},zt(n,r,e)):b}
    ${L({title:O(`nodes.inventory.title`),description:Kt(i,n.length,c),actions:l},d)}
    ${o.length>0?L({title:O(`nodes.inventory.connectedWithoutPairing`)},o.map(e=>on(e))):b}
  `}function Jt(e,t){return e.duplicates.length===0?Z(e.primary,t):S`
    ${Z(e.primary,t)}
    <details class="nodes-group__dups">
      <summary>
        ${O(e.duplicates.length===1?`nodes.inventory.olderPairing`:`nodes.inventory.olderPairings`,{count:String(e.duplicates.length),name:e.name})}
      </summary>
      ${e.duplicates.map(e=>Z(e,t))}
    </details>
  `}function Yt(e){let t=D(e)?.toLowerCase();return t===`win32`||t===`windows`||t?.startsWith(`windows `)===!0}function Xt(e){let t=e.node;return t?.paired?t.approvalState===void 0||t.approvalState===`approved`:!1}function Zt(e){let t=D(e.node?.coreVersion);if(t)return t;if(D(e.node?.uiVersion))return;let n=D(e.node?.platform)?.toLowerCase();return n===`darwin`||n===`linux`||n===`win32`||n===`windows`?D(e.node?.version):void 0}function Qt(e,t){let n=[],r=Xt(e),i=Zt(e),a=D(t);if(r&&i&&a&&i!==a){let e=O(`nodes.inventory.versionDriftTitle`,{nodeVersion:i,gatewayVersion:a});n.push(S`<span title=${e}>
        ${N({kind:`warn`,label:O(`nodes.inventory.versionDrift`)})}
      </span>`)}r&&!e.connected&&Yt(e.platform)&&n.push(S`<span title=${O(`nodes.inventory.manualWakeTitle`)}>
        ${N({kind:`warn`,label:O(`nodes.inventory.manualWake`)})}
      </span>`);let o=e.node?.approvalState;return(o===`pending-approval`||o===`pending-reapproval`)&&n.push(N({kind:`warn`,label:O(`nodes.inventory.approvalNeeded`)})),n}function $t(e){return O(`nodes.inventory.inputAgo`,{time:a(e*1e3,{suffix:!1})})}function en(e){let t=[];e.platform&&t.push(R(e.platform)),e.modelIdentifier&&t.push(e.modelIdentifier),e.version&&t.push(e.version),e.connected&&e.presence?.lastInputSeconds!=null?t.push($t(e.presence.lastInputSeconds)):!e.connected&&e.lastSeenAtMs?t.push(O(`nodes.inventory.seen`,{time:m(e.lastSeenAtMs)})):!e.connected&&e.approvedAtMs&&t.push(O(`nodes.inventory.approved`,{time:m(e.approvedAtMs)}));for(let n of e.roles)t.push(n);return e.autoApproved&&t.push(O(`nodes.inventory.autoPaired`)),t.join(` · `)}function tn(e,t){if(t.length===0)return b;let n=t.slice(0,cn),r=t.length-n.length,i=r>0?` +${r}`:``;return S`<div class="muted">${e}: ${_(n)}${i}</div>`}function nn(e,t){let n=e.device?.tokens??[],r=e.node?.caps??[],i=e.node?.commands??[],a=e.scopes;return S`
    <details class="nodes-entry__details">
      <summary>${O(`nodes.inventory.details`)}</summary>
      <div class="muted">${O(`nodes.inventory.deviceId`,{id:e.id})}</div>
      ${e.remoteIp?S`<div class="muted">${O(`nodes.inventory.remoteIp`,{ip:e.remoteIp})}</div>`:b}
      ${a.length>0?S`<div class="muted">
            ${O(`nodes.inventory.scopes`,{scopes:_(a)})}
          </div>`:b}
      ${n.length>0?S`
            <div class="muted">${O(`nodes.inventory.tokens`)}</div>
            ${n.map(n=>sn(e.id,n,t))}
          `:b}
      ${tn(O(`nodes.inventory.capabilities`),r)}
      ${tn(O(`nodes.inventory.commands`),i)}
    </details>
  `}function Z(e,t){let n=e.node?.approvalState===`pending-approval`||e.node?.approvalState===`pending-reapproval`?e.node.pendingRequestId:void 0,r=e.connected?N({kind:`ok`,label:O(`nodes.inventory.connected`)}):N({kind:`muted`,label:O(`nodes.inventory.offline`)});return S`
    <div class="settings-row nodes-entry">
      ${H(V(e))}
      <div class="settings-row__text">
        <span class="settings-row__title">${e.name}</span>
        <span class="settings-row__desc">${en(e)}</span>
        ${nn(e,t)}
      </div>
      <div class="settings-row__control">
        ${r} ${Qt(e,t.gatewayVersion)}
        ${n?S`
              <button class="btn btn--sm" @click=${()=>t.onNodeApprove(n)}>
                ${O(`nodes.inventory.approve`)}
              </button>
              <button class="btn btn--sm" @click=${()=>t.onNodeReject(n)}>
                ${O(`nodes.inventory.reject`)}
              </button>
            `:b}
        <button
          class="btn btn--sm danger"
          aria-label=${O(`nodes.inventory.removeName`,{name:e.name})}
          title=${O(`nodes.inventory.remove`)}
          @click=${()=>t.onInventoryRemove(Gt(e))}
        >
          ${A.x}
        </button>
      </div>
    </div>
  `}function rn(e){let t=[];return e.platform&&t.push(R(e.platform)),e.modelIdentifier&&t.push(e.modelIdentifier),e.version&&t.push(e.version),e.lastInputSeconds!=null&&t.push($t(e.lastInputSeconds)),t}function an(e){let t=rn(e);return S`
    <div class="settings-row nodes-entry">
      ${H(A.server)}
      <div class="settings-row__text">
        <span class="settings-row__title">${e.host??O(`nodes.execApprovals.gateway`)}</span>
        ${t.length>0?S`<span class="settings-row__desc">${t.join(` · `)}</span>`:b}
      </div>
      <div class="settings-row__control">
        ${N({kind:`ok`,label:O(`nodes.inventory.connected`)})}
        ${N({kind:`accent`,label:O(`nodes.inventory.gateway`)})}
      </div>
    </div>
  `}function on(e){let t=Array.isArray(e.roles)?e.roles.filter(Boolean):[],n=[...rn(e),...t];return S`
    <div class="settings-row nodes-entry">
      ${H(V({clientMode:e.mode??void 0,platform:e.platform??void 0}))}
      <div class="settings-row__text">
        <span class="settings-row__title">
          ${e.host??e.mode??O(`nodes.inventory.unknownClient`)}
        </span>
        ${n.length>0?S`<span class="settings-row__desc">${n.join(` · `)}</span>`:b}
      </div>
      <div class="settings-row__control">
        ${N({kind:`ok`,label:O(`nodes.inventory.connected`)})}
        ${N({kind:`muted`,label:O(`nodes.inventory.unpaired`)})}
      </div>
    </div>
  `}function sn(e,t,n){let r=t.revokedAtMs?O(`nodes.inventory.revoked`):O(`nodes.inventory.active`),i=O(`nodes.inventory.scopes`,{scopes:_(t.scopes)}),a=m(t.rotatedAtMs??t.createdAtMs??t.lastUsedAtMs??null);return S`
    <div class="nodes-entry__token">
      <span class="muted">${t.role} · ${r} · ${i} · ${a}</span>
      <span class="nodes-entry__token-actions">
        <button
          class="btn btn--sm"
          @click=${()=>n.onDeviceRotate(e,t.role,t.scopes)}
        >
          ${O(`nodes.inventory.rotate`)}
        </button>
        ${t.revokedAtMs?b:S`
              <button
                class="btn btn--sm danger"
                @click=${()=>n.onDeviceRevoke(e,t.role)}
              >
                ${O(`nodes.inventory.revoke`)}
              </button>
            `}
      </span>
    </div>
  `}var cn,ln=e((()=>{x(),j(),I(),k(),y(),Nt(),Ke(),u(),Wt(),W(),cn=16}));function un(e){let t=dn(e),n=ct(e);return Be(S`
      ${qt(e)} ${lt(n)}
      ${fn(t)}
    `,{wide:!0})}function dn(e){let t=e.configForm,n=mn(e.nodes),{defaultBinding:r,agents:i}=hn(t);return{ready:!!t,disabled:e.configSaving||e.configFormMode===`raw`,configDirty:e.configDirty,configLoading:e.configLoading,configSaving:e.configSaving,defaultBinding:r,agents:i,nodes:n,onBindDefault:e.onBindDefault,onBindAgent:e.onBindAgent,onSave:e.onSaveBindings,onLoadConfig:e.onLoadConfig,formMode:e.configFormMode}}function fn(e){let t=e.nodes.length>0,n=e.defaultBinding??``,r=S`
    <button class="btn" ?disabled=${e.disabled||!e.configDirty} @click=${e.onSave}>
      ${e.configSaving?O(`common.saving`):O(`common.save`)}
    </button>
  `,i=S`
    ${e.formMode===`raw`?M({title:O(`nodes.binding.formModeHint`)}):b}
    ${e.ready?S`
          ${M({title:O(`nodes.binding.defaultBinding`),description:t?O(`nodes.binding.defaultBindingHint`):S`${O(`nodes.binding.defaultBindingHint`)} ${O(`nodes.binding.noNodes`)}`,control:S`
              <select
                class="settings-select"
                aria-label=${O(`nodes.binding.node`)}
                ?disabled=${e.disabled||!t}
                @change=${t=>{let n=t.target.value.trim();e.onBindDefault(n||null)}}
              >
                <option value="" ?selected=${n===``}>
                  ${O(`nodes.binding.anyNode`)}
                </option>
                ${e.nodes.map(e=>S`<option value=${e.id} ?selected=${n===e.id}>
                      ${e.label}
                    </option>`)}
              </select>
            `})}
          ${e.agents.length===0?M({title:O(`nodes.binding.noAgents`)}):e.agents.map(t=>pn(t,e))}
        `:M({title:O(`nodes.binding.loadConfigHint`),control:S`
            <button class="btn" ?disabled=${e.configLoading} @click=${e.onLoadConfig}>
              ${e.configLoading?O(`common.loading`):O(`common.loadConfig`)}
            </button>
          `})}
  `;return L({title:O(`nodes.binding.execNodeBinding`),description:O(`nodes.binding.execNodeBindingSubtitle`),actions:r},i)}function pn(e,t){let n=e.binding??`__default__`,r=e.name?.trim()?`${e.name} (${e.id})`:e.id,i=t.nodes.length>0;return M({title:r,description:S`
      ${e.isDefault?O(`nodes.binding.defaultAgent`):O(`nodes.binding.agent`)} ·
      ${n===`__default__`?O(`nodes.binding.usesDefault`,{node:t.defaultBinding??O(`nodes.binding.any`)}):O(`nodes.binding.override`,{node:e.binding??``})}
    `,control:S`
      <select
        class="settings-select"
        aria-label=${O(`nodes.binding.binding`)}
        ?disabled=${t.disabled||!i}
        @change=${n=>{let r=n.target.value.trim();t.onBindAgent(e.id,r===`__default__`?null:r)}}
      >
        <option value="__default__" ?selected=${n===`__default__`}>
          ${O(`nodes.binding.useDefault`)}
        </option>
        ${t.nodes.map(e=>S`<option value=${e.id} ?selected=${n===e.id}>
              ${e.label}
            </option>`)}
      </select>
    `})}function mn(e){return B(e,[`system.run`])}function hn(e){let t={id:`main`,name:void 0,isDefault:!0,binding:null};if(!e||typeof e!=`object`)return{defaultBinding:null,agents:[t]};let n=(e.tools??{}).exec??{},r=typeof n.node==`string`&&n.node.trim()?n.node.trim():null,i=z(e).map(e=>{let t=(e.record.tools??{}).exec??{},n=typeof t.node==`string`&&t.node.trim()?t.node.trim():null;return{id:e.id,name:e.name,isDefault:e.isDefault,binding:n}});return i.length===0?{defaultBinding:r,agents:[t]}:{defaultBinding:r,agents:i}}var gn=e((()=>{x(),I(),k(),qe(),vt(),ln(),W()}));function Q(e){let t=e&&typeof e==`object`?e.presence:null;return Array.isArray(t)?t:null}function _n(e){let t=new Map;for(let n of e){let e=(n.deviceId??n.instanceId)?.trim().toLowerCase();!e||n.mode?.trim().toLowerCase()===`gateway`||t.set(e,n.reason?.trim().toLowerCase()===`disconnect`?`offline`:`connected`)}return JSON.stringify([...t].toSorted(([e],[t])=>e.localeCompare(t)))}var vn,yn,$;e((()=>{Se(),ve(),x(),ge(),De(),Oe(),ke(),Ge(),I(),Le(),k(),ce(),le(),d(),Ve(),f(),Pe(),ne(),gn(),t(),vn=`https://docs.openclaw.ai/nodes`,yn=3e4,$=class extends ie{constructor(...e){super(...e),this.presence=[],this.nodeState=re(),this.canPairDevice=!1,this.execApprovalsTarget=`gateway`,this.execApprovalsTargetNodeId=null,this.inventoryRemovalConfirmation=null,this.routeDataInitialized=!1,this.gateway=new He(this,{getGateway:()=>this.context?.gateway,onIdentityChange:e=>this.resetServerState(e.snapshot),invalidateRequests:e=>{this.nodeState.requestGeneration=this.gateway.epoch,!e.identityChanged&&e.snapshot.phase!==`connected`&&this.resetServerState(e.snapshot),this.presenceTask.run([null,null])},onSnapshot:e=>this.handleGatewaySnapshot(e),ensureInitialData:()=>this.ensureInitialData()}),this.presenceTask=new xe(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null],task:([e,t],{signal:n})=>e&&t?t.request(`system-presence`,{},{signal:n}):be,onComplete:e=>{Array.isArray(e)&&(this.presence=e)},onError:e=>{s(e)&&(this.presence=[])}}),this.polling=new Fe(this,yn,()=>{this.runNodeTask(e=>v(e,{quiet:!0})),this.runNodeTask(e=>l(e,{quiet:!0}))},!1),this.subscriptions=new c(this).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{if(this.gateway.gateway!==e||this.context.gateway!==e)return;let n=t.event===`presence`?Q(t.payload):null;if(n){let e=_n(n)!==_n(this.presence);this.presenceTask.run([null,null]),this.presence=n,e&&(this.runNodeTask(e=>l(e,{quiet:!0})),this.runNodeTask(e=>v(e,{quiet:!0})))}(t.event===`device.pair.requested`||t.event===`device.pair.resolved`)&&this.runNodeTask(e=>l(e,{quiet:!0})),(t.event===`node.pair.requested`||t.event===`node.pair.resolved`)&&this.runNodeTask(e=>v(e,{quiet:!0}))}))}willUpdate(e){e.has(`routeData`)&&this.applyRouteData()}updated(e){e.has(`routeData`)&&this.ensureInitialData()}disconnectedCallback(){this.cancelInventoryRemovalConfirmation(),this.subscriptions.clear(),this.presenceTask.run([null,null]),this.presence=[],this.canPairDevice=!1,super.disconnectedCallback()}get requestGeneration(){return this.nodeState.requestGeneration}handleGatewaySnapshot(e){let t=e.snapshot;if(this.nodeState.client=t.client,this.nodeState.connected=t.phase===`connected`,this.nodeState.requestGeneration=this.gateway.epoch,this.syncGatewayState(t),this.routeDataInitialized&&t.phase===`connected`&&t.client&&(e.identityChanged||e.connectionChanged)){let e=Q(t.hello?.snapshot);this.presence=e??[],this.loadPresence()}this.syncPolling()}syncGatewayState(e){this.canPairDevice=e.phase===`connected`&&Ee(e.hello?.auth??null)}applyRouteData(){let e=this.routeData;if(!e)return;this.routeDataInitialized=!0;let t=this.context.gateway.snapshot;if(!this.gateway.isRouteDataCurrent(e)){this.resetServerState(t),this.presence=Q(t.hello?.snapshot)??[],this.loadPresence(),this.ensureInitialData();return}this.nodeState={...e.nodes,client:t.client,connected:t.phase===`connected`,requestGeneration:this.gateway.epoch};let n=Q(t.hello?.snapshot);n&&(this.presence=n),this.loadPresence()}resetServerState(e){this.cancelInventoryRemovalConfirmation(),this.nodeState.requestGeneration+=1;let t=re({client:e.client,connected:e.phase===`connected`});t.requestGeneration=this.gateway.epoch,this.nodeState=t,this.presenceTask.run([null,null]),this.presence=[]}async runNodeTask(e){let t=this.nodeState;try{let n=e(t);return this.nodeState===t&&this.requestUpdate(),await n}finally{this.nodeState===t&&this.requestUpdate()}}ensureInitialData(){let e=this.nodeState;if(!e.connected||!e.client||!this.routeDataInitialized)return;!e.nodes.length&&!e.nodesLoading&&this.runNodeTask(e=>v(e)),!e.devicesList&&!e.devicesLoading&&this.runNodeTask(e=>l(e));let t=this.context.runtimeConfig.state;!t.configSnapshot&&!t.configLoading&&this.context.runtimeConfig.refresh(),!e.execApprovalsSnapshot&&!e.execApprovalsLoading&&this.runNodeTask(e=>p(e,this.resolveExecApprovalsTarget()))}syncPolling(){if(this.gateway.connected&&this.gateway.client){this.polling.start();return}this.polling.stop()}loadPresence(){let e=this.gateway.gateway,t=this.gateway.client;return!e||!this.gateway.connected||!t?Promise.resolve():this.presenceTask.run([e,t])}cancelInventoryRemovalConfirmation(){this.inventoryRemovalConfirmation?.abort(),this.inventoryRemovalConfirmation=null}async confirmInventoryRemoval(e){if(this.inventoryRemovalConfirmation)return;let t=new AbortController;this.inventoryRemovalConfirmation=t;let n=this.requestGeneration,r=this.gateway.client,i=await We({title:e.kind===`entry`?O(`nodes.inventory.removePromptTitle`,{name:e.entry.name}):O(e.entries.length===1?`nodes.inventory.removeStalePromptTitleOne`:`nodes.inventory.removeStalePromptTitle`,{count:String(e.entries.length)}),message:O(e.kind===`entry`?`nodes.inventory.removePromptBody`:`nodes.inventory.removeStalePromptBody`),details:e.kind===`entry`?O(`nodes.inventory.deviceId`,{id:e.entry.id}):void 0,confirmLabel:O(`nodes.inventory.remove`),danger:!0,signal:t.signal});if(this.inventoryRemovalConfirmation===t&&(this.inventoryRemovalConfirmation=null),!(!i||t.signal.aborted||n!==this.requestGeneration||r!==this.gateway.client||!this.gateway.connected)){if(e.kind===`entry`){this.runNodeTask(t=>o(t,e.entry));return}this.runNodeTask(t=>se(t,e.entries))}}resolveExecApprovalsTarget(){return this.execApprovalsTarget===`node`&&this.execApprovalsTargetNodeId?{kind:`node`,nodeId:this.execApprovalsTargetNodeId}:{kind:`gateway`}}render(){let e=this.nodeState,t=this.context.runtimeConfig.state,n=this.context.gateway.snapshot,r=n.phase===`connected`&&n.hello?.server?.version?.trim()||null;return S`
      <section class="content-header">
        <div>
          <div class="page-title">${we(`nodes`)}</div>
          <div class="page-subtitle">
            ${Ce(`nodes`)} ${Re(vn,O(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${Ie(un({loading:e.nodesLoading,nodes:e.nodes,presence:this.presence,gatewayVersion:r,lastError:e.lastError,devicesLoading:e.devicesLoading,devicesError:e.devicesError,devicesList:e.devicesList,canPairDevice:this.canPairDevice,configForm:pe(t),configLoading:t.configLoading,configSaving:t.configSaving,configDirty:t.configFormDirty,configFormMode:t.configFormMode,execApprovalsLoading:e.execApprovalsLoading,execApprovalsSaving:e.execApprovalsSaving,execApprovalsDirty:e.execApprovalsDirty,execApprovalsSnapshot:e.execApprovalsSnapshot,execApprovalsForm:e.execApprovalsForm,execApprovalsSelectedAgent:e.execApprovalsSelectedAgent,execApprovalsTarget:this.execApprovalsTarget,execApprovalsTargetNodeId:this.execApprovalsTargetNodeId,onDevicePairSetupOpen:()=>void this.context.overlays.openDevicePairSetup(),onDeviceApprove:e=>void this.runNodeTask(t=>te(t,e)),onDeviceReject:e=>void this.runNodeTask(t=>ae(t,e)),onNodeApprove:e=>void this.runNodeTask(t=>he(t,e)),onNodeReject:e=>void this.runNodeTask(t=>oe(t,e)),onInventoryRemove:e=>void this.confirmInventoryRemoval({kind:`entry`,entry:e}),onInventoryCleanup:e=>{e.length>0&&this.confirmInventoryRemoval({kind:`stale`,entries:e})},onDeviceRotate:(e,t,n)=>void this.runNodeTask(r=>ue(r,{deviceId:e,gatewayUrl:this.context.gateway.connection.gatewayUrl,role:t,scopes:n})),onDeviceRevoke:(e,t)=>void this.runNodeTask(n=>me(n,{deviceId:e,gatewayUrl:this.context.gateway.connection.gatewayUrl,role:t})),onLoadConfig:()=>void this.context.runtimeConfig.refresh({discardPendingChanges:!0}),onLoadExecApprovals:()=>void this.runNodeTask(e=>p(e,this.resolveExecApprovalsTarget())),onBindDefault:e=>{e?this.context.runtimeConfig.patchForm([`tools`,`exec`,`node`],e):this.context.runtimeConfig.removeFormValue([`tools`,`exec`,`node`])},onBindAgent:(e,t)=>{let n=this.context.runtimeConfig.agentEntry(e,{ensure:!!t});if(!n)return;let r=[...n.path,`tools`,`exec`,`node`];t?this.context.runtimeConfig.patchForm(r,t):this.context.runtimeConfig.removeFormValue(r)},onSaveBindings:()=>void this.context.runtimeConfig.save(),onExecApprovalsTargetChange:(t,n)=>{this.execApprovalsTarget=t,this.execApprovalsTargetNodeId=n,e.execApprovalsSnapshot=null,e.execApprovalsForm=null,e.execApprovalsDirty=!1,e.execApprovalsSelectedAgent=null,this.requestUpdate()},onExecApprovalsSelectAgent:t=>{e.execApprovalsSelectedAgent=t,this.requestUpdate()},onExecApprovalsPatch:(e,t)=>void this.runNodeTask(n=>de(n,e,t)),onExecApprovalsRemove:e=>void this.runNodeTask(t=>ee(t,e)),onSaveExecApprovals:()=>void this.runNodeTask(e=>fe(e,this.resolveExecApprovalsTarget()))}))}
    `}},i([ye({context:Te,subscribe:!0})],$.prototype,`context`,void 0),i([_e({attribute:!1})],$.prototype,`routeData`,void 0),i([C()],$.prototype,`presence`,void 0),i([C()],$.prototype,`nodeState`,void 0),i([C()],$.prototype,`canPairDevice`,void 0),i([C()],$.prototype,`execApprovalsTarget`,void 0),i([C()],$.prototype,`execApprovalsTargetNodeId`,void 0),customElements.get(`openclaw-nodes-page`)||customElements.define(`openclaw-nodes-page`,$)}))();
//# sourceMappingURL=nodes-page-DSOrY7ub.js.map