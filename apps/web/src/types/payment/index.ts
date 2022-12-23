export interface SelectNetworkProps {
    key: number
    value: string
    network: string
}

export type ExternalWalletState = 'CONNECTED' | 'FAILED' | 'PROCESSING' | 'NONE'
