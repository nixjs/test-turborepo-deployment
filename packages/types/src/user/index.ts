import * as UserInternalPb from '@athena20/game-portal/user/model/user_internal_info_pb'
import * as UserSocialPb from '@athena20/game-portal/user/model/user_social_info_pb'
import * as UserWalletPb from '@athena20/game-portal/user/model/user_wallet_info_pb'
import * as UserInfoPb from '@athena20/game-portal/user/model/user_info_pb'
import * as OTPConfigPb from '@athena20/game-portal/user/model/otp_config_pb'
import { SocialProvider, NetworkSymbol } from '../enum'

export namespace UserTypes {
    export interface UserInternalInfo extends UserInternalPb.UserInternalInfo.AsObject {
        provider: SocialProvider
    }

    export interface UserSocialInfo extends UserSocialPb.UserSocialInfo.AsObject {
        provider: SocialProvider
    }

    export interface UserWalletInfo extends UserWalletPb.UserWalletInfo.AsObject {
        networkSymbol: NetworkSymbol
    }

    export interface UserInfo extends UserInfoPb.UserInfo.AsObject {
        internal?: UserInternalInfo
        socialsList: UserSocialInfo[]
        walletsList: UserWalletInfo[]
    }

    export interface ServiceConfig extends OTPConfigPb.OTPConfig.AsObject {}
}
