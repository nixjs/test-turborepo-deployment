import { Types } from '@athena20/ts-types'
import { DiceDirection } from '../consts/enum'
import { GameConfigTypes } from '../types'

export const onGetWinningChance = (
    value: string | number,
    direction: DiceDirection,
    multipliers: Types.Nullable<Record<string, string>>
): GameConfigTypes.MultipliersConfig => {
    if (direction && multipliers) {
        let winningChance: number
        if (direction === DiceDirection.DD_ROLL_UNDER) {
            winningChance = Number(value)
        } else {
            winningChance = 99 - Number(value)
        }
        return {
            multiplier: multipliers[String(winningChance)],
            winningChance: String(winningChance)
        }
    }
    return {
        multiplier: '0',
        winningChance: '0'
    }
}
