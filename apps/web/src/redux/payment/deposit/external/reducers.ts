/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { WalletProvider, HexParser } from '@athena20/ts-wallet'
import { BaseEnum } from '@lottery/types'
import { ExternalWalletState } from 'types/payment'
import { DepositExternalState } from './types'

export const initialState = {
    depsExternalWalletSelected: BaseEnum.WalletProvider.WP_NONE,
    depsExternalWalletConnectState: 'NONE',
    depositLoading: false
} as DepositExternalState

export const connectWallet = (
    _state: Partial<DepositExternalState>,
    _action: PayloadAction<{
        type: BaseEnum.WalletProvider
        provider: WalletProvider
    }>
) => {}
export const disConnectWallet = () => {}

export const setWalletAddress = (state: Partial<DepositExternalState>, action: PayloadAction<Types.Undefined<string>>) => {
    state.walletAddress = action.payload
}
export const fetchAvailableBalance = (
    _state: Partial<DepositExternalState>,
    _action: PayloadAction<{
        provider: WalletProvider
    }>
) => {}
export const setAvailableBalance = (state: Partial<DepositExternalState>, action: PayloadAction<Types.Undefined<HexParser>>) => {
    state.availableBalance = action.payload
}
export const setAvailableBalanceVersion = (state: Partial<DepositExternalState>, action: PayloadAction<Types.Undefined<string>>) => {
    state.availableBalanceVersion = action.payload
}

export const setDepsExternalWalletSelected = (state: Partial<DepositExternalState>, action: PayloadAction<BaseEnum.WalletProvider>) => {
    state.depsExternalWalletSelected = action.payload
}
export const setDepsExternalWalletConnectState = (state: Partial<DepositExternalState>, action: PayloadAction<ExternalWalletState>) => {
    state.depsExternalWalletConnectState = action.payload
}

export const deposit = (
    _state: Partial<DepositExternalState>,
    _action: PayloadAction<{
        provider: WalletProvider
        amount: number
    }>
) => {}

export const setDepositLoading = (state: Partial<DepositExternalState>, action: PayloadAction<boolean>) => {
    state.depositLoading = action.payload
}

export const resetDepositExternalState = (state: Partial<DepositExternalState>) => {
    state.connectWalletLoading = false
    state.availableBalance = undefined
    state.availableBalanceVersion = undefined
    state.walletAddress = undefined
    state.depsExternalWalletSelected = BaseEnum.WalletProvider.WP_NONE
    state.depsExternalWalletConnectState = 'NONE'
    state.depositLoading = false
}
