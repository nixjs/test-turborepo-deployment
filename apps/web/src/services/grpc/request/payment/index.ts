import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { GetBalanceRequest } from '@athena20/game-portal/payment/rpc/get_balance_pb'
import { paymentInstance } from 'services/grpc'
import { RequestMethods } from './methods'
export * from './methods'

export namespace PaymentBaseRequest {
    export const getCurrencyConfig = () => paymentInstance.send(RequestMethods.GET_CURRENCY_CONFIG, new pbjs.Empty())
    export const getWalletConfig = () => paymentInstance.send(RequestMethods.GET_WALLET_CONFIG, new pbjs.Empty())
    export const getCurrencyBalanceParam = (currency: string) => {
        const request = new GetBalanceRequest()
        request.setCurrencySymbol(currency)
        return request
    }
}
