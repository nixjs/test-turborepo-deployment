import React from 'react'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { BaseEnum } from '@lottery/types'
import { Result } from 'modules/game/base/Result'
import { hiloGameSaga, hiloGameSlice, Board } from 'modules/game/hilo'

interface GameBoardPropArg {}

export const GameBoard: React.FC<GameBoardPropArg> = () => {
    injectReducerSaga(hiloGameSlice.KEY_REDUCER_SAGA, hiloGameSlice.hiloGameReducer, hiloGameSaga.root)

    return (
        <>
            <br />
            <br />
            <br />
            <Board />
            <Result gameSymbol={BaseEnum.GameSymbol.GS_HILO} />
        </>
    )
}
