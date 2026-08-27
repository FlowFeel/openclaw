import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{In as r,Kc as i,Ln as a,Rn as o,Wc as s,cc as c,lc as l,nr as u,rr as d,sc as f}from"./control-ui-core-ChU36mQ7.js";import{K as p,Q as m,W as h,Y as g,_,b as v,it as y,nt as b}from"./lit-runtime-D5xZwgO1.js";import{At as x,jt as S}from"./control-ui-foundation-DkfOBVsU.js";import{i as C,o as w,t as T}from"./control-ui-core-M4uhXYSJ.js";import{X as E,Y as D,a as O,c as k,d as A,gt as j,i as M,l as N,n as P,o as F,r as ee,s as I,t as L,u as te,vt as ne,yt as re}from"./control-ui-core-pXkCFtVv.js";import{c as ie,d as R,f as z,i as B,l as V,o as ae,s as oe,u as se}from"./control-ui-shared-C-1hBCcB.js";import{i as ce,n as le,s as ue,t as de}from"./config-runtime-bj88oeNR.js";import{Qt as fe,a as pe,t as me}from"./value-Bh5d6NNx.js";import{d as he,i as ge,m as _e,p as ve,s as ye,t as be}from"./settings-ui-Bq4yxauk.js";import{t as xe}from"./web-awesome-popover-Cte1MlzI.js";function Se(e,t,n,r){let i=t[n];if(i===void 0)return{ok:!1,value:we};let a=n===t.length-1;if(typeof i==`number`){if(e!=null&&!Array.isArray(e))return{ok:!1,value:we};let o=Array.isArray(e)?[...e]:[];if(a)return r===void 0?o.splice(i,1):o[i]=r,{ok:!0,value:o};let s=Se(o[i],t,n+1,r);return s.ok?(o[i]=s.value,{ok:!0,value:o}):s}if(e!=null&&(typeof e!=`object`||Array.isArray(e)))return{ok:!1,value:we};let o=e?{...e}:{};if(a)return r===void 0?delete o[i]:Object.defineProperty(o,i,{value:r,enumerable:!0,configurable:!0,writable:!0}),{ok:!0,value:o};let s=Se(Object.hasOwn(o,i)?o[i]:void 0,t,n+1,r);return s.ok?(Object.defineProperty(o,i,{value:s.value,enumerable:!0,configurable:!0,writable:!0}),{ok:!0,value:o}):s}function Ce(e,t,n){return t.length===0?{ok:!0,value:n}:Se(e,t,0,n)}var we,Te=e((()=>{we=Symbol(`invalid-path-patch`)}));function Ee(e){return S(e)?Object.fromEntries(Object.entries(e).map(([e,t])=>[e,Ne(t)])):e}function De(e){try{return new RegExp(e,`u`),!0}catch{return!1}}function Oe(e){if(De(e))return e;let t=e.replace(/\\([^\\])/g,(e,t)=>t===`:`||t===`/`?t:e);return De(t)?t:e}function ke(e){return S(e)?Object.fromEntries(Object.entries(e).map(([e,t])=>[e,Pe(t)?t:Ne(t)])):e}function Ae(e){let t=new Map;for(let[n,r]of Object.entries(e)){let e=Oe(n),i=Ne(r),a=t.get(e);t.set(e,a===void 0?i:{allOf:[a,i]})}return Object.fromEntries(t)}function je(e){let{nullable:t,type:n,...r}=e,i=Array.isArray(n)?[...n]:typeof n==`string`?[n]:null;if(!i||(t===!0&&!i.includes(`null`)&&i.push(`null`),i.length===1&&!Array.isArray(n)))return e;let a=Object.entries(r).filter(([e])=>He.has(e)),o=Object.entries(r).filter(([e])=>!He.has(e));return{...Object.fromEntries(a),anyOf:i.map(e=>Object.assign({},Object.fromEntries(o),{type:e}))}}function Me(e){if(!S(e.additionalProperties)||S(e.properties)||S(e.patternProperties))return e;let{additionalProperties:t,...n}=e;return{...n,patternProperties:{".*":t},additionalProperties:!1}}function Ne(e){if(Array.isArray(e))return e.map(e=>Ne(e));if(!S(e))return e;let t=Me(je(e.nullable===!0&&e.enumIncludesNull===!0&&Array.isArray(e.enum)&&!e.enum.some(e=>e===null)?{...e,enum:[...e.enum,null]}:e));return Object.fromEntries(Object.entries(t).map(([e,n])=>e===`$dynamicRef`&&t.$ref===void 0?[`$ref`,n]:e===`pattern`&&typeof n==`string`?[e,Oe(n)]:e===`patternProperties`&&S(n)?[e,Ae(n)]:ze.has(e)?[e,Ee(n)]:e===`dependencies`?[e,ke(n)]:Be.has(e)||Ve.has(e)?[e,Ne(n)]:[e,n]))}function Pe(e){return Array.isArray(e)&&e.every(e=>typeof e==`string`)}function Fe(e,t=new WeakSet,n=new WeakSet){if(e===null||typeof e==`string`||typeof e==`boolean`)return!0;if(typeof e==`number`)return Number.isFinite(e);if(typeof e!=`object`)return!1;let r;try{if(Array.isArray(e)){let t=Reflect.ownKeys(e);if(t.length!==e.length+1||t.some(t=>{if(t===`length`)return!1;if(typeof t!=`string`)return!0;let n=Number(t);return!Number.isSafeInteger(n)||n<0||n>=e.length||String(n)!==t}))return!1;r=e}else{let t=Object.getPrototypeOf(e);if(t!==Object.prototype&&t!==null||Reflect.ownKeys(e).some(t=>typeof t!=`string`||!Object.prototype.propertyIsEnumerable.call(e,t)))return!1;r=Object.values(e)}}catch{return!1}if(n.has(e))return!0;if(t.has(e))return!1;t.add(e);let i=r.every(e=>Fe(e,t,n));return t.delete(e),i&&n.add(e),i}function Ie(e){return Ne(e)}function Le(e,t){if(!Fe(e)||!Fe(t))return!1;try{return pe(e,t)}catch{return!1}}function Re(e,t){if(!Fe(t))return!1;try{return fe(Ie(e),t)}catch{return!1}}var ze,Be,Ve,He,Ue=e((()=>{me(),x(),ze=new Set([`$defs`,`definitions`,`dependentSchemas`,`patternProperties`,`properties`]),Be=new Set([`additionalItems`,`additionalProperties`,`contains`,`else`,`if`,`items`,`not`,`propertyNames`,`then`,`unevaluatedItems`,`unevaluatedProperties`]),Ve=new Set([`allOf`,`anyOf`,`oneOf`,`prefixItems`]),He=new Set([`$anchor`,`$defs`,`$dynamicAnchor`,`$id`,`$recursiveAnchor`,`$schema`,`$vocabulary`,`definitions`])}));function H(e,t){return Re(e,t)}function We(e,t){let n=e.properties;return n&&Object.hasOwn(n,t)?n[t]:void 0}function Ge(e){return typeof e==`number`&&Number.isFinite(e)?e:void 0}function Ke(e){let[t=``,n]=String(e).toLowerCase().split(`e`),r=t.split(`.`)[1]?.length??0,i=Number(n??0);return Math.max(0,r-i)}function qe(e,t){if(!t)return e;let n=Ke(t);return n<=100?Number(e.toFixed(n)):e}function Je(e,t){let n=e<0n?-e:e,r=t<0n?-t:t;for(;r!==0n;){let e=n%r;n=r,r=e}return n}function Ye(e,t){return e/Je(e,t)*t}function Xe(e){let[t=``,n]=String(e).toLowerCase().split(`e`),[r=`0`,i=``]=t.split(`.`),a=Number(n??0),o=BigInt(`${r}${i}`),s=i.length-a,c=s<0?o*10n**BigInt(-s):o,l=Je(c,s>0?10n**BigInt(s):1n),u=Number(c/l);return!Number.isFinite(u)||u<=0?1:u}function Ze(e,t,n){let r=D(e),i=D(t);if(!r||!i||i.numerator===0n)return e;let a=r.numerator*i.denominator,o=r.denominator*i.numerator,s=a/o,c=a%o,l=c<0n?s-1n:s,u=n===`floor`?l:n===`ceil`?c===0n?s:c>0n?s+1n:s:(a-l*o)*2n<o?l:l+1n;return qe(Number(u)*t,t)}function U(e){let t=[],n=[e],r=new Set;for(;n.length>0;){let e=n.pop();if(!(!e||r.has(e))){r.add(e),t.push(e);for(let t=(e.allOf?.length??0)-1;t>=0;--t){let r=e.allOf?.[t];r&&n.push(r)}}}return t}function Qe(e,t){let n,r=!1;for(let i of e){let e=Ge(t===`lower`?i.minimum:i.maximum),a=Ge(t===`lower`?i.exclusiveMinimum:i.exclusiveMaximum);for(let[i,o]of[[e,!1],[a,!0]])i!==void 0&&(n===void 0||(t===`lower`?i>n:i<n)||i===n&&o&&!r)&&(n=i,r=o)}return{value:n,exclusive:r}}function $e(e){let t,n;for(let r of e){let e=Ge(r.multipleOf);if(e===void 0||e<=0)continue;let i=D(e);if(!i)continue;let a=Je(i.numerator,i.denominator),o=i.numerator/a,s=i.denominator/a;t=t===void 0?o:Ye(t,o),n=n===void 0?s:Je(n,s)}if(t===void 0||n===void 0)return;let r=Number(t)/Number(n);return Number.isFinite(r)&&r>0?r:void 0}function et(e){let t=U(e),n=0,r,i=!1;for(let e of t)Number.isSafeInteger(e.minItems)&&e.minItems!==void 0&&e.minItems>=0&&(n=Math.max(n,e.minItems)),Number.isSafeInteger(e.maxItems)&&e.maxItems!==void 0&&e.maxItems>=0&&(r=r===void 0?e.maxItems:Math.min(r,e.maxItems)),Array.isArray(e.items)&&e.additionalItems===!1&&(r=Math.min(r??1/0,e.items.length)),i||=e.uniqueItems===!0;return{minItems:n,maxItems:r,uniqueItems:i}}function tt(e){return new Set(U(e).flatMap(e=>e.required??[]))}function nt(e){let t=U(e),n=new Set;for(let e of t)for(let t of Object.keys(e.properties??{}))n.add(t);return[...n].filter(e=>t.every(t=>We(t,e)!==void 0||t.additionalProperties!==!1))}function rt(e){let t=e.find(e=>z(e)!==void 0)??e[0];return!t||e.length===1?t:{...t,allOf:[...t.allOf??[],...e.filter(e=>e!==t)]}}function it(e){let t=U(e).map(e=>e.additionalProperties).filter(e=>e!==void 0);if(t.some(e=>e===!1))return!1;let n=t.filter(e=>!!e&&typeof e==`object`);return n.length>0?rt(n):t.some(e=>e===!0)?{}:void 0}function at(e,t){let n=+!H(e,t),r=new Set(nt(e));for(let r of tt(e))Object.hasOwn(t,r)||(n+=1);let i=it(e);for(let[a,o]of Object.entries(t)){let t=st(e,a);if(t){H(t,o)||(n+=1);continue}!r.has(a)&&(i===!1||i===void 0||!H(i,o))&&(n+=1)}return n}function ot(e,t,n){return H(e,n)?!0:!H(e,t)&&at(e,n)<=at(e,t)}function st(e,t){if(nt(e).includes(t))return rt(U(e).map(e=>We(e,t)).filter(e=>e!==void 0))}function ct(e,t){let n=[];for(let r of U(e))if(Array.isArray(r.items)){let e=r.items[t]??(r.additionalItems&&typeof r.additionalItems==`object`?r.additionalItems:void 0);e&&n.push(e)}else r.items&&n.push(r.items);return rt(n)}function lt(e,t=new Set){if(t.has(e))return[];t.add(e);let n=[];Array.isArray(e.const)&&n.push(e.const);for(let t of e.enum??[])Array.isArray(t)&&n.push(t);for(let r of[...e.allOf??[],...e.anyOf??[],...e.oneOf??[]])n.push(...lt(r,t));return t.delete(e),n}function ut(e,t){let n=Math.abs(e.length-t.length),r=Math.min(e.length,t.length);for(let i=0;i<r;i+=1)bt(e[i],t[i])||(n+=1);return n}function dt(e,t,n){let{minItems:r,maxItems:i}=et(e),a=Math.max(0,r-t.length),o=lt(e).filter(t=>H(e,t)).map(e=>ut(t,e));o.length>0&&(a+=Math.min(...o)),i!==void 0&&(a+=Math.max(0,t.length-i));for(let r=0;r<t.length;r+=1){let i=ct(e,r);i&&!H(i,t[r])&&(a+=1),n&&t.slice(r+1).some(e=>bt(t[r],e))&&(a+=1)}return a}function ft(e,t,n,r,i){if(H(e,n))return!0;if(H(e,t))return!1;let a=dt(e,t,r),o=dt(e,n,r);return i?o<=a:o<a}function pt(e){let t=U(e),n=new Set(t.flatMap(e=>{let t=Array.isArray(e.type)?e.type:e.type?[e.type]:[];return t.includes(`number`)?[`number`]:t.includes(`integer`)?[`integer`]:[]})),r=n.has(`integer`)?`integer`:n.has(`number`)?`number`:z(e),i=$e(t),a=r===`integer`?i&&i>0?Xe(i):1:i&&i>0?i:void 0,o=Qe(t,`lower`),s=Qe(t,`upper`),c=o.exclusive?void 0:o.value,l=s.exclusive?void 0:s.value,u=o.exclusive?o.value:void 0,d=s.exclusive?s.value:void 0,f=c??u,p=l??d;if(a){if(f!==void 0&&(f=Ze(f,a,`ceil`)),p!==void 0&&(p=Ze(p,a,`floor`)),u!==void 0){let e=Ze(u,a,`ceil`),t=e<=u?qe(e+a,a):e;f=f===void 0?t:Math.max(f,t)}if(d!==void 0){let e=Ze(d,a,`floor`),t=e>=d?qe(e-a,a):e;p=p===void 0?t:Math.min(p,t)}}return{min:f,max:p,exclusiveMin:u,exclusiveMax:d,step:a??`any`}}function mt(e,t){if(!Number.isFinite(e))return e;if(e===0)return t>0?Number.MIN_VALUE:-Number.MIN_VALUE;let n=new DataView(new ArrayBuffer(8));n.setFloat64(0,e);let r=n.getBigUint64(0),i=e>0==t>0?r+1n:r-1n;return n.setBigUint64(0,i),n.getFloat64(0)}function ht(e,t,n){if(n!==void 0&&Number.isFinite(n)){let r=e+(n-e)/2;if(t>0&&r>e||t<0&&r<e)return r}let r=e+t*Math.max(1,Math.abs(e));return Number.isFinite(r)&&r!==e?r:mt(e,t)}function gt(e,t){let n=pt(t),r=e;return typeof n.step==`number`&&(r=Ze(r,n.step,`round`)),n.min!==void 0&&(r=Math.max(n.min,r)),n.max!==void 0&&(r=Math.min(n.max,r)),n.exclusiveMin!==void 0&&r<=n.exclusiveMin&&(r=(n.step,mt(n.exclusiveMin,1))),n.exclusiveMax!==void 0&&r>=n.exclusiveMax&&(r=(n.step,mt(n.exclusiveMax,-1))),qe(r,typeof n.step==`number`?n.step:void 0)}function _t(e){let t=pt(e);if(t.step===`any`){if(t.exclusiveMin!==void 0&&t.exclusiveMin>=0)return ht(t.exclusiveMin,1,t.max);if(t.exclusiveMax!==void 0&&t.exclusiveMax<=0)return ht(t.exclusiveMax,-1,t.min)}return gt(0,e)}function vt(e){let t=Math.max(0,e.minLength??0),n=e.maxLength??Math.max(t,0);if(!Number.isSafeInteger(t)||t>xt||n<t)return G;if(e.pattern)try{return t===0&&new RegExp(e.pattern,`u`).test(``)?``:G}catch{return G}return t===0?``:`x`.repeat(t).slice(0,n)}function W(e,t){if(t===G||!H(e,t))return G;if(!t||typeof t!=`object`)return t;try{return structuredClone(t)}catch{return G}}function yt(e,t=0){if(!e)return``;if(e.default!==void 0)return W(e,e.default);if(e.const!==void 0)return W(e,e.const);if(e.enum&&e.enum.length>0){for(let t of e.enum){let n=W(e,t);if(n!==G)return n}return G}if(t>=32)return G;for(let n of e.allOf??[]){let r=W(e,yt(n,t+1));if(r!==G)return r}switch(z(e)){case`object`:{let n={};for(let r of e.required??[]){let i=We(e,r);if(!i)return G;let a=yt(i,t+1);if(a===G)return G;n[r]=a}return W(e,n)}case`array`:{let n=Math.max(0,e.minItems??0);if(!Number.isSafeInteger(n)||n>100)return G;if(n===0)return W(e,[]);if(Array.isArray(e.items)){let r=[];for(let i=0;i<n;i+=1){let n=e.items[i]??(e.additionalItems&&typeof e.additionalItems==`object`?e.additionalItems:void 0);if(!n)return G;let a=yt(n,t+1);if(a===G)return G;r.push(a)}return W(e,r)}let r=e.items;if(!r)return G;let i=[];for(let e=0;e<n;e+=1){let e=yt(r,t+1);if(e===G)return G;i.push(e)}return W(e,i)}case`boolean`:return W(e,!1);case`number`:case`integer`:return W(e,_t(e));case`string`:return W(e,vt(e));case`null`:return W(e,null);default:return W(e,``)}}var bt,G,xt,K=e((()=>{Ue(),E(),V(),bt=Le,G=Symbol(`no-safe-config-default`),xt=4096}));function St(e){return structuredClone(e)}function Ct(e){let t=z(e.schema);if(t!==`object`&&t!==`array`)return;let n=e.schema.default;return t===`object`&&n&&typeof n==`object`&&!Array.isArray(n)||t===`array`&&Array.isArray(n)?St(n):t===`object`?{}:[]}function wt(e,t){return t!==void 0&&e.value===void 0&&e.isRequired!==!0&&e.structuredDraftOwner!==!0&&!H(e.schema,t)}var Tt,Et=e((()=>{h(),m(),T(),i(),Te(),K(),V(),t(),Tt=class extends s{constructor(...e){super(...e),this.error=``}willUpdate(e){if(!e.has(`props`))return;let t=e.get(`props`),n=this.props;n&&(!t||t.identity!==n.identity||!Object.is(t.sourceIdentity,n.sourceIdentity))&&(this.draftValue=St(n.initialValue),this.error=``)}patchDraft(e,t){let n=this.props,r=this.draftValue;if(!n||!r)return!1;let i=n.params.path;if(e.length<i.length||!i.every((t,n)=>t===e[n]))return!1;let a=e.slice(i.length),o=a.length===0?{ok:!0,value:t}:Ce(r,a,t);if(!o.ok)return!1;let s=o.value,c=z(n.params.schema);return c===`object`&&(!s||typeof s!=`object`||Array.isArray(s))||c===`array`&&!Array.isArray(s)?!1:(this.draftValue=s,this.error=``,!H(n.params.schema,s)||n.params.onPatch(i,s)!==!1?!0:(this.error=w(`configForm.draftRejected`),!1))}render(){let e=this.props,t=this.draftValue;if(!e||!t)return p;let n=B(e.params.path,`structured-draft-error`);return g`
      ${e.renderNode({...e.params,value:t,sourceIdentity:t,controlIdentity:t,structuredDraftOwner:!0,onPatch:(e,t)=>this.patchDraft(e,t),onRemove:e=>this.patchDraft(e,void 0)})}
      ${this.error?g`
            <div class="settings-row settings-row--stacked cfg-structured-draft__error">
              <div class="settings-row__control">
                <span id=${n} class="cfg-field__error" role="alert">${this.error}</span>
              </div>
            </div>
          `:p}
    `}},n([y({attribute:!1})],Tt.prototype,`props`,void 0),n([b()],Tt.prototype,`draftValue`,void 0),n([b()],Tt.prototype,`error`,void 0),customElements.get(`openclaw-config-form-structured-draft`)||customElements.define(`openclaw-config-form-structured-draft`,Tt)}));function Dt(e,t){return t.length>e.length&&e.every((e,n)=>bt(e,t[n]))}function Ot(e){let{schema:t,value:n,minimumItems:r,maximumItems:i,uniqueItems:a,isUnset:o,isRequired:s,itemSchemaAt:c}=e,l=Math.max(1,r-n.length),u=l>100?1:l,d=[];for(let e=0;e<u;e+=1){let t=yt(c(n.length+e));if(t===G){d.length=0;break}d.push(t)}let f=d.length===u?[...n,...d]:void 0,p=f!==void 0&&!a&&(i===void 0||f.length<=i)&&(f.length<r||H(t,f))?f:void 0,m=H(t,n),h=lt(t).find(e=>H(t,e)&&(o||!m||Dt(n,e)))??(o&&s&&i===0&&H(t,[])?[]:void 0);return{atomicCandidate:Array.isArray(h)?structuredClone(h):void 0,autoCandidate:p}}var kt=e((()=>{K()}));function At(e,t){return`${typeof e}:${typeof e==`number`&&Object.is(e,-0)?`-0`:typeof e==`number`&&Number.isNaN(e)?`NaN`:String(e)}:${t}`}function jt(e){let t=Ft.get(e);if(t?.length===e.length)return t;let n=new Map,r=e.map(e=>{if(e&&typeof e==`object`)return e;let t=At(e,0),r=n.get(t)??0;return n.set(t,r+1),At(e,r)});return Ft.set(e,r),r}function Mt(e,t){Ft.set(e,t)}function Nt(e){Ft.delete(e)}function Pt(e,t,n){let r=Array.from({length:n},()=>Symbol(`array-row`));Mt(e,[...t,...r])}var Ft,It=e((()=>{Ft=new WeakMap})),q,Lt=e((()=>{h(),m(),T(),i(),K(),V(),t(),q=class extends s{constructor(...e){super(...e),this.draftOpen=!1,this.draftKey=``,this.draftValue=``,this.draftIsNull=!1,this.error=``,this.invalidTarget=null}willUpdate(e){let t=e.get(`props`),n=this.props;t&&(!n||t.identity!==n.identity||!Object.is(t.sourceIdentity,n.sourceIdentity))&&this.closeDraft()}openDraft(){this.props?.disabled||(this.draftOpen=!0,this.updateComplete.then(()=>{this.querySelector(`[data-collection-draft-value]`)?.focus()}))}clearError(){this.error=``,this.invalidTarget=null}closeDraft(){this.draftOpen=!1,this.draftKey=``,this.draftValue=``,this.draftIsNull=!1,this.clearError()}fail(e,t){this.invalidTarget=e,this.error=t,this.updateComplete.then(()=>{this.querySelector(e===`key`?`[data-collection-draft-key]`:`[data-collection-draft-value]`)?.focus()})}parseValue(e){if(this.draftIsNull)return{ok:!0,value:null};let t=z(e);if(t===`string`)return{ok:!0,value:this.draftValue};if(t===`number`||t===`integer`){let e=Number(this.draftValue);return this.draftValue.trim()&&Number.isFinite(e)?{ok:!0,value:e}:{ok:!1,message:w(`configForm.invalidNumber`)}}try{return{ok:!0,value:JSON.parse(this.draftValue)}}catch{return{ok:!1,message:w(`configForm.invalidJson`)}}}commit(){let e=this.props;if(!e||e.disabled)return;let t=this.parseValue(e.schema);if(!t.ok){this.fail(`value`,t.message);return}if(!H(e.schema,t.value)){this.fail(`value`,[`number`,`integer`].includes(z(e.schema)??``)?w(`configForm.invalidNumber`):w(`configForm.invalidString`));return}if(e.existingValues?.some(e=>bt(e,t.value))){this.fail(`value`,w(`configForm.invalidString`));return}if(e.validateValue&&!e.validateValue(t.value)){this.fail(`value`,w(`configForm.invalidString`));return}let n=this.draftKey.trim();if(e.existingKeys&&(!n||e.existingKeys.includes(n))){this.fail(`key`,w(`configForm.invalidString`));return}this.dispatchEvent(new CustomEvent(`config-collection-draft-commit`,{bubbles:!0,composed:!0,cancelable:!0,detail:{...e.existingKeys?{key:n}:{},value:t.value}}))?this.closeDraft():this.fail(`value`,w(`configForm.invalidString`))}updated(){let e=this.querySelector(`[data-collection-draft-key]`),t=this.querySelector(`[data-collection-draft-value]`);e?.setCustomValidity(this.invalidTarget===`key`?this.error:``),t?.setCustomValidity(this.invalidTarget===`value`?this.error:``)}render(){let e=this.props;if(!e||!this.draftOpen||e.disabled)return p;let t=z(e.schema),n=H(e.schema,null),r=t===`string`||t===`number`||t===`integer`,i=`${this.id}-error`,a=`${w(`configForm.add`)}: ${e.label}`,o=r?g`
          <input
            data-collection-draft-value
            type=${t===`string`?`text`:`number`}
            class="settings-input"
            aria-label=${a}
            aria-describedby=${i}
            aria-invalid=${this.invalidTarget===`value`?`true`:`false`}
            .value=${this.draftValue}
            ?disabled=${this.draftIsNull}
            @input=${e=>{this.draftValue=e.currentTarget.value,this.clearError()}}
          />
        `:g`
          <textarea
            data-collection-draft-value
            class="settings-input"
            aria-label=${a}
            aria-describedby=${i}
            aria-invalid=${this.invalidTarget===`value`?`true`:`false`}
            placeholder=${w(`configForm.jsonValue`)}
            rows="2"
            .value=${this.draftValue}
            ?disabled=${this.draftIsNull}
            @input=${e=>{this.draftValue=e.currentTarget.value,this.clearError()}}
          ></textarea>
        `;return g`
      <div class="settings-row settings-row--stacked cfg-collection-draft">
        <div class="settings-row__control">
          <div class="cfg-collection-draft__controls">
            ${e.existingKeys?g`
                  <input
                    data-collection-draft-key
                    type="text"
                    class="settings-input"
                    aria-label=${w(`configForm.key`)}
                    aria-describedby=${i}
                    aria-invalid=${this.invalidTarget===`key`?`true`:`false`}
                    placeholder=${w(`configForm.key`)}
                    .value=${this.draftKey}
                    @input=${e=>{this.draftKey=e.currentTarget.value,this.clearError()}}
                  />
                `:p}
            ${n?g`
                  <label class="field checkbox">
                    <input
                      data-collection-draft-null
                      type="checkbox"
                      .checked=${this.draftIsNull}
                      @change=${e=>{this.draftIsNull=e.currentTarget.checked,this.clearError()}}
                    />
                    <span>${w(`configForm.nullValue`)}</span>
                  </label>
                `:p}
            ${o}
            <span id=${i} class="cfg-field__error" role="alert" ?hidden=${!this.error}
              >${this.error}</span
            >
            <div class="cfg-collection-draft__actions">
              <button type="button" class="btn btn--sm" @click=${()=>this.commit()}>
                ${e.existingKeys?w(`configForm.addEntry`):w(`configForm.add`)}
              </button>
              <button type="button" class="btn btn--sm" @click=${()=>this.closeDraft()}>
                ${w(`common.cancel`)}
              </button>
            </div>
          </div>
        </div>
      </div>
    `}},n([y({attribute:!1})],q.prototype,`props`,void 0),n([b()],q.prototype,`draftOpen`,void 0),n([b()],q.prototype,`draftKey`,void 0),n([b()],q.prototype,`draftValue`,void 0),n([b()],q.prototype,`draftIsNull`,void 0),n([b()],q.prototype,`error`,void 0),n([b()],q.prototype,`invalidTarget`,void 0),customElements.get(`openclaw-config-form-collection-draft`)||customElements.define(`openclaw-config-form-collection-draft`,q)}));function Rt(e){return Object.keys(e??{}).filter(e=>!Qt.has(e)).length===0}function zt(e){if(e===void 0)return``;try{return JSON.stringify(e,null,2)??``}catch{return``}}function Bt(e,t){return{...e,default:t}}function Vt(e){return typeof e==`string`||typeof e==`number`||typeof e==`boolean`||typeof e==`bigint`?String(e):null}function Ht(e,t){if(Object.is(e,t))return!0;let n=Vt(e),r=Vt(t);return n!==null&&n===r}function Ut(e){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let t=e;return typeof t.source!=`string`||typeof t.id!=`string`?!1:t.provider===void 0||typeof t.provider==`string`}function Wt(e){let t=ae(e.value,e.path,e.hints),n=t&&(e.revealSensitive||(e.isSensitivePathRevealed?.(e.path)??!1));return{isSensitive:t,isRedacted:t&&!n,isRevealed:n,canReveal:t}}function Gt(e){let{state:t}=e;if(!t.isSensitive||!e.onToggleSensitivePath)return p;let n=t.canReveal?t.isRevealed?w(`configForm.hideValue`):w(`configForm.revealValue`):w(`configForm.disableStreamToReveal`);return g`
    <openclaw-tooltip .content=${n}>
      <button
        type="button"
        class="settings-secret__toggle"
        aria-label=${n}
        aria-pressed=${t.isRevealed}
        ?disabled=${e.disabled||!t.canReveal}
        @click=${()=>e.onToggleSensitivePath?.(e.path)}
      >
        ${t.isRevealed?ne.eye:ne.eyeOff}
      </button>
    </openclaw-tooltip>
  `}function Kt(e,t){return t===p?e:g`<span class="settings-secret">${e}${t}</span>`}function qt(e){let t=e.filter(e=>e!==`advanced`);return t.length===0?p:g`
    <div class="cfg-tags">
      ${t.map(e=>g`<span class="cfg-tag">${e}</span>`)}
    </div>
  `}function J(e){let t=e.showLabel?e.help:void 0,n=e.showLabel?e.defaultDescription:void 0,r=e.showLabel||!!t||!!n||e.tags.length>0||!!e.error;return g`
    <div class=${e.stacked||!r?`settings-row settings-row--stacked`:`settings-row`}>
      ${r?g`
            <div class="settings-row__text">
              ${e.showLabel?g`<span class="settings-row__title">${e.label}</span>`:p}
              ${t?g`<span class="settings-row__desc" id=${e.helpId??p}
                    >${t}</span
                  >`:p}
              ${n?g`<span class="settings-row__desc">${n}</span>`:p}
              ${qt(e.tags)}
              ${e.error?g`<span class="cfg-field__error" role="alert">${e.error}</span>`:p}
            </div>
          `:p}
      ${e.control===p?p:g`<div class="settings-row__control">${e.control}</div>`}
    </div>
  `}function Jt(e){return e.description===p&&e.action===p?p:g`
    <div class="settings-row">
      ${e.description===p?p:g`
            <div class="settings-row__text">
              <span class="settings-row__desc">${e.description}</span>
            </div>
          `}
      ${e.action===p?p:g`<div class="settings-row__control">${e.action}</div>`}
    </div>
  `}function Yt(e,t){let n=Wt({path:e.path,value:t,hints:e.hints,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed}).isRedacted;return{description:n?p:Y(e.schema,e.value),action:X({...e,disabled:e.disabled||n})}}function Y(e,t){return e.default===void 0?p:g`${w(t===void 0?`configForm.usingDefault`:`configForm.defaultValue`,{value:u(e.default)})}`}function X(e){return e.schema.default===void 0||e.value===void 0?p:g`
    <openclaw-tooltip .content=${w(`configForm.resetToDefault`)}>
      <button
        type="button"
        class="btn btn--icon"
        aria-label=${w(`configForm.resetToDefault`)}
        ?disabled=${e.disabled}
        @click=${t=>{if(t.stopPropagation(),e.isRequired){e.onPatch(e.path,structuredClone(e.schema.default));return}if(e.onRemove){e.onRemove(e.path);return}e.onPatch(e.path,void 0)}}
      >
        ${ne.refresh}
      </button>
    </openclaw-tooltip>
  `}function Xt(e){let t=e.options.findIndex(t=>Ht(t,e.resolvedValue));return he({value:t<0?``:String(t),options:e.options.map((e,t)=>({value:String(t),label:u(e)})),disabled:e.disabled,ariaLabel:e.ariaLabel,onChange:t=>{let n=e.options[Number(t)];n!==void 0&&e.onSelect(n)}})}function Zt(e){let{path:t,fallback:n,sensitiveState:r,disabled:i,onPatch:a}=e,o=B(t,`json-error`),s=[e.descriptionId,o].filter(Boolean).join(` `),c=(e,t)=>{let n=e.closest(`.cfg-json-editor`)?.querySelector(`.cfg-field__error`);e.setCustomValidity(t),e.setAttribute(`aria-invalid`,String(!!t)),n&&(n.hidden=!t,n.textContent=t)},l=t=>{let n=``,r=t.value.trim();if(!r&&e.isRequired)n=w(`configForm.invalidJson`);else if(r)try{H(e.schema,JSON.parse(r))||(n=w(`configForm.invalidJson`))}catch{n=w(`configForm.invalidJson`)}return c(t,n),!n},u=r.isRedacted?``:n,d=JSON.stringify(t),f=(e,n)=>a(t,n)===!1?(e.value=u,l(e),!1):!0;return g`
    <span class="cfg-json-editor">
      ${Kt(g`
    <textarea
      ${v(t=>{if(!(t instanceof HTMLTextAreaElement))return;let n=$t.get(t);n&&(!Object.is(n.sourceValue,e.sourceValue)||!Object.is(n.rowIdentity,e.rowIdentity)||n.fallback!==u||n.pathKey!==d)&&(t.value=u,c(t,``)),$t.set(t,{sourceValue:e.sourceValue,rowIdentity:e.rowIdentity,fallback:u,pathKey:d})})}
      class="settings-input${r.isRedacted?` cfg-redacted`:``}"
      aria-label=${e.ariaLabel}
      aria-describedby=${s||p}
      aria-invalid="false"
      placeholder=${r.isRedacted?R():w(`configForm.jsonValue`)}
      rows=${e.rows}
      .value=${u}
      ?disabled=${i}
      ?readonly=${r.isRedacted}
      @click=${()=>{r.isRedacted&&e.onToggleSensitivePath&&e.onToggleSensitivePath(t)}}
      @input=${e=>{r.isRedacted||l(e.target)}}
      @change=${e=>{if(r.isRedacted)return;let t=e.target;if(!l(t))return;let n=t.value.trim();if(!n){f(t,void 0);return}try{f(t,JSON.parse(n))}catch{}}}
    ></textarea>
  `,Gt({path:t,state:r,disabled:i,onToggleSensitivePath:e.onToggleSensitivePath}))}
      <span id=${o} class="cfg-field__error" role="alert" hidden></span>
    </span>
  `}var Qt,$t,en=e((()=>{h(),_(),re(),j(),T(),d(),K(),V(),be(),Qt=new Set([`title`,`description`,`default`,`nullable`,`enumIncludesNull`,`tags`,`x-tags`]),$t=new WeakMap}));function tn(e,t){let n=e.currentTarget.closest(`.cfg-block`),r=Array.from(n?.children??[]).find(e=>e.id===t);r?.openDraft?.call(r)}function nn(e,t){let{schema:n,value:r,path:i,hints:a,unsupported:o,disabled:s,onPatch:u,searchCriteria:d,rawAvailable:f,revealSensitive:m,isSensitivePathRevealed:h,onToggleSensitivePath:_,onRemove:v}=e,{label:y,help:b,tags:x}=N(i,n,a),S=d&&ee(d)&&I({schema:n,path:i,hints:a,criteria:d})?void 0:d,C=r===void 0&&n.default!==void 0,w=C?n.default:r,T=w===void 0?sn:w,E=w&&typeof w==`object`&&!Array.isArray(w)?w:{},D=Yt(e,w),O=nt(n).map(e=>[e,st(n,e)]).filter(e=>!!e[1]),k=tt(n),A=O.toSorted((e,t)=>{let n=oe([...i,e[0]],a)?.order??0,r=oe([...i,t[0]],a)?.order??0;return n===r?e[0].localeCompare(t[0]):n-r}),j=new Set(O.map(([e])=>e)),M=it(n),P=!!M&&typeof M==`object`,F=(e,t)=>{if(e.length<i.length||!i.every((t,n)=>t===e[n]))return!1;let r,a=e.slice(i.length);if(a.length===0){if(!t||typeof t!=`object`||Array.isArray(t))return!1;r=t}else{try{r=structuredClone(E)}catch{return!1}t===void 0?c(r,a):l(r,a,t)}return ot(n,E,r)?C?u(i,r)!==!1:(t===void 0&&v?v(e):u(e,t))!==!1:!1},L=g`
    ${A.map(([n,r])=>t({schema:C&&Object.hasOwn(E,n)?Bt(r,E[n]):r,value:C?void 0:E[n],path:[...i,n],hints:a,rawAvailable:f,unsupported:o,disabled:s,isRequired:k.has(n),sourceIdentity:C?void 0:E[n],controlIdentity:e.controlIdentity??E,rowIdentity:e.rowIdentity,searchCriteria:S,revealSensitive:m,isSensitivePathRevealed:h,onToggleSensitivePath:_,onPatch:F}))}
    ${P?an({...e,schema:M,value:E,sourceIdentity:T,reservedKeys:j,searchCriteria:S,onPatch:F},t):p}
  `;return i.length===1||e.showLabel===!1?g`${i.length===1?Jt(D):p}${L}`:g`
    <details class="cfg-object cfg-block" ?open=${i.length<=2}>
      <summary class="settings-row cfg-object__summary">
        <div class="settings-row__text">
          <span class="settings-row__title">${y}</span>
          ${b?g`<span class="settings-row__desc">${b}</span>`:p}
          ${n.default===void 0?p:g`<span class="settings-row__desc">${D.description}</span>`}
          ${qt(x)}
        </div>
        <div class="settings-row__control">
          ${D.action}
          <span class="settings-row__chevron cfg-object__chevron">${ne.chevronDown}</span>
        </div>
      </summary>
      <div class="settings-subrows">${L}</div>
    </details>
  `}function rn(e,t){let{schema:n,value:r,path:i,hints:a,unsupported:o,disabled:s,onPatch:c,searchCriteria:l,rawAvailable:u,revealSensitive:d,isSensitivePathRevealed:f,onToggleSensitivePath:m}=e,h=e.showLabel??!0,_=e.showHeaderMeta??h,{label:v,help:y,tags:b}=N(i,n,a),x=l&&ee(l)&&I({schema:n,path:i,hints:a,criteria:l})?void 0:l,S=Array.isArray(n.items)?n.items:void 0,C=Array.isArray(n.items)?n.items[0]??{}:n.items;if(!C)return J({label:v,tags:[],showLabel:!0,control:p,error:w(`configForm.unsupportedArray`)});let T=r===void 0&&Array.isArray(n.default),E=Array.isArray(r)?r:Array.isArray(n.default)?n.default:[],D=Array.isArray(r)?r:Array.isArray(n.default)?n.default:on,O=Yt(e,E),k=jt(E),{minItems:A,maxItems:j,uniqueItems:M}=et(n),P=e=>ct(n,e)??(S?{}:C),{atomicCandidate:F,autoCandidate:L}=Ot({schema:n,value:E,minimumItems:A,maximumItems:j,uniqueItems:M,isUnset:r===void 0,isRequired:e.isRequired??!1,itemSchemaAt:P}),te=j===void 0||E.length<j,re=F===void 0&&L===void 0,ie=P(E.length),R=B(i,`array-draft`),z={schema:ie,label:v,disabled:s||!te,identity:R,sourceIdentity:D,existingValues:M?E:void 0,validateValue:e=>{let t=[...E,e];return(j===void 0||t.length<=j)&&(t.length<A||H(n,t))}},V=(e,t)=>{if(e.length<=i.length||!i.every((t,n)=>t===e[n]))return!1;let r=e.slice(i.length),a=r[0];if(typeof a!=`number`||a<0||a>=E.length)return!1;let o=[...E],s=r.slice(1);if(s.length===0){if(t===void 0)return!1;o[a]=t}else{let e=Ce(E[a],s,t);if(!e.ok)return!1;o[a]=e.value}if(ft(n,E,o,M,!0)){Mt(o,k);let e=c(i,o)!==!1;return e||Nt(o),e}return!1};return g`
    <div class="cfg-block cfg-array">
      <div class="settings-row">
        <div class="settings-row__text">
          ${h?g`<span class="settings-row__title">${v}</span>`:p}
          ${_&&y?g`<span class="settings-row__desc">${y}</span>`:p}
          ${_&&n.default!==void 0?g`<span class="settings-row__desc">${O.description}</span>`:p}
          ${qt(b)}
        </div>
        <div class="settings-row__control">
          <span class="settings-row__value"
            >${w(E.length===1?`configForm.itemCountOne`:`configForm.itemCount`,{count:String(E.length)})}</span
          >
          ${O.action}
          <button
            type="button"
            class="btn btn--sm"
            aria-controls=${R}
            ?disabled=${s||!te&&F===void 0}
            @click=${e=>{F?c(i,F)===!1&&tn(e,R):re?tn(e,R):L&&(Pt(L,k,L.length-E.length),c(i,L)===!1&&(Nt(L),tn(e,R)))}}
          >
            ${w(`configForm.add`)}
          </button>
        </div>
      </div>
      <openclaw-config-form-collection-draft
        id=${R}
        .props=${z}
        @config-collection-draft-commit=${e=>{let t=[...E,e.detail.value],r=!(M&&E.some(t=>bt(t,e.detail.value)))&&(j===void 0||E.length<j)&&H(ie,e.detail.value)&&(t.length<A||H(n,t)),a=!1;r&&(Pt(t,k,1),a=c(i,t)!==!1,a||Nt(t)),a||e.preventDefault()}}
      ></openclaw-config-form-collection-draft>
      ${E.length===0?ge(w(`configForm.noItems`)):g`
            <div class="settings-subrows">
              ${E.map((e,r)=>{let l=P(r);return g`
                  <div class="settings-row">
                    <div class="settings-row__text">
                      <span class="settings-row__title">#${r+1}</span>
                    </div>
                    <div class="settings-row__control">
                      <openclaw-tooltip .content=${w(`configForm.removeItem`)}>
                        <button
                          type="button"
                          class="btn btn--icon"
                          style="width:28px;height:28px;padding:0;"
                          aria-label=${w(`configForm.removeItem`)}
                          ?disabled=${s||E.length<=A||!ft(n,E,E.toSpliced(r,1),M,!1)}
                          @click=${()=>{let e=E.toSpliced(r,1);ft(n,E,e,M,!1)&&(Mt(e,k.toSpliced(r,1)),c(i,e)===!1&&Nt(e))}}
                        >
                          ${ne.trash}
                        </button>
                      </openclaw-tooltip>
                    </div>
                  </div>
                  ${t({schema:T?Bt(l,e):l,value:T?void 0:e,path:[...i,r],hints:a,rawAvailable:u,unsupported:o,disabled:s,isRequired:!0,sourceIdentity:T?void 0:e,controlIdentity:E,rowIdentity:k[r],searchCriteria:x,showLabel:!1,revealSensitive:d,isSensitivePathRevealed:f,onToggleSensitivePath:m,onPatch:V})}
                `})}
            </div>
          `}
    </div>
  `}function an(e,t){let{schema:n,value:r,path:i,hints:a,rawAvailable:o,unsupported:s,disabled:c,reservedKeys:l,onPatch:u,searchCriteria:d,revealSensitive:f,isSensitivePathRevealed:p,onToggleSensitivePath:m}=e,h=Rt(n),_=h?{}:yt(n),v=B(i,`map-draft`),y={schema:n,label:w(`configForm.customEntries`),disabled:c,identity:v,sourceIdentity:e.sourceIdentity??r,existingKeys:[...new Set([...Object.keys(r),...l])]},b=Object.entries(r??{}).filter(([e])=>!l.has(e)),x=d&&ee(d)?b.filter(([e,t])=>F({schema:n,value:t,path:[...i,e],hints:a,criteria:d})):b;return g`
    <div class="cfg-block cfg-map">
      <div class="settings-row">
        <div class="settings-row__text">
          <span class="settings-row__title">${w(`configForm.customEntries`)}</span>
        </div>
        <div class="settings-row__control">
          <button
            type="button"
            class="btn btn--sm"
            aria-controls=${v}
            ?disabled=${c}
            @click=${e=>{if(_===G){tn(e,v);return}let t={...r},n=1,a=`custom-${n}`;for(;a in t;)n+=1,a=`custom-${n}`;t[a]=_,u(i,t)===!1&&tn(e,v)}}
          >
            ${w(`configForm.addEntry`)}
          </button>
        </div>
      </div>

      <openclaw-config-form-collection-draft
        id=${v}
        .props=${y}
        @config-collection-draft-commit=${e=>{let t=e.detail.key;(!t||Object.hasOwn(r,t)||l.has(t)||u(i,{...r,[t]:e.detail.value})===!1)&&e.preventDefault()}}
      ></openclaw-config-form-collection-draft>
      ${x.length===0?ge(w(`configForm.noCustomEntries`)):g`
            <div class="settings-subrows">
              ${x.map(([l,_])=>{let v=[...i,l],y=zt(_),b=Wt({path:v,value:_,hints:a,revealSensitive:f??!1,isSensitivePathRevealed:p});return g`
                  <div class="settings-row">
                    <div class="settings-row__text">
                      <input
                        type="text"
                        class="settings-input"
                        placeholder=${w(`configForm.key`)}
                        aria-label=${`${w(`configForm.key`)}: ${l}`}
                        .value=${l}
                        ?disabled=${c}
                        @change=${e=>{let t=e.target,n=t.value.trim();if(!n||n===l){t.value=l;return}let a={...r};if(n in a){t.value=l;return}a[n]=a[l],delete a[l],u(i,a)===!1&&(t.value=l)}}
                      />
                    </div>
                    <div class="settings-row__control">
                      <openclaw-tooltip .content=${w(`configForm.removeEntry`)}>
                        <button
                          type="button"
                          class="btn btn--icon"
                          style="width:28px;height:28px;padding:0;"
                          aria-label=${w(`configForm.removeEntry`)}
                          ?disabled=${c}
                          @click=${()=>{let e={...r};delete e[l],u(i,e)}}
                        >
                          ${ne.trash}
                        </button>
                      </openclaw-tooltip>
                    </div>
                  </div>
                  ${h?J({label:l,tags:[],showLabel:!1,stacked:!0,control:Zt({schema:n,path:v,ariaLabel:`${l}: ${w(`configForm.jsonValue`)}`,sourceValue:_,rowIdentity:e.rowIdentity,fallback:y,rows:2,sensitiveState:b,disabled:c,isRequired:!0,onToggleSensitivePath:m,onPatch:u})}):t({schema:n,value:_,path:v,hints:a,rawAvailable:o,unsupported:s,disabled:c,isRequired:!0,sourceIdentity:_,controlIdentity:r,rowIdentity:e.rowIdentity,searchCriteria:d,showLabel:!1,revealSensitive:f,isSensitivePathRevealed:p,onToggleSensitivePath:m,onPatch:u})}
                `})}
            </div>
          `}
    </div>
  `}var on,sn,cn=e((()=>{h(),re(),T(),f(),kt(),It(),Lt(),Te(),K(),en(),M(),V(),be(),on=Symbol(`unset-array-source`),sn=Symbol(`unset-map-source`)}));function ln(e){let{schema:t,value:n,path:r,hints:i,disabled:a,onPatch:o}=e,s=e.showLabel??!0,{label:c,help:l,tags:u}=N(r,t,i),d=s&&l?B(r,`description`):void 0,f=zt(n===void 0?t.default:n),m=Wt({path:r,value:n,hints:i,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed}),h=g`
    ${Zt({schema:t,path:r,ariaLabel:c,descriptionId:d,sourceValue:e.sourceIdentity??n,rowIdentity:e.rowIdentity,fallback:f,rows:3,sensitiveState:m,disabled:a,isRequired:e.isRequired,onToggleSensitivePath:e.onToggleSensitivePath,onPatch:o})}
    ${X({...e,disabled:a||m.isRedacted})}
  `;return J({label:c,help:l,helpId:d,defaultDescription:m.isRedacted?p:Y(t,n),tags:u,showLabel:s,stacked:!0,control:h})}var un=e((()=>{h(),en(),M(),V()}));function dn(e,t){let n=e.trim();if(n.startsWith(`+`))try{let e=ue(n,{extract:!1});if(!e?.isPossible())return;let r=e.formatInternational();return!e.country||fn.has(e.countryCallingCode)?r:`${new Intl.DisplayNames(t?[t]:void 0,{type:`region`}).of(e.country)||e.country} · ${r}`}catch{return}}var fn,pn=e((()=>{de(),fn=(()=>{let e=new Map;for(let t of ce()){let n=le(t);e.set(n,(e.get(n)??0)+1)}return new Set([...e.entries()].filter(([,e])=>e>1).map(([e])=>e))})()}));function Z(e,t){return e.setCustomValidity(t),e.setAttribute(`aria-invalid`,String(!!t)),!t}function mn(e,t,n,r,i,a,o,s){if(!(e instanceof HTMLInputElement))return;let c=xn.get(e);c&&(!Object.is(c.sourceIdentity,n)||!Object.is(c.rowIdentity,r)||c.pathKey!==i||c.presentationIdentity!==a||c.renderedValue!==o?(e.value=o,Z(e,``)):Object.is(c.controlIdentity,t)||s(e)),xn.set(e,{controlIdentity:t,sourceIdentity:n,rowIdentity:r,pathKey:i,presentationIdentity:a,renderedValue:o})}function hn(e,t){return H(t,e)?``:w(`configForm.invalidString`)}function gn(e,t,n){return e===``&&!n&&!!hn(e,t)}function _n(e,t){return H(t,e)?``:w(`configForm.invalidNumber`)}function vn(e){let{schema:t,value:n,path:r,hints:i,disabled:a,onPatch:o,inputType:s}=e,c=e.showLabel??!0,l=oe(r,i),{label:d,help:f,tags:m}=N(r,t,i),h=c&&f?B(r,`description`):void 0,_=Wt({path:r,value:n,hints:i,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed}),y=typeof n==`object`&&!!n&&!Array.isArray(n),b=Ut(n),x=e.rawAvailable??!0,S=_.isRedacted||b,T=S?b?w(x?`configForm.structuredSecretRaw`:`configForm.structuredSecretFile`):R():l?.placeholder??(t.default===void 0?``:w(`configForm.defaultValue`,{value:u(t.default)})),E=S?``:y?zt(n):n??``,D=_.isSensitive&&!S?`text`:s,O=l?.presentation===`phone-number`,k=O&&!S&&typeof n==`string`?dn(n,C.getLocale()):void 0,A=e.controlIdentity??e.sourceIdentity??n,j=e.sourceIdentity??n,M=B(r,`scalar-identity`),P=u(E),F=[S?`redacted`:`visible`,D,O?`phone`:`plain`,b?x?`secret-raw`:`secret-file`:`scalar`].join(`:`),ee=n=>{if(S){Z(n,``);return}if(s===`number`){let r=n.value;Z(n,r.trim()===``?e.isRequired?w(`configForm.invalidNumber`):``:_n(Number(r),t));return}let r=n.value;Z(n,gn(r,t,e.isRequired===!0)?``:hn(r,t))},I=(e,t)=>o(r,t)===!1?(e.value=P,ee(e),!1):!0,L=Kt(g`
    <input
      ${v(t=>mn(t,A,j,e.rowIdentity,M,F,P,ee))}
      type=${D}
      class="settings-input${S?` cfg-redacted`:``}"
      aria-label=${d}
      aria-describedby=${h??p}
      aria-invalid="false"
      placeholder=${T}
      .value=${P}
      ?disabled=${a}
      ?readonly=${S}
      @click=${()=>{_.isRedacted&&!b&&e.onToggleSensitivePath&&e.onToggleSensitivePath(r)}}
      @input=${n=>{if(S)return;let r=n.target,i=r.value;if(s===`number`){if(i.trim()===``){e.isRequired?Z(r,w(`configForm.invalidNumber`)):(Z(r,``),I(r,void 0));return}let n=Number(i);Z(r,_n(n,t))&&I(r,Number.isNaN(n)?i:n);return}gn(i,t,e.isRequired===!0)?(Z(r,``),I(r,void 0)):Z(r,hn(i,t))&&I(r,i)}}
      @change=${n=>{if(s===`number`||S)return;let r=n.target,i=r.value,a=hn(i,t);if(!a&&!O){Z(r,``),I(r,i);return}let o=i.trim();if(gn(o,t,e.isRequired===!0)){r.value=o,Z(r,``),I(r,void 0);return}if(hn(o,t)){Z(r,a);return}r.value=o,Z(r,``),I(r,o)}}
    />
  `,b?p:Gt({path:r,state:_,disabled:a,onToggleSensitivePath:e.onToggleSensitivePath})),te=g`
    ${O?g`
        <span class="settings-phone-presentation">
          ${L}
          ${k?g`<span class="settings-phone-presentation__value">${k}</span>`:p}
        </span>
      `:L}
    ${X({...e,disabled:a||S})}
  `;return J({label:d,help:f,helpId:h,defaultDescription:S?p:Y(t,n),tags:m,showLabel:c,control:te})}function yn(e){let{schema:t,value:n,path:r,hints:i,disabled:a,onPatch:o}=e,s=e.showLabel??!0,{label:c,help:l,tags:d}=N(r,t,i),f=s&&l?B(r,`description`):void 0,m=n??``,h=n===void 0?t.default:n,_=pt(t),y=typeof _.step==`number`?_.step:1,b=e.controlIdentity??e.sourceIdentity??n,x=e.sourceIdentity??n,S=B(r,`scalar-identity`),C=u(m),T=n=>{let r=n.value;Z(n,r===``?e.isRequired?w(`configForm.invalidNumber`):``:_n(Number(r),t))},E=(e,t)=>o(r,t)===!1?(e.value=C,T(e),!1):!0,D=e=>{if(a)return;let n=Number(h),i=gt((Number.isFinite(n)?n:gt(0,t))+e*y,t);H(t,i)&&o(r,i)},O=g`
    <button
      type="button"
      class="btn btn--sm btn--icon"
      aria-label=${`${c}: -${y}`}
      ?disabled=${a}
      @click=${()=>D(-1)}
    >
      −
    </button>
    <input
      ${v(t=>mn(t,b,x,e.rowIdentity,S,`number`,C,T))}
      type="number"
      class="settings-input"
      aria-label=${c}
      aria-describedby=${f??p}
      aria-invalid="false"
      placeholder=${t.default===void 0?p:w(`configForm.defaultValue`,{value:u(t.default)})}
      min=${_.min??p}
      max=${_.max??p}
      step=${_.step}
      .value=${C}
      ?disabled=${a}
      @keydown=${e=>{n===void 0&&h!==void 0&&(e.key===`ArrowUp`||e.key===`ArrowDown`)&&(e.preventDefault(),D(e.key===`ArrowUp`?1:-1))}}
      @input=${n=>{let r=n.target,i=r.value;if(i===``){e.isRequired?Z(r,w(`configForm.invalidNumber`)):(Z(r,``),E(r,void 0));return}let a=i===``?void 0:Number(i);a!==void 0&&Z(r,_n(a,t))&&E(r,a)}}
      @change=${e=>{let n=e.target;if(n.value===``)return;let r=Number(n.value);if(!Number.isFinite(r)){Z(n,w(`configForm.invalidNumber`));return}let i=gt(r,t);n.value=u(i),Z(n,_n(i,t))&&E(n,i)}}
    />
    <button
      type="button"
      class="btn btn--sm btn--icon"
      aria-label=${`${c}: +${y}`}
      ?disabled=${a}
      @click=${()=>D(1)}
    >
      +
    </button>
    ${X(e)}
  `;return J({label:c,help:l,helpId:f,defaultDescription:Y(t,n),tags:d,showLabel:s,control:O})}function bn(e){let{schema:t,value:n,path:r,hints:i,disabled:a,options:o,onPatch:s}=e,c=e.showLabel??!0,{label:l,help:d,tags:f}=N(r,t,i),m=c&&d?B(r,`description`):void 0,h=n===void 0&&t.default!==void 0,_=h?t.default:n,v=o.findIndex(e=>e===_||String(e)===String(_)),y=`__unset__`,b=`__null__`,x=t.nullable&&t.enumIncludesNull,S=h?y:_===null&&x?b:v>=0?String(v):y,C=g`
    <select
      class="settings-select"
      aria-label=${l}
      aria-describedby=${m??p}
      ?disabled=${a}
      .value=${S}
      @change=${n=>{let i=n.target,a=i.value;if(a===y&&e.isRequired&&t.default===void 0){i.value=S;return}if(a===y){(e.isRequired&&t.default!==void 0?s(r,structuredClone(t.default)):e.onRemove?e.onRemove(r):s(r,void 0))===!1&&(i.value=S);return}let c=a===b?null:o[Number(a)];s(r,c)===!1&&(i.value=S)}}
    >
      <option
        value=${y}
        ?selected=${S===y}
        ?disabled=${e.isRequired&&t.default===void 0}
      >
        ${t.default===void 0?w(`configForm.select`):w(`configForm.defaultValue`,{value:u(t.default)})}
      </option>
      ${x?g`
            <option value=${b} ?selected=${S===b}>
              ${w(`configForm.nullValue`)}
            </option>
          `:p}
      ${o.map((e,t)=>g`
          <option value=${String(t)} ?selected=${S===String(t)}>
            ${String(e)}
          </option>
        `)}
    </select>
  `;return J({label:l,help:d,helpId:m,defaultDescription:Y(t,n),tags:f,showLabel:c,control:C})}var xn,Sn=e((()=>{pn(),h(),_(),T(),d(),K(),en(),M(),V(),xn=new WeakMap}));function Q(e){let{schema:t,value:n,path:r,hints:i,unsupported:a,disabled:o,onPatch:s}=e,c=e.showLabel??!0,l=z(t),{label:u,help:d,tags:f}=N(r,t,i),m=se(r),h=e.searchCriteria;if(a.has(m))return J({label:u,tags:[],showLabel:!0,control:p,error:w(`configForm.unsupportedNode`)});if(h&&ee(h)&&!F({schema:t,value:n,path:r,hints:i,criteria:h}))return p;let _=Ct(e);if(wt(e,_))return g`
      <openclaw-config-form-structured-draft
        class="cfg-structured-draft"
        .props=${{identity:B(r,`structured-draft`),sourceIdentity:e.sourceIdentity??n,initialValue:_,params:e,renderNode:Q}}
      ></openclaw-config-form-structured-draft>
    `;if(t.anyOf||t.oneOf){let i=(t.anyOf??t.oneOf??[]).filter(e=>!(e.type===`null`||Array.isArray(e.type)&&e.type.includes(`null`)));if(i.length===1){let t=i[0];return t?Q({...e,schema:t}):p}let a=i.map(e=>{if(e.const!==void 0)return e.const;if(e.enum&&e.enum.length===1)return e.enum[0]}),l=a.every(e=>e!==void 0);if(l&&a.length>0&&a.length<=5){let i=n===void 0?t.default:n;return J({label:u,help:d,defaultDescription:Y(t,n),tags:f,showLabel:c,control:g`
          ${Xt({options:a,resolvedValue:i,disabled:o,ariaLabel:u,onSelect:e=>s(r,e)})}
          ${X(e)}
        `})}if(l&&a.length>5)return bn({...e,options:a});let m=new Set(i.map(e=>z(e)).filter(Boolean)),h=new Set([...m].map(e=>e===`integer`?`number`:e));if([...h].every(e=>[`string`,`number`,`boolean`].includes(e))){let n=h.has(`string`),r=h.has(`number`);if(h.has(`boolean`)&&h.size===1)return Q({...e,schema:{...t,type:`boolean`,anyOf:void 0,oneOf:void 0}});if(n||r)return vn({...e,inputType:r&&!n?`number`:`text`})}return ln(e)}if(t.enum){let i=t.enum;if(i.length<=5){let a=n===void 0?t.default:n;return J({label:u,help:d,defaultDescription:Y(t,n),tags:f,showLabel:c,control:g`
          ${Xt({options:i,resolvedValue:a,disabled:o,ariaLabel:u,onSelect:e=>s(r,e)})}
          ${X(e)}
        `})}return bn({...e,options:i})}if(l===`object`)return nn(e,Q);if(l===`array`)return rn(e,Q);if(l===`boolean`){let i=typeof n==`boolean`?n:typeof t.default==`boolean`&&t.default,a=e=>s(r,e);return c?_e({title:u,description:d||f.length>0||t.default!==void 0?g`
            ${d??p} ${d&&t.default!==void 0?g`<br />`:p}
            ${Y(t,n)}${qt(f)}
          `:void 0,checked:i,disabled:o,onChange:a,actions:X(e)}):J({label:u,help:d,tags:f,showLabel:c,control:ve({checked:i,disabled:o,ariaLabel:u,onChange:a})})}return l===`number`||l===`integer`?yn(e):l===`string`?vn({...e,inputType:`text`}):Rt(t)?ln(e):J({label:u,tags:[],showLabel:!0,control:p,error:w(`configForm.unsupportedType`,{type:String(l)})})}var Cn=e((()=>{h(),T(),Et(),cn(),un(),Sn(),en(),M(),V(),be()}));function wn(e){return g`<div class="config-advanced-divider">
    <span>${w(`configForm.advancedDivider`)}</span>
    ${e?g`<button
          type="button"
          class="config-advanced-divider__toggle config-show-advanced active"
          aria-pressed="true"
          @click=${()=>e()}
        >
          ${w(`common.hideAdvanced`)}
        </button>`:p}
  </div>`}function Tn(e){let t=P({schema:e.schema,path:e.path.map(String),hints:e.hints}),n=!!t.common||!!e.onHideAdvanced;return g`
    <div class="config-tier-groups">
      ${t.common?g`<div class="settings-group">${e.renderTier(t.common)}</div>`:p}
      ${t.advanced&&t.advancedLeafCount>0?e.revealAdvanced?g`
              ${n?wn(e.onHideAdvanced):p}
              <div class="settings-group">${e.renderTier(t.advanced)}</div>
            `:g`
              <button
                type="button"
                class="config-advanced-ghost config-show-advanced"
                aria-pressed="false"
                @click=${()=>e.onShowAdvanced()}
              >
                <span class="config-advanced-ghost__count">
                  ${w(t.advancedLeafCount===1?`configForm.advancedHidden`:`configForm.advancedHiddenPlural`,{count:String(t.advancedLeafCount)})}
                </span>
                <span class="config-advanced-ghost__action">${w(`configForm.showAdvanced`)}</span>
              </button>
            `:p}
    </div>
  `}function En(e){let t=te[e.key];return O({key:e.key,schema:e.schema,value:e.sectionValue,hints:e.uiHints,query:e.query,label:t?.label,description:t?.description})}function Dn(e){if(!e.schema)return g` <div class="muted">${w(`configForm.schemaUnavailable`)}</div> `;let t=e.schema,n=e.value??{};if(z(t)!==`object`||!t.properties)return g` <div class="callout danger">${w(`configForm.unsupportedSchema`)}</div> `;let i=new Set(e.unsupportedPaths??[]),o=t.properties,s=e.searchQuery??``,c=k(s),l=e.activeSection,u=e.activeSubsection??null,d=Object.entries(o).toSorted((t,n)=>{let r=oe([t[0]],e.uiHints)?.order??50,i=oe([n[0]],e.uiHints)?.order??50;return r===i?t[0].localeCompare(n[0]):r-i}).filter(([t,r])=>!(l&&t!==l||s&&!En({key:t,schema:r,sectionValue:n[t],uiHints:e.uiHints,query:s}))),f=null;if(l&&u&&d.length===1){let e=d[0]?.[1];e&&z(e)===`object`&&e.properties&&e.properties[u]&&(f={sectionKey:l,subsectionKey:u,schema:e.properties[u]})}if(d.length===0)return e.embedded&&!s?p:ye(ge(s?w(`configForm.noSettingsMatch`,{query:s}):w(`configForm.noSettingsInSection`)));let m=t=>{let n=oe(t.path.slice(0,1),e.uiHints)?.docsUrl,o=`settings-section-help-${t.id}`,l=e.showAdvanced===!0||e.forceAdvancedSection===t.path[0]||!!s;return g`
      <section class="settings-section" id=${t.id}>
        <div class="settings-section__header">
          <h2 class="settings-section__heading">${t.label}</h2>
          ${e.sectionActions||n?g`<div class="settings-section__actions">
                ${e.sectionActions??p}
                ${n?g`
                      <span class="settings-section__docs">
                        <button
                          id=${o}
                          type="button"
                          class="settings-section__help-button"
                          aria-label=${w(`configForm.sectionHelp`,{section:t.label})}
                          aria-haspopup="dialog"
                        >
                          <span aria-hidden="true">?</span>
                        </button>
                        <wa-popover
                          class="settings-section__help-popover"
                          for=${o}
                          placement="bottom-end"
                        >
                          <div class="settings-section__help-panel">
                            ${t.description?g`<p>${t.description}</p>`:p}
                            <a
                              href=${n}
                              target=${r}
                              rel=${a()}
                              >${w(`configForm.readGuide`)} <span aria-hidden="true">→</span></a
                            >
                          </div>
                        </wa-popover>
                      </span>
                    `:p}
              </div>`:p}
        </div>
        ${t.description?g`<p class="settings-section__desc">${t.description}</p>`:p}
        ${Tn({schema:t.node,path:t.path,hints:e.uiHints,revealAdvanced:l,onShowAdvanced:e.onShowAdvanced,onHideAdvanced:e.showAdvanced===!0&&e.forceAdvancedSection!==t.path[0]&&!s?e.onHideAdvanced:void 0,renderTier:n=>Q({schema:n,value:t.nodeValue,path:t.path,hints:e.uiHints,rawAvailable:e.rawAvailable??!0,unsupported:i,disabled:e.disabled??!1,showLabel:!1,showHeaderMeta:!0,searchCriteria:c,revealSensitive:e.revealSensitive??!1,isSensitivePathRevealed:e.isSensitivePathRevealed,onToggleSensitivePath:e.onToggleSensitivePath,onPatch:e.onPatch,onRemove:e.onRemove})})}
      </section>
    `};return ye(f?(()=>{let{sectionKey:t,subsectionKey:r,schema:i}=f,a=oe([t,r],e.uiHints),o=a?.label??i.title??ie(r),s=a?.help??i.description??``,c=n[t],l=c&&typeof c==`object`?c[r]:void 0;return m({id:`config-section-${t}-${r}`,label:o,description:s,node:i,nodeValue:l,path:[t,r]})})():d.map(([e,t])=>{let r=te[e]??{label:e.charAt(0).toUpperCase()+e.slice(1),description:t.description??``};return m({id:`config-section-${e}`,label:r.label,description:r.description,node:t,nodeValue:n[e],path:[e]})}))}var On=e((()=>{h(),T(),o(),xe(),A(),Cn(),M(),V(),L(),be()}));function kn(e){return Object.keys(e??{}).filter(e=>!qn.has(e)).length===0}function An(e){let t=e.filter(e=>e!=null),n=t.length!==e.length;return{enumValues:jn(t),nullable:n}}function jn(e){let t=[];for(let n of e)t.some(e=>Object.is(e,n))||t.push(n);return t}function Mn(e,t=new Set){if(t.has(e))return new Set;t.add(e);let n=new Set,r=Array.isArray(e.type)?e.type:e.type?[e.type]:[];for(let e of r)e!==`null`&&n.add(e);n.size===0&&(e.properties||e.additionalProperties)&&n.add(`object`);for(let r of e.allOf??[])for(let e of Mn(r,t))n.add(e);return t.delete(e),n}function Nn(e){if(e.size===1)return e.values().next().value;if(e.size>1&&[...e].every(e=>e===`number`||e===`integer`))return e.has(`integer`)?`integer`:`number`}function Pn(e){return e.size>1&&Nn(e)===void 0}function Fn(e){return Nn(Mn(e))}function In(e){return!!(Fn(e)||e.items||e.enum||e.anyOf||e.oneOf||e.allOf)}function Ln(e){return Object.keys(e).every(e=>Jn.has(e))}function Rn(e){return Object.keys(e).every(e=>Yn.has(e))}function zn(e,t=new Set){if(t.has(e))return!1;t.add(e);let n=Array.isArray(e.type)?e.type:e.type?[e.type]:[],r=e.nullable===!0||n.length===0||n.includes(`null`);return e.const!==void 0&&(r&&=e.const===null),e.enum&&(r&&=e.enum.some(e=>e===null)),e.allOf&&(r&&=e.allOf.every(e=>zn(e,t))),e.anyOf&&(r&&=e.anyOf.some(e=>zn(e,t))),e.oneOf&&(r&&=e.oneOf.filter(e=>zn(e,t)).length===1),t.delete(e),r}function Bn(e){let t=[e],n=new Set,r=0,i=!1;for(;t.length>0;){let e=t.pop();!e||n.has(e)||(n.add(e),Array.isArray(e.items)?r=Math.max(r,e.items.length):e.items&&(i=!0),t.push(...e.allOf??[]))}let a=Math.max(r,+!!i);return Array.from({length:a},(e,t)=>t)}function Vn(e){let t=[],n=[e],r=new Set;for(;n.length>0;){let e=n.pop();!e||r.has(e)||(r.add(e),t.push(e),n.push(...e.allOf??[]))}if(t.length<=1)return!1;let i=new Set(t.flatMap(e=>Object.keys(e.properties??{})));return t.some(e=>{let t=e.additionalProperties;return!!t&&typeof t==`object`&&Object.keys(t).length>0&&[...i].some(t=>!Object.hasOwn(e.properties??{},t))})}function Hn(e){return!e||typeof e!=`object`?{schema:null,unsupportedPaths:[`<root>`]}:$(e,[])}function $(e,t,n=!1,r,i){let a=new Set,o={...e},s=se(t)||`<root>`;if(Rn(e)||a.add(s),e.anyOf||e.oneOf){let n=Kn(e,t);return n?{schema:n.schema,unsupportedPaths:Array.from(new Set([...a,...n.unsupportedPaths]))}:{schema:e,unsupportedPaths:[s]}}let c=Array.isArray(e.type)?e.type.filter(e=>e!==`null`):[],l=Mn(e),u=n&&!!r&&e.type===void 0&&l.size===0;u&&r&&l.add(r),n&&r&&l.size>0&&Pn(new Set([...l,r]))&&a.add(s),(new Set(c).size>1||Pn(l))&&a.add(s);let d=Nn(l),f=zn(e)&&(i===void 0||i);if(e.allOf){let n=[];for(let r of e.allOf){if(!r||typeof r!=`object`){a.add(s);continue}if(!In(r)){n.push(r),Ln(r)||a.add(s);continue}let e=$(r,t,!0,d,f);n.push(e.schema??r);for(let t of e.unsupportedPaths)a.add(t)}o.allOf=n}o.type=d??e.type,o.nullable=f;let p=e.properties!==void 0||e.additionalProperties!==void 0,m=e.items!==void 0||e.additionalItems!==void 0;if(o.enum){let{enumValues:e,nullable:t}=An(o.enum);o.enum=e,o.enumIncludesNull=t&&f,e.length===0&&a.add(s)}if(e.allOf&&f&&!o.enumIncludesNull&&a.add(s),d===`object`&&(!u||p)){let r=e.properties??{},i=new Set(nt(e)),c=it(e);[...tt(e)].some(e=>!i.has(e))&&!c&&a.add(s),Vn(e)&&a.add(s);let l={};for(let[e,i]of Object.entries(r)){if(n&&!In(i)){l[e]=i,Ln(i)||a.add(se([...t,e])||`<root>`);continue}let r=$(i,[...t,e],n);r.schema&&(l[e]=r.schema);for(let e of r.unsupportedPaths)a.add(e)}if(o.properties=l,e.allOf)for(let n of nt(e)){let r=st(e,n);if(!r)continue;let i=$(r,[...t,n]);for(let e of i.unsupportedPaths)a.add(e)}if(e.additionalProperties===!0)o.additionalProperties={};else if(e.additionalProperties===!1)o.additionalProperties=!1;else if(e.additionalProperties&&typeof e.additionalProperties==`object`&&!kn(e.additionalProperties)){let r=$(e.additionalProperties,[...t,`*`],n);o.additionalProperties=r.schema??e.additionalProperties,r.unsupportedPaths.length>0&&a.add(s)}}else if(d===`array`&&(!u||m)){if(Array.isArray(e.items)){let r=[];for(let i=0;i<e.items.length;i+=1){let o=e.items[i];if(!o){a.add(s);continue}if(n&&!In(o)){r.push(o),Ln(o)||a.add(s);continue}let c=$(o,[...t,i],n);r.push(c.schema??o);for(let e of c.unsupportedPaths)a.add(e)}if(o.items=r,e.additionalItems&&typeof e.additionalItems==`object`)if(n&&!In(e.additionalItems))o.additionalItems=e.additionalItems,Ln(e.additionalItems)||a.add(s);else{let r=$(e.additionalItems,[...t,`*`],n);o.additionalItems=r.schema??e.additionalItems;for(let e of r.unsupportedPaths)a.add(e)}else o.additionalItems=e.additionalItems}else if(!e.items)a.add(s);else if(n&&!In(e.items))o.items=e.items,Ln(e.items)||a.add(s);else{let r=$(e.items,[...t,`*`],n);o.items=r.schema??e.items,r.unsupportedPaths.length>0&&a.add(s)}if(e.allOf)for(let n of Bn(e)){let r=ct(e,n);if(!r)continue;let i=$(r,[...t,n]);for(let e of i.unsupportedPaths)a.add(e)}}else!(u&&(d===`object`||d===`array`))&&d!==`string`&&d!==`number`&&d!==`integer`&&d!==`boolean`&&!o.enum&&!(n&&e.allOf)&&a.add(s);return{schema:o,unsupportedPaths:Array.from(a)}}function Un(e){if(z(e)!==`object`)return!1;let t=e.properties?.source,n=e.properties?.provider,r=e.properties?.id;return!t||!n||!r?!1:typeof t.const==`string`&&z(n)===`string`&&z(r)===`string`}function Wn(e){let t=e.oneOf??e.anyOf;return!t||t.length===0?!1:t.every(e=>Un(e))}function Gn(e,t,n,r){let i=n.findIndex(e=>z(e)===`string`);if(i<0)return null;let a=n.filter((e,t)=>t!==i),o=a[0],s=n[i];return a.length!==1||!o||!s||!Wn(o)?null:$({...e,...s,nullable:r||s.nullable,anyOf:void 0,oneOf:void 0,allOf:void 0},t)}function Kn(e,t){if(e.allOf)return null;let n=e.anyOf??e.oneOf;if(!n)return null;let r=[],i=[],a=!1;for(let e of n){if(!e||typeof e!=`object`)return null;if(Array.isArray(e.enum)){let{enumValues:t,nullable:n}=An(e.enum);r.push(...t),n&&(a=!0);continue}if(`const`in e){if(e.const==null){a=!0;continue}r.push(e.const);continue}if(z(e)===`null`){a=!0;continue}i.push(e)}a&&=zn(e);let o=Gn(e,t,i,a);if(o)return o;if(r.length>0&&i.length===0)return{schema:{...e,enum:jn(r),nullable:a,enumIncludesNull:a,anyOf:void 0,oneOf:void 0,allOf:void 0},unsupportedPaths:[]};if(r.length>0&&i.length>0)return null;if(i.length===1){let n=i[0];return n?$({...e,...n,nullable:a||n.nullable,anyOf:void 0,oneOf:void 0,allOf:void 0},t):null}return i.length>0&&r.length===0&&i.every(e=>{let t=z(e);return!!t&&Xn.has(String(t))})?{schema:{...e,nullable:a},unsupportedPaths:[]}:null}var qn,Jn,Yn,Xn,Zn=e((()=>{K(),V(),qn=new Set([`$id`,`$schema`,`title`,`description`,`default`,`deprecated`,`nullable`,`enumIncludesNull`,`examples`,`readOnly`,`tags`,`writeOnly`,`x-tags`]),Jn=new Set([...qn,`const`,`required`,`additionalProperties`,`minimum`,`maximum`,`exclusiveMinimum`,`exclusiveMaximum`,`multipleOf`,`minLength`,`maxLength`,`pattern`,`minItems`,`maxItems`,`uniqueItems`]),Yn=new Set([...Jn,`type`,`properties`,`items`,`additionalItems`,`enum`,`anyOf`,`oneOf`,`allOf`]),Xn=new Set([`string`,`number`,`integer`,`boolean`,`object`,`array`])})),Qn=e((()=>{On(),Zn(),Cn(),V()}));export{Dn as a,Q as c,On as i,dn as l,Hn as n,Tn as o,Zn as r,Cn as s,Qn as t,pn as u};
//# sourceMappingURL=config-form-GabCm1us.js.map