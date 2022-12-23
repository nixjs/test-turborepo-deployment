import { TypesConfig } from './types'

const env = process.env.APP_ENV

export const EnvNameConfig: TypesConfig.EnvName = {
    LOCAL: 'local',
    DEVELOPMENT: 'dev',
    STAGING: 'qc',
    PRODUCTION: 'prod'
} as const

const BaseDomain = 'athena-dev.muziverse.tech'

const ListConfigs: Record<string, TypesConfig.EnvConfigValue> = {
    [EnvNameConfig.LOCAL]: {
        API_BASE_URL: `https://${BaseDomain}`,
        SOCKET_BASE_INTERNAL_URL: `wss://${BaseDomain}`,
        SOCKET_BASE_PUBLIC_URL: `wss://${BaseDomain}/public`,
        AUTH_GOOGLE_CLIENT_ID: '409443599298-0vtu5cg08airp79pbub1otlc7umf3psa.apps.googleusercontent.com',
        AUTH_FACEBOOK_APP_ID: '2814961075479938',
        AUTH_APPLE_CLIENT_ID: 'tech.muziverse.muzi-user-service',
        AUTH_TELEGRAM_BOT: 'mycore_defi_bot',
        AUTH_REDIRECT: 'https://sso-dev.muziverse.tech',
        EXPLORER_NETWORK: 'TESTNET'
    },
    [EnvNameConfig.DEVELOPMENT]: {
        API_BASE_URL: `https://${BaseDomain}`,
        SOCKET_BASE_INTERNAL_URL: `wss://${BaseDomain}`,
        SOCKET_BASE_PUBLIC_URL: `wss://${BaseDomain}/public`,
        AUTH_GOOGLE_CLIENT_ID: '929101971216-batfl2283u29eil7j9c778je7pirupas.apps.googleusercontent.com',
        AUTH_FACEBOOK_APP_ID: '472886221541870',
        AUTH_APPLE_CLIENT_ID: 'lottery.athena',
        AUTH_TELEGRAM_BOT: 'lottery_ilt_bot',
        AUTH_REDIRECT: 'https://lottery-dev.muziverse.tech',
        EXPLORER_NETWORK: 'TESTNET'
    },
    [EnvNameConfig.STAGING]: {
        API_BASE_URL: `https://${BaseDomain}`,
        SOCKET_BASE_INTERNAL_URL: `wss://${BaseDomain}`,
        SOCKET_BASE_PUBLIC_URL: `wss://${BaseDomain}/public`,
        AUTH_GOOGLE_CLIENT_ID: '929101971216-batfl2283u29eil7j9c778je7pirupas.apps.googleusercontent.com',
        AUTH_FACEBOOK_APP_ID: '472886221541870',
        AUTH_APPLE_CLIENT_ID: 'lottery.athena',
        AUTH_TELEGRAM_BOT: 'lottery_ilt_bot',
        AUTH_REDIRECT: 'https://lottery-dev.muziverse.tech',
        EXPLORER_NETWORK: 'TESTNET'
    },
    [EnvNameConfig.PRODUCTION]: {
        API_BASE_URL: `https://${BaseDomain}`,
        SOCKET_BASE_INTERNAL_URL: `wss://${BaseDomain}`,
        SOCKET_BASE_PUBLIC_URL: `wss://${BaseDomain}/public`,
        AUTH_GOOGLE_CLIENT_ID: '929101971216-batfl2283u29eil7j9c778je7pirupas.apps.googleusercontent.com',
        AUTH_FACEBOOK_APP_ID: '2814961075479938',
        AUTH_APPLE_CLIENT_ID: 'tech.muziverse.muzi-user-service',
        AUTH_TELEGRAM_BOT: 'lottery.athena',
        AUTH_REDIRECT: 'https://lottery-dev.muziverse.tech',
        EXPLORER_NETWORK: 'TESTNET'
    }
}

export const Config = ListConfigs[env as string]
export default env
