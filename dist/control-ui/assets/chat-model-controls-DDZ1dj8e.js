import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Dc as t,Ds as n,Is as r,La as i,Ls as a,Oc as o,Qn as s,Ra as c,Wn as l,_c as u,bc as d,cs as f,eo as p,fs as m,gc as h,hc as g,io as ee,mc as _,no as v,pc as y,ro as b,rr as x,vc as S,wc as te,xc as C,yc as ne,ys as re}from"./control-ui-core-UWR2ANgr.js";import{K as w,W as T,Y as E,a as D,o as ie}from"./lit-runtime-D5xZwgO1.js";import{Et as ae,U as O,W as oe,wt as k,x as A}from"./control-ui-foundation-DkfOBVsU.js";import{o as j,t as M}from"./control-ui-core-BCL4Sy8S.js";import{G as N,gt as se,ot as ce,vt as P,yt as F}from"./control-ui-core-DS6N4FyQ.js";import{i as le,o as ue,r as I,t as de}from"./provider-icon-IecQPB9B.js";import{n as fe,o as L}from"./message-extract-DtHSSyj7.js";import{G as R,H as z,J as pe,K as me,V as he,W as B,X as ge,Y as V,d as _e,l as H,q as U,s as ve}from"./chat-queue-B7swP41e.js";import{f as W,i as ye,p as be,r as xe,s as Se}from"./thinking-CLaqsANy.js";var Ce=e((()=>{}));function we(e){G&&=(globalThis.clearTimeout(G.timer),e&&ge(G.item.attachments??[]),null)}function Te(e,t){we(!0),G={item:t,sessionKey:e,timer:globalThis.setTimeout(()=>we(!0),Fe)}}function Ee(e,t,n,r,i={}){let a=n.attachments?.map(e=>{let t=R(e);return t?{...e,dataUrl:t,previewUrl:t}:e}),o=i.messageId?.trim(),s={...o?{idempotencyKey:`${o}:user`}:{},...i.messageSeq===void 0?{}:{seq:i.messageSeq}},c=!!o||i.messageSeq!==void 0,l={role:`user`,content:he(n.text,a,{renderInlineImageDataUrls:!0}),timestamp:n.createdAt,...c?{__openclaw:s}:{}};e.prepare({message:l,owner:r,sessionKey:t})}function De(e){let t=O(e);if(!t)return null;let n=fe(e)?.trim();if(n)return`${t.role}:text:${n}`;try{let n=e.content;return`${t.role}:content:${JSON.stringify(n??null)}`}catch{return null}}function Oe(e,t){let n=oe(t);if(n!==null&&oe(e)===n)return!0;let r=De(t);return!!(r&&De(e)===r)}function ke(e){return e.content.some(e=>{if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;if(t.type!==`image`)return!1;if(typeof t.url==`string`&&t.url.startsWith(`data:image/`))return!0;let n=t.source;return typeof n==`object`&&!!n&&!Array.isArray(n)&&typeof n.url==`string`&&n.url.startsWith(`data:image/`)})}function Ae(e,t){if(!ke(t))return!1;let n=e.chatMessages.findIndex(e=>Oe(e,t));if(n<0||e.chatMessages[n]===t)return!1;let r=e.chatMessages[n],{content:i,__openclaw:a,...o}=r&&typeof r==`object`&&!Array.isArray(r)?r:{},{media:s,...c}=a&&typeof a==`object`&&!Array.isArray(a)?a:{},l=[...e.chatMessages];return l[n]={...t,...o,content:t.content,__openclaw:{...c,...t.__openclaw}},e.chatMessages=l,!0}function je(e){if(!G||!f(G.sessionKey,e))return null;let t=G.item;return we(!1),t}function Me(e,t){let n=je(t);return n?(_e(e,t,n.agentId).some(e=>e.id===n.id)||H(e,t,n,n.agentId,{retryable:!0}),!0):!1}function Ne(e,t,n){let r=e.read(n,t.client??null);return!r||t.chatMessages.find(e=>Oe(e,r))?!1:(t.chatMessages=[r,...t.chatMessages],!0)}function Pe(e,t,n,r,i){let a=e.read(n,t.client??null);if(!a)return!1;if(r.some(e=>Oe(e,a))){let r=Ae(t,a);return i||e.clear(n),r}return Ne(e,t,n)}var Fe,G,Ie=e((()=>{A(),L(),m(),U(),ve(),z(),Fe=6e4,G=null}));function Le(e){return e.catalog||!e.connected||!e.agentsLoaded||!e.selectedAgentFound?!1:!e.agentModel?.trim()}function Re(e){return{kind:`composer-replacement`,text:j(`modelSetup.required.body`),actionLabel:j(`modelSetup.required.action`),onAction:e}}var ze=e((()=>{M()}));function Be(e){return e.sessionsResult?.sessions?.find(t=>t.key===e.sessionKey)}function Ve(e){let t=e.chatModelCatalog??[],n=e.modelOverrides;if(Object.hasOwn(n,e.sessionKey)){let r=n[e.sessionKey];return r==null?``:ne(h(r),t)}let r=Be(e);return C(r?.model,r?.modelProvider,t)}function He(e){return C(e.agentDefaultModel,void 0,e.chatModelCatalog??[])||C(e.sessionsResult?.defaults?.model,e.sessionsResult?.defaults?.modelProvider,e.chatModelCatalog??[])}function K(e){let t=e.trim().toLowerCase(),n=t.indexOf(`/`);return n<=0?t:`${d(t.slice(0,n))}/${t.slice(n+1)}`}function Ue(e,t){let n=new Set(e.filter(e=>e.available!==!1).map(e=>K(_(e,t).value)));return new Set(e.filter(e=>e.available===!1).map(e=>K(_(e,t).value)).filter(e=>!n.has(e)))}function We(e,t,n){let r=e.trim().toLowerCase();if(!r)return e;for(let e of t){if(e.available===!1)continue;let t=_(e,n);if(t.value.trim().toLowerCase()===r)return t.value}let i=K(e);for(let e of t){if(e.available===!1)continue;let t=_(e,n);if(K(t.value)===i)return t.value}return e}function Ge(e,t,n,r){let i=new Set,a=[],o=Ue(e,t),s=(e,t)=>{be(a,i,e,e=>t??e)},c=(e,t)=>{o.has(K(e))||s(e,t)};for(let n of e){if(n.available===!1)continue;let e=_(n,t);s(e.value,e.label)}return n&&c(n,u(n,t)),r&&c(r,u(r,t)),a}function Ke(e){let t=e.chatModelCatalog??[],n=y(t.filter(e=>e.available!==!1)),r=We(Ve(e),t,n),i=We(He(e),t,n),a=u(i,n),o=Ue(t,n);return{currentOverride:r,defaultSelectable:!i||!o.has(K(i)),defaultModel:i,defaultDisplay:a,defaultLabel:i?`Default (${a})`:`Default model`,options:Ge(t,n,r,i)}}function qe(e){if(e===`auto`)return`auto`;if(e===`on`)return!0;if(e===`off`)return!1}function Je(e){let t=e?.effectiveFastMode??e?.fastMode,n=t===`auto`?j(`chat.commandResults.fast.autoValue`,{seconds:String(e?.fastAutoOnSeconds??60)}):j(t===!0?`chat.commandResults.fast.on`:`chat.commandResults.fast.off`),r=e?.effectiveFastModeSource,i=r===`session`?j(`chat.commandResults.fast.sourceSession`):r===`agent`?j(`chat.commandResults.fast.sourceAgent`):r===`config`?j(`chat.commandResults.fast.sourceModel`):r==="default"?j(`chat.commandResults.fast.sourceDefault`):``;return`${j(`chat.commandResults.fast.current`,{value:n})}${i}.`}function Ye(e,t,n){let r=e.trim();if(!r)return null;let i=r.toLowerCase(),a=new Set(t.filter(e=>e.id.trim().toLowerCase()===i).map(e=>d(e.provider)).filter(Boolean)),o=new Set(t.filter(e=>g(e.id,e.provider).trim().toLowerCase()===i).map(e=>d(e.provider)).filter(Boolean));return o.size===1?[...o][0]??null:n&&a.has(n)&&!o.has(n)?n:a.size===1?[...a][0]??null:null}function Xe(e,t){let n=e.trim().toLowerCase();return n?t.some(e=>{let t=e.id.trim().toLowerCase(),r=g(e.id,e.provider).trim().toLowerCase();return t===n||r===n}):!1}function Ze(e){let t=e.sessionsResult?.sessions?.find(t=>t.key===e.sessionKey),n=d(t?.modelProvider??``)||null,r=d(e.sessionsResult?.defaults?.modelProvider??``)||null,i=Xe(e.currentModelOverride,e.catalog),a=!e.currentModelOverride||!i?n??r:null,o=Ye(e.currentModelOverride,e.catalog,n)??a??null,s=t?.fastMode===`auto`?`auto`:t?.fastMode===!0?`on`:t?.fastMode===!1?`off`:``,c=o===`openai`,l=t?.effectiveFastMode??t?.fastMode,u=c?l===!0?`on`:l===`auto`?`auto`:`off`:s,f=!!(o&&Qe.has(o)),p=f||!!s,m=l===!0||l===`auto`,h=l===`auto`?`Auto`:m?`Fast`:c||u===`off`?`Standard`:`Default`,g=f?m?`off`:`on`:``;return{active:m,currentOverride:u,disabled:!p||!e.connected||e.loading||e.sending||!!e.activeRunId||e.stream!==null||!e.gatewayAvailable,label:h,nextValue:g,supported:p}}var Qe,$e=e((()=>{M(),W(),S(),Qe=new Set([`anthropic`,`minimax`,`minimax-portal`,`openai`,`xai`])}));function et(e){let t=/^data:([^;]+);base64,(.+)$/.exec(e);if(!t)return null;let n=t[1],r=t[2];return n&&r?{mimeType:n,content:r}:null}function tt(e){return e?.length?e.map(e=>{let t=R(e),n=t?et(t):null;return n?{type:n.mimeType.startsWith(`image/`)?`image`:`file`,mimeType:n.mimeType,fileName:e.fileName,content:n.content}:null}).filter(e=>e!==null):void 0}function nt(e){return e?.length?e.flatMap(e=>{if(!e||typeof e!=`object`)return[];let t=e,n=typeof t.mimeType==`string`?t.mimeType.trim():``,i=typeof t.content==`string`?t.content:``;return!/^[a-z0-9][a-z0-9!#$&^_.+-]*\/[a-z0-9][a-z0-9!#$&^_.+-]*$/i.test(n)||!/^[A-Za-z0-9+/]+={0,2}$/.test(i)?[]:[{id:r(),dataUrl:`data:${n};base64,${i}`,mimeType:n,fileName:typeof t.fileName==`string`?t.fileName:void 0}]}):[]}var rt=e((()=>{a(),U()}));function q(e){return Array.from(e?.types??[]).includes(`Files`)}function it(e){let t=e.target;if(!(t instanceof Element))return!1;let n=t.closest(`textarea, input, [contenteditable]`);return n instanceof HTMLInputElement?Pt.has(n.type)&&!n.disabled&&!n.readOnly:n instanceof HTMLTextAreaElement?!n.disabled&&!n.readOnly:n instanceof HTMLElement&&n.isContentEditable}function J(e){return e.getAttachments?.()??e.attachments??[]}function at(e,t){e.closest(`details`)?.removeAttribute(`open`),e.closest(`.agent-chat__composer-shell, .new-session-page__composer`)?.querySelector(t)?.click()}function Y(e,t){return pe({attachment:{id:B(),mimeType:e.type||`application/octet-stream`,fileName:e.name||void 0,sizeBytes:e.size},dataUrl:t,file:e})}function ot(e){return jt.has(e)}function st(e){let t=new TextEncoder().encode(e),n=[],r=32768;for(let e=0;e<t.length;e+=r)n.push(String.fromCharCode(...t.subarray(e,e+r)));return`data:${Ot};base64,${btoa(n.join(``))}`}function ct(e){let t=Y(new File([e],`${kt}${Date.now()}.txt`,{type:Ot}),st(e));jt.add(t);let n=ut(e);return n&&Mt.set(t,n),t}function lt(e){let t=/^data:([^,]*),(.*)$/s.exec(e);if(!t)return null;let n=t[1],r=t[2];if(n===void 0||r===void 0)return null;if(n.toLowerCase().includes(`;base64`))try{let e=atob(r),t=Uint8Array.from(e,e=>e.charCodeAt(0));return new TextDecoder().decode(t)}catch{return null}try{return decodeURIComponent(r.replace(/\+/g,`%20`))}catch{return null}}function ut(e){let t=e.replace(/\s+/gu,` `).trim();return t?t.length<=At?t:`${ae(t,At).trimEnd()}...`:null}function dt(e){return Mt.get(e)??e.fileName??j(`chat.attachments.attachedFile`)}function ft(e,t){return e.trim()?`${e.replace(/\s+$/u,``)}\n\n${t}`:t}function pt(e,t){if(!t.onAttachmentsChange)return!1;let n=e.clipboardData?.getData(`text/plain`);if(!n||n.length<=Dt)return!1;e.preventDefault();let r=ct(n);return t.onAttachmentsChange([...J(t),r]),!0}function mt(e,t=`pasted-image`){let n=/^\s*data:(image\/[a-z0-9.+-]+);base64,([a-z0-9+/=\s]+)\s*$/i.exec(e);if(!n)return null;let r=n[1]?.toLowerCase(),i=n[2];if(!r||!i)return null;let a=i.replace(/\s+/g,``);try{let e=atob(a),n=new Uint8Array(e.length);for(let t=0;t<e.length;t++)n[t]=e.charCodeAt(t);let i=r.split(`/`)[1]?.replace(/[^a-z0-9.+-]/gi,``)||`png`;return{file:new File([n],`${t}.${i}`,{type:r}),dataUrl:`data:${r};base64,${a}`}}catch{return null}}function ht(e,t){let n=mt(e,t.replace(/\.[a-z0-9]+$/i,``)||`image`);return n?Y(n.file,n.dataUrl):null}function gt(e,t){return t.readSignal?.aborted?Promise.resolve(null):new Promise(n=>{let r=new FileReader,i=!1,a=e=>{i||(i=!0,t.readSignal?.removeEventListener(`abort`,o),n(e))},o=()=>{r.abort(),a(null)};t.readSignal?.addEventListener(`abort`,o,{once:!0}),r.addEventListener(`error`,()=>a(null),{once:!0}),r.addEventListener(`abort`,()=>a(null),{once:!0}),r.addEventListener(`load`,()=>{let n=typeof r.result==`string`?r.result:null;a(n&&!t.readSignal?.aborted?Y(e,n):null)},{once:!0}),r.readAsDataURL(e)})}async function _t(e,t){if(!(!t.onAttachmentsChange||e.length===0)){t.onPendingReadsChange?.(1);try{let n=(await Promise.all(e.map(e=>gt(e,t)))).filter(e=>e!==null);if(t.readSignal?.aborted){for(let e of n)V(e.id);return}if(n.length===0)return;t.onAttachmentsChange([...J(t),...n])}finally{t.onPendingReadsChange?.(-1)}}}function vt(e,t){let n=e.clipboardData?.items;if(!n||!t.onAttachmentsChange)return;let r=Array.from(n).filter(e=>e.type.startsWith(`image/`)).map(e=>e.getAsFile()).filter(e=>e!==null);if(r.length===0){let n=e.clipboardData?.getData(`text/plain`),r=n?mt(n):null;if(!r){pt(e,t);return}e.preventDefault(),t.onAttachmentsChange([...J(t),Y(r.file,r.dataUrl)]);return}e.preventDefault(),_t(r,t)}function yt(e,t){let n=R(e),r=n?lt(n):null;if(!r||!t.onDraftChange)return;let i=J(t).filter(t=>t.id!==e.id);V(e.id),t.onAttachmentsChange?.(i),t.onDraftChange(ft(t.getDraft?.()??t.draft??``,r)),t.onRequestUpdate?.()}function bt(e,t){let n=e.target,r=[...n.files??[]];n.value=``,_t(r,t)}function xt(e,t){e.preventDefault(),_t([...e.dataTransfer?.files??[]],t)}function St(e){let t=0,n=(n,r)=>{let i=n.currentTarget;if(i instanceof HTMLElement){if(r){if(!e.canCompose||!q(n.dataTransfer))return;t+=1}else t=Math.max(0,t-1);i.toggleAttribute(`data-attachment-drop-active`,t>0)}},r=e=>{t=0;let n=e.currentTarget;n instanceof HTMLElement&&n.removeAttribute(`data-attachment-drop-active`)};return{onDragenter:e=>n(e,!0),onDragleave:e=>n(e,!1),onDragover:t=>{if(!q(t.dataTransfer)){it(t)||(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect=`none`));return}t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect=e.canCompose?`copy`:`none`)},onDrop:t=>{if(!q(t.dataTransfer)){it(t)||t.preventDefault();return}t.preventDefault(),r(t),e.canCompose&&xt(t,e)}}}function Ct(e){return E`
    <input
      type="file"
      accept=${Et}
      multiple
      class="agent-chat__file-input"
      ?disabled=${e.disabled}
      @change=${t=>{e.disabled||bt(t,e)}}
    />
    <input
      type="file"
      accept="image/*"
      multiple
      class="agent-chat__photo-input"
      ?disabled=${e.disabled}
      @change=${t=>{e.disabled||bt(t,e)}}
    />
    <input
      type="file"
      accept="image/*"
      capture="environment"
      class="agent-chat__camera-input"
      ?disabled=${e.disabled}
      @change=${t=>{e.disabled||bt(t,e)}}
    />
  `}function wt(e){return E`
    <wa-dropdown
      class="agent-chat__attach-menu"
      placement="top-start"
      aria-label=${j(`chat.composer.addAttachment`)}
      @wa-select=${e=>{let t=e.currentTarget,n=e.detail.item.value===`camera`?`.agent-chat__camera-input`:e.detail.item.value===`photo`?`.agent-chat__photo-input`:e.detail.item.value===`file`?`.agent-chat__file-input`:null;n&&at(t,n)}}
    >
      <button
        slot="trigger"
        type="button"
        class="agent-chat__input-btn agent-chat__input-btn--attach"
        aria-label=${j(`chat.composer.addAttachment`)}
        ?disabled=${e.disabled}
        title=${j(`chat.composer.addAttachment`)}
        @pointerdown=${e=>{let t=e.currentTarget.closest(`.agent-chat__composer-shell`)?.querySelector(`textarea`);document.activeElement===t&&e.preventDefault()}}
      >
        ${P.plus}
      </button>
      <wa-dropdown-item class="agent-chat__attach-menu-option" value="camera">
        <span slot="icon" aria-hidden="true">${P.camera}</span>
        <span>${j(`chat.composer.takePhoto`)}</span>
      </wa-dropdown-item>
      <wa-dropdown-item class="agent-chat__attach-menu-option" value="photo">
        <span slot="icon" aria-hidden="true">${P.image}</span>
        <span>${j(`chat.composer.attachPhoto`)}</span>
      </wa-dropdown-item>
      <wa-dropdown-item class="agent-chat__attach-menu-option" value="file">
        <span slot="icon" aria-hidden="true">${P.folder}</span>
        <span>${j(`chat.composer.attachFileOption`)}</span>
      </wa-dropdown-item>
    </wa-dropdown>
  `}function Tt(e){let t=e.attachments??[];return t.length===0?w:E`
    <div class="chat-attachments-preview">
      ${t.map(t=>E`
          <div
            class=${[`chat-attachment-thumb`,t.mimeType.startsWith(`image/`)?``:`chat-attachment-thumb--file`,ot(t)?`chat-attachment-thumb--pasted-text`:``].filter(Boolean).join(` `)}
          >
            ${t.mimeType.startsWith(`image/`)&&me(t)?E`<img
                  src=${me(t)}
                  alt=${j(`chat.composer.attachmentPreview`)}
                />`:ot(t)?E`
                    <div class="chat-attachment-file chat-attachment-file--pasted-text">
                      <span class="chat-attachment-file__icon">${P.fileText}</span>
                      <span class="chat-attachment-file__body">
                        <span class="chat-attachment-file__name">${dt(t)}</span>
                        <button
                          class="chat-attachment-text-action"
                          type="button"
                          aria-label=${j(`worktrees.restore`)}
                          ?disabled=${e.disabled}
                          @click=${()=>yt(t,e)}
                        >
                          ${j(`worktrees.restore`)}
                          <span aria-hidden="true">${P.chevronRight}</span>
                        </button>
                      </span>
                    </div>
                  `:E`
                    <openclaw-tooltip
                      .content=${t.fileName??j(`chat.attachments.attachedFile`)}
                    >
                      <div class="chat-attachment-file">
                        <span class="chat-attachment-file__icon">${P.paperclip}</span>
                        <span class="chat-attachment-file__name"
                          >${t.fileName??j(`chat.attachments.attachedFile`)}</span
                        >
                      </div>
                    </openclaw-tooltip>
                  `}
            <openclaw-tooltip .content=${j(`chat.composer.removeAttachment`)}>
              <button
                class="chat-attachment-remove"
                type="button"
                aria-label=${j(`chat.composer.removeAttachment`)}
                ?disabled=${e.disabled}
                @click=${()=>{let n=J(e).filter(e=>e.id!==t.id);V(t.id),e.onAttachmentsChange?.(n)}}
              >
                ${P.x}
              </button>
            </openclaw-tooltip>
          </div>
        `)}
    </div>
  `}var Et,Dt,Ot,kt,At,jt,Mt,Nt,Pt,Ft=e((()=>{k(),T(),F(),se(),ce(),M(),U(),Et=`image/*,audio/*,video/*,application/pdf,text/*,.csv,.json,.md,.txt,.zip,.doc,.docx,.xls,.xlsx,.ppt,.pptx`,Dt=1e3,Ot=`text/plain`,kt=`pasted-text-`,At=20,jt=new WeakSet,Mt=new WeakMap,Nt=class{constructor(e){this.notify=e,this.pendingReads=0,this.controller=new AbortController}get readSignal(){return this.controller.signal}updatePending(e,t){this.controller.signal===e&&(this.pendingReads=Math.max(0,this.pendingReads+t),this.notify())}abortReads(){this.controller.abort(),this.controller=new AbortController,this.pendingReads=0,this.notify()}},Pt=new Set([`email`,`number`,`password`,`search`,`tel`,`text`,`url`])}));function It(e){return o(e.assistantAvatarUrl,{identity:{avatar:e.assistantAvatar??void 0,avatarUrl:e.assistantAvatarUrl??void 0}})}function Lt(e){return It(e)??t(e.assistantAvatar)}function Rt(e){if(!e.sessions)return[];let t=n(e.sessionHost??{}),r=re(e.sessionKey)?.agentId??t;return i(e.sessions,{agentId:r,defaultAgentId:t,filterByAgent:!0}).filter(t=>!f(t.key,e.sessionKey)&&!v(t.key,t.channel).channelSession).toSorted((e,t)=>(t.updatedAt??0)-(e.updatedAt??0)||e.key.localeCompare(t.key)).slice(0,Gt)}function zt(){return E`
    <div class="agent-chat__welcome-clawd" aria-hidden="true">
      <openclaw-mascot mood="idle" .size=${112}></openclaw-mascot>
    </div>
  `}function Bt(e,t){return E`
    <div class="agent-chat__recents">
      <div class="agent-chat__recents-title">${j(`chat.welcome.recentSessions`)}</div>
      ${e.map(e=>{let n=ee(e);return E`
          <button type="button" class="agent-chat__recent" @click=${()=>t?.(e.key)}>
            <span class="agent-chat__recent-name">${b(e.key,e)}</span>
            ${n?E`<span class="agent-chat__recent-sub">${n}</span>`:w}
            <span class="agent-chat__recent-time">
              ${s(e.updatedAt,{fallback:``})}
            </span>
          </button>
        `})}
    </div>
  `}function Vt(e){return E`
    <div class="agent-chat__suggestions">
      ${Wt.map(t=>{let n=j(t);return E`
          <button
            type="button"
            class="agent-chat__suggestion"
            @click=${()=>{e.onDraftChange(n),e.onSend()}}
          >
            ${n}
          </button>
        `})}
    </div>
  `}function Ht(e){let n=e.assistantName||`Assistant`,r=It(e),i=r?null:t(e.assistantAvatar);return E`
    ${r?E`<img class="agent-chat__welcome-avatar" src=${r} alt=${n} />`:i?E`<div class="agent-chat__avatar agent-chat__avatar--text" aria-label=${n}>
            ${i}
          </div>`:zt()}
    <h2>${n}</h2>
    <p class="agent-chat__hint">${e.hint}</p>
  `}function Ut(e){if(e.modelSetupRequired)return E`
      <div class="agent-chat__welcome agent-chat__welcome--setup" role="alert">
        ${zt()}
        <h2>${j(`modelSetup.required.title`)}</h2>
        <p class="agent-chat__hint">${j(`modelSetup.required.body`)}</p>
        <button class="btn primary" type="button" @click=${e.onModelSetup}>
          ${j(`modelSetup.required.action`)}
        </button>
      </div>
    `;let t=Rt(e),n=0,r=e=>{let t=e.currentTarget;return t instanceof HTMLElement?t.querySelector(`.agent-chat__welcome-clawd openclaw-mascot`):null};return E`
    <div
      class="agent-chat__welcome"
      style="--agent-color: var(--accent)"
      @dragenter=${e=>{if(!Array.from(e.dataTransfer?.types??[]).includes(`Files`))return;n+=1;let t=r(e);t&&(t.tease=!0)}}
      @dragleave=${e=>{n=Math.max(0,n-1);let t=r(e);t&&n===0&&(t.tease=!1)}}
      @drop=${e=>{if(!Array.from(e.dataTransfer?.types??[]).includes(`Files`))return;n=0;let t=r(e);t&&(t.tease=!1,t.catchOnce())}}
    >
      ${Ht({assistantName:e.assistantName,assistantAvatar:e.assistantAvatar,assistantAvatarUrl:e.assistantAvatarUrl,hint:e.hint??E`${j(`chat.welcome.hintBeforeShortcut`)} <kbd>/</kbd> ${j(`chat.welcome.hintAfterShortcut`)}`})}
      ${e.composer??w}
      ${t.length>0?Bt(t,e.onOpenSession):Vt(e)}
    </div>
  `}var Wt,Gt,Kt=e((()=>{T(),N(),M(),te(),x(),p(),c(),m(),Wt=[`chat.welcome.suggestions.whatCanYouDo`,`chat.welcome.suggestions.summarizeRecentSessions`,`chat.welcome.suggestions.configureChannel`,`chat.welcome.suggestions.checkSystemHealth`],Gt=5}));function qt(e){e.style.overflowY=e.scrollHeight>e.clientHeight?`auto`:`hidden`}function X(e){e.style.overflowY=`hidden`,e.style.height=`auto`;let t=getComputedStyle(e).maxHeight.trim(),n=/^(\d+(?:\.\d+)?)px$/u.exec(t),r=n?Number(n[1]):150;e.style.height=`${Math.min(e.scrollHeight,r)}px`,qt(e)}function Jt(e){if(typeof ResizeObserver!=`function`||Z.has(e))return;let t=e.getBoundingClientRect().width,n=new ResizeObserver(()=>{let n=e.getBoundingClientRect().width;if(n!==t){t=n;let r=Z.get(e);r&&r.adjustmentFrame===null&&(r.adjustmentFrame=requestAnimationFrame(()=>{r.adjustmentFrame=null,Z.get(e)===r&&X(e)}));return}qt(e)});n.observe(e),Z.set(e,{observer:n,adjustmentFrame:null})}function Yt(e){let t=Z.get(e);Z.delete(e),t&&(t.observer.disconnect(),t.adjustmentFrame!==null&&cancelAnimationFrame(t.adjustmentFrame))}function Xt(e){e.closest(`.chat`)?.style.setProperty(`--chat-question-dock-height`,`${e.offsetHeight}px`)}function Zt(e){if(Xt(e),typeof ResizeObserver!=`function`||Q.has(e))return;let t=new ResizeObserver(()=>Xt(e));t.observe(e),Q.set(e,t)}function Qt(e){Q.get(e)?.disconnect(),Q.delete(e),e.closest(`.chat`)?.style.removeProperty(`--chat-question-dock-height`)}function $t(e){queueMicrotask(()=>{e.isConnected&&X(e)})}function en(e,t){if(!t||e.defaultPrevented)return;let n=e.target,r=e.currentTarget;!(n instanceof Element)||!(r instanceof HTMLElement)||n.closest(rn)||r.querySelector(`.agent-chat__composer-combobox > textarea`)?.focus({preventScroll:!0})}function tn(e,t){let n=t?.closest(`.agent-chat__composer-shell`);document.activeElement===t&&n&&Number.parseFloat(getComputedStyle(n).marginBottom)===0&&e.preventDefault()}function nn(e,t){requestAnimationFrame(()=>{if(document.activeElement!==e)return;X(e);let n=t===`up`?0:e.value.length;e.selectionStart=n,e.selectionEnd=n})}var rn,Z,Q,an=e((()=>{rn=[`a[href]`,`button`,`input`,`select`,`textarea`,`summary`,`wa-dropdown`,`[contenteditable='true']`,`[role='button']`,`[role='listbox']`,`[role='option']`].join(`,`),Z=new WeakMap,Q=new WeakMap}));function $(e,t){e.preventDefault(),e.stopPropagation();let n=e.currentTarget.closest(`.chat-controls__inline-select-menu--combined`);n instanceof HTMLElement&&(n.querySelectorAll(`[data-chat-model-provider]`).forEach(e=>{let n=e.dataset.chatModelProvider===t;e.setAttribute(`aria-pressed`,n?`true`:`false`),e.tabIndex=n?0:-1}),n.querySelectorAll(`[data-chat-model-provider-group]`).forEach(e=>{e.hidden=e.dataset.chatModelProviderGroup!==t}))}function on(e){let t=e.key===`ArrowRight`||e.key===`ArrowDown`?1:e.key===`ArrowLeft`||e.key===`ArrowUp`?-1:0,n=e.currentTarget,r=n.closest(`.chat-controls__provider-list`),i=r?[...r.querySelectorAll(`[data-chat-model-provider]`)]:[],a=i.indexOf(n);a<0||t===0&&e.key!==`Home`&&e.key!==`End`||(e.preventDefault(),e.stopPropagation(),i[e.key===`Home`?0:e.key===`End`?i.length-1:(a+t+i.length)%i.length]?.focus())}var sn=e((()=>{}));function cn(e){let t=d(e);return yn[t]??t}function ln(e){return ue(d(e),{className:`chat-controls__provider-icon`})}function un(e,t,n=``,r=``){let i=(e||n).trim(),a=i.toLowerCase(),o=t.find(e=>{let t=e.id.trim().toLowerCase();return`${d(e.provider)}/${t}`===a});if(o)return cn(o.provider);let s=t.filter(e=>e.id.trim().toLowerCase()===a),c=d(r),l=s.some(e=>d(e.provider)===c);if(c&&(s.length===0||l))return cn(c);if(s.length===1)return cn(s[0]?.provider??``);let u=i.indexOf(`/`);return u>0?cn(i.slice(0,u)):`other`}function dn(e,t){let n=e.trim().toLowerCase(),r=n.indexOf(`/`),i=r>0?`${d(n.slice(0,r))}/${n.slice(r+1)}`:n;if(!i)return;let a=t.filter(e=>`${d(e.provider)}/${e.id.trim().toLowerCase()}`===i);return a.find(e=>e.provider.trim().toLowerCase()===`openai`)??a[0]}function fn(e,t,n){let r=dn(e,n);return r&&d(r.provider)===`openai`&&r.name.trim()||t}function pn(e){let{currentOverride:t,defaultSelectable:n,defaultModel:r,defaultLabel:i,options:a}=Ke({agentDefaultModel:e.agentDefaultModel,chatModelCatalog:e.modelCatalog,modelOverrides:e.modelOverrides??{},sessionKey:e.sessionKey,sessionsResult:e.sessionsResult}),o=Se({catalog:e.modelCatalog,defaults:e.thinkingDefaults,session:e.thinkingSession,sessionKey:e.sessionKey,sessionsResult:e.sessionsResult}),s=Ze({activeRunId:e.activeRunId,catalog:e.modelCatalog,connected:e.connected,currentModelOverride:t,gatewayAvailable:e.gatewayAvailable,loading:e.loading,sending:e.sending,sessionKey:e.sessionKey,sessionsResult:e.sessionsResult,stream:e.stream}),c=e.modelSwitching?{...s,disabled:!0}:s,l=e.sessionsResult?.sessions.find(t=>f(t.key,e.sessionKey))?.modelProvider??``,u=e.sessionsResult?.defaults?.modelProvider??``,d=fn(r,i,e.modelCatalog),p=r&&d!==i?j(`chat.modelControls.defaultWithModel`,{model:d}):i,m=r.trim().toLowerCase(),h=a.map(r=>{let i=n&&r.value.trim().toLowerCase()===m,a=dn(r.value,e.modelCatalog);return{commitValue:i?``:r.value,...a?.contextWindow?{contextWindow:a.contextWindow}:{},...typeof a?.supportsTools==`boolean`?{supportsTools:a.supportsTools}:{},isDefault:i,value:r.value,label:fn(r.value,r.label,e.modelCatalog),provider:un(r.value,e.modelCatalog,``,i?u:r.value===t?l:``)}}),g=e.modelSelectionRuntimeId?.trim().toLowerCase()===`codex`?j(`chat.selectors.nativeCodexModel`):j(`chat.selectors.lockedSessionModel`),ee=e.modelSelectionLocked===!0?g:h.find(e=>e.value===t)?.label??fn(t,t||p,e.modelCatalog),_=o.currentOverride===``?o.defaultLabel:o.options.find(e=>e.value===o.currentOverride)?.label??o.currentOverride,v=e.loading||e.sending||!!e.activeRunId||e.stream!==null,y=!e.connected||v||e.modelSwitching||e.modelsLoading&&a.length===0||!e.gatewayAvailable||!!e.mutationDisabledReason,b=!e.connected||v||e.modelSwitching||!e.gatewayAvailable||o.options.length===0&&o.currentOverride===``||!!e.mutationDisabledReason;return vn({defaultModelLabel:mn(p),disabled:y,disabledReason:e.mutationDisabledReason,fastMode:{...c,disabled:c.disabled||y},modelSelectionLocked:e.modelSelectionLocked===!0,modelOptions:h,onRequestUpdate:e.onRequestUpdate,selectedModelValue:t,selectedThinkingValue:o.currentOverride,sessionKey:e.sessionKey,showFastMode:e.showFastMode!==!1,thinkingDefaultValue:o.defaultValue,thinkingDisabled:b,thinkingOptions:[{value:``,label:o.defaultLabel},...o.options],triggerModelLabel:ee,triggerThinkingLabel:_,onFastModeSelect:async(t,n)=>e.onFastModeSelect?.(t,n),onModelSelect:async(t,n)=>e.onModelSelect?.(t,n),onThinkingSelect:async(t,n)=>e.onThinkingSelect?.(t,n)})}function mn(e){return/^Default \((.+)\)$/u.exec(e)?.[1]??e}function hn(e){let t=e.label,n=[de(e.provider),le(e.provider)].toSorted((e,t)=>t.length-e.length);for(let e of n)if(t.toLowerCase().startsWith(`${e.toLowerCase()} `))return t.slice(e.length+1);return t}function gn(e){return e.replace(/^Inherited:\s*/u,``)}function _n(e){return E`
    <div class="chat-controls__model-provenance">
      <span class="chat-controls__inline-select-section-label">
        ${j(`chat.selectors.modelSection`)}
      </span>
      <span class="chat-controls__model-provenance-state">
        ${e.hasModelOverride?E`
              <openclaw-tooltip
                .content=${j(`chat.modelControls.resetToDefault`,{model:e.defaultModelLabel})}
              >
                <button
                  class="chat-controls__model-reset"
                  data-chat-model-reset="true"
                  type="button"
                  aria-label=${j(`chat.modelControls.resetToDefault`,{model:e.defaultModelLabel})}
                  ?disabled=${e.disabled}
                  @click=${t=>{if(t.stopPropagation(),e.disabled){t.preventDefault();return}e.onReset()}}
                >
                  ${j(`chat.modelControls.useDefault`)}
                </button>
              </openclaw-tooltip>
            `:E`
              <span
                class="chat-controls__model-provenance-value chat-controls__model-provenance-value--inherit"
              >
                ${j(`chat.modelControls.usingDefault`)}
              </span>
            `}
      </span>
    </div>
  `}function vn(e){let{defaultModelLabel:t,disabled:n,disabledReason:r,fastMode:i,modelSelectionLocked:a,modelOptions:o,selectedModelValue:s,selectedThinkingValue:c,sessionKey:u,showFastMode:d,thinkingDefaultValue:f,thinkingDisabled:p,thinkingOptions:m,triggerModelLabel:h,triggerThinkingLabel:g,onFastModeSelect:ee,onModelSelect:_,onRequestUpdate:v,onThinkingSelect:y}=e,b=mn(h),x=gn(g),S=o.find(e=>e.isDefault),te=s===``?S:o.find(e=>e.value===s),C=te??o[0],ne=te?.supportsTools===!1,re=[b,x,ne?j(`chat.modelControls.chatOnly`):``].filter(Boolean).join(` · `),T=`${b} · ${x}`,D=m.filter(e=>e.value!==``),ae=D.findIndex(e=>e.value===f),O=c!==``,oe=D.findIndex(e=>e.value===c),k=Math.max(O?oe:ae,0),A=!O&&ae<0,M=e=>D.length>1?e/(D.length-1)*100:0,N=xe(f),se=m.find(e=>e.value===c),ce=O?gn(se?.label??xe(c)):N,F=O?ce:j(`chat.modelControls.defaultWithLevel`,{level:N}),ue=e=>{a||(_(e,u).finally(()=>v?.()),v?.())},I=e=>{y(e,u).finally(()=>v?.()),v?.()},de=e=>{ee(e,u).finally(()=>v?.()),v?.()},fe=i.supported?j(`chat.modelControls.fastHelp`):j(`chat.modelControls.speedUnsupported`),L=(e,t=!1)=>{t&&(e.value=String(k)),e.style.setProperty(`--reasoning-fill`,`${M(k)}%`),e.setAttribute(`aria-valuetext`,F);let n=e.closest(`.chat-controls__reasoning-panel`);n?.querySelectorAll(`[data-chat-thinking-preview-index]`).forEach(e=>{e.hidden=!0});let r=n?.querySelector(`[data-chat-thinking-preview-committed]`);r&&(r.hidden=!1)},R=e=>{let t=e.currentTarget,n=D[Number(t.value)];if(!n)return;t.style.setProperty(`--reasoning-fill`,`${M(Number(t.value))}%`),t.setAttribute(`aria-valuetext`,gn(n.label));let r=t.closest(`.chat-controls__reasoning-panel`);r?.querySelectorAll(`[data-chat-thinking-preview-index]`).forEach(e=>{e.hidden=e.dataset.chatThinkingPreviewIndex!==t.value});let i=r?.querySelector(`[data-chat-thinking-preview-committed]`);i&&(i.hidden=!0)},z=e=>{let t=e.currentTarget,n=D[Number(t.value)];L(t),!p&&(!n||n.value===c||I(n.value))},pe=e=>{let t=e.currentTarget;!A||Number(t.value)!==k||z(e)},me=e=>{!A||![`Home`,`ArrowLeft`,`ArrowDown`,`PageDown`].includes(e.key)||z(e)},he=D.length>0,B=D.length===1?D[0]:void 0,ge=c||f,V=B?.value===ge,_e=he||d,H=new Map;for(let e of o){let t=H.get(e.provider);t?t.push(e):H.set(e.provider,[e])}let U=[...H],ve=U.findIndex(([e])=>e===S?.provider);if(ve>0){let[e]=U.splice(ve,1);e&&U.unshift(e)}let W=C?.provider??U[0]?.[0]??`other`,ye=e=>{let t=e.value===s||e.isDefault&&s===``,r=hn(e),i=[e.contextWindow?j(`chat.modelControls.contextWindow`,{count:l(e.contextWindow)}):``,e.supportsTools===!1?j(`chat.modelControls.chatOnly`):``].filter(Boolean).join(` · `);return E`
      <div class="chat-controls__combined-model">
        <button
          class="chat-controls__inline-select-option chat-controls__combined-model-option ${t?`chat-controls__inline-select-option--selected`:``}"
          data-chat-model-option=${e.value}
          data-chat-model-default=${e.isDefault?`true`:w}
          role="option"
          aria-selected=${t?`true`:`false`}
          type="button"
          ?disabled=${n||a}
          @click=${t=>{if(t.stopPropagation(),n||a||e.commitValue===s){t.preventDefault();return}ue(e.commitValue)}}
        >
          <span class="chat-controls__model-option-copy">
            <span class="chat-controls__model-option-title">
              <span class="chat-controls__model-option-name">${r}</span>
              ${t?E`<span
                    class="chat-controls__model-state-label chat-controls__model-state-label--current"
                    >${j(`chat.modelControls.current`)}</span
                  >`:e.isDefault?E`<span
                      class="chat-controls__model-state-label chat-controls__model-state-label--default"
                      >${j(`chat.modelControls.default`)}</span
                    >`:``}
            </span>
            ${i?E`<span class="chat-controls__model-option-meta">${i}</span>`:``}
          </span>
          ${t?E`
                <span class="chat-controls__inline-select-check" aria-hidden="true">
                  ${P.check}
                </span>
              `:``}
        </button>
      </div>
    `};return E`
    <details class="chat-controls__session chat-controls__inline-select chat-controls__model">
      <summary
        class="chat-controls__inline-select-trigger ${n?`chat-controls__inline-select-trigger--disabled`:``}"
        data-chat-model-select="true"
        data-chat-model-locked=${a?`true`:`false`}
        data-chat-thinking-select="true"
        data-chat-select-value=${s}
        data-chat-thinking-value=${c}
        data-chat-thinking-disabled=${p?`true`:`false`}
        data-chat-model-tools=${ne?`unavailable`:`available`}
        aria-label="${j(`chat.selectors.model`)}, ${j(`chat.selectors.thinkingLevel`)}: ${re}"
        aria-disabled=${n?`true`:`false`}
        title=${r??re}
        @click=${e=>{n&&e.preventDefault()}}
      >
        ${ne?E`
              <openclaw-tooltip .content=${j(`chat.modelControls.chatOnlyHelp`)}>
                <span class="chat-controls__model-capability-badge" aria-hidden="true">
                  ${P.alertTriangle}
                  <span>${j(`chat.modelControls.chatOnly`)}</span>
                </span>
              </openclaw-tooltip>
            `:w}
        <span class="chat-controls__inline-select-label">${T}</span>
        <span class="chat-controls__inline-select-icon" aria-hidden="true">
          ${P.chevronDown}
        </span>
      </summary>
      <div
        class="chat-controls__inline-select-menu chat-controls__inline-select-menu--combined"
        aria-label=${j(`chat.selectors.model`)}
      >
        ${a?E`
              <div
                class="chat-controls__locked-model"
                aria-label=${j(`chat.selectors.modelLockedLabel`)}
              >
                <span class="chat-controls__inline-select-section-label">
                  ${j(`chat.selectors.modelSection`)}
                </span>
                <span class="chat-controls__locked-model-value">${b}</span>
                <span class="chat-controls__locked-model-badge">
                  ${j(`chat.selectors.modelLocked`)}
                </span>
              </div>
            `:E`
              ${_n({defaultModelLabel:t,disabled:n,hasModelOverride:s!==``,onReset:()=>ue(``)})}
              <div
                class="chat-controls__model-browser"
                @mouseleave=${e=>{e.currentTarget.contains(document.activeElement)||$(e,W)}}
                @focusout=${e=>{let t=e.currentTarget;e.relatedTarget instanceof Node&&t.contains(e.relatedTarget)||$(e,W)}}
              >
                <div class="chat-controls__provider-list" aria-label=${j(`sessionsView.provider`)}>
                  <div class="chat-controls__inline-select-section-label">
                    ${j(`sessionsView.provider`)}
                  </div>
                  ${ie(U,([e])=>e,([e])=>{let t=e===W;return E`
                        <button
                          class="chat-controls__provider-option"
                          data-chat-model-provider=${e}
                          type="button"
                          aria-pressed=${t?`true`:`false`}
                          tabindex=${t?`0`:`-1`}
                          @click=${t=>$(t,e)}
                          @mouseenter=${t=>{t.currentTarget.closest(`.chat-controls__model-browser`)?.contains(document.activeElement)||$(t,e)}}
                          @focus=${t=>$(t,e)}
                          @keydown=${on}
                        >
                          ${ln(e)}
                          <span>${le(e)}</span>
                        </button>
                      `})}
                </div>
                <div
                  class="chat-controls__provider-models"
                  role="listbox"
                  aria-label=${j(`chat.selectors.model`)}
                >
                  ${ie(U,([e])=>e,([e,t])=>E`
                      <div
                        class="chat-controls__provider-model-group"
                        data-chat-model-provider-group=${e}
                        aria-label=${j(`chat.modelControls.providerModels`,{provider:le(e)})}
                        ?hidden=${e!==W}
                      >
                        ${ie(t,e=>e.value,e=>ye(e))}
                      </div>
                    `)}
                </div>
              </div>
            `}
        ${_e?E`
              <div class="chat-controls__reasoning-panel">
                ${he?E`
                      <div class="chat-controls__reasoning-head">
                        <span class="chat-controls__inline-select-section-label"
                          >${j(`chat.modelControls.reasoning`)}</span
                        >
                        <span class="chat-controls__reasoning-state">
                          <span
                            class="chat-controls__reasoning-value ${O?``:`chat-controls__reasoning-value--inherit`}"
                          >
                            ${D.length>1?E`
                                  <span data-chat-thinking-preview-committed>
                                    ${ce}
                                  </span>
                                  ${D.map((e,t)=>E`
                                      <span data-chat-thinking-preview-index=${t} hidden>
                                        ${gn(e.label)}
                                      </span>
                                    `)}
                                `:ce}
                          </span>
                          ${O?E`
                                <openclaw-tooltip
                                  .content=${j(`chat.modelControls.resetReasoning`,{level:N})}
                                >
                                  <button
                                    class="chat-controls__reasoning-reset"
                                    data-chat-thinking-option=""
                                    type="button"
                                    aria-label=${j(`chat.modelControls.useDefaultReasoning`,{level:N})}
                                    ?disabled=${p}
                                    @click=${e=>{if(e.stopPropagation(),p){e.preventDefault();return}I(``)}}
                                  >
                                    ${P.x}
                                  </button>
                                </openclaw-tooltip>
                              `:``}
                        </span>
                      </div>
                      ${D.length>1?E`
                            <div class="chat-controls__reasoning-slider">
                              <div class="chat-controls__reasoning-dots" aria-hidden="true">
                                ${D.map((e,t)=>E`<span
                                      class="chat-controls__reasoning-dot ${t===ae?`chat-controls__reasoning-dot--default`:``}"
                                      data-stop=${e.value}
                                    ></span>`)}
                              </div>
                              <input
                                class="chat-controls__reasoning-range ${O?``:`chat-controls__reasoning-range--inherit`} ${A?`chat-controls__reasoning-range--unanchored`:``}"
                                type="range"
                                min="0"
                                max=${D.length-1}
                                step="1"
                                .value=${String(k)}
                                style=${`--reasoning-fill: ${M(k)}%`}
                                data-chat-thinking-slider="true"
                                data-chat-thinking-values=${D.map(e=>e.value).join(`,`)}
                                aria-label=${j(`chat.selectors.thinkingLevel`)}
                                aria-valuetext=${F}
                                ?disabled=${p}
                                @input=${R}
                                @change=${z}
                                @click=${pe}
                                @keydown=${me}
                                @pointercancel=${e=>L(e.currentTarget,!0)}
                                @blur=${e=>L(e.currentTarget,!0)}
                              />
                            </div>
                          `:B?E`
                              <button
                                class="chat-controls__reasoning-option ${V?`chat-controls__reasoning-option--selected`:``}"
                                data-chat-thinking-option=${B.value}
                                type="button"
                                aria-pressed=${V?`true`:`false`}
                                ?disabled=${p}
                                @click=${e=>{if(e.stopPropagation(),p||V){e.preventDefault();return}I(B.value)}}
                              >
                                <span>${B.label}</span>
                                ${V?E`
                                      <span
                                        class="chat-controls__inline-select-check"
                                        aria-hidden="true"
                                      >
                                        ${P.check}
                                      </span>
                                    `:``}
                              </button>
                            `:``}
                    `:``}
                ${d?E`
                      <div class="chat-controls__speed-row">
                        <span class="chat-controls__inline-select-section-label"
                          >${j(`chat.modelControls.speed`)}</span
                        >
                        <openclaw-tooltip .content=${fe}>
                          <button
                            class="chat-controls__speed-toggle ${i.active?`chat-controls__speed-toggle--active`:``}"
                            data-chat-speed-toggle=${i.nextValue}
                            type="button"
                            role="switch"
                            aria-checked=${i.active?`true`:`false`}
                            aria-label=${j(`chat.modelControls.fastResponsesAria`,{state:i.label})}
                            ?disabled=${i.disabled}
                            @click=${e=>{if(e.stopPropagation(),i.disabled){e.preventDefault();return}de(i.nextValue)}}
                          >
                            <span class="chat-controls__speed-toggle-icon" aria-hidden="true">
                              ${P.zap}
                            </span>
                            <span>${i.label}</span>
                          </button>
                        </openclaw-tooltip>
                      </div>
                    `:w}
              </div>
            `:``}
      </div>
    </details>
  `}var yn,bn=e((()=>{T(),D(),F(),se(),I(),M(),S(),$e(),ye(),x(),m(),sn(),yn={"google-gemini-cli":`google`,"moonshot-ai":`moonshot`,moonshotai:`moonshot`,"opencode-go":`opencode`,"opencode-zen":`opencode`}}));export{rt as A,Ne as B,it as C,Ct as D,Tt as E,Ve as F,Ce as G,Te as H,Re as I,ze as L,$e as M,qe as N,wt as O,Je as P,Le as R,Ft as S,ot as T,Ee as U,Ie as V,Pe as W,ht as _,Yt as a,xt as b,Zt as c,nn as d,$t as f,Nt as g,Lt as h,Qt as i,nt as j,tt as k,Jt as l,Ut as m,pn as n,en as o,Kt as p,X as r,an as s,bn as t,tn as u,at as v,q as w,vt as x,St as y,Me as z};
//# sourceMappingURL=chat-model-controls-DDZ1dj8e.js.map