import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'

export interface AuthWalletState {
    loading: boolean
    getNonceError: any
    verifySignatureError: any
    walletNotInstalled: boolean
    provider: BaseEnum.AuthenticationProvider
    nonce: Types.Nullable<string>
    signatureVerificationToken: Types.Nullable<string>
}
