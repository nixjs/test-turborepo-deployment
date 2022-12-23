import { createSelector } from 'reselect'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'
import { GameState } from './types'

const rootSelector = (state: { [key: string]: GameState }) => state[KEY_REDUCER_SAGA] || initialState

export const getGameIdSelector = () => createSelector(rootSelector, (item) => item.gameId)
export const decimalsSelector = () => createSelector(rootSelector, (item) => item.decimals)
export const getDirectServerBetConfigsSelector = () => createSelector(rootSelector, (item) => item.directServerBetConfigs)
export const getSmartContractBetConfigsSelector = () => createSelector(rootSelector, (item) => item.smartContractBetConfigs)
export const getBetAmountConfigSelector = () => createSelector(rootSelector, (item) => item.betAmountConfig)
export const getBalanceLoading = () => createSelector(rootSelector, (item) => item.balanceLoading)
export const minLuckyNumberSelector = () => createSelector(rootSelector, (item) => item.minLuckyNumber)
export const maxLuckyNumberSelector = () => createSelector(rootSelector, (item) => item.maxLuckyNumber)
export const numberSelector = () => createSelector(rootSelector, (item) => item.numbers)
export const minSpotSelector = () => createSelector(rootSelector, (item) => item.minSpot)
export const maxSpotSelector = () => createSelector(rootSelector, (item) => item.maxSpot)
export const profileMultipliersListSelector = () => createSelector(rootSelector, (item) => item.profileMultipliersList)
