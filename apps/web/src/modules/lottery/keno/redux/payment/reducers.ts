/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { PaymentState } from './types'

export const initialState = {
    fee: '0',
    subTotal: '0',
    total: '0',
    balance: null
} as PaymentState

export const setFee = (state: Partial<PaymentState>, action: PayloadAction<string>) => {
    state.fee = action.payload
}

export const setSubTotal = (state: Partial<PaymentState>, action: PayloadAction<string>) => {
    state.subTotal = action.payload
}

export const setTotal = (state: Partial<PaymentState>, action: PayloadAction<string>) => {
    state.total = action.payload
}

export const setCurrentBalance = (
    state: Partial<PaymentState>,
    action: PayloadAction<
        Types.Nullable<{
            currencySymbol: string
            total: string
            available: string
        }>
    >
) => {
    state.balance = action.payload
}
