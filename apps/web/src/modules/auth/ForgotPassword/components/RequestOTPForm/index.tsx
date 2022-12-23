import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nixjs23n6/baseui-button'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Input, FormError, Divided } from '@lottery/uikit'
import { ForgotTypes } from 'types/auth/forgot'
import { ThirdPartyLogin } from 'modules/auth/ThirdPartyLogin'
import { AuthViewScreenState } from 'redux/auth/types'
import * as authSlice from 'redux/auth/slice'
import * as forgotSlice from 'redux/auth/forgot/slice'
import * as forgotSelector from 'redux/auth/forgot/selectors'
import { RequestOTPSchema } from './validator'

interface RequestOTPFormPropArg {}

export const RequestOTPForm: React.FC<RequestOTPFormPropArg> = () => {
    const dispatch = useDispatch()
    const loading = useSelector(forgotSelector.getLoadingSelector())

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotTypes.ForgotParamRequest>({
        resolver: yupResolver(RequestOTPSchema)
    })

    const onSubmit = handleSubmit((data: ForgotTypes.ForgotParamRequest) => {
        if (data) {
            dispatch(forgotSlice.onRequestForgot(data.email))
            dispatch(forgotSlice.onSetLoading(true))
        }
    })

    const onOpenLogin = () => {
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.LOGIN))
    }

    return (
        <div className="pl-16 pr-16">
            <div className="m-auto pt-8 auth-form">
                <h3 className="base-brand-third w500 text-oswald text-28 mb-16 text-center auth-heading">Forgot Password</h3>
                <div className="content">
                    <form onSubmit={onSubmit}>
                        <Input
                            id="email"
                            type={'email'}
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            label="Email Address"
                            placeholder="Enter your email address"
                            register={register('email')}
                            autoComplete="off"
                            classNameWrapper="mb-8"
                            spellCheck="false"
                        />
                        <FormError errors={errors} name="email" className="base-functional-stressful text-14" />
                        <Divided color="transparent" />
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-100 d-flex align-items-center justify-content-center flex uppercase text-white mb-8 rd-8"
                            isLoading={loading}
                            disabled={loading}
                            spinnerLoading={<Spinner liteColor="var(--base-black-normal)" />}
                        >
                            Confirm
                        </Button>
                    </form>
                </div>
            </div>

            <Divided color="transparent" className="mb-24" />
            <h3 className="text-16 mb-24 text-center">Or log in directly with</h3>
            <div className="d-flex align-items-center justify-content-center">
                <ThirdPartyLogin />
            </div>
            <Divided color="transparent" className="mb-24" />
            <div className="text-center mt-30 register-actions">
                <p>
                    Already have an account?{' '}
                    <span className="cursor-pointer w600" role={'presentation'} tabIndex={-1} aria-label="Login" onClick={onOpenLogin}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    )
}
