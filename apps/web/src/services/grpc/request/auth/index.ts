import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { userInstance, setAuthorization } from 'services/grpc'
import { RequestMethods } from './methods'
export * from './register'
export * from './login'
export * from './forgot'
export * from './account'
export * from './methods'

export namespace AuthBaseRequest {
    export const refreshTokenRequest = (accessToken: string) => {
        return userInstance.send(RequestMethods.REFRESH_TOKEN, new pbjs.Empty(), setAuthorization(accessToken))
    }

    export const resendOTPRequest = (accessToken: string) => {
        return userInstance.send(RequestMethods.RESEND_OTP, new pbjs.Empty(), setAuthorization(accessToken))
    }
}
