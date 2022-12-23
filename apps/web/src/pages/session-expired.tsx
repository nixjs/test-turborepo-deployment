import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { BaseLayout } from 'components/layouts/BaseLayout'

const PageSessionExpiredComponent = dynamic<Types.Object<any>>(
    () => import('modules/PageSessionExpired').then((mod) => mod.PageSessionExpired),
    {
        loading: () => <PageLoading />,
        ssr: false
    }
)

interface InHousePropArg {}

const Wallet: ElementExtendTypes.PageLayout<InHousePropArg> = () => {
    return (
        <>
            <NextSeo title="Play the Lottery Online from Anywhere, Anytime | Lottery" description="." />
            <PageSessionExpiredComponent />
        </>
    )
}

Wallet.getLayout = BaseLayout
Wallet.requireAuth = false

export default Wallet
