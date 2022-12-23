import { InstantKenoPlaceBetRequest, InstantKenoPlaceBetReply } from '@athena20/game-portal/inhouse-game/rpc/instant_keno_place_bet_pb'
export namespace GameBaseTypes {
    export interface CommitHashInfo {
        commitHash: string
        signature: string
    }
    export interface Turn {
        turnId: string
        commitHashInfo: CommitHashInfo
    }
    export interface PlaceBetRequest extends InstantKenoPlaceBetRequest.AsObject {}
    export interface PlaceBetReply extends InstantKenoPlaceBetReply.AsObject {}
}

export namespace ResultTypes {}
