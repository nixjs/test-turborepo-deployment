import React from 'react'
import { useDispatch } from 'react-redux'
import { MB } from '@lottery/utils'
import { AuthConstant } from 'context/auth'
import { StorageServices } from 'services/localstorage'
import * as authAccountSlice from 'redux/auth/account/slice'
import * as paymentSlice from 'redux/payment/slice'
import * as depositSlice from 'redux/payment/deposit/slice'

export const useLoginListener = () => {
    const dispatch = useDispatch()
    const onAuth = React.useCallback(() => {
        dispatch(authAccountSlice.onFetchUser())
        dispatch(paymentSlice.onFetchCurrencyConfig())
        dispatch(depositSlice.onFetchDepositAddresses())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onNoAuth = React.useCallback(() => {
        dispatch(paymentSlice.onGetCurrencyConfig([]))
        dispatch(depositSlice.onGetDepositAddresses([]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const accessToken = StorageServices.getAccessToken()
        if (accessToken) {
            onAuth()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        const subId = MB.messageBroker.subscribe(AuthConstant.SubscribeId.UseLoginListener, AuthConstant.MessageType, ({ msgData }) => {
            if (
                msgData === AuthConstant.MessageData.Login ||
                msgData === AuthConstant.MessageData.Register ||
                msgData === AuthConstant.MessageData.NewToken
            ) {
                onAuth()
            }
            if (msgData === AuthConstant.MessageData.Logout) {
                onNoAuth()
            }
        })
        return () => {
            subId && MB.messageBroker.unsubscribe(subId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
