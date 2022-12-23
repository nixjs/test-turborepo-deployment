import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { InputNumber, InputNumberValue } from '@lottery/uikit'
import { Symbol } from '@lottery/uikit'
import * as walletSlice from 'redux/wallet/selectors'

interface InputAmountPropArg {
    className?: string
    amount: string
    disabled?: boolean
    onChange: (e: InputNumberValue) => void
    onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputAmount: React.FC<InputAmountPropArg> = ({ className, onChange, onBlur, amount, disabled = false }) => {
    const tokenSelected = useSelector(walletSlice.walletTokenSelectedSelector())

    return (
        <div className={classNames('d-flex align-items-center text-oswald form-control position-relative betting-input', className)}>
            <InputNumber
                className="d-flex flex-fill align-items-center pt-20 pb-20 pl-16 pr-12 h-100 rd-8"
                classNameWrapper="w-100 h-100"
                prefixHTML={<Symbol source={`/tokens/ic24px_${tokenSelected.toLowerCase() || 'none'}.svg`} />}
                suffixHTML={<div className="d-flex text-color-2 w500 input-suffix">{tokenSelected}</div>}
                inputContentClass="flex-fill"
                inputClass="w700 text-20"
                prefixClass="mr-8"
                suffixClass="ml-8"
                placeholder="0.00000000"
                onChangeValue={onChange}
                value={amount}
                onBlur={onBlur}
                disabled={disabled}
            />
        </div>
    )
}
