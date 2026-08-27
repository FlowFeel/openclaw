const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./browser-D0_R_7S-.js","./rolldown-runtime-DaJ6WEGw.js","./control-ui-foundation-OE0aAIzW.js","./control-ui-foundation-Dgui328h.js","./lit-runtime-D5xZwgO1.js","./control-ui-foundation-DkfOBVsU.js","./ghostty-web-IRe0fnQT.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{S as t,b as n,x as r,y as i}from"./control-ui-foundation-OE0aAIzW.js";import{Gc as a,Kc as o}from"./control-ui-core-BUddgKjW.js";import{K as s,Q as c,W as l,Y as u,Z as d,ct as f,it as p,nt as m}from"./lit-runtime-D5xZwgO1.js";import{f as ee,g as te,m as ne,p as re}from"./control-ui-foundation-Dgui328h.js";import{o as h,t as g}from"./control-ui-core-s0pW0mau.js";import{S as _,T as ie,w as ae}from"./control-ui-core-vLOElyFQ.js";import{n as oe,r as se,t as ce}from"./dock-layout-controller-BoyqOhTW.js";import{n as le,t as ue}from"./dock-panel-layout-BeKwwc_p.js";import{n as de,r as fe,t as v}from"./panel-tab-strip-TSZRTlvQ.js";function pe(e){return e.shellName??h(`terminal.tabLabel`,{n:String(e.sequence)})}function me(e){return e.agentId===null||e.cwd===null?null:h(`terminal.tabHint`,{agent:e.agentId,cwd:e.cwd})}function he(e){return e.status===`connecting`?h(`terminal.connecting`):e.status===`exited`?e.exitReason===`detached`?h(`terminal.detached`):e.exitReason===`process_exit`&&typeof e.exitCode==`number`?h(`terminal.exitedCode`,{code:String(e.exitCode)}):h(`terminal.exited`):null}function ge(e){return fe({tabs:e.tabs.map(e=>{let t=pe(e);return{id:e.id,domId:`terminal-tab-${e.id}`,label:t,title:me(e),icon:y,statusLabel:he(e),badge:e.agentOwned?h(`terminal.agentOwnedBadge`):null,className:`is-${e.status}`,closeLabel:`${h(`terminal.closeSession`)}: ${t}`}}),activeId:e.activeId,ariaControls:`terminal-tab-panel`,onSelect:e.onSelect,onClose:e.onClose,onNew:e.onNew,newLabel:h(`terminal.newSession`),newDisabled:e.booting})}var y,_e=e((()=>{l(),g(),v(),y=d`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4l3 3-3 3M8 11h5" /></svg>`}));async function ve(e,t,n,r){let i={sessionId:t,...n};return await(r?e.request(`terminal.upload`,i,{signal:r}):e.request(`terminal.upload`,i))}async function ye(e){if(e.size>b)throw Error(h(`terminal.uploadTooLarge`,{file:e.name}));let t=new Uint8Array(await e.arrayBuffer()),n=[],r=32*1024;for(let e=0;e<t.length;e+=r)n.push(String.fromCharCode(...t.subarray(e,e+r)));return btoa(n.join(``))}function be(e,t){let n=t.split(/[\\/]/u).pop()?.toLowerCase()??``;if(/^(?:pwsh|powershell)(?:\.exe)?$/u.test(n))return`'${e.replaceAll(`'`,`''`)}'`;if(/^cmd(?:\.exe)?$/u.test(n)){if(/[%!]/u.test(e))throw Error(h(`terminal.uploadUnsafeCmdPath`));return`"${e.replaceAll(`"`,`""`)}"`}if(!/^(?:(?:ba|da|a|k|z)?sh|fish)(?:\.exe)?$/u.test(n))throw Error(h(`terminal.uploadUnsupportedShell`,{shell:n||t}));return/^[A-Za-z0-9_@%+=:,./-]+$/u.test(e)?e:`'${e.replaceAll(`'`,`'\\''`)}'`}var b,xe=e((()=>{g(),b=16*1024*1024}));function Se(e){if(typeof e==`object`&&e&&`retryable`in e){let t=e;return t.gatewayCode===`UNAVAILABLE`||t.code===`UNAVAILABLE`||t.retryable===!0}return!0}function Ce(e){return u`<div class="tp-actions">
    <input
      class="tp-file-input"
      type="file"
      multiple
      aria-hidden="true"
      tabindex="-1"
      @change=${e.upload.handleFileSelection}
    />
    <button
      class="tp-icon tp-upload"
      type="button"
      title=${h(`terminal.addFiles`)}
      aria-label=${h(`terminal.addFiles`)}
      ?disabled=${e.upload.hasPendingBatch()||!e.upload.hasActiveTab()}
      @click=${e.upload.chooseFiles}
    >
      ${Te}
    </button>
    ${e.fullscreen?s:u`${e.sessionPicker}<button
            class="tp-icon ${e.dock===`bottom`?`is-active`:``}"
            type="button"
            title=${h(`terminal.dockBottom`)}
            aria-label=${h(`terminal.dockBottom`)}
            @click=${()=>e.onDock(`bottom`)}
          >
            ${S}
          </button>
          <button
            class="tp-icon ${e.dock===`right`?`is-active`:``}"
            type="button"
            title=${h(`terminal.dockRight`)}
            aria-label=${h(`terminal.dockRight`)}
            @click=${()=>e.onDock(`right`)}
          >
            ${C}
          </button>
          <button
            class="tp-icon"
            type="button"
            title=${h(`terminal.hide`)}
            aria-label=${h(`terminal.hide`)}
            @click=${e.onHide}
          >
            ${x}
          </button>`}
  </div>`}function we(e){let t=e.progress;return u`${e.dragActive?u`<div class="tp-drop-overlay">${h(`terminal.dropFiles`)}</div>`:s}
  ${t?u`<div
        class="tp-upload-card ${t.state===`failed`?`tp-upload-card--failed`:``}"
        role=${t.state===`failed`?`alert`:`status`}
        aria-live=${t.state===`failed`?`assertive`:`polite`}
      >
        <div class="tp-upload-card__header">
          <div class="tp-upload-card__copy">
            <div class="tp-upload-card__title">
              ${t.state===`failed`?h(`terminal.uploadFailed`):h(`terminal.uploadProgress`,{current:String(t.current),total:String(t.total)})}
            </div>
            <div class="tp-upload-card__file">${t.fileName}</div>
          </div>
          <div class="tp-upload-card__actions">
            ${t.state===`failed`&&t.retryable?u`<button
                  class="tp-upload-card__action tp-upload-retry"
                  type="button"
                  @click=${e.retry}
                >
                  ${h(`terminal.retryUpload`)}
                </button>`:s}
            <button
              class="tp-upload-card__action tp-upload-cancel"
              type="button"
              @click=${e.cancel}
            >
              ${h(`common.cancel`)}
            </button>
          </div>
        </div>
        <div
          class="tp-upload-progress"
          role="progressbar"
          aria-label=${t.state===`failed`?h(`terminal.uploadFailed`):h(`terminal.uploadProgress`,{current:String(t.current),total:String(t.total)})}
          aria-valuemin="0"
          aria-valuemax=${String(t.total)}
          aria-valuenow=${String(t.completed)}
        >
          <span
            class="tp-upload-progress__fill"
            style=${`width:${t.completed/t.total*100}%`}
          ></span>
          ${t.state===`uploading`?u`<span class="tp-upload-progress__activity"></span>`:s}
        </div>
        ${t.error?u`<div class="tp-upload-card__error">${t.error}</div>`:s}
      </div>`:s}`}var x,S,C,Te,w,T=e((()=>{l(),g(),xe(),x=d`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>`,S=d`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M2 10h12" /></svg>`,C=d`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M10 2.5v11" /></svg>`,Te=d`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5.2 8.1 9.8 3.5a2.5 2.5 0 0 1 3.5 3.5l-6 6a3.5 3.5 0 0 1-5-5l5.8-5.8" /><path d="m4.4 9 5.2-5.2a1.4 1.4 0 0 1 2 2l-5.3 5.3a2.3 2.3 0 0 1-3.2-3.2l4.6-4.6" /></svg>`,w=class{constructor(e){this.host=e,this.dragActive=!1,this.batch=null,this.dragDepth=0,this.chooseFiles=()=>{this.host.fileInput()?.click()},this.handleFileSelection=e=>{let t=e.currentTarget,n=Array.from(t.files??[]);t.value=``,this.uploadFiles(n)},this.handleDragEnter=e=>{!this.hasDraggedFiles(e)||!this.hasActiveTab()||this.hasPendingBatch()||(e.preventDefault(),this.dragDepth+=1,this.dragActive=!0,this.host.requestUpdate())},this.handleDragOver=e=>{!this.hasDraggedFiles(e)||!this.hasActiveTab()||this.hasPendingBatch()||(e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`copy`))},this.handleDragLeave=e=>{this.hasDraggedFiles(e)&&(this.dragDepth=Math.max(0,this.dragDepth-1),this.dragDepth===0&&(this.dragActive=!1,this.host.requestUpdate()))},this.handleDrop=e=>{this.hasDraggedFiles(e)&&(e.preventDefault(),this.dragDepth=0,this.dragActive=!1,this.host.requestUpdate(),!this.hasPendingBatch()&&this.uploadFiles(Array.from(e.dataTransfer?.files??[])))},this.retry=()=>{let e=this.batch;if(!(!e||e.state!==`failed`||!e.retryable)){if(!this.host.isCurrent(e.tab)||!this.host.client()){this.cancelBatch(e);return}e.state=`uploading`,e.error=null,e.retryable=!1,e.abortController=new AbortController,this.host.requestUpdate(),this.runBatch(e)}},this.cancel=()=>{let e=this.batch;e&&this.cancelBatch(e)}}hasActiveTab(){return!!this.host.activeTab()}hasPendingBatch(){return this.batch!==null}get progress(){let e=this.batch;if(!e)return null;let t=e.files.length,n=Math.min(e.nextIndex,t-1);return{completed:e.nextIndex,current:n+1,error:e.error,fileName:e.files[n]?.name??``,retryable:e.retryable,state:e.state,total:t}}hasDraggedFiles(e){return Array.from(e.dataTransfer?.types??[]).includes(`Files`)}uploadFiles(e){let t=this.host.activeTab();if(e.length===0||!t||!this.host.client()||this.hasPendingBatch())return;this.host.setError(null);let n={tab:t,files:e,paths:[],nextIndex:0,state:`uploading`,error:null,retryable:!1,abortController:new AbortController};this.batch=n,this.host.requestUpdate(),this.runBatch(n)}isActive(e){return this.batch===e&&!e.abortController.signal.aborted}ensureCurrent(e){return this.isActive(e)?this.host.isCurrent(e.tab)?!0:(this.cancelBatch(e),!1):!1}failBatch(e,t,n){this.ensureCurrent(e)&&(e.state=`failed`,e.error=t instanceof Error?t.message:String(t),e.retryable=n,this.host.requestUpdate())}async runBatch(e){let t=this.host.client();if(!t||!this.ensureCurrent(e)){this.cancelBatch(e);return}for(;e.nextIndex<e.files.length;){let n=e.files[e.nextIndex];if(!n||!this.ensureCurrent(e))return;this.host.requestUpdate();let r;try{r=await ye(n)}catch(t){this.failBatch(e,t,!1);return}if(!this.ensureCurrent(e))return;let i;try{let a=await ve(t,e.tab.gatewaySessionId,{name:n.name,contentBase64:r},e.abortController.signal);if(!this.ensureCurrent(e))return;i=a.path}catch(t){this.failBatch(e,t,Se(t));return}try{i=be(i,e.tab.shell)}catch(t){this.failBatch(e,t,!1);return}e.paths.push(i),e.nextIndex+=1,this.host.requestUpdate()}this.ensureCurrent(e)&&(e.tab.controller.terminal.paste(e.paths.join(` `)),e.tab.controller.terminal.focus(),this.batch=null,this.host.requestUpdate())}cancelForTab(e){let t=this.batch;t?.tab===e&&this.cancelBatch(t)}cancelBatch(e){this.batch===e&&(e.abortController.abort(),this.batch=null,this.dragActive=!1,this.dragDepth=0,this.host.requestUpdate())}dispose(){this.batch?.abortController.abort(),this.batch=null,this.dragActive=!1,this.dragDepth=0}}}));function Ee(e,t,n,r,i,a){return Ce({fullscreen:e,dock:t,upload:n,sessionPicker:r,onDock:i,onHide:a})}function De(e,t,n,r,i,a,o){return u`<header class="tp-header">
    ${ge({tabs:e,activeId:t,booting:n,onSelect:i,onClose:a,onNew:o})}
    ${r}
  </header>`}function Oe(e,t,n,r){return u`
    ${n?u`<div class="tp-error" role="alert">${n}</div>`:s}
    <wa-tab-panel
      id="terminal-tab-panel"
      class="tp-viewport"
      name=${e??`terminal`}
      active
      aria-labelledby=${e?`terminal-tab-${e}`:s}
      @dragenter=${r.handleDragEnter}
      @dragover=${r.handleDragOver}
      @dragleave=${r.handleDragLeave}
      @drop=${r.handleDrop}
    >
      ${t?u`<div class="tp-connecting" role="status">
            <span class="tp-connecting__spinner" aria-hidden="true"></span>
            <span>${h(`terminal.connecting`)}</span>
          </div>`:s}
      ${we(r)}
    </wa-tab-panel>
  `}var ke=e((()=>{l(),g(),_e(),T()})),E,D=e((()=>{E=class{constructor(e,t,n=()=>1){this.capacity=e,this.overflow=t,this.measure=n,this.values=[],this.size=0,this.closed=!1}push(e){if(this.closed)return!1;let t=this.measure(e);if(this.size+t<=this.capacity)return this.values.push(e),this.size+=t,!0;if(this.overflow.mode===`latch`)return this.closed=!0,!1;if(this.overflow.mode===`fail-closed`)return this.values=[],this.size=0,this.closed=!0,this.overflow.onOverflow(),!1;for(this.values.push(e),this.size+=t;this.size>this.capacity&&this.values.length>1;)this.size-=this.measure(this.values.shift());if(this.size>this.capacity){let t=this.overflow.fit?.(e,this.capacity);this.values=t===void 0?[]:[t],this.size=t===void 0?0:this.measure(t)}return!0}drain(){let e=this.values;return this.values=[],this.size=0,e}}}));function O(e){return e instanceof Error&&/^gateway request timed out after \d+ms: terminal\.open$/u.test(e.message)}function Ae(e){return e instanceof Error&&(e.message===`terminal open timed out`||O(e))}var k,A,j,M,N,P,F,je=e((()=>{D(),k=2e4,A=5e3,j=2,M=5e3,N=35e3,P=class extends Error{constructor(e){super(`terminal open timed out`,{cause:e}),this.name=`TerminalOpenTimeoutError`}},F=class e{static{this.MAX_PENDING_EVENTS=512}constructor(e){this.streams=new Map,this.pending=new Map,this.unsubscribe=null,this.pendingOpenCount=0,this.livenessTimer=null,this.livenessProbeInFlight=!1,this.livenessProbeFailures=0,this.lastLivenessFailureActivityVersion=null,this.lastTerminalActivityAtMs=Date.now(),this.inboundActivityVersion=0,this.client=e}ensureSubscribed(){this.unsubscribe||=this.client.addEventListener(e=>{if(e.event===`terminal.data`){this.noteTerminalActivity();let t=e.payload;if(t?.sessionId&&typeof t.seq==`number`&&typeof t.data==`string`){let e={kind:`data`,seq:t.seq,data:t.data},n=this.streams.get(t.sessionId);n?this.deliverData(t.sessionId,n,e):this.bufferEarly(t.sessionId,e)}return}if(e.event===`terminal.exit`){this.noteTerminalActivity();let t=e.payload;if(t?.sessionId){let e={exitCode:t.exitCode??null,signal:t.signal??null,reason:t.reason,error:t.error},n=this.streams.get(t.sessionId);n?n.recovering?this.bufferEarly(t.sessionId,{kind:`exit`,info:e}):this.deliverExit(t.sessionId,n.sink,e):this.bufferEarly(t.sessionId,{kind:`exit`,info:e})}}})}async open(e,t){let n;try{n=await this.requestWhileHoldingStream(()=>this.client.request(`terminal.open`,e,{timeoutMs:N}))}catch(e){throw Ae(e)?(O(e)&&this.forceReconnect(`terminal open watchdog timeout`),new P(e)):e}return this.adoptSession(n.sessionId,t,{seqMode:`unknown`,expectedSeq:0}),n}async attach(e,t){let n=await this.requestWhileHoldingStream(()=>this.client.request(`terminal.attach`,{sessionId:e})),r=typeof n.seq==`number`&&Number.isSafeInteger(n.seq)?n.seq:null;return this.adoptSession(e,t,r===null?{seqMode:`counter`,expectedSeq:null}:{seqMode:`offset`,expectedSeq:r},n.buffer,r??void 0),n}async list(){return(await this.client.request(`terminal.list`))?.sessions??[]}async requestWhileHoldingStream(e){this.ensureSubscribed(),this.pendingOpenCount+=1;try{let t=await e();return--this.pendingOpenCount,t}catch(e){throw--this.pendingOpenCount,this.maybeUnsubscribe(),e}}adoptSession(e,t,n,r,i){let a={sink:t,...n,recovering:!1};this.streams.set(e,a),this.lastTerminalActivityAtMs=Date.now(),r!==void 0&&(t.onReplay?t.onReplay(r,r.length):t.onData(r)),this.flushPending(e,a,i,r!==void 0),this.scheduleLivenessCheck()}deliverData(e,t,n){if(t.recovering){this.bufferEarly(e,n);return}if(!Number.isSafeInteger(n.seq)){this.recoverGap(e,t,n);return}if(t.seqMode===`counter`){t.expectedSeq=n.seq+1,t.sink.onData(n.data);return}if(n.seq-n.data.length===t.expectedSeq){n.data.length>0&&(t.seqMode=`offset`),t.expectedSeq=n.seq,t.sink.onData(n.data);return}if(t.seqMode===`unknown`&&t.expectedSeq===0&&n.seq===0){t.seqMode=`counter`,t.expectedSeq=1,t.sink.onData(n.data);return}this.recoverGap(e,t,n)}recoverGap(e,t,n){t.recovering||(t.recovering=!0,this.client.request(`terminal.attach`,{sessionId:e}).then(r=>{if(this.streams.get(e)!==t)return;let i=typeof r.seq==`number`&&Number.isSafeInteger(r.seq)?r.seq:null;if(i===null){t.seqMode=`counter`,t.expectedSeq=null,t.recovering=!1,this.deliverData(e,t,n),this.flushPending(e,t,void 0,!0);return}let a=t.expectedSeq;if(t.seqMode=`offset`,t.expectedSeq=i,!t.sink.onReplay){t.recovering=!1,this.pending.delete(e),this.forceReconnect(`terminal replay reset unavailable`);return}let o=i-r.buffer.length,s=typeof a==`number`?Math.max(0,Math.min(r.buffer.length,a-o)):0;t.sink.onReplay(r.buffer,s),t.recovering=!1,this.flushPending(e,t,i,!0)}).catch(()=>{if(this.streams.get(e)!==t)return;let r=this.pending.get(e)?.drain();if(r?.some(e=>e.kind===`exit`)){this.pending.delete(e),t.recovering=!1,t.sink.onData(n.data);for(let n of r)if(n.kind===`data`)t.sink.onData(n.data);else{this.deliverExit(e,t.sink,n.info);break}return}t.recovering=!1,this.pending.delete(e),this.forceReconnect(`terminal replay failed`)}))}flushPending(e,t,n,r=!1){let i=this.pending.get(e);if(!i)return;this.pending.delete(e);let a=i.drain();for(let i of a){if(this.streams.get(e)!==t)break;if(!(r&&i.kind===`exit`&&i.info.reason===`detached`))if(i.kind===`data`){if(n!==void 0&&i.seq<=n)continue;this.deliverData(e,t,i)}else t.recovering?this.bufferEarly(e,i):this.deliverExit(e,t.sink,i.info)}}deliverExit(e,t,n){t.onExit(n),this.streams.delete(e),this.pending.delete(e),this.maybeUnsubscribe()}bufferEarly(t,n){let r=this.pending.get(t)??new E(e.MAX_PENDING_EVENTS,{mode:`drop-oldest`});this.pending.set(t,r),r.push(n)}noteTerminalActivity(){this.resetLivenessProbeFailures(),this.lastTerminalActivityAtMs=Date.now(),this.inboundActivityVersion+=1}forceReconnect(e){this.resetLivenessProbeFailures(),this.client.forceReconnect(e)}resetLivenessProbeFailures(){this.livenessProbeFailures=0,this.lastLivenessFailureActivityVersion=null}scheduleLivenessCheck(e=k){this.livenessTimer||this.livenessProbeInFlight||this.streams.size===0||(this.livenessTimer=setTimeout(()=>{this.livenessTimer=null,this.checkLiveness()},Math.max(0,e)))}checkLiveness(){if(this.streams.size===0)return;let e=k-(Date.now()-this.lastTerminalActivityAtMs);if(e>0){this.scheduleLivenessCheck(e);return}let t=this.client.inboundActivitySeq??this.inboundActivityVersion;if(this.lastLivenessFailureActivityVersion!==null&&t!==this.lastLivenessFailureActivityVersion){this.resetLivenessProbeFailures(),this.lastTerminalActivityAtMs=Date.now(),this.scheduleLivenessCheck();return}let n=k;this.livenessProbeInFlight=!0,this.client.request(`terminal.list`,void 0,{timeoutMs:A}).then(()=>{this.resetLivenessProbeFailures(),this.lastTerminalActivityAtMs=Date.now()}).catch(()=>{if(this.streams.size===0){this.resetLivenessProbeFailures();return}let e=this.client.inboundActivitySeq??this.inboundActivityVersion;if(e!==t){this.resetLivenessProbeFailures(),this.lastTerminalActivityAtMs=Date.now();return}if(this.livenessProbeFailures+=1,this.lastLivenessFailureActivityVersion=e,this.livenessProbeFailures>=j){this.forceReconnect(`terminal liveness timeout`);return}n=M}).finally(()=>{this.livenessProbeInFlight=!1,this.scheduleLivenessCheck(n)})}async input(e,t){await this.client.request(`terminal.input`,{sessionId:e,data:t}).catch(()=>void 0)}async resize(e,t,n){await this.client.request(`terminal.resize`,{sessionId:e,cols:t,rows:n}).catch(()=>void 0)}async close(e){this.streams.delete(e),this.pending.delete(e),await this.client.request(`terminal.close`,{sessionId:e}).catch(()=>void 0),this.pending.delete(e),this.maybeUnsubscribe()}get size(){return this.streams.size}dispose(){this.streams.clear(),this.pending.clear(),this.stopLiveness(),this.dropSubscriptions()}maybeUnsubscribe(){this.streams.size===0&&this.pendingOpenCount===0&&(this.pending.clear(),this.stopLiveness(),this.dropSubscriptions())}stopLiveness(){this.resetLivenessProbeFailures(),this.livenessTimer&&=(clearTimeout(this.livenessTimer),null)}dropSubscriptions(){this.unsubscribe?.(),this.unsubscribe=null}}}));function Me(){try{let e=globalThis.sessionStorage?.getItem(I);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t.filter(e=>typeof e==`string`&&e.length>0):[]}catch{return[]}}function Ne(e){try{globalThis.sessionStorage?.setItem(I,JSON.stringify(e))}catch{}}var I,L=e((()=>{I=`openclaw.terminal.sessions.v1`}));function Pe(e){let t=e.split(/[\\/]/).pop()?.trim();return t&&t.length>0?t:`shell`}function R(e){let t=e.terminal;t.renderer&&t.wasmTerm&&t.renderer.render(t.wasmTerm,!0,t.viewportY,t,0)}function z(e){Ne(e.filter(e=>e.status===`live`&&e.gatewaySessionId).map(e=>e.gatewaySessionId))}var B,V,H=e((()=>{L(),B=`ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Symbols Nerd Font Mono", "MesloLGLDZ Nerd Font Mono", "JetBrainsMono Nerd Font Mono", "Liberation Mono", monospace`,V=new TextEncoder}));function Fe(e,t){let n=new E(U,{mode:`latch`},e=>e.length);return{buffer:n,onData:r=>{let i=W.decode(r),a=t();a?e.input(a,i):n.push(i)},onResize:({columns:n,rows:r})=>{let i=t();i&&e.resize(i,n,r)}}}var U,W,Ie=e((()=>{D(),U=8*1024,W=new TextDecoder})),G,Le=e((()=>{G=class{constructor(e){this.options=e}markReady(e){this.stop(e),e.status===`connecting`&&(e.status=`live`,this.options.onReady(e))}arm(e){e.readyTimer||e.status!==`connecting`||!e.awaitFirstOutput||(e.readyTimer=setTimeout(()=>{e.readyTimer=null,!(!this.options.isCurrent(e)||e.status!==`connecting`||!e.awaitFirstOutput)&&(e.awaitFirstOutput=!1,this.options.onTimeout(e))},this.options.timeoutMs()))}stop(e){e.readyTimer&&=(clearTimeout(e.readyTimer),null),e.awaitFirstOutput=!1}}}));async function Re(e,t){for(let n of t)if(await n(),!e())return}var K,ze=e((()=>{K=class{constructor(){this.tail=Promise.resolve(),this.generation=0}enqueue(e){let t=this.generation,n=()=>t===this.generation,r=()=>n()?e(n):Promise.resolve(),i=this.tail.then(r,r);return this.tail=i.catch(()=>{}),i}enqueueSteps(...e){return this.enqueue(t=>Re(t,e))}reset(){this.generation+=1}}}));function q(e){return X[e]}function J(e){let t=q(e);return e===`light`?{...Y,...t,cursorAccent:`#f7f8fa`,selectionBackground:`rgba(90, 162, 255, 0.30)`,black:`#3a3f4b`,white:`#1b1e26`}:{...Y,...t,cursorAccent:`#0e1015`,selectionBackground:`rgba(90, 162, 255, 0.32)`}}var Y,X,Be=e((()=>{Y={black:`#1b1e26`,red:`#ff6b6b`,green:`#4ec9a8`,yellow:`#e5c07b`,blue:`#5aa2ff`,magenta:`#c586c0`,cyan:`#56b6c2`,white:`#d7dae0`,brightBlack:`#5c6370`,brightRed:`#ff8787`,brightGreen:`#6fd7bd`,brightYellow:`#f0d197`,brightBlue:`#7cb7ff`,brightMagenta:`#d7a3d4`,brightCyan:`#7bd3dd`,brightWhite:`#ffffff`},X={dark:{background:`#0e1015`,cursor:`#ff5c5c`,foreground:`#d7dae0`},light:{background:`#f7f8fa`,cursor:`#1b1e26`,foreground:`#1b1e26`}}})),Ve,He=e((()=>{g(),je(),H(),L(),Ie(),Le(),ze(),Be(),t(),Ve=class{constructor(e){this.host=e,this.tabs=[],this.activeId=null,this.booting=!1,this.connection=null,this.activeClient=null,this.activeAvailable=!1,this.lifecycleGeneration=0,this.lifecycleAbortController=new AbortController,this.lifecycleSyncToken=0,this.tabSequence=0,this.bootQueue=new K,e.addController(this),this.readiness=new G({timeoutMs:()=>this.host.catalogReadyTimeoutMs,isCurrent:e=>this.tabs.includes(e),onReady:()=>{this.updateControllerState(`tabs`,[...this.tabs]),z(this.tabs)},onTimeout:e=>{this.host.terminalPanelErrorText=h(`terminal.connectionTimedOut`),this.connection?.close(e.gatewaySessionId),this.dropFailedTab(e),z(this.tabs)}})}hostConnected(){}updateControllerState(e,t){Object.assign(this,{[e]:t}),this.host.requestUpdate()}connectHost(){this.activeClient=this.host.client,this.activeAvailable=this.host.available}disconnectHost(){this.disposeAllTabs(),this.activeClient=null,this.activeAvailable=!1}scheduleLifecycleSync(){let e=++this.lifecycleSyncToken,t=this.lifecycleGeneration;queueMicrotask(()=>{e!==this.lifecycleSyncToken||t!==this.lifecycleGeneration||!this.host.isConnected||this.synchronizeLifecycle()})}synchronizeLifecycle(){let e=this.host.client!==this.activeClient,t=this.host.available!==this.activeAvailable;if(!e&&!t)return;e&&(this.activeClient=this.host.client),this.activeAvailable=this.host.available;let n=t&&!this.host.available;(e||n)&&this.disposeAllTabs();let r=e&&this.host.available&&this.host.terminalPanelOpen;t&&(this.host.available?this.host.restoreTerminalPanelOpenState()&&(r=!0):this.host.hideTerminalPanelForUnavailableSurface()),r&&this.restoreSessions()}async restoreSessions(){await this.bootQueue.enqueueSteps(()=>this.reattachPersistedSessions(),()=>this.ensureInitialSession())}async openCatalogSession(e){await this.bootQueue.enqueueSteps(()=>this.reattachPersistedSessions(),()=>this.openSessionNow(e))}async openRequestedSession(e){await this.enqueueAttachSession(e,!0)}async reattachPersistedSessions(){let e=this.captureTerminalOperation();if(!e||this.tabs.length>0)return;let t=Me();if(t.length!==0){this.updateControllerState(`booting`,!0);try{let n=await this.connectionFor(e).list();if(!this.isTerminalOperationCurrent(e))return;let r=new Map(n.map(e=>[e.sessionId,e]));for(let n of t){let t=r.get(n);if(t?await this.attachSession(n,e,t.owner?.startsWith(`agent:`)===!0,!0):await this.restoreExitedSession(n,e),!this.isTerminalOperationCurrent(e))return}}catch{if(!this.isTerminalOperationCurrent(e))return}finally{this.isTerminalOperationCurrent(e)&&this.updateControllerState(`booting`,!1)}this.isTerminalOperationCurrent(e)&&z(this.tabs)}}async ensureInitialSession(){this.tabs.length===0&&!this.booting&&await this.openSessionNow()}async listSessions(){let e=this.captureTerminalOperation();if(!e)return null;try{let t=await this.connectionFor(e).list();return this.isTerminalOperationCurrent(e)?t:null}catch{return this.isTerminalOperationCurrent(e)?[]:null}}async attachSessionById(e,t=!1){await this.enqueueAttachSession(e,t)}async enqueueAttachSession(e,t){await this.bootQueue.enqueue(async()=>{let n=this.tabs.find(t=>t.gatewaySessionId===e);if(n){this.switchTo(n.id);return}let r=this.captureTerminalOperation();if(r){this.updateControllerState(`booting`,!0),this.host.terminalPanelErrorText=null;try{!await this.attachSession(e,r,t)&&this.isTerminalOperationCurrent(r)&&(this.host.terminalPanelErrorText=h(`terminal.attachFailed`))}finally{this.isTerminalOperationCurrent(r)&&this.updateControllerState(`booting`,!1)}}})}async bootTab(e,t={}){let n=this.connectionFor(e),i=document.createElement(`div`);i.className=`tp-host`;let a=`tab-${++this.tabSequence}`;if(await this.host.updateComplete,!this.isTerminalOperationCurrent(e))throw Error(`terminal operation cancelled`);let o=this.host.findTerminalPanelViewport();if(!o)throw Error(`terminal viewport unavailable`);o.append(i);let s={current:void 0},c=Fe(n,()=>s.current?.gatewaySessionId),{createTerminalDefaultColorQueryResponder:l}=await r(async()=>{let{createTerminalDefaultColorQueryResponder:e}=await import(`./browser-D0_R_7S-.js`);return{createTerminalDefaultColorQueryResponder:e}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),u=l({getColors:()=>q(this.host.themeMode),reply:e=>c.onData(V.encode(e))}),d;try{d=await this.host.createTerminalController({parent:i,readOnly:!1,terminalOptions:{fontSize:11,fontFamily:B,cursorBlink:!0,theme:J(this.host.themeMode),scrollback:5e3},signal:e.signal,onData:c.onData,onResize:c.onResize})}catch(e){throw i.remove(),e}if(!this.isTerminalOperationCurrent(e)){try{d.dispose()}finally{i.remove()}throw Error(`terminal operation cancelled`)}let f={id:a,sequence:this.tabSequence,gatewaySessionId:``,pendingInput:c.buffer,defaultColorQueries:u,shellName:null,shell:``,agentId:null,cwd:null,agentOwned:!1,controller:d,host:i,status:`connecting`,awaitFirstOutput:t.awaitFirstOutput===!0,readyTimer:null};s.current=f,this.updateControllerState(`tabs`,[...this.tabs,f]),this.updateControllerState(`activeId`,a);let{terminal:p}=d;return{tab:f,connection:n,cols:p.cols||80,rows:p.rows||24}}tabSink(e){return{onData:t=>{e.cancelled||(e.defaultColorQueries.observe(t),e.controller.write(V.encode(t)),t.length>0&&this.readiness.markReady(e))},onReplay:(t,n)=>{e.cancelled||(e.defaultColorQueries.primeFromReplay(t.slice(0,n)),e.defaultColorQueries.observe(t.slice(n)),e.controller.terminal.reset(),t&&(e.controller.write(V.encode(t)),this.readiness.markReady(e)))},onExit:t=>this.handleExit(e.id,t)}}adoptSession(e,t,n=!1){e.gatewaySessionId=t.sessionId,e.shellName=t.title??Pe(t.shell),e.shell=t.shell,e.agentId=t.agentId,e.cwd=t.cwd,e.agentOwned=n;let{cols:r,rows:i}=e.controller.terminal;this.connection?.resize(t.sessionId,r||80,i||24);for(let n of e.pendingInput.drain())this.connection?.input(t.sessionId,n);e.status===`connecting`&&(e.awaitFirstOutput?this.readiness.arm(e):this.readiness.markReady(e)),this.updateControllerState(`tabs`,[...this.tabs]),z(this.tabs)}dropFailedTab(e){this.disposeTab(e),this.updateControllerState(`tabs`,this.tabs.filter(t=>t.id!==e.id)),this.activeId===e.id&&this.updateControllerState(`activeId`,this.tabs.at(-1)?.id??null)}async openSession(e){await this.bootQueue.enqueue(()=>this.openSessionNow(e))}async openSessionNow(e){let t=this.captureTerminalOperation();if(!t)return;this.updateControllerState(`booting`,!0),this.host.terminalPanelErrorText=null;let n=this.host.agentId?.trim()||void 0,r;try{let i=await this.bootTab(t,{awaitFirstOutput:!!e});r=i.tab;let a=await i.connection.open({agentId:n,cols:i.cols,rows:i.rows,...e?{catalog:e}:{}},this.tabSink(i.tab));if(!this.isTerminalOperationCurrent(t)||i.tab.cancelled){i.connection.close(a.sessionId),this.tabs.includes(i.tab)&&(i.tab.cancelled=`lifecycle`,this.dropFailedTab(i.tab));return}this.adoptSession(i.tab,a),i.tab.controller.terminal.focus()}catch(e){if(r&&!r.gatewaySessionId&&this.tabs.includes(r)&&this.dropFailedTab(r),!this.isTerminalOperationCurrent(t))return;this.host.terminalPanelErrorText=e instanceof P?h(`terminal.connectionTimedOut`):e instanceof Error?e.message:String(e)}finally{this.isTerminalOperationCurrent(t)&&this.updateControllerState(`booting`,!1)}}async attachSession(e,t,n=!1,r=!1){let i,a;try{let r=await this.bootTab(t);i=r.tab,a=r.connection;let o=await r.connection.attach(e,this.tabSink(r.tab));return!this.isTerminalOperationCurrent(t)||r.tab.cancelled?(r.tab.cancelled===`close`&&r.connection.close(o.sessionId),this.tabs.includes(r.tab)&&(r.tab.cancelled=`lifecycle`,this.dropFailedTab(r.tab)),!1):(this.adoptSession(r.tab,o,n),!0)}catch{let n=r&&a?await this.confirmRestoredSessionGone(a,e,t):!1;return i&&!i.gatewaySessionId&&this.tabs.includes(i)&&(n?this.markRestoredSessionExited(i,e):this.dropFailedTab(i)),!1}}async confirmRestoredSessionGone(e,t,n){try{let r=await e.list();return this.isTerminalOperationCurrent(n)&&!r.some(e=>e.sessionId===t)}catch{return!1}}async restoreExitedSession(e,t){let n=await this.bootTab(t);if(!this.isTerminalOperationCurrent(t)||n.tab.cancelled){this.tabs.includes(n.tab)&&(n.tab.cancelled=`lifecycle`,this.dropFailedTab(n.tab));return}this.markRestoredSessionExited(n.tab,e)}markRestoredSessionExited(e,t){e.gatewaySessionId=t,this.handleExit(e.id,{reason:`disconnected`,exitCode:null})}handleExit(e,t){let n=this.tabs.find(t=>t.id===e);n&&(this.readiness.stop(n),n.status=`exited`,n.exitReason=t.reason,n.exitCode=t.exitCode,t.error?.trim()&&(this.host.terminalPanelErrorText=t.error.trim()),this.updateControllerState(`tabs`,[...this.tabs]),z(this.tabs))}closeTab(e){let t=this.tabs.find(t=>t.id===e);t&&(this.host.terminalPanelUploadController.cancelForTab(t),t.gatewaySessionId&&t.status!==`exited`?this.connection?.close(t.gatewaySessionId):!t.gatewaySessionId&&t.status!==`exited`&&(t.cancelled=`close`),this.disposeTab(t),this.updateControllerState(`tabs`,this.tabs.filter(t=>t.id!==e)),this.activeId===e&&this.updateControllerState(`activeId`,this.tabs.at(-1)?.id??null),z(this.tabs),this.tabs.length===0&&!this.host.fullscreen&&this.host.closeTerminalPanel())}switchTo(e){this.updateControllerState(`activeId`,e);let t=this.tabs.find(t=>t.id===e);this.host.updateComplete.then(()=>{t&&(t.controller.fit(),R(t.controller),t.controller.terminal.focus())})}captureTerminalOperation(){let e=this.host.client;return!e||e!==this.activeClient||!this.host.available||!this.host.isConnected?null:{generation:this.lifecycleGeneration,client:e,signal:this.lifecycleAbortController.signal}}isTerminalOperationCurrent(e){return this.host.isConnected&&this.host.available&&this.host.client===e.client&&this.activeClient===e.client&&this.lifecycleGeneration===e.generation&&!e.signal.aborted}connectionFor(e){if(!this.isTerminalOperationCurrent(e))throw Error(`terminal operation cancelled`);return this.connection??=new F(e.client),this.connection}disposeTab(e){this.readiness.stop(e);try{e.controller.dispose()}catch{}finally{e.host.remove()}}disposeAllTabs(){this.lifecycleGeneration+=1,this.lifecycleAbortController.abort(),this.lifecycleAbortController=new AbortController,this.bootQueue.reset(),this.updateControllerState(`booting`,!1),this.host.terminalPanelUploadController.dispose(),this.host.clearTerminalPanelResizeListeners();for(let e of this.tabs)e.cancelled=`lifecycle`,this.disposeTab(e);this.updateControllerState(`tabs`,[]),this.updateControllerState(`activeId`,null),this.host.resetTerminalSessionPicker(),this.connection?.dispose(),this.connection=null}}}));function Ue(e,t){let n=J(t);for(let t of e){let e=t.controller.terminal;e.renderer&&e.wasmTerm&&(e.renderer.setTheme(n),R(t.controller))}}function We(e,t,n){if(!n)return;for(let t of e)t.host.parentElement!==n&&n.append(t.host);let r=e.find(e=>e.id===t);r&&(r.controller.fit(),R(r.controller))}function Ge(e,t){e.find(e=>e.id===t)?.controller.fit()}function Ke(e){for(let t of e)t.controller.fit()}function qe(e,t){for(let n of e)n.host.style.display=n.id===t?`block`:`none`}var Je=e((()=>{H(),Be()})),Ye,Xe=e((()=>{l(),Ye=f`
  .tp--bottom {
    left: var(--shell-nav-width, 0);
    right: 0;
    bottom: 0;
    --tp-session-menu-max-height: calc(var(--tp-panel-height) - 44px);
  }
  .tp--right {
    top: var(--shell-topbar-height, 0);
    right: 0;
    bottom: 0;
    --tp-session-menu-max-height: calc(100dvh - var(--shell-topbar-height, 0px) - 44px);
  }
  .tp--fullscreen {
    inset: 0;
  }
  .tp-header {
    background: var(--bg, #0e1015);
  }
  .tp-icon.is-active {
    color: var(--text, #d7dae0);
    background: color-mix(in srgb, var(--text, #d7dae0) 10%, transparent);
  }
  .tp-session-picker {
    position: relative;
  }
  .tp-session-menu {
    position: absolute;
    z-index: 4;
    top: 31px;
    right: 0;
    width: min(360px, calc(100vw - 24px));
    max-height: min(420px, var(--tp-session-menu-max-height));
    overflow-y: auto;
    border: 1px solid var(--border, #262b34);
    border-radius: 8px;
    background: var(--bg, #0e1015);
    box-shadow: 0 12px 30px rgb(0 0 0 / 35%);
    padding: 6px;
  }
  .tp-session-menu__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px 7px;
    color: var(--text, #d7dae0);
    font-size: 12px;
    font-weight: 600;
  }
  .tp-session-refresh {
    border: 0;
    background: transparent;
    color: var(--accent, #ff5c5c);
    font: inherit;
    font-weight: 500;
    padding: 2px 4px;
  }
  .tp-session {
    display: grid;
    grid-template-columns: minmax(70px, auto) minmax(100px, 1fr) auto;
    align-items: center;
    gap: 8px;
    width: 100%;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--text, #d7dae0);
    padding: 7px 8px;
    text-align: left;
  }
  .tp-session:not(:disabled):hover,
  .tp-session:not(:disabled):focus-visible {
    background: color-mix(in srgb, var(--text, #d7dae0) 10%, transparent);
  }
  .tp-session:disabled {
    opacity: 0.55;
  }
  .tp-session__agent {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 600;
  }
  .tp-session__cwd {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--muted, #8a919e);
    font:
      11px ui-monospace,
      SFMono-Regular,
      "SF Mono",
      Menlo,
      Consolas,
      "Liberation Mono",
      monospace;
  }
  .tp-session__state {
    color: var(--muted, #8a919e);
    font-size: 11px;
    white-space: nowrap;
  }
  .tp-session-empty {
    padding: 10px 8px;
    color: var(--muted, #8a919e);
    font-size: 12px;
  }
  .tp-viewport {
    position: relative;
    flex: 1;
    min-height: 0;
    background: var(--bg, #0e1015);
  }
  .tp-host {
    position: absolute;
    inset: 0;
    z-index: 0;
    padding: 6px 8px;
    caret-color: transparent;
  }
  .tp-connecting {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: var(--muted, #8a919e);
    background: color-mix(in srgb, var(--bg, #0e1015) 88%, transparent);
    font-size: 12px;
    pointer-events: none;
  }
  .tp-connecting__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid color-mix(in srgb, var(--accent, #ff5c5c) 24%, transparent);
    border-top-color: var(--accent, #ff5c5c);
    border-radius: 50%;
    animation: tp-spin 0.8s linear infinite;
  }
  .tp-error {
    padding: 10px 12px;
    font-size: 12px;
    color: var(--danger, #ff6b6b);
  }
  @keyframes tp-spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tp-connecting__spinner {
      animation: none;
    }
  }
`})),Ze,Qe=e((()=>{l(),Ze=f`
  .tp-icon:disabled {
    opacity: 0.35;
    pointer-events: none;
  }
  .tp-file-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  .tp-drop-overlay {
    position: absolute;
    z-index: 4;
    inset: 8px;
    display: grid;
    place-items: center;
    border: 1px dashed var(--accent, #ff5c5c);
    background: color-mix(in srgb, var(--bg, #0e1015) 88%, var(--accent, #ff5c5c));
    color: var(--text, #d7dae0);
    font-size: 13px;
    pointer-events: none;
  }
  .tp-upload-card {
    position: absolute;
    z-index: 5;
    right: 10px;
    bottom: 10px;
    width: min(300px, calc(100% - 20px));
    box-sizing: border-box;
    padding: 9px 10px 10px;
    border: 1px solid var(--border, #262b34);
    border-radius: 7px;
    background: color-mix(in srgb, var(--bg, #0e1015) 94%, var(--text, #d7dae0));
    box-shadow: 0 8px 24px rgb(0 0 0 / 28%);
    color: var(--text, #d7dae0);
    font-size: 11px;
  }
  .tp-upload-card--failed {
    border-color: color-mix(in srgb, var(--danger, #ff6b6b) 55%, var(--border, #262b34));
  }
  .tp-upload-card__header {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .tp-upload-card__copy {
    flex: 1;
    min-width: 0;
  }
  .tp-upload-card__title {
    color: var(--text, #d7dae0);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .tp-upload-card--failed .tp-upload-card__title,
  .tp-upload-card__error {
    color: var(--danger, #ff6b6b);
  }
  .tp-upload-card__file {
    margin-top: 2px;
    overflow: hidden;
    color: var(--muted, #8a919e);
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tp-upload-card__error {
    margin-top: 6px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }
  .tp-upload-card__actions {
    display: flex;
    gap: 4px;
  }
  .tp-upload-card__action {
    margin: -3px 0;
    padding: 3px 5px;
    border: 0;
    border-radius: 4px;
    background: transparent;
    color: var(--muted, #8a919e);
    font: inherit;
    cursor: pointer;
  }
  .tp-upload-card__action:hover {
    background: color-mix(in srgb, var(--text, #d7dae0) 10%, transparent);
    color: var(--text, #d7dae0);
  }
  .tp-upload-card__action:focus-visible {
    outline: 1px solid var(--accent, #ff5c5c);
    outline-offset: 1px;
  }
  .tp-upload-retry {
    color: var(--accent, #ff5c5c);
  }
  .tp-upload-progress {
    position: relative;
    height: 3px;
    margin-top: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--border, #262b34) 72%, transparent);
  }
  .tp-upload-progress__fill,
  .tp-upload-progress__activity {
    position: absolute;
    inset-block: 0;
    left: 0;
    border-radius: inherit;
    background: var(--accent, #ff5c5c);
  }
  .tp-upload-progress__fill {
    transition: width 180ms ease-out;
  }
  .tp-upload-progress__activity {
    width: 26%;
    opacity: 0.7;
    animation: tp-upload-progress 1.15s ease-in-out infinite;
  }
  .tp-upload-card--failed .tp-upload-progress__fill {
    background: var(--danger, #ff6b6b);
  }
  @keyframes tp-upload-progress {
    from {
      transform: translateX(-110%);
    }
    to {
      transform: translateX(385%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .tp-upload-progress__activity {
      animation: none;
      transform: none;
    }
  }
`}));async function $e(e){let[{createGhosttyTerminal:t,loadGhosttyRuntime:n},i]=await Promise.all([r(()=>import(`./browser-D0_R_7S-.js`),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),r(()=>import(`./ghostty-web-IRe0fnQT.js`),__vite__mapDeps([6,1,2,3,4,5]),import.meta.url)]),a=await n({module:i});return t({...e,runtime:a})}var et=e((()=>{t()}));function tt(e){return u`
    <div class="tp-session-picker" @focusout=${e.onFocusOut}>
      <button
        class="tp-icon"
        type="button"
        title=${h(`terminal.sessions`)}
        aria-label=${h(`terminal.sessions`)}
        aria-expanded=${e.open?`true`:`false`}
        aria-haspopup="dialog"
        aria-controls=${Z}
        @click=${e.onToggle}
      >
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="1.3"
          aria-hidden="true"
        >
          <path d="M3 3.25h10v3.5H3zM3 9.25h10v3.5H3z" />
          <path d="m5 4.5 1 1-1 1m0 4 1 1-1 1" />
        </svg>
      </button>
      ${e.open?u`<div
            id=${Z}
            class="tp-session-menu"
            role="dialog"
            aria-label=${h(`terminal.sessions`)}
            @keydown=${t=>{t.key===`Escape`&&(t.preventDefault(),t.stopPropagation(),e.onDismiss(!0))}}
          >
            <div class="tp-session-menu__header">
              <span>${h(`terminal.sessions`)}</span>
              <button class="tp-session-refresh" type="button" @click=${e.onRefresh}>
                ${h(`terminal.refreshSessions`)}
              </button>
            </div>
            ${e.loading?u`<div class="tp-session-empty">${h(`terminal.loadingSessions`)}</div>`:e.sessions.length===0?u`<div class="tp-session-empty">${h(`terminal.noSessions`)}</div>`:e.sessions.map(t=>{let n=e.currentSessionIds.has(t.sessionId),r=n?h(`terminal.currentSession`):t.attached?h(`terminal.sessionAttached`):h(`terminal.detached`);return u`<button
                      class="tp-session"
                      type="button"
                      ?disabled=${n}
                      title=${n?r:h(`terminal.attachSession`)}
                      @click=${()=>e.onAttach(t.sessionId,t.owner)}
                    >
                      <span class="tp-session__agent">${t.agentId}</span>
                      <span class="tp-session__cwd">${t.cwd}</span>
                      <span class="tp-session__state">${r}</span>
                    </button>`})}
          </div>`:s}
    </div>
  `}var Z,nt=e((()=>{l(),g(),Z=`terminal-session-picker-dialog`})),rt,Q,$,it=e((()=>{ee(),l(),c(),g(),o(),se(),le(),v(),ae(),ke(),He(),Je(),Xe(),Qe(),T(),et(),nt(),n(),rt=ue({storageKey:`openclaw.terminal.panel.v1`,minHeight:140,minWidth:320,defaultDock:`bottom`,supportedDocks:[`bottom`,`right`],defaultHeight:320,defaultWidth:520}),Q=3e4,$=class extends a{constructor(...e){super(...e),this.client=null,this.agentId=null,this.available=!1,this.suppressed=!1,this.themeMode=`dark`,this.fullscreen=!1,this.terminalPanelErrorText=null,this.sessionPickerOpen=!1,this.pickerSessions=[],this.sessionPickerTask=new re(this,{autoRun:!1,args:()=>[this.available?this.client:null],task:([e])=>e?this.terminalSessions.listSessions():ne,onComplete:e=>{e!==null&&(this.pickerSessions=e)}}),this.terminalPanelUploadController=new w({activeTab:()=>this.terminalSessions.tabs.find(e=>e.id===this.terminalSessions.activeId&&e.status===`live`&&e.gatewaySessionId),client:()=>this.client,isCurrent:e=>this.terminalSessions.tabs.includes(e)&&e.status===`live`,fileInput:()=>this.renderRoot.querySelector(`.tp-file-input`),setError:e=>this.terminalPanelErrorText=e,requestUpdate:()=>this.requestUpdate()}),this.createTerminalController=$e,this.catalogReadyTimeoutMs=Q,this.terminalSessions=new Ve(this),this.dockLayout=new ce(this,{layout:rt,reservationPrefix:`terminal`,isAvailable:()=>this.available,isFullscreen:()=>this.fullscreen,onResize:()=>Ge(this.terminalSessions.tabs,this.terminalSessions.activeId)}),this.onGlobalKeyDown=e=>this.handleGlobalKey(e),this.onToggleRequest=e=>this.handleToggleRequest(e),this.onDocumentPointerDown=e=>this.handleDocumentPointerDown(e)}connectedCallback(){super.connectedCallback(),this.terminalSessions.connectHost(),this.dockLayout.setSuppressed(this.suppressed),this.fullscreen||(window.addEventListener(`keydown`,this.onGlobalKeyDown),window.addEventListener(_,this.onToggleRequest)),document.addEventListener(`pointerdown`,this.onDocumentPointerDown,!0),this.dockLayout.open&&this.terminalSessions.restoreSessions()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`keydown`,this.onGlobalKeyDown),window.removeEventListener(_,this.onToggleRequest),document.removeEventListener(`pointerdown`,this.onDocumentPointerDown,!0),this.terminalSessions.disconnectHost()}updated(e){e.has(`suppressed`)&&this.dockLayout.setSuppressed(this.suppressed)&&this.terminalSessions.restoreSessions(),(e.has(`client`)||e.has(`available`))&&this.terminalSessions.scheduleLifecycleSync(),e.has(`themeMode`)&&Ue(this.terminalSessions.tabs,this.themeMode),this.dockLayout.open&&We(this.terminalSessions.tabs,this.terminalSessions.activeId,this.findTerminalPanelViewport()),this.dockLayout.syncReservation()}toggle(){this.available&&(this.dockLayout.open?this.closeTerminalPanel():(this.dockLayout.setOpen(!0),this.terminalSessions.restoreSessions()))}handleToggleRequest(e){let t=e instanceof CustomEvent&&typeof e.detail==`object`&&e.detail!==null?e.detail:null,n=t?.dock===`right`||t?.dock===`bottom`?t.dock:null;if(n&&this.dockLayout.setDock(n,!1),t?.open===!1){this.closeTerminalPanel();return}if(t?.terminalSessionId||t?.catalog||t?.open===!0){if(!this.available)return;this.dockLayout.setOpen(!0),t.terminalSessionId?this.terminalSessions.openRequestedSession(t.terminalSessionId):t.catalog?this.terminalSessions.openCatalogSession(t.catalog):this.terminalSessions.restoreSessions();return}this.toggle()}closeTerminalPanel(){this.closeSessionPicker(!1),this.dockLayout.setOpen(!1)}get terminalPanelOpen(){return this.dockLayout.open}hideTerminalPanelForUnavailableSurface(){this.dockLayout.hideWithoutPersisting()}restoreTerminalPanelOpenState(){return this.dockLayout.restoreOpenState()}clearTerminalPanelResizeListeners(){this.dockLayout.clearResizeListeners()}handleGlobalKey(e){ie(e)&&(e.preventDefault(),this.toggle())}toggleSessionPicker(){if(this.sessionPickerOpen){this.closeSessionPicker(!0);return}this.sessionPickerOpen=!0,this.refreshSessionPicker(),this.updateComplete.then(()=>{this.sessionPickerOpen&&this.renderRoot.querySelector(`.tp-session-refresh`)?.focus()})}closeSessionPicker(e){this.sessionPickerOpen&&(this.sessionPickerOpen=!1,e&&this.updateComplete.then(()=>{this.renderRoot.querySelector(`[aria-controls="terminal-session-picker-dialog"]`)?.focus()}))}handleDocumentPointerDown(e){if(!this.sessionPickerOpen)return;let t=this.renderRoot.querySelector(`.tp-session-picker`),n=e.composedPath();t&&!n.includes(t)&&this.closeSessionPicker(!1)}handleSessionPickerFocusOut(e){let t=e.currentTarget,n=e.relatedTarget;t instanceof HTMLElement&&n instanceof Node&&t.contains(n)||queueMicrotask(()=>{t instanceof HTMLElement&&!t.contains(this.shadowRoot?.activeElement??null)&&this.sessionPickerOpen&&this.closeSessionPicker(!1)})}refreshSessionPicker(){return this.sessionPickerTask.run()}async attachPickedSession(e,t){this.sessionPickerOpen=!1,await this.terminalSessions.attachSessionById(e,t?.startsWith(`agent:`)===!0)}setDock(e){this.dockLayout.setDock(e),this.updateComplete.then(()=>Ke(this.terminalSessions.tabs))}resetTerminalSessionPicker(){this.closeSessionPicker(!1),this.sessionPickerTask.run([null]),this.pickerSessions=[]}findTerminalPanelViewport(){return this.renderRoot.querySelector(`.tp-viewport`)}render(){if(!this.available||!this.dockLayout.open)return s;let e=this.fullscreen?`fullscreen`:this.dockLayout.dock,t=this.fullscreen?s:this.dockLayout.dock===`bottom`?`height:${this.dockLayout.height}px;--tp-panel-height:${this.dockLayout.height}px`:`width:${this.dockLayout.width}px`,n=this.terminalSessions.tabs.find(e=>e.id===this.terminalSessions.activeId),r=this.terminalSessions.booting&&this.terminalSessions.tabs.length===0||n?.status===`connecting`,i=tt({open:this.sessionPickerOpen,loading:this.sessionPickerTask.status===te.PENDING,sessions:this.pickerSessions,currentSessionIds:new Set(this.terminalSessions.tabs.map(e=>e.gatewaySessionId).filter(e=>typeof e==`string`&&e.length>0)),onToggle:()=>this.toggleSessionPicker(),onDismiss:e=>this.closeSessionPicker(e),onFocusOut:e=>this.handleSessionPickerFocusOut(e),onRefresh:()=>void this.refreshSessionPicker(),onAttach:(e,t)=>void this.attachPickedSession(e,t)}),a=Ee(this.fullscreen,this.dockLayout.dock,this.terminalPanelUploadController,i,e=>this.setDock(e),()=>this.closeTerminalPanel());return u`
      <section class="tp tp--${e}" style=${t} aria-label=${h(`terminal.title`)}>
        ${this.dockLayout.renderResizer(`tp`,h(`terminal.resize`))}
        ${De(this.terminalSessions.tabs,this.terminalSessions.activeId,this.terminalSessions.booting,a,e=>this.terminalSessions.switchTo(e),e=>this.terminalSessions.closeTab(e),()=>void this.terminalSessions.openSession())}
        ${Oe(this.terminalSessions.activeId,r,this.terminalPanelErrorText,this.terminalPanelUploadController)}
      </section>
    `}willUpdate(){qe(this.terminalSessions.tabs,this.terminalSessions.activeId)}static{this.styles=[de,oe,Ye,Ze]}},i([p({attribute:!1})],$.prototype,`client`,void 0),i([p({attribute:!1})],$.prototype,`agentId`,void 0),i([p({type:Boolean})],$.prototype,`available`,void 0),i([p({type:Boolean})],$.prototype,`suppressed`,void 0),i([p({attribute:!1})],$.prototype,`themeMode`,void 0),i([p({type:Boolean})],$.prototype,`fullscreen`,void 0),i([m()],$.prototype,`terminalPanelErrorText`,void 0),i([m()],$.prototype,`sessionPickerOpen`,void 0),i([m()],$.prototype,`pickerSessions`,void 0)}));e((()=>{it(),customElements.get(`openclaw-terminal-panel`)||customElements.define(`openclaw-terminal-panel`,$)}))();
//# sourceMappingURL=terminal-panel-registration-CD5JArUC.js.map