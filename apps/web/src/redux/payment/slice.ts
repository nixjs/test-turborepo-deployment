import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    fetchCurrencyConfig,
    getCurrencyConfig,
    fetchBalances,
    setBalances,
    setBalanceVersion,
    updateBalance,
    fetchBalanceBySymbol,
    setBalanceBySymbol,
    fetchEstimatedBalance,
    setEstimatedBalance,
    triggerPaymentModal,
    setPaymentViewState,
    executeBalanceChangeNotification,
    airdrop,
    fetchWalletConfig,
    setWalletConfig,
    setWalletConfigSelected,
    resetPaymentState
} from './reducers'

export const KEY_REDUCER_SAGA = '@payment'

const paymentSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onFetchCurrencyConfig: fetchCurrencyConfig,
        onGetCurrencyConfig: getCurrencyConfig,
        onFetchBalances: fetchBalances,
        onSetBalances: setBalances,
        onSetBalanceVersion: setBalanceVersion,
        onUpdateBalance: updateBalance,
        onFetchBalanceBySymbol: fetchBalanceBySymbol,
        onSetBalanceBySymbol: setBalanceBySymbol,
        onFetchEstimatedBalance: fetchEstimatedBalance,
        onSetEstimatedBalance: setEstimatedBalance,
        onTriggerPaymentModal: triggerPaymentModal,
        onSetPaymentViewState: setPaymentViewState,

        onExecuteBalanceChangeNotification: executeBalanceChangeNotification,

        onAirdrop: airdrop,

        onFetchWalletConfig: fetchWalletConfig,
        onSetWalletConfig: setWalletConfig,
        onSetWalletConfigSelected: setWalletConfigSelected,

        onResetPaymentState: resetPaymentState
    }
})

export const {
    onFetchCurrencyConfig,
    onGetCurrencyConfig,
    onFetchBalances,
    onSetBalances,
    onSetBalanceVersion,
    onUpdateBalance,
    onFetchBalanceBySymbol,
    onSetBalanceBySymbol,
    onFetchEstimatedBalance,
    onSetEstimatedBalance,
    onTriggerPaymentModal,
    onSetPaymentViewState,
    onExecuteBalanceChangeNotification,
    onAirdrop,
    onFetchWalletConfig,
    onSetWalletConfig,
    onSetWalletConfigSelected,
    onResetPaymentState
} = paymentSlice.actions

export const paymentReducer = paymentSlice.reducer
