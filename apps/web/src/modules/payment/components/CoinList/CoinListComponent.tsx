import React from 'react'
import { components, OptionProps, SingleValueProps } from 'react-select'
import { PaymentTypes } from '@lottery/types'
import { Symbol } from '@lottery/uikit'

export const CoinSingleValue: React.FC<SingleValueProps<PaymentTypes.Token>> = (props) => {
    const {
        data: { symbol, displayName }
    } = props
    const symbolPath = `/tokens/ic24px_${symbol.toLowerCase() || 'none'}.svg`
    return (
        <div className="d-inline-flex align-items-center w400">
            <div className="d-flex">
                <Symbol name={displayName} source={symbolPath} />
            </div>
            <span className="ml-8">
                {displayName} ({symbol})
            </span>
        </div>
    )
}

export const CoinOption: React.FC<OptionProps<PaymentTypes.Token>> = (props) => {
    const {
        data: { displayName, symbol }
    } = props
    const symbolPath = `/tokens/ic24px_${symbol.toLowerCase() || 'none'}.svg`
    return (
        <components.Option {...props} className="relative">
            <div className="d-flex align-items-center justify-content-between pt-4 pb-4">
                <div className="d-inline-flex align-items-center w400">
                    <div className="d-flex">
                        <Symbol name={displayName} source={symbolPath} />
                    </div>
                    <span className="ml-8">
                        {displayName} ({symbol})
                    </span>
                </div>
                {props.isSelected && <i className="ic_tick text-24 primaryNormal" />}
            </div>
        </components.Option>
    )
}
