import React from 'react'
import { components, OptionProps, SingleValueProps } from 'react-select'

export interface SelectNetworkProps {
    key: number
    network: string
    value: string
}

export const NetworkSingleValue: React.FC<SingleValueProps<SelectNetworkProps>> = (props) => {
    const {
        data: { value }
    } = props
    return (
        <div className="d-inline-flex align-items-center w400">
            <span>{value}</span>
        </div>
    )
}

export const NetworkOption: React.FC<OptionProps<SelectNetworkProps>> = (props) => {
    const {
        data: { value }
    } = props
    return (
        <components.Option {...props} className="relative">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-inline-flex align-items-center w400">
                    <span>{value}</span>
                </div>
                {props.isSelected && <i className="ic_tick text-24 primaryNormal" />}
            </div>
        </components.Option>
    )
}
