import { FindConfigsByFiltersRequest, FindConfigsByFiltersReply } from '@athena20/game-portal/lottery/rpc/find_configs_by_filters_pb'
import { FirstConfigByFiltersRequest, FirstConfigByFiltersReply } from '@athena20/game-portal/lottery/rpc/first_config_by_filters_pb'
import { FindDrawsByFiltersRequest, FindDrawsByFiltersReply } from '@athena20/game-portal/lottery/rpc/find_draws_by_filters_pb'
import * as createOrderPb from '@athena20/game-portal/lottery/rpc/create_order_pb'
import { GetMyOrdersRequest, GetMyOrdersReply } from '@athena20/game-portal/lottery/rpc/get_my_orders_pb'
import { LotteryCommonTypes, LotteryCommonEnum, CommonTypes, BaseEnum } from '@lottery/types'

export namespace LotteryTypes {
    export interface FirstConfigRequest extends FirstConfigByFiltersRequest.AsObject {
        activated: BaseEnum.BoolFilter
        gameSymbol: BaseEnum.GameSymbol
    }
    export interface FirstConfigResponse extends FirstConfigByFiltersReply.AsObject {
        config?: LotteryCommonTypes.Config
    }

    export interface FindConfigRequest extends FindConfigsByFiltersRequest.AsObject {
        activated: BaseEnum.BoolFilter
        sortersList: CommonTypes.Sorter[]
        createdAt?: CommonTypes.DateRangeFilter
        gameSymbol: BaseEnum.GameSymbol
    }
    export interface FindConfigResponse extends FindConfigsByFiltersReply.AsObject {
        configsList: LotteryCommonTypes.Config[]
    }

    export interface DrawingConfig {
        disabled: boolean
        addMoreDays: number
        codeLen: number
        prefix: string
    }

    export interface OurTicketPriceDefault {
        symbol: string
        price: string
    }
    export interface OurTicket {
        numbers: number[]
        amount: number
        price: string
    }
    export interface DrawByDate {
        [date: string]: (LotteryCommonTypes.Draw & { ourDrawDate: string; ourDrawTime: string })[]
    }
    export interface FindDrawsRequest extends FindDrawsByFiltersRequest.AsObject {
        status: LotteryCommonEnum.DrawStatus
        createdAt?: CommonTypes.DateRangeFilter
        drawTime?: CommonTypes.DateRangeFilter
        sortersList: Array<CommonTypes.Sorter>
        gameSymbol: BaseEnum.GameSymbol
    }
    export interface FindDrawsResponse extends FindDrawsByFiltersReply.AsObject {
        drawsList: LotteryCommonTypes.Draw[]
    }
    export interface CreateOrderRequest extends createOrderPb.CreateOrderRequest.AsObject {
        ticketsList: Array<LotteryCommonTypes.TicketInput>
    }
    export interface OrdersRequest extends GetMyOrdersRequest.AsObject {
        gameSymbol: BaseEnum.GameSymbol
        status: LotteryCommonEnum.OrderStatus
        createdTime?: CommonTypes.DateRangeFilter
        sortersList: Array<CommonTypes.Sorter>
    }
    export interface OrdersResponse extends GetMyOrdersReply.AsObject {
        ordersList: Array<LotteryCommonTypes.Order>
    }
}
