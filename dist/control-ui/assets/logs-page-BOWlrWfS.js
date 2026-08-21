import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Ar as r,Bc as i,Hc as a,Kc as o,Or as s,Vc as c,Wc as l,er as u,kr as ee,rr as te}from"./control-ui-core-UWR2ANgr.js";import{K as ne,Q as d,W as f,Y as p,nt as m}from"./lit-runtime-D5xZwgO1.js";import{f as h,g,i as _,m as re,p as ie,r as ae}from"./control-ui-foundation-Dgui328h.js";import{Wt as oe,_ as se,jt as ce,v as le}from"./control-ui-core-DDTXn_ud.js";import{$t as ue,At as de,en as v,jt as y,tn as fe}from"./control-ui-foundation-DkfOBVsU.js";import{o as b,t as pe}from"./control-ui-core-BCL4Sy8S.js";import{n as me,t as he}from"./poll-controller-BnQs2EZr.js";import{a as x,i as S,n as C,o as w,r as T,t as E}from"./panel-refresh-status-DRC2iH8T.js";import{n as D,t as O}from"./settings-workspace-BbyrBOFl.js";import{c as k,f as A,i as j,p as M,t as N}from"./settings-ui-Ci_wwIOc.js";import{n as P,t as F}from"./stream-auto-follow-controller-DZ9E9o4h.js";var I=e((()=>{}));function L(e,t){return U.lastIndex=t,U.exec(e)?.[0]}function R(e,t){let n=e.charCodeAt(t);return n===155?1:n===27&&e.charCodeAt(t+1)===91?2:0}function ge(e,t){let n=R(e,t);if(n===0)return;let r=t+n,i=[],a=!1;for(;r<e.length;){let t=e.charCodeAt(r);if(t===24||t===26){r+=1,a=!0;break}if(t===27||t===155){a=!0;break}if(t<=31||t===127){i.push(e.charAt(r)),r+=1;continue}if(t>=32&&t<=63){r+=1;continue}t>=64&&t<=126&&(r+=1),a=!0;break}return{controls:i,ended:a,value:e.slice(t,r)}}var z,B,V,H,U,_e=e((()=>{z=`(?:\\x1b\\]|\\x9d)`,B=`(?:\\x1b\\\\|\\x07|\\x9c)`,V=`${z}[^\\x07\\x1b\\x9c]*${B}`,H=`[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]`,U=new RegExp(V,`y`)}));function ve(e){return e.includes(`\x1B`)||e.includes(``)||e.includes(``)}function ye(e,t){let n=[],r=0,i=0;for(;i<e.length;){let a=e.charCodeAt(i);if(a!==27&&a!==155&&a!==157){i+=1;continue}let o=L(e,i);if(o){n.push(e.slice(r,i)),i+=o.length,r=i;continue}let s=ge(e,i);if(!s){K.lastIndex=i;let a=t.compatibilityGrammar?K.exec(e):null;if(a){n.push(e.slice(r,i)),i+=a[0].length,r=i;continue}i+=1;continue}K.lastIndex=i;let c=t.compatibilityGrammar?K.exec(e):null;if(!s.ended&&t.preserveIncompleteCsi)break;let l=i+s.value.length,u=s.value.length;s.controls.length===0&&c&&c[0].length>u&&(l=i+c[0].length),n.push(e.slice(r,i),...s.controls),i=l,r=l}return n.push(e.slice(r)),n.join(``)}function W(e){return ve(e)?ye(e,{compatibilityGrammar:!1}):e}var G,K,be=e((()=>{_e(),G=`${z}[\\s\\S]*?${B}`,K=RegExp(`${G}|${H}`,`y`),typeof Intl<`u`&&`Segmenter`in Intl&&new Intl.Segmenter(void 0,{granularity:`grapheme`})}));function xe(e){let t=[];for(let n of Object.keys(e)){if(!/^\d+$/.test(n))continue;let r=e[n];typeof r==`string`?t.push(r):r!=null&&t.push(JSON.stringify(r))}return t.join(` `)}function q(e){if(typeof e!=`string`)return{};try{let t=JSON.parse(e);return{subsystem:typeof t.subsystem==`string`?t.subsystem:void 0,module:typeof t.module==`string`?t.module:void 0}}catch{return{}}}function Se(e,t){let n=q(t?.name);return n.subsystem||n.module?n:q(e[0])}function Ce(e){try{let t=JSON.parse(e);if(!y(t))return null;let n=y(t._meta)?t._meta:void 0,r=Se(t,n),i=typeof n?.logLevelName==`string`?n.logLevelName:void 0;return{time:typeof t.time==`string`?t.time:typeof n?.date==`string`?n.date:void 0,level:fe(i),subsystem:r.subsystem,module:r.module,message:typeof t.message==`string`?t.message:xe(t),raw:e}}catch{return null}}var we=e((()=>{de(),ue()}));function Te(e){if(typeof e!=`string`)return null;let t=v(e);return X.has(t)?t:null}function J(e){let t=Ce(e);if(!t)return{raw:e,message:W(e)};let n=t.subsystem??t.module;return{raw:t.raw,time:t.time??null,level:Te(t.level),subsystem:n?W(n):null,message:W(t.message)}}var Y,X,Ee=e((()=>{be(),we(),a(),Y={trace:!0,debug:!0,info:!0,warn:!0,error:!0,fatal:!0},X=new Set([`trace`,`debug`,`info`,`warn`,`error`,`fatal`])}));function De(e){if(!e)return``;let t=new Date(e);return Number.isNaN(t.getTime())?e:u(t.getTime(),void 0,e)}function Oe(e,t){return!t||v([e.message,e.subsystem,e.raw].filter(Boolean).join(` `)).includes(t)}function ke(e){let t=v(e.filterText),n=Z.some(t=>!e.levelFilters[t]),r=e.entries.filter(n=>n.level&&!e.levelFilters[n.level]?!1:Oe(n,t)),i=t||n?`filtered`:`visible`,a=b(`gatewayLogs.exportLabels.${i}`);return p`
    <div class="settings-section__header">
      <h2 class="settings-section__heading">${b(`gatewayLogs.title`)}</h2>
      <div class="settings-section__actions">
        <button class="btn" ?disabled=${e.loading} @click=${e.onRefresh}>
          ${e.loading?b(`common.loading`):b(`common.refresh`)}
        </button>
        <button
          class="btn"
          ?disabled=${r.length===0}
          @click=${()=>e.onExport(r.map(e=>e.raw),i)}
        >
          ${b(`gatewayLogs.exportButton`,{label:a})}
        </button>
      </div>
    </div>
    <p class="settings-section__desc">${b(`gatewayLogs.subtitle`)}</p>
    ${w({status:e.status,onRetry:e.onRefresh,className:`logs-refresh-status`})}
    <div class="settings-group logs-card">
      ${k({title:b(`gatewayLogs.filter`),description:e.file?b(`gatewayLogs.file`,{file:e.file}):void 0,control:p`
          <input
            class="settings-input"
            aria-label=${b(`gatewayLogs.filter`)}
            .value=${e.filterText}
            @input=${t=>e.onFilterTextChange(t.target.value)}
            placeholder=${b(`gatewayLogs.searchPlaceholder`)}
          />
        `})}
      <div class="settings-row">
        <div class="chip-row">
          ${Z.map(t=>p`
              <label class="chip log-chip ${t}">
                <input
                  type="checkbox"
                  .checked=${e.levelFilters[t]}
                  @change=${n=>e.onLevelToggle(t,n.target.checked)}
                />
                <span>${t}</span>
              </label>
            `)}
        </div>
        <div class="settings-row__control">
          ${M({checked:e.autoFollow,ariaLabel:b(`gatewayLogs.autoFollow`),onChange:t=>e.onToggleAutoFollow(t)})}
          <span class="settings-row__value">${b(`gatewayLogs.autoFollow`)}</span>
        </div>
      </div>
      ${e.truncated?p`
            <div class="settings-row">
              ${A({kind:`warn`,label:b(`gatewayLogs.truncated`)})}
            </div>
          `:ne}
      <div class="log-stream" @scroll=${e.onScroll}>
        ${r.length===0?j(b(`gatewayLogs.empty`)):r.map(e=>p`
                <div class="log-row">
                  <div class="log-time mono">${De(e.time)}</div>
                  <div class="log-level ${e.level??``}">${e.level??``}</div>
                  <div class="log-subsystem mono">${e.subsystem??``}</div>
                  <div class="log-message mono">${e.message??e.raw}</div>
                </div>
              `)}
      </div>
    </div>
  `}var Z,Ae=e((()=>{f(),x(),N(),pe(),te(),a(),Z=[`trace`,`debug`,`info`,`warn`,`error`,`fatal`]})),Q,$;e((()=>{I(),ae(),h(),f(),d(),ce(),le(),x(),O(),ee(),o(),me(),P(),c(),Ee(),Ae(),t(),Q=2e3,$=class extends l{constructor(...e){super(...e),this.client=null,this.connected=!1,this.logsStatus=T(),this.logsFile=null,this.logsEntries=[],this.logsFilterText=``,this.logsLevelFilters={...Y},this.logsAutoFollow=!0,this.logsTruncated=!1,this.logsCursor=null,this.logsLimit=500,this.logsMaxBytes=25e4,this.polling=new he(this,Q,()=>{this.loadLogs({quiet:!0})},!1),this.contentScrollFrame=null,this.hasBoundGatewaySource=!1,this.gatewaySource=null,this.logsTaskQuiet=!1,this.logsTask=new ie(this,{autoRun:!1,args:()=>this.logsTaskArgs(),task:async([e,t,n,r,i],{signal:a})=>{if(!e||!t)return re;try{return{ok:!0,payload:await t.request(`logs.tail`,{cursor:r?void 0:n??void 0,limit:this.logsLimit,maxBytes:this.logsMaxBytes},{signal:a}),cursor:n,reset:r,quiet:i}}catch(e){return{ok:!1,error:e,quiet:i}}},onComplete:e=>{if(!e.ok){r(e.error)?(this.logsEntries=[],this.logsStatus=S(T(),s(`logs`))):this.logsStatus=S(this.logsStatus,String(e.error));return}let t=(Array.isArray(e.payload.lines)?e.payload.lines.filter(e=>typeof e==`string`):[]).map(J),n=e.reset||e.payload.reset||e.cursor==null;this.logsEntries=n?t:[...this.logsEntries,...t].slice(-2e3),this.logsCursor=typeof e.payload.cursor==`number`?e.payload.cursor:this.logsCursor,this.logsFile=typeof e.payload.file==`string`?e.payload.file:this.logsFile,this.logsTruncated=!!e.payload.truncated,this.logsStatus=C()}}),this.subscriptions=new i(this).effect(()=>this.context?.gateway,e=>{let t=this.hasBoundGatewaySource;this.hasBoundGatewaySource=!0,this.gatewaySource=e;let n=e.subscribe(t=>{this.gatewaySource===e&&this.context.gateway===e&&this.applyGatewaySnapshot(t)});return this.applyGatewaySnapshot(e.snapshot,t),this.streamFollow.atBottom=!0,n}),this.streamFollow=new F(this,{selector:`.log-stream`,isEnabled:()=>this.logsAutoFollow,captureCurrent:()=>{let e=this.gatewaySource,t=this.client;return()=>this.isConnected&&this.connected&&e!==null&&this.gatewaySource===e&&this.context.gateway===e&&this.client===t}})}logsTaskArgs(e){return[this.connected?this.gatewaySource:null,this.connected?this.client:null,e?.reset?null:this.logsCursor,e?.reset===!0,e?.quiet===!0]}firstUpdated(){this.resetContentScroll(),this.contentScrollFrame=requestAnimationFrame(()=>{this.contentScrollFrame=null,this.resetContentScroll()})}updated(e){let t=this.logsAutoFollow&&e.has(`logsAutoFollow`);(t||this.logsAutoFollow&&this.streamFollow.atBottom&&e.has(`logsEntries`))&&this.streamFollow.schedule(t)}disconnectedCallback(){this.subscriptions.clear(),this.logsTaskQuiet=!1,this.logsTask.run([null,null,null,!1,!1]),this.gatewaySource=null,this.contentScrollFrame!==null&&(cancelAnimationFrame(this.contentScrollFrame),this.contentScrollFrame=null),super.disconnectedCallback()}resetContentScroll(){let e=this.closest(`.content`);e&&(e.scrollTop=0,e.scrollLeft=0)}applyGatewaySnapshot(e,t=!1){let n=e.phase===`connected`!==this.connected,r=t||e.client!==this.client;(r||n)&&(this.logsTaskQuiet=!1,this.logsTask.run([null,null,null,!1,!1])),this.client=e.client,this.connected=e.phase===`connected`,r&&this.resetServerState(),this.syncPolling(),this.ensureInitialLogs()}resetServerState(){this.logsStatus=T(),this.logsFile=null,this.logsEntries=[],this.logsTruncated=!1,this.logsCursor=null,this.streamFollow.atBottom=!0}syncPolling(){if(!this.connected||!this.client){this.polling.stop();return}this.polling.start()}ensureInitialLogs(){!this.connected||!this.client||this.logsEntries.length>0||this.loadLogs({reset:!0}).then(e=>{e&&this.streamFollow.schedule(!0)})}async loadLogs(e){let t=e?.quiet===!0;return!this.gatewaySource||!this.client||!this.connected||this.context.gateway!==this.gatewaySource||this.logsTask.status===g.PENDING&&e?.reset!==!0?!1:(this.logsTaskQuiet=t,this.logsStatus=E(this.logsStatus,{clearError:!t}),await this.logsTask.run(this.logsTaskArgs(e)),this.logsTask.status===g.COMPLETE)}exportLogs(e,t){if(e.length===0)return;let n=new Blob([`${e.join(`
`)}\n`],{type:`text/plain`}),r=URL.createObjectURL(n),i=document.createElement(`a`),a=new Date().toISOString().slice(0,19).replace(/[:T]/g,`-`);i.href=r,i.download=`openclaw-logs-${t}-${a}.log`,i.click(),URL.revokeObjectURL(r)}render(){let e=ke({loading:this.logsTask.status===g.PENDING&&!this.logsTaskQuiet,status:this.logsStatus,file:this.logsFile,entries:this.logsEntries,filterText:this.logsFilterText,levelFilters:this.logsLevelFilters,autoFollow:this.logsAutoFollow,truncated:this.logsTruncated,onFilterTextChange:e=>this.logsFilterText=e,onLevelToggle:(e,t)=>{this.logsLevelFilters={...this.logsLevelFilters,[e]:t}},onToggleAutoFollow:e=>this.logsAutoFollow=e,onRefresh:()=>void this.loadLogs({reset:!0}).then(e=>{e&&this.streamFollow.schedule(!0)}),onExport:(e,t)=>this.exportLogs(e,t),onScroll:e=>this.streamFollow.handleScroll(e)});return p`
      <section class="content-header">
        <div>
          <div class="page-title">${oe(`logs`)}</div>
        </div>
      </section>
      ${D(e,{fillHeight:!0})}
    `}},n([_({context:se,subscribe:!0})],$.prototype,`context`,void 0),n([m()],$.prototype,`client`,void 0),n([m()],$.prototype,`connected`,void 0),n([m()],$.prototype,`logsStatus`,void 0),n([m()],$.prototype,`logsFile`,void 0),n([m()],$.prototype,`logsEntries`,void 0),n([m()],$.prototype,`logsFilterText`,void 0),n([m()],$.prototype,`logsLevelFilters`,void 0),n([m()],$.prototype,`logsAutoFollow`,void 0),n([m()],$.prototype,`logsTruncated`,void 0),customElements.get(`openclaw-logs-page`)||customElements.define(`openclaw-logs-page`,$)}))();
//# sourceMappingURL=logs-page-BOWlrWfS.js.map