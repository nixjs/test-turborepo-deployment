import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    setLoading,
    setForgotUIStep,
    requestOTPVerification,
    getOTPVerificationToken,
    getOTPVerificationFailed,
    requestForgot,
    getForgotPasswordToken,
    forgotFailed,
    requestToResetPassword,
    getResetPasswordFailed,
    requestToResendOTP,
    requestToResendOTPFailed,
    resetStateToRetryForgot
} from './reducers'

export const KEY_REDUCER_SAGA = '@auth/forgot'

const authForgotSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetLoading: setLoading,
        onRequestForgot: requestForgot,
        onGetOTPVerificationToken: getOTPVerificationToken,
        onGetForgotPasswordToken: getForgotPasswordToken,
        onForgotFailed: forgotFailed,
        onSetForgotUIStep: setForgotUIStep,
        onRequestToResendOTP: requestToResendOTP,
        onRequestToResendOTPFailed: requestToResendOTPFailed,
        onRequestOTPVerification: requestOTPVerification,
        onGetOTPVerificationFailed: getOTPVerificationFailed,
        onRequestToResetPassword: requestToResetPassword,
        onGetResetPasswordFailed: getResetPasswordFailed,
        onResetStateToRetryForgot: resetStateToRetryForgot
    }
})

export const {
    onSetLoading,
    onRequestForgot,
    onGetOTPVerificationToken,
    onForgotFailed,
    onSetForgotUIStep,
    onRequestToResendOTP,
    onGetForgotPasswordToken,
    onRequestToResendOTPFailed,
    onRequestOTPVerification,
    onGetOTPVerificationFailed,
    onRequestToResetPassword,
    onGetResetPasswordFailed,
    onResetStateToRetryForgot
} = authForgotSlice.actions

export const authForgotReducer = authForgotSlice.reducer
