import React from "react"
import { Screen } from "./components/Screen"
import { Roll } from "./components/Roll"
import { RadiusSlider } from "./components/RadiusSlider"
import { FormBetting } from "./components/FormBetting"
import { Mode } from "./components/Mode"

interface GamePropArg {}

export const Game: React.FC<GamePropArg> = () => {
    return (
        <div className="user-select-none game-board">
            <Screen />
            <Roll className="mt-24" />
            <RadiusSlider />
            <FormBetting />
            <Mode className="mt-30" />
        </div>
    )
}
