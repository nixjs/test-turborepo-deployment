import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const getProviderSelector = () => createSelector(rootSelector, (item) => item.provider)
export const getOTPLockedResendTimerSelector = () => createSelector(rootSelector, (item) => item.OTPLockedResendTimer)
export const getOTPLockedUserSelector = () => createSelector(rootSelector, (item) => item.OTPLockedTimer)
export const getMaxFailedAttemptSelector = () => createSelector(rootSelector, (item) => item.maxFailedAttempt)
export const onGetViewScreenState = () => createSelector(rootSelector, (item) => item.viewScreenState)
export const onOpenAuthSelector = () => createSelector(rootSelector, (item) => item.isAuthModal)
export const onGetRegisterStepSelector = () => createSelector(rootSelector, (item) => item.registerStep)
// export const getOpenModalSelector = () => createSelector(rootSelector, (item) => item.isForgotModal)
export const getSessionExpiredSelector = () => createSelector(rootSelector, (item) => item.isSessionExpiredModal)
export const getLoggedInSelector = () => createSelector(rootSelector, (item) => item.loggedIn)
