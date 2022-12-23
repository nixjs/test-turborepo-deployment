import React from 'react'
import { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { Button } from '@nixjs23n6/baseui-button'
import { Router } from 'consts/router'
import * as internalLoginSlice from 'redux/auth/login/internalLogin/slice'
import * as commonSlice from 'redux/common/slice'
import * as commonSelector from 'redux/common/selectors'
import { SidebarStyled } from './index.styled'

const ButtonCss = css`
    --base-button-min-width: auto;
    --base-button-min-width: 100%;
    border-color: transparent;
    color: var(--base-white);
    &:hover {
        color: var(--base-brand-third);
    }
`

interface SidebarNavPropArg {}

export const SidebarNav: React.FC<SidebarNavPropArg> = () => {
    const dispatch = useDispatch()
    const active = useSelector(commonSelector.triggerMenuSelector())

    const onClose = () => dispatch(commonSlice.onSetMenu(false))

    const onLogout = () => dispatch(internalLoginSlice.onRequestLogout())

    return (
        <SidebarStyled>
            <div className={classNames('s-menu', { active })}>
                <div
                    className="d-flex align-items-center justify-content-center s-menu__mburger"
                    role="presentation"
                    aria-label="Menu"
                    onClick={onClose}
                >
                    <i className="iconic_close text-24 base-white" />
                </div>
                <div className="s-menu__panel d-flex flex-column">
                    <div className="s-menu__head">
                        <div className="s-menu__logo text-center">
                            <Image src="/logo/ic_logo_light.png" alt="DeFi" width="69" height="24" />
                        </div>
                        <div className="s-menu__box-top">
                            <h3 className="mb-8 text-28 text-oswald base-white">Games</h3>
                            <div className="s-menu__games">
                                <Link href="/keno" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Keno
                                    </Button>
                                </Link>
                                <Link href="/dice" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Dice
                                    </Button>
                                </Link>
                            </div>
                            <div className="s-menu__games">
                                <Link href="/limbo" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Limbo
                                    </Button>
                                </Link>
                                <Link href="/instant-keno" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Instant Keno
                                    </Button>
                                </Link>
                            </div>
                            <div className="s-menu__games">
                                <Link href="/hilo" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        HiLo
                                    </Button>
                                </Link>
                                <Link href="/coin-flip" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        CoinFlip
                                    </Button>
                                </Link>
                            </div>
                            <div className="s-menu__games">
                                <Link href="/tower" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Tower
                                    </Button>
                                </Link>
                                <Link href="/triple" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Triple
                                    </Button>
                                </Link>
                            </div>
                            <div className="s-menu__games">
                                <Link href="/mines" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Mines
                                    </Button>
                                </Link>
                                <Link href="/space-dice" className="s-menu__game-item no-decoration">
                                    <Button overrideStyled={ButtonCss} variant="light" outline onClick={onClose}>
                                        Space Dice
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="relative s-menu__list">
                        <div className="w-100 h-100 scrollbar s-menu__list--wrap" role={'presentation'} onClick={onClose}>
                            <div className="s-menu__group">
                                <Link href={Router.ROUTER_WALLET} className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_wallet base-brand-third" />
                                    <span>My Wallet</span>
                                </Link>
                                <Link href={Router.ROUTER_PROFILE} className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_profile base-brand-third" />
                                    <span> My Profile</span>
                                </Link>
                            </div>
                            <div className="s-menu__group">
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_referral base-brand-third" />
                                    <span>My Referrals</span>
                                </Link>
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_prize base-brand-third" />
                                    <span>My Prize</span>
                                </Link>
                            </div>
                            <div className="s-menu__group">
                                <Link href="/news" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_news base-brand-third" />
                                    <span>News</span>
                                </Link>
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_statistic base-brand-third" />
                                    <span>Statistics</span>
                                </Link>
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_howtoplay base-brand-third" />
                                    <span>How to play</span>
                                </Link>
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_term base-brand-third" />
                                    <span>Term and conditions</span>
                                </Link>
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_shield-question base-brand-third" />
                                    <span>Customer services</span>
                                </Link>
                            </div>
                            <div className="s-menu__group">
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_languages base-black-darkest" />
                                    <span>Languages</span>
                                </Link>
                                <Link href="/" className="d-flex align-items-center text-decoration-none s-menu__link">
                                    <i className="iconic_theme base-black-darkest" />
                                    <span>Appearance</span>
                                </Link>
                            </div>
                            <div className="s-menu__group">
                                <a
                                    className="d-flex align-items-center text-decoration-none s-menu__link d-flex align-items-center text-decoration-none s-menu__link--logout"
                                    role={'presentation'}
                                    onClick={onLogout}
                                >
                                    <i className="iconic_logout base-black-darkest" />
                                    <span>Log out</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classNames('s-menu__overlay', { active })} role={'presentation'} onClick={onClose} />
        </SidebarStyled>
    )
}
