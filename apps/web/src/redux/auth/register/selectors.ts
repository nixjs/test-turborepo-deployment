import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const getLoadingSelector = () => createSelector(rootSelector, (item) => item.loading)
export const getRegisterParamsSelector = () => createSelector(rootSelector, (item) => item.registerParams)
export const getRegisterFailedSelector = () => createSelector(rootSelector, (item) => item.registerFailed)
export const getRegisterUIStepSelector = () => createSelector(rootSelector, (item) => item.registerUIStep)
export const getOTPVerificationTokenSelector = () => createSelector(rootSelector, (item) => item.registerOtpVerificationToken)
export const getOTPVerificationFailedSelector = () => createSelector(rootSelector, (item) => item.verifyOTPFailed)
export const getResendOTPFailedFailedSelector = () => createSelector(rootSelector, (item) => item.resendOTPFailed)
