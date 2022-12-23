import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'
import { DrawSelection } from './DrawSelection'

interface SelectionPropArg {}

export const Selection: React.FC<SelectionPropArg> = () => {
    const dispatch = useDispatch()
    const spots = useSelector(KenoGameSelector.spotsSelector())
    const spot = useSelector(KenoGameSelector.spotSelectedSelector())
    const spotDefault = useSelector(KenoGameSelector.spotDefaultSelector())

    const onSpotChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (Number(spot) !== Number(e.target.value)) {
                dispatch(KenoGameSlice.onSetSpotSelected(Number(e.target.value)))
                dispatch(KenoGameSlice.onResetTicketOrderNumber())
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [spot]
    )

    return (
        <div>
            <label htmlFor="spot" className="w500 mb-8">
                Spot
            </label>
            <select
                className="form-control rd-8 pt-8 pb-8 pl-16 pr-16"
                style={{
                    display: 'block',
                    width: '100%'
                }}
                id="spot"
                onChange={onSpotChange}
                value={spot}
            >
                {spots.map((item, idx) => (
                    <option value={item} key={idx} selected={item === spotDefault}>
                        {item}
                    </option>
                ))}
            </select>
            <br />
            <DrawSelection />
        </div>
    )
}
