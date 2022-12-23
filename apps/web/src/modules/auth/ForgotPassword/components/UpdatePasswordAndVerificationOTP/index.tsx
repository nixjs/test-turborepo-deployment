import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Types } from '@athena20/ts-types'
import { CountdownTypes } from '@nixjs23n6/baseui-countdown'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@nixjs23n6/baseui-button'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Input, FormError, Divided } from '@lottery/uikit'
import { ForgotTypes } from 'types/auth/forgot'
import { OTPResend, OTP_STATUS } from 'modules/auth/components/OTPResend'
import { OTPLocked } from 'modules/auth/components/OTPLocked'
import * as authSlice from 'redux/auth/slice'
import * as authSelector from 'redux/auth/selectors'
import * as forgotSlice from 'redux/auth/forgot/slice'
import * as forgotSelector from 'redux/auth/forgot/selectors'
import { VerificationOTPStyled } from './VerificationOTP.styled'
import { ResetPasswordSchema } from './validator'

interface UpdatePasswordAndVerificationOTPPropArg {}

export const UpdatePasswordAndVerificationOTP: React.FC<UpdatePasswordAndVerificationOTPPropArg> = () => {
    const dispatch = useDispatch()
    const OTPVerificationFailed = useSelector(forgotSelector.getOTPVerificationFailedSelector())
    const otpLockedResendTimer: Types.Nullable<number> = useSelector(authSelector.getOTPLockedResendTimerSelector())
    const otpLockedUserTimer: Types.Nullable<number> = useSelector(authSelector.getOTPLockedUserSelector())
    const resendOTPFailed = useSelector(forgotSelector.getResendOTPFailedFailedSelector())
    const loading = useSelector(forgotSelector.getLoadingSelector())

    const [error, setError] = React.useState<boolean>(false)
    const [allowResend, setAllowResend] = React.useState<boolean>(true)
    const [sendOtpStatus, setSendOtpStatus] = React.useState<Types.Nullable<number>>(null)
    const [timerLocked, setTimerLocked] = React.useState<number>(0)
    const [pwdShown, setPwdShown] = React.useState<boolean>(false)
    const [confirmPwdShown, setConfirmPwdShown] = React.useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<ForgotTypes.ResetPasswordParamRequest>({
        resolver: yupResolver(ResetPasswordSchema)
    })

    const onResend = () => {
        setValue('otp', '')
        setError(false)
        dispatch(forgotSlice.onGetOTPVerificationFailed(null))
        dispatch(forgotSlice.onRequestToResendOTPFailed(null))
        dispatch(forgotSlice.onRequestToResendOTP(true))
        dispatch(authSlice.onSetOTPLockedResendTimer(null))
    }

    const onTimerComplete = (e: CountdownTypes.Status) => {
        if (e === 'COMPLETED') {
            setAllowResend(true)
            dispatch(forgotSlice.onGetOTPVerificationFailed(null))
            dispatch(authSlice.onSetOTPLockedUserTimer(null))
            setSendOtpStatus(OTP_STATUS.END)
        }
    }

    const onBackInputEmail = () => {
        dispatch(forgotSlice.onResetStateToRetryForgot())
    }

    const onSubmit = handleSubmit((data: ForgotTypes.ResetPasswordParamRequest) => {
        if (data) {
            dispatch(forgotSlice.onRequestToResetPassword(data))
            dispatch(forgotSlice.onSetLoading(true))
        }
    })

    React.useEffect(() => {
        return () => {
            reset()
        }
    }, [reset])

    React.useEffect(() => {
        return () => {
            setAllowResend(true)
            dispatch(forgotSlice.onGetOTPVerificationFailed(null))
            dispatch(authSlice.onSetOTPLockedResendTimer(null))
            dispatch(authSlice.onSetOTPLockedUserTimer(null))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (otpLockedUserTimer && otpLockedUserTimer > 0) {
            setTimerLocked(otpLockedUserTimer)
            setAllowResend(false)
        }
    }, [otpLockedUserTimer])

    React.useEffect(() => {
        setError(!!OTPVerificationFailed)
        if (OTPVerificationFailed) {
            setValue('otp', '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [OTPVerificationFailed])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = e
        if (value.length > 0 && !errors['otp'] && error) {
            setError(false)
        }
    }

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

    return (
        <VerificationOTPStyled className="pl-16 pr-16">
            <div className="d-flex align-items-center justify-content-center pt-16 mb-24 position-relative auth-heading-group">
                <button
                    className="reset-button button-action position-absolute d-inline-flex align-items-center justify-content-center text-24"
                    type="button"
                    aria-label="Back to Account Registration"
                    onClick={onBackInputEmail}
                >
                    <i className="iconic_arrow_left" />
                </button>
                <h3 className="base-brand-third w500 text-oswald text-28 text-center auth-heading">Reset Password</h3>
            </div>
            <div className="m-auto auth-form">
                <div className="content">
                    <form onSubmit={onSubmit}>
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
                        <Input
                            label="OTP"
                            classNameLabel="mb-8 w400 base-black-darker"
                            classNameContent="d-flex flex-fill"
                            id="otp"
                            type="text"
                            placeholder="Enter your OTP"
                            register={register('otp', {
                                onChange: (e) => onInputChange(e),
                                disabled: !allowResend && timerLocked > 0
                            })}
                            autoComplete="off"
                            spellCheck="false"
                            maxLength={6}
                            classNameWrapper="mb-8"
                            disabled={error}
                            error={!!errors.otp || error}
                        />
                        <FormError errors={errors} name="otp" className="base-functional-stressful text-14" />
                        {!allowResend && timerLocked > 0 && (
                            <OTPLocked className="mt-8 text-danger text-14 text-center" timer={timerLocked} onComplete={onTimerComplete} />
                        )}
                        {allowResend && (
                            <OTPResend
                                className="mt-8 d-flex align-items-center justify-content-center base-black-darker"
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
                        <Divided color="transparent" />
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-100 mt-24 d-flex align-items-center justify-content-center flex uppercase text-white mb-8 rd-8"
                            isLoading={loading}
                            disabled={loading}
                            spinnerLoading={<Spinner liteColor="var(--base-black-normal)" />}
                        >
                            Reset Password
                        </Button>
                    </form>
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
