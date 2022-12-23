import { Types } from '@athena20/ts-types'
import { PayloadAction } from '@reduxjs/toolkit'
import { GameState, GamingJoined } from './types'

export const initialState = {
    gamingJoined: null,
    joinGameLoading: false
} as GameState

export const setGamingJoinedLoading = (state: Partial<GameState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.joinGameLoading = payload
}

export const setGamingJoined = (state: Partial<GameState>, action: PayloadAction<Types.Nullable<GamingJoined>>) => {
    const { payload } = action
    state.gamingJoined = payload
}
