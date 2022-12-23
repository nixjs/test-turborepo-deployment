import { Client } from '@athena20/ts-grpc'
import { UserPromiseClient } from '@athena20/game-portal/user/user_grpc_web_pb'
import { Config } from 'configs/env'

const userInstance = new Client(
    { url: Config.API_BASE_URL || '' },
    {
        debug: false,
        namespace: 'User'
    }
)

userInstance.connect(UserPromiseClient, true)
userInstance.interceptorHeader(
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)
userInstance.interceptorResponse(
    (response: any) => {
        return response && response?.toObject()
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)

userInstance.configure()

export { userInstance }
