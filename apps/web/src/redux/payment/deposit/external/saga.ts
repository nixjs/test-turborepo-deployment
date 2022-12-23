import { take, fork, all, put, call, select } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { Types, Interfaces } from '@athena20/ts-types'
import { ethers, WalletProvider, HexParser, TronLink, NETWORK_WALLET, BaseProvider } from '@athena20/ts-wallet'
import { BaseEnum, PaymentTypes } from '@lottery/types'
import { Formatter } from '@lottery/utils'
import { SelectNetworkProps } from 'types/payment'
import * as depositSelector from 'redux/payment/deposit/selectors'
import * as depositExternalSlice from './slice'
import { DepositAPI } from './api'

function* connectWalletSaga() {
    while (true) {
        try {
            const {
                payload: { provider }
            }: { payload: { type: BaseEnum.WalletProvider; provider: WalletProvider } } = yield take(depositExternalSlice.onConnectWallet)

            const tokenByNetworkSelected: Types.Nullable<PaymentTypes.Token> = yield select(
                depositSelector.depsTokenListByNetworkSelectedSelector()
            )
            if (!tokenByNetworkSelected) {
                yield put(depositExternalSlice.onSetAvailableBalance())
            }

            const networkValid: boolean = yield call(networkValidSaga, provider.instance)
            if (networkValid) {
                let balanceResult: Interfaces.ResponseData<HexParser>
                if (tokenByNetworkSelected?.smartContractAddress && tokenByNetworkSelected.smartContractAddress.length > 0) {
                    balanceResult = yield call(
                        DepositAPI.getTokenBalance,
                        provider.instance,
                        tokenByNetworkSelected.smartContractAddress,
                        tokenByNetworkSelected.decimals
                    )
                } else {
                    balanceResult = yield call(DepositAPI.getBalance, provider.instance)
                }
                balanceResult = yield call(DepositAPI.getBalance, provider.instance)
                if (balanceResult.status === 'SUCCESS') {
                    yield all([
                        put(depositExternalSlice.onSetDepsExternalWalletConnectState('CONNECTED')),
                        put(depositExternalSlice.onSetAvailableBalance(balanceResult.data)),
                        put(depositExternalSlice.onSetAvailableBalanceVersion(uuidv4()))
                    ])
                }
            } else {
                yield put(depositExternalSlice.onSetDepsExternalWalletConnectState('FAILED'))
            }
        } catch (error) {
            yield put(depositExternalSlice.onSetDepsExternalWalletConnectState('FAILED'))
            toast.error(`Failed to connect wallet: ${JSON.stringify(error)}`)
        }
    }
}

function* fetchAvailableBalanceSaga() {
    while (true) {
        const {
            payload: { provider }
        }: {
            payload: { provider: WalletProvider }
        } = yield take(depositExternalSlice.onFetchAvailableBalance)
        const tokenByNetworkSelected: Types.Nullable<PaymentTypes.Token> = yield select(
            depositSelector.depsTokenListByNetworkSelectedSelector()
        )
        if (!tokenByNetworkSelected) {
            yield put(depositExternalSlice.onSetAvailableBalance())
        }

        const networkValid: boolean = yield call(networkValidSaga, provider.instance)
        if (networkValid) {
            let balanceResult: Interfaces.ResponseData<HexParser>
            if (tokenByNetworkSelected?.smartContractAddress && tokenByNetworkSelected.smartContractAddress.length > 0) {
                balanceResult = yield call(
                    DepositAPI.getTokenBalance,
                    provider.instance,
                    tokenByNetworkSelected.smartContractAddress,
                    tokenByNetworkSelected.decimals
                )
            } else {
                balanceResult = yield call(DepositAPI.getBalance, provider.instance)
            }
            if (balanceResult.status === 'SUCCESS') {
                yield all([
                    put(depositExternalSlice.onSetAvailableBalance(balanceResult.data)),
                    put(depositExternalSlice.onSetAvailableBalanceVersion(uuidv4()))
                ])
            }
        }
    }
}

function* depositSaga() {
    while (true) {
        try {
            const {
                payload: { provider, amount }
            }: {
                payload: { provider: WalletProvider; amount: number }
            } = yield take(depositExternalSlice.onDeposit)

            const tokenByNetworkSelected: Types.Nullable<PaymentTypes.Token> = yield select(
                depositSelector.depsTokenListByNetworkSelectedSelector()
            )
            const depsCurrencyByNetworkSelected: Types.Undefined<PaymentTypes.DepositAddressInfo> = yield select(
                depositSelector.depsAddressByCurrencyByNetworkSelector()
            )

            const networkValid: boolean = yield call(networkValidSaga, provider.instance)
            if (networkValid) {
                if (depsCurrencyByNetworkSelected && depsCurrencyByNetworkSelected?.address?.length > 0) {
                    const toastId = toast.loading(
                        'Your deposit request is pending confirmation. Transaction will be processed and credited to your wallet in 3-5 minutes.'
                    )
                    let tx: Interfaces.ResponseData<ethers.providers.TransactionResponse | TronLink.TronTypes.TransactionResponse>
                    let ourAmount = amount
                    if (depsCurrencyByNetworkSelected.networkSymbol === BaseEnum.NetworkSymbol.NS_TRX && tokenByNetworkSelected?.decimals) {
                        ourAmount = Number(Formatter.toDecimal(ourAmount, tokenByNetworkSelected?.decimals))
                    }
                    if (tokenByNetworkSelected?.smartContractAddress && tokenByNetworkSelected.smartContractAddress.length > 0) {
                        tx = yield call(
                            DepositAPI.sendToken,
                            provider.instance,
                            tokenByNetworkSelected.smartContractAddress,
                            ourAmount,
                            depsCurrencyByNetworkSelected.address
                        ) as Interfaces.ResponseData<ethers.providers.TransactionResponse | TronLink.TronTypes.TransactionResponse>
                    } else {
                        tx = yield call(DepositAPI.sendNativeToken, provider.instance, depsCurrencyByNetworkSelected.address, ourAmount)
                    }
                    toast.dismiss(toastId)
                    if (tx.status === 'ERROR') {
                        toast.error(`Failed to deposit.`)
                    } else {
                        toast('Your transaction is processing please wait.')
                    }
                }
            }
            yield put(depositExternalSlice.onSetDepositLoading(false))
        } catch (error) {
            console.log(error)
        }
    }
}

function* networkValidSaga(instance: BaseProvider) {
    const depsNetworkSelected: Types.Nullable<SelectNetworkProps> = yield select(depositSelector.depsNetworkSelectedSelector())
    const networkRet: Interfaces.ResponseData<NETWORK_WALLET> = yield call(DepositAPI.getNetwork, instance)
    if (networkRet.status === 'ERROR' || depsNetworkSelected?.network !== networkRet.data) {
        toast.error(`You need to switch to network ${networkRet.data} to use. Current network: ${depsNetworkSelected?.network}`)
        return false
    }
    return true
}

export function* root() {
    yield all([fork(connectWalletSaga), fork(fetchAvailableBalanceSaga), fork(depositSaga)])
}
