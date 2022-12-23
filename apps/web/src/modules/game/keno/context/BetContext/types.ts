import React from 'react'
import { Types } from '@athena20/ts-types'
import { GameAutoPlayTypes } from 'modules/game/base/FormAuto'
import { GameBaseTypes, InstantKenoRiskProfile } from 'modules/game/keno/types'

export namespace BetTypes {
    export interface State {
        isPlaying: boolean
        disabled: boolean
        risk: InstantKenoRiskProfile
        numbers: number[]
        luckyNumbers: number[]
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
        SET_NUMBERS,
        SET_LUCKY_NUMBERS,
        SET_RISK,
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

    export interface BetNumbersAction {
        type: Type.SET_NUMBERS
        payload: number[]
    }

    export interface BetLuckyNumbersAction {
        type: Type.SET_LUCKY_NUMBERS
        payload: number[]
    }

    export interface BetRiskAction {
        type: Type.SET_RISK
        payload: InstantKenoRiskProfile
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
            riskProfile: InstantKenoRiskProfile
        }
    }

    export type Actions =
        | PlayAction
        | BetDisableAction
        | BetNumbersAction
        | BetLuckyNumbersAction
        | BetRiskAction
        | FormAutoPlayConfigAction
        | PlaceBetAction
        | InitialStateAction
}
