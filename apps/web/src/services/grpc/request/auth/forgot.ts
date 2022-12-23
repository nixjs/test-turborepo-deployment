import { ResetPasswordRequest } from '@athena20/game-portal/user/rpc/reset_password_pb'
import { userInstance } from 'services/grpc'
import { RequestMethods } from './methods'

export namespace AuthForgotRequest {
    export const resetPasswordRequest = (email: string) => {
        const request = new ResetPasswordRequest()
        request.setEmail(email)
        return userInstance.send(RequestMethods.RESET_PASSWORD, request)
    }
}
