import { Types } from '@athena20/ts-types'
export interface PaymentState {
    fee: string
    subTotal: string
    total: string
    balance: Types.Nullable<{
        currencySymbol: string
        total: string
        available: string
    }>
}
