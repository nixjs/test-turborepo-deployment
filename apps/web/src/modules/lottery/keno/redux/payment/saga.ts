import { all, put, fork, take, select } from 'redux-saga/effects'
import BigNumber from 'bignumber.js'
import * as paymentSlice from './slice'
import * as paymentSelector from './selectors'

function* totalSaga() {
    while (true) {
        const { payload } = yield take(paymentSlice.onSetSubTotal)
        const fee: number = yield select(paymentSelector.feeSelector())
        const total = new BigNumber(payload).plus(new BigNumber(fee)).toFixed()
        yield put(paymentSlice.onSetTotal(total))
    }
}

export function* root() {
    yield all([fork(totalSaga)])
}
