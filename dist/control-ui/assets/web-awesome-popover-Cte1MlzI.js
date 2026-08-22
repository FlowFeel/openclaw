import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{$ as t,B as n,Q as r,W as i,Y as a,ct as o,dt as s,it as c,nt as l,z as u}from"./lit-runtime-D5xZwgO1.js";import{B as d,G as f,H as p,J as m,K as h,Q as g,U as _,V as v,W as y,X as b,Y as x,Z as S,at as C,ct as w,dt as T,et as E,ft as D,it as O,lt as k,mt as A,nt as j,ot as M,pt as N,q as P,rt as F,st as I,tt as L,ut as R,z}from"./control-ui-foundation-Dgui328h.js";var B,V=e((()=>{i(),B=o`
  :host {
    --arrow-size: 0.375rem;
    --max-width: 25rem;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    display: contents;

    /** Defaults for inherited CSS properties */
    font-size: var(--wa-font-size-m);
    line-height: var(--wa-line-height-normal);
    text-align: start;
    white-space: normal;
  }

  /* The native dialog element */
  .dialog {
    display: none;
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    pointer-events: none;

    &:focus {
      outline: none;
    }

    &[open] {
      display: block;
    }
  }

  /* The <wa-popup> element */
  .popover {
    --arrow-size: inherit;
    --popup-border-width: var(--wa-panel-border-width);
    --show-duration: inherit;
    --hide-duration: inherit;

    pointer-events: auto;

    &::part(arrow) {
      background-color: var(--wa-color-surface-default);
      border-top: none;
      border-left: none;
      border-bottom: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
      border-right: solid var(--wa-panel-border-width) var(--wa-color-surface-border);
      box-shadow: none;
    }
  }

  .popover[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .popover[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .popover[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .popover[placement^='right']::part(popup) {
    transform-origin: left;
  }

  /* Body */
  .body {
    display: flex;
    flex-direction: column;
    width: auto;
    max-width: min(var(--max-width), 100vw);
    padding: var(--wa-space-l);
    background-color: var(--wa-color-surface-default);
    border: var(--wa-panel-border-width) solid var(--wa-color-surface-border);
    border-radius: var(--wa-panel-border-radius);
    border-style: var(--wa-panel-border-style);
    box-shadow: var(--wa-shadow-l);
    color: var(--wa-color-text-normal);
    user-select: none;
    -webkit-user-select: none;
  }
`})),H,U,W=e((()=>{V(),A(),D(),R(),w(),g(),P(),f(),_(),p(),z(),F(),C(),i(),r(),u(),H=new Set,U=class extends j{constructor(){super(...arguments),this.anchor=null,this.placement=`top`,this.open=!1,this.distance=8,this.skidding=0,this.for=null,this.withoutArrow=!1,this.eventController=new AbortController,this.handleAnchorClick=()=>{this.open=!this.open},this.handleBodyClick=e=>{e.target.closest(`[data-popover="close"]`)&&(e.stopPropagation(),this.open=!1)},this.handleDocumentKeyDown=e=>{e.key===`Escape`&&this.open&&m(this)&&(e.preventDefault(),e.stopPropagation(),this.open=!1,this.anchor&&typeof this.anchor.focus==`function`&&this.anchor.focus())},this.handleDocumentClick=e=>{this.anchor&&e.composedPath().includes(this.anchor)||e.composedPath().includes(this)||(this.open=!1)}}connectedCallback(){super.connectedCallback(),this.id||=h(`wa-popover-`),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.for&&this.anchor&&(this.anchor=null,this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`keydown`,this.handleDocumentKeyDown),b(this),this.eventController.abort()}firstUpdated(){this.open&&(this.dialog.show(),this.popup.active=!0,this.popup.reposition())}updated(e){e.has(`open`)&&this.customStates.set(`open`,this.open)}async handleOpenChange(){if(this.open){let e=new N;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}H.forEach(e=>e.open=!1),document.addEventListener(`keydown`,this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener(`click`,this.handleDocumentClick,{signal:this.eventController.signal}),this.dialog.show(),this.popup.active=!0,H.add(this),x(this),requestAnimationFrame(()=>{let e=this.querySelector(`[autofocus]`);e&&typeof e.focus==`function`?e.focus():this.dialog.focus()}),await v(this.popup.popup,`show-with-scale`),this.popup.reposition(),this.dispatchEvent(new k)}else{let e=new T;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}document.removeEventListener(`keydown`,this.handleDocumentKeyDown),document.removeEventListener(`click`,this.handleDocumentClick),H.delete(this),b(this),await v(this.popup.popup,`hide-with-scale`),this.popup.active=!1,this.dialog.close(),this.dispatchEvent(new I)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,n=this.anchor;if(t===n)return;let{signal:r}=this.eventController;t&&t.addEventListener(`click`,this.handleAnchorClick,{signal:r}),n&&n.removeEventListener(`click`,this.handleAnchorClick),this.anchor=t,this.for&&!t&&console.warn(`A popover was assigned to an element with an ID of "${this.for}" but the element could not be found.`,this)}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}async show(){if(!this.open)return this.open=!0,y(this,`wa-after-show`)}async hide(){if(this.open)return this.open=!1,y(this,`wa-after-hide`)}render(){return a`
      <dialog part="dialog" class="dialog">
        <wa-popup
          part="popup"
          exportparts="
            popup:popup__popup,
            arrow:popup__arrow
          "
          class=${n({popover:!0,"popover-open":this.open})}
          placement=${this.placement}
          distance=${this.distance}
          skidding=${this.skidding}
          flip
          shift
          shift-padding="8"
          ?arrow=${!this.withoutArrow}
          .anchor=${this.anchor}
        >
          <div part="body" class="body" @click=${this.handleBodyClick}>
            <slot></slot>
          </div>
        </wa-popup>
      </dialog>
    `}},U.css=B,U.dependencies={"wa-popup":S},O([t(`dialog`)],U.prototype,`dialog`,2),O([t(`.body`)],U.prototype,`body`,2),O([t(`wa-popup`)],U.prototype,`popup`,2),O([l()],U.prototype,`anchor`,2),O([c()],U.prototype,`placement`,2),O([c({type:Boolean,reflect:!0})],U.prototype,`open`,2),O([c({type:Number})],U.prototype,`distance`,2),O([c({type:Number})],U.prototype,`skidding`,2),O([c()],U.prototype,`for`,2),O([c({attribute:`without-arrow`,type:Boolean,reflect:!0})],U.prototype,`withoutArrow`,2),O([d(`open`,{waitUntilFirstUpdate:!0})],U.prototype,`handleOpenChange`,1),O([d(`for`)],U.prototype,`handleForChange`,1),O([d([`distance`,`placement`,`skidding`])],U.prototype,`handleOptionsChange`,1),U=O([s(`wa-popover`)],U)})),G=e((()=>{W(),V(),g(),M(),F(),E(),L()})),K=e((()=>{G()}));export{K as t};
//# sourceMappingURL=web-awesome-popover-Cte1MlzI.js.map