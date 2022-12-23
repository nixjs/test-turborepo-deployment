import React from 'react'
import { useSelector } from 'react-redux'
import { useBet } from 'modules/game/keno/context/BetContext'
import * as gameSelector from 'modules/game/keno/redux/game/selectors'

interface CoeficientPropArg {}

export const Coeficient: React.FC<CoeficientPropArg> = () => {
    const profileMultipliersLists = useSelector(gameSelector.profileMultipliersListSelector())

    const { betState } = useBet()

    const renderMultiplier = React.useMemo(() => {
        if (betState.numbers.length === 0)
            return (
                <div className="flex-fill">
                    <h4 className="text-center text-18 text-danger">Pick from 1 to 10 slots to see the odds!</h4>
                </div>
            )
        const multipliersByRisk = profileMultipliersLists.find((mul) => mul.riskProfile === betState.risk)
        const spotMultipliers = multipliersByRisk?.spotMultiplierMapMap.find((spot) => spot[0] === betState.numbers.length)
        if (spotMultipliers && spotMultipliers[1].hitMultiplierMapMap.length > 0)
            return spotMultipliers[1].hitMultiplierMapMap.map((hit, idx) => {
                return (
                    <div
                        key={idx}
                        className="d-flex flex-column justify-content-space text-center rd-8 zindex-1 coeficient-item"
                        style={{
                            backgroundColor: '#15161c',
                            border: '1px solid #313c50',
                            width: '100%',
                            maxWidth: '106px',
                            padding: '0 1px',
                            margin: '0 1px'
                        }}
                    >
                        <span className="text-white w600 coeficient-item__x">{`${hit[1]}x`}</span>
                        <span className="coeficient-item__hits">{`${hit[0]} hits`}</span>
                    </div>
                )
            })
        return (
            <div className="flex-fill">
                <h4 className="text-center text-18 text-danger">List multipliers not found</h4>
            </div>
        )
    }, [betState.numbers.length, betState.risk, profileMultipliersLists])

    return <div className="d-flex align-items-center justify-content-between">{renderMultiplier}</div>
}
