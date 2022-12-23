import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { DicePlaceBetRequest } from '@athena20/game-portal/inhouse-game/rpc/dice_place_bet_pb'
import { DiceGetLastResultsRequest } from '@athena20/game-portal/inhouse-game/rpc/dice_get_last_results_pb'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameBaseTypes } from 'modules/game/dice/types/game'
import { methods } from './methods'

export namespace GameRequest {
    export const gameConfigRequest = () => inhouseInstance.send(methods.getConfig, new pbjs.Empty())

    export const lastBetRequest = (size: number) => {
        const request = new DiceGetLastResultsRequest()
        request.setSize(size)
        return inhouseInstance.send(methods.getLastResults, request)
    }

    export const placeBetRequestParams = (params: GameBaseTypes.PlaceBetRequest) => {
        const { turnId, betAmount, currencySymbol, direction, number } = params
        const request = new DicePlaceBetRequest()
        request.setTurnId(turnId).setBetAmount(betAmount).setCurrencySymbol(currencySymbol).setDirection(direction).setNumber(number)
        return request
    }
}
