import { createSelector } from 'reselect'
import { PaymentState } from './types'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: { [KEY_REDUCER_SAGA]: PaymentState }) => state[KEY_REDUCER_SAGA] || initialState

export const feeSelector = () => createSelector(rootSelector, (item) => item.fee)
export const subTotalSelector = () => createSelector(rootSelector, (item) => item.subTotal)
export const totalSelector = () => createSelector(rootSelector, (item) => item.total)
export const currentBalanceSelector = () => createSelector(rootSelector, (item) => item.balance)
