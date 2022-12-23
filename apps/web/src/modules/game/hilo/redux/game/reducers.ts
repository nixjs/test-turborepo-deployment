/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/hilo/types'
import { GameState } from './types'

export const initialState = {
    isJoinGame: false,
    decimals: 8,
    gameId: null,
    betAmountConfig: null,
    rareWin: null,
    directServerBetConfigs: null,
    smartContractBetConfigs: null,
    maxSeries: null,
    maxSkip: null,
    multiplierRoundPlaces: null,
    rtp: '',
    winningChanceRoundPlaces: null,
    betInfo: null,
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

export const setMaxSeries = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.maxSeries = payload
}

export const setMaxSkip = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.maxSkip = payload
}

export const setMultiplierRoundPlaces = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.multiplierRoundPlaces = payload
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

export const setRTP = (state: Partial<GameState>, action: PayloadAction<string>) => {
    const { payload } = action
    state.rtp = payload
}

export const setWinningChanceRoundPlaces = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.winningChanceRoundPlaces = payload
}

// Direct Server
export const fetchLiveWalletBalance = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}

export const loadingLiveWalletBalance = (state: Partial<GameState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.balanceLoading = payload
}

// Play game
export const checkExistTurn = () => {}
export const existedTurn = (state: Partial<GameState>, action: PayloadAction<Types.Undefined<GameBaseTypes.Card>>) => {
    const { payload } = action
    state.existedTurn = payload
}
export const setTurnInfo = (state: Partial<GameState>, action: PayloadAction<Types.Undefined<GameBaseTypes.CreateNewTurnReply>>) => {
    const { payload } = action
    state.turnInfo = payload
}
export const createNewTurn = (
    _state: Partial<GameState>,
    _action: PayloadAction<Types.Nullable<{ card: GameBaseTypes.HiLoCard; initBet?: GameBaseTypes.InitBetInCreateNewTurn }>>
) => {}
export const initBetInfo = (_state: Partial<GameState>, _action: PayloadAction<Types.Nullable<GameBaseTypes.InitBetInfoRequest>>) => {}
export const placeBet = (_state: Partial<GameState>, _action: PayloadAction<GameBaseTypes.PlaceBetRequest>) => {}
export const cashOut = (_state: Partial<GameState>, _action: PayloadAction<GameBaseTypes.CashOutRequest>) => {}

export const fetchBetInfo = (_state: Partial<GameState>, _action: PayloadAction<GameBaseTypes.BetInfoRequest>) => {}
export const getBetInfo = (state: Partial<GameState>, action: PayloadAction<Types.Nullable<GameBaseTypes.BetInfoReply>>) => {
    const { payload } = action
    state.betInfo = payload
}
