import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { Container, Row, Col } from '@nixjs23n6/baseui-grid'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { BaseLayout } from 'components/layouts/BaseLayout'

const HiLoComponent = dynamic<Types.Object<any>>(() => import('modules/inhouse/HiLo').then((mod) => mod.GameBoard), {
    loading: () => <PageLoading />,
    ssr: false
})

interface InHousePropArg {
    userAgent?: string
}

const HiLo: ElementExtendTypes.PageLayout<InHousePropArg> = () => {
    return (
        <>
            <NextSeo title="HiLO" description="." />
            <div style={{ background: 'wheat' }}>
                <Container>
                    <Row>
                        <Col lg={9}>
                            <HiLoComponent />
                        </Col>
                        <Col lg={3}>Widget</Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

HiLo.getLayout = BaseLayout
HiLo.requireAuth = true

export default HiLo
