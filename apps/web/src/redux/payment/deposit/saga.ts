import { take, fork, all, put, call } from 'redux-saga/effects'
import toast from 'react-hot-toast'
import { Interfaces } from '@athena20/ts-types'
import { GetDepositAddressesRequest } from '@athena20/game-portal/payment/rpc/get_deposit_addresses_pb'
import { PaymentTypes } from '@lottery/types'
import { paymentInstance, withAuth } from 'services/grpc'
import { RequestMethods } from 'services/grpc/request/payment'
import * as depositSlice from './slice'

function* fetchDepositAddressesSaga() {
    while (true) {
        yield take(depositSlice.onFetchDepositAddresses)
        const request = new GetDepositAddressesRequest()
        const {
            data,
            status
        }: Interfaces.ResponseData<{
            currenciesList: PaymentTypes.Currency[]
        }> = yield call(
            withAuth,
            paymentInstance,
            {
                methodName: RequestMethods.GET_DEPOSIT_ADDRESSES,
                params: request
            },
            true
        )

        if (status === 'SUCCESS' && data?.currenciesList) {
            yield put(depositSlice.onGetDepositAddresses(data.currenciesList))
        } else {
            toast.error('Failed to load deposit addresses')
        }
    }
}

export function* root() {
    yield all([fork(fetchDepositAddressesSaga)])
}
