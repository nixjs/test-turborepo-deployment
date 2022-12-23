import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    fetchUser,
    getUser,
    setInternalInfo,
    setSocialInfo,
    setWalletInfo,
    fetchServiceConfig,
    getServiceConfig,
    getServiceConfigFailure,
    resetAuthAccountState
} from './reducers'

export const KEY_REDUCER_SAGA = '@auth/account'

const authUserSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onFetchUser: fetchUser,
        onGetUser: getUser,
        onSetInternalInfo: setInternalInfo,
        onSetSocialInfo: setSocialInfo,
        onSetWalletInfo: setWalletInfo,
        onFetchServiceConfig: fetchServiceConfig,
        onGetServiceConfig: getServiceConfig,
        onGetServiceConfigFailure: getServiceConfigFailure,
        onResetAuthAccountState: resetAuthAccountState
    }
})

export const {
    onFetchUser,
    onGetUser,
    onSetInternalInfo,
    onSetSocialInfo,
    onSetWalletInfo,
    onFetchServiceConfig,
    onGetServiceConfig,
    onGetServiceConfigFailure,
    onResetAuthAccountState
} = authUserSlice.actions

export const authUserReducer = authUserSlice.reducer
