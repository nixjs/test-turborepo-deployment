/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Interfaces } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'
import { LoginTypes } from 'types/auth/login'
import { AuthWalletState } from './types'

export const initialState = {
    loading: false,
    provider: BaseEnum.AuthenticationProvider.AP_NONE,
    walletNotInstalled: false,
    getNonceError: null,
    verifySignatureError: null,
    nonce: null,
    signatureVerificationToken: null
} as AuthWalletState

export const setWalletProvider = (state: Partial<AuthWalletState>, action: PayloadAction<BaseEnum.AuthenticationProvider>) => {
    const { payload } = action
    state.provider = payload
}

export const checkWalletNotInstalled = (state: Partial<AuthWalletState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.walletNotInstalled = payload
}

export const requestNonce = (
    _state: Partial<AuthWalletState>,
    _action: PayloadAction<
        {
            signMessage(message: string): Promise<Interfaces.ResponseData<string>>
        } & LoginTypes.LoginWalletRequest
    >
) => {}

export const verifySignature = (_state: Partial<AuthWalletState>, _action: PayloadAction<LoginTypes.VerifySignatureRequest>) => {}

export const setLoading = (state: Partial<AuthWalletState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.loading = payload
}

export const getNonce = (
    state: Partial<AuthWalletState>,
    action: PayloadAction<{
        nonce: string
        signatureVerificationToken: string
    }>
) => {
    const { payload } = action
    state.nonce = payload.nonce
    state.signatureVerificationToken = payload.signatureVerificationToken
}

export const getNonceFailed = (state: Partial<AuthWalletState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.getNonceError = payload
}

export const getVerifySignatureFailed = (state: Partial<AuthWalletState>, action: PayloadAction<any>) => {
    const { payload } = action
    state.verifySignatureError = payload
}

export const removeNonceAndVerifyToken = (state: Partial<AuthWalletState>, _action: PayloadAction<undefined>) => {
    state.nonce = null
    state.signatureVerificationToken = null
}
