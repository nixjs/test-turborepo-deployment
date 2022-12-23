import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nixjs23n6/baseui-button'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Input, FormError, Divided } from '@lottery/uikit'
import { LoginTypes } from 'types/auth/login'
import * as internalLoginSlice from 'redux/auth/login/internalLogin/slice'
import * as internalLoginSelector from 'redux/auth/login/internalLogin/selectors'
import { LoginSchema } from '../validator'

interface LoginFormPropArg {}

export const LoginForm: React.FC<LoginFormPropArg> = () => {
    const dispatch = useDispatch()
    const loading = useSelector(internalLoginSelector.getLoadingSelector())
    const [pwdShown, setPwdShown] = React.useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginTypes.LoginInternalFormRequest>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {}
    })

    React.useEffect(() => {
        return () => {
            reset()
        }
    }, [reset])

    const onSubmit = (data: LoginTypes.LoginInternalFormRequest) => {
        if (data) {
            dispatch(internalLoginSlice.onRequestInternalLogin(data))
            dispatch(internalLoginSlice.onSetLoading(true))
        }
    }

    const renderPwdShown = React.useMemo(() => {
        return (
            <div
                className="d-flex form-eye-control cursor-pointer"
                role="presentation"
                aria-label={pwdShown ? 'Off' : 'On'}
                onClick={() => setPwdShown(!pwdShown)}
            >
                {pwdShown ? <i className="iconic_eye_off text-24" /> : <i className="iconic_eye_on text-24" />}
            </div>
        )
    }, [pwdShown])

    return (
        <div className="m-auto pt-8 auth-form pl-16 pr-16">
            <h3 className="base-brand-third w500 text-oswald text-28 text-center mb-16 auth-heading">Login Account</h3>
            <div className="content">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email Address"
                        classNameLabel="mb-8 w400 base-black-darker"
                        classNameContent="d-flex flex-fill"
                        id="email"
                        type={'email'}
                        min={0}
                        placeholder="Enter your email address"
                        register={register('email')}
                        autoComplete="off"
                        spellCheck="false"
                        classNameWrapper="mb-8"
                        error={!!errors.email}
                    />
                    <FormError errors={errors} name="email" className="base-functional-stressful text-14" />
                    <Divided color="transparent" />
                    <Input
                        label="Password"
                        classNameLabel="mb-8 w400 base-black-darker"
                        classNameContent="d-flex flex-fill"
                        id="password"
                        type={pwdShown ? 'text' : 'password'}
                        placeholder="Enter your password"
                        register={register('password')}
                        suffixHTML={renderPwdShown}
                        autoComplete="off"
                        spellCheck="false"
                        classNameWrapper="mb-8"
                        error={!!errors.password}
                    />
                    <FormError errors={errors} name="password" className="base-functional-stressful text-14" />
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
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}
