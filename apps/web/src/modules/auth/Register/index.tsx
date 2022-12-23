import React from 'react'
import { useSelector } from 'react-redux'
import { AuthViewRegisterStep } from 'redux/auth/types'
import * as registerSelector from 'redux/auth/register/selectors'
import { RegisterForm } from 'modules/auth/Register/components/RegisterForm'
import { VerificationOTP } from 'modules/auth/Register/components/VerificationOTP'

interface AuthRegisterPropArg {}

export const AuthRegisterModal: React.FC<AuthRegisterPropArg> = () => {
    const step = useSelector(registerSelector.getRegisterUIStepSelector())

    if (step === AuthViewRegisterStep.REGISTER_PARAMS_REQUEST) {
        return <RegisterForm />
    }

    if (step === AuthViewRegisterStep.OTP_VERIFICATION) {
        return <VerificationOTP />
    }
    return <></>
}
