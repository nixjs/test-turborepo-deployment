import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { Container, Row, Col } from '@nixjs23n6/baseui-grid'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { BaseLayout } from 'components/layouts/BaseLayout'

const InstantKenoComponent = dynamic<Types.Object<any>>(() => import('modules/inhouse/InstantKeno').then((mod) => mod.GameBoard), {
    loading: () => <PageLoading />,
    ssr: false
})

interface InHousePropArg {
    userAgent?: string
}

const InstantKeno: ElementExtendTypes.PageLayout<InHousePropArg> = () => {
    return (
        <>
            <NextSeo title="Instant Keno" description="." />
            <div style={{ background: 'wheat' }}>
                <Container>
                    <Row>
                        <Col lg={9}>
                            <InstantKenoComponent />
                        </Col>
                        <Col lg={3}>Widget</Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

InstantKeno.getLayout = BaseLayout
InstantKeno.requireAuth = true

export default InstantKeno
