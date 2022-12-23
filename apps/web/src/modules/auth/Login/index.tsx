import React from 'react'
import { useDispatch } from 'react-redux'
import { Divided } from '@lottery/uikit'
import { AuthViewScreenState, AuthViewForgotStep } from 'redux/auth/types'
import * as authSlice from 'redux/auth/slice'
import * as forgotSlice from 'redux/auth/forgot/slice'
import { ThirdPartyLogin } from 'modules/auth/ThirdPartyLogin'
import { LoginForm } from 'modules/auth/Login/components/LoginForm'

interface AuthLoginModalPropArg {}

export const AuthLoginModal: React.FC<AuthLoginModalPropArg> = () => {
    const dispatch = useDispatch()

    const onOpenRegister = () => {
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.REGISTER))
    }

    const onOpenForgot = () => {
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.FORGOT_PASSWORD))
        dispatch(forgotSlice.onSetForgotUIStep(AuthViewForgotStep.FORGOT_PARAMS_REQUEST))
    }

    return (
        <>
            <LoginForm />
            <div className="text-center">
                <a className="cursor-pointer" role={'presentation'} onClick={onOpenForgot}>
                    Forgot password
                </a>
            </div>
            <Divided color="transparent" className="mb-24" />
            <h3 className="text-16 mb-24 text-center">Or log in directly with</h3>
            <div className="d-flex align-items-center justify-content-center">
                <ThirdPartyLogin />
            </div>
            <Divided color="transparent" className="mb-24" />
            <div className="text-center mt-30 register-actions">
                <p>
                    Don&lsquo;t have an account yet?{' '}
                    <span className="cursor-pointer w600" role={'presentation'} tabIndex={-1} aria-label="Login" onClick={onOpenRegister}>
                        Register
                    </span>
                </p>
            </div>
        </>
    )
}
