import { Types } from '@athena20/ts-types'

export interface AuthForgotState {
    loading: boolean
    forgotParams: Types.Nullable<string>
    forgotFailed: any
    resetPasswordToken: Types.Nullable<string>
    otpVerificationToken: Types.Nullable<string>
    verifyOTPLoading: boolean
    verifyOTPFailed: any
    resetPasswordFailed: any
    resendOTPFailed: any
    forgotUIStep: number
}
