import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { Container, Row, Col } from '@nixjs23n6/baseui-grid'
import { BaseLayout } from 'components/layouts/BaseLayout'

const LimboComponent = dynamic<Types.Object<any>>(() => import('modules/inhouse/Limbo').then((mod) => mod.GameBoard), {
    loading: () => <PageLoading />,
    ssr: false
})

interface InHousePropArg {
    userAgent?: string
}

const Wallet: ElementExtendTypes.PageLayout<InHousePropArg> = () => {
    return (
        <>
            <NextSeo title="Limbo| Lottery" description="." />
            <div style={{ background: 'wheat' }}>
                <Container>
                    <Row>
                        <Col lg={9}>
                            <LimboComponent />
                        </Col>
                        <Col lg={3}>Widget</Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

Wallet.getLayout = BaseLayout
Wallet.requireAuth = true

export default Wallet
