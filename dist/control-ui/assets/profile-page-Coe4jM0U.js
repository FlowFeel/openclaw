import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Dc as r,Ec as i,Kc as a,Wc as o,bo as s,wc as c,yo as l}from"./control-ui-core-BUddgKjW.js";import{K as u,Q as d,W as f,Y as p,nt as m}from"./lit-runtime-D5xZwgO1.js";import{i as h,r as ee}from"./control-ui-foundation-Dgui328h.js";import{C as g,Ut as _,Wt as v,_ as y,jt as te,v as ne,w as b,x}from"./control-ui-core-Ct5CBwjl.js";import{o as S,t as C}from"./control-ui-core-s0pW0mau.js";import{vt as w,yt as T}from"./control-ui-core-vLOElyFQ.js";import{r as E}from"./viewer-facepile-DNrd6Gx3.js";import{n as D,t as O}from"./settings-workspace-BbyrBOFl.js";import{a as k,c as A,h as j,i as M,n as N,o as P,s as F,t as I,u as L}from"./settings-ui-Bko7fBdZ.js";var R=e((()=>{}));function z(e,t){if(!Number.isFinite(e)||!Number.isFinite(t)||e<=0||t<=0)throw new Y(`invalid-image`);let n=Math.min(e,t),r=Math.min(1,G/n);return{sourceEdge:n,sourceX:Math.max(0,Math.round((e-n)/2)),sourceY:Math.max(0,Math.round((t-n)/2)),edge:Math.max(1,Math.round(n*r))}}async function B(e){let t=URL.createObjectURL(e);try{let e=new Image;return e.decoding=`async`,e.src=t,await e.decode(),e}catch{throw new Y(`invalid-image`)}finally{URL.revokeObjectURL(t)}}function V(e,t,n){return new Promise(r=>{e.toBlob(r,t,n)})}function H(e){let t=[];for(let n=0;n<e.length;n+=32768)t.push(String.fromCharCode(...e.subarray(n,n+32768)));return btoa(t.join(``))}async function U(e,t){if(e.size>K)throw new Y(`too-large`);let n=new Uint8Array(await e.arrayBuffer()),r=H(n);if(r.length>q)throw new Y(`too-large`);return{mime:t,avatarBase64:r,byteLength:n.byteLength}}async function W(e){if(![`image/png`,`image/jpeg`,`image/webp`].includes(e.type))throw new Y(`invalid-image`);if(e.size>J)throw new Y(`source-too-large`);let t=await B(e),n=z(t.naturalWidth,t.naturalHeight),r=document.createElement(`canvas`);r.width=n.edge,r.height=n.edge;let i=r.getContext(`2d`);if(!i)throw new Y(`invalid-image`);i.drawImage(t,n.sourceX,n.sourceY,n.sourceEdge,n.sourceEdge,0,0,n.edge,n.edge);let a=e.type===`image/webp`?`image/webp`:`image/png`,o=await V(r,a,a===`image/webp`?.9:void 0);if((!o||o.type!==a||o.size>K)&&(a=`image/webp`,o=await V(r,a,.82)),!o||o.type!==a)throw new Y(`invalid-image`);return U(o,a)}var G,K,q,J,Y,X=e((()=>{G=512,K=512*1024,q=7e5,J=10*1024*1024,Y=class extends Error{constructor(e){super(e),this.code=e,this.name=`ProfileAvatarError`}}}));function re(e,t){return{id:e.id,name:e.displayName??void 0,email:e.emails[0],avatarUrl:t??void 0,watchedSessions:[]}}function ie(e){let t=e.profile.displayName??``,n=e.displayName.trim()!==t,r=e.profile.emails.join(`, `);return p`<div id=${l.identity}>
    ${L({title:S(`profilePage.identity.title`),description:S(`profilePage.identity.description`)},p`
        ${A({title:S(`profilePage.identity.avatar`),description:S(`profilePage.identity.avatarDescription`),control:p`
            <span class="identity-avatar-control">
              <openclaw-viewer-avatar
                .user=${re(e.profile,e.avatarUrl)}
                variant="profile"
              ></openclaw-viewer-avatar>
              <label class="btn btn--sm">
                ${e.busy===`avatar`?S(`profilePage.identity.processingAvatar`):S(`profilePage.identity.chooseAvatar`)}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  hidden
                  ?disabled=${e.busy!==null}
                  @change=${t=>{let n=t.currentTarget,r=n.files?.[0];n.value=``,r&&e.onAvatarSelect(r)}}
                />
              </label>
            </span>
          `})}
        ${A({title:S(`profilePage.identity.displayName`),description:S(`profilePage.identity.displayNameDescription`),control:p`
            <form
              class="identity-name-control"
              @submit=${t=>{t.preventDefault(),e.onSaveDisplayName()}}
            >
              <input
                class="settings-input"
                type="text"
                maxlength="256"
                aria-label=${S(`profilePage.identity.displayName`)}
                .value=${e.displayName}
                ?disabled=${e.busy!==null}
                @input=${t=>e.onDisplayNameInput(t.currentTarget.value)}
              />
              <button
                type="submit"
                class="btn btn--sm"
                ?disabled=${e.busy!==null||!n}
              >
                ${e.busy===`display-name`?S(`common.saving`):S(`common.save`)}
              </button>
            </form>
          `})}
        ${A({title:S(`profilePage.identity.linkedEmails`),description:S(`profilePage.identity.linkedEmailsDescription`),control:r?j(r):u})}
        ${e.error?p`<div class="settings-row identity-error" role="alert">
              <span class="settings-row__desc">${e.error}</span>
            </div>`:u}
      `)}
  </div>`}var ae=e((()=>{f(),I(),E(),C(),s()}));function Z(e){return e instanceof Error&&e.message.trim()?e.message:typeof e==`string`&&e.trim()?e:S(`profilePage.identity.profileUnavailable`)}var Q,$;e((()=>{ee(),f(),d(),te(),ne(),x(),T(),I(),O(),C(),c(),a(),s(),R(),X(),ae(),t(),Q=`https://docs.openclaw.ai/concepts/user-model`,$=class extends o{constructor(...e){super(...e),this.selfUser=null,this.ownProfile=null,this.displayName=``,this.identityLoading=!1,this.identityBusy=null,this.identityError=null,this.failedHeroAvatarUrl=null,this.client=null,this.connected=!1,this.identityRequestId=0,this.subscriptions=[]}connectedCallback(){super.connectedCallback(),this.subscriptions=[this.context.gateway.subscribe(e=>this.applyGatewaySnapshot(e)),this.context.agents.subscribe(()=>this.requestUpdate()),this.context.agentIdentity.subscribe(()=>this.requestUpdate())],this.applyGatewaySnapshot(this.context.gateway.snapshot)}disconnectedCallback(){for(let e of this.subscriptions)e();this.subscriptions=[],this.identityRequestId+=1,this.client=null,this.connected=!1,super.disconnectedCallback()}applyGatewaySnapshot(e){let t=e.client!==this.client,n=e.phase===`connected`,r=n!==this.connected,i=n?g({snapshotUser:e.selfUser}):null,a=i?.id!==this.selfUser?.id,o=t||r||a;this.client=e.client,this.connected=n,this.selfUser=i,this.requestUpdate(),o&&(this.identityRequestId+=1,this.ownProfile=null,this.displayName=``,this.identityLoading=!1,this.identityBusy=null,this.identityError=null),!(!n||!e.client)&&(i&&o&&this.loadIdentity(),this.context.agents.ensureList().then(e=>{e&&this.context.agentIdentity.ensure([e.defaultId])}))}async loadIdentity(){let e=this.client;if(!e||!this.connected||this.identityLoading)return;let t=++this.identityRequestId,n=this.ownProfile,r=this.displayName,i=n!==null&&r.trim()!==(n.displayName??``);this.identityLoading=!0,this.identityError=null;try{let n=await e.request(`users.self`,{});if(t!==this.identityRequestId)return;let a=n?.profile;if(!a)return;this.ownProfile=a,this.displayName=i?r:a.displayName??``}catch(e){t===this.identityRequestId&&(this.identityError=Z(e))}finally{t===this.identityRequestId&&(this.identityLoading=!1)}}applyOwnProfile(e){this.ownProfile=e,this.displayName=e.displayName??``}async saveDisplayName(){let e=this.client,t=this.ownProfile;if(!e||!t||this.identityBusy||this.identityLoading)return;this.identityBusy=`display-name`,this.identityError=null;let n=this.identityRequestId,r=!1;try{let i=this.displayName.trim()||null,a=await e.request(`users.setDisplayName`,{profileId:t.id,displayName:i});if(e!==this.client||n!==this.identityRequestId)return;this.applyOwnProfile(a.profile),this.context.gateway.updateSelfUser?.({name:a.profile.displayName??void 0}),r=!0}catch(t){e===this.client&&n===this.identityRequestId&&(this.identityError=Z(t))}finally{n===this.identityRequestId&&this.identityBusy===`display-name`&&(this.identityBusy=null)}r&&e===this.client&&n===this.identityRequestId&&this.loadIdentity()}async saveAvatar(e){let t=this.client,n=this.ownProfile;if(!t||!n||this.identityBusy||this.identityLoading)return;this.identityBusy=`avatar`,this.identityError=null;let r=this.identityRequestId,i=this.displayName,a=i.trim()!==(n.displayName??``),o=!1;try{let s=await W(e);if(t!==this.client||r!==this.identityRequestId)return;let c=await t.request(`users.setAvatar`,{profileId:n.id,mime:s.mime,avatarBase64:s.avatarBase64});if(t!==this.client||r!==this.identityRequestId)return;this.ownProfile=c.profile,this.displayName=a?i:c.profile.displayName??``;let l=b(this.context.gateway.connection.gatewayUrl,c.profile.id,c.profile.updatedAt);l&&this.context.gateway.updateSelfUser?.({avatarUrl:l}),o=!0}catch(e){t===this.client&&r===this.identityRequestId&&(this.identityError=e instanceof Y?S(e.code===`too-large`?`profilePage.identity.avatarErrors.tooLarge`:e.code===`source-too-large`?`profilePage.identity.avatarErrors.sourceTooLarge`:`profilePage.identity.avatarErrors.invalid`):Z(e))}finally{r===this.identityRequestId&&this.identityBusy===`avatar`&&(this.identityBusy=null)}o&&t===this.client&&r===this.identityRequestId&&this.loadIdentity()}renderIdentity(){if(!this.selfUser)return u;if(!this.ownProfile){let e=this.identityLoading?S(`profilePage.identity.loading`):this.identityError?this.identityError:p`<div class="profile-identity-empty">
              <span>${S(`profilePage.identity.notSet`)}</span>
              <button type="button" class="btn btn--sm" @click=${()=>void this.loadIdentity()}>
                ${S(`profilePage.identity.setIdentity`)}
              </button>
            </div>`;return p`<div id=${l.identity}>
        ${L({title:S(`profilePage.identity.title`)},M(e))}
      </div>`}let e=b(this.context.gateway.connection.gatewayUrl,this.ownProfile.id,this.ownProfile.updatedAt);return ie({profile:this.ownProfile,avatarUrl:e,displayName:this.displayName,busy:this.identityLoading?`loading`:this.identityBusy,error:this.identityError,onDisplayNameInput:e=>{this.displayName=e},onSaveDisplayName:()=>void this.saveDisplayName(),onAvatarSelect:e=>void this.saveAvatar(e)})}refreshManually(){this.selfUser&&!this.identityBusy&&!this.identityLoading&&this.loadIdentity()}featuredAgent(){let e=this.context.agents.state.agentsList,t=e?.defaultId??`main`,n=e?.agents.find(e=>e.id===t)??{id:t},a=this.context.agentIdentity.get(t),o=i(n,a),s=r(a?.avatar)??r(n.identity?.emoji)??r(n.identity?.avatar);return{agentId:t,name:a?.name?.trim()||n.identity?.name?.trim()||n.name?.trim()||t,avatarUrl:o,textAvatar:s}}renderAvatar(e,t,n){return e&&e!==this.failedHeroAvatarUrl?p`<img
        class="profile-hero__avatar-image"
        src=${e}
        alt=${n}
        @error=${()=>{this.failedHeroAvatarUrl=e}}
      />`:t?p`<span class="profile-hero__avatar-text">${t}</span>`:p`<span class="profile-hero__avatar-mascot" aria-hidden="true"
      >${w.lobster}</span
    >`}renderHero(){let{agentId:e,name:t,avatarUrl:n,textAvatar:r}=this.featuredAgent();return k(p`
      <section class="profile-hero">
        <div class="profile-hero__avatar">${this.renderAvatar(n,r,t)}</div>
        <div class="profile-hero__name">${t}</div>
        <div class="profile-hero__handle">
          <span>@${e}</span>
          <span class="profile-hero__badge">OpenClaw</span>
        </div>
      </section>
    `)}renderBody(){return!this.connected||!this.client?F(k(M(S(`profilePage.offline`)))):F(p`
      ${this.renderHero()} ${this.renderIdentity()}
      ${k(P({title:S(`profilePage.usageStatistics`),description:S(`profilePage.usageStatisticsDescription`),onClick:()=>this.context.navigate(`usage`)}))}
    `)}render(){return p`
      <section class="content-header">
        <div>
          <div class="page-title">${v(`profile`)}</div>
          <div class="page-subtitle">
            ${_(`profile`)}
            ${N(Q,S(`common.learnMore`))}
          </div>
        </div>
        ${this.selfUser?p`<button
              class="btn profile-refresh"
              ?disabled=${this.identityLoading||this.identityBusy!==null}
              @click=${()=>this.refreshManually()}
            >
              ${this.identityLoading?S(`common.refreshing`):S(`common.refresh`)}
            </button>`:u}
      </section>
      ${D(this.renderBody())}
    `}},n([h({context:y,subscribe:!1})],$.prototype,`context`,void 0),n([m()],$.prototype,`selfUser`,void 0),n([m()],$.prototype,`ownProfile`,void 0),n([m()],$.prototype,`displayName`,void 0),n([m()],$.prototype,`identityLoading`,void 0),n([m()],$.prototype,`identityBusy`,void 0),n([m()],$.prototype,`identityError`,void 0),n([m()],$.prototype,`failedHeroAvatarUrl`,void 0),customElements.get(`openclaw-profile-page`)||customElements.define(`openclaw-profile-page`,$)}))();
//# sourceMappingURL=profile-page-Coe4jM0U.js.map