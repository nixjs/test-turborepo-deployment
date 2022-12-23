/* eslint-disable @typescript-eslint/no-empty-function */
import { Types } from '@athena20/ts-types'
import { PayloadAction } from '@reduxjs/toolkit'
import { UserTypes } from '@lottery/types'
import { AuthTypes } from 'types/auth/base'
import { AccountState, UserProfile } from './types'

export const initialState = {
    userProfile: null,
    internal: null,
    social: null,
    wallet: null,
    serviceConfig: null,
    serviceConfigFailure: null
} as AccountState

export const fetchUser = () => {}

export const getUser = (state: Partial<AccountState>, action: PayloadAction<Types.Nullable<UserProfile>>) => {
    const { payload } = action
    state.userProfile = payload
}

export const setInternalInfo = (state: Partial<AccountState>, action: PayloadAction<Types.Nullable<UserTypes.UserInternalInfo>>) => {
    const { payload } = action
    state.internal = payload
}

export const setSocialInfo = (state: Partial<AccountState>, action: PayloadAction<Types.Nullable<UserTypes.UserSocialInfo[]>>) => {
    const { payload } = action
    state.social = payload
}

export const setWalletInfo = (state: Partial<AccountState>, action: PayloadAction<Types.Nullable<UserTypes.UserWalletInfo[]>>) => {
    const { payload } = action
    state.wallet = payload
}

export const fetchServiceConfig = () => {}
export const getServiceConfig = (state: Partial<AccountState>, action: PayloadAction<Types.Nullable<AuthTypes.UserServiceConfig>>) => {
    const { payload } = action
    state.serviceConfig = payload
}
export const getServiceConfigFailure = (state: Partial<AccountState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.serviceConfigFailure = payload
}
export const resetAuthAccountState = (state: Partial<AccountState>) => {
    state.userProfile = null
    state.internal = null
    state.social = null
    state.wallet = null
}
