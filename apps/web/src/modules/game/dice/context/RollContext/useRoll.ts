import React from 'react'
import { DiceRadius, DiceDirection } from 'modules/game/dice/consts/enum'
import { InitFormAutoPlayConfig } from 'modules/game/dice/consts/consts'
import { RollTypes } from './types'

export const initialState: RollTypes.State = {
    radius: DiceRadius.BASE,
    range: null,
    direction: DiceDirection.DD_ROLL_UNDER,
    disabled: false,
    multiplier: '0',
    winningChance: '0',
    isRolling: false,
    betResult: null,
    FormAutoPlayConfig: InitFormAutoPlayConfig
}

export const RollContext = React.createContext<RollTypes.ContextState>({
    rollState: initialState,
    dispatchRoll: () => null
})

export function useRoll(): RollTypes.ContextState {
    return React.useContext(RollContext)
}
