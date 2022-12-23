import React from 'react'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { BaseEnum } from '@lottery/types'
import { Result } from 'modules/game/base/Result'
import { diceGameSaga, diceGameSlice, diceSettingSaga, diceSettingSlice, Board } from 'modules/game/dice'

interface GameBoardPropArg {}

export const GameBoard: React.FC<GameBoardPropArg> = () => {
    injectReducerSaga(diceGameSlice.KEY_REDUCER_SAGA, diceGameSlice.diceGameReducer, diceGameSaga.root)
    injectReducerSaga(diceSettingSlice.KEY_REDUCER_SAGA, diceSettingSlice.diceSettingReducer, diceSettingSaga.root)

    return (
        <>
            <Board />
            <Result gameSymbol={BaseEnum.GameSymbol.GS_DICE} />
        </>
    )
}
