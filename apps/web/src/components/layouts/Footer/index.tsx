import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Types } from '@athena20/ts-types'
import { Container, Row, Col } from '@nixjs23n6/baseui-grid'
import { FooterStyled } from './styled'

const AboutFooter = dynamic<Types.Object<any>>(() => import('./components/About').then((mod) => mod.AboutFooter), {
    loading: () => <></>,
    ssr: true
})
const MenuFooter = dynamic<Types.Object<any>>(() => import('./components/Menu').then((mod) => mod.MenuFooter), {
    loading: () => <></>,
    ssr: true
})
const SocialFooter = dynamic<Types.Object<any>>(() => import('./components/Social').then((mod) => mod.SocialFooter), {
    loading: () => <></>,
    ssr: true
})
const LanguageFooter = dynamic<Types.Object<any>>(() => import('./components/Language').then((mod) => mod.LanguageFooter), {
    loading: () => <></>,
    ssr: false
})

interface FooterPropArg {}

export const Footer: React.FC<FooterPropArg> = () => {
    return (
        <FooterStyled className="footer">
            <Container>
                <div className="footer-wrapper">
                    <Row className="mb-48 footer-top">
                        <Col lg={5} className="footer-logo">
                            <Image src="/logo/defi_logo_dark.svg" alt="DeFi" width="111" height="38" />
                        </Col>
                        <Col lg={7}>
                            <Row>
                                <Col lg={8} sm={6} className="footer-social">
                                    <SocialFooter />
                                </Col>
                                <Col lg={4} sm={6} className="footer-lang">
                                    <LanguageFooter />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <AboutFooter />
                        </Col>
                        <Col lg={{ offset: 1, size: 7, order: 1 }}>
                            <MenuFooter />
                        </Col>
                    </Row>
                </div>
            </Container>
        </FooterStyled>
    )
}

Footer.displayName = 'Footer'
