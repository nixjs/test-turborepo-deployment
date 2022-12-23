import { put, call, all } from 'redux-saga/effects'
import { Types } from '@athena20/ts-types'
import { LocalStorageStatic as LocalStorage } from '@lottery/utils'
import { BaseEnum } from '@lottery/types'
import { MB } from '@lottery/utils'
import { STORAGE_KEY } from 'consts/storage'
import { StorageServices } from 'services/localstorage'
import { AuthConstant } from 'context/auth'
import * as authSlice from 'redux/auth/slice'
import * as authAccountSlice from 'redux/auth/account/slice'
import * as paymentSlice from 'redux/payment/slice'
import * as depositSlice from 'redux/payment/deposit/slice'

export function* storageTokenAndProvider(
    provider: BaseEnum.AuthenticationProvider,
    accessToken: Types.Nullable<string>,
    refreshToken: Types.Nullable<string>
) {
    yield call(StorageServices.storeAccessToken, accessToken || '')
    yield call(StorageServices.storeRefreshToken, refreshToken || '')
    yield call(StorageServices.storeProviderLogin, provider)
    yield put(authSlice.onSetProvider(provider))
}

export function* logoutSaga() {
    try {
        yield call(LocalStorage.clears, [STORAGE_KEY.ACCESS_TOKEN, STORAGE_KEY.REFRESH_TOKEN, STORAGE_KEY.PROVIDER, STORAGE_KEY.SYMBOL])
        yield all([put(authSlice.onSetProvider(BaseEnum.AuthenticationProvider.AP_NONE)), put(authSlice.onSetLoggedIn(false))])
        yield resetReducerSaga()
        MB.messageBroker.publish(AuthConstant.MessageType, AuthConstant.MessageData.Logout)
        // eslint-disable-next-line no-empty
    } catch (error) {
        console.log(error)
    }
}

export function* initWebInternalSaga() {
    // yield put(authAccountSlice.onFetchUser())
    // yield put(paymentSlice.onFetchBalances())
}

export function* resetReducerSaga() {
    yield all([
        put(authAccountSlice.onResetAuthAccountState()),
        put(paymentSlice.onResetPaymentState()),
        put(depositSlice.onResetDepositState())
    ])
}
