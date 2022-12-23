/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/keno/types'
import { GameState } from './types'

export const initialState = {
    isJoinGame: false,
    decimals: 8,
    gameId: null,
    betAmountConfig: null,
    rareWin: null,
    directServerBetConfigs: null,
    smartContractBetConfigs: null,
    minLuckyNumber: null,
    maxLuckyNumber: null,
    minSpot: null,
    maxSpot: null,
    numbers: [],
    profileMultipliersList: [],
    // + direct server
    balanceLoading: false
} as GameState

export const setGameId = (state: Partial<GameState>, action: PayloadAction<Types.Nullable<string | number>>) => {
    const { payload } = action
    state.gameId = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const initGameConfig = (_state: Partial<GameState>, _action: PayloadAction<{ token: string }>) => {}

export const setNumbers = (state: Partial<GameState>, action: PayloadAction<number[]>) => {
    const { payload } = action
    state.numbers = payload
}

export const setDecimals = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.decimals = payload
}

export const setMinSpot = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.minSpot = payload
}

export const setMaxSpot = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.maxSpot = payload
}

export const setProfileMultipliersList = (state: Partial<GameState>, action: PayloadAction<GameConfigTypes.InstantKenoMultiplier[]>) => {
    const { payload } = action
    state.profileMultipliersList = payload
}

export const setBetAmountConfig = (state: Partial<GameState>, action: PayloadAction<string[]>) => {
    const { payload } = action
    state.betAmountConfig = payload
}

export const setRareWin = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.rareWin = payload
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

export const setMinLuckyNumber = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.minLuckyNumber = payload
}

export const setMaxLuckyNumber = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.maxLuckyNumber = payload
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
