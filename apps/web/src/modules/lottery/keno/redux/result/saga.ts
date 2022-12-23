import { Interfaces } from '@athena20/ts-types'
import toast from 'react-hot-toast'
import { all, put, fork, take, call } from 'redux-saga/effects'
import { LotteryCommonTypes } from '@lottery/types'
import { LotteryTypes } from 'modules/lottery/keno/types'
import { withAuth } from 'services/grpc'
import { lotteryInstance } from 'modules/lottery/keno/grpc/lottery'
import { RequestMethods } from 'modules/lottery/keno/grpc/request'
import { LotteryBaseRequest } from 'modules/lottery/keno/grpc/request'
import * as resultSlice from './slice'
import BigNumber from 'bignumber.js'

function* fetchOrdersSaga() {
    while (true) {
        try {
            const { payload }: { payload: LotteryTypes.OrdersRequest } = yield take(resultSlice.onFetchOrders)
            yield put(resultSlice.onSetLoadingOrders(true))
            const { data, status }: Interfaces.ResponseData<LotteryTypes.OrdersResponse> = yield call(
                withAuth,
                lotteryInstance,
                {
                    methodName: RequestMethods.GET_MY_ORDERS,
                    params: LotteryBaseRequest.ordersRequestParams(payload)
                },
                false
            )
            if (status === 'SUCCESS' && data?.ordersList) {
                const ourOrder = data.ordersList.map((order) => {
                    let total = '0'
                    for (let i = 0; i < order.ticketsList.length; i++) {
                        const target = order.ticketsList[i]
                        if (target.totalPrize.length > 0) total = new BigNumber(total).plus(new BigNumber(target.totalPrize)).toFixed()
                    }
                    return {
                        ...order,
                        orderPrize: total
                    } as LotteryCommonTypes.Order & { orderPrize: string }
                })
                yield put(resultSlice.onGetOrders(ourOrder))
                yield put(resultSlice.onSetOrdersTotal(data.total))
            } else {
                toast.error('Failed to get my orders.')
            }
            yield put(resultSlice.onSetLoadingOrders(false))
        } catch (_error) {
            yield put(resultSlice.onSetLoadingOrders(false))
        }
    }
}

export function* root() {
    yield all([fork(fetchOrdersSaga)])
}
