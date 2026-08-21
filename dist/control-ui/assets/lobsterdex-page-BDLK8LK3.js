import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Kc as r,Wc as i}from"./control-ui-core-UWR2ANgr.js";import{K as a,Q as o,W as s,Y as c,nt as l}from"./lit-runtime-D5xZwgO1.js";import{Wt as u,jt as d}from"./control-ui-core-DDTXn_ud.js";import{i as f,o as p,t as m}from"./control-ui-core-BCL4Sy8S.js";import{vt as h,yt as g}from"./control-ui-core-DS6N4FyQ.js";import{_,c as v,d as y,f as b,g as x,h as S,o as C,r as w,s as T,t as E,u as D}from"./lobster-pet-B7v3fQvL.js";import{n as O,t as k}from"./settings-workspace-BbyrBOFl.js";function A(e){return new Date(e).toLocaleDateString(f.getLocale())}function j(e,t={}){let n=v.filter(t=>e.has(t.id)).length,r=n===v.length,i=p(`quickSettings.appearance.lobsterdexSeen`,{seen:String(n),total:String(v.length)});return c`
    <section class="lobsterdex-page">
      <header
        class="lobsterdex-page__header ${r?`lobsterdex-page__header--complete`:``}"
      >
        <div>
          <h2>${p(`tabs.lobsterdex`)}</h2>
          <p>${p(`subtitles.lobsterdex`)}</p>
        </div>
        <span class="lobsterdex-page__count">${i}</span>
      </header>
      <div class="lobsterdex-page__grid" aria-label=${i}>
        ${v.map(n=>{let r=w(n),i=e.get(n.id),o=i!==void 0,s=o?i.name??b(n.id):`?`,l=D[n.id],u=o&&i.firstSeenAt!==null?p(`quickSettings.appearance.lobsterdexCardFirstVisited`,{date:A(i.firstSeenAt)}):null,d=i?.shinySeenAt==null?null:p(`quickSettings.appearance.lobsterdexCardShinySeen`,{date:A(i.shinySeenAt)});return c`
            <article
              id="lobsterdex-${n.id}"
              class="lobsterdex-page__card ${o?``:`lobsterdex-page__card--unseen`}"
            >
              <button
                type="button"
                class="lobsterdex-page__copy-link"
                aria-label=${p(`quickSettings.appearance.lobsterdexCardCopyLink`)}
                @click=${()=>t.onCopyLink?.(n.id)}
              >
                <span aria-hidden="true"
                  >${t.copiedPaletteId===n.id?h.check:h.link}</span
                >
              </button>
              <div
                class="lobsterdex-page__sprite lobster-pet lobster-pet--palette-${n.id} ${o?``:`lobsterdex__mini--unseen`}"
                style=${C(r)}
              >
                ${T(r,{standalone:!0})}
                ${i?.shinySeenAt==null?a:c`<span
                      class="lobsterdex__mini-star lobsterdex-page__star"
                      aria-hidden="true"
                      >✦</span
                    >`}
              </div>
              <h3>${s}</h3>
              <p class="lobsterdex-page__lore">${o?l.flavor:l.hint}</p>
              <div class="lobsterdex-page__dates">
                ${u?c`<p class="lobsterdex-page__date"><time>${u}</time></p>`:a}
                ${d?c`<p class="lobsterdex-page__date"><time>${d}</time></p>`:a}
              </div>
            </article>
          `})}
      </div>
    </section>
  `}var M=e((()=>{s(),g(),y(),E(),m(),_()})),N;e((()=>{s(),o(),d(),x(),E(),k(),r(),M(),t(),N=class extends i{constructor(...e){super(...e),this.copiedPaletteId=null,this.copyResetTimer=null,this.copyLink=async e=>{let t=`${location.origin}${location.pathname}#lobsterdex-${e}`;try{await navigator.clipboard.writeText(t)}catch{return}this.copiedPaletteId=e,this.copyResetTimer!==null&&window.clearTimeout(this.copyResetTimer),this.copyResetTimer=window.setTimeout(()=>{this.copiedPaletteId=null,this.copyResetTimer=null},1500)}}disconnectedCallback(){this.copyResetTimer!==null&&(window.clearTimeout(this.copyResetTimer),this.copyResetTimer=null),super.disconnectedCallback()}firstUpdated(){if(!location.hash.startsWith(`#lobsterdex-`))return;let e=v.find(e=>e.id===location.hash.slice(12));if(!e)return;let t=this.querySelector(`#lobsterdex-${e.id}`);if(!t)return;let n=e=>{e.target!==t||e.animationName!==`lobsterdex-card-highlight`||(t.classList.remove(`lobsterdex-page__card--highlight`),t.removeEventListener(`animationend`,n))};t.addEventListener(`animationend`,n),t.classList.add(`lobsterdex-page__card--highlight`),requestAnimationFrame(()=>{requestAnimationFrame(()=>t.scrollIntoView({block:`center`}))})}render(){return c`
      <section class="content-header">
        <div class="page-title">${u(`lobsterdex`)}</div>
      </section>
      ${O(j(S(),{copiedPaletteId:this.copiedPaletteId,onCopyLink:e=>void this.copyLink(e)}))}
    `}},n([l()],N.prototype,`copiedPaletteId`,void 0),customElements.get(`openclaw-lobsterdex-page`)||customElements.define(`openclaw-lobsterdex-page`,N)}))();
//# sourceMappingURL=lobsterdex-page-BDLK8LK3.js.map