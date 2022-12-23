import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    initGameConfig,
    setDecimals,
    setBetAmountConfig,
    setGameId,
    // play game
    createNewTurn,
    placeBet,
    fetchLastBet,
    getLastBet,
    setRareWin,
    setMultiplierDecimals,
    setDirectServerBetConfigs,
    setSmartContractBetConfigs,
    setMinLuckyNumber,
    setMaxLuckyNumber,
    // direct server
    fetchLiveWalletBalance,
    loadingLiveWalletBalance
} from './reducers'

export const KEY_REDUCER_SAGA = '@game/limbo-game'

const limboGameSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onInitGameConfig: initGameConfig,
        onSetDecimals: setDecimals,
        onSetBetAmountConfig: setBetAmountConfig,
        onSetGameId: setGameId,
        onCreateNewTurn: createNewTurn,
        onPlaceBet: placeBet,
        onFetchLastBet: fetchLastBet,
        onGetLastBet: getLastBet,
        onSetRareWin: setRareWin,
        onSetMultiplierDecimals: setMultiplierDecimals,
        onSetDirectServerBetConfigs: setDirectServerBetConfigs,
        onSetSmartContractBetConfigs: setSmartContractBetConfigs,
        onSetMinLuckyNumber: setMinLuckyNumber,
        onSetMaxLuckyNumber: setMaxLuckyNumber,
        // + direct server
        onFetchLiveWalletBalance: fetchLiveWalletBalance,
        onLoadingLiveWalletBalance: loadingLiveWalletBalance
    }
})

export const {
    onInitGameConfig,
    onSetDecimals,
    onSetGameId,
    onSetBetAmountConfig,
    onCreateNewTurn,
    onPlaceBet,
    onFetchLastBet,
    onGetLastBet,
    onSetRareWin,
    onSetMultiplierDecimals,
    onSetDirectServerBetConfigs,
    onSetSmartContractBetConfigs,
    onSetMinLuckyNumber,
    onSetMaxLuckyNumber,
    // + direct server
    onFetchLiveWalletBalance,
    onLoadingLiveWalletBalance
} = limboGameSlice.actions

export const limboGameReducer = limboGameSlice.reducer
