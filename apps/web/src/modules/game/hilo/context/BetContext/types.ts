import React from 'react'
import { Types } from '@athena20/ts-types'
import { GameBaseTypes } from 'modules/game/hilo/types'

export namespace BetTypes {
    export interface State {
        isPlaying: boolean
        disabled: boolean
        allowCashOut: boolean
        skip: number
        coefficient: string
        card: Types.Nullable<GameBaseTypes.Card>
        betResult: Types.Nullable<GameBaseTypes.PlaceBetReply>
        offeredOptionsList: GameBaseTypes.HiLoTurnOption[]
        turnsList: GameBaseTypes.HiLoTurn[]
        turnId: Types.Nullable<string>
    }

    export interface ContextState {
        betState: State
        dispatchBet: React.Dispatch<BetTypes.Actions>
    }

    export enum Type {
        SET_PLAY,
        SET_DISABLED,
        SET_SKIP,
        SET_COEFFICIENT,
        SET_CARD,
        SET_PLACE_BET_RESULT,
        SET_OFFERED_OPTIONS_LIST,
        SET_TURNS_LIST,
        SET_ALLOW_CASH_OUT,
        SET_TURN_ID,
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

    export interface BetSkipAction {
        type: Type.SET_SKIP
        payload: number
    }

    export interface BetCoefficientAction {
        type: Type.SET_COEFFICIENT
        payload: string
    }

    export interface BetCardAction {
        type: Type.SET_CARD
        payload: Types.Nullable<GameBaseTypes.Card>
    }

    export interface PlaceBetAction {
        type: Type.SET_PLACE_BET_RESULT
        payload: Types.Nullable<GameBaseTypes.PlaceBetReply>
    }

    export interface TurnOptionListAction {
        type: Type.SET_OFFERED_OPTIONS_LIST
        payload: GameBaseTypes.HiLoTurnOption[]
    }

    export interface TurnListAction {
        type: Type.SET_TURNS_LIST
        payload: GameBaseTypes.HiLoTurn[]
    }

    export interface AllowCashOutAction {
        type: Type.SET_ALLOW_CASH_OUT
        payload: boolean
    }

    export interface SetTurnIdAction {
        type: Type.SET_TURN_ID
        payload: Types.Nullable<string>
    }

    export interface InitialStateAction {
        type: Type.INITIAL_STATE
    }

    export type Actions =
        | PlayAction
        | BetDisableAction
        | BetSkipAction
        | BetCoefficientAction
        | BetCardAction
        | PlaceBetAction
        | TurnOptionListAction
        | TurnListAction
        | AllowCashOutAction
        | SetTurnIdAction
        | InitialStateAction
}
