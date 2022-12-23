import React from 'react'
import { Errors, Types, Interfaces } from '@athena20/ts-types'
import { Utils } from '@athena20/ts-grpc-socket'
import { MB, LocalStorage, SessionStorage, WebStorage } from '@lottery/utils'
import { AuthBaseRequest } from 'services/grpc/request/auth'
import { AuthReactTypes } from './types'
import { AuthContext } from './useAuth'
import { AuthConstant } from './const'
import { AuthContextErrors, AUTH_CONTEXT_ERROR_TYPE } from './error'

export function getStorage(type: AuthReactTypes.StorageType = 'localStorage'): WebStorage {
    if (type === 'session') return new SessionStorage()
    return new LocalStorage()
}

export interface AuthProviderProps {
    children: React.ReactNode
    storage: AuthReactTypes.StorageConfig
    redirectSessionExpiredPath?: string
    redirectLoginPath?: string
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
    storage = {
        accessKey: '@lottery:ACCESS_TOKEN',
        refreshKey: '@lottery:REFRESH_TOKEN',
        type: 'localStorage'
    },
    redirectSessionExpiredPath,
    redirectLoginPath
}) => {
    const [error, setError] = React.useState<Errors.ErrorResponse>()
    const [initializing, setInitializing] = React.useState(true)
    const [ourStorage, setOurStorage] = React.useState<WebStorage>()

    async function executeAuthProvider() {
        try {
            const t = getStorage(storage.type)
            setOurStorage(t)
            if (storage.accessKey.length === 0) throw AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID].format()
            const refreshToken = t.getItem<string>(storage.refreshKey)
            const accessToken = t.getItem<string>(storage.accessKey)

            if (!accessToken && !refreshToken) {
                throw AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET].format()
            }

            if (accessToken && !Utils.isTokenExpired(accessToken)) {
                // login successful
                setInitializing(false)
            } else {
                // login failed
                if (storage.accessKey.length === 0) throw AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID].format()
                if (!refreshToken) throw AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID].format()
                if (refreshToken && Utils.isTokenExpired(refreshToken)) {
                    throw AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.SESSION_EXPIRED].format()
                }
                // login failed, need to refresh token
                setInitializing(false)
                // refresh token now
            }
        } catch (e: any) {
            setInitializing(false)
            setError(e)
        }
    }

    React.useEffect(() => {
        executeAuthProvider()
        MB.messageBroker.subscribe(AuthConstant.SubscribeId.LoginStateKey, AuthConstant.MessageType, ({ msgData }) => {
            if (msgData === AuthConstant.MessageData.Login || msgData === AuthConstant.MessageData.Register) {
                setError(undefined)
                executeAuthProvider()
            }
            if (msgData === AuthConstant.MessageData.Logout) {
                setError(AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET].format())
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAccessToken = React.useCallback(() => {
        return ourStorage ? ourStorage.getItem<string>(storage.accessKey) : null
    }, [ourStorage, storage.accessKey])

    const getRefreshToken = React.useCallback(() => {
        return ourStorage ? ourStorage.getItem<string>(storage.refreshKey) : null
    }, [ourStorage, storage.refreshKey])

    const onRenewAccessToken = () => {
        return new Promise<Interfaces.ResponseData<Types.Nullable<string>>>((resolve) => {
            try {
                if (ourStorage) {
                    const token = ourStorage.getItem<string>(storage.refreshKey)
                    if (!token) throw AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID].format()

                    AuthBaseRequest.refreshTokenRequest(token)
                        .then((response: any) => {
                            if (response.status === 'SUCCESS' && response.data) {
                                const { accessToken, refreshToken } = response.data
                                ourStorage.setItem<string>(storage.accessKey, accessToken)
                                ourStorage.setItem<string>(storage.refreshKey, refreshToken)
                                MB.messageBroker.publish(AuthConstant.MessageType, AuthConstant.MessageData.NewToken)
                                resolve({
                                    data: accessToken,
                                    status: 'SUCCESS'
                                })
                            }
                        })
                        .catch(() => {
                            resolve({
                                status: 'ERROR'
                            })
                        })
                }
            } catch (_e) {
                return resolve({
                    status: 'ERROR'
                })
            }
        })
    }

    const value: AuthReactTypes.ContextState = {
        error,
        initializing,
        redirectSessionExpiredPath,
        redirectLoginPath,
        onGetAccessToken: getAccessToken,
        onGetRefreshToken: getRefreshToken,
        onRenewAccessToken: onRenewAccessToken
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
