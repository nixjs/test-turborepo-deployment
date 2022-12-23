import React from 'react'
import classNames from 'classnames'
import { FormGroupStyled } from './index.styled'

interface FormGroupPropArg {
    label?: string
    labelClass?: string
    htmlFor?: string
    children?: React.ReactNode
    className?: string
    contentClass?: string
}

export const FormGroup: React.FC<FormGroupPropArg> = ({ label, labelClass, htmlFor, children, className, contentClass }) => {
    return (
        <FormGroupStyled className={classNames('form-group', className)}>
            <label htmlFor={htmlFor} className={classNames('mb-8 w400 base-black-darker', labelClass)}>
                {label}
            </label>
            <div className={classNames('form-content', contentClass)}>{children}</div>
        </FormGroupStyled>
    )
}
