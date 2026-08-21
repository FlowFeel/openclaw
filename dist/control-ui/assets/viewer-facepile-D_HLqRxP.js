import{n as e,r as t}from"./rolldown-runtime-DaJ6WEGw.js";import{b as n,y as r}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as i,Uc as a}from"./control-ui-core-UWR2ANgr.js";import{K as o,Q as s,W as c,Y as l,it as u}from"./lit-runtime-D5xZwgO1.js";import{o as d,t as f}from"./control-ui-core-BCL4Sy8S.js";import{g as p,gt as m,h}from"./control-ui-core-DS6N4FyQ.js";import{r as g,t as _}from"./control-ui-shared-jMm55vwq.js";import{i as v,n as y,r as b,t as x}from"./identity-avatar-view-BN7xK5rs.js";var S=t({hasMultiplePresenceIdentities:()=>k,hasSessionPresenceViewers:()=>O,presenceViewerLabel:()=>A});function C(e){return e?.trim()||void 0}function w(e){return[...e].map(C).filter(e=>e!==void 0).toSorted()[0]}function T(e){if(!e||typeof e!=`object`)return[];let t=e.presence;return Array.isArray(t)?t:[]}function E(e,t,n){let r=new Map,i=C(t);for(let t of e){if(t.reason===`disconnect`||!t.user?.id)continue;let e=t.user.id,a=r.get(e);a?a.push(t):r.set(e,[t]),!i&&n&&t.instanceId===n&&(i=e)}return{selfUserId:i,users:[...r.entries()].toSorted(([e],[t])=>e<t?-1:+(e>t)).map(([e,t])=>({id:e,name:w(t.map(e=>e.user?.name)),email:w(t.map(e=>e.user?.email)),avatarUrl:w(t.map(e=>e.user?.avatarUrl)),watchedSessions:[...new Set(t.flatMap(e=>e.watchedSessions??[]))].toSorted()}))}}function D(e,t,n){return I&&N===e&&P===t&&F===n?I:(N=e,P=t,F=n,I=E(T(e),t,n),I)}function O(e,t,n,r){let i=D(e,t,n);return i.users.some(e=>e.id!==i.selfUserId&&e.watchedSessions.includes(r))}function k(e){return D(e).users.length>=2}function A(e){return e.name??e.email??e.id}function j(e){let t=l`<span
    class=${e.imageUrl?`viewer-avatar__fallback`:o}
    style=${`background: hsl(${e.fallback.colorSeed%360} 48% 42%)`}
    >${e.fallback.initials}</span
  >`;return e.imageUrl?l`${b({view:e,fallbackSelector:`.viewer-avatar`})}${t}`:t}function M(e){let t=A(e),n=e.email&&e.email!==t?e.email:void 0;return l`<div class="sidebar-hover-card__person" data-viewer-id=${e.id}>
    <openclaw-viewer-avatar .user=${e} variant="footer"></openclaw-viewer-avatar>
    <span class="sidebar-hover-card__person-text">
      <span class="sidebar-hover-card__person-name">${t}</span>
      ${n?l`<span class="sidebar-hover-card__person-email">${n}</span>`:o}
    </span>
  </div>`}var N,P,F,I,L,R,z=e((()=>{c(),s(),g(),f(),i(),y(),h(),m(),n(),L=class extends a{constructor(...e){super(...e),this.user=null,this.variant=`session`}render(){let e=this.user;if(!e)return o;let t=A(e),n=v({id:e.id,name:e.name,username:e.email,profileAvatarUrl:e.avatarUrl});return l`<span
      class=${x(`viewer-avatar viewer-avatar--${this.variant}`,n)}
      data-viewer-id=${e.id}
      aria-label=${t}
    >
      ${j(n)}
    </span>`}},r([u({attribute:!1})],L.prototype,`user`,void 0),r([u()],L.prototype,`variant`,void 0),R=class extends a{constructor(...e){super(...e),this.maxVisible=3,this.variant=`session`,this.buildInfo=_,this.gatewayVersion=null}render(){let e=D(this.presencePayload,this.selfUserId,this.selfInstanceId),t=this.sessionKey,n=t?e.users.filter(n=>n.id!==e.selfUserId&&n.watchedSessions.includes(t)):(this.variant,e.users.filter(t=>t.id!==e.selfUserId));if(n.length===0)return o;let r=n.slice(0,this.maxVisible),i=n.slice(this.maxVisible),a=l`<span
      class="viewer-facepile viewer-facepile--${this.variant}"
      data-viewer-count=${n.length}
      aria-label=${n.map(A).join(`, `)}
    >
      ${r.map(e=>this.variant===`footer`?l`<openclaw-viewer-avatar .user=${e} variant="footer"></openclaw-viewer-avatar>`:l`<openclaw-tooltip .content=${A(e)}>
              <span class="viewer-facepile__tooltip-anchor">
                <openclaw-viewer-avatar .user=${e} variant="session"></openclaw-viewer-avatar>
              </span>
            </openclaw-tooltip>`)}
      ${i.length>0?this.variant===`footer`?l`<span
              class="viewer-avatar viewer-avatar--overflow"
              aria-label=${i.map(A).join(`, `)}
              >+${i.length}</span
            >`:l`<openclaw-tooltip .content=${i.map(A).join(`
`)}>
              <span
                class="viewer-avatar viewer-avatar--overflow"
                aria-label=${i.map(A).join(`, `)}
                >+${i.length}</span
              >
            </openclaw-tooltip>`:o}
    </span>`;if(this.variant!==`footer`)return a;let s=e.users.filter(t=>t.id!==e.selfUserId);return l`
      <openclaw-tooltip class="sidebar-hover-tooltip">
        <span
          class="viewer-facepile-trigger"
          role="group"
          tabindex="0"
          aria-label=${d(`presence.rosterLabel`)}
        >
          ${a}
        </span>
        <div slot="content" class="sidebar-hover-card sidebar-presence-hover-card">
          <section class="sidebar-hover-card__region">
            <div class="sidebar-hover-card__heading">
              ${d(`presence.rosterTitle`)} · ${s.length}
            </div>
            <div
              class="sidebar-hover-card__people"
              tabindex="0"
              aria-label=${`${d(`presence.rosterTitle`)} · ${s.length}`}
            >
              ${s.map(e=>M(e))}
            </div>
          </section>
          <div class="sidebar-hover-card__divider" role="separator"></div>
          <section class="sidebar-hover-card__region">
            <div class="sidebar-hover-card__heading">${d(`presence.serverRegion`)}</div>
            ${p(this.buildInfo,this.gatewayVersion)}
          </section>
        </div>
      </openclaw-tooltip>
    `}},r([u({attribute:!1})],R.prototype,`presencePayload`,void 0),r([u({attribute:!1})],R.prototype,`selfUserId`,void 0),r([u({attribute:!1})],R.prototype,`selfInstanceId`,void 0),r([u({attribute:!1})],R.prototype,`sessionKey`,void 0),r([u({type:Number,attribute:`max-visible`})],R.prototype,`maxVisible`,void 0),r([u()],R.prototype,`variant`,void 0),r([u({attribute:!1})],R.prototype,`buildInfo`,void 0),r([u({attribute:!1})],R.prototype,`gatewayVersion`,void 0),globalThis.customElements&&(customElements.get(`openclaw-viewer-avatar`)||customElements.define(`openclaw-viewer-avatar`,L),customElements.get(`openclaw-viewer-facepile`)||customElements.define(`openclaw-viewer-facepile`,R))}));export{S as i,O as n,z as r,k as t};
//# sourceMappingURL=viewer-facepile-D_HLqRxP.js.map