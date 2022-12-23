import React from 'react'
import { useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Types } from '@athena20/ts-types'
import { Router } from 'consts/router'
import * as commonSlice from 'redux/common/slice'
import { NavHeaderStyled } from './index.styled'

const MegaMenu = dynamic<Types.Object<any>>(() => import('../MegaMenu').then((mod) => mod.MegaMenu), {
    loading: () => <></>,
    ssr: false
})

interface NavHeaderPropArg {}
export const NavHeader: React.FC<NavHeaderPropArg> = () => {
    const dispatch = useDispatch()

    const onOpenSidebar = () => {
        dispatch(commonSlice.onSetMenu(true))
    }

    return (
        <NavHeaderStyled className="d-flex align-items-center justify-content-start">
            <button
                className="reset-button base-button-action d-flex align-items-center justify-content-center mr-10"
                aria-label="Open sidebar menu"
                onClick={onOpenSidebar}
            >
                <i className="iconic_menu text-24 base-brand-third" />
            </button>
            <nav className="align-items-center main-nav" aria-label="Main Navigation">
                <ul className="reset-ul">
                    <li className="main-nav-item">
                        <Link href={Router.ROUTER_GAME} className="d-inline-flex align-items-center main-nav-link">
                            <span data-text="Games" className="data-text align-middle">
                                Games
                            </span>
                            <i className="iconic_arrow_down_small text-24" />
                        </Link>
                        <MegaMenu />
                    </li>
                    <li className="main-nav-item">
                        <Link href="/" data-text="Winning Results" className="data-text d-block text-center main-nav-link">
                            Winning Results
                        </Link>
                    </li>
                    <li className="main-nav-item">
                        <Link href="/" data-text="Statistics" className="data-text d-block text-center main-nav-link">
                            Statistics
                        </Link>
                    </li>
                    <li className="main-nav-item">
                        <Link href="/" data-text="News" className="data-text d-block text-center main-nav-link">
                            News
                        </Link>
                    </li>
                    <li className="main-nav-item">
                        <Link href="/" data-text="How To Play" className="data-text d-block text-center main-nav-link">
                            How To Play
                        </Link>
                    </li>
                </ul>
            </nav>
        </NavHeaderStyled>
    )
}
