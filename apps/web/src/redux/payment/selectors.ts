import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const currencyConfigSelector = () => createSelector(rootSelector, (item) => item.currencyConfig)
export const balanceVersionSelector = () => createSelector(rootSelector, (item) => item.balanceVersion)
export const balancesSelector = () => createSelector(rootSelector, (item) => item.balances)
export const estimatedBalanceSelector = () => createSelector(rootSelector, (item) => item.estimatedBalance)
export const balanceBySymbolSelector = () => createSelector(rootSelector, (item) => item.balanceBySymbol)
export const bcBalancesSelector = () => createSelector(rootSelector, (item) => item.bcBalances)
export const triggerPaymentSelector = () => createSelector(rootSelector, (item) => item.triggerPayment)
export const paymentViewStateSelector = () => createSelector(rootSelector, (item) => item.paymentViewState)

export const walletConfigSelector = () => createSelector(rootSelector, (item) => item.walletConfig)
export const walletConfigVersionSelector = () => createSelector(rootSelector, (item) => item.walletConfigVersion)
export const walletConfigSelectedSelector = () => createSelector(rootSelector, (item) => item.walletConfigSelected)
