import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Ar as r,Bc as i,Kc as a,Lo as o,Qn as s,Ro as c,Vc as l,Wc as u,Yn as d,_o as f,bo as p,kr as m,rr as h}from"./control-ui-core-CrKLOOVi.js";import{K as g,Q as _,W as v,Y as y,nt as b}from"./lit-runtime-D5xZwgO1.js";import{i as x,r as S}from"./control-ui-foundation-Dgui328h.js";import{A as C,D as w,O as T,Ut as E,Wt as D,_ as ee,jt as te,v as ne,z as re}from"./control-ui-core-CVcZBevq.js";import{o as O,t as k}from"./control-ui-core-DkYXaYTI.js";import{n as A,t as j}from"./poll-controller-BnQs2EZr.js";import{n as M,t as N}from"./settings-workspace-BbyrBOFl.js";import{c as P,f as F,h as I,l as L,n as R,s as z,t as B,u as V}from"./settings-ui-D9oWnjak.js";import{n as H,r as U,t as ie}from"./system-info-CcediNJO.js";var W=e((()=>{}));function G(e){return e>=.92?`critical`:e>=.75?`warn`:`ok`}function K(e,t){let n=Math.min(Math.max(t,0),1),r=Math.round(n*100);return y`
    <div
      class="config-host__meter"
      role="meter"
      aria-label=${O(`quickSettings.system.usage`,{label:e})}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${r}
    >
      <div
        class="config-host__meter-fill config-host__meter-fill--${G(n)}"
        style="--config-host-meter-fill: ${r}%"
      ></div>
    </div>
  `}function q(e){return y`
    <div class="config-host__stat" title=${e.title??``}>
      <div class="config-host__stat-label">${e.label}</div>
      <div class="config-host__stat-value">
        ${e.value}${e.unit?y` <span class="config-host__stat-unit">${e.unit}</span>`:g}
      </div>
      ${e.usedFraction==null?g:K(e.label,e.usedFraction)}
      ${e.detail?y`<div class="config-host__stat-detail">${e.detail}</div>`:g}
    </div>
  `}function J(e,t){if(!(e==null||t==null||e<=0))return(e-t)/e}function Y(e){return`${Math.round(Math.min(Math.max(e,0),1)*100)}%`}function ae(e){let t=e.loadAverage?.[0],n=e.loadAverage?O(`quickSettings.system.loadAverage`,{values:e.loadAverage.map(e=>e.toFixed(1)).join(` · `)}):void 0,r=[e.cpuModel,n].filter(Boolean).join(` · `)||void 0,i=O(e.cpuCount===1?`quickSettings.system.core`:`quickSettings.system.cores`,{count:String(e.cpuCount)}),a=t==null?{label:O(`quickSettings.system.cpu`),value:i,detail:e.cpuModel,title:r}:{label:O(`quickSettings.system.cpu`),value:t.toFixed(1),unit:O(`quickSettings.system.load`),detail:i,usedFraction:e.cpuCount>0?t/e.cpuCount:void 0,title:r},s=J(e.memoryTotalBytes,e.memoryFreeBytes),c=[a,{label:O(`quickSettings.system.memory`),value:s==null?`—`:Y(s),unit:s==null?void 0:O(`quickSettings.system.used`),detail:O(`quickSettings.system.freeOf`,{free:o(e.memoryFreeBytes),total:o(e.memoryTotalBytes)}),usedFraction:s}],l=J(e.diskTotalBytes,e.diskAvailableBytes);return l!=null&&c.push({label:O(`quickSettings.system.disk`),value:Y(l),unit:O(`quickSettings.system.used`),detail:O(`quickSettings.system.freeOf`,{free:o(e.diskAvailableBytes),total:o(e.diskTotalBytes)}),usedFraction:l,title:e.diskPath}),c}function oe(){return[{label:O(`quickSettings.system.cpu`),value:`—`},{label:O(`quickSettings.system.memory`),value:`—`},{label:O(`quickSettings.system.disk`),value:`—`}]}function se(e){if(e.systemInfoUnavailable)return g;let t=e.systemInfo,n=t&&t.hostname!==t.machineName?t.hostname:void 0,r=t?.lanAddress?`${t.lanAddress}${t.port==null?``:`:${t.port}`}`:void 0,i=t?ae(t):oe(),a={title:O(`quickSettings.system.gatewayHost`),actions:t?F({kind:`ok`,label:O(`quickSettings.system.up`,{duration:d(t.uptimeMs)})}):void 0};return y`
    <div id=${f.host}>
      ${V(a,y`
          <div class="config-host">
            <div class="config-host__identity">
              <div class="config-host__name" title=${n??``}>
                ${t?.machineName??`—`}
              </div>
              <div class="config-host__meta">
                ${t?`${t.osLabel} · ${t.arch}`:`—`}
              </div>
              <div class="config-host__meta">
                ${t?O(`quickSettings.system.runtime`,{version:t.nodeVersion,pid:String(t.pid)}):`—`}
              </div>
              ${r?y`<code class="config-host__address">${r}</code>`:g}
            </div>
            <div class="config-host__stats">${i.map(q)}</div>
          </div>
        `)}
    </div>
  `}var ce=e((()=>{v(),B(),k(),c(),h(),p()}));function X(e){let{label:t,...n}=e;return P({title:t,control:L({...n,ariaLabel:t})})}function le(e){let t=e.hello?.snapshot,n=e.hello?.policy?.tickIntervalMs,r=n?`${(n/1e3).toFixed(n%1e3==0?0:1)}s`:O(`common.na`),i=t?.authMode===`trusted-proxy`,a=y`
    ${P({title:O(`connection.access.wsUrl`),control:y`
        <input
          class="settings-input"
          aria-label=${O(`connection.access.wsUrl`)}
          .value=${e.settings.gatewayUrl}
          @input=${t=>{let n=e.settings,r=t.target.value;e.onConnectionChange({gatewayUrl:r,token:re(n.gatewayUrl,r,n.token)})}}
          placeholder="ws://100.x.y.z:18789"
        />
      `})}
    ${i?``:y`
          ${X({label:O(`connection.access.token`),value:e.settings.token,placeholder:`OPENCLAW_GATEWAY_TOKEN`,visible:e.showGatewayToken,showLabel:O(`connection.access.showToken`),hideLabel:O(`connection.access.hideToken`),toggleLabel:O(`connection.access.toggleTokenVisibility`),onInput:t=>e.onConnectionChange({token:t}),onToggle:e.onToggleGatewayTokenVisibility})}
          ${X({label:O(`connection.access.password`),value:e.password,placeholder:O(`connection.access.passwordPlaceholder`),visible:e.showGatewayPassword,showLabel:O(`connection.access.showPassword`),hideLabel:O(`connection.access.hidePassword`),toggleLabel:O(`connection.access.togglePasswordVisibility`),onInput:e.onPasswordChange,onToggle:e.onToggleGatewayPasswordVisibility})}
        `}
    ${P({title:O(`connection.access.sessionKey`),control:y`
        <input
          class="settings-input"
          aria-label=${O(`connection.access.sessionKey`)}
          .value=${e.settings.sessionKey}
          @input=${t=>e.onSessionKeyChange(t.target.value)}
        />
      `})}
    <div class="settings-row">
      <div class="settings-row__text">
        <span class="settings-row__desc"
          >${O(i?`connection.access.trustedProxy`:`connection.access.connectHint`)}</span
        >
      </div>
      <div class="settings-row__control">
        <button class="btn" @click=${()=>e.onConnect()}>${O(`common.connect`)}</button>
        <button class="btn" @click=${()=>e.onRefresh()}>${O(`common.refresh`)}</button>
      </div>
    </div>
  `,o=y`
    ${P({title:O(`connection.snapshot.status`),control:F({kind:e.connected?`ok`:`warn`,label:e.connected?O(`common.ok`):O(`common.offline`)})})}
    ${P({title:O(`connection.snapshot.tickInterval`),control:I(r)})}
    ${P({title:O(`connection.snapshot.lastChannelsRefresh`),control:I(e.lastChannelsRefresh?s(e.lastChannelsRefresh):O(`common.na`))})}
    ${e.lastError?P({title:F({kind:`danger`,label:O(`connection.snapshot.lastError`)}),description:e.lastError}):``}
  `;return z([V({title:O(`connection.access.title`),description:O(`connection.access.subtitle`)},a),se(e),V({title:O(`connection.snapshot.title`),description:O(`connection.snapshot.subtitle`)},o)])}var ue=e((()=>{v(),w(),B(),k(),h(),ce()})),Z,Q,$;e((()=>{W(),S(),v(),_(),te(),ne(),w(),B(),N(),k(),m(),a(),A(),l(),ie(),ue(),t(),Z=1e4,Q=`https://docs.openclaw.ai/gateway/remote`,$=class extends u{constructor(...e){super(...e),this.settings=C(),this.password=``,this.gatewayTokenVisible=!1,this.gatewayPasswordVisible=!1,this.systemInfo=null,this.systemInfoUnavailable=!1,this.sessionKeyDirty=!1,this.gatewayClient=null,this.systemInfoGatewaySource=null,this.systemInfoClient=null,this.systemInfoLoading=!1,this.systemInfoRequestId=0,this.systemInfoPolling=new j(this,Z,()=>{this.loadSystemInfo()},!1),this.subscriptions=new i(this).effect(()=>this.context?.gateway,e=>(this.resetDraft(e),this.synchronizeSystemInfoGateway(e),e.subscribe(t=>{t.client===this.gatewayClient?t.phase!==`connected`&&this.resetSensitiveUi():this.resetDraft(e),this.handleSystemInfoGatewaySnapshot(t),this.requestUpdate()}))).watch(()=>this.context?.channels,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.systemInfoPolling.stop(),this.invalidateSystemInfoRequest(),this.systemInfoGatewaySource=null,this.systemInfoClient=null,this.subscriptions.clear(),this.resetSensitiveUi(),super.disconnectedCallback()}resetSensitiveUi(){this.gatewayTokenVisible=!1,this.gatewayPasswordVisible=!1}synchronizeSystemInfoGateway(e){e!==this.systemInfoGatewaySource&&(this.systemInfoPolling.stop(),this.invalidateSystemInfoRequest(),this.systemInfoGatewaySource=e,this.systemInfoClient=null,this.systemInfo=null,this.systemInfoUnavailable=!1),this.handleSystemInfoGatewaySnapshot(e.snapshot)}handleSystemInfoGatewaySnapshot(e){let t=e.client!==this.systemInfoClient,n=U(e.hello);this.systemInfoClient=e.client,t?(this.invalidateSystemInfoRequest(),this.systemInfo=null,this.systemInfoUnavailable=!1):e.phase!==`connected`&&(this.invalidateSystemInfoRequest(),this.systemInfo=null),e.phase===`connected`&&e.hello&&(this.systemInfoUnavailable=!n,n||(this.invalidateSystemInfoRequest(),this.systemInfo=null)),this.syncSystemInfoPolling()}syncSystemInfoPolling(){let e=this.context.gateway.snapshot;if(!(this.isConnected&&!this.systemInfoUnavailable&&e.phase===`connected`&&U(e.hello)&&e.client!=null)){this.systemInfoPolling.stop();return}this.systemInfoPolling.start()&&this.loadSystemInfo()}invalidateSystemInfoRequest(){this.systemInfoRequestId+=1,this.systemInfoLoading=!1}isCurrentSystemInfoRequest(e,t,n){let r=n.snapshot;return this.isConnected&&e===this.systemInfoRequestId&&this.systemInfoGatewaySource===n&&this.context.gateway===n&&r.phase===`connected`&&r.client===t}async loadSystemInfo(){let e=this.systemInfoGatewaySource;if(!e||e!==this.context.gateway)return;let t=e.snapshot,n=t.client;if(t.phase!==`connected`||!n||this.systemInfoUnavailable||this.systemInfoLoading)return;let i=++this.systemInfoRequestId;this.systemInfoLoading=!0;try{let t=await n.request(`system.info`,{});if(!this.isCurrentSystemInfoRequest(i,n,e))return;this.systemInfo=t}catch(t){if(!this.isCurrentSystemInfoRequest(i,n,e))return;(r(t)||H(t))&&(this.systemInfo=null,this.systemInfoUnavailable=!0,this.systemInfoPolling.stop())}finally{this.isCurrentSystemInfoRequest(i,n,e)&&(this.systemInfoLoading=!1)}}resetDraft(e){let t=e.snapshot.sessionKey,{gatewayUrl:n,token:r,password:i}=e.connection;this.gatewayClient=e.snapshot.client,this.settings={...C(),gatewayUrl:n,token:r,sessionKey:t,lastActiveSessionKey:t},this.password=i,this.sessionKeyDirty=!1,this.resetSensitiveUi()}connect(){let e=this.sessionKeyDirty?{sessionKey:this.settings.sessionKey,lastActiveSessionKey:this.settings.sessionKey}:T(this.settings.gatewayUrl);this.settings={...this.settings,...e},this.sessionKeyDirty=!1,this.context.gateway.connect({gatewayUrl:this.settings.gatewayUrl,token:this.settings.token,password:this.password,sessionKey:e.sessionKey})}render(){let e=this.context.gateway.snapshot,t=le({connected:e.phase===`connected`,hello:e.hello,settings:this.settings,password:this.password,lastError:e.lastError,lastChannelsRefresh:this.context.channels.state.channelsLastSuccess,systemInfo:this.systemInfo,systemInfoUnavailable:this.systemInfoUnavailable,showGatewayToken:this.gatewayTokenVisible,showGatewayPassword:this.gatewayPasswordVisible,onConnectionChange:e=>{this.settings={...this.settings,...e}},onPasswordChange:e=>this.password=e,onSessionKeyChange:e=>{this.sessionKeyDirty=!0,this.settings={...this.settings,sessionKey:e,lastActiveSessionKey:e}},onToggleGatewayTokenVisibility:()=>{this.gatewayTokenVisible=!this.gatewayTokenVisible},onToggleGatewayPasswordVisibility:()=>{this.gatewayPasswordVisible=!this.gatewayPasswordVisible},onConnect:()=>this.connect(),onRefresh:()=>void this.context.channels.refresh(!1)});return y`
      <section class="content-header">
        <div>
          <div class="page-title">${D(`connection`)}</div>
          <div class="page-subtitle">
            ${E(`connection`)}
            ${R(Q,O(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${M(t)}
    `}},n([x({context:ee,subscribe:!0})],$.prototype,`context`,void 0),n([b()],$.prototype,`settings`,void 0),n([b()],$.prototype,`password`,void 0),n([b()],$.prototype,`gatewayTokenVisible`,void 0),n([b()],$.prototype,`gatewayPasswordVisible`,void 0),n([b()],$.prototype,`systemInfo`,void 0),n([b()],$.prototype,`systemInfoUnavailable`,void 0),customElements.get(`openclaw-connection-page`)||customElements.define(`openclaw-connection-page`,$)}))();
//# sourceMappingURL=connection-page-CxquJMBd.js.map