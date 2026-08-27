import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as r,Uc as i}from"./control-ui-core-BUddgKjW.js";import{K as a,Q as o,W as s,Y as c,nt as l}from"./lit-runtime-D5xZwgO1.js";import{o as u,t as d}from"./control-ui-core-s0pW0mau.js";function f(e){document.querySelector(`openclaw-toast-host`)?.show(e)}var p,m,h=e((()=>{s(),o(),d(),r(),t(),p=6e3,m=class extends i{constructor(...e){super(...e),this.toast=null,this.dismissTimer=null}disconnectedCallback(){this.clearDismissTimer(),super.disconnectedCallback()}show(e){this.clearDismissTimer(),this.toast=e,this.dismissTimer=globalThis.setTimeout(()=>this.dismiss(),e.durationMs??p)}clearDismissTimer(){this.dismissTimer!==null&&(globalThis.clearTimeout(this.dismissTimer),this.dismissTimer=null)}dismiss(){this.clearDismissTimer(),this.toast=null}render(){let e=this.toast;return e?c`
      <div class="app-toast" role="status" aria-live="polite" aria-atomic="true">
        <span class="app-toast__message">${e.message}</span>
        ${e.actionLabel&&e.onAction?c`
              <button
                type="button"
                class="app-toast__action"
                @click=${()=>{this.dismiss(),e.onAction?.()}}
              >
                ${e.actionLabel}
              </button>
            `:a}
        <button
          type="button"
          class="app-toast__dismiss"
          aria-label=${u(`common.dismiss`)}
          @click=${()=>this.dismiss()}
        >
          ×
        </button>
      </div>
    `:a}},n([l()],m.prototype,`toast`,void 0),customElements.get(`openclaw-toast-host`)||customElements.define(`openclaw-toast-host`,m)}));export{f as n,h as t};
//# sourceMappingURL=toast-psGOnOwO.js.map