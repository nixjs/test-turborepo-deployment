import { createSelector } from 'reselect'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'
import { GameState } from './types'

const rootSelector = (state: { [key: string]: GameState }) => state[KEY_REDUCER_SAGA] || initialState

export const getGameIdSelector = () => createSelector(rootSelector, (item) => item.gameId)
export const decimalsSelector = () => createSelector(rootSelector, (item) => item.decimals)
export const getMultipliersSelector = () => createSelector(rootSelector, (item) => item.multipliers)
export const getRareWinSelector = () => createSelector(rootSelector, (item) => item.rareWin)
export const getDirectServerBetConfigsSelector = () => createSelector(rootSelector, (item) => item.directServerBetConfigs)
export const getSmartContractBetConfigsSelector = () => createSelector(rootSelector, (item) => item.smartContractBetConfigs)
export const getBetAmountConfigSelector = () => createSelector(rootSelector, (item) => item.betAmountConfig)
export const getRollUnderSelector = () => createSelector(rootSelector, (item) => item.rollUnderConfig)
export const getRollOverSelector = () => createSelector(rootSelector, (item) => item.rollOverConfig)
export const getLastBetsSelector = () => createSelector(rootSelector, (item) => item.lastBets)
export const getBalanceLoading = () => createSelector(rootSelector, (item) => item.balanceLoading)
