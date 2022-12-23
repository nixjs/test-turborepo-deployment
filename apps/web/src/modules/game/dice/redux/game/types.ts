import { Types } from '@athena20/ts-types'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/dice/types'

export interface GameState {
    decimals: number
    gameId: Types.Nullable<string | number>
    betAmountConfig: Types.Nullable<string[]> // [min, max, default, maxPayout]
    rollUnderConfig: Types.Nullable<number[]>
    rollOverConfig: Types.Nullable<number[]>
    rareWin: Types.Nullable<number>
    isJoinGame: boolean
    multipliers: Types.Nullable<Record<number, string>>
    directServerBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>
    smartContractBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>
    // + direct server
    balanceLoading: boolean
    lastBets: Types.Nullable<GameBaseTypes.LastBet[]>
}
