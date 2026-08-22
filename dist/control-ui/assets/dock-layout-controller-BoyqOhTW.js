import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{K as t,W as n,Y as r,ct as i}from"./lit-runtime-D5xZwgO1.js";var a,o,s=e((()=>{n(),a=class{constructor(e,t){this.host=e,this.options=t,this.open=!1,this.suppressed=!1,this.resizeCleanup=null,this.onViewportResize=()=>{let e=Math.min(this.height,this.options.layout.maxHeight()),t=Math.min(this.width,this.options.layout.maxWidth());e===this.height&&t===this.width||(this.height=e,this.width=t,this.syncReservation(),this.options.onResize?.(),this.host.requestUpdate())},this.dock=t.layout.defaults.dock,this.height=t.layout.defaults.height,this.width=t.layout.defaults.width,e.addController(this)}hostConnected(){if(this.isFullscreen()){this.open=this.options.isAvailable();return}let e=this.options.layout.load();this.open=e.open&&this.options.isAvailable(),this.dock=e.dock,this.height=e.height,this.width=e.width,window.addEventListener(`resize`,this.onViewportResize)}hostDisconnected(){window.removeEventListener(`resize`,this.onViewportResize),this.clearResizeListeners(),this.clearReservation()}setOpen(e,t=!0){this.open=e,this.syncReservation(),t&&this.persist(),this.host.requestUpdate()}hideWithoutPersisting(){this.setOpen(!1,!1)}setSuppressed(e){return this.suppressed===e?!1:(this.suppressed=e,e?(this.hideWithoutPersisting(),!1):this.restoreOpenState())}restoreOpenState(){return this.suppressed||!this.options.isAvailable()||this.open||!this.isFullscreen()&&!this.options.layout.load().open?!1:(this.open=!0,this.syncReservation(),this.host.requestUpdate(),!0)}setDock(e,t=!0){this.dock=e,this.syncReservation(),t&&this.persist(),this.host.requestUpdate()}persist(){this.options.layout.save({open:this.open,dock:this.dock,height:this.height,width:this.width})}syncReservation(){if(this.isFullscreen())return;let e=this.options.isAvailable()&&this.open,t=document.documentElement.style;t.setProperty(`--oc-${this.options.reservationPrefix}-reserve-bottom`,e&&this.dock===`bottom`?`${this.height}px`:`0px`),t.setProperty(`--oc-${this.options.reservationPrefix}-reserve-right`,e&&this.dock===`right`?`${this.width}px`:`0px`)}startResize(e){e.preventDefault(),this.clearResizeListeners();let t=e.clientX,n=e.clientY,r=this.height,i=this.width,a=e=>{if(this.dock===`bottom`){let t=Math.max(this.options.layout.minHeight,r+(n-e.clientY));this.height=Math.min(t,this.options.layout.maxHeight())}else{let n=Math.max(this.options.layout.minWidth,i+(t-e.clientX));this.width=Math.min(n,this.options.layout.maxWidth())}this.syncReservation(),this.options.onResize?.(),this.host.requestUpdate()},o=()=>{window.removeEventListener(`pointermove`,a),window.removeEventListener(`pointerup`,s),window.removeEventListener(`pointercancel`,s),window.removeEventListener(`blur`,s),this.resizeCleanup===o&&(this.resizeCleanup=null)},s=()=>{o(),this.host.isConnected&&this.persist()};this.resizeCleanup=o,window.addEventListener(`pointermove`,a),window.addEventListener(`pointerup`,s),window.addEventListener(`pointercancel`,s),window.addEventListener(`blur`,s)}renderResizer(e,n){return this.isFullscreen()?t:r`<div
      class="${e}-resizer ${e}-resizer--${this.dock}"
      @pointerdown=${e=>this.startResize(e)}
      role="separator"
      aria-label=${n}
    ></div>`}clearResizeListeners(){this.resizeCleanup?.(),this.resizeCleanup=null}clearReservation(){let e=document.documentElement.style;e.setProperty(`--oc-${this.options.reservationPrefix}-reserve-bottom`,`0px`),e.setProperty(`--oc-${this.options.reservationPrefix}-reserve-right`,`0px`)}isFullscreen(){return this.options.isFullscreen?.()===!0}},o=i`
  :host {
    position: fixed;
    z-index: 60;
    color: var(--text, #d7dae0);
    font-family: var(--font-sans, system-ui, sans-serif);
  }
  :is(.bp, .tp) {
    position: fixed;
    display: flex;
    flex-direction: column;
    background: var(--bg, #0e1015);
    overflow: hidden;
  }
  :is(.bp--bottom, .tp--bottom) {
    border-top: 1px solid var(--border, #262b34);
  }
  :is(.bp--right, .tp--right) {
    border-left: 1px solid var(--border, #262b34);
  }
  :is(.bp-resizer, .tp-resizer) {
    position: absolute;
    z-index: 2;
    background: transparent;
  }
  :is(.bp-resizer, .tp-resizer):hover {
    background: var(--accent, #ff5c5c);
    opacity: 0.5;
  }
  :is(.bp-resizer--bottom, .tp-resizer--bottom) {
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    cursor: ns-resize;
  }
  :is(.bp-resizer--right, .tp-resizer--right) {
    top: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    cursor: ew-resize;
  }
  :is(.bp-header, .tp-header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 0 6px 0 4px;
    border-bottom: 1px solid var(--border, #262b34);
    min-height: 36px;
  }
  :is(.bp-icon, .tp-icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: none;
    background: transparent;
    color: var(--muted, #8a919e);
    border-radius: 6px;
    padding: 0;
  }
  :is(.bp-icon, .tp-icon):hover {
    background: color-mix(in srgb, var(--text, #d7dae0) 12%, transparent);
    color: var(--text, #d7dae0);
  }
  :is(.bp-actions, .tp-actions) {
    display: flex;
    align-items: center;
    gap: 2px;
    padding-left: 6px;
  }
`}));export{o as n,s as r,a as t};
//# sourceMappingURL=dock-layout-controller-BoyqOhTW.js.map