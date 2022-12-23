import { Types } from '@athena20/ts-types'
import * as accessReplyPb from '@athena20/game-portal/user/rpc/access_reply_pb'
import { BaseEnum, UserTypes } from '@lottery/types'

export namespace AuthTypes {
    export type Token = {
        accessToken: Types.Nullable<string>
        refreshToken: Types.Nullable<string>
    }
    export interface BaseAuth extends accessReplyPb.AccessReply.AsObject {
        status: BaseEnum.FlowStatus
        challenge?: BaseEnum.SecurityChallenge.AsObject
    }
    export interface UserServiceConfig {
        login: UserTypes.ServiceConfig
        register: UserTypes.ServiceConfig
        updatePassword: UserTypes.ServiceConfig
        resetPassword: UserTypes.ServiceConfig
    }
}
