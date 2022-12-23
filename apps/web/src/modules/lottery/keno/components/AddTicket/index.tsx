import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@nixjs23n6/baseui-button'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'

interface AddTicketPropArg {}

export const AddTicket: React.FC<AddTicketPropArg> = () => {
    const dispatch = useDispatch()
    const onAdd = () => {
        dispatch(KenoGameSlice.onAddTicket())
    }
    return (
        <Button variant="info" type="button" className="h-100 w-100 text-white ticket-add" onClick={() => onAdd()}>
            + Add new ticket
        </Button>
    )
}
