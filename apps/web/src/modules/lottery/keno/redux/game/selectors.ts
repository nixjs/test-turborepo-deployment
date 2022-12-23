import { createSelector } from 'reselect'
import { GameState } from './types'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: { [KEY_REDUCER_SAGA]: GameState }) => state[KEY_REDUCER_SAGA] || initialState

export const drawsSelector = () => createSelector(rootSelector, (item) => item.draws)
export const drawsVersionSelector = () => createSelector(rootSelector, (item) => item.drawsVersion)
export const numbersSelector = () => createSelector(rootSelector, (item) => item.numbers)
export const spotsSelector = () => createSelector(rootSelector, (item) => item.spots)
export const spotSelectedSelector = () => createSelector(rootSelector, (item) => item.spotSelected)
export const spotDefaultSelector = () => createSelector(rootSelector, (item) => item.spotDefault)
export const ticketOrderSelector = () => createSelector(rootSelector, (item) => item.ticketOrder)
export const ticketPriceDefaultSelector = () => createSelector(rootSelector, (item) => item.tickerPriceDefault)
export const ticketSessionSelectedSelector = () => createSelector(rootSelector, (item) => item.ticketSessionSelected)
export const ticketSessionSelector = () => createSelector(rootSelector, (item) => item.ticketSession)
export const quantitySelector = () => createSelector(rootSelector, (item) => item.quantity)
export const drawMapByDateSelector = () => createSelector(rootSelector, (item) => item.drawMapByDate)
export const drawSelectedListSelector = () => createSelector(rootSelector, (item) => item.drawSelectedList)
export const numberChoiceModalSelector = () => createSelector(rootSelector, (item) => item.numberChoiceModal)
export const drawingConfigSelector = () => createSelector(rootSelector, (item) => item.drawingConfig)
export const loadingCreateOrderSelector = () => createSelector(rootSelector, (item) => item.createOrderLoading)
