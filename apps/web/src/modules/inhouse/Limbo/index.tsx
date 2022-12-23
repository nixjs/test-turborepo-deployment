import React from 'react'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { BaseEnum } from '@lottery/types'
import { Result } from 'modules/game/base/Result'
import { limboGameSaga, limboGameSlice, limboSettingSaga, limboSettingSlice, Board } from 'modules/game/limbo'

interface GameBoardPropArg {}

export const GameBoard: React.FC<GameBoardPropArg> = () => {
    injectReducerSaga(limboGameSlice.KEY_REDUCER_SAGA, limboGameSlice.limboGameReducer, limboGameSaga.root)
    injectReducerSaga(limboSettingSlice.KEY_REDUCER_SAGA, limboSettingSlice.limboSettingReducer, limboSettingSaga.root)

    return (
        <>
            <br />
            <br />
            <br />
            <Board />
            <Result gameSymbol={BaseEnum.GameSymbol.GS_LIMBO} />
        </>
    )
}
