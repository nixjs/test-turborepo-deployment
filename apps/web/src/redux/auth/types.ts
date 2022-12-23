import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { AuthTypes } from 'types/auth/base'

export enum AuthViewScreenState {
    NONE,
    LOGIN,
    REGISTER,
    FORGOT_PASSWORD
}

export enum AuthViewRegisterStep {
    NONE,
    REGISTER_PARAMS_REQUEST,
    OTP_VERIFICATION
}

export enum AuthViewForgotStep {
    NONE,
    FORGOT_PARAMS_REQUEST,
    RESET_PASSWORD
}

export interface AuthState extends AuthTypes.Token {
    isAuthModal: BaseEnum.ActivateState
    viewScreenState: AuthViewScreenState
    registerStep: AuthViewRegisterStep
    isSessionExpiredModal: BaseEnum.ActivateState
    toastId: Types.Nullable<string>
    provider: BaseEnum.AuthenticationProvider
    OTPLockedResendTimer: Types.Nullable<number>
    OTPLockedTimer: Types.Nullable<number>
    maxFailedAttempt: number
    verifyOTPFailed: any
    verifyOTPSuccessful: any
    loggedIn: boolean
}
