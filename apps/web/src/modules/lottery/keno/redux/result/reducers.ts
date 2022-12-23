/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { LotteryCommonTypes } from '@lottery/types'
import { LotteryTypes } from 'modules/lottery/keno/types'
import { ResultState } from './types'
import { Types } from '@athena20/ts-types'

export const initialState = {
    orders: [],
    ordersLoading: false,
    ordersTotal: 0,
    order: null,
    orderModal: false
} as ResultState

export const fetchOrders = (_state: Partial<ResultState>, _action: PayloadAction<LotteryTypes.OrdersRequest>) => {}
export const getOrders = (state: Partial<ResultState>, action: PayloadAction<(LotteryCommonTypes.Order & { orderPrize: string })[]>) => {
    state.orders = action.payload
}
export const setLoadingOrders = (state: Partial<ResultState>, action: PayloadAction<boolean>) => {
    state.ordersLoading = action.payload
}
export const setOrdersTotal = (state: Partial<ResultState>, action: PayloadAction<number>) => {
    state.ordersTotal = action.payload
}
export const setOrderDetail = (
    state: Partial<ResultState>,
    action: PayloadAction<Types.Nullable<LotteryCommonTypes.Order & { orderPrize: string }>>
) => {
    state.order = action.payload
}

export const setOrderDetailModal = (state: Partial<ResultState>, action: PayloadAction<boolean>) => {
    state.orderModal = action.payload
}
