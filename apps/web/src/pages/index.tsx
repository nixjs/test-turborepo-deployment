import React from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { Types } from '@athena20/ts-types'
import { PageLoading } from '@lottery/uikit'
import { ElementExtendTypes } from 'types/element'
import { BaseLayout } from 'components/layouts/BaseLayout'

const HomePage = dynamic<Types.Object<any>>(() => import('modules/home').then((mod) => mod.HomePage), {
    loading: () => <PageLoading />,
    ssr: false
})

interface HomePropArg {
    userAgent?: string
    isDesktop: boolean
}

const Home: ElementExtendTypes.PageLayout<HomePropArg> = () => {
    return (
        <>
            <NextSeo title="Play the Lottery Online from Anywhere, Anytime | Lottery" description="." />
            <HomePage />
        </>
    )
}

Home.getLayout = BaseLayout

export default Home
