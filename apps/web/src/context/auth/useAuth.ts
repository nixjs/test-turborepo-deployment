import * as React from 'react'
import { AuthReactTypes } from './types'

export const AuthContext = React.createContext<AuthReactTypes.ContextState>({} as AuthReactTypes.ContextState)

export function useAuth(): AuthReactTypes.ContextState {
    if (!AuthContext) throw new Error('useAuth must be used within AuthProvider')
    return React.useContext(AuthContext)
}
