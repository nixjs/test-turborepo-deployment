import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const cookieConsentSelector = () => createSelector(rootSelector, (item) => item.triggerCookieConsent)
export const triggerMenuSelector = () => createSelector(rootSelector, (item) => item.triggerMenu)
export const socketInitiatedSelector = () => createSelector(rootSelector, (item) => item.socketInitiated)
export const toastIDSelector = () => createSelector(rootSelector, (item) => item.toastID)
