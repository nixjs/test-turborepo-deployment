import { AuthTypes } from './base'

export namespace ForgotTypes {
    export interface ForgotParamRequest {
        email: string
    }
    export interface ResetPasswordParamRequest {
        otp: string
        password: string
        confirmPassword: string
    }
    export interface ResetPasswordResponse extends AuthTypes.BaseAuth {}
}
