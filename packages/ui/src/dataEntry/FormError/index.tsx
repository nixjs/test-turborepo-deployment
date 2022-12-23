import React from 'react'
import classNames from 'classnames'
import { ErrorMessage } from '@hookform/error-message'

interface FormErrorPropArg {
    errors: any
    name: string
    className?: string
}

export const FormError: React.FC<FormErrorPropArg> = ({ errors, name, className }) => (
    <ErrorMessage errors={errors} name={name} render={({ message }) => <p className={classNames('form-error', className)}>{message}</p>} />
)
