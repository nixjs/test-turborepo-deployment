/* eslint-disable @typescript-eslint/no-empty-function */
import { Types } from '@athena20/ts-types'
import { PayloadAction } from '@reduxjs/toolkit'
import { HistoryTypes } from '../../types/history'
import { HistoryState } from './types'

export const initialState = {
    betResults: null
} as HistoryState

export const fetchBetResults = (_state: Partial<HistoryState>, _action: PayloadAction<Partial<HistoryTypes.BetResultRequest>>) => {}

export const getBetResults = (state: Partial<HistoryState>, action: PayloadAction<Types.Nullable<HistoryTypes.BetResultReply[]>>) => {
    const { payload } = action
    state.betResults = payload
}
