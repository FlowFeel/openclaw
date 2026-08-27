import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Cs as i,Kc as a,On as o,Qn as s,Sn as c,Vc as l,Wc as u,Zn as d,ca as f,da as p,fs as ee,la as te,oa as ne,rr as m,sa as h,ua as g,ys as _}from"./control-ui-core-ChU36mQ7.js";import{K as v,Q as re,W as y,Y as b,a as ie,nt as x,o as ae}from"./lit-runtime-D5xZwgO1.js";import{f as oe,g as S,i as C,m as w,p as T,r as E}from"./control-ui-foundation-Dgui328h.js";import{Ct as D,Wt as O,_ as k,jt as A,v as j,wt as M}from"./control-ui-core-CmlLmVZa.js";import{o as N,t as P}from"./control-ui-core-M4uhXYSJ.js";import{_t as F,yt as I}from"./control-ui-core-pXkCFtVv.js";import{n as L,t as R}from"./gateway-page-controller-CmSjSlgL.js";import{_ as z,c as B,d as V,g as se,h as H,i as U,l as W,m as G,n as K,o as q,p as ce,s as le,t as J,u as ue,v as de}from"./data-CrIbAe9Y.js";import{n as fe,t as pe}from"./agent-scope-control-_fy2Bhi1.js";function me(e,t){let n=e.childSessionKey??e.sessionKey;if(!n)return v;let r=t.sessionRow(n);return b`<a
    class="session-link"
    href=${p({face:te(r),sessionKey:n,fallbackAgentId:t.agentId,basePath:t.basePath,mainKey:t.mainKey,row:r,preferenceDerivedFace:!0}).href}
    @click=${e=>{e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||(e.preventDefault(),t.onNavigateToChat(n))}}
    >${N(`tasksPage.openSession`)}</a
  >`}function he(e,t){let n=e.status===`queued`||e.status===`running`,r=z(e.updatedAt??e.createdAt),i=ce(e),a=de(e),o=t.cancellingTaskIds.has(e.id),c=e.terminalOutcome===`blocked`,l=c&&e.deliveryStatus===`failed`,u=c&&e.deliveryStatus===`dismissed`;return b`
    <div class="list-item" data-task-id=${e.id}>
      <div class="list-main">
        <div class="list-title">${a}</div>
        <div class="chip-row">
          <span class="chip ${H(e.status)}"
            >${se(e.status)}</span
          >
          <span class="chip">${G(e)}</span>
          ${e.agentId?b`<span class="chip">${N(`tasksPage.agent`,{agent:e.agentId})}</span>`:v}
        </div>
        ${i?b`<div class="list-sub">${i}</div>`:v}
        ${c?b`<div class="callout warn">
              ${N(u?`tasksPage.deliveryDismissed`:`tasksPage.deliveryBlocked`)}
              ${l?b`<div class="muted">${N(`tasksPage.duplicateRisk`)}</div>`:v}
            </div>`:v}
      </div>
      <div class="list-meta">
        ${r>0?b`<span title=${d(r)}>${s(r)}</span>`:b`<span>${N(`common.na`)}</span>`}
        ${me(e,t)}
        ${n&&t.canCancel?b`<button
              class="btn"
              type="button"
              aria-label=${N(`tasksPage.cancelTask`,{title:a})}
              ?disabled=${o||!t.connected}
              @click=${()=>t.onCancel(e.taskId)}
            >
              ${N(o?`tasksPage.cancelling`:`common.cancel`)}
            </button>`:v}
        ${c&&t.canCancel?b`
              <button
                class="btn"
                type="button"
                ?disabled=${o||!t.connected}
                @click=${()=>t.onCopyResult(e.taskId)}
              >
                ${N(`tasksPage.copyResult`)}
              </button>
              ${l?b`
                    <button
                      class="btn"
                      type="button"
                      ?disabled=${o||!t.connected}
                      @click=${()=>t.onRetry(e.taskId)}
                    >
                      ${N(`tasksPage.retryDelivery`)}
                    </button>
                    <button
                      class="btn"
                      type="button"
                      ?disabled=${o||!t.connected}
                      @click=${()=>t.onDismiss(e.taskId)}
                    >
                      ${N(`tasksPage.dismissDelivery`)}
                    </button>
                  `:v}
            `:v}
      </div>
    </div>
  `}function ge(e){let t=(...t)=>e.filter(e=>t.includes(e.status)).length,n=t(`failed`,`timed_out`);return b`
    <section class="card summary-strip">
      <div class="summary-strip__stats">
        ${[{key:`running`,iconName:`play`,label:N(`tasksPage.status.running`),value:t(`running`)},{key:`queued`,iconName:`clock`,label:N(`tasksPage.status.queued`),value:t(`queued`)},{key:`completed`,iconName:`check`,label:N(`tasksPage.status.completed`),value:t(`completed`)},{key:`failed`,iconName:`alertTriangle`,label:N(`tasksPage.status.failed`),value:n,danger:n>0}].map(e=>b`
            <div
              class="summary-stat ${e.danger?`summary-stat--danger`:``}"
              data-stat=${e.key}
            >
              <span class="summary-stat__icon" aria-hidden="true">${F(e.iconName)}</span>
              <div class="summary-stat__copy">
                <div class="summary-stat__label">${e.label}</div>
                <div class="summary-stat__value">${e.value}</div>
              </div>
            </div>
          `)}
      </div>
    </section>
  `}function Y(e,t,n,r,i,a){return b`
    <section class="card stack" data-task-section=${e}>
      <div class="row" style="justify-content: space-between; align-items: flex-start; gap: 12px;">
        <div>
          <div class="card-title">${t}</div>
          <div class="card-sub">${n}</div>
        </div>
        <div class="muted">
          ${r.length===1?N(`tasksPage.taskCountOne`):N(`tasksPage.taskCount`,{count:String(r.length)})}
        </div>
      </div>
      ${r.length===0?b`<div class="muted">${i}</div>`:b`<div class="list">
            ${ae(r,e=>e.id,e=>he(e,a))}
          </div>`}
    </section>
  `}function X(e){let{active:t,recent:n}=V(e.tasks);return b`
    <div class="stack">
      ${e.connected?v:b`<div class="callout warn">${N(`tasksPage.disconnected`)}</div>`}
      ${e.error?b`<div class="callout danger">${e.error}</div>`:v}
      ${ge(e.tasks)}
      ${e.loading&&e.tasks.length===0?b`<div class="card muted">${N(`tasksPage.loading`)}</div>`:v}
      ${!e.loading&&e.tasks.length===0?b`<div class="card muted">${N(`tasksPage.empty`)}</div>`:v}
      ${Y(`active`,N(`tasksPage.active`),N(`tasksPage.activeSub`),t,N(`tasksPage.emptyActive`),e)}
      ${Y(`recent`,N(`tasksPage.recent`),N(`tasksPage.recentSub`),n,N(`tasksPage.emptyRecent`),e)}
    </div>
  `}var _e=e((()=>{y(),ie(),I(),P(),m(),h(),K()}));function Z(e,t){return e instanceof Error&&e.message.trim()?e.message.trim():typeof e==`string`&&e.trim()?e.trim():t}function Q(e,t){return t?e.agentId?.trim()?e.agentId.trim().toLowerCase()===t:[e.sessionKey,e.childSessionKey,e.ownerKey].some(e=>_(e)?.agentId===t):!0}var $;e((()=>{E(),oe(),y(),re(),A(),j(),M(),pe(),P(),c(),h(),ee(),K(),L(),a(),l(),_e(),t(),$=class extends u{constructor(...e){super(...e),this.tasks=[],this.error=null,this.cancellingTaskIds=new Set,this.taskRefreshEvents=null,this.gateway=new R(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.tasks=[],this.error=null},invalidateRequests:()=>this.cancelGatewayWork(),onSnapshot:()=>{this.gateway.connected&&this.context.agents.ensureList()},ensureInitialData:()=>void this.refreshTasks()}),this.observeAgentScope=o(()=>{this.gateway.invalidate(),this.cancelGatewayWork(),this.tasks=[],this.gateway.connected&&this.refreshTasks(),this.requestUpdate()}),this.listTask=new T(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.gateway:null,this.gateway.connected?this.gateway.client:null,this.context?.agentSelection.state.scopeId??null],task:async([e,t,n],{signal:r})=>{if(!e||!t)return w;let i={gateway:e,client:t,scopeId:n,events:[]};this.taskRefreshEvents=i;let a=n??void 0,[o,s]=await Promise.all([t.request(`tasks.list`,{status:[`queued`,`running`],limit:500,...a?{agentId:a}:{}},{signal:r}),t.request(`tasks.list`,{limit:200,...a?{agentId:a}:{}},{signal:r})]),c=W(o),l=W(s);if(!c||!l)throw Error(N(`tasksPage.invalidResponse`));return{active:c,recent:l,buffer:i}},onComplete:({active:e,recent:t,buffer:n})=>{let r=U(e,t);for(let e of n.events)r=J(r,e).tasks;this.tasks=r,this.taskRefreshEvents===n&&(this.taskRefreshEvents=null)},onError:e=>{this.taskRefreshEvents=null,this.error=Z(e,N(`tasksPage.loadFailed`))}}),this.subscriptions=new r(this).effect(()=>this.context?.gateway,e=>e.subscribeEvents(t=>{if(this.gateway.gateway!==e||this.context.gateway!==e||!this.gateway.connected||t.event!==`task`)return;let n=J(this.tasks,t.payload);if(n.refetch){this.refreshTasks();return}let r=this.context.agentSelection.state.scopeId,i=q(t.payload),a=this.taskRefreshEvents;i&&i.action!==`restored`&&a&&a.gateway===e&&a.client===this.gateway.client&&a.scopeId===r&&(i.action===`deleted`||Q(i.task,r))&&a.events.push(i),this.tasks=n.tasks.filter(e=>Q(e,r))})).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}cancelGatewayWork(){this.taskRefreshEvents=null,this.listTask.run([null,null,null]),this.cancellingTaskIds=new Set}refreshTasks(){let e=this.gateway.gateway,t=this.gateway.client;if(!e||this.context.gateway!==e||!this.gateway.connected||!t)return Promise.resolve();let n=this.context.agentSelection.state.scopeId;return this.error=null,this.listTask.run([e,t,n])}async cancelTask(e){let t=this.gateway.capture(),n=this.gateway.gateway;if(!(!t||!n||this.context.gateway!==n||this.cancellingTaskIds.has(e))){this.cancellingTaskIds=new Set([...this.cancellingTaskIds,e]),this.error=null;try{let r=await t.client.request(`tasks.cancel`,{taskId:e});if(!this.gateway.isCurrent(t))return;let i=le(r);if(i?.task){let e=q({action:`upserted`,task:i.task}),r=this.taskRefreshEvents;e&&r&&r.gateway===n&&r.client===t.client&&r.scopeId===this.context.agentSelection.state.scopeId&&r.events.push(e),this.tasks=J(this.tasks,{action:`upserted`,task:i.task}).tasks}i?.cancelled||(this.error=i?.reason?.trim()||N(`tasksPage.cancelFailed`))}catch(e){this.gateway.isCurrent(t)&&(this.error=Z(e,N(`tasksPage.cancelFailed`)))}finally{if(this.gateway.isCurrent(t)){let t=new Set(this.cancellingTaskIds);t.delete(e),this.cancellingTaskIds=t}}}}async recoverTask(e,t){let n=this.gateway.capture(),r=this.gateway.gateway;if(!(!n||!r||this.context.gateway!==r||this.cancellingTaskIds.has(e))){this.cancellingTaskIds=new Set([...this.cancellingTaskIds,e]),this.error=null;try{let r=t===`retry`?await n.client.request(`tasks.retry`,{taskIds:[e]}):await n.client.request(`tasks.dismiss`,{taskIds:[e]});if(!this.gateway.isCurrent(n))return;let i=ue(r)?.results[0];if(!i?.ok){this.error=i?.reason?.trim()||N(`tasksPage.recoveryFailed`);return}i.task&&(this.tasks=J(this.tasks,{action:`upserted`,task:i.task}).tasks)}catch(e){this.gateway.isCurrent(n)&&(this.error=Z(e,N(`tasksPage.recoveryFailed`)))}finally{if(this.gateway.isCurrent(n)){let t=new Set(this.cancellingTaskIds);t.delete(e),this.cancellingTaskIds=t}}}}async copyTaskResult(e){let t=this.gateway.capture(),n=this.gateway.gateway;if(!(!t||!n||this.context.gateway!==n))try{let n=B(await t.client.request(`tasks.get`,{taskId:e}));if(!this.gateway.isCurrent(t))return;let r=n?.result??n?.progressSummary;if(!r){this.error=N(`tasksPage.recoveryFailed`);return}await navigator.clipboard.writeText(r)}catch(e){this.gateway.isCurrent(t)&&(this.error=Z(e,N(`tasksPage.recoveryFailed`)))}}render(){let e=f(this.context);return b`
      <section class="content-header content-header--page">
        <div>
          <div class="page-title">${O(`tasks`)}</div>
        </div>
        <div class="page-header-actions">
          ${fe({agents:this.context.agents.state.agentsList?.agents??[],selection:this.context.agentSelection})}
          <button
            class="btn"
            type="button"
            ?disabled=${!this.gateway.connected||this.listTask.status===S.PENDING}
            @click=${()=>void this.refreshTasks()}
          >
            ${this.listTask.status===S.PENDING?N(`common.refreshing`):N(`common.refresh`)}
          </button>
        </div>
      </section>
      ${X({basePath:this.context.basePath,agentId:e,mainKey:i({agentsList:this.context.agents.state.agentsList,hello:this.context.gateway.snapshot.hello}),connected:this.gateway.connected,canCancel:D(this.context.gateway.snapshot.hello?.auth??null),loading:this.listTask.status===S.PENDING,error:this.error,tasks:this.tasks,cancellingTaskIds:this.cancellingTaskIds,sessionRow:e=>ne(this.context,e),onCancel:e=>void this.cancelTask(e),onRetry:e=>void this.recoverTask(e,`retry`),onDismiss:e=>void this.recoverTask(e,`dismiss`),onCopyResult:e=>void this.copyTaskResult(e),onNavigateToChat:e=>{let t=g(this.context,e);this.context.navigate(t,p({context:this.context,face:t,sessionKey:e,preferenceDerivedFace:!0}).options)}})}
    `}},n([C({context:k,subscribe:!0})],$.prototype,`context`,void 0),n([x()],$.prototype,`tasks`,void 0),n([x()],$.prototype,`error`,void 0),n([x()],$.prototype,`cancellingTaskIds`,void 0),customElements.get(`openclaw-tasks-page`)||customElements.define(`openclaw-tasks-page`,$)}))();
//# sourceMappingURL=tasks-page-K5EdOfHL.js.map