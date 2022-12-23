import { take, fork, all, call, put, select } from 'redux-saga/effects'
import * as pbjs from 'google-protobuf/google/protobuf/empty_pb'
import { Interfaces } from '@athena20/ts-types'
import { UserTypes, BaseEnum } from '@lottery/types'
import { AuthTypes } from 'types/auth/base'
import { withAuth, userInstance } from 'services/grpc'
import { RequestMethods, AuthAccountRequest } from 'services/grpc/request/auth'
import * as authSelector from 'redux/auth/selectors'
import * as accountSlice from './slice'

function* accountSaga() {
    while (true) {
        try {
            yield take(accountSlice.onFetchUser)
            const provider: BaseEnum.AuthenticationProvider = yield select(authSelector.getProviderSelector())
            const { data, status }: Interfaces.ResponseData<{ info: UserTypes.UserInfo }> = yield call(withAuth, userInstance, {
                methodName: RequestMethods.GET_USER_INFO,
                params: new pbjs.Empty()
            })
            if (status === 'SUCCESS' && data && data.info) {
                const {
                    info: { internal, socialsList, walletsList }
                } = data
                if (BaseEnum.AuthenticationProvider.AP_INTERNAL === provider && internal) {
                    yield put(accountSlice.onGetUser(internal))
                }
                if (
                    (BaseEnum.AuthenticationProvider.AP_BINANCE_CHAIN_WALLET === provider ||
                        BaseEnum.AuthenticationProvider.AP_METAMASK === provider ||
                        BaseEnum.AuthenticationProvider.AP_TRONLINK === provider) &&
                    walletsList
                ) {
                    yield put(accountSlice.onGetUser(walletsList[0]))
                }
                if (
                    (BaseEnum.AuthenticationProvider.AP_APPLE === provider ||
                        BaseEnum.AuthenticationProvider.AP_FACEBOOK === provider ||
                        BaseEnum.AuthenticationProvider.AP_GOOGLE === provider) &&
                    socialsList
                ) {
                    yield put(accountSlice.onGetUser(socialsList[0]))
                }
                yield all([
                    put(accountSlice.onSetInternalInfo(internal || null)),
                    put(accountSlice.onSetSocialInfo(socialsList)),
                    put(accountSlice.onSetWalletInfo(walletsList))
                ])
            }
            // eslint-disable-next-line no-empty
        } catch (_error) {}
    }
}

function* serviceConfigSaga() {
    while (true) {
        try {
            yield take(accountSlice.onFetchServiceConfig)
            const { data, status, error }: Interfaces.ResponseData<AuthTypes.UserServiceConfig> = yield call(
                AuthAccountRequest.getServiceConfigRequest
            )

            if (status === 'SUCCESS' && data) {
                yield put(accountSlice.onGetServiceConfig(data))
            }
            if (status === 'ERROR') {
                yield put(accountSlice.onGetServiceConfigFailure(error))
            }
            // eslint-disable-next-line no-empty
        } catch (_error) {
            console.log(_error)
        }
    }
}

export function* root() {
    yield all([fork(accountSaga), fork(serviceConfigSaga)])
}
