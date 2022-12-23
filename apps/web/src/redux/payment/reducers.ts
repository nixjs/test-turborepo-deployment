/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { BaseEnum, PaymentTypes } from '@lottery/types'
import { PaymentState, PaymentViewState, UpdateBalance } from './types'

export const initialState = {
    currencyConfig: [],
    balances: [],
    balanceVersion: '',
    balanceBySymbol: null,
    bcBalances: null,
    balanceUpdated: null,
    estimatedBalance: '',
    triggerPayment: BaseEnum.ActivateState.DEACTIVATE,
    paymentViewState: PaymentViewState.NONE,
    walletConfig: [],
    walletConfigVersion: '',
    walletConfigSelected: null
} as PaymentState

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const fetchBalances = () => {}

export const setBalances = (state: Partial<PaymentState>, action: PayloadAction<PaymentTypes.Balance[]>) => {
    const { payload } = action
    state.balances = payload
}

export const setBalanceVersion = (state: Partial<PaymentState>, action: PayloadAction<string>) => {
    const { payload } = action
    state.balanceVersion = payload
}

export const updateBalance = (state: Partial<PaymentState>, action: PayloadAction<Types.Nullable<UpdateBalance>>) => {
    const { payload } = action
    state.balanceUpdated = payload
}

export const fetchBalanceBySymbol = (_state: Partial<PaymentState>, _action: PayloadAction<string>) => {}

export const setBalanceBySymbol = (state: Partial<PaymentState>, action: PayloadAction<Types.Nullable<PaymentTypes.Balance>>) => {
    state.balanceBySymbol = action.payload
}

export const fetchEstimatedBalance = () => {}
export const setEstimatedBalance = (state: Partial<PaymentState>, action: PayloadAction<string>) => {
    state.estimatedBalance = action.payload
}
export const triggerPaymentModal = (state: Partial<PaymentState>, action: PayloadAction<BaseEnum.ActivateState>) => {
    state.triggerPayment = action.payload
}
export const setPaymentViewState = (state: Partial<PaymentState>, action: PayloadAction<PaymentViewState>) => {
    state.paymentViewState = action.payload
}

export const fetchCurrencyConfig = () => {}

export const getCurrencyConfig = (state: Partial<PaymentState>, action: PayloadAction<PaymentTypes.Currency[]>) => {
    state.currencyConfig = action.payload
}

export const executeBalanceChangeNotification = (
    _state: Partial<PaymentState>,
    _action: PayloadAction<PaymentTypes.BalanceNotification>
) => {}

export const airdrop = () => {}

export const fetchWalletConfig = () => {}
export const setWalletConfig = (
    state: Partial<PaymentState>,
    action: PayloadAction<{ walletConfig: PaymentTypes.WalletConfig[]; version: string }>
) => {
    const {
        payload: { version, walletConfig }
    } = action
    state.walletConfig = walletConfig
    state.walletConfigVersion = version
}
export const setWalletConfigSelected = (state: Partial<PaymentState>, action: PayloadAction<Types.Nullable<PaymentTypes.WalletConfig>>) => {
    state.walletConfigSelected = action.payload
}
export const resetPaymentState = (state: Partial<PaymentState>) => {
    state.balances = []
    state.balanceVersion = ''
    state.balanceBySymbol = null
    state.bcBalances = null
    state.balanceUpdated = null
    state.estimatedBalance = ''
    state.triggerPayment = BaseEnum.ActivateState.DEACTIVATE
    state.paymentViewState = PaymentViewState.NONE
}
