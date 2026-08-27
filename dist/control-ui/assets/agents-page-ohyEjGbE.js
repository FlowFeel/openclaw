const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./preview-DzpTTA8I.js","./rolldown-runtime-DaJ6WEGw.js"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{S as t,b as n,h as r,x as i,y as a}from"./control-ui-foundation-OE0aAIzW.js";import{$o as o,Bc as s,Cc as c,Cn as l,Ec as u,En as d,Fo as f,Go as p,Hc as m,Ho as h,Io as g,Jo as _,Kc as v,Ko as ee,Lo as y,Mn as te,Nn as b,Po as ne,Qn as x,Qo as re,Ro as S,Rr as ie,Sn as C,Tn as w,Uo as ae,Ur as oe,Vc as se,Vo as ce,Wc as le,Wo as ue,Xo as de,Yo as fe,Zc as T,Zo as pe,dc as me,es as he,fs as ge,gn as _e,is as ve,kn as ye,qo as be,rr as xe,rs as Se,ts as Ce,uc as we,wc as Te,wn as Ee,yn as De,ys as Oe,zo as ke}from"./control-ui-core-ChU36mQ7.js";import{C as Ae,K as E,Q as je,W as Me,Y as D,g as Ne,it as Pe,m as Fe,nt as O,w as Ie}from"./lit-runtime-D5xZwgO1.js";import{i as Le,r as Re}from"./control-ui-foundation-Dgui328h.js";import{Q as ze,Ut as Be,Wt as Ve,Y as He,_ as Ue,jt as We,rn as Ge,sn as Ke,v as qe}from"./control-ui-core-CmlLmVZa.js";import{Ct as Je,Kt as Ye,Yt as Xe,bt as Ze,en as Qe,xt as k}from"./control-ui-foundation-DkfOBVsU.js";import{o as A,t as j}from"./control-ui-core-M4uhXYSJ.js";import{gt as $e,pt as et,vt as M,yt as tt}from"./control-ui-core-pXkCFtVv.js";import{m as nt,p as rt}from"./control-ui-shared-C-1hBCcB.js";import{T as it,c as at,d as ot,g as st,r as ct,s as lt}from"./cron-CI1IHcW3.js";import{a as ut,o as dt}from"./panel-refresh-status-ERvZmNEF.js";import{L as ft,R as pt}from"./markdown-runtime-BCCaEqDL.js";import{n as mt,t as ht}from"./settings-workspace-BbyrBOFl.js";import{c as N,f as gt,h as _t,i as P,n as vt,o as yt,p as bt,t as xt,u as F}from"./settings-ui-Bq4yxauk.js";import{n as St,t as Ct}from"./gateway-page-controller-CmSjSlgL.js";import{t as wt}from"./agent-select-registration-FrLOwyPP.js";import{n as Tt,t as Et}from"./hub-tabs-DByyIl3h.js";import{a as Dt,c as Ot,n as kt,o as At,r as jt,s as Mt,t as Nt}from"./skills-shared-BkaLkENf.js";import{t as Pt}from"./memory-panel-CTrPxLTw.js";import{n as Ft,t as It}from"./cron-jobs-pagination-O9wETPM8.js";import{a as Lt,n as Rt,r as zt,s as Bt,t as Vt}from"./presenter-BQdqRY27.js";function Ht(e,t){if(!e)return e;let n=e.files.some(e=>e.name===t.name)?e.files.map(e=>e.name===t.name?t:e):[...e.files,t];return{...e,files:n}}async function Ut(e,t,n,r){let i=e.client;if(!i||!e.connected||e.agentFilesLoading)return!1;if(!r?.force&&Object.hasOwn(e.agentFileContents,n))return!0;let a=e.requestGeneration,o=()=>e.client===i&&e.connected&&e.requestGeneration===a;e.agentFilesLoading=!0,e.agentFilesError=null;try{let a=await i.request(`agents.files.get`,{agentId:t,name:n});if(a?.file&&o()){let t=a.file.content??``,i=e.agentFileContents[n]??``,o=e.agentFileDrafts[n],s=r?.preserveDraft??!0;return e.agentFilesList=Ht(e.agentFilesList,a.file),e.agentFileContents={...e.agentFileContents,[n]:t},(!s||!Object.hasOwn(e.agentFileDrafts,n)||o===i)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:t}),!0}}catch(t){return o()&&(e.agentFilesError=String(t)),!1}finally{o()&&(e.agentFilesLoading=!1)}return!1}async function Wt(e,t,n,r){let i=e.client;if(!i||!e.connected||e.agentFileSaving)return;let a=e.requestGeneration,o=()=>e.client===i&&e.connected&&e.requestGeneration===a;e.agentFileSaving=!0,e.agentFilesError=null;try{let a=await i.request(`agents.files.set`,{agentId:t,name:n,content:r});a?.file&&o()&&(e.agentFilesList=Ht(e.agentFilesList,a.file),e.agentFileContents={...e.agentFileContents,[n]:r},(!Object.hasOwn(e.agentFileDrafts,n)||e.agentFileDrafts[n]===r)&&(e.agentFileDrafts={...e.agentFileDrafts,[n]:r}))}catch(t){o()&&(e.agentFilesError=String(t))}finally{o()&&(e.agentFileSaving=!1)}}var Gt=e((()=>{}));function Kt(e){return e&&e.length<=Xt?e:null}function qt(e){return new Promise(t=>{let n=new FileReader;n.addEventListener(`load`,()=>t(Kt(typeof n.result==`string`?n.result:null))),n.addEventListener(`error`,()=>t(null)),n.readAsDataURL(e)})}async function Jt(e){if(!e.type.startsWith(`image/`)||e.size>2097152)return null;try{let t=await createImageBitmap(e),n=Math.min(1,Yt/Math.max(t.width,t.height)),r=Math.max(1,Math.round(t.width*n)),i=Math.max(1,Math.round(t.height*n)),a=document.createElement(`canvas`);a.width=r,a.height=i;let o=a.getContext(`2d`);if(!o)return qt(e);o.drawImage(t,0,0,r,i),t.close();let s=a.toDataURL(`image/webp`,.8);return Kt(s.startsWith(`data:image/webp`)?s:a.toDataURL(`image/png`))}catch{return qt(e)}}var Yt,Xt,Zt=e((()=>{r(),Yt=96,Xt=16e3}));function Qt(e){let t=(an.get(e)??0)+1;return an.set(e,t),t}function $t(e){Qt(e),e.identityDraft={name:null,emoji:null,avatar:null},e.identitySaving=!1,e.identityError=null}function en(e,t,n){e.identityDraft={...e.identityDraft,[t]:n},e.identityError=null}function tn(e,t){let n=Qt(e);Jt(t).then(t=>{an.get(e)===n&&(t?(e.identityDraft={...e.identityDraft,avatar:t},e.identityError=null):e.identityError=A(`agents.identity.imageUnusable`))})}async function nn(e){let{host:t,expectedClient:n,agentId:r,agents:i,agentIdentity:a,runtimeConfig:o}=e,s=t.identityDraft,c=s.name?.trim(),l=s.emoji?.trim(),u=s.avatar??void 0;if(!(s.name!==null&&!c||s.emoji!==null&&!l)){if(!c&&!l&&!u){$t(t);return}t.identitySaving=!0,t.identityError=null;try{let s=await o.runExternalMutation(e=>{if(e!==n)throw Error(`Connection changed before the agent identity update started.`);return d(e,{agentId:r,name:c,emoji:l,avatar:u})});if(!s.ok)throw Error(s.error);let f=s.refresh.ok?[]:[s.refresh.error];a.invalidate([r]);try{await i.refreshList()}catch(e){f.push(`Agent identity was saved, but the agent list refresh failed: ${Ye(e,{redact:me})}`)}try{await a.ensure([r])}catch(e){f.push(`Agent identity was saved, but the identity refresh failed: ${Ye(e,{redact:me})}`)}e.isCurrent()&&($t(t),e.onSaved(),t.identityError=f.length>0?f.join(` `):null)}catch(n){e.isCurrent()&&(t.identityError=String(n))}finally{e.isCurrent()&&(t.identitySaving=!1)}}}function rn(e,t){let n=e.snapshot.pinnedAgentIds,r=n.includes(t)?n.filter(e=>e!==t):[...n,t];e.update({pinnedAgentIds:r})}var an,on=e((()=>{Je(),j(),C(),we(),Zt(),an=new WeakMap}));function sn(e){return{path:[...e.path,`model`],existing:e.entry.model}}function cn(e,t,n){let r=e.agentEntry(t,{ensure:!!n});if(!r)return;let i=sn(r);if(!n)e.removeFormValue(i.path);else if(i.existing&&typeof i.existing==`object`){let t=i.existing.fallbacks;e.patchForm(i.path,{primary:n,...Array.isArray(t)?{fallbacks:t}:{}})}else e.patchForm(i.path,n)}function ln(e,t,n){let r=Se(e.state),i=Xe(n),a=p(r,t),o=pe(a.entry?.model)??pe(a.defaults?.model),s=_(a.entry?.model,a.defaults?.model),c=e.agentEntry(t),l=i.length>0?o?c??e.agentEntry(t,{ensure:!0}):null:(s?.length??0)>0||c?c??e.agentEntry(t,{ensure:!0}):null;if(!l)return;let u=sn(l),d=typeof u.existing==`string`?u.existing.trim():u.existing&&typeof u.existing==`object`&&typeof u.existing.primary==`string`?u.existing.primary.trim():``;i.length===0?d||o?e.patchForm(u.path,d||o):e.removeFormValue(u.path):(d||o)&&e.patchForm(u.path,{primary:d||o,fallbacks:i})}var un=e((()=>{S(),ve(),m()}));function dn(e,t,n){let r=t?.canonicalLocation;if(!r)return``;let i=`${t.location.pathname}${t.location.search}${t.location.hash}`;return n!==i&&e.replace(`agents`,r),i}function fn(e,t,n,r){n!==t&&e.navigate(`agents`,{pathname:Ke(t,r===`files`?null:r,e.basePath)})}function pn(e,t,n,r){!t||r===n||e.navigate(`agents`,{pathname:Ke(t,r,e.basePath)})}var mn=e((()=>{Ge(),T()}));async function hn(e,t){let n=e.client;if(!n||!e.connected||e.agentSkillsLoading)return;let r=e.requestGeneration,i=()=>e.client===n&&e.connected&&e.requestGeneration===r;e.agentSkillsLoading=!0,e.agentSkillsError=null;try{let r=await oe(n,t);r&&i()&&(e.agentSkillsReport=r,e.agentSkillsAgentId=t)}catch(t){i()&&(e.agentSkillsError=String(t))}finally{i()&&(e.agentSkillsLoading=!1)}}var gn=e((()=>{ie()})),_n=e((()=>{}));function vn(e){let{agent:t,configForm:n,agentFilesList:r,configLoading:i,configSaving:a,configDirty:o,onConfigReload:s,onConfigSave:l,onModelChange:d,onModelFallbacksChange:f,onSelectPanel:m}=e,h=!!(e.defaultId&&t.id===e.defaultId),v=p(n,t.id),y=t.model,te=(r&&r.agentId===t.id?r.workspace:null)||v.entry?.workspace||v.defaults?.workspace||t.workspace||`default`,b=v.entry?.model?de(v.entry?.model):v.defaults?.model?de(v.defaults?.model):de(y),ne=ee(t.agentRuntime),x=de(v.defaults?.model??y),re=pe(v.entry?.model),S=pe(v.defaults?.model)||(x===`-`?null:ae(x))||(n?null:pe(y)),ie=re??S??null,C=h?ie:re,w=_(v.entry?.model,v.defaults?.model)??(n?null:fe(y))??[],oe=Array.isArray(v.entry?.skills)?v.entry?.skills:null,se=oe?.length??null,ce=!n||i||a,le=t.thinkingDefault??`-`,T=e.identityDraft,me=T.name??e.agentIdentity?.name??t.identity?.name??t.name??``,he=T.emoji??e.agentIdentity?.emoji??t.identity?.emoji??``,ge=T.avatar??u(t,e.agentIdentity),_e=be(t)??(c(me||t.id)||`?`),ve=T.name!==null||T.emoji!==null||T.avatar!==null,ye=T.name!==null&&!T.name.trim()||T.emoji!==null&&!T.emoji.trim(),xe=e.identitySaving,Se=t=>{let n=t.target,r=n.files?.[0];n.value=``,r&&e.onIdentityAvatarSelect(r)},Ce=e=>{let n=w.filter((t,n)=>n!==e);f(t.id,n)};return D`
    ${F({title:A(`agents.identity.title`),description:A(`agents.identity.subtitle`)},D`
        <div class="settings-row settings-row--stacked">
          <div class="agent-identity-editor">
            <span class="agent-identity-editor__avatar" aria-hidden="true">
              ${ge?D`<img src=${ge} alt="" decoding="async" />`:D`<span class="agent-identity-editor__avatar-text"
                    >${_e}</span
                  >`}
            </span>
            <div class="agent-identity-editor__fields">
              <label class="field">
                <span>${A(`agents.identity.name`)}</span>
                <input
                  type="text"
                  maxlength="64"
                  .value=${me}
                  placeholder=${A(`agents.identity.namePlaceholder`)}
                  ?disabled=${xe}
                  @input=${t=>e.onIdentityFieldChange(`name`,t.target.value)}
                />
              </label>
              <label class="field agent-identity-editor__emoji">
                <span>${A(`agents.identity.emoji`)}</span>
                <input
                  type="text"
                  maxlength="8"
                  .value=${he}
                  placeholder="🦞"
                  ?disabled=${xe}
                  @input=${t=>e.onIdentityFieldChange(`emoji`,t.target.value)}
                />
              </label>
            </div>
          </div>
          ${e.identityError?D`<div class="settings-row__desc" role="alert" style="color: var(--danger);">
                ${e.identityError}
              </div>`:E}
          <div class="agent-identity-editor__actions">
            <label class="btn btn--sm">
              ${A(ge?`agents.identity.replaceImage`:`agents.identity.chooseImage`)}
              <input
                type="file"
                accept="image/*"
                hidden
                ?disabled=${xe}
                @change=${Se}
              />
            </label>
            <button
              type="button"
              class="btn btn--sm primary"
              ?disabled=${xe||!ve||ye}
              @click=${()=>e.onIdentitySave()}
            >
              ${A(xe?`common.saving`:`common.save`)}
            </button>
          </div>
          <div class="settings-row__desc agent-identity-editor__hint">
            ${A(`agents.identity.fileHint`)}
          </div>
        </div>
      `)}
    ${F({title:A(`agents.overview.title`),description:A(`agents.overview.subtitle`)},D`
        <dl class="settings-kv">
          <dt>${A(`agents.context.workspace`)}</dt>
          <dd>
            <openclaw-tooltip .content=${A(`agents.context.openFilesTab`)}>
              <button
                type="button"
                class="workspace-link mono"
                @click=${()=>m(`files`)}
                aria-label=${A(`agents.context.openFilesTab`)}
              >
                ${te}
              </button>
            </openclaw-tooltip>
          </dd>
          <dt>${A(`agents.context.primaryModel`)}</dt>
          <dd><code>${b}</code></dd>
          <dt>${A(`agents.context.runtime`)}</dt>
          <dd><code>${ne}</code></dd>
          <dt>${A(`agents.context.thinkingDefault`)}</dt>
          <dd><code>${le}</code></dd>
          <dt>${A(`agents.context.skillsFilter`)}</dt>
          <dd>
            ${oe?A(`agents.overview.selectedSkills`,{count:String(se)}):A(`agents.overview.allSkills`)}
          </dd>
        </dl>
      `)}
    ${o?D`<div class="callout warn">${A(`agents.overview.unsavedConfig`)}</div>`:E}
    ${F({title:A(`agents.overview.modelSelection`),actions:D`
          <button
            type="button"
            class="btn btn--sm"
            ?disabled=${i}
            @click=${s}
          >
            ${A(`common.reloadConfig`)}
          </button>
          <button
            type="button"
            class="btn btn--sm primary"
            ?disabled=${a||!o}
            @click=${l}
          >
            ${A(a?`common.saving`:`common.save`)}
          </button>
        `},D`
        ${dt({status:{error:e.modelCatalogError,hasLoaded:e.modelCatalog.length>0,stale:!!(e.modelCatalogError&&e.modelCatalog.length>0)},onRetry:e.onModelCatalogRetry})}
        ${N({title:A(h?`agents.overview.primaryModelDefault`:`agents.overview.primaryModel`),control:D`
            <select
              class="settings-select"
              .value=${C??``}
              ?disabled=${ce}
              @change=${e=>d(t.id,e.target.value||null)}
            >
              ${h?D`
                    <option value="" ?selected=${!C}>
                      ${A(`agents.overview.notSet`)}
                    </option>
                  `:D`
                    <option value="" ?selected=${!C}>
                      ${S?A(`agents.overview.inheritDefaultModel`,{model:S}):A(`agents.overview.inheritDefault`)}
                    </option>
                  `}
              ${g(n,ie??void 0,e.modelCatalog,C)}
            </select>
          `})}
        ${N({title:A(`agents.overview.fallbacks`),stacked:!0,control:D`
            <div
              class="agent-chip-input"
              @click=${e=>{let t=e.currentTarget.querySelector(`input`);t&&t.focus()}}
            >
              ${w.map((e,t)=>D`
                  <span class="chip">
                    ${e}
                    <button
                      type="button"
                      class="chip-remove"
                      ?disabled=${ce}
                      @click=${()=>Ce(t)}
                    >
                      &times;
                    </button>
                  </span>
                `)}
              <input
                ?disabled=${ce}
                placeholder=${w.length===0?`provider/model`:``}
                @keydown=${e=>{let n=e.target;if(e.key===`Enter`||e.key===`,`){e.preventDefault();let r=ue(n.value);r.length>0&&(f(t.id,[...w,...r]),n.value=``)}}}
                @blur=${e=>{let n=e.target,r=ue(n.value);r.length>0&&(f(t.id,[...w,...r]),n.value=``)}}
              />
            </div>
          `})}
      `)}
  `}var yn=e((()=>{Me(),ut(),xt(),$e(),j(),S(),Te()}));function bn(e){return{...Vn,...e,plugins:e?.plugins??[],customRenderers:e?.customRenderers??{}}}function xn(e,t){return typeof t==`function`?t(e):e}function Sn(e,t){let n=bn(t),r=n.classPrefix,i=e;for(let e of n.plugins)e.transformBlock&&(i=i.map(e.transformBlock));let a=`<div class="${r}preview">${i.map(e=>{for(let t of n.plugins)if(t.renderBlock){let r=t.renderBlock(e,()=>wn(e,n));if(r!==null)return r}let t=n.customRenderers[e.type];return t?t(e):wn(e,n)}).join(`
`)}</div>`;return a=xn(a,n.sanitize),a}async function Cn(e,t){let n=bn(t);for(let e of n.plugins)e.init&&await e.init();let r=Sn(e,t);for(let e of n.plugins)e.postProcess&&(r=await e.postProcess(r));return r}function wn(e,t){let n=t.classPrefix;switch(e.type){case`paragraph`:return`<p class="${n}paragraph">${I(e.content,t)}</p>`;case`heading`:return Tn(e,t);case`bulletList`:return En(e,t);case`numberedList`:return Dn(e,t);case`checkList`:return On(e,t);case`codeBlock`:return kn(e,t);case`blockquote`:return`<blockquote class="${n}blockquote">${I(e.content,t)}</blockquote>`;case`table`:return An(e,t);case`image`:return jn(e,t);case`divider`:return`<hr class="${n}divider" />`;case`callout`:return Mn(e,t);default:return`<div class="${n}unknown">${I(e.content,t)}</div>`}}function Tn(e,t){let n=t.classPrefix,r=e.props.level,i=`h${r}`;return`<${i} class="${n}heading ${n}h${r}">${I(e.content,t)}</${i}>`}function En(e,t){return`<ul class="${t.classPrefix}bullet-list">
${e.children.map(e=>`<li>${I(e.content,t)}</li>`).join(`
`)}
</ul>`}function Dn(e,t){return`<ol class="${t.classPrefix}numbered-list">
${e.children.map(e=>`<li>${I(e.content,t)}</li>`).join(`
`)}
</ol>`}function On(e,t){let n=t.classPrefix,r=e.props.checked;return`
<div class="${n}checklist-item">
  <input type="checkbox" ${r?`checked disabled`:`disabled`} />
  <span class="${r?`${n}checked`:``}">${I(e.content,t)}</span>
