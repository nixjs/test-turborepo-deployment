import { createSlice } from '@reduxjs/toolkit'
import { initialState, fetchOrders, getOrders, setLoadingOrders, setOrdersTotal, setOrderDetail, setOrderDetailModal } from './reducers'

export const KEY_REDUCER_SAGA = '@keno/result'

const kenoResultSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onFetchOrders: fetchOrders,
        onGetOrders: getOrders,
        onSetLoadingOrders: setLoadingOrders,
        onSetOrdersTotal: setOrdersTotal,
        onSetOrderDetail: setOrderDetail,
        onSetOrderDetailModal: setOrderDetailModal
    }
})

export const { onFetchOrders, onGetOrders, onSetLoadingOrders, onSetOrdersTotal, onSetOrderDetail, onSetOrderDetailModal } =
    kenoResultSlice.actions

export const kenoResultReducer = kenoResultSlice.reducer
