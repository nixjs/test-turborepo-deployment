import React from 'react'
import { useDispatch } from 'react-redux'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'

interface DrawBadgeArgProp {
    id: string
    formattedCode: string
}

export const DrawBadge: React.FC<DrawBadgeArgProp> = ({ id, formattedCode }) => {
    const dispatch = useDispatch()
    const onRemove = () => dispatch(KenoGameSlice.onRemoveDrawSelected(id))

    return (
        <div
            className="ml-8 rd-8 pl-4 pr-4 pt-4 pb-4 d-flex align-items-center draw-selected-item"
            style={{ backgroundColor: 'coral', color: 'white' }}
        >
            <span className="text-12 w500 mr-4">{formattedCode}</span>
            <button
                type="button"
                onClick={onRemove}
                style={{
                    border: 'none',
                    outline: 'none',
                    background: 'white',
                    borderRadius: '0.125rem'
                }}
            >
                x
            </button>
        </div>
    )
}
