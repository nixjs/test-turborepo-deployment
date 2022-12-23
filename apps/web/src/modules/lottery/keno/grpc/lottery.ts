import { Client } from '@athena20/ts-grpc'
import { LotteryPromiseClient } from '@athena20/game-portal/lottery/lottery_grpc_web_pb'
import { Config } from 'configs/env'

const lotteryInstance = new Client(
    { url: Config.API_BASE_URL || '' },
    {
        debug: false,
        namespace: 'Lottery'
    }
)

lotteryInstance.connect(LotteryPromiseClient, true)
lotteryInstance.interceptorHeader(
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)
lotteryInstance.interceptorResponse(
    (response: any) => {
        return response && response?.toObject()
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)

lotteryInstance.configure()

export { lotteryInstance }
