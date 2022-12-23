import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    initGameConfig,
    setDecimals,
    setBetAmountConfig,
    setGameId,
    setNumbers,
    setMinSpot,
    setMaxSpot,
    setProfileMultipliersList,
    // play game
    createNewTurn,
    placeBet,
    setRareWin,
    setDirectServerBetConfigs,
    setSmartContractBetConfigs,
    setMinLuckyNumber,
    setMaxLuckyNumber,
    // direct server
    fetchLiveWalletBalance,
    loadingLiveWalletBalance
} from './reducers'

export const KEY_REDUCER_SAGA = '@game/instant-keno-game'

const limboGameSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onInitGameConfig: initGameConfig,
        onSetBetAmountConfig: setBetAmountConfig,
        onSetDecimals: setDecimals,
        onSetGameId: setGameId,
        onSetNumbers: setNumbers,
        onSetMinSpot: setMinSpot,
        onSetMaxSpot: setMaxSpot,
        onSetProfileMultipliersList: setProfileMultipliersList,
        onCreateNewTurn: createNewTurn,
        onPlaceBet: placeBet,
        onSetRareWin: setRareWin,
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
    onSetGameId,
    onSetDecimals,
    onSetNumbers,
    onSetMinSpot,
    onSetMaxSpot,
    onSetProfileMultipliersList,
    onSetBetAmountConfig,
    onCreateNewTurn,
    onPlaceBet,
    onSetRareWin,
    onSetDirectServerBetConfigs,
    onSetSmartContractBetConfigs,
    onSetMinLuckyNumber,
    onSetMaxLuckyNumber,
    // + direct server
    onFetchLiveWalletBalance,
    onLoadingLiveWalletBalance
} = limboGameSlice.actions

export const instantKenoGameReducer = limboGameSlice.reducer
