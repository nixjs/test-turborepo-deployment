import React from 'react'
import { useSelector } from 'react-redux'
import { Formatter } from '@lottery/utils'
import classNames from 'classnames'
import { Button } from '@nixjs23n6/baseui-button'
import { DiceDirection } from 'modules/game/dice/consts/enum'
import { RollStyled } from './Roll.styled'
import { useRoll, RollTypes } from 'modules/game/dice/context/RollContext'
import { useSound } from 'modules/game/dice/context/SoundContext'
import * as gameSelector from 'modules/game/dice/redux/game/selectors'
import { onGetWinningChance } from 'modules/game/dice/utils/roll'
import { ButtonOverCss, ButtonUnderCss } from './Roll.styled'

interface RollPropArg {
    className?: string
}

export const Roll: React.FC<RollPropArg> = ({ className }) => {
    const { rollState, dispatchRoll } = useRoll()

    const rollUnders = useSelector(gameSelector.getRollUnderSelector())
    const rollOvers = useSelector(gameSelector.getRollOverSelector())
    const multipliers = useSelector(gameSelector.getMultipliersSelector())

    const { sound } = useSound()

    const handleUnder = () => {
        if (rollUnders && rollOvers) {
            const radius = rollState.radius >= rollUnders[1] ? rollUnders[1] : rollState.radius
            const winningChance = onGetWinningChance(radius, DiceDirection.DD_ROLL_UNDER, multipliers)
            dispatchRoll({
                type: RollTypes.Type.SET_MULTIPLIER,
                payload: [winningChance.multiplier, winningChance.winningChance]
            })
            dispatchRoll({
                type: RollTypes.Type.SET_RADIUS,
                payload: radius
            })
            dispatchRoll({
                type: RollTypes.Type.SET_DIRECTION,
                payload: DiceDirection.DD_ROLL_UNDER
            })
            dispatchRoll({
                type: RollTypes.Type.SET_RANGE,
                payload: rollUnders
            })
            sound && sound.onSoundClick()
        }
    }

    const handleOver = () => {
        if (rollUnders && rollOvers) {
            const radius = rollState.radius <= rollOvers[0] ? rollOvers[0] : rollState.radius
            const winningChance = onGetWinningChance(radius, DiceDirection.DD_ROLL_OVER, multipliers)
            dispatchRoll({
                type: RollTypes.Type.SET_MULTIPLIER,
                payload: [winningChance.multiplier, winningChance.winningChance]
            })
            dispatchRoll({
                type: RollTypes.Type.SET_RADIUS,
                payload: radius
            })
            dispatchRoll({
                type: RollTypes.Type.SET_DIRECTION,
                payload: DiceDirection.DD_ROLL_OVER
            })
            dispatchRoll({
                type: RollTypes.Type.SET_RANGE,
                payload: rollOvers
            })
            sound && sound.onSoundClick()
        }
    }

    return (
        <RollStyled>
            <div
                className={classNames(
                    'd-flex align-items-center justify-content-between rd-rounded-full ml-24 mr-24 position-relative roll',
                    className
                )}
            >
                <Button
                    variant="primary"
                    autoWidth
                    size="xl"
                    overrideStyled={ButtonUnderCss}
                    type="button"
                    aria-label="Roll Under"
                    className={classNames('text-uppercase w700 rd-8 button-roll button-roll--under', {
                        active: rollState.direction === DiceDirection.DD_ROLL_UNDER
                    })}
                    onClick={handleUnder}
                    disabled={rollState.disabled}
                >
                    Roll Under
                </Button>
                <div className="position-relative d-flex controls">
                    <div className="mr-18 d-flex flex-column justify-content-center text-center controls-multiplier">
                        <span className="content w700 text-color data-text text-24" data-text="x99.9999">
                            x{Formatter.onZeroPadding(Number(rollState.multiplier)) || '0.0000'}
                        </span>
                        <span className="text-14 text-color-2">Multiplier</span>
                    </div>
                    <div className="ml-18 d-flex flex-column justify-content-center text-center controls-winning-chance">
                        <span className="content w700 text-color data-text text-24" data-text="99%">
                            {`${rollState?.winningChance || '00'}%`}
                        </span>
                        <span className="text-14 text-color-2">Chance to win</span>
                    </div>
                </div>
                <Button
                    variant="primary"
                    autoWidth
                    size="xl"
                    overrideStyled={ButtonOverCss}
                    type="button"
                    aria-label="Roll Over"
                    className={classNames('text-uppercase w700 rd-8 button-roll button-roll--over', {
                        active: rollState.direction === DiceDirection.DD_ROLL_OVER
                    })}
                    onClick={handleOver}
                    disabled={rollState.disabled}
                >
                    Roll Over
                </Button>
            </div>
        </RollStyled>
    )
}
