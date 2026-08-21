import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Cs as t,Da as n,Ho as r,In as i,Ln as a,Oa as o,Rn as s,Ro as c,_s as l,fs as u,us as d}from"./control-ui-core-UWR2ANgr.js";import{C as f,K as p,W as m,Y as h,_ as g,b as _,w as v}from"./lit-runtime-D5xZwgO1.js";import{C as ee,Et as y,Rt as b,S as x,Wt as S,jt as C,rn as te,sn as ne,x as re}from"./control-ui-core-DDTXn_ud.js";import{o as w,t as T}from"./control-ui-core-BCL4Sy8S.js";import{at as E,ct as D,m as ie,ot as O,st as k,vt as A,yt as j}from"./control-ui-core-DS6N4FyQ.js";import{i as ae,n as oe}from"./gateway-runtime-DWs8EJ0W.js";import{a as M,i as N,o as P}from"./app-sidebar-session-types-Df1ogUbR.js";import{i as F,r as I,t as L}from"./app-sidebar-nav-menus-BXC79MJp.js";import{l as R,u as z}from"./session-pull-requests-LB7bTZ84.js";import{f as B,u as V}from"./question-prompt-B_2oqg5u.js";import{n as H,t as U}from"./open-external-url-BZscHSJ3.js";import{i as W,n as G,r as K}from"./agent-select-Da_Tqq52.js";function q(){return/Mac|iPhone|iPad|iPod/u.test(globalThis.navigator?.platform??``)}function se(e){let{agents:t,activeId:n}=e,i=new Set(t.map(e=>l(e.id))),a=new Set(e.pinnedAgentIds.map(e=>l(e)).filter(e=>i.has(e))),o=t.toSorted((e,t)=>!a.has(l(e.id))-+!a.has(l(t.id)));if(t.length<=Y)return{rows:o,showFilter:!1};let s=e.filter.trim().toLowerCase();if(s)return{rows:o.filter(t=>{let n=l(t.id);return n.toLowerCase().includes(s)||(e.identities.get(n)?.name?.trim()||r(t)).toLowerCase().includes(s)}),showFilter:!0};if(a.size>0)return{rows:o.filter(e=>{let t=l(e.id);return a.has(t)||t===n}),showFilter:!0};let c=o.slice(0,Y);if(!c.some(e=>l(e.id)===n)){let e=o.find(e=>l(e.id)===n);e&&(c=[...c.slice(0,Y-1),e])}return{rows:c,showFilter:!0}}function ce(e,t){let n=l(e.id),i=t.identities.get(n)??null,a=i?.name?.trim()||r(e),o=n===t.activeId,s=o?0:t.agentUnreadCount(n),c=t.agentApprovalCount(n),u=w(c===1?`execApproval.agentPendingOne`:`execApproval.agentPending`,{count:String(c)}),d={value:n,label:a,agent:e};return h`
    <wa-dropdown-item
      class="sidebar-customize-menu__item sidebar-agent-menu__agent-switch agent-select__option"
      value=${`${X}${encodeURIComponent(n)}`}
      type="checkbox"
      role="menuitemradio"
      aria-checked=${String(o)}
      ${_(e=>k(e,o))}
    >
      <span slot="icon">${K(d,i)}</span>
      ${W(d)}
      ${c>0?h`<span
            slot="details"
            class="sidebar-agent-approval-count"
            aria-label=${u}
            title=${u}
            >${c}</span
          >`:p}
      ${o?h`<span slot="details" class="session-menu__check" aria-hidden="true"
            >${A.check}</span
          >`:p}
      ${s>0?h`<span
            slot="details"
            class="session-unread-dot"
            role="img"
            aria-label=${w(`sessionsView.unread`)}
          ></span>`:p}
    </wa-dropdown-item>
  `}function le(){return h`
    ${J.map(e=>h`
        <wa-dropdown-item
          slot="submenu"
          class="sidebar-customize-menu__item"
          value=${`${Q}${encodeURIComponent(e.href)}`}
          @click=${e=>{e.target instanceof Element&&e.target.closest(`a`)&&(e.currentTarget.dataset.nativeNavigation=`true`)}}
        >
          <a
            href=${e.href}
            target=${i}
            rel=${a()}
            tabindex="-1"
          >
            <span slot="icon" class="nav-item__icon" aria-hidden="true">${A[e.icon]}</span>
            <span class="sidebar-customize-menu__text">${e.label()}</span>
          </a>
        </wa-dropdown-item>
      `)}
  `}function ue(e){let t=e.position;if(!t)return p;let{activeId:n,activeName:r,agents:i}=e,{rows:a,showFilter:o}=se(e);return h`
    <openclaw-menu-surface>
      <wa-dropdown
        class="sidebar-customize-menu sidebar-agent-menu"
        .open=${!0}
        placement="bottom-start"
        .distance=${0}
        aria-label=${w(`agentChip.menuLabel`)}
        @wa-select=${t=>{t.preventDefault();let r=t.detail.item;if(r.dataset.nativeNavigation){delete r.dataset.nativeNavigation,e.onClose(!1);return}let i=r.value;if(i){if(e.onClose(!1),i.startsWith(X)){e.onSwitchAgent(decodeURIComponent(i.slice(6)));return}switch(i){case`${Z}capabilities`:e.onAskCapabilities(n);break;case`${Z}agent-settings`:e.onNavigate(`agents`,{pathname:ne(n,null,e.basePath)});break;case`${Z}new-agent`:e.onNavigate(`custodian`,{search:`?intent=new-agent`});break}}}}
        @wa-after-show=${e=>{o&&e.currentTarget.querySelector(`.sidebar-agent-menu__filter input`)?.focus()}}
        @keydown=${t=>D(t,e.onTabAway)}
        @wa-after-hide=${t=>e.onClose(E(t))}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${w(`agentChip.menuLabel`)}
          style="position: fixed; left: ${t.x}px; top: ${t.top}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        ${i.length>1?h`
              <div class="sidebar-customize-menu__title">${w(`agentChip.agents`)}</div>
              ${o?h`
                    <div class="sidebar-agent-menu__filter">
                      <input
                        type="text"
                        .value=${e.filter}
                        placeholder=${w(`agentChip.filterAgents`)}
                        aria-label=${w(`agentChip.filterAgents`)}
                        @input=${t=>e.onFilterChange(t.target.value)}
                        @keydown=${e=>{if(e.key===`ArrowDown`||e.key===`ArrowUp`){e.preventDefault(),e.stopPropagation();let t=e.currentTarget.closest(`wa-dropdown`),n=Array.from(t?.children??[]).filter(e=>e instanceof HTMLElement&&e.localName===`wa-dropdown-item`&&!e.hasAttribute(`disabled`)),r=e.key===`ArrowDown`?n.at(0):n.at(-1);r&&(n.forEach(e=>e.active=e===r),r.focus({preventScroll:!0}));return}e.key!==`Escape`&&e.key!==`Tab`&&e.stopPropagation()}}
                      />
                    </div>
                  `:p}
              ${a.map(t=>ce(t,e))}
              ${a.length===0?h`<div class="sidebar-agent-menu__empty">
                    ${w(`agentChip.noAgentMatches`)}
                  </div>`:p}
            `:p}
        <wa-dropdown-item class="sidebar-customize-menu__item" value="command:new-agent">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.users}</span>
          <span class="sidebar-customize-menu__text">${w(`custodian.newAgent`)}</span>
        </wa-dropdown-item>
        <div class="sidebar-customize-menu__separator" role="separator"></div>
        <wa-dropdown-item
          class="sidebar-customize-menu__item"
          value="command:capabilities"
          ?disabled=${!e.connected}
        >
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.bot}</span>
          <span class="sidebar-customize-menu__text">
            ${w(`agentChip.whatCanAgentDo`,{name:r})}
          </span>
        </wa-dropdown-item>
        <wa-dropdown-item class="sidebar-customize-menu__item" value="command:agent-settings">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.users}</span>
          <span class="sidebar-customize-menu__text">${w(`agentChip.agentSettings`)}</span>
        </wa-dropdown-item>
      </wa-dropdown>
    </openclaw-menu-surface>
  `}function de(e){let t=e.position;if(!t)return p;let n=e.selfEmail??e.selfName;return h`
    <openclaw-menu-surface>
      <wa-dropdown
        class="sidebar-customize-menu sidebar-identity-menu"
        style=${`--sidebar-identity-menu-min-width: ${e.triggerWidth}px`}
        .open=${!0}
        placement="top-start"
        .distance=${0}
        aria-label=${w(`profilePage.identity.menuLabel`)}
        @wa-select=${t=>{t.preventDefault();let n=t.detail.item;if(n.dataset.nativeNavigation){delete n.dataset.nativeNavigation,e.onClose(!1);return}let r=n.value;if(r){if(e.onClose(!1),r.startsWith(Q)){H(decodeURIComponent(r.slice(5)));return}switch(r){case`${Z}profile`:e.onNavigate(`profile`,{hash:`#settings-profile-identity`});break;case`${Z}settings`:e.onNavigate(`appearance`);break;case`${Z}usage`:e.onNavigate(`usage`);break;case`${Z}pair-mobile`:e.onPairMobile();break;case`${Z}apps`:e.onNavigate(`apps`);break;case`${Z}retry-connect`:e.onRetryConnect?.();break}}}}
        @keydown=${t=>D(t,e.onTabAway)}
        @wa-after-hide=${t=>e.onClose(E(t))}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${w(`profilePage.identity.menuLabel`)}
          style="position: fixed; left: ${t.x}px; bottom: ${t.bottom}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        ${n?h`<wa-dropdown-item class="sidebar-identity-menu__header" value="command:profile">
                ${n}
              </wa-dropdown-item>
              <div class="sidebar-customize-menu__separator" role="separator"></div>`:p}
        <wa-dropdown-item class="sidebar-customize-menu__item" value="command:settings">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.settings}</span>
          <span class="sidebar-customize-menu__text">${w(`nav.settings`)}</span>
          <span slot="details" class="session-menu__shortcut" aria-hidden="true"
            >${q()?`⌘⇧,`:`Ctrl+Shift+,`}</span
          >
        </wa-dropdown-item>
        <wa-dropdown-item class="sidebar-customize-menu__item" value="command:usage">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.coins}</span>
          <span class="sidebar-customize-menu__text">${S(`usage`)}</span>
        </wa-dropdown-item>
        <wa-dropdown-item
          class="sidebar-customize-menu__item sidebar-pair-mobile"
          value="command:pair-mobile"
          ?disabled=${!e.canPairDevice}
          title=${e.canPairDevice?p:w(`nodes.pairing.adminRequired`)}
        >
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.smartphone}</span>
          <span class="sidebar-customize-menu__text">${w(`nodes.pairing.button`)}</span>
        </wa-dropdown-item>
        <wa-dropdown-item class="sidebar-customize-menu__item" value="command:apps">
          <span slot="icon" class="nav-item__icon" aria-hidden="true">${A.layoutGrid}</span>
          <span class="sidebar-customize-menu__text">${w(`agentChip.getApps`)}</span>
        </wa-dropdown-item>
        <wa-dropdown-item
          class="sidebar-customize-menu__item sidebar-identity-menu__help"
          value="command:help"
        >
          <span slot="icon" class="nav-item__icon" aria-hidden="true"
            >${A.circleQuestionMark}</span
          >
          <span class="sidebar-customize-menu__text">${w(`agentChip.help`)}</span>
          ${le()}
        </wa-dropdown-item>
        ${e.offline?h`<div class="sidebar-customize-menu__separator" role="separator"></div>
              <wa-dropdown-item
                class="sidebar-customize-menu__item sidebar-identity-menu__retry"
                value="command:retry-connect"
              >
                <span class="sidebar-customize-menu__text">${w(`connection.retryNow`)}</span>
              </wa-dropdown-item>`:p}
        <div class="sidebar-customize-menu__separator" role="separator"></div>
        <div class="sidebar-identity-menu__footer">
          <openclaw-sidebar-build-chip
            .basePath=${e.basePath}
            .gatewayVersion=${e.gatewayVersion}
            .onNavigate=${t=>{e.onClose(),e.onNavigate(t)}}
          ></openclaw-sidebar-build-chip>
          <span class="sidebar-mode-switch">
            <openclaw-theme-mode-toggle .mode=${e.themeMode}></openclaw-theme-mode-toggle>
          </span>
        </div>
      </wa-dropdown>
    </openclaw-menu-surface>
  `}var J,Y,X,Z,Q,fe=e((()=>{m(),g(),C(),te(),T(),c(),s(),U(),u(),G(),j(),ie(),O(),J=[{href:`https://docs.openclaw.ai`,icon:`book`,label:()=>w(`common.docs`)},{href:`https://docs.openclaw.ai/help`,icon:`messageSquare`,label:()=>w(`agentChip.getHelp`)},{href:`https://discord.gg/clawd`,icon:`users`,label:()=>w(`agentChip.discord`)},{href:`https://docs.openclaw.ai/releases`,icon:`scrollText`,label:()=>w(`agentChip.viewChangelog`)}],Y=10,X=`agent:`,Z=`command:`,Q=`link:`}));function pe(e){let t=e.menu;return t?v(t,h`
      <openclaw-menu-surface>
        <wa-dropdown
          class="session-menu sidebar-session-group-menu"
          .open=${!0}
          placement="bottom-start"
          .distance=${0}
          aria-label=${w(`sessionsView.groupMenu`,{group:t.group})}
          @wa-select=${n=>{n.preventDefault();let r=n.detail.item.value;(r===`rename-group`||r===`new-group`||r===`delete-group`)&&!e.actionDisabledReasons?.[r]&&e.onAction(r,t.group)}}
          @keydown=${t=>D(t,()=>e.trigger?.focus())}
          @wa-after-hide=${t=>e.onClose(E(t))}
        >
          <button
            slot="trigger"
            type="button"
            tabindex="-1"
            aria-hidden="true"
            aria-label=${w(`sessionsView.groupMenu`,{group:t.group})}
            style="position: fixed; left: ${t.x}px; top: ${t.y}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
          ></button>
          <wa-dropdown-item
            class="session-menu__item"
            value="rename-group"
            ?disabled=${!e.connected||!!e.actionDisabledReasons?.[`rename-group`]}
            title=${e.actionDisabledReasons?.[`rename-group`]??p}
          >
            <span slot="icon" class="session-menu__icon" aria-hidden="true">${A.edit}</span>
            <span class="session-menu__text">${w(`sessionsView.renameGroupMenu`)}</span>
          </wa-dropdown-item>
          <wa-dropdown-item
            class="session-menu__item"
            value="new-group"
            ?disabled=${!e.connected||!!e.actionDisabledReasons?.[`new-group`]}
            title=${e.actionDisabledReasons?.[`new-group`]??p}
          >
            <span slot="icon" class="session-menu__icon" aria-hidden="true">${A.folder}</span>
            <span class="session-menu__text">${w(`sessionsView.newGroup`)}</span>
          </wa-dropdown-item>
          <div class="session-menu__separator" role="separator"></div>
          <wa-dropdown-item
            class="session-menu__item session-menu__item--destructive"
            value="delete-group"
            variant="danger"
            ?disabled=${!e.connected||!!e.actionDisabledReasons?.[`delete-group`]}
            title=${e.actionDisabledReasons?.[`delete-group`]??p}
          >
            <span slot="icon" class="session-menu__icon" aria-hidden="true">${A.trash}</span>
            <span class="session-menu__text">${w(`sessionsView.deleteGroupMenu`)}</span>
          </wa-dropdown-item>
        </wa-dropdown>
      </openclaw-menu-surface>
    `):p}function me(e){let t=e.position;if(!t)return p;let n=[{grouping:`project`,label:w(`chat.sidebar.catalogGroupByProject`)},{grouping:`person`,label:w(`chat.sidebar.catalogGroupByPerson`)},{grouping:`none`,label:w(`sessionsView.groupByNone`)}];return v(t,h`
      <openclaw-menu-surface>
        <wa-dropdown
          class="sidebar-session-sort-menu sidebar-catalog-view-menu"
          .open=${!0}
          placement="bottom-start"
          .distance=${0}
          aria-label=${w(`chat.sidebar.catalogViewOptions`)}
          @wa-select=${t=>{t.preventDefault();let n=t.detail.item.value;n?.startsWith(`grouping:`)?e.onGroupingChange(n.slice(9)):n?.startsWith(`creator:`)?e.onCreatorFilterChange(n.slice(8)||null):n===`hide-catalog`&&e.onHide()}}
          @keydown=${t=>D(t,()=>e.trigger?.focus())}
          @wa-after-hide=${t=>e.onClose(E(t))}
        >
          <button
            slot="trigger"
            type="button"
            tabindex="-1"
            aria-hidden="true"
            aria-label=${w(`chat.sidebar.catalogViewOptions`)}
            style="position: fixed; left: ${t.x}px; top: ${t.y}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
          ></button>
          <div class="sidebar-session-sort-menu__title">${w(`sessionsView.groupBy`)}</div>
          ${n.map(t=>h`
              <wa-dropdown-item
                class="sidebar-session-sort-menu__item"
                value=${`grouping:${t.grouping}`}
                role="menuitemradio"
                aria-checked=${String(e.grouping===t.grouping)}
                ${_(n=>k(n,e.grouping===t.grouping))}
              >
                <span slot="details" class="session-menu__check" aria-hidden="true"
                  >${e.grouping===t.grouping?A.check:p}</span
                >
                <span class="session-menu__text">${t.label}</span>
              </wa-dropdown-item>
            `)}
          ${e.creators.length>=2?h`
                <div class="session-menu__separator" role="separator"></div>
                <div class="sidebar-session-sort-menu__title">${w(`sessionsView.people`)}</div>
                <wa-dropdown-item
                  class="sidebar-session-sort-menu__item"
                  value="creator:"
                  role="menuitemradio"
                  aria-checked=${String(e.creatorFilterId===null)}
                  ${_(t=>k(t,e.creatorFilterId===null))}
                >
                  <span slot="details" class="session-menu__check" aria-hidden="true"
                    >${e.creatorFilterId===null?A.check:p}</span
                  >
                  <span class="session-menu__text">${w(`sessionsView.allCreators`)}</span>
                </wa-dropdown-item>
                ${e.creators.map(t=>h`
                    <wa-dropdown-item
                      class="sidebar-session-sort-menu__item"
                      value=${`creator:${t.id}`}
                      role="menuitemradio"
                      aria-checked=${String(e.creatorFilterId===t.id)}
                      ${_(n=>k(n,e.creatorFilterId===t.id))}
                    >
                      <span slot="details" class="session-menu__check" aria-hidden="true"
                        >${e.creatorFilterId===t.id?A.check:p}</span
                      >
                      ${B(t,`row`,`created`)}
                      <span class="session-menu__text">${t.label??t.id}</span>
                    </wa-dropdown-item>
                  `)}
              `:p}
          <div class="session-menu__separator" role="separator"></div>
          <wa-dropdown-item class="sidebar-session-sort-menu__item" value="hide-catalog">
            <span class="session-menu__text">${w(`chat.sidebar.hideFromSidebar`)}</span>
          </wa-dropdown-item>
        </wa-dropdown>
      </openclaw-menu-surface>
    `)}function he(e){let t=e.position;if(!t)return p;let n=[{grouping:`category`,label:w(`sessionsView.groupByCategory`)},{grouping:`none`,label:w(`sessionsView.groupByNone`)}];return v(t,h`
      <openclaw-menu-surface>
        <wa-dropdown
          class="sidebar-session-sort-menu"
          .open=${!0}
          placement="bottom-start"
          .distance=${0}
          aria-label=${w(`chat.sidebar.sortSessions`)}
          @wa-select=${t=>{t.preventDefault();let n=t.detail.item.value;n?.startsWith(`grouping:`)?e.onGroupingChange(n.slice(9)):n?.startsWith(`sort:`)?e.onSortModeChange(n.slice(5)):n?.startsWith(`status:`)?e.onStatusFilterChange(n.slice(7)):n?.startsWith(`creator:`)?e.onCreatorFilterChange(n.slice(8)||null):n===`show-cron`&&e.onShowCronChange(!e.showCron)}}
          @keydown=${t=>D(t,()=>e.trigger?.focus())}
          @wa-after-hide=${t=>e.onClose(E(t))}
        >
          <button
            slot="trigger"
            type="button"
            tabindex="-1"
            aria-hidden="true"
            aria-label=${w(`chat.sidebar.sortSessions`)}
            style="position: fixed; left: ${t.x}px; top: ${t.y}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
          ></button>
          <div class="sidebar-session-sort-menu__title">${w(`sessionsView.groupBy`)}</div>
          ${n.map(t=>h`
              <wa-dropdown-item
                class="sidebar-session-sort-menu__item"
                value=${`grouping:${t.grouping}`}
                role="menuitemradio"
                aria-checked=${String(e.grouping===t.grouping)}
                ${_(n=>k(n,e.grouping===t.grouping))}
              >
                <span slot="details" class="session-menu__check" aria-hidden="true"
                  >${e.grouping===t.grouping?A.check:p}</span
                >
                <span class="session-menu__text">${t.label}</span>
              </wa-dropdown-item>
            `)}
          <div class="session-menu__separator" role="separator"></div>
          <div class="sidebar-session-sort-menu__title">${w(`chat.sidebar.sortBy`)}</div>
          ${N.map(t=>h`
              <wa-dropdown-item
                class="sidebar-session-sort-menu__item"
                value=${`sort:${t.mode}`}
                role="menuitemradio"
                aria-checked=${String(e.sortMode===t.mode)}
                ${_(n=>k(n,e.sortMode===t.mode))}
              >
                <span slot="details" class="session-menu__check" aria-hidden="true"
                  >${e.sortMode===t.mode?A.check:p}</span
                >
                <span class="session-menu__text">${w(t.labelKey)}</span>
              </wa-dropdown-item>
            `)}
          <div class="session-menu__separator" role="separator"></div>
          <div class="sidebar-session-sort-menu__title">${w(`sessionsView.status`)}</div>
          ${M.map(t=>h`
              <wa-dropdown-item
                class="sidebar-session-sort-menu__item"
                value=${`status:${t}`}
                role="menuitemradio"
                aria-checked=${String(e.statusFilter===t)}
                ${_(n=>k(n,e.statusFilter===t))}
              >
                <span slot="details" class="session-menu__check" aria-hidden="true"
                  >${e.statusFilter===t?A.check:p}</span
                >
                <span class="session-menu__text"
                  >${w(t===`active`?`common.active`:t===`archived`?`sessionsView.archived`:`sessionsView.all`)}</span
                >
              </wa-dropdown-item>
            `)}
          ${e.creators.length>=2?h`
                <div class="session-menu__separator" role="separator"></div>
                <div class="sidebar-session-sort-menu__title">${w(`sessionsView.people`)}</div>
                <wa-dropdown-item
                  class="sidebar-session-sort-menu__item"
                  value="creator:"
                  role="menuitemradio"
                  aria-checked=${String(e.creatorFilterId===null)}
                  ${_(t=>k(t,e.creatorFilterId===null))}
                >
                  <span slot="details" class="session-menu__check" aria-hidden="true"
                    >${e.creatorFilterId===null?A.check:p}</span
                  >
                  <span class="session-menu__text">${w(`sessionsView.allCreators`)}</span>
                </wa-dropdown-item>
                ${e.creators.map(t=>h`
                    <wa-dropdown-item
                      class="sidebar-session-sort-menu__item"
                      value=${`creator:${t.id}`}
                      role="menuitemradio"
                      aria-checked=${String(e.creatorFilterId===t.id)}
                      ${_(n=>k(n,e.creatorFilterId===t.id))}
                    >
                      <span slot="details" class="session-menu__check" aria-hidden="true"
                        >${e.creatorFilterId===t.id?A.check:p}</span
                      >
                      ${B(t,`row`,`created`)}
                      <span class="session-menu__text">${t.label??t.id}</span>
                    </wa-dropdown-item>
                  `)}
              `:p}
          <div class="session-menu__separator" role="separator"></div>
          <wa-dropdown-item
            class="sidebar-session-sort-menu__item"
            type="checkbox"
            value="show-cron"
            .checked=${e.showCron}
          >
            <span class="session-menu__text">${w(`sessionsView.showCronSessions`)}</span>
          </wa-dropdown-item>
        </wa-dropdown>
      </openclaw-menu-surface>
    `)}var ge=e((()=>{m(),f(),g(),T(),P(),j(),V(),O()}));function _e(e,t,n){let r=t=>{let n=o(e,t);return n.allowed?void 0:n.reason},i=r({method:`sessions.patch`,params:{key:t.key,label:null}}),a=r({method:`sessions.groups.put`,requiredScope:`operator.write`}),s=(n??[t]).map(e=>r({method:`sessions.delete`,params:{key:e.key,...e.archived?{archivedOnly:!0}:{}}})).find(e=>!!e);return{...i?{"toggle-pin":i,"set-icon":i,"toggle-unread":i,rename:i,"move-to-group":i,"toggle-archived":i}:{},...a||i?{"new-group":a??i}:{},...s?{delete:s}:{},...n?{}:{...r({method:`sessions.create`,params:{parentSessionKey:t.key,fork:!0}})?{fork:r({method:`sessions.create`,params:{parentSessionKey:t.key,fork:!0}})}:{},...r({method:`sessions.reclaim`,requiredScope:`operator.admin`})?{"stop-cloud-worker":r({method:`sessions.reclaim`,requiredScope:`operator.admin`})}:{}}}}function ve(e){let{host:t}=e,n=e.customizeMenuPosition,r=e.customizeMenuTrigger;return I({position:n,sidebarEntries:t.sidebarEntries,isRouteEnabled:t=>e.isRouteEnabled(t),workboardBoards:t.workboardBoards,workboardRenderers:t.workboardRenderers,onTabAway:()=>r?.focus(),onClose:t=>{e.customizeMenuPosition===n&&e.closeCustomizeMenu({restoreFocus:t})},onToggleRoute:e=>{let n=b({type:`route`,route:e}),r=t.reconciledSidebarZone().sidebarEntries,i=r.includes(n)?r.filter(e=>e!==n):[...r,n];t.onUpdateSidebarEntries?.(i)},onToggleWorkboardBoard:e=>{let n=b({type:`workboard`,boardId:e}),r=t.reconciledSidebarZone().sidebarEntries,i=r.includes(n)?r.filter(e=>e!==n):[...r,n];t.onUpdateSidebarEntries?.(i)},onReset:()=>{let n=t.reconciledSidebarZone().sidebarEntries.filter(e=>e.startsWith(`session:`));t.onUpdateSidebarEntries?.([...y,...n]),e.closeCustomizeMenu({restoreFocus:!0})}})}function ye(e){let{host:t}=e,n=e.agentMenuPosition,i=e.agentMenuTrigger,{activeId:a,agent:o,agents:s,identity:c,identities:u}=t.activeChipAgent();return ue({position:n,basePath:t.basePath,activeId:a,activeName:c?.name?.trim()||(o?r(o):a),agents:s,identities:u,filter:e.agentMenuFilter,pinnedAgentIds:t.pinnedAgentIds,connected:t.connected,agentUnreadCount:e=>t.agentUnreadCount(e),agentApprovalCount:e=>t.sessionData.approvalBadgeSnapshot().agentCounts.get(l(e))??0,onFilterChange:t=>e.setAgentMenuFilter(t),onSwitchAgent:e=>t.switchChipAgent(e),onAskCapabilities:e=>t.askAgentCapabilities(e),onTabAway:()=>i?.focus(),onClose:t=>{e.agentMenuPosition===n&&e.closeAgentMenu({restoreFocus:t})},onNavigate:(e,n)=>t.onNavigate?.(e,n)})}function be(e){let{host:t}=e,n=e.identityMenuPosition,r=e.identityMenuTrigger,i=ee({snapshotUser:t.sessionDataContext?.gateway.snapshot.selfUser,presenceEntries:x(t.sessionData.presencePayload),presenceInstanceId:t.sessionData.presenceInstanceId});return de({position:n,canPairDevice:t.canPairDevice,basePath:t.basePath,gatewayVersion:t.gatewayVersion,selfName:i?.name??void 0,selfEmail:i?.email??void 0,offline:t.offline,themeMode:t.themeMode,triggerWidth:n?.width??0,onTabAway:()=>r?.focus(),onClose:t=>{e.identityMenuPosition===n&&e.closeIdentityMenu({restoreFocus:t})},onNavigate:(e,n)=>t.onNavigate?.(e,n),onPairMobile:()=>t.onPairMobile?.(),onRetryConnect:t.onRetryConnect})}function $(e){let{host:n}=e,r=e.sessionMenu;if(!r)return p;let i=n.sessionDataContext,{session:a}=r,o=t({agentsList:n.sessionDataContext?.agents.state.agentsList,hello:n.sessionDataContext?.gateway.snapshot.hello}),s=n.selectedVisibleSessions(),c=s.length>1&&s.some(e=>e.key===a.key)?s:null,l=c??[a],u=l.every(e=>d(e,o)),f=l.every(e=>e.unread),m=l.every(e=>e.archived===!0),g=l.every(e=>(e.category??null)===(l[0]?.category??null))?l[0]?.category??null:null;return v(r,h`
      <openclaw-session-menu
        .session=${{label:a.label,icon:a.icon,pinned:a.pinned,unread:c?f:a.unread,archived:m,category:c?g:a.category??null}}
        .selectionCount=${l.length}
        .lastActive=${c?``:a.meta}
        .anchor=${r}
        .trigger=${e.sessionMenuTrigger}
        .disabled=${!n.connected}
        .actionDisabledReasons=${_e(i?.gateway.snapshot,a,c)}
        .forkDisabled=${n.sessionData.sessionsLoading||a.modelSelectionLocked}
        .archiveAllowed=${u}
        .cloudWorkerStopAllowed=${!!(!c&&a.cloudWorkerActive&&!a.hasActiveRun&&i&&ae(i.gateway.snapshot,`sessions.reclaim`)===!0)}
        .groups=${n.knownSessionGroups()}
        .canOpenChat=${!0}
        .work=${c?null:e.sessionMenuWork}
        .workboard=${null}
        .onClose=${()=>{e.sessionMenu===r&&e.closeSessionMenu()}}
        .onAction=${e=>{if(c){n.sessionOrganizer.runBatchSessionAction(e,c,f);return}switch(e.kind){case`open-chat`:n.selectSession(a.key);break;case`open-pr`:H(e.url);break;case`open-in`:z(e.editor,e.path);break;case`toggle-pin`:n.sessionOrganizer.patchSession(a,{pinned:!a.pinned});break;case`set-icon`:n.sessionOrganizer.patchSession(a,{icon:e.icon});break;case`toggle-unread`:n.sessionOrganizer.patchSession(a,{unread:!a.unread});break;case`rename`:n.sessionOrganizer.renameSession(a);break;case`fork`:n.sessionOrganizer.forkSession(a);break;case`workboard`:break;case`move-to-group`:(e.category===null||a.category!==e.category)&&n.sessionOrganizer.assignSessionCategory(a,e.category);break;case`new-group`:n.sessionOrganizer.createSessionGroup([a]);break;case`toggle-archived`:a.archived?n.sessionOrganizer.patchSession(a,{archived:!1}):n.sessionOrganizer.archiveSessionWithUndo(a);break;case`stop-cloud-worker`:n.sessionOrganizer.stopCloudWorker(a);break;case`delete`:n.sessionOrganizer.deleteSession(a);break}}}
      ></openclaw-session-menu>
    `)}function xe(e){let{host:t}=e,n=e.sessionGroupMenu,r={"rename-group":o(t.sessionDataContext?.gateway.snapshot,{method:`sessions.groups.rename`,requiredScope:`operator.write`}),"new-group":o(t.sessionDataContext?.gateway.snapshot,{method:`sessions.groups.put`,requiredScope:`operator.write`}),"delete-group":o(t.sessionDataContext?.gateway.snapshot,{method:`sessions.groups.delete`,requiredScope:`operator.write`})};return pe({menu:n,trigger:e.sessionGroupMenuTrigger,connected:t.connected,actionDisabledReasons:Object.fromEntries(Object.entries(r).flatMap(([e,t])=>t.allowed?[]:[[e,t.reason]])),onAction:(n,r)=>{switch(e.closeSessionGroupMenu({restoreFocus:!0}),n){case`rename-group`:t.sessionOrganizer.renameSessionGroupFromMenu(r);break;case`new-group`:t.sessionOrganizer.createSessionGroup();break;case`delete-group`:t.sessionOrganizer.deleteSessionGroupFromMenu(r);break}},onClose:t=>{e.sessionGroupMenu===n&&e.closeSessionGroupMenu({restoreFocus:t})}})}function Se(e){let{host:t}=e,n=e.sessionSortMenuPosition;return he({position:n,trigger:e.sessionSortMenuTrigger,grouping:t.sessionsGrouping,sortMode:t.sessionSortMode,statusFilter:t.sessionsStatusFilter,showCron:t.sessionsShowCron,creators:t.sessionOwnershipVisible?t.sessionCreatorOptions:[],creatorFilterId:t.sessionCreatorFilterActive?t.sessionCreatorFilterId:null,onGroupingChange:n=>{t.sessionOrganizer.setSessionsGrouping(n),e.closeSessionSortMenu({restoreFocus:!0})},onSortModeChange:n=>{t.sessionSortMode=n,e.closeSessionSortMenu({restoreFocus:!0})},onStatusFilterChange:n=>{t.sessionOrganizer.setSessionsStatusFilter(n),e.closeSessionSortMenu({restoreFocus:!0})},onCreatorFilterChange:n=>{t.sessionCreatorFilterId=n,t.sessionDataContext?.sessions.setCreatorFilter(n),e.closeSessionSortMenu({restoreFocus:!0})},onShowCronChange:n=>{t.sessionOrganizer.setSessionsShowCron(n),e.closeSessionSortMenu({restoreFocus:!0})},onClose:t=>{e.sessionSortMenuPosition===n&&e.closeSessionSortMenu({restoreFocus:t})}})}function Ce(e){let{host:t}=e,n=e.catalogViewMenuPosition;return me({position:n,trigger:e.catalogViewMenuTrigger,grouping:t.catalogProjectGrouping,creators:t.sessionOwnershipVisible?t.sessionCreatorOptions:[],creatorFilterId:t.sessionCreatorFilterActive?t.sessionCreatorFilterId:null,onGroupingChange:n=>{t.setCatalogProjectGrouping(n),e.closeCatalogViewMenu({restoreFocus:!0})},onHide:()=>{!n||e.catalogViewMenuPosition!==n||(t.hideSessionCatalog(n.catalogId),e.closeCatalogViewMenu())},onCreatorFilterChange:n=>{t.sessionCreatorFilterId=n,t.sessionDataContext?.sessions.setCreatorFilter(n),e.closeCatalogViewMenu({restoreFocus:!0})},onClose:t=>{e.catalogViewMenuPosition===n&&e.closeCatalogViewMenu({restoreFocus:t})}})}function we(e){let{host:t}=e,n=e.moreMenuPosition,r=e.moreMenuTrigger;return F({position:n,basePath:t.basePath,activeRouteId:t.activeRouteId,activeWorkboardBoardId:Te(t)?t.activeWorkboardBoardId:``,sidebarEntries:t.sidebarEntries,isRouteEnabled:t=>e.isRouteEnabled(t),onTabAway:()=>r?.focus(),onClose:t=>{e.moreMenuPosition===n&&e.closeMoreMenu({restoreFocus:t})},onNavigateRoute:n=>{e.closeMoreMenu({restoreFocus:!0}),t.onNavigate?.(n)},onPreloadRoute:(t,n)=>e.preloadRoute(t,n),onCancelPreload:t=>e.cancelPreload(t),onEditPinnedItems:()=>{let t=e.moreMenuPosition,n=e.moreMenuTrigger;t&&e.openCustomizeMenu(t.x,t.y,n)}})}function Te(e){return!!(e.activeWorkboardBoardId&&e.reconciledSidebarZone().entries.some(t=>t.type===`workboard`&&t.boardId===e.activeWorkboardBoardId))}e((()=>{m(),f(),C(),re(),c(),R(),oe(),U(),n(),u(),fe(),L(),ge()}))();export{ye as renderSidebarAgentMenuForController,Ce as renderSidebarCatalogViewMenuForController,ve as renderSidebarCustomizeMenuForController,be as renderSidebarIdentityMenuForController,we as renderSidebarMoreMenuForController,xe as renderSidebarSessionGroupMenuForController,$ as renderSidebarSessionMenuForController,Se as renderSidebarSessionSortMenuForController};
//# sourceMappingURL=sidebar-menus-render-CMpAbvTt.js.map