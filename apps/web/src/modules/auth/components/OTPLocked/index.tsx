import React from 'react'
import { Countdown, CountdownTypes } from '@nixjs23n6/baseui-countdown'
import classNames from 'classnames'

interface OTPLockedPropArg {
    timer: number
    onComplete: (e: CountdownTypes.Status) => void
    className?: string
}

export const OTPLocked: React.FC<OTPLockedPropArg> = ({ className, timer, onComplete }) => {
    return (
        <div className={classNames('otp-locked', className)}>
            <span>Wrong many times, please resend and enter OTP after </span>
            <Countdown
                target={timer}
                options={{ minute: 'm', second: 's', className: 'd-inline-flex' }}
                showDay={false}
                showHour={false}
                onComplete={(e) => onComplete(e)}
            />
        </div>
    )
}
