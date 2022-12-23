import React from 'react'
import { InstantKenoRiskProfile } from 'modules/game/keno/types'
import { InitFormAutoPlayConfig } from 'modules/game/keno/consts/consts'
import { BetTypes } from './types'

export const initialState: BetTypes.State = {
    disabled: false,
    isPlaying: false,
    betResult: null,
    risk: InstantKenoRiskProfile.IKRP_LOW,
    numbers: [],
    luckyNumbers: [],
    FormAutoPlayConfig: InitFormAutoPlayConfig
}

export const BetContext = React.createContext<BetTypes.ContextState>({
    betState: initialState,
    dispatchBet: () => null
})

export function useBet(): BetTypes.ContextState {
    return React.useContext(BetContext)
}
