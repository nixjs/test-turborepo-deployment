import { BaseEnum } from '@lottery/types'
import * as loginPb from '@athena20/game-portal/user/rpc/login_pb'
import { AuthTypes } from './base'

export namespace LoginTypes {
    export type VerifySignatureRequest = {
        signature: string
        signatureVerificationToken: string
    }
    export interface LoginInternalFormRequest {
        email: string
        password: string
    }
    export interface LoginInternalRequest extends loginPb.LoginInternalRequest.AsObject {}
    export interface LoginSocialRequest extends loginPb.LoginSocialRequest.AsObject {
        provider: BaseEnum.AuthenticationProvider
    }
    export interface LoginWalletRequest extends loginPb.LoginWalletRequest.AsObject {
        // networkSymbol: BaseEnum.NetworkSymbol
        provider: BaseEnum.AuthenticationProvider
    }
    export interface LoginRequest extends loginPb.LoginRequest.AsObject {
        internalRequest?: LoginInternalRequest
        socialRequest?: LoginSocialRequest
        walletRequest?: LoginWalletRequest
    }
    export interface LoginResponse extends AuthTypes.BaseAuth {}
}
