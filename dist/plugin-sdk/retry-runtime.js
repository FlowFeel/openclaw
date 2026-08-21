import { n as isTransientNetworkError } from "../retryable-network-errors-BIyuRH5t.js";
import { t as parseRetryAfterHeaderSeconds } from "../retry-after-GP4sxVyZ.js";
import { a as resolveRetryConfig } from "../src-DKBD8PDy.js";
import { t as retryAsync } from "../retry-Cn-q-rcX.js";
import { n as createChannelApiRetryRunner, r as createRateLimitRetryRunner, t as CHANNEL_API_RETRY_DEFAULTS } from "../retry-policy-DS4M6SwT.js";
import { t as classifyTransientNetworkErrorCode } from "../retry-runtime-F3LByspE.js";
export { CHANNEL_API_RETRY_DEFAULTS as TELEGRAM_RETRY_DEFAULTS, classifyTransientNetworkErrorCode, createChannelApiRetryRunner, createChannelApiRetryRunner as createTelegramRetryRunner, createRateLimitRetryRunner, isTransientNetworkError, parseRetryAfterHeaderSeconds, resolveRetryConfig, retryAsync };
