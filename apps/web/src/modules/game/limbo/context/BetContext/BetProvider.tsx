import React from 'react'
import { useImmerReducer } from 'use-immer'
import { BetTypes } from './types'
import { initialState, BetContext } from './useBet'

const betReducer = (draft: BetTypes.State, action: BetTypes.Actions) => {
    switch (action.type) {
        case BetTypes.Type.SET_PLAY:
            draft.isPlaying = action.payload
            break
        case BetTypes.Type.SET_DISABLED:
            draft.disabled = action.payload
            break
        case BetTypes.Type.SET_PLACE_BET_RESULT:
            draft.betResult = action.payload
            break
        case BetTypes.Type.SET_AUTOPLAY_CONFIG:
            draft.FormAutoPlayConfig = action.payload
            break
        case BetTypes.Type.INITIAL_STATE:
        default:
            break
    }
}

export const BetStateProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const [betState, dispatchBet] = useImmerReducer(betReducer, initialState)
    const betMemo = React.useMemo(() => {
        return { betState, dispatchBet }
    }, [betState, dispatchBet])
    return <BetContext.Provider value={betMemo}>{children}</BetContext.Provider>
}
