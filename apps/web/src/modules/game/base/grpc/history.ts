import { Client } from '@athena20/ts-grpc'
import { GameHistoryPromiseClient } from '@athena20/game-portal/game-history/game-history_grpc_web_pb'
import { Config } from 'configs/env'

const gameHistoryInstance = new Client(
    { url: Config.API_BASE_URL || '' },
    {
        debug: false,
        namespace: 'GameHistory'
    }
)

gameHistoryInstance.connect(GameHistoryPromiseClient, true)
gameHistoryInstance.interceptorHeader(
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)
gameHistoryInstance.interceptorResponse(
    (response: any) => {
        return response && response?.toObject()
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)

gameHistoryInstance.configure()

export { gameHistoryInstance }
