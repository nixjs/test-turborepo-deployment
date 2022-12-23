import { createSlice } from '@reduxjs/toolkit'
import { initialState, setFee, setSubTotal, setTotal, setCurrentBalance } from './reducers'

export const KEY_REDUCER_SAGA = '@keno/payment'

const kenoPaymentSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetFee: setFee,
        onSetSubTotal: setSubTotal,
        onSetTotal: setTotal,
        onSetCurrentBalance: setCurrentBalance
    }
})

export const { onSetFee, onSetSubTotal, onSetTotal, onSetCurrentBalance } = kenoPaymentSlice.actions

export const kenoPaymentReducer = kenoPaymentSlice.reducer
