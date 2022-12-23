import { PayloadAction } from '@reduxjs/toolkit'
import { AuthLoginState } from './types'

export const initialState = {
    error: null,
    loading: false
} as AuthLoginState

export const requestInternalLogin = (
    _state: Partial<AuthLoginState>,
    _action: PayloadAction<{
        email: string
        password: string
    }>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
) => {}

export const setLoading = (state: Partial<AuthLoginState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.loading = payload
}
export const getLoginFailed = (state: Partial<AuthLoginState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.error = payload
}

export const resetStateInternalLogin = (state: Partial<AuthLoginState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.error = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const requestLogout = () => {}