</div>`.trim()}function kn(e,t){let n=t.classPrefix,r=e.content.map(e=>e.text).join(``),i=e.props.language||``,a=L(r),o=i?` language-${i}`:``;return`<pre class="${n}code-block"${i?` data-language="${i}"`:``}><code class="${n}code${o}">${a}</code></pre>`}function An(e,t){let n=t.classPrefix,{headers:r,rows:i,alignments:a}=e.props,o=e=>{let t=a?.[e];return t?` style="text-align: ${t}"`:``};return`<table class="${n}table">
${r.length>0?`<thead><tr>${r.map((e,t)=>`<th${o(t)}>${L(e)}</th>`).join(``)}</tr></thead>`:``}
<tbody>
${i.map(e=>`<tr>${e.map((e,t)=>`<td${o(t)}>${L(e)}</td>`).join(``)}</tr>`).join(`
`)}
</tbody>
</table>`}function jn(e,t){let n=t.classPrefix,{url:r,alt:i,title:a,width:o,height:s}=e.props,c=i?` alt="${L(i)}"`:` alt=""`,l=a?` title="${L(a)}"`:``,u=o?` width="${o}"`:``,d=s?` height="${s}"`:``;return`<figure class="${n}image">${`<img src="${L(r)}"${c}${l}${u}${d} />`}${i?`<figcaption>${L(i)}</figcaption>`:``}</figure>`}function Mn(e,t){let n=t.classPrefix,r=e.props.type;return`
<div class="${n}callout ${n}callout-${r}" role="alert">
  <strong class="${n}callout-title">${r}</strong>
  <div class="${n}callout-content">${I(e.content,t)}</div>
</div>`.trim()}function I(e,t){return e.map(e=>Nn(e,t)).join(``)}function Nn(e,t){let n=L(e.text),r=e.styles;if(r.code&&(n=`<code>${n}</code>`),r.highlight&&(n=`<mark>${n}</mark>`),r.strikethrough&&(n=`<del>${n}</del>`),r.underline&&(n=`<u>${n}</u>`),r.italic&&(n=`<em>${n}</em>`),r.bold&&(n=`<strong>${n}</strong>`),r.link){let e=t.linkTarget===`_blank`?` target="_blank" rel="noopener noreferrer"`:``,i=r.link.title?` title="${L(r.link.title)}"`:``;n=`<a href="${L(r.link.url)}"${i}${e}>${n}</a>`}return n}function L(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}function Pn(e){return[...[1,2,3,4,5,6].map(t=>({tag:`h${t}`,classes:[`${e}heading`,`${e}h${t}`]})),{tag:`p`,classes:[`${e}paragraph`]},{tag:`ul`,classes:[`${e}bullet-list`]},{tag:`ol`,classes:[`${e}numbered-list`]},{tag:`pre`,classes:[`${e}code-block`]},{tag:`blockquote`,classes:[`${e}blockquote`]},{tag:`hr`,classes:[`${e}divider`]},{tag:`table`,classes:[`${e}table`]},{tag:`figure`,classes:[`${e}image`]}]}function Fn(e,t){let n=t.join(` `),r=/\bclass\s*=\s*"([^"]*)"/i,i=e.match(r);return i?e.replace(r,`class="${n} ${i[1]}"`):e.endsWith(`/>`)?e.slice(0,-2)+` class="${n}" />`:e.slice(0,-1)+` class="${n}">`}function In(e,t){return e.replace(/(?<!<figure[^>]*>\s*)(<img\s[^>]*\/?>)(?!\s*<\/figure>)/gi,`<figure class="${t}image">$1</figure>`)}function Ln(e,t){let n=t?.classPrefix??`cm-`,r=t?.wrapperClass??`${n}preview`,i=Pn(n),a=e;for(let{tag:e,classes:t}of i){let n=RegExp(`<${e}(\\s[^>]*)?>|<${e}\\s*\\/?>`,`gi`);a=a.replace(n,e=>Fn(e,t))}return a=In(a,n),a=`<div class="${r}">${a}</div>`,typeof t?.sanitize==`function`&&(a=t.sanitize(a)),a}async function Rn(e){try{return(await i(()=>import(`./preview-DzpTTA8I.js`),__vite__mapDeps([0,1]),import.meta.url)).parse(e)}catch{throw Error(`@create-markdown/core is required to parse markdown in <markdown-preview>. Install it, or provide pre-parsed blocks via the blocks attribute / setBlocks().`)}}var zn,Bn,R,Vn,Hn,Un=e((()=>{t(),zn=Object.defineProperty,Bn=(e,t,n)=>t in e?zn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,R=(e,t,n)=>Bn(e,typeof t==`symbol`?t:t+``,n),Vn={classPrefix:`cm-`,theme:`github`,linkTarget:`_blank`,sanitize:!1,plugins:[],customRenderers:{}},Hn=class extends HTMLElement{constructor(){super(),R(this,`_shadow`,null),R(this,`plugins`,[]),R(this,`defaultTheme`,`github`),R(this,`styleElement`),R(this,`contentElement`);let e=this.constructor._shadowMode;e!==`none`&&(this._shadow=this.attachShadow({mode:e})),this.styleElement=document.createElement(`style`),this.renderRoot.appendChild(this.styleElement),this.contentElement=document.createElement(`div`),this.contentElement.className=`markdown-preview-content`,this.renderRoot.appendChild(this.contentElement),this.updateStyles()}static get observedAttributes(){return[`theme`,`link-target`,`async`]}get renderRoot(){return this._shadow??this}connectedCallback(){this.render()}attributeChangedCallback(e,t,n){this.render()}setPlugins(e){this.plugins=e,this.render()}setDefaultTheme(e){this.defaultTheme=e,this.render()}getMarkdown(){let e=this.getAttribute(`blocks`);if(e)try{return JSON.parse(e).map(e=>e.content.map(e=>e.text).join(``)).join(`

`)}catch{return``}return this.textContent||``}setMarkdown(e){this.textContent=e,this.render()}setBlocks(e){this.setAttribute(`blocks`,JSON.stringify(e)),this.render()}getOptions(){return{theme:this.getAttribute(`theme`)||this.defaultTheme,linkTarget:this.getAttribute(`link-target`)||`_blank`,plugins:this.plugins}}async getBlocks(){let e=this.getAttribute(`blocks`);if(e)try{return JSON.parse(e)}catch{return console.warn(`Invalid blocks JSON in markdown-preview element`),[]}return Rn(this.textContent||``)}async render(){let e=await this.getBlocks(),t=this.getOptions(),n=this.hasAttribute(`async`)||this.plugins.length>0;try{let r;r=n?await Cn(e,t):Sn(e,t),this.contentElement.innerHTML=r}catch(e){console.error(`Error rendering markdown preview:`,e),this.contentElement.innerHTML=`<div class="error">Error rendering content</div>`}}updateStyles(){let e=this.plugins.filter(e=>e.getCSS).map(e=>e.getCSS()).join(`

`),t=this._shadow?`:host { display: block; }`:`markdown-preview { display: block; }`;this.styleElement.textContent=`
${t}

