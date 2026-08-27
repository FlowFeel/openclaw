import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Qn as t,da as n,eo as r,ro as i,rr as a,sa as o}from"./control-ui-core-BUddgKjW.js";import{K as s,W as c,Y as l,a as u,o as d}from"./lit-runtime-D5xZwgO1.js";import{Wt as f,jt as p}from"./control-ui-core-Ct5CBwjl.js";import{o as m,t as h}from"./control-ui-core-s0pW0mau.js";import{n as g,t as _}from"./settings-workspace-BbyrBOFl.js";function v(e){let r=e.result?.sessions??[];return e.error?l`<section class="card" role="alert">
      ${m(`dashboardsPage.loadError`,{error:e.error})}
    </section>`:r.length===0?l`<section class="card stack" data-dashboards-empty role="status">
      <div class="list-title">${m(`dashboardsPage.emptyTitle`)}</div>
      <div class="card-sub">${m(`dashboardsPage.emptyDescription`)}</div>
    </section>`:l`<section class="card stack">
    <div class="list" aria-label=${f(`dashboards`)}>
      ${d(r,e=>e.key,r=>{let a=n({face:`dashboard`,sessionKey:r.key,fallbackAgentId:e.fallbackAgentId,basePath:e.basePath,row:r,mainKey:e.mainKey});return l`<a
            class="list-item list-item-clickable"
            data-dashboard-session=${r.key}
            href=${a.href}
          >
            <span class="list-main">
              <span class="list-title">${i(r.key,r)}</span>
              <span class="list-sub">${r.key}</span>
            </span>
            <span class="list-meta"
              >${r.updatedAt?t(r.updatedAt):s}</span
            >
          </a>`})}
    </div>
  </section>`}function y(e){let t=e?v(e):l`<section class="card" aria-busy="true">${m(`common.loading`)}</section>`;return l`
    <section class="content-header">
      <div>
        <div class="page-title">${f(`dashboards`)}</div>
        <div class="page-sub">${m(`subtitles.dashboards`)}</div>
      </div>
    </section>
    ${g(t)}
  `}e((()=>{c(),u(),p(),_(),h(),a(),r(),o()}))();export{y as renderDashboards};
//# sourceMappingURL=view-ZQ2w248N.js.map