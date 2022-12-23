import { Types } from '@athena20/ts-types'
import { CoingeckoTypes } from 'types/coingecko'

export interface CoingeckoState {
    priceDict: Types.Nullable<CoingeckoTypes.PriceResponse>
    version: Types.Nullable<string>
    priceDictFailure: any
}
