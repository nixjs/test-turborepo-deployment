import { Client } from '@athena20/ts-grpc'
import { InhouseGamePromiseClient } from '@athena20/game-portal/inhouse-game/inhouse-game_grpc_web_pb'
import { Config } from 'configs/env'

const inhouseInstance = new Client(
    { url: Config.API_BASE_URL || '' },
    {
        debug: true,
        namespace: 'InHouse'
    }
)

inhouseInstance.connect(InhouseGamePromiseClient, true)

inhouseInstance.interceptorHeader(
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)
inhouseInstance.interceptorResponse(
    (response: any) => {
        return response && response?.toObject()
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)

inhouseInstance.configure()

export { inhouseInstance }
