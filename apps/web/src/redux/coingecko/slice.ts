import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    // fetchCoingeckoPrice,
    setCoingeckoPrice,
    setCoingeckoPriceVersionUpdated,
    setCoingeckoPriceFailure,
    startCoingeckoPrice,
    stopCoingeckoPrice
} from './reducers'

export const KEY_REDUCER_SAGA = '@coingecko'

const coingeckoSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        // onFetchCoingeckoPrice: fetchCoingeckoPrice,
        onSetCoingeckoPrice: setCoingeckoPrice,
        onSetCoingeckoPriceVersionUpdated: setCoingeckoPriceVersionUpdated,
        onSetCoingeckoPriceFailure: setCoingeckoPriceFailure,
        onStartCoingeckoPrice: startCoingeckoPrice,
        onStopCoingeckoPrice: stopCoingeckoPrice
    }
})

export const {
    // onFetchCoingeckoPrice,
    onSetCoingeckoPrice,
    onSetCoingeckoPriceVersionUpdated,
    onSetCoingeckoPriceFailure,
    onStartCoingeckoPrice,
    onStopCoingeckoPrice
} = coingeckoSlice.actions

export const coingeckoReducer = coingeckoSlice.reducer
