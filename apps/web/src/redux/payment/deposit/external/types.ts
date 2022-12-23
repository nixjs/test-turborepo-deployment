import { WALLET_TYPE, HexParser } from '@athena20/ts-wallet'
import { BaseEnum } from '@lottery/types'
import { ExternalWalletState } from 'types/payment'

export type onConnectFunc = (walletType: WALLET_TYPE) => void

export interface DepositExternalState {
    connectWalletLoading: boolean
    availableBalance?: HexParser
    availableBalanceVersion?: string
    walletAddress?: string
    depsExternalWalletSelected: BaseEnum.WalletProvider
    depsExternalWalletConnectState: ExternalWalletState
    depositLoading: boolean
}
