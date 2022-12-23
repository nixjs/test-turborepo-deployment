import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import { Sorter } from '@athena20/game-portal/common/sorter_pb'
import { DateRangeFilter } from '@athena20/game-portal/common/date_range_filter_pb'
import { FirstConfigByFiltersRequest } from '@athena20/game-portal/lottery/rpc/first_config_by_filters_pb'
import { FindDrawsByFiltersRequest } from '@athena20/game-portal/lottery/rpc/find_draws_by_filters_pb'
import { GetMyOrdersRequest } from '@athena20/game-portal/lottery/rpc/get_my_orders_pb'
import { CreateOrderRequest } from '@athena20/game-portal/lottery/rpc/create_order_pb'
import { TicketInput } from '@athena20/game-portal/lottery/model/ticket_input_pb'
import { SetOfNumber, KenoSetOfNumber } from '@athena20/game-portal/lottery/model/set_of_number_pb'
import { LotteryTypes } from 'modules/lottery/keno/types'
import { lotteryInstance } from 'modules/lottery/keno/grpc/lottery'
import { RequestMethods } from './methods'
export * from './methods'

export namespace LotteryBaseRequest {
    export const getConfig = (params: LotteryTypes.FirstConfigRequest) => {
        const request = new FirstConfigByFiltersRequest()
        request.setId(params.id).setGameSymbol(params.gameSymbol).setActivated(params.activated)
        return lotteryInstance.send(RequestMethods.FIRST_CONFIG_BY_FILTERS, request)
    }
    export const getDraws = (params: LotteryTypes.FindDrawsRequest) => {
        const request = new FindDrawsByFiltersRequest()
        const { code, page, size, sortersList, status, createdAt, drawTime, gameSymbol } = params

        request.setCode(code).setPage(page).setSize(size).setStatus(status).setGameSymbol(gameSymbol)

        if (sortersList && sortersList.length > 0) {
            const sorter: Sorter[] = []
            for (let i = 0; i < sortersList.length; i++) {
                const element = sortersList[i]
                const s = new Sorter()
                s.setField(element.field).setOrder(element.order)
                sorter.push(s)
            }
            request.setSortersList(sorter)
        }

        if (createdAt) {
            const c = new DateRangeFilter()
            const t1 = new Timestamp()
            const t2 = new Timestamp()
            if (createdAt.from) t1.setSeconds(createdAt.from.seconds)
            if (createdAt.to) t2.setSeconds(createdAt.to.seconds)
            c.setFrom(t1).setTo(t2)
            request.setCreatedAt(c)
        }

        if (drawTime) {
            const c = new DateRangeFilter()
            const t1 = new Timestamp()
            const t2 = new Timestamp()
            if (drawTime.from) t1.setSeconds(drawTime.from.seconds)
            if (drawTime.to) t2.setSeconds(drawTime.to.seconds)
            c.setFrom(t1).setTo(t2)
            request.setDrawTime(c)
        }

        return lotteryInstance.send(RequestMethods.FIND_DRAWS_BY_FILTERS, request)
    }

    export const createOrderRequestParams = (params: LotteryTypes.CreateOrderRequest) => {
        const request = new CreateOrderRequest()
        request.setGameSymbol(params.gameSymbol).setCurrencySymbol(params.currencySymbol)

        const ticketInputs: TicketInput[] = []
        for (let t = 0; t < params.ticketsList.length; t++) {
            const ticket = params.ticketsList[t]
            const ticketInput = new TicketInput()
            ticketInput.setDrawId(ticket.drawId)
            for (let n = 0; n < ticket.setOfNumbersList.length; n++) {
                const nums = ticket.setOfNumbersList[n]

                const setOfNumber = new SetOfNumber()

                const kenoSetOfNumber = new KenoSetOfNumber()
                if (nums.kenoSetOfNumber?.price) kenoSetOfNumber.setPrice(nums.kenoSetOfNumber?.price)
                if (nums.kenoSetOfNumber) kenoSetOfNumber.setNumbersList(nums.kenoSetOfNumber.numbersList)

                setOfNumber.setId(nums.id).setKenoSetOfNumber(kenoSetOfNumber)

                ticketInput.addSetOfNumbers(setOfNumber)
            }
            ticketInputs.push(ticketInput)
        }
        request.setTicketsList(ticketInputs)
        return request
    }
    export const ordersRequestParams = (params: LotteryTypes.OrdersRequest) => {
        const request = new GetMyOrdersRequest()

        const { gameSymbol, page, size, sortersList, status, createdTime } = params
        request.setPage(page).setSize(size).setStatus(status).setGameSymbol(gameSymbol)
        if (sortersList && sortersList.length > 0) {
            const sorter: Sorter[] = []
            for (let i = 0; i < sortersList.length; i++) {
                const element = sortersList[i]
                const s = new Sorter()
                s.setField(element.field).setOrder(element.order)
                sorter.push(s)
            }
            request.setSortersList(sorter)
        }
        if (createdTime) {
            const c = new DateRangeFilter()
            const t1 = new Timestamp()
            const t2 = new Timestamp()
            if (createdTime.from) t1.setSeconds(createdTime.from.seconds)
            if (createdTime.to) t2.setSeconds(createdTime.to.seconds)
            c.setFrom(t1).setTo(t2)
            request.setCreatedTime(c)
        }

        return request
    }
}
