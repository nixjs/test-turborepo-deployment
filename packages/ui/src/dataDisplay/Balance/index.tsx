import React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { Formatter } from '@lottery/utils'

const BalanceStyled = styled.div`
    .balance {
        &__digit {
            color: var(--base-brand-third);
        }
        &__text {
            color: #7b7784;
        }
    }
`

interface BalancePropArg {
    className?: string
    colorActive?: string
    colorDisabled?: string
    value: string | number
}

export const Balance: React.FC<BalancePropArg> = ({ className, colorActive, colorDisabled, value }) => {
    const val = Formatter.onFindSignificantDigits(value, true)
    return (
        <BalanceStyled className={classNames('balance', className)}>
            <span className="balance__digit" style={{ color: colorActive }}>
                {val.digit}
            </span>
            <span className="balance__text" style={{ color: colorDisabled }}>
                {val.text}
            </span>
        </BalanceStyled>
    )
}
