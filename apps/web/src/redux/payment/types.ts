import { Types } from '@athena20/ts-types'
import { PaymentTypes, BaseEnum } from '@lottery/types'

export interface UpdateBalance {
    available: string
    symbol: string
    type: BaseEnum.BalanceWalletTypes
    animate: boolean
}

export interface PaymentState {
    currencyConfig: PaymentTypes.Currency[]
    balanceUpdated: Types.Nullable<UpdateBalance>
    balances: PaymentTypes.Balance[]
    balanceVersion: string
    balanceBySymbol: Types.Nullable<PaymentTypes.Balance>
    bcBalances: Types.Nullable<PaymentTypes.Balance[]>
    estimatedBalance: string

    // + deposit
    triggerPayment: BaseEnum.ActivateState
    paymentViewState: PaymentViewState

    // + wallet config
    walletConfig: PaymentTypes.WalletConfig[]
    walletConfigVersion: string
    walletConfigSelected: Types.Nullable<PaymentTypes.WalletConfig>
}

export enum PaymentViewState {
    NONE,
    DEPOSIT,
    WITHDRAWAL
}
