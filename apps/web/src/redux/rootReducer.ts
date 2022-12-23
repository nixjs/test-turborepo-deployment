import { combineReducers } from '@reduxjs/toolkit'
import * as gameRedux from 'redux/game'
import commonSlice, { KEY_REDUCER_SAGA } from './common/slice'
import authSlice, { KEY_REDUCER_SAGA as AUTH_KEY } from './auth/slice'
import { KEY_REDUCER_SAGA as AUTH_SOCIAL_KEY, authSocialReducer } from './auth/login/social/slice'
import { KEY_REDUCER_SAGA as AUTH_REGISTER_KEY, authRegisterReducer } from './auth/register/slice'
import { KEY_REDUCER_SAGA as AUTH_FORGOT_KEY, authForgotReducer } from './auth/forgot/slice'
import { KEY_REDUCER_SAGA as AUTH_INTERNAL_LOGIN_KEY, authInternalLoginReducer } from './auth/login/internalLogin/slice'
import { KEY_REDUCER_SAGA as AUTH_WALLET_KEY, authWalletReducer } from './auth/login/wallet/slice'
import { KEY_REDUCER_SAGA as AUTH_ACCOUNT_KEY, authUserReducer } from './auth/account/slice'
import { KEY_REDUCER_SAGA as PAYMENT_KEY, paymentReducer } from './payment/slice'
import walletSlice, { KEY_REDUCER_SAGA as WALLET_KEY } from './wallet/slice'
import { KEY_REDUCER_SAGA as PAYMENT_DEPOSIT_KEY, paymentDepositReducer } from './payment/deposit/slice'
import { KEY_REDUCER_SAGA as PAYMENT_DEPOSIT_EXTERNAL_KEY, paymentDepositExternalReducer } from './payment/deposit/external/slice'
import { KEY_REDUCER_SAGA as COINGECKO_KEY, coingeckoReducer } from './coingecko/slice'

let rootReducer

export default function createReducer(injectedReducers = {}) {
    rootReducer = combineReducers({
        //Default predefined reducer go here. See example below. This also serves to suppress the no reducer error message.
        preDefinedReducer: (state = null) => state,
        //Actual reducers are all added via injection.
        ...injectedReducers,
        [gameRedux.KEY_REDUCER_SAGA]: gameRedux.gamingReducer,
        [KEY_REDUCER_SAGA]: commonSlice,

        [AUTH_KEY]: authSlice,
        [AUTH_SOCIAL_KEY]: authSocialReducer,
        [AUTH_REGISTER_KEY]: authRegisterReducer,
        [AUTH_FORGOT_KEY]: authForgotReducer,
        [AUTH_INTERNAL_LOGIN_KEY]: authInternalLoginReducer,
        [AUTH_WALLET_KEY]: authWalletReducer,
        [AUTH_ACCOUNT_KEY]: authUserReducer,

        [WALLET_KEY]: walletSlice,

        [PAYMENT_KEY]: paymentReducer,
        [PAYMENT_DEPOSIT_KEY]: paymentDepositReducer,
        [PAYMENT_DEPOSIT_EXTERNAL_KEY]: paymentDepositExternalReducer,
        [COINGECKO_KEY]: coingeckoReducer
    })

    return rootReducer
}
