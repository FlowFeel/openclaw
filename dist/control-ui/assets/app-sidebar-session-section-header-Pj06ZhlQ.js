import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Qn as t,rr as n}from"./control-ui-core-ChU36mQ7.js";import{K as r,W as i,Y as a}from"./lit-runtime-D5xZwgO1.js";import{o,t as s}from"./control-ui-core-M4uhXYSJ.js";import{f as c,x as l}from"./session-pull-requests-C3lY3Ce7.js";function u(e){let n=Date.now();return e!=null&&Number.isFinite(e)&&e<=n&&n-e<6e4?o(`common.now`):t(e,{fallback:``,suffix:e!=null&&e>n})}function d(e){let t=new Set;for(let n of e)for(let e of n.hosts)for(let n of e.sessions)n.sessionKey&&t.add(n.sessionKey);return t}function f(e,t){let n=[];for(let r of e){let e=r.sessions.filter(e=>!t||e.createdActor?.id===t);e.length>0&&n.push(e.length===r.sessions.length?r:{...r,sessions:e})}return n}function p(e,t){return e.map(e=>e.id===t.catalogId?{...e,hosts:e.hosts.map(e=>e.hostId===t.hostId?{...e,sessions:e.sessions.map(e=>e.threadId===t.threadId?{...e,sessionKey:t.sessionKey}:e)}:e)}:e)}var m=e((()=>{s(),n()}));function h(e){return a`
    <div
      class="sidebar-recent-sessions__head ${e.disabledReason?``:`sidebar-recent-sessions__head--draggable`}"
      draggable=${e.disabledReason?`false`:`true`}
      title=${e.disabledReason??r}
      @mousedown=${e=>{e.currentTarget.toggleAttribute(`data-section-drag-blocked`,!!e.target.closest(`button`))}}
      @mouseup=${e=>{e.currentTarget.removeAttribute(`data-section-drag-blocked`)}}
      @dragstart=${t=>{if(e.disabledReason){t.preventDefault();return}let n=t.currentTarget,r=!!t.target.closest(`button`)||n.hasAttribute(`data-section-drag-blocked`);if(n.removeAttribute(`data-section-drag-blocked`),r){t.preventDefault();return}t.dataTransfer&&(l(t.dataTransfer,e.sectionId),e.onStartDrag(e.sectionId))}}
      @dragend=${t=>{t.currentTarget.removeAttribute(`data-section-drag-blocked`),e.onFinishDrag()}}
      @contextmenu=${e.onContextMenu??r}
    >
      <span class="sidebar-session-group-drag-handle" aria-hidden="true"></span>
      ${e.content}
    </div>
  `}var g=e((()=>{i(),c()}));export{u as a,p as i,h as n,m as o,d as r,f as s,g as t};
//# sourceMappingURL=app-sidebar-session-section-header-Pj06ZhlQ.js.map