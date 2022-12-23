import { Types, Interfaces } from '@athena20/ts-types'
import { BaseProvider, HexParser, NETWORK_WALLET, ethers, TronLink, TransactionRequest } from '@athena20/ts-wallet'

export namespace DepositAPI {
    export const getNetwork = (instance: BaseProvider) =>
        new Promise<Interfaces.ResponseData<Types.Nullable<NETWORK_WALLET>>>((resolve) => {
            instance
                .getNetwork()
                .then(resolve)
                .catch((error) =>
                    resolve({
                        error,
                        status: 'ERROR'
                    })
                )
        })
    export const getAddress = (instance: BaseProvider) =>
        new Promise<Interfaces.ResponseData<string>>((resolve) => {
            instance
                .getAddress()
                .then(resolve)
                .catch((error) =>
                    resolve({
                        error,
                        status: 'ERROR'
                    })
                )
        })

    export const getBalance = (instance: BaseProvider) =>
        new Promise<Interfaces.ResponseData<HexParser>>((resolve) => {
            instance
                .getBalance()
                .then(resolve)
                .catch((error) =>
                    resolve({
                        error,
                        status: 'ERROR'
                    })
                )
        })

    export const getTokenBalance = (instance: BaseProvider, contractAddress: string, decimals?: number) =>
        new Promise<Interfaces.ResponseData<HexParser>>((resolve) => {
            instance
                .getTokenBalance(contractAddress, decimals)
                .then(resolve)
                .catch((error) =>
                    resolve({
                        error,
                        status: 'ERROR'
                    })
                )
        })

    export const sendNativeToken = (instance: BaseProvider, address: string, amount: number) =>
        new Promise<Interfaces.ResponseData<ethers.providers.TransactionResponse | TronLink.TronTypes.TransactionResponse>>((resolve) => {
            instance
                .sendNativeToken(address, amount)
                .then(resolve)
                .catch((error) =>
                    resolve({
                        error,
                        status: 'ERROR'
                    })
                )
        })

    export const sendToken = (
        instance: BaseProvider,
        contractAddress: string,
        amount: number,
        to: string,
        options?: TransactionRequest | TronLink.TriggerSmartContractTypes.Option
    ) =>
        new Promise<Interfaces.ResponseData<ethers.providers.TransactionResponse | TronLink.TronTypes.TransactionResponse>>((resolve) => {
            instance
                .sendToken(contractAddress, amount, to, options)
                .then(resolve)
                .catch((error) =>
                    resolve({
                        error,
                        status: 'ERROR'
                    })
                )
        })
}
