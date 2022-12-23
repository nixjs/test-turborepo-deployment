import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@nixjs23n6/baseui-button'
import { BaseEnum } from '@lottery/types'
import { Banner } from 'components/Banner'
import { PaymentViewState } from 'redux/payment/types'
import * as paymentSlice from 'redux/payment/slice'

interface WalletBannerPropArg {}

export const WalletBanner: React.FC<WalletBannerPropArg> = () => {
    const dispatch = useDispatch()
    const onDepositModal = () => {
        dispatch(paymentSlice.onTriggerPaymentModal(BaseEnum.ActivateState.ACTIVATE))
        dispatch(paymentSlice.onSetPaymentViewState(PaymentViewState.DEPOSIT))
    }

    const onWithdrawalModal = () => {
        dispatch(paymentSlice.onTriggerPaymentModal(BaseEnum.ActivateState.ACTIVATE))
        dispatch(paymentSlice.onSetPaymentViewState(PaymentViewState.WITHDRAWAL))
    }
    return (
        <Banner className="d-flex align-items-center">
            <div className="d-flex align-items-center wallet-banner-content">
                <div className="actions">
                    <Button variant="light" className="text-uppercase base-brand-primary rd-8 mr-16" autoWidth onClick={onDepositModal}>
                        <i className="iconic_deposit1 text-24 mr-12" />
                        Deposit
                    </Button>
                    <Button variant="light" className="text-uppercase base-brand-second rd-8 mr-16" autoWidth onClick={onWithdrawalModal}>
                        <i className="iconic_withdrawal text-24 mr-12" />
                        Withdrawal
                    </Button>
                </div>
            </div>
        </Banner>
    )
}
