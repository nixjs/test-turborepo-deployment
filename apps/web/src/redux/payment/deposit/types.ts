import { WALLET_TYPE } from '@athena20/ts-wallet'
import { Types } from '@athena20/ts-types'
import { PaymentTypes } from '@lottery/types'
import { SelectNetworkProps } from 'types/payment'

export type onConnectFunc = (walletType: WALLET_TYPE) => void

export interface PaymentDepositState {
    depsNetworkSelected: Types.Nullable<SelectNetworkProps>
    depsCurrencySelected: Types.Nullable<PaymentTypes.Currency>
    depsAddresses: PaymentTypes.Currency[]
    depsAddressByCurrency: PaymentTypes.DepositAddressInfo[]
    depsAddressByCurrencyByNetwork?: PaymentTypes.DepositAddressInfo
    depsTokenList: PaymentTypes.Token[]
    depsTokenListSelected: Types.Nullable<PaymentTypes.Token>
}
