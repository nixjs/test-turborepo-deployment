import { FindBetResultsByFiltersRequest } from '@athena20/game-portal/game-history/rpc/find_bet_results_by_filters_pb'
import { Sorter } from '@athena20/game-portal/common/sorter_pb'
import { HistoryTypes } from 'modules/game/base/types/history'

export namespace GameHistoryRequest {
    export const getBetResultRequestParams = (params: Partial<HistoryTypes.BetResultRequest>) => {
        const request = new FindBetResultsByFiltersRequest()
        if (params.size) {
            request.setSize(params.size)
        }
        if (params.userId) {
            request.setUserId(params.userId)
        }
        if (params.isHighRoller) {
            request.setIsHighRoller(params.isHighRoller)
        }
        if (params.isRareWin) {
            request.setIsRareWin(params.isRareWin)
        }
        if (params.gameSymbol) {
            request.setGameSymbol(params.gameSymbol)
        }
        if (params.sortersList) {
            const { sortersList } = params
            const list: Sorter[] = []
            for (let i = 0; i < sortersList.length; i++) {
                const t = sortersList[i]
                const sort = new Sorter()
                sort.setField(t.field)
                sort.setOrder(t.order)
                list.push(sort)
            }
            request.setSortersList(list)
        }
        return request
    }
}
