import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { ForgotTypes } from 'types/auth/forgot'
import { AuthViewForgotStep } from 'redux/auth/types'
import { AuthForgotState } from './types'

export const initialState = {
    loading: false,
    forgotParams: null,
    forgotFailed: null,
    verifyOTPFailed: null,
    verifyOTPLoading: false,
    resetPasswordFailed: null,
    resetPasswordToken: null,
    forgotUIStep: AuthViewForgotStep.FORGOT_PARAMS_REQUEST
} as AuthForgotState

export const requestForgot = (state: Partial<AuthForgotState>, action: PayloadAction<string>) => {
    const { payload } = action
    state.forgotParams = payload
}

export const getOTPVerificationToken = (state: Partial<AuthForgotState>, action: PayloadAction<Types.Nullable<string>>) => {
    const { payload } = action
    state.otpVerificationToken = payload
}

export const forgotFailed = (state: Partial<AuthForgotState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.forgotFailed = payload
}

export const setLoading = (state: Partial<AuthForgotState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.loading = payload
}

export const setForgotUIStep = (state: Partial<AuthForgotState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.forgotUIStep = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const requestOTPVerification = (_state: Partial<AuthForgotState>, _action: PayloadAction<string>) => {}

export const getForgotPasswordToken = (state: Partial<AuthForgotState>, action: PayloadAction<Types.Nullable<string>>) => {
    const { payload } = action
    state.resetPasswordToken = payload
}

export const getOTPVerificationFailed = (state: Partial<AuthForgotState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.verifyOTPFailed = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const requestToResendOTP = (_state: Partial<AuthForgotState>, _action: PayloadAction<boolean>) => {}

export const requestToResendOTPFailed = (state: Partial<AuthForgotState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.resendOTPFailed = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const requestToResetPassword = (
    _state: Partial<AuthForgotState>,
    _action: PayloadAction<ForgotTypes.ResetPasswordParamRequest>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
) => {}

export const getResetPasswordFailed = (state: Partial<AuthForgotState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.resetPasswordFailed = payload
}

export const resetStateToRetryForgot = (state: Partial<AuthForgotState>) => {
    state.forgotParams = null
    state.forgotFailed = null
    state.verifyOTPFailed = null
    state.resetPasswordFailed = null
    state.otpVerificationToken = null
    state.forgotUIStep = AuthViewForgotStep.FORGOT_PARAMS_REQUEST
}
