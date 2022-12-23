import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { ProtectedLayout } from 'components/layouts/ProtectedLayout'

const WalletComponent = dynamic<Types.Object<any>>(() => import('modules/wallet').then((mod) => mod.Wallet), {
    loading: () => <PageLoading />,
    ssr: false
})

interface InHousePropArg {
    userAgent?: string
}

export const getServerSideProps = async (context: any) => {
    const { req } = context
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { props: { userAgent } }
}

const Wallet: ElementExtendTypes.PageLayout<InHousePropArg> = () => {
    return (
        <>
            <NextSeo title="Play the Lottery Online from Anywhere, Anytime | Lottery" description="." />
            <WalletComponent />
        </>
    )
}

Wallet.getLayout = ProtectedLayout
Wallet.requireAuth = true

export default Wallet
