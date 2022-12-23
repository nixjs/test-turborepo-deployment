import React from 'react'
import { LocalStorageStatic } from '@lottery/utils'
import { MaskBalanceTypes } from './types'
import { MaskBalanceContext } from './useMakeBalance'
export interface MaskBalanceProviderProps {
    children: React.ReactNode
    isMaskDefault?: boolean
    storeKey?: string
}

export const MaskBalanceProvider: React.FC<MaskBalanceProviderProps> = ({ children, isMaskDefault = false, storeKey = '@maskBalance' }) => {
    const [isMask, onSetMask] = React.useState<boolean>(isMaskDefault || false)

    React.useEffect(() => {
        const m = LocalStorageStatic.getItem<boolean>(storeKey)
        if (m === null) {
            LocalStorageStatic.setItem<boolean>(storeKey, isMaskDefault)
        } else {
            onSetMask(m)
        }
    }, [isMaskDefault, storeKey])

    const onSetMaskBalance = React.useCallback(() => {
        const ourMask = !isMask
        onSetMask(ourMask)
        LocalStorageStatic.setItem<boolean>(storeKey, ourMask)
    }, [isMask, storeKey])

    const value: MaskBalanceTypes.ContextState = {
        isMask,
        onSetMaskBalance
    }

    return <MaskBalanceContext.Provider value={value}>{children}</MaskBalanceContext.Provider>
}
