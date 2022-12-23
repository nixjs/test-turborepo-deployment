import { WALLET_TYPE } from '@athena20/ts-wallet'

export const BaseWalletTypeInfo = {
    1: {
        key: 1,
        type: WALLET_TYPE.META_MASK,
        value: 'MetaMask'
    },
    2: {
        key: 2,
        type: WALLET_TYPE.BINANCE_CHAIN_WALLET,
        value: 'Binance Chain Wallet'
    },
    3: {
        key: 3,
        type: WALLET_TYPE.TRON_LINK,
        value: 'TRON Wallet'
    }
}
