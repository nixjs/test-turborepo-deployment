import React from 'react'
import { useImmerReducer } from 'use-immer'
import { RollTypes } from './types'
import { initialState, RollContext } from './useRoll'

const rollReducer = (draft: RollTypes.State, action: RollTypes.Actions) => {
    switch (action.type) {
        case RollTypes.Type.SET_ROLLING:
            draft.isRolling = action.payload
            break
        case RollTypes.Type.SET_RADIUS:
            draft.radius = action.payload
            break
        case RollTypes.Type.SET_DIRECTION:
            draft.direction = action.payload
            break
        case RollTypes.Type.SET_DISABLED:
            draft.disabled = action.payload
            break
        case RollTypes.Type.SET_MULTIPLIER:
            draft.multiplier = action.payload[0]
            draft.winningChance = action.payload[1]
            break
        case RollTypes.Type.SET_RANGE:
            draft.range = action.payload
            break
        case RollTypes.Type.SET_PLACE_BET_RESULT:
            draft.betResult = action.payload
            break
        case RollTypes.Type.SET_AUTOPLAY_CONFIG:
            draft.FormAutoPlayConfig = action.payload
            break
        case RollTypes.Type.INITIAL_STATE:
            draft.radius = initialState.radius
            draft.range = initialState.range
            draft.direction = initialState.direction
            draft.multiplier = (action.payload && action.payload.multiplier) || initialState.multiplier
            draft.winningChance = (action.payload && action.payload.winningChance) || initialState.winningChance
            break
        default:
            break
    }
}

export const RollStateProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
    const [rollState, dispatchRoll] = useImmerReducer(rollReducer, initialState)
    const rollMemo = React.useMemo(() => {
        return { rollState, dispatchRoll }
    }, [rollState, dispatchRoll])
    return <RollContext.Provider value={rollMemo}>{children}</RollContext.Provider>
}
