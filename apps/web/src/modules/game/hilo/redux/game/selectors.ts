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
export const RTPSelector = () => createSelector(rootSelector, (item) => item.rtp)
export const maxSeriesSelector = () => createSelector(rootSelector, (item) => item.maxSeries)
export const maxSkipSelector = () => createSelector(rootSelector, (item) => item.maxSkip)
export const multiplierRoundPlacesSelector = () => createSelector(rootSelector, (item) => item.multiplierRoundPlaces)
export const winningChanceRoundPlacesSelector = () => createSelector(rootSelector, (item) => item.winningChanceRoundPlaces)
export const existedTurnSelector = () => createSelector(rootSelector, (item) => item.existedTurn)
export const turnInfoSelector = () => createSelector(rootSelector, (item) => item.turnInfo)
export const betInfoSelector = () => createSelector(rootSelector, (item) => item.betInfo)
