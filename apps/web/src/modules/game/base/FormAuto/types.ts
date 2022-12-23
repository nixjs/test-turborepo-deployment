import { Types, Interfaces } from '@athena20/ts-types'
import BigNumber from 'bignumber.js'

export enum GameStatePlay {
    WIN = 1,
    LOSS,
    INIT
}

export enum RareType {
    RESET,
    INCREASE
}

export enum AutoPlayStatus {
    BALANCE_NOT_ENOUGH = 1,
    MAXIMUM_NUMBER_OF_BET,
    STOP_ON_PROFIT,
    STOP_ON_LOSS,
    NEW_TURN
}

export namespace GameAutoPlayTypes {
    export interface FormAutoPlayConfig {
        numberOfBet: number
        maxBetAmount: string
        stopOnProfit: string
        stopOnLoss: string
        onWinType: RareType
        onWinValue: string
        onLossType: RareType
        onLossValue: string
    }
    export type AutoLayConfigKeys = keyof FormAutoPlayConfig
    export interface AutoPlayInfo {
        numberOfBets: number
        originalAmount: string
        originalBalance: string
        totalBalance: string
        gameStatus: GameStatePlay
    }
    export type AutoPlayInfoKeys = keyof AutoPlayInfo
    export interface AutoPlayRare {
        type: RareType
        value: string | number
    }
    export interface InfoConfigValidation {
        numberOfBet: number
        maxBetAmount: string
        stopOnProfit: string
        stopOnLoss: string
        onWin: AutoPlayRare
        onLoss: AutoPlayRare
        minBet: Types.Nullable<string>
        maxBet: Types.Nullable<string>
    }

    export interface AutoPlayInfoValidationArg {
        numberOfBets: number
        originalAmount: string
        currentAmount: string
        originalBalance: string
        currentBalance: string
        gameStatus: GameStatePlay
        formAutoPlayConfig: InfoConfigValidation
    }
    export interface AutoPlayInfoValidationResult
        extends Interfaces.ResponseData<{
            status: AutoPlayStatus
            amount?: BigNumber
        }> {}
}
