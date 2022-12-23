import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { Countdown, CountdownTypes } from '@nixjs23n6/baseui-countdown'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Button } from '@nixjs23n6/baseui-button'
import { LotteryCommonTypes } from '@lottery/types'
import { LotteryCommonEnum, BaseEnum } from '@lottery/types'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'
import * as KenoPaymentSlice from 'modules/lottery/keno/redux/payment/slice'
import * as KenoPaymentSelector from 'modules/lottery/keno/redux/payment/selectors'
import toast from 'react-hot-toast'

function addHoursToDate(date: Date, hours: number): Date {
    const c = new Date()
    const r = 24 - c.getHours()
    return new Date(new Date(date).setHours(date.getHours() + hours + r))
}

interface CheckoutWidgetPropArg {}

export const CheckoutWidget: React.FC<CheckoutWidgetPropArg> = () => {
    const dispatch = useDispatch()
    const tickets = useSelector(KenoGameSelector.ticketOrderSelector())
    const spot = useSelector(KenoGameSelector.spotSelectedSelector())
    const priceDefault = useSelector(KenoGameSelector.ticketPriceDefaultSelector())
    const drawSelected = useSelector(KenoGameSelector.drawSelectedListSelector())
    const loading = useSelector(KenoGameSelector.loadingCreateOrderSelector())
    const fee = useSelector(KenoPaymentSelector.feeSelector())
    const subTotal = useSelector(KenoPaymentSelector.subTotalSelector())
    const total = useSelector(KenoPaymentSelector.totalSelector())
    const currentBalance = useSelector(KenoPaymentSelector.currentBalanceSelector())

    const [drawExpire, setDrawExpire] = React.useState<LotteryCommonTypes.Draw>()
    const [drawExpired, setDrawExpired] = React.useState<boolean>()

    React.useEffect(() => {
        if (drawSelected) {
            setDrawExpired(false)
            const ourDraw = Object.keys(drawSelected)
            const newDraw = ourDraw.sort((a, b) => drawSelected[a].drawTime - drawSelected[b].drawTime)
            setDrawExpire(drawSelected[newDraw[0]])
        } else {
            setDrawExpire(undefined)
            setDrawExpired(false)
        }
    }, [drawSelected])

    const onComplete = React.useCallback(
        (status: CountdownTypes.Status) => {
            if (status === 'COMPLETED') {
                setDrawExpired(true)
                const fromTime = Math.floor(new Date().getTime() / 1000)
                const toTime = Math.floor(addHoursToDate(new Date(), 24).getTime() / 1000)
                if (drawExpire) dispatch(KenoGameSlice.onRemoveDrawSelected(drawExpire?.id))
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
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [drawExpire]
    )

    const onCreateOrder = React.useCallback(() => {
        if (!currentBalance) {
            toast.error('Your available balance is not sufficient to make a order.')
            return false
        }
        const { available } = currentBalance
        if (new BigNumber(available).isLessThan(new BigNumber(total))) {
            toast.error('Your available balance is not sufficient to make a order.')
            return false
        }
        dispatch(KenoGameSlice.onCreateOrder())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBalance, total])

    React.useEffect(() => {
        if (drawSelected && Object.keys(drawSelected).length > 0) {
            let ourSubTotal = '0'
            for (let index = 0; index < Object.keys(tickets).length; index++) {
                const target = tickets[Object.keys(tickets)[index]]
                const numbers = target.numbers.filter((n) => Number(n) > -1)
                if (numbers.length > 0 && numbers.length === spot)
                    ourSubTotal = new BigNumber(ourSubTotal).plus(Number(target.price)).toFixed()
            }

            ourSubTotal = new BigNumber(ourSubTotal).times(Object.keys(drawSelected).length).toFixed()

            dispatch(KenoPaymentSlice.onSetSubTotal(ourSubTotal))
        } else {
            dispatch(KenoPaymentSlice.onSetSubTotal('0'))
        }
    }, [drawSelected, tickets, spot, subTotal, dispatch])

    const renderTimeRemaining = React.useMemo(() => {
        if (drawExpire && drawExpire.drawTime && !drawExpired) {
            const totalMins = new Date(drawExpire?.drawTime * 1000).getMinutes()
            const currentMins = new Date().getMinutes()
            if (totalMins - currentMins <= 10) {
                return (
                    <div style={{ color: '#ff1493' }}>
                        <Countdown
                            target={drawExpire.drawTime}
                            options={{ minute: 'm', second: 's', className: 'd-inline-flex' }}
                            showDay={false}
                            showHour={false}
                            onComplete={(e) => onComplete(e)}
                        />
                        remaining to buy the ticket period {drawExpire.formattedCode}
                    </div>
                )
            }
        }
        return <></>
    }, [drawExpire, drawExpired, onComplete])

    return (
        <div className="rd-16 pl-16 pt-16 pr-16 pb-16 checkout-widget" style={{ background: 'wheat' }}>
            <div className="checkout-inner">
                <div className="mb-16 d-flex justify-content-between">
                    <span className="text-14">Sub total</span>
                    <span className="text-14">
                        {subTotal} &nbsp; {priceDefault?.symbol}
                    </span>
                </div>
                <div className="mb-16 d-flex justify-content-between">
                    <span className="text-14">Fee</span>
                    <span className="text-14">
                        {fee} &nbsp; {priceDefault?.symbol}
                    </span>
                </div>
                <div className="mb-16 d-flex justify-content-between">
                    <span className="text-14">Total</span>
                    <span className="w700 text-20" style={{ color: 'red' }}>
                        {total} &nbsp; {priceDefault?.symbol}
                    </span>
                </div>
                {renderTimeRemaining}
                {drawExpired && (
                    <p style={{ color: 'red' }}>
                        The draw ID {drawExpire?.formattedCode} you selected has expired. Please select another draw ID
                    </p>
                )}
                <div className="mt-24 text-center">
                    <Button
                        variant="info"
                        onClick={onCreateOrder}
                        isLoading={loading}
                        disabled={loading}
                        spinnerLoading={<Spinner liteColor="var(--base-black-normal)" />}
                    >
                        <span className="text-white">Check out</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
