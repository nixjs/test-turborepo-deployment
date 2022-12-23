import React from 'react'
import { Types } from '@athena20/ts-types'
import { GameAutoPlayTypes } from 'modules/game/base/FormAuto'
import { GameBaseTypes } from 'modules/game/limbo/types'

export namespace BetTypes {
    export interface State {
        isPlaying: boolean
        disabled: boolean
        betResult: Types.Nullable<GameBaseTypes.PlaceBetReply>
        FormAutoPlayConfig: GameAutoPlayTypes.FormAutoPlayConfig
    }

    export interface ContextState {
        betState: State
        dispatchBet: React.Dispatch<BetTypes.Actions>
    }

    export enum Type {
        SET_PLAY,
        SET_DISABLED,
        SET_AUTOPLAY_CONFIG,
        SET_PLACE_BET_RESULT,
        INITIAL_STATE
    }

    export interface PlayAction {
        type: Type.SET_PLAY
        payload: boolean
    }

    export interface BetDisableAction {
        type: Type.SET_DISABLED
        payload: boolean
    }

    export interface PlaceBetAction {
        type: Type.SET_PLACE_BET_RESULT
        payload: Types.Nullable<GameBaseTypes.PlaceBetReply>
    }

    export interface FormAutoPlayConfigAction {
        type: Type.SET_AUTOPLAY_CONFIG
        payload: GameAutoPlayTypes.FormAutoPlayConfig
    }

    export interface InitialStateAction {
        type: Type.INITIAL_STATE
        payload?: {
            target: string
        }
    }

    export type Actions = PlayAction | BetDisableAction | FormAutoPlayConfigAction | PlaceBetAction | InitialStateAction
}
