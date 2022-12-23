import { Types, Interfaces } from '@athena20/ts-types'
import { Objectify } from '@athena20/ts-objectify'
import toast from 'react-hot-toast'
import { fromUnixTime } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { produce } from 'immer'
import { all, put, fork, take, select, call } from 'redux-saga/effects'
import { BaseEnum, LotteryCommonTypes, BaseConst, LotteryCommonEnum } from '@lottery/types'
import { Formatter, Randomize, Arrays } from '@lottery/utils'
import { withAuth } from 'services/grpc'
import { LotteryTypes } from 'modules/lottery/keno/types'
import { KenoConsts } from 'modules/lottery/keno/consts'
import { lotteryInstance } from 'modules/lottery/keno/grpc/lottery'
import { RequestMethods } from 'modules/lottery/keno/grpc/request'
import { LotteryBaseRequest } from 'modules/lottery/keno/grpc/request'
import * as resultSlice from 'modules/lottery/keno/redux/result/slice'
import * as paymentSlice from 'modules/lottery/keno/redux/payment/slice'
import * as gameSlice from './slice'
import * as gameSelector from './selectors'

function ticketByQuantity(quantity: number, price: LotteryTypes.OurTicketPriceDefault) {
    const tickets: Types.Object<LotteryTypes.OurTicket> = {}
    for (let index = 0; index < quantity; index++) {
        Object.assign(tickets, {
            [uuidv4()]: {
                numbers: [],
                amount: 0,
                price: price.price
            }
        })
    }
    return tickets
}

function ticketPriceDefault(list: LotteryCommonTypes.TicketPrice[]) {
    const ticketPrice = list.find((p) => p.symbol === BaseConst.Currency.UnitDefault)
    if (ticketPrice && ticketPrice.symbol) {
        return {
            symbol: ticketPrice.symbol,
            price: ticketPrice.valuesList[0]
        }
    } else {
        const firstTicketPrice = list[0]
        return {
            symbol: firstTicketPrice.symbol,
            price: firstTicketPrice.valuesList[0]
        }
    }
}

function* fetchConfigSaga() {
    while (true) {
        const { payload }: { payload: LotteryTypes.FirstConfigRequest } = yield take(gameSlice.onFetchConfig)
        const { status, data }: Interfaces.ResponseData<LotteryTypes.FirstConfigResponse> = yield call(
            LotteryBaseRequest.getConfig,
            payload
        )
        if (status === 'SUCCESS' && data?.config) {
            const {
                config: { luckyNumberFrom, luckyNumberTo, minSpot, maxSpot, ticketPricesList, drawingConfig }
            } = data
            const price = ticketPriceDefault(ticketPricesList)
            yield put(gameSlice.onGetConfig(data))
            yield put(gameSlice.onSetTicketPriceDefault(price))
            yield put(
                gameSlice.onInitNumbers({
                    min: luckyNumberFrom,
                    max: luckyNumberTo
                })
            )
            yield put(
                gameSlice.onInitSpots({
                    min: minSpot,
                    max: maxSpot
                })
            )
            yield put(gameSlice.onSetSpotSelected(maxSpot))
            yield put(gameSlice.onSetSpotDefault(maxSpot))
            yield put(gameSlice.onSetDrawingConfig(drawingConfig))
            yield put(
                gameSlice.onInitTicket({
                    quantity: 5,
                    price
                })
            )
        } else {
            toast.error('Failed to get Keno config.')
        }
    }
}

function* initTicketSaga() {
    while (true) {
        const { payload }: { payload: { quantity: number; price: LotteryTypes.OurTicketPriceDefault } } = yield take(gameSlice.onInitTicket)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield call(ticketByQuantity, payload.quantity, payload.price)
        yield put(gameSlice.onSetTicketOrder(tickets))
        yield put(gameSlice.onSetTicketSession(tickets))
    }
}

function* initNumberSaga() {
    while (true) {
        const {
            payload: { min, max }
        }: { payload: { min: number; max: number } } = yield take(gameSlice.onInitNumbers)
        const numbers: number[] = []
        for (let index = min; index < max + 1; index++) {
            numbers.push(index)
        }
        yield put(gameSlice.onSetNumbers(numbers))
    }
}

function* initSpotSaga() {
    while (true) {
        const {
            payload: { min, max }
        }: { payload: { min: number; max: number } } = yield take(gameSlice.onInitSpots)
        const numbers: number[] = []
        for (let index = min; index < max + 1; index++) {
            numbers.push(index)
        }
        yield put(gameSlice.onSetSpots(numbers))
    }
}

function* initDrawSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onFetchDraw)

        const { status, data }: Interfaces.ResponseData<LotteryTypes.FindDrawsResponse> = yield call(LotteryBaseRequest.getDraws, payload)

        if (status === 'SUCCESS' && data?.drawsList) {
            const ourDrawsList = data.drawsList.map((d) => ({
                ...d,
                ourDrawDate: Formatter.toDate(fromUnixTime(d.drawTime), 'dd/MM/yyyy'),
                ourDrawTime: Formatter.toDate(fromUnixTime(d.drawTime), 'HH:mm')
            }))
            yield all([
                put(gameSlice.onSetDraw(data.drawsList)),
                put(
                    gameSlice.onSetDrawMapByDate(
                        Arrays.groupByToMap<LotteryCommonTypes.Draw & { ourDrawDate: string; ourDrawTime: string }>(
                            ourDrawsList,
                            (e) => e.ourDrawDate
                        )
                    )
                )
            ])
        }
    }
}

function* setDrawSelectedAllSaga() {
    while (true) {
        yield take(gameSlice.onSetDrawSelectedAll)
        const draw: LotteryCommonTypes.Draw[] = yield select(gameSelector.drawsSelector())
        const drawList: Types.Nullable<Types.Object<LotteryCommonTypes.Draw>> = yield select(gameSelector.drawSelectedListSelector())

        if (drawList && Object.keys(drawList).length > 0) {
            const newDrawList: Types.Object<LotteryCommonTypes.Draw> = produce(drawList, (draft) => {
                for (let i = 0; i < draw.length; i++) {
                    const target = draw[i]
                    if (!draft[target.id]) {
                        Object.assign(draft, {
                            [target.id]: target
                        })
                    }
                }
            })
            yield put(gameSlice.onSetDrawSelectedList(newDrawList))
        } else {
            const ourDrawMapping = {}
            for (let i = 0; i < draw.length; i++) {
                const target = draw[i]
                Object.assign(ourDrawMapping, {
                    [target.id]: target
                })
            }
            yield put(gameSlice.onSetDrawSelectedList(ourDrawMapping))
        }
    }
}

function* removeDrawSelectedAllSaga() {
    while (true) {
        yield take(gameSlice.onRemoveDrawSelectedAll)
        yield put(gameSlice.onSetDrawSelectedList(null))
    }
}

function* setDrawSelectedSaga() {
    while (true) {
        const { payload }: { payload: LotteryCommonTypes.Draw } = yield take(gameSlice.onSetDrawSelected)
        const drawList: Types.Nullable<Types.Object<LotteryCommonTypes.Draw>> = yield select(gameSelector.drawSelectedListSelector())
        if (drawList && Object.keys(drawList).length > 0) {
            const newDrawList: Types.Object<LotteryCommonTypes.Draw> = produce(drawList, (draft) => {
                if (draft[payload.id]) {
                    delete draft[payload.id]
                } else {
                    draft[payload.id] = payload
                }
            })

            yield put(gameSlice.onSetDrawSelectedList(newDrawList))
        } else {
            yield put(
                gameSlice.onSetDrawSelectedList({
                    [payload.id]: payload
                })
            )
        }
    }
}

function* removeDrawSelectedSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onRemoveDrawSelected)
        const drawList: Types.Nullable<Types.Object<LotteryCommonTypes.Draw>> = yield select(gameSelector.drawSelectedListSelector())
        if (drawList) {
            const newDrawList: Types.Object<LotteryCommonTypes.Draw> = produce(drawList, (draft) => {
                if (draft[payload]) {
                    delete draft[payload]
                }
            })

            yield put(gameSlice.onSetDrawSelectedList(newDrawList))
        }
    }
}

function* randomNumberTicketSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onRandomNumberTicket)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
        const spot: number = yield select(gameSelector.spotSelectedSelector())
        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (typeof payload === 'undefined' || payload.length === 0) {
                for (let i = 0; i < Object.keys(draft).length; i++) {
                    const target = draft[Object.keys(draft)[i]]
                    target.numbers = [
                        ...Randomize.randomUnique(KenoConsts.Min, KenoConsts.Max, spot),
                        ...Array.from(new Array(KenoConsts.Range - spot), () => -1)
                    ]
                }
            } else {
                draft[payload].numbers = [
                    ...Randomize.randomUnique(KenoConsts.Min, KenoConsts.Max, spot),
                    ...Array.from(new Array(KenoConsts.Range - spot), () => -1)
                ]
            }
        })
        if (payload && payload.length > 0)
            yield put(
                gameSlice.onSetTicketSessionSelected({
                    ...newTickets[payload],
                    id: payload
                })
            )
        yield put(gameSlice.onSetTicketOrder(newTickets))
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* updateNumberTicketSaga() {
    while (true) {
        const { payload }: { payload: { id: string; numbers: number[] } } = yield take(gameSlice.onUpdateTicketOrderNumber)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
        const spot: number = yield select(gameSelector.spotSelectedSelector())
        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (draft[payload.id])
                if (payload.numbers.length === KenoConsts.Range) {
                    draft[payload.id].numbers = payload.numbers
                } else {
                    draft[payload.id].numbers = [...payload.numbers, ...Array.from(new Array(KenoConsts.Range - spot), () => -1)]
                }
        })
        yield put(gameSlice.onSetTicketOrder(newTickets))
    }
}

