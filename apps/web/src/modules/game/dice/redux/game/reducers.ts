/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/dice/types'
import { GameState } from './types'

export const initialState = {
    decimals: 8,
    gameId: null,
    betAmountConfig: null,
    rollUnderConfig: null,
    rollOverConfig: null,
    rareWin: null,
    multipliers: null,
    directServerBetConfigs: null,
    smartContractBetConfigs: null,
    // + direct server
    balanceLoading: false
} as GameState

export const setGameId = (state: Partial<GameState>, action: PayloadAction<Types.Nullable<string | number>>) => {
    const { payload } = action
    state.gameId = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const initGameConfig = (_state: Partial<GameState>, _action: PayloadAction<{ token: string }>) => {}

export const setDecimals = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.decimals = payload
}

export const setRollUnderConfig = (state: Partial<GameState>, action: PayloadAction<number[]>) => {
    const { payload } = action
    state.rollUnderConfig = payload
}

export const setRollOverConfig = (state: Partial<GameState>, action: PayloadAction<number[]>) => {
    const { payload } = action
    state.rollOverConfig = payload
}

export const setDirectServerBetConfigs = (
    state: Partial<GameState>,
    action: PayloadAction<Types.Nullable<Record<string, GameConfigTypes.BetConfig>>>
) => {
    const { payload } = action
    state.directServerBetConfigs = payload
}

export const setSmartContractBetConfigs = (
    state: Partial<GameState>,
    action: PayloadAction<Types.Nullable<Record<string, GameConfigTypes.BetConfig>>>
) => {
    const { payload } = action
    state.smartContractBetConfigs = payload
}

export const setRareWin = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.rareWin = payload
}

export const setMultipliers = (state: Partial<GameState>, action: PayloadAction<Types.Nullable<Record<string, string>>>) => {
    const { payload } = action
    state.multipliers = payload
}

export const setBetAmountConfig = (state: Partial<GameState>, action: PayloadAction<string[]>) => {
    const { payload } = action
    state.betAmountConfig = payload
}

// Direct Server
export const fetchLiveWalletBalance = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}

export const loadingLiveWalletBalance = (state: Partial<GameState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.balanceLoading = payload
}

// Play game
export const createNewTurn = () => {}
export const placeBet = (_state: Partial<GameState>, _action: PayloadAction<GameBaseTypes.PlaceBetRequest>) => {}
export const fetchLastBet = (_state: Partial<GameState>, _action: PayloadAction<GameBaseTypes.LastBetRequest>) => {}
export const getLastBet = (state: Partial<GameState>, action: PayloadAction<GameBaseTypes.LastBet[]>) => {
    const { payload } = action
    state.lastBets = payload
}
