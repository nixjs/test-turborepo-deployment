import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@nixjs23n6/baseui-button'
import { LotteryTypes } from 'modules/lottery/keno/types'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'
import { TicketStyled } from './index.styled'

interface TicketPropArg {
    id: string
    index: number
    data: LotteryTypes.OurTicket
}

export const Ticket: React.FC<TicketPropArg> = React.memo(({ id, index, data }) => {
    const dispatch = useDispatch()

    const onRandom = (id: string) => {
        dispatch(KenoGameSlice.onRandomNumberTicket(id))
    }

    const onClear = (id: string) => {
        dispatch(KenoGameSlice.onClearNumberTicket(id))
    }

    const onSelect = () => {
        const { amount, numbers, price } = data
        dispatch(KenoGameSlice.onSetNumberChoiceModal(true))
        dispatch(
            KenoGameSlice.onSetTicketSessionSelected({
                numbers,
                amount,
                id,
                price
            })
        )
    }

    const onRenderNumber = React.useCallback(() => {
        if (data.numbers.length === 0) {
            const list = ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?']
            return list.map((item, idx) => (
                <div key={idx} className="d-flex align-items-center justify-content-center rd-circle number">
                    {item}
                </div>
            ))
        }
        return data.numbers.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center justify-content-center rd-circle number">
                {item > 0 ? item : ''}
            </div>
        ))
    }, [data.numbers])

    return (
        <TicketStyled id={id} className="pt-8 pb-8">
            <div className="d-flex rd-tl-16 rd-bl-16 ticket-content">
                <div style={{ width: '75%' }} className="pt-18 pr-16 pb-18 position-relative d-flex">
                    <div className="d-flex align-items-center pr-8" style={{ width: '2rem' }}>
                        <div
                            className="w-100 w500 ticket-idx pt-4 pb-4 rd-tr-4 rd-br-4"
                            style={{ backgroundColor: '#789', color: 'white' }}
                        >
                            {index}
                        </div>
                    </div>
                    <button type="button" className="d-grid reset-button ticket-numbers" onClick={onSelect}>
                        {onRenderNumber()}
                    </button>
                </div>
                <div
                    className="d-flex align-items-center flex-column justify-content-center ticket-actions"
                    style={{ width: '25%', backgroundColor: 'coral' }}
                >
                    <div className="d-flex align-items-center">
                        <Button
                            variant="info"
                            icon={<>{'x'}</>}
                            size={'sm'}
                            type="button"
                            className="mb-16 text-white action-lucky mr-8"
                            onClick={() => onClear(id)}
                        />
                        <Button
                            variant="danger"
                            icon={<>{'><'}</>}
                            size={'sm'}
                            type="button"
                            className="mb-16 text-white action-lucky"
                            onClick={() => onRandom(id)}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <Button variant="base" size={'sm'} autoWidth type="button" className="mb-16 text-white action-lucky">
                            <span className="pl-4 pr-4">1 USD</span>
                        </Button>
                    </div>
                </div>
            </div>
        </TicketStyled>
    )
})

Ticket.displayName = 'Ticket'
