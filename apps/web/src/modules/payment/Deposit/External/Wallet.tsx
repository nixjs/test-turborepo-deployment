import React from 'react'
import classNames from 'classnames'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Radio } from '@lottery/uikit'
import { BaseEnum } from '@lottery/types'
import { ExternalWalletState } from 'types/payment'
import { Button } from '@nixjs23n6/baseui-button'

interface WalletPropArg {
    type: BaseEnum.WalletProvider
    title: string
    onConnectWallet: (type: BaseEnum.WalletProvider) => void
    icon: React.ReactNode
    isSelected?: boolean
    disabled?: boolean
    className?: string
    state?: ExternalWalletState
}

export const Wallet: React.FC<WalletPropArg> = ({ isSelected, type, title, onConnectWallet, icon, disabled, className = '', state }) => {
    return (
        <div className={classNames('d-flex align-items-center justify-content-between', className)}>
            <label className="flex cursor-pointer" htmlFor={type.toString()}>
                <Radio
                    disabled={disabled}
                    id={type.toString()}
                    value={type}
                    name="walletType"
                    checked={isSelected}
                    onChange={() => onConnectWallet(type)}
                />
                <span className="ml-18">
                    {icon}
                    <span className={classNames('ml-8', { 'base-black-darkest': disabled })}>{title}</span>
                </span>
            </label>
            {state === 'PROCESSING' && (
                <span className="d-flex align-items-center base-functional-careful">
                    <Spinner size="xs" variant="danger" liteColor="var(--base-brand-third)" className="d-flex mr-8" />
                    <span>Connecting...</span>
                </span>
            )}
            {state === 'CONNECTED' && <span className="w600 base-functional-positive">Connected</span>}
            {state === 'FAILED' && (
                <span className="base-functional-stressful">
                    Failed to connect
                    <Button variant="dark" autoWidth className="ml-8 base-white" onClick={() => onConnectWallet(type)}>
                        Reconnect
                    </Button>
                </span>
            )}
        </div>
    )
}
