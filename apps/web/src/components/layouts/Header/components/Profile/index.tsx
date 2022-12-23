import React from 'react'
import { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { useOnClickOutside } from 'usehooks-ts'
import { Button } from '@nixjs23n6/baseui-button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IconCaretDropdown } from 'components/icons/iconCaretDropdown'
import { IconAvatar } from 'components/icons/iconAvatar'
import { Router } from 'consts/router'
import { Formatter } from '@lottery/utils'
import { BaseEnum } from '@lottery/types'
import * as internalLoginSlice from 'redux/auth/login/internalLogin/slice'
import { PaymentViewState } from 'redux/payment/types'
import * as paymentSlice from 'redux/payment/slice'
import { ProfileHeaderStyled } from './index.styled'

interface ProfileHeaderPropArg {}

export const ProfileHeader: React.FC<ProfileHeaderPropArg> = () => {
    const dispatch = useDispatch()
    const [dropdown, setDropdown] = React.useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    useOnClickOutside(dropdownRef, () => setDropdown(false))

    // const onOpenDepositModal = () => {
    //     // dispatch(openDepositModal(true))
    //     // dispatch(openOverlayModal(true))
    //     setDropdown(false)
    // }

    // const onOpenWithdrawalModal = () => {
    //     // dispatch(openWithdrawalModal(true))
    //     // dispatch(openOverlayModal(true))
    //     setDropdown(false)
    // }

    const onDepositModal = () => {
        dispatch(paymentSlice.onTriggerPaymentModal(BaseEnum.ActivateState.ACTIVATE))
        dispatch(paymentSlice.onSetPaymentViewState(PaymentViewState.DEPOSIT))
        setDropdown(false)
    }

    const onWithdrawalModal = () => {
        dispatch(paymentSlice.onTriggerPaymentModal(BaseEnum.ActivateState.ACTIVATE))
        dispatch(paymentSlice.onSetPaymentViewState(PaymentViewState.WITHDRAWAL))
        setDropdown(false)
    }

    const onLogout = () => {
        dispatch(internalLoginSlice.onRequestLogout())
    }

    return (
        <ProfileHeaderStyled
            className={classNames('position-relative d-inline-block', {
                active: dropdown,
                show: dropdown
            })}
            ref={dropdownRef}
        >
            <button
                className="d-flex align-items-center justify-content-center button-profile text-default position-relative base-black-darkest"
                aria-label="Profile Information"
                onClick={() => setDropdown(true)}
            >
                <div className="d-block d-sm-none profile-avatar">
                    <IconAvatar />
                </div>
                <div className="d-none d-sm-block profile-shorten mr-10">
                    <h3 className="m-0 text-16 w700 base-brand-third">Mohicans</h3>
                    <span className="text-16 base-black-darkest">{Formatter.onElliptingMiddle('TPwXnfaXjQQ5GASreVtzgRQDntVetUuEoY')}</span>
                </div>
                <div className="d-none d-sm-block profile-caret">
                    <IconCaretDropdown />
                </div>
            </button>
            <div className="position-absolute dropdown profile-dropdown">
                <div className="dropdown-inner">
                    <div className="dropdown-head relative text-center">
                        <h3 className="color-ink text-default m-0">Profile</h3>
                        <button
                            className="absolute d-flex align-items-center justify-content-center reset-button base-button-action profile-button-close"
                            onClick={() => setDropdown(true)}
                        >
                            <i className="iconic_close" />
                        </button>
                    </div>
                    <div className="dropdown-body">
                        <div className="dropdown-info text-center">
                            <div className="mb-24 d-flex align-items-center justify-content-center">
                                <span className="base-ink text-14 mr-8">Login by</span>
                                <Image height={24} width={100} src="/ic_metamask_with_text.svg" alt="Tronlink" />
                            </div>
                            <div>
                                <h3 className="text-16 base-brand-third">Mohicans (Username)</h3>
                                <div className="d-flex align-items-center justify-content-center base-functional-useful text-16 mb-16 cursor-pointer">
                                    {Formatter.onElliptingMiddle('TPwXnfaXjQQ5GASreVtzgRQDntVetUuEoY')}
                                    <CopyToClipboard text="TPwXnfaXjQQ5GASreVtzgRQDntVetUuEZ">
                                        <button className="reset-button base-button-action base-functional-useful mr-2">
                                            <i className="iconic_copy text-24" />
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <Button
                                        variant="primary"
                                        type="button"
                                        className="text-uppercase w700 base-white w-100 mr-16"
                                        onClick={onDepositModal}
                                        autoWidth
                                        overrideStyled={css`
                                            --base-button-height: 2.75rem;
                                            --base-button-radius: 0.5rem;
                                        `}
                                    >
                                        Deposit
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="text-uppercase w700 base-white w-100"
                                        onClick={onWithdrawalModal}
                                        autoWidth
                                        overrideStyled={css`
                                            --base-button-height: 2.75rem;
                                            --base-button-radius: 0.5rem;
                                        `}
                                    >
                                        Withdrawal
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-nav" role={'presentation'} onClick={() => setDropdown(false)}>
                            <ul className="nav reset-ul text-default">
                                <li className="text-start nav-item active" role="presentation">
                                    <Link href={Router.ROUTER_PROFILE} className="d-flex align-items-center base-brand-third nav-link">
                                        <i className="iconic_qr_code text-24 mr-4" />
                                        <span className="align-middle">My Referral Link</span>
                                    </Link>
                                </li>
                                <li className="text-start nav-item" role="presentation">
                                    <Link href={Router.ROUTER_TFA} className="d-flex align-items-center base-brand-third nav-link">
                                        <i className="iconic_security text-24 mr-4" />
                                        <span className="align-middle">Two-factor Authentication</span>
                                    </Link>
                                </li>
                                <li className="text-start nav-item" role="presentation">
                                    <Link href={Router.ROUTER_UP} className="d-flex align-items-center base-brand-third nav-link">
                                        <i className="iconic_key text-24 mr-4" />
                                        <span className="align-middle">Update Password</span>
                                    </Link>
                                </li>
                                <li className="text-start nav-item" role="presentation">
                                    <Link href={Router.ROUTER_UEA} className="d-flex align-items-center base-brand-third nav-link">
                                        <i className="iconic_email-address text-24 mr-4" />
                                        <span className="align-middle">Update Email Address</span>
                                    </Link>
                                </li>
                                <li className="text-start nav-item" role="presentation">
                                    <Link href={Router.ROUTER_DWA} className="d-flex align-items-center base-brand-third nav-link">
                                        <i className="iconic_withdraw text-24 mr-4" />
                                        <span className="align-middle">Default Prize Withdrawal Address</span>
                                    </Link>
                                </li>
                                <li className="text-start nav-item" role="presentation">
                                    <a
                                        className="d-flex align-items-center nav-link base-black-darkest"
                                        role={'presentation'}
                                        onClick={onLogout}
                                    >
                                        <i className="iconic_logout text-24 mr-4" />
                                        <span className="align-middle">Log out</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ProfileHeaderStyled>
    )
}
