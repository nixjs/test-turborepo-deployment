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
        case BetTypes.Type.SET_SKIP:
            draft.skip = action.payload
            break
        case BetTypes.Type.SET_COEFFICIENT:
            draft.coefficient = action.payload
            break
        case BetTypes.Type.SET_CARD:
            draft.card = action.payload
            break
        case BetTypes.Type.SET_PLACE_BET_RESULT:
            draft.betResult = action.payload
            break
        case BetTypes.Type.SET_OFFERED_OPTIONS_LIST:
            draft.offeredOptionsList = action.payload
            break
        case BetTypes.Type.SET_TURNS_LIST:
            draft.turnsList = action.payload
            break
        case BetTypes.Type.SET_ALLOW_CASH_OUT:
            draft.allowCashOut = action.payload
            break
        case BetTypes.Type.SET_TURN_ID:
            draft.turnId = action.payload
            break
        case BetTypes.Type.INITIAL_STATE:
            draft.coefficient = initialState.coefficient
            draft.offeredOptionsList = initialState.offeredOptionsList
            draft.turnsList = initialState.turnsList
            draft.card = initialState.card
            draft.allowCashOut = initialState.allowCashOut
            draft.turnId = initialState.turnId
            break
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
