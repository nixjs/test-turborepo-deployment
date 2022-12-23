import { Types } from '@athena20/ts-types'
import { UserTypes } from '@lottery/types'
import { AuthTypes } from 'types/auth/base'

export interface UserProfile {
    userId: string
    firstName?: string
    lastName?: string
    email?: string
}

export interface AccountState {
    userProfile: Types.Nullable<UserProfile>
    internal: Types.Nullable<UserTypes.UserInternalInfo>
    social: Types.Nullable<UserTypes.UserSocialInfo[]>
    wallet: Types.Nullable<UserTypes.UserWalletInfo[]>
    serviceConfig: Types.Nullable<AuthTypes.UserServiceConfig>
    serviceConfigFailure: any
}
