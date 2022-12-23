import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    requestRegister,
    getRegisterVerificationInfo,
    registerFailed,
    setLoading,
    setRegisterUIStep,
    requestOTPVerification,
    getOTPVerificationFailed,
    requestToResendOTP,
    getResendOTPFailed,
    resetStateToRetryRegister
} from './reducers'

export const KEY_REDUCER_SAGA = '@auth/register'

const authRegisterSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetLoading: setLoading,
        onRequestRegister: requestRegister,
        onGetRegisterVerificationInfo: getRegisterVerificationInfo,
        onGetRegisterFailed: registerFailed,
        onSetRegisterUIStep: setRegisterUIStep,
        onRequestOTPVerification: requestOTPVerification,
        onGetOTPVerificationFailed: getOTPVerificationFailed,
        onRequestToResendOTP: requestToResendOTP,
        onRequestToResendOTPFailed: getResendOTPFailed,
        onResetStateToRetryRegister: resetStateToRetryRegister
    }
})

export const {
    onSetLoading,
    onRequestRegister,
    onGetRegisterVerificationInfo,
    onGetRegisterFailed,
    onSetRegisterUIStep,
    onRequestOTPVerification,
    onGetOTPVerificationFailed,
    onRequestToResendOTP,
    onRequestToResendOTPFailed,
    onResetStateToRetryRegister
} = authRegisterSlice.actions

export const authRegisterReducer = authRegisterSlice.reducer