function* resetNumberTicketSaga() {
    while (true) {
        yield take(gameSlice.onResetTicketOrderNumber)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (Object.keys(draft).length > 0) {
                for (let i = 0; i < Object.keys(draft).length; i++) {
                    const target = draft[Object.keys(draft)[i]]
                    target.numbers = []
                }
            }
        })
        yield put(gameSlice.onSetTicketOrder(newTickets))
    }
}

function* addTicketSaga() {
    while (true) {
        yield take(gameSlice.onAddTicket)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
        const price: Types.Undefined<LotteryTypes.OurTicketPriceDefault> = yield select(gameSelector.ticketPriceDefaultSelector())

        if (price) {
            const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
                Object.assign(draft, {
                    [uuidv4()]: {
                        numbers: [],
                        amount: 0,
                        price: price.price
                    }
                })
            })
            yield put(gameSlice.onSetTicketOrder(newTickets))
            yield put(gameSlice.onSetTicketSession(newTickets))
        } else {
            toast.error('Failed to add new ticket. Price not found.')
        }
    }
}

function* removeTicketSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onRemoveTicket)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())

        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (draft[payload]) delete draft[payload]
        })
        yield put(gameSlice.onSetTicketOrder(newTickets))
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* clearTicketSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onClearNumberTicket)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())

        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (draft[payload]) {
                draft[payload].numbers = Array.from(new Array(KenoConsts.Range), () => -1)
            }
        })
        yield put(gameSlice.onSetTicketOrder(newTickets))
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* updateSessionItemSaga() {
    while (true) {
        const { payload }: { payload: { id: string; numbers: number[] } } = yield take(gameSlice.onUpdateSessionItem)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketSessionSelector())
        const spot: number = yield select(gameSelector.spotSelectedSelector())
        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (draft[payload.id])
                if (payload.numbers.length === KenoConsts.Range) {
                    draft[payload.id].numbers = payload.numbers
                } else {
                    draft[payload.id].numbers = [...payload.numbers, ...Array.from(new Array(KenoConsts.Range - spot), () => -1)]
                }
        })
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* removeSessionItemSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onRemoveSessionItem)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketSessionSelector())

        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (draft[payload]) delete draft[payload]
        })
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* clearSessionItemSaga() {
    while (true) {
        const { payload } = yield take(gameSlice.onClearNumberSessionItem)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketSessionSelector())

        const newTickets: Types.Object<LotteryTypes.OurTicket> = produce(tickets, (draft) => {
            if (draft[payload]) {
                draft[payload].numbers = Array.from(new Array(KenoConsts.Range), () => -1)
            }
        })
        yield put(gameSlice.onSetTicketOrder(newTickets))
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* resetSessionTicketSaga() {
    while (true) {
        yield take(gameSlice.onResetTicketSession)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
        yield put(gameSlice.onSetTicketSession(tickets))
    }
}

function* mergeTicketOrderFromSession() {
    while (true) {
        yield take(gameSlice.onMergeTicketOrderFromSession)
        const tickets: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
        const ticketSessions: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketSessionSelector())
        const newTickets: Types.Object<LotteryTypes.OurTicket> = Objectify.merge(tickets, ticketSessions)
        yield put(gameSlice.onSetTicketOrder(newTickets))
        yield put(gameSlice.onSetTicketSession(newTickets))
    }
}

