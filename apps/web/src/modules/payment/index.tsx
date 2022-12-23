import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@nixjs23n6/baseui-modal'
import { BaseEnum } from '@lottery/types'
import { PaymentViewState } from 'redux/payment/types'
import * as paymentSlice from 'redux/payment/slice'
import * as paymentSelector from 'redux/payment/selectors'
import * as depositSlice from 'redux/payment/deposit/slice'
import * as depositExternalSlice from 'redux/payment/deposit/external/slice'
import { DepositComponent } from './Deposit'
import { ModalCss } from './Modal.css'

interface PaymentModalPropArg {}

export const PaymentModal: React.FC<PaymentModalPropArg> = () => {
    const dispatch = useDispatch()
    const paymentModal = useSelector(paymentSelector.triggerPaymentSelector())
    const paymentViewState = useSelector(paymentSelector.paymentViewStateSelector())

    const [open, setOpen] = React.useState<BaseEnum.ActivateState>()
    const paymentRef = React.useRef(null)

    React.useEffect(() => {
        setOpen(paymentModal)
    }, [paymentModal])

    const onCloseModal = () => {
        dispatch(paymentSlice.onTriggerPaymentModal(BaseEnum.ActivateState.DEACTIVATE))
        dispatch(depositSlice.onResetDepositModalState())
        dispatch(depositExternalSlice.onResetDepositExternalState())
    }
    const renderAuth = React.useMemo(() => {
        if (paymentViewState === PaymentViewState.DEPOSIT) {
            return <DepositComponent />
        }
        if (paymentViewState === PaymentViewState.WITHDRAWAL) {
            return <></>
        }
        return <></>
    }, [paymentViewState])

    return (
        <Modal
            as={'div'}
            open={open === BaseEnum.ActivateState.ACTIVATE}
            onClose={onCloseModal}
            animation
            animationName="fadeIn"
            closeOnEsc={false}
            closeOnClickOutside={false}
            showClose
            unmountOnExit
            ref={paymentRef}
            className="auth-modal"
            overrideStyled={ModalCss}
        >
            <Modal.Body>
                <div className="payment_container">
                    <div className="payment_dialog">
                        {/* <div className="pt-16 pl-16 pr-16 mb-16 payment_tab">
                            <div className="d-flex align-items-center">
                                <Button variant="primary" autoWidth className="tab-item mr-16 base-white">
                                    <i className="iconic_deposit1 text-24" />
                                    Deposit
                                </Button>
                                <Button variant="light" autoWidth className="tab-item">
                                    <i className="iconic_withdrawal text-24" />
                                    Withdraw
                                </Button>
                            </div>
                        </div> */}
                        <div className="payment_content-body">{renderAuth}</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
