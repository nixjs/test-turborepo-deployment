import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { onSetProvider } from 'redux/auth/slice'
import { StorageServices } from 'services/localstorage'

export const useProviderLogin = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const provider = StorageServices.getProviderLogin()
        if (provider) {
            dispatch(onSetProvider(Number(provider)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
