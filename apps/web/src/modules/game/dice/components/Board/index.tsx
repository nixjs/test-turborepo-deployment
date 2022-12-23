import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { GameSymbol } from '@athena20/game-portal/common/game_symbol_pb'
import * as gameRedux from 'redux/game'
import { useJoinGame } from 'components/hooks/useJoinGame'
import { onInitGameConfig } from 'modules/game/dice/redux/game/slice'
import { SoundSources } from 'modules/game/dice/consts/consts'
import { RollStateProvider } from 'modules/game/dice/context/RollContext'
import { SoundProvider } from 'modules/game/dice/context/SoundContext'
import * as walletSelector from 'redux/wallet/selectors'
import { Control } from './Control'
import { LastBet } from './LastBet'
import { Game } from './Game'

interface BoardPropArg {}

export const Board: React.FC<BoardPropArg> = () => {
    const dispatch = useDispatch()
    const tokenSelected = useSelector(walletSelector.walletTokenSelectedSelector())
    const gamingJoined = useSelector(gameRedux.gamingJoinedSelector())

    React.useEffect(() => {
        if (tokenSelected) {
            dispatch(
                onInitGameConfig({
                    token: tokenSelected
                })
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenSelected])

    useJoinGame(GameSymbol.GS_DICE, 'GameSymbol.GS_DICE')

    return (
        <RollStateProvider>
            <SoundProvider sources={SoundSources}>
                <div
                    className={classNames('user-select-none game-board', {
                        'blur-3x': !!gamingJoined
                    })}
                >
                    <Control className="mb-30" />
                    <LastBet className="mb-24" />
                    <Game />
                </div>
            </SoundProvider>
        </RollStateProvider>
    )
}
