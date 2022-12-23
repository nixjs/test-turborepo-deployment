import { LotteryCommonEnum } from '@lottery/types'

export namespace KenoConsts {
    export const Min = 1
    export const Max = 80
    export const Range = 10
    export const OrderStatus = {
        [LotteryCommonEnum.OrderStatus.OS_NOT_WIN]: 'Non-winning',
        [LotteryCommonEnum.OrderStatus.OS_WIN]: 'Winning',
        [LotteryCommonEnum.OrderStatus.OS_WAITING]: 'Waiting',
        [LotteryCommonEnum.OrderStatus.OS_NONE]: 'None'
    }
    export const TicketStatus = {
        [LotteryCommonEnum.OrderStatus.OS_NOT_WIN]: 'Non-winning',
        [LotteryCommonEnum.OrderStatus.OS_WIN]: 'Winning',
        [LotteryCommonEnum.OrderStatus.OS_WAITING]: 'Waiting',
        [LotteryCommonEnum.OrderStatus.OS_NONE]: 'None'
    }
    export const BaseQuery = {
        offset: 0,
        size: 20
    }
}
