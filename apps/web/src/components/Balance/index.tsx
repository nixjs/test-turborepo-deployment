import React from 'react'
import classNames from 'classnames'
import { BaseConst } from '@lottery/types'
import { formatCurrency } from 'utils/format'
import BalanceLabelStyled from './index.styled'

interface BalancePropArg {
    price: number
    unit?: string
    size?: number | string
    weight?: number | string
    lineHeight?: number | string
    color?: string
    className?: string
}

export const Balance: React.FC<BalancePropArg> = ({ price, unit, size, lineHeight, color, weight, className }) => {
    return (
        <BalanceLabelStyled
            className={classNames('prize__value', className)}
            size={size}
            lineHeight={lineHeight}
            color={color}
            weight={weight}
        >
            <span className="prize__number mr-2">{formatCurrency(price)}</span>
            <span className="prize__unit">{unit || BaseConst.Currency.UnitDefault}</span>
        </BalanceLabelStyled>
    )
}
