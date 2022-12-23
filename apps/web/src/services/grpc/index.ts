import { Client, MetadataInterface } from '@athena20/ts-grpc'
import { Utils } from '@athena20/ts-grpc-socket'
import { Interfaces } from '@athena20/ts-types'
import { Objectify } from '@athena20/ts-objectify'
import { StorageServices } from 'services/localstorage'
import { AuthErrors, ERROR_TYPE } from 'errors/auth'
import { AuthBaseRequest } from 'services/grpc/request/auth'

export const setAuthorization = (t: string) => ({ authorization: t })
export interface Request {
    methodName: string
    params: Record<string, any>
    metadata?: MetadataInterface
}

export function withAuth<T = any>(instance: Client, request: Request, isRefresh?: boolean, acToken?: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<Interfaces.ResponseData<T>>(async (resolve, _rejected) => {
        let token: string | undefined | null = acToken
        try {
            if (!token || typeof token === 'undefined') {
                token = StorageServices.getAccessToken()
            }
            if (!token || Utils.isTokenExpired(token)) {
                if (!isRefresh || typeof isRefresh === 'undefined') {
                    throw AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED].format()
                }
                const { status, data }: Interfaces.ResponseData<string> = await onRenewAccessToken()
                if (status === 'SUCCESS') {
                    token = data
                }
            }
            if (!token) throw AuthErrors[ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND].format()
            const { methodName, params, metadata } = request

            let ourMetadata: MetadataInterface = setAuthorization(token)
            if (metadata) ourMetadata = Objectify.merge(ourMetadata, metadata)
            return resolve(instance.send(methodName, params, ourMetadata))
        } catch (error) {
            return resolve({
                error: AuthErrors[ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND].format(),
                status: 'ERROR'
            })
        }
    })
}

export function onRenewAccessToken(rfToken?: string) {
    return new Promise<Interfaces.ResponseData<string>>((resolve) => {
        try {
            let token: string | undefined | null = rfToken
            if (!token || typeof token === 'undefined') {
                token = StorageServices.getRefreshToken()
            }
            if (!token) throw AuthErrors[ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND].format()
            if (Utils.isTokenExpired(token)) throw AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED].format()

            AuthBaseRequest.refreshTokenRequest(token)
                .then((response) => {
                    if (response.status === 'SUCCESS' && response.data) {
                        const { accessToken, refreshToken } = response.data as { accessToken: string; refreshToken: string }
                        StorageServices.storeAccessToken(accessToken)
                        StorageServices.storeRefreshToken(refreshToken)
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
        } catch (_e) {
            return resolve({
                status: 'ERROR'
            })
        }
    })
}

export * from './user'
export * from './payment'
