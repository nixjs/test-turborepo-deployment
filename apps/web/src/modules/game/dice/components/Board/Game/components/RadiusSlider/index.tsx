import React from 'react'
import { useSelector } from 'react-redux'
import { Slider, useOnUnmount } from '@lottery/uikit'
import * as gameSelector from 'modules/game/dice/redux/game/selectors'
import { useRoll, RollTypes } from 'modules/game/dice/context/RollContext'
import { DiceDirection, DiceRadius } from 'modules/game/dice/consts/enum'
import { onGetWinningChance } from 'modules/game/dice/utils/roll'

interface RadiusSliderPropArg {}

const connectColor = '#2972FF'
const targetColor = '#323F73'

export const RadiusSlider: React.FC<RadiusSliderPropArg> = () => {
    const rollUnders = useSelector(gameSelector.getRollUnderSelector())
    const rollOvers = useSelector(gameSelector.getRollOverSelector())
    const multipliers = useSelector(gameSelector.getMultipliersSelector())

    const { rollState, dispatchRoll } = useRoll()

    useOnUnmount(() => {
        const { multiplier, winningChance } = onGetWinningChance(DiceRadius.BASE, DiceDirection.DD_ROLL_UNDER, multipliers)
        dispatchRoll({
            type: RollTypes.Type.INITIAL_STATE,
            payload: {
                multiplier,
                winningChance
            }
        })
    })

    React.useEffect(() => {
        if (rollState.range === null && rollOvers && rollUnders) {
            dispatchRoll({
                type: RollTypes.Type.SET_RANGE,
                payload: rollState.direction === DiceDirection.DD_ROLL_UNDER ? rollUnders : rollOvers
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rollUnders, rollOvers])

    const onSliderChange = React.useCallback(
        (value: (number | string)[]) => {
            const { range, direction } = rollState
            if (value.length > 0 && range) {
                const ourR = value[0]
                let r = ourR
                if (ourR < range[0]) {
                    r = range[0]
                }
                if (ourR > range[1]) {
                    r = range[1]
                }
                const winningChance = onGetWinningChance(r, direction, multipliers)
                dispatchRoll({
                    type: RollTypes.Type.SET_MULTIPLIER,
                    payload: [winningChance.multiplier, winningChance.winningChance]
                })
                dispatchRoll({ type: RollTypes.Type.SET_RADIUS, payload: Number(r) })
            }
        },
        [dispatchRoll, multipliers, rollState]
    )

    const renderSlider = React.useMemo(() => {
        const { direction, range, radius } = rollState
        const padding: number[] | undefined = range ? [Number(range[0]), 100 - Number(range[1])] : undefined
        return (
            <Slider
                className="mt-40"
                start={radius}
                connect={[true, false]}
                tooltips={[true]}
                disabled={rollState.isRolling}
                step={1}
                range={{
                    min: 0,
                    max: 100
                }}
                padding={padding}
                format={{
                    to: (value) => value,
                    from: (value) => Number(value.replace(',-', ''))
                }}
                connectColor={direction === DiceDirection.DD_ROLL_UNDER ? connectColor : targetColor}
                targetColor={direction === DiceDirection.DD_ROLL_UNDER ? targetColor : connectColor}
                onSlide={onSliderChange}
                updateOptions={{
                    fireSetEvent: true,
                    options: {
                        padding: padding,
                        start: radius
                    }
                }}
            />
        )
    }, [onSliderChange, rollState])

    return renderSlider
}
