import { createSelector } from 'reselect'
import { ResultState } from './types'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: { [KEY_REDUCER_SAGA]: ResultState }) => state[KEY_REDUCER_SAGA] || initialState

export const loadingOrdersSelector = () => createSelector(rootSelector, (item) => item.ordersLoading)
export const ordersSelector = () => createSelector(rootSelector, (item) => item.orders)
export const ordersTotalSelector = () => createSelector(rootSelector, (item) => item.ordersTotal)
export const orderDetailSelector = () => createSelector(rootSelector, (item) => item.order)
export const orderDetailModalSelector = () => createSelector(rootSelector, (item) => item.orderModal)
