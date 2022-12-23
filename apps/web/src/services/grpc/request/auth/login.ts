import {
    LoginRequest,
    LoginInternalRequest,
    LoginSocialRequest,
    LoginWalletRequest,
    LoginGoogleRequest,
    LoginFacebookRequest,
    LoginTelegramRequest,
    LoginAppleRequest
} from '@athena20/game-portal/user/rpc/login_pb'
import { userInstance } from 'services/grpc'
import { LoginTypes } from 'types/auth/login'
import { RequestMethods } from './methods'

export namespace AuthLoginRequest {
    export const loginRequest = (params: LoginTypes.LoginRequest) => {
        const request = new LoginRequest()

        if (params.internalRequest) {
            const r1 = new LoginInternalRequest()
            const {
                internalRequest: { email, mfaCode, password }
            } = params
            r1.setEmail(email).setMfaCode(mfaCode).setPassword(password)
            request.setInternalRequest(r1)
        }
        if (params.socialRequest) {
            const r2 = new LoginSocialRequest()
            const {
                socialRequest: { provider }
            } = params
            if (params.socialRequest.google) {
                const {
                    socialRequest: {
                        google: { mfaCode, token }
                    }
                } = params
                const g = new LoginGoogleRequest()
                g.setMfaCode(mfaCode).setToken(token)
                r2.setGoogle(g).setProvider(provider)
            }
            if (params.socialRequest.facebook) {
                const {
                    socialRequest: {
                        facebook: { mfaCode, token }
                    }
                } = params
                const f = new LoginFacebookRequest()
                f.setMfaCode(mfaCode).setToken(token)
                r2.setFacebook(f).setProvider(provider)
            }
            if (params.socialRequest.apple) {
                const {
                    socialRequest: {
                        apple: { mfaCode, token }
                    }
                } = params
                const a = new LoginAppleRequest()
                a.setMfaCode(mfaCode).setToken(token)
                r2.setApple(a).setProvider(provider)
            }
            if (params.socialRequest.telegram) {
                const {
                    socialRequest: {
                        telegram: { authDate, firstName, hash, id, lastName, username, photoUrl }
                    }
                } = params
                const t = new LoginTelegramRequest()
                t.setAuthDate(authDate)
                    .setFirstName(firstName)
                    .setLastName(lastName)
                    .setHash(hash)
                    .setId(id)
                    .setUsername(username)
                    .setPhotoUrl(photoUrl)
                r2.setTelegram(t).setProvider(provider)
            }
            request.setSocialRequest(r2)
        }
        if (params.walletRequest) {
            const r3 = new LoginWalletRequest()
            const {
                walletRequest: { networkSymbol, provider, walletAddress }
            } = params
            r3.setNetworkSymbol(networkSymbol).setWalletAddress(walletAddress).setProvider(provider)
            request.setWalletRequest(r3)
        }

        return userInstance.send(RequestMethods.LOGIN, request)
    }
}
