import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { LoginTypes } from 'types/auth/login'
import { AuthSocialState } from './types'

export const initialState = {
    loading: false,
    provider: null,
    error: null
} as AuthSocialState

export const requestLoginBySocial = (
    _state: Partial<AuthSocialState>,
    _action: PayloadAction<LoginTypes.LoginSocialRequest>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
) => {}

export const setLoading = (
    state: Partial<AuthSocialState>,
    action: PayloadAction<
        Types.Nullable<{
            provider: BaseEnum.AuthenticationProvider
            loading: boolean
        }>
    >
) => {
    const { payload } = action
    state.loading = payload?.loading
    state.provider = payload?.provider || null
}

export const getLoginFailed = (state: Partial<AuthSocialState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.error = payload
}
