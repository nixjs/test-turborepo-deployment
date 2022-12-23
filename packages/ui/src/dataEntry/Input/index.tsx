import React from 'react'
import classNames from 'classnames'
import { Refs } from '@nixjs23n6/baseui-core'
import { Utils } from '@nixjs23n6/baseui-core'

interface InputPropArg extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string
    label: string
    id: string
    type?: React.HTMLInputTypeAttribute
}

export const Input = React.forwardRef<
    HTMLInputElement,
    InputPropArg & {
        prefixHTML?: React.ReactNode
        suffixHTML?: React.ReactNode
        prefixClassName?: string
        suffixClassName?: string
        readonly?: boolean
        prefixContainerClass?: string
        classNameLabel?: string
        classNameContent?: string
        classNameWrapper?: string
        error?: boolean
        register?: any
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
        onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
        onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    }
>(
    (
        {
            name,
            label,
            id,
            type = 'text',
            onChange,
            onKeyDown,
            onKeyUp,
            disabled,
            classNameWrapper,
            classNameLabel,
            classNameContent,
            error,
            ...props
        },
        ref
    ) => {
        const ourProps = Utils.omit(props, [
            'prefixContainerClass',
            'prefixHTML',
            'suffixHTML',
            'prefixClassName',
            'suffixClassName',
            'className',
            'size',
            'register',
            'classNameWrapper',
            'classNameLabel',
            'classNameContent',
            'error'
        ])
        const { prefixHTML, suffixHTML, register, readonly = false, prefixContainerClass = 'form-content' } = props

        const inputRef = React.useRef<HTMLInputElement>(null)
        const [focus, setFocus] = React.useState<boolean>(false)

        const handleFocus: React.FocusEventHandler<HTMLDivElement> = (e: any) => {
            inputRef.current?.focus()
            setFocus(true)
        }

        const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e: any) => {
            setFocus(false)
        }

        return (
            <div className={classNames('form-group', classNameWrapper)}>
                <label htmlFor={name} className={classNames('form-label', classNameLabel)}>
                    {label}
                </label>
                <div
                    className={classNames('form-content', classNameContent, {
                        [`${prefixContainerClass}--readonly`]: readonly,
                        [`${prefixContainerClass}--disabled`]: disabled,
                        [`${prefixContainerClass}--focused`]: focus,
                        [`${prefixContainerClass}--error`]: error
                    })}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {prefixHTML && <div className={classNames('form-content--prefix', props.prefixClassName)}>{prefixHTML}</div>}
                    <input
                        id={id}
                        type={type}
                        ref={Refs.composeRef(inputRef, ref)}
                        {...ourProps}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        {...register}
                        className={classNames('form-input', props.className)}
                    />
                    {suffixHTML && <div className={classNames('form-content--suffix', props.suffixClassName)}>{suffixHTML}</div>}
                </div>
            </div>
        )
    }
)

Input.displayName = 'Input'
