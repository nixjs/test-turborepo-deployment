import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const depsNetworkSelectedSelector = () => createSelector(rootSelector, (item) => item.depsNetworkSelected)
export const depsCurrencySelectedSelector = () => createSelector(rootSelector, (item) => item.depsCurrencySelected)
export const depsAddressesSelector = () => createSelector(rootSelector, (item) => item.depsAddresses)
export const depsAddressByCurrencySelector = () => createSelector(rootSelector, (item) => item.depsAddressByCurrency)
export const depsAddressByCurrencyByNetworkSelector = () => createSelector(rootSelector, (item) => item.depsAddressByCurrencyByNetwork)
export const depsTokenListByNetworkSelector = () => createSelector(rootSelector, (item) => item.depsTokenList)
export const depsTokenListByNetworkSelectedSelector = () => createSelector(rootSelector, (item) => item.depsTokenListSelected)
