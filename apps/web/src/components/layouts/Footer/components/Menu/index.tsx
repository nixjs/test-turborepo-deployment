import React from 'react'
import Link from 'next/link'
import { Row, Col } from '@nixjs23n6/baseui-grid'
import { MenuFooterStyled } from './index.styled'

interface MenuFooterPropArg {}

export const MenuFooter: React.FC<MenuFooterPropArg> = () => {
    return (
        <MenuFooterStyled>
            <Row>
                <Col md={4} className="footer-link">
                    <h3 className="text-16 base-brand-third w700 mb-8 widget-title">Games</h3>
                    <ul className="reset-ul">
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Jackpots
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                High Frequency
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Instants
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Classsic
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col md={4} className="footer-link">
                    <h3 className="text-16 base-brand-third w700 mb-8 widget-title">Information</h3>
                    <ul className="reset-ul">
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Term of use
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Privacy and Policy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Refferals program
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Payment methods
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col md={4} className="footer-link">
                    <h3 className="text-16 base-brand-third w700 mb-8 widget-title">Help and support</h3>
                    <ul className="reset-ul">
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Help center
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                News
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Supports
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/" className="base-brand-third nav-link">
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </Col>
            </Row>
        </MenuFooterStyled>
    )
}
