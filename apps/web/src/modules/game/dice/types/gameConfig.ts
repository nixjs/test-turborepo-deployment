export namespace GameConfigTypes {
    export interface MultipliersConfig {
        winningChance: string
        multiplier: string
    }

    export interface BetConfig {
        currencySymbol: string
        minBet: string
        maxBet: string
        defaultBet: string
        maxOutput: string
        highRoller: string
    }

    export interface GameConfig {
        maxLuckyNumber: number
        minLuckyNumber: number
        rollOverLowerLimit: number
        rollOverUpperLimit: number
        rollUnderUpperLimit: number
        rollUnderLowerLimit: number
        rareWin: number
        highRollersList: BetConfig[]
        multipliersList: MultipliersConfig[]
        directServerBetConfigsList: BetConfig[]
        smartContractBetConfigsList: BetConfig[]
    }

    export interface GameConfigResponse {
        config: GameConfig
    }
}