.markdown-preview-content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.error {
  color: #cf222e;
  padding: 1rem;
  background: #ffebe9;
  border-radius: 6px;
}

${e}
    `.trim()}},R(Hn,`_shadowMode`,`open`)}));function Wn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}function Gn(e){W=e}function z(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function B(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(K.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}function V(e,t){if(t){if(K.escapeTest.test(e))return e.replace(K.escapeReplace,ai)}else if(K.escapeTestNoEncode.test(e))return e.replace(K.escapeReplaceNoEncode,ai);return e}function Kn(e){try{e=encodeURI(e).replace(K.percentDecode,`%`)}catch{return null}return e}function qn(e,t){let n=e.replace(K.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(K.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``);for(;r<n.length;r++)n[r]=n[r].trim().replace(K.slashPipe,`|`);return n}function H(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Jn(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&K.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Yn(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Xn(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Zn(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`);r.state.inLink=!0;let c={type:e[0].charAt(0)===`!`?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:r.inlineTokens(s)};return r.state.inLink=!1,c}function Qn(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join(`
`)}function U(e,t){return Q.parse(e,t)}var W,G,$n,K,er,tr,nr,q,rr,ir,ar,or,sr,cr,lr,ur,dr,fr,pr,mr,hr,gr,_r,vr,yr,br,xr,Sr,Cr,wr,Tr,Er,J,Dr,Or,kr,Ar,jr,Mr,Nr,Pr,Fr,Ir,Lr,Rr,zr,Br,Vr,Hr,Ur,Wr,Gr,Kr,qr,Jr,Yr,Xr,Zr,Qr,$r,ei,ti,ni,ri,Y,ii,ai,oi,X,si,ci,Z,li,ui,Q,di=e((()=>{W=Wn(),G={exec:()=>null},$n=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),K={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:z(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:z(e=>RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:z(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:z(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:z(e=>RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,`i`)),blockquoteBeginRegex:z(e=>RegExp(`^ {0,${e}}>`))},er=/^(?:[ \t]*(?:\n|$))+/,tr=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nr=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,q=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,rr=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ir=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ar=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,or=B(ar).replace(/bull/g,ir).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),sr=B(ar).replace(/bull/g,ir).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),cr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,lr=/^[^\n]+/,ur=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dr=B(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,ur).replace(`title`,/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),fr=B(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,ir).getRegex(),pr=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,mr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,hr=B(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,mr).replace(`tag`,pr).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),gr=e=>B(cr).replace(`hr`,q).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace(`list`,e).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,pr).getRegex(),_r=gr(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),vr=gr(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),yr={blockquote:B(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace(`paragraph`,vr).getRegex(),code:tr,def:dr,fences:nr,heading:rr,hr:q,html:hr,lheading:or,list:fr,newline:er,paragraph:_r,table:G,text:lr},br=B(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,q).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,pr).getRegex(),xr={...yr,lheading:sr,table:br,paragraph:B(cr).replace(`hr`,q).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,br).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,`</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)`).replace(`tag`,pr).getRegex()},Sr={...yr,html:B(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace(`comment`,mr).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:G,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:B(cr).replace(`hr`,q).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,or).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},Cr=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,wr=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Tr=/^( {2,}|\\)\n(?!\s*$)/,Er=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,J=/[\p{P}\p{S}]/u,Dr=/[\s\p{P}\p{S}]/u,Or=/[^\s\p{P}\p{S}]/u,kr=B(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Dr).getRegex(),Ar=/(?!~)[\p{P}\p{S}]/u,jr=/(?!~)[\s\p{P}\p{S}]/u,Mr=/(?:[^\s\p{P}\p{S}]|~)/u,Nr=B(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,$n?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Pr=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Fr=B(Pr,`u`).replace(/punct/g,J).getRegex(),Ir=B(Pr,`u`).replace(/punct/g,Ar).getRegex(),Lr=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,Rr=B(Lr,`gu`).replace(/notPunctSpace/g,Or).replace(/punctSpace/g,Dr).replace(/punct/g,J).getRegex(),zr=B(Lr,`gu`).replace(/notPunctSpace/g,Mr).replace(/punctSpace/g,jr).replace(/punct/g,Ar).getRegex(),Br=B(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,Or).replace(/punctSpace/g,Dr).replace(/punct/g,J).getRegex(),Vr=B(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,J).getRegex(),Hr=B(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Or).replace(/punctSpace/g,Dr).replace(/punct/g,J).getRegex(),Ur=B(/\\(punct)/,`gu`).replace(/punct/g,J).getRegex(),Wr=B(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gr=B(mr).replace(`(?:-->|$)`,`-->`).getRegex(),Kr=B(`^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,Gr).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),qr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,Jr=B(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace(`label`,qr).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Yr=B(/^!?\[(label)\]\[(ref)\]/).replace(`label`,qr).replace(`ref`,ur).getRegex(),Xr=B(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,ur).getRegex(),Zr=B(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,Yr).replace(`nolink`,Xr).getRegex(),Qr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$r={_backpedal:G,anyPunctuation:Ur,autolink:Wr,blockSkip:Nr,br:Tr,code:wr,del:G,delLDelim:G,delRDelim:G,emStrongLDelim:Fr,emStrongRDelimAst:Rr,emStrongRDelimUnd:Br,escape:Cr,link:Jr,nolink:Xr,punctuation:kr,reflink:Yr,reflinkSearch:Zr,tag:Kr,text:Er,url:G},ei={...$r,link:B(/^!?\[(label)\]\((.*?)\)/).replace(`label`,qr).getRegex(),reflink:B(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,qr).getRegex()},ti={...$r,emStrongRDelimAst:zr,emStrongLDelim:Ir,delLDelim:Vr,delRDelim:Hr,url:B(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`protocol`,Qr).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:B(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace(`protocol`,Qr).getRegex()},ni={...ti,br:B(Tr).replace(`{2,}`,`*`).getRegex(),text:B(ti.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},ri={normal:yr,gfm:xr,pedantic:Sr},Y={normal:$r,gfm:ti,breaks:ni,pedantic:ei},ii={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},ai=e=>ii[e],oi=class{options;rules;lexer;constructor(e){this.options=e||W}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Jn(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Qn(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=H(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:H(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:H(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=H(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`)break;if(u?.type===`blockquote`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.blockquote(a);i[i.length-1]=o,n=n.substring(0,n.length-t.raw.length)+o.raw,r=r.substring(0,r.length-t.text.length)+o.text;break}else if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o,n=n.substring(0,n.length-u.raw.length)+o.raw,r=r.substring(0,r.length-t.raw.length)+o.raw,e=a.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:`list`,raw:``,ordered:r,start:r?+n.slice(0,-1):``,loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:`[*+-]`);let a=this.rules.other.listItemRegex(n),o=!1;for(;e;){let n=!1,r=``,s=``;if(!(t=a.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let c=Xn(t[2].split(`
`,1)[0],t[1].length),l=e.split(`
`,1)[0],u=!c.trim(),d=0;if(this.options.pedantic?(d=2,s=c.trimStart()):u?d=t[1].length+1:(d=c.search(this.rules.other.nonSpaceChar),d=d>4?1:d,s=c.slice(d),d+=t[1].length),u&&this.rules.other.blankLine.test(l)&&(r+=l+`
`,e=e.substring(l.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(d),n=this.rules.other.hrRegex(d),i=this.rules.other.fencesBeginRegex(d),a=this.rules.other.headingBeginRegex(d),o=this.rules.other.htmlBeginRegex(d),f=this.rules.other.blockquoteBeginRegex(d);for(;e;){let p=e.split(`
`,1)[0],m;if(l=p,this.options.pedantic?(l=l.replace(this.rules.other.listReplaceNesting,`  `),m=l):m=l.replace(this.rules.other.tabCharGlobal,`    `),i.test(l)||a.test(l)||o.test(l)||f.test(l)||t.test(l)||n.test(l))break;if(m.search(this.rules.other.nonSpaceChar)>=d||!l.trim())s+=`
`+m.slice(d);else{if(u||c.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||i.test(c)||a.test(c)||n.test(c))break;s+=`
`+l}u=!l.trim(),r+=p+`
`,e=e.substring(p.length+1),c=m.slice(d)}}i.loose||(o?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(o=!0)),i.items.push({type:`list_item`,raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(s),loose:!1,text:s,tokens:[]}),i.raw+=r}let s=i.items.at(-1);if(s)s.raw=s.raw.trimEnd(),s.text=s.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let e of i.items){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,i.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1;if(!i.loose){let t=e.tokens.filter(e=>e.type===`space`);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return i}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Jn(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal,` `),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:H(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=qn(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:H(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(qn(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:H(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=H(e.slice(0,-1),`\\`);if((e.length-t.length)%2==0)return}else{let e=Yn(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let n=t[2],r=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):``;return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Zn(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,`$1`),title:r&&r.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal,` `).toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Zn(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[3])||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=0,c=r[0][0]===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+n);(r=c.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(a=[...i].length,r[3]||r[4]){o+=a;continue}else if((r[5]||r[6])&&n%3&&!((n+a)%3)){s+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+s);let t=[...r[0]][0].length,c=e.slice(0,n+r.index+t+a);if(Math.min(n,a)%2){let e=c.slice(1,-1);return{type:`em`,raw:c,text:e,tokens:this.lexer.inlineTokens(e)}}let l=c.slice(2,-2);return{type:`strong`,raw:c,text:l,tokens:this.lexer.inlineTokens(l)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim;for(s.lastIndex=0,t=t.slice(-1*e.length+n);(r=s.exec(t))!==null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:t[0],escaped:e}}}},X=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||W,this.options.tokenizer=this.options.tokenizer||new oi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:K,block:ri.normal,inline:Y.normal};this.options.pedantic?(t.block=ri.pedantic,t.inline=Y.pedantic):this.options.gfm&&(t.block=ri.gfm,this.options.breaks?t.inline=Y.breaks:t.inline=Y.gfm),this.tokenizer.rules=t}static get rules(){return{block:ri,inline:Y}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(K.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(K.tabCharGlobal,`    `).replace(K.spaceLine,``));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(n=>(i=n.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);i.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let r=t.at(-1);n&&r?.type===`paragraph`?(r.raw+=(r.raw.endsWith(`
`)?``:`
`)+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+i.raw,n.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e;if(this.tokens.links){let e=Object.keys(this.tokens.links);e.length>0&&(n=n.replace(this.tokenizer.rules.inline.reflinkSearch,t=>e.includes(t.slice(t.lastIndexOf(`[`)+1,-1))?`[`+`a`.repeat(t.length-2)+`]`:t))}n=n.replace(this.tokenizer.rules.inline.anyPunctuation,`++`),n=n.replace(this.tokenizer.rules.inline.blockSkip,(e,t,n)=>{let r=n?n.length:0;return e.slice(0,r)+`[`+`a`.repeat(e.length-r-2)+`]`}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(n=>(o=n.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let n=t.at(-1);o.type===`text`&&n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,n,i)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let n=t.at(-1);n?.type===`text`?(n.raw+=o.raw,n.text+=o.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},si=class{options;parser;constructor(e){this.options=e||W}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(K.notSpaceStart)?.[0],i=e.replace(K.endingNewline,``)+`
`;return r?`<pre><code class="language-`+V(r)+`">`+(n?i:V(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:V(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${V(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=Kn(e);if(i===null)return r;e=i;let a=`<a href="`+e+`"`;return t&&(a+=` title="`+V(t)+`"`),a+=`>`+r+`</a>`,a}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Kn(e);if(i===null)return V(n);e=i;let a=`<img src="${e}" alt="${V(n)}"`;return t&&(a+=` title="${V(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:V(e.text)}},ci=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return``+e}image({text:e}){return``+e}br(){return``}checkbox({raw:e}){return e}},Z=class e{options;renderer;textRenderer;constructor(e){this.options=e||W,this.options.renderer=this.options.renderer||new si,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ci}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n||``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e||``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},li=class{options;block;constructor(e){this.options=e||W}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?X.lex:X.lexInline}provideParser(e=this.block){return e?Z.parse:Z.parseInline}},ui=class{defaults=Wn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Z;Renderer=si;TextRenderer=ci;Lexer=X;Tokenizer=oi;Hooks=li;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case`list`:{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new si(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n||``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new oi(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new li;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];li.passThroughHooks.has(n)?t[r]=e=>{if(this.defaults.async&&li.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return X.lex(e,t??this.defaults)}parser(e,t){return Z.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?X.lex:X.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?Z.parse:Z.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?X.lex:X.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?Z.parse:Z.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+V(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}},Q=new ui,U.options=U.setOptions=function(e){return Q.setOptions(e),U.defaults=Q.defaults,Gn(U.defaults),U},U.getDefaults=Wn,U.defaults=W,U.use=function(...e){return Q.use(...e),U.defaults=Q.defaults,Gn(U.defaults),U},U.walkTokens=function(e,t){return Q.walkTokens(e,t)},U.parseInline=Q.parseInline,U.Parser=Z,U.parser=Z.parse,U.Renderer=si,U.TextRenderer=ci,U.Lexer=X,U.lexer=X.lex,U.Tokenizer=oi,U.Hooks=li,U.parse=U,U.options,U.setOptions,U.use,U.walkTokens,U.parseInline,Z.parse,X.lex}));function fi(e,t){if(!(e instanceof HTMLElement))return;let n=A(t?`agents.files.collapsePreview`:`agents.files.expandPreview`);e.classList.toggle(`is-fullscreen`,t),e.setAttribute(`aria-pressed`,String(t)),e.setAttribute(`aria-label`,n),e.setAttribute(`title`,n)}function pi(e){e.querySelector(`.md-preview-dialog__panel`)?.classList.remove(`fullscreen`),fi(e.querySelector(`.md-preview-expand-btn`),!1),e.classList.remove(`fullscreen`)}var mi=e((()=>{j()}));function hi(e){let t=e.trim();return t?t.split(/\s+/).length:0}function gi(e){return e.length===0?0:e.split(/\r?\n/).length}function _i(e){return e<=0?A(`agents.files.emptyDraft`):A(`agents.files.minRead`,{count:String(Math.max(1,Math.round(e/220)))})}function vi(e){let t=e.split(`.`).pop()?.trim().toLowerCase();return t===`md`||t===`markdown`?A(`agents.files.markdownPreview`):t?A(`agents.files.extensionPreview`,{ext:t.toUpperCase()}):A(`agents.files.preview`)}function yi(e,t){let n=e.trim(),r=t?.trim();if(!n)return``;if(r&&n===r)return`.`;if(r&&n.startsWith(`${r}/`))return n.slice(r.length+1)||`.`;let i=n.split(/[\\/]+/);for(let e=i.length-1;e>=0;--e){let t=i[e];if(t)return t}return n}function bi(e){return e.toLowerCase().replace(/[^a-z0-9]+/g,`-`).replace(/^-+|-+$/g,``)||`preview`}function xi(e,t,n){return F({title:A(`agents.context.title`),description:t},D`
      <dl class="settings-kv">
        <dt>${A(`agents.context.workspace`)}</dt>
        <dd>
          <button type="button" class="workspace-link mono" @click=${()=>n(`files`)}>
            ${e.workspace}
          </button>
        </dd>
        <dt>${A(`agents.context.primaryModel`)}</dt>
        <dd><code>${e.model}</code></dd>
        <dt>${A(`agents.context.runtime`)}</dt>
        <dd><code>${e.runtime}</code></dd>
        <dt>${A(`agents.context.identityName`)}</dt>
        <dd>${e.identityName}</dd>
        <dt>${A(`agents.context.identityAvatar`)}</dt>
        <dd>${e.identityAvatar}</dd>
        <dt>${A(`agents.context.skillsFilter`)}</dt>
        <dd>${e.skillsLabel}</dd>
        <dt>${A(`agents.context.default`)}</dt>
        <dd>${e.isDefault?A(`common.yes`):A(`common.no`)}</dd>
      </dl>
    `)}function Si(e,t){let n=e.channelMeta?.find(e=>e.id===t);return n?.label?n.label:e.channelLabels?.[t]??t}function Ci(e){if(!e)return[];let t=new Set;for(let n of e.channelOrder??[])t.add(n);for(let n of e.channelMeta??[])t.add(n.id);for(let n of Object.keys(e.channelAccounts??{}))t.add(n);let n=[],r=e.channelOrder?.length?e.channelOrder:Array.from(t);for(let e of r)t.has(e)&&(n.push(e),t.delete(e));for(let e of t)n.push(e);return n.map(t=>({id:t,label:Si(e,t),accounts:e.channelAccounts?.[t]??[]}))}function wi(e){let t=0,n=0,r=0;for(let i of e){let e=i.probe&&typeof i.probe==`object`&&`ok`in i.probe?!!i.probe.ok:!1,a=typeof i.connected==`boolean`||typeof i.running==`boolean`;(i.connected===!0||i.running===!0||!a&&e)&&(t+=1),i.configured&&(n+=1),i.enabled&&(r+=1)}return{total:e.length,connected:t,configured:n,enabled:r}}function Ti(e){let t=Ci(e.snapshot),n=e.lastSuccess?x(e.lastSuccess):A(`common.never`);return D`
    ${xi(e.context,A(`agents.context.configurationSubtitle`),e.onSelectPanel)}
    ${e.error?D`<div class="callout danger">${e.error}</div>`:E}
    ${e.snapshot?E:D`<div class="callout info">${A(`agents.channels.loadHint`)}</div>`}
    ${F({title:A(`agents.channels.title`),description:D`${A(`agents.channels.subtitle`)}
        ${A(`agents.channels.lastRefresh`,{time:n})}`,actions:D`
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?A(`common.refreshing`):A(`common.refresh`)}
          </button>
        `},t.length===0?P(A(`agents.channels.empty`)):t.map(t=>{let n=wi(t.accounts),r=n.total?A(`agents.channels.connectedCount`,{connected:String(n.connected),total:String(n.total)}):A(`agents.channels.noAccounts`),i=n.configured?A(`agents.channels.configuredCount`,{count:String(n.configured)}):A(`agents.channels.notConfigured`),a=n.total?A(`agents.channels.enabledCount`,{count:String(n.enabled)}):A(`common.disabled`),o=De({configForm:e.configForm,channelId:t.id,fields:Oi}),s=[t.id,i,a,...o.map(e=>`${e.label}: ${e.value}`)];return N({title:t.label,description:s.join(` · `),control:D`
                ${n.configured===0?D`
                      <a
                        class="settings-row__value"
                        href="https://docs.openclaw.ai/channels"
                        target="_blank"
                        rel="noopener"
                        >${A(`agents.channels.setupGuide`)}</a
                      >
                    `:E}
                ${gt({kind:n.connected>0?`ok`:n.total?`warn`:`muted`,label:r})}
              `})}))}
  `}function Ei(e){return D`
    ${xi(e.context,A(`agents.context.schedulingSubtitle`),e.onSelectPanel)}
    ${e.error?D`<div class="callout danger">${e.error}</div>`:E}
    ${F({title:A(`agents.cronPanel.schedulerTitle`),description:A(`agents.cronPanel.schedulerSubtitle`),actions:D`
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?A(`common.refreshing`):A(`common.refresh`)}
          </button>
        `},D`
        ${N({title:A(`common.enabled`),control:_t(e.status?e.status.enabled?A(`common.yes`):A(`common.no`):A(`common.na`))})}
        ${N({title:A(`agents.cronPanel.jobs`),control:_t(e.scopedTotal??A(`common.na`))})}
        ${N({title:A(`agents.cronPanel.nextWake`),control:_t(Lt(e.status?.enabled===!1?null:e.scopedNextWakeAtMs))})}
      `)}
    ${F({title:A(`agents.cronPanel.agentJobsTitle`),description:A(`agents.cronPanel.agentJobsSubtitle`)},e.jobs.length===0?P(A(`agents.cronPanel.noJobs`)):D`
            ${e.jobs.map(t=>{let n=[t.description,Rt(t),t.sessionTarget,zt(t),Vt(t)].filter(Boolean);return N({title:t.name,description:n.join(` · `),control:D`
                  ${gt({kind:t.enabled?`ok`:`warn`,label:t.enabled?A(`common.enabled`):A(`common.disabled`)})}
                  <button
                    class="btn btn--sm"
                    ?disabled=${!t.enabled}
                    @click=${()=>e.onRunNow(t.id)}
                  >
                    ${A(`agents.cronPanel.runNow`)}
                  </button>
                `})})}
            ${Ft({jobsShown:e.jobs.length,jobsTotal:e.jobsTotal,hasMore:e.jobsHasMore,loading:e.loading,loadingMore:e.jobsLoadingMore,onLoadMore:e.onLoadMore})}
          `)}
  `}function Di(e){let t=e.agentFilesList?.agentId===e.agentId?e.agentFilesList:null,n=t?.files??[],r=e.agentFileActive??null,i=e=>e.missing&&e.expectedAbsent===!0&&e.name!==r,a=n.filter(e=>!i(e)),o=n.filter(i),s=r?n.find(e=>e.name===r)??null:null,c=r?e.agentFileContents[r]??``:``,l=r?e.agentFileDrafts[r]??c:``,u=r?l!==c:!1,d=s?Ln(U.parse(l,{gfm:!0,breaks:!0}),{sanitize:e=>pt.sanitize(e)}):``,f=y(new TextEncoder().encode(l).length),p=hi(l),m=gi(l),h=s?yi(s.path,t?.workspace):``,g=s?`agent-file-preview-title-${bi(s.name)}`:``,_=s?.missing?A(`agents.files.willCreateOnSave`):A(u?`agents.files.liveDraftPreview`:`agents.files.savedPreview`),v=s?.missing?`is-missing`:u?`is-dirty`:`is-synced`,ee=s?.updatedAtMs?A(`agents.files.updated`,{time:x(s.updatedAtMs)}):s?.missing?A(`agents.files.notCreatedYet`):A(`agents.files.updatedUnknown`);return D`
    ${e.agentFilesError?D`<div class="callout danger">${e.agentFilesError}</div>`:E}
    ${F({title:A(`agents.files.coreFilesTitle`),description:t?D`${A(`agents.files.coreFilesSubtitle`)} ${A(`agents.files.workspace`)}:
              <code>${t.workspace}</code>`:A(`agents.files.coreFilesSubtitle`),actions:D`
          <button
            class="btn btn--sm"
            ?disabled=${e.agentFilesLoading}
            @click=${()=>e.onLoadFiles(e.agentId)}
          >
            ${e.agentFilesLoading?A(`common.loading`):A(`common.refresh`)}
          </button>
        `},t?n.length===0?P(A(`agents.files.empty`)):D`
              <div class="agents-panel-body">
                <div class="agent-file-tabs">
                  ${Tt({id:`agent-files`,active:r,tabs:a.map(t=>({value:t.name,label:t.name.replace(/\.md$/i,``),badge:t.missing&&t.expectedAbsent!==!0?A(`agents.files.missing`):void 0,disabled:e.agentFilesLoading})),ariaLabel:A(`agents.files.coreFilesTitle`),panelId:`agent-file-panel`,variant:`sub`,onSelect:e.onSelectFile})}
                  ${o.length===0?E:D`
                        <select
                          class="agent-tab-add"
                          aria-label=${A(`agents.files.addFile`)}
                          .value=${``}
                          ?disabled=${e.agentFilesLoading}
                          @change=${t=>{let n=t.target,r=n.value;n.value=``,r&&e.onSelectFile(r)}}
                        >
                          <option value="">${A(`agents.files.addFile`)}</option>
                          ${o.map(e=>D`<option value=${e.name}>
                                ${e.name.replace(/\.md$/i,``)}
                              </option>`)}
                        </select>
                      `}
                </div>
                <div
                  id="agent-file-panel"
                  role="tabpanel"
                  aria-labelledby=${r?`agent-files-tab-${r}`:E}
                >
                  ${s?D`
                        <div class="agent-file-header">
                          <div>
                            <div class="agent-file-sub mono">${s.path}</div>
                          </div>
                          <div class="agent-file-actions">
                            <button
                              class="btn btn--sm"
                              @click=${e=>{e.currentTarget.closest(`.settings-group`)?.querySelector(`openclaw-modal-dialog`)?.show()}}
                            >
                              ${M.eye} ${A(`agents.files.preview`)}
                            </button>
                            <button
                              class="btn btn--sm"
                              ?disabled=${!u}
                              @click=${()=>e.onFileReset(s.name)}
                            >
                              ${A(`common.reset`)}
                            </button>
                            <button
                              class="btn btn--sm primary"
                              ?disabled=${e.agentFileSaving||!u}
                              @click=${()=>e.onFileSave(s.name)}
                            >
                              ${e.agentFileSaving?A(`common.saving`):A(`common.save`)}
                            </button>
                          </div>
                        </div>
                        ${s.missing?D`<div class="callout info">
                              ${s.expectedAbsent===!0?A(`agents.files.createHint`):A(`agents.files.missingHint`)}
                            </div>`:E}
                        <label class="field agent-file-field">
                          <span>${A(`agents.files.content`)}</span>
                          <textarea
                            class="agent-file-textarea"
                            .value=${l}
                            @input=${t=>e.onFileDraftChange(s.name,t.target.value)}
                          ></textarea>
                        </label>
                        <openclaw-modal-dialog
                          manual
                          label=${s.name}
                          style="--openclaw-modal-width: min(1040px, calc(100vw - 32px));"
                          @modal-cancel=${e=>{pi(e.currentTarget)}}
                        >
                          <div class="md-preview-dialog__panel">
                            <div class="md-preview-dialog__header">
                              <div class="md-preview-dialog__header-main">
                                <div class="md-preview-dialog__eyebrow">
                                  ${M.scrollText}
                                  <span>${vi(s.name)}</span>
                                </div>
                                <div class="md-preview-dialog__title-wrap">
                                  <div
                                    id=${g}
                                    class="md-preview-dialog__title"
                                    translate="no"
                                  >
                                    ${s.name}
                                  </div>
                                  <div class="md-preview-dialog__path mono" translate="no">
                                    ${h}
                                  </div>
                                </div>
                              </div>
                              <div class="md-preview-dialog__actions">
                                <openclaw-tooltip .content=${A(`agents.files.expandPreview`)}>
                                  <button
                                    type="button"
                                    class="btn btn--sm md-preview-icon-btn md-preview-expand-btn"
                                    aria-label=${A(`agents.files.expandPreview`)}
                                    aria-pressed="false"
                                    @click=${e=>{let t=e.currentTarget,n=t.closest(`.md-preview-dialog__panel`);if(!n)return;let r=n.classList.toggle(`fullscreen`);t.closest(`openclaw-modal-dialog`)?.classList.toggle(`fullscreen`,r),fi(t,r)}}
                                  >
                                    <span class="when-normal" aria-hidden="true"
                                      >${M.maximize}</span
                                    ><span class="when-fullscreen" aria-hidden="true"
                                      >${M.minimize}</span
                                    >
                                  </button>
                                </openclaw-tooltip>
                                <openclaw-tooltip .content=${A(`agents.files.editFile`)}>
                                  <button
                                    type="button"
                                    class="btn btn--sm md-preview-icon-btn"
                                    aria-label=${A(`agents.files.editFile`)}
                                    @click=${e=>{let t=e.currentTarget.closest(`openclaw-modal-dialog`);t?.hide(),t&&pi(t),document.querySelector(`.agent-file-textarea`)?.focus()}}
                                  >
                                    <span aria-hidden="true">${M.edit}</span>
                                  </button>
                                </openclaw-tooltip>
                                <openclaw-tooltip .content=${A(`agents.files.closePreview`)}>
                                  <button
                                    type="button"
                                    class="btn btn--sm md-preview-icon-btn"
                                    aria-label=${A(`agents.files.closePreview`)}
                                    @click=${e=>{let t=e.currentTarget.closest(`openclaw-modal-dialog`);t?.hide(),t&&pi(t)}}
                                  >
                                    <span aria-hidden="true">${M.x}</span>
                                  </button>
                                </openclaw-tooltip>
                              </div>
                            </div>
                            <div class="md-preview-dialog__meta">
                              <div class="md-preview-dialog__chip ${v}">
                                <strong>${_}</strong>
                              </div>
                              <div class="md-preview-dialog__chip">
                                <strong>${_i(p)}</strong>
                                <span
                                  >${A(`agents.files.words`,{count:String(p)})}</span
                                >
                              </div>
                              <div class="md-preview-dialog__chip">
                                <strong>${m}</strong>
                                <span>${A(`agents.files.lines`)}</span>
                              </div>
                              <div class="md-preview-dialog__chip">
                                <strong>${f}</strong>
                                <span>${ee}</span>
                              </div>
                            </div>
                            <div class="md-preview-dialog__body">
                              <article class="md-preview-dialog__reader sidebar-markdown">
                                ${Ne(d)}
                              </article>
                            </div>
                          </div>
                        </openclaw-modal-dialog>
                      `:D`<div class="muted">${A(`agents.files.selectFile`)}</div>`}
                </div>
              </div>
            `:P(A(`agents.files.loadHint`)))}
  `}var Oi,ki=e((()=>{Un(),ft(),Me(),Fe(),di(),It(),Et(),tt(),et(),$e(),xt(),j(),S(),_e(),xe(),Bt(),mi(),Oi=[`groupPolicy`,`streamMode`,`dmPolicy`]}));function Ai(e){return e.length===0?E:D`
    <div class="agent-tool-badges">
      ${e.map(e=>D`<span class="settings-row__value">${e}</span>`)}
    </div>
  `}function ji(e,t){let n=t.source??e.source,r=t.pluginId??e.pluginId,i=[];return n===`plugin`&&r?i.push(A(`agentTools.plugin`,{id:r})):n===`core`&&i.push(A(`agentTools.builtIn`)),t.optional&&i.push(A(`agentTools.optional`)),i}function Mi(e){let t=ji(e.section,e.tool);return e.activeEntry&&t.unshift(A(`agentTools.liveNow`)),t}function Ni(e){return e.denied?A(`agentTools.disabledByOverride`):e.allowed&&e.baseAllowed?A(`agentTools.enabledByProfile`):e.allowed?A(`agentTools.enabledByOverride`):A(`agentTools.notIncluded`)}function Pi(e,t){let n=t.source??e.source,r=t.pluginId??e.pluginId;return n===`plugin`&&r?A(`agentTools.plugin`,{id:r}):A(`agentTools.builtIn`)}function Fi(e){return e.denied?A(`agentTools.overrideOff`):e.allowed&&e.baseAllowed?A(`agentTools.enabled`):e.allowed?A(`agentTools.overrideOn`):A(`agentTools.profileOff`)}function Ii(e){return e.activeEntry?A(`agentTools.liveNow`):e.runtimeSessionMatchesSelectedAgent?A(`agentTools.notLive`):A(`agentTools.otherAgent`)}function Li(e){return`agent-tool-${k(e).replace(/[^a-z0-9_-]+/g,`-`)}`}function Ri(e){return(e??[]).flatMap(e=>e.tools)}function zi(e){let t=e.currentTarget;if(!(!(t instanceof HTMLDetailsElement)||t.open))for(let e of t.querySelectorAll(`.agent-tool-card[open]`))e.open=!1}function Bi(e,t){let n=document.getElementById(t);if(!(n instanceof HTMLDetailsElement))return;e.preventDefault();let r=n.closest(`.agent-tools-group`);r&&(r.open=!0),n.open=!0;let i=new URL(window.location.href);i.hash=t,window.history.replaceState(null,``,i),requestAnimationFrame(()=>{let e=typeof window.matchMedia==`function`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;n.scrollIntoView?.({block:`center`,behavior:e?`auto`:`smooth`}),n.querySelector(`summary`)?.focus()})}function Vi(e){let t=e?.notices??[];return t.length===0?E:D`
    <div class="agent-tools-notices">
      ${t.map(e=>D`
          <div
            class="callout ${e.severity===`warning`?`warning`:`info`}"
            style="margin-top: 12px"
          >
            ${e.message}
          </div>
        `)}
    </div>
  `}function Hi(e){return e.source===`plugin`?e.pluginId?A(`agentTools.connectedSource`,{id:e.pluginId}):A(`agentTools.connected`):e.source===`channel`?e.channelId?A(`agentTools.channelSource`,{id:e.channelId}):A(`agentTools.channel`):e.source===`mcp`?`MCP`:A(`agentTools.builtIn`)}function Ui(e){let t=p(e.configForm,e.agentId),n=t.entry?.tools??{},r=t.globalTools??{},i=n.profile??r.profile??`full`,a=o(e.toolsCatalogResult),s=he(e.toolsCatalogResult),c=n.profile?A(`agentTools.profileSourceAgent`):r.profile?A(`agentTools.profileSourceGlobal`):A(`agentTools.profileSourceDefault`),l=Array.isArray(n.allow)&&n.allow.length>0,u=Array.isArray(r.allow)&&r.allow.length>0,d=!!e.configForm&&!e.configLoading&&!e.configSaving&&!l&&!(e.toolsCatalogLoading&&!e.toolsCatalogResult&&!e.toolsCatalogError),f=l?[]:Array.isArray(n.alsoAllow)?n.alsoAllow:[],m=l?[]:Array.isArray(n.deny)?n.deny:[],h=l?{allow:n.allow??[],deny:n.deny??[]}:re(i)??void 0,g=s.flatMap(e=>e.tools.map(e=>e.id)),_=e=>{let t=ke(e,h),n=ce(e,f),r=ce(e,m);return{allowed:(t||n)&&!r,baseAllowed:t,denied:r}},v=g.filter(e=>_(e).allowed).length,ee=e.runtimeSessionMatchesSelectedAgent&&!e.toolsEffectiveError?Ri(e.toolsEffectiveResult?.groups):[],y=Array.from(new Map(ee.map(e=>[k(e.id),e])).values()),te=y.slice(0,qi),b=Math.max(0,y.length-te.length),ne=y.length,x=new Map(ee.map(e=>[k(e.id),e])),S=new Set(x.keys()),ie=e=>e.toSorted((e,t)=>{let n=k(e.id),r=k(t.id),i=+!!S.has(n),a=+!!S.has(r);if(i!==a)return a-i;let o=+!!_(e.id).allowed,s=+!!_(t.id).allowed;return o===s?e.label.localeCompare(t.label):s-o}),C=(t,n)=>{let r=new Set(f.map(e=>k(e)).filter(e=>e.length>0)),i=new Set(m.map(e=>k(e)).filter(e=>e.length>0)),a=_(t).baseAllowed,o=k(t);n?(i.delete(o),a||r.add(o)):(r.delete(o),i.add(o)),e.onOverridesChange(e.agentId,[...r],[...i])},w=t=>{let n=new Set(f.map(e=>k(e)).filter(e=>e.length>0)),r=new Set(m.map(e=>k(e)).filter(e=>e.length>0));for(let e of g){let i=_(e).baseAllowed,a=k(e);t?(r.delete(a),i||n.add(a)):(n.delete(a),r.add(a))}e.onOverridesChange(e.agentId,[...n],[...r])},ae=e.runtimeSessionMatchesSelectedAgent?e.toolsEffectiveLoading&&!e.toolsEffectiveResult&&!e.toolsEffectiveError?P(A(`agentTools.loadingAvailable`)):e.toolsEffectiveError?P(A(`agentTools.availableError`)):(e.toolsEffectiveResult?.groups?.length??0)===0?P(A(`agentTools.noAvailable`)):D`
              <div class="agents-panel-body">
                <div class="agent-tools-runtime">
                  ${te.map(e=>{let t=Li(e.id);return D`
                      <a
                        class="agent-tools-runtime-chip"
                        href="#${t}"
                        @click=${e=>Bi(e,t)}
                      >
                        <span class="mono" translate="no">${e.label}</span>
                        <span class="agent-tools-runtime-chip__meta"
                          >${Hi(e)}</span
                        >
                      </a>
                    `})}
                  ${b>0?D`
                        <span
                          class="agent-tools-runtime-chip agent-tools-runtime-chip--more"
                          title=${A(`agentTools.moreLiveTitle`,{count:String(b)})}
                        >
                          ${A(`agentTools.moreLive`,{count:String(b)})}
                        </span>
                      `:E}
                </div>
              </div>
            `:P(A(`agentTools.switchAgent`));return D`
    ${e.configForm?E:D`<div class="callout info">${A(`agentTools.loadConfig`)}</div>`}
    ${l?D`<div class="callout info">${A(`agentTools.explicitAllowlist`)}</div>`:E}
    ${u?D`<div class="callout info">${A(`agentTools.globalAllowlist`)}</div>`:E}
    ${e.toolsCatalogLoading&&!e.toolsCatalogResult&&!e.toolsCatalogError?D`<div class="callout info">${A(`agentTools.loadingCatalog`)}</div>`:E}
    ${e.toolsCatalogError?D`<div class="callout info">${A(`agentTools.catalogFallback`)}</div>`:E}
    ${F({title:A(`agentTools.title`),description:D`${A(`agentTools.subtitle`)}
          <span class="mono"
            >${A(`agentTools.enabledSummary`,{enabled:String(v),total:String(g.length)})}</span
          >`,actions:D`
          <button class="btn btn--sm" ?disabled=${!d} @click=${()=>w(!0)}>
            ${A(`agentTools.enableAll`)}
          </button>
          <button class="btn btn--sm" ?disabled=${!d} @click=${()=>w(!1)}>
            ${A(`agentTools.disableAll`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            ${A(`common.reloadConfig`)}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?A(`common.saving`):A(`common.save`)}
          </button>
        `},D`
        <dl class="settings-kv">
          <dt>${A(`agentTools.profile`)}</dt>
          <dd><code>${i}</code></dd>
          <dt>${A(`agentTools.source`)}</dt>
          <dd>${c}</dd>
          <dt>${A(`agentTools.enabled`)}</dt>
          <dd><code>${v}/${g.length}</code></dd>
          <dt>${A(`agentTools.live`)}</dt>
          <dd><code>${ne}</code></dd>
          <dt>${A(`agentTools.status`)}</dt>
          <dd>
            ${e.configSaving?A(`agentTools.statusSaving`):e.configDirty?A(`agentTools.statusUnsaved`):A(`agentTools.statusSaved`)}
          </dd>
        </dl>
        ${N({title:A(`agentTools.quickPresets`),stacked:!0,control:D`
            <div class="agent-tools-buttons">
              ${a.map(t=>D`
                  <button
                    class="btn btn--sm ${i===t.id?`active`:``}"
                    ?disabled=${!d}
                    @click=${()=>e.onProfileChange(e.agentId,t.id,!0)}
                  >
                    ${t.label}
                  </button>
                `)}
              <button
                class="btn btn--sm"
                ?disabled=${!d}
                @click=${()=>e.onProfileChange(e.agentId,null,!1)}
              >
                ${A(`agentTools.inherit`)}
              </button>
            </div>
          `})}
      `)}
    ${F({title:A(`agentTools.availableNow`),description:D`${A(`agentTools.availableNowSubtitle`)}
          <span class="mono">${e.runtimeSessionKey||A(`agentTools.noSession`)}</span>`},D`${Vi(e.toolsEffectiveResult)}${ae}`)}
    ${F({title:A(`agentTools.catalogTitle`)},D`
        <div class="agents-panel-body agent-tools-grid">
          ${s.map(t=>{let n=ie(t.tools),r=t.tools.filter(e=>_(e.id).allowed).length,i=t.tools.filter(e=>S.has(k(e.id))).length,a=n.slice(0,4),o=Math.max(0,n.length-a.length);return D`
              <details class="agent-tools-group" @toggle=${zi}>
                <summary class="agent-tools-group__summary">
                  <span class="agent-tools-group__summary-main">
                    <span class="agent-tools-group__title">
                      ${t.label}
                      ${t.source===`plugin`&&t.pluginId?D`<span class="settings-row__value"
                            >${A(`agentTools.plugin`,{id:t.pluginId})}</span
                          >`:E}
                    </span>
                    <span
                      class="agent-tools-group__preview"
                      aria-label=${A(`agentTools.toolPreview`)}
                    >
                      ${a.map(e=>D`<span class="mono" translate="no" title=${e.label}
                            >${e.label}</span
                          >`)}
                      ${o>0?D`<span
                            >${A(`agentTools.more`,{count:String(o)})}</span
                          >`:E}
                    </span>
                  </span>
                  <span class="agent-tools-group__counts">
                    <span
                      >${A(t.tools.length===1?`agentTools.toolsOne`:`agentTools.tools`,{count:String(t.tools.length)})}</span
                    >
                    <span
                      >${A(r===1?`agentTools.enabledToolsOne`:`agentTools.enabledTools`,{count:String(r)})}</span
                    >
                    ${i>0?D`<span
                          >${A(i===1?`agentTools.liveToolsOne`:`agentTools.liveTools`,{count:String(i)})}</span
                        >`:E}
                  </span>
                </summary>
                <div class="agent-tools-list agent-tools-list--stacked">
                  ${n.map(n=>{let r=Li(n.id),i=_(n.id),a=x.get(k(n.id))??null,o=n.defaultProfiles??[],s=Mi({section:t,tool:n,activeEntry:a}),c=Fi(i),l=Ii({activeEntry:a,runtimeSessionMatchesSelectedAgent:e.runtimeSessionMatchesSelectedAgent});return D`
                      <details class="agent-tool-card" id=${r}>
                        <summary class="agent-tool-summary">
                          <div class="agent-tool-summary__main">
                            <div class="agent-tool-summary__title-row">
                              <span class="agent-tool-title mono" translate="no"
                                >${n.label}</span
                              >
                            </div>
                            <div class="agent-tool-sub">${n.description}</div>
                          </div>
                          <dl class="agent-tool-summary__facts">
                            <div class="agent-tool-summary__fact">
                              <dt class="label">${A(`agentTools.access`)}</dt>
                              <dd>${c}</dd>
                            </div>
                            <div class="agent-tool-summary__fact">
                              <dt class="label">${A(`agentTools.session`)}</dt>
                              <dd>${l}</dd>
                            </div>
                          </dl>
                          <div class="agent-tool-summary__badges">
                            ${Ai(s)}
                          </div>
                          <span
                            class="agent-tool-toggle"
                            @click=${e=>e.stopPropagation()}
                            @keydown=${e=>e.stopPropagation()}
                          >
                            ${bt({checked:i.allowed,disabled:!d,ariaLabel:A(i.allowed?`agentTools.disableNamed`:`agentTools.enableNamed`,{name:n.label}),onChange:e=>C(n.id,e)})}
                          </span>
                        </summary>
                        <div class="agent-tool-details">
                          <div class="agent-tool-details-strip">
                            <div class="agent-tool-detail agent-tool-detail--inline">
                              <div class="label">${A(`agentTools.access`)}</div>
                              <div>${Ni(i)}</div>
                            </div>
                            <div class="agent-tool-detail agent-tool-detail--inline">
                              <div class="label">${A(`agentTools.source`)}</div>
                              <div>${Pi(t,n)}</div>
                            </div>
                            ${o.length>0?D`
                                  <div class="agent-tool-detail agent-tool-detail--inline">
                                    <div class="label">${A(`agentTools.defaultPresets`)}</div>
                                    <div class="agent-tool-badges">
                                      ${o.map(e=>D`<span class="settings-row__value"
                                            >${e}</span
                                          >`)}
                                    </div>
                                  </div>
                                `:E}
                            <div class="agent-tool-detail agent-tool-detail--inline">
                              <div class="label">${A(`agentTools.session`)}</div>
                              <div>
                                ${a?A(`agentTools.availableVia`,{source:Hi(a)}):e.runtimeSessionMatchesSelectedAgent?A(`agentTools.unavailableSession`):A(`agentTools.inspectAgent`)}
                              </div>
                            </div>
                            <a class="agent-tool-jump" href="#${r}">
                              ${A(`agentTools.linkTool`)}
                            </a>
                          </div>
                        </div>
                      </details>
                    `})}
                </div>
              </details>
            `})}
        </div>
      `)}
  `}function Wi(e){let t=!!e.configForm&&!e.configLoading&&!e.configSaving,n=p(e.configForm,e.agentId),r=Array.isArray(n.entry?.skills)?n.entry?.skills:void 0,i=new Set(Xe(r??[])),a=r!==void 0,o=!!(e.report&&e.activeAgentId===e.agentId),s=o?e.report?.skills??[]:[],c=Qe(e.filter),l=c?s.filter(e=>Qe([e.name,e.description,e.source].join(` `)).includes(c)):s,u=At(l),d=a?s.filter(e=>i.has(e.name)).length:s.length,f=s.length;return D`
    ${e.configForm?E:D`<div class="callout info">${A(`agents.skillsPanel.loadConfig`)}</div>`}
    ${a?D`<div class="callout info">${A(`agents.skillsPanel.customAllowlist`)}</div>`:D`<div class="callout info">${A(`agents.skillsPanel.allEnabled`)}</div>`}
    ${!o&&!e.loading?D`<div class="callout info">${A(`agents.skillsPanel.loadAgent`)}</div>`:E}
    ${e.error?D`<div class="callout danger">${e.error}</div>`:E}
    ${F({title:A(`agents.skillsPanel.title`),description:D`${A(`agents.skillsPanel.subtitle`)}
        ${f>0?D`<span class="mono">${d}/${f}</span>`:E}`,actions:D`
          <button
            class="btn btn--sm"
            ?disabled=${!t}
            @click=${()=>e.onClear(e.agentId)}
          >
            ${A(`agentTools.enableAll`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!t}
            @click=${()=>e.onDisableAll(e.agentId)}
          >
            ${A(`agentTools.disableAll`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${!t||!a}
            @click=${()=>e.onClear(e.agentId)}
          >
            ${A(`common.reset`)}
          </button>
          <button
            class="btn btn--sm"
            ?disabled=${e.configLoading}
            @click=${e.onConfigReload}
          >
            ${A(`common.reloadConfig`)}
          </button>
          <button class="btn btn--sm" ?disabled=${e.loading} @click=${e.onRefresh}>
            ${e.loading?A(`common.loading`):A(`common.refresh`)}
          </button>
          <button
            class="btn btn--sm primary"
            ?disabled=${e.configSaving||!e.configDirty}
            @click=${e.onConfigSave}
          >
            ${e.configSaving?A(`common.saving`):A(`common.save`)}
          </button>
        `},D`
        ${N({title:A(`agents.skillsPanel.filter`),description:A(`agents.skillsPanel.shown`,{count:String(l.length)}),control:D`
            <input
              class="settings-input"
              .value=${e.filter}
              @input=${t=>e.onFilterChange(t.target.value)}
              placeholder=${A(`agents.skillsPanel.searchPlaceholder`)}
              autocomplete="off"
              name="agent-skills-filter"
            />
          `})}
        ${l.length===0?P(A(`agents.skillsPanel.empty`)):D`
              <div class="agents-panel-body agent-skills-groups">
                ${u.map(n=>Gi(n,{agentId:e.agentId,allowSet:i,usingAllowlist:a,editable:t,onToggle:e.onToggle}))}
              </div>
            `}
      `)}
  `}function Gi(e,t){return D`
    <details class="agent-skills-group" ?open=${!(e.id===`workspace`||e.id===`built-in`)}>
      <summary class="agent-skills-header">
        <span>${e.label}</span>
        <span class="muted">${e.skills.length}</span>
      </summary>
      <div class="list skills-grid">
        ${e.skills.map(e=>Ki(e,{agentId:t.agentId,allowSet:t.allowSet,usingAllowlist:t.usingAllowlist,editable:t.editable,onToggle:t.onToggle}))}
      </div>
    </details>
  `}function Ki(e,t){let n=!t.usingAllowlist||t.allowSet.has(e.name),r=Nt(e),i=kt(e);return D`
    <div class="settings-row agent-skill-row">
      <div class="settings-row__text">
        <span class="settings-row__title"
          >${e.emoji?`${e.emoji} `:``}${e.name}</span
        >
        <span class="settings-row__desc">${e.description}</span>
        ${Dt({skill:e})}
        ${r.length>0?D`<span class="settings-row__desc">
              ${A(`agents.skillsPanel.missing`,{items:r.join(`, `)})}
            </span>`:E}
        ${i.length>0?D`<span class="settings-row__desc">
              ${A(`agents.skillsPanel.reason`,{items:i.join(`, `)})}
            </span>`:E}
      </div>
      <div class="settings-row__control">
        ${bt({checked:n,disabled:!t.editable,ariaLabel:e.name,onChange:n=>t.onToggle(t.agentId,e.name,n)})}
      </div>
    </div>
  `}var qi,Ji=e((()=>{Me(),Ze(),xt(),j(),S(),Mt(),jt(),m(),qi=12}));function Yi(e){let t=e.agentsList?.agents??[],n=e.agentsList?.defaultId??null,r=e.selectedAgentId??n??t[0]?.id??null,i=r?t.find(e=>e.id===r)??null:null,a=t.map(e=>({value:e.id,label:h(e),agent:e,badge:ne(e.id,n)??void 0})),o=r&&e.agentSkills.agentId===r?e.agentSkills.report?.skills?.length??null:null,s=e.channels.snapshot?Object.keys(e.channels.snapshot.channelAccounts??{}).length:null,c=r?e.cron.jobsTotal:null,l={files:e.agentFiles.list?.files?.length??null,skills:o,channels:s,cron:c||null};return D`
    <div class="agents-layout">
      <section class="agents-toolbar">
        <div class="agents-toolbar-row">
          <div class="agents-control-select">
            <openclaw-agent-select
              .options=${a}
              .value=${r??``}
              .accessibleLabel=${A(`usage.filters.agent`)}
              .identityById=${e.agentIdentityById}
              .authToken=${e.authToken}
              .disabled=${e.loading}
              .onSelect=${e.onSelectAgent}
              .onCreateAgent=${e.onCreateAgent}
            ></openclaw-agent-select>
          </div>
          <div class="agents-toolbar-actions">
            ${i?D`
                  <button
                    type="button"
                    class="btn btn--sm btn--ghost"
                    @click=${()=>void rt(i.id)}
                  >
                    ${A(`agents.copyId`)}
                  </button>
                  <button
                    type="button"
                    class="btn btn--sm btn--ghost"
                    ?disabled=${!!(n&&i.id===n)}
                    @click=${()=>e.onSetDefault(i.id)}
                  >
                    ${n&&i.id===n?A(`agents.default`):A(`agents.setDefault`)}
                  </button>
                  <button
                    type="button"
                    class="btn btn--sm btn--ghost"
                    @click=${()=>e.onTogglePinnedAgent(i.id)}
                  >
                    ${e.pinnedAgentIds.includes(i.id)?A(`agents.unpinFromSwitcher`):A(`agents.pinToSwitcher`)}
                  </button>
                `:E}
            <button
              class="btn btn--sm agents-refresh-btn"
              ?disabled=${e.loading}
              @click=${e.onRefresh}
            >
              ${e.loading?A(`common.loading`):A(`common.refresh`)}
            </button>
          </div>
        </div>
        ${e.error?D`<div class="callout danger" style="margin-top: 8px;">${e.error}</div>`:E}
      </section>
      <section class="agents-main">
        <div class="settings-group">
          ${yt({title:A(`agents.defaults.title`),description:A(`agents.defaults.description`),onClick:e.onOpenAgentDefaults})}
        </div>
        ${i?D`
              ${Xi(e.activePanel,t=>e.onSelectPanel(t),l)}
              <div
                id="agent-panel"
                role="tabpanel"
                aria-labelledby=${`agents-tab-${e.activePanel}`}
              >
                ${e.config.error?D`<div class="callout danger" role="alert">${e.config.error}</div>`:E}
                ${e.activePanel===`overview`?Ie(i.id,vn({agent:i,basePath:e.basePath,defaultId:n,configForm:e.config.form,agentFilesList:e.agentFiles.list,agentIdentity:e.agentIdentityById[i.id]??null,agentIdentityError:e.agentIdentityError,agentIdentityLoading:e.agentIdentityLoading,identityDraft:e.identityDraft,identitySaving:e.identitySaving,identityError:e.identityError,configLoading:e.config.loading,configSaving:e.config.saving,configDirty:e.config.dirty,modelCatalog:e.modelCatalog,modelCatalogError:e.modelCatalogError,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave,onIdentityFieldChange:e.onIdentityFieldChange,onIdentityAvatarSelect:e.onIdentityAvatarSelect,onIdentitySave:e.onIdentitySave,onModelChange:e.onModelChange,onModelFallbacksChange:e.onModelFallbacksChange,onModelCatalogRetry:e.onModelCatalogRetry,onSelectPanel:e.onSelectPanel})):E}
                ${e.activePanel===`files`?Di({agentId:i.id,agentFilesList:e.agentFiles.list,agentFilesLoading:e.agentFiles.loading,agentFilesError:e.agentFiles.error,agentFileActive:e.agentFiles.active,agentFileContents:e.agentFiles.contents,agentFileDrafts:e.agentFiles.drafts,agentFileSaving:e.agentFiles.saving,onLoadFiles:e.onLoadFiles,onSelectFile:e.onSelectFile,onFileDraftChange:e.onFileDraftChange,onFileReset:e.onFileReset,onFileSave:e.onFileSave}):E}
                ${e.activePanel===`tools`?Ui({agentId:i.id,configForm:e.config.form,configLoading:e.config.loading,configSaving:e.config.saving,configDirty:e.config.dirty,toolsCatalogLoading:e.toolsCatalog.loading,toolsCatalogError:e.toolsCatalog.error,toolsCatalogResult:e.toolsCatalog.result,toolsEffectiveLoading:e.toolsEffective.loading,toolsEffectiveError:e.toolsEffective.error,toolsEffectiveResult:e.toolsEffective.result,runtimeSessionKey:e.runtimeSessionKey,runtimeSessionMatchesSelectedAgent:e.runtimeSessionMatchesSelectedAgent,onProfileChange:e.onToolsProfileChange,onOverridesChange:e.onToolsOverridesChange,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):E}
                ${e.activePanel===`skills`?Wi({agentId:i.id,report:e.agentSkills.report,loading:e.agentSkills.loading,error:e.agentSkills.error,activeAgentId:e.agentSkills.agentId,configForm:e.config.form,configLoading:e.config.loading,configSaving:e.config.saving,configDirty:e.config.dirty,filter:e.agentSkills.filter,onFilterChange:e.onSkillsFilterChange,onRefresh:e.onSkillsRefresh,onToggle:e.onAgentSkillToggle,onClear:e.onAgentSkillsClear,onDisableAll:e.onAgentSkillsDisableAll,onConfigReload:e.onConfigReload,onConfigSave:e.onConfigSave}):E}
                ${e.activePanel===`channels`?Ti({context:f(i,e.config.form,e.agentFiles.list,n,e.agentIdentityById[i.id]??null),configForm:e.config.form,snapshot:e.channels.snapshot,loading:e.channels.loading,error:e.channels.error,lastSuccess:e.channels.lastSuccess,onRefresh:e.onChannelsRefresh,onSelectPanel:e.onSelectPanel}):E}
                ${e.activePanel===`cron`?Ei({context:f(i,e.config.form,e.agentFiles.list,n,e.agentIdentityById[i.id]??null),agentId:i.id,jobs:e.cron.jobs,jobsTotal:e.cron.jobsTotal,jobsHasMore:e.cron.jobsHasMore,jobsLoadingMore:e.cron.jobsLoadingMore,status:e.cron.status,scopedTotal:e.cron.scopedTotal,scopedNextWakeAtMs:e.cron.scopedNextWakeAtMs,loading:e.cron.loading,error:e.cron.error,onRefresh:e.onCronRefresh,onLoadMore:e.onCronLoadMore,onRunNow:e.onCronRunNow,onSelectPanel:e.onSelectPanel}):E}
                ${e.activePanel===`memory`?D`
                      <div class="settings-group agent-memory-import-row">
                        ${yt({title:A(`tabs.memory`),description:A(`subtitles.memory`),onClick:()=>e.onOpenMemorySettings?.()})}
                        ${yt({title:A(`tabs.memoryImport`),description:A(`subtitles.memoryImport`),onClick:()=>e.onOpenMemoryImport?.()})}
                      </div>
                      <openclaw-agent-memory-panel
                        .agentId=${i.id}
                      ></openclaw-agent-memory-panel>
                    `:E}
              </div>
            `:F({title:A(`agents.selectTitle`)},P(A(`agents.selectSubtitle`)))}
      </section>
    </div>
  `}function Xi(e,t,n){return Tt({id:`agents`,active:e,tabs:[{id:`overview`,label:A(`agents.tabs.overview`)},{id:`files`,label:A(`agents.tabs.files`)},{id:`tools`,label:A(`agents.tabs.tools`)},{id:`skills`,label:A(`agents.tabs.skills`)},{id:`channels`,label:A(`agents.tabs.channels`)},{id:`cron`,label:A(`agents.tabs.cronJobs`)},{id:`memory`,label:A(`agents.tabs.memory`)}].map(e=>({value:e.id,label:e.label,count:n[e.id]})),ariaLabel:A(`tabs.agents`),panelId:`agent-panel`,onSelect:t})}var Zi=e((()=>{Me(),Ae(),wt(),Et(),xt(),j(),S(),nt(),_n(),Ot(),Pt(),yn(),ki(),Ji()})),Qi,$;e((()=>{Re(),Me(),je(),We(),qe(),He(),xt(),ht(),j(),S(),C(),T(),ve(),lt(),ge(),m(),St(),v(),se(),Gt(),on(),un(),mn(),gn(),Zi(),n(),Qi=`https://docs.openclaw.ai/concepts/multi-agent`,$=class extends le{constructor(...e){super(...e),this.agentsList=null,this.agentsSelectedId=null,this.toolsCatalogLoading=!1,this.toolsCatalogLoadingAgentId=null,this.toolsCatalogError=null,this.toolsCatalogResult=null,this.toolsEffectiveLoading=!1,this.toolsEffectiveLoadingKey=null,this.toolsEffectiveResultKey=null,this.toolsEffectiveError=null,this.toolsEffectiveResult=null,this.chatModelCatalog=[],this.chatModelCatalogError=null,this.agentFilesLoading=!1,this.agentFilesError=null,this.agentFilesList=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFileActive=null,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentIdentityError=null,this.identityDraft={name:null,emoji:null,avatar:null},this.identitySaving=!1,this.identityError=null,this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsReport=null,this.agentSkillsAgentId=null,this.skillsFilter=``,this.cron=ct(),this.routeDataInitialized=!1,this.hasBoundAgents=!1,this.agentsSource=null,this.hasBoundAgentIdentity=!1,this.agentIdentitySource=null,this.hasBoundSessions=!1,this.sessionsSource=null,this.chatModelCatalogClient=null,this.chatModelCatalogAgentId=null,this.chatModelCatalogByAgentId=new Map,this.chatModelCatalogRequest=null,this.normalizedLocation=``,this.gateway=new Ct(this,{getGateway:()=>this.context?.gateway,onIdentityChange:()=>this.resetForClientChange(),invalidateRequests:e=>{e.identityChanged||(this.invalidateTransientRequests(),this.chatModelCatalog=[],this.chatModelCatalogClient=null,this.chatModelCatalogAgentId=null,this.chatModelCatalogByAgentId.clear(),this.chatModelCatalogError=null)},onSnapshot:()=>this.syncGatewayState(),ensureInitialData:()=>this.ensureInitialData()}),this.subscriptions=new s(this).effect(()=>this.context?.agents,e=>{let t=this.hasBoundAgents;this.hasBoundAgents=!0,this.agentsSource=e,t&&this.resetForAgentsSourceChange(),this.syncAgentState(e),this.ensureInitialData();let n=e.subscribe(()=>{this.agentsSource!==e||this.context.agents!==e||(this.syncAgentState(e),this.ensureAgentIdentities(),this.loadActivePanelData(),this.requestUpdate())});return()=>{n(),this.agentsSource===e&&(this.agentsSource=null)}}).effect(()=>this.context?.agentIdentity,e=>{let t=this.hasBoundAgentIdentity;this.hasBoundAgentIdentity=!0,this.agentIdentitySource=e,t&&(this.invalidateTransientRequests(),this.agentIdentityError=null),this.ensureAgentIdentities(),this.ensureInitialData();let n=e.subscribe(()=>{this.agentIdentitySource===e&&this.context.agentIdentity===e&&this.requestUpdate()});return()=>{n(),this.agentIdentitySource===e&&(this.agentIdentitySource=null)}}).watch(()=>this.context?.channels,(e,t)=>e.subscribe(t)).watch(()=>this.context?.navigation,(e,t)=>e.subscribe(t)).watch(()=>this.context?.runtimeConfig,(e,t)=>e.subscribe(t)).effect(()=>this.context?.sessions,e=>{let t=this.hasBoundSessions;this.hasBoundSessions=!0,this.sessionsSource=e,t&&(this.invalidateTransientRequests(),b(this),this.loadActivePanelData());let n=e.subscribe(()=>{this.sessionsSource!==e||this.context.sessions!==e||(te(this),this.requestUpdate())});return()=>{n(),this.sessionsSource===e&&(this.sessionsSource=null)}})}get sessions(){return this.context.sessions}get client(){return this.gateway.client}get connected(){return this.gateway.connected}get requestGeneration(){return this.gateway.epoch}get sessionsResult(){return this.context.sessions.state.result}get sessionKey(){return this.context.gateway.snapshot.sessionKey}get agentsPanel(){return this.routeData?.panel??`files`}connectedCallback(){super.connectedCallback(),this.syncCanonicalLocation()}disconnectedCallback(){this.subscriptions.clear(),super.disconnectedCallback()}willUpdate(e){e.has(`routeData`)&&(this.applyRouteData(),this.syncCanonicalLocation(),this.ensureInitialData())}syncGatewayState(){(this.cron.client!==this.client||this.cron.connected!==this.connected)&&(this.cron={...this.cron,client:this.client,connected:this.connected})}syncAgentState(e=this.context.agents){let t=e.state;this.agentsList=t.agentsList?Ce(t.agentsList):null,this.agentsList&&this.ensureSelectedAgentInList(this.agentsList),this.syncCurrentAgentFiles(e)}ensureSelectedAgentInList(e){let t=this.agentsSelectedId;(!t||!e.agents.some(e=>e.id===t))&&(this.agentsSelectedId=e.defaultId??e.agents[0]?.id??null)}syncCurrentAgentFiles(e=this.context.agents){let t=this.resolveSelectedAgentId();if(!t||this.agentsPanel!==`files`)return;let n=e.files(t);n.list&&(this.agentFilesList=n.list,this.agentFilesError=n.error,this.selectDefaultAgentFile(t))}async selectDefaultAgentFile(e){let t=this.agentFilesList?.files??[];this.agentFileActive&&t.some(e=>e.name===this.agentFileActive)||(this.agentFileActive=t.find(e=>e.name===`AGENTS.md`)?.name??null,this.agentFileActive&&await Ut(this,e,this.agentFileActive))}resetForClientChange(){this.agentsList=null,this.agentsSelectedId=null,this.chatModelCatalog=[],this.chatModelCatalogClient=null,this.chatModelCatalogAgentId=null,this.chatModelCatalogByAgentId.clear(),this.chatModelCatalogError=null,this.resetSelectionState()}resetForAgentsSourceChange(){this.agentsList=null,this.agentsSelectedId=null,this.resetSelectionState()}invalidateTransientRequests(){this.gateway.invalidate(),this.agentFilesLoading=!1,this.agentFileSaving=!1,this.agentIdentityLoading=!1,this.agentSkillsLoading=!1,this.toolsCatalogLoading=!1,this.toolsCatalogLoadingAgentId=null,this.toolsEffectiveLoading=!1,this.toolsEffectiveLoadingKey=null,this.cron={...this.cron,cronLoading:!1,cronJobsLoadingMore:!1,cronJobsReloadPending:!1,cronJobsReloadPendingTableFilters:!1,cronRunsLoadingMore:!1,cronBusy:!1}}applyRouteData(){let e=this.routeData;if(e&&(this.routeDataInitialized=!0,this.gateway.isRouteDataCurrent(e)&&e.agentsList)){this.agentsList=e.agentsList;let t=e.selectedAgentId??this.resolveSelectedAgentId();t!==this.agentsSelectedId&&(this.agentsSelectedId=t,this.resetSelectionState())}}syncCanonicalLocation(){this.normalizedLocation=dn(this.context,this.routeData,this.normalizedLocation)}resolveSelectedAgentId(){return this.agentsSelectedId??this.agentsList?.defaultId??this.agentsList?.agents?.[0]?.id??null}chatAgentId(){return Oe(this.sessionKey)?.agentId??this.context.gateway.snapshot.assistantAgentId??this.agentsList?.defaultId??`main`}agentIdentityById(){return Object.fromEntries(this.context.agentIdentity.entries().map(e=>[e.agentId,e]))}controlUiAuthToken(){let{snapshot:e,connection:t}=this.context.gateway;return ze({hello:e.hello,settings:t,password:t.password})}ensureInitialData(){if(!(!this.connected||!this.client||!this.routeDataInitialized)){if(!this.context.runtimeConfig.state.configSnapshot&&!this.context.runtimeConfig.state.configLoading&&this.context.runtimeConfig.ensureLoaded(),!this.agentsList&&!this.context.agents.state.agentsLoading){this.loadAgentsAndCommit();return}this.ensureAgentIdentities(),this.loadActivePanelData()}}isCurrentRequest(e,t,n,r={}){return this.client===e&&this.connected&&this.requestGeneration===t&&(!r.agents||this.context.agents===r.agents)&&(!r.agentIdentity||this.context.agentIdentity===r.agentIdentity)&&(!r.sessions||this.context.sessions===r.sessions)&&(!n||this.resolveSelectedAgentId()===n)}ensureAgentIdentities(){let e=this.client,t=this.context.agentIdentity,n=this.agentsList?.agents.map(e=>e.id).filter(e=>!t.get(e))??[];if(!e||!this.connected||n.length===0||this.agentIdentityLoading)return;let r=this.requestGeneration;this.agentIdentityLoading=!0,this.agentIdentityError=null,t.ensure(n).catch(n=>{this.isCurrentRequest(e,r,void 0,{agentIdentity:t})&&(this.agentIdentityError=String(n))}).finally(()=>{this.isCurrentRequest(e,r,void 0,{agentIdentity:t})&&(this.agentIdentityLoading=!1)})}loadActivePanelData(){let e=this.resolveSelectedAgentId();if(e){if(this.agentsPanel===`overview`){this.ensureModelCatalog();return}if(this.agentsPanel===`files`&&this.agentFilesList?.agentId!==e){this.loadAgentFiles(e);return}if(this.agentsPanel===`skills`&&this.agentSkillsAgentId!==e){hn(this,e);return}if(this.agentsPanel===`tools`){this.toolsCatalogResult?.agentId!==e&&!this.toolsCatalogLoading&&l(this,e),this.loadEffectiveToolsForAgent(e);return}if(this.agentsPanel===`channels`&&!this.context.channels.state.channelsSnapshot){this.context.channels.refresh(!1);return}this.agentsPanel===`cron`&&(this.cron.cronAgentId!==e&&(this.cron=ct({client:this.client,connected:this.connected}),this.cron.cronAgentId=e),!this.cron.cronLoading&&!this.cron.cronStatus&&this.refreshCron())}}ensureModelCatalog(){let e=this.client,t=this.resolveSelectedAgentId();if(!e||!this.connected||!t)return;if(this.chatModelCatalogClient===e){let e=this.chatModelCatalogByAgentId.get(t);if(e){this.chatModelCatalog=e,this.chatModelCatalogAgentId=t,this.chatModelCatalogError=null;return}}let n=this.requestGeneration,r=this.chatModelCatalogRequest;if(r?.client===e&&r.generation===n&&r.agentId===t)return;this.chatModelCatalogAgentId!==t&&(this.chatModelCatalog=[]);let i={client:e,generation:n,agentId:t};this.chatModelCatalogRequest=i,this.chatModelCatalogError=null,e.request(`chat.metadata`,{agentId:t}).then(r=>{if(this.isCurrentRequest(e,n,t)){let n=r.models??[];this.chatModelCatalog=n,this.chatModelCatalogClient=e,this.chatModelCatalogAgentId=t,this.chatModelCatalogByAgentId.set(t,n),this.chatModelCatalogError=null}}).catch(r=>{this.isCurrentRequest(e,n,t)&&(this.chatModelCatalogAgentId=null,this.chatModelCatalogError=r instanceof Error?r.message:String(r))}).finally(()=>{this.chatModelCatalogRequest===i&&(this.chatModelCatalogRequest=null)})}async loadAgentsAndCommit(){let e=this.client,t=this.requestGeneration,n=this.context.agents;e&&(await n.ensureList(),this.isCurrentRequest(e,t,void 0,{agents:n})&&(this.syncAgentState(n),this.ensureAgentIdentities(),this.loadActivePanelData()))}async loadAgentFiles(e,t=!1){let n=this.client,r=this.context.agents;if(!n||!this.connected||this.agentFilesLoading)return;if(r.files(e).list&&!t){this.syncCurrentAgentFiles(r);return}let i=this.requestGeneration;this.agentFilesLoading=!0,this.agentFilesError=null;try{let a=t?await r.refreshFiles(e):await r.ensureFiles(e);if(!this.isCurrentRequest(n,i,e,{agents:r}))return;this.agentFilesList=a??r.files(e).list,this.agentFilesError=r.files(e).error}finally{this.isCurrentRequest(n,i,e,{agents:r})&&(this.agentFilesLoading=!1)}this.isCurrentRequest(n,i,e,{agents:r})&&await this.selectDefaultAgentFile(e)}async refreshCron(){let e=this.cron;!e.connected||!e.client||e.cronLoading||await Promise.all([this.runCronTask(e=>ot(e)),this.runCronTask(e=>it(e)),this.runCronTask(e=>at(e,{tableFilters:!0}))])}async runCronTask(e){let t=this.cron;try{let n=e(t);return this.cron===t&&this.requestUpdate(),await n}finally{this.cron===t&&this.requestUpdate()}}saveIdentityDraft(){let e=this.client,t=this.resolveSelectedAgentId();if(!e||!t||this.identitySaving)return;let n=this.requestGeneration,r=this.context.agents,i=this.context.agentIdentity;nn({host:this,expectedClient:e,agentId:t,agents:r,agentIdentity:i,runtimeConfig:this.context.runtimeConfig,isCurrent:()=>this.isCurrentRequest(e,n,t,{agents:r,agentIdentity:i}),onSaved:()=>this.syncAgentState(r)})}resetSelectionState(){this.gateway.invalidate(),this.chatModelCatalog=[],this.chatModelCatalogAgentId=null,this.chatModelCatalogError=null,this.agentFilesList=null,this.agentFilesError=null,this.agentFileActive=null,this.agentFileContents={},this.agentFileDrafts={},this.agentFilesLoading=!1,this.agentFileSaving=!1,this.agentSkillsReport=null,this.agentSkillsLoading=!1,this.agentSkillsError=null,this.agentSkillsAgentId=null,this.agentIdentityLoading=!1,this.agentIdentityError=null,$t(this),this.toolsCatalogResult=null,this.toolsCatalogError=null,this.toolsCatalogLoading=!1,this.toolsCatalogLoadingAgentId=null,b(this),this.cron=ct({client:this.client,connected:this.connected})}toolsPath(e,t){let n=this.context.runtimeConfig.agentEntry(e,{ensure:t});return n?[...n.path,`tools`]:null}loadEffectiveToolsForAgent(e){if(e!==this.chatAgentId()){b(this);return}let t=ye(this,{agentId:e,sessionKey:this.sessionKey});this.toolsEffectiveResultKey===t&&!this.toolsEffectiveError||Ee(this,{agentId:e,sessionKey:this.sessionKey})}refreshAgents(){let e=this.client,t=this.requestGeneration,n=this.context.agents;e&&(async()=>{await n.refreshList(),this.isCurrentRequest(e,t,void 0,{agents:n})&&(this.syncAgentState(n),this.loadActivePanelData())})()}saveAgentConfig(){let e=this.client,t=this.requestGeneration,n=this.context.agents;if(!e)return;let r=this.agentsSelectedId;(async()=>{await this.context.runtimeConfig.save()&&(await n.refreshList(),this.isCurrentRequest(e,t,void 0,{agents:n})&&(this.syncAgentState(n),r&&this.agentsList?.agents.some(e=>e.id===r)&&(this.agentsSelectedId=r),this.ensureAgentIdentities(),this.loadActivePanelData()))})()}saveSelectedAgentFile(e,t,n){let r=this.client,i=this.requestGeneration,a=this.context.agents;r&&Wt(this,e,t,n).then(()=>{this.isCurrentRequest(r,i,e,{agents:a})&&this.loadAgentFiles(e,!0)})}reloadConfig(){this.context.runtimeConfig.refresh({discardPendingChanges:!0})}runCronJobNow(e){this.cron.cronJobs.some(t=>t.id===e)&&this.runCronTask(t=>st(t,e,`force`))}render(){let e=this.context.runtimeConfig.state,t=this.context.agents.state,n=this.resolveSelectedAgentId(),r=Se(e);return D`
      <section class="content-header">
        <div>
          <div class="page-title">${Ve(`agents`)}</div>
          <div class="page-subtitle">
            ${Be(`agents`)} ${vt(Qi,A(`common.learnMore`))}
          </div>
        </div>
      </section>
      ${mt(Yi({basePath:this.context.basePath,authToken:this.controlUiAuthToken(),loading:t.agentsLoading,error:t.agentsError,agentsList:this.agentsList,selectedAgentId:n,activePanel:this.agentsPanel,config:{form:r,loading:e.configLoading,saving:e.configSaving,dirty:e.configFormDirty,error:e.configAutoSaveStatus===`error`||e.configAutoSaveStatus===`conflict`?e.lastError:null},channels:{snapshot:this.context.channels.state.channelsSnapshot,loading:this.context.channels.state.channelsLoading,error:this.context.channels.state.channelsError,lastSuccess:this.context.channels.state.channelsLastSuccess},cron:{status:this.cron.cronStatus,jobs:this.cron.cronJobs,jobsTotal:this.cron.cronJobsTotal,jobsHasMore:this.cron.cronJobsHasMore,jobsLoadingMore:this.cron.cronJobsLoadingMore,scopedTotal:this.cron.cronScopedTotal,scopedNextWakeAtMs:this.cron.cronScopedNextWakeAtMs,loading:this.cron.cronLoading,error:this.cron.cronError},agentFiles:{list:this.agentFilesList,loading:this.agentFilesLoading,error:this.agentFilesError,active:this.agentFileActive,contents:this.agentFileContents,drafts:this.agentFileDrafts,saving:this.agentFileSaving},agentIdentityLoading:this.agentIdentityLoading,agentIdentityError:this.agentIdentityError,agentIdentityById:this.agentIdentityById(),identityDraft:this.identityDraft,identitySaving:this.identitySaving,identityError:this.identityError,agentSkills:{report:this.agentSkillsReport,loading:this.agentSkillsLoading,error:this.agentSkillsError,agentId:this.agentSkillsAgentId,filter:this.skillsFilter},toolsCatalog:{loading:this.toolsCatalogLoading,error:this.toolsCatalogError,result:this.toolsCatalogResult},toolsEffective:{loading:this.toolsEffectiveLoading,error:this.toolsEffectiveError,result:this.toolsEffectiveResult},runtimeSessionKey:this.sessionKey,runtimeSessionMatchesSelectedAgent:n===this.chatAgentId(),modelCatalog:this.chatModelCatalog,modelCatalogError:this.chatModelCatalogError,pinnedAgentIds:this.context.navigation.snapshot.pinnedAgentIds,onTogglePinnedAgent:e=>rn(this.context.navigation,e),onRefresh:()=>this.refreshAgents(),onSelectAgent:e=>fn(this.context,e,n,this.agentsPanel),onCreateAgent:()=>this.context.navigate(`custodian`,{search:`?intent=new-agent`}),onSelectPanel:e=>pn(this.context,n,this.agentsPanel,e),onLoadFiles:e=>void this.loadAgentFiles(e,!0),onSelectFile:e=>{this.agentFileActive=e,n&&Ut(this,n,e)},onFileDraftChange:(e,t)=>{this.agentFileDrafts={...this.agentFileDrafts,[e]:t}},onFileReset:e=>{this.agentFileDrafts={...this.agentFileDrafts,[e]:this.agentFileContents[e]??``}},onFileSave:e=>{n&&this.saveSelectedAgentFile(n,e,this.agentFileDrafts[e]??this.agentFileContents[e]??``)},onToolsProfileChange:(e,t,n)=>{let r=this.toolsPath(e,!!(t||n));r&&(t?this.context.runtimeConfig.patchForm([...r,`profile`],t):this.context.runtimeConfig.removeFormValue([...r,`profile`]),n&&this.context.runtimeConfig.removeFormValue([...r,`allow`]))},onToolsOverridesChange:(e,t,n)=>{let r=this.toolsPath(e,t.length>0||n.length>0);r&&(t.length?this.context.runtimeConfig.patchForm([...r,`alsoAllow`],t):this.context.runtimeConfig.removeFormValue([...r,`alsoAllow`]),n.length?this.context.runtimeConfig.patchForm([...r,`deny`],n):this.context.runtimeConfig.removeFormValue([...r,`deny`]))},onConfigReload:()=>this.reloadConfig(),onConfigSave:()=>this.saveAgentConfig(),onIdentityFieldChange:(e,t)=>en(this,e,t),onIdentityAvatarSelect:e=>tn(this,e),onIdentitySave:()=>this.saveIdentityDraft(),onChannelsRefresh:()=>void this.context.channels.refresh(!1),onOpenMemoryImport:()=>this.context.navigate(`memory-import`),onOpenMemorySettings:()=>this.context.navigate(`memory`),onOpenAgentDefaults:()=>this.context.navigate(`ai-agents`),onCronRefresh:()=>void this.refreshCron(),onCronLoadMore:()=>void this.runCronTask(e=>at(e,{append:!0,tableFilters:!0})),onCronRunNow:e=>this.runCronJobNow(e),onSkillsFilterChange:e=>this.skillsFilter=e,onSkillsRefresh:()=>{n&&hn(this,n)},onAgentSkillToggle:(e,t,n)=>{let r=this.context.runtimeConfig.agentEntry(e,{ensure:!0});if(!r||!t.trim())return;let i=Array.isArray(r.entry.skills)?Xe(r.entry.skills):this.agentSkillsReport?.skills?.map(e=>e.name).filter(Boolean)??[],a=new Set(i);n?a.add(t.trim()):a.delete(t.trim()),this.context.runtimeConfig.patchForm([...r.path,`skills`],[...a])},onAgentSkillsClear:e=>{let t=this.context.runtimeConfig.agentEntry(e);t&&this.context.runtimeConfig.removeFormValue([...t.path,`skills`])},onAgentSkillsDisableAll:e=>{let t=this.context.runtimeConfig.agentEntry(e,{ensure:!0});t&&this.context.runtimeConfig.patchForm([...t.path,`skills`],[])},onModelChange:(e,t)=>{cn(this.context.runtimeConfig,e,t),te(this)},onModelCatalogRetry:()=>this.ensureModelCatalog(),onModelFallbacksChange:(e,t)=>ln(this.context.runtimeConfig,e,t),onSetDefault:e=>{(async()=>{await this.context.runtimeConfig.ensureLoaded(),await w(this.context.runtimeConfig,e,()=>this.context.agents.refreshList())})()}}))}
    `}},a([Le({context:Ue,subscribe:!0})],$.prototype,`context`,void 0),a([Pe({attribute:!1})],$.prototype,`routeData`,void 0),a([O()],$.prototype,`agentsList`,void 0),a([O()],$.prototype,`agentsSelectedId`,void 0),a([O()],$.prototype,`toolsCatalogLoading`,void 0),a([O()],$.prototype,`toolsCatalogLoadingAgentId`,void 0),a([O()],$.prototype,`toolsCatalogError`,void 0),a([O()],$.prototype,`toolsCatalogResult`,void 0),a([O()],$.prototype,`toolsEffectiveLoading`,void 0),a([O()],$.prototype,`toolsEffectiveLoadingKey`,void 0),a([O()],$.prototype,`toolsEffectiveResultKey`,void 0),a([O()],$.prototype,`toolsEffectiveError`,void 0),a([O()],$.prototype,`toolsEffectiveResult`,void 0),a([O()],$.prototype,`chatModelCatalog`,void 0),a([O()],$.prototype,`chatModelCatalogError`,void 0),a([O()],$.prototype,`agentFilesLoading`,void 0),a([O()],$.prototype,`agentFilesError`,void 0),a([O()],$.prototype,`agentFilesList`,void 0),a([O()],$.prototype,`agentFileContents`,void 0),a([O()],$.prototype,`agentFileDrafts`,void 0),a([O()],$.prototype,`agentFileActive`,void 0),a([O()],$.prototype,`agentFileSaving`,void 0),a([O()],$.prototype,`agentIdentityLoading`,void 0),a([O()],$.prototype,`agentIdentityError`,void 0),a([O()],$.prototype,`identityDraft`,void 0),a([O()],$.prototype,`identitySaving`,void 0),a([O()],$.prototype,`identityError`,void 0),a([O()],$.prototype,`agentSkillsLoading`,void 0),a([O()],$.prototype,`agentSkillsError`,void 0),a([O()],$.prototype,`agentSkillsReport`,void 0),a([O()],$.prototype,`agentSkillsAgentId`,void 0),a([O()],$.prototype,`skillsFilter`,void 0),a([O()],$.prototype,`cron`,void 0),customElements.get(`openclaw-agents-page`)||customElements.define(`openclaw-agents-page`,$)}))();
//# sourceMappingURL=agents-page-ohyEjGbE.js.map