import React from 'react'
import { InitFormAutoPlayConfig } from 'modules/game/limbo/consts/consts'
import { BetTypes } from './types'

export const initialState: BetTypes.State = {
    disabled: false,
    isPlaying: false,
    betResult: null,
    FormAutoPlayConfig: InitFormAutoPlayConfig
}

export const BetContext = React.createContext<BetTypes.ContextState>({
    betState: initialState,
    dispatchBet: () => null
})

export function useBet(): BetTypes.ContextState {
    return React.useContext(BetContext)
}
