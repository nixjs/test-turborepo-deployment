import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@nixjs23n6/baseui-modal'
import { Button } from '@nixjs23n6/baseui-button'
import { BaseEnum } from '@lottery/types'
import * as authSlice from 'redux/auth/slice'
import * as authInternalLoginSlice from 'redux/auth/login/internalLogin/slice'
import { getSessionExpiredSelector } from 'redux/auth/selectors'
import { SessionExpiredCss, SessionExpiredStyled } from './index.styled'

interface SessionExpiredModalPropArg {}

export const SessionExpiredModal: React.FC<SessionExpiredModalPropArg> = () => {
    const dispatch = useDispatch()
    const sessionExpiredRef = React.useRef(null)

    const expired = useSelector(getSessionExpiredSelector())

    const onCloseModal = () => {
        dispatch(authSlice.onSetSessionExpiredModal(BaseEnum.ActivateState.DEACTIVATE))
    }

    const onRefresh = () => {
        dispatch(authInternalLoginSlice.onRequestLogout())
        dispatch(authSlice.onSetSessionExpiredModal(BaseEnum.ActivateState.DEACTIVATE))
        dispatch(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.ACTIVATE))
    }

    return (
        <Modal
            as={'div'}
            open={expired === BaseEnum.ActivateState.ACTIVATE}
            onClose={onCloseModal}
            animation
            animationName="fadeIn"
            closeOnEsc
            showClose
            unmountOnExit
            overrideStyled={SessionExpiredCss}
            ref={sessionExpiredRef}
        >
            <Modal.Body>
                <SessionExpiredStyled>
                    <div className="box">
                        <div className="text-center">
                            <div className="box-provider">
                                <h3 className="font-titillium text">Your session has expired</h3>
                            </div>
                            <p className="mt-16 box-description">Please refresh the page or try to login again.</p>
                        </div>
                        <div className="mt-32 d-flex justify-content-center">
                            <Button variant="primary" className="rd-8 base-white" autoWidth onClick={onRefresh}>
                                Refresh
                            </Button>
                        </div>
                    </div>
                </SessionExpiredStyled>
            </Modal.Body>
        </Modal>
    )
}
