import { DicePlaceBetRequest, DicePlaceBetReply } from '@athena20/game-portal/inhouse-game/rpc/dice_place_bet_pb'
import { DiceGetLastResultsRequest, DiceGetLastResultsReply } from '@athena20/game-portal/inhouse-game/rpc/dice_get_last_results_pb'

export namespace GameBaseTypes {
    export interface CommitHashInfo {
        commitHash: string
        signature: string
    }
    export interface Turn {
        turnId: string
        commitHashInfo: CommitHashInfo
    }
    export interface PlaceBetRequest extends DicePlaceBetRequest.AsObject {}
    export interface PlaceBetReply extends DicePlaceBetReply.AsObject {}
    export interface LastBetRequest extends DiceGetLastResultsRequest.AsObject {}
    export interface LastBet {
        key?: string | number
        luckyNumber: number
        win: boolean
    }
    export interface LastBetReply extends DiceGetLastResultsReply.AsObject {}
}

export namespace ResultTypes {}