function* createOrderSaga() {
    while (true) {
        try {
            yield take(gameSlice.onCreateOrder)
            yield put(gameSlice.onCreateOrderLoading(true))
            const drawList: Types.Nullable<Types.Object<LotteryCommonTypes.Draw>> = yield select(gameSelector.drawSelectedListSelector())
            const ticketList: Types.Object<LotteryTypes.OurTicket> = yield select(gameSelector.ticketOrderSelector())
            const spot: number = yield select(gameSelector.spotSelectedSelector())
            const priceDefault: Types.Undefined<LotteryTypes.OurTicketPriceDefault> = yield select(
                gameSelector.ticketPriceDefaultSelector()
            )
            if (!drawList) {
                toast.error('Please select draw time.')
            }
            if (drawList && Object.keys(drawList).length > 0 && priceDefault?.symbol) {
                const draws = Object.keys(drawList)
                const tickets = Object.keys(ticketList)
                const ticketsList: Array<LotteryCommonTypes.TicketInput> = []
                for (let d = 0; d < draws.length; d++) {
                    const draw = drawList[draws[d]]
                    const setOfNumbers: Array<LotteryCommonTypes.SetOfNumber> = []
                    for (let n = 0; n < tickets.length; n++) {
                        const ticket = ticketList[tickets[n]]
                        const numbersAccepts = ticket.numbers.filter((i) => Number(i) !== -1)
                        if (numbersAccepts.length > 0 && numbersAccepts.length === spot) {
                            setOfNumbers.push({
                                id: '',
                                kenoSetOfNumber: {
                                    numbersList: numbersAccepts,
                                    price: ticket.price
                                }
                            })
                        }
                    }
                    if (setOfNumbers.length > 0) {
                        ticketsList.push({
                            drawId: draw.id,
                            setOfNumbersList: setOfNumbers
                        })
                    }
                }
                const params: LotteryTypes.CreateOrderRequest = {
                    currencySymbol: priceDefault.symbol,
                    gameSymbol: BaseEnum.GameSymbol.GS_KENO,
                    ticketsList
                }

                if (ticketsList.length > 0) {
                    const { data, status }: Interfaces.ResponseData<LotteryTypes.CreateOrderRequest> = yield call(
                        withAuth,
                        lotteryInstance,
                        {
                            methodName: RequestMethods.CREATE_ORDER,
                            params: LotteryBaseRequest.createOrderRequestParams(params)
                        },
                        false
                    )

                    if (status === 'SUCCESS' && data) {
                        toast.success('Order created successfully')
                        // reset
                        const ticketPriceDefault: { symbol: string; price: string } = yield select(
                            gameSelector.ticketPriceDefaultSelector()
                        )
                        yield put(
                            gameSlice.onInitTicket({
                                quantity: 5,
                                price: ticketPriceDefault
                            })
                        )
                        const spot: number = yield select(gameSelector.spotDefaultSelector())
                        yield put(gameSlice.onSetSpotSelected(spot))
                        yield put(gameSlice.onSetDrawSelectedList(null))
                        yield put(paymentSlice.onSetSubTotal('0'))
                        yield put(paymentSlice.onSetTotal('0'))
                        // reload order
                        const current = new Date()
                        const today = Math.round(new Date().getTime() / 1000)
                        const priorDate = Math.round(new Date(new Date().setDate(current.getDate() - 30)).getTime() / 1000)
                        yield put(
                            resultSlice.onFetchOrders({
                                page: KenoConsts.BaseQuery.offset,
                                size: KenoConsts.BaseQuery.size,
                                gameSymbol: BaseEnum.GameSymbol.GS_KENO,
                                status: LotteryCommonEnum.OrderStatus.OS_NONE,
                                sortersList: [
                                    {
                                        field: 'created_at',
                                        order: 'desc'
                                    }
                                ],
                                createdTime: {
                                    from: {
                                        seconds: priorDate,
                                        nanos: 0
                                    },
                                    to: {
                                        seconds: today,
                                        nanos: 0
                                    }
                                }
                            })
                        )
                    }
                } else {
                    toast.error('Need to select numbers to create order')
                }
            } else {
                toast.error('Failed to create order')
            }
            yield put(gameSlice.onCreateOrderLoading(false))
        } catch (error) {
            console.log(error)
            yield put(gameSlice.onCreateOrderLoading(false))
        }
    }
}

export function* root() {
    yield all([
        fork(initDrawSaga),
        fork(setDrawSelectedAllSaga),
        fork(removeDrawSelectedAllSaga),
        fork(removeDrawSelectedSaga),
        fork(setDrawSelectedSaga),
        fork(fetchConfigSaga),
        fork(resetNumberTicketSaga),
        fork(initTicketSaga),
        fork(initNumberSaga),
        fork(initSpotSaga),
        fork(randomNumberTicketSaga),
        fork(updateNumberTicketSaga),
        fork(addTicketSaga),
        fork(removeTicketSaga),
        fork(clearTicketSaga),
        fork(updateSessionItemSaga),
        fork(removeSessionItemSaga),
        fork(clearSessionItemSaga),
        fork(resetSessionTicketSaga),
        fork(mergeTicketOrderFromSession),
        fork(createOrderSaga)
    ])
}
