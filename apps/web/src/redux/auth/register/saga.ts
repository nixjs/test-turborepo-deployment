import { put, take, fork, all, call, select } from 'redux-saga/effects'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import toast from 'react-hot-toast'
import { fromUnixTime } from 'date-fns'
import { Types, Interfaces } from '@athena20/ts-types'
import { ResponseErrorInterface } from '@athena20/ts-grpc'
import { ActivateRequest } from '@athena20/game-portal/user/rpc/activate_pb'
import { BaseEnum } from '@lottery/types'
import { Formatter, MB } from '@lottery/utils'
import { AuthTypes } from 'types/auth/base'
import { RegisterTypes } from 'types/auth/register'
import { AuthErrors, ERROR_TYPE } from 'errors/auth'
import { userInstance, withAuth } from 'services/grpc'
import { AuthConstant } from 'context/auth'
import { AuthViewRegisterStep } from 'redux/auth/types'
import * as authFunctionSaga from 'redux/auth/sagaFunction'
import * as authSlice from 'redux/auth/slice'
import { RequestMethods, AuthRegisterRequest } from 'services/grpc/request/auth'
import * as authAccountSelector from 'redux/auth/account/selectors'
import * as registerSlice from './slice'
import * as registerSelector from './selectors'

function* registerSaga() {
    while (true) {
        const {
            payload: { email, name }
        }: {
            payload: RegisterTypes.RegisterFormParams
        } = yield take(registerSlice.onRequestRegister)
        const { data, status, error }: Interfaces.ResponseData<RegisterTypes.RegisterResponse> = yield call(
            AuthRegisterRequest.registerRequest,
            { email, name }
        )

        yield put(registerSlice.onSetLoading(false))
        if (status === 'SUCCESS' && data?.otpVerificationToken) {
            yield put(registerSlice.onSetRegisterUIStep(AuthViewRegisterStep.OTP_VERIFICATION))
            yield put(registerSlice.onGetRegisterVerificationInfo(data.otpVerificationToken))
        } else {
            yield put(registerSlice.onGetRegisterFailed(error))
            if (error) {
                const { metadata, code } = error as ResponseErrorInterface
                if (metadata) {
                    if (code === 3 && metadata[Number(ERROR_TYPE.EMAIL_TAKEN)]) {
                        toast.error(AuthErrors[ERROR_TYPE.EMAIL_TAKEN].format().message)
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
                                blockedTime: Formatter.toDateConvert(fromUnixTime(blockExpiration), 'HH:mm:ss dd/MM/yyyy')
                            }).message
                        )
                        yield all([
                            put(registerSlice.onGetRegisterVerificationInfo(otpVerificationToken)),
                            put(registerSlice.onSetRegisterUIStep(AuthViewRegisterStep.OTP_VERIFICATION)),
                            put(authSlice.onSetMaxFailedAttempt(maxFailedAttempt)),
                            put(authSlice.onSetOTPLockedUserTimer(blockExpiration)),
                            put(registerSlice.onGetOTPVerificationFailed(error))
                        ])
                    }
                } else yield call(toast.error, AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST].format().message)
            }
        }
    }
}

function* OTPVerificationSaga(): any {
    while (true) {
        try {
            const { payload } = yield take(registerSlice.onRequestOTPVerification)
            const registerParams: RegisterTypes.RegisterFormParams = yield select(registerSelector.getRegisterParamsSelector())
            const token: string = yield select(registerSelector.getOTPVerificationTokenSelector())

            const request = new ActivateRequest()
            request.setOtp(payload).setPassword(registerParams.password)
            const { data, status, error }: Interfaces.ResponseData<RegisterTypes.RegisterResponse> = yield call(
                withAuth,
                userInstance,
                {
                    methodName: RequestMethods.ACTIVATE,
                    params: request
                },
                false,
                token
            )

            yield put(registerSlice.onSetLoading(false))
            if (status === 'SUCCESS' && data && data.accessToken) {
                yield authFunctionSaga.storageTokenAndProvider(
                    BaseEnum.AuthenticationProvider.AP_INTERNAL,
                    data.accessToken,
                    data.refreshToken
                )
                MB.messageBroker.publish(AuthConstant.MessageType, AuthConstant.MessageData.Register)
                yield all([
                    put(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.DEACTIVATE)),
                    put(authSlice.onSetLoggedIn(true)),
                    put(registerSlice.onResetStateToRetryRegister())
                ])
                // yield authFunctionSaga.initWebInternalSaga()
                // yield put(paymentSlice.onFetchCurrencies())
            }
            if (status === 'ERROR' && error) {
                yield put(registerSlice.onGetOTPVerificationFailed(error))
                const { metadata, code } = error as ResponseErrorInterface
                if (metadata) {
                    if (code === 3 && metadata[Number(ERROR_TYPE.WRONG_OTP)]) {
                        toast.error(AuthErrors[ERROR_TYPE.WRONG_OTP].format().message)
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
                                blockedTime: Formatter.toDateConvert(fromUnixTime(blockExpiration), 'dd/MM/yyyy HH:mm:ss')
                            }).message
                        )
                        yield put(authSlice.onSetMaxFailedAttempt(maxFailedAttempt))
                        yield put(authSlice.onSetOTPLockedUserTimer(blockExpiration))
                    } else {
                        toast.error(AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED].format().message)
                        yield all([put(registerSlice.onResetStateToRetryRegister()), put(authSlice.onSetOTPLockedResendTimer(null))])
                    }
                } else {
                    toast.error(AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST].format().message)
                    yield all([put(registerSlice.onResetStateToRetryRegister()), put(authSlice.onSetOTPLockedResendTimer(null))])
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

function* requestResendOTPSaga() {
    while (true) {
        yield take(registerSlice.onRequestToResendOTP)
        const token: string = yield select(registerSelector.getOTPVerificationTokenSelector())

        const { status, error }: Interfaces.ResponseData<RegisterTypes.RegisterResponse> = yield call(
            withAuth,
            userInstance,
            {
                methodName: RequestMethods.RESEND_OTP,
                params: new pbjs.Empty()
            },
            false,
            token
        )

        if (status === 'SUCCESS') {
            const serviceConfig: Types.Nullable<AuthTypes.UserServiceConfig> = yield select(authAccountSelector.getServiceConfigSelector())
            const blockedTime = (serviceConfig && Formatter.fromDuration2Minutes(serviceConfig.resetPassword.blockDuration)) || 1
            const availableTime = Number(Formatter.toTimestamp(new Date())) + blockedTime
            yield put(authSlice.onSetOTPLockedResendTimer(availableTime))
            yield call(toast.success, AuthErrors[ERROR_TYPE.OTP_HAS_BEEN_SEND].format().message)
        }
        if (status === 'ERROR' && error) {
            const { metadata } = error as ResponseErrorInterface
            if (metadata) {
                if (metadata[Number(ERROR_TYPE.OTP_INTERVAL_LIMIT)]) {
                    toast.error(AuthErrors[ERROR_TYPE.OTP_INTERVAL_LIMIT].format().message)
                }
            } else {
                yield call(toast.error, AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST].format().message)
                yield all([put(registerSlice.onResetStateToRetryRegister()), put(authSlice.onSetOTPLockedResendTimer(null))])
            }
            yield put(registerSlice.onRequestToResendOTPFailed(error))
        }
    }
}

export function* root() {
    yield all([fork(registerSaga), fork(OTPVerificationSaga), fork(requestResendOTPSaga)])
}
