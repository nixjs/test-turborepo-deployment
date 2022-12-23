import { createSlice } from '@reduxjs/toolkit'
import { LimboSettingReducer, LimboInitialState } from './reducers'

export const KEY_REDUCER_SAGA = '@game/limbo-setting'

const limboSettingSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState: LimboInitialState,
    reducers: {
        onSetPlayMode: LimboSettingReducer.setPlayMode,
        onSetGameMode: LimboSettingReducer.setGameMode,
        onSetAutoPlay: LimboSettingReducer.setAutoPlay,
        onSetSound: LimboSettingReducer.setSound
    }
})

export const { onSetPlayMode, onSetGameMode, onSetAutoPlay, onSetSound } = limboSettingSlice.actions

export const limboSettingReducer = limboSettingSlice.reducer
