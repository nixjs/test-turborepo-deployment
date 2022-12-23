export const InHouseRequestMethods = {
    GET_GAMES_INFO: 'getGamesInfo',
    GET_SMART_CONTRACT_CONFIG: 'getSmartContractConfig'
}

export const GameHistoryRequestMethods = {
    GET_BET_RESULTS: 'findBetResultsByFilters'
}

export type GamePrefix = 'dice' | 'coinFlip' | 'spaceDice' | 'limbo' | 'hiLo' | 'instantKeno' | 'tower'

export class InHouseMethod {
    prefix: GamePrefix
    constructor(prefix: GamePrefix) {
        this.prefix = prefix
    }

    public get checkExistTurn(): string {
        return `${this.prefix}CheckExistTurn`
    }

    public get createNewTurn(): string {
        return `${this.prefix}CreateNewTurn`
    }

    public get getConfig(): string {
        return `${this.prefix}GetConfig`
    }

    public get placeBet(): string {
        return `${this.prefix}PlaceBet`
    }
    public get initBetInfo(): string {
        return `${this.prefix}InitBetInfo`
    }
}
