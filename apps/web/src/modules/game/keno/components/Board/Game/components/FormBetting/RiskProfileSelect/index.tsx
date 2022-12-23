import React from 'react'
import { BetTypes, useBet } from 'modules/game/keno/context/BetContext'

const List = ['Low', 'Medium', 'High']

interface RiskProfilePropArg {}

export const RiskProfile: React.FC<RiskProfilePropArg> = () => {
    const { betState, dispatchBet } = useBet()

    const onRiskProfileChange = React.useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            if (Number(betState.risk) !== Number(e.target.value)) {
                dispatchBet({
                    type: BetTypes.Type.SET_RISK,
                    payload: Number(e.target.value)
                })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [betState.risk]
    )

    return (
        <>
            <label htmlFor="spot" className="w500 mb-8">
                Risk Profile
            </label>
            <select
                className="form-control rd-8 pt-8 pb-8 pl-16 pr-16"
                style={{
                    display: 'block',
                    width: '100%'
                }}
                id="risk-profile"
                onChange={onRiskProfileChange}
                value={betState.risk}
            >
                {List.map((key, idx) => (
                    <option value={idx + 1} key={idx}>
                        {key}
                    </option>
                ))}
            </select>
            <br />
        </>
    )
}
