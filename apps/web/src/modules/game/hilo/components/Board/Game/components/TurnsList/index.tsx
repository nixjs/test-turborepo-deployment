import React from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import { useBet } from 'modules/game/hilo/context/BetContext'
import { CARD_SUIT_LABEL, CARD_VALUE_LABEL } from 'modules/game/hilo/consts/consts'
import { GameBaseTypes } from 'modules/game/hilo/types'
import { HiLoTurnStatus, HiLoDirection } from 'modules/game/hilo/consts/enum'
import { Skip } from './Skip'
import { WinHigher } from './WinHigher'
import { WinLower } from './WinLower'
import { LoseHigher } from './LoseHigher'
import { LoseLower } from './LoseLower'
import { TurnsListStyled } from './index.styled'

interface TurnsListPropArg {}

export const TurnsList: React.FC<TurnsListPropArg> = () => {
    const { betState } = useBet()

    const renderAction = React.useCallback(
        (status: HiLoTurnStatus, isWin: boolean, direction: HiLoDirection, offeredOptionsList: GameBaseTypes.HiLoTurnOption[]) => {
            if (status === HiLoTurnStatus.HLTS_SKIPPED) return <Skip />
            if (isWin) {
                if (direction === HiLoDirection.HLD_HIGHER) {
                    return <WinHigher />
                }
                if (direction === HiLoDirection.HLD_LOWER) return <WinLower />
                if (direction === HiLoDirection.HLD_SAME) {
                    const index = offeredOptionsList.findIndex((list) => list.direction === direction)
                    if (index !== -1) {
                        if (index === 0) {
                            return <WinHigher />
                        }
                        return <WinLower />
                    }
                }
            } else {
                if (direction === HiLoDirection.HLD_HIGHER) return <LoseHigher />
                if (direction === HiLoDirection.HLD_LOWER) return <LoseLower />
            }
        },
        []
    )

    const renderTurnsList = React.useMemo(() => {
        if (betState.turnsList.length === 0)
            return (
                <div className="position-relative text-center card">
                    <div className="position-relative w-100 h-100 text-center card-inner">
                        <Image width={50} height={70} src="/modules/games/hilo/card-starter.svg" alt="front_card" className="start_card" />
                    </div>
                </div>
            )
        return betState.turnsList.map((turn, idx) => {
            const { initCard, status, isWin, direction, offeredOptionsList } = turn
            return (
                <div key={idx} className="position-relative text-center card">
                    <div className={classNames('position-relative w-100 h-100 text-center card-inner', 'card-inner--animation')}>
                        <div className="position-absolute w-100 h-100 rd-4 card-front"></div>
                        <div
                            className={classNames(
                                'position-relative w-100 h-100 rd-4 card-back',
                                `card-back--${initCard?.suit ? CARD_SUIT_LABEL[initCard.suit].toLowerCase() : 'none'}`
                            )}
                        >
                            <span className="position-absolute">{initCard?.value ? CARD_VALUE_LABEL[initCard.value] : 'none'}</span>
                        </div>
                    </div>
                    {![HiLoTurnStatus.HLTS_NONE, HiLoTurnStatus.HLTS_PLAYING].includes(status) && (
                        <button type="button" className="position-absolute d-block action">
                            {renderAction(status, isWin, direction, offeredOptionsList)}
                        </button>
                    )}
                </div>
            )
        })
    }, [betState.turnsList, renderAction])

    return (
        <TurnsListStyled>
            <div className="cards">
                <div className="card-inner">{renderTurnsList}</div>
            </div>
        </TurnsListStyled>
    )
}
