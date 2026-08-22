import { _ as ShutdownEventSchema, a as EventFrame, c as GatewayFrame, d as HelloOkSchema, f as RequestFrame, g as ShutdownEvent, h as ResponseFrameSchema, i as ErrorShapeSchema, l as GatewayFrameSchema, m as ResponseFrame, n as ConnectParamsSchema, o as EventFrameSchema, p as RequestFrameSchema, r as ErrorShape, s as GATEWAY_SERVER_CAPS, t as ConnectParams, u as HelloOk, v as TickEvent, y as TickEventSchema } from "./frames-C3sy04oE.mjs";
import { a as McpAppViewExpiredErrorDetails, c as WizardNotFoundErrorDetails, d as readMissingScopeErrorDetails, i as GatewayErrorDetails, l as isMcpAppViewExpiredError, n as ErrorCodes, o as MissingScopeErrorDetails, r as GatewayErrorDetailCodes, s as UnknownAgentIdErrorDetails, t as ErrorCode, u as readMissingScopeError } from "./gateway-error-details-bvFmzL6t.mjs";
import { $ as WorkerHeartbeatResponseFrame, $C as AgentsFileEntry, $S as ApprovalHistoryResult, $T as SkillsStatusParamsSchema, $_ as ConversationListItem, $a as SessionsCleanupParams, $b as BoardWidgetAppViewResultSchema, $c as QuestionRequestQuestionSchema, $d as ExecApprovalRequestParams, $f as CronScratchSetParams, $g as AuditEventSchema, $h as TalkSessionCreateParams, $i as SessionVisibility, $l as NodePairRemoveParamsSchema, $m as ChannelsPairingDismissResultSchema, $n as TerminalAttachResult, $o as SessionsFilesRevealResultSchema, $p as SystemChangeKind, $r as TaskSuggestionsAcceptParams, $s as SessionsSendParamsSchema, $t as WizardStep, $u as LogsTailParams, $v as SessionsCatalogArchiveResult, $w as SkillsCuratorStatusParamsSchema, $x as SkillsProposalHistoryStatusParams, $y as SessionRow, A as WORKER_PROTOCOL_FEATURES, AC as SessionApprovalReplay, AE as ToolsInvokeParamsSchema, AS as WorkerInferenceTerminalOutcome, AT as SkillsProposalRequestRevisionResult, A_ as ArtifactsListResult, Aa as SessionFileRelevanceSchema, Ab as BoardOpSchema, Ac as SecretsResolveAssignmentSchema, Ad as FsListDirResultSchema, Af as EnvironmentsListResultSchema, Ag as UserProfileAvatarMimeSchema, Ah as TalkClientSteerParamsSchema, Ai as SessionMemberAddParamsSchema, Al as NodeDescribeParamsSchema, Am as COMMAND_ARG_DESCRIPTION_MAX_LENGTH, An as PluginsSessionActionResult, Ao as SessionsCompanionStateResultSchema, Ap as SystemAgentChatParamsSchema, Ar as TaskSummarySchema, As as SessionsPatchParams, At as WorkerTranscriptMessage, Au as ChatAttachmentsSchema, Av as InputProvenanceSchema, Aw as ModelsListParams, Ax as McpAppViewExpiredErrorDetailsSchema, Ay as SessionSuggestionSchema, B as WorkerAdmissionFailureReason, BC as formatValidationErrors, BS as ApprovalAllowDecisionSchema, BT as SkillsSearchParams, B_ as AgentsWorkspaceListParams, Ba as SessionOperationEventSchema, Bb as BoardTabDeleteOpSchema, Bc as QuestionGetResult, Bd as DevicePairRenameParamsSchema, Bf as WorkerTunnelStatusSchema, Bg as UsersSelfParams, Bh as TalkConfigResultSchema, Bi as SessionSharingAction, Bl as NodeInvokeProgressParamsSchema, Bm as CommandsListParamsSchema, Bn as PluginsUiDescriptorsResultSchema, Bo as SessionsDiffResult, Bp as SystemAgentSetupAuthStartParamsSchema, Br as TasksListParamsSchema, Bs as SessionsResolveParams, Bt as WizardCancelParamsSchema, Bu as ChatMessageGetResult, Bv as SessionCatalogHost, Bw as SkillProposalEvaluation, Bx as UiCommandParamsSchema, By as SessionSuggestionsListResultSchema, C as WorktreesRemoveResult, CC as PendingSessionApprovalEventSchema, CE as ToolsEffectiveNoticeSchema, CS as WorkerInferenceStartParams, CT as SkillsProposalInspectParamsSchema, C_ as ArtifactsDownloadResultSchema, Ca as SessionFileEntry, Cb as BoardFocusTabCommandSchema, Cc as SessionsReclaimParams, Cd as GatewaySuspendTaskBlocker, Cf as EnvironmentsDestroyParams, Cg as TtsSpeakResult, Ch as TalkClientCreateParams, Ci as PresenceEntrySchema, Cl as WebPushTestParams, Cm as UpdateRunParams, Cn as PluginsSearchParams, Co as SessionsCompanionResetParams, Cp as SystemAgentChatHistoryParams, Cr as TerminalTextResult, Cs as SessionsMessagesSubscribeParamsSchema, Ct as WorkerTranscriptCommitParamsSchema, Cu as NodeSkillDescriptorSchema, Cv as SendParamsSchema, Cw as GatewayAgentRuntime, Cx as BoardWidgetPutParamsSchema, Cy as SessionSuggestion, D as WORKER_HEARTBEAT_INTERVAL_MS, DC as PluginApprovalSeveritySchema, DE as ToolsEffectiveResultSchema, DS as WorkerInferenceStartResponseFrameSchema, DT as SkillsProposalRecordResultSchema, D_ as ArtifactsGetResultSchema, Da as SessionFilePreviewKind, Db as BoardMcpAppDescriptor, Dc as SessionPlacementState, Dd as FsListDirParams, Df as EnvironmentsListParams, Dg as WebLoginWaitParams, Dh as TalkClientMutationResult, Di as StateVersionSchema, Dl as WebPushVapidPublicKeyParams, Dm as COMMAND_ALIAS_MAX_ITEMS, Dn as PluginsSessionActionFailureResultSchema, Do as SessionsCompanionStateParams, Dp as SystemAgentChatHistoryTurn, Dr as TerminalUploadResult, Ds as SessionsObserverVisibilityParamsSchema, Dt as WorkerTranscriptCommitResponseFrameSchema, Du as ChatAbortParamsSchema, Dv as ChatSendSessionKeyString, Dw as ModelsAuthLogoutParamsSchema, Dx as BoardWidgetResizeOpSchema, Dy as SessionSuggestionEventSchema, E as WorktreesRestoreParamsSchema, EC as PluginApprovalSeverity, EE as ToolsEffectiveResult, ES as WorkerInferenceStartResponseFrame, ET as SkillsProposalRecordResult, E_ as ArtifactsGetResult, Ea as SessionFileKindSchema, Eb as BoardLegacyEventParamsSchema, Ec as SessionsReclaimResultSchema, Ed as FsDirEntrySchema, Ef as EnvironmentsDestroyResultSchema, Eg as WebLoginStartParamsSchema, Eh as TalkClientCreateResultSchema, Ei as StateVersion, El as WebPushUnsubscribeParamsSchema, Em as UpdateStatusParamsSchema, En as PluginsSearchResultSchema, Eo as SessionsCompanionResetResultSchema, Ep as SystemAgentChatHistoryResultSchema, Er as TerminalUploadParamsSchema, Es as SessionsObserverVisibilityParams, Et as WorkerTranscriptCommitResponseFrame, Eu as ChatAbortParams, Ev as CHAT_SEND_SESSION_KEY_MAX_LENGTH, Ew as ModelsAuthLogoutParams, Ex as BoardWidgetRemoveOpSchema, Ey as SessionSuggestionEvent, F as WORKER_RPC_SET_VERSION, FC as TerminalApprovalSnapshotSchema, FS as validateWorkerInferenceTerminalFrame, FT as SkillsProposalUpdateParamsSchema, F_ as AgentsWorkspaceFileSchema, Fa as SessionObserverHealth, Fb as BoardSizeSchema, Fc as Question, Fd as DevicePairRejectParams, Ff as WorkerEnvironmentMetadata, Fg as UsersLinkEmailResultSchema, Fh as TalkClientTranscriptParams, Fi as SessionMemberSchema, Fl as NodeInvokeInputEvent, Fm as COMMAND_LIST_MAX_ITEMS, Fn as PluginsSetEnabledResult, Fo as SessionsDeleteParamsSchema, Fp as SystemAgentSetupActivateParams, Fr as TasksGetParams, Fs as SessionsPluginPatchResultSchema, Ft as WorkerAdmissionFailureReasonSchema, Fu as ChatFinalEventSchema, Fv as SessionCatalog, Fw as ModelsProbeParamsSchema, Fx as errorShape, Fy as SessionSuggestionsAddResult, G as WorkerConnectParams, GC as AgentsCreateParams, GS as ApprovalDeniedReasonSchema, GT as SkillsSecurityVerdictsParamsSchema, G_ as AgentEventSchema, Ga as SessionsBranchesListParams, Gb as BoardTicketEventParamsSchema, Gc as QuestionListResultSchema, Gd as DevicePairSetupCodeResult, Gf as CronJob, Gg as UsersSetAvatarParamsSchema, Gh as TalkSessionAppendAudioParams, Gi as SessionSharingIdentitySchema, Gl as NodeListParamsSchema, Gm as ChannelsPairingAccount, Gn as PluginApprovalRequestParams, Go as SessionsFilesGetResultSchema, Gp as SystemAgentSetupDetectResult, Gr as TasksRecoveryResult, Gs as SessionsRewindResultSchema, Gt as WizardStartParams, Gu as ChatRunStartupPhaseSchema, Gv as SessionCatalogPullRequestSummarySchema, Gw as SkillsBinsParamsSchema, Gx as UiNavigateCommandSchema, Gy as SessionTypingEvent, H as WorkerAdmissionHandshakeSchema, HC as AgentKindSchema, HS as ApprovalCancelledReasonSchema, HT as SkillsSearchResult, H_ as AgentsWorkspaceListResult, Ha as SessionWorktreeInfoSchema, Hb as BoardTabSchema, Hc as QuestionListParams, Hd as DevicePairResolvedEventSchema, Hf as CronAddResult, Hg as UsersSelfResult, Hh as TalkEventSchema, Hi as SessionSharingEvent, Hl as NodeInvokeResultParams, Hm as CommandsListResultSchema, Hn as PluginsUninstallParamsSchema, Ho as SessionsFilesGetParams, Hp as SystemAgentSetupAuthStartResultSchema, Hr as TasksListResultSchema, Hs as SessionsRewindParams, Ht as WizardNextParamsSchema, Hu as ChatMetadataParams, Hv as SessionCatalogLocator, Hw as SkillProposalLifecycleEvent, Hx as UiCommandResultSchema, Hy as SessionSuggestionsResolveParamsSchema, I as WORKER_TRANSCRIPT_COMMIT_PROTOCOL_FEATURE, IC as TerminalSessionApprovalEventSchema, IS as validateWorkerInferenceTerminalOutcome, IT as SkillsProposalsListParams, I_ as AgentsWorkspaceGetParams, Ia as SessionObserverHealthSchema, Ib as BoardSnapshot, Ic as QuestionAnswers, Id as DevicePairRejectParamsSchema, If as WorkerEnvironmentMetadataSchema, Ig as UsersListParams, Ih as TalkClientTranscriptParamsSchema, Ii as SessionMembersListParams, Il as NodeInvokeInputEventSchema, Im as COMMAND_NAME_MAX_LENGTH, In as PluginsSetEnabledResultSchema, Io as SessionsDescribeParams, Ip as SystemAgentSetupActivateParamsSchema, Ir as TasksGetParamsSchema, Is as SessionsPreviewParams, It as WorkerProtocolCloseReasonSchema, Iu as ChatHistoryParamsSchema, Iv as SessionCatalogCapabilities, Iw as ModelsProbeResult, Ix as missingScopeErrorShape, Iy as SessionSuggestionsAddResultSchema, J as WorkerErrorShape, JC as AgentsCreateResultSchema, JS as ApprovalGetParamsSchema, JT as SkillsSkillCardParams, J_ as AgentIdentityResult, Ja as SessionsBranchesListResultSchema, Jb as BoardViewTicketSchema, Jc as QuestionRecord, Jd as DeviceTokenRevokeParamsSchema, Jf as CronRunLogEntry, Jg as UsersSetDisplayNameParams, Jh as TalkSessionCancelOutputParamsSchema, Ji as SessionVisibilitySetResult, Jl as NodePairListParams, Jm as ChannelsPairingApproveResult, Jn as PluginApprovalResolveParamsSchema, Jo as SessionsFilesListResult, Jp as SystemAgentSetupVerifyParamsSchema, Jr as TaskSuggestionEvent, Js as SessionsSearchParams, Jt as WizardStartResultSchema, Ju as ChatStatusEventSchema, Jv as SessionCatalogSessionSchema, Jw as SkillsCuratorActionParams, Jx as UiSplitCommandSchema, Jy as SessionTypingParamsSchema, K as WorkerConnectRequestFrame, KC as AgentsCreateParamsSchema, KS as ApprovalExpiredReasonSchema, KT as SkillsSecurityVerdictsResult, K_ as AgentIdentityParams, Ka as SessionsBranchesListParamsSchema, Kb as BoardUpdateParams, Kc as QuestionOption, Kd as DevicePairSetupCodeResultSchema, Kf as CronListParams, Kg as UsersSetAvatarResult, Kh as TalkSessionAppendAudioParamsSchema, Ki as SessionVisibilitySetParams, Kl as NodePairApproveParams, Km as ChannelsPairingApproveParams, Kn as PluginApprovalRequestParamsSchema, Ko as SessionsFilesListParams, Kp as SystemAgentSetupDetectResultSchema, Kr as TasksRecoveryResultSchema, Ks as SessionsSearchHit, Kt as WizardStartParamsSchema, Ku as ChatSendParamsSchema, Kv as SessionCatalogSchema, Kw as SkillsBinsResult, Kx as UiPanelCommandSchema, Ky as SessionTypingEventSchema, L as WORKER_TRANSCRIPT_MAX_BATCH_MESSAGES, LC as isWellFormedApprovalId, LS as AllowedApprovalSnapshot, LT as SkillsProposalsListParamsSchema, L_ as AgentsWorkspaceGetParamsSchema, La as SessionObserverPlanProgress, Lb as BoardSnapshotSchema, Lc as QuestionAnswersSchema, Ld as DevicePairRemoveParams, Lf as WorkerEnvironmentState, Lg as UsersListParamsSchema, Lh as TalkConfigParams, Li as SessionMembersListParamsSchema, Ll as NodeInvokeParams, Lm as CommandEntry, Ln as PluginsUiDescriptorsParams, Lo as SessionsDescribeParamsSchema, Lp as SystemAgentSetupActivateResult, Lr as TasksGetResult, Ls as SessionsPreviewParamsSchema, Lt as WizardAnswer, Lu as ChatInjectParams, Lv as SessionCatalogCapabilitiesSchema, Lw as ModelsProbeResultSchema, Lx as UiClosePaneCommandSchema, Ly as SessionSuggestionsListParams, M as WORKER_PROTOCOL_MAX_FEATURE_LENGTH, MC as SystemAgentApprovalPresentation, ME as ToolsInvokeResultSchema, MS as validateWorkerInferenceCancelParams, MT as SkillsProposalReviseParams, M_ as AgentsWorkspaceEntry, Ma as SessionGroupSchema, Mb as BoardPromptAuthorizeParams, Mc as SecretsResolveParamsSchema, Md as DevicePairApproveParamsSchema, Mf as EnvironmentsStatusParamsSchema, Mg as UsersLinkEmailParams, Mh as TalkClientToolCallParamsSchema, Mi as SessionMemberMutationResultSchema, Ml as NodeEventParamsSchema, Mm as COMMAND_CHOICE_LABEL_MAX_LENGTH, Mn as PluginsSessionActionSuccessResultSchema, Mo as SessionsCreateResult, Mp as SystemAgentChatQuestionSchema, Mr as TasksCancelParamsSchema, Ms as SessionsPluginPatchParams, Mt as WORKER_PROTOCOL_MAX_FRAME_ID_LENGTH, Mu as ChatErrorEventSchema, Mv as SecretInputSchema, Mw as ModelsListResult, Mx as UnknownAgentIdErrorDetailsSchema, My as SessionSuggestionStateSchema, N as WORKER_PROTOCOL_MAX_METHOD_LENGTH, NC as SystemAgentApprovalPresentationSchema, NS as validateWorkerInferenceEventFrame, NT as SkillsProposalReviseParamsSchema, N_ as AgentsWorkspaceEntrySchema, Na as SessionObserverDigest, Nb as BoardPromptAuthorizeParamsSchema, Nc as SecretsResolveResult, Nd as DevicePairListParams, Nf as EnvironmentsStatusResult, Ng as UsersLinkEmailParamsSchema, Nh as TalkClientToolCallResult, Ni as SessionMemberRemoveParams, Nl as NodeEventResult, Nm as COMMAND_CHOICE_VALUE_MAX_LENGTH, Nn as PluginsSetEnabledParams, No as SessionsCreateResultSchema, Np as SystemAgentChatResult, Nr as TasksCancelResult, Ns as SessionsPluginPatchParamsSchema, Nt as WORKER_PROTOCOL_MAX_IDENTIFIER_LENGTH, Nu as ChatEvent, Nv as SecretRefSchema, Nw as ModelsListResultSchema, Nx as WizardNotFoundErrorDetailsSchema, Ny as SessionSuggestionsAddParams, O as WORKER_LAUNCH_V2_PROTOCOL_FEATURE, OC as SessionApprovalEvent, OE as ToolsInvokeErrorSchema, OS as WorkerInferenceStartResult, OT as SkillsProposalRequestRevisionParams, O_ as ArtifactsListParams, Oa as SessionFilePreviewKindSchema, Ob as BoardMcpAppDescriptorSchema, Oc as isCloudWorkerPlacementState, Od as FsListDirParamsSchema, Of as EnvironmentsListParamsSchema, Og as WebLoginWaitParamsSchema, Oh as TalkClientMutationResultSchema, Oi as SessionMember, Ol as WebPushVapidPublicKeyParamsSchema, Om as COMMAND_ARGS_MAX_ITEMS, On as PluginsSessionActionParams, Oo as SessionsCompanionStateParamsSchema, Op as SystemAgentChatHistoryTurnSchema, Or as TerminalUploadResultSchema, Os as SessionsObserverVisibilityResult, Ot as WorkerTranscriptCommitResult, Ou as ChatAbortedEventSchema, Ov as GatewayClientIdSchema, Ow as ModelsAuthStatusParams, Ox as BoardWidgetSchema, Oy as SessionSuggestionResolution, P as WORKER_PROTOCOL_METHODS, PC as TerminalApprovalSnapshot, PS as validateWorkerInferenceStartParams, PT as SkillsProposalUpdateParams, P_ as AgentsWorkspaceFile, Pa as SessionObserverDigestSchema, Pb as BoardSetChatDockCommandSchema, Pc as SecretsResolveResultSchema, Pd as DevicePairListParamsSchema, Pf as EnvironmentsStatusResultSchema, Pg as UsersLinkEmailResult, Ph as TalkClientToolCallResultSchema, Pi as SessionMemberRemoveParamsSchema, Pl as NodeEventResultSchema, Pm as COMMAND_DESCRIPTION_MAX_LENGTH, Pn as PluginsSetEnabledParamsSchema, Po as SessionsDeleteParams, Pp as SystemAgentChatResultSchema, Pr as TasksCancelResultSchema, Ps as SessionsPluginPatchResult, Pt as WORKER_PROTOCOL_MAX_PAYLOAD_BYTES, Pu as ChatEventSchema, Pv as SessionLabelString, Pw as ModelsProbeParams, Px as buildMissingScopeErrorDetails, Py as SessionSuggestionsAddParamsSchema, Q as WorkerHeartbeatRequestFrameSchema, QC as AgentsDeleteResultSchema, QS as ApprovalHistoryParamsSchema, QT as SkillsStatusParams, Q_ as AgentWaitParamsSchema, Qa as SessionsBranchesSwitchResultSchema, Qb as BoardWidgetAppViewResult, Qc as QuestionRequestQuestion, Qd as ExecApprovalGetParamsSchema, Qf as CronScratchGetResult, Qg as AuditEvent, Qh as TalkSessionCloseParamsSchema, Qi as SessionSharingRoleSchema, Ql as NodePairRemoveParams, Qm as ChannelsPairingDismissResult, Qn as TerminalAttachParamsSchema, Qo as SessionsFilesRevealResult, Qp as SystemChangeEntrySchema, Qr as TaskSuggestionSchema, Qs as SessionsSendParams, Qt as WizardStatusResultSchema, Qu as ChatToolTitlesResultSchema, Qv as SessionsCatalogArchiveParamsSchema, Qw as SkillsCuratorStatusParams, Qx as SkillsProposalHistoryScanResultSchema, Qy as SessionCreatedActorSchema, R as WORKER_TRANSCRIPT_MAX_CONTENT_PARTS, RC as ProtocolValidator, RS as AllowedApprovalSnapshotSchema, RT as SkillsProposalsListResult, R_ as AgentsWorkspaceGetResult, Ra as SessionObserverPlanProgressSchema, Rb as BoardTab, Rc as QuestionGetParams, Rd as DevicePairRemoveParamsSchema, Rf as WorkerEnvironmentStateSchema, Rg as UsersListResult, Rh as TalkConfigParamsSchema, Ri as SessionMembersListResult, Rl as NodeInvokeParamsSchema, Rm as CommandEntrySchema, Rn as PluginsUiDescriptorsParamsSchema, Ro as SessionsDiffParams, Rp as SystemAgentSetupActivateResultSchema, Rr as TasksGetResultSchema, Rs as SessionsResetParams, Rt as WizardAnswerSchema, Ru as ChatInjectParamsSchema, Rv as SessionCatalogDescriptor, Rw as ModelsProbeTargetResult, Rx as UiCommand, Ry as SessionSuggestionsListParamsSchema, S as WorktreesRemoveParamsSchema, SC as PendingApprovalSnapshotSchema, SE as ToolsEffectiveNotice, SS as WorkerInferenceOptionsSchema, ST as SkillsProposalInspectParams, S_ as ArtifactsDownloadResult, Sa as SessionFileContentEncodingSchema, Sb as BoardEventParamsSchema, Sc as SessionsDispatchResultSchema, Sd as GatewaySuspendStatusRunningResultSchema, Sf as EnvironmentsCreateResultSchema, Sg as TtsSpeakParamsSchema, Sh as TalkClientCloseParamsSchema, Si as PresenceEntry, Sl as WebPushSubscribeParamsSchema, Sm as ConfigSetParamsSchema, Sn as PluginsRefreshResultSchema, So as SessionsCompanionAskResultSchema, Sp as CronUpdateParamsSchema, Sr as TerminalTextParamsSchema, Ss as SessionsMessagesSubscribeParams, St as WorkerTranscriptCommitParams, Su as NodeSkillDescriptor, Sv as PollParamsSchema, Sw as AuthProbeStatusSchema, Sx as BoardWidgetPutParams, Sy as MigrationsMemoryPlanResult, T as WorktreesRestoreParams, TC as PluginApprovalPresentationSchema, TE as ToolsEffectiveParamsSchema, TS as WorkerInferenceStartRequestFrameSchema, TT as SkillsProposalInspectResultSchema, T_ as ArtifactsGetParamsSchema, Ta as SessionFileKind, Tb as BoardGetParamsSchema, Tc as SessionsReclaimResult, Td as FsDirEntry, Tf as EnvironmentsDestroyResult, Tg as WebLoginStartParams, Th as TalkClientCreateResult, Ti as SnapshotSchema, Tl as WebPushUnsubscribeParams, Tm as UpdateStatusParams, Tn as PluginsSearchResult, To as SessionsCompanionResetResult, Tp as SystemAgentChatHistoryResult, Tr as TerminalUploadParams, Ts as SessionsMessagesUnsubscribeParamsSchema, Tt as WorkerTranscriptCommitRequestFrameSchema, Tu as NodeSkillsUpdateParamsSchema, Tv as WakeParamsSchema, Tw as ModelChoiceSchema, Tx as BoardWidgetPutResultSchema, Ty as SessionSuggestionActionSchema, U as WorkerAdmissionResponseFrame, UC as AgentSummary, US as ApprovalDecision, UT as SkillsSearchResultSchema, U_ as AgentsWorkspaceListResultSchema, Ua as SessionsAbortParams, Ub as BoardTabUpdateOpSchema, Uc as QuestionListParamsSchema, Ud as DevicePairSetupCodeParams, Uf as CronDeclarativeAddResult, Ug as UsersSelfResultSchema, Uh as TalkModeParams, Ui as SessionSharingEventSchema, Ul as NodeInvokeResultParamsSchema, Um as TalkSessionAcknowledgeMarkParams, Un as PluginsUninstallResult, Uo as SessionsFilesGetParamsSchema, Up as SystemAgentSetupDetectParams, Ur as TasksRecoveryParams, Us as SessionsRewindParamsSchema, Ut as WizardNextResult, Uu as ChatMetadataParamsSchema, Uv as SessionCatalogLocatorSchema, Uw as SkillProposalLifecycleEventSchema, Ux as UiCommandSchema, Uy as SessionSuggestionsResolveResult, V as WorkerAdmissionHandshake, VC as AgentKind, VS as ApprovalAllowedReasonSchema, VT as SkillsSearchParamsSchema, V_ as AgentsWorkspaceListParamsSchema, Va as SessionWorktreeInfo, Vb as BoardTabIdSchema, Vc as QuestionGetResultSchema, Vd as DevicePairRequestedEventSchema, Vf as CronAddParams, Vg as UsersSelfParamsSchema, Vh as TalkEvent, Vi as SessionSharingActionSchema, Vl as NodeInvokeRequestEventSchema, Vm as CommandsListResult, Vn as PluginsUninstallParams, Vo as SessionsDiffResultSchema, Vp as SystemAgentSetupAuthStartResult, Vr as TasksListResult, Vs as SessionsResolveParamsSchema, Vt as WizardNextParams, Vu as ChatMessageGetResultSchema, Vv as SessionCatalogHostSchema, Vw as SkillProposalEvaluationSchema, Vx as UiCommandResult, Vy as SessionSuggestionsResolveParams, W as WorkerAdmissionResponseFrameSchema, WC as AgentSummarySchema, WS as ApprovalDecisionSchema, WT as SkillsSecurityVerdictsParams, W_ as AgentEvent, Wa as SessionsAbortParamsSchema, Wb as BoardTabsReorderOpSchema, Wc as QuestionListResult, Wd as DevicePairSetupCodeParamsSchema, Wf as CronGetParams, Wg as UsersSetAvatarParams, Wh as TalkModeParamsSchema, Wi as SessionSharingIdentity, Wl as NodeListParams, Wm as TalkSessionAcknowledgeMarkParamsSchema, Wn as PluginsUninstallResultSchema, Wo as SessionsFilesGetResult, Wp as SystemAgentSetupDetectParamsSchema, Wr as TasksRecoveryParamsSchema, Ws as SessionsRewindResult, Wt as WizardNextResultSchema, Wu as ChatRunStartupPhase, Wv as SessionCatalogPullRequestSummary, Ww as SkillsBinsParams, Wx as UiFocusCommandSchema, Wy as SessionSuggestionsResolveResultSchema, X as WorkerHeartbeatParamsSchema, XC as AgentsDeleteParamsSchema, XS as ApprovalGetResultSchema, XT as SkillsSkillCardResult, X_ as AgentParamsSchema, Xa as SessionsBranchesSwitchParamsSchema, Xb as BoardWidgetAppViewParams, Xc as QuestionRequestParams, Xd as DeviceTokenRotateParamsSchema, Xf as CronRunsParams, Xg as UsersSetDisplayNameResult, Xh as TalkSessionCancelTurnParamsSchema, Xi as SESSION_VISIBILITY_VALUES, Xl as NodePairRejectParams, Xm as ChannelsPairingDismissParams, Xn as TerminalAckResultSchema, Xo as SessionsFilesRevealParams, Xp as SystemAgentSetupVerifyResultSchema, Xr as TaskSuggestionResolution, Xs as SessionsSearchResult, Xt as WizardStatusParamsSchema, Xu as ChatToolTitlesParamsSchema, Xv as SessionCatalogTranscriptItemSchema, Xw as SkillsCuratorActionResult, Xx as SkillsProposalHistoryScanParamsSchema, Xy as SessionTypingResultSchema, Y as WorkerHeartbeatParams, YC as AgentsDeleteParams, YS as ApprovalGetResult, YT as SkillsSkillCardParamsSchema, Y_ as AgentIdentityResultSchema, Ya as SessionsBranchesSwitchParams, Yb as BoardWidget, Yc as QuestionRecordSchema, Yd as DeviceTokenRotateParams, Yf as CronRunParams, Yg as UsersSetDisplayNameParamsSchema, Yh as TalkSessionCancelTurnParams, Yi as SessionVisibilitySetResultSchema, Yl as NodePairListParamsSchema, Ym as ChannelsPairingApproveResultSchema, Yn as TerminalAckResult, Yo as SessionsFilesListResultSchema, Yp as SystemAgentSetupVerifyResult, Yr as TaskSuggestionEventSchema, Ys as SessionsSearchParamsSchema, Yt as WizardStatusParams, Yu as ChatToolTitlesParams, Yv as SessionCatalogTranscriptItem, Yw as SkillsCuratorActionParamsSchema, Yx as SkillsProposalHistoryScanParams, Yy as SessionTypingResult, Z as WorkerHeartbeatRequestFrame, ZC as AgentsDeleteResult, ZS as ApprovalHistoryParams, ZT as SkillsSkillCardResultSchema, Z_ as AgentWaitParams, Za as SessionsBranchesSwitchResult, Zb as BoardWidgetAppViewParamsSchema, Zc as QuestionRequestParamsSchema, Zd as ExecApprovalGetParams, Zf as CronScratchGetParams, Zg as UsersSetDisplayNameResultSchema, Zh as TalkSessionCloseParams, Zi as SessionSharingRole, Zl as NodePairRejectParamsSchema, Zm as ChannelsPairingDismissParamsSchema, Zn as TerminalAttachParams, Zo as SessionsFilesRevealParamsSchema, Zp as SystemChangeEntry, Zr as TaskSuggestionResolutionSchema, Zs as SessionsSearchResultSchema, Zt as WizardStatusResult, Zu as ChatToolTitlesResult, Zv as SessionsCatalogArchiveParams, Zw as SkillsCuratorActionResultSchema, Zx as SkillsProposalHistoryScanResult, Zy as SessionCreatedActor, _ as WorktreesListParams, _C as ExecApprovalPresentation, _E as ToolsCatalogResultSchema, _S as WorkerInferenceEventFrame, _T as SkillsProposalEvaluateResultSchema, __ as AuditActivityToolActionV1Schema, _a as SessionFileBrowserEntry, _b as BoardCommandSchema, _c as SessionPlacementSchema, _d as GatewaySuspendStatusParams, _f as EnvironmentSummary, _g as TalkSpeakParams, _h as TalkCatalogParams, _i as validateSystemEventParams, _l as PushTestParams, _m as ConfigSchemaParams, _n as PluginsListResult, _o as SessionsCompactionRestoreResult, _p as CronScratchGetResultSchema, _r as TerminalResizeParams, _s as SessionsGroupsPutParamsSchema, _t as WorkerProtocolCloseReason, _u as NodePresenceAlivePayloadSchema, _v as ConversationTurnResult, _w as AgentsUpdateParams, _x as BoardWidgetPluginKindSchema, _y as MemoryMigrationProviderPlan, a as WorktreeRepositoryStatus, aC as ApprovalResolveParams, aE as SkillsUploadChunkParamsSchema, aS as WORKER_INFERENCE_METHODS, aT as SkillsDetailResultSchema, a_ as AuditActivityAgentRunV1Schema, aa as SessionsViewerPresenceSetResultSchema, ab as BOARD_DATA_BINDING_ID_MAX_LENGTH, ac as SessionDiscussionInfoParamsSchema, ad as GatewaySuspendBlocker, af as ExecApprovalsNodeGetParams, ag as TalkSessionJoinResult, ah as ChannelsLogoutParams, ai as TaskSuggestionsCreateResult, al as QuestionResolveParamsSchema, am as SystemChangesListResult, an as PluginCatalogOfficialInstallSchema, ao as SessionsCompactionBranchResult, ap as CronDeclarativeAddResultSchema, ar as TerminalEvent, as as SessionsForkParamsSchema, at as WorkerLiveEventErrorDetailsSchema, au as NodePendingDrainResultSchema, av as ConversationSendParams, aw as AgentsFilesListParams, ax as BoardWidgetGeneratedIdentitySchema, ay as SessionsCatalogHostEvent, b as WorktreesListResultSchema, bC as ExpiredApprovalSnapshotSchema, bE as ToolsEffectiveGroup, bS as WorkerInferenceModelRefSchema, bT as SkillsProposalEventsListResult, b_ as ArtifactsDownloadParams, ba as SessionFileBrowserResultSchema, bb as BoardDataReadParamsSchema, bc as SessionsDispatchParamsSchema, bd as GatewaySuspendStatusResult, bf as EnvironmentsCreateParamsSchema, bg as TalkSpeakResultSchema, bh as TalkCatalogResultSchema, bi as SystemInfoResult, bl as PushTestResultSchema, bm as ConfigSchemaResponseSchema, bn as PluginsRefreshParamsSchema, bo as SessionsCompanionAskParamsSchema, bp as CronScratchSetResultSchema, br as TerminalSessionInfoSchema, bs as SessionsListParams, bt as WorkerTranscriptCommitErrorShape, bu as NodeRenameParams, bv as MessageActionParamsSchema, bw as AgentsUpdateResultSchema, bx as BoardWidgetPutContent, by as MigrationsMemoryApplyResult, c as WorktreesBranchesParamsSchema, cC as ApprovalResolveResultSchema, cE as ToolCatalogEntry, cS as WorkerInferenceCancelParams, cT as SkillsProposalActionParams, c_ as AuditActivityInboundMessageV1, ca as SessionBranchSchema, cb as BoardActionParamsSchema, cc as SessionDiscussionInfoSchema, cd as GatewaySuspendPrepareParams, cf as ExecApprovalsNodeSetParamsSchema, cg as TalkSessionOkResultSchema, ch as ChannelsStartParamsSchema, ci as TaskSuggestionsDismissParamsSchema, cl as QuestionResolvedEvent, cm as ConfigApplyParamsSchema, cn as PluginJsonValueSchema, co as SessionsCompactionGetParamsSchema, cp as CronJobSchema, cr as TerminalExitEventSchema, cs as SessionsGroupsDeleteParams, ct as WorkerLiveEventParams, cu as NodePendingEnqueueResult, cv as ConversationSendResultSchema, cw as AgentsFilesListResultSchema, cx as BoardWidgetHeightModeSchema, cy as SessionsCatalogListParamsSchema, d as WorktreesCreateParams, dC as ApprovalTerminalReason, dE as ToolCatalogGroupSchema, dS as WorkerInferenceCancelResponseFrame, dT as SkillsProposalApplyResultSchema, d_ as AuditActivityListParamsSchema, da as SessionCompanionExchange, db as BoardChangedEvent, dc as SessionDiscussionOpenResult, dd as GatewaySuspendPrepareResult, df as ExecApprovalsSetParams, dg as TalkSessionSubmitToolResultParams, dh as ChannelsStatusResult, di as TaskSuggestionsListParams, dl as QuestionStatus, dm as ConfigPatchParams, dn as PluginsInstallParams, do as SessionsCompactionListParams, dp as CronPacingSchema, dr as TerminalListResult, ds as SessionsGroupsListParamsSchema, dt as WorkerLiveEventRequestFrameSchema, du as NodePluginToolDescriptorSchema, dv as ConversationTurnCancelResult, dw as AgentsFilesSetResult, dx as BoardWidgetMaterializedPutParams, dy as SessionsCatalogReadParams, eC as ApprovalHistoryResultSchema, eE as SkillsUpdateParams, eS as SkillsProposalHistoryStatusParamsSchema, eT as SkillsCuratorStatusResult, e_ as AuditListParams, ea as SessionVisibilitySchema, eb as SessionRowSchema, ec as SessionsUsageParams, ed as LogsTailParamsSchema, ef as ExecApprovalRequestParamsSchema, eg as TalkSessionCreateParamsSchema, eh as ChannelsPairingListParams, ei as TaskSuggestionsAcceptParamsSchema, el as QuestionRequestResult, em as SystemChangeKindSchema, en as WizardStepSchema, eo as SessionsCleanupParamsSchema, ep as CronScratchSetResult, er as TerminalAttachResultSchema, es as SessionsFilesSetParams, et as WorkerHeartbeatResponseFrameSchema, eu as NodePendingAckParams, ev as ConversationListItemSchema, ew as AgentsFileEntrySchema, ex as BoardWidgetContent, ey as SessionsCatalogArchiveResultSchema, f as WorktreesCreateParamsSchema, fC as ApprovalTerminalReasonSchema, fE as ToolCatalogProfile, fS as WorkerInferenceCancelResponseFrameSchema, fT as SkillsProposalCreateParams, f_ as AuditActivityListResult, fa as SessionCompanionExchangeSchema, fb as BoardChangedEventSchema, fc as SessionDiscussionOpenResultSchema, fd as GatewaySuspendPrepareResultSchema, ff as ExecApprovalsSetParamsSchema, fg as TalkSessionSubmitToolResultParamsSchema, fh as ChannelsStatusResultSchema, fi as TaskSuggestionsListParamsSchema, fl as QuestionStatusSchema, fm as ConfigPatchParamsSchema, fn as PluginsInstallParamsSchema, fo as SessionsCompactionListParamsSchema, fp as CronRemoveParamsSchema, fr as TerminalListResultSchema, fs as SessionsGroupsListResult, ft as WorkerLiveEventResponseFrame, fu as NodePluginToolsUpdateParams, fv as ConversationTurnCancelResultSchema, fw as AgentsFilesSetResultSchema, fx as BoardWidgetMcpAppContentSchema, fy as SessionsCatalogReadParamsSchema, g as WorktreesGcResultSchema, gC as DeniedApprovalSnapshotSchema, gE as ToolsCatalogResult, gS as WorkerInferenceErrorShape, gT as SkillsProposalEvaluateResult, g_ as AuditActivityToolActionV1, ga as SessionDiffFileStatusSchema, gb as BoardCommandEventSchema, gc as SessionPlacementProtocolSchemas, gd as GatewaySuspendResumeResultSchema, gf as EnvironmentStatusSchema, gg as TalkSessionTurnResultSchema, gh as TalkAgentControlResultSchema, gi as SYSTEM_PRESENCE_LEGACY_CLEAR_LAST_INPUT_SECONDS, gl as QuestionWaitAnswerResultSchema, gm as ConfigSchemaLookupResultSchema, gn as PluginsListParamsSchema, go as SessionsCompactionRestoreParamsSchema, gp as CronScratchGetParamsSchema, gr as TerminalOpenResultSchema, gs as SessionsGroupsPutParams, gt as WorkerLiveEventSchema, gu as NodePresenceAlivePayload, gv as ConversationTurnReplySchema, gw as AgentsListResultSchema, gx as BoardWidgetPluginContentSchema, gy as MemoryMigrationItem, h as WorktreesGcResult, hC as DeniedApprovalSnapshot, hE as ToolsCatalogParamsSchema, hS as WorkerInferenceErrorReason, hT as SkillsProposalEvaluateParamsSchema, h_ as AuditActivityOutboundMessageV1Schema, ha as SessionDiffFileStatus, hb as BoardCommandEvent, hc as SessionPlacement, hd as GatewaySuspendResumeResult, hf as EnvironmentStatus, hg as TalkSessionTurnResult, hh as TalkAgentControlResult, hi as SYSTEM_PRESENCE_CLEAR_LAST_INPUT_TAG, hl as QuestionWaitAnswerResult, hm as ConfigSchemaLookupResult, hn as PluginsListParams, ho as SessionsCompactionRestoreParams, hp as CronRunsParamsSchema, hr as TerminalOpenResult, hs as SessionsGroupsMutationResultSchema, ht as WorkerLiveEventResultSchema, hu as NodePresenceActivityPayloadSchema, hv as ConversationTurnReply, hw as AgentsListResult, hx as BoardWidgetNameSchema, hy as MAX_MEMORY_MIGRATION_ITEMS, i as WorktreeRecordSchema, iC as ApprovalPresentationSchema, iE as SkillsUploadChunkParams, iS as WORKER_INFERENCE_MAX_OUTPUT_TOKENS, iT as SkillsDetailResult, i_ as AuditActivityAgentRunV1, ia as SessionsViewerPresenceSetResult, ib as BOARD_CRON_TRIGGER_PREFIX, ic as SessionDiscussionInfoParams, id as HooksStatusParamsSchema, if as ExecApprovalsGetParamsSchema, ig as TalkSessionJoinParamsSchema, ih as ChannelsPairingRequest, ii as TaskSuggestionsCreateParamsSchema, il as QuestionResolveParams, im as SystemChangesListParamsSchema, in as PluginCatalogInstallActionSchema, io as SessionsCompactionBranchParamsSchema, ip as CronAddResultSchema, ir as TerminalDataEventSchema, is as SessionsForkParams, it as WorkerLiveEventErrorDetails, iu as NodePendingDrainResult, iv as ConversationListResultSchema, iw as AgentsFilesGetResultSchema, ix as BoardWidgetGeneratedIdentity, iy as SessionsCatalogContinueResultSchema, j as WORKER_PROTOCOL_MAX_FEATURES, jC as SessionApprovalReplaySchema, jE as ToolsInvokeResult, jS as WorkerInferenceTerminalParams, jT as SkillsProposalRequestRevisionResultSchema, j_ as ArtifactsListResultSchema, ja as SessionGroup, jb as BoardPluginActionParamsSchema, jc as SecretsResolveParams, jd as DevicePairApproveParams, jf as EnvironmentsStatusParams, jg as UserProfileSchema, jh as TalkClientToolCallParams, ji as SessionMemberMutationResult, jl as NodeEventParams, jm as COMMAND_ARG_NAME_MAX_LENGTH, jn as PluginsSessionActionResultSchema, jo as SessionsCreateParams, jp as SystemAgentChatQuestion, jr as TasksCancelParams, js as SessionsPatchParamsSchema, jt as WorkerTranscriptMessageSchema, ju as ChatDeltaEventSchema, jv as NonEmptyString, jw as ModelsListParamsSchema, jx as MissingScopeErrorDetailsSchema, jy as SessionSuggestionState, k as WORKER_LIVE_EVENT_PROTOCOL_FEATURE, kC as SessionApprovalEventSchema, kE as ToolsInvokeParams, kS as WorkerInferenceTerminalFrame, kT as SkillsProposalRequestRevisionParamsSchema, k_ as ArtifactsListParamsSchema, ka as SessionFileRelevance, kb as BoardOp, kc as SecretsReloadParamsSchema, kd as FsListDirResult, kf as EnvironmentsListResult, kg as UserProfile, kh as TalkClientSteerParams, ki as SessionMemberAddParams, kl as NodeDescribeParams, km as COMMAND_ARG_CHOICES_MAX_ITEMS, kn as PluginsSessionActionParamsSchema, ko as SessionsCompanionStateResult, kp as SystemAgentChatParams, kr as TaskSummary, ks as SessionsObserverVisibilityResultSchema, kt as WorkerTranscriptCommitResultSchema, ku as ChatAttachmentSchema, kv as GatewayClientModeSchema, kw as ModelsAuthStatusParamsSchema, kx as GatewayErrorDetailsSchema, ky as SessionSuggestionResolutionSchema, l as WorktreesBranchesResult, lC as ApprovalSnapshot, lE as ToolCatalogEntrySchema, lS as WorkerInferenceCancelRequestFrame, lT as SkillsProposalActionParamsSchema, l_ as AuditActivityInboundMessageV1Schema, la as SessionCompactionCheckpoint, lb as BoardCanvasDocumentSource, lc as SessionDiscussionOpenParams, ld as GatewaySuspendPrepareParamsSchema, lf as ExecApprovalsNodeSnapshot, lg as TalkSessionSteerParams, lh as ChannelsStatusParams, li as TaskSuggestionsDismissResult, ll as QuestionResolvedEventSchema, lm as ConfigGetParams, ln as PluginSearchPackageSchema, lo as SessionsCompactionGetResult, lp as CronJobStateSchema, lr as TerminalInputParams, ls as SessionsGroupsDeleteParamsSchema, lt as WorkerLiveEventParamsSchema, lu as NodePendingEnqueueResultSchema, lv as ConversationTurnCancelParams, lw as AgentsFilesSetParams, lx as BoardWidgetHtmlContentSchema, ly as SessionsCatalogListResult, m as WorktreesGcParamsSchema, mC as CancelledApprovalSnapshotSchema, mE as ToolsCatalogParams, mS as WorkerInferenceContext, mT as SkillsProposalEvaluateParams, m_ as AuditActivityOutboundMessageV1, ma as SessionDiffFileSchema, mb as BoardCommand, mc as SessionDiscussionStateSchema, md as GatewaySuspendResumeParamsSchema, mf as ExecApprovalsSnapshotSchema, mg as TalkSessionTurnParamsSchema, mh as ChannelsStopParamsSchema, mi as TaskSuggestionsListResultSchema, ml as QuestionWaitAnswerParamsSchema, mm as ConfigSchemaLookupParamsSchema, mn as PluginsInstallResultSchema, mo as SessionsCompactionListResultSchema, mp as CronRunParamsSchema, mr as TerminalOpenParamsSchema, ms as SessionsGroupsMutationResult, mt as WorkerLiveEventResult, mu as NodePresenceActivityPayload, mv as ConversationTurnParamsSchema, mw as AgentsListParamsSchema, mx as BoardWidgetMoveOpSchema, my as SessionsCatalogReadResultSchema, n as WorktreeBranchSchema, nC as ApprovalKindSchema, nE as SkillsUploadBeginParams, nS as validateSkillsProposalHistoryStatusParams, nT as SkillsDetailParams, n_ as AuditListResult, na as SessionsViewerPresenceSetParams, nb as SessionToolOverridesSchema, nc as SessionsCreateParamsSchema, nd as LogsTailResultSchema, nf as ExecApprovalResolveParamsSchema, ng as TalkSessionCreateResultSchema, nh as ChannelsPairingListResult, ni as TaskSuggestionsAcceptResultSchema, nl as QuestionRequestedEvent, nm as SystemChangeSourceSchema, nn as PluginCatalogEntry, no as SessionsCompactParamsSchema, np as CronUpdateParams, nr as TerminalCloseParamsSchema, ns as SessionsFilesSetResult, nt as WorkerHelloOk, nu as NodePendingDrainParams, nv as ConversationListParamsSchema, nw as AgentsFilesGetParamsSchema, nx as BoardWidgetDeclared, ny as SessionsCatalogContinueParamsSchema, o as WorktreeRepositoryStatusSchema, oC as ApprovalResolveParamsSchema, oE as SkillsUploadCommitParams, oS as WORKER_INFERENCE_PROTOCOL_FEATURE, oT as SkillsInstallParams, o_ as AuditActivityEventV1, oa as SESSION_OBSERVER_HEALTH_VALUES, ob as BOARD_WIDGET_TOOL_MAX_LENGTH, oc as SessionDiscussionInfoResult, od as GatewaySuspendBlockerSchema, of as ExecApprovalsNodeGetParamsSchema, og as TalkSessionJoinResultSchema, oh as ChannelsLogoutParamsSchema, oi as TaskSuggestionsCreateResultSchema, ol as QuestionResolveResult, om as SystemChangesListResultSchema, on as PluginControlUiDescriptor, oo as SessionsCompactionBranchResultSchema, op as CronDeliverySchema, or as TerminalEventSchema, os as SessionsForkResult, ot as WorkerLiveEventErrorShape, ou as NodePendingEnqueueParams, ov as ConversationSendParamsSchema, ow as AgentsFilesListParamsSchema, ox as BoardWidgetGrantParams, oy as SessionsCatalogHostEventSchema, p as WorktreesGcParams, pC as CancelledApprovalSnapshot, pE as ToolCatalogProfileSchema, pS as WorkerInferenceCancelResult, pT as SkillsProposalCreateParamsSchema, p_ as AuditActivityListResultSchema, pa as SessionDiffFile, pb as BoardChatDockSchema, pc as SessionDiscussionState, pd as GatewaySuspendResumeParams, pf as ExecApprovalsSnapshot, pg as TalkSessionTurnParams, ph as ChannelsStopParams, pi as TaskSuggestionsListResult, pl as QuestionWaitAnswerParams, pm as ConfigSchemaLookupParams, pn as PluginsInstallResult, po as SessionsCompactionListResult, pp as CronRunLogEntrySchema, pr as TerminalOpenParams, ps as SessionsGroupsListResultSchema, pt as WorkerLiveEventResponseFrameSchema, pu as NodePluginToolsUpdateParamsSchema, pv as ConversationTurnParams, pw as AgentsListParams, px as BoardWidgetMcpAppPutContentSchema, py as SessionsCatalogReadResult, q as WorkerConnectRequestFrameSchema, qC as AgentsCreateResult, qS as ApprovalGetParams, qT as SkillsSecurityVerdictsResultSchema, q_ as AgentIdentityParamsSchema, qa as SessionsBranchesListResult, qb as BoardUpdateParamsSchema, qc as QuestionOptionSchema, qd as DeviceTokenRevokeParams, qf as CronRemoveParams, qg as UsersSetAvatarResultSchema, qh as TalkSessionCancelOutputParams, qi as SessionVisibilitySetParamsSchema, ql as NodePairApproveParamsSchema, qm as ChannelsPairingApproveParamsSchema, qn as PluginApprovalResolveParams, qo as SessionsFilesListParamsSchema, qp as SystemAgentSetupVerifyParams, qr as TaskSuggestion, qs as SessionsSearchHitSchema, qt as WizardStartResult, qu as ChatStatusEvent, qv as SessionCatalogSession, qw as SkillsBinsResultSchema, qx as UiSidebarCommandSchema, qy as SessionTypingParams, r as WorktreeRecord, rC as ApprovalPresentation, rE as SkillsUploadBeginParamsSchema, rS as WORKER_INFERENCE_MAX_CONTEXT_MESSAGES, rT as SkillsDetailParamsSchema, r_ as AuditListResultSchema, ra as SessionsViewerPresenceSetParamsSchema, rb as BOARD_CRON_JOB_ID_MAX_LENGTH, rc as SessionDiscussionInfo, rd as HooksStatusParams, rf as ExecApprovalsGetParams, rg as TalkSessionJoinParams, rh as ChannelsPairingListResultSchema, ri as TaskSuggestionsCreateParams, rl as QuestionRequestedEventSchema, rm as SystemChangesListParams, rn as PluginCatalogEntrySchema, ro as SessionsCompactionBranchParams, rp as CronAddParamsSchema, rr as TerminalDataEvent, rs as SessionsFilesSetResultSchema, rt as WorkerLiveEvent, ru as NodePendingDrainParamsSchema, rv as ConversationListResult, rw as AgentsFilesGetResult, rx as BoardWidgetDeclaredSchema, ry as SessionsCatalogContinueResult, s as WorktreesBranchesParams, sC as ApprovalResolveResult, sE as SkillsUploadCommitParamsSchema, sS as WORKER_PROTOCOL_MAX_INFERENCE_PAYLOAD_BYTES, sT as SkillsInstallParamsSchema, s_ as AuditActivityEventV1Schema, sa as SessionBranch, sb as BoardActionParams, sc as SessionDiscussionInfoResultSchema, sd as GatewaySuspendPrepareBusyResultSchema, sf as ExecApprovalsNodeSetParams, sg as TalkSessionOkResult, sh as ChannelsStartParams, si as TaskSuggestionsDismissParams, sl as QuestionResolveResultSchema, sm as ConfigApplyParams, sn as PluginControlUiDescriptorSchema, so as SessionsCompactionGetParams, sp as CronGetParamsSchema, sr as TerminalExitEvent, ss as SessionsForkResultSchema, st as WorkerLiveEventErrorShapeSchema, su as NodePendingEnqueueParamsSchema, sv as ConversationSendResult, sw as AgentsFilesListResult, sx as BoardWidgetGrantParamsSchema, sy as SessionsCatalogListParams, t as WorktreeBranch, tC as ApprovalKind, tE as SkillsUpdateParamsSchema, tS as validateSkillsProposalHistoryScanParams, tT as SkillsCuratorStatusResultSchema, t_ as AuditListParamsSchema, ta as SESSION_VIEWER_PRESENCE_MAX_KEYS, tb as SessionToolOverrides, tc as SessionsUsageParamsSchema, td as LogsTailResult, tf as ExecApprovalResolveParams, tg as TalkSessionCreateResult, th as ChannelsPairingListParamsSchema, ti as TaskSuggestionsAcceptResult, tl as QuestionRequestResultSchema, tm as SystemChangeSource, tn as PluginCatalogClawHubInstallSchema, to as SessionsCompactParams, tp as CronStatusParams, tr as TerminalCloseParams, ts as SessionsFilesSetParamsSchema, tt as WorkerHeartbeatResult, tu as NodePendingAckParamsSchema, tv as ConversationListParams, tw as AgentsFilesGetParams, tx as BoardWidgetContentSchema, ty as SessionsCatalogContinueParams, u as WorktreesBranchesResultSchema, uC as ApprovalSnapshotSchema, uE as ToolCatalogGroup, uS as WorkerInferenceCancelRequestFrameSchema, uT as SkillsProposalApplyResult, u_ as AuditActivityListParams, ua as SessionCompactionCheckpointSchema, ub as BoardCanvasDocumentSourceSchema, uc as SessionDiscussionOpenParamsSchema, ud as GatewaySuspendPrepareReadyResultSchema, uf as ExecApprovalsNodeSnapshotSchema, ug as TalkSessionSteerParamsSchema, uh as ChannelsStatusParamsSchema, ui as TaskSuggestionsDismissResultSchema, ul as QuestionSchema, um as ConfigGetParamsSchema, un as PluginSearchResultEntrySchema, uo as SessionsCompactionGetResultSchema, up as CronListParamsSchema, ur as TerminalInputParamsSchema, us as SessionsGroupsListParams, ut as WorkerLiveEventRequestFrame, uu as NodePluginToolDescriptor, uv as ConversationTurnCancelParamsSchema, uw as AgentsFilesSetParamsSchema, ux as BoardWidgetMaterializedContent, uy as SessionsCatalogListResultSchema, v as WorktreesListParamsSchema, vC as ExecApprovalPresentationSchema, vE as ToolsEffectiveEntry, vS as WorkerInferenceEventParams, vT as SkillsProposalEventsListParams, v_ as ArtifactSummary, va as SessionFileBrowserEntrySchema, vb as BoardCronActionParamsSchema, vc as SessionPlacementStateSchema, vd as GatewaySuspendStatusParamsSchema, vf as EnvironmentSummarySchema, vg as TalkSpeakParamsSchema, vh as TalkCatalogParamsSchema, vi as SystemInfoParams, vl as PushTestParamsSchema, vm as ConfigSchemaParamsSchema, vn as PluginsListResultSchema, vo as SessionsCompactionRestoreResultSchema, vp as CronScratchSchema, vr as TerminalResizeParamsSchema, vs as SessionsGroupsRenameParams, vt as WorkerTranscriptCommitErrorReason, vu as NodePresenceAliveReason, vv as ConversationTurnResultSchema, vw as AgentsUpdateParamsSchema, vx as BoardWidgetPluginPropsSchema, vy as MigrationProtocolSchemas, w as WorktreesRemoveResultSchema, wC as PluginApprovalPresentation, wE as ToolsEffectiveParams, wS as WorkerInferenceStartRequestFrame, wT as SkillsProposalInspectResult, w_ as ArtifactsGetParams, wa as SessionFileEntrySchema, wb as BoardGetParams, wc as SessionsReclaimParamsSchema, wd as GatewaySuspendTaskBlockerSchema, wf as EnvironmentsDestroyParamsSchema, wg as TtsSpeakResultSchema, wh as TalkClientCreateParamsSchema, wi as Snapshot, wl as WebPushTestParamsSchema, wm as UpdateRunParamsSchema, wn as PluginsSearchParamsSchema, wo as SessionsCompanionResetParamsSchema, wp as SystemAgentChatHistoryParamsSchema, wr as TerminalTextResultSchema, ws as SessionsMessagesUnsubscribeParams, wt as WorkerTranscriptCommitRequestFrame, wu as NodeSkillsUpdateParams, wv as WakeParams, ww as ModelChoice, wx as BoardWidgetPutResult, wy as SessionSuggestionAction, x as WorktreesRemoveParams, xC as PendingApprovalSnapshot, xE as ToolsEffectiveGroupSchema, xS as WorkerInferenceOptions, xT as SkillsProposalEventsListResultSchema, x_ as ArtifactsDownloadParamsSchema, xa as SessionFileContentEncoding, xb as BoardEventParams, xc as SessionsDispatchResult, xd as GatewaySuspendStatusResultSchema, xf as EnvironmentsCreateResult, xg as TtsSpeakParams, xh as TalkClientCloseParams, xi as SystemInfoResultSchema, xl as WebPushSubscribeParams, xm as ConfigSetParams, xn as PluginsRefreshResult, xo as SessionsCompanionAskResult, xp as CronStatusParamsSchema, xr as TerminalTextParams, xs as SessionsListParamsSchema, xt as WorkerTranscriptCommitErrorShapeSchema, xu as NodeRenameParamsSchema, xv as PollParams, xw as AuthProbeStatus, xx as BoardWidgetPutContentSchema, xy as MigrationsMemoryPlanParamsSchema, y as WorktreesListResult, yC as ExpiredApprovalSnapshot, yE as ToolsEffectiveEntrySchema, yS as WorkerInferenceModelRef, yT as SkillsProposalEventsListParamsSchema, y_ as ArtifactSummarySchema, ya as SessionFileBrowserResult, yb as BoardDataReadParams, yc as SessionsDispatchParams, yd as GatewaySuspendStatusReadyResultSchema, yf as EnvironmentsCreateParams, yg as TalkSpeakResult, yh as TalkCatalogResult, yi as SystemInfoParamsSchema, yl as PushTestResult, ym as ConfigSchemaResponse, yn as PluginsRefreshParams, yo as SessionsCompanionAskParams, yp as CronScratchSetParamsSchema, yr as TerminalSessionInfo, ys as SessionsGroupsRenameParamsSchema, yt as WorkerTranscriptCommitErrorReasonSchema, yu as NodePresenceAliveReasonSchema, yv as MessageActionParams, yw as AgentsUpdateResult, yx as BoardWidgetPresentationSchema, yy as MigrationsMemoryApplyParamsSchema, z as WORKER_TRANSCRIPT_MAX_JSON_DEPTH, zC as ValidationError, zS as ApprovalAllowDecision, zT as SkillsProposalsListResultSchema, z_ as AgentsWorkspaceGetResultSchema, za as SessionOperationEvent, zb as BoardTabCreateOpSchema, zc as QuestionGetParamsSchema, zd as DevicePairRenameParams, zf as WorkerTunnelStatus, zg as UsersListResultSchema, zh as TalkConfigResult, zi as SessionMembersListResultSchema, zl as NodeInvokeProgressParams, zm as CommandsListParams, zn as PluginsUiDescriptorsResult, zo as SessionsDiffParamsSchema, zp as SystemAgentSetupAuthStartParams, zr as TasksListParams, zs as SessionsResetParamsSchema, zt as WizardCancelParams, zu as ChatMessageGetParamsSchema, zv as SessionCatalogDescriptorSchema, zw as ModelsProbeTargetResultSchema, zx as UiCommandParams, zy as SessionSuggestionsListResult } from "./schema-modules-RCHyMto7.mjs";
import { i as PROTOCOL_VERSION, n as MIN_NODE_PROTOCOL_VERSION, r as MIN_PROBE_PROTOCOL_VERSION, t as MIN_CLIENT_PROTOCOL_VERSION } from "./version-BL42XeI-.mjs";

