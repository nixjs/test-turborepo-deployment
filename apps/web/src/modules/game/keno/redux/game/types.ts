import { Types } from '@athena20/ts-types'
import { GameConfigTypes } from 'modules/game/keno/types'

export interface GameState {
    gameId: Types.Nullable<string | number>
    decimals: number
    betAmountConfig: Types.Nullable<string[]> // [min, max, default, maxPayout]
    isJoinGame: boolean
    directServerBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>
    smartContractBetConfigs: Types.Nullable<Record<string, GameConfigTypes.BetConfig>>
    minLuckyNumber: Types.Nullable<number>
    maxLuckyNumber: Types.Nullable<number>
    numbers: number[]
    minSpot: Types.Nullable<number>
    maxSpot: Types.Nullable<number>
    profileMultipliersList: GameConfigTypes.InstantKenoMultiplier[]
    // + direct server
    rareWin: Types.Nullable<number>
    balanceLoading: boolean
}
