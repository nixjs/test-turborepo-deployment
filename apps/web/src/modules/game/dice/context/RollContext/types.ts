import React from 'react'
import { Types } from '@athena20/ts-types'
import { GameAutoPlayTypes } from 'modules/game/base/FormAuto'
import { DiceDirection } from 'modules/game/dice/consts/enum'
import { GameBaseTypes } from 'modules/game/dice/types'

export namespace RollTypes {
    export interface State {
        radius: number
        range: Types.Nullable<(number | string)[]>
        direction: DiceDirection
        disabled: boolean
        multiplier: string
        winningChance: string
        isRolling: boolean
        betResult: Types.Nullable<GameBaseTypes.PlaceBetReply>
        FormAutoPlayConfig: GameAutoPlayTypes.FormAutoPlayConfig
    }

    export interface ContextState {
        rollState: State
        dispatchRoll: React.Dispatch<RollTypes.Actions>
    }

    export enum Type {
        SET_ROLLING,
        SET_RADIUS,
        SET_DIRECTION,
        SET_DISABLED,
        SET_MULTIPLIER,
        SET_RANGE,
        SET_PLACE_BET_RESULT,
        SET_AUTOPLAY_CONFIG,
        INITIAL_STATE
    }

    export interface RollingAction {
        type: Type.SET_ROLLING
        payload: boolean
    }

    export interface RadiusAction {
        type: Type.SET_RADIUS
        payload: number
    }

    export interface DirectionAction {
        type: Type.SET_DIRECTION
        payload: number
    }

    export interface RollDisabledAction {
        type: Type.SET_DISABLED
        payload: boolean
    }

    export interface MultiplierAction {
        type: Type.SET_MULTIPLIER
        payload: string[]
    }

    export interface RangeAction {
        type: Type.SET_RANGE
        payload: (string | number)[]
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
            multiplier: string
            winningChance: string
        }
    }

    export type Actions =
        | RollingAction
        | RadiusAction
        | RollDisabledAction
        | MultiplierAction
        | DirectionAction
        | RangeAction
        | PlaceBetAction
        | FormAutoPlayConfigAction
        | InitialStateAction
}
