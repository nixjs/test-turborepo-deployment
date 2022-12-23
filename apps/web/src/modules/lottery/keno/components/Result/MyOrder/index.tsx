import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { produce } from 'immer'
import { fromUnixTime } from 'date-fns'
import { Pagination } from '@nixjs23n6/baseui-pagination'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { LotteryCommonEnum, BaseEnum, LotteryCommonTypes } from '@lottery/types'
import { Formatter } from '@lottery/utils'
import { KenoConsts } from 'modules/lottery/keno/consts'
import * as KenoResultSlice from 'modules/lottery/keno/redux/result/slice'
import * as KenoResultSaga from 'modules/lottery/keno/redux/result/saga'
import * as KenoResultSelector from 'modules/lottery/keno/redux/result/selectors'
import { PaginationStyled } from './index.styled'
import { MyTicketModal } from './MyTicketModal'

interface MyOrderArgProp {}

const BaseQuery = {
    offset: 0,
    size: 20
}

export const MyOrder: React.FC<MyOrderArgProp> = () => {
    injectReducerSaga(KenoResultSlice.KEY_REDUCER_SAGA, KenoResultSlice.kenoResultReducer, KenoResultSaga.root)

    const dispatch = useDispatch()

    const orders = useSelector(KenoResultSelector.ordersSelector())
    const loadingOrders = useSelector(KenoResultSelector.loadingOrdersSelector())
    const total = useSelector(KenoResultSelector.ordersTotalSelector())
    const [offset, setOffset] = React.useState<number>(BaseQuery.offset + 1)

    React.useEffect(() => {
        const current = new Date()
        const today = Math.round(new Date().getTime() / 1000)
        const priorDate = Math.round(new Date(new Date().setDate(current.getDate() - 30)).getTime() / 1000)
        dispatch(
            KenoResultSlice.onFetchOrders({
                page: offset - 1,
                size: BaseQuery.size,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    const onSelectTicketOrder = React.useCallback((data: LotteryCommonTypes.Order & { orderPrize: string }) => {
        const newState = produce(data, (draft) => {
            draft.ticketsList.sort((a, b) => Number(a.draw?.drawTime) - Number(b.draw?.drawTime))
        })
        dispatch(KenoResultSlice.onSetOrderDetail(newState))
        dispatch(KenoResultSlice.onSetOrderDetailModal(true))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderStatusStyle = React.useCallback((status: LotteryCommonEnum.OrderStatus) => {
        if (status === LotteryCommonEnum.OrderStatus.OS_WIN) return '#32cd32'
        if (status === LotteryCommonEnum.OrderStatus.OS_NOT_WIN) return '#f08080'
        return '#696969'
    }, [])

    const renderOrders = React.useMemo(() => {
        if (loadingOrders) return <Spinner size="xs" className="d-flex" liteColor="var(--base-black-normal)" />

        if (orders.length === 0) return <h3>No have orders</h3>

        return orders.map((item, idx) => (
            <div
                key={idx}
                className="d-flex align-items-center justify-content-between cursor-pointer pl-16 pr-16 pb-16 pt-16 rd-8"
                style={{ background: '#faebd7', marginBottom: '1rem' }}
                role={'presentation'}
                onClick={() => onSelectTicketOrder(item)}
            >
                <div className="d-flex flex-column justify-content-between" style={{ width: '75%' }}>
                    <div className="mb-8 d-flex flex-row">
                        <div className="text-16" style={{ width: '100px' }}>
                            Order ID:
                        </div>
                        <h4 className="text-16">{item.formattedCode}</h4>
                    </div>
                    <div className="mb-8 d-flex flex-row">
                        <div className="text-16" style={{ width: '100px' }}>
                            Created At:
                        </div>
                        <p className="text-16">{Formatter.toDateConvert(fromUnixTime(item.createdAt), 'HH:mm:ss dd/MM/yyyy')}</p>
                    </div>
                    <div className="mb-8 d-flex flex-row">
                        <div className="text-16" style={{ width: '100px' }}>
                            Total Price:{' '}
                        </div>
                        <div className="text-16 text-roboto">
                            <span className="w700" style={{ color: 'red' }}>
                                {item.total}
                            </span>{' '}
                            <span className="w600">{item.currencySymbol}</span>
                        </div>
                    </div>
                    {item.orderPrize.length > 0 && (
                        <div className="mb-8 d-flex flex-row">
                            <div className="text-16" style={{ width: '100px' }}>
                                Total Prize:{' '}
                            </div>
                            <div className="text-16 text-roboto">
                                <span className="w700" style={{ color: 'red' }}>
                                    {item.orderPrize}
                                </span>{' '}
                                <span className="w600">{item.currencySymbol}</span>
                            </div>
                        </div>
                    )}
                </div>
                <h5 style={{ color: renderStatusStyle(item.status) }}>{KenoConsts.OrderStatus[item.status]}</h5>
            </div>
        ))
    }, [loadingOrders, onSelectTicketOrder, orders, renderStatusStyle])

    return (
        <div className="main-content">
            <h3 className="text-20 mb-16">My Order</h3>
            {renderOrders}
            <div className="mt-24 text-center">
                <Pagination
                    total={Math.ceil(total / BaseQuery.size)}
                    initialPage={offset}
                    withControls
                    overrideStyled={PaginationStyled}
                    onChange={(e: any) => setOffset(e)}
                />
            </div>
            <br />
            <br />
            <br />
            <MyTicketModal />
        </div>
    )
}
