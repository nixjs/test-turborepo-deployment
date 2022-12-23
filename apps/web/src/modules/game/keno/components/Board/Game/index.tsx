import React from 'react'
import { Screen } from './components/Screen'
import { FormBetting } from './components/FormBetting'
import { Mode } from './components/Mode'

interface GamePropArg {}

export const Game: React.FC<GamePropArg> = () => {
    return (
        <div className="user-select-none game-board">
            <Screen />
            <FormBetting />
            <Mode className="mt-30" />
        </div>
    )
}
