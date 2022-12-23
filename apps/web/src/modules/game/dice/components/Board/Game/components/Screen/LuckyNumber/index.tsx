import React from 'react'
import classNames from 'classnames'
import { IconDiceWin } from './components/iconWin'
import { IconDiceLose } from './components/iconLose'
import { IconDiceDefault } from './components/iconDefault'

interface LuckyNumberPropArg {
    isWin?: boolean
    luckyNumber?: string
}

const LuckyNumber: React.FC<LuckyNumberPropArg> = ({ isWin, luckyNumber = '00' }) => {
    const renderGameState = React.useMemo(() => {
        let child: JSX.Element = <IconDiceDefault />
        if (typeof isWin !== 'undefined') child = isWin ? <IconDiceWin /> : <IconDiceLose />
        const label = isWin ? 'win' : 'lose'
        return <div className={classNames('position-absolute zindex--1 box-lucky-state', ` box-lucky-state--${label}`)}>{child}</div>
    }, [isWin])

    return (
        <div className="d-flex flex-column flex-wrap justify-content-center text-center box-lucky">
            <div className="d-flex align-items-center justify-content-center position-relative">
                {renderGameState}
                <span className="ml-12 text-oswald text-72 w700 number text-white">{luckyNumber}</span>
            </div>
            <label htmlFor="#" className="w600 mt-12 text-color text-uppercase label">
                Lucky Number
            </label>
        </div>
    )
}

export default React.memo(LuckyNumber)
