import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { AuthState, AuthViewScreenState, AuthViewRegisterStep } from './types'

export const initialState = {
    isAuthModal: BaseEnum.ActivateState.DEACTIVATE,
    viewScreenState: AuthViewScreenState.NONE,
    registerStep: AuthViewRegisterStep.NONE,
    isSessionExpiredModal: BaseEnum.ActivateState.DEACTIVATE,
    toastId: null,
    provider: BaseEnum.AuthenticationProvider.AP_NONE,
    OTPLockedResendTimer: null,
    OTPLockedTimer: null,
    maxFailedAttempt: 0,
    verifyOTPFailed: null,
    verifyOTPSuccessful: null,
    loggedIn: false
} as AuthState

export const setProvider = (state: Partial<AuthState>, action: PayloadAction<BaseEnum.AuthenticationProvider>) => {
    const { payload } = action
    state.provider = payload
}

export const setAuthViewScreenState = (state: Partial<AuthState>, action: PayloadAction<AuthViewScreenState>) => {
    const { payload } = action
    state.viewScreenState = payload
}

export const setOpenAuthModal = (state: Partial<AuthState>, action: PayloadAction<BaseEnum.ActivateState>) => {
    const { payload } = action
    state.isAuthModal = payload
}

export const setAuthRegisterStep = (state: Partial<AuthState>, action: PayloadAction<AuthViewRegisterStep>) => {
    const { payload } = action
    state.registerStep = payload
}

export const setSessionExpiredModal = (state: Partial<AuthState>, action: PayloadAction<BaseEnum.ActivateState>) => {
    const { payload } = action
    state.isSessionExpiredModal = payload
}

export const setLoggedIn = (state: Partial<AuthState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.loggedIn = payload
}

export const setOTPLockedResendTimer = (state: Partial<AuthState>, action: PayloadAction<Types.Nullable<number>>) => {
    const { payload } = action
    state.OTPLockedResendTimer = payload
}

export const setOTPLockedUserTimer = (state: Partial<AuthState>, action: PayloadAction<Types.Nullable<number>>) => {
    const { payload } = action
    state.OTPLockedTimer = payload
}

export const setMaxFailedAttempt = (state: Partial<AuthState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.maxFailedAttempt = payload
}
