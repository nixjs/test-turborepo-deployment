import { createSlice } from '@reduxjs/toolkit'
import { DiceInitialState, DiceSettingReducer } from './reducers'

export const KEY_REDUCER_SAGA = '@game/instan-keno-setting'

const instantKenoSettingSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState: DiceInitialState,
    reducers: {
        onSetPlayMode: DiceSettingReducer.setPlayMode,
        onSetGameMode: DiceSettingReducer.setGameMode,
        onSetAutoPlay: DiceSettingReducer.setAutoPlay,
        onSetSound: DiceSettingReducer.setSound
    }
})

export const { onSetPlayMode, onSetGameMode, onSetAutoPlay, onSetSound } = instantKenoSettingSlice.actions

export const diceSettingReducer = instantKenoSettingSlice.reducer
