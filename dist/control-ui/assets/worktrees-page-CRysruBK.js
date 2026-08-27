import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as r,Qn as i,Wc as a,da as o,rr as s,sa as c,ua as l}from"./control-ui-core-BUddgKjW.js";import{K as u,Q as d,W as f,Y as p,nt as m}from"./lit-runtime-D5xZwgO1.js";import{f as h,g,i as _,m as v,p as y,r as b}from"./control-ui-foundation-Dgui328h.js";import{Ut as x,Wt as S,_ as C,jt as w,v as T}from"./control-ui-core-Ct5CBwjl.js";import{o as E,t as D}from"./control-ui-core-s0pW0mau.js";import{s as O,t as k}from"./app-sidebar-nav-menus-Bwuvz5_5.js";import{n as A,t as j}from"./settings-workspace-BbyrBOFl.js";import{c as M,f as N,i as P,n as F,s as I,t as L,u as R}from"./settings-ui-Bko7fBdZ.js";import{n as z,t as B}from"./gateway-page-controller-D6t8841W.js";import{n as V,t as H}from"./confirm-dialog-B87dCyWg.js";import{n as U,t as W}from"./sessions-hub-header-D92D-FEs.js";function G(e){return e.split(/[\\/]/).findLast(Boolean)??e}var K,q;e((()=>{b(),h(),f(),d(),w(),T(),k(),H(),W(),L(),j(),D(),s(),c(),z(),r(),t(),K=`https://docs.openclaw.ai/concepts/managed-worktrees`,q=class extends a{constructor(...e){super(...e),this.records=[],this.error=null,this.busyId=null,this.createOpen=!1,this.createRepoRoot=``,this.createName=``,this.createBaseRef=``,this.createBranches=[],this.creating=!1,this.gcLoading=!1,this.listClient=null,this.gateway=new B(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>{this.records=[],this.error=null},invalidateRequests:e=>{(e.snapshot.phase!==`connected`||!e.snapshot.client)&&(this.listClient=null,this.listTask.run([null])),this.branchesTask.run([null,``]),this.invalidateOperations()},ensureInitialData:()=>void this.load()}),this.listTask=new y(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null],task:([e],{signal:t})=>e?e.request(`worktrees.list`,{},{signal:t}):v,onComplete:e=>{this.records=e.worktrees.toSorted((e,t)=>t.lastActiveAt-e.lastActiveAt)},onError:e=>{this.error=String(e)}}),this.branchesTask=new y(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.createRepoRoot.trim()],task:([e,t],{signal:n})=>e&&t?e.request(`worktrees.branches`,{repoRoot:t},{signal:n}):v,onComplete:e=>{this.createBranches=e.branches.map(e=>e.name),this.createBaseRef||=e.defaultBranch??e.headBranch??``},onError:()=>{this.createBranches=[]}})}disconnectedCallback(){this.listClient=null,this.listTask.run([null]),this.branchesTask.run([null,``]),super.disconnectedCallback()}invalidateOperations(){this.busyId=null,this.creating=!1,this.gcLoading=!1}get operationPending(){return this.loading||this.busyId!==null||this.creating}get loading(){return this.gcLoading||this.listTask.status===g.PENDING}async load(e={}){let t=this.gateway.client;!t||!this.gateway.connected||this.busyId!==null||this.creating||this.gcLoading||this.listTask.status===g.PENDING&&this.listClient===t||(this.listClient=t,e.preserveError||(this.error=null),await this.listTask.run([t]))}async removeWorktree(e){let t=this.gateway.capture();if(!(!t||this.operationPending)&&!(!await V({message:E(`worktrees.confirmDelete`,{name:e.name}),confirmLabel:E(`common.delete`),danger:!0})||!this.gateway.isCurrent(t)||this.operationPending)){this.busyId=e.id,this.error=null;try{let n=await t.client.request(`worktrees.remove`,{id:e.id});if(!this.gateway.isCurrent(t)||n.removed)return;let r=n.snapshotError??``,i=await V({message:E(`worktrees.confirmForceDelete`,{error:r}),confirmLabel:E(`common.delete`),danger:!0});if(!this.gateway.isCurrent(t))return;if(!i){this.error=r||null;return}try{await t.client.request(`worktrees.remove`,{id:e.id,force:!0})}catch(e){this.gateway.isCurrent(t)&&(this.error=String(e))}}catch(e){this.gateway.isCurrent(t)&&(this.error=String(e))}finally{this.gateway.isCurrent(t)&&(this.busyId=null,await this.load({preserveError:!0}))}}}async restore(e){let t=this.gateway.capture();if(!(!t||this.operationPending)){this.busyId=e.id,this.error=null;try{await t.client.request(`worktrees.restore`,{id:e.id})}catch(e){this.gateway.isCurrent(t)&&(this.error=String(e))}finally{this.gateway.isCurrent(t)&&(this.busyId=null,await this.load({preserveError:!0}))}}}async gc(){let e=this.gateway.capture();if(!(!e||this.operationPending)){this.gcLoading=!0,this.error=null;try{await e.client.request(`worktrees.gc`,{})}catch(t){this.gateway.isCurrent(e)&&(this.error=String(t))}finally{this.gateway.isCurrent(e)&&(this.gcLoading=!1,await this.load({preserveError:!0}))}}}toggleCreate(){if(!this.creating&&(this.createOpen=!this.createOpen,this.createOpen&&!this.createRepoRoot)){let e=this.context.agents.state.agentsList,t=e?.agents.find(t=>t.id===e.defaultId);this.createRepoRoot=t?.workspace??``,this.loadCreateBranches()}}loadCreateBranches(){let e=this.gateway.connected?this.gateway.client:null,t=this.createRepoRoot.trim();if(!e||!t){this.createBranches=[],this.branchesTask.run([null,``]);return}this.branchesTask.run([e,t])}async createWorktree(){let e=this.gateway.capture(),t=this.createRepoRoot.trim();if(!(!e||!t||this.operationPending)){this.creating=!0,this.error=null;try{await e.client.request(`worktrees.create`,{repoRoot:t,...this.createName.trim()?{name:this.createName.trim()}:{},...this.createBaseRef.trim()?{baseRef:this.createBaseRef.trim()}:{}}),this.gateway.isCurrent(e)&&(this.createOpen=!1,this.createName=``)}catch(t){this.gateway.isCurrent(e)&&(this.error=String(t))}finally{this.gateway.isCurrent(e)&&(this.creating=!1,await this.load({preserveError:!0}))}}}renderOwner(e){if(e.ownerKind===`session`&&e.ownerId){let t=l(this.context,e.ownerId),n=o({context:this.context,face:t,sessionKey:e.ownerId,preferenceDerivedFace:!0});return p`<a
        href=${n.href}
        title=${e.ownerId}
        @click=${e=>{O(e)&&(e.preventDefault(),this.context.navigate(t,n.options))}}
        >${E(`worktrees.ownerSession`)}</a
      >`}return e.ownerKind===`workboard`?p`<span title=${e.ownerId??``}>${E(`worktrees.ownerWorkboard`)}</span>`:p`<span>${E(`worktrees.ownerManual`)}</span>`}renderCreateRows(){return this.createOpen?p`
      ${M({title:E(`worktrees.repo`),control:p`
          <input
            class="settings-input"
            type="text"
            aria-label=${E(`worktrees.repo`)}
            ?disabled=${this.creating}
            .value=${this.createRepoRoot}
            @change=${e=>{this.createRepoRoot=e.target.value,this.createBaseRef=``,this.loadCreateBranches()}}
          />
        `})}
      ${M({title:E(`worktrees.name`),control:p`
          <input
            class="settings-input"
            type="text"
            aria-label=${E(`worktrees.name`)}
            ?disabled=${this.creating}
            placeholder=${E(`newSession.worktreeNamePlaceholder`)}
            .value=${this.createName}
            @input=${e=>{this.createName=e.target.value}}
          />
        `})}
      ${M({title:E(`newSession.baseBranch`),control:p`
          <input
            class="settings-input"
            type="text"
            aria-label=${E(`newSession.baseBranch`)}
            ?disabled=${this.creating}
            list="worktrees-create-branches"
            .value=${this.createBaseRef}
            @input=${e=>{this.createBaseRef=e.target.value}}
          />
          <datalist id="worktrees-create-branches">
            ${this.createBranches.map(e=>p`<option value=${e}></option>`)}
          </datalist>
        `})}
      ${M({title:E(`worktrees.newWorktree`),control:p`
          <button
            class="btn btn--sm"
            ?disabled=${this.operationPending||!this.createRepoRoot.trim()}
            @click=${()=>void this.createWorktree()}
          >
            ${this.creating?E(`common.loading`):E(`common.create`)}
          </button>
        `})}
    `:u}renderRecordRow(e){return M({title:e.name,description:p`
        <span title=${e.repoRoot}>${G(e.repoRoot)}</span> · ${e.branch} ·
        ${this.renderOwner(e)} · ${i(e.lastActiveAt)}
      `,control:p`
        ${e.removedAt?N({kind:`muted`,label:E(`worktrees.restorable`)}):N({kind:`ok`,label:E(`common.active`)})}
        <button
          class=${e.removedAt?`btn btn--sm`:`btn btn--sm danger`}
          ?disabled=${this.operationPending}
          @click=${()=>void(e.removedAt?this.restore(e):this.removeWorktree(e))}
        >
          ${e.removedAt?E(`worktrees.restore`):E(`common.delete`)}
        </button>
      `})}render(){let e=p`
      <button class="btn" ?disabled=${this.creating} @click=${()=>this.toggleCreate()}>
        ${E(`worktrees.newWorktree`)}
      </button>
      <button class="btn" ?disabled=${this.operationPending} @click=${()=>void this.gc()}>
        ${this.loading?E(`common.loading`):E(`worktrees.cleanNow`)}
      </button>
    `,t=p`
      ${this.renderCreateRows()}
      ${this.records.length===0?P(E(`worktrees.empty`)):this.records.map(e=>this.renderRecordRow(e))}
    `,n=I(p`
        ${this.error?p`<div class="callout danger">${this.error}</div>`:u}
        ${R({title:E(`worktrees.title`),description:E(`worktrees.subtitle`),actions:e},t)}
      `,{wide:!0});return p`
      ${U({active:`worktrees`,title:S(`sessions`),subtitle:p`${x(`worktrees`)}
        ${F(K,E(`common.learnMore`))}`,onSelect:e=>{e!==`worktrees`&&this.context?.navigate(e)}})}
      ${A(n,{id:`sessions-hub-panel`})}
    `}},n([_({context:C,subscribe:!0})],q.prototype,`context`,void 0),n([m()],q.prototype,`records`,void 0),n([m()],q.prototype,`error`,void 0),n([m()],q.prototype,`busyId`,void 0),n([m()],q.prototype,`createOpen`,void 0),n([m()],q.prototype,`createRepoRoot`,void 0),n([m()],q.prototype,`createName`,void 0),n([m()],q.prototype,`createBaseRef`,void 0),n([m()],q.prototype,`createBranches`,void 0),n([m()],q.prototype,`creating`,void 0),n([m()],q.prototype,`gcLoading`,void 0),customElements.get(`openclaw-worktrees-page`)||customElements.define(`openclaw-worktrees-page`,q)}))();
//# sourceMappingURL=worktrees-page-CRysruBK.js.map