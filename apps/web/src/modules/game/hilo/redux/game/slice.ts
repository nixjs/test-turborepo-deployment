import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    initGameConfig,
    setDecimals,
    setBetAmountConfig,
    setGameId,
    setRTP,
    setMaxSeries,
    setMaxSkip,
    setMultiplierRoundPlaces,
    setWinningChanceRoundPlaces,
    // play game
    checkExistTurn,
    existedTurn,
    setTurnInfo,
    createNewTurn,
    initBetInfo,
    placeBet,
    cashOut,
    setRareWin,
    setDirectServerBetConfigs,
    setSmartContractBetConfigs,
    fetchBetInfo,
    getBetInfo,
    // direct server
    fetchLiveWalletBalance,
    loadingLiveWalletBalance
} from './reducers'

export const KEY_REDUCER_SAGA = '@game/hilo-game'

const hiloGameSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onInitGameConfig: initGameConfig,
        onSetBetAmountConfig: setBetAmountConfig,
        onSetDecimals: setDecimals,
        onSetGameId: setGameId,
        onSetRTP: setRTP,
        onSetMaxSeries: setMaxSeries,
        onSetMaxSkip: setMaxSkip,
        onSetMultiplierRoundPlaces: setMultiplierRoundPlaces,
        onSetWinningChanceRoundPlaces: setWinningChanceRoundPlaces,

        onCheckExistTurn: checkExistTurn,
        onExistedTurn: existedTurn,
        onSetTurnInfo: setTurnInfo,
        onCreateNewTurn: createNewTurn,
        onInitBetInfo: initBetInfo,
        onPlaceBet: placeBet,
        onCashOut: cashOut,
        onSetRareWin: setRareWin,
        onSetDirectServerBetConfigs: setDirectServerBetConfigs,
        onSetSmartContractBetConfigs: setSmartContractBetConfigs,
        onFetchBetInfo: fetchBetInfo,
        onGetBetInfo: getBetInfo,
        // + direct server
        onFetchLiveWalletBalance: fetchLiveWalletBalance,
        onLoadingLiveWalletBalance: loadingLiveWalletBalance
    }
})

export const {
    onInitGameConfig,
    onSetBetAmountConfig,
    onSetGameId,
    onSetDecimals,
    onSetRTP,
    onSetMaxSeries,
    onSetMaxSkip,
    onSetMultiplierRoundPlaces,
    onSetWinningChanceRoundPlaces,
    onCheckExistTurn,
    onExistedTurn,
    onSetTurnInfo,
    onCreateNewTurn,
    onInitBetInfo,
    onPlaceBet,
    onCashOut,
    onSetRareWin,
    onSetDirectServerBetConfigs,
    onSetSmartContractBetConfigs,
    onFetchBetInfo,
    onGetBetInfo,
    // + direct server
    onFetchLiveWalletBalance,
    onLoadingLiveWalletBalance
} = hiloGameSlice.actions

export const hiloGameReducer = hiloGameSlice.reducer
