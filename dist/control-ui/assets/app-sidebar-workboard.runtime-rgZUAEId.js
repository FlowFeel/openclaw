import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Dt as t,Ot as n,wr as r,xr as i}from"./control-ui-core-CrKLOOVi.js";import{W as a,Y as o}from"./lit-runtime-D5xZwgO1.js";import{dn as s,rn as c}from"./control-ui-core-CVcZBevq.js";import{o as l,t as u}from"./control-ui-core-DkYXaYTI.js";import{n as d,t as f}from"./normalization-CpU4Y-Q0.js";import{n as p,t as m}from"./workboard-board-glyph-DnRCkvd8.js";function h(e,t){return new v(e,t)}var g,_,v,y,b;e((()=>{a(),c(),u(),i(),f(),n(),m(),g=`plugin.workboard.changed`,_=2e3,v=class{constructor(e,t){this.onSnapshot=e,this.host=t,this.client=null,this.connected=!1,this.disposed=!1,this.generation=0,this.load=null,this.retryTimer=null,this.snapshot={boards:[],ready:!1}}sync(e,t){if(this.disposed)return;let n=t&&!this.connected&&this.snapshot.ready;if(this.connected=t,!t||!e){this.load&&=(this.generation+=1,null),this.clearRetry();return}this.client!==e&&(this.client=e,this.generation+=1,this.load=null,this.publishCatalog([],!1)),this.ensureAndRecover(n)}handleGatewayEvent(e){e===g&&this.connected&&this.client&&this.ensureAndRecover(!0)}dispose(){this.disposed=!0,this.generation+=1,this.load=null,this.clearRetry(),this.host.clearBoards()}ensureAndRecover(e){let t=this.client;!t||!this.connected||this.ensure(t,e).then(n=>{if(!(this.disposed||!this.connected||this.client!==t)){if(n){this.clearRetry();return}!e&&this.snapshot.ready||this.retryTimer===null&&(this.retryTimer=globalThis.setTimeout(()=>{this.retryTimer=null,this.ensureAndRecover(!0)},_))}})}async ensure(e,t){if(this.disposed||!this.connected||this.client!==e||!t&&this.snapshot.ready)return!1;let n=this.load;if(n?.client===e){let r=await n.promise;return this.disposed||!this.connected||this.client!==e?!1:t?this.load&&this.load!==n?await this.load.promise:(this.load===n&&(this.load=null),await this.ensure(e,!0)):r}let r=++this.generation,i=(async()=>{try{let t=d(await e.request(`workboard.boards.list`,{}));return!t||this.disposed||!this.connected||this.client!==e||r!==this.generation?!1:(this.publishCatalog(t,!0),!0)}catch{return!1}})(),a={client:e,promise:i};this.load=a;try{return await i}finally{this.load===a&&(this.load=null)}}publishCatalog(e,n){t(this.host).boards=e,this.host.setBoardsReady(n),this.host.notify();let r={boards:e.map(({id:e,name:t,icon:n,color:r})=>({id:e,...t?{name:t}:{},...n?{icon:n}:{},...r?{color:r}:{}})),ready:n};this.snapshot=r,this.onSnapshot(r)}clearRetry(){this.retryTimer!==null&&(globalThis.clearTimeout(this.retryTimer),this.retryTimer=null)}},y=e=>{let t=s(e.board.id,e.basePath);return o`
    <a
      href=${t}
      class="nav-item nav-item--workboard-board ${e.active?`nav-item--active`:``}"
      aria-current=${e.active?`page`:void 0}
      @click=${n=>{n.defaultPrevented||n.button!==0||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||(n.preventDefault(),e.onNavigate(t))}}
    >
      <span class="nav-item__icon" aria-hidden="true"
        >${p(e.board,`workboard-board-glyph--sidebar`)}</span
      >
      <span class="nav-item__text">${r(e.board)}</span>
    </a>
  `},b=(e,t)=>o`
  <div class="sidebar-customize-menu__group-title">${l(`nav.workboardGroup`)}</div>
  ${e.map(e=>{let n=`workboard:${e.id}`;return o`
      <wa-dropdown-item
        class="sidebar-customize-menu__item"
        type="checkbox"
        value=${n}
        .checked=${t.includes(n)}
      >
        <span slot="icon" class="nav-item__icon" aria-hidden="true"
          >${p(e,`workboard-board-glyph--sidebar`)}</span
        >
        <span class="sidebar-customize-menu__text">${r(e)}</span>
      </wa-dropdown-item>
    `})}
`}))();export{h as createSidebarWorkboardRuntime,b as renderSidebarWorkboardCustomize,y as renderSidebarWorkboardEntry};
//# sourceMappingURL=app-sidebar-workboard.runtime-rgZUAEId.js.map