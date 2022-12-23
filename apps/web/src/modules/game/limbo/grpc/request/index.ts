import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { LimboPlaceBetRequest } from '@athena20/game-portal/inhouse-game/rpc/limbo_place_bet_pb'
import { LimboGetLastResultsRequest } from '@athena20/game-portal/inhouse-game/rpc/limbo_get_last_results_pb'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameBaseTypes } from 'modules/game/limbo/types/game'
import { InHouseRequestMethods } from './methods'

export namespace GameRequest {
    export const gameConfigRequest = () => inhouseInstance.send(InHouseRequestMethods.LIMBO_GET_CONFIG, new pbjs.Empty())

    export const lastBetRequest = (size: number) => {
        const request = new LimboGetLastResultsRequest()
        request.setSize(size)
        return inhouseInstance.send(InHouseRequestMethods.LIMBO_GET_LAST_RESULTS, request)
    }

    export const placeBetRequestParams = (params: GameBaseTypes.PlaceBetRequest) => {
        const { turnId, betAmount, currencySymbol, number } = params
        const request = new LimboPlaceBetRequest()
        console.log('placeBetRequestParams', params)
        request.setTurnId(turnId).setBetAmount(betAmount).setCurrencySymbol(currencySymbol).setNumber(number)
        return request
    }
}
