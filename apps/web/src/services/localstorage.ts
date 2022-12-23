import { LocalStorageStatic as LocalStorage } from '@lottery/utils'
import { BaseEnum } from '@lottery/types'
import { STORAGE_KEY } from 'consts/storage'

export class StorageServices {
    static storeProviderLogin(provider: BaseEnum.AuthenticationProvider) {
        LocalStorage.setItem(STORAGE_KEY.PROVIDER, String(provider))
    }

    static getProviderLogin() {
        return LocalStorage.getItem<string>(STORAGE_KEY.PROVIDER)
    }

    static storeAccessToken(accessToken: string) {
        LocalStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken)
    }

    static getAccessToken() {
        return LocalStorage.getItem<string>(STORAGE_KEY.ACCESS_TOKEN)
    }

    static storeRefreshToken(refreshToken: string) {
        LocalStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken)
    }

    static getRefreshToken() {
        return LocalStorage.getItem<string>(STORAGE_KEY.REFRESH_TOKEN)
    }

    static storeMaskBalance(isMask: BaseEnum.ActivateState) {
        LocalStorage.setItem(STORAGE_KEY.MASK_BALANCE, String(isMask))
    }

    static getMaskBalance() {
        return LocalStorage.getItem<string>(STORAGE_KEY.MASK_BALANCE)
    }
}
