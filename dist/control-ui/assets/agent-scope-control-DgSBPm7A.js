import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{Bo as t,Ho as n,Ro as r,_s as i,fs as a}from"./control-ui-core-CrKLOOVi.js";import{W as o,Y as s}from"./lit-runtime-D5xZwgO1.js";import{o as c,t as l}from"./control-ui-core-DkYXaYTI.js";import{vt as u,yt as d}from"./control-ui-core-CTll8UdE.js";import{t as f}from"./agent-select-registration-tLb1rh76.js";function p(e){let r=e.selectedId??e.selection.state.scopeId??``,a=r?i(r):``,o=e.allowAll!==!1,l=t=>e.agents.some(e=>e.kind===`system`&&i(e.id)===t),d=t(e.agents),f=new Map(d.map(e=>{let t=i(e.id);return[t,t===e.id?e:{...e,id:t}]}));for(let t of e.additionalAgentIds??[]){if(!t.trim())continue;let e=i(t);!l(e)&&!f.has(e)&&f.set(e,{id:e})}a&&!l(a)&&!f.has(a)&&f.set(a,{id:a});let p=[...f.values()].toSorted((e,t)=>n(e).localeCompare(n(t))),m=l(a)?o?``:p[0]?.id??``:a,h=[...o?[{value:``,label:c(`agentScope.allAgents`),icon:u.users}]:[],...p.map(e=>({value:e.id,label:n(e),agent:e}))];return s`
    <div class="agent-scope-control">
      <span class="agent-scope-control__label">${c(`agentScope.label`)}</span>
      <openclaw-agent-select
        .options=${h}
        .value=${m}
        .accessibleLabel=${c(`agentScope.label`)}
        .onSelect=${t=>e.selection.setScope(t||null)}
      ></openclaw-agent-select>
    </div>
  `}var m=e((()=>{o(),l(),r(),a(),f(),d()}));export{p as n,m as t};
//# sourceMappingURL=agent-scope-control-DgSBPm7A.js.map