/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@lottery/uikit', '@lottery/utils', '@lottery/types'])

const isProd = process.env.APP_ENV === 'production'

const loadImageConfig = () => {
    const defaultConfig = {
        domains: ['https://athena-cdn.muziverse.tech'],
        loader: 'imgix'
    }
    if (isProd) return { ...defaultConfig, path: 'https://athena-cdn.muziverse.tech' }
    return undefined
}

const nextConfig = {
    swcMinify: true,
    reactStrictMode: false,
    compiler: {
        // ssr and displayName are configured by default
        styledComponents: {
            displayName: false,
            ssr: true,
            cssProp: false,
            fileName: false,
            minify: true,
            namespace: 'nixjs'
        }
    },
    assetPrefix: isProd ? 'https://athena-cdn.muziverse.tech' : undefined,
    images: loadImageConfig(),
    env: {
        APP_ENV: process.env.APP_ENV
    }
}

module.exports = withTM(nextConfig)
