export namespace TypesConfig {
    export interface EnvName {
        LOCAL: string
        DEVELOPMENT: string
        STAGING: string
        PRODUCTION: string
    }
    export interface EnvConfigValue {
        API_BASE_URL: string
        SOCKET_BASE_INTERNAL_URL: string
        SOCKET_BASE_PUBLIC_URL: string
        AUTH_GOOGLE_CLIENT_ID: string
        AUTH_FACEBOOK_APP_ID: string
        AUTH_APPLE_CLIENT_ID: string
        AUTH_TELEGRAM_BOT: string
        AUTH_REDIRECT: string
        EXPLORER_NETWORK: string
    }
}
