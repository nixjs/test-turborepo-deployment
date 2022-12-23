import { take, fork, all, call, put } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { Interfaces } from '@athena20/ts-types'
import { MB } from '@lottery/utils'
import { CommonTypes, PaymentTypes } from '@lottery/types'
import { MessageBrokerKey } from 'modules/game/keno/consts/enum'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/keno/types'
import { paymentInstance, withAuth } from 'services/grpc'
import { PaymentBaseRequest, RequestMethods as PaymentRequestMethods } from 'services/grpc/request/payment'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameRequest } from 'modules/game/keno/grpc/request'
import { methods } from 'modules/game/keno/grpc/request/methods'
import * as gameSlice from './slice'

function getBetConfigByTokenSelected(configs: GameConfigTypes.BetConfig[], token: string) {
    let betConfig: GameConfigTypes.BetConfig = {
        currencySymbol: '',
        minBet: '',
        maxBet: '',
        defaultBet: '',
        maxOutput: '',
        highRoller: ''
    }
    for (let i = 0; i < configs.length; i += 1) {
        if (configs[i].currencySymbol === token) {
            betConfig = configs[i]
            break
        }
    }
    return betConfig
}

function getBetConfigBySymbol(configs: GameConfigTypes.BetConfig[]) {
    const list: Record<string, GameConfigTypes.BetConfig> = {}
    for (let i = 0; i < configs.length; i++) {
        const { currencySymbol } = configs[i]
        list[currencySymbol] = configs[i]
    }
    return list
}

function* initGameConfig() {
    try {
        while (true) {
            const {
                payload: { token }
            }: { payload: { token: string } } = yield take(gameSlice.onInitGameConfig)
            const { data, status }: Interfaces.ResponseData<GameConfigTypes.GameConfigResponse> = yield call(GameRequest.gameConfigRequest)
            if (status === 'SUCCESS' && data?.config) {
                const {
                    config: {
                        directServerBetConfigsList,
                        maxLuckyNumber,
                        maxSpot,
                        minLuckyNumber,
                        minSpot,
                        profileMultipliersList,
                        rareWin,
                        smartContractBetConfigsList,
                        decimals
                    }
                } = data
                const betConfig = getBetConfigByTokenSelected(directServerBetConfigsList, token)

                const numbers: number[] = []
                for (let index = minLuckyNumber; index < maxLuckyNumber + 1; index++) {
                    numbers.push(index)
                }
                yield put(gameSlice.onSetNumbers(numbers))
                yield all([
                    put(gameSlice.onFetchLiveWalletBalance(token)),
                    put(gameSlice.onSetRareWin(rareWin)),
                    put(gameSlice.onSetDecimals(decimals)),
                    // put(gameSlice.onSetMultiplierDecimals(multiplierdecimals)),
                    put(gameSlice.onSetMinLuckyNumber(minLuckyNumber)),
                    put(gameSlice.onSetMaxLuckyNumber(maxLuckyNumber)),
                    put(gameSlice.onSetMinSpot(minSpot)),
                    put(gameSlice.onSetMaxSpot(maxSpot)),
                    put(gameSlice.onSetProfileMultipliersList(profileMultipliersList)),
                    put(gameSlice.onSetDirectServerBetConfigs(getBetConfigBySymbol(directServerBetConfigsList))),
                    put(gameSlice.onSetSmartContractBetConfigs(getBetConfigBySymbol(smartContractBetConfigsList))),
                    put(gameSlice.onSetBetAmountConfig([betConfig.minBet, betConfig.maxBet, betConfig.defaultBet, betConfig.maxOutput])) // [min, max, default, maxPayout]
                ])
            } else {
                toast.error('Can not get game config.')
            }
        }
    } catch (error) {
        console.warn('Can not get game config.', error)
    }
}

function* fetchLiveWalletBalanceSaga() {
    try {
        while (true) {
            const { payload } = yield take(gameSlice.onFetchLiveWalletBalance)
            yield put(gameSlice.onLoadingLiveWalletBalance(true))

            const { data, status, error }: Interfaces.ResponseData<{ balance: PaymentTypes.Balance }> = yield call(
                withAuth,
                paymentInstance,
                {
                    methodName: PaymentRequestMethods.GET_BALANCE,
                    params: PaymentBaseRequest.getCurrencyBalanceParam(payload)
                },
                true
            )

            if (status === 'SUCCESS' && data) {
                MB.messageBroker.publish<string>(MessageBrokerKey.FETCH_AVAILABLE_BALANCE, data.balance?.available || '0')
            } else {
                console.error('onFetchLiveWalletBalance', error)
            }
            yield put(gameSlice.onLoadingLiveWalletBalance(false))
        }
    } catch (error) {
        console.error(error)
    }
}

function* createNewTurnSaga() {
    try {
        while (true) {
            yield take(gameSlice.onCreateNewTurn)
            const { data, status }: Interfaces.ResponseData<GameBaseTypes.Turn> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.createNewTurn,
                    params: new pbjs.Empty()
                },
                false
            )
            if (status === 'SUCCESS' && data) {
                MB.messageBroker.publish(MessageBrokerKey.INSTANT_KENO_CREATE_NEW_TURN, data)
            }
        }
    } catch (error) {
        toast.error('Cannot get new turn ID')
        console.log(error)
    }
}

function* placeBetSaga() {
    try {
        while (true) {
            const { payload }: CommonTypes.Payload<GameBaseTypes.PlaceBetRequest> = yield take(gameSlice.onPlaceBet)

            const { data, status, error }: Interfaces.ResponseData<GameBaseTypes.PlaceBetReply> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.placeBet,
                    params: GameRequest.placeBetRequestParams(payload)
                },
                false
            )
            if (status === 'SUCCESS' && data) {
                MB.messageBroker.publish(MessageBrokerKey.INSTANT_KENO_PLACE_BET_RESULT, data)
            } else {
                MB.messageBroker.publish(MessageBrokerKey.INSTANT_KENO_PLACE_BET_ERROR, error)
            }
        }
    } catch (error) {
        toast.error('Cannot place bet')
    }
}

export function* root() {
    yield all([
        fork(initGameConfig),
        // + play game
        fork(createNewTurnSaga),
        fork(placeBetSaga),
        // + direct server
        fork(fetchLiveWalletBalanceSaga)
    ])
}
