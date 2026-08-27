import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as r,Wc as i}from"./control-ui-core-ChU36mQ7.js";import{C as a,K as o,Q as s,W as c,Y as l,_ as u,b as d,g as f,it as p,m,nt as h,w as g}from"./lit-runtime-D5xZwgO1.js";import{o as _,t as v}from"./control-ui-core-M4uhXYSJ.js";import{et as y,it as b,lt as x,nt as S,ot as C,rt as w,st as T,tt as E,ut as D,vt as O,yt as k}from"./control-ui-core-pXkCFtVv.js";import{c as A,l as j,s as M}from"./session-pull-requests-C3lY3Ce7.js";import{n as N,r as P,t as F}from"./session-icon-DSCTmGfc.js";function I(e){return l`<span class="session-icon__named">${e}</span>`}function L(e){if(!e)return I(O.messageSquare);let t=P(e);if(t?.kind===`named`)return I((Object.hasOwn(z,t.name)?z[t.name]:void 0)??O.messageSquare);if(t?.kind===`emoji`)return l`<span class="session-icon__emoji">${t.emoji}</span>`;if(t?.kind===`svg`){let t=N(e),n=t.ok?P(t.value):null;if(n?.kind===`svg`)return l`<span class="session-icon__svg">${f(n.svg)}</span>`}return I(O.messageSquare)}function R(e){return z[e]}var z,B,V=e((()=>{c(),m(),F(),k(),z={bot:O.bot,claw:O.claw,spark:O.spark,bug:O.bug,book:O.book,bookmark:O.bookmark,zap:O.zap,brain:O.brain,camera:O.camera,globe:O.globe,sun:O.sun,moon:O.moon,hand:O.hand,key:O.key,alert:O.alertTriangle,flag:O.flag,lock:O.lock,hourglass:O.hourglass},B=Object.keys(z)})),H,U,W=e((()=>{c(),s(),a(),u(),F(),v(),j(),r(),b(),k(),E(),x(),V(),C(),t(),H={label:``,pinned:!1,unread:!1,archived:!1,category:null,icon:void 0},U=class extends i{constructor(...e){super(...e),this.session=H,this.selectionCount=1,this.lastActive=``,this.anchor={x:0,y:0},this.trigger=null,this.disabled=!1,this.actionDisabledReasons={},this.forkDisabled=!1,this.archiveAllowed=!1,this.cloudWorkerStopAllowed=!1,this.groups=[],this.canOpenChat=!1,this.work=null,this.workboard=null,this.onAction=()=>{},this.onClose=()=>{},this.iconPickerOpen=!1,this.menuLifecycle=new w(this,{getTrigger:()=>this.trigger,onClose:()=>this.onClose(),onKeydown:e=>y(this,e)}),this.handleSelect=e=>{e.preventDefault();let t=e.detail.item.value;if(!t)return;let n={"open-chat":{kind:`open-chat`},"toggle-pin":{kind:`toggle-pin`},"toggle-unread":{kind:`toggle-unread`},rename:{kind:`rename`},fork:{kind:`fork`},workboard:{kind:`workboard`},"new-group":{kind:`new-group`},"toggle-archived":{kind:`toggle-archived`},"stop-cloud-worker":{kind:`stop-cloud-worker`},delete:{kind:`delete`}}[t];if(n){this.runAction(n);return}if(t===`change-icon`){this.iconPickerOpen=!0,this.updateComplete.then(()=>{this.querySelector(`.session-menu__icon-choice:not(:disabled)`)?.focus()});return}if(t===`open-pr`&&this.work?.pullRequestUrl){this.runAction({kind:`open-pr`,url:this.work.pullRequestUrl});return}if(t.startsWith(`open-in:`)&&this.work?.worktreePath){let e=t.slice(8);M.includes(e)&&this.runAction({kind:`open-in`,editor:e,path:this.work.worktreePath});return}if(t.startsWith(`move-to-group:`)){let e=t.slice(14);this.runAction({kind:`move-to-group`,category:e?decodeURIComponent(e):null})}},this.handleAfterHide=e=>{e.currentTarget instanceof Node&&e.currentTarget.isConnected&&this.onClose()},this.handleIconPickerKeydown=e=>{if(e.key===`Escape`)return;e.stopPropagation();let t=e.target;if(!(t instanceof HTMLButtonElement)||!t.matches(`.session-menu__icon-choice`))return;let n=Array.from(this.querySelectorAll(`.session-menu__icon-choice:not(:disabled)`)),r=n.indexOf(t),i=e.key===`ArrowLeft`?r-1:e.key===`ArrowRight`?r+1:e.key===`ArrowUp`?r-6:e.key===`ArrowDown`?r+6:r;i>=0&&i<n.length&&i!==r&&(e.preventDefault(),n[i]?.focus())}}connectedCallback(){super.connectedCallback(),D(this)}runAction(e){this.actionDisabledReasons[e.kind]||(this.onClose(),this.onAction(e))}actionDisabled(e,t=!1){return this.disabled||t||!!this.actionDisabledReasons[e]}actionTitle(e){return this.actionDisabledReasons[e]??o}renderWorkItems(){let e=this.work;if(!e)return o;let t=e.pullRequestUrl,n=e.worktreePath;return l`
      <wa-dropdown-item
        class="session-menu__item"
        value="open-pr"
        data-shortcut="g"
        aria-keyshortcuts="G"
        ?disabled=${this.disabled||!t}
      >
        <span slot="icon" class="session-menu__icon" aria-hidden="true"
          >${O.gitPullRequest}</span
        >
        <span class="session-menu__text">${_(`sessionsView.openPullRequest`)}</span>
        ${S(`g`)}
      </wa-dropdown-item>
      <wa-dropdown-item class="session-menu__item" ?disabled=${this.disabled||!n}>
        <span slot="icon" class="session-menu__icon" aria-hidden="true">${O.externalLink}</span>
        <span class="session-menu__text">${_(`sessionsView.openInEditorMenu`)}</span>
        ${n?this.renderEditorSubmenu():o}
      </wa-dropdown-item>
      <div class="session-menu__separator" role="separator"></div>
    `}renderEditorSubmenu(){return l`
      ${M.map(e=>l`
          <wa-dropdown-item
            slot="submenu"
            class="session-menu__item"
            value=${`open-in:${e}`}
            ?disabled=${this.disabled}
          >
            <span class="session-menu__text">${A[e]}</span>
          </wa-dropdown-item>
        `)}
    `}renderGroupSubmenu(){let e=this.session,t=1,n=()=>t<=9?String(t++):null,r=(e,t,r,i=!0)=>{let a=n(),s=r===`new-group`?`new-group`:`move-to-group`;return l`
        <wa-dropdown-item
          slot="submenu"
          class="session-menu__item"
          value=${r}
          role=${i?`menuitemradio`:`menuitem`}
          aria-checked=${i?String(t):o}
          ${i?d(e=>T(e,t)):o}
          data-shortcut=${a??o}
          aria-keyshortcuts=${a??o}
          ?disabled=${this.actionDisabled(s)}
          title=${this.actionTitle(s)}
        >
          <span class="session-menu__text">${e}</span>
          ${i&&t?l`<span slot="details" class="session-menu__check" aria-hidden="true"
                >${O.check}</span
              >`:o}
          ${a?S(a):o}
        </wa-dropdown-item>
      `};return l`
      ${this.groups.map(t=>r(t,e.category===t,`move-to-group:${encodeURIComponent(t)}`))}
      ${e.category?r(_(`sessionsView.removeFromGroup`),!1,`move-to-group:`,!1):o}
      ${r(_(`sessionsView.newGroup`),!1,`new-group`,!1)}
    `}returnFromIconPicker(){this.iconPickerOpen=!1,this.updateComplete.then(()=>{this.querySelector(`wa-dropdown-item[value="change-icon"]`)?.focus({preventScroll:!0})})}renderIconPicker(){let e=this.session.icon;return l`
      <div
        class="session-menu__icon-picker"
        role="dialog"
        aria-label=${_(`sessionsView.changeIcon`)}
        @keydown=${this.handleIconPickerKeydown}
      >
        <div class="session-menu__icon-picker-header">
          <button
            type="button"
            class="session-menu__icon-picker-back"
            aria-label=${_(`common.back`)}
            @click=${()=>this.returnFromIconPicker()}
          >
            ${O.arrowLeft}
          </button>
          <span>${_(`sessionsView.changeIcon`)}</span>
        </div>
        <div
          class="session-menu__icon-grid"
          role="radiogroup"
          aria-label=${_(`sessionsView.changeIcon`)}
        >
          ${B.map(t=>{let n=`name:${t}`;return l`<button
              type="button"
              class="session-menu__icon-choice"
              role="radio"
              aria-label=${t}
              aria-checked=${String(e===n)}
              title=${t}
              ?disabled=${this.actionDisabled(`set-icon`)}
              @click=${()=>this.runAction({kind:`set-icon`,icon:n})}
            >
              ${L(n)}
            </button>`})}
        </div>
        <label class="session-menu__emoji-field">
          <span>${_(`sessionsView.customEmoji`)}</span>
          <input
            type="text"
            inputmode="text"
            maxlength="16"
            aria-label=${_(`sessionsView.customEmoji`)}
            placeholder="🦞"
            ?disabled=${this.actionDisabled(`set-icon`)}
            @keydown=${e=>{if(e.key!==`Enter`)return;e.preventDefault(),e.stopPropagation();let t=e.currentTarget,n=N(t.value);if(!n.ok||P(n.value)?.kind!==`emoji`){t.setCustomValidity(_(`sessionsView.invalidEmojiIcon`)),t.reportValidity();return}t.setCustomValidity(``),this.runAction({kind:`set-icon`,icon:n.value})}}
          />
        </label>
        <button
          type="button"
          class="session-menu__remove-icon"
          ?disabled=${this.actionDisabled(`set-icon`,!e)}
          @click=${()=>this.runAction({kind:`set-icon`,icon:null})}
        >
          ${_(`sessionsView.removeIcon`)}
        </button>
      </div>
    `}render(){let e=Math.max(8,Math.min(this.anchor.x,window.innerWidth-240-8)),t=Math.max(8,Math.min(this.anchor.y,window.innerHeight-460-8)),n=this.session,r=this.selectionCount>1,i=String(this.selectionCount),a=r?_(`chat.sidebar.sessionMenuMany`,{count:i}):_(`chat.sidebar.sessionMenu`,{session:n.label});return g(this.anchor,l`<wa-dropdown
        class="session-menu"
        .open=${!0}
        placement="bottom-start"
        .distance=${0}
        aria-label=${a}
        @wa-select=${this.handleSelect}
        @wa-after-hide=${this.handleAfterHide}
      >
        <button
          slot="trigger"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          aria-label=${a}
          style="position: fixed; left: ${e}px; top: ${t}px; width: 1px; height: 1px; opacity: 0; pointer-events: none;"
        ></button>
        ${this.iconPickerOpen?this.renderIconPicker():l`${!r&&this.lastActive?l`<div class="session-menu__info">
                    ${_(`sessionsView.lastActive`,{time:this.lastActive})}
                  </div>`:o}
              ${!r&&this.canOpenChat?l`
                    <wa-dropdown-item
                      class="session-menu__item"
                      value="open-chat"
                      data-shortcut="o"
                      aria-keyshortcuts="O"
                      ?disabled=${this.disabled}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${O.messageSquare}</span
                      >
                      <span class="session-menu__text">${_(`sessionsView.openChat`)}</span>
                      ${S(`o`)}
                    </wa-dropdown-item>
                  `:o}
              ${r?o:this.renderWorkItems()}
              ${r?o:l`
                    <wa-dropdown-item
                      class="session-menu__item"
                      value="toggle-pin"
                      data-shortcut="p"
                      aria-keyshortcuts="P"
                      ?disabled=${this.actionDisabled(`toggle-pin`,n.archived)}
                      title=${this.actionTitle(`toggle-pin`)}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${n.pinned?O.pinOff:O.pin}</span
                      >
                      <span class="session-menu__text"
                        >${n.pinned?_(`sessionsView.unpinSession`):_(`sessionsView.pinSession`)}</span
                      >
                      ${S(`p`)}
                    </wa-dropdown-item>
                    <wa-dropdown-item
                      class="session-menu__item"
                      value="change-icon"
                      ?disabled=${this.actionDisabled(`set-icon`)}
                      title=${this.actionTitle(`set-icon`)}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${O.spark}</span
                      >
                      <span class="session-menu__text">${_(`sessionsView.changeIcon`)}</span>
                    </wa-dropdown-item>
                  `}
              <wa-dropdown-item
                class="session-menu__item"
                value="toggle-unread"
                data-shortcut="u"
                aria-keyshortcuts="U"
                ?disabled=${this.actionDisabled(`toggle-unread`)}
                title=${this.actionTitle(`toggle-unread`)}
              >
                <span slot="icon" class="session-menu__icon" aria-hidden="true"
                  >${n.unread?O.eye:O.circle}</span
                >
                <span class="session-menu__text"
                  >${r?n.unread?_(`sessionsView.markReadCount`,{count:i}):_(`sessionsView.markUnreadCount`,{count:i}):n.unread?_(`sessionsView.markRead`):_(`sessionsView.markUnread`)}</span
                >
                ${S(`u`)}
              </wa-dropdown-item>
              ${r?o:l`
                    <wa-dropdown-item
                      class="session-menu__item"
                      value="rename"
                      data-shortcut="r"
                      aria-keyshortcuts="R"
                      ?disabled=${this.actionDisabled(`rename`)}
                      title=${this.actionTitle(`rename`)}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${O.edit}</span
                      >
                      <span class="session-menu__text">${_(`sessionsView.renameSessionMenu`)}</span>
                      ${S(`r`)}
                    </wa-dropdown-item>
                    <wa-dropdown-item
                      class="session-menu__item"
                      value="fork"
                      data-shortcut="f"
                      aria-keyshortcuts="F"
                      ?disabled=${this.actionDisabled(`fork`,this.forkDisabled)}
                      title=${this.actionTitle(`fork`)}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${O.copy}</span
                      >
                      <span class="session-menu__text">${_(`sessionsView.forkSession`)}</span>
                      ${S(`f`)}
                    </wa-dropdown-item>
                  `}
              ${!r&&this.workboard?l`
                    <wa-dropdown-item
                      class="session-menu__item"
                      value="workboard"
                      data-shortcut="w"
                      aria-keyshortcuts="W"
                      ?disabled=${this.disabled||this.workboard.busy}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${this.workboard.captured?O.check:O.plus}</span
                      >
                      <span class="session-menu__text"
                        >${this.workboard.captured?_(`sessionsView.openWorkboardCard`):_(`sessionsView.addToWorkboard`)}</span
                      >
                      ${S(`w`)}
                    </wa-dropdown-item>
                  `:o}
              <wa-dropdown-item
                class="session-menu__item"
                ?disabled=${this.actionDisabled(`move-to-group`)}
                title=${this.actionTitle(`move-to-group`)}
              >
                <span slot="icon" class="session-menu__icon" aria-hidden="true"
                  >${O.folder}</span
                >
                <span class="session-menu__text"
                  >${r?_(`sessionsView.moveToGroupMenuCount`,{count:i}):_(`sessionsView.moveToGroupMenu`)}</span
                >
                ${this.renderGroupSubmenu()}
              </wa-dropdown-item>
              <div class="session-menu__separator" role="separator"></div>
              ${!r&&this.cloudWorkerStopAllowed?l`
                    <wa-dropdown-item
                      class="session-menu__item session-menu__item--destructive"
                      value="stop-cloud-worker"
                      variant="danger"
                      ?disabled=${this.actionDisabled(`stop-cloud-worker`)}
                      title=${this.actionTitle(`stop-cloud-worker`)}
                    >
                      <span slot="icon" class="session-menu__icon" aria-hidden="true"
                        >${O.stop}</span
                      >
                      <span class="session-menu__text">${_(`sessionsView.stopCloudWorker`)}</span>
                    </wa-dropdown-item>
                  `:o}
              <wa-dropdown-item
                class="session-menu__item"
                value="toggle-archived"
                data-shortcut="a"
                aria-keyshortcuts="A"
                ?disabled=${this.actionDisabled(`toggle-archived`,!n.archived&&!this.archiveAllowed)}
                title=${this.actionTitle(`toggle-archived`)}
              >
                <span slot="icon" class="session-menu__icon" aria-hidden="true"
                  >${n.archived?O.archiveRestore:O.archive}</span
                >
                <span class="session-menu__text"
                  >${r?_(`sessionsView.archiveSessionCount`,{count:i}):n.archived?_(`sessionsView.restoreSession`):_(`sessionsView.archiveSession`)}</span
                >
                ${S(`a`)}
              </wa-dropdown-item>
              <wa-dropdown-item
                class="session-menu__item session-menu__item--destructive"
                value="delete"
                variant="danger"
                data-shortcut="d"
                aria-keyshortcuts="D"
                ?disabled=${this.actionDisabled(`delete`,!(n.archived||this.archiveAllowed))}
                title=${this.actionTitle(`delete`)}
              >
                <span slot="icon" class="session-menu__icon" aria-hidden="true"
                  >${O.trash}</span
                >
                <span class="session-menu__text"
                  >${r?_(`sessionsView.deleteSessionCount`,{count:i}):_(`sessionsView.deleteSessionMenu`)}</span
                >
                ${S(`d`)}
              </wa-dropdown-item>`}
      </wa-dropdown>`)}},n([p({attribute:!1})],U.prototype,`session`,void 0),n([p({attribute:!1})],U.prototype,`selectionCount`,void 0),n([p({attribute:!1})],U.prototype,`lastActive`,void 0),n([p({attribute:!1})],U.prototype,`anchor`,void 0),n([p({attribute:!1})],U.prototype,`trigger`,void 0),n([p({attribute:!1})],U.prototype,`disabled`,void 0),n([p({attribute:!1})],U.prototype,`actionDisabledReasons`,void 0),n([p({attribute:!1})],U.prototype,`forkDisabled`,void 0),n([p({attribute:!1})],U.prototype,`archiveAllowed`,void 0),n([p({attribute:!1})],U.prototype,`cloudWorkerStopAllowed`,void 0),n([p({attribute:!1})],U.prototype,`groups`,void 0),n([p({attribute:!1})],U.prototype,`canOpenChat`,void 0),n([p({attribute:!1})],U.prototype,`work`,void 0),n([p({attribute:!1})],U.prototype,`workboard`,void 0),n([p({attribute:!1})],U.prototype,`onAction`,void 0),n([p({attribute:!1})],U.prototype,`onClose`,void 0),n([h()],U.prototype,`iconPickerOpen`,void 0),customElements.get(`openclaw-session-menu`)||customElements.define(`openclaw-session-menu`,U)}));function G(e){for(let t of X){let n=e.find(e=>e.state===t);if(n)return n.url}return null}function K(e){return e.some(e=>e.state===`open`||e.state===`draft`)?`open`:e.some(e=>e.state===`merged`)?`merged`:`none`}async function q(e){if(!e.pullRequestsAvailable||!e.loadPullRequests)return null;try{let t=await e.loadPullRequests();return t?G(t.pullRequests):null}catch{return null}}async function J(e){let t=e.worktreeId;if(!t)return null;try{return(await e.client.request(`worktrees.list`,{})).worktrees.find(e=>e.id===t&&e.removedAt===void 0)?.path??null}catch{return null}}async function Y(e){let[t,n]=await Promise.all([q(e),J(e)]);return{pullRequestUrl:t,worktreePath:n}}var X,Z=e((()=>{X=[`open`,`draft`,`merged`,`closed`]}));export{V as a,W as i,Z as n,R as o,K as r,L as s,Y as t};
//# sourceMappingURL=session-menu-work-BdWYDOFU.js.map