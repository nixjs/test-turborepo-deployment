import { userInstance } from 'services/grpc'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { RequestMethods } from './methods'

export namespace AuthAccountRequest {
    export const getServiceConfigRequest = () => userInstance.send(RequestMethods.SERVICE_CONFIG, new pbjs.Empty())
}
