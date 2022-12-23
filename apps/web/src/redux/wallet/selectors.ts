import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const walletTokenSelectedSelector = () => createSelector(rootSelector, (item) => item.tokenSelected)
export const walletTokenSelectedDefaultSelector = () => createSelector(rootSelector, (item) => item.tokenSelectedDefault)
export const headerPayoutAmountSelector = () => createSelector(rootSelector, (item) => item.payoutAmount)
export const balanceWalletTypeSelector = () => createSelector(rootSelector, (item) => item.balanceWalletType)
export const balanceWalletModalSelector = () => createSelector(rootSelector, (item) => item.balanceWalletModal)
