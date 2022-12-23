import { put, take, fork, all, call } from 'redux-saga/effects'
import { fromUnixTime } from 'date-fns'
import { Interfaces } from '@athena20/ts-types'
import { ResponseErrorInterface } from '@athena20/ts-grpc'
import { BaseEnum } from '@lottery/types'
import { Formatter, MB } from '@lottery/utils'
import toast from 'react-hot-toast'
import { LoginTypes } from 'types/auth/login'
import { AuthConstant } from 'context/auth'
import { AuthErrors, ERROR_TYPE } from 'errors/auth'
import { AuthLoginRequest } from 'services/grpc/request/auth'
import * as authFunctionSaga from 'redux/auth/sagaFunction'
import * as authSlice from 'redux/auth/slice'
import * as internalLoginSlice from './slice'

function* loginSaga() {
    while (true) {
        try {
            const { payload }: { payload: LoginTypes.LoginInternalRequest } = yield take(internalLoginSlice.onRequestInternalLogin)
            const { data, status, error }: Interfaces.ResponseData<LoginTypes.LoginResponse> = yield call(AuthLoginRequest.loginRequest, {
                internalRequest: payload,
                appType: BaseEnum.AppType.AT_NONE
            })

            yield put(internalLoginSlice.onSetLoading(true))
            if (status === 'SUCCESS' && data && data.accessToken) {
                yield authFunctionSaga.storageTokenAndProvider(
                    BaseEnum.AuthenticationProvider.AP_INTERNAL,
                    data.accessToken,
                    data.refreshToken
                )
                yield all([put(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.DEACTIVATE)), put(authSlice.onSetLoggedIn(true))])
                yield authFunctionSaga.initWebInternalSaga()
                MB.messageBroker.publish(AuthConstant.MessageType, AuthConstant.MessageData.Login)
            } else {
                if (error) {
                    const { metadata, code } = error as ResponseErrorInterface
                    if (metadata) {
                        if (code === 3 && [Number(ERROR_TYPE.CREDENTIAL_INVALID)]) {
                            toast.error(AuthErrors[ERROR_TYPE.CREDENTIAL_INVALID].format().message)
                        } else if (
                            code === 10 &&
                            metadata[Number(ERROR_TYPE.BLOCKED)] &&
                            Number(metadata[Number(ERROR_TYPE.BLOCKED)].attempt) ===
                                Number(metadata[Number(ERROR_TYPE.BLOCKED)].maxFailedAttempt)
                        ) {
                            const { maxFailedAttempt, blockExpiration } = metadata[ERROR_TYPE.BLOCKED]

                            toast.error(
                                AuthErrors[ERROR_TYPE.BLOCKED].format({
                                    maxFailedAttempt: 0,
                                    blockedTime: Formatter.toDateConvert(fromUnixTime(blockExpiration), 'dd/MM/yyyy HH:mm:ss')
                                }).message
                            )
                            yield put(authSlice.onSetMaxFailedAttempt(maxFailedAttempt))
                            yield put(authSlice.onSetOTPLockedUserTimer(blockExpiration))
                        }
                    } else toast.error(AuthErrors[ERROR_TYPE.CREDENTIAL_INVALID].format().message)
                }
                yield put(internalLoginSlice.onGetLoginFailed(error))
            }
            yield put(internalLoginSlice.onSetLoading(false))
        } catch (error) {
            console.log(error)
        }
    }
}

function* logoutSaga() {
    while (true) {
        yield take(internalLoginSlice.onRequestLogout)
        yield authFunctionSaga.logoutSaga()
    }
}

export function* root() {
    yield all([fork(loginSaga), fork(logoutSaga)])
}
