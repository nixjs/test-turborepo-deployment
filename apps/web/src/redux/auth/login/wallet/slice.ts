import { createSlice } from '@reduxjs/toolkit'
import {
    initialState,
    setWalletProvider,
    checkWalletNotInstalled,
    requestNonce,
    getNonce,
    getNonceFailed,
    verifySignature,
    getVerifySignatureFailed,
    setLoading,
    removeNonceAndVerifyToken
} from './reducers'

export const KEY_REDUCER_SAGA = '@auth/wallet'

const authWalletSlice = createSlice({
    name: KEY_REDUCER_SAGA,
    initialState,
    reducers: {
        onSetLoading: setLoading,
        onSetWalletProvider: setWalletProvider,
        onCheckWalletNotInstalled: checkWalletNotInstalled,
        onRequestNonce: requestNonce,
        onGetNonce: getNonce,
        onGetNonceFailed: getNonceFailed,
        onVerifySignature: verifySignature,
        onGetVerifySignatureFailed: getVerifySignatureFailed,
        onRemoveNonceAndVerifyToken: removeNonceAndVerifyToken
    }
})

export const {
    onSetLoading,
    onCheckWalletNotInstalled,
    onSetWalletProvider,
    onRequestNonce,
    onGetNonce,
    onGetNonceFailed,
    onVerifySignature,
    onGetVerifySignatureFailed,
    onRemoveNonceAndVerifyToken
} = authWalletSlice.actions

export const authWalletReducer = authWalletSlice.reducer
