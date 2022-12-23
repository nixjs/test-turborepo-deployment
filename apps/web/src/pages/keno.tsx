import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { BaseLayout } from 'components/layouts/BaseLayout'

const KenoComponent = dynamic<Types.Object<any>>(() => import('modules/lottery/keno').then((mod) => mod.Keno), {
    loading: () => <PageLoading />,
    ssr: false
})

interface InHousePropArg {
    userAgent?: string
}

const Wallet: ElementExtendTypes.PageLayout<InHousePropArg> = () => {
    return (
        <>
            <NextSeo title="Keno| Lottery" description="." />
            <KenoComponent />
        </>
    )
}

Wallet.getLayout = BaseLayout
Wallet.requireAuth = true

export default Wallet
