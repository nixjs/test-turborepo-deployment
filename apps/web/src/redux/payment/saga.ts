import { take, fork, all, put, call, select, delay } from 'redux-saga/effects'
import toast from 'react-hot-toast'
import { produce } from 'immer'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { v4 as uuidv4 } from 'uuid'
import BigNumber from 'bignumber.js'
import { Interfaces } from '@athena20/ts-types'
import { Types } from '@athena20/ts-types'
import { PaymentTypes } from '@lottery/types'
import { CoingeckoTypes } from 'types/coingecko'
import { StorageServices } from 'services/localstorage'
import { paymentInstance, withAuth } from 'services/grpc'
import { PaymentBaseRequest, RequestMethods } from 'services/grpc/request/payment'
import * as paymentSlice from 'redux/payment/slice'
import * as depositSlice from 'redux/payment/deposit/slice'
import * as paymentSelector from 'redux/payment/selectors'
import * as coingeckoSelector from 'redux/coingecko/selectors'
import { UpdateBalance } from './types'

function* fetchCurrencyConfigSaga() {
    while (true) {
        yield take(paymentSlice.onFetchCurrencyConfig)
        const { data, status }: Interfaces.ResponseData<{ currenciesList: PaymentTypes.Currency[] }> = yield call(
            PaymentBaseRequest.getCurrencyConfig
        )

        if (status === 'SUCCESS' && data) {
            yield put(paymentSlice.onGetCurrencyConfig(data.currenciesList))
            const token: Types.Nullable<string> = yield call(StorageServices.getAccessToken)
            if (token) {
                yield put(paymentSlice.onFetchBalances())
            }
        }
    }
}

