import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nixjs23n6/baseui-button'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Input, FormError, Divided } from '@lottery/uikit'
import { ThirdPartyLogin } from 'modules/auth/ThirdPartyLogin'
import { RegisterTypes } from 'types/auth/register'
import { AuthViewScreenState } from 'redux/auth/types'
import * as authSlice from 'redux/auth/slice'
import * as registerSlice from 'redux/auth/register/slice'
import * as registerSelector from 'redux/auth/register/selectors'
import { RegisterSchema } from '../validator'

interface RegisterFormPropArg {}

export const RegisterForm: React.FC<RegisterFormPropArg> = () => {
    const dispatch = useDispatch()
    const loading = useSelector(registerSelector.getLoadingSelector())
    const registerRequestFailed = useSelector(registerSelector.getRegisterFailedSelector())
    const [pwdShown, setPwdShown] = React.useState<boolean>(false)
    const [confirmPwdShown, setConfirmPwdShown] = React.useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegisterTypes.RegisterFormParams>({
        resolver: yupResolver(RegisterSchema)
    })

    React.useEffect(() => {
        return () => {
            reset()
        }
    }, [reset])

    const onSubmit = handleSubmit(
        (data: RegisterTypes.RegisterFormParams) => {
            if (registerRequestFailed) {
                dispatch(registerSlice.onGetRegisterFailed(null))
            }
            if (data) {
                dispatch(registerSlice.onRequestRegister(data))
                dispatch(registerSlice.onSetLoading(true))
            }
        },
        () => {
            if (registerRequestFailed) {
                dispatch(registerSlice.onGetRegisterFailed(null))
            }
        }
    )

    const renderPwdShown = React.useCallback(() => {
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

    const renderConfirmPwdShown = React.useCallback(() => {
        return (
            <div
                className="d-flex form-eye-control cursor-pointer"
                role="presentation"
                aria-label={confirmPwdShown ? 'Off' : 'On'}
                onClick={() => setConfirmPwdShown(!confirmPwdShown)}
            >
                {confirmPwdShown ? <i className="iconic_eye_off text-24" /> : <i className="iconic_eye_on text-24" />}
            </div>
        )
    }, [confirmPwdShown])

    const onOpenLogin = () => {
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.LOGIN))
    }

    return (
        <div className="pl-16 pr-16">
            <div className="m-auto pt-8 auth-form">
                <h3 className="base-brand-third w500 text-oswald text-28 mb-16 text-center auth-heading">Register Account</h3>
                <div className="content">
                    <form onSubmit={onSubmit}>
                        <Input
                            label="Name"
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            id="name"
                            type={'text'}
                            placeholder="Enter your name"
                            register={register('name')}
                            autoComplete="off"
                            spellCheck="false"
                            classNameWrapper="mb-8"
                            error={!!errors.name}
                        />
                        <FormError errors={errors} name="name" className="base-functional-stressful text-14" />
                        <Divided color="transparent" />
                        <Input
                            label="Email Address"
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            id="email"
                            type={'email'}
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
                            label="Password:"
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            id="password"
                            type={pwdShown ? 'text' : 'password'}
                            placeholder="Enter your password"
                            register={register('password')}
                            suffixHTML={renderPwdShown()}
                            autoComplete="off"
                            spellCheck="false"
                            classNameWrapper="mb-8"
                            error={!!errors.password}
                        />
                        <FormError errors={errors} name="password" className="base-functional-stressful text-14" />
                        <Divided color="transparent" />
                        <Input
                            label="Confirm Password"
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            id="confirmPassword"
                            type={confirmPwdShown ? 'text' : 'password'}
                            placeholder="Enter your confirm password"
                            register={register('confirmPassword')}
                            suffixHTML={renderConfirmPwdShown()}
                            autoComplete="off"
                            spellCheck="false"
                            classNameWrapper="mb-8"
                            error={!!errors.confirmPassword}
                        />
                        <FormError errors={errors} name="confirmPassword" className="base-functional-stressful text-14" />
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
                            Register
                        </Button>
                        <p className="base-black-darker">
                            By tapping “Register” button, you are agreeing to
                            <br /> the
                            <Link href="/" className="text-decoration-underline cursor-pointer ml-4" target="_blank">
                                Terms and Conditions.
                            </Link>
                        </p>
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
