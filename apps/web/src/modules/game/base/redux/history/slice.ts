import { createSlice } from '@reduxjs/toolkit'
import { initialState, fetchBetResults, getBetResults } from './reducers'

export const KEY_REDUCER_SAGA = '@game/history'

const historySlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onFetchBetResults: fetchBetResults,
        onGetBetResults: getBetResults
    }
})

export const { onFetchBetResults, onGetBetResults } = historySlice.actions

export const historyReducer = historySlice.reducer
