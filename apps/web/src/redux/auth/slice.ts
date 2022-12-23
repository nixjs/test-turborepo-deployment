import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    setAuthViewScreenState,
    setAuthRegisterStep,
    setOpenAuthModal,
    // setOpenForgotModal,
    setSessionExpiredModal,
    setOTPLockedResendTimer,
    setOTPLockedUserTimer,
    setMaxFailedAttempt,
    setProvider,
    setLoggedIn
} from './reducers'

export const KEY_REDUCER_SAGA = '@auth/root'

const authSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetAuthViewScreenState: setAuthViewScreenState,
        onSetAuthRegisterStep: setAuthRegisterStep,
        onSetOpenAuthModal: setOpenAuthModal,
        // onSetOpenForgotModal: setOpenForgotModal,
        onSetSessionExpiredModal: setSessionExpiredModal,
        onSetOTPLockedResendTimer: setOTPLockedResendTimer,
        onSetOTPLockedUserTimer: setOTPLockedUserTimer,
        onSetMaxFailedAttempt: setMaxFailedAttempt,
        onSetProvider: setProvider,
        onSetLoggedIn: setLoggedIn
    }
})

export const {
    onSetAuthViewScreenState,
    onSetAuthRegisterStep,
    onSetOpenAuthModal,
    // onSetOpenForgotModal,
    onSetSessionExpiredModal,
    onSetOTPLockedResendTimer,
    onSetOTPLockedUserTimer,
    onSetMaxFailedAttempt,
    onSetProvider,
    onSetLoggedIn
} = authSlice.actions
export default authSlice.reducer
