import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fromUnixTime } from 'date-fns'
import { Modal } from '@nixjs23n6/baseui-modal'
import { LotteryCommonEnum, LotteryCommonTypes } from '@lottery/types'
import { Formatter } from '@lottery/utils'
import { KenoConsts } from 'modules/lottery/keno/consts'
import * as KenoResultSlice from 'modules/lottery/keno/redux/result/slice'
import * as KenoResultSelectors from 'modules/lottery/keno/redux/result/selectors'
import { TicketOrderModalCss, TicketOrderModalStyled } from './index.styled'

interface MyTicketModalPropArg {}

export const MyTicketModal: React.FC<MyTicketModalPropArg> = () => {
    const dispatch = useDispatch()
    const ticketModalRef = React.useRef(null)

    const open = useSelector(KenoResultSelectors.orderDetailModalSelector())
    const order = useSelector(KenoResultSelectors.orderDetailSelector())

    const onCloseModal = () => {
        dispatch(KenoResultSlice.onSetOrderDetail(null))
        dispatch(KenoResultSlice.onSetOrderDetailModal(false))
    }

    const renderStatusStyle = React.useCallback((status: LotteryCommonEnum.TicketStatus) => {
        if (status === LotteryCommonEnum.TicketStatus.TS_WIN) return '#32cd32'
        if (status === LotteryCommonEnum.TicketStatus.TS_NOT_WIN) return '#f08080'
        return '#696969'
    }, [])

    const renderPrizeAmount = React.useCallback((prizeOfNumbersList: LotteryCommonTypes.PrizeOfNumber[], id: string, symbol: string) => {
        if (prizeOfNumbersList.length === 0) return <></>
        const prize = prizeOfNumbersList.find((p) => p.id === id)
        if (!prize) return <></>
        return (
            <div className="d-flex justify-content-between">
                <div className="mb-8 text-14">Prize received: </div>
                <div className="text-roboto w600" style={{ color: '#96d217' }}>{`${prize.amount} ${symbol}`}</div>
            </div>
        )
    }, [])

    return (
        <Modal
            as={'div'}
            open={open}
            onClose={onCloseModal}
            animation
            animationName="fadeIn"
            closeOnEsc
            showClose
            unmountOnExit
            overrideStyled={TicketOrderModalCss}
            ref={ticketModalRef}
        >
            <Modal.Body>
                <TicketOrderModalStyled>
                    {order && (
                        <div className="box">
                            <br />
                            <div className="mb-8 d-flex align-items-center justify-content-between">
                                <div className="text-16">Order ID:</div>
                                <h3 className="text-16">{order.formattedCode}</h3>
                            </div>
                            <div className="mb-8 d-flex align-items-center justify-content-between">
                                <div className="text-16">Order Date:</div>
                                <p className="text-16">{Formatter.toDateConvert(fromUnixTime(order.createdAt), 'HH:mm:ss dd/MM/yyyy')}</p>
                            </div>
                            <div className="mb-8 d-flex align-items-center justify-content-between">
                                <div className="text-16">Total Price:</div>
                                <p className="w600 text-16 text-roboto">
                                    {order.total} {order.currencySymbol}
                                </p>
                            </div>

                            {order.orderPrize.length > 0 && (
                                <div className="mb-8 d-flex align-items-center justify-content-between">
                                    <div className="text-16">Total Prize: </div>
                                    <p className="w600 text-16 text-roboto" style={{ color: '#32cd32' }}>
                                        {order.orderPrize} {order.currencySymbol}
                                    </p>
                                </div>
                            )}
                            <br />
                            <div>
                                {order.ticketsList &&
                                    order.ticketsList.map((ticket) => {
                                        const drawTime = ticket.draw?.drawTime
                                        const luckyNumbers = ticket.draw?.luckyNumbersList
                                        let d = ''
                                        let t = ''
                                        if (drawTime) {
                                            d = Formatter.toDate(fromUnixTime(drawTime), 'dd/MM/yyyy')
                                            t = Formatter.toDate(fromUnixTime(drawTime), 'HH:mm')
                                        }
                                        return (
                                            <div key={ticket.id} className="pl-8 pt-8 pb-8 pr-8">
                                                <div className="rd-8 pl-8 pt-8 pb-8 pr-8" style={{ background: 'wheat' }}>
                                                    <div className="mb-8 d-flex align-items-center justify-content-between">
                                                        <div className="text-14">Draw ID:</div>
                                                        <h3 className="text-14">{ticket.draw?.formattedCode}</h3>
                                                    </div>
                                                    <div className="mb-8 d-flex align-items-center justify-content-between">
                                                        <div className="text-14">Draw Date:</div>
                                                        <p>{`${t} ${d}`}</p>
                                                    </div>
                                                    <div className="mb-8 d-flex align-items-center justify-content-between">
                                                        <div className="text-14">Status:</div>
                                                        <h5 className="text-16" style={{ color: renderStatusStyle(ticket.status) }}>
                                                            {KenoConsts.TicketStatus[ticket.status]}
                                                        </h5>
                                                    </div>
                                                    <div className="mb-8 d-flex align-items-center justify-content-between">
                                                        <div className="text-14">Prize:</div>
                                                        {(ticket.totalPrize.length > 0 && (
                                                            <p
                                                                className="text-roboto w600"
                                                                style={{
                                                                    color:
                                                                        (ticket.status === LotteryCommonEnum.TicketStatus.TS_WIN &&
                                                                            '#32cd32') ||
                                                                        '#f08080'
                                                                }}
                                                            >
                                                                {ticket.status === LotteryCommonEnum.TicketStatus.TS_WIN && '+'}
                                                                {ticket.totalPrize} {ticket.currencySymbol}
                                                            </p>
                                                        )) ||
                                                            'Waiting for draw...'}
                                                    </div>
                                                    {luckyNumbers && luckyNumbers.length > 0 && (
                                                        <div className="mb-16 d-flex flex-column">
                                                            <div className="mb-16 d-flex align-items-center justify-content-between">
                                                                <div className="text-14">Lucky numbers:</div>
                                                            </div>
                                                            <div className="pl-8 pr-8 list">
                                                                <div
                                                                    className="pt-8 pb-8 pl-4 pr-4 mb- text-center rd-4 text-roboto w600 text-white"
                                                                    style={{
                                                                        background: '#f4a460'
                                                                    }}
                                                                >
                                                                    <div>
                                                                        {ticket.draw?.luckyNumbersList
                                                                            .map((n) => (Number(n) < 10 ? `0${n}` : n))
                                                                            .join(' - ')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="d-flex flex-column">
                                                        <div className="mb-16 d-flex align-items-center justify-content-between">
                                                            <div className="text-14">Your numbers:</div>
                                                            <p>{ticket.setOfNumbersList.length} row(s)</p>
                                                        </div>
                                                        {ticket.setOfNumbersList.length > 0 && (
                                                            <div className="pl-8 pr-8 list">
                                                                {ticket.setOfNumbersList.map((num) => (
                                                                    <div
                                                                        key={num.id}
                                                                        className="pt-8 pb-8 pl-8 pr-8 mb-8 d-flex flex-column justify-content-between text-white rd-4"
                                                                        style={{
                                                                            background: '#cd5c5c',
                                                                            color: 'white'
                                                                        }}
                                                                    >
                                                                        <div className="mb-8 d-flex flex-column justify-content-between">
                                                                            <div className="mb-8 text-14">Your numbers:</div>
                                                                            <div className="text-center text-roboto">
                                                                                {num.numbersList
                                                                                    .map((n) => (Number(n) < 10 ? `0${n}` : n))
                                                                                    .map((c, idxc) => {
                                                                                        const i = luckyNumbers
                                                                                            ? luckyNumbers.findIndex(
                                                                                                  (l) => Number(l) === Number(c)
                                                                                              )
                                                                                            : -1
                                                                                        return (
                                                                                            <span
                                                                                                key={`${idxc}_${c}`}
                                                                                                className="w600 text-18"
                                                                                                style={{
                                                                                                    color: i !== -1 ? '#96d217' : 'white'
                                                                                                }}
                                                                                            >
                                                                                                {c}
                                                                                                <span style={{ color: '#f6f8fa' }}>
                                                                                                    {idxc < num.numbersList.length - 1 &&
                                                                                                        ' - '}
                                                                                                </span>
                                                                                            </span>
                                                                                        )
                                                                                    })}
                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-8 d-flex flex-row justify-content-between">
                                                                            <div className="text-14">Ticket price:</div>
                                                                            <span className="text-roboto w600">{`${num.price} ${ticket.currencySymbol}`}</span>
                                                                        </div>
                                                                        {renderPrizeAmount(
                                                                            ticket.prizeOfNumbersList,
                                                                            num.id,
                                                                            ticket.currencySymbol
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    )}
                </TicketOrderModalStyled>
            </Modal.Body>
        </Modal>
    )
}
