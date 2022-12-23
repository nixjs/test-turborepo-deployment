import { take, fork, all, call, put } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { Interfaces } from '@athena20/ts-types'
import { MB } from '@lottery/utils'
import { CommonTypes, PaymentTypes } from '@lottery/types'
import { MessageBrokerKey } from 'modules/game/dice/consts/enum'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/dice/types'
import { paymentInstance, withAuth } from 'services/grpc'
import { PaymentBaseRequest, RequestMethods as PaymentRequestMethods } from 'services/grpc/request/payment'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameRequest } from 'modules/game/dice/grpc/request'
import { methods } from 'modules/game/dice/grpc/request/methods'
import * as gameSlice from './slice'

function* getMultipliersSaga(multipliers: GameConfigTypes.MultipliersConfig[]) {
    const list: Record<string, string> = {}
    for (let i = 0; i < multipliers.length; i += 1) {
        const { winningChance, multiplier } = multipliers[i]
        list[String(winningChance)] = multiplier
    }
    yield put(gameSlice.onSetMultipliers(list))
}

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
                        multipliersList,
                        rollOverLowerLimit,
                        rollOverUpperLimit,
                        rollUnderLowerLimit,
                        rollUnderUpperLimit,
                        directServerBetConfigsList,
                        smartContractBetConfigsList,
                        rareWin
                    }
                } = data
                const betConfig = getBetConfigByTokenSelected(directServerBetConfigsList, token)
                yield getMultipliersSaga(multipliersList)
                yield all([
                    put(gameSlice.onSetDecimals(8)),
                    put(gameSlice.onFetchLiveWalletBalance(token)),
                    put(gameSlice.onSetRollUnderConfig([rollUnderLowerLimit, rollUnderUpperLimit])),
                    put(gameSlice.onSetRollOverConfig([rollOverLowerLimit, rollOverUpperLimit])),
                    put(gameSlice.onSetDirectServerBetConfigs(getBetConfigBySymbol(directServerBetConfigsList))),
                    put(gameSlice.onSetSmartContractBetConfigs(getBetConfigBySymbol(smartContractBetConfigsList))),
                    put(gameSlice.onSetBetAmountConfig([betConfig.minBet, betConfig.maxBet, betConfig.defaultBet, betConfig.maxOutput])), // [min, max, default, maxPayout]
                    put(gameSlice.onSetRareWin(rareWin))
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
                MB.messageBroker.publish(MessageBrokerKey.DICE_CREATE_NEW_TURN, data)
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
                MB.messageBroker.publish(MessageBrokerKey.DICE_PLACE_BET_RESULT, data)
            } else {
                MB.messageBroker.publish(MessageBrokerKey.DICE_PLACE_BET_ERROR, error)
            }
        }
    } catch (error) {
        toast.error('Cannot place bet')
    }
}

function* lastBetSaga() {
    try {
        while (true) {
            const { payload }: CommonTypes.Payload<GameBaseTypes.LastBetRequest> = yield take(gameSlice.onFetchLastBet)
            const { data, status }: Interfaces.ResponseData<GameBaseTypes.LastBetReply> = yield call(
                GameRequest.lastBetRequest,
                payload.size
            )
            if (status === 'SUCCESS' && data && data.resultsList) {
                yield put(gameSlice.onGetLastBet(data.resultsList))
            }
        }
    } catch (error) {
        toast.error('Cannot get last bet')
    }
}

export function* root() {
    yield all([
        fork(initGameConfig),
        // + play game
        fork(createNewTurnSaga),
        fork(placeBetSaga),
        fork(lastBetSaga),
        // + direct server
        fork(fetchLiveWalletBalanceSaga)
    ])
}
