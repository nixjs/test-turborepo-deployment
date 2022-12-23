import { Types } from '@athena20/ts-types'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/limbo/types'

export interface GameState {
    decimals: number
    gameId: Types.Nullable<string | number>
    betAmountConfig: Types.Nullable<string[]> // [min, max, default, maxPayout]
    isJoinGame: boolean
    directServerBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>
    smartContractBetConfigs: Types.Nullable<Record<number, GameConfigTypes.BetConfig>>
    minLuckyNumber: Types.Nullable<string>
    maxLuckyNumber: Types.Nullable<string>
    // + direct server
    rareWin: Types.Nullable<number>
    multiplierDecimals: Types.Nullable<number>
    balanceLoading: boolean
    lastBets: Types.Nullable<GameBaseTypes.LastBet[]>
}
