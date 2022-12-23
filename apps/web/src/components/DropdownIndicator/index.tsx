import React from 'react'
import classNames from 'classnames'
import { IconCaretDropdown } from 'components/icons/iconCaretDropdown'

interface DropdownIndicatorPropArg {
    color?: string
    className?: string
}

export const DropdownIndicator: React.FC<DropdownIndicatorPropArg> = React.memo(({ color, className }) => {
    return (
        <div className={classNames('lottery-select__indicator', className)}>
            <IconCaretDropdown color={color} />
        </div>
    )
})

DropdownIndicator.displayName = 'DropdownIndicator'