//#region packages/gateway-protocol/src/clawhub-trust-error-details.d.ts
/** Structured ClawHub trust details carried in gateway error payloads. */
declare const ClawHubTrustErrorCodes: {
  readonly SECURITY_UNAVAILABLE: "clawhub_security_unavailable";
  readonly RISK_ACKNOWLEDGEMENT_REQUIRED: "clawhub_risk_acknowledgement_required";
  readonly DOWNLOAD_BLOCKED: "clawhub_download_blocked";
};
type ClawHubTrustErrorCode = (typeof ClawHubTrustErrorCodes)[keyof typeof ClawHubTrustErrorCodes];
type ClawHubTrustErrorDetails = {
  clawhubTrustCode?: ClawHubTrustErrorCode;
  version?: string;
  warning?: string;
};
declare function isClawHubTrustErrorCode(value: unknown): value is ClawHubTrustErrorCode;
declare function buildClawHubTrustErrorDetails(params: {
  code?: ClawHubTrustErrorCode;
  version?: string;
  warning?: string;
}): ClawHubTrustErrorDetails | undefined;
declare function readClawHubTrustErrorDetails(details: unknown): ClawHubTrustErrorDetails | undefined;
//#endregion
//#region packages/gateway-protocol/src/system-agent-error-details.d.ts
/** Structured system-agent details carried in gateway error payloads. */
declare const SystemAgentErrorDetailCodes: {
  readonly INFERENCE_UNAVAILABLE: "system_agent_inference_unavailable";
  readonly SESSION_INVALIDATED: "system_agent_session_invalidated";
};
type SystemAgentInferenceUnavailableErrorDetails = {
  code: typeof SystemAgentErrorDetailCodes.INFERENCE_UNAVAILABLE;
};
type SystemAgentSessionInvalidatedErrorDetails = {
  code: typeof SystemAgentErrorDetailCodes.SESSION_INVALIDATED;
};
declare function buildSystemAgentInferenceUnavailableErrorDetails(): SystemAgentInferenceUnavailableErrorDetails;
declare function buildSystemAgentSessionInvalidatedErrorDetails(): SystemAgentSessionInvalidatedErrorDetails;
declare function readSystemAgentInferenceUnavailableErrorDetails(details: unknown): SystemAgentInferenceUnavailableErrorDetails | undefined;
declare function readSystemAgentSessionInvalidatedErrorDetails(details: unknown): SystemAgentSessionInvalidatedErrorDetails | undefined;
//#endregion
//#region packages/gateway-protocol/src/session-icon.d.ts
type SessionIcon = {
  kind: "named";
  name: string;
} | {
  kind: "emoji";
  emoji: string;
} | {
  kind: "svg";
  svg: string;
};
declare const SESSION_AGENT_ATTENTION_ICON_IDS: readonly ["hand", "key", "alert", "flag", "lock", "hourglass"];
type SessionAgentAttentionIconId = (typeof SESSION_AGENT_ATTENTION_ICON_IDS)[number];
type SessionAgentStatus = {
  note: string;
  expiresAt: number;
  attention?: SessionAgentAttentionIconId;
};
type SessionIconNormalizationResult = {
  ok: true;
  value: string;
} | {
  ok: false;
  reason: string;
};
/** Parse a stored session icon form without sanitizing SVG markup. */
declare function parseSessionIcon(value: string): SessionIcon | null;
/** Validate and canonicalize a session icon before it enters durable state. */
declare function normalizeSessionIconInput(value: string): SessionIconNormalizationResult;
//#endregion
//#region packages/gateway-protocol/src/terminal-validators.d.ts
declare const validateTerminalOpenParams: ProtocolValidator<{
  agentId?: string | undefined;
  catalog?: {
    threadId: string;
    hostId: string;
    catalogId: string;
  } | undefined;
  cols: number;
  rows: number;
}>;
declare const validateTerminalInputParams: ProtocolValidator<{
  data: string;
  sessionId: string;
}>;
declare const validateTerminalResizeParams: ProtocolValidator<{
  sessionId: string;
  cols: number;
  rows: number;
}>;
declare const validateTerminalCloseParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTerminalAttachParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTerminalTextParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTerminalUploadParams: ProtocolValidator<{
  name: string;
  sessionId: string;
  contentBase64: string;
}>;
declare const validateTerminalUploadResult: ProtocolValidator<{
  path: string;
  size: number;
}>;
//#endregion
//#region packages/gateway-protocol/src/approval-result-validators.d.ts
declare const validateApprovalGetResult: ProtocolValidator<{
  approval: {
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "pending";
    createdAtMs: number;
    urlPath: string;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "user";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "allow-once" | "allow-always";
    expiresAtMs: number;
    status: "allowed";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "user" | "malformed-verdict" | "no-route" | "storage-corrupt";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "deny";
    expiresAtMs: number;
    status: "denied";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "timeout";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "expired";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "run-aborted" | "gateway-restart";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "cancelled";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  };
}>;
declare const validateApprovalHistoryResult: ProtocolValidator<{
  nextCursor?: string | undefined;
  items: ({
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "user";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "allow-once" | "allow-always";
    expiresAtMs: number;
    status: "allowed";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "user" | "malformed-verdict" | "no-route" | "storage-corrupt";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "deny";
    expiresAtMs: number;
    status: "denied";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "timeout";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "expired";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "run-aborted" | "gateway-restart";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "cancelled";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  })[];
}>;
declare const validateApprovalResolveResult: ProtocolValidator<{
  applied: boolean;
  approval: {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "user";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "allow-once" | "allow-always";
    expiresAtMs: number;
    status: "allowed";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "user" | "malformed-verdict" | "no-route" | "storage-corrupt";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    decision: "deny";
    expiresAtMs: number;
    status: "denied";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "timeout";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "expired";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  } | {
    source?: {
      agentId?: string | undefined;
      sessionKey?: string | undefined;
    } | undefined;
    resolver?: {
      id?: string | undefined;
      kind: "device" | "channel" | "runtime" | "system";
    } | undefined;
    reason: "run-aborted" | "gateway-restart";
    id: string;
    presentation: {
      host?: string | null | undefined;
      agentId?: string | null | undefined;
      nodeId?: string | null | undefined;
      commandPreview?: string | null | undefined;
      warningText?: string | null | undefined;
      kind: "exec";
      commandText: string;
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      detail?: string | undefined;
      agentId?: string | null | undefined;
      pluginId?: string | null | undefined;
      toolName?: string | null | undefined;
      kind: "plugin";
      description: string;
      title: string;
      severity: "info" | "warning" | "critical";
      allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
    } | {
      agentId?: string | null | undefined;
      kind: "system-agent";
      description: string;
      title: string;
      allowedDecisions: ["allow-once", "deny"];
      proposalHash: string;
    };
    expiresAtMs: number;
    status: "cancelled";
    createdAtMs: number;
    urlPath: string;
    resolvedAtMs: number;
  };
}>;
//#endregion
//#region packages/gateway-protocol/src/migration-api.d.ts
declare const validateMigrationsMemoryPlanParams: ProtocolValidator<{
  overwrite?: boolean | undefined;
  agentId: string;
}>;
declare const validateMigrationsMemoryApplyParams: ProtocolValidator<{
  overwrite?: boolean | undefined;
  agentId: string;
  providerId: string;
  idempotencyKey: string;
  planFingerprint: string;
  itemIds: string[];
}>;
//#endregion
//#region packages/gateway-protocol/src/validator-registry.d.ts
declare const validateCommandsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  scope?: "text" | "native" | "both" | undefined;
  provider?: string | undefined;
  includeArgs?: boolean | undefined;
}>;
declare const validateConnectParams: ProtocolValidator<{
  caps?: string[] | undefined;
  commands?: string[] | undefined;
  permissions?: Record<string, boolean> | undefined;
  pathEnv?: string | undefined;
  role?: string | undefined;
  scopes?: string[] | undefined;
  device?: {
    id: string;
    publicKey: string;
    signature: string;
    signedAt: number;
    nonce: string;
  } | undefined;
  auth?: {
    token?: string | undefined;
    bootstrapToken?: string | undefined;
    deviceToken?: string | undefined;
    password?: string | undefined;
    approvalRuntimeToken?: string | undefined;
    agentRuntimeIdentityToken?: string | undefined;
  } | undefined;
  locale?: string | undefined;
  userAgent?: string | undefined;
  minProtocol: number;
  maxProtocol: number;
  client: {
    displayName?: string | undefined;
    deviceFamily?: string | undefined;
    modelIdentifier?: string | undefined;
    instanceId?: string | undefined;
    id: "webchat-ui" | "openclaw-control-ui" | "openclaw-browser-copilot" | "openclaw-tui" | "webchat" | "cli" | "gateway-client" | "openclaw-macos" | "openclaw-linux" | "openclaw-ios" | "openclaw-watchos" | "openclaw-android" | "node-host" | "openclaw-worker" | "test" | "fingerprint" | "openclaw-probe";
    version: string;
    platform: string;
    mode: "webchat" | "cli" | "test" | "ui" | "backend" | "node" | "worker" | "probe";
  };
}>;
declare const validateWorkerAdmissionHandshake: ProtocolValidator<{
  bundleHash: string;
  openclawVersion: string;
  protocolFeatures: string[];
}>;
declare const validateWorkerConnectRequestFrame: ProtocolValidator<{
  type: "req";
  id: string;
  method: "connect";
  params: {
    minProtocol: number;
    maxProtocol: number;
    client: {
      id: "openclaw-worker";
      version: string;
      platform: string;
      mode: "worker";
    };
    role: "worker";
    admission: {
      runId: null;
      environmentId: string;
      sessionId: null;
      credential: string;
      ownerEpoch: number;
      rpcSetVersion: number;
      handshake: {
        bundleHash: string;
        openclawVersion: string;
        protocolFeatures: string[];
      };
    } | {
      runId: string;
      environmentId: string;
      sessionId: string;
      credential: string;
      ownerEpoch: number;
      rpcSetVersion: number;
      handshake: {
        bundleHash: string;
        openclawVersion: string;
        protocolFeatures: string[];
      };
    };
  };
}>;
declare const validateWorkerHeartbeatParams: ProtocolValidator<{
  status: "busy" | "ready" | "draining";
  sentAtMs: number;
}>;
declare const validateWorkerTranscriptCommitParams: ProtocolValidator<{
  seq: number;
  messages: ({
    role: "user";
    content: ({
      textSignature?: string | undefined;
      type: "text";
      text: string;
    } | {
      type: "image";
      data: string;
      mimeType: string;
    })[];
    timestamp: number;
  } | {
    diagnostics?: {
      error?: {
        name?: string | undefined;
        code?: string | number | undefined;
        stack?: string | undefined;
        message: string;
      } | undefined;
      details?: Record<string, unknown> | undefined;
      type: string;
      timestamp: number;
    }[] | undefined;
    errorCode?: string | undefined;
    errorMessage?: string | undefined;
    errorType?: string | undefined;
    errorBody?: string | undefined;
    responseModel?: string | undefined;
    responseId?: string | undefined;
    role: "assistant";
    model: string;
    content: ({
      textSignature?: string | undefined;
      type: "text";
      text: string;
    } | {
      redacted?: boolean | undefined;
      thinkingSignature?: string | undefined;
      type: "thinking";
      thinking: string;
    } | {
      executionMode?: "sequential" | "parallel" | undefined;
      thoughtSignature?: string | undefined;
      type: "toolCall";
      id: string;
      name: string;
      arguments: Record<string, unknown>;
    })[];
    timestamp: number;
    provider: string;
    usage: {
      contextUsage?: {
        state: "available";
        totalTokens: number;
        promptTokens: number;
      } | {
        state: "unavailable";
      } | undefined;
      totalTokens: number;
      input: number;
      output: number;
      cacheRead: number;
      cacheWrite: number;
      cost: {
        totalOrigin?: "provider-billed" | undefined;
        total: number;
        input: number;
        output: number;
        cacheRead: number;
        cacheWrite: number;
      };
    };
    stopReason: "error" | "aborted" | "stop" | "length" | "toolUse";
    api: string;
  } | {
    details?: unknown;
    role: "toolResult";
    toolName: string;
    toolCallId: string;
    content: ({
      textSignature?: string | undefined;
      type: "text";
      text: string;
    } | {
      type: "image";
      data: string;
      mimeType: string;
    })[];
    timestamp: number;
    isError: boolean;
  })[];
  runEpoch: number;
  baseLeafId: string | null;
}>;
declare const validateWorkerLiveEventParams: ProtocolValidator<{
  readonly event: {
    readonly kind: "assistant";
    readonly payload: {
      readonly mediaUrls?: string[] | undefined;
      readonly phase?: "commentary" | "final_answer" | undefined;
      readonly itemId?: string | undefined;
      readonly replace?: true | undefined;
      readonly text: string;
      readonly delta: string;
    };
  } | {
    readonly kind: "thinking";
    readonly payload: {
      readonly text: string;
      readonly delta: string;
    };
  } | {
    readonly kind: "tool";
    readonly payload: {
      readonly hideFromChannelProgress?: true | undefined;
      readonly name: string;
      readonly toolCallId: string;
      readonly phase: "start";
      readonly args: unknown;
    } | {
      readonly hideFromChannelProgress?: true | undefined;
      readonly name: string;
      readonly toolCallId: string;
      readonly phase: "update";
      readonly partialResult: unknown;
    } | {
      readonly hideFromChannelProgress?: true | undefined;
      readonly meta?: string | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly name: string;
      readonly toolCallId: string;
      readonly result: unknown;
      readonly phase: "result";
      readonly isError: boolean;
    };
  } | {
    readonly kind: "approval";
    readonly payload: {
      readonly reason?: string | undefined;
      readonly host?: string | undefined;
      readonly scope?: "session" | "turn" | undefined;
      readonly message?: string | undefined;
      readonly toolCallId?: string | undefined;
      readonly command?: string | undefined;
      readonly itemId?: string | undefined;
      readonly approvalId?: string | undefined;
      readonly approvalSlug?: string | undefined;
      readonly kind: "plugin" | "unknown" | "exec";
      readonly title: string;
      readonly status: "unavailable" | "pending";
      readonly phase: "requested";
    } | {
      readonly reason?: string | undefined;
      readonly host?: string | undefined;
      readonly scope?: "session" | "turn" | undefined;
      readonly message?: string | undefined;
      readonly toolCallId?: string | undefined;
      readonly command?: string | undefined;
      readonly itemId?: string | undefined;
      readonly approvalId?: string | undefined;
      readonly approvalSlug?: string | undefined;
      readonly kind: "plugin" | "unknown" | "exec";
      readonly title: string;
      readonly status: "failed" | "denied" | "approved";
      readonly phase: "resolved";
    };
  } | {
    readonly kind: "lifecycle";
    readonly payload: {
      readonly phase: "start";
      readonly startedAt: number;
    } | {
      readonly phase: "fallback";
      readonly activeProvider: string;
      readonly attemptSummaries: string[];
      readonly attempts: {
        readonly reason?: "auth" | "rate_limit" | "billing" | "timeout" | "format" | "unknown" | "auth_permanent" | "overloaded" | "server_error" | "context_overflow" | "model_not_found" | "session_expired" | "empty_response" | "no_error_details" | "unclassified" | undefined;
        readonly authMode?: string | undefined;
        readonly code?: string | undefined;
        readonly status?: number | undefined;
        readonly error: string;
        readonly model: string;
        readonly provider: string;
      }[];
      readonly reasonSummary: string;
      readonly selectedProvider: string;
      readonly selectedModel: string;
      readonly activeModel: string;
    } | {
      readonly previousActiveModel?: string | undefined;
      readonly phase: "fallback_cleared";
      readonly activeProvider: string;
      readonly selectedProvider: string;
      readonly selectedModel: string;
      readonly activeModel: string;
    } | {
      readonly fallbackStepToModel?: string | undefined;
      readonly fallbackStepFromFailureReason?: "auth" | "rate_limit" | "billing" | "timeout" | "format" | "unknown" | "auth_permanent" | "overloaded" | "server_error" | "context_overflow" | "model_not_found" | "session_expired" | "empty_response" | "no_error_details" | "unclassified" | undefined;
      readonly fallbackStepFromFailureDetail?: string | undefined;
      readonly fallbackStepChainPosition?: number | undefined;
      readonly phase: "fallback_step";
      readonly fallbackStepType: "fallback_step";
      readonly fallbackStepFinalOutcome: "succeeded" | "next_fallback" | "chain_exhausted";
      readonly fallbackStepFromModel: string;
    } | {
      readonly error?: string | undefined;
      readonly startedAt?: number | undefined;
      readonly aborted?: boolean | undefined;
      readonly stopReason?: string | undefined;
      readonly yielded?: true | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly timeoutPhase?: "queue" | "provider" | "preflight" | "post_turn" | "gateway_draining" | undefined;
      readonly providerStarted?: boolean | undefined;
      readonly livenessState?: "blocked" | "working" | "paused" | "abandoned" | undefined;
      readonly replayInvalid?: true | undefined;
      readonly phase: "finishing";
      readonly endedAt: number;
    } | {
      readonly startedAt?: number | undefined;
      readonly aborted?: boolean | undefined;
      readonly stopReason?: string | undefined;
      readonly yielded?: true | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly timeoutPhase?: "queue" | "provider" | "preflight" | "post_turn" | "gateway_draining" | undefined;
      readonly providerStarted?: boolean | undefined;
      readonly livenessState?: "blocked" | "working" | "paused" | "abandoned" | undefined;
      readonly replayInvalid?: true | undefined;
      readonly phase: "end";
      readonly endedAt: number;
    } | {
      readonly startedAt?: number | undefined;
      readonly aborted?: boolean | undefined;
      readonly stopReason?: string | undefined;
      readonly yielded?: true | undefined;
      readonly toolErrorSummary?: string | undefined;
      readonly timeoutPhase?: "queue" | "provider" | "preflight" | "post_turn" | "gateway_draining" | undefined;
      readonly providerStarted?: boolean | undefined;
      readonly livenessState?: "blocked" | "working" | "paused" | "abandoned" | undefined;
      readonly replayInvalid?: true | undefined;
      readonly fallbackExhaustedFailure?: true | undefined;
      readonly error: string;
      readonly phase: "error";
      readonly endedAt: number;
    };
  };
  readonly seq: number;
  readonly runId: string;
  readonly runEpoch: number;
  readonly lastAckedSeq: number;
}>;
declare const validateGatewaySuspendPrepareParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateGatewaySuspendStatusParams: ProtocolValidator<{
  suspensionId: string;
}>;
declare const validateGatewaySuspendResumeParams: ProtocolValidator<{
  suspensionId: string;
}>;
declare const validateRequestFrame: ProtocolValidator<{
  params?: unknown;
  traceparent?: string | undefined;
  type: "req";
  id: string;
  method: string;
}>;
declare const validateMessageActionParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  accountId?: string | undefined;
  requesterAccountId?: string | undefined;
  requesterSenderId?: string | undefined;
  senderIsOwner?: boolean | undefined;
  sessionId?: string | undefined;
  inboundTurnKind?: string | undefined;
  toolContext?: {
    currentChannelId?: string | undefined;
    currentMessagingTarget?: string | undefined;
    currentGraphChannelId?: string | undefined;
    currentChannelProvider?: string | undefined;
    currentThreadTs?: string | undefined;
    currentMessageId?: string | number | undefined;
    replyToMode?: "off" | "first" | "all" | "batched" | undefined;
    hasRepliedRef?: {
      value: boolean;
    } | undefined;
    sameChannelThreadRequired?: boolean | undefined;
    skipCrossContextDecoration?: boolean | undefined;
  } | undefined;
  conversationReadOrigin?: "direct-operator" | undefined;
  channel: string;
  params: Record<string, unknown>;
  action: string;
  idempotencyKey: string;
}>;
declare const validateSendParams: ProtocolValidator<{
  agentId?: string | undefined;
  channel?: string | undefined;
  message?: string | undefined;
  sessionKey?: string | undefined;
  accountId?: string | undefined;
  threadId?: string | undefined;
  replyToId?: string | undefined;
  mediaUrl?: string | undefined;
  mediaUrls?: string[] | undefined;
  buffer?: string | undefined;
  filename?: string | undefined;
  contentType?: string | undefined;
  asVoice?: boolean | undefined;
  gifPlayback?: boolean | undefined;
  forceDocument?: boolean | undefined;
  silent?: boolean | undefined;
  parseMode?: "HTML" | undefined;
  idempotencyKey: string;
  to: string;
}>;
declare const validateConversationListParams: ProtocolValidator<{
  channel?: string | undefined;
  query?: string | undefined;
  limit?: number | undefined;
  agentId: string;
}>;
declare const validateConversationSendParams: ProtocolValidator<{
  sourceSessionKey?: string | undefined;
  agentId: string;
  message: string;
  operationId: string;
  conversationRef: string;
}>;
declare const validateConversationTurnCancelParams: ProtocolValidator<{
  agentId: string;
  turnId: string;
}>;
declare const validateConversationTurnParams: ProtocolValidator<{
  sourceSessionKey?: string | undefined;
  agentId: string;
  message: string;
  conversationRef: string;
  turnId: string;
  timeoutMs: number;
}>;
declare const validatePollParams: ProtocolValidator<{
  channel?: string | undefined;
  accountId?: string | undefined;
  threadId?: string | undefined;
  silent?: boolean | undefined;
  maxSelections?: number | undefined;
  durationSeconds?: number | undefined;
  durationHours?: number | undefined;
  isAnonymous?: boolean | undefined;
  idempotencyKey: string;
  to: string;
  question: string;
  options: string[];
}>;
declare const validateAgentParams: ProtocolValidator<{
  agentId?: string | undefined;
  model?: string | undefined;
  channel?: string | undefined;
  label?: string | undefined;
  attachments?: unknown[] | undefined;
  sessionKey?: string | undefined;
  timeout?: number | undefined;
  accountId?: string | undefined;
  threadId?: string | undefined;
  sessionId?: string | undefined;
  to?: string | undefined;
  provider?: string | undefined;
  replyTo?: string | undefined;
  expectedExistingSessionId?: string | undefined;
  thinking?: string | undefined;
  deliver?: boolean | undefined;
  replyChannel?: string | undefined;
  replyAccountId?: string | undefined;
  groupId?: string | undefined;
  groupChannel?: string | undefined;
  groupSpace?: string | undefined;
  bestEffortDeliver?: boolean | undefined;
  lane?: string | undefined;
  cwd?: string | undefined;
  cleanupBundleMcpOnRunEnd?: boolean | undefined;
  modelRun?: boolean | undefined;
  promptMode?: "none" | "full" | "minimal" | undefined;
  extraSystemPrompt?: string | undefined;
  bootstrapContextMode?: "full" | "lightweight" | undefined;
  bootstrapContextRunKind?: "default" | "heartbeat" | "cron" | undefined;
  acpTurnSource?: "manual_spawn" | undefined;
  internalRuntimeHandoffId?: string | undefined;
  execApprovalFollowupExpectedSessionId?: string | undefined;
  internalEvents?: {
    attachments?: {
      type?: string | undefined;
      name?: string | undefined;
      durationMs?: number | undefined;
      path?: string | undefined;
      mediaUrl?: string | undefined;
      url?: string | undefined;
      filePath?: string | undefined;
      mimeType?: string | undefined;
      sizeBytes?: number | undefined;
      width?: number | undefined;
      height?: number | undefined;
    }[] | undefined;
    mediaUrls?: string[] | undefined;
    childSessionId?: string | undefined;
    statsLine?: string | undefined;
    type: "task_completion";
    source: string;
    status: string;
    childSessionKey: string;
    announceType: string;
    taskLabel: string;
    statusLabel: string;
    result: string;
    replyInstruction: string;
  }[] | undefined;
  inputProvenance?: {
    sourceSessionKey?: string | undefined;
    originSessionId?: string | undefined;
    sourceChannel?: string | undefined;
    sourceTool?: string | undefined;
    kind: string;
  } | undefined;
  suppressPromptPersistence?: boolean | undefined;
  sessionEffects?: "visible" | "internal" | undefined;
  sourceReplyDeliveryMode?: "automatic" | "message_tool_only" | undefined;
  disableMessageTool?: boolean | undefined;
  swarmCollector?: boolean | undefined;
  swarmOutputSchema?: Record<string, unknown> | undefined;
  forceRestartSafeTools?: boolean | undefined;
  forceCodeModeTools?: boolean | undefined;
  voiceWakeTrigger?: string | undefined;
  message: string;
  idempotencyKey: string;
}>;
declare const validateAuditActivityListParams: ProtocolValidator<AuditActivityListParams>;
declare const validateAuditListParams: ProtocolValidator<{
  kind?: "agent_run" | "tool_action" | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  after?: number | undefined;
  status?: "failed" | "unknown" | "cancelled" | "started" | "succeeded" | "timed_out" | "blocked" | undefined;
  runId?: string | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
  before?: number | undefined;
}>;
declare const validateUsersListParams: ProtocolValidator<object>;
declare const validateUsersSelfParams: ProtocolValidator<object>;
declare const validateUsersSelfResult: ProtocolValidator<{
  profile: {
    id: string;
    displayName: string | null;
    updatedAt: number;
    createdAt: number;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateUsersLinkEmailParams: ProtocolValidator<{
  email: string;
  targetProfileId: string;
}>;
declare const validateUsersLinkEmailResult: ProtocolValidator<{
  profile: {
    id: string;
    displayName: string | null;
    updatedAt: number;
    createdAt: number;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateUsersSetDisplayNameParams: ProtocolValidator<{
  displayName: string | null;
  profileId: string;
}>;
declare const validateUsersSetDisplayNameResult: ProtocolValidator<{
  profile: {
    id: string;
    displayName: string | null;
    updatedAt: number;
    createdAt: number;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateUsersSetAvatarParams: ProtocolValidator<{
  profileId: string;
  mime: "image/png" | "image/jpeg" | "image/webp";
  avatarBase64: string;
}>;
declare const validateUsersSetAvatarResult: ProtocolValidator<{
  profile: {
    id: string;
    displayName: string | null;
    updatedAt: number;
    createdAt: number;
    avatarMime: "image/png" | "image/jpeg" | "image/webp" | null;
    mergedInto: string | null;
    emails: string[];
    hasAvatar: boolean;
  };
}>;
declare const validateAgentIdentityParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
}>;
declare const validateAgentWaitParams: ProtocolValidator<{
  timeoutMs?: number | undefined;
  runId: string;
}>;
declare const validateWakeParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  mode: "now" | "next-heartbeat";
  text: string;
}>;
declare const validateAgentsListParams: ProtocolValidator<object>;
declare const validateWorktreesListParams: ProtocolValidator<object>;
declare const validateBoardGetParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateBoardUpdateParams: ProtocolValidator<{
  sessionKey: string;
  ops: ({
    chatDock?: "left" | "right" | "bottom" | "hidden" | undefined;
    kind: "tab_create";
    tabId: string;
    title: string;
  } | {
    title?: string | undefined;
    position?: number | undefined;
    chatDock?: "left" | "right" | "bottom" | "hidden" | undefined;
    kind: "tab_update";
    tabId: string;
  } | {
    kind: "tab_delete";
    tabId: string;
  } | {
    kind: "tabs_reorder";
    tabIds: string[];
  } | {
    tabId?: string | undefined;
    position?: number | undefined;
    after?: string | undefined;
    name: string;
    kind: "widget_move";
  } | {
    heightMode?: "auto" | "fixed" | undefined;
    name: string;
    kind: "widget_resize";
    sizeW: number;
    sizeH: number;
  } | {
    name: string;
    kind: "widget_remove";
  })[];
}>;
declare const validateBoardWidgetContent: ProtocolValidator<{
  kind: "html";
  html: string;
} | {
  kind: "mcp-app";
  descriptor: {
    serverName: string;
    toolName: string;
    uiResourceUri: string;
    toolCallId: string;
  };
} | {
  props?: Record<string, unknown> | undefined;
  kind: "plugin";
  pluginKind: string;
}>;
declare const validateBoardWidgetAppViewParams: ProtocolValidator<{
  instanceId: string;
  name: string;
  revision: number;
  sessionKey: string;
}>;
declare const validateBoardWidgetPutParams: ProtocolValidator<{
  title?: string | undefined;
  presentation?: "card" | "full-bleed" | "frameless" | undefined;
  heightMode?: "auto" | "fixed" | undefined;
  declared?: {
    netOrigins?: string[] | undefined;
    tools?: string[] | undefined;
  } | undefined;
  placement?: {
    tabId?: string | undefined;
    after?: string | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "full" | undefined;
  } | undefined;
  generatedIdentity?: {
    source: "show_widget";
    key: string;
    fallbackName: string;
  } | undefined;
  name: string;
  sessionKey: string;
  content: {
    kind: "html";
    html: string;
  } | {
    props?: Record<string, unknown> | undefined;
    kind: "plugin";
    pluginKind: string;
  } | {
    kind: "mcp-app";
    viewId: string;
  } | {
    kind: "canvas-doc";
    docId: string;
  };
}>;
declare const validateBoardWidgetGrantParams: ProtocolValidator<{
  instanceId: string;
  name: string;
  revision: number;
  sessionKey: string;
  decision: "granted" | "rejected";
}>;
declare const validateBoardEventParams: ProtocolValidator<{
  payload: unknown;
  sessionKey: string;
  widget: string;
} | {
  payload: unknown;
  ticket: string;
}>;
declare const validateBoardPromptAuthorizeParams: ProtocolValidator<{
  ticket: string;
}>;
declare const validateBoardDataReadParams: ProtocolValidator<{
  params?: Record<string, unknown> | undefined;
  ticket: string;
  bindingId: string;
}>;
declare const validateBoardActionParams: ProtocolValidator<{
  ticket: string;
  action: "cron.trigger";
  jobId: string;
} | {
  params?: Record<string, unknown> | undefined;
  ticket: string;
  action: string;
}>;
declare const validateWorktreesCreateParams: ProtocolValidator<{
  name?: string | undefined;
  baseRef?: string | undefined;
  repoRoot: string;
}>;
declare const validateWorktreesRemoveParams: ProtocolValidator<{
  force?: boolean | undefined;
  id: string;
}>;
declare const validateWorktreesRestoreParams: ProtocolValidator<{
  id: string;
}>;
declare const validateWorktreesGcParams: ProtocolValidator<object>;
declare const validateWorktreesBranchesParams: ProtocolValidator<{
  includeRepositoryStatus?: boolean | undefined;
  repoRoot: string;
}>;
declare const validateFsListDirParams: ProtocolValidator<{
  path?: string | undefined;
  nodeId?: string | undefined;
}>;
declare const validateFsListDirResult: ProtocolValidator<{
  parent?: string | undefined;
  path: string;
  home: string;
  entries: {
    hidden?: boolean | undefined;
    name: string;
    path: string;
  }[];
}>;
declare const validateAgentsCreateParams: ProtocolValidator<{
  model?: string | undefined;
  avatar?: string | undefined;
  emoji?: string | undefined;
  workspace?: string | undefined;
  name: string;
}>;
declare const validateAgentsUpdateParams: ProtocolValidator<{
  name?: string | undefined;
  model?: string | null | undefined;
  avatar?: string | undefined;
  emoji?: string | undefined;
  workspace?: string | undefined;
  agentId: string;
}>;
declare const validateAgentsDeleteParams: ProtocolValidator<{
  deleteFiles?: boolean | undefined;
  agentId: string;
}>;
declare const validateAgentsFilesListParams: ProtocolValidator<{
  agentId: string;
}>;
declare const validateAgentsFilesGetParams: ProtocolValidator<{
  name: string;
  agentId: string;
}>;
declare const validateAgentsFilesSetParams: ProtocolValidator<{
  name: string;
  agentId: string;
  content: string;
}>;
declare const validateAgentsWorkspaceListParams: ProtocolValidator<{
  path?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  agentId: string;
}>;
declare const validateAgentsWorkspaceGetParams: ProtocolValidator<{
  agentId: string;
  path: string;
}>;
declare const validateArtifactsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  taskId?: string | undefined;
  runId?: string | undefined;
}>;
declare const validateArtifactsGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  taskId?: string | undefined;
  runId?: string | undefined;
  artifactId: string;
}>;
declare const validateArtifactsDownloadParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  taskId?: string | undefined;
  runId?: string | undefined;
  artifactId: string;
}>;
declare const validateNodePairListParams: ProtocolValidator<object>;
declare const validateNodePairApproveParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateNodePairRejectParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateNodePairRemoveParams: ProtocolValidator<{
  nodeId: string;
}>;
declare const validateNodeRenameParams: ProtocolValidator<{
  displayName: string;
  nodeId: string;
}>;
declare const validateNodeListParams: ProtocolValidator<object>;
declare const validateNodePluginToolsUpdateParams: ProtocolValidator<{
  tools: {
    command?: string | undefined;
    parameters?: Record<string, unknown> | undefined;
    mcp?: {
      server: string;
      tool: string;
    } | undefined;
    name: string;
    pluginId: string;
    description: string;
  }[];
}>;
declare const validateNodeSkillsUpdateParams: ProtocolValidator<{
  skills: {
    name: string;
    description: string;
    content: string;
  }[];
}>;
declare const validateEnvironmentsCreateParams: ProtocolValidator<{
  profileId: string;
  idempotencyKey: string;
}>;
declare const validateEnvironmentsDestroyParams: ProtocolValidator<{
  force?: boolean | undefined;
  environmentId: string;
}>;
declare const validateEnvironmentsListParams: ProtocolValidator<object>;
declare const validateEnvironmentsStatusParams: ProtocolValidator<{
  environmentId: string;
}>;
declare const validateSystemInfoParams: ProtocolValidator<object>;
declare const validateSystemInfoResult: ProtocolValidator<{
  lanAddress?: string | undefined;
  port?: number | undefined;
  processInstanceId?: string | undefined;
  cpuModel?: string | undefined;
  loadAverage?: [number, number, number] | undefined;
  diskTotalBytes?: number | undefined;
  diskAvailableBytes?: number | undefined;
  diskPath?: string | undefined;
  defaultAgentUtilityModel?: {
    model: string;
    status: "auto";
  } | {
    model: string;
    status: "configured";
  } | {
    status: "disabled";
  } | {
    status: "unavailable";
  } | undefined;
  platform: string;
  uptimeMs: number;
  machineName: string;
  hostname: string;
  release: string;
  arch: string;
  osLabel: string;
  nodeVersion: string;
  pid: number;
  cpuCount: number;
  memoryTotalBytes: number;
  memoryFreeBytes: number;
}>;
declare const validateNodePendingAckParams: ProtocolValidator<{
  ids: string[];
}>;
declare const validateNodeDescribeParams: ProtocolValidator<{
  nodeId: string;
}>;
declare const validateNodeInvokeParams: ProtocolValidator<{
  params?: unknown;
  sessionKey?: string | undefined;
  timeoutMs?: number | undefined;
  turnSourceChannel?: string | undefined;
  turnSourceTo?: string | undefined;
  turnSourceAccountId?: string | undefined;
  turnSourceThreadId?: string | number | undefined;
  command: string;
  idempotencyKey: string;
  nodeId: string;
}>;
declare const validateNodeInvokeResultParams: ProtocolValidator<{
  error?: {
    code?: string | undefined;
    message?: string | undefined;
  } | undefined;
  payload?: unknown;
  payloadJSON?: string | undefined;
  id: string;
  ok: boolean;
  nodeId: string;
}>;
declare const validateNodeInvokeProgressParams: ProtocolValidator<{
  seq: number;
  nodeId: string;
  invokeId: string;
  chunk: string;
}>;
declare const validateNodeEventParams: ProtocolValidator<{
  payload?: unknown;
  payloadJSON?: string | undefined;
  event: string;
}>;
declare const validateNodePresenceActivityPayload: ProtocolValidator<{
  saturated?: boolean | undefined;
  idleSeconds: number;
} | {
  action: "clear";
}>;
declare const validateNodePendingDrainParams: ProtocolValidator<{
  maxItems?: number | undefined;
}>;
declare const validateNodePendingEnqueueParams: ProtocolValidator<{
  priority?: string | undefined;
  expiresInMs?: number | undefined;
  wake?: boolean | undefined;
  type: string;
  nodeId: string;
}>;
declare const validatePushTestParams: ProtocolValidator<{
  title?: string | undefined;
  body?: string | undefined;
  environment?: string | undefined;
  nodeId: string;
}>;
declare const validateWebPushVapidPublicKeyParams: ProtocolValidator<WebPushVapidPublicKeyParams>;
declare const validateWebPushSubscribeParams: ProtocolValidator<WebPushSubscribeParams>;
declare const validateWebPushUnsubscribeParams: ProtocolValidator<WebPushUnsubscribeParams>;
declare const validateWebPushTestParams: ProtocolValidator<WebPushTestParams>;
declare const validateSecretsResolveParams: ProtocolValidator<{
  allowedPaths?: string[] | undefined;
  forcedActivePaths?: string[] | undefined;
  optionalActivePaths?: string[] | undefined;
  providerOverrides?: {
    webSearch?: string | undefined;
    webFetch?: string | undefined;
  } | undefined;
  commandName: string;
  targetIds: string[];
}>;
declare const validateSecretsResolveResult: ProtocolValidator<{
  ok?: boolean | undefined;
  assignments?: {
    path?: string | undefined;
    value: unknown;
    pathSegments: string[];
  }[] | undefined;
  diagnostics?: string[] | undefined;
  inactiveRefPaths?: string[] | undefined;
}>;
declare const validateSessionsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  label?: string | undefined;
  spawnedBy?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  activeMinutes?: number | undefined;
  requireLastInteraction?: boolean | undefined;
  sortBy?: "updatedAt" | "lastInteractionAt" | undefined;
  includeGlobal?: boolean | undefined;
  includeUnknown?: boolean | undefined;
  configuredAgentsOnly?: boolean | undefined;
  includeDerivedTitles?: boolean | undefined;
  includeLastMessage?: boolean | undefined;
  boardFace?: "chat" | "dashboard" | undefined;
  creatorId?: string | undefined;
  search?: string | undefined;
  archived?: boolean | "all" | undefined;
}>;
declare const validateSessionsCatalogListParams: ProtocolValidator<{
  agentId?: string | undefined;
  search?: string | undefined;
  catalogId?: string | undefined;
  cursors?: Record<string, string> | undefined;
  progressId?: string | undefined;
  limitPerHost?: number | undefined;
  hostIds?: string[] | undefined;
}>;
declare const validateSessionsCatalogReadParams: ProtocolValidator<{
  limit?: number | undefined;
  cursor?: string | undefined;
  threadId: string;
  hostId: string;
  catalogId: string;
}>;
declare const validateSessionsCatalogContinueParams: ProtocolValidator<{
  threadId: string;
  hostId: string;
  catalogId: string;
}>;
declare const validateSessionsCatalogArchiveParams: ProtocolValidator<{
  threadId: string;
  hostId: string;
  catalogId: string;
  confirmNoOtherRunner: true;
}>;
declare const validateSessionsSearchParams: ProtocolValidator<{
  agentId?: string | undefined;
  limit?: number | undefined;
  sessionKeys?: string[] | undefined;
  query: string;
}>;
declare const validateSessionsCleanupParams: ProtocolValidator<{
  agent?: string | undefined;
  allAgents?: boolean | undefined;
  enforce?: boolean | undefined;
  activeKey?: string | undefined;
  fixMissing?: boolean | undefined;
  fixDmScope?: boolean | undefined;
}>;
declare const validateSessionsPreviewParams: ProtocolValidator<{
  limit?: number | undefined;
  maxChars?: number | undefined;
  keys: string[];
}>;
declare const validateSessionsDescribeParams: ProtocolValidator<{
  includeDerivedTitles?: boolean | undefined;
  includeLastMessage?: boolean | undefined;
  key: string;
}>;
declare const validateSessionsResolveParams: ProtocolValidator<{
  agentId?: string | undefined;
  key?: string | undefined;
  label?: string | undefined;
  spawnedBy?: string | undefined;
  sessionId?: string | undefined;
  includeGlobal?: boolean | undefined;
  includeUnknown?: boolean | undefined;
  allowMissing?: boolean | undefined;
}>;
declare const validateSessionsFilesListParams: ProtocolValidator<{
  agentId?: string | undefined;
  path?: string | undefined;
  search?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionsFilesGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  path: string;
  sessionKey: string;
}>;
declare const validateSessionsFilesSetParams: ProtocolValidator<{
  agentId?: string | undefined;
  path: string;
  sessionKey: string;
  content: string;
  expectedHash: string;
}>;
declare const validateSessionsFilesRevealParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsDiffParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionsCompanionAskParams: ProtocolValidator<{
  sessionKey: string;
  question: string;
}>;
declare const validateSessionsCompanionStateParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionsCompanionResetParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionsObserverVisibilityParams: ProtocolValidator<{
  visible: boolean;
}>;
declare const validateSessionVisibilitySetParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  visibility: "shared" | "read-only" | "suggest" | "draft";
}>;
declare const validateSessionMembersListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionMemberAddParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  identityId: string;
}>;
declare const validateSessionMemberRemoveParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  identityId: string;
}>;
declare const validateSessionSuggestionsAddParams: ProtocolValidator<{
  agentId?: string | undefined;
  text: string;
  sessionKey: string;
}>;
declare const validateSessionSuggestionsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionSuggestionsResolveParams: ProtocolValidator<{
  agentId?: string | undefined;
  id: string;
  sessionKey: string;
  resolution: "queue" | "send" | "edit" | "dismiss";
}>;
declare const validateSessionTypingParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  sessionId: string;
  typing: boolean;
}>;
declare const validateSessionsCreateParams: ProtocolValidator<{
  agentId?: string | undefined;
  model?: string | undefined;
  key?: string | undefined;
  label?: string | undefined;
  attachments?: {
    type?: string | undefined;
    durationMs?: number | undefined;
    content?: unknown;
    mimeType?: string | undefined;
    sizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    fileName?: string | undefined;
  }[] | undefined;
  message?: string | undefined;
  task?: string | undefined;
  cwd?: string | undefined;
  catalogId?: string | undefined;
  incognito?: boolean | undefined;
  parentSessionKey?: string | undefined;
  spawnDepth?: number | undefined;
  worktree?: boolean | undefined;
  execNode?: string | undefined;
  visibility?: "shared" | "read-only" | "suggest" | "draft" | undefined;
  thinkingLevel?: string | undefined;
  fork?: boolean | undefined;
  emitCommandHooks?: boolean | undefined;
  succeedsParent?: boolean | undefined;
  worktreeBaseRef?: string | undefined;
  worktreeName?: string | undefined;
}>;
declare const validateSessionsSendParams: ProtocolValidator<{
  agentId?: string | undefined;
  attachments?: {
    type?: string | undefined;
    durationMs?: number | undefined;
    content?: unknown;
    mimeType?: string | undefined;
    sizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    fileName?: string | undefined;
  }[] | undefined;
  idempotencyKey?: string | undefined;
  timeoutMs?: number | undefined;
  thinking?: string | undefined;
  key: string;
  message: string;
}>;
declare const validateSessionsDispatchParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  profileId: string;
}>;
declare const validateSessionsReclaimParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsMessagesSubscribeParams: ProtocolValidator<{
  agentId?: string | undefined;
  includeApprovals?: true | undefined;
  key: string;
}>;
declare const validateSessionsMessagesUnsubscribeParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsViewerPresenceSetParams: ProtocolValidator<{
  sessionKeys: string[];
}>;
declare const validateSessionsAbortParams: ProtocolValidator<{
  agentId?: string | undefined;
  key?: string | undefined;
  runId?: string | undefined;
  clearQueued?: boolean | undefined;
}>;
declare const validateSessionsPatchParams: ProtocolValidator<{
  agentId?: string | undefined;
  model?: string | null | undefined;
  label?: string | null | undefined;
  icon?: string | null | undefined;
  boardFace?: "chat" | "dashboard" | undefined;
  archived?: boolean | undefined;
  pinned?: boolean | undefined;
  unread?: boolean | undefined;
  execNode?: string | null | undefined;
  toolOverrides?: {
    skills?: Record<string, boolean> | undefined;
    webSearch?: boolean | undefined;
    mcpServers?: Record<string, boolean> | undefined;
    mcpToolsDeny?: Record<string, string[]> | undefined;
  } | null | undefined;
  thinkingLevel?: string | null | undefined;
  expectedSessionId?: string | undefined;
  expectedLifecycleRevision?: string | undefined;
  category?: string | null | undefined;
  statusNote?: string | null | undefined;
  attention?: string | null | undefined;
  ttlMinutes?: number | undefined;
  fastMode?: boolean | "auto" | null | undefined;
  verboseLevel?: string | null | undefined;
  traceLevel?: string | null | undefined;
  reasoningLevel?: string | null | undefined;
  responseUsage?: "full" | "off" | "tokens" | "on" | null | undefined;
  elevatedLevel?: string | null | undefined;
  execHost?: string | null | undefined;
  execSecurity?: string | null | undefined;
  execAsk?: string | null | undefined;
  completionOwnerSessionKey?: string | null | undefined;
  inheritedToolPolicyVersion?: 1 | null | undefined;
  inheritedToolAllow?: string[] | null | undefined;
  inheritedToolDeny?: string[] | null | undefined;
  sendPolicy?: "allow" | "deny" | null | undefined;
  groupActivation?: "mention" | "always" | null | undefined;
  key: string;
}>;
declare const validateSessionsPluginPatchParams: ProtocolValidator<{
  value?: unknown;
  unset?: boolean | undefined;
  key: string;
  pluginId: string;
  namespace: string;
}>;
declare const validateSessionsResetParams: ProtocolValidator<{
  reason?: "new" | "reset" | undefined;
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsDeleteParams: ProtocolValidator<{
  agentId?: string | undefined;
  expectedSessionId?: string | undefined;
  expectedLifecycleRevision?: string | undefined;
  deleteTranscript?: boolean | undefined;
  expectedSessionUpdatedAt?: number | undefined;
  emitLifecycleHooks?: boolean | undefined;
  archivedOnly?: boolean | undefined;
  key: string;
}>;
declare const validateSessionsGroupsListParams: ProtocolValidator<object>;
declare const validateSessionsGroupsListResult: ProtocolValidator<{
  sectionOrder?: string[] | undefined;
  groups: {
    name: string;
    position: number;
  }[];
}>;
declare const validateSessionsGroupsPutParams: ProtocolValidator<{
  sectionOrder?: string[] | undefined;
  names: string[];
}>;
declare const validateSessionsGroupsRenameParams: ProtocolValidator<{
  name: string;
  to: string;
}>;
declare const validateSessionsGroupsDeleteParams: ProtocolValidator<{
  name: string;
}>;
declare const validateSessionsGroupsMutationResult: ProtocolValidator<{
  sectionOrder?: string[] | undefined;
  updatedSessions?: number | undefined;
  ok: true;
  groups: {
    name: string;
    position: number;
  }[];
}>;
declare const validateSessionsCompactParams: ProtocolValidator<{
  agentId?: string | undefined;
  maxLines?: number | undefined;
  key: string;
}>;
declare const validateSessionsCompactionListParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
}>;
declare const validateSessionsCompactionGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  checkpointId: string;
}>;
declare const validateSessionsCompactionBranchParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  checkpointId: string;
}>;
declare const validateSessionsCompactionRestoreParams: ProtocolValidator<{
  agentId?: string | undefined;
  key: string;
  checkpointId: string;
}>;
declare const validateSessionsBranchesListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateSessionsBranchesSwitchParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  leafEntryId: string;
}>;
declare const validateSessionsRewindParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  entryId: string;
}>;
declare const validateSessionsForkParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
  entryId: string;
}>;
declare const validateSessionsUsageParams: ProtocolValidator<{
  mode?: "gateway" | "utc" | "specific" | undefined;
  agentId?: string | undefined;
  key?: string | undefined;
  limit?: number | undefined;
  agentScope?: "all" | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  range?: "all" | "7d" | "30d" | "90d" | "1y" | undefined;
  groupBy?: "instance" | "family" | undefined;
  includeHistorical?: boolean | undefined;
  utcOffset?: string | undefined;
  timeZone?: string | undefined;
  includeContextWeight?: boolean | undefined;
}>;
declare const validateSessionDiscussionInfoParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionDiscussionInfoResult: ProtocolValidator<{
  embedUrl?: string | undefined;
  openUrl?: string | undefined;
  state: "none" | "open" | "available";
}>;
declare const validateSessionDiscussionOpenParams: ProtocolValidator<{
  sessionKey: string;
}>;
declare const validateSessionDiscussionOpenResult: ProtocolValidator<{
  embedUrl?: string | undefined;
  openUrl?: string | undefined;
  state: "none" | "open" | "available";
}>;
declare const validateTaskSuggestionsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
}>;
declare const validateTaskSuggestionsCreateParams: ProtocolValidator<{
  agentId?: string | undefined;
  prompt: string;
  title: string;
  sessionKey: string;
  cwd: string;
  tldr: string;
}>;
declare const validateTaskSuggestionsAcceptParams: ProtocolValidator<{
  taskId: string;
}>;
declare const validateTaskSuggestionsDismissParams: ProtocolValidator<{
  reason?: string | undefined;
  taskId: string;
}>;
declare const validateTasksListParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  status?: "failed" | "running" | "queued" | "cancelled" | "completed" | "timed_out" | ("failed" | "running" | "queued" | "cancelled" | "completed" | "timed_out")[] | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
}>;
declare const validateTasksGetParams: ProtocolValidator<{
  taskId: string;
}>;
declare const validateTasksCancelParams: ProtocolValidator<{
  reason?: string | undefined;
  taskId: string;
}>;
declare const validateTasksRecoveryParams: ProtocolValidator<{
  taskIds: string[];
}>;
declare const validateConfigGetParams: ProtocolValidator<object>;
declare const validateConfigSetParams: ProtocolValidator<{
  baseHash?: string | undefined;
  raw: string;
}>;
declare const validateConfigApplyParams: ProtocolValidator<{
  readonly sessionKey?: string | undefined;
  readonly baseHash?: string | undefined;
  readonly deliveryContext?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    to?: string | undefined;
  } | undefined;
  readonly note?: string | undefined;
  readonly restartDelayMs?: number | undefined;
  readonly raw: string;
}>;
declare const validateConfigPatchParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  baseHash?: string | undefined;
  deliveryContext?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    to?: string | undefined;
  } | undefined;
  note?: string | undefined;
  restartDelayMs?: number | undefined;
  replacePaths?: string[] | undefined;
  raw: string;
}>;
declare const validateConfigSchemaParams: ProtocolValidator<object>;
declare const validateConfigSchemaLookupParams: ProtocolValidator<{
  path: string;
}>;
declare const validateConfigSchemaLookupResult: ProtocolValidator<{
  reloadKind?: "none" | "restart" | "hot" | undefined;
  hint?: {
    tags?: string[] | undefined;
    label?: string | undefined;
    group?: string | undefined;
    order?: number | undefined;
    presentation?: "phone-number" | undefined;
    help?: string | undefined;
    docsUrl?: string | undefined;
    advanced?: boolean | undefined;
    sensitive?: boolean | undefined;
    placeholder?: string | undefined;
    itemTemplate?: unknown;
  } | undefined;
  hintPath?: string | undefined;
  path: string;
  children: {
    type?: string | string[] | undefined;
    reloadKind?: "none" | "restart" | "hot" | undefined;
    hint?: {
      tags?: string[] | undefined;
      label?: string | undefined;
      group?: string | undefined;
      order?: number | undefined;
      presentation?: "phone-number" | undefined;
      help?: string | undefined;
      docsUrl?: string | undefined;
      advanced?: boolean | undefined;
      sensitive?: boolean | undefined;
      placeholder?: string | undefined;
      itemTemplate?: unknown;
    } | undefined;
    hintPath?: string | undefined;
    required: boolean;
    path: string;
    key: string;
    hasChildren: boolean;
  }[];
  schema: unknown;
}>;
declare const validateSystemAgentChatParams: ProtocolValidator<{
  message?: string | undefined;
  reset?: boolean | undefined;
  wizardAnswer?: {
    value?: unknown;
    stepId: string;
  } | undefined;
  welcomeVariant?: "onboarding" | "new-agent" | undefined;
  context?: {
    page: string;
  } | undefined;
  delegation?: {
    agentId?: string | undefined;
    sessionKey?: string | undefined;
    turnSourceChannel?: string | undefined;
    turnSourceTo?: string | undefined;
    turnSourceAccountId?: string | undefined;
    turnSourceThreadId?: string | number | undefined;
  } | undefined;
  sessionId: string;
}>;
declare const validateSystemAgentChatHistoryParams: ProtocolValidator<{
  limit?: number | undefined;
}>;
declare const validateSystemChangesListParams: ProtocolValidator<{
  limit?: number | undefined;
  beforeCursor?: string | undefined;
}>;
declare const validateSystemAgentSetupDetectParams: ProtocolValidator<object>;
declare const validateSystemAgentSetupVerifyParams: ProtocolValidator<object>;
declare const validateSystemAgentSetupActivateParams: ProtocolValidator<{
  modelRef?: string | undefined;
  workspace?: string | undefined;
  authChoice?: string | undefined;
  apiKey?: string | undefined;
  kind: "existing-model" | "openai-api-key" | "anthropic-api-key" | "claude-cli" | "codex-cli" | "gemini-cli" | "api-key" | `provider-auto:${string}`;
}>;
declare const validateSystemAgentSetupAuthStartParams: ProtocolValidator<{
  workspace?: string | undefined;
  sessionId: string;
  authChoice: string;
}>;
declare const validateWizardStartParams: ProtocolValidator<{
  mode?: "local" | "remote" | undefined;
  channel?: string | undefined;
  workspace?: string | undefined;
  installDaemon?: boolean | undefined;
  flow?: "channels" | "setup" | undefined;
}>;
declare const validateWizardNextParams: ProtocolValidator<{
  answer?: {
    value?: unknown;
    stepId: string;
  } | undefined;
  sessionId: string;
}>;
declare const validateWizardCancelParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateWizardStatusParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTalkModeParams: ProtocolValidator<{
  phase?: string | undefined;
  enabled: boolean;
}>;
declare const validateTalkCatalogParams: ProtocolValidator<object>;
declare const validateTalkConfigParams: ProtocolValidator<{
  includeSecrets?: boolean | undefined;
}>;
declare const validateTalkConfigResult: ProtocolValidator<{
  config: {
    ui?: {
      seamColor?: string | undefined;
    } | undefined;
    session?: {
      mainKey?: string | undefined;
    } | undefined;
    talk?: {
      provider?: string | undefined;
      resolved?: {
        provider: string;
        config: {
          apiKey?: string | {
            id: string;
            source: "env";
            provider: string;
          } | {
            id: string;
            source: "file";
            provider: string;
          } | {
            id: string;
            source: "exec";
            provider: string;
          } | undefined;
        };
      } | undefined;
      realtime?: {
        mode?: "realtime" | "stt-tts" | "transcription" | undefined;
        model?: string | undefined;
        provider?: string | undefined;
        transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room" | undefined;
        brain?: "none" | "agent-consult" | "direct-tools" | undefined;
        providers?: Record<string, {
          apiKey?: string | {
            id: string;
            source: "env";
            provider: string;
          } | {
            id: string;
            source: "file";
            provider: string;
          } | {
            id: string;
            source: "exec";
            provider: string;
          } | undefined;
        }> | undefined;
        voice?: string | undefined;
        vadThreshold?: number | undefined;
        silenceDurationMs?: number | undefined;
        prefixPaddingMs?: number | undefined;
        reasoningEffort?: string | undefined;
        speakerVoice?: string | undefined;
        speakerVoiceId?: string | undefined;
        instructions?: string | undefined;
        consultRouting?: "provider-direct" | "force-agent-consult" | undefined;
      } | undefined;
      providers?: Record<string, {
        apiKey?: string | {
          id: string;
          source: "env";
          provider: string;
        } | {
          id: string;
          source: "file";
          provider: string;
        } | {
          id: string;
          source: "exec";
          provider: string;
        } | undefined;
      }> | undefined;
      consultThinkingLevel?: string | undefined;
      consultFastMode?: boolean | undefined;
      speechLocale?: string | undefined;
      interruptOnSpeech?: boolean | undefined;
      silenceTimeoutMs?: number | undefined;
    } | undefined;
  };
}>;
declare const validateTalkClientCreateParams: ProtocolValidator<{
  mode?: "realtime" | "stt-tts" | "transcription" | undefined;
  capabilities?: ("camera-frame" | "voice-transcript")[] | undefined;
  model?: string | undefined;
  sessionKey?: string | undefined;
  provider?: string | undefined;
  transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room" | undefined;
  brain?: "none" | "agent-consult" | "direct-tools" | undefined;
  voiceSessionId?: string | undefined;
  voice?: string | undefined;
  vadThreshold?: number | undefined;
  silenceDurationMs?: number | undefined;
  prefixPaddingMs?: number | undefined;
  reasoningEffort?: string | undefined;
}>;
declare const validateTalkClientCreateResult: ProtocolValidator<{
  model?: string | undefined;
  voice?: string | undefined;
  offerUrl?: string | undefined;
  offerHeaders?: Record<string, string> | undefined;
  expiresAt?: number | undefined;
  provider: string;
  transport: "webrtc";
  voiceSessionId: string;
  clientSecret: string;
} | {
  model?: string | undefined;
  voice?: string | undefined;
  expiresAt?: number | undefined;
  initialMessage?: unknown;
  protocol: string;
  provider: string;
  audio: {
    inputEncoding: "pcm16" | "g711_ulaw";
    inputSampleRateHz: number;
    outputEncoding: "pcm16" | "g711_ulaw";
    outputSampleRateHz: number;
  };
  transport: "provider-websocket";
  voiceSessionId: string;
  clientSecret: string;
  websocketUrl: string;
} | {
  model?: string | undefined;
  voiceSessionId?: string | undefined;
  voice?: string | undefined;
  expiresAt?: number | undefined;
  provider: string;
  audio: {
    inputEncoding: "pcm16" | "g711_ulaw";
    inputSampleRateHz: number;
    outputEncoding: "pcm16" | "g711_ulaw";
    outputSampleRateHz: number;
  };
  transport: "gateway-relay";
  relaySessionId: string;
} | {
  token?: string | undefined;
  model?: string | undefined;
  voiceSessionId?: string | undefined;
  voice?: string | undefined;
  expiresAt?: number | undefined;
  provider: string;
  transport: "managed-room";
  roomUrl: string;
}>;
declare const validateTalkClientCloseParams: ProtocolValidator<{
  sessionKey: string;
  voiceSessionId: string;
}>;
declare const validateTalkClientMutationResult: ProtocolValidator<{
  ok: true;
}>;
declare const validateTalkClientToolCallParams: ProtocolValidator<{
  voiceSessionId?: string | undefined;
  relaySessionId?: string | undefined;
  args?: unknown;
  name: string;
  sessionKey: string;
  callId: string;
}>;
declare const validateTalkClientToolCallResult: ProtocolValidator<{
  runId: string;
  idempotencyKey: string;
}>;
declare const validateTalkClientTranscriptParams: ProtocolValidator<{
  timestamp?: number | undefined;
  role: "user" | "assistant";
  text: string;
  sessionKey: string;
  entryId: string;
  voiceSessionId: string;
}>;
declare const validateTalkClientSteerParams: ProtocolValidator<{
  mode?: "status" | "steer" | "cancel" | "followup" | undefined;
  text: string;
  sessionKey: string;
}>;
declare const validateTalkSessionCreateParams: ProtocolValidator<{
  mode?: "realtime" | "stt-tts" | "transcription" | undefined;
  model?: string | undefined;
  sessionKey?: string | undefined;
  spawnedBy?: string | undefined;
  provider?: string | undefined;
  transport?: "webrtc" | "provider-websocket" | "gateway-relay" | "managed-room" | undefined;
  brain?: "none" | "agent-consult" | "direct-tools" | undefined;
  voice?: string | undefined;
  vadThreshold?: number | undefined;
  silenceDurationMs?: number | undefined;
  prefixPaddingMs?: number | undefined;
  reasoningEffort?: string | undefined;
  language?: string | undefined;
  ttlMs?: number | undefined;
}>;
declare const validateTalkSessionJoinParams: ProtocolValidator<{
  token: string;
  sessionId: string;
}>;
declare const validateTalkSessionAppendAudioParams: ProtocolValidator<{
  timestamp?: number | undefined;
  sessionId: string;
  audioBase64: string;
}>;
declare const validateTalkSessionAcknowledgeMarkParams: ProtocolValidator<{
  sessionId: string;
  markName: string;
}>;
declare const validateTalkSessionTurnParams: ProtocolValidator<{
  turnId?: string | undefined;
  sessionId: string;
}>;
declare const validateTalkSessionCancelTurnParams: ProtocolValidator<{
  reason?: string | undefined;
  turnId?: string | undefined;
  sessionId: string;
}>;
declare const validateTalkSessionCancelOutputParams: ProtocolValidator<{
  reason?: string | undefined;
  turnId?: string | undefined;
  sessionId: string;
}>;
declare const validateTalkSessionSteerParams: ProtocolValidator<{
  mode?: "status" | "steer" | "cancel" | "followup" | undefined;
  sessionKey?: string | undefined;
  text: string;
  sessionId: string;
}>;
declare const validateTalkSessionSubmitToolResultParams: ProtocolValidator<{
  options?: {
    suppressResponse?: boolean | undefined;
    willContinue?: boolean | undefined;
  } | undefined;
  sessionId: string;
  result: unknown;
  callId: string;
}>;
declare const validateTalkSessionCloseParams: ProtocolValidator<{
  sessionId: string;
}>;
declare const validateTalkSpeakParams: ProtocolValidator<{
  language?: string | undefined;
  voiceId?: string | undefined;
  modelId?: string | undefined;
  outputFormat?: string | undefined;
  speed?: number | undefined;
  rateWpm?: number | undefined;
  stability?: number | undefined;
  similarity?: number | undefined;
  style?: number | undefined;
  speakerBoost?: boolean | undefined;
  seed?: number | undefined;
  normalize?: string | undefined;
  latencyTier?: number | undefined;
  text: string;
}>;
declare const validateTtsSpeakParams: ProtocolValidator<{
  text: string;
}>;
declare const validateChannelsStatusParams: ProtocolValidator<{
  probe?: boolean | undefined;
  channel?: string | undefined;
  timeoutMs?: number | undefined;
}>;
declare const validateChannelsPairingListParams: ProtocolValidator<{
  channel?: string | undefined;
  accountId?: string | undefined;
}>;
declare const validateChannelsPairingApproveParams: ProtocolValidator<{
  notify?: boolean | undefined;
  bootstrapCommandOwner?: boolean | undefined;
  channel: string;
  requestId: string;
  accountId: string;
}>;
declare const validateChannelsPairingDismissParams: ProtocolValidator<{
  channel: string;
  requestId: string;
  accountId: string;
}>;
declare const validateChannelsStartParams: ProtocolValidator<{
  accountId?: string | undefined;
  channel: string;
}>;
declare const validateChannelsStopParams: ProtocolValidator<{
  accountId?: string | undefined;
  channel: string;
}>;
declare const validateChannelsLogoutParams: ProtocolValidator<{
  accountId?: string | undefined;
  channel: string;
}>;
declare const validateModelsAuthLogoutParams: ProtocolValidator<{
  agentId?: string | undefined;
  profileIds?: string[] | undefined;
  provider: string;
}>;
declare const validateModelsAuthStatusParams: ProtocolValidator<{
  refresh?: boolean | undefined;
  agentId?: string | undefined;
}>;
declare const validateModelsListParams: ProtocolValidator<{
  includeProviderCapabilities?: boolean | undefined;
  view?: "default" | "configured" | "all" | "provider-config" | undefined;
}>;
declare const validateSkillsStatusParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateHooksStatusParams: ProtocolValidator<object>;
declare const validateToolsCatalogParams: ProtocolValidator<{
  agentId?: string | undefined;
  includePlugins?: boolean | undefined;
}>;
declare const validateToolsEffectiveParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey: string;
}>;
declare const validateToolsInvokeParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  idempotencyKey?: string | undefined;
  conversationReadOrigin?: "direct-operator" | undefined;
  confirm?: boolean | undefined;
  args?: Record<string, unknown> | undefined;
  name: string;
}>;
declare const validateSkillsBinsParams: ProtocolValidator<object>;
declare const validateSkillsInstallParams: ProtocolValidator<{
  agentId?: string | undefined;
  timeoutMs?: number | undefined;
  dangerouslyForceUnsafeInstall?: boolean | undefined;
  name: string;
  installId: string;
} | {
  version?: string | undefined;
  agentId?: string | undefined;
  force?: boolean | undefined;
  timeoutMs?: number | undefined;
  acknowledgeClawHubRisk?: boolean | undefined;
  source: "clawhub";
  slug: string;
} | {
  agentId?: string | undefined;
  force?: boolean | undefined;
  timeoutMs?: number | undefined;
  sha256?: string | undefined;
  source: "upload";
  slug: string;
  uploadId: string;
}>;
declare const validateSkillsUploadBeginParams: ProtocolValidator<{
  idempotencyKey?: string | undefined;
  force?: boolean | undefined;
  sha256?: string | undefined;
  kind: "skill-archive";
  sizeBytes: number;
  slug: string;
}>;
declare const validateSkillsUploadChunkParams: ProtocolValidator<{
  offset: number;
  uploadId: string;
  dataBase64: string;
}>;
declare const validateSkillsUploadCommitParams: ProtocolValidator<{
  sha256?: string | undefined;
  uploadId: string;
}>;
declare const validateSkillsUpdateParams: ProtocolValidator<{
  enabled?: boolean | undefined;
  apiKey?: string | undefined;
  env?: Record<string, string> | undefined;
  skillKey: string;
} | {
  agentId?: string | undefined;
  all?: boolean | undefined;
  slug?: string | undefined;
  acknowledgeClawHubRisk?: boolean | undefined;
  source: "clawhub";
}>;
declare const validateSkillsSearchParams: ProtocolValidator<{
  query?: string | undefined;
  limit?: number | undefined;
}>;
declare const validateSkillsDetailParams: ProtocolValidator<{
  slug: string;
}>;
declare const validateSkillsCuratorStatusParams: ProtocolValidator<object>;
declare const validateSkillsCuratorActionParams: ProtocolValidator<{
  skill: string;
}>;
declare const validateSkillsProposalsListParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateSkillsProposalInspectParams: ProtocolValidator<{
  agentId?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalCreateParams: ProtocolValidator<{
  agentId?: string | undefined;
  supportFiles?: {
    path: string;
    content: string;
  }[] | undefined;
  evidence?: string | undefined;
  goal?: string | undefined;
  name: string;
  description: string;
  content: string;
}>;
declare const validateSkillsProposalUpdateParams: ProtocolValidator<{
  agentId?: string | undefined;
  description?: string | undefined;
  supportFiles?: {
    path: string;
    content: string;
  }[] | undefined;
  evidence?: string | undefined;
  goal?: string | undefined;
  content: string;
  skillName: string;
}>;
declare const validateSkillsProposalReviseParams: ProtocolValidator<{
  agentId?: string | undefined;
  description?: string | undefined;
  content?: string | undefined;
  expectedRevisionHash?: string | undefined;
  correlationId?: string | undefined;
  supportFiles?: {
    path: string;
    content: string;
  }[] | undefined;
  evidence?: string | undefined;
  goal?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalRequestRevisionParams: ProtocolValidator<{
  agentId?: string | undefined;
  sessionId?: string | undefined;
  expectedRevisionHash?: string | undefined;
  targetAgentId?: string | undefined;
  sessionKey: string;
  idempotencyKey: string;
  proposalId: string;
  instructions: string;
}>;
declare const validateSkillsProposalActionParams: ProtocolValidator<{
  reason?: string | undefined;
  agentId?: string | undefined;
  expectedRevisionHash?: string | undefined;
  correlationId?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalEvaluateParams: ProtocolValidator<{
  agentId?: string | undefined;
  expectedRevisionHash?: string | undefined;
  correlationId?: string | undefined;
  proposalId: string;
}>;
declare const validateSkillsProposalEventsListParams: ProtocolValidator<{
  agentId?: string | undefined;
  limit?: number | undefined;
  proposalId?: string | undefined;
  afterSequence?: number | undefined;
}>;
declare const validateSkillsSecurityVerdictsParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateSkillsSkillCardParams: ProtocolValidator<{
  agentId?: string | undefined;
  skillKey: string;
}>;
declare const validateCronListParams: ProtocolValidator<{
  agentId?: string | undefined;
  enabled?: "disabled" | "enabled" | "all" | undefined;
  query?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  sortBy?: "name" | "updatedAtMs" | "nextRunAtMs" | undefined;
  compact?: boolean | undefined;
  lastRunStatus?: "ok" | "error" | "unknown" | "all" | "skipped" | undefined;
  includeDisabled?: boolean | undefined;
  scheduleKind?: "every" | "cron" | "stream" | "all" | "at" | "on-exit" | undefined;
  sortDir?: "asc" | "desc" | undefined;
  includeDeliveryPreviews?: boolean | undefined;
}>;
declare const validateCronStatusParams: ProtocolValidator<object>;
declare const validateCronGetParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronAddParams: ProtocolValidator<{
  displayName?: string | undefined;
  owner?: {
    agentId?: string | undefined;
    sessionKey?: string | undefined;
    accountId?: string | undefined;
  } | undefined;
  agentId?: string | null | undefined;
  enabled?: boolean | undefined;
  description?: string | undefined;
  sessionKey?: string | null | undefined;
  trigger?: {
    once?: boolean | undefined;
    script: string;
  } | undefined;
  declarationKey?: string | undefined;
  deleteAfterRun?: boolean | undefined;
  pacing?: {
    min?: string | undefined;
    max?: string | undefined;
  } | undefined;
  delivery?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    to?: string | undefined;
    bestEffort?: boolean | undefined;
    failureDestination?: {
      mode?: "announce" | "webhook" | undefined;
      channel?: string | undefined;
      accountId?: string | undefined;
      to?: string | undefined;
    } | undefined;
    mode: "none";
  } | {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    to?: string | undefined;
    bestEffort?: boolean | undefined;
    failureDestination?: {
      mode?: "announce" | "webhook" | undefined;
      channel?: string | undefined;
      accountId?: string | undefined;
      to?: string | undefined;
    } | undefined;
    completionDestination?: {
      mode: "webhook";
      to: string;
    } | undefined;
    mode: "announce";
  } | {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    bestEffort?: boolean | undefined;
    failureDestination?: {
      mode?: "announce" | "webhook" | undefined;
      channel?: string | undefined;
      accountId?: string | undefined;
      to?: string | undefined;
    } | undefined;
    mode: "webhook";
    to: string;
  } | undefined;
  failureAlert?: false | {
    mode?: "announce" | "webhook" | undefined;
    channel?: string | undefined;
    after?: number | undefined;
    accountId?: string | undefined;
    to?: string | undefined;
    cooldownMs?: number | undefined;
    includeSkipped?: boolean | undefined;
  } | undefined;
  name: string;
  payload: {
    toolsAllow?: string[] | undefined;
    toolsAllowIsDefault?: boolean | undefined;
    text: string;
    kind: "systemEvent";
  } | {
    model?: unknown;
    thinking?: unknown;
    fallbacks?: unknown;
    toolsAllow?: unknown;
    toolsAllowIsDefault?: boolean | undefined;
    timeoutSeconds?: number | undefined;
    allowUnsafeExternalContent?: boolean | undefined;
    lightContext?: boolean | undefined;
    kind: "agentTurn";
    message: unknown;
  } | {
    cwd?: string | undefined;
    env?: Record<string, string> | undefined;
    input?: string | undefined;
    toolsAllow?: unknown;
    toolsAllowIsDefault?: boolean | undefined;
    timeoutSeconds?: number | undefined;
    noOutputTimeoutSeconds?: number | undefined;
    outputMaxBytes?: number | undefined;
    kind: "command";
    argv: unknown;
  } | {
    toolsAllow?: unknown;
    toolsAllowIsDefault?: boolean | undefined;
    timeoutSeconds?: number | undefined;
    toolBudget?: number | undefined;
    kind: "script";
    script: unknown;
  };
  schedule: {
    kind: "at";
    at: string;
  } | {
    anchorMs?: number | undefined;
    kind: "every";
    everyMs: number;
  } | {
    tz?: string | undefined;
    staggerMs?: number | undefined;
    kind: "cron";
    expr: string;
  } | {
    cwd?: string | undefined;
    kind: "on-exit";
    command: string;
  } | {
    mode?: "line" | "match" | undefined;
    cwd?: string | undefined;
    match?: string | undefined;
    batchMs?: number | undefined;
    maxBatchBytes?: number | undefined;
    kind: "stream";
    command: string[];
  };
  sessionTarget: string;
  wakeMode: "now" | "next-heartbeat";
}>;
declare const validateCronUpdateParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronRemoveParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronRunParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronRunsParams: ProtocolValidator<{
  id?: string | undefined;
  agentId?: string | undefined;
  scope?: "all" | "job" | undefined;
  jobId?: string | undefined;
  status?: "ok" | "error" | "all" | "skipped" | undefined;
  runId?: string | undefined;
  query?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
  deliveryStatus?: "unknown" | "delivered" | "not-requested" | "not-delivered" | undefined;
  sortDir?: "asc" | "desc" | undefined;
  statuses?: ("ok" | "error" | "skipped")[] | undefined;
  deliveryStatuses?: ("unknown" | "delivered" | "not-requested" | "not-delivered")[] | undefined;
}>;
declare const validateCronScratchGetParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateCronScratchSetParams: ProtocolValidator<{
  id: string;
} | {
  jobId: string;
}>;
declare const validateDevicePairListParams: ProtocolValidator<object>;
declare const validateDevicePairApproveParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateDevicePairRejectParams: ProtocolValidator<{
  requestId: string;
}>;
declare const validateDevicePairRemoveParams: ProtocolValidator<{
  deviceId: string;
}>;
declare const validateDevicePairSetupCodeParams: ProtocolValidator<{
  publicUrl?: string | undefined;
  preferRemoteUrl?: boolean | undefined;
  includeQr?: boolean | undefined;
  bootstrapProfile?: string | undefined;
}>;
declare const validateDevicePairRenameParams: ProtocolValidator<{
  deviceId: string;
  label: string;
}>;
declare const validateDeviceTokenRotateParams: ProtocolValidator<{
  scopes?: string[] | undefined;
  role: string;
  deviceId: string;
}>;
declare const validateDeviceTokenRevokeParams: ProtocolValidator<{
  role: string;
  deviceId: string;
}>;
declare const validateApprovalPresentation: ProtocolValidator<{
  host?: string | null | undefined;
  agentId?: string | null | undefined;
  nodeId?: string | null | undefined;
  commandPreview?: string | null | undefined;
  warningText?: string | null | undefined;
  kind: "exec";
  commandText: string;
  allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
} | {
  detail?: string | undefined;
  agentId?: string | null | undefined;
  pluginId?: string | null | undefined;
  toolName?: string | null | undefined;
  kind: "plugin";
  description: string;
  title: string;
  severity: "info" | "warning" | "critical";
  allowedDecisions: ("deny" | "allow-once" | "allow-always")[];
} | {
  agentId?: string | null | undefined;
  kind: "system-agent";
  description: string;
  title: string;
  allowedDecisions: ["allow-once", "deny"];
  proposalHash: string;
}>;
declare const validateApprovalGetParams: ProtocolValidator<{
  id: string;
}>;
declare const validateApprovalHistoryParams: ProtocolValidator<{
  kind?: "plugin" | "system-agent" | "exec" | undefined;
  limit?: number | undefined;
  cursor?: string | undefined;
}>;
declare const validateApprovalResolveParams: ProtocolValidator<{
  id: string;
  kind: "plugin" | "system-agent" | "exec";
  decision: "deny" | "allow-once" | "allow-always";
}>;
declare const validateExecApprovalsGetParams: ProtocolValidator<object>;
declare const validateExecApprovalsSetParams: ProtocolValidator<{
  baseHash?: string | undefined;
  file: {
    agents?: Record<string, {
      security?: string | undefined;
      ask?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
      allowlist?: {
        id?: string | undefined;
        source?: "allow-always" | undefined;
        commandText?: string | undefined;
        argPattern?: string | undefined;
        lastUsedAt?: number | undefined;
        lastUsedCommand?: string | undefined;
        lastResolvedPath?: string | undefined;
        pattern: string;
      }[] | undefined;
    }> | undefined;
    defaults?: {
      security?: string | undefined;
      ask?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    } | undefined;
    socket?: {
      token?: string | undefined;
      path?: string | undefined;
    } | undefined;
    version: 1;
  };
}>;
declare const validateExecApprovalGetParams: ProtocolValidator<{
  id: string;
}>;
declare const validateExecApprovalRequestParams: ProtocolValidator<{
  id?: string | undefined;
  host?: string | null | undefined;
  agentId?: string | null | undefined;
  sessionKey?: string | null | undefined;
  toolCallId?: string | null | undefined;
  command?: string | undefined;
  runId?: string | null | undefined;
  timeoutMs?: number | undefined;
  sessionId?: string | null | undefined;
  cwd?: string | null | undefined;
  nodeId?: string | null | undefined;
  turnSourceChannel?: string | null | undefined;
  turnSourceTo?: string | null | undefined;
  turnSourceAccountId?: string | null | undefined;
  turnSourceThreadId?: string | number | null | undefined;
  env?: Record<string, string> | undefined;
  warningText?: string | null | undefined;
  security?: string | null | undefined;
  ask?: string | null | undefined;
  commandArgv?: string[] | undefined;
  systemRunPlan?: {
    commandPreview?: string | null | undefined;
    policySnapshot?: {
      security: "full" | "deny" | "allowlist";
      ask: "off" | "always" | "on-miss";
      askFallback: "full" | "deny" | "allowlist";
      autoAllowSkills: boolean;
      allowlistRules: {
        source?: "allow-always" | undefined;
        argPattern?: string | undefined;
        pattern: string;
      }[];
    } | undefined;
    mutableFileOperand?: {
      path: string;
      sha256: string;
      argvIndex: number;
    } | null | undefined;
    agentId: string | null;
    sessionKey: string | null;
    cwd: string | null;
    argv: string[];
    commandText: string;
  } | undefined;
  unavailableDecisions?: string[] | undefined;
  commandSpans?: {
    startIndex: number;
    endIndex: number;
  }[] | undefined;
  resolvedPath?: string | null | undefined;
  approvalReviewerDeviceIds?: string[] | undefined;
  requireDeliveryRoute?: boolean | undefined;
  suppressDelivery?: boolean | undefined;
  twoPhase?: boolean | undefined;
}>;
declare const validateExecApprovalResolveParams: ProtocolValidator<{
  id: string;
  decision: string;
}>;
declare const validateQuestionRequestParams: ProtocolValidator<{
  id?: string | undefined;
  agentId?: string | undefined;
  sessionKey?: string | undefined;
  runId?: string | undefined;
  timeoutMs?: number | undefined;
  questions: {
    isOther?: boolean | undefined;
    multiSelect?: boolean | undefined;
    isSecret?: boolean | undefined;
    question: string;
    options: {
      description?: string | undefined;
      label: string;
    }[];
    header: string;
    questionId: string;
  }[];
}>;
declare const validateQuestionWaitAnswerParams: ProtocolValidator<{
  timeoutMs?: number | undefined;
  id: string;
}>;
declare const validateQuestionResolveParams: ProtocolValidator<{
  resolvedBy?: string | undefined;
  id: string;
  answers: {
    answers: Record<string, string[]>;
  };
} | {
  resolvedBy?: string | undefined;
  id: string;
  cancel: true;
}>;
declare const validateQuestionGetParams: ProtocolValidator<{
  id: string;
}>;
declare const validateQuestionListParams: ProtocolValidator<object>;
declare const validatePluginApprovalRequestParams: ProtocolValidator<{
  detail?: string | undefined;
  agentId?: string | undefined;
  pluginId?: string | undefined;
  sessionKey?: string | undefined;
  toolName?: string | undefined;
  toolCallId?: string | undefined;
  timeoutMs?: number | undefined;
  turnSourceChannel?: string | undefined;
  turnSourceTo?: string | undefined;
  turnSourceAccountId?: string | undefined;
  turnSourceThreadId?: string | number | undefined;
  severity?: string | undefined;
  allowedDecisions?: string[] | undefined;
  approvalReviewerDeviceIds?: string[] | undefined;
  twoPhase?: boolean | undefined;
  description: string;
  title: string;
}>;
declare const validatePluginApprovalResolveParams: ProtocolValidator<{
  id: string;
  decision: string;
}>;
declare const validatePluginsListParams: ProtocolValidator<object>;
declare const validatePluginsRefreshParams: ProtocolValidator<object>;
declare const validatePluginsSearchParams: ProtocolValidator<{
  limit?: number | undefined;
  query: string;
}>;
declare const validatePluginsInstallParams: ProtocolValidator<{
  version?: string | undefined;
  acknowledgeClawHubRisk?: boolean | undefined;
  source: "clawhub";
  packageName: string;
} | {
  source: "official";
  pluginId: string;
}>;
declare const validatePluginsSetEnabledParams: ProtocolValidator<{
  enabled: boolean;
  pluginId: string;
}>;
declare const validatePluginsUninstallParams: ProtocolValidator<{
  pluginId: string;
}>;
declare const validatePluginsUiDescriptorsParams: ProtocolValidator<object>;
declare const validatePluginsUiDescriptorsResult: ProtocolValidator<{
  ok: true;
  descriptors: {
    description?: string | undefined;
    placement?: string | undefined;
    requiredScopes?: string[] | undefined;
    schema?: unknown;
    pluginName?: string | undefined;
    id: string;
    pluginId: string;
    label: string;
    surface: "widget" | "session" | "tool" | "run" | "settings" | "tab";
  }[];
}>;
declare const validatePluginsSessionActionParams: ProtocolValidator<{
  payload?: unknown;
  sessionKey?: string | undefined;
  pluginId: string;
  actionId: string;
}>;
declare const validatePluginsSessionActionResult: ProtocolValidator<{
  reply?: unknown;
  result?: unknown;
  continueAgent?: boolean | undefined;
  ok: true;
} | {
  code?: string | undefined;
  details?: unknown;
  ok: false;
  error: string;
}>;
declare const validateExecApprovalsNodeGetParams: ProtocolValidator<{
  nodeId: string;
}>;
declare const validateExecApprovalsNodeSetParams: ProtocolValidator<{
  file?: {
    agents?: Record<string, {
      security?: string | undefined;
      ask?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
      allowlist?: {
        id?: string | undefined;
        source?: "allow-always" | undefined;
        commandText?: string | undefined;
        argPattern?: string | undefined;
        lastUsedAt?: number | undefined;
        lastUsedCommand?: string | undefined;
        lastResolvedPath?: string | undefined;
        pattern: string;
      }[] | undefined;
    }> | undefined;
    defaults?: {
      security?: string | undefined;
      ask?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    } | undefined;
    socket?: {
      token?: string | undefined;
      path?: string | undefined;
    } | undefined;
    version: 1;
  } | undefined;
  baseHash?: string | undefined;
  native?: {
    defaultAction?: "prompt" | "allow" | "deny" | undefined;
    rules: {
      enabled?: boolean | undefined;
      description?: string | undefined;
      shells?: string[] | undefined;
      pattern: string;
      action: "prompt" | "allow" | "deny";
    }[];
  } | undefined;
  nodeId: string;
}>;
declare const validateExecApprovalsNodeSnapshot: ProtocolValidator<{
  enabled?: boolean | undefined;
  path?: string | undefined;
  message?: string | undefined;
  file?: {
    agents?: Record<string, {
      security?: string | undefined;
      ask?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
      allowlist?: {
        id?: string | undefined;
        source?: "allow-always" | undefined;
        commandText?: string | undefined;
        argPattern?: string | undefined;
        lastUsedAt?: number | undefined;
        lastUsedCommand?: string | undefined;
        lastResolvedPath?: string | undefined;
        pattern: string;
      }[] | undefined;
    }> | undefined;
    defaults?: {
      security?: string | undefined;
      ask?: string | undefined;
      askFallback?: string | undefined;
      autoAllowSkills?: boolean | undefined;
    } | undefined;
    socket?: {
      token?: string | undefined;
      path?: string | undefined;
    } | undefined;
    version: 1;
  } | undefined;
  hash?: string | undefined;
  baseHash?: string | undefined;
  exists?: boolean | undefined;
  resolvedDefaults?: {
    security: "full" | "deny" | "allowlist";
    ask: "off" | "always" | "on-miss";
    askFallback: "full" | "deny" | "allowlist";
    autoAllowSkills: boolean;
  } | undefined;
  defaultAction?: "prompt" | "allow" | "deny" | undefined;
  rules?: {
    enabled?: boolean | undefined;
    description?: string | undefined;
    shells?: string[] | undefined;
    pattern: string;
    action: "prompt" | "allow" | "deny";
  }[] | undefined;
  constraints?: {
    baseHashRequired?: boolean | undefined;
    defaultAllowAllowed?: boolean | undefined;
    broadAllowRulesAllowed?: boolean | undefined;
    dangerousAllowRulesAllowed?: boolean | undefined;
  } | undefined;
}>;
declare const validateLogsTailParams: ProtocolValidator<{
  maxBytes?: number | undefined;
  limit?: number | undefined;
  cursor?: number | undefined;
}>;
declare const validateModelsProbeParams: ProtocolValidator<{
  agentId?: string | undefined;
  profileId?: string | undefined;
  timeoutMs?: number | undefined;
  provider: string;
}>;
declare const validateChatHistoryParams: ProtocolValidator<{
  agentId?: string | undefined;
  messageId?: string | undefined;
  limit?: number | undefined;
  sessionId?: string | undefined;
  offset?: number | undefined;
  maxChars?: number | undefined;
  sessionKey: string;
}>;
declare const validateChatMetadataParams: ProtocolValidator<{
  agentId?: string | undefined;
}>;
declare const validateChatMessageGetParams: ProtocolValidator<{
  agentId?: string | undefined;
  maxChars?: number | undefined;
  sessionKey: string;
  messageId: string;
}>;
declare const validateChatToolTitlesParams: ProtocolValidator<{
  agentId?: string | undefined;
  items: {
    id: string;
    name: string;
    input: string;
  }[];
  sessionKey: string;
}>;
declare const validateChatSendParams: ProtocolValidator<{
  agentId?: string | undefined;
  attachments?: {
    type?: string | undefined;
    durationMs?: number | undefined;
    content?: unknown;
    mimeType?: string | undefined;
    sizeBytes?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
    fileName?: string | undefined;
  }[] | undefined;
  timeoutMs?: number | undefined;
  replyToId?: string | undefined;
  sessionId?: string | undefined;
  thinking?: string | undefined;
  deliver?: boolean | undefined;
  fastMode?: boolean | "auto" | undefined;
  fastAutoOnSeconds?: number | undefined;
  queueMode?: string | undefined;
  originatingChannel?: string | undefined;
  originatingTo?: string | undefined;
  originatingAccountId?: string | undefined;
  originatingThreadId?: string | undefined;
  toolBindings?: Record<string, unknown> | undefined;
  systemInputProvenance?: {
    sourceSessionKey?: string | undefined;
    originSessionId?: string | undefined;
    sourceChannel?: string | undefined;
    sourceTool?: string | undefined;
    kind: string;
  } | undefined;
  systemProvenanceReceipt?: string | undefined;
  suppressCommandInterpretation?: boolean | undefined;
  expectedLeafEntryId?: string | null | undefined;
  expectedSessionRoutingContract?: string | undefined;
  message: string;
  sessionKey: string;
  idempotencyKey: string;
}>;
declare const validateChatAbortParams: ProtocolValidator<{
  agentId?: string | undefined;
  runId?: string | undefined;
  preserveSideRuns?: boolean | undefined;
  sessionKey: string;
}>;
declare const validateChatInjectParams: ProtocolValidator<{
  agentId?: string | undefined;
  label?: string | undefined;
  message: string;
  sessionKey: string;
}>;
declare const validateUpdateStatusParams: ProtocolValidator<object>;
declare const validateUpdateRunParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  timeoutMs?: number | undefined;
  deliveryContext?: {
    channel?: string | undefined;
    accountId?: string | undefined;
    threadId?: string | number | undefined;
    to?: string | undefined;
  } | undefined;
  note?: string | undefined;
  restartDelayMs?: number | undefined;
  continuationMessage?: string | undefined;
}>;
declare const validateUiCommandParams: ProtocolValidator<{
  sessionKey?: string | undefined;
  command: {
    kind: "split";
    sessionKey: string;
    direction: "right" | "down";
  } | {
    kind: "close-pane";
    sessionKey: string;
  } | {
    kind: "focus";
    sessionKey: string;
  } | {
    kind: "sidebar";
    visible: boolean;
  } | {
    dock?: "right" | "bottom" | undefined;
    terminalSessionId?: string | undefined;
    kind: "panel";
    panel: "terminal" | "browser";
    open: boolean;
  } | {
    kind: "navigate";
    sessionKey: string;
  };
}>;
declare const validateWebLoginStartParams: ProtocolValidator<{
  force?: boolean | undefined;
  accountId?: string | undefined;
  timeoutMs?: number | undefined;
  verbose?: boolean | undefined;
}>;
declare const validateWebLoginWaitParams: ProtocolValidator<{
  accountId?: string | undefined;
  timeoutMs?: number | undefined;
  currentQrDataUrl?: string | undefined;
}>;
//#endregion
//#region packages/gateway-protocol/src/index.d.ts
type SessionsPatchResult = {
  ok: true;
  path: string;
  key: string;
  entry: Record<string, unknown>;
  resolved?: {
    modelProvider?: string;
    model?: string;
    agentRuntime?: GatewayAgentRuntime;
    thinkingLevel?: string;
    thinkingLevels?: Array<{
      id: string;
      label: string;
    }>;
  };
};
//#endregion
export { type AgentEvent, AgentEventSchema, type AgentIdentityParams, AgentIdentityParamsSchema, type AgentIdentityResult, AgentIdentityResultSchema, type AgentKind, AgentKindSchema, AgentParamsSchema, type AgentSummary, AgentSummarySchema, type AgentWaitParams, type AgentWaitParamsSchema, type AgentsCreateParams, AgentsCreateParamsSchema, type AgentsCreateResult, AgentsCreateResultSchema, type AgentsDeleteParams, AgentsDeleteParamsSchema, type AgentsDeleteResult, AgentsDeleteResultSchema, type AgentsFileEntry, AgentsFileEntrySchema, type AgentsFilesGetParams, AgentsFilesGetParamsSchema, type AgentsFilesGetResult, AgentsFilesGetResultSchema, type AgentsFilesListParams, AgentsFilesListParamsSchema, type AgentsFilesListResult, AgentsFilesListResultSchema, type AgentsFilesSetParams, AgentsFilesSetParamsSchema, type AgentsFilesSetResult, AgentsFilesSetResultSchema, type AgentsListParams, AgentsListParamsSchema, type AgentsListResult, AgentsListResultSchema, type AgentsUpdateParams, AgentsUpdateParamsSchema, type AgentsUpdateResult, AgentsUpdateResultSchema, type AgentsWorkspaceEntry, AgentsWorkspaceEntrySchema, type AgentsWorkspaceFile, AgentsWorkspaceFileSchema, type AgentsWorkspaceGetParams, AgentsWorkspaceGetParamsSchema, type AgentsWorkspaceGetResult, AgentsWorkspaceGetResultSchema, type AgentsWorkspaceListParams, AgentsWorkspaceListParamsSchema, type AgentsWorkspaceListResult, AgentsWorkspaceListResultSchema, type AllowedApprovalSnapshot, AllowedApprovalSnapshotSchema, type ApprovalAllowDecision, ApprovalAllowDecisionSchema, type ApprovalAllowedReasonSchema, type ApprovalCancelledReasonSchema, type ApprovalDecision, ApprovalDecisionSchema, type ApprovalDeniedReasonSchema, type ApprovalExpiredReasonSchema, type ApprovalGetParams, ApprovalGetParamsSchema, type ApprovalGetResult, ApprovalGetResultSchema, type ApprovalHistoryParams, ApprovalHistoryParamsSchema, type ApprovalHistoryResult, ApprovalHistoryResultSchema, type ApprovalKind, ApprovalKindSchema, type ApprovalPresentation, ApprovalPresentationSchema, type ApprovalResolveParams, ApprovalResolveParamsSchema, type ApprovalResolveResult, ApprovalResolveResultSchema, type ApprovalSnapshot, ApprovalSnapshotSchema, type ApprovalTerminalReason, ApprovalTerminalReasonSchema, type ArtifactSummary, ArtifactSummarySchema, type ArtifactsDownloadParams, ArtifactsDownloadParamsSchema, type ArtifactsDownloadResult, type ArtifactsDownloadResultSchema, type ArtifactsGetParams, ArtifactsGetParamsSchema, type ArtifactsGetResult, type ArtifactsGetResultSchema, type ArtifactsListParams, ArtifactsListParamsSchema, type ArtifactsListResult, type ArtifactsListResultSchema, type AuditActivityAgentRunV1, AuditActivityAgentRunV1Schema, type AuditActivityEventV1, AuditActivityEventV1Schema, type AuditActivityInboundMessageV1, AuditActivityInboundMessageV1Schema, type AuditActivityListParams, AuditActivityListParamsSchema, type AuditActivityListResult, AuditActivityListResultSchema, type AuditActivityOutboundMessageV1, AuditActivityOutboundMessageV1Schema, type AuditActivityToolActionV1, AuditActivityToolActionV1Schema, type AuditEvent, AuditEventSchema, type AuditListParams, AuditListParamsSchema, type AuditListResult, AuditListResultSchema, type AuthProbeStatus, AuthProbeStatusSchema, BOARD_CRON_JOB_ID_MAX_LENGTH, BOARD_CRON_TRIGGER_PREFIX, BOARD_DATA_BINDING_ID_MAX_LENGTH, BOARD_WIDGET_TOOL_MAX_LENGTH, BoardActionParams, BoardActionParamsSchema, BoardCanvasDocumentSource, BoardCanvasDocumentSourceSchema, BoardChangedEvent, BoardChangedEventSchema, BoardChatDockSchema, BoardCommand, BoardCommandEvent, BoardCommandEventSchema, BoardCommandSchema, BoardCronActionParamsSchema, BoardDataReadParams, BoardDataReadParamsSchema, BoardEventParams, BoardEventParamsSchema, BoardFocusTabCommandSchema, BoardGetParams, BoardGetParamsSchema, BoardLegacyEventParamsSchema, BoardMcpAppDescriptor, BoardMcpAppDescriptorSchema, BoardOp, BoardOpSchema, BoardPluginActionParamsSchema, BoardPromptAuthorizeParams, BoardPromptAuthorizeParamsSchema, BoardSetChatDockCommandSchema, BoardSizeSchema, BoardSnapshot, BoardSnapshotSchema, BoardTab, BoardTabCreateOpSchema, BoardTabDeleteOpSchema, BoardTabIdSchema, BoardTabSchema, BoardTabUpdateOpSchema, BoardTabsReorderOpSchema, BoardTicketEventParamsSchema, BoardUpdateParams, BoardUpdateParamsSchema, BoardViewTicketSchema, BoardWidget, BoardWidgetAppViewParams, BoardWidgetAppViewParamsSchema, BoardWidgetAppViewResult, BoardWidgetAppViewResultSchema, BoardWidgetContent, BoardWidgetContentSchema, BoardWidgetDeclared, BoardWidgetDeclaredSchema, BoardWidgetGeneratedIdentity, BoardWidgetGeneratedIdentitySchema, BoardWidgetGrantParams, BoardWidgetGrantParamsSchema, BoardWidgetHeightModeSchema, BoardWidgetHtmlContentSchema, BoardWidgetMaterializedContent, BoardWidgetMaterializedPutParams, BoardWidgetMcpAppContentSchema, BoardWidgetMcpAppPutContentSchema, BoardWidgetMoveOpSchema, BoardWidgetNameSchema, BoardWidgetPluginContentSchema, BoardWidgetPluginKindSchema, BoardWidgetPluginPropsSchema, BoardWidgetPresentationSchema, BoardWidgetPutContent, BoardWidgetPutContentSchema, BoardWidgetPutParams, BoardWidgetPutParamsSchema, BoardWidgetPutResult, BoardWidgetPutResultSchema, BoardWidgetRemoveOpSchema, BoardWidgetResizeOpSchema, BoardWidgetSchema, type CHAT_SEND_SESSION_KEY_MAX_LENGTH, type COMMAND_ALIAS_MAX_ITEMS, type COMMAND_ARGS_MAX_ITEMS, type COMMAND_ARG_CHOICES_MAX_ITEMS, type COMMAND_ARG_DESCRIPTION_MAX_LENGTH, type COMMAND_ARG_NAME_MAX_LENGTH, type COMMAND_CHOICE_LABEL_MAX_LENGTH, type COMMAND_CHOICE_VALUE_MAX_LENGTH, type COMMAND_DESCRIPTION_MAX_LENGTH, type COMMAND_LIST_MAX_ITEMS, type COMMAND_NAME_MAX_LENGTH, type CancelledApprovalSnapshot, CancelledApprovalSnapshotSchema, type ChannelsLogoutParams, ChannelsLogoutParamsSchema, type ChannelsPairingAccount, type ChannelsPairingApproveParams, ChannelsPairingApproveParamsSchema, type ChannelsPairingApproveResult, ChannelsPairingApproveResultSchema, type ChannelsPairingDismissParams, ChannelsPairingDismissParamsSchema, type ChannelsPairingDismissResult, ChannelsPairingDismissResultSchema, type ChannelsPairingListParams, ChannelsPairingListParamsSchema, type ChannelsPairingListResult, ChannelsPairingListResultSchema, type ChannelsPairingRequest, type ChannelsStartParams, ChannelsStartParamsSchema, type ChannelsStatusParams, ChannelsStatusParamsSchema, type ChannelsStatusResult, ChannelsStatusResultSchema, type ChannelsStopParams, ChannelsStopParamsSchema, type ChatAbortParams, type ChatAbortParamsSchema, type ChatAbortedEventSchema, type ChatAttachmentSchema, type ChatAttachmentsSchema, type ChatDeltaEventSchema, type ChatErrorEventSchema, type ChatEvent, ChatEventSchema, type ChatFinalEventSchema, ChatHistoryParamsSchema, type ChatInjectParams, ChatInjectParamsSchema, type ChatMessageGetParamsSchema, type ChatMessageGetResult, type ChatMessageGetResultSchema, type ChatMetadataParams, ChatMetadataParamsSchema, type ChatRunStartupPhase, ChatRunStartupPhaseSchema, ChatSendParamsSchema, type ChatSendSessionKeyString, type ChatStatusEvent, ChatStatusEventSchema, type ChatToolTitlesParams, ChatToolTitlesParamsSchema, type ChatToolTitlesResult, ChatToolTitlesResultSchema, ClawHubTrustErrorCodes, ClawHubTrustErrorDetails, type CommandEntry, type CommandEntrySchema, type CommandsListParams, CommandsListParamsSchema, type CommandsListResult, CommandsListResultSchema, type ConfigApplyParams, ConfigApplyParamsSchema, type ConfigGetParams, ConfigGetParamsSchema, type ConfigPatchParams, ConfigPatchParamsSchema, type ConfigSchemaLookupParams, ConfigSchemaLookupParamsSchema, type ConfigSchemaLookupResult, ConfigSchemaLookupResultSchema, type ConfigSchemaParams, ConfigSchemaParamsSchema, type ConfigSchemaResponse, ConfigSchemaResponseSchema, type ConfigSetParams, ConfigSetParamsSchema, type ConnectParams, ConnectParamsSchema, type ConversationListItem, ConversationListItemSchema, type ConversationListParams, ConversationListParamsSchema, type ConversationListResult, ConversationListResultSchema, type ConversationSendParams, ConversationSendParamsSchema, type ConversationSendResult, ConversationSendResultSchema, type ConversationTurnCancelParams, ConversationTurnCancelParamsSchema, type ConversationTurnCancelResult, ConversationTurnCancelResultSchema, type ConversationTurnParams, ConversationTurnParamsSchema, type ConversationTurnReply, ConversationTurnReplySchema, type ConversationTurnResult, ConversationTurnResultSchema, type CronAddParams, CronAddParamsSchema, type CronAddResult, CronAddResultSchema, type CronDeclarativeAddResult, CronDeclarativeAddResultSchema, type CronDeliverySchema, type CronGetParams, CronGetParamsSchema, type CronJob, CronJobSchema, type CronJobStateSchema, type CronListParams, CronListParamsSchema, type CronPacingSchema, type CronRemoveParams, CronRemoveParamsSchema, type CronRunLogEntry, type CronRunLogEntrySchema, type CronRunParams, CronRunParamsSchema, type CronRunsParams, CronRunsParamsSchema, type CronScratchGetParams, CronScratchGetParamsSchema, type CronScratchGetResult, CronScratchGetResultSchema, type CronScratchSchema, type CronScratchSetParams, CronScratchSetParamsSchema, type CronScratchSetResult, CronScratchSetResultSchema, type CronStatusParams, CronStatusParamsSchema, type CronUpdateParams, CronUpdateParamsSchema, type DeniedApprovalSnapshot, DeniedApprovalSnapshotSchema, type DevicePairApproveParams, type DevicePairApproveParamsSchema, type DevicePairListParams, type DevicePairListParamsSchema, type DevicePairRejectParams, type DevicePairRejectParamsSchema, type DevicePairRemoveParams, type DevicePairRemoveParamsSchema, type DevicePairRenameParams, type DevicePairRenameParamsSchema, type DevicePairRequestedEventSchema, type DevicePairResolvedEventSchema, type DevicePairSetupCodeParams, type DevicePairSetupCodeParamsSchema, type DevicePairSetupCodeResult, type DevicePairSetupCodeResultSchema, type DeviceTokenRevokeParams, type DeviceTokenRevokeParamsSchema, type DeviceTokenRotateParams, type DeviceTokenRotateParamsSchema, type EnvironmentStatus, EnvironmentStatusSchema, type EnvironmentSummary, EnvironmentSummarySchema, type EnvironmentsCreateParams, EnvironmentsCreateParamsSchema, type EnvironmentsCreateResult, EnvironmentsCreateResultSchema, type EnvironmentsDestroyParams, EnvironmentsDestroyParamsSchema, type EnvironmentsDestroyResult, EnvironmentsDestroyResultSchema, type EnvironmentsListParams, EnvironmentsListParamsSchema, type EnvironmentsListResult, EnvironmentsListResultSchema, type EnvironmentsStatusParams, EnvironmentsStatusParamsSchema, type EnvironmentsStatusResult, EnvironmentsStatusResultSchema, type ErrorCode, ErrorCodes, type ErrorShape, ErrorShapeSchema, type EventFrame, EventFrameSchema, type ExecApprovalGetParams, ExecApprovalGetParamsSchema, type ExecApprovalPresentation, ExecApprovalPresentationSchema, type ExecApprovalRequestParams, ExecApprovalRequestParamsSchema, type ExecApprovalResolveParams, ExecApprovalResolveParamsSchema, type ExecApprovalsGetParams, ExecApprovalsGetParamsSchema, type ExecApprovalsNodeGetParams, type ExecApprovalsNodeGetParamsSchema, type ExecApprovalsNodeSetParams, type ExecApprovalsNodeSetParamsSchema, type ExecApprovalsNodeSnapshot, type ExecApprovalsNodeSnapshotSchema, type ExecApprovalsSetParams, ExecApprovalsSetParamsSchema, type ExecApprovalsSnapshot, type ExecApprovalsSnapshotSchema, type ExpiredApprovalSnapshot, ExpiredApprovalSnapshotSchema, type FsDirEntry, FsDirEntrySchema, type FsListDirParams, FsListDirParamsSchema, type FsListDirResult, FsListDirResultSchema, GATEWAY_SERVER_CAPS, type GatewayAgentRuntime, type GatewayClientIdSchema, type GatewayClientModeSchema, GatewayErrorDetailCodes, type GatewayErrorDetails, GatewayErrorDetailsSchema, type GatewayFrame, GatewayFrameSchema, type GatewaySuspendBlocker, GatewaySuspendBlockerSchema, GatewaySuspendPrepareBusyResultSchema, type GatewaySuspendPrepareParams, GatewaySuspendPrepareParamsSchema, GatewaySuspendPrepareReadyResultSchema, type GatewaySuspendPrepareResult, GatewaySuspendPrepareResultSchema, type GatewaySuspendResumeParams, GatewaySuspendResumeParamsSchema, type GatewaySuspendResumeResult, GatewaySuspendResumeResultSchema, type GatewaySuspendStatusParams, GatewaySuspendStatusParamsSchema, GatewaySuspendStatusReadyResultSchema, type GatewaySuspendStatusResult, GatewaySuspendStatusResultSchema, GatewaySuspendStatusRunningResultSchema, type GatewaySuspendTaskBlocker, GatewaySuspendTaskBlockerSchema, type HelloOk, HelloOkSchema, type HooksStatusParams, HooksStatusParamsSchema, type InputProvenanceSchema, type LogsTailParams, LogsTailParamsSchema, type LogsTailResult, LogsTailResultSchema, MAX_MEMORY_MIGRATION_ITEMS, MIN_CLIENT_PROTOCOL_VERSION, MIN_NODE_PROTOCOL_VERSION, MIN_PROBE_PROTOCOL_VERSION, type McpAppViewExpiredErrorDetails, type McpAppViewExpiredErrorDetailsSchema, MemoryMigrationItem, MemoryMigrationProviderPlan, type MessageActionParams, MessageActionParamsSchema, MigrationProtocolSchemas, MigrationsMemoryApplyParamsSchema, MigrationsMemoryApplyResult, MigrationsMemoryPlanParamsSchema, MigrationsMemoryPlanResult, type MissingScopeErrorDetails, MissingScopeErrorDetailsSchema, type ModelChoice, type ModelChoiceSchema, type ModelsAuthLogoutParams, ModelsAuthLogoutParamsSchema, type ModelsAuthStatusParams, ModelsAuthStatusParamsSchema, type ModelsListParams, ModelsListParamsSchema, type ModelsListResult, type ModelsListResultSchema, type ModelsProbeParams, ModelsProbeParamsSchema, type ModelsProbeResult, ModelsProbeResultSchema, type ModelsProbeTargetResult, ModelsProbeTargetResultSchema, type NodeDescribeParams, type NodeDescribeParamsSchema, type NodeEventParams, type NodeEventParamsSchema, type NodeEventResult, NodeEventResultSchema, type NodeInvokeInputEvent, NodeInvokeInputEventSchema, type NodeInvokeParams, NodeInvokeParamsSchema, type NodeInvokeProgressParams, NodeInvokeProgressParamsSchema, type NodeInvokeRequestEventSchema, type NodeInvokeResultParams, type NodeInvokeResultParamsSchema, type NodeListParams, NodeListParamsSchema, type NodePairApproveParams, NodePairApproveParamsSchema, type NodePairListParams, NodePairListParamsSchema, type NodePairRejectParams, NodePairRejectParamsSchema, type NodePairRemoveParams, NodePairRemoveParamsSchema, type NodePendingAckParams, NodePendingAckParamsSchema, type NodePendingDrainParams, NodePendingDrainParamsSchema, type NodePendingDrainResult, NodePendingDrainResultSchema, type NodePendingEnqueueParams, NodePendingEnqueueParamsSchema, type NodePendingEnqueueResult, NodePendingEnqueueResultSchema, type NodePluginToolDescriptor, NodePluginToolDescriptorSchema, type NodePluginToolsUpdateParams, NodePluginToolsUpdateParamsSchema, type NodePresenceActivityPayload, NodePresenceActivityPayloadSchema, type NodePresenceAlivePayload, NodePresenceAlivePayloadSchema, type NodePresenceAliveReason, NodePresenceAliveReasonSchema, type NodeRenameParams, type NodeRenameParamsSchema, type NodeSkillDescriptor, NodeSkillDescriptorSchema, type NodeSkillsUpdateParams, NodeSkillsUpdateParamsSchema, type NonEmptyString, PROTOCOL_VERSION, type PendingApprovalSnapshot, PendingApprovalSnapshotSchema, type PendingSessionApprovalEventSchema, type PluginApprovalPresentation, PluginApprovalPresentationSchema, type PluginApprovalRequestParams, type PluginApprovalRequestParamsSchema, type PluginApprovalResolveParams, type PluginApprovalResolveParamsSchema, type PluginApprovalSeverity, PluginApprovalSeveritySchema, type PluginCatalogClawHubInstallSchema, type PluginCatalogEntry, PluginCatalogEntrySchema, PluginCatalogInstallActionSchema, type PluginCatalogOfficialInstallSchema, type PluginControlUiDescriptor, type PluginControlUiDescriptorSchema, type PluginJsonValueSchema, PluginSearchPackageSchema, PluginSearchResultEntrySchema, type PluginsInstallParams, PluginsInstallParamsSchema, type PluginsInstallResult, PluginsInstallResultSchema, type PluginsListParams, PluginsListParamsSchema, type PluginsListResult, PluginsListResultSchema, type PluginsRefreshParams, PluginsRefreshParamsSchema, type PluginsRefreshResult, PluginsRefreshResultSchema, type PluginsSearchParams, PluginsSearchParamsSchema, type PluginsSearchResult, PluginsSearchResultSchema, type PluginsSessionActionFailureResultSchema, type PluginsSessionActionParams, PluginsSessionActionParamsSchema, type PluginsSessionActionResult, PluginsSessionActionResultSchema, type PluginsSessionActionSuccessResultSchema, type PluginsSetEnabledParams, PluginsSetEnabledParamsSchema, type PluginsSetEnabledResult, PluginsSetEnabledResultSchema, type PluginsUiDescriptorsParams, PluginsUiDescriptorsParamsSchema, type PluginsUiDescriptorsResult, PluginsUiDescriptorsResultSchema, type PluginsUninstallParams, PluginsUninstallParamsSchema, type PluginsUninstallResult, PluginsUninstallResultSchema, type PollParams, PollParamsSchema, type PresenceEntry, PresenceEntrySchema, type ProtocolValidator, type PushTestParams, PushTestParamsSchema, type PushTestResult, PushTestResultSchema, type Question, type QuestionAnswers, QuestionAnswersSchema, type QuestionGetParams, QuestionGetParamsSchema, type QuestionGetResult, QuestionGetResultSchema, type QuestionListParams, QuestionListParamsSchema, type QuestionListResult, QuestionListResultSchema, type QuestionOption, QuestionOptionSchema, type QuestionRecord, QuestionRecordSchema, type QuestionRequestParams, QuestionRequestParamsSchema, type QuestionRequestQuestion, QuestionRequestQuestionSchema, type QuestionRequestResult, QuestionRequestResultSchema, type QuestionRequestedEvent, QuestionRequestedEventSchema, type QuestionResolveParams, QuestionResolveParamsSchema, type QuestionResolveResult, QuestionResolveResultSchema, type QuestionResolvedEvent, QuestionResolvedEventSchema, QuestionSchema, type QuestionStatus, QuestionStatusSchema, type QuestionWaitAnswerParams, QuestionWaitAnswerParamsSchema, type QuestionWaitAnswerResult, QuestionWaitAnswerResultSchema, type RequestFrame, RequestFrameSchema, type ResponseFrame, ResponseFrameSchema, SESSION_AGENT_ATTENTION_ICON_IDS, SESSION_OBSERVER_HEALTH_VALUES, type SESSION_VIEWER_PRESENCE_MAX_KEYS, type SESSION_VISIBILITY_VALUES, type SYSTEM_PRESENCE_CLEAR_LAST_INPUT_TAG, type SYSTEM_PRESENCE_LEGACY_CLEAR_LAST_INPUT_SECONDS, type SecretInputSchema, type SecretRefSchema, type SecretsReloadParamsSchema, type SecretsResolveAssignmentSchema, type SecretsResolveParams, type SecretsResolveParamsSchema, type SecretsResolveResult, type SecretsResolveResultSchema, SendParamsSchema, SessionAgentAttentionIconId, SessionAgentStatus, type SessionApprovalEvent, SessionApprovalEventSchema, type SessionApprovalReplay, SessionApprovalReplaySchema, type SessionBranch, SessionBranchSchema, type SessionCatalog, type SessionCatalogCapabilities, SessionCatalogCapabilitiesSchema, type SessionCatalogDescriptor, SessionCatalogDescriptorSchema, type SessionCatalogHost, SessionCatalogHostSchema, type SessionCatalogLocator, SessionCatalogLocatorSchema, type SessionCatalogPullRequestSummary, SessionCatalogPullRequestSummarySchema, SessionCatalogSchema, type SessionCatalogSession, SessionCatalogSessionSchema, type SessionCatalogTranscriptItem, SessionCatalogTranscriptItemSchema, type SessionCompactionCheckpoint, type SessionCompactionCheckpointSchema, type SessionCompanionExchange, SessionCompanionExchangeSchema, type SessionCreatedActor, SessionCreatedActorSchema, type SessionDiffFile, SessionDiffFileSchema, type SessionDiffFileStatus, SessionDiffFileStatusSchema, type SessionDiscussionInfo, type SessionDiscussionInfoParams, SessionDiscussionInfoParamsSchema, type SessionDiscussionInfoResult, SessionDiscussionInfoResultSchema, SessionDiscussionInfoSchema, type SessionDiscussionOpenParams, SessionDiscussionOpenParamsSchema, type SessionDiscussionOpenResult, SessionDiscussionOpenResultSchema, type SessionDiscussionState, SessionDiscussionStateSchema, type SessionFileBrowserEntry, SessionFileBrowserEntrySchema, type SessionFileBrowserResult, SessionFileBrowserResultSchema, type SessionFileContentEncoding, SessionFileContentEncodingSchema, type SessionFileEntry, SessionFileEntrySchema, type SessionFileKind, SessionFileKindSchema, type SessionFilePreviewKind, SessionFilePreviewKindSchema, type SessionFileRelevance, SessionFileRelevanceSchema, type SessionGroup, SessionGroupSchema, SessionIcon, SessionIconNormalizationResult, type SessionLabelString, type SessionMember, type SessionMemberAddParams, SessionMemberAddParamsSchema, type SessionMemberMutationResult, SessionMemberMutationResultSchema, type SessionMemberRemoveParams, SessionMemberRemoveParamsSchema, SessionMemberSchema, type SessionMembersListParams, SessionMembersListParamsSchema, type SessionMembersListResult, SessionMembersListResultSchema, type SessionObserverDigest, SessionObserverDigestSchema, type SessionObserverHealth, SessionObserverHealthSchema, type SessionObserverPlanProgress, SessionObserverPlanProgressSchema, type SessionOperationEvent, type SessionOperationEventSchema, type SessionPlacement, type SessionPlacementProtocolSchemas, SessionPlacementSchema, type SessionPlacementState, SessionPlacementStateSchema, type SessionRow, SessionRowSchema, type SessionSharingAction, SessionSharingActionSchema, type SessionSharingEvent, SessionSharingEventSchema, type SessionSharingIdentity, SessionSharingIdentitySchema, type SessionSharingRole, SessionSharingRoleSchema, SessionSuggestion, SessionSuggestionAction, SessionSuggestionActionSchema, SessionSuggestionEvent, SessionSuggestionEventSchema, SessionSuggestionResolution, SessionSuggestionResolutionSchema, SessionSuggestionSchema, SessionSuggestionState, SessionSuggestionStateSchema, SessionSuggestionsAddParams, SessionSuggestionsAddParamsSchema, SessionSuggestionsAddResult, SessionSuggestionsAddResultSchema, SessionSuggestionsListParams, SessionSuggestionsListParamsSchema, SessionSuggestionsListResult, SessionSuggestionsListResultSchema, SessionSuggestionsResolveParams, SessionSuggestionsResolveParamsSchema, SessionSuggestionsResolveResult, SessionSuggestionsResolveResultSchema, type SessionToolOverrides, SessionToolOverridesSchema, SessionTypingEvent, SessionTypingEventSchema, SessionTypingParams, SessionTypingParamsSchema, SessionTypingResult, SessionTypingResultSchema, type SessionVisibility, SessionVisibilitySchema, type SessionVisibilitySetParams, SessionVisibilitySetParamsSchema, type SessionVisibilitySetResult, SessionVisibilitySetResultSchema, type SessionWorktreeInfo, SessionWorktreeInfoSchema, type SessionsAbortParams, SessionsAbortParamsSchema, type SessionsBranchesListParams, SessionsBranchesListParamsSchema, type SessionsBranchesListResult, SessionsBranchesListResultSchema, type SessionsBranchesSwitchParams, SessionsBranchesSwitchParamsSchema, type SessionsBranchesSwitchResult, SessionsBranchesSwitchResultSchema, type SessionsCatalogArchiveParams, SessionsCatalogArchiveParamsSchema, type SessionsCatalogArchiveResult, SessionsCatalogArchiveResultSchema, type SessionsCatalogContinueParams, SessionsCatalogContinueParamsSchema, type SessionsCatalogContinueResult, SessionsCatalogContinueResultSchema, type SessionsCatalogHostEvent, SessionsCatalogHostEventSchema, type SessionsCatalogListParams, SessionsCatalogListParamsSchema, type SessionsCatalogListResult, SessionsCatalogListResultSchema, type SessionsCatalogReadParams, SessionsCatalogReadParamsSchema, type SessionsCatalogReadResult, SessionsCatalogReadResultSchema, type SessionsCleanupParams, SessionsCleanupParamsSchema, type SessionsCompactParams, SessionsCompactParamsSchema, type SessionsCompactionBranchParams, SessionsCompactionBranchParamsSchema, type SessionsCompactionBranchResult, type SessionsCompactionBranchResultSchema, type SessionsCompactionGetParams, SessionsCompactionGetParamsSchema, type SessionsCompactionGetResult, type SessionsCompactionGetResultSchema, type SessionsCompactionListParams, SessionsCompactionListParamsSchema, type SessionsCompactionListResult, type SessionsCompactionListResultSchema, type SessionsCompactionRestoreParams, SessionsCompactionRestoreParamsSchema, type SessionsCompactionRestoreResult, type SessionsCompactionRestoreResultSchema, type SessionsCompanionAskParams, SessionsCompanionAskParamsSchema, type SessionsCompanionAskResult, SessionsCompanionAskResultSchema, type SessionsCompanionResetParams, SessionsCompanionResetParamsSchema, type SessionsCompanionResetResult, SessionsCompanionResetResultSchema, type SessionsCompanionStateParams, SessionsCompanionStateParamsSchema, type SessionsCompanionStateResult, SessionsCompanionStateResultSchema, type SessionsCreateParams, SessionsCreateParamsSchema, type SessionsCreateResult, SessionsCreateResultSchema, type SessionsDeleteParams, SessionsDeleteParamsSchema, type SessionsDescribeParams, SessionsDescribeParamsSchema, type SessionsDiffParams, SessionsDiffParamsSchema, type SessionsDiffResult, SessionsDiffResultSchema, type SessionsDispatchParams, SessionsDispatchParamsSchema, type SessionsDispatchResult, SessionsDispatchResultSchema, type SessionsFilesGetParams, SessionsFilesGetParamsSchema, type SessionsFilesGetResult, SessionsFilesGetResultSchema, type SessionsFilesListParams, SessionsFilesListParamsSchema, type SessionsFilesListResult, SessionsFilesListResultSchema, type SessionsFilesRevealParams, SessionsFilesRevealParamsSchema, type SessionsFilesRevealResult, SessionsFilesRevealResultSchema, type SessionsFilesSetParams, SessionsFilesSetParamsSchema, type SessionsFilesSetResult, SessionsFilesSetResultSchema, type SessionsForkParams, SessionsForkParamsSchema, type SessionsForkResult, SessionsForkResultSchema, type SessionsGroupsDeleteParams, SessionsGroupsDeleteParamsSchema, type SessionsGroupsListParams, SessionsGroupsListParamsSchema, type SessionsGroupsListResult, SessionsGroupsListResultSchema, type SessionsGroupsMutationResult, SessionsGroupsMutationResultSchema, type SessionsGroupsPutParams, SessionsGroupsPutParamsSchema, type SessionsGroupsRenameParams, SessionsGroupsRenameParamsSchema, type SessionsListParams, SessionsListParamsSchema, type SessionsMessagesSubscribeParams, type SessionsMessagesSubscribeParamsSchema, type SessionsMessagesUnsubscribeParams, type SessionsMessagesUnsubscribeParamsSchema, type SessionsObserverVisibilityParams, SessionsObserverVisibilityParamsSchema, type SessionsObserverVisibilityResult, SessionsObserverVisibilityResultSchema, type SessionsPatchParams, SessionsPatchParamsSchema, SessionsPatchResult, type SessionsPluginPatchParams, SessionsPluginPatchParamsSchema, type SessionsPluginPatchResult, type SessionsPluginPatchResultSchema, type SessionsPreviewParams, SessionsPreviewParamsSchema, type SessionsReclaimParams, SessionsReclaimParamsSchema, type SessionsReclaimResult, SessionsReclaimResultSchema, type SessionsResetParams, SessionsResetParamsSchema, type SessionsResolveParams, SessionsResolveParamsSchema, type SessionsRewindParams, SessionsRewindParamsSchema, type SessionsRewindResult, SessionsRewindResultSchema, type SessionsSearchHit, SessionsSearchHitSchema, type SessionsSearchParams, SessionsSearchParamsSchema, type SessionsSearchResult, SessionsSearchResultSchema, type SessionsSendParams, SessionsSendParamsSchema, type SessionsUsageParams, SessionsUsageParamsSchema, type SessionsViewerPresenceSetParams, type SessionsViewerPresenceSetParamsSchema, type SessionsViewerPresenceSetResult, type SessionsViewerPresenceSetResultSchema, type ShutdownEvent, ShutdownEventSchema, type SkillProposalEvaluation, SkillProposalEvaluationSchema, type SkillProposalLifecycleEvent, SkillProposalLifecycleEventSchema, type SkillsBinsParams, type SkillsBinsParamsSchema, type SkillsBinsResult, type SkillsBinsResultSchema, type SkillsCuratorActionParams, SkillsCuratorActionParamsSchema, type SkillsCuratorActionResult, SkillsCuratorActionResultSchema, type SkillsCuratorStatusParams, SkillsCuratorStatusParamsSchema, type SkillsCuratorStatusResult, SkillsCuratorStatusResultSchema, type SkillsDetailParams, SkillsDetailParamsSchema, type SkillsDetailResult, SkillsDetailResultSchema, type SkillsInstallParams, SkillsInstallParamsSchema, type SkillsProposalActionParams, SkillsProposalActionParamsSchema, type SkillsProposalApplyResult, SkillsProposalApplyResultSchema, type SkillsProposalCreateParams, SkillsProposalCreateParamsSchema, type SkillsProposalEvaluateParams, SkillsProposalEvaluateParamsSchema, type SkillsProposalEvaluateResult, SkillsProposalEvaluateResultSchema, type SkillsProposalEventsListParams, SkillsProposalEventsListParamsSchema, type SkillsProposalEventsListResult, SkillsProposalEventsListResultSchema, SkillsProposalHistoryScanParams, SkillsProposalHistoryScanParamsSchema, SkillsProposalHistoryScanResult, SkillsProposalHistoryScanResultSchema, SkillsProposalHistoryStatusParams, SkillsProposalHistoryStatusParamsSchema, type SkillsProposalInspectParams, SkillsProposalInspectParamsSchema, type SkillsProposalInspectResult, SkillsProposalInspectResultSchema, type SkillsProposalRecordResult, SkillsProposalRecordResultSchema, type SkillsProposalRequestRevisionParams, SkillsProposalRequestRevisionParamsSchema, type SkillsProposalRequestRevisionResult, SkillsProposalRequestRevisionResultSchema, type SkillsProposalReviseParams, SkillsProposalReviseParamsSchema, type SkillsProposalUpdateParams, SkillsProposalUpdateParamsSchema, type SkillsProposalsListParams, SkillsProposalsListParamsSchema, type SkillsProposalsListResult, SkillsProposalsListResultSchema, type SkillsSearchParams, SkillsSearchParamsSchema, type SkillsSearchResult, SkillsSearchResultSchema, type SkillsSecurityVerdictsParams, SkillsSecurityVerdictsParamsSchema, type SkillsSecurityVerdictsResult, SkillsSecurityVerdictsResultSchema, type SkillsSkillCardParams, SkillsSkillCardParamsSchema, type SkillsSkillCardResult, SkillsSkillCardResultSchema, type SkillsStatusParams, SkillsStatusParamsSchema, type SkillsUpdateParams, SkillsUpdateParamsSchema, type SkillsUploadBeginParams, SkillsUploadBeginParamsSchema, type SkillsUploadChunkParams, SkillsUploadChunkParamsSchema, type SkillsUploadCommitParams, SkillsUploadCommitParamsSchema, type Snapshot, SnapshotSchema, type StateVersion, StateVersionSchema, type SystemAgentApprovalPresentation, type SystemAgentApprovalPresentationSchema, type SystemAgentChatHistoryParams, SystemAgentChatHistoryParamsSchema, type SystemAgentChatHistoryResult, SystemAgentChatHistoryResultSchema, type SystemAgentChatHistoryTurn, SystemAgentChatHistoryTurnSchema, type SystemAgentChatParams, SystemAgentChatParamsSchema, type SystemAgentChatQuestion, SystemAgentChatQuestionSchema, type SystemAgentChatResult, SystemAgentChatResultSchema, SystemAgentErrorDetailCodes, SystemAgentInferenceUnavailableErrorDetails, SystemAgentSessionInvalidatedErrorDetails, type SystemAgentSetupActivateParams, SystemAgentSetupActivateParamsSchema, type SystemAgentSetupActivateResult, SystemAgentSetupActivateResultSchema, type SystemAgentSetupAuthStartParams, SystemAgentSetupAuthStartParamsSchema, type SystemAgentSetupAuthStartResult, SystemAgentSetupAuthStartResultSchema, type SystemAgentSetupDetectParams, SystemAgentSetupDetectParamsSchema, type SystemAgentSetupDetectResult, SystemAgentSetupDetectResultSchema, type SystemAgentSetupVerifyParams, SystemAgentSetupVerifyParamsSchema, type SystemAgentSetupVerifyResult, SystemAgentSetupVerifyResultSchema, type SystemChangeEntry, SystemChangeEntrySchema, type SystemChangeKind, SystemChangeKindSchema, type SystemChangeSource, SystemChangeSourceSchema, type SystemChangesListParams, SystemChangesListParamsSchema, type SystemChangesListResult, SystemChangesListResultSchema, type SystemInfoParams, SystemInfoParamsSchema, type SystemInfoResult, SystemInfoResultSchema, type TalkAgentControlResult, TalkAgentControlResultSchema, type TalkCatalogParams, TalkCatalogParamsSchema, type TalkCatalogResult, TalkCatalogResultSchema, type TalkClientCloseParams, TalkClientCloseParamsSchema, type TalkClientCreateParams, TalkClientCreateParamsSchema, type TalkClientCreateResult, TalkClientCreateResultSchema, type TalkClientMutationResult, TalkClientMutationResultSchema, type TalkClientSteerParams, TalkClientSteerParamsSchema, type TalkClientToolCallParams, TalkClientToolCallParamsSchema, type TalkClientToolCallResult, TalkClientToolCallResultSchema, type TalkClientTranscriptParams, TalkClientTranscriptParamsSchema, type TalkConfigParams, TalkConfigParamsSchema, type TalkConfigResult, TalkConfigResultSchema, type TalkEvent, TalkEventSchema, type TalkModeParams, type TalkModeParamsSchema, type TalkSessionAcknowledgeMarkParams, TalkSessionAcknowledgeMarkParamsSchema, type TalkSessionAppendAudioParams, TalkSessionAppendAudioParamsSchema, type TalkSessionCancelOutputParams, TalkSessionCancelOutputParamsSchema, type TalkSessionCancelTurnParams, TalkSessionCancelTurnParamsSchema, type TalkSessionCloseParams, TalkSessionCloseParamsSchema, type TalkSessionCreateParams, TalkSessionCreateParamsSchema, type TalkSessionCreateResult, TalkSessionCreateResultSchema, type TalkSessionJoinParams, TalkSessionJoinParamsSchema, type TalkSessionJoinResult, TalkSessionJoinResultSchema, type TalkSessionOkResult, TalkSessionOkResultSchema, type TalkSessionSteerParams, TalkSessionSteerParamsSchema, type TalkSessionSubmitToolResultParams, TalkSessionSubmitToolResultParamsSchema, type TalkSessionTurnParams, TalkSessionTurnParamsSchema, type TalkSessionTurnResult, TalkSessionTurnResultSchema, type TalkSpeakParams, TalkSpeakParamsSchema, type TalkSpeakResult, TalkSpeakResultSchema, type TaskSuggestion, type TaskSuggestionEvent, TaskSuggestionEventSchema, type TaskSuggestionResolution, TaskSuggestionResolutionSchema, TaskSuggestionSchema, type TaskSuggestionsAcceptParams, TaskSuggestionsAcceptParamsSchema, type TaskSuggestionsAcceptResult, TaskSuggestionsAcceptResultSchema, type TaskSuggestionsCreateParams, TaskSuggestionsCreateParamsSchema, type TaskSuggestionsCreateResult, TaskSuggestionsCreateResultSchema, type TaskSuggestionsDismissParams, TaskSuggestionsDismissParamsSchema, type TaskSuggestionsDismissResult, TaskSuggestionsDismissResultSchema, type TaskSuggestionsListParams, TaskSuggestionsListParamsSchema, type TaskSuggestionsListResult, TaskSuggestionsListResultSchema, type TaskSummary, TaskSummarySchema, type TasksCancelParams, TasksCancelParamsSchema, type TasksCancelResult, TasksCancelResultSchema, type TasksGetParams, TasksGetParamsSchema, type TasksGetResult, TasksGetResultSchema, type TasksListParams, TasksListParamsSchema, type TasksListResult, TasksListResultSchema, type TasksRecoveryParams, TasksRecoveryParamsSchema, type TasksRecoveryResult, TasksRecoveryResultSchema, type TerminalAckResult, TerminalAckResultSchema, type TerminalApprovalSnapshot, TerminalApprovalSnapshotSchema, type TerminalAttachParams, TerminalAttachParamsSchema, type TerminalAttachResult, TerminalAttachResultSchema, type TerminalCloseParams, TerminalCloseParamsSchema, type TerminalDataEvent, TerminalDataEventSchema, type TerminalEvent, TerminalEventSchema, type TerminalExitEvent, TerminalExitEventSchema, type TerminalInputParams, TerminalInputParamsSchema, type TerminalListResult, TerminalListResultSchema, type TerminalOpenParams, TerminalOpenParamsSchema, type TerminalOpenResult, TerminalOpenResultSchema, type TerminalResizeParams, TerminalResizeParamsSchema, type TerminalSessionApprovalEventSchema, type TerminalSessionInfo, TerminalSessionInfoSchema, type TerminalTextParams, TerminalTextParamsSchema, type TerminalTextResult, TerminalTextResultSchema, type TerminalUploadParams, TerminalUploadParamsSchema, type TerminalUploadResult, TerminalUploadResultSchema, type TickEvent, TickEventSchema, type ToolCatalogEntry, type ToolCatalogEntrySchema, type ToolCatalogGroup, type ToolCatalogGroupSchema, type ToolCatalogProfile, type ToolCatalogProfileSchema, type ToolsCatalogParams, ToolsCatalogParamsSchema, type ToolsCatalogResult, type ToolsCatalogResultSchema, type ToolsEffectiveEntry, type ToolsEffectiveEntrySchema, type ToolsEffectiveGroup, type ToolsEffectiveGroupSchema, type ToolsEffectiveNotice, type ToolsEffectiveNoticeSchema, type ToolsEffectiveParams, ToolsEffectiveParamsSchema, type ToolsEffectiveResult, type ToolsEffectiveResultSchema, type ToolsInvokeErrorSchema, type ToolsInvokeParams, ToolsInvokeParamsSchema, type ToolsInvokeResult, type ToolsInvokeResultSchema, type TtsSpeakParams, TtsSpeakParamsSchema, type TtsSpeakResult, TtsSpeakResultSchema, UiClosePaneCommandSchema, UiCommand, UiCommandParams, UiCommandParamsSchema, UiCommandResult, UiCommandResultSchema, UiCommandSchema, UiFocusCommandSchema, UiNavigateCommandSchema, UiPanelCommandSchema, UiSidebarCommandSchema, UiSplitCommandSchema, type UnknownAgentIdErrorDetails, type UnknownAgentIdErrorDetailsSchema, type UpdateRunParams, UpdateRunParamsSchema, type UpdateStatusParams, UpdateStatusParamsSchema, type UserProfile, type UserProfileAvatarMimeSchema, UserProfileSchema, type UsersLinkEmailParams, UsersLinkEmailParamsSchema, type UsersLinkEmailResult, UsersLinkEmailResultSchema, type UsersListParams, UsersListParamsSchema, type UsersListResult, UsersListResultSchema, type UsersSelfParams, UsersSelfParamsSchema, type UsersSelfResult, UsersSelfResultSchema, type UsersSetAvatarParams, UsersSetAvatarParamsSchema, type UsersSetAvatarResult, UsersSetAvatarResultSchema, type UsersSetDisplayNameParams, UsersSetDisplayNameParamsSchema, type UsersSetDisplayNameResult, UsersSetDisplayNameResultSchema, type ValidationError, WORKER_HEARTBEAT_INTERVAL_MS, WORKER_INFERENCE_MAX_CONTEXT_MESSAGES, WORKER_INFERENCE_MAX_OUTPUT_TOKENS, WORKER_INFERENCE_METHODS, WORKER_INFERENCE_PROTOCOL_FEATURE, WORKER_LAUNCH_V2_PROTOCOL_FEATURE, WORKER_LIVE_EVENT_PROTOCOL_FEATURE, WORKER_PROTOCOL_FEATURES, WORKER_PROTOCOL_MAX_FEATURES, WORKER_PROTOCOL_MAX_FEATURE_LENGTH, WORKER_PROTOCOL_MAX_FRAME_ID_LENGTH, WORKER_PROTOCOL_MAX_IDENTIFIER_LENGTH, WORKER_PROTOCOL_MAX_INFERENCE_PAYLOAD_BYTES, WORKER_PROTOCOL_MAX_METHOD_LENGTH, WORKER_PROTOCOL_MAX_PAYLOAD_BYTES, WORKER_PROTOCOL_METHODS, WORKER_RPC_SET_VERSION, WORKER_TRANSCRIPT_COMMIT_PROTOCOL_FEATURE, WORKER_TRANSCRIPT_MAX_BATCH_MESSAGES, WORKER_TRANSCRIPT_MAX_CONTENT_PARTS, WORKER_TRANSCRIPT_MAX_JSON_DEPTH, type WakeParams, WakeParamsSchema, type WebLoginStartParams, WebLoginStartParamsSchema, type WebLoginWaitParams, WebLoginWaitParamsSchema, type WebPushSubscribeParams, WebPushSubscribeParamsSchema, type WebPushTestParams, WebPushTestParamsSchema, type WebPushUnsubscribeParams, WebPushUnsubscribeParamsSchema, type WebPushVapidPublicKeyParams, WebPushVapidPublicKeyParamsSchema, type WizardAnswer, type WizardAnswerSchema, type WizardCancelParams, WizardCancelParamsSchema, type WizardNextParams, WizardNextParamsSchema, type WizardNextResult, WizardNextResultSchema, type WizardNotFoundErrorDetails, WizardNotFoundErrorDetailsSchema, type WizardStartParams, WizardStartParamsSchema, type WizardStartResult, WizardStartResultSchema, type WizardStatusParams, WizardStatusParamsSchema, type WizardStatusResult, WizardStatusResultSchema, type WizardStep, WizardStepSchema, type WorkerAdmissionFailureReason, WorkerAdmissionFailureReasonSchema, type WorkerAdmissionHandshake, WorkerAdmissionHandshakeSchema, type WorkerAdmissionResponseFrame, WorkerAdmissionResponseFrameSchema, type WorkerConnectParams, type WorkerConnectRequestFrame, WorkerConnectRequestFrameSchema, type WorkerEnvironmentMetadata, WorkerEnvironmentMetadataSchema, type WorkerEnvironmentState, WorkerEnvironmentStateSchema, type WorkerErrorShape, type WorkerHeartbeatParams, WorkerHeartbeatParamsSchema, type WorkerHeartbeatRequestFrame, WorkerHeartbeatRequestFrameSchema, type WorkerHeartbeatResponseFrame, WorkerHeartbeatResponseFrameSchema, type WorkerHeartbeatResult, type WorkerHelloOk, WorkerInferenceCancelParams, WorkerInferenceCancelRequestFrame, WorkerInferenceCancelRequestFrameSchema, WorkerInferenceCancelResponseFrame, WorkerInferenceCancelResponseFrameSchema, WorkerInferenceCancelResult, WorkerInferenceContext, WorkerInferenceErrorReason, WorkerInferenceErrorShape, WorkerInferenceEventFrame, WorkerInferenceEventParams, WorkerInferenceModelRef, WorkerInferenceModelRefSchema, WorkerInferenceOptions, WorkerInferenceOptionsSchema, WorkerInferenceStartParams, WorkerInferenceStartRequestFrame, WorkerInferenceStartRequestFrameSchema, WorkerInferenceStartResponseFrame, WorkerInferenceStartResponseFrameSchema, WorkerInferenceStartResult, WorkerInferenceTerminalFrame, WorkerInferenceTerminalOutcome, WorkerInferenceTerminalParams, type WorkerLiveEvent, type WorkerLiveEventErrorDetails, WorkerLiveEventErrorDetailsSchema, type WorkerLiveEventErrorShape, WorkerLiveEventErrorShapeSchema, type WorkerLiveEventParams, WorkerLiveEventParamsSchema, type WorkerLiveEventRequestFrame, WorkerLiveEventRequestFrameSchema, type WorkerLiveEventResponseFrame, WorkerLiveEventResponseFrameSchema, type WorkerLiveEventResult, WorkerLiveEventResultSchema, WorkerLiveEventSchema, type WorkerProtocolCloseReason, WorkerProtocolCloseReasonSchema, type WorkerTranscriptCommitErrorReason, WorkerTranscriptCommitErrorReasonSchema, type WorkerTranscriptCommitErrorShape, WorkerTranscriptCommitErrorShapeSchema, type WorkerTranscriptCommitParams, WorkerTranscriptCommitParamsSchema, type WorkerTranscriptCommitRequestFrame, WorkerTranscriptCommitRequestFrameSchema, type WorkerTranscriptCommitResponseFrame, WorkerTranscriptCommitResponseFrameSchema, type WorkerTranscriptCommitResult, WorkerTranscriptCommitResultSchema, type WorkerTranscriptMessage, WorkerTranscriptMessageSchema, type WorkerTunnelStatus, WorkerTunnelStatusSchema, type WorktreeBranch, WorktreeBranchSchema, type WorktreeRecord, WorktreeRecordSchema, type WorktreeRepositoryStatus, WorktreeRepositoryStatusSchema, type WorktreesBranchesParams, WorktreesBranchesParamsSchema, type WorktreesBranchesResult, WorktreesBranchesResultSchema, type WorktreesCreateParams, WorktreesCreateParamsSchema, type WorktreesGcParams, WorktreesGcParamsSchema, type WorktreesGcResult, WorktreesGcResultSchema, type WorktreesListParams, WorktreesListParamsSchema, type WorktreesListResult, WorktreesListResultSchema, type WorktreesRemoveParams, WorktreesRemoveParamsSchema, type WorktreesRemoveResult, WorktreesRemoveResultSchema, type WorktreesRestoreParams, WorktreesRestoreParamsSchema, buildClawHubTrustErrorDetails, buildMissingScopeErrorDetails, buildSystemAgentInferenceUnavailableErrorDetails, buildSystemAgentSessionInvalidatedErrorDetails, errorShape, formatValidationErrors, isClawHubTrustErrorCode, isCloudWorkerPlacementState, isMcpAppViewExpiredError, isWellFormedApprovalId, missingScopeErrorShape, normalizeSessionIconInput, parseSessionIcon, readClawHubTrustErrorDetails, readMissingScopeError, readMissingScopeErrorDetails, readSystemAgentInferenceUnavailableErrorDetails, readSystemAgentSessionInvalidatedErrorDetails, validateAgentIdentityParams, validateAgentParams, validateAgentWaitParams, validateAgentsCreateParams, validateAgentsDeleteParams, validateAgentsFilesGetParams, validateAgentsFilesListParams, validateAgentsFilesSetParams, validateAgentsListParams, validateAgentsUpdateParams, validateAgentsWorkspaceGetParams, validateAgentsWorkspaceListParams, validateApprovalGetParams, validateApprovalGetResult, validateApprovalHistoryParams, validateApprovalHistoryResult, validateApprovalPresentation, validateApprovalResolveParams, validateApprovalResolveResult, validateArtifactsDownloadParams, validateArtifactsGetParams, validateArtifactsListParams, validateAuditActivityListParams, validateAuditListParams, validateBoardActionParams, validateBoardDataReadParams, validateBoardEventParams, validateBoardGetParams, validateBoardPromptAuthorizeParams, validateBoardUpdateParams, validateBoardWidgetAppViewParams, validateBoardWidgetContent, validateBoardWidgetGrantParams, validateBoardWidgetPutParams, validateChannelsLogoutParams, validateChannelsPairingApproveParams, validateChannelsPairingDismissParams, validateChannelsPairingListParams, validateChannelsStartParams, validateChannelsStatusParams, validateChannelsStopParams, validateChatAbortParams, validateChatHistoryParams, validateChatInjectParams, validateChatMessageGetParams, validateChatMetadataParams, validateChatSendParams, validateChatToolTitlesParams, validateCommandsListParams, validateConfigApplyParams, validateConfigGetParams, validateConfigPatchParams, validateConfigSchemaLookupParams, validateConfigSchemaLookupResult, validateConfigSchemaParams, validateConfigSetParams, validateConnectParams, validateConversationListParams, validateConversationSendParams, validateConversationTurnCancelParams, validateConversationTurnParams, validateCronAddParams, validateCronGetParams, validateCronListParams, validateCronRemoveParams, validateCronRunParams, validateCronRunsParams, validateCronScratchGetParams, validateCronScratchSetParams, validateCronStatusParams, validateCronUpdateParams, validateDevicePairApproveParams, validateDevicePairListParams, validateDevicePairRejectParams, validateDevicePairRemoveParams, validateDevicePairRenameParams, validateDevicePairSetupCodeParams, validateDeviceTokenRevokeParams, validateDeviceTokenRotateParams, validateEnvironmentsCreateParams, validateEnvironmentsDestroyParams, validateEnvironmentsListParams, validateEnvironmentsStatusParams, validateExecApprovalGetParams, validateExecApprovalRequestParams, validateExecApprovalResolveParams, validateExecApprovalsGetParams, validateExecApprovalsNodeGetParams, validateExecApprovalsNodeSetParams, validateExecApprovalsNodeSnapshot, validateExecApprovalsSetParams, validateFsListDirParams, validateFsListDirResult, validateGatewaySuspendPrepareParams, validateGatewaySuspendResumeParams, validateGatewaySuspendStatusParams, validateHooksStatusParams, validateLogsTailParams, validateMessageActionParams, validateMigrationsMemoryApplyParams, validateMigrationsMemoryPlanParams, validateModelsAuthLogoutParams, validateModelsAuthStatusParams, validateModelsListParams, validateModelsProbeParams, validateNodeDescribeParams, validateNodeEventParams, validateNodeInvokeParams, validateNodeInvokeProgressParams, validateNodeInvokeResultParams, validateNodeListParams, validateNodePairApproveParams, validateNodePairListParams, validateNodePairRejectParams, validateNodePairRemoveParams, validateNodePendingAckParams, validateNodePendingDrainParams, validateNodePendingEnqueueParams, validateNodePluginToolsUpdateParams, validateNodePresenceActivityPayload, validateNodeRenameParams, validateNodeSkillsUpdateParams, validatePluginApprovalRequestParams, validatePluginApprovalResolveParams, validatePluginsInstallParams, validatePluginsListParams, validatePluginsRefreshParams, validatePluginsSearchParams, validatePluginsSessionActionParams, validatePluginsSessionActionResult, validatePluginsSetEnabledParams, validatePluginsUiDescriptorsParams, validatePluginsUiDescriptorsResult, validatePluginsUninstallParams, validatePollParams, validatePushTestParams, validateQuestionGetParams, validateQuestionListParams, validateQuestionRequestParams, validateQuestionResolveParams, validateQuestionWaitAnswerParams, validateRequestFrame, validateSecretsResolveParams, validateSecretsResolveResult, validateSendParams, validateSessionDiscussionInfoParams, validateSessionDiscussionInfoResult, validateSessionDiscussionOpenParams, validateSessionDiscussionOpenResult, validateSessionMemberAddParams, validateSessionMemberRemoveParams, validateSessionMembersListParams, validateSessionSuggestionsAddParams, validateSessionSuggestionsListParams, validateSessionSuggestionsResolveParams, validateSessionTypingParams, validateSessionVisibilitySetParams, validateSessionsAbortParams, validateSessionsBranchesListParams, validateSessionsBranchesSwitchParams, validateSessionsCatalogArchiveParams, validateSessionsCatalogContinueParams, validateSessionsCatalogListParams, validateSessionsCatalogReadParams, validateSessionsCleanupParams, validateSessionsCompactParams, validateSessionsCompactionBranchParams, validateSessionsCompactionGetParams, validateSessionsCompactionListParams, validateSessionsCompactionRestoreParams, validateSessionsCompanionAskParams, validateSessionsCompanionResetParams, validateSessionsCompanionStateParams, validateSessionsCreateParams, validateSessionsDeleteParams, validateSessionsDescribeParams, validateSessionsDiffParams, validateSessionsDispatchParams, validateSessionsFilesGetParams, validateSessionsFilesListParams, validateSessionsFilesRevealParams, validateSessionsFilesSetParams, validateSessionsForkParams, validateSessionsGroupsDeleteParams, validateSessionsGroupsListParams, validateSessionsGroupsListResult, validateSessionsGroupsMutationResult, validateSessionsGroupsPutParams, validateSessionsGroupsRenameParams, validateSessionsListParams, validateSessionsMessagesSubscribeParams, validateSessionsMessagesUnsubscribeParams, validateSessionsObserverVisibilityParams, validateSessionsPatchParams, validateSessionsPluginPatchParams, validateSessionsPreviewParams, validateSessionsReclaimParams, validateSessionsResetParams, validateSessionsResolveParams, validateSessionsRewindParams, validateSessionsSearchParams, validateSessionsSendParams, validateSessionsUsageParams, validateSessionsViewerPresenceSetParams, validateSkillsBinsParams, validateSkillsCuratorActionParams, validateSkillsCuratorStatusParams, validateSkillsDetailParams, validateSkillsInstallParams, validateSkillsProposalActionParams, validateSkillsProposalCreateParams, validateSkillsProposalEvaluateParams, validateSkillsProposalEventsListParams, validateSkillsProposalHistoryScanParams, validateSkillsProposalHistoryStatusParams, validateSkillsProposalInspectParams, validateSkillsProposalRequestRevisionParams, validateSkillsProposalReviseParams, validateSkillsProposalUpdateParams, validateSkillsProposalsListParams, validateSkillsSearchParams, validateSkillsSecurityVerdictsParams, validateSkillsSkillCardParams, validateSkillsStatusParams, validateSkillsUpdateParams, validateSkillsUploadBeginParams, validateSkillsUploadChunkParams, validateSkillsUploadCommitParams, validateSystemAgentChatHistoryParams, validateSystemAgentChatParams, validateSystemAgentSetupActivateParams, validateSystemAgentSetupAuthStartParams, validateSystemAgentSetupDetectParams, validateSystemAgentSetupVerifyParams, validateSystemChangesListParams, type validateSystemEventParams, validateSystemInfoParams, validateSystemInfoResult, validateTalkCatalogParams, validateTalkClientCloseParams, validateTalkClientCreateParams, validateTalkClientCreateResult, validateTalkClientMutationResult, validateTalkClientSteerParams, validateTalkClientToolCallParams, validateTalkClientToolCallResult, validateTalkClientTranscriptParams, validateTalkConfigParams, validateTalkConfigResult, validateTalkModeParams, validateTalkSessionAcknowledgeMarkParams, validateTalkSessionAppendAudioParams, validateTalkSessionCancelOutputParams, validateTalkSessionCancelTurnParams, validateTalkSessionCloseParams, validateTalkSessionCreateParams, validateTalkSessionJoinParams, validateTalkSessionSteerParams, validateTalkSessionSubmitToolResultParams, validateTalkSessionTurnParams, validateTalkSpeakParams, validateTaskSuggestionsAcceptParams, validateTaskSuggestionsCreateParams, validateTaskSuggestionsDismissParams, validateTaskSuggestionsListParams, validateTasksCancelParams, validateTasksGetParams, validateTasksListParams, validateTasksRecoveryParams, validateTerminalAttachParams, validateTerminalCloseParams, validateTerminalInputParams, validateTerminalOpenParams, validateTerminalResizeParams, validateTerminalTextParams, validateTerminalUploadParams, validateTerminalUploadResult, validateToolsCatalogParams, validateToolsEffectiveParams, validateToolsInvokeParams, validateTtsSpeakParams, validateUiCommandParams, validateUpdateRunParams, validateUpdateStatusParams, validateUsersLinkEmailParams, validateUsersLinkEmailResult, validateUsersListParams, validateUsersSelfParams, validateUsersSelfResult, validateUsersSetAvatarParams, validateUsersSetAvatarResult, validateUsersSetDisplayNameParams, validateUsersSetDisplayNameResult, validateWakeParams, validateWebLoginStartParams, validateWebLoginWaitParams, validateWebPushSubscribeParams, validateWebPushTestParams, validateWebPushUnsubscribeParams, validateWebPushVapidPublicKeyParams, validateWizardCancelParams, validateWizardNextParams, validateWizardStartParams, validateWizardStatusParams, validateWorkerAdmissionHandshake, validateWorkerConnectRequestFrame, validateWorkerHeartbeatParams, validateWorkerInferenceCancelParams, validateWorkerInferenceEventFrame, validateWorkerInferenceStartParams, validateWorkerInferenceTerminalFrame, validateWorkerInferenceTerminalOutcome, validateWorkerLiveEventParams, validateWorkerTranscriptCommitParams, validateWorktreesBranchesParams, validateWorktreesCreateParams, validateWorktreesGcParams, validateWorktreesListParams, validateWorktreesRemoveParams, validateWorktreesRestoreParams };