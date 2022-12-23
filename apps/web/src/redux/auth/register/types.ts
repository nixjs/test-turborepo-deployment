import { Types } from '@athena20/ts-types'
import { RegisterTypes } from 'types/auth/register'

export interface AuthRegisterState {
    loading: boolean
    registerParams: Types.Nullable<RegisterTypes.RegisterFormParams>
    registerOtpVerificationToken: Types.Nullable<string>
    registerFailed: any
    verifyOTPLoading: boolean
    verifyOTPFailed: any
    registerUIStep: number
    resendOTPFailed: any
    OTPValue: string
}
