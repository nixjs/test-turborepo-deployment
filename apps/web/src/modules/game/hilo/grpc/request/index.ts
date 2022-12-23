import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { FindBetResultsByFiltersRequest } from '@athena20/game-portal/game-history/rpc/find_bet_results_by_filters_pb'
import { HiLoPlaceBetRequest } from '@athena20/game-portal/inhouse-game/rpc/hilo_place_bet_pb'
import { HiLoCreateNewTurnRequest } from '@athena20/game-portal/inhouse-game/rpc/hilo_create_new_turn_pb'
import { HiLoCashOutRequest } from '@athena20/game-portal/inhouse-game/rpc/hilo_cash_out_pb'
import { HiLoGetBetInfoRequest } from '@athena20/game-portal/inhouse-game/rpc/hilo_get_bet_info_pb'
import { HiLoInitBetInfoRequest } from '@athena20/game-portal/inhouse-game/rpc/hilo_init_bet_info_pb'
import * as hiloCardPb from '@athena20/game-portal/inhouse-game/model/hilo_card_pb'
import { Sorter } from '@athena20/game-portal/common/sorter_pb'
import { Types } from '@athena20/ts-types'
import { HistoryTypes } from 'modules/game/base/types/history'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameBaseTypes } from 'modules/game/hilo/types/game'
import { methods } from './methods'

export namespace GameRequest {
    export const gameConfigRequest = () => inhouseInstance.send(methods.getConfig, new pbjs.Empty())

    export const placeBetRequestParams = (params: GameBaseTypes.PlaceBetRequest) => {
        const { direction, turnId } = params
        console.log('placeBetRequestParams', params)
        const request = new HiLoPlaceBetRequest()
        request.setTurnId(turnId).setDirection(direction)
        return request
    }

    export const createNewTurnParams = (params: Types.Nullable<GameBaseTypes.HiLoCard>) => {
        const request = new HiLoCreateNewTurnRequest()
        if (params && params.suit && params.value) {
            const { suit, value } = params

            const card = new hiloCardPb.HiLoCard()
            card.setValue(value).setSuit(suit)

            request.setInitCard(card)
        }
        return request
    }

    export const cashOutParams = (params: GameBaseTypes.CashOutRequest) => {
        const request = new HiLoCashOutRequest()
        request.setTurnId(params.turnId)
        return request
    }

    export const getBetInfoParams = (params: GameBaseTypes.BetInfoRequest) => {
        const request = new HiLoGetBetInfoRequest()
        request.setTurnId(params.turnId)
        return request
    }

    export const initBetInfoParams = (params: GameBaseTypes.InitBetInfoRequest) => {
        const { betAmount, currencySymbol, turnId } = params
        const request = new HiLoInitBetInfoRequest()
        request.setTurnId(turnId).setBetAmount(betAmount).setCurrencySymbol(currencySymbol)
        return request
    }
}

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
        // return gameHistoryInstance.send(RequestMethods.GET_BET_RESULTS, request, setAuthorization(accessToken))
    }
}
