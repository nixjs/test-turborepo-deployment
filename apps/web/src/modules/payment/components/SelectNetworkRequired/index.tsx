import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { Divided } from '@lottery/uikit'
import { SelectNetworkRequiredStyled } from './index.styled'

interface SelectNetworkRequiredPropArg {
    className?: string
}

export const SelectNetworkRequired: React.FC<SelectNetworkRequiredPropArg> = ({ className }) => {
    return (
        <SelectNetworkRequiredStyled className={classNames('text-center select-network', className)}>
            <div className="mb-8">
                <div className="position-relative d-inline-flex">
                    <h4 className="text-18 base-functional-stressful">Please select network first</h4>
                    <div className="position-absolute arrow-icon">
                        <Image src="/payment/select_network.svg" alt="Please select network first" width={42} height={48} />
                    </div>
                </div>
            </div>
            <p className="pl-24 pr-24 base-black-darker">Ensure the network matches the address network entered to avoid loss your fund.</p>
            <Divided color="transparent" />
        </SelectNetworkRequiredStyled>
    )
}
