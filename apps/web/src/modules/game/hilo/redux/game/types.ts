import { Types } from '@athena20/ts-types'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/hilo/types'

export interface GameState {
    gameId: Types.Nullable<string | number>
    decimals: number
    betAmountConfig: Types.Nullable<string[]> // [min, max, default, maxPayout]
    isJoinGame: boolean
    directServerBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>
    smartContractBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>

    winningChanceRoundPlaces: Types.Nullable<number>
    multiplierRoundPlaces: Types.Nullable<number>
    maxSkip: Types.Nullable<number>
    maxSeries: Types.Nullable<number>
    rtp: string
    existedTurn?: GameBaseTypes.Card
    turnInfo?: GameBaseTypes.CreateNewTurnReply
    betInfo: Types.Nullable<GameBaseTypes.BetInfoReply>
    // + direct server
    rareWin: Types.Nullable<number>
    balanceLoading: boolean
}
