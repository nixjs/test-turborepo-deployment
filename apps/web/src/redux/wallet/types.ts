import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'

export interface WalletState {
    tokenSelected: string
    tokenSelectedDefault: string
    payoutAmount: Types.Nullable<string>
    balanceWalletType: BaseEnum.BalanceWalletTypes
    balanceWalletModal: BaseEnum.ActivateState
}
