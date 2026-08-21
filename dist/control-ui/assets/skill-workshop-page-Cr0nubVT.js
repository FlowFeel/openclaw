import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,Da as i,Gc as a,Kc as o,Oa as s,Qn as c,Vc as l,Wc as u,Yc as d,_s as f,as as p,da as m,fs as ee,is as te,pa as ne,qc as h,rr as re,sa as ie,za as g}from"./control-ui-core-UWR2ANgr.js";import{$ as _,C as ae,E as oe,K as v,O as se,Q as y,W as b,Y as x,ct as ce,it as S,w as le}from"./lit-runtime-D5xZwgO1.js";import{f as ue,i as de,m as fe,p as pe,r as me}from"./control-ui-foundation-Dgui328h.js";import{A as he,D as ge,_ as _e,ln as ve,rn as ye,v as be}from"./control-ui-core-DDTXn_ud.js";import{At as xe,Dt as C,Et as w,wt as T}from"./control-ui-foundation-DkfOBVsU.js";import{o as E,t as D}from"./control-ui-core-BCL4Sy8S.js";import{I as Se,P as Ce,gt as O,pt as k,vt as A,yt as we}from"./control-ui-core-DS6N4FyQ.js";import{n as Te,t as Ee}from"./hub-tabs-DByyIl3h.js";import{i as De,n as Oe,r as ke,t as Ae}from"./plugins-C9ZVX_ih.js";import{countSkillWorkshopProposals as je,createSkillWorkshopState as Me,requestSkillWorkshopRevision as Ne,runSkillWorkshopEvaluation as Pe,runSkillWorkshopLifecycleAction as j,selectSkillWorkshopProposal as Fe,t as Ie}from"./proposals-YjJqqe8i.js";import{loadSkillWorkshopPageData as Le,n as Re,r as ze,runSkillWorkshopPageHistoryScan as Be,t as Ve}from"./history-scan-page-controller-YAeihvFV.js";function M(e,t,n){let r=n.trim().toLowerCase();return e.filter(e=>!(t!==`all`&&e.status!==t||r&&!`${e.name} ${e.oneLine} ${e.slug}`.toLowerCase().includes(r)))}var N=e((()=>{}));function He(e){return C(C(C(e.skills)?.workshop)?.autonomous)?.mode!==`off`}function Ue(e,t,n){let r=p(e?.state.configSnapshot);return r?{enabled:He(r),busy:t,error:n}:null}async function We(e,t){let n={raw:{skills:{workshop:{autonomous:{mode:t?`auto`:`off`}}}},note:t?`Enable Skill Workshop self-learning`:`Disable Skill Workshop self-learning`},r=await e.patch(n);if(!r&&e.state.lastError?.includes(P)){if(await e.refresh(),e.state.lastError)return e.state.lastError;r=await e.patch(n)}return r?(await e.refresh(),null):e.state.lastError??E(`skillWorkshop.selfLearning.updateError`)}function Ge(e,t){return e?x`
    <label
      class="sw-revision-session-toggle"
      title=${E(`skillWorkshop.header.selfLearningTooltip`)}
    >
      <input
        type="checkbox"
        aria-label=${E(`skillWorkshop.header.selfLearningAria`)}
        .checked=${e.enabled}
        ?disabled=${e.busy}
        @change=${e=>t(e.currentTarget.checked)}
      />
      <span class="sw-revision-session-toggle__track" aria-hidden="true"></span>
      <span class="sw-revision-session-toggle__label"
        >${E(`skillWorkshop.header.selfLearning`)}</span
      >
    </label>
  `:v}function Ke(e,t){return!e||e.enabled?v:x`
    <div class="sw-empty-state__selflearn">
      <h3>${E(`skillWorkshop.selfLearning.pitchTitle`)}</h3>
      <p>${E(`skillWorkshop.selfLearning.pitchBody`)}</p>
      <button
        type="button"
        class="sw-btn sw-btn--primary ${e.busy?`is-busy`:``}"
        ?disabled=${e.busy}
        @click=${()=>t(!0)}
      >
        ${e.busy?E(`skillWorkshop.selfLearning.enabling`):E(`skillWorkshop.selfLearning.enable`)}
      </button>
    </div>
  `}function qe(e){return e?.error?x`<div class="sw-error" role="status"><span>${e.error}</span></div>`:v}var P,F=e((()=>{xe(),b(),D(),te(),P=`config changed since last load`}));function Je(){try{return h()?.getItem(I)===`board`?`board`:`today`}catch{return`today`}}function Ye(e){try{h()?.setItem(I,e)}catch{}}function Xe(){try{return h()?.getItem(L)===`true`}catch{return!1}}function Ze(e){try{h()?.setItem(L,String(e))}catch{}}var I,L,R=e((()=>{d(),I=`openclaw:control-ui:skill-workshop-mode:v1`,L=`openclaw:control-ui:skill-workshop-current-chat-revisions:v1`}));function Qe(e,t,n){e.skillWorkshopUseCurrentChatForRevisions!==t&&(e.skillWorkshopUseCurrentChatForRevisions=t,Ze(t),n())}function z(e,t,n){e.skillWorkshopMode!==t&&(e.skillWorkshopMode=t,Ye(t),n())}function $e(e,{selfLearning:t,onSelfLearningToggle:n},r){let i=E(`skillWorkshop.header.useCurrentChat`);return x`
    <div class="sw-header-controls">
      ${Ge(t,n)}
      <label
        class="sw-revision-session-toggle"
        title=${E(`skillWorkshop.header.useCurrentChatTooltip`)}
      >
        <input
          type="checkbox"
          aria-label=${E(`skillWorkshop.header.useCurrentChatAria`)}
          .checked=${e.skillWorkshopUseCurrentChatForRevisions}
          @change=${t=>Qe(e,t.currentTarget.checked,r)}
        />
        <span class="sw-revision-session-toggle__track" aria-hidden="true"></span>
        <span class="sw-revision-session-toggle__label">${i}</span>
      </label>
      ${Te({id:`skill-workshop-mode`,active:e.skillWorkshopMode,tabs:[{value:`board`,label:x`
              <svg viewBox="0 0 24 24" class="sw-mode-tabs__icon" aria-hidden="true">
                <rect x="3" y="4" width="7" height="16" rx="1.5" />
                <rect x="14" y="4" width="7" height="9" rx="1.5" />
                <rect x="14" y="15" width="7" height="5" rx="1.5" />
              </svg>
              <span>${E(`skillWorkshop.header.board`)}</span>
            `},{value:`today`,label:x`
              <svg viewBox="0 0 24 24" class="sw-mode-tabs__icon" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path
                  d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
                />
              </svg>
              <span>${E(`skillWorkshop.header.today`)}</span>
            `}],ariaLabel:E(`skillWorkshop.header.view`),panelId:`skill-workshop-mode-panel`,variant:`sub`,onSelect:t=>z(e,t,r)})}
    </div>
  `}var et=e((()=>{b(),Ee(),D(),F(),R()}));function tt(e,t){if(t!==`workshop`){if(t===`skills`){e.navigate(`skills`);return}e.navigate(`plugins`,{pathname:ve(t,e.basePath)})}}var nt=e((()=>{ye()}));function rt(e){let{state:t,context:n}=e;return t&&n?{state:t,context:n,epoch:e.epoch,gateway:n.gateway,agentSelection:n.agentSelection,sessions:n.sessions,revision:n.skillWorkshopRevision,navigate:n.navigate}:null}function it(e,t){let n=t.context;return t.state===e.state&&n===e.context&&t.epoch===e.epoch&&n?.gateway===e.gateway&&n.agentSelection===e.agentSelection&&n.sessions===e.sessions&&n.skillWorkshopRevision===e.revision&&n.navigate===e.navigate}var at=e((()=>{}));function ot(e){let t=e.split(`
`),n=[];for(let e=0;e<t.length;e+=V)n.push(t.slice(e,e+V).join(`
`));return n}function st(e){let t=e.split(`.`).pop()?.toLowerCase()??``;return{md:`Markdown`,txt:E(`filePreview.kind.text`),json:`JSON`,yaml:`YAML`,yml:`YAML`,ts:`TypeScript`,js:`JavaScript`,py:`Python`,sh:E(`filePreview.kind.shell`)}[t]??(t?t.toUpperCase():E(`filePreview.kind.file`))}function ct(e){let t=e.split(`.`).pop()?.toLowerCase()??``;return H.has(t)?A.fileCode:A.fileText}var B,V,H,lt=e((()=>{b(),y(),D(),o(),Ce(),we(),k(),t(),B=class extends a{constructor(...e){super(...e),this.files=[],this.activePath=``,this.query=``,this.label=``,this.listLabel=``,this.searchPlaceholder=``,this.contextLabel=``,this.readOnlyLabel=``,this.emptyTitle=``,this.emptySubtitle=``,this.copyLabel=``,this.filteredFiles=[],this.derivedInputsReady=!1,this.codeChunks=[],this.resetScrollAfterUpdate=!0,this.focusAfterUpdate=!1,this.handleQueryInput=e=>{let t=e.target.value??``;this.dispatchEvent(new CustomEvent(`file-preview-query-change`,{bubbles:!0,composed:!0,detail:t}))},this.preventItemPointerFocus=e=>{e.preventDefault()},this.handleKeydown=e=>{switch(e.key){case`Escape`:e.preventDefault(),e.stopPropagation(),this.emitClose();return;case`ArrowDown`:this.moveSelection(1,e);return;case`ArrowUp`:this.moveSelection(-1,e);default:}},this.emitClose=()=>{this.dispatchEvent(new CustomEvent(`file-preview-close`,{bubbles:!0,composed:!0}))}}static{this.styles=ce`
    :host {
      display: contents;
    }

    .modal {
      width: 100%;
      height: min(780px, 86vh);
      background: var(--bg);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-lg);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .head {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      background: var(--bg);
    }

    .search-icon {
      color: var(--muted);
      font-size: 18px;
    }

    .search {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-strong);
      font: inherit;
      font-size: 18px;
      font-weight: 400;
      padding: 4px 0;
    }

    .search:focus,
    .search:focus-visible {
      outline: none;
      border: none;
      box-shadow: none;
    }

    .search::placeholder {
      color: var(--muted);
    }

    .state {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--muted);
      padding: 5px 10px;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--bg-elevated);
    }

    .kbd {
      font-family: var(--mono);
      border: 1px solid var(--border);
      color: var(--muted);
    }

    .body {
      flex: 1;
      display: grid;
      grid-template-columns: 360px 1fr;
      min-height: 0;
    }

    .list {
      border-right: 1px solid var(--border);
      padding: 14px 10px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .list-section {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
      padding: 4px 12px 8px;
    }

    .item {
      display: grid;
      grid-template-columns: 16px 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 12px 14px;
      border-radius: var(--radius-md);
      border: none;
      background: transparent;
      color: var(--text);
      font: inherit;
      outline: none;
      text-align: left;
    }

    .item:focus-visible {
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
    }

    .item:hover {
      background: var(--bg-elevated);
    }

    .item.is-active {
      background: var(--accent-subtle);
    }

    .item.is-active .item-name {
      color: var(--text-strong);
    }

    .item-icon {
      width: 16px;
      height: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--muted);
      opacity: 0.85;
    }

    .item.is-active .item-icon {
      color: var(--accent);
      opacity: 1;
    }

    .item-icon svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.5px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .item-name {
      font-family: var(--mono);
      font-size: 14px;
      color: var(--text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-meta {
      color: var(--muted);
      font-size: 12px;
    }

    .empty-list {
      color: var(--muted);
      font-size: 13px;
      padding: 12px;
    }

    .detail {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
    }

    .detail.empty {
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 24px;
    }

    .detail-head {
      padding: 20px 24px 14px;
      border-bottom: 1px solid var(--border);
    }

    .detail-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }

    .title {
      flex: 1;
      min-width: 0;
      margin: 0;
      font-family: var(--mono);
      font-size: 22px;
      color: var(--text-strong);
      font-weight: 700;
      letter-spacing: -0.01em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chat-copy-btn {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 auto;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      background: var(--bg-elevated);
      color: var(--muted);
    }

    .chat-copy-btn:hover {
      border-color: var(--border-strong);
      color: var(--text-strong);
    }

    .chat-copy-btn:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .chat-copy-btn__icon {
      display: inline-flex;
      width: 16px;
      height: 16px;
      position: relative;
    }

    .chat-copy-btn__icon-copy,
    .chat-copy-btn__icon-check {
      position: absolute;
      inset: 0;
      transition: opacity 150ms ease;
    }

    .chat-copy-btn__icon-check {
      opacity: 0;
    }

    .chat-copy-btn[data-copied="1"] .chat-copy-btn__icon-copy {
      opacity: 0;
    }

    .chat-copy-btn[data-copied="1"] .chat-copy-btn__icon-check {
      opacity: 1;
    }

    .chat-copy-btn[data-copying="1"] {
      opacity: 0;
      pointer-events: none;
    }

    .chat-copy-btn[data-error="1"] {
      border-color: var(--danger-subtle);
      background: var(--danger-subtle);
      color: var(--danger);
    }

    .chat-copy-btn[data-copied="1"] {
      border-color: var(--ok-subtle);
      background: var(--ok-subtle);
      color: var(--ok);
    }

    .chat-copy-btn svg {
      width: 16px;
      height: 16px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.5px;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: 999px;
      font-size: 11.5px;
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      color: var(--muted);
    }

    .chip.accent {
      background: var(--accent-subtle);
      border-color: color-mix(in srgb, var(--accent) 30%, transparent);
      color: var(--accent);
    }

    .chip.ok {
      background: color-mix(in srgb, var(--ok) 12%, transparent);
      border-color: color-mix(in srgb, var(--ok) 30%, transparent);
      color: var(--ok);
    }

    .detail-body {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 20px 24px 24px;
    }

    .code-content {
      min-width: 0;
    }

    .code-chunk {
      margin: 0;
      min-width: 0;
      font-family: var(--mono);
      font-size: 13px;
      line-height: 1.7;
      color: var(--text);
      white-space: pre-wrap;
      word-break: break-word;
      content-visibility: auto;
      contain-intrinsic-block-size: auto 1414px;
    }

    .foot {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 12px 20px;
      border-top: 1px solid var(--border);
      background: var(--bg);
      font-size: 12px;
      color: var(--muted);
    }

    .foot-group {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .kbd {
      font-size: 10.5px;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--bg-elevated);
      color: var(--text);
    }

    .spacer {
      flex: 1;
    }

    .button {
      height: 36px;
      padding: 0 14px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--bg-elevated);
      color: var(--text);
      font-weight: 600;
    }

    .button:hover {
      border-color: var(--border-strong);
      color: var(--text-strong);
    }

    .empty-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-strong);
      margin: 0 0 8px;
    }

    .empty-subtitle {
      margin: 0;
      font-size: 13px;
      color: var(--muted);
      max-width: 380px;
    }
  `}willUpdate(e){if(!(!this.derivedInputsReady||e.has(`activePath`)||e.has(`query`)||e.has(`files`)))return;this.derivedInputsReady=!0,this.filteredFiles=this.filterFiles();let t=this.resolveActiveFile(this.filteredFiles);this.activeFile=t;let n=t?.contents;n!==this.codeSource&&(this.codeSource=n,this.codeChunks=n===void 0?[]:ot(n)),this.resetScrollAfterUpdate=!0}render(){let e=this.filteredFiles,t=this.activeFile,n=e.length===this.files.length?E(`filePreview.fileCount`,{count:String(this.files.length)}):E(`filePreview.filteredFileCount`,{count:String(e.length),total:String(this.files.length)}),r=this.label||E(`filePreview.label`),i=this.listLabel||E(`filePreview.listLabel`),a=this.searchPlaceholder||E(`filePreview.searchPlaceholder`);return x`
      <openclaw-modal-dialog
        label=${r}
        style="--openclaw-modal-width: min(1100px, 92vw); --openclaw-modal-max-height: 86vh;"
        @modal-cancel=${this.emitClose}
        @keydown=${this.handleKeydown}
      >
        <div class="modal">
          <header class="head">
            <span class="search-icon">⌕</span>
            <input
              class="search"
              placeholder=${a}
              .value=${this.query}
              @input=${this.handleQueryInput}
            />
            <span class="state">${n}</span>
          </header>
          <div class="body">
            <aside class="list">
              <div class="list-section">${i} · ${e.length}</div>
              ${e.length===0?x`<div class="empty-list">${E(`filePreview.noMatches`)}</div>`:e.map(e=>x`
                      <button
                        class="item ${e.path===t?.path?`is-active`:``}"
                        @pointerdown=${this.preventItemPointerFocus}
                        @mousedown=${this.preventItemPointerFocus}
                        @click=${()=>this.emitSelect(e.path)}
                      >
                        <span class="item-icon">${ct(e.path)}</span>
                        <span class="item-name">${e.path}</span>
                        <span class="item-meta">${e.size}</span>
                      </button>
                    `)}
            </aside>
            ${t?this.renderFile(t):this.renderEmpty()}
          </div>
          <footer class="foot">
            <span class="foot-group"><span class="kbd">↑↓</span> ${E(`filePreview.navigate`)}</span>
            <span class="spacer"></span>
            <button class="button" @click=${this.emitClose}>
              ${E(`common.close`)} <span class="kbd">esc</span>
            </button>
          </footer>
        </div>
      </openclaw-modal-dialog>
    `}renderFile(e){return x`
      <section class="detail">
        <div class="detail-head">
          <div class="detail-title-row">
            <h2 class="title">${e.path}</h2>
            ${e.contents?Se(e.contents,this.copyLabel||E(`filePreview.copyFile`)):``}
          </div>
          <div class="chips">
            <span class="chip accent">${st(e.path)}</span>
            <span class="chip">${e.size}</span>
            <span class="chip">${this.readOnlyLabel||E(`filePreview.readOnly`)}</span>
            ${this.contextLabel?x`<span class="chip ok">${this.contextLabel}</span>`:``}
          </div>
        </div>
        <div class="detail-body">
          <div class="code-content">
            ${this.codeChunks.map((e,t)=>x`<pre class="code-chunk" data-chunk=${t}>${e}</pre>`)}
          </div>
        </div>
      </section>
    `}renderEmpty(){return x`
      <section class="detail empty">
        <p class="empty-title">${this.emptyTitle||E(`filePreview.emptyTitle`)}</p>
        <p class="empty-subtitle">${this.emptySubtitle||E(`filePreview.emptySubtitle`)}</p>
      </section>
    `}filterFiles(){let e=this.query.trim().toLowerCase();return e?this.files.filter(t=>`${t.path}\n${t.contents}`.toLowerCase().includes(e)):this.files}resolveActiveFile(e){return e.find(e=>e.path===this.activePath)??e[0]}connectedCallback(){super.connectedCallback(),this.resetScrollAfterUpdate=!0,this.focusAfterUpdate=!0,this.requestUpdate()}updated(e){if(this.resetScrollAfterUpdate){this.resetScrollAfterUpdate=!1;let e=this.detailBody;e&&(e.scrollTop=0,e.scrollLeft=0)}(e.has(`activePath`)||e.has(`query`)||e.has(`files`))&&this.scrollActiveFileIntoView(),this.focusAfterUpdate&&this.isConnected&&(this.focusAfterUpdate=!1,this.focusModal())}focusModal(){(this.searchInput??this.shadowRoot?.querySelector(`.modal`))?.focus({preventScroll:!0})}moveSelection(e,t){t.preventDefault(),t.stopPropagation();let n=this.filterFiles();if(n.length===0)return;let r=this.resolveActiveFile(n),i=r?n.findIndex(e=>e.path===r.path):-1,a=n[Math.max(0,Math.min(n.length-1,i+e))];a&&a.path!==r?.path&&this.emitSelect(a.path)}scrollActiveFileIntoView(){this.updateComplete.then(()=>{this.isConnected&&this.shadowRoot?.querySelector(`.item.is-active`)?.scrollIntoView({block:`nearest`})}).catch(()=>{})}emitSelect(e){this.dispatchEvent(new CustomEvent(`file-preview-select`,{bubbles:!0,composed:!0,detail:e})),this.focusModal()}},n([S({attribute:!1})],B.prototype,`files`,void 0),n([S()],B.prototype,`activePath`,void 0),n([S()],B.prototype,`query`,void 0),n([S()],B.prototype,`label`,void 0),n([S()],B.prototype,`listLabel`,void 0),n([S()],B.prototype,`searchPlaceholder`,void 0),n([S()],B.prototype,`contextLabel`,void 0),n([S()],B.prototype,`readOnlyLabel`,void 0),n([S()],B.prototype,`emptyTitle`,void 0),n([S()],B.prototype,`emptySubtitle`,void 0),n([S()],B.prototype,`copyLabel`,void 0),n([_(`.search`)],B.prototype,`searchInput`,void 0),n([_(`.detail-body`)],B.prototype,`detailBody`,void 0),V=64,H=new Set(`ts.tsx.js.jsx.mjs.cjs.py.sh.bash.zsh.rb.go.rs.java.kt.swift.c.cc.cpp.h.hpp.json.yaml.yml.toml.xml.html.css.scss.sql`.split(`.`))})),ut=e((()=>{lt(),customElements.get(`openclaw-file-preview-modal`)||customElements.define(`openclaw-file-preview-modal`,B)})),dt=e((()=>{}));function ft(e,t){let n=pt(e,t);return x`
    <div class="sw-detail sw-detail--empty">
      <div class="sw-filter-empty">
        <div class="sw-filter-empty__icon" aria-hidden="true">
          ${mt(n.icon)}
        </div>
        <p class="sw-empty__title">${n.title}</p>
        <p class="sw-empty__sub">${n.body}</p>
      </div>
    </div>
  `}function pt(e,t){if(e.trim())return{icon:`search`,title:E(`skillWorkshop.empty.searchTitle`),body:E(`skillWorkshop.empty.searchBody`)};switch(t){case`pending`:return{icon:`clock`,title:E(`skillWorkshop.empty.pendingTitle`),body:E(`skillWorkshop.empty.pendingBody`)};case`applied`:return{icon:`check`,title:E(`skillWorkshop.empty.appliedTitle`),body:E(`skillWorkshop.empty.appliedBody`)};case`rejected`:return{icon:`x`,title:E(`skillWorkshop.empty.rejectedTitle`),body:E(`skillWorkshop.empty.rejectedBody`)};case`quarantined`:return{icon:`shield`,title:E(`skillWorkshop.empty.quarantinedTitle`),body:E(`skillWorkshop.empty.quarantinedBody`)};case`stale`:return{icon:`refresh`,title:E(`skillWorkshop.empty.staleTitle`),body:E(`skillWorkshop.empty.staleBody`)};case`all`:return{icon:`search`,title:E(`skillWorkshop.empty.allTitle`),body:E(`skillWorkshop.empty.allBody`)}}return{icon:`search`,title:E(`skillWorkshop.empty.allTitle`),body:E(`skillWorkshop.empty.allBody`)}}function mt(e){return U[e]}function ht(e){return x`
    <div class="sw-empty-state">
      <section class="sw-empty-state__panel" aria-label=${E(`skillWorkshop.empty.noProposalsAria`)}>
        <div class="sw-empty-state__glyph" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p class="sw-empty-state__eyebrow">${E(`skillWorkshop.title`)}</p>
        <h2>${E(`skillWorkshop.empty.noProposalsTitle`)}</h2>
        <p>${E(`skillWorkshop.empty.noProposalsBody`,{agent:e.agentName})}</p>
        <div class="sw-empty-state__footer">${E(`skillWorkshop.empty.noProposalsFooter`)}</div>
        ${Ke(e.selfLearning,e.onSelfLearningToggle)}
      </section>
    </div>
  `}var U,gt=e((()=>{b(),we(),D(),F(),U={search:A.search,clock:A.clock,check:A.check,x:A.x,shield:A.shieldCheck,refresh:A.refresh}}));function _t(e){let t=M(e.proposals,e.statusFilter,e.query),n=t.find(t=>t.key===e.selectedKey)??t[0],r=Bt(t),i=n&&e.filePreviewKey?n.supportFiles.find(t=>t.path===e.filePreviewKey):null,a=e.revisionKey?e.proposals.find(t=>t.key===e.revisionKey):null,o=e.proposals.filter(e=>e.status===`pending`),s=n??o[0]??e.proposals[0],c=e.proposals.length===0&&!e.loading&&!e.error?ht({agentName:G(e,E(`skillWorkshop.empty.defaultAgent`)),selfLearning:e.selfLearning,onSelfLearningToggle:e.onSelfLearningToggle}):e.mode===`today`?Ot(e,s,o):yt(e,r,n);return x`
    <section class="skill-workshop sw-mode-${e.mode}">
      ${e.error?x`<div class="sw-error" role="status">
            <span>${e.error}</span>
            <button type="button" class="btn btn--sm" @click=${e.onRetry}>
              ${E(`pluginsPage.tryAgain`)}
            </button>
          </div>`:v}
      ${qe(e.selfLearning)}
      ${ze({state:e.historyScan,onScan:e.onHistoryScan})}
      <div class="sw-view" data-mode=${e.mode}>
        ${le(e.mode,x`<div class="sw-view__pane">${c}</div>`)}
      </div>
    </section>
    ${i&&n?x`
          <openclaw-file-preview-modal
            .files=${n.supportFiles}
            .activePath=${i.path}
            .query=${e.filePreviewQuery}
            .contextLabel=${E(`skillWorkshop.previewContext`,{slug:n.slug})}
            @file-preview-query-change=${t=>e.onFilePreviewQueryChange(t.detail)}
            @file-preview-select=${t=>e.onPreviewFile(n.key,t.detail)}
            @file-preview-close=${e.onClosePreview}
          ></openclaw-file-preview-modal>
        `:v}
    ${a?vt(e,a):v}
  `}function vt(e,t){let n=e.actionBusy?.key===t.key&&e.actionBusy.action===`revise`,r=e.revisionDraft.trim().length>0&&!e.actionBusy,i=e.mode===`board`?E(`skillWorkshop.actions.revise`):E(`skillWorkshop.actions.tweak`);return x`
    <openclaw-modal-dialog
      .label=${`${E(`skillWorkshop.revision.title`,{verb:i})}: ${t.slug}`}
      .description=${E(`skillWorkshop.revision.description`)}
      style="--openclaw-modal-width: 560px"
      @modal-cancel=${e.onRevisionCancel}
    >
      <section class="sw-revision-dialog ${n?`sw-revision-dialog--sending`:``}">
        <div class="sw-revision-dialog__head">
          <div>
            <div class="sw-revision-dialog__eyebrow">
              ${E(`skillWorkshop.revision.title`,{verb:i})}
            </div>
            <h2 id="sw-revision-title">${t.slug}</h2>
          </div>
          <openclaw-tooltip content=${E(`skillWorkshop.actions.close`)}>
            <button
              type="button"
              class="sw-revision-dialog__close"
              aria-label=${E(`skillWorkshop.actions.close`)}
              ?disabled=${!!e.actionBusy}
              @click=${e.onRevisionCancel}
            >
              ×
            </button>
          </openclaw-tooltip>
        </div>
        <p class="sw-revision-dialog__copy">${E(`skillWorkshop.revision.description`)}</p>
        <textarea
          class="sw-revision-dialog__input"
          autofocus
          placeholder=${E(`skillWorkshop.revision.placeholder`)}
          .value=${e.revisionDraft}
          ?disabled=${!!e.actionBusy}
          @input=${t=>e.onRevisionDraftChange(t.target.value??``)}
        ></textarea>
        ${n?x`
              <div class="sw-revision-dialog__status" role="status">
                <span class="sw-revision-dialog__status-dot" aria-hidden="true"></span>
                <span>${E(`skillWorkshop.revision.preparing`)}</span>
              </div>
            `:v}
        <div class="sw-revision-dialog__actions">
          <button
            type="button"
            class="sw-btn sw-btn--ghost"
            ?disabled=${!!e.actionBusy}
            @click=${e.onRevisionCancel}
          >
            ${E(`skillWorkshop.actions.cancel`)}
          </button>
          <button
            type="button"
            class="sw-btn sw-btn--primary ${n?`is-busy`:``}"
            ?disabled=${!r}
            @click=${()=>e.onRevisionSubmit(t.key)}
          >
            ${E(n?`skillWorkshop.actions.sending`:`skillWorkshop.revision.send`)}
          </button>
        </div>
      </section>
    </openclaw-modal-dialog>
  `}function yt(e,t,n){return x`
    ${Ct(e)}
    <div class="sw-triage" style=${se({"--sw-queue-width":`${e.queueWidth}px`})}>
      ${wt(e,t,n)} ${bt(e)}
      ${n?Et(e,n):ft(e.query,e.statusFilter)}
    </div>
  `}function bt(e){return x`
    <div
      class="sw-queue-resizer"
      role="separator"
      aria-label=${E(`skillWorkshop.queue.resize`)}
      aria-orientation="vertical"
      tabindex="0"
      @pointerdown=${t=>xt(t,e)}
      @keydown=${t=>St(t,e)}
    ></div>
  `}function xt(e,t){e.preventDefault(),e.stopPropagation();let n=e.clientX,r=t.queueWidth,i=document.body,a=i.style.cursor,o=i.style.userSelect;i.style.cursor=`col-resize`,i.style.userSelect=`none`;let s=()=>{window.removeEventListener(`pointermove`,c),window.removeEventListener(`pointerup`,l),window.removeEventListener(`pointercancel`,l),i.style.cursor=a,i.style.userSelect=o},c=e=>{t.onQueueWidthChange(r+e.clientX-n)},l=()=>{s()};window.addEventListener(`pointermove`,c),window.addEventListener(`pointerup`,l),window.addEventListener(`pointercancel`,l)}function St(e,t){if(e.key!==`ArrowLeft`&&e.key!==`ArrowRight`)return;e.preventDefault();let n=e.key===`ArrowLeft`?-24:24;t.onQueueWidthChange(t.queueWidth+n)}function Ct(e){return x`
    <div class="sw-lifecycle-tabs">
      ${Ht.map(t=>{let n=e.statusFilter===t,r=e.counts[t]??0;return x`
          <button
            class="sw-lifecycle-tab ${n?`is-active`:``}"
            @click=${()=>e.onStatusFilterChange(t)}
          >
            ${E(Z[t])} <span class="settings-count">${r}</span>
          </button>
        `})}
    </div>
  `}function wt(e,t,n){let r=t.reduce((e,t)=>e+t.items.length,0);return x`
    <aside class="sw-queue">
      <div class="sw-queue__search">
        <input
          placeholder=${E(`skillWorkshop.queue.search`)}
          .value=${e.query}
          @input=${t=>e.onQueryChange(t.target.value??``)}
        />
      </div>
      <div class="sw-queue__body">
        ${r===0?x`<div class="sw-queue__empty">${Vt(e)}</div>`:t.map(t=>x`
                <div class="sw-queue__group">
                  ${E(t.label)}
                  <span class="settings-count">${t.items.length}</span>
                </div>
                ${t.items.map(t=>Tt(e,t,n))}
              `)}
      </div>
    </aside>
  `}function Tt(e,t,n){let r=n?.key===t.key;return x`
    <button
      class="sw-row ${t.isNew?`is-new`:`is-seen`} ${r?`is-selected`:``}"
      @click=${()=>e.onSelect(t.key)}
    >
      <span class="sw-row__dot"></span>
      <span>
        <span class="sw-row__title">${t.name}</span>
        <span class="sw-row__desc">${t.oneLine}</span>
      </span>
      <span class="sw-row__meta">${t.ageLabel}</span>
    </button>
  `}function Et(e,t){let n=t.updatedAt&&t.updatedAt>t.createdAt?t.updatedAt:null,r=n?E(`skillWorkshop.detail.edited`,{time:X(n)}):E(`skillWorkshop.detail.created`,{time:X(t.createdAt)}),i=e.inspectingKey===t.key&&!t.body,a=t.supportFiles[0];return x`
    <div class="sw-detail">
      <div class="sw-detail__head">
        <div class="sw-detail__head-left">
          <h1 class="sw-detail__title">${t.name}</h1>
          <div class="sw-detail__one-line">${t.oneLine}</div>
          <div class="sw-detail__meta">
            <span>${r}</span>
            <span>·</span>
            <span>v${t.version}</span>
            <span>·</span>
            ${a?x`<button
                  class="sw-detail__meta-link"
                  @click=${()=>e.onPreviewFile(t.key,a.path)}
                >
                  ${E(`skillWorkshop.detail.supportFiles`,{count:String(t.supportFiles.length)})}
                </button>`:x`<span>${E(`skillWorkshop.detail.noSupportFiles`)}</span>`}
          </div>
        </div>
        <div class="sw-detail__nav">
          <openclaw-tooltip content=${E(`skillWorkshop.actions.previous`)}>
            <button aria-label=${E(`skillWorkshop.actions.previous`)} @click=${e.onPrev}>
              ↑
            </button>
          </openclaw-tooltip>
          <openclaw-tooltip content=${E(`skillWorkshop.actions.next`)}>
            <button aria-label=${E(`skillWorkshop.actions.next`)} @click=${e.onNext}>↓</button>
          </openclaw-tooltip>
        </div>
      </div>

      <div class="sw-detail__body">
        <div class="sw-body-card">
          <h1>${t.slug}</h1>
          ${i?x`<p class="sw-muted">${E(`skillWorkshop.detail.loading`)}</p>`:Rt(t.body)}
        </div>

        ${t.supportFiles.length>0?x`
              <div class="sw-section" style="margin-top: 18px;">
                <h3 class="sw-section__label">${E(`skillWorkshop.detail.supportFilesTitle`)}</h3>
                <div class="sw-files">
                  ${t.supportFiles.map(n=>x`
                      <button
                        class="sw-file"
                        @click=${()=>e.onPreviewFile(t.key,n.path)}
                      >
                        <span>📄</span>
                        <span class="sw-file__name">${n.path}</span>
                        <span class="sw-file__size"
                          >${n.size}
                          <span class="sw-file__hint"
                            >${E(`skillWorkshop.detail.clickToPreview`)}</span
                          ></span
                        >
                      </button>
                    `)}
                </div>
              </div>
            `:v}
        ${t.evaluation?K(t.evaluation):v}
      </div>

      ${e.actionNotice?.key===t.key?W(e.actionNotice):v}
      ${t.status===`pending`?Dt(e,t):v}
    </div>
  `}function W(e){return x`
    <div class="sw-action-toast" role="status" aria-live="polite">
      <span>${e.label}</span>
      <strong>${e.slug}</strong>
      <span>·</span>
    </div>
  `}function Dt(e,t){let n=e.actionBusy?.key===t.key?e.actionBusy.action:null,r=!!e.actionBusy;return x`
    <div class="sw-action-bar" aria-busy=${n?`true`:`false`}>
      <button
        class="sw-btn ${n===`evaluate`?`is-busy`:``}"
        ?disabled=${r}
        @click=${()=>e.onEvaluate(t.key)}
      >
        ${E(n===`evaluate`?`skillWorkshop.actions.evaluating`:`skillWorkshop.actions.evaluate`)}
      </button>
      <button
        class="sw-btn sw-btn--primary ${n===`apply`?`is-busy`:``}"
        ?disabled=${r}
        @click=${()=>e.onApply(t.key)}
      >
        ${E(n===`apply`?`skillWorkshop.actions.applying`:`skillWorkshop.actions.apply`)}
      </button>
      <button
        class="sw-btn ${n===`revise`?`is-busy`:``}"
        ?disabled=${r}
        @click=${()=>e.onRevise(t.key)}
      >
        ${E(n===`revise`?`skillWorkshop.actions.opening`:`skillWorkshop.actions.revise`)}
      </button>
      <button
        class="sw-btn sw-btn--ghost sw-btn--danger ${n===`reject`?`is-busy`:``}"
        ?disabled=${r}
        @click=${()=>e.onReject(t.key)}
      >
        ${E(n===`reject`?`skillWorkshop.actions.rejecting`:`skillWorkshop.actions.reject`)}
      </button>
    </div>
  `}function G(e,t){return e.workshopAgentName.trim()||e.assistantName.trim()||t}function Ot(e,t,n){if(!t)return x`
      <div class="sw-today sw-today--empty">
        <p class="sw-empty__title">${E(`skillWorkshop.today.emptyTitle`)}</p>
        <p class="sw-empty__sub">${E(`skillWorkshop.today.emptyBody`)}</p>
      </div>
    `;let r=Math.max(0,n.findIndex(e=>e.key===t.key)),i=Math.max(n.length,1),a=n.filter(e=>e.key!==t.key).slice(0,3),o=e.proposals.filter(e=>e.status===`applied`).slice(0,3),s=t.isNew?E(`skillWorkshop.today.new`):t.status===`pending`?E(`skillWorkshop.today.waiting`):E(`skillWorkshop.today.reviewed`),c=t.ageLabel,l=Lt(Date.now()),u=t.status===`pending`,d=e.actionBusy?.key===t.key?e.actionBusy.action:null,f=!!e.actionBusy,p=G(e,E(`skillWorkshop.today.agent`)),m=t.supportFiles[0];return x`
    <div class="sw-today">
      <div class="sw-today__head">
        <div class="sw-today__date">${l}</div>
        <h1 class="sw-today__h1">
          ${E(`skillWorkshop.today.proposalsWaiting`,{count:String(n.length)})}
        </h1>
        ${n.length===0?x`<div class="sw-today__sub">${E(`skillWorkshop.today.browseApplied`)}</div>`:v}
        ${n.length>0?x`
              <div class="sw-today__progress">
                <span
                  >${E(`skillWorkshop.today.progress`,{current:String(r+1),total:String(i)})}</span
                >
                <div class="sw-today__dots">
                  ${n.map((e,t)=>x`
                      <span
                        class="sw-today__dot ${t<r?`is-done`:t===r?`is-now`:``}"
                      ></span>
                    `)}
                </div>
              </div>
            `:v}
      </div>

      <article class="sw-today__hero">
        <div class="sw-today__label">
          <span class="sw-today__ping"></span>
          ${s} · ${c}
        </div>
        <h2 class="sw-today__name">${t.slug}</h2>
        <p class="sw-today__one-liner">${t.oneLine}</p>

        ${Mt(t)}

        <div class="sw-today__author">
          <span class="sw-today__avatar">v${t.version}</span>
          <span>
            ${E(`skillWorkshop.today.draftedBy`)}
            <strong>${p}</strong> · ${c}.
            ${m?x`
                  <button
                    class="sw-today__files-link"
                    @click=${()=>e.onPreviewFile(t.key,m.path)}
                  >
                    ${E(t.supportFiles.length===1?`skillWorkshop.today.supportFile`:`skillWorkshop.today.supportFiles`,{count:String(t.supportFiles.length)})}
                  </button>
                  ${E(`skillWorkshop.today.comeWithIt`)}
                `:v}
          </span>
        </div>

        ${t.evaluation?K(t.evaluation,!0):v}
        ${u?x`
              <div class="sw-today__actions" aria-busy=${d?`true`:`false`}>
                <button
                  class="sw-today__big sw-today__big--evaluate ${d===`evaluate`?`is-busy`:``}"
                  ?disabled=${f}
                  @click=${()=>e.onEvaluate(t.key)}
                >
                  ${E(d===`evaluate`?`skillWorkshop.actions.evaluating`:`skillWorkshop.today.evaluate`)}
                  <span class="sw-today__big-sub">${E(`skillWorkshop.today.runChecks`)}</span>
                </button>
                <button
                  class="sw-today__big sw-today__big--primary ${d===`apply`?`is-busy`:``}"
                  ?disabled=${f}
                  @click=${()=>e.onApply(t.key)}
                >
                  ${E(d===`apply`?`skillWorkshop.actions.applying`:`skillWorkshop.today.useIt`)}
                  <span class="sw-today__big-sub">${E(`skillWorkshop.today.addToSkills`)}</span>
                </button>
                <button
                  class="sw-today__big sw-today__big--tweak ${d===`revise`?`is-busy`:``}"
                  ?disabled=${f}
                  @click=${()=>e.onRevise(t.key)}
                >
                  ${E(d===`revise`?`skillWorkshop.actions.opening`:`skillWorkshop.today.tweakIt`)}
                  <span class="sw-today__big-sub">${E(`skillWorkshop.today.askAgent`)}</span>
                </button>
                <button
                  class="sw-today__big sw-today__big--skip ${d===`reject`?`is-busy`:``}"
                  ?disabled=${f}
                  @click=${()=>e.onReject(t.key)}
                >
                  ${E(d===`reject`?`skillWorkshop.today.skipping`:`skillWorkshop.today.skip`)}
                  <span class="sw-today__big-sub">${E(`skillWorkshop.today.notForMe`)}</span>
                </button>
              </div>
            `:v}
        ${e.actionNotice?.key===t.key?W(e.actionNotice):v}
      </article>

      ${a.length>0?x`
            <section class="sw-today__section">
              <header class="sw-today__section-head">
                <h3>
                  ${E(`skillWorkshop.today.upNext`,{count:String(n.length-1)})}
                </h3>
                <button class="sw-today__link" @click=${()=>e.onModeChange(`board`)}>
                  ${E(`skillWorkshop.today.seeAll`)}
                </button>
              </header>
              <div class="sw-today__upnext">
                ${a.map(t=>x`
                    <button class="sw-today__mini" @click=${()=>e.onSelect(t.key)}>
                      <div class="sw-today__mini-name">${t.slug}</div>
                      <div class="sw-today__mini-desc">${t.oneLine}</div>
                      <div class="sw-today__mini-meta">${t.ageLabel}</div>
                    </button>
                  `)}
              </div>
            </section>
          `:v}
      ${o.length>0?x`
            <section class="sw-today__section">
              <header class="sw-today__section-head">
                <h3>
                  ${E(`skillWorkshop.today.collection`,{count:String(e.counts.applied)})}
                </h3>
                <button
                  class="sw-today__link sw-today__link--muted"
                  @click=${()=>e.onModeChange(`board`)}
                >
                  ${E(`skillWorkshop.today.manage`)}
                </button>
              </header>
              <div class="sw-today__applied">
                ${o.map(t=>x`
                    <button
                      class="sw-today__applied-row"
                      @click=${()=>{e.onSelect(t.key),e.onModeChange(`board`)}}
                    >
                      <span class="sw-today__check">✓</span>
                      <span class="sw-today__applied-name">
                        <strong>${t.slug}</strong> — ${t.oneLine}
                      </span>
                      <span class="sw-today__applied-when">${t.ageLabel}</span>
                    </button>
                  `)}
              </div>
            </section>
          `:v}
    </div>
  `}function K(e,t=!1){let n=Date.parse(e.completedAt);return x`
    <section class="sw-evaluation ${t?`sw-evaluation--today`:``}">
      <header class="sw-evaluation__head">
        <h3>${E(`skillWorkshop.evaluation.title`)}</h3>
        <div class="sw-evaluation__meta">
          <span>
            ${E(`skillWorkshop.evaluation.version`,{version:e.proposedVersion})}
          </span>
          ${Number.isFinite(n)?x`<span>
                ${E(`skillWorkshop.evaluation.completedAt`,{time:X(n)})}
              </span>`:v}
        </div>
      </header>
      <div class="sw-evaluation__outcomes">
        ${e.outcomes.map(e=>kt(e))}
      </div>
    </section>
  `}function kt(e){let t=e.result,n=e.pluginVersion?`${e.pluginId} ${e.pluginVersion}`:e.pluginId;return x`
    <section class="sw-evaluation__outcome">
      <div class="sw-evaluation__outcome-head">
        <div class="sw-evaluation__identity">
          <strong>${e.evaluatorId}</strong>
          <span>${n}</span>
        </div>
        <div class="sw-evaluation__badges">
          <span class="sw-evaluation__badge is-${e.status}">
            ${E(`skillWorkshop.evaluation.status.${e.status}`)}
          </span>
          ${t?.decision?x`<span class="sw-evaluation__badge is-${t.decision}">
                ${E(`skillWorkshop.evaluation.decision.${t.decision}`)}
              </span>`:v}
        </div>
      </div>
      ${t?.summary?x`<p class="sw-evaluation__summary">${t.summary}</p>`:v}
      ${t?.decisionReason?x`<p class="sw-evaluation__reason">${t.decisionReason}</p>`:v}
      ${e.error?x`<p class="sw-evaluation__error">${e.error}</p>`:v}
      ${t?.findings?.length?At(t.findings):v}
      ${t?.metrics&&Object.keys(t.metrics).length>0?jt(t.metrics):v}
      ${t?.evaluatorVersion||t?.mode?x`
            <div class="sw-evaluation__runtime">
              ${t.evaluatorVersion?x`<span>
                    ${E(`skillWorkshop.evaluation.evaluatorVersion`,{version:t.evaluatorVersion})}
                  </span>`:v}
              ${t.mode?x`<span> ${E(`skillWorkshop.evaluation.mode`,{mode:t.mode})} </span>`:v}
            </div>
          `:v}
    </section>
  `}function At(e){return x`
    <div class="sw-evaluation__findings">
      <h4>${E(`skillWorkshop.evaluation.findings`)}</h4>
      <ul>
        ${e.map(e=>{let t=e.file?e.line?E(`skillWorkshop.evaluation.fileLine`,{file:e.file,line:String(e.line)}):e.file:null;return x`
            <li>
              <span class="sw-evaluation__severity is-${e.severity}">
                ${E(`skillWorkshop.evaluation.severity.${e.severity}`)}
              </span>
              <span>
                <code class="sw-evaluation__rule">${e.ruleId}</code>
                ${e.message} ${t?x`<small>${t}</small>`:v}
              </span>
            </li>
          `})}
      </ul>
    </div>
  `}function jt(e){return x`
    <div class="sw-evaluation__metrics">
      <h4>${E(`skillWorkshop.evaluation.metrics`)}</h4>
      <dl>
        ${Object.entries(e).toSorted(([e],[t])=>e.localeCompare(t)).map(([e,t])=>x`
              <div>
                <dt>${e}</dt>
                <dd>${String(t)}</dd>
              </div>
            `)}
      </dl>
    </div>
  `}function Mt(e){let t=Nt(e.body);return t?x`
    <div class="sw-today__does">
      <div class="sw-today__does-h">${t.heading}</div>
      <ul>
        ${t.items.map(e=>x`<li>${e}</li>`)}
      </ul>
    </div>
  `:v}function Nt(e){let t=Pt(e),n=q(t,[`workflow`,`procedure`,`steps`,`agent workflow`,`process`]),r=n?Y(n.lines):[];if(r.length>0)return{heading:E(`skillWorkshop.today.workflowHeading`),items:r.slice(0,Q)};let i=q(t,[`when to use`,`use when`,`applies when`,`trigger`,`triggers`]),a=i?Y(i.lines):[];return a.length>0?{heading:E(`skillWorkshop.today.applicabilityHeading`),items:a.slice(0,Q)}:null}function Pt(e){let t=[],n=null,r=!1;for(let i of e.split(`
`)){let e=i.trim();e.startsWith("```")&&(r=!r);let a=(r?null:/^(#{2,4})\s+(.+?)\s*$/.exec(e))?.[2];if(a){n={title:J(a),lines:[]},t.push(n);continue}n?.lines.push(i)}return t}function q(e,t){let n=new Set(t.map(J));return e.find(e=>n.has(e.title))}function J(e){return e.replace(/[#*_`[\]().:]/g,` `).replace(/\s+/g,` `).trim().toLowerCase()}function Y(e){let t=[];for(let n of e){if(/^\s{2,}/.test(n))continue;let e=n.trim(),r=/^(?:[-*]|\d+\.)\s+(.+)/.exec(e)?.[1];r&&t.push(Ft(r))}return t.filter(Boolean)}function Ft(e){return It(e.replace(/^\*\*[^*]+\*\*\s*/,``).replace(/\[([^\]]+)\]\([^)]+\)/g,`$1`).replace(/`([^`]+)`/g,`$1`).replace(/\s+/g,` `).trim(),Ut)}function It(e,t){if(e.length<=t)return e;let n=w(e,t-1),r=n.lastIndexOf(` `);return`${(r>48?n.slice(0,r):n).trimEnd()}…`}function Lt(e){let t=new Date(e);return`${t.toLocaleDateString(void 0,{weekday:`long`})} · ${t.toLocaleDateString(void 0,{month:`short`,day:`numeric`})}`}function Rt(e){let t=e.split(`
`),n=[],r=[],i=[],a=!1,o=[],s=()=>{r.length&&(n.push(x`<p>${zt(r.join(` `))}</p>`),r=[])},c=()=>{if(i.length){let e=i;n.push(x`
        <ol>
          ${e.map(e=>x`<li>${zt(e)}</li>`)}
        </ol>
      `),i=[]}};for(let e of t){let t=e.trimEnd();if(t.startsWith("```")){s(),c(),a?(n.push(x`<pre>${o.join(`
`)}</pre>`),o=[],a=!1):a=!0;continue}if(a){o.push(e);continue}if(t===``){s(),c();continue}if(t.startsWith(`## `)){s(),c(),n.push(x`<h3>${t.slice(3)}</h3>`);continue}if(t.startsWith(`# `)){s(),c(),n.push(x`<h3>${t.slice(2)}</h3>`);continue}let l=/^\d+\.\s+(.+)/.exec(t)?.[1];if(l){s(),i.push(l);continue}r.push(t)}return s(),c(),a&&o.length&&n.push(x`<pre>${o.join(`
`)}</pre>`),n}function zt(e){let t=[],n=/(`[^`]+`|\*\*[^*]+\*\*)/g,r=0,i;for(;i=n.exec(e);){i.index>r&&t.push(e.slice(r,i.index));let n=i[0];n.startsWith("`")?t.push(x`<code>${n.slice(1,-1)}</code>`):t.push(x`<strong>${n.slice(2,-2)}</strong>`),r=i.index+n.length}return r<e.length&&t.push(e.slice(r)),t}function Bt(e){let t=new Map;for(let n of e){let e=t.get(n.recencyGroup)??[];e.push(n),t.set(n.recencyGroup,e)}return[`today`,`yesterday`,`earlier`].filter(e=>t.has(e)).map(e=>({label:Wt[e],items:t.get(e)??[]}))}function Vt(e){return e.error?E(`skillWorkshop.queue.loadError`):e.loading?E(`skillWorkshop.queue.loading`):e.statusFilter===`all`?E(`skillWorkshop.queue.noMatch`):E(`skillWorkshop.queue.noStatus`,{status:E(Z[e.statusFilter]).toLocaleLowerCase()})}function X(e){return c(e,{dateFallback:!0})}var Ht,Z,Q,Ut,Wt,Gt=e((()=>{T(),b(),ae(),oe(),ut(),k(),O(),D(),re(),Ae(),dt(),N(),gt(),Re(),F(),Ht=[`all`,`pending`,`applied`,`rejected`,`quarantined`,`stale`],Z={all:`skillWorkshop.status.all`,pending:`skillWorkshop.status.pending`,applied:`skillWorkshop.status.applied`,rejected:`skillWorkshop.status.rejected`,quarantined:`skillWorkshop.status.quarantined`,stale:`skillWorkshop.status.stale`},Q=3,Ut=120,Wt={today:`skillWorkshop.recency.today`,yesterday:`skillWorkshop.recency.yesterday`,earlier:`skillWorkshop.recency.earlier`}}));function Kt(e,t){let n=t?.trim();return n?e?.sessions.find(e=>e.key===n)??null:null}function qt(e){return!!(e&&!e.archived&&!e.hasActiveRun)}async function Jt(e,t){let n=e.sessions.state;return n.agentId===t&&n.result?.sessions.length?n.result:e.sessions.list({agentId:t})}async function Yt(e,t,n,r,i){if(!i())return null;let a=t.gateway.snapshot.hello;if(e.skillWorkshopUseCurrentChatForRevisions)return g(he().sessionKey,a).trim()||null;let o=f(n.origin?.agentId??r),c=await Jt(t,o);if(!i())return null;let l=Kt(c,n.origin?.sessionKey);if(qt(l))return l.key;let u={agentId:o,label:w(`Skill Workshop: ${n.slug||n.key}`,80)},d=s(t.gateway.snapshot,{method:`sessions.create`,params:u});if(!d.allowed)throw Error(d.reason);if(!i())return null;let p=g(await t.sessions.create(u),a).trim();if(!p)throw Error(t.sessions.state.error??`Could not prepare a Skill Workshop thread.`);return p}function Xt(e,t,n){let{context:r,workshopAgentName:i,onRevisionRequest:a,selfLearning:o,onSelfLearningToggle:s,onHistoryScan:c,onRetry:l}=t;return x`
    <section class=${e.skillWorkshopMode===`today`?`content--skill-workshop content--skill-workshop-today`:`content--skill-workshop`}>
      <section class="content-header content-header--page plugins-content-header">
        <div>
          <h1 class="page-title">${E(`tabs.skillWorkshop`)}</h1>
        </div>
        <div class="page-meta">
          ${$e(e,t,n)}
        </div>
      </section>
      <div class="plugins-hub-tabs-row">
        ${Te({id:`plugins`,active:`workshop`,tabs:De(),ariaLabel:E(`pluginsPage.hubTablistLabel`),panelId:Oe,className:`plugins-tabs`,onSelect:e=>tt(r,e)})}
      </div>
      <wa-tab-panel
        id=${Oe}
        class="sw-hub-panel"
        name="workshop"
        active
        aria-labelledby="plugins-tab-workshop"
      >
        ${(()=>{let t=M(e.skillWorkshopProposals,e.skillWorkshopStatusFilter,e.skillWorkshopQuery),u=t.findIndex(t=>t.key===e.skillWorkshopSelectedKey),d=t=>{e.skillWorkshopFilePreviewKey=null,Fe(e,r,t).finally(n),n()},f=e=>{if(t.length===0)return;let n=u<0?0:(u+e+t.length)%t.length,r=t[n];r&&d(r.key)},p=t=>{if(t.length===0||t.some(t=>t.key===e.skillWorkshopSelectedKey))return;let n=t[0];n&&d(n.key)};return x`<wa-tab-panel
            id="skill-workshop-mode-panel"
            name=${e.skillWorkshopMode}
            active
            aria-labelledby=${`skill-workshop-mode-tab-${e.skillWorkshopMode}`}
          >
            ${_t({loading:e.skillWorkshopLoading,error:e.skillWorkshopError,inspectingKey:e.skillWorkshopInspectingKey,proposals:e.skillWorkshopProposals,selectedKey:e.skillWorkshopSelectedKey,statusFilter:e.skillWorkshopStatusFilter,query:e.skillWorkshopQuery,filePreviewKey:e.skillWorkshopFilePreviewKey,filePreviewQuery:e.skillWorkshopFilePreviewQuery,queueWidth:e.skillWorkshopQueueWidth,mode:e.skillWorkshopMode,actionBusy:e.skillWorkshopActionBusy,actionNotice:e.skillWorkshopActionNotice,revisionKey:e.skillWorkshopRevisionKey,revisionDraft:e.skillWorkshopRevisionDraft,assistantName:r.config.current.assistantIdentity.name,workshopAgentName:i,selfLearning:o,historyScan:e.skillWorkshopHistoryScan,counts:je(e.skillWorkshopProposals),onRetry:()=>{l()},onStatusFilterChange:t=>{e.skillWorkshopStatusFilter=t,n(),p(M(e.skillWorkshopProposals,t,e.skillWorkshopQuery))},onQueryChange:t=>{e.skillWorkshopQuery=t,n(),p(M(e.skillWorkshopProposals,e.skillWorkshopStatusFilter,t))},onFilePreviewQueryChange:t=>{e.skillWorkshopFilePreviewQuery=t,n()},onQueueWidthChange:t=>{e.skillWorkshopQueueWidth=t,n()},onModeChange:t=>z(e,t,n),onSelect:d,onPrev:()=>f(-1),onNext:()=>f(1),onApply:t=>{j(e,r,`apply`,t).finally(n),n()},onEvaluate:t=>{Pe(e,r,t).finally(n),n()},onRevise:t=>{e.skillWorkshopRevisionKey=t,e.skillWorkshopRevisionDraft=``,n()},onReject:t=>{j(e,r,`reject`,t).finally(n),n()},onRevisionDraftChange:t=>{e.skillWorkshopRevisionDraft=t,n()},onRevisionCancel:()=>{e.skillWorkshopRevisionKey=null,e.skillWorkshopRevisionDraft=``,n()},onRevisionSubmit:t=>a?void Ne(e,r,t,a).finally(n):void 0,onPreviewFile:(t,r)=>{e.skillWorkshopSelectedKey=t,e.skillWorkshopFilePreviewKey=r,n()},onClosePreview:()=>{e.skillWorkshopFilePreviewKey=null,e.skillWorkshopFilePreviewQuery=``,n()},onSelfLearningToggle:s,onHistoryScan:c})}
          </wa-tab-panel>`})()}
      </wa-tab-panel>
    </section>
  `}var $;e((()=>{me(),ue(),T(),b(),y(),be(),ge(),Ee(),O(),D(),i(),ne(),ie(),ee(),N(),o(),l(),ke(),et(),Ve(),nt(),Ie(),F(),at(),R(),Gt(),t(),$=class extends u{constructor(...e){super(...e),this.operationEpoch=0,this.hasBoundContext=!1,this.gatewayClient=null,this.gatewayHello=null,this.gatewayConnected=!1,this.hasBoundAgentSelection=!1,this.hasBoundSessions=!1,this.selfLearningBusy=!1,this.selfLearningError=null,this.proposalsTask=new pe(this,{autoRun:!1,args:()=>[this.gatewayConnected?this.context??null:null,this.gatewayConnected?this.state??null:null,this.selectedAgentId??null,!1],task:([e,t,n,r])=>e&&t?Le({state:t,context:e,force:r}):fe,onComplete:()=>{this.requestPageUpdate()},onError:()=>{this.requestPageUpdate()}}),this.subscriptions=new r(this).effect(()=>this.context,e=>{let t=this.hasBoundContext&&this.contextSource!==e;if(this.hasBoundContext=!0,this.contextSource=e,t){let t=e.gateway;this.gatewaySource=t,this.gatewayClient=t.snapshot.client,this.gatewayHello=t.snapshot.hello,this.gatewayConnected=t.snapshot.phase===`connected`,this.agentSelectionSource=e.agentSelection,this.selectedAgentId=e.agentSelection.state.selectedId,this.sessionsSource=e.sessions,this.resetSourceState(),this.loadProposals(!0)}}).effect(()=>this.context?.gateway,e=>{let t=e.snapshot,n=this.gatewaySource!==void 0&&this.gatewaySource!==e,r=this.gatewaySource!==void 0&&this.gatewayClient!==t.client,i=this.gatewaySource!==void 0&&this.gatewayConnected!==(t.phase===`connected`),a=this.gatewaySource!==void 0&&this.gatewayHello!==t.hello;return this.applyGatewaySnapshot(e,t,n||r||i||a),e.subscribe(t=>{if(this.gatewaySource!==e||this.context?.gateway!==e)return;let n=t.client!==this.gatewayClient||t.phase===`connected`!==this.gatewayConnected||t.hello!==this.gatewayHello;this.applyGatewaySnapshot(e,t,n)})}).watch(()=>this.context?.config,(e,t)=>e.subscribe(t)).effect(()=>this.context?.agentSelection,e=>{let t=this.hasBoundAgentSelection&&this.agentSelectionSource!==e;this.hasBoundAgentSelection=!0,this.agentSelectionSource=e;let n=!0,r=()=>{if(this.agentSelectionSource!==e||this.context?.agentSelection!==e)return;let r=e.state.selectedId,i=!n&&this.selectedAgentId!==r;this.selectedAgentId=r;let a=t||i;t=!1,n=!1,a&&this.resetSourceState(),this.loadProposals(a)};return r(),e.subscribe(r)}).effect(()=>this.context?.sessions,e=>{let t=this.hasBoundSessions&&this.sessionsSource!==e;this.hasBoundSessions=!0,this.sessionsSource=e,t&&(this.resetSourceState(),this.loadProposals(!0))}).watch(()=>this.context?.agentIdentity,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)),this.handleRevisionRequest=async(e,t,n)=>{let r=this.captureSourceScope();if(!r)throw Error(`Skill Workshop is not ready.`);let i;try{i=await Yt(r.state,r.context,t,n,()=>this.isCurrentSourceScope(r))}catch(e){if(!this.isCurrentSourceScope(r))return;throw e}if(this.isCurrentSourceScope(r)){if(!i)throw Error(r.sessions.state.error??`Could not prepare a Skill Workshop thread.`);try{r.revision.prepare({sessionKey:i,instructions:e,proposalId:t.key,proposalAgentId:f(t.origin?.agentId??n)})}catch(e){if(!this.isCurrentSourceScope(r))return;throw e}this.isCurrentSourceScope(r)&&r.navigate(`chat`,m({context:r.context,face:`chat`,sessionKey:i}).options)}},this.requestPageUpdate=()=>{this.isConnected&&this.requestUpdate()},this.handleHistoryScan=()=>{let e=this.captureSourceScope();e&&(Be({state:e.state,context:e.context,current:()=>{let e=this.state,t=this.context;return e&&t?{state:e,context:t}:void 0}}).finally(this.requestPageUpdate),this.requestPageUpdate())},this.handleSelfLearningToggle=e=>{this.applySelfLearningToggle(e)}}willUpdate(){!this.state&&this.context&&(this.state=Me(this.data),this.state.skillWorkshopMode=Je(),this.state.skillWorkshopUseCurrentChatForRevisions=Xe())}updated(){let e=this.state,t=e&&!e.skillWorkshopLoaded&&!e.skillWorkshopLoading&&!e.skillWorkshopError;this.gatewayConnected&&t&&this.loadProposals(!1),this.ensureWorkshopAgentIdentity();let n=this.context?.runtimeConfig;n&&this.gatewayConnected&&!n.state.configSnapshot&&!n.state.configLoading&&n.ensureLoaded()}resetSourceState(){this.operationEpoch+=1,this.proposalsTask.run([null,null,null,!1]);let e=this.state;if(!e)return;e.skillWorkshopActionNoticeTimer&&globalThis.clearTimeout(e.skillWorkshopActionNoticeTimer);let t=Me();t.skillWorkshopStatusFilter=e.skillWorkshopStatusFilter,t.skillWorkshopQuery=e.skillWorkshopQuery,t.skillWorkshopQueueWidth=e.skillWorkshopQueueWidth,t.skillWorkshopMode=e.skillWorkshopMode,t.skillWorkshopUseCurrentChatForRevisions=e.skillWorkshopUseCurrentChatForRevisions,this.state=t,this.requestPageUpdate()}applyGatewaySnapshot(e,t,n){this.gatewaySource=e,this.gatewayClient=t.client,this.gatewayHello=t.hello,this.gatewayConnected=t.phase===`connected`,n&&this.resetSourceState(),t.phase===`connected`&&(n||!this.state?.skillWorkshopLoaded)&&this.loadProposals(n)}captureSourceScope(){return rt({state:this.state,context:this.context,epoch:this.operationEpoch})}isCurrentSourceScope(e){return it(e,{state:this.state,context:this.context,epoch:this.operationEpoch})}loadProposals(e){let t=this.state,n=this.context;!t||!n||n.gateway.snapshot.phase!==`connected`||this.proposalsTask.run([n,t,n.agentSelection.state.selectedId,e])}async applySelfLearningToggle(e){let t=this.context?.runtimeConfig;if(!(!t||this.selfLearningBusy)){this.selfLearningBusy=!0,this.selfLearningError=null,this.requestPageUpdate();try{this.selfLearningError=await We(t,e)}finally{this.selfLearningBusy=!1,this.requestPageUpdate()}}}ensureWorkshopAgentIdentity(){let e=this.context,t=this.state?.skillWorkshopAgentId;!e||!t||e.agentIdentity.get(t)||e.agentIdentity.ensure([t])}disconnectedCallback(){this.subscriptions.clear(),this.resetSourceState(),super.disconnectedCallback()}render(){return this.state&&this.context?Xt(this.state,{context:this.context,workshopAgentName:this.context.agentIdentity.get(this.state.skillWorkshopAgentId)?.name?.trim()??``,onRevisionRequest:this.onRevisionRequest??this.handleRevisionRequest,selfLearning:Ue(this.context.runtimeConfig,this.selfLearningBusy,this.selfLearningError),onSelfLearningToggle:this.handleSelfLearningToggle,onHistoryScan:this.handleHistoryScan,onRetry:()=>this.loadProposals(!0)},this.requestPageUpdate):v}},n([de({context:_e,subscribe:!0})],$.prototype,`context`,void 0),n([S({attribute:!1})],$.prototype,`data`,void 0),n([S({attribute:!1})],$.prototype,`onRevisionRequest`,void 0),customElements.get(`openclaw-skill-workshop-page`)||customElements.define(`openclaw-skill-workshop-page`,$)}))();
//# sourceMappingURL=skill-workshop-page-Cr0nubVT.js.map