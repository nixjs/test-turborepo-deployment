export namespace DepositExternalTypes {
    export type ExternalWalletState = 'CONNECTED' | 'FAILED' | 'PROCESSING' | 'NONE'
    export type DepositRequest = {
        amount: number
    }
}
