import React from 'react'
import dynamic from 'next/dynamic'
import { Types } from '@athena20/ts-types'
import classNames from 'classnames'
import { Container } from '@nixjs23n6/baseui-grid'
import { HeaderStyled } from './index.styled'

// const BrandHeader = dynamic<Types.Object<any>>(() => import('./components/Brand').then((mod) => mod.BrandHeader), {
//     loading: () => <></>,
//     ssr: true
// })
const NavHeader = dynamic<Types.Object<any>>(() => import('./components/Nav').then((mod) => mod.NavHeader), {
    loading: () => <></>,
    ssr: true
})
const WalletHeader = dynamic<Types.Object<any>>(() => import('./components/Wallet').then((mod) => mod.Wallet), {
    loading: () => <></>,
    ssr: true
})
const SignHeader = dynamic<Types.Object<any>>(() => import('./components/Sign').then((mod) => mod.SignHeader), {
    loading: () => <></>,
    ssr: false
})
const SidebarNav = dynamic<Types.Object<any>>(() => import('components/layouts/Sidebar').then((mod) => mod.SidebarNav), {
    loading: () => <></>,
    ssr: false
})

interface HeaderPropArg {}

export const Header: React.FC<HeaderPropArg> = () => {
    const headerRef = React.useRef<HTMLDivElement>(null)
    const [activeClass, setActiveClass] = React.useState<string>('')
    const handleScroll = () => {
        const scroll = document.body.scrollTop || document.documentElement.scrollTop
        if (scroll >= 64) {
            setActiveClass('fixed')
        } else {
            setActiveClass('')
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <HeaderStyled ref={headerRef} className={classNames('position-sticky zindex-sticky header', activeClass)}>
            <Container fluid className="h-100">
                <div className="d-flex flex-row align-items-center justify-content-between h-100">
                    <NavHeader />
                    <WalletHeader />
                    <SignHeader />
                </div>
            </Container>
            <SidebarNav />
        </HeaderStyled>
    )
}

Header.displayName = 'Header'
