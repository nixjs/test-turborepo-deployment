import React from 'react'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import { Types } from '@athena20/ts-types'
import { Utils, Refs, StyledProps } from '@nixjs23n6/baseui-core'
import { useUpdateEffect } from './useUpdateEffect'
import { getRangeValue, isNumber } from './utils'
import { InputNumberStyled } from './index.styled'

export const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/

export interface InputNumberValue {
    value: BigNumber
    formatted: string
    target: {
        id?: string
        name?: string
    }
}

const fixControlledValue = (value: Types.Undefined<string> | number | null): string => {
    if (typeof value === 'undefined' || value === null) {
        return ''
    }
    return String(value)
}

interface InputPropArg extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string
    name?: string
    placeholder?: string
    disabled?: boolean
    value?: string
}

interface InputNumberPropArg {
    classNameWrapper?: string
    className?: string
    onlyNumber?: boolean
    prefixContainerClass?: string
    inputClass?: string
    inputContentClass?: string
    prefixClass?: string
    suffixClass?: string
    defaultValue?: string | number
    prefixHTML?: React.ReactNode
    suffixHTML?: React.ReactNode
    onChangeValue?: (value: InputNumberValue) => void
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onInputValue?: (text: string) => void
}

const getDecimalsValue = (value: string | number | undefined) => {
    return new BigNumber(value || 0)
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputPropArg & InputNumberPropArg & StyledProps>(
    ({ id, type = 'text', ...props }, ref) => {
        const ourProps = Utils.omit(props, [
            'onlyNumber',
            'prefixContainerClass',
            'inputClass',
            'inputContentClass',
            'prefixHTML',
            'suffixHTML',
            'prefixClass',
            'suffixClass',
            'className',
            'classNameWrapper',
            'size',
            'onChangeValue',
            'onInputValue',
            'overrideStyled'
        ])

        const {
            onlyNumber = false,
            prefixContainerClass = 'input-number',
            inputClass,
            inputContentClass,
            prefixClass,
            suffixClass,
            prefixHTML,
            suffixHTML,
            readOnly = false,
            disabled = false,
            defaultValue,
            placeholder = 'Input the value',
            value,
            className,
            classNameWrapper,
            min,
            max,
            onChangeValue,
            onInputValue,
            overrideStyled
        } = props

        const [focus, setFocus] = React.useState<boolean>(false)
        const userTypingRef = React.useRef<boolean>(false)
        const compositionRef = React.useRef<boolean>(false)
        const inputRef = React.useRef<HTMLInputElement>(null)

        // ============================ Value =============================

        const [inputValue, setInternalInputValue] = React.useState<string | number>(() => {
            const initValue = defaultValue ?? value
            return fixControlledValue(initValue)
        })

        // ============================ Value =============================
        // Real value control
        const [decimalValue, setDecimalValue] = React.useState<BigNumber>(() => getDecimalsValue(value ?? defaultValue))

        function setUncontrolledDecimalValue(newDecimal: BigNumber) {
            if (value === undefined) {
                setDecimalValue(newDecimal)
            }
        }

        // Input by value
        useUpdateEffect(() => {
            if (value) {
                const newValue = new BigNumber(value)
                setDecimalValue(newValue)

                if (!newValue.eq(new BigNumber(inputValue))) {
                    setInternalInputValue(value)
                }
            }
        }, [value])

        const isInRange = (target: BigNumber) => !getRangeValue(target, min, max)

        // >>> Collect input value
        const collectInputValue = (_value: string) => {
            // Update inputValue incase input can not parse as number
            setInternalInputValue(_value)
            // Parse number
            if (!compositionRef.current) {
                const d = new BigNumber(_value)
                if (!d.isNaN()) {
                    onTriggerValue(d, true)
                }
            }
            onInputValue?.(_value)
        }

        const onTriggerValue = (newValue: BigNumber, userTyping: boolean) => {
            let updateValue = newValue
            let isRangeValidate = isInRange(updateValue) || updateValue.isNaN()
            // Skip align value when trigger value is empty.
            // We just trigger onChange(null)
            // This should not block user typing
            if (!updateValue.isNaN() && !userTyping) {
                // Revert value in range if needed
                updateValue = getRangeValue(updateValue, min, max) || updateValue
                isRangeValidate = true
            }

            if (!readOnly && !disabled && !updateValue.eq(decimalValue) && isRangeValidate) {
                setUncontrolledDecimalValue(updateValue)
                onChangeValue?.({
                    value: updateValue,
                    formatted: updateValue.toFixed(),
                    target: { id, name: props.name }
                })
                // Reformat input if value is not controlled
                if (value === undefined) {
                    setInternalInputValue(updateValue.toFixed())
                }
                return updateValue
            }
            return decimalValue
        }

        const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
            if (onlyNumber && !REGEXP_NUMBER.test(e.target?.value)) {
                return e.preventDefault()
            }
            collectInputValue(e.target.value)
        }

        const handleFocus = () => {
            inputRef.current?.focus()
            setFocus(true)
        }

        const handleBlur = () => {
            // update value
            const parsedValue = new BigNumber(
                typeof inputValue === 'string' && (inputValue.length === 0 || !isNumber(inputValue)) ? '0' : inputValue
            )
            let formatValue: BigNumber = parsedValue

            if (!parsedValue.isNaN()) {
                // Only validate value or empty value can be re-fill to inputValue
                // Reassign the formatValue within ranged of trigger control
                formatValue = onTriggerValue(parsedValue, false)
            } else {
                formatValue = decimalValue
            }

            if (value !== undefined) {
                // Reset back with controlled value first
                setInternalInputValue(decimalValue.toFixed())
            } else if (!formatValue.isNaN()) {
                // Reset input back since no validate value
                setInternalInputValue(formatValue.toFixed())
            }
            setFocus(false)
            userTypingRef.current = false
        }

        const handleKeyDown = () => {
            userTypingRef.current = true
        }

        const handleKeyUp = () => {
            userTypingRef.current = false
        }

        const handleClipboard = (e: React.ClipboardEvent<HTMLDivElement>) => {
            if (onlyNumber) {
                const clipboardData = e.clipboardData || (window as any).clipboardData
                if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData('text'))) {
                    e.preventDefault()
                }
            }
        }

        // >>> Composition
        const handleCompositionStart = () => {
            compositionRef.current = true
        }

        const handleCompositionEnd = () => {
            compositionRef.current = false
            inputRef.current && collectInputValue(inputRef.current.value)
        }

        return (
            <InputNumberStyled className={classNameWrapper} overrideStyled={overrideStyled} prefixContainerClass={prefixContainerClass}>
                <div
                    className={classNames('d-flex user-select-none input-number', className, {
                        [`${prefixContainerClass}--readonly`]: readOnly,
                        [`${prefixContainerClass}--disabled`]: disabled,
                        [`${prefixContainerClass}--focused`]: focus
                    })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onPaste={handleClipboard}
                    onCompositionStart={handleCompositionStart}
                    onCompositionEnd={handleCompositionEnd}
                    role="button"
                    tabIndex={-1}
                >
                    {prefixHTML && (
                        <div className={classNames('d-flex align-items-center input-number-prefix', prefixClass)}>{prefixHTML}</div>
                    )}
                    <div className={classNames('d-flex flex-fill input-number-content', inputContentClass)}>
                        <input
                            autoComplete="off"
                            id={id}
                            type={type}
                            placeholder={placeholder}
                            tabIndex={-1}
                            role="spinbutton"
                            {...ourProps}
                            aria-valuemin={min as any}
                            aria-valuemax={max as any}
                            ref={Refs.composeRef(inputRef, ref)}
                            value={inputValue}
                            onChange={handleInputChange}
                            className={classNames('input-number-input', inputClass)}
                        />
                    </div>
                    {suffixHTML && (
                        <div className={classNames('d-flex align-items-center input-number-suffix', suffixClass)}>{suffixHTML}</div>
                    )}
                </div>
            </InputNumberStyled>
        )
    }
)

InputNumber.displayName = 'InputNumber'
