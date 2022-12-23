import { createSlice } from '@reduxjs/toolkit'
import { KenoInitialState, KenoSettingReducer } from './reducers'

export const KEY_REDUCER_SAGA = '@game/instan-keno-setting'

const instantKenoSettingSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState: KenoInitialState,
    reducers: {
        onSetPlayMode: KenoSettingReducer.setPlayMode,
        onSetGameMode: KenoSettingReducer.setGameMode,
        onSetAutoPlay: KenoSettingReducer.setAutoPlay,
        onSetSound: KenoSettingReducer.setSound
    }
})

export const { onSetPlayMode, onSetGameMode, onSetAutoPlay, onSetSound } = instantKenoSettingSlice.actions

export const instantKenoSettingReducer = instantKenoSettingSlice.reducer
