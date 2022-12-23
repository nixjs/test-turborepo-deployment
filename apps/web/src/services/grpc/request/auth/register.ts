import { RegisterRequest, RegisterInternalRequest } from '@athena20/game-portal/user/rpc/register_pb'
import { RegisterTypes } from 'types/auth/register'
import { userInstance } from 'services/grpc'
import { RequestMethods } from './methods'

export namespace AuthRegisterRequest {
    export const registerRequest = (params: RegisterTypes.RegisterRequest) => {
        const { email, name } = params
        const request = new RegisterRequest()
        const r1 = new RegisterInternalRequest()
        r1.setEmail(email).setName(name)
        request.setInternalRequest(r1)
        return userInstance.send(RequestMethods.REGISTER, request)
    }
}
