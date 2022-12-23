import { Types } from '@athena20/ts-types'
import { LotteryCommonTypes } from '@lottery/types'

export interface ResultState {
    orders: (LotteryCommonTypes.Order & { orderPrize: string })[]
    ordersTotal: number
    ordersLoading: boolean
    order: Types.Nullable<LotteryCommonTypes.Order & { orderPrize: string }>
    orderModal: boolean
}
