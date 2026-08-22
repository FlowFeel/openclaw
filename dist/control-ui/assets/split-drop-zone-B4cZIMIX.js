const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./file-editor-view-Dy7bVtXr.js","./rolldown-runtime-DaJ6WEGw.js","./control-ui-foundation-OE0aAIzW.js","./control-ui-foundation-Dgui328h.js","./lit-runtime-D5xZwgO1.js","./control-ui-foundation-DkfOBVsU.js","./dist-BcLEWlxS.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{S as t,b as n,x as r,y as i}from"./control-ui-foundation-OE0aAIzW.js";import{K as a,Kc as o,Wc as s}from"./control-ui-core-CrKLOOVi.js";import{C as c,K as l,Q as u,W as d,Y as f,_ as ee,b as te,g as ne,it as p,m,nt as h,w as g}from"./lit-runtime-D5xZwgO1.js";import{f as re,g as _,p as ie}from"./control-ui-foundation-Dgui328h.js";import{o as v,t as y}from"./control-ui-core-DkYXaYTI.js";import{gt as b,ot as x,vt as S,yt as C}from"./control-ui-core-CTll8UdE.js";import{m as ae,p as oe}from"./control-ui-shared-DipCL0pR.js";import{c as se,l as w,s as T,u as ce}from"./session-pull-requests-CTFLm_Tj.js";import{o as le,t as ue}from"./message-extract-DjyH7LX1.js";import{n as E,t as de}from"./open-external-url-DvqodFBp.js";import{a as fe,i as pe,n as me,o as D,t as he}from"./markdown-CTmZm9Ts.js";import{i as ge,t as _e}from"./markdown-code-blocks-CBqrfjAA.js";import{_ as ve,v as ye,y as O}from"./chat-message-LFk-poAG.js";import{a as be,i as xe,n as k}from"./tool-display-C60dD7Q4.js";function A(e){return structuredClone(e)}function j(e){return Math.min(R,Math.max(260,e))}function M(e){return e===`chat`?L:I}function Se(e){return Math.min(...e.panels.map(e=>V[e.slot]))}function N(e,t){let n=`${t}-column`,r=new Set(e.columns.map(e=>e.id));if(!r.has(n))return n;let i=2;for(;r.has(`${n}-${i}`);)i+=1;return`${n}-${i}`}function Ce(e,t){let n=new Set(e.columns.flatMap(e=>e.panels.map(e=>e.id)));if(!n.has(t))return t;let r=2;for(;n.has(`${t}-${r}`);)r+=1;return`${t}-${r}`}function P(e,t,n){let r=e.columns.flatMap((e,n)=>e.side===t?[n]:[]);if(r.length===0){let n=e.columns.findIndex(e=>e.side===`right`);return t===`left`&&n>=0?n:e.columns.length}let i=Math.max(0,Math.min(n,r.length));return i===r.length?(r.at(-1)??-1)+1:r[i]??0}function F(e,t){for(let n=0;n<e.columns.length;n+=1){let r=e.columns[n],i=r.panels.findIndex(e=>e.id===t);if(i<0)continue;let a=r.panels.splice(i,1)[0];return r.panels.length===0?e.columns.splice(n,1):r.activePanelId===t&&(r.activePanelId=r.panels[Math.min(i,r.panels.length-1)]?.id??``),a}return null}function we(e,t,n=`right`){let r=A(e);if(r.columns.some(e=>e.panels.some(e=>e.slot===t)))return r;let i={id:Ce(r,t),slot:t},a={id:N(r,i.id),side:n,panels:[i],activePanelId:i.id,width:M(t)},o=r.columns.filter(e=>e.side===n),s=o.findIndex(e=>Se(e)>V[t]),c=s>=0?s:o.length;return r.columns.splice(P(r,n,c),0,a),r}function Te(e,t){let n=A(e),r=n.columns.flatMap(e=>e.panels).find(e=>e.slot===t);return r&&F(n,r.id),n}function Ee(e,t){let n=A(e),r=n.columns.find(e=>e.panels.some(e=>e.id===t));return r&&(r.activePanelId=t),n}function De(e,t,n,r){let i=A(e),a=i.columns.find(e=>e.panels.some(e=>e.id===t)),o=a?.panels.findIndex(e=>e.id===t)??-1,s=a?.id===n,c=F(i,t),l=i.columns.find(e=>e.id===n);if(!c||!l)return A(e);let u=Math.trunc(r)-(s&&o<r?1:0),d=Math.max(0,Math.min(u,l.panels.length));return l.panels.splice(d,0,c),l.activePanelId=c.id,i}function Oe(e,t,n,r){let i=A(e),a=i.columns.find(e=>e.panels.some(e=>e.id===t)),o=a?i.columns.filter(e=>e.side===a.side).indexOf(a):-1,s=a?.panels.length===1,c=a?.width??I,l=F(i,t);if(!l)return i;let u={id:N(i,l.id),side:n,panels:[l],activePanelId:l.id,width:c},d=a?.side===n&&s&&o<r?r-1:r;return i.columns.splice(P(i,n,Math.trunc(d)),0,u),i}function ke(e,t,n){let r=A(e),i=r.columns.find(e=>e.id===t);return i&&Number.isFinite(n)&&(i.width=j(n)),r}function Ae(e,t,n){let r=A(e);if(!Number.isFinite(t)||t<=0)return r;let i=Math.max(260,Math.min(R,t*.6));for(let e of r.columns)e.width=Math.min(i,j(e.width));let a=Math.max(0,t-z-r.columns.length*B);if(r.columns.length*260>a)return null;let o=r.columns.reduce((e,t)=>e+t.width,0)-a,s=r.columns.toSorted((e,t)=>Number(e.id===n)-Number(t.id===n)||t.width-e.width);for(let e of s){if(o<=0)break;let t=Math.min(o,e.width-260);e.width-=t,o-=t}return r}function je(e,t){return t<680||z+e.columns.length*264>t}function Me(e,t){let n=e.columns.reduce((e,t)=>e+t.width,0);return Math.max(z,t-n-e.columns.length*B)}var I,L,R,z,B,V,Ne=e((()=>{a(),I=360,L=480,R=1200,z=312,B=4,V={chat:0,detail:1,discussion:2}}));function Pe(e,t,n=H){let r=[],i=!1,a=!1,o=0,s=0,c,l=e.replace(/\r\n/g,`
`).split(`
`);l.at(-1)===``&&l.pop();for(let e of l){let l=/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(e);if(l){let e=Number.parseInt(l[1]??``,10),n=Number.parseInt(l[2]??``,10),i=c===void 0?e-1:e-c;i>0&&r.push({kind:`skip`,text:t(i)}),o=e,s=n,a=!0;continue}if(!(!a||e.startsWith(`\\`))){if(r.length>=n){i=!0;break}e.startsWith(`+`)?(r.push({kind:`add`,lineNo:s,text:e.slice(1)}),s+=1):e.startsWith(`-`)?(r.push({kind:`del`,lineNo:o,text:e.slice(1)}),o+=1):(r.push({kind:`ctx`,lineNo:s,text:e.slice(1)}),o+=1,s+=1),c=o}}return{lines:r,truncated:i}}var H,Fe=e((()=>{H=600}));function Ie(e){switch(e.status){case`added`:return v(`chat.sessionDiff.statusAdded`);case`deleted`:return v(`chat.sessionDiff.statusDeleted`);case`renamed`:return v(`chat.sessionDiff.statusRenamed`);default:return v(`chat.sessionDiff.statusModified`)}}var U,Le=e((()=>{re(),d(),u(),C(),b(),y(),Fe(),o(),ve(),n(),U=class extends s{constructor(...e){super(...e),this.loader=null,this.collapsedPaths=new Set,this.diffTask=new ie(this,{args:()=>[this.loader],task:async([e])=>{if(!e)return null;let t=await e();return{result:t,views:t.files.map(e=>({file:e,parsed:e.patch?Pe(e.patch,e=>v(`chat.sessionDiff.unmodifiedLines`,{count:String(e)})):null}))}},onComplete:()=>{this.collapsedPaths=new Set}})}get loading(){return this.diffTask.status===_.PENDING}refresh(){return this.diffTask.run()}toggleFile(e){let t=new Set(this.collapsedPaths);t.has(e)?t.delete(e):t.add(e),this.collapsedPaths=t}renderSummary(e){let t=e.baseRef&&e.branch&&e.baseRef!==e.branch?`${e.baseRef} → ${e.branch}`:e.branch??e.baseRef??``;return f`
      <div class="session-diff__summary">
        <span class="session-diff__branch" title=${e.root??``}>
          ${S.gitBranch}
          <span class="session-diff__branch-label">${t}</span>
        </span>
        ${O({added:e.additions,removed:e.deletions})}
        <openclaw-tooltip .content=${v(`chat.sessionDiff.refresh`)}>
          <button
            class="btn btn--ghost btn--icon session-diff__refresh"
            type="button"
            aria-label=${v(`chat.sessionDiff.refresh`)}
            ?disabled=${this.loading}
            @click=${()=>void this.refresh()}
          >
            ${S.refresh}
          </button>
        </openclaw-tooltip>
      </div>
    `}renderFileBody(e){let{file:t,parsed:n}=e;return t.binary===!0?f`<div class="session-diff__note">${v(`chat.sessionDiff.binaryFile`)}</div>`:n?f`
      ${ye(n.lines)}
      ${n.truncated?f`<div class="session-diff__note">${v(`chat.sessionDiff.truncatedFile`)}</div>`:l}
    `:f`<div class="session-diff__note">${v(`chat.sessionDiff.tooLarge`)}</div>`}renderFile(e){let{file:t}=e,n=this.collapsedPaths.has(t.path);return f`
      <section class="session-diff__file" data-status=${t.status}>
        <button
          class="session-diff__file-header"
          type="button"
          aria-expanded=${String(!n)}
          @click=${()=>this.toggleFile(t.path)}
        >
          <span class="session-diff__chevron ${n?``:`session-diff__chevron--open`}">
            ${S.chevronRight}
          </span>
          <span
            class="session-diff__status session-diff__status--${t.status}"
            title=${Ie(t)}
          ></span>
          <span class="session-diff__path">
            ${t.oldPath?f`<span class="session-diff__old-path">${t.oldPath}</span> → `:l}${t.path}
          </span>
          ${t.untracked===!0?f`<span class="session-diff__badge">${v(`chat.sessionDiff.untracked`)}</span>`:l}
          ${O({added:t.additions,removed:t.deletions})}
        </button>
        ${n?l:this.renderFileBody(e)}
      </section>
    `}renderBody(){if(this.diffTask.status===_.ERROR){let e=this.diffTask.error;return f`<div class="callout danger">
        ${e instanceof Error?e.message:String(e)}
      </div>`}let e=this.diffTask.value;if(!e)return f`<div class="session-diff__note">${v(`chat.sessionDiff.loading`)}</div>`;let{result:t,views:n}=e;return t.unavailableReason===`not_git`?f`<div class="session-diff__note">${v(`chat.sessionDiff.notGit`)}</div>`:t.unavailableReason===`unknown_session`?f`<div class="session-diff__note">${v(`chat.sessionDiff.unknownSession`)}</div>`:f`
      ${this.renderSummary(t)}
      ${t.files.length===0?f`<div class="session-diff__note">${v(`chat.sessionDiff.empty`)}</div>`:n.map(e=>this.renderFile(e))}
      ${t.truncated===!0?f`<div class="session-diff__note">${v(`chat.sessionDiff.truncatedResult`)}</div>`:l}
    `}render(){return f`
      <div class="session-diff" aria-busy=${String(this.loading)}>${this.renderBody()}</div>
    `}},i([p({attribute:!1})],U.prototype,`loader`,void 0),i([h()],U.prototype,`collapsedPaths`,void 0),customElements.get(`openclaw-session-diff`)||customElements.define(`openclaw-session-diff`,U)}));function Re(e){let t=e.absolutePath?`Open in editor`:`Workspace root unknown`;return f`
    <div class="sidebar-file-view__editor">
      <openclaw-tooltip .content=${t}>
        <wa-dropdown
          class="sidebar-file-view__editor-menu"
          placement="bottom-end"
          .open=${e.open}
          @wa-select=${t=>{let n=t.detail.item.value;n&&T.includes(n)&&e.onOpenEditor(n)}}
          @wa-show=${()=>e.onOpenChange(!0)}
          @wa-hide=${()=>e.onOpenChange(!1)}
        >
          <button
            slot="trigger"
            class="btn btn--sm sidebar-file-view__action"
            type="button"
            aria-label=${t}
            ?disabled=${!e.absolutePath}
          >
            ${S.externalLink}
          </button>
          ${e.absolutePath?T.map(e=>f`
                  <wa-dropdown-item class="sidebar-file-view__editor-item" value=${e}>
                    ${se[e]}
                  </wa-dropdown-item>
                `):l}
        </wa-dropdown>
      </openclaw-tooltip>
    </div>
  `}var ze=e((()=>{d(),C(),b(),x(),w()}));function W(e){return e.draftKey??`${e.root??``}\u0000${e.path}`}function G(e,t){let n=W(e);X.delete(n),t&&X.set(n,t)}function Be(e){return!!(e.fullMessageRequest&&(e.kind===`markdown`||e.kind===`canvas`))}function Ve(e){switch(e){case`oversized`:return v(`chat.detailPanel.fullContentOversized`);case`not_visible`:return v(`chat.detailPanel.fullContentNotVisible`);default:return v(`chat.detailPanel.fullContentUnavailable`)}}function He(e){if(!e||typeof e!=`object`)return null;let t=e;return typeof t.text==`string`?t.text:ue(e)}function K(e,t=``){return`${t?`\`\`\`${t}`:"```"}\n${e}\n\`\`\``}function Ue(e){if(!e)return null;if(e.kind===`markdown`){let t=e.rawText??e.content;return{kind:`markdown`,content:K(t),rawText:t,...e.unavailableReason?{unavailableReason:e.unavailableReason}:{}}}if(e.kind===`file`){let t=e.rawText??e.content;return{kind:`markdown`,content:K(t,e.language),rawText:t,...e.unavailableReason?{unavailableReason:e.unavailableReason}:{}}}return e.rawText?.trim()?{kind:`markdown`,content:K(e.rawText,`json`),rawText:e.rawText,...e.unavailableReason?{unavailableReason:e.unavailableReason}:{}}:null}function We(e){return[e.split(`\r
`).length-1,(e.match(/\r(?!\n)/g)??[]).length,(e.match(/(?<!\r)\n/g)??[]).length].filter(e=>e>0).length<=1}function Ge(e,t){let n=t.toLocaleLowerCase();return n?e.split(`
`).flatMap((e,t)=>e.toLocaleLowerCase().includes(n)?[t+1]:[]):[]}function q(e){return e.path.startsWith(`/`)||/^[a-z]:[\\/]/i.test(e.path)||e.path.startsWith(`\\\\`)?e.path:e.root?`${e.root.replace(/[\\/]+$/,``)}/${e.path.replace(/^[\\/]+/,``)}`:null}function J(e,t){let n=t?.copyFeedback[e],r=v(n===`failed`?`common.copyFailed`:n===`copied`?`common.copied`:e===`path`?`chat.detailPanel.copyPath`:`chat.detailPanel.copyContents`);return f`
    <openclaw-tooltip .content=${r}>
      <button
        class="btn btn--sm sidebar-file-view__action ${n===`copied`?`copied`:``}"
        type="button"
        aria-label=${r}
        @click=${()=>t?.onCopy(e)}
      >
        ${n===`copied`?S.check:S.copy}
      </button>
    </openclaw-tooltip>
  `}function Ke(e,t,n){let r=q(e),i=n?.matches.length?n.currentMatchIndex+1:0;return f`
    <section class="sidebar-file-view">
      <div class="sidebar-file-view__path-bar">
        <div class="sidebar-file-view__path-field">
          <span class="sidebar-file-view__path" title=${e.path}>${e.path}</span>
          ${J(`path`,n)}
        </div>
        ${n?f`
              <div class="sidebar-file-view__actions">
                ${n.editing?f`
                      <button
                        class="btn btn--sm"
                        type="button"
                        ?disabled=${!n.dirty||n.saving}
                        @click=${n.onSave}
                      >
                        ${n.saving?v(`common.saving`):v(`common.save`)}
                      </button>
                      <button
                        class="btn btn--sm"
                        type="button"
                        ?disabled=${n.saving}
                        @click=${n.onDiscard}
                      >
                        ${v(`chat.detailPanel.discard`)}
                      </button>
                    `:f`
                      ${e.edit?f`
                            <openclaw-tooltip .content=${v(`chat.detailPanel.editFile`)}>
                              <button
                                class="btn btn--sm sidebar-file-view__action"
                                type="button"
                                aria-label=${v(`chat.detailPanel.editFile`)}
                                ?disabled=${n.loadingEditor}
                                @click=${n.onEdit}
                              >
                                ${S.edit}
                              </button>
                            </openclaw-tooltip>
                          `:l}
                      <openclaw-tooltip .content=${v(`chat.detailPanel.searchInFile`)}>
                        <button
                          class="btn btn--sm sidebar-file-view__action"
                          type="button"
                          aria-label=${v(`chat.detailPanel.searchInFile`)}
                          aria-pressed=${String(n.searchOpen)}
                          @click=${n.onToggleSearch}
                        >
                          ${S.search}
                        </button>
                      </openclaw-tooltip>
                      ${n.onReveal?f`
                            <openclaw-tooltip .content=${v(`chat.detailPanel.showInFiles`)}>
                              <button
                                class="btn btn--sm sidebar-file-view__action"
                                type="button"
                                aria-label=${v(`chat.detailPanel.showInFiles`)}
                                @click=${()=>n.onReveal?.(e.path)}
                              >
                                ${S.folder}
                              </button>
                            </openclaw-tooltip>
                          `:l}
                      ${Re({absolutePath:r,open:n.editorMenuOpen,onOpenChange:n.onEditorMenuOpenChange,onOpenEditor:n.onOpenEditor})}
                      ${J(`contents`,n)}
                    `}
              </div>
            `:l}
      </div>
      ${Object.values(n?.copyFeedback??{}).includes(`failed`)?f`<div class="file-view__save-notice" role="alert">${v(`common.copyFailed`)}</div>`:l}
      ${n?.searchOpen?f`
            <div class="file-view__search">
              <input
                type="search"
                aria-label=${v(`chat.detailPanel.searchInFile`)}
                placeholder=${v(`common.search`)}
                .value=${n.query}
                @input=${e=>n.onSearchInput(e.currentTarget.value)}
                @keydown=${n.onSearchKeydown}
              />
              <span class="file-view__search-counter"
                >${i}/${n.matches.length}</span
              >
              <button
                class="btn btn--sm file-view__search-action file-view__search-action--previous"
                type="button"
                aria-label=${v(`chat.detailPanel.previousMatch`)}
                ?disabled=${n.matches.length===0}
                @click=${n.onPreviousMatch}
              >
                ${S.chevronDown}
              </button>
              <button
                class="btn btn--sm file-view__search-action"
                type="button"
                aria-label=${v(`chat.detailPanel.nextMatch`)}
                ?disabled=${n.matches.length===0}
                @click=${n.onNextMatch}
              >
                ${S.chevronDown}
              </button>
            </div>
          `:l}
      ${n?.saveNotice?f`
            <div class="file-view__save-notice" role="alert">
              <span>
                ${n.saveNotice.kind===`conflict`?v(`chat.detailPanel.fileChanged`):n.saveNotice.message}
              </span>
              ${n.saveNotice.kind===`conflict`?f`
                    <div class="file-view__save-notice-actions">
                      <button
                        class="btn btn--sm"
                        type="button"
                        ?disabled=${n.saving}
                        @click=${n.onReload}
                      >
                        ${v(`common.reload`)}
                      </button>
                      <button
                        class="btn btn--sm"
                        type="button"
                        ?disabled=${n.saving}
                        @click=${n.onOverwrite}
                      >
                        ${v(`chat.detailPanel.overwrite`)}
                      </button>
                    </div>
                  `:l}
            </div>
          `:l}
      <div class="file-view">
        ${g(n?.mountKey??e,f`<div class="file-view__mount"></div>`)}
        ${n?.loadingEditor?f`<div class="file-view__loading muted">${v(`common.loading`)}</div>`:l}
      </div>
      ${n?.editing?l:f`
            <div class="sidebar-file-view__footer">
              <button @click=${t} class="btn btn--sm" type="button">
                ${v(`chat.detailPanel.viewRawText`)}
              </button>
            </div>
          `}
    </section>
  `}function qe(e,t){return e.kind===`canvas`?be(t,e.sandbox):`allow-scripts`}function Y(e,t,n){e?e({src:t,title:n}):E(t,{allowDataImage:!0})}function Je(e){let t=e.content,n=t?.kind===`markdown`&&t.content.trim()?me(t.content,{fileLinks:!0,interactiveImages:e.onOpenImage!==void 0}):``,r=t?.kind===`canvas`?qe(t,e.embedSandboxMode??`scripts`):``,i=t?.kind===`canvas`?xe(t.entryUrl,e.canvasPluginSurfaceUrl,e.allowExternalEmbedUrls??!1):null,a=t?.kind===`canvas`?t.title?.trim()||v(`chat.detailPanel.renderPreview`):t?.kind===`image`?t.title.trim()||v(`chat.detailPanel.imagePreview`):t?.kind===`file`?t.name.trim()||v(`chat.detailPanel.file`):t?.kind===`session-diff`?v(`chat.sessionDiff.title`):t?.kind===`markdown`?v(`chat.detailPanel.markdownPreview`):v(`chat.detailPanel.toolDetails`);return f`
    <div class="sidebar-panel">
      ${e.embedded?l:f`<div class="sidebar-header">
            <div class="sidebar-title">${a}</div>
            <div class="sidebar-header__actions">
              <openclaw-tooltip .content=${v(`chat.detailPanel.close`)}>
                <button
                  @click=${e.onClose}
                  class="btn"
                  type="button"
                  aria-label=${v(`chat.detailPanel.close`)}
                >
                  ${S.x}
                </button>
              </openclaw-tooltip>
            </div>
          </div> `}
      <div class="sidebar-content">
        ${e.error?f`
              <div class="callout danger">${e.error}</div>
              ${t?.rawText?.trim()?f`
                    <button
                      @click=${e.onViewRawText}
                      class="btn"
                      type="button"
                      style="margin-top: 12px;"
                    >
                      ${v(`chat.detailPanel.viewRawText`)}
                    </button>
                  `:l}
            `:t?t.kind===`file`?Ke(t,e.onViewRawText,e.fileView):t.kind===`session-diff`?f`<openclaw-session-diff .loader=${t.load}></openclaw-session-diff>`:t.kind===`canvas`?f`
                      <div class="chat-tool-card__preview" data-kind="canvas">
                        <div class="chat-tool-card__preview-panel" data-side="front">
                          ${g(`${r}\u0000${i??``}\u0000${t.preferredHeight??``}`,f`
                              <iframe
                                class="chat-tool-card__preview-frame"
                                title=${t.title?.trim()||v(`chat.detailPanel.renderPreview`)}
                                sandbox=${r}
                                src=${i??l}
                                style=${t.preferredHeight?`height:${t.preferredHeight}px`:``}
                              ></iframe>
                            `)}
                        </div>
                        ${t.rawText?.trim()?f`
                              <div style="margin-top: 12px;">
                                <button @click=${e.onViewRawText} class="btn" type="button">
                                  ${v(`chat.detailPanel.viewRawText`)}
                                </button>
                              </div>
                            `:l}
                      </div>
                    `:t.kind===`image`?f`
                        <div class="chat-tool-card__preview" data-kind="image">
                          <div class="chat-tool-card__preview-panel" data-side="front">
                            <button
                              type="button"
                              class="chat-tool-card__preview-image-button"
                              aria-label=${v(`chat.imageLightbox.open`,{title:a})}
                              @click=${()=>Y(e.onOpenImage,t.src,a)}
                            >
                              <img
                                class="chat-tool-card__preview-image"
                                src=${t.src}
                                alt=${a}
                                style="display:block;max-width:100%;height:auto;border-radius:8px;"
                              />
                            </button>
                          </div>
                          ${t.rawText?.trim()?f`
                                <div style="margin-top: 12px;">
                                  <button @click=${e.onViewRawText} class="btn" type="button">
                                    ${v(`chat.detailPanel.viewRawText`)}
                                  </button>
                                </div>
                              `:l}
                        </div>
                      `:f`
                        <section class="sidebar-markdown-shell">
                          <div class="sidebar-markdown-shell__toolbar">
                            <div class="sidebar-markdown-shell__intro">
                              <div class="sidebar-markdown-shell__eyebrow">
                                ${S.scrollText}
                                <span>${v(`chat.detailPanel.renderedMarkdown`)}</span>
                              </div>
                              <div class="sidebar-markdown-shell__hint">
                                ${v(`chat.detailPanel.renderedMarkdownHint`)}
                              </div>
                            </div>
                            <button @click=${e.onViewRawText} class="btn btn--sm" type="button">
                              ${v(`chat.detailPanel.viewRawText`)}
                            </button>
                          </div>
                          ${n?f`
                                <article class="sidebar-markdown-reader sidebar-markdown">
                                  ${ne(n)}
                                </article>
                              `:f`
                                <div class="sidebar-markdown-empty">
                                  ${v(`chat.detailPanel.noPreviewableMarkdown`)}
                                </div>
                              `}
                        </section>
                      `:f` <div class="muted">${v(`chat.detailPanel.noContent`)}</div> `}
      </div>
    </div>
  `}var X,Z,Q,Ye=e((()=>{d(),u(),c(),m(),C(),ge(),pe(),x(),he(),y(),b(),le(),k(),ae(),w(),de(),o(),Le(),ze(),n(),t(),X=new Map,Z={},Q=class extends s{constructor(...e){super(...e),this.content=null,this.loadFullMessage=null,this.canvasPluginSurfaceUrl=null,this.embedSandboxMode=`scripts`,this.allowExternalEmbedUrls=!1,this.embedded=!1,this.onOpenWorkspaceFile=null,this.onRevealInWorkspace=null,this.onOpenImage=null,this.visibleContent=null,this.error=null,this.fileSearchOpen=!1,this.fileSearchQuery=``,this.fileSearchMatchIndex=0,this.fileEditorMenuOpen=!1,this.fileCopyFeedback=Z,this.fileEditorLoading=!1,this.fileEditing=!1,this.fileDirty=!1,this.fileReloading=!1,this.fileSaving=!1,this.fileSaveNotice=null,this.requestVersion=0,this.fileOperationVersion=0,this.showingRawText=!1,this.fileEditor=null,this.fileEditorLoad=null,this.fileDraftContent=null,this.fileSavedContent=``,this.fileHash=``,this.copyAttempts=new Map,this.copyFeedbackTimers=new Map,this.handleDocumentPointerDown=e=>{if(!this.fileEditorMenuOpen)return;let t=this.querySelector(`.sidebar-file-view__editor`);(!t||!e.composedPath().includes(t))&&(this.fileEditorMenuOpen=!1)},this.toggleFileSearch=()=>{if(this.fileSearchOpen=!this.fileSearchOpen,this.fileEditorMenuOpen=!1,!this.fileSearchOpen){this.fileSearchQuery=``,this.fileSearchMatchIndex=0;return}this.updateComplete.then(()=>{this.querySelector(`.file-view__search input`)?.focus()})},this.updateFileSearch=e=>{this.fileSearchQuery=e,this.fileSearchMatchIndex=0,this.scrollToCurrentFileMatch()},this.handleFileSearchKeydown=e=>{if(e.key===`Escape`){e.preventDefault(),e.stopPropagation(),this.fileSearchOpen=!1,this.fileSearchQuery=``,this.fileSearchMatchIndex=0;return}e.key===`Enter`&&(e.preventDefault(),this.moveFileSearch(e.shiftKey?-1:1))},this.openInEditor=e=>{let t=this.visibleContent;if(t?.kind!==`file`)return;let n=q(t);n&&(this.fileEditorMenuOpen=!1,ce(e,n,t.line))},this.copyFileValue=e=>{let t=this.visibleContent;if(t?.kind!==`file`)return;let n=(this.copyAttempts.get(e)??0)+1;this.copyAttempts.set(e,n),oe(e===`path`?t.path:t.content).then(r=>{this.copyAttempts.get(e)!==n||this.visibleContent!==t||!this.isConnected||(this.fileCopyFeedback={...this.fileCopyFeedback,[e]:r?`copied`:`failed`},globalThis.clearTimeout(this.copyFeedbackTimers.get(e)),this.copyFeedbackTimers.set(e,globalThis.setTimeout(()=>{this.copyFeedbackTimers.delete(e),this.fileCopyFeedback={...this.fileCopyFeedback,[e]:void 0}},r?1500:2e3)))})},this.editFile=()=>{let e=this.visibleContent;e?.kind!==`file`||!e.edit||!this.fileEditor||(this.fileSavedContent=e.content,this.fileHash=e.edit.hash,this.fileDirty=!1,this.fileSaveNotice=null,this.fileSearchOpen=!1,this.fileSearchQuery=``,this.fileSearchMatchIndex=0,this.fileEditorMenuOpen=!1,this.fileEditing=!0,this.fileEditor.setEditable(!0),this.updateComplete.then(()=>this.fileEditor?.focus()))},this.discardFileEdits=()=>{if(!this.fileEditing||this.fileSaving)return;this.fileEditor?.setContent(this.fileSavedContent);let e=this.visibleContent;e?.kind===`file`&&(G(e,null),this.fileHash=e.edit?.hash??``),this.fileDirty=!1,this.fileSaveNotice=null,this.fileEditing=!1,this.fileEditor?.setEditable(!1)},this.saveFile=()=>{let e=this.visibleContent,t=this.fileEditor;if(e?.kind!==`file`||!e.edit||!t||!this.fileEditing||!this.fileDirty||this.fileSaving)return;let n=this.fileOperationVersion;this.fileSaving=!0,this.fileSaveNotice=null,this.saveFileContent(e,t.getContent(),this.fileHash,n).catch(e=>{n===this.fileOperationVersion&&(this.fileSaveNotice={kind:`error`,message:e instanceof Error?e.message:String(e)})}).finally(()=>{n===this.fileOperationVersion&&(this.fileSaving=!1)})},this.reloadFile=()=>{let e=this.visibleContent,t=this.fileEditor;if(e?.kind!==`file`||!e.edit||!t||this.fileSaving)return;let n=this.fileOperationVersion;this.fileSaving=!0,this.fileReloading=!0,t.setEditable(!1),e.edit.fetchLatest().then(e=>{if(!(n!==this.fileOperationVersion||this.visibleContent?.kind!==`file`)){if(!e){this.fileSaveNotice={kind:`error`,message:v(`chat.detailPanel.reloadFailed`)};return}if(this.fileEditor?.setContent(e.content),this.updateSavedFile(this.visibleContent,e.content,e.hash),!e.editable&&this.visibleContent?.kind===`file`){this.fileEditing=!1,this.fileDirty=!1;let{edit:e,...t}=this.visibleContent;this.visibleContent=t}}}).catch(e=>{n===this.fileOperationVersion&&(this.fileSaveNotice={kind:`error`,message:e instanceof Error?e.message:String(e)})}).finally(()=>{n===this.fileOperationVersion&&(this.fileReloading=!1,this.fileSaving=!1,this.fileEditor?.setEditable(this.fileEditing))})},this.overwriteFile=()=>{let e=this.visibleContent,t=this.fileEditor;if(e?.kind!==`file`||!e.edit||!t||this.fileSaving)return;let n=this.fileOperationVersion,r=t.getContent();this.fileSaving=!0,e.edit.fetchLatest().then(async t=>{if(n===this.fileOperationVersion){if(!t){this.fileSaveNotice={kind:`error`,message:v(`chat.detailPanel.overwriteLoadFailed`)};return}await this.saveFileContent(e,r,t.hash,n)}}).catch(e=>{n===this.fileOperationVersion&&(this.fileSaveNotice={kind:`error`,message:e instanceof Error?e.message:String(e)})}).finally(()=>{n===this.fileOperationVersion&&(this.fileSaving=!1)})},this.close=()=>{this.dispatchEvent(new CustomEvent(`chat-detail-panel-close`,{bubbles:!0}))},this.showRawText=()=>{let e=Ue(this.visibleContent);e&&(this.requestVersion+=1,this.showingRawText=!0,this.visibleContent=e,this.error=null)},this.handlePanelClick=e=>{let t=e.composedPath().find(e=>e instanceof HTMLElement&&e.classList.contains(`markdown-inline-image-button`))?.querySelector(`.markdown-inline-image`);if(t){e.preventDefault(),Y(this.onOpenImage??void 0,t.currentSrc||t.src,t.alt.trim()||v(`chat.imageLightbox.untitled`));return}_e(e);let n=fe(e);n&&this.onOpenWorkspaceFile?.(n)},this.handlePanelKeyDown=e=>{let t=D(e);t&&this.onOpenWorkspaceFile?.(t)}}connectedCallback(){super.connectedCallback(),this.fileCopyFeedback=Z,document.addEventListener(`pointerdown`,this.handleDocumentPointerDown)}disconnectedCallback(){document.removeEventListener(`pointerdown`,this.handleDocumentPointerDown),this.destroyFileEditor(),this.clearFileCopyFeedback(),super.disconnectedCallback()}willUpdate(e){if(!e.has(`content`))return;this.requestVersion+=1,this.visibleContent=this.content,this.error=null,this.showingRawText=!1,this.fileSearchOpen=!1,this.fileSearchQuery=``,this.fileSearchMatchIndex=0,this.fileEditorMenuOpen=!1,this.clearFileCopyFeedback(),this.fileCopyFeedback=Z,this.fileOperationVersion+=1,this.fileEditing=!1,this.fileDirty=!1,this.fileReloading=!1,this.fileSaving=!1,this.fileSaveNotice=null;let t=this.content?.kind===`file`&&this.content.edit?X.get(W(this.content)):void 0,n=this.content?.kind===`file`&&t?.content!==this.content.content?t:void 0;t&&!n&&this.content?.kind===`file`&&G(this.content,null),this.fileDraftContent=n?.content??null,this.fileSavedContent=this.content?.kind===`file`?this.content.content:``,this.fileHash=n?.expectedHash??(this.content?.kind===`file`?this.content.edit?.hash??``:``),this.fileEditing=!!n,this.fileDirty=!!n,this.fileEditorLoading=this.content?.kind===`file`,this.destroyFileEditor()}clearFileCopyFeedback(){for(let e of this.copyFeedbackTimers.values())globalThis.clearTimeout(e);this.copyFeedbackTimers.clear();for(let[e,t]of this.copyAttempts)this.copyAttempts.set(e,t+1)}updated(e){let t=this.visibleContent;if(t?.kind===`file`&&!this.showingRawText&&this.ensureFileEditor().then(()=>{this.syncFileEditor(),e.has(`content`)&&t.line!=null&&this.scrollToFileLine(t)}),!e.has(`content`)&&!e.has(`loadFullMessage`))return;let n=this.content;if(!n||this.showingRawText)return;let r=++this.requestVersion;this.upgradeToFullMessage(n,r)}scrollToFileLine(e){this.visibleContent!==e||this.showingRawText||e.line!=null&&this.fileEditor?.scrollToLine(e.line,!0)}destroyFileEditor(){this.fileOperationVersion+=1,this.fileEditor?.destroy(),this.fileEditor=null,this.fileEditorLoad=null}ensureFileEditor(){if(this.fileEditor)return Promise.resolve();if(this.fileEditorLoad)return this.fileEditorLoad;let e=this.visibleContent,t=this.querySelector(`.file-view__mount`);if(e?.kind!==`file`||!t)return Promise.resolve();let n=this.fileOperationVersion;return this.fileEditorLoading=!0,this.fileEditorLoad=r(async()=>{let{createFileEditorView:e}=await import(`./file-editor-view-Dy7bVtXr.js`);return{createFileEditorView:e}},__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url).then(async({createFileEditorView:e})=>{let r=this.visibleContent;if(n!==this.fileOperationVersion||r?.kind!==`file`)return;let i=await e({parent:t,content:this.fileDraftContent??r.content,name:r.name,editable:this.fileEditing,onSave:this.saveFile});if(n!==this.fileOperationVersion||!this.isConnected||this.visibleContent?.kind!==`file`){i.destroy();return}this.fileEditor=i,this.fileDraftContent=null,i.onDocChanged(e=>{let t=e!==this.fileSavedContent;t!==this.fileDirty&&(this.fileDirty=t),!t&&this.visibleContent?.kind===`file`&&(this.fileHash=this.visibleContent.edit?.hash??``),G(r,t?{content:e,expectedHash:this.fileHash}:null),this.fileSaveNotice?.kind===`error`&&(this.fileSaveNotice=null)})}).finally(()=>{n===this.fileOperationVersion&&(this.fileEditorLoad=null,this.fileEditorLoading=!1)}),this.fileEditorLoad}syncFileEditor(){let e=this.visibleContent,t=this.fileEditor;if(e?.kind!==`file`||!t)return;this.fileEditing||t.setContent(e.content),t.setEditable(this.fileEditing&&!this.fileReloading);let n=this.fileSearchMatches();t.setDecorations({targetLine:e.line,matches:n,currentMatch:n[this.fileSearchMatchIndex]??null})}fileSearchMatches(){let e=this.visibleContent;return e?.kind===`file`?Ge(e.content,this.fileSearchQuery):[]}async scrollToCurrentFileMatch(){await this.updateComplete;let e=this.fileSearchMatches()[this.fileSearchMatchIndex];e!=null&&this.fileEditor?.scrollToLine(e,!0)}moveFileSearch(e){let t=this.fileSearchMatches();t.length!==0&&(this.fileSearchMatchIndex=(this.fileSearchMatchIndex+e+t.length)%t.length,this.scrollToCurrentFileMatch())}updateSavedFile(e,t,n){this.fileSavedContent=t,this.fileHash=n,this.fileDirty=this.fileEditor?.getContent()!==t;let r=this.fileEditor?.getContent();G(e,this.fileDirty&&r!=null?{content:r,expectedHash:n}:null),this.fileSaveNotice=null,this.visibleContent={...e,content:t,rawText:t,...e.edit?{edit:{...e.edit,hash:n}}:{}}}async saveFileContent(e,t,n,r){if(!e.edit)return;let i=await e.edit.save({content:t,expectedHash:n});r!==this.fileOperationVersion||this.visibleContent?.kind!==`file`||(i.ok?this.updateSavedFile(this.visibleContent,t,i.hash):i.code===`conflict`?this.fileSaveNotice={kind:`conflict`}:this.fileSaveNotice={kind:`error`,message:i.message})}async upgradeToFullMessage(e,t){if(!Be(e)||!this.loadFullMessage)return;let n=e.fullMessageRequest;try{let r=await this.loadFullMessage(n);if(t!==this.requestVersion||this.content!==e)return;if(!r?.ok||!r.message||typeof r.message!=`object`){this.visibleContent={...e,unavailableReason:r?.unavailableReason??`not_found`},this.error=Ve(r?.unavailableReason??`not_found`);return}let i=He(r.message)??(typeof e.rawText==`string`?e.rawText:e.kind===`markdown`?e.content:null);this.visibleContent=e.kind===`markdown`?{...e,content:i||e.content,rawText:i||e.rawText||e.content,unavailableReason:null}:{...e,rawText:i||e.rawText||null,unavailableReason:null},this.error=null}catch(n){if(t!==this.requestVersion||this.content!==e)return;this.error=v(`chat.detailPanel.fullContentLoadFailed`,{error:n instanceof Error?n.message:String(n)})}}render(){let e=this.fileSearchMatches(),t=e.length?Math.min(this.fileSearchMatchIndex,e.length-1):0;return f`
      <div
        class=${this.visibleContent?.kind===`file`||this.visibleContent?.kind===`markdown`?`sidebar-panel-host--fill`:``}
        @click=${this.handlePanelClick}
        @keydown=${this.handlePanelKeyDown}
      >
        ${Je({content:this.visibleContent,error:this.error,fileView:{copyFeedback:this.fileCopyFeedback,currentMatchIndex:t,dirty:this.fileDirty,editorMenuOpen:this.fileEditorMenuOpen,editing:this.fileEditing,loadingEditor:this.fileEditorLoading,mountKey:this.fileOperationVersion,matches:e,query:this.fileSearchQuery,saveNotice:this.fileSaveNotice,saving:this.fileSaving,searchOpen:this.fileSearchOpen,onCopy:this.copyFileValue,onDiscard:this.discardFileEdits,onEdit:this.editFile,onNextMatch:()=>this.moveFileSearch(1),onOpenEditor:this.openInEditor,onOverwrite:this.overwriteFile,onPreviousMatch:()=>this.moveFileSearch(-1),onReload:this.reloadFile,onReveal:this.onRevealInWorkspace??void 0,onSave:this.saveFile,onSearchInput:this.updateFileSearch,onSearchKeydown:this.handleFileSearchKeydown,onEditorMenuOpenChange:e=>{this.fileEditorMenuOpen=e},onToggleSearch:this.toggleFileSearch},canvasPluginSurfaceUrl:this.canvasPluginSurfaceUrl,embedSandboxMode:this.embedSandboxMode,allowExternalEmbedUrls:this.allowExternalEmbedUrls,embedded:this.embedded,onClose:this.close,onOpenImage:this.onOpenImage??void 0,onViewRawText:this.showRawText})}
      </div>
    `}},i([p({attribute:!1})],Q.prototype,`content`,void 0),i([p({attribute:!1})],Q.prototype,`loadFullMessage`,void 0),i([p()],Q.prototype,`canvasPluginSurfaceUrl`,void 0),i([p()],Q.prototype,`embedSandboxMode`,void 0),i([p({type:Boolean})],Q.prototype,`allowExternalEmbedUrls`,void 0),i([p({type:Boolean})],Q.prototype,`embedded`,void 0),i([p({attribute:!1})],Q.prototype,`onOpenWorkspaceFile`,void 0),i([p({attribute:!1})],Q.prototype,`onRevealInWorkspace`,void 0),i([p({attribute:!1})],Q.prototype,`onOpenImage`,void 0),i([h()],Q.prototype,`visibleContent`,void 0),i([h()],Q.prototype,`error`,void 0),i([h()],Q.prototype,`fileSearchOpen`,void 0),i([h()],Q.prototype,`fileSearchQuery`,void 0),i([h()],Q.prototype,`fileSearchMatchIndex`,void 0),i([h()],Q.prototype,`fileEditorMenuOpen`,void 0),i([h()],Q.prototype,`fileCopyFeedback`,void 0),i([h()],Q.prototype,`fileEditorLoading`,void 0),i([h()],Q.prototype,`fileEditing`,void 0),i([h()],Q.prototype,`fileDirty`,void 0),i([h()],Q.prototype,`fileReloading`,void 0),i([h()],Q.prototype,`fileSaving`,void 0),i([h()],Q.prototype,`fileSaveNotice`,void 0),customElements.get(`openclaw-chat-detail-panel`)||customElements.define(`openclaw-chat-detail-panel`,Q)}));function Xe(e){return f`<resizable-divider
    ${te(e.onElement??(()=>{}))}
    class=${e.className??l}
    .splitRatio=${e.splitRatio}
    .minRatio=${e.minRatio??.4}
    .maxRatio=${e.maxRatio??.7}
    .measureRatio=${e.measureRatio}
    .measureSize=${e.measureSize}
    .label=${e.label}
    .orientation=${e.orientation}
    @dragover=${e.onDragover??(()=>{})}
    @drop=${e.onDrop??(()=>{})}
    @resize=${e.onResize}
  ></resizable-divider>`}var Ze=e((()=>{d(),ee()}));function Qe(e,t,n){let r=(t-e.left)/e.width,i=(n-e.top)/e.height,a=r<=$?{edge:`left`,distance:r}:1-r<=$?{edge:`right`,distance:1-r}:null,o=i<=$?{edge:`up`,distance:i}:1-i<=$?{edge:`down`,distance:1-i}:null,s=a&&o?a.distance<=o.distance?a:o:a??o;return s?{kind:`edge`,edge:s.edge}:{kind:`center`}}function $e(e,t){let n={left:e.left,top:e.top,width:e.width,height:e.height};return t.kind===`center`?n:t.edge===`left`?{...n,width:e.width/2}:t.edge===`right`?{...n,left:e.left+e.width/2,width:e.width/2}:t.edge===`up`?{...n,height:e.height/2}:{...n,top:e.top+e.height/2,height:e.height/2}}var $,et=e((()=>{$=.3}));export{Me as _,Xe as a,Ee as c,Ae as d,Ne as f,ke as g,we as h,Ze as i,Te as l,De as m,Qe as n,We as o,je as p,$e as r,Ye as s,et as t,Oe as u};
//# sourceMappingURL=split-drop-zone-B4cZIMIX.js.map