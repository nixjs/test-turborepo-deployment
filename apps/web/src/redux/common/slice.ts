import { createSlice } from '@reduxjs/toolkit'
import { initialState, setCookieConsent, setMenu, setSocketInitiated, setToastID, dismissToast } from './reducers'

export const KEY_REDUCER_SAGA = '@common'

const commonSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetCookieConsent: setCookieConsent,
        onSetMenu: setMenu,
        onSetSocketInitiated: setSocketInitiated,
        onSetToastID: setToastID,
        onDismissToast: dismissToast
    }
})

export const { onSetCookieConsent, onSetMenu, onSetSocketInitiated, onSetToastID, onDismissToast } = commonSlice.actions
export default commonSlice.reducer
