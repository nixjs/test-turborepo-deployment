import { all, fork } from 'redux-saga/effects'
import * as gameRedux from 'redux/game'
import * as commonSaga from 'redux/common/saga'
import * as authSocialSaga from 'redux/auth/login/social/saga'
import * as authRegisterSaga from 'redux/auth/register/saga'
import * as authForgotSaga from 'redux/auth/forgot/saga'
import * as authInternalLoginSaga from 'redux/auth/login/internalLogin/saga'
import * as authWalletSaga from 'redux/auth/login/wallet/saga'
import * as authAccountSaga from 'redux/auth/account/saga'
import * as paymentSaga from 'redux/payment/saga'
import * as paymentDepsSaga from 'redux/payment/deposit/saga'
import * as paymentDepositExternalSaga from 'redux/payment/deposit/external/saga'
import * as coingeckoSaga from 'redux/coingecko/saga'

export default function* rootSaga() {
    yield all([
        fork(gameRedux.root),
        fork(commonSaga.root),
        fork(authSocialSaga.root),
        fork(authRegisterSaga.root),
        fork(authForgotSaga.root),
        fork(authInternalLoginSaga.root),
        fork(authWalletSaga.root),
        fork(authAccountSaga.root),
        fork(paymentSaga.root),
        fork(paymentDepsSaga.root),
        fork(paymentDepositExternalSaga.root),
        fork(coingeckoSaga.root)
    ])
}
