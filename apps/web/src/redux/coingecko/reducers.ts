import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { CoingeckoTypes } from 'types/coingecko'
import { CoingeckoState } from './types'

export const initialState = {
    priceDict: null,
    version: null,
    priceDictFailure: null
} as CoingeckoState

// export const fetchCoingeckoPrice = (
//     _state: Partial<CoingeckoState>,
//     _action: PayloadAction<CoingeckoTypes.PriceParamRequest>
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
// ) => {}

export const startCoingeckoPrice = (
    _state: Partial<CoingeckoState>,
    _action: PayloadAction<CoingeckoTypes.PriceParamRequest>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
) => {}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const stopCoingeckoPrice = () => {}

export const setCoingeckoPrice = (state: Partial<CoingeckoState>, action: PayloadAction<Types.Nullable<CoingeckoTypes.PriceResponse>>) => {
    const { payload } = action
    state.priceDict = payload
}

export const setCoingeckoPriceVersionUpdated = (state: Partial<CoingeckoState>, action: PayloadAction<string>) => {
    const { payload } = action
    state.version = payload
}

export const setCoingeckoPriceFailure = (state: Partial<CoingeckoState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.priceDictFailure = payload
}
