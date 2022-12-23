import React from 'react'
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@nixjs23n6/baseui-button'
import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { IconCart } from 'components/icons/iconCart'
import { IconAddCart } from 'components/icons/iconAddCart'
import * as authSlice from 'redux/auth/slice'
import * as authSelector from 'redux/auth/selectors'
import { AuthViewScreenState, AuthViewRegisterStep } from 'redux/auth/types'
import { SignHeaderStyled } from './index.styled'

const ProfileHeader = dynamic<Types.Object<any>>(() => import('../Profile').then((mod) => mod.ProfileHeader), {
    loading: () => <></>,
    ssr: false
})

interface SignHeaderPropArg {}

export const SignHeader: React.FC<SignHeaderPropArg> = () => {
    const dispatch = useDispatch()

    const loggedIn = useSelector(authSelector.getLoggedInSelector())
    const totalInCarts = 1

    const onLogin = () => {
        dispatch(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.ACTIVATE))
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.LOGIN))
    }
    const onRegister = () => {
        dispatch(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.ACTIVATE))
        dispatch(authSlice.onSetAuthViewScreenState(AuthViewScreenState.REGISTER))
        dispatch(authSlice.onSetAuthRegisterStep(AuthViewRegisterStep.REGISTER_PARAMS_REQUEST))
    }

    return (
        <SignHeaderStyled className="d-flex align-items-center justify-content-end">
            <button className="reset-button position-relative button-cart" aria-label="Cart">
                {totalInCarts > 0 ? (
                    <>
                        <IconCart />
                        <span className="position-absolute rd-circle text-center d-block text-14 w700 badge-cart">{totalInCarts}</span>
                    </>
                ) : (
                    <IconAddCart />
                )}
            </button>
            {loggedIn ? (
                <ProfileHeader />
            ) : (
                <>
                    <Button variant="secondary" autoWidth className="base-white text-uppercase w700 mr-24 rd-8" onClick={onRegister}>
                        Register
                    </Button>
                    <Button variant="primary" autoWidth className="base-white text-uppercase w700 rd-8" onClick={onLogin}>
                        Login
                    </Button>
                </>
            )}
        </SignHeaderStyled>
    )
}
