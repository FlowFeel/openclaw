import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Ar as r,Bc as i,Hc as a,Jn as o,Kc as s,On as c,Or as l,Sn as u,Vc as d,Wc as f,Wn as p,Zn as m,_a as h,er as g,ga as _,kr as v,ma as y,pa as b,qn as x,rr as S,va as C}from"./control-ui-core-ChU36mQ7.js";import{I as w,K as T,Q as E,R as D,W as O,Y as k,Z as A,it as j,nt as M}from"./lit-runtime-D5xZwgO1.js";import{f as N,g as P,i as F,m as I,p as L,r as ee}from"./control-ui-foundation-Dgui328h.js";import{Wt as R,_ as z,jt as B,v as te}from"./control-ui-core-CmlLmVZa.js";import{Ct as V,Et as H,Ft as ne,Qt as re,Rt as ie,Wt as U,en as W,wt as ae}from"./control-ui-foundation-DkfOBVsU.js";import{o as G,t as K}from"./control-ui-core-M4uhXYSJ.js";import{gt as oe,ot as se}from"./control-ui-core-pXkCFtVv.js";import{m as ce,p as le}from"./control-ui-shared-C-1hBCcB.js";import{a as ue,i as de,n as fe,o as pe,r as me,t as he}from"./panel-refresh-status-ERvZmNEF.js";import{n as ge,t as _e}from"./settings-workspace-BbyrBOFl.js";import{s as ve,t as ye,u as be}from"./settings-ui-Bq4yxauk.js";import{n as xe,t as Se}from"./gateway-page-controller-CmSjSlgL.js";import{n as Ce,t as we}from"./agent-scope-control-_fy2Bhi1.js";import{n as Te,r as Ee,t as De}from"./usage-8Pej9XlW.js";function Oe(e,t){if(!e)return t;if(!t)return e;let n={fresh:0,partial:1,stale:2,refreshing:3};return{status:n[t.status]>n[e.status]?t.status:e.status,cachedFiles:Math.max(e.cachedFiles,t.cachedFiles),pendingFiles:Math.max(e.pendingFiles,t.pendingFiles),staleFiles:Math.max(e.staleFiles,t.staleFiles),refreshedAt:Math.max(e.refreshedAt??0,t.refreshedAt??0)||void 0}}function ke(e){return!e||e.status!==`refreshing`&&e.status!==`stale`&&e.status!==`partial`?null:G(`usage.cacheStatus.title`,{status:G(`usage.cacheStatus.status.${e.status}`),pending:String(e.pendingFiles),stale:String(e.staleFiles),cached:String(e.cachedFiles)})}var Ae=e((()=>{K()}));function je(){let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function Me(e){if(typeof e==`string`)return e;if(e instanceof Error&&e.message.trim())return e.message;if(e&&typeof e==`object`)try{return JSON.stringify(e)||`request failed`}catch{}return`request failed`}function Ne(e,t,n,r,i){if(r&&e.length>0)for(let r of e.slice(-1)){let i=n.indexOf(r),a=n.indexOf(t);if(i!==-1&&a!==-1){let[t,r]=i<a?[i,a]:[a,i];return[...new Set([...e,...n.slice(t,r+1)])]}}return e.includes(t)?e.filter(e=>e!==t):i?[...e,t]:[t]}function Pe(e,t,n,r,i){if(i&&e.length>0){let i=[...n].toSorted((e,t)=>{let n=r?e.usage?.totalTokens??0:e.usage?.totalCost??0;return(r?t.usage?.totalTokens??0:t.usage?.totalCost??0)-n}).map(e=>e.key),a=i.indexOf(e.at(-1)??``),o=i.indexOf(t);if(a!==-1&&o!==-1){let[t,n]=a<o?[a,o]:[o,a];return[...new Set([...e,...i.slice(t,n+1)])]}}return e.length===1&&e[0]===t?[]:[t]}function Fe(e){let t=e.split(`
`),n=new Map,r=[];for(let e of t){let t=/^\[Tool:\s*([^\]]+)\]/.exec(e.trim())?.[1];if(t){n.set(t,(n.get(t)??0)+1);continue}e.trim().startsWith(`[Tool Result]`)||r.push(e)}let i=Array.from(n.entries()).toSorted((e,t)=>t[1]-e[1]),a=i.reduce((e,[,t])=>e+t,0);return{tools:i,summary:i.length>0?`Tools: ${i.map(([e,t])=>`${e}×${t}`).join(`, `)} (${a} calls)`:``,cleanContent:r.join(`
`).trim()}}var Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze=e((()=>{a(),Ie=e=>W(e),Le=e=>{let t=e.replace(/[.+^${}()|[\]\\]/g,`\\$&`).replace(/\*/g,`.*`).replace(/\?/g,`.`);return RegExp(`^${t}$`,`i`)},Re=e=>{let t=W(e);if(!t)return null;t.startsWith(`$`)&&(t=t.slice(1));let n=1;if(t.endsWith(`k`)?(n=1e3,t=t.slice(0,-1)):t.endsWith(`m`)&&(n=1e6,t=t.slice(0,-1)),!/^\d+(?:\.\d+)?$/.test(t))return null;let r=Number(t)*n;return!Number.isFinite(r)||!Number.isSafeInteger(Math.round(r))?null:r},ze=e=>(e.match(/"[^"]+"|\S+/g)??[]).map(e=>{let t=e.replace(/^"|"$/g,``),n=t.indexOf(`:`);return n>0?{key:t.slice(0,n),value:t.slice(n+1),raw:t}:{value:t,raw:t}}),Be=e=>[e.label,e.key,e.sessionId].filter(e=>!!e).map(e=>W(e)),Ve=e=>{let t=new Set;e.modelProvider&&t.add(W(e.modelProvider)),e.providerOverride&&t.add(W(e.providerOverride)),e.origin?.provider&&t.add(W(e.origin.provider));for(let n of e.usage?.modelUsage??[])n.provider&&t.add(W(n.provider));return Array.from(t)},He=e=>{let t=new Set;e.model&&t.add(W(e.model));for(let n of e.usage?.modelUsage??[])n.model&&t.add(W(n.model));return Array.from(t)},Ue=e=>(e.usage?.toolUsage?.tools??[]).map(e=>W(e.name)),We={tools:e=>(e.usage?.toolUsage?.totalCalls??0)>0,errors:e=>(e.usage?.messageCounts?.errors??0)>0,context:e=>!!e.contextWeight,usage:e=>!!e.usage,model:e=>He(e).length>0,provider:e=>Ve(e).length>0},Ge=(e,t)=>e>=t,Ke=(e,t)=>e<=t,qe={mintokens:[e=>e.usage?.totalTokens??0,Ge],maxtokens:[e=>e.usage?.totalTokens??0,Ke],mincost:[e=>e.usage?.totalCost??0,Ge],maxcost:[e=>e.usage?.totalCost??0,Ke],minmessages:[e=>e.usage?.messageCounts?.total??0,Ge],maxmessages:[e=>e.usage?.messageCounts?.total??0,Ke]},Je=new Set([`agent`,`channel`,`chat`,`provider`,`model`,`tool`,`label`,`key`,`session`,`id`,`has`,...Object.keys(qe)]),Ye=(e,t)=>{let n=Ie(t.value??``);if(!n)return!0;if(!t.key)return Be(e).some(e=>e.includes(n));let r=Ie(t.key);switch(r){case`agent`:return W(e.agentId).includes(n);case`channel`:return W(e.channel).includes(n);case`chat`:return W(e.chatType).includes(n);case`provider`:return Ve(e).some(e=>e.includes(n));case`model`:return He(e).some(e=>e.includes(n));case`tool`:return Ue(e).some(e=>e.includes(n));case`label`:return W(e.label).includes(n);case`key`:case`session`:case`id`:if(n.includes(`*`)||n.includes(`?`)){let t=Le(n);return t.test(e.key)||(e.sessionId?t.test(e.sessionId):!1)}return W(e.key).includes(n)||W(e.sessionId).includes(n);case`has`:return(Object.hasOwn(We,n)?We[n]:void 0)?.(e)??!0}let i=Object.hasOwn(qe,r)?qe[r]:void 0;if(!i)return!0;let a=Re(n),[o,s]=i;return a===null||s(o(e),a)},Xe=(e,t)=>{let n=ze(t);if(n.length===0)return{sessions:e,warnings:[]};let r=[];for(let e of n){if(!e.key)continue;let t=Ie(e.key);if(!Je.has(t)){r.push(`Unknown filter: ${e.key}`);continue}e.value===``&&r.push(`Missing value for ${e.key}`),t===`has`&&e.value&&!Object.hasOwn(We,Ie(e.value))&&r.push(`Unknown has:${e.value}`),Object.hasOwn(qe,t)&&e.value&&Re(e.value)===null&&r.push(`Invalid number for ${e.key}`)}return{sessions:e.filter(e=>n.every(t=>Ye(e,t))),warnings:r}}}));function Qe(e,t){return r(t)?{clearData:!0,status:de(me(),l(`usage details`))}:{clearData:!1,status:de(e,Me(t))}}var $e=e((()=>{ue(),v(),Ze()}));function et(e,t,n){let r=t?.sessions.map(e=>e.agentId).filter(e=>!!e?.trim())??[];return k`
    <section class="content-header content-header--page">
      <div>
        <div class="page-title">${R(`usage`)}</div>
      </div>
      ${Ce({agents:e.agents.state.agentsList?.agents??[],additionalAgentIds:r,selection:e.agentSelection})}
    </section>
    ${ge(n)}
  `}var tt=e((()=>{O(),B(),we(),_e()}));function nt(e){if(e.reason===`manual`)return`fetch`;if(!e.visible)return`defer`;if(e.interrupted)return`fetch`;let t=e.ttlMs??rt;return e.lastLoadedAtMs!==null&&e.nowMs-e.lastLoadedAtMs<t?`skip`:`fetch`}var rt,it,at=e((()=>{rt=5*6e4,it=class{constructor(e){this.options=e,this.lastLoadedAtMs=null,this.pendingAutomaticRefresh=!1,this.reloadPending=!1}setLastLoadedAtMs(e){this.lastLoadedAtMs=e}markLoaded(){this.lastLoadedAtMs=Date.now()}resetPayload(){this.lastLoadedAtMs=null,this.reloadPending=!1}interrupt(){this.reloadPending||=this.options.isLoading()}markLoadDeferred(){this.reloadPending=!0}beginLoad(){this.reloadPending=!1}reload(){this.pendingAutomaticRefresh=!1,this.options.reload()}request(e){if(this.options.isLoading()&&e!==`manual`){this.pendingAutomaticRefresh=!0;return}this.pendingAutomaticRefresh=!1,nt({reason:e,visible:document.visibilityState===`visible`&&document.hasFocus(),interrupted:this.reloadPending,nowMs:Date.now(),lastLoadedAtMs:this.lastLoadedAtMs})===`fetch`&&this.reload()}flushPending(){this.pendingAutomaticRefresh&&(this.pendingAutomaticRefresh=!1,this.request(`focus`))}}})),ot,st=e((()=>{ot=[`channel`,`agent`,`provider`,`model`,`messages`,`tools`,`errors`,`duration`]}));function ct(e,t){!t||t.count<=0||(e.count+=t.count,e.sum+=t.avgMs*t.count,e.min=Math.min(e.min,t.minMs),e.max=Math.max(e.max,t.maxMs),e.p95Max=Math.max(e.p95Max,t.p95Ms))}function lt(e,t){for(let n of t??[]){let t=e.get(n.date)??{date:n.date,count:0,sum:0,min:1/0,max:0,p95Max:0};t.count+=n.count,t.sum+=n.avgMs*n.count,t.min=Math.min(t.min,n.minMs),t.max=Math.max(t.max,n.maxMs),t.p95Max=Math.max(t.p95Max,n.p95Ms),e.set(n.date,t)}}function ut(e){return{byChannel:Array.from(e.byChannelMap.entries()).map(([e,t])=>({channel:e,totals:t})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),latency:e.latencyTotals.count>0?{count:e.latencyTotals.count,avgMs:e.latencyTotals.sum/e.latencyTotals.count,minMs:e.latencyTotals.min===1/0?0:e.latencyTotals.min,maxMs:e.latencyTotals.max,p95Ms:e.latencyTotals.p95Max}:void 0,dailyLatency:Array.from(e.dailyLatencyMap.values()).map(e=>({date:e.date,count:e.count,avgMs:e.count?e.sum/e.count:0,minMs:e.min===1/0?0:e.min,maxMs:e.max,p95Ms:e.p95Max})).toSorted((e,t)=>e.date.localeCompare(t.date)),modelDaily:Array.from(e.modelDailyMap.values()).toSorted((e,t)=>e.date.localeCompare(t.date)||t.cost-e.cost),daily:Array.from(e.dailyMap.values()).toSorted((e,t)=>e.date.localeCompare(t.date))}}var dt=e((()=>{}));function ft(e){return Math.round(e/Pt)}function q(e){return p(e,{thousandsSuffix:`K`,trimTrailingZero:!1})}function J(e,t=2){return`$${e.toFixed(t)}`}function pt(e){let t=new Date;return t.setHours(e,0,0,0),t.toLocaleTimeString(void 0,{hour:`numeric`})}function mt(e,t,n){let r=e.usage;if(!r)return!1;let i=r.firstActivity??e.updatedAt,a=r.lastActivity??e.updatedAt;if(!i||!a)return!1;let o=Math.min(i,a),s=Math.max(i,a);if(o===s){let e=new Date(o);return n({usage:r,hour:gt(e,t),weekday:_t(e,t),share:1}),!0}let c=(s-o)/6e4,l=o;for(;l<s;){let e=new Date(l),i=bt(e,t),a=Math.min(i.getTime(),s),o=Math.max((a-l)/6e4,0);n({usage:r,hour:gt(e,t),weekday:_t(e,t),share:o/c}),l=a+1}return!0}function ht(e,t){let n=Array.from({length:24},()=>0),r=Array.from({length:24},()=>0);for(let i of e){let e=i.usage;if(!e?.messageCounts||e.messageCounts.total===0)continue;let a=e.messageCounts;if(e.utcQuarterHourMessageCounts&&e.utcQuarterHourMessageCounts.length>0){for(let i of e.utcQuarterHourMessageCounts){let e=yt(i.date,i.quarterIndex,t);e&&(n[e.hour]=(n[e.hour]??0)+i.errors,r[e.hour]=(r[e.hour]??0)+i.total)}continue}mt(i,t,({hour:e,share:t})=>{n[e]=(n[e]??0)+(a.errors??0)*t,r[e]=(r[e]??0)+a.total*t})}return r.map((e,t)=>{let r=n[t]??0;return{hour:t,rate:e>0?r/e:0,errors:r,msgs:e}}).filter(e=>e.msgs>0&&e.errors>0).toSorted((e,t)=>t.rate-e.rate).slice(0,5).map(e=>({label:pt(e.hour),value:`${(e.rate*100).toFixed(2)}%`,sub:`${Math.round(e.errors)} ${W(G(`usage.overview.errors`))} · ${Math.round(e.msgs)} ${G(`usage.overview.messagesAbbrev`)}`}))}function gt(e,t){return t===`utc`?e.getUTCHours():e.getHours()}function _t(e,t){return t===`utc`?e.getUTCDay():e.getDay()}function vt(e,t){let n=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!n||!Number.isInteger(t)||t<0||t>95)return null;let[,r,i,a]=n,o=Number(r),s=Number(i),c=Number(a),l=new Date(Date.UTC(o,s-1,c,0,t*15));return Number.isNaN(l.valueOf())||l.getUTCFullYear()!==o||l.getUTCMonth()!==s-1||l.getUTCDate()!==c?null:l}function yt(e,t,n){let r=vt(e,t);return r?{hour:gt(r,n),weekday:_t(r,n)}:null}function bt(e,t){let n=new Date(e);return t===`utc`?n.setUTCMinutes(59,59,999):n.setMinutes(59,59,999),n}function xt(e,t,n){let r=e.usage?.utcQuarterHourTokenUsage;if(!r||r.length===0)return!1;let i=!1;for(let e of r){if(e.totalTokens<=0)continue;let r=yt(e.date,e.quarterIndex,t);r&&(i=!0,n({hour:r.hour,weekday:r.weekday,tokens:e.totalTokens}))}return i}function St(e,t,n){let r=e.usage,i=r?.firstActivity??e.updatedAt,a=r?.lastActivity??e.updatedAt;if(!i||!a)return!1;let o=Math.min(i,a),s=Math.max(i,a),c=o;for(;c<=s;){let e=new Date(c),r=gt(e,n);if(t.includes(r))return!0;let i=bt(e,n);c=Math.min(i.getTime(),s)+1}return!1}function Ct(e,t,n){if(t.length===0)return!0;let r=!1;return xt(e,n,({hour:e})=>{t.includes(e)&&(r=!0)})?r:St(e,t,n)}function wt(e,t){let n=Array.from({length:24},()=>0),r=Array.from({length:7},()=>0),i=0,a=!1;for(let o of e){let e=o.usage;if(!(!e||!e.totalTokens||e.totalTokens<=0)){if(i+=e.totalTokens,xt(o,t,({hour:e,weekday:t,tokens:i})=>{n[e]=(n[e]??0)+i,r[t]=(r[t]??0)+i})){a=!0;continue}mt(o,t,({usage:e,hour:t,weekday:i,share:a})=>{n[t]=(n[t]??0)+e.totalTokens*a,r[i]=(r[i]??0)+e.totalTokens*a})&&(a=!0)}}let o=[G(`usage.mosaic.sun`),G(`usage.mosaic.mon`),G(`usage.mosaic.tue`),G(`usage.mosaic.wed`),G(`usage.mosaic.thu`),G(`usage.mosaic.fri`),G(`usage.mosaic.sat`)].map((e,t)=>({label:e,tokens:r[t]??0}));return{hasData:a,totalTokens:i,hourTotals:n,weekdayTotals:o}}function Tt(e,t,n,r){let i=wt(e,t);if(!i.hasData)return be({title:G(`usage.mosaic.title`),description:G(`usage.mosaic.subtitleEmpty`),actions:k`
          <div class="usage-mosaic-total">
            ${q(0)} ${W(G(`usage.metrics.tokens`))}
          </div>
        `},k`
        <div class="usage-panel usage-mosaic">
          <div class="usage-empty-block usage-empty-block--compact">
            ${G(`usage.mosaic.noTimelineData`)}
          </div>
        </div>
      `);let a=Math.max(...i.hourTotals,1),o=Math.max(...i.weekdayTotals.map(e=>e.tokens),1);return be({title:G(`usage.mosaic.title`),description:G(`usage.mosaic.subtitle`,{zone:G(t===`utc`?`usage.filters.timeZoneUtc`:`usage.filters.timeZoneLocal`)}),actions:k`
        <div class="usage-mosaic-total">
          ${q(i.totalTokens)}
          ${W(G(`usage.metrics.tokens`))}
        </div>
      `},k`
      <div class="usage-panel usage-mosaic">
        <div class="usage-mosaic-grid">
          <div class="usage-mosaic-section">
            <div class="usage-mosaic-section-title">${G(`usage.mosaic.dayOfWeek`)}</div>
            <div class="usage-daypart-grid">
              ${i.weekdayTotals.map(e=>{let t=Math.min(e.tokens/o,1);return k`
                  <div class="usage-daypart-cell" style="background: ${e.tokens>0?`color-mix(in srgb, var(--accent) ${(12+t*60).toFixed(1)}%, transparent)`:`transparent`};">
                    <div class="usage-daypart-label">${e.label}</div>
                    <div class="usage-daypart-value">${q(e.tokens)}</div>
                  </div>
                `})}
            </div>
          </div>
          <div class="usage-mosaic-section">
            <div class="usage-mosaic-section-title">
              <span>${G(`usage.filters.hours`)}</span>
              <span class="usage-mosaic-sub">0 → 23</span>
            </div>
            <div class="usage-hour-grid">
              ${i.hourTotals.map((e,t)=>{let i=Math.min(e/a,1),o=e>0?`color-mix(in srgb, var(--accent) ${(8+i*70).toFixed(1)}%, transparent)`:`transparent`,s=`${t}:00 · ${q(e)} ${W(G(`usage.metrics.tokens`))}`,c=i>.7?`color-mix(in srgb, var(--accent) 60%, transparent)`:`color-mix(in srgb, var(--accent) 24%, transparent)`,l=n.includes(t);return k`
                  <button
                    type="button"
                    class="usage-hour-cell ${l?`selected`:``}"
                    style="background: ${o}; border-color: ${c};"
                    title="${s}"
                    aria-label=${s}
                    aria-pressed=${l?`true`:`false`}
                    @click=${e=>r(t,e.shiftKey)}
                  ></button>
                `})}
            </div>
            <div class="usage-hour-labels">
              <span>${G(`usage.mosaic.midnight`)}</span>
              <span>${G(`usage.mosaic.fourAm`)}</span>
              <span>${G(`usage.mosaic.eightAm`)}</span>
              <span>${G(`usage.mosaic.noon`)}</span>
              <span>${G(`usage.mosaic.fourPm`)}</span>
              <span>${G(`usage.mosaic.eightPm`)}</span>
            </div>
            <div class="usage-hour-legend">
              <span></span>
              ${G(`usage.mosaic.legend`)}
            </div>
          </div>
        </div>
      </div>
    `)}function Et(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`}function Dt(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let[,n,r,i]=t,a=Number(n),o=Number(r)-1,s=Number(i),c=new Date(a,o,s);return Number.isNaN(c.valueOf())||c.getFullYear()!==a||c.getMonth()!==o||c.getDate()!==s?null:c}function Ot(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(e);if(!t)return null;let n=Number(t[1]),r=Number(t[2]),i=Number(t[3]),a=Date.UTC(n,r-1,i),o=new Date(a);return o.getUTCFullYear()!==n||o.getUTCMonth()!==r-1||o.getUTCDate()!==i?null:a/Ft}function kt(e){return new Date(e*Ft).toISOString().slice(0,10)}function At(e){let t=Dt(e);return t?t.toLocaleDateString(void 0,{month:`short`,day:`numeric`}):e}function jt(e){let t=Dt(e);return t?t.toLocaleDateString(void 0,{month:`long`,day:`numeric`,year:`numeric`}):e}function Mt(e,t,n){let r=Ot(t),i=Ot(n);if(r===null||i===null||r>i)return null;let a=It();for(let t of e){let e=Ot(t.date);e!==null&&e>=r&&e<=i&&Lt(a,t)}return{days:i-r+1,startDate:t,endDate:n,totals:a}}function Nt(e,t,n,r=[1,7,30,90]){let i=Ot(t),a=Ot(n);if(i===null||a===null||i>a)return[];let o=a-i+1;return Array.from(new Set(r.map(e=>Math.max(1,Math.trunc(e))))).filter(e=>e<o).toSorted((e,t)=>e-t).map(t=>Mt(e,kt(a-t+1),n)).filter(e=>e!==null)}var Pt,Ft,It,Lt,Rt,zt,Bt=e((()=>{O(),dt(),ye(),K(),S(),a(),Pt=4,Ft=864e5,It=()=>({input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}),Lt=(e,t)=>{e.input+=t.input??0,e.output+=t.output??0,e.cacheRead+=t.cacheRead??0,e.cacheWrite+=t.cacheWrite??0,e.totalTokens+=t.totalTokens??0,e.totalCost+=t.totalCost??0,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0},Rt=(e,t)=>{if(e.length===0)return t??{messages:{total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},tools:{totalCalls:0,uniqueTools:0,tools:[]},byModel:[],byProvider:[],byAgent:[],byChannel:[],daily:[]};let n={total:0,user:0,assistant:0,toolCalls:0,toolResults:0,errors:0},r=new Map,i=new Map,a=new Map,o=new Map,s=new Map,c=new Map,l=new Map,u=new Map,d={count:0,sum:0,min:1/0,max:0,p95Max:0};for(let t of e){let e=t.usage;if(e){if(e.messageCounts&&(n.total+=e.messageCounts.total,n.user+=e.messageCounts.user,n.assistant+=e.messageCounts.assistant,n.toolCalls+=e.messageCounts.toolCalls,n.toolResults+=e.messageCounts.toolResults,n.errors+=e.messageCounts.errors),e.toolUsage)for(let t of e.toolUsage.tools)r.set(t.name,(r.get(t.name)??0)+t.count);if(e.modelUsage)for(let t of e.modelUsage){let e=`${t.provider??`unknown`}::${t.model??`unknown`}`,n=i.get(e)??{provider:t.provider,model:t.model,count:0,totals:It()};n.count+=t.count,Lt(n.totals,t.totals),i.set(e,n);let r=t.provider??`unknown`,o=a.get(r)??{provider:t.provider,model:void 0,count:0,totals:It()};o.count+=t.count,Lt(o.totals,t.totals),a.set(r,o)}if(ct(d,e.latency),t.agentId){let n=o.get(t.agentId)??It();Lt(n,e),o.set(t.agentId,n)}if(t.channel){let n=s.get(t.channel)??It();Lt(n,e),s.set(t.channel,n)}for(let t of e.dailyBreakdown??[]){let e=c.get(t.date)??{date:t.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};e.tokens+=t.tokens,e.cost+=t.cost,c.set(t.date,e)}for(let t of e.dailyMessageCounts??[]){let e=c.get(t.date)??{date:t.date,tokens:0,cost:0,messages:0,toolCalls:0,errors:0};e.messages+=t.total,e.toolCalls+=t.toolCalls,e.errors+=t.errors,c.set(t.date,e)}lt(l,e.dailyLatency);for(let t of e.dailyModelUsage??[]){let e=`${t.date}::${t.provider??`unknown`}::${t.model??`unknown`}`,n=u.get(e)??{date:t.date,provider:t.provider,model:t.model,tokens:0,cost:0,count:0};n.tokens+=t.tokens,n.cost+=t.cost,n.count+=t.count,u.set(e,n)}}}let f=ut({byChannelMap:s,latencyTotals:d,dailyLatencyMap:l,modelDailyMap:u,dailyMap:c});return{messages:n,tools:{totalCalls:Array.from(r.values()).reduce((e,t)=>e+t,0),uniqueTools:r.size,tools:Array.from(r.entries()).map(([e,t])=>({name:e,count:t})).toSorted((e,t)=>t.count-e.count)},byModel:Array.from(i.values()).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),byProvider:Array.from(a.values()).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),byAgent:Array.from(o.entries()).map(([e,t])=>({agentId:e,totals:t})).toSorted((e,t)=>t.totals.totalCost-e.totals.totalCost),...f}},zt=(e,t,n)=>{let r=0,i=0;for(let t of e){let e=t.usage?.durationMs??0;e>0&&(r+=e,i+=1)}let a=i?r/i:0,o=t&&r>0?t.totalTokens/(r/6e4):void 0,s=t&&r>0?t.totalCost/(r/6e4):void 0,c=n.messages.total?n.messages.errors/n.messages.total:0,l;for(let e of n.daily){if(e.messages<=0||e.errors<=0)continue;let t={date:e.date,errors:e.errors,messages:e.messages,rate:e.errors/e.messages};(!l||t.rate>l.rate||t.rate===l.rate&&t.errors>l.errors)&&(l=t)}return{durationSumMs:r,durationCount:i,avgDurationMs:a,throughputTokensPerMin:o,throughputCostPerMin:s,errorRate:c,peakErrorDay:l}}}));function Vt(e,t,n=`text/plain`){let r=new Blob([t],{type:`${n};charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,a.click(),URL.revokeObjectURL(i)}function Ht(e){return/^[ \t\r\n]*[=+\-@\uFF0B\uFF0D\uFF1D\uFF20]/u.test(e)?`'${e}`:e}function Ut(e,t=!0){let n=t?Ht(e):e;return/[",\r\n]/.test(n)?`"${n.replaceAll(`"`,`""`)}"`:n}function Wt(e){return e.map(e=>e==null?``:Ut(String(e),typeof e==`string`)).join(`,`)}var Gt,Kt,qt,Jt,Y,Yt,Xt,Zt,Qt=e((()=>{ne(),a(),Ze(),Gt=e=>{let t=[Wt([`key`,`label`,`agentId`,`channel`,`provider`,`model`,`updatedAt`,`durationMs`,`messages`,`errors`,`toolCalls`,`inputTokens`,`outputTokens`,`cacheReadTokens`,`cacheWriteTokens`,`totalTokens`,`totalCost`])];for(let n of e){let e=n.usage;t.push(Wt([n.key,n.label??``,n.agentId??``,n.channel??``,n.modelProvider??n.providerOverride??``,n.model??n.modelOverride??``,ie(n.updatedAt)??``,e?.durationMs??``,e?.messageCounts?.total??``,e?.messageCounts?.errors??``,e?.messageCounts?.toolCalls??``,e?.input??``,e?.output??``,e?.cacheRead??``,e?.cacheWrite??``,e?.totalTokens??``,e?.totalCost??``]))}return t.join(`
`)},Kt=e=>{let t=[Wt([`date`,`inputTokens`,`outputTokens`,`cacheReadTokens`,`cacheWriteTokens`,`totalTokens`,`inputCost`,`outputCost`,`cacheReadCost`,`cacheWriteCost`,`totalCost`])];for(let n of e)t.push(Wt([n.date,n.input,n.output,n.cacheRead,n.cacheWrite,n.totalTokens,n.inputCost??``,n.outputCost??``,n.cacheReadCost??``,n.cacheWriteCost??``,n.totalCost]));return t.join(`
`)},qt=(e,t,n)=>{let r=e.trim();if(!r)return[];let i=(r.length?r.split(/\s+/):[]).at(-1)??``,[a,o]=i.includes(`:`)?[i.slice(0,i.indexOf(`:`)),i.slice(i.indexOf(`:`)+1)]:[``,``],s=W(a),c=W(o),l=e=>re(e.filter(e=>!!e)),u=l(t.map(e=>e.agentId)).slice(0,6),d=l(t.map(e=>e.channel)).slice(0,6),f=l([...t.map(e=>e.modelProvider),...t.map(e=>e.providerOverride),...n?.byProvider.map(e=>e.provider)??[]]).slice(0,6),p=l([...t.map(e=>e.model),...n?.byModel.map(e=>e.model)??[]]).slice(0,6),m=l(n?.tools.tools.map(e=>e.name)??[]).slice(0,6);if(!s)return[{label:`agent:`,value:`agent:`},{label:`channel:`,value:`channel:`},{label:`provider:`,value:`provider:`},{label:`model:`,value:`model:`},{label:`tool:`,value:`tool:`},{label:`has:errors`,value:`has:errors`},{label:`has:tools`,value:`has:tools`},{label:`minTokens:`,value:`minTokens:`},{label:`maxCost:`,value:`maxCost:`}];let h=[],g=(e,t)=>{for(let n of t)(!c||W(n).includes(c))&&h.push({label:`${e}:${n}`,value:`${e}:${n}`})};switch(s){case`agent`:g(`agent`,u);break;case`channel`:g(`channel`,d);break;case`provider`:g(`provider`,f);break;case`model`:g(`model`,p);break;case`tool`:g(`tool`,m);break;case`has`:[`errors`,`tools`,`context`,`usage`,`model`,`provider`].forEach(e=>{(!c||e.includes(c))&&h.push({label:`has:${e}`,value:`has:${e}`})});break;default:break}return h},Jt=(e,t)=>{let n=e.trim();if(!n)return`${t} `;let r=n.split(/\s+/);return r[r.length-1]=t,`${r.join(` `)} `},Y=e=>W(e),Yt=(e,t)=>{let n=e.trim();if(!n)return`${t} `;let r=n.split(/\s+/),i=r[r.length-1]??``,a=t.includes(`:`)?t.split(`:`)[0]:null,o=i.includes(`:`)?i.split(`:`)[0]:null;return i.endsWith(`:`)&&a&&o===a?(r[r.length-1]=t,`${r.join(` `)} `):r.includes(t)?`${r.join(` `)} `:`${r.join(` `)} ${t} `},Xt=(e,t)=>{let n=e.trim().split(/\s+/).filter(Boolean).filter(e=>e!==t);return n.length?`${n.join(` `)} `:``},Zt=(e,t,n)=>{let r=Y(t),i=[...ze(e).filter(e=>Y(e.key??``)!==r).map(e=>e.raw),...n.map(e=>`${t}:${e}`)];return i.length?`${i.join(` `)} `:``}}));function $t(e,t,n){return{key:e,className:e.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),labelKey:`usage.breakdown.${e}`,hintKey:t,short:n}}function en(e,t){return t===0?0:e/t*100}function X(e){let t=Math.abs(e);return J(e,t===0||t>=.01?2:t>=1e-4?4:6)}function tn(e,t,n){e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),n(t,e.shiftKey))}function nn(e,t,n,r=`chart-toggle small`){return k`
    <div class=${r}>
      ${n.map(({value:n,labelKey:r})=>k`
          <button
            class="btn btn--sm toggle-btn ${e===n?`active`:``}"
            @click=${()=>t(n)}
          >
            ${G(r)}
          </button>
        `)}
    </div>
  `}function rn(e,t,n,r,i,a,o,s){if(!(e.length>0||t.length>0||n.length>0))return T;let c=n.at(0)??``,l=n.length===1?r.find(e=>e.key===c):null,u=l?H(l.label||l.key,20)+((l.label||l.key).length>20?`…`:``):n.length===1?H(c,8)+`…`:G(`usage.filters.sessionsCount`,{count:String(n.length)}),d=l?l.label||l.key:n.length===1?c:n.join(`, `),f=e.length===1?e[0]:G(`usage.filters.daysCount`,{count:String(e.length)}),p=t.length===1?`${t[0]}:00`:G(`usage.filters.hoursCount`,{count:String(t.length)});return k`
    <div class="active-filters">
      ${[{active:e.length>0,labelKey:`usage.filters.days`,value:f,removeKey:`usage.filters.removeDays`,onClear:i},{active:t.length>0,labelKey:`usage.filters.hours`,value:p,removeKey:`usage.filters.removeHours`,onClear:a},{active:n.length>0,labelKey:`usage.filters.session`,value:u,removeKey:`usage.filters.removeSession`,onClear:o,title:d}].filter(({active:e})=>e).map(({labelKey:e,value:t,removeKey:n,onClear:r,title:i})=>k`
            <div class="filter-chip" title=${D(i)}>
              <span class="filter-chip-label">${G(e)}: ${t}</span>
              <openclaw-tooltip .content=${G(`usage.filters.remove`)}>
                <button class="filter-chip-remove" @click=${r} aria-label=${G(n)}>
                  ×
                </button>
              </openclaw-tooltip>
            </div>
          `)}
      ${(e.length>0||t.length>0)&&n.length>0?k`
            <button class="btn btn--sm" @click=${s}>
              ${G(`usage.filters.clearAll`)}
            </button>
          `:T}
    </div>
  `}function an(e,t,n){let r=Mt(e,t,n);if(!r||e.length===0)return T;let i=Nt(e,t,n),a=Et(new Date),o=(e,t)=>e===1?t===a?G(`usage.presets.today`):At(t):G(`usage.costWindows.lastDays`,{count:String(e)}),s=[{label:G(`usage.costWindows.selectedRange`),summary:r,range:!0},...i.map(e=>({label:o(e.days,e.endDate),summary:e,range:!1}))];return k`
    <section class="cost-window-analysis">
      <div class="cost-window-header">
        <div>
          <div class="card-title usage-section-title">${G(`usage.costWindows.title`)}</div>
          <div class="card-sub">
            ${G(`usage.costWindows.subtitle`,{date:jt(n)})}
          </div>
        </div>
        <div class="cost-window-range-label">
          ${At(t)} – ${At(n)}
        </div>
      </div>
      <div class="cost-window-grid">
        ${s.map(({label:e,summary:t,range:n})=>{let r=t.totals.totalCost/t.days;return k`
            <div class="cost-window-card ${n?`cost-window-card--range`:``}">
              <div class="cost-window-card__label">${e}</div>
              <div class="cost-window-card__value">
                ${X(t.totals.totalCost)}
              </div>
              <div class="cost-window-card__meta">
                ${q(t.totals.totalTokens)} ${G(`usage.metrics.tokens`)} ·
                ${X(r)} ${G(`usage.costWindows.perDay`)}
              </div>
            </div>
          `})}
      </div>
    </section>
  `}function on(e,t,n,r,i,a){if(!e.length)return k`
      <div class="daily-chart-compact">
        <div class="card-title usage-section-title">${G(`usage.daily.title`)}</div>
        <div class="usage-empty-block">${G(`usage.empty.noData`)}</div>
      </div>
    `;let o=n===`tokens`,s=e.map(e=>o?e.totalTokens:e.totalCost),c=Math.max(...s,0),l=c>0?c:o?1:1e-4,u=s.filter(e=>e>0),d=l/(u.length>0?Math.min(...u):l)>50,f=s.map(e=>{if(e<=0)return 0;let t=d?Math.sqrt(e/l):e/l;return Math.max(6,t*200)}),p=e.length>30?12:e.length>20?18:e.length>14?24:32,m=e.length<=14,h=new Set(t);return k`
    <div class="daily-chart-compact">
      <div class="daily-chart-header">
        ${nn(r,i,[{value:`total`,labelKey:`usage.daily.total`},{value:`by-type`,labelKey:`usage.daily.byType`}],`chart-toggle small sessions-toggle`)}
        <div class="card-title">
          ${G(o?`usage.daily.tokensTitle`:`usage.daily.costTitle`)}
          ${d?k`<span
                class="daily-chart-scale-badge"
                title=${G(`usage.daily.compressedScaleHint`)}
                aria-label=${G(`usage.daily.compressedScaleHint`)}
                >√</span
              >`:T}
        </div>
      </div>
      <div class="daily-chart">
        <div class="daily-chart-plot">
          <div class="daily-chart-scale" aria-hidden="true">
            ${(c>0?[c,c/(d?4:2),0]:[0]).map(e=>k`<span
                  >${o?q(e):e===0?J(0):X(e)}</span
                >`)}
          </div>
          <div class="daily-chart-bars" style="--bar-max-width: ${p}px">
            ${e.map((t,n)=>{let i=U(f[n],`daily usage bar height`),s=h.has(t.date),c=At(t.date),l=e.length>20?String(Number.parseInt(t.date.slice(8),10)):c,u=e.length>20?`daily-bar-label daily-bar-label--compact`:`daily-bar-label`,d=r===`by-type`?Q.map(({key:e,className:n,labelKey:r})=>({value:o?t[e]:t[`${e}Cost`]??0,className:n,labelKey:r})):[],p=d.map(({value:e,labelKey:t})=>`${G(t)} ${o?q(e):X(e)}`),g=o?q(t.totalTokens):X(t.totalCost),_=jt(t.date),v=`${q(t.totalTokens)} ${W(G(`usage.metrics.tokens`))}`.trim(),y=X(t.totalCost),b=d.reduce((e,t)=>e+t.value,0)||1;return k`
                <openclaw-tooltip
                  .content=${[_,v,y,...p].join(`
`)}
                >
                  <div
                    class="daily-bar-wrapper ${s?`selected`:``}"
                    role="button"
                    tabindex="0"
                    aria-pressed=${s?`true`:`false`}
                    aria-label=${`${_}: ${v}, ${y}`}
                    @keydown=${e=>tn(e,t.date,a)}
                    @click=${e=>a(t.date,e.shiftKey)}
                  >
                    ${r===`by-type`?k`
                          <div
                            class="daily-bar daily-bar--stacked"
                            style="height: ${i.toFixed(0)}px;"
                          >
                            ${d.map(({className:e,value:t})=>k`
                                <div
                                  class="cost-segment ${e}"
                                  style="height: ${t/b*100}%"
                                ></div>
                              `)}
                          </div>
                        `:k`
                          <div class="daily-bar" style="height: ${i.toFixed(0)}px"></div>
                        `}
                    ${m?k`<div class="daily-bar-total">${g}</div>`:k`<div
                          class="daily-bar-total daily-bar-total--placeholder"
                          aria-hidden="true"
                        ></div>`}
                    <div class="${u}">${l}</div>
                  </div>
                </openclaw-tooltip>
              `})}
          </div>
        </div>
      </div>
    </div>
  `}function sn(e,t){let n=t===`tokens`,r=n?e.totalTokens||1:e.totalCost||0,i=Q.map(({key:t,className:i,labelKey:a})=>{let o=n?e[t]:e[`${t}Cost`]||0;return{className:i,labelKey:a,percentage:en(o,r),formatted:n?q(o):X(o)}});return k`
    <div class="cost-breakdown cost-breakdown-compact">
      <div class="cost-breakdown-header">
        ${G(n?`usage.breakdown.tokensByType`:`usage.breakdown.costByType`)}
      </div>
      <div class="cost-breakdown-bar">
        ${i.map(({className:e,labelKey:t,percentage:n,formatted:r})=>k`
            <div
              class="cost-segment ${e}"
              style="width: ${n.toFixed(1)}%"
              title="${G(t)}: ${r}"
            ></div>
          `)}
      </div>
      <div class="cost-breakdown-legend">
        ${i.map(({className:e,labelKey:t,formatted:n})=>k`
            <span class="legend-item"
              ><span class="legend-dot ${e}"></span>${G(t)} ${n}</span
            >
          `)}
      </div>
      <div class="cost-breakdown-total">
        ${G(`usage.breakdown.total`)}:
        ${n?q(e.totalTokens):X(e.totalCost)}
      </div>
    </div>
  `}function cn(e,t,n,r){let i=[`usage-insight-card`,r?.className].filter(Boolean).join(` `),a=[r?.error?`usage-error-list`:`usage-list`,r?.listClassName].filter(Boolean).join(` `);return k`
    <div class=${i}>
      <div class="usage-insight-title">${e}</div>
      ${t.length===0?k`<div class="muted">${n}</div>`:k`
            <div class=${a}>
              ${t.map(e=>r?.error?k`
                      <div class="usage-error-row">
                        <div class="usage-error-date">${e.label}</div>
                        <div class="usage-error-rate">${e.value}</div>
                        ${e.sub?k`<div class="usage-error-sub">${e.sub}</div>`:T}
                      </div>
                    `:k`
                      <div class="usage-list-item">
                        <span>${e.label}</span>
                        <span class="usage-list-value">
                          <span>${e.value}</span>
                          ${e.sub?k`<span class="usage-list-sub">${e.sub}</span>`:T}
                        </span>
                      </div>
                    `)}
            </div>
          `}
    </div>
  `}function ln(e){let t=e.currentTarget;t instanceof HTMLElement&&t.focus()}function Z(e){let t=`usage-summary-hint-${e.hintId}`,n=[`stat`,`usage-summary-card`,e.className,e.tone?`usage-summary-card--${e.tone}`:``].filter(Boolean).join(` `),r=[`stat-value`,`usage-summary-value`,e.tone??``,e.compactValue?`usage-summary-value--compact`:``].filter(Boolean).join(` `);return k`
    <div class=${n}>
      <div class="usage-summary-title">
        ${e.title}
        <openclaw-tooltip open-on-click>
          <button
            id=${t}
            type="button"
            class="usage-summary-hint"
            aria-label=${e.title}
            @click=${ln}
          >
            ?
          </button>
          <!-- Shared tooltips dismiss pointer activation so action buttons never
               strand one open. This hint exists only to be read, so it opts in to
               click-to-open; the click handler still normalizes browsers that do
               not focus buttons on pointer activation. -->
          <span slot="content">${e.hint}</span>
        </openclaw-tooltip>
      </div>
      <div class=${r}>${e.value}</div>
      <div class="usage-summary-sub">${e.sub}</div>
    </div>
  `}function un(e,t,n,r,i,a,s,c){if(!e)return T;let l=t.messages.total?Math.round(e.totalTokens/t.messages.total):0,u=t.messages.total?e.totalCost/t.messages.total:0,d=e.input+e.cacheRead+e.cacheWrite,f=d>0?e.cacheRead/d:0,p=d>0?`${(f*100).toFixed(1)}%`:G(`usage.common.emptyValue`),m=n.errorRate*100,h=n.throughputTokensPerMin===void 0?G(`usage.common.emptyValue`):`${q(Math.round(n.throughputTokensPerMin))} ${G(`usage.overview.tokensPerMinute`)}`,g=n.throughputCostPerMin===void 0?G(`usage.common.emptyValue`):`${X(n.throughputCostPerMin)} ${G(`usage.overview.perMinute`)}`,_=n.durationCount>0?o(n.avgDurationMs,{spaced:!0})??G(`usage.common.emptyValue`):G(`usage.common.emptyValue`),v=t.daily.filter(e=>e.messages>0&&e.errors>0).map(e=>{let t=e.errors/e.messages;return{label:At(e.date),value:`${(t*100).toFixed(2)}%`,sub:`${e.errors} ${W(G(`usage.overview.errors`))} · ${e.messages} ${G(`usage.overview.messagesAbbrev`)} · ${q(e.tokens)}`,rate:t}}).toSorted((e,t)=>t.rate-e.rate).slice(0,5).map(({rate:e,...t})=>t),y=t=>i&&e.totalCost>0?G(`usage.overview.costShare`,{percent:(t/e.totalCost*100).toFixed(1)}):null,b=(e,t,n)=>[y(e),q(t),n===void 0?null:`${n} ${G(`usage.overview.messagesAbbrev`)}`].filter(e=>e!==null).join(` · `),x=t.byModel.slice(0,5).map(e=>({label:e.model??G(`usage.common.unknown`),value:X(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens,e.count)})),S=t.byProvider.slice(0,5).map(e=>({label:e.provider??G(`usage.common.unknown`),value:X(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens,e.count)})),C=t.tools.tools.slice(0,6).map(e=>({label:e.name,value:`${e.count}`,sub:G(`usage.overview.calls`)})),w=t.byAgent.slice(0,5).map(e=>({label:e.agentId,value:X(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens)})),E=t.byChannel.slice(0,5).map(e=>({label:e.channel,value:X(e.totals.totalCost),sub:b(e.totals.totalCost,e.totals.totalTokens)})),D=[[`usage.overview.topModels`,x,`usage.overview.noModelData`],[`usage.overview.topProviders`,S,`usage.overview.noProviderData`],[`usage.overview.topTools`,C,`usage.overview.noToolCalls`],[`usage.overview.topAgents`,w,`usage.overview.noAgentData`],[`usage.overview.topChannels`,E,`usage.overview.noChannelData`]];return be({title:G(`usage.overview.title`)},k`
      <section class="usage-panel usage-overview-card">
        <div class="usage-overview-layout">
          <div class="usage-summary-grid">
            ${Z({hintId:`messages`,title:G(`usage.overview.messages`),hint:G(`usage.overview.messagesHint`),value:t.messages.total,sub:`${t.messages.user} ${W(G(`usage.overview.user`))} · ${t.messages.assistant} ${W(G(`usage.overview.assistant`))}`,className:`usage-summary-card--hero`})}
            ${Z({hintId:`throughput`,title:G(`usage.overview.throughput`),hint:G(`usage.overview.throughputHint`),value:h,sub:g,className:`usage-summary-card--hero usage-summary-card--throughput`,compactValue:!0})}
            ${Z({hintId:`tool-calls`,title:G(`usage.overview.toolCalls`),hint:G(`usage.overview.toolCallsHint`),value:t.tools.totalCalls,sub:`${t.tools.uniqueTools} ${G(`usage.overview.toolsUsed`)}`,className:`usage-summary-card--half`})}
            ${Z({hintId:`average-tokens`,title:G(`usage.overview.avgTokens`),hint:G(`usage.overview.avgTokensHint`),value:q(l),sub:G(`usage.overview.acrossMessages`,{count:String(t.messages.total||0)}),className:`usage-summary-card--half`})}
            ${Z({hintId:`cache-hit-rate`,title:G(`usage.overview.cacheHitRate`),hint:G(`usage.overview.cacheHint`),value:p,sub:`${q(e.cacheRead)} ${G(`usage.overview.cached`)} · ${q(d)} ${G(`usage.overview.prompt`)}`,tone:f>.6?`good`:f>.3?`warn`:`bad`,className:`usage-summary-card--medium`})}
            ${Z({hintId:`error-rate`,title:G(`usage.overview.errorRate`),hint:G(`usage.overview.errorHint`),value:`${m.toFixed(2)}%`,sub:`${t.messages.errors} ${W(G(`usage.overview.errors`))} · ${_} ${G(`usage.overview.avgSession`)}`,tone:m>5?`bad`:m>1?`warn`:`good`,className:`usage-summary-card--medium`})}
            ${Z({hintId:`average-cost`,title:G(`usage.overview.avgCost`),hint:G(r?`usage.overview.avgCostHintMissing`:`usage.overview.avgCostHint`),value:X(u),sub:`${X(e.totalCost)} ${W(G(`usage.breakdown.total`))}`,className:`usage-summary-card--compact`})}
            ${Z({hintId:`sessions`,title:G(`usage.overview.sessions`),hint:G(`usage.overview.sessionsHint`),value:s,sub:G(`usage.overview.sessionsInRange`,{count:String(c)}),className:`usage-summary-card--compact`})}
            ${Z({hintId:`errors`,title:G(`usage.overview.errors`),hint:G(`usage.overview.errorsHint`),value:t.messages.errors,sub:`${t.messages.toolResults} ${G(`usage.overview.toolResults`)}`,className:`usage-summary-card--compact`})}
          </div>
          <div class="usage-insights-grid">
            ${D.map(([e,t,n])=>cn(G(e),t,G(n)))}
            ${cn(G(`usage.overview.peakErrorDays`),v,G(`usage.overview.noErrorData`),{error:!0})}
            ${cn(G(`usage.overview.peakErrorHours`),a,G(`usage.overview.noErrorData`),{error:!0,className:`usage-insight-card--wide`,listClassName:`usage-error-list--hours`})}
          </div>
        </div>
      </section>
    `)}function dn(e,t,n,r,i,a,s,c,l,u,d,f,p,m,h){let g=e=>p.includes(e),_=e=>{let t=e.label||e.key;return t.startsWith(`agent:`)&&t.includes(`?token=`)?t.slice(0,t.indexOf(`?token=`)):t},v=e=>[g(`channel`)&&e.channel&&`channel:${e.channel}`,g(`agent`)&&e.agentId&&`agent:${e.agentId}`,g(`provider`)&&(e.modelProvider||e.providerOverride)&&`provider:${e.modelProvider??e.providerOverride}`,g(`model`)&&e.model&&`model:${e.model}`,g(`messages`)&&e.usage?.messageCounts&&`msgs:${e.usage.messageCounts.total}`,g(`tools`)&&e.usage?.toolUsage&&`tools:${e.usage.toolUsage.totalCalls}`,g(`errors`)&&e.usage?.messageCounts&&`errors:${e.usage.messageCounts.errors}`,g(`duration`)&&e.usage?.durationMs&&`dur:${o(e.usage.durationMs,{spaced:!0})??`—`}`].filter(e=>typeof e==`string`&&e.length>0),y=new Set(n),b=(e,t)=>{let n=e.usage;return n?y.size>0&&n.dailyBreakdown&&n.dailyBreakdown.length>0?n.dailyBreakdown.reduce((e,n)=>y.has(n.date)?e+(t===`tokens`?n.tokens:n.cost):e,0):t===`tokens`?n.totalTokens??0:n.totalCost??0:0},x=e=>b(e,r?`tokens`:`cost`),S=e=>{switch(i){case`recent`:return e.updatedAt??0;case`messages`:return e.usage?.messageCounts?.total??0;case`errors`:return e.usage?.messageCounts?.errors??0;case`cost`:return b(e,`cost`);case`tokens`:return b(e,`tokens`)}return i},C=[...e].toSorted((e,t)=>{let n=S(t)-S(e);if(n!==0)return n;let r=(t.updatedAt??0)-(e.updatedAt??0);return r===0?_(e).localeCompare(_(t)):r}),w=a===`asc`?C.toReversed():C,E=w.reduce((e,t)=>e+x(t),0),D=w.length?E/w.length:0,O=w.reduce((e,t)=>e+(t.usage?.messageCounts?.errors??0),0),A=(e,t)=>{let n=x(e),i=_(e),a=v(e);return k`
      <div
        class="session-bar-row ${t?`selected`:``}"
        @click=${t=>{t.target?.closest(`button`)||l(e.key,t.shiftKey)}}
        title="${e.key}"
      >
        <button
          type="button"
          class="session-bar-selection"
          aria-label=${i}
          aria-pressed=${t?`true`:`false`}
          @click=${t=>l(e.key,t.shiftKey)}
        >
          <span class="session-bar-label">
            <span class="session-bar-title">${i}</span>
            ${a.length>0?k`<span class="session-bar-meta">${a.join(` · `)}</span>`:T}
          </span>
        </button>
        <div class="session-bar-actions">
          <button
            type="button"
            class="btn btn--sm btn--ghost"
            @click=${t=>{t.stopPropagation(),le(_(e))}}
          >
            ${G(`usage.sessions.copy`)}
          </button>
          <div class="session-bar-value">
            ${r?q(n):X(n)}
          </div>
        </div>
      </div>
    `},j=new Set(t),M=w.filter(e=>j.has(e.key)),N=M.length,P=new Map(w.map(e=>[e.key,e])),F=s.map(e=>P.get(e)).filter(e=>!!e);return be({title:G(`usage.sessions.title`)},k`
      <div class="usage-panel sessions-card">
        <div class="sessions-card-header">
          <div class="sessions-card-count">
            ${G(`usage.sessions.shown`,{count:String(e.length)})}
            ${m===e.length?``:` · ${G(`usage.sessions.total`,{count:String(m)})}`}
          </div>
        </div>
        <div class="sessions-card-meta">
          <div class="sessions-card-stats">
            <span>
              ${r?q(D):X(D)}
              ${G(`usage.sessions.avg`)}
            </span>
            <span
              >${O} ${W(G(`usage.overview.errors`))}</span
            >
          </div>
          ${nn(c,f,[{value:`all`,labelKey:`usage.sessions.all`},{value:`recent`,labelKey:`usage.sessions.recent`}])}
          <label class="sessions-sort">
            <span>${G(`usage.sessions.sort`)}</span>
            <select
              class="settings-select"
              @change=${e=>u(e.target.value)}
            >
              ${Object.entries({cost:`usage.metrics.cost`,errors:`usage.overview.errors`,messages:`usage.overview.messages`,recent:`usage.sessions.recentShort`,tokens:`usage.metrics.tokens`}).map(([e,t])=>k`<option value=${e} ?selected=${i===e}>
                    ${G(t)}
                  </option>`)}
            </select>
          </label>
          <openclaw-tooltip
            .content=${G(a===`desc`?`usage.sessions.descending`:`usage.sessions.ascending`)}
          >
            <button
              class="btn btn--sm"
              aria-label=${G(a===`desc`?`usage.sessions.descending`:`usage.sessions.ascending`)}
              @click=${()=>d(a===`desc`?`asc`:`desc`)}
            >
              ${a===`desc`?`↓`:`↑`}
            </button>
          </openclaw-tooltip>
          ${N>0?k`
                <button class="btn btn--sm" @click=${h}>
                  ${G(`usage.sessions.clearSelection`)}
                </button>
              `:T}
        </div>
        ${c===`recent`?F.length===0?k` <div class="usage-empty-block">${G(`usage.sessions.noRecent`)}</div> `:k`
                <div class="session-bars session-bars--recent">
                  ${F.map(e=>A(e,j.has(e.key)))}
                </div>
              `:e.length===0?k` <div class="usage-empty-block">${G(`usage.sessions.noneInRange`)}</div> `:k`
                <div class="session-bars">
                  ${w.slice(0,50).map(e=>A(e,j.has(e.key)))}
                  ${e.length>50?k`
                        <div class="usage-more-sessions">
                          ${G(`usage.sessions.more`,{count:String(e.length-50)})}
                        </div>
                      `:T}
                </div>
              `}
        ${N>1?k`
              <div class="sessions-selected-group">
                <div class="sessions-card-count">
                  ${G(`usage.sessions.selected`,{count:String(N)})}
                </div>
                <div class="session-bars session-bars--selected">
                  ${M.map(e=>A(e,!0))}
                </div>
              </div>
            `:T}
      </div>
    `)}var Q,fn=e((()=>{V(),ae(),O(),w(),ye(),K(),ce(),oe(),S(),a(),Bt(),Q=[$t(`output`,`usage.details.assistantOutputTokens`,`Out`),$t(`input`,`usage.details.userToolInputTokens`,`In`),$t(`cacheWrite`,`usage.details.tokensWrittenToCache`,`CW`),$t(`cacheRead`,`usage.details.tokensReadFromCache`,`CR`)]}));function pn(e,t){return t>0?e/t*100:0}function mn(e){return e<0xe8d4a51000?e*1e3:e}function hn(e,t,n){let r=Number(e.slice(0,4)),i=Number(e.slice(5,7))-1,a=Number(e.slice(8,10))+n;return t===`utc`?Date.UTC(r,i,a):new Date(r,i,a).getTime()}function gn(e,t){let n=new Date(e),r=t===`utc`?n.getUTCFullYear():n.getFullYear(),i=(t===`utc`?n.getUTCMonth():n.getMonth())+1,a=t===`utc`?n.getUTCDate():n.getDate();return`${r}-${String(i).padStart(2,`0`)}-${String(a).padStart(2,`0`)}`}function _n(e,t,n){let r=Math.min(t,n),i=Math.max(t,n);return e.filter(e=>{if(e.timestamp<=0)return!0;let t=mn(e.timestamp);return t>=r&&t<=i})}function vn(e,t,n,r){return pe({status:e,errorMessage:e.error?G(`usage.details.loadFailed`,{detail:W(G(n)),error:e.error}):void 0,onRetry:t,className:`usage-callout usage-detail-error--${r}`})}function yn(e,t,n){let r=t||e.usage;if(!r)return k` <div class="usage-empty-block">${G(`usage.details.noUsageData`)}</div> `;let i=e=>e?m(e):G(`usage.common.emptyValue`),a=[e.channel&&`channel:${e.channel}`,e.agentId&&`agent:${e.agentId}`,(e.modelProvider||e.providerOverride)&&`provider:${e.modelProvider??e.providerOverride}`,e.model&&`model:${e.model}`].filter(Boolean),s=r.toolUsage?.tools.slice(0,6)??[],c;if(n){c=new Map;for(let e of n){let{tools:t}=Fe(e.content);for(let[e]of t)c.set(e,(c.get(e)||0)+1)}}let l=s.map(e=>({label:e.name,value:`${c?c.get(e.name)??0:e.count}`,sub:G(`usage.overview.calls`)})),u=c?[...c.values()].reduce((e,t)=>e+t,0):r.toolUsage?.totalCalls??0,d=c?c.size:r.toolUsage?.uniqueTools??0,f=r.modelUsage?.slice(0,6).map(e=>({label:e.model??G(`usage.common.unknown`),value:J(e.totals.totalCost),sub:q(e.totals.totalTokens)}))??[],p=[{labelKey:`usage.overview.messages`,value:r.messageCounts?.total??0,meta:k`${r.messageCounts?.user??0}
      ${W(G(`usage.overview.user`))} ·
      ${r.messageCounts?.assistant??0}
      ${W(G(`usage.overview.assistant`))}`},{labelKey:`usage.overview.toolCalls`,value:u,meta:k`${d} ${G(`usage.overview.toolsUsed`)}`},{labelKey:`usage.overview.errors`,value:r.messageCounts?.errors??0,meta:k`${r.messageCounts?.toolResults??0} ${G(`usage.overview.toolResults`)}`},{labelKey:`usage.details.duration`,value:o(r.durationMs,{spaced:!0})??G(`usage.common.emptyValue`),meta:k`${i(r.firstActivity)} → ${i(r.lastActivity)}`}];return k`
    ${a.length>0?k`<div class="usage-badges">
          ${a.map(e=>k`<span class="settings-row__value">${e}</span>`)}
        </div>`:T}
    <div class="session-summary-grid">
      ${p.map(({labelKey:e,value:t,meta:n})=>k`
          <div class="stat session-summary-card">
            <div class="session-summary-title">${G(e)}</div>
            <div class="stat-value session-summary-value">${t}</div>
            <div class="session-summary-meta">${n}</div>
          </div>
        `)}
    </div>
    <div class="usage-insights-grid usage-insights-grid--tight">
      ${cn(G(`usage.overview.topTools`),l,G(`usage.overview.noToolCalls`))}
      ${cn(G(`usage.details.modelMix`),f,G(`usage.overview.noModelData`))}
    </div>
  `}function bn(e,t,n,r){let i=Math.min(n,r),a=Math.max(n,r),o=t.filter(e=>e.timestamp>=i&&e.timestamp<=a);if(o.length===0)return;let s=0,c=0,l=0,u=0,d={output:0,input:0,cacheWrite:0,cacheRead:0};for(let e of o){s+=e.totalTokens||0,c+=e.cost||0;for(let{key:t}of Q)d[t]+=e[t]||0;u+=+(e.output>0),l+=+(e.input>0)}let f=U(o[0],`filtered usage first point`),p=U(o.at(-1),`filtered usage last point`);return{...e,...d,totalTokens:s,totalCost:c,durationMs:p.timestamp-f.timestamp,firstActivity:f.timestamp,lastActivity:p.timestamp,messageCounts:{total:o.length,user:l,assistant:u,toolCalls:0,toolResults:0,errors:0}}}function xn(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,E,D,O,A,j,M){let N=e.label||e.key,P=N.length>50?H(N,50)+`…`:N,F=e.usage,I=l!==null&&u!==null,L=l!==null&&u!==null&&t?.points&&F?bn(F,t.points,l,u):void 0,ee=L?{totalTokens:L.totalTokens,totalCost:L.totalCost}:{totalTokens:F?.totalTokens??0,totalCost:F?.totalCost??0},R=L?G(`usage.details.filtered`):``;return k`
    <div class="settings-group usage-panel session-detail-panel">
      <div class="session-detail-header">
        <div class="session-detail-header-left">
          <div class="session-detail-title">
            ${P}
            ${R?k`<span class="session-detail-indicator">${R}</span>`:T}
          </div>
        </div>
        <div class="session-detail-stats">
          ${F?k`
                <span
                  ><strong>${q(ee.totalTokens)}</strong>
                  ${W(G(`usage.metrics.tokens`))}${R}</span
                >
                <span
                  ><strong>${J(ee.totalCost)}</strong
                  >${R}</span
                >
              `:T}
        </div>
        <openclaw-tooltip .content=${G(`usage.details.close`)}>
          <button
            class="btn btn--sm btn--ghost"
            @click=${M}
            aria-label=${G(`usage.details.close`)}
          >
            ×
          </button>
        </openclaw-tooltip>
      </div>
      ${e.scope===`family`&&e.includedSessionIds?.length?k`
            <div class="usage-lineage-note">
              ${G(`usage.scope.familyIncluded`,{count:String(e.includedSessionIds.length)})}
            </div>
          `:T}
      <div class="session-detail-content">
        ${yn(e,L,l!=null&&u!=null&&g?_n(g,l,u):void 0)}
        <div class="session-detail-row">
          ${Sn(t,n,r,i,a,o,s,c,f,p,m,h,l,u,d)}
        </div>
        <div class="session-detail-bottom">
          ${wn(g,_,v,y,b,x,S,C,w,E,D,O,I?l:null,I?u:null)}
          ${Cn(e.contextWeight,F,A,j)}
        </div>
      </div>
    </div>
  `}function Sn(e,t,n,r,i,a,o,s,c,l,u,d=`local`,f,p,m){if(t&&!n.hasLoaded)return k`
      <div class="session-timeseries-compact">
        <div class="usage-empty-block">${G(`usage.loading.badge`)}</div>
      </div>
    `;let h=vn(n,r,`usage.details.usageOverTime`,`timeline`);if(n.error&&!n.hasLoaded)return k`
      <div class="session-timeseries-compact">
        <div class="card-title usage-section-title">${G(`usage.details.usageOverTime`)}</div>
        ${h}
      </div>
    `;if(!e||e.points.length<2)return k`
      <div class="session-timeseries-compact">
        ${h}
        <div class="usage-empty-block">${G(`usage.details.noTimeline`)}</div>
      </div>
    `;let _=e.points;if(c||l||u&&u.length>0){let t=c?hn(c,d,0):0,n=l?hn(l,d,1):1/0,r=u?.length?new Set(u):void 0;_=e.points.filter(e=>e.timestamp<t||e.timestamp>=n?!1:!r||r.has(gn(e.timestamp,d)))}if(_.length<2)return k`
      <div class="session-timeseries-compact">
        ${h}
        <div class="usage-empty-block">${G(`usage.details.noDataInRange`)}</div>
      </div>
    `;let v=0,y=0;_=_.map(e=>(v+=e.totalTokens,y+=e.cost,{...e,cumulativeTokens:v,cumulativeCost:y}));let b=f!=null&&p!=null,S=b?Math.min(f,p):0,C=b?Math.max(f,p):1/0,w=0,E=_.length;if(b){w=_.findIndex(e=>e.timestamp>=S),w===-1&&(w=_.length);let e=_.findIndex(e=>e.timestamp>C);E=e===-1?_.length:e}let D=b?_.slice(w,E):_,O={output:0,input:0,cacheRead:0,cacheWrite:0};for(let e of D)for(let{key:t}of Q)O[t]+=e[t];let j={top:8,right:4,bottom:14,left:30},M=400-j.left-j.right,N=100-j.top-j.bottom,P=i===`cumulative`,F=i===`per-turn`&&o===`by-type`,I=d===`utc`?{timeZone:`UTC`}:{},L=Object.values(O).reduce((e,t)=>e+t,0),ee=_.map(e=>P?e.cumulativeTokens:F?e.input+e.output+e.cacheRead+e.cacheWrite:e.totalTokens),R=Math.max(...ee,1),z=M/_.length,B=Math.min(En,Math.max(1,z*Tn)),te=z-B,V=j.left+w*(B+te),H=E>=_.length?j.left+(_.length-1)*(B+te)+B:j.left+(E-1)*(B+te)+B;return k`
    <div class="session-timeseries-compact">
      <div class="timeseries-header-row">
        <div class="card-title usage-section-title">${G(`usage.details.usageOverTime`)}</div>
        <div class="timeseries-controls">
          ${b?k`
                <div class="chart-toggle small">
                  <button
                    class="btn btn--sm toggle-btn active"
                    @click=${()=>m?.(null,null)}
                  >
                    ${G(`usage.details.reset`)}
                  </button>
                </div>
              `:T}
          ${nn(i,a,[{value:`per-turn`,labelKey:`usage.details.perTurn`},{value:`cumulative`,labelKey:`usage.details.cumulative`}])}
          ${P?T:nn(o,s,[{value:`total`,labelKey:`usage.daily.total`},{value:`by-type`,labelKey:`usage.daily.byType`}])}
        </div>
      </div>
      ${h}
      <div class="timeseries-chart-wrapper">
        <svg viewBox="0 0 ${400} ${118}" class="timeseries-svg">
          ${[{x1:j.left,y1:j.top,x2:j.left,y2:j.top+N},{x1:j.left,y1:j.top+N,x2:400-j.right,y2:j.top+N}].map(({x1:e,y1:t,x2:n,y2:r})=>A`<line x1="${e}" y1="${t}" x2="${n}" y2="${r}" stroke="var(--border)" />`)}
          ${[{y:j.top+5,text:q(R)},{y:j.top+N,text:`0`}].map(({y:e,text:t})=>A`<text x="${j.left-4}" y="${e}" text-anchor="end" class="ts-axis-label">${t}</text>`)}
          <!-- X axis labels (first and last) -->
          ${_.length>0?A`
            <text x="${j.left}" y="${j.top+N+10}" text-anchor="start" class="ts-axis-label">${g(U(_[0],`time series first point`).timestamp,{hour:`2-digit`,minute:`2-digit`,...I},``)}</text>
            <text x="${400-j.right}" y="${j.top+N+10}" text-anchor="end" class="ts-axis-label">${g(U(_.at(-1),`time series last point`).timestamp,{hour:`2-digit`,minute:`2-digit`,...I},``)}</text>
          `:T}
          <!-- Bars -->
          ${_.map((e,t)=>{let n=U(ee[t],`time series bar total`),r=j.left+t*(B+te),i=n/R*N,a=j.top+N-i,o=[x(e.timestamp,{month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,...I},``),`${q(n)} ${W(G(`usage.metrics.tokens`))}`];F&&o.push(...Q.map(({key:t,short:n})=>`${n} ${q(e[t])}`));let s=o.join(` · `),c=b&&(t<w||t>=E);if(!F)return A`<rect x="${r}" y="${a}" width="${B}" height="${i}" class="ts-bar${c?` dimmed`:``}" rx="1"><title>${s}</title></rect>`;let l=j.top+N,u=c?` dimmed`:``;return A`
              ${Q.map(({key:t,className:a})=>{let o=e[t];if(o<=0||n<=0)return T;let c=o/n*i;return l-=c,A`<rect x="${r}" y="${l}" width="${B}" height="${c}" class="ts-bar ${a}${u}" rx="1"><title>${s}</title></rect>`})}
            `})}
          <!-- Selection highlight overlay (always visible between handles) -->
          ${A`
            <rect 
              x="${V}" 
              y="${j.top}" 
              width="${Math.max(1,H-V)}" 
              height="${N}" 
              fill="var(--accent)" 
              opacity="${Dn}" 
              pointer-events="none"
            />
          `}
          ${[V,H].map(e=>A`
              <line x1="${e}" y1="${j.top}" x2="${e}" y2="${j.top+N}" stroke="var(--accent)" stroke-width="0.8" opacity="0.7" />
              <rect x="${e-On/2}" y="${j.top+N/2-kn/2}" width="${On}" height="${kn}" rx="1.5" fill="var(--accent)" class="cursor-handle" />
              ${[-.7,An].map(t=>A`<line x1="${e+t}" y1="${j.top+N/2-kn/5}" x2="${e+t}" y2="${j.top+N/2+kn/5}" stroke="var(--bg)" stroke-width="0.4" pointer-events="none" />`)}
            `)}
        </svg>
        <!-- Handle drag zones (only on handles, not full chart) -->
        ${(()=>{let e=e=>t=>{if(!m)return;t.preventDefault(),t.stopPropagation();let n=t.currentTarget.closest(`.timeseries-chart-wrapper`)?.querySelector(`svg`);if(!n)return;let r=n.getBoundingClientRect(),i=r.width,a=j.left/400*i,o=(400-j.right)/400*i-a,s=e=>{let t=Math.max(0,Math.min(1,(e-r.left-a)/o));return Math.min(Math.floor(t*_.length),_.length-1)},c=e===`left`?V:H,l=r.left+c/400*i,u=t.clientX-l;document.body.style.cursor=`col-resize`;let d=t=>{let n=t.clientX-u,r=s(n),i=_[r];if(!i)return;let a=e===`left`,o=a?p??U(_.at(-1),`time series right cursor point`).timestamp:f??U(_[0],`time series left cursor point`).timestamp;m(a?Math.min(i.timestamp,o):o,a?o:Math.max(i.timestamp,o))},h=()=>{document.body.style.cursor=``,document.removeEventListener(`mousemove`,d),document.removeEventListener(`mouseup`,h)};document.addEventListener(`mousemove`,d),document.addEventListener(`mouseup`,h)};return k`
            ${[`left`,`right`].map(t=>k`<div
                class="chart-handle-zone chart-handle-${t}"
                style="left: ${((t===`left`?V:H)/400*100).toFixed(1)}%;"
                @mousedown=${e(t)}
              ></div>`)}
          `})()}
      </div>
      <div class="timeseries-summary">
        ${b?k`
              <span class="timeseries-summary__range">
                ${G(`usage.details.turnRange`,{start:String(w+1),end:String(E),total:String(_.length)})}
              </span>
              ·
              ${g(S,{hour:`2-digit`,minute:`2-digit`,...I},``)}–${g(C,{hour:`2-digit`,minute:`2-digit`,...I},``)}
              · ${q(L)} ·
              ${J(D.reduce((e,t)=>e+(t.cost||0),0))}
            `:k`${_.length} ${G(`usage.overview.messagesAbbrev`)} ·
            ${q(v)} · ${J(y)}`}
      </div>
      ${F?k`
            <div class="timeseries-breakdown">
              <div class="card-title usage-section-title">${G(`usage.breakdown.tokensByType`)}</div>
              <div class="cost-breakdown-bar cost-breakdown-bar--compact">
                ${Q.map(({key:e,className:t})=>k`
                    <div
                      class="cost-segment ${t}"
                      style="width: ${pn(O[e],L).toFixed(1)}%"
                    ></div>
                  `)}
              </div>
              <div class="cost-breakdown-legend">
                ${Q.map(({key:e,className:t,labelKey:n,hintKey:r})=>k`
                    <div class="legend-item" title=${G(r)}>
                      <span class="legend-dot ${t}"></span>${G(n)}
                      ${q(O[e])}
                    </div>
                  `)}
              </div>
              <div class="cost-breakdown-total">
                ${G(`usage.breakdown.total`)}: ${q(L)}
              </div>
            </div>
          `:T}
    </div>
  `}function Cn(e,t,n,r){if(!e)return k`
      <div class="context-details-panel">
        <div class="usage-empty-block">${G(`usage.details.noContextData`)}</div>
      </div>
    `;let i=[{className:`skills`,labelKey:`usage.details.skills`,tokens:ft(e.skills.promptChars),entries:e.skills.entries.map(({name:e,blockChars:t})=>({name:e,chars:t}))},{className:`tools`,labelKey:`usage.details.tools`,tokens:ft(e.tools.listChars+e.tools.schemaChars),entries:e.tools.entries.map(({name:e,summaryChars:t,schemaChars:n})=>({name:e,chars:t+n}))},{className:`files`,labelKey:`usage.details.files`,tokens:ft(e.injectedWorkspaceFiles.reduce((e,t)=>e+t.injectedChars,0)),entries:e.injectedWorkspaceFiles.map(({name:e,injectedChars:t})=>({name:e,chars:t}))}].map(({className:e,labelKey:t,tokens:n,entries:r})=>({className:e,labelKey:t,tokens:n,entries:r.toSorted((e,t)=>t.chars-e.chars)})),a=[{className:`system`,labelKey:`usage.details.system`,tokens:ft(e.systemPrompt.chars)},...i],o=a.reduce((e,{tokens:t})=>e+t,0),s=t&&t.totalTokens>0?t.input+t.cacheRead:0,c=s>0?`~${Math.min(o/s*100,100).toFixed(0)}% ${G(`usage.details.ofInput`)}`:G(`usage.details.baseContextPerMessage`),l=i.some(({entries:e})=>e.length>4);return k`
    <div class="context-details-panel">
      <div class="context-breakdown-header">
        <div class="card-title usage-section-title">
          ${G(`usage.details.systemPromptBreakdown`)}
        </div>
        ${l?k`<button class="btn btn--sm" @click=${r}>
              ${G(n?`usage.details.collapse`:`usage.details.expandAll`)}
            </button>`:T}
      </div>
      <p class="context-weight-desc">${c}</p>
      <div class="context-stacked-bar">
        ${a.map(({className:e,labelKey:t,tokens:n})=>k`
            <div
              class="context-segment ${e}"
              style="width: ${pn(n,o).toFixed(1)}%"
              title="${G(t)}: ~${q(n)}"
            ></div>
          `)}
      </div>
      <div class="context-legend">
        ${a.map(({className:e,labelKey:t,tokens:n})=>k`
            <span class="legend-item"
              ><span class="legend-dot ${e}"></span>${G(e===`system`?`usage.details.systemShort`:t)}
              ~${q(n)}</span
            >
          `)}
      </div>
      <div class="context-total">
        ${G(`usage.breakdown.total`)}: ~${q(o)}
      </div>
      <div class="context-breakdown-grid">
        ${i.filter(({entries:e})=>e.length>0).map(({labelKey:e,entries:t})=>{let r=n?t:t.slice(0,4),i=t.length-r.length;return k`
              <div class="context-breakdown-card">
                <div class="context-breakdown-title">${G(e)} (${t.length})</div>
                <div class="context-breakdown-list">
                  ${r.map(({name:e,chars:t})=>k`
                      <div class="context-breakdown-item">
                        <span class="mono" title=${e}>${e}</span>
                        <span class="muted">~${q(ft(t))}</span>
                      </div>
                    `)}
                </div>
                ${i>0?k`
                      <div class="context-breakdown-more">
                        ${G(`usage.sessions.more`,{count:String(i)})}
                      </div>
                    `:T}
              </div>
            `})}
      </div>
    </div>
  `}function wn(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(t&&!n.hasLoaded)return k`
      <div class="session-logs-compact">
        <div class="session-logs-header">${G(`usage.details.conversation`)}</div>
        <div class="usage-empty-block">${G(`usage.loading.badge`)}</div>
      </div>
    `;let h=vn(n,r,`usage.details.conversation`,`conversation`);if(n.error&&!n.hasLoaded)return k`
      <div class="session-logs-compact">
        <div class="session-logs-header">${G(`usage.details.conversation`)}</div>
        ${h}
      </div>
    `;if(!e||e.length===0)return k`
      <div class="session-logs-compact">
        <div class="session-logs-header">${G(`usage.details.conversation`)}</div>
        ${h}
        <div class="usage-empty-block">${G(`usage.details.noMessages`)}</div>
      </div>
    `;let g=W(o.query),_=e.map(e=>{let t=Fe(e.content);return{log:e,toolInfo:t,cleanContent:t.cleanContent||e.content}}),v=Array.from(new Set(_.flatMap(e=>e.toolInfo.tools.map(([e])=>e)))).toSorted((e,t)=>e.localeCompare(t)),y=f!=null&&p!=null,b=y?Math.min(f,p):0,x=y?Math.max(f,p):1/0,S=_.filter(e=>{if(y&&e.log.timestamp>0){let t=mn(e.log.timestamp);if(t<b||t>x)return!1}return(o.roles.length===0||o.roles.includes(e.log.role))&&(!o.hasTools||e.toolInfo.tools.length>0)&&(o.tools.length===0||e.toolInfo.tools.some(([e])=>o.tools.includes(e)))&&(!g||W(e.cleanContent).includes(g))}),C=o.roles.length>0||o.tools.length>0||o.hasTools||g||y?`${S.length} ${G(`usage.details.of`)} ${e.length}${y?` (${G(`usage.details.timelineFiltered`)})`:``}`:`${e.length}`,w=new Set(o.roles),E=new Set(o.tools);return k`
    <div class="session-logs-compact">
      <div class="session-logs-header">
        <span>
          ${G(`usage.details.conversation`)}
          <span class="session-logs-header-count">
            (${C} ${W(G(`usage.overview.messages`))})
          </span>
        </span>
        <button class="btn btn--sm" @click=${a}>
          ${G(i?`usage.details.collapseAll`:`usage.details.expandAll`)}
        </button>
      </div>
      ${h}
      <div class="usage-filters-inline session-log-filters">
        <select
          multiple
          size="4"
          aria-label=${G(`usage.details.filterByRole`)}
          @change=${e=>s(Array.from(e.target.selectedOptions).map(e=>e.value))}
        >
          ${[[`user`,`usage.overview.user`],[`assistant`,`usage.overview.assistant`],[`tool`,`usage.details.tool`],[`toolResult`,`usage.details.toolResult`]].map(([e,t])=>k`<option value=${e} ?selected=${w.has(e)}>
                ${G(t)}
              </option>`)}
        </select>
        <select
          multiple
          size="4"
          aria-label=${G(`usage.details.filterByTool`)}
          @change=${e=>c(Array.from(e.target.selectedOptions).map(e=>e.value))}
        >
          ${v.map(e=>k`<option value=${e} ?selected=${E.has(e)}>${e}</option>`)}
        </select>
        <label class="usage-filters-inline session-log-has-tools">
          <input
            type="checkbox"
            .checked=${o.hasTools}
            @change=${e=>l(e.target.checked)}
          />
          ${G(`usage.details.hasTools`)}
        </label>
        <input
          type="text"
          placeholder=${G(`usage.details.searchConversation`)}
          aria-label=${G(`usage.details.searchConversation`)}
          .value=${o.query}
          @input=${e=>u(e.target.value)}
        />
        <button class="btn btn--sm" @click=${d}>${G(`usage.filters.clear`)}</button>
      </div>
      <div class="session-logs-list">
        ${S.map(e=>{let{log:t,toolInfo:n,cleanContent:r}=e;return k`
            <div class="session-log-entry ${t.role===`user`?`user`:`assistant`}">
              <div class="session-log-meta">
                <span class="session-log-role">${t.role===`user`?G(`usage.details.you`):t.role===`assistant`?G(`usage.overview.assistant`):G(`usage.details.tool`)}</span>
                <span>${m(t.timestamp)}</span>
                ${t.tokens?k`<span>${q(t.tokens)}</span>`:T}
              </div>
              <div class="session-log-content">${r}</div>
              ${n.tools.length>0?k`
                    <details class="session-log-tools" ?open=${i}>
                      <summary>${n.summary}</summary>
                      <div class="session-log-tools-list">
                        ${n.tools.map(([e,t])=>k`
                            <span class="session-log-tools-pill">${e} × ${t}</span>
                          `)}
                      </div>
                    </details>
                  `:T}
            </div>
          `})}
        ${S.length===0?k`
              <div class="usage-empty-block usage-empty-block--compact">
                ${G(`usage.details.noMessagesMatch`)}
              </div>
            `:T}
      </div>
    </div>
  `}var Tn,En,Dn,On,kn,An,jn=e((()=>{V(),ae(),O(),ue(),K(),S(),oe(),a(),Ze(),Bt(),fn(),Tn=.75,En=8,Dn=.06,On=5,kn=12,An=.7}));function Mn(e){return new Date(`${e}T12:00:00Z`).getTime()}function Nn(e){return new Date(e).toISOString().slice(0,10)}function Pn(e){let t=e.toSorted((e,t)=>e-t),n=e=>t[Math.min(t.length-1,Math.floor(t.length*e))]??0;return[n(.25),n(.5),n(.75)]}function Fn(e,t){return e<=0?0:e<t[0]?1:e<t[1]?2:e<t[2]?3:4}function In(e,t,n,r){let i=Mn(n),a=Math.max(Mn(t),i-(Rn-1)*Ln),o=new Map(e.map(e=>[e.date,e.totalTokens])),s=e.filter(e=>{let t=Mn(e.date);return e.totalTokens>0&&t>=a&&t<=i}).map(e=>e.totalTokens),c=s.length>0?Pn(s):[0,0,0],l=a-new Date(a).getUTCDay()*Ln,u=new Intl.DateTimeFormat(r,{month:`short`,timeZone:`UTC`}),d=[],f=[],p=-1;for(let e=l;e<=i;e+=7*Ln){let t=[];for(let n=0;n<7;n+=1){let r=e+n*Ln;if(r<a||r>i){t.push(null);continue}let s=Nn(r),l=o.get(s)??0;t.push({date:s,tokens:l,level:Fn(l,c)})}d.push({days:t});let r=Mn(t.find(e=>e!==null)?.date??n),s=new Date(r).getUTCMonth();f.push(s===p?``:u.format(new Date(r))),p=s}return{weeks:d,monthLabels:f}}var Ln,Rn,zn=e((()=>{Ln=1440*60*1e3,Rn=364}));function Bn(e){let t=Wn+e.weeks.length*Un,n=new Intl.NumberFormat(void 0,{maximumFractionDigits:0}),r=new Intl.DateTimeFormat(void 0,{weekday:`short`,timeZone:`UTC`});return k`
    <svg
      class="usage-heatmap__svg"
      viewBox="0 0 ${t} ${116}"
      style="--usage-heatmap-width: ${t}px"
      role="img"
      aria-label=${G(`usage.heatmap.title`)}
    >
      ${e.monthLabels.map((e,t)=>e?A`<text class="usage-heatmap__month" x=${Wn+t*Un} y="10">${e}</text>`:T)}
      ${Kn.map(({row:e,utcDay:t})=>A`<text class="usage-heatmap__weekday" x=${Wn-6} y=${Gn+e*Un+Hn-2}>${r.format(new Date(t))}</text>`)}
      ${e.weeks.map((e,t)=>e.days.map((e,r)=>{if(!e)return T;let i=`${jt(e.date)} · ${G(`usage.heatmap.cellTokens`,{tokens:n.format(e.tokens)})}`;return A`
            <rect
              class="usage-heatmap__cell usage-heatmap__cell--l${e.level}"
              x=${Wn+t*Un}
              y=${Gn+r*Un}
              width=${Hn}
              height=${Hn}
              rx="2.5"
            ><title>${i}</title></rect>
          `}))}
    </svg>
  `}function Vn(e,t,n){if(e.length===0)return T;let r=In(e,t,n),i=k`
    <div class="usage-heatmap__legend" aria-hidden="true">
      <span>${G(`usage.heatmap.less`)}</span>
      ${[0,1,2,3,4].map(e=>k`<span class="usage-heatmap__swatch usage-heatmap__cell--l${e}"></span>`)}
      <span>${G(`usage.heatmap.more`)}</span>
    </div>
  `;return be({title:G(`usage.heatmap.title`),description:G(`usage.heatmap.subtitle`),actions:i},k`<div class="usage-panel usage-heatmap">${Bn(r)}</div>`)}var Hn,Un,Wn,Gn,Kn,qn=e((()=>{O(),ye(),K(),zn(),Bt(),Hn=11,Un=14,Wn=30,Gn=18,Kn=[{row:1,utcDay:Date.UTC(2024,0,1)},{row:3,utcDay:Date.UTC(2024,0,3)},{row:5,utcDay:Date.UTC(2024,0,5)}]}));function Jn(){return{input:0,output:0,cacheRead:0,cacheWrite:0,totalTokens:0,totalCost:0,inputCost:0,outputCost:0,cacheReadCost:0,cacheWriteCost:0,missingCostEntries:0}}function Yn(e,t){return e.input+=t.input,e.output+=t.output,e.cacheRead+=t.cacheRead,e.cacheWrite+=t.cacheWrite,e.totalTokens+=t.totalTokens,e.totalCost+=t.totalCost,e.inputCost+=t.inputCost??0,e.outputCost+=t.outputCost??0,e.cacheReadCost+=t.cacheReadCost??0,e.cacheWriteCost+=t.cacheWriteCost??0,e.missingCostEntries+=t.missingCostEntries??0,e}function Xn(e,t){return k`
    <span class="settings-status settings-status--accent" title=${t??T}>
      <span class="usage-loading-spinner" aria-hidden="true"></span>
      ${e}
    </span>
  `}function Zn(e){return be({title:G(`usage.loading.title`),actions:Xn(G(`usage.loading.badge`))},k`
      <div class="usage-panel usage-loading-card">
        <div class="usage-loading-header">
          <div class="usage-loading-controls">
            <div class="usage-date-range usage-date-range--loading">
              <input class="usage-date-input" type="date" .value=${e.startDate} disabled />
              <span class="usage-separator">${G(`usage.filters.to`)}</span>
              <input class="usage-date-input" type="date" .value=${e.endDate} disabled />
            </div>
          </div>
        </div>
        <div class="usage-loading-grid">
          <div class="usage-skeleton-block usage-skeleton-block--tall"></div>
          <div class="usage-skeleton-block"></div>
          <div class="usage-skeleton-block"></div>
        </div>
      </div>
    `)}function Qn(e){return k`
    <section class="settings-group usage-panel usage-empty-state">
      <div class="usage-empty-state__title">${G(`usage.empty.title`)}</div>
      <div class="card-sub usage-empty-state__subtitle">${G(`usage.empty.subtitle`)}</div>
      <div class="usage-empty-state__features">
        <span class="usage-empty-state__feature">${G(`usage.empty.featureOverview`)}</span>
        <span class="usage-empty-state__feature">${G(`usage.empty.featureSessions`)}</span>
        <span class="usage-empty-state__feature">${G(`usage.empty.featureTimeline`)}</span>
      </div>
      <div class="usage-empty-state__actions">
        <button class="btn primary" @click=${e}>${G(`common.refresh`)}</button>
      </div>
    </section>
  `}function $n(e){return e.length===0?T:be({title:G(`usage.providerUsage.title`),count:e.length,description:G(`usage.providerUsage.subtitle`)},k`
      <div class="usage-panel provider-usage-section">
        <div class="provider-usage-grid">
          ${e.map(e=>k`
              <article class="provider-usage-card">
                <div class="provider-usage-card__header">
                  <div>
                    <div class="provider-usage-card__name">${e.displayName}</div>
                    <div class="provider-usage-card__id">${e.provider}</div>
                  </div>
                  ${e.plan?k`<span class="provider-usage-plan">${e.plan}</span>`:T}
                </div>
                ${Ee(e)}
              </article>
            `)}
        </div>
      </div>
    `)}function er(e){let{data:t,filters:n,display:r,detail:i,callbacks:a}=e,o=a.filters,s=a.display,c=a.details;if(t.loading&&!t.totals)return ve(k`<div class="usage-page">${Zn(n)}</div>`,{wide:!0});let l=r.chartMode===`tokens`,u=n.query.trim().length>0,d=n.queryDraft.trim().length>0,f=new Set(n.selectedDays),p=new Set(n.selectedSessions),m=[...t.sessions].toSorted((e,t)=>{let n=l?e.usage?.totalTokens??0:e.usage?.totalCost??0;return(l?t.usage?.totalTokens??0:t.usage?.totalCost??0)-n}),h=n.agentId?m.filter(e=>Y(e.agentId??``)===Y(n.agentId??``)):m,g=f.size>0?h.filter(e=>e.usage?.activityDates?.length?e.usage.activityDates.some(e=>f.has(e)):e.updatedAt?f.has(gn(e.updatedAt,n.timeZone)):!1):h,_=Xe(n.selectedHours.length>0?g.filter(e=>Ct(e,n.selectedHours,n.timeZone)):g,n.query),v=_.sessions,y=_.warnings,b=qt(n.queryDraft,h,t.aggregates),x=ze(n.query),S=e=>{let t=Y(e);return x.filter(e=>Y(e.key??``)===t).map(e=>e.value).filter(Boolean)},C=e=>{let t=new Set;for(let n of e)n&&t.add(n);return Array.from(t)},w=C(h.map(e=>e.channel)).slice(0,12),E=C([...h.map(e=>e.modelProvider),...h.map(e=>e.providerOverride),...t.aggregates?.byProvider.map(e=>e.provider)??[]]).slice(0,12),D=C([...h.map(e=>e.model),...t.aggregates?.byModel.map(e=>e.model)??[]]).slice(0,12),O=C(t.aggregates?.tools.tools.map(e=>e.name)??[]).slice(0,12),A=n.selectedSessions.length===1?t.sessions.find(e=>e.key===n.selectedSessions[0])??v.find(e=>e.key===n.selectedSessions[0]):null,j=e=>e.reduce((e,t)=>t.usage?Yn(e,t.usage):e,Jn()),M=e=>t.costDaily.filter(t=>e.has(t.date)).reduce((e,t)=>Yn(e,t),Jn()),N,P,F=h.length;if(n.selectedSessions.length>0){let e=v.filter(e=>p.has(e.key));N=j(e),P=e.length}else n.selectedDays.length>0&&n.selectedHours.length===0?(N=M(f),P=v.length):n.selectedHours.length>0||u?(N=j(v),P=v.length):n.agentId?(N=j(h),P=F):(N=t.totals,P=F);let I=n.selectedSessions.length>0?v.filter(e=>p.has(e.key)):u||n.selectedHours.length>0?v:n.selectedDays.length>0?g:h,L=n.selectedSessions.length>0||u||n.selectedHours.length>0||n.selectedDays.length>0||!!n.agentId,ee=L?Rt(I):Rt([],t.aggregates),R=t.sessionsLimitReached&&!L,z=R?j(I):N,B=R?Rt(I):ee,te=L?T:an(t.costDaily,n.startDate,n.endDate),V=n.selectedSessions.length>0?(()=>{let e=v.filter(e=>p.has(e.key)),n=new Set;for(let t of e)for(let e of t.usage?.activityDates??[])n.add(e);return n.size>0?t.costDaily.filter(e=>n.has(e.date)):t.costDaily})():t.costDaily,H=zt(I,z,B),ne=!t.loading&&!t.totals&&t.sessions.length===0,re=ke(t.cacheStatus),ie=(z?.missingCostEntries??0)>0||(z?z.totalTokens>0&&z.totalCost===0&&z.input+z.output+z.cacheRead+z.cacheWrite>0:!1),U=[{label:G(`usage.presets.today`),days:1},{label:G(`usage.presets.last7d`),days:7},{label:G(`usage.presets.last30d`),days:30},{label:G(`usage.presets.last90d`),days:90},{label:G(`usage.presets.last1y`),days:365}],W=e=>{let t=new Date,n=new Date;n.setDate(n.getDate()-(e-1)),o.onStartDateChange(Et(n)),o.onEndDateChange(Et(t))},ae=()=>{o.onStartDateChange(`1970-01-01`),o.onEndDateChange(Et(new Date))},K=(e,t,r)=>{if(r.length===0)return T;let i=S(e),a=new Set(i.map(e=>Y(e))),s=r.length>0&&r.every(e=>a.has(Y(e))),c=i.length;return k`
      <wa-dropdown
        class="usage-filter-select"
        placement="bottom-start"
        @wa-select=${t=>{t.preventDefault();let i=t.detail.item.value;if(i===`command:select-all`){o.onQueryDraftChange(Zt(n.queryDraft,e,r));return}if(i===`command:clear`){o.onQueryDraftChange(Zt(n.queryDraft,e,[]));return}if(i?.startsWith(`option:`)){let t=decodeURIComponent(i.slice(7)),r=`${e}:${t}`,s=a.has(Y(t));o.onQueryDraftChange(s?Xt(n.queryDraft,r):Yt(n.queryDraft,r))}}}
      >
        <button slot="trigger" type="button" class="usage-filter-trigger">
          <span>${t}</span>
          ${c>0?k`<span class="settings-count">${c}</span>`:k` <span class="settings-count">${G(`usage.filters.all`)}</span> `}
        </button>
        <wa-dropdown-item value="command:select-all" ?disabled=${s}>
          ${G(`usage.filters.selectAll`)}
        </wa-dropdown-item>
        <wa-dropdown-item value="command:clear" ?disabled=${c===0}>
          ${G(`usage.filters.clear`)}
        </wa-dropdown-item>
        <div class="session-menu__separator" role="separator"></div>
        ${r.map(e=>{let t=a.has(Y(e));return k`
            <wa-dropdown-item
              class="usage-filter-option"
              type="checkbox"
              value=${`option:${encodeURIComponent(e)}`}
              .checked=${t}
            >
              ${e}
            </wa-dropdown-item>
          `})}
      </wa-dropdown>
    `},oe=Et(new Date);return ve(k`
      <div class="usage-page">
        <section class="settings-section">
          <div class="settings-section__header">
            <h2 class="settings-section__heading">${G(`usage.filters.title`)}</h2>
            <div class="settings-section__actions">
              ${t.loading||re?Xn(G(`usage.loading.badge`),re??``):T}
              ${ne?k`<span class="usage-query-hint">${G(`usage.empty.hint`)}</span>`:T}
            </div>
          </div>
          <div
            class="settings-group usage-panel usage-header ${r.headerPinned?`pinned`:``}"
          >
            <div class="usage-header-row">
              <div class="usage-header-metrics">
                ${N?k`
                      <span class="usage-metric-badge">
                        <strong>${q(N.totalTokens)}</strong>
                        ${G(`usage.metrics.tokens`)}
                      </span>
                      <span class="usage-metric-badge">
                        <strong>${J(N.totalCost)}</strong>
                        ${G(`usage.metrics.cost`)}
                      </span>
                      <span class="usage-metric-badge">
                        <strong>${P}</strong>
                        ${G(P===1?`usage.metrics.session`:`usage.metrics.sessions`)}
                      </span>
                    `:T}
                <button
                  class="btn btn--sm usage-pin-btn ${r.headerPinned?`active`:``}"
                  @click=${o.onToggleHeaderPinned}
                >
                  ${r.headerPinned?G(`usage.filters.pinned`):G(`usage.filters.pin`)}
                </button>
                <wa-dropdown
                  class="usage-export-menu"
                  placement="bottom-end"
                  @wa-select=${e=>{switch(e.detail.item.value){case`sessions-csv`:Vt(`openclaw-usage-sessions-${oe}.csv`,Gt(v),`text/csv`);break;case`daily-csv`:Vt(`openclaw-usage-daily-${oe}.csv`,Kt(V),`text/csv`);break;case`json`:Vt(`openclaw-usage-${oe}.json`,JSON.stringify({totals:N,sessions:v,daily:V,aggregates:ee},null,2),`application/json`);break;case void 0:break}}}
                >
                  <button slot="trigger" type="button" class="btn btn--sm">
                    ${G(`usage.export.label`)} ▾
                  </button>
                  <wa-dropdown-item value="sessions-csv" ?disabled=${v.length===0}>
                    ${G(`usage.export.sessionsCsv`)}
                  </wa-dropdown-item>
                  <wa-dropdown-item value="daily-csv" ?disabled=${V.length===0}>
                    ${G(`usage.export.dailyCsv`)}
                  </wa-dropdown-item>
                  <wa-dropdown-item
                    value="json"
                    ?disabled=${v.length===0&&V.length===0}
                  >
                    ${G(`usage.export.json`)}
                  </wa-dropdown-item>
                </wa-dropdown>
              </div>
            </div>

            <div class="usage-header-row">
              <div class="usage-controls">
                ${rn(n.selectedDays,n.selectedHours,n.selectedSessions,t.sessions,o.onClearDays,o.onClearHours,o.onClearSessions,o.onClearFilters)}
                <div class="usage-presets">
                  ${U.map(e=>k`
                      <button class="btn btn--sm" @click=${()=>W(e.days)}>
                        ${e.label}
                      </button>
                    `)}
                  <button class="btn btn--sm" @click=${ae}>
                    ${G(`usage.presets.all`)}
                  </button>
                </div>
                <div class="usage-date-range">
                  <input
                    class="usage-date-input"
                    type="date"
                    .value=${n.startDate}
                    title=${G(`usage.filters.startDate`)}
                    aria-label=${G(`usage.filters.startDate`)}
                    @change=${e=>o.onStartDateChange(e.target.value)}
                  />
                  <span class="usage-separator">${G(`usage.filters.to`)}</span>
                  <input
                    class="usage-date-input"
                    type="date"
                    .value=${n.endDate}
                    title=${G(`usage.filters.endDate`)}
                    aria-label=${G(`usage.filters.endDate`)}
                    @change=${e=>o.onEndDateChange(e.target.value)}
                  />
                </div>
                <select
                  class="usage-select"
                  title=${G(`usage.filters.timeZone`)}
                  aria-label=${G(`usage.filters.timeZone`)}
                  .value=${n.timeZone}
                  @change=${e=>o.onTimeZoneChange(e.target.value)}
                >
                  <option value="local">${G(`usage.filters.timeZoneLocal`)}</option>
                  <option value="utc">${G(`usage.filters.timeZoneUtc`)}</option>
                </select>
                <div class="chart-toggle">
                  <button
                    class="btn btn--sm toggle-btn ${n.scope===`instance`?`active`:``}"
                    title=${G(`usage.scope.instanceHint`)}
                    @click=${()=>o.onScopeChange(`instance`)}
                  >
                    ${G(`usage.scope.instance`)}
                  </button>
                  <button
                    class="btn btn--sm toggle-btn ${n.scope===`family`?`active`:``}"
                    title=${G(`usage.scope.familyHint`)}
                    @click=${()=>o.onScopeChange(`family`)}
                  >
                    ${G(`usage.scope.family`)}
                  </button>
                </div>
                <div class="chart-toggle">
                  <button
                    class="btn btn--sm toggle-btn ${l?`active`:``}"
                    @click=${()=>s.onChartModeChange(`tokens`)}
                  >
                    ${G(`usage.metrics.tokens`)}
                  </button>
                  <button
                    class="btn btn--sm toggle-btn ${l?``:`active`}"
                    @click=${()=>s.onChartModeChange(`cost`)}
                  >
                    ${G(`usage.metrics.cost`)}
                  </button>
                </div>
                <button
                  class="btn btn--sm primary"
                  @click=${o.onRefresh}
                  ?disabled=${t.loading}
                >
                  ${G(`common.refresh`)}
                </button>
              </div>
            </div>

            <div class="usage-query-section">
              <div class="usage-query-bar">
                <input
                  class="usage-query-input"
                  type="text"
                  .value=${n.queryDraft}
                  placeholder=${G(`usage.query.placeholder`)}
                  @input=${e=>o.onQueryDraftChange(e.target.value)}
                  @keydown=${e=>{e.key===`Enter`&&(e.preventDefault(),o.onApplyQuery())}}
                />
                <div class="usage-query-actions">
                  <button
                    class="btn btn--sm"
                    @click=${o.onApplyQuery}
                    ?disabled=${t.loading||!d&&!u}
                  >
                    ${G(`usage.query.apply`)}
                  </button>
                  ${d||u?k`
                        <button class="btn btn--sm" @click=${o.onClearQuery}>
                          ${G(`usage.filters.clear`)}
                        </button>
                      `:T}
                  <span class="usage-query-hint">
                    ${u?G(`usage.query.matching`,{shown:String(v.length),total:String(F)}):G(`usage.query.inRange`,{total:String(F)})}
                  </span>
                </div>
              </div>
              <div class="usage-filter-row">
                ${K(`channel`,G(`usage.filters.channel`),w)}
                ${K(`provider`,G(`usage.filters.provider`),E)}
                ${K(`model`,G(`usage.filters.model`),D)}
                ${K(`tool`,G(`usage.filters.tool`),O)}
                <span class="usage-query-hint">${G(`usage.query.tip`)}</span>
              </div>
              ${x.length>0?k`
                    <div class="usage-query-chips">
                      ${x.map(e=>{let t=e.raw;return k`
                          <span class="usage-query-chip">
                            ${t}
                            <openclaw-tooltip .content=${G(`usage.filters.remove`)}>
                              <button
                                aria-label=${G(`usage.filters.remove`)}
                                @click=${()=>o.onQueryDraftChange(Xt(n.queryDraft,t))}
                              >
                                ×
                              </button>
                            </openclaw-tooltip>
                          </span>
                        `})}
                    </div>
                  `:T}
              ${b.length>0?k`
                    <div class="usage-query-suggestions">
                      ${b.map(e=>k`
                          <button
                            class="usage-query-suggestion"
                            @click=${()=>o.onQueryDraftChange(Jt(n.queryDraft,e.value))}
                          >
                            ${e.label}
                          </button>
                        `)}
                    </div>
                  `:T}
              ${y.length>0?k`
                    <div class="callout warning usage-callout usage-callout--tight">
                      ${y.join(` · `)}
                    </div>
                  `:T}
            </div>

            ${t.error?k`<div class="callout danger usage-callout">${t.error}</div>`:T}
            ${re?k`
                  <div class="callout warning usage-callout usage-cache-warning">
                    ${G(`usage.cacheStatus.warning`)} ${re}
                  </div>
                `:T}
            ${t.sessionsLimitReached?k`
                  <div class="callout warning usage-callout">
                    ${G(`usage.sessions.limitReached`)}
                  </div>
                `:T}
          </div>
        </section>

        ${$n(t.providerUsage)}
        ${ne?Qn(o.onRefresh):k`
              ${un(z,B,H,ie,n.selectedDays.length===0,ht(I,n.timeZone),P,F)}
              ${Vn(V,n.startDate,n.endDate)}
              ${Tt(I,n.timeZone,n.selectedHours,o.onSelectHour)}

              <div class="usage-grid">
                <div class="usage-grid-column">
                  <div class="settings-group usage-panel usage-left-card">
                    ${te}
                    ${on(V,n.selectedDays,r.chartMode,r.dailyChartMode,s.onDailyChartModeChange,o.onSelectDay)}
                    ${N?sn(N,r.chartMode):T}
                  </div>
                  ${dn(v,n.selectedSessions,n.selectedDays,l,r.sessionSort,r.sessionSortDir,r.recentSessions,r.sessionsTab,c.onSelectSession,s.onSessionSortChange,s.onSessionSortDirChange,s.onSessionsTabChange,r.visibleColumns,F,o.onClearSessions)}
                </div>
                ${A?k`<div class="usage-grid-column">
                      ${xn(A,i.timeSeries,i.timeSeriesLoading,i.timeSeriesStatus,c.onRetryTimeSeries,i.timeSeriesMode,c.onTimeSeriesModeChange,i.timeSeriesBreakdownMode,c.onTimeSeriesBreakdownChange,i.timeSeriesCursorStart,i.timeSeriesCursorEnd,c.onTimeSeriesCursorRangeChange,n.startDate,n.endDate,n.selectedDays,n.timeZone,i.sessionLogs,i.sessionLogsLoading,i.sessionLogsStatus,c.onRetrySessionLogs,i.sessionLogsExpanded,c.onToggleSessionLogsExpanded,i.logFilters,c.onLogFilterRolesChange,c.onLogFilterToolsChange,c.onLogFilterHasToolsChange,c.onLogFilterQueryChange,c.onLogFilterClear,r.contextExpanded,c.onToggleContextExpanded,o.onClearSessions)}
                    </div>`:T}
              </div>
            `}
      </div>
    `,{wide:!0})}var tr=e((()=>{O(),Te(),ye(),oe(),se(),K(),De(),Ae(),Ze(),Bt(),Qt(),jn(),qn(),fn()})),$;e((()=>{ee(),N(),E(),te(),ue(),u(),v(),b(),a(),xe(),s(),d(),Ae(),$e(),Ze(),tt(),at(),st(),tr(),t(),$=class extends f{constructor(...e){super(...e),this.usageResult=null,this.usageCostSummary=null,this.providerUsageSummary=null,this.usageError=null,this.usageStartDate=je(),this.usageEndDate=je(),this.usageLoadStartDate=this.usageStartDate,this.usageLoadEndDate=this.usageEndDate,this.usageScope=`family`,this.usageAgentId=null,this.usageSelectedSessions=[],this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageChartMode=`tokens`,this.usageDailyChartMode=`by-type`,this.usageTimeSeriesMode=`per-turn`,this.usageTimeSeriesBreakdownMode=`by-type`,this.usageTimeSeriesValue=null,this.usageTimeSeriesStatus=me(),this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null,this.usageSessionLogsValue=null,this.usageSessionLogsStatus=me(),this.usageSessionLogsExpanded=!1,this.usageQuery=``,this.usageQueryDraft=``,this.usageSessionSort=`recent`,this.usageSessionSortDir=`desc`,this.usageRecentSessions=[],this.usageTimeZone=`local`,this.usageContextExpanded=!1,this.usageHeaderPinned=!1,this.usageSessionsTab=`all`,this.usageVisibleColumns=[...ot],this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery=``,this.dateDebounceTimer=null,this.queryDebounceTimer=null,this.usageTaskActiveClient=null,this.routeDataInitialized=!1,this.routeDataEnabled=!0,this.refreshPolicy=new it({isLoading:()=>this.usageLoading,reload:()=>this.performUsageReload()}),this.gateway=new Se(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetForClientChange(),invalidateRequests:e=>{e.snapshot.phase!==`connected`&&(this.refreshPolicy.interrupt(),this.usageTaskActiveClient=null,this.usageTask.run(this.usageTaskArgs(null)),this.usageTimeSeriesTask.run([null,``]),this.usageSessionLogsTask.run([null,``]))},onSnapshot:e=>this.handleGatewaySnapshot(e),onPageActivation:()=>this.refreshPolicy.request(`focus`)}),this.observeAgentScope=c(e=>{this.routeDataInitialized&&this.usageAgentId!==e&&(this.usageAgentId=e,this.clearSelectionsAndDetails(),this.refreshPolicy.reload()),this.requestUpdate()}),this.usageTask=new L(this,{autoRun:!1,args:()=>this.usageTaskArgs(),task:async([e,t,n,r,i,a],{signal:o})=>{if(!e||this.routeDataEnabled)return I;this.refreshPolicy.beginLoad();let s=a||void 0,c=s?{agentId:s}:{agentScope:`all`},[l,u,d]=await Promise.all([_(e,{startDate:t,endDate:n,agentId:s,scope:r,timeZone:i}),e.request(`usage.cost`,{startDate:t,endDate:n,...c,...y(i)},{signal:o}),e.request(`usage.status`,void 0,{signal:o}).catch(()=>null)]);return{result:l,costSummary:u,providerUsageSummary:d}},onComplete:e=>{this.usageTaskActiveClient=null,this.usageResult=e.result,this.usageCostSummary=e.costSummary,this.providerUsageSummary=e.providerUsageSummary,this.usageError=null,this.refreshPolicy.markLoaded(),this.refreshPolicy.flushPending()},onError:e=>{this.usageTaskActiveClient=null,r(e)?(this.usageResult=null,this.usageCostSummary=null,this.usageError=l(`usage`)):this.usageError=Me(e),this.refreshPolicy.flushPending()}}),this.usageTimeSeriesTask=this.createUsageDetailTask(C,()=>this.usageTimeSeriesStatus,(e,t)=>{e!==void 0&&(this.usageTimeSeriesValue=e),this.usageTimeSeriesStatus=t}),this.usageSessionLogsTask=this.createUsageDetailTask(async(e,t)=>{let n=await h(e,t);return Array.isArray(n.logs)?n.logs:null},()=>this.usageSessionLogsStatus,(e,t)=>{e!==void 0&&(this.usageSessionLogsValue=e),this.usageSessionLogsStatus=t}),this.subscriptions=new i(this).effect(()=>this.context?.agentSelection,e=>this.observeAgentScope(e)).watch(()=>this.context?.agents,(e,t)=>e.subscribe(t))}usageTaskArgs(e=this.gateway.connected?this.gateway.client:null){return[e,this.usageLoadStartDate,this.usageLoadEndDate,this.usageScope,this.usageTimeZone,W(this.usageAgentId??``)||null]}createUsageDetailTask(e,t,n){return new L(this,{autoRun:!1,args:()=>[this.gateway.connected?this.gateway.client:null,this.usageSelectedSessions.length===1?this.usageSelectedSessions[0]??``:``],task:async([t,n])=>t&&n?{sessionKey:n,data:await e(t,n)}:I,onComplete:e=>n(e,fe()),onError:e=>{let r=Qe(t(),e);n(r.clearData?null:void 0,r.status)}})}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.ensureInitialData())}disconnectedCallback(){this.subscriptions.clear(),this.clearDateDebounce(),this.clearQueryDebounce(),this.usageTaskActiveClient=null,this.usageTask.run(this.usageTaskArgs(null)),this.usageTimeSeriesTask.run([null,``]),this.usageSessionLogsTask.run([null,``]),super.disconnectedCallback()}applyRouteData(){let e=this.routeData;if(!e||(this.routeDataInitialized=!0,!this.routeDataEnabled))return;if(!this.gateway.isRouteDataCurrent(e)){this.routeDataEnabled=!1;return}let t=this.context.agentSelection.state.scopeId;if(e.query.agentId!==t){this.usageAgentId=t,this.clearSelectionsAndDetails(),this.refreshPolicy.reload();return}this.usageStartDate=e.query.startDate,this.usageEndDate=e.query.endDate,this.usageLoadStartDate=e.query.startDate,this.usageLoadEndDate=e.query.endDate,this.usageScope=e.query.scope,this.usageTimeZone=e.query.timeZone,this.usageAgentId=e.query.agentId,this.usageResult=e.result,this.usageCostSummary=e.costSummary,this.providerUsageSummary=e.providerUsageSummary,this.refreshPolicy.setLastLoadedAtMs(e.loadedAtMs),this.usageError=e.error}ensureInitialData(){this.routeDataEnabled||!this.routeDataInitialized||!this.gateway.client||!this.gateway.connected||this.usageLoading||this.loadUsage()}resetForClientChange(){this.clearDateDebounce(),this.usageTaskActiveClient=null,this.usageTask.run(this.usageTaskArgs(null)),this.routeDataInitialized&&(this.routeDataEnabled=!1),this.usageResult=null,this.usageCostSummary=null,this.providerUsageSummary=null,this.refreshPolicy.resetPayload(),this.usageError=null,this.usageAgentId=this.context.agentSelection.state.scopeId,this.clearSelectionsAndDetails()}get usageLoading(){return!this.routeDataInitialized||this.usageTaskActiveClient!==null}get usageTimeSeries(){return this.usageTimeSeriesValue?.data??null}get usageSessionLogs(){return this.usageSessionLogsValue?.data??null}loadUsage(){let e=this.gateway.client;return!e||!this.gateway.connected?(this.refreshPolicy.markLoadDeferred(),Promise.resolve()):this.usageLoading?Promise.resolve():(this.routeDataEnabled=!1,this.usageLoadStartDate=this.usageStartDate,this.usageLoadEndDate=this.usageEndDate,this.usageError=null,this.usageTaskActiveClient=e,this.usageTask.run())}loadSessionTimeSeries(e){let t=this.gateway.client;return!t||!this.gateway.connected?Promise.resolve():(this.usageTimeSeriesValue?.sessionKey!==e&&(this.usageTimeSeriesValue=null,this.usageTimeSeriesStatus=me()),this.usageTimeSeriesStatus=he(this.usageTimeSeriesStatus),this.usageTimeSeriesTask.run([t,e]))}loadSessionLogs(e){let t=this.gateway.client;return!t||!this.gateway.connected?Promise.resolve():(this.usageSessionLogsValue?.sessionKey!==e&&(this.usageSessionLogsValue=null,this.usageSessionLogsStatus=me()),this.usageSessionLogsStatus=he(this.usageSessionLogsStatus),this.usageSessionLogsTask.run([t,e]))}clearSelections(){this.usageSelectedDays=[],this.usageSelectedHours=[],this.usageSelectedSessions=[]}clearDetails(){this.usageTimeSeriesValue=null,this.usageSessionLogsValue=null,this.usageTimeSeriesStatus=me(),this.usageSessionLogsStatus=me(),this.usageTimeSeriesTask.run([null,``]),this.usageSessionLogsTask.run([null,``]),this.usageTimeSeriesCursorStart=null,this.usageTimeSeriesCursorEnd=null}clearSelectionsAndDetails(){this.clearSelections(),this.clearDetails()}clearDateDebounce(){this.dateDebounceTimer!==null&&(window.clearTimeout(this.dateDebounceTimer),this.dateDebounceTimer=null)}scheduleUsageLoad(){this.clearDateDebounce(),this.routeDataEnabled=!1,this.dateDebounceTimer=window.setTimeout(()=>{this.dateDebounceTimer=null,this.loadUsage()},400)}performUsageReload(){this.clearDateDebounce(),this.loadUsage()}handleGatewaySnapshot(e){!this.gateway.connected||!this.gateway.client||(this.context.agents.ensureList(),this.routeDataInitialized&&(e.identityChanged||e.becameConnected)&&this.refreshPolicy.request(`reconnect`))}clearQueryDebounce(){this.queryDebounceTimer!==null&&(window.clearTimeout(this.queryDebounceTimer),this.queryDebounceTimer=null)}selectSession(e,t){if(this.clearDetails(),this.usageRecentSessions=[e,...this.usageRecentSessions.filter(t=>t!==e)].slice(0,8),this.usageSelectedSessions=Pe(this.usageSelectedSessions,e,this.usageResult?.sessions??[],this.usageChartMode===`tokens`,t),this.usageSelectedSessions.length===1){let e=this.usageSelectedSessions[0];e&&(this.loadSessionTimeSeries(e),this.loadSessionLogs(e))}}render(){let e={data:{loading:this.usageLoading,error:this.usageError,sessions:this.usageResult?.sessions??[],agents:this.context.agents.state.agentsList?.agents.map(e=>e.id).filter(Boolean)??[],sessionsLimitReached:(this.usageResult?.sessions.length??0)>=1e3,totals:this.usageResult?.totals??null,aggregates:this.usageResult?.aggregates??null,costDaily:this.usageCostSummary?.daily??[],cacheStatus:Oe(this.usageResult?.cacheStatus,this.usageCostSummary?.cacheStatus),providerUsage:this.providerUsageSummary?.providers??[]},filters:{startDate:this.usageStartDate,endDate:this.usageEndDate,scope:this.usageScope,selectedSessions:this.usageSelectedSessions,selectedDays:this.usageSelectedDays,selectedHours:this.usageSelectedHours,agentId:this.usageAgentId,query:this.usageQuery,queryDraft:this.usageQueryDraft,timeZone:this.usageTimeZone},display:{chartMode:this.usageChartMode,dailyChartMode:this.usageDailyChartMode,sessionSort:this.usageSessionSort,sessionSortDir:this.usageSessionSortDir,recentSessions:this.usageRecentSessions,sessionsTab:this.usageSessionsTab,visibleColumns:this.usageVisibleColumns,contextExpanded:this.usageContextExpanded,headerPinned:this.usageHeaderPinned},detail:{timeSeriesMode:this.usageTimeSeriesMode,timeSeriesBreakdownMode:this.usageTimeSeriesBreakdownMode,timeSeries:this.usageTimeSeries,timeSeriesLoading:this.usageTimeSeriesTask.status===P.PENDING,timeSeriesStatus:this.usageTimeSeriesStatus,timeSeriesCursorStart:this.usageTimeSeriesCursorStart,timeSeriesCursorEnd:this.usageTimeSeriesCursorEnd,sessionLogs:this.usageSessionLogs,sessionLogsLoading:this.usageSessionLogsTask.status===P.PENDING,sessionLogsStatus:this.usageSessionLogsStatus,sessionLogsExpanded:this.usageSessionLogsExpanded,logFilters:{roles:this.usageLogFilterRoles,tools:this.usageLogFilterTools,hasTools:this.usageLogFilterHasTools,query:this.usageLogFilterQuery}},callbacks:{filters:{onStartDateChange:e=>{this.usageStartDate=e,this.clearSelectionsAndDetails(),this.scheduleUsageLoad()},onEndDateChange:e=>{this.usageEndDate=e,this.clearSelectionsAndDetails(),this.scheduleUsageLoad()},onScopeChange:e=>{this.usageScope=e,this.clearSelectionsAndDetails(),this.refreshPolicy.reload()},onAgentChange:e=>{this.context.agentSelection.setScope(e)},onRefresh:()=>this.refreshPolicy.request(`manual`),onTimeZoneChange:e=>{this.usageTimeZone=e,this.clearSelectionsAndDetails(),this.refreshPolicy.reload()},onToggleHeaderPinned:()=>{this.usageHeaderPinned=!this.usageHeaderPinned},onSelectHour:(e,t)=>{this.usageSelectedHours=Ne(this.usageSelectedHours,e,Array.from({length:24},(e,t)=>t),t,!0)},onQueryDraftChange:e=>{this.usageQueryDraft=e,this.clearQueryDebounce(),this.queryDebounceTimer=window.setTimeout(()=>{this.usageQuery=this.usageQueryDraft,this.queryDebounceTimer=null},250)},onApplyQuery:()=>{this.clearQueryDebounce(),this.usageQuery=this.usageQueryDraft},onClearQuery:()=>{this.clearQueryDebounce(),this.usageQueryDraft=``,this.usageQuery=``},onSelectDay:(e,t)=>{this.usageSelectedDays=Ne(this.usageSelectedDays,e,(this.usageCostSummary?.daily??[]).map(e=>e.date),t,!1)},onClearDays:()=>{this.usageSelectedDays=[]},onClearHours:()=>{this.usageSelectedHours=[]},onClearSessions:()=>{this.usageSelectedSessions=[],this.clearDetails()},onClearFilters:()=>this.clearSelectionsAndDetails()},display:{onChartModeChange:e=>{this.usageChartMode=e},onDailyChartModeChange:e=>{this.usageDailyChartMode=e},onSessionSortChange:e=>{this.usageSessionSort=e},onSessionSortDirChange:e=>{this.usageSessionSortDir=e},onSessionsTabChange:e=>{this.usageSessionsTab=e},onToggleColumn:e=>{this.usageVisibleColumns=this.usageVisibleColumns.includes(e)?this.usageVisibleColumns.filter(t=>t!==e):[...this.usageVisibleColumns,e]}},details:{onToggleContextExpanded:()=>{this.usageContextExpanded=!this.usageContextExpanded},onToggleSessionLogsExpanded:()=>{this.usageSessionLogsExpanded=!this.usageSessionLogsExpanded},onLogFilterRolesChange:e=>{this.usageLogFilterRoles=e},onLogFilterToolsChange:e=>{this.usageLogFilterTools=e},onLogFilterHasToolsChange:e=>{this.usageLogFilterHasTools=e},onLogFilterQueryChange:e=>{this.usageLogFilterQuery=e},onLogFilterClear:()=>{this.usageLogFilterRoles=[],this.usageLogFilterTools=[],this.usageLogFilterHasTools=!1,this.usageLogFilterQuery=``},onSelectSession:(e,t)=>this.selectSession(e,t),onTimeSeriesModeChange:e=>{this.usageTimeSeriesMode=e},onTimeSeriesBreakdownChange:e=>{this.usageTimeSeriesBreakdownMode=e},onTimeSeriesCursorRangeChange:(e,t)=>{this.usageTimeSeriesCursorStart=e,this.usageTimeSeriesCursorEnd=t},onRetryTimeSeries:()=>{let e=this.usageSelectedSessions[0];e&&this.loadSessionTimeSeries(e)},onRetrySessionLogs:()=>{let e=this.usageSelectedSessions[0];e&&this.loadSessionLogs(e)}}}};return et(this.context,this.usageResult,er(e))}},n([F({context:z,subscribe:!0})],$.prototype,`context`,void 0),n([j({attribute:!1})],$.prototype,`routeData`,void 0),n([M()],$.prototype,`usageResult`,void 0),n([M()],$.prototype,`usageCostSummary`,void 0),n([M()],$.prototype,`providerUsageSummary`,void 0),n([M()],$.prototype,`usageError`,void 0),n([M()],$.prototype,`usageStartDate`,void 0),n([M()],$.prototype,`usageEndDate`,void 0),n([M()],$.prototype,`usageLoadStartDate`,void 0),n([M()],$.prototype,`usageLoadEndDate`,void 0),n([M()],$.prototype,`usageScope`,void 0),n([M()],$.prototype,`usageAgentId`,void 0),n([M()],$.prototype,`usageSelectedSessions`,void 0),n([M()],$.prototype,`usageSelectedDays`,void 0),n([M()],$.prototype,`usageSelectedHours`,void 0),n([M()],$.prototype,`usageChartMode`,void 0),n([M()],$.prototype,`usageDailyChartMode`,void 0),n([M()],$.prototype,`usageTimeSeriesMode`,void 0),n([M()],$.prototype,`usageTimeSeriesBreakdownMode`,void 0),n([M()],$.prototype,`usageTimeSeriesStatus`,void 0),n([M()],$.prototype,`usageTimeSeriesCursorStart`,void 0),n([M()],$.prototype,`usageTimeSeriesCursorEnd`,void 0),n([M()],$.prototype,`usageSessionLogsStatus`,void 0),n([M()],$.prototype,`usageSessionLogsExpanded`,void 0),n([M()],$.prototype,`usageQuery`,void 0),n([M()],$.prototype,`usageQueryDraft`,void 0),n([M()],$.prototype,`usageSessionSort`,void 0),n([M()],$.prototype,`usageSessionSortDir`,void 0),n([M()],$.prototype,`usageRecentSessions`,void 0),n([M()],$.prototype,`usageTimeZone`,void 0),n([M()],$.prototype,`usageContextExpanded`,void 0),n([M()],$.prototype,`usageHeaderPinned`,void 0),n([M()],$.prototype,`usageSessionsTab`,void 0),n([M()],$.prototype,`usageVisibleColumns`,void 0),n([M()],$.prototype,`usageLogFilterRoles`,void 0),n([M()],$.prototype,`usageLogFilterTools`,void 0),n([M()],$.prototype,`usageLogFilterHasTools`,void 0),n([M()],$.prototype,`usageLogFilterQuery`,void 0),customElements.get(`openclaw-usage-page`)||customElements.define(`openclaw-usage-page`,$)}))();
//# sourceMappingURL=usage-page-anmR2vbY.js.map