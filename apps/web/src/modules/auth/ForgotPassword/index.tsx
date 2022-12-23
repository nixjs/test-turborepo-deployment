import React from 'react'
import { useSelector } from 'react-redux'
import { AuthViewForgotStep } from 'redux/auth/types'
import * as forgotSelector from 'redux/auth/forgot/selectors'
import { RequestOTPForm } from './components/RequestOTPForm'
import { UpdatePasswordAndVerificationOTP } from './components/UpdatePasswordAndVerificationOTP'

interface AuthForgotPasswordModalPropArg {}

export const AuthForgotPasswordModal: React.FC<AuthForgotPasswordModalPropArg> = () => {
    const step = useSelector(forgotSelector.getForgotUIStepSelector())

    if (step === AuthViewForgotStep.FORGOT_PARAMS_REQUEST) {
        return <RequestOTPForm />
    }

    if (step === AuthViewForgotStep.RESET_PASSWORD) {
        return <UpdatePasswordAndVerificationOTP />
    }
    return <></>
}
