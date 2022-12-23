import React from 'react'
import { BetTypes } from './types'

export const initialState: BetTypes.State = {
    disabled: false,
    isPlaying: false,
    skip: 0,
    coefficient: '',
    betResult: null,
    card: null,
    offeredOptionsList: [],
    turnsList: [],
    allowCashOut: false,
    turnId: null
}

export const BetContext = React.createContext<BetTypes.ContextState>({
    betState: initialState,
    dispatchBet: () => null
})

export function useBet(): BetTypes.ContextState {
    return React.useContext(BetContext)
}
