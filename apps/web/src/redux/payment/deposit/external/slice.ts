import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    connectWallet,
    disConnectWallet,
    setWalletAddress,
    fetchAvailableBalance,
    setAvailableBalance,
    setAvailableBalanceVersion,
    setDepsExternalWalletSelected,
    setDepsExternalWalletConnectState,
    deposit,
    setDepositLoading,
    resetDepositExternalState
} from './reducers'

export const KEY_REDUCER_SAGA = '@payment/deposit-external'

const paymentDepositSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onConnectWallet: connectWallet,
        onDisConnectWallet: disConnectWallet,
        onSetWalletAddress: setWalletAddress,
        onFetchAvailableBalance: fetchAvailableBalance,
        onSetAvailableBalance: setAvailableBalance,
        onSetAvailableBalanceVersion: setAvailableBalanceVersion,
        onSetDepsExternalWalletSelected: setDepsExternalWalletSelected,
        onSetDepsExternalWalletConnectState: setDepsExternalWalletConnectState,
        onDeposit: deposit,
        onSetDepositLoading: setDepositLoading,
        onResetDepositExternalState: resetDepositExternalState
    }
})

export const {
    onConnectWallet,
    onDisConnectWallet,
    onSetWalletAddress,
    onFetchAvailableBalance,
    onSetAvailableBalance,
    onSetAvailableBalanceVersion,
    onSetDepsExternalWalletSelected,
    onSetDepsExternalWalletConnectState,
    onDeposit,
    onSetDepositLoading,
    onResetDepositExternalState
} = paymentDepositSlice.actions

export const paymentDepositExternalReducer = paymentDepositSlice.reducer
