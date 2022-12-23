import React from 'react'
import dynamic from 'next/dynamic'
import { Types } from '@athena20/ts-types'

const HeaderComponent = dynamic<Types.Object<any>>(() => import('components/layouts/Header').then((mod) => mod.Header), {
    loading: () => <></>,
    ssr: true
})

const FooterComponent = dynamic<Types.Object<any>>(() => import('components/layouts/Footer').then((mod) => mod.Footer), {
    loading: () => <></>,
    ssr: true
})

interface BaseLayoutPropArg {
    children: React.ReactNode
}

export const SiteLayout = ({ children }: BaseLayoutPropArg): JSX.Element => <>{children}</>

export const BaseLayout = (page: React.ReactElement): JSX.Element => {
    return (
        <SiteLayout>
            <main>
                <HeaderComponent />
                {page}
                <FooterComponent />
            </main>
        </SiteLayout>
    )
}
