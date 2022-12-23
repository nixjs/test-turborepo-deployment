import { FindBetResultsByFiltersRequest } from '@athena20/game-portal/game-history/rpc/find_bet_results_by_filters_pb'
import { BetResult } from '@athena20/game-portal/game-history/model/bet_result_pb'
import { BaseEnum, CommonTypes } from '@lottery/types'

export namespace HistoryTypes {
    export interface BetResultRequest extends FindBetResultsByFiltersRequest.AsObject {
        gameSymbol: BaseEnum.GameSymbol
        currencySymbol: string
        playingMode: BaseEnum.PlayingMode
        isRareWin: BaseEnum.BoolFilter
        isHighRoller: BaseEnum.BoolFilter
        sortersList: CommonTypes.Sorter[]
    }
    export interface BetResultReply extends BetResult.AsObject {
        gameSymbol: BaseEnum.GameSymbol
        currencySymbol: string
        playingMode: BaseEnum.PlayingMode
    }
}
