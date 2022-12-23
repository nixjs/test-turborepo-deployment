import { NextSeoProps } from 'next-seo'

export const NextSeoConfig: NextSeoProps = {
    defaultTitle: 'Play the Lottery Online from Anywhere, Anytime | Lottery',
    additionalMetaTags: [
        {
            name: 'language',
            content: 'EN'
        },
        {
            name: 'viewport',
            content: 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        {
            httpEquiv: 'x-ua-compatible',
            content: 'ie=edge'
        },
        {
            name: 'format-detection',
            content: 'telephone=no'
        },
        {
            name: 'keywords',
            content:
                'play to earn, web3, nft, oasis, gamefi, defi, meta, sci-fi, metaverse, avatar, second life, virtual events, muziverse, muzi, muziverse virtual world, muziverse platform, music metaverse, what is muziverse, metaverse game, multiverse, metaverse platform, second world, metaverse concert, metaverse crypto, metaverse fashion show'
        },
        {
            name: 'robots',
            content: 'index, follow'
        },
        {
            name: 'copyright',
            content: '© 2022 NextApp - All right reserved'
        }
    ],
    additionalLinkTags: [
        {
            rel: 'shortcut icon',
            href: '/favicon/favicon.ico',
            type: 'image/x-icon'
        },
        { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicon/favicon-144x144.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', href: '/favicon/apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }
    ],
    twitter: {},
    facebook: {
        appId: ''
    }
}
