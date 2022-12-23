import { put, take, fork, all, call, select } from 'redux-saga/effects'
import toast from 'react-hot-toast'
import { Interfaces } from '@athena20/ts-types'
import { WalletVerifyRequest } from '@athena20/game-portal/user/rpc/wallet_verify_pb'
import { BaseEnum } from '@lottery/types'
import { MB } from '@lottery/utils'
import { LoginTypes } from 'types/auth/login'
import { AuthConstant } from 'context/auth'
import { AuthErrors, ERROR_TYPE } from 'errors/auth'
import { withAuth, userInstance } from 'services/grpc'
import { AuthLoginRequest, RequestMethods } from 'services/grpc/request/auth'
import * as authFunctionSaga from 'redux/auth/sagaFunction'
import * as authSlice from 'redux/auth/slice'
import * as commonSaga from 'redux/common/saga'
import * as walletSlice from './slice'
import * as walletSelectors from './selectors'

function* nonceSaga() {
    while (true) {
        try {
            const {
                payload: { signMessage, networkSymbol, provider, walletAddress }
            }: {
                payload: LoginTypes.LoginWalletRequest & {
                    signMessage(message: string): Promise<Interfaces.ResponseData<string>>
                }
            } = yield take(walletSlice.onRequestNonce)

            const { data, status, error }: Interfaces.ResponseData<LoginTypes.LoginResponse> = yield call(AuthLoginRequest.loginRequest, {
                walletRequest: {
                    networkSymbol,
                    provider,
                    walletAddress
                },
                appType: BaseEnum.AppType.AT_NONE
            })

            if (status === 'SUCCESS') {
                yield put(
                    walletSlice.onGetNonce({
                        nonce: data?.challenge?.nonce || '',
                        signatureVerificationToken: data?.signatureVerificationToken || ''
                    })
                )
                if (data) {
                    yield signMessageSaga(data, signMessage)
                } else {
                    yield put(walletSlice.onGetNonceFailed('Cannot get nonce to sign the wallet'))
                    toast.error('Cannot get nonce to sign the wallet')
                    yield commonSaga.dismissToastSaga()
                }
            } else {
                yield put(walletSlice.onGetNonceFailed(error))
            }
        } catch (error) {
            console.log(error)
            toast.error('Cannot get nonce to sign the wallet')
            yield put(walletSlice.onGetNonceFailed(error))
        }
    }
}

function* signMessageSaga(data: LoginTypes.LoginResponse, signMessage: (message: string) => Promise<Interfaces.ResponseData<string>>) {
    const { challenge, signatureVerificationToken } = data
    if (challenge?.nonce && signatureVerificationToken) {
        toast('Your signature is being requested')
        const result: Interfaces.ResponseData<string> = yield call(signMessage, challenge.nonce)
        if (result.status === 'ERROR' || !result.data) {
            toast.error('Signature verification failed')
            yield commonSaga.dismissToastSaga()
        } else {
            yield put(walletSlice.onVerifySignature({ signature: result.data, signatureVerificationToken }))
        }
    }
}

function* verifySignatureSaga() {
    while (true) {
        try {
            const {
                payload
            }: {
                payload: LoginTypes.VerifySignatureRequest
            } = yield take(walletSlice.onVerifySignature)
            const provider: BaseEnum.AuthenticationProvider = yield select(walletSelectors.getWalletProviderSelector())

            const request = new WalletVerifyRequest()
            request.setSignature(payload.signature)
            const { data, status, error }: Interfaces.ResponseData<LoginTypes.LoginResponse> = yield call(
                withAuth,
                userInstance,
                {
                    methodName: RequestMethods.WALLET_VERIFY,
                    params: request
                },
                false,
                payload.signatureVerificationToken
            )

            if (status === 'SUCCESS' && data?.accessToken) {
                yield authFunctionSaga.storageTokenAndProvider(provider, data.accessToken, data.refreshToken)
                yield all([put(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.DEACTIVATE)), put(authSlice.onSetLoggedIn(true))])
                yield authFunctionSaga.initWebInternalSaga()
                MB.messageBroker.publish(AuthConstant.MessageType, AuthConstant.MessageData.Login)
            } else {
                if (error) {
                    toast.error(AuthErrors[ERROR_TYPE.CREDENTIAL_INVALID].format().message)
                }
                yield put(walletSlice.onGetVerifySignatureFailed(error))
            }
            yield put(walletSlice.onSetLoading(false))
            yield put(walletSlice.onRemoveNonceAndVerifyToken())
            yield commonSaga.dismissToastSaga()
        } catch (error) {
            console.log(error)
        }
    }
}

export function* root() {
    yield all([fork(nonceSaga), fork(verifySignatureSaga)])
}
