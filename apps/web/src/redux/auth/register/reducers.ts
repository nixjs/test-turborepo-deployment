import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { AuthViewRegisterStep } from 'redux/auth/types'
import { RegisterTypes } from 'types/auth/register'
import { AuthRegisterState } from './types'

export const initialState = {
    loading: false,
    registerParams: null,
    registerOtpVerificationToken: null,
    registerFailed: null,
    verifyOTPFailed: null,
    verifyOTPLoading: false,
    resendOTPFailed: null,
    registerUIStep: AuthViewRegisterStep.REGISTER_PARAMS_REQUEST
} as AuthRegisterState

export const requestRegister = (state: Partial<AuthRegisterState>, action: PayloadAction<RegisterTypes.RegisterFormParams>) => {
    const { payload } = action
    state.registerParams = payload
}

export const getRegisterVerificationInfo = (state: Partial<AuthRegisterState>, action: PayloadAction<Types.Nullable<string>>) => {
    const { payload } = action
    state.registerOtpVerificationToken = payload
}

export const registerFailed = (state: Partial<AuthRegisterState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.registerFailed = payload
}

export const setLoading = (state: Partial<AuthRegisterState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.loading = payload
}

export const setRegisterUIStep = (state: Partial<AuthRegisterState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.registerUIStep = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const requestOTPVerification = (_state: Partial<AuthRegisterState>, _action: PayloadAction<string>) => {}

export const getOTPVerificationFailed = (state: Partial<AuthRegisterState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.verifyOTPFailed = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const requestToResendOTP = (_state: Partial<AuthRegisterState>, _action: PayloadAction<boolean>) => {}

export const getResendOTPFailed = (state: Partial<AuthRegisterState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.resendOTPFailed = payload
}

export const resetStateToRetryRegister = (state: Partial<AuthRegisterState>) => {
    state.registerParams = null
    state.registerFailed = null
    state.registerOtpVerificationToken = null
    state.registerUIStep = AuthViewRegisterStep.REGISTER_PARAMS_REQUEST
    state.loading = false
}
