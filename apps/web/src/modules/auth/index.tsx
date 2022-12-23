import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { Modal } from '@nixjs23n6/baseui-modal'
import { BaseEnum } from '@lottery/types'
import { AuthViewRegisterStep, AuthViewScreenState, AuthViewForgotStep } from 'redux/auth/types'
import * as authSlice from 'redux/auth/slice'
import * as authRegisterSlice from 'redux/auth/register/slice'
import * as authForgotSlice from 'redux/auth/forgot/slice'
import * as authSelector from 'redux/auth/selectors'
import { ModalCss } from 'modules/auth/styled/Modal.css'
import { AuthLoginModal } from 'modules/auth/Login'
import { AuthRegisterModal } from 'modules/auth/Register'
import { AuthForgotPasswordModal } from 'modules/auth/ForgotPassword'
// import { Modal } from './Modal'

interface AuthModalPropArg {}

export const AuthModal: React.FC<AuthModalPropArg> = () => {
    const dispatch = useDispatch()
    const authModal = useSelector(authSelector.onOpenAuthSelector())
    const viewScreenState = useSelector(authSelector.onGetViewScreenState())

    const [open, setOpen] = React.useState<BaseEnum.ActivateState>()
    const authRef = React.useRef(null)

    React.useEffect(() => {
        setOpen(authModal)
    }, [authModal])

    const onCloseModal = () => {
        dispatch(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.DEACTIVATE))
        // reset base
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.LOGIN))
        dispatch(authSlice.onSetOTPLockedResendTimer(null))
        dispatch(authSlice.onSetMaxFailedAttempt(0))
        // register
        dispatch(authRegisterSlice.onResetStateToRetryRegister())
        dispatch(authRegisterSlice.onSetRegisterUIStep(AuthViewRegisterStep.REGISTER_PARAMS_REQUEST))
        // forgot
        dispatch(authForgotSlice.onResetStateToRetryForgot())
        dispatch(authForgotSlice.onSetForgotUIStep(AuthViewForgotStep.FORGOT_PARAMS_REQUEST))
    }

    const renderAuth = React.useMemo(() => {
        if (viewScreenState === AuthViewScreenState.LOGIN) {
            return <AuthLoginModal />
        }
        if (viewScreenState === AuthViewScreenState.REGISTER) {
            return <AuthRegisterModal />
        }
        if (viewScreenState === AuthViewScreenState.FORGOT_PASSWORD) {
            return <AuthForgotPasswordModal />
        }
        return <></>
    }, [viewScreenState])

    return (
        <Modal
            as={'div'}
            open={open === BaseEnum.ActivateState.ACTIVATE}
            onClose={onCloseModal}
            animation
            animationName="fadeIn"
            closeOnEsc={false}
            closeOnClickOutside={false}
            unmountOnExit
            showClose
            ref={authRef}
            className={classNames('auth-modal', {
                'modal-login': viewScreenState === AuthViewScreenState.LOGIN,
                'modal-register': viewScreenState === AuthViewScreenState.REGISTER,
                'modal-forgot': viewScreenState === AuthViewScreenState.FORGOT_PASSWORD
            })}
            overrideStyled={ModalCss}
        >
            <Modal.Body>
                <div className="auth_container">
                    <div className="auth_dialog">
                        <div className="auth_content-body">{renderAuth}</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
