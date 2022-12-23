import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'
import { DrawBadge } from './DrawBadge'

interface DrawSelectedListProp {
    className?: string
}

export const DrawSelectedList: React.FC<DrawSelectedListProp> = ({ className }) => {
    const drawSelectedList = useSelector(KenoGameSelector.drawSelectedListSelector())

    if (!drawSelectedList || (drawSelectedList && Object.keys(drawSelectedList).length === 0)) return <></>

    const ourList = Object.keys(drawSelectedList)
    return (
        <div className={classNames('d-flex draw-selected-list', className)}>
            {ourList.map((item) => (
                <DrawBadge key={item} formattedCode={drawSelectedList[item].formattedCode} id={drawSelectedList[item].id} />
            ))}
        </div>
    )
}
