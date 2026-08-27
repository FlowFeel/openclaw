import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Gc as r,Kc as i}from"./control-ui-core-BUddgKjW.js";import{K as a,Q as o,W as s,Y as c,Z as l,ct as ee,it as u}from"./lit-runtime-D5xZwgO1.js";import{At as te,Dt as d}from"./control-ui-foundation-DkfOBVsU.js";import{o as f,t as p}from"./control-ui-core-s0pW0mau.js";import{b as m,w as ne}from"./control-ui-core-vLOElyFQ.js";import{n as re,r as ie,t as ae}from"./dock-layout-controller-BoyqOhTW.js";import{n as oe,t as se}from"./dock-panel-layout-BeKwwc_p.js";import{n as ce,r as le,t as h}from"./panel-tab-strip-TSZRTlvQ.js";import{a as ue,i as de,n as fe,o as pe,r as g}from"./browser-annotation-Bsw-0FRT.js";import{n as _,t as me}from"./open-external-url-NvatsHxk.js";function v(e,t){return e.request(k,t)}function y(e){return typeof e==`string`?e:``}function b(e){return typeof e==`number`&&Number.isFinite(e)?e:null}function x(e){let t=d(e),n=y(t?.targetId);return n?{id:y(t?.tabId)||n,targetId:n,title:y(t?.title),url:y(t?.url)}:null}async function S(e){let t=d(await v(e,{method:`GET`,path:`/tabs`})),n=Array.isArray(t?.tabs)?t.tabs.flatMap(e=>x(e)??[]):[];return{running:t?.running===!0,tabs:n}}async function he(e){await v(e,{method:`POST`,path:`/start`,body:{}})}async function ge(e,t){return x(await v(e,{method:`POST`,path:`/tabs/open`,body:{url:t}}))}async function _e(e,t){await v(e,{method:`POST`,path:`/tabs/focus`,body:{targetId:t}})}async function ve(e,t){await v(e,{method:`DELETE`,path:`/tabs/${encodeURIComponent(t)}`})}async function ye(e,t){let n=d(await v(e,{method:`POST`,path:`/navigate`,body:t}));return{targetId:y(n?.targetId)||t.targetId||``,url:y(n?.url)||t.url}}async function be(e,t){let n=d(await v(e,{method:`POST`,path:`/screenshot`,body:{targetId:t,type:`png`}})),r=y(n?.path);if(!r)throw Error(f(`browser.errors.screenshotPathMissing`));return{path:r,targetId:y(n?.targetId)||t,url:y(n?.url)}}async function xe(e,t){await v(e,{method:`POST`,path:`/act`,body:{kind:`clickCoords`,targetId:t.targetId,x:Math.max(0,Math.round(t.x)),y:Math.max(0,Math.round(t.y)),...t.doubleClick?{doubleClick:!0}:{}}})}async function C(e,t){await v(e,{method:`POST`,path:`/act`,body:{kind:`press`,targetId:t.targetId,key:t.key}})}async function w(e,t){return d(await v(e,{method:`POST`,path:`/act`,body:{kind:`evaluate`,targetId:t.targetId,fn:t.fn}}))?.result??null}function T(e){return e instanceof Error&&e.message.includes(`evaluateEnabled=false`)}async function Se(e,t){let n=Math.round(t.deltaX),r=Math.round(t.deltaY);await w(e,{targetId:t.targetId,fn:`() => { window.scrollBy(${n}, ${r}); return true; }`})}async function Ce(e,t){await w(e,{targetId:t.targetId,fn:`() => { history.go(${t.delta}); return true; }`})}async function E(e,t){let n=d(await w(e,{targetId:t,fn:`() => ({ cssWidth: window.innerWidth, cssHeight: window.innerHeight, title: document.title, url: location.href })`})),r=b(n?.cssWidth),i=b(n?.cssHeight);return!r||!i||r<=0||i<=0?null:{cssWidth:r,cssHeight:i,title:y(n?.title),url:y(n?.url)}}async function D(e,t){let n=Math.max(0,Math.round(t.x)),r=Math.max(0,Math.round(t.y)),i=d(await w(e,{targetId:t.targetId,fn:`() => {
        const el = document.elementFromPoint(${n}, ${r});
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const label = el.getAttribute("aria-label") || el.getAttribute("alt") || el.getAttribute("title") || "";
        const text = (el.textContent || "").replace(/\\s+/g, " ").trim();
        const nameSource = label || text;
        const nameLimit = 120;
        // This serialized page function cannot call imported helpers; back up only when the cap splits a surrogate pair.
        const nameEnd = (nameSource.codePointAt(nameLimit - 1) || 0) > 0xffff ? nameLimit - 1 : nameLimit;
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || "",
          classes: Array.from(el.classList).slice(0, 6),
          role: el.getAttribute("role") || "",
          name: nameSource.slice(0, nameEnd),
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          focusable: typeof el.tabIndex === "number" && el.tabIndex >= 0,
        };
      }`}));if(!i)return null;let a=d(i.rect);return{tag:y(i.tag),id:y(i.id),classes:Array.isArray(i.classes)?i.classes.filter(e=>typeof e==`string`):[],role:y(i.role),name:y(i.name),rect:{x:b(a?.x)??0,y:b(a?.y)??0,width:b(a?.width)??0,height:b(a?.height)??0},focusable:i.focusable===!0}}async function O(e){let t=e.basePath&&e.basePath!==`/`?e.basePath.endsWith(`/`)?e.basePath.slice(0,-1):e.basePath:``,n=new URLSearchParams({source:e.path}),r=new Headers({Accept:`image/*`});e.authToken&&r.set(`Authorization`,`Bearer ${e.authToken}`);let i=new AbortController,a=setTimeout(()=>i.abort(new DOMException(f(`browser.errors.screenshotFetchTimedOut`),`TimeoutError`)),A),o;try{let e=await fetch(`${t}/__openclaw__/assistant-media?${n.toString()}`,{method:`GET`,headers:r,credentials:`same-origin`,signal:i.signal});if(!e.ok)throw e.body?.cancel().catch(()=>void 0),Error(f(`browser.errors.screenshotFetchFailed`,{status:String(e.status)}));o=await e.blob()}finally{clearTimeout(a)}return await new Promise((e,t)=>{let n=new FileReader;n.addEventListener(`load`,()=>{typeof n.result==`string`?e(n.result):t(Error(f(`browser.errors.screenshotReadFailed`)))}),n.addEventListener(`error`,()=>t(n.error??Error(f(`browser.errors.screenshotReadFailed`)))),n.readAsDataURL(o)})}var k,A,j=e((()=>{te(),p(),k=`browser.request`,A=3e4}));async function we(e,t,n,r,i){if(n)return null;try{return await E(e,t)}catch(e){return r()&&T(e)&&i(),null}}var M,Te=e((()=>{j(),M=class{constructor(e){this.host=e,this.lifecycleEpoch=0,this.requestedMutation=0,this.requestedSnapshot=0,this.acceptedSnapshot=0,this.requestedCapture=0,this.requestedInspection=0,this.capturePending=!1,this.navigationQueues=new WeakMap,this.navigationCommits=new WeakMap}get epoch(){return this.lifecycleEpoch}get hasPendingCapture(){return this.capturePending}captureClient(){return this.host.available&&this.host.client?this.host.client:null}isLive(e,t){return this.host.isConnected&&this.host.browserPanelIsOpen()&&this.lifecycleEpoch===e&&(t===void 0||this.host.client===t)}invalidate(){this.lifecycleEpoch+=1,this.capturePending=!1,this.invalidateInspection()}invalidateInspection(){this.requestedInspection+=1}beginMutation(e){this.requestedCapture+=1,this.capturePending=!1;let t={client:e,epoch:this.lifecycleEpoch,id:++this.requestedMutation,mutationId:this.requestedMutation,isCurrent:()=>this.isLive(t.epoch,e)&&t.id===this.requestedMutation};return t}hasQueuedNavigation(e,t){return this.navigationQueues.get(e)?.has(t)??!1}hasUnreconciledNavigation(e,t){let n=this.navigationCommits.get(e)?.get(t);return n!==void 0&&n.committed!==n.reconciled}markNavigationCommitted(e,t){let n=this.navigationCommits.get(e);n||(n=new Map,this.navigationCommits.set(e,n));let r=n.get(t)??{committed:0,reconciled:0};r.committed+=1,n.set(t,r)}markNavigationReconciled(e,t){let n=this.navigationCommits.get(e)?.get(t);n&&(n.reconciled=n.committed)}async queueNavigation(e,t,n){let r=this.navigationQueues.get(e);r||(r=new Map,this.navigationQueues.set(e,r));let i=r.get(t),a=i?i.then(n,n):n();r.set(t,a);try{return await a}finally{r.get(t)===a&&(r.delete(t),r.size===0&&this.navigationQueues.delete(e))}}beginSnapshot(e){let t=this.requestedMutation,n={client:e,epoch:this.lifecycleEpoch,id:++this.requestedSnapshot,mutationId:t,isCurrent:()=>this.isLive(n.epoch,e)&&n.id===this.requestedSnapshot&&t===this.requestedMutation};return n}acceptSnapshot(e,t,n){return!this.isLive(e.epoch,e.client)||e.id<this.acceptedSnapshot||!e.isCurrent()&&n!==t?!1:(this.acceptedSnapshot=e.id,!0)}canCaptureSnapshot(e){return this.isLive(e.epoch,e.client)&&e.mutationId===this.requestedMutation}survivingInvocation(e,t){let n=this.lifecycleEpoch,r=this.requestedMutation;return()=>this.isLive(n,t)&&r===this.requestedMutation&&(r!==e.id||n!==e.epoch)}beginCapture(e,t,n,r=this.lifecycleEpoch){if(!this.isLive(r,e)||n()!==t)return null;let i=++this.requestedCapture;return this.capturePending=!0,()=>this.isLive(r,e)&&n()===t&&i===this.requestedCapture}completeCapture(){this.capturePending=!1}beginInspection(e,t){let n=this.lifecycleEpoch,r=++this.requestedInspection;return()=>this.isLive(n,e)&&r===this.requestedInspection&&t()}}})),N,Ee=e((()=>{N=class{constructor(){this.refreshTimer=null,this.wheelTimer=null,this.inspectTimer=null,this.wheelDeltaX=0,this.wheelDeltaY=0,this.lastInspectAt=0}clear(){this.refreshTimer!==null&&(clearTimeout(this.refreshTimer),this.refreshTimer=null),this.clearInput()}clearInput(){this.wheelTimer!==null&&(clearTimeout(this.wheelTimer),this.wheelTimer=null),this.inspectTimer!==null&&(clearTimeout(this.inspectTimer),this.inspectTimer=null),this.wheelDeltaX=0,this.wheelDeltaY=0,this.lastInspectAt=0}scheduleRefresh(e,t){this.refreshTimer!==null&&clearTimeout(this.refreshTimer),this.refreshTimer=window.setTimeout(()=>{this.refreshTimer=null,t()},e)}queueWheel(e,t,n,r){this.wheelDeltaX+=e,this.wheelDeltaY+=t,this.wheelTimer===null&&(this.wheelTimer=window.setTimeout(()=>{this.wheelTimer=null;let e=this.wheelDeltaX,t=this.wheelDeltaY;this.wheelDeltaX=0,this.wheelDeltaY=0,(e!==0||t!==0)&&r(e,t)},n))}queueInspection(e,t,n){let r=()=>{t()&&(this.lastInspectAt=Date.now(),n())};if(Date.now()-this.lastInspectAt>=e){r();return}this.inspectTimer!==null&&clearTimeout(this.inspectTimer),this.inspectTimer=window.setTimeout(()=>{this.inspectTimer=null,r()},e)}}}));function De(e){return new Promise((t,n)=>{let r=new Image;r.addEventListener(`load`,()=>t(r)),r.addEventListener(`error`,()=>n(Error(f(`browser.errors.screenshotDecodeFailed`)))),r.src=e})}function Oe(e){return I.has(e)||e.length===1}function P(e,t){if(!e)return null;let n=e.getBoundingClientRect();return n.width<=0||n.height<=0?null:{x:(t.clientX-n.left)/n.width,y:(t.clientY-n.top)/n.height}}function F(e,t,n){let r=P(e,t);if(!r||!n)return null;let i=n.metrics?.cssWidth??n.image.naturalWidth,a=n.metrics?.cssHeight??n.image.naturalHeight;return{x:r.x*i,y:r.y*a}}function ke(e,t){if(!e||!t)return null;let n=e.metrics?.cssWidth??e.image.naturalWidth,r=e.metrics?.cssHeight??e.image.naturalHeight;return n<=0||r<=0?null:{x:t.rect.x/n,y:t.rect.y/r,width:t.rect.width/n,height:t.rect.height/r}}function Ae(e,t,n,r){if(!e||!t)return;let i=Math.max(1,Math.round(t.clientWidth)),a=Math.max(1,Math.round(t.clientHeight));(e.width!==i||e.height!==a)&&(e.width=i,e.height=a);let o=e.getContext(`2d`);o&&(o.clearRect(0,0,i,a),pe(o,{width:i,height:a,strokes:n,highlight:r}))}function je(e,t,n,r,i){return de({text:fe({url:e.metrics?.url||e.url||t?.url||``,title:e.metrics?.title||t?.title||``,strokes:n,element:r}),dataUrl:g({image:e.image,width:e.image.naturalWidth,height:e.image.naturalHeight,strokes:n,highlight:i}),fileName:`annotated-page.png`})}var I,Me=e((()=>{p(),ue(),I=new Set([`Enter`,`Backspace`,`Delete`,`Tab`,`Escape`,`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`,`Home`,`End`,`PageUp`,`PageDown`])}));function L(e){let t=e.trim();if(!t)return null;let n=/^[a-z][a-z0-9+.-]*:(?![0-9])/i.test(t);if(n&&!/^https?:\/\//i.test(t))return null;let r=n?t:`https://${t}`;try{let e=new URL(r);return e.protocol===`http:`||e.protocol===`https:`?e.toString():null}catch{return null}}var R=e((()=>{})),z,B,V,Ne=e((()=>{p(),j(),Te(),Ee(),Me(),R(),z=120,B=350,V=class{constructor(e){this.host=e,this.running=null,this.tabs=[],this.activeTargetId=null,this.view=null,this.loading=!1,this.errorText=null,this.noticeText=null,this.mode=`interact`,this.strokes=[],this.inspected=null,this.inspectPointer=null,this.evaluateUnavailable=!1,this.urlDraft=``,this.pendingNewTab=!1,this.pendingInput=new N,this.activeClient=null,this.drawingStroke=null,this.suppressStageClick=!1,this.urlDraftEditing=!1,this.operations=new M(e),e.addController(this)}hostDisconnected(){this.invalidateViewOperations(),this.setState(`loading`,!1)}setState(e,t){Object.is(this[e],t)||(Object.assign(this,{[e]:t}),this.host.requestUpdate())}synchronizeHostProperties(e){!e.has(`client`)&&!e.has(`available`)||this.host.client!==this.activeClient&&(this.activeClient=this.host.client,this.resetBrowserState(),this.host.browserPanelIsOpen()&&this.host.available&&this.host.client&&this.refreshAll())}invalidateViewOperations(){this.operations.invalidate(),this.pendingInput.clear()}resetBrowserState(){this.invalidateViewOperations(),this.setState(`running`,null),this.setState(`tabs`,[]),this.setState(`activeTargetId`,null),this.setState(`view`,null),this.setState(`loading`,!1),this.setState(`errorText`,null),this.setState(`noticeText`,null),this.setState(`mode`,`interact`),this.setState(`strokes`,[]),this.drawingStroke=null,this.setState(`inspected`,null),this.setState(`inspectPointer`,null),this.setState(`pendingNewTab`,!1),this.setState(`evaluateUnavailable`,!1)}reportError(e){let t=e instanceof Error?e.message:String(e);this.setState(`errorText`,f(`browser.errors.requestFailed`,{error:t}))}async refreshAll(){let e=this.operations.captureClient();if(!e)return;let t=this.operations.beginSnapshot(e);this.setState(`errorText`,null),this.setState(`loading`,!0);try{let n=await S(e),r=n.tabs.find(e=>e.id===this.activeTargetId)??n.tabs[0];if(!this.operations.acceptSnapshot(t,this.activeTargetId,r?.id??null)||(this.setState(`running`,n.running),this.setState(`tabs`,n.tabs),!this.operations.canCaptureSnapshot(t)))return;n.running||this.setState(`view`,null),this.activeTargetId!==null&&r?.id!==this.activeTargetId&&(this.invalidateViewOperations(),t.epoch=this.operations.epoch,this.setState(`view`,null),this.exitCaptureModes()),this.setState(`activeTargetId`,r?.id??null),this.urlDraftEditing||this.setState(`urlDraft`,r?.url??``),r?await this.refreshView(r.id,t.epoch):this.setState(`view`,null)}catch(e){t.isCurrent()&&this.reportError(e)}finally{t.isCurrent()&&this.setState(`loading`,!1)}}async refreshView(e,t=this.operations.epoch){let n=this.operations.captureClient();if(!n)return;let r=this.operations.beginCapture(n,e,()=>this.activeTargetId,t);if(r){this.setState(`loading`,!0);try{let t=await be(n,e);if(!r())return;let i=await O({basePath:this.host.basePath,authToken:this.host.authToken,path:t.path}),a=await De(i),o=await we(n,e,this.evaluateUnavailable,r,()=>this.setState(`evaluateUnavailable`,!0));if(!r())return;let s=t.url&&o?.url&&t.url!==o.url?null:o;this.setState(`view`,{targetId:e,dataUrl:i,image:a,url:t.url,metrics:s}),!this.urlDraftEditing&&t.url&&this.setState(`urlDraft`,t.url)}catch(e){r()&&this.reportError(e)}finally{r()&&(this.operations.completeCapture(),this.setState(`loading`,!1))}}}async runAction(e,t=!0){let n=this.operations.captureClient();if(!n)return!1;let r=this.operations.epoch,i=()=>this.operations.isLive(r,n);try{return this.setState(`errorText`,null),await e(n),i()&&t&&this.pendingInput.scheduleRefresh(B,()=>{i()&&this.activeTargetId&&this.refreshView(this.activeTargetId,r)}),i()}catch(e){return i()?(T(e)&&this.setState(`evaluateUnavailable`,!0),this.reportError(e),this.operations.hasPendingCapture||this.setState(`loading`,!1),!1):!1}}async startBrowserNow(){if(!this.operations.captureClient())return;let e=this.operations.epoch;this.setState(`loading`,!0),await this.runAction(async t=>{await he(t),this.operations.isLive(e,t)&&await this.refreshAll()},!1)}async openUrl(e,t){let n=this.operations.captureClient();if(!n)return;let r=this.operations.beginMutation(n);this.setState(`loading`,!0),this.setState(`errorText`,null),this.setState(`pendingNewTab`,!1);let i=!1;try{if(t.newTab||!this.activeTargetId){let t=await ge(n,e);if(!r.isCurrent()){await this.refreshTabsOnly(n,this.operations.survivingInvocation(r,n));return}let i=t?.id??this.activeTargetId;i!==this.activeTargetId&&(this.invalidateViewOperations(),r.epoch=this.operations.epoch,this.setState(`view`,null),this.exitCaptureModes()),this.setState(`activeTargetId`,i)}else{this.invalidateViewOperations(),r.epoch=this.operations.epoch,this.exitCaptureModes();let t=this.activeTargetId;if(i=this.operations.hasQueuedNavigation(n,t)||this.operations.hasUnreconciledNavigation(n,t),await this.operations.queueNavigation(n,t,async()=>{r.isCurrent()&&(await ye(n,{url:e,targetId:t}),this.operations.markNavigationCommitted(n,t))}),!r.isCurrent())return;this.setState(`view`,null)}if(await this.refreshTabsOnly(n,()=>r.isCurrent())!==`rejected`&&r.isCurrent()&&this.activeTargetId){let e=this.activeTargetId;await this.refreshView(e,r.epoch),!t.newTab&&r.isCurrent()&&this.view?.targetId===e&&this.operations.markNavigationReconciled(n,e)}}catch(e){if(r.isCurrent()&&(this.reportError(e),i&&this.activeTargetId)){let t=this.activeTargetId,i=this.errorText;try{let e=await this.refreshTabsOnly(n,()=>r.isCurrent()),a=this.tabs.find(e=>e.id===t);e===`accepted`&&r.isCurrent()&&a&&(await this.refreshView(t,r.epoch),r.isCurrent()&&this.view?.targetId===t&&this.errorText===i&&this.operations.markNavigationReconciled(n,t))}catch{}r.isCurrent()&&this.reportError(e)}}finally{r.isCurrent()&&this.setState(`loading`,!1)}}async refreshTabsOnly(e,t){let n=this.operations.beginSnapshot(e);try{let r=await S(e);return t()&&this.operations.acceptSnapshot(n,this.activeTargetId,this.activeTargetId)?(this.setState(`running`,r.running),this.setState(`tabs`,r.tabs),`accepted`):`rejected`}catch{return t()&&n.isCurrent()?`failed`:`rejected`}}async selectTab(e){if(e===this.activeTargetId)return;let t={targetId:this.activeTargetId,view:this.view};this.invalidateViewOperations();let n=this.operations.epoch;this.setState(`activeTargetId`,e),this.setState(`view`,null),this.exitCaptureModes(),!await this.runAction(async t=>{await _e(t,e),await this.refreshView(e)},!1)&&this.operations.isLive(n)&&this.activeTargetId===e&&(this.setState(`activeTargetId`,t.targetId),this.setState(`view`,t.view))}async closeTab(e){await this.runAction(async t=>{let n=this.operations.epoch;if(await ve(t,e),!this.operations.isLive(n,t)){this.operations.isLive(this.operations.epoch,t)&&await this.refreshAll();return}this.setState(`tabs`,this.tabs.filter(t=>t.id!==e));let r=await this.refreshTabsOnly(t,()=>this.operations.isLive(n,t));if(!this.operations.isLive(n,t))return;if(this.activeTargetId!==e){r!==`rejected`&&!this.operations.hasPendingCapture&&this.setState(`loading`,!1);return}let i=this.tabs[0]??null;this.invalidateViewOperations(),this.setState(`activeTargetId`,i?.id??null),this.setState(`view`,null),this.exitCaptureModes(),i?await this.refreshView(i.id):this.setState(`loading`,!1)},!1)}reloadPage(){let e=L(this.view?.metrics?.url||this.view?.url||this.urlDraft);if(this.activeTargetId){if(!e){this.refreshView(this.activeTargetId);return}this.openUrl(e,{newTab:!1})}}goHistory(e){let t=this.activeTargetId;t&&this.runAction(n=>Ce(n,{targetId:t,delta:e}))}commitUrlDraft(){let e=L(this.urlDraft);e&&this.openUrl(e,{newTab:this.pendingNewTab||this.tabs.length===0})}beginNewTab(){this.setState(`pendingNewTab`,!0),this.setState(`urlDraft`,``),this.host.updateComplete.then(()=>this.host.renderRoot.querySelector(`.bp-url`)?.focus())}setUrlDraft(e){this.setState(`urlDraft`,e)}setUrlDraftEditing(e){this.urlDraftEditing=e}resetUrlDraftFromView(){this.setState(`urlDraft`,this.view?.metrics?.url||this.view?.url||``)}exitCaptureModes(){this.operations.invalidateInspection(),this.pendingInput.clearInput(),this.setState(`mode`,`interact`),this.setState(`strokes`,[]),this.drawingStroke=null,this.setState(`inspected`,null),this.setState(`inspectPointer`,null)}setMode(e){if(this.mode===e){this.exitCaptureModes();return}this.exitCaptureModes(),this.setState(`mode`,e),this.setState(`noticeText`,null),e===`inspect`&&this.evaluateUnavailable&&(this.setState(`errorText`,f(`browser.inspectUnavailable`)),this.setState(`mode`,`interact`))}stageElement(){return this.host.renderRoot.querySelector(`.bp-stage`)}remotePoint(e){return F(this.stageElement(),e,this.view)}inspectHighlightRegion(){return ke(this.view,this.inspected)}handleStageClick(e){if(this.suppressStageClick){this.suppressStageClick=!1;return}if(this.mode!==`interact`)return;this.host.renderRoot.querySelector(`.bp-viewport`)?.focus({preventScroll:!0});let t=this.remotePoint(e),n=this.activeTargetId;!t||!n||this.runAction(e=>xe(e,{targetId:n,x:t.x,y:t.y}))}handleWheel(e){if(this.mode!==`interact`||!this.view)return;let t=this.operations.captureClient(),n=this.activeTargetId;if(!t||!n)return;e.preventDefault();let r=this.operations.epoch;this.pendingInput.queueWheel(e.deltaX,e.deltaY,150,(e,i)=>{!this.operations.isLive(r,t)||this.activeTargetId!==n||this.mode!==`interact`||this.runAction(async t=>{if(this.evaluateUnavailable){await C(t,{targetId:n,key:i>=0?`PageDown`:`PageUp`});return}await Se(t,{targetId:n,deltaX:e,deltaY:i})})})}handleViewportKeydown(e){if(this.mode!==`interact`||!this.view||e.metaKey||e.ctrlKey||e.altKey)return;let t=e.key,n=this.activeTargetId;!Oe(t)||!n||(e.preventDefault(),this.runAction(e=>C(e,{targetId:n,key:t})))}handleOverlayPointerDown(e){if(this.mode===`inspect`){this.suppressStageClick=!0,this.sendAnnotation({element:this.inspected});return}if(this.mode!==`annotate`)return;let t=P(this.stageElement(),e);t&&(e.target.setPointerCapture?.(e.pointerId),this.drawingStroke={points:[t]},this.setState(`strokes`,[...this.strokes,this.drawingStroke]),this.paintOverlay())}handleOverlayPointerMove(e){if(this.mode===`annotate`){if(!this.drawingStroke)return;let t=P(this.stageElement(),e);t&&(this.drawingStroke.points.push(t),this.paintOverlay());return}this.mode===`inspect`&&this.queueInspect(e)}handleOverlayPointerUp(){this.drawingStroke=null}queueInspect(e){let t=this.operations.captureClient(),n=this.remotePoint(e),r=P(this.stageElement(),e),i=this.activeTargetId;if(!t||!n||!r||!i||this.evaluateUnavailable)return;let a=this.operations.beginInspection(t,()=>this.activeTargetId===i&&this.view?.targetId===i&&this.mode===`inspect`);this.setState(`inspectPointer`,r),this.pendingInput.queueInspection(z,a,()=>{D(t,{targetId:i,x:n.x,y:n.y}).then(e=>{a()&&(this.setState(`inspected`,e),this.paintOverlay())}).catch(e=>{a()&&T(e)&&(this.setState(`evaluateUnavailable`,!0),this.setState(`errorText`,f(`browser.inspectUnavailable`)),this.setState(`mode`,`interact`))})})}undoStroke(){this.setState(`strokes`,this.strokes.slice(0,-1)),this.drawingStroke=null,this.paintOverlay()}clearStrokes(){this.setState(`strokes`,[]),this.drawingStroke=null,this.paintOverlay()}async sendAnnotation(e){let t=this.view,n=this.tabs.find(e=>e.id===this.activeTargetId),r=e.element??null;if(!t||this.strokes.length===0&&!r)return;let i=r?this.inspectHighlightRegion():null,a;try{a=je(t,n,this.strokes,r,i)}catch(e){this.reportError(e);return}if(!a){this.setState(`errorText`,f(`browser.noChatTarget`));return}this.setState(`noticeText`,f(`browser.annotationSent`)),this.exitCaptureModes()}paintOverlay(){Ae(this.host.renderRoot.querySelector(`.bp-overlay`),this.stageElement(),this.strokes,this.mode===`inspect`?this.inspectHighlightRegion():null)}}}));function Pe(e){if(e.title.trim())return e.title.trim();try{return new URL(e.url).host||f(`browser.untitledTab`)}catch{return e.url||f(`browser.untitledTab`)}}function Fe(e){return le({tabs:e.tabs.map(e=>{let t=Pe(e);return{id:e.id,domId:`browser-tab-${e.id}`,label:t,title:e.url,closeLabel:`${f(`browser.closeTab`)}: ${t}`}}),activeId:e.activeTargetId,ariaControls:`browser-tab-panel`,onSelect:e.onSelect,onClose:e.onClose,onNew:e.onNew,newLabel:f(`browser.newTab`)})}var Ie=e((()=>{p(),h()}));function Le(e){return Fe({tabs:e.tabs,activeTargetId:e.activeTargetId,onSelect:t=>void e.selectTab(t),onClose:t=>void e.closeTab(t),onNew:()=>e.beginNewTab()})}function Re(e,t,n,r){let i=e.view?.metrics?.url||e.view?.url||e.urlDraft;return c`
    <div class="bp-actions">
      <button
        class="bp-icon ${t===`bottom`?`is-active`:``}"
        type="button"
        title=${f(`browser.dockBottom`)}
        aria-label=${f(`browser.dockBottom`)}
        @click=${()=>n(`bottom`)}
      >
        ${U}
      </button>
      <button
        class="bp-icon ${t===`right`?`is-active`:``}"
        type="button"
        title=${f(`browser.dockRight`)}
        aria-label=${f(`browser.dockRight`)}
        @click=${()=>n(`right`)}
      >
        ${W}
      </button>
      <button
        class="bp-icon"
        type="button"
        title=${f(`browser.openExternal`)}
        aria-label=${f(`browser.openExternal`)}
        ?disabled=${!i}
        @click=${()=>{i&&_(i)}}
      >
        ${J}
      </button>
      <button
        class="bp-icon"
        type="button"
        title=${f(`browser.hide`)}
        aria-label=${f(`browser.hide`)}
        @click=${r}
      >
        ${H}
      </button>
    </div>
  `}function ze(e){let t=!!e.view;return c`
    <div class="bp-toolbar">
      <button
        class="bp-icon"
        type="button"
        title=${f(`browser.back`)}
        aria-label=${f(`browser.back`)}
        ?disabled=${!t||e.evaluateUnavailable}
        @click=${()=>e.goHistory(-1)}
      >
        ${G}
      </button>
      <button
        class="bp-icon"
        type="button"
        title=${f(`browser.forward`)}
        aria-label=${f(`browser.forward`)}
        ?disabled=${!t||e.evaluateUnavailable}
        @click=${()=>e.goHistory(1)}
      >
        ${K}
      </button>
      <button
        class="bp-icon"
        type="button"
        title=${f(`browser.reload`)}
        aria-label=${f(`browser.reload`)}
        ?disabled=${!e.activeTargetId}
        @click=${()=>e.reloadPage()}
      >
        ${q}
      </button>
      <input
        class="bp-url"
        type="text"
        spellcheck="false"
        autocomplete="off"
        placeholder=${f(`browser.urlPlaceholder`)}
        .value=${e.urlDraft}
        @focus=${t=>{e.setUrlDraftEditing(!0),t.target.select()}}
        @blur=${()=>e.setUrlDraftEditing(!1)}
        @input=${t=>e.setUrlDraft(t.target.value)}
        @keydown=${t=>{t.key===`Enter`?(t.preventDefault(),e.commitUrlDraft(),t.target.blur()):t.key===`Escape`&&(e.resetUrlDraftFromView(),t.target.blur())}}
      />
      <button
        class="bp-icon ${e.mode===`annotate`?`is-active`:``}"
        type="button"
        title=${f(`browser.annotate`)}
        aria-label=${f(`browser.annotate`)}
        ?disabled=${!t}
        @click=${()=>e.setMode(`annotate`)}
      >
        ${Y}
      </button>
      <button
        class="bp-icon ${e.mode===`inspect`?`is-active`:``}"
        type="button"
        title=${e.evaluateUnavailable?f(`browser.inspectUnavailable`):f(`browser.inspect`)}
        aria-label=${f(`browser.inspect`)}
        ?disabled=${!t||e.evaluateUnavailable}
        @click=${()=>e.setMode(`inspect`)}
      >
        ${X}
      </button>
    </div>
  `}function Be(e){return e.mode===`annotate`?c`
    <div class="bp-annotatebar">
      <span class="bp-annotatebar__hint">${f(`browser.annotateHint`)}</span>
      <button
        class="bp-btn"
        type="button"
        ?disabled=${e.strokes.length===0}
        @click=${()=>e.undoStroke()}
      >
        ${f(`browser.annotateUndo`)}
      </button>
      <button
        class="bp-btn"
        type="button"
        ?disabled=${e.strokes.length===0}
        @click=${()=>e.clearStrokes()}
      >
        ${f(`browser.annotateClear`)}
      </button>
      <button
        class="bp-btn"
        type="button"
        title=${f(`browser.annotateDone`)}
        @click=${()=>e.exitCaptureModes()}
      >
        ${H}
      </button>
      <button
        class="bp-btn bp-btn--primary"
        type="button"
        ?disabled=${e.strokes.length===0}
        @click=${()=>void e.sendAnnotation({})}
      >
        ${f(`browser.annotateSend`)}
      </button>
    </div>
  `:a}function Ve(e){let t=e.inspected,n=e.inspectPointer;if(e.mode!==`inspect`||!t||!n)return a;let r=`${Math.min(92,Math.max(0,n.x*100))}%`,i=`${Math.min(92,Math.max(0,n.y*100+2))}%`,o=t.classes.map(e=>`.${e}`).join(``);return c`
    <div class="bp-tooltip" style="left:${r};top:${i}">
      <div class="bp-tooltip__title">
        <span class="bp-tooltip__selector"
          >${t.tag}${t.id?`#${t.id}`:``}${o}</span
        >
        <span class="bp-tooltip__size"
          >${Math.round(t.rect.width)} × ${Math.round(t.rect.height)}</span
        >
      </div>
      ${t.name?c`<div class="bp-tooltip__row">
            <span>${f(`browser.inspectName`)}</span><span>${t.name}</span>
          </div>`:a}
      ${t.role?c`<div class="bp-tooltip__row">
            <span>${f(`browser.inspectRole`)}</span><span>${t.role}</span>
          </div>`:a}
      <div class="bp-tooltip__row">
        <span>${f(`browser.inspectFocusable`)}</span><span>${t.focusable?`✓`:`–`}</span>
      </div>
    </div>
  `}function He(e){if(e.running===!1)return c`
      <div class="bp-status">
        <span>${f(`browser.notRunning`)}</span>
        <button
          class="bp-btn bp-btn--primary"
          type="button"
          @click=${()=>void e.startBrowserNow()}
        >
          ${f(`browser.start`)}
        </button>
      </div>
    `;if(!e.view)return c`
      <div class="bp-status">
        <span>${e.loading?f(`browser.loading`):f(`browser.empty`)}</span>
      </div>
    `;let t=e.mode===`annotate`?`bp-overlay--annotate`:e.mode===`inspect`?`bp-overlay--inspect`:``;return c`
    <div class="bp-stage">
      <img
        class="bp-shot"
        src=${e.view.dataUrl}
        alt=${e.view.metrics?.title||``}
      />
      <canvas
        class="bp-overlay ${t}"
        @click=${t=>e.handleStageClick(t)}
        @pointerdown=${t=>e.handleOverlayPointerDown(t)}
        @pointermove=${t=>e.handleOverlayPointerMove(t)}
        @pointerup=${()=>e.handleOverlayPointerUp()}
        @pointercancel=${()=>e.handleOverlayPointerUp()}
      ></canvas>
      ${Ve(e)}
    </div>
  `}function Ue(e){return c`
    <wa-tab-panel
      id="browser-tab-panel"
      class="bp-viewport"
      name=${e.activeTargetId??`browser`}
      active
      aria-labelledby=${e.activeTargetId?`browser-tab-${e.activeTargetId}`:a}
      tabindex="0"
      @wheel=${t=>e.handleWheel(t)}
      @keydown=${t=>e.handleViewportKeydown(t)}
    >
      ${e.loading&&e.view?c`<span class="bp-loading">${f(`browser.loading`)}</span>`:a}
      ${He(e)}
    </wa-tab-panel>
  `}function We(e,t,n,r,i,o,s){return c`
    <section class="bp bp--${t}" style=${t===`bottom`?`height:${n}px`:`width:${r}px`} aria-label=${f(`browser.title`)}>
      ${s}
      <header class="bp-header">
        ${Le(e)}
        ${Re(e,t,i,o)}
      </header>
      ${ze(e)} ${Be(e)}
      ${e.errorText?c`<div class="bp-note bp-note--error" role="alert">${e.errorText}</div>`:e.noticeText?c`<div class="bp-note" role="status">${e.noticeText}</div>`:a}
      ${Ue(e)}
    </section>
  `}var H,U,W,G,K,q,J,Y,X,Ge=e((()=>{s(),p(),me(),Ie(),H=l`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>`,U=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M2 10h12" /></svg>`,W=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M10 2.5v11" /></svg>`,G=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3L5 8l5 5" /></svg>`,K=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l5 5-5 5" /></svg>`,q=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M13 8a5 5 0 1 1-1.5-3.6M13 2.5V5h-2.5" /></svg>`,J=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3.5H3.5v9h9V9.5M9.5 3h3.5v3.5M12.8 3.2L7.5 8.5" /></svg>`,Y=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11.3 2.7l2 2L5 13H3v-2z" /></svg>`,X=l`<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l5.5 10 1.2-4.3L14 7.5z" /></svg>`})),Z,Ke=e((()=>{s(),Z=ee`
  /* Docked panels get a single hairline separator on the inner edge so they
     read as layout, not as a floating card. The browser dock yields to the
     terminal dock's reserved edges so the two panels tile instead of
     overlapping when both are open. */
  .bp--bottom {
    left: var(--shell-nav-width, 0);
    right: var(--oc-terminal-reserve-right, 0px);
    bottom: var(--oc-terminal-reserve-bottom, 0px);
  }
  .bp--right {
    top: var(--shell-topbar-height, 0);
    right: var(--oc-terminal-reserve-right, 0px);
    bottom: var(--oc-terminal-reserve-bottom, 0px);
  }
  .bp-icon.is-active {
    color: var(--accent, #ff5c5c);
    background: color-mix(in srgb, var(--accent, #ff5c5c) 14%, transparent);
  }
  .bp-icon:disabled {
    opacity: 0.4;
  }
  .bp-actions {
    flex: none;
  }
  .bp-toolbar {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 8px;
    border-bottom: 1px solid var(--border, #262b34);
  }
  .bp-url {
    flex: 1;
    min-width: 0;
    height: 28px;
    padding: 0 12px;
    border: 1px solid transparent;
    border-radius: 14px;
    background: color-mix(in srgb, var(--text, #d7dae0) 8%, transparent);
    color: var(--text, #d7dae0);
    font-size: 12.5px;
    font-family: inherit;
    outline: none;
    text-overflow: ellipsis;
  }
  .bp-url:focus {
    border-color: var(--accent, #ff5c5c);
    background: var(--bg, #0e1015);
  }
  .bp-annotatebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px;
    font-size: 12px;
    color: var(--muted, #8a919e);
    border-bottom: 1px solid var(--border, #262b34);
    background: color-mix(in srgb, var(--accent, #ff5c5c) 7%, transparent);
  }
  .bp-annotatebar__hint {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bp-btn {
    border: 1px solid var(--border, #262b34);
    background: transparent;
    color: var(--text, #d7dae0);
    font-size: 12px;
    font-family: inherit;
    border-radius: 6px;
    padding: 3px 10px;
  }
  .bp-btn:hover {
    background: color-mix(in srgb, var(--text, #d7dae0) 10%, transparent);
  }
  .bp-btn--primary {
    border-color: var(--accent, #ff5c5c);
    color: var(--accent, #ff5c5c);
  }
  .bp-viewport {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: auto;
    background: var(--bg, #0e1015);
    outline: none;
  }
  .bp-stage {
    position: relative;
    width: 100%;
  }
  .bp-shot {
    display: block;
    width: 100%;
    height: auto;
    user-select: none;
    -webkit-user-drag: none;
  }
  .bp-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    touch-action: none;
  }
  .bp-overlay--annotate {
    cursor: crosshair;
  }
  .bp-overlay--inspect {
    cursor: default;
  }
  .bp-tooltip {
    position: absolute;
    z-index: 3;
    max-width: 320px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--border, #262b34);
    background: var(--bg, #0e1015);
    box-shadow: var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.3));
    font-size: 12px;
    pointer-events: none;
  }
  .bp-tooltip__title {
    display: flex;
    align-items: baseline;
    gap: 8px;
    justify-content: space-between;
  }
  .bp-tooltip__selector {
    color: var(--accent, #6ea8fe);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    word-break: break-all;
  }
  .bp-tooltip__size {
    color: var(--muted, #8a919e);
    white-space: nowrap;
  }
  .bp-tooltip__row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 4px;
    color: var(--muted, #8a919e);
  }
  .bp-tooltip__row span:last-child {
    color: var(--text, #d7dae0);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bp-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 100%;
    padding: 20px;
    font-size: 12.5px;
    color: var(--muted, #8a919e);
    text-align: center;
  }
  .bp-note {
    padding: 6px 12px;
    font-size: 12px;
    color: var(--muted, #8a919e);
    border-bottom: 1px solid var(--border, #262b34);
  }
  .bp-note--error {
    color: var(--danger, #ff6b6b);
  }
  .bp-loading {
    position: absolute;
    top: 8px;
    right: 12px;
    z-index: 3;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
    color: var(--muted, #8a919e);
    background: color-mix(in srgb, var(--bg, #0e1015) 80%, transparent);
    border: 1px solid var(--border, #262b34);
  }
`})),Q,$;e((()=>{s(),o(),p(),i(),ie(),oe(),h(),ne(),Ne(),Ge(),Ke(),R(),t(),Q=se({storageKey:`openclaw.browser.panel.v1`,minHeight:240,minWidth:380,defaultDock:`right`,supportedDocks:[`bottom`,`right`],defaultHeight:420,defaultWidth:560}),$=class extends r{constructor(...e){super(...e),this.client=null,this.available=!1,this.suppressed=!1,this.basePath=``,this.authToken=null,this.browserPanelController=new V(this),this.dockLayout=new ae(this,{layout:Q,reservationPrefix:`browser`,isAvailable:()=>this.available}),this.onToggleRequest=e=>this.handleToggleRequest(e)}static{this.styles=[ce,re,Z]}connectedCallback(){super.connectedCallback(),window.addEventListener(m,this.onToggleRequest),this.dockLayout.setSuppressed(this.suppressed),this.dockLayout.open&&this.browserPanelController.refreshAll()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(m,this.onToggleRequest)}updated(e){e.has(`suppressed`)&&this.dockLayout.setSuppressed(this.suppressed)&&this.browserPanelController.refreshAll(),this.browserPanelController.synchronizeHostProperties(e),(e.has(`client`)||e.has(`available`))&&(!this.available&&this.dockLayout.open?(this.dockLayout.hideWithoutPersisting(),this.browserPanelController.resetBrowserState()):this.available&&this.dockLayout.restoreOpenState()&&this.browserPanelController.refreshAll()),this.dockLayout.syncReservation(),this.browserPanelController.paintOverlay()}browserPanelIsOpen(){return this.dockLayout.open}toggle(){this.available&&(this.dockLayout.open?this.closePanel():(this.dockLayout.setOpen(!0),this.browserPanelController.refreshAll()))}handleToggleRequest(e){let t=e instanceof CustomEvent&&typeof e.detail==`object`&&e.detail!==null?e.detail:null;if((t?.dock===`right`||t?.dock===`bottom`)&&this.dockLayout.setDock(t.dock,!1),t?.open===!1){this.closePanel();return}let n=typeof t?.url==`string`?L(t.url):null;if(n||t?.open===!0){if(!this.available)return;let e=this.dockLayout.open;this.dockLayout.setOpen(!0),n?this.browserPanelController.openUrl(n,{newTab:!0}):e||this.browserPanelController.refreshAll();return}this.toggle()}closePanel(){this.dockLayout.setOpen(!1)}setDock(e){this.dockLayout.setDock(e)}render(){return!this.available||!this.dockLayout.open?a:We(this.browserPanelController,this.dockLayout.dock,this.dockLayout.height,this.dockLayout.width,e=>this.setDock(e),()=>this.closePanel(),this.dockLayout.renderResizer(`bp`,f(`browser.resize`)))}},n([u({attribute:!1})],$.prototype,`client`,void 0),n([u({type:Boolean})],$.prototype,`available`,void 0),n([u({type:Boolean})],$.prototype,`suppressed`,void 0),n([u({attribute:!1})],$.prototype,`basePath`,void 0),n([u({attribute:!1})],$.prototype,`authToken`,void 0),customElements.get(`openclaw-browser-panel`)||customElements.define(`openclaw-browser-panel`,$)}))();
//# sourceMappingURL=browser-panel-DI_HyoeY.js.map