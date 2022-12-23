import { BaseEnum } from '@lottery/types'

export enum PlayMode {
    FAST = 1,
    NORMAL
}

export interface SettingState {
    playMode: PlayMode
    gameMode: BaseEnum.PlayingMode
    sound: boolean
    autoPlay: boolean
}
