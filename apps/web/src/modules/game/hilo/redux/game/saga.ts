import { take, fork, all, call, put } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { Interfaces, Types } from '@athena20/ts-types'
import { MB } from '@lottery/utils'
import { CommonTypes, PaymentTypes } from '@lottery/types'
import { MessageBrokerKey } from 'modules/game/hilo/consts/enum'
import { GameBaseTypes, GameConfigTypes } from 'modules/game/hilo/types'
import { paymentInstance, withAuth } from 'services/grpc'
import { PaymentBaseRequest, RequestMethods as PaymentRequestMethods } from 'services/grpc/request/payment'
import { inhouseInstance } from 'modules/game/base/grpc/inhouse'
import { GameRequest } from 'modules/game/hilo/grpc/request'
import { methods } from 'modules/game/hilo/grpc/request/methods'
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
                        rareWin,
                        smartContractBetConfigsList,
                        decimals,
                        maxSeries,
                        maxSkip,
                        multiplierRoundPlaces,
                        rtp,
                        winningChanceRoundPlaces
                    }
                } = data
                const betConfig = getBetConfigByTokenSelected(directServerBetConfigsList, token)
                yield all([
                    put(gameSlice.onFetchLiveWalletBalance(token)),
                    put(gameSlice.onSetRareWin(rareWin)),
                    put(gameSlice.onSetDecimals(decimals)),
                    put(gameSlice.onSetMaxSeries(maxSeries)),
                    put(gameSlice.onSetMaxSkip(maxSkip)),
                    put(gameSlice.onSetMultiplierRoundPlaces(multiplierRoundPlaces)),
                    put(gameSlice.onSetRTP(rtp)),
                    put(gameSlice.onSetWinningChanceRoundPlaces(winningChanceRoundPlaces)),
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

function* checkTurnExistedTurnSaga() {
    try {
        while (true) {
            yield take(gameSlice.onCheckExistTurn)
            const { data, status }: Interfaces.ResponseData<GameBaseTypes.CheckTurnExistedTurnReply> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.checkExistTurn,
                    params: new pbjs.Empty()
                },
                false
            )
            if (status === 'SUCCESS' && data) {
                yield put(gameSlice.onExistedTurn(data.initCard))
                if (data.turnId?.length > 0 && data.initCard) {
                    yield put(gameSlice.onCreateNewTurn(null))
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function* createNewTurnSaga() {
    try {
        while (true) {
            const {
                payload
            }: { payload: Types.Nullable<{ card: GameBaseTypes.HiLoCard; initBet: GameBaseTypes.InitBetInCreateNewTurn }> } = yield take(
                gameSlice.onCreateNewTurn
            )
            // if (payload) {
            const { data, status }: Interfaces.ResponseData<GameBaseTypes.CreateNewTurnReply> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.createNewTurn,
                    params: GameRequest.createNewTurnParams(payload?.card || null)
                },
                false
            )

            if (status === 'SUCCESS' && data) {
                if (payload?.initBet && data.turnId && (data.betAmount.length === 0 || data.symbol.length === 0)) {
                    yield put(
                        gameSlice.onInitBetInfo({
                            ...payload.initBet,
                            turnId: data.turnId
                        })
                    )
                }
                MB.messageBroker.publish(MessageBrokerKey.HILO_CREATE_NEW_TURN, data)
            }
            // }
        }
    } catch (error) {
        console.log(error)
        toast.error('Cannot get new turn ID')
    }
}

function* initBetInfoSaga() {
    while (true) {
        try {
            const { payload }: CommonTypes.Payload<GameBaseTypes.InitBetInfoRequest> = yield take(gameSlice.onInitBetInfo)

            const { data, status, error }: Interfaces.ResponseData<GameBaseTypes.PlaceBetReply> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.initBetInfo,
                    params: GameRequest.initBetInfoParams(payload)
                },
                false
            )
            console.log('data, status, error')
            console.log(data, status, error)
        } catch (error) {
            toast.error('Cannot init bet info')
        }
    }
}

function* placeBetSaga() {
    while (true) {
        try {
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
                MB.messageBroker.publish(MessageBrokerKey.HILO_PLACE_BET_RESULT, data)
            } else {
                MB.messageBroker.publish(MessageBrokerKey.HILO_PLACE_BET_ERROR, error)
            }
        } catch (error) {
            console.log('[placeBetSaga]', error)
            toast.error('Cannot place bet')
        }
    }
}

function* cashOutSaga() {
    while (true) {
        try {
            const { payload }: CommonTypes.Payload<GameBaseTypes.CashOutRequest> = yield take(gameSlice.onCashOut)
            const { data, status, error }: Interfaces.ResponseData<GameBaseTypes.PlaceBetReply> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.cashOut,
                    params: GameRequest.cashOutParams(payload)
                },
                false
            )
            if (status === 'SUCCESS' && data) {
                MB.messageBroker.publish(MessageBrokerKey.HILO_PLACE_CASH_OUT, data)
            } else {
                MB.messageBroker.publish(MessageBrokerKey.HILO_PLACE_CASH_OUT_ERROR, error)
            }
        } catch (error) {
            toast.error('Cannot cash out')
        }
    }
}

function* betInfoSaga() {
    while (true) {
        try {
            const { payload }: CommonTypes.Payload<GameBaseTypes.BetInfoRequest> = yield take(gameSlice.onFetchBetInfo)
            const { status }: Interfaces.ResponseData<GameBaseTypes.BetInfoReply> = yield call(
                withAuth,
                inhouseInstance,
                {
                    methodName: methods.betInfo,
                    params: GameRequest.getBetInfoParams(payload)
                },
                false
            )
            if (status === 'ERROR') toast.error('Failed to init bet info')
        } catch (error) {
            toast.error('Failed to init bet info')
            console.log('[betInfoSaga]', error)
        }
    }
}

export function* root() {
    yield all([
        fork(initGameConfig),
        // + play game
        fork(checkTurnExistedTurnSaga),
        fork(createNewTurnSaga),
        fork(placeBetSaga),
        fork(cashOutSaga),
        fork(betInfoSaga),
        fork(initBetInfoSaga),
        // + direct server
        fork(fetchLiveWalletBalanceSaga)
    ])
}
