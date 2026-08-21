import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{$ as t,Q as n,Z as r,et as i,rt as a}from"./control-ui-core-UWR2ANgr.js";import{K as o,W as s,Y as c,c as l,d as u,p as d,u as f}from"./lit-runtime-D5xZwgO1.js";function p(e){let r=n(e),a=r.kind===`initials`?r:i(e),o=r.kind===`profile`?t(r.url):null;return{fallback:a,imageUrl:o,pending:o!==null&&typeof o!=`string`}}function m(e,t){return d(`${e}${t.pending?` is-fallback`:``}`)}function h(e,t,n){let r=e.currentTarget;r instanceof HTMLImageElement&&(a(r.getAttribute(`src`)),r.closest(t)?.classList.toggle(`is-fallback`,n))}function g({view:e,fallbackSelector:t,className:n,alt:r=``,ariaHidden:i=!1}){return e.imageUrl?c`<img
    class=${n??o}
    src=${typeof e.imageUrl==`string`?e.imageUrl:f(e.imageUrl.then(e=>e??o),o)}
    alt=${r}
    aria-hidden=${i?`true`:o}
    referrerpolicy="no-referrer"
    @error=${e=>h(e,t,!0)}
    @load=${e=>h(e,t,!1)}
  />`:o}var _=e((()=>{s(),u(),l(),r()}));export{p as i,_ as n,g as r,m as t};
//# sourceMappingURL=identity-avatar-view-BN7xK5rs.js.map