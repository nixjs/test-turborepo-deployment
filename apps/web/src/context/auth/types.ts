import { Errors, Types, Interfaces } from '@athena20/ts-types'
export namespace AuthReactTypes {
    export type StorageType = 'session' | 'localStorage'
    export interface UserProfile {
        email?: string | null
        firstName?: string | null
        lastName?: string | null
        name?: string | null
        [key: string]: unknown // Any custom claim which could be in the profile
    }
    export interface Error {
        code?: string | number
        message?: string
    }
    export interface ContextState {
        error?: Errors.ErrorResponse
        initializing: boolean
        redirectSessionExpiredPath?: string
        redirectLoginPath?: string
        onGetAccessToken: () => Types.Nullable<string>
        onGetRefreshToken: () => Types.Nullable<string>
        onRenewAccessToken: () => Promise<Interfaces.ResponseData<Types.Nullable<string>>>
    }
    export interface StorageConfig {
        accessKey: string
        refreshKey: string
        type: StorageType
    }
}
