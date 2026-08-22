import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Ya as t,Za as n,da as r,sa as i}from"./control-ui-core-CrKLOOVi.js";import{K as a,W as o,Y as s}from"./lit-runtime-D5xZwgO1.js";import{o as c,t as l}from"./control-ui-core-DkYXaYTI.js";import{_ as u,vt as d,y as f,yt as p}from"./control-ui-core-CTll8UdE.js";import{D as m,E as h,T as g}from"./app-sidebar-session-types-BKu1VIUT.js";import{s as _,t as v}from"./app-sidebar-nav-menus-D-Bm5K8d.js";import{a as y,n as b,o as x,s as S,t as C}from"./app-sidebar-session-section-header-D7eIZtG8.js";import{n as w,o as T,r as E}from"./provider-icon-akKbHqmY.js";function D(){return s`<span
    class="session-run-spinner"
    role="img"
    aria-label=${c(`sessionsView.activeRun`)}
    title=${c(`sessionsView.activeRun`)}
  ></span>`}function O(e,t){return e?D():t?s`<span
        class="session-unread-dot"
        role="img"
        aria-label=${c(`sessionsView.unread`)}
      ></span>`:a}function k(e){let t=new Set,n=e=>{e&&t.add(`[${e.code}] ${e.message}`)};n(e.error);for(let t of e.hosts)t.error?.code!==`NODE_OFFLINE`&&n(t.error);return[...t]}function A(e){let t=new Map;for(let n of e.liveRows)t.has(n.key)||t.set(n.key,n);return e.catalogs.map(n=>{let r=`catalog:${n.id}`,i=e.collapsedSections.has(r),o=n.hosts,l=S(o,e.creatorId),u=l.flatMap(e=>e.sessions.map(t=>({host:e,session:t}))),f=u.flatMap(({session:e})=>{let n=e.sessionKey?t.get(e.sessionKey):void 0;return n?[n]:[]}),p=f.some(e=>e.hasActiveRun===!0),m=f.some(e=>e.unread===!0),h=e.loadingMoreCatalogIds.has(n.id),g=o.some(e=>!!e.nextCursor),_=n.capabilities.createSession!==void 0,v=k(n),y=v.length>0;if(u.length===0&&!g&&!y&&!n.capabilities.createSession)return a;let x=c(`chat.sidebar.catalogDiscoveryHelp`,{error:v.join(`; `)});return s`
      <div
        class=${[`sidebar-recent-sessions__group`,`sidebar-recent-sessions__group--zone-coding`,i?`sidebar-recent-sessions__group--collapsed`:``,e.draggingSectionId===r?`sidebar-recent-sessions__group--dragging`:``,e.sectionDropTarget?.sectionId===r?`sidebar-recent-sessions__group--section-drop-${e.sectionDropTarget.position}`:``].filter(Boolean).join(` `)}
        data-session-section=${r}
        @dragover=${e.sectionDragDisabledReason?a:t=>e.onSectionDragOver(t,r)}
        @dragleave=${e.sectionDragDisabledReason?a:t=>e.onSectionDragLeave(t,r)}
        @drop=${e.sectionDragDisabledReason?a:t=>e.onSectionDrop(t,r)}
      >
        ${b({sectionId:r,disabledReason:e.sectionDragDisabledReason,onStartDrag:e.onStartSectionDrag,onFinishDrag:e.onFinishSectionDrag,onContextMenu:t=>{t.preventDefault();let r=t.currentTarget,i=r.querySelector(`[data-session-catalog-view-menu]`)??r;e.onOpenViewMenu(n.id,i,{x:t.clientX,y:t.clientY})},content:s`
            <button
              type="button"
              class="sidebar-session-group-toggle"
              aria-expanded=${String(!i)}
              aria-label=${y?`${n.label}: ${x}`:n.label}
              title=${y?x:a}
              @click=${()=>e.onToggleSection(r)}
            >
              ${w(n.id)?T(n.id,{className:`sidebar-session-catalog-provider-icon`}):a}
              <span class="sidebar-recent-sessions__label-text">${n.label}</span>
              <span class="sidebar-session-group-toggle__icon" aria-hidden="true"
                >${i?d.chevronRight:d.chevronDown}</span
              >
              ${O(p,m)}
              ${y||i&&u.length>0?s`<span
                    class="sidebar-session-group-count ${y?`sidebar-session-group-count--error`:``}"
                    data-session-catalog-error=${y?n.id:a}
                    aria-hidden="true"
                    >${y?d.alertTriangle:u.length}</span
                  >`:a}
            </button>
            <button
              type="button"
              class="sidebar-session-group-actions sidebar-session-sort sidebar-session-catalog-grouping ${e.creatorFilterActive?`sidebar-session-sort--filtered`:``}"
              data-session-catalog-view-menu=${n.id}
              title=${c(`chat.sidebar.catalogViewOptions`)}
              aria-label=${c(`chat.sidebar.catalogViewOptions`)}
              aria-haspopup="menu"
              aria-expanded=${String(e.viewMenuOpenCatalogId===n.id)}
              @click=${t=>{t.stopPropagation(),e.onOpenViewMenu(n.id,t.currentTarget)}}
            >
              ${d.listFilter}
            </button>
            ${_?s`<button
                  type="button"
                  class="sidebar-session-group-actions sidebar-session-sort sidebar-session-new sidebar-session-catalog-new"
                  title=${e.newSessionDisabledReason??`${c(`chat.runControls.newSession`)} — ${n.label}`}
                  aria-label=${`${c(`chat.runControls.newSession`)} — ${n.label}`}
                  ?disabled=${!!e.newSessionDisabledReason}
                  @click=${()=>e.onOpenNewSession?.(e.newSessionAgentId,{catalogId:n.id})}
                >
                  ${d.plus}
                </button>`:a}
          `})}
        ${i?a:s`<div class="sidebar-recent-sessions__list">
                ${l.map(r=>j(n,r,t,e))}
              </div>
              ${g?s`<button
                    type="button"
                    class="sidebar-session-catalog-load-more"
                    data-session-catalog-load-more=${n.id}
                    ?disabled=${h}
                    aria-busy=${String(h)}
                    @click=${()=>e.onLoadMore(n.id)}
                  >
                    ${c(`chat.selectors.loadMoreSessions`)}
                  </button>`:a}`}
      </div>
    `})}function j(e,t,n,r){let i=t.error?`[${t.error.code}] ${t.error.message}`:void 0,o=r.projectGrouping===`project`?h(t.sessions):r.projectGrouping===`person`?g(t.sessions):null,c=t.kind!==`gateway`;return s`
    <section class="sidebar-session-catalog-host" data-session-catalog-host=${t.hostId}>
      ${c?s`<div
            class="sidebar-session-catalog-host__head"
            aria-label=${i?`${t.label}: ${i}`:t.label}
            title=${i??t.label}
          >
            <span class="sidebar-session-catalog-host__label">${t.label}</span>
            <span
              class="sidebar-session-catalog-host__count ${t.error?`sidebar-session-catalog-host__count--error`:``}"
              aria-hidden="true"
              >${t.error?d.alertTriangle:t.sessions.length}</span
            >
          </div>`:a}
      <div class="sidebar-session-catalog-host__sessions" role="list" aria-label=${t.label}>
        ${o?s`${o.groups.map(i=>{let o=`catalog-project:${e.id}:${t.hostId}:${i.key}`,c=r.collapsedSections.has(o);return s`
                <button
                  type="button"
                  class="sidebar-session-catalog-project__head"
                  data-session-catalog-project=${i.key}
                  aria-expanded=${String(!c)}
                  title=${i.title}
                  @click=${()=>r.onToggleSection(o)}
                >
                  <span class="sidebar-session-catalog-project__icon" aria-hidden="true"
                    >${c?d.chevronRight:d.chevronDown}</span
                  >
                  <span class="sidebar-session-catalog-project__label">${i.label}</span>
                  <span class="sidebar-session-catalog-project__count" aria-hidden="true"
                    >${i.sessions.length}</span
                  >
                </button>
                ${c?a:i.sessions.map(i=>M(e,t,i,n,r,!0))}
              `})}
            ${o.ungrouped.map(i=>M(e,t,i,n,r))}`:t.sessions.map(i=>M(e,t,i,n,r))}
      </div>
    </section>
  `}function M(e,n,i,o,l,u=!1){let p=i.recencyAt??i.updatedAt??i.createdAt,m=typeof p==`number`&&p<0xe8d4a51000?p*1e3:p,h=i.sessionKey?o.get(i.sessionKey):void 0;if(h){let e=i.name||i.threadId;return l.renderLiveRow(h,{label:e,meta:y(m),title:`${e} · ${n.label}`,...i.pullRequest?{pullRequest:i.pullRequest}:{}})}let g={catalogId:e.id,hostId:n.hostId,threadId:i.threadId},v=i.sessionKey??t(g),b=i.name||i.threadId,x=y(m),S=`chat`,{href:C,options:w}=r({face:S,sessionKey:v,fallbackAgentId:l.newSessionAgentId,basePath:l.basePath,mainKey:l.mainKey}),T=l.routeSessionKey!==``&&v===l.routeSessionKey,E=i.status===`active`||i.status===`running`,O=i.canOpenTerminal===!0&&l.terminalAvailable,k=()=>l.onOpenTerminal(g),A=(e,t,n)=>l.onOpenMenu({key:g,routeId:S,navigation:w,canOpenTerminal:i.canOpenTerminal===!0,meta:x},e,t,n);return s`
    <div
      class="sidebar-recent-session session-row-host ${T?`sidebar-recent-session--active`:``} ${u?`sidebar-recent-session--catalog-project-child`:``} ${E?`session-row-host--running`:``}"
      data-session-key=${v}
      role="listitem"
      @contextmenu=${e=>{e.preventDefault(),A(e.clientX,e.clientY)}}
    >
      <a
        href=${C}
        class="sidebar-recent-session__link"
        title=${`${b} · ${n.label}`}
        aria-current=${T?`page`:a}
        @click=${e=>{_(e)&&(e.preventDefault(),l.catalogOpenTarget===`terminal`&&O?k():l.onNavigate?.(S,w))}}
      >
        <span class="sidebar-session-indicator"
          >${E?D():s`<span class="sidebar-session-indicator__dot" aria-hidden="true"></span>`}</span
        >
        <span class="sidebar-recent-session__text">
          <span class="sidebar-recent-session__name hover-marquee">${b}</span>
        </span>
        ${f({hasAutomation:!1,pullRequest:i.pullRequest})}
      </a>
      <span class="sidebar-recent-session__aside session-row-aside">
        <span class="session-row-actions">
          <button
            class="session-action"
            data-catalog-session-menu="true"
            type="button"
            title=${c(`chat.sidebar.openSessionMenu`)}
            aria-label=${c(`chat.sidebar.openSessionMenu`)}
            aria-haspopup="menu"
            @click=${e=>{e.stopPropagation();let t=e.currentTarget,n=t.getBoundingClientRect();A(n.right,n.bottom+4,t)}}
          >
            ${d.moreHorizontal}
          </button>
        </span>
      </span>
    </div>
  `}e((()=>{o(),l(),n(),m(),i(),v(),x(),C(),p(),E(),u()}))();export{A as renderSessionCatalogGroups};
//# sourceMappingURL=app-sidebar-session-catalog-render-ByBApMQi.js.map