import { fork, all, call, delay, put, take, race } from 'redux-saga/effects'
import { LinearBackOff, BaseBackOff } from '@athena20/ts-backoff'
// import { Types } from '@lottery/axios-client'
import { CoingeckoTypes } from 'types/coingecko'
import * as coingeckoSlice from './slice'

/**
 * Saga worker.
 */
function* pollPriceSaga(backOff: BaseBackOff, params: CoingeckoTypes.PriceParamRequest) {
    while (true) {
        try {
            const time = backOff.next()
            if (time === 25000) {
                backOff.reset()
            }

            // const result: Types.ResponseData<CoingeckoTypes.PriceResponse> = yield call(CoingeckoRequest.getPriceApi, params)
            // const { data, status }: Types.ResponseParser<CoingeckoTypes.PriceResponse> = yield call(
            //     responseParser<CoingeckoTypes.PriceResponse>,
            //     result
            // )

            // if (status === 'SUCCESS' && data) {
            //     const keys = {
            //         ethereum: 'ETH',
            //         tron: 'TRX',
            //         tether: 'USDT',
            //         bitcoin: 'BTC',
            //         binancecoin: 'BNB',
            //         'binance-usd': 'BUSD'
            //     } as any

            //     const ourObjects = Objectify.renameKeys(keys, data)
            //     yield put(coingeckoSlice.onSetCoingeckoPriceVersionUpdated(uuidv4()))
            //     yield put(coingeckoSlice.onSetCoingeckoPrice(ourObjects))
            // }

            if (time > 0) yield delay(time)
            yield delay(time)
        } catch (err) {
            yield put(coingeckoSlice.onSetCoingeckoPriceFailure(err))
        }
    }
}

/**
 * Saga watcher.
 */
function* watchPriceSaga() {
    while (true) {
        const { payload }: { payload: CoingeckoTypes.PriceParamRequest } = yield take(coingeckoSlice.onStartCoingeckoPrice)

        const backOff = new LinearBackOff(0, 10000, 25000)
        yield race({
            //4. Start the polling worker
            task: call(pollPriceSaga, backOff, payload),
            //5. Start a take effect waiting for the cancel action.
            cancel: take(coingeckoSlice.onStopCoingeckoPrice)
        })
    }
}

export function* root() {
    yield all([fork(watchPriceSaga)])
}
