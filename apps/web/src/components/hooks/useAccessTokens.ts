import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Utils } from '@athena20/ts-grpc-socket'
import { onSetLoggedIn } from 'redux/auth/slice'
import { StorageServices } from 'services/localstorage'

export const useAccessTokens = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        function storageAccessToken() {
            const accessToken = StorageServices.getAccessToken()
            const refreshToken = StorageServices.getRefreshToken()
            if ((accessToken && !Utils.isTokenExpired(accessToken)) || (refreshToken && !Utils.isTokenExpired(refreshToken))) {
                dispatch(onSetLoggedIn(true))
            }
        }
        storageAccessToken()
        // composedListener.add(AuthConstant.ListenerKey.UseAccessTokenKey, (data: string): void => {
        //     if (data === AuthConstant.ListenerType.NewToken) {
        //         storageAccessToken()
        //     }
        // })
        return () => {
            dispatch(onSetLoggedIn(false))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
