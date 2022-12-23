import React from 'react'
import { injectReducerSaga } from 'redux/injectReducerSaga'
import { BaseEnum } from '@lottery/types'
import { Result } from 'modules/game/base/Result'
import { instantKenoGameSaga, instantKenoGameSlice, instantKenoSettingSaga, instantKenoSettingSlice, Board } from 'modules/game/keno'

interface GameBoardPropArg {}

export const GameBoard: React.FC<GameBoardPropArg> = () => {
    injectReducerSaga(instantKenoGameSlice.KEY_REDUCER_SAGA, instantKenoGameSlice.instantKenoGameReducer, instantKenoGameSaga.root)
    injectReducerSaga(
        instantKenoSettingSlice.KEY_REDUCER_SAGA,
        instantKenoSettingSlice.instantKenoSettingReducer,
        instantKenoSettingSaga.root
    )
    return (
        <>
            <br />
            <br />
            <br />
            <Board />
            <Result gameSymbol={BaseEnum.GameSymbol.GS_INSTANT_KENO} />
        </>
    )
}
