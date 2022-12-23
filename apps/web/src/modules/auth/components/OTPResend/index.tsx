import React from 'react'
import classNames from 'classnames'
import { Types } from '@athena20/ts-types'
import { Spinner } from '@nixjs23n6/baseui-spinner'
import { Countdown, CountdownTypes } from '@nixjs23n6/baseui-countdown'

export const OTP_STATUS = {
    START: 1,
    END: 0,
    PROGRESSING: -1
}

export type OTPStatus = keyof typeof OTP_STATUS

interface OTPResendPropArg {
    availableTime: Types.Nullable<number>
    status: Types.Nullable<number>
    sendText?: string
    className?: string
    buttonStartClassName?: string
    buttonProgressingClassName?: string
    buttonEndClassName?: string
    children?: React.ReactNode
    onResendCallBack: () => void
}

export const OTPResend: React.FC<OTPResendPropArg> = ({
    availableTime,
    sendText = 'Resend',
    status,
    children,
    className,
    buttonStartClassName,
    buttonProgressingClassName,
    buttonEndClassName,
    onResendCallBack
}) => {
    const [timer, setTimer] = React.useState<number>(0)
    const [sendOtpStatus, setSendOtpStatus] = React.useState<number>(OTP_STATUS.END)

    React.useEffect(() => {
        return () => {
            setTimer(0)
        }
    }, [])

    React.useEffect(() => {
        if (availableTime && availableTime > 0) {
            setSendOtpStatus(OTP_STATUS.START)
            setTimer(availableTime)
        }
    }, [availableTime])

    React.useEffect(() => {
        if (status) {
            setSendOtpStatus(status)
        }
        return () => {
            setSendOtpStatus(OTP_STATUS.END)
        }
    }, [status])

    React.useEffect(() => {
        if (status === OTP_STATUS.END) {
            setTimer(0)
        }
    }, [status])

    const onResend = React.useCallback(() => {
        setSendOtpStatus(OTP_STATUS.PROGRESSING)
        if (typeof onResendCallBack === 'function') onResendCallBack()
    }, [onResendCallBack])

    const onComplete = (e: CountdownTypes.Status) => {
        if (e === 'COMPLETED') {
            setSendOtpStatus(OTP_STATUS.END)
        }
    }

    const renderCountdown = React.useMemo(() => {
        return (
            <>
                {
                    {
                        [OTP_STATUS.START]: (
                            <span className="ml-4 cursor-default d-inline-flex form-countdown form-countdown--start">
                                <span className={classNames('mr-8', buttonStartClassName)}>{sendText}</span>
                                <Countdown
                                    target={timer}
                                    options={{ minute: 'm', second: 's', className: 'd-inline-flex' }}
                                    onComplete={onComplete}
                                    showDay={false}
                                    showHour={false}
                                />
                            </span>
                        ),

                        [OTP_STATUS.PROGRESSING]: (
                            <div className="cursor-default d-inline-flex align-items-center form-countdown form-countdown--progressing">
                                <div className="d-inline-flex ml-4">
                                    <Spinner size="xs" className="d-flex" liteColor="var(--base-black-normal)" />
                                </div>
                                <span className={classNames('ml-4', buttonProgressingClassName)}>{sendText}</span>
                            </div>
                        ),
                        [OTP_STATUS.END]: (
                            <span
                                className={classNames(
                                    'ml-4 cursor-pointer d-inline-flex form-countdown form-countdown--end',
                                    buttonEndClassName
                                )}
                                role={'presentation'}
                                onClick={onResend}
                            >
                                {sendText}
                            </span>
                        )
                    }[sendOtpStatus]
                }
            </>
        )
    }, [buttonStartClassName, sendText, timer, buttonProgressingClassName, buttonEndClassName, onResend, sendOtpStatus])

    return (
        <div className={classNames('otp-resend', className)}>
            {children}
            <div className="d-inline-flex">{renderCountdown}</div>
        </div>
    )
}