function* fetchBalancesSaga() {
    while (true) {
        try {
            yield take(paymentSlice.onFetchBalances)
            const { data, status }: Interfaces.ResponseData<{ balancesList: PaymentTypes.Balance[] }> = yield call(
                withAuth,
                paymentInstance,
                {
                    methodName: RequestMethods.GET_BALANCES,
                    params: new pbjs.Empty()
                },
                true
            )

            const currencies: PaymentTypes.Currency[] = yield select(paymentSelector.currencyConfigSelector())

            if (status === 'SUCCESS' && data) {
                const baseBalance: PaymentTypes.Balance[] = []
                if (data?.balancesList.length === 0 || !data) {
                    for (let i = 0; i < currencies.length; i++) {
                        const c = currencies[i]
                        baseBalance.push({
                            currencySymbol: c.symbol,
                            displayName: c.displayName,
                            total: '0.00000000',
                            available: '0.00000000',
                            metadataMap: [],
                            timestamp: 0,
                            userId: ''
                        })
                    }
                } else {
                    for (let i = 0; i < currencies.length; i++) {
                        const c = currencies[i]
                        const b = data.balancesList.find((s) => s.currencySymbol === c.symbol)
                        if (b) {
                            baseBalance.push({ ...b, displayName: c.displayName })
                        } else {
                            baseBalance.push({
                                currencySymbol: c.symbol,
                                displayName: c.displayName,
                                total: '0.00000000',
                                available: '0.00000000',
                                metadataMap: [],
                                timestamp: 0,
                                userId: ''
                            })
                        }
                    }
                }
                yield put(paymentSlice.onSetBalances(baseBalance))
                yield put(paymentSlice.onSetBalanceVersion(uuidv4()))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

/**
 * @deprecated
 */
function* updateBalanceSaga() {
    try {
        while (true) {
            const { payload }: { payload: UpdateBalance } = yield take(paymentSlice.onUpdateBalance)
            yield delay(10)
            if (payload) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { animate, available, symbol } = payload
                const balances: PaymentTypes.Balance[] = yield select(paymentSelector.balancesSelector())
                const i = balances.findIndex((b) => b.currencySymbol === symbol)
                if (i !== -1) {
                    // const prev = balances[i]
                    if (animate) {
                        // const p = new BigNumber(available).minus(new BigNumber(prev.available))
                        // yield put(walletSlice.onSetHeaderPayoutAmount(p.toFixed()))
                        const n = balances.map((b) => (b.currencySymbol === symbol ? { ...b, available } : b))
                        yield put(paymentSlice.onSetBalances(n))
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function* fetchEstimatedBalanceSaga() {
    while (true) {
        yield take(paymentSlice.onFetchEstimatedBalance)
        const balances: PaymentTypes.Balance[] = yield select(paymentSelector.balancesSelector())
        const priceDict: CoingeckoTypes.PriceResponse = yield select(coingeckoSelector.priceDictSelector())
        let total = 0
        if (balances.length > 0 && priceDict) {
            for (let b = 0; b < balances.length; b++) {
                const element = balances[b]
                const { currencySymbol, available } = element
                const ourPrice = priceDict[currencySymbol]

                total += new BigNumber(available).times(ourPrice.usd).toNumber()
            }
        }
        yield put(paymentSlice.onSetEstimatedBalance(total.toString()))
    }
}

function* executeBalanceChangeNotificationSaga() {
    while (true) {
        const { payload }: { payload: PaymentTypes.BalanceNotification } = yield take(paymentSlice.onExecuteBalanceChangeNotification)
        const balances: PaymentTypes.Balance[] = yield select(paymentSelector.balancesSelector())
        let baseBalance: PaymentTypes.Balance[] = []
        if (balances.length > 0) {
            baseBalance = produce(balances, (draft) => {
                for (let i = 0; i < draft.length; i++) {
                    const b = draft[i]
                    if (b.currencySymbol === payload.symbol) {
                        b.total = payload.total
                        b.available = payload.available
                        b.timestamp = payload.timestamp
                    }
                }
            })
        } else {
            const currencies: PaymentTypes.Currency[] = yield select(paymentSelector.currencyConfigSelector())
            for (let i = 0; i < currencies.length; i++) {
                const c = currencies[i]
                if (c.symbol === payload.symbol) {
                    baseBalance.push({
                        currencySymbol: c.symbol,
                        displayName: c.displayName,
                        total: payload.total,
                        available: payload.available,
                        metadataMap: [],
                        timestamp: payload.timestamp,
                        userId: ''
                    })
                } else {
                    baseBalance.push({
                        currencySymbol: c.symbol,
                        displayName: c.displayName,
                        total: '0.00000000',
                        available: '0.00000000',
                        metadataMap: [],
                        timestamp: 0,
                        userId: ''
                    })
                }
            }
        }
        // yield put(paymentSlice.onFetchEstimatedBalance())
        yield put(paymentSlice.onSetBalances(baseBalance))
        yield put(paymentSlice.onSetBalanceVersion(uuidv4()))
    }
}

function* fetchWalletConfigSaga() {
    while (true) {
        yield take(paymentSlice.onFetchWalletConfig)
        const { data, status }: Interfaces.ResponseData<{ configList: PaymentTypes.WalletConfig[] }> = yield call(
            PaymentBaseRequest.getWalletConfig
        )

        if (status === 'SUCCESS' && data) {
            yield put(paymentSlice.onSetWalletConfig({ walletConfig: data.configList, version: uuidv4() }))
        }
    }
}

function* airdropSaga() {
    while (true) {
        yield take(paymentSlice.onAirdrop)
        const { status }: Interfaces.ResponseData<any> = yield call(
            withAuth,
            paymentInstance,
            {
                methodName: RequestMethods.INIT_BALANCE,
                params: new pbjs.Empty()
            },
            true
        )

        if (status === 'SUCCESS') {
            yield put(paymentSlice.onFetchCurrencyConfig())
            yield put(depositSlice.onFetchDepositAddresses())
            toast.success('Tokens successfully requested')
        } else {
            toast.error('Failed to request tokens')
        }
    }
}

export function* root() {
    yield all([
        fork(fetchCurrencyConfigSaga),
        fork(fetchBalancesSaga),
        fork(updateBalanceSaga),
        fork(fetchEstimatedBalanceSaga),
        fork(executeBalanceChangeNotificationSaga),
        fork(fetchWalletConfigSaga),
        fork(airdropSaga)
    ])
}
