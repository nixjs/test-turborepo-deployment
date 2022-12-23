import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Toaster } from 'react-hot-toast'
import { DefaultSeo } from 'next-seo'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { MetaMaskProvider, BinanceProvider, TronLinkProvider } from '@athena20/ts-wallet'
import { WalletConnectionProvider } from '@athena20/ts-wallet-react'
import { WebsocketProvider } from '@athena20/ts-grpc-socket-react'
import { useInitFacebook } from '@nixjs23n6/facebook-login'
import { PageLoading } from '@lottery/uikit'
import { useAccessTokens, useConfigSocket, useProviderLogin, useServiceConfig, useWalletConfig } from 'components/hooks'
import { Config } from 'configs/env'
import { NextSeoConfig } from 'configs/seo'
import { SiteLayout } from 'components/layouts/BaseLayout'
import { WrapApp } from 'components/layouts/WrapApp'
import { AuthModal } from 'modules/auth'
import { SocketPort } from 'consts/socket'
import { AuthProvider, AuthGuard } from 'context/auth'
import { MaskBalanceProvider } from 'context/maskBalance'
import { wrapper } from 'redux/store'
import { PageSessionExpired } from 'modules/PageSessionExpired'
import '@nixjs23n6/baseui-core/lib/css/index.min.css'
import 'components/styles/scss/index.scss'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
    requireAuth?: boolean
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const theme = {}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <SiteLayout>{page}</SiteLayout>)

    useInitFacebook({
        version: 'v11.0',
        appId: Config.AUTH_FACEBOOK_APP_ID
    })

    useServiceConfig()
    useAccessTokens()
    const { config } = useConfigSocket()
    useProviderLogin()
    useWalletConfig()

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles)
    })

    React.useEffect(() => {
        document.body.setAttribute('data-theme', 'dark')
    }, [])

    const wallets = React.useMemo(() => [MetaMaskProvider, BinanceProvider, TronLinkProvider], [])

    return (
        <StyledThemeProvider theme={theme}>
            <WebsocketProvider WSConfig={config as any} defaultActive={SocketPort.INTERNAL}>
                <DefaultSeo {...NextSeoConfig} />
                <AuthProvider
                    storage={{
                        accessKey: '@lottery:ACCESS_TOKEN',
                        refreshKey: '@lottery:REFRESH_TOKEN',
                        type: 'localStorage'
                    }}
                    redirectSessionExpiredPath="/session-expired"
                    redirectLoginPath="/"
                >
                    <GoogleOAuthProvider clientId={Config.AUTH_GOOGLE_CLIENT_ID}>
                        <WalletConnectionProvider wallets={wallets} logger={{ debug: true }}>
                            <MaskBalanceProvider storeKey="@lottery/mask">
                                <WrapApp>
                                    {Component.requireAuth ? (
                                        <AuthGuard SessionExpiredHTML={<PageSessionExpired />} LoadingHTML={<PageLoading />}>
                                            {getLayout(<Component {...pageProps} />)}
                                        </AuthGuard>
                                    ) : (
                                        // public page
                                        getLayout(<Component {...pageProps} />)
                                    )}
                                    <Toaster />
                                    <AuthModal />
                                    {/* <SessionExpiredModal /> */}
                                </WrapApp>
                            </MaskBalanceProvider>
                        </WalletConnectionProvider>
                    </GoogleOAuthProvider>
                </AuthProvider>
            </WebsocketProvider>
        </StyledThemeProvider>
    )
}

export default wrapper.withRedux(MyApp)
