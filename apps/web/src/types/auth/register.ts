import * as registerPb from '@athena20/game-portal/user/rpc/register_pb'
import { AuthTypes } from './base'

export namespace RegisterTypes {
    export interface RegisterFormParams extends registerPb.RegisterInternalRequest.AsObject {
        name: string
        password: string
        confirmPassword: string
    }
    export interface RegisterRequest extends registerPb.RegisterInternalRequest.AsObject {}
    export interface RegisterResponse extends AuthTypes.BaseAuth {}
}
