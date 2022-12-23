import { Client } from '@athena20/ts-grpc'
import { PaymentPromiseClient } from '@athena20/game-portal/payment/payment_grpc_web_pb'
import { Config } from 'configs/env'

const paymentInstance = new Client(
    { url: Config.API_BASE_URL || '' },
    {
        debug: false,
        namespace: 'Payment'
    }
)

paymentInstance.connect(PaymentPromiseClient, true)
paymentInstance.interceptorHeader(
    (config: any) => {
        return config
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)
paymentInstance.interceptorResponse(
    (response: any) => {
        return response && response?.toObject()
    },
    (error: any) => {
        return Promise.resolve(error)
    }
)

paymentInstance.configure()

export { paymentInstance }
