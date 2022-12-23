import { createSlice } from '@reduxjs/toolkit'
import { initialState, requestLoginBySocial, setLoading, getLoginFailed } from './reducers'

export const KEY_REDUCER_SAGA = '@auth/social'

const authSocialSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetLoading: setLoading,
        onRequestLoginBySocial: requestLoginBySocial,
        onGetLoginFailed: getLoginFailed
    }
})

export const { onRequestLoginBySocial, onSetLoading, onGetLoginFailed } = authSocialSlice.actions
export const authSocialReducer = authSocialSlice.reducer
