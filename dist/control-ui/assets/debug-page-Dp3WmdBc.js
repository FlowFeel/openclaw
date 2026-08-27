import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Kc as i,Vc as a,Wc as o,er as s,rr as c}from"./control-ui-core-ChU36mQ7.js";import{K as l,Q as u,W as d,Y as f,g as p,m,nt as h}from"./lit-runtime-D5xZwgO1.js";import{f as g,g as _,i as v,m as y,p as b,r as x}from"./control-ui-foundation-Dgui328h.js";import{Wt as S,_ as C,jt as w,v as T}from"./control-ui-core-CmlLmVZa.js";import{o as E,t as D}from"./control-ui-core-M4uhXYSJ.js";import{n as O,t as k}from"./poll-controller-BnQs2EZr.js";import{i as A,r as j}from"./markdown-code-blocks-CBBTJV23.js";import{n as M,t as N}from"./settings-workspace-BbyrBOFl.js";import{c as P,f as F,i as I,s as L,t as R,u as z}from"./settings-ui-Bq4yxauk.js";import{i as B,s as V}from"./presenter-BQdqRY27.js";async function H(e,t){let[n,r,i,a]=await Promise.all([e.request(`status`,{},{signal:t}),e.request(`health`,{},{signal:t}),e.request(`models.list`,{},{signal:t}),e.request(`last-heartbeat`,{},{signal:t})]),o=i;return{status:n,health:r,models:Array.isArray(o?.models)?o.models:[],heartbeat:a}}var U=e((()=>{}));function W(e,t){return P({title:e,stacked:!0,control:f`<pre class="code-block">
${p(j(JSON.stringify(t??{},null,2)))}</pre>`})}function G(e){let t=(e.status&&typeof e.status==`object`?e.status.securityAudit:null)?.summary??null;if(!t)return l;let n=t.critical??0,r=t.warn??0,i=t.info??0,a=n>0?`danger`:r>0?`warn`:`ok`,o=n>0?E(`debug.security.critical`,{count:String(n)}):r>0?E(`debug.security.warnings`,{count:String(r)}):E(`debug.security.noCriticalIssues`),s=i>0?` · ${E(`debug.security.info`,{count:String(i)})}`:``;return P({title:E(`debug.security.audit`),description:f`
      ${E(`debug.security.runPrefix`)}
      <span class="mono">openclaw security audit --deep</span>
      ${E(`debug.security.runSuffix`)}
    `,control:F({kind:a,label:`${o}${s}`})})}function K(e){return P({title:e.event,description:s(e.ts,void 0,``),stacked:!0,control:f`<pre class="code-block">
${p(j(B(e.payload)))}</pre>`})}function q(e){return L(f`${z({title:E(`debug.snapshotsTitle`),description:E(`debug.snapshotsSubtitle`),actions:f`
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?E(`common.refreshing`):E(`common.refresh`)}
        </button>
      `},f`
      ${G(e)} ${W(E(`debug.status`),e.status)}
      ${W(E(`debug.health`),e.health)}
      ${W(E(`debug.lastHeartbeat`),e.heartbeat)}
    `)} ${z({title:E(`debug.manualRpcTitle`),description:E(`debug.manualRpcSubtitle`)},f`
      ${P({title:E(`debug.method`),control:f`
          <select
            class="settings-select"
            aria-label=${E(`debug.method`)}
            .value=${e.callMethod}
            @change=${t=>e.onCallMethodChange(t.target.value)}
          >
            ${e.callMethod?l:f` <option value="" disabled>${E(`debug.selectMethod`)}</option> `}
            ${e.methods.map(e=>f`<option value=${e}>${e}</option>`)}
          </select>
        `})}
      ${P({title:E(`debug.paramsJson`),stacked:!0,control:f`
          <textarea
            class="settings-input"
            aria-label=${E(`debug.paramsJson`)}
            .value=${e.callParams}
            @input=${t=>e.onCallParamsChange(t.target.value)}
            rows="6"
          ></textarea>
        `})}
      ${P({title:E(`common.call`),control:f`
          <button class="btn primary" @click=${e.onCall}>${E(`common.call`)}</button>
        `})}
      ${e.callError?f`
            <div class="settings-row settings-row--stacked">
              ${F({kind:`danger`,label:E(`debug.callFailed`)})}
              <pre class="code-block">${e.callError}</pre>
            </div>
          `:l}
      ${e.callResult?f`
            <div class="settings-row settings-row--stacked">
              ${F({kind:`ok`,label:E(`common.ok`)})}
              <pre class="code-block">${p(j(e.callResult))}</pre>
            </div>
          `:l}
    `)} ${z({title:E(`debug.modelsTitle`),description:E(`debug.modelsSubtitle`)},f`
      <div class="settings-row settings-row--stacked">
        <pre class="code-block">
${p(j(JSON.stringify(e.models??[],null,2)))}</pre>
      </div>
    `)} ${z({title:E(`debug.eventLogTitle`),description:E(`debug.eventLogSubtitle`)},e.eventLog.length===0?I(E(`debug.noEvents`)):e.eventLog.map(e=>K(e)))}`,{wide:!0})}var J=e((()=>{d(),m(),A(),R(),D(),c(),V()})),Y,X;e((()=>{x(),g(),d(),u(),w(),T(),N(),U(),i(),O(),a(),J(),t(),Y=3e3,X=class extends o{constructor(...e){super(...e),this.client=null,this.connected=!1,this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallMethod=``,this.debugCallParams=`{}`,this.debugCallResult=null,this.debugCallError=null,this.eventLog=[],this.polling=new k(this,Y,()=>{this.loadDiagnostics()},!1),this.hasBoundGatewaySource=!1,this.gatewaySource=null,this.callEpoch=0,this.diagnosticsTaskActiveClient=null,this.diagnosticsTask=new b(this,{autoRun:!1,args:()=>[this.connected?this.client:null],task:([e],{signal:t})=>e?H(e,t):y,onComplete:e=>{this.diagnosticsTaskActiveClient=null,this.debugStatus=e.status,this.debugHealth=e.health,this.debugModels=e.models,this.debugHeartbeat=e.heartbeat},onError:e=>{this.diagnosticsTaskActiveClient=null,this.debugCallError=String(e)}}),this.subscriptions=new r(this).effect(()=>this.context?.gateway,e=>{let t=this.hasBoundGatewaySource;this.hasBoundGatewaySource=!0,this.gatewaySource=e;let n=e.subscribe(t=>{this.gatewaySource===e&&this.context.gateway===e&&this.applyGatewaySnapshot(t)});return this.applyGatewaySnapshot(e.snapshot,t),n}).watch(()=>this.context?.gateway,(e,t)=>e.subscribeEventLog(t),e=>{this.eventLog=e.eventLog})}disconnectedCallback(){this.subscriptions.clear(),this.diagnosticsTask.run([null]),this.diagnosticsTaskActiveClient=null,this.callEpoch+=1,this.gatewaySource=null,super.disconnectedCallback()}applyGatewaySnapshot(e,t=!1){let n=e.phase===`connected`!==this.connected,r=t||e.client!==this.client;(r||n)&&(this.diagnosticsTask.run([null]),this.diagnosticsTaskActiveClient=null,this.callEpoch+=1),this.client=e.client,this.connected=e.phase===`connected`,r&&this.resetServerState(),this.syncPolling(),this.ensureInitialDebug()}resetServerState(){this.debugStatus=null,this.debugHealth=null,this.debugModels=[],this.debugHeartbeat=null,this.debugCallResult=null,this.debugCallError=null}syncPolling(){if(!this.connected||!this.client){this.polling.stop();return}this.polling.start()}ensureInitialDebug(){!this.connected||!this.client||this.debugStatus||this.diagnosticsTaskActiveClient||this.loadDiagnostics()}loadDiagnostics(){let e=this.connected?this.client:null;return!e||this.diagnosticsTaskActiveClient?Promise.resolve():(this.diagnosticsTaskActiveClient=e,this.diagnosticsTask.run([e]))}async callDebugMethod(){let e=this.connected?this.client:null;if(!e)return;this.debugCallError=null,this.debugCallResult=null;let t=this.gatewaySource,n=this.callEpoch,r=()=>this.connected&&this.client===e&&this.gatewaySource===t&&this.context.gateway===t&&this.callEpoch===n;try{let t=this.debugCallParams.trim()?JSON.parse(this.debugCallParams):{},n=await e.request(this.debugCallMethod.trim(),t);r()&&(this.debugCallResult=JSON.stringify(n,null,2))}catch(e){r()&&(this.debugCallError=String(e))}}render(){let e=q({loading:this.diagnosticsTask.status===_.PENDING,status:this.debugStatus,health:this.debugHealth,models:this.debugModels,heartbeat:this.debugHeartbeat,eventLog:this.eventLog,methods:(this.context.gateway.snapshot.hello?.features?.methods??[]).toSorted(),callMethod:this.debugCallMethod,callParams:this.debugCallParams,callResult:this.debugCallResult,callError:this.debugCallError,onCallMethodChange:e=>this.debugCallMethod=e,onCallParamsChange:e=>this.debugCallParams=e,onRefresh:()=>void this.loadDiagnostics(),onCall:()=>void this.callDebugMethod()});return f`
      <section class="content-header">
        <div>
          <div class="page-title">${S(`debug`)}</div>
        </div>
      </section>
      ${M(e)}
    `}},n([v({context:C,subscribe:!0})],X.prototype,`context`,void 0),n([h()],X.prototype,`client`,void 0),n([h()],X.prototype,`connected`,void 0),n([h()],X.prototype,`debugStatus`,void 0),n([h()],X.prototype,`debugHealth`,void 0),n([h()],X.prototype,`debugModels`,void 0),n([h()],X.prototype,`debugHeartbeat`,void 0),n([h()],X.prototype,`debugCallMethod`,void 0),n([h()],X.prototype,`debugCallParams`,void 0),n([h()],X.prototype,`debugCallResult`,void 0),n([h()],X.prototype,`debugCallError`,void 0),n([h()],X.prototype,`eventLog`,void 0),customElements.get(`openclaw-debug-page`)||customElements.define(`openclaw-debug-page`,X)}))();
//# sourceMappingURL=debug-page-Dp3WmdBc.js.map