import { createSlice } from '@reduxjs/toolkit'
import { initialState, getLoginFailed, setLoading, requestInternalLogin, requestLogout, resetStateInternalLogin } from './reducers'

export const KEY_REDUCER_SAGA = '@auth/internalLogin'

const authInternalLoginSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onGetLoginFailed: getLoginFailed,
        onSetLoading: setLoading,
        onRequestInternalLogin: requestInternalLogin,
        onRequestLogout: requestLogout,
        onResetStateInternalLogin: resetStateInternalLogin
    }
})

export const { onRequestInternalLogin, onRequestLogout, onSetLoading, onGetLoginFailed } = authInternalLoginSlice.actions
export const authInternalLoginReducer = authInternalLoginSlice.reducer
