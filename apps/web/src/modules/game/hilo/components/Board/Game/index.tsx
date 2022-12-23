import React from 'react'
import { Screen } from './components/Screen'
import { TurnsList } from './components/TurnsList'
import { FormBetting } from './components/FormBetting'

interface GamePropArg {}

export const Game: React.FC<GamePropArg> = () => {
    return (
        <div className="user-select-none game-board">
            <Screen />
            <FormBetting />
            <br />
            <br />
            <TurnsList />
        </div>
    )
}
