import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Si as t,vi as n}from"./control-ui-core-UWR2ANgr.js";import{K as r,W as i,Y as a}from"./lit-runtime-D5xZwgO1.js";import{Ft as o,Ht as s,Mt as c,Nt as l,Pt as u,Rt as d,Wt as f,jt as p,kt as m,rn as h,un as g}from"./control-ui-core-DDTXn_ud.js";import{o as _,t as v}from"./control-ui-core-BCL4Sy8S.js";import{at as y,ct as b,ot as x,vt as S,yt as C}from"./control-ui-core-DS6N4FyQ.js";function w(e){return!e.defaultPrevented&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey}function T(e,t){return e===void 0?!1:t===`config`?u(e):t===`plugins`?c(e):t===`sessions`?l(e):e===t}function E(e){let t=e??[];return[`chat`,`control`,`agent`,`settings`].flatMap(e=>t.filter(t=>(t.group??`control`)===e))}function D(e){return a`
    <a
      href=${e.href}
      class="nav-item ${e.active?`nav-item--active`:``}"
      @focus=${t=>e.onPreload(t)}
      @blur=${e.onCancelPreload}
      @pointerenter=${t=>e.onPreload(t)}
      @pointerleave=${e.onCancelPreload}
      @touchstart=${t=>e.onPreload(t,!0)}
      @click=${t=>{w(t)&&(t.preventDefault(),e.onNavigate())}}
    >
      <span class="nav-item__icon" aria-hidden="true"
        >${S[o(e.routeId)]}</span
      >
      <span class="nav-item__text">${f(e.routeId)}</span>
    </a>
  `}function O(e){let n=t({pluginId:e.tab.pluginId,id:e.tab.id}),i=Object.hasOwn(S,e.tab.icon)?e.tab.icon:`puzzle`;return a`
    <a
      href=${`${g(`plugin`,e.basePath)}${n}`}
      class="nav-item ${e.active?`nav-item--active`:``}"
      aria-current=${e.active?`page`:r}
      @click=${t=>{w(t)&&(t.preventDefault(),e.onNavigate(n))}}
    >
      <span class="nav-item__icon" aria-hidden="true">${S[i]}</span>
      <span class="nav-item__text">${e.tab.label}</span>
    </a>
  `}function k(e,t){let n=T(e.activeRouteId,t)&&!(t===`workboard`&&e.activeWorkboardBoardId);return a`
    <wa-dropdown-item
      value=${t}
      class="sidebar-customize-menu__item ${n?`sidebar-customize-menu__item--active`:``}"
      aria-current=${n?`page`:r}
      @pointerenter=${n=>e.onPreloadRoute(t,n)}
      @pointerleave=${e.onCancelPreload}
      @click=${e=>{if(!w(e)){e.currentTarget.dataset.nativeNavigation=`true`;return}e.preventDefault()}}
    >
      <a href=${g(t,e.basePath)} tabindex="-1">
        <span class="nav-item__icon" aria-hidden="true"
          >${S[o(t)]}</span
        >
        <span class="sidebar-customize-menu__text">${f(t)}</span>
      </a>
    </wa-dropdown-item>
  `}function A(e){let t=e.position;if(!t)return r;let n=s(e.sidebarEntries).filter(t=>e.isRouteEnabled(t));return a`
    <openclaw-menu-surface>
      <wa-dropdown
        class="sidebar-customize-menu sidebar-more-menu"
        .open=${!0}
        placement="bottom-start"
        .distance=${0}
        aria-label=${_(`nav.more`)}
        @wa-select=${t=>{t.preventDefault();let r=t.detail.item;if(r.dataset.nativeNavigation){delete r.dataset.nativeNavigation;return}let i=r.value;if(i===`customize`){e.onEditPinnedItems();return}i&&n.includes(i)&&e.onNavigateRoute(i)}}
        @keydown=${t=>b(t,e.onTabAway)}
        @wa-after-hide=${t=>e.onClose(y(t))}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${_(`nav.more`)}
          style="position: fixed; left: ${t.x}px; top: ${t.y}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        ${n.map(t=>k(e,t))}
        <div class="sidebar-customize-menu__separator" role="separator"></div>
        <wa-dropdown-item class="sidebar-customize-menu__item" value="customize">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${S.penLine}</span>
          <span class="sidebar-customize-menu__text">${_(`nav.customize`)}</span>
        </wa-dropdown-item>
      </wa-dropdown>
    </openclaw-menu-surface>
  `}function j(e){let t=e.position;return t?a`
    <openclaw-menu-surface>
      <wa-dropdown
        class="sidebar-customize-menu sidebar-pin-editor-menu"
        .open=${!0}
        placement="bottom-start"
        .distance=${0}
        aria-label=${_(`nav.customize`)}
        @wa-select=${t=>{t.preventDefault();let n=t.detail.item.value;if(n===`reset`)e.onReset();else if(n?.startsWith(`workboard:`)){let t=n.slice(10);e.workboardBoards.some(e=>e.id===t)&&e.onToggleWorkboardBoard(t)}else n&&m.includes(n)&&e.onToggleRoute(n)}}
        @keydown=${t=>b(t,e.onTabAway)}
        @wa-after-hide=${t=>e.onClose(y(t))}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${_(`nav.customize`)}
          style="position: fixed; left: ${t.x}px; top: ${t.y}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        <div class="sidebar-customize-menu__title">${_(`nav.customize`)}</div>
        ${m.filter(t=>e.isRouteEnabled(t)).map(t=>a`
            <wa-dropdown-item
              class="sidebar-customize-menu__item"
              type="checkbox"
              value=${t}
              .checked=${e.sidebarEntries.includes(d({type:`route`,route:t}))}
            >
              <span slot="icon" class="nav-item__icon" aria-hidden="true"
                >${S[o(t)]}</span
              >
              <span class="sidebar-customize-menu__text">${f(t)}</span>
            </wa-dropdown-item>
          `)}
        ${e.isRouteEnabled(`workboard`)&&e.workboardBoards.length>0?e.workboardRenderers?.renderCustomize(e.workboardBoards,e.sidebarEntries):r}
        <div class="sidebar-customize-menu__separator" role="separator"></div>
        <wa-dropdown-item class="sidebar-customize-menu__item" value="reset">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${S.refresh}</span>
          <span class="sidebar-customize-menu__text">${_(`nav.customizeReset`)}</span>
        </wa-dropdown-item>
      </wa-dropdown>
    </openclaw-menu-surface>
  `:r}var M=e((()=>{i(),p(),h(),v(),n(),C(),x()}));export{D as a,E as c,A as i,T as n,O as o,j as r,w as s,M as t};
//# sourceMappingURL=app-sidebar-nav-menus-BXC79MJp.js.map