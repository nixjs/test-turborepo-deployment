import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Interfaces, Types } from '@athena20/ts-types'
import { Utils } from '@athena20/ts-grpc-socket'
import { useAuth } from './useAuth'
import { AUTH_CONTEXT_ERROR_TYPE } from './error'

export function AuthGuard({
    children,
    LoadingHTML
}: {
    children?: JSX.Element | React.ReactNode
    LoadingHTML?: JSX.Element | React.ReactNode
    SessionExpiredHTML?: JSX.Element | React.ReactNode
}) {
    const { error, initializing, redirectSessionExpiredPath, redirectLoginPath, onRenewAccessToken, onGetAccessToken, onGetRefreshToken } =
        useAuth()
    const router = useRouter()

    const [isNewToken, setNewToken] = React.useState<boolean>()

    useEffect(() => {
        async function executeAuthGuard() {
            if (!initializing) {
                if (error) {
                    // auth is initialized and there is no user
                    // remember the page that user tried to access
                    const { code } = error
                    if (code === Number(AUTH_CONTEXT_ERROR_TYPE.SESSION_EXPIRED)) {
                        if (typeof redirectSessionExpiredPath !== 'undefined') router.push(redirectSessionExpiredPath)
                        return
                    }

                    if (code === Number(AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET)) {
                        // login not yet
                        if (typeof redirectLoginPath !== 'undefined') router.push(redirectLoginPath)
                        return
                    }

                    throw Error(JSON.stringify(error))
                } else {
                    const a = onGetAccessToken()
                    const r = onGetRefreshToken()
                    if (!a && !r) {
                        // login not yet
                        if (typeof redirectLoginPath !== 'undefined') router.push(redirectLoginPath)
                        return
                    }
                    if (a && Utils.isTokenExpired(a) && r && !Utils.isTokenExpired(r)) {
                        const { data, status }: Interfaces.ResponseData<Types.Nullable<string>> = await onRenewAccessToken()
                        if (status === 'ERROR' && !data) {
                            setNewToken(false)
                            if (typeof redirectLoginPath !== 'undefined') router.push(redirectLoginPath)
                            return
                        } else {
                            setNewToken(true)
                        }
                    }
                }
            }
        }

        executeAuthGuard()
    }, [
        initializing,
        router,
        error,
        onRenewAccessToken,
        redirectSessionExpiredPath,
        redirectLoginPath,
        onGetAccessToken,
        onGetRefreshToken
    ])

    /* show loading indicator while the auth provider is still initializing */
    if (initializing) {
        if (LoadingHTML && React.isValidElement(LoadingHTML)) {
            return LoadingHTML
        }
        return <h1>Application Loading...</h1>
    }

    // if auth initialized with a valid user show protected page
    const a = onGetAccessToken()

    if ((!initializing && !error && a && !Utils.isTokenExpired(a)) || isNewToken) {
        return <>{children}</>
    }

    return <>Failed to load page</>
}
