import React from 'react'
import { useRoll } from 'modules/game/dice/context/RollContext'

interface PredictionPropArg {}

export const Prediction: React.FC<PredictionPropArg> = () => {
    const { rollState } = useRoll()
    return (
        <div className="d-flex flex-column flex-wrap justify-content-center text-center box-prediction">
            <span className="ml-12 text-oswald text-72 w700 number text-white" id="prediction">
                {rollState.radius}
            </span>
            <label className="w600 mt-12 text-color-2 text-uppercase label" htmlFor="prediction">
                Prediction
            </label>
        </div>
    )
}
