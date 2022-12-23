import React from 'react'
import { useDispatch } from 'react-redux'
import * as authAccountSlice from 'redux/auth/account/slice'

export const useServiceConfig = () => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(authAccountSlice.onFetchServiceConfig())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
