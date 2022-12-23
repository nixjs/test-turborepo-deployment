import { Types } from '@athena20/ts-types'
import { PayloadAction } from '@reduxjs/toolkit'
import { CommonState } from './types'

export const initialState = {
    triggerCookieConsent: false,
    triggerMenu: false,
    socketInitiated: null,
    toastID: null
} as CommonState

export const setCookieConsent = (state: Partial<CommonState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.triggerCookieConsent = payload
}
export const setMenu = (state: Partial<CommonState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.triggerMenu = payload
}
export const setSocketInitiated = (state: Partial<CommonState>, action: PayloadAction<Types.Nullable<number | string>>) => {
    const { payload } = action
    state.socketInitiated = payload
}
export const setToastID = (state: Partial<CommonState>, action: PayloadAction<Types.Nullable<string>>) => {
    const { payload } = action
    state.toastID = payload
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const dismissToast = (_state: Partial<CommonState>, _action: PayloadAction<string>) => {}
