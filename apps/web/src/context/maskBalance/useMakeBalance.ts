import * as React from 'react'
import { MaskBalanceTypes } from './types'

export const MaskBalanceContext = React.createContext<MaskBalanceTypes.ContextState>({} as MaskBalanceTypes.ContextState)

export function useMaskBalance(): MaskBalanceTypes.ContextState {
    if (!MaskBalanceContext) throw new Error('useMaskBalance must be used within MaskBalanceProvider')
    return React.useContext(MaskBalanceContext)
}
