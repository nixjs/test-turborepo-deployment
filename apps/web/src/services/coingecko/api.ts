import { CoingeckoTypes } from 'types/coingecko'
// import { coingeckoClient } from './http'

export namespace CoingeckoRequest {
    export const getPriceApi = (params: CoingeckoTypes.PriceParamRequest) => {
        const ourParams = {
            ids: params.ids,
            vs_currencies: params.currencies,
            include_market_cap: params.includeMarketCap,
            include_24hr_vol: params.include24hrVol,
            include_24hr_change: params.include24hrChange,
            include_last_updated_at: params.includeLastUpdatedAt,
            precision: params.precision
        }
        return ourParams
        // return coingeckoClient.get<CoingeckoTypes.Price>('/simple/price', ourParams)
    }
}
