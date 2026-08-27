import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Bc as r,In as i,Kc as a,Ln as o,Qn as s,Rn as c,Vc as l,Wc as u,rr as d}from"./control-ui-core-BUddgKjW.js";import{K as f,Q as p,W as m,Y as h,nt as g}from"./lit-runtime-D5xZwgO1.js";import{i as ee,r as te}from"./control-ui-foundation-Dgui328h.js";import{Wt as ne,_ as re,jt as ie,v as _}from"./control-ui-core-Ct5CBwjl.js";import{Ct as v,Wt as y}from"./control-ui-foundation-DkfOBVsU.js";import{i as b,o as x,t as S}from"./control-ui-core-s0pW0mau.js";import{gt as C,vt as w,yt as T}from"./control-ui-core-vLOElyFQ.js";import{m as E,p as D,r as O,t as k}from"./control-ui-shared-CvVnFE5v.js";import{_ as A,c as j,o as M,r as N,s as P,t as F}from"./lobster-pet-lwRIKe3g.js";import{n as I,t as ae}from"./settings-workspace-BbyrBOFl.js";import{c as L,h as R,s as z,t as B,u as V}from"./settings-ui-Bko7fBdZ.js";import{n as H,t as U}from"./brand-icons-qCscRGgO.js";var W=e((()=>{}));function G(e,t){if(!e)return null;let n=new Date(e);return Number.isNaN(n.getTime())?null:new Intl.DateTimeFormat(t,{dateStyle:`medium`,timeZone:`UTC`}).format(n)}function K(e){return x(e===`copying`?`aboutPage.copyingCommit`:e===`copied`?`aboutPage.copiedCommit`:e===`error`?`aboutPage.copyCommitFailed`:`aboutPage.copyCommit`)}function q(e){return e===`copied`?x(`aboutPage.copiedCommit`):e===`error`?x(`aboutPage.copyCommitFailed`):``}function J(){return h`<span class="muted">${x(`aboutPage.unavailable`)}</span>`}function oe(e){if(!e)return f;let t=Date.parse(e);return Number.isFinite(t)?h`
    <time class="about-commit__age" dir="auto" datetime=${e} title=${new Intl.DateTimeFormat(b.getLocale(),{dateStyle:`medium`,timeStyle:`short`}).format(new Date(t))}
      >${s(t,{fallback:``})}</time
    >
  `:f}function se(e){let t=e.buildInfo.commit;if(!t)return J();let n=K(e.copyState);return h`
    <span class="about-commit">
      <code dir="ltr" title=${t}>${t.slice(0,Y)}</code>
      ${oe(e.buildInfo.commitAt)}
      <openclaw-tooltip .content=${n}>
        <button
          type="button"
          class="about-commit__copy"
          aria-label=${n}
          aria-busy=${e.copyState===`copying`?`true`:f}
          ?disabled=${e.copyState===`copying`}
          @click=${e.onCopyCommit}
        >
          <span aria-hidden="true">${e.copyState===`copied`?w.check:w.copy}</span>
        </button>
      </openclaw-tooltip>
      <span class="about-sr-only" role="status" aria-live="polite"
        >${q(e.copyState)}</span
      >
    </span>
  `}function ce(e){let t=N(j.find(e=>e.id===`crimson`)??y(j[0],`about lobster palette`));return h`
    <section class="about-hero">
      <button
        type="button"
        class="about-hero__clawd ${e.clawdWaving?`about-hero__clawd--wave`:``}"
        style=${M(t)}
        aria-label=${x(`aboutPage.waveHello`)}
        @click=${e.onPokeClawd}
      >
        ${P(t)}
      </button>
      <h2 class="about-hero__name">${x(`aboutPage.productName`)}</h2>
      <p class="about-hero__tagline">${x(`aboutPage.tagline`)}</p>
      ${e.buildInfo.version?h`<code class="about-hero__version" dir="ltr">v${e.buildInfo.version}</code>`:f}
      <nav class="about-hero__links" aria-label=${x(`aboutPage.linksLabel`)}>
        ${X.map(e=>h`
            <a
              class="about-hero__link"
              href=${e.href}
              target=${i}
              rel=${o()}
            >
              <span class="about-hero__link-icon" aria-hidden="true">${e.icon}</span>
              <span>${e.label()}</span>
            </a>
          `)}
      </nav>
    </section>
  `}function le(e){let t=G(e.buildInfo.builtAt,b.getLocale()),n=h`
    <dl
      class="settings-kv about-build-grid"
      role="group"
      aria-label=${x(`aboutPage.artifactDetails`)}
    >
      <dt>${x(`aboutPage.version`)}</dt>
      <dd>
        ${e.buildInfo.version?h`<code dir="ltr" title=${e.buildInfo.version}>${e.buildInfo.version}</code>`:J()}
      </dd>
      <dt>${x(`aboutPage.commit`)}</dt>
      <dd>${se(e)}</dd>
      ${e.buildInfo.branch?h`
            <dt>${x(`aboutPage.branch`)}</dt>
            <dd>
              <code dir="ltr" title=${e.buildInfo.branch}
                >${e.buildInfo.branch}${e.buildInfo.dirty===!0?`*`:``}</code
              >
            </dd>
          `:f}
      <dt>${x(`aboutPage.built`)}</dt>
      <dd>
        ${t&&e.buildInfo.builtAt?h`<time
              dir="auto"
              datetime=${e.buildInfo.builtAt}
              title=${e.buildInfo.builtAt}
              >${t}</time
            >`:J()}
      </dd>
    </dl>
  `;return z([ce(e),V({title:x(`aboutPage.artifactTitle`),description:x(`aboutPage.artifactSubtitle`)},n),V({},L({title:x(`aboutPage.gatewayVersion`),description:x(`aboutPage.gatewayVersionHint`),control:e.gatewayVersion?R(h`<code dir="ltr" title=${e.gatewayVersion}>${e.gatewayVersion}</code>`,{mono:!0}):R(x(`aboutPage.unavailable`))})),h`<p class="about-footer">${x(`aboutPage.license`)}</p>`])}var Y,X,ue=e((()=>{A(),v(),m(),T(),F(),B(),C(),S(),c(),d(),W(),H(),Y=12,X=[{href:`https://openclaw.ai`,icon:w.globe,label:()=>x(`aboutPage.linkWebsite`)},{href:`https://docs.openclaw.ai`,icon:w.book,label:()=>x(`aboutPage.linkDocs`)},{href:`https://github.com/openclaw/openclaw`,icon:U.github,label:()=>x(`aboutPage.linkGitHub`)},{href:`https://discord.gg/clawd`,icon:U.discord,label:()=>x(`aboutPage.linkDiscord`)},{href:`https://x.com/openclaw`,icon:U.x,label:()=>x(`aboutPage.linkX`)},{href:`https://docs.openclaw.ai/releases`,icon:w.scrollText,label:()=>x(`aboutPage.linkChangelog`)}]})),Z,Q,$;e((()=>{te(),m(),p(),ie(),_(),O(),ae(),E(),a(),l(),ue(),t(),Z=1800,Q=1400,$=class extends u{constructor(...e){super(...e),this.copyState=`idle`,this.clawdWaving=!1,this.copyResetTimer=null,this.waveResetTimer=null,this.subscriptions=new r(this).watch(()=>this.context?.gateway,(e,t)=>e.subscribe(t))}disconnectedCallback(){this.subscriptions.clear(),this.copyResetTimer!==null&&(globalThis.clearTimeout(this.copyResetTimer),this.copyResetTimer=null),this.waveResetTimer!==null&&(globalThis.clearTimeout(this.waveResetTimer),this.waveResetTimer=null),super.disconnectedCallback()}pokeClawd(){this.clawdWaving||(this.clawdWaving=!0,this.waveResetTimer=globalThis.setTimeout(()=>{this.waveResetTimer=null,this.clawdWaving=!1},Q))}async copyCommit(){let e=k.commit;if(!e||this.copyState===`copying`)return;this.copyState=`copying`;let t=await D(e);this.isConnected&&(this.copyState=t?`copied`:`error`,this.copyResetTimer!==null&&globalThis.clearTimeout(this.copyResetTimer),this.copyResetTimer=globalThis.setTimeout(()=>{this.copyResetTimer=null,this.copyState=`idle`},Z))}render(){let e=this.context.gateway.snapshot,t=le({buildInfo:k,gatewayVersion:e.phase===`connected`&&e.hello?.server?.version?.trim()||null,copyState:this.copyState,onCopyCommit:()=>void this.copyCommit(),clawdWaving:this.clawdWaving,onPokeClawd:()=>this.pokeClawd()});return h`
      <section class="content-header">
        <div>
          <div class="page-title">${ne(`about`)}</div>
        </div>
      </section>
      ${I(t)}
    `}},n([ee({context:re,subscribe:!0})],$.prototype,`context`,void 0),n([g()],$.prototype,`copyState`,void 0),n([g()],$.prototype,`clawdWaving`,void 0),customElements.get(`openclaw-about-page`)||customElements.define(`openclaw-about-page`,$)}))();
//# sourceMappingURL=about-page-vJzPpzak.js.map