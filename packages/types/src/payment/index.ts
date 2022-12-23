import * as BalanceCommonPb from '@athena20/game-portal/common/balance_pb'
import * as CurrencyPb from '@athena20/game-portal/payment/model/currency_pb'
import * as BalancePb from '@athena20/game-portal/payment/model/balance_pb'
import * as TokenPb from '@athena20/game-portal/payment/model/token_pb'
import * as DepositInfoPb from '@athena20/game-portal/payment/model/deposit_info_pb'
import * as BaseEnum from '../enum'

export namespace PaymentTypes {
    export interface Balance extends BalancePb.Balance.AsObject {
        metadataMap: [string, string][]
        displayName: string
    }
    export interface BalanceNotificationChange {
        // symbol: string
        // displayName: string
        // balanceChangeType: BaseEnum.BalanceChangeType
        // gameSymbol: BaseEnum.GameSymbol
        available: string
        balanceChangeType: BaseEnum.BalanceChangeType
        gameSymbol: BaseEnum.GameSymbol
        symbol: string
        timestamp: number
        total: string
    }
    export interface BalanceNotification {
        available: string
        symbol: string
        timestamp: number
        total: string
    }
    export interface DepositBalanceNotification {
        amount: string
        symbol: string
        transactionId: string
    }
    export interface DepositAddress {
        address: string
        networkSymbol: string
        ownerId: string
    }

    export interface Token extends TokenPb.Token.AsObject {
        networkSymbol: BaseEnum.NetworkSymbol
        tokenStandard: BaseEnum.TokenStandard
    }
    export interface Currency extends CurrencyPb.Currency.AsObject {
        depositInfoList: DepositAddressInfo[]
    }
    export interface DepositAddressInfo extends DepositInfoPb.DepositInfo.AsObject {
        tokensList: Token[]
    }
    export interface WalletConfig {
        networkSymbol: BaseEnum.NetworkSymbol
        walletProvidersList: BaseEnum.WalletProvider[]
    }
}
