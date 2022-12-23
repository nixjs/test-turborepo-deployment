import { put, take, fork, all, call } from 'redux-saga/effects'
import toast from 'react-hot-toast'
import { Interfaces } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { MB } from '@lottery/utils'
import { LoginTypes } from 'types/auth/login'
import { AuthConstant } from 'context/auth'
import { AuthErrors, ERROR_TYPE } from 'errors/auth'
import { AuthLoginRequest } from 'services/grpc/request/auth'
import * as authFunctionSaga from 'redux/auth/sagaFunction'
import * as authSlice from 'redux/auth/slice'
import * as socialSlice from './slice'

function* loginSaga() {
    while (true) {
        const {
            payload
        }: {
            payload: LoginTypes.LoginSocialRequest
        } = yield take(socialSlice.onRequestLoginBySocial)
        const { data, status, error }: Interfaces.ResponseData<LoginTypes.LoginResponse> = yield call(AuthLoginRequest.loginRequest, {
            socialRequest: payload,
            appType: BaseEnum.AppType.AT_NONE
        })

        if (status === 'SUCCESS' && data && data.accessToken) {
            yield authFunctionSaga.storageTokenAndProvider(BaseEnum.AuthenticationProvider.AP_INTERNAL, data.accessToken, data.refreshToken)
            yield all([put(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.DEACTIVATE)), put(authSlice.onSetLoggedIn(true))])
            yield authFunctionSaga.initWebInternalSaga()
            MB.messageBroker.publish(AuthConstant.MessageType, AuthConstant.MessageData.Login)
        } else {
            if (error) {
                toast.error(AuthErrors[ERROR_TYPE.CREDENTIAL_INVALID].format().message)
            }
            yield put(socialSlice.onGetLoginFailed(error))
        }
        yield put(
            socialSlice.onSetLoading({
                provider: payload.provider,
                loading: false
            })
        )
    }
}

export function* root() {
    yield all([fork(loginSaga)])
}
