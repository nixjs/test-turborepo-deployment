import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { AppType } from 'next/dist/shared/lib/utils'

interface DocumentProps extends DocumentInitialProps {
    styles: any
}

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@300;400;500;600;700&display=swap"
                        rel="stylesheet"
                    />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx: DocumentContext): Promise<DocumentProps> => {
    const originalRenderPage = ctx.renderPage
    const sheet = new ServerStyleSheet()

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: AppType) => (props) => sheet.collectStyles(<App {...props} />)
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        // styles: (
        //     <>
        //         {initialProps.styles}
        //         {sheet.getStyleElement()}
        //     </>
        // ),
        styles: [...React.Children.toArray(initialProps.styles), sheet.getStyleElement()]
    }
}

export default MyDocument
