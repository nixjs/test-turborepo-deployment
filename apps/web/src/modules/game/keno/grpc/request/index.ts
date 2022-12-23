import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { InstantKenoPlaceBetRequest } from '@athena20/game-portal/inhouse-game/rpc/instant_keno_place_bet_pb'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameBaseTypes } from 'modules/game/keno/types/game'
import { methods } from './methods'

export namespace GameRequest {
    export const gameConfigRequest = () => inhouseInstance.send(methods.getConfig, new pbjs.Empty())

    export const placeBetRequestParams = (params: GameBaseTypes.PlaceBetRequest) => {
        const { betAmount, currencySymbol, numbersList, riskProfile, turnId } = params
        const request = new InstantKenoPlaceBetRequest()
        console.log('Instant Keno Request', params)
        request
            .setTurnId(turnId)
            .setBetAmount(betAmount)
            .setCurrencySymbol(currencySymbol)
            .setRiskProfile(riskProfile)
            .setNumbersList(numbersList)
        return request
    }
}
