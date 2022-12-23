import { put, take, fork, all, call, select } from 'redux-saga/effects'
import toast from 'react-hot-toast'
import { Interfaces, Types } from '@athena20/ts-types'
import { ResponseErrorInterface } from '@athena20/ts-grpc'
import { Utils } from '@athena20/ts-grpc-socket'
import { ActivateRequest } from '@athena20/game-portal/user/rpc/activate_pb'
import { Formatter } from '@lottery/utils'
import { fromUnixTime } from 'date-fns'
import { AuthViewScreenState, AuthViewForgotStep } from 'redux/auth/types'
import { ForgotTypes } from 'types/auth/forgot'
import { AuthTypes } from 'types/auth/base'
import { AuthBaseRequest, AuthForgotRequest, RequestMethods } from 'services/grpc/request/auth'
import { withAuth, userInstance } from 'services/grpc'
import * as authSlice from 'redux/auth/slice'
import * as authAccountSelector from 'redux/auth/account/selectors'
import { AuthErrors, ERROR_TYPE } from 'errors/auth'
import * as forgotSlice from './slice'
import * as forgotSelector from './selectors'

function* forgotSaga() {
    while (true) {
        const { payload } = yield take(forgotSlice.onRequestForgot)

        const { data, status, error }: Interfaces.ResponseData<ForgotTypes.ResetPasswordResponse> = yield call(
            AuthForgotRequest.resetPasswordRequest,
            payload
        )

        yield put(forgotSlice.onSetLoading(false))
        if (status === 'SUCCESS' && data?.otpVerificationToken) {
            yield put(forgotSlice.onSetForgotUIStep(AuthViewForgotStep.RESET_PASSWORD))
            yield put(forgotSlice.onGetOTPVerificationToken(data.otpVerificationToken))
        } else {
            yield put(forgotSlice.onForgotFailed(error))
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
                                maxFailedAttempt,
                                blockedTime: Formatter.toDateConvert(fromUnixTime(blockExpiration), 'HH:mm:ss dd/MM/yyyy')
                            }).message
                        )
                        yield put(authSlice.onSetMaxFailedAttempt(maxFailedAttempt))
                        yield put(authSlice.onSetOTPLockedUserTimer(blockExpiration))
                    }
                } else {
                    yield call(toast.error, AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST].format().message)
                    yield all([put(forgotSlice.onResetStateToRetryForgot()), put(authSlice.onSetOTPLockedResendTimer(null))])
                }
            }
        }
    }
}

function* resetPasswordSaga() {
    while (true) {
        const { payload }: { payload: ForgotTypes.ResetPasswordParamRequest } = yield take(forgotSlice.onRequestToResetPassword)
        const forgotOtpVerificationToken: string = yield select(forgotSelector.getOTPVerificationTokenSelector())

        const request = new ActivateRequest()
        request.setOtp(payload.otp).setPassword(payload.password)
        const { status, error }: Interfaces.ResponseData<ForgotTypes.ResetPasswordResponse> = yield call(
            withAuth,
            userInstance,
            {
                methodName: RequestMethods.ACTIVATE,
                params: request
            },
            false,
            forgotOtpVerificationToken
        )

        yield put(forgotSlice.onSetLoading(false))
        if (status === 'SUCCESS') {
            yield put(forgotSlice.onResetStateToRetryForgot())
            yield put(authSlice.onSetAuthViewScreenState(AuthViewScreenState.LOGIN))
            toast.success('Password reset successfully. Sign in to continue.', {
                duration: 4000
            })
        } else {
            if (error) {
                const { metadata, code } = error as ResponseErrorInterface

                if (metadata) {
                    if (code === 3 && [Number(ERROR_TYPE.WRONG_OTP)]) {
                        toast.error(AuthErrors[ERROR_TYPE.WRONG_OTP].format().message)
                    } else if (
                        code === 10 &&
                        metadata[Number(ERROR_TYPE.BLOCKED)] &&
                        Number(metadata[Number(ERROR_TYPE.BLOCKED)].attempt) ===
                            Number(metadata[Number(ERROR_TYPE.BLOCKED)].maxFailedAttempt)
                    ) {
                        const { maxFailedAttempt, blockExpiration, otpVerificationToken } = metadata[ERROR_TYPE.BLOCKED]

                        toast.error(
                            AuthErrors[ERROR_TYPE.BLOCKED].format({
                                maxFailedAttempt,
                                blockedTime: Formatter.toDateConvert(fromUnixTime(blockExpiration), 'dd/MM/yyyy HH:mm:ss')
                            }).message
                        )

                        yield put(forgotSlice.onGetOTPVerificationToken(otpVerificationToken))
                        yield put(authSlice.onSetMaxFailedAttempt(maxFailedAttempt))
                        yield put(authSlice.onSetOTPLockedUserTimer(blockExpiration))
                        yield put(forgotSlice.onSetForgotUIStep(AuthViewForgotStep.RESET_PASSWORD))
                    }
                } else {
                    toast.error(AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED].format({ name: 'Please make a re-registration' }).message)
                    yield all([put(forgotSlice.onResetStateToRetryForgot()), put(authSlice.onSetOTPLockedResendTimer(null))])
                }
            }
            yield put(forgotSlice.onGetOTPVerificationFailed(error))
        }
    }
}

function* requestResendOTPSaga() {
    while (true) {
        yield take(forgotSlice.onRequestToResendOTP)
        const token: string = yield select(forgotSelector.getOTPVerificationTokenSelector())
        if (Utils.isTokenExpired(token)) {
            yield call(toast.error, AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED].format({ name: 'Please make to retry' }).message)
            yield all([put(forgotSlice.onResetStateToRetryForgot()), put(authSlice.onSetOTPLockedResendTimer(null))])
        } else {
            const { status, error }: Interfaces.ResponseData<null> = yield call(AuthBaseRequest.resendOTPRequest, token)

            if (status === 'SUCCESS') {
                const serviceConfig: Types.Nullable<AuthTypes.UserServiceConfig> = yield select(
                    authAccountSelector.getServiceConfigSelector()
                )
                const blockedTime = (serviceConfig && Formatter.fromDuration2Minutes(serviceConfig.resetPassword.blockDuration)) || 1
                const availableTime = Number(Formatter.toTimestamp(new Date())) + blockedTime
                yield put(authSlice.onSetOTPLockedResendTimer(availableTime))
                yield call(toast.success, AuthErrors[ERROR_TYPE.OTP_HAS_BEEN_SEND].format().message)
            } else {
                yield put(forgotSlice.onRequestToResendOTPFailed(error))
                const { metadata } = error as ResponseErrorInterface
                if (metadata) {
                    if (metadata[Number(ERROR_TYPE.OTP_INTERVAL_LIMIT)]) {
                        toast.error(AuthErrors[ERROR_TYPE.OTP_INTERVAL_LIMIT].format().message)
                    }
                } else {
                    yield call(toast.error, AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST].format().message)
                    yield all([put(forgotSlice.onResetStateToRetryForgot()), put(authSlice.onSetOTPLockedResendTimer(null))])
                }
            }
        }
    }
}

export function* root() {
    yield all([fork(forgotSaga), fork(resetPasswordSaga), fork(requestResendOTPSaga)])
}
