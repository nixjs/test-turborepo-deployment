import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Types } from '@athena20/ts-types'
import { CountdownTypes } from '@nixjs23n6/baseui-countdown'
import classNames from 'classnames'
import PinField from 'react-pin-field'
import { OTPResend, OTP_STATUS } from 'modules/auth/components/OTPResend'
import { OTPLocked } from 'modules/auth/components/OTPLocked'
import * as authSlice from 'redux/auth/slice'
import * as authSelector from 'redux/auth/selectors'
import * as registerSlice from 'redux/auth/register/slice'
import * as registerSelector from 'redux/auth/register/selectors'
import { VerificationOTPStyled } from './VerificationOTP.styled'

interface VerificationOTPPropArg {}

export const VerificationOTP: React.FC<VerificationOTPPropArg> = () => {
    const dispatch = useDispatch()
    const pinRef = React.useRef<HTMLInputElement[]>(null)
    const OTPVerificationFailed = useSelector(registerSelector.getOTPVerificationFailedSelector())
    const otpLockedResendTimer: Types.Nullable<number> = useSelector(authSelector.getOTPLockedResendTimerSelector())
    const otpLockedUserTimer: Types.Nullable<number> = useSelector(authSelector.getOTPLockedUserSelector())
    const resendOTPFailed = useSelector(registerSelector.getResendOTPFailedFailedSelector())
    const [error, setError] = React.useState<boolean>(false)
    const [allowResend, setAllowResend] = React.useState<boolean>(true)
    const [sendOtpStatus, setSendOtpStatus] = React.useState<Types.Nullable<number>>(null)
    const [timerLocked, setTimerLocked] = React.useState<number>(0)

    const onComplete = (code: string) => {
        dispatch(registerSlice.onSetLoading(true))
        dispatch(registerSlice.onRequestOTPVerification(code))
    }

    const onChange = (code: string) => {
        if (OTPVerificationFailed && Object.keys(OTPVerificationFailed).length > 0) dispatch(registerSlice.onGetOTPVerificationFailed(null))
        if (!code || code.length === 0) setError(false)
    }

    const onResetPinCode = () => {
        pinRef.current && pinRef.current.forEach((input) => (input.value = ''))
    }

    const onResend = () => {
        onResetPinCode()
        setError(false)
        dispatch(registerSlice.onRequestToResendOTP(true))
        dispatch(registerSlice.onGetOTPVerificationFailed(null))
        dispatch(registerSlice.onRequestToResendOTPFailed(null))
        dispatch(authSlice.onSetOTPLockedResendTimer(null))
    }

    const onTimerComplete = (e: CountdownTypes.Status) => {
        if (e === 'COMPLETED') {
            setAllowResend(true)
            dispatch(registerSlice.onGetOTPVerificationFailed(null))
            dispatch(authSlice.onSetOTPLockedUserTimer(null))
            setSendOtpStatus(OTP_STATUS.END)
        }
    }

    const onBackInputEmailPassword = () => {
        dispatch(registerSlice.onResetStateToRetryRegister())
    }

    React.useEffect(() => {
        return () => {
            setAllowResend(true)
            dispatch(registerSlice.onGetOTPVerificationFailed(null))
            dispatch(authSlice.onSetOTPLockedResendTimer(null))
            dispatch(authSlice.onSetOTPLockedUserTimer(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (pinRef.current) {
            pinRef.current[0].focus()
        }
    }, [])

    React.useEffect(() => {
        if (otpLockedUserTimer && otpLockedUserTimer > 0) {
            setTimerLocked(otpLockedUserTimer)
            setAllowResend(false)
        }
    }, [otpLockedUserTimer])

    React.useEffect(() => {
        setError(!!OTPVerificationFailed)
        if (!!OTPVerificationFailed && pinRef.current) {
            onResetPinCode()
            pinRef.current[0].focus()
        }
    }, [OTPVerificationFailed])

    return (
        <VerificationOTPStyled>
            <div className="d-flex align-items-center justify-content-center pt-16 mb-24 position-relative auth-heading-group">
                <button
                    className="reset-button button-action position-absolute d-inline-flex align-items-center justify-content-center text-24"
                    type="button"
                    aria-label="Back to Account Registration"
                    onClick={onBackInputEmailPassword}
                >
                    <i className="iconic_arrow_left" />
                </button>
                <h3 className="base-brand-third w500 text-oswald text-28 text-center auth-heading">OTP Verification</h3>
            </div>
            <div className="pl-16 pr-16 m-auto auth-form">
                <div className="content">
                    <p className="mb-24 text-font-color-secondary text-center">
                        A OTP code has been sent to your email. Enter your OTP code to verify account.
                    </p>
                    <div className="mt-16 form-group">
                        <label className="form-label" htmlFor="pin">
                            Enter OTP code:
                        </label>
                        <div className={classNames('d-flex justify-content-center', { error })}>
                            <PinField
                                ref={pinRef}
                                className="form-input"
                                length={6}
                                id="pin"
                                onChange={onChange}
                                onComplete={onComplete}
                                disabled={!allowResend}
                            />
                        </div>
                        {!allowResend && timerLocked > 0 && (
                            <OTPLocked className="mt-8 text-danger text-14 text-center" timer={timerLocked} onComplete={onTimerComplete} />
                        )}
                    </div>
                    {allowResend && (
                        <OTPResend
                            className="d-flex align-items-center justify-content-center mt-16 base-black-darker"
                            status={resendOTPFailed ? 0 : sendOtpStatus}
                            onResendCallBack={onResend}
                            availableTime={otpLockedResendTimer}
                            buttonStartClassName="base-black-darker w700"
                            buttonProgressingClassName="base-black-darker w700"
                            buttonEndClassName="text-primary w700"
                        >
                            Don&lsquo;t receive a code?
                        </OTPResend>
                    )}
                    <div className="mt-48 otp-description">
                        <p className="text-font-color-secondary">If you did not receive the email, try the following:</p>
                        <ul>
                            <li className="text-font-color-secondary">Make sure the email address you entered is correct and valid.</li>
                            <li className="text-font-color-secondary"> Check spam or junk mail folders.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </VerificationOTPStyled>
    )
}
