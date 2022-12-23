import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    deposit,
    setDepsCurrencySelected,
    setDepsNetworkSelected,
    fetchDepositAddresses,
    getDepositAddresses,
    setDepositAddressByCurrency,
    setDepositAddressByCurrencyByNetwork,
    setDepositTokenListByNetwork,
    setDepositTokenListByNetworkSelected,
    resetDepositState,
    resetDepositModalState
} from './reducers'

export const KEY_REDUCER_SAGA = '@payment/deposit'

const paymentDepositSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onDeposit: deposit,
        onSetDepsCurrencySelected: setDepsCurrencySelected,
        onSetDepsNetworkSelected: setDepsNetworkSelected,

        onFetchDepositAddresses: fetchDepositAddresses,
        onGetDepositAddresses: getDepositAddresses,
        onSetDepositAddressByCurrency: setDepositAddressByCurrency,
        onSetDepositAddressByCurrencyByNetwork: setDepositAddressByCurrencyByNetwork,
        onSetDepositTokenListByNetwork: setDepositTokenListByNetwork,
        onSetDepositTokenListByNetworkSelected: setDepositTokenListByNetworkSelected,
        onResetDepositState: resetDepositState,
        onResetDepositModalState: resetDepositModalState
    }
})

export const {
    onDeposit,
    onSetDepsCurrencySelected,
    onSetDepsNetworkSelected,
    onFetchDepositAddresses,
    onGetDepositAddresses,
    onSetDepositAddressByCurrency,
    onSetDepositAddressByCurrencyByNetwork,
    onSetDepositTokenListByNetwork,
    onSetDepositTokenListByNetworkSelected,
    onResetDepositState,
    onResetDepositModalState
} = paymentDepositSlice.actions

export const paymentDepositReducer = paymentDepositSlice.reducer
