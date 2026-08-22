import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as r,Lc as i,Rc as a,Uc as o}from"./control-ui-core-CrKLOOVi.js";import{$ as s,K as c,Q as l,W as u,Y as d,it as f,nt as p}from"./lit-runtime-D5xZwgO1.js";import{a as m,i as h}from"./control-ui-core-CVcZBevq.js";import{o as g,t as _}from"./control-ui-core-DkYXaYTI.js";import{pt as v}from"./control-ui-core-CTll8UdE.js";import{a as y,i as b,n as x,o as S,r as C,t as w}from"./exec-approval-card-LilNX3QI.js";function T(e){let t=e.replace(/\s+/g,` `).trim();return t.length>64?`${t.slice(0,61)}…`:t}function E(e){let t=e.queue.filter(t=>t.id!==e.activeId);return t.length===0?c:d`
    <div class="exec-approval-list" aria-label=${g(`execApproval.otherPending`)}>
      <div class="exec-approval-list__heading">${g(`execApproval.otherPending`)}</div>
      ${t.map(t=>{let n=T(t.request.command),r=t.request.agentId?.trim()||`—`,i=C(t.expiresAtMs,e.nowMs);return d`
          <button
            class="exec-approval-list__item"
            type="button"
            aria-label=${g(`execApproval.reviewRequest`,{agent:r,command:n})}
            @click=${()=>e.onSelect(t.id)}
          >
            <span class="exec-approval-list__agent">${r}</span>
            <span class="exec-approval-list__command mono">${n}</span>
            <span class="exec-approval-list__expiry" aria-hidden="true">${i}</span>
          </button>
        `})}
    </div>
  `}function D(e){return e.composedPath().some(e=>e instanceof Element&&e.closest(`input, textarea, [contenteditable]:not([contenteditable='false'])`)!==null)}function O(e){return!((e.metaKey||e.ctrlKey)&&!e.altKey)||D(e)?null:e.key===`Enter`?e.shiftKey?`allow-always`:`allow-once`:!e.shiftKey&&a(e)===`d`?`deny`:null}var k;e((()=>{u(),l(),h(),_(),i(),r(),b(),v(),t(),k=class extends o{constructor(...e){super(...e),this.selectedApprovalId=null,this.forceShowAll=!1}show(){this.forceShowAll=!0,this.updateComplete.then(()=>this.dialog?.show())}displayedQueue(){let e=this.props;return e?this.forceShowAll?e.queue:m(e.queue,e.inlineApprovalId):[]}activeApproval(e){return e.find(e=>e.id===this.selectedApprovalId)??e.at(0)??null}handleKeydown(e,t){if(e.defaultPrevented||e.repeat||this.props?.busy)return;let n=O(e);!n||!S(t).includes(n)||(e.preventDefault(),this.props?.onDecision(t.id,n))}willUpdate(e){if(e.get(`props`)?.queue.length&&!this.props?.queue.length){this.forceShowAll=!1,this.selectedApprovalId=null;return}let t=this.displayedQueue();t.some(e=>e.id===this.selectedApprovalId)||(this.selectedApprovalId=t.at(0)?.id??null)}render(){let e=this.props,t=this.displayedQueue(),n=this.activeApproval(t);if(!e||!n)return c;let r=S(n);return d`
      <openclaw-modal-dialog
        label=${x(n)}
        description=${w(n.expiresAtMs,e.nowMs)}
        @keydown=${e=>this.handleKeydown(e,n)}
        @modal-cancel=${t=>{if(e.busy||!r.includes(`deny`)){t.preventDefault();return}e.onDecision(n.id,`deny`)}}
      >
        <div class="exec-approval-modal-stack">
          ${y({approval:n,busy:e.busy,error:e.errors.get(n.id)??null,nowMs:e.nowMs,variant:`modal`,queueCount:t.length,onDecision:e.onDecision})}
          ${E({queue:t,activeId:n.id,nowMs:e.nowMs,onSelect:e=>{this.selectedApprovalId=e}})}
        </div>
      </openclaw-modal-dialog>
    `}},n([f({attribute:!1})],k.prototype,`props`,void 0),n([s(`openclaw-modal-dialog`)],k.prototype,`dialog`,void 0),n([p()],k.prototype,`selectedApprovalId`,void 0),n([p()],k.prototype,`forceShowAll`,void 0),customElements.get(`openclaw-exec-approval`)||customElements.define(`openclaw-exec-approval`,k)}))();
//# sourceMappingURL=exec-approval-DyKHi4cb.js.map