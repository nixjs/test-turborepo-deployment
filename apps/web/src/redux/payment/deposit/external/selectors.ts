import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const walletAddressSelector = () => createSelector(rootSelector, (item) => item.walletAddress)
export const availableBalanceSelector = () => createSelector(rootSelector, (item) => item.availableBalance)
export const availableBalanceVersionSelector = () => createSelector(rootSelector, (item) => item.availableBalanceVersion)

export const depsExternalWalletSelectedSelector = () => createSelector(rootSelector, (item) => item.depsExternalWalletSelected)
export const depsExternalWalletConnectStateSelector = () => createSelector(rootSelector, (item) => item.depsExternalWalletConnectState)
export const depsLoadingSelector = () => createSelector(rootSelector, (item) => item.depositLoading)
