import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const getLoadingSelector = () => createSelector(rootSelector, (item) => item.loading)
export const getForgotParamSelector = () => createSelector(rootSelector, (item) => item.forgotParams)
export const getForgotUIStepSelector = () => createSelector(rootSelector, (item) => item.forgotUIStep)
export const getResetPasswordTokenSelector = () => createSelector(rootSelector, (item) => item.resetPasswordToken)
export const getOTPVerificationTokenSelector = () => createSelector(rootSelector, (item) => item.otpVerificationToken)
export const getOTPVerificationFailedSelector = () => createSelector(rootSelector, (item) => item.verifyOTPFailed)
export const getResendOTPFailedFailedSelector = () => createSelector(rootSelector, (item) => item.resendOTPFailed)
