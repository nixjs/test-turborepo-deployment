import React from 'react'
import { useDispatch } from 'react-redux'
import * as paymentSlice from 'redux/payment/slice'

export const useWalletConfig = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(paymentSlice.onFetchWalletConfig())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
