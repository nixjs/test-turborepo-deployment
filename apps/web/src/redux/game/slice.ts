import { createSlice } from '@reduxjs/toolkit'
import { initialState, setGamingJoinedLoading, setGamingJoined } from './reducers'

export const KEY_REDUCER_SAGA = '@redux-base/game'

const gamingSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetGamingJoinedLoading: setGamingJoinedLoading,
        onSetGamingJoined: setGamingJoined
    }
})

export const { onSetGamingJoined, onSetGamingJoinedLoading } = gamingSlice.actions
export const gamingReducer = gamingSlice.reducer
