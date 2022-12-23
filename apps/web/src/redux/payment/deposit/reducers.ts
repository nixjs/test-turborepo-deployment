/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { PaymentTypes } from '@lottery/types'
import { SelectNetworkProps } from 'types/payment'
import { PaymentDepositState } from './types'

export const initialState = {
    depsCurrencySelected: null,
    depsNetworkSelected: null,
    depsAddresses: [],
    depsAddressByCurrency: [],
    depsTokenList: [],
    depsTokenListSelected: null
} as PaymentDepositState

export const deposit = () => {}
export const setDepsNetworkSelected = (state: Partial<PaymentDepositState>, action: PayloadAction<Types.Nullable<SelectNetworkProps>>) => {
    state.depsNetworkSelected = action.payload
}
export const setDepsCurrencySelected = (
    state: Partial<PaymentDepositState>,
    action: PayloadAction<Types.Nullable<PaymentTypes.Currency>>
) => {
    state.depsCurrencySelected = action.payload
}
export const fetchDepositAddresses = () => {}
export const getDepositAddresses = (state: Partial<PaymentDepositState>, action: PayloadAction<PaymentTypes.Currency[]>) => {
    state.depsAddresses = action.payload
}
export const setDepositAddressByCurrency = (
    state: Partial<PaymentDepositState>,
    action: PayloadAction<PaymentTypes.DepositAddressInfo[]>
) => {
    state.depsAddressByCurrency = action.payload
}
export const setDepositAddressByCurrencyByNetwork = (
    state: Partial<PaymentDepositState>,
    action: PayloadAction<Types.Undefined<PaymentTypes.DepositAddressInfo>>
) => {
    state.depsAddressByCurrencyByNetwork = action.payload
}
export const setDepositTokenListByNetwork = (state: Partial<PaymentDepositState>, action: PayloadAction<PaymentTypes.Token[]>) => {
    state.depsTokenList = action.payload
}
export const setDepositTokenListByNetworkSelected = (
    state: Partial<PaymentDepositState>,
    action: PayloadAction<Types.Nullable<PaymentTypes.Token>>
) => {
    state.depsTokenListSelected = action.payload
}

export const resetDepositState = (state: Partial<PaymentDepositState>) => {
    state.depsCurrencySelected = null
    state.depsNetworkSelected = null
    state.depsAddresses = []
    state.depsAddressByCurrency = []
    state.depsAddressByCurrencyByNetwork = undefined
}

export const resetDepositModalState = (state: Partial<PaymentDepositState>) => {
    state.depsCurrencySelected = null
    state.depsNetworkSelected = null
    state.depsAddressByCurrency = []
    state.depsAddressByCurrencyByNetwork = undefined
    state.depsTokenList = []
    state.depsTokenListSelected = null
}
