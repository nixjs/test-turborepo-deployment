import { LimboPlaceBetRequest, LimboPlaceBetReply } from '@athena20/game-portal/inhouse-game/rpc/limbo_place_bet_pb'
import { LimboGetLastResultsRequest, LimboGetLastResultsReply } from '@athena20/game-portal/inhouse-game/rpc/limbo_get_last_results_pb'

export namespace GameBaseTypes {
    export interface CommitHashInfo {
        commitHash: string
        signature: string
    }
    export interface Turn {
        turnId: string
        commitHashInfo: CommitHashInfo
    }
    export interface PlaceBetRequest extends LimboPlaceBetRequest.AsObject {}
    export interface PlaceBetReply extends LimboPlaceBetReply.AsObject {}
    export interface LastBetRequest extends LimboGetLastResultsRequest.AsObject {}
    export interface LastBet {
        key?: string | number
        luckyNumber: number | string
        win: boolean
    }
    export interface LastBetReply extends LimboGetLastResultsReply.AsObject {}
}

export namespace ResultTypes {}
