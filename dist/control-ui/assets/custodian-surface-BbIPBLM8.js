import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,y as n}from"./control-ui-foundation-OE0aAIzW.js";import{Cs as r,Kc as i,Wc as a,_s as o,ca as s,da as c,fs as l,ls as u,sa as d}from"./control-ui-core-UWR2ANgr.js";import{K as f,Q as p,W as m,Y as h,it as g,nt as ee}from"./lit-runtime-D5xZwgO1.js";import{St as te,i as ne,r as re}from"./control-ui-foundation-Dgui328h.js";import{$ as ie,Gt as ae,_,et as oe,lt as se,nn as ce,pn as le,qt as ue,rn as de,ut as v,v as fe}from"./control-ui-core-DDTXn_ud.js";import{o as y,t as b}from"./control-ui-core-BCL4Sy8S.js";import{G as pe,vt as me,yt as he}from"./control-ui-core-DS6N4FyQ.js";import{i as x,n as ge}from"./gateway-runtime-DWs8EJ0W.js";import{o as _e,s as ve,t as S}from"./src-Xal_rlTa.js";import{n as ye,t as be}from"./wizard-step-controls-9QekdMY8.js";import{An as xe,jn as Se,r as C,t as w}from"./chat-message-DTYom_6U.js";import{t as T}from"./text-CjvvY051.js";function E(e,t){return c({face:`chat`,sessionKey:t,fallbackAgentId:s(e),basePath:e.basePath,mainKey:r({agentsList:e.agents.state.agentsList,hello:e.gateway.snapshot.hello})}).href}var D=e((()=>{d(),l()}));function O(e,t){return e.options?.find(e=>Object.is(e.value,t))}function k(e,t){if(e.type===`note`||e.type===`action`||e.type===`progress`)return{answer:{stepId:e.id},display:y(`common.continue`)};if(e.type===`text`)return typeof t==`string`?{answer:{stepId:e.id,value:t},display:t}:null;if(e.type===`confirm`)return typeof t==`boolean`?{answer:{stepId:e.id,value:t},display:y(t?`common.yes`:`common.no`)}:null;if(e.type===`select`){let n=O(e,t);return n?{answer:{stepId:e.id,value:t},display:n.label}:null}if(!Array.isArray(t))return null;if(t.length===0)return{answer:{stepId:e.id,value:[]},display:y(`common.none`)};let n=t.map(t=>O(e,t)?.label);return n.every(e=>e!==void 0)?{answer:{stepId:e.id,value:t},display:n.join(`, `)}:null}function A(e){return e.type===`multiselect`?Array.isArray(e.initialValue)?[...e.initialValue]:[]:e.initialValue}var j=e((()=>{b()}));function Ce(e,t){return t===`received`?`sent`:e instanceof se||t===`unsent`?`rejected`:`unknown`}function we(e,t){return t===`sent`?!1:t===`unknown`||e}function Te(e,t,n){return n!==`rejected`&&e!==null&&e.severity===t.severity&&e.message===t.message}function Ee(e,t,n){if(n.event!==`health`)return[e,t];let r=Pe(n);return t?[r,t]:[r,null]}function De(e){if(e.kind===`config-reload`)return y(`custodian.nudge.configReload`);let t=e.channelLabel??y(`custodian.nudge.channelFallback`);return e.kind===`channel-auth`?y(`custodian.nudge.channelAuth`,{channel:t}):e.kind===`channel-disconnected`?y(`custodian.nudge.channelDisconnected`,{channel:t}):y(`custodian.nudge.channelDegraded`,{channel:t})}function Oe(e){return h`<div class="custodian__nudge" role="status">
    <button
      class="custodian__nudge-action"
      type="button"
      ?disabled=${e.disabled}
      @click=${e.onSend}
    >
      ${De(e.nudge)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${y(`custodian.nudge.dismiss`)}
      @click=${e.onDismiss}
    >
      ×
    </button>
  </div>`}function ke(e){return h`<div class="custodian__nudge custodian__nudge--channel-onboarding" role="status">
    <div class="custodian__nudge-copy">
      <strong>${y(`custodian.nudge.channelSetupTitle`)}</strong>
      <span>${y(`custodian.nudge.channelSetupBody`)}</span>
    </div>
    <button
      class="btn btn--sm primary custodian__nudge-cta"
      type="button"
      @click=${e.onOpenChannels}
    >
      ${y(`custodian.nudge.channelSetupAction`)}
    </button>
    <button
      class="custodian__nudge-dismiss"
      type="button"
      aria-label=${y(`custodian.nudge.channelSetupDismiss`)}
      @click=${e.onDismiss}
    >
      ×
    </button>
  </div>`}function M(e){return typeof e==`object`&&e&&!Array.isArray(e)?e:null}function Ae(e){return P.some(t=>e[t]===`configured_unavailable`)}function je(e){return M(e.probe)?.ok===!1}function Me(e,t,n){if(n.configured===!1||n.enabled===!1)return null;let r=e.toLowerCase();if(Ae(n))return{severity:3,kind:`channel-auth`,channelLabel:t,message:`what happened with ${r} authentication?`};let i=typeof n.healthState==`string`?n.healthState.trim().toLowerCase():void 0;if(i===`terminal-disconnect`||je(n))return{severity:3,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`};if(i===`not-running`&&n.running===!1){let e=typeof n.reconnectAttempts==`number`?n.reconnectAttempts:0,t=typeof n.lastStartAt==`number`?n.lastStartAt:void 0,r=typeof n.lastStopAt==`number`?n.lastStopAt:void 0;if(n.restartPending===!1&&r!==void 0&&(t===void 0||r>=t)&&e<10)return null}return n.connected!==!0&&i!==`healthy`&&typeof n.lastError==`string`&&n.lastError.trim()?{severity:3,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`}:n.connected===!1&&n.running===!0?{severity:2,kind:`channel-disconnected`,channelLabel:t,message:`what happened with ${r}?`}:i&&N.has(i)?{severity:1,kind:`channel-degraded`,channelLabel:t,message:`what happened with ${r}?`}:null}function Ne(e){let t=M(e);if(!t)return null;if(M(t.configReload)?.hotReloadStatus===`disabled`)return{severity:3,kind:`config-reload`,message:`what happened with configuration reload?`};let n=M(t.channels);if(!n)return null;let r=M(t.channelLabels),i=null;for(let[e,t]of Object.entries(n)){let n=M(t);if(!n)continue;let a=typeof r?.[e]==`string`?r[e]:e,o=M(n.accounts),s=o?Object.values(o).map(M).filter(e=>e!==null):[],c=s.length>0?s:[n];for(let t of c){let n=Me(e,a,t);n&&(!i||n.severity>i.severity)&&(i=n)}}return i}function Pe(e){return e.event===`health`?Ne(e.payload):null}var N,P,F=e((()=>{m(),v(),b(),N=new Set([`disconnected`,`stale-socket`,`stuck`,`terminal-disconnect`]),P=[`tokenStatus`,`botTokenStatus`,`appTokenStatus`,`signingSecretStatus`,`userTokenStatus`]}));function Fe(e,t){return e?`onboarding`:t?`new-agent`:`caretaker`}function I(e,t){let n=e===`caretaker`?{}:{welcomeVariant:e};if(t===void 0)return n;let r=window.location.pathname,i=le(r,ce(r));return{...n,message:t,...i?{context:{page:i}}:{}}}function Ie(e){return ve(e&&typeof e==`object`?e.details:void 0)!==void 0}var L=e((()=>{S(),de()}));function R(e){return typeof e==`string`&&e.trim()?e.trim():null}function Le(e){if(!e||typeof e!=`object`)return null;let t=R(e.id),n=R(e.header),r=R(e.question);if(!t||!n||!r||!Array.isArray(e.options)||e.options.length<2||e.options.length>4)return null;let i=[];for(let t of e.options){let e=R(t?.label);if(!e)return null;let n=R(t.description??null),r=R(t.reply??null);i.push({label:e,...n?{description:n}:{},...t.recommended===!0?{recommended:!0}:{},...r?{reply:r}:{}})}return new Set(i.map(e=>e.label.toLocaleLowerCase())).size!==i.length||i.filter(e=>e.recommended).length>1?null:{id:t,header:n,question:r,options:i,isOther:e.isOther===!0,...e.skipAction===`exit`?{skipAction:`exit`}:{}}}var Re=e((()=>{})),ze=e((()=>{})),z,Be=e((()=>{m(),p(),b(),ze(),t(),z=class extends te{constructor(...e){super(...e),this.selectedValue=``,this.requestKey=``,this.focusPreselection=!1}createRenderRoot(){return this}willUpdate(){let e=this.props,t=e?JSON.stringify([e.header??``,e.question,e.options.map(e=>[e.value,e.label,e.recommended===!0])]):``;t!==this.requestKey&&(this.requestKey=t,this.selectedValue=e?.options.slice(0,4).find(e=>e.recommended)?.value??``,this.focusPreselection=!!this.selectedValue)}updated(e){!this.focusPreselection||this.props?.disabled||(this.focusPreselection=!1,[...this.querySelectorAll(`.option-card__choice`)].find(e=>e.dataset.optionValue===this.selectedValue)?.focus({preventScroll:!0}))}select(e){this.props?.disabled||(this.selectedValue=e,this.props?.onSelect?.(e),this.dispatchEvent(new CustomEvent(`option-select`,{bubbles:!0,composed:!0,detail:{value:e}})))}skip(){this.props?.disabled||(this.props?.onSkip?.(),this.dispatchEvent(new CustomEvent(`option-skip`,{bubbles:!0,composed:!0})))}render(){let e=this.props;if(!e)return f;let t=e.options.slice(0,4),n=t.findIndex(e=>e.recommended===!0);return h`
      <section class="option-card" role="group" aria-label=${e.question}>
        ${e.header?h`<div class="option-card__chip">${e.header}</div>`:f}
        <div class="option-card__question">${e.question}</div>
        <div class="option-card__choices" role="radiogroup">
          ${t.map((t,r)=>{let i=r===n,a=t.value===this.selectedValue;return h`
              <button
                class=${`option-card__choice ${i?`option-card__choice--recommended`:``} ${a?`option-card__choice--selected`:``}`}
                type="button"
                role="radio"
                aria-checked=${a?`true`:`false`}
                data-option-value=${t.value}
                ?disabled=${e.disabled}
                @click=${()=>this.select(t.value)}
              >
                <span class="option-card__choice-copy">
                  <strong>${t.label}</strong>
                  ${t.description?h`<span class="option-card__description">${t.description}</span>`:f}
                </span>
                ${i?h`<span class="option-card__recommended">
                      ${y(`optionCard.recommended`)}
                    </span>`:f}
              </button>
            `})}
        </div>
        <button
          class="option-card__skip"
          type="button"
          ?disabled=${e.disabled}
          @click=${()=>this.skip()}
        >
          ${y(`optionCard.skip`)}
        </button>
      </section>
    `}},n([g({attribute:!1})],z.prototype,`props`,void 0),n([ee()],z.prototype,`selectedValue`,void 0),customElements.get(`openclaw-option-card`)||customElements.define(`openclaw-option-card`,z)}));function Ve(e){return h`<div class="custodian__option-card">
    <openclaw-option-card
      .props=${{header:e.question.header,question:e.question.question,options:e.question.options.map(e=>({value:e.label,label:e.label,description:e.description,recommended:e.recommended})),disabled:e.disabled,onSelect:e.onSelect,onSkip:e.onSkip}}
    ></openclaw-option-card>
  </div>`}var He=e((()=>{m(),Be()}));function Ue(e,t,n,r,i){return r||i||e.some(e=>e.question!==null&&!t.has(`${e.id}:${e.question.id}`)&&!n.has(`${e.id}:${e.question.id}`))}function B(e,t){let n=new Set(t);for(let t of e)t.question&&n.add(`${t.id}:${t.question.id}`);return n}function V(){return typeof crypto.randomUUID==`function`?`control-ui-onboarding-${crypto.randomUUID()}`:`control-ui-onboarding-${[...crypto.getRandomValues(new Uint32Array(4))].map(e=>e.toString(16).padStart(8,`0`)).join(``)}`}function H(e){return e instanceof Error&&e.message.trim()?e.message:y(`custodian.requestFailed`)}function We(e){let t=`msg-${e.id}`;return{kind:`group`,key:t,role:e.role,messages:[{message:{role:e.role,content:e.text},key:t}],timestamp:e.at,isStreaming:!1}}async function Ge(e){try{return(await e.request(`openclaw.chat.history`,{},{timeoutMs:U})).turns}catch{return null}}function Ke(e,t){let n=t;return{messages:e.map(e=>({id:n++,role:e.role,text:e.role===`user`&&e.text===W?y(`custodian.sensitiveReply`):e.text,at:e.at,question:null,step:null})),nextMessageId:n}}function qe(e,t){return e.id===t?Se({kind:`divider`,key:`custodian-earlier`,label:y(`custodian.earlier`),timestamp:e.at}):f}function Je(e){let t=e.message.question,n=e.message.step;return h`
    ${e.message.text?C(We(e.message),{showReasoning:!1,showToolCalls:!1,assistantName:y(`custodian.title`),assistantAvatar:e.assistantAvatar}):f}
    ${qe(e.message,e.boundaryAfterId)}
    ${e.showQuestion&&t?Ve({question:t,disabled:e.questionDisabled,onSelect:e.onSelect,onSkip:e.onSkip}):f}
    ${e.showWizardStep&&n?h`<section
          class="custodian__wizard-step"
          aria-label=${n.title??n.message??`Setup`}
        >
          ${n.title?h`<strong class="custodian__wizard-title">${n.title}</strong>`:f}
          ${ye({step:n,value:e.wizardValue,busy:e.wizardDisabled,inputId:`custodian-wizard-input-${e.message.id}`,sensitiveRevealed:e.wizardSecretVisible,onValueChange:e.onWizardValueChange,onAnswer:e.onWizardAnswer,onToggleSensitiveVisibility:e.onToggleWizardSecretVisibility})}
        </section>`:f}
  `}var U,W,G=e((()=>{m(),be(),b(),xe(),w(),He(),U=15e3,W=`<redacted secret>`}));function K(e){return e.message!==void 0||e.wizardAnswer!==void 0}var q,J,Y,X,Z=e((()=>{S(),ie(),b(),ge(),l(),D(),j(),F(),L(),Re(),G(),q=19e4,J=/^\s*NO_REPLY\s*$/,Y=class{constructor(){this.messages=[],this.input=``,this.sending=!1,this.sensitive=!1,this.wizardInputPending=!1,this.wizardSecretVisible=!1,this.questionReplyUncertain=!1,this.error=null,this.setupIssue=null,this.dismissedQuestions=new Set,this.answeredQuestions=new Set,this.activeClient=null,this.chatAvailable=!1,this.eventNudge=null,this.eventNudgePending=null,this.channelOnboardingNudgeClosed=!1,this.earlierBoundaryAfterId=null,this.abandonedTurnOutcomeUnknown=!1,this.context=null,this.variant=`caretaker`,this.sessionVariant=null,this.sessionId=V(),this.requestEpoch=0,this.nextMessageId=1,this.retryParams=null,this.sessionClient=null,this.sessionOwnershipKey=null,this.sessionStarted=!1,this.lastHelloDeviceToken=``,this.configuredInferenceState=`unresolved`,this.eventNudgeClosed=!1,this.gatewayCleanup=null,this.agentCleanup=null,this.eventCleanup=null,this.listeners=new Set}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}connect(e,t){let n=this.context!==e,r=this.variant!==t;!n&&!r||(n&&(this.gatewayCleanup?.(),this.agentCleanup?.(),this.eventCleanup?.(),this.context=e,this.gatewayCleanup=e.gateway.subscribe(()=>{this.synchronizeClient(),this.emit()}),this.agentCleanup=e.agents.subscribe(()=>{this.synchronizeClient(),this.emit()}),this.eventCleanup=e.gateway.subscribeEvents(e=>{this.variant!==`caretaker`||this.eventNudgeClosed||([this.eventNudge,this.eventNudgePending]=Ee(this.eventNudge,this.eventNudgePending,e),this.emit())})),this.variant=t,this.synchronizeClient(),this.emit())}setInput(e){this.input=e,this.emit()}setWizardValue(e){this.wizardValue=e,this.emit()}toggleWizardSecretVisibility(){this.wizardSecretVisible=!this.wizardSecretVisible,this.emit()}hasRealUserTurn(){return this.messages.some(e=>e.role===`user`)}get activeVariant(){return this.variant}hasUnresolvedQuestion(){return Ue(this.messages,this.dismissedQuestions,this.answeredQuestions,this.wizardInputPending,this.questionReplyUncertain)}canRetry(){return this.retryParams!==null&&!K(this.retryParams)}get setupRequired(){return this.setupIssue!==null}retry(){let e=this.activeClient,t=this.retryParams;e&&t&&!K(t)&&this.chatAvailable&&!this.sending&&this.initializeSession(e,t)}async send(e=this.input,t,n=this.hasUnresolvedQuestion()){let r=this.sensitive?e:e.trim(),i=this.activeClient;if(!r.trim()||!i||!this.chatAvailable||this.sending||this.setupRequired)return this.emit(),`rejected`;let a=this.sensitive?y(`custodian.sensitiveReply`):t??r;return await this.sendUserTurn(i,{sessionId:this.sessionId,...I(this.variant,r)},a,n)}async sendUserTurn(e,t,n,r){let i=[this.answeredQuestions,this.questionReplyUncertain];r&&(this.questionReplyUncertain=!0),this.abandonedTurnOutcomeUnknown=!1,this.answeredQuestions=B(this.messages,this.answeredQuestions),this.messages=[...this.messages,{id:this.nextMessageId++,role:`user`,text:n,at:Date.now(),question:null,step:null}],this.input=``,this.emit();let a=this.requestReply(e,t),o=this.requestEpoch,s=await a;return r&&this.requestEpoch===o&&(this.questionReplyUncertain=we(i[1],s),s===`rejected`&&(this.answeredQuestions=i[0]),this.emit()),s}async sendEventNudge(){let e=this.eventNudge;if(!e||this.sensitive||this.hasUnresolvedQuestion())return;this.eventNudgePending=e,this.emit();let t=await this.send(e.message);if(this.eventNudgePending===e){this.eventNudgePending=null;let n=Te(this.eventNudge,e,t);[this.eventNudgeClosed,this.eventNudge]=[n,n?null:this.eventNudge],this.emit()}}dismissEventNudge(){[this.eventNudge,this.eventNudgeClosed]=[null,!0],this.emit()}dismissChannelOnboardingNudge(){this.channelOnboardingNudgeClosed=!0,this.emit(),this.context?.replace(`custodian`)}openChannelsFromOnboarding(){this.channelOnboardingNudgeClosed=!0,this.emit(),this.context?.navigate(`channels`)}async dismissQuestion(e){let t=e.question;if(t){if(t.skipAction===`exit`){this.exitSetup();return}await this.send(t.isOther?y(`optionCard.skip`):`cancel`,y(`optionCard.skip`),!0)!==`rejected`&&this.messages.includes(e)&&(this.dismissedQuestions=new Set(this.dismissedQuestions).add(`${e.id}:${t.id}`),this.emit())}}answerQuestion(e,t){let n=e.question;if(!n)return;let r=n.options.find(e=>e.label===t);this.send(r?.reply??t,t,!0)}answerWizardStep(e,t){if(!e.step||!this.wizardInputPending)return;let n=k(e.step,t),r=this.activeClient;if(!n||!r||!this.chatAvailable||this.sending||this.setupRequired){this.emit();return}let i=e.step.sensitive?y(`custodian.sensitiveReply`):n.display;this.sendUserTurn(r,{sessionId:this.sessionId,wizardAnswer:n.answer},i,!0)}exitSetup(){this.context?.navigate(`chat`)}openModelSetup(){this.context?.navigate(`model-setup`)}emit(){for(let e of this.listeners)e()}currentSessionOwnershipKey(){let e=this.context;if(!e)return``;let{gatewayUrl:t,token:n,password:r,bootstrapToken:i}=e.gateway.connection,a=e.gateway.snapshot.hello?.auth;return a&&(this.lastHelloDeviceToken=a.deviceToken??``),JSON.stringify([t,n,r,i,this.lastHelloDeviceToken])}startSession(e,t,n){this.sessionId=V(),this.sessionVariant=t,this.sessionClient=e,this.sessionOwnershipKey=this.currentSessionOwnershipKey(),this.sessionStarted=!0,this.initializeSession(e,{sessionId:this.sessionId,...I(t)},n)}abandonPendingUserTurn(e){e?.message!==void 0&&(this.retryParams=null,this.abandonedTurnOutcomeUnknown=!0)}rotateVolatileSession(e,t){this.answeredQuestions=B(this.messages,this.answeredQuestions),this.retryParams=null,this.input=``,this.wizardValue=void 0,this.wizardSecretVisible=!1,this.sensitive=this.wizardInputPending=this.questionReplyUncertain=!1,this.error=null,this.setupIssue=null,this.earlierBoundaryAfterId=this.messages.at(-1)?.id??null,this.startSession(e,t,!1)}synchronizeClient(){let e=this.context;if(!e)return;let t=e.gateway.snapshot,n=t.phase===`connected`?t.client:null,r=n!==null&&x(t,`openclaw.chat`)===!0,i=this.resolveConfiguredInferenceState(),a=i!==this.configuredInferenceState;this.configuredInferenceState=i;let o=this.sessionStarted&&this.sessionVariant!==this.variant,s=this.currentSessionOwnershipKey(),c=this.sessionStarted&&n!==null&&this.sessionClient!==null&&n!==this.sessionClient,l=this.sessionOwnershipKey!==null&&s!==this.sessionOwnershipKey;if(n===this.activeClient&&!o&&!c&&!l&&this.chatAvailable===(r&&i!==`unresolved`)&&!a)return;let u=this.sending&&this.retryParams!==null,d=u?this.retryParams:null;if(this.activeClient=n,this.requestEpoch+=1,this.sending=!1,this.chatAvailable=!1,o||l)[this.eventNudge,this.eventNudgePending]=[null,null],this.eventNudgeClosed=!1,this.abandonedTurnOutcomeUnknown=!1,this.sessionStarted=!1,this.clearConversation();else if(n&&c){if(!r){this.sessionStarted=!1,this.abandonPendingUserTurn(d),this.error=y(`custodian.unsupportedGateway`);return}this.chatAvailable=!0,this.abandonPendingUserTurn(d),this.rotateVolatileSession(n,this.currentSessionVariant());return}else u&&(d?.message===void 0&&(this.error=y(`custodian.connectionChanged`)),this.abandonPendingUserTurn(d));if(n){if(!r){this.error=y(`custodian.unsupportedGateway`);return}if(i!==`unresolved`){if(this.chatAvailable=!0,i===`required`){this.sessionStarted=!1,this.clearConversation(),this.setupIssue=`missing`;return}if(a&&(this.setupIssue=null),this.sessionStarted){this.retryParams||(this.error=u?this.error:null);return}this.clearConversation(),this.startSession(n,this.currentSessionVariant(),!0)}}}resolveConfiguredInferenceState(){let e=this.context;if(!e||e.gateway.snapshot.phase!==`connected`)return`unresolved`;let t=e.agents.state.agentsList;if(!t)return`unresolved`;let n=o(e.gateway.snapshot.assistantAgentId??t.defaultId??``),r=t.agents.find(e=>o(e.id)===n);return r?r.model?.primary?.trim()?`ready`:`required`:`unresolved`}currentSessionVariant(){return this.variant}async initializeSession(e,t,n=!0){let r=++this.requestEpoch;this.sending=!0,this.error=null,this.retryParams=t,this.emit(),n&&await this.refreshTranscriptHistory(e,r),!(r!==this.requestEpoch||e!==this.activeClient)&&await this.requestReply(e,t)}async refreshTranscriptHistory(e,t){let n=this.context;if(!n||x(n.gateway.snapshot,`openclaw.chat.history`)!==!0)return;let r=await Ge(e);if(r===null||t!==this.requestEpoch||e!==this.activeClient)return;let i=Ke(r,this.nextMessageId);this.messages=i.messages,this.nextMessageId=i.nextMessageId,this.earlierBoundaryAfterId=this.messages.at(-1)?.id??null,this.emit()}clearConversation(){this.messages=[],this.dismissedQuestions=new Set,this.answeredQuestions=new Set,this.retryParams=null,this.error=null,this.setupIssue=null,this.input=``,this.wizardValue=void 0,this.wizardSecretVisible=!1,this.sensitive=this.wizardInputPending=this.questionReplyUncertain=!1,this.earlierBoundaryAfterId=null}appendAssistant(e,t,n){this.messages=[...this.messages,{id:this.nextMessageId++,role:`assistant`,text:e,at:Date.now(),question:t,step:n}]}async requestReply(e,t){let n=this.context;if(!n)return`rejected`;let r=++this.requestEpoch,i=`unsent`;this.sending=!0,this.error=null,K(t)&&(this.setupIssue=null),this.retryParams=t,this.emit();try{let a=await e.request(`openclaw.chat`,t,{timeoutMs:q,onSent:()=>i=`sent`});if(i=`received`,r!==this.requestEpoch||e!==this.activeClient)return`sent`;this.sessionId=a.sessionId,this.sensitive=a.sensitive===!0,this.wizardInputPending=a.wizardInputPending===!0,this.retryParams=null,this.setupIssue=null;let o=a.step??null,s=o?null:Le(a.question);this.wizardValue=o?A(o):void 0,this.wizardSecretVisible=!1;let c=J.test(a.reply);if((!c||s||o)&&this.appendAssistant(c?``:a.reply,s,o),a.action===`open-agent`){let t=n.gateway.snapshot.sessionKey?.trim();if(a.agentId){let i=await n.agents.refreshList();if(r!==this.requestEpoch||e!==this.activeClient)return`sent`;t=u({agentId:a.agentId,mainKey:i?.mainKey}),oe({selection:n.agentSelection,gateway:n.gateway,sessionKey:t,agentId:a.agentId})}a.agentDraft===`hatch`&&t?n.navigate(`chat`,{pathname:E(n,t),search:`?draft=${encodeURIComponent(y(`custodian.hatchDraft`))}`}):this.exitSetup()}else a.action===`exit`&&this.exitSetup();return`sent`}catch(n){if(r===this.requestEpoch&&e===this.activeClient){this.error=H(n);let r=n&&typeof n==`object`?n.details:void 0;this.setupIssue=_e(r)===void 0?null:this.configuredInferenceState===`required`?`missing`:`unavailable`,K(t)&&Ie(n)&&(this.rotateVolatileSession(e,this.currentSessionVariant()),this.error=y(`custodian.sessionRestarted`,{error:H(n)}))}return K(t)&&this.retryParams===t&&(this.retryParams=null),Ce(n,i)}finally{r===this.requestEpoch&&(this.sending=!1),this.emit()}}},X=new Y})),Ye=e((()=>{})),Xe=e((()=>{})),Q=e((()=>{})),$,Ze=e((()=>{re(),m(),p(),fe(),ue(),he(),pe(),b(),i(),Ye(),Xe(),T(),Q(),Z(),F(),L(),G(),t(),$=class extends a{constructor(...e){super(...e),this.store=X,this.onboarding=!1,this.newAgentIntent=!1,this.showChannelOnboardingNudge=!1,this.compact=!1,this.historyContent=f,this.subscribedStore=null,this.storeCleanup=null,this.lastMessageId=null}connectedCallback(){super.connectedCallback(),this.subscribeToStore()}disconnectedCallback(){this.storeCleanup?.(),this.storeCleanup=null,this.subscribedStore=null,super.disconnectedCallback()}async getUpdateComplete(){let e=await super.getUpdateComplete();return await Promise.all(Array.from(this.querySelectorAll(`openclaw-option-card`)).map(e=>e.updateComplete)),e}willUpdate(e){e.has(`store`)&&this.subscribeToStore(),this.store.connect(this.context,Fe(this.onboarding,this.newAgentIntent))}updated(){let e=this.store.messages.at(-1)?.id??null;if(e!==this.lastMessageId){this.lastMessageId=e;let t=this.querySelector(`.custodian__messages`)?.lastElementChild;t instanceof HTMLElement&&t.scrollIntoView?.({block:`nearest`})}}subscribeToStore(){!this.isConnected||this.subscribedStore===this.store||(this.storeCleanup?.(),this.subscribedStore=this.store,this.storeCleanup=this.store.subscribe(()=>this.requestUpdate()))}handleComposerKeydown(e){e.key!==`Enter`||e.shiftKey||e.isComposing||(e.preventDefault(),this.store.send())}render(){let e=this.store,t=ae(`favicon.svg`,this.context.basePath);if(e.setupRequired){let t=e.setupIssue===`unavailable`;return h`
        <section
          class="custodian-surface custodian-surface--setup-required ${this.compact?`custodian-surface--panel`:``}"
        >
          <div class="custodian__setup-state" role="alert">
            <openclaw-mascot mood="idle" .size=${this.compact?72:96}></openclaw-mascot>
            <h2>
              ${y(t?`modelSetup.connectionFailure.title`:`modelSetup.required.title`)}
            </h2>
            <p>
              ${y(t?`modelSetup.connectionFailure.body`:`modelSetup.required.body`)}
            </p>
            <div class="custodian__setup-actions">
              <button class="btn primary" type="button" @click=${()=>e.openModelSetup()}>
                ${y(t?`modelSetup.connectionFailure.action`:`modelSetup.required.action`)}
              </button>
              ${e.activeClient&&e.chatAvailable&&e.canRetry()?h`<button
                    class="btn"
                    type="button"
                    ?disabled=${e.sending}
                    @click=${()=>e.retry()}
                  >
                    ${y(`common.retry`)}
                  </button>`:f}
            </div>
          </div>
        </section>
      `}let n=e.messages.length===0&&e.error!==null&&!e.sending,r=e.wizardInputPending?e.messages.findLast(e=>e.step!==null):void 0;return h`
      <section
        class="custodian-surface ${this.compact?`custodian-surface--panel`:``} ${n?`custodian-surface--empty-error`:``}"
      >
        <div class="custodian__messages" aria-live="polite">
          ${this.showChannelOnboardingNudge?ke({onOpenChannels:()=>e.openChannelsFromOnboarding(),onDismiss:()=>e.dismissChannelOnboardingNudge()}):f}
          ${!this.onboarding&&e.eventNudge&&!e.eventNudgePending?Oe({nudge:e.eventNudge,disabled:!e.activeClient||!e.chatAvailable||e.sending||e.sensitive||e.hasUnresolvedQuestion(),onSend:()=>void e.sendEventNudge(),onDismiss:()=>e.dismissEventNudge()}):f}
          ${e.messages.map(n=>{let i=n.question?`${n.id}:${n.question.id}`:``,a=n.question!==null&&!e.dismissedQuestions.has(i);return Je({message:n,boundaryAfterId:e.earlierBoundaryAfterId,assistantAvatar:t,showQuestion:a,questionDisabled:e.sending||!e.chatAvailable||e.answeredQuestions.has(i),onSelect:t=>e.answerQuestion(n,t),onSkip:()=>void e.dismissQuestion(n),showWizardStep:n===r,wizardValue:e.wizardValue,wizardDisabled:e.sending||!e.chatAvailable,wizardSecretVisible:e.wizardSecretVisible,onWizardValueChange:t=>e.setWizardValue(t),onWizardAnswer:t=>e.answerWizardStep(n,t),onToggleWizardSecretVisibility:()=>e.toggleWizardSecretVisibility()})})}
          ${e.sending?h`<div class="chat-group assistant custodian__thinking-row" role="status">
                <div class="chat-avatar assistant custodian__mascot-avatar" aria-hidden="true">
                  <openclaw-mascot mood="thinking" .size=${26}></openclaw-mascot>
                </div>
                <div class="chat-group-messages custodian__thinking">
                  <span></span><span></span><span></span>
                  <span class="sr-only">${y(`custodian.thinking`)}</span>
                </div>
              </div>`:f}
          ${e.abandonedTurnOutcomeUnknown?h`<div class="custodian__error" role="alert">
                <span>${y(`custodian.connectionChanged`)}</span>
              </div>`:f}
          ${e.error&&!(e.abandonedTurnOutcomeUnknown&&e.error===y(`custodian.connectionChanged`))?h`<div class="custodian__error" role="alert">
                <span>${e.error}</span>
                ${e.activeClient&&e.chatAvailable&&e.canRetry()?h`<button class="btn btn--sm" type="button" @click=${()=>e.retry()}>
                      ${y(`common.retry`)}
                    </button>`:f}
              </div>`:f}
        </div>

        ${this.historyContent}
        ${r?f:h`<div class="agent-chat__composer-shell">
              <div class="agent-chat__input">
                <div class="agent-chat__composer-input-row">
                  <div class="agent-chat__composer-combobox">
                    ${e.sensitive?h`<input
                          type="password"
                          .value=${e.input}
                          autocomplete="off"
                          placeholder=${y(`custodian.sensitivePlaceholder`)}
                          aria-label=${y(`custodian.sensitivePlaceholder`)}
                          ?disabled=${!e.activeClient||!e.chatAvailable||e.sending||e.setupRequired}
                          @input=${t=>e.setInput(t.target.value)}
                          @keydown=${e=>this.handleComposerKeydown(e)}
                        />`:h`<textarea
                          rows="1"
                          .value=${e.input}
                          autocomplete="on"
                          placeholder=${y(`custodian.placeholder`)}
                          aria-label=${y(`custodian.placeholder`)}
                          ?disabled=${!e.activeClient||!e.chatAvailable||e.sending||e.setupRequired}
                          @input=${t=>e.setInput(t.target.value)}
                          @keydown=${e=>this.handleComposerKeydown(e)}
                        ></textarea>`}
                  </div>
                  <div class="agent-chat__composer-actions">
                    <button
                      class="chat-send-btn"
                      type="button"
                      aria-label=${y(`custodian.send`)}
                      ?disabled=${!e.input.trim()||!e.activeClient||!e.chatAvailable||e.sending||e.setupRequired}
                      @click=${()=>void e.send()}
                    >
                      ${me.arrowUp}
                      <span class="agent-chat__control-label">${y(`custodian.send`)}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>`}
      </section>
    `}},n([ne({context:_,subscribe:!0})],$.prototype,`context`,void 0),n([g({attribute:!1})],$.prototype,`store`,void 0),n([g({attribute:!1})],$.prototype,`onboarding`,void 0),n([g({attribute:!1})],$.prototype,`newAgentIntent`,void 0),n([g({attribute:!1})],$.prototype,`showChannelOnboardingNudge`,void 0),n([g({attribute:!1})],$.prototype,`compact`,void 0),n([g({attribute:!1})],$.prototype,`historyContent`,void 0),customElements.get(`openclaw-custodian-surface`)||customElements.define(`openclaw-custodian-surface`,$)}));export{Z as i,Q as n,X as r,Ze as t};
//# sourceMappingURL=custodian-surface-BbIPBLM8.js.map