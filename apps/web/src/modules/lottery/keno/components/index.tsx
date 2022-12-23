import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from '@nixjs23n6/baseui-grid'
import { Button } from '@nixjs23n6/baseui-button'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { LotteryCommonEnum, BaseEnum } from '@lottery/types'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'
import * as KenoGameSaga from 'modules/lottery/keno/redux/game/saga'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'
import * as KenoPaymentSlice from 'modules/lottery/keno/redux/payment/slice'
import * as KenoPaymentSaga from 'modules/lottery/keno/redux/payment/saga'
import { DrawSelectedList } from './DrawSelectList'
import { Balance } from './Balance'
import { Ticket } from './Ticket'
import { AddTicket } from './AddTicket'
import { Selection } from './Selection'
import { CheckoutWidget } from './CheckoutWidget'
import { LuckyPickModal } from './LuckyPickModal'
import { MyOrder } from './Result/MyOrder'

function addHoursToDate(date: Date, hours: number): Date {
    const c = new Date()
    const r = 24 - c.getHours()
    return new Date(new Date(date).setHours(date.getHours() + hours + r))
}

interface KenoArgProp {}

export const Keno: React.FC<KenoArgProp> = () => {
    injectReducerSaga(KenoGameSlice.KEY_REDUCER_SAGA, KenoGameSlice.kenoGameReducer, KenoGameSaga.root)
    injectReducerSaga(KenoPaymentSlice.KEY_REDUCER_SAGA, KenoPaymentSlice.kenoPaymentReducer, KenoPaymentSaga.root)

    const dispatch = useDispatch()

    const tickets = useSelector(KenoGameSelector.ticketOrderSelector())
    const drawingConfig = useSelector(KenoGameSelector.drawingConfigSelector())
    const firstRef = React.useRef(false)

    React.useEffect(() => {
        dispatch(
            KenoGameSlice.onFetchConfig({
                id: '',
                gameSymbol: BaseEnum.GameSymbol.GS_KENO,
                activated: BaseEnum.BoolFilter.BF_TRUE
            })
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (firstRef.current === false && drawingConfig) {
            firstRef.current = true
            const fromTime = Math.floor(new Date().getTime() / 1000)
            const toTime = Math.floor(addHoursToDate(new Date(), 24 + drawingConfig.addMoreDays).getTime() / 1000)

            dispatch(
                KenoGameSlice.onFetchDraw({
                    gameSymbol: BaseEnum.GameSymbol.GS_KENO,
                    size: 999,
                    page: 0,
                    status: LotteryCommonEnum.DrawStatus.DS_INITIAL,
                    code: 0,
                    drawTime: {
                        from: {
                            seconds: fromTime,
                            nanos: 0
                        },
                        to: {
                            seconds: toTime,
                            nanos: 0
                        }
                    },
                    sortersList: [
                        {
                            field: 'draw_time',
                            order: 'asc'
                        }
                    ]
                })
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawingConfig])

    const renderTickets = React.useCallback(() => {
        if (!tickets || Object.keys(tickets).length === 0) return <>Tickets not found</>
        return Object.keys(tickets).map((id, idx) => {
            const target = tickets[id]
            return <Ticket key={id} id={id} index={idx + 1} data={target} />
        })
    }, [tickets])

    const onRandomAll = () => {
        dispatch(KenoGameSlice.onRandomNumberTicket())
    }

    return (
        <div className="main-content">
            <Container>
                <Row>
                    <Col lg={9} md={12}>
                        <DrawSelectedList className="mb-16" />
                        <div className="d-flex flex-wrap our-tickets">
                            {renderTickets()}
                            {Object.keys(tickets).length < 10 && (
                                <div
                                    className="pl-16 pr-16 pt-8 pb-8 d-flex align-items-center"
                                    style={{ width: '50%', minHeight: '134px', flex: '0 0 auto' }}
                                >
                                    <AddTicket />
                                </div>
                            )}
                        </div>
                        <br />
                        <br />
                        <div className="text-center">
                            <Button variant="info" onClick={onRandomAll}>
                                <span className="text-white">Lucky Pick</span>
                            </Button>
                        </div>
                        <br />
                        <br />
                        <br />
                        <MyOrder />
                    </Col>
                    <Col lg={3} md={12}>
                        <Balance />
                        <br />
                        <Selection />
                        <br />
                        <br />
                        <CheckoutWidget />
                    </Col>
                </Row>
            </Container>
            <LuckyPickModal />
        </div>
    )
}
