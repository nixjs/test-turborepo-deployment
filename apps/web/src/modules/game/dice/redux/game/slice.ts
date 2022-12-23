import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    initGameConfig,
    setDecimals,
    setBetAmountConfig,
    setGameId,
    setMultipliers,
    setRollUnderConfig,
    setRollOverConfig,
    setRareWin,
    setDirectServerBetConfigs,
    setSmartContractBetConfigs,
    // play game
    createNewTurn,
    placeBet,
    fetchLastBet,
    getLastBet,
    // direct server
    fetchLiveWalletBalance,
    loadingLiveWalletBalance
} from './reducers'

export const KEY_REDUCER_SAGA = '@game/dice-game'

const diceGameSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onInitGameConfig: initGameConfig,
        onSetDecimals: setDecimals,
        onSetMultipliers: setMultipliers,
        onSetBetAmountConfig: setBetAmountConfig,
        onSetGameId: setGameId,
        onSetRollUnderConfig: setRollUnderConfig,
        onSetRollOverConfig: setRollOverConfig,
        onSetRareWin: setRareWin,
        onSetDirectServerBetConfigs: setDirectServerBetConfigs,
        onSetSmartContractBetConfigs: setSmartContractBetConfigs,
        onCreateNewTurn: createNewTurn,
        onPlaceBet: placeBet,
        onFetchLastBet: fetchLastBet,
        onGetLastBet: getLastBet,
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
    onSetMultipliers,
    onSetRollUnderConfig,
    onSetRollOverConfig,
    onSetRareWin,
    onSetDirectServerBetConfigs,
    onSetSmartContractBetConfigs,
    onCreateNewTurn,
    onPlaceBet,
    onFetchLastBet,
    onGetLastBet,
    // + direct server
    onFetchLiveWalletBalance,
    onLoadingLiveWalletBalance
} = diceGameSlice.actions

export const diceGameReducer = diceGameSlice.reducer
