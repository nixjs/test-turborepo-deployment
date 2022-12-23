export namespace CoingeckoTypes {
    export interface Price {
        usd: number
        usd_24h_change: number
        btc: number
        btc_24h_change: number
    }

    export interface PriceParamRequest {
        ids: string
        currencies: string
        includeMarketCap?: boolean
        include24hrVol?: boolean
        include24hrChange?: boolean
        includeLastUpdatedAt?: boolean
        precision?: number
    }

    export interface PriceResponse {
        [id: string]: Price
    }
}
