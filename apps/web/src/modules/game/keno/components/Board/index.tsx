import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { GameSymbol } from '@athena20/game-portal/common/game_symbol_pb'
import * as gameRedux from 'redux/game'
import { useJoinGame } from 'components/hooks/useJoinGame'
import { onInitGameConfig } from 'modules/game/keno/redux/game/slice'
import { SoundSources } from 'modules/game/keno/consts/consts'
import { BetStateProvider } from 'modules/game/keno/context/BetContext'
import { SoundProvider } from 'modules/game/keno/context/SoundContext'
import * as walletSelector from 'redux/wallet/selectors'
// import { Control } from './Control'
// import { LastBet } from './LastBet'
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

    useJoinGame(GameSymbol.GS_INSTANT_KENO, 'GameSymbol.GS_INSTANT_KENO')

    return (
        <BetStateProvider>
            <SoundProvider sources={SoundSources}>
                <div
                    className={classNames('user-select-none game-board', {
                        'blur-3x': !!gamingJoined
                    })}
                >
                    {/* <Control className="mb-30" />
                    <LastBet className="mb-24" /> */}
                    <Game />
                </div>
            </SoundProvider>
        </BetStateProvider>
    )
}
