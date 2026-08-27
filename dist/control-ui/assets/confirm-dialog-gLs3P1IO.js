import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{K as t,W as n,Y as r,q as i}from"./lit-runtime-D5xZwgO1.js";import{o as a,t as o}from"./control-ui-core-M4uhXYSJ.js";import{pt as s}from"./control-ui-core-pXkCFtVv.js";function c(e){if(e.signal?.aborted)return Promise.resolve(!1);let n=document.createElement(`div`);return document.body.append(n),new Promise(o=>{let s=!1,c=r=>{s||(s=!0,e.signal?.removeEventListener(`abort`,l),i(t,n),n.remove(),o(r))},l=()=>c(!1);e.signal?.addEventListener(`abort`,l,{once:!0});let u=e.title??a(`common.confirm`);i(r`
        <openclaw-modal-dialog
          label=${u}
          description=${e.message}
          @modal-cancel=${()=>c(!1)}
        >
          <div class="exec-approval-card">
            <div class="exec-approval-header">
              <div>
                <div class="exec-approval-title">${u}</div>
                <div class="exec-approval-sub" style="white-space: pre-line">
                  ${e.message}
                </div>
              </div>
            </div>
            ${e.details?r`<div class="exec-approval-command mono">${e.details}</div>`:t}
            <div class="exec-approval-actions">
              <button
                type="button"
                class="btn ${e.danger?`danger`:`primary`}"
                @click=${()=>c(!0)}
              >
                ${e.confirmLabel??a(`common.confirm`)}
              </button>
              <button type="button" class="btn" autofocus @click=${()=>c(!1)}>
                ${e.cancelLabel??a(`common.cancel`)}
              </button>
            </div>
          </div>
        </openclaw-modal-dialog>
      `,n)})}function l(e){return u?Promise.resolve(!1):(u=!0,c(e).finally(()=>{u=!1}))}var u,d=e((()=>{n(),o(),s(),u=!1}));export{l as n,d as t};
//# sourceMappingURL=confirm-dialog-gLs3P1IO.js.map