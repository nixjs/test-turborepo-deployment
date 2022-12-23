/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { WalletState } from './types'

export const initialState = {
    tokenSelected: 'TRX',
    tokenSelectedDefault: 'TRX',
    payoutAmount: null,
    balanceWalletType: BaseEnum.BalanceWalletTypes.LIVE_WALLET,
    balanceWalletModal: BaseEnum.ActivateState.DEACTIVATE
} as WalletState

export const setWalletTokenSelected = (state: Partial<WalletState>, action: PayloadAction<string>) => {
    const { payload } = action
    state.tokenSelected = payload
}
export const setWalletTokenSelectedDefault = (state: Partial<WalletState>, action: PayloadAction<string>) => {
    const { payload } = action
    state.tokenSelectedDefault = payload
}
export const setHeaderPayoutAmount = (state: Partial<WalletState>, action: PayloadAction<Types.Nullable<string>>) => {
    const { payload } = action
    state.payoutAmount = payload
}
export const switchBalanceWallet = (state: Partial<WalletState>, action: PayloadAction<BaseEnum.BalanceWalletTypes>) => {
    const { payload } = action
    state.balanceWalletType = payload
}
export const openBalanceWalletModal = (state: Partial<WalletState>, action: PayloadAction<BaseEnum.ActivateState>) => {
    const { payload } = action
    state.balanceWalletModal = payload
}
