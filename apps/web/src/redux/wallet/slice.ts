import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    setWalletTokenSelected,
    setWalletTokenSelectedDefault,
    setHeaderPayoutAmount,
    switchBalanceWallet,
    openBalanceWalletModal
} from './reducers'

export const KEY_REDUCER_SAGA = '@wallet'

const walletSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetWalletTokenSelected: setWalletTokenSelected,
        onSetWalletTokenSelectedDefault: setWalletTokenSelectedDefault,
        onSetHeaderPayoutAmount: setHeaderPayoutAmount,
        onSwitchBalanceWallet: switchBalanceWallet,
        onOpenBalanceWalletModal: openBalanceWalletModal
    }
})

export const {
    onSetWalletTokenSelected,
    onSetWalletTokenSelectedDefault,
    onSetHeaderPayoutAmount,
    onSwitchBalanceWallet,
    onOpenBalanceWalletModal
} = walletSlice.actions

export default walletSlice.reducer
