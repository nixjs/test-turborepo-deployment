import { PayloadAction } from '@reduxjs/toolkit'
import { BaseEnum } from '@lottery/types'
import { PlayMode, SettingState } from './types'

export const initialState = {
    playMode: PlayMode.NORMAL,
    sound: true,
    gameMode: BaseEnum.PlayingMode.PM_DIRECT_SERVER,
    autoPlay: false
} as SettingState

export class SettingReducer {
    static setPlayMode = (state: Partial<SettingState>, action: PayloadAction<PlayMode>) => {
        const { payload } = action
        state.playMode = payload
    }

    static setGameMode = (state: Partial<SettingState>, action: PayloadAction<BaseEnum.PlayingMode>) => {
        const { payload } = action
        state.gameMode = payload
    }

    static setAutoPlay = (state: Partial<SettingState>, action: PayloadAction<boolean>) => {
        const { payload } = action
        state.autoPlay = payload
    }

    static setSound = (state: Partial<SettingState>, action: PayloadAction<boolean>) => {
        const { payload } = action
        state.sound = payload
    }
}
